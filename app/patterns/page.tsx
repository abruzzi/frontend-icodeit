import { ContentEntryCard } from "@/components/content/content-entry-card";
import {
  getPatterns,
  isPublishedContent,
  sortByPublishStatusThenTitle,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function PatternsIndexPage() {
  const entries = sortByPublishStatusThenTitle(getPatterns());

  return (
    <>
      <h1 className={ui.pageTitle}>Patterns</h1>
      <div className={ui.indexGrid}>
        {entries.map((entry) => {
          const live = isPublishedContent(entry.frontmatter);
          return (
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
              href={live ? routes.pattern(entry.slug) : null}
              ctaLabel="Read pattern"
              status={entry.frontmatter.status}
            />
          );
        })}
      </div>
    </>
  );
}
