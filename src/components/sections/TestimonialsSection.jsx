import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = ({
  initialIndex = 0,
  autoPlay = true,
  intervalMs = 4000,
  title = "TESTIMONIES"
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: '1',
      name: 'Akshat Jain',
      role: 'Chief Executive Officer',
      quote: 'Working with AIB Innovations transformed our business. Their innovative approach and technical expertise delivered results beyond our expectations.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'Bhavya Kothari',
      role: 'Chief Technology Officer',
      quote: 'The team at AIB demonstrated exceptional skill in building our platform. Their attention to detail and commitment to quality is unmatched.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Ishan Jain',
      role: 'Chief Operating Officer',
      quote: 'AIB Innovations brought our vision to life with their cutting-edge solutions. The entire process was smooth and highly professional.',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    {
      id: '4',
      name: 'Priya Sharma',
      role: 'Head of Design',
      quote: 'Their creative approach and technical prowess created a product that exceeded all our requirements. Truly exceptional work.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
      id: '5',
      name: 'Rahul Verma',
      role: 'Lead Developer',
      quote: 'The innovation and dedication shown by AIB team is remarkable. They delivered a robust solution that perfectly fits our needs.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    },
    {
      id: '6',
      name: 'Sarah Chen',
      role: 'Product Manager',
      quote: 'Outstanding collaboration and execution. AIB Innovations delivered a seamless experience from concept to deployment.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop'
    }
  ];

  // Auto-play rotation
  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, intervalMs);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [autoPlay, intervalMs, testimonials.length]);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  // Calculate circular positions
  const getCircularPosition = (index) => {
    const totalItems = testimonials.length;
    const angleStep = (2 * Math.PI) / totalItems;
    const position = (index - activeIndex + totalItems) % totalItems;

    // Calculate angle (0 is center/right, rotate counter-clockwise)
    const angle = position * angleStep;

    // Radius of the circle
    const radius = 220;

    // Calculate x, y (center is at 0,0)
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Center item (position 0) is always highlighted
    const isCenter = position === 0;

    return {
      transform: `translate(${x}px, ${y}px)`,
      isCenter,
      zIndex: isCenter ? 10 : 5
    };
  };

  // Get the center testimonial for displaying quote
  const centerTestimonial = testimonials[activeIndex];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Section Title */}
        <h2 className="testimonials-heading">{title}</h2>

        {/* Content */}
        <div className="testimonials-content">
          {/* LEFT: Avatars in circular layout */}
          <div className="testimonials-avatars">
            {/* SVG curve for visual */}
            <svg className="circular-path" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="220"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
            </svg>

            {/* Avatars */}
            <div className="avatars-circle">
              {testimonials.map((item, index) => {
                const positionStyle = getCircularPosition(index);
                const isCenter = positionStyle.isCenter;

                return (
                  <div
                    key={item.id}
                    className="avatar-wrapper-circular"
                    style={{
                      transform: positionStyle.transform,
                      zIndex: positionStyle.zIndex
                    }}
                  >
                    <button
                      onClick={() => handleSelect(index)}
                      className={`avatar-button ${isCenter ? 'active' : ''}`}
                    >
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="avatar-image"
                      />
                    </button>

                    {/* Name + Role - only show for center */}
                    {isCenter && (
                      <div className="avatar-info active">
                        <h3 className="avatar-name">{item.name}</h3>
                        <p className="avatar-role">{item.role}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Quote for center testimonial */}
          <div className="testimonials-quotes">
            <blockquote className="quote-text active">
              "{centerTestimonial.quote}"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;