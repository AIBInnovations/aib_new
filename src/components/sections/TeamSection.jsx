import { useState } from 'react';
import './TeamSection.css';

const teamMembers = [
  {
    name: 'Akshat Jain',
    role: 'CEO',
    testimonial:
      'Launch Your AI Solution Swiftly And Cost-Perfect Using The No-Code Platform Webflow.',
    linkedin: 'https://www.linkedin.com/in/akshat-jain-261a37213/',
    image: '/team/akshat.webp',
  },
  {
    name: 'Ishan Jain',
    role: 'Co-Founder',
    testimonial:
      'Building Great Products Means Pairing Ambition With Discipline — Ship What Matters, Iterate Relentlessly.',
    linkedin: 'https://www.linkedin.com/in/ishanjain2174/',
    image: '/team/ishan.webp',
  },
  {
    name: 'Bhavya Kothari',
    role: 'CTO',
    testimonial:
      'Engineering Excellence Is Not About Chasing Trends — It Is About Building Systems That Are Reliable And Scalable.',
    linkedin: 'https://www.linkedin.com/in/bhavya-kothari-410275210/',
    image: '/team/Bhavya Kothari Photo.webp',
  },
];

const ProfileIcon = () => (
  <svg
    className="card-profile-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

function CardMedia({ member, failed, onFail }) {
  if (member.image && !failed) {
    return (
      <img
        key={member.image}
        className="card-image"
        src={member.image}
        alt={member.name}
        onError={onFail}
        draggable="false"
      />
    );
  }
  return <ProfileIcon key={member.name} />;
}

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});

  const next = () => setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  const prev = () =>
    setActiveIndex((p) => (p - 1 + teamMembers.length) % teamMembers.length);
  const goTo = (i) => setActiveIndex(i);
  const markFailed = (src) =>
    setFailedImages((f) => ({ ...f, [src]: true }));

  const front  = teamMembers[activeIndex];
  const middle = teamMembers[(activeIndex + 1) % teamMembers.length];
  const back   = teamMembers[(activeIndex + 2) % teamMembers.length];

  return (
    <section className="team-section-v2">
      <h2 className="team-title-v2">Meet Our Team</h2>

      <div className="team-content-v2">
        {/* Left — member info */}
        <div className="team-info-v2">
          <h3 className="team-name-v2">{front.name}</h3>
          <p className="team-role-v2">{front.role}</p>
          <p className="team-quote-v2">“{front.testimonial}”</p>

          <a
            className="team-linkedin-v2"
            href={front.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            View LinkedIn →
          </a>

          {/* Person change controls */}
          <div className="team-controls">
            <button
              className="team-nav-btn"
              onClick={prev}
              aria-label="Previous team member"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="team-dots">
              {teamMembers.map((m, i) => (
                <button
                  key={m.name}
                  className={`team-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${m.name}`}
                />
              ))}
            </div>

            <button
              className="team-nav-btn primary"
              onClick={next}
              aria-label="Next team member"
            >
              Next
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right — stacked cards */}
        <div className="team-cards-stack" onClick={next} role="button" tabIndex={0}>
          <a
            className="team-card card-back"
            href={back.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${back.name} LinkedIn`}
          >
            <CardMedia
              member={back}
              failed={failedImages[back.image]}
              onFail={() => markFailed(back.image)}
            />
          </a>
          <a
            className="team-card card-middle"
            href={middle.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${middle.name} LinkedIn`}
          >
            <CardMedia
              member={middle}
              failed={failedImages[middle.image]}
              onFail={() => markFailed(middle.image)}
            />
          </a>
          <a
            className="team-card card-front"
            href={front.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${front.name} LinkedIn`}
          >
            <CardMedia
              member={front}
              failed={failedImages[front.image]}
              onFail={() => markFailed(front.image)}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
