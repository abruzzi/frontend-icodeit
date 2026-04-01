import type { CSSProperties } from "react";

/** Small dot + soft falloff; distinct stops so dots stay visible. */
export const HERO_DOT_GRID_LIGHT =
  "radial-gradient(circle, rgb(100 116 139 / 0.14) 0.55px, rgba(0,0,0,0) 1.2px)";
export const HERO_DOT_GRID_DARK =
  "radial-gradient(circle, rgb(148 163 184 / 0.18) 0.55px, rgba(0,0,0,0) 1.2px)";

export function heroDotCssVars(spacing: number): CSSProperties {
  return {
    ["--dot-grid-size" as string]: `${spacing}px`,
  };
}

export function HeroDotLayers({
  style,
  className = "",
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[1] opacity-100 dark:hidden ${className}`}
        style={{
          ...style,
          backgroundImage: HERO_DOT_GRID_LIGHT,
          backgroundSize: "var(--dot-grid-size) var(--dot-grid-size)",
          backgroundPosition: "0 0",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[1] hidden opacity-100 dark:block ${className}`}
        style={{
          ...style,
          backgroundImage: HERO_DOT_GRID_DARK,
          backgroundSize: "var(--dot-grid-size) var(--dot-grid-size)",
          backgroundPosition: "0 0",
        }}
      />
    </>
  );
}
