# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # dev server on :3000 (Turbopack)
npm run build   # production build (Turbopack); also runs TypeScript
npm run lint    # eslint directly (CI runs it with --max-warnings=0)
npm start       # serve the production build
npx next typegen  # regenerate the global PageProps/LayoutProps/RouteContext types
```

There is no test framework in this project — no runner, no test files. Don't invent a test command; run `npm run lint` and `npm run build` to validate a change.

`next build` does **not** lint in Next 16, so lint separately. `next lint` was removed in this version.

## Branching and deploys

**Never commit to `main`.** All work happens on a feature branch (`feat/`, `fix/`, `chore/`) and lands via pull request — including small one-line changes.

`main` is production: Vercel's GitHub integration deploys it to shopsundaysociety.vercel.app and builds a preview for every PR. A merge is a deploy, so the branch you commit on is the only thing standing between a bad change and the live site.

`.github/workflows/ci.yml` runs lint and build on every PR to `main`. PRs are set to auto-merge once required checks pass, which means nothing gates a green PR — run `npm run lint -- --max-warnings=0` and `npm run build` locally before pushing rather than using CI to find out.

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/), matching the existing history: `feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `refactor:`, `perf:`, `style:`. Imperative mood, lowercase after the colon, no trailing period.

**PR titles follow the same format, and matter more than the individual commits.** `main` takes squash merges, so the PR title — not the branch's commit messages — becomes the permanent commit on `main`. A tidy branch history behind a prose PR title still lands on `main` as prose.

`aff499c` ("Add CLAUDE.md, CI checks, and branch workflow rules (#1)") is the one commit on `main` that breaks this convention, and that is exactly how it happened.

## What this is

Sunday Society is a golf apparel and accessories brand. The destination is a real storefront (product pages, cart, checkout), but today it is front-end only: one static page composed of a promo utility bar, a nav, and a hero.

**No commerce backend or CMS has been chosen yet.** Keep content hardcoded in components until one is picked — don't add a data-fetching layer, state manager, or third-party SDK unprompted.

## Architecture

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. `@/*` resolves to the repo root.

- `app/layout.tsx` is the only place site chrome lives: it loads the fonts via `next/font/google` (exposing them as CSS variables on `<html>`) and renders `UtilityBar` + `Navbar` around every route. Page files render only their own sections — don't re-declare nav or footer per page.
- `app/components/` holds shared presentational components: one default export per file, PascalCase filename matching the component.
- Server Components are the default. Add `"use client"` only for actual interactivity — `Navbar` is client-only because of the mobile menu toggle; `Hero` and `UtilityBar` are server components and should stay that way.
- Request APIs are async in Next 16: `params` and `searchParams` are Promises. Type route files with the generated helpers, e.g. `PageProps<'/products/[slug]'>` and `LayoutProps<'/'>`.
- Tailwind v4 is configured CSS-first in `app/globals.css` — there is no `tailwind.config.*` file, and adding one is the wrong move. New design tokens go in the `@theme` block.

## Design system

Match the existing visual language; it is deliberate, not scaffold output.

**Colors** (`@theme` in `app/globals.css`). Never write a raw color in a component — no `text-white`, no `bg-black`, no hex. If a new color is needed, add a token here first:
- `--color-army` `#123524` — deep bottle green. Header ground, button hover fill.
- `--color-gold` `#ffbb00` — the single accent. Utility bar, hover states, eyebrow text.
- `--color-paper` `#ffffff` — light type and fills sitting on army.
- `--color-ink` `#0a0a0a` — dark type sitting on gold.
- `--color-rule` `white/30` — dashed hairline dividers.

Neutrals are named by role, not hue, so a future move off pure white doesn't mean renaming classes.

**Fonts** (`@theme inline` aliases over `next/font` variables):
- `font-sans` → DM Sans — nav, labels, buttons, body copy.
- `font-display` → Archivo — headlines, used `font-extrabold` and uppercase.
- `font-serif` → EB Garamond — reserved for editorial/journal, not yet used.

**Conventions:**
- Nav items, labels, and button text are UPPERCASE and bold; headlines are uppercase `font-display font-extrabold`. `tracking-tighter` is set globally on `<body>`; label-ish text overrides to `tracking-wide`.
- Hover is a color transition to `gold` (links) or an army/paper inversion (buttons). Write bare `transition` — speed comes from `--default-transition-duration` (300ms) in `@theme`, so don't add a `duration-*` class unless an element genuinely needs to differ. Interactive elements get `cursor-pointer`.
- Section dividers are dashed hairlines: `border-b border-dashed border-rule`.
- `lg:` is the desktop breakpoint — hamburger below it, full nav at and above. The mobile menu animates via `max-height` and uses oversized lowercase links with a gold `after:` underline that wipes in from the left.
- Above-the-fold imagery uses `next/image` with `fill`, `object-cover`, and `priority`.

## Known rough edges from the scaffold

- In `app/layout.tsx`, `<UtilityBar />` and `<Navbar />` are currently siblings of `<body>` rather than children of it. Browsers hoist them so it renders, but it is invalid — layout chrome belongs inside `<body>`.
- `app/globals.css` still carries one create-next-app leftover: the `prefers-color-scheme` dark block flipping `--background`/`--foreground`. Nothing else in the design is dark-mode aware, so it mostly has no visible effect.
- `README.md` and `public/*.svg` are still untouched create-next-app defaults.
