import React, { useEffect, useRef, useState } from 'react';
import './CurvedProjectGallery.css';

// Default sample project data
const defaultPanels = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    href: '#project-1'
  },
  {
    id: 2,
    title: 'Smart Home Automation System',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    href: '#project-2'
  },
  {
    id: 3,
    title: 'E-commerce Platform Redesign',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    href: '#project-3'
  },
  {
    id: 4,
    title: 'Mobile Banking Application',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    href: '#project-4'
  },
  {
    id: 5,
    title: 'Healthcare Management Portal',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    href: '#project-5'
  },
  {
    id: 6,
    title: 'Blockchain Trading Platform',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    href: '#project-6'
  },
  {
    id: 7,
    title: 'Cloud Infrastructure Solution',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    href: '#project-7'
  },
  {
    id: 8,
    title: 'AR/VR Experience Platform',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80',
    href: '#project-8'
  }
];

export default function CurvedProjectGallery({
  panels = defaultPanels,
  autoScroll = true,
  speed = 30,
  ctaHref = '/projects',
  ctaLabel = 'View All Projects',
}) {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, offset: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const rafRef = useRef(null);
  const prevTimeRef = useRef(null);
  const trackRef = useRef(null);
  const buttonRef = useRef(null);
  const velocityRef = useRef(0);
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const decayRafRef = useRef(null);

  // ===== Auto-scroll =====
  useEffect(() => {
    if (!autoScroll) return;

    const animate = (time) => {
      if (prevTimeRef.current != null && !isPaused) {
        const dt = (time - prevTimeRef.current) / 1000;
        const track = trackRef.current;
        if (track) {
          const totalWidth = track.scrollWidth / 2; // duplicated list
          setOffset((prev) => {
            const next = prev - currentSpeed * dt;
            return next <= -totalWidth ? 0 : next;
          });
        }
      }
      prevTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      prevTimeRef.current = null;
    };
  }, [autoScroll, currentSpeed, isPaused]);

  // ===== Speed decay back to normal =====
  useEffect(() => {
    if (isPaused || currentSpeed === speed) return;

    const decaySpeed = () => {
      setCurrentSpeed((curr) => {
        const diff = curr - speed;
        // Decay by 5% each frame, stop when close enough
        if (Math.abs(diff) < 1) return speed;
        return curr - diff * 0.03;
      });
      decayRafRef.current = requestAnimationFrame(decaySpeed);
    };

    decayRafRef.current = requestAnimationFrame(decaySpeed);
    return () => {
      if (decayRafRef.current) cancelAnimationFrame(decayRafRef.current);
    };
  }, [isPaused, currentSpeed, speed]);

  const displayPanels = autoScroll ? [...panels, ...panels] : panels;

  const containerClipId = 'container-curve';

  // ===== Drag Handlers =====
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setIsPaused(true);
    setHasDragged(false);
    setDragStart({ x: clientX, offset });
    lastDragX.current = clientX;
    lastDragTime.current = performance.now();
    velocityRef.current = 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - dragStart.x;

    // Mark as dragged if moved more than 5px (to distinguish from clicks)
    if (Math.abs(diff) > 5) {
      setHasDragged(true);
    }

    // Calculate velocity (pixels per second)
    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 0) {
      const dx = clientX - lastDragX.current;
      velocityRef.current = (dx / dt) * 1000; // Convert to px/s
    }
    lastDragX.current = clientX;
    lastDragTime.current = now;

    let newOffset = dragStart.offset + diff;

    // Handle infinite scroll wrapping
    if (autoScroll && trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth / 2;
      if (newOffset > 0) {
        newOffset = -totalWidth + newOffset;
      } else if (newOffset < -totalWidth) {
        newOffset = newOffset + totalWidth;
      }
    }

    setOffset(newOffset);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (autoScroll) {
      // Apply drag velocity to scroll speed (negative velocity = dragging left = faster scroll)
      const boostMultiplier = 3; // How much drag affects speed
      const minSpeed = speed * 0.5; // Minimum speed (half of normal)
      const maxSpeed = speed * 8; // Maximum speed (8x normal)

      // Velocity is negative when dragging left (same direction as scroll)
      const newSpeed = Math.min(maxSpeed, Math.max(minSpeed, speed - velocityRef.current * boostMultiplier / 100));
      setCurrentSpeed(newSpeed);
      setIsPaused(false);
    }
  };

  // Prevent link clicks when dragging
  const handleLinkClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  // Mouse events
  const onMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    } else if (autoScroll) {
      setIsPaused(false);
    }
  };

  // Touch events
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Handle mouse enter for button fill animation
  const handleMouseEnter = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleMouseLeave = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Update position to exit point
    setMousePosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <section className="curved-section bg-black">
      <div className="curved-container">
        <div className="curved-inner">
          {/* Hidden SVG defining container curve (convex) */}
          <svg width="0" height="0" className="clip-svg">
            <defs>
              <clipPath id={containerClipId} clipPathUnits="objectBoundingBox">
                <path
                  d="
                    M 0,0
                    Q 0.5,0.4 1,0
                    L 1,1
                    Q 0.5,0.6 0,1
                    Z
                  "
                />
              </clipPath>
            </defs>
          </svg>

          {/* Main scrolling container with curved top & bottom */}
          <div
            className="main-scroll-container"
            style={{
              clipPath: `url(#${containerClipId})`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseEnter={() => !isDragging && autoScroll && setIsPaused(true)}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <ul
              ref={trackRef}
              className="projects-track"
              style={{
                transform: autoScroll ? `translateX(${offset}px)` : 'none',
                transition: autoScroll ? 'none' : 'transform 0.3s ease',
                willChange: autoScroll ? 'transform' : 'auto',
              }}
            >
              {displayPanels.map((panel, index) => {
                return (
                  <li
                    key={`${panel.id ?? 'panel'}-${index}`}
                    className="project-item"
                  >
                    <a
                      href={panel.href || '#'}
                      aria-label={panel.title || 'Project'}
                      className="project-link"
                      onClick={handleLinkClick}
                      draggable={false}
                    >
                      {/* Image fills the card height */}
                      <div className="image-container">
                        {panel.image ? (
                          <img
                            src={panel.image}
                            alt={panel.title || 'Project'}
                            className="project-image"
                            draggable={false}
                          />
                        ) : (
                          <div className="project-placeholder" />
                        )}

                        {/* Vignette overlay */}
                        <div className="vignette-overlay" />
                      </div>

                      {/* Title overlay */}
                      {panel.title && (
                        <div className="title-overlay">
                          <h3 className="project-title">
                            {panel.title}
                          </h3>
                        </div>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-container">
        <a
          href={ctaHref}
          className="cta-button"
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="cta-button-fill"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
          />
          <span className="cta-text">{ctaLabel}</span>
          <span className="cta-arrow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}