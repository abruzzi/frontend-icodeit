import { TESTING_RUBRICS } from "@/lib/content/rubrics";
import { ui } from "@/lib/ui";

import { TestingRubricTable } from "./testing-rubric-table";

type TestingRubricProps = {
  rubricId: string;
};

export function TestingRubric({ rubricId }: TestingRubricProps) {
  const rubric = TESTING_RUBRICS[rubricId] ?? [];

  if (rubric.length === 0) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-400">
        No rubric is configured for `{rubricId}`.
      </p>
    );
  }

  return (
    <div className={`${ui.explainerCard} not-prose`}>
      <div className="mb-3 space-y-1">
        <h3 className="mt-0 font-heading text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Coverage checklist
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          By concern and test depth—rename layers to match your codebase.
        </p>
      </div>
      <TestingRubricTable items={rubric} />
    </div>
  );
}
