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

const collagePanel =
  "flex min-h-[5.5rem] flex-1 flex-col justify-center rounded-2xl bg-white/70 px-5 py-4 shadow-sm shadow-slate-900/[0.04] backdrop-blur-sm dark:bg-slate-900/50 sm:min-h-[6.5rem] sm:px-6";

export function AboutHero() {
  return (
    <header className={ui.courseHeroY}>
      <div
        className={`${ui.courseHeroCard} border-0 shadow-none ring-0 dark:border-0 dark:shadow-none dark:ring-0`}
      >
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

          <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
            {/* Collage column — tall portrait + editorial feel */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 28,
                delay: 0.05,
              }}
            >
              <div className="mx-auto max-w-[16rem] lg:mx-0 lg:max-w-none">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/juntao.qiu.avatar.webp"
                    alt="Juntao Qiu"
                    width={480}
                    height={640}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400 lg:text-left">
                  Juntao Qiu · I Code It
                </p>
              </div>
            </motion.div>

            {/* Headline + collage strips + copy */}
            <div className="min-w-0 space-y-6 lg:col-span-7">
              <motion.div
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 28,
                  delay: 0.1,
                }}
              >
                <div
                  className={`${collagePanel} bg-gradient-to-br from-slate-100/90 to-white/80 dark:from-slate-800/80 dark:to-slate-900/60`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Arc
                  </p>
                  <p className="mt-1 font-heading text-sm font-bold text-slate-900 dark:text-slate-50 sm:text-base">
                    Consulting → product → solo
                  </p>
                </div>
                <div
                  className={`${collagePanel} bg-gradient-to-br from-palette-azure/12 to-white/80 dark:from-palette-azure/15 dark:to-slate-900/60`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Focus
                  </p>
                  <p className="mt-1 font-heading text-sm font-bold text-slate-900 dark:text-slate-50 sm:text-base">
                    Frontend system design
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4 sm:space-y-5"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 28,
                  delay: 0.14,
                }}
              >
                <p className="text-lg font-medium text-slate-600 dark:text-slate-300 sm:text-xl">
                  Welcome, I am Juntao — Engineer, Educator, Creator.
                </p>
                <h1 id="about-heading" className={ui.courseDisplayTitle}>
                  Helping developers design and build software
                </h1>
                <p className={ui.courseLead}>
                  By breaking complexity into structure and guiding the building
                  process with intention — even when{" "}
                  <Highlight variant="underline3">AI is involved</Highlight>.
                </p>
                <p className={`${ui.courseLead} !mt-4 max-w-2xl !text-lg sm:!text-xl`}>
                  This frontend site is where that mission gets concrete — case
                  studies, patterns, and a hands-on course — alongside{" "}
                  <a
                    href={ICODEIT_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline-offset-2 hover:underline"
                  >
                    icodeit.com.au
                  </a>{" "}
                  for posts, tutorials, and books.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3 pt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.45 }}
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
            </div>
          </div>

          <motion.div
            className="mt-12 flex justify-center sm:mt-14 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <a
              href="#about-quote"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/90 text-slate-600 transition-colors hover:border-palette-azure/60 hover:text-palette-azure dark:border-slate-500/80 dark:text-slate-400 dark:hover:border-palette-azure/50 dark:hover:text-palette-azure"
              aria-label="Scroll to featured quote"
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
