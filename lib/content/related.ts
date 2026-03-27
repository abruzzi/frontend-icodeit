import type {
  CaseStudyFrontmatter,
  ContentEntry,
  PatternFrontmatter,
  RelatedRef,
} from "./types";

export type RelatedContent = {
  patterns: RelatedRef[];
  caseStudies: RelatedRef[];
};

function uniqueBySlug(items: RelatedRef[]): RelatedRef[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function asRelatedRef(entry: ContentEntry): RelatedRef {
  return {
    slug: entry.slug,
    title: entry.frontmatter.title,
  };
}

export function resolveRelatedContent(
  current: ContentEntry,
  patterns: ContentEntry<PatternFrontmatter>[],
  caseStudies: ContentEntry<CaseStudyFrontmatter>[],
): RelatedContent {
  if (current.frontmatter.kind === "case-study") {
    return {
      patterns: uniqueBySlug(current.frontmatter.patternRefs),
      caseStudies: [],
    };
  }

  const directRefs = current.frontmatter.usedIn ?? [];
  const inferredBacklinks = caseStudies
    .filter((entry) =>
      entry.frontmatter.patternRefs.some((ref) => ref.slug === current.slug),
    )
    .map(asRelatedRef);

  const linkedPatterns = patterns
    .filter(
      (entry) =>
        entry.slug !== current.slug &&
        entry.frontmatter.tags.some((tag) => current.frontmatter.tags.includes(tag)),
    )
    .slice(0, 3)
    .map(asRelatedRef);

  return {
    patterns: uniqueBySlug(linkedPatterns),
    caseStudies: uniqueBySlug([...directRefs, ...inferredBacklinks]),
  };
}
