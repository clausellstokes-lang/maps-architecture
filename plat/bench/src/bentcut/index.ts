// bench/src/bentcut — the F-CUT bars and the bent-cut signature harness, measured on ours (M0-b-04; §4.6 step 8's bars,
// §13.5's bent-cut signature row, §13.8's T34-1 mean, §16 M0 (b)'s corner and arrival clauses; C-0067, C-0073, C-0091,
// C-0108; readings C-0242). The folder was created empty by the scaffold (M0-s-01, C-0013) and belongs to M0-b-04.
//
//   corepack pnpm bench -- bentcut [--seed N] [--fcut N] [--districts N] [--sig N] [--t34 N] [--workers W]
//                                  [--only fcut,residue,signature,t34] [--summary]
//
// runs, on one-face districts through the real S8 stage (district.ts), on M0-k-01's generated faces (faces.ts):
//   fcut       §4.6 step 8's F-CUT bar on --fcut random faces (10⁵; half concave, half holed): each face's ladder ends
//              in ≤ 6 kernel calls and the face count never decreases (runs.ts);
//   residue    --districts whole districts of the same faces (1 000): each district's substitution residue share
//              against the soft 5 % (reported, never gating), and every ladder at every depth, judged with F-CUT (a
//              district S8 refuses or throws on fails it);
//   signature  --sig faces of each of §16 M0 (b)'s five kinds (100): every cut the planner made, replayed and measured
//              (signature.ts) — σ and the fillet share reported, the corner clause (within 0.10 of mid-course on
//              ≥ 80 % of bent cuts) and the arrival clause (≥ 85° on ≥ 95 %) judged (C-0073);
//   t34        T34-1's mean of g over --t34 stop draws (10 000) of whole districts of the M0 (b) faces, taken round the
//              five kinds face by face: within 7/30 ± 3 s.e. (C-0108);
// and folds the counters' work per unit (C-0091). The full report goes to $PLAT_BENCH_OUT/bentcut/report.json; the
// numbers-only summary to docs/build/summaries/M0-b-04.json only with --summary on a whole run (checks/M0-spec-notes.md
// N-03: a run item's re-run writes nothing in plat/). Exit 0 when every bar judged holds, 1 when one does not, 64 on a
// bad argument. --workers W runs the faces across W worker threads (the report does not depend on W).
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { outDir, say, writeJson } from '../timing/output.js';
import { FCUT_KINDS, M0B_KINDS } from './faces.js';
import { runTasks } from './pool.js';
import { foldFcut, foldResidue, foldSignature, foldT34, foldWork, summaryOf, type BentCutReport, type BentCutSizes } from './report.js';
import type { FaceRecord, FcutRecord, FullRecord, Task } from './runs.js';

export { faceAt, faceSeed, faceSet, FCUT_KINDS, M0B_KINDS, type BentCutFaceKind, type FaceScale } from './faces.js';
export { DENSITY, districtFaces, faceDistrict, FRAME_HALF_CM, GROUND, PROSPERITY, type FaceDistrict, type FaceDistrictOptions } from './district.js';
export { contextOf, kerbFaceOf, LAND_TOL_CM, lands, lineAngleCdeg, measureCut, placeAlong, replayDistrict, sampleOf, type CutSample, type FrameLine, type ReplayCounts, type ReplayResult, type SignatureCut } from './signature.js';
export { depthOneLimits, districtSeed, NO_DEEP, runFcut, runFull, runTask, type FaceRecord, type FcutRecord, type FullRecord, type Task } from './runs.js';
export { runTasks } from './pool.js';
export {
  ARRIVAL_MIN_SHARE,
  CORNER_MIN_SHARE,
  FCUT_MAX_CALLS,
  foldFcut,
  foldResidue,
  foldSignature,
  foldT34,
  foldWork,
  G_MEAN,
  G_SD,
  lawUnits,
  quantiles,
  RESIDUE_SOFT,
  signatureRow,
  signatureVersions,
  summaryOf,
  T34_SE_BOUND,
  type BentCutReport,
  type BentCutSizes,
  type FcutSummary,
  type Quantiles,
  type ResidueSummary,
  type SignatureRow,
  type SignatureSummary,
  type T34Summary,
  type WorkCounter,
  type WorkSummary,
} from './report.js';

/** plat/ (this file is bench/src/bentcut/index.ts). */
export const PLAT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

/** The numbers-only summary (C-0067). */
export const SUMMARY_PATH = join(PLAT_ROOT, 'docs', 'build', 'summaries', 'M0-b-04.json');

/** The bar sizes (§4.6 step 8: 10⁵ faces; §13.2 T34-1: 10 000), the residue's districts and the signature's faces per kind. */
export const DEFAULT_SIZES: BentCutSizes = Object.freeze({ seed: 1, fcut: 100_000, districts: 1_000, signature: 100, t34: 10_000 });

export const PHASES = Object.freeze(['fcut', 'residue', 'signature', 't34'] as const);
export type Phase = (typeof PHASES)[number];

const USAGE = 'usage: corepack pnpm bench -- bentcut [--seed N] [--fcut N] [--districts N] [--sig N] [--t34 N] [--workers W] [--only fcut,residue,signature,t34] [--summary]';

/** The dispatcher's context, with the summary path a test may redirect. */
export interface BentCutContext {
  out: string;
  summary?: string;
  /** Called with the report before the exit (the entry's tests read it). */
  onReport?: (r: BentCutReport) => void;
  /** Runs each task in this thread instead of runs.ts's `runTask` (the entry's tests plant a record). */
  runTask?: (t: Task) => FaceRecord;
}

/** The parsed arguments, or the reason they are refused. */
export interface BentCutArgs {
  readonly sizes: BentCutSizes;
  readonly phases: readonly Phase[];
  readonly workers: number;
  readonly summary: boolean;
}

function intArg(args: readonly string[], name: string, lo: number, hi: number): number | undefined | null {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const raw = args[i + 1];
  if (raw === undefined || !/^[0-9]+$/.test(raw)) return null;
  const v = Number(raw);
  return Number.isInteger(v) && v >= lo && v <= hi ? v : null;
}

/** Parses the entry's arguments (exit 64 on a refusal). */
export function parseArgs(args: readonly string[], env: Readonly<Record<string, string | undefined>> = process.env): BentCutArgs | string {
  const valued = new Set(['--seed', '--fcut', '--districts', '--sig', '--t34', '--workers', '--only']);
  const seen = new Set<string>();
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--summary') {
      if (seen.has(a)) return `${a} given twice`;
      seen.add(a);
      continue;
    }
    if (!valued.has(a)) return `unknown argument ${JSON.stringify(a)}`;
    if (seen.has(a)) return `${a} given twice`;
    seen.add(a);
    i += 1;
  }
  const seed = intArg(args, '--seed', 0, 0xffffffff);
  const fcut = intArg(args, '--fcut', 1, 10_000_000);
  const districts = intArg(args, '--districts', 1, 1_000_000);
  const sig = intArg(args, '--sig', 1, 1_000_000);
  const t34 = intArg(args, '--t34', 2, 10_000_000);
  const envWorkers = env.PLAT_BENCH_WORKERS;
  const given = intArg(args, '--workers', 1, 64);
  // A refused --workers stays refused (null), never read as the default.
  const workers = given !== undefined ? given : envWorkers === undefined || envWorkers === '' ? 1 : /^[1-9][0-9]?$/.test(envWorkers) && Number(envWorkers) <= 64 ? Number(envWorkers) : null;
  if (seed === null || fcut === null || districts === null || sig === null || t34 === null || workers === null) return 'a size, seed or worker count is not a whole number in its range';
  let phases: Phase[] = [...PHASES];
  const oi = args.indexOf('--only');
  if (oi >= 0) {
    const list = (args[oi + 1] ?? '').split(',');
    if (list.length === 0 || list.some((p) => !(PHASES as readonly string[]).includes(p))) return `--only takes phases from ${PHASES.join(', ')}`;
    phases = PHASES.filter((p) => list.includes(p));
  }
  const summary = args.includes('--summary');
  if (summary && phases.length !== PHASES.length) return '--summary writes a whole run\'s summary: no --only with it';
  return {
    sizes: { seed: seed ?? DEFAULT_SIZES.seed, fcut: fcut ?? DEFAULT_SIZES.fcut, districts: districts ?? DEFAULT_SIZES.districts, signature: sig ?? DEFAULT_SIZES.signature, t34: t34 ?? DEFAULT_SIZES.t34 },
    phases,
    workers,
    summary,
  };
}

/** The F-CUT phase's tasks: face j of the run is face ⌊j / 2⌋ of the concave set (j even) or the holed set (j odd). */
export function fcutTasks(n: number, seed: number): Task[] {
  return Array.from({ length: n }, (_, j) => ({ phase: 'fcut' as const, kind: FCUT_KINDS[j % 2], i: Math.floor(j / 2), seed }));
}

/** The residue phase's tasks: the same faces, whole. */
export function residueTasks(n: number, seed: number): Task[] {
  return Array.from({ length: n }, (_, j) => ({ phase: 'full' as const, kind: FCUT_KINDS[j % 2], i: Math.floor(j / 2), seed }));
}

/** The signature phase's tasks: n faces of each M0 (b) kind, whole, replayed. */
export function signatureTasks(n: number, seed: number): Task[] {
  const out: Task[] = [];
  for (const kind of M0B_KINDS) for (let i = 0; i < n; i += 1) out.push({ phase: 'full', kind, i, seed, replay: true });
  return out;
}

/** T34-1's face j: face ⌊j / 5⌋ of the M0 (b) kind j mod 5 (round the five kinds, face by face). */
export function t34Task(j: number, seed: number): Task {
  return { phase: 'full', kind: M0B_KINDS[j % M0B_KINDS.length], i: Math.floor(j / M0B_KINDS.length), seed };
}

/** The harness (see the module comment): its report, built from the face records alone. */
export async function bentcut(a: BentCutArgs, log: (line: string) => void = () => {}, runner?: (t: Task) => FaceRecord): Promise<BentCutReport> {
  const { sizes, phases, workers } = a;
  const on = (p: Phase): boolean => phases.includes(p);
  const notes: string[] = [];
  const note = (s: string): void => {
    if (notes.length < 12) notes.push(s);
  };
  // Progress at each tenth of a long phase (one line per tenth crossed).
  const tick = (label: string) => {
    let shown = 0;
    return (done: number, total: number): void => {
      const tenth = Math.floor((10 * done) / total);
      if (total >= 200 && tenth > shown) {
        shown = tenth;
        log(`bentcut: ${label} ${String(done)} / ${String(total)}`);
      }
    };
  };
  // F-CUT.
  let fcutRecords: FcutRecord[] = [];
  if (on('fcut')) {
    fcutRecords = (await runTasks(fcutTasks(sizes.fcut, sizes.seed), workers, 50, tick('fcut'), runner)) as FcutRecord[];
    for (const r of fcutRecords) {
      if (r.setup !== null) note(`fcut ${r.kind} #${String(r.i)}: setup refused: ${r.setup}`);
      else if (r.refused !== null) note(`fcut ${r.kind} #${String(r.i)}: S8 refused: ${r.refused}`);
    }
  }
  // The whole districts: the residue's, the signature's; T34-1 reads the signature's where they are its faces.
  const residueT = on('residue') ? residueTasks(sizes.districts, sizes.seed) : [];
  const sigT = on('signature') ? signatureTasks(sizes.signature, sizes.seed) : [];
  const full = (await runTasks([...residueT, ...sigT], workers, 1, tick('districts'), runner)) as FullRecord[];
  const residueRecords = full.slice(0, residueT.length);
  const sigRecords = full.slice(residueT.length);
  const byKey = new Map<string, FullRecord>();
  for (const r of sigRecords) byKey.set(`${r.kind}#${String(r.i)}`, r);
  const t34Records: FullRecord[] = [];
  let g: number[] = [];
  if (on('t34')) {
    // C-0242 (7), fix round S2: the faces are read in batches (a batch's missing faces run across the workers), but the phase
    // keeps only the faces up to the one that supplies the n-th draw — so t34Records (t34.faces, the notes, the work
    // block) is the same for every batch size, and so for every worker count.
    const limit = 50 * sizes.t34; // no stop draws at all: the bar fails below on its count
    let j = 0;
    while (g.length < sizes.t34 && j < limit) {
      // The next batch of faces round the kinds: those the signature ran are read, the others run whole.
      const batch: Task[] = [];
      const want = Math.min(Math.max(10, 2 * workers), limit - j);
      for (let b = 0; b < want; b += 1) batch.push(t34Task(j + b, sizes.seed));
      const missing = batch.filter((t) => !byKey.has(`${t.kind}#${String(t.i)}`));
      const ran = (await runTasks(missing, workers, 1, undefined, runner)) as FullRecord[];
      for (const r of ran) byKey.set(`${r.kind}#${String(r.i)}`, r);
      for (const t of batch) {
        if (g.length >= sizes.t34) break;
        const r = byKey.get(`${t.kind}#${String(t.i)}`) as FullRecord;
        t34Records.push(r);
        if (r.setup !== null || r.refused !== null) note(`t34 ${r.kind} #${String(r.i)}: ${r.setup ?? r.refused ?? ''}`);
        for (const x of r.g) if (g.length < sizes.t34) g.push(x);
      }
      j += want;
    }
    g = g.slice(0, sizes.t34);
  }
  for (const r of [...residueRecords, ...sigRecords]) {
    if (r.setup !== null) note(`${r.kind} #${String(r.i)}: setup refused: ${r.setup}`);
    else if (r.refused !== null) note(`${r.kind} #${String(r.i)}: S8 refused: ${r.refused}`);
    else if (r.counts !== null && r.counts.missed > 0) note(`${r.kind} #${String(r.i)}: ${String(r.counts.missed)} replay misses: ${r.counts.misses.join('; ')}`);
  }
  const fcut = on('fcut') ? foldFcut(fcutRecords, residueRecords) : null;
  const residue = on('residue') ? foldResidue(residueRecords) : null;
  const signature = on('signature') ? foldSignature(sigRecords) : null;
  const t34 = on('t34') ? foldT34(g, sizes.t34, new Set(t34Records.map((r) => `${r.kind}#${String(r.i)}`)).size) : null;
  // The work per unit over every whole district the run made (each once).
  const seen = new Set<string>();
  const workRecords: FullRecord[] = [];
  for (const r of [...residueRecords.map((x) => ['r', x] as const), ...[...sigRecords, ...t34Records].map((x) => ['m', x] as const)]) {
    const k = `${r[0]}:${r[1].kind}#${String(r[1].i)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    workRecords.push(r[1]);
  }
  const work = workRecords.length > 0 ? foldWork(workRecords) : null;
  const verdicts = {
    fcut: fcut === null ? null : fcut.pass,
    corner: signature === null ? null : signature.corner.pass,
    arrival: signature === null ? null : signature.arrival.pass,
    t34: t34 === null ? null : t34.pass,
  };
  const pass = Object.values(verdicts).every((v) => v !== false);
  return { item: 'M0-b-04', sizes, phases: [...phases], fcut, residue, signature, t34, work, verdicts, pass, notes };
}

function pct(x: number | null): string {
  return x === null ? 'n/a' : `${(100 * x).toFixed(2)} %`;
}

/** The dispatcher's entry. */
export async function run(args: string[], ctx: BentCutContext): Promise<number> {
  const a = parseArgs(args);
  if (typeof a === 'string') {
    say(`bentcut: ${a}; ${USAGE}`);
    return 64;
  }
  const dir = join(outDir(ctx.out), 'bentcut');
  mkdirSync(dir, { recursive: true });
  const t0 = performance.now();
  say(`bentcut: phases ${a.phases.join(', ')}; seed ${String(a.sizes.seed)}; fcut ${String(a.sizes.fcut)} faces, ${String(a.sizes.districts)} residue districts, ${String(a.sizes.signature)} signature faces per kind, t34 ${String(a.sizes.t34)}; ${String(a.workers)} worker(s)`);
  const r = await bentcut(a, say, ctx.runTask);
  const seconds = (performance.now() - t0) / 1000;
  if (r.fcut !== null) {
    const f = r.fcut;
    say(`bentcut: F-CUT ${String(f.run)} faces run of ${String(f.faces)} (${String(f.setupRefused)} not built, ${String(f.s8Refused)} refused by S8): the ladder ends in ≤ ${String(f.maxKernelCalls)} kernel calls (calls ${JSON.stringify(f.callsHistogram)}), ${String(f.decreases)} face-count decreases; outcomes ${JSON.stringify(f.outcomes)} — ${f.pass ? 'HOLDS' : 'FAILS'}`);
    say(`bentcut: F-CUT at every depth of ${String(f.allDepths.districts)} whole districts of the same faces: ${String(f.allDepths.ladders)} ladders, ≤ ${String(f.allDepths.maxKernelCalls)} kernel calls, ${String(f.allDepths.decreases)} decreases, ${String(f.allDepths.refused)} districts refused or thrown on by S8`);
  }
  if (r.residue !== null) {
    const x = r.residue;
    say(`bentcut: residue (soft ≤ 5 %, reported) over ${String(x.districts)} districts: ${String(x.softExceeded)} above it (${pct(x.exceededShare)}), land share ${pct(x.landShare)}, per district p50 ${pct(x.perDistrict.p50)} p99 ${pct(x.perDistrict.p99)} max ${pct(x.perDistrict.max)}`);
  }
  if (r.signature !== null) {
    const s = r.signature;
    say(`bentcut: signature over ${String(s.all.cuts)} planner cuts of ${String(s.faces)} faces (${String(s.replay.matched)} replayed of ${String(s.replay.planner)}, ${String(s.replay.missed)} misses; the ladder's own cuts ${pct(s.fallbackShare)} of ${String(s.replay.cuts)}): corner within 0.10 of mid-course ${pct(s.corner.share)} of ${String(s.corner.n)} bent (≥ 80 %: ${s.corner.pass ? 'HOLDS' : 'FAILS'}); arrival ≥ 85° ${pct(s.arrival.share)} (≥ 95 %: ${s.arrival.pass ? 'HOLDS' : 'FAILS'})`);
    say(`bentcut: reported, not judged (M0-b-05a / M0-b-05b): σ ${s.all.sigma?.toFixed(4) ?? 'n/a'} (plain ${s.all.sigmaPlain?.toFixed(4) ?? 'n/a'}, ring ${s.all.sigmaRing?.toFixed(4) ?? 'n/a'}; first frame ${s.all.sigmaFirstFrame?.toFixed(4) ?? 'n/a'}; attempt 0 ${s.all.sigmaAttempt0?.toFixed(4) ?? 'n/a'}), fillet share ${pct(s.all.fillet)} of bent cuts`);
  }
  if (r.t34 !== null) {
    const t = r.t34;
    say(`bentcut: T34-1 mean of g over ${String(t.n)} faces' draws (${String(t.faces)} districts): ${t.mean.toFixed(5)} against 7/30 = ${G_MEAN_TEXT}, s.e. ${t.se.toFixed(5)}, ${t.z.toFixed(2)} s.e. — ${t.pass ? 'HOLDS' : 'FAILS'}`);
  }
  for (const n of r.notes) say(`bentcut:   ${n}`);
  const full = writeJson(dir, 'report.json', { ...r, seconds });
  if (a.summary) {
    const path = ctx.summary ?? SUMMARY_PATH;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(summaryOf(r), null, 2)}\n`);
    say(`bentcut: summary ${relative(PLAT_ROOT, path)}`);
  }
  say(`bentcut: bars ${r.pass ? 'HOLD' : 'FAIL'} (${JSON.stringify(r.verdicts)}); full report ${full.path} (${seconds.toFixed(0)} s CONTENDED, never judged)`);
  ctx.onReport?.(r);
  return r.pass ? 0 : 1;
}

const G_MEAN_TEXT = (7 / 30).toFixed(5);
