import React, { useState, useEffect, useRef } from 'react';
import './HexagonSection.css';

/**
 * Hexagon Tile Component
 */
function HexTile() {
  return (
    <div
      className="hex-tile"
      style={{
        width: '180px',
        height: '156px', // Height adjusted for regular hexagon (width * 0.866)
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        background: 'rgba(255, 255, 255, 0.05)',
      }}
    />
  );
}

/**
 * Hexagonal Grid Section with Scroll Effect
 */
export default function HexagonSection() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const totalRows = 12; // Reduced for better visibility

  // Calculate number of hexagons per row based on viewport width
  const getHexagonsPerRow = (rowIndex) => {
    // Even rows start flush left, odd rows offset
    const isEvenRow = rowIndex % 2 === 0;
    // Approximate 10-12 hexagons per row for full width
    return isEvenRow ? 11 : 10;
  };

  // Calculate horizontal positions for hexagons in a row
  const getHexagonPositions = (rowIndex) => {
    const count = getHexagonsPerRow(rowIndex);
    const isEvenRow = rowIndex % 2 === 0;
    const hexWidth = 140; // Width of each hexagon
    const gap = 10; // Gap between hexagons
    const positions = [];

    for (let i = 0; i < count; i++) {
      const xPos = isEvenRow
        ? i * (hexWidth + gap)
        : (hexWidth / 2) + (i * (hexWidth + gap));
      positions.push(xPos);
    }

    return positions;
  };

  // Handle scroll effect for hexagons
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Only start effect when section reaches top of viewport (when previous section ends)
      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        const scrollProgress = Math.abs(sectionTop) / (sectionHeight * 0.7);
        const offset = scrollProgress * 1200; // Speed of hexagon movement
        setScrollOffset(offset);
      } else if (sectionTop > 0) {
        // Reset when section is below viewport
        setScrollOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hexagon-section" ref={sectionRef}>
      {/* Full width container - no horizontal padding */}
      <div className="hexagon-container">

        {/* Text and Counter Row - With padding */}
        <div className="header-row">
          <div className="header-content">
            {/* Left - Text */}
            <div className="header-text">
              <h2 className="section-title">
                Lorem Ipsum
                <br />
                Dolor Sit
              </h2>
            </div>

            {/* Right - 50+ Counter */}
            <div className="header-counter">
              <span className="counter-number">50+</span>
            </div>
          </div>
        </div>

        {/* Hexagon Grid - Scroll Effect - Full Width */}
        <div className="hex-grid-wrapper">
          <div className="hex-grid-container" ref={contentRef}>
            {/* Top fade gradient */}
            <div className="hex-fade-top" />

            <div
              className="hex-grid"
              style={{
                transform: `translateY(-${scrollOffset}px)`,
                transition: 'none',
              }}
            >
              {Array.from({ length: totalRows }).map((_, rowIndex) => {
                const hexPositions = getHexagonPositions(rowIndex);

                return (
                  <div
                    key={rowIndex}
                    className="hex-row"
                  >
                    {hexPositions.map((_, tileIndex) => (
                      <HexTile key={tileIndex} />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Bottom fade gradient */}
            <div className="hex-fade-bottom" />
          </div>
        </div>
      </div>
    </section>
  );
}