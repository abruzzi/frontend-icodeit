import { resolveRelatedContent } from "../../lib/content/related";
import type {
  CaseStudyFrontmatter,
  ContentEntry,
  PatternFrontmatter,
} from "../../lib/content/types";
import { RelatedContent } from "./RelatedContent";

type RelatedContentFromEntriesProps = {
  current: ContentEntry;
  patterns: ContentEntry<PatternFrontmatter>[];
  caseStudies: ContentEntry<CaseStudyFrontmatter>[];
};

export function RelatedContentFromEntries({
  current,
  patterns,
  caseStudies,
}: RelatedContentFromEntriesProps) {
  const related = resolveRelatedContent(current, patterns, caseStudies);
  return <RelatedContent data={related} />;
}
