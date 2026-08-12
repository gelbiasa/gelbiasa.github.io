import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import TopNav from './components/layout/TopNav';
import ContentArea from './components/layout/ContentArea';
import HireMeOverlay from './components/ui/HireMeOverlay';
import TerminalIntro from './components/ui/TerminalIntro';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('portfolioActiveTab') || 'home';
  });
  const [showOverlay, setShowOverlay] = useState(false);
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
          
          {/* Full-screen terminal intro (once per session) */}
          {showIntro && <TerminalIntro onDone={() => setShowIntro(false)} />}

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
