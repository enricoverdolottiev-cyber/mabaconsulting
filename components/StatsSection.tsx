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

  const stats = [
    { 
      value: 99.9, 
      suffix: '%', 
      key: 'uptime' as const
    },
    { 
      value: 500, 
      suffix: '+', 
      key: 'projects' as const
    },
    { 
      value: 50, 
      suffix: '+', 
      key: 'countries' as const
    },
    { 
      value: 1000, 
      suffix: '+', 
      key: 'experts' as const
    },
  ]

  return (
    <section className="relative py-32 px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter font-sans">
            {dictionary.stats.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{dictionary.stats.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto font-sans">
            {dictionary.stats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const statData = dictionary.stats[stat.key]
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
              <Counter value={stat.value} suffix={stat.suffix} />
              <h3 className="text-xs font-mono text-primary/70 uppercase tracking-wider mt-4 mb-2">{statData.label}</h3>
              <p className="text-text-secondary font-sans text-sm">{statData.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

