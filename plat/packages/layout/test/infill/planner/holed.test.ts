// The holed position law (§4.6 step 2; NG 1.2.2's hole-aware law, P2): on a holed or annular face f = m + (1 − 2m) · b
// over the outer ring's length along the working axis, m = min(0.45, e_lo ÷ that length), with no centroid term — so
// f keeps at least m from either end; the corner's offset halves (o = e_lo / 2, step 4); a cut that meets a hole ends
// on it, joined by connectHole (step 7, *Holes*); a flattened cut A → foot that would cross a hole is refused
// (E_NOT_TWO_CROSSINGS `flatten`, step 5) and never planned, while a cut that keeps K is planned whatever its chord
// A → foot meets (C-0387 (2)).
import { describe, expect, it } from 'vitest';
import { planCut } from '../../../src/infill/planner.js';
import type { XY } from '../../../src/infill/planner.js';
import { asCut, cross, CTX, FACES, ring, SEEDS, streamsFor, sub } from './support.js';

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

describe('flatten on a holed face (§4.6 step 5; §3.6\'s two crossings)', () => {
  /** Does segment p–q properly cross an edge of the ring (the test's own orientation test)? */
  const crosses = (r: readonly XY[], p: XY, q: XY): boolean => {
    const o = (a: XY, b: XY, c: XY) => Math.sign(cross(sub(b, a), sub(c, a)));
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      if (o(p, q, a) * o(p, q, b) < 0 && o(a, b, p) * o(a, b, q) < 0) return true;
    }
    return false;
  };

  it('a flattened cut never crosses a hole: when A → foot would, the plan is E_NOT_TWO_CROSSINGS `flatten`', () => {
    // A block whose north side rises 4 m over 120 m, with a small decoy hole in its south-east corner that no step
    // reads: its plans drop K (a triangle A–K–foot under 0.7 m high) and run A → foot. A hole whose tip pokes into
    // that thin triangle — clear of the first leg A–K and of the second leg K–foot, both checked — crosses A → foot,
    // and the cut would make four crossings (§3.6). The same face planned with the poking hole in the decoy's place
    // reads the same frame, start and corner (the hole lies off the start line and off the first leg) and refuses.
    const outer = ring([[0, 0], [12000, 0], [12000, 7400], [0, 7000]]);
    const decoy = ring([[10500, 500], [10500, 1000], [11000, 1000], [11000, 500]]);
    let refused = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const base = asCut(planCut({ rings: [outer, decoy] }, CTX, streamsFor(seed)));
      if (base.cut.bent || base.far === null) continue;
      const A = base.start.A;
      const K = base.corner.K;
      const F = base.far.foot;
      // The tip: inside the triangle A–K–F, halfway across it at half K's height; the hole runs away from A–K.
      const yt = (K.y - A.y) / 2;
      const xAF = A.x + ((F.x - A.x) * yt) / (F.y - A.y);
      const away = Math.sign(F.x - A.x);
      const tip = { x: Math.round((A.x + xAF) / 2), y: Math.round(yt) };
      if (!(Math.abs(tip.x - A.x) >= 1 && Math.abs(xAF - tip.x) >= 1)) continue;
      const hole = ring([[tip.x, tip.y], [tip.x + away * 2000, tip.y - 300], [tip.x + away * 2000, tip.y + 300]]);
      expect(crosses(hole, A, F)).toBe(true);
      expect(crosses(hole, A, K) || crosses(hole, K, F)).toBe(false);
      const r = planCut({ rings: [outer, hole] }, CTX, streamsFor(seed));
      if (r.ok) {
        // Whatever the plan, no straight cut it keeps crosses a ring.
        expect(r.value.kind).toBe('cut');
        if (r.value.kind === 'cut' && !r.value.cut.bent) expect(crosses(hole, r.value.cut.legs[0], r.value.cut.legs[1])).toBe(false);
        continue;
      }
      expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
      expect(r.detail).toBe('flatten');
      const part = r.partial;
      expect(part?.kind).toBe('failed');
      if (part?.kind !== 'failed') continue;
      expect(part.start?.A).toEqual(A);
      expect(part.corner?.K).toEqual(K);
      expect(part.draws.map((d) => d.step)).toEqual(['stop', 'position', 'corner']);
      refused += 1;
      // Under straightFirst (the MFCG preset) the straight cut stands and the flatten alternate is withheld.
      const mf = asCut(planCut({ rings: [outer, hole] }, { ...CTX, preset: 'MFCG' }, streamsFor(seed)));
      expect(mf.cut.bent).toBe(false);
      expect(mf.cut.legs).toEqual([A, mf.corner.hit]);
      expect(mf.alternate).toBeNull();
    }
    expect(refused).toBeGreaterThan(5);
  });

  it('a kept corner is never refused for its chord: a bent cut whose A → foot crosses a hole is planned (C-0387 (2))', () => {
    // The refusal is for a cut that drops K (flatten) and so runs A → foot; a cut that keeps K runs A–K–foot, two legs
    // each clear by construction, and its chord A → foot is no part of it (B-S1-1). A trapezoid whose north side
    // rises 70 m over 140 m: its far run is slanted, so every plan keeps a tall corner (bent). The same face planned
    // with a small diamond hole across the chord's midpoint — clear of both legs, so the frame, start, corner and
    // far run read the same — still plans that bent cut, never E_NOT_TWO_CROSSINGS `flatten`.
    const outer = ring([[0, 0], [14000, 0], [14000, 12000], [0, 5000]]);
    const decoy = ring([[10500, 500], [10500, 1000], [11000, 1000], [11000, 500]]);
    let pinned = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const base = asCut(planCut({ rings: [outer, decoy] }, CTX, streamsFor(seed)));
      expect(base.cut.bent).toBe(true);
      expect(base.far).not.toBeNull();
      if (base.far === null) continue;
      const A = base.start.A;
      const K = base.corner.K;
      const F = base.far.foot;
      const mid = { x: Math.round((A.x + F.x) / 2), y: Math.round((A.y + F.y) / 2) };
      const hole = ring([[mid.x - 300, mid.y], [mid.x, mid.y + 300], [mid.x + 300, mid.y], [mid.x, mid.y - 300]]);
      expect(crosses(hole, A, F)).toBe(true);
      expect(crosses(hole, A, K) || crosses(hole, K, F)).toBe(false);
      const r = planCut({ rings: [outer, hole] }, CTX, streamsFor(seed));
      expect(r.ok).toBe(true);
      const p = asCut(r);
      expect(p.start.A).toEqual(A);
      expect(p.corner.K).toEqual(K);
      expect(p.far?.foot).toEqual(F);
      expect(p.cut.bent).toBe(true);
      expect(p.cut.legs).toEqual([A, K, F]);
      pinned += 1;
    }
    expect(pinned).toBe(40);
  });

  it('the checker\'s star 55 (B-S1-1): a kept-K bent cut whose chord crosses its hole is a cut, bent', () => {
    // Star 55 of the closing check's probe (mulberry32 seed 20261019, 30 % holed), planned under CTX with
    // streamsFor(56): its chord A → foot passes through the hole, its legs A–K and K–foot do not.
    const outer = ring([[5952, 1214], [2904, 4322], [-2649, 5851], [-4573, 761], [-6954, -1827], [-1931, -6912], [880, -4814], [4953, -2044]]);
    const hole = ring([[-1415, 35], [-1415, 1345], [-106, 1345], [-106, 35]]);
    const r = planCut({ rings: [outer, hole] }, CTX, streamsFor(56));
    expect(r.ok).toBe(true);
    const p = asCut(r);
    expect(p.cut.bent).toBe(true);
    expect(p.far).not.toBeNull();
    if (p.far === null) return;
    const [A, K, F] = p.cut.legs;
    expect(p.cut.legs).toEqual([p.start.A, p.corner.K, p.far.foot]);
    expect(crosses(hole, A, F)).toBe(true);
    expect(crosses(hole, A, K) || crosses(hole, K, F)).toBe(false);
  });
});
