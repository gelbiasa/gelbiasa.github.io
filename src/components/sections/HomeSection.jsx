import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMapPin, FiBriefcase, FiBook, FiExternalLink } from 'react-icons/fi';

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
    <section className="w-full flex-1 flex flex-col lg:flex-row min-h-[100dvh] pt-32 lg:pt-28">

      {/* ══════════════ LEFT — 60% ══════════════ */}
      <motion.div
        className="flex-[6] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 pb-10 lg:pb-0"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
            Available For Work
          </span>
        </div>

        {/* Name — SINGLE LINE typewriter */}
        <div className="mb-7">
          <h1
            className="font-display font-black leading-tight tracking-tight text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', whiteSpace: 'nowrap' }}
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

          {/* Subtitle line */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-slate-500 font-mono text-sm mt-2 tracking-widest"
          >
            Full-Stack Developer &amp; UI/UX Designer
          </motion.p>
        </div>

        {/* Role chips */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          {['Full-Stack Dev', 'UI/UX Designer', 'Laravel Expert'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-[11px] font-semibold text-accent border border-accent/30 bg-accent/5 tracking-wider"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-slate-400 text-sm lg:text-base leading-relaxed text-justify mb-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          D-IV Business Information Systems student at{' '}
          <span className="text-white font-semibold">Politeknik Negeri Malang</span> with a strong focus on Back-end Development and UI/UX Design. I specialize in engineering robust, scalable enterprise applications using Laravel and React, bridging the gap between complex system architectures and highly intuitive, user-centric digital experiences that leave a lasting impression.
        </motion.p>






        {/* Experience Timeline Preview */}
        <motion.div
          className="bg-[#0f1117] border border-white/6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.15 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Experience</span>
            <button
              onClick={() => setActiveTab('experience')}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-light transition-colors group"
            >
              See Detail <FiExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Timeline rows */}
          {[
            {
              company: 'PT Multi Spunindo Jaya Tbk',
              role: 'Intern — Full Stack Developer',
              period: 'Jul – Dec 2025',
            },
            {
              company: 'UPA TIK Politeknik Negeri Malang',
              role: 'Intern — Back-end Developer',
              period: 'Feb – Jun 2025',
            },
          ].map((exp, i) => (
            <div
              key={exp.company}
              className={`flex items-center gap-4 px-5 py-4 ${
                i === 0 ? 'border-b border-white/4' : ''
              } hover:bg-white/2 transition-colors`}
            >
              <div className="flex-shrink-0 relative">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{exp.company}</p>
                <p className="text-slate-500 text-xs">{exp.role}</p>
              </div>
              {/* Period */}
              <span className="flex-shrink-0 text-[11px] font-mono text-slate-500 bg-white/4 px-2.5 py-1 rounded-full">
                {exp.period}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Bar — segmented, no radius */}
        <motion.div
          className="flex flex-wrap items-stretch border border-white/10 bg-[#0f1117] overflow-hidden mt-8 shadow-2xl"
          style={{ borderRadius: '4px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {/* 1. Download CV */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-light text-[#0b0c10] font-black text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(84,229,166,0.25)] hover:shadow-[0_0_30px_rgba(84,229,166,0.45)] flex-shrink-0"
          >
            <FiDownload size={15} /> Download CV
          </a>

          {/* Divider */}
          <div className="w-px bg-white/8 flex-shrink-0" />

          {/* 2. View GitHub */}
          <a
            href="https://github.com/gelbiasa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 text-slate-400 hover:text-white hover:bg-white/4 text-sm font-semibold tracking-wide transition-all duration-200 flex-shrink-0"
          >
            <FiGithub size={16} /> View GitHub
          </a>

          {/* Divider */}
          <div className="w-px bg-white/8 flex-shrink-0" />

          {/* 3. View LinkedIn */}
          <a
            href="https://www.linkedin.com/in/gelbifirmansyah/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 text-slate-400 hover:text-white hover:bg-white/4 text-sm font-semibold tracking-wide transition-all duration-200 flex-shrink-0"
          >
            <FiLinkedin size={16} /> View LinkedIn
          </a>

          {/* Divider */}
          <div className="w-px bg-white/8 flex-shrink-0" />

          {/* 4. View Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-2 px-6 py-3.5 text-slate-400 hover:text-accent hover:bg-accent/6 text-sm font-semibold tracking-wide transition-all duration-200 group flex-shrink-0"
          >
            View Projects <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </motion.div>

      {/* ══════════════ TECH-PARTICLE FLOW DIVIDER ══════════════ */}
      <div className="hidden lg:flex flex-col items-center justify-center py-4 flex-shrink-0 w-[60px] mx-0 h-[75vh] self-center relative overflow-hidden group">
        
        {/* Core Beam */}
        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_12px_rgba(84,229,166,0.9)] opacity-90" />
        
        {/* Glowing Aura */}
        <div className="absolute w-[10px] h-3/4 bg-accent/20 blur-[8px] rounded-full" />

        {/* --- Flowing Particles (Data Stream) --- */}
        {/* Fast small bright particle */}
        <motion.div
          className="absolute w-[2px] h-[20px] bg-white rounded-full shadow-[0_0_10px_white]"
          animate={{ top: ['-5%', '105%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Medium green particle */}
        <motion.div
          className="absolute w-[3px] h-[8px] bg-accent rounded-full shadow-[0_0_8px_var(--accent)]"
          animate={{ top: ['-10%', '110%'], opacity: [0, 1, 0] }}
          transition={{ duration: 3.5, delay: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Slow glowing orb */}
        <motion.div
          className="absolute w-[4px] h-[4px] bg-accent-light rounded-full shadow-[0_0_12px_var(--accent)]"
          animate={{ top: ['-5%', '105%'], opacity: [0, 0.8, 0] }}
          transition={{ duration: 4.5, delay: 0.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* --- Side Circuit Traces --- */}
        {/* Trace 1 (Right) */}
        <div className="absolute top-[25%] left-[calc(50%+1px)] flex items-center">
          <div className="w-[12px] h-[1px] bg-accent/40" />
          <div className="w-[2px] h-[2px] rounded-full bg-accent shadow-[0_0_4px_var(--accent)]" />
        </div>
        {/* Trace 2 (Left) */}
        <div className="absolute top-[40%] right-[calc(50%+1px)] flex items-center flex-row-reverse">
          <div className="w-[18px] h-[1px] bg-accent/30" />
          <div className="w-[2px] h-[15px] bg-accent/30 -mt-[14px]" />
          <div className="w-[3px] h-[3px] rounded-full bg-accent/80 shadow-[0_0_4px_var(--accent)] -mt-[14px]" />
        </div>
        {/* Trace 3 (Right) */}
        <div className="absolute top-[65%] left-[calc(50%+1px)] flex items-center">
          <div className="w-[8px] h-[1px] bg-accent/50" />
          <div className="w-[1px] h-[10px] bg-accent/50 mt-[10px]" />
          <div className="w-[2px] h-[2px] rounded-full bg-accent shadow-[0_0_4px_var(--accent)] mt-[10px]" />
        </div>
        {/* Trace 4 (Left) */}
        <div className="absolute top-[75%] right-[calc(50%+1px)] flex items-center flex-row-reverse">
          <div className="w-[10px] h-[1px] bg-accent/40" />
          <div className="w-[2px] h-[2px] rounded-full bg-accent/80 shadow-[0_0_4px_var(--accent)]" />
        </div>

        {/* Ambient floating dust particles around beam */}
        <motion.div
          className="absolute left-[calc(50%+6px)] w-[1px] h-[1px] bg-accent rounded-full"
          animate={{ y: [0, -30], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ top: '35%' }}
        />
        <motion.div
          className="absolute right-[calc(50%+5px)] w-[2px] h-[2px] bg-accent/70 rounded-full"
          animate={{ y: [0, -40], opacity: [0, 1, 0] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, ease: 'easeOut' }}
          style={{ top: '55%' }}
        />
      </div>

      {/* ══════════════ RIGHT — 40% ══════════════ */}
      <motion.div
        className="flex-[4] flex flex-col items-center justify-center px-8 lg:px-10 pb-12 lg:pb-0 gap-6"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      >
        {/* Photo spray wrapper */}
        <div className="relative w-full max-w-[290px] aspect-[3/4.15] flex items-center justify-center">

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
            className="relative z-10 w-full h-full overflow-hidden bg-[#0b0c10]"
            style={{
              borderRadius: '42% 58% 55% 45% / 46% 42% 58% 54%',
              border: '2px solid rgba(84,229,166,0.4)',
              boxShadow: '0 0 0 5px rgba(84,229,166,0.06), 0 0 50px rgba(84,229,166,0.16)',
            }}
          >
            <img
              src="/images/foto_gelby.png"
              alt="M. Isroqi Gelby Firmansyah"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
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
            <p className="text-[#0b0c10] text-xs font-black leading-none mt-0.5">2+ Years</p>
          </motion.div>
        </div>

        {/* Location row */}
        <motion.div
          className="flex items-center gap-4 px-4 py-3.5 bg-[#0f1117] border border-white/10 rounded-2xl text-slate-400 w-full max-w-[290px] mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
            <FiMapPin size={16} className="text-accent" />
          </span>
          <span className="text-sm font-medium tracking-wide">Malang, East Java, Indonesia</span>
        </motion.div>


      </motion.div>

    </section>
  );
};

export default HomeSection;
