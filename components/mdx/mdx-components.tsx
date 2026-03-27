import type { MDXComponents } from "mdx/types";

import { CcdaoFlowDiagram } from "@/components/explainers/CcdaoFlowDiagram";
import { FailureModeStepper } from "@/components/explainers/FailureModeStepper";
import { PaginationMotionDemo } from "@/components/explainers/PaginationMotionDemo";
import { ProtocolChooser } from "@/components/explainers/ProtocolChooser";
import { TradeoffMatrix } from "@/components/explainers/TradeoffMatrix";
import { Callout } from "./Callout";
import { TestingRubric } from "./TestingRubric";

export const mdxComponents: MDXComponents = {
  CcdaoFlowDiagram,
  PaginationMotionDemo,
  TradeoffMatrix,
  ProtocolChooser,
  FailureModeStepper,
  TestingRubric,
  Callout,
};
