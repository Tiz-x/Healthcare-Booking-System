// src/components/Loading/LoadingSpinner.tsx
import React, { useEffect, useState } from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  message?: string;
  color?: string;
  fadingOut?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = true,
  size = 'medium',
  message = 'Loading...',
  // color = '#FF5722',
  fadingOut = false,
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (fadingOut) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadingOut]);

  if (!visible) return null;

  const spinnerClass = `loading-spinner ${size} ${fullScreen ? 'full-screen' : 'inline'} ${fadingOut ? 'fade-out' : ''}`;

  return (
    <div className={spinnerClass}>
      <div className="spinner-container">
        <div className="spinner">
          <div className="inner-spin" />
        </div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;