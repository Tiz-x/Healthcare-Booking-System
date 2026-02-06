import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaUsers,
  FaAward,
  FaStethoscope,
  FaCalendarCheck,
  FaShieldAlt,
  FaChartLine,
  FaHandsHelping,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { ScrollAnimationWrapper } from "../../components/ScrollAnimationWrapper";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "200+",
      label: "Expert Doctors",
      icon: <FaStethoscope />,
      color: "#FF5722",
    },
    {
      number: "5,000+",
      label: "Happy Patients",
      icon: <FaHeartbeat />,
      color: "#4CAF50",
    },
    {
      number: "50+",
      label: "Clinics Nationwide",
      icon: <FaMapMarkerAlt />,
      color: "#2196F3",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <FaAward />,
      color: "#9C27B0",
    },
  ];

  const values = [
    {
      icon: <FaHeartbeat />,
      title: "Patient-Centered Care",
      description:
        "Your health and well-being are our top priority in every decision we make.",
      color: "#FF5722",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust & Integrity",
      description:
        "We build lasting relationships based on transparency and ethical practices.",
      color: "#4CAF50",
    },
    {
      icon: <FaChartLine />,
      title: "Excellence & Innovation",
      description:
        "Continuously improving and adopting the latest medical advancements.",
      color: "#2196F3",
    },
    {
      icon: <FaHandsHelping />,
      title: "Compassion & Empathy",
      description:
        "Treating every patient with kindness, respect, and understanding.",
      color: "#9C27B0",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      experience: "15+ Years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80",
      description:
        "Board-certified cardiologist with extensive experience in cardiac care and innovative treatment approaches.",
    },
    {
      name: "Dr. Michael Chen",
      role: "Medical Director",
      specialty: "Neurology",
      experience: "12+ Years",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&q=80",
      description:
        "Renowned neurologist specializing in advanced neurological disorders and treatment protocols.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Pediatrics",
      specialty: "Pediatrics",
      experience: "10+ Years",
      image:
        "https://images.unsplash.com/photo-1594824486306-845c40df4ef5?w=400&h=400&fit=crop&q=80",
      description:
        "Dedicated pediatric specialist focused on comprehensive child healthcare and development.",
    },
  ];

  const milestones = [
    {
      year: "2008",
      title: "Foundation",
      description:
        "Started with a single clinic focused on patient-centered care",
    },
    {
      year: "2012",
      title: "Expansion",
      description: "Opened 5 new clinics across the state, expanding our reach",
    },
    {
      year: "2016",
      title: "Technology",
      description: "Implemented electronic health records and telemedicine",
    },
    {
      year: "2020",
      title: "Excellence",
      description: 'Awarded "Best Healthcare Provider" by Medical Association',
    },
    {
      year: "2024",
      title: "Innovation",
      description:
        "Launched AI-powered diagnostics and personalized care plans",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" duration={0.6}>
            <div className="hero-content">
              <div className="hero-badge">
                <FaStar />
                <span>Our Story & Mission</span>
              </div>
              <h1 className="hero-title">
                Transforming Healthcare
                <br />
                <span className="text-orange">
                  Through Compassion & Excellence
                </span>
              </h1>
              <p className="hero-subtitle">
                For over 15 years, we've been committed to providing exceptional
                medical care that puts patients first, combining cutting-edge
                technology with compassionate service.
              </p>
              <div className="hero-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/services")}
                >
                  <span>Explore Our Services</span>
                  <FaArrowRight />
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate("/contact")}
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="scale-in"
                delay={index * 0.1}
                threshold={0.2}
              >
                <div className="stat-card">
                  <div
                    className="stat-icon"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stat.number}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <ScrollAnimationWrapper animation="slide-in-left" threshold={0.2}>
              <div className="story-text">
                <div className="section-header">
                  <div className="section-badge">
                    <FaHeartbeat />
                    <span>Our Journey</span>
                  </div>
                  <h2 className="section-title">
                    Building a Legacy of
                    <br />
                    <span className="text-orange">Healthcare Excellence</span>
                  </h2>
                </div>

                <div className="story-paragraphs">
                  <p>
                    Founded in 2008 by a team of passionate medical
                    professionals, HealthCare began as a small clinic with a big
                    vision: to revolutionize healthcare by putting patients at
                    the center of everything we do.
                  </p>
                  <p>
                    What started as a single practice has grown into a network
                    of 50+ clinics nationwide, serving thousands of patients
                    annually. Our journey has been guided by a simple yet
                    powerful principle: every patient deserves access to
                    exceptional, compassionate care.
                  </p>
                  <p>
                    Today, we're proud to be at the forefront of medical
                    innovation, combining advanced technology with human touch
                    to deliver healthcare that truly makes a difference in
                    people's lives.
                  </p>
                </div>

                <div className="story-features">
                  <div className="feature-item">
                    <FaCheckCircle />
                    <span>Board-certified specialists</span>
                  </div>
                  <div className="feature-item">
                    <FaCheckCircle />
                    <span>State-of-the-art facilities</span>
                  </div>
                  <div className="feature-item">
                    <FaCheckCircle />
                    <span>Patient-first approach</span>
                  </div>
                  <div className="feature-item">
                    <FaCheckCircle />
                    <span>Insurance partnerships</span>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper animation="slide-in-right" threshold={0.2}>
              <div className="story-image">
                <div className="image-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=700&fit=crop&q=80"
                    alt="Our Medical Team"
                  />
                  <div className="image-overlay"></div>
                  <div className="image-content">
                    <h3>15+ Years</h3>
                    <p>Of dedicated service to our community</p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            {[
              {
                icon: <FaHeartbeat />,
                title: "Our Mission",
                desc: "To provide exceptional, compassionate healthcare that improves lives through innovative treatments, personalized care, and community engagement.",
              },
              {
                icon: <FaChartLine />,
                title: "Our Vision",
                desc: "To be the nation's leading healthcare provider, transforming medical care through technology, research, and a relentless commitment to patient well-being.",
              },
              {
                icon: <FaUsers />,
                title: "Our Promise",
                desc: "To treat every patient with dignity, respect, and compassion, delivering the highest standard of care in a welcoming and supportive environment.",
              },
            ].map((item, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.15}
                threshold={0.2}
              >
                <div className="mission-card">
                  <div className="card-icon">{item.icon}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.desc}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Our Core
                <br />
                <span className="text-orange">Values</span>
              </h2>
              <p className="section-subtitle">
                The principles that guide everything we do at HealthCare
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="values-grid">
            {values.map((value, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="value-card">
                  <div
                    className="value-icon-wrapper"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <div className="value-icon" style={{ color: value.color }}>
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="team-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Meet Our
                <br />
                <span className="text-orange">Leadership Team</span>
              </h2>
              <p className="section-subtitle">
                Experienced professionals dedicated to your health and
                well-being
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="team-grid">
            {team.map((member, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.15}
                threshold={0.1}
              >
                <div className="team-card">
                  <div className="team-image">
                    <img src={member.image} alt={member.name} />
                    <div className="team-overlay">
                      <div className="overlay-content">
                        <p>{member.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <div className="team-specialty">
                      <FaStethoscope />
                      <span>{member.specialty}</span>
                    </div>
                    <div className="team-experience">
                      <FaAward />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Our Journey
                <br />
                <span className="text-orange">Through the Years</span>
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="timeline-item">
                  <div className="timeline-year">{milestone.year}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <ScrollAnimationWrapper animation="scale-in" threshold={0.3}>
        <section className="testimonial-section">
          <div className="container">
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-left" />
              <div className="testimonial-content">
                <p className="testimonial-text">
                  HealthCare has transformed our approach to patient care. Their
                  commitment to excellence and patient-centered philosophy
                  aligns perfectly with our values. The results speak for
                  themselves – happier, healthier patients and more efficient
                  healthcare delivery.
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">Dr. James Wilson</h4>
                    <p className="author-role">
                      Medical Director, Regional Hospital
                    </p>
                  </div>
                </div>
              </div>
              <FaQuoteRight className="quote-right" />
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* CTA Section */}
      <ScrollAnimationWrapper animation="fade-in-up" threshold={0.3}>
        <section className="about-cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Join Our Healthcare Family</h2>
              <p className="cta-subtitle">
                Experience the difference of compassionate, expert care.
                Schedule your appointment today and take the first step toward
                better health.
              </p>
              <div className="cta-actions">
                <button
                  className="btn-cta-primary"
                  onClick={() => navigate("/book-appointment")}
                >
                  <FaCalendarCheck />
                  <span>Book Appointment</span>
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate("/contact")}
                >
                  <FaPhoneAlt />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default AboutPage;
