"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import {
  DEMO_INITIAL_BOARD,
  type BoardCardModel,
  type BoardColumnModel,
  type BoardSnapshot,
} from "@/components/case-studies/board-application/BoardDndDemo";
import { ui } from "@/lib/ui";

const BOARD_CARD_DRAG_TYPE = "board-card-a11y" as const;

const BOARD_COLUMN_MIN_HEIGHT_CLASS = "min-h-[220px]";

const PRAGMATIC_DRAG_AND_DROP_URL =
  "https://atlassian.design/components/pragmatic-drag-and-drop/";

type BoardCardPayload = {
  type: typeof BOARD_CARD_DRAG_TYPE;
  cardId: string;
  columnId: string;
};

type ColumnPayload = { columnId: string };

function isBoardCardPayload(data: Record<string, unknown>): data is BoardCardPayload {
  return (
    data.type === BOARD_CARD_DRAG_TYPE &&
    typeof data.cardId === "string" &&
    typeof data.columnId === "string"
  );
}

function isColumnPayload(data: Record<string, unknown>): data is ColumnPayload {
  return typeof data.columnId === "string";
}

function cloneSnapshot(snapshot: BoardSnapshot): BoardSnapshot {
  return structuredClone(snapshot);
}

function moveCardBetweenColumns(
  board: BoardSnapshot,
  cardId: string,
  fromColumnId: string,
  toColumnId: string,
): BoardSnapshot {
  if (fromColumnId === toColumnId) return board;

  let moving: BoardCardModel | undefined;
  const afterRemove: BoardColumnModel[] = board.columns.map((col) => {
    if (col.id !== fromColumnId) return col;
    const idx = col.cards.findIndex((c) => c.id === cardId);
    if (idx === -1) return col;
    moving = col.cards[idx];
    return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
  });
  if (!moving) return board;
  const cardToMove = moving;
  return {
    columns: afterRemove.map((col) =>
      col.id === toColumnId ? { ...col, cards: [...col.cards, cardToMove] } : col,
    ),
  };
}

function removeCardFromBoard(
  board: BoardSnapshot,
  cardId: string,
  columnId: string,
): BoardSnapshot {
  return {
    columns: board.columns.map((col) =>
      col.id !== columnId ? col : { ...col, cards: col.cards.filter((c) => c.id !== cardId) },
    ),
  };
}

const MENU_CONTENT_CLASS =
  "z-[200] min-w-[11rem] overflow-hidden rounded-lg border border-slate-200/90 bg-white p-1 shadow-lg dark:border-slate-600/60 dark:bg-slate-900/95";

const MENU_ITEM_CLASS =
  "cursor-pointer rounded-md px-2 py-1.5 text-sm text-slate-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-slate-100 dark:text-slate-100 dark:data-[highlighted]:bg-slate-800";

const MENU_LABEL_CLASS =
  "px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400";

function AccessibleCard({
  card,
  columnId,
  columnTitle,
  allColumns,
  setBoard,
  announce,
}: {
  card: BoardCardModel;
  columnId: string;
  columnTitle: string;
  allColumns: BoardColumnModel[];
  setBoard: Dispatch<SetStateAction<BoardSnapshot>>;
  announce: (message: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: (): BoardCardPayload => ({
        type: BOARD_CARD_DRAG_TYPE,
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
      tabIndex={0}
      role="group"
      aria-label={`Card: ${card.title}. Column: ${columnTitle}.`}
      className={`cursor-grab rounded-lg border border-slate-200/90 bg-white px-3 py-2.5 text-base shadow-sm outline-none transition-[opacity,box-shadow] duration-150 ease-out active:cursor-grabbing dark:border-slate-600/60 dark:bg-slate-800/80 ${
        dragging ? "opacity-40" : ""
      } focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 font-medium text-slate-800 dark:text-slate-100">
          {card.title}
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label={`Card options, ${card.title}`}
              className="-m-1 shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:hover:bg-slate-700/80 dark:hover:text-slate-100"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4" aria-hidden />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={MENU_CONTENT_CLASS}
              sideOffset={4}
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <DropdownMenu.Label className={MENU_LABEL_CLASS}>Move to…</DropdownMenu.Label>
              <DropdownMenu.Separator className="my-1 h-px bg-slate-200 dark:bg-slate-600" />
              {allColumns.map((col) => (
                <DropdownMenu.Item
                  key={col.id}
                  className={MENU_ITEM_CLASS}
                  disabled={col.id === columnId}
                  onSelect={(e) => {
                    e.preventDefault();
                    if (col.id === columnId) return;
                    setBoard((prev) =>
                      moveCardBetweenColumns(prev, card.id, columnId, col.id),
                    );
                    announce(`Card “${card.title}” moved to ${col.title}.`);
                  }}
                >
                  {col.title}
                  {col.id === columnId ? " (current)" : ""}
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Separator className="my-1 h-px bg-slate-200 dark:bg-slate-600" />
              <DropdownMenu.Item
                className={`${MENU_ITEM_CLASS} text-brandDanger data-[highlighted]:bg-brandDanger/10 dark:data-[highlighted]:bg-brandDanger/15`}
                onSelect={(e) => {
                  e.preventDefault();
                  setBoard((prev) => removeCardFromBoard(prev, card.id, columnId));
                  announce(`Card “${card.title}” removed from ${columnTitle}.`);
                }}
              >
                Delete card
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
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

function AccessibleColumn({
  columnId,
  title,
  cards,
  allColumns,
  setBoard,
  announce,
}: {
  columnId: string;
  title: string;
  cards: BoardCardModel[];
  allColumns: BoardColumnModel[];
  setBoard: Dispatch<SetStateAction<BoardSnapshot>>;
  announce: (message: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      getData: (): ColumnPayload => ({ columnId }),
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: () => setIsOver(false),
    });
  }, [columnId]);

  return (
    <div
      ref={ref}
      className={`flex ${BOARD_COLUMN_MIN_HEIGHT_CLASS} min-w-0 flex-1 flex-col gap-3 rounded-2xl border p-4 transition-colors dark:border-slate-600/50 ${
        isOver
          ? "border-palette-jade/55 bg-palette-jade/[0.09] dark:border-palette-jade/50 dark:bg-palette-jade/[0.14]"
          : "border-slate-200/80 bg-slate-50/80 dark:bg-slate-900/40"
      }`}
    >
      <h3 className="font-heading text-sm font-bold tracking-tight text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <ul role="list" aria-label={`${title} — cards`} className="flex flex-1 flex-col gap-2">
        {cards.map((card) => (
          <li key={card.id} className="list-none">
            <AccessibleCard
              card={card}
              columnId={columnId}
              columnTitle={title}
              allColumns={allColumns}
              setBoard={setBoard}
              announce={announce}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Accessible board demo: focusable cards, ⋯ menu, live region. Kept separate from `BoardDndDemo`. */
export function BoardDndAccessibleDemo() {
  const [board, setBoard] = useState<BoardSnapshot>(() => cloneSnapshot(DEMO_INITIAL_BOARD));
  const [a11yStatus, setA11yStatus] = useState("");

  const announce = useCallback((message: string) => {
    setA11yStatus(message);
    window.setTimeout(() => setA11yStatus(""), 1200);
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;
        const srcData = source.data;
        const destData = destination.data;
        if (!isBoardCardPayload(srcData) || !isColumnPayload(destData)) return;
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
    <figure
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      aria-label="Accessible board demo with move menu"
      data-board-dnd-accessible-demo
    >
      <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
        Same fixture as the intro board, with <strong>keyboard focus</strong> on each card, a{" "}
        <strong>⋯</strong> menu (<strong>Move to…</strong> + <strong>Delete card</strong>), and a{" "}
        <strong>screen-reader status</strong> region after actions. Still{" "}
        <a
          href={PRAGMATIC_DRAG_AND_DROP_URL}
          className="font-medium text-brand underline-offset-2 hover:underline"
          rel="noreferrer"
          target="_blank"
        >
          Pragmatic drag and drop
        </a>{" "}
        for pointer moves.
      </p>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {a11yStatus}
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {board.columns.map((col) => (
          <AccessibleColumn
            key={col.id}
            columnId={col.id}
            title={col.title}
            cards={col.cards}
            allColumns={board.columns}
            setBoard={setBoard}
            announce={announce}
          />
        ))}
      </div>
    </figure>
  );
}
