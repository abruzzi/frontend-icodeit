import type {
  CaseStudyFrontmatter,
  ContentEntry,
  ContentStatus,
  PatternFrontmatter,
  RelatedRef,
} from "./types";
import { isPublishedContent } from "./types";

export function filterPublishedPatternRefs(
  refs: RelatedRef[],
  patterns: ContentEntry<PatternFrontmatter>[],
): RelatedRef[] {
  const published = new Set(
    patterns
      .filter((p) => isPublishedContent(p.frontmatter))
      .map((p) => p.slug),
  );
  return refs.filter((r) => published.has(r.slug));
}

export function filterPublishedCaseStudyRefs(
  refs: RelatedRef[],
  caseStudies: ContentEntry<CaseStudyFrontmatter>[],
): RelatedRef[] {
  const published = new Set(
    caseStudies
      .filter((c) => isPublishedContent(c.frontmatter))
      .map((c) => c.slug),
  );
  return refs.filter((r) => published.has(r.slug));
}

const STATUS_ORDER: Record<ContentStatus, number> = {
  published: 0,
  "coming-next": 1,
  "in-progress": 2,
  planning: 3,
};

export function sortByPublishStatusThenTitle<
  T extends
    | ContentEntry<CaseStudyFrontmatter>
    | ContentEntry<PatternFrontmatter>,
>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const sa = a.frontmatter.status ?? "published";
    const sb = b.frontmatter.status ?? "published";
    const ra = STATUS_ORDER[sa];
    const rb = STATUS_ORDER[sb];
    if (ra !== rb) return ra - rb;
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}
