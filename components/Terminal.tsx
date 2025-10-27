import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { PROJECTS_DATA, SKILLS_DATA } from '../constants';
import { askGeminiWithThinking } from '../services/geminiService';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system' | 'thinking';
  content: string;
}

interface TerminalProps {
  closeTerminal: () => void;
}

const helpText = `
Available commands:
  help            - Shows this help message.
  whois           - Displays information about phapdev.
  skills          - Lists technical skills.
  projects        - Lists available projects.
  contact         - Shows contact information.
  ask "<query>"   - Ask Gemini a complex question. (e.g., ask "explain quantum computing")
  clear           - Clears the terminal screen.
  exit            - Closes the terminal.
`;

const whoisText = `
phapdev // Full-Stack Developer & Digital Architect
Mission: To craft elegant, high-performance digital experiences by bridging the gap between innovative design and robust engineering. Specializing in building scalable applications with a futuristic aesthetic.
`;

const contactText = `
// Comms Channels
Email: luongphap1810@gmail.com
GitHub: github.com/phapdev
LinkedIn: linkedin.com/in/phapdev
`;

export const Terminal: React.FC<TerminalProps> = ({ closeTerminal }) => {
  const [history, setHistory] = useState<TerminalLine[]>([{ type: 'system', content: 'Terminal Initialized. Type `help` for commands.' }]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleCommand = async (command: string) => {
    const newHistory = [...history, { type: 'input' as const, content: command }];
    setHistory(newHistory);
    setIsProcessing(true);

    const [cmd, ...args] = command.trim().split(' ');
    const fullArgs = args.join(' ');

    let output: TerminalLine;

    switch (cmd.toLowerCase()) {
      case 'help':
        output = { type: 'output', content: helpText };
        break;
      case 'whois':
        output = { type: 'output', content: whoisText };
        break;
      case 'skills':
        const skillsList = SKILLS_DATA.map(s => `${s.name.padEnd(15, ' ')} [${s.category}]`).join('\n');
        output = { type: 'output', content: `// Skills Matrix\n${skillsList}` };
        break;
      case 'projects':
        const projectList = PROJECTS_DATA.map(p => `- ${p.title}`).join('\n');
        output = { type: 'output', content: `// Project Simulations\n${projectList}` };
        break;
      case 'contact':
        output = { type: 'output', content: contactText };
        break;
      case 'clear':
        setHistory([]);
        setIsProcessing(false);
        return;
      case 'exit':
        closeTerminal();
        return;
      case 'ask':
        if (!fullArgs) {
          output = { type: 'error', content: 'Usage: ask "<your question>"' };
        } else {
          setHistory(prev => [...prev, { type: 'thinking', content: 'Engaging Gemini Pro with max thinking budget...' }]);
          const geminiResponse = await askGeminiWithThinking(fullArgs);
          output = { type: 'output', content: geminiResponse };
        }
        break;
      default:
        output = { type: 'error', content: `Command not found: ${cmd}` };
        break;
    }

    setHistory(prev => [...prev, output]);
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isProcessing) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute bottom-0 left-0 right-0 h-[40%] z-40 glassmorphism border-t-2 border-primary/50 font-mono flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <header className="flex items-center justify-between p-2 bg-base/50 border-b border-primary/20">
        <p className="text-sm text-primary">@phapdev:~$</p>
        <button onClick={closeTerminal} className="text-accent/70 hover:text-accent"><X size={18} /></button>
      </header>

      <div ref={scrollRef} className="flex-grow p-2 overflow-y-auto text-sm">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.type === 'input' && (
              <div className="flex items-center">
                <span className="text-primary"><ChevronRight size={16} /></span>
                <span className="ml-1 text-accent">{line.content}</span>
              </div>
            )}
            {line.type === 'output' && <p className="text-accent/90">{line.content}</p>}
            {line.type === 'error' && <p className="text-red-400">{line.content}</p>}
            {line.type === 'system' && <p className="text-red-500">{line.content}</p>}
            {line.type === 'thinking' && <p className="text-primary animate-pulse">{line.content}</p>}
          </div>
        ))}
        {isProcessing && !history.some(h => h.type === 'thinking') && <div className="text-primary animate-pulse">Processing...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center p-2 border-t border-primary/20">
        <span className="text-primary"><ChevronRight size={16} /></span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none ml-2 text-accent"
          placeholder={isProcessing ? "..." : "Enter command"}
          disabled={isProcessing}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </form>
    </motion.div>
  );
};
