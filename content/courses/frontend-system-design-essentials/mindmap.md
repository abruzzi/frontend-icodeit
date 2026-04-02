---
title: "Frontend System Design Essentials — curriculum mindmap"
description: "Authoring source for the course map; custom tree UI can parse this file later."
---

<!--
  Authoring contract (for a future structured renderer):
  - `##` = pillar (main branch from the center concept). The **first three** pillars render on the **left** of the hub, the rest on the **right** (XMind-style).
  - `###` = topic group under that pillar.
  - `####` = optional sub-group (e.g. Normalisation under State management).
  - `-` directly under `###` (before any `####`) = separate small map nodes under that group.
  - `-` under `####` = tags / pills on that sub-group card.
  - A `###` or `####` with no bullets = topic title only.

  Alternatives you might migrate to later: YAML/JSON tree, MDX with custom
  components, or a small schema (Zod) + validated JSON in this repo.
-->

> **Central concept:** Frontend System Design Essentials

## Data Modelling

### State management

#### Normalisation

- Nested structure
- Flattened structure

### Domain-driven design

- Selectors
- Memoization

### Persistence

- localStorage
- IndexedDB

### Tools / libraries

- Redux
- React context
- Zustand

## Data Mutation

### Form

- Inline editing
- Batch update

### Real-time updates

- WebSockets
- Server-Sent Events (SSE)
- Polling

### State sync mechanism

### Optimistic updates

- Rollback

## Productionalization

### Accessibility

### Internationalization

- Translation

### Observability

- Sentry
- Reporting
- In-house solution

### CDN

### Infrastructure

### CI/CD

- Testing
- Build pipeline
- Deploy pipeline

### Security

- XSS
- CSP
- Sanitization

### SEO

### Error handling

- Error boundary
- Reporting

## Data Fetching

### Caching + prefetching

- In-memory
- Persistent
- Stale-while-revalidate

### Pagination

- Cursor-based
- Offset-based
- Infinite loading

### Request optimisation

- Deduplication
- Cancellation
- Debouncing
- Throttling

## Performance Optimisation

### Perceived performance

- Skeleton
- Loading indicator

### Code split

### Bundling

### Rendering strategies

#### Server-side rendering

#### Client-side rendering

#### Static site generation

- Documentation pages
- Blog posts
- Marketing campaigns

#### Islands architecture

#### Streaming SSR

### Runtime

- Preload
- Lazy loading

### Tools / libraries

- Vite
- Webpack
