import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaHeart,
  FaUserMd,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaCalendarAlt,
} from "react-icons/fa";
import { ScrollAnimationWrapper } from "../../components/ScrollAnimationWrapper";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 4 medical images for the slider
  const medicalImages = [
    {
      url: "./doc1.jpeg",
      title: "Online Consultation",
      description: "Connect with doctors remotely",
    },
    {
      url: "./doc2.jpeg",
      title: "Expert Specialists",
      description: "200+ certified doctors",
    },
    {
      url: "./doc3.jpeg",
      title: "Modern Facilities",
      description: "Advanced medical equipment",
    },
    {
      url: "./doc4.jpeg",
      title: "Emergency Care",
      description: "24/7 emergency services",
    },
  ];

  // Auto slide functionality
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % medicalImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, medicalImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % medicalImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + medicalImages.length) % medicalImages.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const specialties = [
    {
      icon: "❤️",
      title: "Cardiology",
      count: "25+ Specialists",
      color: "#FF5722",
    },
    { icon: "🧠", title: "Neurology", count: "18+ Experts", color: "#4CAF50" },
    {
      icon: "🦴",
      title: "Orthopedics",
      count: "22+ Surgeons",
      color: "#2196F3",
    },
    {
      icon: "👶",
      title: "Pediatrics",
      count: "20+ Pediatricians",
      color: "#FF9800",
    },
    {
      icon: "👁️",
      title: "Ophthalmology",
      count: "15+ Specialists",
      color: "#9C27B0",
    },
    { icon: "🦷", title: "Dentistry", count: "12+ Dentists", color: "#00BCD4" },
  ];

  const features = [
    {
      icon: <FaClock />,
      title: "24/7 Availability",
      description: "Round-the-clock emergency and consultation services",
      gradient: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
    },
    {
      icon: <FaUserMd />,
      title: "200+ Experts",
      description: "Board-certified and experienced medical professionals",
      gradient: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
    },
    {
      icon: <FaShieldAlt />,
      title: "HIPAA Compliant",
      description:
        "Your health data is protected with enterprise-grade security",
      gradient: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
    },
    {
      icon: <FaHeart />,
      title: "Quality Care",
      description: "Patient-centered approach with proven outcomes",
      gradient: "linear-gradient(135deg, #FF5722 0%, #FF9800 100%)",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist, 12 Years Experience",
      rating: 5,
      text: "This platform has transformed how I manage my practice. The seamless appointment scheduling and patient management tools are exceptional.",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    },
    {
      name: "Michael Rodriguez",
      role: "Hospital Administrator",
      rating: 5,
      text: "Implementation was smooth and the ROI was immediate. Reduced no-shows by 40% and improved patient satisfaction significantly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      name: "Emily Chen, MD",
      role: "Pediatric Specialist",
      rating: 5,
      text: "The telemedicine features are robust and reliable. My patients love the convenience, and I appreciate the integrated EHR system.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
  ];

  return (
    <div className="homepage-pro">
      {/* Hero Section with Image Slider - No animation on hero for instant visibility */}
      <section className="hero-with-slider">
        <div className="container">
          {/* Hero Content with Slider */}
          <div className="hero-content-wrapper">
            {/* Left Content */}
            <div className="hero-text-content">
              <div className="hero-badge">
                <FaCheckCircle />
                <span>Trusted Healthcare Platform</span>
              </div>

              <h1 className="hero-main-title">
                Your health, <span>our priority</span>
              </h1>

              <p className="hero-description">
                Find caring professionals and get medical help without stress.
                Appointments made easy, support always close.
              </p>

              <div className="hero-buttons">
                <button
                  className="btn-hero-primary"
                  onClick={() => navigate("/register")}
                >
                  <span>Get Started</span>
                  <FaChevronRight size={14} />
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </button>
              </div>

              {/* Stats Section */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">5,000+</div>
                  <div className="stat-label">Happy Patients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Expert Doctors</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Clinics</div>
                </div>
              </div>

              {/* Features */}
              <div className="hero-features">
                <div className="feature-item">
                  <FaClock className="feature-icon" />
                  <span className="feature-text">24/7 Available</span>
                </div>
                <div className="feature-item">
                  <FaCalendarAlt className="feature-icon" />
                  <span className="feature-text">Easy Booking</span>
                </div>
              </div>
            </div>

            {/* Right Image Slider */}
            <div className="hero-image-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {medicalImages.map((image, index) => (
                    <div
                      key={index}
                      className={`slider-slide ${index === currentSlide ? "active" : ""}`}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="slide-image"
                      />
                      <div className="slide-overlay"></div>
                      <div className="slide-content">
                        <h3 className="slide-title">{image.title}</h3>
                        <p className="slide-description">{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                <button className="slider-btn prev" onClick={prevSlide}>
                  <FaArrowLeft size={20} />
                </button>
                <button className="slider-btn next" onClick={nextSlide}>
                  <FaArrowRight size={20} />
                </button>

                {/* Slider Indicators */}
                <div className="slider-indicators">
                  {medicalImages.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? "active" : ""}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Fade in */}
      <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
        <section className="trusted-section">
          <div className="container">
            <div className="trusted-content">
              <p className="trusted-label">
                Trusted by leading healthcare organizations
              </p>
              <div className="trusted-logos">
                <div className="logo-item">MAYO CLINIC</div>
                <div className="logo-item">JOHNS HOPKINS</div>
                <div className="logo-item">CLEVELAND CLINIC</div>
                <div className="logo-item">STANFORD HEALTH</div>
                <div className="logo-item">MASS GENERAL</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Features Section - Animate section header first, then cards */}
      <section className="features-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <div className="section-badge">
                <FaCheckCircle size={14} />
                <span>Why Choose HealthCare Pro</span>
              </div>
              <h2 className="section-title">
                Comprehensive Healthcare
                <br />
                <span className="section-title-accent">
                  Management Solutions
                </span>
              </h2>
              <p className="section-subtitle">
                Designed specifically for medical professionals and healthcare
                facilities
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="features-grid">
            {features.map((feature, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.2}
              >
                <div className="feature-card">
                  <div
                    className="feature-icon-wrapper"
                    style={{ background: feature.gradient }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <button className="feature-link">
                    Learn more <FaArrowRight size={12} />
                  </button>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section - Staggered card animations */}
      <section className="specialties-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Medical Specialties
                <br />
                <span className="section-title-accent">Covered</span>
              </h2>
              <p className="section-subtitle">
                Comprehensive coverage across all major medical disciplines
              </p>
            </div>
          </ScrollAnimationWrapper>

          <div className="specialties-grid">
            {specialties.map((specialty, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.08}
                threshold={0.1}
              >
                <div
                  className="specialty-card"
                  style={
                    {
                      "--specialty-color": specialty.color,
                    } as React.CSSProperties
                  }
                  onClick={() =>
                    navigate(
                      `/specialists?specialty=${specialty.title.toLowerCase()}`,
                    )
                  }
                >
                  <div className="specialty-icon">{specialty.icon}</div>
                  <div className="specialty-content">
                    <h3 className="specialty-title">{specialty.title}</h3>
                    <p className="specialty-count">{specialty.count}</p>
                  </div>
                  <FaChevronRight className="specialty-arrow" />
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>

          <ScrollAnimationWrapper
            animation="scale-in"
            delay={0.5}
            threshold={0.1}
          >
            <div className="section-cta">
              <button
                className="btn-view-all"
                onClick={() => navigate("/specialists")}
              >
                Explore All Specialties <FaArrowRight size={14} />
              </button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Testimonials Section - Compact Design matching Mission Cards */}
      <section className="testimonials-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">
                Trusted by Healthcare
                <br />
                <span className="section-title-accent">Professionals</span>
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.15}
                threshold={0.1}
              >
                <div className="testimonial-card-compact">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="testimonial-avatar-compact"
                  />
                  <div className="testimonial-rating-compact">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <h3 className="testimonial-name-compact">{testimonial.name}</h3>
                  <p className="testimonial-role-compact">{testimonial.role}</p>
                  <p className="testimonial-text-compact">"{testimonial.text}"</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Scale in effect */}
      <ScrollAnimationWrapper animation="scale-in" threshold={0.3} duration={1}>
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <div className="cta-badge">
                <FaCheckCircle size={18} />
                <span>Start Your Free Trial</span>
              </div>
              <h2 className="cta-title">
                Transform Your Healthcare
                <br />
                Practice Today
              </h2>
              <p className="cta-text">
                Join 500+ healthcare providers who trust our platform for
                seamless appointment management, reduced no-shows, and improved
                patient care.
              </p>
              <div className="cta-buttons">
                <button
                  className="btn-cta-primary"
                  onClick={() => navigate("/register")}
                >
                  <span>Start Free Trial</span>
                  <FaArrowRight size={16} />
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate("/contact")}
                >
                  Schedule a Demo
                </button>
              </div>
              <div className="cta-features">
                <div className="cta-feature">
                  <FaCheckCircle size={14} />
                  <span>No credit card required</span>
                </div>
                <div className="cta-feature">
                  <FaCheckCircle size={14} />
                  <span>14-day free trial</span>
                </div>
                <div className="cta-feature">
                  <FaCheckCircle size={14} />
                  <span>Full support included</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default HomePage;