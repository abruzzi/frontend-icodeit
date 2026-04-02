/**
 * `dot`: fallback anchor as % of the board content area if `[data-board-callout=id]` is missing.
 * `labelEdge` + `labelAlong`: callout title sits in the **gutter** outside the Mac window.
 */
export type BoardLabelEdge = "left" | "right" | "top" | "bottom";

export type BoardDiagramAnnotation = {
  id: string;
  /** Callout number (1–10), order matches the reference diagram. */
  index: number;
  title: string;
  description: string;
  /** Anchor on the UI (percent of image box). */
  dot: readonly [number, number];
  /** Which side of the Mac frame the badge sits on. */
  labelEdge: BoardLabelEdge;
  /** 0–1 along that edge: left/right use top→bottom; top/bottom use left→right. */
  labelAlong: number;
};

export const fsdeBoardDiagramAnnotations: readonly BoardDiagramAnnotation[] = [
  {
    id: "request-search",
    index: 1,
    title: "Request management",
    description:
      "Search ties into debouncing, aborting stale requests, and ignoring out-of-order responses so fast typing does not flash wrong results.",
    /** Centre of the header search field. */
    dot: [25, 10.2],
    labelEdge: "left",
    labelAlong: 0.14,
  },
  {
    id: "a11y-menu",
    index: 2,
    title: "Accessibility",
    description:
      "Card menus need keyboard traps, focus return, and sensible roles so every action is available without a pointer — not just a pretty dropdown.",
    /** `…` menu on the first Backlog card (top row). */
    dot: [30.2, 27.4],
    labelEdge: "top",
    labelAlong: 0.22,
  },
  {
    id: "lazy-list",
    index: 3,
    title: "Lazy loading",
    description:
      "Board vs list can load different bundles or routes so you only pay for the heavier table or virtualization path when the user switches views.",
    dot: [51, 11],
    labelEdge: "top",
    labelAlong: 0.5,
  },
  {
    id: "optimistic-avatar",
    index: 4,
    title: "Optimistic updates",
    description:
      "Avatar and presence can update optimistically so the header feels instant, with a clear path to reconcile or roll back if the server disagrees.",
    dot: [90, 10],
    labelEdge: "top",
    labelAlong: 0.82,
  },
  {
    id: "realtime",
    index: 5,
    title: "Real-time updates",
    description:
      "Tickets can update in place from websockets or polling with ordering rules so remote edits do not fight local edits or optimistic state.",
    dot: [76, 56],
    labelEdge: "right",
    labelAlong: 0.4,
  },
  {
    id: "normalisation",
    index: 6,
    title: "Data normalisation",
    description:
      "Done, In progress, and Backlog all read the same ticket map by id — no duplicated objects drifting out of sync across columns.",
    dot: [84, 40],
    labelEdge: "right",
    labelAlong: 0.2,
  },
  {
    id: "state-column",
    index: 7,
    title: "State management",
    description:
      "What you see in each column is derived from normalized entities and selectors — move a ticket once, and every view stays consistent.",
    dot: [50, 70],
    labelEdge: "bottom",
    labelAlong: 0.5,
  },
  {
    id: "optimistic-add-card",
    index: 8,
    title: "Optimistic updates",
    description:
      "Adding a card can appear in the backlog immediately while the create mutation runs — then replace temp ids with server ids when the response lands.",
    dot: [11, 86],
    labelEdge: "bottom",
    labelAlong: 0.14,
  },
  {
    id: "sanitise-input",
    index: 9,
    title: "Data sanitiser",
    description:
      "New-card text is validated and sanitized before it becomes a mutation payload — fewer XSS surprises and cleaner API contracts.",
    /** “Add a new card…” text field in Backlog (not the + control). */
    dot: [17.8, 86.2],
    labelEdge: "left",
    labelAlong: 0.8,
  },
  {
    id: "pagination",
    index: 10,
    title: "Pagination",
    description:
      "Long columns use windowing, cursors, or “load more” so the DOM and store stay bounded as boards grow.",
    dot: [15, 46],
    labelEdge: "left",
    labelAlong: 0.46,
  },
] as const;
