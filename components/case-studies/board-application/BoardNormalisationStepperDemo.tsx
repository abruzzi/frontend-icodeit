"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import nestedSnapshot from "@/content/case-studies/board-application/snippets/board-1.json";
import normalisedSnapshot from "@/content/case-studies/board-application/snippets/board-1-normalised.json";
import { ui } from "@/lib/ui";

type NestedCard = {
  id: string;
  title: string;
  assignee?: { id: number; name: string; avatar_url?: string };
};

type NestedColumn = {
  id: string;
  title: string;
  cards: NestedCard[];
};

type NestedBoard = {
  id: string;
  name: string;
  columns: NestedColumn[];
};

const shell =
  "rounded-xl border shadow-sm dark:shadow-none transition-[padding] duration-300 ease-out";

const boardOuterNested =
  "border-brand/40 bg-brand/[0.06] p-4 ring-1 ring-brand/15 dark:border-brand/45 dark:bg-brand/[0.1] dark:ring-brand/20";

const boardOuterFlat =
  "border-slate-200/90 bg-white/80 p-5 ring-1 ring-slate-200/40 dark:border-slate-600/50 dark:bg-slate-900/50 dark:ring-slate-700/40";

const columnShell =
  "flex min-h-[140px] min-w-[158px] flex-1 flex-col gap-2 rounded-lg border-2 border-palette-azure/45 bg-palette-azure/[0.08] p-2.5 dark:border-palette-azure/50 dark:bg-palette-azure/[0.12]";

const columnShellFlat =
  "flex min-h-[108px] min-w-[158px] flex-1 flex-col rounded-lg border-2 border-palette-azure/45 bg-palette-azure/[0.08] p-2.5 dark:border-palette-azure/50 dark:bg-palette-azure/[0.12]";

const cardShell =
  "rounded-lg border-2 border-palette-jade/45 bg-palette-jade/[0.07] p-2 dark:border-palette-jade/50 dark:bg-palette-jade/[0.11]";

const userShellNested =
  "mt-2 rounded-md border border-palette-gold/55 bg-palette-gold/[0.14] px-2 py-1.5 dark:border-palette-gold/45 dark:bg-palette-gold/[0.16]";

const userShellFlat =
  "rounded-lg border-2 border-palette-gold/50 bg-palette-gold/[0.12] px-2.5 py-2 dark:border-palette-gold/45 dark:bg-palette-gold/[0.14]";

function LaneLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </p>
  );
}

/** True containment: board → columns → cards → user (no graph links). */
function NestedContainmentView({ board }: { board: NestedBoard }) {
  return (
    <motion.div
      layout
      className={`${shell} ${boardOuterNested}`}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      <div className="mb-3 border-b border-brand/20 pb-2 text-center dark:border-brand/30">
        <span className="font-heading text-[11px] font-extrabold uppercase tracking-wide text-brand">Board</span>
        <p className="mt-0.5 font-mono text-sm text-slate-800 dark:text-slate-100">{board.name}</p>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">Columns and cards are physically nested inside this box</p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {board.columns.map((col) => (
          <motion.div
            key={col.id}
            layoutId={`norm-col-${col.id}`}
            className={columnShell}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <p className="border-b border-slate-200/70 pb-1 text-center font-heading text-[10px] font-extrabold uppercase tracking-wide text-slate-800 dark:border-slate-600/50 dark:text-slate-100">
              {col.title}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {col.cards.length === 0 ? (
                <p className="py-2 text-center text-[10px] text-slate-400 dark:text-slate-500">empty</p>
              ) : null}
              {col.cards.map((card) => (
                <motion.div
                  key={card.id}
                  layoutId={`norm-card-${card.id}`}
                  className={cardShell}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <p className="font-mono text-[9px] font-semibold text-slate-500 dark:text-slate-400">{card.id}</p>
                  <p className="text-[10px] font-medium leading-snug text-slate-800 dark:text-slate-100">{card.title}</p>
                  {card.assignee ? (
                    <motion.div
                      layoutId={`norm-user-${card.assignee.id}`}
                      className={userShellNested}
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-palette-gold">User</p>
                      <p className="text-[10px] font-medium text-slate-800 dark:text-slate-100">{card.assignee.name}</p>
                      <p className="font-mono text-[9px] text-slate-500 dark:text-slate-400">id {card.assignee.id}</p>
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FlatMapsView() {
  const snap = normalisedSnapshot as {
    name: string;
    columnIds: string[];
    columns: Record<string, { id: string; title: string; cards: string[] }>;
    cards: Record<string, { id: string; title: string; assignee: number | null }>;
    users: Record<string, { id: string; name: string }>;
  };

  const cardOrder = ["card-1", "card-2", "card-3"] as const;

  return (
    <motion.div
      layout
      className={`${shell} ${boardOuterFlat}`}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      <motion.div
        layoutId="norm-board-strip"
        className="mb-4 rounded-lg border border-brand/30 bg-brand/[0.08] px-3 py-2 text-center dark:border-brand/35 dark:bg-brand/[0.12]"
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        <span className="font-heading text-[11px] font-extrabold uppercase tracking-wide text-brand">Board</span>
        <p className="font-mono text-sm text-slate-800 dark:text-slate-100">{snap.name}</p>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
          Sibling maps on state — not nested; ids reference each other
        </p>
      </motion.div>

      <div className="space-y-5">
        <div>
          <LaneLabel>state.columns</LaneLabel>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {snap.columnIds.map((colId) => {
              const col = snap.columns[colId];
              if (!col) return null;
              return (
                <motion.div
                  key={colId}
                  layoutId={`norm-col-${colId}`}
                  className={columnShellFlat}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <p className="font-mono text-[9px] text-palette-azure">{colId}</p>
                  <p className="border-b border-slate-200/70 pb-1 text-center font-heading text-[10px] font-extrabold uppercase tracking-wide text-slate-800 dark:border-slate-600/50 dark:text-slate-100">
                    {col.title}
                  </p>
                  <p className="mt-2 font-mono text-[9px] leading-relaxed text-slate-600 dark:text-slate-300">
                    cards:{" "}
                    <span className="text-palette-jade">
                      [{col.cards.map((id) => `"${id}"`).join(", ")}]
                    </span>
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <LaneLabel>state.cards</LaneLabel>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            {cardOrder.map((cid) => {
              const card = snap.cards[cid];
              if (!card) return null;
              return (
                <motion.div
                  key={card.id}
                  layoutId={`norm-card-${card.id}`}
                  className={cardShell}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <p className="font-mono text-[9px] font-semibold text-slate-500 dark:text-slate-400">{card.id}</p>
                  <p className="text-[10px] font-medium leading-snug text-slate-800 dark:text-slate-100">{card.title}</p>
                  <p className="mt-1 font-mono text-[9px] text-slate-600 dark:text-slate-300">
                    assignee:{" "}
                    <span className="text-palette-gold">{card.assignee == null ? "null" : card.assignee}</span>
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <LaneLabel>state.users</LaneLabel>
          <div className="flex flex-wrap gap-2">
            {Object.values(snap.users).map((u) => (
              <motion.div
                key={u.id}
                layoutId={`norm-user-${u.id}`}
                className={userShellFlat}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              >
                <p className="text-center font-heading text-[10px] font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                  User
                </p>
                <p className="mt-1 text-center font-mono text-[9px] text-slate-600 dark:text-slate-300">id {u.id}</p>
                <p className="text-center text-[10px] font-medium text-slate-800 dark:text-slate-100">{u.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BoardNormalisationStepperDemo() {
  const board = nestedSnapshot as NestedBoard;
  const [flat, setFlat] = useState(false);
  const [busy, setBusy] = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  const dotPaneStyle = useMemo(
    () =>
      ({
        backgroundImage: `radial-gradient(circle, ${
          dark ? "rgba(148,163,184,0.2)" : "rgba(148,163,184,0.24)"
        } 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0",
      }) as const,
    [dark],
  );

  const toggle = useCallback(() => {
    if (busy) return;
    setBusy(true);
    setFlat((f) => !f);
    window.setTimeout(() => setBusy(false), 900);
  }, [busy]);

  return (
    <div className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}>
      <p className="mb-3 text-base text-slate-600 dark:text-slate-400">
        Same data as <code className="text-sm">snippets/board-1.json</code> →{" "}
        <code className="text-sm">board-1-normalised.json</code>.{" "}
        <strong className="text-slate-800 dark:text-slate-200">Before</strong> is true nesting (boxes inside boxes — no
        link lines). <strong className="text-slate-800 dark:text-slate-200">After</strong> is flat maps; shared{" "}
        <code className="text-sm">layoutId</code>s let Framer Motion carry columns, cards, and the user into their map
        rows.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            !flat
              ? "bg-palette-azure/20 text-palette-azure"
              : "bg-palette-jade/20 text-palette-jade"
          }`}
        >
          {!flat ? "Before — nested DOM" : "After — flat maps"}
        </span>
        <button
          type="button"
          disabled={busy}
          onClick={toggle}
          className={
            !flat
              ? "rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-50"
              : "rounded-lg border border-slate-200/90 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
          }
        >
          {!flat ? "Normalise — open into maps" : "Show nested board again"}
        </button>
      </div>

      <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/85 dark:border-slate-600/40 dark:bg-slate-900/45">
        <div className="pointer-events-none absolute inset-0 z-0" style={dotPaneStyle} aria-hidden />
        <div className="relative z-[1] p-4 sm:p-5">
          <LayoutGroup id="board-normalisation-demo">
            {!flat ? <NestedContainmentView board={board} /> : <FlatMapsView />}
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}
