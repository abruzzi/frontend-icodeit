/**
 * App paths in one place so nav, links, and `generateStaticParams` stay aligned.
 */
export const routes = {
  home: "/",
  caseStudiesIndex: "/case-studies",
  caseStudy: (slug: string) => `/case-studies/${slug}`,
  patternsIndex: "/patterns",
  pattern: (slug: string) => `/patterns/${slug}`,
  learningPaths: "/learning-paths",
  compare: (slug: string) => `/compare/${slug}`,
} as const;
