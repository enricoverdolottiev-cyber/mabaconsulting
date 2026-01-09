'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

export default function Navbar() {
  const { dictionary } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const sections = ['about', 'method', 'services', 'team', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (!section) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId)
          }
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0,
        }
      )

      observer.observe(section)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const navItems = [
    { key: 'aboutUs', hasDropdown: false, href: '#about' },
    { key: 'method', hasDropdown: false, href: '#method' },
    { key: 'services', hasDropdown: false, href: '#services' },
    { key: 'team', hasDropdown: false, href: '#team' },
    { key: 'contact', hasDropdown: false, href: '#contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/5 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20 sm:h-24 gap-4">
          {/* Logo - Colonna sinistra */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer justify-self-start z-10"
          >
            <Logo className="text-2xl sm:text-3xl font-bold tracking-tighter" />
          </motion.a>

          {/* Navigation Links - Colonna centrale (centrato rispetto alla viewport) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 justify-self-center">
            {navItems.map((item) => {
              const name = dictionary.nav[item.key as keyof typeof dictionary.nav]
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId
              
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-1 text-sm font-bold transition-colors duration-200 relative group ${
                      isActive ? 'text-white' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {name}
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: activeDropdown === item.key ? 1 : 0,
                      y: activeDropdown === item.key ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: activeDropdown === item.key ? 'auto' : 'none' }}
                  >
                    <div className="text-white/70 text-sm py-2 px-3 rounded hover:text-white hover:bg-white/5 transition-colors">
                      Dropdown items
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-cyan"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )
            })}
          </div>

          {/* Language Switcher e Mobile Menu Button - Colonna destra */}
          <div className="flex items-center justify-self-end gap-4">
            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Fuori dalla griglia, posizionato assolutamente */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 mt-2"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => {
              const name = dictionary.nav[item.key as keyof typeof dictionary.nav]
              const sectionId = item.href.replace('#', '')
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href)
                    setMobileMenuOpen(false)
                  }}
                  className={`block text-base font-bold transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {name}
                </a>
              )
            })}
            <div className="pt-4 border-t border-white/10">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
