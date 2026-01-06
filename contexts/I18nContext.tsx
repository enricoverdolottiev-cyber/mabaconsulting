'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, getDictionary, defaultLocale } from '@/lib/i18n'

type Dictionary = ReturnType<typeof getDictionary>

interface I18nContextType {
  locale: Locale
  dictionary: Dictionary
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ 
  children, 
  initialLocale 
}: { 
  children: ReactNode
  initialLocale?: Locale 
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (initialLocale) {
      setLocaleState(initialLocale)
    } else {
      // Try to get locale from localStorage
      const savedLocale = localStorage.getItem('locale') as Locale | null
      if (savedLocale && (savedLocale === 'it' || savedLocale === 'en')) {
        setLocaleState(savedLocale)
      }
    }
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    // Navigate to new locale route
    if (typeof window !== 'undefined') {
      window.location.href = `/${newLocale}${window.location.pathname.slice(3)}`
    }
  }

  const dictionary = getDictionary(locale)

  if (!mounted) {
    // Return default locale during SSR
    return (
      <I18nContext.Provider
        value={{
          locale: defaultLocale,
          dictionary: getDictionary(defaultLocale),
          setLocale,
        }}
      >
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

