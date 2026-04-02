"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import boardAppScreenshot from "@/content/courses/frontend-system-design-essentials/board-app-ss.png";

import { ui } from "@/lib/ui";

const BASE_ROTATE_X = 5;
const BASE_ROTATE_Y = -4.5;
const HOVER_STRENGTH = 14;

/**
 * Capstone showcase: copy + macOS-style window frame around the board screenshot,
 * with a subtle base tilt and hover tilt that moves opposite the cursor.
 */
export function CourseCornerstoneBoard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useMotionValue(BASE_ROTATE_X);
  const rotateY = useMotionValue(BASE_ROTATE_Y);
  const springConfig = { stiffness: 280, damping: 26, mass: 0.6 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useLayoutEffect(() => {
    rotateX.set(BASE_ROTATE_X);
    rotateY.set(BASE_ROTATE_Y);
  }, [rotateX, rotateY]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    // Tilt away from the pointer (invert classic “follow cursor” parallax).
    rotateX.set(BASE_ROTATE_X + ny * HOVER_STRENGTH);
    rotateY.set(BASE_ROTATE_Y - nx * HOVER_STRENGTH);
  };

  const onPointerLeave = () => {
    rotateX.set(BASE_ROTATE_X);
    rotateY.set(BASE_ROTATE_Y);
  };

  return (
    <div className="grid min-w-0 gap-12 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
      <div className="min-w-0 space-y-5">
        <p className={ui.courseEyebrow}>Cornerstone project</p>
        <h2 className={ui.courseSectionTitle}>
          A board application, end to end
        </h2>
        <div className="space-y-4 text-pretty text-slate-600 dark:text-slate-400 sm:text-xl sm:leading-relaxed">
          <p>
            The capstone is a board-style app that grows with every module —
            normalization, pagination, caching, realtime updates, optimistic UI,
            and performance work — so you always see ideas land in a real UI,
            not a toy snippet.
          </p>
          <p>
            If you like the board case study tone on this site, the course is
            the same thread: concrete screens first, then the system around them
            you can explain in interviews.
          </p>
        </div>
      </div>

      <div className="flex min-w-0 justify-center lg:justify-end">
        <div className="w-full max-w-[min(100%,36rem)] [perspective:1200px]">
          <motion.div
            ref={wrapRef}
            className="relative origin-center cursor-default select-none will-change-transform"
            style={
              reduceMotion
                ? {
                    rotateX: BASE_ROTATE_X,
                    rotateY: BASE_ROTATE_Y,
                    transformPerspective: 1200,
                    transformStyle: "preserve-3d",
                  }
                : {
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformPerspective: 1200,
                    transformStyle: "preserve-3d",
                  }
            }
            onPointerMove={reduceMotion ? undefined : onPointerMove}
            onPointerLeave={reduceMotion ? undefined : onPointerLeave}
          >
            <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-100/90 shadow-[0_22px_50px_-12px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.04] dark:border-slate-600/80 dark:bg-slate-800/90 dark:shadow-[0_24px_55px_-14px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] dark:ring-white/[0.06]">
              <div className="flex h-9 items-center gap-2 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-slate-100/95 px-3 dark:border-slate-600/70 dark:from-slate-800 dark:to-slate-800/95">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-inner ring-1 ring-black/[0.12]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e] shadow-inner ring-1 ring-black/[0.12]" />
                  <span className="size-2.5 rounded-full bg-[#28c840] shadow-inner ring-1 ring-black/[0.12]" />
                </span>
                <span className="flex-1 truncate text-center text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
                  Board — capstone
                </span>
                <span className="w-14 shrink-0" aria-hidden />
              </div>
              <div className="relative w-full bg-slate-200/60 dark:bg-slate-950/60">
                <Image
                  src={boardAppScreenshot}
                  alt="Board application capstone UI — lists and cards in a board layout"
                  sizes="(max-width: 1024px) 100vw, 42rem"
                  className="h-auto w-full align-top"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
