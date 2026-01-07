'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function AboutSection() {
  const { dictionary } = useI18n()

  return (
    <section id="about" className="relative py-32 px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-sans">
              {dictionary.about.title}
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed font-sans">
              {dictionary.about.subtitle}
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

