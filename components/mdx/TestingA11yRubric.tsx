import { ui } from "@/lib/ui";
import type { RubricItem } from "../../lib/content/types";
import { TESTING_A11Y_RUBRICS } from "../../lib/content/rubrics";

type TestingA11yRubricProps = {
  title?: string;
  items?: RubricItem[];
  rubricId?: string;
};

export function TestingA11yRubric({
  title = "Testing + Accessibility Rubric",
  items = [],
  rubricId,
}: TestingA11yRubricProps) {
  const resolvedItems =
    rubricId && TESTING_A11Y_RUBRICS[rubricId]
      ? TESTING_A11Y_RUBRICS[rubricId]
      : items;

  return (
    <section aria-label={title}>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className={ui.table}>
          <thead>
            <tr>
              <th className={ui.th}>Category</th>
              <th className={ui.th}>Level</th>
              <th className={ui.th}>Requirement</th>
              <th className={ui.th}>Done When</th>
            </tr>
          </thead>
          <tbody>
            {resolvedItems.map((item) => (
              <tr key={item.id}>
                <td className={ui.td}>{item.category}</td>
                <td className={ui.td}>{item.level}</td>
                <td className={ui.td}>{item.requirement}</td>
                <td className={ui.td}>{item.doneWhen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
