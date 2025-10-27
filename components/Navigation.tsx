
import React from 'react';
import type { Section } from '../types';

interface NavItem {
  id: Section;
  label: string;
  icon: React.ElementType;
}

interface NavigationProps {
  navItems: NavItem[];
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ navItems, activeSection, setActiveSection }) => {
  return (
    <nav className="z-10 h-screen glassmorphism p-2 flex flex-col items-center justify-center space-y-6">
      <div className="text-primary font-bold text-lg tracking-widest -rotate-90 whitespace-nowrap mb-12">
        PHAPDEV
      </div>
      <div className="flex flex-col space-y-6">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`relative group p-3 rounded-full transition-all duration-300 ease-in-out
              ${activeSection === id 
                ? 'bg-primary text-base animate-pulseGlow' 
                : 'text-primary/70 hover:bg-primary/10 hover:text-primary'
              }`}
            aria-label={label}
          >
            <Icon size={24} />
            <span 
              className="absolute left-full ml-4 px-3 py-1 bg-base text-primary border border-primary/20 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};
