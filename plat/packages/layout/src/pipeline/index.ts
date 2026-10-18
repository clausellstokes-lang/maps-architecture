// @plat/layout's pipeline module (M0-x-02; §4.1, §4.12, §14, §5.4, §6.1, §17.1 (8); C-0003, C-0020, C-0077, C-0090,
// C-0095, C-0224): the StrategyRegistry with its products and stage registration by declared I/O, Kahn's order with
// the stage-id tie-break, the runner and the generation report — built and tested over fixture stages. Created empty by
// the scaffold (M0-s-01, C-0013); this index and its folder belong to M0-x-02, and the index passes to M0-x-04 for the
// one re-export line of `base.ts` (C-0095).
export {
  createRegistry,
  register,
  type BatchSpec,
  type ModelView,
  type PipelineContext,
  type PipelineEnv,
  type PipelineStage,
  type ProductDecl,
  type StagedStrategy,
  type StrategyRegistry,
} from './registry.js';
export { cycleText, kahn, RegistrationError, stageEdges, stageOrder, type OrderNode, type OrderResult } from './order.js';
export { BLUEPRINT_KEY, OUTPUT_VERSION, run, type PipelineModel, type RunBlueprint, type RunOptions } from './runner.js';
export {
  REPORT_FIELDS,
  REPORT_LISTS,
  ReportBuilder,
  type AddressOf,
  type AutoResolvedRow,
  type BugInput,
  type BugRow,
  type Diff,
  type DossierRow,
  type FailureClass,
  type GenerationReport,
  type InvariantLine,
  type KernelReport,
  type LadderUse,
  type LadderUseInput,
  type PrefixRow,
  type ReportCode,
  type ReportSink,
  type RequestedRow,
  type StageReport,
  type StageState,
  type Tier,
} from './report.js';
export * from './base.js';
