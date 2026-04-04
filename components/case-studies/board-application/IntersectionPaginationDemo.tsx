"use client";

import {
  BOARD_DEMO_OUTLINE_BUTTON,
  BOARD_DEMO_SCROLL_STAGE_OUTER,
} from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";
import { LayoutGrid, Loader2, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const PAGE_SIZE = 5;
/** Batches appended after intersection (not counting the initial slice). */
const EXTRA_BATCHES = 3;
/** Simulated round-trip + parse so the dimmed state is noticeable. */
const FETCH_MS = 1200;
/** Must match `rootMargin` on IntersectionObserver so scroll + IO agree. */
const ROOT_MARGIN_Y = 24;

function sentinelIntersectsRoot(
  root: HTMLElement,
  sentinel: HTMLElement,
  marginY: number,
) {
  const r = root.getBoundingClientRect();
  const s = sentinel.getBoundingClientRect();
  const top = r.top - marginY;
  const bottom = r.bottom + marginY;
  return s.bottom > top && s.top < bottom;
}

function formatCardTitle(oneBasedIndex: number) {
  return `card ${String(oneBasedIndex).padStart(2, "0")}`;
}

function createInitialRows(bootId: number) {
  return Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: `init-${bootId}-${i}`,
    label: formatCardTitle(i + 1),
  }));
}

export function IntersectionPaginationDemo() {
  const uid = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);
  const loadingRef = useRef(false);
  const batchesLoadedRef = useRef(0);
  const userScrolledRef = useRef(false);
  const fetchTimeoutRef = useRef<number | null>(null);

  const [rows, setRows] = useState(() => createInitialRows(0));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "fetching" | "done">("idle");

  const loadMore = useCallback(() => {
    if (
      !userScrolledRef.current ||
      loadingRef.current ||
      batchesLoadedRef.current >= EXTRA_BATCHES
    ) {
      return;
    }
    loadingRef.current = true;
    setLoading(true);
    setStatus("fetching");

    if (fetchTimeoutRef.current) {
      window.clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = window.setTimeout(() => {
      fetchTimeoutRef.current = null;
      setRows((r) => {
        const start = r.length;
        const batch = batchesLoadedRef.current;
        const newRows = Array.from({ length: PAGE_SIZE }, (_, i) => ({
          id: `b${batch}-${i}-${Date.now()}`,
          label: formatCardTitle(start + i + 1),
        }));
        return [...r, ...newRows];
      });
      batchesLoadedRef.current += 1;
      loadingRef.current = false;
      setLoading(false);
      if (batchesLoadedRef.current >= EXTRA_BATCHES) {
        setStatus("done");
      } else {
        setStatus("idle");
      }
    }, FETCH_MS);
  }, []);

  const resetDemo = useCallback(() => {
    if (fetchTimeoutRef.current) {
      window.clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = null;
    }
    loadingRef.current = false;
    batchesLoadedRef.current = 0;
    userScrolledRef.current = false;
    setLoading(false);
    setStatus("idle");
    setRows(createInitialRows(Date.now()));
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        window.clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { root, rootMargin: `${ROOT_MARGIN_Y}px 0px`, threshold: 0.01 },
    );

    io.observe(target);
    return () => io.disconnect();
  }, [loadMore]);

  const onScroll = useCallback(() => {
    userScrolledRef.current = true;
    const root = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (
      root &&
      sentinel &&
      sentinelIntersectsRoot(root, sentinel, ROOT_MARGIN_Y)
    ) {
      loadMore();
    }
  }, [loadMore]);

  const statusLine =
    status === "fetching"
      ? "Sentinel hit the viewport — simulating network, then appending the next page."
      : status === "done"
        ? "All demo pages loaded. In production you’d stop when `pageInfo.hasNextPage` is false."
        : "Scroll inside the column first; when the bottom sentinel meets the viewport, the observer requests the next batch.";

  return (
    <div
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      data-intersection-pagination-demo
      data-demo-status={status}
      data-demo-loading={loading ? "true" : "false"}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-base font-medium text-slate-800 dark:text-slate-100">
            Column viewport + sentinel (IntersectionObserver)
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            A fixed-height column clips a longer list. Top and bottom fades hint at overflow; the thin
            scrollbar shows you can scroll. After you scroll once, bringing the sentinel into view
            triggers the next “page” of cards.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDemo}
          className={BOARD_DEMO_OUTLINE_BUTTON}
        >
          <RotateCcw className="h-3.5 w-3.5 opacity-80" aria-hidden />
          Reset
        </button>
      </div>

      <div
        className={BOARD_DEMO_SCROLL_STAGE_OUTER}
        aria-labelledby={`${uid}-caption`}
      >
        <p id={`${uid}-caption`} className="sr-only">
          Scrollable column demonstrating infinite scroll with IntersectionObserver
        </p>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 rounded-t-xl bg-gradient-to-b from-slate-50/95 from-30% to-transparent dark:from-slate-900/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 rounded-b-xl bg-gradient-to-t from-slate-50/95 from-25% to-transparent dark:from-slate-900/90"
          aria-hidden
        />

        <div
          ref={scrollRef}
          onScroll={onScroll}
          aria-busy={loading}
          className="max-h-[220px] overflow-y-scroll overscroll-y-contain rounded-xl px-3 py-3 [scrollbar-color:rgb(148_163_184/0.75)_transparent] [scrollbar-width:thin] sm:max-h-[260px]"
        >
          <ul className="m-0 list-none space-y-2 p-0">
            {rows.map((r) => (
              <li
                key={r.id}
                className={`flex items-center gap-2.5 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition-[opacity,filter] duration-200 dark:border-slate-600/60 dark:bg-slate-800/85 dark:text-slate-100 ${
                  loading
                    ? "pointer-events-none opacity-[0.38] saturate-[0.55] dark:opacity-[0.32]"
                    : "opacity-100"
                }`}
              >
                <LayoutGrid
                  className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
                  aria-hidden
                />
                <span className="font-medium tabular-nums tracking-tight">{r.label}</span>
              </li>
            ))}
            {loading ? (
              <li className="flex items-center gap-2 rounded-lg border border-dashed border-palette-azure/45 bg-palette-azure/[0.08] px-3 py-2 text-sm font-medium text-palette-azure shadow-sm dark:border-palette-azure/40 dark:bg-palette-azure/15 dark:text-palette-azure">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
                Loading next page…
              </li>
            ) : null}
            <li
              ref={sentinelRef}
              className={`flex h-6 items-center justify-center text-[0.65rem] font-medium uppercase tracking-wider transition-opacity duration-200 ${
                loading
                  ? "text-slate-300 dark:text-slate-600"
                  : "text-slate-400 dark:text-slate-500"
              }`}
              aria-hidden
            >
              sentinel
            </li>
          </ul>
        </div>
      </div>

      <p
        className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
        role="status"
        aria-live="polite"
      >
        {statusLine}
      </p>
    </div>
  );
}
