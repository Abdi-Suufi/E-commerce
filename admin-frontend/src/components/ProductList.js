import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Spinner, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_API_URL);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditFormData({...product});
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: checked,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/${editFormData.id}`, editFormData);
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-muted">Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 py-5">
        <div className="text-danger mb-3">⚠️ {error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Product List</h2>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} lg={4} md={6} className="mb-4">
            <Card className="h-100">
              {editingProductId === product.id ? (
                <Form.Group className="position-absolute top-0 end-0 m-2">
                  <Form.Check
                    type="checkbox"
                    name="isNew"
                    label="NEW"
                    checked={editFormData.isNew}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              ) : (
                product.isNew && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                    <Badge bg="success" className="px-2 py-1">NEW</Badge>
                  </div>
                )
              )}
              
              <Card.Img variant="top" src={product.image} alt={product.name} />
              
              <Card.Body>
                {editingProductId === product.id ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editFormData.name || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Price (£)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="price"
                        value={editFormData.price || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="image"
                        value={editFormData.image || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={editFormData.description || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <div className="d-flex gap-2">
                      <Button 
                        variant="success" 
                        className="w-100"
                        onClick={handleSaveEdit}
                      >
                        <i className="bi bi-check-lg me-2"></i>
                        Save
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="w-100"
                        onClick={handleCancelEdit}
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="price-tag">£{product.price}</div>
                    <p className="text-muted small mb-3">
                      {product.description || "High-quality fashion item perfect for your collection."}
                    </p>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="warning" 
                        className="w-100"
                        onClick={() => handleEdit(product)}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit
                      </Button>
                      <Button 
                        variant="danger" 
                        className="w-100"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;