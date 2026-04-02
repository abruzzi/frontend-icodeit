"use client";

import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";

import { CourseBoardMockApp } from "@/components/courses/course-board-mock-app";
import {
  type BoardDiagramAnnotation,
  type BoardLabelEdge,
  fsdeBoardDiagramAnnotations,
} from "@/lib/courses/fsde-board-annotations";
import { ui } from "@/lib/ui";

const ENTER_DELAY_MS = 340;
const LEAVE_MS = 200;
/** Slightly brighter than `red-500` so connectors read on light + dark surrounds. */
const LINE_STROKE = "#ff5a5a";
const LINE_STROKE_WIDTH = 1.85;
/** Hollow anchor ring (px); stroke matches the connector. */
const DOT_RADIUS = 4;
const DOT_STROKE_WIDTH = 1.75;

type MeasuredItem = {
  id: string;
  labelX: number;
  labelY: number;
  dotX: number;
  dotY: number;
  /** Horizontal + vertical segments only (one elbow when needed). */
  pathD: string;
};

const CONNECTOR_TRIM =
  DOT_RADIUS + DOT_STROKE_WIDTH / 2 + LINE_STROKE_WIDTH / 2;

/** End of connector on the segment approaching the dot, inset so the ring isn’t crossed. */
function trimTowardDot(
  dotX: number,
  dotY: number,
  fromX: number,
  fromY: number,
): { x: number; y: number } {
  const vx = dotX - fromX;
  const vy = dotY - fromY;
  const len = Math.hypot(vx, vy) || 1;
  return {
    x: dotX - (vx / len) * CONNECTOR_TRIM,
    y: dotY - (vy / len) * CONNECTOR_TRIM,
  };
}

/**
 * Orthogonal path: only horizontal and vertical segments (max one 90° bend).
 * Left/right labels: horizontal toward dot x, then vertical to dot.
 * Top/bottom labels: vertical toward dot y, then horizontal to dot.
 */
function orthogonalConnectorPath(
  lx: number,
  ly: number,
  dotX: number,
  dotY: number,
  edge: BoardLabelEdge,
): string {
  const eps = 0.8;

  if (Math.abs(lx - dotX) < eps) {
    const end = trimTowardDot(dotX, dotY, lx, ly);
    return `M${lx},${ly} L${end.x},${end.y}`;
  }
  if (Math.abs(ly - dotY) < eps) {
    const end = trimTowardDot(dotX, dotY, lx, ly);
    return `M${lx},${ly} L${end.x},${end.y}`;
  }

  if (edge === "left" || edge === "right") {
    const mx = dotX;
    const my = ly;
    const end = trimTowardDot(dotX, dotY, mx, my);
    return `M${lx},${ly} L${mx},${my} L${end.x},${end.y}`;
  }

  const mx = lx;
  const my = dotY;
  const end = trimTowardDot(dotX, dotY, mx, my);
  return `M${lx},${ly} L${mx},${my} L${end.x},${end.y}`;
}

function gutterLabelPoint(
  dr: DOMRect,
  fr: DOMRect,
  edge: BoardLabelEdge,
  along: number,
): { x: number; y: number } {
  switch (edge) {
    case "left":
      return {
        x: (fr.left + dr.left) / 2 - dr.left,
        y: fr.top - dr.top + along * fr.height,
      };
    case "right":
      return {
        x: (fr.right + dr.right) / 2 - dr.left,
        y: fr.top - dr.top + along * fr.height,
      };
    case "top":
      return {
        x: fr.left - dr.left + along * fr.width,
        y: (fr.top + dr.top) / 2 - dr.top,
      };
    case "bottom":
      return {
        x: fr.left - dr.left + along * fr.width,
        y: (fr.bottom + dr.bottom) / 2 - dr.top,
      };
  }
}

function labelAnchorTransform(edge: BoardLabelEdge): string {
  switch (edge) {
    case "left":
      return "translate(-100%, -50%)";
    case "right":
      return "translate(0, -50%)";
    case "top":
      return "translate(-50%, -100%)";
    case "bottom":
      return "translate(-50%, 0)";
  }
}

function tooltipPositionClass(edge: BoardLabelEdge): string {
  switch (edge) {
    case "left":
      return "right-full top-1/2 mr-3 -translate-y-1/2";
    case "right":
      return "left-full top-1/2 ml-3 -translate-y-1/2";
    case "top":
      return "bottom-full left-1/2 mb-2 -translate-x-1/2";
    case "bottom":
      return "top-full left-1/2 mt-2 -translate-x-1/2";
  }
}

function AnnotationItem({
  item,
  m,
  activeId,
  onEnterLabel,
  onLeaveLabel,
}: {
  item: BoardDiagramAnnotation;
  m: MeasuredItem;
  activeId: string | null;
  onEnterLabel: (id: string) => void;
  onLeaveLabel: () => void;
}) {
  const open = activeId === item.id;
  const edge = item.labelEdge;
  const textAlign =
    edge === "left" ? "text-right" : edge === "right" ? "text-left" : "text-center";

  return (
    <div
      className="absolute z-[28]"
      style={{
        left: m.labelX,
        top: m.labelY,
        transform: labelAnchorTransform(edge),
      }}
    >
      <button
        type="button"
        className={[
          "max-w-[13.5rem] cursor-help border-0 bg-transparent px-0.5 py-1 text-left text-sm font-medium leading-snug tracking-tight text-slate-700 outline-none transition-colors duration-150 sm:text-[0.9375rem] sm:leading-snug",
          "hover:text-palette-azure focus-visible:text-palette-azure focus-visible:ring-2 focus-visible:ring-palette-azure/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "dark:text-slate-300 dark:hover:text-palette-azure dark:focus-visible:ring-offset-transparent",
          textAlign,
        ].join(" ")}
        aria-describedby={open ? `board-tip-${item.id}` : undefined}
        aria-expanded={open}
        onMouseEnter={() => onEnterLabel(item.id)}
        onMouseLeave={onLeaveLabel}
        onFocus={() => onEnterLabel(item.id)}
        onBlur={onLeaveLabel}
      >
        {item.title}
      </button>

      <div
        id={`board-tip-${item.id}`}
        role="tooltip"
        className={[
          "pointer-events-none absolute z-[34] w-max max-w-[min(17.5rem,calc(100vw-2.5rem))] rounded-xl border px-3.5 py-3 text-left text-sm leading-snug shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-200",
          "border-slate-200/90 bg-white/95 text-slate-700 ring-1 ring-slate-900/[0.04]",
          "dark:border-slate-600/80 dark:bg-slate-900/96 dark:text-slate-100 dark:ring-white/[0.08]",
          tooltipPositionClass(edge),
          open ? "visible scale-100 opacity-100" : "invisible scale-[0.98] opacity-0",
        ].join(" ")}
      >
        <p className="font-heading text-[0.65rem] font-bold uppercase tracking-wider text-palette-azure">
          {item.title}
        </p>
        <p className="mt-1.5 text-pretty text-[0.8125rem] leading-relaxed text-slate-600 dark:text-slate-400">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function CourseBoardAnnotateSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const boardShellRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{
    w: number;
    h: number;
    items: MeasuredItem[];
  } | null>(null);

  const clearTimers = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
  }, []);

  const onEnterLabel = useCallback(
    (id: string) => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }
      if (enterTimer.current) {
        clearTimeout(enterTimer.current);
      }
      enterTimer.current = setTimeout(() => {
        enterTimer.current = null;
        setActiveId(id);
      }, ENTER_DELAY_MS);
    },
    [],
  );

  const onLeaveLabel = useCallback(() => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
    }
    leaveTimer.current = setTimeout(() => setActiveId(null), LEAVE_MS);
  }, []);

  const measure = useCallback(() => {
    const drEl = diagramRef.current;
    const frEl = frameRef.current;
    const shellEl = boardShellRef.current;
    if (!drEl || !frEl || !shellEl) return;

    const dr = drEl.getBoundingClientRect();
    const fr = frEl.getBoundingClientRect();
    const shell = shellEl.getBoundingClientRect();
    if (dr.width < 8 || dr.height < 8) return;

    const items: MeasuredItem[] = fsdeBoardDiagramAnnotations.map((ann) => {
      const { x: lx, y: ly } = gutterLabelPoint(dr, fr, ann.labelEdge, ann.labelAlong);
      const callout = drEl.querySelector(
        `[data-board-callout="${ann.id}"]`,
      ) as HTMLElement | null;
      let dotX: number;
      let dotY: number;
      if (callout) {
        const er = callout.getBoundingClientRect();
        dotX = er.left + er.width / 2 - dr.left;
        dotY = er.top + er.height / 2 - dr.top;
      } else {
        dotX = shell.left - dr.left + (ann.dot[0] / 100) * shell.width;
        dotY = shell.top - dr.top + (ann.dot[1] / 100) * shell.height;
      }
      const pathD = orthogonalConnectorPath(
        lx,
        ly,
        dotX,
        dotY,
        ann.labelEdge,
      );
      return { id: ann.id, labelX: lx, labelY: ly, dotX, dotY, pathD };
    });

    setLayout({ w: dr.width, h: dr.height, items });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    const d = diagramRef.current;
    const f = frameRef.current;
    const shell = boardShellRef.current;
    if (d) ro.observe(d);
    if (f) ro.observe(f);
    if (shell) ro.observe(shell);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useLayoutEffect(
    () => () => {
      clearTimers();
    },
    [clearTimers],
  );

  const byId = layout
    ? Object.fromEntries(layout.items.map((it) => [it.id, it]))
    : null;

  return (
    <div className="min-w-0 space-y-10">
      <div>
        <p className={ui.courseEyebrow}>Capstone map</p>
        <h2 className={`mt-3 ${ui.courseSectionTitle}`}>
          The board as a system diagram
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-slate-600 dark:text-slate-400 sm:text-xl sm:leading-relaxed">
          A lightweight board runs in the shell below — drag cards between columns
          or add one locally. Callout titles sit in the margin; pause on a title
          for a short explanation.
        </p>
      </div>

      <div
        ref={diagramRef}
        className="relative w-full overflow-visible px-3 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
      >
        <div
          ref={frameRef}
          className="relative z-[2] mx-auto w-full max-w-[min(100%,72rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100/90 shadow-[0_22px_50px_-12px_rgba(15,23,42,0.22),0_0_0_1px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.04] dark:border-slate-600/80 dark:bg-slate-800/90 dark:shadow-[0_24px_55px_-14px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] dark:ring-white/[0.06]"
        >
          <div className="flex h-10 items-center gap-2 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-slate-100/95 px-3 sm:h-11 dark:border-slate-600/70 dark:from-slate-800 dark:to-slate-800/95">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-inner ring-1 ring-black/[0.12]" />
              <span className="size-2.5 rounded-full bg-[#febc2e] shadow-inner ring-1 ring-black/[0.12]" />
              <span className="size-2.5 rounded-full bg-[#28c840] shadow-inner ring-1 ring-black/[0.12]" />
            </span>
            <span className="flex-1 truncate text-center text-[11px] font-medium tracking-wide text-slate-500 sm:text-xs dark:text-slate-400">
              Board application — annotated
            </span>
            <span className="w-14 shrink-0 sm:w-16" aria-hidden />
          </div>

          <div
            ref={boardShellRef}
            className="relative min-h-[min(70vh,520px)] w-full overflow-hidden bg-slate-200/50 dark:bg-slate-950/50"
          >
            <CourseBoardMockApp onLayoutChange={measure} />
          </div>
        </div>

        {layout && layout.items.length > 0 ? (
          <svg
            className="pointer-events-none absolute left-0 top-0 z-[12] overflow-visible"
            width={layout.w}
            height={layout.h}
            aria-hidden
          >
            {layout.items.map((m) => (
              <path
                key={`line-${m.id}`}
                d={m.pathD}
                fill="none"
                stroke={LINE_STROKE}
                strokeWidth={LINE_STROKE_WIDTH}
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeMiterlimit={2.5}
              />
            ))}
            {layout.items.map((m) => (
              <circle
                key={`dot-${m.id}`}
                cx={m.dotX}
                cy={m.dotY}
                r={DOT_RADIUS}
                fill="none"
                stroke={LINE_STROKE}
                strokeWidth={DOT_STROKE_WIDTH}
              />
            ))}
          </svg>
        ) : null}

        {layout && byId
          ? fsdeBoardDiagramAnnotations.map((ann) => {
              const m = byId[ann.id];
              if (!m) return null;
              return (
                <Fragment key={ann.id}>
                  <AnnotationItem
                    item={ann}
                    m={m}
                    activeId={activeId}
                    onEnterLabel={onEnterLabel}
                    onLeaveLabel={onLeaveLabel}
                  />
                </Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
}
