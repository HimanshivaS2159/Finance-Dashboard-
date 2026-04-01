/**
 * Theme management utilities
 * Handles dark/light mode and system preferences
 */

// Theme types
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

// Get system preference
export const getSystemTheme = () => {
  if (typeof window === 'undefined') return THEMES.DARK;
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? THEMES.DARK 
    : THEMES.LIGHT;
};

// Apply theme to document
export const applyTheme = (theme) => {
  const root = document.documentElement;
  
  if (theme === THEMES.SYSTEM) {
    const systemTheme = getSystemTheme();
    root.classList.toggle('dark', systemTheme === THEMES.DARK);
  } else {
    root.classList.toggle('dark', theme === THEMES.DARK);
  }
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    const isDark = theme === THEMES.DARK || (theme === THEMES.SYSTEM && getSystemTheme() === THEMES.DARK);
    metaThemeColor.setAttribute('content', isDark ? '#0c122b' : '#ffffff');
  }
};

// Save theme preference
export const saveThemePreference = (theme) => {
  try {
    localStorage.setItem('theme-preference', theme);
  } catch (e) {
    console.error('Failed to save theme preference:', e);
  }
};

// Load theme preference
export const loadThemePreference = () => {
  try {
    return localStorage.getItem('theme-preference') || THEMES.DARK;
  } catch (e) {
    return THEMES.DARK;
  }
};

// Initialize theme on app load
export const initializeTheme = () => {
  const savedTheme = loadThemePreference();
  applyTheme(savedTheme);
  return savedTheme;
};

// Listen for system theme changes
export const listenToSystemThemeChanges = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e) => {
    callback(e.matches ? THEMES.DARK : THEMES.LIGHT);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => mediaQuery.removeEventListener('change', handler);
};

// Get theme-based color values
export const getThemeColors = (theme) => {
  const isDark = theme === THEMES.DARK || (theme === THEMES.SYSTEM && getSystemTheme() === THEMES.DARK);
  
  return {
    background: isDark ? '#0c122b' : '#ffffff',
    surface: isDark ? '#140c2b' : '#f8fafc',
    text: isDark ? '#f8fafc' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    primary: '#00F5FF',
    secondary: '#7C3AED',
    accent: '#F59E0B',
  };
};
