import { useEffect, useRef } from 'react';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const trackRef = useRef(null);

  const projects = [
    { id: 1, title: 'Project 1', category: 'Web Development' },
    { id: 2, title: 'Project 2', category: 'Mobile App' },
    { id: 3, title: 'Project 3', category: 'UI/UX Design' },
    { id: 4, title: 'Project 4', category: 'Branding' },
    { id: 5, title: 'Project 5', category: 'Web Development' },
    { id: 6, title: 'Project 6', category: 'Mobile App' },
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateCardTransforms = () => {
      const cards = track.querySelectorAll('.project-card');
      const containerCenter = window.innerWidth / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        // Calculate distance from center of viewport
        const distanceFromCenter = cardCenter - containerCenter;

        // Normalize distance (-1 to 1, where 0 is center)
        const normalizedDistance = distanceFromCenter / (window.innerWidth / 2);

        // Calculate Y-axis rotation based on position
        // Cards on left: negative rotation (tilt forward from left edge)
        // Cards on right: positive rotation (tilt forward from right edge)
        // Maximum rotation: 65 degrees (very intense)
        const rotateY = normalizedDistance * -65;

        // Add translateZ to push cards forward based on rotation amount
        // This prevents overlap by compensating for the rotation
        const translateZ = Math.abs(normalizedDistance) * 200;

        // Apply transform
        card.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      });
    };

    // Initial update
    updateCardTransforms();

    // Update continuously for smooth effect
    const intervalId = setInterval(updateCardTransforms, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="project-gallery" id="portfolio">
      <h2 className="gallery-heading">FEATURED WORKS</h2>
      <div className="carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {/* First set of cards */}
          {projects.map((project) => (
            <div key={`first-${project.id}`} className="project-card">
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {projects.map((project) => (
            <div key={`second-${project.id}`} className="project-card">
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
