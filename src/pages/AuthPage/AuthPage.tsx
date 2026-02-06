import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isSignUp) {
          // Call register function with name, email, and password
          await register(formData.name, formData.email, formData.password);
        } else {
          // Call login function with email and password
          await login(formData.email, formData.password);
        }
        
        // Navigate to home page after successful authentication
        navigate('/home');
      } catch (error) {
        console.error('Authentication error:', error);
        // You can set an error message here if needed
        setErrors({ ...errors, general: 'Authentication failed. Please try again.' });
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="auth-page-wrapper">
      {/* Back Button - Outside Card */}
      <button 
        className="auth-back-button" 
        onClick={() => navigate('/')}
        aria-label="Back to landing page"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header-section">
          <div className="auth-logo-circle">
            <FaHeart />
          </div>
          <h1 className="auth-title">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="auth-subtitle">
            {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
          </p>
        </div>

        {/* Form */}
        <form className="auth-form-container" onSubmit={handleSubmit}>
          {/* Name (Sign Up only) */}
          {isSignUp && (
            <div className="auth-input-group">
              <label htmlFor="name" className="auth-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`auth-input ${errors.name ? 'has-error' : ''}`}
                placeholder="Alen David"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="auth-error-message">{errors.name}</span>
              )}
            </div>
          )}

          {/* Email */}
          <div className="auth-input-group">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`auth-input ${errors.email ? 'has-error' : ''}`}
              placeholder="Alen@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="auth-error-message">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`auth-input auth-input-with-icon ${
                  errors.password ? 'has-error' : ''
                }`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="auth-eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="auth-error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password (Sign Up only) */}
          {isSignUp && (
            <div className="auth-input-group">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`auth-input auth-input-with-icon ${
                    errors.confirmPassword ? 'has-error' : ''
                  }`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <span className="auth-error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div className="auth-general-error">
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer-section">
          <p className="auth-footer-text">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="auth-toggle-button"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {isSignUp && (
            <p className="auth-terms-text">
              By signing up, you agree to our{' '}
              <a href="/terms" className="auth-terms-link">
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy" className="auth-terms-link">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;