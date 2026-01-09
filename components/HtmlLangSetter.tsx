'use client'

import { useEffect } from 'react'
import { Locale } from '@/lib/i18n'

export default function HtmlLangSetter({ lang }: { lang: Locale }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  return null
}

