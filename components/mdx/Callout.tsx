import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Asterisk,
  Layers,
  MessageSquare,
  Rocket,
  StickyNote,
} from "lucide-react";
import type { ReactNode } from "react";

type ToneConfig = {
  label: string;
  shell: string;
  iconClass: string;
  Icon: LucideIcon;
  /** Muted / secondary copy (e.g. editorial aside). */
  bodyClass?: string;
  iconSize?: number;
  iconStroke?: number;
};

const CALLOUT_TONE: Record<
  | "note"
  | "required"
  | "pitfall"
  | "essentials"
  | "production"
  | "aside",
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
  aside: {
    label: "Aside",
    shell:
      "my-4 rounded-r-lg border border-slate-200/70 border-l-[3px] border-l-slate-300/90 bg-slate-50/40 py-2.5 dark:border-slate-700/60 dark:border-l-slate-500/80 dark:bg-slate-900/25",
    iconClass: "text-slate-400 dark:text-slate-500",
    Icon: MessageSquare,
    bodyClass:
      "min-w-0 flex-1 text-[0.8125rem] leading-relaxed text-slate-600 dark:text-slate-400 [&>*:first-child]:mt-0 [&_p]:mt-0 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-medium [&_strong]:text-slate-700 dark:[&_strong]:text-slate-300",
    iconSize: 15,
    iconStroke: 2,
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
  const { Icon, label, shell, iconClass, bodyClass, iconSize, iconStroke } =
    CALLOUT_TONE[tone];
  const size = iconSize ?? 18;
  const stroke = iconStroke ?? 2.25;
  const isAside = tone === "aside";
  return (
    <aside
      aria-label={title ?? label}
      className={
        isAside
          ? `px-3.5 ${shell}`
          : `my-5 rounded-xl px-3.5 py-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200 ${shell}`
      }
    >
      <div className={`flex items-start ${isAside ? "gap-2.5" : "gap-3"}`}>
        <Icon
          className={`${isAside ? "mt-[0.15em] opacity-80" : "mt-[0.2em]"} shrink-0 ${iconClass}`}
          size={size}
          strokeWidth={stroke}
          aria-hidden
        />
        <div
          className={
            bodyClass ??
            "min-w-0 flex-1 leading-relaxed [&>*:first-child]:mt-0 [&_p]:mt-0 [&_p]:mb-3 [&_p:last-child]:mb-0"
          }
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
