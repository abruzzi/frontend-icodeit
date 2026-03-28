/**
 * Compare pages are authored in code for now (structured props for explainer components).
 * When you add more comparisons, extend this map and `generateStaticParams` will follow.
 * Moving to MDX later would use the same slug keys under `content/compare/`.
 */
export type CompareRow = {
  topic: string;
  optionA: string;
  optionB: string;
  whenBWins: string;
};

export type CompareDoc = {
  title: string;
  rows: CompareRow[];
};

export const COMPARE_DOCS = {
  "transport-protocols": {
    title: "SSE vs WebSocket vs Long Poll",
    rows: [
      {
        topic: "Directionality",
        optionA: "SSE (server -> client)",
        optionB: "WebSocket (bi-directional)",
        whenBWins:
          "Needed for chat input, presence, and collaborative editing.",
      },
      {
        topic: "Operational Simplicity",
        optionA: "Long Poll",
        optionB: "SSE",
        whenBWins:
          "Need lower-latency push while keeping backend simpler than sockets.",
      },
      {
        topic: "Burst Throughput",
        optionA: "SSE",
        optionB: "WebSocket",
        whenBWins: "High-frequency two-way events and acknowledgement loops.",
      },
    ],
  },
} as const satisfies Record<string, CompareDoc>;

export type CompareSlug = keyof typeof COMPARE_DOCS;
