import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <>
                <h1>Admin Dashboard</h1>
                <AddProduct />
                <ProductList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;