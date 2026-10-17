import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useAnimate, stagger } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Cinematic "Hire Me" — Curtain Reveal / Split Screen
 *
 * Sequence (timeline in ms):
 *  0ms    → top curtain slides DOWN  (from y:-100% → y:0)
 *  0ms    → bottom curtain slides UP (from y:+100% → y:0)
 *  400ms  → envelope flies in from left
 *  800ms  → signal rings pulse out
 *  1350ms → envelope explodes → laser line shoots across seam (TAB SWITCHES HERE)
 *  1750ms → curtain REVEAL: top slides UP, bottom slides DOWN (contact visible)
 *  2600ms → component removed from DOM
 */

export default function HireMeOverlay({ onDone, onSwitchTab }) {
  const { t } = useLanguage()
  const [phase, setPhase] = useState('curtain-in')
  // curtain-in | envelope | signal | laser | curtain-out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('envelope'),    300),
      setTimeout(() => setPhase('signal'),      750),
      setTimeout(() => {
        setPhase('laser');
        onSwitchTab?.();
      }, 1400),
      setTimeout(() => setPhase('curtain-out'), 1750),
      setTimeout(() => onDone?.(),              2500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const isOut        = phase === 'curtain-out'
  const showEnvelope = ['envelope', 'signal'].includes(phase)
  const showSignal   = phase === 'signal'
  const showLaser    = phase === 'laser'
  const showText     = ['envelope', 'signal', 'laser'].includes(phase)

  // Teks sapaan per huruf, mengikuti bahasa aktif
  const headline = `${t('contact.title1')} ${t('contact.title2')}`.toUpperCase()

  // Stable burst positions (so no randomness on re-render)
  const burstParticles = useRef(
    [...Array(24)].map((_, i) => {
      const angle = (i / 24) * 360
      const dist  = 70 + (i % 4) * 28
      return {
        angle,
        dx: Math.cos((angle * Math.PI) / 180) * dist,
        dy: Math.sin((angle * Math.PI) / 180) * dist,
        size: 3 + (i % 3),
      }
    })
  ).current

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9998,
        pointerEvents: isOut ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ═══════════════════════════════════════
          TOP CURTAIN — slides DOWN then UP
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: isOut ? '-100%' : '0%' }}
        transition={{
          duration: isOut ? 0.75 : 0.35,
          ease: isOut ? [0.76, 0, 0.24, 1] : [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid rgb(var(--accent-rgb)/0.3)',
          boxShadow: '0 4px 40px rgb(var(--accent-rgb)/0.12)',
        }}
      />

      {/* ═══════════════════════════════════════
          BOTTOM CURTAIN — slides UP then DOWN
      ═══════════════════════════════════════ */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOut ? '100%' : '0%' }}
        transition={{
          duration: isOut ? 0.75 : 0.35,
          ease: isOut ? [0.76, 0, 0.24, 1] : [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'var(--bg-primary)',
          borderTop: '1px solid rgb(var(--accent-rgb)/0.3)',
          boxShadow: '0 -4px 40px rgb(var(--accent-rgb)/0.12)',
        }}
      />

      {/* ═══════════════════════════════════════
          CENTRE STAGE — everything rendered at seam
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {!isOut && (
          <motion.div
            key="stage"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* ── Glow aura di belakang amplop ── */}
            {showEnvelope && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: [0, 0.9, 0.7, 0.85],
                  scale: [0.6, 1.15, 1.05, 1.22],
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  times: [0, 0.35, 0.7, 1],
                  repeat: showSignal ? Infinity : 0,
                  repeatType: 'mirror',
                }}
                style={{
                  position: 'absolute',
                  width: 240, height: 240,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.28) 0%, rgba(var(--accent-rgb),0.12) 28%, transparent 72%)',
                  boxShadow: '0 0 40px rgba(var(--accent-rgb),0.28), inset 0 0 30px rgba(var(--accent-rgb),0.14)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* ── Teks sapaan per huruf ── */}
            {showText && (
              <div
                style={{
                  position: 'absolute',
                  top: 78,
                  display: 'flex',
                  gap: '0.08em',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 800,
                  fontSize: 'clamp(14px, 2.2vw, 22px)',
                  letterSpacing: '0.35em',
                  color: 'var(--text-primary)',
                  textShadow: '0 0 18px rgb(var(--accent-rgb)/0.6)',
                  pointerEvents: 'none',
                  whiteSpace: 'pre',
                }}
              >
                {headline.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.35, delay: 0.25 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            )}

            {/* ── Signal Rings ── */}
            <AnimatePresence>
              {showSignal && [0, 1, 2].map((i) => (
                <motion.div
                  key={`ring-${i}`}
                  initial={{ width: 40, height: 40, opacity: 1, borderWidth: 3 }}
                  animate={{ width: 280, height: 280, opacity: 0, borderWidth: 1 }}
                  exit={{}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    border: `3px solid rgb(var(--accent-rgb))`,
                    boxShadow: '0 0 14px rgb(var(--accent-rgb)/0.5)',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </AnimatePresence>

            {/* ── Laser Line (shoots at seam) ── */}
            <AnimatePresence>
              {showLaser && (
                <motion.div
                  key="laser"
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25, ease: [0.87, 0, 0.13, 1], delay: 0.03 }}
                  style={{
                    position: 'absolute',
                    height: 3,
                    width: '120vw',
                    background: `linear-gradient(90deg,
                      transparent 0%,
                      rgb(var(--accent-rgb)/0.4) 10%,
                      rgb(var(--accent-rgb)) 40%,
                      rgb(var(--accent-rgb)) 60%,
                      rgb(var(--accent-rgb)/0.4) 90%,
                      transparent 100%)`,
                    boxShadow: `
                      0 0 6px  3px rgb(var(--accent-rgb)/0.9),
                      0 0 20px 8px rgb(var(--accent-rgb)/0.5),
                      0 0 50px 18px rgb(var(--accent-rgb)/0.2)
                    `,
                    transformOrigin: 'center',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {/* ── Shockwave + flash saat laser menembak ── */}
            <AnimatePresence>
              {showLaser && (
                <>
                  <motion.div
                    key="shockwave"
                    initial={{ width: 20, height: 20, opacity: 0.9 }}
                    animate={{ width: 900, height: 900, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      border: '2px solid rgb(var(--accent-rgb))',
                      boxShadow: '0 0 40px rgb(var(--accent-rgb)/0.6), inset 0 0 40px rgb(var(--accent-rgb)/0.3)',
                      pointerEvents: 'none',
                    }}
                  />
                  <motion.div
                    key="flash"
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                      position: 'fixed', inset: 0,
                      background: 'rgb(var(--accent-rgb))',
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* ── Particle Burst (when laser fires) ── */}
            <AnimatePresence>
              {showLaser && burstParticles.map((p, i) => (
                <motion.div
                  key={`burst-${i}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: p.dx, y: p.dy,
                    opacity: 0, scale: 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.008 }}
                  style={{
                    position: 'absolute',
                    width: p.size,
                    height: p.size,
                    borderRadius: '50%',
                    background: 'rgb(var(--accent-rgb))',
                    boxShadow: '0 0 8px 2px rgb(var(--accent-rgb)/0.8)',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </AnimatePresence>

            {/* ── Envelope Icon ── */}
            <AnimatePresence mode="popLayout">
              {showEnvelope && (
                <motion.div
                  key="envelope"
                  initial={{ x: '-55vw', opacity: 0, scale: 0.4, rotate: -25 }}
                  animate={{
                    x: 0,
                    y: showSignal ? [0, -7, 0, 6, 0] : 0,
                    opacity: 1,
                    scale: showSignal ? [1, 1.08, 1, 1.04, 1] : 1,
                    rotate: showSignal ? [0, -3, 2, 0] : 0,
                  }}
                  exit={{
                    scale: [1, 1.6, 0],
                    opacity: [1, 1, 0],
                    filter: ['blur(0px)', 'blur(0px)', 'blur(12px)'],
                    transition: {
                      duration: 0.2,
                      ease: 'easeIn',
                      times: [0, 0.4, 1],
                    },
                  }}
                  transition={{
                    duration: showSignal ? 1.2 : 0.35,
                    ease: [0.34, 1.56, 0.64, 1],
                    repeat: showSignal ? Infinity : 0,
                    repeatType: 'mirror',
                  }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    color: 'rgb(var(--accent-rgb))',
                    filter: `
                      drop-shadow(0 0 14px rgb(var(--accent-rgb)/0.9))
                      drop-shadow(0 0 32px rgb(var(--accent-rgb)/0.55))
                    `,
                  }}
                >
                  <motion.div
                    animate={{
                      boxShadow: showSignal
                        ? [
                            '0 0 14px rgba(var(--accent-rgb),0.3)',
                            '0 0 26px rgba(var(--accent-rgb),0.7)',
                            '0 0 18px rgba(var(--accent-rgb),0.5)',
                          ]
                        : '0 0 18px rgba(var(--accent-rgb),0.5)',
                    }}
                    transition={{ duration: 1.1, repeat: showSignal ? Infinity : 0, ease: 'easeInOut' }}
                    style={{ borderRadius: '22px', padding: 8 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.25}
                      style={{ width: 72, height: 72, display: 'block' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </motion.div>

                  {/* Floating micro-particles around envelope during signal */}
                  {showSignal && [
                    { a: 35,  d: 42, s: 3.5 },
                    { a: 135, d: 38, s: 2.5 },
                    { a: 215, d: 44, s: 3 },
                    { a: 310, d: 36, s: 2 },
                    { a: 75,  d: 50, s: 2 },
                    { a: 270, d: 46, s: 2.5 },
                  ].map((p, i) => (
                    <motion.span
                      key={`micro-${i}`}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.2,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        width: p.s, height: p.s,
                        borderRadius: '50%',
                        background: 'rgb(var(--accent-rgb))',
                        boxShadow: '0 0 8px rgb(var(--accent-rgb))',
                        transform: `translate(
                          calc(-50% + ${Math.cos((p.a * Math.PI) / 180) * p.d}px),
                          calc(-50% + ${Math.sin((p.a * Math.PI) / 180) * p.d}px)
                        )`,
                        pointerEvents: 'none',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Corner accent lines at seam (decorative) ── */}
            {['left', 'right'].map((side) => (
              <motion.div
                key={side}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.4 }}
                transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  [side]: 0,
                  width: '15%',
                  height: 1,
                  background: `linear-gradient(${side === 'left' ? 'to right' : 'to left'},
                    rgb(var(--accent-rgb)) 0%, transparent 100%)`,
                  transformOrigin: side,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
