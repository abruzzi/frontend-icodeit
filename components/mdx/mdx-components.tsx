import type { MDXComponents } from "mdx/types";
import type { CSSProperties } from "react";

import { BoardCascadeReindexDemo } from "@/components/case-studies/board-application/BoardCascadeReindexDemo";
import { BoardLexRankDemo } from "@/components/case-studies/board-application/BoardLexRankDemo";
import { BoardSparseGapDemo } from "@/components/case-studies/board-application/BoardSparseGapDemo";
import { BoardDataModelDiagram } from "@/components/case-studies/board-application/BoardDataModelDiagram";
import { BoardDndDemo } from "@/components/case-studies/board-application/BoardDndDemo";
import { BoardEmptyStateDemo } from "@/components/case-studies/board-application/BoardEmptyStateDemo";
import { BoardLoadingSkeletonDemo } from "@/components/case-studies/board-application/BoardLoadingSkeletonDemo";
import { IntersectionPaginationDemo } from "@/components/case-studies/board-application/IntersectionPaginationDemo";
import { BoardNetworkFailureDemo } from "@/components/case-studies/board-application/BoardNetworkFailureDemo";
import { BoardNormalisationStepperDemo } from "@/components/case-studies/board-application/BoardNormalisationStepperDemo";
import { BoardSseBroadcastDemo } from "@/components/case-studies/board-application/BoardSseBroadcastDemo";
import { CcdaoFlowDiagram } from "@/components/explainers/CcdaoFlowDiagram";
import { FailureModeStepper } from "@/components/explainers/FailureModeStepper";
import { PaginationMotionDemo } from "@/components/explainers/PaginationMotionDemo";
import { ProtocolChooser } from "@/components/explainers/ProtocolChooser";
import { TradeoffMatrix } from "@/components/explainers/TradeoffMatrix";
import { ChevronRight } from "lucide-react";
import { CourseCurriculumStoryline } from "@/components/courses/course-curriculum-storyline";
import { CourseFaqSection } from "@/components/courses/course-faq-section";
import { FsdeCaseStudyCourseCard } from "@/components/courses/fsde-case-study-promo-card";
import { CoursePricingCompact } from "@/components/courses/course-pricing-compact";
import { Callout } from "./Callout";
import { Highlight } from "./Highlight";
import { MdxPre } from "./MdxPre";
import { TestingRubric } from "./TestingRubric";
import { Token } from "./Token";
import { WorkingInProgress } from "./WorkingInProgress";

export const mdxComponents: MDXComponents = {
  CourseCurriculumStoryline,
  CourseFaqSection,
  CoursePricingCompact,
  FsdeCaseStudyCourseCard,
  BoardCascadeReindexDemo,
  BoardLexRankDemo,
  BoardSparseGapDemo,
  BoardDataModelDiagram,
  BoardDndDemo,
  BoardEmptyStateDemo,
  BoardNetworkFailureDemo,
  BoardLoadingSkeletonDemo,
  IntersectionPaginationDemo,
  BoardNormalisationStepperDemo,
  BoardSseBroadcastDemo,
  CcdaoFlowDiagram,
  PaginationMotionDemo,
  TradeoffMatrix,
  ProtocolChooser,
  FailureModeStepper,
  TestingRubric,
  Callout,
  Highlight,
  Token,
  WorkingInProgress,
  pre: MdxPre,
  // Bullet lists: icon marker + `.mdx-icon-li-marker` offset in `globals.css` (uses `lh`, not `line-height: 1`).
  ul: ({ className, ...props }) => {
    return (
      <ul
        {...props}
        className={["mdx-icon-ul", className].filter(Boolean).join(" ")}
      />
    );
  },
  ol: ({ className, start, style, ...props }) => {
    const startNum = start != null ? Number(start) : undefined;
    const counterStyle: CSSProperties | undefined =
      startNum != null && !Number.isNaN(startNum)
        ? {
            ...(style as CSSProperties | undefined),
            counterReset: `mdx-ol ${Math.max(0, startNum - 1)}`,
          }
        : (style as CSSProperties | undefined);
    return (
      <ol
        {...props}
        start={start}
        style={counterStyle}
        className={["mdx-num-ol", className].filter(Boolean).join(" ")}
      />
    );
  },
  li: ({ className, children, ...props }) => {
    return (
      <li
        {...props}
        className={["mdx-icon-li", className].filter(Boolean).join(" ")}
      >
        <span
          className="mdx-icon-li-marker flex h-5 w-5 shrink-0 items-center justify-center text-palette-magenta"
          aria-hidden="true"
        >
          <ChevronRight size={14} strokeWidth={2.25} />
        </span>
        <div className="mdx-icon-li-content">{children}</div>
      </li>
    );
  },
};
