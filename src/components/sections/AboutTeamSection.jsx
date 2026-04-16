import { useState, useEffect, useRef } from 'react';
import './AboutTeamSection.css';

const teamMembers = [
  {
    name: 'Akshat Jain',
    role: 'Founder & CEO',
    quote:
      'At AIB Technovation, we build with intent. Every product we ship is a reflection of our belief that great technology should feel human, responsible, and built to last.',
    linkedin: 'https://www.linkedin.com/in/akshat-jain-261a37213/',
    image: '/team/akshat.webp',
  },
  {
    name: 'Ishan Jain',
    role: 'Co-Founder',
    quote:
      'Building great products means pairing ambition with discipline — ship what matters, iterate relentlessly, and keep the work honest from day one.',
    linkedin: 'https://www.linkedin.com/in/ishanjain2174/',
    image: '/team/ishan.webp',
  },
  {
    name: 'Bhavya Kothari',
    role: 'Chief Technology Officer',
    quote:
      'Engineering excellence is not about chasing trends — it is about building systems that are reliable, scalable, and genuinely solve the problem in front of us.',
    linkedin: 'https://www.linkedin.com/in/bhavya-kothari-410275210/',
    image: '/team/Bhavya Kothari Photo.webp',
  },
];

// Build a long duplicated strip so the carousel feels infinite.
// The center 5 cards are visible; cards outside that window are hidden
// off-screen on the correct side. When the pointer approaches either
// edge of the strip we silently reset it to an equivalent middle position.
const COPIES = 9;
const STRIP = Array.from({ length: COPIES * teamMembers.length }, (_, i) =>
  teamMembers[i % teamMembers.length]
);
const TOTAL = STRIP.length;
const INITIAL_IDX = Math.floor(TOTAL / 2);
const SAFE_ZONE = 4;

const getSlot = (cardIdx, activeIdx) => {
  const offset = cardIdx - activeIdx;
  if (offset === -1) return 1;
  if (offset === 0) return 2;
  if (offset === 1) return 3;
  return null;
};

const LinkedInIcon = () => (
  <svg
    className="at-linkedin-icon"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
  </svg>
);

export default function AboutTeamSection() {
  const [activeIdx, setActiveIdx] = useState(INITIAL_IDX);
  const [skipTransition, setSkipTransition] = useState(false);
  const resetPending = useRef(false);

  const featured = STRIP[activeIdx];
  const activeMod = ((activeIdx % teamMembers.length) + teamMembers.length) % teamMembers.length;

  // Silently re-anchor the activeIdx to the middle of the strip
  // when it drifts too close to either edge.
  useEffect(() => {
    if (resetPending.current) return;
    if (activeIdx < SAFE_ZONE || activeIdx > TOTAL - SAFE_ZONE - 1) {
      resetPending.current = true;
      const delta = activeIdx - INITIAL_IDX;
      const normalizedDelta = ((delta % teamMembers.length) + teamMembers.length) % teamMembers.length;
      setSkipTransition(true);
      setActiveIdx(INITIAL_IDX + normalizedDelta);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSkipTransition(false);
          resetPending.current = false;
        });
      });
    }
  }, [activeIdx]);

  const next = () => setActiveIdx((i) => i + 1);
  const prev = () => setActiveIdx((i) => i - 1);
  const goTo = (memberIdx) => {
    const currentMod = ((activeIdx % teamMembers.length) + teamMembers.length) % teamMembers.length;
    const delta = memberIdx - currentMod;
    setActiveIdx((i) => i + delta);
  };

  return (
    <section className="about-team-section">
      <header className="about-team-header">
        <h2 className="about-team-title">MEET OUR TEAM</h2>
        <p className="about-team-subtitle">
          A multidisciplinary team of engineers, designers, and strategists<br />
          united by a shared obsession for building what comes next.
        </p>
      </header>

      <div className={`about-team-stage${skipTransition ? ' no-transition' : ''}`}>
        {STRIP.map((member, cardIdx) => {
          const slot = getSlot(cardIdx, activeIdx);
          const style = member.image ? { backgroundImage: `url("${member.image}")` } : undefined;
          if (slot === null) {
            const isLeft = cardIdx < activeIdx;
            return (
              <div
                key={cardIdx}
                className={`at-card at-hidden at-hidden-${isLeft ? 'left' : 'right'}`}
                style={style}
                aria-hidden="true"
              />
            );
          }
          return (
            <div
              key={cardIdx}
              className={`at-card at-slot-${slot}`}
              style={style}
              aria-hidden="true"
            />
          );
        })}
      </div>

      <div className="about-team-testimonial">
        <p className="at-quote">&ldquo;{featured.quote}&rdquo;</p>
        <div className="at-author">
          <div
            className="at-avatar"
            style={featured.image ? { backgroundImage: `url("${featured.image}")` } : undefined}
            aria-hidden="true"
          />
          <div className="at-author-info">
            <h4 className="at-author-name">{featured.name}</h4>
            <p className="at-author-role">{featured.role}</p>
          </div>
          <a
            className="at-author-linkedin"
            href={featured.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${featured.name} on LinkedIn`}
          >
            <LinkedInIcon />
          </a>
        </div>

        <div className="at-controls">
          <button
            type="button"
            className="at-nav"
            onClick={prev}
            aria-label="Previous member"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="at-dots">
            {teamMembers.map((m, i) => (
              <button
                key={m.name}
                type="button"
                className={`at-dot${i === activeMod ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show ${m.name}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="at-nav"
            onClick={next}
            aria-label="Next member"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
