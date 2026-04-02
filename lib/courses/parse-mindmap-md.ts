import dagre from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";

export type MindmapNodeKind = "root" | "pillar" | "group" | "subgroup" | "leaf";

export type MindmapDataNode = {
  id: string;
  kind: MindmapNodeKind;
  label: string;
  bullets: string[];
};

export type MindmapDataEdge = {
  id: string;
  source: string;
  target: string;
};

const ROOT_ID = "mm-root";

/**
 * Parse `mindmap.md` body (no frontmatter) using the authoring contract:
 * ## pillar, ### group, #### subgroup; `-` under ### → `leaf` nodes; `-` under #### → subgroup pills.
 */
export function parseMindmapMarkdown(source: string): {
  nodes: MindmapDataNode[];
  edges: MindmapDataEdge[];
} {
  const body = source.replace(/<!--[\s\S]*?-->/g, "");
  const nodes: MindmapDataNode[] = [];
  const edges: MindmapDataEdge[] = [];
  let rootLabel = "Frontend System Design Essentials";

  let pillarIndex = 0;
  let groupIndex = 0;
  let subgroupCount = 0;
  let groupLeafCount = 0;
  let currentPillarId: string | null = null;
  let currentGroupId: string | null = null;
  let currentSubgroupId: string | null = null;

  function addEdge(source: string, target: string) {
    edges.push({ id: `e-${source}->${target}`, source, target });
  }

  function appendBulletToSubgroup(text: string) {
    if (!currentSubgroupId) return;
    const n = nodes.find((x) => x.id === currentSubgroupId);
    if (n) n.bullets.push(text);
  }

  function addGroupLevelLeaf(text: string) {
    if (!currentGroupId) return;
    groupLeafCount += 1;
    const id = `mm-p${pillarIndex}-g${groupIndex}-l${groupLeafCount}`;
    nodes.push({ id, kind: "leaf", label: text, bullets: [] });
    addEdge(currentGroupId, id);
  }

  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const concept = trimmed.match(
      /^>\s*\*\*Central concept:\*\*\s*(.+)$/i,
    );
    if (concept) {
      rootLabel = concept[1].trim();
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      const title = trimmed.slice(5).trim();
      if (!currentGroupId) continue;
      subgroupCount += 1;
      const id = `mm-p${pillarIndex}-g${groupIndex}-sg${subgroupCount}`;
      currentSubgroupId = id;
      nodes.push({ id, kind: "subgroup", label: title, bullets: [] });
      addEdge(currentGroupId, id);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const title = trimmed.slice(4).trim();
      if (!currentPillarId) continue;
      groupIndex += 1;
      subgroupCount = 0;
      groupLeafCount = 0;
      const id = `mm-p${pillarIndex}-g${groupIndex}`;
      currentGroupId = id;
      currentSubgroupId = null;
      nodes.push({ id, kind: "group", label: title, bullets: [] });
      addEdge(currentPillarId, id);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const title = trimmed.slice(3).trim();
      pillarIndex += 1;
      groupIndex = 0;
      subgroupCount = 0;
      groupLeafCount = 0;
      const id = `mm-p${pillarIndex}`;
      currentPillarId = id;
      currentGroupId = null;
      currentSubgroupId = null;
      nodes.push({ id, kind: "pillar", label: title, bullets: [] });
      addEdge(ROOT_ID, id);
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.+)$/);
    if (bullet) {
      const text = bullet[1].trim();
      if (currentSubgroupId) {
        appendBulletToSubgroup(text);
      } else if (currentGroupId) {
        addGroupLevelLeaf(text);
      }
    }
  }

  nodes.unshift({
    id: ROOT_ID,
    kind: "root",
    label: rootLabel,
    bullets: [],
  });

  return { nodes, edges };
}

function estimateNodeSize(n: MindmapDataNode): { width: number; height: number } {
  /** Extra slack so Dagre / React Flow cards rarely visually overlap. */
  const padW = 32;
  const padH = 26;

  if (n.kind === "leaf") {
    const labelChars = n.label.length;
    const labelWrap = Math.max(1, Math.ceil(labelChars / 20));
    const w = Math.min(300, Math.max(124, 44 + labelChars * 7.2));
    const h = Math.max(52, 40 + labelWrap * 20);
    return { width: w + padW, height: h + padH };
  }

  const chipCols = 2;
  const bulletRows = Math.ceil(n.bullets.length / chipCols);
  const labelChars = n.label.length;
  const labelWrap = Math.max(1, Math.ceil(labelChars / 20));
  const baseW =
    n.kind === "root"
      ? 340
      : n.kind === "pillar"
        ? 220
        : n.kind === "group"
          ? 236
          : 224;
  const w = Math.min(384, baseW + Math.min(80, n.bullets.length * 5));
  const bulletBlock = n.bullets.length ? 18 + bulletRows * 30 : 0;
  const h =
    (n.kind === "root" ? 58 : n.kind === "pillar" ? 50 : 42) +
    labelWrap * 20 +
    bulletBlock +
    (n.bullets.length ? 8 : 0);
  const minH =
    n.kind === "root" ? 84 : n.kind === "pillar" ? 62 : n.kind === "group" ? 58 : 58;
  return {
    width: w + padW,
    height: Math.max(minH, h) + padH,
  };
}

export type MindmapTreeSide = "left" | "right" | "center";

export type MindmapFlowGraph = {
  nodes: Node[];
  edges: Edge[];
};

/** First N pillars in `mindmap.md` render on the left of the hub (XMind-style). */
export const MINDMAP_LEFT_PILLAR_COUNT = 3;

/** Stroke / pillar fill per pillar index (1-based), cycled if there are more pillars. */
export const MINDMAP_CATEGORY_COLORS = [
  "#6d28d9",
  "#0e7490",
  "#c2410c",
  "#15803d",
  "#be185d",
] as const;

export function mindmapCategoryStroke(pillarIndex: number): string {
  const i = (Math.max(1, pillarIndex) - 1) % MINDMAP_CATEGORY_COLORS.length;
  return MINDMAP_CATEGORY_COLORS[i];
}

function getPillarIndexForEdge(
  e: MindmapDataEdge,
  parsed: ReturnType<typeof parseMindmapMarkdown>,
): number | null {
  if (e.source === ROOT_ID) {
    const t = parsed.nodes.find((n) => n.id === e.target);
    if (t?.kind === "pillar") return pillarIndexFromId(t.id);
    return null;
  }
  return (
    getPillarIndexForNode(e.target, parsed) ??
    getPillarIndexForNode(e.source, parsed)
  );
}

function collectSubtree(
  pillarId: string,
  edges: MindmapDataEdge[],
): Set<string> {
  const set = new Set<string>([pillarId]);
  const queue = [pillarId];
  while (queue.length) {
    const id = queue.shift()!;
    for (const e of edges) {
      if (e.source === id && !set.has(e.target)) {
        set.add(e.target);
        queue.push(e.target);
      }
    }
  }
  return set;
}

function pillarIndexFromId(id: string): number | null {
  const m = /^mm-p(\d+)$/.exec(id);
  return m ? parseInt(m[1], 10) : null;
}

function getPillarIndexForNode(
  nodeId: string,
  parsed: { nodes: MindmapDataNode[]; edges: MindmapDataEdge[] },
): number | null {
  if (nodeId === ROOT_ID) return null;
  const direct = pillarIndexFromId(nodeId);
  if (direct != null) return direct;
  const parentByTarget = new Map(
    parsed.edges.map((e) => [e.target, e.source] as const),
  );
  let cur = nodeId;
  for (let i = 0; i < 64; i++) {
    const p = parentByTarget.get(cur);
    if (!p || p === ROOT_ID) return null;
    const idx = pillarIndexFromId(p);
    if (idx != null) return idx;
    cur = p;
  }
  return null;
}

function treeSideForPillarIndex(idx: number): MindmapTreeSide {
  return idx <= MINDMAP_LEFT_PILLAR_COUNT ? "left" : "right";
}

function pillarIconKey(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("modell") || l.includes("modeling")) return "database";
  if (l.includes("mutation")) return "git-branch";
  if (l.includes("production")) return "rocket";
  if (l.includes("fetch")) return "cloud-download";
  if (l.includes("performance")) return "gauge";
  return "layers";
}

function edgeHandles(
  e: MindmapDataEdge,
  parsed: ReturnType<typeof parseMindmapMarkdown>,
): { sourceHandle?: string; targetHandle?: string } {
  if (e.source === ROOT_ID) {
    const t = parsed.nodes.find((n) => n.id === e.target);
    if (!t || t.kind !== "pillar") return {};
    const idx = pillarIndexFromId(t.id);
    if (idx == null) return {};
    if (idx <= MINDMAP_LEFT_PILLAR_COUNT) {
      return { sourceHandle: "h-root-l", targetHandle: "h-in" };
    }
    return { sourceHandle: "h-root-r", targetHandle: "h-in" };
  }
  const srcIdx = getPillarIndexForNode(e.source, parsed);
  if (srcIdx == null) return {};
  const side = treeSideForPillarIndex(srcIdx);
  if (side === "left") {
    return { sourceHandle: "h-out", targetHandle: "h-in" };
  }
  return { sourceHandle: "h-out", targetHandle: "h-in" };
}

/**
 * XMind-like layout: hub in the center, first pillars on the left, rest on the right;
 * each pillar subtree laid out with Dagre (RL / LR). Positions are top-left for React Flow.
 */
export function layoutMindmapFlow(
  parsed: ReturnType<typeof parseMindmapMarkdown>,
): MindmapFlowGraph {
  const rootNode = parsed.nodes.find((n) => n.id === ROOT_ID)!;
  const pillarNodes = parsed.nodes.filter((n) => n.kind === "pillar");
  pillarNodes.sort((a, b) => {
    const ia = pillarIndexFromId(a.id) ?? 0;
    const ib = pillarIndexFromId(b.id) ?? 0;
    return ia - ib;
  });

  const rootCenterX = 640;
  const rootCenterY = 460;
  const rootSize = estimateNodeSize(rootNode);
  const positions = new Map<string, { x: number; y: number }>();

  positions.set(ROOT_ID, {
    x: rootCenterX - rootSize.width / 2,
    y: rootCenterY - rootSize.height / 2,
  });

  const leftAnchors = [
    { x: rootCenterX - 400, y: rootCenterY - 260 },
    { x: rootCenterX - 400, y: rootCenterY },
    { x: rootCenterX - 400, y: rootCenterY + 260 },
  ];
  const rightAnchors = [
    { x: rootCenterX + 400, y: rootCenterY - 200 },
    { x: rootCenterX + 400, y: rootCenterY + 200 },
  ];

  for (const pillar of pillarNodes) {
    const pid = pillar.id;
    const pIdx = pillarIndexFromId(pid);
    if (pIdx == null) continue;
    const side = treeSideForPillarIndex(pIdx);
    const anchor =
      side === "left"
        ? leftAnchors[pIdx - 1]
        : rightAnchors[pIdx - 1 - MINDMAP_LEFT_PILLAR_COUNT];

    if (!anchor) continue;

    const subtree = collectSubtree(pid, parsed.edges);
    const internalEdges = parsed.edges.filter(
      (e) =>
        subtree.has(e.source) &&
        subtree.has(e.target) &&
        e.source !== ROOT_ID,
    );

    if (subtree.size <= 1) {
      const { width, height } = estimateNodeSize(pillar);
      positions.set(pid, {
        x: anchor.x - width / 2,
        y: anchor.y - height / 2,
      });
      continue;
    }

    const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({
      rankdir: side === "left" ? "RL" : "LR",
      ranksep: 72,
      nodesep: 42,
      marginx: 40,
      marginy: 32,
      edgesep: 16,
    });

    for (const nid of subtree) {
      const n = parsed.nodes.find((x) => x.id === nid)!;
      const { width, height } = estimateNodeSize(n);
      g.setNode(nid, { width, height });
    }
    for (const e of internalEdges) {
      g.setEdge(e.source, e.target);
    }

    dagre.layout(g);

    const pillarDagre = g.node(pid);
    const dx = anchor.x - pillarDagre.x;
    const dy = anchor.y - pillarDagre.y;

    for (const nid of subtree) {
      const d = g.node(nid);
      const n = parsed.nodes.find((x) => x.id === nid)!;
      const { width, height } = estimateNodeSize(n);
      positions.set(nid, {
        x: d.x + dx - width / 2,
        y: d.y + dy - height / 2,
      });
    }
  }

  let minX = Infinity;
  let minY = Infinity;
  for (const n of parsed.nodes) {
    const p = positions.get(n.id);
    if (!p) continue;
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
  }
  const pad = 96;
  const ox = pad - minX;
  const oy = pad - minY;
  for (const n of parsed.nodes) {
    const p = positions.get(n.id);
    if (!p) continue;
    p.x += ox;
    p.y += oy;
  }

  const rfNodes: Node[] = parsed.nodes.map((n) => {
    const p = positions.get(n.id)!;
    const pIdx = getPillarIndexForNode(n.id, parsed);
    const side: MindmapTreeSide =
      n.kind === "root" ? "center" : treeSideForPillarIndex(pIdx ?? 1);

    const pillarIdx = pIdx ?? 1;
    const pillarLabel =
      parsed.nodes.find(
        (x) => x.kind === "pillar" && pillarIndexFromId(x.id) === pillarIdx,
      )?.label ?? "";

    const categoryStroke =
      n.kind === "root"
        ? undefined
        : pIdx != null
          ? mindmapCategoryStroke(pIdx)
          : mindmapCategoryStroke(1);

    return {
      id: n.id,
      type: "mindmapCard",
      position: { x: p.x, y: p.y },
      data: {
        kind: n.kind,
        label: n.label,
        bullets: n.bullets,
        side,
        categoryStroke,
        iconKey:
          n.kind === "root"
            ? "network"
            : n.kind === "pillar"
              ? pillarIconKey(n.label)
              : pillarIconKey(pillarLabel),
      },
    };
  });

  const rfEdges: Edge[] = parsed.edges.map((e) => {
    const cat = getPillarIndexForEdge(e, parsed);
    const stroke =
      cat != null ? mindmapCategoryStroke(cat) : "rgb(148 163 184)";
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      type: "mindmapFlow",
      data: { stroke },
      style: { stroke, strokeWidth: 1.35 },
      ...edgeHandles(e, parsed),
    };
  });

  return { nodes: rfNodes, edges: rfEdges };
}

export function buildMindmapFlowFromMarkdown(markdownBody: string): MindmapFlowGraph {
  return layoutMindmapFlow(parseMindmapMarkdown(markdownBody));
}
