---
name: frontend-fsd-ccdao
description: >-
  Produces actionable frontend system design interview outlines using the CCDAO
  framework (Collect, Component structure, Data modeling, API design,
  Optimization), timeboxed timelines, clarifying questions, key challenges, and
  trade-off deep-dives. Use when the user asks for a frontend system design plan,
  mock interview structure, or outlines for apps like boards, streaming,
  editors, feeds, or dashboards; or mentions CCDAO, steel thread, or iterative
  narrowing in system design.
---

# Frontend system design outline (CCDAO)

## Goal

Turn a vague prompt (e.g. “design a board app”, “design Netflix”) into an **actionable interview outline**: CCDAO sections, **time budget**, **questions to ask first**, **what makes this problem hard**, and **optimization / trade-off hooks**—without dumping generic theory.

## Defaults

- Assume a **~45 minute** frontend-focused system design session unless the user says otherwise. Scale minutes proportionally (e.g. 60 min → multiply each block by ~1.33).
- Senior expectation: candidate **drives** the conversation (questions + trade-offs before the interviewer prompts).
- Prefer a **steel thread**: one minimal end-to-end slice that works, then deepen (aligns with iterative narrowing—not building everything at once).

## Workflow (what you do)

1. **Restate the product** in one sentence (user + core job).
2. **Collect**: list **must-ask clarifying questions** (functional + cross-functional). Separate “blockers if unknown” vs “nice to confirm.”
3. **Hypothesize the key challenge**: 2–4 bullets—what domain-specific difficulty will dominate (real-time, consistency, pagination at scale, media, collaboration, offline, permissions, etc.).
4. **CCDAO body outline**: for each phase, give **specific** bullets tied to *this* prompt (not a generic lecture).
5. **Timeline**: minute ranges per phase (use the standard budget below unless adjusted).
6. **Optimization / trade-offs**: 4–8 bullets. Include **when** each matters and **alternatives** (e.g. OT vs CRDT for multi-user editors). Map at least one trade-off to the **actual prompt**.
7. **Next depth targets**: point to **what to read/build next**—user’s own articles, course notes, or public resources—using titles and URLs when known; use Obsidian/wiki links only if the user’s vault is in workspace.

## Standard 45-minute budget (from CCDAO intro)

| Phase | Minutes |
|------|--------:|
| Collect information | 5 |
| Component structure (mockup / UI decomposition) | 5 |
| Data modeling | 10 |
| API design | 10 |
| Optimization strategies | 15 |

**Note:** Optimization often expands (caching, pagination, a11y, loading UX). If time is short, still **name** the trade-offs and defer depth with “if we had 10 more minutes I’d drill into X.”

## Output template (copy and fill)

Use this structure in the reply:

```markdown
# System design outline: [product]

## One-liner
[Who + core job]

## Steel thread (smallest end-to-end slice)
[Concrete first slice the interview can implement/discuss]

## Clarifying questions
### Functional (must decide)
- ...

### Cross-functional (performance, security, a11y, i18n, devices, scale, real-time)
- ...

## What makes this problem hard
- [Challenge 1] → leads to ...
- [Challenge 2] → leads to ...

## CCDAO outline (actionable)

### C — Collect (requirements snapshot)
- Core features: ...
- Out of scope / later: ...

### C — Component structure
- Major UI regions + reusable components: ...
- State ownership (local vs shared vs server): ...
- [Optional] ASCII or bullet “mockup” layout

### D — Data modeling
- Entities + relationships (cardinality): ...
- **Server canonical model** vs **view/UI model** (what you denormalize for lists/cards): ...
- **IDs**: stable resource IDs; **optimistic creates** (temp IDs → reconcile on server): ...
- **Ordering**: list sort source (server vs client); **ties** for pagination cursors: ...
- **Concurrency**: `version` / `etag` / `updatedAt` for “detect conflict”; **patch vs replace**: ...
- **Hot paths** (read-heavy list, write-heavy editor, burst notifications): ...

### A — API design
- **Transport** (REST / GraphQL / WebSocket / SSE) and **why** for this product: ...
- **Representative** resources (nouns) + key operations (verbs / mutations / subscriptions): ...
- **Reads**: pagination/filter/sort contract; **field selection** or BFF if chatty: ...
- **Writes**: idempotency, validation errors shape, **partial update** vs full save: ...
- **Real-time** (if any): event naming, **snapshot + delta**, reconnect strategy: ...
- **Uploads** (if any): direct-to-storage vs through API; metadata vs bytes: ...
- **Auth surface**: how the client attaches identity; **public vs private** resources: ...

### O — Optimization & deep dives
- Performance (bundle, SSR/SSG, lazy loading, virtualization): ...
- Data fetching (SWR/React Query patterns, cache invalidation): ...
- Reliability (errors, retries, empty states): ...
- Collaboration / consistency (if multi-user): ...
- Security (XSS, CSRF, tokens) if relevant: ...

## Suggested timeline ([N] minutes)
| Phase | Time |
|------|------|
| Collect | ... |
| Components | ... |
| Data | ... |
| API | ... |
| Optimization | ... |

## Trade-off menu (pick 2–4 in session)
| Topic | Option A | Option B | When B wins |
|-------|----------|----------|-------------|
| ... | ... | ... | ... |

## Follow-ups / references
- [Topic] → [user note / video / book / doc title + link if available]
```

## CCDAO reminders (keep short)

- **Collect**: functional (features, content types, read vs write, real-time?) + cross-functional (a11y, i18n, devices, scale, security). Ask early; admit unknowns.
- **Component structure**: decomposition, reuse, **where state lives**, data flow; quick sketch is enough.
- **Data modeling**: entities + relationships; **how the client stores** them (normalized map + ordered id lists is a common interview answer); **what is derived** vs fetched; **identity and versioning** for conflicts; tie to pagination/sort.
- **API design**: pick transports per job (CRUD reads vs live channel); **concrete** paths or operations; **pagination + mutation contracts** (errors, idempotency); **upload and auth** only if the prompt needs them.
- **Optimization**: not only speed—**UX under failure**, concurrency, scale, testing/maintainability as needed.

## Data modeling & API design — interview depth (use when outlining)

**Data modeling (frontend angle)**  
Mention at least: **entities + cardinality**; whether the **UI keeps a normalized cache** (by id) vs denormalized **screen DTOs**; **list ordering** (server-sorted feed vs client reorder); **optimistic UI** implications (temp ids, rollback); **conflict** story (version field, last-write-wins, CRDT/OT—pointer only, detail under Optimization if deep).

**API design (contract-level)**  
Mention at least: **resource naming**; **read** patterns (one-shot vs poll vs subscribe); **pagination** shape if lists are large; **write** semantics (PATCH vs PUT; idempotency for “double tap”); **error model** (retryable network vs 4xx validation); **auth** attachment at a high level. For collaborative/real-time prompts, add **event or message** types and **who orders** updates (server sequence number vs CRDT).

For longer checklists, see the **Data modeling** and **API design** sections in [reference.md](reference.md).

## Prompt-specific optimization hooks (examples)

Use these as **triggers** when the prompt matches; add others analogously.

| Prompt flavor | Likely deep dives |
|---------------|-------------------|
| Collaborative doc / “Google Docs” | CRDT vs OT, presence, undo, conflict UX, offline |
| Board (Trello/Kanban) | Optimistic UI, reorder + sync, permissions, activity feed |
| Streaming / “Netflix” | Video pipeline at high level, CDN, player state, continue watching, DRM (mention if relevant) |
| Social feed | Ranking source, infinite scroll vs pages, virtualization, stale-while-revalidate |
| Typeahead / search | Debounce, cancel in-flight, indexing assumptions, highlighting |
| Forms-heavy / wizards | Validation strategy, drafts, autosave, idempotency |

## Iteration discipline (from “small steps”)

- Land a **working slice** first (even crude UI), then layer search, filters, real-time, polish.
- Periodically ask: **“What should I refine next?”** to mirror collaborative interviewing.

## More detail

For expanded question banks and trade-off lists, see [reference.md](reference.md).
