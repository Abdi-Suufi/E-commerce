import React from 'react';

const Hero = () => {
  return (
    <section className="home" id="home">
      <div className="home-container bd-grid">
        <div className="home-data">
          <h1 className="home-title">NEW <br /><span>ARRIVALS</span></h1>
          <a href="#featured" className="button">GO SHOPPING</a>
        </div>

        <img src="https://i.postimg.cc/kg691scD/home.png" alt="image" className="home-img" />
      </div>
    </section>
  );
};

export default Hero;