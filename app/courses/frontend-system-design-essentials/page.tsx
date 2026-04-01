import Link from "next/link";

import { ui } from "@/lib/ui";

export const metadata = {
  title: "Frontend System Design Essentials",
  description:
    "Course in progress — a practical path to designing scalable, resilient frontends.",
};

export default function FrontendSystemDesignEssentialsPage() {
  return (
    <>
      <section className={ui.section}>
        <h1 className={ui.pageTitle}>Frontend System Design Essentials</h1>
        <p className="text-slate-600 dark:text-slate-400">
          This course page is a work in progress. I’ll flesh out the syllabus,
          lesson breakdown, and the exact outcomes here.
        </p>
      </section>

      <section className={ui.panelProse}>
        <h2>What this course is</h2>
        <p>
          A practical course for frontend engineers who want to go beyond
          building features and get comfortable with system-level decisions:
          data modeling, API shape, state ownership, performance constraints,
          reliability, and accessibility.
        </p>

        <h2>Who it’s for</h2>
        <ul>
          <li>
            You build production UIs and want to reason about architecture more
            deliberately.
          </li>
          <li>
            You’re preparing for frontend system design interviews, but you also
            want skills that translate directly to real work.
          </li>
        </ul>

        <h2>What you’ll get (draft)</h2>
        <ul>
          <li>How to run a CCDAO-style design pass without hand-waving.</li>
          <li>How to model client state for data-heavy apps (lists, boards, feeds).</li>
          <li>How to design mutation flows: optimistic UI, idempotency, rollback.</li>
          <li>How to choose pagination, caching, and realtime transports.</li>
          <li>How to think about a11y and failure modes from day one.</li>
        </ul>

        <h2>CTA (coming soon)</h2>
        <p>
          I’ll add the purchase / signup CTA once pricing and delivery format are
          finalized. For now, the main site has the course tile and updates.
        </p>
        <p>
          <Link className={ui.ctaLink} href="https://www.icodeit.com.au/">
            <span>Visit icodeit.com.au</span>
          </Link>
        </p>
      </section>
    </>
  );
}

