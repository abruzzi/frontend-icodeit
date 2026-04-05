"use client";

import { ListOrdered, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";

import {
  BOARD_DEMO_OUTLINE_BUTTON,
  BOARD_DEMO_SCROLL_STAGE_OUTER,
} from "@/components/case-studies/board-application/board-demo-shared";
import { evenlySpacedRanks } from "@/lib/board/ordering-keys";
import { ui } from "@/lib/ui";

type Row = { id: string; label: string; rank: number };

/** Consecutive integers — no strict midpoint between neighbours. */
const TIGHT: Row[] = [
  { id: "rb-1", label: "Card 1", rank: 1000 },
  { id: "rb-2", label: "Card 2", rank: 1001 },
  { id: "rb-3", label: "Card 3", rank: 1002 },
  { id: "rb-4", label: "Card 4", rank: 1003 },
  { id: "rb-5", label: "Card 5", rank: 1004 },
];

const REBALANCE_START = 1000;
const REBALANCE_STEP = 1000;

const FLASH_MS = 2200;

const REBALANCE_PRIMARY_BUTTON =
  "inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-amber-400/90 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm transition-colors hover:border-amber-500 hover:bg-amber-100 disabled:pointer-events-none disabled:opacity-45 dark:border-amber-500/55 dark:bg-amber-950/40 dark:text-amber-50 dark:hover:bg-amber-950/55";

function sortByRank(list: Row[]): Row[] {
  return [...list].sort((x, y) => x.rank - y.rank);
}

function applyRebalance(rows: Row[]): Row[] {
  const sorted = sortByRank(rows);
  const nextRanks = evenlySpacedRanks(sorted.length, REBALANCE_START, REBALANCE_STEP);
  return sorted.map((row, i) => ({ ...row, rank: nextRanks[i]! }));
}

export function BoardSparseRebalanceDemo() {
  const uid = useId();
  const [rows, setRows] = useState<Row[]>(() => [...TIGHT]);
  const [flashing, setFlashing] = useState(false);
  const timerRef = useRef<number | null>(null);

  const display = sortByRank(rows);
  const isTight = display.every((r, i) => (i === 0 ? true : r.rank === display[i - 1]!.rank + 1));

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleFlash = useCallback(() => {
    clearTimer();
    setFlashing(true);
    timerRef.current = window.setTimeout(() => {
      setFlashing(false);
      timerRef.current = null;
    }, FLASH_MS);
  }, [clearTimer]);

  const rebalance = useCallback(() => {
    setRows((prev) => applyRebalance(prev));
    queueMicrotask(() => scheduleFlash());
  }, [scheduleFlash]);

  const reset = useCallback(() => {
    clearTimer();
    setFlashing(false);
    setRows([...TIGHT]);
  }, [clearTimer]);

  return (
    <div
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      data-board-sparse-rebalance-demo
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-base font-medium text-slate-800 dark:text-slate-100">
            Rebalancing a tight sparse segment
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Same five cards, same visual order. When neighbours are consecutive integers, there is{" "}
            <strong className="font-medium text-slate-700 dark:text-slate-200">no</strong> integer strictly between
            them—so you <strong className="font-medium text-slate-700 dark:text-slate-200">reassign</strong> the whole
            slice to fresh wide gaps (one batch of writes).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={rebalance}
            disabled={isTight === false}
            className={REBALANCE_PRIMARY_BUTTON}
          >
            <Sparkles className="h-3.5 w-3.5 opacity-90" aria-hidden />
            Rebalance segment
          </button>
          <button type="button" onClick={reset} className={BOARD_DEMO_OUTLINE_BUTTON}>
            <RotateCcw className="h-3.5 w-3.5 opacity-80" aria-hidden />
            Reset
          </button>
        </div>
      </div>

      <div
        className={`${BOARD_DEMO_SCROLL_STAGE_OUTER} mx-auto w-full max-w-[280px] px-3 py-4 sm:max-w-[300px]`}
      >
        <p id={`${uid}-caption`} className="sr-only">
          Sparse rank rebalance: consecutive positions then evenly spaced after rebalance
        </p>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 rounded-t-xl bg-gradient-to-b from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 rounded-b-xl bg-gradient-to-t from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />

        <div className="relative z-[1] flex flex-col gap-2">
          <p className="mb-1 text-center text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Column slice
          </p>
          {display.map((card) => (
            <div
              key={card.id}
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-2.5 text-sm shadow-sm transition-[background-color,border-color,color] duration-200 dark:shadow-none ${
                flashing
                  ? "border-amber-500/85 bg-amber-500/[0.14] text-amber-950 dark:border-amber-500/65 dark:bg-amber-500/[0.16] dark:text-amber-50"
                  : "border-slate-200/90 bg-white text-slate-800 dark:border-slate-600/60 dark:bg-slate-800/85 dark:text-slate-100"
              }`}
            >
              <ListOrdered
                className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
                aria-hidden
                strokeWidth={2.25}
              />
              <span className="min-w-[5rem] font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
                pos{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {card.rank.toLocaleString("en-US")}
                </span>
              </span>
              <span className="min-w-0 flex-1 truncate font-medium tracking-tight">{card.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p
        className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
        role="status"
        aria-live="polite"
      >
        {isTight ? (
          <>
            Example: no integer strictly between <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.75em] dark:bg-slate-800/90">1000</code> and{" "}
            <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.75em] dark:bg-slate-800/90">1001</code>
            —rebalance (or switch to string keys) to keep inserts cheap.
          </>
        ) : (
          <>
            After rebalance, ranks are <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.75em] dark:bg-slate-800/90">1000…5000</code> stepping by{" "}
            <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.75em] dark:bg-slate-800/90">{REBALANCE_STEP}</code>
            —insert-between has room again (e.g. midpoint between 1000 and 2000 is 1500).
          </>
        )}
      </p>
    </div>
  );
}
