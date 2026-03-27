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
  note: "border-blue-600 bg-blue-50/90",
  required: "border-amber-500 bg-amber-50/90",
  pitfall: "border-red-500 bg-red-50/90",
  essentials: "border-violet-600 bg-violet-50/90",
  production: "border-emerald-600 bg-emerald-50/90",
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
      className={`my-4 rounded-r-lg border-l-4 py-3 pl-4 pr-3 text-sm leading-relaxed text-neutral-800 ${toneClass[tone]}`}
    >
      <strong className="font-semibold text-neutral-900">{heading}:</strong>{" "}
      {children}
    </aside>
  );
}
