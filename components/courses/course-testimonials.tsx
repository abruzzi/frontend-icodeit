"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import type { CourseTestimonial } from "@/lib/courses/fsde-landing-data";
import { ui } from "@/lib/ui";

type Props = {
  items: CourseTestimonial[];
};

const FLOAT_SEC = 5.5;

function TestimonialCard({
  item,
  delay,
}: {
  item: CourseTestimonial;
  delay: number;
}) {
  return (
    <motion.article
      className="relative w-[min(100vw-2rem,340px)] shrink-0 rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-600/60 dark:bg-slate-800/70 dark:shadow-black/20 sm:p-7"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        delay,
      }}
    >
      <div
        className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-gradient-to-br from-palette-azure/30 to-palette-magenta/20 blur-2xl"
        aria-hidden
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: FLOAT_SEC + delay * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p className="relative text-base leading-relaxed text-slate-700 dark:text-slate-200">
          &ldquo;{item.quote}&rdquo;
        </p>
        <footer className="relative mt-5 border-t border-slate-200/80 pt-4 dark:border-slate-600/60">
          <p className="font-semibold text-slate-900 dark:text-slate-50">
            {item.name}
          </p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {item.role}
          </p>
        </footer>
      </motion.div>
    </motion.article>
  );
}

function MarqueeRow({ items, duration }: { items: CourseTestimonial[]; duration: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    setLoopWidth(el.scrollWidth / 2);
  }, [items]);

  return (
    <div className="relative -mx-4 overflow-hidden py-2 sm:-mx-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900 sm:w-16"
        aria-hidden
      />

      <motion.div
        ref={trackRef}
        className="flex w-max gap-6 px-4"
        animate={loopWidth > 0 ? { x: [0, -loopWidth] } : {}}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.id}-m-${i}`}
            className="w-[min(100vw-2rem,300px)] shrink-0 rounded-2xl border border-slate-200/70 bg-white/60 px-5 py-4 text-sm shadow-sm backdrop-blur-sm dark:border-slate-600/50 dark:bg-slate-800/50"
          >
            <p className="font-medium leading-snug text-slate-800 dark:text-slate-100">
              &ldquo;{item.quote.slice(0, 120)}
              {item.quote.length > 120 ? "…" : ""}&rdquo;
            </p>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              — {item.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Marquee strip + scroll-triggered cards. Replace quotes in
 * `lib/courses/fsde-landing-data.ts` when you have real testimonials.
 */
export function CourseTestimonials({ items }: Props) {
  const dup = useMemo(() => [...items, ...items], [items]);
  const dupReversed = useMemo(
    () => [...dup].reverse(),
    [dup],
  );

  return (
    <div className="space-y-10 overflow-hidden">
      <div>
        <h2 className={ui.courseSectionTitle}>What learners say</h2>
        <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
          Replace the sample quotes in{" "}
          <code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-sm dark:bg-slate-700">
            lib/courses/fsde-landing-data.ts
          </code>{" "}
          when you have real testimonials.
        </p>
      </div>

      <MarqueeRow items={dup} duration={42} />
      <MarqueeRow items={dupReversed} duration={54} />

      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, i) => (
          <TestimonialCard key={item.id} item={item} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}
