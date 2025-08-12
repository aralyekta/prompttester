import React from 'react';
import { theme, getThemeStyles } from '../theme';
import { DownloadIcon, UploadIcon } from './icons/index.jsx';
import Button from './ui/Button';

const ToolbarSection = ({ 
  onExport, 
  onImportClick, 
  scenarioCount, 
  darkMode,
  fileInputRef 
}) => {
  const themeStyles = getThemeStyles(darkMode);
  
  const toolbarStyles = {
    maxWidth: '1200px',
    margin: '0 auto 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const toolbarLeftStyles = {
    display: 'flex',
    gap: theme.spacing.sm
  };

  const scenarioCountStyles = {
    padding: `${theme.spacing.md} ${theme.spacing['2xl']}`,
    background: darkMode
      ? 'rgba(255, 255, 255, 0.1)'
      : theme.colors.gray[100],
    border: darkMode ? 'none' : `1px solid ${theme.colors.gray[200]}`,
    borderRadius: theme.borderRadius.md,
    color: themeStyles.text.secondary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    backdropFilter: darkMode ? 'blur(10px)' : 'none',
    fontFamily: theme.typography.fontFamily.sans
  };

  return (
    <div style={toolbarStyles}>
      <div style={toolbarLeftStyles}>
        <Button 
          variant="secondary" 
          size="md" 
          onClick={onExport}
          darkMode={darkMode}
        >
          <DownloadIcon size={18} />
          Export
        </Button>
        <Button 
          variant="secondary" 
          size="md" 
          onClick={onImportClick}
          darkMode={darkMode}
        >
          <UploadIcon size={18} />
          Import
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
        />
      </div>
      <div style={scenarioCountStyles}>
        {scenarioCount} scenario{scenarioCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default ToolbarSection;