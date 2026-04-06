"use client";

import {
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

import {
  BOARD_REACT_FLOW_PANE_OUTER,
  boardReactFlowPaneDotStyle,
} from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";

type StepData = {
  title: string;
  subtitle: string;
  /** Tint for border/fill (ER-style). */
  tint: "brand" | "azure" | "jade" | "gold" | "slate" | "magenta";
};

const TINT_SHELL: Record<StepData["tint"], string> = {
  brand:
    "border-brand/40 bg-brand/[0.07] ring-1 ring-brand/20 dark:border-brand/45 dark:bg-brand/[0.11] dark:ring-brand/25",
  azure:
    "border-palette-azure/40 bg-palette-azure/[0.08] ring-1 ring-palette-azure/15 dark:border-palette-azure/45 dark:bg-palette-azure/[0.12] dark:ring-palette-azure/20",
  jade: "border-palette-jade/40 bg-palette-jade/[0.08] ring-1 ring-palette-jade/15 dark:border-palette-jade/45 dark:bg-palette-jade/[0.12] dark:ring-palette-jade/20",
  gold: "border-palette-gold/50 bg-palette-gold/[0.1] ring-1 ring-palette-gold/25 dark:border-palette-gold/45 dark:bg-palette-gold/[0.14] dark:ring-palette-gold/30",
  slate:
    "border-slate-300/90 bg-slate-100/80 ring-1 ring-slate-200/80 dark:border-slate-600/55 dark:bg-slate-800/70 dark:ring-slate-600/40",
  magenta:
    "border-palette-magenta/35 bg-palette-magenta/[0.07] ring-1 ring-palette-magenta/15 dark:border-palette-magenta/40 dark:bg-palette-magenta/[0.1] dark:ring-palette-magenta/20",
};

function LifecycleStepNode({ data }: NodeProps<Node<StepData>>) {
  const shell = TINT_SHELL[data.tint];
  return (
    <div
      className={`relative w-[148px] rounded-lg border-2 px-2.5 py-2 text-left shadow-sm dark:shadow-none ${shell}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2 !w-2 !border-2 !border-white !bg-slate-400 dark:!border-slate-900 dark:!bg-slate-500"
      />
      <p className="font-heading text-[11px] font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
        {data.title}
      </p>
      <p className="mt-1 text-[9px] leading-snug text-slate-600 dark:text-slate-400">{data.subtitle}</p>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2 !w-2 !border-2 !border-white !bg-slate-400 dark:!border-slate-900 dark:!bg-slate-500"
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  lifecycleStep: LifecycleStepNode,
};

const STEPS: Node<StepData>[] = [
  {
    id: "capture",
    type: "lifecycleStep",
    position: { x: 0, y: 28 },
    data: {
      title: "Capture",
      subtitle: "Gesture → command object (stable id for retries)",
      tint: "brand",
    },
  },
  {
    id: "apply",
    type: "lifecycleStep",
    position: { x: 200, y: 28 },
    data: {
      title: "Apply",
      subtitle: "Reducer / mutator updates local state (optimistic)",
      tint: "azure",
    },
  },
  {
    id: "buffer",
    type: "lifecycleStep",
    position: { x: 400, y: 28 },
    data: {
      title: "Buffer",
      subtitle: "Pending queue + in-flight affordance",
      tint: "jade",
    },
  },
  {
    id: "sync",
    type: "lifecycleStep",
    position: { x: 600, y: 28 },
    data: {
      title: "Sync",
      subtitle: "API drain — operationId, backoff, single-flight",
      tint: "gold",
    },
  },
  {
    id: "settle",
    type: "lifecycleStep",
    position: { x: 800, y: 28 },
    data: {
      title: "Settle",
      subtitle: "Archive or compensating / reconcile from response",
      tint: "slate",
    },
  },
  {
    id: "reconcile",
    type: "lifecycleStep",
    position: { x: 1000, y: 28 },
    data: {
      title: "Reconcile",
      subtitle: "Server or SSE contradicts client → trim pending",
      tint: "magenta",
    },
  },
];

function edgesForTheme(isDark: boolean): Edge[] {
  const stroke = isDark ? "rgb(148 163 184 / 0.8)" : "rgb(100 116 139 / 0.9)";
  const marker = {
    type: MarkerType.ArrowClosed,
    width: 16,
    height: 16,
    color: stroke,
  };
  const chain = [
    ["capture", "apply"],
    ["apply", "buffer"],
    ["buffer", "sync"],
    ["sync", "settle"],
    ["settle", "reconcile"],
  ] as const;
  return chain.map(([source, target]) => ({
    id: `e-${source}-${target}`,
    source,
    target,
    type: "smoothstep",
    animated: false,
    style: { stroke, strokeWidth: 2 },
    markerEnd: marker,
  }));
}

const STEP_LIST: { title: string; text: string }[] = [
  { title: "Capture", text: "gesture → command object (stable id for retries)." },
  { title: "Apply", text: "reducer / mutator updates local state optimistically." },
  { title: "Buffer", text: "command joins pending queue (in-flight UI on card or column)." },
  { title: "Sync", text: "queue drains to the API (operationId, backoff, single-flight per command)." },
  {
    title: "Settle",
    text: "success removes or archives the command; failure runs compensating logic or reconciliation from the response.",
  },
  {
    title: "Reconcile",
    text: "when the server or a push channel contradicts the client, refresh the base and trim or rewrite invalid pending commands.",
  },
];

/**
 * Horizontal pipeline: command lifecycle from capture through reconciliation (read-only React Flow).
 */
export function BoardCommandLifecycleFlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const colorMode = isDark ? "dark" : "light";
  const edges = useMemo(() => edgesForTheme(isDark), [isDark]);
  const paneDotStyle = useMemo(() => boardReactFlowPaneDotStyle(isDark), [isDark]);

  return (
    <figure className={`${ui.caseStudyDemoShell} not-prose`} aria-label="Command queue lifecycle pipeline">
      <figcaption className="border-b border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-600/50 dark:text-slate-50 sm:px-5">
        Command lifecycle (client pipeline)
      </figcaption>
      <div className="px-3 pb-2 pt-3 sm:px-4">
        <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
          Read-only sketch — pan empty space or use controls to zoom. Arrows follow the usual order of operations
          between gesture and settled server truth.
        </p>
        <div className={`${BOARD_REACT_FLOW_PANE_OUTER} h-[200px] w-full min-h-0 sm:h-[220px]`}>
          <div className="pointer-events-none absolute inset-0 z-0" style={paneDotStyle} aria-hidden />
          <ReactFlow
            className="relative z-[1] h-full w-full !bg-transparent"
            colorMode={colorMode}
            nodes={STEPS}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag
            panOnScroll
            zoomOnScroll
            zoomOnPinch
            fitView
            fitViewOptions={{ padding: 0.2, maxZoom: 1, minZoom: 0.35 }}
            minZoom={0.3}
            maxZoom={1.35}
            proOptions={{ hideAttribution: true }}
          >
            <Controls
              showInteractive={false}
              className="!m-2 !border-slate-200/90 !bg-white/95 !shadow-sm dark:!border-slate-600/70 dark:!bg-slate-800/95"
            />
          </ReactFlow>
        </div>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {STEP_LIST.map((s) => (
            <li key={s.title}>
              <strong className="text-slate-800 dark:text-slate-200">{s.title}</strong> — {s.text}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
