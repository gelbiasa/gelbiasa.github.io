import React from 'react';
import { motion } from 'framer-motion';

const DockNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'Qualifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl mx-auto">
      <nav 
        className="glass rounded-full flex items-center justify-between p-2 shadow-2xl border"
        style={{ borderColor: 'var(--border)', background: 'var(--glass)' }}
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 min-w-[70px] lg:min-w-[90px] py-2 lg:py-3 rounded-full transition-all duration-300 z-10 group"
              >
                {isActive && (
                  <motion.div
                    layoutId="dockIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span 
                  className="text-[10px] lg:text-sm font-semibold transition-colors duration-300"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {tab.label}
                </span>

                {/* Dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="dockDot"
                    className="absolute bottom-1 lg:bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--text-primary)' }}
                    initial={false}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Hire Me Button */}
        <div className="pl-3 pr-1 lg:pl-4 lg:pr-2 border-l ml-1 lg:ml-2" style={{ borderColor: 'var(--border)' }}>
          <button 
            className="flex items-center justify-center gap-1.5 lg:gap-2 whitespace-nowrap bg-accent text-white px-4 py-2 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 hover:bg-accent-light shadow-lg hover:shadow-accent/40"
          >
            Hire Me <span className="text-white">✨</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DockNav;
