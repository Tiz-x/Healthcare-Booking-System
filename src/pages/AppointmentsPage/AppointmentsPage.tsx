import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaVideo, 
  FaHospital, 
  FaPhone,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaCalendarPlus,
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload
} from 'react-icons/fa';
import { ScrollAnimationWrapper } from '../../components/ScrollAnimationWrapper';
import './AppointmentsPage.css';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
  duration: string;
  price: number;
  symptoms?: string;
  notes?: string;
  prescription?: string;
}

const AppointmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'video' | 'in-person' | 'phone'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'completed' | 'cancelled' | 'pending'>('all');

  const appointments: Appointment[] = [
    // Upcoming appointments
    {
      id: 1,
      date: '2024-02-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Neurologist',
      type: 'video',
      status: 'confirmed',
      duration: '45 min',
      price: 120,
      symptoms: 'Headache, dizziness'
    },
    {
      id: 2,
      date: '2024-02-20',
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      type: 'in-person',
      status: 'confirmed',
      duration: '60 min',
      price: 150,
      symptoms: 'Chest pain, shortness of breath'
    },
    {
      id: 3,
      date: '2024-02-25',
      time: '11:15 AM',
      doctor: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      type: 'phone',
      status: 'pending',
      duration: '30 min',
      price: 90
    },
    // Past appointments
    {
      id: 4,
      date: '2024-01-10',
      time: '9:00 AM',
      doctor: 'Dr. Robert Wilson',
      specialty: 'Orthopedic Surgeon',
      type: 'video',
      status: 'completed',
      duration: '45 min',
      price: 120,
      notes: 'Follow-up after knee surgery',
      prescription: 'prescription_001.pdf'
    },
    {
      id: 5,
      date: '2024-01-05',
      time: '3:45 PM',
      doctor: 'Dr. Amanda Scott',
      specialty: 'Pediatrician',
      type: 'in-person',
      status: 'completed',
      duration: '30 min',
      price: 100,
      notes: 'Annual checkup',
      prescription: 'prescription_002.pdf'
    },
    {
      id: 6,
      date: '2023-12-20',
      time: '1:30 PM',
      doctor: 'Dr. James Miller',
      specialty: 'Family Medicine',
      type: 'phone',
      status: 'cancelled',
      duration: '20 min',
      price: 75
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesTab = activeTab === 'upcoming' 
      ? ['confirmed', 'pending'].includes(appointment.status)
      : ['completed', 'cancelled'].includes(appointment.status);
    
    const matchesSearch = searchQuery === '' || 
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || appointment.type === filterType;
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    return matchesTab && matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle className="confirmed" />;
      case 'completed':
        return <FaCheckCircle className="completed" />;
      case 'cancelled':
        return <FaTimesCircle className="cancelled" />;
      case 'pending':
        return <FaExclamationCircle className="pending" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <FaVideo />;
      case 'in-person':
        return <FaHospital />;
      case 'phone':
        return <FaPhone />;
      default:
        return null;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Consultation';
      case 'in-person':
        return 'In-person Visit';
      case 'phone':
        return 'Phone Call';
      default:
        return type;
    }
  };

  const handleReschedule = (id: number) => {
    alert(`Reschedule appointment ${id}`);
  };

  const handleCancel = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Cancel appointment ${id}`);
    }
  };

  const handleDownloadPrescription = (filename: string) => {
    alert(`Download prescription: ${filename}`);
  };

  const handleBookNew = () => {
    window.location.href = '/specialists';
  };

  return (
    <div className="appointments-page">
      <div className="container">
        {/* Page Header */}
        <ScrollAnimationWrapper animation="fade-in-up" duration={0.6}>
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">My Appointments</h1>
              <p className="page-subtitle">Manage and track your medical appointments</p>
            </div>
            <button className="btn-primary" onClick={handleBookNew}>
              <FaCalendarPlus />
              <span>Book New Appointment</span>
            </button>
          </div>
        </ScrollAnimationWrapper>

        {/* Stats Cards */}
        <div className="stats-cards">
          {[
            { icon: <FaCalendarAlt />, title: 'Upcoming', number: '3', label: 'Appointments', className: 'upcoming' },
            { icon: <FaCheckCircle />, title: 'Completed', number: '15', label: 'This year', className: 'completed' },
            { icon: <FaVideo />, title: 'Video Consults', number: '8', label: 'Total', className: 'video' },
            { icon: <FaClock />, title: 'Total Hours', number: '22.5', label: 'Consultation time', className: 'total' }
          ].map((stat, index) => (
            <ScrollAnimationWrapper
              key={index}
              animation="scale-in"
              delay={0.1 + index * 0.1}
              threshold={0.2}
            >
              <div className="stat-card">
                <div className={`stat-icon ${stat.className}`}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <p className="stat-number">{stat.number}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Filters and Tabs */}
        <ScrollAnimationWrapper animation="fade-in-up" delay={0.5} threshold={0.2}>
          <div className="appointments-controls">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Appointments
                <span className="tab-badge">3</span>
              </button>
              <button 
                className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past Appointments
                <span className="tab-badge">12</span>
              </button>
            </div>

            <div className="filters">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-dropdowns">
                <div className="filter-group">
                  <FaFilter />
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                  >
                    <option value="all">All Types</option>
                    <option value="video">Video Consultation</option>
                    <option value="in-person">In-person Visit</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>

                <div className="filter-group">
                  <FaSort />
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                  >
                    <option value="all">All Status</option>
                    {activeTab === 'upcoming' ? (
                      <>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                      </>
                    ) : (
                      <>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Appointments List */}
        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <ScrollAnimationWrapper animation="fade-in" threshold={0.2}>
              <div className="no-appointments">
                <FaCalendarAlt size={64} />
                <h3>No appointments found</h3>
                <p>Try adjusting your filters or book a new appointment</p>
                <button className="btn-primary" onClick={handleBookNew}>
                  Book New Appointment
                </button>
              </div>
            </ScrollAnimationWrapper>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <ScrollAnimationWrapper
                key={appointment.id}
                animation="fade-in-up"
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-date">
                      <div className="date-icon">
                        <FaCalendarAlt />
                      </div>
                      <div>
                        <span className="date">{appointment.date}</span>
                        <span className="time">{appointment.time}</span>
                      </div>
                    </div>
                    
                    <div className="appointment-status">
                      {getStatusIcon(appointment.status)}
                      <span className={`status-text ${appointment.status}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>

                  <div className="appointment-body">
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        <FaUserMd />
                      </div>
                      <div>
                        <h3 className="doctor-name">{appointment.doctor}</h3>
                        <p className="doctor-specialty">{appointment.specialty}</p>
                      </div>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <span className="label">Type</span>
                        <div className="value type">
                          {getTypeIcon(appointment.type)}
                          <span>{getTypeText(appointment.type)}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <span className="label">Duration</span>
                        <div className="value">
                          <FaClock />
                          <span>{appointment.duration}</span>
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <span className="label">Price</span>
                        <div className="value price">${appointment.price}</div>
                      </div>
                    </div>

                    {appointment.symptoms && (
                      <div className="symptoms">
                        <span className="label">Symptoms:</span>
                        <span className="symptoms-text">{appointment.symptoms}</span>
                      </div>
                    )}

                    {appointment.notes && (
                      <div className="notes">
                        <span className="label">Notes:</span>
                        <span className="notes-text">{appointment.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="appointment-footer">
                    {activeTab === 'upcoming' ? (
                      <>
                        {appointment.status === 'confirmed' && (
                          <>
                            <button 
                              className="btn-outline"
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </button>
                            <button 
                              className="btn-danger"
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Cancel Appointment
                            </button>
                            <button className="btn-primary">
                              Join Consultation
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'pending' && (
                          <>
                            <button className="btn-outline">
                              View Details
                            </button>
                            <button className="btn-primary">
                              Confirm Appointment
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <button className="btn-outline">
                          View Details
                        </button>
                        {appointment.prescription && (
                          <button 
                            className="btn-secondary"
                            onClick={() => handleDownloadPrescription(appointment.prescription!)}
                          >
                            <FaDownload />
                            <span>Download Prescription</span>
                          </button>
                        )}
                        <button className="btn-outline">
                          Book Follow-up
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;