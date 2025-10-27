import type { Project, Skill } from "./types";

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "",
    description: "",
    tech: ["React", "D3.js", "TypeScript", "AWS Lambda", "TailwindCSS"],
    imageUrl: "https://picsum.photos/seed/cygnus/600/400",
    liveUrl: "#",
    repoUrl: "#",
  },
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: "React.js", level: 4, category: "Frontend" },
  { name: "TypeScript", level: 3, category: "Frontend" },
  { name: "Next.js", level: 2, category: "Frontend" },
  { name: "TailwindCSS", level: 3, category: "Frontend" },
  { name: "progress...", level: 3, category: "Frontend" },

  // Backend
  { name: "Node.js", level: 4, category: "Backend" },
  { name: "Python", level: 2, category: "Backend" },
  { name: "Rust", level: 2, category: "Backend" },
  { name: "MongoDB", level: 4, category: "Backend" },
  { name: "progress...", level: 3, category: "Backend" },

  // DevOps
  { name: "Docker", level: 2, category: "DevOps" },
  { name: "AWS", level: 2, category: "DevOps" },
  { name: "progress...", level: 3, category: "DevOps" },

  // Tools
  { name: "Git", level: 5, category: "Tools" },
  { name: "Figma", level: 4, category: "Tools" },
  { name: "NeoVim", level: 3, category: "Tools" },
  { name: "progress...", level: 3, category: "Tools" },

  // Web3
  { name: "Sui Move", level: 3, category: "Web3" },
  { name: "progress...", level: 3, category: "Web3" },
];
