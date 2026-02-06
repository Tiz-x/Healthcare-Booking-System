import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaUserMd,
  FaCalendarCheck,
  FaFileAlt,
  FaHeartbeat,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaAmbulance,
  FaChartLine,
  FaUsers
} from "react-icons/fa";
import { ScrollAnimationWrapper } from "../../components/ScrollAnimationWrapper";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const whyChooseItems = [
    {
      icon: <FaUserMd />,
      color: "#FF5722",
      bgColor: "#FFF0EC",
      title: "Expert Specialists",
      description:
        "Access 500+ board-certified doctors across 20+ specialties, each with verified credentials and years of clinical experience.",
      stat: "500+",
      statLabel: "Doctors",
    },
    {
      icon: <FaShieldAlt />,
      color: "#10B981",
      bgColor: "#ECFDF5",
      title: "Secure & Private",
      description:
        "Military-grade encryption protects all your medical records and communications. HIPAA compliant at every step.",
      stat: "256-bit",
      statLabel: "Encryption",
    },
    {
      icon: <FaCalendarCheck />,
      color: "#3B82F6",
      bgColor: "#EFF6FF",
      title: "Easy Scheduling",
      description:
        "Book appointments in under 60 seconds. Same-day availability with instant confirmation and smart reminders.",
      stat: "60s",
      statLabel: "Booking Time",
    },
    {
      icon: <FaFileAlt />,
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
      title: "Digital Records",
      description:
        "Your complete medical history in one place. Share records securely with any provider, anywhere in the world.",
      stat: "100%",
      statLabel: "Paperless",
    },
    {
      icon: <FaAmbulance />,
      color: "#F59E0B",
      bgColor: "#FFFBEB",
      title: "24/7 Emergency",
      description:
        "Round-the-clock access to emergency consultations and urgent care triage, no matter the time or location.",
      stat: "24/7",
      statLabel: "Availability",
    },
    {
      icon: <FaChartLine />,
      color: "#EC4899",
      bgColor: "#FDF2F8",
      title: "Health Insights",
      description:
        "AI-powered analytics track your health trends and provide personalised recommendations for a healthier lifestyle.",
      stat: "98%",
      statLabel: "Accuracy",
    },
  ];

  return (
    <div className="landing-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left: Text */}
            <ScrollAnimationWrapper animation="fade-in-up" duration={0.6}>
              <div className="hero-content">
                <div className="hero-badge">
                  <FaStar className="badge-star" />
                  <span>Rated #1 Healthcare Platform in 2024</span>
                </div>

                <h1 className="hero-title">
                  Your Health,
                  <span className="highlight">Reimagined</span>
                  for the Future
                </h1>

                <p className="hero-subtitle">
                  Connect with top specialists, book appointments instantly, and
                  manage your entire health journey — all from one secure platform.
                </p>

                <div className="hero-actions">
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/auth")}
                  >
                    Get Started Free
                    <FaArrowRight />
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate("/specialists")}
                  >
                    Find a Doctor
                  </button>
                </div>

                <div className="hero-trust">
                  <div className="trust-item">
                    <FaUsers className="trust-icon" />
                    <span>
                      <strong>2M+</strong> patients trust us
                    </span>
                  </div>
                  <div className="trust-divider" />
                  <div className="trust-item">
                    <FaStar className="trust-icon trust-star" />
                    <span>
                      <strong>4.9</strong> avg. rating
                    </span>
                  </div>
                  <div className="trust-divider" />
                  <div className="trust-item">
                    <FaCheckCircle className="trust-icon trust-check" />
                    <span>
                      <strong>98%</strong> satisfaction
                    </span>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>

            {/* Right: Big bold doctor image */}
            <ScrollAnimationWrapper animation="scale-in" delay={0.2} duration={0.8}>
              <div className="hero-image-section">
                <div className="doctor-image-container">
                  <div className="doctor-image-wrapper">
                    <img 
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face" 
                      alt="Dr. Sarah Mitchell - Cardiologist" 
                      className="doctor-main-image"
                    />
                    <div className="image-glow"></div>
                    <div className="image-reflection"></div>
                  </div>
                  
                  {/* Floating badges around the image */}
                  <div className="image-badge experience-badge">
                    <FaUserMd className="badge-icon" />
                    <div className="badge-content">
                      <span className="badge-value">18+</span>
                      <span className="badge-label">Years</span>
                    </div>
                  </div>

                  <div className="image-badge rating-badge">
                    <FaStar className="badge-icon" />
                    <div className="badge-content">
                      <span className="badge-value">4.9</span>
                      <span className="badge-label">Rating</span>
                    </div>
                  </div>

                  <div className="image-badge specialty-badge">
                    <FaHeartbeat className="badge-icon" />
                    <div className="badge-content">
                      <span className="badge-value">Cardio</span>
                      <span className="badge-label">Specialist</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE SECTION ===== */}
      <section className="why-choose-section">
        <div className="container">
          {/* Header */}
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <div className="section-badge">
                <FaCheckCircle />
                <span>Why Choose Us</span>
              </div>
              <h2 className="section-title">
                Why Choose <span className="title-accent">HealthCare</span>?
              </h2>
              <p className="section-subtitle">
                We combine cutting-edge technology with compassionate care to
                deliver a healthcare experience that puts you first.
              </p>
            </div>
          </ScrollAnimationWrapper>

          {/* Grid */}
          <div className="why-grid">
            {whyChooseItems.map((item, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div
                  className="why-card"
                  style={
                    {
                      "--card-color": item.color,
                      "--card-bg": item.bgColor,
                    } as React.CSSProperties
                  }
                >
                  {/* Top stat ribbon */}
                  <div className="why-stat">
                    <span className="stat-value">{item.stat}</span>
                    <span className="stat-label">{item.statLabel}</span>
                  </div>

                  {/* Icon */}
                  <div
                    className="why-icon-wrap"
                    style={{ background: item.bgColor }}
                  >
                    <div
                      className="why-icon"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="why-title">{item.title}</h3>
                  <p className="why-desc">{item.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className="why-accent"
                    style={{ background: item.color }}
                  />
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <ScrollAnimationWrapper animation="scale-in" threshold={0.3} duration={0.8}>
        <section className="cta-section">
          <div className="cta-deco-1" />
          <div className="cta-deco-2" />

          <div className="container">
            <div className="cta-content">
              <div className="cta-badge">
                <FaHeartbeat />
                <span>Get Started Today</span>
              </div>

              <h2 className="cta-title">
                Ready to take control
                <br />
                of your health?
              </h2>
              <p className="cta-subtitle">
                Join over 2 million people who have already transformed their
                healthcare experience with HealthCare.
              </p>

              <div className="cta-actions">
                <button
                  className="cta-btn-primary"
                  onClick={() => navigate("/auth")}
                >
                  <span>Start Your Journey</span>
                  <FaArrowRight />
                </button>
                <button
                  className="cta-btn-secondary"
                  onClick={() => navigate("/specialists")}
                >
                  Learn More
                </button>
              </div>

              <div className="cta-trust">
                <FaShieldAlt className="cta-trust-icon" />
                <span>
                  Free to join • No credit card required • Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default LandingPage;