import React, { useState } from 'react';
// Fix: Explicitly type pageVariants to resolve type inference issue with framer-motion
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { JOURNEY_DATA } from '../../constants';
import type { JourneyEntry } from '../../types';

const pageVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? '100%' : '-100%',
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 150, damping: 25 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? '100%' : '-100%',
    transition: { type: 'spring', stiffness: 150, damping: 25 },
  }),
};


const JourneyDetail: React.FC<{ entry: JourneyEntry; onBack: () => void; }> = ({ entry, onBack }) => {
  return (
    <motion.div
      key="journey-detail"
      custom={1}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full flex flex-col"
    >
      <div className="shrink-0 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:text-glow mb-4 hover:cursor-pointer" >
          <ArrowLeft size={16} /> Return to Timeline
        </button>
        <p className="text-sm text-secondary">{entry.period}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-glow">{entry.role}</h1>
        <h2 className="text-xl md:text-2xl text-primary">{entry.company}</h2>
      </div>
      <div className="grow overflow-y-auto pr-2">
        <div className="space-y-8">
            {entry.gallery.map((item, index) => (
                <motion.div 
                    key={index}
                    className="glassmorphism rounded-lg overflow-hidden flex flex-col items-center justify-center max-w-2xl mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <img src={item.imageUrl} alt={item.description} className="w-full h-full object-cover" />
                    <p className="p-4 text-accent/80 italic">{item.description}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};


const TimelineItem: React.FC<{ entry: JourneyEntry; isLast: boolean; onSelect: () => void }> = ({ entry, isLast, onSelect }) => {
  return (
    <motion.div
      className="flex gap-x-4 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline Connector */}
      <div className="flex flex-col items-center">
        <div className="shrink-0 w-5 h-5 rounded-full bg-primary/50 border-2 border-primary flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulseGlow"></div>
        </div>
        {!isLast && <div className="w-0.5 grow bg-primary/30 mt-2"></div>}
      </div>

      {/* Content */}
      <div className={`pb-8 w-full`}>
          <div 
            className="glassmorphism p-4 rounded-lg border-l-4 border-secondary relative overflow-hidden cursor-pointer"
            onClick={onSelect}
          >
             <div className="transition-opacity duration-300 group-hover:opacity-30">
                <p className="text-sm text-secondary mb-1">{entry.period}</p>
                <h3 className="text-xl font-bold text-accent">{entry.role}</h3>
                <p className="font-semibold text-primary mb-3">{entry.company}</p>
                <ul className="list-disc list-inside space-y-1 text-accent/80 text-sm">
                    {entry.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
             </div>
             <motion.div 
                className="absolute inset-0 flex items-center justify-end pr-6 bg-gradient-to-l from-base via-base/70 to-transparent"
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="flex items-center gap-2 font-bold text-primary text-glow">
                  View Details <ArrowRight size={20} />
                </span>
             </motion.div>
          </div>
      </div>
    </motion.div>
  );
};

export const JourneyPage: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<JourneyEntry | null>(null);
  const [direction, setDirection] = useState(1);

  const handleSelectEntry = (entry: JourneyEntry) => {
    setDirection(1);
    setSelectedEntry(entry);
  };

  const handleBack = () => {
    setDirection(-1);
    setSelectedEntry(null);
  };


  return (
    <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <AnimatePresence initial={false} custom={direction}>
        {!selectedEntry ? (
            <motion.div 
                key="journey-list"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full flex flex-col"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-glow mb-8">Work Journey</h1>
              <div className="relative">
                {JOURNEY_DATA.map((entry, index) => (
                  <TimelineItem 
                    key={entry.id} 
                    entry={entry} 
                    isLast={index === JOURNEY_DATA.length - 1} 
                    onSelect={() => handleSelectEntry(entry)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <JourneyDetail entry={selectedEntry} onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
};
