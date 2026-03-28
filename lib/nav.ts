import { routes } from "@/lib/routes";

export type NavItem = { label: string; href: string };

/** Primary header navigation — keep labels in sync with IA only here. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Case Studies", href: routes.caseStudiesIndex },
  { label: "Patterns", href: routes.patternsIndex },
  { label: "Learning Paths", href: routes.learningPaths },
];
