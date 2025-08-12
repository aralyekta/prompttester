// Modern theme configuration for PromptTester
export const theme = {
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e9ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      900: '#312e81'
    },
    secondary: {
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9'
    },
    purple: {
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce'
    },
    success: {
      500: '#10b981',
      600: '#059669'
    },
    warning: {
      500: '#ffc107',
      600: '#f57c00'
    },
    error: {
      500: '#ef4444',
      600: '#dc2626'
    },
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b'
    },
    white: '#ffffff',
    black: '#000000'
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #9333ea 100%)',
    purple: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    darkBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    lightBg: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
  },
  
  shadows: {
    sm: '0 4px 20px rgba(0, 0, 0, 0.1)',
    md: '0 10px 30px rgba(0, 0, 0, 0.1)',
    lg: '0 15px 40px rgba(0, 0, 0, 0.15)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.1)',
    colored: {
      primary: '0 4px 20px rgba(102, 126, 234, 0.4)',
      purple: '0 4px 20px rgba(139, 92, 246, 0.3)',
      error: '0 4px 20px rgba(239, 68, 68, 0.3)'
    }
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '15px',
    xl: '20px',
    full: '50%',
    pill: '28px'
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '40px',
    '5xl': '60px'
  },
  
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
      mono: '"JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", monospace'
    },
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '14px',
      md: '15px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    }
  },
  
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.5s ease'
  },
  
  zIndex: {
    modal: 1000,
    dropdown: 100,
    header: 50
  }
};

// Theme-aware style functions
export const getThemeStyles = (darkMode) => ({
  // Background styles
  background: {
    primary: darkMode ? theme.gradients.darkBg : '#ffffff',
    card: darkMode 
      ? 'rgba(255, 255, 255, 0.05)' 
      : '#ffffff',
    cardHover: darkMode 
      ? 'rgba(255, 255, 255, 0.08)' 
      : '#ffffff',
    input: darkMode 
      ? 'rgba(255, 255, 255, 0.05)' 
      : '#f9fafb',
    inputFocus: darkMode 
      ? 'rgba(255, 255, 255, 0.1)' 
      : '#ffffff'
  },
  
  // Text colors
  text: {
    primary: darkMode ? theme.colors.white : theme.colors.gray[900],
    secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : theme.colors.gray[600],
    muted: darkMode ? 'rgba(255, 255, 255, 0.5)' : theme.colors.gray[500],
    inverse: darkMode ? theme.colors.gray[900] : theme.colors.white
  },
  
  // Border colors
  border: {
    default: darkMode 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.colors.gray[200],
    focus: theme.colors.primary[500],
    error: theme.colors.error[500]
  },
  
  // Component-specific styles
  glass: {
    background: darkMode 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.8)',
    border: darkMode
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid ' + theme.colors.gray[200],
    backdropFilter: darkMode ? 'blur(20px)' : 'blur(10px)'
  }
});

export default theme;