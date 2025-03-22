const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');
const Product = require('./models/Product');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

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

// Create new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, image, description, isNew } = req.body;
    
    // Validation
    if (!name || !price || !image) {
      return res.status(400).send('Name, price, and image are required');
    }
    
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      image,
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
    if (!name || !price || !image) {
      return res.status(400).send('Name, price, and image are required');
    }
    
    // Build product object
    const productFields = {
      name,
      price: parseFloat(price),
      image,
      description: description || "",
      isNew: isNew || false
    };
    
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
  res.send('Ecommerce Backend is running with MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});