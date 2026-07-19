import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';

/* ─── Typewriter Hook ─── */
const useTypewriter = (text, speed = 60, startDelay = 400) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

/* ─── Main Component ─── */
const HomeSection = ({ setActiveTab }) => {
  const { displayed, done } = useTypewriter('M. Isroqi Gelby Firmansyah.', 65, 600);

  return (
    /* 
      Full-screen section. pt-20 clears the fixed navbar (h-20) on ALL columns.
      On large screens both columns flex side by side, each individually centered.
    */
    <section className="w-full flex-1 flex flex-col lg:flex-row min-h-screen pt-20">

      {/* ══════════════ LEFT — 65% ══════════════ */}
      <motion.div
        className="flex-[6.5] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-16"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-[10px] font-bold tracking-[0.35em] uppercase">
            Available for work
          </span>
        </div>

        {/* Name — SINGLE LINE typewriter */}
        <div className="mb-7">
          <p className="text-slate-600 text-[10px] font-mono tracking-[0.2em] uppercase mb-3">
            &lt; developer /&gt;
          </p>
          <h1
            className="font-display font-black leading-tight tracking-tight text-white"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', whiteSpace: 'nowrap' }}
          >
            {displayed}
            {/* Blinking cursor — only shown while typing */}
            {!done && (
              <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle animate-pulse rounded-sm" />
            )}
            {/* After done, show a static accent dot */}
            {done && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent"
              >
              </motion.span>
            )}
          </h1>

          {/* Subtitle line that fades in after name is done */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 font-mono text-xs mt-2 tracking-widest"
          >
            Full-Stack Developer &amp; UI/UX Designer
          </motion.p>
        </div>

        {/* Role chips */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {['Full-Stack Dev', 'UI/UX Designer', 'Laravel Expert'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] font-semibold text-accent border border-accent/25 bg-accent/5 tracking-wider"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-slate-400 text-xs lg:text-sm leading-relaxed max-w-md mb-8"
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          D-IV Business Information Systems student at{' '}
          <span className="text-white font-semibold">Politeknik Negeri Malang</span>. I engineer
          robust enterprise systems and craft intuitive digital experiences that leave a lasting
          impression.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-[#0b0c10] font-black text-xs rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(84,229,166,0.3)] hover:shadow-[0_0_35px_rgba(84,229,166,0.5)] hover:scale-105 active:scale-95"
          >
            <FiDownload size={14} /> Download CV
          </a>
          <button
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-accent/40 text-white text-xs font-semibold rounded-full transition-all duration-300 hover:bg-accent/5 hover:text-accent group"
          >
            View Projects <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <a href="https://github.com/gelbiasa" target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-accent transition-colors duration-300">
            <FiGithub size={19} />
          </a>
          <a href="https://linkedin.com/in/gelby" target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-accent transition-colors duration-300">
            <FiLinkedin size={19} />
          </a>
          <span className="w-8 h-[1px] bg-slate-800" />
          <span className="text-slate-700 text-[10px] font-mono">gelbiasa.github.io</span>
        </motion.div>
      </motion.div>

      {/* ══════════════ VERTICAL DIVIDER ══════════════ */}
      <div className="hidden lg:flex flex-col items-center justify-center py-20 flex-shrink-0 w-px mx-0">
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full border border-accent/40 my-3 flex-shrink-0" />
        <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* ══════════════ RIGHT — 35% ══════════════ */}
      <motion.div
        className="flex-[3.5] flex items-center justify-center px-8 lg:px-10 py-12 lg:py-16 relative"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      >
        {/* Photo spray wrapper */}
        <div className="relative w-full max-w-[280px] aspect-[3/4] flex items-center justify-center">

          {/* SVG spray aerosol layers */}
          <svg
            className="absolute pointer-events-none"
            style={{ inset: '-35%', width: '170%', height: '170%' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="sprayA" x="-60%" y="-60%" width="220%" height="220%">
                <feTurbulence type="turbulence" baseFrequency="0.026" numOctaves="4" seed="18" result="t" />
                <feDisplacementMap in="SourceGraphic" in2="t" scale="35" xChannelSelector="R" yChannelSelector="G" />
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <filter id="sprayB" x="-40%" y="-40%" width="180%" height="180%">
                <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="7" result="t2" />
                <feDisplacementMap in="SourceGraphic" in2="t2" scale="20" xChannelSelector="R" yChannelSelector="G" />
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <ellipse cx="50%" cy="50%" rx="38%" ry="40%" fill="#54e5a6" opacity="0.15" filter="url(#sprayA)" />
            <ellipse cx="50%" cy="52%" rx="28%" ry="30%" fill="#54e5a6" opacity="0.22" filter="url(#sprayB)" />
          </svg>

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 65% 75% at 50% 52%, rgba(84,229,166,0.16) 0%, transparent 70%)',
              filter: 'blur(22px)',
            }}
          />

          {/* Spray dot particles */}
          {[
            { top: '4%', left: '6%', s: 4, o: 0.45 },
            { top: '12%', right: '6%', s: 3, o: 0.3 },
            { top: '38%', right: '-2%', s: 5, o: 0.22 },
            { bottom: '16%', right: '4%', s: 4, o: 0.3 },
            { bottom: '6%', left: '10%', s: 3, o: 0.3 },
            { bottom: '30%', left: '-2%', s: 5, o: 0.18 },
            { top: '58%', left: '2%', s: 3, o: 0.38 },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-accent"
              style={{ top: d.top, left: d.left, right: d.right, bottom: d.bottom, width: d.s, height: d.s, opacity: d.o, filter: 'blur(1px)' }}
            />
          ))}

          {/* Photo blob */}
          <div
            className="relative z-10 w-full h-full overflow-hidden"
            style={{
              borderRadius: '42% 58% 55% 45% / 46% 42% 58% 54%',
              border: '2px solid rgba(84,229,166,0.4)',
              boxShadow: '0 0 0 5px rgba(84,229,166,0.06), 0 0 50px rgba(84,229,166,0.16)',
            }}
          >
            <img
              src="/images/foto_diri.jpg"
              alt="M. Isroqi Gelby Firmansyah"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/5"
              style={{ background: 'linear-gradient(to top, rgba(84,229,166,0.09), transparent)' }}
            />
          </div>

          {/* Open to Hire badge */}
          <motion.div
            className="absolute -bottom-5 left-0 flex items-center gap-2 bg-[#12141c] border border-accent/25 rounded-xl px-3 py-2 shadow-xl z-20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <div>
              <p className="text-accent text-[9px] font-black tracking-widest uppercase leading-none">Status</p>
              <p className="text-white text-[11px] font-semibold leading-none mt-0.5">Open to Hire</p>
            </div>
          </motion.div>

          {/* XP badge */}
          <motion.div
            className="absolute -top-3 -right-1 bg-accent text-[#0b0c10] rounded-xl px-3 py-2 shadow-[0_0_18px_rgba(84,229,166,0.5)] z-20"
            animate={{ rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[9px] font-black tracking-widest uppercase leading-none">Exp.</p>
            <p className="text-[#0b0c10] text-xs font-black leading-none mt-0.5">3+ Years</p>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
};

export default HomeSection;
