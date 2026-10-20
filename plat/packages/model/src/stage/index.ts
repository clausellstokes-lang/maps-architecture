// @plat/model's stage module (M0-m-01; C-0003): the stage declarations, the stage and its context, the scopes, the
// work-limit laws and the strategy interfaces' types (§4.12, §5.1 (5), §3.3, §14), the stage and data-key
// vocabularies, and the law's evaluation.
export type {
  BatchScope,
  DataKey,
  Destination,
  GateSite,
  Ladder,
  Scope,
  Stage,
  StageContext,
  StageDecl,
  StageEnv,
  StageHookDecl,
  WaterSet,
  WorkLimitLaw,
  WorkLimits,
  WorkUnit,
} from './decl.js';
export { DATA_KEYS, lawLimit, STAGE_IDS, type KnownDataKey, type StageName } from './vocab.js';
