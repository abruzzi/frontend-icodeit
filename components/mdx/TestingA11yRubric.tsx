import { TESTING_A11Y_RUBRICS } from "@/lib/content/rubrics";
import type { RubricItem } from "@/lib/content/types";

import { TestingRubricTable } from "./testing-rubric-table";

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
      <TestingRubricTable items={resolvedItems} />
    </section>
  );
}
