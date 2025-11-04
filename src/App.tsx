import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import {
  Home,
  User,
  Layers,
  Mail,
  Terminal as TerminalIcon,
  FileText,
  GitBranch,
  BookOpen,
} from "lucide-react";

import { AnimatedBackground } from "../components/AnimatedBackground";
import { Navigation } from "../components/Navigation";
import { HomePage } from "../components/sections/Home";
import { AboutPage } from "../components/sections/About";
import { ProjectsPage } from "../components/sections/Projects";
import { ContactPage } from "../components/sections/Contact";
import { Terminal } from "../components/Terminal";
import { ResumePage } from "../components/sections/Resume";
import { JourneyPage } from "../components/sections/Journey";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { BlogPage } from "../components/sections/Blog";
import type { Section, ThemeName } from "../types";
import { THEMES } from "../constants";

const sectionComponents = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  resume: ResumePage,  
  blog: BlogPage,
  journey: JourneyPage,
  contact: ContactPage,
};

const navItems = [
  { id: "home" as Section, label: "Mainframe", icon: Home },
  { id: "about" as Section, label: "Personal File", icon: User },
  { id: "projects" as Section, label: "Simulations", icon: Layers },
  { id: 'resume' as Section, label: 'CV/Resume', icon: FileText },
  { id: 'blog' as Section, label: 'Data Logs', icon: BookOpen },
  { id: 'journey' as Section, label: 'Journey', icon: GitBranch },
  { id: "contact" as Section, label: "Comms", icon: Mail },
];

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeName>(localStorage.getItem('phapdev-theme') as ThemeName || 'neon-purple');
  const [backgroundOpacity, setBackgroundOpacity] = useState(parseFloat(localStorage.getItem('phapdev-opacity') || '0.0'));

  useEffect(() => {
    localStorage.setItem('phapdev-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('phapdev-opacity', backgroundOpacity.toString());
  }, [backgroundOpacity]);

  useEffect(() => {
    const theme = THEMES[activeTheme];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
  }, [activeTheme]);

  // handle terminal (toggle with Backquote, close with Escape). Ignore when typing in inputs.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = !!target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        (target as HTMLElement).isContentEditable
      );
      if (isTyping) return;

      // Close with Escape on any platform
      if (event.key === 'Escape') {
        setTerminalOpen(false);
        return;
      }

      // Toggle with Backquote (`). Support by key and code
      if (event.key === '`' || event.code === 'Backquote') {
        event.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden font-sans relative flex">
      <AnimatedBackground opacity={backgroundOpacity} />

      <Navigation
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="grow p-4 md:p-8 lg:p-12 h-full relative overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition as any}
            className="h-full w-full "
          >
            {activeSection in sectionComponents 
              ? React.createElement(sectionComponents[activeSection as keyof typeof sectionComponents]) 
              : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Theme Switcher - Available on all screens */}
      <ThemeSwitcher 
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme} 
        setBackgroundOpacity={setBackgroundOpacity}
        currentOpacity={backgroundOpacity}
      />

      {/* Terminal Trigger */}
      <div className="absolute bottom-4 right-4 z-50">
        <button
          onClick={() => setTerminalOpen(true)}
          className="p-2 text-primary/50 hover:text-primary hover:scale-110 transition-all duration-300"
          aria-label="Open Terminal"
        >
          <TerminalIcon size={44} />
        </button>
      </div>

      <AnimatePresence>
        {isTerminalOpen && (
          <Terminal closeTerminal={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>
      <Analytics />
    </main>
  );
};

export default App;
