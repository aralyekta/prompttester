import React from 'react';
import { theme, getThemeStyles } from '../theme';
import { LockIcon } from './icons/index.jsx';
import Input from './ui/Input';
import Card from './ui/Card';

const ApiKeySection = ({ apiKey, onApiKeyChange, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md
  };

  const lockIconStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  const labelStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.primary,
    fontFamily: theme.typography.fontFamily.sans
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto 30px'
  };

  return (
    <div style={containerStyles}>
      <Card darkMode={darkMode} hover={false}>
        <div style={headerStyles}>
          <span style={lockIconStyles}>
            <LockIcon size={20} color={themeStyles.text.primary} />
          </span>
          <label style={labelStyles}>OpenAI API Key</label>
        </div>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="sk-..."
          darkMode={darkMode}
        />
      </Card>
    </div>
  );
};

export default ApiKeySection;