// BentCutReport — the harness's report and its numbers-only summary (M0-b-04; §4.6 step 8's F-CUT bars, §13.5's bent-cut
// signature row, §13.8's T34-1 mean, §16 M0 (b)'s corner and arrival clauses; C-0067, C-0073, C-0091, C-0108).
// Every fold reads the face records in task order, so the report is a function of the sizes and the seed alone.
import { metricById, quantile7, type MetricDoc } from '@plat/testkit';
import { M0B_KINDS } from './faces.js';
import type { FcutRecord, FullRecord } from './runs.js';
import type { SignatureCut } from './signature.js';

/** §4.6 step 8's F-CUT bound: the ladder ends in at most this many kernel calls. */
export const FCUT_MAX_CALLS = 6;
/** §4.6 step 8's soft bound on a district's substitution residue share (the cut table's cell; reported, never gating). */
export const RESIDUE_SOFT = 0.05;
/** §16 M0 (b)'s corner clause: within 0.10 of mid-course on at least this share of bent cuts (C-0073). */
export const CORNER_MIN_SHARE = 0.8;
/** §16 M0 (b)'s arrival clause: ≥ 85° on at least this share of cuts (C-0073). */
export const ARRIVAL_MIN_SHARE = 0.95;
/** §13.2 T34-1: the mean of g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1| is 7/30; over 10 000 faces within 3 s.e. */
export const G_MEAN = 7 / 30;
export const G_SD = Math.sqrt(26) / 30;
export const T34_SE_BOUND = 3;

/** A quantile block (C-0091): { n, p50, p99, p999, max } by Hyndman and Fan's type 7. */
export interface Quantiles {
  readonly n: number;
  readonly p50: number;
  readonly p99: number;
  readonly p999: number;
  readonly max: number;
}

export function quantiles(values: readonly number[]): Quantiles {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return { n: 0, p50: 0, p99: 0, p999: 0, max: 0 };
  return { n: s.length, p50: quantile7(s, 0.5), p99: quantile7(s, 0.99), p999: quantile7(s, 0.999), max: s[s.length - 1] };
}

/** The F-CUT bar's fold. */
export interface FcutSummary {
  /** Faces drawn, faces the kernel refused to build (not S8 inputs), districts S8 refused, faces run. */
  readonly faces: number;
  readonly byKind: Readonly<Record<string, number>>;
  readonly setupRefused: number;
  readonly s8Refused: number;
  readonly run: number;
  /** The depth-0 ladders' kernel calls: the most, and how many ladders made each count. */
  readonly maxKernelCalls: number;
  readonly callsHistogram: Readonly<Record<string, number>>;
  readonly outcomes: Readonly<Record<string, number>>;
  /** Ladders that left fewer faces than they began with (the report's or the arena's count). */
  readonly decreases: number;
  readonly pass: boolean;
  /**
   * Every ladder at every depth of the whole districts of the same faces (C-XB04 (1)): judged with the depth-0 ladders —
   * a district S8 refused or threw on is a ladder that did not end.
   */
  readonly allDepths: { readonly districts: number; readonly ladders: number; readonly maxKernelCalls: number; readonly decreases: number; readonly refused: number };
}

function bump(m: Record<string, number>, k: string, n = 1): void {
  m[k] = (m[k] ?? 0) + n;
}

function sortedRecord(m: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of Object.keys(m).sort((a, b) => (a.length - b.length) || (a < b ? -1 : a > b ? 1 : 0))) out[k] = m[k];
  return out;
}

export function foldFcut(records: readonly FcutRecord[], full: readonly FullRecord[]): FcutSummary {
  const byKind: Record<string, number> = {};
  const hist: Record<string, number> = {};
  const outcomes: Record<string, number> = {};
  let setup = 0;
  let refused = 0;
  let max = 0;
  let decreases = 0;
  for (const r of records) {
    bump(byKind, r.kind);
    if (r.setup !== null) {
      setup += 1;
      continue;
    }
    if (r.refused !== null) {
      refused += 1;
      continue;
    }
    bump(hist, String(r.kernelCalls));
    bump(outcomes, r.outcome);
    if (r.kernelCalls > max) max = r.kernelCalls;
    if (r.facesAfterLadder < 1 || r.facesAfter < r.facesBefore) decreases += 1;
  }
  let ladders = 0;
  let maxAll = 0;
  let decAll = 0;
  let refAll = 0;
  let districts = 0;
  for (const f of full) {
    if (f.setup !== null) continue;
    if (f.refused !== null) {
      refAll += 1;
      continue;
    }
    districts += 1;
    ladders += f.ladders.n;
    if (f.ladders.maxCalls > maxAll) maxAll = f.ladders.maxCalls;
    decAll += f.ladders.decreases + (f.facesAfter < f.facesBefore ? 1 : 0);
  }
  const run = records.length - setup - refused;
  return {
    faces: records.length,
    byKind: sortedRecord(byKind),
    setupRefused: setup,
    s8Refused: refused,
    run,
    maxKernelCalls: max,
    callsHistogram: sortedRecord(hist),
    outcomes: sortedRecord(outcomes),
    decreases,
    pass: run > 0 && refused === 0 && max <= FCUT_MAX_CALLS && decreases === 0 && refAll === 0 && maxAll <= FCUT_MAX_CALLS && decAll === 0,
    allDepths: { districts, ladders, maxKernelCalls: maxAll, decreases: decAll, refused: refAll },
  };
}

/** The substitution residue per district (§4.6 step 8; C-0036): soft, reported. */
export interface ResidueSummary {
  readonly districts: number;
  readonly softExceeded: number;
  /** The share of districts over the soft bound, the land-weighted share (Σ residue / Σ built) and the per-district quantiles. */
  readonly exceededShare: number;
  readonly landShare: number;
  readonly perDistrict: Quantiles;
  readonly mean: number;
  readonly verdict: 'reported';
}

export function foldResidue(full: readonly FullRecord[]): ResidueSummary {
  const ok = full.filter((f) => f.setup === null && f.refused === null);
  let res = 0;
  let built = 0;
  let soft = 0;
  let sum = 0;
  for (const f of ok) {
    res += f.residue.areaCm2;
    built += f.residue.builtCm2;
    sum += f.residue.share;
    if (f.residue.soft) soft += 1;
  }
  return {
    districts: ok.length,
    softExceeded: soft,
    exceededShare: ok.length === 0 ? 0 : soft / ok.length,
    landShare: built > 0 ? res / built : 0,
    perDistrict: quantiles(ok.map((f) => f.residue.share)),
    mean: ok.length === 0 ? 0 : sum / ok.length,
    verdict: 'reported',
  };
}

/** One set of cuts' signature, by M0-k-05's metric functions (one metricVersion each, C-0180 (7)). */
export interface SignatureRow {
  readonly cuts: number;
  readonly bent: number;
  readonly ring: number;
  /** σ of the start: in the recorded frame with the retries (the default rule), in the first frame, and attempt 0 alone. */
  readonly sigma: number | null;
  readonly sigmaPlain: number | null;
  readonly sigmaRing: number | null;
  readonly sigmaFirstFrame: number | null;
  readonly sigmaAttempt0: number | null;
  readonly cornerMid: number | null;
  readonly arrival85: number | null;
  readonly fillet: number | null;
  /** Reported beside: the corner along the course A–K–foot, the last inserted chord's arrival, the retries' share. */
  readonly cornerMidCourse: number | null;
  readonly arrival85Chord: number | null;
  readonly retried: number;
}

function measured(id: string, doc: MetricDoc, key: string): number | null {
  const def = metricById(id);
  if (def === undefined) throw new Error(`bentcut: the metric ${id} is not registered`);
  const m = def.measure(doc);
  if ('notApplicable' in m) return null;
  const v = m.values.get(key);
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

/** The metric versions the signature reads (M0-k-05's registry). */
export function signatureVersions(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of ['cut.sigma', 'cut.cornerMid', 'cut.arrival85', 'cut.fillet']) {
    const d = metricById(id);
    if (d === undefined) throw new Error(`bentcut: the metric ${id} is not registered`);
    out[id] = d.metricVersion;
  }
  return out;
}

export function signatureRow(cuts: readonly SignatureCut[]): SignatureRow {
  const doc: MetricDoc = { ways: [], cuts };
  const first: MetricDoc = { ways: [], cuts: cuts.map((c) => ({ ...c, startT: c.startT0 })) };
  const a0: MetricDoc = { ways: [], cuts: cuts.filter((c) => c.attempt === 0) };
  const course: MetricDoc = { ways: [], cuts: cuts.map((c) => (c.cornerCourseT === undefined ? c : { ...c, cornerT: c.cornerCourseT })) };
  const chord: MetricDoc = { ways: [], cuts: cuts.map((c) => ({ ...c, arrivalCdeg: c.arrivalChordCdeg })) };
  return {
    cuts: cuts.length,
    bent: cuts.filter((c) => c.bends === 1).length,
    ring: cuts.filter((c) => c.faceKind === 'ring').length,
    sigma: measured('cut.sigma', doc, 'all'),
    sigmaPlain: measured('cut.sigma', doc, 'plain'),
    sigmaRing: measured('cut.sigma', doc, 'ring'),
    sigmaFirstFrame: measured('cut.sigma', first, 'all'),
    sigmaAttempt0: measured('cut.sigma', a0, 'all'),
    cornerMid: measured('cut.cornerMid', doc, 'all'),
    arrival85: measured('cut.arrival85', doc, 'all'),
    fillet: measured('cut.fillet', doc, 'all'),
    cornerMidCourse: measured('cut.cornerMid', course, 'all'),
    arrival85Chord: measured('cut.arrival85', chord, 'all'),
    retried: cuts.filter((c) => c.attempt > 0).length,
  };
}

/** The signature's fold: per kind and pooled, the replay's counts, and the two clauses judged here (C-0073). */
export interface SignatureSummary {
  readonly metricVersions: Readonly<Record<string, string>>;
  readonly faces: number;
  readonly setupRefused: number;
  readonly s8Refused: number;
  readonly all: SignatureRow;
  readonly byKind: Readonly<Record<string, SignatureRow>>;
  readonly replay: { readonly cuts: number; readonly planner: number; readonly fallback: number; readonly deep: number; readonly matched: number; readonly missed: number; readonly notReplayed: number };
  /** The ladder's own cuts' share of every committed cut (C-XB04 (5)). */
  readonly fallbackShare: number;
  readonly corner: { readonly share: number | null; readonly bound: number; readonly n: number; readonly pass: boolean };
  readonly arrival: { readonly share: number | null; readonly bound: number; readonly n: number; readonly pass: boolean };
  /** σ and the fillet share: measured and reported, judged by M0-b-05a and M0-b-05b against the baseline rows. */
  readonly sigmaAndFillet: 'reported';
}

export function foldSignature(full: readonly FullRecord[]): SignatureSummary {
  const all: SignatureCut[] = [];
  const by = new Map<string, SignatureCut[]>();
  let setup = 0;
  let refused = 0;
  let notReplayed = 0;
  const rep = { cuts: 0, planner: 0, fallback: 0, deep: 0, matched: 0, missed: 0 };
  for (const f of full) {
    if (f.setup !== null) {
      setup += 1;
      continue;
    }
    if (f.refused !== null) {
      refused += 1;
      continue;
    }
    if (f.counts === null) {
      notReplayed += 1;
      continue;
    }
    for (const k of Object.keys(rep) as (keyof typeof rep)[]) rep[k] += f.counts[k];
    all.push(...f.cuts);
    const list = by.get(f.kind) ?? [];
    list.push(...f.cuts);
    by.set(f.kind, list);
  }
  const byKind: Record<string, SignatureRow> = {};
  for (const k of M0B_KINDS) if (by.has(k)) byKind[k] = signatureRow(by.get(k) as SignatureCut[]);
  for (const [k, v] of by) if (!(k in byKind)) byKind[k] = signatureRow(v);
  const row = signatureRow(all);
  const bent = row.bent;
  return {
    metricVersions: signatureVersions(),
    faces: full.length,
    setupRefused: setup,
    s8Refused: refused,
    all: row,
    byKind,
    replay: { ...rep, notReplayed },
    fallbackShare: rep.cuts === 0 ? 0 : (rep.fallback + rep.deep) / rep.cuts,
    corner: { share: row.cornerMid, bound: CORNER_MIN_SHARE, n: bent, pass: row.cornerMid !== null && bent > 0 && row.cornerMid >= CORNER_MIN_SHARE && refused === 0 },
    arrival: { share: row.arrival85, bound: ARRIVAL_MIN_SHARE, n: row.cuts, pass: row.arrival85 !== null && row.cuts > 0 && row.arrival85 >= ARRIVAL_MIN_SHARE && refused === 0 },
    sigmaAndFillet: 'reported',
  };
}

/** T34-1's 10 000-face mean of g (§13.2; C-0108). */
export interface T34Summary {
  readonly n: number;
  readonly wanted: number;
  readonly faces: number;
  readonly mean: number;
  readonly sd: number;
  /** The standard error from the sample's sd, and the bell's own (√26 / 30 / √n), and the mean's distance in s.e. */
  readonly se: number;
  readonly seTheory: number;
  readonly z: number;
  readonly target: number;
  readonly bound: number;
  readonly pass: boolean;
}

export function foldT34(g: readonly number[], wanted: number, faces: number): T34Summary {
  const n = Math.min(g.length, wanted);
  const xs = g.slice(0, n);
  let m = 0;
  for (const x of xs) m += x;
  m = n === 0 ? 0 : m / n;
  let v = 0;
  for (const x of xs) v += (x - m) * (x - m);
  const sd = n < 2 ? 0 : Math.sqrt(v / (n - 1));
  const se = n === 0 ? 0 : sd / Math.sqrt(n);
  const z = se > 0 ? (m - G_MEAN) / se : Infinity;
  return { n, wanted, faces, mean: m, sd, se, seTheory: n === 0 ? 0 : G_SD / Math.sqrt(n), z, target: G_MEAN, bound: T34_SE_BOUND, pass: n === wanted && n >= 2 && Math.abs(z) <= T34_SE_BOUND };
}

/** The work-per-unit block per counter the run charged (C-0091): the law's unit, the unit counts and the quantiles. */
export interface WorkCounter {
  readonly unit: 'faces';
  /** The law's form: a log2 law divides by ⌈log2(count)⌉ (at least 1), a linear law by the count. */
  readonly log2: boolean;
  readonly districts: number;
  readonly units: Quantiles;
  readonly unitsTotal: number;
  readonly perUnit: Quantiles;
}

export interface WorkSummary {
  readonly stage: 'S8';
  readonly fixture: 'one-face districts, CITY block scale';
  readonly counters: Readonly<Record<string, WorkCounter>>;
}

/** The divisor a law of the form applies to a unit count (§5.1 (5): floor + perUnit × count, or × ⌈log2(count)⌉). */
export function lawUnits(count: number, log2: boolean): number {
  if (!log2) return Math.max(1, count);
  return Math.max(1, Math.ceil(Math.log2(Math.max(1, count))));
}

export function foldWork(full: readonly FullRecord[]): WorkSummary {
  const ok = full.filter((f) => f.setup === null && f.refused === null);
  const counters: Record<string, WorkCounter> = {};
  const rows: [string, keyof FullRecord['work'], boolean][] = [
    ['cut.kernelCalls', 'kernelCalls', false],
    ['cut.recursionDepth', 'recursionDepth', true],
    ['cut.candidates', 'candidates', false],
  ];
  for (const [name, field, log2] of rows) {
    // Only a counter the run charged (C-0091).
    if (!ok.some((f) => f.work[field] > 0)) continue;
    let total = 0;
    for (const f of ok) total += f.units;
    counters[name] = {
      unit: 'faces',
      log2,
      districts: ok.length,
      units: quantiles(ok.map((f) => f.units)),
      unitsTotal: total,
      perUnit: quantiles(ok.map((f) => f.work[field] / lawUnits(f.units, log2))),
    };
  }
  return { stage: 'S8', fixture: 'one-face districts, CITY block scale', counters };
}

/** The harness's sizes. */
export interface BentCutSizes {
  readonly seed: number;
  /** F-CUT's random faces (half concave, half holed), the full runs for the residue (likewise), the signature's faces per M0 (b) kind, T34-1's g values. */
  readonly fcut: number;
  readonly districts: number;
  readonly signature: number;
  readonly t34: number;
}

/** BentCutReport — the interface M0-b-04 lists: the full report, written to PLAT_BENCH_OUT/bentcut/report.json. */
export interface BentCutReport {
  readonly item: 'M0-b-04';
  readonly sizes: BentCutSizes;
  readonly phases: readonly string[];
  readonly fcut: FcutSummary | null;
  readonly residue: ResidueSummary | null;
  readonly signature: SignatureSummary | null;
  readonly t34: T34Summary | null;
  readonly work: WorkSummary | null;
  /** The bars judged here: F-CUT, the corner and arrival clauses, T34-1's mean; null for a phase not run. */
  readonly verdicts: { readonly fcut: boolean | null; readonly corner: boolean | null; readonly arrival: boolean | null; readonly t34: boolean | null };
  readonly pass: boolean;
  /** The first few refusals and replay misses, by face. */
  readonly notes: readonly string[];
}

/** The numbers-only summary (C-0067; written only with --summary, checks/M0-spec-notes.md N-03). */
export function summaryOf(r: BentCutReport): Record<string, unknown> {
  return {
    item: r.item,
    sizes: r.sizes,
    pass: r.pass,
    verdicts: r.verdicts,
    fcut: r.fcut,
    residue: r.residue,
    signature: r.signature,
    t34: r.t34,
    work: r.work,
  };
}
