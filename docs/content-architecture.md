# Content Architecture: Pattern Linking + Explorable Blocks

This repository uses frontmatter-driven references to connect case studies and patterns.

## Frontmatter contract

- Case studies declare outbound pattern links in `patternRefs`.
- Patterns can declare curated backlinks in `usedIn`.
- Backlinks are also inferred automatically by scanning case-study `patternRefs`.
- All content uses `testingRubricId` to embed a shared testing + a11y rubric.

## Bidirectional related-content rendering

- Use `resolveRelatedContent()` from `lib/content/related.ts` to compute:
  - `patterns` for case studies.
  - `caseStudies` for patterns (merged from `usedIn` and inferred backlinks).
- Render with:
  - `components/mdx/RelatedContent.tsx` if you already have related data.
  - `components/mdx/RelatedContentFromEntries.tsx` to resolve + render in one step.

## Explorable MDX components

- `TradeoffMatrix`: weighted criteria and option scoring for decision matrices.
- `ProtocolComparison`: tab-based SSE/WebSocket/Long Poll comparison structure.
- `FailureModeWalkthrough`: ordered trigger -> impact -> mitigation -> observability flow.

## Testing + accessibility rubric

- `TestingA11yRubric` accepts either:
  - inline `items`, or
  - `rubricId` (recommended) backed by `lib/content/rubrics.ts`.
- Current shared preset:
  - `dynamic-list-core`
