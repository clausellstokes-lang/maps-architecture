// The real measurement of every timing bar (M0-t-00; C-0115): each bar's batches call its item's EXPORTED entry — the
// kernel's operations, the harnesses' derivations and workloads, the model package's timing harnesses — and never
// re-implement a workload. Each batch is stamped by M0-f-01's `timeBatch` (directly, or inside a harness entry that calls
// it with the protocol's options); the protocol (protocol.ts) re-queues what is not a result and normalises the rest.
// No test runs anything here (C-0105, C-0115): the tests hand the script FIXTURE groups with planted timings, and the
// checker reads this file to confirm each bar's real entry. The timing-phase run (M0-t-01) alone runs it.
// Hardening round S1 (notes 2, 4 – 6; RL10 (c); the session's ruling on Q4, J725): each real group takes its per-item
// work as an injectable function — the derivation call, s11Workload, runCrossHost, the clock — whose defaults are the
// real entries (`FUSION_DEPS`, `SITE_DEPS`, `CHROMIUM_DEPS`, corridorUnionSeed, s11Workload; wiring.test.ts reads them),
// so the tests drive the REAL groups' fold code on planted derivations. ONE RULE for the fusion gate, the corridorUnion
// CITY set and the site gate (Q4): a seed whose derivation refuses, throws or never reaches the stages a figure needs is
// EXCLUDED from that figure's pool and NAMED (protocol.ts `Exclusion`: the stage reached, the stages missing, the
// refusal's code and message), the figure the quantile over the seeds that reached — unmeasured only when none did;
// never summed as 0, never a whole block dropped for one seed. The Chromium leg's bundle is built with M0-d-06's
// production option (C-0466) and scanned, its build recorded with each batch (RL10 (c)). streamKeyGroup is untouched
// (the mixer census, kernel/test/facade/mixer.test.ts: its one streamKey call and the one import stay as they are).
import { fileURLToPath } from 'node:url';
import {
  attachIndex,
  corridorUnion,
  createPlat,
  createRng,
  insertChain,
  insertTx,
  splitFace,
  STAGES,
  streamKey,
  type Cm,
  type ConcernId,
  type Frame,
  type Hash128,
  type KernelTx,
  type LatticePoint,
  type PlatKey,
  type StageId,
  type StreamOpts,
} from '@plat/kernel';
import { chainRuns, districtCells, runS8, spineWidthsOf } from '@plat/layout';
import { syntheticCity, syntheticSet, timeDigest, timeMatch, type SyntheticName } from '@plat/model';
import { buildCrossHostBundles, crossHostFixtureFrom, runCrossHost, type CrossHostBundles } from '@plat/testkit';
import { faceDistrict } from '../bentcut/district.js';
import { faceAt, FCUT_KINDS } from '../bentcut/faces.js';
import { depthOneLimits, districtSeed, NO_DEEP } from '../bentcut/runs.js';
import { rederive, S5_REROLL, timedPair } from '../determinism/rederive.js';
import { spikeRun } from '../determinism/spike.js';
import { s11Workload } from '../fuzz-bar/s11Workload.js';
import { BAR_SEEDS } from '../fusion/report.js';
import { widthMap } from '../fusion/measure.js';
import { derive, GROUND as FUSION_GROUND, type Derivation } from '../fusion/runs.js';
import { deriveSpike, SPIKE_STAGES, type SpikeDerivation } from '../site/compose.js';
import { SITE_FIXTURES, type SiteFixture } from '../site/fixtures.js';
import { gateMs, stageTimesOf, timeHydrology, type StageTimes } from '../site/timing.js';
import { loadCorpus, timeCorpus } from '../skeleton/runner.js';
import type { TimedValue } from '../timing/harness.js';
import { SITE_GATE_FIXTURES } from './bars.js';
import { legBuildOf } from './bundle.js';
import { CHROMIUM, quantile, type BatchHarness, type BatchOutput, type BatchPlan, type Exclusion, type Group, type Samples } from './protocol.js';

/** The site spike's default seed count (M0-e-06's `DEFAULT_SEEDS`; read from its harness at the call, never copied). */
async function siteSeeds(): Promise<number> {
  const m = await import('../site/index.js');
  return m.DEFAULT_SEEDS;
}

const ns = (): bigint => process.hrtime.bigint();
const msSince = (t0: bigint): number => Number(process.hrtime.bigint() - t0) / 1e6;

/** The harness-side clock a group times its derivation calls with (ns; a test's planted clock). */
export type Clock = () => bigint;

/** A run's refused stages (M0-x-02's `PipelineModel.refusals`): the code and the detail, by stage name. */
export type Refusals = ReadonlyMap<string, { readonly code: string; readonly detail: string }>;

const errText = (e: unknown): string => (e instanceof Error ? e.message : String(e));

/** A seed whose call threw: excluded from `keys`, named with the throw (Q4). */
function threw(seed: number, keys: readonly string[], e: unknown, fixture?: string): Exclusion {
  return { seed, ...(fixture === undefined ? {} : { fixture }), keys, reached: null, missing: [], code: 'threw', message: `the derivation threw: ${errText(e)}` };
}

/** A seed whose derivation stamped some stages and not others: excluded from `keys`, named with its refusals (Q4). */
function notReached(seed: number, keys: readonly string[], reached: string | null, missing: readonly string[], refusals: Refusals, fixture?: string): Exclusion {
  const refused = [...refusals];
  const said = refused.map(([stage, r]) => `${stage} refused ${r.code}: ${r.detail}`);
  return {
    seed,
    ...(fixture === undefined ? {} : { fixture }),
    keys,
    reached,
    missing,
    code: refused[0]?.[1].code ?? null,
    message: `stamped no ${missing.join(', ')}${reached === null ? '' : ` (reached ${reached})`}${said.length === 0 ? '' : `; ${said.join('; ')}`}`,
  };
}
const range = (from: number, n: number): number[] => Array.from({ length: n }, (_, i) => from + i);

/** A batch whose figure the workload measures itself (a TimedValue), its samples collected in the closure. */
async function stamped(h: BatchHarness, label: string, unit: TimedValue['unit'], work: () => { value: number; samples: Samples; extra?: Record<string, unknown>; excluded?: Exclusion[] }): Promise<BatchOutput> {
  let samples: Samples = {};
  let extra: Record<string, unknown> | undefined;
  let excluded: Exclusion[] = [];
  const stamp = await h.timeBatch(
    () => {
      const r = work();
      samples = r.samples;
      extra = r.extra;
      excluded = r.excluded ?? [];
      return { value: r.value, unit } satisfies TimedValue;
    },
    { ...h.options, label, unit },
  );
  return { stamp, samples, ...(extra === undefined ? {} : { extra }), ...(excluded.length === 0 ? {} : { excluded }) };
}

// ---------------------------------------------------------------------------------------------------------------------
// insert + snap + attract + re-walk per growth proposal (§12.4's S5 row; M0-a-05; C-0177 (16), M0-a-05's N-5)

const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 });
/** The insertion tests' ground frame (2 km square, margin share 0.3) and index grid (M0-a-04's support). */
const INSERT_FRAME: Frame = Object.freeze({ widthCm: 200_000 as Cm, heightCm: 200_000 as Cm, aspect: 1, marginShare: 0.3 });
const INSERT_CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];
export const INSERT_PROPOSALS = 2_000;

const pt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/**
 * insertChain.test.ts's workload through the kernel's exported entries: a 200 m L0 frame, 9 + 9 L1 streets, then
 * INSERT_PROPOSALS two-point optional L2 proposals into the one arena (no stage-end rebuild), drawn by the test's LCG from
 * `seed`; the proposals alone are timed. Returns µs per proposal and how many committed.
 */
export function insertProposals(seed: number): { us: number; committed: number } {
  const p = createPlat(GROUND, INSERT_FRAME);
  attachIndex(p, { gridCellCm: INSERT_CELLS });
  const side = 20_000;
  const frame = insertChain(insertTx(p, 0), [pt(0, 0), pt(side, 0), pt(side, side), pt(0, side)], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!frame.ok) throw new Error(`insert workload: the frame ring was refused: ${frame.code} ${frame.detail}`);
  for (let i = 1; i < 10; i++) insertChain(insertTx(p, 1), [pt(i * 2000, 50), pt(i * 2000 + 37, 19_950)], [{ role: 'way', entity: `way:v${String(i)}` }], 'mandatory');
  for (let i = 1; i < 10; i++) insertChain(insertTx(p, 1), [pt(50, i * 2000), pt(19_950, i * 2000 + 29)], [{ role: 'way', entity: `way:h${String(i)}` }], 'mandatory');
  let x = seed;
  const rnd = (): number => {
    x = ((Math.imul(x, 48_271) % 2_147_483_647) + 2_147_483_647) % 2_147_483_647;
    return x / 2_147_483_647;
  };
  let committed = 0;
  const t0 = ns();
  for (let k = 0; k < INSERT_PROPOSALS; k++) {
    const ax = 200 + rnd() * 19_600;
    const ay = 200 + rnd() * 19_600;
    const r = insertChain(insertTx(p, 2), [pt(Math.round(ax), Math.round(ay)), pt(Math.round(ax + (rnd() - 0.5) * 1500), Math.round(ay + (rnd() - 0.5) * 1500))], [{ role: 'kerb', entity: `way:g${String(k)}` }], 'optional');
    if (r.ok) committed += 1;
  }
  return { us: (msSince(t0) * 1000) / INSERT_PROPOSALS, committed };
}

export function insertGroup(seeds: readonly number[] = [12_345, 23_456, 34_567, 45_678, 56_789]): Group {
  return {
    id: 'insert',
    plans: seeds.map((seed) => ({
      label: `insert: ${String(INSERT_PROPOSALS)} proposals (LCG seed ${String(seed)})`,
      run: (h) =>
        stamped(h, `insert per proposal (seed ${String(seed)})`, 'µs', () => {
          const r = insertProposals(seed);
          return { value: r.us, samples: { insert: [r.us] }, extra: { seed, committed: r.committed } };
        }),
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// splitFace per bent cut (§12.4's S8 row; M0-a-07, M0-b-03; the F-CUT faces of M0-b-04)

/** The F-CUT faces' seed (bentcut's own `--seed` default is 1). */
export const FCUT_SEED = 1;

const NO_REPORT = { report: undefined } as never;

const l1Spec = (): KernelTx => ({ key: FUSION_GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000_000 });

/**
 * One F-CUT face's bent cut through the kernel's `splitFace`, timed alone: the face's one-face district (M0-b-04's
 * `faceDistrict`, the F-CUT phase's depth-one limits) runs S8 once to learn the cut S8 commits (its first lane's
 * committed chain); a fresh copy of the same district then takes that chain through `splitFace` in an L1 batch, the
 * call alone timed (µs). Null with the reason when the face is no S8 input, S8 refuses it, its ladder ends without a
 * cut or in a slit (connectHole, not splitFace), or the replayed split is refused (each counted, never timed).
 */
export function splitFaceCut(kind: (typeof FCUT_KINDS)[number], i: number): { us: number | null; why: string | null } {
  const face = faceAt(kind, i, FCUT_SEED);
  const seed = districtSeed(kind, FCUT_SEED, i);
  const opts = { workLimits: depthOneLimits(), deepFactor: NO_DEEP };
  let fd;
  try {
    fd = faceDistrict(face.polygon, seed, opts);
  } catch (e) {
    return { us: null, why: `setup: ${e instanceof Error ? e.message : String(e)}` };
  }
  const r = runS8(fd.input, NO_REPORT);
  if (!r.ok) return { us: null, why: `S8 refused: ${r.code}` };
  const top = r.value.infill.report.districts[0]?.faces.find((f) => f.depth === 0);
  if (top?.outcome === 'slit') return { us: null, why: 'a slit: connectHole, no splitFace' };
  const lane = r.value.lanes[0];
  if (top?.outcome !== 'cut' || lane === undefined) return { us: null, why: `no cut: ${top?.outcome ?? 'no ladder'}` };
  const runs = chainRuns(fd.plat, FUSION_GROUND, { role: 'way', entity: lane.id });
  if (runs.length !== 1) return { us: null, why: `the cut's chain in ${String(runs.length)} runs` };
  const fresh = faceDistrict(face.polygon, seed, opts);
  const cells = districtCells(fresh.plat, fresh.district);
  if (cells.length !== 1) return { us: null, why: `the fresh district has ${String(cells.length)} faces` };
  let us: number | null = null;
  let why: string | null = null;
  fresh.k.tx(l1Spec(), (o) => {
    const t0 = ns();
    const s = splitFace(o, cells[0], runs[0], { rows: [{ role: 'way', entity: lane.id }] });
    const t = msSince(t0) * 1000;
    if (s.ok) us = t;
    else why = `the replayed split refused: ${s.code}`;
    return s.ok ? { ok: true as const, value: undefined, warnings: [] } : s;
  });
  return { us, why };
}

export function splitFaceGroup(faces = 400): Group {
  return {
    id: 'splitFace',
    blocks: {
      items: range(0, faces),
      first: 4,
      make: (block) => ({
        label: `splitFace: F-CUT faces ${String(block[0])} … ${String(block[block.length - 1])} (${FCUT_KINDS.join(' + ')})`,
        run: (h) =>
          stamped(h, `splitFace per cut, ${String(block.length * FCUT_KINDS.length)} F-CUT faces`, 'µs', () => {
            const per: number[] = [];
            const skipped: Record<string, number> = {};
            for (const i of block) {
              for (const kind of FCUT_KINDS) {
                const c = splitFaceCut(kind, i);
                if (c.us !== null) per.push(c.us);
                else {
                  const k = (c.why ?? 'unknown').split(':')[0];
                  skipped[k] = (skipped[k] ?? 0) + 1;
                }
              }
            }
            const refused = Object.entries(skipped).filter(([k]) => k !== 'no cut' && k !== 'a slit').reduce((a, [, n]) => a + n, 0);
            return { value: quantile(per, 0.5) ?? Number.NaN, samples: { splitFace: per }, extra: { faces: block.length * FCUT_KINDS.length, cuts: per.length, skipped, refused } };
          }),
      }),
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// corridorUnion: one district ≤ 3 ms; the CITY face set against §12.4's S9 row (§3.7 (ii); M0-a-09)

const s9Spec = (): KernelTx => ({ key: FUSION_GROUND, level: 2, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000_000 });

/** One seed's corridorUnion timings: the committed districts' ms, the refused count and the refusals' codes. */
export interface CorridorUnionSeed {
  readonly districts: number[];
  readonly refused: number;
  readonly codes: string[];
}

/** One seed's S9 commit on the fusion run (a)'s CITY face set, each district's corridorUnion timed (ms). */
export function corridorUnionSeed(seed: number): CorridorUnionSeed {
  const d = derive('fusion', seed);
  const k = d.model.kernel;
  const widths = spineWidthsOf(widthMap(d));
  const out: number[] = [];
  const codes: string[] = [];
  let refused = 0;
  for (const s of d.ins.standIns) {
    const t0 = ns();
    const r = k.tx(s9Spec(), (o) => corridorUnion(o, { owner: s.id, level: 1 }, widths));
    const ms = msSince(t0);
    if (r.ok) out.push(ms);
    else {
      refused += 1;
      codes.push(r.code);
    }
  }
  return { districts: out, refused, codes };
}

const CU_DISTRICT = 'corridorUnion:district';
const CU_CITY = 'corridorUnion:city';

/**
 * corridorUnion over the fusion CITY face set, per seed (note 5; Q4): a seed with a refused district leaves the CITY-set
 * pool, NAMED with its refused count and codes (its CITY set is not whole), while its committed districts stay in the
 * one-district pool; a seed whose derivation throws leaves both, named. `unionSeed` is the per-seed work (default the
 * real `corridorUnionSeed`).
 */
export function corridorUnionGroup(seeds: readonly number[] = range(1, 25), unionSeed: (seed: number) => CorridorUnionSeed = corridorUnionSeed): Group {
  return {
    id: 'corridorUnion',
    blocks: {
      items: seeds,
      make: (block) => ({
        label: `corridorUnion: the fusion CITY face set, seeds ${String(block[0])} … ${String(block[block.length - 1])}`,
        run: (h) =>
          stamped(h, `corridorUnion per district and per CITY face set (${String(block.length)} seeds)`, 'ms', () => {
            const district: number[] = [];
            const city: number[] = [];
            const excluded: Exclusion[] = [];
            const refusedBySeed: { seed: number; refused: number; codes: string[] }[] = [];
            let refused = 0;
            for (const seed of block) {
              let r: CorridorUnionSeed;
              try {
                r = unionSeed(seed);
              } catch (e) {
                excluded.push(threw(seed, [CU_DISTRICT, CU_CITY], e));
                continue;
              }
              district.push(...r.districts);
              refused += r.refused;
              if (r.refused > 0) {
                refusedBySeed.push({ seed, refused: r.refused, codes: [...r.codes] });
                excluded.push({
                  seed,
                  keys: [CU_CITY],
                  reached: 'S9',
                  missing: [],
                  code: r.codes[0] ?? null,
                  message: `${String(r.refused)} district(s) refused by corridorUnion (${[...new Set(r.codes)].join(', ') || 'no code'}): the seed's CITY set is not whole, so it leaves the CITY-set pool; its ${String(r.districts.length)} committed district(s) stay in the one-district pool`,
                });
              } else city.push(r.districts.reduce((a, b) => a + b, 0));
            }
            return {
              value: quantile(city, 0.5) ?? Number.NaN,
              samples: { [CU_DISTRICT]: district, [CU_CITY]: city },
              extra: { refused, ...(refusedBySeed.length === 0 ? {} : { refusedBySeed }) },
              excluded,
            };
          }),
      }),
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// S11's geometry share per plot (M0-k-04's synthetic workload, C-0107)

/** The workload's file (C-0107: the S11 row names it). */
export const S11_WORKLOAD_FILE = 'bench/src/fuzz-bar/s11Workload.ts';

/** The S11 bar's per-batch work: M0-k-04's `s11Workload` (the default; a test's planted workload, note 2). */
export type S11WorkloadFn = typeof s11Workload;

export function s11Group(seeds: readonly number[] = range(1, 8), plots = 500, workload: S11WorkloadFn = s11Workload): Group {
  return {
    id: 's11',
    plans: seeds.map((seed) => ({
      label: `S11 synthetic per-plot workload, seed ${String(seed)}, ${String(plots)} plots`,
      run: async (h): Promise<BatchOutput> => {
        const w = await workload(seed, plots, { timing: h.options });
        if (w.timings === null) throw new Error('s11Workload returned no stamp');
        const shapes = new Map<string, number>();
        for (const p of w.calls) {
          const ops = p.calls.map((c) => c.op).join(',');
          shapes.set(ops, (shapes.get(ops) ?? 0) + 1);
        }
        return {
          stamp: w.timings,
          samples: { s11: w.calls.map((c) => c.us) },
          extra: { workloadFile: S11_WORKLOAD_FILE, seed, plots: w.calls.length, callList: [...shapes].map(([ops, n]) => ({ ops: ops.split(','), plots: n })) },
        };
      },
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// the skeleton median per footprint on the stand-in corpus (§3.8; M0-a-11, M0-a-12)

export function skeletonGroup(): Group {
  return {
    id: 'skeleton',
    plans: (['roof', 'spine'] as const).map((use) => ({
      label: `skeleton (${use}) on the stand-in corpus`,
      run: async (h): Promise<BatchOutput> => {
        const corpus = loadCorpus();
        const stamp = await timeCorpus(corpus.faces, use, { batch: h.options });
        return { stamp, samples: { [`skeleton:${use}`]: [stamp.value] }, extra: { use, footprints: corpus.faces.length } };
      },
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// ≤ 0.1 µs per structured stream key (§6.1; M0-d-01) over the spike city's keys (M0-d-09)

interface KeyInput {
  readonly key: Hash128;
  readonly stage: StageId;
  readonly concern: ConcernId;
  readonly opts: StreamOpts;
}

/**
 * Every stream input a spike-city derivation asks createRng's stream for (the Rng class's `stream`, as M0-d-09's census
 * hooks it, bench-side and restored after), copied.
 */
export function spikeKeyInputs(seed: number): KeyInput[] {
  type StreamFn = (entityKey: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts) => unknown;
  const proto = Object.getPrototypeOf(createRng()) as { stream: StreamFn };
  const real = proto.stream;
  const inputs: KeyInput[] = [];
  proto.stream = function (this: unknown, entityKey, stage, concern, opts) {
    inputs.push({ key: [entityKey[0], entityKey[1], entityKey[2], entityKey[3]], stage, concern, opts: { ...opts } });
    return real.call(this, entityKey, stage, concern, opts);
  };
  try {
    spikeRun('fusion', seed);
    spikeRun('site', seed);
  } finally {
    proto.stream = real;
  }
  return inputs;
}

export const KEY_ROUNDS = 20;

export function streamKeyGroup(seeds: readonly number[] = [1, 2, 3]): Group {
  return {
    id: 'streamKey',
    plans: seeds.map((seed) => ({
      label: `streamKey over the spike city's keys (seed ${String(seed)})`,
      run: (h) => {
        const inputs = spikeKeyInputs(seed);
        return stamped(h, `streamKey per key (${String(inputs.length)} keys × ${String(KEY_ROUNDS)} rounds)`, 'µs', () => {
          const per: number[] = [];
          let sink = 0;
          for (let r = 0; r < KEY_ROUNDS; r++) {
            const t0 = ns();
            for (const k of inputs) sink ^= streamKey(k.key, k.stage, k.concern, k.opts)[0];
            per.push((msSince(t0) * 1000) / inputs.length);
          }
          if (sink === 0.5) throw new Error('unreachable');
          return { value: quantile(per, 0.5) ?? Number.NaN, samples: { streamKey: per }, extra: { seed, keys: inputs.length, rounds: KEY_ROUNDS } };
        });
      },
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// digest maintenance share, root finalisation, full recomputation (§6.2; M0-d-04)

export function digestGroup(seeds: readonly number[] = [1, 2, 3], repeats = 5): Group {
  return {
    id: 'digest',
    plans: seeds.map((seed) => ({
      label: `digest on the synthetic CITY workload (seed ${String(seed)}, ${String(repeats)} repeats)`,
      run: (h) => {
        const city = syntheticCity(seed);
        return stamped(h, `digest bars (seed ${String(seed)})`, 'ms', () => {
          const rec = timeDigest(city, () => performance.now(), repeats, 'timing-phase');
          return {
            value: quantile(rec.recompute.ms, 0.5) ?? Number.NaN,
            samples: {
              'digest:share': rec.maintenance.sharePct.filter((x): x is number => x !== null),
              'digest:finalise': [...rec.finalise.ms],
              'digest:recompute': [...rec.recompute.ms],
            },
            extra: { seed, workload: rec.workload, oracle: rec.oracle },
          };
        });
      },
    })),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// matching per point- and overlap-anchored entity (§6.3; M0-d-05b; M0-d-09's pairs, C-0090)

export const SYNTHETIC_SETS: readonly SyntheticName[] = ['district', 'city', 'city-unrelated', 'metropolis'];
export const MATCH_REPEATS = 5;
export const PAIR_SEEDS = 20;

export function matchingGroup(): Group {
  const synthetic: BatchPlan[] = SYNTHETIC_SETS.map((name) => ({
    label: `matching on the synthetic set ${name}`,
    run: (h) => {
      const set = syntheticSet(name, 1);
      return stamped(h, `matching (${name})`, 'µs', () => {
        const rec = timeMatch(set, () => performance.now(), MATCH_REPEATS, 'timing-phase');
        return {
          value: rec.overlap.medianUs,
          samples: { 'matching:synthetic:point': rec.point.entities > 0 ? [...rec.point.samplesUs] : [], 'matching:synthetic:overlap': rec.overlap.entities > 0 ? [...rec.overlap.samplesUs] : [] },
          extra: { set: name, perKind: rec.perKind.map((k) => ({ kind: k.kind, anchorClass: k.anchorClass, entities: k.entities, medianUs: k.medianUs })) },
        };
      });
    },
  }));
  const pairs: BatchPlan[] = [0, 1, 2, 3].map((b) => {
    const seeds = range(1 + b * 5, 5);
    return {
      label: `matching on M0-d-09's re-derivation pairs, seeds ${String(seeds[0])} … ${String(seeds[4])}`,
      run: (h) => {
        const tps = seeds.map((seed) => timedPair(rederive(seed, { rerolls: S5_REROLL })));
        return stamped(h, `matching (pairs ${String(seeds[0])} … ${String(seeds[4])})`, 'µs', () => {
          const point: number[] = [];
          const overlap: number[] = [];
          const perKind: unknown[] = [];
          for (const tp of tps) {
            const rec = timeMatch(tp, () => performance.now(), MATCH_REPEATS, 'timing-phase');
            if (rec.point.entities > 0) point.push(...rec.point.samplesUs);
            if (rec.overlap.entities > 0) overlap.push(...rec.overlap.samplesUs);
            perKind.push({ pair: tp.name, seed: tp.seed, kinds: rec.perKind.map((k) => ({ kind: k.kind, entities: k.entities, medianUs: k.medianUs })) });
          }
          return { value: quantile(overlap, 0.5) ?? Number.NaN, samples: { 'matching:pairs:point': point, 'matching:pairs:overlap': overlap }, extra: { pairs: seeds, perKind } };
        });
      },
    };
  });
  return { id: 'matching', plans: [...synthetic, ...pairs] };
}

// ---------------------------------------------------------------------------------------------------------------------
// the two gates and R12-4's rows: the Node leg (the harnesses' stage stamps) and the Chromium-worker leg (C-0082)

/** The fusion gate's stages and R12-4's fusion rows (C-0084). */
const FUSION_GATE = ['S4', 'S5', 'S8'] as const;
const FUSION_ROWS = ['S1', 'S3', 'S4', 'S5', 'S8'] as const;

/**
 * The fusion gate's S4 + S5 + S8 from one derivation's stage stamps; a gate stage with no stamp is refused (thrown: the
 * batch is dropped and the bar unmeasured, re-run with --only) — never summed as 0 into a figure that looks measured.
 */
export function fusionGateOf(stamps: ReadonlyMap<string, number>, seed: number): number {
  let gate = 0;
  for (const g of FUSION_GATE) {
    const v = stamps.get(g);
    if (v === undefined || !Number.isFinite(v)) throw new Error(`timing-phase: the fusion run (a), seed ${String(seed)}, stamped no ${g}: the gate is not measured`);
    gate += v;
  }
  return gate;
}

/** The fusion Node leg's per-seed work (note 2, 4): the derivation call, what the fold reads of it, the clock. */
export interface FusionDeps {
  readonly derive: (seed: number) => unknown;
  readonly stamps: (d: unknown) => ReadonlyMap<string, number>;
  readonly refusals: (d: unknown) => Refusals;
  readonly clock: Clock;
}

/** The real entries: M0-c-06's derive('fusion', seed), its stage stamps and its run's refusals, the hrtime clock. */
export const FUSION_DEPS: FusionDeps = Object.freeze({
  derive: (seed: number): unknown => derive('fusion', seed),
  stamps: (d: unknown): ReadonlyMap<string, number> => (d as Derivation).ins.stamps,
  refusals: (d: unknown): Refusals => (d as Derivation).model.refusals,
  clock: ns,
});

const finiteStamp = (stamps: ReadonlyMap<string, number>, stage: string): boolean => {
  const v = stamps.get(stage);
  return v !== undefined && Number.isFinite(v);
};

/**
 * The fusion run (a) on a block of seeds, in Node: the gate, the derivation call and every stage per seed. Per seed, not
 * per block (note 4; Q4): a seed whose derivation throws, or stamps no S4, S5 or S8, is excluded from the gate's pool and
 * named (`fusionGateOf` sums only a seed that stamped all three); the gate is the p50 over the seeds that reached S8.
 */
export function fusionNodeGroup(seeds: readonly number[] = range(1, BAR_SEEDS), deps: FusionDeps = FUSION_DEPS): Group {
  return {
    id: 'fusion:node',
    blocks: {
      items: seeds,
      make: (block) => ({
        label: `fusion run (a), Node, seeds ${String(block[0])} … ${String(block[block.length - 1])}`,
        run: (h) =>
          stamped(h, `fusion gate S4 + S5 + S8 (${String(block.length)} seeds)`, 'ms', () => {
            const s: Samples = { 'fusion:gate': [], 'fusion:call': [] };
            for (const r of FUSION_ROWS) s[`fusion:${r}`] = [];
            const excluded: Exclusion[] = [];
            for (const seed of block) {
              const t0 = deps.clock();
              let d: unknown;
              try {
                d = deps.derive(seed);
              } catch (e) {
                excluded.push(threw(seed, ['fusion:gate', 'fusion:call', ...FUSION_ROWS.map((r) => `fusion:${r}`)], e));
                continue;
              }
              s['fusion:call'].push(Number(deps.clock() - t0) / 1e6);
              const stamps = deps.stamps(d);
              const missingGate = FUSION_GATE.filter((g) => !finiteStamp(stamps, g));
              if (missingGate.length === 0) s['fusion:gate'].push(fusionGateOf(stamps, seed));
              for (const r of FUSION_ROWS) {
                const v = stamps.get(r);
                if (v !== undefined) s[`fusion:${r}`].push(v);
              }
              const missingRows = FUSION_ROWS.filter((r) => !finiteStamp(stamps, r));
              if (missingGate.length > 0 || missingRows.length > 0) {
                const reached = [...stamps.keys()].filter((k) => finiteStamp(stamps, k)).pop() ?? null;
                const missing = [...new Set([...missingGate, ...missingRows])];
                excluded.push(notReached(seed, [...(missingGate.length > 0 ? ['fusion:gate'] : []), ...missingRows.map((r) => `fusion:${r}`)], reached, missing, deps.refusals(d)));
              }
            }
            return { value: quantile(s['fusion:gate'], 0.5) ?? Number.NaN, samples: s, excluded };
          }),
      }),
    },
  };
}

const siteFixture = (name: string): SiteFixture => {
  const f = SITE_FIXTURES.find((x) => x.name === name);
  if (f === undefined) throw new Error(`timing-phase: no site fixture ${name}`);
  return f;
};

/** (fixture index, seed) pairs as one item number, so one adaptive block list covers both fixtures. */
const PAIR_BASE = 1_000_000;

/** The site Node leg's per-derivation work (notes 2, 6): the derivation call, what the fold reads of it, the clock. */
export interface SiteDeps {
  readonly derive: (fixture: string, seed: number) => unknown;
  readonly stageTimes: (d: unknown) => StageTimes;
  readonly hydrology: (d: unknown) => { readonly ms: number } | null;
  readonly refusals: (d: unknown) => Refusals;
  readonly clock: Clock;
}

/** The real entries: M0-e-06's deriveSpike (default configuration, CITY), stageTimesOf, timeHydrology, the hrtime clock. */
export const SITE_DEPS: SiteDeps = Object.freeze({
  derive: (fixture: string, seed: number): unknown => deriveSpike(siteFixture(fixture), seed, 'default', 'city'),
  stageTimes: (d: unknown): StageTimes => stageTimesOf(d as SpikeDerivation),
  hydrology: (d: unknown): { readonly ms: number } | null => timeHydrology(d as SpikeDerivation, false),
  refusals: (d: unknown): Refusals => (d as SpikeDerivation).model.refusals,
  clock: ns,
});

/** R12-4's site rows (C-0084) and the gate's stages: the stages an excluded derivation is named against. */
const SITE_ROWS = ['S1', 'S3', 'S4', 'S6'] as const;
const SITE_GATE = ['S1', 'S4', 'S6'] as const;

/**
 * The site spike's derivations, in Node: per fixture, the gate, the call, the stage times and the hydrology row. A
 * derivation that did not reach S6 is excluded from the gate (`gateMs` null, M0-e-06's own fold) and NAMED per fixture
 * with the stage it reached and its refusal (note 6; Q4); one that throws is excluded from every pool, named.
 */
export async function siteNodeGroup(seedCount?: number, deps: SiteDeps = SITE_DEPS): Promise<Group> {
  const n = seedCount ?? (await siteSeeds());
  const items = SITE_GATE_FIXTURES.flatMap((_, fi) => range(1, n).map((seed) => fi * PAIR_BASE + seed));
  return {
    id: 'site:node',
    blocks: {
      items,
      make: (block) => ({
        label: `site spike, Node, ${String(block.length)} derivation(s) from ${SITE_GATE_FIXTURES[Math.floor(block[0] / PAIR_BASE)]} seed ${String(block[0] % PAIR_BASE)}`,
        run: (h) =>
          stamped(h, `site gate S1 + S4 + S6 (${String(block.length)} derivations)`, 'ms', () => {
            const s: Samples = {};
            const push = (k: string, v: number): void => void (s[k] ??= []).push(v);
            const gates: number[] = [];
            const excluded: Exclusion[] = [];
            for (const item of block) {
              const name = SITE_GATE_FIXTURES[Math.floor(item / PAIR_BASE)];
              const seed = item % PAIR_BASE;
              const t0 = deps.clock();
              let d: unknown;
              try {
                d = deps.derive(name, seed);
              } catch (e) {
                excluded.push(threw(seed, ['gate', 'call', 'hydrology', ...SITE_ROWS].map((k) => `site:${name}:${k}`), e, name));
                continue;
              }
              push(`site:${name}:call`, Number(deps.clock() - t0) / 1e6);
              const t = deps.stageTimes(d);
              const g = gateMs(t);
              if (g !== null) {
                push(`site:${name}:gate`, g);
                gates.push(g);
              }
              for (const [stage, ms] of Object.entries(t)) push(`site:${name}:${stage}`, ms);
              const hyd = deps.hydrology(d);
              if (hyd !== null) push(`site:${name}:hydrology`, hyd.ms);
              const missingRows = SITE_ROWS.filter((r) => t[r] === undefined);
              if (g === null || missingRows.length > 0 || hyd === null) {
                const reached = SPIKE_STAGES.filter((st) => t[st] !== undefined).pop() ?? null;
                const missing = [...new Set([...SITE_GATE.filter((st) => t[st] === undefined), ...missingRows])];
                const keys = [...(g === null ? ['gate'] : []), ...missingRows, ...(hyd === null ? ['hydrology'] : [])].map((k) => `site:${name}:${k}`);
                const x = notReached(seed, keys, reached, missing, deps.refusals(d), name);
                excluded.push(missing.length === 0 ? { ...x, message: `no hydrology row (the terrain before the carve was not captured)${reached === null ? '' : ` (reached ${reached})`}` } : x);
              }
            }
            return { value: quantile(gates, 0.5) ?? Number.NaN, samples: s, excluded };
          }),
      }),
    },
  };
}

/** The Chromium leg's stage table (inside plat/; bundled by M0-d-06's runner for the browser). */
export const GATE_STAGES_ENTRY = 'bench/src/timing-phase/gate-stages.ts';

/**
 * One Chromium-worker batch: M0-d-06's runner in its timing mode on the gate stage table, Chromium with workers on (the
 * Web Worker), the browser launched inside the batch and closed before the after-batch calibrate; its processes are the
 * phase's own (`ownPids`, C-0082). The samples are each seed's derivation call (the harness's clock around the call).
 */
function chromiumPlan(label: string, stage: string, key: string, seeds: readonly number[], deps: ChromiumDeps): BatchPlan {
  return {
    label,
    leg: CHROMIUM,
    run: async (h): Promise<BatchOutput> => {
      const b = await deps.bundles();
      const own: number[] = [];
      const fixture = crossHostFixtureFrom({ id: `timing-phase-${stage}`, entry: GATE_STAGES_ENTRY, seeds: [...seeds], stages: [stage] }, `bench:timing-phase ${stage}`);
      let calls: number[] = [];
      let problem: string | null = null;
      const excluded: Exclusion[] = [];
      const stamp = await h.timeBatch(
        async () => {
          const report = await deps.runCrossHost(fixture, {
            legs: ['chromium'],
            workers: ['on'],
            timing: true,
            bundles: b,
            onChild: (pid) => {
              own.push(pid);
              h.own(pid);
            },
          });
          const run = report.runs[0];
          if (run === undefined || run.status !== 'ran' || run.cells === undefined) {
            problem = `the Chromium worker leg did not run: ${run?.status ?? 'no run'} ${run?.reason ?? ''}`.trim();
            calls = [];
          } else {
            // a cell that threw (or gave no timing) is EXCLUDED and named, never the whole batch (Q4; note 4's rule on
            // the Chromium leg); a leg that did not run drops the batch, naming it
            for (const c of run.cells) {
              if (c.error !== undefined) excluded.push({ seed: c.seed ?? -1, keys: [key], reached: null, missing: [], code: 'threw', message: `the stage call threw in the worker: ${c.error}` });
              else if (c.ms === undefined) excluded.push({ seed: c.seed ?? -1, keys: [key], reached: null, missing: [], code: null, message: 'the worker gave no timing for the call' });
            }
            calls = run.cells.filter((c) => c.error === undefined && c.ms !== undefined).map((c) => c.ms as number);
          }
          return { value: quantile(calls, 0.5) ?? Number.NaN, unit: 'ms' } satisfies TimedValue;
        },
        { ...h.options, label, unit: 'ms', ownPids: () => own },
      );
      if (problem !== null) throw new Error(problem);
      return { stamp, samples: { [key]: calls }, build: legBuildOf(b.browser, CHROMIUM_BUNDLE), ...(excluded.length === 0 ? {} : { excluded }) };
    },
  };
}

/** What a Chromium batch's build is read from (RL10 (c)). */
export const CHROMIUM_BUNDLE = "the Chromium worker's bundle (M0-d-06's buildCrossHostBundles with { production: true }, C-0466), scanned";

/** The Chromium leg's per-batch work (note 2): M0-d-06's runner and the gate table's bundles. */
export interface ChromiumDeps {
  readonly runCrossHost: typeof runCrossHost;
  readonly bundles: () => Promise<CrossHostBundles>;
}

/** The path of the Chromium leg's stage table (bundled by M0-d-06's bundler). */
export const GATE_STAGES_PATH = fileURLToPath(new URL('./gate-stages.ts', import.meta.url));

/**
 * The bundles of the gate stage table, built once per run (an output generated from plat/ sources, C-0067) with M0-d-06's
 * production option (C-0466; the session's ruling on Q3, J725): PLAT_DEBUG_BUILD defined false, so the Chromium leg is a
 * production build as the Node leg's bundle is (RL10 (c)).
 */
export function bundleCache(): () => Promise<CrossHostBundles> {
  let p: Promise<CrossHostBundles> | null = null;
  return () => (p ??= buildCrossHostBundles(GATE_STAGES_PATH, { production: true }));
}

/** The real entries: M0-d-06's runCrossHost, the production bundles built once per group. */
export const CHROMIUM_DEPS = (): ChromiumDeps => ({ runCrossHost, bundles: bundleCache() });

export function fusionChromiumGroup(seeds: readonly number[] = range(1, BAR_SEEDS), deps: ChromiumDeps = CHROMIUM_DEPS()): Group {
  return {
    id: 'fusion:chromium',
    blocks: {
      items: seeds,
      make: (block) => chromiumPlan(`fusion run (a), Chromium worker, seeds ${String(block[0])} … ${String(block[block.length - 1])}`, 'fusion.call', 'fusion:call', block, deps),
    },
  };
}

export async function siteChromiumGroup(seedCount?: number, deps: ChromiumDeps = CHROMIUM_DEPS()): Promise<Group> {
  const n = seedCount ?? (await siteSeeds());
  const plans: BatchPlan[] = [];
  for (const name of SITE_GATE_FIXTURES) {
    for (let from = 1; from <= n; from += 10) {
      const block = range(from, Math.min(10, n - from + 1));
      plans.push(chromiumPlan(`site spike ${name}, Chromium worker, seeds ${String(block[0])} … ${String(block[block.length - 1])}`, `site.${name}.call`, `site:${name}:call`, block, deps));
    }
  }
  return { id: 'site:chromium', plans };
}

/** Every real group by id (the tiers' group is tiers.ts's). */
export async function realGroup(id: string): Promise<Group> {
  switch (id) {
    case 'insert':
      return insertGroup();
    case 'splitFace':
      return splitFaceGroup();
    case 'corridorUnion':
      return corridorUnionGroup();
    case 's11':
      return s11Group();
    case 'skeleton':
      return skeletonGroup();
    case 'streamKey':
      return streamKeyGroup();
    case 'digest':
      return digestGroup();
    case 'matching':
      return matchingGroup();
    case 'fusion:node':
      return fusionNodeGroup();
    case 'fusion:chromium':
      return fusionChromiumGroup();
    case 'site:node':
      return siteNodeGroup();
    case 'site:chromium':
      return siteChromiumGroup();
    default:
      throw new Error(`timing-phase: no group ${JSON.stringify(id)}`);
  }
}

/** The group ids `realGroup` builds (the checker's list: every bar's group but the tiers' resolves to a real entry). */
export const REAL_GROUPS = ['insert', 'splitFace', 'corridorUnion', 's11', 'skeleton', 'streamKey', 'digest', 'matching', 'fusion:node', 'fusion:chromium', 'site:node', 'site:chromium'] as const;
