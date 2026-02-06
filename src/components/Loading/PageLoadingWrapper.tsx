// src/components/Loading/PageLoadingWrapper.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

interface PageLoadingWrapperProps {
  children: React.ReactNode;
}

const PageLoadingWrapper: React.FC<PageLoadingWrapperProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true);
    setFadingOut(false);

    // Simulate content load time
    const loadTimer = setTimeout(() => {
      setFadingOut(true);
      
      // Remove spinner after fade out animation
      const fadeTimer = setTimeout(() => {
        setIsLoading(false);
        setFadingOut(false);
      }, 300);

      return () => clearTimeout(fadeTimer);
    }, 500); // Show spinner for 500ms minimum

    return () => clearTimeout(loadTimer);
  }, [location.pathname]); // Only trigger on route change

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingSpinner 
        message="Loading..."
        fullScreen={true}
        fadingOut={fadingOut}
      />
      {/* Render children in background so they're ready */}
      <div style={{ display: fadingOut ? 'block' : 'none' }}>
        {children}
      </div>
    </>
  );
};

export default PageLoadingWrapper;