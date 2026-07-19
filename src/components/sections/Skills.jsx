import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillCategories } from '../../data/skills'

function SkillCard({ skill, index }) {
  const { name, Icon, color, level } = skill

  return (
    <motion.div
      className="skill-card glass rounded-2xl p-5 flex flex-col items-center gap-3 border cursor-default hover:border-accent/30 transition-all duration-300"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {/* Icon */}
      <div
        className="skill-icon w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300"
        style={{ background: `${color}18`, boxShadow: `0 0 20px ${color}25` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      {/* Name */}
      <span
        className="text-sm font-semibold text-center leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {name}
      </span>

      {/* Level badge */}
      <span
        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
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

  const filtered =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section className="relative pt-8 lg:pt-12">
      <div className="w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">Tech Stack</span>
          <h2
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Tools and technologies I work with to build products.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {skillCategories.map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-accent/40 hover:text-accent'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
            No skills in this category yet.
          </p>
        )}
      </div>
    </section>
  )
}
