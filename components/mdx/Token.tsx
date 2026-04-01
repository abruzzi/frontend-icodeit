import type { ReactNode } from "react";

/**
 * Inline pill for HTTP verbs, keywords, etc. Colors match `site-colors.json` → Tailwind `palette-*` / `brand*`.
 */
export type TokenColor =
  | "gold"
  | "magenta"
  | "azure"
  | "tangerine"
  | "jade"
  | "brand"
  | "brandSecondary"
  | "brandDanger";

const TOKEN_SHELL: Record<TokenColor, string> = {
  gold:
    "bg-palette-gold/20 text-slate-900 ring-palette-gold/40 dark:bg-palette-gold/15 dark:text-amber-50 dark:ring-palette-gold/30",
  magenta:
    "bg-palette-magenta/14 text-slate-900 ring-palette-magenta/35 dark:bg-palette-magenta/18 dark:text-pink-50 dark:ring-palette-magenta/35",
  azure:
    "bg-palette-azure/14 text-slate-900 ring-palette-azure/35 dark:bg-palette-azure/18 dark:text-sky-100 dark:ring-palette-azure/35",
  tangerine:
    "bg-palette-tangerine/16 text-slate-900 ring-palette-tangerine/40 dark:bg-palette-tangerine/18 dark:text-orange-50 dark:ring-palette-tangerine/35",
  jade:
    "bg-palette-jade/16 text-slate-900 ring-palette-jade/40 dark:bg-palette-jade/18 dark:text-emerald-50 dark:ring-palette-jade/35",
  brand:
    "bg-brand/14 text-slate-900 ring-brand/35 dark:bg-brand/20 dark:text-rose-50 dark:ring-brand/40",
  brandSecondary:
    "bg-brandSecondary/14 text-slate-900 ring-brandSecondary/35 dark:bg-brandSecondary/18 dark:text-violet-100 dark:ring-brandSecondary/35",
  brandDanger:
    "bg-brandDanger/12 text-slate-900 ring-brandDanger/30 dark:bg-brandDanger/22 dark:text-red-50 dark:ring-brandDanger/40",
};

type TokenProps = {
  children: ReactNode;
  /** @default gold */
  color?: TokenColor;
  className?: string;
};

/**
 * Rounded inline token (mono, subtle ring) for prose—e.g. `<Token>GET</Token>` or `<Token color="azure">POST</Token>`.
 */
export function Token({ children, color = "gold", className = "" }: TokenProps) {
  const shell = TOKEN_SHELL[color];
  return (
    <span
      className={[
        "mdx-token not-prose inline align-baseline rounded-md px-1.5 py-0.5 font-mono text-[0.82em] font-semibold leading-none ring-1 ring-inset",
        shell,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
