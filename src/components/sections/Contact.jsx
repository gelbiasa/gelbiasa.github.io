import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { contacts } from '../../data/contacts'

function ContactCard({ contact, index }) {
  const { label, handle, url, Icon, color, bg, border } = contact

  return (
    <motion.a
      href={url}
      target={url.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      className={`contact-card glass rounded-2xl p-5 flex items-center gap-4 border transition-all duration-300 group ${border}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Icon bg */}
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-medium mb-0.5"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <p
          className="text-sm font-semibold truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {handle}
        </p>
      </div>

      {/* Arrow */}
      <FiArrowUpRight
        className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: 'var(--text-muted)' }}
      />
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--bg-secondary)' }}
      />

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge mb-4">Contact</span>
          <h2
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Feel free to reach out for collaborations, opportunities, or just to say hi!
          </p>
        </motion.div>

        {/* Two-column layout: cards + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {contacts.map((contact, i) => (
              <ContactCard key={contact.id} contact={contact} index={i} />
            ))}
          </div>

          {/* Right side: big CTA card */}
          <motion.div
            className="glass rounded-2xl p-8 border flex flex-col items-center text-center gap-6"
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
                className="relative w-24 h-24 rounded-full object-cover border-2 border-accent/40"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[var(--bg-secondary)] flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>

            <div>
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                M. Isroqi Gelby Firmansyah
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Business Information Systems Student
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Politeknik Negeri Malang
              </p>
            </div>

            <div className="w-full h-px" style={{ background: 'var(--border)' }} />

            <div className="flex flex-col gap-3 w-full">
              <motion.a
                href="mailto:gelbifirmansyah12@gmail.com"
                className="w-full py-3 rounded-xl bg-accent text-white text-sm font-semibold text-center shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Email
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1V4cyfrMNF_6Qn6DyePH1DuMv3qr_pcZD/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl border text-sm font-semibold text-center transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
