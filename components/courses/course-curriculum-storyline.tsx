import { fsdeCurriculumStorylineModules } from "@/lib/courses/fsde-curriculum-storyline";

/**
 * “Curriculum as a journey” block — vertical guide, gold module labels, narrative body.
 * Surface matches `CourseVideoIntro` so it sits naturally on the course page.
 * Use inside course MDX (`not-prose` safe).
 */
export function CourseCurriculumStoryline() {
  return (
    <div className="not-prose my-12 overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900/5 px-6 py-10 shadow-diffuse sm:px-10 sm:py-12 md:px-12 md:py-14 dark:border-slate-600/50 dark:bg-slate-950/40">
      <div className="mb-10 max-w-xl md:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-palette-gold sm:text-sm">
          The curriculum
        </p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tighter text-slate-900 sm:text-4xl md:text-[2.65rem] md:leading-[1.08] dark:text-slate-50">
          One thread from first slice to full system
        </h2>
        <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          Below is the path the course takes — written as a single story so you can feel how each
          part hands off to the next, ending with a board you can reason about as a whole.
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute left-[0.65rem] top-3 bottom-3 w-px border-l border-dashed border-slate-300/90 md:left-[0.7rem] dark:border-slate-500/50"
          aria-hidden
        />

        <ol className="relative m-0 list-none p-0">
          {fsdeCurriculumStorylineModules.map((mod, i) => {
            const n = i + 1;
            const isLast = i === fsdeCurriculumStorylineModules.length - 1;
            return (
              <li
                key={mod.title}
                className={[
                  "relative pl-9 md:pl-11",
                  isLast ? "pb-0" : "pb-12 md:pb-14",
                ].join(" ")}
              >
                <span
                  className="absolute left-0 top-1.5 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full bg-slate-900/5 ring-2 ring-palette-gold/90 md:top-2 md:h-5 md:w-5 dark:bg-slate-950/40"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-palette-gold md:h-2 md:w-2" />
                </span>

                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-palette-gold sm:text-xs">
                  Module {n}
                </p>
                <h3 className="mt-1.5 font-heading text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.65rem] md:leading-snug dark:text-slate-50">
                  {mod.title}
                </h3>
                <div className="mt-5 max-w-prose space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] sm:leading-relaxed dark:text-slate-300">
                  {mod.paragraphs.map((p, j) => (
                    <p key={`${mod.title}-${j}`} className="m-0 text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
