# icodeit-frontend

Next.js site for **frontend developers** (especially mid-level and up) who want to grow skills for **large, scalable web applications**—not interview cramming. Content is organized as **CCDAO** case studies (real product-shaped scenarios) and **patterns** (reusable techniques, trade-offs, and failure modes).

For the first release, navigation focuses on **case studies** and **patterns**. **Learning paths** (`/learning-paths`) is a placeholder until curated sequences ship.

## Prerequisites

- **Node.js `18.17.0`** (same as the main site in `../icodeit-next`; use `nvm use` with the repo `.nvmrc`)
- npm

Tooling and UI tokens are aligned with **`icodeit-next`**: Next **14.0.x**, React **18.2**, TypeScript **5.0.4**, Tailwind **3.3.2**, PostCSS **8.4.23**, Autoprefixer **10.4.14**, Typography **0.5.9**, brand **`#e23e57`**, **Inter** via `next/font`, **light/dark** gradients on `body` (same classes as the main layout), **`py-20`** content padding, header bar (**sticky**, **backdrop-blur**, border), **centered nav with `gap-6`**, **no-underline** links with **hover → brand**, and **theme toggle** (`next-themes` + icons, same idea as the main site).

The main site’s **logo images** (`logo-brand.png` / `logo-dark.png`) are not in this repo; `SiteLogo` is a text mark until you copy those files into `public/` and swap the component to match `icodeit-next/components/design-system/logo.tsx`.

## Setup

```bash
cd "/Users/juntao/icodeit/icodeit-frontend"
npm install
```

## Run locally (development)

```bash
npm run dev
```

- Dev server: `http://localhost:3000`
- If you make changes to MDX files under `content/`, the pages should refresh automatically.

## Build for production

```bash
npm run build
npm run start
```

After `npm run start`, the site is available at `http://localhost:3000`.

## Lint / checks

```bash
npm run lint
```

## Styling (Tailwind CSS)

The app uses **Tailwind CSS** (with **@tailwindcss/typography** for MDX article styling). Global base styles live in `app/globals.css`. Shared layout tokens (panels, nav, tables) are centralized in `lib/ui.ts` so you can reskin quickly.

- `tailwind.config.js` — content paths and theme extensions
- `postcss.config.js` — Tailwind + Autoprefixer
- **React Flow** (`@xyflow/react`) — flow diagrams in MDX (`CcdaoFlowDiagram`); styles imported in `app/globals.css`
- **Framer Motion** — interactive demos (e.g. `PaginationMotionDemo` for pagination-style motion)
- **Lucide React** — icons in the shell (nav menu, theme toggle) and explainer UIs

## Where the content lives

- Case studies (scenario pages):
  - `content/case-studies/*.mdx`
  - Routes: `/case-studies` and `/case-studies/[slug]`
- Patterns (reusable design pattern pages):
  - `content/patterns/*.mdx`
  - Routes: `/patterns` and `/patterns/[slug]`

### CCDAO templates

- Template: `content/templates/case-study-template.mdx`
- Template: `content/templates/pattern-template.mdx`
- The app renders MDX via `components/mdx/*` (including reusable callouts and rubric components).

## Quick links to the seeded pages

Case studies:
- `/case-studies/feed-list`
- `/case-studies/board-application`
- `/case-studies/chat-application`
- `/case-studies/typeahead-search-experience`
- `/case-studies/video-feed-page`
- `/case-studies/whiteboard-collaboration`

Patterns:
- `/patterns/virtualization-strategies`
- `/patterns/debounce-vs-throttle`
- `/patterns/pagination-offset-cursor-infinite`
- `/patterns/realtime-transport-sse-websocket-long-poll`
- `/patterns/optimistic-ui-rollback`
- `/patterns/a11y-testing-strategy-dynamic-uis`

