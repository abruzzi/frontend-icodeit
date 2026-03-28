import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { RelatedRef } from "@/lib/content/types";
import { ui } from "@/lib/ui";

type RelatedLinksSectionProps = {
  title: string;
  items: RelatedRef[];
  hrefForSlug: (slug: string) => string;
};

export function RelatedLinksSection({
  title,
  items,
  hrefForSlug,
}: RelatedLinksSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={ui.section}>
      <h2 className={ui.sectionTitle}>{title}</h2>
      <ul className="space-y-2">
        {items.map((ref) => (
          <li key={ref.slug}>
            <Link className={ui.relatedListLink} href={hrefForSlug(ref.slug)}>
              <span className="min-w-0">{ref.title ?? ref.slug}</span>
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
