"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const SLICES = [
  { id: 0, label: "Page 1 — newest cursor `abc123`" },
  { id: 1, label: "Page 2 — cursor `def456` (append on scroll)" },
  { id: 2, label: "Page 3 — end of feed / empty tail" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
};

type PaginationMotionDemoProps = {
  className?: string;
};

/**
 * Directional spring motion when switching “pages” (e.g. cursor pagination).
 */
export function PaginationMotionDemo({ className = "" }: PaginationMotionDemoProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return 0;
      if (next >= SLICES.length) return SLICES.length - 1;
      return next;
    });
  };

  const slice = SLICES[index];

  const btn =
    "inline-flex items-center gap-1 rounded-lg bg-slate-200/80 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-brand/15 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-brand/20";

  return (
    <div
      className={`not-prose my-6 rounded-2xl border border-slate-200/80 bg-slate-100/60 p-4 shadow-sm dark:border-slate-700/45 dark:bg-slate-800/40 dark:shadow-none ${className}`}
    >
      <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-200">
        Pagination motion (Framer Motion + spring)
      </p>
      <div className="relative h-14 overflow-hidden rounded-xl bg-slate-50/90 dark:bg-slate-950/60">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slice.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-0 flex items-center px-3 text-sm text-slate-800 dark:text-slate-100"
          >
            {slice.label}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index <= 0}
          className={btn}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          Prev
        </button>
        <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
          {index + 1} / {SLICES.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index >= SLICES.length - 1}
          className={btn}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
