import React from 'react';
import { theme, getThemeStyles } from '../../theme';

const Card = ({ 
  children, 
  className = '',
  darkMode = false,
  hover = true,
  loading = false,
  ...props 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const baseStyles = {
    background: darkMode ? themeStyles.glass.background : theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing['3xl'],
    marginBottom: theme.spacing.xl,
    backdropFilter: darkMode ? themeStyles.glass.backdropFilter : 'none',
    border: darkMode ? themeStyles.glass.border : `1px solid ${theme.colors.gray[200]}`,
    boxShadow: darkMode ? theme.shadows.md : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: theme.transitions.default,
    ...(hover && {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: darkMode ? theme.shadows.lg : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        background: themeStyles.background.cardHover
      }
    }),
    ...(loading && {
      animation: 'pulse 2s infinite'
    })
  };

  return (
    <div
      style={baseStyles}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export const ConfigCard = ({ children, darkMode = false, ...props }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const styles = {
    padding: theme.spacing.xl,
    background: darkMode
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(103, 126, 234, 0.05)',
    borderRadius: theme.borderRadius.lg,
    border: darkMode
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(103, 126, 234, 0.1)'
  };

  return (
    <div style={styles} {...props}>
      {children}
    </div>
  );
};

export const MessageCard = ({ children, darkMode = false, ...props }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const styles = {
    padding: theme.spacing.xl,
    background: darkMode
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(103, 126, 234, 0.03)',
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    border: darkMode
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(103, 126, 234, 0.1)',
    transition: theme.transitions.default,
    '&:hover': {
      background: darkMode
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(103, 126, 234, 0.05)'
    }
  };

  return (
    <div style={styles} {...props}>
      {children}
    </div>
  );
};

export default Card;