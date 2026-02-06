import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaBaby,
  FaTooth,
  FaEye,
  FaXRay,
  FaAmbulance,
  FaCalendarCheck,
  FaVideo,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { ScrollAnimationWrapper } from "../../components/ScrollAnimationWrapper";
import "./ServicesPage.css";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const services = [
    {
      id: 1,
      icon: <FaStethoscope />,
      title: "Primary Care",
      description:
        "Comprehensive healthcare for individuals and families with routine check-ups and preventive care.",
      category: "general",
      features: [
        "Annual Physicals",
        "Chronic Disease Management",
        "Vaccinations",
        "Health Screenings",
      ],
      price: "From $150",
      duration: "30-60 mins",
      popular: true,
    },
    {
      id: 2,
      icon: <FaHeartbeat />,
      title: "Cardiology",
      description:
        "Expert heart care including diagnostics, treatment, and preventive cardiology services.",
      category: "specialty",
      features: [
        "Echocardiogram",
        "Stress Tests",
        "Heart Monitoring",
        "Cardiac Rehabilitation",
      ],
      price: "From $300",
      duration: "60-90 mins",
      popular: true,
    },
    {
      id: 3,
      icon: <FaBrain />,
      title: "Neurology",
      description:
        "Specialized care for disorders of the nervous system, brain, and spinal cord.",
      category: "specialty",
      features: [
        "EEG Testing",
        "Nerve Conduction Studies",
        "Migraine Treatment",
        "Memory Care",
      ],
      price: "From $350",
      duration: "60 mins",
      popular: false,
    },
    {
      id: 4,
      icon: <FaBaby />,
      title: "Pediatrics",
      description:
        "Comprehensive medical care for infants, children, and adolescents up to age 18.",
      category: "general",
      features: [
        "Well-child Visits",
        "Immunizations",
        "Developmental Screenings",
        "Sports Physicals",
      ],
      price: "From $120",
      duration: "30-45 mins",
      popular: true,
    },
    {
      id: 5,
      icon: <FaTooth />,
      title: "Dentistry",
      description:
        "Complete dental care including preventive, cosmetic, and restorative dentistry.",
      category: "specialty",
      features: [
        "Teeth Cleaning",
        "Fillings & Crowns",
        "Teeth Whitening",
        "Orthodontics",
      ],
      price: "From $200",
      duration: "45-90 mins",
      popular: false,
    },
    {
      id: 6,
      icon: <FaEye />,
      title: "Ophthalmology",
      description:
        "Comprehensive eye care including vision correction and treatment of eye diseases.",
      category: "specialty",
      features: [
        "Eye Exams",
        "Glaucoma Testing",
        "Cataract Surgery",
        "Laser Vision Correction",
      ],
      price: "From $180",
      duration: "45-60 mins",
      popular: false,
    },
    {
      id: 7,
      icon: <FaXRay />,
      title: "Diagnostic Imaging",
      description:
        "Advanced imaging services including X-rays, MRI, CT scans, and ultrasound.",
      category: "diagnostic",
      features: ["X-Ray", "MRI Scans", "CT Scans", "Ultrasound"],
      price: "From $250",
      duration: "30-120 mins",
      popular: false,
    },
    {
      id: 8,
      icon: <FaAmbulance />,
      title: "Emergency Care",
      description:
        "24/7 emergency medical services with immediate attention for urgent health issues.",
      category: "emergency",
      features: [
        "Trauma Care",
        "Emergency Surgery",
        "Critical Care",
        "Urgent Treatment",
      ],
      price: "From $500",
      duration: "Immediate",
      popular: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Services", count: services.length },
    {
      id: "general",
      name: "General Medicine",
      count: services.filter((s) => s.category === "general").length,
    },
    {
      id: "specialty",
      name: "Specialties",
      count: services.filter((s) => s.category === "specialty").length,
    },
    {
      id: "diagnostic",
      name: "Diagnostics",
      count: services.filter((s) => s.category === "diagnostic").length,
    },
    {
      id: "emergency",
      name: "Emergency",
      count: services.filter((s) => s.category === "emergency").length,
    },
  ];

  const features = [
    {
      icon: <FaCalendarCheck />,
      title: "Easy Scheduling",
      description: "Book appointments online in minutes, 24/7 availability",
      color: "#FF5722",
    },
    {
      icon: <FaVideo />,
      title: "Virtual Visits",
      description: "Consult with doctors from the comfort of your home",
      color: "#4CAF50",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Round-the-clock medical advice and emergency services",
      color: "#2196F3",
    },
    {
      icon: <FaShieldAlt />,
      title: "HIPAA Secure",
      description: "Your medical information is protected and private",
      color: "#9C27B0",
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" duration={0.6}>
            <div className="hero-content">
              <div className="hero-badge">
                <FaCheckCircle />
                <span>Comprehensive Healthcare Services</span>
              </div>
              <h1 className="hero-title">
                Expert Medical Care
                <br />
                <span className="text-orange">Tailored to Your Needs</span>
              </h1>
              <p className="hero-subtitle">
                Access world-class healthcare services with our team of 200+
                board-certified specialists. From routine check-ups to specialized
                treatments, we're here for you.
              </p>
              <div className="hero-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/book-appointment")}
                >
                  <span>Book Appointment</span>
                  <FaArrowRight />
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate("/doctors")}
                >
                  View Our Specialists
                </button>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">
                Find the exact medical service you need from our comprehensive
                offerings
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="fade-in-up" delay={0.2} threshold={0.2}>
            <div className="categories-filter">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="tab-name">{category.name}</span>
                  <span className="tab-count">{category.count}</span>
                </button>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <ScrollAnimationWrapper
                key={service.id}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="service-card">
                  {service.popular && (
                    <div className="popular-badge">
                      <FaStar />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="service-icon">{service.icon}</div>

                  <h3 className="service-title">{service.title}</h3>

                  <p className="service-description">{service.description}</p>

                  <div className="service-details">
                    <div className="detail-item">
                      <span className="label">Price</span>
                      <span className="value">{service.price}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Duration</span>
                      <span className="value">{service.duration}</span>
                    </div>
                  </div>

                  <div className="service-features">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="feature-item">
                        <FaCheckCircle />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="service-actions">
                    <button
                      className="btn-service-primary"
                      onClick={() =>
                        navigate(`/book-appointment?service=${service.id}`)
                      }
                    >
                      Book Now
                    </button>
                    <button
                      className="btn-service-secondary"
                      onClick={() => navigate(`/services/${service.id}`)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <ScrollAnimationWrapper animation="fade-in-up" threshold={0.2}>
            <div className="section-header">
              <div className="section-badge">
                <FaCheckCircle />
                <span>Why Choose Our Services</span>
              </div>
              <h2 className="section-title">
                Excellence in Every
                <br />
                <span className="text-orange">Aspect of Care</span>
              </h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="features-grid">
            {features.map((feature, index) => (
              <ScrollAnimationWrapper
                key={index}
                animation="fade-in-up"
                delay={index * 0.15}
                threshold={0.2}
              >
                <div className="feature-card">
                  <div
                    className="feature-icon-wrapper"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <div
                      className="feature-icon"
                      style={{ color: feature.color }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollAnimationWrapper animation="scale-in" threshold={0.3} duration={0.8}>
        <section className="services-cta">
          <div className="container">
            <div className="cta-content">
              <div className="cta-text">
                <h2 className="cta-title">
                  Ready to Experience Premium Healthcare?
                </h2>
                <p className="cta-subtitle">
                  Book your appointment today and join thousands of satisfied
                  patients who trust us with their health.
                </p>
              </div>
              <div className="cta-actions">
                <button
                  className="btn-cta-primary"
                  onClick={() => navigate("/book-appointment")}
                >
                  <FaCalendarCheck />
                  <span>Schedule Appointment</span>
                </button>
                <button
                  className="btn-cta-secondary"
                  onClick={() => navigate("/contact")}
                >
                  <FaPhoneAlt />
                  <span>Call Now: (555) 123-4567</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default ServicesPage;