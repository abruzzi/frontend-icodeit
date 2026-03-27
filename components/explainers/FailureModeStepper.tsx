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
      <h3 className="mt-0 text-base font-semibold text-neutral-900">
        Failure Mode Walkthrough
      </h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              index === activeIndex
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 bg-white text-neutral-700 hover:border-slate-400"
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
