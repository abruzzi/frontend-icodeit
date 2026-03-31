# icodeit-frontend

Next.js site for **frontend developers** (especially mid-level and up) who want to grow skills for **large, scalable web applications**—not interview cramming. Content is organized as **CCDAO** case studies (real product-shaped scenarios) and **patterns** (reusable techniques, trade-offs, and failure modes).

For the first release, navigation focuses on **case studies** and **patterns**. **Learning paths** (`/learning-paths`) is a placeholder until curated sequences ship.

## Prerequisites

- **Node.js** `18.18+` or **20.x** (`.nvmrc` pins **20.17** for local parity with common Vercel defaults; [Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js) supports 18.x and 20.x)
- npm

## Setup

```bash
npm install
```

## Run locally (development)

```bash
npm run dev
```

- Dev server: `http://localhost:3000`
- Edits to MDX under `content/` hot-reload like other app files.

## Build for production

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

---

## Architecture (where to change things)

| Concern | Location |
| -------- | -------- |
| **Routes** (single source for `href`s) | `lib/routes.ts` |
| **Header nav labels + hrefs** | `lib/nav.ts` (uses `routes`) |
| **Brand + palette hex** (Tailwind + SVG/Canvas + `:root` vars) | `site-colors.json` → `tailwind.config.js` + `lib/site-colors.ts` |
| **Layout / spacing tokens** | `lib/ui.ts` (includes `caseStudyDemoShell` for interactive MDX demos) |
| **Case study & pattern content** | `content/case-studies/<slug>/index.mdx`, `content/patterns/*.mdx` |
| **Compare pages (structured data)** | `lib/compare/docs.ts` — see *Intentional choices* below |
| **MDX compile + syntax highlighting** | `lib/content/mdx.tsx` (Shiki via `@shikijs/rehype`), `components/mdx/mdx-components.tsx` |
| **Related pattern ↔ case study links** | `lib/content/related.ts` + frontmatter |
| **Vertical spacing between page blocks** | `app/template.tsx` uses `ui.pageStack` because React fragments collapse to one child under `main` |

**Reusable UI**

- Index cards: `components/content/content-entry-card.tsx`
- Related link lists: `components/content/related-links-section.tsx`

---

## Stack & dependencies

- **Next.js 14.2** (App Router; `package.json` pins the patch), **React ^18.3**, **TypeScript ~5.6**, **Tailwind CSS 3.4**, **ESLint 8** + `eslint-config-next` (version **matches** `next` — required by Next). ESLint 8 is end-of-life; moving to **ESLint 9** needs **Next 15+** and the flat-config migration—tracked as a future upgrade, not a silent drift.
- **Runtime deps** are limited to what ships in the browser bundle; **types, ESLint, PostCSS, Tailwind** live in `devDependencies`.
- Major upgrades (**Next 15+**, **React 19**, **Tailwind 4**, **ESLint 9**) are possible but need a dedicated pass (lint config, typings, and any breaking MDX APIs).

**Libraries (why they’re here)**

| Package | Role |
| -------- | ------ |
| `next-mdx-remote` | RSC-friendly MDX compile for content files |
| `@shikijs/rehype` | Code blocks in MDX (Shiki highlighter + themes in `lib/content/mdx.tsx`) |
| `gray-matter` | Frontmatter parsing |
| `@xyflow/react` | CCDAO flow diagram in MDX |
| `framer-motion` | Page transition wrapper (`app/template.tsx`) |
| `next-themes` | Light/dark class on `<html>` |
| `lucide-react` | Icons |
| `@atlaskit/pragmatic-drag-and-drop` | Board case study drag-and-drop demo |
| `geist` + `next/font` (Google) | Typography |

We avoid unmaintained forks; `gray-matter` and the unified/remark ecosystem are the standard path for file-based MDX + frontmatter. If you move content to a CMS, replace `lib/content/index.ts` + `renderMdx` behind the same helpers.

---

## Intentional choices & workarounds

1. **Compare routes** (`/compare/[slug]`) use **`lib/compare/docs.ts`** instead of MDX so rows map cleanly to `TradeoffMatrix` / `ProtocolChooser`. To add a page: extend `COMPARE_DOCS` and redeploy; moving to MDX later is documented in that file.
2. **`next.config.js`** does **not** set `swcMinify` — it was removed/ignored in modern Next; minification defaults to SWC.
3. **Logo** is a text mark in `components/design-system/site-logo.tsx` until brand images are added under `public/` (see comment in that file).
4. **`style.md`** is human design notes; **`site-colors.json`** is the machine source of truth for brand hex in code.

---

## Styling (Tailwind CSS)

- Global CSS: `app/globals.css` (includes React Flow styles).
- Theme: `tailwind.config.js` (reads `site-colors.json`).
- `@tailwindcss/typography` styles MDX via `ui.proseArticle` / `panelProse`.

---

## Where the content lives

- Case studies: `content/case-studies/<slug>/index.mdx` (folder per slug; optional `snippets/`, `assets/`) → `/case-studies/[slug]`
- Interactive widgets for a case live under `components/case-studies/<slug>/` (client components used from MDX).
- Patterns: `content/patterns/*.mdx` → `/patterns`, `/patterns/[slug]`

### CCDAO templates

- `content/templates/case-study-template.mdx`
- `content/templates/pattern-template.mdx`

## Quick links (published articles only)

**Current focus:** one full case study — **board application**. Everything else is a **Planning** card until `status: published`.

- `/case-studies/board-application`

Patterns are stubbed (`status: planning`) until each is written against the board track; no pattern detail URLs are built until then.

Index cards use **Planning**, **Coming soon** (`coming-next`), or **In progress** for non-published content. Set `status: published` when an article is ready to ship.

Compare:

- `/compare/transport-protocols`

The main site’s **logo images** (`logo-brand.png` / `logo-dark.png`) are not in this repo; copy them into `public/` and update `SiteLogo` to match the main app when ready.
