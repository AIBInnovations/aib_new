import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <div className="form-content">
          <h2 className="form-title">
            FILL IN THE DETAILS BELOW, AND OUR TEAM WILL GET BACK TO YOU
          </h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="1"
                required
              ></textarea>
            </div>

            <button type="submit" className="form-submit">
              Submit
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          <div className="message-section">
            <h3 className="message-title">SEND US A MESSAGE</h3>
            <p className="message-subtitle">
              Feel free to write us and ask us any questions you have.
            </p>
          </div>
        </div>

        <div className="form-images">
          <div className="image-grid">
            <div className="image-large">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop" alt="Video call" />
            </div>
            <div className="image-small-group">
              <div className="image-small">
                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=300&h=300&fit=crop" alt="Workspace" />
              </div>
              <div className="image-small">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop" alt="Working" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
