import Link from "next/link";
import { notFound } from "next/navigation";

import { getCaseStudies, getEntrySource, getPatterns } from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { resolveRelatedContent } from "@/lib/content/related";
import { ui } from "@/lib/ui";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getCaseStudies().map((entry) => ({ slug: entry.slug }));
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const entry = getEntrySource("case-studies", params.slug);
  if (!entry || entry.frontmatter.kind !== "case-study") {
    notFound();
  }

  const mdx = await renderMdx(entry.source);
  const caseStudies = getCaseStudies();
  const patterns = getPatterns();
  const current = caseStudies.find((item) => item.slug === params.slug);
  if (!current) {
    notFound();
  }

  const related = resolveRelatedContent(current, patterns, caseStudies);

  return (
    <main>
      <article className={ui.panel}>
        <h1 className="mt-0 text-3xl font-bold tracking-tight text-neutral-900">
          {entry.frontmatter.title}
        </h1>
        <p>{entry.frontmatter.summary}</p>
        <p>
          <strong>Quick take:</strong>{" "}
          {entry.frontmatter.quickTake.join(" / ")}
        </p>
        <p>
          <strong>Production notes:</strong>{" "}
          {entry.frontmatter.productionNotes.join(" / ")}
        </p>
      </article>

      <article className={`${ui.panel} ${ui.panelProse}`}>{mdx}</article>

      <section className={ui.panel}>
        <h2 className="mt-0 text-xl font-semibold text-neutral-900">Related Patterns</h2>
        <ul>
          {related.patterns.map((ref) => (
            <li key={ref.slug}>
              <Link href={`/patterns/${ref.slug}`}>{ref.title ?? ref.slug}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
