// The edge suite's chain (M0-x-06; C-0100: "each the smallest state that reaches its home — the stage's own Stage object
// on a prepared arena, or M0-x-04's runBase on a small frame"; C-EDGE (4)). `edgeChain(seed, opts)` runs M0-x-04's base
// registration through M0-x-02's runner (`run`) — the registered Stage objects of S1, S3, S4, S5, S6 (and S8 when asked)
// in §4.1's order, each once — on a small frame (12 ha at CITY, 3 ha walled: the flat fixture's site, or a blueprint the
// fixture names), stopping after the stage the fixture's home is. Two things are the harness's own:
//   * the stage under test is handed a planted façade (./plant.ts) in place of the runner's — its run, its input and
//     every other stage untouched;
//   * S5 runs through `S5_DRIVER`, the base's S5 adapter's loop step for step (k ≥ 2: S5b, S5a; every k: S5c, its prune
//     and trim, S5d — each the item's own Stage object), registered under the S5 id with the base's declaration, so a
//     fixture can plant into one sub-stage, act on the growth state between sub-stages (a degenerate boundary, wider
//     ways) and stop after one. Its outputs are the base adapter's, key for key.
// The run counts every stage's run calls: a stage run twice, or a stage after the one that stopped, is a restart the
// fixtures refuse (EP-01's "never a whole-map retry").
import { err, ok, STAGES, type Kernel, type KernelResult, type LatticePoint, type Warning } from '@plat/kernel';
import type { Scope, WaterSet } from '@plat/model';
import {
  baseArena,
  createRegistry,
  growthStart,
  pruneAndTrim,
  registerBase,
  run,
  s5aStage,
  s5bStage,
  s5cStage,
  s5dStage,
  type BaseBlueprint,
  type GenerationReport,
  type GrowthState,
  type ModelView,
  type PipelineContext,
  type PipelineModel,
  type PipelineStage,
  type PruneRecord,
  type S3Commit,
  type S3Slice,
  type S4Output,
  type S5cRecord,
  type S5dRecord,
  type StreetGrowOptions,
} from '@plat/layout';
import { GROUND_KEY } from '@plat/site';
import { plantKernel, plantLog, type Plant, type PlantLog } from './plant.js';

/** The registered stages of the base, by name, in §4.1's order. */
export type ChainStage = 'S1' | 'S3' | 'S4' | 'S5' | 'S6' | 'S8';
export const CHAIN_ORDER: readonly ChainStage[] = Object.freeze(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);

/** S5's sub-stages (§4.1's S5 row). */
export type S5Sub = 'S5a' | 'S5b' | 'S5c' | 'S5d';

/**
 * The small flat frame (C-EDGE (4)): CITY, 30 ha of frame at aspect 1, 6 ha walled — the smallest frame on which the
 * base's stage-2 trace stands on every seed surveyed (on 12 ha, F-WALL refuses stage 2's trace on about half the seeds,
 * its later rungs M1's: the frame, not the fixture, would decide).
 */
export const SMALL_FLAT: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 30 }),
  site: Object.freeze({ relief: 'plain' as const, river: null }),
  terrain: 'flat',
  walledHa: 6,
}) as BaseBlueprint;

/** The mid flat frame: CITY, 120 ha, 40 ha walled — S5b lays a main road at stage 2 and S5c grows from seeds at stage 1. */
export const MID_FLAT: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 120 }),
  site: Object.freeze({ relief: 'plain' as const, river: null }),
  terrain: 'flat',
  walledHa: 40,
}) as BaseBlueprint;

/** The small river frame: the small flat frame with M0-x-04's river (from the west, no mouth) on the base terrain. */
export const SMALL_RIVER: BaseBlueprint = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 30 }),
  site: Object.freeze({ relief: 'plain' as const, river: Object.freeze({ inflowBearingCdeg: 27_000, mouth: 'none' as const }) }),
  terrain: 'base',
  walledHa: 6,
}) as BaseBlueprint;

/** What the S5 driver may do between sub-stages: act on the growth state before a sub-stage runs. */
export type S5Hook = (sub: S5Sub, k: number, state: GrowthState) => void;

/** The chain's options. */
export interface ChainOptions {
  /** The blueprint (default SMALL_FLAT). */
  readonly blueprint?: BaseBlueprint;
  /** The last stage run (its home). */
  readonly upTo: ChainStage;
  /** Run S5 as the base registered it (no driver): the driver's parity control (no plant into S5, no `s5` hooks). */
  readonly registeredS5?: boolean;
  /** A plant into one stage's façade (S5: into one sub-stage, at stage k when given, else the first that fires). */
  readonly plant?: { readonly stage: ChainStage; readonly sub?: S5Sub; readonly k?: number; readonly plant: Plant };
  /** S5's hooks: before each sub-stage; stop after a sub-stage at stage k; S5c's and S5d's options (their insert hook). */
  readonly s5?: {
    readonly before?: S5Hook;
    /** After S5's last sub-stage, before its outputs are written (S6 reads the state as this leaves it). */
    readonly after?: (state: GrowthState) => void;
    readonly stopAfter?: { readonly sub: S5Sub; readonly k: number };
    readonly grow?: StreetGrowOptions;
  };
}

/** What S5's driver saw, per stage k: S5c's record, its prune and trim, S5d's record. */
export interface S5Log {
  state: GrowthState | null;
  readonly growth: S5cRecord[];
  readonly prune: PruneRecord[];
  readonly capacity: S5dRecord[];
  /** The sub-stages run, in order, as `<sub>:<k>`. */
  readonly subs: string[];
  /** The sub-stage refused, with its code (the S5 stage's refusal). */
  refused: { readonly sub: S5Sub; readonly k: number; readonly code: string; readonly detail: string } | null;
}

/** A chain run: the runner's model and report, the plant's log, S5's log and every stage's run count. */
export interface ChainRun {
  readonly model: PipelineModel;
  readonly report: GenerationReport;
  readonly plant: PlantLog;
  readonly s5: S5Log;
  /** Each registered stage's run calls, by name (the restart assertion reads it). */
  readonly runs: ReadonlyMap<string, number>;
  /** The stages that ran, by name, in order. */
  readonly ran: readonly string[];
  /** Each refused stage's refusal (its §3.1 code and detail), by name: the report keeps the code only. */
  readonly refusals: ReadonlyMap<string, { readonly code: string; readonly detail: string }>;
}

interface S5In {
  readonly slice: S3Slice;
  readonly commit: S3Commit;
  readonly s4: S4Output;
  readonly water: WaterSet;
}

/**
 * The S5 driver (see the header): the base S5 adapter's loop with the fixture's hooks, under the base's declaration.
 * `base` is the registered S5 stage it replaces (its id, I/O, streams, ladder, laws, form and inputsOf are kept).
 */
function s5Driver(base: PipelineStage, opts: ChainOptions, log: S5Log, plog: PlantLog): PipelineStage {
  const p = opts.plant?.stage === 'S5' ? opts.plant : undefined;
  return Object.freeze({
    ...base,
    run(input: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      const i = input as S5In | null;
      if (i === null) return ok({});
      if (p !== undefined) plog.armed = false;
      const kernel: Kernel = p === undefined ? ctx.kernel : plantKernel(ctx.kernel, p.plant, plog);
      const state = growthStart({ slice: i.slice, commit: i.commit, s4: i.s4, kernel, water: i.water, key: GROUND_KEY });
      log.state = state;
      const sctx = ctx as never;
      const K = i.slice.site.land.stagesHa.length;
      const warnings: Warning[] = [];
      const grow = opts.s5?.grow ?? {};
      const stop = opts.s5?.stopAfter;
      const step = <T>(sub: S5Sub, k: number, f: () => KernelResult<T>): KernelResult<T> => {
        opts.s5?.before?.(sub, k, state);
        if (p !== undefined) plog.armed = p.sub === sub && (p.k === undefined || p.k === k);
        log.subs.push(`${sub}:${String(k)}`);
        const r = f();
        if (p !== undefined) plog.armed = false;
        if (r.ok) warnings.push(...r.warnings);
        else log.refused = { sub, k, code: r.code, detail: r.detail };
        return r;
      };
      const out = (): KernelResult<Record<string, unknown>> => {
        const enceintes = [i.commit.enceinte, ...state.stages.flatMap((st) => (st.trace === null ? [] : [st.trace.enceinte]))];
        const gates = state.stages.flatMap((st) => st.gates);
        return ok({ 's5.growth': state, s5: { growth: log.growth, prune: log.prune, capacity: log.capacity }, ways: state.ways.slice(), junctions: state.junctions.slice(), enceintes, gates }, warnings);
      };
      const done = (sub: S5Sub, k: number): boolean => stop !== undefined && stop.sub === sub && stop.k === k;
      for (let k = 1; k <= K; k += 1) {
        if (k >= 2) {
          const sb = s5bStage(k);
          const m = step('S5b', k, () => sb.run(sb.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!m.ok) return err(m.code, m.detail);
          if (done('S5b', k)) return out();
          const sa = s5aStage(k);
          const t = step('S5a', k, () => sa.run(sa.inputsOf({ growth: state }, { kind: 'all' }), sctx));
          if (!t.ok) return err(t.code, t.detail);
          if (done('S5a', k)) return out();
        }
        const sc = s5cStage(k, grow);
        const g = step('S5c', k, () => sc.run(sc.inputsOf({ growth: state }, { kind: 'all' }), sctx));
        if (!g.ok) return err(g.code, g.detail);
        log.growth.push(g.value);
        const pr = pruneAndTrim({ state, k, record: g.value });
        if (!pr.ok) {
          log.refused = { sub: 'S5c', k, code: pr.code, detail: pr.detail };
          return err(pr.code, pr.detail);
        }
        warnings.push(...pr.warnings);
        log.prune.push(pr.value);
        if (done('S5c', k)) return out();
        const sd = s5dStage(k, grow);
        const cap = step('S5d', k, () => sd.run(sd.inputsOf({ growth: state }, { kind: 'all' }), sctx));
        if (!cap.ok) return err(cap.code, cap.detail);
        log.capacity.push(cap.value);
        if (done('S5d', k)) return out();
      }
      opts.s5?.after?.(state);
      return out();
    },
  }) as PipelineStage;
}

/** A registered stage handed a planted façade (its run otherwise the stage's own). */
function planted(stage: PipelineStage, plant: Plant, log: PlantLog): PipelineStage {
  return Object.freeze({
    ...stage,
    run(input: unknown, ctx: PipelineContext): KernelResult<unknown> {
      return stage.run(input, { ...ctx, kernel: plantKernel(ctx.kernel, plant, log) });
    },
  }) as PipelineStage;
}

/** A registered stage that runs nothing (its declaration and rank kept). */
function idle(stage: PipelineStage): PipelineStage {
  return Object.freeze({
    ...stage,
    run(): KernelResult<Record<string, unknown>> {
      return ok({});
    },
  }) as PipelineStage;
}

/** A registered stage whose run calls are counted and whose refusal is kept. */
function counted(stage: PipelineStage, name: string, runs: Map<string, number>, ran: string[], refusals: Map<string, { code: string; detail: string }>): PipelineStage {
  return Object.freeze({
    ...stage,
    inputsOf(model: ModelView, scope: Scope): unknown {
      return stage.inputsOf(model, scope);
    },
    run(input: unknown, ctx: PipelineContext): KernelResult<unknown> {
      runs.set(name, (runs.get(name) ?? 0) + 1);
      ran.push(name);
      const r = stage.run(input, ctx);
      if (!r.ok) refusals.set(name, { code: r.code, detail: r.detail });
      return r;
    },
  }) as PipelineStage;
}

/** The stage name a registered stage's id carries. */
function nameOf(stage: PipelineStage): ChainStage {
  for (const n of CHAIN_ORDER) if ((STAGES as Record<string, number>)[n] === (stage.id as number)) return n;
  throw new Error(`edgeChain: the base registered a stage ${String(stage.id)} outside ${CHAIN_ORDER.join(', ')}`);
}

/**
 * The chain at `seed` (see the header): the base's stages up to `opts.upTo` through the runner on the blueprint's arena,
 * the plant in its stage, S5 through the driver. Returns the model, the report, the plant's and S5's logs and the run
 * counts.
 */
export function edgeChain(seed: number, opts: ChainOptions): ChainRun {
  const bp = opts.blueprint ?? SMALL_FLAT;
  if (opts.registeredS5 === true && (opts.s5 !== undefined || opts.plant?.stage === 'S5')) throw new Error('edgeChain: the registered S5 takes no plant and no hooks');
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('edgeChain: the base product is missing');
  const last = CHAIN_ORDER.indexOf(opts.upTo);
  const log: S5Log = { state: null, growth: [], prune: [], capacity: [], subs: [], refused: null };
  const plog = plantLog(true);
  const runs = new Map<string, number>();
  const ran: string[] = [];
  const refusals = new Map<string, { code: string; detail: string }>();
  const kept: PipelineStage[] = [];
  for (const s of product.stages) {
    const name = nameOf(s);
    const pos = CHAIN_ORDER.indexOf(name);
    if (pos > last) {
      // S3 commits stage 1's trace in S5's batch (§4.1's S5 row), so S5 stays registered — its rank is the order's —
      // and runs nothing past the chain's last stage; a later stage is not registered at all.
      if (name === 'S5') kept.push(idle(s));
      continue;
    }
    let stage: PipelineStage = name === 'S5' && opts.registeredS5 !== true ? s5Driver(s, opts, log, plog) : s;
    if (opts.plant !== undefined && opts.plant.stage === name && name !== 'S5') stage = planted(stage, opts.plant.plant, plog);
    kept.push(counted(stage, name, runs, ran, refusals));
  }
  product.stages.length = 0;
  product.stages.push(...kept);
  const { model, report } = run(registry, { ...bp, seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  return { model, report, plant: plog, s5: log, runs, ran, refusals };
}

/** The restart assertion (EP-01: "never a whole-map retry"): every stage ran at most once, none after `upTo`. */
export function restartFree(run: ChainRun, upTo: ChainStage): string | null {
  for (const [name, n] of run.runs) {
    if (n !== 1) return `stage ${name} ran ${String(n)} times`;
    if (CHAIN_ORDER.indexOf(name as ChainStage) > CHAIN_ORDER.indexOf(upTo)) return `stage ${name} ran after ${upTo}`;
  }
  const names = run.report.stages.map((s) => s.name);
  if (new Set(names).size !== names.length) return `the report holds a stage twice: ${names.join(', ')}`;
  return null;
}

/** A lattice point. */
export function at(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}
