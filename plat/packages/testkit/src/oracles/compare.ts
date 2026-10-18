// The split comparison (M0-k-03; §3.7 "compared where the comparison means something", §13.1): our engine attracts
// features closer than `attractCm` and the oracles do not, so each case is judged by what our engine REPORTED — its
// warning list alone decides the split:
// * unattracted (no W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED or W_PLACED): equal face counts after both are
//   snapped, zero-area faces dropped, and |ours Δ oracle| ≤ perimeter × 1 cm;
// * attracted: ours valid and |ours Δ oracle| ≤ perimeter × √2 · attractCm (≈ 36.8 cm); face counts not compared.
// The area is taken through the oracle's own boolean and cross-checked through the other oracle's (C-0144 (6)): the
// two must agree within perimeter × 1 cm, or be measurable at all, or the case fails `cross-check`. §3.7 compares ours
// with EACH oracle: a harness calls `compareSplit` once per oracle and records the case's verdicts together, one call
// of `OracleReport.record` per case (C-0148). A library's refusal (an `OracleRefusal`, C-0150) — of the oracle's
// result, of the verdict's area or of its cross-check's — makes the verdict refused: it judges nothing, and the report
// counts it apart, so an oracle that cannot answer neither fails our engine nor hides the case.
import { LATTICE, type KernelResult, type Warning, type WarningCode } from '@plat/kernel';
import { dedupe, isLatticeRing, ringProblems } from './rings.js';
import { faceCount } from './faces.js';
import { symDiffArea } from './oracles.js';
import { isOracleRefusal } from './refusal.js';
import type { OracleEngine, OracleResult, Ring, SplitClass, Verdict } from './types.js';

/** §3.7's four warnings that mark a case attracted (§3.1: B-FUZZ splits its cases by them). */
export const ATTRACTION_WARNINGS: readonly WarningCode[] = Object.freeze([
  'W_ATTRACTED',
  'W_STRETCH_SHARED',
  'W_WEDGE_ROUTED',
  'W_PLACED',
]);

/** The unattracted tolerance per cm of perimeter: 1 cm (§3.7). */
export const UNATTRACTED_CM = 1;

/** The attracted tolerance per cm of perimeter: √2 · attractCm (§3.7: ≈ 36.8 cm at attractCm 26). */
export const ATTRACTED_CM = Math.SQRT2 * LATTICE.attractCm;

/**
 * The split, from the warning list only (C-0144 (6)): attracted when an entry of one of the four codes carries a
 * count above zero, unattracted otherwise. No geometry is read.
 */
export function splitOf(warnings: readonly Warning[]): SplitClass {
  for (const w of warnings) {
    if (ATTRACTION_WARNINGS.includes(w.code) && w.count > 0) return 'attracted';
  }
  return 'unattracted';
}

/** The other oracle (the cross-check's engine). */
export function otherEngine(engine: OracleEngine): OracleEngine {
  return engine === 'clipper2' ? 'polygon-clipping' : 'clipper2';
}

/** |x Δ y| in cm² through the named engine's boolean (`symDiffArea`'s signature). */
export type AreaMeasurer = (x: readonly Ring[], y: readonly Ring[], engine: OracleEngine) => number;

/** Options of `compareSplit`. */
export interface CompareOptions {
  /** §3.10's arena-level hard invariants, applied to an attracted case by the caller's suite (C-0144 (6)). */
  invariants?: (rings: readonly Ring[]) => readonly string[];
  /**
   * The area measurer — `symDiffArea` unless a test plants one (C-0148 (2)): called once with the oracle's engine (the
   * verdict's `symDiffCm2`) and once with the other engine (its `crossCheckCm2`), so a test can plant a disagreement
   * or a refusal the two libraries never give on their own. A harness judging our engine never passes it.
   */
  measure?: AreaMeasurer;
}

/**
 * The verdict for one case: our result (the rings, or the kernel's typed result — `E_DEGENERATE` `empty` reads as no
 * rings), the oracle's result and the warnings our operation reported. Never throws for an oracle's failure: a failed
 * oracle, a failed ours or an area neither oracle could measure is a failing verdict naming why. A library's refusal
 * (C-0150) makes the verdict refused — unless ours shows a fault no oracle is needed to see (a typed failure of ours; a
 * point off the lattice; an attracted result that is not valid), which fails the verdict with the refusal named after
 * it, so a refusal never hides such a fault.
 */
export function compareSplit(
  ours: readonly Ring[] | KernelResult<Ring[]>,
  oracle: OracleResult,
  warnings: readonly Warning[],
  opts: CompareOptions = {},
): Verdict {
  const split = splitOf(warnings);
  const engine = oracle.engine;
  /** Faults of ours that need no oracle: a typed failure, a point off the lattice, and attracted, an invalid result. */
  const own: string[] = [];
  let mine: Ring[];
  if (Array.isArray(ours)) mine = (ours as readonly Ring[]).map(dedupe);
  else {
    const r = ours as KernelResult<Ring[]>;
    if (r.ok) mine = r.value.map(dedupe);
    else if (r.code === 'E_DEGENERATE' && r.detail === 'empty') mine = [];
    else {
      mine = [];
      own.push(`ours: ${r.code} ${r.detail}`);
    }
  }
  // our engine's rings are lattice rings by construction (§3.2 (1)); any other point is a fault of ours
  if (!mine.every(isLatticeRing)) own.push('ours: not lattice rings');
  const invalid = (): string[] =>
    split === 'attracted' ? [...ringProblems(mine), ...(opts.invariants?.(mine) ?? [])].map((p) => `invalid: ${p}`) : [];
  const refusedVerdict = (
    reason: string,
    rest: Pick<Verdict, 'faces' | 'symDiffCm2' | 'crossCheckCm2' | 'perimeterCm' | 'boundCm2'>,
  ): Verdict => {
    const faults = [...own, ...invalid()];
    return {
      split,
      pass: false,
      refused: faults.length === 0,
      engine,
      ...rest,
      crossChecked: false,
      failures: [...faults, `refused: ${reason}`],
    };
  };
  if (!oracle.ok) {
    const rest = {
      faces: { ours: faceCount(mine), oracle: 0 },
      symDiffCm2: Number.NaN,
      crossCheckCm2: Number.NaN,
      perimeterCm: Number.NaN,
      boundCm2: Number.NaN,
    };
    if (oracle.refused === true) return refusedVerdict(oracle.error, rest);
    return { split, pass: false, refused: false, engine, ...rest, crossChecked: false, failures: [...own, `oracle: ${oracle.error}`] };
  }
  const perimeterCm = oracle.perimeterCm;
  const boundCm2 = perimeterCm * (split === 'unattracted' ? UNATTRACTED_CM : ATTRACTED_CM);
  const faces = { ours: faceCount(mine), oracle: faceCount(oracle.rings) };
  const measure = opts.measure ?? symDiffArea;
  const failures: string[] = [...own];
  let symDiffCm2 = Number.NaN;
  let crossCheckCm2 = Number.NaN;
  let refusal: string | null = null;
  try {
    symDiffCm2 = measure(mine, oracle.rings, engine);
  } catch (e) {
    if (isOracleRefusal(e)) refusal = e.message;
    else failures.push(`area: ${engine} could not measure it (${e instanceof Error ? e.message : String(e)})`);
  }
  try {
    crossCheckCm2 = measure(mine, oracle.rings, otherEngine(engine));
  } catch (e) {
    // a refusal makes the verdict refused; any other throw is reported below as an unconfirmed area
    if (isOracleRefusal(e) && refusal === null) refusal = e.message;
  }
  if (refusal !== null) return refusedVerdict(refusal, { faces, symDiffCm2, crossCheckCm2, perimeterCm, boundCm2 });
  const crossChecked =
    Number.isFinite(symDiffCm2) &&
    Number.isFinite(crossCheckCm2) &&
    Math.abs(symDiffCm2 - crossCheckCm2) <= perimeterCm * UNATTRACTED_CM;
  if (!crossChecked) failures.push('cross-check');
  if (split === 'unattracted' && faces.ours !== faces.oracle) failures.push('faces');
  if (!(symDiffCm2 <= boundCm2)) failures.push('area');
  failures.push(...invalid());
  return {
    split,
    pass: failures.length === 0,
    refused: false,
    engine,
    faces,
    symDiffCm2,
    crossCheckCm2,
    crossChecked,
    perimeterCm,
    boundCm2,
    failures,
  };
}
