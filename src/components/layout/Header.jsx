import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsHovered(!isHovered);
  };

  const closeMenu = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const checkHeaderBackground = () => {
      const headerEl = headerRef.current;
      if (!headerEl) return;

      const headerRect = headerEl.getBoundingClientRect();
      const x = headerRect.left + headerRect.width / 2;
      const y = headerRect.top + 20; // Check near top of header

      // Get all elements at that point, then filter out header elements
      const allElements = document.elementsFromPoint(x, y);
      const elementsBelow = allElements.filter(el => !headerEl.contains(el) && el !== document.documentElement);

      for (const el of elementsBelow) {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            setIsLightBackground(luminance > 0.6);
            return;
          }
        }
      }
      setIsLightBackground(false);
    };

    window.addEventListener('scroll', checkHeaderBackground, { passive: true });
    // Also check on resize and initial load
    window.addEventListener('resize', checkHeaderBackground, { passive: true });
    checkHeaderBackground();

    return () => {
      window.removeEventListener('scroll', checkHeaderBackground);
      window.removeEventListener('resize', checkHeaderBackground);
    };
  }, []);

  return (
    <header className={`header ${isLightBackground ? 'light-bg' : ''}`} ref={headerRef}>
      <div
        className={`header-glass ${isHovered ? 'expanded' : ''}`}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHovered(true); }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setIsHovered(false); }}
      >
        <div className="header-top">
          <Link to="/" className="logo">
            <h2>AIB TECHNOVATIONS</h2>
          </Link>
          <div className="menu-dots" onClick={(e) => { e.stopPropagation(); toggleMenu(); }}>
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
