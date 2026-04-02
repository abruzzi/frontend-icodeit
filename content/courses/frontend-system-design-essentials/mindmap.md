---
title: "Frontend System Design Essentials — curriculum mindmap"
description: "Authoring source for the course map; custom tree UI can parse this file later."
---

<!--
  Outline for your own planning. The landing **topic cloud** uses a curated list
  in `lib/courses/fsde-landing-data.ts` (`fsdeCurriculumCloudLabels`), not this file.
-->

> **Central concept:** Frontend System Design Essentials

## Data Modelling

### State management

#### Data Normalisation

- Nested structure
- Flattened structure

### Domain-driven design

- Memoization

### Persistence


### Tools / libraries

- React context

## Data Mutation

- Inline editing

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

### Observability

### CDN

### Infrastructure

### CI/CD

- Testing
- Build pipeline

### Security

- Sanitization

### Error handling

- Error boundary

## Data Fetching

### Caching + prefetching

- In-memory cache
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

#### Islands architecture

#### Streaming SSR

### Runtime

- Preload
- Lazy loading
