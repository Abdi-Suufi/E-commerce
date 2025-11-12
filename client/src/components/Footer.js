import React from 'react';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="footer-container bd-grid">
        <div className="footer-box">
          <h3 className="footer-title">SARA</h3>
          <p className="footer-deal">Products Store</p>

          <a href="#"><img src="https://i.postimg.cc/sgtFn03x/footerstore1.png" alt="image" className="footer-store" /></a>
          <a href="#"><img src="https://i.postimg.cc/pd8w3YdZ/footerstore2.png" alt="image" className="footer-store" /></a>
        </div>

        <div className="footer-box">
          <h3 className="footer-title">EXPLORE</h3>

          <ul>
            <li><a href="#" className="footer-link">Home</a></li>
            <li><a href="#" className="footer-link">Featured</a></li>
            <li><a href="#" className="footer-link">New</a></li>
            <li><a href="#" className="footer-link">Subscribe</a></li>
          </ul>
        </div>

        <div className="footer-box">
          <h3 className="footer-title">OUR SERVICES</h3>

          <ul>
            <li><a href="#" className="footer-link">Pricing</a></li>
            <li><a href="#" className="footer-link">Free Shipping</a></li>
            <li><a href="#" className="footer-link">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-box">
          <h3 className="footer-title">FOLLOW US</h3>

          <a href="#" className="footer-social"><i className='bx bxl-facebook'></i></a>
          <a href="#" className="footer-social"><i className='bx bxl-instagram'></i></a>
          <a href="#" className="footer-social"><i className='bx bxl-youtube'></i></a>
        </div>
      </div>

      <p className="footer-copy">&#169; 2024 Copyright All rights reserved</p>
    </footer>
  );
};

export default Footer;

