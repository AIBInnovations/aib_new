import { useEffect, useRef } from 'react';
import './TimelineSection.css';

const timelineEvents = [
  {
    year: '2022',
    title: 'Company\nFounded',
    description:
      'AIB Innovations was established with a\nmission to bridge the gap between\nadvanced software and hardware solutions\nfor emerging tech challenges',
  },
  {
    year: '2023',
    title: 'First Major\nClient',
    description:
      'Secured partnership with a Fortune 500\ncompany to develop custom IoT solutions,\nmarking our breakthrough into enterprise-\nlevel projects.',
  },
  {
    year: '2024',
    title: 'Expansion to\nAI Solutions',
    description:
      'Launched our specialized AI division,\nfocusing on machine learning integration\nand developing cutting-edge predictive\nanalytics platforms.',
  },
  {
    year: '2024',
    title: 'New Office\nOpening',
    description:
      "Expanded operations with a new\nheadquarters in Indore's tech corridor,\nproviding space for our growing team and\ninnovation lab.",
  },
  {
    year: '2025',
    title: 'International\nPartnerships',
    description:
      'Formed strategic partnerships with\ninternational tech firms to collaborate on\ncross-border technology initiatives and\nexpand our global presence.',
  },
];

const TimelineSection = () => {
  const refs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      refs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const offset =
          (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.15;
        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="timeline-section">
      <h2 className="timeline-heading">Our Timeline</h2>

      <div className="timeline-container">
        <span className="timeline-center-line" />

        {timelineEvents.map((event, index) => {
          const isRight = index % 2 === 0;

          return (
            <div
              key={index}
              className={`timeline-row ${isRight ? 'right' : 'left'}`}
            >
              {!isRight && <div className="timeline-circle" />}

              <div className="timeline-content" ref={(el) => (refs.current[index] = el)}>
                <span className="timeline-line" />
                <div className="timeline-text">
                  <p className="timeline-year">{event.year}</p>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>

              {isRight && <div className="timeline-circle" />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineSection;
