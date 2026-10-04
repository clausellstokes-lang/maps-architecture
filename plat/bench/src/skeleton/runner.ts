// The skeleton corpus runner (M0-a-12; §3.8 *Confirmation at M0*, C-0015, C-0067, C-0172 (8) – (10)): runs
// `skeleton(rings, use)` over a face set, counts every outcome — validated skeletons, downgrades by cause (the contract's
// refusals, E_WORK_LIMIT, the validator's four checks), failures (a refused call or a throw) — judges the corpus bar
// (downgrades ≤ 0.5 %, work-limit hits ≤ 0.1 %), and times a footprint's skeleton through M0-f-01's harness (the median
// per footprint; CONTENDED outside the timing phase, never judged there). Face sets come from the committed fixture
// folder `bench/fixtures/skeleton-corpus/` (`loadCorpus`, every file it opens logged and refused outside plat/) or
// in-process from a caller — the spike harnesses (M0-c-06, M0-e-06) pass their district and water faces directly; nothing
// is read from PLAT_BENCH_OUT (§17.1 (3)).
import { readdirSync, readFileSync, realpathSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  medialAxis,
  MEDIAL_STEP_CM,
  skeleton,
  type ContractRefusal,
  type KernelResult,
  type MedialAxis,
  type Polygon,
  type Skeleton,
  type SkeletonOptions,
  type SkeletonUse,
  type ValidatorCheck,
} from '@plat/kernel';
import { timeBatch, type RegisterRow, type TimeBatchOptions, type TimingResult } from '../timing/harness.js';
import { decodeCorpus, type CorpusFace } from './corpus.js';

/** plat/ itself, resolved (symbolic links followed, §17.1 (3)). */
export const PLAT_ROOT = realpathSync(fileURLToPath(new URL('../../../', import.meta.url)));
/** The committed fixture folder (C-0067). */
export const CORPUS_DIR = join(PLAT_ROOT, 'bench', 'fixtures', 'skeleton-corpus');
/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-a-12.json');

/** §3.8's corpus bar on the stand-in corpus (C-0015). */
export const CORPUS_BAR = Object.freeze({ downgradesMax: 0.005, workLimitHitsMax: 0.001 });

/** §3.8's timing bar as a register row (judged only in the timing phase, M0-t-01; C-0026, C-0098). */
export const SKELETON_TIMING_ROW: RegisterRow = Object.freeze({
  row: 'skeleton',
  budget: 20,
  unit: 'µs',
  measuredAt: 'the timing phase (M0-t-01) on the stand-in corpus (bench/fixtures/skeleton-corpus)',
  pass: '≤ 20 µs median per footprint (§3.8)',
  changeOnMiss: "C-0098's ordered ladder: one optimisation pass; ≤ 2× carried into the row; the WebAssembly accelerator; the D-18 re-declaration",
});

const REFUSALS: readonly ContractRefusal[] = ['empty', 'degenerate', 'notSimple', 'sharpCorner', 'holeContact', 'holeOutside'];
const CHECKS: readonly ValidatorCheck[] = ['planarity', 'faces', 'heights', 'topology'];

/** The paths a load opened for reading, resolved — the file-open log the checker reads (C-0067). */
export interface OpenLog {
  reads: string[];
}

/** A loaded face set: the faces, each one's family, the family names and the files read. */
export interface LoadedCorpus {
  faces: Polygon[][];
  families: number[];
  familyNames: string[];
  files: string[];
}

/** The skeleton service the runner calls (the kernel's, or a test's stand-in). */
export type SkeletonService = (rings: readonly Polygon[], use: SkeletonUse, opts?: SkeletonOptions<KernelResult<MedialAxis>>) => KernelResult<Skeleton<KernelResult<MedialAxis>>>;

export interface CorpusReport {
  use: SkeletonUse;
  faces: number;
  /** Validated skeletons. */
  skeletons: number;
  /** Every W_DOWNGRADE outcome: a contract refusal, E_WORK_LIMIT or a validator failure (§3.8). */
  downgrades: number;
  workLimitHits: number;
  /** Results that were not ok (a refused call) or calls that threw — a crash. */
  failures: number;
  shares: { downgrades: number; workLimitHits: number };
  causes: { contract: Record<ContractRefusal, number>; validator: Record<ValidatorCheck, number>; workLimit: number };
  /** Per family index (when the faces carry families): faces and downgrades. */
  byFamily: { faces: number; downgrades: number }[];
  events: { total: number; max: number };
  /** `spine` only: the downgrades whose sampled medial axis came back, and how many of those were empty. */
  axes: { computed: number; empty: number };
  /** The first fifty downgraded or failed faces' indices. */
  flagged: number[];
  bar: { downgradesMax: number; workLimitHitsMax: number; pass: boolean };
}

function insidePlat(real: string): boolean {
  return real === PLAT_ROOT || real.startsWith(PLAT_ROOT + sep);
}

/**
 * Reads every `.json` file of the fixture folder (name order) as a corpus file. Every path is resolved and refused
 * unless it lies inside plat/; each one opened is pushed to `log.reads` before it is read.
 */
export function loadCorpus(dir: string = CORPUS_DIR, log: OpenLog = { reads: [] }): LoadedCorpus {
  const realDir = realpathSync(dir);
  if (!insidePlat(realDir)) throw new Error(`skeleton corpus: ${dir} resolves outside plat/ (§17.1 (3))`);
  log.reads.push(realDir);
  const names = readdirSync(realDir)
    .filter((n) => n.endsWith('.json'))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const out: LoadedCorpus = { faces: [], families: [], familyNames: [], files: [] };
  for (const name of names) {
    const real = realpathSync(join(realDir, name));
    if (!insidePlat(real)) throw new Error(`skeleton corpus: ${name} resolves outside plat/ (§17.1 (3))`);
    log.reads.push(real);
    const file = decodeCorpus(readFileSync(real, 'utf8'));
    const base = out.familyNames.length;
    out.familyNames.push(...file.families);
    for (const f of file.faces) {
      out.faces.push(f.rings);
      out.families.push(base + f.family);
    }
    out.files.push(relative(PLAT_ROOT, real));
  }
  return out;
}

/** The faces of in-process corpus entries (a caller's own set). */
export function facesOf(entries: readonly CorpusFace[]): Polygon[][] {
  return entries.map((e) => e.rings);
}

/**
 * Runs `skeleton(rings, use)` over every face and counts the outcomes (§3.8's corpus bar). For `spine`, the sampled
 * medial axis is injected (§3.8; M0-a-12's `medialAxis` at 1 m) and each downgrade's axis is counted. Pure: it opens no
 * file; the same faces give the same report.
 */
export function skeletonCorpus(
  faces: readonly (readonly Polygon[])[],
  use: SkeletonUse,
  opts: { families?: readonly number[]; service?: SkeletonService } = {},
): CorpusReport {
  const service: SkeletonService = opts.service ?? ((r, u, o) => skeleton(r, u, o));
  const contract = Object.fromEntries(REFUSALS.map((k) => [k, 0])) as Record<ContractRefusal, number>;
  const validator = Object.fromEntries(CHECKS.map((k) => [k, 0])) as Record<ValidatorCheck, number>;
  const report: CorpusReport = {
    use,
    faces: faces.length,
    skeletons: 0,
    downgrades: 0,
    workLimitHits: 0,
    failures: 0,
    shares: { downgrades: 0, workLimitHits: 0 },
    causes: { contract, validator, workLimit: 0 },
    byFamily: [],
    events: { total: 0, max: 0 },
    axes: { computed: 0, empty: 0 },
    flagged: [],
    bar: { downgradesMax: CORPUS_BAR.downgradesMax, workLimitHitsMax: CORPUS_BAR.workLimitHitsMax, pass: false },
  };
  const skelOpts: SkeletonOptions<KernelResult<MedialAxis>> = use === 'spine' ? { medialAxis: (r) => medialAxis(r, MEDIAL_STEP_CM) } : {};
  const flag = (i: number): void => {
    if (report.flagged.length < 50) report.flagged.push(i);
  };
  faces.forEach((rings, i) => {
    const fam = opts.families?.[i];
    if (fam !== undefined) {
      while (report.byFamily.length <= fam) report.byFamily.push({ faces: 0, downgrades: 0 });
      report.byFamily[fam].faces += 1;
    }
    let r: KernelResult<Skeleton<KernelResult<MedialAxis>>>;
    try {
      r = service(rings, use, skelOpts);
    } catch {
      report.failures += 1;
      flag(i);
      return;
    }
    if (!r.ok) {
      report.failures += 1;
      flag(i);
      return;
    }
    const v = r.value;
    report.events.total += v.events;
    if (v.events > report.events.max) report.events.max = v.events;
    if (v.kind === 'skeleton') {
      report.skeletons += 1;
      return;
    }
    report.downgrades += 1;
    if (fam !== undefined) report.byFamily[fam].downgrades += 1;
    flag(i);
    const cause = v.cause;
    if (cause.code === 'E_WORK_LIMIT') {
      report.workLimitHits += 1;
      report.causes.workLimit += 1;
    } else if (cause.code === 'contract') {
      report.causes.contract[cause.refusal] += 1;
    } else {
      report.causes.validator[cause.check] += 1;
    }
    if (use === 'spine' && v.axis !== undefined && v.axis.ok) {
      report.axes.computed += 1;
      if (v.axis.value.nodes.length === 0) report.axes.empty += 1;
    }
  });
  const n = Math.max(1, faces.length);
  report.shares = { downgrades: report.downgrades / n, workLimitHits: report.workLimitHits / n };
  report.bar.pass =
    faces.length > 0 &&
    report.failures === 0 &&
    report.shares.downgrades <= CORPUS_BAR.downgradesMax &&
    report.shares.workLimitHits <= CORPUS_BAR.workLimitHitsMax;
  return report;
}

/** The middle of a sorted list (the lower middle for an even count, so the figure is a measured value). */
function median(sorted: readonly number[]): number {
  return sorted[(sorted.length - 1) >> 1];
}

/**
 * The per-footprint figure of §3.8's timing bar: each face's skeleton timed `rounds` times, its median taken, and the
 * median of those over the corpus, in µs — handed to M0-f-01's `timeBatch` as the workload's own figure, so the result
 * carries the harness's stamp (host, measured authority, normalisation). Outside the timing phase it is CONTENDED and
 * never judged (`judge` answers `requeue`).
 */
export async function timeCorpus(
  faces: readonly (readonly Polygon[])[],
  use: SkeletonUse,
  opts: { rounds?: number; service?: SkeletonService; batch?: TimeBatchOptions } = {},
): Promise<TimingResult> {
  const rounds = opts.rounds ?? 5;
  if (!(Number.isInteger(rounds) && rounds >= 1)) throw new Error(`timeCorpus: rounds ${rounds} must be a positive integer`);
  if (faces.length === 0) throw new Error('timeCorpus: no faces');
  const service: SkeletonService = opts.service ?? ((r, u, o) => skeleton(r, u, o));
  const skelOpts: SkeletonOptions<KernelResult<MedialAxis>> = use === 'spine' ? { medialAxis: (r) => medialAxis(r, MEDIAL_STEP_CM) } : {};
  return timeBatch(
    () => {
      const ns: number[][] = faces.map(() => []);
      let sink = 0;
      for (let k = 0; k < rounds; k += 1) {
        for (let i = 0; i < faces.length; i += 1) {
          const t0 = process.hrtime.bigint();
          const r = service(faces[i], use, skelOpts);
          const t1 = process.hrtime.bigint();
          if (r.ok) sink += r.value.events;
          ns[i].push(Number(t1 - t0));
        }
      }
      const perFace = ns.map((xs) => median([...xs].sort((a, b) => a - b))).sort((a, b) => a - b);
      if (sink < 0) throw new Error('unreachable');
      return { value: median(perFace) / 1000, unit: 'µs' as const };
    },
    { label: `skeleton (${use}): median µs per footprint over ${faces.length} footprints, ${rounds} rounds`, ...opts.batch },
  );
}
