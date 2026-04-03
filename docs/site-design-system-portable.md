# I Code It / Frontend at scale — portable design system

This document distils the visual and interaction design of [frontend.icodeit.com.au](https://frontend.icodeit.com.au/) so you can reapply it in **another Next.js app** while staying recognisably the same **site family**.

## How to use this in a different project

1. **Copy the contract, not necessarily every file path** — Recreate the same tokens, layout widths, header/footer behaviour, and link treatments using your repo’s patterns (e.g. `cn()`, different folder layout).
2. **Keep colours and typography** as the strongest “family” signals; swap implementation details (CSS variables vs Tailwind theme) if needed.
3. **Icons are swappable** — This codebase uses [Lucide React](https://lucide.dev/) with `strokeWidth={2}` on UI chrome. In your app, use **your** icon library but match **sizes, stroke weight, and placement** (see [Icons](#icons)).
4. **Preserve canonical URLs** — Social, newsletter, and main-site links below should stay the same unless you intentionally rebrand.
5. **Adapt internal routes** — Header/footer “Explore” links point at app routes (`/case-studies`, etc.). Map them to your router or remove sections you do not ship.

---

## Colour tokens

**Source of truth (hex)** — mirror this structure in JSON or your design tokens:

| Token | Hex | Tailwind usage (this repo) |
| --- | --- | --- |
| Brand primary | `#e23e57` | `text-brand`, `bg-brand`, prose links |
| Brand secondary | `#C084FC` | `text-brandSecondary`, accents |
| Brand danger | `#b91c1c` | `text-brandDanger` |
| Palette magenta | `#ff0855` | `text-palette-magenta`, MDX list markers, dark-mode hero fog |
| Palette azure | `#0090ff` | `text-palette-azure`, h2 in prose, CTA chevrons |
| Palette tangerine | `#ff8000` | `text-palette-tangerine`, `bg-palette-tangerine`, etc. |
| Palette gold | `#f4c70f` | `palette-gold` |
| Palette jade | `#00b209` | `palette-jade` |

**Extended slate** — `slate-150`: `#e8edf3` (used in light body gradient).

**CSS variables for palette** — Tailwind plugin injects `:root { --palette-magenta: … }` etc. so plain CSS (e.g. MDX list styling) can use `var(--palette-magenta)`.

**Dark mode** — `darkMode: ["class"]` on `<html>` via `next-themes` (`attribute="class"`). Default theme in this app: **`dark`**.

---

## Typography

| Role | Implementation here | Port to your app |
| --- | --- | --- |
| **Body (sans)** | [Inter](https://fonts.google.com/specimen/Inter) via `next/font` → `--font-inter`, applied on `<body>` | Same stack or substitute a similar neo-grotesque; keep `antialiased`. |
| **Headings** | [Geist Sans](https://vercel.com/font) → `--font-geist-sans`; Tailwind `font-heading` | Geist + Inter fallback matches production; any clean geometric sans + Inter is acceptable. |
| **Code (UI / prose)** | [JetBrains Mono](https://www.jetbrains.com/lp/mono/) → `--font-jetbrains-mono` | `globals.css` sets `pre, code` to JetBrains with ligatures on. |
| **Extra** | Fira Code variable is loaded in root layout | Optional; only needed if you reference `--font-fira-code` elsewhere. |

**Typographic scale (main column)** — `lib/ui.ts` `mainShell`: base copy is **`text-lg`** with **`leading-relaxed`**; page titles use `font-heading text-3xl sm:text-4xl font-extrabold tracking-tighter`.

**Prose (MDX)** — `@tailwindcss/typography` with `prose prose-slate prose-lg dark:prose-invert`, heading font `prose-headings:font-heading`, h2 colour `prose-h2:text-palette-azure`, links `prose-a:text-brand` with underline on hover only.

---

## Layout and spacing

| Concept | Classes / values | Intent |
| --- | --- | --- |
| **Main column width** | `max-w-4xl` (~56rem) | Single column for readability; matches production. |
| **Horizontal padding** | `px-4 sm:px-6` | Comfortable gutters on small screens. |
| **Vertical rhythm (shell)** | `gap-16 sm:gap-20 md:gap-24`, `pt-6 sm:pt-8`, `pb-28` | Space between header, page blocks, and footer approach. |
| **Page stack** (between hero and sections) | `gap-12 sm:gap-16 md:gap-20` | Use when a route wraps multiple top-level blocks in one flex parent. |
| **Footer top margin** | `mt-20` on `<footer>` | Clear separation from content. |
| **Z-index** | Hero backdrop `z-0`; main column `relative z-10`; footer `relative z-10` | Content sits above fixed hero wash. |

---

## Page shell: body, hero backdrop, main

**Body (light)** — `min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-slate-150 to-slate-100 bg-no-repeat text-slate-900 antialiased`.

**Body (dark)** — `dark:bg-slate-900 dark:bg-none dark:text-slate-50` (flat background; hero provides top atmosphere).

**Fixed hero backdrop** (`SiteHeroBackground`):

- **Height:** 500px fixed band at top (`SITE_HERO_BACKDROP_HEIGHT_PX`).
- **Mask:** Linear gradient to transparent by ~62% height so it fades into the page (webkit + standard `mask-image`).
- **Layers (bottom → top):** (1) vertical wash `from-slate-50 to-slate-100` / dark `from-slate-800 to-slate-900`; (2) two absolutely positioned divs with classes `hero-breathe-layer-a` and `hero-breathe-layer-b` (keyframes in `globals.css`); (3) dot grid via CSS variables `--dot-grid-size: 18px` and radial gradients for light/dark (`hero-dot-layers.tsx`).
- **Motion:** Slow “breathing” opacity/translate/scale — no pointer tracking.

**Main** — `ui.mainShell` wraps header + page content: `mx-auto flex w-full min-w-0 max-w-4xl flex-col …`.

---

## Header

**Philosophy:** Header lives **in the same column as content** — not a full-bleed chrome bar.

**Structure:**

- **Mobile:** Row — menu button (hamburger / close), text logo, mode toggle. Below: collapsible `nav` with `border-t`, stacked links.
- **Desktop:** Row — logo left; right cluster — horizontal `nav` + mode toggle.

**Logo** — Text mark: `font-heading`, `text-base sm:text-lg`, `font-extrabold tracking-tighter`, `text-brand`, `hover:opacity-80`, label **“I Code It”** (optional swap to image assets later).

**Desktop nav links** — `text-[0.9375rem] font-medium`, `rounded-md px-1 py-1.5`, `no-underline`, `transition-colors duration-200`. Active: `text-brand`. Inactive: `text-slate-600 hover:text-slate-900` / dark `text-slate-400 hover:text-slate-100`. Nav gap: `gap-x-5 md:gap-x-6`, wrap allowed.

**Mobile nav links** — `text-base font-medium`, `px-2 py-3`, `rounded-md`. Active: `bg-slate-200/80 text-brand` / dark `bg-slate-800/80`. Inactive: slate hover backgrounds.

**Menu button** — `h-10 w-10`, `rounded-lg`, icon `h-6 w-6`, `strokeWidth={2}`.

**Header padding** — `pb-8 sm:pb-10` below the header row(s).

**Primary nav items (labels + paths in this repo)** — Home `/`, Case Studies `/case-studies`, Patterns `/patterns`, Learning Paths `/learning-paths`. Adjust paths in your app.

**Theme toggle** — `h-10 w-10`, `rounded-lg`, moon/sun icons `h-5 w-5` `strokeWidth={2}`; hover uses slate wash + brand on hover (dark mode shows sun in brand colour).

---

## Footer

**Band** — `bg-slate-950 text-slate-100`, `mt-20`, `relative z-10`.

**Inner** — `max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-14` (aligns with main column).

**Grid** — `gap-12 md:grid-cols-[1.35fr_1fr_1fr]` — wide column for bio + subscribe + social; then Explore; then Products + General (nested grid on smaller breakpoints).

**Column titles** — `text-xs font-bold uppercase tracking-[0.18em] text-slate-500`.

**Bio block** — Avatar `size-16 rounded-3xl` (image: `/assets/juntao.qiu.avatar.webp`). Name `text-base font-semibold text-slate-50`. Tagline `text-sm text-slate-400`. Bio paragraph `text-sm leading-relaxed text-slate-300 max-w-md`.

**Subscribe CTA** — Pill: `rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-50 ring-1 ring-inset ring-white/10 hover:bg-white/14`; external link icon with class `cta-icon-breathe` and `text-palette-azure`.

**Social icon buttons** — `h-9 w-9`, `rounded-xl`, `text-slate-400`, `hover:bg-white/10 hover:text-slate-50`. Icons ~`h-5 w-5`. RSS placeholder uses `text-slate-500` and `href="#"` until live.

**Footer list links** — `text-sm text-slate-300`, `hover:text-slate-50`, `inline-flex gap-1.5`, `no-underline`. External links append small external icon `h-3.5 w-3.5 opacity-70`, `target="_blank"` `rel="noreferrer"`.

**Bottom bar** — `mt-14 border-t border-white/10 pt-6`, `text-xs text-slate-500`; secondary line `text-slate-600`. Copyright uses current year + **“I Code It”**.

### Canonical external URLs (keep for brand continuity)

| Purpose | URL |
| --- | --- |
| Main site | `https://www.icodeit.com.au/` |
| Substack (Subscribe) | `https://juntao.substack.com/` |
| YouTube | `https://www.youtube.com/@icodeit.juntao` |
| GitHub | `https://github.com/abruzzi` |
| LinkedIn | `https://www.linkedin.com/in/juntaoqiu/` |
| X (Twitter) | `https://x.com/JuntaoQiu` |

**Footer “Products” deep links (main site)** — append to main site base: `books`, `tutorials`, `posts`.

**Internal route in this repo** — Course (WIP): `/courses/frontend-system-design-essentials`. Replace with your course URL if different.

**Placeholder items** — “RSS (coming soon)”, “Contact (coming soon)” use `#` or disabled styling; keep or implement as you prefer.

---

## Links and CTAs

| Pattern | Where | Style summary |
| --- | --- | --- |
| **Prose links** | MDX body | Brand colour, medium weight, no underline; underline on hover. |
| **`ui.ctaLink`** | Index cards, primary inline CTAs | `inline-flex items-center gap-1.5`, `text-base font-medium text-brand`, no underline, `hover:opacity-80`; pair with `cta-icon-breathe` on trailing icon. |
| **`ui.relatedListLink`** | Related reading lists | Brand + **dotted** underline (`decoration-dotted`, offset ~5px), dark-mode adjusted decoration opacity. |

**External link affordance (footer)** — Label + `ArrowUpRight` (or equivalent) at `h-3.5 w-3.5`.

---

## Icons

**This project:** `lucide-react` for Menu, X, Github, Linkedin, Twitter, Youtube, Rss, ArrowUpRight, Moon, Sun.

**Porting rule:** Replace imports with your library’s equivalents; preserve:

- Header / menu: 24px (`h-6 w-6`), stroke **2**.
- Mode toggle: 20px (`h-5 w-5`), stroke **2**.
- Footer social: 20px inside 36px hit target.
- Footer external chevron on text links: 14px (`h-3.5 w-3.5`).
- Subscribe CTA chevron: 16px (`h-4 w-4`), animated class `cta-icon-breathe`, colour `text-palette-azure`.

---

## Motion

**`cta-icon-breathe`** — 2.8s ease-in-out infinite; subtle translateX + scale + opacity; `animation-play-state: paused` on hover.

**Hero fog** — `hero-breathe-layer-a` ~14.5s cycle; `hero-breathe-layer-b` ~19s; low opacity; light uses brand-tinted reds/blues; dark mode increases magenta/blue visibility slightly.

---

## Cards, panels, and demos

**Marketing / index cards (`ui.panel`)** — `rounded-2xl border border-slate-200/90 bg-white/80 p-6 sm:p-7 shadow-sm`, light hover border/shadow; dark `dark:border-slate-600/50 dark:bg-slate-800/60` with stronger hover shadow.

**Case study demo shell** — `rounded-2xl border`, light `bg-white/90`, dark `bg-slate-900/55`.

**Explainer card** — Softer `bg-slate-100/50` light / dark slate panel.

**Tables** — Compact `text-sm`, bordered rows, muted header background.

**Status badges** — Pill, uppercase tracking, amber/slate/violet variants for roadmap labels.

---

## MDX-specific polish

- **Lists** — Custom classes `mdx-icon-ul` / `mdx-num-ol` with flex rows; unordered use chevron markers; ordered use circular magenta-tinted counters (see `globals.css` for exact sizes and `color-mix` dark overrides).
- **Inline code** — Typography plugin backticks stripped via empty `::before`/`::after` on `.prose code`.
- **Scroll margin** — `prose-headings:scroll-mt-24` for anchored headings.

---

## Scrollbars

Thin scrollbars; thumb `rounded-full` slate ~`bg-slate-700/90`; track transparent. Firefox: `scrollbar-width: thin` and `scrollbar-color`.

---

## Dependencies (reference)

Typical stack for a faithful port:

- `next`, `react`
- `tailwindcss`, `@tailwindcss/typography`, `tailwindcss/plugin` (for palette CSS vars)
- `next-themes` (class on `html`)
- `next/font` + `geist` (or self-hosted Geist)
- `@vercel/analytics` (optional)

---

## Metadata and env

- **`NEXT_PUBLIC_SITE_URL`** — Defaults to `https://frontend.icodeit.com.au` in `app/layout.tsx` for `metadataBase`, canonical, OG/Twitter images.
- **Favicon** — `app/favicon.ico` (Next.js [metadata file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons); no `metadata.icons` needed)
- **Default social image** — `/assets/juntao.qiu.avatar.webp` (align with footer avatar for consistency)

---

## Migration checklist (another Next.js app)

- [ ] Add colour JSON (or tokens) + Tailwind `extend.colors` + optional `:root` palette vars.
- [ ] Load Inter + Geist (heading) + JetBrains Mono; wire `fontFamily.sans`, `fontFamily.heading`, `fontFamily.mono`.
- [ ] Enable `darkMode: ['class']` and wrap app with `ThemeProvider` (`attribute="class"`, your default theme choice).
- [ ] Apply body classes (light gradient / dark flat) and optional fixed hero backdrop + `globals.css` keyframes.
- [ ] Implement `mainShell` equivalent on `<main>`; place header + children inside.
- [ ] Build header (inline column, mobile drawer, logo, nav, theme toggle) with your icon set.
- [ ] Build footer (slate-950, grid, bio, subscribe URL, social URLs from table above, columns).
- [ ] Copy `ui.ctaLink`, `relatedListLink`, and prose link tokens for consistency.
- [ ] Port or simplify MDX list CSS if you use the same list components.
- [ ] Set `metadataBase` and OG/Twitter to your domain while keeping **visual** parity if desired.

---

## Source files in this repository

| Area | Primary files |
| --- | --- |
| Tokens | `site-colors.json`, `tailwind.config.js` |
| Layout strings | `lib/ui.ts` |
| Root shell | `app/layout.tsx`, `app/providers.tsx` |
| Global CSS | `app/globals.css`, `app/code-highlight.css` (if you highlight code) |
| Header / footer / hero | `components/design-system/site-header.tsx`, `site-footer.tsx`, `site-logo.tsx`, `site-hero-background.tsx`, `hero-dot-layers.tsx` |
| Theme | `components/supporting/mode-toggle.tsx`, `theme-provider.tsx` |
| Routes / nav | `lib/routes.ts`, `lib/nav.ts` |

This document is descriptive; when in doubt, match the **numeric spacing**, **hex values**, and **behaviour** above rather than file names in the target repo.
