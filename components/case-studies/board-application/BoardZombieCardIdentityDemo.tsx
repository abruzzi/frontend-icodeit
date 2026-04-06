"use client";

import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { AlertTriangle, GripVertical, RotateCcw, X } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { BOARD_DEMO_OUTLINE_BUTTON } from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";

type Card = { id: string; title: string };

const INITIAL_CARD: Card = { id: "card-1", title: "Fix bug" };

const ZOMBIE_CARD_DRAG_TYPE = "zombie-card-demo" as const;

type DemoVariant = "nested" | "normalized";

type ZombieCardPayload = {
  type: typeof ZOMBIE_CARD_DRAG_TYPE;
  demo: DemoVariant;
};

type ZombieColumnDropPayload = {
  demo: DemoVariant;
  column: "todo" | "doing";
};

function isZombieCardPayload(data: Record<string, unknown>): data is ZombieCardPayload {
  return (
    data.type === ZOMBIE_CARD_DRAG_TYPE &&
    (data.demo === "nested" || data.demo === "normalized")
  );
}

function isZombieColumnPayload(data: Record<string, unknown>): data is ZombieColumnDropPayload {
  return (
    (data.demo === "nested" || data.demo === "normalized") &&
    (data.column === "todo" || data.column === "doing")
  );
}

/** Two equal lanes; drop highlight when a drag can land here. */
function BoardColumn({
  title,
  children,
  isDropTarget,
  dropHint,
}: {
  title: string;
  children: ReactNode;
  isDropTarget?: boolean;
  dropHint?: string;
}) {
  return (
    <div
      className={[
        "flex min-h-[120px] min-w-0 flex-col gap-2 rounded-xl border p-3 transition-[border-color,box-shadow,background-color]",
        isDropTarget
          ? "border-palette-azure/55 bg-palette-azure/[0.08] ring-2 ring-palette-azure/25 dark:border-palette-azure/50 dark:bg-palette-azure/[0.12]"
          : "border-slate-200/80 bg-slate-50/90 dark:border-slate-600/50 dark:bg-slate-900/50",
      ].join(" ")}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div className="flex min-h-[56px] flex-1 flex-col gap-1.5">{children}</div>
      {dropHint ? (
        <p className="mt-auto text-[10px] text-slate-400 dark:text-slate-500">{dropHint}</p>
      ) : null}
    </div>
  );
}

/** Jira-style: drag from handle; click title opens the issue panel. */
function ZombieIssueCard({
  title,
  demo,
  selected,
  onOpenIssue,
}: {
  title: string;
  demo: DemoVariant;
  selected: boolean;
  onOpenIssue: () => void;
}) {
  const gripRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = gripRef.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: (): ZombieCardPayload => ({
        type: ZOMBIE_CARD_DRAG_TYPE,
        demo,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [demo]);

  return (
    <div
      className={[
        "flex min-w-0 overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm dark:border-slate-600/60 dark:bg-slate-800/90",
        selected ? "ring-2 ring-brand ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : "",
        dragging ? "opacity-60" : "",
      ].join(" ")}
    >
      <div
        ref={gripRef}
        className="flex shrink-0 cursor-grab items-center border-r border-slate-200/80 bg-slate-50/90 px-1.5 py-2 active:cursor-grabbing dark:border-slate-600/50 dark:bg-slate-800/80"
        aria-label="Drag to move column"
      >
        <GripVertical className="size-3.5 text-slate-400" aria-hidden />
      </div>
      <button
        type="button"
        onClick={onOpenIssue}
        className="min-w-0 flex-1 px-2 py-2 text-left text-xs font-medium text-slate-800 transition-colors hover:bg-slate-50/80 dark:text-slate-100 dark:hover:bg-slate-700/50"
      >
        <span className="line-clamp-2">{title}</span>
      </button>
    </div>
  );
}

function ColumnDropZone({
  demo,
  column,
  dropEnabled,
  title,
  children,
  dropHint,
}: {
  demo: DemoVariant;
  column: "todo" | "doing";
  dropEnabled: boolean;
  title: string;
  children: ReactNode;
  dropHint?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      getData: (): ZombieColumnDropPayload => ({ demo, column }),
      onDragEnter: () => {
        if (dropEnabled) setIsOver(true);
      },
      onDragLeave: () => setIsOver(false),
      onDrop: () => setIsOver(false),
    });
  }, [demo, column, dropEnabled]);

  return (
    <div ref={ref} className="min-w-0">
      <BoardColumn title={title} isDropTarget={dropEnabled && isOver} dropHint={dropHint}>
        {children}
      </BoardColumn>
    </div>
  );
}

function IssueDetailPanel({
  open,
  onClose,
  draft,
  onDraftChange,
  boardReads,
  inputCaption,
  variantNote,
}: {
  open: boolean;
  onClose: () => void;
  draft: string;
  onDraftChange: (v: string) => void;
  boardReads: string;
  inputCaption: ReactNode;
  variantNote: string;
}) {
  if (!open) return null;

  return (
    <aside className="flex w-full min-w-[220px] max-w-sm shrink-0 flex-col rounded-xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-600/50 dark:bg-slate-950/60 sm:w-64">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 px-3 py-2 dark:border-slate-600/50">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Issue detail</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Close panel"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <label className="block text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {inputCaption}
          <input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200/90 bg-white px-2 py-2 text-sm text-slate-900 dark:border-slate-600/60 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
        <p className="font-mono text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
          Board reads: <span className="text-slate-800 dark:text-slate-200">{boardReads}</span>
        </p>
        <p className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">{variantNote}</p>
      </div>
    </aside>
  );
}

/**
 * Nested column state + ref capture; move uses spread clone (identity fork after drag).
 */
function NestedZombiePanel() {
  const [nested, setNested] = useState<{ todo: Card[]; doing: Card[] }>({
    todo: [INITIAL_CARD],
    doing: [],
  });
  const zombieRef = useRef<Card | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const { todo, doing } = nested;
  const boardCard = doing[0] ?? todo[0];

  const zombieDetached =
    detailOpen &&
    doing.length > 0 &&
    zombieRef.current != null &&
    zombieRef.current !== doing[0];

  const openIssue = useCallback(() => {
    const c = todo[0] ?? doing[0];
    if (!c) return;
    zombieRef.current = c;
    setDraft(c.title);
    setDetailOpen(true);
  }, [todo, doing]);

  const closeIssue = useCallback(() => {
    setDetailOpen(false);
    zombieRef.current = null;
    setDraft("");
  }, []);

  const applyMove = useCallback((target: "todo" | "doing") => {
    setNested((prev) => {
      if (target === "doing" && prev.todo.length > 0 && prev.doing.length === 0) {
        return { todo: [], doing: [{ ...prev.todo[0] }] };
      }
      if (target === "todo" && prev.doing.length > 0 && prev.todo.length === 0) {
        return { doing: [], todo: [{ ...prev.doing[0] }] };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const dest = location.current.dropTargets[0];
        if (!dest) return;
        const s = source.data;
        const d = dest.data;
        if (!isZombieCardPayload(s) || s.demo !== "nested") return;
        if (!isZombieColumnPayload(d) || d.demo !== "nested") return;
        applyMove(d.column);
      },
    });
  }, [applyMove]);

  const onDraftChange = useCallback((v: string) => {
    setDraft(v);
    if (zombieRef.current) {
      zombieRef.current.title = v;
    }
  }, []);

  const reset = useCallback(() => {
    zombieRef.current = null;
    setNested({ todo: [{ ...INITIAL_CARD }], doing: [] });
    setDetailOpen(false);
    setDraft("");
  }, []);

  const canDropOnDoing = todo.length > 0 && doing.length === 0;
  const canDropOnTodo = doing.length > 0 && todo.length === 0;
  const selected = detailOpen;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-800 dark:bg-rose-500/20 dark:text-rose-200">
          Nested + captured ref
        </span>
        {zombieDetached ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 dark:text-amber-200">
            <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
            Detail edits a different object than the board
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
          <ColumnDropZone
            demo="nested"
            column="todo"
            dropEnabled={canDropOnTodo}
            title="To do"
            dropHint={canDropOnTodo ? "Drop to move back" : undefined}
          >
            {todo[0] ? (
              <ZombieIssueCard
                title={todo[0].title}
                demo="nested"
                selected={selected}
                onOpenIssue={openIssue}
              />
            ) : (
              <span className="text-xs text-slate-400">—</span>
            )}
          </ColumnDropZone>
          <ColumnDropZone
            demo="nested"
            column="doing"
            dropEnabled={canDropOnDoing}
            title="Doing"
            dropHint={canDropOnDoing ? "Drop here" : undefined}
          >
            {doing[0] ? (
              <ZombieIssueCard
                title={doing[0].title}
                demo="nested"
                selected={selected}
                onOpenIssue={openIssue}
              />
            ) : (
              <span className="text-xs text-slate-400">—</span>
            )}
          </ColumnDropZone>
        </div>

        <IssueDetailPanel
          open={detailOpen}
          onClose={closeIssue}
          draft={draft}
          onDraftChange={onDraftChange}
          boardReads={boardCard?.title ?? "—"}
          inputCaption={<>Summary (writes into captured object)</>}
          variantNote="Open this issue from To do, then drag it to Doing — the panel can keep editing the old object reference while the lane shows a spread clone."
        />
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Click the card title to open the detail drawer. Use the <strong className="text-slate-700 dark:text-slate-300">grip</strong> to drag between columns (same Pragmatic DnD stack as the board demo).
      </p>

      <button type="button" onClick={reset} className={BOARD_DEMO_OUTLINE_BUTTON}>
        <RotateCcw className="size-4" aria-hidden />
        Reset
      </button>
    </div>
  );
}

type NormalizedBoard = {
  cards: Record<string, Card>;
  todoIds: string[];
  doingIds: string[];
};

const INITIAL_NORMALIZED: NormalizedBoard = {
  cards: { "card-1": { ...INITIAL_CARD } },
  todoIds: ["card-1"],
  doingIds: [],
};

/** Normalized map + stable id; drag only moves ids. */
function NormalizedPanel() {
  const [board, setBoard] = useState<NormalizedBoard>(INITIAL_NORMALIZED);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const { cards, todoIds, doingIds } = board;

  const openIssue = useCallback(
    (id: string) => {
      if (!cards[id]) return;
      setActiveId(id);
      setDraft(cards[id].title);
    },
    [cards],
  );

  const closeIssue = useCallback(() => {
    setActiveId(null);
    setDraft("");
  }, []);

  const applyMove = useCallback((target: "todo" | "doing") => {
    setBoard((prev) => {
      if (target === "doing" && prev.todoIds.length > 0 && prev.doingIds.length === 0) {
        const id = prev.todoIds[0];
        return { ...prev, todoIds: [], doingIds: [id] };
      }
      if (target === "todo" && prev.doingIds.length > 0 && prev.todoIds.length === 0) {
        const id = prev.doingIds[0];
        return { ...prev, doingIds: [], todoIds: [id] };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const dest = location.current.dropTargets[0];
        if (!dest) return;
        const s = source.data;
        const d = dest.data;
        if (!isZombieCardPayload(s) || s.demo !== "normalized") return;
        if (!isZombieColumnPayload(d) || d.demo !== "normalized") return;
        applyMove(d.column);
      },
    });
  }, [applyMove]);

  const onDraftChange = useCallback(
    (v: string) => {
      if (!activeId) return;
      setDraft(v);
      setBoard((prev) => ({
        ...prev,
        cards: {
          ...prev.cards,
          [activeId]: { ...prev.cards[activeId], title: v },
        },
      }));
    },
    [activeId],
  );

  const reset = useCallback(() => {
    setBoard({
      cards: { "card-1": { ...INITIAL_CARD } },
      todoIds: ["card-1"],
      doingIds: [],
    });
    setActiveId(null);
    setDraft("");
  }, []);

  const canDropOnDoing = todoIds.length > 0 && doingIds.length === 0;
  const canDropOnTodo = doingIds.length > 0 && todoIds.length === 0;

  const todoCardId = todoIds[0];
  const doingCardId = doingIds[0];
  const todoCard = todoCardId ? cards[todoCardId] : undefined;
  const doingCard = doingCardId ? cards[doingCardId] : undefined;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-100">
          Normalized + card id
        </span>
        {activeId ? (
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            Board and panel share one card record
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
          <ColumnDropZone
            demo="normalized"
            column="todo"
            dropEnabled={canDropOnTodo}
            title="To do"
            dropHint={canDropOnTodo ? "Drop to move back" : undefined}
          >
            {todoCard && todoCardId ? (
              <ZombieIssueCard
                title={todoCard.title}
                demo="normalized"
                selected={activeId === todoCardId}
                onOpenIssue={() => openIssue(todoCardId)}
              />
            ) : (
              <span className="text-xs text-slate-400">—</span>
            )}
          </ColumnDropZone>
          <ColumnDropZone
            demo="normalized"
            column="doing"
            dropEnabled={canDropOnDoing}
            title="Doing"
            dropHint={canDropOnDoing ? "Drop here" : undefined}
          >
            {doingCard && doingCardId ? (
              <ZombieIssueCard
                title={doingCard.title}
                demo="normalized"
                selected={activeId === doingCardId}
                onOpenIssue={() => openIssue(doingCardId)}
              />
            ) : (
              <span className="text-xs text-slate-400">—</span>
            )}
          </ColumnDropZone>
        </div>

        <IssueDetailPanel
          open={activeId != null}
          onClose={closeIssue}
          draft={draft}
          onDraftChange={onDraftChange}
          boardReads={activeId ? cards[activeId]?.title ?? "—" : "—"}
          inputCaption={
            <>
              Summary (updates <code className="text-[11px]">cards[id]</code>)
            </>
          }
          variantNote="Same interaction: the drawer always edits the canonical record for the selected id, no matter which column the card is in."
        />
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Click the title to open the drawer; drag by the grip to change columns. Title edits stay aligned with the lane chip.
      </p>

      <button type="button" onClick={reset} className={BOARD_DEMO_OUTLINE_BUTTON}>
        <RotateCcw className="size-4" aria-hidden />
        Reset
      </button>
    </div>
  );
}

const pragmaticDndLink = (
  <a
    href="https://atlassian.design/components/pragmatic-drag-and-drop/"
    className="font-medium text-brand underline-offset-2 hover:underline"
    rel="noreferrer"
    target="_blank"
  >
    Pragmatic drag and drop
  </a>
);

/**
 * Nested column state + ref capture: shows identity fork (“zombie” card) after a spread clone move.
 * Pair with `BoardZombieCardIdentityFixDemo` after introducing normalised client state.
 */
export function BoardZombieCardIdentityProblemDemo() {
  return (
    <figure className={ui.caseStudyDemoShell} aria-label="Zombie card identity problem demo">
      <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-600/50 sm:px-5">
        <figcaption className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          When the detail drawer edits a stale object
        </figcaption>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          If a detail view keeps a <strong>reference</strong> to a card object nested in column state, and the move
          replaces that slot with <code className="text-xs">{`{ ...card }`}</code>, typing in the drawer can update a{" "}
          <strong>detached</strong> object while the board renders the clone — a &quot;zombie&quot; card. Two equal
          columns, <strong>click the title</strong> to open the drawer, <strong>drag the grip</strong> to move between
          lanes — same {pragmaticDndLink} setup as the other board demos in this article.
        </p>
      </div>
      <div className="p-4 sm:p-5">
        <NestedZombiePanel />
      </div>
    </figure>
  );
}

/**
 * Normalised map + stable id: same interaction as the problem demo, without forking identity.
 */
export function BoardZombieCardIdentityFixDemo() {
  return (
    <figure className={ui.caseStudyDemoShell} aria-label="Zombie card identity fix demo">
      <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-600/50 sm:px-5">
        <figcaption className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Same flow with a normalised <code className="text-xs">cards[id]</code> map
        </figcaption>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Keep one record per card id and only move <strong>ids</strong> between columns; the drawer always edits{" "}
          <code className="text-xs">cards[id]</code>, so the lane and the panel stay aligned after a drag.
        </p>
      </div>
      <div className="p-4 sm:p-5">
        <NormalizedPanel />
      </div>
    </figure>
  );
}
