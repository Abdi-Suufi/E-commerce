import React from "react";
import { ListGroup, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <i
            className="bi bi-cart3 d-block mb-2"
            style={{ fontSize: "2rem" }}
          ></i>
          <p>Your cart is empty</p>
          <small className="text-muted">
            Add some products to get started!
          </small>
        </div>
      ) : (
        <>
          <ListGroup className="mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <div>
                    <div className="fw-medium">{item.name}</div>
                    <Badge className="price-badge mt-1">
                      ${item.price.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="quantity-controls d-flex align-items-center me-3">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="rounded-circle p-1"
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="cart-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
            <Button
              variant="outline-danger"
              onClick={clearCart}
              title="Clear cart"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>

          <Link to="/checkout" className="btn btn-primary w-100">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
