type ProtocolOption = {
  id: "sse" | "websocket" | "long-poll";
  label: string;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
};

type ProtocolComparisonProps = {
  title?: string;
  options: ProtocolOption[];
  selected?: ProtocolOption["id"];
  onSelect?: (id: ProtocolOption["id"]) => void;
};

export function ProtocolComparison({
  title = "Realtime Protocol Comparison",
  options,
  selected,
  onSelect,
}: ProtocolComparisonProps) {
  return (
    <section aria-label={title}>
      <h3>{title}</h3>
      <div role="tablist" aria-label="Protocol options">
        {options.map((option) => {
          const isActive = selected === option.id;
          return (
            <button
              key={option.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`protocol-panel-${option.id}`}
              id={`protocol-tab-${option.id}`}
              onClick={() => onSelect?.(option.id)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {options.map((option) => {
        const isVisible = selected ? selected === option.id : true;
        if (!isVisible) return null;
        return (
          <article
            key={option.id}
            role="tabpanel"
            aria-labelledby={`protocol-tab-${option.id}`}
            id={`protocol-panel-${option.id}`}
          >
            <h4>{option.label}</h4>
            <p>
              <strong>Strengths:</strong> {option.strengths.join(", ")}
            </p>
            <p>
              <strong>Weaknesses:</strong> {option.weaknesses.join(", ")}
            </p>
            <p>
              <strong>Best for:</strong> {option.bestFor.join(", ")}
            </p>
          </article>
        );
      })}
    </section>
  );
}
