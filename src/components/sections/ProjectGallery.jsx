import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProjectGallery.css';

// ✅ Move projects outside component to prevent recreation on every render
const PROJECTS = [
  {
    id: 1,
    title: 'ROCCIA',
    year: '2024',
    image: '/web/roccia.webp',
    category: 'Web Design'
  },
  {
    id: 2,
    title: 'THIS IS THAT',
    year: '2024',
    image: '/web/tita.webp',
    category: 'Web Design'
  },
  {
    id: 3,
    title: 'NINE HAWKS',
    year: '2024',
    image: '/web/ninehawks.webp',
    category: 'Web Design'
  },
  {
    id: 4,
    title: 'CLOSET',
    year: '2024',
    image: '/web/closet.webp',
    category: 'Web Application'
  },
  {
    id: 5,
    title: 'EVARA',
    year: '2024',
    image: '/web/evara.webp',
    category: 'Web Design'
  },
  {
    id: 6,
    title: 'MOTIVATA',
    year: '2024',
    image: '/web/motiveta.webp',
    category: 'Web Design'
  },
];

const ProjectGallery = () => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll('.project-card');

    // ✅ Cleanup function to reset styles
    const cleanup = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      // Reset inline styles
      gsap.set(track, { clearProps: 'all' });
      cards.forEach(card => {
        card.style.transform = '';
      });
    };

    const initCarousel = () => {
      cleanup();

      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      // ================= MOBILE =================
      if (isMobile) {
        cards.forEach(card => {
          card.style.transform = 'none';
        });
        return;
      }

      // ================= DESKTOP =================
      // ✅ Calculate gap from actual CSS instead of hardcoding
      const trackStyles = window.getComputedStyle(track);
      const gap = parseFloat(trackStyles.gap) || 24;
      const speed = 0.6;
      let x = 0;

      // Measure one full set width INCLUDING the gap after the last card
      // This ensures seamless wrapping without jerks
      const singleSetWidth =
        Array.from(cards)
          .slice(0, PROJECTS.length)
          .reduce((sum, card) => sum + card.offsetWidth, 0) +
        gap * PROJECTS.length; // ✅ Include gap after last card for seamless wrap

      // ✅ Wrap instead of reset (NO JERK)
      const wrapX = gsap.utils.wrap(-singleSetWidth, 0);

      const moveTrack = () => {
        x -= speed;
        x = wrapX(x);
        gsap.set(track, { x });
      };

      gsap.ticker.add(moveTrack);

      // 3D tilt with spacing compensation
      const updateTilt = () => {
        const center = window.innerWidth / 2;

        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = (cardCenter - center) / center;

          const rotateY = distance * -35;
          const translateZ = Math.abs(distance) * 120;

          // ✅ Calculate how much narrower the card appears when rotated
          const rotateYRad = (rotateY * Math.PI) / 180;
          const cosAngle = Math.cos(Math.abs(rotateYRad));

          // ✅ Adjust position to compensate for visual width loss
          // This keeps the perceived gaps consistent
          const compensation = (card.offsetWidth * (1 - cosAngle)) / 2;
          const translateX = distance > 0 ? -compensation : compensation;

          card.style.transform =
            `translateX(${translateX}px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        });

        rafRef.current = requestAnimationFrame(updateTilt);
      };

      updateTilt();

      // Store cleanup function
      cleanupRef.current = () => {
        gsap.ticker.remove(moveTrack);
      };
    };

    initCarousel();

    // ✅ Add resize handler to adapt to viewport changes
    const handleResize = () => {
      initCarousel();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []); // ✅ Empty deps OK now since PROJECTS is constant

  return (
    <section className="project-gallery">
      <h2 className="gallery-heading">FEATURED WORKS</h2>

      <div className="carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {[...PROJECTS, ...PROJECTS].map((project, index) => (
            <div className="project-card" key={`${project.id}-${index}`}>
              <img
                className="card-image"
                src={project.image}
                alt={project.title}
                loading="lazy"
                draggable="false"
              />
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
