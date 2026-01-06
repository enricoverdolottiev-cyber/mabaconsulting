'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/contexts/I18nContext'

export default function ContactSection() {
  const { dictionary } = useI18n()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(dictionary.contact.info.emailValue)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-sans">
            {dictionary.contact.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-sans">
            {dictionary.contact.subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl"
          >
            <div className="rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 font-sans">
                    {dictionary.contact.info.email}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-text-secondary font-sans">
                      {dictionary.contact.info.emailValue}
                    </p>
                    <motion.button
                      onClick={copyEmail}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      title={dictionary.contact.info.copyEmail}
                    >
                      {emailCopied ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <Copy className="w-5 h-5 text-text-secondary" />
                      )}
                    </motion.button>
                  </div>
                  {emailCopied && (
                    <p className="text-xs text-primary mt-2 font-sans">
                      {dictionary.contact.info.emailCopied}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-sans">
                    {dictionary.contact.info.location}
                  </h3>
                  <p className="text-text-secondary font-sans">
                    {dictionary.contact.info.locationValue}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
