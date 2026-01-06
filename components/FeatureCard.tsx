'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  delay?: number
  className?: string
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  delay = 0,
  className = '',
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 30px rgba(0, 112, 255, 0.4)' }}
      className={`rounded-2xl p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 ${className}`}
    >
      <div className="mb-6">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary-cyan flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-sans">{title}</h3>
      <p className="text-text-secondary leading-relaxed font-sans">{description}</p>
    </motion.div>
  )
}

