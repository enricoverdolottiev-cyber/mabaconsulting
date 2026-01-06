import it from '@/dictionaries/it.json'
import en from '@/dictionaries/en.json'

export type Locale = 'it' | 'en'

export const dictionaries = {
  it,
  en,
} as const

export const getDictionary = (locale: Locale = 'it') => {
  return dictionaries[locale]
}

export const defaultLocale: Locale = 'it'
export const locales: Locale[] = ['it', 'en']

