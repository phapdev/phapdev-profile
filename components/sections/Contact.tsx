import React, { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Send } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const ContactPage: React.FC = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Transmitting...");
    // Mock form submission
    setTimeout(() => {
      setStatus("Signal received. I will reply shortly.");
      const form = e.target as HTMLFormElement;
      form.reset();
      setTimeout(() => setStatus(""), 5000);
    }, 1500);
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-glow mb-2 text-center"
          variants={itemVariants}
        >
          Open Comms Channel
        </motion.h1>
        <motion.p
          className="text-accent/80 text-center mb-8"
          variants={itemVariants}
        >
          Have a project, a question, or just want to connect? Send a signal.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Callsign (Name)"
              required
              className="bg-base/50 border border-primary/30 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Frequency (Email)"
              required
              className="bg-base/50 border border-primary/30 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full bg-base/50 border border-primary/30 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary/80 text-base font-bold rounded-md hover:bg-primary hover:text-base hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-all"
            >
              <Send size={20} className="mr-2" />
              Transmit Message
            </button>
          </div>
          {status && <p className="text-center mt-4 text-primary">{status}</p>}
        </motion.form>

        <motion.div
          className="flex items-center justify-center space-x-6 mt-12"
          variants={itemVariants}
        >
          <a
            href="https://facebook.com/phapdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-primary transition-colors"
          >
            <Facebook size={32} />
          </a>
          <a
            href="https://github.com/phapdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-primary transition-colors"
          >
            <Github size={32} />
          </a>
          <a
            href="https://linkedin.com/in/phapdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-primary transition-colors"
          >
            <Linkedin size={32} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
