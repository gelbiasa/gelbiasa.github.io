import React from 'react';
import { FiGithub, FiDownload, FiMail, FiLinkedin, FiInstagram, FiSun, FiMoon } from 'react-icons/fi';
import { SiDribbble } from 'react-icons/si';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside className="w-full lg:w-[400px] xl:w-[450px] lg:h-screen lg:fixed lg:top-0 lg:left-0 flex flex-col justify-between p-6 lg:p-10 z-20">
      <div className="flex flex-col gap-6">
        {/* Header / Identity */}
        <div className="relative">
          {/* Theme Toggle (Desktop & Mobile header) */}
          <button 
            onClick={toggleTheme}
            className="absolute right-0 top-0 lg:right-auto lg:left-0 lg:-top-4 p-2 rounded-full glass hover:border-accent transition-colors duration-300"
            title="Toggle Theme"
            style={{ color: 'var(--text-primary)' }}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <h1 
            className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3 mt-6 lg:mt-10"
            style={{ color: 'var(--text-primary)' }}
          >
            M. Isroqi Gelby<br className="hidden lg:block"/> Firmansyah
          </h1>
          <h2 className="text-xl font-medium text-accent mb-4">
            Full-Stack Web Developer <br className="hidden lg:block"/>& UI/UX Designer
          </h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            D-IV Business Information Systems student at Politeknik Negeri Malang. Experienced in engineering secure, enterprise-grade systems and crafting intuitive user experiences.
          </p>
        </div>

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className="hidden md:flex flex-col gap-4 mt-8">
          {['about', 'projects', 'skills'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-left group flex items-center gap-4 py-2 transition-all duration-300"
                style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                <span 
                  className={`h-[1px] transition-all duration-300 ${
                    isActive ? 'w-16 bg-accent' : 'w-8 group-hover:w-16'
                  }`}
                  style={{ backgroundColor: isActive ? '' : 'var(--text-muted)' }}
                ></span>
                <span 
                  className="uppercase text-sm font-bold tracking-widest group-hover:opacity-80 transition-opacity"
                  style={{ color: isActive ? 'var(--text-primary)' : 'inherit' }}
                >
                  {tab}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Action Buttons & Socials */}
      <div className="mt-8 lg:mt-0 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => setActiveTab('projects')}
            className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-xl transition-colors duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
          >
            View Projects
          </button>
          <a 
            href="/cv.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-xl glass hover:border-accent transition-all duration-300"
            title="Download CV"
            style={{ color: 'var(--text-primary)' }}
          >
            <FiDownload size={20} />
          </a>
          <a 
            href="https://github.com/gelbiasa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-xl glass hover:border-accent transition-all duration-300"
            title="GitHub"
            style={{ color: 'var(--text-primary)' }}
          >
            <FiGithub size={20} />
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5" style={{ color: 'var(--text-muted)' }}>
          <a href="https://linkedin.com/in/gelby" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <FiLinkedin size={22} />
          </a>
          <a href="mailto:isroqigelby@gmail.com" className="hover:text-accent transition-colors">
            <FiMail size={22} />
          </a>
          <a href="https://dribbble.com/gelbiasa" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <SiDribbble size={22} />
          </a>
          <a href="https://instagram.com/gelbiasa" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <FiInstagram size={22} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
