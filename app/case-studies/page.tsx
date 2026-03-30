import { ContentEntryCard } from "@/components/content/content-entry-card";
import {
  getCaseStudies,
  isPublishedContent,
  sortByPublishStatusThenTitle,
} from "@/lib/content";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function CaseStudiesIndexPage() {
  const entries = sortByPublishStatusThenTitle(getCaseStudies());

  return (
    <>
      <h1 className={ui.pageTitle}>Case Studies</h1>
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
                  <strong className={ui.inlineLabel}>Scenario:</strong>{" "}
                  {entry.frontmatter.scenario}
                </>
              }
              href={live ? routes.caseStudy(entry.slug) : null}
              ctaLabel="Read case study"
              status={entry.frontmatter.status}
            />
          );
        })}
      </div>
    </>
  );
}
