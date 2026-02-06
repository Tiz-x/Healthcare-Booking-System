import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaCalendarCheck
} from 'react-icons/fa';
import { ScrollAnimationWrapper } from '../../components/ScrollAnimationWrapper';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Our Clinic',
      details: ['123 Healthcare Avenue', 'Medical District, City 12345'],
      action: 'Get Directions',
      onClick: () => window.open('https://maps.google.com', '_blank')
    },
    {
      icon: <FaPhoneAlt />,
      title: 'Call Us Anytime',
      details: ['Emergency: (555) 911-HELP', 'Appointments: (555) 123-4567'],
      action: 'Call Now',
      onClick: () => window.location.href = 'tel:5551234567'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      details: ['info@healthcare.com', 'support@healthcare.com'],
      action: 'Send Email',
      onClick: () => window.location.href = 'mailto:info@healthcare.com'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat-Sun: 9:00 AM - 6:00 PM'],
      action: 'Book Appointment',
      onClick: () => navigate('/book-appointment')
    }
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book appointments online through our website, call our appointment line at (555) 123-4567, or visit our clinic in person.'
    },
    {
      question: 'What insurance do you accept?',
      answer: 'We accept most major insurance providers including Blue Cross, Aetna, UnitedHealthcare, and Medicare. Contact us to verify your coverage.'
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'Yes, we provide 24/7 emergency care. For emergencies, please call (555) 911-HELP or visit our emergency department immediately.'
    },
    {
      question: 'Can I get a virtual consultation?',
      answer: 'Absolutely! We offer telemedicine services for consultations, follow-ups, and non-emergency medical advice through our secure platform.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" duration={0.6}>
            <div className="hero-content">
              <div className="hero-badge">
                <FaCheckCircle />
                <span>Get in Touch</span>
              </div>
              <h1 className="hero-title">
                We're Here to<br />
                <span className="text-orange">Help You</span>
              </h1>
              <p className="hero-subtitle">
                Have questions or need medical assistance? Our team is ready to provide 
                the support and care you deserve. Reach out to us today.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => navigate('/book-appointment')}>
                  <FaCalendarCheck />
                  <span>Book Appointment</span>
                </button>
                <button className="btn-outline" onClick={() => window.location.href = 'tel:5551234567'}>
                  <FaPhoneAlt />
                  <span>Emergency: (555) 911-HELP</span>
                </button>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="contact-info-grid">
        <div className="container">
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.2}
              >
                <div className="info-card">
                  <div className="info-icon">
                    {info.icon}
                  </div>
                  <div className="info-content">
                    <h3 className="info-title">{info.title}</h3>
                    <div className="info-details">
                      {info.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                    <button className="info-action" onClick={info.onClick}>
                      {info.action}
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-map-container">
            {/* Contact Form */}
            <ScrollAnimationWrapper animation="slide-in-left" threshold={0.2}>
              <div className="contact-form-wrapper">
                <div className="form-header">
                  <h2 className="form-title">Send Us a Message</h2>
                  <p className="form-subtitle">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
                
                {isSubmitted ? (
                  <div className="success-message">
                    <FaCheckCircle className="success-icon" />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tiz Code"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tiz@example.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="appointment">Book Appointment</option>
                          <option value="general">General Inquiry</option>
                          <option value="billing">Billing Question</option>
                          <option value="emergency">Emergency</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Please describe your inquiry in detail..."
                        rows={5}
                      />
                    </div>
                    
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollAnimationWrapper>

            {/* Map */}
            <ScrollAnimationWrapper animation="slide-in-right" threshold={0.2}>
              <div className="map-wrapper">
                <div className="map-header">
                  <h3 className="map-title">Our Location</h3>
                  <p className="map-subtitle">
                    Visit our main clinic for comprehensive healthcare services.
                  </p>
                </div>
                
                <div className="map-container">
                  <div className="map-embed">
                    <iframe
                      title="Clinic Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3166e4e5a1%3A0x35d8b1f7c0c7a5a5!2s123%20Healthcare%20Ave%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1645555555555!5m2!1sen!2sus"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: '12px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  
                  <div className="map-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt />
                      <div>
                        <strong>Address</strong>
                        <p>123 Healthcare Avenue, Medical District, City 12345</p>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <FaClock />
                      <div>
                        <strong>Hours</strong>
                        <p>Mon-Fri: 8:00 AM - 8:00 PM<br />Sat-Sun: 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Frequently Asked<br />
                <span className="text-orange">Questions</span>
              </h2>
              <p className="section-subtitle">
                Find quick answers to common questions about our services and policies.
              </p>
            </div>
          </ScrollAnimationWrapper>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="faq-card">
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <div className="faq-icon">+</div>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Social & Newsletter */}
      <ScrollAnimationWrapper animation="fade-in-up" threshold={0.3}>
        <section className="social-section">
          <div className="container">
            <div className="social-content">
              <div className="social-info">
                <h2 className="social-title">Stay Connected</h2>
                <p className="social-subtitle">
                  Follow us on social media for health tips, updates, and community news.
                </p>
                
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-link twitter">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-link linkedin">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="social-link instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-link whatsapp">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
              
              <div className="newsletter">
                <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
                <p className="newsletter-subtitle">
                  Get health tips, clinic updates, and special offers delivered to your inbox.
                </p>
                
                <form className="newsletter-form">
                  <div className="newsletter-input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    <button type="submit" className="btn-newsletter">
                      <FaPaperPlane />
                      <span>Subscribe</span>
                    </button>
                  </div>
                  <p className="newsletter-note">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Emergency CTA */}
      <ScrollAnimationWrapper animation="scale-in" threshold={0.3}>
        <section className="emergency-cta">
          <div className="container">
            <div className="emergency-content">
              <div className="emergency-icon">
                <FaPhoneAlt />
              </div>
              <div className="emergency-info">
                <h2 className="emergency-title">Need Immediate Medical Assistance?</h2>
                <p className="emergency-subtitle">
                  For life-threatening emergencies, call 911 or visit the nearest emergency room.
                </p>
              </div>
              <div className="emergency-actions">
                <button className="btn-emergency" onClick={() => window.location.href = 'tel:911'}>
                  <FaPhoneAlt />
                  <span>Call 911</span>
                </button>
                <button className="btn-emergency-alt" onClick={() => window.location.href = 'tel:555911HELP'}>
                  <FaWhatsapp />
                  <span>Emergency Hotline: (555) 911-HELP</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default ContactPage;