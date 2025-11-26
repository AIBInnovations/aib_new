import { useRef, useState, useEffect } from 'react';
import './TeamSection.css';

const TeamSection = () => {
  const carouselRef = useRef(null);

  const teamMembers = [
    {
      name: 'Akshat Jain',
      role: 'Akshat Jain',
      image: 'https://via.placeholder.com/400x500/D9D9D9/D9D9D9',
      testimonial: '"Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."'
    },
    {
      name: 'Team Member 2',
      role: 'Position',
      image: 'https://via.placeholder.com/400x500/D9D9D9/D9D9D9',
      testimonial: '"Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."'
    },
    {
      name: 'Team Member 3',
      role: 'Position',
      image: 'https://via.placeholder.com/400x500/D9D9D9/D9D9D9',
      testimonial: '"Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."'
    },
    {
      name: 'Team Member 4',
      role: 'Position',
      image: 'https://via.placeholder.com/400x500/D9D9D9/D9D9D9',
      testimonial: '"Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."'
    },
    {
      name: 'Team Member 5',
      role: 'Position',
      image: 'https://via.placeholder.com/400x500/D9D9D9/D9D9D9',
      testimonial: '"Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."'
    }
  ];

  // Create infinite scroll by tripling the array
  const infiniteMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  const updateCardTransforms = () => {
    if (!carouselRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.team-card-new');
    const carouselCenter = carouselRef.current.offsetWidth / 2 + carouselRef.current.scrollLeft;

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = carouselCenter - cardCenter;
      const absDistance = Math.abs(distance);

      if (absDistance < 200) {
        // Center card (3rd card)
        card.style.transform = 'perspective(1000px) scale(1) rotateY(0deg)';
        card.style.opacity = '1';
      } else if (absDistance >= 200 && absDistance < 400) {
        // 2nd and 4th cards (adjacent to center)
        if (distance > 0) {
          card.style.transform = 'perspective(1000px) scale(0.85) rotateY(15deg) translateZ(-50px)';
        } else {
          card.style.transform = 'perspective(1000px) scale(0.85) rotateY(-15deg) translateZ(-50px)';
        }
        card.style.opacity = '0.6';
      } else {
        // 1st and 5th cards (outermost visible cards)
        if (distance > 0) {
          card.style.transform = 'perspective(1000px) scale(0.95) rotateY(35deg)';
        } else {
          card.style.transform = 'perspective(1000px) scale(0.95) rotateY(-35deg)';
        }
        card.style.opacity = '0.8';
      }
    });
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 4; // card width + gap
    carouselRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 4; // card width + gap
    carouselRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Set initial scroll position to middle section
      const cardWidth = 320 + 4; // card width + gap
      carousel.scrollLeft = teamMembers.length * cardWidth;

      carousel.addEventListener('scroll', updateCardTransforms);
      updateCardTransforms(); // Initial call

      // Handle infinite scroll
      const handleInfiniteScroll = () => {
        const scrollWidth = carousel.scrollWidth;
        const scrollLeft = carousel.scrollLeft;
        const clientWidth = carousel.clientWidth;
        const sectionWidth = teamMembers.length * cardWidth;

        if (scrollLeft <= 0) {
          carousel.scrollLeft = sectionWidth;
        } else if (scrollLeft >= scrollWidth - clientWidth) {
          carousel.scrollLeft = sectionWidth;
        }
      };

      carousel.addEventListener('scroll', handleInfiniteScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', updateCardTransforms);
      }
    };
  }, []);

  return (
    <section className="team-section-new">
      <div className="team-header-new">
        <h2 className="team-title-new">MEET OUR TEAM</h2>
        <p className="team-description-new">
          Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor<br />
          Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem.
        </p>
      </div>

      <div className="team-carousel-wrapper">
        <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div
          ref={carouselRef}
          className="team-carousel-new"
        >
          <div className="team-carousel-track-new">
            {infiniteMembers.map((member, index) => (
              <div key={index} className="team-card-new">
                <div className="team-card-image-new">
                  <img src={member.image} alt={member.name} draggable="false" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-arrow carousel-arrow-right" onClick={handleNext} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="team-testimonial-new">
        <p className="testimonial-text-new">
          "Lorem Ipsum Dolor Sit Amet Consectetur. Proin Id Dolor<br />
          Lobortis Nam Massa Est. Luctus Quis Sit Amet Dui Nec Sem."
        </p>
        <div className="testimonial-author-new">
          <div className="author-avatar-new"></div>
          <div className="author-info-new">
            <h4 className="author-name-new">Akshat Jain</h4>
            <p className="author-role-new">Akshat Jain</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;