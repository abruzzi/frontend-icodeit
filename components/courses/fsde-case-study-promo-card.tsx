import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { thinkific } from "@/lib/thinkific";

const COURSE_HREF = "/courses/frontend-system-design-essentials";

/**
 * Inline promo for case studies (e.g. board application) — course overview + Thinkific checkout.
 */
export function FsdeCaseStudyCourseCard() {
  return (
    <aside
      className="not-prose my-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/90 to-palette-azure/10 p-6 shadow-sm dark:border-slate-600/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-palette-azure/15 sm:my-12 sm:p-7"
      aria-labelledby="fsde-case-study-promo-heading"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-palette-azure">
        Course
      </p>
      <h3
        id="fsde-case-study-promo-heading"
        className="mt-2 font-heading text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl"
      >
        Frontend System Design Essentials
      </h3>
      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
        This case study is the same thread the course uses for the capstone: a board
        app you evolve from normalization and APIs through realtime, optimistic UI, and
        production concerns — with a path you can explain in a review or interview.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={thinkific.indepthCourseCheckout}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enroll on Thinkific (opens in a new tab)"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white no-underline transition-transform hover:scale-[1.02] active:scale-[0.99] dark:bg-white dark:text-slate-900 sm:text-base"
        >
          Enroll
          <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
        </a>
        <Link
          href={COURSE_HREF}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300/90 bg-white/80 px-5 py-3 text-center text-sm font-semibold text-slate-800 no-underline transition-colors hover:border-palette-azure/50 hover:bg-white dark:border-slate-500/80 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:border-palette-azure/50 sm:text-base"
        >
          Course page — overview and FAQ
        </Link>
      </div>
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Checkout opens on Thinkific. The course page on this site has the full landing,
        curriculum story, and video intro.
      </p>
    </aside>
  );
}
