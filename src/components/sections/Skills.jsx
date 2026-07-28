import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { skills, skillCategories } from '../../data/skills'

// We need DragScroll for the sidebar in mobile view
function DragScroll({ children, className }) {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragged, setDragged] = useState(false)
  
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
    const walk = (x - startX) * 1.5
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

function SkillCard({ skill, index }) {
  const { name, Icon, color, level } = skill

  return (
    <motion.div
      className="skill-card glass rounded-2xl p-5 flex flex-col items-center gap-3 border cursor-default hover:border-border transition-all duration-300 h-full justify-center"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div
        className="skill-icon w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300"
        style={{ background: `${color}18`, boxShadow: `0 0 20px ${color}25` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      <span
        className="text-sm font-semibold text-center leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {name}
      </span>

      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-medium mt-auto"
        style={{
          background: `${color}18`,
          color: color,
          border: `1px solid ${color}30`,
        }}
      >
        {level}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isTabsExpanded, setIsTabsExpanded] = useState(false)

  const filtered =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto min-h-screen">
      <div className="w-full">
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
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Tools, languages, and technologies I work with to build products.
          </p>
        </motion.div>

        {/* Main Layout: Sticky Sidebar on Left, Content on Right */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar for Tabs */}
          <aside className="w-fit max-w-full lg:w-64 shrink-0 sticky top-[88px] lg:top-32 z-40 mb-8 lg:mb-0">
            <div className="flex items-stretch gap-2 lg:block w-full">
              {/* Tabs Container */}
              <div className="p-1.5 lg:p-0 bg-background/95 backdrop-blur-md lg:bg-transparent border border-border lg:border-none rounded-2xl lg:rounded-none shadow-2xl lg:shadow-none transition-all duration-300 overflow-hidden flex-1 min-w-0">
                <DragScroll className="flex lg:flex-col items-center lg:items-stretch gap-2">
                  {skillCategories.map(({ key, label, icon: Icon }) => {
                    const isActive = activeCategory === key
                    
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative flex items-center gap-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal group border ${
                          isTabsExpanded ? 'px-4 py-2' : 'p-2'
                        } ${
                          isActive 
                            ? 'bg-accent/15 border-border shadow-[0_0_20px_rgb(var(--accent-rgb)/0.5)]' 
                            : 'bg-transparent border-transparent hover:bg-white/10'
                        }`}
                        title={label}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeSkillIndicator"
                            className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-full shadow-[0_0_10px_rgb(var(--accent-rgb)/0.5)] hidden lg:block"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? 'bg-accent/20 text-accent' : 'bg-surface-2 text-text-primary group-hover:text-text-primary'
                        }`}>
                          {Icon && <Icon className="w-4 h-4" />}
                        </div>
                        
                        <div className={`${isTabsExpanded ? 'block' : 'hidden lg:block'} transition-all`}>
                          <span className={`block font-bold tracking-wide transition-colors ${
                            isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'
                          }`}>
                            {label}
                          </span>
                          <span className={`text-[10px] uppercase tracking-wider block mt-0.5 transition-colors ${
                            isActive ? 'text-accent/70' : 'text-slate-500'
                          }`}>
                            {key === 'all' ? skills.length : skills.filter(s => s.category === key).length} Skills
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </DragScroll>
              </div>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsTabsExpanded(!isTabsExpanded)}
                className="lg:hidden shrink-0 flex items-center justify-center w-11 rounded-2xl bg-background/95 backdrop-blur-md border border-border shadow-2xl text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all"
                aria-label="Toggle Category Labels"
              >
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${isTabsExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </aside>

          {/* Right Content Area: Skills Grid */}
          <div className="flex-1 w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {filtered.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-24 flex flex-col items-center justify-center text-center px-4 glass rounded-3xl border border-dashed border-border"
                >
                  <p className="text-text-secondary">No skills in this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  )
}
