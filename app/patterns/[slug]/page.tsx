import { notFound } from "next/navigation";

import { RelatedLinksSection } from "@/components/content/related-links-section";
import { getCaseStudies, getEntrySource, getPatterns } from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { resolveRelatedContent } from "@/lib/content/related";
import { routes } from "@/lib/routes";
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
          <strong className={ui.inlineLabel}>Pattern level:</strong>{" "}
          {entry.frontmatter.level}
        </p>
      </article>

      <article className={ui.proseArticleBody}>{mdx}</article>

      <RelatedLinksSection
        title="Used In Case Studies"
        items={related.caseStudies}
        hrefForSlug={routes.caseStudy}
      />

      <RelatedLinksSection
        title="Related Patterns"
        items={related.patterns}
        hrefForSlug={routes.pattern}
      />
    </>
  );
}
