import React, { useState, useEffect } from 'react';

const NewArrivals = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        // Take only the first 6 products for new arrivals section
        setProducts(data.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="new section" id="new">
        <h2 className="section-title">NEW ARRIVALS</h2>
        <a href="#" className="section-all">View All</a>
        <div className="new-container bd-grid">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="new section" id="new">
      <h2 className="section-title">NEW ARRIVALS</h2>
      <a href="#" className="section-all">View All</a>

      <div className="new-container bd-grid">
        {products.map((product) => (
          <div key={product._id} className="new-box">
            <img src={product.image} alt="new image" className="new-img" />
            <div className="new-link">
              <a href="#" className="button" onClick={() => addToCart(product)}>VIEW PRODUCT</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

