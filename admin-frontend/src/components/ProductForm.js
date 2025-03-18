import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const ProductForm = ({ product, onSubmit }) => {
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [image, setImage] = useState(product ? product.image : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: product ? product.id : null, name, price, image });
  };

  return (
    <Container>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {product ? 'Update Product' : 'Add Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;