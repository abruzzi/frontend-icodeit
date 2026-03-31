import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Asterisk,
  Layers,
  Rocket,
  StickyNote,
} from "lucide-react";
import type { ReactNode } from "react";

type CalloutTone = "note" | "required" | "pitfall" | "essentials" | "production";

/** For `aria-label` when there is no visible title — icon + tint carry the tone. */
const toneLabel: Record<CalloutTone, string> = {
  note: "Note",
  required: "Required",
  pitfall: "Pitfall",
  essentials: "Essentials",
  production: "Production mode",
};

/** Very light wash from `site-colors.json` — no border or ring. */
const toneShell: Record<CalloutTone, string> = {
  note: "bg-palette-magenta/[0.06] dark:bg-palette-magenta/[0.09]",
  required:
    "bg-palette-gold/[0.07] dark:bg-palette-gold/[0.1]",
  pitfall:
    "bg-brandDanger/[0.06] dark:bg-brandDanger/[0.09]",
  essentials:
    "bg-brandSecondary/[0.06] dark:bg-brandSecondary/[0.09]",
  production:
    "bg-palette-jade/[0.06] dark:bg-palette-jade/[0.09]",
};

const toneIconClass: Record<CalloutTone, string> = {
  note: "text-palette-magenta",
  required: "text-palette-tangerine dark:text-palette-gold",
  pitfall: "text-brandDanger",
  essentials: "text-brandSecondary",
  production: "text-palette-jade",
};

const toneIcon: Record<CalloutTone, LucideIcon> = {
  note: StickyNote,
  required: Asterisk,
  pitfall: AlertTriangle,
  essentials: Layers,
  production: Rocket,
};

type CalloutProps = {
  children: ReactNode;
  tone?: CalloutTone;
  /** Overrides the default accessible name for the aside (still not shown visually). */
  title?: string;
};

export function Callout({ children, tone = "note", title }: CalloutProps) {
  const Icon = toneIcon[tone];
  return (
    <aside
      aria-label={title ?? toneLabel[tone]}
      className={`my-5 rounded-xl px-3.5 py-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200 ${toneShell[tone]}`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-[0.2em] shrink-0 ${toneIconClass[tone]}`}
          size={18}
          strokeWidth={2.25}
          aria-hidden
        />
        <div className="min-w-0 flex-1 leading-relaxed [&>*:first-child]:mt-0 [&_p]:mt-0 [&_p]:mb-3 [&_p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
