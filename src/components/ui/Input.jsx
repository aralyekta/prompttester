import React from 'react';
import { theme, getThemeStyles } from '../../theme';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  error = false,
  className = '',
  darkMode = false,
  readOnly = false,
  ...props 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const baseStyles = {
    width: '100%',
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.sans,
    border: `2px solid ${error ? themeStyles.border.error : themeStyles.border.default}`,
    borderRadius: theme.borderRadius.md,
    background: themeStyles.background.input,
    color: themeStyles.text.primary,
    transition: theme.transitions.default,
    boxSizing: 'border-box',
    outline: 'none',
    cursor: readOnly ? 'not-allowed' : 'text',
    opacity: readOnly ? 0.8 : 1
  };

  const focusStyles = {
    borderColor: themeStyles.border.focus,
    background: themeStyles.background.inputFocus,
    boxShadow: `0 0 0 3px rgba(102, 126, 234, 0.1)`
  };

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const finalStyles = {
    ...baseStyles,
    ...(isFocused ? focusStyles : {})
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      readOnly={readOnly}
      style={finalStyles}
      className={className}
      {...props}
    />
  );
};

export const Textarea = ({ 
  placeholder = '',
  value = '',
  onChange,
  rows = 4,
  disabled = false,
  error = false,
  className = '',
  darkMode = false,
  ...props 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const baseStyles = {
    width: '100%',
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.mono,
    border: `2px solid ${error ? themeStyles.border.error : themeStyles.border.default}`,
    borderRadius: theme.borderRadius.md,
    background: themeStyles.background.input,
    color: themeStyles.text.primary,
    transition: theme.transitions.default,
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'vertical',
    '&:focus': {
      borderColor: themeStyles.border.focus,
      background: themeStyles.background.inputFocus
    },
    '&::placeholder': {
      color: themeStyles.text.muted
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      style={baseStyles}
      className={className}
      {...props}
    />
  );
};

export const Select = ({ 
  value = '',
  onChange,
  children,
  disabled = false,
  className = '',
  darkMode = false,
  ...props 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const baseStyles = {
    width: '100%',
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.sans,
    border: `2px solid ${themeStyles.border.default}`,
    borderRadius: theme.borderRadius.sm,
    background: themeStyles.background.input,
    color: themeStyles.text.primary,
    cursor: 'pointer',
    transition: theme.transitions.default,
    outline: 'none',
    '&:focus': {
      borderColor: themeStyles.border.focus
    }
  };

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={baseStyles}
      className={className}
      {...props}
    >
      {children}
    </select>
  );
};

export default Input;