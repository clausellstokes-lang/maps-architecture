// T37-1 and T38-1's shape clauses on the M0 (b) synthetic face set (§16 M0 (b); §13.2): over many seeds per face —
// curved, round-joined, triangular, C-shaped, holed, Chaikin-smoothed, rectangles and trapezoids — every plan is a
// block, a cut, or a typed refusal; every cut keeps K at least o from both ends of its first leg (or at λ / 2), meets
// its far run square within the lattice tolerance, keeps no flatten triangle below max(cut.flattenM, 0.02 × |A–foot|),
// bends at most once, and every fillet is tangent to both legs, spans the shorter leg and holds chords ≥ w_min.
import { describe, expect, it } from 'vitest';
import { planCut } from '../../../src/infill/planner.js';
import { checkGeometry, CTX, FACE_NAMES, FACES, ringOf, streamsFor } from './support.js';

const SEEDS = 200;

describe('the M0 (b) face set (T37-1, T38-1 shape clauses)', () => {
  for (const name of FACE_NAMES) {
    it(`${name}: every plan over ${String(SEEDS)} seeds holds the shape clauses`, () => {
      const face = FACES[name];
      let cuts = 0;
      let bent = 0;
      let filleted = 0;
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(face, CTX, streamsFor(seed));
        if (!r.ok) {
          expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
          continue;
        }
        const plan = r.value;
        if (plan.kind !== 'cut') {
          expect(['block', 'nextRung']).toContain(plan.kind);
          continue;
        }
        cuts += 1;
        checkGeometry(plan, plan.cut, CTX);
        if (plan.cut.bent) bent += 1;
        if (plan.cut.fillet?.filleted === true) filleted += 1;
        // The cut's kerb points lie on the face's boundary; its ends on the start's and the far run's rings.
        const [A] = plan.cut.legs;
        const last = plan.cut.legs[plan.cut.legs.length - 1];
        expect(ringOf(plan.sides, A)).toBe(plan.start.ring);
        expect(ringOf(plan.sides, last)).toBeGreaterThanOrEqual(0);
      }
      // Every face of the set is cut on most seeds (its minor extent ≥ e_lo), not refused.
      expect(cuts).toBeGreaterThan(SEEDS / 2);
      if (name === 'trapezoid' || name === 'triangle' || name === 'curved' || name === 'chaikin') expect(bent).toBeGreaterThan(0);
      if (bent > 20) expect(filleted).toBeGreaterThan(0);
    });
  }
});
