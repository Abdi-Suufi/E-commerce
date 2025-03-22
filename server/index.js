const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./db/mongoose');
const Product = require('./models/Product');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const path = require('path');

// AWS S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}

// Upload image to S3
async function uploadToS3(file) {
  const fileStream = fs.createReadStream(file.path);
  
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `products/${file.filename}`,
    Body: fileStream,
    ContentType: file.mimetype
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params: uploadParams
    });

    const result = await upload.done();
    
    // Clean up local file after successful upload
    await unlinkFile(file.path);
    
    return result.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server error');
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).send('Product not found');
    }
    res.status(500).send('Server error');
  }
});

// Upload an image
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = await uploadToS3(req.file);
    
    res.json({ 
      imageUrl,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error in image upload:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// Create new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image, description, isNew } = req.body;
    
    // Validation
    if (!name || !price) {
      return res.status(400).send('Name and price are required');
    }
    
    // Image validation - allow empty since we can upload later
    const imageUrl = image || "https://placehold.co/400x300?text=Product+Image";
    
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      image: imageUrl,
      description: description || "",
      isNew: isNew || false
    });
    
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Server error');
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, image, description, isNew } = req.body;
    
    // Validation
    if (!name || !price) {
      return res.status(400).send('Name and price are required');
    }
    
    // Build product object
    const productFields = {
      name,
      price: parseFloat(price),
      description: description || "",
      isNew: isNew || false
    };
    
    // Only update image if provided
    if (image) {
      productFields.image = image;
    }
    
    // Check if product exists before updating
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    
    // Update and return the updated product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).send('Product not found');
    }
    res.status(500).send('Server error');
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    
    await product.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).send('Product not found');
    }
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Ecommerce Backend is running with MongoDB and AWS S3!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});