import { useState, useMemo, useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiFigma, FiExternalLink, FiDownload, FiClock, FiStar, FiFolder, FiMonitor, FiUser, FiX, FiArrowRight, FiChevronRight, FiChevronLeft, FiGrid } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { useLanguage } from '../../context/LanguageContext'

const iconMap = {
  github: FiGithub,
  figma: FiFigma,
  external: FiExternalLink,
  download: FiDownload,
}

const categoryIcons = {
  All: FiGrid,
  Intern: FiMonitor,
  Academic: FiFolder,
  Personal: FiUser,
}

const CATEGORIES = ['All', 'Intern', 'Academic', 'Personal']

// Carousel Component for multiple images
function ImageCarousel({ images, alt, className = "", imageClassName = "", objectFit = "cover", arrowsOutside = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageArray = Array.isArray(images) ? images : [images];
  
  if (imageArray.length === 0) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const hasMultiple = imageArray.length > 1;

  // Render Arrow Buttons
  const renderPrevButton = (isOutside) => (
    <button
      onClick={handlePrev}
      className={`${
        isOutside 
          ? 'w-8 h-8 md:w-12 md:h-12 shrink-0 mr-3 md:mr-6 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]' 
          : 'absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 backdrop-blur-sm z-20 border border-white/20 shadow-xl'
      } hover:bg-accent hover:text-black flex items-center justify-center text-white transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgb(var(--accent-rgb)/0.5)] hover:scale-110 group/btn`}
      aria-label="Previous image"
    >
      <FiChevronLeft className={`${isOutside ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5 sm:w-6 sm:h-6'} transition-transform duration-300 group-hover/btn:-translate-x-1`} />
    </button>
  );

  const renderNextButton = (isOutside) => (
    <button
      onClick={handleNext}
      className={`${
        isOutside 
          ? 'w-8 h-8 md:w-12 md:h-12 shrink-0 ml-3 md:ml-6 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]' 
          : 'absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 backdrop-blur-sm z-20 border border-white/20 shadow-xl'
      } hover:bg-accent hover:text-black flex items-center justify-center text-white transition-all duration-300 hover:border-accent hover:shadow-[0_0_30px_rgb(var(--accent-rgb)/0.5)] hover:scale-110 group/btn`}
      aria-label="Next image"
    >
      <FiChevronRight className={`${isOutside ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5 sm:w-6 sm:h-6'} transition-transform duration-300 group-hover/btn:translate-x-1`} />
    </button>
  );

  return (
    <div className={`relative group/carousel w-full h-full flex items-center justify-between ${className}`}>
      
      {/* Outside Left Arrow */}
      {hasMultiple && arrowsOutside && renderPrevButton(true)}

      {/* Image Container */}
      <div className={`relative flex-1 h-full w-full overflow-hidden ${arrowsOutside && hasMultiple ? 'rounded-2xl' : ''}`}>
        
        {/* Photo Counter Badge */}
        {hasMultiple && (
          <div className={`absolute pointer-events-none flex items-center gap-2 text-white font-bold font-mono tracking-widest rounded-full shadow-lg border border-white/10 ${
            arrowsOutside
              ? 'top-4 left-4 md:top-6 md:left-6 z-30 bg-black/60 backdrop-blur-xl text-xs px-4 py-2'
              : 'top-3 left-3 z-30 bg-black/70 backdrop-blur-md text-[10px] px-3 py-1.5'
          }`}>
            <div className={`${arrowsOutside ? 'w-2 h-2' : 'w-1.5 h-1.5'} rounded-full bg-accent animate-pulse`} />
            {currentIndex + 1} / {imageArray.length}
          </div>
        )}

        {/* Image with smooth crossfade */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentIndex}
            src={imageArray[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-full h-full object-${objectFit} opacity-95 group-hover:opacity-100 ${imageClassName}`}
          />
        </AnimatePresence>

        {/* Inside Arrows */}
        {hasMultiple && !arrowsOutside && (
          <>
            {renderPrevButton(false)}
            {renderNextButton(false)}
          </>
        )}

        {/* Dot Indicators */}
        {hasMultiple && (
          <div className={`absolute left-1/2 -translate-x-1/2 flex pointer-events-none rounded-full border border-white/10 ${
            arrowsOutside
              ? 'bottom-4 md:bottom-6 gap-2 z-30 bg-black/60 px-4 py-2.5 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]'
              : 'bottom-3 gap-1.5 z-20 bg-black/50 px-3 py-2 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
          }`}>
            {imageArray.map((_, idx) => (
              <div 
                key={idx} 
                className={`rounded-full transition-all duration-500 ease-out ${
                  idx === currentIndex 
                    ? `bg-accent shadow-[0_0_12px_var(--accent)] ${arrowsOutside ? 'w-6 md:w-8' : 'w-5'}` 
                    : `bg-white/40 ${arrowsOutside ? 'w-2 md:w-2.5' : 'w-1.5'}`
                } ${arrowsOutside ? 'h-2 md:h-2.5' : 'h-1.5'}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Outside Right Arrow */}
      {hasMultiple && arrowsOutside && renderNextButton(true)}

    </div>
  );
}

// Custom Hook/Component for click-and-drag to scroll with smart arrows
function DragScroll({ children, className }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragged, setDragged] = useState(false)
  
  // Arrow visibility state
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeft(scrollLeft > 0)
      setShowRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [children])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragged(false)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    if (!dragged) setDragged(true)
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleClick = (e) => {
    if (dragged) {
      e.stopPropagation()
      e.preventDefault()
      setDragged(false)
    }
  }

  const scrollBy = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow */}
      {showLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface via-surface/90 to-transparent flex justify-start items-center z-10 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); scrollBy(-150); }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent hover:text-black flex items-center justify-center pointer-events-auto border border-border backdrop-blur-md shadow-lg"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={checkScroll}
        onClick={handleClick}
        className={`overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing w-full ${className}`}
      >
        {children}
      </div>

      {/* Right Arrow */}
      {showRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface via-surface/90 to-transparent flex justify-end items-center z-10 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); scrollBy(150); }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent hover:text-black flex items-center justify-center pointer-events-auto border border-border backdrop-blur-md shadow-lg"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!project) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/95 overflow-y-auto px-4 py-8 md:px-12 md:py-16 custom-scrollbar"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-[1400px] bg-surface rounded-2xl md:rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Close Button - Always visible at top right of the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:scale-110 transition-all duration-300 shadow-lg"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Top: Image Banner */}
        <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-[#0a0e14] relative flex-shrink-0 group/banner">
          
          {/* Decorative background blur (adds ambiance based on the image) */}
          <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
            <img src={Array.isArray(project.image) ? project.image[0] : project.image} alt="blur" className="w-full h-full object-cover blur-3xl scale-110" />
          </div>

          <ImageCarousel 
            images={project.image} 
            alt={project.title} 
            className="relative z-10 px-4 pt-16 pb-12 md:px-8 md:pt-20 md:pb-16" 
            objectFit="contain"
            imageClassName="rounded-2xl border border-accent shadow-[0_0_30px_rgb(var(--accent-rgb)/0.3)] bg-accent p-[2px] md:p-1"
            arrowsOutside={true}
          />
          
          {/* Bottom gradient fade into content */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface via-surface/90 to-transparent pointer-events-none z-20" />
        </div>

        {/* Bottom: Content Details */}
        <div className="px-4 pb-6 md:px-10 md:pb-10 lg:px-12 lg:pb-12 relative z-30 -mt-6 md:-mt-8">
          
          <div className="flex flex-col gap-6 w-full mx-auto bg-surface-2/95 backdrop-blur-2xl border border-border shadow-[0_-10px_40px_rgba(0,0,0,0.3)] rounded-3xl p-6 md:p-10">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 items-center">
              {project.featured && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <FiStar className="w-3.5 h-3.5 fill-amber-400/30" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{t('projects.featured') || 'Featured'}</span>
              </div>
              )}
              {project.tags.map((tag) => (
                <span key={tag} className="badge bg-surface-2 border-border text-text-primary px-2.5 py-1 text-[10px]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Header */}
            <div>
              <p className="text-accent text-sm font-mono tracking-widest uppercase mb-2">
                {project.subtitle}
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight text-text-primary">
                {project.title}
              </h2>
            </div>

            <div className="w-16 h-1 bg-accent/30 rounded-full" />

            {/* Full Description */}
            <div className="space-y-4 text-text-secondary leading-relaxed text-base md:text-lg">
              <p>{t(`projectData.${project.id}.description`) || project.description}</p>
              {(t(`projectData.${project.id}.detail`) || project.detail) && (
                <div className="p-5 mt-4 rounded-2xl bg-surface-2 border border-border text-text-secondary text-sm md:text-base">
                  {t(`projectData.${project.id}.detail`) || project.detail}
                </div>
              )}
            </div>

            {/* Links / Call to Actions */}
            {project.links && project.links.length > 0 && (
              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">{t('projects.projectLinks') || 'Project Links'}</h4>
                <div className="flex flex-wrap gap-3">
                  {project.links.map(({ label, url, icon }) => {
                    const Icon = iconMap[icon] || FiExternalLink
                    return (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-2 border border-border text-text-secondary hover:text-accent hover:border-border hover:bg-accent/10 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

const ProjectCard = memo(function ProjectCard({ project, index, onClick }) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      onClick={(e) => {
        // Prevent modal if clicking links or buttons
        if (!e.target.closest('a') && !e.target.closest('button')) {
          onClick(project)
        }
      }}
      className="project-card bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-border transition-all duration-500 cursor-pointer flex flex-col h-full group"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* 100% Clean Image Container (No overlays blocking the content) */}
      <div className="project-img-wrapper relative overflow-hidden aspect-video bg-background">
        <ImageCarousel 
          images={project.image} 
          alt={project.title} 
          imageClassName="object-left-top group-hover:scale-105" 
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-1 gap-5 relative z-10">
        
        {/* Badges moved to content area with Drag-to-Scroll */}
        <div className="mb-2 w-full">
          <DragScroll className="flex gap-2 items-center px-1 py-1">
            {project.featured && (
              <div className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <FiStar className="w-3 h-3 fill-amber-400/30" />
                <span className="text-[9px] font-bold uppercase tracking-widest">{t('projects.featured') || 'Featured'}</span>
              </div>
            )}
            {project.tags.map((tag) => (
              <span key={tag} className="flex-shrink-0 badge bg-surface-2 border-border text-text-primary px-2 py-0.5 text-[10px]">
                {tag}
              </span>
            ))}
          </DragScroll>
        </div>

        {/* Headers */}
        <div>
          <p className="text-accent text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1.5 line-clamp-1">
            {project.subtitle}
          </p>
          <h3 className="font-display font-bold text-lg md:text-xl leading-snug text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-sm md:text-base text-text-secondary leading-relaxed line-clamp-3">
          {t(`projectData.${project.id}.description`) || project.description}
        </p>

        {/* Project Links (Direct Access) */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2">
            {project.links.map(({ label, url, icon }) => {
              const Icon = iconMap[icon] || FiExternalLink
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-text-primary hover:text-accent hover:border-border hover:bg-accent/10 transition-all duration-300 shadow-sm"
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wide">{label}</span>
                </a>
              )
            })}
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-auto pt-5 border-t border-border flex items-center justify-between group-hover:border-border transition-colors">
          <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
            {t('projects.readCaseStudy') || 'Read Full Case Study'}
          </span>
          <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300 text-text-secondary group-hover:text-black">
            <FiArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  )
})

function EmptyState() {
  const { t } = useLanguage()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="col-span-full py-24 flex flex-col items-center justify-center text-center px-4 glass rounded-3xl border border-dashed border-border"
    >
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        {/* Glowing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-border animate-[spin_8s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-border animate-[spin_12s_linear_infinite_reverse]" />
        <div className="absolute inset-4 rounded-full border border-border bg-accent/5 backdrop-blur-sm" />
        
        <FiClock className="w-10 h-10 text-accent relative z-10" />
      </div>
      
      <h3 className="font-display text-2xl font-bold text-text-primary mb-3">
        {t('projects.emptyTitle') || 'Something Awesome is Brewing'}
      </h3>
      <p className="text-text-secondary max-w-md mx-auto text-sm leading-relaxed">
        {t('projects.emptyDesc') || "I am currently working on some exciting personal projects behind the scenes. They'll be showcased here soon. Stay tuned!"}
      </p>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isTabsExpanded, setIsTabsExpanded] = useState(false)

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return projects;
    return projects.filter((p) => p.category === activeTab)
  }, [activeTab])

  return (
    <section id="projects" className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-screen">
      
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="font-display font-black text-4xl md:text-5xl tracking-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('projects.title1')}{' '}
          <span className="gradient-text">{t('projects.title2')}</span>
        </h2>
        <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          {t('projects.subtitle')}
        </p>
      </motion.div>

      {/* Main Layout: Sticky Sidebar on Left, Content on Right */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Sidebar for Tabs */}
        <aside className="w-fit max-w-full lg:w-64 shrink-0 sticky top-[88px] lg:top-32 z-40 mb-8 lg:mb-0">
          <div className="flex items-stretch gap-2 lg:block w-full">
            {/* Tabs Container (Red Box) */}
            <div className="p-1.5 lg:p-0 bg-background/95 backdrop-blur-md lg:bg-transparent border border-border lg:border-none rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none transition-all duration-300 overflow-hidden flex-1 min-w-0">
              <DragScroll className="flex lg:flex-col items-center lg:items-stretch gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat
              const Icon = categoryIcons[cat]
              
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative flex items-center gap-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal group border ${
                    isTabsExpanded ? 'px-4 py-2' : 'p-2'
                  } ${
                    isActive 
                      ? 'bg-accent/15 border-border shadow-[0_0_20px_rgb(var(--accent-rgb)/0.5)]' 
                      : 'bg-transparent border-transparent hover:bg-white/10'
                  }`}
                  title={cat}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--accent-rgb)/0.5)] hidden lg:block"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-accent/20 text-accent' : 'bg-surface-2 text-text-secondary group-hover:text-text-primary'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className={`${isTabsExpanded ? 'block' : 'hidden lg:block'} transition-all`}>
                    <span className={`block font-bold tracking-wide transition-colors ${
                      isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'
                    }`}>
                      {cat === 'All' ? (t('projects.allTab') || 'All') : cat}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-text-muted mt-1 uppercase">
                    {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length} {t('projects.projectsCount') || 'Projects'}
                  </span>
                  </div>
                </button>
              )
            })}

              </DragScroll>
            </div>

            {/* Mobile Toggle Button (Yellow Box) */}
            <button
              onClick={() => setIsTabsExpanded(!isTabsExpanded)}
              className="lg:hidden shrink-0 flex items-center justify-center w-11 rounded-2xl bg-background/95 backdrop-blur-md border border-border shadow-2xl text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all"
              aria-label="Toggle Category Labels"
            >
              <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${isTabsExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </aside>

        {/* Right Content Area: Project Grid */}
        <div className="flex-1 w-full min-h-[500px] grid grid-cols-1 grid-rows-1">
          <AnimatePresence>
            {activeTab === 'All' ? (
              <motion.div
                key="all"
                className="col-start-1 row-start-1 flex flex-col gap-12 pb-12 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {['Intern', 'Academic', 'Personal'].map((category) => {
                  const catProjects = projects.filter(p => p.category === category);
                  return (
                    <div key={category} className="flex flex-col gap-6">
                      {/* Divider */}
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-border"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{category}</span>
                        <div className="h-[1px] flex-1 bg-border"></div>
                      </div>
                      
                      {/* Projects Grid or Coming Soon */}
                      {catProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {catProjects.map((project, i) => (
                            <ProjectCard 
                              key={project.id} 
                              project={project} 
                              index={i} 
                              onClick={setSelectedProject}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-surface-2/30">
                          <span className="text-sm font-medium text-text-muted tracking-widest uppercase">{t('projects.comingSoon') || 'Coming Soon'}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            ) : filteredProjects.length > 0 ? (
              <motion.div
                key={activeTab}
                className="col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredProjects.map((project, i) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={i} 
                    onClick={setSelectedProject}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="col-start-1 row-start-1 w-full">
                <EmptyState key="empty" />
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

    </section>
  )
}
