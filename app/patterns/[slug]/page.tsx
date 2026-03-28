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
    <>
      <article className={ui.section}>
        <h1 className={ui.pageTitle}>{entry.frontmatter.title}</h1>
        <p>{entry.frontmatter.summary}</p>
        <p>
          <strong className="text-slate-900 dark:text-slate-100">
            Pattern level:
          </strong>{" "}
          {entry.frontmatter.level}
        </p>
      </article>

      <article className={ui.proseArticle}>{mdx}</article>

      <section className={ui.section}>
        <h2 className={ui.sectionTitle}>Used In Case Studies</h2>
        <ul className="space-y-2">
          {related.caseStudies.map((ref) => (
            <li key={ref.slug}>
              <Link
                className={ui.relatedListLink}
                href={`/case-studies/${ref.slug}`}
              >
                {ref.title ?? ref.slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={ui.section}>
        <h2 className={ui.sectionTitle}>Related Patterns</h2>
        <ul className="space-y-2">
          {related.patterns.map((ref) => (
            <li key={ref.slug}>
              <Link className={ui.relatedListLink} href={`/patterns/${ref.slug}`}>
                {ref.title ?? ref.slug}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
