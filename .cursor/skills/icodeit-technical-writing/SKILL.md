---
name: icodeit-technical-writing
description: >-
  Writes and edits deep technical articles (MDX case studies, patterns, courses) in the icodeit
  voice: clear prose, CCDAO-style structure, callouts and demos used deliberately, code snippets
  that teach, and practical fixes for MDX/TS/common language issues. Use when drafting or
  revising long-form frontend architecture content, case studies, or when the user asks for tone,
  structure, callout vs demo, or consistency with existing icodeit articles.
---

# icodeit technical writing (deep articles & MDX)

## Goal

Produce **depth-first** technical writing that reads like a senior engineer explaining **trade-offs** and **steel threads**, not a tutorial that only lists steps. Match the patterns used in **board case study**–style content: narrative prose, selective callouts, **Restful** API panels, **live demos** (Pragmatic DnD, React Flow), and **cross-links** between sections (data modeling ↔ API ↔ state ↔ optimisation).

For **mock interview outlines** (timeboxed CCDAO, clarifying questions, trade-off menus), use **`frontend-fsd-ccdao`** first; use this skill when turning that outline into publishable MDX.

---

## Tone and voice

1. **Complete sentences, high signal** — Prefer one clear sentence over three fragments. Cut filler (“basically”, “really”, “it is important to note that”) unless it softens a hard claim.

2. **British English for prose** — Use **behaviour**, **normalised**, **optimisation** in body copy unless a heading or code type uses American spelling (`NormalizedBoard` in TypeScript). **Stay consistent** within a single document: do not mix “normalise” in prose with “normalize” in prose.

3. **Address the reader sparingly** — “You might…”, “In practice…” are fine; avoid constant “we” unless it is genuinely author + reader.

4. **Name the trade-off** — Good: “The logic is correct; the problem is **scalability**.” Bad: only praising the happy path.

5. **Concrete before abstract** — Start with something **touchable** (fixture, demo, diagram), then generalise (APIs, state, queues). Same idea as **steel thread**: thinnest slice first, then widen.

6. **Qualify absolutes** — “Usually”, “often”, “in many codebases” beat “always” / “never” unless the claim is genuinely universal.

7. **External links** — Prefer authoritative docs (MDN, vendor design systems) and **icodeit** posts when relevant; full URLs in prose per project rules.

---

## Structural patterns (when to use what)

### Narrative spine (CCDAO-style arcs)

Long case studies often follow: **Collect / UI** → **Data modeling** → **API design** → **State management** → **Optimisation** (or equivalent). Each major section should:

- **Point back** to earlier decisions (“We already sketched this in **Data modeling**”).
- **Foreshadow** what comes next (“The next section goes deeper into…”).

### Paragraphs vs lists

- **Prose** for argument, causality, and trade-offs.
- **Bulleted lists** for parallel requirements, interview questions, or scan-friendly checklists.
- **Numbered lists** only for **sequences** (steps, ordering, lifecycle phases) — not for decoration.

### Code snippets

| Use | When |
|-----|------|
| **`ts` / `tsx`** | Types, interfaces, hooks, **illustrative** components (not full app code). Prefer **minimal** signatures; name types (`User`, `BoardPayload`) without full imports if obvious. |
| **`json` / `json show`** | Fixtures, API bodies, **normalised** snapshots. Use `jsonc` only when comments are essential (explain in prose if possible). |
| **`js`** | Express-style **one-liner routes** as **illustration only** — align path style (`/api/...`) with **Restful** panels in the same article. |
| **Inline `` `code` ``** | Short identifiers, HTTP verbs, status codes, field names. |

**Path consistency:** If the article uses **`GET /api/boards/:boardId`** in Restful blocks, Express and EventSource examples should use the **same** `/api/boards/...` convention — readers notice drift.

### `<Restful>` (Request / Response)

- Use for **API reference** blocks: one endpoint, **Request** and/or **Response** with **Shiki**-highlighted JSON.
- Avoid duplicating the **same** JSON in a separate fence **below** the panel.
- Keep **description** on `<Restful>` for one-line intent; put details in surrounding prose.

### Callouts (`<Callout tone="…">`)

| Tone | Use when |
|------|----------|
| **`note`** | Short definitions, clarifications, “what SSE/WebSocket is” without derailing the main section. |
| **`essentials`** | Interview tips, **must-ask** questions, high-signal bullets readers should save. |
| **`pitfall`** | Common mistakes, anti-patterns, “do not assume…”. |
| **`aside`** | Optional depth, MDN links, **IntersectionObserver** tangents — “if you want to read more.” |
| **`required`** | Non-negotiables: prerequisites, constraints the design **must** satisfy, rubric-style “you need this before…” |
| **`production`** | Real deployment concerns: observability, retries, backpressure, hardening — distinct from interview “essentials”. |

**Rule:** If a paragraph is **already** a strong warning, a **pitfall** callout can repeat it — **merge** into one surface (callout **or** prose).

### Live demos (`Board*Demo`, React Flow)

- **Interactive demo** when **gesture or spatial layout** matters (DnD, drag vs click, SSE topology, ER diagram, command lifecycle flow).
- **Static or stepped demo** when the story is **sequence** or **state machine** (normalisation stepper).
- Wrap with **`withDemoErrorBoundary`** via `mdx-components` registration; **do not** wrap async Restful children.
- **Align copy with demo labels** — e.g. if the article standardises **`POST /api/boards/:boardId/operations`**, the SSE demo’s mutator label should match, not a one-off path.

### Diagrams (React Flow)

- **Read-only** pipelines: `nodesDraggable={false}`, pan/zoom enabled, short caption + optional **ordered list** under the canvas for accessibility and print.
- Reuse **shared chrome** (`board-demo-shared`, `ui.caseStudyDemoShell`) for visual consistency with other case studies.

---

## Article-level checklist

- [ ] **Front matter** — `title`, `summary`, `lastEdited`, `tags`, `kind` where applicable.
- [ ] **Terminology** — One spelling for **normalised/normalized** in prose; **API paths** consistent across fences, Restful, and demos.
- [ ] **Cross-references** — Zombie card, **operationId**, **409**, command queue — **same terms** in data modeling, API, and state sections.
- [ ] **Typecheck** — `npx tsc --noEmit` after MDX-adjacent component changes.
- [ ] **Prose in code** — Avoid `console.log` in “production-oriented” snippets; prefer comments or `console.error` with context.

---

## Fixing common issues

### MDX / parsing

- **Raw `{` in JSX-looking content** — MDX parses `{` as expression. Escape with **fenced code**, **HTML entities** (avoid in prose), or **template literals** in examples.
- **Nested fenced JSON inside `<Response>`** — Sometimes skips unified Shiki; **use async `RestfulRequest` / `RestfulResponse`** with server-side Shiki (`highlightCodeForRestfulPanel`) so tokens always highlight.

### TypeScript / components

- **Stale closures in `useCallback` / `useEffect`** — Prefer **single state object** or **functional updates** when two pieces of state must update together (e.g. `todoIds` + `doingIds`).
- **Imports** — Alphabetise **local** imports in large registries (`mdx-components`) for maintainability.

### Language (ESL / editing)

| Issue | Fix |
|-------|-----|
| Typos | `begining` → **beginning**; `discssed` → **discussed**; `propogate` → **propagate**; `libaraies` → **libraries**; `comparasion` → **comparison**; `techinical` → **technical** |
| Wordiness | “how the data looks like” → **“what the data looks like”** or **“the shape of the data”** |
| **it’s / its** | **it’s** = it is; **its** = possessive |
| **a vs an** | **an** before vowel **sound**; **a** before consonant sound |
| Run-on sentences | Split into two sentences or use **em-dash** for one tight aside |

### Tone fixes

- **Marketing adjectives** — Replace “powerful”, “revolutionary” with **specific** benefits (e.g. “deduplicate retries with `operationId`”).
- **Overclaim** — “Always reflects the latest” → **“can** reflect **if** ordering / reconciliation is defined” — **honest** under concurrency.

---

## What not to do

- Do not **duplicate** the same JSON or bullet list in **three** places (prose + Restful + fence) — **one source of truth** + cross-reference.
- Do not add **live demos** for every paragraph — **fatigue**; use for **spatial**, **sequence**, or **comparison** stories.
- Do not **drive-by refactor** unrelated code when editing articles — **minimal diff** per task.

---

## Quick reference: “explain this concept”

1. **Name the problem** in one sentence (e.g. out-of-order responses).
2. **Give a concrete scenario** (three quick drags, late ACK).
3. **Offer the pattern** (command queue, id, reconcile).
4. **Caveat** the boundary (server moved, 409, invalid inverse).
5. **Link** to earlier section or demo **by name**.

This mirrors how **state management** and **command queue** sections were built in the board article: problem → mechanism → honesty → link.
