"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { thinkific } from "@/lib/thinkific";

/**
 * Lightweight enroll CTA — same gradient / border / button language as {@link CoursePricing},
 * for mid-page placement (e.g. after curriculum storyline). Full breakdown stays at `#course-enroll`.
 */
export function CoursePricingCompact() {
  return (
    <aside
      className="not-prose relative my-12 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/80 to-palette-azure/10 p-8 shadow-diffuse dark:border-slate-600/50 dark:from-slate-900 dark:via-slate-900 dark:to-palette-azure/15 sm:my-14 sm:p-10"
      aria-labelledby="course-pricing-compact-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-palette-magenta/10 blur-3xl dark:bg-palette-magenta/15"
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-lg text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
      >
        <h3
          id="course-pricing-compact-heading"
          className="font-heading text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl"
        >
          Ready to enroll?
        </h3>
        <p className="mt-3 text-pretty text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          Secure checkout on Thinkific — pricing, access, and regional options
          are shown on the next step.
        </p>

        <a
          href={thinkific.indepthCourseCheckout}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Continue to Thinkific checkout (opens in a new tab)"
          className="mt-6 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-center text-base font-semibold text-white no-underline transition-transform hover:scale-[1.02] active:scale-[0.99] dark:bg-white dark:text-slate-900 sm:py-4"
        >
          Continue to checkout
          <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
        </a>

        <p className="mt-4 text-pretty text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Prefer the full breakdown first?{" "}
          <a
            href="#course-enroll"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Enrollment details and what&apos;s included
          </a>
          .
        </p>
      </motion.div>
    </aside>
  );
}
