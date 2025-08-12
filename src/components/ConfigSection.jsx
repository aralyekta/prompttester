import React from 'react';
import { theme, getThemeStyles } from '../theme';
import { RobotIcon, TemperatureIcon } from './icons/index.jsx';
import { Select } from './ui/Input';
import { ConfigCard } from './ui/Card';
import { AVAILABLE_MODELS, isGpt5Model } from '../utils/models';

const ConfigSection = ({ scenario, onUpdate, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const temperatureAllowed = !isGpt5Model(scenario.model);
  
  const sectionStyles = {
    display: 'grid',
    gridTemplateColumns: temperatureAllowed ? '1fr 1fr' : '1fr',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing['3xl']
  };

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.secondary,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: theme.typography.fontFamily.sans
  };

  const temperatureContainerStyles = {
    display: 'flex',
    gap: theme.spacing.md,
    alignItems: 'center'
  };

  const temperatureSliderStyles = {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    background: darkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(103, 126, 234, 0.2)',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none'
  };

  const temperatureNumberStyles = {
    width: '70px',
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    border: `2px solid ${themeStyles.border.default}`,
    borderRadius: theme.borderRadius.sm,
    background: themeStyles.background.input,
    color: themeStyles.text.primary,
    textAlign: 'center',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: theme.typography.fontFamily.sans
  };

  return (
    <div style={sectionStyles}>
      <ConfigCard darkMode={darkMode}>
        <label style={labelStyles}>
          <RobotIcon size={18} />
          Model
        </label>
        <Select
          value={scenario.model}
          onChange={(e) => onUpdate(scenario.id, 'model', e.target.value)}
          darkMode={darkMode}
        >
          {AVAILABLE_MODELS.map(model => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </Select>
      </ConfigCard>
      
      {temperatureAllowed && (
        <ConfigCard darkMode={darkMode}>
          <label style={labelStyles}>
            <TemperatureIcon size={18} />
            Temperature
          </label>
          <div style={temperatureContainerStyles}>
            <input
              type="range"
              value={scenario.temperature}
              onChange={(e) => onUpdate(scenario.id, 'temperature', e.target.value)}
              style={temperatureSliderStyles}
              min="0"
              max="2"
              step="0.1"
            />
            <input
              type="number"
              value={scenario.temperature}
              onChange={(e) => onUpdate(scenario.id, 'temperature', e.target.value)}
              style={temperatureNumberStyles}
              min="0"
              max="2"
              step="0.1"
            />
          </div>
        </ConfigCard>
      )}
    </div>
  );
};

export default ConfigSection;