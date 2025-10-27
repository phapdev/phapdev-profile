export type Section = "home" | "about" | "projects" | "contact";

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
