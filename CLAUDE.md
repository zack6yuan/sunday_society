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

Sunday Society is a golf apparel and accessories brand. The destination is a real storefront (checkout, accounts), but today it is front-end only: a homepage (promo utility bar, nav, hero, three collection features, the first-drop product grid, footer), department listings at `/men` and `/women`, statically generated product pages at `/products/[slug]`, a cart at `/cart`, and a branded 404.

The four help pages under `/help` (shipping, returns, size guide, contact) share a layout that holds both the sidebar nav and the article typography, applied through `[&_h2]`-style variants so the pages themselves stay pure semantic content. **Their policy copy is placeholder** — plausible and consistent with what the rest of the site already claims (free shipping, 30-day returns), but never confirmed by the owner, as is `hello@sundaysociety.com`. Treat every number there as provisional until he signs off.

Search is a full-screen overlay (`SearchOverlay`) opened from the nav on both breakpoints, not a route — it filters the in-memory catalog, so there is no index to keep in sync. It is mounted only while open, which is what keeps its query from surviving a close; don't switch it to a persistent mount with a visibility flag.

The cart works but is client-only: `CartProvider` (React context persisted to `localStorage`) is the single source of cart state, consumed via `useCart` by the navbar badge, `AddToCart`, and `CartContents`. It renders empty on the server and loads the stored cart after mount so hydration always matches. Checkout is deliberately inert; when a commerce backend is chosen, the provider is the swap point.

Product data lives in `app/lib/products.ts` as one typed catalog: a record keyed by slug plus ordered `men`/`women` arrays (the Rope Trucker is unisex and appears in both). Every product surface reads from this module — when a commerce backend is chosen, it replaces this file, not the components. Product photography does not exist yet — `DropCard` and the product page render a flat brand-colour tile with the shot name set into it, picking `ground` and `ink` per product so the grid reads as a palette. When real imagery arrives, that tile is the seam to replace. The collection sections have the same seam and already carry real photos.

**No commerce backend or CMS has been chosen yet.** Keep content hardcoded in components until one is picked — don't add a data-fetching layer, state manager, or third-party SDK unprompted.

## Architecture

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. `@/*` resolves to the repo root.

- `app/layout.tsx` is the only place site chrome lives: it loads the fonts via `next/font/google` (exposing them as CSS variables on `<html>`) and renders `UtilityBar` + `Navbar` inside `<body>`, above a `<main className="flex-1">` that pages render into, with `Footer` below it. Page files render only their own sections — don't re-declare nav or footer per page.
- `app/components/` holds shared presentational components: one default export per file, PascalCase filename matching the component.
- Server Components are the default. Add `"use client"` only for actual interactivity — `Navbar` is client-only because of the mobile menu toggle; `Hero` and `UtilityBar` are server components and should stay that way.
- Request APIs are async in Next 16: `params` and `searchParams` are Promises. Type route files with the generated helpers, e.g. `PageProps<'/products/[slug]'>` and `LayoutProps<'/'>`.
- Tailwind v4 is configured CSS-first in `app/globals.css` — there is no `tailwind.config.*` file, and adding one is the wrong move. New design tokens go in the `@theme` block.

## Design system

Match the existing visual language; it is deliberate, not scaffold output.

**Colors** (`@theme` in `app/globals.css`). Never write a raw color in a component — no `text-white`, no `bg-black`, no hex. If a new color is needed, add a token here first:
- `--color-army` `#123524` — deep bottle green. Header ground, dark type on light grounds, product tiles.
- `--color-gold` `#c9a227` — antique gold, the single accent **on army and other dark grounds**. Utility bar, hover states, eyebrow text, badges.
- `--color-brass` `#7d6418` — the same accent **for light grounds**. Gold on `paper` or `cloud` only reaches 2.2:1; brass clears 5:1.
- `--color-paper` `#f5f1e8` — warm off-white. Light type and fills sitting on army.
- `--color-ink` `#1c1c1c` — near-black. Dark type on gold, and the black product tile.
- `--color-cloud` `#fafbf4` — the cooler off-white ground the product grid sits on.
- `--color-rule` `paper/0.18` — dashed hairline dividers.

`paper` and `cloud` are both off-whites and not interchangeable: `paper` is the warm one that sits against army, `cloud` is the cooler page ground under the drop grid.

Neutrals are named by role, not hue, so a future move off pure white doesn't mean renaming classes.

**Accent text follows its ground: `gold` on dark, `brass` on light** — including hover states. Neither works on the other side (`brass` on army is 2.6:1). Where a component alternates grounds, such as the collection panels, the accent has to be conditional too.

**Anything sitting on army must set its text colour explicitly** (`text-paper` on the header, for example) — inherited `--foreground` is near-black and unreadable on a dark ground.

**Fonts** (`@theme inline` aliases over `next/font` variables):
- `font-sans` → DM Sans — nav, labels, buttons, body copy.
- `font-display` → Archivo — headlines, used `font-extrabold` and uppercase.
- `font-serif` → EB Garamond — the mobile menu links, and reserved for editorial/journal beyond that.

**Conventions:**
- Labels and button text are UPPERCASE and bold; headlines are uppercase `font-display font-extrabold`. Nav links are the exception: the desktop bar is sentence-case DM Sans medium with a soft `bg-paper/10` pill on hover (cart is the one filled gold pill), and the mobile menu is oversized lowercase `font-serif` with the gold underline wipe. `tracking-tighter` is set globally on `<body>`; label-ish text overrides to `tracking-wide`, nav/serif text to `tracking-normal`.
- Hover is a color transition to `gold` (links) or an army/paper inversion (buttons). Write bare `transition` — speed comes from `--default-transition-duration` (300ms) in `@theme`, so don't add a `duration-*` class unless an element genuinely needs to differ. Interactive elements get `cursor-pointer`.
- Section dividers are dashed hairlines: `border-b border-dashed border-rule`.
- `lg:` is the desktop breakpoint — hamburger below it, full nav at and above. The nav is a sticky floating pill (rounded-full army bar with the page visible around it); the gold utility bar above it scrolls away. The mobile menu animates `grid-template-rows` from `0fr` to `1fr` (not `max-height`) so it sizes to its own content; adding menu items can never clip it. The panel is a rounded card absolutely positioned under the pill (`top-full`, `z-50`) so it overlays the page instead of pushing it down; both the outer grid div and the inner overflow-hidden div carry the rounding so the animation clips to the card shape. Links are oversized and lowercase with a gold `after:` underline that wipes in from the left.
- Padding steps down on small screens rather than staying fixed. A single `p-8` at every width makes a mobile header roughly half again too tall.
- Above-the-fold imagery uses `next/image` with `fill`, `object-cover`, and `priority`.

## Known rough edges from the scaffold

- `README.md` and `public/*.svg` are still untouched create-next-app defaults.
