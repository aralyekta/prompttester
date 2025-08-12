import React, { useState } from 'react';
import { theme } from '../theme';
import { SunIcon, MoonIcon } from './icons/index.jsx';

const Header = ({ darkMode, onToggleTheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const headerStyles = {
    maxWidth: '1200px',
    margin: '0 auto 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleSectionStyles = {
    color: darkMode ? theme.colors.white : theme.colors.gray[900]
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.extrabold,
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    textShadow: darkMode ? '2px 2px 4px rgba(0,0,0,0.2)' : 'none',
    fontFamily: theme.typography.fontFamily.sans,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    isolation: 'isolate',
    zIndex: 2
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.xl,
    opacity: darkMode ? 0.9 : 0.7,
    marginTop: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans,
    color: darkMode ? theme.colors.white : theme.colors.gray[600]
  };

  const getButtonTransform = () => {
    if (isPressed) return 'scale(0.9) rotate(180deg)';
    if (isHovered) return 'scale(1.1) rotate(15deg)';
    return 'scale(1) rotate(0deg)';
  };

  const themeToggleStyles = {
    width: '50px',
    height: '50px',
    borderRadius: theme.borderRadius.full,
    border: darkMode ? 'none' : `1px solid ${theme.colors.gray[200]}`,
    background: darkMode
      ? (isPressed ? 'rgba(255, 255, 255, 0.3)' : isHovered ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.2)')
      : (isPressed ? theme.colors.gray[100] : isHovered ? theme.colors.gray[50] : theme.colors.white),
    backdropFilter: darkMode ? 'blur(10px)' : 'none',
    color: darkMode ? theme.colors.white : theme.colors.gray[700],
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: getButtonTransform(),
    boxShadow: darkMode
      ? (isHovered ? '0 4px 20px rgba(255, 255, 255, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)')
      : (isHovered ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)')
  };

  return (
    <div style={headerStyles}>
      <div style={titleSectionStyles}>
        <h1 style={titleStyles}>
          PromptTester
        </h1>
        <p style={subtitleStyles}>Test, compare, and optimize your AI prompts. In minutes.</p>
      </div>
      <button 
        onClick={onToggleTheme} 
        style={themeToggleStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {darkMode ? <MoonIcon size={24} /> : <SunIcon size={24} />}
      </button>
    </div>
  );
};

export default Header;