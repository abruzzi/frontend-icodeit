type FailureStep = {
  id: string;
  trigger: string;
  impact: string;
  mitigation: string;
  observability: string;
};

type FailureModeWalkthroughProps = {
  title: string;
  steps: FailureStep[];
};

export function FailureModeWalkthrough({
  title,
  steps,
}: FailureModeWalkthroughProps) {
  return (
    <section aria-label={`${title} failure mode walkthrough`}>
      <h3>{title}</h3>
      <ol>
        {steps.map((step) => (
          <li key={step.id}>
            <p>
              <strong>Trigger:</strong> {step.trigger}
            </p>
            <p>
              <strong>Impact:</strong> {step.impact}
            </p>
            <p>
              <strong>Mitigation:</strong> {step.mitigation}
            </p>
            <p>
              <strong>Observe:</strong> {step.observability}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
