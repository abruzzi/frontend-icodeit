import { notFound } from "next/navigation";

import { ProtocolChooser } from "@/components/explainers/ProtocolChooser";
import { TradeoffMatrix } from "@/components/explainers/TradeoffMatrix";
import {
  COMPARE_DOCS,
  type CompareSlug,
} from "@/lib/compare/docs";
import { ui } from "@/lib/ui";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return (Object.keys(COMPARE_DOCS) as CompareSlug[]).map((slug) => ({
    slug,
  }));
}

export default function ComparePage({ params }: Props) {
  const doc = COMPARE_DOCS[params.slug as CompareSlug];
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
