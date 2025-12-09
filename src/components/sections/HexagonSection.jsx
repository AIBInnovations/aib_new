import React, { useState, useEffect, useRef } from 'react';
import './HexagonSection.css';

/*️⃣ Hexagon Tile */
function HexTile({ highlighted }) {
  return (
    <div
      className="hex-tile"
      style={{
        position: 'relative',
      }}
    >
      {/* SVG hexagon with optional border */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 87"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          width: 'calc(100% + 2px)',
          height: 'calc(100% + 2px)',
          overflow: 'visible',
        }}
      >
        <polygon
          points="25,1 75,1 99,43.5 75,86 25,86 1,43.5"
          fill="rgba(255, 255, 255, 0.05)"
          stroke={highlighted ? '#A7A7A7' : 'transparent'}
          strokeWidth={highlighted ? 1 : 0}
          style={{
            transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
          }}
        />
      </svg>
    </div>
  );
}

/*️⃣ Hexagon Section */
export default function HexagonSection() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [highlightedStartRow, setHighlightedStartRow] = useState(1);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const totalRows = 30;
  const highlightedRowCount = 3; // Number of rows to highlight

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

  /*️⃣ SCROLL LOGIC with mobile centering fix */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const gridHeight = contentRef.current.scrollHeight;
      const viewport = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      // ⭐ MAX allowed movement: NEVER more than this
      const maxOffset = gridHeight - viewport;

      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        const scrollProgress = Math.abs(sectionTop) / sectionHeight;

        // ⭐ Prevent empty space — limit movement
        const offset = Math.min(scrollProgress * maxOffset, maxOffset);

        setScrollOffset(offset);

        // Calculate which row should start the highlight
        if (isMobile) {
          // Mobile: Keep highlight centered in the visible area - ADJUSTED
          const rowHeight = 47; // Mobile row height (87px - 40px overlap)
          const visibleHeight = contentRef.current.clientHeight; // 420px
          const paddingTop = 120; // From CSS
          
          // Calculate which row is at the center of the visible container
          const centerPosition = offset + (visibleHeight / 2) - paddingTop;
          const centerRow = Math.floor(centerPosition / rowHeight);
          
          // Center the 3-row highlight group - REMOVED the +1 shift
          // This makes the highlight lineup earlier/higher on mobile
          const maxStartRow = totalRows - highlightedRowCount;
          setHighlightedStartRow(Math.max(0, Math.min(centerRow, maxStartRow)));
        } else {
          // Desktop: Original logic
          const rowHeight = 86; // Desktop row height (156px - 70px overlap)
          const visibleRows = Math.floor(offset / rowHeight);
          setHighlightedStartRow(Math.max(0, visibleRows + 1));
        }
      } else if (sectionTop > 0) {
        setScrollOffset(0);
        setHighlightedStartRow(isMobile ? 1 : 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
              {Array.from({ length: totalRows }).map((_, rowIndex) => {
                const isHighlighted = rowIndex >= highlightedStartRow && rowIndex < highlightedStartRow + highlightedRowCount;
                return (
                  <div key={rowIndex} className="hex-row">
                    {getHexagonPositions(rowIndex).map((_, tileIndex) => (
                      <HexTile key={tileIndex} highlighted={isHighlighted} />
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="hex-fade-bottom" />

          </div>
        </div>

      </div>
    </section>
  );
}