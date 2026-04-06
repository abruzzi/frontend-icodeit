"use client";

import {
  BaseEdge,
  getStraightPath,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import { Ban, Monitor, Play, Radio, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import {
  BOARD_DEMO_OUTLINE_BUTTON,
  BOARD_REACT_FLOW_PANE_OUTER,
  boardReactFlowPaneDotStyle,
} from "@/components/case-studies/board-application/board-demo-shared";
import { ui } from "@/lib/ui";

type Phase =
  | "idle"
  | "post"
  | "serverAck"
  | "ssePush"
  | "clientsUpdated"
  | "complete";

const POST_MS = 720;
const SERVER_MS = 380;
const SSE_MS = 700;
const CLIENTS_MS = 450;

/** Taller hub so three clients sit on even rows; right-edge % matches each row center (flat SSE). */
const SERVER_H = 340;
const CLIENT_H = 92;
const CLIENT_W = 152;

const SERVER_TOP = 12;
/** Gap between stacked client cards (flow px). Centers are spaced by CLIENT_H + this. */
const CLIENT_STACK_GAP = 22;
/** Vertical drop past both bottom ports before the horizontal U run (screen px, flow coords). */
const U_WRITE_LEG_PX = 44;

const handleCls =
  "!h-2 !w-2 !rounded-full !border-2 !border-white !bg-slate-400 dark:!border-slate-900 dark:!bg-slate-500";

/** Match `BoardDataModelDiagram` ErEntityNode — tinted border-2 + subtle fill, not solid zinc cards. */
const sseServerErShell =
  "border-2 border-brand/35 bg-brand/[0.06] ring-1 ring-brand/20 shadow-sm dark:border-brand/40 dark:bg-brand/[0.1] dark:ring-brand/25 dark:shadow-none";

const sseClientErShell: Record<"sky" | "emerald" | "amber", string> = {
  sky: "border-2 border-palette-azure/40 bg-palette-azure/[0.08] ring-1 ring-palette-azure/15 shadow-sm dark:border-palette-azure/45 dark:bg-palette-azure/[0.12] dark:ring-palette-azure/20 dark:shadow-none",
  emerald:
    "border-2 border-palette-jade/40 bg-palette-jade/[0.08] ring-1 ring-palette-jade/15 shadow-sm dark:border-palette-jade/45 dark:bg-palette-jade/[0.12] dark:ring-palette-jade/20 dark:shadow-none",
  amber:
    "border-2 border-palette-gold/50 bg-palette-gold/[0.1] ring-1 ring-palette-gold/25 shadow-sm dark:border-palette-gold/45 dark:bg-palette-gold/[0.14] dark:ring-palette-gold/30 dark:shadow-none",
};

type SseServerData = {
  phase: Phase;
  /** Handle `top` % on the server right edge for each SSE port (aligned to client centers). */
  portTop: { c3: number; c2: number; c1: number };
};
type SseClientData = {
  phase: Phase;
  role: "mutator" | "listener";
  label: string;
  /** Jewel-tone icon chip (dashboard cards). */
  accent: "sky" | "emerald" | "amber";
};

type DemoWireEdgeData = {
  pulseKey: string;
  showPulse: boolean;
  pulseMs: number;
  mutedPulse: boolean;
  pulseVariant: "http" | "sse";
};

type UWriteEdgeData = {
  pulseKey: string;
  showPulse: boolean;
  pulseMs: number;
  uLegPx: number;
};

const pulseFill = {
  http: { fill: "#22d3ee", filter: "drop-shadow(0 0 10px rgb(34 211 238 / 0.9))" },
  sse: { fill: "#4ade80", filter: "drop-shadow(0 0 10px rgb(74 222 128 / 0.85))" },
  sseMuted: { fill: "#71717a", filter: "drop-shadow(0 0 6px rgb(113 113 122 / 0.5))" },
} as const;

/** Bottom ports → straight down → across → up (∩-style tub). Source is usually Client 1 (right). */
function uWritePath(
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  legPx: number,
): string {
  const troughY = Math.max(sy, ty) + legPx;
  return `M ${sx} ${sy} L ${sx} ${troughY} L ${tx} ${troughY} L ${tx} ${ty}`;
}

/** Three straight segments — dashed polylines in SVG “overshoot” corners; separate paths keep miters clean. */
function uWriteSegmentDs(
  sx: number,
  sy: number,
  tx: number,
  ty: number,
  legPx: number,
): [string, string, string] {
  const troughY = Math.max(sy, ty) + legPx;
  return [
    `M ${sx} ${sy} L ${sx} ${troughY}`,
    `M ${sx} ${troughY} L ${tx} ${troughY}`,
    `M ${tx} ${troughY} L ${tx} ${ty}`,
  ];
}

function UWriteEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  data,
}: EdgeProps<Edge<UWriteEdgeData>>) {
  const leg = data?.uLegPx ?? U_WRITE_LEG_PX;
  const edgePath = uWritePath(sourceX, sourceY, targetX, targetY, leg);
  const [d1, d2, d3] = uWriteSegmentDs(
    sourceX,
    sourceY,
    targetX,
    targetY,
    leg,
  );
  const d = data;
  const show = d?.showPulse ?? false;
  const durSec = (d?.pulseMs ?? 700) / 1000;
  const { fill, filter } = pulseFill.http;

  const strokeStyle = {
    ...style,
    strokeLinecap: "butt" as const,
    strokeLinejoin: "miter" as const,
  };

  return (
    <g className="nodrag nopan">
      <BaseEdge id={`${id}-a`} path={d1} style={strokeStyle} />
      <BaseEdge id={`${id}-b`} path={d2} style={strokeStyle} />
      <BaseEdge id={`${id}-c`} path={d3} style={strokeStyle} markerEnd={markerEnd} />
      {show ? (
        <circle r={4} fill={fill} style={{ filter }}>
          <animateMotion
            key={d?.pulseKey ?? id}
            dur={`${durSec}s`}
            path={edgePath}
            fill="freeze"
            repeatCount={1}
          />
        </circle>
      ) : null}
    </g>
  );
}

function DemoWireEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  data,
}: EdgeProps<Edge<DemoWireEdgeData>>) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const d = data;
  const show = d?.showPulse ?? false;
  const durSec = (d?.pulseMs ?? 700) / 1000;
  const muted = d?.mutedPulse ?? false;
  const variant = d?.pulseVariant ?? "sse";
  const pulseKey = muted ? "sseMuted" : variant === "http" ? "http" : "sse";
  const { fill, filter } = pulseFill[pulseKey];

  return (
    <g className="nodrag nopan">
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
      {show ? (
        <circle r={4} fill={fill} style={{ filter }}>
          <animateMotion
            key={d?.pulseKey ?? id}
            dur={`${durSec}s`}
            path={edgePath}
            fill="freeze"
            repeatCount={1}
          />
        </circle>
      ) : null}
    </g>
  );
}

const edgeTypes = {
  demoWire: DemoWireEdge,
  uWrite: UWriteEdge,
};

/** Hub card: icon chip + title + footer “Active” (dashboard / agent-router vibe). */
function SseServerNode({ data }: NodeProps<Node<SseServerData>>) {
  const hot = data.phase === "serverAck";
  const pt = data.portTop;
  return (
    <div
      className={`relative flex w-[172px] flex-col rounded-xl text-slate-800 transition-[box-shadow,transform,border-color] duration-300 dark:text-slate-100 ${sseServerErShell} ${
        hot
          ? "scale-[1.02] border-cyan-400/55 shadow-[0_0_0_1px_rgb(34_211_238_/_0.35),0_0_28px_rgb(34_211_238_/_0.22)] ring-cyan-400/25 dark:border-cyan-400/45 dark:ring-cyan-400/20"
          : ""
      }`}
      style={{ height: SERVER_H }}
    >
      <Handle
        type="target"
        position={Position.Bottom}
        id="post-in"
        style={{ left: "42%" }}
        className={`${handleCls} !bg-cyan-500 dark:!bg-cyan-400`}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="port-c3"
        style={{ top: `${pt.c3}%` }}
        className={`${handleCls} !bg-violet-500 dark:!bg-violet-400`}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="port-c2"
        style={{ top: `${pt.c2}%` }}
        className={`${handleCls} !bg-violet-500 dark:!bg-violet-400`}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="port-c1"
        style={{ top: `${pt.c1}%` }}
        className={`${handleCls} !bg-violet-500 dark:!bg-violet-400`}
      />

      <div className="flex h-full flex-col px-2.5 py-2">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-start gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-600 dark:bg-violet-500/25 dark:text-violet-300">
              <Radio className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[11px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Server
              </p>
              <p className="mt-0.5 text-[9px] leading-snug text-slate-600 dark:text-slate-400">
                Hub · 3 SSE (side) + REST write (U path)
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-0.5 border-t border-slate-200/70 pt-2 text-[9px] text-slate-500 dark:border-slate-600/50 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgb(34_211_238_/_0.65)]"
              aria-hidden
            />
            <span className="font-medium text-cyan-700/90 dark:text-cyan-300/90">POST in</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129_/_0.75)] dark:bg-emerald-400 dark:shadow-[0_0_10px_rgb(52_211_153_/_0.65)]"
              aria-hidden
            />
            <span>Online</span>
          </span>
        </div>
      </div>
    </div>
  );
}

const accentChip: Record<
  SseClientData["accent"],
  { box: string; Icon: typeof Monitor }
> = {
  sky: {
    box: "bg-sky-500/15 text-sky-600 dark:bg-sky-500/25 dark:text-sky-300",
    Icon: Zap,
  },
  emerald: {
    box: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-300",
    Icon: Monitor,
  },
  amber: {
    box: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/25 dark:text-amber-300",
    Icon: Monitor,
  },
};

function SseClientNode({ data }: NodeProps<Node<SseClientData>>) {
  const updated =
    data.role === "listener" &&
    (data.phase === "clientsUpdated" || data.phase === "complete");
  const mutator = data.role === "mutator";
  const ignoredSse =
    mutator &&
    (data.phase === "clientsUpdated" || data.phase === "complete");

  const { box, Icon } = accentChip[data.accent];

  return (
    <div
      className={`relative flex flex-col rounded-xl text-slate-800 transition-[box-shadow,border-color] duration-300 dark:text-slate-100 ${sseClientErShell[data.accent]} ${
        updated
          ? "border-cyan-400/55 shadow-[0_0_0_1px_rgb(34_211_238_/_0.35),0_0_24px_rgb(34_211_238_/_0.2)] ring-cyan-400/25 dark:border-cyan-400/45 dark:ring-cyan-400/20"
          : ""
      }`}
      style={{ height: CLIENT_H, width: CLIENT_W }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="sse-in"
        style={{ top: "50%" }}
        className={`${handleCls} !bg-zinc-400 dark:!bg-zinc-500`}
      />
      {mutator ? (
        <Handle
          type="source"
          position={Position.Bottom}
          id="post-out"
          style={{ left: "50%" }}
          className={`${handleCls} !bg-cyan-500 dark:!bg-cyan-400`}
        />
      ) : null}

      <div className="flex h-full flex-col px-2 py-1.5">
        <div className="flex flex-1 items-start gap-2">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${box}`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[11px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {data.label}
            </p>
            <p className="mt-0.5 text-[9px] leading-snug text-slate-600 dark:text-slate-400">
              {mutator ? "REST writer · board tab" : "EventSource listener"}
            </p>
            {mutator ? (
              <p className="mt-0.5 font-mono text-[7px] leading-snug text-sky-700/90 dark:text-sky-300/90">
                POST /api/boards/:boardId/operations
              </p>
            ) : null}
            {mutator && ignoredSse ? (
              <p className="mt-0.5 inline-flex items-center gap-0.5 text-[8px] font-medium text-amber-700 dark:text-amber-300/95">
                <Ban className="h-2 w-2 shrink-0 opacity-90" aria-hidden />
                SSE ignored
              </p>
            ) : null}
            {!mutator && updated ? (
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                Patched
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-auto flex items-center gap-1.5 border-t border-slate-200/70 pt-1 text-[9px] text-slate-500 dark:border-slate-600/50 dark:text-slate-400">
          {mutator && ignoredSse ? (
            <>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgb(34_211_238_/_0.65)]"
                aria-hidden
              />
              <span>Writer · no SSE echo</span>
            </>
          ) : (
            <>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129_/_0.75)] dark:bg-emerald-400 dark:shadow-[0_0_10px_rgb(52_211_153_/_0.65)]"
                aria-hidden
              />
              <span>{updated ? "Active · synced" : "Listening"}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  sseServer: SseServerNode,
  sseClient: SseClientNode,
};

function buildNodes(phase: Phase): Node[] {
  const h2 = CLIENT_H / 2;
  const serverMidY = SERVER_TOP + SERVER_H / 2;
  const centerStep = CLIENT_H + CLIENT_STACK_GAP;
  const yc2 = serverMidY;
  const yc3 = yc2 - centerStep;
  const yc1 = yc2 + centerStep;
  const portTopPct = (yc: number) =>
    ((yc - SERVER_TOP) / SERVER_H) * 100;

  return [
    {
      id: "server",
      type: "sseServer",
      position: { x: 16, y: SERVER_TOP },
      data: {
        phase,
        portTop: {
          c3: portTopPct(yc3),
          c2: portTopPct(yc2),
          c1: portTopPct(yc1),
        },
      },
      draggable: false,
    },
    {
      id: "c3",
      type: "sseClient",
      position: { x: 368, y: yc3 - h2 },
      data: { phase, role: "listener", label: "Client 3", accent: "amber" },
      draggable: false,
    },
    {
      id: "c2",
      type: "sseClient",
      position: { x: 368, y: yc2 - h2 },
      data: { phase, role: "listener", label: "Client 2", accent: "emerald" },
      draggable: false,
    },
    {
      id: "c1",
      type: "sseClient",
      position: { x: 368, y: yc1 - h2 },
      data: { phase, role: "mutator", label: "Client 1", accent: "sky" },
      draggable: false,
    },
  ];
}

function buildEdges(phase: Phase, isDark: boolean, runId: number): Edge[] {
  const wire = isDark ? "rgb(63 63 70 / 0.9)" : "rgb(161 161 170 / 0.95)";
  const httpWire = isDark ? "rgb(34 211 238 / 0.55)" : "rgb(6 182 212 / 0.65)";
  /** Listeners after push: green tint so the graph matches “SSE · green” when idle at end. */
  const sseLiveWire = isDark
    ? "rgb(74 222 128 / 0.72)"
    : "rgb(22 163 74 / 0.68)";
  const sseWriterWire = isDark ? "rgb(82 82 91 / 0.88)" : "rgb(150 150 159 / 0.92)";
  const arrowWire = {
    type: MarkerType.ArrowClosed,
    width: 12,
    height: 12,
    color: wire,
  };
  const arrowSseLive = {
    type: MarkerType.ArrowClosed,
    width: 12,
    height: 12,
    color: sseLiveWire,
  };
  const arrowSseWriter = {
    type: MarkerType.ArrowClosed,
    width: 12,
    height: 12,
    color: sseWriterWire,
  };
  const arrowHttp = {
    type: MarkerType.ArrowClosed,
    width: 12,
    height: 12,
    color: httpWire,
  };

  const dash = { strokeDasharray: "5 7" };

  const ssePulse = phase === "ssePush";
  const postPulse = phase === "post";
  const sseSynced = phase === "clientsUpdated" || phase === "complete";

  const wireData = (
    pulseKey: string,
    showPulse: boolean,
    pulseMs: number,
    mutedPulse: boolean,
    pulseVariant: "http" | "sse",
  ): DemoWireEdgeData => ({
    pulseKey,
    showPulse,
    pulseMs,
    mutedPulse,
    pulseVariant,
  });

  return [
    {
      id: "post",
      source: "c1",
      target: "server",
      sourceHandle: "post-out",
      targetHandle: "post-in",
      type: "uWrite",
      animated: false,
      style: { stroke: httpWire, strokeWidth: 1.5, ...dash },
      markerEnd: arrowHttp,
      data: {
        pulseKey: `${runId}-post`,
        showPulse: postPulse,
        pulseMs: POST_MS,
        uLegPx: U_WRITE_LEG_PX,
      },
    },
    {
      id: "sse-c3",
      source: "server",
      target: "c3",
      sourceHandle: "port-c3",
      targetHandle: "sse-in",
      type: "demoWire",
      animated: false,
      style: {
        stroke: sseSynced ? sseLiveWire : wire,
        strokeWidth: 1.35,
        ...dash,
      },
      markerEnd: sseSynced ? arrowSseLive : arrowWire,
      data: wireData(`${runId}-sse-c3`, ssePulse, SSE_MS, false, "sse"),
    },
    {
      id: "sse-c2",
      source: "server",
      target: "c2",
      sourceHandle: "port-c2",
      targetHandle: "sse-in",
      type: "demoWire",
      animated: false,
      style: {
        stroke: sseSynced ? sseLiveWire : wire,
        strokeWidth: 1.35,
        ...dash,
      },
      markerEnd: sseSynced ? arrowSseLive : arrowWire,
      data: wireData(`${runId}-sse-c2`, ssePulse, SSE_MS, false, "sse"),
    },
    {
      id: "sse-c1",
      source: "server",
      target: "c1",
      sourceHandle: "port-c1",
      targetHandle: "sse-in",
      type: "demoWire",
      animated: false,
      style: {
        stroke: sseSynced ? sseWriterWire : wire,
        strokeWidth: 1.35,
        ...dash,
      },
      markerEnd: sseSynced ? arrowSseWriter : arrowWire,
      data: wireData(`${runId}-sse-c1`, ssePulse, SSE_MS, true, "sse"),
    },
  ];
}

export function BoardSseBroadcastDemo() {
  const titleId = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const timersRef = useRef<number[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorMode = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const isDark = colorMode === "dark";

  const nodes = useMemo(() => buildNodes(phase), [phase]);
  const edges = useMemo(
    () => buildEdges(phase, isDark, runId),
    [phase, isDark, runId],
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setRunId((k) => k + 1);
  }, [clearTimers]);

  useEffect(() => {
    if (runId === 0) return undefined;

    let alive = true;
    const schedule = (ms: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      timersRef.current.push(id);
    };

    setPhase("post");
    schedule(POST_MS, () => setPhase("serverAck"));
    schedule(POST_MS + SERVER_MS, () => setPhase("ssePush"));
    schedule(POST_MS + SERVER_MS + SSE_MS, () => setPhase("clientsUpdated"));
    schedule(POST_MS + SERVER_MS + SSE_MS + CLIENTS_MS, () =>
      setPhase("complete"),
    );

    return () => {
      alive = false;
      clearTimers();
    };
  }, [runId, clearTimers]);

  const sequenceBusy = phase !== "idle" && phase !== "complete";

  const statusText =
    phase === "idle"
      ? "Press play: cyan U-path for POST, green on flat SSE wires (muted on the writer tab)."
      : phase === "post"
        ? "Client 1 POSTs to /api/boards/:boardId/operations — cyan pulse runs the U-shaped write path (drops, trough, climb)."
        : phase === "serverAck"
          ? "Server hub lights up with a cyan edge glow (write landed)."
          : phase === "ssePush"
            ? "Green pulses fan out on dashed links; Client 1 still receives a muted packet."
          : phase === "clientsUpdated"
            ? "Listeners show Patched + Active; Client 1 keeps SSE ignored (same tab)."
            : "Done. SSE segments stay perfectly horizontal; POST is the only U-shaped route.";

  const paneDotStyle = useMemo(
    () => boardReactFlowPaneDotStyle(colorMode === "dark"),
    [colorMode],
  );

  return (
    <div
      className={`board-sse-broadcast-flow ${ui.caseStudyDemoShell} p-4 sm:p-6`}
      data-board-sse-broadcast-demo
      data-demo-phase={phase}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-base font-medium text-slate-800 dark:text-slate-100">
            REST write, then SSE to everyone else
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Topology styled like a{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-200">dark dashboard</strong>{" "}
            graph: card nodes, jewel icon chips, dashed links.{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-200">POST</strong> uses a
            dedicated bottom port and a <strong className="font-semibold text-slate-700 dark:text-slate-200">U-shaped</strong>{" "}
            wire (clear vertical legs) so it never overlaps the flat{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-200">SSE</strong> links.{" "}
            <strong className="font-semibold text-slate-700 dark:text-slate-200">Cyan</strong>{" "}
            pulse on write, <strong className="font-semibold text-slate-700 dark:text-slate-200">green</strong>{" "}
            on push (muted for the writer echo).
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          disabled={sequenceBusy}
          className={BOARD_DEMO_OUTLINE_BUTTON}
        >
          <Play className="h-3.5 w-3.5 opacity-90" aria-hidden />
          Play sequence
        </button>
      </div>

      <div
        className={`${BOARD_REACT_FLOW_PANE_OUTER} h-[min(480px,72vw)] w-full min-h-[400px]`}
        role="img"
        aria-labelledby={`${titleId}-diagram-title`}
      >
        <p id={`${titleId}-diagram-title`} className="sr-only">
          Dashboard-style graph: U-shaped POST from client one to server bottom port, flat horizontal
          SSE side links, cyan and green pulse dots
        </p>
        <div className="pointer-events-none absolute inset-0 z-0" style={paneDotStyle} aria-hidden />
        <ReactFlow
          className="relative z-[1] h-full w-full !bg-transparent"
          colorMode={colorMode}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnDrag={false}
          preventScrolling
          fitView
          fitViewOptions={{
            padding: 0.28,
            maxZoom: 0.92,
            minZoom: 0.32,
          }}
          proOptions={{ hideAttribution: true }}
        />

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 z-[2] flex flex-wrap justify-center gap-2">
          <span
            className={`rounded-md border px-2 py-0.5 text-[0.5rem] font-medium shadow-sm ${
              isDark
                ? "border-slate-600/70 bg-slate-800/95 text-slate-400"
                : "border-slate-200/90 bg-white/95 text-slate-600"
            }`}
          >
            <span className="text-cyan-400" aria-hidden>
              ●
            </span>{" "}
            HTTP · cyan pulse
          </span>
          <span
            className={`rounded-md border px-2 py-0.5 text-[0.5rem] font-medium shadow-sm ${
              isDark
                ? "border-slate-600/70 bg-slate-800/95 text-slate-400"
                : "border-slate-200/90 bg-white/95 text-slate-600"
            }`}
          >
            <span className="text-emerald-400" aria-hidden>
              ●
            </span>{" "}
            SSE · green pulse
          </span>
          <span
            className={`rounded-md border px-2 py-0.5 text-[0.5rem] font-medium shadow-sm ${
              isDark
                ? "border-slate-600/70 bg-slate-800/95 text-slate-400"
                : "border-slate-200/90 bg-white/95 text-slate-600"
            }`}
          >
            <span className="text-slate-400 dark:text-slate-500" aria-hidden>
              ●
            </span>{" "}
            Writer SSE · dim (ignored)
          </span>
        </div>
      </div>

      <p
        className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
        role="status"
        aria-live="polite"
      >
        {statusText}
      </p>
    </div>
  );
}
