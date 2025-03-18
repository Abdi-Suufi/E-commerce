import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';

const Checkout = ({ cartItems, clearCart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    County: '',
    postcode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Here you would typically send the order to your backend
    alert('Order placed successfully!');
    clearCart();
    // Redirect to confirmation page or home page
    window.location.href = '/';
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={5}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your city.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="County">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="County"
                        value={formData.County}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your County.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="postcode">
                      <Form.Label>postcode</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your postcode code.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                <h5 className="mb-3">Payment Information</h5>

                <Form.Group className="mb-3" controlId="cardName">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the name on your card.
                  </Form.Control.Feedback>
                  <small className="text-muted">Full name as displayed on card</small>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Credit Card Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your credit card number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="expDate">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="expDate"
                        placeholder="MM/YY"
                        value={formData.expDate}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your card's expiration date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your card's security code.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between lh-sm border-0 py-2">
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">Quantity: {item.quantity || 1}</small>
                    </div>
                    <span className="text-muted">£{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between py-2 border-0">
                  <span>Subtotal</span>
                  <strong>£{subtotal.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between py-2 border-0">
                  <span>Shipping</span>
                  <strong>£{shipping.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between py-2 border-0">
                  <span>Tax (7%)</span>
                  <strong>£{tax.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between py-3 border-top">
                  <span className="fw-bold">Total</span>
                  <strong className="text-primary">£{total.toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;