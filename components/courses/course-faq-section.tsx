"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import { fsdeFaqItems } from "@/lib/courses/fsde-faq";
import { ui } from "@/lib/ui";

/**
 * Two-column FAQ: intro on the left, accordion on the right (collapsed by default).
 */
export function CourseFaqSection() {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [openIndices, setOpenIndices] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      className="not-prose my-14 scroll-mt-24 sm:my-16 md:my-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm shadow-slate-900/[0.04] sm:p-10 md:p-12 lg:flex lg:gap-14 lg:p-14 dark:border-slate-600/50 dark:bg-slate-900/70 dark:shadow-none">
        <div className="max-w-md shrink-0 lg:w-[38%] lg:max-w-none">
          <p className={ui.courseEyebrow}>FAQ</p>
          <h2
            id={`${baseId}-heading`}
            className="mt-3 font-heading text-2xl font-extrabold tracking-tighter text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-50"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Short answers to the questions people ask before enrolling — click a row to read more.
          </p>
        </div>

        <div className="mt-10 flex min-w-0 flex-1 flex-col gap-3 lg:mt-0">
          {fsdeFaqItems.map((item, index) => {
            const isOpen = openIndices.has(index);
            const panelId = `${baseId}-panel-${index}`;
            const triggerId = `${baseId}-trigger-${index}`;
            return (
              <div
                key={item.question}
                className={[
                  "rounded-xl border transition-colors",
                  isOpen
                    ? "border-slate-200/90 bg-slate-50 dark:border-slate-500/50 dark:bg-slate-800/60"
                    : "border-slate-200/90 bg-white dark:border-slate-600/40 dark:bg-slate-900/40",
                ].join(" ")}
              >
                <button
                  type="button"
                  id={triggerId}
                  className="flex w-full items-start justify-between gap-4 rounded-xl px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-azure"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="font-heading text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-slate-50">
                    {item.question}
                  </span>
                  <motion.span
                    className="mt-0.5 inline-block shrink-0 text-slate-500 dark:text-slate-400"
                    aria-hidden
                    initial={false}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 280,
                            damping: 26,
                            mass: 0.85,
                            delay: isOpen ? 0.07 : 0.04,
                          }
                    }
                  >
                    <Plus className="h-5 w-5 stroke-[2.5]" />
                  </motion.span>
                </button>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="border-t border-slate-200/80 px-5 pb-5 pt-3 dark:border-slate-600/50"
                  >
                    <p className="m-0 text-pretty text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
