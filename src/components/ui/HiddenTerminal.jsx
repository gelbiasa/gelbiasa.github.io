import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function HiddenTerminal({ onHireMe }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to GelbyOS v2.0.0.' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Key listener for Ctrl + ` or typing 'sudo' (Easter Egg style)
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Shortcut to open/close
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Easter egg typing 'sudo' on keyboard anywhere
      if (!isOpen && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
        keyBuffer += e.key.toLowerCase();
        if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);
        if (keyBuffer.includes('sudo')) {
          setIsOpen(true);
          keyBuffer = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: cmd }];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: 'Available commands:' });
          newHistory.push({ type: 'system', text: '  about    - Who is Gelby?' });
          newHistory.push({ type: 'system', text: '  skills   - Tech stack' });
          newHistory.push({ type: 'system', text: '  clear    - Clear terminal' });
          newHistory.push({ type: 'system', text: '  sudo hire gelby - [RESTRICTED]' });
          break;
        case 'about':
          newHistory.push({ type: 'system', text: 'M. Isroqi Gelby Firmansyah - Laravel Expert & Full Stack Web Developer.' });
          break;
        case 'skills':
          newHistory.push({ type: 'system', text: 'Laravel, PHP, React, Tailwind CSS, MySQL, PostgreSQL, MongoDB, Flutter.' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'sudo hire gelby':
          newHistory.push({ type: 'system', text: 'Checking credentials...' });
          newHistory.push({ type: 'system', text: 'Access granted! Initiating premium hire sequence...' });
          setTimeout(() => {
            setIsOpen(false);
            if (onHireMe) onHireMe();
          }, 1500);
          break;
        case 'sudo':
          newHistory.push({ type: 'system', text: 'usage: sudo <command>' });
          newHistory.push({ type: 'system', text: 'Hint: Try "sudo hire gelby"' });
          break;
        case '':
          break;
        default:
          if (cmd.startsWith('sudo ')) {
            newHistory.push({ type: 'system', text: `gelby is not in the sudoers file. This incident will be reported.` });
          } else {
            newHistory.push({ type: 'system', text: `Command not found: ${cmd}. Type "help".` });
          }
          break;
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[99999] h-[50vh] min-h-[300px] bg-[#0a0e14]/95 backdrop-blur-xl border-b border-accent/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-mono text-sm flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/60">
            <div className="flex gap-2">
              <div 
                className="w-3.5 h-3.5 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors" 
                onClick={() => setIsOpen(false)} 
                title="Close"
              />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
            </div>
            <div className="text-gray-400 text-xs font-bold tracking-wider">guest@gelby-portfolio:~</div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <FiX size={16} />
            </button>
          </div>

          {/* Terminal Body */}
          <div 
            className="flex-1 p-4 md:p-6 overflow-y-auto text-gray-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/10"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-1.5 leading-relaxed">
                {line.type === 'system' ? (
                  <span className={line.text.includes('Access granted') ? 'text-accent font-bold' : 'text-gray-300'}>
                    {line.text}
                  </span>
                ) : (
                  <div className="flex">
                    <span className="text-emerald-400 mr-1">guest@portfolio</span>
                    <span className="text-gray-400 mr-1">:</span>
                    <span className="text-blue-400 mr-2">~</span>$ 
                    <span className="ml-2 text-gray-100">{line.text}</span>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center mt-2">
              <span className="text-emerald-400 mr-1">guest@portfolio</span>
              <span className="text-gray-400 mr-1">:</span>
              <span className="text-blue-400 mr-2">~</span>$ 
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 ml-2 bg-transparent outline-none text-gray-100 border-none focus:ring-0 p-0 shadow-none font-mono"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} className="h-4" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
