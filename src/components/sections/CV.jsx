import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiExternalLink } from 'react-icons/fi';

const CV = () => {
  const [cvLang, setCvLang] = useState('en'); // 'en' or 'id'
  const [cvStatus, setCvStatus] = useState('checking');

  const currentPath = cvLang === 'en' ? '/file/inggris/CV_Inggris.pdf' : '/file/indonesia/CV_Indonesia.pdf';
  const currentFilename = cvLang === 'en' ? 'CV_Inggris.pdf' : 'CV_Indonesia.pdf';

  useEffect(() => {
    let isMounted = true;
    const checkCVExists = async () => {
      setCvStatus('checking'); // Reset status when language changes
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(currentPath, { 
          method: 'GET',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!isMounted) return;

        const contentType = response.headers.get('content-type') || '';
        
        // Ensure it's not a Vite SPA fallback (which returns text/html)
        if (response.ok && !contentType.includes('text/html')) {
          setCvStatus('available');
        } else {
          setCvStatus('missing');
        }
      } catch (error) {
        if (isMounted) setCvStatus('missing');
      }
    };

    checkCVExists();
    
    return () => {
      isMounted = false;
    };
  }, [cvLang, currentPath]);

  return (
    <section id="cv" className="relative pt-32 pb-8 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-screen">
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

      <div className="w-full h-[85vh] md:h-[1050px] bg-[#12141c] border border-white/10 rounded-3xl flex flex-col overflow-hidden relative">
        {/* Header Bar */}
        <div className="h-16 bg-black/40 border-b border-white/5 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-medium text-slate-400">Select CV Language:</span>
            <div className="flex items-center gap-1 bg-[#0b0c10] p-1 rounded-full border border-white/5">
              <button
                onClick={() => setCvLang('en')}
                className={`px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-full transition-all ${
                  cvLang === 'en' ? 'bg-accent text-black shadow-[0_0_10px_rgba(84,229,166,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setCvLang('id')}
                className={`px-3 md:px-4 py-1 text-[10px] md:text-xs font-bold rounded-full transition-all ${
                  cvLang === 'id' ? 'bg-accent text-black shadow-[0_0_10px_rgba(84,229,166,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Indonesia
              </button>
            </div>
          </div>
          {cvStatus === 'available' && (
            <div className="flex items-center gap-2 md:gap-3">
              <a 
                href={currentPath} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 text-white text-[10px] md:text-xs font-bold rounded-full hover:bg-white/10 transition-all"
              >
                <FiExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span className="hidden sm:inline-block">View Full Size</span>
                <span className="sm:hidden">Full</span>
              </a>
              <a 
                href={currentPath} 
                download={currentFilename}
                className="flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] md:text-xs font-bold rounded-full hover:bg-accent hover:text-black transition-all group"
              >
                <span>Download CV</span>
                <span className="hidden md:inline-block font-normal opacity-70 group-hover:opacity-90">
                  ({cvLang === 'en' ? 'English' : 'Indonesia'})
                </span>
              </a>
            </div>
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
            <>
              {/* Desktop Preview */}
              <iframe
                src={currentPath}
                title={`Curriculum Vitae - ${cvLang === 'en' ? 'English' : 'Indonesia'}`}
                className="hidden lg:block w-full h-full border-none absolute inset-0"
                loading="lazy"
              />

              {/* Mobile & Tablet Fallback */}
              <div className="lg:hidden flex flex-col items-center justify-center w-full text-center py-10 px-4">
                <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                  <FiExternalLink className="w-10 h-10 text-accent relative z-10" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-3">
                  Preview Not Supported
                </h3>
                <p className="text-slate-400 text-sm md:text-base max-w-sm mb-8">
                  Mobile and tablet browsers often restrict embedded PDF viewing. Please open the CV in full size or download it directly to your device.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a 
                    href={currentPath} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto"
                  >
                    View Full Size
                  </a>
                  <a 
                    href={currentPath} 
                    download={currentFilename}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-accent border-2 border-accent text-black font-bold rounded-full hover:bg-transparent hover:text-accent transition-all w-full sm:w-auto"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CV;
