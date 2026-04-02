"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { CourseTestimonial } from "@/lib/courses/fsde-landing-data";
import { ui } from "@/lib/ui";

type Props = {
  featured: CourseTestimonial;
  marqueeItems: CourseTestimonial[];
};

function FeaturedTestimonial({ item }: { item: CourseTestimonial }) {
  const initial = item.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <motion.div
      className="mx-auto max-w-2xl px-2 py-8 text-center sm:px-4 sm:py-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ type: "spring", stiffness: 160, damping: 24 }}
    >
      <blockquote>
        <p className="text-base font-normal leading-relaxed text-slate-600 sm:text-[1.0625rem] dark:text-slate-400">
          {item.quote}
        </p>
        <footer className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          {item.avatarSrc ? (
            <div className="size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200/90 dark:ring-slate-600/70 sm:size-11">
              <Image
                src={item.avatarSrc}
                alt={`${item.name} — ${item.role}`}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-palette-azure/40 to-palette-magenta/35 text-base font-semibold text-white ring-1 ring-slate-200/90 dark:ring-slate-600/70 sm:size-11 sm:text-lg"
              aria-hidden
            >
              {initial}
            </div>
          )}
          <div className="text-center sm:text-left">
            <cite className="not-italic text-sm font-medium text-slate-800 dark:text-slate-200">
              {item.name}
            </cite>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">
              {item.role}
            </p>
          </div>
        </footer>
      </blockquote>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  durationSec,
}: {
  items: CourseTestimonial[];
  /** One full loop (half the duplicated track) in seconds; higher = slower. */
  durationSec: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative -mx-4 overflow-hidden py-2 sm:-mx-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900 sm:w-16"
        aria-hidden
      />

      <div
        className="flex w-max gap-6 px-4 motion-reduce:animate-none animate-course-marquee"
        style={{
          animationDuration: `${durationSec}s`,
          animationPlayState: paused ? "paused" : "running",
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
      </div>
    </div>
  );
}

/**
 * One marquee of shorter quotes, then a single large featured review (course).
 */
export function CourseTestimonials({ featured, marqueeItems }: Props) {
  const dup = useMemo(() => [...marqueeItems, ...marqueeItems], [marqueeItems]);

  return (
    <div className="space-y-10 overflow-hidden">
      <div>
        <h2 className={ui.courseSectionTitle}>What learners say</h2>
        <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400">
          Snippets from people working through the paid course and from comments
          on the free Frontend System Design Essentials videos on YouTube —
          normalization, real-time updates, optimistic UI, and the rest of the
          thread.
        </p>
      </div>

      <MarqueeRow items={dup} durationSec={100} />

      <FeaturedTestimonial item={featured} />
    </div>
  );
}
