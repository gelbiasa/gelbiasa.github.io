import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const CV = () => {
  const [cvStatus, setCvStatus] = useState('checking');

  useEffect(() => {
    const checkCVExists = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch('/CV/CV.pdf', { 
          method: 'GET',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const contentType = response.headers.get('content-type');
        
        // Ensure it's a PDF to avoid false positives from Vite SPA fallback
        if (response.ok && contentType && contentType.includes('application/pdf')) {
          setCvStatus('available');
        } else {
          setCvStatus('missing');
        }
      } catch (error) {
        setCvStatus('missing');
      }
    };

    checkCVExists();
  }, []);

  return (
    <section id="cv" className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-accent rounded-full" />
          <p className="text-accent text-sm font-mono tracking-widest uppercase">My Resume</p>
        </div>
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-4">
          <span className="text-white">Curriculum </span>
          <span className="text-accent">Vitae</span>
        </h2>
        <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Here is a detailed overview of my professional experience, skills, and education. You can read it directly here or download it as a PDF for offline viewing.
        </p>
      </motion.div>

      <div className="w-full h-[600px] bg-[#12141c] border border-white/10 rounded-3xl flex flex-col overflow-hidden relative">
        {/* Header Bar */}
        <div className="h-14 bg-black/40 border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-10">
          <span className="text-xs font-mono text-slate-400 tracking-wider">CV_Isroqi_Gelby.pdf</span>
          {cvStatus === 'available' && (
            <a 
              href="/CV/CV.pdf" 
              download="CV_Isroqi_Gelby.pdf"
              className="flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-bold rounded-full hover:bg-accent hover:text-black transition-all"
            >
              Download PDF
            </a>
          )}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 bg-[#0b0c10] flex flex-col items-center justify-center p-6 relative">
          {cvStatus === 'checking' && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
              <p className="text-slate-400 text-sm">Checking document...</p>
            </div>
          )}

          {cvStatus === 'missing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                <div className="w-24 h-24 shrink-0 rounded-full bg-[#0b0c10] border-2 border-accent/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(84,229,166,0.2)]">
                  <FiClock className="w-10 h-10 text-accent" />
                </div>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                CV <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Coming Soon</span>
              </h3>
              <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed">
                My detailed curriculum vitae is currently being updated. Please check back later or feel free to contact me directly for any inquiries!
              </p>
            </motion.div>
          )}

          {cvStatus === 'available' && (
            <iframe
              src="/CV/CV.pdf"
              title="Curriculum Vitae"
              className="w-full h-full border-none absolute inset-0 pt-14"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CV;
