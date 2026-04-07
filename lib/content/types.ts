export type ContentKind = "case-study" | "pattern";

/** `published` = full article and routable URL; others are roadmap cards only. */
export type ContentStatus =
  | "published"
  | "coming-next"
  | "in-progress"
  | "planning";

export function isPublishedContent(fm: { status?: ContentStatus }): boolean {
  return fm.status === undefined || fm.status === "published";
}

export type PatternLevel = "micro" | "meso" | "macro";

export type CrossCuttingTag =
  | "a11y"
  | "testing"
  | "performance"
  | "reliability"
  | "real-time"
  | "state-management";

export type RelatedRef = {
  slug: string;
  title?: string;
  reason?: string;
};

export type TestingLevel = "unit" | "integration" | "e2e";

/** Rubric column — drives `Token` colour in `TestingRubricTable`. */
export type RubricCategory =
  | "functional"
  | "state"
  | "realtime"
  | "a11y"
  | "visual";

export type RubricItem = {
  id: string;
  category: RubricCategory;
  level: TestingLevel;
  requirement: string;
  doneWhen: string;
};

export type BaseFrontmatter = {
  title: string;
  summary: string;
  kind: ContentKind;
  tags: CrossCuttingTag[];
  status?: ContentStatus;
  /** ISO date (`YYYY-MM-DD`) shown as “Last edited” under the intro block. */
  lastEdited?: string;
};

export type CaseStudyFrontmatter = BaseFrontmatter & {
  kind: "case-study";
  scenario: string;
  patternRefs: RelatedRef[];
  quickTake: string[];
  productionNotes: string[];
  testingRubricId: string;
};

export type PatternFrontmatter = BaseFrontmatter & {
  kind: "pattern";
  level: PatternLevel;
  usedIn?: RelatedRef[];
  comparePages?: string[];
  testingRubricId: string;
};

export type ContentFrontmatter = CaseStudyFrontmatter | PatternFrontmatter;

export type ContentEntry<T extends ContentFrontmatter = ContentFrontmatter> = {
  slug: string;
  frontmatter: T;
};
