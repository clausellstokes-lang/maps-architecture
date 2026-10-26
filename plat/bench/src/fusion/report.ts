// FusionGateReport — the fold of the seed records into the gate's report and its numbers-only summary (M0-c-06; §16
// M0 (c), §4.4's gate, §13.5, §13.2, §12.4; C-0016, C-0067, C-0084, C-0091, C-0094; readings C-0270).
//
// The report holds no wall-clock: it is a function of the seed records' measurements alone, so the same seeds give the
// same report byte for byte whatever the worker count (the item's test). The per-stage stamps are folded apart
// (`StampFold`): CONTENDED outside the timing phase, never judged here, carried by the summary for R12-4 with their
// authority (C-0084).
//
// The here-bars judged (each on every seed of its run unless named pooled):
//   restarts   — 0 whole-map restarts: every registered stage run once, S5's sub-steps once per growth stage, at most one
//                top-up each (§16 M0 (c); §5.1 (1)); bugs — no bug entry (§5.1 (8));
//   cliff      — no turn cliff at 10 m resampling, per seed and on the pooled histogram (§13.5's street-turning clause);
//   junction   — the integrated run's L1 junctions: p5 ≥ 30° and the organic 4-way share ≤ 15 % per seed, the median of
//                the pooled arm gaps in 85–95° (C-0094; C-0254 (13)'s per-seed / pooled split);
//   drift      — the integrated run's grown streets' 600 m windows pooled: > 90° on at most ⌊1 %⌋ of them, the median
//                in 15–30° once the pool holds 20 windows (C-0258 (5)'s rule), reported below that;
//   roads      — roads leaving each walled stage = its main gates N (§13.5's towers-and-gates row);
//   strips     — 0 lanes cross a wall strip (§4.6; §13.2);
//   s8s9       — S8's working block ≡ S9's committed block (§13.2) read by N-52 (1): Hausdorff ≤ 2 · √2 · attractCm on
//                every block (exact at the vertices), the stop kerb's drift within the same bound (N-57 (4): the one-sided
//                distance stop → working and the sliver width of working ∖ stop; the Hausdorff distance reported with the
//                needle's length), no S9 union refused;
//                the exact-0 share and the misses' distances reported (the share ratcheted by the tests);
//   corpus     — the skeleton corpus bar on the district faces: downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %, no failure
//                (§3.8; M0-a-12's runner, C-0067);
//   sharedS5   — the two runs' S1 – S5 are one derivation (equal stage roots at S5's end; C-0270 (1)).
// Reported, never gating here: the refusal census per seed (J264), the face counts beside §12.4's ≈ 1 500 cuts and ≈ 25 districts, the block-area and cut-
// length distributions per band (judged AFTER-M-1 by M0-c-07a / M0-c-07b, C-0072), every ladder use, the work per unit.
import { quantile7 } from '@plat/testkit';
import { CORPUS_BAR } from '../skeleton/runner.js';
import { S8S9_BOUND_CM, type RefusalCensus, type SeedRecord, type WorkRow } from './measure.js';
import type { RunKind } from './runs.js';

/** §12.4's CITY figures the face-count report stands beside (C-0016). */
export const CITY_FIGURES = Object.freeze({ cuts: 1_500, districts: 25 });

/** The junction row's thresholds (§13.5; C-0094). */
export const JUNCTION = Object.freeze({ p5Min: 30, medianLo: 85, medianHi: 95, share4Max: 0.15 });

/** The growth-drift row (§13.5): p50 15–30°, > 90° on ≤ 1 %, the median judged from 20 windows (C-0258 (5)). */
export const DRIFT = Object.freeze({ p50Lo: 15, p50Hi: 30, overDeg: 90, overShare: 0.01, medianFrom: 20 });

export interface Quantiles {
  readonly n: number;
  readonly p50: number;
  readonly p99: number;
  readonly p999: number;
  readonly max: number;
}

/** { n, p50, p99, p999, max } (C-0091's form) of a sample; zeros for none. */
export function quantiles(values: readonly number[]): Quantiles {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return { n: 0, p50: 0, p99: 0, p999: 0, max: 0 };
  return { n: s.length, p50: quantile7(s, 0.5), p99: quantile7(s, 0.99), p999: quantile7(s, 0.999), max: s[s.length - 1] };
}

/** A distribution's spread for the band report: n, p10, p50, p90, mean. */
export interface Spread {
  readonly n: number;
  readonly p10: number;
  readonly p50: number;
  readonly p90: number;
  readonly mean: number;
}

export function spread(values: readonly number[]): Spread {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return { n: 0, p10: 0, p50: 0, p90: 0, mean: 0 };
  let sum = 0;
  for (const v of s) sum += v;
  return { n: s.length, p10: quantile7(s, 0.1), p50: quantile7(s, 0.5), p90: quantile7(s, 0.9), mean: sum / s.length };
}

/** A counter's work per unit over a run's batches (C-0091). */
export interface WorkCounter {
  readonly stage: string;
  readonly batches: number;
  readonly units: Quantiles;
  readonly unitsTotal: number;
  readonly perUnit: Quantiles;
  readonly limitHits: number;
}

/** One seed's row of a run (the report's per-seed table: the refusal census by seed, J264, and the bar's readings). */
export interface SeedRow {
  readonly seed: number;
  readonly districts: number;
  readonly cuts: number;
  readonly blocks: number;
  /** S8 ≡ S9: compared, exact, beyond the bound, the largest distance; the stop kerb's drift — the largest Hausdorff
   * distance (reported), one-sided distance and sliver width (asserted), and the blocks beyond (cm). */
  readonly compared: number;
  readonly exact: number;
  readonly beyond: number;
  readonly maxCm: number;
  readonly driftMaxCm: number;
  readonly driftOneSidedMaxCm: number;
  readonly driftSliverMaxCm: number;
  readonly driftBeyond: number;
  /** A split block's stop-region parts holding no seed (reported, C-0423 (2)). */
  readonly driftSeedless: number;
  /** The corpus's faces and downgrades (roof, spine). */
  readonly corpusFaces: number;
  readonly corpusDowngrades: readonly [number, number];
  /** The growth-drift windows of the seed. */
  readonly driftWindows: number;
  /** The seed's junction row (p5, median, 4-way share), its cliff, restarts, bugs, walled stages off N, lanes in a strip. */
  readonly junction: readonly [number, number, number];
  readonly cliff: boolean;
  readonly restarts: number;
  readonly bugs: number;
  readonly roadsOff: number;
  readonly stripCrossings: number;
  readonly refusals: RefusalCensus;
}

/** One run's fold. */
export interface RunSummary {
  readonly run: RunKind;
  readonly seeds: number;
  readonly bugs: { readonly seeds: number; readonly entries: number; readonly first: readonly string[] };
  readonly restarts: { readonly total: number; readonly seeds: number; readonly s5Violations: number };
  readonly ladder: Readonly<Record<string, number>>;
  readonly ladderUses: number;
  readonly faces: { readonly districts: Spread; readonly cuts: Spread; readonly blocks: Spread; readonly s8Refused: number; readonly figures: typeof CITY_FIGURES };
  readonly junction: {
    readonly perSeed: { readonly p5Min: number; readonly medianMin: number; readonly medianMax: number; readonly share4Max: number; readonly seedsBelowP5: number; readonly seedsOverShare4: number };
    readonly pooled: { readonly p5: number; readonly median: number; readonly share4: number; readonly nodes: number; readonly nodes4: number };
  };
  readonly turns: { readonly steps: number; readonly cliffSeeds: number; readonly pooledCliff: boolean; readonly over15Share: number };
  readonly drift: { readonly windows: number; readonly p50: number | null; readonly p90: number | null; readonly over90: number; readonly over90Share: number; readonly medianJudged: boolean };
  readonly bands: Readonly<Record<string, { readonly blockAreaM2: Spread; readonly cutLengthM: Spread }>>;
  readonly roads: { readonly stages: number; readonly mismatches: number; readonly first: readonly string[] };
  readonly strips: { readonly faces: number; readonly lanes: number; readonly crossings: number };
  readonly s8s9: {
    readonly blocks: number;
    readonly compared: number;
    readonly zero: number;
    readonly within1cm: number;
    readonly beyond: number;
    readonly maxCm: number;
    readonly split: number;
    /** Blocks whose S9 block is the L1 face itself (no L2 record there, §2.2 rule 2). */
    readonly s9OwnL1: number;
    readonly drifted: number;
    /** The stop kerb's drift (N-57 (4)): the largest Hausdorff distance (reported) with that block's needle length, the
     * largest one-sided distance and sliver width (asserted within the bound: `driftBeyond`). */
    readonly driftMaxCm: number;
    readonly driftNeedleCm: number;
    readonly driftOneSidedMaxCm: number;
    readonly driftSliverMaxCm: number;
    readonly driftBeyond: number;
    /** A split block's stop-region parts holding no seed, summed (reported, never drift: C-0423 (2)). */
    readonly driftSeedless: number;
    readonly commit: number;
    readonly s9Refused: number;
    readonly kerbReads: number;
    readonly seedsAllZero: number;
    /** N-52 (1)'s bound (cm) and the exact-0 share of the blocks compared. */
    readonly boundCm: number;
    readonly exactShare: number;
    /** The distances of the blocks that were not exact: { n, p50, p99, p999, max } (cm). */
    readonly missCm: Quantiles;
    /** Seeds with a block beyond the bound. */
    readonly seedsBeyond: number;
    readonly first: readonly string[];
  };
  /** The refusal census (J264): totals by where the refusal was met, the seeds with any, the first few by seed. */
  readonly refusals: { readonly total: RefusalCensus; readonly seeds: number; readonly first: readonly string[] };
  /** Every seed's row, in seed order (the full report's; the summary leaves it out). */
  readonly perSeed: readonly SeedRow[];
  readonly corpus: Readonly<Record<'roof' | 'spine', { readonly faces: number; readonly downgrades: number; readonly workLimitHits: number; readonly failures: number; readonly downgradeShare: number; readonly workLimitShare: number; readonly pass: boolean }>>;
  readonly work: Readonly<Record<string, WorkCounter>>;
}

/** The verdicts (null: not judged on this report's runs). */
export interface Verdicts {
  readonly restarts: boolean | null;
  readonly bugs: boolean | null;
  readonly cliff: boolean | null;
  readonly junction: boolean | null;
  readonly drift: boolean | null;
  readonly roads: boolean | null;
  readonly strips: boolean | null;
  readonly s8s9: boolean | null;
  readonly corpus: boolean | null;
  readonly sharedS5: boolean | null;
}

/** The harness's sizes. */
export interface FusionSizes {
  readonly from: number;
  readonly seeds: number;
  readonly runs: readonly RunKind[];
  readonly frameHa: number | null;
  readonly walledHa: number | null;
}

/** FusionGateReport — the interface M0-c-06 lists: the full report (PLAT_BENCH_OUT/fusion/report.json). */
export interface FusionGateReport {
  readonly item: 'M0-c-06';
  readonly sizes: FusionSizes;
  readonly runs: readonly RunSummary[];
  /** Seeds whose two runs' roots at S5's end are equal, of the seeds both runs ran. */
  readonly sharedS5: { readonly compared: number; readonly equal: number };
  readonly verdicts: Verdicts;
  readonly pass: boolean;
  /** The first few failing readings, by seed. */
  readonly notes: readonly string[];
}

function count(m: Record<string, number>, k: string, by: number): void {
  m[k] = (m[k] ?? 0) + by;
}

function addBins(into: number[], bins: readonly number[]): void {
  for (let i = 0; i < bins.length; i += 1) into[i] = (into[i] ?? 0) + bins[i];
}

/** The no-cliff clause on a histogram of 1° bins (§13.5): an empty bin above 15° while the bin below holds > 1 %. */
export function binsCliff(bins: readonly number[], steps: number): boolean {
  if (steps === 0) return false;
  for (let k = 15; k < bins.length + 1; k += 1) {
    const here = bins[k] ?? 0;
    const below = bins[k - 1] ?? 0;
    if (here === 0 && below / steps > 0.01) return true;
  }
  return false;
}

function s5Ok(r: SeedRecord): boolean {
  const k = r.s5.growth.length;
  const seq = Array.from({ length: k }, (_, i) => i + 1);
  const same = (a: readonly number[]) => a.length === seq.length && a.every((x, i) => x === seq[i]);
  return k > 0 && same(r.s5.growth) && same(r.s5.prune) && same(r.s5.capacity) && r.s5.topUps.every((t) => t <= 1);
}

/** Folds a work sample (C-0091): per counter, the units and the work per unit over the run's batches. */
export function foldWork(rows: readonly WorkRow[]): Record<string, WorkCounter> {
  const by = new Map<string, WorkRow[]>();
  for (const r of rows) {
    const list = by.get(r.counter) ?? [];
    list.push(r);
    by.set(r.counter, list);
  }
  const out: Record<string, WorkCounter> = {};
  for (const name of [...by.keys()].sort()) {
    const list = by.get(name) as WorkRow[];
    // Only a counter the run charged (C-0091).
    if (!list.some((r) => r.work > 0)) continue;
    let total = 0;
    for (const r of list) total += r.units;
    out[name] = {
      stage: list[0].stage,
      batches: list.length,
      units: quantiles(list.map((r) => r.units)),
      unitsTotal: total,
      perUnit: quantiles(list.map((r) => r.work / r.units)),
      limitHits: list.filter((r) => r.work >= r.limit).length,
    };
  }
  return out;
}

/** One run's fold over its seed records (in seed order). */
export function foldRun(run: RunKind, recs: readonly SeedRecord[], notes: string[]): RunSummary {
  const note = (s: string): void => {
    if (notes.length < 24) notes.push(s);
  };
  const ladder: Record<string, number> = {};
  let ladderUses = 0;
  const bugsFirst: string[] = [];
  let bugSeeds = 0;
  let bugEntries = 0;
  let restarts = 0;
  let restartSeeds = 0;
  let s5Violations = 0;
  const gaps: number[] = [];
  let nodes = 0;
  let nodes4 = 0;
  const bins: number[] = [];
  let steps = 0;
  let cliffSeeds = 0;
  const drift: number[] = [];
  const bandAreas = new Map<string, number[]>();
  const bandCuts = new Map<string, number[]>();
  let roadStages = 0;
  let roadMismatches = 0;
  const roadMiss: string[] = [];
  let stripFaces = 0;
  let stripLanes = 0;
  let stripCross = 0;
  const h = { blocks: 0, compared: 0, zero: 0, within1cm: 0, beyond: 0, maxCm: 0, split: 0, s9OwnL1: 0, drifted: 0, driftMaxCm: 0, driftNeedleCm: 0, driftOneSidedMaxCm: 0, driftSliverMaxCm: 0, driftBeyond: 0, driftSeedless: 0, commit: 0, s9Refused: 0, kerbReads: 0, seedsAllZero: 0, seedsBeyond: 0 };
  const hFirst: string[] = [];
  const missCm: number[] = [];
  const ref: Record<keyof RefusalCensus, number> = { s8: 0, s9: 0, kerbReads: 0, corpusRoof: 0, corpusSpine: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0 };
  let refSeeds = 0;
  const refFirst: string[] = [];
  const corpus = { roof: { faces: 0, downgrades: 0, workLimitHits: 0, failures: 0 }, spine: { faces: 0, downgrades: 0, workLimitHits: 0, failures: 0 } };
  const work: WorkRow[] = [];
  let s8Refused = 0;
  let p5Min = Infinity;
  let medianMin = Infinity;
  let medianMax = -Infinity;
  let share4Max = -Infinity;
  let seedsBelowP5 = 0;
  let seedsOverShare4 = 0;
  for (const r of recs) {
    for (const [k, v] of Object.entries(r.ladder)) {
      count(ladder, k, v);
      ladderUses += v;
    }
    if (r.bugs.length > 0) {
      bugSeeds += 1;
      bugEntries += r.bugs.length;
      if (bugsFirst.length < 8) bugsFirst.push(`${String(r.seed)}: ${r.bugs.join(', ')}`);
      note(`${run} seed ${String(r.seed)}: bugs ${r.bugs.join(', ')}`);
    }
    restarts += r.restarts;
    if (r.restarts > 0) {
      restartSeeds += 1;
      note(`${run} seed ${String(r.seed)}: ${String(r.restarts)} restart(s), invocations ${JSON.stringify(r.invocations)}`);
    }
    if (!s5Ok(r)) {
      s5Violations += 1;
      note(`${run} seed ${String(r.seed)}: S5's sub-steps ${JSON.stringify(r.s5)}`);
    }
    gaps.push(...r.junction.gaps);
    nodes += r.junction.nodes;
    nodes4 += r.junction.nodes4;
    if (Number.isFinite(r.junction.p5)) {
      p5Min = Math.min(p5Min, r.junction.p5);
      if (r.junction.p5 < JUNCTION.p5Min) seedsBelowP5 += 1;
    }
    if (Number.isFinite(r.junction.median)) {
      medianMin = Math.min(medianMin, r.junction.median);
      medianMax = Math.max(medianMax, r.junction.median);
    }
    if (Number.isFinite(r.junction.share4)) {
      share4Max = Math.max(share4Max, r.junction.share4);
      if (r.junction.share4 > JUNCTION.share4Max) seedsOverShare4 += 1;
    }
    addBins(bins, r.turns.bins);
    steps += r.turns.steps;
    if (r.turns.cliff) {
      cliffSeeds += 1;
      note(`${run} seed ${String(r.seed)}: a turn cliff`);
    }
    drift.push(...r.drift);
    for (const [b, v] of Object.entries(r.bands)) {
      bandAreas.set(b, [...(bandAreas.get(b) ?? []), ...v.blockAreasM2]);
      bandCuts.set(b, [...(bandCuts.get(b) ?? []), ...v.cutLengthsM]);
    }
    for (const x of r.roads) {
      roadStages += 1;
      if (x.leaving !== x.n) {
        roadMismatches += 1;
        if (roadMiss.length < 8) roadMiss.push(`seed ${String(r.seed)} stage ${String(x.k)}: ${String(x.leaving)} roads leave, N = ${String(x.n)}`);
        note(`${run} seed ${String(r.seed)}: stage ${String(x.k)} has ${String(x.leaving)} roads leaving, N = ${String(x.n)}`);
      }
    }
    stripFaces += r.strips.faces;
    stripLanes += r.strips.lanes;
    stripCross += r.strips.crossings;
    if (r.strips.crossings > 0) note(`${run} seed ${String(r.seed)}: ${String(r.strips.crossings)} lane(s) cross a wall strip`);
    const x = r.hausdorff;
    h.blocks += x.blocks;
    h.compared += x.compared;
    h.zero += x.zero;
    h.within1cm += x.within1cm;
    h.maxCm = Math.max(h.maxCm, x.maxCm);
    h.split += x.split;
    h.s9OwnL1 += x.s9OwnL1;
    h.drifted += x.drifted;
    h.commit += x.commit;
    h.beyond += x.beyond;
    if (x.driftMaxCm > h.driftMaxCm) {
      h.driftMaxCm = x.driftMaxCm;
      h.driftNeedleCm = x.driftNeedleCm;
    }
    h.driftOneSidedMaxCm = Math.max(h.driftOneSidedMaxCm, x.driftOneSidedMaxCm);
    h.driftSliverMaxCm = Math.max(h.driftSliverMaxCm, x.driftSliverMaxCm);
    h.driftBeyond += x.driftBeyond;
    h.driftSeedless += x.driftSeedless;
    h.s9Refused += x.s9Refused;
    h.kerbReads += x.kerbReads;
    missCm.push(...x.missCm);
    if (x.zero === x.compared && x.compared > 0) h.seedsAllZero += 1;
    const bad = x.beyond > 0 || x.driftBeyond > 0 || x.s9Refused > 0 || x.compared === 0;
    if (bad) {
      h.seedsBeyond += 1;
      if (hFirst.length < 8) hFirst.push(`seed ${String(r.seed)}: ${String(x.beyond)} of ${String(x.compared)} beyond the bound (max ${x.maxCm.toFixed(2)} cm; stop-kerb drift beyond ${String(x.driftBeyond)}; S9 refused ${String(x.s9Refused)})${x.misses.length > 0 ? `; ${x.misses[0].block}: ${x.misses[0].why}` : ''}`);
      note(`${run} seed ${String(r.seed)}: S8 ≡ S9 ${String(x.beyond)} block(s) beyond ${S8S9_BOUND_CM.toFixed(2)} cm (max ${x.maxCm.toFixed(2)} cm), drift beyond ${String(x.driftBeyond)}, S9 refused ${String(x.s9Refused)}`);
    }
    let any = 0;
    for (const key of Object.keys(ref) as (keyof RefusalCensus)[]) {
      ref[key] += r.refusals[key];
      any += r.refusals[key];
    }
    if (any > 0) {
      refSeeds += 1;
      if (refFirst.length < 16) refFirst.push(`seed ${String(r.seed)}: ${(Object.keys(ref) as (keyof RefusalCensus)[]).filter((key) => r.refusals[key] > 0).map((key) => `${key} ${String(r.refusals[key])}`).join(', ')}`);
    }
    for (const u of ['roof', 'spine'] as const) {
      corpus[u].faces += r.corpus[u].faces;
      corpus[u].downgrades += r.corpus[u].downgrades;
      corpus[u].workLimitHits += r.corpus[u].workLimitHits;
      corpus[u].failures += r.corpus[u].failures;
    }
    work.push(...r.work);
    s8Refused += r.faces.s8Refused;
  }
  const sortedGaps = gaps.sort((a, b) => a - b);
  const sortedDrift = drift.slice().sort((a, b) => a - b);
  const over90 = sortedDrift.filter((v) => v > DRIFT.overDeg).length;
  let over15 = 0;
  for (let i = 15; i < bins.length; i += 1) over15 += bins[i] ?? 0;
  const bands: Record<string, { blockAreaM2: Spread; cutLengthM: Spread }> = {};
  for (const b of [...new Set([...bandAreas.keys(), ...bandCuts.keys()])].sort()) bands[b] = { blockAreaM2: spread(bandAreas.get(b) ?? []), cutLengthM: spread(bandCuts.get(b) ?? []) };
  const corpusOut = {} as Record<'roof' | 'spine', RunSummary['corpus']['roof']>;
  for (const u of ['roof', 'spine'] as const) {
    const c = corpus[u];
    const n = Math.max(1, c.faces);
    const downgradeShare = c.downgrades / n;
    const workLimitShare = c.workLimitHits / n;
    corpusOut[u] = { ...c, downgradeShare, workLimitShare, pass: c.faces > 0 && c.failures === 0 && downgradeShare <= CORPUS_BAR.downgradesMax && workLimitShare <= CORPUS_BAR.workLimitHitsMax };
  }
  const fin = (v: number): number => (Number.isFinite(v) ? v : Number.NaN);
  return {
    run,
    seeds: recs.length,
    bugs: { seeds: bugSeeds, entries: bugEntries, first: bugsFirst },
    restarts: { total: restarts, seeds: restartSeeds, s5Violations },
    ladder: Object.fromEntries(Object.entries(ladder).sort((a, b) => (a[0] < b[0] ? -1 : 1))),
    ladderUses,
    faces: { districts: spread(recs.map((r) => r.faces.districts)), cuts: spread(recs.map((r) => r.faces.cuts)), blocks: spread(recs.map((r) => r.faces.blocks)), s8Refused, figures: CITY_FIGURES },
    junction: {
      perSeed: { p5Min: fin(p5Min), medianMin: fin(medianMin), medianMax: fin(medianMax), share4Max: fin(share4Max), seedsBelowP5, seedsOverShare4 },
      pooled: { p5: sortedGaps.length === 0 ? Number.NaN : quantile7(sortedGaps, 0.05), median: sortedGaps.length === 0 ? Number.NaN : quantile7(sortedGaps, 0.5), share4: nodes === 0 ? Number.NaN : nodes4 / nodes, nodes, nodes4 },
    },
    turns: { steps, cliffSeeds, pooledCliff: binsCliff(bins, steps), over15Share: steps === 0 ? 0 : over15 / steps },
    drift: {
      windows: sortedDrift.length,
      p50: sortedDrift.length === 0 ? null : quantile7(sortedDrift, 0.5),
      p90: sortedDrift.length === 0 ? null : quantile7(sortedDrift, 0.9),
      over90,
      over90Share: sortedDrift.length === 0 ? 0 : over90 / sortedDrift.length,
      medianJudged: sortedDrift.length >= DRIFT.medianFrom,
    },
    bands,
    roads: { stages: roadStages, mismatches: roadMismatches, first: roadMiss },
    strips: { faces: stripFaces, lanes: stripLanes, crossings: stripCross },
    s8s9: { ...h, boundCm: S8S9_BOUND_CM, exactShare: h.compared === 0 ? 0 : h.zero / h.compared, missCm: quantiles(missCm), first: hFirst },
    refusals: { total: ref, seeds: refSeeds, first: refFirst },
    perSeed: recs.map((r) => ({
      seed: r.seed,
      districts: r.faces.districts,
      cuts: r.faces.cuts,
      blocks: r.faces.blocks,
      compared: r.hausdorff.compared,
      exact: r.hausdorff.zero,
      beyond: r.hausdorff.beyond,
      maxCm: r.hausdorff.maxCm,
      driftMaxCm: r.hausdorff.driftMaxCm,
      driftOneSidedMaxCm: r.hausdorff.driftOneSidedMaxCm,
      driftSliverMaxCm: r.hausdorff.driftSliverMaxCm,
      driftBeyond: r.hausdorff.driftBeyond,
      driftSeedless: r.hausdorff.driftSeedless,
      corpusFaces: r.corpus.faces,
      corpusDowngrades: [r.corpus.roof.downgrades, r.corpus.spine.downgrades] as const,
      driftWindows: r.drift.length,
      junction: [r.junction.p5, r.junction.median, r.junction.share4] as const,
      cliff: r.turns.cliff,
      restarts: r.restarts,
      bugs: r.bugs.length,
      roadsOff: r.roads.filter((x) => x.leaving !== x.n).length,
      stripCrossings: r.strips.crossings,
      refusals: r.refusals,
    })),
    corpus: corpusOut,
    work: foldWork(work),
  };
}

/** The verdict of one run's clause list (see the module comment). */
function runVerdicts(s: RunSummary): Omit<Verdicts, 'sharedS5' | 'junction' | 'drift'> & { junction: boolean; drift: boolean } {
  const j = s.junction;
  const d = s.drift;
  const driftOk = d.over90 <= Math.floor(DRIFT.overShare * d.windows) && (!d.medianJudged || (d.p50 !== null && d.p50 >= DRIFT.p50Lo && d.p50 <= DRIFT.p50Hi));
  return {
    restarts: s.restarts.total === 0 && s.restarts.s5Violations === 0,
    bugs: s.bugs.entries === 0,
    cliff: s.turns.cliffSeeds === 0 && !s.turns.pooledCliff,
    junction: s.seeds > 0 && j.pooled.nodes > 0 && j.perSeed.seedsBelowP5 === 0 && j.perSeed.seedsOverShare4 === 0 && j.pooled.median >= JUNCTION.medianLo && j.pooled.median <= JUNCTION.medianHi,
    drift: driftOk,
    roads: s.roads.stages > 0 && s.roads.mismatches === 0,
    strips: s.strips.crossings === 0,
    s8s9: s.s8s9.compared > 0 && s.s8s9.beyond === 0 && s.s8s9.driftBeyond === 0 && s.s8s9.s9Refused === 0,
    corpus: s.corpus.roof.pass && s.corpus.spine.pass,
  };
}

function and(a: boolean | null, b: boolean | null): boolean | null {
  if (a === null) return b;
  if (b === null) return a;
  return a && b;
}

/**
 * The report (see the module comment) from the seed records in task order. The junction and drift clauses are the
 * integrated run's (C-0094; the fusion run's are reported); every other clause holds on every run.
 */
export function foldReport(sizes: FusionSizes, records: readonly SeedRecord[]): FusionGateReport {
  const notes: string[] = [];
  const runs: RunSummary[] = [];
  for (const kind of sizes.runs) runs.push(foldRun(kind, records.filter((r) => r.run === kind).sort((a, b) => a.seed - b.seed), notes));
  let v: Verdicts = { restarts: null, bugs: null, cliff: null, junction: null, drift: null, roads: null, strips: null, s8s9: null, corpus: null, sharedS5: null };
  for (const s of runs) {
    const x = runVerdicts(s);
    v = {
      restarts: and(v.restarts, x.restarts),
      bugs: and(v.bugs, x.bugs),
      cliff: and(v.cliff, x.cliff),
      junction: s.run === 'integrated' ? x.junction : v.junction,
      drift: s.run === 'integrated' ? x.drift : v.drift,
      roads: and(v.roads, x.roads),
      strips: and(v.strips, x.strips),
      s8s9: and(v.s8s9, x.s8s9),
      corpus: and(v.corpus, x.corpus),
      sharedS5: v.sharedS5,
    };
  }
  const fusion = new Map(records.filter((r) => r.run === 'fusion').map((r) => [r.seed, r.rootS5]));
  let compared = 0;
  let equal = 0;
  for (const r of records) {
    if (r.run !== 'integrated') continue;
    const f = fusion.get(r.seed);
    if (f === undefined) continue;
    compared += 1;
    if (f === r.rootS5 && f !== '') equal += 1;
    else notes.push(`seed ${String(r.seed)}: the two runs' roots at S5's end differ`);
  }
  if (compared > 0) v = { ...v, sharedS5: equal === compared };
  const pass = Object.values(v).every((x) => x !== false);
  return { item: 'M0-c-06', sizes, runs, sharedS5: { compared, equal }, verdicts: v, pass, notes };
}

// ---- the stamps (C-0084) -----------------------------------------------------------------------------------------------

/** The per-stage stamps' fold: per run and stage { n, p50, p99, p999, max } in ms, and the gate's S4 + S5 + S8 sum. */
export interface StampFold {
  readonly authority: 'contended' | 'authoritative';
  readonly reasons: readonly string[];
  readonly runs: Readonly<Record<string, Readonly<Record<string, Quantiles>>>>;
  /** The fusion gate's sum S4 + S5 + S8 per seed of the fusion run (ms). */
  readonly gateMs: Quantiles;
}

/** The stamps folded (CONTENDED unless the timing phase's harness stamped them, C-0025, C-0047). */
export function foldStamps(records: readonly { readonly run: RunKind; readonly stampsMs: Readonly<Record<string, number>> }[], authority: StampFold['authority'] = 'contended', reasons: readonly string[] = ['not the timing phase: a spike run, other seats on the machine (C-0047)']): StampFold {
  const runs: Record<string, Record<string, number[]>> = {};
  const gate: number[] = [];
  for (const r of records) {
    const into = (runs[r.run] ??= {});
    for (const [stage, ms] of Object.entries(r.stampsMs)) (into[stage] ??= []).push(ms);
    if (r.run === 'fusion') gate.push((r.stampsMs['S4'] ?? 0) + (r.stampsMs['S5'] ?? 0) + (r.stampsMs['S8'] ?? 0));
  }
  const out: Record<string, Record<string, Quantiles>> = {};
  for (const run of Object.keys(runs).sort()) {
    out[run] = {};
    for (const stage of Object.keys(runs[run]).sort()) out[run][stage] = quantiles(runs[run][stage]);
  }
  return { authority, reasons: [...reasons], runs: out, gateMs: quantiles(gate) };
}

/** The bar's seed count (§16 M0 (c): 0 whole-map restarts on 1 000 seeds). */
export const BAR_SEEDS = 1_000;

/**
 * The summary's long-run status (N-52 (6), C-0272's pattern): `complete` only for the bar's whole run — 1 000 seeds from 1,
 * both runs, the CITY size — and `PENDING-LONG-RUN` for any smaller CITY run (the builder's smoke), which states its count.
 */
export function longRunOf(sizes: FusionSizes): { readonly seedsAsked: number; readonly seedsRun: number; readonly status: 'complete' | 'PENDING-LONG-RUN' } {
  const whole = sizes.from === 1 && sizes.seeds >= BAR_SEEDS && sizes.runs.length === 2 && sizes.frameHa === null && sizes.walledHa === null;
  return { seedsAsked: BAR_SEEDS, seedsRun: sizes.seeds, status: whole ? 'complete' : 'PENDING-LONG-RUN' };
}

/** The numbers-only summary (C-0067, C-0091, C-0084): the verdicts, the folds without samples, the work and the stamps. */
export function summaryOf(r: FusionGateReport, stamps: StampFold): Record<string, unknown> {
  return {
    item: r.item,
    longRun: longRunOf(r.sizes),
    sizes: r.sizes,
    pass: r.pass,
    verdicts: r.verdicts,
    sharedS5: r.sharedS5,
    // The per-seed table stays in the full report (report.json); the summary carries the folds and the census's first rows.
    runs: r.runs.map(({ perSeed: _rows, ...rest }) => ({ ...rest, seedRows: _rows.length })),
    // C-0084: R12-4's rows (the S3 slice, S4, S5, S8) and the gate's sum from the fusion run's stamps, with their authority.
    timing: {
      authority: stamps.authority,
      reasons: stamps.reasons,
      r12_4: { S3: stamps.runs['fusion']?.['S3'] ?? null, S4: stamps.runs['fusion']?.['S4'] ?? null, S5: stamps.runs['fusion']?.['S5'] ?? null, S8: stamps.runs['fusion']?.['S8'] ?? null },
      gateS4S5S8Ms: stamps.gateMs,
      integrated: stamps.runs['integrated'] ?? null,
    },
  };
}
