import { notFound } from "next/navigation";

import { RelatedLinksSection } from "@/components/content/related-links-section";
import {
  filterPublishedPatternRefs,
  getCaseStudies,
  getEntrySource,
  getPatterns,
  isPublishedContent,
} from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { resolveRelatedContent } from "@/lib/content/related";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";
import { extractTocHeadings } from "@/lib/content/toc-headings";
import { ArticleToc } from "@/components/content/article-toc";
import { AuthorBio } from "@/components/content/author-bio";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getCaseStudies()
    .filter((entry) => isPublishedContent(entry.frontmatter))
    .map((entry) => ({ slug: entry.slug }));
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const entry = getEntrySource("case-studies", params.slug);
  if (!entry || entry.frontmatter.kind !== "case-study") {
    notFound();
  }

  if (!isPublishedContent(entry.frontmatter)) {
    notFound();
  }

  const mdx = await renderMdx(entry.source);
  const tocHeadings = extractTocHeadings(entry.source);
  const caseStudies = getCaseStudies();
  const patterns = getPatterns();
  const current = caseStudies.find((item) => item.slug === params.slug);
  if (!current) {
    notFound();
  }

  const related = resolveRelatedContent(current, patterns, caseStudies);
  const relatedPatterns = filterPublishedPatternRefs(
    related.patterns,
    patterns,
  );

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

      <AuthorBio />

      <RelatedLinksSection
        title="Related Patterns"
        items={relatedPatterns}
        hrefForSlug={routes.pattern}
      />

      <ArticleToc headings={tocHeadings} documentPath={routes.caseStudy(params.slug)} />
    </>
  );
}
