import React, { useState, useEffect, useRef } from 'react';
import { Palette, X, Sliders } from 'lucide-react';
import { THEMES } from '../constants';
import type { ThemeName } from '../types';

interface ThemeSwitcherProps {
  activeTheme: ThemeName;
  setActiveTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
  setBackgroundOpacity: React.Dispatch<React.SetStateAction<number>>;
  currentOpacity: number;
}

const themeNames = Object.keys(THEMES) as ThemeName[];

const STORAGE_KEYS = {
  theme: 'phapdev-theme',
  opacity: 'phapdev-opacity',
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  activeTheme, 
  setActiveTheme, 
  setBackgroundOpacity, 
  currentOpacity 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOpacitySlider, setShowOpacitySlider] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) as ThemeName | null;
    const savedOpacity = localStorage.getItem(STORAGE_KEYS.opacity);
    
    if (savedTheme && THEMES[savedTheme]) {
      setActiveTheme(savedTheme);
    }
    
    if (savedOpacity !== null) {
      const opacity = parseFloat(savedOpacity);
      if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
        setBackgroundOpacity(opacity);
      }
    }
  }, [setActiveTheme, setBackgroundOpacity]);

  // Save to localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, activeTheme);
  }, [activeTheme]);

  // Save to localStorage when opacity changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.opacity, currentOpacity.toString());
  }, [currentOpacity]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowOpacitySlider(false);
      }
    };

    if (isOpen || showOpacitySlider) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, showOpacitySlider]);

  const handleThemeSelect = (theme: ThemeName) => {
    setActiveTheme(theme);
    setIsOpen(false);
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBackgroundOpacity(value);
  };

  return (
    <div className="absolute top-4 right-4 z-30" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        {/* Theme Selector Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setIsOpen(!isOpen);
              setShowOpacitySlider(false);
            }}
            className="p-2 glassmorphism rounded-lg text-primary/70 hover:text-primary transition-colors"
            aria-label="Select theme"
          >
            <Palette size={20} />
          </button>

          {/* Theme Dropdown */}
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 glassmorphism rounded-lg p-4 min-w-[200px] shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-accent">Pick a theme</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-primary/70 hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-2">
                {themeNames.map((themeName) => {
                  const theme = THEMES[themeName];
                  const isActive = activeTheme === themeName;
                  return (
                    <button
                      key={themeName}
                      onClick={() => handleThemeSelect(themeName)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-md transition-all ${
                        isActive 
                          ? 'bg-primary/20 border border-primary/50' 
                          : 'hover:bg-primary/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-accent/30"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border-2 border-accent/30"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                      </div>
                      <span className="text-sm text-accent capitalize">
                        {themeName.replace('-', ' ')}
                      </span>
                      {isActive && (
                        <span className="ml-auto text-primary text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Opacity Slider Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowOpacitySlider(!showOpacitySlider);
              setIsOpen(false);
            }}
            className="p-2 glassmorphism rounded-lg text-primary/70 hover:text-primary transition-colors"
            aria-label="Adjust opacity"
          >
            <Sliders size={20} />
          </button>

          {/* Opacity Slider Dropdown */}
          {showOpacitySlider && (
            <div className="absolute top-full right-0 mt-2 glassmorphism rounded-lg p-4 min-w-[250px] shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-accent">Background Opacity</h3>
                <button
                  onClick={() => setShowOpacitySlider(false)}
                  className="text-primary/70 hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent/80">Opacity</span>
                  <span className="text-sm text-primary font-mono">
                    {Math.round(currentOpacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentOpacity}
                  onChange={handleOpacityChange}
                  className="w-full h-2 bg-base/50 rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${currentOpacity * 100}%, rgba(255,255,255,0.1) ${currentOpacity * 100}%, rgba(255,255,255,0.1) 100%)`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
