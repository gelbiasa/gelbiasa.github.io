import React, { useState, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiAward, 
  FiShield, 
  FiCheckCircle, 
  FiClock, 
  FiFileText, 
  FiExternalLink, 
  FiDownload, 
  FiSearch, 
  FiX, 
  FiGlobe, 
  FiCode, 
  FiTerminal, 
  FiDatabase, 
  FiCheck,
  FiInfo,
  FiLayers
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { certificatesData, certificateCategories } from '../../data/certificates';

// Lazy load CustomPdfViewer for smooth bundle splitting
const CustomPdfViewer = lazy(() => import('../ui/CustomPdfViewer'));

const getCategoryIcon = (category) => {
  switch (category) {
    case 'national':
      return <FiShield className="w-4 h-4 text-emerald-400" />;
    case 'course':
      return <FiCode className="w-4 h-4 text-blue-400" />;
    case 'language':
      return <FiGlobe className="w-4 h-4 text-amber-400" />;
    default:
      return <FiAward className="w-4 h-4 text-accent" />;
  }
};

const getIssuerIcon = (iconType) => {
  switch (iconType) {
    case 'shield':
      return <FiShield className="w-6 h-6 text-accent" />;
    case 'globe':
      return <FiGlobe className="w-6 h-6 text-accent" />;
    case 'terminal':
      return <FiTerminal className="w-6 h-6 text-accent" />;
    case 'database':
      return <FiDatabase className="w-6 h-6 text-accent" />;
    case 'code':
      return <FiCode className="w-6 h-6 text-accent" />;
    default:
      return <FiAward className="w-6 h-6 text-accent" />;
  }
};

export default function Certificates() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  // Counters for Top Stats Row
  const stats = useMemo(() => {
    return {
      total: certificatesData.length,
      national: certificatesData.filter(c => c.category === 'national').length,
      course: certificatesData.filter(c => c.category === 'course').length,
      language: certificatesData.filter(c => c.category === 'language').length,
    };
  }, []);

  // Filtered Certificates
  const filteredCertificates = useMemo(() => {
    return certificatesData.filter((cert) => {
      const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();

      const title = (cert.title[language] || cert.title.en || '').toLowerCase();
      const issuer = (cert.issuer[language] || cert.issuer.en || '').toLowerCase();
      const scheme = (cert.scheme[language] || cert.scheme.en || '').toLowerCase();
      const skills = cert.skills.join(' ').toLowerCase();
      const credId = (cert.credentialId || '').toLowerCase();

      return (
        title.includes(query) ||
        issuer.includes(query) ||
        scheme.includes(query) ||
        skills.includes(query) ||
        credId.includes(query)
      );
    });
  }, [activeCategory, searchQuery, language]);

  return (
    <section id="certificates" className="pt-32 pb-24 relative min-h-screen">
      <div className="section-container relative px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* === SECTION HEADER === */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-1 bg-accent rounded-full" />
            <p className="text-accent text-xs md:text-sm font-mono tracking-widest uppercase">
              {t('certificates.kicker')}
            </p>
            <div className="w-8 h-1 bg-accent rounded-full" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t('certificates.title1')} <span className="text-accent">{t('certificates.title2')}</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('certificates.subtitle')}
          </p>
        </motion.div>

        {/* === TOP STATS ROW === */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {/* Card 1: Total */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface border border-border flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <FiLayers className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary leading-tight font-display">
                {stats.total}
              </p>
              <p className="text-[11px] md:text-xs text-text-secondary font-medium">
                {t('certificates.stats.total')}
              </p>
            </div>
          </div>

          {/* Card 2: National Standards */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface border border-border flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <FiShield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary leading-tight font-display">
                {stats.national}
              </p>
              <p className="text-[11px] md:text-xs text-text-secondary font-medium">
                {t('certificates.stats.national')}
              </p>
            </div>
          </div>

          {/* Card 3: Industry Courses */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface border border-border flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <FiCode className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary leading-tight font-display">
                {stats.course}
              </p>
              <p className="text-[11px] md:text-xs text-text-secondary font-medium">
                {t('certificates.stats.course')}
              </p>
            </div>
          </div>

          {/* Card 4: Language Tests */}
          <div className="p-4 md:p-5 rounded-2xl bg-surface border border-border flex items-center gap-3.5 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <FiGlobe className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black text-text-primary leading-tight font-display">
                {stats.language}
              </p>
              <p className="text-[11px] md:text-xs text-text-secondary font-medium">
                {t('certificates.stats.language')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* === FILTER TABS & SEARCH BAR === */}
        <motion.div
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-surface-2/60 p-2 md:p-3 rounded-2xl border border-border backdrop-blur-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
            {certificateCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all' ? stats.total : stats[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-accent text-background shadow-md shadow-accent/20 scale-[1.02]'
                      : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-2 border border-border'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{t(cat.labelKey)}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-background/25 text-background font-bold' : 'bg-surface-2 text-text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] lg:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('certificates.searchPlaceholder')}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-surface border border-border text-xs md:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                title="Clear Search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* === CERTIFICATES GRID === */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, index) => {
              const isAvailable = cert.status === 'available';
              const titleText = cert.title[language] || cert.title.en;
              const issuerText = cert.issuer[language] || cert.issuer.en;
              const schemeText = cert.scheme[language] || cert.scheme.en;
              const descText = cert.description[language] || cert.description.en;
              const validityText = typeof cert.expiryDate === 'object' ? (cert.expiryDate[language] || cert.expiryDate.en) : cert.expiryDate;

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}
                  className="group relative flex flex-col justify-between bg-surface border border-border hover:border-accent/50 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
                >
                  <div>
                    {/* Header: Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase bg-surface-2 border border-border text-accent">
                        {cert.badge}
                      </span>

                      {/* Status indicator */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          isAvailable
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-accent/10 text-accent border-accent/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isAvailable ? 'bg-emerald-400' : 'bg-accent animate-pulse'
                          }`}
                        />
                        {isAvailable ? t('certificates.status.verified') : t('certificates.status.upcoming')}
                      </span>
                    </div>

                    {/* Issuer Avatar & Title */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors shadow-inner">
                        {getIssuerIcon(cert.iconType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-text-secondary truncate">
                          {issuerText}
                        </p>
                        <h3 className="text-base md:text-lg font-bold text-text-primary leading-snug group-hover:text-accent transition-colors">
                          {titleText}
                        </h3>
                      </div>
                    </div>

                    {/* Scheme Info */}
                    <p className="text-xs text-text-muted mb-4 line-clamp-2">
                      <span className="font-semibold text-text-secondary">{t('certificates.card.schemeLabel')} </span>
                      {schemeText}
                    </p>

                    {/* Metadata Specs Box */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-2/60 border border-border/80 text-[11px] mb-4 font-mono">
                      <div>
                        <span className="block text-text-muted text-[10px] uppercase font-sans">
                          {t('certificates.card.validityLabel')}
                        </span>
                        <span className="font-semibold text-text-primary">
                          {cert.issueDate} • {validityText}
                        </span>
                      </div>
                      <div>
                        <span className="block text-text-muted text-[10px] uppercase font-sans">
                          {t('certificates.card.regLabel')}
                        </span>
                        <span className="font-semibold text-text-primary truncate block" title={cert.credentialId}>
                          {cert.credentialId}
                        </span>
                      </div>
                    </div>

                    {/* Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-surface-2 text-[10px] font-mono text-text-secondary border border-border/60"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-2 mt-auto">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface border border-border text-text-primary hover:text-accent text-xs font-bold transition-all shadow-sm group/btn"
                    >
                      <FiFileText className="w-3.5 h-3.5 group-hover/btn:text-accent transition-colors" />
                      <span>{t('certificates.actions.viewCert')}</span>
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-surface-2 hover:bg-surface border border-border text-text-secondary hover:text-text-primary transition-colors"
                        title={t('certificates.actions.verifyOnline')}
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}

                    {cert.file && (
                      <a
                        href={cert.file}
                        download
                        className="p-2 rounded-xl bg-accent text-background hover:brightness-110 shadow-md shadow-accent/20 transition-all font-bold"
                        title={t('certificates.actions.download')}
                      >
                        <FiDownload size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            className="flex flex-col items-center justify-center text-center p-12 bg-surface border border-border rounded-3xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-4">
              <FiSearch className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              {t('certificates.emptyTitle')}
            </h3>
            <p className="text-xs md:text-sm text-text-secondary max-w-md mb-6">
              {t('certificates.emptyDesc')}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-accent text-background text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-accent/20"
            >
              {t('certificates.resetFilter')}
            </button>
          </motion.div>
        )}

        {/* === CERTIFICATE DETAIL / PREVIEW MODAL === */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4 pb-4 pt-24 md:px-8 md:pb-8 md:pt-28 bg-background/95"
            >
              <div className="absolute inset-0" onClick={() => setSelectedCert(null)} />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col h-full max-h-[90vh] pointer-events-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      {getIssuerIcon(selectedCert.iconType)}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-text-primary leading-tight">
                        {selectedCert.title[language] || selectedCert.title.en}
                      </h3>
                      <p className="text-xs text-text-secondary font-medium">
                        {selectedCert.issuer[language] || selectedCert.issuer.en}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-full transition-colors"
                    title={t('certificates.actions.close')}
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 bg-background rounded-xl overflow-hidden border border-border flex flex-col relative">
                  {selectedCert.file ? (
                    /* PDF Document Preview */
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
                          <span className="text-text-muted text-sm animate-pulse">Loading Certificate...</span>
                        </div>
                      }
                    >
                      <CustomPdfViewer fileUrl={selectedCert.file} />
                    </Suspense>
                  ) : (
                    /* Elegant Slot Prepared / Coming Soon Container */
                    <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        {/* Notice Banner */}
                        <div className="p-4 md:p-5 rounded-2xl bg-surface border border-accent/30 flex items-start gap-4 mb-6 shadow-sm">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <FiClock className="w-5 h-5 text-accent animate-pulse" />
                          </div>
                          <div>
                            <h4 className="text-sm md:text-base font-bold text-text-primary mb-1">
                              {t('certificates.modal.fileNoticeTitle')}
                            </h4>
                            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                              {t('certificates.modal.fileNoticeDesc')}
                            </p>
                          </div>
                        </div>

                        {/* Full Metadata Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-xl bg-surface border border-border">
                            <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                              {t('certificates.modal.issuer')}
                            </span>
                            <span className="text-sm font-bold text-text-primary block">
                              {selectedCert.issuer[language] || selectedCert.issuer.en}
                            </span>
                          </div>

                          <div className="p-4 rounded-xl bg-surface border border-border">
                            <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                              {t('certificates.modal.regNumber')}
                            </span>
                            <span className="text-sm font-bold font-mono text-accent block">
                              {selectedCert.credentialId}
                            </span>
                          </div>

                          <div className="p-4 rounded-xl bg-surface border border-border">
                            <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                              {t('certificates.modal.schemeLabel')}
                            </span>
                            <span className="text-xs md:text-sm font-semibold text-text-primary block">
                              {selectedCert.scheme[language] || selectedCert.scheme.en}
                            </span>
                          </div>

                          <div className="p-4 rounded-xl bg-surface border border-border">
                            <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                              {t('certificates.modal.validity')}
                            </span>
                            <span className="text-xs md:text-sm font-semibold text-text-primary block">
                              {selectedCert.issueDate} • {typeof selectedCert.expiryDate === 'object' ? (selectedCert.expiryDate[language] || selectedCert.expiryDate.en) : selectedCert.expiryDate}
                            </span>
                          </div>
                        </div>

                        {/* Assessment Description */}
                        <div className="p-4 rounded-xl bg-surface border border-border mb-6">
                          <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                            {t('certificates.modal.summaryLabel')}
                          </span>
                          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                            {selectedCert.description[language] || selectedCert.description.en}
                          </p>
                        </div>

                        {/* Tested Skills */}
                        <div className="mb-6">
                          <span className="text-[11px] font-mono text-text-muted uppercase block mb-2">
                            {t('certificates.modal.skillsAcquired')}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedCert.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-mono text-text-primary flex items-center gap-1.5"
                              >
                                <FiCheck className="text-emerald-400 w-3 h-3" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Developer Integration Tip */}
                      <div className="p-3.5 rounded-xl bg-surface-2/80 border border-border/80 flex items-center gap-3 text-[11px] text-text-muted">
                        <FiInfo className="w-4 h-4 text-accent shrink-0" />
                        <span>{t('certificates.modal.uploadHint')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
