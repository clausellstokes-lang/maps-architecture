// The spike city (M0-d-09; §16 M0 (d); C-0015: "a B-CITY city" at M0 is the spike city — the fusion spike's and the
// site-and-fields spike's CITY outputs through M0-x-02's runner, plus schema-shaped synthetic records for the digest
// tree; C-0268 (1)).
//
// At a seed the spike city is two derivations of the base registration table (M0-x-04's `registerBase`, run by
// M0-x-02's `run` over the ground arena `baseArena` — exactly `runBase`, with the arena kept in hand):
//   fusion  FLAT_BLUEPRINT  — the flat synthetic site at CITY: S4 routing + S5 growth + S8 infill (§16 M0 (c));
//   site    RIVER_BLUEPRINT — S1 with a river + S4 + S6 and the fields' pass 1 (§16 M0 (e)), and S3, S5, S8 between;
// and the synthetic records tree (./records.ts). `spikeRun` derives one of the two with the harness-side switches the
// runner's checks need, each OFF by default (an un-instrumented run is `runBase`'s, byte for byte — the tests hold it):
//   rerolls    M0-x-02's run option (C-0090: `{ S5: 1 }` re-draws S5, S6 and S8 from S4);
//   oracle     §6.2's CI oracle after EVERY committed batch (every batch the base's façade watch sees commit): the root
//              recomputed from nothing (fresh level digests) equals the root over the maintained level digests
//              (M0-d-04's `ModelDigest.oracle` on the run's arena), and at the end the run's own digest's oracle;
//   permute    M0-d-08's `permuteOps` on every declared batch of two ops or more (seeded per batch): §13.1's "a declared
//              batch's result identical under any permutation of its ops", judged on the whole run's digests;
//   renumber   M0-d-08's `renumberSlots` on the arena before S1 (the runner's kernel holds its arena for the run, and a
//              renumbering is a copy, so the slots are renamed where the run starts — C-0268 (6)).
// The two op-order switches carry M0-d-08's functions in (the stage table is bundled for the legs without the test kit).
import { canonicalText, ModelDigest } from '@plat/model';
import {
  baseArena,
  checkBaseBlueprint,
  createRegistry,
  FLAT_BLUEPRINT,
  registerBase,
  RIVER_BLUEPRINT,
  run,
  type BaseBatch,
  type BaseBlueprint,
  type GenerationReport,
  type PipelineContext,
  type PipelineModel,
  type PipelineStage,
} from '@plat/layout';
import { LaneWriter, type Hash128, type Kernel, type KernelTx, type Plat } from '@plat/kernel';

/** The two spikes of the spike city (C-0015), in the report's order. */
export const SPIKES = ['fusion', 'site'] as const;
export type SpikeName = (typeof SPIKES)[number];

/** The frame a spike derives on: CITY's own (both absent), or a smaller frame for a test (C-0264 (10)'s 900 ha form). */
export interface SpikeSize {
  readonly areaHa?: number;
  readonly walledHa?: number;
}

/** The spike city's size at CITY (the bench's default): the blueprints' own frame and walled land. */
export const CITY_SIZE: SpikeSize = Object.freeze({});

/** The base blueprint of a spike at a size. */
export function spikeBlueprint(spike: SpikeName, size: SpikeSize = CITY_SIZE): BaseBlueprint {
  const base = spike === 'fusion' ? FLAT_BLUEPRINT : RIVER_BLUEPRINT;
  return {
    ...base,
    size: { ...base.size, ...(size.areaHa === undefined ? {} : { areaHa: size.areaHa }) },
    ...(size.walledHa === undefined ? {} : { walledHa: size.walledHa }),
  };
}

/**
 * A spike run's switches (all off by default). The op-order switches carry M0-d-08's functions (`permuteOps`,
 * `renumberSlots`, handed in by the in-process checks, ./task.ts): the stage table is bundled for every cross-host leg,
 * and the test kit's barrel (its browser launcher among it) must not enter that bundle.
 */
export interface SpikeRunOptions {
  readonly size?: SpikeSize;
  readonly rerolls?: Readonly<Record<string, number>>;
  /** §6.2's CI oracle after every committed batch. */
  readonly oracle?: boolean;
  /** Every declared batch of two ops or more permuted (`apply`: M0-d-08's `permuteOps`), seeded `seed + batch index`. */
  readonly permute?: { readonly seed: number; readonly apply: (tx: KernelTx, seed: number) => KernelTx };
  /** The arena's slots renumbered before S1 (`apply`: M0-d-08's `renumberSlots`). */
  readonly renumber?: { readonly seed: number; readonly apply: (plat: Plat, seed: number) => Plat };
  /** A test's hook after every committed batch, before the oracle reads the arena (a negative control tampers here). */
  readonly afterBatch?: (plat: Plat, batch: number) => void;
}

/** Where the oracle first failed. */
export interface OracleMiss {
  readonly stage: string;
  /** The committed batch's index in the run (0-based). */
  readonly batch: number;
}

/** The oracle's tally over one run (null when the switch was off). */
export interface OracleTally {
  /** Committed batches after which the full recomputation was compared. */
  readonly batches: number;
  readonly mismatches: number;
  readonly first: OracleMiss | null;
  /** The run's own digest at the end: its maintained root equals its recomputation (M0-d-04's `oracle()`). */
  readonly end: boolean;
}

/** One spike derivation and what the runner reads from it. */
export interface SpikeRun {
  readonly spike: SpikeName;
  readonly seed: number;
  readonly model: PipelineModel;
  readonly report: GenerationReport;
  /** The model digest's root at each stage's end, in the order the stages ran, as hex. */
  readonly stageRoots: readonly (readonly [string, string])[];
  /** The model digest's root at the end, as hex. */
  readonly root: string;
  /** H128 of the generation report's canonical text, as hex (the report is compared like a digest). */
  readonly reportDigest: string;
  /** The bugs the report holds (refused stages, §5.1 (8)), as `<stage>:<code>`. */
  readonly bugs: readonly string[];
  readonly oracle: OracleTally | null;
  /** Declared batches whose ops were permuted (0 when the switch was off). */
  readonly permuted: number;
  /** Committed batches (every commit the runner observed). */
  readonly commits: number;
}

/** A text's digest as hex: H128 over its lanes (M0-d-02's LaneWriter: the byte count, then the UTF-8 bytes). */
export function textDigest(text: string): string {
  return hex128(new LaneWriter().utf8(text).digest());
}

/** An H128 as 32 lower-case hexadecimal digits, word 0 first (the cross-host harness's digest form). */
export function hex128(h: Readonly<Hash128>): string {
  let s = '';
  for (let i = 0; i < 4; i += 1) s += ((h[i] as number) >>> 0).toString(16).padStart(8, '0');
  return s;
}

/** The kernel with `tx` permuting a declared batch's ops, counting what it permuted. */
function permuting(kernel: Kernel, seed: number, apply: (tx: KernelTx, seed: number) => KernelTx, count: { n: number }): Kernel {
  const tx = ((spec: KernelTx, fn?: Parameters<Kernel['tx']>[1]) => {
    if (fn === undefined && spec.ops.length >= 2) {
      const at = count.n;
      count.n += 1;
      return kernel.tx(apply(spec, (seed + at) >>> 0), fn);
    }
    return kernel.tx(spec, fn);
  }) as Kernel['tx'];
  return Object.freeze({ ...kernel, tx }) as Kernel;
}

/** A registered stage whose context's kernel permutes declared batches. */
function permutedStage(stage: PipelineStage, seed: number, apply: (tx: KernelTx, seed: number) => KernelTx, count: { n: number }): PipelineStage {
  return Object.freeze({
    ...stage,
    run: (input: unknown, ctx: PipelineContext) => stage.run(input, { ...ctx, kernel: permuting(ctx.kernel, seed, apply, count) }),
  }) as PipelineStage;
}

/**
 * Derives one spike at `seed` (the base registration table through M0-x-02's runner, over the ground arena) with the
 * switches asked for; an un-instrumented run equals `runBase(spikeBlueprint(spike, size), seed, { kind: 'all' })`.
 */
export function spikeRun(spike: SpikeName, seed: number, opts: SpikeRunOptions = {}): SpikeRun {
  const bp = spikeBlueprint(spike, opts.size);
  checkBaseBlueprint(bp);
  const registry = createRegistry();
  let commits = 0;
  let checked = 0;
  let mismatches = 0;
  let first: OracleMiss | null = null;
  let plat: Plat | null = null;
  // Every batch a base stage sends through the façade is watched (M0-x-04's `onBatch`): each committed one is counted
  // and, with the oracle on, followed by §6.2's CI oracle on the arena as the batch left it — the root over the
  // maintained level digests (M0-d-04's listener updated them at the commit) against the root recomputed from nothing.
  const onBatch = (b: BaseBatch): void => {
    if (!b.committed) return;
    const at = commits;
    commits += 1;
    if (plat !== null) opts.afterBatch?.(plat, at);
    if (opts.oracle !== true || plat === null) return;
    const d = new ModelDigest();
    d.addArena(plat);
    checked += 1;
    if (!d.oracle().ok) {
      mismatches += 1;
      if (first === null) first = { stage: b.sub, batch: at };
    }
  };
  registerBase(registry, { onBatch });
  const count = { n: 0 };
  if (opts.permute !== undefined) {
    const product = registry.products.get('base');
    if (product === undefined) throw new Error('spike: the registry holds no base product');
    const { seed: pseed, apply } = opts.permute;
    for (let i = 0; i < product.stages.length; i += 1) product.stages[i] = permutedStage(product.stages[i] as PipelineStage, pseed, apply, count);
  }
  const arenas = (): readonly Plat[] => {
    let p = baseArena(bp);
    if (opts.renumber !== undefined) p = opts.renumber.apply(p, opts.renumber.seed);
    plat = p;
    return [p];
  };
  const { model, report } = run(registry, { ...bp, seed }, { kind: 'all' }, { arenas, ...(opts.rerolls === undefined ? {} : { rerolls: opts.rerolls }) });
  const oracle: OracleTally | null = opts.oracle === true ? Object.freeze({ batches: checked, mismatches, first, end: model.digest.oracle().ok }) : null;
  return Object.freeze({
    spike,
    seed,
    model,
    report,
    stageRoots: Object.freeze([...model.stageRoots].map(([name, h]) => Object.freeze([name, hex128(h)] as const))),
    root: hex128(model.root),
    reportDigest: textDigest(canonicalText(report)),
    bugs: Object.freeze(report.bugs.map((b) => `${b.stage}:${b.cls}`)),
    oracle,
    permuted: count.n,
    commits,
  });
}
