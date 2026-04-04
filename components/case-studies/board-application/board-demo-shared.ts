import type { CSSProperties } from "react";

/**
 * Shared chrome for board case-study React Flow panes (ER diagram, SSE topology, etc.).
 * Keeps light/dark canvas consistent across diagrams.
 */
export const BOARD_REACT_FLOW_PANE_OUTER =
  "relative overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/80 dark:border-slate-600/40 dark:bg-slate-900/40";

/**
 * Radial dot grid behind a transparent React Flow canvas (matches prior per-file implementations).
 */
export function boardReactFlowPaneDotStyle(isDark: boolean): CSSProperties {
  return {
    backgroundImage: `radial-gradient(circle, ${
      isDark ? "rgba(148,163,184,0.22)" : "rgba(148,163,184,0.25)"
    } 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
    backgroundPosition: "0 0",
  };
}

/**
 * Outline control for Play / Reset / similar actions in board MDX demos.
 */
export const BOARD_DEMO_OUTLINE_BUTTON =
  "inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-600/60 dark:bg-slate-800/85 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800";

/**
 * Inset surface for scrollable column demos (pagination) — aligned with {@link BOARD_REACT_FLOW_PANE_OUTER}.
 */
export const BOARD_DEMO_SCROLL_STAGE_OUTER =
  "relative rounded-xl border border-slate-200/60 bg-slate-50/80 dark:border-slate-600/40 dark:bg-slate-900/40";
