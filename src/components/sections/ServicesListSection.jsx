import React, { useEffect, useRef, useState } from 'react';
import './ServicesListSection.css';

const ServicesListSection = () => {
  const rowRefs = useRef([]);
  const [collapsedRows, setCollapsedRows] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const collapsed = [];

      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        const rect = row.getBoundingClientRect();
        const titleElement = row.querySelector('.service-title');
        const titleRect = titleElement?.getBoundingClientRect();

        // Sticky position threshold (where titles should stick)
        const stickyThreshold = 150 + (index * 100);

        // Collapse if the title has reached or passed the sticky position
        if (titleRect && titleRect.bottom <= stickyThreshold + 80) {
          collapsed.push(index);
        }
      });

      setCollapsedRows(collapsed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const services = [
    {
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '02',
      title: 'HARDWARE',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '03',
      title: 'CYBER SECURITY',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '04',
      title: 'CLOUD SERVICES',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '05',
      title: 'AI & ML SERVICES',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '06',
      title: 'WEB DEVELOPMENT',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    },
    {
      number: '07',
      title: 'UI/UX DESIGN',
      tags: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
      description: 'Lorem ipsum dolor sit amet consectetur. Egestas id orci felis et. Tempus turpis nibh habitant in turpis pretium lectus hendrerit risus.',
      imageUrl: 'https://via.placeholder.com/400x250/B8B8B8/B8B8B8'
    }
  ];

  return (
    <section className="services-list-section">
      <div className="services-list-container">
        {services.map((service, index) => {
          const isCollapsed = collapsedRows.includes(index);

          // Calculate sticky position
          let stickyTop = 150 + (index * 100);

          const zIndex = index + 1; // Later rows should be on top

          return (
            <div
              key={index}
              ref={(el) => (rowRefs.current[index] = el)}
              className={`service-row ${isCollapsed ? 'collapsed' : ''}`}
              style={{ top: `${stickyTop}px`, zIndex }}
            >
              <div className="service-header">
                <div className="service-number">{service.number}</div>
                <h2 className="service-title">{service.title}</h2>
              </div>

              <div className="service-content-wrapper">
                <div className="service-body">
                  <div className="service-left">
                    <div className="service-tags">
                      {service.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="service-tag">{tag}</span>
                      ))}
                    </div>
                    <p className="service-description">{service.description}</p>
                  </div>
                  <div className="service-right">
                    <div className="service-image" style={{ backgroundImage: `url(${service.imageUrl})` }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesListSection;
