// src/components/Layout/Layout.tsx
import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaPlus,
  FaChevronDown,
  FaHeartbeat,
  FaBrain,
  FaUserMd,
  FaBaby,
  FaBone,
  FaStethoscope,
  FaFileMedical,
  FaFlask,
  FaUserFriends,
  FaClock,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaCalendarAlt,
  FaCommentDots,
  FaHistory,
  FaCog,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";
import { getDisplayName } from "../../utils/nameUtils";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

interface Notification {
  id: number;
  type: "appointment" | "message" | "reminder" | "prescription";
  message: string;
  time: string;
  unread: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { startLoading } = useLoading();

  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSpecialistsDropdown, setShowSpecialistsDropdown] = React.useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = React.useState(false);
  
  // Mobile states
  const [showMobileSidebar, setShowMobileSidebar] = React.useState(false);
  const [showMobileSpecialists, setShowMobileSpecialists] = React.useState(false);
  const [showMobileServices, setShowMobileServices] = React.useState(false);

  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      type: "appointment",
      message: "Your appointment with Dr. Smith is confirmed for tomorrow at 10:00 AM",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      message: "Dr. Johnson sent you a new message",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "reminder",
      message: "Don't forget to take your medication",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 4,
      type: "prescription",
      message: "Your prescription is ready for download",
      time: "2 days ago",
      unread: false,
    },
  ]);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const specialistsTriggerRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLDivElement>(null);
  const specialistsDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Navigation with loading
  const navigateWithLoading = (path: string) => {
    startLoading();
    setShowMobileSidebar(false); // Close sidebar on navigation
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileSidebar(false);
    navigateWithLoading("/");
  };

  const handleLogin = () => {
    navigateWithLoading("/auth");
  };

  const handleRegister = () => {
    navigateWithLoading("/auth");
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, unread: false })),
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const displayName = getDisplayName(user);

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }

      if (
        showSpecialistsDropdown &&
        specialistsTriggerRef.current &&
        specialistsDropdownRef.current &&
        !specialistsTriggerRef.current.contains(event.target as Node) &&
        !specialistsDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSpecialistsDropdown(false);
      }

      if (
        showServicesDropdown &&
        servicesTriggerRef.current &&
        servicesDropdownRef.current &&
        !servicesTriggerRef.current.contains(event.target as Node) &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setShowServicesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSpecialistsDropdown, showServicesDropdown]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileSidebar]);

  const specialties = [
    { icon: <FaHeartbeat />, name: "Cardiology", desc: "Heart and cardiovascular care", color: "#FF5722" },
    { icon: <FaBrain />, name: "Neurology", desc: "Brain and nervous system disorders", color: "#4CAF50" },
    { icon: <FaUserMd />, name: "Primary Care", desc: "General health and wellness", color: "#2196F3" },
    { icon: <FaBaby />, name: "Pediatrics", desc: "Child healthcare and development", color: "#FF9800" },
    { icon: <FaBone />, name: "Orthopedics", desc: "Bones, joints, and muscles", color: "#9C27B0" },
    { icon: <FaStethoscope />, name: "Dermatology", desc: "Skin, hair, and nail care", color: "#00BCD4" },
  ];

  const services = [
    { icon: <FaFileMedical />, name: "Online Consultation", desc: "Virtual doctor visits" },
    { icon: <FaFlask />, name: "Lab Tests", desc: "Comprehensive diagnostics" },
    { icon: <FaUserFriends />, name: "Health Checkups", desc: "Preventive screenings" },
    { icon: <FaClock />, name: "Emergency Care", desc: "24/7 urgent care" },
  ];

  const isLinkActive = (path: string) => location.pathname === path;
  const shouldShowFullNavbar = !["/", "/auth"].includes(location.pathname);

  if (!shouldShowFullNavbar) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="layout">
      {/* Desktop Navbar */}
      <nav className="navbar desktop-navbar">
        <div className="container">
          <div className="nav-content">
            <div onClick={() => navigateWithLoading("/home")} className="logo">
              <div className="logo-icon">
                <FaPlus size={20} color="white" />
              </div>
              <span className="logo-text">HealthCare</span>
            </div>

            <div className="desktop-menu">
              <a
                href="/home"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithLoading("/home");
                }}
                className={`nav-link ${isLinkActive("/home") ? "active" : ""}`}
              >
                Home
              </a>

              <div
                className="dropdown-trigger"
                ref={specialistsTriggerRef}
                onMouseEnter={() => setShowSpecialistsDropdown(true)}
                onMouseLeave={() => setShowSpecialistsDropdown(false)}
              >
                <a
                  href="/specialists"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithLoading("/specialists");
                  }}
                  className={`nav-link ${isLinkActive("/specialists") ? "active" : ""}`}
                >
                  Specialists
                  <FaChevronDown size={12} className={`chevron ${showSpecialistsDropdown ? "rotated" : ""}`} />
                </a>

                <div
                  className={`mega-dropdown ${showSpecialistsDropdown ? "show" : ""}`}
                  ref={specialistsDropdownRef}
                  onMouseEnter={() => setShowSpecialistsDropdown(true)}
                  onMouseLeave={() => setShowSpecialistsDropdown(false)}
                >
                  <div className="dropdown-content">
                    <div className="dropdown-section">
                      <h3>Medical Specialties</h3>
                      <div className="specialties-grid">
                        {specialties.map((spec, index) => (
                          <a
                            key={index}
                            href={`/specialists?specialty=${spec.name.toLowerCase()}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigateWithLoading(`/specialists?specialty=${spec.name.toLowerCase()}`);
                            }}
                            className="specialty-item"
                          >
                            <div className="specialty-icon" style={{ backgroundColor: `${spec.color}15`, color: spec.color }}>
                              {spec.icon}
                            </div>
                            <div>
                              <h4>{spec.name}</h4>
                              <p>{spec.desc}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="dropdown-section">
                      <h3>Quick Actions</h3>
                      <div className="quick-actions">
                        <button onClick={() => navigateWithLoading("/specialists")} className="dropdown-btn primary">
                          Find a Doctor
                        </button>
                        <button onClick={() => navigateWithLoading("/appointments")} className="dropdown-btn secondary">
                          My Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="dropdown-trigger"
                ref={servicesTriggerRef}
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithLoading("/services");
                  }}
                  className={`nav-link ${isLinkActive("/services") ? "active" : ""}`}
                >
                  Services
                  <FaChevronDown size={12} className={`chevron ${showServicesDropdown ? "rotated" : ""}`} />
                </a>

                <div
                  className={`mega-dropdown ${showServicesDropdown ? "show" : ""}`}
                  ref={servicesDropdownRef}
                  onMouseEnter={() => setShowServicesDropdown(true)}
                  onMouseLeave={() => setShowServicesDropdown(false)}
                >
                  <div className="dropdown-content">
                    <div className="dropdown-section full-width">
                      <h3>Our Services</h3>
                      <div className="services-grid">
                        {services.map((service, index) => (
                          <a
                            key={index}
                            href="/services"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateWithLoading("/services");
                            }}
                            className="service-item"
                          >
                            <div className="service-icon">{service.icon}</div>
                            <h4>{service.name}</h4>
                            <p>{service.desc}</p>
                            <span className="learn-more">Learn more →</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithLoading("/about");
                }}
                className={`nav-link ${isLinkActive("/about") ? "active" : ""}`}
              >
                About
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithLoading("/contact");
                }}
                className={`nav-link ${isLinkActive("/contact") ? "active" : ""}`}
              >
                Contact
              </a>
            </div>

            <div className="nav-actions">
              {isAuthenticated ? (
                <>
                  <div className="notifications-wrapper" ref={notificationsRef}>
                    <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
                      <FaBell size={20} />
                      {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
                    </button>

                    {showNotifications && (
                      <div className="notifications-dropdown">
                        <div className="notifications-header">
                          <h4>Notifications</h4>
                          {unreadCount > 0 && (
                            <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
                              Mark all as read
                            </button>
                          )}
                        </div>
                        <div className="notifications-list">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`notification-item ${notification.unread ? "unread" : ""}`}
                                onClick={() => markNotificationAsRead(notification.id)}
                              >
                                <div className={`notification-type-icon ${notification.type}`}>
                                  {notification.type === "appointment" && <FaCalendarAlt size={14} />}
                                  {notification.type === "message" && <FaCommentDots size={14} />}
                                  {notification.type === "reminder" && <FaBell size={14} />}
                                  {notification.type === "prescription" && <FaFileMedical size={14} />}
                                </div>
                                <div className="notification-content">
                                  <p className="notification-message">{notification.message}</p>
                                  <span className="notification-time">{notification.time}</span>
                                </div>
                                {notification.unread && <div className="unread-dot"></div>}
                              </div>
                            ))
                          ) : (
                            <div className="no-notifications">
                              <FaBell size={32} color="var(--text-light)" />
                              <p>No new notifications</p>
                            </div>
                          )}
                        </div>
                        {notifications.length > 0 && (
                          <div className="notifications-footer">
                            <a
                              href="/notifications"
                              onClick={(e) => {
                                e.preventDefault();
                                navigateWithLoading("/notifications");
                                setShowNotifications(false);
                              }}
                            >
                              View All Notifications
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="user-menu-wrapper" ref={userMenuRef}>
                    <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                      {user?.avatar ? (
                        <img src={user.avatar} alt={displayName} className="user-avatar-small" />
                      ) : (
                        <div className="user-avatar-small">
                          <FaUserCircle size={20} color="var(--text-dark)" />
                        </div>
                      )}
                      <span className="user-name">{displayName}</span>
                      <FaChevronDown size={12} className={`chevron ${showUserMenu ? "rotated" : ""}`} />
                    </button>

                    {showUserMenu && (
                      <div className="user-dropdown">
                        <div className="user-info">
                          {user?.avatar ? (
                            <img src={user.avatar} alt={displayName} className="user-avatar-large" />
                          ) : (
                            <div className="user-avatar-large">
                              <FaUserCircle size={48} color="var(--primary-orange)" />
                            </div>
                          )}
                          <div>
                            <h4>{displayName}</h4>
                            <p>{user?.email || "user@example.com"}</p>
                          </div>
                        </div>
                        <div className="user-menu-items">
                          <a
                            href="/profile"
                            className="user-menu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateWithLoading("/profile");
                              setShowUserMenu(false);
                            }}
                          >
                            <FaUserCircle />
                            <span>My Profile</span>
                          </a>
                          <a
                            href="/appointments"
                            className="user-menu-item"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateWithLoading("/appointments");
                              setShowUserMenu(false);
                            }}
                          >
                            <FaCalendarAlt />
                            <span>Appointments</span>
                          </a>
                          <div className="user-menu-item disabled">
                            <FaCommentDots />
                            <span>Messages</span>
                            <span className="badge">3</span>
                          </div>
                          <div className="user-menu-item disabled">
                            <FaHistory />
                            <span>Medical History</span>
                          </div>
                          <div className="divider" />
                          <div className="user-menu-item disabled">
                            <FaCog />
                            <span>Settings</span>
                          </div>
                          <button className="user-menu-item logout" onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button className="btn-text" onClick={handleLogin}>
                    Sign In
                  </button>
                  <button className="btn-primary-nav" onClick={handleRegister}>
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      <nav className="mobile-top-navbar">
        <button className="mobile-menu-btn" onClick={() => setShowMobileSidebar(true)}>
          <FaBars size={20} />
        </button>
        
        <div className="mobile-logo" onClick={() => navigateWithLoading("/home")}>
          <div className="logo-icon">
            <FaPlus size={18} color="white" />
          </div>
          <span className="logo-text">HealthCare</span>
        </div>

        <div className="mobile-right-actions">
          <button className="mobile-notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
          </button>

          <button className="mobile-profile-btn" onClick={() => navigateWithLoading("/profile")}>
            {user?.avatar ? (
              <img src={user.avatar} alt={displayName} className="user-avatar-small" />
            ) : (
              <FaUserCircle size={24} color="var(--primary-orange)" />
            )}
          </button>
        </div>
        
        {/* Mobile Notifications Dropdown */}
        {showNotifications && (
          <div className="mobile-notifications-dropdown">
            <div className="notifications-header">
              <h4>Notifications</h4>
              {unreadCount > 0 && (
                <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
                  Mark all as read
                </button>
              )}
            </div>
            <div className="notifications-list">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.unread ? "unread" : ""}`}
                    onClick={() => {
                      markNotificationAsRead(notification.id);
                      setShowNotifications(false);
                    }}
                  >
                    <div className={`notification-type-icon ${notification.type}`}>
                      {notification.type === "appointment" && <FaCalendarAlt size={14} />}
                      {notification.type === "message" && <FaCommentDots size={14} />}
                      {notification.type === "reminder" && <FaBell size={14} />}
                      {notification.type === "prescription" && <FaFileMedical size={14} />}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {notification.unread && <div className="unread-dot"></div>}
                  </div>
                ))
              ) : (
                <div className="no-notifications">
                  <FaBell size={32} color="var(--text-light)" />
                  <p>No new notifications</p>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${showMobileSidebar ? "show" : ""}`} onClick={() => setShowMobileSidebar(false)} />
      
      <div className={`mobile-sidebar ${showMobileSidebar ? "show" : ""}`}>
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-user">
            {user?.avatar ? (
              <img src={user.avatar} alt={displayName} className="sidebar-avatar" />
            ) : (
              <div className="sidebar-avatar">
                <FaUserCircle size={48} color="var(--primary-orange)" />
              </div>
            )}
            <div className="sidebar-user-info">
              <h4>{displayName}</h4>
              <p>{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setShowMobileSidebar(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mobile-sidebar-menu">
          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              navigateWithLoading("/home");
            }}
            className={`sidebar-link ${isLinkActive("/home") ? "active" : ""}`}
          >
            <FaHome /> Home
          </a>

          {/* Specialists Dropdown */}
          <div className="sidebar-dropdown">
            <button
              className={`sidebar-link ${isLinkActive("/specialists") ? "active" : ""}`}
              onClick={() => setShowMobileSpecialists(!showMobileSpecialists)}
            >
              <FaUserMd /> Specialists
              <FaChevronDown className={`dropdown-arrow ${showMobileSpecialists ? "rotated" : ""}`} />
            </button>
            
            {showMobileSpecialists && (
              <div className="sidebar-submenu">
                {specialties.map((spec, index) => (
                  <a
                    key={index}
                    href={`/specialists?specialty=${spec.name.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithLoading(`/specialists?specialty=${spec.name.toLowerCase()}`);
                    }}
                    className="sidebar-sublink"
                  >
                    <span style={{ color: spec.color }}>{spec.icon}</span>
                    {spec.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div className="sidebar-dropdown">
            <button
              className={`sidebar-link ${isLinkActive("/services") ? "active" : ""}`}
              onClick={() => setShowMobileServices(!showMobileServices)}
            >
              <FaStethoscope /> Services
              <FaChevronDown className={`dropdown-arrow ${showMobileServices ? "rotated" : ""}`} />
            </button>
            
            {showMobileServices && (
              <div className="sidebar-submenu">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithLoading("/services");
                    }}
                    className="sidebar-sublink"
                  >
                    {service.icon}
                    {service.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-divider" />

          <button className="sidebar-link logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <main className="main-content">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <button
          className={`nav-item ${isLinkActive("/home") ? "active" : ""}`}
          onClick={() => navigateWithLoading("/home")}
        >
          <FaHome size={20} />
        </button>
        <button
          className={`nav-item ${isLinkActive("/appointments") ? "active" : ""}`}
          onClick={() => navigateWithLoading("/appointments")}
        >
          <FaCalendarAlt size={20} />
        </button>
        <button
          className="nav-item center-btn"
          onClick={() => navigateWithLoading("/specialists")}
        >
          <div className="center-icon">
            <FaUserMd size={28} />
          </div>
        </button>
        <button
          className={`nav-item ${isLinkActive("/contact") ? "active" : ""}`}
          onClick={() => navigateWithLoading("/contact")}
        >
          <FaCommentDots size={20} />
        </button>
        <button
          className={`nav-item ${isLinkActive("/services") ? "active" : ""}`}
          onClick={() => navigateWithLoading("/services")}
        >
          <FaStethoscope size={20} />
        </button>
      </nav>
    </div>
  );
};

export default Layout;