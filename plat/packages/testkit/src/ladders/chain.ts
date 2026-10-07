// The base chain a rung fixture runs on (M0-x-05; C-0077, C-0085, C-0269): M0-x-04's registrations (`registerBase`) on
// a fresh registry, the product cut after the stage the fixture reads (`until`: the later stages registered, run as no-ops), test-side TerrainStrategies registered
// beside the base's, and — where a rung is forced through a stage's own option (a low work-limit floor, a planted
// refusal, a raised demand, the grade limits) — that stage's registered adapter replaced by one that composes the
// stage's own Stage object with the option, from the same exported pieces `base.ts` composes (`baseSite`,
// `waterPlanOf`, `baseS6Input`, `baseS8Input`, …). M0-x-02's runner (`run`) derives it over `baseArena`, so every rung
// is reached on the real stages in the base's order and lands in their records and the generation report. The
// replacements with no option reproduce the registered adapters exactly: the chain test compares the model digest's
// root at every stage end (C-0269).
import { CONCERNS, err, ok, stageText, type Kernel, type KernelResult, type Seed, type Warning } from '@plat/kernel';
import type { Bridge, Scope, Terrain, WaterSet } from '@plat/model';
import {
  BASE_ORDER,
  baseArena,
  baseS6Input,
  baseS8Input,
  baseSite,
  commitS3Slice,
  createRegistry,
  fieldDriverSources,
  fieldFaces,
  fieldsOwnTable,
  fieldsPass1,
  growthStart,
  pruneAndTrim,
  registerBase,
  run,
  s3Slice,
  s4Stage,
  s5aStage,
  s5bStage,
  s5cStage,
  s5dStage,
  s6Stage,
  s8Stage,
  waterPlanOf,
  type BaseBlueprint,
  type CapacityDemand,
  type FieldsOptions,
  type GenerationReport,
  type GrowthState,
  type PipelineContext,
  type PipelineModel,
  type PipelineStage,
  type S3Commit,
  type S3Slice,
  type S4Options,
  type S4Output,
  type S5cRecord,
  type S5dRecord,
  type S6Input,
  type S6Output,
  type S8Input,
  type SliceOptions,
  type StreetGrowOptions,
} from '@plat/layout';
import { GROUND_KEY, TOWN_ROOT, type SiteResources, type TerrainStrategy } from '@plat/site';
import type { WorkLimitsTable } from '@plat/tables';

/** A stage name of the base order (`BASE_ORDER`). */
export type BaseStageName = 'S1' | 'S3' | 'S4' | 'S5' | 'S6' | 'S8';

/** The options a chain's replaced adapters hand their stage (each absent: the registered adapter runs). */
export interface ChainOverrides {
  /** S3's slice options (`s3Slice(site, opts(site))`; the planted picks of F-WALL's gate rungs). */
  readonly S3?: { readonly slice: (site: S3Slice['site']) => SliceOptions };
  /** S4's options (`s4Stage(opts)`: the grade limits of the slope rung, route.nodes' limit). */
  readonly S4?: S4Options;
  /** S5c's options per stage k (a low floor, a planted refusal) and S5d's demand per stage k. */
  readonly S5?: { readonly growth?: (k: number, kernel: Kernel) => StreetGrowOptions; readonly demand?: (k: number, state: GrowthState) => CapacityDemand | undefined };
  /** S6's work-limit table and the fields' pass-1 options. */
  readonly S6?: { readonly workLimits?: WorkLimitsTable; readonly fields?: FieldsOptions };
  /** S8's districts kept (by id; default all) and its tables (a low cut floor). */
  readonly S8?: { readonly districts?: readonly string[]; readonly tables?: S8Input['tables'] };
}

/** One chain run's request. */
export interface ChainSpec {
  readonly blueprint: BaseBlueprint;
  readonly seed: Seed;
  /** The last stage run (the product cut after it). */
  readonly until: BaseStageName;
  /** Test-side TerrainStrategies registered beside the base's, by name (the blueprint names one in `terrain`). */
  readonly terrains?: Readonly<Record<string, TerrainStrategy>>;
  /** The work-limit table the runner evaluates S1's `hydro.cells` law from (registerBase's option). */
  readonly workLimits?: WorkLimitsTable;
  /** Every replaced adapter (true: the replacement with no option — the chain test's identity form). */
  readonly replaceAll?: boolean;
  readonly override?: ChainOverrides;
}

/** A chain run: the runner's model and report. */
export interface ChainRun {
  readonly model: PipelineModel;
  readonly report: GenerationReport;
}

const GROUND = GROUND_KEY;

function refused(r: { readonly code: string; readonly detail: string }): KernelResult<never> {
  return err(r.code as never, r.detail);
}

/** The base S3 adapter with the slice's options (base.ts's `stageS3` body). */
function s3With(orig: PipelineStage, slice: (site: S3Slice['site']) => SliceOptions): PipelineStage {
  return Object.freeze({
    ...orig,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const i = input as { bp: Parameters<typeof baseSite>[0]; terrain: Terrain; water: WaterSet };
      const plan = waterPlanOf(ctx.kernel, i.water);
      if (!plan.ok) return refused(plan);
      const site = baseSite(i.bp, i.terrain, plan.value, ctx);
      const sl = s3Slice(site, slice(site));
      const commit = commitS3Slice(sl, ctx.kernel, { outerRing: 'present', water: i.water, key: GROUND });
      if (!commit.ok) return refused(commit);
      const c = commit.value;
      return ok({ s3: { site }, 's3.slice': sl, 's3.commit': c, reservations: [c.plaza], enceintes: [c.enceinte], gates: c.gates.slice() }, commit.warnings);
    },
  }) as PipelineStage;
}

/** The base S4 adapter with S4's options (base.ts's `stageS4` body). */
function s4With(orig: PipelineStage, opts: S4Options): PipelineStage {
  const item = s4Stage(opts);
  return Object.freeze({
    ...orig,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const i = input as { slice: S3Slice; commit: S3Commit; water: WaterSet };
      const r = item.run(item.inputsOf({ slice: i.slice, commit: i.commit, water: i.water, kernel: ctx.kernel } as never, { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      const s4: S4Output = r.value;
      return ok({ s4, ways: s4.network.ways, junctions: s4.network.junctions, bridges: s4.bridges, gates: s4.gates }, r.warnings);
    },
  }) as PipelineStage;
}

/** The base S5 adapter (base.ts's `stageS5` body): k = 1 … K, S5a / S5b from k = 2, S5c with its prune, S5d. */
function s5With(orig: PipelineStage, o: NonNullable<ChainOverrides['S5']>): PipelineStage {
  return Object.freeze({
    ...orig,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const i = input as { slice: S3Slice; commit: S3Commit; s4: S4Output; water: WaterSet };
      const kernel = ctx.kernel;
      const state: GrowthState = growthStart({ slice: i.slice, commit: i.commit, s4: i.s4, kernel, water: i.water, key: GROUND });
      const sctx = ctx as never;
      const K = i.slice.site.land.stagesHa.length;
      const growth: S5cRecord[] = [];
      const prune: ReturnType<typeof pruneAndTrim> extends KernelResult<infer T> ? T[] : never = [];
      const capacity: S5dRecord[] = [];
      const warnings: Warning[] = [];
      const step = <T>(r: KernelResult<T>): KernelResult<T> => {
        if (r.ok) warnings.push(...r.warnings);
        return r;
      };
      for (let k = 1; k <= K; k += 1) {
        if (k >= 2) {
          const sb = s5bStage(k);
          const m = step(sb.run(sb.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!m.ok) return refused(m);
          const sa = s5aStage(k);
          const t = step(sa.run(sa.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!t.ok) return refused(t);
        }
        const sc = s5cStage(k, o.growth?.(k, kernel) ?? {});
        const g = step(sc.run(sc.inputsOf({ growth: state }, { kind: 'all' }), sctx));
        if (!g.ok) return refused(g);
        growth.push(g.value);
        const pr = step(pruneAndTrim({ state, k, record: g.value }));
        if (!pr.ok) return refused(pr);
        prune.push(pr.value);
        const sd = s5dStage(k);
        const demand = o.demand?.(k, state);
        const cap = step(sd.run(sd.inputsOf({ growth: state, ...(demand === undefined ? {} : { demand }) }, { kind: 'all' }), sctx));
        if (!cap.ok) return refused(cap);
        capacity.push(cap.value);
      }
      const enceintes = [i.commit.enceinte, ...state.stages.flatMap((st) => (st.trace === null ? [] : [st.trace.enceinte]))];
      const gates = state.stages.flatMap((st) => st.gates);
      return ok({ 's5.growth': state, s5: { growth, prune, capacity }, ways: state.ways.slice(), junctions: state.junctions.slice(), enceintes, gates }, warnings);
    },
  }) as PipelineStage;
}

/** The base S6 adapter (base.ts's `stageS6` body) with S6's work-limit table and the fields' options. */
function s6With(orig: PipelineStage, o: NonNullable<ChainOverrides['S6']>): PipelineStage {
  const item = s6Stage(o.workLimits === undefined ? {} : { workLimits: o.workLimits });
  return Object.freeze({
    ...orig,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const i = input as { bp: never; slice: S3Slice; commit: S3Commit; state: GrowthState; water: WaterSet; bridges?: readonly Bridge[]; terrain: Terrain; resources?: SiteResources };
      const k = ctx.kernel;
      const s6in = baseS6Input(i as never, k, ctx);
      if (!s6in.ok) return refused(s6in);
      const withLimits: S6Input = o.workLimits === undefined ? s6in.value : { ...s6in.value, workLimits: o.workLimits };
      const r = item.run(item.inputsOf(withLimits, { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      const s6: S6Output = r.value;
      if (s6.report.landHa === 0) {
        ctx.report.warning('W_LAND_UNCLAIMED');
        return err('E_INVARIANT', 'S6: no claimable land inside the perimeter of S5’s last boundary (C-0264 (9))');
      }
      const p = k.plat(GROUND);
      const site = i.slice.site;
      const sources = fieldDriverSources(p, { reservations: [i.commit.plaza], ways: s6in.value.ways, gates: i.state.stages.flatMap((st) => st.gates), water: i.water, mainStreetClasses: fieldsOwnTable().strs('mainStreet', 'classes') });
      const concern = CONCERNS['field.chance'];
      const stream = ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT));
      const fields = fieldsPass1({ frame: p.frame, rung: site.rung, terrain: i.terrain, resources: i.resources ?? null, sources }, { districts: s6.districts, faces: fieldFaces(p) }, ctx.tables, stream, o.fields ?? {});
      if (!fields.ok) return refused(fields);
      const f = fields.value;
      return ok({ s6, districts: s6.districts, seams: s6.seams, quarters: s6.quarters, typing: s6.typing, fields: f, fieldBands: [f.prosperity.bands, f.density.bands, f.greenery.bands] }, [...r.warnings, ...fields.warnings]);
    },
  }) as PipelineStage;
}

/** The base S8 adapter (base.ts's `stageS8` body), its districts filtered and its tables given. */
function s8With(orig: PipelineStage, o: NonNullable<ChainOverrides['S8']>): PipelineStage {
  const item = s8Stage(o.tables?.workLimits === undefined ? {} : { workLimits: o.tables.workLimits });
  return Object.freeze({
    ...orig,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return ok({});
      const full = baseS8Input(input as never, ctx.kernel, ctx);
      const keep = o.districts;
      const s8in: S8Input = {
        ...full,
        districts: keep === undefined ? full.districts : full.districts.filter((d) => keep.includes(d.district.id)),
        ...(o.tables === undefined ? {} : { tables: o.tables }),
      };
      const r = item.run(item.inputsOf(s8in, { kind: 'all' }), ctx as never);
      if (!r.ok) return refused(r);
      return ok(r.value as Record<string, unknown>, r.warnings);
    },
  }) as PipelineStage;
}

/**
 * Runs the base chain (see the header): the base registered, the product cut after `until`, the replaced adapters,
 * M0-x-02's runner over `baseArena(blueprint)`.
 */
export function runChain(spec: ChainSpec): ChainRun {
  const registry = createRegistry();
  registerBase(registry, spec.workLimits === undefined ? {} : { workLimits: spec.workLimits });
  for (const [name, t] of Object.entries(spec.terrains ?? {})) registry.terrain.set(name, t);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('runChain: no base product');
  const cut = BASE_ORDER.indexOf(spec.until);
  if (cut < 0) throw new RangeError(`runChain: '${spec.until}' is no stage of the base order`);
  const o = spec.override ?? {};
  const all = spec.replaceAll === true;
  const kept: PipelineStage[] = [];
  for (const s of product.stages) {
    const name = stageText(s.id);
    const at = BASE_ORDER.indexOf(name);
    // A stage after the cut stays registered — its id keeps its rank (§3.3: S3's trace commits at S5's rank, §4.1's S5
    // row) — but runs nothing.
    if (at < 0 || at > cut) {
      kept.push(Object.freeze({ ...s, run: (): KernelResult<Record<string, unknown>> => ok({}) }) as PipelineStage);
      continue;
    }
    let st: PipelineStage = s;
    if (name === 'S3' && o.S3 !== undefined) st = s3With(s, o.S3.slice);
    else if (name === 'S3' && all) st = s3With(s, () => ({}));
    if (name === 'S4' && (o.S4 !== undefined || all)) st = s4With(s, o.S4 ?? {});
    if (name === 'S5' && (o.S5 !== undefined || all)) st = s5With(s, o.S5 ?? {});
    if (name === 'S6' && (o.S6 !== undefined || all)) st = s6With(s, o.S6 ?? {});
    if (name === 'S8' && (o.S8 !== undefined || all)) st = s8With(s, o.S8 ?? {});
    kept.push(st);
  }
  product.stages.splice(0, product.stages.length, ...kept);
  const bp = { ...spec.blueprint, seed: spec.seed };
  return run(registry, bp, { kind: 'all' } as Scope, { arenas: () => [baseArena(spec.blueprint)] });
}
