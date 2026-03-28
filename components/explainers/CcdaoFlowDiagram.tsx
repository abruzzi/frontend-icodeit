"use client";

import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const NODE_IDS = [
  { id: "collect", x: 0, label: "C — Collect" },
  { id: "structure", x: 200, label: "C — Component structure" },
  { id: "data", x: 460, label: "D — Data modeling" },
  { id: "api", x: 680, label: "A — API design" },
  { id: "optimize", x: 880, label: "O — Optimization" },
] as const;

const EDGES: Edge[] = [
  {
    id: "e1",
    source: "collect",
    target: "structure",
    markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  },
  {
    id: "e2",
    source: "structure",
    target: "data",
    markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  },
  {
    id: "e3",
    source: "data",
    target: "api",
    markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  },
  {
    id: "e4",
    source: "api",
    target: "optimize",
    markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  },
];

type CcdaoFlowDiagramProps = {
  title?: string;
  className?: string;
};

/**
 * Linear CCDAO pipeline — good for decision walkthroughs, API layers, or data-flow sketches.
 */
function CcdaoFlowInner({
  title,
  className,
}: {
  title: string;
  className: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const nodes: Node[] = useMemo(
    () =>
      NODE_IDS.map((n) => ({
        id: n.id,
        position: { x: n.x, y: 60 },
        data: { label: n.label },
        style: {
          fontWeight: 600,
          fontSize: 13,
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          boxShadow: isDark
            ? "0 1px 3px rgb(0 0 0 / 0.35)"
            : "0 1px 3px rgb(15 23 42 / 0.08)",
          background: isDark
            ? "rgb(30 41 59 / 0.95)"
            : "rgb(255 255 255 / 0.95)",
          color: isDark ? "rgb(241 245 249)" : "rgb(15 23 42)",
        },
      })),
    [isDark],
  );

  return (
    <figure
      className={`not-prose my-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/60 shadow-sm dark:border-slate-700/45 dark:bg-slate-800/40 dark:shadow-none ${className}`}
      aria-label={title}
    >
      <figcaption className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
        {title}
      </figcaption>
      <div className="h-[min(420px,55vh)] w-full min-h-[280px]">
        <ReactFlow
          nodes={nodes}
          edges={EDGES}
          fitView
          fitViewOptions={{ padding: 0.2, maxZoom: 1.1 }}
          colorMode={isDark ? "dark" : "light"}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: "#e23e57" },
            animated: true,
          }}
        >
          <Background gap={16} />
          <Controls showInteractive={false} />
          <MiniMap
            className="!bg-slate-100/90 dark:!bg-slate-900/90"
            maskColor="rgb(15 23 42 / 0.12)"
          />
        </ReactFlow>
      </div>
    </figure>
  );
}

export function CcdaoFlowDiagram({
  title = "CCDAO walkthrough flow",
  className = "",
}: CcdaoFlowDiagramProps) {
  return (
    <ReactFlowProvider>
      <CcdaoFlowInner title={title} className={className} />
    </ReactFlowProvider>
  );
}
