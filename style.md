# 🎨 Visual Identity & Design Specification: *Frontend I Code It*

## 1. Core Philosophy: "The Integrated Stream"
The site should not feel like a collection of "pages," but a **single, fluid intellectual journey**. 
- **Non-Sectional Navigation:** Navigation is a part of the layout, not a separate "header block."
- **Uniformity:** The design language must be robust enough to bridge the "Lab" (interactive) and the "Main Site" (content/commerce).

---

## 2. Integrated Navigation Architecture (Crucial)
To match the "Josh/Kent" vibe, the navigation must feel "ambient."
- **Zero-Header Layout:** No traditional thick colored bar at the top. 
- **Floating or Inline Nav:** - **Inline:** The logo and links sit directly on the same background as the content, separated only by generous whitespace (`pt-12`).
  - **Floating Dock:** A minimalist, semi-transparent (glassmorphism) dock at the top or bottom that only appears on scroll, or stays anchored within the content margins.
- **Visual Spec:** `backdrop-blur-md` with `bg-slate-900/50`. No hard borders; use a `1px` subtle top/bottom ring.

---

## 3. Color Palette (The "Midnight & Neon" Spectrum)
*Optimized for cross-site reuse (Dark Mode primary, Light Mode compatible).*

| Layer | Hex Code | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Background** | `#0F172A` | `bg-slate-900` | Main site background |
| **Surface/Card** | `#1E293B` | `bg-slate-800` | Component containers, code blocks |
| **Primary Brand** | `#22D3EE` | `text-cyan-400` | Links, primary buttons, highlights |
| **Secondary Brand** | `#C084FC` | `text-purple-400` | Accents, "Success" states |
| **Danger/Error** | `#F43F5E` | `text-rose-500` | Rollbacks, error messages |
| **Typography (Main)** | `#F8FAFC` | `text-slate-50` | Headers and body text |

**Implemented palette (source of truth):** The running site uses **`site-colors.json`** (brand, `brandSecondary`, `brandDanger`, and palette slots **magenta / azure / tangerine / gold / jade**) wired through **`tailwind.config.js`** and **`lib/site-colors.ts`**. Tailwind classes look like `text-brand`, `bg-palette-jade/…`, `text-brandDanger`. Treat the table above as directional “Midnight & Neon” intent; when authoring components or MDX, match **existing** Tailwind tokens rather than reintroducing one-off hex.

---

## 4. Typography (The "Editorial" Stack)
- **Headings (H1, H2, H3):** `Geist Sans` (Bold/Black).
  - **Weight:** `font-extrabold` (800).
  - **Tracking:** `tracking-tighter` (-0.02em).
- **Body Text:** `Inter` (Regular/Medium).
  - **Size:** `18px` (`text-lg`) base size.
  - **Leading:** `leading-relaxed` (1.75) — *Key for long-form articles.*
- **Code:** `JetBrains Mono`. ligatures enabled.

---

## 5. Spacing & Layout (The "Josh Comeau" Ratio)
- **Single Column Flow:** Content width `max-w-4xl` (56rem / 896px) via `ui.mainShell`. 
- **The "Breathing" Room:** - Top padding for content: `pt-24` to `pt-32` (8rem+).
  - Vertical Rhythm: `mb-8` for paragraphs; `mt-16` for H2s.
- **Symmetry:** Ensure the main site (`icodeit.com.au`) uses the same margins to allow for seamless cross-linking.

---

## 6. UI Components & Effects
- **Soft-Diffuse Shadows:** `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)`.
- **Rounded Corners:** `rounded-3xl` (24px) for all primary containers/cards.
- **Glassmorphism:** Use `bg-opacity-50` and `backdrop-blur` for all overlay elements (Nav, Modals).

---

## 7. Interaction & Motion (Framer Motion)
- **Entrance:** Content should "float" up on load.
  - `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
- **Micro-interactions:** Subtle `scale: 1.02` on card hovers.
- **Springs:** `stiffness: 260, damping: 20`.

---

## 8. Cross-Site Reusability Spec
To ensure `frontend.icodeit.com.au` and `icodeit.com.au` look like siblings:
1.  **Shared Tailwind Config:** Copy the `colors`, `fontFamily`, and `borderRadius` sections exactly between both projects.
2.  **Shared Components:** Extract the `Nav`, `Footer`, and `Card` components into a structure that can be shared or replicated.
3.  **Global CSS:** Use the same CSS reset and custom scrollbar styles (thin, slate-700).

---

## 9. Case studies & MDX: reusable patterns (board application track)

This section distills what we standardized while building the **board application** case study so the next article can **reuse the same components, tokens, and habits** without rediscovering them.

### 9.1 Where things live

| What | Where |
| :--- | :--- |
| Article body | `content/case-studies/<slug>/index.mdx` |
| Slug-specific interactives (client components) | `components/case-studies/<slug>/` |
| Register MDX tags → React | `components/mdx/mdx-components.tsx` |
| Layout / surface class strings | `lib/ui.ts` |
| Brand + diagram accent hex | `site-colors.json` → Tailwind + `lib/site-colors.ts` |
| Shared testing table data | `lib/content/rubrics.ts` + `<TestingRubric rubricId="…" />` |
| Authoring checklist (frontmatter, flow) | `content/templates/case-study-template.mdx` |

### 9.2 Layout and prose (always prefer `ui`)

- **Page column:** `ui.mainShell` (max width, padding, vertical gaps between major blocks).
- **Article typography:** `ui.proseArticle` or `ui.proseArticleBody` (prose + heading hierarchy + link styling). Do **not** target the first `h2` with prose-only selectors for “section spacing”—nested headings inside demos will break that; spacing is already encoded in the prose tokens.
- **Index / marketing cards:** `ui.panel`, `ui.panelProse`, `ui.indexGrid`, etc., as on the home and listing pages.
- **Interactive demo wrapper:** `ui.caseStudyDemoShell` for the shared border / background / shadow; add **per-demo padding** in the component (e.g. `p-4 sm:p-6` vs `p-2 sm:p-3`) so dense canvases and form-like demos can differ.
- **Inset explainer blocks (tables, rubrics):** `ui.explainerCard`.
- **Tables:** `ui.table`, `ui.th`, `ui.td` (see `TestingRubric` / `TestingRubricTable`).

### 9.3 MDX building blocks to reuse

- **`<Callout tone="…">`** — Short asides; tones: `note`, `required`, `pitfall`, `essentials`, `production`. Icons and light washes come from **`site-colors.json`** palette / brand tokens (see `components/mdx/Callout.tsx`). Use for constraints, warnings, or “production mode” callouts instead of ad-hoc bordered divs.
- **`<TestingRubric rubricId="…" />`** — End-of-article rubric; ids live in `lib/content/rubrics.ts`. Set `testingRubricId` in frontmatter for consistency with related content tooling where applicable.
- **Lists** — MDX `ul` / `ol` / `li` are overridden in `mdx-components.tsx` (chevron markers, numbered lists); spacing is tuned with **`globals.css`** (`.mdx-icon-li-*`). Prefer normal markdown lists over custom markup.
- **Explainers** already registered for MDX include `CcdaoFlowDiagram`, `TradeoffMatrix`, `ProtocolChooser`, `FailureModeStepper`, `PaginationMotionDemo`, plus board-specific **`BoardDndDemo`** and **`BoardDataModelDiagram`**. To add a new widget: implement the component, export it, add one line to `mdxComponents`.

### 9.4 Styling conventions inside demos

- **Escape prose:** Wrapper for widgets that carry their own typography should include **`not-prose`** (composed into `caseStudyDemoShell`) so `prose-lg` from the article does not inflate demo text.
- **Neutrals:** Slate scales with light opacity for borders (`border-slate-200/90`, `dark:border-slate-600/50`) match the rest of the site.
- **Accents:** Prefer **`palette-*`** and **`brand*`** Tailwind colors for highlights (drop targets, diagram nodes, links inside demos: `text-brand` + underline pattern used in board copy).
- **Icons:** `lucide-react`; keep stroke weight consistent with MDX list markers (~2–2.25) where it sits next to body text.

### 9.5 Frontend implementation habits (from the board demos)

- **Client boundary:** Any hook, browser-only API, or drag-and-drop subscription gets **`"use client"`** at the top of the file (e.g. Pragmatic DnD, React Flow, `useTheme`).
- **Single source for magic strings:** Drag payload **type discriminators**, external **doc URLs**, and **demo asset bases** (e.g. avatar URL prefix) should be **named constants** at module scope so type guards and `getInitialData` stay aligned.
- **Types and sample data:** Export **TypeScript types** and optional **initial snapshot constants** (e.g. `BoardSnapshot`, `DEMO_INITIAL_BOARD`) when the article text refers to the same shapes—readers and maintainers stay in sync.
- **Theme-aware canvases:** If a diagram depends on light/dark, use **`next-themes`** (`resolvedTheme`), a **mounted** flag to avoid hydration mismatch, and derive edge/label colors in one place (e.g. `edgesForTheme(isDark)`).
- **Accessibility:** Meaningful **`aria-label`** on regions that are icon-led (`Callout`); **`aria-hidden`** on decorative icons; **`alt=""`** for decorative avatars in demos when the name is adjacent text.

### 9.6 Checklist: starting the next case study article

1. Copy **`content/templates/case-study-template.mdx`** into `content/case-studies/<slug>/index.mdx` and fill frontmatter (`status`, `patternRefs`, `testingRubricId`, etc.).
2. Add **`components/case-studies/<slug>/…`** only for **slug-specific** interactives; keep shared MDX primitives in `components/mdx/` or `components/explainers/`.
3. Register new components in **`components/mdx/mdx-components.tsx`**.
4. Wrap new demos with **`${ui.caseStudyDemoShell} …`** (plus `not-prose` via the shell) unless the demo is intentionally full-bleed prose.
5. Reuse **`<Callout>`**, **`ui.explainerCard`**, and **rubric** patterns before inventing new visual treatments.
6. For any new **global** visual token, extend **`site-colors.json`** and consume via Tailwind—avoid hard-coding hex in JSX except where a third-party canvas requires raw colors (document why in a comment).

Related: **`README.md`** (architecture table), **`docs/content-architecture.md`** (MDX registry and rubrics).
