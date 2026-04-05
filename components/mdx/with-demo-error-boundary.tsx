import type { ComponentType } from "react";

import { DemoErrorBoundary } from "@/components/mdx/DemoErrorBoundary";

/**
 * Server Component wrapper so MDX can wrap both RSC and client demos: the boundary is client,
 * but `Demo` is rendered as a child from this module (never imported into a client file).
 */
export function withDemoErrorBoundary<P extends object = object>(
  Demo: ComponentType<P>,
  demoLabel: string,
): ComponentType<P> {
  function WrappedDemo(props: P) {
    return (
      <DemoErrorBoundary demoLabel={demoLabel}>
        <Demo {...props} />
      </DemoErrorBoundary>
    );
  }
  WrappedDemo.displayName = `WithDemoErrorBoundary(${demoLabel})`;
  return WrappedDemo;
}
