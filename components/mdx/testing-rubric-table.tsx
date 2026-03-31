import type { RubricItem } from "@/lib/content/types";
import { ui } from "@/lib/ui";

export function TestingRubricTable({ items }: { items: readonly RubricItem[] }) {
  return (
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
          {items.map((item) => (
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
  );
}
