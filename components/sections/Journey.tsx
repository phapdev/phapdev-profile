import React from 'react';
import { motion } from 'framer-motion';
import { JOURNEY_DATA } from '../../constants';
import type { JourneyEntry } from '../../types';

const TimelineItem: React.FC<{ entry: JourneyEntry; isLast: boolean }> = ({ entry, isLast }) => {
  return (
    <motion.div
      className="flex gap-x-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline Connector */}
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/50 border-2 border-primary flex items-center justify-center">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulseGlow"></div>
        </div>
        {!isLast && <div className="w-0.5 flex-grow bg-primary/30 mt-2"></div>}
      </div>

      {/* Content */}
      <div className={`pb-8 ${isLast ? '' : ''} w-full`}>
          <div className="glassmorphism p-4 rounded-lg border-l-4 border-secondary">
             <p className="text-sm text-secondary mb-1">{entry.period}</p>
             <h3 className="text-xl font-bold text-accent">{entry.role}</h3>
             <p className="font-semibold text-primary mb-3">{entry.company}</p>
             <ul className="list-disc list-inside space-y-1 text-accent/80 text-sm">
                {entry.details.map((detail, i) => <li key={i}>{detail}</li>)}
             </ul>
          </div>
      </div>
    </motion.div>
  );
};

export const JourneyPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-glow mb-8">Work Journey</h1>
      <div className="relative">
        {JOURNEY_DATA.map((entry, index) => (
          // Fix: Corrected typo from JOUR_DATA to JOURNEY_DATA.
          <TimelineItem key={entry.id} entry={entry} isLast={index === JOURNEY_DATA.length - 1} />
        ))}
      </div>
    </div>
  );
};
