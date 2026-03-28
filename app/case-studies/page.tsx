import { ContentEntryCard } from "@/components/content/content-entry-card";
import { getCaseStudies } from "@/lib/content";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

export default function CaseStudiesIndexPage() {
  const entries = getCaseStudies();

  return (
    <>
      <h1 className={ui.pageTitle}>Case Studies</h1>
      <div className={ui.indexGrid}>
        {entries.map((entry) => (
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
            href={routes.caseStudy(entry.slug)}
            ctaLabel="Read case study"
          />
        ))}
      </div>
    </>
  );
}
