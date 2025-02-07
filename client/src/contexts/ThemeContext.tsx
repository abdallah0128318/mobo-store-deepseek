// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define our theme types for better type safety
type Theme = 'light' | 'dark';

// Define the shape of our context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with undefined as initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props interface for our provider component
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Cookie helper functions to keep our code DRY
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from cookie or default to dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (getCookie('theme') as Theme) || 'dark';
  });

  // Effect to handle theme changes
  useEffect(() => {
    // Update cookie
    setCookie('theme', theme, 365); // Store for one year
    
    // Update document classes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Update CSS variables
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#1a1a1a');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#2d2d2d');
      document.documentElement.style.setProperty('--border-color', '#404040');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#000000');
      document.documentElement.style.setProperty('--bg-secondary', '#f3f4f6');
      document.documentElement.style.setProperty('--border-color', '#e5e7eb');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};