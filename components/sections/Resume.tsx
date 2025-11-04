import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import { JOURNEY_DATA } from '../../constants';
import type { JourneyEntry } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const CVSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div variants={itemVariants} className="mb-8">
    <h2 className="text-2xl font-bold text-primary mb-3 border-b-2 border-primary/30 pb-2">{title}</h2>
    <div className="text-accent/90 space-y-4">
      {children}
    </div>
  </motion.div>
);

const Job: React.FC<{ role: string; company: string; period: string; details: string[] }> = ({ role, company, period, details }) => (
  <div>
    <h3 className="text-lg font-semibold text-accent">{role}</h3>
    <p className="text-secondary font-medium">{company} | {period}</p>
    <ul className="list-disc list-inside mt-2 space-y-1 text-accent/80">
      {details.map((detail, i) => <li key={i}>{detail}</li>)}
    </ul>
  </div>
);

export const ResumePage: React.FC = () => {
  const handleDownload = () => {
    // This assumes a CV PDF is placed in a public/assets folder.
    const link = document.createElement('a');
    link.href = '/assets/phapdev_CV.pdf'; 
    link.setAttribute('download', 'phapdev_CV.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const workExperience = JOURNEY_DATA.filter((item: JourneyEntry) => !item.role.toLowerCase().includes('student'));
  const education = JOURNEY_DATA.find((item: JourneyEntry) => item.role.toLowerCase().includes('student'));


  return (
    <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto relative">
       <div className="absolute top-4 right-4 z-20">
            <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0, 255, 255, 0.7)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary/80 text-base font-bold rounded-md hover:bg-primary transition-all"
                aria-label="Download CV"
            >
                <Download size={20} />
                Download CV
            </motion.button>
        </div>

      <motion.div
        className="glassmorphism p-6 md:p-8 rounded-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center border-b-2 border-secondary/30 pb-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-glow">phapdev</h1>
          <p className="text-xl md:text-2xl text-primary mt-2">Software Engineer</p>
          <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-accent">
              <span className="flex items-center gap-2"><Mail size={14}/> luongphap1810@gmail.com</span>
              <span className="flex items-center gap-2"><Phone size={14}/> +84 397254268</span>
              <span className="flex items-center gap-2"><MapPin size={14}/> Ho Chi Minh City, Vietnam</span>
          </div>
           <div className="flex justify-center items-center gap-4 mt-3">
              <a href="https://github.com/phapdev" target="_blank" rel="noopener noreferrer" className="text-accent/70 hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="https://linkedin.com/in/phapdev" target="_blank" rel="noopener noreferrer" className="text-accent/70 hover:text-primary transition-colors"><Linkedin size={20} /></a>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <CVSection title="Professional Summary">
            <p>
            A software engineer on the lookout for new technologies, languages, IDEs,.... interesting things in the internet world.
            </p>
        </CVSection>
        
        {/* Work Experience */}
        <CVSection title="Work Experience">
          {[...workExperience].reverse().map((item: JourneyEntry) => (
            <Job 
                key={item.id}
                role={item.role}
                company={item.company}
                period={item.period}
                details={item.details}
            />
          ))}
          {education && education.company !== "" && (
            <Job 
                key={education.id}
                role={education.role}
                company={education.company}
                period={education.period}
                details={education.details}
            />
          )}
        </CVSection>

        {/* Technical Skills */}
        <CVSection title="Technical Skills">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <h4 className="font-semibold text-accent mb-1">Frontend</h4>
                    <ul className="list-disc list-inside text-accent/80">
                       <li>React, Next.js</li>
                       <li>TypeScript, JavaScript</li>
                       <li>TailwindCSS, CSS</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-accent mb-1">Backend</h4>
                    <ul className="list-disc list-inside text-accent/80">
                       <li>Node.js, Express</li>
                       <li>Rust</li>
                       <li>MongoDB</li>
                       <li>REST APIs</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-accent mb-1">DevOps & Cloud</h4>
                    <ul className="list-disc list-inside text-accent/80">
                       <li>Docker</li>
                       <li>AWS</li>
                       <li>CI/CD (GitHub Actions)</li>
                       <li>Git, GitHub</li>
                    </ul>
                </div>
            </div>
        </CVSection>

        {/* Education */}
         <CVSection title="Education">
            <div>
                 <h3 className="text-lg font-semibold text-accent">Software Engineer</h3>
                 <p className="text-secondary font-medium">Dong Nai Technology University | 2020 - 6/2025</p>
            </div>
        </CVSection>
      </motion.div>
    </div>
  );
};