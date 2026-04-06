# CCDAO reference — questions, trade-offs, links

## Collect — functional questions

- What is the **one** core user journey we should nail first (steel thread)?
- Primary actions vs secondary (favorites, sharing, admin)?
- Content types: text, images, video, binary uploads?
- Interaction model: **read-mostly** vs **read/write** vs **heavy collaboration**?
- Real-time: needed or not? (live cursors, notifications, game state, chat)
- Multi-user: same document/board or isolated workspaces?
- Offline or “spotty network” in scope?

## Collect — cross-functional questions

- Target devices: mobile / tablet / desktop?
- Accessibility and internationalization expectations?
- Scale hint: DAU, items per screen, total library size, write rate?
- Performance bar: p95 interaction latency, SEO needs?
- Security: auth model, PII, sharing links, role-based access?
- Compliance / region constraints (if any)?

## Data modeling — deeper checklist

- **Entities & relationships**: name core tables/documents; 1:1, 1:N, N:M (join or embedded ids).
- **Canonical vs display**: e.g. `User` vs `AuthorSummary` on a card—what you duplicate for fewer round-trips.
- **Client store shape**: map by `id` + `allIds` / per-column lists; where **order** lives (server cursor vs client-only).
- **Identity**: UUIDs; **client-generated** ids for offline/optimistic create; merge strategy when server returns canonical id.
- **Timestamps & versioning**: `updatedAt`, revision counter, etag—how UI detects stale data or conflicts.
- **Writes**: full-document save vs **field-level** patches; debounced autosave vs explicit save (editors).
- **Derived state**: memoized selectors vs store denormalization; invalidate when X changes.
- **Large payloads**: references vs inlined blobs; lazy-load heavy fields when opening detail.

## API design — deeper checklist

- **Resource layout**: flat `/items/:id` vs nested `/boards/:boardId/cards`; implications for cache keys and invalidation.
- **Reads**: query params for filter/sort/page size; **cursor** opaque string vs offset; consistency statement (“might see duplicates under heavy write”—if relevant).
- **GraphQL** (if chosen): one round-trip vs N+1 risk; mutations that return **affected queries** or normalized payloads.
- **Batching**: `GET /items?ids=…` or composite endpoints to avoid waterfalls—name the client pattern (parallel fetch, staggered).
- **Mutations**: idempotency keys; **422** validation body shape; optimistic rollback triggers.
- **Real-time**: WebSocket messages or SSE event types; **subscribe** scoped by resource; snapshot on connect + live updates.
- **Uploads**: presigned URL flow; progress; virus scan / async processing callback (high level).
- **AuthN/Z**: Bearer vs cookie; **403** vs **404** for hidden resources; role checks on which mutations exist.
- **Rate limits / resilience**: exponential backoff; dedupe in-flight GETs; cancel stale requests (search/typeahead).

## Feed / timeline / activity list — deeper checklist

Use for **social home timelines**, **notification feeds**, **activity streams**, or any **infinite list** where ordering and freshness dominate.

### Collect (feed-specific)

- Is the feed **strictly chronological**, **algorithmic**, or **blended**? Who owns the rank (service vs client sort of a small window)?
- **Real-time**: must new posts appear **live** at the top, or is periodic refresh enough?
- **Multiplicity**: one global feed vs per-user vs per-space; **following** graph implied?
- **Content types**: text-only cards vs rich media (lazy thumbnails, aspect ratio, autoplay rules).

### Data modeling (feed-specific)

- **Item identity**: stable `postId` / `activityId`; dedupe when the same entity appears twice (reshare, cross-post).
- **Ordering key**: `sortKey` / `(timestamp, id)` for stable ties; implications for **cursor** encoding.
- **Embedded vs referenced author**: `AuthorSummary` on the card vs join on open; stale avatar display policy.
- **Tombstones**: deleted or moderated items—remove from cache, show placeholder, or refetch page?

### API design (feed-specific)

- **Pagination**: cursor-based `nextCursor` (opaque) vs offset (usually bad under writes); document **possible duplicates** under concurrent inserts if honest.
- **Prefetch**: next page when near end of list; cancel if user navigates away.
- **Mutations that affect the feed**: like/unlike, delete—does the API return **patch hints** or does the client invalidate the list?
- **Live channel**: SSE/WebSocket event types (`new_item`, `item_updated`); snapshot on reconnect vs gap-fill.

### Optimization & UX (feed-specific)

- **Virtualization**: windowed list; estimated row height vs measure; scroll jump when heights vary (images).
- **Scroll anchoring**: new items **prepended** without losing the reader’s position (or explicit “new posts” bar).
- **Loading UX**: skeleton first screen; **stale-while-revalidate** for return visits; empty vs error vs end-of-feed states.
- **Backpressure**: slow network + fast scroll; cap in-flight page requests; debounce pull-to-refresh.

### State & sync (written deep dives — pairs with CCDAO “optional S”)

- Merge **server pages** with **optimistic** local posts; reconcile when `POST` returns canonical id.
- **Out-of-order** responses: tie-break with request id or ignore stale page if cursor advanced.
- Use the **same terms** in outline, API sketch, and state section (cursor, item id, version).

## Common trade-off grid (frontend system design)

| Area | Typical tension | Interview talking points |
|------|-----------------|---------------------------|
| Pagination | Offset vs cursor | Consistency under writes, deep pages, UX |
| Long lists | Infinite scroll vs windowed virtualization | Memory, scroll position, SEO |
| Client state | Normalized vs denormalized | Update complexity vs render simplicity |
| Fetching | Bulk vs incremental / lazy | Waterfalls, stale data, prefetch |
| Mutations | Optimistic vs pessimistic | Rollback, idempotency, conflict handling |
| Collaboration | CRDT vs OT vs last-write-wins | Complexity, offline, intent preservation |
| Real-time | WebSocket vs SSE vs polling | Direction, infra, fallback |
| API shape | REST vs GraphQL | Over-fetching, batching, cache keys |

## Author’s public materials (for “follow-up” links)

Use in skill output when relevant:

- Newsletter / articles: [juntao.substack.com](https://juntao.substack.com) (e.g. navigating frontend system design, CCDAO intro)
- Books: *React Anti-Patterns* (Packt); data-fetching / maintainable React titles on Leanpub (see user’s video resource lists)
- Video script reference: “Introducing the CCDAO Framework” (I Code It / course materials—user vault path often under `Projects/The Pragmatic Developer/Frontend System Design 001 - The overview/`)

## Vault paths (Juntao’s Obsidian layout)

If this workspace is the vault, deep dives often live under:

- `Projects/The Pragmatic Developer/Frontend System Design 001 - The overview/` — Introduction, FSD-001/FSD-002 CCDAO, interview question notes (slider, typeahead, tree, DnD, etc.)
- `Projects/The Pragmatic Developer/` — TPD design challenges, blog drafts
- `Projects/I Code It - Youtube Channel/` — course plans, essentials

Point the user to **specific note titles** when a topic matches (pagination, useEffect pitfalls, infinite scroll)—do not fabricate note contents.
