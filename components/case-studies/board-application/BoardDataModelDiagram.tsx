"use client";

import {
  applyNodeChanges,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  getBezierPath,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type NodeTypes,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ui } from "@/lib/ui";

type ErEntityKind = "board" | "column" | "card" | "user";

export type ErAttribute = {
  text: string;
  /** Primary key — underlined in the diagram. */
  pk?: boolean;
};

export type ErEntityData = {
  kind: ErEntityKind;
  /** Entity set name (ER rectangle header). */
  name: string;
  /** Scalar fields; FKs to other entities are also listed — edges show the association. */
  attributes: readonly ErAttribute[];
};

function ErEntityNode({ data }: NodeProps<Node<ErEntityData>>) {
  const shell =
    data.kind === "board"
      ? "border-brand/35 bg-brand/[0.06] text-brand ring-1 ring-brand/20 dark:border-brand/40 dark:bg-brand/[0.1] dark:ring-brand/25"
      : data.kind === "column"
        ? "border-palette-azure/40 bg-palette-azure/[0.08] text-slate-800 ring-1 ring-palette-azure/15 dark:border-palette-azure/45 dark:bg-palette-azure/[0.12] dark:text-slate-100 dark:ring-palette-azure/20"
        : data.kind === "card"
          ? "border-palette-jade/40 bg-palette-jade/[0.08] text-slate-800 ring-1 ring-palette-jade/15 dark:border-palette-jade/45 dark:bg-palette-jade/[0.12] dark:text-slate-100 dark:ring-palette-jade/20"
          : "border-palette-gold/50 bg-palette-gold/[0.1] text-slate-800 ring-1 ring-palette-gold/25 dark:border-palette-gold/45 dark:bg-palette-gold/[0.14] dark:text-slate-100 dark:ring-palette-gold/30";

  const handleCls =
    "!h-2 !w-2 !border-2 !border-white !bg-slate-400 dark:!border-slate-900 dark:!bg-slate-500";

  return (
    <div
      className={`relative w-[220px] rounded-lg border-2 px-3 py-2.5 font-sans shadow-sm dark:shadow-none ${shell}`}
    >
      {(data.kind === "column" || data.kind === "card") && (
        <Handle type="target" position={Position.Top} id="in-top" className={handleCls} />
      )}
      {data.kind === "user" && (
        <Handle type="target" position={Position.Left} id="in-left" className={handleCls} />
      )}

      <p className="border-b border-slate-200/70 pb-1.5 text-center font-heading text-xs font-extrabold uppercase tracking-wide dark:border-slate-600/50">
        {data.name}
      </p>
      <ul className="mt-2 space-y-1 text-left">
        {data.attributes.map((attr) => (
          <li
            key={attr.text}
            className="font-mono text-[10px] leading-snug text-slate-600 dark:text-slate-300"
          >
            {attr.pk ? (
              <span className="border-b border-slate-500 font-semibold text-slate-800 dark:border-slate-400 dark:text-slate-100">
                {attr.text}
              </span>
            ) : (
              attr.text
            )}
            {attr.pk ? (
              <span className="ml-1 text-[9px] font-sans font-normal uppercase tracking-wide text-slate-400">
                pk
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      {(data.kind === "board" || data.kind === "column") && (
        <Handle type="source" position={Position.Bottom} id="out-bottom" className={handleCls} />
      )}
      {data.kind === "card" && (
        <Handle type="source" position={Position.Right} id="assignee" className={handleCls} />
      )}
    </div>
  );
}

type ErEdgeData = {
  verb: string;
  fromMult: string;
  toMult: string;
  labelFill: string;
  chipBg: string;
};

function ErRelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps<Edge<ErEdgeData>>) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const verb = data?.verb ?? "";
  const fromMult = data?.fromMult ?? "1";
  const toMult = data?.toMult ?? "N";
  const labelFill = data?.labelFill ?? "#64748b";
  const chipBg = data?.chipBg ?? "rgba(248, 250, 252, 0.92)";

  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-none absolute flex max-w-[11rem] flex-wrap items-center justify-center gap-1.5 text-[10px] font-semibold"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <span
            className="rounded border border-slate-300/90 px-1 py-0.5 font-mono tabular-nums dark:border-slate-500"
            style={{ color: labelFill, backgroundColor: chipBg }}
          >
            {fromMult}
          </span>
          <span
            className="text-center font-sans font-medium leading-tight"
            style={{ color: labelFill }}
          >
            {verb}
          </span>
          <span
            className="rounded border border-slate-300/90 px-1 py-0.5 font-mono tabular-nums dark:border-slate-500"
            style={{ color: labelFill, backgroundColor: chipBg }}
          >
            {toMult}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const nodeTypes: NodeTypes = {
  erEntity: ErEntityNode,
};

const edgeTypes = {
  erRel: ErRelationshipEdge,
};

const initialNodes: Node<ErEntityData>[] = [
  {
    id: "entity-board",
    type: "erEntity",
    position: { x: 230, y: 0 },
    data: {
      kind: "board",
      name: "Board",
      attributes: [
        { text: "id", pk: true },
        { text: "title" },
        { text: "workspaceId" },
        { text: "columnIds[] (order)" },
        { text: "version?" },
      ],
    },
  },
  {
    id: "entity-column",
    type: "erEntity",
    position: { x: 230, y: 200 },
    data: {
      kind: "column",
      name: "Column",
      attributes: [
        { text: "id", pk: true },
        { text: "boardId (FK → Board)" },
        { text: "title" },
        { text: "order" },
      ],
    },
  },
  {
    id: "entity-card",
    type: "erEntity",
    position: { x: 80, y: 420 },
    data: {
      kind: "card",
      name: "Card",
      attributes: [
        { text: "id", pk: true },
        { text: "boardId (FK → Board)" },
        { text: "columnId (FK → Column)" },
        { text: "position | rank" },
        { text: "title" },
        { text: "assigneeId? (FK → User)" },
      ],
    },
  },
  {
    id: "entity-user",
    type: "erEntity",
    position: { x: 420, y: 430 },
    data: {
      kind: "user",
      name: "User",
      attributes: [
        { text: "id", pk: true },
        { text: "name" },
        { text: "avatarUrl" },
      ],
    },
  },
];

function edgesForTheme(isDark: boolean): Edge[] {
  const stroke = isDark ? "rgb(148 163 184 / 0.75)" : "rgb(100 116 139 / 0.85)";
  const labelFill = isDark ? "#cbd5e1" : "#475569";
  const chipBg = isDark ? "rgba(15, 23, 42, 0.92)" : "rgba(248, 250, 252, 0.95)";

  const baseData: Omit<ErEdgeData, "verb" | "fromMult" | "toMult"> = { labelFill, chipBg };

  const marker = {
    type: MarkerType.ArrowClosed,
    width: 18,
    height: 18,
    color: stroke,
  };

  return [
    {
      id: "rel-board-column",
      source: "entity-board",
      target: "entity-column",
      sourceHandle: "out-bottom",
      targetHandle: "in-top",
      type: "erRel",
      animated: false,
      style: { stroke, strokeWidth: 2 },
      markerEnd: marker,
      data: {
        ...baseData,
        verb: "has columns",
        fromMult: "1",
        toMult: "N",
      },
    },
    {
      id: "rel-column-card",
      source: "entity-column",
      target: "entity-card",
      sourceHandle: "out-bottom",
      targetHandle: "in-top",
      type: "erRel",
      animated: false,
      style: { stroke, strokeWidth: 2 },
      markerEnd: marker,
      data: {
        ...baseData,
        verb: "contains cards",
        fromMult: "1",
        toMult: "N",
      },
    },
    {
      id: "rel-card-user",
      source: "entity-card",
      target: "entity-user",
      sourceHandle: "assignee",
      targetHandle: "in-left",
      type: "erRel",
      animated: false,
      style: { stroke, strokeWidth: 2 },
      markerEnd: marker,
      data: {
        ...baseData,
        verb: "assignee",
        fromMult: "0..1",
        toMult: "1",
      },
    },
  ];
}

/**
 * ER diagram: entity sets with attributes, 1:N board→column→card, optional many-to-one assignee → User.
 */
export function BoardDataModelDiagram() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<Node<ErEntityData>[]>(() => initialNodes);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMode = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const edges = useMemo(() => edgesForTheme(colorMode === "dark"), [colorMode]);

  const onNodesChange: OnNodesChange<Node<ErEntityData>> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  /** Same dot grid as `icodeit-next` FlowDiagram — CSS radial-gradient, not `<Background />`. */
  const paneDotStyle = useMemo(
    () =>
      ({
        backgroundImage: `radial-gradient(circle, ${
          colorMode === "dark"
            ? "rgba(148,163,184,0.22)"
            : "rgba(148,163,184,0.25)"
        } 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0",
      }) as const,
    [colorMode],
  );

  return (
    <div
      className={`board-data-model-flow ${ui.caseStudyDemoShell} p-2 sm:p-3`}
    >
      <p className="mb-2 px-2 pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:px-3">
        ER sketch with <strong className="text-slate-800 dark:text-slate-200">attributes</strong> (PK
        underlined) and associations: each <strong className="text-slate-800 dark:text-slate-200">Card</strong>{" "}
        may reference a <strong className="text-slate-800 dark:text-slate-200">User</strong> as assignee (
        <strong className="text-slate-800 dark:text-slate-200">0..1 : 1</strong> on the link). Drag entities
        to rearrange; pan the canvas by dragging empty space (or scroll / controls).
      </p>
      <div className="relative h-[620px] w-full min-h-0 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/80 dark:border-slate-600/40 dark:bg-slate-900/40">
        <div className="pointer-events-none absolute inset-0 z-0" style={paneDotStyle} aria-hidden />
        <ReactFlow
          className="relative z-[1] h-full w-full !bg-transparent"
          colorMode={colorMode}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesConnectable={false}
          elementsSelectable={false}
          deleteKeyCode={null}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          fitView
          fitViewOptions={{ padding: 0.12, maxZoom: 0.95 }}
          minZoom={0.45}
          maxZoom={1.25}
          proOptions={{ hideAttribution: true }}
        >
          <Controls
            showInteractive={false}
            className="!m-2 !border-slate-200/90 !bg-white/95 !shadow-sm dark:!border-slate-600/70 dark:!bg-slate-800/95"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
