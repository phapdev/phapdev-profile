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
} from "lucide-react";

import { AnimatedBackground } from "../components/AnimatedBackground";
import { Navigation } from "../components/Navigation";
import { HomePage } from "../components/sections/Home";
import { AboutPage } from "../components/sections/About";
import { ProjectsPage } from "../components/sections/Projects";
import { ContactPage } from "../components/sections/Contact";
import { Terminal } from "../components/Terminal";
import { ResumePage } from "../components/sections/Resume";
import type { Section, ThemeName } from "../types";
import { THEMES } from "../constants";

const sectionComponents = {
  home: HomePage,
  about: AboutPage,
  projects: ProjectsPage,
  resume: ResumePage,
  contact: ContactPage,
};

const navItems = [
  { id: "home" as Section, label: "Mainframe", icon: Home },
  { id: "about" as Section, label: "Personal File", icon: User },
  { id: "projects" as Section, label: "Simulations", icon: Layers },
  { id: 'resume' as Section, label: 'CV/Resume', icon: FileText },
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
  const [activeTheme, setActiveTheme] = useState<ThemeName>('holo-cyan');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.2);
  // const CurrentSection = sectionComponents[activeSection];


  useEffect(() => {
    const theme = THEMES[activeTheme];
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
  }, [activeTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~" || (e.key === "t" && e.metaKey)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isTerminalOpen) {
        setTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTerminalOpen]);

  return (
    <main className="h-screen w-screen overflow-hidden font-sans relative flex">
      <AnimatedBackground opacity={backgroundOpacity} />
      <Navigation
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-grow p-4 md:p-8 lg:p-12 h-full relative overflow-y-auto">
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
            {/* <CurrentSection /> */}
            {activeSection === 'home' ? (
              <HomePage 
                setActiveTheme={setActiveTheme} 
                setBackgroundOpacity={setBackgroundOpacity} 
                currentOpacity={backgroundOpacity}
              />
            ) : (
              sectionComponents[activeSection] ? React.createElement(sectionComponents[activeSection]) : null
            )}
          </motion.div>
        </AnimatePresence>
      </div>

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
