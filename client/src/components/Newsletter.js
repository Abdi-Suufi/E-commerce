import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="newsletter section" id="subscribed">
      <div className="newsletter-container bd-grid">
        <div className="newsletter-subscribe">
          <h2 className="section-title">OUR NEWSLETTER</h2>
          <p className="newsletter-description">Promotion news products and sales. Directly to you</p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="button">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

