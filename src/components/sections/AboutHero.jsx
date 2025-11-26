import { useEffect, useRef } from 'react';
import './AboutHero.css';

const AboutHero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.3;
        imageRef.current.style.transform = `translate(-120px, ${-180 + scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            Lorem Ipsum Dolor Sit Amet<br />
            Consectetur. Proin Id Dolor<br />
            Lobortis Nam Massa Est. Luctus<br />
            Quis Sit Amet Dui Nec Sem.
          </p>
          <div ref={imageRef} className="about-image-section">
            <div className="about-hero-image" style={{ backgroundImage: "url('https://via.placeholder.com/600x400/D2B48C/D2B48C')" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
