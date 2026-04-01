import type { ReactNode } from "react";
import { Construction } from "lucide-react";

type WorkingInProgressProps = {
  children: ReactNode;
  /** Small caps line above the title (e.g. “Draft”). */
  eyebrow?: string;
  /** Main message under the separator. */
  title?: string;
  /** Optional supporting line under the title. */
  description?: string;
  /** Max height of the faded preview. Tailwind class, e.g. `max-h-[20rem]`. */
  peekClassName?: string;
  /** Label for the optional link button. */
  actionLabel?: string;
  /** If set, renders a primary link (e.g. issue tracker or changelog). */
  href?: string;
  /** Quiet note in the footer when there is no `href`, or below the button when there is. */
  hint?: string;
  className?: string;
};

const PEEK_MASK = {
  maskImage:
    "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.2) 82%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.2) 82%, transparent 100%)",
} as const;

/**
 * Wrap **draft or in-progress** MDX so it shows a soft preview (gradient fade) plus a clear label.
 * Same layout idea as a paywall teaser, but copy and defaults are for unfinished content, not subscriptions.
 *
 * @example
 * ```mdx
 * <WorkingInProgress>
 * ## Rough notes
 * Still editing this section…
 * </WorkingInProgress>
 * ```
 */
export function WorkingInProgress({
  children,
  eyebrow = "Work in progress",
  title = "The content below is unfinished and may change.",
  description,
  peekClassName = "max-h-[18rem]",
  actionLabel = "Track updates",
  href,
  hint = "Draft copy fades out above — check back when this section is marked complete.",
  className = "",
}: WorkingInProgressProps) {
  return (
    <section
      className={["mdx-working-in-progress not-prose my-14 sm:my-16", className]
        .filter(Boolean)
        .join(" ")}
      aria-label={title}
    >
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <div
          className="h-px w-full max-w-[min(100%,20rem)] bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
          aria-hidden
        />
        <div className="flex items-center justify-center gap-2">
          <Construction
            className="size-4 text-palette-gold"
            strokeWidth={2.25}
            aria-hidden
          />
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {eyebrow}
          </p>
        </div>
        <p className="max-w-md text-base font-semibold leading-snug text-slate-800 dark:text-slate-100">
          {title}
        </p>
        {description ? (
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/50 to-white shadow-sm shadow-slate-900/[0.04] dark:border-amber-900/35 dark:from-amber-950/25 dark:to-slate-900/35 dark:shadow-none">
        <div
          className={[
            "mdx-wip-peek overflow-hidden px-4 py-5 sm:px-6 sm:py-6",
            "[&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0",
            peekClassName,
          ].join(" ")}
          style={PEEK_MASK}
        >
          {children}
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-amber-200/70 px-4 py-5 dark:border-amber-900/40">
          {href ? (
            <a
              href={href}
              className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              {actionLabel}
            </a>
          ) : null}
          {hint ? (
            <p
              className={`max-w-md text-center text-xs leading-relaxed text-slate-600 dark:text-slate-500 ${href ? "mt-1" : ""}`}
            >
              {hint}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
