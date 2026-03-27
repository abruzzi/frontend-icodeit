"use client";

import { useMemo, useState } from "react";

import { ui } from "@/lib/ui";

type ProtocolOption = {
  name: string;
  latency: number;
  infraComplexity: number;
  browserCompatibility: number;
  bestFor: string;
};

const OPTIONS: ProtocolOption[] = [
  {
    name: "Long Poll",
    latency: 2,
    infraComplexity: 2,
    browserCompatibility: 5,
    bestFor: "Simple refresh models and low-frequency updates.",
  },
  {
    name: "SSE",
    latency: 3,
    infraComplexity: 3,
    browserCompatibility: 4,
    bestFor: "Server -> client push streams such as feed updates.",
  },
  {
    name: "WebSocket",
    latency: 5,
    infraComplexity: 4,
    browserCompatibility: 4,
    bestFor: "Bi-directional real-time interactions and chat/presence.",
  },
];

export function ProtocolChooser() {
  const [priority, setPriority] = useState<"latency" | "infraComplexity">(
    "latency",
  );

  const ranked = useMemo(() => {
    const score = (item: ProtocolOption) =>
      priority === "latency"
        ? item.latency * 2 + item.browserCompatibility
        : (6 - item.infraComplexity) * 2 + item.browserCompatibility;
    return [...OPTIONS].sort((a, b) => score(b) - score(a));
  }, [priority]);

  return (
    <div className={ui.explainerCard}>
      <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
        Protocol Chooser
      </h3>
      <label className="mb-3 block text-sm text-slate-700">
        <span className="mr-2 font-medium">Prioritize:</span>
        <select
          className="ml-1 rounded-lg bg-slate-100 px-2 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand/60 dark:bg-slate-800 dark:text-slate-100"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as "latency" | "infraComplexity")
          }
        >
          <option value="latency">Latency and interaction smoothness</option>
          <option value="infraComplexity">Lower implementation complexity</option>
        </select>
      </label>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-800">
        {ranked.map((item) => (
          <li key={item.name}>
            <strong>{item.name}</strong>: {item.bestFor}
          </li>
        ))}
      </ol>
    </div>
  );
}
