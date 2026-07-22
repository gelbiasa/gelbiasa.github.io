import { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiFigma, FiExternalLink, FiDownload, FiClock, FiStar, FiFolder, FiMonitor, FiUser, FiX, FiArrowRight, FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { projects } from '../../data/projects'

const iconMap = {
  github: FiGithub,
  figma: FiFigma,
  external: FiExternalLink,
  download: FiDownload,
}

const categoryIcons = {
  Intern: FiMonitor,
  Academic: FiFolder,
  Personal: FiUser,
}

const CATEGORIES = ['Intern', 'Academic', 'Personal']

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
    setDragged(true)
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
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#12141c] via-[#12141c]/90 to-transparent flex justify-start items-center z-10 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); scrollBy(-150); }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent hover:text-black flex items-center justify-center pointer-events-auto border border-white/10 backdrop-blur-md shadow-lg"
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
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#12141c] via-[#12141c]/90 to-transparent flex justify-end items-center z-10 pointer-events-none">
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); scrollBy(150); }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-accent hover:text-black flex items-center justify-center pointer-events-auto border border-white/10 backdrop-blur-md shadow-lg"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }) {
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
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md overflow-y-auto px-4 py-8 md:px-12 md:py-16 custom-scrollbar"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-6xl bg-[#12141c] rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden"
      >
        {/* Close Button - Always visible at top right of the modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-black transition-colors shadow-lg"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Left/Top: Image Gallery/Banner */}
        <div className="w-full lg:w-2/5 h-64 lg:h-auto bg-[#0b0c10] relative flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain p-4 md:p-8"
          />
          {/* Subtle gradient overlay to blend with content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Right/Bottom: Content Details */}
        <div className="flex-1 p-6 md:p-10 lg:p-12">
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2 items-center">
              {project.featured && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <FiStar className="w-3.5 h-3.5 fill-amber-400/30" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Featured</span>
                </div>
              )}
              {project.tags.map((tag) => (
                <span key={tag} className="badge bg-white/5 border-white/10 text-slate-300 px-2.5 py-1 text-[10px]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Header */}
            <div>
              <p className="text-accent text-sm font-mono tracking-widest uppercase mb-2">
                {project.subtitle}
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight text-white">
                {project.title}
              </h2>
            </div>

            <div className="w-16 h-1 bg-accent/30 rounded-full" />

            {/* Full Description */}
            <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
              <p>{project.description}</p>
              {project.detail && (
                <div className="p-5 mt-4 rounded-2xl bg-white/5 border border-white/5 text-slate-400 text-sm md:text-base">
                  {project.detail}
                </div>
              )}
            </div>

            {/* Links / Call to Actions */}
            {project.links && project.links.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Project Links</h4>
                <div className="flex flex-wrap gap-4">
                  {project.links.map(({ label, url, icon }) => {
                    const Icon = iconMap[icon] || FiExternalLink
                    return (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
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

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      layoutId={`project-${project.id}`}
      onClick={(e) => {
        // Prevent modal if clicking links or buttons
        if (!e.target.closest('a') && !e.target.closest('button')) {
          onClick(project)
        }
      }}
      className="project-card glass rounded-2xl overflow-hidden border border-white/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-accent/40 transition-all duration-500 cursor-pointer flex flex-col h-full group"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* 100% Clean Image Container (No overlays blocking the content) */}
      <div className="project-img-wrapper relative overflow-hidden aspect-video bg-[#0b0c10]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] to-transparent opacity-40" />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-1 gap-5 relative z-10">
        
        {/* Badges moved to content area with Drag-to-Scroll */}
        <div className="mb-2 w-full">
          <DragScroll className="flex gap-2 items-center px-1 py-1">
            {project.featured && (
              <div className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <FiStar className="w-3 h-3 fill-amber-400/30" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Featured</span>
              </div>
            )}
            {project.tags.map((tag) => (
              <span key={tag} className="flex-shrink-0 badge bg-white/5 border-white/10 text-slate-300 px-2 py-0.5 text-[10px]">
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
          <h3 className="font-display font-bold text-lg md:text-xl leading-snug text-white group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed line-clamp-3">
          {project.description}
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-300 shadow-sm"
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wide">{label}</span>
                </a>
              )
            })}
          </div>
        )}

        {/* Action / Footer */}
        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between group-hover:border-white/10 transition-colors">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
            Read Full Case Study
          </span>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300 text-slate-400 group-hover:text-black">
            <FiArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="col-span-full py-24 flex flex-col items-center justify-center text-center px-4 glass rounded-3xl border border-dashed border-white/10"
    >
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        {/* Glowing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-[spin_8s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-accent/40 animate-[spin_12s_linear_infinite_reverse]" />
        <div className="absolute inset-4 rounded-full border border-accent/10 bg-accent/5 backdrop-blur-sm" />
        
        <FiClock className="w-10 h-10 text-accent relative z-10" />
      </div>
      
      <h3 className="font-display text-2xl font-bold text-white mb-3">
        Something Awesome is Brewing
      </h3>
      <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
        I am currently working on some exciting personal projects behind the scenes. 
        They'll be showcased here soon. Stay tuned!
      </p>
    </motion.div>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('Intern')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
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
          Featured{' '}
          <span className="gradient-text">Projects</span>
        </h2>
        <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          A curated selection of my work spanning across industrial systems, academic research, and personal experiments.
        </p>
      </motion.div>

      {/* Main Layout: Sticky Sidebar on Left, Content on Right */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Sidebar for Tabs */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 z-20">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat
              const Icon = categoryIcons[cat]
              
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal group border ${
                    isActive 
                      ? 'bg-accent/10 border-accent/30 shadow-[0_0_20px_rgba(84,229,166,0.1)]' 
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarIndicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-full shadow-[0_0_10px_rgba(84,229,166,0.5)] hidden lg:block"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-accent/20 text-accent' : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div>
                    <span className={`block font-bold tracking-wide transition-colors ${
                      isActive ? 'text-accent' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {cat}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider hidden lg:block transition-colors ${
                      isActive ? 'text-accent/70' : 'text-slate-500'
                    }`}>
                      {projects.filter(p => p.category === cat).length} Projects
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Right Content Area: Project Grid */}
        <div className="flex-1 w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
              <EmptyState key="empty" />
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
