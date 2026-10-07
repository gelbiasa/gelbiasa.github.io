import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { terminalTranslations } from '../../data/terminalTranslations';

export default function HiddenTerminal({ onHireMe }) {
  const [termLang, setTermLang] = useState(() => localStorage.getItem('portfolioTerminalLang') || 'en');
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const dragControls = useDragControls();
  
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
          drag={!isFullscreen}
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.95, y: 20, x: '-50%', left: '50%', top: '20%' }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: isFullscreen ? 0 : '-50%',
            left: isFullscreen ? 0 : '50%',
            top: isFullscreen ? 0 : '15%',
            width: isFullscreen ? '100vw' : '800px',
            height: isFullscreen ? '100vh' : '450px',
            maxWidth: isFullscreen ? '100vw' : '95vw',
            maxHeight: isFullscreen ? '100vh' : '85vh',
            borderRadius: isFullscreen ? '0px' : '6px'
          }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed z-[99999] bg-[#0c0c0c] border border-[#333] shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono text-sm flex flex-col overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          {/* Windows CMD Header */}
          <div 
            className="flex items-center justify-between bg-[#1e1e1e] select-none h-8"
            onPointerDown={(e) => {
              if (!isFullscreen) dragControls.start(e);
            }}
            onDoubleClick={() => setIsFullscreen(!isFullscreen)}
            style={{ cursor: isFullscreen ? 'default' : 'grab' }}
          >
            <div className="flex gap-2 items-center px-2 flex-1 overflow-hidden">
              <span className="text-[#cccccc] text-[10px] bg-black px-1.5 py-[1px] border border-[#333] hidden sm:block">C:\_</span>
              <div className="text-[#cccccc] text-xs font-sans truncate">
                Command Prompt - GelbyOS v2.0
              </div>
            </div>
            
            {/* Windows Window Controls */}
            <div className="flex h-full">
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-12 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors"
                title="Minimize"
              >
                <div className="w-[10px] h-[1px] bg-current translate-y-1" />
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="w-12 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors"
                title={isFullscreen ? "Restore Down" : "Maximize"}
              >
                <div className={isFullscreen 
                  ? "w-[9px] h-[9px] border border-current relative after:content-[''] after:absolute after:-top-[3px] after:-right-[3px] after:w-[9px] after:h-[9px] after:border-t after:border-r after:border-current" 
                  : "w-[10px] h-[10px] border border-current"} 
                />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white text-gray-400 transition-colors"
                title="Close"
              >
                <FiX size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            className="flex-1 p-3 md:p-4 overflow-y-auto text-[#cccccc] bg-black [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-thumb]:bg-[#4d4d4d] [&::-webkit-scrollbar-track]:bg-[#1e1e1e]"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="mb-4">
              <div className="text-[#cccccc]">Microsoft Windows [Version 10.0.22631.3296]</div>
              <div className="text-[#cccccc]">(c) Microsoft Corporation. All rights reserved.</div>
            </div>

            {history.map((line, i) => (
              <div key={i} className="mb-1 leading-relaxed">
                {line.type === 'system' ? (
                  <span className={line.text.includes('Access granted') ? 'text-green-400 font-bold' : 'text-[#cccccc]'}>
                    {line.text}
                  </span>
                ) : (
                  <div className="flex">
                    <span className="text-[#cccccc] mr-2">C:\Users\guest&gt;</span>
                    <span className="text-[#cccccc]">{line.text}</span>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center mt-1">
              <span className="text-[#cccccc] mr-2">C:\Users\guest&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none text-[#cccccc] border-none focus:ring-0 p-0 shadow-none font-mono"
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
