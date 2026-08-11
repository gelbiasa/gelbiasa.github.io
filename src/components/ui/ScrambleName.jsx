import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FiRefreshCw } from 'react-icons/fi';

// Cipher / Scramble decode effect
// Each character goes through random chars before settling on the real one
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function useCipherDecode(target, delay = 0) {
  const [displayed, setDisplayed] = useState(() => ' '.repeat(target.length));
  const [done, setDone] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
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
  }, [target, delay]);

  return { displayed, done };
}

export default function ScrambleName({ onReplay }) {
  const { language } = useLanguage();
  const name = 'M. Isroqi Gelby Firmansyah.';
  const { displayed, done } = useCipherDecode(name, 200);

  const subtitle = language === 'en'
    ? { accent: 'Laravel Expert', rest: ' & Database Engineer' }
    : { accent: 'Pakar Laravel', rest: ' & Rekayasa Basis Data' };

  return (
    <div className="mb-0">
      {/* Name with cipher effect */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="font-black tracking-tight text-white font-display leading-[1.1] whitespace-nowrap"
        style={{
          fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span
          style={{
            fontFamily: 'inherit',
            letterSpacing: done ? 'normal' : '0.01em',
            color: done ? '#ffffff' : 'rgba(255,255,255,0.75)',
            transition: 'color 0.4s ease',
          }}
        >
          {displayed}
        </span>
        {/* Accent cursor that fades out when done */}
        {!done && (
          <span className="inline-block w-[3px] h-[0.8em] bg-emerald-500 ml-1 align-middle" style={{ animation: 'none', opacity: 0.8 }} />
        )}
      </motion.h1>

      {/* Subtitle + Replay on one row */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 md:mt-4 flex flex-row items-center flex-wrap gap-4 md:gap-6"
      >
        <p className="text-gray-400 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
          <span
            className="text-emerald-400"
            style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.35)' }}
          >
            {subtitle.accent}
          </span>
          {subtitle.rest}
        </p>

        {onReplay && (
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-gray-400 hover:text-emerald-400 transition-colors opacity-80 hover:opacity-100"
          >
            <FiRefreshCw size={11} /> Ulangi Animasi
          </button>
        )}
      </motion.div>
    </div>
  );
}
