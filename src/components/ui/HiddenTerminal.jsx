import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { FiX } from 'react-icons/fi';
import { terminalTranslations } from '../../data/terminalTranslations';

const MAX_HISTORY_LINES = 200;

// Memoized single history row with CSS content-visibility so off-screen lines cost 0ms to scroll
const HistoryRow = memo(function HistoryRow({ line, onRunCommand }) {
  const formattedContent = useMemo(() => {
    if (line.type !== 'system') return null;
    const text = line.text;
    if (!text || typeof text !== 'string') return text;
    const parts = text.split(/(".*?")/g);
    if (parts.length === 1) return text;

    return parts.map((part, idx) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        const cmdInner = part.slice(1, -1);
        return (
          <span
            key={idx}
            onClick={() => onRunCommand(cmdInner)}
            className="text-accent font-bold cursor-pointer hover:underline hover:text-accent-light px-1.5 py-0.5 rounded bg-[#141720] border border-white/10 hover:border-accent/40 mx-0.5 inline-block text-xs"
            title={`Klik untuk jalankan "${cmdInner}" / Click to execute`}
          >
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }, [line.type, line.text, onRunCommand]);

  if (line.type === 'system') {
    const textStr = typeof line.text === 'string' ? line.text : '';
    const isGranted = textStr.includes('Access granted') || textStr.includes('Akses diberikan');
    const isBoxBorder = textStr.startsWith('┌─') || textStr.startsWith('└─');
    return (
      <div
        className="mb-1 leading-relaxed break-words"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 22px' }}
      >
        <span className={isGranted || isBoxBorder ? 'text-accent font-bold' : 'text-gray-300'}>
          {formattedContent}
        </span>
      </div>
    );
  }

  return (
    <div
      className="mb-1 leading-relaxed flex flex-wrap"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 22px' }}
    >
      <span className="text-accent mr-2">λ</span>
      <span className="text-gray-400 mr-2">guest ~</span>
      <span className="text-gray-200 break-all">{line.text}</span>
    </div>
  );
});

export default function HiddenTerminal({ onHireMe }) {
  const [termLang, setTermLang] = useState(() => localStorage.getItem('portfolioTerminalLang') || 'en');
  const [isSelectingLang, setIsSelectingLang] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  // Direct DOM refs for zero-overhead drag & resize (no Framer Motion projection listeners on scroll)
  const windowRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 800, h: 450 });

  // Detect screen size changes efficiently
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = (e) => setIsMobileOrTablet(e.matches);
    setIsMobileOrTablet(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const canDrag = !isFullscreen && !isMobileOrTablet;

  // Pure DOM translate3d drag — 0 React re-renders, 0 scroll projection overhead
  const handleHeaderDragStart = useCallback((e) => {
    if (!canDrag || e.button !== 0) return;
    if (e.target.closest('button')) return;
    e.preventDefault();
    const el = windowRef.current;
    if (!el) return;

    const startX = e.clientX - posRef.current.x;
    const startY = e.clientY - posRef.current.y;
    let rafId = null;

    const onMove = (moveEv) => {
      const nextX = moveEv.clientX - startX;
      const nextY = moveEv.clientY - startY;
      posRef.current.x = nextX;
      posRef.current.y = nextY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (windowRef.current) {
          windowRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
      });
    };

    const onUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
  }, [canDrag]);

  // Pure DOM resize — updates style directly in rAF without React state re-renders
  const handleResizeStart = useCallback((e, edge) => {
    e.preventDefault();
    e.stopPropagation();
    const el = windowRef.current;
    if (!el) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = sizeRef.current.w;
    const startH = sizeRef.current.h;
    let rafId = null;

    const onMove = (moveEv) => {
      const clientX = moveEv.clientX;
      const clientY = moveEv.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        let newW = startW;
        let newH = startH;
        if (edge === 'right' || edge === 'br') newW = startW + (clientX - startX);
        if (edge === 'bottom' || edge === 'br') newH = startH + (clientY - startY);

        const clampedW = Math.min(window.innerWidth - 24, Math.max(300, newW));
        const clampedH = Math.min(window.innerHeight - 40, Math.max(220, newH));
        sizeRef.current.w = clampedW;
        sizeRef.current.h = clampedH;

        if (windowRef.current) {
          windowRef.current.style.width = `${clampedW}px`;
          windowRef.current.style.height = `${clampedH}px`;
        }
      });
    };

    const onUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
  }, []);

  const selectLanguage = useCallback((selectedLang, userInput) => {
    setTermLang(selectedLang);
    setIsSelectingLang(false);
    const t = terminalTranslations[selectedLang];
    const userLabel = userInput || (selectedLang === 'en' ? '1 (English)' : '2 (Indonesia)');
    const confirmMsg = selectedLang === 'en'
      ? terminalTranslations.en.langChangeEn
      : terminalTranslations.id.langChangeId;

    setHistory([
      { type: 'user', text: userLabel },
      { type: 'system', text: confirmMsg },
      { type: 'system', text: t.welcome },
      { type: 'system', text: t.hint },
    ]);
    setInput('');
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 40);
  }, []);

  // Key listener for Ctrl + ` or typing 'sudo' (Easter Egg style)
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen && !e.ctrlKey && !e.metaKey && e.key.length === 1) {
        const tag = e.target?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
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
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isOpen]);

  // Direct scrollTop manipulation when new command output is appended
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el && isOpen) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [history, isSelectingLang, isOpen]);

  useEffect(() => {
    localStorage.setItem('portfolioTerminalLang', termLang);
  }, [termLang]);

  const runCommand = useCallback((cmdText) => {
    const trimmed = (cmdText || '').trim();
    const cmd = trimmed.toLowerCase();

    if (isSelectingLang) {
      if (!trimmed) return;
      if (cmd === '1' || cmd === 'en' || cmd === 'english') {
        selectLanguage('en', trimmed);
        return;
      }
      if (cmd === '2' || cmd === 'id' || cmd === 'indonesia' || cmd === 'indo') {
        selectLanguage('id', trimmed);
        return;
      }
      setHistory((prev) => [
        ...prev,
        { type: 'user', text: trimmed },
        { type: 'system', text: 'Please select [1] for English or [2] for Indonesia / Silakan pilih [1] atau [2].' }
      ]);
      setInput('');
      return;
    }

    if (!trimmed) return;

    const t = terminalTranslations[termLang];

    if (cmd === 'set language' || cmd === 'language' || cmd === 'lang') {
      setIsSelectingLang(true);
      setInput('');
      return;
    }

    if (cmd === 'clear') {
      setHistory([{ type: 'system', text: t.hint }]);
      setInput('');
      return;
    }

    setHistory((prev) => {
      const next = [...prev, { type: 'user', text: trimmed }];
      switch (cmd) {
        case 'help':
          next.push(
            { type: 'system', text: t.helpHeader },
            { type: 'system', text: t.helpAbout },
            { type: 'system', text: t.helpSkills },
            { type: 'system', text: t.helpProjects },
            { type: 'system', text: t.helpExperience },
            { type: 'system', text: t.helpEducation },
            { type: 'system', text: t.helpLangId },
            { type: 'system', text: t.helpLangEn },
            { type: 'system', text: t.helpClear },
            { type: 'system', text: t.helpHire }
          );
          break;
        case 'about':
          t.aboutLines.forEach((lineText) => {
            next.push({ type: 'system', text: lineText });
          });
          break;
        case 'skills':
          next.push({ type: 'system', text: t.skillsMsg });
          break;
        case 'projects':
        case 'project':
        case 'proj':
          t.projectsLines.forEach((lineText) => {
            next.push({ type: 'system', text: lineText });
          });
          break;
        case 'experience':
        case 'exp':
          t.experienceLines.forEach((lineText) => {
            next.push({ type: 'system', text: lineText });
          });
          break;
        case 'education':
        case 'edu':
          t.educationLines.forEach((lineText) => {
            next.push({ type: 'system', text: lineText });
          });
          break;
        case 'lang id':
        case 'language id':
          setTermLang('id');
          next.push({ type: 'system', text: terminalTranslations.id.langChangeId });
          break;
        case 'lang en':
        case 'language en':
          setTermLang('en');
          next.push({ type: 'system', text: terminalTranslations.en.langChangeEn });
          break;
        case 'sudo hire gelby':
          next.push(
            { type: 'system', text: t.hireCheck },
            { type: 'system', text: t.hireGranted }
          );
          setTimeout(() => {
            setIsOpen(false);
            if (onHireMe) onHireMe();
          }, 1200);
          break;
        case 'sudo':
          next.push(
            { type: 'system', text: t.sudoUsage },
            { type: 'system', text: t.sudoHint }
          );
          break;
        default:
          if (cmd.startsWith('sudo ')) {
            next.push({ type: 'system', text: t.sudoReport });
          } else {
            next.push({ type: 'system', text: `${t.notFound} ${trimmed}. ${t.typeHelp}` });
          }
          break;
      }
      return next.length > MAX_HISTORY_LINES ? next.slice(-MAX_HISTORY_LINES) : next;
    });
    setInput('');
  }, [isSelectingLang, selectLanguage, termLang, onHireMe]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      runCommand(input);
    }
  };

  const handleQuickExecute = useCallback((cmdInner) => {
    runCommand(cmdInner);
    inputRef.current?.focus({ preventScroll: true });
  }, [runCommand]);

  // Only focus input on click if user isn't selecting text
  const handleBodyClick = useCallback(() => {
    const sel = window.getSelection?.();
    if (sel && sel.toString().length > 0) return;
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      style={{
        contain: 'layout paint style',
        isolation: 'isolate',
        transform: canDrag
          ? `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
          : 'translate3d(0, 0, 0)',
        ...(isFullscreen
          ? {
              left: 0,
              top: 0,
              width: '100vw',
              height: '100dvh',
              maxWidth: '100vw',
              maxHeight: '100dvh',
              borderRadius: '0px',
            }
          : isMobileOrTablet
          ? {
              left: '3vw',
              top: '8dvh',
              width: '94vw',
              height: 'min(420px, 72dvh)',
              borderRadius: '10px',
            }
          : {
              left: 'max(2vw, calc(50vw - 400px))',
              top: '15vh',
              width: sizeRef.current.w,
              height: sizeRef.current.h,
              maxWidth: '95vw',
              maxHeight: '82vh',
              borderRadius: '8px',
            }),
      }}
      className="fixed z-[99999] bg-[#08090d] border border-white/15 shadow-2xl font-mono text-xs sm:text-sm flex flex-col overflow-hidden"
    >
      {/* Resize Handles (Desktop only) */}
      {canDrag && (
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
        className="flex items-center justify-between bg-[#0d0f17] border-b border-white/10 select-none h-10 shrink-0"
        onPointerDown={handleHeaderDragStart}
        onDoubleClick={() => setIsFullscreen((prev) => !prev)}
        style={{ cursor: canDrag ? 'grab' : 'default', touchAction: 'none' }}
      >
        <div className="flex gap-2.5 items-center px-3.5 flex-1 overflow-hidden">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10 shrink-0">
            <span className="text-accent text-[10px] font-bold">λ</span>
          </div>
          <div className="text-gray-300 text-xs tracking-wider font-semibold truncate">
            TERMINAL // GELBY_OS
          </div>
        </div>

        {/* Minimalist Controls */}
        <div className="flex h-full px-2 gap-1 items-center">
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors"
            title={isFullscreen ? 'Restore Down' : 'Maximize'}
          >
            <div
              className={
                isFullscreen
                  ? "w-2.5 h-2.5 border-2 border-current relative after:content-[''] after:absolute after:-top-1.5 after:-right-1.5 after:w-2.5 after:h-2.5 after:border-t-2 after:border-r-2 after:border-current"
                  : 'w-3 h-3 border-2 border-current rounded-sm'
              }
            />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-500/80 hover:text-white text-gray-400 transition-colors"
            title="Close"
          >
            <FiX size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Terminal Body — 100% Opaque + GPU Tiled Scroll Layer */}
      <div
        ref={scrollContainerRef}
        onClick={handleBodyClick}
        style={{
          contain: 'content',
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
        }}
        className="flex-1 p-3.5 sm:p-5 bg-[#08090d] overflow-y-auto overscroll-contain text-gray-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-[#08090d]"
      >
        {/* Language Selection Header */}
        {isSelectingLang && (
          <div className="mb-4 pb-3.5 border-b border-white/10">
            <div className="text-accent font-bold tracking-wide text-xs mb-2.5">
              Set Language // Pilih Bahasa:
            </div>
            <div className="flex flex-wrap gap-2.5 mb-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectLanguage('en');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#141720] hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-gray-200 hover:text-accent transition-colors text-xs flex items-center gap-2 cursor-pointer"
              >
                <span className="text-accent font-bold font-mono">[1]</span>
                <span>English (EN)</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectLanguage('id');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#141720] hover:bg-accent/20 border border-white/10 hover:border-accent/40 text-gray-200 hover:text-accent transition-colors text-xs flex items-center gap-2 cursor-pointer"
              >
                <span className="text-accent font-bold font-mono">[2]</span>
                <span>Indonesia (ID)</span>
              </button>
            </div>
            <div className="text-gray-500 text-[11px] font-mono">
              Type 1 or 2, or tap an option above
            </div>
          </div>
        )}

        {history.map((line, i) => (
          <HistoryRow key={i} line={line} onRunCommand={handleQuickExecute} />
        ))}

        <div className="flex items-center mt-2">
          <span className="text-accent mr-2 shrink-0">λ</span>
          <span className="text-gray-400 mr-2 shrink-0">
            {isSelectingLang ? 'setup ~' : 'guest ~'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder={isSelectingLang ? 'Select 1 or 2...' : ''}
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-100 placeholder-gray-600 border-none focus:ring-0 p-0 shadow-none font-mono text-[16px] sm:text-sm selection:bg-accent/30"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
        <div className="h-3" />
      </div>
    </div>
  );
}
