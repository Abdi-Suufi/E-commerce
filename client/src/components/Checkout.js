import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // Map cart items to include proper MongoDB ObjectId format
      const orderItems = cartItems.map(item => ({
        productId: item._id || item.id, // Use either _id or id
        name: item.name,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity || 1)
      }));

      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          county: formData.County,
          postcode: formData.postcode
        },
        items: orderItems,
        payment: {
          subtotal: parseFloat(subtotal),
          shipping: parseFloat(shipping),
          tax: parseFloat(tax),
          total: parseFloat(total)
        }
      };

      console.log('Sending order data:', orderData);

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create order: ${errorData}`);
      }

      const order = await response.json();
      
      // Clear the cart
      clearCart();
      
      // Show success message
      alert('Order placed successfully! Order ID: ' + order._id);
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order: ' + error.message);
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-content">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before checking out.</p>
          <Link to="/" className="button">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <Link to="/" className="back-link">
          <i className='bx bx-arrow-back'></i> Back to Shopping
        </Link>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={validated && !formData.firstName ? 'invalid' : ''}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={validated && !formData.lastName ? 'invalid' : ''}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={validated && !formData.email ? 'invalid' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={validated && !formData.address ? 'invalid' : ''}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={validated && !formData.city ? 'invalid' : ''}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="County">County *</label>
                  <input
                    type="text"
                    id="County"
                    name="County"
                    value={formData.County}
                    onChange={handleChange}
                    required
                    className={validated && !formData.County ? 'invalid' : ''}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="postcode">Postcode *</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  required
                  className={validated && !formData.postcode ? 'invalid' : ''}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Information</h3>
              <div className="form-group">
                <label htmlFor="cardName">Name on Card *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                  className={validated && !formData.cardName ? 'invalid' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  className={validated && !formData.cardNumber ? 'invalid' : ''}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expDate"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                    className={validated && !formData.expDate ? 'invalid' : ''}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    placeholder="123"
                    className={validated && !formData.cvv ? 'invalid' : ''}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="checkout-submit-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-price">${item.price}</div>
                  <div className="order-item-quantity">Qty: {item.quantity || 1}</div>
                </div>
                <div className="order-item-total">
                  ${((item.price * (item.quantity || 1)).toFixed(2))}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;