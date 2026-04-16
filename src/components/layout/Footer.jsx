import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setStatusMsg('Subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setStatusMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please try again.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Left - Tagline */}
          <div className="footer-tagline">
            <h2 className="tagline-text">
              * CREATIVITY IS<br />
              THINKING UP<br />
              NEW THINGS.
            </h2>
          </div>

          {/* Center - Navigation Links (Single Column) */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/services" className="footer-link">Services</Link>
              <Link to="/portfolio" className="footer-link">Portfolio</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="footer-contact">
            <h3 className="contact-heading">Get valuable insights</h3>

            {/* Email Input */}
            <form className="footer-form" onSubmit={handleSubmit}>
              <div className="footer-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-input"
                  required
                  disabled={status === 'loading'}
                />
                <button type="submit" className="footer-submit-button" aria-label="Submit email" disabled={status === 'loading'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              {statusMsg && (
                <p style={{ color: status === 'success' ? '#4ade80' : '#f87171', marginTop: '6px', fontSize: '13px' }}>
                  {statusMsg}
                </p>
              )}
            </form>

            {/* Social Icons */}
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/aib-innovations-pvt-ltd/posts/?feedView=all" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/aibinnovations?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>

            <div className="footer-chat">
              <h4 className="chat-heading">Let's chat</h4>
              <a href="mailto:INFO@AIBTECHNOVATION.CO" className="chat-email">
                INFO@AIBTECHNOVATION.CO
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Large Company Name */}
        <div className="footer-company-name">
          <h1 className="company-name-aib">AIB</h1>
          <h1 className="company-name-technovation">TECHNOVATION</h1>
        </div>

        {/* Bottom - Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright © AIB Technovation, Inc 2026
          </p>
          <div className="footer-links">
            <Link to="/contact" className="footer-bottom-link">Terms Of Service</Link>
            <span className="footer-separator">•</span>
            <Link to="/contact" className="footer-bottom-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
