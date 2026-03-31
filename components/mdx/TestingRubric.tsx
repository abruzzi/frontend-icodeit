import { TESTING_A11Y_RUBRICS } from "@/lib/content/rubrics";
import { ui } from "@/lib/ui";

import { TestingRubricTable } from "./testing-rubric-table";

type TestingRubricProps = {
  rubricId: string;
};

export function TestingRubric({ rubricId }: TestingRubricProps) {
  const rubric = TESTING_A11Y_RUBRICS[rubricId] ?? [];

  if (rubric.length === 0) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-400">
        No rubric is configured for `{rubricId}`.
      </p>
    );
  }

  return (
    <div className={ui.explainerCard}>
      <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
        Testing + Accessibility Rubric
      </h3>
      <TestingRubricTable items={rubric} />
    </div>
  );
}
