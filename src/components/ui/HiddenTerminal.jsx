import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { terminalTranslations } from '../../data/terminalTranslations';

export default function HiddenTerminal({ onHireMe }) {
  const [termLang, setTermLang] = useState(() => localStorage.getItem('portfolioTerminalLang') || 'en');
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [size, setSize] = useState({ w: 800, h: 450 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [input, setInput] = useState('');
  const dragControls = useDragControls();

  const handleResizeStart = (e, edge) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.w;
    const startH = size.h;

    const onMove = (moveEv) => {
      let newW = startW;
      let newH = startH;
      if (edge === 'right' || edge === 'br') newW = startW + (moveEv.clientX - startX);
      if (edge === 'bottom' || edge === 'br') newH = startH + (moveEv.clientY - startY);
      
      setSize({ 
        w: Math.max(300, newW), 
        h: Math.max(200, newH) 
      });
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
  
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
          onDragEnd={(e, info) => {
            setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: isFullscreen ? 0 : position.x,
            y: isFullscreen ? 0 : position.y,
            left: isFullscreen ? 0 : 'max(2vw, calc(50vw - 400px))',
            top: isFullscreen ? 0 : '15vh',
            width: isFullscreen ? '100vw' : size.w,
            height: isFullscreen ? '100vh' : size.h,
            maxWidth: isFullscreen ? '100vw' : '95vw',
            maxHeight: isFullscreen ? '100vh' : '85vh',
            borderRadius: isFullscreen ? '0px' : '6px'
          }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed z-[99999] bg-[#050505]/85 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] font-mono text-sm flex flex-col overflow-hidden"
          style={{ touchAction: 'none', boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset' }}
        >
          {/* Resize Handles */}
          {!isFullscreen && (
            <>
              <div 
                className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-50"
                onPointerDown={(e) => handleResizeStart(e, 'right')}
              />
              <div 
                className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-50"
                onPointerDown={(e) => handleResizeStart(e, 'bottom')}
              />
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                onPointerDown={(e) => handleResizeStart(e, 'br')}
              />
            </>
          )}

          {/* Elegant Custom Header */}
          <div 
            className="flex items-center justify-between bg-black/40 border-b border-white/5 select-none h-10"
            onPointerDown={(e) => {
              if (!isFullscreen) dragControls.start(e);
            }}
            onDoubleClick={() => setIsFullscreen(!isFullscreen)}
            style={{ cursor: isFullscreen ? 'default' : 'grab' }}
          >
            <div className="flex gap-3 items-center px-4 flex-1 overflow-hidden">
              <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10">
                <span className="text-accent text-[10px] font-bold">λ</span>
              </div>
              <div className="text-gray-300 text-xs tracking-wider font-semibold truncate">
                TERMINAL // GELBY_OS
              </div>
            </div>
            
            {/* Minimalist Controls */}
            <div className="flex h-full px-2 gap-1 items-center">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 text-gray-400 transition-all"
                title={isFullscreen ? "Restore Down" : "Maximize"}
              >
                <div className={isFullscreen 
                  ? "w-2.5 h-2.5 border-2 border-current relative after:content-[''] after:absolute after:-top-1.5 after:-right-1.5 after:w-2.5 after:h-2.5 after:border-t-2 after:border-r-2 after:border-current" 
                  : "w-3 h-3 border-2 border-current rounded-sm"} 
                />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-500/80 hover:text-white text-gray-400 transition-all"
                title="Close"
              >
                <FiX size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            className="flex-1 p-4 md:p-5 overflow-y-auto text-gray-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="mb-6 opacity-70">
              <div className="text-accent font-bold tracking-widest text-xs mb-1">=== SYSTEM INITIALIZED ===</div>
              <div className="text-gray-400 text-xs">Kernel v2.0.0-stable | Encryption: Active</div>
            </div>

            {history.map((line, i) => (
              <div key={i} className="mb-1.5 leading-relaxed">
                {line.type === 'system' ? (
                  <span className={line.text.includes('Access granted') ? 'text-accent font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-gray-300'}>
                    {line.text}
                  </span>
                ) : (
                  <div className="flex">
                    <span className="text-accent mr-2">λ</span>
                    <span className="text-gray-400 mr-2">guest ~</span>
                    <span className="text-gray-200">{line.text}</span>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center mt-2">
              <span className="text-accent mr-2">λ</span>
              <span className="text-gray-400 mr-2">guest ~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none text-gray-100 border-none focus:ring-0 p-0 shadow-none font-mono selection:bg-accent/30"
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
