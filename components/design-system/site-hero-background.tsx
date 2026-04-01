"use client";

import {
  HeroDotLayers,
  heroDotCssVars,
} from "@/components/design-system/hero-dot-layers";

/** Fixed top band height; bottom color matches `body` fills. */
export const SITE_HERO_BACKDROP_HEIGHT_PX = 500;

/**
 * Site-wide hero backdrop: base wash + subtle drifting gradients (“breath”) + dot grid.
 * No pointer spotlight — motion is slow, ambient, slightly irregular (two layers / periods).
 */
export function SiteHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 isolate [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_62%,transparent_100%)]"
      style={{
        ...heroDotCssVars(18),
        height: SITE_HERO_BACKDROP_HEIGHT_PX,
      }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900" />

      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="hero-breathe-layer-a absolute" />
        <div className="hero-breathe-layer-b absolute" />
      </div>

      <div className="absolute inset-0 z-[2]">
        <HeroDotLayers />
      </div>
    </div>
  );
}
