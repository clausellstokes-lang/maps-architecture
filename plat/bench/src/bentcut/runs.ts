// One face's runs (M0-b-04): a task names a face of a set and a phase, and returns a small record of plain numbers, so
// it can run in a worker thread and the harness folds the records in task order — the same report for any number of
// workers (C-0242 (7)).
//
//   fcut   §4.6 step 8's F-CUT bar on one random face: the face as a one-face district through S8 (`runS8`) with its
//          recursion bounded at depth 1 — a test-side work-limits table whose `cut.recursionDepth` law is fixed at 1,
//          and a deep factor no block reaches, so the children stand as blocks without a spine — so the face's own
//          ladder runs exactly as in a full run (the depth-0 ladder reads no recursion limit; a test pins it) and the
//          run costs one ladder, not a whole district (C-0242 (1)). Its record: the depth-0 ladder's kernel calls and
//          outcome, its face count after, and the district's L1 faces before and after.
//   full   the whole district through S8: its stop draws (T34-1's g), its substitution residue, its work counters and
//          the unit count its laws read (C-0091), every ladder's calls and face counts, and — with `replay` — the
//          signature's measured cuts (signature.ts).
import { runS8, type DistrictReport } from '@plat/layout';
import { loadWorkLimits, type WorkLimitsTable } from '@plat/tables';
import { districtFaces, faceDistrict, type FaceDistrict } from './district.js';
import { faceAt, faceSeed, type BentCutFaceKind } from './faces.js';
import { replayDistrict, type CommittedArrivals, type ReplayCounts, type SignatureCut } from './signature.js';

/** A task: a face of the set (kind, seed) and the phase to run on it. */
export interface Task {
  readonly phase: 'fcut' | 'full';
  readonly kind: BentCutFaceKind;
  readonly i: number;
  readonly seed: number;
  /** full: measure the signature (the replay). */
  readonly replay?: boolean;
}

/** The fcut phase's record. */
export interface FcutRecord {
  readonly phase: 'fcut';
  readonly kind: BentCutFaceKind;
  readonly i: number;
  /** The kernel refused the face's rings (not an S8 input), with its reason; null when the district was built. */
  readonly setup: string | null;
  /** S8 refused the district (its code and detail), or null. */
  readonly refused: string | null;
  /** The depth-0 ladder: its kernel calls, its outcome and the faces it left (BentCutFabric's FaceLadder). */
  readonly kernelCalls: number;
  readonly outcome: string;
  readonly facesAfterLadder: number;
  /** The district's L1 faces before and after S8. */
  readonly facesBefore: number;
  readonly facesAfter: number;
}

/** The full phase's record. */
export interface FullRecord {
  readonly phase: 'full';
  readonly kind: BentCutFaceKind;
  readonly i: number;
  readonly setup: string | null;
  readonly refused: string | null;
  /** Every stop test's g, in the report's order (T34-1). */
  readonly g: readonly number[];
  readonly residue: { readonly areaCm2: number; readonly builtCm2: number; readonly share: number; readonly soft: boolean };
  readonly work: { readonly kernelCalls: number; readonly recursionDepth: number; readonly candidates: number };
  /** The `faces` count the district's laws divide by (BentCutFabric's `districtCounts`). */
  readonly units: number;
  /**
   * Every ladder of the district: how many, the most kernel calls, the fewest faces left, faces left below one, and the
   * ladders that ended `unresolved` (the face stands whole: an ending, not a pass of rung (c); hardening S3, N-1).
   */
  readonly ladders: { readonly n: number; readonly maxCalls: number; readonly minFacesAfter: number; readonly decreases: number; readonly unresolved: number };
  readonly facesBefore: number;
  readonly facesAfter: number;
  readonly blocks: number;
  readonly lanes: number;
  /** F-WORK hits (C-0085), by counter. */
  readonly workCut: readonly string[];
  /** The measured cuts and the replay's counts (replay only; null otherwise or when the replay was not S8's run). */
  readonly cuts: readonly SignatureCut[];
  readonly counts: ReplayCounts | null;
  /** The arrivals read from the committed geometry (replay only; null otherwise; hardening S3, N-2). */
  readonly arrivals: CommittedArrivals | null;
}

export type FaceRecord = FcutRecord | FullRecord;

/** The F-CUT phase's work-limits table: the shipped one, `cut.recursionDepth` fixed at 1 (C-0242 (1)). */
export function depthOneLimits(base: WorkLimitsTable = loadWorkLimits()): WorkLimitsTable {
  return {
    table: base.table,
    laws: base.laws,
    has: (c: string) => base.has(c),
    law: (c: string) => (c === 'cut.recursionDepth' ? { counter: c, unit: 'fixed', perUnit: 0, floor: 1 } : base.law(c)),
  };
}

/** A deep factor no block reaches: the F-CUT phase's children stand as blocks without a spine (BentCutFabric's knob). */
export const NO_DEEP = 1e9;

/** The derivation seed of face i of (kind, seed): its own fast-check seed as a u32. */
export function districtSeed(kind: BentCutFaceKind, seed: number, i: number): number {
  return faceSeed(kind, seed, i) >>> 0;
}

function build(t: Task, opts: { workLimits?: WorkLimitsTable; deepFactor?: number } = {}): FaceDistrict | string {
  const face = faceAt(t.kind, t.i, t.seed);
  try {
    return faceDistrict(face.polygon, districtSeed(t.kind, t.seed, t.i), opts);
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
}

const NO_REPORT = { report: undefined } as never;

/** The fcut phase on one face. */
export function runFcut(t: Task): FcutRecord {
  const base = { phase: 'fcut' as const, kind: t.kind, i: t.i };
  const fd = build(t, { workLimits: depthOneLimits(), deepFactor: NO_DEEP });
  if (typeof fd === 'string') return { ...base, setup: fd, refused: null, kernelCalls: 0, outcome: 'setup', facesAfterLadder: 0, facesBefore: 0, facesAfter: 0 };
  const r = runS8(fd.input, NO_REPORT);
  const refusedOf = (): string | null => {
    if (!r.ok) return `${r.code} ${r.detail}`;
    const x = r.value.infill.report.refused[0];
    return x === undefined ? null : `${x.code} ${x.detail}`;
  };
  const refused = refusedOf();
  const after = districtFaces(fd.plat, fd.district);
  const d = r.ok ? r.value.infill.report.districts[0] : undefined;
  const top = d?.faces.find((f) => f.depth === 0);
  return {
    ...base,
    setup: null,
    refused: refused ?? (top === undefined ? 'no depth-0 ladder in the report' : null),
    kernelCalls: top?.kernelCalls ?? 0,
    outcome: top?.outcome ?? 'none',
    facesAfterLadder: top?.facesAfter ?? 0,
    facesBefore: fd.facesBefore,
    facesAfter: after,
  };
}

function fullOf(t: Task, fd: FaceDistrict, d: DistrictReport, facesAfter: number, cuts: readonly SignatureCut[], counts: ReplayCounts | null, arrivals: CommittedArrivals | null): FullRecord {
  let maxCalls = 0;
  let minFacesAfter = Infinity;
  let decreases = 0;
  let unresolved = 0;
  for (const f of d.faces) {
    if (f.kernelCalls > maxCalls) maxCalls = f.kernelCalls;
    if (f.facesAfter < minFacesAfter) minFacesAfter = f.facesAfter;
    if (f.facesAfter < 1) decreases += 1;
    if (f.outcome === 'unresolved') unresolved += 1;
  }
  return {
    phase: 'full',
    kind: t.kind,
    i: t.i,
    setup: null,
    refused: null,
    g: d.stops.map((s) => s.g),
    residue: { areaCm2: d.residueAreaCm2, builtCm2: d.builtAreaCm2, share: d.residueShare, soft: d.residueSoftExceeded },
    work: { ...d.work },
    units: fd.units.faces,
    ladders: { n: d.faces.length, maxCalls, minFacesAfter: d.faces.length === 0 ? 0 : minFacesAfter, decreases, unresolved },
    facesBefore: fd.facesBefore,
    facesAfter,
    blocks: d.blocks,
    lanes: d.lanes,
    workCut: d.workCut.map((w) => w.counter),
    cuts,
    counts,
    arrivals,
  };
}

function refusedFull(t: Task, setup: string | null, refused: string | null): FullRecord {
  return {
    phase: 'full',
    kind: t.kind,
    i: t.i,
    setup,
    refused,
    g: [],
    residue: { areaCm2: 0, builtCm2: 0, share: 0, soft: false },
    work: { kernelCalls: 0, recursionDepth: 0, candidates: 0 },
    units: 0,
    ladders: { n: 0, maxCalls: 0, minFacesAfter: 0, decreases: 0, unresolved: 0 },
    facesBefore: 0,
    facesAfter: 0,
    blocks: 0,
    lanes: 0,
    workCut: [],
    cuts: [],
    counts: null,
    arrivals: null,
  };
}

/**
 * The stage and the replay a full run calls: S8's own `runS8` and signature.ts's `replayDistrict` unless a test hands
 * others (the seams a test plants a district report or an over-limit replay through; hardening S3, N-4).
 */
export interface FullRunSeams {
  readonly s8?: typeof runS8;
  readonly replay?: typeof replayDistrict;
}

/** S8's own run of a built district (runS8): its report and the district's faces after. */
function s8Run(t: Task, fd: FaceDistrict, s8: typeof runS8): FullRecord {
  const r = s8(fd.input, NO_REPORT);
  if (!r.ok) return refusedFull(t, null, `${r.code} ${r.detail}`);
  const x = r.value.infill.report.refused[0];
  const d = r.value.infill.report.districts[0];
  if (x !== undefined || d === undefined) return refusedFull(t, null, x === undefined ? 'no district report' : `${x.code} ${x.detail}`);
  return fullOf(t, fd, d, districtFaces(fd.plat, fd.district), [], null, null);
}

/**
 * The full phase on one face (with the signature's replay when `t.replay`). `seams` only from a test; a number — the
 * index `tasks.map(runFull)` passes — is no seam, so the function stays a map callback as before the seam existed.
 */
export function runFull(t: Task, seams: FullRunSeams | number = {}): FullRecord {
  const sm: FullRunSeams = typeof seams === 'number' ? {} : seams;
  const s8 = sm.s8 ?? runS8;
  const fd = build(t);
  if (typeof fd === 'string') return refusedFull(t, fd, null);
  if (t.replay !== true) return s8Run(t, fd, s8);
  const r = (sm.replay ?? replayDistrict)(fd, t.kind);
  // A batch that failed or passed S8's own limit is not S8's run: S8's own run on a fresh district stands instead.
  if ('error' in r || r.overLimit) {
    const again = build(t);
    return typeof again === 'string' ? refusedFull(t, again, null) : s8Run(t, again, s8);
  }
  return fullOf(t, fd, r.report, r.facesAfter, r.cuts, r.counts, r.arrivals);
}

/**
 * Runs one task. A throw from S8 or the kernel on a generated face is recorded on that face — `refused` "threw: …", a
 * failure of the bar it runs for — and never stops the run (fail-safe: every other face is still measured).
 */
export function runTask(t: Task): FaceRecord {
  try {
    return t.phase === 'fcut' ? runFcut(t) : runFull(t);
  } catch (e) {
    const why = `threw: ${e instanceof Error ? e.message : String(e)}`;
    if (t.phase === 'fcut') return { phase: 'fcut', kind: t.kind, i: t.i, setup: null, refused: why, kernelCalls: 0, outcome: 'threw', facesAfterLadder: 0, facesBefore: 0, facesAfter: 0 };
    return refusedFull(t, null, why);
  }
}
