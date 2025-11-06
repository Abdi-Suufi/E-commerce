import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, updateQuantity, clearCart, setShowCart }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setShowCart(false)}>
            <i className='bx bx-x'></i>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className='bx bx-cart' style={{ fontSize: "3rem", color: "var(--dark-color-light)" }}></i>
            <p>Your cart is empty</p>
            <small style={{ color: "var(--dark-color-light)" }}>
              Add some products to get started!
            </small>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${item.price}</div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className='bx bx-trash'></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/checkout" className="checkout-btn" onClick={() => setShowCart(false)}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
