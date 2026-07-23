import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TopNav from './components/layout/TopNav';
import ContentArea from './components/layout/ContentArea';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('portfolioActiveTab') || 'home';
  });

  useEffect(() => {
    localStorage.setItem('portfolioActiveTab', activeTab);
  }, [activeTab]);

  return (
    <ThemeProvider>
      {/* 
        Solid dark background based on index.css variables 
        No mesh-bg or noise applied as per the new clean design requirement
      */}
      <div className="relative min-h-screen w-full flex flex-col selection:bg-accent-glow selection:text-white bg-[var(--bg-primary)]">
        
        {/* Top Navigation Bar */}
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 w-full flex flex-col">
          <ContentArea activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
