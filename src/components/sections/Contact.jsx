import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheckCircle, FiAlertCircle, FiMapPin, FiCode, FiDatabase } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const object = {
      access_key: "31f87b85-90db-461d-bcf5-97270d4e759a",
      subject: "New Contact Message from Portfolio",
      from_name: formData.name,
      ...formData
    }
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      })
      const result = await res.json()
      
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="pt-32 pb-24 relative">
      <div className="section-container relative px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* Header — no badge */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('contact.title1')}{' '}
            <span className="gradient-text">{t('contact.title2')}</span>
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Two-column layout: Profile + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* ──────── LEFT: Premium Profile Card ──────── */}
          <motion.div
            className="lg:col-span-2 relative rounded-2xl overflow-hidden border flex flex-col"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Top photo area — fills upper half */}
            <div className="relative w-full flex-shrink-0" style={{ height: '260px' }}>
              {/* Radial glow behind photo */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 80%, rgb(var(--accent-rgb)/0.35) 0%, transparent 70%)',
                }}
              />
              {/* Ambient spray dots (like HomeSection) */}
              {[
                { top: '8%', left: '8%', s: 5, o: 0.4 },
                { top: '15%', right: '10%', s: 3, o: 0.3 },
                { top: '50%', right: '4%', s: 4, o: 0.2 },
                { bottom: '12%', right: '8%', s: 3, o: 0.35 },
                { bottom: '10%', left: '12%', s: 4, o: 0.25 },
                { top: '40%', left: '4%', s: 3, o: 0.3 },
              ].map((d, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-accent"
                  style={{ top: d.top, left: d.left, right: d.right, bottom: d.bottom, width: d.s, height: d.s, opacity: d.o, filter: 'blur(1px)' }}
                />
              ))}

              {/* Photo with organic blob shape */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-[160px] h-[190px] z-10">
                {/* Glow halo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgb(var(--accent-rgb)/0.45) 0%, transparent 70%)',
                    filter: 'blur(18px)',
                    transform: 'scale(1.3)',
                  }}
                />
                {/* Photo blob */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: '44% 56% 52% 48% / 45% 40% 60% 55%',
                    border: '2px solid rgb(var(--accent-rgb)/0.5)',
                    boxShadow: '0 0 0 3px rgb(var(--accent-rgb)/0.15), 0 8px 40px rgb(var(--accent-rgb)/0.3)',
                  }}
                >
                  <img
                    src="/images/foto_gelby.png"
                    alt="M. Isroqi Gelby Firmansyah"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                </div>
            </div>

            {/* Bottom info area */}
            <div
              className="flex-1 flex flex-col items-center text-center pt-24 pb-8 px-6 gap-5"
              style={{ background: 'var(--glass)', backdropFilter: 'blur(16px)' }}
            >
              {/* Name */}
              <div>
                <h3 className="font-display font-black text-xl" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.profileTitle')}
                </h3>
                <p className="text-xs mt-1 font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                  {t('contact.profileUni')}
                </p>
              </div>

              {/* Divider */}
              <div className="w-10 h-[2px] rounded-full bg-accent/40" />

              {/* Role badges */}
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ background: 'rgb(var(--accent-rgb)/0.08)', border: '1px solid rgb(var(--accent-rgb)/0.2)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgb(var(--accent-rgb)/0.15)' }}>
                    <FiCode className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-sm font-bold text-accent tracking-wide">{t('contact.profileRole1')}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ background: 'rgb(var(--accent-rgb)/0.08)', border: '1px solid rgb(var(--accent-rgb)/0.2)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgb(var(--accent-rgb)/0.15)' }}>
                    <FiDatabase className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-sm font-bold text-accent tracking-wide">{t('contact.profileRole2')}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mt-auto" style={{ color: 'var(--text-muted)' }}>
                <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs">Malang, East Java, Indonesia</span>
              </div>
            </div>
          </motion.div>

          {/* ──────── RIGHT: Contact Form ──────── */}
          <motion.div
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border w-full relative overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderName')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-border focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderEmail')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-border focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholderMessage')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-border focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none resize-none custom-scrollbar"
                  style={{ color: 'var(--text-primary)' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group w-full py-3.5 rounded-xl bg-accent text-text-on-accent font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-accent-light transition-all shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)] disabled:opacity-70 disabled:cursor-not-allowed mt-2 border border-accent/20"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-text-on-accent/20 border-t-text-on-accent rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.send')} <FiSend className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20 text-sm font-medium"
                  >
                    <FiCheckCircle className="w-5 h-5" />
                    {t('contact.success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20 text-sm font-medium"
                  >
                    <FiAlertCircle className="w-5 h-5" />
                    {t('contact.error')}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
