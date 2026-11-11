---
name: styling
description: Project styling conventions — Tailwind v4 utilities, theme tokens/CSS variables in global.css, where fonts, images and icons live. Use when creating or restyling components, sections, animations, or adding assets.
---

# Styling conventions

Stack: Astro + Vue SFCs, Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — config lives in CSS). Dark-only design.

## Tailwind first

- Style with utility classes directly in templates. No `<style>` blocks or separate CSS files per component unless something truly can't be done with utilities.
- Arbitrary values are fine for one-offs: fluid sizes via `clamp()` (`text-[clamp(2rem,4vw,3.5rem)]`, `px-[clamp(1.25rem,5vw,3rem)]`), custom gradients, shadows, masks.
- Long class lists: break across lines, grouped roughly by layout → spacing → typography → color → effects/animation → states/breakpoints.
- Dynamic classes go in `:class` (ternaries/arrays); keep static classes in `class`.
- Always pair motion with `motion-reduce:animate-none` / `motion-reduce:transition-none`.
- Interactive elements get a visible `focus-visible:outline-*` style.
- Mobile-first; main breakpoints used are `md` (nav) and `lg` (layout).

## Common patterns

- Each section fills one screen: `min-h-dvh` on the section (content can still grow taller). The header is `fixed`, so the first section needs enough top padding to clear it.
- Section wrapper: `mx-auto max-w-7xl px-[clamp(1.25rem,5vw,3rem)]`.
- Headings: `font-semibold leading-[1] tracking-[-0.03em] text-balance text-foreground` with a `clamp()` size.
- Accent line/rule: `h-px bg-linear-to-r from-accent to-primary`.
- Transparency via opacity modifiers on tokens: `text-foreground/70`, `border-foreground/10`, `bg-background/75` (prefer `foreground/*` over `white/*`).
- Buttons/CTAs: `rounded-full bg-foreground text-background`, hover with accent.

## CSS variables & theme (`src/styles/global.css`)

- Design tokens are defined in `@theme` and become utilities automatically:
  - colors `--color-*` → `bg-primary`, `text-muted`, `from-accent`…
    (`primary`, `accent`, `background`, `surface`, `foreground`, `muted`)
  - fonts `--font-*` → `font-rubik`
  - easing `--ease-*` → `ease-out-expo`
  - animations `--animate-*` + `@keyframes` inside `@theme` → `animate-fade-up`
- **Add a token to `@theme`** when a value is reused (new brand color, easing, reusable animation). Don't hardcode hex colors in components.
- **Use `var(--color-*)` directly** only inside arbitrary values where a utility can't reach: gradients, `color-mix()`, shadows, e.g. `shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]`.
- Local per-element variables are fine via arbitrary properties, e.g. `[--spot-x:50%] lg:[--spot-x:72%]`, then read with `var(--spot-x)`.
- Per-instance timing (stagger delays) goes in `:style` (`animationDelay`), not new classes.
- Global element defaults (body bg/color/font) live in `@layer base` in `global.css`. Keep it minimal.

## Fonts

- Files: `public/fonts/<Family>/` (currently `Rubik`, variable `.ttf` + `static/`).
- Register with `@font-face` in `global.css` (url `/fonts/...`, `font-display: swap`), then expose as `--font-<name>` in `@theme`.
- Prefer variable fonts; static weights are a fallback.

## Images & icons

- Content images: `src/assets/images/` — import them so Astro processes them:
  `import avatar from '../assets/images/avatar.png'` → `:src="avatar.src" :width="avatar.width" :height="avatar.height"`. In `.astro` files prefer `<Image />` from `astro:assets`.
- Always set `width`/`height` (or `aspect-*`) and meaningful `alt` (`aria-hidden`/empty alt for decorative).
- `public/` only for files that need a fixed URL (favicon, fonts, og images).
- Icons: `astro-icon` with `@iconify-json/lucide` is installed (`<Icon name="lucide:..." />` in `.astro`). Small decorative glyphs/shapes built with spans are fine too.
