import Link from "next/link";
import type { ReactNode } from "react";

import { ui } from "@/lib/ui";

type ContentEntryCardProps = {
  title: string;
  summary: string;
  meta: ReactNode;
  href: string;
  ctaLabel: string;
};

export function ContentEntryCard({
  title,
  summary,
  meta,
  href,
  ctaLabel,
}: ContentEntryCardProps) {
  return (
    <article className={ui.panel}>
      <h2 className={ui.cardTitle}>{title}</h2>
      <p>{summary}</p>
      <p>{meta}</p>
      <Link className={ui.ctaLink} href={href}>
        {ctaLabel}
      </Link>
    </article>
  );
}
