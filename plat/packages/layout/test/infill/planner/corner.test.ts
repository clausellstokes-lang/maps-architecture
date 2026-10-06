// T37-1 (§4.6 steps 4–5; §13.2): every kept corner K lies at least o from both ends of its first leg, or at λ / 2 when
// λ < 2o (o = e_lo; e_lo / 2 on a holed face), K fixed before any far side; every second leg meets its far run square
// within the lattice tolerance — the far run the facing run nearest a right angle to the first leg (ties: the
// earlier); under `flatten` no kept corner's triangle A–K–foot is lower than max(cut.flattenM, 0.02 × |A–foot|), and a
// lower one is dropped (A → foot); under `straightFirst` (the MFCG preset) every first leg that arrives within
// asin(√0.99) of square is straight, with the flatten plan beside it for step 8's checks; no cut bends twice;
// E_NOT_TWO_CROSSINGS when no far run qualifies.
import { describe, expect, it } from 'vitest';
import { cutCells, farSide, planCut } from '../../../src/infill/planner.js';
import { faceSides, isCurved } from '../../../src/infill/sides.js';
import { asCut, checkGeometry, cross, CTX, dot, FACE_NAMES, FACES, farDirAt, latticeTol, norm, ring, streamsFor, sub, unitV } from './support.js';

const SEEDS = 120;

describe('T37-1: the corner K', () => {
  it('sits at o + (λ − 2o) · b from A on the first leg — at least o from both ends — with b the corner draw', () => {
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut') continue;
        const { corner, start } = r.value;
        const holed = FACES[name].rings.length > 1;
        expect(corner.oCm).toBe(holed ? 1200 : 2400);
        const b = r.value.draws[2].value;
        expect(corner.b).toBe(b);
        if (corner.lambdaCm >= 2 * corner.oCm) {
          expect(corner.atCm).toBe(corner.oCm + (corner.lambdaCm - 2 * corner.oCm) * b);
          expect(corner.atCm).toBeGreaterThanOrEqual(corner.oCm);
          expect(corner.lambdaCm - corner.atCm).toBeGreaterThanOrEqual(corner.oCm - 1e-9);
        } else expect(corner.atCm).toBe(corner.lambdaCm / 2);
        // K on the first leg; λ the first leg's run to the boundary.
        expect(norm(sub(corner.K, { x: start.A.x + start.normal.x * corner.atCm, y: start.A.y + start.normal.y * corner.atCm }))).toBe(0);
        expect(norm(sub(corner.hit, start.A))).toBeCloseTo(corner.lambdaCm, 6);
      }
    }
  });

  it('sits at λ / 2 when λ < 2o', () => {
    // A 12 000 × 4 500 block: λ = 4 500 < 2 · 2 400 on every seed that cuts it.
    const face = { rings: [ring([[0, 0], [12000, 0], [12000, 4500], [0, 4500]])] };
    let n = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const r = planCut(face, CTX, streamsFor(seed));
      if (!r.ok || r.value.kind !== 'cut') continue;
      n += 1;
      expect(r.value.corner.lambdaCm).toBe(4500);
      expect(r.value.corner.atCm).toBe(2250);
    }
    expect(n).toBeGreaterThan(10);
    // λ = 2o exactly takes the drawn branch: K = o + 0 · b = o.
    const exact = { rings: [ring([[0, 0], [12000, 0], [12000, 4800], [0, 4800]])] };
    const p = asCut(planCut(exact, { ...CTX, stop: { ...asCut(planCut(FACES.rectangle, CTX, streamsFor(1))).stop, tauCm: 2400 } }, streamsFor(1)));
    expect(p.corner.lambdaCm).toBe(4800);
    expect(p.corner.atCm).toBe(2400);
  });

  it('is fixed before the far side: the far run is the one K sees, never chosen first', () => {
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const p = asCut(planCut(FACES.triangle, CTX, streamsFor(seed)));
      const again = farSide(p.sides, p.corner.K, p.start.normal);
      expect(again).toEqual(p.far);
    }
  });
});

describe('T37-1: the far run and the second leg', () => {
  it('takes the facing run nearest a right angle to the first leg; ties go to the earlier run', () => {
    // A roof: two north runs at ±9.5° (18.9° apart — two runs at the 10° tolerance), both facing a vertical first leg.
    const roof = ring([[0, 0], [12000, 0], [12000, 6000], [6000, 7000], [0, 6000]]);
    const sides = faceSides([roof], 1000, 0, 500);
    const up = { x: 0, y: 1 };
    const sym = farSide(sides, { x: 6000, y: 3000 }, up);
    expect(sym).not.toBeNull();
    const north = sides.runs.map((r, i) => ({ r, i })).filter(({ r }) => r.dir.x < 0 && Math.abs(r.dir.y) > 0);
    expect(north).toHaveLength(2);
    // Equal squared cross products: the earlier in boundary order.
    expect(sym?.run).toBe(Math.min(north[0].i, north[1].i));
    // A steeper western roof: the eastern run is nearer a right angle to the leg.
    const lop = ring([[0, 0], [12000, 0], [12000, 6800], [6000, 7000], [0, 5000]]);
    const ls = faceSides([lop], 1000, 0, 500);
    const pick = farSide(ls, { x: 6000, y: 3000 }, up);
    expect(pick).not.toBeNull();
    if (pick !== null) {
      const run = ls.runs[pick.run];
      expect(run.a.x).toBe(12000);
      const scores = ls.runs.map((r) => cross(up, r.dir) ** 2);
      expect(scores[pick.run]).toBe(Math.max(...ls.runs.map((r, i) => (dot({ x: -r.dir.y, y: r.dir.x }, up) < 0 ? scores[i] : -1))));
    }
  });

  it('every second leg meets its far run square within the lattice tolerance, on the face set (its tangent on a curved run)', () => {
    // The run's direction at the foot is the test's own (`farDirAt`: the chord, or on a curved run the tangent over
    // the ± 5 m window, §4.6 *Sides*), never the plan's `far.dir` — a foot solved against a curved run's chord is
    // ≈ 5° off its tangent on the curved face and fails here (the check's B1, mutant m46).
    const curvedFar = new Map<string, number>();
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut' || r.value.far === null) continue;
        const { corner, far, sides } = r.value;
        const dir = farDirAt(sides, far);
        if (isCurved(sides.runs[far.run])) curvedFar.set(name, (curvedFar.get(name) ?? 0) + 1);
        const leg = sub(far.foot, corner.K);
        expect(Math.abs(dot(unitV(leg), dir))).toBeLessThanOrEqual(latticeTol(norm(leg)));
        // Snapped to the lattice, it stays square within the tolerance.
        const ks = { x: Math.round(corner.K.x), y: Math.round(corner.K.y) };
        const fs = { x: Math.round(far.foot.x), y: Math.round(far.foot.y) };
        expect(Math.abs(dot(unitV(sub(fs, ks)), dir))).toBeLessThanOrEqual(latticeTol(norm(leg)) * 1.0001);
        // The plan reports that direction, and the far run faces the first leg.
        expect(far.dir).toEqual(dir);
        expect(dot({ x: -dir.y, y: dir.x }, r.value.start.normal)).toBeLessThan(0);
      }
    }
    // The curved cases are reached: the curved, Chaikin and round-joined faces each meet a curved far run.
    for (const name of ['curved', 'chaikin', 'roundJoined']) expect(curvedFar.get(name) ?? 0).toBeGreaterThan(SEEDS / 4);
  });

  it('returns E_NOT_TWO_CROSSINGS when no run qualifies, with the steps found so far', () => {
    const sides = faceSides([ring([[0, 0], [12000, 0], [12000, 7000], [0, 7000]])], 1000, 0, 500);
    // A K beside the face sees no facing run with a foot inside it; inside it, the north side.
    expect(farSide(sides, { x: 20000, y: 3500 }, { x: 0, y: 1 })).toBeNull();
    expect(farSide(sides, { x: 6000, y: 3500 }, { x: 0, y: 1 })?.foot).toEqual({ x: 6000, y: 7000 });
    // A star-shaped face (found by a random search, 4 % of such faces): K sees no facing run with a foot inside it.
    const star = ring([[7197, 0], [7764, 5641], [1864, 5738], [-2181, 6713], [-5827, 4234], [-7346, 0], [-9346, -6791], [-2300, -7080], [1292, -3978], [4866, -3535]]);
    const r = planCut({ rings: [star] }, CTX, streamsFor(6));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(r.detail).toBe('far run');
    const part = r.partial;
    expect(part?.kind).toBe('failed');
    if (part?.kind !== 'failed') return;
    // Rung (b)'s mean normal reads the start run's inward normal as steps 3–4 found it; K was fixed.
    expect(part.start).not.toBeNull();
    expect(part.corner).not.toBeNull();
    expect(farSide(part.sides, part.corner?.K ?? { x: 0, y: 0 }, part.start?.normal ?? { x: 0, y: 1 })).toBeNull();
    expect(part.draws.map((d) => d.step)).toEqual(['stop', 'position', 'corner']);
  });
});

describe('T37-1: flatten (the default bendMode)', () => {
  /** A trapezoid whose north side rises `rise` cm over 12 000 cm. */
  const lean = (rise: number) => ({ rings: [ring([[0, 0], [12000, 0], [12000, 7000 + rise], [0, 7000]])] });

  it('drops K when the triangle A–K–foot is lower than max(0.7 m, 0.02 × |A–foot|), keeps it at or above', () => {
    let dropped = 0;
    let kept = 0;
    for (const rise of [60, 150, 250, 400, 900, 2000]) {
      for (let seed = 1; seed <= 40; seed += 1) {
        const p = asCut(planCut(lean(rise), CTX, streamsFor(seed)));
        if (p.far === null) continue;
        const A = p.start.A;
        const K = p.corner.K;
        const F = p.far.foot;
        const base = norm(sub(F, A));
        const h = Math.abs(cross(sub(F, A), sub(K, A))) / base;
        const thr = Math.max(70, 0.02 * base);
        expect(p.cut.flattenThresholdCm).toBeCloseTo(thr, 9);
        expect(p.cut.heightCm).toBeCloseTo(h, 6);
        if (h < thr) {
          dropped += 1;
          expect(p.cut.bent).toBe(false);
          expect(p.cut.legs).toEqual([A, F]);
        } else {
          kept += 1;
          expect(p.cut.bent).toBe(true);
          expect(p.cut.legs).toEqual([A, K, F]);
        }
      }
    }
    expect(dropped).toBeGreaterThan(10);
    expect(kept).toBeGreaterThan(10);
  });

  it('reads the 2 % share: a triangle between 0.7 m and 0.02 × |A–foot| high is dropped', () => {
    // |A–foot| ≈ 7 000: the share's 140 cm governs; heights between 70 and 140 cm must flatten.
    let inBand = 0;
    for (let seed = 1; seed <= 120; seed += 1) {
      const p = asCut(planCut(lean(900), CTX, streamsFor(seed)));
      if (p.far === null) continue;
      if (p.cut.heightCm >= 70 && p.cut.heightCm < p.cut.flattenThresholdCm) {
        inBand += 1;
        expect(p.cut.bent).toBe(false);
      }
    }
    expect(inBand).toBeGreaterThan(0);
  });

  it('no cut bends twice', () => {
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (r.ok && r.value.kind === 'cut') expect(r.value.cut.legs.length).toBeLessThanOrEqual(3);
      }
    }
  });
});

describe('T37-1: straightFirst (the MFCG preset)', () => {
  const MFCG = { ...CTX, preset: 'MFCG' as const };
  const lean = (deg: number) => ({ rings: [ring([[0, 0], [12000, 0], [12000, Math.round(7000 + 12000 * Math.tan((deg * Math.PI) / 180))], [0, 7000]])] });

  it('reads the preset: straightFirst, cut.flattenM 8 m', () => {
    const c = cutCells(undefined, 'MFCG');
    expect(c.bendMode).toBe('straightFirst');
    expect(c.flattenCm).toBe(800);
    expect(cutCells().bendMode).toBe('flatten');
    expect(cutCells().flattenCm).toBe(70);
  });

  it('keeps a first leg straight to its hit when it arrives within asin(√0.99) of square, the flatten plan beside it', () => {
    for (const deg of [0, 3, 5.5]) {
      for (let seed = 1; seed <= 40; seed += 1) {
        const p = asCut(planCut(lean(deg), MFCG, streamsFor(seed)));
        expect(p.mode).toBe('straightFirst');
        expect(p.cut.bent).toBe(false);
        expect(p.cut.legs).toEqual([p.start.A, p.corner.hit]);
        expect(p.cut.arrivalCross2).toBeGreaterThan(0.99);
        expect(p.alternate).not.toBeNull();
        if (p.alternate !== null) {
          checkGeometry(p, p.alternate, MFCG);
          expect(p.alternate.flattenThresholdCm).toBeGreaterThanOrEqual(800);
        }
      }
    }
  });

  it('plans a first leg arriving beyond asin(√0.99) as under flatten (with cut.flattenM 8 m)', () => {
    for (const deg of [6.5, 12, 20]) {
      for (let seed = 1; seed <= 40; seed += 1) {
        const p = asCut(planCut(lean(deg), MFCG, streamsFor(seed)));
        expect(p.cut.arrivalCross2).toBe(-1);
        expect(p.alternate).toBeNull();
        checkGeometry(p, p.cut, MFCG);
        expect(p.cut.flattenThresholdCm).toBe(Math.max(800, 0.02 * norm(sub(p.cut.legs[p.cut.legs.length - 1], p.start.A))));
      }
    }
  });

  it('tests the arrival by its squared cross product, no inverse trigonometry: 0.99 is the boundary', () => {
    // sin²(84.26°) = 0.99: a leg meeting its run at 5.6° off square passes, at 5.8° fails.
    const pass = asCut(planCut(lean(5.6), MFCG, streamsFor(2)));
    const fail = asCut(planCut(lean(5.8), MFCG, streamsFor(2)));
    expect(pass.cut.arrivalCross2).toBeGreaterThan(0.99);
    expect(fail.cut.arrivalCross2).toBe(-1);
  });
});
