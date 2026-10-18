import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Cinematic "Hire Me" — Anamorphic Horizon & Origami Message Reveal
 *
 * Designed to be simple, fast (~1.65s total), unique, and ultra-elegant
 * without circular radar rings or wobbling icons.
 *
 * Timeline:
 *   0ms    → Split curtains close cleanly to the center horizon
 *   220ms  → Envelope draws in at center + flap opens + subtle horizontal bracket locks in
 *   920ms  → Envelope morphs into an anamorphic horizontal light blade (TAB SWITCHES HERE)
 *   1150ms → Curtains part smoothly to reveal Contact section
 *   1700ms → Overlay unmounts
 */

export default function HireMeOverlay({ onDone, onSwitchTab }) {
  const { t } = useLanguage()
  const [phase, setPhase] = useState('curtain-in')
  // curtain-in | reveal | slice | curtain-out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('reveal'), 220),
      setTimeout(() => {
        setPhase('slice')
        onSwitchTab?.()
      }, 920),
      setTimeout(() => setPhase('curtain-out'), 1150),
      setTimeout(() => onDone?.(), 1700),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const isOut    = phase === 'curtain-out'
  const isReveal = phase === 'reveal'
  const isSlice  = phase === 'slice'
  const showCore = isReveal || isSlice

  const headline = `${t('contact.title1')} ${t('contact.title2')}`.toUpperCase()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: isOut ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ═══════════════════════════════════════
          TOP CURTAIN
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: isOut ? '-100%' : '0%' }}
        transition={{
          duration: isOut ? 0.55 : 0.3,
          ease: isOut ? [0.76, 0, 0.24, 1] : [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid rgb(var(--accent-rgb) / 0.18)',
        }}
      />

      {/* ═══════════════════════════════════════
          BOTTOM CURTAIN
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOut ? '100%' : '0%' }}
        transition={{
          duration: isOut ? 0.55 : 0.3,
          ease: isOut ? [0.76, 0, 0.24, 1] : [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'var(--bg-primary)',
          borderTop: '1px solid rgb(var(--accent-rgb) / 0.18)',
        }}
      />

      {/* ═══════════════════════════════════════
          HORIZON STAGE (Red-box seam region)
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {!isOut && (
          <motion.div
            key="stage"
            exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* ── 1. Precision Anamorphic Horizon Line ── */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: isSlice ? 1.05 : 1,
                opacity: isSlice ? 1 : 0.65,
                height: isSlice ? 2 : 1,
              }}
              transition={{
                duration: isSlice ? 0.22 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: 'absolute',
                width: '100vw',
                background:
                  'linear-gradient(90deg, transparent 0%, rgb(var(--accent-rgb) / 0.15) 15%, rgb(var(--accent-rgb)) 50%, rgb(var(--accent-rgb) / 0.15) 85%, transparent 100%)',
                boxShadow: isSlice
                  ? '0 0 24px 2px rgb(var(--accent-rgb) / 0.9), 0 0 50px 4px rgb(var(--accent-rgb) / 0.4)'
                  : '0 0 10px 1px rgb(var(--accent-rgb) / 0.3)',
                transformOrigin: 'center',
                pointerEvents: 'none',
              }}
            />

            {/* ── 2. Centerpiece: Clean, Precision Message Emblem ── */}
            <AnimatePresence mode="popLayout">
              {showCore && (
                <motion.div
                  key="message-core"
                  initial={{ opacity: 0, scale: 0.84 }}
                  animate={
                    isSlice
                      ? {
                          opacity: 0,
                          scaleX: 1.8,
                          scaleY: 0.1,
                          filter: 'blur(5px)',
                        }
                      : {
                          opacity: 1,
                          scale: 1,
                          filter: 'blur(0px)',
                        }
                  }
                  transition={{
                    duration: isSlice ? 0.22 : 0.36,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 18px',
                    background: 'var(--bg-primary)',
                    border: '1px solid rgb(var(--accent-rgb) / 0.4)',
                    borderRadius: 12,
                    boxShadow:
                      '0 0 24px -2px rgb(var(--accent-rgb) / 0.3), inset 0 0 12px rgb(var(--accent-rgb) / 0.05)',
                  }}
                >

                  {/* Precision SVG Message + Paper-Plane Glide */}
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'block',
                      color: 'rgb(var(--accent-rgb))',
                      filter: 'drop-shadow(0 0 8px rgb(var(--accent-rgb) / 0.65))',
                      overflow: 'visible',
                    }}
                  >
                    {/* Rising inner letter card */}
                    <motion.path
                      d="M7 12.5V7.5C7 6.94772 7.44772 6.5 8 6.5H20C20.5523 6.5 21 6.94772 21 7.5V12.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, y: 4, opacity: 0 }}
                      animate={{ pathLength: 1, y: -2.5, opacity: 0.9 }}
                      transition={{ duration: 0.38, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* Minimal glowing lines inside the rising letter */}
                    <motion.line
                      x1="10.5"
                      y1="8.2"
                      x2="17.5"
                      y2="8.2"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0, y: 3 }}
                      animate={{ pathLength: 1, opacity: 0.75, y: -2.5 }}
                      transition={{ duration: 0.3, delay: 0.24, ease: 'easeOut' }}
                    />

                    {/* Main sleek envelope body */}
                    <motion.rect
                      x="3.5"
                      y="8.5"
                      width="21"
                      height="14"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Envelope V-fold crease */}
                    <motion.path
                      d="M4.5 9.5L12.75 15.6C13.49 16.15 14.51 16.15 15.25 15.6L23.5 9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 5. Typography: Clean, Spaced Editorial Reveal ── */}
            {showCore && (
              <motion.div
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={
                  isSlice
                    ? { opacity: 0, y: -4, filter: 'blur(4px)' }
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                }
                transition={{ duration: 0.32, delay: isSlice ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: 44,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 600,
                  fontSize: 'clamp(11px, 1.4vw, 14px)',
                  letterSpacing: '0.42em',
                  paddingLeft: '0.42em',
                  color: 'var(--text-primary)',
                  textShadow: '0 0 14px rgb(var(--accent-rgb) / 0.45)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {headline}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

