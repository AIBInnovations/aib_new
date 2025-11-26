import { useState } from 'react';
import './ContactHero.css';

const ContactHero = () => {
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState('11:00am');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // October 2025

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const timeSlots = [
    '9:00am', '10:00am', '11:00am', '12:00pm',
    '2:00pm', '3:00pm', '4:00pm', '5:00pm'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <section className="contact-hero">
      <div className="contact-hero-content">
        <h1 className="contact-hero-title">
          GROWTH STARTS WITH A CLEAR PLAN
        </h1>

        <p className="contact-hero-subtitle">
          Let's map your next move—schedule a free strategy session or reach out directly at{' '}
          <a href="mailto:hello@aibinnovations.com" className="contact-email">
            hello@aibinnovations.com
          </a>
        </p>

        <div className="booking-container">
          <div className="booking-info">
            <div className="booking-header">
              <div className="booking-avatar">AB</div>
              <div className="booking-details">
                <h3 className="booking-title">AIB Innovations</h3>
                <p className="booking-type">Planning Meeting</p>
              </div>
            </div>

            <h2 className="meeting-title">30-minute meeting</h2>
            <p className="meeting-description">
              Schedule a free intro call with me. We'll:
            </p>

            <ul className="meeting-points">
              <li>Align on your goals</li>
              <li>Answer questions</li>
              <li>Plan next steps</li>
            </ul>

            <div className="meeting-meta">
              <div className="meta-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>30m</span>
              </div>
              <div className="meta-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 2V6M13 2V6M3 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Google Meet</span>
              </div>
              <div className="meta-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 10L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Asia/Kolkata</span>
              </div>
            </div>
          </div>

          <div className="booking-calendar">
            <div className="calendar-header">
              <button className="month-nav" onClick={handlePrevMonth}>←</button>
              <h3 className="calendar-month">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button className="month-nav" onClick={handleNextMonth}>→</button>
            </div>

            <div className="calendar-and-time">
              <div className="calendar-section">
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    {daysOfWeek.map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  <div className="calendar-days">
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <button
                        key={index}
                        className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${!day ? 'empty' : ''}`}
                        onClick={() => day && setSelectedDate(day)}
                        disabled={!day}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="time-selection">
              <div className="time-header">
                <span className="selected-date">Thu 06</span>
                <div className="time-toggle">
                  <button className="toggle-btn active">12h</button>
                  <button className="toggle-btn">24h</button>
                </div>
              </div>

              <div className="time-slots">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    className={`time-slot ${time === selectedTime ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <button className="confirm-btn">Confirm Booking</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
