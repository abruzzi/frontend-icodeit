import type { MetadataRoute } from "next";

import { getCaseStudies, getPatterns, isPublishedContent } from "@/lib/content";
import { COMPARE_DOCS } from "@/lib/compare/docs";
import { routes } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://frontend.icodeit.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    routes.home,
    routes.caseStudiesIndex,
    routes.patternsIndex,
    routes.learningPaths,
    routes.courseFrontendSystemDesignEssentials,
  ];

  const caseStudyRoutes = getCaseStudies()
    .filter((e) => isPublishedContent(e.frontmatter))
    .map((e) => routes.caseStudy(e.slug));

  const patternRoutes = getPatterns()
    .filter((e) => isPublishedContent(e.frontmatter))
    .map((e) => routes.pattern(e.slug));

  const compareRoutes = Object.keys(COMPARE_DOCS).map((slug) =>
    routes.compare(slug),
  );

  const all = [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...patternRoutes,
    ...compareRoutes,
  ];

  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
}

