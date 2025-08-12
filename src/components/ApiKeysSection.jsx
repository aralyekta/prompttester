import React, { useState } from 'react';
import { theme, getThemeStyles } from '../theme';
import { LockIcon, ChevronDownIcon, ChevronRightIcon } from './icons/index.jsx';
import Input from './ui/Input';
import Card from './ui/Card';
import { PROVIDERS } from '../utils/providers';

const ApiKeysSection = ({ apiKeys, onApiKeyChange, requiredProviders, darkMode }) => {
  const themeStyles = getThemeStyles(darkMode);
  const [collapsedProviders, setCollapsedProviders] = useState({});
  
  // Get all providers to show which ones are not required
  const allProviders = ['openai', 'claude', 'gemini'].map(id => {
    const provider = PROVIDERS[id];
    const isRequired = requiredProviders?.some(p => p.id === id);
    return { ...provider, isRequired };
  });
  
  const toggleProvider = (providerId) => {
    setCollapsedProviders(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };
  
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto 30px'
  };
  
  const providerCardStyles = {
    marginBottom: theme.spacing.lg
  };
  
  const getHeaderStyles = (isCollapsed) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing.md,
    marginBottom: isCollapsed ? 0 : theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
    }
  });
  
  const headerLeftStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm
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
  
  const requiredBadgeStyles = {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: theme.borderRadius.sm,
    backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(220, 38, 38, 0.08)',
    color: darkMode ? '#f87171' : '#dc2626',
    fontWeight: theme.typography.fontWeight.medium,
    marginLeft: theme.spacing.sm,
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    border: darkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(220, 38, 38, 0.15)'
  };
  
  const chevronStyles = {
    display: 'flex',
    alignItems: 'center',
    color: themeStyles.text.secondary,
    transition: 'transform 0.2s'
  };
  
  const inputContainerStyles = {
    padding: `0 ${theme.spacing.md} ${theme.spacing.md}`,
    animation: 'fadeIn 0.2s ease-in-out'
  };
  
  const helperTextStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: themeStyles.text.secondary,
    marginTop: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans
  };
  
  const notRequiredStyles = {
    opacity: 0.5,
    position: 'relative'
  };
  
  const notRequiredBadgeStyles = {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: theme.borderRadius.sm,
    backgroundColor: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.06)',
    color: darkMode ? themeStyles.text.muted : themeStyles.text.secondary,
    fontWeight: theme.typography.fontWeight.normal,
    marginLeft: theme.spacing.sm,
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
    border: darkMode ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(148, 163, 184, 0.12)'
  };
  
  return (
    <div style={containerStyles}>
      {allProviders.map(provider => {
        const isCollapsed = collapsedProviders[provider.id];
        const hasKey = apiKeys[provider.id]?.trim();
        const isRequired = provider.isRequired;
        
        return (
          <Card 
            key={provider.id} 
            darkMode={darkMode} 
            hover={false}
            style={{
              ...providerCardStyles,
              ...(isRequired ? {} : notRequiredStyles)
            }}
          >
            <div 
              style={getHeaderStyles(isCollapsed)}
              onClick={() => toggleProvider(provider.id)}
            >
              <div style={headerLeftStyles}>
                <span style={lockIconStyles}>
                  <LockIcon 
                    size={20} 
                    color={hasKey ? '#10b981' : (isRequired ? themeStyles.text.primary : themeStyles.text.secondary)} 
                  />
                </span>
                <label style={labelStyles}>{provider.apiKeyLabel}</label>
                {isRequired && !hasKey && (
                  <span style={requiredBadgeStyles}>Required</span>
                )}
                {!isRequired && (
                  <span style={notRequiredBadgeStyles}>Not in use</span>
                )}
              </div>
              <span style={{
                ...chevronStyles,
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)'
              }}>
                <ChevronRightIcon size={20} />
              </span>
            </div>
            
            {!isCollapsed && (
              <div style={inputContainerStyles}>
                <Input
                  type="password"
                  value={apiKeys[provider.id] || ''}
                  onChange={() => {}} // Read-only
                  placeholder={!apiKeys[provider.id] 
                    ? `Add REACT_APP_${provider.id.toUpperCase()}_API_KEY to .env` 
                    : provider.apiKeyPlaceholder}
                  darkMode={darkMode}
                  disabled={!isRequired}
                  readOnly={true}
                />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default ApiKeysSection;