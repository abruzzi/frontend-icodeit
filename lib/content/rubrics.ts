import type { RubricItem } from "./types";

/** Shared end-of-article rubrics: functional, state, realtime, a11y, and visual/e2e rows. */
export const TESTING_RUBRICS: Record<string, RubricItem[]> = {
  "dynamic-list-core": [
    {
      id: "core-unit-state",
      category: "state",
      level: "unit",
      requirement: "State transitions handle loading, success, empty, and error.",
      doneWhen: "Reducer/state machine tests cover all transitions.",
    },
    {
      id: "core-int-data-contract",
      category: "functional",
      level: "integration",
      requirement: "Client correctly maps API contracts into UI-ready view models.",
      doneWhen: "Contract fixtures pass with no runtime shape mismatch.",
    },
    {
      id: "core-int-keyboard",
      category: "a11y",
      level: "integration",
      requirement: "Full keyboard flow works for primary interaction loop.",
      doneWhen: "Tab/Shift+Tab/Enter/Escape scenarios pass for critical controls.",
    },
    {
      id: "core-e2e-sr-announcements",
      category: "a11y",
      level: "e2e",
      requirement: "Dynamic updates expose meaningful live region announcements.",
      doneWhen: "Manual SR checks validate announcement timing and text quality.",
    },
  ],
  "realtime-collaboration-core": [
    {
      id: "rtc-unit-rendering",
      category: "functional",
      level: "unit",
      requirement:
        "Board (or list) rendering from the client model: columns, ordered cards, empty column, assignee/avatar slots.",
      doneWhen:
        "Tests pin representative output (components or view-model) for a fixture shaped like your snapshot / normalised store.",
    },
    {
      id: "rtc-unit-state",
      category: "state",
      level: "unit",
      requirement:
        "State layer applies moves, optimistic updates, rollbacks, and dedupes by stable intent id (`operationId` or equivalent).",
      doneWhen:
        "Pure reducers, command appliers, or queue reducers are covered for success, failed ack, retry-with-same-id, and duplicate event.",
    },
    {
      id: "rtc-unit-events",
      category: "realtime",
      level: "unit",
      requirement:
        "Inbound event reducer respects ordering, dedupe, and gaps (SSE/WebSocket fan-out, rAF batching if you batch).",
      doneWhen:
        "Tests feed out-of-order, duplicate, and missing events; resulting client model matches a single source of truth.",
    },
    {
      id: "rtc-int-wire",
      category: "functional",
      level: "integration",
      requirement:
        "HTTP + JSON path: snapshot ingest, `POST .../operations`, idempotency header/body, and error payloads (`409`, validation).",
      doneWhen:
        "Contract or MSW-style tests prove the client maps responses without shape drift and surfaces failures to the queue/UI.",
    },
    {
      id: "rtc-int-reconnect",
      category: "realtime",
      level: "integration",
      requirement:
        "After disconnect or long idle: reconnect uses `version` / `seq` (or refetch) so local order cannot diverge silently.",
      doneWhen:
        "Simulated reconnect proves no duplicate cards, no missing moves, and queued ops reconcile or drop under a clear policy.",
    },
    {
      id: "rtc-int-a11y",
      category: "a11y",
      level: "integration",
      requirement:
        "Parallel to pointer drag: keyboard/menu moves, focus visibility, and `aria-live` announcements that match optimistic moves.",
      doneWhen:
        "Automated checks where practical (roles, labels); manual screen-reader pass for timing and wording of status updates.",
    },
    {
      id: "rtc-e2e-visual",
      category: "visual",
      level: "e2e",
      requirement:
        "Critical paths under Playwright (or similar): e.g. drag move, menu move, loading skeleton → board paint, error banner.",
      doneWhen:
        "Visual regression or screenshot baselines in CI stay green for agreed flows; failures triaged as product or flake.",
    },
  ],
  "typeahead-core": [
    {
      id: "ta-unit-debounce",
      category: "functional",
      level: "unit",
      requirement: "Debounce/cancel behavior avoids stale result rendering.",
      doneWhen: "Typing burst tests prove stale response protection.",
    },
    {
      id: "ta-int-combobox",
      category: "a11y",
      level: "integration",
      requirement: "Combobox roles, active descendant, and keyboard bindings are correct.",
      doneWhen: "ARIA combobox checks pass in automated and manual tests.",
    },
    {
      id: "ta-e2e-speech",
      category: "a11y",
      level: "e2e",
      requirement: "Result count and active option are announced clearly.",
      doneWhen: "Screen reader walkthrough validates interaction end-to-end.",
    },
  ],
};
