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
          <strong className={ui.inlineLabel}>Quick take:</strong>{" "}
          {entry.frontmatter.quickTake.join(" / ")}
        </p>
        <p>
          <strong className={ui.inlineLabel}>Production notes:</strong>{" "}
          {entry.frontmatter.productionNotes.join(" / ")}
        </p>
      </article>

      <article className={ui.proseArticleBody}>{mdx}</article>

      <RelatedLinksSection
        title="Related Patterns"
        items={related.patterns}
        hrefForSlug={routes.pattern}
      />
    </>
  );
}
