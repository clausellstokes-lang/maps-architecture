// N-44 (3) as the session applied it to insertChain (J204, J207, J208; C-0217): the E_INVARIANT refusals each B-FUZZ
// property and the fidelity bound's own property count are capped at the residual round S5 measured plus seed noise, per
// family, after the systematic causes were fixed (the endpoint fallback in a thin strip or sliver, the far wedge corner,
// near-parallel drift — insertChain's third pass). 1 per 10⁴ stays the target: KI-1 carries the remainder to the
// hardening pass, and a refusal is never hidden — every one is counted, and each new cause found is a register case.
//
// The measure (C-0217's table): S5's code on 31 seeds at the PR size (S4's 21 and 10 fresh), 10⁴ cases per property per
// seed. The mean below is that measure per 10⁴ cases; the cap at a run size is the 99.9 % point of a Poisson count with
// that mean scaled to the size — the noise between seeds — and at least 1. A mean only falls (J207's ratchet): a later
// round that measures less lowers it; raising one is the session's call, never a seat's.
//
// The table (C-0217; E_INVARIANT per property per seed, 10⁴ cases each; '≤ 1' a property that passed S4's cap of 1 and
// printed no count, summed as 1):
//
//   S4's seeds   9001 −9002 31415 27182 −16180 14142 17320 −22360 26457 30000 −33166 36055 38729 −41231 43588 45825
//                −48989 51961 54772 57445 −60000;  fresh  60061 −70001 80021 90031 −100003 110017 120011 −130021 140009
//                150001
//   random        3 ≤1 2 ≤1 3 3 2 0 4 1 2 3 0 0 1 1 1 6 0 2 3;  2 2 1 2 3 1 3 2 0 2      → 57 in 31 seeds, max 6
//   constructive  ≤1 ≤1 ≤1 ≤1 ≤1 ≤1 ≤1 1 0 1 0 2 0 1 0 0 0 2 0 1 0;  1 0 0 0 0 0 1 0 0 2 → 19, max 2
//   mandatory     4 ≤1 2 ≤1 4 2 ≤1 4 1 3 4 1 0 1 4 2 3 2 1 2 2;  2 0 6 1 1 3 2 3 2 1      → 66, max 6
//   fidelity      ≤1 ≤1 ≤1 ≤1 ≤1 ≤1 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0;  1 0 1 1 0 0 0 2 1 0   → 14, max 2
//
// (S4 on its 21 seeds: random 230, constructive 93, mandatory-only 166.) At the PR size the caps are 7, 4, 8 and 4; at
// the nightly 10⁶, 227, 87, 259 and 67.

/** The measured E_INVARIANT refusals per 10⁴ cases, per property: the table's sums over its 31 seeds (S5, C-0217). */
export const MEASURED_PER_1E4 = {
  random: 57 / 31,
  constructive: 19 / 31,
  mandatory: 66 / 31,
  fidelity: 14 / 31,
} as const;

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

/** The cap on E_INVARIANT refusals of a property of the family over `runs` cases (N-44 (3), C-0217). */
export function refusalCap(family: keyof typeof MEASURED_PER_1E4, runs: number): number {
  return poissonCap((MEASURED_PER_1E4[family] * runs) / 10_000);
}
