import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import type { ContentStatus } from "@/lib/content/types";
import { ui } from "@/lib/ui";

type ContentEntryCardProps = {
  title: string;
  summary: string;
  meta: ReactNode;
  href?: string | null;
  ctaLabel: string;
  status?: ContentStatus;
};

function statusBadgeClass(status: ContentStatus | undefined): string | null {
  if (!status || status === "published") return null;
  const base = ui.statusBadge;
  if (status === "coming-next") return `${base} ${ui.statusBadgeComingNext}`;
  if (status === "planning") return `${base} ${ui.statusBadgePlanning}`;
  return `${base} ${ui.statusBadgeInProgress}`;
}

function statusBadgeLabel(status: ContentStatus | undefined): string | null {
  if (!status || status === "published") return null;
  if (status === "coming-next") return "Coming soon";
  if (status === "planning") return "Planning";
  return "In progress";
}

export function ContentEntryCard({
  title,
  summary,
  meta,
  href,
  ctaLabel,
  status,
}: ContentEntryCardProps) {
  const badgeClass = statusBadgeClass(status);
  const badgeLabel = statusBadgeLabel(status);

  return (
    <article className={ui.panel}>
      <div className="flex flex-wrap items-center gap-2">
        {badgeClass && badgeLabel ? (
          <span className={badgeClass}>{badgeLabel}</span>
        ) : null}
        <h2 className={ui.cardTitle}>{title}</h2>
      </div>
      <p>{summary}</p>
      <p>{meta}</p>
      {href ? (
        <Link className={ui.ctaLink} href={href}>
          <span>{ctaLabel}</span>
          <ChevronRight
            className="cta-icon-breathe h-4 w-4 shrink-0 text-palette-azure"
            strokeWidth={2.5}
            aria-hidden
          />
        </Link>
      ) : null}
    </article>
  );
}
