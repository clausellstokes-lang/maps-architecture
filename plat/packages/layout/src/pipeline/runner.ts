// The runner (M0-x-02; §4.1 *The laziness contract*'s eager part, *Transactions*, the stage ranks; §14 `Stage`,
// `StageContext`, `Scope`; §6.1 the stage's streams and `StreamOpts.reroll`; §5.1 (1) "the pipeline has no restart
// path"; §5.1 (8) "nothing it wrote commits"; §5.4; C-0077, C-0090, C-0147, C-0224, C-0292 (N-55 (6))).
//
// `run(registry, blueprint, scope)` derives the base product once, eagerly, in `stageOrder(registry)`: for each stage in
// order `inputsOf(model, scope)` → `run(input, ctx)`, with a StageContext of its own — the arenas (`plats`), `stream`
// (one Rng per stage run, so a second request in the run returns the same continued stream, §6.1; keyed by the stage's
// id and the entity's cached key), `streamOpts` (epoch 0; the reroll of the entity's derivation unit, and for the town
// root the run option `rerolls`, C-0090), the tables, the rung, the report sink, epoch 0 — and the pipeline's doors
// (`batch`, `bind`, the digest; ./registry.ts). Each stage runs exactly once: a stage whose run is refused leaves its
// outputs unwritten, its arenas as they stood at its start and a bug entry in the report (§5.1 (8); N-55 (6), C-0292:
// the stage image — M0-a-06's before-image taken per arena before the stage runs, put back over the batches it
// committed, the level digests re-attached and the arena re-registered with the model digest), and the derivation goes
// on with the next stage — the runner has no loop back, no retry and no restart above a stage (§5.1 (1); its retries
// are the stage's own ladder, on its keyed streams). Lazy stages run eagerly too: the eager part of the laziness contract is the whole of M0 (the
// pool and the lazy tiers are M1's, §4b), and an eager run of a lazy stage gives the model the contract promises.
//
// The model a run returns: the data keys the stages wrote (the blueprint under 'blueprint' — S0's expansion is M1's, a
// fixture blueprint stands in), the arenas and the kernel over them, the model digest maintained along every commit
// (M0-d-04: its listener is the kernel's onCommit) with its root after each stage and at the end, the order and the
// stage ranks (§3.3: a stage's rank is its position in the order). Only scope `all` is built: a scoped re-derivation
// is the edit log's (M2a) and an epoch's is M4's, refused here by name (C-0224 (8)).
import {
  attachLevelDigests,
  concernRow,
  createHandleTable,
  createKernel,
  createRng,
  hasLevelDigests,
  idOfHandle,
  internId,
  restoreSavepoint,
  seedKey as seedKeyOf,
  sortedKeys,
  stageText,
  takeSavepoint,
  type CommitRecord,
  type ConcernId,
  type Hash128,
  type Handle,
  type Kernel,
  type KernelTx,
  type KeyCensus,
  type Plat,
  type PlatKey,
  type Savepoint,
  type SpineWidths,
  type StageId,
  type StreamOpts,
  type TxEnv,
} from '@plat/kernel';
import { mintTownRoot, ModelDigest, type DataKey, type Minted, type Rung, type Scope, type Seed } from '@plat/model';
import { TOWN_ROOT } from '@plat/site';
import { rungProfile, tableView, workLimitOf, type TableView } from '@plat/tables';
import { stageOrder } from './order.js';
import type { ModelView, PipelineContext, PipelineStage, StrategyRegistry } from './registry.js';
import { ReportBuilder, type GenerationReport } from './report.js';

/** The report's `outputVersion` at M0 (§5.4, §6.2's `G(outputVersion, base, log)`): the generator's M0 build. */
export const OUTPUT_VERSION = 'plat@M0';

/** The data key the blueprint is held under: S0's output, its expansion M1's (a fixture blueprint stands in). */
export const BLUEPRINT_KEY: DataKey = 'blueprint';

/** The part of §4.2 S0's Blueprint the runner reads: the seed and the rung. A fixture blueprint carries what its stages read. */
export interface RunBlueprint {
  readonly seed: Seed;
  readonly size: { readonly rung: Rung };
}

/** The run's options: harness-side (C-0090) and the arenas' services. */
export interface RunOptions {
  /**
   * Per-stage rerolls by stage name — `{ S5: 1 }` sets `StreamOpts.reroll` for that stage's town-root streams (§6.1, the
   * mixer keys stage and reroll together; C-0090: M0-d-09's re-derivation pairs). A name no stage of the order carries,
   * or a count that is no u16, is refused.
   */
  readonly rerolls?: Readonly<Record<string, number>>;
  /** The arenas the run's kernel holds, made for the blueprint (each under its own key); none by default. */
  readonly arenas?: (blueprint: RunBlueprint) => readonly Plat[];
  /** The transactions' injected services (class floors, checks, the repairer, the invariant suite); ranks and the digest listener are the runner's. */
  readonly env?: Omit<TxEnv, 'rankOf' | 'onCommit'>;
  /** The spines' width declarations `kerb` and `corridorUnion` read (§3.7; C-0212 (1)). */
  readonly spineWidths?: SpineWidths;
  /** The tables' view (default: every table, `tableView()`). */
  readonly tables?: TableView;
  /** The report's `outputVersion` (default OUTPUT_VERSION). */
  readonly outputVersion?: string;
  /** The distinctness harness every stage's Rng records into (§6.1; M0-d-09). */
  readonly census?: KeyCensus;
  /** A harness's view of every commit, after the runner ranked its faces: the stage's name and the commit record. */
  readonly observe?: (stage: string, record: CommitRecord) => void;
}

/** The model a run derives. */
export interface PipelineModel {
  /** Every data key a stage wrote, and the blueprint. */
  readonly data: ReadonlyMap<DataKey, unknown>;
  /** The arenas by `layer/part`. */
  readonly plats: ReadonlyMap<string, Plat>;
  readonly kernel: Kernel;
  readonly digest: ModelDigest;
  /** The model digest's root at the end of the run (§6.2). */
  readonly root: Hash128;
  /** The stages in the order they ran, by name. */
  readonly order: readonly string[];
  /** Each stage's rank (§3.3's kept content; its position in the order), by name. */
  readonly ranks: ReadonlyMap<string, number>;
  /** The model digest's root at each stage's end, by name. */
  readonly stageRoots: ReadonlyMap<string, Hash128>;
  /** The town root: its address, lineage and cached entity key (TOWN_ROOT's handle). */
  readonly town: Minted;
}

function notBuilt(milestone: string, what: string): never {
  throw new Error(`notBuilt('${milestone}'): ${what}`);
}

function platKeyText(k: PlatKey): string {
  return `${k.layer}/${String(k.part)}`;
}

/** The checked rerolls option: by stage id. */
function rerollsOf(option: Readonly<Record<string, number>> | undefined, names: ReadonlyMap<string, StageId>): Map<StageId, number> {
  const out = new Map<StageId, number>();
  if (option === undefined) return out;
  for (const name of sortedKeys(option)) {
    const id = names.get(name);
    if (id === undefined) throw new RangeError(`run: rerolls names '${name}', which is no stage of this run's order`);
    const n = option[name];
    if (!(Number.isInteger(n) && n >= 0 && n <= 0xffff)) throw new RangeError(`run: rerolls.${name} = ${String(n)} is no u16 reroll count (§6.1)`);
    out.set(id, n);
  }
  return out;
}

/** The model view a stage's inputsOf reads: its declared inputs (and the product's extra inputs for it) only. */
function viewFor(stage: PipelineStage, extra: readonly DataKey[], data: ReadonlyMap<DataKey, unknown>): ModelView {
  const declared = new Set<DataKey>([...stage.inputs, ...extra]);
  const check = (key: DataKey): void => {
    if (!declared.has(key)) throw new Error(`run: stage ${stageText(stage.id)} reads '${key}', which it does not declare as an input (§4.1)`);
  };
  return Object.freeze({
    get: (key: DataKey): unknown => {
      check(key);
      return data.get(key);
    },
    has: (key: DataKey): boolean => {
      check(key);
      return data.has(key);
    },
  });
}

/** Writes a stage's outputs: its declared keys it returned; a returned key it does not declare is a programming error. */
function writeOutputs(stage: PipelineStage, value: unknown, data: Map<DataKey, unknown>): void {
  if (value === undefined || value === null) return;
  if (typeof value !== 'object') throw new Error(`run: stage ${stageText(stage.id)} returned a ${typeof value}: a stage returns its outputs by data key`);
  const out = value as Record<string, unknown>;
  for (const key of sortedKeys(out)) {
    if (!stage.outputs.includes(key)) throw new Error(`run: stage ${stageText(stage.id)} returned '${key}', which it does not declare as an output (§4.1)`);
  }
  for (const key of stage.outputs) {
    if (Object.prototype.hasOwnProperty.call(out, key) && out[key] !== undefined) data.set(key, out[key]);
  }
}

/**
 * Puts a refused stage's arenas back as they stood when it began (§5.1 (8) "nothing it wrote commits", at the unit the
 * runner refuses; N-55 (6), C-0292 refining C-0224 (5)). Each arena whose version moved — a batch of the stage committed
 * on it (a rejected batch restores itself) — takes its stage image back: every table, slot counter, handle, the index
 * state and the version (M0-a-06's before-image, C-0185 (1), C-0287 (2)). Setting the version back would let a
 * maintained level-digest state that saw the rolled-back commits read as current again once later commits bring the
 * version back, with stale digests, so a maintained state is re-attached (rebuilt from the restored arena; C-0287 (2):
 * `addArena` alone attaches only when none is), and the arena is re-registered with the model digest (M0-d-04: its
 * `plats` node and the records that resolve in it are re-read). The report keeps the work, warnings and invariant
 * evaluations the rolled-back batches charged: they were spent.
 */
function rollBack(images: readonly Savepoint[], digest: ModelDigest): void {
  for (const image of images) {
    const p = image.plat;
    if (p.version === image.version) continue;
    const maintained = hasLevelDigests(p);
    restoreSavepoint(image);
    if (maintained) attachLevelDigests(p);
    digest.addArena(p);
  }
}

/** The codes a failed `expect` entry returns (§3.3 *Expectations*): a batch-scope hard row the batch did not hold. */
const EXPECT_CODES: ReadonlySet<string> = new Set(['E_INVARIANT', 'E_BELOW_MIN_WIDTH', 'E_BELOW_MIN_AREA', 'E_BELOW_MIN_ANGLE']);

/**
 * Derives the base product (§4.1, §14): every registered stage once, in Kahn's order, eagerly; returns the model and the
 * whole generation report (§5.4). `scope` is `{ kind: 'all' }` at M0.
 */
export function run(registry: StrategyRegistry, blueprint: RunBlueprint, scope: Scope, options: RunOptions = {}): { model: PipelineModel; report: GenerationReport } {
  if (scope.kind === 'epoch') notBuilt('M4', 'a run at an epoch (§4.11)');
  if (scope.kind !== 'all') notBuilt('M2a', `a scoped re-derivation (scope '${scope.kind}', §7.3)`);
  const order = stageOrder(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('run: the registry holds no base product');
  const byId = new Map<StageId, PipelineStage>(product.stages.map((s) => [s.id, s]));
  const ranks = new Map<StageId, number>(order.map((id, i) => [id, i]));
  const names = new Map<string, StageId>(order.map((id) => [stageText(id), id]));
  const rerolls = rerollsOf(options.rerolls, names);

  const tables = options.tables ?? tableView();
  const rung = rungProfile(blueprint.size.rung);
  const seedKey = seedKeyOf(blueprint.seed);
  const town = mintTownRoot(seedKey);

  // The derivation's handles (§14's `Handle`; C-0165 (6): TOWN_ROOT is the first address a derivation interns) and the
  // cached entity key each one names (C-0147).
  const handles = createHandleTable();
  if (internId(handles, town.identity.id) !== TOWN_ROOT) throw new Error('run: the town root must be the derivation\'s first handle (C-0165 (6))');
  const keys = new Map<Handle, { readonly key: Readonly<Hash128>; readonly reroll: number }>([[TOWN_ROOT, { key: town.entityKey, reroll: 0 }]]);
  const addressOf = (h: Handle): string => idOfHandle(handles, h);

  const digest = new ModelDigest();
  const arenas = options.arenas?.(blueprint) ?? [];
  const arenaMap = new Map<PlatKey, Plat>();
  const plats: Record<string, Plat> = {};
  const platsByName = new Map<string, Plat>();
  for (const p of arenas) {
    arenaMap.set(p.key, p);
    plats[platKeyText(p.key)] = p;
    platsByName.set(platKeyText(p.key), p);
    digest.addArena(p);
  }
  const env: TxEnv = { ...options.env, rankOf: (stage: StageId) => ranks.get(stage) ?? -1, onCommit: digest.listener };
  const kernel = createKernel(arenaMap, options.spineWidths === undefined ? { env } : { env, spineWidths: options.spineWidths });

  const data = new Map<DataKey, unknown>([[BLUEPRINT_KEY, blueprint]]);
  const builder = new ReportBuilder(options.outputVersion ?? OUTPUT_VERSION, { seed: blueprint.seed, rung: blueprint.size.rung }, addressOf);
  const stageRoots = new Map<string, Hash128>();

  // One forward pass over the order: each stage runs once (§5.1 (1): no restart path).
  for (const id of order) {
    const stage = byId.get(id) as PipelineStage;
    const name = stageText(id);
    const rank = ranks.get(id) as number;
    const state = builder.openStage(id, stage.workLimits.map((l) => l.counter), stage.invariants);
    const sink = builder.sinkFor(state, id);
    const rng = createRng(options.census === undefined ? {} : { census: options.census });
    const reads = new Set<string>(stage.streamKeys);
    const expect = stage.invariants.filter((r) => r.scope === 'batch' && r.class === 'hard');
    const keyOf = (entity: Handle): { readonly key: Readonly<Hash128>; readonly reroll: number } => {
      const k = keys.get(entity);
      if (k === undefined) throw new Error(`run: stage ${name} draws for handle ${String(entity)}, which no entity of this derivation is bound to (bind it first, C-0147)`);
      return k;
    };

    const ctx: PipelineContext = {
      doc: undefined,
      plats,
      stream: (concern: ConcernId, entity: Handle, opts: StreamOpts) => {
        const row = concernRow(concern);
        if (row === undefined || !reads.has(row.name)) {
          throw new Error(`run: stage ${name} draws concern ${row === undefined ? String(concern) : `'${row.name}'`}, which its streamKeys do not declare (§4.12, §6.1)`);
        }
        return rng.stream(keyOf(entity).key, id, concern, opts);
      },
      streamOpts: (_concern: ConcernId, entity: Handle, attempt = 0): StreamOpts => ({
        reroll: entity === TOWN_ROOT ? (rerolls.get(id) ?? 0) : keyOf(entity).reroll,
        attempt,
        epoch: 0,
        salt: 0,
      }),
      tables,
      rung,
      report: sink,
      scope,
      epoch: 0,
      kernel,
      seedKey,
      digest,
      bind: (entity: Minted): Handle => {
        const h = internId(handles, entity.identity.id);
        const had = keys.get(h);
        const key = entity.entityKey;
        if (had !== undefined && !(had.key[0] === key[0] && had.key[1] === key[1] && had.key[2] === key[2] && had.key[3] === key[3])) {
          throw new Error(`run: ${entity.identity.id} is bound to another entity key (C-0147: one key per minted entity)`);
        }
        if (had === undefined) keys.set(h, { key, reroll: entity.identity.reroll });
        return h;
      },
      batch: (spec, fn) => {
        const ops = spec.ops ?? [];
        if (fn !== undefined && ops.length > 0) throw new Error(`run: stage ${name}'s batch supplies an ops list and a callback: never both (§3.3 *Two op forms*)`);
        if (stage.txForm === 'declared' && fn !== undefined) throw new Error(`run: stage ${name} registered the declared op form: its batches pass ops, never a callback (§4.1)`);
        if (stage.txForm === 'callback' && (fn === undefined || spec.ops !== undefined)) throw new Error(`run: stage ${name} registered the callback form: its batches pass a callback, never ops (§4.1)`);
        const law = stage.workLimits.find((l) => l.counter === spec.counter);
        if (law === undefined) throw new Error(`run: stage ${name} declares no work-limit law '${spec.counter}' (§5.1 (5))`);
        const batch = spec.batch ?? stage.batch;
        const workLimit = workLimitOf(law, batch, spec.counts);
        const tx: KernelTx = {
          key: spec.key ?? { layer: 'ground', part: 0 },
          level: spec.level,
          ops: [...ops],
          expect,
          onFail: spec.onFail ?? 'reject',
          batch,
          stage: id,
          rederivesFrom: id,
          workLimit,
        };
        const r = kernel.tx(tx, fn);
        const failed = r.ok || !EXPECT_CODES.has(r.code) ? null : r.detail;
        for (const row of expect) builder.evaluate(state, row.name, failed === null || !failed.startsWith(`${row.name}: `));
        if (r.ok) {
          const rec = r.value.record;
          if (rec !== null) {
            // §3.3: every face records the rank of the stage whose batch created it (the kept-content input).
            const p = kernel.plat(rec.key);
            for (const lv of rec.faces) for (const f of lv.created) p.faces[lv.level].stage[f] = rank;
            builder.work(state, spec.counter, rec.work);
            builder.kernelWarnings(rec.warnings);
            options.observe?.(name, rec);
          }
        } else if (r.code === 'E_WORK_LIMIT') {
          builder.workLimitHit(state, spec.counter, workLimit);
        }
        return r;
      },
    };

    const input = stage.inputsOf(viewFor(stage, product.extraInputs.get(id) ?? [], data), scope);
    // The stage image (N-55 (6), C-0292): one before-image per arena, released at the stage's end.
    const images = arenas.map((p) => takeSavepoint(p));
    const r = stage.run(input, ctx);
    if (r.ok) {
      writeOutputs(stage, r.value, data);
      builder.kernelWarnings(r.warnings);
    } else {
      rollBack(images, digest);
      builder.stageRefused(state, r.code, town.identity.id);
    }
    for (const p of arenas) kernel.index.rebuildAtStageEnd(p.key);
    stageRoots.set(name, digest.stageEnd() ?? digest.finaliseRoot());
  }

  const model: PipelineModel = {
    data,
    plats: platsByName,
    kernel,
    digest,
    root: digest.finaliseRoot(),
    order: order.map((id) => stageText(id)),
    ranks: new Map(order.map((id, i) => [stageText(id), i])),
    stageRoots,
    town,
  };
  return { model, report: builder.finish() };
}
