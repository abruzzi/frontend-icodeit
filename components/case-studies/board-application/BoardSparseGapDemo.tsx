"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { GripVertical, RotateCcw } from "lucide-react";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

import { BoardOrderingInsertLine } from "@/components/case-studies/board-application/BoardOrderingInsertLine";
import {
  BOARD_DEMO_OUTLINE_BUTTON,
  BOARD_DEMO_SCROLL_STAGE_OUTER,
} from "@/components/case-studies/board-application/board-demo-shared";
import {
  intMidpointExclusive,
  intSparseAfterLast,
} from "@/lib/board/ordering-keys";
import { ui } from "@/lib/ui";

const DRAG_TYPE = "sparse-gap-card" as const;
const DROP_TYPE = "sparse-gap-drop" as const;

/** Initial spacing between sparse ranks (matches the article’s 1000, 2000, …). */
const SPARSE_STEP = 1000;

type DropPayload = {
  type: typeof DROP_TYPE;
  beforeId: string | null;
};

type CardPayload = {
  type: typeof DRAG_TYPE;
  cardId: string;
};

type SparseCard = {
  id: string;
  label: string;
  rank: number;
};

const INITIAL: SparseCard[] = [
  { id: "sg-1", label: "Card 1", rank: 1000 },
  { id: "sg-2", label: "Card 2", rank: 2000 },
  { id: "sg-3", label: "Card 3", rank: 3000 },
  { id: "sg-4", label: "Card 4", rank: 4000 },
  { id: "sg-5", label: "Card 5", rank: 5000 },
];

const FLASH_MS = 2400;
const EXHAUSTED_MS = 4200;

function sortByRank(list: SparseCard[]): SparseCard[] {
  return [...list].sort((x, y) => x.rank - y.rank);
}

function isCardPayload(data: Record<string, unknown>): data is CardPayload {
  return data.type === DRAG_TYPE && typeof data.cardId === "string";
}

function isDropPayload(data: Record<string, unknown>): data is DropPayload {
  return (
    data.type === DROP_TYPE &&
    (data.beforeId === null || typeof data.beforeId === "string")
  );
}

type InsertPreview =
  | { mode: "before"; beforeId: string }
  | { mode: "append" };

function applySparseDrop(
  cards: SparseCard[],
  dragId: string,
  beforeId: string | null,
): { next: SparseCard[]; flashIds: Set<string>; gapExhausted: boolean } {
  const sorted = sortByRank(cards);
  const moved = sorted.find((c) => c.id === dragId);
  if (!moved) {
    return { next: cards, flashIds: new Set(), gapExhausted: false };
  }
  const rest = sorted.filter((c) => c.id !== dragId);

  let left: number | null = null;
  let right: number | null = null;

  if (beforeId === null) {
    if (rest.length === 0) {
      return { next: cards, flashIds: new Set(), gapExhausted: false };
    }
    left = rest[rest.length - 1]!.rank;
    right = null;
  } else {
    const idx = rest.findIndex((c) => c.id === beforeId);
    if (idx === -1) {
      return { next: cards, flashIds: new Set(), gapExhausted: false };
    }
    right = rest[idx]!.rank;
    left = idx > 0 ? rest[idx - 1]!.rank : null;
  }

  let newRank: number | null = null;
  if (left !== null && right !== null) {
    newRank = intMidpointExclusive(left, right);
  } else if (left !== null) {
    newRank = intSparseAfterLast(left, SPARSE_STEP);
  } else if (right !== null) {
    newRank = intMidpointExclusive(0, right);
  }

  if (newRank === null) {
    return { next: cards, flashIds: new Set(), gapExhausted: true };
  }

  if (newRank === moved.rank) {
    return { next: cards, flashIds: new Set(), gapExhausted: false };
  }

  const next = cards.map((c) =>
    c.id === dragId ? { ...c, rank: newRank! } : c,
  );
  return { next, flashIds: new Set([dragId]), gapExhausted: false };
}

function SparseCardRow({
  card,
  flashing,
}: {
  card: SparseCard;
  flashing: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const cleanDrag = draggable({
      element: el,
      getInitialData: (): CardPayload => ({
        type: DRAG_TYPE,
        cardId: card.id,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
    const cleanDrop = dropTargetForElements({
      element: el,
      getData: (): DropPayload => ({
        type: DROP_TYPE,
        beforeId: card.id,
      }),
      getIsSticky: () => true,
    });
    return () => {
      cleanDrag();
      cleanDrop();
    };
  }, [card.id]);

  return (
    <div
      ref={ref}
      className={`flex cursor-grab items-center gap-2 rounded-lg border px-2.5 py-2.5 text-sm shadow-sm transition-[background-color,border-color,color,opacity] duration-200 active:cursor-grabbing dark:shadow-none ${
        flashing
          ? "border-red-500/85 bg-red-500/[0.14] text-red-950 dark:border-red-500/70 dark:bg-red-500/[0.18] dark:text-red-100"
          : "border-slate-200/90 bg-white text-slate-800 dark:border-slate-600/60 dark:bg-slate-800/85 dark:text-slate-100"
      } ${dragging ? "opacity-40" : "opacity-100"}`}
    >
      <GripVertical
        className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
        aria-hidden
        strokeWidth={2.25}
      />
      <span className="min-w-[4.75rem] font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
        pos{" "}
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {card.rank.toLocaleString("en-US")}
        </span>
      </span>
      <span className="min-w-0 flex-1 truncate font-medium tracking-tight">
        {card.label}
      </span>
    </div>
  );
}

function SparseAppendZone({ previewAppend }: { previewAppend: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    return dropTargetForElements({
      element: el,
      getData: (): DropPayload => ({
        type: DROP_TYPE,
        beforeId: null,
      }),
      getIsSticky: () => true,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`flex h-9 items-center justify-center rounded-lg border border-dashed text-[0.65rem] font-medium uppercase tracking-wider transition-colors ${
        previewAppend
          ? "border-palette-azure/70 bg-palette-azure/[0.08] text-palette-azure dark:border-palette-azure/55 dark:bg-palette-azure/15 dark:text-palette-azure"
          : "border-slate-200/80 text-slate-400 dark:border-slate-600/55 dark:text-slate-500"
      }`}
      aria-hidden
    >
      Drop to append
    </div>
  );
}

export function BoardSparseGapDemo() {
  const uid = useId();
  const [cards, setCards] = useState<SparseCard[]>(() => [...INITIAL]);
  const [flashing, setFlashing] = useState<Set<string>>(() => new Set());
  const [insertPreview, setInsertPreview] = useState<InsertPreview | null>(null);
  const [gapExhausted, setGapExhausted] = useState(false);
  const flashTimerRef = useRef<number | null>(null);
  const exhaustedTimerRef = useRef<number | null>(null);

  const displayCards = sortByRank(cards);

  const clearFlashTimer = useCallback(() => {
    if (flashTimerRef.current != null) {
      window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
    }
  }, []);

  const clearExhaustedTimer = useCallback(() => {
    if (exhaustedTimerRef.current != null) {
      window.clearTimeout(exhaustedTimerRef.current);
      exhaustedTimerRef.current = null;
    }
  }, []);

  const scheduleFlash = useCallback(
    (ids: Set<string>) => {
      clearFlashTimer();
      if (ids.size === 0) {
        return;
      }
      setFlashing(ids);
      flashTimerRef.current = window.setTimeout(() => {
        setFlashing(new Set());
        flashTimerRef.current = null;
      }, FLASH_MS);
    },
    [clearFlashTimer],
  );

  useEffect(() => {
    return () => {
      clearFlashTimer();
      clearExhaustedTimer();
    };
  }, [clearFlashTimer, clearExhaustedTimer]);

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => isCardPayload(source.data),
      onDragStart: () => {
        setInsertPreview(null);
        setGapExhausted(false);
      },
      onDropTargetChange: ({ source, location }) => {
        const src = source.data;
        if (!isCardPayload(src)) {
          return;
        }
        const top = location.current.dropTargets[0];
        if (!top || !isDropPayload(top.data)) {
          setInsertPreview(null);
          return;
        }
        const dragId = src.cardId;
        const { beforeId } = top.data;
        if (beforeId !== null && beforeId === dragId) {
          setInsertPreview(null);
          return;
        }
        if (beforeId === null) {
          setInsertPreview({ mode: "append" });
          return;
        }
        setInsertPreview({ mode: "before", beforeId });
      },
      onDrop: ({ source, location }) => {
        setInsertPreview(null);
        const dest = location.current.dropTargets[0];
        if (!dest) {
          return;
        }
        const src = source.data;
        const d = dest.data;
        if (!isCardPayload(src) || !isDropPayload(d)) {
          return;
        }
        setCards((prev) => {
          const { next, flashIds, gapExhausted: exhausted } = applySparseDrop(
            prev,
            src.cardId,
            d.beforeId,
          );
          if (exhausted) {
            queueMicrotask(() => {
              if (exhaustedTimerRef.current != null) {
                window.clearTimeout(exhaustedTimerRef.current);
              }
              setGapExhausted(true);
              exhaustedTimerRef.current = window.setTimeout(() => {
                setGapExhausted(false);
                exhaustedTimerRef.current = null;
              }, EXHAUSTED_MS);
            });
            return prev;
          }
          if (flashIds.size === 0) {
            return prev;
          }
          queueMicrotask(() => scheduleFlash(flashIds));
          return next;
        });
      },
    });
  }, [scheduleFlash]);

  const reset = useCallback(() => {
    clearFlashTimer();
    clearExhaustedTimer();
    setFlashing(new Set());
    setInsertPreview(null);
    setGapExhausted(false);
    setCards([...INITIAL]);
  }, [clearExhaustedTimer, clearFlashTimer]);

  const statusText = gapExhausted ? (
    <span className="font-medium text-amber-800 dark:text-amber-200">
      No integer fits strictly between those neighbours—time to{" "}
      <strong className="font-semibold">rebalance</strong> the segment (demo leaves the list unchanged).
    </span>
  ) : flashing.size > 0 ? (
    <span>
      Only the moved card gets a new sparse{" "}
      <code className="rounded bg-slate-100/90 px-1 py-0.5 font-mono text-[0.85em] dark:bg-slate-800/90">
        pos
      </code>{" "}
      value (highlighted)—everyone else keeps the same number.
    </span>
  ) : (
    <span>
      Try dragging <strong className="font-semibold text-slate-700 dark:text-slate-200">Card 5</strong> (
      <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.8em] dark:bg-slate-800/90">5000</code>
      ) before <strong className="font-semibold text-slate-700 dark:text-slate-200">Card 2</strong> (
      <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.8em] dark:bg-slate-800/90">2000</code>
      )—you should land on a single midpoint (e.g.{" "}
      <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.8em] dark:bg-slate-800/90">1500</code>
      ). Moving Card 4 between Card 2 and Card 3 only changes Card 4 (e.g. to{" "}
      <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.8em] dark:bg-slate-800/90">2500</code>
      )—Card 5 stays at{" "}
      <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.8em] dark:bg-slate-800/90">5000</code> because the list order is still valid.
      Keep splitting the same gap until no integer fits to see the exhaustion message.
    </span>
  );

  return (
    <div
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      data-board-sparse-gap-demo
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-base font-medium text-slate-800 dark:text-slate-100">
            Sparse integer ranks — one row update
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Wide <code className="rounded bg-slate-100/90 px-1 py-0.5 font-mono text-[0.8em] dark:bg-slate-800/90">pos</code> gaps (
            <code className="rounded bg-slate-100/90 px-1 font-mono text-[0.75em] dark:bg-slate-800/90">
              1000, 2000, …
            </code>
            ) so a move usually picks an integer <strong className="font-medium text-slate-700 dark:text-slate-200">between</strong> two
            neighbours. Same shell as the dense demo—only the moved card flashes when a midpoint exists.
          </p>
        </div>
        <button type="button" onClick={reset} className={BOARD_DEMO_OUTLINE_BUTTON}>
          <RotateCcw className="h-3.5 w-3.5 opacity-80" aria-hidden />
          Reset
        </button>
      </div>

      <div
        className={`${BOARD_DEMO_SCROLL_STAGE_OUTER} mx-auto w-full max-w-[240px] px-3 py-4 sm:max-w-[280px]`}
        aria-labelledby={`${uid}-caption`}
      >
        <p id={`${uid}-caption`} className="sr-only">
          Sparse integer rank ordering demo with drag and drop
        </p>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 rounded-t-xl bg-gradient-to-b from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 rounded-b-xl bg-gradient-to-t from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />

        <div className="relative z-[1] flex min-h-[300px] flex-col gap-2 sm:min-h-[320px]">
          <p className="mb-1 text-center text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            To do
          </p>
          {displayCards.map((card) => (
            <Fragment key={card.id}>
              {insertPreview?.mode === "before" && insertPreview.beforeId === card.id ? (
                <BoardOrderingInsertLine />
              ) : null}
              <SparseCardRow card={card} flashing={flashing.has(card.id)} />
            </Fragment>
          ))}
          {insertPreview?.mode === "append" ? <BoardOrderingInsertLine /> : null}
          <SparseAppendZone previewAppend={insertPreview?.mode === "append"} />
        </div>
      </div>

      <p
        className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
        role="status"
        aria-live="polite"
      >
        {statusText}
      </p>
    </div>
  );
}
