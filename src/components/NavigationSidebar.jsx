import React, { useState, useRef, useEffect } from 'react';
import { theme, getThemeStyles } from '../theme';
import { ChevronRightIcon, ChevronDownIcon, MenuIcon, SparklesIcon, AlertTriangleIcon, CheckIcon, PlayIcon, StopIcon, CircleIcon } from './icons/index.jsx';
import { formatCost } from '../utils/models';

const NavigationSidebar = ({ scenarios, onNavigate, darkMode, isCollapsed, onToggleCollapse, totalCost, width, onWidthChange, onRunScenario, onCancelScenario, onRunAll, onCancelAll, hasRunningScenarios }) => {
  const themeStyles = getThemeStyles(darkMode);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 180 && newWidth <= 400) {
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onWidthChange]);

  const sidebarStyles = {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: isCollapsed ? '50px' : `${width}px`,
    background: darkMode ? '#0f0f0f' : '#ffffff',
    borderRight: darkMode ? `1px solid ${themeStyles.border.default}` : `1px solid ${theme.colors.gray[200]}`,
    transition: isResizing ? 'none' : 'width 0.3s ease',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 1000,
    boxShadow: darkMode 
      ? '2px 0 10px rgba(0, 0, 0, 0.5)' 
      : '1px 0 3px 0 rgba(0, 0, 0, 0.1), 1px 0 2px 0 rgba(0, 0, 0, 0.06)'
  };

  const resizeHandleStyles = {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    cursor: 'col-resize',
    background: isResizing 
      ? theme.colors.primary[500] 
      : 'transparent',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: theme.colors.primary[400]
    }
  };

  const headerStyles = {
    padding: theme.spacing.lg,
    borderBottom: `1px solid ${themeStyles.border.default}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    position: 'sticky',
    top: 0,
    background: darkMode ? '#0f0f0f' : '#ffffff',
    zIndex: 10
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.primary,
    fontFamily: theme.typography.fontFamily.sans,
    display: isCollapsed ? 'none' : 'block'
  };

  const toggleButtonStyles = {
    padding: theme.spacing.sm,
    background: 'transparent',
    border: 'none',
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: themeStyles.text.secondary,
    transition: theme.transitions.default,
    '&:hover': {
      background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
    }
  };

  const scenarioListStyles = {
    padding: isCollapsed ? theme.spacing.sm : theme.spacing.md
  };

  const scenarioItemStyles = {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    transition: theme.transitions.default
  };

  const scenarioHeaderStyles = (hasResponse, hasError, isLoading) => ({
    padding: isCollapsed ? theme.spacing.sm : `${theme.spacing.sm} ${theme.spacing.lg}`,
    background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    gap: theme.spacing.sm,
    transition: theme.transitions.default,
    borderLeft: isCollapsed ? 'none' : `3px solid ${
      isLoading ? theme.colors.primary[500] :
      hasError ? theme.colors.error[500] :
      hasResponse ? theme.colors.success[500] :
      darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'
    }`,
    '&:hover': {
      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    }
  });

  const scenarioTitleStyles = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: themeStyles.text.primary,
    fontFamily: theme.typography.fontFamily.sans,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: isCollapsed ? 'none' : 'block'
  };

  const statusIconStyles = {
    display: 'flex',
    alignItems: 'center',
    color: themeStyles.text.secondary
  };

  const responsePreviewStyles = {
    padding: isCollapsed ? '0' : `${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.lg}`,
    fontSize: theme.typography.fontSize.xs,
    color: themeStyles.text.muted,
    cursor: 'pointer',
    transition: theme.transitions.default,
    display: isCollapsed ? 'none' : 'block',
    '&:hover': {
      background: darkMode ? 'rgba(139, 92, 246, 0.05)' : 'rgba(139, 92, 246, 0.03)',
      color: themeStyles.text.secondary
    }
  };

  const responseTextStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: theme.typography.fontFamily.sans
  };

  const responseMetaStyles = {
    display: 'flex',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.xs,
    color: themeStyles.text.muted,
    fontFamily: theme.typography.fontFamily.mono
  };

  const loadingSpinnerStyles = {
    width: '14px',
    height: '14px',
    border: `2px solid ${darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)'}`,
    borderTopColor: theme.colors.primary[500],
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const getStatusIcon = (scenario) => {
    if (scenario.loading) {
      return <div style={loadingSpinnerStyles} />;
    }
    if (scenario.error) {
      return <AlertTriangleIcon size={14} color={theme.colors.error[500]} />;
    }
    if (scenario.response) {
      return <CheckIcon size={14} color={theme.colors.success[500]} />;
    }
    // Default circle icon for unrun scenarios
    return <CircleIcon size={14} color={darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'} />;
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatTime = (ms) => {
    if (!ms) return '';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div ref={sidebarRef} style={sidebarStyles}>
      {!isCollapsed && (
        <div
          style={resizeHandleStyles}
          onMouseDown={() => setIsResizing(true)}
          onMouseEnter={(e) => e.currentTarget.style.background = theme.colors.primary[400]}
          onMouseLeave={(e) => e.currentTarget.style.background = isResizing ? theme.colors.primary[500] : 'transparent'}
        />
      )}
      <div style={headerStyles}>
        {!isCollapsed && <span style={titleStyles}>Navigation</span>}
        <button 
          style={toggleButtonStyles}
          onClick={onToggleCollapse}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <div style={{
        padding: isCollapsed ? theme.spacing.sm : `${theme.spacing.md} ${theme.spacing.lg}`,
        borderBottom: `1px solid ${themeStyles.border.default}`,
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing.sm
      }}>
        <button
          onClick={hasRunningScenarios ? onCancelAll : onRunAll}
          style={{
            flex: 1,
            padding: `${theme.spacing.sm} ${isCollapsed ? theme.spacing.sm : theme.spacing.md}`,
            background: hasRunningScenarios
              ? 'rgba(239, 68, 68, 0.1)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
            border: hasRunningScenarios
              ? '1px solid rgba(239, 68, 68, 0.2)'
              : '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: theme.borderRadius.md,
            color: hasRunningScenarios
              ? theme.colors.error[500]
              : theme.colors.primary[600],
            fontSize: isCollapsed ? '0' : theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            fontFamily: theme.typography.fontFamily.sans,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isCollapsed ? '0' : theme.spacing.xs,
            transition: theme.transitions.default,
            title: isCollapsed ? (hasRunningScenarios ? 'Cancel All' : 'Run All') : undefined
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = hasRunningScenarios
              ? '0 2px 8px rgba(239, 68, 68, 0.2)'
              : '0 2px 8px rgba(139, 92, 246, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {hasRunningScenarios ? <StopIcon size={14} /> : <PlayIcon size={14} />}
          {!isCollapsed && (hasRunningScenarios ? 'Cancel All' : 'Run All')}
        </button>
      </div>

      {
        <div style={{
          padding: isCollapsed ? theme.spacing.sm : `${theme.spacing.md} ${theme.spacing.lg}`,
          borderBottom: `1px solid ${themeStyles.border.default}`,
          background: darkMode ? 'rgba(34, 197, 94, 0.05)' : 'rgba(34, 197, 94, 0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          title: isCollapsed ? `Session Total: ${formatCost(totalCost)}` : undefined
        }}>
          {!isCollapsed && (
            <span style={{
              fontSize: theme.typography.fontSize.sm,
              color: themeStyles.text.secondary,
              fontWeight: theme.typography.fontWeight.medium,
              fontFamily: theme.typography.fontFamily.sans
            }}>
              Session Total
            </span>
          )}
          <span style={{
            fontSize: theme.typography.fontSize.sm,
            color: darkMode ? '#22c55e' : '#16a34a',
            fontWeight: theme.typography.fontWeight.semibold,
            fontFamily: theme.typography.fontFamily.mono
          }}>
            {isCollapsed ? '$' : formatCost(totalCost)}
          </span>
        </div>
      }

      <div style={scenarioListStyles}>
        {scenarios.map((scenario, index) => (
          <div key={scenario.id} style={scenarioItemStyles}>
            <div 
              style={scenarioHeaderStyles(!!scenario.response, !!scenario.error, scenario.loading)}
              onClick={() => onNavigate(scenario.id)}
              title={scenario.description}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, flex: 1, minWidth: 0 }}>
                <span style={statusIconStyles}>
                  {getStatusIcon(scenario)}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={scenarioTitleStyles}>
                    {scenario.description || `Scenario ${index + 1}`}
                  </span>
                  {!isCollapsed && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      marginTop: '4px'
                    }}>
                      {scenario.cost && (
                        <span style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.success[600],
                          fontFamily: theme.typography.fontFamily.mono
                        }}>
                          {formatCost(scenario.cost.totalCost)}
                        </span>
                      )}
                      {scenario.model && (
                        <span style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: themeStyles.text.muted,
                          fontFamily: theme.typography.fontFamily.sans
                        }}>
                          {scenario.model}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: isCollapsed ? 'none' : 'flex', alignItems: 'center', gap: theme.spacing.xs, flexShrink: 0 }}>
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (scenario.loading) {
                        onCancelScenario(scenario.id);
                      } else {
                        onRunScenario(scenario.id);
                      }
                    }}
                    style={{
                      padding: '4px',
                      background: scenario.loading 
                        ? 'rgba(239, 68, 68, 0.1)' 
                        : 'rgba(139, 92, 246, 0.1)',
                      border: 'none',
                      borderRadius: theme.borderRadius.sm,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: scenario.loading 
                        ? theme.colors.error[500]
                        : theme.colors.primary[500],
                      transition: theme.transitions.default
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = scenario.loading
                        ? 'rgba(239, 68, 68, 0.2)'
                        : 'rgba(139, 92, 246, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = scenario.loading
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(139, 92, 246, 0.1)';
                    }}
                    title={scenario.loading ? 'Cancel' : 'Run'}
                  >
                    {scenario.loading ? <StopIcon size={12} /> : <PlayIcon size={12} />}
                  </button>
              </div>
            </div>

            {scenario.response && !isCollapsed && (
              <div 
                style={responsePreviewStyles}
                onClick={() => onNavigate(scenario.id, true)}
                title="Jump to response"
              >
                <div style={responseTextStyles}>
                  {truncateText(scenario.response.content || scenario.response.choices?.[0]?.message?.content || '')}
                </div>
                <div style={responseMetaStyles}>
                  {scenario.responseTime && (
                    <span>{formatTime(scenario.responseTime)}</span>
                  )}
                  {scenario.cost && (
                    <span>{scenario.cost.totalTokens} tokens</span>
                  )}
                </div>
              </div>
            )}

            {scenario.error && !isCollapsed && (
              <div 
                style={{
                  ...responsePreviewStyles,
                  color: theme.colors.error[500]
                }}
                onClick={() => onNavigate(scenario.id)}
              >
                <div style={responseTextStyles}>
                  Error: {truncateText(scenario.error, 40)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationSidebar;