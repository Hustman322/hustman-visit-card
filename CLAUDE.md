# HustWeb — visit card site

Frontend-only, single-page personal "visit card" site for a web developer (brand **HustWeb**).
The person works mainly in PHP, but the copy positions them as a **web developer**: lead with business outcomes,
not the language or years of experience. The site sells their services to businesses:
development, integrations, AI-powered solutions, and ongoing support. All copy is in English, short and confident, aimed at clients rather than developers.

## Stack

- Astro 7 (static output) + Vue 3 SFCs (`<script setup lang="ts">`) for components
- Tailwind CSS v4 via `@tailwindcss/vite`, configured in CSS (no `tailwind.config.js`)
- TypeScript strict (`astro/tsconfigs/strict`)
- Integrations: `@astrojs/vue`, `@astrojs/mdx`, `@astrojs/sitemap`, `astro-icon` + Lucide icons
- Forms: Vueform (`@vueform/vueform`), configured in `vueform.config.ts`, themed in `src/styles/vueform.css`
- Node >= 22, npm (`package-lock.json`)

## Run locally

```sh
npm install
npx astro dev --background   # see AGENTS.md: astro dev stop | status | logs
npm run build                # output in dist/
```

## Layout

```text
src/
  layouts/BaseLayout.astro    # <html>, base meta, imports global.css, renders SeoHead + SiteHeader
  config/seo.ts               # site-wide SEO data: title, description, OG image, contact, services
  pages/index.astro           # the only page: composes the sections in order
  pages/robots.txt.ts         # robots.txt pointing to the sitemap (built from `site`)
  components/
    SeoHead.astro             # title, description, canonical, robots, Open Graph, Twitter, JSON-LD
    SiteHeader.vue            # fixed header (overlays sections), desktop nav + sliding pill, mobile fullscreen menu, scroll-spy (client:load)
    HeroBanner.vue            # hero: eyebrow, animated headline, CTA, avatar
    Services.vue              # 4 service rows (Web Dev, AI & Automation, API Integrations, Maintenance)
    AboutMe.vue               # about: heading, photo (myself.png), bio, 3 principle cards
    Contact.vue               # contact: info card + form card (static; the form comes in via the `form` slot)
    ContactForm.vue           # Vueform contact form island (client:only="vue")
    ui/                       # small reusable building blocks shared across sections
      SectionEyebrow.vue      # uppercase label + gradient rule above headings (`animated` prop for hero)
      icons/                  # inline SVG icon components (fill currentColor), e.g. HandshakeIcon.vue
  styles/global.css           # Tailwind import, @font-face, @theme tokens, keyframes, base styles
  styles/vueform.css          # Vueform base theme + --vf-* overrides mapped to project tokens
vueform.config.ts             # Vueform config with a slim theme (only the templates the form uses)
scripts/generate-og-image.mjs # `npm run og` → public/og-image.png (1200×630 social preview)
  assets/images/              # imported images (processed by Astro)
public/
  fonts/Rubik/                # self-hosted fonts
  favicon.*
```

## Page content

- **Hero**: "WEB DEVELOPER · FOR GROWING BUSINESSES" / "Web development, done right." / CTA "Let's work together" → `#contact`.
- **Services** (`#services`): "Services designed around your business." Web Development, AI & Automation, API & System Integrations, Maintenance & Improvements, each with a short description and three offerings.
- **About** (`#about-me`): "I build for your business, not just for the code." Journey steps, bio, principle cards.
- **Contact** (`#contact`): info card (phone, email, hours, location) + "Need a consultation?" form (name, email, phone, service, message). Icons are placeholders. The form has no backend yet: `onSubmit` in `ContactForm.vue` just shows a success message.
- New sections need a matching `id`, which the header scroll-spy uses.
- SEO: the production URL is `site` in `astro.config.mjs` (currently the placeholder `https://example.com`). Canonical, OG URLs, sitemap and robots.txt all derive from it. Page-level overrides go through `BaseLayout` props (`title`, `description`, `image`, `noindex`).

Copy lives as constants in each component's `<script setup>`, not in a CMS or content collection.

## Conventions

- Styling rules: see the `styling` skill (`.claude/skills/styling/SKILL.md`).
- Components are static by default. Add a `client:*` directive only when a component needs JS (the header, and the contact form).
- Vueform: its theme can't render on the server, so forms must be `client:only="vue"` islands that install the plugin on their own app (see `ContactForm.vue`); don't register it globally. Using a new element type means adding its template to the slim theme in `vueform.config.ts`. In `<script setup>`, don't import the plugin as `Vueform` (it shadows the `<Vueform>` component).
- Keep accessibility in place: `aria-*`, `sr-only` text for animated headings, focus-visible styles, reduced-motion support.

@AGENTS.md
