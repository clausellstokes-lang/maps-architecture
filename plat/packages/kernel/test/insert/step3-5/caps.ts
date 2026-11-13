// N-44 (3) as the session applied it to insertChain (J204, J207, J208; N-46 (3), (4); C-0217, C-0221): the refusals
// N-43 B's bound causes — E_INVARIANT, and an optional chain's E_BELOW_MIN_EDGE naming N-43 (N-46 (3): counted whatever
// their code, `countedRefusal`) — are capped per B-FUZZ property and for the fidelity bound's own property at the
// residual round S6 measured, after the systematic causes were fixed (S5's third pass: the endpoint fallback in a thin
// strip or sliver, the far wedge corner, near-parallel drift; S6: the same readings for the optional class). 1 per 10⁴
// stays the target: KI-1 carries the remainder to the hardening pass, and a refusal is never hidden — every one is
// counted, and each new cause found is a register case.
//
// The measure (C-0221's table): S6's code on 31 seeds at the PR size — the S5 closing check's own fresh seeds, so S5
// and S6 compare seed by seed — 10⁴ cases per property per seed, counted as N-46 (3) says (B-FUZZ's tally; a run writes
// its counts to PLAT_FUZZ_COUNTS). N-46 (4)'s cap per family is the measured rate plus 3 · √count on the 31-seed total;
// the cap of one run is the 99.9 % point of a Poisson count whose mean is that cap scaled to the run size (one seed's
// noise about it), and at least 1. A cap only falls (J207's ratchet): a later round that measures less lowers it;
// raising one is the session's call, never a seat's.
//
// The table (per property per seed, 10⁴ cases each; 'a+b' = a E_INVARIANT + b optional E_BELOW_MIN_EDGE 'N-43'),
// lowered by the hardening round S9 (C-0423; J207's ratchet) to its own measure — the same 31 seeds at the PR size on
// the round's final sources (the retrace cut, the own-run landing, the strict route's second reading); no count rose,
// seed by seed and property by property — and its constructive row by round S12 (C-0456; the ratchet again: 6907
// 0+2 → 0+1, 7507 2 → 1 on the round's final sources, every other cell of the four rows equal):
//
//   seeds         5101 −5203 5309 −5407 5501 −5623 5701 −5801 5903 −6007 6101 −6203 6301 −6421 6521 −6607 6703 −6803
//                 6907 −7001 7103 −7207 7307 −7411 7507 −7603 7703 −7817 7901 −8009 8101
//   random        2+4 2+1 4+3 3+1 2+1 3 0 1+1 1+1 2+2 2+1 2+3 1+2 1 1 2+2 3+1 4 1+4 2+3 3+1 1+1 1+1 4+1 0+3 1 0+1 1
//                 0+2 0+4 4+4                                                     → 54 + 48 = 102 in 31 seeds, max 8
//   constructive  3 2+1 2 1 1+1 0 1+1 2 1+1 1 0 2 2+1 0+1 1 1 2 0+1 0+1 1 0 1+1 0 0+1 1 0+1 0+1 2 0 0+1 0
//                                                                                 → 27 + 13 = 40, max 3
//   mandatory     3 0 2 1 2 2 1+1 0 2 1 4 2 2+1 3 1 1 0 0 1 2 1 4 1 2 0 0 1 2 0 3 2  → 46 + 2 = 48, max 4
//   fidelity      0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0    → 1, max 1
//
// Lowered by the hardening round S14 (C-0489; J207's ratchet) to its own measure — the same 31 seeds (and 20261013,
// equal: 0+2 / 0+1 / 2 / 0) at the PR size on the round's final sources (the fifth pass: notBuilt #2's classes E, S, D, W,
// P, V read in an in-bound pass after the watch / back / null sequence): seven cells fell, none rose — random 6907 2+4 →
// 1+4 (class S); constructive 5309 3 → 2 (E), −6203 3 → 2 (D), −8009 1+1 → 0+1 (D); mandatory −5203 1 → 0 (D);
// fidelity 5903 2 → 0 (V, D). S12's table, before it: random 55 + 48 = 103, constructive 30 + 13 = 43, mandatory
// 47 + 2 = 49, fidelity 3 (max 8, 3, 4, 2).
//
// (S6's measure on the same seeds, C-0221, before this round: random 58 + 49 = 107, max 9 — 5309 5+3, −6803 4+1, −7603
// 2, 8101 5+4 —; constructive 31 + 15 = 46 — 6907 0+3 —; mandatory 47 + 2 = 49; fidelity 3. The S5 closing check's
// measure: random 58 + 96, constructive 31 + 51, mandatory-only 47 + 6, fidelity 3.) Rate / cap per 10⁴ (S14's
// measure): random 3.29 / 4.27, constructive 1.29 / 1.90, mandatory-only 1.55 / 2.22, fidelity 0.03 / 0.13. At the PR
// size the caps are 12, 7, 8 and 2; at 10³ 3, 2, 3 and 1; at the nightly 10⁶ 492, 234, 269 and 25 (S12's: 12, 8, 8, 3;
// 4, 3, 3, 1; 496, 247, 274, 44). Every refusal these count names its
// class in its detail ('class S' … 'class C', each '(notBuilt #2, M4)': KI-1's residual, C-0423).

import { createHash } from 'node:crypto';
import { appendFileSync } from 'node:fs';

/**
 * The class a counted refusal's detail names (insertChain's `refusalClass`: '… class S (notBuilt #2, M4): …'), or
 * 'unclassed' — a refusal for the bound whose detail names no class (an invariant check's throw turned into E_INVARIANT,
 * a retrace's refusal). Read from the detail text, never from the code under test (round S14, LINE 5 (i)).
 */
export function refusalClassOf(detail: string): string {
  const m = /class ([A-Z]) \(notBuilt #2/.exec(detail);
  return m === null ? 'unclassed' : m[1];
}

/** A family's counted refusals by class (round S14, LINE 5 (i)): the tally per class letter and every unclassed detail. */
export class ClassTally {
  readonly byClass = new Map<string, number>();
  readonly unclassed: string[] = [];
  add(detail: string): void {
    const k = refusalClassOf(detail);
    this.byClass.set(k, (this.byClass.get(k) ?? 0) + 1);
    if (k === 'unclassed') this.unclassed.push(detail);
  }
  /** The tally as a plain object, its keys sorted. */
  toJSON(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const k of [...this.byClass.keys()].sort()) out[k] = this.byClass.get(k) as number;
    return out;
  }
}

/**
 * The counts a run of a capped property gives (the spec note N-15: a passing run prints nothing): when PLAT_FUZZ_COUNTS
 * names a file, one JSON line per property — its name, the seed (PLAT_FUZZ_SEED), the run size, the E_INVARIANT and the
 * optional N-43 refusals, their sum and the cap, and (round S14, LINE 5 (i)) the counted refusals by class with every
 * unclassed one's detail listed — so a re-measure reads real counts. Nothing written otherwise.
 */
export function recordCounts(property: string, runs: number, invariant: number, optional: number, cap: number, classes?: ClassTally): void {
  const file = process.env.PLAT_FUZZ_COUNTS;
  if (file === undefined || file === '') return;
  const byClass = classes === undefined ? {} : { classes: classes.toJSON(), unclassed: classes.unclassed };
  appendFileSync(file, `${JSON.stringify({ property, seed: process.env.PLAT_FUZZ_SEED ?? null, runs, invariant, optional, counted: invariant + optional, cap, ...byClass })}\n`);
}

/**
 * The census's per-case log (round S14, THE BURDEN; LINE 12 (a)): when PLAT_FUZZ_CASELOG names a file, one line per
 * insertion of a census property — seed, property, case (the property's run index), chain (its index in the case),
 * the outcome's code ('ok' or the refusal code), the counted refusal's class ('-' otherwise), the SHA-256 (16 hex) of
 * the outcome (a commit's warnings and placed points, a refusal's code and full detail) and the arena's content print
 * after it with its lines SORTED (so a slot reused in another order reads the same arena), and a refusal's detail —
 * so two runs diff case by case. Lines are kept in memory and appended when the property ends (`end`, in a `finally`).
 * Nothing written, and nothing computed, otherwise.
 */
export class CaseLog {
  private readonly file = process.env.PLAT_FUZZ_CASELOG ?? '';
  private property: string | null = null;
  private caseNo = -1;
  private chain = 0;
  private readonly lines: string[] = [];
  /** Is the log on (PLAT_FUZZ_CASELOG set)? */
  get on(): boolean {
    return this.file !== '';
  }
  /** Is a census property being logged now? */
  get logging(): boolean {
    return this.on && this.property !== null;
  }
  begin(property: string): void {
    this.property = property;
    this.caseNo = -1;
  }
  /** The next case of the property (each call of its predicate). */
  nextCase(): void {
    this.caseNo += 1;
    this.chain = 0;
  }
  /** One insertion: its outcome text (code and detail, or warnings and placed points) and the arena's print after it. */
  add(code: string, cls: string, outcome: string, print: string, detail = ''): void {
    if (!this.logging) return;
    const sorted = print.split('\n').sort().join('\n');
    const h = createHash('sha256').update(outcome).update('\n').update(sorted).digest('hex').slice(0, 16);
    this.lines.push([process.env.PLAT_FUZZ_SEED ?? '-', this.property, this.caseNo, this.chain, code, cls, h, detail.replace(/[\t\n]/g, ' ')].join('\t'));
    this.chain += 1;
  }
  /** Appends the property's lines (called in a `finally`, so a failing property's lines are kept too). */
  end(): void {
    if (this.on && this.lines.length > 0) appendFileSync(this.file, `${this.lines.join('\n')}\n`);
    this.lines.length = 0;
    this.property = null;
  }
}

/**
 * N-46 (3): is the refusal one N-43 B's bound caused, whatever its code? E_INVARIANT — no route keeps §3.10 within the
 * bound, or an invariant check's throw turned into a refusal — or an optional chain's E_BELOW_MIN_EDGE whose detail
 * names N-43 (every route keeping clearance leaves the bound). Each is counted against its family's cap; a precision
 * refusal of any other cause (step 1's collapse, a wedge beyond attractCm) is not. Written from the ruling, not read
 * from the code under test.
 */
export function countedRefusal(code: string, detail: string): boolean {
  return code === 'E_INVARIANT' || (code === 'E_BELOW_MIN_EDGE' && detail.includes('(N-43)'));
}

/** The refusals N-43 B's bound caused (N-46 (3)) per 10⁴ cases, per property: the table's sums over its 31 seeds (S9, C-0423; constructive S12, C-0456; all four S14, C-0489). */
export const MEASURED_PER_1E4 = {
  random: 102 / 31,
  constructive: 40 / 31,
  mandatory: 48 / 31,
  fidelity: 1 / 31,
} as const;

/** The 31-seed counts behind MEASURED_PER_1E4 (N-46 (4)'s 3 · √count reads them). */
export const MEASURED_COUNT = { random: 102, constructive: 40, mandatory: 48, fidelity: 1 } as const;

/** N-46 (4)'s cap per family, per 10⁴ cases: the measured rate plus 3 · √count on the 31-seed total — the ratchet's baseline. */
export function capPer1e4(family: keyof typeof MEASURED_COUNT): number {
  const c = MEASURED_COUNT[family];
  return (c + 3 * Math.sqrt(c)) / 31;
}

/**
 * The smallest count c with P(X ≤ c) ≥ 0.999 for X Poisson with mean `mean` (at least 1): the cap a property of that
 * mean refusal count takes. The terms are summed in order (exp(−mean) stays a normal double for every mean ≤ 700).
 */
export function poissonCap(mean: number): number {
  if (mean <= 0) return 1;
  let term = Math.exp(-mean);
  let sum = term;
  let c = 0;
  while (sum < 0.999) {
    c += 1;
    term *= mean / c;
    sum += term;
  }
  return Math.max(1, c);
}

/** The cap on the bound-caused refusals of one run of the family's property over `runs` cases (N-44 (3), N-46 (4), C-0221). */
export function refusalCap(family: keyof typeof MEASURED_COUNT, runs: number): number {
  return poissonCap((capPer1e4(family) * runs) / 10_000);
}

/**
 * B-FUZZ's run parameters beside the global configuration (the spec note N-12, round S9): a property stops at its first
 * failing case and reports it — its seed, path and counterexample — without shrinking. Shrinking a case of 300-point
 * walks ran 45 minutes and more at seed 31337 with no end in sight (synchronous, so the test's hard timeout cannot cut
 * it), so a red seed looked like a hang; the case replays by its seed and path.
 */
export const FUZZ_PARAMS = { endOnFailure: true } as const;
