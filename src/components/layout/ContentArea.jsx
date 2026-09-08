import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import HomeSection from '../sections/HomeSection';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import CV from '../sections/CV';
import Contact from '../sections/Contact';
import { useLanguage } from '../../context/LanguageContext';

const ContentArea = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  // Animation variants
  const variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
  };

  return (
    <div className="w-full flex-1 relative z-10 pb-24">
      <AnimatePresence 
        mode="wait" 
        onExitComplete={() => {
          // Fix for the blank screen issue: Reset scroll position when old component finishes exiting
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }}
      >
        <motion.div
          key={activeTab}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-full"
          onAnimationStart={() => {
            // Failsafe: Ensure window is at top when new animation starts
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        >
          {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'skills' && <Skills />}
          {activeTab === 'experience' && <Experience />}
          {activeTab === 'education' && <Education />}
          {activeTab === 'cv' && <CV />}
          {activeTab === 'contact' && <Contact />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContentArea;
