import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Asterisk,
  Layers,
  Rocket,
  StickyNote,
} from "lucide-react";
import type { ReactNode } from "react";

type ToneConfig = {
  label: string;
  shell: string;
  iconClass: string;
  Icon: LucideIcon;
};

const CALLOUT_TONE: Record<
  "note" | "required" | "pitfall" | "essentials" | "production",
  ToneConfig
> = {
  note: {
    label: "Note",
    shell: "bg-palette-magenta/[0.06] dark:bg-palette-magenta/[0.09]",
    iconClass: "text-palette-magenta",
    Icon: StickyNote,
  },
  required: {
    label: "Required",
    shell: "bg-palette-gold/[0.07] dark:bg-palette-gold/[0.1]",
    iconClass: "text-palette-tangerine dark:text-palette-gold",
    Icon: Asterisk,
  },
  pitfall: {
    label: "Pitfall",
    shell: "bg-brandDanger/[0.06] dark:bg-brandDanger/[0.09]",
    iconClass: "text-brandDanger",
    Icon: AlertTriangle,
  },
  essentials: {
    label: "Essentials",
    shell: "bg-brandSecondary/[0.06] dark:bg-brandSecondary/[0.09]",
    iconClass: "text-brandSecondary",
    Icon: Layers,
  },
  production: {
    label: "Production mode",
    shell: "bg-palette-jade/[0.06] dark:bg-palette-jade/[0.09]",
    iconClass: "text-palette-jade",
    Icon: Rocket,
  },
};

type CalloutTone = keyof typeof CALLOUT_TONE;

type CalloutProps = {
  children: ReactNode;
  tone?: CalloutTone;
  /** Overrides the default accessible name for the aside (still not shown visually). */
  title?: string;
};

export function Callout({ children, tone = "note", title }: CalloutProps) {
  const { Icon, label, shell, iconClass } = CALLOUT_TONE[tone];
  return (
    <aside
      aria-label={title ?? label}
      className={`my-5 rounded-xl px-3.5 py-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200 ${shell}`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-[0.2em] shrink-0 ${iconClass}`}
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
