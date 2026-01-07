# Context Snapshot - MaBaconsulting Website

**Generated:** 2024  
**Purpose:** Technical and structural documentation for LLM handoff and development continuity

---

## 1. Project Overview & Stack

### Project Identity
- **Name:** MaBaconsulting (mabaconsulting)
- **Version:** 0.1.0
- **Purpose:** Corporate website for specialized consulting in Aerospace & Defense sector
- **Type:** Marketing/Institutional website with multilingual support

### Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 14.2.0 | React framework with App Router |
| **Language** | TypeScript | 5.3.3 | Type-safe JavaScript |
| **UI Library** | React | 18.3.0 | Component library |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **Animations** | Framer Motion | 11.0.0 | Animation library |
| **Icons** | Lucide React | 0.344.0 | Icon component library |
| **Fonts** | Google Fonts | - | Space Grotesk (primary), Roboto Mono (mono) |
| **Build Tool** | Next.js Built-in | - | Webpack/Turbopack |
| **Package Manager** | npm | - | Dependency management |

### Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `package.json` | Dependencies & scripts | Next.js 14, React 18, Framer Motion, Lucide |
| `next.config.js` | Next.js configuration | `reactStrictMode: true` |
| `tsconfig.json` | TypeScript config | Path aliases `@/*`, strict mode enabled |
| `tailwind.config.ts` | Tailwind customization | Custom colors (primary, background, text), fonts, shadows |
| `postcss.config.js` | PostCSS processing | Autoprefixer integration |

### Key Dependencies

**Production:**
- `next@^14.2.0` - Core framework
- `react@^18.3.0` & `react-dom@^18.3.0` - UI library
- `framer-motion@^11.0.0` - Animations
- `lucide-react@^0.344.0` - Icons

**Development:**
- `typescript@^5.3.3` - Type checking
- `tailwindcss@^3.4.1` - Styling
- `@types/*` - Type definitions

---

## 2. Directory Structure & Architecture

### Directory Tree

```
mabaconsulting1/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Dynamic route for locales (it, en)
│   │   ├── layout.tsx            # Language-specific layout wrapper
│   │   └── page.tsx              # Main homepage (Server Component)
│   ├── layout.tsx                # Root layout (fonts, metadata, HTML structure)
│   ├── page.tsx                  # Root redirect to /it
│   └── globals.css               # Global styles, Tailwind directives, utilities
│
├── components/                   # React components (Client Components)
│   ├── Navbar.tsx                # Fixed navigation with scroll detection
│   ├── Hero.tsx                  # Hero section with animated background
│   ├── AboutSection.tsx          # About section (#about)
│   ├── ServicesSection.tsx       # Services grid (#services)
│   ├── TeamSection.tsx           # Team members (#team)
│   ├── ContactSection.tsx        # Contact info (#contact)
│   ├── FeatureGrid.tsx           # Feature cards grid
│   ├── FeatureCard.tsx           # Reusable feature card component
│   ├── StatsSection.tsx          # Animated statistics counter
│   ├── Footer.tsx                # Site footer with links
│   └── LanguageSwitcher.tsx      # Language dropdown selector
│
├── contexts/                     # React Context providers
│   └── I18nContext.tsx           # Internationalization context (Client Component)
│
├── dictionaries/                 # Translation files (JSON)
│   ├── it.json                   # Italian translations
│   └── en.json                   # English translations
│
├── lib/                          # Utility functions
│   └── i18n.ts                   # i18n helper functions (getDictionary, Locale types)
│
└── [config files]                # Configuration files (see above)
```

### Architecture Pattern

**Pattern:** **Component-Based Architecture with App Router (Next.js 14)**

- **Server Components by default** (`app/[lang]/page.tsx`)
- **Client Components** where needed (`'use client'` directive)
- **Context API** for client-side state (i18n)
- **File-based routing** via App Router
- **Static generation** with dynamic routes (`generateStaticParams`)

### Core Folders

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `app/` | Next.js App Router routes | `[lang]/page.tsx` (main entry), `layout.tsx` (root) |
| `components/` | Reusable UI components | All `*.tsx` files (Client Components) |
| `contexts/` | React Context providers | `I18nContext.tsx` |
| `dictionaries/` | i18n translation data | `it.json`, `en.json` |
| `lib/` | Utility functions | `i18n.ts` |

### Routing Strategy

- **Root (`/`)**: Redirects to `/it` (default locale)
- **Language routes (`/[lang]`)**: Dynamic route for `it` and `en`
- **Static generation**: Both locales pre-rendered at build time
- **Anchor navigation**: Smooth scroll to sections (`#about`, `#services`, `#team`, `#contact`)

---

## 3. Data Flow & State Management

### State Management Approach

**Primary Method:** React Context API (Client-Side)

- **Context:** `I18nContext` (`contexts/I18nContext.tsx`)
- **Provider:** `I18nProvider` wraps the entire app
- **Hook:** `useI18n()` for accessing locale and dictionary
- **Persistence:** `localStorage` for locale preference

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Server Component (app/[lang]/page.tsx)                 │
│  - Receives locale from URL params                     │
│  - Passes initialLocale to I18nProvider                │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  I18nProvider (Client Component)                       │
│  - Manages locale state                                 │
│  - Loads dictionary from lib/i18n.ts                    │
│  - Syncs with localStorage                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Client Components (Navbar, Hero, etc.)                 │
│  - Use useI18n() hook                                  │
│  - Access dictionary.hero.title, etc.                  │
│  - Update locale via setLocale()                       │
└─────────────────────────────────────────────────────────┘
```

### Internationalization (i18n)

**Implementation:**
- **Type-safe:** `Locale` type (`'it' | 'en'`)
- **Dictionary loading:** `getDictionary(locale)` from `lib/i18n.ts`
- **Translation files:** JSON structure in `dictionaries/`
- **URL-based routing:** `/it` and `/en` routes
- **Client-side switching:** `setLocale()` triggers navigation to new route

**Dictionary Structure:**
```typescript
{
  nav: { services, aboutUs, team, contact },
  hero: { title, subtitle, ctaPrimary, ctaSecondary },
  features: { title, subtitle, managementConsulting, ... },
  about: { title, subtitle, description, stats },
  services: { title, subtitle, strategicConsulting, ... },
  team: { title, subtitle, mauro, livia },
  contact: { title, subtitle, form, info },
  footer: { tagline, links, ... }
}
```

### External Data Sources

**None currently.** All content is:
- Static (hardcoded in components)
- Translated via JSON dictionaries
- No API calls, no database, no CMS

### Form Handling

**Contact Section:**
- **No form submission** implemented
- Only displays contact info (email, location)
- Email copy-to-clipboard functionality
- No backend integration

---

## 4. Feature Status

### ✅ Fully Implemented Features

| Feature | Component | Status | Notes |
|---------|-----------|--------|-------|
| **Multilingual Support** | `I18nContext`, `LanguageSwitcher` | ✅ Complete | Italian (default) & English |
| **Responsive Navigation** | `Navbar` | ✅ Complete | Desktop + mobile menu, scroll detection |
| **Hero Section** | `Hero` | ✅ Complete | Animated background, particles, gradient text |
| **About Section** | `AboutSection` | ✅ Complete | Stats display (35+ years, 50+ projects, 100+ clients) |
| **Services Section** | `ServicesSection` | ✅ Complete | 4 service cards with icons |
| **Team Section** | `TeamSection` | ✅ Complete | 2 team members (Mauro, Livia) |
| **Contact Section** | `ContactSection` | ✅ Complete | Email copy, location display |
| **Feature Grid** | `FeatureGrid` | ✅ Complete | 4 feature cards (methodology) |
| **Stats Section** | `StatsSection` | ✅ Complete | Animated counters (99.9%, 500+, 50+, 1000+) |
| **Footer** | `Footer` | ✅ Complete | Links, tagline, legal links |
| **Smooth Scrolling** | `Navbar` | ✅ Complete | Anchor links with offset |
| **Active Section Detection** | `Navbar` | ✅ Complete | Intersection Observer API |
| **Animations** | All components | ✅ Complete | Framer Motion throughout |
| **Glassmorphism UI** | Global CSS | ✅ Complete | `.glass` utility class |
| **Gradient Text** | Global CSS | ✅ Complete | `.gradient-text` utility |

### ⚠️ Partially Implemented / Placeholder Features

| Feature | Component | Status | Notes |
|---------|-----------|--------|-------|
| **Contact Form** | `ContactSection` | ❌ Missing | Only displays info, no form submission |
| **Footer Links** | `Footer` | ⚠️ Placeholder | All links point to `#` (not implemented) |
| **Newsletter** | `Footer` | ⚠️ Placeholder | UI exists in dictionary, not rendered |
| **Dropdown Menus** | `Navbar` | ⚠️ Placeholder | Dropdown structure exists but no content |
| **Stats Values** | `StatsSection` | ⚠️ Hardcoded | Values (99.9%, 500+, etc.) are hardcoded, not from dictionary |

### ❌ Missing Features (Not Implemented)

| Feature | Expected Location | Priority | Notes |
|---------|-------------------|----------|-------|
| **Contact Form Backend** | `ContactSection` | High | No form submission handler |
| **SEO Metadata** | `app/[lang]/layout.tsx` | Medium | Basic metadata exists, could be enhanced |
| **Analytics** | Global | Low | No Google Analytics or similar |
| **Error Pages** | `app/` | Low | No custom 404/500 pages |
| **Loading States** | Global | Low | No loading.tsx files |
| **Blog/News Section** | New route | Low | Referenced in footer but not implemented |
| **Case Studies** | New route | Low | Referenced in footer but not implemented |
| **Privacy Policy** | New route | Low | Link exists but no page |
| **Terms of Service** | New route | Low | Link exists but no page |
| **Cookie Policy** | New route | Low | Link exists but no page |

### 🔧 Technical Debt / Known Issues

1. **Scroll Indicator Removed:** Hero section scroll indicator was recently removed (as per user request)
2. **Empty Dictionary Keys:** Some feature keys in dictionaries have empty strings (`innovationLabs`, `securityCompliance`)
3. **Hardcoded Stats:** Statistics values are hardcoded in `StatsSection.tsx` instead of using dictionary
4. **No Error Boundaries:** No React error boundaries implemented
5. **No Loading States:** No loading.tsx or Suspense boundaries for async operations
6. **Type Safety:** Some dictionary access uses `as` assertions (could be improved with better typing)

---

## 5. Coding Conventions & Style

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Components** | PascalCase | `Hero.tsx`, `Navbar.tsx` |
| **Files** | PascalCase for components | `FeatureCard.tsx` |
| **Functions** | camelCase | `getDictionary()`, `copyEmail()` |
| **Variables** | camelCase | `activeSection`, `mobileMenuOpen` |
| **Types/Interfaces** | PascalCase | `Locale`, `I18nContextType` |
| **Constants** | camelCase or UPPER_CASE | `defaultLocale`, `locales` |
| **CSS Classes** | Tailwind utilities | `text-white`, `bg-primary` |
| **Custom CSS Classes** | kebab-case | `.gradient-text`, `.glass` |

### Component Patterns

**1. Client Components Pattern:**
```typescript
'use client'
import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function ComponentName() {
  const { dictionary } = useI18n()
  // Component logic
}
```

**2. Server Components Pattern:**
```typescript
import { Locale } from '@/lib/i18n'
import Component from '@/components/Component'

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // Server-side logic
}
```

**3. Animation Pattern:**
- Consistent use of `framer-motion` for all animations
- `whileInView` for scroll-triggered animations
- `viewport={{ once: true }}` to prevent re-animation
- Staggered delays: `delay: index * 0.1`

### Styling Approach

**Tailwind CSS Utility-First:**
- No custom CSS files (except `globals.css` for utilities)
- Custom utilities: `.glass`, `.gradient-text`, `.gradient-border`
- Custom theme colors: `primary`, `primary-cyan`, `background`, `text-primary`, `text-secondary`
- Custom fonts: `font-sans` (Space Grotesk), `font-mono` (Roboto Mono)

**Design System:**
- **Colors:** Dark theme (black background `#000000`)
- **Primary:** Blue (`#0070FF`) to Cyan (`#00D9FF`) gradient
- **Text:** White primary, gray secondary (`#A1A1AA`)
- **Effects:** Glassmorphism (backdrop blur, transparency)
- **Shadows:** Custom glow effects (`glow-blue`, `glow-cyan`, `glow-purple`)

### Code Organization

**Component Structure:**
1. Imports (external, then internal)
2. Type definitions (if any)
3. Component function
4. Hooks (useState, useEffect, etc.)
5. Event handlers
6. Render/return

**File Organization:**
- One component per file
- Co-located types with components (when simple)
- Shared types in separate files (when reused)

### Libraries & Patterns

| Library | Usage Pattern |
|---------|---------------|
| **Framer Motion** | `motion.div`, `motion.h1`, etc. for all animated elements |
| **Lucide React** | Icon components imported as React components |
| **Next.js App Router** | Server Components by default, `'use client'` when needed |
| **TypeScript** | Strict mode enabled, path aliases (`@/*`) |

---

## 6. Entry Points & Critical Files

### Must-Read Files for New Developers

| File | Purpose | Why Critical |
|------|---------|--------------|
| `app/[lang]/page.tsx` | Main homepage | Entry point, shows component composition |
| `app/layout.tsx` | Root layout | Fonts, metadata, HTML structure |
| `contexts/I18nContext.tsx` | i18n provider | Understanding state management |
| `lib/i18n.ts` | i18n utilities | How translations work |
| `dictionaries/it.json` | Italian translations | Content structure |
| `components/Navbar.tsx` | Navigation | Complex component with scroll detection |
| `components/Hero.tsx` | Hero section | Animation patterns, background effects |
| `app/globals.css` | Global styles | Custom utilities, design system |
| `tailwind.config.ts` | Tailwind config | Custom theme, colors, fonts |

### File Dependencies Map

```
app/layout.tsx
  └── app/globals.css
  └── Google Fonts (Space Grotesk, Roboto Mono)

app/[lang]/page.tsx
  ├── contexts/I18nContext.tsx
  │     └── lib/i18n.ts
  │           └── dictionaries/*.json
  ├── components/Navbar.tsx
  │     └── components/LanguageSwitcher.tsx
  │           └── contexts/I18nContext.tsx
  ├── components/Hero.tsx
  │     └── contexts/I18nContext.tsx
  ├── components/AboutSection.tsx
  ├── components/FeatureGrid.tsx
  │     └── components/FeatureCard.tsx
  ├── components/ServicesSection.tsx
  ├── components/TeamSection.tsx
  ├── components/ContactSection.tsx
  └── components/Footer.tsx
```

### Build & Development Workflow

**Development:**
```bash
npm run dev    # Starts Next.js dev server (localhost:3000)
```

**Build:**
```bash
npm run build  # Creates production build
npm start      # Starts production server
```

**Linting:**
```bash
npm run lint   # Runs ESLint (Next.js default)
```

### Deployment

**Target Platform:** Vercel (recommended)

**Configuration:**
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Static Generation: Enabled via `generateStaticParams`

**Environment Variables:** None required

---

## 7. Additional Technical Notes

### Performance Considerations

- **Static Generation:** Both locales (`it`, `en`) are pre-rendered at build time
- **Client Components:** Used only where necessary (animations, interactivity)
- **Image Optimization:** Not currently used (no images in project)
- **Font Optimization:** Google Fonts loaded via `next/font/google` (optimized)

### Browser Support

- Modern browsers (ES2017+ target)
- CSS features: backdrop-filter, CSS Grid, Flexbox
- JavaScript: Intersection Observer API, Clipboard API

### Accessibility

- **Semantic HTML:** Proper use of `<section>`, `<nav>`, `<footer>`
- **ARIA Labels:** Limited (mobile menu button has `aria-label`)
- **Keyboard Navigation:** Basic support (not fully tested)
- **Color Contrast:** High contrast (white on black)

### Security

- **No user input:** No forms, no XSS risks
- **No authentication:** Public website
- **No API calls:** No external data fetching
- **Dependencies:** Regularly updated via npm

---

## 8. Quick Reference

### Common Tasks

**Add a new language:**
1. Add locale to `lib/i18n.ts` (`Locale` type, `dictionaries` object)
2. Create `dictionaries/[locale].json`
3. Update `generateStaticParams()` in `app/[lang]/layout.tsx`
4. Add to `LanguageSwitcher` languages array

**Add a new section:**
1. Create component in `components/`
2. Add section ID (e.g., `id="newSection"`)
3. Import and add to `app/[lang]/page.tsx`
4. Add navigation item in `Navbar.tsx`
5. Add translations to dictionaries

**Modify styling:**
1. Use Tailwind utilities (preferred)
2. Add custom utility to `app/globals.css` if needed
3. Update `tailwind.config.ts` for theme changes

**Update content:**
1. Edit `dictionaries/it.json` and `dictionaries/en.json`
2. No code changes needed (content is data-driven)

---

**End of Context Snapshot**

