import React from 'react';
import { ListGroup, Button, Badge } from 'react-bootstrap';

const Cart = ({ cartItems, removeFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="shadow-sm p-3 bg-white rounded">
      <h2 className="h4 mb-3">Your Cart</h2>
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <span>
              {item.name} <Badge bg="light" text="dark">${item.price}</Badge>
            </span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="mt-3 fw-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;