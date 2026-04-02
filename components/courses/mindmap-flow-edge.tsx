"use client";

import {
  BaseEdge,
  getSimpleBezierPath,
  type EdgeProps,
} from "@xyflow/react";

type FlowEdgeData = { stroke?: string };

/**
 * Category-colored Bézier edge with two low-opacity dots moving source → target
 * (subtle “flow” without loud dashed animation).
 */
export function MindmapFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const stroke =
    (data as FlowEdgeData | undefined)?.stroke ??
    (typeof style?.stroke === "string" ? style.stroke : undefined) ??
    "#7c3aed";

  const pathId = `mindmap-edge-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}-path`;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, stroke, strokeWidth: 1.35 }}
        interactionWidth={18}
      />
      <path id={pathId} d={edgePath} fill="none" stroke="none" />
      <g className="pointer-events-none">
        <circle r="2.2" fill={stroke} opacity={0.38}>
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            rotate="auto"
            calcMode="linear"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        <circle r="1.6" fill={stroke} opacity={0.22}>
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            rotate="auto"
            calcMode="linear"
            begin="1.6s"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      </g>
    </>
  );
}
