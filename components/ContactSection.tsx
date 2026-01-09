'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Copy, Check } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { useState } from 'react'

// Protezione anti-bot: converte email in HTML entities (visibile ma difficile da scansionare)
const encodeEmailForDisplay = (email: string): string => {
  return email
    .replace(/@/g, '&#64;')
    .replace(/\./g, '&#46;')
}

// Decodifica per uso funzionale (mailto, copy)
const decodeEmail = (encodedEmail: string): string => {
  return encodedEmail
    .replace(/&#64;/g, '@')
    .replace(/&#46;/g, '.')
}

export default function ContactSection() {
  const { dictionary } = useI18n()
  const contacts = dictionary.contacts
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      // Silent fail
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter font-sans">
            <span className="gradient-text">{contacts.title}</span>
          </h2>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
            {/* Company Name */}
            <div className="rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-cyan mb-4 font-sans text-left">
                {contacts.companyName}
              </h3>
              
              {/* Legal Info */}
              <div className="mb-6 space-y-1">
                <p className="text-sm text-text-secondary font-mono text-left">
                  {contacts.vatInfo}
                </p>
                <p className="text-sm text-text-secondary font-mono text-left">
                  {contacts.registryInfo}
                </p>
              </div>
              
              {/* Legal Seat */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-primary mb-1 font-sans text-left">
                    {contacts.legalSeat}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Via+Giulia+16+00186+Roma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary font-mono hover:text-cyan-400 transition-colors cursor-pointer text-left"
                  >
                    {contacts.legalSeatAddress}
                  </a>
                </div>
              </div>

              {/* Mauro Balduccini Block */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-sm font-semibold text-primary mb-2 font-sans text-left">
                  {contacts.admin}
                </p>
                <p className="text-base font-semibold text-white mb-4 font-sans text-left">
                  {contacts.adminName}
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${contacts.adminMobile.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-text-secondary font-mono group-hover:text-white transition-colors text-left">
                      {contacts.adminMobile}
                    </span>
                  </a>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${contacts.adminMail}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleEmailClick(contacts.adminMail)
                      }}
                      className="text-text-secondary font-mono hover:text-white transition-colors cursor-pointer text-left"
                      dangerouslySetInnerHTML={{ __html: encodeEmailForDisplay(contacts.adminMail) }}
                    />
                    <button
                      onClick={() => copyToClipboard(contacts.adminMail)}
                      className="p-1 hover:text-cyan-400 transition-colors cursor-pointer"
                      aria-label={contacts.emailCopied}
                    >
                      {copiedEmail === contacts.adminMail ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Livia Balduccini Block */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-sm font-semibold text-primary mb-2 font-sans text-left">
                  {contacts.marketing}
                </p>
                <p className="text-base font-semibold text-white mb-4 font-sans text-left">
                  {contacts.marketingName}
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${contacts.marketingMobile.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 group"
                  >
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-text-secondary font-mono group-hover:text-white transition-colors text-left">
                      {contacts.marketingMobile}
                    </span>
                  </a>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${contacts.marketingMail}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleEmailClick(contacts.marketingMail)
                      }}
                      className="text-text-secondary font-mono hover:text-white transition-colors cursor-pointer text-left"
                      dangerouslySetInnerHTML={{ __html: encodeEmailForDisplay(contacts.marketingMail) }}
                    />
                    <button
                      onClick={() => copyToClipboard(contacts.marketingMail)}
                      className="p-1 hover:text-cyan-400 transition-colors cursor-pointer"
                      aria-label={contacts.emailCopied}
                    >
                      {copiedEmail === contacts.marketingMail ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* General Mail */}
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${contacts.generalMail}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleEmailClick(contacts.generalMail)
                  }}
                  className="text-lg font-semibold text-white font-mono hover:text-primary transition-colors cursor-pointer text-left"
                  dangerouslySetInnerHTML={{ __html: encodeEmailForDisplay(contacts.generalMail) }}
                />
                <button
                  onClick={() => copyToClipboard(contacts.generalMail)}
                  className="p-1 hover:text-cyan-400 transition-colors cursor-pointer"
                  aria-label={contacts.emailCopied}
                >
                  {copiedEmail === contacts.generalMail ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
