import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaCamera, FaHistory, FaFileMedical, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { ScrollAnimationWrapper } from '../../components/ScrollAnimationWrapper';
import './ProfilePage.css';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  emergencyContact: string;
  insuranceProvider: string;
  insuranceNumber: string;
  avatar: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Tiz Code',
    email: 'tiz@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    bloodType: 'O+',
    emergencyContact: '+1 (555) 987-6543',
    insuranceProvider: 'HealthCare Plus',
    insuranceNumber: 'HC-789456123',
    avatar: ''
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    console.log('Profile saved:', editedProfile);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const medicalHistory = [
    { id: 1, date: '2024-01-15', doctor: 'Dr. Sarah Johnson', diagnosis: 'Annual Checkup', status: 'Completed' },
    { id: 2, date: '2023-11-20', doctor: 'Dr. Michael Chen', diagnosis: 'Flu Vaccination', status: 'Completed' },
    { id: 3, date: '2023-08-10', doctor: 'Dr. Emily Davis', diagnosis: 'Dermatology Consultation', status: 'Completed' },
    { id: 4, date: '2024-02-01', doctor: 'Dr. Robert Wilson', diagnosis: 'Cardiology Follow-up', status: 'Scheduled' },
  ];

  const upcomingAppointments = [
    { id: 1, date: '2024-02-15', time: '10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Video Consultation', status: 'Confirmed' },
    { id: 2, date: '2024-02-20', time: '2:30 PM', doctor: 'Dr. Michael Chen', type: 'In-person Visit', status: 'Confirmed' },
  ];

  return (
    <div className="profile-page">
      <div className="container">
        <ScrollAnimationWrapper animation="fade-in-up" duration={0.5}>
          <div className="profile-header">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your personal information and medical history</p>
            
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleSave}>
                    <FaSave />
                    Save Changes
                  </button>
                </>
              ) : (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </ScrollAnimationWrapper>

        <div className="profile-content">
          {/* Left Column - Profile Overview */}
          <ScrollAnimationWrapper animation="slide-in-left" delay={0.2} threshold={0.2}>
            <div className="profile-sidebar">
              <div className="profile-card">
                <div className="avatar-section">
                  <div className="avatar-container">
                    {isEditing ? (
                      <>
                        {editedProfile.avatar ? (
                          <img src={editedProfile.avatar} alt={editedProfile.name} className="avatar-image" />
                        ) : (
                          <div className="avatar-placeholder">
                            <FaUser className="placeholder-icon" />
                          </div>
                        )}
                        <label className="avatar-upload">
                          <FaCamera />
                          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                        </label>
                      </>
                    ) : (
                      <>
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name} className="avatar-image" />
                        ) : (
                          <div className="avatar-placeholder">
                            <FaUser className="placeholder-icon" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <h2 className="user-name">{isEditing ? editedProfile.name : profile.name}</h2>
                  <p className="user-email">{profile.email}</p>
                  <div className="member-since">
                    <FaCalendarAlt />
                    <span>Member since 2023</span>
                  </div>
                  
                  {!isEditing && (
                    <button 
                      className="avatar-upload-btn" 
                      onClick={() => setIsEditing(true)}
                    >
                      <FaCamera />
                      Update Photo
                    </button>
                  )}
                </div>

                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaHistory />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">12</span>
                      <span className="stat-label">Appointments</span>
                    </div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaFileMedical />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">8</span>
                      <span className="stat-label">Prescriptions</span>
                    </div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaCreditCard />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">4</span>
                      <span className="stat-label">Medical Records</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="navigation-menu">
                <button 
                  className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  <FaUser />
                  <span>Personal Info</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'medical' ? 'active' : ''}`}
                  onClick={() => setActiveTab('medical')}
                >
                  <FaFileMedical />
                  <span>Medical History</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <FaHistory />
                  <span>Appointments</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'insurance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('insurance')}
                >
                  <FaCreditCard />
                  <span>Insurance</span>
                </button>
                <button 
                  className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaShieldAlt />
                  <span>Security</span>
                </button>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right Column - Tab Content */}
          <ScrollAnimationWrapper animation="slide-in-right" delay={0.3} threshold={0.2}>
            <div className="profile-main">
              {activeTab === 'personal' && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3 className="tab-title">Personal Information</h3>
                    <p className="tab-description">Update your personal details and contact information</p>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <FaUser />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="form-value">{profile.name}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaEnvelope />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="form-value">{profile.email}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaPhone />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedProfile.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="form-value">{profile.phone}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <FaMapMarkerAlt />
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editedProfile.address}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                        />
                      ) : (
                        <div className="form-value">{profile.address}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editedProfile.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="form-value">{profile.dateOfBirth}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={editedProfile.gender}
                          onChange={handleInputChange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      ) : (
                        <div className="form-value">{profile.gender}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Blood Type</label>
                      {isEditing ? (
                        <select
                          name="bloodType"
                          value={editedProfile.bloodType}
                          onChange={handleInputChange}
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      ) : (
                        <div className="form-value">{profile.bloodType}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Emergency Contact</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="emergencyContact"
                          value={editedProfile.emergencyContact}
                          onChange={handleInputChange}
                          placeholder="Emergency contact number"
                        />
                      ) : (
                        <div className="form-value">{profile.emergencyContact}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3 className="tab-title">Medical History</h3>
                    <p className="tab-description">View your medical records and history</p>
                  </div>
                  <div className="medical-history">
                    <div className="history-header">
                      <div>
                        <h4>Recent Medical Records</h4>
                        <p className="history-subtitle">Last updated: Today</p>
                      </div>
                    </div>
                    
                    <div className="history-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Doctor</th>
                            <th>Diagnosis</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicalHistory.map(record => (
                            <tr key={record.id}>
                              <td className="date-cell">{record.date}</td>
                              <td className="doctor-cell">{record.doctor}</td>
                              <td className="diagnosis-cell">{record.diagnosis}</td>
                              <td>
                                <span className={`status-badge ${record.status.toLowerCase()}`}>
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3 className="tab-title">My Appointments</h3>
                    <p className="tab-description">View your upcoming appointments</p>
                  </div>
                  
                  <div className="appointments-section">
                    <div className="upcoming-appointments">
                      <h4>Upcoming Appointments</h4>
                      {upcomingAppointments.map(appointment => (
                        <div key={appointment.id} className="appointment-card">
                          <div className="appointment-info">
                            <div className="appointment-date">
                              <FaCalendarAlt />
                              <div>
                                <span className="date">{appointment.date}</span>
                                <span className="time">{appointment.time}</span>
                              </div>
                            </div>
                            <div className="appointment-details">
                              <h5>{appointment.doctor}</h5>
                              <p className="appointment-type">{appointment.type}</p>
                            </div>
                            <div className="appointment-actions">
                              <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'insurance' && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3 className="tab-title">Insurance Information</h3>
                    <p className="tab-description">View your insurance details</p>
                  </div>
                  <div className="insurance-info">
                    <div className="insurance-card">
                      <div className="insurance-header">
                        <div>
                          <h4>Primary Insurance</h4>
                          <p className="insurance-subtitle">Active Coverage</p>
                        </div>
                        <span className="badge primary">Active</span>
                      </div>
                      
                      <div className="insurance-details">
                        <div className="detail-item">
                          <span className="label">Provider</span>
                          <span className="value">{profile.insuranceProvider}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Policy Number</span>
                          <span className="value">{profile.insuranceNumber}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Coverage Type</span>
                          <span className="value">Comprehensive</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Valid Until</span>
                          <span className="value">December 31, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="tab-content">
                  <div className="tab-header">
                    <h3 className="tab-title">Security Settings</h3>
                    <p className="tab-description">View your account security settings</p>
                  </div>
                  <div className="security-settings">
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Change Password</h4>
                        <p>Update your password regularly to keep your account secure</p>
                      </div>
                    </div>
                    
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Login Activity</h4>
                        <p>Review your recent login history and locations</p>
                      </div>
                    </div>
                    
                    <div className="security-item">
                      <div className="security-info">
                        <h4>Connected Devices</h4>
                        <p>Manage devices logged into your account</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;