import React, { useState } from 'react';
import { theme, getThemeStyles } from '../theme';
import { SparklesIcon, ChevronRightIcon, ChevronDownIcon, CopyIcon, CheckIcon } from './icons/index.jsx';
import Button from './ui/Button';
import { formatCost } from '../utils/models';

const ResponseSection = ({ response, collapsed, onToggleCollapse, darkMode, scenarioId, isComparing, onToggleCompare, responseTime, cost }) => {
  const themeStyles = getThemeStyles(darkMode);
  const [copied, setCopied] = useState(false);
  
  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };
  
  const handleCopy = async () => {
    // Handle both old format (response.choices) and new format (response.content)
    const content = response.content || response.choices?.[0]?.message?.content || 'No content';
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const sectionStyles = {
    marginTop: theme.spacing.xl,
    padding: theme.spacing['2xl'],
    background: darkMode
      ? 'rgba(139, 92, 246, 0.05)'
      : 'rgba(139, 92, 246, 0.03)',
    borderRadius: theme.borderRadius.lg,
    border: darkMode
      ? '1px solid rgba(139, 92, 246, 0.2)'
      : '1px solid rgba(139, 92, 246, 0.15)'
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  };

  const titleStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans
  };

  const bodyStyles = {
    animation: 'fadeIn 0.3s ease'
  };

  const contentStyles = {
    padding: theme.spacing.xl,
    background: darkMode
      ? 'rgba(0, 0, 0, 0.3)'
      : theme.colors.white,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.md,
    lineHeight: '1.6',
    color: themeStyles.text.primary,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: theme.typography.fontFamily.mono
  };

  const detailsStyles = {
    marginTop: theme.spacing.md
  };

  const summaryStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: darkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(103, 126, 234, 0.05)',
    borderRadius: theme.borderRadius.sm,
    color: themeStyles.text.secondary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: theme.transitions.default,
    fontFamily: theme.typography.fontFamily.sans,
    '&:hover': {
      background: darkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(103, 126, 234, 0.1)'
    }
  };

  const jsonContentStyles = {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    background: darkMode
      ? 'rgba(0, 0, 0, 0.5)'
      : theme.colors.gray[50],
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    overflow: 'auto',
    maxHeight: '400px',
    color: themeStyles.text.secondary,
    fontFamily: theme.typography.fontFamily.mono
  };

  const headerButtonsStyles = {
    display: 'flex',
    gap: theme.spacing.sm,
    alignItems: 'center'
  };

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
          <h4 style={titleStyles}>
            <SparklesIcon size={18} />
            Response
          </h4>
          {responseTime && (
            <span style={{
              fontSize: theme.typography.fontSize.sm,
              color: darkMode ? 'rgba(139, 92, 246, 0.8)' : '#7c3aed',
              fontWeight: '500',
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              background: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.08)',
              borderRadius: theme.borderRadius.sm,
              fontFamily: theme.typography.fontFamily.mono
            }}>
              {formatTime(responseTime)}
            </span>
          )}
          {cost && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              fontSize: theme.typography.fontSize.sm,
              color: themeStyles.text.secondary,
              fontFamily: theme.typography.fontFamily.mono
            }}>
              <span>{formatCost(cost.totalCost)}</span>
            </div>
          )}
        </div>
        <div style={headerButtonsStyles}>
          {!collapsed && onToggleCompare && (
            <button
              onClick={() => onToggleCompare(scenarioId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                color: isComparing ? '#8b5cf6' : (darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'),
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '20px',
                border: 'none',
                background: isComparing 
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                  : (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'),
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: '500',
                letterSpacing: '0.3px',
                userSelect: 'none',
                fontFamily: theme.typography.fontFamily.sans,
                outline: 'none',
                boxShadow: isComparing ? '0 2px 8px rgba(139, 92, 246, 0.3)' : 'none',
                transform: isComparing ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!isComparing) {
                  e.currentTarget.style.background = darkMode 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isComparing) {
                  e.currentTarget.style.background = darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isComparing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              <span style={{ color: isComparing ? 'white' : 'inherit' }}>
                {isComparing ? 'Comparing' : 'Compare'}
              </span>
            </button>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="iconSm"
              onClick={handleCopy}
              darkMode={darkMode}
              title={copied ? "Copied!" : "Copy response"}
            >
              {copied ? <CheckIcon size={16} color="#10b981" /> : <CopyIcon size={16} />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="iconSm"
            onClick={onToggleCollapse}
            darkMode={darkMode}
          >
            {collapsed ? <ChevronRightIcon size={16} /> : <ChevronDownIcon size={16} />}
          </Button>
        </div>
      </div>
      
      {!collapsed && (
        <div style={bodyStyles}>
          <div style={contentStyles}>
            {response.content || response.choices?.[0]?.message?.content || 'No content'}
          </div>
          <details style={detailsStyles}>
            <summary style={summaryStyles}>View Raw JSON</summary>
            <pre style={jsonContentStyles}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ResponseSection;