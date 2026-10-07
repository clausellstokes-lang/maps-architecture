// The site spike's composition (M0-e-06; §16 M0 (e), §12.4's S1, S2 / S3, S4 and S6 rows, §12.10 R12-5, §4.1's order;
// C-0076, C-0077, C-0080, C-0087, C-0264, C-0268). One derivation is M0-x-04's base registration run by M0-x-02's
// runner — S1, the S3 slice with its commits, S4, S5 (the order's stage between S4 and S6: S6 reads S5's last
// boundary, its ways and its walls, C-0264 (5)) and S6 with the fields' pass 1 — less S8 (the fusion spike's, M0-c-06),
// so the arena stands as S6 left it for the receipts. The harness only watches: each registered stage's run is wrapped
// to take its wall-clock (taken here, never by model code; C-0082) and to see every batch the stage commits through the
// façade (its work and its limit); the TerrainStrategy is wrapped to keep the heights before S1 (3) carves them and the
// terrain's warnings (the carve and clamp receipts). R12-5's coarsening switch (C-0080) is the configuration `coarse`:
// the RiverStrategy with `hydroCoarsen` (25 → 32 m at CITY) and S6's second half with `fieldsCoarsen` (32 → 48 m) —
// nothing else changes; the default configuration is the base's own registration, untouched.
import { CONCERNS, err, ok, stageText, STAGES, type CommitRecord, type Committed, type Kernel, type KernelResult, type KernelTx, type Overlay, type Seed, type Warning } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import {
  baseArena,
  baseS6Input,
  createRegistry,
  fieldDriverSources,
  fieldFaces,
  fieldsOwnTable,
  fieldsPass1,
  hydroCellsLimit,
  registerBase,
  run,
  s6Stage,
  W_LAND_UNCLAIMED,
  type BaseBlueprint,
  type GenerationReport,
  type PipelineContext,
  type PipelineModel,
  type PipelineStage,
  type S6Output,
  type StrategyRegistry,
} from '@plat/layout';
import { riverStrategy, TOWN_ROOT, type RiverReport, type RiverStrategy, type SiteResources, type TerrainStrategy } from '@plat/site';
import { loadWorkLimits, type BaseRung } from '@plat/tables';
import { sized, type SiteFixture, type SpikeSize } from './fixtures.js';

/** The two configurations the spike runs (C-0080): the default, and R12-5's coarsening switch. */
export type SpikeConfig = 'default' | 'coarse';

/** The stages a spike derivation runs, in §4.1's order (S8 left out: the fusion spike's). */
export const SPIKE_STAGES: readonly string[] = Object.freeze(['S1', 'S3', 'S4', 'S5', 'S6']);

/** The site gate's stages (§12.4, §16 M0 (e): S1 + S4 + S6 ≤ 50 ms at CITY). */
export const GATE_STAGES: readonly string[] = Object.freeze(['S1', 'S4', 'S6']);

/** One batch a stage committed through the façade, as the harness saw it. */
export interface BatchSeen {
  readonly stage: string;
  readonly level: number;
  /** The batch's charged work (CommitRecord.work: the total over the counters its limit sums). */
  readonly work: number;
  readonly limit: number;
  readonly committed: boolean;
  /** The refusal's code (a batch the kernel refused), else null. */
  readonly code: string | null;
}

/** What the harness captured beside the model during one derivation. */
export interface RunCapture {
  /** The heights S1 (1) stored, before S1 (3) carved them (null when the terrain was refused). */
  preHeights: Int32Array | null;
  /** The TerrainStrategy's warnings (W_HEIGHT_CLAMPED with its count, §2.3). */
  terrainWarnings: Warning[];
  /** The river stage's report (the base's S1 record keeps it; the coarse strategy hands it here). */
  river: RiverReport | null;
  /** Each stage's wall-clock in ms, by name (bench-side, hrtime). */
  readonly stageMs: Map<string, number>;
  /** Every batch, in order. */
  readonly batches: BatchSeen[];
  /** The live L1 faces when S6 started (grower.turns' unit, §2.2's `faces`). */
  s6Faces: number;
  /** The kernel's commit records' warnings, by stage name (the runner's observe sees only `batch` commits). */
  readonly commits: Map<string, number>;
}

function newCapture(): RunCapture {
  return { preHeights: null, terrainWarnings: [], river: null, stageMs: new Map(), batches: [], s6Faces: 0, commits: new Map() };
}

/** The façade with its `tx` watched: each batch's work, limit and outcome recorded under the running stage. */
function watchedKernel(kernel: Kernel, stage: string, cap: RunCapture): Kernel {
  const tx = <T>(spec: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<Committed<T | KernelResult<unknown>[]>> => {
    const r = kernel.tx(spec, fn);
    const rec: CommitRecord | null = r.ok ? r.value.record : null;
    cap.batches.push({ stage, level: spec.level, work: rec === null ? 0 : rec.work, limit: spec.workLimit, committed: rec !== null, code: r.ok ? null : r.code });
    if (rec !== null) cap.commits.set(stage, (cap.commits.get(stage) ?? 0) + 1);
    return r;
  };
  return Object.freeze({ ...kernel, tx }) as Kernel;
}

/** The live L1 faces of the ground arena. */
function liveL1Faces(kernel: Kernel): number {
  return kernel.view({ layer: 'ground', part: 0 } as never, 1).faces().length;
}

/** A stage wrapped for the harness: its run timed and its batches watched; its declaration untouched. */
function timed(stage: PipelineStage, cap: RunCapture): PipelineStage {
  const name = stageText(stage.id);
  return Object.freeze({
    ...stage,
    run(input: unknown, ctx: PipelineContext): KernelResult<unknown> {
      const kernel = watchedKernel(ctx.kernel, name, cap);
      if (name === 'S6') cap.s6Faces = liveL1Faces(ctx.kernel);
      const t0 = process.hrtime.bigint();
      const r = stage.run(input, { ...ctx, kernel });
      const t1 = process.hrtime.bigint();
      cap.stageMs.set(name, Number(t1 - t0) / 1e6);
      return r;
    },
  }) as PipelineStage;
}

/** The TerrainStrategy wrapped to keep the stored heights before the carve and the strategy's warnings. */
function capturingTerrain(inner: TerrainStrategy, cap: RunCapture): TerrainStrategy {
  return Object.freeze({
    terrain(bp, ctx, k) {
      const r = inner.terrain(bp, ctx, k);
      if (r.ok) {
        cap.preHeights = Int32Array.from(r.value.heightCm);
        cap.terrainWarnings = r.warnings.map((w) => ({ ...w }));
      }
      return r;
    },
  } satisfies TerrainStrategy);
}

/** A river report's rows into the runner's sink (the base's forwarding, M0-x-04's C-0264 (12), for the coarse strategy). */
function forward(report: RiverReport, ctx: PipelineContext): void {
  const concern = CONCERNS['water.river'];
  for (const u of report.ladderUses) {
    const opts = ctx.streamOpts(concern, TOWN_ROOT, u.name === 'inlet' ? u.value : 0);
    ctx.report.ladderUse({ cause: u.cause, ...(u.code === undefined ? {} : { code: u.code }), rung: u.rung, tier: u.tier, entity: TOWN_ROOT, concern, opts });
  }
  for (const q of report.requested) ctx.report.requested({ ...q });
}

/**
 * R12-5's coarse RiverStrategy: the base's (`hydro.cells`' law evaluated for the run's terrain, its report forwarded,
 * C-0264 (12)) with `hydroCoarsen` on — the hydrology grid one step coarser from the start.
 */
export function coarseRiverStrategy(cap: RunCapture): RiverStrategy {
  const wl = loadWorkLimits();
  return Object.freeze({
    rivers(bp, terrain, water, ctx, k) {
      const c = ctx as unknown as PipelineContext;
      const limit = hydroCellsLimit(terrain, ctx.tables, ctx.rung.rung as BaseRung, wl);
      const s = riverStrategy({
        hydroCoarsen: true,
        hydroCellsLimit: limit,
        onReport: (report) => {
          if (typeof c.report === 'object' && c.report !== null) forward(report, c);
          cap.river = report;
        },
      });
      return s.rivers(bp, terrain, water, ctx, k);
    },
  } satisfies RiverStrategy);
}

/** S6's input as base.ts's adapter reads it (its inputsOf's value). */
interface S6In {
  readonly bp: unknown;
  readonly slice: Parameters<typeof baseS6Input>[0]['slice'];
  readonly commit: Parameters<typeof baseS6Input>[0]['commit'];
  readonly state: Parameters<typeof baseS6Input>[0]['state'];
  readonly water: Parameters<typeof baseS6Input>[0]['water'];
  readonly bridges?: Parameters<typeof baseS6Input>[0]['bridges'];
  readonly terrain: Terrain;
  readonly resources?: SiteResources;
}

/**
 * S6 composed as base.ts composes it (C-0264 (5), (9), C-0266, C-0267) — `baseS6Input`, M0-e-04's `s6Stage`, the
 * W_LAND_UNCLAIMED refusal, then the fields' pass 1 over the arena S6 left — with `fieldsCoarsen` passed to pass 1
 * (R12-5). With the switch off it is byte-identical to the base's S6 (held by the composition test, C-0268 (2)).
 */
export function composedS6Run(fieldsCoarsen: boolean): (input: unknown, ctx: PipelineContext) => KernelResult<Record<string, unknown>> {
  const item = s6Stage();
  return (raw: unknown, ctx: PipelineContext): KernelResult<Record<string, unknown>> => {
    const input = raw as S6In | null;
    if (input === null) return ok({});
    const k = ctx.kernel;
    const s6in = baseS6Input(input as never, k, ctx);
    if (!s6in.ok) return err(s6in.code, s6in.detail);
    const r = item.run(item.inputsOf(s6in.value, { kind: 'all' }), ctx as never);
    if (!r.ok) return err(r.code, r.detail);
    const s6: S6Output = r.value;
    if (s6.report.landHa === 0) {
      ctx.report.warning(W_LAND_UNCLAIMED);
      return err('E_INVARIANT', "S6: no claimable land inside the perimeter of S5's last boundary (C-0264 (9))");
    }
    const p = k.plat({ layer: 'ground', part: 0 } as never);
    const site = input.slice.site;
    const sources = fieldDriverSources(p, { reservations: [input.commit.plaza], ways: s6in.value.ways, gates: input.state.stages.flatMap((st) => st.gates), water: input.water, mainStreetClasses: fieldsOwnTable().strs('mainStreet', 'classes') });
    const concern = CONCERNS['field.chance'];
    const stream = ctx.stream(concern, TOWN_ROOT, ctx.streamOpts(concern, TOWN_ROOT));
    const fields = fieldsPass1({ frame: p.frame, rung: site.rung, terrain: input.terrain, resources: input.resources ?? null, sources }, { districts: s6.districts, faces: fieldFaces(p) }, ctx.tables, stream, fieldsCoarsen ? { fieldsCoarsen: true } : {});
    if (!fields.ok) return err(fields.code, fields.detail);
    const f = fields.value;
    return ok({ s6, districts: s6.districts, seams: s6.seams, quarters: s6.quarters, typing: s6.typing, fields: f, fieldBands: [f.prosperity.bands, f.density.bands, f.greenery.bands] }, [...r.warnings, ...fields.warnings]);
  };
}

/** The spike's registry options. */
export interface SpikeRegistryOptions {
  readonly config: SpikeConfig;
  /** S6 composed by the harness even with the switch off (the composition test's form). */
  readonly composedS6?: boolean;
}

/**
 * The spike's registry: the base registered (M0-x-04), S8 removed, every stage wrapped (`timed`), the TerrainStrategy
 * wrapped (`capturingTerrain`); under `coarse` the RiverStrategy registered as `coarse` and S6's second half switched.
 */
export function spikeRegistry(opts: SpikeRegistryOptions, cap: RunCapture): StrategyRegistry {
  const registry = createRegistry();
  registerBase(registry);
  const base = registry.terrain.get('base');
  if (base === undefined) throw new Error('site spike: the base registered no TerrainStrategy');
  registry.terrain.set('base', capturingTerrain(base, cap));
  if (opts.config === 'coarse') registry.river.set('coarse', coarseRiverStrategy(cap));
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('site spike: the registry holds no base product');
  const kept = product.stages.filter((s) => SPIKE_STAGES.includes(stageText(s.id)));
  if (kept.length !== SPIKE_STAGES.length) throw new Error(`site spike: the base registered ${String(kept.length)} of the spike's ${String(SPIKE_STAGES.length)} stages`);
  const wrapped = kept.map((s) => {
    if (stageText(s.id) !== 'S6' || (opts.config === 'default' && opts.composedS6 !== true)) return timed(s, cap);
    return timed(Object.freeze({ ...s, run: composedS6Run(opts.config === 'coarse') }) as PipelineStage, cap);
  });
  product.stages.splice(0, product.stages.length, ...wrapped);
  return registry;
}

/** One derivation of the spike: the model, the generation report and the capture. */
export interface SpikeDerivation {
  readonly fixture: string;
  readonly config: SpikeConfig;
  readonly seed: number;
  readonly size: SpikeSize;
  readonly blueprint: BaseBlueprint;
  readonly model: PipelineModel;
  readonly report: GenerationReport;
  readonly capture: RunCapture;
}

/** Derives `fixture` at `seed` under `config` through M0-x-02's runner (one forward pass, §5.1 (1)). */
export function deriveSpike(fixture: SiteFixture, seed: number, config: SpikeConfig, size: SpikeSize = 'city', opts: { composedS6?: boolean } = {}): SpikeDerivation {
  const cap = newCapture();
  const bp0 = sized(fixture.blueprint, size);
  const blueprint: BaseBlueprint = config === 'coarse' ? { ...bp0, river: 'coarse' } : bp0;
  const registry = spikeRegistry({ config, ...(opts.composedS6 === undefined ? {} : { composedS6: opts.composedS6 }) }, cap);
  const out = run(registry, { ...blueprint, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(blueprint)] });
  if (config === 'default') {
    const s1 = out.model.data.get('s1') as { river: RiverReport | null } | undefined;
    cap.river = s1?.river ?? null;
  }
  return { fixture: fixture.name, config, seed, size, blueprint, model: out.model, report: out.report, capture: cap };
}

/** The stage S1 runs under (for readers keying by id). */
export const S1_ID = STAGES.S1;
