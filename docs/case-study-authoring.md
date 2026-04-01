# Case study & long-form MDX authoring

This guide captures **voice**, **structure**, and **MDX building blocks** established in articles like the board application case study (`content/case-studies/board-application/index.mdx`). Use it when starting the next scenario guide so tone and mechanics stay consistent.

**Related:** [`style.md`](../style.md) §9 (tokens and file layout), [`docs/content-architecture.md`](./content-architecture.md) (frontmatter linking, rubrics), [`content/templates/case-study-template.mdx`](../content/templates/case-study-template.mdx) (copy-paste skeleton).

---

## 1. Audience and goal

- **Who:** Frontend engineers who want **depth**—implementable mental models, not trivia.
- **What success looks like:** A motivated reader can **build, teach, or interview** on the topic; the piece explains **constraints → design → trade-offs**, not a single “correct” architecture.
- **Relationship to interviews:** CCDAO and clarifying questions appear as **organizing lenses**, not as a timed mock. Prefer “here’s what to decide” over performative interview script.

---

## 2. Voice and tone

| Habit | Example |
| -------- | -------- |
| **Direct address** | Use “you” for the reader’s choices; “we” for shared walkthrough of the system. |
| **Honest scope** | State what’s in scope (e.g. frontend-first, local demo before API). |
| **Named concepts** | Link or name patterns (steel thread, LexoRank, Pragmatic DnD) so readers can search further. |
| **Hedged certainty** | “Reasonable split,” “one path I like,” “there isn’t a single best”—then commit to a concrete recommendation for *this* article. |
| **Interview-adjacent without role-play** | Bulleted clarifying questions belong in `<Callout tone="essentials">`, framed as **scope narrowing**, not theater. |
| **Production grounding** | `productionNotes` in frontmatter and sections on reliability, idempotency, and a11y tie UI to real failure modes. |

**Emphasis in prose:** Use markdown `**bold**` for terms and stakes; use *italics* sparingly for contrast. Reserve **semantic HTML** for tables and lists; avoid shouting in all caps.

**`<Highlight>`** (see below) marks **short phrases** that anchor the argument—key nouns or pivot terms—not whole sentences.

---

## 3. Article architecture (recommended flow)

Derived from `case-study-template.mdx` and the board article:

1. **Opening paragraph(s)** — What the product shape is, what the reader will learn, and that the focus is **frontend** (or clearly stated boundaries).
2. **Early concrete widget** — Drop the main interactive demo **before** long theory so the reader has a mental picture (e.g. `<BoardDndDemo />`).
3. **Immediate context** — `<Callout tone="note">` right after a demo to state limitations (e.g. no API yet) and point to later sections.
4. **Split functionality vs cross-functional** — Reliability, performance, a11y as first-class, not an epilogue.
5. **Methodology box** — Steel thread / vertical slice, optional CCDAO map (`<Callout tone="essentials">`).
6. **UI regions** — Happy path, then **loading / error / empty** with small demos where helpful.
7. **Deep dives** — **Data modeling** and **API design** as longest sections; JSON + code fences; link out to pattern pages when a topic has its own home.
8. **Shorter closers** — Performance, trade-off table, common failure modes as bullets or compact tables.
9. **`<TestingRubric rubricId="…" />`** — Align `rubricId` with `testingRubricId` in frontmatter.
10. **Further reading** — External links and, where relevant, the site Patterns index at `/patterns`.

**Code and explanation rhythm:** Introduce a shape or problem in prose → show **`json` / `jsonc` / `jsx` fence** → explain what breaks or what improves → optional **stepper or diagram** component → `<Callout>` for the invariant you don’t want skimmed.

---

## 4. Frontmatter contract

Keep in sync with [`docs/content-architecture.md`](./content-architecture.md):

- **`patternRefs`** — Outbound links to pattern slugs (with optional `reason`).
- **`testingRubricId`** — Must match the `rubricId` passed to `<TestingRubric />` in the body when you use that component.
- **`quickTake` / `productionNotes`** — Two bullets each works well for index cards and editorial discipline.
- **`status`** — Use `planning` / `coming-next` with a minimal body until the article is ready.

Patterns use **`usedIn`** (and optional **`comparePages`**) instead of `patternRefs`; see `content/templates/pattern-template.mdx`.

---

## 5. MDX components (inventory)

All custom tags are registered in [`components/mdx/mdx-components.tsx`](../components/mdx/mdx-components.tsx). **Tag names in MDX match the React export names exactly** (PascalCase).

### 5.1 `<Highlight>`

- **Purpose:** Editorial emphasis with a **magenta SVG underline** (decoration under `public/illustrations/decoration/`).
- **Props:** `variant?` — `underline1` (default), `underline2`, `underline3`, `underline4`, `zigzag`.
- **Usage:** Wrap a **word or short phrase** inside a paragraph. Nested links keep hover styles.

```mdx
A <Highlight variant="underline3">kanban-style board</Highlight> where cards live in columns.
```

### 5.2 `<Callout>`

- **Purpose:** Short asides with icon + tinted surface.
- **`tone`:** `note` | `required` | `pitfall` | `essentials` | `production` (see [`Callout.tsx`](../components/mdx/Callout.tsx)).
- **Optional:** `title` for `aria-label` override.
- **Content:** Markdown paragraphs and lists work inside; keep **one idea per callout** when possible.

| Tone | Typical use |
|------|----------------|
| `note` | Demo caveats, “this section doesn’t cover X yet.” |
| `required` | Hard constraints, anti-patterns (also common in pattern articles). |
| `pitfall` | Misleading mental models, “frontend view ≠ DB schema.” |
| `essentials` | Clarifying questions, CCDAO framing, senior-level reminders. |
| `production` | Rollout, observability, operational bar (use when you want “ship” voice). |

### 5.3 `<TestingRubric rubricId="…" />`

- Renders the shared checklist table from [`lib/content/rubrics.ts`](../lib/content/rubrics.ts).
- **Must** match a known id; pair with frontmatter `testingRubricId`.

### 5.4 Explainers (shared, scenario-agnostic)

- **`CcdaoFlowDiagram`** — CCDAO flow.
- **`TradeoffMatrix`**, **`ProtocolChooser`**, **`FailureModeStepper`**, **`PaginationMotionDemo`** — Use when the scenario needs a generic explainer; register is already in `mdx-components.tsx`.

### 5.5 Case-study-specific demos

- Live under `components/case-studies/<slug>/`.
- Wrap presentation in **`ui.caseStudyDemoShell`** inside the component so MDX **`prose`** does not scale demo typography (`not-prose` is part of that shell in [`lib/ui.ts`](../lib/ui.ts)).
- **Per-demo padding** is set in the component (dense canvas vs form layout).

**Board article examples:** `BoardDndDemo`, `BoardDataModelDiagram`, `BoardNormalisationStepperDemo`, `BoardLoadingSkeletonDemo`, `BoardNetworkFailureDemo`, `BoardEmptyStateDemo`.

### 5.6 Lists (`ul` / `ol` / `li`)

- Custom list rendering: **chevron markers** on `ul`, **numbered** `ol` with optional `start` attribute support.
- Spacing uses **`.mdx-icon-li-*`** in `app/globals.css`—prefer **plain markdown lists** over hand-built flex rows.

### 5.7 Code blocks (`pre` → `MdxPre`)

- Fenced code runs through **Shiki** (see [`lib/content/mdx.tsx`](../lib/content/mdx.tsx)).
- **`json` and `jsonc`** fences render inside a **collapsed `<details>`** (“Show full JSON”) so long payloads don’t dominate the scroll; use them for API/fixture dumps.
- Other languages get the standard toolbar (copy, line numbers per [`ShikiCodeBlockShell`](../components/mdx/ShikiCodeBlockShell.tsx)).

---

## 6. Motion and “alive” UI

- **Page-level:** [`app/template.tsx`](../app/template.tsx) uses **Framer Motion** for route transitions—keep article body motion **subtle** unless the demo is the focal point.
- **Inside demos:** Prefer small, purposeful motion (layout feedback, step transitions). Match **slate borders**, **brand / palette** accents, and **`lucide-react`** stroke **~2–2.25** next to body-sized text.
- **Reduced motion:** If a demo adds looping animation, consider `prefers-reduced-motion` in that component when the motion is decorative (not yet universal in existing demos—apply when adding new ones).

---

## 7. Style guide quick reference (implementation)

| Topic | Source of truth |
|--------|------------------|
| Colors in JSX / MDX | `site-colors.json` → Tailwind `brand`, `palette-*`, `brandDanger` |
| Article column / prose | `ui.mainShell`, `ui.proseArticle`, `ui.proseArticleBody` |
| Demo chrome | `ui.caseStudyDemoShell` |
| Tables / inset explainers | `ui.explainerCard`, `ui.table`, `ui.th`, `ui.td` |
| Typography intent | [`style.md`](../style.md) §4–5 |

Do **not** rely on prose selectors like “first `h2` in article” for spacing—**nested headings inside demos** break that; spacing lives in `ui` tokens.

---

## 8. Checklist: new case study

1. Copy [`content/templates/case-study-template.mdx`](../content/templates/case-study-template.mdx) → `content/case-studies/<slug>/index.mdx`.
2. Add slug-specific clients under `components/case-studies/<slug>/`.
3. Register each component in [`mdx-components.tsx`](../components/mdx/mdx-components.tsx).
4. Set **`patternRefs`** and **`testingRubricId`**; add `<TestingRubric />` near the end.
5. Reuse **`<Callout>`** and **`<Highlight>`** before inventing new ad-hoc boxes.
6. Co-locate **fixtures** under `content/case-studies/<slug>/snippets/` when the article and demos share JSON (see `board-application/snippets/`).

---

## 9. Patterns vs case studies

| | Case study | Pattern |
|---|------------|---------|
| **Shape** | Product scenario, end-to-end | Focused technique or trade-off |
| **Frontmatter** | `patternRefs`, `scenario` | `usedIn`, `level`, optional `comparePages` |
| **Template** | `case-study-template.mdx` | `pattern-template.mdx` |
| **Opening** | Narrative + main demo early | **TL;DR** + decision criteria early |

Both can use the same **Callout**, **Highlight**, **code fence**, and **rubric** machinery.
