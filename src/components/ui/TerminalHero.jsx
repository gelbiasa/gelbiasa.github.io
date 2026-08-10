import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiRefreshCw } from 'react-icons/fi';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function TerminalHero() {
  const { t, language } = useLanguage();
  const [phase, setPhase] = useState('terminal'); // 'terminal', 'transition', 'hero'
  const [cmdText, setCmdText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [showProgress, setShowProgress] = useState(false);
  const isAnimating = useRef(false);

  const startAnimation = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    // Reset state
    setPhase('terminal');
    setCmdText('');
    setShowCursor(true);
    setLogs([]);
    setProgress(0);
    setShowProgress(false);

    await sleep(800);

    // Type command
    const textToType = 'php artisan profile:resolve --expert';
    let currentText = '';
    for (let i = 0; i < textToType.length; i++) {
      currentText += textToType.charAt(i);
      setCmdText(currentText);
      await sleep(40 + Math.random() * 30);
    }
    
    await sleep(400);
    setShowCursor(false);

    // INFO log
    setLogs((prev) => [...prev, { type: 'INFO', text: t('home.terminalResolving') || 'Resolving developer identity...' }]);
    await sleep(600);

    // Loading Bar
    setShowProgress(true);
    const totalBars = 25;
    for(let i = 1; i <= totalBars; i++) {
      setProgress(Math.floor((i / totalBars) * 100));
      await sleep(30);
    }

    await sleep(500);

    // DONE log
    setLogs((prev) => [...prev, { type: 'DONE', text: t('home.terminalSuccess') || 'Identity established successfully.' }]);
    
    await sleep(800);

    setPhase('transition');
    await sleep(400); // Wait for fade out
    setPhase('hero');
    isAnimating.current = false;
  };

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Render loading bar
  const renderLoadingBar = () => {
    if (!showProgress) return null;
    const totalBars = 25;
    const filledCount = Math.floor((progress / 100) * totalBars);
    const emptyCount = totalBars - filledCount;
    const filledStr = '▓'.repeat(filledCount);
    const emptyStr = '░'.repeat(emptyCount);
    
    return (
      <div className="text-gray-400 mb-2 font-mono">
        [<span className="text-emerald-500">{filledStr}</span>{emptyStr}] {progress}%
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-[140px] sm:min-h-[160px] md:min-h-[170px] flex items-center mb-0 md:mb-1">
      
      <AnimatePresence mode="wait">
        {/* TERMINAL PHASE */}
        {(phase === 'terminal' || phase === 'transition') && (
          <motion.div 
            key="terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute z-10 w-full max-w-2xl"
          >
            <div className="bg-[#11141a] rounded-xl border border-gray-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(16,185,129,0.1)] overflow-hidden">
              {/* Header */}
              <div className="flex items-center px-4 py-3 border-b border-gray-800/60 bg-[#161a22]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs text-gray-500 font-mono flex items-center">
                  <svg className="w-3 h-3 mr-1.5 opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                  gelby — bash — 80x24
                </div>
              </div>

              {/* Body */}
              <div className="p-4 md:p-5 font-mono text-xs md:text-sm leading-relaxed h-[120px] md:h-[135px] overflow-hidden flex flex-col">
                <div className="text-gray-300">
                  <span className="text-emerald-400 font-medium">gelby@portfolio</span><span className="text-gray-400">:</span><span className="text-blue-400">~/app</span>$ {' '}
                  <span className="text-gray-100">{cmdText}</span>
                  {showCursor && <span className="inline-block w-2 h-[1.1em] bg-emerald-500 align-text-bottom animate-pulse ml-0.5" />}
                </div>
                
                <div className="mt-2 text-gray-300">
                  {logs.map((log, idx) => (
                    <div key={idx} className="mb-2">
                      <span className={`px-1.5 py-0.5 text-[10px] md:text-xs font-bold mr-2 rounded-sm text-black ${log.type === 'INFO' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                        {log.type}
                      </span>
                      <span className={log.type === 'DONE' ? 'text-gray-100' : 'text-gray-300'}>
                        {log.text}
                      </span>
                    </div>
                  ))}
                  {renderLoadingBar()}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* HERO TEXT PHASE */}
        {phase === 'hero' && (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-full"
          >
            <h1 
              className="font-black tracking-tight text-white font-display leading-[1.1] whitespace-nowrap"
              style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)' }}
            >
              M. Isroqi Gelby Firmansyah.
            </h1>
            
            <div className="mt-3 md:mt-4 flex flex-row items-center flex-wrap gap-4 md:gap-6">
              <p className="text-gray-400 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
                {language === 'en' ? (
                  <>
                    <span className="text-emerald-400" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>Laravel Expert</span> & Database Engineer
                  </>
                ) : (
                  <>
                    <span className="text-emerald-400" style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>Pakar Laravel</span> & Rekayasa Basis Data
                  </>
                )}
              </p>
              
              {/* Subtle Replay Button */}
              <button 
                onClick={startAnimation}
                className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-gray-400 hover:text-emerald-400 transition-colors opacity-80 hover:opacity-100"
              >
                <FiRefreshCw /> Ulangi Animasi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
