import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Featured from "./components/Featured";
import Offer from "./components/Offer";
import NewArrivals from "./components/NewArrivals";
import Newsletter from "./components/Newsletter";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

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

  const [showCart, setShowCart] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shopCart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

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
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

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
      <div className="l-main">
        <Header cartItems={cartItems} setShowCart={setShowCart} />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Collection />
              <Featured addToCart={addToCart} />
              <Offer />
              <NewArrivals addToCart={addToCart} />
              <Newsletter />
              <Sponsors />
            </>
          } />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
        </Routes>
        
        <Footer />
      </div>

      {showCart && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          setShowCart={setShowCart}
        />
      )}
    </Router>
  );
}

export default App;
