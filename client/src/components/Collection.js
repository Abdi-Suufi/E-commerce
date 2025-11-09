import React from 'react';

const Collection = () => {
  return (
    <section className="collection section">
      <div className="collection-container bd-grid">
        <div className="collection-box">
          <img src="https://i.postimg.cc/Df1KXmz4/backpack-Man.png" alt="image" className="collection-img" />

          <div className="collection-data">
            <h2 className="collection-title">
              <span className="collection-subtitle">Men</span><br />Backpack
            </h2>
            <a href="#" className="collection-view">View Collection</a>
          </div>
        </div>

        <div className="collection-box">
          <div className="collection-data">
            <h2 className="collection-title">
              <span className="collection-subtitle">Women</span><br />Backpack
            </h2>
            <a href="#" className="collection-view">View Collection</a>
          </div>

          <img src="https://i.postimg.cc/tT0MqtWS/backpack-Woman.png" alt="image" className="collection-img" />
        </div>
      </div>
    </section>
  );
};

export default Collection;

