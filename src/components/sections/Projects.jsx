import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiFigma, FiExternalLink, FiDownload, FiChevronDown, FiChevronUp, FiStar } from 'react-icons/fi'
import { projects } from '../../data/projects'

const iconMap = {
  github: FiGithub,
  figma: FiFigma,
  external: FiExternalLink,
  download: FiDownload,
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="project-card glass rounded-2xl overflow-hidden border hover:border-accent/30 transition-all duration-300 flex flex-col"
      style={{ borderColor: 'var(--border)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Image */}
      <div className="project-img-wrapper relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 backdrop-blur-sm">
            <FiStar className="w-3 h-3 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">Featured</span>
          </div>
        )}

        {/* Number */}
        <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
          {project.id}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
            {project.subtitle}
          </p>
          <h3
            className="font-display font-bold text-base leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="badge text-[10px] px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Expandable detail */}
        <AnimatePresence>
          {expanded && (
            <motion.p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.detail}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Toggle detail */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 text-xs font-medium text-accent hover:opacity-80 transition-opacity self-start"
        >
          {expanded ? (
            <>Less <FiChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read more <FiChevronDown className="w-3 h-3" /></>
          )}
        </button>

        {/* Divider */}
        <div className="h-px" style={{ background: 'var(--border)' }} />

        {/* Links */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.links.map(({ label, url, icon }) => {
            const Icon = iconMap[icon] || FiExternalLink
            return (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="relative pt-8 lg:pt-12">
      <div className="w-full relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">My Work</span>
          <h2
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A selection of projects I've built — from full-stack web apps to mobile applications.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/gelbiasa"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub className="w-4 h-4" />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
