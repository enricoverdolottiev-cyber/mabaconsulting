'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function AboutSection() {
  const { dictionary } = useI18n()

  const stats = [
    {
      value: dictionary.about.stats.years.value,
      label: dictionary.about.stats.years.label,
    },
    {
      value: dictionary.about.stats.projects.value,
      label: dictionary.about.stats.projects.label,
    },
    {
      value: dictionary.about.stats.clients.value,
      label: dictionary.about.stats.clients.label,
    },
  ]

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
            <p className="text-xl text-text-secondary mb-6 leading-relaxed font-sans">
              {dictionary.about.subtitle}
            </p>
            <p className="text-lg text-text-secondary leading-relaxed font-sans">
              {dictionary.about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary font-mono mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary font-sans">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

