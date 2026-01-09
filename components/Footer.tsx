'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'
import Logo from './Logo'

export default function Footer() {
  const { dictionary } = useI18n()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 96
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
    }
  }

  const footerLinks = {
    company: [
      { key: 'aboutUs' as const, href: '#about' },
      { key: 'contact' as const, href: '#contact' },
    ],
    legal: [
      { key: 'privacy' as const, href: '/privacy-policy' },
      { key: 'terms' as const, href: '/terms-of-service' },
      { key: 'cookies' as const, href: '/cookie-policy' },
    ],
  }

  return (
    <footer className="relative border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <Logo className="text-3xl font-bold tracking-tighter" />
              </div>
              <p className="text-text-secondary mb-6 max-w-md font-sans">
                {dictionary.footer.tagline}
              </p>
            </motion.div>
          </div>

          {/* Company Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-4 font-sans">{dictionary.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-text-secondary hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {dictionary.footer.links.company[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary"
        >
          <p>© {new Date().getFullYear()} MaBa Consulting. {dictionary.footer.rights}</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {footerLinks.legal.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {dictionary.footer[link.key]}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

