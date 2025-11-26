import { useEffect, useRef } from 'react';
import './TimelineSection.css';

const TimelineSection = () => {
  const textRefs = useRef([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      textRefs.current.forEach((textElement) => {
        if (!textElement) return;

        const rect = textElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        // Calculate offset based on distance from viewport center
        const distance = elementCenter - viewportCenter;
        const parallaxSpeed = 0.15;
        const offset = -distance * parallaxSpeed;

        textElement.style.transform = `translateY(${offset}px)`;
      });

      lineRefs.current.forEach((lineElement) => {
        if (!lineElement) return;

        const rect = lineElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        // Calculate offset based on distance from viewport center
        const distance = elementCenter - viewportCenter;
        const parallaxSpeed = 0.15;
        const offset = -distance * parallaxSpeed;

        lineElement.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    {
      year: '2022',
      title: 'Company\nFounded',
      description: 'AIB Innovations was established with a\nmission to bridge the gap between\nadvanced software and hardware solutions\nfor emerging tech challenges',
      position: 'right'
    },
    {
      year: '2023',
      title: 'First Major\nClient',
      description: 'Secured partnership with a Fortune 500\ncompany to develop custom IoT solutions,\nmarking our breakthrough into enterprise-\nlevel projects.',
      position: 'left'
    },
    {
      year: '2024',
      title: 'Expansion to\nAI Solutions',
      description: 'Launched our specialized AI division,\nfocusing on machine learning integration\nand developing, cutting-edge predictive\nanalytics platforms.',
      position: 'right'
    },
    {
      year: '2024',
      title: 'New Office\nOpening',
      description: 'Expanded operations with a new\nheadquarters in Indore\'s tech corridor,\nproviding space for our growing team and\ninnovation lab.',
      position: 'left'
    },
    {
      year: '2025',
      title: 'International\nPartnerships',
      description: 'Formed strategic partnerships with\ninternational tech firms to collaborate on\ncross-border technology initiatives and\nexpand our global presence.',
      position: 'right'
    }
  ];

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">Our Timeline</h2>
      <div className="timeline-container">
        <div className="timeline-vertical-line"></div>
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`timeline-item timeline-item-${event.position}`}
          >
            {event.position === 'right' ? (
              <>
                <div className="timeline-content">
                  <div
                    className="timeline-line"
                    ref={(el) => (lineRefs.current[index] = el)}
                  ></div>
                  <div
                    className="timeline-text"
                    ref={(el) => (textRefs.current[index] = el)}
                  >
                    <p className="timeline-year">{event.year}</p>
                    <h3 className="timeline-title">{event.title}</h3>
                    <p className="timeline-description">{event.description}</p>
                  </div>
                </div>
                <div className="timeline-circle"></div>
              </>
            ) : (
              <>
                <div className="timeline-circle"></div>
                <div className="timeline-content">
                  <div
                    className="timeline-line"
                    ref={(el) => (lineRefs.current[index] = el)}
                  ></div>
                  <div
                    className="timeline-text"
                    ref={(el) => (textRefs.current[index] = el)}
                  >
                    <p className="timeline-year">{event.year}</p>
                    <h3 className="timeline-title">{event.title}</h3>
                    <p className="timeline-description">{event.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
