"use client";

import { useTheme } from "next-themes";
import {
  CloudDownload,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Network,
  Rocket,
} from "lucide-react";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";

import { MindmapFlowEdge } from "./mindmap-flow-edge";

export type MindmapTreeSide = "left" | "right" | "center";

export type MindmapCardData = {
  kind: "root" | "pillar" | "group" | "subgroup" | "leaf";
  label: string;
  bullets: string[];
  side: MindmapTreeSide;
  iconKey: string;
  /** Pillar subtree accent (pillar fill, edges, leaf border); omitted for root. */
  categoryStroke?: string;
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  network: Network,
  database: Database,
  "git-branch": GitBranch,
  rocket: Rocket,
  "cloud-download": CloudDownload,
  gauge: Gauge,
  layers: Layers,
};

function MindmapIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Layers;
  return <Icon className={className} aria-hidden />;
}

function MindmapCard({ data }: NodeProps) {
  const { kind, label, bullets, side, iconKey, categoryStroke } =
    data as MindmapCardData;

  const isRoot = kind === "root";
  const isPillar = kind === "pillar";
  const isTopicCard = kind === "group" || kind === "subgroup";
  const isItemLeaf = kind === "leaf";

  const alignRight = side === "left" && (isTopicCard || isItemLeaf);
  const alignLeft = side === "right" && (isTopicCard || isItemLeaf);

  const rootShell =
    "min-w-[min(92vw,24rem)] rounded-full border border-violet-950/20 bg-[#2d1b69] px-6 py-4 text-white shadow-xl shadow-violet-950/25 ring-1 ring-white/20";

  const pillarShellDefault =
    "min-w-[12.5rem] max-w-[15rem] rounded-full border border-violet-600/30 bg-[#7c4dff] px-4 py-3 text-white shadow-lg shadow-violet-600/25 ring-1 ring-white/15 dark:border-violet-400/30 dark:shadow-violet-950/40";

  const pillarShellColored =
    "min-w-[12.5rem] max-w-[15rem] rounded-full border px-4 py-3 text-white shadow-lg ring-1 ring-white/20";

  const leafShellBase =
    "max-w-[18rem] rounded-2xl border border-slate-200/90 bg-white/95 py-2.5 pl-3.5 pr-3.5 shadow-sm dark:border-slate-600/40 dark:bg-slate-800/90";

  const itemLeafShell =
    "max-w-[15rem] rounded-xl border border-slate-200/90 bg-white/95 py-2 px-3 shadow-sm dark:border-slate-600/40 dark:bg-slate-800/90";

  const leafShellStyle: CSSProperties | undefined =
    (isTopicCard || isItemLeaf) && categoryStroke
      ? alignRight
        ? { borderRightWidth: 3, borderRightColor: categoryStroke }
        : { borderLeftWidth: 3, borderLeftColor: categoryStroke }
      : undefined;

  const titleRoot =
    "flex items-center justify-center gap-3 text-center text-base font-bold leading-snug sm:text-lg";
  const titlePillar =
    "flex items-center justify-center gap-2 text-center text-[0.8rem] font-bold uppercase tracking-wide sm:text-[0.875rem]";
  const titleLeaf = `text-xs font-semibold leading-snug text-slate-800 dark:text-slate-100 sm:text-sm ${alignRight ? "text-right" : ""} ${alignLeft ? "text-left" : ""}`;

  const chipWrap = `mt-2 flex flex-wrap gap-1.5 ${alignRight ? "justify-end" : alignLeft ? "justify-start" : "justify-center"}`;

  const chipTint: CSSProperties | undefined =
    categoryStroke && isTopicCard
      ? {
          backgroundColor: `${categoryStroke}22`,
          borderColor: `${categoryStroke}44`,
        }
      : undefined;

  const chipClsDefault =
    "rounded-full bg-violet-500/[0.12] px-2.5 py-1 text-[0.7rem] font-medium text-violet-900 ring-1 ring-violet-400/25 sm:text-xs dark:bg-violet-400/10 dark:text-violet-100 dark:ring-violet-500/30";

  const chipClsTinted =
    "rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-800 ring-1 sm:text-xs dark:text-slate-100";

  return (
    <div className="relative">
      {side === "center" ? (
        <>
          <Handle
            id="h-root-l"
            type="source"
            position={Position.Left}
            className="!h-2 !w-2 !border-0 !bg-violet-300 opacity-0"
          />
          <Handle
            id="h-root-r"
            type="source"
            position={Position.Right}
            className="!h-2 !w-2 !border-0 !bg-violet-300 opacity-0"
          />
        </>
      ) : side === "left" ? (
        <>
          <Handle
            id="h-in"
            type="target"
            position={Position.Right}
            className="!h-2 !w-2 !border-0 !bg-violet-500 opacity-0"
          />
          <Handle
            id="h-out"
            type="source"
            position={Position.Left}
            className="!h-2 !w-2 !border-0 !bg-violet-500 opacity-0"
          />
        </>
      ) : (
        <>
          <Handle
            id="h-in"
            type="target"
            position={Position.Left}
            className="!h-2 !w-2 !border-0 !bg-violet-500 opacity-0"
          />
          <Handle
            id="h-out"
            type="source"
            position={Position.Right}
            className="!h-2 !w-2 !border-0 !bg-violet-500 opacity-0"
          />
        </>
      )}

      <div
        className={
          isRoot
            ? rootShell
            : isPillar
              ? categoryStroke
                ? pillarShellColored
                : pillarShellDefault
              : isItemLeaf
                ? itemLeafShell
                : leafShellBase
        }
        style={
          isPillar && categoryStroke
            ? {
                backgroundColor: categoryStroke,
                borderColor: `${categoryStroke}55`,
                boxShadow: `0 10px 28px ${categoryStroke}33`,
              }
            : isTopicCard || isItemLeaf
              ? leafShellStyle
              : undefined
        }
      >
        {isRoot ? (
          <div className={titleRoot}>
            <MindmapIcon name={iconKey} className="h-6 w-6 shrink-0 text-violet-200" />
            <span>{label}</span>
          </div>
        ) : null}

        {isPillar ? (
          <div className={titlePillar}>
            <MindmapIcon name={iconKey} className="h-[1.125rem] w-[1.125rem] shrink-0 text-white/90 sm:h-5 sm:w-5" />
            <span className="leading-tight">{label}</span>
          </div>
        ) : null}

        {isTopicCard ? (
          <>
            <div className={`flex items-start gap-2 ${alignRight ? "flex-row-reverse" : "flex-row"}`}>
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full opacity-90"
                style={{
                  backgroundColor: categoryStroke ?? "#7c4dff",
                }}
                aria-hidden
              />
              <p className={`flex-1 ${titleLeaf}`}>{label}</p>
            </div>
            {bullets.length > 0 ? (
              <div className={chipWrap}>
                {bullets.map((b) => (
                  <span
                    key={b}
                    className={chipTint ? chipClsTinted : chipClsDefault}
                    style={chipTint}
                  >
                    {b}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        ) : null}

        {isItemLeaf ? (
          <p
            className={`text-xs font-medium leading-snug text-slate-800 dark:text-slate-100 sm:text-sm ${alignRight ? "text-right" : ""} ${alignLeft ? "text-left" : ""}`}
          >
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}

const nodeTypes = { mindmapCard: MindmapCard };
const edgeTypes = { mindmapFlow: MindmapFlowEdge };

function FitViewOnReady({ nodeCount }: { nodeCount: number }) {
  const { fitView } = useReactFlow();
  const onReady = useCallback(() => {
    requestAnimationFrame(() => {
      fitView({ padding: 0.22, duration: 500 });
    });
  }, [fitView]);

  useEffect(() => {
    onReady();
  }, [onReady, nodeCount]);

  return null;
}

type Props = {
  nodes: Node[];
  edges: Edge[];
};

function CourseMindmapFlowInner({ nodes: initialNodes, edges: initialEdges }: Props) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodesDraggable
      nodesConnectable={false}
      elementsSelectable
      selectNodesOnDrag={false}
      panOnScroll
      zoomOnScroll
      zoomOnPinch
      minZoom={0.06}
      maxZoom={1.65}
      proOptions={{ hideAttribution: true }}
      className="rounded-2xl border border-violet-200/40 bg-[#f4f4f5] dark:border-violet-500/20 dark:bg-slate-900/85"
      defaultEdgeOptions={{
        type: "mindmapFlow",
        style: { strokeWidth: 1.35 },
      }}
    >
      <Background
        variant={BackgroundVariant.Lines}
        gap={24}
        lineWidth={0.65}
        color={isDark ? "rgb(139 92 246 / 0.18)" : "rgb(124 58 237 / 0.14)"}
      />
      <Controls
        showInteractive={false}
        className="!m-3 !overflow-hidden !rounded-xl !border !border-violet-200/80 !bg-white/95 !shadow-md dark:!border-violet-600/50 dark:!bg-slate-800/95"
      />
      <FitViewOnReady nodeCount={initialNodes.length} />
    </ReactFlow>
  );
}

export function CourseMindmapFlow(props: Props) {
  return (
    <div className="h-[min(85vh,900px)] w-full min-h-[520px]">
      <ReactFlowProvider>
        <CourseMindmapFlowInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}
