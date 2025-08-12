import React from 'react';
import { theme, getThemeStyles } from '../theme';
import { MessageIcon, PlusIcon, XIcon } from './icons/index.jsx';
import Button from './ui/Button';
import { Textarea } from './ui/Input';
import { MessageCard } from './ui/Card';

const MessagesSection = ({ 
  scenario, 
  onAddMessage, 
  onUpdateMessage, 
  onDeleteMessage,
  onUpdateMessageRole, 
  darkMode 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const sectionStyles = {
    marginBottom: theme.spacing.xl
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  };

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: theme.typography.fontFamily.sans
  };

  const messageHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  };

  const messageNumberStyles = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: themeStyles.text.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: theme.typography.fontFamily.sans
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'developer':
        return theme.colors.purple[500];
      case 'assistant':
        return theme.colors.primary[500];
      case 'user':
      default:
        return theme.colors.success[500];
    }
  };

  const getRoleBackground = (role) => {
    const color = getRoleColor(role);
    return darkMode 
      ? `${color}20`  // 20 is hex for ~12.5% opacity
      : `${color}15`; // 15 is hex for ~8% opacity
  };

  const roleSelectStyles = (role) => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    backgroundColor: getRoleBackground(role),
    border: `1.5px solid ${getRoleColor(role)}`,
    borderRadius: theme.borderRadius.pill,
    color: getRoleColor(role),
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily.sans,
    cursor: 'pointer',
    outline: 'none',
    transition: theme.transitions.fast,
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(getRoleColor(role))}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: '32px'
  });

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <label style={labelStyles}>
          <MessageIcon size={18} />
          Messages
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddMessage(scenario.id)}
          darkMode={darkMode}
          disabled={scenario.loading}
        >
          <PlusIcon size={16} />
          Add Message
        </Button>
      </div>
      
      {scenario.messages.map((message, messageIndex) => (
        <MessageCard key={messageIndex} darkMode={darkMode}>
          <div style={messageHeaderStyles}>
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
              <span style={messageNumberStyles}>
                Message {messageIndex + 1}
              </span>
              <select
                value={message.role || 'user'}
                onChange={(e) => onUpdateMessageRole(scenario.id, messageIndex, e.target.value)}
                style={roleSelectStyles(message.role || 'user')}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <option value="user">User</option>
                <option value="assistant">Assistant</option>
                <option value="developer">Developer</option>
              </select>
            </div>
            {scenario.messages.length > 1 && (
              <Button
                variant="danger"
                size="iconXs"
                onClick={() => onDeleteMessage(scenario.id, messageIndex)}
                darkMode={darkMode}
              >
                <XIcon size={16} />
              </Button>
            )}
          </div>
          <Textarea
            value={message.content}
            onChange={(e) => onUpdateMessage(scenario.id, messageIndex, e.target.value)}
            placeholder="Enter your prompt here (supports newlines)..."
            rows={4}
            darkMode={darkMode}
          />
        </MessageCard>
      ))}
    </div>
  );
};

export default MessagesSection;