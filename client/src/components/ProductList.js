import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={product.image} alt={product.name} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text className="text-muted">${product.price}</Card.Text>
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => addToCart(product)}
              >
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