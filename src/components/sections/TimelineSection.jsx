import { useEffect, useRef } from 'react';
import './TimelineSection.css';

const timelineEvents = [
  {
    year: '2022',
    title: 'Company\nFounded',
    description:
      'AIB Technovations was established with a\nmission to bridge the gap between\nadvanced software and hardware solutions\nfor emerging tech challenges',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    imageAlt: 'Startup team collaborating at founding',
  },
  {
    year: '2023',
    title: 'First Major\nClient',
    description:
      'Secured partnership with a Fortune 500\ncompany to develop custom IoT solutions,\nmarking our breakthrough into enterprise-\nlevel projects.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
    imageAlt: 'Enterprise business partnership handshake',
  },
  {
    year: '2024',
    title: 'Expansion to\nAI Solutions',
    description:
      'Launched our specialized AI division,\nfocusing on machine learning integration\nand developing cutting-edge predictive\nanalytics platforms.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
    imageAlt: 'Artificial intelligence and machine learning visualization',
  },
  {
    year: '2024',
    title: 'New Office\nOpening',
    description:
      "Expanded operations with a new\nheadquarters in Indore's tech corridor,\nproviding space for our growing team and\ninnovation lab.",
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    imageAlt: 'Modern tech office interior',
  },
  {
    year: '2025',
    title: 'International\nPartnerships',
    description:
      'Formed strategic partnerships with\ninternational tech firms to collaborate on\ncross-border technology initiatives and\nexpand our global presence.',
    image: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?w=600&q=80',
    imageAlt: 'Global international business network',
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
              {!isRight && (
                <div className="timeline-circle">
                  <img src={event.image} alt={event.imageAlt} className="timeline-circle-img" />
                </div>
              )}

              <div className="timeline-content" ref={(el) => (refs.current[index] = el)}>
                <span className="timeline-line" />
                <div className="timeline-text">
                  <p className="timeline-year">{event.year}</p>
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>

              {isRight && (
                <div className="timeline-circle">
                  <img src={event.image} alt={event.imageAlt} className="timeline-circle-img" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineSection;
