import { FiGithub, FiInstagram, FiLinkedin, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold gradient-text text-base">Gelby</span>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} M. Isroqi Gelby Firmansyah. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
          Built with{' '}
          <FiHeart className="w-3 h-3 text-red-400 mx-1" />
          using React + Tailwind + Framer Motion
        </div>

        <div className="flex items-center gap-3">
          {[
            { href: 'https://github.com/gelbiasa', Icon: FiGithub, label: 'GitHub' },
            { href: 'https://www.instagram.com/gelbiasa', Icon: FiInstagram, label: 'Instagram' },
            { href: 'https://www.linkedin.com/in/gelbifirmansyah', Icon: FiLinkedin, label: 'LinkedIn' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-accent/20 hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
