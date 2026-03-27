import { notFound } from "next/navigation";

import { ProtocolChooser } from "@/components/explainers/ProtocolChooser";
import { TradeoffMatrix } from "@/components/explainers/TradeoffMatrix";
import { ui } from "@/lib/ui";

const COMPARE_DOCS = {
  "transport-protocols": {
    title: "SSE vs WebSocket vs Long Poll",
    rows: [
      {
        topic: "Directionality",
        optionA: "SSE (server -> client)",
        optionB: "WebSocket (bi-directional)",
        whenBWins: "Needed for chat input, presence, and collaborative editing.",
      },
      {
        topic: "Operational Simplicity",
        optionA: "Long Poll",
        optionB: "SSE",
        whenBWins: "Need lower-latency push while keeping backend simpler than sockets.",
      },
      {
        topic: "Burst Throughput",
        optionA: "SSE",
        optionB: "WebSocket",
        whenBWins: "High-frequency two-way events and acknowledgement loops.",
      },
    ],
  },
} as const;

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return Object.keys(COMPARE_DOCS).map((slug) => ({ slug }));
}

export default function ComparePage({ params }: Props) {
  const doc = COMPARE_DOCS[params.slug as keyof typeof COMPARE_DOCS];
  if (!doc) {
    notFound();
  }

  return (
    <>
      <article className={ui.panel}>
        <h1 className={ui.pageTitle}>{doc.title}</h1>
        <p>
          Use this page as a quick decision aid, then jump into related case
          studies and patterns for implementation details.
        </p>
      </article>
      <TradeoffMatrix rows={doc.rows} />
      <ProtocolChooser />
    </>
  );
}
