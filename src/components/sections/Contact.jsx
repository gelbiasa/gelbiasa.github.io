import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCheckCircle, FiAlertCircle, FiMapPin, FiCode, FiDatabase, FiMail, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'

export default function Contact() {
  const { t, language } = useLanguage()
  const [activeContactTab, setActiveContactTab] = useState('email')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const contactTabs = [
    { id: 'email', label: 'gelbifirmansyah12@gmail.com', icon: FiMail },
    { id: 'whatsapp', label: '085804049240', icon: FaWhatsapp },
    { id: 'linkedin', label: 'gelbifirmansyah', icon: FiLinkedin },
    { id: 'github', label: 'gelbiasa', icon: FiGithub },
  ]

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
          className="text-center mb-10"
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

        {/* Contact Tabs */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {contactTabs.map((tab) => {
            const isActive = activeContactTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveContactTab(tab.id)}
                className={`relative group flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-xl border transition-all duration-300 font-bold text-[13px] md:text-sm overflow-hidden ${
                  isActive
                    ? 'border-accent/80 shadow-[0_0_20px_var(--accent-glow)] scale-[1.02] bg-[var(--bg-secondary)]'
                    : 'border-border hover:border-accent/50 bg-surface shadow-md hover:shadow-lg'
                }`}
              >
                {/* Active Glow Sweep */}
                <div
                  className={`absolute inset-0 bg-accent transition-transform duration-500 ease-out origin-left z-0 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-10'
                  }`}
                />
                
                {/* Hover effect for inactive tabs */}
                {!isActive && (
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 bg-accent transition-opacity duration-300" />
                )}

                <Icon className={`relative z-10 w-4 h-4 transition-colors duration-300 ${isActive ? 'text-text-on-accent' : 'text-accent group-hover:scale-110'}`} />
                
                <span className={`relative z-10 tracking-wider transition-colors duration-300 ${isActive ? 'text-text-on-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
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

          {/* ──────── RIGHT: Dynamic Content Panel ──────── */}
          <motion.div
            className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border w-full relative overflow-hidden flex flex-col"
            style={{ borderColor: 'var(--border)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {activeContactTab === 'email' && (
                <motion.form 
                  key="email-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-5 relative z-10 flex-1 justify-center"
                >
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
                </motion.form>
              )}

              {activeContactTab === 'whatsapp' && (
                <motion.div 
                  key="whatsapp-info"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full min-h-[350px] gap-6 text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                    <FaWhatsapp className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Chat via WhatsApp</h4>
                    <p className="mb-8 max-w-xs mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {language === 'en' 
                        ? "Have a question or an interesting project? Let's discuss it directly via WhatsApp." 
                        : "Punya pertanyaan atau proyek menarik? Mari berdiskusi langsung melalui WhatsApp."}
                    </p>
                    <a 
                      href="https://wa.me/6285804049240" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-green-500 text-white font-bold tracking-wide hover:bg-green-600 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                    >
                      {language === 'en' ? "Start Chat" : "Mulai Chat"} <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}

              {activeContactTab === 'linkedin' && (
                <motion.div 
                  key="linkedin-info"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full min-h-[350px] gap-6 text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/30 shadow-[0_0_20px_rgba(10,102,194,0.15)]">
                    <FiLinkedin className="w-10 h-10 text-[#0A66C2]" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Connect on LinkedIn</h4>
                    <p className="mb-8 max-w-xs mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {language === 'en'
                        ? "View my professional experience and let's connect on LinkedIn."
                        : "Lihat pengalaman profesional saya dan mari terhubung di jaringan LinkedIn."}
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/gelbifirmansyah" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0A66C2] text-white font-bold tracking-wide hover:bg-[#004182] transition-colors shadow-[0_0_20px_rgba(10,102,194,0.3)] hover:shadow-[0_0_30px_rgba(10,102,194,0.5)]"
                    >
                      {language === 'en' ? "Visit Profile" : "Kunjungi Profil"} <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}

              {activeContactTab === 'github' && (
                <motion.div 
                  key="github-info"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full min-h-[350px] gap-6 text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-slate-500/10 flex items-center justify-center border border-slate-500/30 shadow-[0_0_20px_rgba(100,116,139,0.15)]">
                    <FiGithub className="w-10 h-10" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Explore GitHub</h4>
                    <p className="mb-8 max-w-xs mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {language === 'en'
                        ? "Explore my source code, open source projects, and contributions on GitHub."
                        : "Jelajahi kode sumber, proyek open source, dan kontribusi saya di GitHub."}
                    </p>
                    <a 
                      href="https://github.com/gelbiasa" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold tracking-wide hover:bg-slate-900 border border-slate-700 transition-colors shadow-[0_0_20px_rgba(30,41,59,0.3)] hover:shadow-[0_0_30px_rgba(30,41,59,0.5)]"
                    >
                      {language === 'en' ? "View Repositories" : "Lihat Repositori"} <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
