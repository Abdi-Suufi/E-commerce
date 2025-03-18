import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';

const AddProduct = ({ onProductAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL, newProduct);
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
    }
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