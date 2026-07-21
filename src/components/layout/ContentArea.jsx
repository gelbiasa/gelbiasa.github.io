import React, { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Code splitting (Lazy Loading) to drastically reduce initial JavaScript payload
const HomeSection = lazy(() => import('../sections/HomeSection'));
const Projects = lazy(() => import('../sections/Projects'));
const Skills = lazy(() => import('../sections/Skills'));
const Experience = lazy(() => import('../sections/Experience'));

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
          <Suspense fallback={<div className="flex items-center justify-center h-[50vh] text-accent animate-pulse font-mono text-sm tracking-widest">Loading...</div>}>
            {activeTab === 'home' && <HomeSection setActiveTab={setActiveTab} />}
            {activeTab === 'projects' && <Projects />}
            {activeTab === 'skills' && <Skills />}
            {activeTab === 'experience' && <Experience />}
            {activeTab === 'contact' && (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <h2 className="text-2xl text-slate-400">Contact Section Coming Soon</h2>
              </div>
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ContentArea;
