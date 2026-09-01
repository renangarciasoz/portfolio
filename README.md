# Renan Garcia — Portfolio

A fast, accessible and fully bilingual (EN / PT-BR) personal portfolio, with a
dynamic PDF résumé generator.

## Tech stack

- **Next.js 15** (Pages Router) + **React 19** + **TypeScript**
- **Material UI 7** + **Emotion** (premium minimalist theme, light/dark)
- **next-i18next** for internationalization
- **@react-pdf/renderer** for on-the-fly résumé (CV) generation
- Deployed on **Vercel**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build and run in production:

```bash
npm run build
npm start
```

## Project structure

```
public/
  images/            # profile photo + PWA icons
  locales/{en,pt-BR} # translation files (common.json)
src/
  components/        # UI (layout, home sections, résumé)
  configs/           # MUI theme + emotion cache
  contexts/          # theme (light/dark) provider
  constants/         # locale + namespace constants
  data/profile.ts    # structured, language-agnostic data (links, dates, skills)
  utils/jobs.ts      # career date helpers (locale-aware)
```

## Editing content

- **Text** (per language) lives in `public/locales/{en,pt-BR}/common.json`.
- **Structured data** (contact, socials, job dates, skills, projects,
  education) lives in `src/data/profile.ts`. Items are matched to the
  translated text by a stable `id`. Fields marked `TODO` are placeholders.
- **Photo**: drop a file in `public/images/` and update `PROFILE_IMAGE`.
- **Résumé (PDF)**: generated from the same data — no separate file to maintain.
