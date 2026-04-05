"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { ui } from "@/lib/ui";

type Props = {
  children: ReactNode;
  /** Shown in the fallback, e.g. "Lex rank ordering demo". */
  demoLabel?: string;
};

type State = { error: Error | null };

/**
 * Catches render errors in MDX-embedded demos so one broken widget does not take down the article.
 */
export class DemoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const tag = this.props.demoLabel ? ` ${this.props.demoLabel}` : "";
    console.error(`[DemoErrorBoundary]${tag}`, error, errorInfo.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    if (this.state.error != null) {
      const { demoLabel } = this.props;
      const message = this.state.error.message;
      return (
        <div
          className={`${ui.caseStudyDemoShell} border-amber-200/90 bg-amber-50/90 p-4 text-sm text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/35 dark:text-amber-100`}
          role="alert"
        >
          <p className="mb-1 font-semibold">
            {demoLabel ? `${demoLabel} couldn’t render` : "This interactive example couldn’t render"}
          </p>
          <p className="mb-3 text-amber-900/85 dark:text-amber-100/80">
            Something went wrong inside the demo. The rest of the page should still work.
          </p>
          <pre className="mb-3 max-h-28 overflow-auto rounded-lg bg-amber-100/90 p-2.5 font-mono text-[0.7rem] leading-snug text-amber-950 dark:bg-black/30 dark:text-amber-50">
            {message}
          </pre>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-lg border border-amber-400/80 bg-white px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm transition-colors hover:bg-amber-50 dark:border-amber-500/50 dark:bg-amber-900/50 dark:text-amber-50 dark:hover:bg-amber-900/70"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
