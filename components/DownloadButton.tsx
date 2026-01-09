'use client'

import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'

interface DownloadButtonProps {
  slug: string
  lang: string
  label: string
}

export default function DownloadButton({ slug, lang, label }: DownloadButtonProps) {
  const filePath = `/docs/cv-${slug}-${lang}.pdf`

  return (
    <motion.a
      href={filePath}
      download
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 font-mono relative overflow-hidden"
    >
      <FileDown className="w-5 h-5 text-cyan-400 relative z-10 group-hover:translate-y-1 transition-transform" strokeWidth={1.5} />
      <span className="text-white font-semibold relative z-10">
        {label}
      </span>
    </motion.a>
  )
}

