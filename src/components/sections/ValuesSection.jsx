import { useEffect, useRef, useState } from 'react';
import './ValuesSection.css';

const ValuesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const values = [
    {
      title: 'Innovation First',
      description: 'We lead with curiosity and bold ideas, turning emerging technology into real-world advantage for the brands we partner with.'
    },
    {
      title: 'Client Partnership',
      description: 'We treat every engagement as a long-term collaboration — your goals, challenges, and success are the center of our work.'
    },
    {
      title: 'Ethical Technology',
      description: 'We build responsibly. Privacy, accessibility, and social impact are built into every decision, not treated as afterthoughts.'
    },
    {
      title: 'Excellence In Execution',
      description: 'We ship what we promise — on time, at quality, and with the craftsmanship that defines a product built to last.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="values-section">
      <div className="values-container">
        <div className="values-header">
          <div className="values-header-line"></div>
          <p className="values-header-text">
            The principles that shape how we build, collaborate,<br />
            and deliver for every client we work with.
          </p>
          <h2 className="values-title">Our Values</h2>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div
              key={index}
              className={`value-card value-card-${index + 1} ${isVisible ? 'expanded' : ''}`}
            >
              <h3 className="value-card-title">{value.title}</h3>
              <p className="value-card-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
