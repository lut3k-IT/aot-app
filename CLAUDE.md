# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AOT-APP is an Attack on Titan fan web application (Next.js 15 / React 19 / TypeScript). It features a character gallery with filtering, character comparison, quiz, quotations, charts, and MBTI personality data. All data is static (no backend API) — loaded from `src/data/` files and persisted to localStorage via Redux.

Live: https://aot.kacperlutynski.pl

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

No test runner is configured.

## Architecture

### Routing (Next.js App Router)

Routes live in `app/`. The main app shell is under `app/app/` with a `(heroes)` route group sharing a tabbed layout for heroes/charts/comparison. Dynamic routes use `[slug]` and `[id]` segments.

Key routes: `/app/heroes`, `/app/hero/[slug]`, `/app/titans`, `/app/titan/[slug]`, `/app/quotations`, `/app/quotation/[id]`, `/app/quiz`, `/app/comparison`, `/app/charts`. All route paths are defined in `src/constants/enums.ts` (`RoutePath` enum).

### State Management (Redux Toolkit)

Store in `src/store/` with four slices: `heroesSlice`, `titansSlice`, `quotationsSlice`, `spoilerModeSlice`. Each entity slice holds `data`, `favoriteIds`, `status`, and `error`. State hydrates from and persists to localStorage via subscribers in `src/store/index.ts`.

Use typed hooks: `useAppDispatch()` and `useAppSelector()` from `src/components/hooks/`.

### Data Layer

Static data in `src/data/` (heroes, titans, quotations, mbti, species, statuses, residences, allegiances). No API calls — data is loaded via async thunks that import from these files.

### Component Organization

- `src/features/` — Feature modules (Heroes, Details, Quotations, Quiz, Comparison, TitansGallery, Aside, ErrorBoundaries). Each can have its own `components/` and `utils/`.
- `src/components/ui/` — Shared UI components (Button, Tabs, Skeleton, HeroCard, TitanCard, QuotationBar, PageOverlay, etc.). Built on Radix UI / shadcn/ui.
- `src/components/hooks/` — Custom hooks (useToggleFavorite, useBestScore, useToast, useIsMobileOrLandscape, useValidateIdFromParam, etc.).
- `src/components/providers/` — Providers.tsx (Redux + i18next + Theme), Init.tsx (data loading + splash screen).

### Styling

Tailwind CSS 3 with custom theme using HSL CSS variables for light/dark mode (class strategy). ThemeProvider in `src/components/ui/ThemeProvider.tsx`. Global styles in `src/index.css` with utility classes. shadcn/ui config in `components.json`.

Use `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) for className merging.

### i18n

i18next with react-i18next. Two languages: English (`en`) and Polish (`pl`, fallback). Translations in `src/i18n/locales/{lang}/`. Namespaced: common, comparison, quiz, quotations, howToUse, charts, notifications, data, landing.

Usage: `const { t } = useTranslation('namespace')`.

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Code Conventions

### Naming (enforced by ESLint)

- **camelCase**: variables, functions, parameters
- **PascalCase**: components, types, interfaces
- **UPPER_CASE**: constants, enum members
- **Boolean prefix required**: `is`, `should`, `has`, `can`, `did`, `will`, `match`

### Formatting (Prettier)

Single quotes, JSX single quotes, no trailing commas, 120 char width, one attribute per line, Tailwind class sorting.

### Imports

Sorted by `simple-import-sort` plugin. Order: node builtins → react/third-party → aliases → side effects → relative → styles → images.

### Other Rules

- `@typescript-eslint/no-explicit-any`: error
- SVGs imported as React components via `@svgr/webpack`
- PWA enabled in production (disabled in dev)
