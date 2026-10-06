import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { terminalTranslations } from '../../data/terminalTranslations';

export default function HiddenTerminal({ onHireMe }) {
  const [termLang, setTermLang] = useState(() => localStorage.getItem('portfolioTerminalLang') || 'en');
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const [history, setHistory] = useState([
    { type: 'system', text: terminalTranslations[localStorage.getItem('portfolioTerminalLang') || 'en'].welcome },
    { type: 'system', text: terminalTranslations[localStorage.getItem('portfolioTerminalLang') || 'en'].hint }
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

  useEffect(() => {
    localStorage.setItem('portfolioTerminalLang', termLang);
  }, [termLang]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: cmd }];
      const t = terminalTranslations[termLang];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: t.helpHeader });
          newHistory.push({ type: 'system', text: t.helpAbout });
          newHistory.push({ type: 'system', text: t.helpSkills });
          newHistory.push({ type: 'system', text: t.helpLangId });
          newHistory.push({ type: 'system', text: t.helpLangEn });
          newHistory.push({ type: 'system', text: t.helpClear });
          newHistory.push({ type: 'system', text: t.helpHire });
          break;
        case 'about':
          newHistory.push({ type: 'system', text: t.aboutMsg });
          break;
        case 'skills':
          newHistory.push({ type: 'system', text: t.skillsMsg });
          break;
        case 'lang id':
        case 'language id':
          setTermLang('id');
          newHistory.push({ type: 'system', text: terminalTranslations.id.langChangeId });
          break;
        case 'lang en':
        case 'language en':
          setTermLang('en');
          newHistory.push({ type: 'system', text: terminalTranslations.en.langChangeEn });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'sudo hire gelby':
          newHistory.push({ type: 'system', text: t.hireCheck });
          newHistory.push({ type: 'system', text: t.hireGranted });
          setTimeout(() => {
            setIsOpen(false);
            if (onHireMe) onHireMe();
          }, 1500);
          break;
        case 'sudo':
          newHistory.push({ type: 'system', text: t.sudoUsage });
          newHistory.push({ type: 'system', text: t.sudoHint });
          break;
        case '':
          break;
        default:
          if (cmd.startsWith('sudo ')) {
            newHistory.push({ type: 'system', text: t.sudoReport });
          } else {
            newHistory.push({ type: 'system', text: `${t.notFound} ${cmd}. ${t.typeHelp}` });
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
