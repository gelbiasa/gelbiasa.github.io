import React from 'react';
import { FiUser, FiCode, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'projects', label: 'Projects', icon: FiCode },
    { id: 'skills', label: 'Skills', icon: FiLayers },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2" style={{ background: 'linear-gradient(to top, var(--bg-primary) 60%, transparent)' }}>
      <nav className="glass rounded-2xl p-2 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-colors duration-300 z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'var(--border)' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon 
                size={22} 
                className="mb-1 transition-colors duration-300"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              />
              <span 
                className="text-[10px] font-semibold transition-colors duration-300"
                style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
