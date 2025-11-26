import React, { useEffect, useState } from 'react';
import './ServicesHero.css';

const ServicesHero = () => {
  const [animationState, setAnimationState] = useState('initial'); // initial, covering-text, full-screen

  useEffect(() => {
    // Start animation after component mounts
    const timer1 = setTimeout(() => {
      setAnimationState('covering-text');
    }, 100);

    // Expand to full screen after covering text
    const timer2 = setTimeout(() => {
      setAnimationState('full-screen');
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="services-hero">
      {/* Animated square box */}
      <div className={`animated-square ${animationState}`}></div>

      <div className="services-hero-container">
        <h1 className="services-hero-title">
          <span className="title-text">Services We Provide</span>
          <span className="title-text-inverted">Services We Provide</span>
        </h1>
      </div>
    </section>
  );
};

export default ServicesHero;
