import React, { useState } from 'react';
import { theme } from '../theme';
import { PlusCircleIcon, PlayIcon, StopIcon } from './icons/index.jsx';
import Button from './ui/Button';

const FloatingActions = ({ 
  onAddScenario, 
  onRunAll, 
  onCancelAll, 
  hasRunningScenarios, 
  darkMode 
}) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);
  const containerStyles = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    display: 'flex',
    gap: theme.spacing.md,
    zIndex: theme.zIndex.modal
  };

  const getButtonTransform = (buttonName) => {
    if (pressedButton === buttonName) return 'scale(0.95)';
    if (hoveredButton === buttonName) return 'translateY(-3px) scale(1.05)';
    return 'translateY(0)';
  };

  const addButtonStyles = {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.pill,
    border: 'none',
    background: pressedButton === 'add' 
      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
      : theme.gradients.success,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    boxShadow: hoveredButton === 'add' 
      ? '0 8px 35px rgba(16, 185, 129, 0.5)'
      : '0 4px 20px rgba(16, 185, 129, 0.3)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans,
    transform: getButtonTransform('add')
  };

  const actionButtonStyles = {
    padding: `${theme.spacing.lg} ${theme.spacing['3xl']}`,
    borderRadius: theme.borderRadius.pill,
    border: 'none',
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans
  };

  const runAllButtonStyles = {
    ...actionButtonStyles,
    background: pressedButton === 'runAll'
      ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
      : theme.gradients.primary,
    boxShadow: hoveredButton === 'runAll'
      ? '0 8px 35px rgba(99, 102, 241, 0.5)'
      : '0 4px 20px rgba(99, 102, 241, 0.3)',
    transform: getButtonTransform('runAll')
  };

  const cancelAllButtonStyles = {
    ...actionButtonStyles,
    background: pressedButton === 'cancelAll'
      ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
      : theme.gradients.error,
    boxShadow: hoveredButton === 'cancelAll'
      ? '0 8px 35px rgba(239, 68, 68, 0.5)'
      : theme.shadows.colored.error,
    transform: getButtonTransform('cancelAll')
  };

  return (
    <div style={containerStyles}>
      <button 
        onClick={onAddScenario} 
        style={addButtonStyles}
        onMouseEnter={() => setHoveredButton('add')}
        onMouseLeave={() => {
          setHoveredButton(null);
          setPressedButton(null);
        }}
        onMouseDown={() => setPressedButton('add')}
        onMouseUp={() => setPressedButton(null)}
      >
        <PlusCircleIcon size={28} />
        <span>Add</span>
      </button>
      
      {hasRunningScenarios ? (
        <button 
          onClick={onCancelAll} 
          style={cancelAllButtonStyles}
          onMouseEnter={() => setHoveredButton('cancelAll')}
          onMouseLeave={() => {
            setHoveredButton(null);
            setPressedButton(null);
          }}
          onMouseDown={() => setPressedButton('cancelAll')}
          onMouseUp={() => setPressedButton(null)}
        >
          <StopIcon size={18} />
          Cancel All
        </button>
      ) : (
        <button 
          onClick={onRunAll} 
          style={runAllButtonStyles}
          onMouseEnter={() => setHoveredButton('runAll')}
          onMouseLeave={() => {
            setHoveredButton(null);
            setPressedButton(null);
          }}
          onMouseDown={() => setPressedButton('runAll')}
          onMouseUp={() => setPressedButton(null)}
        >
          <PlayIcon size={18} />
          Run All
        </button>
      )}
    </div>
  );
};

export default FloatingActions;