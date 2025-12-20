import React, { useState } from 'react';
import './ServicesCarousel.css';

const ServicesCarousel = () => {
  const [hoveredCard1, setHoveredCard1] = useState(null);
  const [hoveredCard2, setHoveredCard2] = useState(null);

  const carouselItems1 = [
    { id: 1, width: 350, imageUrl: 'https://via.placeholder.com/350x250/B8B8B8/B8B8B8' },
    { id: 2, width: 420, imageUrl: 'https://via.placeholder.com/420x250/A8A8A8/A8A8A8' },
    { id: 3, width: 300, imageUrl: 'https://via.placeholder.com/300x250/B8B8B8/B8B8B8' },
    { id: 4, width: 380, imageUrl: 'https://via.placeholder.com/380x250/A8A8A8/A8A8A8' },
    { id: 5, width: 330, imageUrl: 'https://via.placeholder.com/330x250/B8B8B8/B8B8B8' },
    { id: 6, width: 360, imageUrl: 'https://via.placeholder.com/360x250/A8A8A8/A8A8A8' }
  ];

  const carouselItems2 = [
    { id: 7, width: 390, imageUrl: 'https://via.placeholder.com/390x250/B8B8B8/B8B8B8' },
    { id: 8, width: 340, imageUrl: 'https://via.placeholder.com/340x250/A8A8A8/A8A8A8' },
    { id: 9, width: 370, imageUrl: 'https://via.placeholder.com/370x250/B8B8B8/B8B8B8' },
    { id: 10, width: 320, imageUrl: 'https://via.placeholder.com/320x250/A8A8A8/A8A8A8' },
    { id: 11, width: 350, imageUrl: 'https://via.placeholder.com/350x250/B8B8B8/B8B8B8' },
    { id: 12, width: 400, imageUrl: 'https://via.placeholder.com/400x250/A8A8A8/A8A8A8' }
  ];

  // Duplicate items for seamless loop
  const duplicatedItems1 = [...carouselItems1, ...carouselItems1];
  const duplicatedItems2 = [...carouselItems2, ...carouselItems2];

  return (
    <section className="services-carousel-section">

      <div className="carousel-header">
        <button className="carousel-nav-btn left">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <line x1="45" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="2"/>
            <polyline points="25,20 15,30 25,40" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
        <h2 className="carousel-title">OUR SERVICES</h2>
        <button className="carousel-nav-btn right">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="14" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12,9 18,15 12,21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="btn-text">View All Projects</span>
        </button>
      </div>

      <div className="carousel-container">
        <div className={`carousel-track ${hoveredCard1 !== null ? 'paused' : ''}`}>
          {duplicatedItems1.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`carousel-card ${hoveredCard1 === index ? 'hovered' : ''}`}
              style={{ width: `${item.width}px` }}
              onMouseEnter={() => setHoveredCard1(index)}
              onMouseLeave={() => setHoveredCard1(null)}
            >
              <div className="carousel-card-image" style={{ backgroundImage: `url(${item.imageUrl})` }}>
                <div className="play-button">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="white" strokeWidth="2"/>
                    <path d="M16 12L28 20L16 28V12Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-container reverse">
        <div className={`carousel-track reverse ${hoveredCard2 !== null ? 'paused' : ''}`}>
          {duplicatedItems2.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`carousel-card ${hoveredCard2 === index ? 'hovered' : ''}`}
              style={{ width: `${item.width}px` }}
              onMouseEnter={() => setHoveredCard2(index)}
              onMouseLeave={() => setHoveredCard2(null)}
            >
              <div className="carousel-card-image" style={{ backgroundImage: `url(${item.imageUrl})` }}>
                <div className="play-button">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" fill="white" stroke="white" strokeWidth="2"/>
                    <path d="M16 12L28 20L16 28V12Z" fill="black"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
