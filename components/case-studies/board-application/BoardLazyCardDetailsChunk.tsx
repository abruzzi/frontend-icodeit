"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export type BoardLazyCardDetailsChunkProps = {
  card: {
    id: string;
    title: string;
    columnTitle: string;
    assignee: { name: string } | null;
  };
  onClose: () => void;
};

const CHUNK_EVALUATED_EVENT = "board:cardDetailsChunkEvaluated";

if (typeof window !== "undefined") {
  window.dispatchEvent(
    new CustomEvent(CHUNK_EVALUATED_EVENT, { detail: { at: Date.now() } }),
  );
}

export function BoardLazyCardDetailsChunk({ card, onClose }: BoardLazyCardDetailsChunkProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px] dark:bg-black/55"
      role="dialog"
      aria-modal="true"
      aria-label="Card details"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-600/55 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-600/45">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Card details (lazy chunk)
            </p>
            <p className="mt-1 truncate text-base font-semibold text-slate-900 dark:text-slate-50">
              {card.title}
            </p>
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
              Column:{" "}
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {card.columnTitle}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-50"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-700/60 dark:bg-slate-900/40">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Id
              </p>
              <p className="mt-1 font-mono text-sm text-slate-800 dark:text-slate-100">
                {card.id}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-700/60 dark:bg-slate-900/40">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Assignee
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {card.assignee ? card.assignee.name : "Unassigned"}
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-700/60 dark:bg-slate-950">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Activity
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-center justify-between gap-3">
                <span className="truncate">Opened details panel</span>
                <span className="shrink-0 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  now
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="truncate">This UI is loaded on demand</span>
                <span className="shrink-0 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  chunk
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

