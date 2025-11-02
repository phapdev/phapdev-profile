export type Section = "home" | "about" | "projects" | "resume" | "contact";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // e.g., 1-5 for proficiency
  category: "Frontend" | "Backend" | "DevOps" | "Tools" | "Web3";
}

export interface JourneyEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  details: string[];
}


export type ThemeName = 'holo-cyan' | 'synth-magenta' | 'plasma-green' | 'solar-flare';

export interface Theme {
  name: ThemeName;
  colors: {
    primary: string;
    secondary: string;
  };
}