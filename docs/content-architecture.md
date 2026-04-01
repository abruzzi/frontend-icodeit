# Content Architecture: Pattern Linking + Explorable Blocks

This repository uses frontmatter-driven references to connect case studies and patterns.

**Authoring voice, article flow, and full MDX inventory (`Highlight`, `Callout`, code fences, demos):** see [`docs/case-study-authoring.md`](./case-study-authoring.md). **Doc hub:** [`docs/setup.md`](./setup.md).

## Frontmatter contract

- Case studies declare outbound pattern links in `patternRefs`.
- Patterns can declare curated backlinks in `usedIn`.
- Backlinks are also inferred automatically by scanning case-study `patternRefs`.
- Articles can reference a shared testing + a11y rubric via `testingRubricId` in frontmatter (rendered with the MDX `TestingRubric` component).

## Bidirectional related-content rendering

- Use `resolveRelatedContent()` from `lib/content/related.ts` to compute:
  - `patterns` for case studies.
  - `caseStudies` for patterns (merged from `usedIn` and inferred backlinks).
- Render with:
  - `components/mdx/RelatedContent.tsx` if you already have related data.
  - `components/mdx/RelatedContentFromEntries.tsx` to resolve + render in one step.

## Explorable MDX components

Registered in `components/mdx/mdx-components.tsx` (import names match JSX tags in MDX):

- `BoardDndDemo`, `BoardDataModelDiagram` — board case study interactives.
- `CcdaoFlowDiagram` — CCDAO flow diagram.
- `PaginationMotionDemo`, `TradeoffMatrix`, `ProtocolChooser`, `FailureModeStepper` — explainers and choosers.
- `Callout` — tinted asides (`tone`: `note` | `required` | `pitfall` | `essentials` | `production`).
- `Highlight` — short phrases with decorative magenta underline (`variant`: `underline1`–`underline4`, `zigzag`).
- `TestingRubric` — table from `rubricId` and `lib/content/rubrics.ts` (used with `testingRubricId` in frontmatter).

**Also in the repo (not necessarily wired in MDX):** `ProtocolComparison` (tabs), `FailureModeWalkthrough` (alternate failure-mode presentation). Add them to `mdx-components.tsx` if you need them in content.

## Testing + accessibility rubric

- **`TestingRubric`** (MDX): requires `rubricId`; wraps content in `ui.explainerCard` and shows a message if the id is missing from `lib/content/rubrics.ts`.
- **`TestingA11yRubric`** (programmatic / optional MDX registration): supports `rubricId` or inline `items`, optional `title`; lighter wrapper (section + heading).

Shared presets live in `lib/content/rubrics.ts` (for example `dynamic-list-core`).
