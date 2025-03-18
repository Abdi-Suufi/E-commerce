import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Hero.css';
// Import the images directly
import heroBg from './assets/fashion-hero-bg.jpg';
import modelImg from './assets/fashion-model.png';

const Hero = () => {
  // Create style objects with the imported images
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBg})`
  };
  
  const modelStyle = {
    backgroundImage: `url(${modelImg})`
  };

  return (
    <div className="hero-section" style={heroStyle}>
      <div className="hero-content">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-text">
              <h1 className="hero-title">Discover Your Style</h1>
              <h2 className="hero-subtitle">Fashion that speaks for you</h2>
              <p className="hero-description">
                Explore our curated collection of premium fashion items,
                designed to enhance your personal style and make a statement.
              </p>
              <div className="hero-cta">
                <Button variant="primary" size="lg" className="me-3">
                  Shop Now
                </Button>
                <Button variant="outline-light" size="lg">
                  New Arrivals
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-feature-image" style={modelStyle}></div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Hero;