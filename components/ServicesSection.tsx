'use client'

import { motion } from 'framer-motion'
import { Target, Zap, Workflow, TrendingUp, GraduationCap } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import Link from 'next/link'

// Mapping degli ID servizi per le icone
const serviceIcons: Record<string, typeof Target> = {
  'supporto-su-misura': Target,
  'tailored-support': Target,
  'supporto-tecnico': Zap,
  'technical-support': Zap,
  'supporto-gestionale-organizzativo': Workflow,
  'management-organizational-support': Workflow,
  'supporto-commerciale-marketing': TrendingUp,
  'commercial-marketing-support': TrendingUp,
  'supporto-formativo': GraduationCap,
  'training-support': GraduationCap,
}

export default function ServicesSection() {
  const { dictionary, locale } = useI18n()

  const services = dictionary.services.list || []

  return (
    <section id="services" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter font-sans">
            {dictionary.services.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{dictionary.services.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-sans px-2">
            {dictionary.services.subtitle}
          </p>
        </motion.div>

        {/* Flex layout centrato: 3 sopra, 2 sotto */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {services.map((service: any, index: number) => {
            const Icon = serviceIcons[service.id] || Target

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[380px]"
              >
                <Link
                  href={`/${locale}/services/${service.id}`}
                  className="flex flex-col items-center text-center rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,112,255,0.3)] transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-sans text-center">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed font-sans text-center">
                    {service.shortDescription}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

