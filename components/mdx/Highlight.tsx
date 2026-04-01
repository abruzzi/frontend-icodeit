import type { ReactNode } from "react";

/** SVG underlines in `public/illustrations/decoration/` (wide viewBoxes, scale with `background-size`). */
export type HighlightVariant =
  | "underline1"
  | "underline2"
  | "underline3"
  | "underline4"
  | "zigzag";

const DECORATION: Record<
  HighlightVariant,
  { src: string; underlineH: string; bottom: string }
> = {
  underline1: {
    src: "/illustrations/decoration/underline1.svg",
    underlineH: "0.52em",
    bottom: "-0.06em",
  },
  underline2: {
    src: "/illustrations/decoration/underline2.svg",
    underlineH: "0.52em",
    bottom: "-0.06em",
  },
  underline3: {
    src: "/illustrations/decoration/underline3.svg",
    underlineH: "0.38em",
    bottom: "-0.04em",
  },
  underline4: {
    src: "/illustrations/decoration/underline4.svg",
    underlineH: "0.42em",
    bottom: "-0.05em",
  },
  zigzag: {
    src: "/illustrations/decoration/zigzag.svg",
    underlineH: "0.92em",
    bottom: "-0.14em",
  },
};

type HighlightProps = {
  children: ReactNode;
  /** Decorative underline style. Defaults to `underline1`. */
  variant?: HighlightVariant;
  /** Extra classes on the outer wrapper (layout). Text uses semibold slate by default. */
  className?: string;
};

/**
 * Decorative underline: SVG shape from `public/illustrations/decoration/`, filled with **palette magenta**
 * (`site-colors.json` / `--palette-magenta`) via CSS mask so it matches list markers and other accents.
 * Outer wrapper is `inline` so a wide prose column doesn’t stretch an `inline-block` onto its own line.
 */
export function Highlight({
  children,
  variant = "underline1",
  className = "",
}: HighlightProps) {
  const cfg = DECORATION[variant];
  const maskUrl = `url("${cfg.src}")`;

  return (
    <span
      className={["mdx-highlight inline align-baseline", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative inline-block w-max max-w-full">
        <span
          className={[
            "relative z-[1] font-semibold text-slate-900 dark:text-slate-50",
            "[&_a]:inline [&_a]:font-semibold [&_a]:text-slate-900 [&_a]:no-underline dark:[&_a]:text-slate-50",
            "[&_a]:transition-colors [&_a:hover]:text-brand [&_a:hover]:underline",
          ].join(" ")}
        >
          {children}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 bg-palette-magenta opacity-[0.88] dark:opacity-[0.92]"
          style={{
            bottom: cfg.bottom,
            height: cfg.underlineH,
            maskImage: maskUrl,
            maskSize: "100% 100%",
            maskPosition: "left bottom",
            maskRepeat: "no-repeat",
            WebkitMaskImage: maskUrl,
            WebkitMaskSize: "100% 100%",
            WebkitMaskPosition: "left bottom",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </span>
    </span>
  );
}
