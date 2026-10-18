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
// The table (per property per seed, 10⁴ cases each; 'a+b' = a E_INVARIANT + b optional E_BELOW_MIN_EDGE 'N-43'):
//
//   seeds         5101 −5203 5309 −5407 5501 −5623 5701 −5801 5903 −6007 6101 −6203 6301 −6421 6521 −6607 6703 −6803
//                 6907 −7001 7103 −7207 7307 −7411 7507 −7603 7703 −7817 7901 −8009 8101
//   random        2+4 2+1 5+3 3+1 2+1 3 0 1+1 1+1 2+2 2+1 2+3 1+2 1 1 2+2 3+1 4+1 2+4 2+3 3+1 1+1 1+1 4+1 0+3 2 0+1 1
//                 0+2 0+4 5+4                                                     → 58 + 49 = 107 in 31 seeds, max 9
//   constructive  3 2+1 3 1 1+1 0 1+1 2 1+1 1 0 3 2+1 0+1 1 1 2 0+1 0+3 1 0 1+1 0 0+1 2 0+1 0+1 2 0 1+1 0
//                                                                                 → 31 + 15 = 46, max 3
//   mandatory     3 1 2 1 2 2 1+1 0 2 1 4 2 2+1 3 1 1 0 0 1 2 1 4 1 2 0 0 1 2 0 3 2  → 47 + 2 = 49, max 4
//   fidelity      0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0    → 3, max 2
//
// (The same seeds on S5's code, the S5 closing check's measure: random 58 + 96, constructive 31 + 51, mandatory-only
// 47 + 6, fidelity 3 — every E_INVARIANT count equal seed by seed.) Rate / cap per 10⁴: random 3.45 / 4.45, constructive
// 1.48 / 2.14, mandatory-only 1.58 / 2.26, fidelity 0.10 / 0.26. At the PR size the caps are 12, 8, 8 and 3; at 10³ 4, 3,
// 3 and 1; at the nightly 10⁶ 512, 261, 274 and 44.

import { appendFileSync } from 'node:fs';

/**
 * The counts a run of a capped property gives (the spec note N-15: a passing run prints nothing): when PLAT_FUZZ_COUNTS
 * names a file, one JSON line per property — its name, the seed (PLAT_FUZZ_SEED), the run size, the E_INVARIANT and the
 * optional N-43 refusals, their sum and the cap — so a re-measure reads real counts. Nothing written otherwise.
 */
export function recordCounts(property: string, runs: number, invariant: number, optional: number, cap: number): void {
  const file = process.env.PLAT_FUZZ_COUNTS;
  if (file === undefined || file === '') return;
  appendFileSync(file, `${JSON.stringify({ property, seed: process.env.PLAT_FUZZ_SEED ?? null, runs, invariant, optional, counted: invariant + optional, cap })}\n`);
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

/** The refusals N-43 B's bound caused (N-46 (3)) per 10⁴ cases, per property: the table's sums over its 31 seeds (S6, C-0221). */
export const MEASURED_PER_1E4 = {
  random: 107 / 31,
  constructive: 46 / 31,
  mandatory: 49 / 31,
  fidelity: 3 / 31,
} as const;

/** The 31-seed counts behind MEASURED_PER_1E4 (N-46 (4)'s 3 · √count reads them). */
export const MEASURED_COUNT = { random: 107, constructive: 46, mandatory: 49, fidelity: 3 } as const;

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
