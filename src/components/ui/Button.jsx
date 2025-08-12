import React from 'react';
import { theme, getThemeStyles } from '../../theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  darkMode = false,
  ...props 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  
  const variantStyles = getVariantStyles(variant, darkMode, isHovered, isPressed, disabled || loading);
  
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontFamily: theme.typography.fontFamily.sans,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled || loading ? 0.5 : 1,
    ...variantStyles,
    ...getSizeStyles(size)
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      style={baseStyles}
      onClick={handleClick}
      className={className}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

const Spinner = () => (
  <div style={{
    width: '14px',
    height: '14px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }} />
);

const getVariantStyles = (variant, darkMode, isHovered, isPressed, isDisabled) => {
  const getTransform = () => {
    if (isDisabled) return 'none';
    if (isPressed) return 'scale(0.95)';
    if (isHovered) return 'translateY(-2px)';
    return 'none';
  };

  const variants = {
    primary: {
      background: isPressed 
        ? 'linear-gradient(135deg, #5a7be8 0%, #4a65d6 100%)'
        : theme.gradients.primary,
      color: theme.colors.white,
      boxShadow: isHovered && !isDisabled 
        ? '0 6px 30px rgba(102, 126, 234, 0.5)' 
        : theme.shadows.colored.primary,
      transform: getTransform()
    },
    secondary: {
      background: darkMode 
        ? (isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)')
        : (isHovered ? theme.colors.gray[100] : theme.colors.gray[50]),
      border: darkMode ? 'none' : `1px solid ${theme.colors.gray[200]}`,
      color: darkMode ? theme.colors.white : theme.colors.gray[700],
      backdropFilter: darkMode ? 'blur(10px)' : 'none',
      boxShadow: isHovered && !isDisabled 
        ? (darkMode ? theme.shadows.md : '0 2px 8px rgba(0, 0, 0, 0.08)') 
        : 'none',
      transform: getTransform()
    },
    purple: {
      background: isPressed
        ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
        : theme.gradients.purple,
      color: theme.colors.white,
      boxShadow: isHovered && !isDisabled 
        ? '0 6px 30px rgba(139, 92, 246, 0.4)' 
        : theme.shadows.colored.purple,
      transform: getTransform()
    },
    error: {
      background: isPressed
        ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
        : theme.gradients.error,
      color: theme.colors.white,
      boxShadow: isHovered && !isDisabled 
        ? '0 6px 30px rgba(239, 68, 68, 0.4)' 
        : theme.shadows.colored.error,
      transform: getTransform()
    },
    ghost: {
      background: darkMode 
        ? (isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)')
        : (isHovered ? 'rgba(103, 126, 234, 0.2)' : 'rgba(103, 126, 234, 0.1)'),
      color: darkMode ? theme.colors.white : theme.colors.primary[500],
      transform: isPressed ? 'scale(0.95)' : (isHovered ? 'scale(1.05)' : 'none')
    },
    danger: {
      background: darkMode 
        ? (isHovered ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.15)')
        : (isHovered ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'),
      color: theme.colors.error[500],
      transform: isPressed ? 'scale(0.95)' : (isHovered ? 'scale(1.05)' : 'none'),
      boxShadow: isHovered && !isDisabled 
        ? '0 4px 20px rgba(239, 68, 68, 0.3)' 
        : 'none'
    }
  };
  
  return variants[variant] || variants.primary;
};

const getSizeStyles = (size) => {
  const sizes = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.sm
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
      fontSize: theme.typography.fontSize.md
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing['3xl']}`,
      fontSize: theme.typography.fontSize.lg
    },
    icon: {
      width: '44px',
      height: '44px',
      padding: '0'
    },
    iconSm: {
      width: '32px',
      height: '32px',
      padding: '0'
    },
    iconXs: {
      width: '28px',
      height: '28px',
      padding: '0'
    }
  };
  
  return sizes[size] || sizes.md;
};

export default Button;