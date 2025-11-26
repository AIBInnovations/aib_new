import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
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

          {/* Center - Navigation Links (Two Columns) */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <a href="#agency" className="footer-link">Agency</a>
              <a href="#approach" className="footer-link">Approach</a>
              <a href="#work" className="footer-link">Work</a>
              <a href="#thoughts" className="footer-link">Thoughts</a>
              <a href="#lab" className="footer-link">Lab</a>
            </div>
            <div className="footer-nav-column">
              <a href="#agency" className="footer-link">Agency</a>
              <a href="#approach" className="footer-link">Approach</a>
              <a href="#work" className="footer-link">Work</a>
              <a href="#thoughts" className="footer-link">Thoughts</a>
              <a href="#lab" className="footer-link">Lab</a>
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
                />
                <button type="submit" className="footer-submit-button" aria-label="Submit email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="footer-social">
              <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                <span>in</span>
              </a>
              <a href="#reddit" className="social-icon" aria-label="Reddit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#upwork" className="social-icon" aria-label="Upwork">
                <span>Up</span>
              </a>
              <a href="#threads" className="social-icon" aria-label="Threads">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 1.623-.015 3.027-.29 4.176-.821.85-.392 1.638-.945 2.338-1.642l1.43 1.43c-.88.88-1.89 1.584-3.006 2.092-1.47.67-3.144 1.017-4.938 1.06zm-.007-7c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/>
                </svg>
              </a>
            </div>

            <div className="footer-chat">
              <h4 className="chat-heading">Let's chat</h4>
              <a href="mailto:INFO@AIBINNOVATIONS.CO" className="chat-email">
                INFO@AIBINNOVATIONS.CO
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Large Company Name */}
        <div className="footer-company-name">
          <h1 className="company-name-text">AIB INNOVATIONS</h1>
        </div>

        {/* Bottom - Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright © AIB Innovations, Inc 2025
          </p>
          <div className="footer-links">
            <a href="#terms" className="footer-bottom-link">Terms Of Service</a>
            <span className="footer-separator">•</span>
            <a href="#privacy" className="footer-bottom-link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
