# MaBaconsulting Website

Sito istituzionale per consulenza specialistica nel settore **Aerospazio e Difesa**.

## 📋 Descrizione

MaBaconsulting è una piattaforma web moderna e professionale che presenta i servizi di consulenza specializzata nel settore Aerospazio e Difesa. Il sito offre un'esperienza utente fluida con supporto multilingue (Italiano e Inglese) e un design moderno caratterizzato da effetti glassmorphism e animazioni eleganti.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Linguaggio:** TypeScript
- **Styling:** Tailwind CSS
- **Animazioni:** Framer Motion
- **Icons:** Lucide React
- **Font:** Google Fonts (Space Grotesk, Roboto Mono)

## 📁 Struttura del Progetto

```
mabaconsulting1/
├── app/
│   ├── [lang]/              # Route dinamiche per lingue (it, en)
│   │   ├── layout.tsx       # Layout per pagine localizzate
│   │   └── page.tsx         # Homepage principale
│   ├── globals.css          # Stili globali e configurazione Tailwind
│   ├── layout.tsx           # Root layout con metadata SEO
│   └── page.tsx             # Redirect alla lingua di default
├── components/
│   ├── Navbar.tsx           # Barra di navigazione con menu e language switcher
│   ├── Hero.tsx             # Sezione hero con animazioni
│   ├── AboutSection.tsx     # Sezione "Chi Siamo" (#about)
│   ├── ServicesSection.tsx  # Sezione "Servizi" (#services)
│   ├── TeamSection.tsx      # Sezione "Team" (#team)
│   ├── ContactSection.tsx   # Sezione "Contatti" (#contact)
│   ├── FeatureCard.tsx      # Componente card riutilizzabile
│   ├── FeatureGrid.tsx      # Griglia di feature
│   ├── StatsSection.tsx     # Sezione statistiche
│   ├── Footer.tsx           # Footer del sito
│   └── LanguageSwitcher.tsx # Selettore lingua
├── contexts/
│   └── I18nContext.tsx      # Context per internazionalizzazione
├── dictionaries/
│   ├── it.json              # Traduzioni italiano
│   └── en.json              # Traduzioni inglese
├── lib/
│   └── i18n.ts              # Utility per gestione i18n
├── tailwind.config.ts       # Configurazione Tailwind CSS
├── next.config.js           # Configurazione Next.js
├── tsconfig.json            # Configurazione TypeScript
└── package.json             # Dipendenze e script del progetto
```

## 🎯 Sezioni del Sito

- **Home**: Hero section con call-to-action
- **Chi Siamo** (`#about`): Presentazione aziendale e statistiche
- **Servizi** (`#services`): Descrizione dei servizi offerti
- **Team** (`#team`): Presentazione del team
- **Contatti** (`#contact`): Informazioni di contatto

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installato
- npm, yarn o pnpm come package manager

### Installazione

1. Clona il repository:
```bash
git clone <repository-url>
cd mabaconsulting1
```

2. Installa le dipendenze:
```bash
npm install
# oppure
yarn install
# oppure
pnpm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
# oppure
yarn dev
# oppure
pnpm dev
```

4. Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 📦 Build per Produzione

```bash
npm run build
npm start
```

## 🌍 Internazionalizzazione

Il sito supporta due lingue:
- **Italiano (it)** - Lingua di default
- **Inglese (en)** - Lingua secondaria

Le traduzioni sono gestite tramite file JSON in `dictionaries/`. Il language switcher è disponibile nella navbar.

## 🔗 Link e Navigazione

Tutti i link di navigazione utilizzano anchor links per lo scroll fluido:
- `#about` - Sezione Chi Siamo
- `#services` - Sezione Servizi
- `#team` - Sezione Team
- `#contact` - Sezione Contatti

## 📝 Note per il Deployment

Il progetto è configurato per essere deployato su **Vercel** con supporto completo per:
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)

## 📄 Licenza

Proprietario: MaBaconsulting

---

**Sviluppato con** ❤️ **usando Next.js e TypeScript**
