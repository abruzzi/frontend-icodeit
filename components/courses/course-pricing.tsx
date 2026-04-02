"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import { thinkific } from "@/lib/thinkific";
import { ui } from "@/lib/ui";

const INCLUDES = [
  "Structured modules from data modeling through production concerns",
  "Hands-on capstone aligned with the board application thread",
  "Quizzes and exercises tied to real frontend system design decisions",
] as const;

export function CoursePricing() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/80 to-palette-azure/10 p-8 shadow-diffuse dark:border-slate-600/50 dark:from-slate-900 dark:via-slate-900 dark:to-palette-azure/15 sm:p-10 md:p-12"
      id="course-enroll"
      aria-labelledby="course-enroll-heading"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-palette-magenta/10 blur-3xl dark:bg-palette-magenta/15"
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-[1fr_min(100%,320px)] lg:items-start lg:gap-14">
        <div>
          <h2 className={ui.courseSectionTitle} id="course-enroll-heading">
            Enroll
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-slate-600 dark:text-slate-400">
            Checkout is hosted on Thinkific — complete purchase there and you’ll
            get access to the course player and materials.
          </p>

          <ul className="mt-8 space-y-3">
            {INCLUDES.map((line) => (
              <li key={line} className="flex gap-3 text-slate-700 dark:text-slate-200">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-palette-azure/20 text-palette-azure dark:bg-palette-azure/25">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-lg dark:border-slate-600/60 dark:bg-slate-800/80 dark:shadow-black/30 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ type: "spring", stiffness: 160, damping: 24 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Full course
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            Frontend System Design Essentials
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Secure checkout via Thinkific. Pricing and regional options are shown
            on the enrollment page.
          </p>

          <a
            href={thinkific.indepthCourseCheckout}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-center text-base font-semibold text-white no-underline transition-transform hover:scale-[1.02] active:scale-[0.99] dark:bg-white dark:text-slate-900"
          >
            Continue to checkout
            <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
          </a>

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            You’ll leave this site to complete payment on Thinkific.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
