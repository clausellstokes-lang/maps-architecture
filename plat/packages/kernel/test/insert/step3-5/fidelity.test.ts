// N-43 B's fidelity bound, "asserted on every mandatory commit in B-FUZZ and in a property of its own" (the session's
// ruling J199; N-44 (2) – (3); C-0215). B-FUZZ (bfuzz.test.ts) judges every commit of its three families by fidelity.ts;
// this property is the bound's own: overlay-like inputs — the two-point mandatory chains M0-a-08's overlays insert, one
// after another into one arena, crossing and grazing each other at every angle in a small square, then a mandatory
// polyline across them — each commit judged by fidelity.ts's two halves (every route vertex within 2 · √2 · attractCm of
// a segment the op routed; every routed segment within it of the chain's edges), the arena valid after each, a refusal
// E_INVARIANT writing nothing and counted (`countedRefusal`, N-46 (3): its chains are mandatory, so E_INVARIANT is the
// only bound-caused code here), within the property's cap — N-46 (4)'s cap from S6's measured residual plus one run's
// noise (caps.ts; N-44 (3) as J207 / J208 apply it, C-0217, C-0221).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { Level } from '../../../src/types/index.js';
import { countedRefusal, FUZZ_PARAMS, recordCounts, refusalCap } from './caps.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, framed, generator, ins, intIn, TIMEOUT, tx } from './support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** N-44 (3): the property's cap (caps.ts, C-0217). */
const CAP = refusalCap('fidelity', RUNS);

describe('N-43 B: the fidelity bound on overlay-like mandatory chains (a property of its own)', () => {
  it('two-point mandatory chains crossing in a 1 200 cm square, then a mandatory polyline across them: every commit within 2 · √2 · attractCm of its input, the arena valid, E_INVARIANT refusals writing nothing and capped', () => {
    let commits = 0;
    let invariant = 0;
    const other = new Map<string, number>();
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 0x7fffffff }), (seed) => {
        const rnd = generator(seed);
        const p = framed(4000);
        const level = intIn(rnd, 0, 2) as Level;
        const at = (): [number, number] => [intIn(rnd, 1400, 2600), intIn(rnd, 1400, 2600)];
        const chains: [number, number][][] = [];
        const k = intIn(rnd, 2, 8);
        for (let i = 0; i < k; i++) chains.push([at(), at()]);
        const poly: [number, number][] = [at()];
        for (let i = intIn(rnd, 1, 4); i > 0; i--) poly.push(at());
        chains.push(poly);
        chains.forEach((c, i) => {
          const entity = `arr:s${i}`;
          const t = tx(p, level);
          const before = contentPrint(p);
          const r = ins(t, c, [{ role: 'invisible', entity }]);
          if (r.ok) {
            commits += 1;
            expect(fidelityProblems(p, level, 'mandatory', c, {}, r.value.placed, entity)).toEqual([]);
          } else {
            if (countedRefusal(r.code, r.detail)) invariant += 1;
            else other.set(r.code, (other.get(r.code) ?? 0) + 1);
            expect(['E_INVARIANT', 'E_DEGENERATE', 'E_KEPT']).toContain(r.code);
            expect(contentPrint(p)).toBe(before);
            expect(t.warnings).toEqual([]);
          }
        });
        expect(allProblems(p)).toEqual([]);
      }),
      FUZZ_PARAMS,
    );
    console.log(`fidelity property: ${commits} committed; E_INVARIANT ${invariant} (cap ${CAP}); ${[...other].map(([c, n]) => `${c} ${n}`).join(', ')}`);
    recordCounts('fidelity', RUNS, invariant, 0, CAP);
    expect(commits).toBeGreaterThan(0);
    expect(invariant, 'chains refused E_INVARIANT (N-44 (3): the property\'s cap, caps.ts)').toBeLessThanOrEqual(CAP);
  }, Math.max(TIMEOUT, RUNS * 40));
});
