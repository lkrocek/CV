# Interactive CV

A personal CV built as a single-page React application — fully interactive, bilingual, and exportable to PDF.

**Live:** [krocek.cz](https://krocek.cz) &nbsp;·&nbsp; **Storybook:** [krocek.cz/storybook](https://krocek.cz/storybook)

---

## Features

- **Bilingual** — Czech / English toggle, persisted across sessions
- **Dark & light theme** — persisted across sessions
- **PDF export** — client-side, generated via `@react-pdf/renderer`
- **Technology Explorer** — interactive skill timeline computed in a Web Worker
- **Hash-based navigation** — `#experience`, `#skills?tech=React`, etc. are shareable URLs
- **Animated splash screen** — minimum 1.8 s display while data and workers initialize
- **Storybook** — component documentation with accessibility checks

## Tech stack

| Layer | Library |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| PDF | @react-pdf/renderer 4 |
| Testing | Vitest + Playwright |
| Docs | Storybook 10 |

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build → `dist/` |
| `npm run build:all` | Build Storybook + production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run storybook` | Storybook dev server on port 6006 |

## Data

CV content is loaded at runtime from `/public/`:

| File | Content |
|---|---|
| `history.json` | Companies, roles, projects (i18n) |
| `skills.json` | Hierarchical skill tree |
| `photo.json` | Profile photo reference |

All text fields support bilingual values via `{ en: string; cs: string }` or a plain `string`.

## Project structure

```
├── components/
│   ├── CVPreview.tsx          # Top-level layout
│   ├── pdf/CvPdfDocument.tsx  # PDF-specific layout
│   └── profile/               # All profile sections and UI components
├── hooks/
│   ├── useCvData.ts           # CV data loading and state
│   └── useTechnologyInsights.ts  # Web Worker bridge
├── workers/insightsWorker.ts  # Insight computation off the main thread
├── public/                    # CV data JSON + assets
└── constants.ts               # Fallback sample data
```
