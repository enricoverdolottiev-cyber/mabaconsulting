'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useI18n } from '@/contexts/I18nContext'

export default function TeamSection() {
  const { dictionary, locale } = useI18n()

  const teamMembers = [
    {
      key: 'mauro' as const,
      slug: 'mauro-balduccini',
    },
    {
      key: 'livia' as const,
      slug: 'livia-balduccini',
    },
  ]

  return (
    <section id="team" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 scroll-mt-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter font-sans">
            {dictionary.team.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="gradient-text">{dictionary.team.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-sans px-2">
            {dictionary.team.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {teamMembers.map((member, index) => {
            const memberData = dictionary.team[member.key as keyof typeof dictionary.team] as {
              name: string
              role: string
              description: string
            }

            return (
              <Link
                key={member.key}
                href={`/${locale}/team/${member.slug}`}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  className="h-full min-h-[280px] sm:min-h-[300px] rounded-2xl p-6 sm:p-8 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,112,255,0.3)] transition-all duration-300 cursor-pointer group flex flex-col items-center text-center"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-cyan mb-2 sm:mb-3 tracking-tight font-sans text-center">
                    {memberData.name}
                  </h3>
                  <p className="text-base sm:text-lg text-blue-300 mb-3 sm:mb-4 font-mono font-medium text-center">
                    {memberData.role}
                  </p>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans flex-grow text-center">
                    {memberData.description}
                  </p>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

