import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import TopNav from './components/layout/TopNav';
import ContentArea from './components/layout/ContentArea';
import HireMeOverlay from './components/ui/HireMeOverlay';
import TerminalIntro from './components/ui/TerminalIntro';
import HiddenTerminal from './components/ui/HiddenTerminal';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('portfolioActiveTab') || 'home';
  });
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Setup Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // Show terminal intro once per browser session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('gelby_intro_shown');
  });

  const handleTabChange = (tabId) => {
    if (tabId === 'contact') {
      setShowOverlay(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const handleHireMeClick = () => {
    setShowOverlay(true);
  };

  useEffect(() => {
    localStorage.setItem('portfolioActiveTab', activeTab);
  }, [activeTab]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* 
          Solid dark background based on index.css variables 
          No mesh-bg or noise applied as per the new clean design requirement
        */}
        <div className="relative min-h-screen w-full flex flex-col selection:bg-accent-glow selection:text-text-primary bg-[var(--bg-primary)]">
          
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[9999] shadow-[0_0_10px_rgb(var(--accent-rgb))]"
            style={{ scaleX }}
          />
          {/* Full-screen terminal intro (once per session) */}
          {showIntro && <TerminalIntro onDone={() => setShowIntro(false)} />}

          {/* Interactive Easter Egg Terminal */}
          <HiddenTerminal onHireMe={() => setShowOverlay(true)} />

          {/* Top Navigation Bar */}
          <TopNav activeTab={activeTab} setActiveTab={handleTabChange} onHireMeClick={handleHireMeClick} />

          {/* Main Content */}
          <main className="flex-1 w-full flex flex-col">
            <ContentArea activeTab={activeTab} setActiveTab={handleTabChange} />
          </main>
          
          {/* Cinematic Hire Me Overlay */}
          <AnimatePresence>
            {showOverlay && (
              <HireMeOverlay
                key="hire-overlay"
                onSwitchTab={() => setActiveTab('contact')}
                onDone={() => {
                  setShowOverlay(false);
                }}
              />
            )}
          </AnimatePresence>

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
