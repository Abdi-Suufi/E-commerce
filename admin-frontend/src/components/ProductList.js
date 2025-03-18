import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedProduct) => {
    await axios.put(`http://localhost:5000/api/products/${updatedProduct.id}`, updatedProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <Container>
      <h2>Product List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <img src={product.image} alt={product.name} style={{ width: '50px' }} />
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editingProduct && (
        <ProductForm product={editingProduct} onSubmit={handleUpdate} />
      )}
    </Container>
  );
};

export default ProductList;