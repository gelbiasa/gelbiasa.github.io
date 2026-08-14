import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SESSION_KEY = 'gelby_intro_shown';

// Typing effect helper
async function typeText(setText, text, speed = 38, isActive) {
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    if (!isActive.current) return false;
    cur += text[i];
    setText(cur);
    await sleep(speed + Math.random() * 20);
  }
  return true;
}

// ─── Animated typing line ───────────────────────────────────────────────────
function TypingLine({ text, color = 'text-gray-300', speed = 32, onDone, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const isActive = useRef(true);

  useEffect(() => {
    isActive.current = true;
    let cancelled = false;
    const run = async () => {
      await sleep(delay);
      if (cancelled) return;
      setShowCursor(true);
      let cur = '';
      for (let i = 0; i < text.length; i++) {
        if (cancelled) return;
        cur += text[i];
        setDisplayed(cur);
        await sleep(speed + Math.random() * 18);
      }
      setShowCursor(false);
      if (!cancelled && onDone) onDone();
    };
    run();
    return () => { cancelled = true; isActive.current = false; };
  }, [text, delay]);

  return (
    <span className={color}>
      {displayed}
      {showCursor && <span className="inline-block w-[6px] h-[1em] bg-emerald-400 align-middle ml-0.5 animate-pulse" />}
    </span>
  );
}

// ─── Log entry ───────────────────────────────────────────────────────────────
function LogLine({ type, text, delay = 0 }) {
  const typeColors = {
    INFO:    'bg-blue-500 text-white',
    SQL:     'bg-amber-500 text-black',
    OK:      'bg-emerald-500 text-black',
    DONE:    'bg-violet-500 text-white',
    WARN:    'bg-orange-500 text-black',
    QUERY:   'bg-cyan-500 text-black',
  };
  const textColors = {
    INFO:  'text-blue-300',
    SQL:   'text-amber-200',
    OK:    'text-emerald-300',
    DONE:  'text-violet-200',
    WARN:  'text-orange-300',
    QUERY: 'text-cyan-200',
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, delay: delay / 1000 }}
      className="flex items-start gap-2 leading-snug"
    >
      <span className={`shrink-0 px-1.5 py-0.5 text-[9px] font-black rounded-sm tracking-widest mt-0.5 ${typeColors[type] || 'bg-gray-600 text-white'}`}>
        {type}
      </span>
      <span className={`text-xs ${textColors[type] || 'text-gray-400'}`}>{text}</span>
    </motion.div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ label, target = 100, speed = 18, color = '#10b981', onDone, delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let current = 0;
    const go = async () => {
      await sleep(delay);
      while (current < target) {
        current = Math.min(current + Math.ceil(Math.random() * 4 + 1), target);
        setVal(current);
        await sleep(speed);
      }
      if (onDone) onDone();
    };
    go();
  }, []);
  const filled = Math.floor((val / 100) * 28);
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      {label && <span className="text-gray-500 text-[10px] shrink-0">{label}</span>}
      <span className="text-gray-700">[</span>
      <span style={{ color }} className="tracking-tight">{'▓'.repeat(filled)}</span>
      <span className="text-gray-800">{'░'.repeat(28 - filled)}</span>
      <span className="text-gray-700">]</span>
      <span className="text-gray-300 w-8 text-right">{val}%</span>
    </div>
  );
}

// ─── SQL Result table ─────────────────────────────────────────────────────────
function SqlResult({ show }) {
  const rows = [
    { field: 'name',       value: 'M. Isroqi Gelby Firmansyah' },
    { field: 'role',       value: 'Laravel Expert & DB Engineer' },
    { field: 'framework',  value: 'Laravel 11.x' },
    { field: 'db_engine',  value: 'MySQL 8.0 / InnoDB' },
    { field: 'status',     value: 'OPEN_TO_HIRE' },
  ];
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-2 border border-gray-700 rounded text-[10px] font-mono overflow-hidden"
        >
          <div className="flex bg-gray-800/80 text-gray-400 text-[9px] tracking-widest uppercase font-bold">
            <div className="px-2 py-1 w-28 border-r border-gray-700">field</div>
            <div className="px-2 py-1">value</div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={row.field}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 * i, duration: 0.2 }}
              className="flex border-t border-gray-800"
            >
              <div className="px-2 py-1 w-28 border-r border-gray-800 text-cyan-400 shrink-0">{row.field}</div>
              <div className={`px-2 py-1 ${row.field === 'status' ? 'text-emerald-400 font-bold' : 'text-gray-200'}`}>
                {row.value}
              </div>
            </motion.div>
          ))}
          <div className="px-2 py-1 border-t border-gray-800 text-gray-600 text-[9px]">
            5 rows in set (0.002 sec)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TerminalIntro({ onDone }) {
  // Phases: sql-type, sql-running, sql-result, artisan-type, artisan-logs, progress, finishing, exiting
  const [phase, setPhase] = useState('idle');
  const [sqlCmd, setSqlCmd] = useState('');
  const [sqlCursor, setSqlCursor] = useState(false);
  const [artisanCmd, setArtisanCmd] = useState('');
  const [artisanCursor, setArtisanCursor] = useState(false);
  const [sqlLogs, setSqlLogs] = useState([]);
  const [artisanLogs, setArtisanLogs] = useState([]);
  const [sqlResultShow, setSqlResultShow] = useState(false);
  const [progress1, setProgress1] = useState(null);
  const [progress2, setProgress2] = useState(null);
  const [exiting, setExiting] = useState(false);
  const isActive = useRef(true);

  useEffect(() => {
    isActive.current = true;
    const run = async () => {
      await sleep(500);
      if (!isActive.current) return;

      // ── PHASE 1: SQL ──────────────────────────────────────────────────────
      setPhase('sql-type');
      setSqlCursor(true);
      const sqlQuery = "SELECT * FROM developer WHERE expertise = 'Laravel' AND db = 'MySQL';";
      let cur = '';
      for (let i = 0; i < sqlQuery.length; i++) {
        if (!isActive.current) return;
        cur += sqlQuery[i];
        setSqlCmd(cur);
        await sleep(30 + Math.random() * 20);
      }
      setSqlCursor(false);
      await sleep(280);
      if (!isActive.current) return;

      // SQL connecting
      setPhase('sql-running');
      setSqlLogs([{ type: 'SQL', text: 'Connected to mysql@localhost:3306/portfolio_db' }]);
      await sleep(350);
      setSqlLogs(p => [...p, { type: 'QUERY', text: 'Executing query on table `developer`...' }]);
      await sleep(500);
      if (!isActive.current) return;

      // SQL result table
      setSqlResultShow(true);
      await sleep(900);
      if (!isActive.current) return;

      setSqlLogs(p => [...p, { type: 'OK', text: 'Profile data loaded. Schema: InnoDB, utf8mb4.' }]);
      await sleep(700);
      if (!isActive.current) return;

      // ── PHASE 2: ARTISAN ──────────────────────────────────────────────────
      setPhase('artisan-type');
      setArtisanCursor(true);
      const artisan = 'php artisan portfolio:boot --mode=production';
      let a = '';
      for (let i = 0; i < artisan.length; i++) {
        if (!isActive.current) return;
        a += artisan[i];
        setArtisanCmd(a);
        await sleep(32 + Math.random() * 18);
      }
      setArtisanCursor(false);
      await sleep(260);
      if (!isActive.current) return;

      setPhase('artisan-logs');
      const artisanSteps = [
        { type: 'INFO', text: 'Bootstrapping Laravel application...', wait: 260 },
        { type: 'INFO', text: 'Loading service providers (AppServiceProvider)...', wait: 220 },
        { type: 'INFO', text: 'Migrating schemas: create_skills_table... ✓', wait: 260 },
        { type: 'INFO', text: 'Migrating schemas: create_projects_table... ✓', wait: 220 },
        { type: 'INFO', text: 'Migrating schemas: create_experience_table... ✓', wait: 280 },
        { type: 'OK',   text: 'All migrations ran successfully.', wait: 320 },
        { type: 'INFO', text: 'Compiling Eloquent relationships & query builder...', wait: 300 },
        { type: 'DONE', text: 'Portfolio booted. Welcome, Gelby!', wait: 200 },
      ];

      for (const step of artisanSteps) {
        if (!isActive.current) return;
        await sleep(step.wait);
        setArtisanLogs(p => [...p, { type: step.type, text: step.text }]);
      }
      await sleep(350);
      if (!isActive.current) return;

      // Progress bars
      setProgress1(true);
      await sleep(700);
      setProgress2(true);
      await sleep(900);
      if (!isActive.current) return;

      // Exit
      await sleep(300);
      setExiting(true);
      await sleep(700);
      if (!isActive.current) return;

      sessionStorage.setItem(SESSION_KEY, '1');
      window.dispatchEvent(new Event('introFinished'));
      onDone();
    };
    run();
    return () => { isActive.current = false; };
  }, []);

  const panel = (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: '#080b10' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 4px)',
            }}
          />

          {/* Big ambient glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[700px] h-[400px] rounded-full bg-emerald-500/8 blur-[140px]" />
            <div className="absolute w-[400px] h-[200px] rounded-full bg-blue-500/5 blur-[100px] translate-y-20" />
          </div>

          {/* DUAL TERMINAL LAYOUT */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl mx-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* ── LEFT: MySQL Terminal ─────────────────────────────── */}
            <div className="bg-[#0d1117] rounded-2xl border border-gray-800 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(251,191,36,0.08)]">
              {/* Title bar */}
              <div className="flex items-center px-4 py-2.5 border-b border-gray-800/70 bg-[#161b22]">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <span className="text-amber-500/80">⬡</span>
                  mysql&gt; portfolio_db
                </div>
              </div>

              {/* MySQL Body */}
              <div className="p-4 font-mono text-xs leading-relaxed min-h-[280px]">
                {/* mysql prompt */}
                <div className="mb-2 text-gray-400">
                  <span className="text-amber-400 font-bold">mysql</span>
                  <span className="text-gray-600"> [</span>
                  <span className="text-cyan-400">portfolio_db</span>
                  <span className="text-gray-600">]</span>
                  <span className="text-gray-500">&gt; </span>
                  <span className="text-gray-100">{sqlCmd}</span>
                  {sqlCursor && (
                    <span className="inline-block w-[7px] h-[1em] bg-amber-400 align-middle ml-0.5 animate-pulse" />
                  )}
                </div>

                {/* SQL logs */}
                <div className="space-y-1.5 mb-2">
                  {sqlLogs.map((log, i) => (
                    <LogLine key={i} type={log.type} text={log.text} delay={0} />
                  ))}
                </div>

                {/* SQL Result Table */}
                <SqlResult show={sqlResultShow} />

                {/* Loading bars for SQL */}
                {progress1 !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 space-y-1.5"
                  >
                    <ProgressBar label="schema" target={100} speed={14} color="#f59e0b" />
                    <ProgressBar label="indexes" target={100} speed={18} color="#06b6d4" delay={200} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Laravel Artisan Terminal ──────────────────── */}
            <div className="bg-[#0d1117] rounded-2xl border border-gray-800 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(16,185,129,0.08)]">
              {/* Title bar */}
              <div className="flex items-center px-4 py-2.5 border-b border-gray-800/70 bg-[#161b22]">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <span className="text-emerald-500/80">●</span>
                  gelby — bash — 120x36
                </div>
              </div>

              {/* Artisan Body */}
              <div className="p-4 font-mono text-xs leading-relaxed min-h-[280px]">
                {/* bash prompt */}
                {phase !== 'idle' && phase !== 'sql-type' && phase !== 'sql-running' && (
                  <div className="mb-2 text-gray-400">
                    <span className="text-emerald-400 font-semibold">gelby@portfolio</span>
                    <span className="text-gray-600">:</span>
                    <span className="text-blue-400">~/app</span>
                    <span className="text-gray-500">$ </span>
                    <span className="text-gray-100">{artisanCmd}</span>
                    {artisanCursor && (
                      <span className="inline-block w-[6px] h-[1em] bg-emerald-400 align-middle ml-0.5 animate-pulse" />
                    )}
                  </div>
                )}

                {/* Artisan logs */}
                <div className="space-y-1.5">
                  {artisanLogs.map((log, i) => (
                    <LogLine key={i} type={log.type} text={log.text} delay={0} />
                  ))}
                </div>

                {/* Artisan progress bars */}
                {progress2 !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 space-y-1.5"
                  >
                    <ProgressBar label="compile" target={100} speed={15} color="#10b981" />
                    <ProgressBar label="cache  " target={100} speed={20} color="#8b5cf6" delay={300}
                      onDone={() => {
                        // show finishing note
                      }}
                    />
                  </motion.div>
                )}

                {/* Final ready message */}
                {artisanLogs.some(l => l.type === 'DONE') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 pt-3 border-t border-gray-800 text-[10px] text-gray-600"
                  >
                    <span className="text-emerald-500/60">◉</span> Application ready on{' '}
                    <span className="text-blue-400/70">https://gelbiasa.github.io</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 text-[10px] text-gray-700 font-mono tracking-widest"
          >
            Initializing portfolio...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
}
