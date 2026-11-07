import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiTool, FiAward } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import ImageModal from '../ui/ImageModal';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function Experience() {
  const { t, language } = useLanguage();
  const [selectedCertId, setSelectedCertId] = useState(null);

  const experiences = [
    {
      id: 'spunindo',
      company: 'PT Multi Spunindo Jaya Tbk',
      role: language === 'id' ? 'Magang — Full Stack Developer' : 'Intern — Full Stack Developer',
      period: language === 'id' ? 'Juli 2025 – Desember 2025' : 'July 2025 – December 2025',
      current: false,
      certificate: { 
        label: t('experience.certLetter'),
        images: ['/images/Intern/Spunindo/SPUNINDO_1.jpeg']
      },
      points: t('experience.points.spunindo'),
      tools: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Bootstrap', 'jQuery', 'DataTables', 'RESTful API (SAP)', 'Git/GitLab', 'VS Code', 'Figma', 'Draw.io'],
    },
    {
      id: 'upatik',
      company: 'UPA TIK Politeknik Negeri Malang',
      role: language === 'id' ? 'Magang — Back-end Developer' : 'Intern — Back-end Developer',
      period: language === 'id' ? 'Februari 2025 – Juni 2025' : 'February 2025 – June 2025',
      current: false,
      certificate: { 
        label: t('experience.internCert'),
        images: [
          '/images/Intern/UPA_TIK/UPA_TIK_1.jpeg',
          '/images/Intern/UPA_TIK/UPA_TIK_2.jpeg',
          '/images/Intern/UPA_TIK/UPA_TIK_3.jpeg',
          '/images/Intern/UPA_TIK/UPA_TIK_4.jpeg',
        ]
      },
      points: t('experience.points.upatik'),
      tools: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap 5', 'Blade', 'HTML5/SCSS', 'jQuery', 'DataTables', 'RESTful API', 'Laravel Modules', 'Vite', 'JWT Auth', 'WhatsApp Gateway (Foonte)', 'SMTP', 'Git', 'Postman', 'VS Code', 'Draw.io'],
    },
  ];

  return (
    <section className="relative pt-28 lg:pt-36 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 max-w-[1400px] mx-auto pb-20">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2
          className="font-display font-bold text-3xl md:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('experience.title1')}{' '}
          <span className="gradient-text">{t('experience.title2')}</span>
        </h2>
        <p className="text-text-secondary mt-3 text-sm md:text-base max-w-xl mx-auto">
          {t('experience.subtitle')}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-6xl xl:max-w-7xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pl-16 md:pl-24"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] md:left-[26px] top-2 flex items-center justify-center">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${exp.current ? 'border-accent bg-accent/20 shadow-[0_0_12px_rgb(var(--accent-rgb)/0.5)]' : 'border-slate-600 bg-surface'}`}>
                  <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-accent animate-pulse' : 'bg-slate-600'}`} />
                </div>
              </div>

              {/* Card */}
              <div className="glass border border-border p-6 md:p-8 rounded-2xl shadow-xl group">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-accent bg-accent/10 border border-border px-2.5 py-1 rounded-full mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {t('experience.current')}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FiBriefcase size={13} className="text-accent flex-shrink-0" />
                      <span className="text-accent font-semibold text-sm">{exp.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary text-xs font-mono bg-white/4 border border-border px-3 py-1.5 rounded-full flex-shrink-0">
                    <FiCalendar size={12} />
                    {exp.period}
                  </div>
                </div>

                {/* Bullet points (Tanggung Jawab) */}
                <ul className="space-y-3 mb-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-text-secondary text-sm md:text-[14.5px] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0 shadow-[0_0_6px_rgb(var(--accent-rgb)/0.5)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Sleek Tapered Laser Divider: Tebal di kiri, membentang panjang & menipis hingga memudar halus ke kanan */}
                <div className="relative my-7 w-full overflow-hidden pointer-events-none select-none">
                  {/* Glowing aura underlay */}
                  <div 
                    className="w-full h-[5px] bg-gradient-to-r from-accent via-accent/50 via-35% via-accent/15 via-70% to-transparent blur-[3px] opacity-75" 
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 46%, 100% 54%, 0% 100%)'
                    }}
                  />
                  {/* Core laser beam: 3.5px thick on left tapering to razor-thin on right */}
                  <div 
                    className="w-full -mt-[5px] h-[5px] bg-gradient-to-r from-accent via-accent/90 via-20% via-accent/40 via-60% to-transparent" 
                    style={{
                      clipPath: 'polygon(0% 10%, 100% 48%, 100% 52%, 0% 90%)'
                    }}
                  />
                  {/* Subtle extended guide line that stretches across the whole card */}
                  <div className="w-full h-px bg-gradient-to-r from-accent/50 via-border/40 to-transparent -mt-[1px]" />
                </div>

                {/* Footer (Tools & Certificate) */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Tools */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1">
                    <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs font-semibold mr-1.5 py-1">
                      <FiTool size={13} className="text-accent" />
                      <span>{t('experience.tools')}</span>
                    </div>
                    {exp.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 text-[11px] font-medium bg-surface-2 border border-border/70 text-text-primary rounded-lg hover:border-accent/50 hover:text-accent transition-colors duration-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Certificate Button */}
                  {exp.certificate && (
                    <button
                      onClick={() => setSelectedCertId(exp.id)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black tracking-wider uppercase text-text-on-accent bg-accent rounded-xl hover:bg-accent-light transition-all duration-300 shadow-[0_0_16px_rgb(var(--accent-rgb)/0.4)] hover:shadow-[0_0_24px_rgb(var(--accent-rgb)/0.6)] flex-shrink-0 w-full sm:w-auto"
                    >
                      <FiAward size={14} />
                      <span>{exp.certificate.label}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Image Modal (Refactored to separate component) */}
      <ImageModal 
        selectedCert={
          selectedCertId 
            ? {
                company: experiences.find(e => e.id === selectedCertId).company,
                images: experiences.find(e => e.id === selectedCertId).certificate.images,
                label: experiences.find(e => e.id === selectedCertId).certificate.label
              }
            : null
        } 
        onClose={() => setSelectedCertId(null)} 
      />
    </section>
  );
}
