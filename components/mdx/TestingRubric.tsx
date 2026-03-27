import { TESTING_A11Y_RUBRICS } from "@/lib/content/rubrics";
import { ui } from "@/lib/ui";

type TestingRubricProps = {
  rubricId: string;
};

export function TestingRubric({ rubricId }: TestingRubricProps) {
  const rubric = TESTING_A11Y_RUBRICS[rubricId] ?? [];

  if (rubric.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        No rubric is configured for `{rubricId}`.
      </p>
    );
  }

  return (
    <div className={ui.explainerCard}>
      <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
        Testing + Accessibility Rubric
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
            {rubric.map((item) => (
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
    </div>
  );
}
