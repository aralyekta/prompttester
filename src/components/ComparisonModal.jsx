import React, { useEffect } from 'react';
import { theme, getThemeStyles } from '../theme';
import { XIcon } from './icons/index.jsx';
import Button from './ui/Button';
import { isGpt5Model } from '../utils/models';

const ComparisonModal = ({ scenarios, onClose, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  useEffect(() => {
    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  if (!scenarios || scenarios.length < 2) return null;

  const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: theme.spacing.xl,
    animation: 'fadeIn 0.2s ease'
  };

  const modalContentStyles = {
    background: darkMode 
      ? '#1a1a1a'
      : '#ffffff',
    borderRadius: theme.borderRadius.xl,
    maxWidth: '1400px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
  };

  const modalHeaderStyles = {
    padding: theme.spacing['2xl'],
    borderBottom: `1px solid ${themeStyles.border.default}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const modalTitleStyles = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: themeStyles.text.primary,
    margin: 0,
    fontFamily: theme.typography.fontFamily.sans
  };

  const modalBodyStyles = {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing['2xl'],
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.xl
  };

  const comparisonColumnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg
  };

  const scenarioHeaderStyles = {
    padding: theme.spacing.lg,
    background: darkMode
      ? 'rgba(139, 92, 246, 0.1)'
      : 'rgba(139, 92, 246, 0.05)',
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}`
  };

  const scenarioTitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.primary,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans
  };

  const scenarioMetaStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: themeStyles.text.secondary,
    fontFamily: theme.typography.fontFamily.sans
  };

  const responseBoxStyles = {
    flex: 1,
    padding: theme.spacing.xl,
    background: darkMode
      ? 'rgba(0, 0, 0, 0.3)'
      : theme.colors.white,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${themeStyles.border.default}`,
    overflow: 'auto'
  };

  const responseTextStyles = {
    fontSize: theme.typography.fontSize.md,
    lineHeight: '1.6',
    color: themeStyles.text.primary,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: theme.typography.fontFamily.mono
  };

  const dividerStyles = {
    position: 'absolute',
    left: '50%',
    top: theme.spacing['2xl'],
    bottom: theme.spacing['2xl'],
    width: '1px',
    background: themeStyles.border.default,
    transform: 'translateX(-50%)'
  };

  return (
    <div style={modalOverlayStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyles}>
          <h2 style={modalTitleStyles}>Compare Responses</h2>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onClose}
            darkMode={darkMode}
          >
            <XIcon size={20} />
          </Button>
        </div>

        <div style={modalBodyStyles}>
          {scenarios.slice(0, 2).map((scenario, index) => {
            const temperatureAllowed = !isGpt5Model(scenario.model);
            return (
            <div key={scenario.id} style={comparisonColumnStyles}>
              <div style={scenarioHeaderStyles}>
                <div style={scenarioTitleStyles}>{scenario.description}</div>
                <div style={scenarioMetaStyles}>
                  Model: {scenario.model} {temperatureAllowed && `| Temperature: ${scenario.temperature}`}
                </div>
              </div>
              
              <div style={responseBoxStyles}>
                <div style={responseTextStyles}>
                  {scenario.response?.content || scenario.response?.choices?.[0]?.message?.content || 'No response'}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;