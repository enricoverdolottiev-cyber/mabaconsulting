'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useI18n } from '@/contexts/I18nContext'

interface CounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function Counter({ value, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-6xl md:text-7xl font-bold gradient-text">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

export default function StatsSection() {
  const { dictionary } = useI18n()

  const statKeys: Array<'uptime' | 'projects' | 'countries' | 'experts'> = [
    'uptime',
    'projects',
    'countries',
    'experts',
  ]

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tighter font-sans">
            {dictionary.stats.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{dictionary.stats.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto font-sans px-2">
            {dictionary.stats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statKeys.map((key, index) => {
            const statData = dictionary.stats[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center px-2"
              >
              <Counter value={statData.value} suffix={statData.suffix} />
              <h3 className="text-xs font-mono text-primary/70 uppercase tracking-wider mt-3 sm:mt-4 mb-2">{statData.label}</h3>
              <p className="text-text-secondary font-sans text-sm sm:text-base">{statData.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

