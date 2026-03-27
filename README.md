# icodeit-frontend

Next.js site for **frontend developers** (especially mid-level and up) who want to grow skills for **large, scalable web applications**—not interview cramming. Content is organized as **CCDAO** case studies (real product-shaped scenarios) and **patterns** (reusable techniques, trade-offs, and failure modes).

For the first release, navigation focuses on **case studies** and **patterns**. **Learning paths** (`/learning-paths`) is a placeholder until curated sequences ship.

## Prerequisites

- Node.js (v18+ recommended)
- npm

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

