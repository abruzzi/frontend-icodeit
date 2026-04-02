"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { BoardAssignee } from "@/components/case-studies/board-application/BoardDndDemo";
import { MoreHorizontal, Plus, RefreshCw } from "lucide-react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

/** Match `BoardDiagramAnnotation.id` in `lib/courses/fsde-board-annotations.ts`. */
export const BOARD_CALLOUT_ATTR = "data-board-callout" as const;

const COURSE_CARD_DRAG = "course-board-mock-card" as const;

const DEMO_AVATAR_BASE = "https://i.pravatar.cc/150";

function demoAvatar(seed: number) {
  return `${DEMO_AVATAR_BASE}?img=${seed}`;
}

export type CourseBoardCardModel = {
  id: string;
  title: string;
  ticketId: string;
  assignee?: BoardAssignee;
};

export type CourseBoardColumnModel = {
  id: string;
  title: string;
  cards: CourseBoardCardModel[];
};

export type CourseBoardSnapshot = {
  columns: CourseBoardColumnModel[];
};

const INITIAL_BOARD: CourseBoardSnapshot = {
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cards: [
        {
          id: "card-b1",
          ticketId: "TICKET-124",
          title: "Fix notification badge spacing",
          assignee: {
            id: 3,
            name: "Alex Kim",
            avatar_url: demoAvatar(3),
          },
        },
        {
          id: "card-b2",
          ticketId: "TICKET-103",
          title: "Setup project structure",
        },
        {
          id: "card-b3",
          ticketId: "TICKET-98",
          title: "Install dependencies",
          assignee: {
            id: 2,
            name: "Charlie Moore",
            avatar_url: demoAvatar(2),
          },
        },
      ],
    },
    {
      id: "col-2",
      title: "In Progress",
      cards: [
        {
          id: "card-p1",
          ticketId: "TICKET-112",
          title: "Implement user list API",
          assignee: {
            id: 5,
            name: "Hannah Smith",
            avatar_url: demoAvatar(5),
          },
        },
        {
          id: "card-p2",
          ticketId: "TICKET-107",
          title: "Create Board UI",
          assignee: {
            id: 8,
            name: "Diana Lopez",
            avatar_url: demoAvatar(8),
          },
        },
      ],
    },
    {
      id: "col-3",
      title: "Done",
      cards: [
        {
          id: "card-d1",
          ticketId: "TICKET-101",
          title: "Add TailwindCSS setup",
          assignee: {
            id: 1,
            name: "Quentin Davis",
            avatar_url: demoAvatar(1),
          },
        },
      ],
    },
  ],
};

type CardPayload = {
  type: typeof COURSE_CARD_DRAG;
  cardId: string;
  columnId: string;
};

type ColumnDropPayload = { columnId: string };

function isCardPayload(data: Record<string, unknown>): data is CardPayload {
  return (
    data.type === COURSE_CARD_DRAG &&
    typeof data.cardId === "string" &&
    typeof data.columnId === "string"
  );
}

function isColumnPayload(data: Record<string, unknown>): data is ColumnDropPayload {
  return typeof data.columnId === "string";
}

function moveCardBetweenColumns(
  board: CourseBoardSnapshot,
  cardId: string,
  fromColumnId: string,
  toColumnId: string,
): CourseBoardSnapshot {
  if (fromColumnId === toColumnId) return board;

  let moving: CourseBoardCardModel | undefined;

  const afterRemove = board.columns.map((col) => {
    if (col.id !== fromColumnId) return col;
    const idx = col.cards.findIndex((c) => c.id === cardId);
    if (idx === -1) return col;
    moving = col.cards[idx];
    return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
  });

  if (!moving) return board;

  return {
    columns: afterRemove.map((col) =>
      col.id === toColumnId ? { ...col, cards: [...col.cards, moving!] } : col,
    ),
  };
}

function BoardCard({
  card,
  columnId,
  menuCallout,
  realtimeCallout,
  onLayout,
}: {
  card: CourseBoardCardModel;
  columnId: string;
  menuCallout?: boolean;
  realtimeCallout?: boolean;
  onLayout?: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: () => ({
        type: COURSE_CARD_DRAG,
        cardId: card.id,
        columnId,
      }),
      onDragStart: () => {
        setDragging(true);
        onLayout?.();
      },
      onDrop: () => {
        setDragging(false);
        onLayout?.();
      },
    });
  }, [card.id, columnId, onLayout]);

  const calloutRoot = realtimeCallout ? "realtime" : undefined;

  return (
    <div
      ref={ref}
      {...(calloutRoot
        ? { [BOARD_CALLOUT_ATTR]: calloutRoot }
        : {})}
      className={`cursor-grab rounded-xl border border-slate-200/95 bg-white px-3 py-2.5 shadow-sm dark:border-slate-600/70 dark:bg-slate-800/95 ${
        dragging ? "opacity-45" : ""
      } active:cursor-grabbing`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex rounded-md bg-palette-azure/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-palette-azure dark:bg-palette-azure/20 dark:text-palette-azure">
          {card.ticketId}
        </span>
        <button
          type="button"
          className="-mr-1 -mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700/80 dark:hover:text-slate-300"
          aria-label="Card actions"
        >
          <span
            className="pointer-events-none flex h-4 w-4 items-center justify-center"
            {...(menuCallout ? { [BOARD_CALLOUT_ATTR]: "a11y-menu" } : {})}
            aria-hidden
          >
            <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
          </span>
        </button>
      </div>
      <p className="mt-2 text-sm font-medium leading-snug text-slate-800 dark:text-slate-100">
        {card.title}
      </p>
      <div className="mt-2.5 flex min-h-7 items-center gap-2">
        {card.assignee ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- demo avatars */}
            <img
              src={card.assignee.avatar_url}
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] shrink-0 rounded-full object-cover ring-1 ring-slate-200/90 dark:ring-slate-600"
            />
          </>
        ) : (
          <div
            className="h-[22px] w-[22px] shrink-0 rounded-full bg-slate-200/90 ring-1 ring-slate-300/70 dark:bg-slate-600/60 dark:ring-slate-500/50"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

function BoardColumn({
  column,
  draft,
  onDraftChange,
  onAddCard,
  onLayout,
}: {
  column: CourseBoardColumnModel;
  draft: string;
  onDraftChange: (v: string) => void;
  onAddCard: () => void;
  onLayout?: () => void;
}) {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: column.id }),
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: () => {
        setIsOver(false);
        onLayout?.();
      },
    });
  }, [column.id, onLayout]);

  const isBacklog = column.id === "col-1";
  const isProgress = column.id === "col-2";
  const isDone = column.id === "col-3";

  return (
    <div
      ref={dropRef}
      {...(isDone ? { [BOARD_CALLOUT_ATTR]: "normalisation" } : {})}
      className={`flex min-h-[min(52vh,400px)] w-[min(100%,17.5rem)] shrink-0 flex-col rounded-2xl border px-3 pb-3 pt-3 shadow-sm transition-colors sm:w-[18.5rem] ${
        isOver
          ? "border-palette-jade/50 bg-palette-jade/[0.08] dark:border-palette-jade/45 dark:bg-palette-jade/[0.12]"
          : "border-slate-200/85 bg-slate-100/90 dark:border-slate-600/55 dark:bg-slate-800/50"
      }`}
    >
      <h3
        className="px-0.5 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        {...(isBacklog ? { [BOARD_CALLOUT_ATTR]: "pagination" } : {})}
      >
        {column.title}
      </h3>

      <div className="flex max-h-[min(42vh,320px)] flex-1 flex-col gap-2.5 overflow-y-auto overflow-x-hidden pr-0.5">
        {column.cards.map((card, idx) => (
          <BoardCard
            key={card.id}
            card={card}
            columnId={column.id}
            menuCallout={isBacklog && idx === 0}
            realtimeCallout={card.id === "card-d1"}
            onLayout={onLayout}
          />
        ))}
        {isProgress ? (
          <div
            className="mx-auto mt-1 h-2 w-14 shrink-0"
            {...{ [BOARD_CALLOUT_ATTR]: "state-column" }}
            aria-hidden
          />
        ) : null}
      </div>

      <div className="mt-3 border-t border-slate-200/80 pt-3 dark:border-slate-600/50">
        <div className="flex items-stretch gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddCard();
              }
            }}
            placeholder="Add a new card..."
            {...(isBacklog ? { [BOARD_CALLOUT_ATTR]: "sanitise-input" } : {})}
            className="min-w-0 flex-1 rounded-lg border border-slate-200/90 bg-white px-2.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-palette-azure/50 focus:outline-none focus:ring-2 focus:ring-palette-azure/20 dark:border-slate-600/70 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={onAddCard}
            {...(isBacklog ? { [BOARD_CALLOUT_ATTR]: "optimistic-add-card" } : {})}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-slate-50 text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-700 dark:border-slate-600/70 dark:bg-slate-800/90 dark:text-slate-400 dark:hover:bg-slate-700/90 dark:hover:text-slate-200"
            aria-label="Add card"
          >
            <Plus className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  /** Fired after drag-drop or add-card so annotation lines can remeasure. */
  onLayoutChange?: () => void;
};

export const CourseBoardMockApp = forwardRef<HTMLDivElement | null, Props>(
  function CourseBoardMockApp({ onLayoutChange }, ref) {
    const [board, setBoard] = useState<CourseBoardSnapshot>(INITIAL_BOARD);
    const [drafts, setDrafts] = useState<Record<string, string>>({
      "col-1": "",
      "col-2": "",
      "col-3": "",
    });
    const ticketSeqRef = useRef(200);

    const bumpLayout = useCallback(() => {
      queueMicrotask(() => onLayoutChange?.());
    }, [onLayoutChange]);

    useEffect(() => {
      return monitorForElements({
        onDrop({ source, location }) {
          const dest = location.current.dropTargets[0];
          if (!dest) return;
          const src = source.data;
          const d = dest.data;
          if (!isCardPayload(src) || !isColumnPayload(d)) return;
          setBoard((prev) =>
            moveCardBetweenColumns(prev, src.cardId, src.columnId, d.columnId),
          );
          bumpLayout();
        },
      });
    }, [bumpLayout]);

    const addCard = useCallback(
      (columnId: string) => {
        const title = (drafts[columnId] ?? "").trim();
        if (!title) return;
        const id = `card-${Date.now()}`;
        const ticketId = `TICKET-${ticketSeqRef.current}`;
        ticketSeqRef.current += 1;
        setBoard((prev) => ({
          columns: prev.columns.map((col) =>
            col.id === columnId
              ? { ...col, cards: [...col.cards, { id, title, ticketId }] }
              : col,
          ),
        }));
        setDrafts((d) => ({ ...d, [columnId]: "" }));
        bumpLayout();
      },
      [drafts, bumpLayout],
    );

    return (
      <div
        ref={ref}
        className="flex min-h-0 flex-col bg-[#f4f6f9] dark:bg-slate-950/80"
      >
        <header className="flex flex-wrap items-center gap-3 border-b border-slate-200/90 bg-white px-3 py-2.5 dark:border-slate-600/60 dark:bg-slate-900/90 sm:gap-4 sm:px-4 sm:py-3">
          <div
            className="flex h-9 w-full min-w-0 max-w-md flex-1 items-center rounded-lg border border-slate-200/90 bg-slate-50/80 px-3 text-xs text-slate-400 shadow-inner dark:border-slate-600/70 dark:bg-slate-800/60 dark:text-slate-500 sm:text-sm"
            {...{ [BOARD_CALLOUT_ATTR]: "request-search" }}
            aria-hidden
          >
            Search tickets (title, ID, assignee)
          </div>

          <div className="flex flex-1 items-center justify-center gap-0 sm:flex-none">
            <span className="inline-flex rounded-lg border border-slate-200/90 bg-slate-50 p-0.5 dark:border-slate-600/70 dark:bg-slate-800/80">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                aria-pressed
              >
                Board
              </button>
              <button
                type="button"
                {...{ [BOARD_CALLOUT_ATTR]: "lazy-list" }}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                List
              </button>
            </span>
          </div>

          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
            <div
              className="flex -space-x-2"
              {...{ [BOARD_CALLOUT_ATTR]: "optimistic-avatar" }}
            >
              {[4, 7, 9].map((seed) => (
                // eslint-disable-next-line @next/next/no-img-element -- demo avatars
                <img
                  key={seed}
                  src={demoAvatar(seed)}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full border-2 border-white object-cover ring-1 ring-slate-200/80 dark:border-slate-800 dark:ring-slate-600"
                />
              ))}
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600/70 dark:bg-slate-800/90 dark:text-slate-400 dark:hover:bg-slate-700/80"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </header>

        <div className="flex gap-3 overflow-x-auto px-3 py-4 sm:gap-4 sm:px-4 sm:py-5">
          {board.columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              draft={drafts[col.id] ?? ""}
              onDraftChange={(v) =>
                setDrafts((d) => ({
                  ...d,
                  [col.id]: v,
                }))
              }
              onAddCard={() => addCard(col.id)}
              onLayout={bumpLayout}
            />
          ))}
        </div>
      </div>
    );
  },
);
