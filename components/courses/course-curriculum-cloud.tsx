import type { CSSProperties } from "react";

/**
 * Curriculum topic pills on the page canvas — no section fill; chips use a light
 * frosted / dark subtle surface so they sit cleanly on the global background.
 */
const CHIP_ACCENTS: readonly {
  border: string;
  borderHover: string;
  glow: string;
}[] = [
  {
    border: "border-palette-azure/45 dark:border-palette-azure/40",
    borderHover: "hover:border-palette-azure/80 dark:hover:border-palette-azure/75",
    glow: "rgb(0 144 255 / 0.42)",
  },
  {
    border: "border-palette-magenta/40 dark:border-palette-magenta/35",
    borderHover: "hover:border-palette-magenta/75 dark:hover:border-palette-magenta/70",
    glow: "rgb(255 8 85 / 0.38)",
  },
  {
    border: "border-brand/40 dark:border-brand/35",
    borderHover: "hover:border-brand/75 dark:hover:border-brand/70",
    glow: "rgb(226 62 87 / 0.36)",
  },
  {
    border: "border-palette-jade/40 dark:border-palette-jade/35",
    borderHover: "hover:border-palette-jade/70 dark:hover:border-palette-jade/65",
    glow: "rgb(0 178 9 / 0.35)",
  },
  {
    border: "border-palette-tangerine/40 dark:border-palette-tangerine/35",
    borderHover: "hover:border-palette-tangerine/75 dark:hover:border-palette-tangerine/70",
    glow: "rgb(255 128 0 / 0.34)",
  },
  {
    border: "border-brandSecondary/45 dark:border-brandSecondary/40",
    borderHover: "hover:border-brandSecondary/80 dark:hover:border-brandSecondary/75",
    glow: "rgb(192 132 252 / 0.36)",
  },
  {
    border: "border-palette-gold/45 dark:border-palette-gold/40",
    borderHover: "hover:border-palette-gold/75 dark:hover:border-palette-gold/70",
    glow: "rgb(244 199 15 / 0.32)",
  },
];

export function CourseCurriculumCloud({
  labels,
}: {
  labels: readonly string[];
}) {
  if (labels.length === 0) return null;

  return (
    <figure className="not-prose relative w-full">
      <div className="relative py-10 sm:py-12 md:py-14">
        <div className="relative z-10 mx-auto flex max-w-5xl flex-wrap justify-center gap-x-2 gap-y-2.5 sm:gap-x-2.5 sm:gap-y-3">
          {labels.map((label, i) => {
            const tx = ((i * 17) % 9) - 4;
            const ty = ((i * 23) % 7) - 3;
            const accent = CHIP_ACCENTS[i % CHIP_ACCENTS.length]!;

            const chipStyle = {
              "--chip-glow": accent.glow,
            } as CSSProperties;

            return (
              <span
                key={`${label}-${i}`}
                className="inline-block"
                style={{ transform: `translate(${tx}px, ${ty}px)` }}
              >
                <span
                  className={[
                    "group relative inline-flex max-w-[min(100%,18rem)] rounded-xl border px-3 py-1.5 text-center text-xs font-medium leading-snug",
                    "bg-white/70 text-slate-800 shadow-sm shadow-slate-900/[0.06] backdrop-blur-sm",
                    "dark:bg-slate-800/45 dark:text-slate-200 dark:shadow-black/25",
                    "transition-[border-color,transform] duration-300 ease-out will-change-transform",
                    "sm:max-w-[20rem] sm:px-3.5 sm:py-2 sm:text-sm md:text-[0.9375rem]",
                    accent.border,
                    accent.borderHover,
                    "hover:-translate-y-0.5",
                  ].join(" ")}
                  style={chipStyle}
                >
                  <span
                    className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 ease-out group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 50% 50%, var(--chip-glow), transparent 72%)`,
                    }}
                    aria-hidden
                  />
                  <span className="relative z-[1]">{label}</span>
                </span>
              </span>
            );
          })}
        </div>
      </div>
      <figcaption className="sr-only">
        Topic cloud of curriculum themes and techniques covered in the course.
      </figcaption>
    </figure>
  );
}
