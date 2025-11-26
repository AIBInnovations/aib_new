import React, { useState } from 'react';
import './CTASection.css';

const CTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission
  };

  return (
    <section className="cta-section">
      {/* White curve at top */}
      <svg className="cta-curve" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>
        <path
          d="M 0,150 Q 720,0 1440,150 L 1440,200 L 0,200 Z"
          stroke="none"
          fill="url(#curveGradient)"
        />
      </svg>

      <div className="cta-container">
        <h2 className="cta-heading">
          READY TO TRANSFORM<br />YOUR BUSINESS
        </h2>

        <p className="cta-subtext">
          Let's discuss how we can help you achieve your<br />
          goals with innovative AI solutions.
        </p>

        {/* Rotating circular badge */}
        <div className="cta-badge-wrapper">
          <div className="cta-badge">
            <svg className="rotating-text" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
              />
              <defs>
                <path
                  id="circlePath"
                  d="M 80, 80 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                />
              </defs>
              <text className="circular-text">
                <textPath href="#circlePath" startOffset="0%">
                  AIB Innovations • AIB Innovations •
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Email input */}
        <form className="cta-form" onSubmit={handleSubmit}>
          <div className="cta-input-wrapper">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cta-input"
              required
            />
            <button type="submit" className="cta-submit-button" aria-label="Submit email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
