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
    <>
      <article className={ui.section}>
        <h1 className={ui.pageTitle}>{entry.frontmatter.title}</h1>
        <p>{entry.frontmatter.summary}</p>
        <p>
          <strong className="text-slate-900 dark:text-slate-100">Quick take:</strong>{" "}
          {entry.frontmatter.quickTake.join(" / ")}
        </p>
        <p>
          <strong className="text-slate-900 dark:text-slate-100">
            Production notes:
          </strong>{" "}
          {entry.frontmatter.productionNotes.join(" / ")}
        </p>
      </article>

      <article className={ui.proseArticle}>{mdx}</article>

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
