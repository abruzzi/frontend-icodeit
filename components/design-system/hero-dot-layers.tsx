import type { CSSProperties } from "react";

/** Small dot + soft falloff; distinct stops so dots stay visible. */
export const HERO_DOT_GRID_LIGHT =
  "radial-gradient(circle, rgb(100 116 139 / 0.14) 0.55px, rgba(0,0,0,0) 1.2px)";
export const HERO_DOT_GRID_DARK =
  "radial-gradient(circle, rgb(148 163 184 / 0.18) 0.55px, rgba(0,0,0,0) 1.2px)";
export const HERO_DOT_GRID_SPOTLIGHT =
  "radial-gradient(circle, rgb(226 62 87 / 0.2) 0.55px, rgba(0,0,0,0) 1.2px)";

export function heroDotCssVars(
  spacing: number,
  radius: number,
): CSSProperties {
  return {
    ["--dot-grid-size" as string]: `${spacing}px`,
    ["--spotlight-radius" as string]: `${radius}px`,
    ["--spotlight-x" as string]: "50%",
    ["--spotlight-y" as string]: "45%",
    ["--spotlight-opacity" as string]: "0",
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
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-200 [opacity:var(--spotlight-opacity,0)] dark:hidden ${className}`}
        style={{
          ...style,
          backgroundImage: HERO_DOT_GRID_SPOTLIGHT,
          backgroundSize: "var(--dot-grid-size) var(--dot-grid-size)",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 82%)",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[2] hidden transition-opacity duration-200 [opacity:var(--spotlight-opacity,0)] dark:block ${className}`}
        style={{
          ...style,
          backgroundImage: HERO_DOT_GRID_SPOTLIGHT,
          backgroundSize: "var(--dot-grid-size) var(--dot-grid-size)",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), black 0%, transparent 82%)",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-200 [opacity:calc(var(--spotlight-opacity,0)*0.28)] ${className}`}
        style={{
          ...style,
          background:
            "radial-gradient(circle var(--spotlight-radius) at var(--spotlight-x) var(--spotlight-y), rgb(226 62 87 / 0.06), transparent 72%)",
        }}
      />
    </>
  );
}
