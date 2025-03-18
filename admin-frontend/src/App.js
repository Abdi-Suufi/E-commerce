import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <ProductList />
    </Container>
  );
};

export default App;