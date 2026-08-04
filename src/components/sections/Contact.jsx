import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
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
    <section id="contact" className="py-24 relative">
      <div className="section-container relative px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">{t('contact.kicker')}</span>
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

        {/* Two-column layout: Form + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left side: Contact Form */}
          <motion.div
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border w-full relative overflow-hidden"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                  rows="5"
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
                    className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20 text-sm font-medium mt-2"
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
                    className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl border border-red-500/20 text-sm font-medium mt-2"
                  >
                    <FiAlertCircle className="w-5 h-5" />
                    {t('contact.error')}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right side: big CTA card */}
          <motion.div
            className="lg:col-span-2 glass rounded-2xl p-8 border flex flex-col items-center text-center gap-6"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-xl opacity-40" />
              <img
                src="/images/foto_gelby.png"
                alt="Gelby"
                className="relative w-24 h-24 rounded-full object-cover border-2 border-border"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[var(--bg-secondary)] flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>

            <div>
              <h3
                className="font-display font-bold text-xl mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('contact.profileTitle')}
              </h3>
              <p className="text-sm font-bold text-accent mb-1 tracking-wide">
                {t('contact.profileRole')}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t('contact.profileUni')}
              </p>
            </div>

            <div className="w-full h-px" style={{ background: 'var(--border)' }} />

            <div className="flex flex-col gap-3 w-full">
              <motion.a
                href="mailto:gelbifirmansyah12@gmail.com"
                className="w-full py-3 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-text-on-accent text-sm font-bold text-center transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('contact.sendEmailBtn')}
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1V4cyfrMNF_6Qn6DyePH1DuMv3qr_pcZD/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl border text-sm font-bold text-center transition-all duration-300 hover:border-border hover:bg-[var(--bg-secondary)] text-text-secondary hover:text-text-primary"
                style={{ borderColor: 'var(--border)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('contact.downloadCvBtn')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
