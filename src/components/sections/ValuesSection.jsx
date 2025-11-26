import { useEffect, useRef, useState } from 'react';
import './ValuesSection.css';

const ValuesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const values = [
    {
      title: 'Innovation First',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur.'
    },
    {
      title: 'Client Partnership',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur.'
    },
    {
      title: 'Ethical Technology',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur.'
    },
    {
      title: 'Excellence In Execution',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur.'
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
            Lorem Ipsum Dolor Sit Amet Consectetur. Pharotra<br />
            Enim Suscipit Egestas Tristique In.
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
