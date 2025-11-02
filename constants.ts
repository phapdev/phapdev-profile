import type { JourneyEntry, Project, Skill, Theme, ThemeName } from "./types";
import suiSimulatorImage from "./src/assets/sui-simulator.png";
import dongNaiTravelImage from "./src/assets/dong-nai-travel.png";

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "Sui-simulator",
    description: "An open-source project for sui developers",
    tech: ["VScode Extension", "Sui Blockchain", "React", "TypeScript"],
    imageUrl: suiSimulatorImage,
    liveUrl:
      "https://marketplace.visualstudio.com/items?itemName=weminal-labs.sui-simulator-vscode",
    repoUrl: "https://github.com/Weminal-labs/sui-simulator-vscode",
  },
  {
    id: 2,
    title: "DongNai Travel",
    description:
      "Application about introducing tourist places or hanging out in Dong Nai Province (Viet Nam)",
    tech: [
      "Typescript",
      "MongoDB",
      "Expo",
      "React-Native",
      "Express",
      "GoogleAPI",
      "Cloudinary",
      "GPT",
    ],
    imageUrl: dongNaiTravelImage,
    liveUrl: "https://www.youtube.com/watch?v=6lMZkIQiZ68",
    repoUrl: "https://github.com/Code4life-Labs/dongnai-travel",
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


export const JOURNEY_DATA: JourneyEntry[] = [
  {
    id: 0,
    role: "Student",
    company: "Dong Nai Technology University",
    period: "9/2020 - 6/2025",
    details: [
      "Studied at Dong Nai Technology University, specializing in Software Engineering.",
      "Graduated with a Software Engineer degree."
    ]
  },
  {
      id: 1,
      role: "Software Engineer",
      company: "VBI Academy",
      period: "6/2025 - 6/2026",
      details: [
          "Developed a web application gaming platform integrating with Unity Engine and blockchain technology Avail, OpenCampus, Sui blockchain, etc. using React and TypeScript.",
          "Implemented a RESTful API for game data using Node.js and Express and MongoDB.",
          "Integrated with a database for storing and retrieving game data."
      ]
  },
  {
      id: 2,
      role: "Đang Thực Hiện Nghĩa Vụ Quân Sự!!!",
      company: "Quân Đội Nhân Dân Việt Nam",
      period: "6/2025 - present",
      details: []
  },
  
];

export const THEMES: Record<ThemeName, Theme> = {
  'holo-cyan': {
    name: 'holo-cyan',
    colors: { primary: '#00ffff', secondary: '#ff00ff' },
  },
  'synth-magenta': {
    name: 'synth-magenta',
    colors: { primary: '#ff00ff', secondary: '#00ffff' },
  },
  'plasma-green': {
    name: 'plasma-green',
    colors: { primary: '#00ff00', secondary: '#ffff00' },
  },
  'solar-flare': {
    name: 'solar-flare',
    colors: { primary: '#ff8c00', secondary: '#ff4500' },
  },
};