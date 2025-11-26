import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="header">
      <div
        className={`header-glass ${isHovered ? 'expanded' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="header-top">
          <Link to="/" className="logo">
            <h2>AIB INNOVATIONS</h2>
          </Link>
          <div className="menu-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <nav className="nav-menu">
          <Link to="/">HOME</Link>
          <Link to="/services">SERVICES</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/portfolio">PORTFOLIO</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
