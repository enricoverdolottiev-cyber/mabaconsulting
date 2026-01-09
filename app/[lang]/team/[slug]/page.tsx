import { Locale, getDictionary } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { I18nProvider } from '@/contexts/I18nContext'
import TeamDetailContent from '@/components/TeamDetailContent'

export const dynamicParams = false

// Mapping degli slug team tra italiano e inglese
const teamSlugMap: Record<string, Record<Locale, string>> = {
  'mauro-balduccini': { it: 'mauro-balduccini', en: 'mauro-balduccini' },
  'livia-balduccini': { it: 'livia-balduccini', en: 'livia-balduccini' },
}

export function generateStaticParams() {
  const params: Array<{ lang: Locale; slug: string }> = []
  
  // Genera parametri per ogni lingua e ogni membro del team
  ;['it', 'en'].forEach((lang) => {
    params.push({ lang: lang as Locale, slug: 'mauro-balduccini' })
    params.push({ lang: lang as Locale, slug: 'livia-balduccini' })
  })
  
  return params
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params

  if (!['it', 'en'].includes(lang)) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const teamMembers = dictionary.team_members as unknown as Record<string, {
    bio_title?: string
    bio_content?: string
    cv_button_label?: string
    cv_file_path?: string
  }>
  
  // Verifica se esiste la struttura dettagliata per Mauro o Livia nella sezione team
  const teamData = dictionary.team as {
    mauro?: {
      name: string
      role: string
      description: string
      personal_data?: {
        birth: string
        family: string
        education: string
        membership: string
      }
      cv_pdf_label?: string
      sections?: {
        experience: string
        academic: string
        highlights: string
      }
      full_timeline?: Array<{ period: string; title: string; points: string[] }>
      academic_extended?: {
        title: string
        items: string[]
      }
      highlights?: string[]
    }
    livia?: {
      name: string
      role: string
      description: string
      personal_data?: {
        education: string
        thesis: string
        languages: string
      }
      skills?: string[]
      experience_timeline?: Array<{ period: string; title: string; role: string; text: string }>
      projects?: Array<{ title: string; description: string }>
      sections?: {
        experience: string
        skills: string
        projects: string
      }
      cv_pdf_label?: string
    }
  }
  
  // Se è Mauro e ha la struttura dettagliata, usa quella
  const teamMauro = slug === 'mauro-balduccini' && teamData.mauro && teamData.mauro.full_timeline
    ? {
        name: teamData.mauro.name,
        role: teamData.mauro.role,
        personal_data: teamData.mauro.personal_data || {
          birth: '',
          family: '',
          education: '',
          membership: '',
        },
        cv_pdf_label: teamData.mauro.cv_pdf_label || '',
        sections: teamData.mauro.sections || {
          experience: '',
          academic: '',
          highlights: '',
        },
        full_timeline: teamData.mauro.full_timeline || [],
        academic_extended: teamData.mauro.academic_extended || {
          title: '',
          items: [],
        },
        highlights: teamData.mauro.highlights || [],
      }
    : undefined

  // Se è Livia e ha la struttura dettagliata, usa quella
  const teamLivia = slug === 'livia-balduccini' && teamData.livia && teamData.livia.experience_timeline
    ? {
        name: teamData.livia.name,
        role: teamData.livia.role,
        personal_data: teamData.livia.personal_data || {
          education: '',
          thesis: '',
          languages: '',
        },
        skills: teamData.livia.skills || [],
        experience_timeline: teamData.livia.experience_timeline || [],
        projects: teamData.livia.projects || [],
        sections: teamData.livia.sections || {
          experience: '',
          skills: '',
          projects: '',
        },
        cv_pdf_label: teamData.livia.cv_pdf_label || '',
      }
    : undefined
  
  // Trova il membro del team corrispondente allo slug (escludendo backToTeam)
  let memberData = teamMembers[slug] && slug !== 'backToTeam' ? teamMembers[slug] : undefined
  
  // Se non trovato, prova a tradurre lo slug
  if (!memberData) {
    const mappedSlug = teamSlugMap[slug]?.[lang]
    if (mappedSlug && mappedSlug !== 'backToTeam') {
      memberData = teamMembers[mappedSlug]
    }
  }
  
  // Verifica che memberData abbia la struttura corretta
  if (!memberData || !memberData.bio_title || !memberData.cv_button_label) {
    notFound()
  }

  let memberInfo: { name: string; role: string } | null = null
  if (slug === 'mauro-balduccini' && teamData.mauro) {
    memberInfo = { name: teamData.mauro.name, role: teamData.mauro.role }
  } else if (slug === 'livia-balduccini' && teamData.livia) {
    memberInfo = { name: teamData.livia.name, role: teamData.livia.role }
  }

  if (!memberInfo) {
    notFound()
  }

  return (
    <I18nProvider initialLocale={lang}>
      <Navbar />
      <TeamDetailContent
        lang={lang}
        slug={slug}
        memberInfo={memberInfo}
        memberData={memberData as any}
        teamMauro={teamMauro}
        teamLivia={teamLivia}
        backToTeam={dictionary.team_members.backToTeam as string}
      />
      <Footer />
    </I18nProvider>
  )
}

