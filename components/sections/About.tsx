import React from "react";
import { motion } from "framer-motion";
import { SKILLS_DATA } from "../../constants";
import type { Skill } from "../../types";

const categories: Skill["category"][] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
  "Web3",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{
      scale: 1.1,
      zIndex: 10,
      boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
    }}
    className="glassmorphism p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-default"
  >
    <p className="font-bold text-accent text-sm md:text-accent">{skill.name}</p>
    <div className="flex mt-2 space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-1 w-4 md:w-5 rounded-full ${i < skill.level ? "bg-primary" : "bg-primary/20"}`}
        ></div>
      ))}
    </div>
  </motion.div>
);

export const AboutPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-glow mb-4">
        Personal File
      </h1>
      <p className="text-accent/80 max-w-4xl text-accent md:text-lg mb-8">
        I am phapdev.
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-glow mb-6">
        Skill Tree
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
              {category}
            </h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {SKILLS_DATA.filter((skill) => skill.category === category).map(
                (skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ),
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
