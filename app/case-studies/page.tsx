import Link from "next/link";

import { getCaseStudies } from "@/lib/content";
import { ui } from "@/lib/ui";

export default function CaseStudiesIndexPage() {
  const entries = getCaseStudies();

  return (
    <>
      <h1 className={ui.pageTitle}>Case Studies</h1>
      <div className={ui.indexGrid}>
        {entries.map((entry) => (
          <article className={ui.panel} key={entry.slug}>
            <h2 className={ui.cardTitle}>{entry.frontmatter.title}</h2>
            <p>{entry.frontmatter.summary}</p>
            <p>
              <strong>Scenario:</strong> {entry.frontmatter.scenario}
            </p>
            <Link className={ui.ctaLink} href={`/case-studies/${entry.slug}`}>
              Read case study
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
