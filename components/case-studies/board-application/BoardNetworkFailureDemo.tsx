"use client";

import { AlertTriangle, CheckCircle2, WifiOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BoardDndDemo } from "@/components/case-studies/board-application/BoardDndDemo";
import { BoardLoadingSkeletonDemo } from "@/components/case-studies/board-application/BoardLoadingSkeletonDemo";
import { ui } from "@/lib/ui";

type SimulatedFetchMode = "success" | "offline" | "timeout" | "server-error" | "loading";

type SimulatedFetchResult =
  | { state: "idle" | "loading" }
  | { state: "success" }
  | { state: "error"; kind: Exclude<SimulatedFetchMode, "success" | "loading"> };

function ErrorPanel({
  kind,
  onRetry,
}: {
  kind: Exclude<SimulatedFetchMode, "success" | "loading">;
  onRetry: () => void;
}) {
  const copy = useMemo(() => {
    switch (kind) {
      case "offline":
        return {
          title: "You’re offline",
          body: "We can’t load the board right now. Check your connection, then retry.",
          Icon: WifiOff,
        };
      case "timeout":
        return {
          title: "Request timed out",
          body: "The server didn’t respond in time. Retry, or fall back to a lighter snapshot.",
          Icon: AlertTriangle,
        };
      case "server-error":
        return {
          title: "Server error",
          body: "Something failed on the server. Show a safe message and keep the user’s context.",
          Icon: AlertTriangle,
        };
    }
  }, [kind]);

  const Icon = copy.Icon;

  return (
    <div
      className={`${ui.caseStudyDemoShell} p-4 sm:p-6`}
      role="region"
      aria-label="Board error state demo"
      data-board-network-failure-demo
    >
      <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
        This is a simulated failure state. The goal is to make error handling explorable without a real API.
      </p>

      <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 dark:border-slate-600/60 dark:bg-slate-900/45 sm:p-6">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brandDanger" aria-hidden />
          <div className="min-w-0">
            <p className="text-base font-semibold text-slate-900 dark:text-slate-50">{copy.title}</p>
            <p className="mt-1 text-base text-slate-600 dark:text-slate-400">{copy.body}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
              >
                Retry (simulated)
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-sm font-semibold text-slate-400 dark:border-slate-600/60 dark:bg-slate-800/60"
                aria-disabled="true"
              >
                View status page (mock)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BoardNetworkFailureDemo() {
  const [mode, setMode] = useState<SimulatedFetchMode>("success");
  // Default mode is "success" — render a safe first frame before effects run.
  const [result, setResult] = useState<SimulatedFetchResult>({ state: "success" });

  useEffect(() => {
    if (mode === "loading") {
      setResult({ state: "loading" });
      return;
    }
    if (mode === "success") {
      setResult({ state: "success" });
      return;
    }
    setResult({ state: "error", kind: mode });
  }, [mode]);

  const controls = (
    <div className={`${ui.caseStudyDemoShell} p-4 sm:p-6`} data-board-network-failure-controls>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Error-state simulator
          </p>
          <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
            Toggle a “fetch result” to see the UI state you’d ship.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: "success", label: "Success", Icon: CheckCircle2 },
              { id: "loading", label: "Loading", Icon: AlertTriangle },
              { id: "offline", label: "Offline", Icon: WifiOff },
              { id: "timeout", label: "Timeout", Icon: AlertTriangle },
              { id: "server-error", label: "500", Icon: AlertTriangle },
            ] as const
          ).map(({ id, label, Icon }) => (
            <label
              key={id}
              className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                mode === id
                  ? "border-brand/40 bg-brand/[0.10] text-slate-900 dark:text-slate-50"
                  : "border-slate-200/90 bg-white/80 text-slate-700 hover:bg-slate-50 dark:border-slate-600/60 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/55"
              }`}
            >
              <input
                type="radio"
                name="board-network-failure-mode"
                value={id}
                checked={mode === id}
                onChange={() => setMode(id)}
                className="sr-only"
              />
              <Icon className="h-4 w-4 opacity-80" aria-hidden />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  switch (result.state) {
    case "success":
      return (
        <div className="space-y-3">
          {controls}
          <BoardDndDemo />
        </div>
      );
    case "loading":
    case "idle":
      return (
        <div className="space-y-3">
          {controls}
          <BoardLoadingSkeletonDemo />
        </div>
      );
    case "error":
      return (
        <div className="space-y-3">
          {controls}
          <ErrorPanel kind={result.kind} onRetry={() => setMode("success")} />
        </div>
      );
  }
}

