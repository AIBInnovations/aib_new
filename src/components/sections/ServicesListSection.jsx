import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesListSection.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesListSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const section = sectionRef.current;

    if (!section || cards.length === 0) return;

    const totalCards = cards.length;
    const cardSpacing = 12; // Percentage spacing between cards to show full headers
    const startPosition = 20; // First card pins at 10% from top
    const lastCardTopPosition = startPosition + ((totalCards - 1) * cardSpacing);

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Calculate sticky position from top: 10% + 7% for each card
        const topPosition = startPosition + (index * cardSpacing);

        // Set z-index so later cards stack on top of earlier ones
        gsap.set(card, { zIndex: index + 1 });

        ScrollTrigger.create({
          trigger: card,
          start: `top ${topPosition}%`,
          // Use the last card as the end trigger for all cards
          endTrigger: cards[totalCards - 1],
          // Unpin when last card reaches its position
          end: `top ${lastCardTopPosition}%`,
          pin: true,
          pinSpacing: false,
        });
      });
    }, section);

    return () => ctx.revert();
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
    <section className="services-list-section" ref={sectionRef}>
      <div className="services-list-container">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className="card"
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
        ))}
      </div>
    </section>
  );
};

export default ServicesListSection;
