import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrendingUp, FiBookOpen, FiAward, FiStar, FiFileText, FiX, FiClock } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import CustomPdfViewer from '../ui/CustomPdfViewer'

export default function Education() {
  const { t } = useLanguage()
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const [selectedKhs, setSelectedKhs] = useState(null)

  const semesters = [
    { term: '1', gpa: 3.55, file: '/file/khs/KHS_1.pdf' },
    { term: '2', gpa: 3.53, file: null },
    { term: '3', gpa: 3.67, file: null },
    { term: '4', gpa: 3.68, file: null },
    { term: '5', gpa: 3.92, file: null },
    { term: '6', gpa: 4.00, file: null },
    { term: '7', gpa: 4.00, file: null },
    { term: '8', gpa: 4.00, file: null },
  ]

  // Chart Dimensions
  const width = 800
  const height = 260
  const paddingTop = 40
  const paddingBottom = 40
  const chartStartX = 80 // Start data points far away from Y-axis labels
  const chartEndX = width - 40 // End data points before right edge
  const chartWidth = chartEndX - chartStartX
  const minGpa = 3.4
  const maxGpa = 4.0
  const gpaRange = maxGpa - minGpa

  // Calculate coordinates
  const points = semesters.map((item, index) => {
    const x = chartStartX + (index / (semesters.length - 1)) * chartWidth
    const y = height - paddingBottom - ((item.gpa - minGpa) / gpaRange) * (height - paddingTop - paddingBottom)
    return { x, y, ...item }
  })

  // SVG Paths
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const firstX = points[0].x
  const lastX = points[points.length - 1].x
  const areaPath = `${linePath} L ${lastX} ${height} L ${firstX} ${height} Z`

  return (
    <section id="education" className="pt-32 pb-24 relative min-h-screen">
      <div className="section-container relative px-6 md:px-12 lg:px-20 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            {t('education.title1')} <span className="gradient-text">{t('education.title2')}</span>
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('education.subtitle')}
          </p>
        </motion.div>

        {/* Top Summary Card */}
        <motion.div
          className="glass border rounded-3xl p-6 md:p-10 mb-12 flex flex-col md:flex-row gap-8 items-center"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FiBookOpen className="w-12 h-12 md:w-16 md:h-16 text-accent group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Politeknik Negeri Malang</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('education.summary')}
            </p>
          </div>
        </motion.div>

        {/* GPA Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Main Chart */}
          <motion.div
            className="lg:col-span-3 glass border rounded-3xl p-6 md:p-10 relative overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{t('education.sgpa')}</h4>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Semester 1 – 8 Progress</p>
              </div>
              <div className="flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-2 rounded-xl border border-[var(--border)] shadow-sm">
                <FiTrendingUp className="text-accent w-4 h-4" />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Consistent Growth</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full overflow-x-auto custom-scrollbar pb-4">
              <div className="min-w-[500px] w-full relative" style={{ height }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
                  
                  {/* Grid Lines */}
                  {[3.4, 3.6, 3.8, 4.0].map((val) => {
                    const y = height - paddingBottom - ((val - minGpa) / gpaRange) * (height - paddingTop - paddingBottom)
                    return (
                      <g key={val}>
                        <line x1="45" y1={y} x2={width - 20} y2={y} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                        <text x="35" y={y + 4} textAnchor="end" fontSize="11" fill="var(--text-muted)" className="font-mono">{val.toFixed(1)}</text>
                      </g>
                    )
                  })}

                  {/* Gradient Area */}
                  <defs>
                    <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d={areaPath}
                    fill="url(#gradientArea)"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />

                  {/* Line */}
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="rgb(var(--accent-rgb))"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* Data Points */}
                  {points.map((p, i) => (
                    <g 
                      key={i} 
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Interactive invisible circle for better hover area */}
                      <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
                      
                      {/* Inner dot */}
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={hoveredPoint === i ? 6 : 4}
                        fill="var(--bg-primary)"
                        stroke="rgb(var(--accent-rgb))"
                        strokeWidth="3"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.1, type: "spring" }}
                        style={{ filter: hoveredPoint === i ? 'drop-shadow(0 0 8px rgb(var(--accent-rgb)))' : 'none' }}
                      />

                      {/* Always show value near the point, or show on hover? Let's show always but highlight on hover */}
                      <motion.text
                        x={p.x}
                        y={p.y - 15}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="bold"
                        fill={hoveredPoint === i ? "rgb(var(--accent-rgb))" : "var(--text-secondary)"}
                        className="font-mono transition-colors duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                      >
                        {p.gpa.toFixed(2)}
                      </motion.text>
                      
                      {/* X Axis Label */}
                      <text x={p.x} y={height - 10} textAnchor="middle" fontSize="12" fill="var(--text-muted)" className="font-semibold">
                        S{p.term}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* KHS Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-8">
              {semesters.map((s) => (
                <button
                  key={s.term}
                  onClick={() => setSelectedKhs(s)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-300 hover:scale-[1.03] border-[var(--border)] hover:border-accent bg-[var(--bg-primary)] hover:bg-accent/10 shadow-sm group"
                >
                  <FiFileText className={`w-4 h-4 transition-colors ${s.file ? 'text-accent' : 'text-slate-500 group-hover:text-accent-light'}`} />
                  <span className={`text-[11px] font-bold whitespace-nowrap transition-colors ${s.file ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    S{s.term} KHS
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Side Info */}
          <div className="flex flex-col gap-6">
            <motion.div
              className="glass border rounded-3xl p-8 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
                <FiAward className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-2">{t('education.cgpa')}</h4>
              <div className="text-5xl font-black text-text-primary tracking-tighter mb-2" style={{ textShadow: '0 4px 20px rgb(var(--accent-rgb)/0.3)' }}>
                3.80
              </div>
              <div className="flex items-center gap-1 text-accent text-sm font-semibold">
                <FiStar className="fill-accent" /> Outstanding
              </div>
            </motion.div>
          </div>

        </div>

        {/* Conclusion / Takeaway */}
        <motion.div
          className="bg-[var(--bg-secondary)] border rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent rounded-l-2xl" />
          <p className="text-sm md:text-base leading-relaxed pl-4" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{t('education.takeaway')}:</strong> {t('education.conclusion')}
          </p>
        </motion.div>

      </div>

      {/* KHS Modal */}
      <AnimatePresence>
        {selectedKhs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 pb-4 pt-24 md:px-8 md:pb-8 md:pt-28 bg-background/95"
          >
            <div className="absolute inset-0" onClick={() => setSelectedKhs(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col h-full max-h-[90vh] pointer-events-auto"
            >
              <div className="flex items-center justify-between mb-4 border-b border-border pb-4">
                <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <FiFileText className="text-accent" />
                  {t('education.khsDetail')}{selectedKhs.term}
                </h3>
                <button
                  onClick={() => setSelectedKhs(null)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-full transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 bg-background rounded-xl overflow-hidden border border-border flex relative">
                {selectedKhs.file ? (
                  <CustomPdfViewer fileUrl={selectedKhs.file} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
                    <FiClock className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-text-primary mb-2">Coming Soon</h4>
                    <p className="text-sm text-text-secondary max-w-md mx-auto">
                      {t('education.khsComingSoon')}
                    </p>
                  </div>
                )}
              </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
