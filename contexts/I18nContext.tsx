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

  // Mapping degli ID servizi tra italiano e inglese
  const serviceIdMap: Record<string, Record<Locale, string>> = {
    'supporto-su-misura': { it: 'supporto-su-misura', en: 'tailored-support' },
    'tailored-support': { it: 'supporto-su-misura', en: 'tailored-support' },
    'supporto-tecnico': { it: 'supporto-tecnico', en: 'technical-support' },
    'technical-support': { it: 'supporto-tecnico', en: 'technical-support' },
    'supporto-gestionale-organizzativo': { it: 'supporto-gestionale-organizzativo', en: 'management-organizational-support' },
    'management-organizational-support': { it: 'supporto-gestionale-organizzativo', en: 'management-organizational-support' },
    'supporto-commerciale-marketing': { it: 'supporto-commerciale-marketing', en: 'commercial-marketing-support' },
    'commercial-marketing-support': { it: 'supporto-commerciale-marketing', en: 'commercial-marketing-support' },
    'supporto-formativo': { it: 'supporto-formativo', en: 'training-support' },
    'training-support': { it: 'supporto-formativo', en: 'training-support' },
  }

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    // Navigate to new locale route
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const pathParts = currentPath.split('/').filter(Boolean)
      
      // Se siamo su una pagina servizio (/[lang]/services/[id])
      if (pathParts.length >= 3 && pathParts[1] === 'services' && pathParts[2]) {
        const currentServiceId = pathParts[2]
        const translatedServiceId = serviceIdMap[currentServiceId]?.[newLocale] || currentServiceId
        window.location.href = `/${newLocale}/services/${translatedServiceId}`
      } else {
        // Per altre pagine, mantieni il percorso originale
        window.location.href = `/${newLocale}${currentPath.slice(3)}`
      }
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

