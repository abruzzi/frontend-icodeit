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
  return getPatterns().map((entry) => ({ slug: entry.slug }));
}

export default async function PatternDetailPage({ params }: Props) {
  const entry = getEntrySource("patterns", params.slug);
  if (!entry || entry.frontmatter.kind !== "pattern") {
    notFound();
  }

  const mdx = await renderMdx(entry.source);
  const patterns = getPatterns();
  const caseStudies = getCaseStudies();
  const current = patterns.find((item) => item.slug === params.slug);
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
          <strong>Pattern level:</strong> {entry.frontmatter.level}
        </p>
      </article>

      <article className={`${ui.panel} ${ui.panelProse}`}>{mdx}</article>

      <section className={ui.panel}>
        <h2 className="mt-0 text-xl font-semibold text-neutral-900">
          Used In Case Studies
        </h2>
        <ul>
          {related.caseStudies.map((ref) => (
            <li key={ref.slug}>
              <Link href={`/case-studies/${ref.slug}`}>
                {ref.title ?? ref.slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
