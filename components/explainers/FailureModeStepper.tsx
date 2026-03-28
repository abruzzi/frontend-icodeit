"use client";

import { useState } from "react";

import { ui } from "@/lib/ui";

type FailureMode = {
  title: string;
  symptom: string;
  mitigation: string;
};

type FailureModeStepperProps = {
  items?: FailureMode[];
};

const DEFAULT_ITEMS: FailureMode[] = [
  {
    title: "Network disruption",
    symptom: "Requests intermittently fail.",
    mitigation: "Retry with backoff and restore from last known good snapshot.",
  },
];

export function FailureModeStepper({ items = DEFAULT_ITEMS }: FailureModeStepperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = items[activeIndex];

  return (
    <div className={ui.explainerCard}>
      <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
        Failure Mode Walkthrough
      </h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              index === activeIndex
                ? "bg-cyan-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
                : "bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}. {item.title}
          </button>
        ))}
      </div>
      <p>
        <strong>Symptom:</strong> {current.symptom}
      </p>
      <p>
        <strong>Mitigation:</strong> {current.mitigation}
      </p>
    </div>
  );
}
