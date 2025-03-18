import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';

const AddProduct = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = async (newProduct) => {
    await axios.post('http://localhost:5000/api/products', newProduct);
    setShowForm(false);
    onProductAdded();
  };

  return (
    <Container>
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Product'}
      </Button>
      {showForm && <ProductForm onSubmit={handleAddProduct} />}
    </Container>
  );
};

export default AddProduct;