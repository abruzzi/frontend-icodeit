"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  HERO_DOT_GRID_DARK,
  HERO_DOT_GRID_LIGHT,
} from "@/components/design-system/hero-dot-layers";
import { Highlight } from "@/components/mdx/Highlight";
import { routes } from "@/lib/routes";
import { ui } from "@/lib/ui";

const ICODEIT_MAIN = "https://www.icodeit.com.au/";
const YOUTUBE = "https://www.youtube.com/@icodeit.juntao";

const STATS = [
  { label: "Engineering since", value: "2008" },
  { label: "YouTube", value: "11k+ subs" },
  { label: "Also writes at", value: "martinfowler.com" },
] as const;

export function AboutHero() {
  return (
    <header className={ui.courseHeroY}>
      <div className={ui.courseHeroCard}>
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-[0.55] dark:opacity-[0.45]">
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                backgroundImage: HERO_DOT_GRID_LIGHT,
                backgroundSize: "18px 18px",
                backgroundPosition: "0 0",
              }}
            />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                backgroundImage: HERO_DOT_GRID_DARK,
                backgroundSize: "18px 18px",
                backgroundPosition: "0 0",
              }}
            />
          </div>
          <div className="absolute inset-0 opacity-90 dark:opacity-75">
            <div className="absolute -left-1/4 top-0 h-[min(70vw,28rem)] w-[min(70vw,28rem)] rounded-full bg-palette-azure/20 blur-3xl dark:bg-palette-azure/18" />
            <div className="absolute -right-1/4 bottom-0 h-[min(60vw,24rem)] w-[min(60vw,24rem)] rounded-full bg-palette-magenta/15 blur-3xl dark:bg-palette-magenta/12" />
            <div className="absolute left-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand/10 blur-2xl dark:bg-brand/15" />
          </div>
        </div>

        <div className="relative z-10 overflow-visible">
          <p className={ui.courseEyebrow}>About</p>

          <motion.div
            className="mt-2 space-y-5 sm:mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 28,
              delay: 0.06,
            }}
          >
            <h1 id="about-heading" className={ui.courseDisplayTitle}>
              Juntao Qiu
            </h1>
            <p className={ui.courseLead}>
              Engineer, educator, creator — helping developers{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                design and build software
              </strong>{" "}
              by breaking complexity into structure and guiding the process with
              intention, even when{" "}
              <Highlight variant="underline3">AI is involved</Highlight>.
            </p>
            <p className={`${ui.courseLead} !mt-4 max-w-3xl`}>
              I focus on frontend system design: maintainable React, data and
              API shape, performance, and the trade-offs that show up in real
              products and senior interviews.
            </p>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2.5 sm:mt-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 28,
              delay: 0.18,
            }}
            aria-label="Quick facts"
          >
            {STATS.map((s) => (
              <li
                key={s.label}
                className="inline-flex items-baseline gap-2 rounded-full border border-slate-300/80 bg-white/60 px-4 py-2 text-sm backdrop-blur-sm dark:border-slate-600/70 dark:bg-slate-950/40"
              >
                <span className="text-slate-500 dark:text-slate-400">
                  {s.label}
                </span>
                <span className="font-semibold text-slate-900 dark:text-slate-50">
                  {s.value}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-8 flex items-center gap-3 sm:mt-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 28,
              delay: 0.22,
            }}
          >
            <div className="size-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 sm:size-[4.25rem]">
              <Image
                src="/assets/juntao.qiu.avatar.webp"
                alt="Juntao Qiu"
                width={136}
                height={136}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-base font-medium text-slate-800 dark:text-slate-100 sm:text-[1.05rem]">
                Juntao Qiu
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                I Code It · Solo builder
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12 md:mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.5 }}
          >
            <a
              href={ICODEIT_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/30 transition-transform hover:scale-[1.02] active:scale-[0.99] dark:bg-white dark:text-slate-900 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_8px_40px_-4px_rgb(255_255_255/0.35)]"
            >
              icodeit.com.au
            </a>
            <Link
              href={routes.courseFrontendSystemDesignEssentials}
              className="inline-flex items-center justify-center rounded-full border border-slate-300/90 bg-white/70 px-7 py-3.5 text-base font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:border-palette-azure/50 hover:bg-white/95 dark:border-slate-500/80 dark:bg-slate-950/40 dark:text-slate-100 dark:hover:border-palette-azure/50 dark:hover:bg-slate-900/60"
            >
              Course on this site
            </Link>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/90 px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-palette-azure/60 hover:text-palette-azure dark:border-slate-500/80 dark:text-slate-200 dark:hover:border-palette-azure/50 dark:hover:text-palette-azure"
            >
              YouTube
            </a>
          </motion.div>

          <motion.div
            className="mt-14 flex justify-center sm:mt-16 md:mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#about-story"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/90 text-slate-600 transition-colors hover:border-palette-azure/60 hover:text-palette-azure dark:border-slate-500/80 dark:text-slate-400 dark:hover:border-palette-azure/50 dark:hover:text-palette-azure"
              aria-label="Scroll to story"
            >
              <span className="flex h-10 w-10 items-center justify-center">
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown
                    className="h-5 w-5"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </motion.span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
