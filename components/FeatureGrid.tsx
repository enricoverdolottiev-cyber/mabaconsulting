'use client'

import { motion } from 'framer-motion'
import { Rocket, Brain, BarChart3, Users, Zap, Shield } from 'lucide-react'
import FeatureCard from './FeatureCard'
import { useI18n } from '@/contexts/I18nContext'

export default function FeatureGrid() {
  const { dictionary } = useI18n()

  const features = [
    {
      key: 'managementConsulting',
      icon: Brain,
      className: 'col-span-1 md:col-span-2',
    },
    {
      key: 'technologyConsulting',
      icon: Rocket,
      className: 'col-span-1',
    },
    {
      key: 'marketIntelligence',
      icon: BarChart3,
      className: 'col-span-1',
    },
    {
      key: 'executiveSummits',
      icon: Users,
      className: 'col-span-1 md:col-span-2',
    },
  ].filter((feature) => {
    const featureData = dictionary.features[feature.key as keyof typeof dictionary.features] as {
      title: string
      description: string
    }
    return featureData && featureData.title && featureData.description
  })

  return (
    <section className="relative py-32 px-6 lg:px-8 scroll-mt-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter font-sans">
            {dictionary.features.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{dictionary.features.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-sans">
            {dictionary.features.subtitle}
            {dictionary.features.subtitleBold && (
              <>
                {' '}
                <span className="text-white font-semibold">{dictionary.features.subtitleBold}</span>
              </>
            )}
            {dictionary.features.subtitleEnd && (
              <>
                {' '}
                {dictionary.features.subtitleEnd}
              </>
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const featureData = dictionary.features[feature.key as keyof typeof dictionary.features] as {
              title: string
              description: string
            }
            return (
              <FeatureCard
                key={feature.key}
                title={featureData.title}
                description={featureData.description}
                icon={feature.icon}
                delay={index * 0.1}
                className={feature.className}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

