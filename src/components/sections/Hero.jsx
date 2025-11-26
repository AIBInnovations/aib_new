import React from 'react';
import './Hero.css';
import heroVideo from '../../assets/hero_video.mp4';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            We work with ideas
          </h1>
          <p className="hero-subtitle">
            Where vision meets intelligent innovation
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
