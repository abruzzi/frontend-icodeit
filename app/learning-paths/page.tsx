import Link from "next/link";

import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function LearningPathsPage() {
  return (
    <section className={ui.section} aria-labelledby="learning-paths-heading">
      <h1 id="learning-paths-heading" className={ui.pageTitle}>
        Learning paths
      </h1>
      <p className={ui.comingSoon}>Coming soon</p>
      <p>
        Planned: guided paths for topics like data-heavy UIs, realtime, and
        accessibility at scale. For now, browse{" "}
        <Link className={ui.ctaLink} href={routes.caseStudiesIndex}>
          case studies
        </Link>{" "}
        and{" "}
        <Link className={ui.ctaLink} href={routes.patternsIndex}>
          patterns
        </Link>{" "}
        directly.
      </p>
    </section>
  );
}
