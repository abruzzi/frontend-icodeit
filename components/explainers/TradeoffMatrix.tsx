"use client";

import { ui } from "@/lib/ui";

type TradeoffRow = {
  topic: string;
  optionA: string;
  optionB: string;
  whenBWins: string;
};

type TradeoffMatrixProps = {
  rows?: readonly TradeoffRow[];
};

export function TradeoffMatrix({ rows = [] }: TradeoffMatrixProps) {
  if (rows.length === 0) {
    return (
      <div className={ui.explainerCard}>
        <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
          Trade-off Matrix
        </h3>
        <p className="mb-0 text-sm text-slate-600">
          Add trade-off rows in this section to compare options.
        </p>
      </div>
    );
  }

  return (
    <div className={ui.explainerCard}>
      <h3 className="mt-0 text-base font-semibold text-slate-900 dark:text-slate-50">
        Trade-off Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className={ui.table}>
          <thead>
            <tr>
              <th className={ui.th}>Topic</th>
              <th className={ui.th}>Option A</th>
              <th className={ui.th}>Option B</th>
              <th className={ui.th}>When B Wins</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.topic}-${row.optionA}`}>
                <td className={ui.td}>{row.topic}</td>
                <td className={ui.td}>{row.optionA}</td>
                <td className={ui.td}>{row.optionB}</td>
                <td className={ui.td}>{row.whenBWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
