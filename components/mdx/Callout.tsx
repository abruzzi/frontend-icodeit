import type { ReactNode } from "react";

type CalloutTone = "note" | "required" | "pitfall" | "essentials" | "production";

const toneLabel: Record<CalloutTone, string> = {
  note: "Note",
  required: "Required",
  pitfall: "Pitfall",
  essentials: "Essentials",
  production: "Production mode",
};

const toneClass: Record<CalloutTone, string> = {
  note: "bg-rose-50/95 dark:bg-rose-950/35",
  required: "bg-amber-50/95 dark:bg-amber-950/35",
  pitfall: "bg-red-50/95 dark:bg-red-950/30",
  essentials: "bg-violet-50/95 dark:bg-violet-950/35",
  production: "bg-emerald-50/95 dark:bg-emerald-950/30",
};

type CalloutProps = {
  children: ReactNode;
  tone?: CalloutTone;
  title?: string;
};

export function Callout({ children, tone = "note", title }: CalloutProps) {
  const heading = title ?? toneLabel[tone];
  return (
    <aside
      className={`my-5 rounded-2xl px-4 py-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200 ${toneClass[tone]}`}
    >
      <strong className="font-semibold text-slate-900 dark:text-slate-50">
        {heading}:
      </strong>{" "}
      {children}
    </aside>
  );
}
