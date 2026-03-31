"use client";

import { ui } from "@/lib/ui";

function SkeletonLine({ w }: { w: string }) {
  return <div className={`h-3 rounded bg-slate-200/90 dark:bg-slate-700/70 ${w}`} />;
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm dark:border-slate-600/60 dark:bg-slate-800/80">
      <SkeletonLine w="w-2/3" />
      <div className="mt-2 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-200/90 dark:bg-slate-700/70" />
        <SkeletonLine w="w-1/2" />
      </div>
    </div>
  );
}

function SkeletonColumn({ titleWidth }: { titleWidth: string }) {
  return (
    <div className="flex min-h-[220px] min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-600/50 dark:bg-slate-900/40">
      <div className={`h-3 rounded bg-slate-200/90 dark:bg-slate-700/70 ${titleWidth}`} />
      <div className="flex flex-1 flex-col gap-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

export function BoardLoadingSkeletonDemo() {
  return (
    <div className={`${ui.caseStudyDemoShell} p-4 sm:p-6`} data-board-loading-skeleton-demo>
      <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
        A loading skeleton for the board. In production, you’d show this while fetching the initial snapshot.
      </p>
      <div className="animate-pulse flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <SkeletonColumn titleWidth="w-20" />
        <SkeletonColumn titleWidth="w-28" />
        <SkeletonColumn titleWidth="w-14" />
      </div>
    </div>
  );
}

