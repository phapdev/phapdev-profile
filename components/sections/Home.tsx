import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const HomePage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className="text-center flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-widest text-glow"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100 },
            },
          }}
        >
          phapdev
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl text-primary mt-4 font-light tracking-wider"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100 },
            },
          }}
        >
          <span className="inline-block bg-cyan-500/50 text-cyan-300 px-1 rounded">
            Developer
          </span>{" "}
          & software engineer
        </motion.h2>
        <motion.p
          className="text-md md:text-lg text-accent/80 mt-8 max-w-2xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100 },
            },
          }}
        >
          A software engineer on the lookout for new technologies, languages,
          IDEs,.... interesting things in the internet world.
        </motion.p>
      </motion.div>
    </div>
  );
};
