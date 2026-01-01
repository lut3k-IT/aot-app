---
title: Project Rules & Tech Stack
---

## Project Overview
This is a React application built with Vite, TypeScript, and Tailwind CSS. It focuses on the Attack on Titan (AOT) theme.

## Technology Stack
- **Core**: React 18, Vite.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS, PostCSS.
- **UI Library**: Radix UI primitives, `class-variance-authority` (cva), `tailwind-merge`, `clsx` (Shadcn-like architecture).
- **State Management**: Redux Toolkit.
- **Routing**: React Router DOM v6.
- **Forms**: React Hook Form, `@hookform/resolvers`.
- **Internationalization**: `i18next`, `react-i18next`.
- **Icons**: `lucide-react`.
- **Testing**: `vitest`, `@testing-library/react`.

## Architectural Patterns
- **Directory Structure**:
  - `src/components/ui`: Shared, generic UI components (Buttons, Inputs, Modals).
  - `src/features`: Feature-specific logic and components.
  - `src/store`: Redux store configuration and slices.
  - `src/lib`: Utilities (including `cn.ts` or `utils.ts` for styling).
  - `src/constants`: Enums and constant values.
  - `src/i18n`: Locale definitions and setup.

## Coding Conventions
1.  **Strict TypeScript**: Avoid `any`. Define interfaces/types for all props and state.
2.  **Functional Components**: Use `const Component = () => {}` syntax.
3.  **Styling**:
    - Use the `cn()` helper (from `@/lib/utils`) to merge Tailwind classes.
    - Define component variants using `cva`.
    - Use standard Tailwind utility classes.
4.  **Imports**:
    - Use absolute imports with `@/`.
    - Group imports: React/Third-party -> Local Absolute (`@/...`) -> Relative (`./...`).
5.  **Component Props**:
    - Extend HTML attributes where appropriate.
    - Use `forwardRef` for atomic UI components.
6.  **Routing**:
    - Use `Link` from `react-router-dom` for internal links.
    - Check `src/constants/enums` for route path constants (`RoutePath`).

## Specific Component References
- **Button**: Located in `src/components/ui/Button.tsx`. Supports `linkTo` prop.
- **Icon**: Wrapper around Lucide icons.
