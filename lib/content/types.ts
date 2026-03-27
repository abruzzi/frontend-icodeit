export type ContentKind = "case-study" | "pattern";

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

export type RubricItem = {
  id: string;
  category: "functional" | "a11y";
  level: TestingLevel;
  requirement: string;
  doneWhen: string;
};

export type BaseFrontmatter = {
  title: string;
  summary: string;
  kind: ContentKind;
  tags: CrossCuttingTag[];
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
