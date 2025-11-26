import React, { useState, useEffect } from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      number: '01',
      title: 'Web Design',
      description: 'Ready for a new website? We guide you from start to finish.',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop'
    },
    {
      number: '02',
      title: 'AI & Machine Learning',
      description: 'Launch your AI solution swiftly and cost-perfect using the no-code platform Webflow.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    },
    {
      number: '03',
      title: 'Brand Design',
      description: "We transform your company's core values into striking visuals and impactful messaging.",
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop'
    },
    {
      number: '04',
      title: 'Cloud Solutions',
      description: 'Want to make an impact? With 3D animations, you can leave.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    {
      number: '05',
      title: 'Mobile Development',
      description: "Striking the right chord isn't exclusive to musicians.",
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    {
      number: '06',
      title: 'Cyber Security',
      description: "Striking the right chord isn't exclusive to musicians.",
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-heading">OUR SERVICES</h2>

        <div className="services-list">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button className="service-arrow" aria-label={`Learn more about ${service.title}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor-following image */}
      {hoveredService !== null && (
        <div
          className="service-cursor-image"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 120,
            backgroundImage: `url(${services[hoveredService].imageUrl})`
          }}
        />
      )}
    </section>
  );
};

export default ServicesSection;