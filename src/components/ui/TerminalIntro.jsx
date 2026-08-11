import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SESSION_KEY = 'gelby_intro_shown';

export default function TerminalIntro({ onDone }) {
  const { t } = useLanguage();
  const [cmdText, setCmdText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    let isActive = true;

    const run = async () => {
      await sleep(600);

      // Type the artisan command
      const cmd = 'php artisan profile:resolve --expert';
      let cur = '';
      for (let i = 0; i < cmd.length; i++) {
        if (!isActive) return;
        cur += cmd[i];
        setCmdText(cur);
        await sleep(35 + Math.random() * 25);
      }

      if (!isActive) return;
      await sleep(350);
      if (!isActive) return;
      setShowCursor(false);

      // INFO line
      setLogs((p) => [...p, {
        type: 'INFO',
        text: t('home.terminalResolving') || 'Resolving developer identity...',
      }]);
      await sleep(500);
      if (!isActive) return;

      // Loading bar
      setShowProgress(true);
      for (let i = 1; i <= 25; i++) {
        if (!isActive) return;
        setProgress(Math.floor((i / 25) * 100));
        await sleep(25);
      }

      await sleep(400);
      if (!isActive) return;

      // DONE line
      setLogs((p) => [...p, {
        type: 'DONE',
        text: t('home.terminalSuccess') || 'Identity established successfully.',
      }]);

      await sleep(900);

      // Fade out & signal done
      setExiting(true);
      await sleep(700);
      if (!isActive) return;

      sessionStorage.setItem(SESSION_KEY, '1');
      onDone();
    };

    run();

    return () => {
      isActive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filledCount = Math.floor((progress / 100) * 25);
  const filledStr = '▓'.repeat(filledCount);
  const emptyStr = '░'.repeat(25 - filledCount);

  return createPortal(
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="terminal-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0b0d11]"
        >
          {/* Subtle scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-[120px]" />
          </div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl mx-6"
          >
            <div className="bg-[#11141a] rounded-2xl border border-gray-800 overflow-hidden shadow-[0_32px_80px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(16,185,129,0.12)]">
              {/* Mac-style header */}
              <div className="flex items-center px-4 py-3.5 border-b border-gray-800/60 bg-[#161a22]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto text-xs text-gray-500 font-mono flex items-center gap-1.5">
                  <svg className="w-3 h-3 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                  gelby — bash — 80x24
                </div>
              </div>

              {/* Body */}
              <div className="p-6 font-mono text-sm leading-relaxed h-[200px] flex flex-col">
                {/* Command line */}
                <div className="text-gray-300 mb-3">
                  <span className="text-emerald-400 font-medium">gelby@portfolio</span>
                  <span className="text-gray-600">:</span>
                  <span className="text-blue-400">~/app</span>
                  <span className="text-gray-400">$ </span>
                  <span className="text-gray-100">{cmdText}</span>
                  {showCursor && (
                    <span className="inline-block w-2 h-[1.1em] bg-emerald-500 align-text-bottom ml-0.5 animate-pulse" />
                  )}
                </div>

                {/* Logs */}
                <div className="space-y-1.5">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm text-black mr-2 ${log.type === 'INFO' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                        {log.type}
                      </span>
                      <span className={log.type === 'DONE' ? 'text-gray-100' : 'text-gray-400'}>
                        {log.text}
                      </span>
                    </motion.div>
                  ))}

                  {showProgress && (
                    <div className="text-gray-500">
                      [<span className="text-emerald-500">{filledStr}</span>{emptyStr}]
                      {' '}<span className="text-gray-300">{progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reflection */}
            <div className="h-8 mt-1 rounded-b-2xl bg-gradient-to-b from-[#11141a]/30 to-transparent blur-sm opacity-40 scale-x-[0.96] mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
