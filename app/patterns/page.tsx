import { ContentEntryCard } from "@/components/content/content-entry-card";
import { getPatterns } from "@/lib/content";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function PatternsIndexPage() {
  const entries = getPatterns();

  return (
    <>
      <h1 className={ui.pageTitle}>Patterns</h1>
      <div className={ui.indexGrid}>
        {entries.map((entry) => (
          <ContentEntryCard
            key={entry.slug}
            title={entry.frontmatter.title}
            summary={entry.frontmatter.summary}
            meta={
              <>
                <strong className={ui.inlineLabel}>Level:</strong>{" "}
                {entry.frontmatter.level}
              </>
            }
            href={routes.pattern(entry.slug)}
            ctaLabel="Read pattern"
          />
        ))}
      </div>
    </>
  );
}
