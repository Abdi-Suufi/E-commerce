import React, { useState } from 'react';
import { Row, Col, Navbar, Nav, Container, Badge } from 'react-bootstrap';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // We'll create this file for custom styles

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="fw-bold">FashionHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#cart" className="d-flex align-items-center">
                Cart <Badge bg="light" text="dark" className="ms-2">{cartItems.length}</Badge>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h1 className="text-center mb-4 display-4 fw-bold">Welcome to FashionHub</h1>
        <Row>
          <Col md={9}>
            <ProductList addToCart={addToCart} />
          </Col>
          <Col md={3}>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;