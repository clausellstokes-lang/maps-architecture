// The StrategyRegistry, its products and stage registration by declared I/O (M0-x-02; §4.1 *Registration and order*,
// §4.12, §14 `StrategyRegistry`, `Stage`, `StageContext`, `Scope`; C-0003, C-0020, C-0077, C-0224).
//
// * `StrategyRegistry` is §14's: one `Map` per strategy kind (terrain, coast, river, manifest, network, enceinte,
//   fabric, plots, sitePlan, building, evolution, sky, sewer, underground), `hooks` by host and `products`. A strategy
//   kind whose interface lands with its milestone is held as `StagedStrategy` (an object registered by name) until then;
//   the two §4.12 interfaces M0 builds — TerrainStrategy and RiverStrategy — are @plat/site's.
// * `products` holds the base's `ProductDecl` in its M0 form (C-0224 (1)): its stage set (`stages`, the Stage objects
//   registered for it) and `extraInputs` (§4.1: data keys a product adds to a stage's declared inputs). A new registry
//   holds the base product with no stage: the base registration table that imports and registers the M0 stages is
//   M0-x-04's (`base.ts`, C-0077); every stage item exports its Stage from its own files.
// * `register(registry, stage)` checks the declaration and adds it to the base's stage set; a cycle in the declared I/O
//   is a registration error caught then (§4.1): the registry is left as it was and `RegistrationError` names the cycle.
// * Hooks (§4.12's `StageHookDecl`, `StrategyRegistry.hooks`) are declared and never registered before M2b: `hooks` is
//   an empty Map, and an order or a run over a registry holding a hook refuses (`notBuilt('M2b')`, ./order.ts).
// * The stage types a registered stage sees: `PipelineEnv` binds §14's StageContext slots (C-0142 (5)); a stage's run
//   receives a `PipelineContext` — §14's StageContext plus the kernel façade, the batch door `batch` (each batch through
//   the façade's tx in the stage's declared op form, its work limit from its laws, its expect from its invariants, its
//   created faces ranked), `bind` (the entity-key cache of C-0147 as a handle) and the model digest.
import {
  CONCERN_REGISTRY,
  stageRow,
  stageText,
  STAGE_VIEW,
  type Committed,
  type Hash128,
  type Handle,
  type Kernel,
  type KernelOp,
  type KernelResult,
  type Level,
  type OnFail,
  type Overlay,
  type Plat,
  type PlatKey,
  type StageId,
  type Stream,
} from '@plat/kernel';
import type { BatchScope, DataKey, Minted, ModelDigest, Scope, Stage, StageContext, StageEnv, StageHookDecl } from '@plat/model';
import type { RiverStrategy, TerrainStrategy } from '@plat/site';
import type { RungProfile, ScopeCounts, TableView } from '@plat/tables';
import { cycleText, kahn, RegistrationError } from './order.js';
import type { ReportSink } from './report.js';

/** A strategy whose interface lands with its milestone (§4.12, §14): an object registered by name until then. */
export type StagedStrategy = object;

/** The model a stage's `inputsOf` reads (§14): its declared inputs' values, by data key. */
export interface ModelView {
  /**
   * A declared input's value, or `undefined` when no stage wrote it (a missing input: the stage decides, the report stays
   * whole, §5.4). Reading a key the stage did not declare is a programming error (§4.1: the order is the declared I/O's).
   */
  get(key: DataKey): unknown;
  /** Whether a declared input holds a value. */
  has(key: DataKey): boolean;
}

/** §14's StageContext slots as the pipeline binds them (C-0142 (5)). */
export interface PipelineEnv extends StageEnv {
  /** §2.9's Document: M1's (§4b); undefined at M0. */
  doc: undefined;
  plat: Plat;
  stream: Stream;
  kernel: Kernel;
  tables: TableView;
  rung: RungProfile;
  report: ReportSink;
  model: ModelView;
}

/**
 * One batch as a stage hands it to `PipelineContext.batch`: the arena (default the ground arena, part 0), the level,
 * the declared ops (declared form only), the work-limit counter its limit is read from and the scope's committed counts
 * (§5.1 (5)), the §5.1 tier a failed expect entry enters (default `reject`) and the batch scope (default the stage's).
 */
export interface BatchSpec {
  key?: PlatKey;
  level: Level;
  ops?: readonly KernelOp[];
  counter: string;
  counts: ScopeCounts;
  onFail?: OnFail;
  batch?: BatchScope;
}

/** What a registered stage's run receives: §14's StageContext and the pipeline's doors (C-0224 (6)). */
export interface PipelineContext extends StageContext<PipelineEnv> {
  /** The kernel façade over the run's arenas (§14 `Kernel`). */
  readonly kernel: Kernel;
  /**
   * One batch through the façade's tx (§3.3): in the stage's declared op form (`ops` for `declared`, `fn` for
   * `callback`; both, or the other form, is an assertion), `workLimit` = the stage's law for `counter` over `counts`,
   * `expect` = its batch-scope hard rows, `stage` and `rederivesFrom` its id; the faces the batch creates carry the
   * stage's rank (§3.3 kept content). The commit (or the refusal) is returned to the stage, whose ladder handles it.
   */
  batch<T>(spec: BatchSpec, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>>;
  /** Binds a minted entity's cached entity key (C-0147) to a handle of this derivation, for `stream` (§14). */
  bind(entity: Minted): Handle;
  /** The derivation's seed key (§6.1): what `mint` keys an entity with. */
  readonly seedKey: Readonly<Hash128>;
  /** The model digest the stage's records are written to (§6.2; M0-d-04's `put`). */
  readonly digest: ModelDigest;
}

/** A registered stage (§14's Stage over the pipeline's environment); its run receives the pipeline's context. */
export interface PipelineStage<I = unknown, O = unknown> extends Stage<I, O, PipelineEnv> {
  inputsOf(model: ModelView, scope: Scope): I;
  run(input: I, ctx: PipelineContext): KernelResult<O>;
}

/** §4.12's ProductDecl in its M0 form (V07 §2.1's type is volume 7's): the product's stage set and its extra inputs. */
export interface ProductDecl {
  readonly id: 'base' | 'village';
  /** The stages registered for the product (§4.12: the pipeline order is their topological order). */
  readonly stages: PipelineStage[];
  /** Data keys the product adds to a reused stage's declared inputs (§4.1's `ProductDecl.extraInputs`). */
  readonly extraInputs: Map<StageId, DataKey[]>;
}

/** §14's StrategyRegistry. */
export interface StrategyRegistry {
  terrain: Map<string, TerrainStrategy>;
  coast: Map<string, StagedStrategy>;
  river: Map<string, RiverStrategy>;
  manifest: Map<string, StagedStrategy>;
  network: Map<string, StagedStrategy>;
  enceinte: Map<string, StagedStrategy>;
  fabric: Map<string, StagedStrategy>;
  plots: Map<string, StagedStrategy>;
  sitePlan: Map<string, StagedStrategy>;
  building: Map<string, StagedStrategy>;
  evolution: Map<string, StagedStrategy>;
  sky: Map<string, StagedStrategy>;
  sewer: Map<string, StagedStrategy>;
  underground: Map<string, StagedStrategy>;
  /** §4.12's hook points by host: declared at M2b, registered from M5 — empty at M0. */
  hooks: Map<string, StageHookDecl[]>;
  products: Map<'base' | 'village', ProductDecl>;
}

/** A registry with no strategy, no hook, and the base product with no stage (M0-x-04 registers the M0 set, C-0077). */
export function createRegistry(): StrategyRegistry {
  return {
    terrain: new Map(),
    coast: new Map(),
    river: new Map(),
    manifest: new Map(),
    network: new Map(),
    enceinte: new Map(),
    fabric: new Map(),
    plots: new Map(),
    sitePlan: new Map(),
    building: new Map(),
    evolution: new Map(),
    sky: new Map(),
    sewer: new Map(),
    underground: new Map(),
    hooks: new Map(),
    products: new Map([['base', { id: 'base', stages: [], extraInputs: new Map() }]]),
  };
}

/** The highest u8 stage rank (§2.2's `LevelFaces.stage`): at most 256 stages order into one arena's ranks. */
const MAX_RANK = 255;

const INVARIANT_SCOPES: ReadonlySet<string> = new Set(['batch', 'stage', 'save', 'load', 'ci']);

const CONCERN_NAMES: ReadonlyMap<string, boolean> = new Map(CONCERN_REGISTRY.rows.map((r) => [r.name, r.retired]));

function refuse(stage: unknown, why: string): never {
  const id = typeof stage === 'object' && stage !== null && 'id' in stage ? (stage as { id: unknown }).id : undefined;
  throw new RegistrationError(`register: stage ${typeof id === 'number' ? stageText(id) : String(id)}: ${why}`);
}

function isKeyList(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((k) => typeof k === 'string' && k.length > 0) && new Set(v).size === v.length;
}

/** Checks one declaration's fields (§4.12's StageDecl, §14's Stage); throws a RegistrationError naming the field. */
function checkDecl(stage: PipelineStage): void {
  if (typeof stage !== 'object' || stage === null) refuse(stage, 'a stage is an object');
  const id = stage.id as number;
  if (!Number.isInteger(id) || id === STAGE_VIEW || stageRow(id) === undefined) {
    refuse(stage, 'its id is no stage of the stage-id registry (§6.1; C-0020) — a new stage is appended there first');
  }
  // §3.3 *Two op forms*: exactly one — declared ops or a callback — per stage (§4.1's op form per stage).
  const form = stage.txForm as unknown;
  if (form !== 'declared' && form !== 'callback') {
    refuse(stage, `txForm is ${JSON.stringify(form)}: a stage registers exactly one op form, 'declared' (an ops list) or 'callback', never both (§3.3, §4.1)`);
  }
  const phase = stage.phase as unknown;
  if (phase === 'tail') throw new RegistrationError(`register: stage ${stageText(id)}: notBuilt('M6-U'): a tail stage runs after the first map (§4.1 *The tail*; staged)`);
  if (phase !== undefined && phase !== 'main') refuse(stage, `phase is ${JSON.stringify(phase)}: 'main' or 'tail' (§4.12)`);
  if (!isKeyList(stage.inputs)) refuse(stage, 'inputs is a list of distinct non-empty data keys');
  if (!isKeyList(stage.outputs)) refuse(stage, 'outputs is a list of distinct non-empty data keys');
  if (!isKeyList(stage.streamKeys)) refuse(stage, 'streamKeys is a list of distinct concern names');
  for (const name of stage.streamKeys) {
    const retired = CONCERN_NAMES.get(name);
    if (retired === undefined) refuse(stage, `stream key '${name}' is no concern of the registry (§6.1)`);
    if (retired) refuse(stage, `stream key '${name}' is a retired concern: no reader (§6.1)`);
  }
  if (!Array.isArray(stage.invariants)) refuse(stage, 'invariants is a list');
  const rows = new Set<string>();
  for (const row of stage.invariants) {
    if (typeof row.name !== 'string' || row.name.length === 0 || rows.has(row.name)) refuse(stage, 'each invariant row has its own non-empty name');
    if (!INVARIANT_SCOPES.has(row.scope) || (row.class !== 'hard' && row.class !== 'soft')) refuse(stage, `invariant '${row.name}' has §5.3's scope and class`);
    rows.add(row.name);
  }
  if (!Array.isArray(stage.workLimits)) refuse(stage, 'workLimits is a list of laws (§5.1 (5))');
  const counters = new Set<string>();
  for (const law of stage.workLimits) {
    if (typeof law.counter !== 'string' || law.counter.length === 0 || counters.has(law.counter)) refuse(stage, 'each work-limit law names its own counter');
    counters.add(law.counter);
  }
  if (typeof stage.lazy !== 'boolean') refuse(stage, 'lazy is a boolean');
  if (typeof stage.version !== 'string' || typeof stage.inputsOf !== 'function' || typeof stage.run !== 'function') {
    refuse(stage, 'a stage carries its version, inputsOf and run (§14)');
  }
}

/**
 * Registers a stage in the base product's stage set (§4.1: "Each stage registers a StageDecl"): its declaration checked,
 * a second stage with the same id refused, and the set's order recomputed — a cycle in the declared inputs and outputs
 * is a registration error caught here, the registry left as it was (§4.1). The registry is the first argument, as for
 * `stageOrder(registry)` and `run(registry, …)` (C-0224 (1)).
 */
export function register(registry: StrategyRegistry, stage: PipelineStage): void {
  checkDecl(stage);
  const product = registry.products.get('base');
  if (product === undefined) throw new RegistrationError('register: the registry holds no base product (createRegistry makes it)');
  if (product.stages.some((s) => s.id === stage.id)) refuse(stage, 'a stage with this id is already registered');
  if (product.stages.length > MAX_RANK) refuse(stage, `more than ${String(MAX_RANK + 1)} stages have no u8 rank (§2.2)`);
  const order = kahn([...product.stages, stage], product.extraInputs);
  if (!order.ok) {
    throw new RegistrationError(`register: stage ${stageText(stage.id)} closes a cycle in the declared inputs and outputs: ${cycleText(order.cycle)} (§4.1)`, order.cycle.map((s) => stageText(s)));
  }
  product.stages.push(stage);
}
