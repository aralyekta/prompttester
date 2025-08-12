import React from 'react';
import { theme, getThemeStyles } from '../theme';
import Button from './ui/Button';

const LoadingBar = ({ onCancel, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const containerStyles = {
    position: 'relative',
    background: darkMode
      ? 'rgba(255, 193, 7, 0.1)'
      : 'rgba(255, 193, 7, 0.05)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    overflow: 'hidden'
  };

  const contentStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1
  };

  const textStyles = {
    color: darkMode ? theme.colors.warning[500] : '#f57c00',
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.sans
  };

  const progressStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ffc107, #ff9800)',
    animation: 'progress 2s ease-in-out infinite'
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <span style={textStyles}>Processing request...</span>
        <Button
          variant="danger"
          size="sm"
          onClick={onCancel}
          darkMode={darkMode}
        >
          Cancel
        </Button>
      </div>
      <div style={progressStyles}></div>
    </div>
  );
};

export default LoadingBar;