"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { GripVertical, RotateCcw } from "lucide-react";
import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";

import {
  BOARD_DEMO_OUTLINE_BUTTON,
  BOARD_DEMO_SCROLL_STAGE_OUTER,
} from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";

const DRAG_TYPE = "cascade-reindex-card" as const;
const DROP_TYPE = "cascade-reindex-drop" as const;

/** `beforeId === null` means append at end of column. */
type DropPayload = {
  type: typeof DROP_TYPE;
  beforeId: string | null;
};

type CardPayload = {
  type: typeof DRAG_TYPE;
  cardId: string;
};

type Card = {
  id: string;
  label: string;
};

const INITIAL_CARDS: Card[] = [
  { id: "cr-1", label: "Card 1" },
  { id: "cr-2", label: "Card 2" },
  { id: "cr-3", label: "Card 3" },
  { id: "cr-4", label: "Card 4" },
  { id: "cr-5", label: "Card 5" },
];

const FLASH_MS = 2400;

function isCardPayload(data: Record<string, unknown>): data is CardPayload {
  return data.type === DRAG_TYPE && typeof data.cardId === "string";
}

function isDropPayload(data: Record<string, unknown>): data is DropPayload {
  return (
    data.type === DROP_TYPE &&
    (data.beforeId === null || typeof data.beforeId === "string")
  );
}

/** Immutable insert — avoids mutating React state in place. */
function insertBeforeImmutable(
  list: Card[],
  dragId: string,
  beforeId: string | null,
): Card[] {
  if (beforeId !== null && beforeId === dragId) {
    return list;
  }
  const dragIdx = list.findIndex((c) => c.id === dragId);
  if (dragIdx === -1) {
    return list;
  }
  const item = list[dragIdx];
  const without = list.filter((c) => c.id !== dragId);
  if (beforeId === null) {
    return [...without, item];
  }
  const ins = without.findIndex((c) => c.id === beforeId);
  if (ins === -1) {
    return list;
  }
  return [...without.slice(0, ins), item, ...without.slice(ins)];
}

/** Where the dragged card would land if released now. */
type InsertPreview =
  | { mode: "before"; beforeId: string }
  | { mode: "append" };

function InsertPlaceholder() {
  return (
    <div
      className="pointer-events-none h-1 shrink-0 rounded-full bg-palette-azure shadow-[0_0_12px_rgb(56_189_248_/_0.45)] dark:bg-palette-azure dark:shadow-[0_0_14px_rgb(125_211_252_/_0.35)]"
      aria-hidden
    />
  );
}

function impactedIds(prev: Card[], next: Card[]): Set<string> {
  const prevIds = prev.map((c) => c.id);
  const nextIds = next.map((c) => c.id);
  if (prevIds.join(",") === nextIds.join(",")) {
    return new Set();
  }
  const out = new Set<string>();
  const universe = new Set([...prevIds, ...nextIds]);
  for (const id of universe) {
    const pi = prevIds.indexOf(id);
    const ni = nextIds.indexOf(id);
    if (pi !== ni) {
      out.add(id);
    }
  }
  return out;
}

function CascadeCardRow({
  card,
  positionOneBased,
  flashing,
}: {
  card: Card;
  positionOneBased: number;
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
      <span className="min-w-[2.75rem] font-mono text-xs tabular-nums text-slate-500 dark:text-slate-400">
        pos {positionOneBased}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium tracking-tight">
        {card.label}
      </span>
    </div>
  );
}

function AppendDropZone({ previewAppend }: { previewAppend: boolean }) {
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

export function BoardCascadeReindexDemo() {
  const uid = useId();
  const [cards, setCards] = useState<Card[]>(() => [...INITIAL_CARDS]);
  const [flashing, setFlashing] = useState<Set<string>>(() => new Set());
  const [insertPreview, setInsertPreview] = useState<InsertPreview | null>(null);
  const flashTimerRef = useRef<number | null>(null);

  const clearFlashTimer = useCallback(() => {
    if (flashTimerRef.current != null) {
      window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = null;
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
    return () => clearFlashTimer();
  }, [clearFlashTimer]);

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => isCardPayload(source.data),
      onDragStart: () => {
        setInsertPreview(null);
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
          const next = insertBeforeImmutable(prev, src.cardId, d.beforeId);
          const prevKey = prev.map((c) => c.id).join();
          const nextKey = next.map((c) => c.id).join();
          if (prevKey === nextKey) {
            return prev;
          }
          const hit = impactedIds(prev, next);
          if (hit.size > 0) {
            queueMicrotask(() => scheduleFlash(hit));
          }
          return next;
        });
      },
    });
  }, [scheduleFlash]);

  const reset = useCallback(() => {
    clearFlashTimer();
    setFlashing(new Set());
    setInsertPreview(null);
    setCards([...INITIAL_CARDS]);
  }, [clearFlashTimer]);

  const statusText =
    flashing.size > 0 ? (
      <span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {flashing.size}
        </span>{" "}
        {"card"}
        {flashing.size === 1 ? "" : "s"} would rewrite{" "}
        <code className="rounded bg-slate-100/90 px-1 py-0.5 font-mono text-[0.85em] dark:bg-slate-800/90">
          position
        </code>{" "}
        in a dense integer model (highlighted).
      </span>
    ) : (
      <span>
        Try dragging{" "}
        <strong className="font-semibold text-slate-700 dark:text-slate-200">Card 5</strong> onto{" "}
        <strong className="font-semibold text-slate-700 dark:text-slate-200">Card 2</strong>
        {" — "}
        every card whose slot changes flashes red briefly.
      </span>
    );

  return (
    <div
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      data-board-cascade-reindex-demo
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-base font-medium text-slate-800 dark:text-slate-100">
            Naive integer positions — cascade reindex
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            One narrow column, five cards. Positions are implicit in sort order (like{" "}
            <code className="rounded bg-slate-100/90 px-1 py-0.5 font-mono text-[0.8em] dark:bg-slate-800/90">
              1…5
            </code>
            ). After a drop, any card that moved to a new slot is highlighted—what a naive per-row{" "}
            <code className="rounded bg-slate-100/90 px-1 py-0.5 font-mono text-[0.8em] dark:bg-slate-800/90">
              position
            </code>{" "}
            update would touch.
          </p>
        </div>
        <button type="button" onClick={reset} className={BOARD_DEMO_OUTLINE_BUTTON}>
          <RotateCcw className="h-3.5 w-3.5 opacity-80" aria-hidden />
          Reset
        </button>
      </div>

      <div
        className={`${BOARD_DEMO_SCROLL_STAGE_OUTER} mx-auto w-full max-w-[240px] px-3 py-4 sm:max-w-[260px]`}
        aria-labelledby={`${uid}-caption`}
      >
        <p id={`${uid}-caption`} className="sr-only">
          Single column with five draggable cards; dropped order shows naive position rewrites
        </p>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 rounded-t-xl bg-gradient-to-b from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 rounded-b-xl bg-gradient-to-t from-slate-50/95 from-25% to-transparent dark:from-slate-900/90" />

        <div className="relative z-[1] flex min-h-[300px] flex-col gap-2 sm:min-h-[320px]">
          <p className="mb-1 text-center text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            To do
          </p>
          {cards.map((card, idx) => (
            <Fragment key={card.id}>
              {insertPreview?.mode === "before" && insertPreview.beforeId === card.id ? (
                <InsertPlaceholder />
              ) : null}
              <CascadeCardRow
                card={card}
                positionOneBased={idx + 1}
                flashing={flashing.has(card.id)}
              />
            </Fragment>
          ))}
          {insertPreview?.mode === "append" ? <InsertPlaceholder /> : null}
          <AppendDropZone previewAppend={insertPreview?.mode === "append"} />
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
