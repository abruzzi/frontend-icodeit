import type { MDXComponents } from "mdx/types";

import { FailureModeStepper } from "@/components/explainers/FailureModeStepper";
import { ProtocolChooser } from "@/components/explainers/ProtocolChooser";
import { TradeoffMatrix } from "@/components/explainers/TradeoffMatrix";
import { Callout } from "./Callout";
import { TestingRubric } from "./TestingRubric";

export const mdxComponents: MDXComponents = {
  TradeoffMatrix,
  ProtocolChooser,
  FailureModeStepper,
  TestingRubric,
  Callout,
};
