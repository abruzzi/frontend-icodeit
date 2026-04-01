import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { RelatedLinksSection } from "@/components/content/related-links-section";
import {
  filterPublishedCaseStudyRefs,
  filterPublishedPatternRefs,
  getCaseStudies,
  getEntrySource,
  getPatterns,
  isPublishedContent,
} from "@/lib/content";
import { renderMdx } from "@/lib/content/mdx";
import { resolveRelatedContent } from "@/lib/content/related";
import { extractTocHeadings } from "@/lib/content/toc-headings";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";
import { ArticleToc } from "@/components/content/article-toc";
import { AuthorBio } from "@/components/content/author-bio";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntrySource("patterns", params.slug);
  if (!entry || entry.frontmatter.kind !== "pattern") {
    return {};
  }
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.summary,
    alternates: { canonical: routes.pattern(params.slug) },
    openGraph: {
      type: "article",
      url: routes.pattern(params.slug),
      title: entry.frontmatter.title,
      description: entry.frontmatter.summary,
      images: [{ url: "/assets/juntao.qiu.avatar.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.frontmatter.title,
      description: entry.frontmatter.summary,
      images: ["/assets/juntao.qiu.avatar.webp"],
    },
  };
}

export function generateStaticParams() {
  return getPatterns()
    .filter((entry) => isPublishedContent(entry.frontmatter))
    .map((entry) => ({ slug: entry.slug }));
}

export default async function PatternDetailPage({ params }: Props) {
  const entry = getEntrySource("patterns", params.slug);
  if (!entry || entry.frontmatter.kind !== "pattern") {
    notFound();
  }

  if (!isPublishedContent(entry.frontmatter)) {
    notFound();
  }

  const mdx = await renderMdx(entry.source);
  const tocHeadings = extractTocHeadings(entry.source);
  const patterns = getPatterns();
  const caseStudies = getCaseStudies();
  const current = patterns.find((item) => item.slug === params.slug);
  if (!current) {
    notFound();
  }
  const related = resolveRelatedContent(current, patterns, caseStudies);
  const relatedCaseStudies = filterPublishedCaseStudyRefs(
    related.caseStudies,
    caseStudies,
  );
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
          <strong className={ui.inlineLabel}>Pattern level:</strong>{" "}
          {entry.frontmatter.level}
        </p>
      </article>

      <article className={ui.proseArticleBody}>{mdx}</article>

      <AuthorBio />

      <RelatedLinksSection
        title="Used In Case Studies"
        items={relatedCaseStudies}
        hrefForSlug={routes.caseStudy}
      />

      <RelatedLinksSection
        title="Related Patterns"
        items={relatedPatterns}
        hrefForSlug={routes.pattern}
      />

      <ArticleToc headings={tocHeadings} documentPath={routes.pattern(params.slug)} />
    </>
  );
}
