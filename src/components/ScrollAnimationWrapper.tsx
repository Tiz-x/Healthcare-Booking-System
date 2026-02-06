import React from 'react';
import { useScrollAnimation } from '../hooks/ScrollAnimationWrapper';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'zoom-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean; 
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  style = {},
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold, triggerOnce }); 

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}s ease`,
      transitionDelay: `${delay}s`,
    };

    switch (animation) {
      case 'fade-in':
        return {
          ...baseStyles,
        };
      
      case 'fade-in-up':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        };
      
      case 'fade-in-down':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
        };
      
      case 'slide-in-left':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        };
      
      case 'slide-in-right':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        };
      
      case 'scale-in':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        };
      
      case 'zoom-in':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        };
      
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...getAnimationStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};