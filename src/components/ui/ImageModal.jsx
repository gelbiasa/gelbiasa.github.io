import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize, FiMinimize, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

export default function ImageModal({ selectedCert, onClose }) {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset state when a new cert is opened
  useEffect(() => {
    if (selectedCert) {
      setCurrentIdx(0);
      setIsFullscreen(false);
    }
  }, [selectedCert]);

  const modalContent = (
    <AnimatePresence>
      {selectedCert && (
        <div className={`fixed inset-0 flex items-center justify-center transition-all ${isFullscreen ? 'z-[99999] p-0' : 'z-[40] px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-28'}`}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative bg-surface border border-border flex flex-col transition-all duration-300 ${
              isFullscreen 
                ? 'w-full h-full rounded-none' 
                : 'p-5 sm:p-6 rounded-2xl shadow-xl w-full max-w-4xl h-full'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between flex-shrink-0 ${isFullscreen ? 'p-4 border-b border-border bg-surface-2' : 'mb-4'}`}>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                  {selectedCert.label} {selectedCert.images.length > 1 && <span className="text-sm font-medium text-text-secondary ml-2">({currentIdx + 1} / {selectedCert.images.length})</span>}
                </h3>
                <p className="text-accent text-sm font-semibold mt-1">{selectedCert.company}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 hover:bg-white/10 rounded-lg text-text-primary transition-colors text-xs sm:text-sm font-bold border border-border"
                >
                  {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
                  <span className="hidden sm:inline">
                    {isFullscreen ? (t('education.exitFullscreen') || 'Exit Full Screen') : (t('education.fullscreen') || 'Full Screen')}
                  </span>
                </button>

                <a 
                  href={selectedCert.images[currentIdx]} 
                  download 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 sm:py-2 rounded-lg bg-accent text-text-on-accent hover:bg-accent-light transition-all font-bold text-xs sm:text-sm shadow-[0_0_15px_var(--accent-glow)] hover:shadow-[0_0_25px_var(--accent-glow)]"
                >
                  <FiDownload size={16} />
                  <span className="hidden sm:inline">
                    {t('experience.saveImage')}
                  </span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 bg-white/5 hover:bg-white/10 rounded-full text-text-secondary transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Pagination Buttons (if > 1) */}
            {selectedCert.images.length > 1 && (
              <div className={`flex flex-wrap items-center gap-2 shrink-0 ${isFullscreen ? 'px-4 pt-4 mb-2' : 'mb-4'}`}>
                {selectedCert.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 border ${
                      currentIdx === idx
                        ? 'bg-accent text-text-on-accent border-accent shadow-[0_0_10px_var(--accent-glow)]'
                        : 'bg-surface-2 text-text-secondary border-border hover:border-accent hover:text-accent'
                    }`}
                  >
                    {t('experience.cert')} {idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Image area */}
            <div className={`flex-1 overflow-hidden rounded-xl flex justify-center items-center ${isFullscreen ? 'p-4 bg-background' : 'bg-black/20 border border-border/50'}`}>
              <img 
                key={currentIdx} // helps trigger fade if we want, but basically forces re-render
                src={selectedCert.images[currentIdx]} 
                alt={`${selectedCert.label} ${currentIdx + 1}`} 
                className="w-full h-full object-contain rounded-xl drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
