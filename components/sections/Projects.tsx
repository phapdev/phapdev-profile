
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { PROJECTS_DATA } from '../../constants';
import type { Project } from '../../types';

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({ project, onSelect }) => (
  <motion.div
    layoutId={`card-container-${project.id}`}
    onClick={onSelect}
    className="glassmorphism rounded-lg overflow-hidden cursor-pointer group relative"
    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover group-hover:opacity-50 transition-opacity" />
    <div className="p-4">
      <h3 className="text-xl font-bold text-primary">{project.title}</h3>
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-accent font-bold">View Details</span>
      </div>
    </div>
  </motion.div>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div className="absolute inset-0 bg-base/80 backdrop-blur-sm" onClick={onClose}></div>
        <motion.div
            layoutId={`card-container-${project.id}`}
            className="glassmorphism rounded-xl overflow-hidden w-full max-w-3xl relative z-10"
        >
            <div className="relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-60 object-cover" />
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full bg-base/50 text-accent hover:bg-base transition-colors">
                    <X size={24} />
                </button>
            </div>
            <div className="p-6">
                <h2 className="text-3xl font-bold text-primary mb-2">{project.title}</h2>
                <p className="text-accent/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                        <span key={t} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">{t}</span>
                    ))}
                </div>
                <div className="flex space-x-4">
                    {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-accent hover:text-primary transition-colors"><ExternalLink size={18} /><span>Live Demo</span></a>}
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-accent hover:text-primary transition-colors"><Github size={18} /><span>Source Code</span></a>}
                </div>
            </div>
        </motion.div>
    </motion.div>
);

export const ProjectsPage: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-glow mb-8">Project Simulations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS_DATA.map(project => (
                    <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />
                ))}
            </div>
            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </div>
    );
};
