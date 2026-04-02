import type { ReactNode } from "react";

const RADIUS_OUTER = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
} as const;

/** Inner radius = outer − 2px border gutter (Tailwind xl/2xl radii). */
const RADIUS_INNER = {
  xl: "rounded-[0.625rem]",
  "2xl": "rounded-[0.875rem]",
} as const;

type RadiusKey = keyof typeof RADIUS_OUTER;

type Props = {
  children: ReactNode;
  /** Outer corner radius; inner is matched so the 2px rim stays even. */
  radius?: RadiusKey;
  className?: string;
  /** Extra classes on the inner content wrapper (background, padding, shadow). */
  innerClassName: string;
};

/**
 * Real 2px “border” = rotating conic gradient in a padded gutter (no mask).
 * Parent should not clip overflow; inner carries card chrome.
 */
export function CourseShinyBorder({
  children,
  radius = "2xl",
  className,
  innerClassName,
}: Props) {
  const outer = RADIUS_OUTER[radius];
  const inner = RADIUS_INNER[radius];

  return (
    <div
      className={[
        "course-shiny-border-wrap relative isolate overflow-hidden p-[2px]",
        outer,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="course-shiny-border-sheen" aria-hidden />
      <div
        className={[inner, "relative z-[1] min-h-0", innerClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
