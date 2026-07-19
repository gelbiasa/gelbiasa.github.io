import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowUpRight } from 'react-icons/fi';

const TopNav = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
          scrolled
            ? 'h-16 bg-[#0b0c10]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'h-20 bg-transparent'
        }`}
      >
        {/* === LOGO === */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 group"
        >
          {/* Monogram Badge */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-accent rounded-lg rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80" />
            <div className="absolute inset-0 bg-accent/30 rounded-lg -rotate-3 group-hover:rotate-0 transition-transform duration-300" />
            <span className="relative text-[#0b0c10] font-black text-lg tracking-tighter z-10">G</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-white font-bold text-sm tracking-widest uppercase">Gelby</span>
            <span className="text-accent text-[9px] tracking-[0.3em] font-medium uppercase">Portfolio</span>
          </div>
        </button>

        {/* === CENTER NAV (Desktop) === */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5 backdrop-blur-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative px-5 py-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full group"
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-accent/15 border border-accent/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-slate-400 group-hover:text-white'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* === RIGHT CTA === */}
        <div className="flex items-center gap-3">
          {/* Hire Me CTA */}
          <a
            href="mailto:isroqigelby@gmail.com"
            className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full bg-accent text-[#0b0c10] text-xs font-black tracking-wider uppercase hover:bg-accent-light transition-all duration-300 shadow-[0_0_20px_rgba(84,229,166,0.3)] hover:shadow-[0_0_30px_rgba(84,229,166,0.6)]"
          >
            Hire Me <FiArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
            <span className={`block h-0.5 bg-accent transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-6'}`} />
          </button>
        </div>
      </motion.header>

      {/* === MOBILE DRAWER === */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-[#12141c]/95 backdrop-blur-2xl border-l border-white/5 flex flex-col pt-24 pb-10 px-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
            >
              <FiX size={22} />
            </button>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab, i) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleTabClick(tab.id)}
                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-all duration-200 ${
                      isActive
                        ? 'bg-accent/10 text-accent border border-accent/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                );
              })}
            </nav>
            <div className="mt-auto pt-8 border-t border-white/5">
              <a
                href="mailto:isroqigelby@gmail.com"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-[#0b0c10] text-sm font-black uppercase tracking-wider"
              >
                Hire Me <FiArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default TopNav;
