import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesCarousel.css';

const ServicesCarousel = () => {
  const navigate = useNavigate();
  const [hoveredCard1, setHoveredCard1] = useState(null);
  const [hoveredCard2, setHoveredCard2] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Mobile autoplay using Web Animations API — runs independently of React state,
  // CSS animation throttling, scroll events, or page visibility.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    let anim1 = null;
    let anim2 = null;
    let resizeObs = null;

    const startAnimations = () => {
      const track1 = track1Ref.current;
      const track2 = track2Ref.current;
      if (!track1 || !track2) return;

      if (anim1) anim1.cancel();
      if (anim2) anim2.cancel();

      const half1 = track1.scrollWidth / 2;
      const half2 = track2.scrollWidth / 2;
      if (half1 <= 0 || half2 <= 0) return;

      const speed = 50; // px/sec
      const duration1 = (half1 / speed) * 1000;
      const duration2 = (half2 / speed) * 1000;

      anim1 = track1.animate(
        [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: `translate3d(-${half1}px, 0, 0)` },
        ],
        { duration: duration1, iterations: Infinity, easing: 'linear' }
      );

      anim2 = track2.animate(
        [
          { transform: `translate3d(-${half2}px, 0, 0)` },
          { transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: duration2, iterations: Infinity, easing: 'linear' }
      );
    };

    const stopAnimations = () => {
      if (anim1) { anim1.cancel(); anim1 = null; }
      if (anim2) { anim2.cancel(); anim2 = null; }
      const track1 = track1Ref.current;
      const track2 = track2Ref.current;
      if (track1) track1.style.transform = '';
      if (track2) track2.style.transform = '';
    };

    const apply = () => {
      if (mq.matches) {
        // Wait one frame so layout (scrollWidth) is measured
        requestAnimationFrame(() => requestAnimationFrame(startAnimations));
      } else {
        stopAnimations();
      }
    };

    apply();
    mq.addEventListener('change', apply);

    if (typeof ResizeObserver !== 'undefined' && track1Ref.current) {
      resizeObs = new ResizeObserver(() => {
        if (mq.matches) startAnimations();
      });
      resizeObs.observe(track1Ref.current);
    }

    return () => {
      mq.removeEventListener('change', apply);
      if (resizeObs) resizeObs.disconnect();
      stopAnimations();
    };
  }, []);

  const handleViewAllProjects = () => {
    navigate('/portfolio');
  };

  const carouselItems1 = [
    { id: 1, width: 350, imageUrl: '/web/roccia.webp' },
    { id: 2, width: 420, imageUrl: '/web/tita.webp' },
    { id: 3, width: 300, imageUrl: '/web/ninehawks.webp' },
    { id: 4, width: 380, imageUrl: '/web/closet.webp' },
    { id: 5, width: 330, imageUrl: '/web/jmc.webp' },
    { id: 6, width: 360, imageUrl: '/web/nestinwoods.webp' }
  ];

  const carouselItems2 = [
    { id: 7, width: 390, imageUrl: '/web/stone%20gallaxy.webp' },
    { id: 8, width: 340, imageUrl: '/shopify/fayon.webp' },
    { id: 9, width: 370, imageUrl: '/shopify/MILOE.webp' },
    { id: 10, width: 320, imageUrl: '/web/evara.webp' },
    { id: 11, width: 350, imageUrl: '/web/motiveta.webp' },
    { id: 12, width: 400, imageUrl: '/web/GradNext.webp' }
  ];

  // Duplicate items for seamless loop
  const duplicatedItems1 = [...carouselItems1, ...carouselItems1];
  const duplicatedItems2 = [...carouselItems2, ...carouselItems2];

  return (
    <section className="services-carousel-section">

      <div className="carousel-header">
        <button
          className="carousel-nav-btn left"
          onClick={handleViewAllProjects}
          aria-label="View all projects"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <line x1="45" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="2"/>
            <polyline points="25,20 15,30 25,40" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
        <h2 className="carousel-title">OUR SERVICES</h2>
        <button
          className="carousel-nav-btn right"
          onClick={handleViewAllProjects}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="14" stroke="currentColor" strokeWidth="2"/>
            <polyline points="12,9 18,15 12,21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="btn-text">View All Projects</span>
        </button>
      </div>

      <div className="carousel-container">
        <div
          ref={track1Ref}
          className={`carousel-track ${!isMobile && hoveredCard1 !== null ? 'paused' : ''} ${isMobile ? 'js-driven' : ''}`}
        >
          {duplicatedItems1.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`carousel-card ${!isMobile && hoveredCard1 === index ? 'hovered' : ''}`}
              style={{ width: isMobile ? `${Math.round(item.width * 0.5)}px` : `${item.width}px` }}
              onMouseEnter={() => !isMobile && setHoveredCard1(index)}
              onMouseLeave={() => !isMobile && setHoveredCard1(null)}
            >
              <img
                className="carousel-card-img"
                src={item.imageUrl}
                alt=""
                loading="lazy"
                draggable="false"
              />
              <div className="play-button">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" fill="white" stroke="white" strokeWidth="2"/>
                  <path d="M16 12L28 20L16 28V12Z" fill="black"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-container reverse">
        <div
          ref={track2Ref}
          className={`carousel-track reverse ${!isMobile && hoveredCard2 !== null ? 'paused' : ''} ${isMobile ? 'js-driven' : ''}`}
        >
          {duplicatedItems2.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`carousel-card ${!isMobile && hoveredCard2 === index ? 'hovered' : ''}`}
              style={{ width: isMobile ? `${Math.round(item.width * 0.5)}px` : `${item.width}px` }}
              onMouseEnter={() => !isMobile && setHoveredCard2(index)}
              onMouseLeave={() => !isMobile && setHoveredCard2(null)}
            >
              <img
                className="carousel-card-img"
                src={item.imageUrl}
                alt=""
                loading="lazy"
                draggable="false"
              />
              <div className="play-button">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="19" fill="white" stroke="white" strokeWidth="2"/>
                  <path d="M16 12L28 20L16 28V12Z" fill="black"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
