'use client'

import { motion } from 'framer-motion'
import { Target, Zap, Workflow, TrendingUp } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'

export default function ServicesSection() {
  const { dictionary } = useI18n()

  const services = [
    {
      key: 'strategicConsulting' as const,
      icon: Target,
    },
    {
      key: 'digitalTransformation' as const,
      icon: Zap,
    },
    {
      key: 'processEngineering' as const,
      icon: Workflow,
    },
    {
      key: 'businessDevelopment' as const,
      icon: TrendingUp,
    },
  ]

  return (
    <section id="services" className="relative py-32 px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-sans">
            {dictionary.services.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-sans">
            {dictionary.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const serviceData = dictionary.services[service.key as keyof typeof dictionary.services] as {
              title: string
              description: string
            }
            const Icon = service.icon

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,112,255,0.3)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-sans">
                  {serviceData.title}
                </h3>
                <p className="text-text-secondary leading-relaxed font-sans">
                  {serviceData.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

