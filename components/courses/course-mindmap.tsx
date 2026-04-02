import dynamic from "next/dynamic";

import type { MindmapFlowGraph } from "@/lib/courses/parse-mindmap-md";

const CourseMindmapFlow = dynamic(
  () =>
    import("./course-mindmap-flow").then((m) => m.CourseMindmapFlow),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(85vh,900px)] min-h-[520px] w-full items-center justify-center rounded-2xl border border-violet-200/50 bg-violet-50/40 text-sm text-violet-700 dark:border-violet-500/25 dark:bg-violet-950/30 dark:text-violet-300"
        aria-hidden
      >
        Loading map…
      </div>
    ),
  },
);

type Props = {
  graph: MindmapFlowGraph;
};

/**
 * React Flow mindmap from `mindmap.md` (built on the server via Dagre layout).
 */
export function CourseMindmap({ graph }: Props) {
  return (
    <figure className="not-prose relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <figcaption className="sr-only">
        Interactive curriculum map: drag nodes to rearrange, drag the canvas to
        pan, scroll to zoom. Structure comes from mindmap.md.
      </figcaption>
      <div className="mx-auto w-full max-w-[min(100vw,88rem)] px-2 sm:px-4 md:px-6">
        <CourseMindmapFlow nodes={graph.nodes} edges={graph.edges} />
      </div>
    </figure>
  );
}
