'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useI18n } from '@/contexts/I18nContext'

export default function Hero() {
  const { dictionary } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated grid and particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 112, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 112, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Radial gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,112,255,0.2),transparent_70%)]" />
        
        {/* Animated particles */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920
              const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080
              const randomEndY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  initial={{
                    x: randomX,
                    y: randomY,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, randomEndY],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter font-sans"
          >
            {(() => {
              const title = dictionary.hero.title
              // Check for "su Misura" (with capital M) first, then fallback to lowercase or "Tailored"
              let highlightText = ''
              if (title.includes('su Misura')) {
                highlightText = 'su Misura'
              } else if (title.includes('su misura')) {
                highlightText = 'su misura'
              } else if (title.includes('Tailored')) {
                highlightText = 'Tailored'
              }
              
              if (highlightText && title.includes(highlightText)) {
                const parts = title.split(highlightText)
                return (
                  <>
                    {parts[0]}
                    <span className="gradient-text">{highlightText}</span>
                    {parts[1]}
                  </>
                )
              }
              return title
            })()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary font-light font-sans"
          >
            {dictionary.hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

