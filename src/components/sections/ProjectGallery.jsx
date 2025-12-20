import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProjectGallery.css';

// ✅ Move projects outside component to prevent recreation on every render
const PROJECTS = [
  {
    id: 1,
    title: 'PROJECT 1',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'PROJECT 2',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    category: 'Mobile App'
  },
  {
    id: 3,
    title: 'PROJECT 3',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'UI/UX Design'
  },
  {
    id: 4,
    title: 'PROJECT 4',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    category: 'Branding'
  },
  {
    id: 5,
    title: 'PROJECT 5',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    category: 'Web Development'
  },
  {
    id: 6,
    title: 'PROJECT 6',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    category: 'Mobile App'
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
