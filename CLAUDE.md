# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev`: dev server at http://localhost:3000
- `npm run build`: production build (this also type-checks)
- `npm run lint`: ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

There is no test suite.

## Stack

Next.js 16 (App Router) with React 19 and the React Compiler on (`reactCompiler: true` in `next.config.ts`), TypeScript (strict), and Tailwind v4 through `@tailwindcss/postcss`. Next 16 APIs differ from older versions (for example, the root layout is typed with the global `LayoutProps<"/">` helper), so check `node_modules/next/dist/docs/` before using a Next API.

## Architecture

The site is a single-page personal portfolio. The whole site is one client component, [src/app/page.tsx](src/app/page.tsx), split into full-viewport `<section className="page">` blocks (`home`, `bio`, `projects`, `skills`).

- **Navigation**: the `PAGES` array in `page.tsx` drives both the fixed navbar links (`#id` anchors) and an `IntersectionObserver` that highlights the section crossing the middle of the viewport. If you add a section, add it to `PAGES` and give the `<section>` the same `id`.
- **Scroll-driven background**: `page.tsx` writes the scroll progress (0–1) to the `--scroll` CSS variable on `<html>`. `globals.css` uses it in `--bg` to darken the background as you scroll. The navbar gradient and the `body::before` top fade both use `var(--bg)`, so they follow the darkening.
- **StarField**: [src/app/components/StarField.tsx](src/app/components/StarField.tsx) is a fixed `<canvas>` rendered in `layout.tsx` behind all content (`z-index: -1`). It animates stars that drift and twinkle, and its tuning constants are at the top of the file. Cards and boxes use semi-opaque backgrounds to hide the stars behind them.
- **Content lives in `src/app/data/`**: `projects.ts` (feeds `ProjectsCarousel` → `ProjectCard`) and `skills.ts` (feeds `SkillBox`). Edit these files to change site content.
- **Projects carousel**: each card gets a signed `offset` from the active index (0 = centre, ±1 = sides, anything else hidden). CSS uses the `--offset` variable to position the card. When a card wraps from one side to the other, it gets a `teleport` class, which turns off its transition for that move.

## Styling conventions

Most styling is hand-written, semantic class names in [src/app/globals.css](src/app/globals.css), not Tailwind utilities. Tailwind is mostly used in `layout.tsx`. Colours and spacing come from CSS variables on `:root` (`--text`, `--text-muted`, `--text-faint`, `--accent`, `--accent-soft`, and `--bg`). The body font is plain Helvetica, and no `next/font` fonts are loaded. Animations respect `prefers-reduced-motion`. Keep that behaviour in any new motion.

Images are served from `public/` with plain `<img>` tags, not `next/image`, so `npm run lint` shows `no-img-element` warnings. These are known and accepted.
