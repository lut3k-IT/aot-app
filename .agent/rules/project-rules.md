---
trigger: always_on
---

## Project Overview

This is a React application built with Vite, TypeScript, and Tailwind CSS. It focuses on the Attack on Titan (AOT) theme.

## Technology Stack

- **Core**: React 18, Vite.
- **Language**: TypeScript (`strict` mode).
- **Styling**: Tailwind CSS, PostCSS.
- **UI Architecture**: "Shadcn-like"
  - **Primitives**: Radix UI.
  - **Utilities**: `class-variance-authority` (cva), `tailwind-merge`, `clsx`.
  - **Icons**: `lucide-react`.
- **State Management**: Redux Toolkit (slices in `src/store`).
- **Routing**: React Router DOM v6.
- **Forms**: React Hook Form with `@hookform/resolvers`.
- **Internationalization**: `i18next`, `react-i18next`.

## Architectural Patterns

- **Directory Structure**:
  - `src/components/ui`: Shared, generic atomic components (e.g., Button, Input).
  - `src/features`: Domain-specific features (e.g., `Heroes`, `Quiz`). Feature folders are Capitalized.
  - `src/store`: Redux setup.
  - `src/lib`: Core utilities (specifically `utils.ts` for strictly formatting classes).
  - `src/constants`: Application constants and enums.
  - `src/i18n`: Internationalization configuration.

## Coding Conventions

1.  **Strict TypeScript**:
    - Avoid `any`.
    - Define interfaces/types for all props and state.
    - Export interfaces from their respective component files or dedicated types files.
2.  **Component Definitions**:
    - Use Functional Components: `const ComponentName = () => { ... }`.
    - Place generic UI components in `src/components/ui`.
    - Place feature-specific components in `src/features/[FeatureName]`.
    - Use PascalCase for component filenames and directories.
3.  **Styling**:
    - **ALWAYS** use the `cn()` helper from `@/lib/utils` to merge Tailwind classes: `className={cn("base-class", className)}`.
    - Define variants using `cva` for reusable components.
    - Follow Mobile-First approach for responsive design.
4.  **Imports**:
    - Use absolute imports with `@/` matching `src/` (e.g., `@/components/ui/button`).
    - Order: React/External Libs -> Internal Absolute (`@/...`) -> Internal Relative (`./`).
5.  **State & Logic**:
    - Prefer local state (`useState`) for UI-only logic.
    - Use Redux for global application state.
    - Extract complex logic into custom hooks in `src/features/[Feature]/hooks` or `src/hooks`.
6.  **Internationalization**:
    - **Never** hardcode text. Use `useTranslation` hook.
    - Keys should be organized in `src/i18n`.
7.  **No Testing**:
    - **Do not write tests.** This project deliberately excludes testing.

## Common Tasks Reference

- **Adding a generic component**: Check `src/components/ui` first. If creating new, follow the shadcn pattern (`cva` + `forwardRef`).
- **Adding a feature**: Create a new folder in `src/features` (e.g., `src/features/NewFeature`).