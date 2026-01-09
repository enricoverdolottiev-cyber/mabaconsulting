'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import DownloadButton from './DownloadButton'

interface TeamDetailContentProps {
  lang: string
  slug: string
  memberInfo: {
    name: string
    role: string
  }
  memberData: {
    bio_title: string
    bio_content: string
    cv_button_label: string
    cv_file_path: string
  }
  teamMauro?: {
    name: string
    role: string
    personal_data: {
      birth: string
      family: string
      education: string
      membership: string
    }
    cv_pdf_label: string
    sections: {
      experience: string
      academic: string
      highlights: string
    }
    full_timeline: Array<{ period: string; title: string; points: string[] }>
    academic_extended: {
      title: string
      items: string[]
    }
    highlights?: string[]
  }
  teamLivia?: {
    name: string
    role: string
    personal_data: {
      education: string
      thesis: string
      languages: string
    }
    skills: string[]
    experience_timeline: Array<{ period: string; title: string; role: string; text: string }>
    projects: Array<{ title: string; description: string }>
    sections: {
      experience: string
      skills: string
      projects: string
    }
    cv_pdf_label: string
  }
  backToTeam: string
}

// Funzione per evidenziare nomi tecnici con Roboto Mono
const highlightTechnicalTerms = (text: string) => {
  const technicalTerms = [
    'SIMONA', 'MIUS', 'SUBSATCOM', 'DEVO', 'SICURO', 'PNRM', 'VEGA', 
    'ITALSAT-2', 'SICRAL-1', 'IRIS', 'ESA', 'EDA', 'ASI', 'EU', 'MIUR',
    'STS', 'BPD', 'ELV', 'FIAT AVIO', 'SELENIA SPAZIO', 'Qascom'
  ]
  
  let result = text
  technicalTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi')
    result = result.replace(regex, (match) => {
      return `<span class="font-mono text-primary-cyan font-semibold">${match}</span>`
    })
  })
  
  return result
}

// Funzione per separare titolo professionale e nome
const formatNameWithTitle = (fullName: string): React.ReactNode => {
  const titlePatterns = [
    /^(Ing\.|Eng\.)\s+(.+)$/i,
    /^(Dott\.ssa|Dr\.|Dr\.ssa)\s+(.+)$/i,
  ]
  
  for (const pattern of titlePatterns) {
    const match = fullName.match(pattern)
    if (match) {
      const title = match[1]
      const name = match[2]
      return (
        <>
          <span className="text-primary-cyan/80 font-medium">{title}</span>{' '}
          <span className="text-primary-cyan">{name}</span>
        </>
      )
    }
  }
  
  // Se non c'è titolo, ritorna il nome completo in ciano
  return <span className="text-primary-cyan">{fullName}</span>
}

export default function TeamDetailContent({
  lang,
  slug,
  memberInfo,
  memberData,
  teamMauro,
  teamLivia,
  backToTeam,
}: TeamDetailContentProps) {
  const { dictionary } = useI18n()
  // Layout dettagliato per Livia
  if (teamLivia) {
    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 px-6 lg:px-8 border-b border-white/10">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <Link
              href={`/${lang}#team`}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
              scroll={true}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{backToTeam}</span>
            </Link>
          </div>
        </section>

        {/* Header Section - Centered */}
        <section className="relative py-12 px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 mb-12 max-w-4xl mx-auto"
            >
              {/* Name and Role */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-sans">
                  <span className="text-primary-cyan">{formatNameWithTitle(teamLivia.name)}</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-300 mb-6 font-mono font-medium">
                  {teamLivia.role}
                </p>
              </div>

              {/* Personal Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Formazione</p>
                  <p className="text-text-primary font-sans text-sm leading-relaxed">{teamLivia.personal_data.education}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Tesi</p>
                  <p className="text-text-primary font-sans text-sm leading-relaxed font-mono">{teamLivia.personal_data.thesis}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Lingue</p>
                  <p className="text-text-primary font-sans text-sm leading-relaxed font-mono">{teamLivia.personal_data.languages}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-12 px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-5xl mx-auto space-y-16">
                {/* Experience Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight font-sans">
                    {teamLivia.sections.experience}
                  </h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-cyan to-primary/20 hidden md:block" />
                    
                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-16">
                      {teamLivia.experience_timeline.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: index * 0.15 }}
                          className="relative pl-0 md:pl-12"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-cyan border-4 border-black flex items-center justify-center hidden md:flex">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          
                          {/* Content */}
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-2xl md:text-3xl font-mono font-bold text-primary-cyan">
                                {item.period}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-sans">
                              {item.title}
                            </h3>
                            <p className="text-lg text-primary mb-3 font-sans">
                              {item.role}
                            </p>
                            <p className="text-text-secondary leading-relaxed font-sans text-sm md:text-base">
                              {item.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Projects Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight font-sans">
                    {teamLivia.sections.projects}
                  </h2>
                  <div className="space-y-6 md:space-y-8">
                    {teamLivia.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-5 md:p-6 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 hover:border-primary/30 transition-colors"
                      >
                        <h3 className="text-xl font-bold text-white mb-3 font-sans">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed font-sans text-sm md:text-base">
                          {project.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight font-sans">
                    {teamLivia.sections.skills}
                  </h2>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {teamLivia.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary-cyan/10 border border-primary/20 hover:border-primary/50 transition-colors"
                      >
                        <p className="text-white font-semibold font-sans text-sm md:text-base">
                          {skill}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Download CV Button - After all content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex justify-center mt-12"
                >
                  <DownloadButton
                    slug={slug}
                    lang={lang}
                    label={dictionary.team.downloadButton}
                  />
                </motion.div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Layout dettagliato per Mauro
  if (teamMauro) {
    return (
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 px-6 lg:px-8 border-b border-white/10">
          <div className="container mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <Link
              href={`/${lang}#team`}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
              scroll={true}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{backToTeam}</span>
            </Link>
          </div>
        </section>

        {/* Header Section - Centered */}
        <section className="relative py-12 px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-2xl p-8 md:p-12 mb-12 max-w-4xl mx-auto"
            >
              {/* Name and Role */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-sans">
                  <span className="text-primary-cyan">{formatNameWithTitle(teamMauro.name)}</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-300 mb-6 font-mono font-medium">
                  {teamMauro.role}
                </p>
              </div>

              {/* Personal Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Nascita</p>
                  <p className="text-text-primary font-sans text-sm">{teamMauro.personal_data.birth}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Famiglia</p>
                  <p className="text-text-primary font-sans text-sm">{teamMauro.personal_data.family}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Formazione</p>
                  <p className="text-text-primary font-sans text-sm leading-relaxed">{teamMauro.personal_data.education}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-mono mb-2 uppercase tracking-wider">Iscrizioni</p>
                  <p className="text-text-primary font-sans text-sm">{teamMauro.personal_data.membership}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-12 px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-5xl mx-auto space-y-16">
                {/* Experience Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight font-sans">
                    {teamMauro.sections.experience}
                  </h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-cyan to-primary/20 hidden md:block" />
                    
                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-16">
                      {teamMauro.full_timeline.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: index * 0.15 }}
                          className="relative pl-0 md:pl-12"
                        >
                          {/* Timeline Dot */}
                          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-cyan border-4 border-black flex items-center justify-center hidden md:flex">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          
                          {/* Content */}
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-2xl md:text-3xl font-mono font-bold text-primary-cyan">
                                {item.period}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 font-sans">
                              {item.title}
                            </h3>
                            
                            {/* Points List */}
                            <div className="space-y-3 md:space-y-4">
                              {item.points.map((point, pointIndex) => (
                                <motion.div
                                  key={pointIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.15 + pointIndex * 0.1 
                                  }}
                                  className="flex items-start gap-3 md:gap-4 group"
                                >
                                  {/* Bullet Icon */}
                                  <div className="flex-shrink-0 mt-1.5">
                                    <ArrowRight className="w-4 h-4 text-primary-cyan group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                                  </div>
                                  {/* Point Text */}
                                  <p 
                                    className="text-text-secondary leading-relaxed font-sans text-sm md:text-base flex-1"
                                    dangerouslySetInnerHTML={{ 
                                      __html: highlightTechnicalTerms(point) 
                                    }}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Academic Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <GraduationCap className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-sans">
                      {teamMauro.academic_extended.title}
                    </h2>
                  </div>
                  <div className="space-y-4 md:space-y-5">
                    {teamMauro.academic_extended.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 md:p-5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-white/5 hover:border-primary/30 transition-colors group"
                      >
                        <ArrowRight className="w-4 h-4 text-primary-cyan mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        <p 
                          className="text-text-secondary leading-relaxed font-sans text-sm md:text-base flex-1"
                          dangerouslySetInnerHTML={{ 
                            __html: highlightTechnicalTerms(item) 
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Highlights */}
                {teamMauro.highlights && teamMauro.highlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="glass rounded-2xl p-6 md:p-10 lg:p-12"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <Award className="w-8 h-8 text-primary" strokeWidth={1.5} />
                      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-sans">
                        {teamMauro.sections.highlights}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {teamMauro.highlights.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="p-4 md:p-5 rounded-lg bg-gradient-to-br from-primary/10 to-primary-cyan/10 border border-primary/20 hover:border-primary/50 transition-colors"
                        >
                          <p className="text-white font-semibold font-sans text-sm md:text-base">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Download CV Button - After all content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex justify-center mt-12"
                >
                  <DownloadButton
                    slug={slug}
                    lang={lang}
                    label={dictionary.team.downloadButton}
                  />
                </motion.div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  // Layout semplice per Livia o altri membri
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <Link
            href={`/${lang}#team`}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
            scroll={true}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{backToTeam}</span>
          </Link>

          {/* Name and Role with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-sans">
                <span className="text-primary-cyan">{formatNameWithTitle(memberInfo.name)}</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-300 mb-6 font-mono font-medium">
                {memberInfo.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-2xl p-8 md:p-12">
            {/* Bio Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight font-sans"
            >
              {memberData.bio_title}
            </motion.h2>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-lg text-text-secondary leading-relaxed font-mono whitespace-pre-line">
                {memberData.bio_content}
              </p>
            </motion.div>

            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <DownloadButton
                slug={slug}
                lang={lang}
                label={dictionary.team.downloadButton}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

