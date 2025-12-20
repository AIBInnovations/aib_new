import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsHovered(!isHovered);
  };

  const closeMenu = () => {
    setIsHovered(false);
  };

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
          <div className="menu-dots" onClick={toggleMenu}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <nav className="nav-menu">
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/services" onClick={closeMenu}>SERVICES</Link>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/portfolio" onClick={closeMenu}>PORTFOLIO</Link>
          <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
