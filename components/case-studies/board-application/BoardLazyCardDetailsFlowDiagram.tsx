"use client";

import { ArrowDown, Layers, MousePointerClick } from "lucide-react";

import { ui } from "@/lib/ui";

/**
 * Minimal teaching block: code-split first, preload-on-intent as the next layer.
 * No timeline math — the interactive demo below shows behaviour.
 */
export function BoardLazyCardDetailsFlowDiagram() {
  return (
    <figure
      className={`${ui.caseStudyDemoShell} not-prose`}
      aria-label="Code split then preload on intent"
    >
      <figcaption className="border-b border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-600/50 dark:text-slate-50 sm:px-5">
        Two layers of the same idea
      </figcaption>
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">Preload on hover</strong> is not a replacement for{" "}
          <strong className="text-slate-800 dark:text-slate-200">code-splitting</strong> — it sits on top. Ship heavy UI
          in a separate chunk first; then, if you want snappier opens, start loading that chunk (and optional data) when
          the user shows intent.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl border-2 border-palette-azure/40 bg-palette-azure/[0.08] p-4 ring-1 ring-palette-azure/15 dark:border-palette-azure/45 dark:bg-palette-azure/[0.12] dark:ring-palette-azure/20">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-palette-azure/20 text-palette-azure dark:bg-palette-azure/25">
                <Layers className="size-4" aria-hidden />
              </span>
              <p className="font-heading text-xs font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                1 · Code-split + load on demand
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Heavy card-details UI lives in its own chunk; the board stays lean. Users who never open a card never pay
              for that JS.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Baseline win: smaller initial bundle, work starts when they <em>commit</em> (e.g. click).
            </p>
          </div>

          <div
            className="flex shrink-0 items-center justify-center py-1 text-slate-400 sm:flex-col sm:py-0"
            aria-hidden
          >
            <ArrowDown className="size-5 sm:hidden" />
            <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline">then</span>
            <ArrowDown className="hidden size-5 sm:block" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl border-2 border-palette-jade/40 bg-palette-jade/[0.08] p-4 ring-1 ring-palette-jade/15 dark:border-palette-jade/45 dark:bg-palette-jade/[0.12] dark:ring-palette-jade/20">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-palette-jade/20 text-palette-jade dark:bg-palette-jade/25">
                <MousePointerClick className="size-4" aria-hidden />
              </span>
              <p className="font-heading text-xs font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                2 · Preload on intent (e.g. hover)
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Same chunk — you only change <em>when</em> you kick off <code className="text-xs">import()</code> (and any
              data prefetch). Intent often overlaps with idle time, so the open feels instant.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Optional enhancement on top of step 1 — not a substitute for splitting.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
