'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'
import Logo from './Logo'

export default function Footer() {
  const { dictionary, locale } = useI18n()
  const pathname = usePathname()
  const contacts = dictionary.contacts

  // Helper function to get the correct href based on current location
  const getHref = (sectionId: string): string => {
    const homePath = `/${locale}`
    // If we're on the home page, use anchor links
    if (pathname === homePath) {
      return `#${sectionId}`
    }
    // Otherwise, link to home with anchor
    return `${homePath}#${sectionId}`
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const homePath = `/${locale}`
    
    // If href is an anchor link and we're on home page, handle smooth scroll
    if (href.startsWith('#') && pathname === homePath) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 96
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      }
      return
    }
    
    // If href contains a path (e.g., /it#about), it means we're on a subpage
    // Store hash in sessionStorage to scroll after navigation
    if (href.includes('#')) {
      const [path, hash] = href.split('#')
      if (path === homePath) {
        sessionStorage.setItem('scrollTo', hash)
      }
    }
  }

  // Handle scroll after navigation from subpage to home
  useEffect(() => {
    if (pathname === `/${locale}`) {
      const scrollTo = sessionStorage.getItem('scrollTo')
      if (scrollTo) {
        sessionStorage.removeItem('scrollTo')
        // Wait a bit for the page to render
        setTimeout(() => {
          const element = document.getElementById(scrollTo)
          if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 96
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            })
          }
        }, 100)
      }
    }
  }, [pathname, locale])

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
                <Link href={`/${locale}`}>
                  <Logo className="text-3xl font-bold tracking-tighter" />
                </Link>
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
              {footerLinks.company.map((link) => {
                const sectionId = link.href.replace('#', '')
                const href = getHref(sectionId)
                return (
                  <li key={link.key}>
                    <a
                      href={href}
                      onClick={(e) => handleLinkClick(e, href)}
                      className="text-text-secondary hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {dictionary.footer.links.company[link.key]}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>© {new Date().getFullYear()} {dictionary.footer.rights}</p>
              <p className="text-xs opacity-60 font-mono">{dictionary.footer.legalInfo}</p>
            </div>
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
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

