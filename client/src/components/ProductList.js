import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} lg={4} md={6} className="mb-4">
          <Card className="h-100">
            {product.isNew && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                <Badge bg="success" className="px-2 py-1">NEW</Badge>
              </div>
            )}
            <Card.Img variant="top" src={product.image} alt={product.name} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <div className="price-tag">${product.price}</div>
              <p className="text-muted small mb-3">
                {product.description || "High-quality fashion item perfect for your collection."}
              </p>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  addToCart(product);
                }}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;