import type { MDXComponents } from "mdx/types";
import type { CSSProperties } from "react";

import { BoardCascadeReindexDemo } from "@/components/case-studies/board-application/BoardCascadeReindexDemo";
import { BoardCommandLifecycleFlow } from "@/components/case-studies/board-application/BoardCommandLifecycleFlow";
import { BoardDataModelDiagram } from "@/components/case-studies/board-application/BoardDataModelDiagram";
import { BoardDndAccessibleDemo } from "@/components/case-studies/board-application/BoardDndAccessibleDemo";
import { BoardDndDemo } from "@/components/case-studies/board-application/BoardDndDemo";
import { BoardEmptyStateDemo } from "@/components/case-studies/board-application/BoardEmptyStateDemo";
import { BoardLexRankDemo } from "@/components/case-studies/board-application/BoardLexRankDemo";
import { BoardLazyCardDetailsDemo } from "@/components/case-studies/board-application/BoardLazyCardDetailsDemo";
import { BoardLazyCardDetailsFlowDiagram } from "@/components/case-studies/board-application/BoardLazyCardDetailsFlowDiagram";
import { BoardLoadingSkeletonDemo } from "@/components/case-studies/board-application/BoardLoadingSkeletonDemo";
import { BoardNetworkFailureDemo } from "@/components/case-studies/board-application/BoardNetworkFailureDemo";
import { BoardNormalisationStepperDemo } from "@/components/case-studies/board-application/BoardNormalisationStepperDemo";
import { BoardSparseGapDemo } from "@/components/case-studies/board-application/BoardSparseGapDemo";
import { BoardSparseRebalanceDemo } from "@/components/case-studies/board-application/BoardSparseRebalanceDemo";
import { BoardSseBroadcastDemo } from "@/components/case-studies/board-application/BoardSseBroadcastDemo";
import {
  BoardZombieCardIdentityFixDemo,
  BoardZombieCardIdentityProblemDemo,
} from "@/components/case-studies/board-application/BoardZombieCardIdentityDemo";
import { IntersectionPaginationDemo } from "@/components/case-studies/board-application/IntersectionPaginationDemo";
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
import { withDemoErrorBoundary } from "./with-demo-error-boundary";
import { Highlight } from "./Highlight";
import { MdxPre } from "./MdxPre";
import { TestingRubric } from "./TestingRubric";
import { Token } from "./Token";
import {
  Restful,
  RestfulRequest,
  RestfulResponse,
} from "./restful-endpoint";
import { WorkingInProgress } from "./WorkingInProgress";

const wrap = withDemoErrorBoundary;

export const mdxComponents: MDXComponents = {
  CourseCurriculumStoryline: wrap(CourseCurriculumStoryline, "Course curriculum"),
  CourseFaqSection: wrap(CourseFaqSection, "Course FAQ"),
  CoursePricingCompact: wrap(CoursePricingCompact, "Course pricing"),
  FsdeCaseStudyCourseCard: wrap(FsdeCaseStudyCourseCard, "Course promo card"),
  BoardCascadeReindexDemo: wrap(BoardCascadeReindexDemo, "Cascade reindex demo"),
  BoardCommandLifecycleFlow: wrap(BoardCommandLifecycleFlow, "Command lifecycle flow"),
  BoardDataModelDiagram: wrap(BoardDataModelDiagram, "Board data model diagram"),
  BoardDndAccessibleDemo: wrap(BoardDndAccessibleDemo, "Board accessible drag and drop demo"),
  BoardDndDemo: wrap(BoardDndDemo, "Board drag and drop demo"),
  BoardEmptyStateDemo: wrap(BoardEmptyStateDemo, "Board empty state demo"),
  BoardLexRankDemo: wrap(BoardLexRankDemo, "LexoRank ordering demo"),
  BoardLazyCardDetailsDemo: wrap(BoardLazyCardDetailsDemo, "Lazy card details demo"),
  BoardLazyCardDetailsFlowDiagram: wrap(
    BoardLazyCardDetailsFlowDiagram,
    "Lazy card details flow diagram",
  ),
  BoardLoadingSkeletonDemo: wrap(BoardLoadingSkeletonDemo, "Board loading skeleton demo"),
  BoardNetworkFailureDemo: wrap(BoardNetworkFailureDemo, "Board network failure demo"),
  BoardNormalisationStepperDemo: wrap(BoardNormalisationStepperDemo, "Board normalisation demo"),
  BoardSparseGapDemo: wrap(BoardSparseGapDemo, "Sparse integer ranks demo"),
  BoardSparseRebalanceDemo: wrap(BoardSparseRebalanceDemo, "Sparse segment rebalance demo"),
  BoardSseBroadcastDemo: wrap(BoardSseBroadcastDemo, "Board live updates demo"),
  BoardZombieCardIdentityFixDemo: wrap(BoardZombieCardIdentityFixDemo, "Zombie card identity fix demo"),
  BoardZombieCardIdentityProblemDemo: wrap(
    BoardZombieCardIdentityProblemDemo,
    "Zombie card identity problem demo",
  ),
  IntersectionPaginationDemo: wrap(IntersectionPaginationDemo, "Intersection pagination demo"),
  CcdaoFlowDiagram: wrap(CcdaoFlowDiagram, "CCDAO flow diagram"),
  PaginationMotionDemo: wrap(PaginationMotionDemo, "Pagination motion demo"),
  TradeoffMatrix: wrap(TradeoffMatrix, "Tradeoff matrix"),
  ProtocolChooser: wrap(ProtocolChooser, "Protocol chooser"),
  FailureModeStepper: wrap(FailureModeStepper, "Failure mode stepper"),
  TestingRubric: wrap(TestingRubric, "Testing rubric"),
  Callout: wrap(Callout, "Callout"),
  Highlight: wrap(Highlight, "Highlight"),
  Token: wrap(Token, "Token"),
  WorkingInProgress: wrap(WorkingInProgress, "Working in progress notice"),
  Restful: wrap(Restful, "REST endpoint"),
  /** Async RSC: re-highlight fence bodies (nested MDX skips rehype-shiki). */
  Request: RestfulRequest,
  Response: RestfulResponse,
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
