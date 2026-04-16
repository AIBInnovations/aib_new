import { useEffect, useRef } from 'react';
import './AboutHero.css';

const AboutHero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Parallax only on desktop — mobile layouts reposition the image
    // section and can't accommodate the fixed pixel offsets.
    const isDesktop = window.matchMedia('(min-width: 1025px)');

    const handleScroll = () => {
      if (!imageRef.current || !isDesktop.matches) return;
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.3;
      imageRef.current.style.transform = `translate(-120px, ${-180 + scrolled * parallaxSpeed}px)`;
    };

    const handleBreakpointChange = (e) => {
      if (!imageRef.current) return;
      if (!e.matches) {
        imageRef.current.style.transform = '';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    isDesktop.addEventListener('change', handleBreakpointChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      isDesktop.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  return (
    <section className="about-hero">
      <div className="about-hero-content">
        <h1 className="about-hero-title">
          MOVING PEOPLE,<br />
          BRANDS &<br />
          VISUAL CULTURE
        </h1>
        <div className="about-bottom-section">
          <p className="about-hero-description">
            We are AIB — a multidisciplinary<br />
            innovation studio shaping the<br />
            future of brands through software,<br />
            design, and emerging technology.
          </p>
          <div ref={imageRef} className="about-image-section">
            <video
              className="about-hero-video"
              src="/vid/Infinite_Loop_Tech_Video_Generation.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
