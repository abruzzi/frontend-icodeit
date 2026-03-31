"use client";

import { Plus, User } from "lucide-react";
import { useMemo, useState } from "react";

import { ui } from "@/lib/ui";

type DemoCard = {
  id: string;
  title: string;
};

type DemoColumn = {
  id: string;
  title: string;
  cards: DemoCard[];
};

function BoardTopBar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-50">Sprint board</p>
        <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
          Columns are ready — add the first card to get started.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled
          className="rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm font-semibold text-slate-400 dark:border-slate-600/60 dark:bg-slate-800/60"
          aria-disabled="true"
        >
          Search (mock)
        </button>
        <button
          type="button"
          disabled
          className="rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm font-semibold text-slate-400 dark:border-slate-600/60 dark:bg-slate-800/60"
          aria-disabled="true"
        >
          Filters (mock)
        </button>
      </div>
    </div>
  );
}

function BoardCardView({ card }: { card: DemoCard }) {
  return (
    <div className="rounded-lg border border-slate-200/90 bg-white px-3 py-2.5 text-base shadow-sm dark:border-slate-600/60 dark:bg-slate-800/80">
      <div className="font-medium text-slate-800 dark:text-slate-100">{card.title}</div>
      <div className="mt-2 flex min-h-6 items-center gap-2">
        <div
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200/90 text-slate-500 ring-1 ring-slate-300/80 dark:bg-slate-600/80 dark:text-slate-400 dark:ring-slate-500/60"
          aria-hidden
        >
          <User className="h-3.5 w-3.5 opacity-80" strokeWidth={2} />
        </div>
        <span className="truncate text-sm text-slate-400 dark:text-slate-500">Unassigned</span>
      </div>
    </div>
  );
}

function EmptyColumnsNoCards({
  columns,
  onCreateCardInTodo,
}: {
  columns: readonly DemoColumn[];
  onCreateCardInTodo: (title: string) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");

  function resetComposer() {
    setIsAdding(false);
    setDraftTitle("");
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base text-slate-600 dark:text-slate-400">
        No cards yet. Start by adding one in <strong className="text-slate-800 dark:text-slate-200">To do</strong>,
        then move it across columns.
      </p>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex min-h-[220px] min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-600/50 dark:bg-slate-900/40"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-heading text-sm font-bold tracking-tight text-slate-700 dark:text-slate-200">
                {col.title}
              </h3>
            </div>

            {col.id === "col-todo" && col.cards.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tip: create cards here first. You can always move them later.
              </p>
            ) : null}

            {col.cards.length === 0 && col.id !== "col-todo" ? (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200/90 bg-white/80 px-4 py-8 text-center dark:border-slate-600/60 dark:bg-slate-900/30">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Drop cards here
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  (Once cards exist, this becomes a real drag target.)
                </p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-2">
                {col.cards.map((card) => (
                  <BoardCardView key={card.id} card={card} />
                ))}

                {col.id === "col-todo" ? (
                  isAdding ? (
                    <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-sm dark:border-slate-600/60 dark:bg-slate-800/80">
                      <label className="sr-only" htmlFor="new-card-title">
                        Card title
                      </label>
                      <textarea
                        id="new-card-title"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        placeholder="Enter a title for this card…"
                        rows={3}
                        className="w-full resize-none rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand/60 focus:ring-2 focus:ring-brand/20 dark:border-slate-600/60 dark:bg-slate-900/30 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const title = draftTitle.trim();
                            if (!title) return;
                            onCreateCardInTodo(title);
                            resetComposer();
                          }}
                          className="inline-flex items-center rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
                        >
                          Add card
                        </button>
                        <button
                          type="button"
                          onClick={resetComposer}
                          className="inline-flex items-center rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600/60 dark:bg-slate-900/30 dark:text-slate-200 dark:hover:bg-slate-900/45"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAdding(true)}
                      className="mt-1 inline-flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-200/90 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white dark:border-slate-600/60 dark:bg-slate-900/25 dark:text-slate-300 dark:hover:bg-slate-900/35"
                    >
                      <Plus className="h-4 w-4 opacity-80" aria-hidden />
                      Add a card
                    </button>
                  )
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BoardEmptyStateDemo() {
  const [flash, setFlash] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);

  const initialColumns = useMemo<DemoColumn[]>(
    () => [
      { id: "col-todo", title: "To do", cards: [] },
      { id: "col-doing", title: "In Progress", cards: [] },
      { id: "col-done", title: "Done", cards: [] },
    ],
    [],
  );

  const [columns, setColumns] = useState<DemoColumn[]>(initialColumns);

  return (
    <div className={`${ui.caseStudyDemoShell} p-4 sm:p-6`} data-board-empty-state-demo>
      <div className="flex flex-col gap-4">
        <BoardTopBar />

        {flash ? (
          <p className="rounded-xl border border-palette-jade/40 bg-palette-jade/[0.08] px-3 py-2 text-sm font-semibold text-slate-700 dark:border-palette-jade/35 dark:bg-palette-jade/[0.12] dark:text-slate-200">
            {flash}
          </p>
        ) : null}

        <EmptyColumnsNoCards
          columns={columns}
          onCreateCardInTodo={(title) => {
            const id = nextId;
            setNextId((n) => n + 1);

            const newCard: DemoCard = {
              id: `demo-${id}`,
              title,
            };

            setColumns((prev) =>
              prev.map((c) =>
                c.id === "col-todo" ? { ...c, cards: [...c.cards, newCard] } : c,
              ),
            );

            setFlash(null);
          }}
        />
      </div>
    </div>
  );
}

