import React, { useState, useEffect } from 'react';

const Featured = ({ addToCart }) => {
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
        // Take only the first 4 products for featured section
        setProducts(data.slice(0, 4));
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
      <section className="featured section" id="featured">
        <h2 className="section-title">FEATURED PRODUCT</h2>
        <a href="#" className="section-all">View All</a>
        <div className="featured-container bd-grid">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured section" id="featured">
      <h2 className="section-title">FEATURED PRODUCT</h2>
      <a href="#" className="section-all">View All</a>

      <div className="featured-container bd-grid">
        {products.map((product) => (
          <div key={product._id} className="featured-product">
            <div className="featured-box">
              <div className="featured-new">NEW</div>
              <img src={product.image} alt="featured image" className="featured-img" />
            </div>

            <div className="featured-data">
              <h3 className="featured-name">{product.name}</h3>
              <span className="featured-price">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;

