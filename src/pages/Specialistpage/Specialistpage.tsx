import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaChevronRight,
  FaHeart,
  FaBrain,
  FaUserMd,
  FaBaby,
  FaBone,
  FaAllergies,
  FaSearch,
  FaVideo,
  FaPhone,
  FaHospital,
  FaClock,
  FaUserFriends,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaUser,
  FaInfoCircle,
  FaGraduationCap,
  FaLanguage,
  FaArrowLeft,
} from "react-icons/fa";
import { ScrollAnimationWrapper } from "../../components/ScrollAnimationWrapper";
import "./SpecialistPage.css";

interface Specialist {
  id: number;
  name: string;
  specialty: string;
  specialtyKey: string;
  rating: number;
  experience: string;
  patients: string;
  availability: string;
  image: string;
  price: number;
  languages: string[];
  education: string;
  clinic: string;
  location: string;
  consultationTypes: ("in-person" | "video" | "phone")[];
  nextAvailable: string;
  description?: string;
}

const SpecialistPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Wed");
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [consultationType, setConsultationType] = useState<
    "in-person" | "video" | "phone"
  >("video");
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: "",
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showBookingPage, setShowBookingPage] = useState<boolean>(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parse specialty from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const specialtyFromUrl = queryParams.get("specialty");
    if (specialtyFromUrl) {
      setSelectedSpecialty(specialtyFromUrl);
    }

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location.search]);

  // Original 7 specialty categories with counts
  const specialtyCategories = [
    {
      key: "all",
      name: "All Specialties",
      icon: <FaUserMd />,
      color: "#FF5722",
      count: 14,
    },
    {
      key: "cardiology",
      name: "Cardiology",
      icon: <FaHeart />,
      color: "#FF4081",
      count: 2,
    },
    {
      key: "neurology",
      name: "Neurology",
      icon: <FaBrain />,
      color: "#3F51B5",
      count: 2,
    },
    {
      key: "family-medicine",
      name: "Family Medicine",
      icon: <FaUserMd />,
      color: "#4CAF50",
      count: 3,
    },
    {
      key: "pediatrics",
      name: "Pediatrics",
      icon: <FaBaby />,
      color: "#FF9800",
      count: 2,
    },
    {
      key: "orthopedics",
      name: "Orthopedics",
      icon: <FaBone />,
      color: "#9C27B0",
      count: 2,
    },
    {
      key: "dermatology",
      name: "Dermatology",
      icon: <FaAllergies />,
      color: "#00BCD4",
      count: 3,
    },
  ];

  // All specialists data - 14 doctors across 7 specialties
  const allSpecialists: Specialist[] = [
    // Cardiology - 2 doctors
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialty: "Cardiologist",
      specialtyKey: "cardiology",
      rating: 4.9,
      experience: "18+ years",
      patients: "8,500+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
      price: 220,
      languages: ["English", "Spanish"],
      education: "Harvard Medical School",
      clinic: "Heart Care Center",
      location: "New York, NY",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 2:00 PM",
      description: "Specialized in heart disease prevention and treatment",
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Cardiac Surgeon",
      specialtyKey: "cardiology",
      rating: 4.8,
      experience: "15+ years",
      patients: "5,000+",
      availability: "Available Tomorrow",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
      price: 350,
      languages: ["English", "German"],
      education: "Johns Hopkins University",
      clinic: "Cardiac Surgical Institute",
      location: "Boston, MA",
      consultationTypes: ["in-person"],
      nextAvailable: "Tomorrow, 10:00 AM",
      description: "Expert in cardiac surgery and rehabilitation",
    },

    // Neurology - 2 doctors
    {
      id: 3,
      name: "Dr. Robert Kim",
      specialty: "Neurologist",
      specialtyKey: "neurology",
      rating: 4.8,
      experience: "12+ years",
      patients: "6,200+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
      price: 240,
      languages: ["English", "Korean"],
      education: "Mayo Clinic School of Medicine",
      clinic: "Neuro Care Center",
      location: "Chicago, IL",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 11:00 AM",
      description: "Specialized in neurological disorders and treatment",
    },
    {
      id: 4,
      name: "Dr. Amanda Patel",
      specialty: "Stroke Specialist",
      specialtyKey: "neurology",
      rating: 4.7,
      experience: "10+ years",
      patients: "4,500+",
      availability: "Available Tomorrow",
      image:
        "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&h=500&fit=crop",
      price: 210,
      languages: ["English", "Hindi"],
      education: "University of Pennsylvania",
      clinic: "Stroke Prevention Center",
      location: "Philadelphia, PA",
      consultationTypes: ["in-person", "video", "phone"],
      nextAvailable: "Tomorrow, 9:00 AM",
      description: "Expert in stroke prevention and recovery",
    },

    // Family Medicine - 3 doctors
    {
      id: 5,
      name: "Dr. Jennifer Taylor",
      specialty: "Family Physician",
      specialtyKey: "family-medicine",
      rating: 4.6,
      experience: "8+ years",
      patients: "12,000+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&h=500&fit=crop",
      price: 120,
      languages: ["English", "Spanish"],
      education: "University of California, SF",
      clinic: "Family Health Clinic",
      location: "San Diego, CA",
      consultationTypes: ["in-person", "video", "phone"],
      nextAvailable: "Today, 10:30 AM",
      description: "Comprehensive family care and preventive medicine",
    },
    {
      id: 6,
      name: "Dr. William Brown",
      specialty: "Family Medicine",
      specialtyKey: "family-medicine",
      rating: 4.8,
      experience: "20+ years",
      patients: "18,000+",
      availability: "Available Tomorrow",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
      price: 135,
      languages: ["English", "French"],
      education: "Duke University School of Medicine",
      clinic: "Community Health Center",
      location: "Atlanta, GA",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Tomorrow, 2:00 PM",
      description: "Experienced in managing chronic conditions",
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      specialty: "Family Practitioner",
      specialtyKey: "family-medicine",
      rating: 4.7,
      experience: "15+ years",
      patients: "15,500+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
      price: 125,
      languages: ["English", "Spanish", "Portuguese"],
      education: "University of Miami",
      clinic: "Comprehensive Care Clinic",
      location: "Miami, FL",
      consultationTypes: ["in-person", "video", "phone"],
      nextAvailable: "Today, 3:00 PM",
      description: "Focused on preventive care and wellness",
    },

    // Pediatrics - 2 doctors
    {
      id: 8,
      name: "Dr. Emily Wilson",
      specialty: "Pediatrician",
      specialtyKey: "pediatrics",
      rating: 4.8,
      experience: "14+ years",
      patients: "16,000+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
      price: 150,
      languages: ["English", "Spanish"],
      education: "Boston Children's Hospital",
      clinic: "Children's Health Center",
      location: "Boston, MA",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 10:00 AM",
      description: "Specialized in child healthcare and development",
    },
    {
      id: 9,
      name: "Dr. Richard Martinez",
      specialty: "Pediatric Specialist",
      specialtyKey: "pediatrics",
      rating: 4.7,
      experience: "11+ years",
      patients: "12,000+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
      price: 145,
      languages: ["English", "Spanish"],
      education: "Children's Hospital Los Angeles",
      clinic: "Pediatric Care Associates",
      location: "Los Angeles, CA",
      consultationTypes: ["in-person", "video", "phone"],
      nextAvailable: "Today, 2:30 PM",
      description: "Expert in pediatric allergies and asthma",
    },

    // Orthopedics - 2 doctors
    {
      id: 10,
      name: "Dr. Michael Johnson",
      specialty: "Orthopedic Surgeon",
      specialtyKey: "orthopedics",
      rating: 4.8,
      experience: "16+ years",
      patients: "9,000+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop",
      price: 300,
      languages: ["English", "Spanish"],
      education: "Hospital for Special Surgery",
      clinic: "Bone & Joint Center",
      location: "New York, NY",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 11:00 AM",
      description: "Specialized in joint replacement and sports injuries",
    },
    {
      id: 11,
      name: "Dr. Samantha White",
      specialty: "Sports Medicine",
      specialtyKey: "orthopedics",
      rating: 4.7,
      experience: "10+ years",
      patients: "7,500+",
      availability: "Available Tomorrow",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
      price: 220,
      languages: ["English", "Portuguese"],
      education: "University of Michigan",
      clinic: "Sports Medicine Institute",
      location: "Ann Arbor, MI",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Tomorrow, 10:30 AM",
      description: "Expert in sports injuries and rehabilitation",
    },

    // Dermatology - 3 doctors
    {
      id: 12,
      name: "Dr. Olivia Harris",
      specialty: "Dermatologist",
      specialtyKey: "dermatology",
      rating: 4.8,
      experience: "12+ years",
      patients: "10,000+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=400&h=500&fit=crop",
      price: 200,
      languages: ["English", "Spanish"],
      education: "Mount Sinai Hospital",
      clinic: "Skin Care Center",
      location: "New York, NY",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 2:00 PM",
      description: "Specialized in skin diseases and cosmetic dermatology",
    },
    {
      id: 13,
      name: "Dr. Daniel King",
      specialty: "Cosmetic Dermatology",
      specialtyKey: "dermatology",
      rating: 4.9,
      experience: "9+ years",
      patients: "8,500+",
      availability: "Available Tomorrow",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
      price: 250,
      languages: ["English", "French"],
      education: "UCLA Medical Center",
      clinic: "Aesthetic Dermatology",
      location: "Los Angeles, CA",
      consultationTypes: ["in-person"],
      nextAvailable: "Tomorrow, 11:00 AM",
      description: "Expert in cosmetic procedures and anti-aging treatments",
    },
    {
      id: 14,
      name: "Dr. Sophia Lewis",
      specialty: "Pediatric Dermatology",
      specialtyKey: "dermatology",
      rating: 4.7,
      experience: "11+ years",
      patients: "6,800+",
      availability: "Available Today",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop",
      price: 180,
      languages: ["English", "Korean"],
      education: "Children's National Hospital",
      clinic: "Pediatric Skin Center",
      location: "Washington, DC",
      consultationTypes: ["in-person", "video"],
      nextAvailable: "Today, 4:30 PM",
      description: "Specialized in children's skin conditions",
    },
  ];

  // Filter specialists based on selected specialty and search query
  const filteredSpecialists = allSpecialists.filter((specialist) => {
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      specialist.specialtyKey === selectedSpecialty;
    const matchesSearch =
      searchQuery === "" ||
      specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const dates = [
    { day: "Mon", date: "10" },
    { day: "Tue", date: "11" },
    { day: "Wed", date: "12" },
    { day: "Thu", date: "13" },
    { day: "Fri", date: "14" },
  ];

  const times = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  const handleSpecialtyClick = (specialtyKey: string) => {
    setSelectedSpecialty(specialtyKey);
    navigate(`/specialists?specialty=${specialtyKey}`);
    setSelectedSpecialist(null);
    setBookingStep(1);
    setShowBookingPage(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSpecialistClick = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setBookingStep(1);

    // On mobile, show booking page instead of side panel
    if (isMobile) {
      setShowBookingPage(true);
    }
  };

  const handleBackToList = () => {
    setShowBookingPage(false);
    setSelectedSpecialist(null);
    setBookingStep(1);
  };

  const handleBookAppointment = () => {
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setBookingStep(3);
    } else {
      alert("Appointment booked successfully!");
      setBookingStep(1);
      setSelectedSpecialist(null);
      setShowBookingPage(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPatientInfo({
      ...patientInfo,
      [e.target.name]: e.target.value,
    });
  };

  const currentSpecialty = specialtyCategories.find(
    (s) => s.key === selectedSpecialty,
  );
  const currentSpecialtyName = currentSpecialty?.name || "All Specialties";

  // Render booking page for mobile
  if (isMobile && showBookingPage && selectedSpecialist) {
    return (
      <div className="specialist-page mobile-booking-page">
        <div className="mobile-booking-header">
          <button className="back-to-list-btn" onClick={handleBackToList}>
            <FaArrowLeft />
            <span>Back to Specialists</span>
          </button>
        </div>
        <div className="container">
          <div className="booking-panel mobile-booking-panel">
            <div className="panel-header">
              <h2 className="panel-title">
                <FaCalendarAlt />
                Appointment Details
              </h2>
              <div className="selected-specialist">
                <img
                  src={selectedSpecialist.image}
                  alt={selectedSpecialist.name}
                />
                <div className="selected-specialist-info">
                  <h4>{selectedSpecialist.name}</h4>
                  <p>{selectedSpecialist.specialty}</p>
                  <div className="selected-rating">
                    <FaStar className="star-icon" />
                    <span>{selectedSpecialist.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-section">
              <div className="booking-steps">
                <div className={`step ${bookingStep >= 1 ? "active" : ""}`}>
                  <div className="step-number">1</div>
                  <span>Date & Time</span>
                </div>
                <div className={`step ${bookingStep >= 2 ? "active" : ""}`}>
                  <div className="step-number">2</div>
                  <span>Patient Info</span>
                </div>
                <div className={`step ${bookingStep >= 3 ? "active" : ""}`}>
                  <div className="step-number">3</div>
                  <span>Confirmation</span>
                </div>
              </div>

              {bookingStep === 1 && (
                <div className="booking-step">
                  <h3 className="section-subtitle">
                    <FaVideo />
                    Select Consultation Type
                  </h3>
                  <div className="consultation-type-options">
                    <label
                      className={`consultation-type ${consultationType === "video" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="video"
                        checked={consultationType === "video"}
                        onChange={() => setConsultationType("video")}
                      />
                      <div className="type-content">
                        <FaVideo className="type-icon" />
                        <div className="type-info">
                          <h4>Video Consultation</h4>
                          <p>Consult from home</p>
                        </div>
                        <span className="recommended-badge">Recommended</span>
                      </div>
                    </label>
                    <label
                      className={`consultation-type ${consultationType === "in-person" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="in-person"
                        checked={consultationType === "in-person"}
                        onChange={() => setConsultationType("in-person")}
                      />
                      <div className="type-content">
                        <FaHospital className="type-icon" />
                        <div className="type-info">
                          <h4>In-Person Visit</h4>
                          <p>Visit the clinic</p>
                        </div>
                      </div>
                    </label>
                    <label
                      className={`consultation-type ${consultationType === "phone" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value="phone"
                        checked={consultationType === "phone"}
                        onChange={() => setConsultationType("phone")}
                      />
                      <div className="type-content">
                        <FaPhone className="type-icon" />
                        <div className="type-info">
                          <h4>Phone Call</h4>
                          <p>Audio consultation</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <h3 className="section-subtitle">
                    <FaCalendarAlt />
                    Select Date & Time
                  </h3>

                  <div className="date-section">
                    <div className="section-label">Date</div>
                    <div className="date-grid">
                      {dates.map((date) => (
                        <button
                          key={date.day}
                          className={`date-btn ${selectedDate === date.day ? "selected" : ""}`}
                          onClick={() => setSelectedDate(date.day)}
                        >
                          <span className="date-day">{date.day}</span>
                          <span className="date-number">{date.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="time-section">
                    <div className="section-label">Time Slot</div>
                    <div className="time-grid">
                      {times.map((time) => (
                        <button
                          key={time}
                          className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn-continue"
                    onClick={() => setBookingStep(2)}
                  >
                    Continue to Patient Info
                    <FaChevronRight className="btn-icon" />
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="booking-step">
                  <h3 className="section-subtitle">
                    <FaUser />
                    Patient Information
                  </h3>

                  <div className="patient-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={patientInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={patientInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={patientInfo.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Symptoms & Concerns</label>
                      <textarea
                        name="symptoms"
                        value={patientInfo.symptoms}
                        onChange={handleInputChange}
                        placeholder="Describe your symptoms or concerns"
                        rows={4}
                      />
                    </div>

                    <div className="form-actions">
                      <button
                        className="btn-back"
                        onClick={() => setBookingStep(1)}
                      >
                        Back
                      </button>
                      <button
                        className="btn-continue"
                        onClick={() => setBookingStep(3)}
                      >
                        Continue to Confirmation
                        <FaChevronRight className="btn-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="booking-step">
                  <h3 className="section-subtitle">
                    <FaCheckCircle />
                    Confirm Appointment
                  </h3>

                  <div className="confirmation-summary">
                    <div className="summary-item">
                      <span className="summary-label">Specialist</span>
                      <span className="summary-value">
                        {selectedSpecialist.name}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Specialty</span>
                      <span className="summary-value">
                        {selectedSpecialist.specialty}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Consultation Type</span>
                      <span className="summary-value">
                        {consultationType === "video"
                          ? "Video Consultation"
                          : consultationType === "in-person"
                            ? "In-Person Visit"
                            : "Phone Call"}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Date</span>
                      <span className="summary-value">
                        Wednesday, Dec {selectedDate === "Wed" ? "12" : "13"}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Time</span>
                      <span className="summary-value">{selectedTime} AM</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Duration</span>
                      <span className="summary-value">45 minutes</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Patient Name</span>
                      <span className="summary-value">
                        {patientInfo.name || "Not provided"}
                      </span>
                    </div>
                    <div className="summary-item total">
                      <span className="summary-label">Total Amount</span>
                      <span className="summary-value">
                        ${selectedSpecialist.price}.00
                      </span>
                    </div>
                  </div>

                  <div className="booking-terms">
                    <label className="terms-checkbox">
                      <input type="checkbox" />
                      <span>
                        I agree to the <a href="/terms">Terms of Service</a> and{" "}
                        <a href="/privacy">Privacy Policy</a>
                      </span>
                    </label>
                    <label className="terms-checkbox">
                      <input type="checkbox" />
                      <span>
                        I consent to receive appointment reminders via SMS and
                        email
                      </span>
                    </label>
                    <label className="terms-checkbox">
                      <input type="checkbox" />
                      <span>
                        I understand that this is a medical consultation and
                        emergencies should go to ER
                      </span>
                    </label>
                  </div>

                  <div className="confirmation-actions">
                    <button
                      className="btn-back"
                      onClick={() => setBookingStep(2)}
                    >
                      Back
                    </button>
                    <button
                      className="btn-confirm"
                      onClick={handleBookAppointment}
                    >
                      <FaCheckCircle className="btn-icon" />
                      <span>Confirm & Book Appointment</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular desktop/tablet view or mobile list view
  return (
    <div className="specialist-page">
      <div className="specialist-content">
        <div className="container">
          {/* Page Header - Animated */}
          <ScrollAnimationWrapper animation="fade-in-up" duration={0.5}>
            <div className="page-header">
              <div className="header-content">
                <h1 className="page-title">{currentSpecialtyName}</h1>
                <p className="page-subtitle">
                  Choose from our verified medical professionals
                </p>
              </div>
              <div className="header-controls">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search doctors by name or specialty..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <FaSearch className="search-icon" />
                </div>
                <div className="specialist-count">
                  <span className="count-number">
                    {filteredSpecialists.length}
                  </span>
                  <span className="count-label">Available</span>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Specialty Filter Bar - Animated */}
          <ScrollAnimationWrapper
            animation="fade-in-up"
            delay={0.2}
            threshold={0.2}
          >
            <div className="specialty-filter-bar">
              {specialtyCategories.map((category) => (
                <button
                  key={category.key}
                  className={`specialty-filter-btn ${selectedSpecialty === category.key ? "active" : ""}`}
                  onClick={() => handleSpecialtyClick(category.key)}
                  style={
                    {
                      "--category-color": category.color,
                    } as React.CSSProperties
                  }
                >
                  <div className="filter-icon">{category.icon}</div>
                  <span>{category.name}</span>
                  <span className="specialty-count">{category.count}</span>
                </button>
              ))}
            </div>
          </ScrollAnimationWrapper>

          <div className="content-wrapper">
            {/* Left Column - Specialists List (NO ANIMATION - dynamic content) */}
            <div className="specialists-section">
              <div className="specialists-header">
                <h2 className="section-title">
                  <FaUserMd className="section-title-icon" />
                  {filteredSpecialists.length}{" "}
                  {currentSpecialtyName === "All Specialties"
                    ? "Specialists"
                    : currentSpecialtyName}
                </h2>
                <div className="sort-options">
                  <select className="sort-select">
                    <option>Sort by: Highest Rating</option>
                    <option>Experience</option>
                    <option>Price</option>
                    <option>Availability</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="specialists-skeleton">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="skeleton-card">
                      <div className="skeleton-avatar"></div>
                      <div className="skeleton-info">
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredSpecialists.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">
                    <FaUserFriends size={48} />
                  </div>
                  <h3>No specialists found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="specialists-grid">
                  {filteredSpecialists.map((specialist) => (
                    <div
                      key={specialist.id}
                      className={`specialist-card ${selectedSpecialist?.id === specialist.id ? "selected" : ""}`}
                      onClick={() => handleSpecialistClick(specialist)}
                      style={
                        {
                          "--category-color": specialtyCategories.find(
                            (s) => s.key === specialist.specialtyKey,
                          )?.color,
                        } as React.CSSProperties
                      }
                    >
                      <div className="card-header">
                        <div className="specialist-avatar">
                          <img src={specialist.image} alt={specialist.name} />
                          <div className="availability-badge">
                            {specialist.availability}
                          </div>
                        </div>
                        <div className="specialist-main-info">
                          <h3 className="specialist-name">{specialist.name}</h3>
                          <p className="specialist-specialty">
                            {specialist.specialty}
                          </p>
                          <div className="specialist-meta">
                            <span className="clinic">
                              <FaMapMarkerAlt /> {specialist.clinic}
                            </span>
                            <span className="next-available">
                              <FaClock /> Next: {specialist.nextAvailable}
                            </span>
                          </div>
                          <div className="specialist-rating">
                            <FaStar className="star-icon" />
                            <span className="rating-value">
                              {specialist.rating}
                            </span>
                            <span className="rating-total">/5.0</span>
                            <span className="patient-count">
                              ({specialist.patients} patients)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="card-details">
                        <div className="detail-item">
                          <span className="detail-label">
                            <FaGraduationCap /> Experience
                          </span>
                          <span className="detail-value">
                            {specialist.experience}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">
                            <FaInfoCircle /> Education
                          </span>
                          <span className="detail-value education">
                            {specialist.education}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">
                            <FaLanguage /> Languages
                          </span>
                          <span className="detail-value languages">
                            {specialist.languages.join(", ")}
                          </span>
                        </div>
                      </div>

                      {specialist.description && (
                        <div className="specialist-description">
                          <p>{specialist.description}</p>
                        </div>
                      )}

                      <div className="consultation-types">
                        <span className="consultation-label">
                          Available for:
                        </span>
                        <div className="type-badges">
                          {specialist.consultationTypes.includes(
                            "in-person",
                          ) && (
                            <span className="type-badge">
                              <FaHospital /> In-person
                            </span>
                          )}
                          {specialist.consultationTypes.includes("video") && (
                            <span className="type-badge">
                              <FaVideo /> Video
                            </span>
                          )}
                          {specialist.consultationTypes.includes("phone") && (
                            <span className="type-badge">
                              <FaPhone /> Phone
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="price-tag">
                          <span className="price-label">Consultation Fee</span>
                          <span className="price-value">
                            ${specialist.price}
                          </span>
                        </div>
                        <button className="view-profile-btn">
                          {isMobile ? "Book Now" : "View Profile"}
                          <FaChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Booking Panel - Desktop/Tablet Only */}
            {!isMobile && (
              <ScrollAnimationWrapper
                animation="slide-in-right"
                delay={0.3}
                threshold={0.2}
                triggerOnce={true}
              >
                <div className="booking-panel">
                  <div className="panel-header">
                    <h2 className="panel-title">
                      <FaCalendarAlt />
                      Appointment Details
                    </h2>
                    {selectedSpecialist ? (
                      <div className="selected-specialist">
                        <img
                          src={selectedSpecialist.image}
                          alt={selectedSpecialist.name}
                        />
                        <div className="selected-specialist-info">
                          <h4>{selectedSpecialist.name}</h4>
                          <p>{selectedSpecialist.specialty}</p>
                          <div className="selected-rating">
                            <FaStar className="star-icon" />
                            <span>{selectedSpecialist.rating}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-selection">
                        <FaUserFriends className="no-selection-icon" />
                        <p>Select a specialist to book an appointment</p>
                      </div>
                    )}
                  </div>

                  {selectedSpecialist && (
                    <div className="booking-section">
                      <div className="booking-steps">
                        <div
                          className={`step ${bookingStep >= 1 ? "active" : ""}`}
                        >
                          <div className="step-number">1</div>
                          <span>Date & Time</span>
                        </div>
                        <div
                          className={`step ${bookingStep >= 2 ? "active" : ""}`}
                        >
                          <div className="step-number">2</div>
                          <span>Patient Info</span>
                        </div>
                        <div
                          className={`step ${bookingStep >= 3 ? "active" : ""}`}
                        >
                          <div className="step-number">3</div>
                          <span>Confirmation</span>
                        </div>
                      </div>

                      {bookingStep === 1 && (
                        <div className="booking-step">
                          <h3 className="section-subtitle">
                            <FaVideo />
                            Select Consultation Type
                          </h3>
                          <div className="consultation-type-options">
                            <label
                              className={`consultation-type ${consultationType === "video" ? "selected" : ""}`}
                            >
                              <input
                                type="radio"
                                name="consultationType"
                                value="video"
                                checked={consultationType === "video"}
                                onChange={() => setConsultationType("video")}
                              />
                              <div className="type-content">
                                <FaVideo className="type-icon" />
                                <div className="type-info">
                                  <h4>Video Consultation</h4>
                                  <p>Consult from home</p>
                                </div>
                                <span className="recommended-badge">
                                  Recommended
                                </span>
                              </div>
                            </label>
                            <label
                              className={`consultation-type ${consultationType === "in-person" ? "selected" : ""}`}
                            >
                              <input
                                type="radio"
                                name="consultationType"
                                value="in-person"
                                checked={consultationType === "in-person"}
                                onChange={() =>
                                  setConsultationType("in-person")
                                }
                              />
                              <div className="type-content">
                                <FaHospital className="type-icon" />
                                <div className="type-info">
                                  <h4>In-Person Visit</h4>
                                  <p>Visit the clinic</p>
                                </div>
                              </div>
                            </label>
                            <label
                              className={`consultation-type ${consultationType === "phone" ? "selected" : ""}`}
                            >
                              <input
                                type="radio"
                                name="consultationType"
                                value="phone"
                                checked={consultationType === "phone"}
                                onChange={() => setConsultationType("phone")}
                              />
                              <div className="type-content">
                                <FaPhone className="type-icon" />
                                <div className="type-info">
                                  <h4>Phone Call</h4>
                                  <p>Audio consultation</p>
                                </div>
                              </div>
                            </label>
                          </div>

                          <h3 className="section-subtitle">
                            <FaCalendarAlt />
                            Select Date & Time
                          </h3>

                          <div className="date-section">
                            <div className="section-label">Date</div>
                            <div className="date-grid">
                              {dates.map((date) => (
                                <button
                                  key={date.day}
                                  className={`date-btn ${selectedDate === date.day ? "selected" : ""}`}
                                  onClick={() => setSelectedDate(date.day)}
                                >
                                  <span className="date-day">{date.day}</span>
                                  <span className="date-number">
                                    {date.date}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="time-section">
                            <div className="section-label">Time Slot</div>
                            <div className="time-grid">
                              {times.map((time) => (
                                <button
                                  key={time}
                                  className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                                  onClick={() => setSelectedTime(time)}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            className="btn-continue"
                            onClick={() => setBookingStep(2)}
                          >
                            Continue to Patient Info
                            <FaChevronRight className="btn-icon" />
                          </button>
                        </div>
                      )}

                      {bookingStep === 2 && (
                        <div className="booking-step">
                          <h3 className="section-subtitle">
                            <FaUser />
                            Patient Information
                          </h3>

                          <div className="patient-form">
                            <div className="form-group">
                              <label>Full Name</label>
                              <input
                                type="text"
                                name="name"
                                value={patientInfo.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div className="form-row">
                              <div className="form-group">
                                <label>Email Address</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={patientInfo.email}
                                  onChange={handleInputChange}
                                  placeholder="Enter your email"
                                />
                              </div>
                              <br />
                              <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={patientInfo.phone}
                                  onChange={handleInputChange}
                                  placeholder="Enter your phone"
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Symptoms & Concerns</label>
                              <textarea
                                name="symptoms"
                                value={patientInfo.symptoms}
                                onChange={handleInputChange}
                                placeholder="Describe your symptoms or concerns"
                                rows={4}
                              />
                            </div>

                            <div className="form-actions">
                              <button
                                className="btn-back"
                                onClick={() => setBookingStep(1)}
                              >
                                Back
                              </button>
                              <button
                                className="btn-continue"
                                onClick={() => setBookingStep(3)}
                              >
                                Continue to Confirmation
                                <FaChevronRight className="btn-icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {bookingStep === 3 && (
                        <div className="booking-step">
                          <h3 className="section-subtitle">
                            <FaCheckCircle />
                            Confirm Appointment
                          </h3>

                          <div className="confirmation-summary">
                            <div className="summary-item">
                              <span className="summary-label">Specialist</span>
                              <span className="summary-value">
                                {selectedSpecialist.name}
                              </span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">Specialty</span>
                              <span className="summary-value">
                                {selectedSpecialist.specialty}
                              </span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">
                                Consultation Type
                              </span>
                              <span className="summary-value">
                                {consultationType === "video"
                                  ? "Video Consultation"
                                  : consultationType === "in-person"
                                    ? "In-Person Visit"
                                    : "Phone Call"}
                              </span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">Date</span>
                              <span className="summary-value">
                                Wednesday, Dec{" "}
                                {selectedDate === "Wed" ? "12" : "13"}
                              </span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">Time</span>
                              <span className="summary-value">
                                {selectedTime} AM
                              </span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">Duration</span>
                              <span className="summary-value">45 minutes</span>
                            </div>
                            <div className="summary-item">
                              <span className="summary-label">
                                Patient Name
                              </span>
                              <span className="summary-value">
                                {patientInfo.name || "Not provided"}
                              </span>
                            </div>
                            <div className="summary-item total">
                              <span className="summary-label">
                                Total Amount
                              </span>
                              <span className="summary-value">
                                ${selectedSpecialist.price}.00
                              </span>
                            </div>
                          </div>

                          <div className="booking-terms">
                            <label className="terms-checkbox">
                              <input type="checkbox" />
                              <span>
                                I agree to the{" "}
                                <a href="/terms">Terms of Service</a> and{" "}
                                <a href="/privacy">Privacy Policy</a>
                              </span>
                            </label>
                            <label className="terms-checkbox">
                              <input type="checkbox" />
                              <span>
                                I consent to receive appointment reminders via
                                SMS and email
                              </span>
                            </label>
                            <label className="terms-checkbox">
                              <input type="checkbox" />
                              <span>
                                I understand that this is a medical consultation
                                and emergencies should go to ER
                              </span>
                            </label>
                          </div>

                          <div className="confirmation-actions">
                            <button
                              className="btn-back"
                              onClick={() => setBookingStep(2)}
                            >
                              Back
                            </button>
                            <button
                              className="btn-confirm"
                              onClick={handleBookAppointment}
                            >
                              <FaCheckCircle className="btn-icon" />
                              <span>Confirm & Book Appointment</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollAnimationWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistPage;
