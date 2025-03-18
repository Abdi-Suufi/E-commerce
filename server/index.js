const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get products data
let products = require('./data');

// Helper function to write products to data.js file
const saveProductsToFile = () => {
  try {
    const dataContent = `const products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = products;`;
    fs.writeFileSync(path.join(__dirname, 'data.js'), dataContent);
    return true;
  } catch (error) {
    console.error('Error saving products to file:', error);
    return false;
  }
};

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// Create new product
app.post('/api/products', (req, res) => {
  const { name, price, image } = req.body;
  
  // Validation
  if (!name || !price || !image) {
    return res.status(400).send('Name, price, and image are required');
  }
  
  // Generate new ID (max ID + 1)
  const newId = products.length > 0 
    ? Math.max(...products.map(p => p.id)) + 1 
    : 1;
  
  const newProduct = {
    id: newId,
    name,
    price: parseFloat(price),
    image
  };
  
  products.push(newProduct);
  
  // Save to file
  if (saveProductsToFile()) {
    res.status(201).json(newProduct);
  } else {
    res.status(500).send('Error saving product');
  }
});

// Update product
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, image } = req.body;
  
  // Validation
  if (!name || !price || !image) {
    return res.status(400).send('Name, price, and image are required');
  }
  
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) return res.status(404).send('Product not found');
  
  // Update product
  products[productIndex] = {
    ...products[productIndex],
    name,
    price: parseFloat(price),
    image
  };
  
  // Save to file
  if (saveProductsToFile()) {
    res.json(products[productIndex]);
  } else {
    res.status(500).send('Error updating product');
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) return res.status(404).send('Product not found');
  
  // Remove product
  products = products.filter(p => p.id !== productId);
  
  // Save to file
  if (saveProductsToFile()) {
    res.status(204).send();
  } else {
    res.status(500).send('Error deleting product');
  }
});

app.get('/', (req, res) => {
  res.send('Ecommerce Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});