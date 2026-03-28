import type { RelatedContent as RelatedContentModel } from "@/lib/content/related";
import { routes } from "@/lib/routes";

type RelatedContentProps = {
  data: RelatedContentModel;
  basePath?: {
    patterns: string;
    caseStudies: string;
  };
};

function Section({
  title,
  items,
  hrefPrefix,
}: {
  title: string;
  items: { slug: string; title?: string; reason?: string }[];
  hrefPrefix: string;
}) {
  if (items.length === 0) return null;

  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <a href={`${hrefPrefix}/${item.slug}`}>{item.title ?? item.slug}</a>
            {item.reason ? <span> - {item.reason}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedContent({
  data,
  basePath = {
    patterns: routes.patternsIndex,
    caseStudies: routes.caseStudiesIndex,
  },
}: RelatedContentProps) {
  return (
    <aside aria-label="Related content">
      <h2>Related Content</h2>
      <Section
        title="Related Patterns"
        items={data.patterns}
        hrefPrefix={basePath.patterns}
      />
      <Section
        title="Used In Case Studies"
        items={data.caseStudies}
        hrefPrefix={basePath.caseStudies}
      />
    </aside>
  );
}
