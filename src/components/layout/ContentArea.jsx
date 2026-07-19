import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeSection from '../sections/HomeSection';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';

const ContentArea = ({ activeTab, setActiveTab }) => {
  // Animation variants
  const variants = {
    initial: { opacity: 0, scale: 0.98, filter: 'blur(4px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)' }
  };

  return (
    <div className="w-full flex-1 relative z-10 pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
          {activeTab === 'about' && <About />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'skills' && <Skills />}
          {activeTab === 'contact' && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <h2 className="text-2xl text-slate-400">Contact Section Coming Soon</h2>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContentArea;
