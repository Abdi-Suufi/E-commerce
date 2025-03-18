import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import {
  Row,
  Col,
  Navbar,
  Nav,
  Container,
  Badge,
  Toast,
  ToastContainer,
  Button,
} from "react-bootstrap";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  //Dark mode functionality
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a preference stored
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Effect to apply dark mode to the document
  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    
    // Apply or remove dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shopCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const [isCheckout, setIsCheckout] = useState(false);

  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      // If product exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: (updatedCartItems[existingItemIndex].quantity || 1) + 1,
      };
      setCartItems(updatedCartItems);
    } else {
      // If product doesn't exist, add it with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setLastAddedItem(product);
    setShowToast(true);
  };

  //Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Add a new function to update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCartItems);
  };

  return (
    <Router>
      <Analytics />
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">FashionHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#sales">Sale</Nav.Link>
              <Nav.Link href="/checkout" className="d-flex align-items-center">
                <i className="bi bi-cart3 me-1"></i>
                Cart
                {cartItems.length > 0 && (
                  <Badge className="cart-badge ms-2">{cartItems.length}</Badge>
                )}
              </Nav.Link>
              <Nav.Link onClick={toggleDarkMode} className="ms-2">
                {darkMode ? (
                  <i className="bi bi-sun-fill"></i>
                ) : (
                  <i className="bi bi-moon-fill"></i>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "76px" }}>
      <Container>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Row>
                <Col lg={9}>
                  <ProductList addToCart={addToCart} />
                </Col>
                <Col lg={3}>
                  <Cart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    clearCart={clearCart}
                  />
                </Col>
              </Row>
            </>
          } />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
        </Routes>
      </Container>
    </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="light"
        >
          <Toast.Header closeButton>
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            <strong className="me-auto">Added to Cart</strong>
          </Toast.Header>
          <Toast.Body>
            {lastAddedItem && (
              <div className="d-flex align-items-center">
                <div className="me-2" style={{ width: "40px", height: "40px" }}>
                  <img
                    src={lastAddedItem.image}
                    alt={lastAddedItem.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div>
                  <div className="fw-medium">{lastAddedItem.name}</div>
                  <div className="small text-primary">
                    £{lastAddedItem.price.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <footer className="bg-white mt-5 py-4 border-top">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <Navbar.Brand href="/" className="me-0">
                FashionHub
              </Navbar.Brand>
              <p className="text-muted small mt-2 mb-0">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <h5 className="text-secondary fs-6 fw-bold mb-2">
                Connect With Us
              </h5>
              <div className="d-flex justify-content-center gap-3">
                <a href="#facebook" className="text-primary fs-5">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#instagram" className="text-primary fs-5">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#twitter" className="text-primary fs-5">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </div>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <h5 className="text-secondary fs-6 fw-bold mb-2">Newsletter</h5>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </Router>
  );
}

export default App;
