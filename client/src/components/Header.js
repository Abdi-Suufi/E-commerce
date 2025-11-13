import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItems, setShowCart }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <Link to="/" className="nav-logo">SARA</Link>
        </div>

        <div className={`nav-menu ${showMenu ? 'show' : ''}`} id="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link active" onClick={closeMenu}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#featured" className="nav-link" onClick={closeMenu}>Featured</a>
            </li>
            <li className="nav-item">
              <a href="#new" className="nav-link" onClick={closeMenu}>New</a>
            </li>
            <li className="nav-item">
              <a href="#subscribed" className="nav-link" onClick={closeMenu}>Subscribed</a>
            </li>
          </ul>
        </div>

        <div>
          <i className='bx bxs-cart nav-cart' onClick={() => setShowCart(true)}></i>
          <i className='bx bx-menu nav-toggle' id="nav-toggle" onClick={toggleMenu}></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;

