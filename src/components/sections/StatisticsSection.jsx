import React, { useState, useEffect, useRef } from 'react';
import './StatisticsSection.css';

const StatisticsSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Start animation when section reaches viewport top
      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        // Calculate progress from 0 to 1 based on scroll within section
        const progress = Math.min(Math.max(-sectionTop / (sectionHeight * 0.9), 0), 1);
        setScrollProgress(progress);
      } else if (sectionTop > 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate individual element progress
  const leftTextProgress = Math.min(scrollProgress * 5, 1); // Appears first, quickly and sticks

  // Each stat has three phases: enter, stay, exit
  // Stat 1: 0.10-0.20 (enter), 0.20-0.40 (stay longer), 0.40-0.45 (exit)
  const stat1EnterProgress = Math.max(Math.min((scrollProgress - 0.10) * 10, 1), 0);
  const stat1ExitProgress = Math.max(Math.min((scrollProgress - 0.40) * 20, 1), 0);

  // Stat 2: 0.45-0.55 (enter), 0.55-0.75 (stay longer), 0.75-0.80 (exit)
  const stat2EnterProgress = Math.max(Math.min((scrollProgress - 0.45) * 10, 1), 0);
  const stat2ExitProgress = Math.max(Math.min((scrollProgress - 0.75) * 20, 1), 0);

  // Stat 3: 0.80-0.90 (enter), 0.90-1.0 (stays until end)
  const stat3EnterProgress = Math.max(Math.min((scrollProgress - 0.80) * 10, 1), 0);
  const stat3ExitProgress = 0; // Doesn't exit, stays until section end

  const statistics = [
    { label: 'Lorem', value: '50+', description: 'Lorem Ipsum Dolor Sit Amet Consectetur.' },
    { label: 'Lorem', value: '50+', description: 'Lorem Ipsum Dolor Sit Amet Consectetur.' },
    { label: 'Lorem', value: '50+', description: 'Lorem Ipsum Dolor Sit Amet Consectetur.' }
  ];

  const statEnterProgresses = [stat1EnterProgress, stat2EnterProgress, stat3EnterProgress];
  const statExitProgresses = [stat1ExitProgress, stat2ExitProgress, stat3ExitProgress];

  // Check if section is in view
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const checkInView = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
      setIsInView(inView);
    };

    window.addEventListener('scroll', checkInView);
    checkInView();
    return () => window.removeEventListener('scroll', checkInView);
  }, []);

  return (
    <section className="statistics-section" ref={sectionRef}>
      <div className="statistics-container">
        {/* Left side - Main text - Sticky in center */}
        <div className="statistics-left-sticky" style={{ display: isInView ? 'block' : 'none' }}>
          <h2
            className="statistics-headline"
            style={{
              transform: `translateY(${(1 - leftTextProgress) * 100}px)`,
              opacity: leftTextProgress,
            }}
          >
            Captivate your<br />
            audience's<br />
            senses, non-stop
          </h2>
        </div>

        {/* Right side - Statistics */}
        <div className="statistics-right-animated" style={{ display: isInView ? 'block' : 'none' }}>
          {statistics.map((stat, index) => {
            const enterY = (1 - statEnterProgresses[index]) * 100;
            const exitY = -statExitProgresses[index] * 100;
            const finalY = enterY + exitY;
            const opacity = statEnterProgresses[index] * (1 - statExitProgresses[index]);

            return (
              <div
                key={index}
                className="statistic-item-animated"
                style={{
                  transform: `translateY(${finalY}px)`,
                  opacity: opacity,
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  marginTop: '-100px',
                }}
              >
                <span className="stat-label">{stat.label}</span>
                <div className="stat-value">{stat.value}</div>
                <p className="stat-description">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;