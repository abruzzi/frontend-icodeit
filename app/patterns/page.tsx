import Link from "next/link";

import { getPatterns } from "@/lib/content";
import { ui } from "@/lib/ui";

export default function PatternsIndexPage() {
  const entries = getPatterns();

  return (
    <>
      <h1 className={ui.pageTitle}>Patterns</h1>
      <div className={ui.indexGrid}>
        {entries.map((entry) => (
          <article className={ui.section} key={entry.slug}>
            <h2 className={ui.cardTitle}>{entry.frontmatter.title}</h2>
            <p>{entry.frontmatter.summary}</p>
            <p>
              <strong>Level:</strong> {entry.frontmatter.level}
            </p>
            <Link className={ui.ctaLink} href={`/patterns/${entry.slug}`}>
              Read pattern
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
