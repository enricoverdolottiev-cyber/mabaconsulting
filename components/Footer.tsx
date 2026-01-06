'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function Footer() {
  const { dictionary } = useI18n()

  const footerLinks = {
    company: [
      { key: 'aboutUs' as const, href: '#' },
      { key: 'careers' as const, href: '#' },
      { key: 'contact' as const, href: '#' },
      { key: 'news' as const, href: '#' },
    ],
    services: [
      { key: 'managementConsulting' as const, href: '#' },
      { key: 'technologyConsulting' as const, href: '#' },
      { key: 'marketIntelligence' as const, href: '#' },
      { key: 'executiveSummits' as const, href: '#' },
    ],
    resources: [
      { key: 'blog' as const, href: '#' },
      { key: 'caseStudies' as const, href: '#' },
      { key: 'whitepapers' as const, href: '#' },
      { key: 'webinars' as const, href: '#' },
    ],
    legal: [
      { key: 'privacy' as const, href: '#' },
      { key: 'terms' as const, href: '#' },
      { key: 'cookies' as const, href: '#' },
    ],
  }

  return (
    <footer className="relative border-t border-white/10 bg-background-dark/50">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter font-sans">MaBa Consulting</h3>
              <p className="text-text-secondary mb-6 max-w-md font-sans">
                {dictionary.footer.tagline}
              </p>
            </motion.div>
          </div>

          {/* Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4 font-sans">{dictionary.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {dictionary.footer.links.company[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4 font-sans">{dictionary.footer.services}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {dictionary.footer.links.services[link.key]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4 font-sans">{dictionary.footer.resources}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {dictionary.footer.links.resources[link.key]}
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
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              {dictionary.footer.privacy}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              {dictionary.footer.terms}
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              {dictionary.footer.cookies}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

