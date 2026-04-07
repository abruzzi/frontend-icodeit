import type { RubricCategory, RubricItem, TestingLevel } from "@/lib/content/types";

import { Token, type TokenColor } from "./Token";

const RUBRIC_CATEGORY_TOKEN: Record<RubricCategory, { label: string; color: TokenColor }> = {
  functional: { label: "Functional", color: "azure" },
  state: { label: "State", color: "brand" },
  realtime: { label: "Realtime", color: "jade" },
  a11y: { label: "A11y", color: "brandSecondary" },
  visual: { label: "Visual", color: "tangerine" },
};

const LEVEL_BADGE: Record<TestingLevel, string> = {
  unit:
    "bg-palette-azure/14 text-slate-800 ring-palette-azure/30 dark:bg-palette-azure/18 dark:text-sky-100 dark:ring-palette-azure/35",
  integration:
    "bg-palette-jade/14 text-slate-800 ring-palette-jade/30 dark:bg-palette-jade/18 dark:text-emerald-100 dark:ring-palette-jade/35",
  e2e:
    "bg-palette-tangerine/16 text-slate-800 ring-palette-tangerine/35 dark:bg-palette-tangerine/18 dark:text-orange-50 dark:ring-palette-tangerine/35",
};

function LevelBadge({ level }: { level: TestingLevel }) {
  return (
    <span
      className={[
        "inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
        LEVEL_BADGE[level],
      ].join(" ")}
    >
      {level}
    </span>
  );
}

/** Rubric table wrapper: no outer card border—parent (`explainerCard`) already frames the block. */
const shell = "not-prose overflow-x-auto";

const thBase =
  "border-b border-slate-200/90 px-2 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-600/60 dark:text-slate-400 sm:px-3";

const tdBase =
  "border-b border-slate-200/60 px-2 py-3 align-top text-[0.9375rem] leading-relaxed text-slate-700 dark:border-slate-600/40 dark:text-slate-200 sm:px-3";

const trRow =
  "transition-colors odd:bg-white/90 even:bg-slate-50/80 hover:bg-palette-azure/[0.07] dark:odd:bg-slate-900/55 dark:even:bg-slate-800/45 dark:hover:bg-slate-700/35";

export function TestingRubricTable({ items }: { items: readonly RubricItem[] }) {
  return (
    <div className={shell}>
      <table className="w-full min-w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-100/95 dark:bg-slate-800/95">
            <th scope="col" className={`${thBase} w-[1%] whitespace-nowrap`}>
              Category
            </th>
            <th scope="col" className={`${thBase} w-[1%] whitespace-nowrap`}>
              Level
            </th>
            <th scope="col" className={thBase}>
              Requirement
            </th>
            <th scope="col" className={thBase}>
              Done when
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const cat = RUBRIC_CATEGORY_TOKEN[item.category];
            const isLast = index === items.length - 1;
            const bottom = isLast ? "border-b-0" : "";
            return (
              <tr key={item.id} className={trRow}>
                <td className={`${tdBase} ${bottom} align-middle`}>
                  <Token color={cat.color}>{cat.label}</Token>
                </td>
                <td className={`${tdBase} ${bottom} align-middle`}>
                  <LevelBadge level={item.level} />
                </td>
                <td className={`${tdBase} ${bottom} min-w-0`}>
                  {item.requirement}
                </td>
                <td className={`${tdBase} ${bottom} min-w-0`}>
                  {item.doneWhen}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
