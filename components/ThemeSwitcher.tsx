
import React from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import { THEMES } from '../constants';
import type { ThemeName } from '../types';

interface ThemeSwitcherProps {
  setActiveTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
  setBackgroundOpacity: React.Dispatch<React.SetStateAction<number>>;
  currentOpacity: number;
}

const themeNames = Object.keys(THEMES) as ThemeName[];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ setActiveTheme, setBackgroundOpacity, currentOpacity }) => {
  
  const handleThemeChange = () => {
    setActiveTheme(prev => {
      const currentIndex = themeNames.indexOf(prev);
      const nextIndex = (currentIndex + 1) % themeNames.length;
      return themeNames[nextIndex];
    });
  };

  const increaseOpacity = () => {
    setBackgroundOpacity(prev => Math.min(prev + 0.1, 1));
  };

  const decreaseOpacity = () => {
    setBackgroundOpacity(prev => Math.max(prev - 0.1, 0));
  };

  return (
    <div className="absolute top-4 right-4 z-30 p-2 glassmorphism rounded-lg flex items-center space-x-3">
      <button 
        onClick={handleThemeChange} 
        className="text-primary/70 hover:text-primary transition-colors"
        aria-label="Change theme"
      >
        <Palette size={20} />
      </button>
      <div className="h-6 w-px bg-primary/20"></div>
      <button 
        onClick={decreaseOpacity} 
        className="text-primary/70 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease background opacity"
        disabled={currentOpacity <= 0}
      >
        <Moon size={20} />
      </button>
      <button 
        onClick={increaseOpacity} 
        className="text-primary/70 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase background opacity"
        disabled={currentOpacity >= 1}
      >
        <Sun size={20} />
      </button>
    </div>
  );
};
