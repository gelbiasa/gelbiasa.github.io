import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiDownload } from 'react-icons/fi'

const TYPED_STRINGS = [
  'Full-Stack Web Developer',
  'Laravel Specialist',
  'Flutter Developer',
  'UI/UX Designer',
]

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[idx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
      setDisplay(current.slice(0, charIdx))
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      setDisplay(current.slice(0, charIdx))
    } else {
      setDeleting(false)
      setIdx((i) => (i + 1) % strings.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, idx, strings, speed, pause])

  return display
}

const floatingBadges = [
  { label: 'Laravel', top: '15%', left: '8%', delay: 0 },
  { label: 'React', top: '20%', right: '10%', delay: 0.4 },
  { label: 'Flutter', bottom: '30%', left: '6%', delay: 0.8 },
  { label: 'Figma', bottom: '25%', right: '8%', delay: 1.2 },
]

export default function Hero() {
  const typed = useTypingEffect(TYPED_STRINGS)

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Floating tech badges */}
      {floatingBadges.map(({ label, delay, ...pos }) => (
        <motion.div
          key={label}
          className="absolute hidden lg:block badge pointer-events-none"
          style={{ ...pos }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: delay + 1, duration: 0.5 },
            y: { delay: delay + 1, duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {label}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="section-container text-center relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="badge">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display font-extrabold leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', color: 'var(--text-primary)' }}
        >
          Hi, I'm{' '}
          <span className="gradient-text relative">
            Gelby
            <motion.span
              className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.9 }}
            />
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-6 h-10"
        >
          <span
            className="font-mono text-xl md:text-2xl font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {typed}
          </span>
          <span
            className="w-0.5 h-7 rounded-full bg-accent cursor-blink"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          D-IV Business Information Systems student at Politeknik Negeri Malang.
          Passionate about building secure, efficient information systems and
          crafting beautiful user experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <FiArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </motion.button>

          <motion.a
            href="https://drive.google.com/file/d/1V4cyfrMNF_6Qn6DyePH1DuMv3qr_pcZD/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 hover:border-accent/60 hover:bg-accent/10"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            download
          >
            <FiDownload className="w-4 h-4" />
            Download CV
          </motion.a>

          <motion.a
            href="https://github.com/gelbiasa"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-white/10"
            style={{ color: 'var(--text-secondary)' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub className="w-4 h-4" />
            GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about"
      >
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          Scroll down
        </span>
        <FiArrowDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
      </motion.button>
    </section>
  )
}
