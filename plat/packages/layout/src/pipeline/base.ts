// The base registration table (M0-x-04; §4.1 *Registration and order* — "the base's registrations yield exactly the
// order drawn above" — and the op form per stage, §4.12 StageDecl registration, §14 StrategyRegistry: the base registers
// 'base'; M0.md §5 item 25; C-0003, C-0020, C-0077, C-0095; readings C-0264).
//
// This is the one file that names every M0 stage. `registerBase(registry)` registers the base's strategies — S1's
// TerrainStrategy (`base`, M0-e-01, and the flat fixture's `flat`, C-0016) and RiverStrategy (`base`, M0-e-02), the
// EnceinteStrategy (`base`, M0-c-02), the NetworkStrategy's S4 part (`base`, M0-c-03) and the FabricStrategy
// (`bent-cut`, M0-b-03) — and the six stages M0 builds, each composed from the Stage its item exports:
//   S1  terrain (the registered TerrainStrategy) → water (the RiverStrategy) → S1's L0 batch (M0-e-03's `s1Stage`);
//   S3  the slice (M0-c-01) on the flat fixture's site with S1's terrain and water, and its commits (M0-c-02): the
//       border and the plaza as one declared batch, then stage 1's trace and strips — S5a's at k = 1 (C-0226 (2));
//   S4  M0-c-03's `s4Stage`;
//   S5  for each stage k = 1 … K in §4.1's order: k ≥ 2 S5a's boundary with S5b (`s5bStage`), S5a's trace (`s5aStage`);
//       every k S5c (`s5cStage`), its prune and trim, S5d (`s5dStage`) — M0-c-04's and M0-c-05's, under the one S5 id;
//   S6  M0-e-04's `s6Stage`, then its second half, the fields' pass 1 (M0-e-05's `fieldsPass1`);
//   S8  M0-b-03's `s8Stage` over S6's districts with their pass-1 values.
// Each registered stage keeps its item's declaration (id, op form, ladders, laws, invariants, budget, batch scope,
// lineage unit) and declares the data keys it reads and writes, so Kahn's sort over the set gives §4.1's drawn order
// S1, S3, S4, S5, S6, S8 (`BASE_ORDER`); the op form of every sub-stage is §4.1's (`BASE_OP_FORMS`). Every stage reaches
// the arena through the runner's façade, wrapped so each batch's op form is observed (`BaseBatch`).
//
// `runBase(blueprint, seed, scope)` is the integrated runner entry the harnesses call (C-0077): a fresh registry with
// the base registered, the ground arena over the blueprint's frame, M0-x-02's `run`. M0 builds the flat fixture and its
// river variant at CITY (`FLAT_BLUEPRINT`, `RIVER_BLUEPRINT`); S0's expansion — any other rung, population or aspect — is
// M1's and refused by name.
import { attachIndex, CONCERNS, createPlat, err, faceRings, handleOf, idOf, isFaceLive, compareFaces, ok, ratio, stageText, STAGES, type Committed, type Hash128, type Kernel, type KernelError, type KernelResult, type KernelTx, type LatticePoint, type Overlay, type Plat, type Seed, type StageId, type Warning } from '@plat/kernel';
import { mintTownRoot, type DataKey, type District, type Gate, type Id, type Invariant, type Ladder, type Rung, type Scope, type StageContext, type Terrain, type WaterSet, type Way, type WorkLimitLaw } from '@plat/model';
import { baseTerrain, cellCount, flatTerrain, GROUND_KEY, hydroGridOver, hydroParams, rasterGeom, riverStrategy, s1Stage, siteFrame, terrainParams, TERRAIN_ID, TOWN_ROOT, type RiverReport, type RiverRequest, type RiverStrategy, type S1Output, type SiteRequest, type TerrainBlueprint, type TerrainStrategy } from '@plat/site';
import { loadWorkLimits, rungProfile, tableView, workLimitOf, type BaseRung, type TableView, type WorkLimitsTable } from '@plat/tables';
import { baseNetwork, NETWORK_STRATEGY_ID, s4Stage, type S4Output } from '../backbone/stage.js';
import { s6Stage, siteFeatures, type S6Input } from '../districts/stage.js';
import type { S6Output, WallLine } from '../districts/types.js';
import { commitS3Slice, type S3Commit } from '../enceinte/commit.js';
import { baseEnceinte, ENCEINTE_STRATEGY_ID } from '../enceinte/trace.js';
import { fieldDriverSources, fieldFaces } from '../fields/sources.js';
import { fieldsPass1, type FieldsPass1 } from '../fields/pass1.js';
import { fieldsOwnTable } from '../fields/table.js';
import type { ScalarField } from '../fields/types.js';
import { flatFixture } from '../fixtures/flat.js';
import { s5dStage, type S5dRecord } from '../growth/capacity.js';
import { growthStart, s5aStage, s5bStage, type GrowthState } from '../growth/mainRoads.js';
import { s5cStage, type S5cRecord } from '../growth/proposals.js';
import { pruneAndTrim, type PruneRecord } from '../growth/prune.js';
import { BentCutFabric, BENT_CUT } from '../infill/bentCutFabric.js';
import { s8Stage, type S8District, type S8Input } from '../infill/stage.js';
import { insideRing } from '../siting/geom.js';
import { s3Slice } from '../siting/slice.js';
import type { DeckSegment, S3Slice, Site, WaterPlan } from '../siting/types.js';
import { createRegistry, register, type ModelView, type PipelineContext, type PipelineStage, type StrategyRegistry } from './registry.js';
import { run, type RunBlueprint, type RunOptions } from './runner.js';
import type { GenerationReport } from './report.js';
import type { PipelineModel } from './runner.js';

// ---- the table ------------------------------------------------------------------------------------------------------------

/** §4.1's drawn order of the stages M0 builds (M0-work.json's test: S1, S3, S4, S5, S6, S8). */
export const BASE_ORDER: readonly string[] = Object.freeze(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);

/** A sub-stage of the base table: a registered stage, or one of S5's four steps (§4.1: each stage k runs S5a – S5d). */
export type BaseSubStage = 'S1' | 'S3' | 'S4' | 'S5a' | 'S5b' | 'S5c' | 'S5d' | 'S6' | 'S8';

/**
 * §4.1's op form per stage as M0.md §5 item 25 states it: callback for S5c and S8; declared for S3's slice, S4, S5a,
 * S5b; S1 and S6 callback ("always safe").
 */
export const BASE_OP_FORMS: ReadonlyMap<BaseSubStage, 'declared' | 'callback'> = new Map([
  ['S1', 'callback'],
  ['S3', 'declared'],
  ['S4', 'declared'],
  ['S5a', 'declared'],
  ['S5b', 'declared'],
  ['S5c', 'callback'],
  ['S5d', 'callback'],
  ['S6', 'callback'],
  ['S8', 'callback'],
]);

/** One row of the base table: a sub-stage, the stage it registers under, the op form its item declares and its items. */
export interface BaseRow {
  readonly sub: BaseSubStage;
  readonly stage: string;
  readonly txForm: 'declared' | 'callback';
  readonly items: readonly string[];
}

/**
 * The base table (C-0077): every sub-stage with the op form its item's exported Stage declares (S3's slice exports no
 * Stage: the form its commit takes, one declared batch). S5's four register together under the one S5 id (C-0244 (11)).
 */
export function baseTable(): readonly BaseRow[] {
  return Object.freeze([
    { sub: 'S1', stage: 'S1', txForm: s1Stage().txForm, items: ['M0-e-01', 'M0-e-02', 'M0-e-03'] },
    { sub: 'S3', stage: 'S3', txForm: 'declared', items: ['M0-c-01', 'M0-c-02'] },
    { sub: 'S4', stage: 'S4', txForm: s4Stage().txForm, items: ['M0-c-03'] },
    { sub: 'S5a', stage: 'S5', txForm: s5aStage(2).txForm, items: ['M0-c-04'] },
    { sub: 'S5b', stage: 'S5', txForm: s5bStage(2).txForm, items: ['M0-c-04'] },
    { sub: 'S5c', stage: 'S5', txForm: s5cStage(1).txForm, items: ['M0-c-05'] },
    { sub: 'S5d', stage: 'S5', txForm: s5dStage(1).txForm, items: ['M0-c-05'] },
    { sub: 'S6', stage: 'S6', txForm: s6Stage().txForm, items: ['M0-e-04', 'M0-e-05'] },
    { sub: 'S8', stage: 'S8', txForm: s8Stage().txForm, items: ['M0-b-03'] },
  ] as BaseRow[]);
}

/** One batch a base stage sent through the façade, as observed: its sub-stage, op form, level and `KernelTx.stage`. */
export interface BaseBatch {
  /** The registered stage that was running. */
  readonly stage: string;
  /** The sub-stage (a batch at S5's id inside S3 is S5a's at k = 1, §4.1's S5 row). */
  readonly sub: BaseSubStage;
  /** S5's stage k (0 outside S5's own loop; 1 for S3's trace and strips). */
  readonly k: number;
  readonly form: 'declared' | 'callback';
  readonly level: number;
  /** `KernelTx.stage`, by name. */
  readonly txStage: string;
  /** The batch committed (a refusal, or a batch that wrote nothing, is false). */
  readonly committed: boolean;
}

/** registerBase's options: a watcher of every batch (a harness's or a test's). */
export interface BaseOptions {
  readonly onBatch?: (batch: BaseBatch) => void;
  /** The work-limit table the runner evaluates S1 (3)'s `hydro.cells` law from (default the shipped one; C-0173 (8)). */
  readonly workLimits?: WorkLimitsTable;
}

// ---- the blueprint --------------------------------------------------------------------------------------------------------

/**
 * The part of §4.2 S0's Blueprint the base reads at M0 (S0's expansion is M1's; a fixture blueprint stands in): the size
 * (the rung, and the frame's area), the site request with its river, the registered TerrainStrategy and RiverStrategy
 * by name (default `base`), and the walled land the stages share (default §12.2's CITY 220 ha, C-0016).
 */
export interface BaseBlueprint {
  readonly size: { readonly rung: Rung; readonly areaHa?: number; readonly aspect?: number; readonly population?: number };
  readonly site: SiteRequest & { readonly river?: RiverRequest | null };
  readonly terrain?: string;
  readonly river?: string;
  readonly walledHa?: number;
}

/** The blueprint as the runner holds it (under 'blueprint'): the base blueprint and the run's seed. */
export type BaseRunBlueprint = BaseBlueprint & RunBlueprint;

/** The flat fixture (M0-c-01, C-0016): CITY, a square 25 km² frame, flat terrain, no water. */
export const FLAT_BLUEPRINT: BaseBlueprint = Object.freeze({ size: Object.freeze({ rung: 'CITY' as Rung, aspect: 1 }), site: Object.freeze({ relief: 'plain' as const, river: null }), terrain: 'flat' });

/**
 * The river fixture: the flat fixture's site with a river (§4.2 S1 (3)) arriving from the west on the base terrain's
 * plain relief, no mouth (C-0264 (4)).
 */
export const RIVER_BLUEPRINT: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY' as Rung, aspect: 1 }),
  site: Object.freeze({ relief: 'plain' as const, river: Object.freeze({ inflowBearingCdeg: 27_000, mouth: 'none' as const }) }),
  terrain: 'base',
});

/** Refuses what M0 does not build: a rung other than CITY, a population, an aspect other than 1 (S0's expansion, M1). */
export function checkBaseBlueprint(bp: BaseBlueprint): void {
  if (bp.size.rung !== 'CITY') throw new RangeError(`runBase: notBuilt('M1'): the rung ${String(bp.size.rung)} — M0 builds the flat fixture and its river at CITY (S0's expansion, §4.2 S0; C-0264 (3))`);
  if (bp.size.population !== undefined) throw new RangeError("runBase: notBuilt('M1'): a population — the frame follows the rung's target at M0 (S0's expansion; C-0264 (3))");
  if (bp.size.aspect !== undefined && bp.size.aspect !== 1) throw new RangeError("runBase: notBuilt('M1'): an aspect other than 1 — the flat fixture's frame is square (C-0016; C-0264 (3))");
}

// ---- the strategies -------------------------------------------------------------------------------------------------------

/** The flat fixture's TerrainStrategy (C-0016): the base frame law's frame and a constant height of 0 (no draw). */
export const flatTerrainStrategy: TerrainStrategy = Object.freeze({
  terrain(bp: TerrainBlueprint, ctx: StageContext<never>, _k: unknown): KernelResult<Terrain> {
    const c = ctx as unknown as { rung: ReturnType<typeof rungProfile>; tables: TableView; epoch: number };
    const rung = c.rung.rung as BaseRung;
    const frame = siteFrame(bp.size, c.rung, c.tables);
    if (!frame.ok) return err(frame.code, frame.detail);
    return flatTerrain({ id: TERRAIN_ID, key: GROUND_KEY, frame: frame.value, params: terrainParams(c.tables, rung), epoch: c.epoch }, 0, 0);
  },
}) as TerrainStrategy;

/**
 * S1 (3)'s F-WORK limit (C-0173 (8): "the runner, M0-x-04, evaluates and passes it"): `hydro.cells`' law over the
 * hydrology grid the river stage builds — the terrain raster's extent (frame + margin) at the rung's hydrology cell.
 */
export function hydroCellsLimit(terrain: Terrain, tables: TableView, rung: BaseRung, wl: WorkLimitsTable = loadWorkLimits()): number {
  const grid = hydroGridOver(rasterGeom(terrain), hydroParams(tables, rung).hydroCellCm);
  return workLimitOf(wl.law('hydro.cells'), { kind: 'stage', stage: STAGES.S1 as StageId }, { frameCells: cellCount(grid) });
}

/** The river report's rows forwarded to the runner's sink (§5.4): each ladder use on the town root's `water.river`, each request. */
function forwardRiverReport(report: RiverReport, ctx: PipelineContext): void {
  const concern = CONCERNS['water.river'];
  for (const u of report.ladderUses) {
    const opts = ctx.streamOpts(concern, TOWN_ROOT, u.name === 'inlet' ? u.value : 0);
    ctx.report.ladderUse({ cause: u.cause, ...(u.code === undefined ? {} : { code: u.code }), rung: u.rung, tier: u.tier, entity: TOWN_ROOT, concern, opts });
  }
  for (const q of report.requested) ctx.report.requested({ ...q });
}

/**
 * The base RiverStrategy as the runner configures it (C-0173 (8)): M0-e-02's `riverStrategy` with the `hydro.cells`
 * limit evaluated for the run's terrain and its report through the runner's sink (R12-5's switch off, its default).
 * Registered as `base`; the run's report is kept on S1's record (`s1.river`).
 */
export function baseRiverStrategy(wl: WorkLimitsTable = loadWorkLimits(), onReport?: (r: RiverReport) => void): RiverStrategy {
  return Object.freeze({
    rivers(bp, terrain, water, ctx, k) {
      const c = ctx as unknown as PipelineContext;
      const limit = hydroCellsLimit(terrain, ctx.tables, ctx.rung.rung as BaseRung, wl);
      const s = riverStrategy({
        hydroCellsLimit: limit,
        onReport: (report) => {
          if (typeof c.report === 'object' && c.report !== null) forwardRiverReport(report, c);
          onReport?.(report);
        },
      });
      return s.rivers(bp, terrain, water, ctx, k);
    },
  } satisfies RiverStrategy);
}

/** The base's strategies by name (§4.12: every caller resolves the registered one). */
function registerStrategies(registry: StrategyRegistry, opts: BaseOptions, rivers: RiverReport[]): void {
  registry.terrain.set('base', baseTerrain);
  registry.terrain.set('flat', flatTerrainStrategy);
  registry.river.set('base', baseRiverStrategy(opts.workLimits, (r) => rivers.push(r)));
  registry.enceinte.set(ENCEINTE_STRATEGY_ID, baseEnceinte);
  registry.network.set(NETWORK_STRATEGY_ID, baseNetwork);
  registry.fabric.set(BENT_CUT, BentCutFabric);
}

// ---- the façade watch -----------------------------------------------------------------------------------------------------

/** The sub-stage a stage is in, read by the façade watch at each batch. */
interface Cursor {
  stage: string;
  sub: BaseSubStage;
  k: number;
}

/**
 * The runner's façade with its `tx` observed: each batch's op form (callback when a function is passed, else declared),
 * its level, its `KernelTx.stage` and its outcome, attributed to the cursor's sub-stage — a batch at S5's id inside S3 is
 * S5a's at k = 1 (§4.1's S5 row). Every other member is the façade's own.
 */
function watched(kernel: Kernel, cursor: Cursor, onBatch: ((b: BaseBatch) => void) | undefined): Kernel {
  if (onBatch === undefined) return kernel;
  const tx = <T>(spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>> => {
    const r = kernel.tx(spec, fn);
    const txStage = stageText(spec.stage);
    const sub: BaseSubStage = cursor.stage === 'S3' && txStage === 'S5' ? 'S5a' : cursor.sub;
    onBatch({ stage: cursor.stage, sub, k: cursor.stage === 'S3' && txStage === 'S5' ? 1 : cursor.k, form: fn === undefined ? 'declared' : 'callback', level: spec.level, txStage, committed: r.ok && r.value.record !== null });
    return r;
  };
  return Object.freeze({ ...kernel, tx }) as Kernel;
}

// ---- the stages' records --------------------------------------------------------------------------------------------------

/** S1's record (data key `s1`): the L0 batch's output and the river stage's report (null for a strategy that gives none). */
export type S1Record = S1Output & { readonly river: RiverReport | null };

/** S5's record (data key `s5`): per stage k, S5c's record, its prune and trim, and S5d's record. */
export interface S5Record {
  readonly growth: readonly S5cRecord[];
  readonly prune: readonly PruneRecord[];
  readonly capacity: readonly S5dRecord[];
}

/** The fields' pass 1 under the data key `fields` (S6's second half). */
export type FieldsRecord = FieldsPass1;

const GROUND = GROUND_KEY;

function strs(...lists: (readonly string[])[]): string[] {
  const out: string[] = [];
  for (const l of lists) for (const s of l) if (!out.includes(s)) out.push(s);
  return out;
}

function lawsOf(...lists: (readonly WorkLimitLaw[])[]): WorkLimitLaw[] {
  const out: WorkLimitLaw[] = [];
  for (const l of lists) for (const law of l) if (!out.some((x) => x.counter === law.counter)) out.push(law);
  return out;
}

function laddersOf(...lists: Ladder[]): Ladder {
  const out: { failureClass: string; rungs: string[] }[] = [];
  for (const l of lists) {
    for (const row of l) {
      const at = out.find((x) => x.failureClass === row.failureClass);
      if (at === undefined) out.push({ failureClass: row.failureClass, rungs: [...row.rungs] });
      else for (const r of row.rungs) if (!at.rungs.includes(r)) at.rungs.push(r);
    }
  }
  return out as unknown as Ladder;
}

/** A refusal passed on without its partial value (the stage's own record is not written, §5.1 (8)). */
function refused(r: { readonly code: KernelError; readonly detail: string }): KernelResult<never> {
  return err(r.code, r.detail);
}

/** A view's value, typed. */
function read<T>(model: ModelView, key: DataKey): T | undefined {
  return model.get(key) as T | undefined;
}

/** The faces of `level` an entity owns, as their outer rings, in canonical face order. */
function ownedOuterRings(p: Plat, level: 0 | 1, owner: Id): LatticePoint[][] {
  const h = handleOf(p, owner);
  if (h < 0) return [];
  const faces: number[] = [];
  for (let f = 0; f < p.slots.face[level].top; f += 1) if (isFaceLive(p, level, f) && p.faces[level].owner[f] === h) faces.push(f);
  faces.sort((a, b) => compareFaces(p, level, a, b));
  return faces.map((f) => faceRings(p, level, f)[0]);
}

/**
 * The planned water S3's lattice reads (§4.2 S3 (2), (3); C-0076), from S1's committed water: each body's L0 faces'
 * outer rings, and each crossing site's deck as its two `deck_end` vertices where the arena placed them.
 */
export function waterPlanOf(k: Kernel, water: WaterSet): KernelResult<WaterPlan> {
  const p = k.plat(GROUND);
  const faces: LatticePoint[][] = [];
  for (const b of water.bodies) faces.push(...ownedOuterRings(p, 0, b.id));
  const decks: DeckSegment[] = [];
  for (const b of water.bridges) {
    const ends: LatticePoint[] = [];
    for (const ref of b.deck) {
      const r = k.resolve(ref, GROUND);
      if (r.view !== 'vertices' || r.vertices.length !== 1) return err('E_INVARIANT', `base: the deck end ${ref.role}/${ref.entity}/${String(ref.ordinal ?? 0)} of ${b.id} resolves to no single vertex`);
      const v = r.vertices[0];
      ends.push({ x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint);
    }
    decks.push({ id: b.id, a: ends[0], b: ends[1] });
  }
  return ok({ faces, decks });
}

// ---- S1 -------------------------------------------------------------------------------------------------------------------

interface S1In {
  readonly bp: BaseRunBlueprint;
}

function stageS1(registry: StrategyRegistry, opts: BaseOptions, riverReports: RiverReport[]): PipelineStage<S1In | null, Record<string, unknown>> {
  const item = s1Stage();
  return Object.freeze({
    ...declOf(item),
    inputs: ['blueprint'],
    outputs: ['terrain', 'water', 's1'],
    streamKeys: strs(item.streamKeys, ['terrain.noise', 'water.river']),
    inputsOf(model: ModelView, _scope: Scope): S1In | null {
      const bp = read<BaseRunBlueprint>(model, 'blueprint');
      return bp === undefined ? null : { bp };
    },
    run(input: S1In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const cursor: Cursor = { stage: 'S1', sub: 'S1', k: 0 };
      const k = watched(ctx.kernel, cursor, opts.onBatch);
      const terrainName = input.bp.terrain ?? 'base';
      const strategy = registry.terrain.get(terrainName);
      if (strategy === undefined) return err('E_INVARIANT', `S1: no TerrainStrategy is registered as '${terrainName}'`);
      const rivers = registry.river.get(input.bp.river ?? 'base');
      if (rivers === undefined) return err('E_INVARIANT', `S1: no RiverStrategy is registered as '${input.bp.river ?? 'base'}'`);
      const sctx = ctx as unknown as StageContext<never>;
      const terrain = strategy.terrain({ size: input.bp.size, site: input.bp.site }, sctx, k as never);
      if (!terrain.ok) return refused(terrain);
      const river = input.bp.site.river ?? null;
      const before = riverReports.length;
      const water = rivers.rivers({ size: input.bp.size, site: { river } }, terrain.value, { bodies: [], bridges: [] }, sctx, k as never);
      if (!water.ok) return refused(water);
      const s1 = item.run(item.inputsOf({ terrain: terrain.value, water: water.value, ...(river?.mouth === undefined ? {} : { mouth: river.mouth }), kernel: k } as never, { kind: 'all' }), sctx);
      if (!s1.ok) return refused(s1);
      const record: S1Record = { ...s1.value, river: riverReports.length > before ? (riverReports[riverReports.length - 1] as RiverReport) : null };
      return ok({ terrain: s1.value.terrain, water: s1.value.water, s1: record }, [...terrain.warnings, ...water.warnings, ...s1.warnings]);
    },
  }) as PipelineStage<S1In | null, Record<string, unknown>>;
}

// ---- S3 -------------------------------------------------------------------------------------------------------------------

interface S3In {
  readonly bp: BaseRunBlueprint;
  readonly terrain: Terrain;
  readonly water: WaterSet;
}

/** S3's record (data key `s3`): the site it sited on (the flat fixture's, with S1's terrain and water). */
export interface S3Record {
  readonly site: Site;
}

/**
 * The site S3 reads (C-0264 (2)): M0-c-01's flat fixture at the run's seed — its frame, land, nucleus and town key —
 * with S1's terrain and the water S1 committed, its town key the runner's town root and its draws through the runner's
 * streams (the town root under S3).
 */
export function baseSite(bp: BaseRunBlueprint, terrain: Terrain, water: WaterPlan, ctx: Pick<PipelineContext, 'stream' | 'streamOpts' | 'tables' | 'seedKey'>): Site {
  const fixture = flatFixture(bp.seed, { ...(bp.size.areaHa === undefined ? {} : { frameAreaHa: bp.size.areaHa }), ...(bp.walledHa === undefined ? {} : { walledHa: bp.walledHa }), water, tables: ctx.tables });
  return {
    ...fixture,
    terrain,
    // §6.1: the town root's entity key, as the runner keys every town-root draw (mintTownRoot, C-0165 (6)) — every reader
    // of the site's key draws under the same root as the stages' streams (C-0264 (3)).
    townKey: [...mintTownRoot(ctx.seedKey).entityKey] as Hash128,
    stream: (concern, attempt = 0) => ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT, attempt)),
  };
}

function stageS3(opts: BaseOptions): PipelineStage<S3In | null, Record<string, unknown>> {
  return Object.freeze({
    id: STAGES.S3 as StageId,
    version: '1',
    inputs: ['blueprint', 'terrain', 'water', 's1'],
    outputs: ['s3', 's3.slice', 's3.commit', 'reservations', 'enceintes', 'gates'],
    streamKeys: ['reserve.plaza', 'route', 'gate.pick'],
    invariants: [] as Invariant[],
    ladder: [
      { failureClass: 'F-WALL', rungs: ['redraw', 'drop', 'reroute', 'reoffset', 'union_simplify'] },
      { failureClass: 'F-ROUTE', rungs: ['unserved'] },
    ] as unknown as Ladder,
    workLimits: lawsOf(s4Stage().workLimits.filter((l) => l.counter === 'route.nodes')),
    budgetMs: s4Stage().budgetMs,
    batch: { kind: 'stage' as const, stage: STAGES.S3 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'declared' as const,
    inputsOf(model: ModelView, _scope: Scope): S3In | null {
      const bp = read<BaseRunBlueprint>(model, 'blueprint');
      const terrain = read<Terrain>(model, 'terrain');
      const water = read<WaterSet>(model, 'water');
      return bp === undefined || terrain === undefined || water === undefined ? null : { bp, terrain, water };
    },
    run(input: S3In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const cursor: Cursor = { stage: 'S3', sub: 'S3', k: 0 };
      const k = watched(ctx.kernel, cursor, opts.onBatch);
      const plan = waterPlanOf(k, input.water);
      if (!plan.ok) return refused(plan);
      const site = baseSite(input.bp, input.terrain, plan.value, ctx);
      const slice = s3Slice(site);
      // S1 laid the outer ring and the water (§4.1's S1 row): the commits find them present.
      const commit = commitS3Slice(slice, k, { outerRing: 'present', water: input.water, key: GROUND });
      if (!commit.ok) return refused(commit);
      const c = commit.value;
      return ok({ s3: { site } satisfies S3Record, 's3.slice': slice, 's3.commit': c, reservations: [c.plaza], enceintes: [c.enceinte], gates: c.gates.slice() }, commit.warnings);
    },
  }) as PipelineStage<S3In | null, Record<string, unknown>>;
}

// ---- S4 -------------------------------------------------------------------------------------------------------------------

interface S4In {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly water: WaterSet;
}

function stageS4(opts: BaseOptions): PipelineStage<S4In | null, Record<string, unknown>> {
  const item = s4Stage();
  return Object.freeze({
    ...declOf(item),
    inputs: strs(item.inputs, ['s3.slice', 's3.commit', 'water']),
    outputs: strs(item.outputs, ['s4']),
    inputsOf(model: ModelView, _scope: Scope): S4In | null {
      const slice = read<S3Slice>(model, 's3.slice');
      const commit = read<S3Commit>(model, 's3.commit');
      const water = read<WaterSet>(model, 'water');
      return slice === undefined || commit === undefined || water === undefined ? null : { slice, commit, water };
    },
    run(input: S4In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const k = watched(ctx.kernel, { stage: 'S4', sub: 'S4', k: 0 }, opts.onBatch);
      const r = item.run(item.inputsOf({ slice: input.slice, commit: input.commit, water: input.water, kernel: k } as never, { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      const s4: S4Output = r.value;
      return ok({ s4, ways: s4.network.ways, junctions: s4.network.junctions, bridges: s4.bridges, gates: s4.gates }, r.warnings);
    },
  }) as PipelineStage<S4In | null, Record<string, unknown>>;
}

// ---- S5 -------------------------------------------------------------------------------------------------------------------

interface S5In {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly s4: S4Output;
  readonly water: WaterSet;
}

function stageS5(opts: BaseOptions): PipelineStage<S5In | null, Record<string, unknown>> {
  const [a, b, c, d] = [s5aStage(2), s5bStage(2), s5cStage(1), s5dStage(1)];
  return Object.freeze({
    id: STAGES.S5 as StageId,
    version: a.version,
    inputs: strs(['s3.slice', 's3.commit', 's4', 'water'], b.inputs, a.inputs, c.inputs, d.inputs),
    outputs: strs(b.outputs, a.outputs, c.outputs, d.outputs, ['s5']),
    streamKeys: strs(b.streamKeys, a.streamKeys, c.streamKeys, d.streamKeys),
    invariants: [] as Invariant[],
    ladder: laddersOf(b.ladder, a.ladder, c.ladder, d.ladder),
    workLimits: lawsOf(b.workLimits, a.workLimits, c.workLimits, d.workLimits),
    budgetMs: b.budgetMs,
    batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId },
    lineageUnit: b.lineageUnit,
    lazy: false,
    // The one S5 id carries four op forms (C-0264 (1)): the registered stage is callback, "which is always safe" (§4.1);
    // each sub-stage's batches keep its own form (BASE_OP_FORMS).
    txForm: 'callback' as const,
    inputsOf(model: ModelView, _scope: Scope): S5In | null {
      const slice = read<S3Slice>(model, 's3.slice');
      const commit = read<S3Commit>(model, 's3.commit');
      const s4 = read<S4Output>(model, 's4');
      const water = read<WaterSet>(model, 'water');
      return slice === undefined || commit === undefined || s4 === undefined || water === undefined ? null : { slice, commit, s4, water };
    },
    run(input: S5In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const cursor: Cursor = { stage: 'S5', sub: 'S5a', k: 1 };
      const kernel = watched(ctx.kernel, cursor, opts.onBatch);
      const state = growthStart({ slice: input.slice, commit: input.commit, s4: input.s4, kernel, water: input.water, key: GROUND });
      const sctx = ctx as never;
      const K = input.slice.site.land.stagesHa.length;
      const growth: S5cRecord[] = [];
      const prune: PruneRecord[] = [];
      const capacity: S5dRecord[] = [];
      const warnings: Warning[] = [];
      const step = <T>(sub: BaseSubStage, k: number, f: () => KernelResult<T>): KernelResult<T> => {
        cursor.sub = sub;
        cursor.k = k;
        const r = f();
        if (r.ok) warnings.push(...r.warnings);
        return r;
      };
      for (let k = 1; k <= K; k += 1) {
        if (k >= 2) {
          const sb = s5bStage(k);
          const m = step('S5b', k, () => sb.run(sb.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!m.ok) return refused(m);
          const sa = s5aStage(k);
          const t = step('S5a', k, () => sa.run(sa.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!t.ok) return refused(t);
        }
        const sc = s5cStage(k);
        const g = step('S5c', k, () => sc.run(sc.inputsOf({ growth: state }, { kind: 'all' }), sctx));
        if (!g.ok) return refused(g);
        growth.push(g.value);
        const pr = step('S5c', k, () => pruneAndTrim({ state, k, record: g.value }));
        if (!pr.ok) return refused(pr);
        prune.push(pr.value);
        const sd = s5dStage(k);
        const cap = step('S5d', k, () => sd.run(sd.inputsOf({ growth: state }, { kind: 'all' }), sctx));
        if (!cap.ok) return refused(cap);
        capacity.push(cap.value);
      }
      const enceintes = [input.commit.enceinte, ...state.stages.flatMap((st) => (st.trace === null ? [] : [st.trace.enceinte]))];
      const gates = state.stages.flatMap((st) => st.gates);
      const s5: S5Record = { growth, prune, capacity };
      return ok({ 's5.growth': state, s5, ways: state.ways.slice(), junctions: state.junctions.slice(), enceintes, gates }, warnings);
    },
  }) as PipelineStage<S5In | null, Record<string, unknown>>;
}

// ---- S6 and the fields' pass 1 ---------------------------------------------------------------------------------------------

interface S6In {
  readonly bp: BaseRunBlueprint;
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly state: GrowthState;
  readonly water: WaterSet;
  readonly terrain: Terrain;
}

/** The stages' outlines k = 1 … K (a folded stage's is the stage before's), the last with land's, and the wall lines. */
function growthOutlines(state: GrowthState, commit: S3Commit): { outlines: LatticePoint[][]; boundary: LatticePoint[]; walls: WallLine[] } | null {
  const outlines: LatticePoint[][] = [];
  for (const st of state.stages) {
    if (st.boundary !== null) outlines.push(st.boundary.set.outline.slice());
    else if (outlines.length > 0) outlines.push(outlines[outlines.length - 1].slice());
  }
  const last = state.stages[state.lastWithLand - 1]?.boundary ?? null;
  if (last === null) return null;
  const walls: WallLine[] = state.stages.filter((st) => st.wall !== null).map((st) => ({ enceinte: st.trace === null ? commit.enceinte.id : st.trace.enceinte.id, line: (st.wall as LatticePoint[]).slice() }));
  return { outlines, boundary: last.set.outline.slice(), walls };
}

/** S6's input as the base composes it from S3's, S4's and S5's records (C-0264 (5)). */
export function baseS6Input(input: S6In, kernel: Kernel, ctx: Pick<PipelineContext, 'seedKey' | 'streamOpts'>): KernelResult<S6Input> {
  const o = growthOutlines(input.state, input.commit);
  if (o === null) return err('E_INVARIANT', 'S6: S5 left no stage with land: no last boundary to offset the perimeter from');
  const p = kernel.plat(GROUND);
  const ways: Way[] = input.state.ways.slice();
  const gates: Gate[] = input.state.stages.flatMap((st) => st.gates);
  const reservations = [input.commit.plaza];
  const features = siteFeatures(p, { reservations, gates, bridges: input.water.bridges, ways, water: input.water, walls: o.walls });
  return ok({
    kernel,
    key: GROUND,
    seedKey: ctx.seedKey,
    epoch: 0,
    reroll: ctx.streamOpts(CONCERNS['district.seed'], TOWN_ROOT).reroll,
    rung: input.slice.site.rung,
    boundary: o.boundary,
    frame: input.slice.site.frameRing,
    stageBoundaries: o.outlines,
    ways,
    features,
    reservations,
    walls: o.walls,
    water: input.water,
  });
}

/** The warning S6's refusal carries when S5's land holds no claimable face (C-0264 (9)): the report keeps the cause. */
export const W_LAND_UNCLAIMED = 'W_LAND_UNCLAIMED';

/** The owners of the live L1 faces whose centroid lies inside `ring` and which name an S1 land component (`land:<n>`). */
function landOwnersInside(p: Plat, ring: readonly LatticePoint[]): string[] {
  const out = new Set<string>();
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    const h = p.faces[1].owner[f];
    if (h < 0) continue;
    const id = idOf(p, h);
    if (!id.startsWith('land:')) continue;
    const r = faceRings(p, 1, f)[0];
    if (r.length > 0 && insideRing(ring, r[0])) out.add(id);
  }
  return [...out].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function stageS6(opts: BaseOptions): PipelineStage<S6In | null, Record<string, unknown>> {
  const item = s6Stage();
  return Object.freeze({
    ...declOf(item),
    inputs: strs(item.inputs, ['blueprint', 'terrain', 's3.slice', 's3.commit', 's5.growth']),
    outputs: strs(item.outputs, ['fieldBands', 'fields', 's6']),
    streamKeys: strs(item.streamKeys, ['field.chance']),
    inputsOf(model: ModelView, _scope: Scope): S6In | null {
      const bp = read<BaseRunBlueprint>(model, 'blueprint');
      const slice = read<S3Slice>(model, 's3.slice');
      const commit = read<S3Commit>(model, 's3.commit');
      const state = read<GrowthState>(model, 's5.growth');
      const water = read<WaterSet>(model, 'water');
      const terrain = read<Terrain>(model, 'terrain');
      if (bp === undefined || slice === undefined || commit === undefined || state === undefined || water === undefined || terrain === undefined) return null;
      return { bp, slice, commit, state, water, terrain };
    },
    run(input: S6In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const k = watched(ctx.kernel, { stage: 'S6', sub: 'S6', k: 0 }, opts.onBatch);
      const s6in = baseS6Input(input, k, ctx);
      if (!s6in.ok) return refused(s6in);
      const r = item.run(item.inputsOf(s6in.value, { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      const s6: S6Output = r.value;
      // Detect and refuse (C-0264 (9)): S5's last boundary holds land, so a perimeter around it that claims none is a
      // contract between S1 and S6 failing — S1's land components own every L0 land face (C-0229 (3)), the L1 faces
      // inherit it (§2.2 rule 4), and S6 claims only faces with no owner (C-0245 (2)). Never a silently empty town.
      if (s6.report.landHa === 0) {
        const owners = landOwnersInside(k.plat(GROUND), s6.perimeter);
        ctx.report.warning(W_LAND_UNCLAIMED);
        return err('E_INVARIANT', `S6: no claimable land inside the perimeter of S5's last boundary${owners.length === 0 ? '' : ` — its L1 faces are owned by ${owners.join(', ')} (S1's land components, C-0229 (3)), and S6 claims only unowned faces (C-0245 (2))`} (C-0264 (9))`);
      }
      // The second half (§4.5; C-0255 (12)): pass 1 after typing, over the arena S6 left.
      const p = k.plat(GROUND);
      const site = input.slice.site;
      const sources = fieldDriverSources(p, { reservations: [input.commit.plaza], ways: s6in.value.ways, gates: input.state.stages.flatMap((st) => st.gates), water: input.water, mainStreetClasses: fieldsOwnTable().strs('mainStreet', 'classes') });
      const concern = CONCERNS['field.chance'];
      const stream = ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT));
      const fields = fieldsPass1({ frame: p.frame, rung: site.rung, terrain: input.terrain, sources }, { districts: s6.districts, faces: fieldFaces(p) }, ctx.tables, stream);
      if (!fields.ok) return refused(fields);
      const f = fields.value;
      return ok(
        { s6, districts: s6.districts, seams: s6.seams, quarters: s6.quarters, typing: s6.typing, fields: f, fieldBands: [f.prosperity.bands, f.density.bands, f.greenery.bands] },
        [...r.warnings, ...fields.warnings],
      );
    },
  }) as PipelineStage<S6In | null, Record<string, unknown>>;
}

// ---- S8 -------------------------------------------------------------------------------------------------------------------

interface S8In {
  readonly slice: S3Slice;
  readonly state: GrowthState;
  readonly s6: S6Output;
  readonly fields: FieldsPass1;
}

/**
 * A district's pass-1 value of a field (C-0264 (6)): the mean of its coarse faces' stored values weighted by their
 * cells; the plain mean of its faces' values when none holds a cell centre.
 */
export function districtValue(field: ScalarField, district: Id): number {
  let cells = 0;
  let sum = 0;
  let n = 0;
  let plain = 0;
  for (const fv of field.faces) {
    if (fv.owner !== district) continue;
    cells += fv.cells;
    sum += fv.value * fv.cells;
    n += 1;
    plain += fv.value;
  }
  if (cells > 0) {
    const r = ratio(sum, cells, 'count');
    if (r.ok) return r.value;
  }
  const r = ratio(plain, n, 'count');
  return r.ok ? r.value : field.valueAt({ x: 0, y: 0 });
}

/**
 * A way's width as S8's width map holds it (one number per way, C-0237 (1)): its scalar width, or for a way whose width
 * runs on `width_knot`s (S4's class runs, C-0236) its widest run's — the kerb then keeps every block clear of the widest
 * stretch (C-0264 (6)).
 */
export function wayWidthCm(w: Pick<Way, 'width'>): number {
  if (typeof w.width === 'number') return w.width;
  let max = 0;
  for (const v of w.width.values) if (v > max) max = v;
  return max;
}

/** S8's input as the base composes it from S5's and S6's records and the fields (C-0264 (6)). */
export function baseS8Input(input: S8In, kernel: Kernel, ctx: Pick<PipelineContext, 'seedKey' | 'streamOpts'>): S8Input {
  const site = input.slice.site;
  const regimes = site.tables.table('regimes');
  const reroll = ctx.streamOpts(CONCERNS['cut.stop'], TOWN_ROOT).reroll;
  const districts: S8District[] = input.s6.districts.map((d: District) => {
    const lineage = input.s6.lineages.get(d.id);
    if (lineage === undefined) throw new Error(`S8: S6 gave the district ${d.id} no lineage`);
    const gs = input.state.stages[Math.min(Math.max(d.growthStage, 1), input.state.stages.length) - 1];
    return {
      district: d,
      lineage,
      reroll,
      prosperity: districtValue(input.fields.prosperity, d.id),
      density: districtValue(input.fields.density, d.id),
      regime: regimes.row(gs.regime),
      walled: gs.walled,
    };
  });
  const widths = new Map<Id, number>();
  for (const w of input.state.ways) widths.set(w.id, wayWidthCm(w));
  return { kernel, key: GROUND, seedKey: ctx.seedKey, epoch: 0, rung: site.rung, districts, ways: input.state.ways.slice(), seams: input.s6.seams, widths };
}

function stageS8(opts: BaseOptions): PipelineStage<S8In | null, Record<string, unknown>> {
  const item = s8Stage();
  return Object.freeze({
    ...declOf(item),
    inputs: strs(item.inputs, ['s3.slice', 's5.growth', 's6', 'fields']),
    outputs: [...item.outputs],
    inputsOf(model: ModelView, _scope: Scope): S8In | null {
      const slice = read<S3Slice>(model, 's3.slice');
      const state = read<GrowthState>(model, 's5.growth');
      const s6 = read<S6Output>(model, 's6');
      const fields = read<FieldsPass1>(model, 'fields');
      return slice === undefined || state === undefined || s6 === undefined || fields === undefined ? null : { slice, state, s6, fields };
    },
    run(input: S8In | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const k = watched(ctx.kernel, { stage: 'S8', sub: 'S8', k: 0 }, opts.onBatch);
      const r = item.run(item.inputsOf(baseS8Input(input, k, ctx), { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      return ok(r.value as Record<string, unknown>, r.warnings);
    },
  }) as PipelineStage<S8In | null, Record<string, unknown>>;
}

// ---- the declaration an adapter keeps ---------------------------------------------------------------------------------------

/** An item's declaration, less its I/O and its run (the adapter declares those): §4.12's StageDecl fields and version. */
function declOf(item: { id: StageId; version: string; streamKeys: string[]; invariants: Invariant[]; ladder: Ladder; workLimits: WorkLimitLaw[]; budgetMs: Record<Rung, number>; batch: PipelineStage['batch']; lineageUnit: PipelineStage['lineageUnit']; lazy: boolean; txForm: 'declared' | 'callback' }): Omit<PipelineStage, 'inputs' | 'outputs' | 'inputsOf' | 'run'> {
  return {
    id: item.id,
    version: item.version,
    streamKeys: [...item.streamKeys],
    invariants: [...item.invariants],
    ladder: item.ladder,
    workLimits: [...item.workLimits],
    budgetMs: item.budgetMs,
    batch: item.batch,
    lineageUnit: item.lineageUnit,
    lazy: item.lazy,
    txForm: item.txForm,
  };
}

// ---- registration and the run ---------------------------------------------------------------------------------------------

/**
 * The base's registrations (§4.1, §4.12, §14; C-0077): its strategies by name and the six M0 stages into the base
 * product. Registration order does not reach the order (Kahn's sort by declared I/O, the id tie-break); the set's order
 * is asserted to be §4.1's drawn order (`BASE_ORDER`) — a registry whose base product already holds a stage is refused.
 */
export function registerBase(registry: StrategyRegistry, opts: BaseOptions = {}): void {
  const product = registry.products.get('base');
  if (product !== undefined && product.stages.length > 0) throw new RangeError(`registerBase: the base product already holds ${String(product.stages.length)} stage(s)`);
  // The river reports of the run in hand (the base strategy's sink beside the runner's): S1 keeps the last on its record.
  const rivers: RiverReport[] = [];
  registerStrategies(registry, opts, rivers);
  for (const s of [stageS1(registry, opts, rivers), stageS3(opts), stageS4(opts), stageS5(opts), stageS6(opts), stageS8(opts)]) register(registry, s as unknown as PipelineStage);
}

/** runBase's options: the runner's (its arenas are the base's) and the batch watcher. */
export type BaseRunOptions = Omit<RunOptions, 'arenas'> & BaseOptions;

/** The ground arena over the blueprint's frame (§3.2 (9)), indexed (C-0264 (7)). */
export function baseArena(bp: BaseBlueprint, tables: TableView = tableView()): Plat {
  const frame = siteFrame(bp.size, rungProfile(bp.size.rung), tables);
  if (!frame.ok) throw new RangeError(`runBase: the frame: ${frame.code} ${frame.detail}`);
  const p = createPlat(GROUND, frame.value);
  attachIndex(p, { gridCellCm: 5000 });
  return p;
}

/**
 * The integrated runner entry (C-0077): the base registered on a fresh registry, the blueprint at `seed` derived once
 * by M0-x-02's runner over a fresh ground arena, in §4.1's order. Returns the model and the generation report.
 */
export function runBase(blueprint: BaseBlueprint, seed: Seed, scope: Scope, options: BaseRunOptions = {}): { model: PipelineModel; report: GenerationReport } {
  checkBaseBlueprint(blueprint);
  const registry = createRegistry();
  registerBase(registry, { ...(options.onBatch === undefined ? {} : { onBatch: options.onBatch }), ...(options.workLimits === undefined ? {} : { workLimits: options.workLimits }) });
  const bp: BaseRunBlueprint = { ...blueprint, seed };
  const { onBatch: _onBatch, workLimits: _workLimits, ...rest } = options;
  return run(registry, bp, scope, { ...rest, arenas: () => [baseArena(blueprint, options.tables)] });
}
