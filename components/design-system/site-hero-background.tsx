"use client";

import { useEffect, useRef } from "react";

import {
  HeroDotLayers,
  heroDotCssVars,
} from "@/components/design-system/hero-dot-layers";

/** Fixed top band height; spotlight hides when cursor is below this (see pointer handler). */
export const SITE_HERO_BACKDROP_HEIGHT_PX = 500;

/**
 * Site-wide hero backdrop: gradient + dot grid + soft spotlight (pointer-driven).
 * Fixed under header and first ~500px of content; bottom color matches `body` fills.
 */
export function SiteHeroBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        if (e.clientY > SITE_HERO_BACKDROP_HEIGHT_PX) {
          root.style.setProperty("--spotlight-opacity", "0");
          return;
        }
        const rect = root.getBoundingClientRect();
        root.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
        root.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
        root.style.setProperty("--spotlight-opacity", "1");
      });
    };

    const onLeaveDoc = () => {
      root.style.setProperty("--spotlight-opacity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 isolate [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]"
      style={{
        ...heroDotCssVars(18, 200),
        height: SITE_HERO_BACKDROP_HEIGHT_PX,
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 z-[1]">
        <HeroDotLayers />
      </div>
    </div>
  );
}
