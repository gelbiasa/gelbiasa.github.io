import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiRefreshCw } from 'react-icons/fi';

// Cipher / Scramble decode effect
// Each character goes through random chars before settling on the real one
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function useCipherDecode(target, startTrigger, delay = 0, replayKey = 0) {
  const [displayed, setDisplayed] = useState(() => ' '.repeat(target.length));
  const [done, setDone] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    if (!startTrigger) return;
    
    // Reset state on replay
    setDisplayed(' '.repeat(target.length));
    setDone(false);

    let started = false;
    const timeout = setTimeout(() => {
      started = true;
      const startTime = performance.now();
      // Total reveal duration ms
      const totalDuration = 1200;
      // How many scramble cycles per character
      const scrambleCycles = 6;

      const frame = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        // How many characters are "locked in"
        const lockedCount = Math.floor(progress * target.length);

        let result = '';
        for (let i = 0; i < target.length; i++) {
          if (target[i] === ' ' || target[i] === '.' || target[i] === '-') {
            result += target[i];
          } else if (i < lockedCount) {
            result += target[i];
          } else {
            // Scramble — pick random char every frame
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayed(result);

        if (progress < 1) {
          raf.current = requestAnimationFrame(frame);
        } else {
          setDisplayed(target);
          setDone(true);
        }
      };

      raf.current = requestAnimationFrame(frame);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, startTrigger, delay, replayKey]);

  return { displayed, done };
}

export default function ScrambleName() {
  const { language } = useLanguage();
  const [replayKey, setReplayKey] = useState(0);
  
  // Only wait if sessionStorage doesn't have the key (meaning intro is playing)
  const [startTrigger, setStartTrigger] = useState(() => {
    return !!sessionStorage.getItem('gelby_intro_shown');
  });

  useEffect(() => {
    if (startTrigger) return;
    const handleFinished = () => setStartTrigger(true);
    window.addEventListener('introFinished', handleFinished);
    return () => window.removeEventListener('introFinished', handleFinished);
  }, [startTrigger]);

  const name = 'M. Isroqi Gelby Firmansyah.';
  const { displayed, done } = useCipherDecode(name, startTrigger, 200, replayKey);

  const subtitleAccentStr = language === 'en' ? 'Laravel Expert' : 'Pakar Laravel';
  const subtitleRestStr = language === 'en' ? ' & Database Engineer' : ' & Rekayasa Basis Data';
  const fullSubtitle = subtitleAccentStr + subtitleRestStr;
  
  const { displayed: displayedSubtitle, done: subtitleDone } = useCipherDecode(fullSubtitle, startTrigger, 400, replayKey);

  const renderedAccent = displayedSubtitle.slice(0, subtitleAccentStr.length);
  const renderedRest = displayedSubtitle.slice(subtitleAccentStr.length);

  return (
    <div className="mb-0">
      {/* Name with cipher effect */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-black tracking-tight text-text-primary font-display leading-[1.1] whitespace-nowrap"
        style={{
          fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span
          style={{
            fontFamily: 'inherit',
            letterSpacing: done ? 'normal' : '0.01em',
            opacity: done ? 1 : 0.75,
            transition: 'opacity 0.4s ease, color 0.4s ease',
          }}
        >
          {displayed}
        </span>
        {/* Accent cursor that fades out when done */}
        {!done && (
          <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 align-middle" style={{ animation: 'none', opacity: 0.8 }} />
        )}
      </motion.h1>

      {/* Subtitle + Replay on one row */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-1 flex flex-row items-center flex-wrap gap-4 md:gap-6"
      >
        <p className="text-text-secondary text-sm md:text-lg lg:text-xl font-medium tracking-wide">
          <span
            className="text-accent"
            style={{ textShadow: '0 0 20px var(--accent-glow)' }}
          >
            {renderedAccent}
          </span>
          {renderedRest}
          {!subtitleDone && (
            <span className="inline-block w-[2px] h-[0.7em] bg-accent ml-1 align-middle opacity-60" />
          )}
        </p>

        <button
          onClick={() => setReplayKey(prev => prev + 1)}
          className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-text-secondary hover:text-accent transition-colors opacity-80 hover:opacity-100"
        >
          <FiRefreshCw size={11} /> Ulangi Animasi
        </button>
      </motion.div>
    </div>
  );
}
