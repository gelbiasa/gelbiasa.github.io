import { motion } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiBook, FiArrowRight } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Technologies', value: '10+' },
  { label: 'Years Learning', value: '2+' },
]

const highlights = [
  { Icon: FiBriefcase, text: 'Intern Back-end Developer at UPA TIK Polinema' },
  { Icon: FiBook, text: 'D-IV Business Information Systems, Polinema' },
  { Icon: FiMapPin, text: 'Malang, East Java, Indonesia' },
]

export default function About() {
  return (
    <section className="relative pt-8 lg:pt-12">
      <div className="w-full">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="badge mb-4">About Me</span>
          <h2
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            Qualification{' '}
            <span className="gradient-text">Profile</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – Photo + Stats */}
          <motion.div
            className="flex flex-col items-center gap-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true }}
          >
            {/* Profile photo */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-30 scale-110 animate-float" />
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-accent/30 animate-spin" style={{ animationDuration: '20s' }} />
              <img
                src="/images/foto_gelby.png"
                alt="M. Isroqi Gelby Firmansyah"
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-full object-cover border-4 border-accent/40 shadow-2xl shadow-accent/20"
              />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {stats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="glass rounded-xl p-4 text-center"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={i * 0.1 + 0.3}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <div
                    className="font-display font-bold text-2xl gradient-text"
                  >
                    {value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Bio */}
          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true }}
            >
              <h3
                className="font-display font-bold text-2xl mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Hello, I'm{' '}
                <span className="gradient-text">Gelby</span> 👋
              </h3>

              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                  I'm a D-IV Business Information Systems student who focuses on developing web and
                  mobile applications. Currently interning as a Back-end Developer at UPA TIK
                  Politeknik Negeri Malang.
                </p>
                <p>
                  I have experience building secure and efficient information systems using Laravel,
                  PHP, JavaScript, and Flutter for mobile applications. I also master HTML, CSS,
                  MySQL, and am familiar with MySQL Workbench.
                </p>
                <p>
                  I am enthusiastic about developing technology solutions that support business
                  processes and improve user experience. With a passion for innovation, I want to
                  create a positive impact through the projects I work on.
                </p>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="space-y-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.3}
              viewport={{ once: true }}
            >
              {highlights.map(({ Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={0.45}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all duration-200"
                whileHover={{ x: 4 }}
              >
                See My Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
