"use client";

import { Clock, Layers3, Loader2, User } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BOARD_DEMO_OUTLINE_BUTTON } from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";

import type { BoardLazyCardDetailsChunkProps } from "./BoardLazyCardDetailsChunk";

const CHUNK_EVALUATED_EVENT = "board:cardDetailsChunkEvaluated";
const FIRST_LOAD_DELAY_MS = 800;

type Assignee = { name: string; avatar_url: string } | null;

type Card = { id: string; title: string; columnTitle: string; assignee: Assignee };

type ChunkStatus = "idle" | "loading" | "loaded";

function DemoCardRow({
  card,
  preloadOnIntent,
  ensureChunk,
  onOpen,
}: {
  card: Card;
  preloadOnIntent: boolean;
  ensureChunk: () => Promise<void> | void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => {
        if (preloadOnIntent) void ensureChunk();
      }}
      onFocus={() => {
        if (preloadOnIntent) void ensureChunk();
      }}
      className="min-w-0 cursor-pointer rounded-lg border border-slate-200/90 bg-white px-3 py-2.5 text-left text-base shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600/60 dark:bg-slate-800/80 dark:hover:bg-slate-800"
    >
      <div className="min-w-0 font-medium text-slate-800 dark:text-slate-100">
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
    </button>
  );
}

function DemoColumn({
  title,
  cards,
  preloadOnIntent,
  ensureChunk,
  onOpenCard,
}: {
  title: string;
  cards: readonly Card[];
  preloadOnIntent: boolean;
  ensureChunk: () => Promise<void> | void;
  onOpenCard: (card: Card) => void;
}) {
  return (
    <div className="flex min-h-[220px] min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-600/50 dark:bg-slate-900/40">
      <h3 className="font-heading text-sm font-bold tracking-tight text-slate-700 dark:text-slate-200">
        {title}
      </h3>
      <div className="flex flex-1 flex-col gap-2">
        {cards.map((card) => (
          <DemoCardRow
            key={card.id}
            card={card}
            preloadOnIntent={preloadOnIntent}
            ensureChunk={ensureChunk}
            onOpen={() => void onOpenCard(card)}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "neutral" | "info" | "success";
  children: ReactNode;
}) {
  const cls =
    tone === "success"
      ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-900 dark:border-emerald-500/45 dark:bg-emerald-500/10 dark:text-emerald-100"
      : tone === "info"
        ? "border-palette-azure/55 bg-palette-azure/10 text-palette-azure dark:border-palette-azure/45 dark:bg-palette-azure/10 dark:text-palette-azure"
        : "border-slate-200/80 bg-slate-100/70 text-slate-700 dark:border-slate-600/50 dark:bg-slate-800/55 dark:text-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cls}`}
    >
      {children}
    </span>
  );
}

function SkeletonDetails() {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px] dark:bg-black/55"
      role="dialog"
      aria-modal="true"
      aria-label="Loading card details"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-600/55 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-600/45">
          <div className="min-w-0">
            <div className="h-3 w-40 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/60" />
            <div className="mt-2 h-5 w-72 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/60" />
            <div className="mt-2 h-4 w-44 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/60" />
          </div>
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-700/60" />
        </div>
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 animate-pulse rounded-xl border border-slate-200/80 bg-slate-50/80 dark:border-slate-700/60 dark:bg-slate-900/40" />
            <div className="h-20 animate-pulse rounded-xl border border-slate-200/80 bg-slate-50/80 dark:border-slate-700/60 dark:bg-slate-900/40" />
          </div>
          <div className="mt-3 h-28 animate-pulse rounded-xl border border-slate-200/80 bg-white dark:border-slate-700/60 dark:bg-slate-950" />
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Loader2 className="size-3.5 animate-spin" aria-hidden />
            Loading details chunk…
          </p>
        </div>
      </div>
    </div>
  );
}

async function delay(ms: number) {
  await new Promise((r) => window.setTimeout(r, ms));
}

export function BoardLazyCardDetailsDemo() {
  const board = useMemo(
    () => [
      {
        id: "col-1",
        title: "Backlog",
        cards: [
          {
            id: "card-08",
            title: "Triage flaky optimistic rollback",
            columnTitle: "Backlog",
            assignee: null,
          },
          {
            id: "card-12",
            title: "Spike: column virtualization threshold",
            columnTitle: "Backlog",
            assignee: { name: "Charlie Moore", avatar_url: "https://i.pravatar.cc/150?img=2" },
          },
        ] satisfies Card[],
      },
      {
        id: "col-2",
        title: "In Progress",
        cards: [
          {
            id: "card-21",
            title: "Add WIP limit badge",
            columnTitle: "In Progress",
            assignee: { name: "Diana Lopez", avatar_url: "https://i.pravatar.cc/150?img=8" },
          },
          {
            id: "card-34",
            title: "Investigate slow drag under load",
            columnTitle: "In Progress",
            assignee: { name: "Hannah Smith", avatar_url: "https://i.pravatar.cc/150?img=5" },
          },
        ] satisfies Card[],
      },
      {
        id: "col-3",
        title: "Done",
        cards: [
          {
            id: "card-55",
            title: "Ship: details panel code split",
            columnTitle: "Done",
            assignee: { name: "Quentin Davis", avatar_url: "https://i.pravatar.cc/150?img=1" },
          },
        ] satisfies Card[],
      },
    ],
    [],
  );

  const [selected, setSelected] = useState<Card | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ChunkStatus>("idle");
  const [evaluatedAt, setEvaluatedAt] = useState<number | null>(null);
  const [preloadOnIntent, setPreloadOnIntent] = useState(true);
  const [Chunk, setChunk] = useState<((p: BoardLazyCardDetailsChunkProps) => ReactNode) | null>(
    null,
  );

  const loadRef = useRef<Promise<void> | null>(null);
  const loadedOnceRef = useRef(false);

  const ensureChunk = useCallback(async () => {
    if (Chunk) return;
    if (loadRef.current) return loadRef.current;

    setStatus("loading");
    loadRef.current = (async () => {
      if (!loadedOnceRef.current) {
        await delay(FIRST_LOAD_DELAY_MS);
      }
      const mod = await import("./BoardLazyCardDetailsChunk");
      setChunk(() => mod.BoardLazyCardDetailsChunk);
      setStatus("loaded");
      loadedOnceRef.current = true;
    })().finally(() => {
      loadRef.current = null;
    });

    return loadRef.current;
  }, [Chunk]);

  const openDetails = useCallback(
    async (card: Card) => {
      setSelected(card);
      setOpen(true);
      await ensureChunk();
    },
    [ensureChunk],
  );

  const closeDetails = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onEvaluated = (e: Event) => {
      const evt = e as CustomEvent<{ at?: number }>;
      const at = typeof evt.detail?.at === "number" ? evt.detail.at : Date.now();
      setEvaluatedAt(at);
    };
    window.addEventListener(CHUNK_EVALUATED_EVENT, onEvaluated);
    return () => window.removeEventListener(CHUNK_EVALUATED_EVENT, onEvaluated);
  }, []);

  const statusPill = status === "loaded" ? (
    <Pill tone="success">
      <Layers3 className="size-3.5" aria-hidden />
      Details chunk loaded (cached)
    </Pill>
  ) : status === "loading" ? (
    <Pill tone="info">
      <Loader2 className="size-3.5 animate-spin" aria-hidden />
      Loading details chunk…
    </Pill>
  ) : (
    <Pill tone="neutral">
      <Layers3 className="size-3.5" aria-hidden />
      Details code not loaded
    </Pill>
  );

  return (
    <figure className={ui.caseStudyDemoShell} aria-label="Lazy-loaded card details demo">
      <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-600/50 sm:px-5">
        <figcaption className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Lazy-load card details on demand
        </figcaption>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          The board stays lightweight until you open a card. The first open shows a deliberate skeleton (teaching
          aid), and the header pill flips to show when the chunk is actually loaded.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {statusPill}
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <Clock className="size-3.5" aria-hidden />
            Chunk evaluated:{" "}
            <span className="font-mono text-[11px] text-slate-700 dark:text-slate-200">
              {evaluatedAt ? new Date(evaluatedAt).toLocaleTimeString() : "—"}
            </span>
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={preloadOnIntent}
                onChange={(e) => setPreloadOnIntent(e.target.checked)}
                className="size-4 rounded border-slate-300 text-brand dark:border-slate-600"
              />
              Preload on hover / focus (intent)
            </label>
            <button
              type="button"
              onClick={() => void ensureChunk()}
              className={BOARD_DEMO_OUTLINE_BUTTON}
              disabled={status === "loading" || status === "loaded"}
            >
              <Layers3 className="size-4" aria-hidden />
              Preload now
            </button>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {board.map((col) => (
              <DemoColumn
                key={col.id}
                title={col.title}
                cards={col.cards}
                preloadOnIntent={preloadOnIntent}
                ensureChunk={ensureChunk}
                onOpenCard={(card) => void openDetails(card)}
              />
            ))}
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Tip: with preload enabled, hover a card first — the pill should flip to “loaded” before you click, so the
            modal opens instantly.
          </p>
        </div>
      </div>

      {open && selected ? (
        Chunk ? (
          <Chunk card={selected} onClose={closeDetails} />
        ) : (
          <SkeletonDetails />
        )
      ) : null}
    </figure>
  );
}

