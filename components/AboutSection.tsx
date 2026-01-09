'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function AboutSection() {
  const { dictionary } = useI18n()

  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
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
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter font-sans"
              dangerouslySetInnerHTML={{ __html: dictionary.about.title }} 
            />
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans px-2">
              {dictionary.about.subtitle}
            </p>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

