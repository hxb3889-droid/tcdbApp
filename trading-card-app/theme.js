export const lightTheme = {
  bg: '#FAFAFA',
  text: '#000',
  textSecondary: '#666',
  textTertiary: '#999',
  card: '#fff',
  border: '#e0e0e0',
  input: '#fff',
  primary: '#f16513ff',
  accent: 'rgba(0,255,0,0.1)',
  accentRed: 'rgba(255,0,0,0.1)',
};

export const darkTheme = {
  bg: '#1a1a1a',
  text: '#fff',
  textSecondary: '#bbb',
  textTertiary: '#888',
  card: '#2a2a2a',
  border: '#444',
  input: '#333',
  primary: '#f16513ff',
  accent: 'rgba(76,175,80,0.15)',
  accentRed: 'rgba(244,67,54,0.15)',
};

export const getTheme = (isDarkMode) => isDarkMode ? darkTheme : lightTheme;
