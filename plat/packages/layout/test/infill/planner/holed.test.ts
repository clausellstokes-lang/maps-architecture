// The holed position law (§4.6 step 2; NG 1.2.2's hole-aware law, P2): on a holed or annular face f = m + (1 − 2m) · b
// over the outer ring's length along the working axis, m = min(0.45, e_lo ÷ that length), with no centroid term — so
// f keeps at least m from either end; the corner's offset halves (o = e_lo / 2, step 4); a cut that meets a hole ends
// on it, joined by connectHole (step 7, *Holes*).
import { describe, expect, it } from 'vitest';
import { planCut } from '../../../src/infill/planner.js';
import { asCut, CTX, FACES, ring, streamsFor } from './support.js';

const SEEDS = 200;

describe('the holed position law (§4.6 step 2)', () => {
  it('f = m + (1 − 2m) · b with m = e_lo / L, keeping f at least m from either end', () => {
    let lo = 1;
    let hi = 0;
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const p = asCut(planCut(FACES.holed, CTX, streamsFor(seed)));
      const b = p.draws[1].value;
      const m = 2400 / p.frame.lengthCm;
      expect(p.frame.lengthCm).toBe(14000);
      expect(p.start.m).toBe(m);
      expect(p.start.c).toBeNull();
      expect(p.start.f).toBe(m + (1 - 2 * m) * b);
      expect(p.start.f).toBeGreaterThanOrEqual(m);
      expect(p.start.f).toBeLessThanOrEqual(1 - m);
      lo = Math.min(lo, p.start.f);
      hi = Math.max(hi, p.start.f);
    }
    // The draws spread f over the allowed band (no centroid pull toward the middle).
    expect(lo).toBeLessThan(0.35);
    expect(hi).toBeGreaterThan(0.65);
  });

  it('caps m at 0.45 on a short holed face', () => {
    // Outer 5 000 × 4 100: e_lo / L = 0.48 → m = 0.45, f ∈ [0.45, 0.55].
    const face = { rings: [ring([[0, 0], [5000, 0], [5000, 4100], [0, 4100]]), ring([[2000, 1700], [2000, 2400], [3000, 2400], [3000, 1700]])] };
    for (let seed = 1; seed <= 60; seed += 1) {
      const r = planCut(face, CTX, streamsFor(seed));
      expect(r.ok).toBe(true);
      if (!r.ok || r.value.kind === 'block') continue;
      if (r.value.kind !== 'cut') continue;
      expect(r.value.start.m).toBe(0.45);
      expect(r.value.start.f).toBeGreaterThanOrEqual(0.45);
      expect(r.value.start.f).toBeLessThanOrEqual(0.55);
    }
  });

  it('halves the corner offset: o = e_lo / 2', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const p = asCut(planCut(FACES.holed, CTX, streamsFor(seed)));
      expect(p.corner.oCm).toBe(1200);
    }
    expect(asCut(planCut(FACES.rectangle, CTX, streamsFor(1))).corner.oCm).toBe(2400);
  });

  it('a cut that meets the hole ends on it: a hole end (connectHole), its ring named', () => {
    let holeEnds = 0;
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const p = asCut(planCut(FACES.holed, CTX, streamsFor(seed)));
      for (const e of p.cut.ends) {
        if (e.kind !== 'hole') continue;
        holeEnds += 1;
        expect(e.index).toBe(1);
        expect(e.point).toEqual(e.kerbPoint);
        // The point lies on the hole's boundary (x in [5 000, 9 000], y in [3 500, 6 500], on an edge).
        const onX = e.point.x === 5000 || e.point.x === 9000;
        const onY = Math.abs(e.point.y - 3500) < 1e-6 || Math.abs(e.point.y - 6500) < 1e-6;
        expect(onX || onY).toBe(true);
      }
    }
    expect(holeEnds).toBeGreaterThan(SEEDS / 2);
  });

  it('an annulus — a ring face round a central hole — is cut from its outer ring to its hole', () => {
    const outer = ring([[0, 0], [16000, 0], [16000, 16000], [0, 16000]]);
    const hole = ring([[5000, 5000], [5000, 11000], [11000, 11000], [11000, 5000]]);
    let through = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const p = asCut(planCut({ rings: [outer, hole] }, CTX, streamsFor(seed)));
      expect(p.start.m).toBe(2400 / 16000);
      // A start line through the hole's span ends the cut on the hole; one beside it crosses the whole face.
      const x = p.start.A.x;
      const kinds = p.cut.ends.map((e) => e.kind);
      if (x > 5000 && x < 11000) {
        through += 1;
        expect(kinds).toContain('hole');
      } else expect(kinds).not.toContain('hole');
    }
    expect(through).toBeGreaterThan(10);
  });
});
