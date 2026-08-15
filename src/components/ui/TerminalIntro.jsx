import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SESSION_KEY = 'gelby_intro_shown';

async function typeText(setText, text, speed = 38) {
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    cur += text[i];
    setText(cur);
    await sleep(speed + Math.random() * 14);
  }
}

// ── Badge ─────────────────────────────────────────────────────────────────────
const BDGBG   = { INFO:'#3b82f6',MIGRATE:'#7c3aed',CREATE:'#059669',SEED:'#d97706',OK:'#10b981',QUERY:'#0891b2',DONE:'#9333ea' };
const BDGFG   = { INFO:'#fff',MIGRATE:'#fff',CREATE:'#000',SEED:'#000',OK:'#000',QUERY:'#000',DONE:'#fff' };
const TXCOLOR = { INFO:'#93c5fd',MIGRATE:'#c4b5fd',CREATE:'#6ee7b7',SEED:'#fcd34d',OK:'#a7f3d0',QUERY:'#67e8f9',DONE:'#e879f9' };

function LogLine({ type, text }) {
  return (
    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
      className="flex items-start gap-2 leading-snug"
    >
      <span className="shrink-0 mt-[2px] px-1.5 py-[1px] text-[8px] font-black rounded tracking-widest"
        style={{ background: BDGBG[type]||'#374151', color: BDGFG[type]||'#fff' }}>
        {type}
      </span>
      <span className="text-[10.5px] font-mono" style={{ color: TXCOLOR[type]||'#9ca3af' }}>{text}</span>
    </motion.div>
  );
}

// ── PDM Table ─────────────────────────────────────────────────────────────────
const TDEFS = {
  developers:  { color:'#10b981', cols:['🔑 id INT','name VARCHAR','role VARCHAR','status ENUM'] },
  experiences: { color:'#8b5cf6', cols:['🔑 id INT','developer_id FK','tech_stack TEXT','skills JSON'] },
  projects:    { color:'#06b6d4', cols:['🔑 id INT','developer_id FK','scale VARCHAR','tech_stack TEXT'] },
  educations:  { color:'#f43f5e', cols:['🔑 id INT','developer_id FK','degree VARCHAR','gpa DECIMAL'] },
};

function PdmTable({ name, visible, x, y, rowCount = 0 }) {
  const def = TDEFS[name];
  const [rows, setRows] = useState(0);
  useEffect(() => {
    if (!visible || !rowCount) return;
    let i = 0;
    const iv = setInterval(() => {
      i = Math.min(i + Math.ceil(rowCount / 7), rowCount);
      setRows(i);
      if (i >= rowCount) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [visible, rowCount]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute font-mono rounded-lg overflow-hidden"
          style={{ left: x, top: y, width: 148, border: `1px solid ${def.color}44`, background: '#0d1117', boxShadow: `0 4px 20px ${def.color}18`, zIndex: 2 }}
        >
          <div className="flex items-center justify-between px-2 py-1" style={{ background: def.color+'22', borderBottom: `1px solid ${def.color}33` }}>
            <span className="text-[10px] font-black" style={{ color: def.color }}>⬡ {name}</span>
            {rowCount > 0 && <span className="text-[8px] text-gray-600">{rows} rows</span>}
          </div>
          <div className="px-2 py-1.5 space-y-[3px]">
            {def.cols.map((col, i) => (
              <motion.div key={col} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.04 * i }}
                className="text-[8.5px] px-1.5 py-[2px] rounded"
                style={{
                  background: col.includes('FK') ? '#1e1230' : col.startsWith('🔑') ? def.color+'22' : '#111827',
                  color:      col.includes('FK') ? '#a78bfa'  : col.startsWith('🔑') ? def.color  : '#6b7280',
                  border:     col.includes('FK') ? '1px solid #4c1d9530' : col.startsWith('🔑') ? `1px solid ${def.color}44` : 'none',
                }}
              >{col}</motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── SVG animated line ─────────────────────────────────────────────────────────
function RelLine({ x1, y1, x2, y2, visible, color }) {
  const len = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
  return (
    <AnimatePresence>
      {visible && (
        <motion.line x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="1.2" strokeLinecap="round"
          strokeDasharray={len}
          initial={{ strokeDashoffset: len, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 0.65 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  );
}

// ── Target Found Modal ────────────────────────────────────────────────────────
function TargetFoundModal({ show }) {
  const [phase, setPhase] = useState(0); // 0: hidden, 2: found, 3: ready
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!show) return;
    const run = async () => {
      setPhase(2);
      await sleep(400); // wait for entrance animation
      
      let p = 0;
      const iv = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) clearInterval(iv);
      }, 40); // 50 steps * 40ms = 2000ms
      
      await sleep(2000 + 400);
      setPhase(3);
    };
    run();
  }, [show]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm rounded-2xl">
      <AnimatePresence mode="wait">
        
        {phase >= 2 && (
          <motion.div key="found" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-lg bg-[#0a0e14] border border-emerald-500/30 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.2)]"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-50 animate-[shimmer_2s_infinite]" />
            
            <div className="relative p-6 font-mono">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-[12px] font-black tracking-widest">TARGET ACQUIRED</span>
                </div>
                <div className="text-[10px] text-emerald-500/60">ROWS: 1</div>
              </div>
              
              <div className="space-y-4 text-[12px] sm:text-[13px]">
                <div>
                  <div className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-wider mb-1">Developer Name</div>
                  <div className="text-white font-bold text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 leading-tight">
                    M. Isroqi Gelby Firmansyah
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Primary Role</div>
                    <div className="text-gray-200">Laravel Expert & DB Engineer</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Tech Stack</div>
                    <div className="text-gray-200">Laravel, MySQL, PHP</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
                       style={{ color: progress < 100 ? '#22d3ee' : '#34d399' }}>
                    {progress < 100 && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />}
                    {progress < 100 ? 'INITIALIZING ENVIRONMENT...' : 'ACCESS GRANTED — REDIRECTING'}
                  </div>
                  <div className="text-[11px] font-mono font-bold"
                       style={{ color: progress < 100 ? '#22d3ee' : '#34d399' }}>
                    {progress}%
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                    style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TitleBar ─────────────────────────────────────────────────────────────────
function TitleBar({ label, accent }) {
  return (
    <div className="flex items-center px-4 py-2.5 border-b border-gray-800/80 shrink-0" style={{ background:'#161b22' }}>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#ef4444cc' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#eab308cc' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#22c55ecc' }} />
      </div>
      <div className="mx-auto text-[10px] text-gray-500 font-mono flex items-center gap-1.5">
        <span style={{ color: accent }}>{label.icon}</span> {label.text}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function TerminalIntro({ onDone }) {
  // Terminal state
  const [phase, setPhase]           = useState('migrate'); // migrate | clear-typing | mysql
  const [artisanCmd, setArtisanCmd] = useState('');
  const [artisanCursor, setArtisanCursor] = useState(true);
  const [logs, setLogs]             = useState([]);
  const [clearCmd, setClearCmd]     = useState('');
  const [clearCursor, setClearCursor] = useState(false);
  const [mysqlCmd, setMysqlCmd]     = useState('');
  const [mysqlCursor, setMysqlCursor] = useState(false);
  
  // PDM state
  const [tables, setTables] = useState({});
  const [lines,  setLines]  = useState({});

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [exiting, setExiting] = useState(false);
  
  const isActive = useRef(true);
  const pdmRef = useRef(null);
  const [pdmScale, setPdmScale] = useState(1);

  // Responsive PDM scaling
  useEffect(() => {
    if (!pdmRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Base PDM size is 550x450, add padding allowance
        const scaleW = (width - 16) / 550;
        const scaleH = (height - 16) / 450;
        setPdmScale(Math.min(1, scaleW, scaleH));
      }
    });
    obs.observe(pdmRef.current);
    return () => obs.disconnect();
  }, []);

  const addLog = (t, m) => setLogs(p => [...p, { type: t, text: m }]);
  const revealTable = (name, rows) => setTables(p => ({ ...p, [name]: { visible: true, rows } }));
  const revealLine  = (name)       => setLines(p => ({ ...p, [name]: true }));

  useEffect(() => {
    isActive.current = true;
    const run = async () => {
      await sleep(350);
      if (!isActive.current) return;

      // ─ 1. Type artisan command ────────────────────────────────────────────
      setArtisanCursor(true);
      await typeText(setArtisanCmd, 'php artisan migrate:fresh --seed', 42);
      setArtisanCursor(false);
      await sleep(220);
      if (!isActive.current) return;

      // ─ 2. Migration logs + PDM tables appear ──────────────────────────────
      addLog('MIGRATE', 'Running migrations...');
      await sleep(160);

      const tbls = [
        { name:'developers',  label:'2025_01_01_create_developers_table',  rows: 14892 },
        { name:'experiences', label:'2025_01_02_create_experiences_table', rows: 28450 },
        { name:'projects',    label:'2025_01_03_create_projects_table',    rows: 45102 },
        { name:'educations',  label:'2025_01_04_create_educations_table',  rows: 15300 },
      ];
      for (const td of tbls) {
        if (!isActive.current) return;
        addLog('CREATE', td.label);
        revealTable(td.name, td.rows);
        if (td.name !== 'developers') setTimeout(() => revealLine(td.name), 200);
        await sleep(230);
      }
      addLog('OK', 'All migrations completed successfully.');
      await sleep(200);
      if (!isActive.current) return;

      // ─ 3. Seed ───────────────────────────────────────────────────────────
      addLog('SEED', 'Seeding: DeveloperSeeder... ✓');
      await sleep(170);
      addLog('SEED', 'Seeding: ExperienceSeeder... ✓');
      await sleep(160);
      addLog('SEED', 'Seeding: ProjectSeeder... ✓');
      await sleep(160);
      addLog('SEED', 'Database seeding complete.');
      await sleep(350);
      if (!isActive.current) return;

      // ─ 4. clear command ──────────────────────────────────────────────────
      setPhase('clear-typing');
      setClearCursor(true);
      await typeText(setClearCmd, 'clear', 55);
      setClearCursor(false);
      await sleep(220);
      if (!isActive.current) return;

      // Clear terminal and enter Tinker
      setPhase('tinker-start');
      setLogs([]);
      setArtisanCmd('');
      setClearCmd('');
      await sleep(120);
      if (!isActive.current) return;

      setClearCursor(true);
      await typeText(setClearCmd, 'php artisan tinker', 40);
      setClearCursor(false);
      await sleep(250);
      if (!isActive.current) return;

      setPhase('tinker-query');
      await sleep(100);

      // ─ 5. Tinker Eloquent query ──────────────────────────────────────────────
      setMysqlCursor(true);
      const q = `Developer::with(['experiences', 'educations', 'projects'])
    ->whereHas('experiences', function($q) {
        $q->where('tech_stack', 'LIKE', '%Laravel%')
          ->whereJsonContains('skills', ['System Planning', 'Clean Code', 'Efficiency']);
    })
    ->whereHas('educations', fn($q) => $q->where('gpa', '>', 3.70))
    ->whereHas('projects', fn($q) => $q->where('scale', 'Enterprise'))
    ->first();`;
      await typeText(setMysqlCmd, q, 12);
      setMysqlCursor(false);
      await sleep(300);
      if (!isActive.current) return;

      // ─ 5.5. Executing ──────────────────────────────────────────────────────
      setPhase('executing');
      await sleep(1400);
      if (!isActive.current) return;

      // ─ 6. Show Target Found Modal ────────────────────────────────────────
      setShowModal(true);
      
      // Wait for modal animations to complete (entrance + loading bar + exit delay)
      await sleep(3000); 
      if (!isActive.current) return;

      // ─ 7. Exit ───────────────────────────────────────────────────────────
      setExiting(true);
      await sleep(600);
      if (!isActive.current) return;
      sessionStorage.setItem(SESSION_KEY, '1');
      window.dispatchEvent(new Event('introFinished'));
      onDone();
    };
    run();
    return () => { isActive.current = false; };
  }, []);

  // PDM node positions for 1-2-1 layout in a fixed 550x450 bounding box
  const DEV = { x: 201, y: 20,   cx: 275, cy: 62  };
  const EXP = { x: 40,  y: 190,  cx: 114, cy: 232 };
  const EDU = { x: 362, y: 190,  cx: 436, cy: 232 };
  const PRJ = { x: 201, y: 350,  cx: 275, cy: 392 };

  const panel = (
    <AnimatePresence>
      {!exiting && (
        <motion.div key="intro-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(18px)', scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: '#070b10' }}
        >
          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.04) 1px,transparent 1px)`,
            backgroundSize: '38px 38px',
          }} />
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.1) 0px,rgba(0,0,0,0.1) 1px,transparent 1px,transparent 4px)',
          }} />
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[900px] h-[460px] rounded-full blur-[160px]"
              style={{ background: 'radial-gradient(ellipse,rgba(16,185,129,0.07) 0%,rgba(139,92,246,0.05) 60%,transparent 100%)' }} />
          </div>

          {/* ══ 2-container layout (Terminal + PDM) ══ */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col lg:flex-row gap-4 w-full px-4 lg:max-h-[600px]"
            style={{ maxWidth: 1100, height: '95vh', maxHeight: 850 }}
          >
            {/* ── CONTAINER 1: Terminal ─────────────────────────────────── */}
            <div className="flex flex-col rounded-2xl border border-gray-800 overflow-hidden w-full lg:w-[46%] h-[50%] lg:h-full shrink-0"
              style={{ background:'#0d1117', boxShadow:'0 24px 70px rgba(0,0,0,0.8),0 0 0 1px rgba(139,92,246,0.1)' }}>
              <TitleBar label={{ icon:'◉', text:'gelby@portfolio:~/app — bash' }} accent="#10b98180" />
              <div className="p-4 font-mono text-[11px] leading-relaxed flex-1 overflow-hidden flex flex-col gap-1.5">

                {/* Artisan prompt (migrate phase) */}
                {(phase === 'migrate' || phase === 'clear-typing') && artisanCmd && (
                  <div className="text-gray-400 mb-1 shrink-0">
                    <span style={{ color:'#10b981' }} className="font-semibold">gelby</span>
                    <span className="text-gray-700">:</span>
                    <span style={{ color:'#60a5fa' }}>~/app</span>
                    <span className="text-gray-600">$ </span>
                    <span className="text-gray-100">{artisanCmd}</span>
                    {artisanCursor && <span className="inline-block w-[6px] h-[0.9em] align-middle ml-0.5 animate-pulse" style={{ background:'#10b981' }} />}
                  </div>
                )}

                {/* Migration logs */}
                {logs.length > 0 && (
                  <div className="space-y-1 flex-1 overflow-hidden">
                    {logs.map((l, i) => <LogLine key={i} type={l.type} text={l.text} />)}
                  </div>
                )}

                {/* clear / tinker command */}
                {(phase === 'clear-typing' || phase === 'tinker-start' || phase === 'tinker-query' || phase === 'executing') && (
                  <div className="text-gray-400 shrink-0 border-t border-gray-800/60 pt-2">
                    <span style={{ color:'#10b981' }} className="font-semibold">gelby</span>
                    <span className="text-gray-700">:</span>
                    <span style={{ color:'#60a5fa' }}>~/app</span>
                    <span className="text-gray-600">$ </span>
                    <span className="text-gray-100">{phase === 'clear-typing' ? clearCmd : 'php artisan tinker'}</span>
                    {phase === 'tinker-start' && clearCursor && <span className="inline-block w-[6px] h-[0.9em] align-middle ml-0.5 animate-pulse" style={{ background:'#10b981' }} />}
                  </div>
                )}

                {/* Tinker phase */}
                {(phase === 'tinker-query' || phase === 'executing') && (
                  <div className="text-gray-400 mb-1 shrink-0 mt-1">
                    <span className="text-gray-500 font-bold">&gt; </span>
                    <span className="text-emerald-300 whitespace-pre leading-relaxed">{mysqlCmd}</span>
                    {mysqlCursor && <span className="inline-block w-[6px] h-[0.9em] align-middle ml-0.5 animate-pulse" style={{ background:'#6ee7b7' }} />}
                  </div>
                )}

                {/* Executing loader */}
                {phase === 'executing' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-3 text-cyan-400 font-mono pl-2">
                    <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-[10px] tracking-[0.2em] font-bold animate-pulse">EXECUTING QUERY...</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── CONTAINER 2: PDM Diagram (Full Height) ───────────────── */}
            <div className="flex flex-col rounded-2xl border border-gray-800 overflow-hidden flex-1 h-[50%] lg:h-full"
              style={{ background:'#0a0e14', boxShadow:'0 24px 70px rgba(0,0,0,0.8),0 0 0 1px rgba(245,158,11,0.1)' }}>
              <TitleBar label={{ icon:'⬡', text:'portfolio_db — Physical Data Model' }} accent="#f59e0baa" />
              <div className="flex-1 relative overflow-hidden flex items-center justify-center" ref={pdmRef}>
                <div style={{ width: 550, height: 450, transform: `scale(${pdmScale})`, position: 'relative' }}>
                  {/* SVG lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex:1 }}>
                    <RelLine x1={DEV.cx} y1={DEV.cy+40} x2={EXP.cx} y2={EXP.cy-40} visible={!!lines.experiences} color="#8b5cf6" />
                    <RelLine x1={DEV.cx} y1={DEV.cy+40} x2={EDU.cx} y2={EDU.cy-40} visible={!!lines.educations}  color="#f43f5e" />
                    <RelLine x1={DEV.cx} y1={DEV.cy+40} x2={PRJ.cx} y2={PRJ.cy-40} visible={!!lines.projects}    color="#06b6d4" />
                  </svg>
                  {/* Tables */}
                  <div className="relative" style={{ zIndex:2, height:'100%' }}>
                    <PdmTable name="developers"  visible={!!tables.developers?.visible}  x={DEV.x} y={DEV.y} rowCount={tables.developers?.rows||0} />
                    <PdmTable name="experiences" visible={!!tables.experiences?.visible} x={EXP.x} y={EXP.y} rowCount={tables.experiences?.rows||0} />
                    <PdmTable name="educations"  visible={!!tables.educations?.visible}  x={EDU.x} y={EDU.y} rowCount={tables.educations?.rows||0} />
                    <PdmTable name="projects"    visible={!!tables.projects?.visible}    x={PRJ.x} y={PRJ.y} rowCount={tables.projects?.rows||0} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* ── Modal Overlay ── */}
            <TargetFoundModal show={showModal} />

          </motion.div>

          {/* Hint */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
            className="absolute bottom-5 text-[9px] font-mono tracking-[0.25em] uppercase" style={{ color:'#1f2937' }}>
            Initializing portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
}
