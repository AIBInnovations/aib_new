import React, { useState, useEffect, useRef } from 'react';
import './HexagonSection.css';

const brandLogos = [
  { name: 'Roccia', logo: '/logos/roccia.png' },
  { name: 'This Is That', logo: '/logos/thisisthat.png' },
  { name: 'Nine Hawks', logo: '/logos/ninehawks.png' },
  { name: 'Closet', logo: '/logos/closet.png' },
  { name: 'JMC', logo: '/logos/jmc.png' },
  { name: 'Nestin Woods', logo: '/logos/nestinwoods.png' },
  { name: 'NM Group', logo: '/logos/nmgroup.png' },
  { name: 'Stone Galaxy', logo: '/logos/stonegalaxy.png' },
  { name: 'Digexa', logo: '/logos/digexa.png' },
  { name: 'Cleanse', logo: '/logos/cleanse.png' },
  { name: 'JLU', logo: '/logos/jlu.png' },
  { name: 'GradNext', logo: '/logos/gradnext.png' },
  { name: 'Evara', logo: '/logos/evara.png' },
  { name: 'Balaji', logo: '/logos/balaji.png' },
  { name: 'PGME', logo: '/logos/pgme.png' },
  { name: 'Motivata', logo: '/logos/motivata.png' },
  { name: 'Fayon Kids', logo: '/logos/fayon.png' },
  { name: 'Thomas Crick', logo: '/logos/thomas.png' },
  { name: 'Alesons', logo: '/logos/alesons.png' },
  { name: 'Cristello', logo: '/logos/cristello.png' },
  { name: 'Herbal Tribe', logo: '/logos/herbaltribe.png' },
  { name: 'Fungy Fab', logo: '/logos/fungyfab.png' },
  { name: 'DPetals', logo: '/logos/dpetals.png' },
  { name: 'Miloe', logo: '/logos/miloe.png' },
  { name: 'Migo', logo: '/logos/migo.png' },
  { name: 'Biharo', logo: '/logos/biharo.png' },
  { name: 'Shahi Voyage', logo: '/logos/shahivoyage.png' },
  { name: 'Kushagra', logo: '/logos/kushagra.png' },
  { name: 'Ascent', logo: '/logos/ascent.png' },
  { name: 'Vipulanchal', logo: '/logos/vipulanchal.png' },
  { name: 'Dream Vista', logo: '/logos/dreamvista.png' },
  { name: 'DS Overseas', logo: '/logos/dsoverseas.png' },
  { name: 'Warmex', logo: '/logos/warmex.png' },
];

// Total tiles: 15 even rows × 11 + 15 odd rows × 10 = 315
const TOTAL_ROWS = 30;
const TOTAL_TILES = 315;

// Fill every hexagon with a logo — cycle through all brand logos across all 315 tiles
// so every card on screen (center + edges) is populated.
// Offset the starting index per row so vertical repeats are staggered, not aligned.
const logoTileMap = (() => {
  const map = new Map();
  let tileIdx = 0;
  let startIdx = 0;
  for (let row = 0; row < TOTAL_ROWS; row++) {
    const hexInRow = row % 2 === 0 ? 11 : 10;
    for (let col = 0; col < hexInRow; col++) {
      map.set(tileIdx, brandLogos[(startIdx + col) % brandLogos.length]);
      tileIdx++;
    }
    // Shift the starting logo index each row so the same logo doesn't stack vertically
    startIdx = (startIdx + 7) % brandLogos.length;
  }
  return map;
})();

/* Hexagon Tile */
function HexTile({ highlighted, logo }) {
  return (
    <div className="hex-tile" style={{ position: 'relative' }}>
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
          style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
        />
      </svg>
      {logo && (
        <div className="hex-logo-wrapper">
          <img src={logo.logo} alt={logo.name} className="hex-logo-img" />
        </div>
      )}
    </div>
  );
}

/* Hexagon Section */
export default function HexagonSection() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [highlightedStartRow, setHighlightedStartRow] = useState(1);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const highlightedRowCount = 3;

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

  /* SCROLL LOGIC */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const gridHeight = contentRef.current.scrollHeight;
      const viewport = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      const maxOffset = gridHeight - viewport;

      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        const scrollProgress = Math.abs(sectionTop) / sectionHeight;
        const offset = Math.min(scrollProgress * maxOffset, maxOffset);

        setScrollOffset(offset);

        if (isMobile) {
          const rowHeight = 47;
          const visibleHeight = contentRef.current.clientHeight;
          const paddingTop = 120;
          const centerPosition = offset + (visibleHeight / 2) - paddingTop;
          const centerRow = Math.floor(centerPosition / rowHeight);
          const maxStartRow = TOTAL_ROWS - highlightedRowCount;
          setHighlightedStartRow(Math.max(0, Math.min(centerRow, maxStartRow)));
        } else {
          const rowHeight = 86;
          const visibleRows = Math.floor(offset / rowHeight);
          setHighlightedStartRow(Math.max(0, visibleRows + 1));
        }
      } else if (sectionTop > 0) {
        setScrollOffset(0);
        setHighlightedStartRow(1);
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
          <h2 className="section-title">Brands We've Built</h2>
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
              {(() => {
                let tileIndex = 0;
                return Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => {
                  const isHighlighted =
                    rowIndex >= highlightedStartRow &&
                    rowIndex < highlightedStartRow + highlightedRowCount;
                  return (
                    <div key={rowIndex} className="hex-row">
                      {getHexagonPositions(rowIndex).map((_, colIndex) => {
                        const logo = logoTileMap.get(tileIndex) || null;
                        tileIndex++;
                        return (
                          <HexTile
                            key={colIndex}
                            highlighted={isHighlighted}
                            logo={logo}
                          />
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </div>

            <div className="hex-fade-bottom" />

          </div>
        </div>

      </div>
    </section>
  );
}
