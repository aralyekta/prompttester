import React, { useEffect } from 'react';
import { theme, getThemeStyles } from '../theme';
import { XIcon, AlertTriangleIcon, CheckIcon, InfoIcon } from './icons/index.jsx';

const Toast = ({ message, type = 'error', onClose, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: darkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
          border: darkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)',
          text: darkMode ? '#86efac' : '#16a34a',
          icon: '#22c55e'
        };
      case 'warning':
        return {
          bg: darkMode ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.1)',
          border: darkMode ? 'rgba(251, 191, 36, 0.3)' : 'rgba(251, 191, 36, 0.2)',
          text: darkMode ? '#fde047' : '#ca8a04',
          icon: '#fbbf24'
        };
      case 'info':
        return {
          bg: darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
          border: darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
          text: darkMode ? '#93c5fd' : '#2563eb',
          icon: '#3b82f6'
        };
      case 'error':
      default:
        return {
          bg: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
          border: darkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)',
          text: darkMode ? '#fca5a5' : '#dc2626',
          icon: '#ef4444'
        };
    }
  };
  
  const colors = getColors();
  
  const toastStyles = {
    position: 'fixed',
    bottom: '120px', // Above floating action buttons
    right: theme.spacing['2xl'],
    maxWidth: '400px',
    padding: theme.spacing.lg,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: darkMode 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    animation: 'slideInRight 0.3s ease-out',
    zIndex: 9999,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  };
  
  const iconContainerStyles = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  
  const contentStyles = {
    flex: 1,
    color: colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.sans,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: 1.5
  };
  
  const closeButtonStyles = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none'
  };
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon size={20} color={colors.icon} />;
      case 'warning':
        return <AlertTriangleIcon size={20} color={colors.icon} />;
      case 'info':
        return <InfoIcon size={20} color={colors.icon} />;
      case 'error':
      default:
        return <AlertTriangleIcon size={20} color={colors.icon} />;
    }
  };
  
  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={toastStyles}>
        <div style={iconContainerStyles}>
          {getIcon()}
        </div>
        <div style={contentStyles}>
          {message}
        </div>
        <button
          style={closeButtonStyles}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <XIcon size={16} color={colors.text} />
        </button>
      </div>
    </>
  );
};

export default Toast;