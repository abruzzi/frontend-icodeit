import type { RubricItem } from "./types";

export const TESTING_A11Y_RUBRICS: Record<string, RubricItem[]> = {
  "dynamic-list-core": [
    {
      id: "core-unit-state",
      category: "functional",
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
      id: "rtc-unit-ordering",
      category: "functional",
      level: "unit",
      requirement: "Incoming events respect sequence and dedupe semantics.",
      doneWhen: "Out-of-order, duplicate, and missing event tests are all covered.",
    },
    {
      id: "rtc-int-reconnect",
      category: "functional",
      level: "integration",
      requirement: "Reconnect path correctly hydrates snapshot and applies deltas.",
      doneWhen: "Reconnect test proves no duplicate rows or missing updates.",
    },
    {
      id: "rtc-int-live-region",
      category: "a11y",
      level: "integration",
      requirement: "Live updates are announced without overwhelming screen readers.",
      doneWhen: "Announcement batching and wording pass manual SR checks.",
    },
    {
      id: "rtc-e2e-focus",
      category: "a11y",
      level: "e2e",
      requirement: "Focus remains stable when real-time updates occur.",
      doneWhen: "Keyboard-only user can continue primary task uninterrupted.",
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
