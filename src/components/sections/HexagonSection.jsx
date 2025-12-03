import React, { useState, useEffect, useRef } from 'react';
import './HexagonSection.css';

/*️⃣ Hexagon Tile */
function HexTile() {
  return (
    <div
      className="hex-tile"
      style={{
        width: '180px',
        height: '156px',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        background: 'rgba(255, 255, 255, 0.05)',
      }}
    />
  );
}

/*️⃣ Hexagon Section */
export default function HexagonSection() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const totalRows = 30;

  /* Hexagon positions */
  const getHexagonsPerRow = (rowIndex) => (rowIndex % 2 === 0 ? 11 : 10);

  const getHexagonPositions = (rowIndex) => {
    const count = getHexagonsPerRow(rowIndex);
    const isEvenRow = rowIndex % 2 === 0;
    const hexWidth = 140;
    const gap = 10;
    return Array.from({ length: count }, (_, i) =>
      isEvenRow ? i * (hexWidth + gap) : (hexWidth / 2) + i * (hexWidth + gap)
    );
  };

  /*️⃣ SCROLL LOGIC (fully fixed version) */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const gridHeight = contentRef.current.scrollHeight;
      const viewport = window.innerHeight;

      // ⭐ MAX allowed movement: НЕVER more than this
      const maxOffset = gridHeight - viewport;

      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        const scrollProgress = Math.abs(sectionTop) / sectionHeight;

        // ⭐ Prevent empty space — limit movement
        const offset = Math.min(scrollProgress * maxOffset, maxOffset);

        setScrollOffset(offset);
      } else if (sectionTop > 0) {
        setScrollOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hexagon-section" ref={sectionRef}>
      <div className="hexagon-container">

        {/* Header text */}
        <div className="header-row">
          <div className="header-content">
            <div className="header-text">
              <h2 className="section-title">
                Lorem Ipsum <br /> Dolor Sit
              </h2>
            </div>

            <div className="header-counter">
              <span className="counter-number">50+</span>
            </div>
          </div>
        </div>

        {/* Hexagon Grid */}
        <div className="hex-grid-wrapper">
          <div className="hex-grid-container" ref={contentRef}>

            <div className="hex-fade-top" />

            <div
              className="hex-grid"
              style={{
                transform: `translateY(-${scrollOffset}px)`,
                transition: 'none',
              }}
            >
              {Array.from({ length: totalRows }).map((_, rowIndex) => (
                <div key={rowIndex} className="hex-row">
                  {getHexagonPositions(rowIndex).map((_, tileIndex) => (
                    <HexTile key={tileIndex} />
                  ))}
                </div>
              ))}
            </div>

            <div className="hex-fade-bottom" />

          </div>
        </div>

      </div>
    </section>
  );
}
