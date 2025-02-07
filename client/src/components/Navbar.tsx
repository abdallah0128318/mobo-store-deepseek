// src/components/Navbar.tsx file

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/icons/logo.svg';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.cookie = `language=${newLang};path=/;max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <nav className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <img 
              src={Logo} 
              alt="Mobile Wholesale Logo" 
              className="h-8 w-auto" 
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
              aria-label={t('common.theme.toggle')}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
            >
              {i18n.language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;