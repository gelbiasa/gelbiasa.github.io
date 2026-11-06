import React, { useState, useMemo, Suspense, lazy, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiAward,
  FiShield,
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
  FiGrid,
  FiChevronRight,
  FiCalendar,
  FiHash,
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { certificatesData } from '../../data/certificates';
import { DragScroll } from './Projects';

// Lazy load CustomPdfViewer for smooth bundle splitting
const CustomPdfViewer = lazy(() => import('../ui/CustomPdfViewer'));

const ALL_GROUPS = ['national', 'general', 'course'];
const CERT_GROUPS = ['national', 'general'];

const issuerIcons = {
  shield: FiShield,
  globe: FiGlobe,
  terminal: FiTerminal,
  database: FiDatabase,
  code: FiCode,
  award: FiAward,
};

const pick = (obj, language) => (obj && typeof obj === 'object' ? obj[language] || obj.en : obj);

/* ---------------------------------------------------------------- */
/* Certificate Card                                                  */
/* ---------------------------------------------------------------- */
const CertificateCard = memo(function CertificateCard({ cert, language, onOpen }) {
  const { t } = useLanguage();
  const isAvailable = cert.status === 'available';
  const Icon = issuerIcons[cert.iconType] || FiAward;
  const validity = pick(cert.expiryDate, language);

  return (
    <div
      onClick={(e) => {
        if (!e.target.closest('a') && !e.target.closest('button')) onOpen(cert);
      }}
      className="project-card bg-surface rounded-2xl border border-border hover:-translate-y-1 transition-transform duration-200 cursor-pointer flex flex-col h-full group shadow-lg p-5 md:p-7 relative"
    >
      {/* Top Header Row: Badge & Status */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase bg-surface-2 border border-border text-accent">
          {cert.badge}
        </span>

        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
            isAvailable
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-accent/10 text-accent border-accent/20'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-accent'}`} />
          {isAvailable ? t('certificates.status.verified') : t('certificates.status.upcoming')}
        </span>
      </div>

      {/* Issuer & Title with Icon */}
      <div className="flex items-start gap-3.5 mb-3.5">
        <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center shrink-0 group-hover:border-accent/50 group-hover:scale-105 transition-all duration-200 shadow-sm">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-accent text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1 line-clamp-1">
            {pick(cert.issuer, language)}
          </p>
          <h3 className="font-display font-bold text-lg md:text-xl leading-snug text-text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {pick(cert.title, language)}
          </h3>
        </div>
      </div>

      {/* Scheme Description */}
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
        {pick(cert.scheme, language)}
      </p>

      {/* Metadata Box (Masa Berlaku & No. Reg) */}
      <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-2 border border-border min-w-0">
          <FiCalendar className="w-3.5 h-3.5 text-accent shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-text-muted">
              {t('certificates.card.validityLabel')}
            </span>
            <span className="block font-semibold text-text-primary truncate">
              {cert.issueDate} · {validity}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-2 border border-border min-w-0">
          <FiHash className="w-3.5 h-3.5 text-accent shrink-0" />
          <div className="min-w-0">
            <span className="block text-[9px] uppercase tracking-wider text-text-muted">
              {t('certificates.card.regLabel')}
            </span>
            <span className="block font-semibold font-mono text-text-primary truncate" title={cert.credentialId}>
              {cert.credentialId}
            </span>
          </div>
        </div>
      </div>

      {/* Skill chips */}
      <div className="w-full mb-6">
        <DragScroll className="flex gap-2 items-center px-1 py-1">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="flex-shrink-0 badge bg-surface-2 border-border text-text-primary px-2.5 py-0.5 text-[10px]"
            >
              #{skill}
            </span>
          ))}
        </DragScroll>
      </div>

      {/* Action Footer */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
        <button
          onClick={() => onOpen(cert)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-background font-bold text-xs hover:brightness-110 shadow-md shadow-accent/20 transition-all"
        >
          <FiFileText className="w-4 h-4" />
          <span>{t('certificates.actions.viewCert')}</span>
        </button>

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            title={t('certificates.actions.verifyOnline')}
            className="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <FiExternalLink className="w-4 h-4" />
          </a>
        )}

        {cert.file && (
          <a
            href={cert.file}
            download
            title={t('certificates.actions.download')}
            className="w-9 h-9 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
});

/* ---------------------------------------------------------------- */
/* Detail Modal                                                      */
/* ---------------------------------------------------------------- */
function CertificateModal({ cert, language, onClose }) {
  const { t } = useLanguage();
  const Icon = issuerIcons[cert.iconType] || FiAward;

  const infoBox = (label, value, mono = false) => (
    <div className="p-4 rounded-xl bg-surface border border-border">
      <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">{label}</span>
      <span className={`text-xs md:text-sm font-bold block ${mono ? 'font-mono text-accent' : 'text-text-primary'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 pb-4 pt-24 md:px-8 md:pb-8 md:pt-28 bg-background/95"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col h-full max-h-[90vh] pointer-events-auto"
      >
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-border mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm md:text-lg font-bold text-text-primary leading-tight line-clamp-2">
                {pick(cert.title, language)}
              </h3>
              <p className="text-xs text-text-secondary font-medium truncate">{pick(cert.issuer, language)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-full transition-colors shrink-0"
            title={t('certificates.actions.close')}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 bg-background rounded-xl overflow-hidden border border-border flex flex-col relative">
          {cert.file ? (
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                  <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
                  <span className="text-text-muted text-sm animate-pulse">Loading Certificate...</span>
                </div>
              }
            >
              <CustomPdfViewer fileUrl={cert.file} />
            </Suspense>
          ) : (
            <div className="w-full h-full overflow-y-auto custom-scrollbar p-5 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="p-4 md:p-5 rounded-2xl bg-surface border border-accent/30 flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <FiAward className="w-5 h-5 text-accent" />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                  {infoBox(t('certificates.modal.issuer'), pick(cert.issuer, language))}
                  {infoBox(t('certificates.modal.regNumber'), cert.credentialId, true)}
                  {infoBox(t('certificates.modal.schemeLabel'), pick(cert.scheme, language))}
                  {infoBox(t('certificates.modal.validity'), `${cert.issueDate} · ${pick(cert.expiryDate, language)}`)}
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border mb-6">
                  <span className="text-[11px] font-mono text-text-muted uppercase block mb-1">
                    {t('certificates.modal.summaryLabel')}
                  </span>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {pick(cert.description, language)}
                  </p>
                </div>

                <span className="text-[11px] font-mono text-text-muted uppercase block mb-2">
                  {t('certificates.modal.skillsAcquired')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-mono text-text-primary flex items-center gap-1.5"
                    >
                      <FiCheck className="text-emerald-400 w-3 h-3" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-2/80 border border-border/80 flex items-center gap-3 text-[11px] text-text-muted">
                <FiInfo className="w-4 h-4 text-accent shrink-0" />
                <span>{t('certificates.modal.uploadHint')}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Main Section                                                      */
/* ---------------------------------------------------------------- */
export default function Certificates() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isTabsExpanded, setIsTabsExpanded] = useState(false);

  // Accurate counts calculation
  const counts = useMemo(() => {
    const all = certificatesData.length;
    const course = certificatesData.filter((x) => x.category === 'course').length;
    const certNational = certificatesData.filter((x) => x.category === 'national').length;
    const certGeneral = certificatesData.filter((x) => x.category === 'general').length;
    const certAll = certNational + certGeneral;
    return {
      all,
      course,
      'cert-parent': certAll,
      'cert-all': certAll,
      'cert-national': certNational,
      'cert-general': certGeneral,
    };
  }, []);

  const matchesSearch = (cert) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const haystack = [
      pick(cert.title, language),
      pick(cert.issuer, language),
      pick(cert.scheme, language),
      cert.skills.join(' '),
      cert.credentialId,
      cert.badge,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  };

  const visible = useMemo(() => {
    return certificatesData.filter((c) => {
      let matchesTab = false;
      if (activeTab === 'all') {
        matchesTab = true;
      } else if (activeTab === 'course') {
        matchesTab = c.category === 'course';
      } else if (activeTab === 'cert-all' || activeTab === 'cert-parent') {
        matchesTab = c.category === 'national' || c.category === 'general';
      } else if (activeTab === 'cert-national') {
        matchesTab = c.category === 'national';
      } else if (activeTab === 'cert-general') {
        matchesTab = c.category === 'general';
      }
      return matchesTab && matchesSearch(c);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, language]);

  const resetFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  const isSearching = searchQuery.trim() !== '';

  // Mobile flat tab options
  const mobileTabs = [
    { id: 'all', label: t('certificates.tabs.all'), count: counts.all, icon: FiGrid },
    { id: 'course', label: t('certificates.tabs.course'), count: counts.course, icon: FiCode },
    { id: 'cert-all', label: `${t('certificates.tabs.certParent')}: ${t('certificates.tabs.certAll')}`, count: counts['cert-all'], icon: FiAward },
    { id: 'cert-national', label: `${t('certificates.tabs.certParent')}: ${t('certificates.tabs.certNational')}`, count: counts['cert-national'], icon: FiShield },
    { id: 'cert-general', label: `${t('certificates.tabs.certParent')}: ${t('certificates.tabs.certGeneral')}`, count: counts['cert-general'], icon: FiGlobe },
  ];

  return (
    <section
      id="certificates"
      className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-screen"
    >
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2
          className="font-display font-black text-4xl md:text-5xl tracking-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('certificates.title1')} <span className="gradient-text">{t('certificates.title2')}</span>
        </h2>
        <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {t('certificates.subtitle')}
        </p>
      </motion.div>

      {/* Main Layout: Sticky Sidebar on Left, Content on Right */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Sidebar for Tabs */}
        <aside className="w-fit max-w-full lg:w-64 shrink-0 sticky top-[88px] lg:top-32 z-40 mb-8 lg:mb-0">
          <div className="flex items-stretch gap-2 lg:block w-full">
            <div className="p-1.5 lg:p-0 bg-[var(--glass)] lg:bg-transparent border border-border lg:border-none rounded-2xl lg:rounded-none shadow-xl lg:shadow-none overflow-hidden flex-1 min-w-0">
              
              {/* === MOBILE DRAG SCROLL (Flat list) === */}
              <div className="lg:hidden">
                <DragScroll className="flex items-center gap-2">
                  {mobileTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors whitespace-nowrap border text-xs font-bold ${
                          isActive
                            ? 'bg-accent/15 border-border text-accent shadow-[0_0_15px_rgb(var(--accent-rgb)/0.3)]'
                            : 'bg-transparent border-transparent text-text-secondary hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-surface-2 text-text-muted">
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </DragScroll>
              </div>

              {/* === DESKTOP HIERARCHICAL TREE SIDEBAR === */}
              <div className="hidden lg:flex flex-col gap-2">
                {/* 1. SEMUA */}
                <button
                  onClick={() => setActiveTab('all')}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl text-left transition-colors duration-200 border ${
                    activeTab === 'all'
                      ? 'bg-accent/15 border-border shadow-[0_0_20px_rgb(var(--accent-rgb)/0.3)]'
                      : 'bg-transparent border-transparent hover:bg-white/10'
                  }`}
                >
                  {activeTab === 'all' && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--accent-rgb)/0.5)]" />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'all'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-surface-2 text-text-secondary group-hover:text-text-primary'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className={`block font-bold tracking-wide transition-colors ${
                        activeTab === 'all' ? 'text-accent' : 'text-text-secondary'
                      }`}
                    >
                      {t('certificates.tabs.all')}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-text-muted mt-1 uppercase">
                      {counts.all} {t('certificates.countLabel')}
                    </span>
                  </div>
                </button>

                {/* 2. PELATIHAN */}
                <button
                  onClick={() => setActiveTab('course')}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl text-left transition-colors duration-200 border ${
                    activeTab === 'course'
                      ? 'bg-accent/15 border-border shadow-[0_0_20px_rgb(var(--accent-rgb)/0.3)]'
                      : 'bg-transparent border-transparent hover:bg-white/10'
                  }`}
                >
                  {activeTab === 'course' && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--accent-rgb)/0.5)]" />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'course'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-surface-2 text-text-secondary'
                    }`}
                  >
                    <FiCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className={`block font-bold tracking-wide transition-colors ${
                        activeTab === 'course' ? 'text-accent' : 'text-text-secondary'
                      }`}
                    >
                      {t('certificates.tabs.course')}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-text-muted mt-1 uppercase">
                      {counts.course} {t('certificates.countLabel')}
                    </span>
                  </div>
                </button>

                {/* 3. SERTIFIKASI (PARENT + HIERARCHICAL BRANCHES) */}
                <div className="flex flex-col">
                  {/* Parent Button */}
                  <button
                    onClick={() => setActiveTab('cert-all')}
                    className={`relative flex items-center gap-3 px-6 py-3.5 rounded-2xl text-left transition-colors duration-200 border ${
                      activeTab.startsWith('cert-')
                        ? 'bg-surface-2/80 border-border/80'
                        : 'bg-transparent border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        activeTab.startsWith('cert-')
                          ? 'bg-accent/20 text-accent'
                          : 'bg-surface-2 text-text-secondary'
                      }`}
                    >
                      <FiAward className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className={`block font-bold tracking-wide transition-colors ${
                          activeTab.startsWith('cert-') ? 'text-accent' : 'text-text-secondary'
                        }`}
                      >
                        {t('certificates.tabs.certParent')}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-text-muted mt-0.5 uppercase">
                        {counts['cert-parent']} {t('certificates.countLabel')}
                      </span>
                    </div>
                  </button>

                  {/* Hierarchical Sub-items (|__ Semua, |__ Nasional, |__ Umum) */}
                  <div className="ml-7 pl-3 border-l-2 border-border/70 my-1.5 flex flex-col gap-1">
                    {/* Sub 1: Semua Sertifikasi */}
                    <button
                      onClick={() => setActiveTab('cert-all')}
                      className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                        activeTab === 'cert-all'
                          ? 'bg-accent/15 text-accent font-bold border border-border shadow-[0_0_15px_rgb(var(--accent-rgb)/0.25)]'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-text-muted font-mono text-xs select-none">└──</span>
                        <span className="text-xs truncate">{t('certificates.tabs.certAll')}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                          activeTab === 'cert-all' ? 'bg-accent/25 text-accent' : 'bg-surface-2 text-text-muted'
                        }`}
                      >
                        {counts['cert-all']}
                      </span>
                    </button>

                    {/* Sub 2: Nasional */}
                    <button
                      onClick={() => setActiveTab('cert-national')}
                      className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                        activeTab === 'cert-national'
                          ? 'bg-accent/15 text-accent font-bold border border-border shadow-[0_0_15px_rgb(var(--accent-rgb)/0.25)]'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-text-muted font-mono text-xs select-none">└──</span>
                        <span className="text-xs truncate">{t('certificates.tabs.certNational')}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                          activeTab === 'cert-national' ? 'bg-accent/25 text-accent' : 'bg-surface-2 text-text-muted'
                        }`}
                      >
                        {counts['cert-national']}
                      </span>
                    </button>

                    {/* Sub 3: Umum & Internasional */}
                    <button
                      onClick={() => setActiveTab('cert-general')}
                      className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                        activeTab === 'cert-general'
                          ? 'bg-accent/15 text-accent font-bold border border-border shadow-[0_0_15px_rgb(var(--accent-rgb)/0.25)]'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-text-muted font-mono text-xs select-none">└──</span>
                        <span className="text-xs truncate">{t('certificates.tabs.certGeneral')}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                          activeTab === 'cert-general' ? 'bg-accent/25 text-accent' : 'bg-surface-2 text-text-muted'
                        }`}
                      >
                        {counts['cert-general']}
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsTabsExpanded(!isTabsExpanded)}
              className="lg:hidden shrink-0 flex items-center justify-center w-11 rounded-2xl bg-[var(--glass)] border border-border shadow-xl text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              aria-label="Toggle Category Labels"
            >
              <FiChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${isTabsExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 w-full min-w-0 min-h-[500px]">
          {/* Search bar */}
          <div className="relative mb-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('certificates.searchPlaceholder')}
              className="w-full pl-11 pr-24 py-3 rounded-2xl bg-surface border border-border text-xs md:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isSearching && (
                <>
                  <span className="hidden sm:block text-[10px] font-mono text-text-muted uppercase">
                    {visible.length} {t('certificates.resultsFound')}
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-text-muted hover:text-text-primary rounded-full hover:bg-surface-2"
                    aria-label="Clear search"
                  >
                    <FiX size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {visible.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center px-4 glass rounded-3xl border border-dashed border-border"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-4">
                  <FiSearch className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  {t('certificates.emptyTitle')}
                </h3>
                <p className="text-text-secondary max-w-md mx-auto text-sm mb-6">{t('certificates.emptyDesc')}</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-accent text-background text-xs font-bold hover:brightness-110 transition-all"
                >
                  {t('certificates.resetFilter')}
                </button>
              </motion.div>
            ) : activeTab === 'all' || activeTab === 'cert-all' ? (
              <motion.div
                key={`${activeTab}-${isSearching}`}
                className="flex flex-col gap-12 pb-12 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {(activeTab === 'all' ? ALL_GROUPS : CERT_GROUPS).map((group) => {
                  const items = visible.filter((c) => c.category === group);
                  if (items.length === 0 && isSearching) return null;
                  return (
                    <div key={group} className="flex flex-col gap-6">
                      {/* Divider */}
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-border" />
                        <span className="text-xs font-bold uppercase tracking-widest text-text-muted text-center">
                          {t(`certificates.groupTitles.${group}`)}
                        </span>
                        <div className="h-[1px] flex-1 bg-border" />
                      </div>

                      {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                          {items.map((cert) => (
                            <CertificateCard key={cert.id} cert={cert} language={language} onOpen={setSelectedCert} />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-surface-2/30">
                          <span className="text-sm font-medium text-text-muted tracking-widest uppercase text-center px-4">
                            {t('certificates.slotEmpty')}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-${isSearching}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full pb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {visible.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} language={language} onOpen={setSelectedCert} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} language={language} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
