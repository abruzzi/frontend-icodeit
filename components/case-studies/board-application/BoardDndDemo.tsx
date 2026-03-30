"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Matches the article’s “server-ish” snapshot: columns each carry an ordered `cards` list. */
export type BoardAssignee = {
  id: number;
  name: string;
  avatar_url: string;
};

export type BoardCardModel = {
  id: string;
  title: string;
  assignee?: BoardAssignee;
};

export type BoardColumnModel = {
  id: string;
  title: string;
  cards: BoardCardModel[];
};

export type BoardSnapshot = {
  columns: BoardColumnModel[];
};

export const DEMO_INITIAL_BOARD: BoardSnapshot = {
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cards: [
        { id: "TICKET-1", title: "Setup project structure" },
        { id: "TICKET-2", title: "Install dependencies" },
        {
          id: "TICKET-3",
          title: "Configure ESLint & Prettier",
          assignee: {
            id: 2,
            name: "Charlie Moore",
            avatar_url: "https://i.pravatar.cc/150?img=2",
          },
        }
      ],
    },
    {
      id: "col-2",
      title: "In Progress",
      cards: [
        {
          id: "TICKET-4",
          title: "Implement user list API",
          assignee: {
            id: 5,
            name: "Hannah Smith",
            avatar_url: "https://i.pravatar.cc/150?img=5",
          },
        },
        {
          id: "TICKET-5",
          title: "Create Board UI",
          assignee: {
            id: 8,
            name: "Diana Lopez",
            avatar_url: "https://i.pravatar.cc/150?img=8",
          },
        }
      ],
    },
    {
      id: "col-3",
      title: "Done",
      cards: [
        {
          id: "TICKET-6",
          title: "Add TailwindCSS setup",
          assignee: {
            id: 1,
            name: "Quentin Davis",
            avatar_url: "https://i.pravatar.cc/150?img=1",
          },
        }
      ],
    },
  ],
};

type BoardCardPayload = {
  type: "board-card";
  cardId: string;
  columnId: string;
};

type ColumnPayload = {
  columnId: string;
};

function isBoardCardPayload(data: Record<string, unknown>): data is BoardCardPayload {
  return (
    data.type === "board-card" &&
    typeof data.cardId === "string" &&
    typeof data.columnId === "string"
  );
}

function isColumnPayload(data: Record<string, unknown>): data is ColumnPayload {
  return typeof data.columnId === "string";
}

function moveCardBetweenColumns(
  board: BoardSnapshot,
  cardId: string,
  fromColumnId: string,
  toColumnId: string,
): BoardSnapshot {
  if (fromColumnId === toColumnId) {
    return board;
  }

  let moving: BoardCardModel | undefined;

  const afterRemove: BoardColumnModel[] = board.columns.map((col) => {
    if (col.id !== fromColumnId) {
      return col;
    }
    const idx = col.cards.findIndex((c) => c.id === cardId);
    if (idx === -1) {
      return col;
    }
    moving = col.cards[idx];
    return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
  });

  if (!moving) {
    return board;
  }

  return {
    columns: afterRemove.map((col) =>
      col.id === toColumnId
        ? { ...col, cards: [...col.cards, moving!] }
        : col,
    ),
  };
}

function BoardCard({
  card,
  columnId,
}: {
  card: BoardCardModel;
  columnId: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    return draggable({
      element: el,
      getInitialData: () => ({
        type: "board-card",
        cardId: card.id,
        columnId,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [card.id, columnId]);

  return (
    <div
      ref={ref}
      className={`cursor-grab rounded-lg border border-slate-200/90 bg-white px-3 py-2.5 text-base shadow-sm active:cursor-grabbing dark:border-slate-600/60 dark:bg-slate-800/80 ${
        dragging ? "opacity-40" : ""
      }`}
    >
      <div className="font-medium text-slate-800 dark:text-slate-100">
        {card.title}
      </div>
      <div className="mt-2 flex min-h-6 items-center gap-2">
        {card.assignee ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- external demo avatars */}
            <img
              src={card.assignee.avatar_url}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 rounded-full object-cover ring-1 ring-slate-200/80 dark:ring-slate-600"
            />
            <span className="truncate text-sm text-slate-600 dark:text-slate-400">
              {card.assignee.name}
            </span>
          </>
        ) : (
          <>
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200/90 text-slate-500 ring-1 ring-slate-300/80 dark:bg-slate-600/80 dark:text-slate-400 dark:ring-slate-500/60"
              aria-hidden
            >
              <User className="h-3.5 w-3.5 opacity-80" strokeWidth={2} />
            </div>
            <span className="truncate text-sm text-slate-400 dark:text-slate-500">
              Unassigned
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function BoardColumn({
  columnId,
  title,
  cards,
}: {
  columnId: string;
  title: string;
  cards: BoardCardModel[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId }),
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: () => setIsOver(false),
    });
  }, [columnId]);

  return (
    <div
      ref={ref}
      className={`flex min-h-[220px] min-w-0 flex-1 flex-col gap-3 rounded-2xl border p-4 transition-colors dark:border-slate-600/50 ${
        isOver
          ? "border-palette-jade/55 bg-palette-jade/[0.09] dark:border-palette-jade/50 dark:bg-palette-jade/[0.14]"
          : "border-slate-200/80 bg-slate-50/80 dark:bg-slate-900/40"
      }`}
    >
      <h3 className="font-heading text-sm font-bold tracking-tight text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <div className="flex flex-1 flex-col gap-2">
        {cards.map((card) => (
          <BoardCard key={card.id} card={card} columnId={columnId} />
        ))}
      </div>
    </div>
  );
}

export function BoardDndDemo() {
  const [board, setBoard] = useState<BoardSnapshot>(DEMO_INITIAL_BOARD);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const srcData = source.data;
        const destData = destination.data;
        if (!isBoardCardPayload(srcData) || !isColumnPayload(destData)) {
          return;
        }
        setBoard((prev) =>
          moveCardBetweenColumns(
            prev,
            srcData.cardId,
            srcData.columnId,
            destData.columnId,
          ),
        );
      },
    });
  }, []);

  return (
    <div
      className="not-prose my-8 rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm dark:border-slate-600/50 dark:bg-slate-900/55 sm:p-6"
      data-board-dnd-demo
    >
      <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
        Local-only demo using{" "}
        <a
          href="https://atlassian.design/components/pragmatic-drag-and-drop/"
          className="font-medium text-brand underline-offset-2 hover:underline"
          rel="noreferrer"
          target="_blank"
        >
          Pragmatic drag and drop
        </a>.
      </p>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {board.columns.map((col) => (
          <BoardColumn
            key={col.id}
            columnId={col.id}
            title={col.title}
            cards={col.cards}
          />
        ))}
      </div>
    </div>
  );
}
