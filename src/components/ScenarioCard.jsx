import React from 'react';
import { theme, getThemeStyles } from '../theme';
import { 
  ChevronRightIcon, 
  ChevronDownIcon, 
  PlayIcon, 
  StopIcon,
  TrashIcon,
  DuplicateIcon,
  AlertTriangleIcon,
  SparklesIcon
} from './icons/index.jsx';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import ConfigSection from './ConfigSection';
import MessagesSection from './MessagesSection';
import ResponseSection from './ResponseSection';

const ScenarioCard = ({ 
  scenario, 
  onUpdate, 
  onDelete,
  onDuplicate, 
  onRun, 
  onToggleCollapse, 
  onToggleResponseCollapse,
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  onUpdateMessageRole,
  onCancel,
  darkMode,
  canDelete = true,
  isComparing,
  onToggleCompare
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing['2xl']
  };

  const descriptionInputStyles = {
    flex: 1,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}`,
    borderRadius: theme.borderRadius.md,
    background: darkMode
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(103, 126, 234, 0.05)',
    color: themeStyles.text.primary,
    transition: theme.transitions.default,
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: theme.typography.fontFamily.sans,
    '&:focus': {
      borderColor: theme.colors.primary[500],
      background: darkMode
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(103, 126, 234, 0.1)'
    }
  };

  const actionsStyles = {
    display: 'flex',
    gap: theme.spacing.sm
  };

  const contentStyles = {
    animation: 'fadeIn 0.3s ease'
  };

  const errorBoxStyles = {
    display: 'flex',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    background: darkMode
      ? 'rgba(239, 68, 68, 0.1)'
      : 'rgba(239, 68, 68, 0.05)',
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xl,
    border: `1px solid ${darkMode ? 'rgba(239, 68, 68, 0.25)' : 'rgba(239, 68, 68, 0.15)'}`
  };

  const errorIconStyles = {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.error[500]
  };

  const errorMessageStyles = {
    margin: '5px 0 0',
    color: themeStyles.text.secondary,
    fontFamily: theme.typography.fontFamily.sans
  };

  return (
    <Card darkMode={darkMode} loading={scenario.loading}>
      <div style={headerStyles}>
        <Button
          variant="ghost"
          size="iconSm"
          onClick={() => onToggleCollapse(scenario.id)}
          darkMode={darkMode}
        >
          {scenario.collapsed ? <ChevronRightIcon size={16} /> : <ChevronDownIcon size={16} />}
        </Button>
        
        <input
          type="text"
          value={scenario.description}
          onChange={(e) => onUpdate(scenario.id, 'description', e.target.value)}
          style={descriptionInputStyles}
          placeholder="Scenario description"
        />
        
        <div style={actionsStyles}>
          <Button
            variant={scenario.loading ? "danger" : "primary"}
            size="md"
            onClick={() => scenario.loading ? onCancel(scenario.id) : onRun(scenario.id)}
            darkMode={darkMode}
          >
            {scenario.loading ? <StopIcon size={16} /> : <PlayIcon size={16} />}
            {scenario.loading ? 'Cancel' : 'Run'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(scenario.id)}
            darkMode={darkMode}
            title="Duplicate scenario"
          >
            <DuplicateIcon size={18} />
          </Button>
          
          <Button
            variant="danger"
            size="icon"
            onClick={() => onDelete(scenario.id)}
            disabled={!canDelete || scenario.loading}
            darkMode={darkMode}
            title={scenario.loading ? "Cannot delete while running" : "Delete scenario"}
          >
            <TrashIcon size={18} />
          </Button>
        </div>
      </div>

      {!scenario.collapsed && (
        <div style={contentStyles}>
          <ConfigSection 
            scenario={scenario} 
            onUpdate={onUpdate} 
            darkMode={darkMode} 
          />
          
          <MessagesSection
            scenario={scenario}
            onAddMessage={onAddMessage}
            onUpdateMessage={onUpdateMessage}
            onDeleteMessage={onDeleteMessage}
            onUpdateMessageRole={onUpdateMessageRole}
            darkMode={darkMode}
          />

          {scenario.error && (
            <div style={errorBoxStyles}>
              <span style={errorIconStyles}>
                <AlertTriangleIcon size={20} />
              </span>
              <div>
                <strong style={{ color: themeStyles.text.primary }}>Error</strong>
                <p style={errorMessageStyles}>{scenario.error}</p>
              </div>
            </div>
          )}

          {scenario.response && (
            <ResponseSection
              response={scenario.response}
              collapsed={scenario.responseCollapsed}
              onToggleCollapse={() => onToggleResponseCollapse(scenario.id)}
              darkMode={darkMode}
              scenarioId={scenario.id}
              isComparing={isComparing}
              onToggleCompare={onToggleCompare}
              responseTime={scenario.responseTime}
              cost={scenario.cost}
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default ScenarioCard;