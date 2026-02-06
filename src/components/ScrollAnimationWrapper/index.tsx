import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ScrollAnimationWrapper.css';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'zoom-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerOnce?: boolean;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = '',
  style = {},
  triggerOnce = true,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold, 
    triggerOnce 
  });

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
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
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        };
      
      case 'zoom-in':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        };
      
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-animation-wrapper ${className}`}
      style={{
        ...getAnimationStyles(),
        ...style,
        willChange: 'transform, opacity',
      }}
      data-animation={animation}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
};

// Batch animation wrapper for multiple items
interface ScrollAnimationBatchProps {
  children: React.ReactNode[];
  animation?: ScrollAnimationWrapperProps['animation'];
  stagger?: number;
  threshold?: number;
  className?: string;
}

export const ScrollAnimationBatch: React.FC<ScrollAnimationBatchProps> = ({
  children,
  animation = 'fade-in-up',
  stagger = 0.1,
  threshold = 0.1,
  className = '',
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <ScrollAnimationWrapper
          key={index}
          animation={animation}
          delay={index * stagger}
          threshold={threshold}
          className={className}
        >
          {child}
        </ScrollAnimationWrapper>
      ))}
    </>
  );
};