import React, { useState, useEffect } from 'react';
import { ThemeContext } from './themeContext.js';

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('killer-sudoku-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default to light mode (false) - always start with light mode for new users
      setIsDarkMode(false);
    }
  }, []);

  // Save theme preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem('killer-sudoku-theme', isDarkMode ? 'dark' : 'light');
    // Update document class for global styling
    console.log('Setting theme to:', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark'); // Also add to body as fallback
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark'); // Also remove from body
    }
    
    console.log('HTML classes:', document.documentElement.className);
    console.log('Body classes:', document.body.className);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
