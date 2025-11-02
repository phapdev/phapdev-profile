export type Section = "home" | "about" | "projects" | "resume" | "blog" | "journey" | "contact";

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

export interface JourneyGalleryItem {
  imageUrl: string;
  description: string;
}

export interface JourneyEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  details: string[];
  gallery: JourneyGalleryItem[];
}

export type ThemeName = 
  | 'holo-cyan' 
  | 'synth-magenta' 
  | 'plasma-green' 
  | 'solar-flare'
  | 'neon-purple'
  | 'ocean-blue'
  | 'matrix-green'
  | 'cosmic-pink'
  | 'electric-yellow'
  | 'arctic-ice'
  | 'volcanic-red'
  | 'aurora-violet'
  | 'midnight-blue'
  | 'sunset-orange';

export interface Theme {
  name: ThemeName;
  colors: {
    primary: string;
    secondary: string;
  };
}

export type BlogCategory = 'AI' | 'Frontend' | 'Backend' | 'Rust' | 'Database' | 'General' | 'Blockchain';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  content: string; // Markdown content
}