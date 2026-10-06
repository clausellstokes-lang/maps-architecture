// T38-1's shape clause (§4.6 step 6; §13.2): fillets on lane and street cuts only, never on a plot cut; at a kept
// corner one cut.arc uniform keeps it sharp with chance s + (1 − s) · min(1, w_min / ℓ), s = (1 − cos δ) / 2 (no
// trigonometric call); otherwise an arc tangent to both legs, spanning the shorter leg end to end, sampled in chords no
// shorter than w_min or the lattice minimum edge, with at least three points and inside the face — or the corner
// stays sharp. (The filleted share on NG's recorded shapes is M0-b-05b's, AFTER-M-1.)
import { describe, expect, it } from 'vitest';
import { fitFillet, planCut, sharpChance } from '../../../src/infill/planner.js';
import { insideFace, segmentClear } from '../../../src/infill/sides.js';
import { checkArc, CTX, FACE_NAMES, FACES, norm, ring, streamsFor, sub } from './support.js';

const SEEDS = 150;

describe('T38-1: fillets on lane and street cuts only', () => {
  it('a plot cut is never filleted and draws nothing on cut.arc', () => {
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= 60; seed += 1) {
        const r = planCut(FACES[name], { ...CTX, cutKind: 'plot' }, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut') continue;
        expect(r.value.draws.some((d) => d.concern === 'cut.arc')).toBe(false);
        if (r.value.cut.bent) {
          expect(r.value.cut.fillet?.filleted).toBe(false);
          expect(r.value.cut.fillet?.sharpBecause).toBe('plot');
          expect(r.value.cut.fillet?.u).toBeNull();
        }
      }
    }
  });

  it('a way cut rounds some kept corners on the face set and keeps the rest sharp by the draw', () => {
    let rounded = 0;
    let sharp = 0;
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut' || !r.value.cut.bent) continue;
        const fl = r.value.cut.fillet;
        expect(fl).not.toBeNull();
        if (fl === null) continue;
        const [A, K, B] = r.value.cut.legs;
        // The sharp chance from the legs, and the decision by the one uniform.
        const { cosDelta, pSharp } = sharpChance(A, K, B, 400);
        expect(fl.cosDelta).toBe(cosDelta);
        expect(fl.pSharp).toBe(pSharp);
        const u1 = { x: (K.x - A.x) / norm(sub(K, A)), y: (K.y - A.y) / norm(sub(K, A)) };
        const u2 = { x: (B.x - K.x) / norm(sub(B, K)), y: (B.y - K.y) / norm(sub(B, K)) };
        const s = (1 - (u1.x * u2.x + u1.y * u2.y)) / 2;
        const l = Math.min(norm(sub(K, A)), norm(sub(B, K)));
        expect(pSharp).toBeCloseTo(s + (1 - s) * Math.min(1, 400 / l), 12);
        expect(fl.u).not.toBeNull();
        if ((fl.u ?? 0) < pSharp) {
          sharp += 1;
          expect(fl.filleted).toBe(false);
          expect(fl.sharpBecause).toBe('drawn');
        } else if (fl.filleted) {
          rounded += 1;
          checkArc(A, K, B, fl.arc, 400);
          // The cut's points: A, the arc, B — K replaced.
          expect(r.value.cut.points.some((p) => p.x === K.x && p.y === K.y)).toBe(false);
        }
      }
    }
    expect(rounded).toBeGreaterThan(50);
    expect(sharp).toBeGreaterThan(10);
  });
});

describe('the sharp chance s + (1 − s) · min(1, w_min / ℓ)', () => {
  it('is 1 when the shorter leg is under w_min, and grows with the turn', () => {
    const A = { x: 0, y: 0 };
    const K = { x: 0, y: 5000 };
    expect(sharpChance(A, K, { x: 300, y: 5000 }, 400).pSharp).toBe(1);
    const gentle = sharpChance(A, K, { x: 600, y: 10000 }, 400);
    const sharpTurn = sharpChance(A, K, { x: 5000, y: 6000 }, 400);
    expect(gentle.pSharp).toBeLessThan(sharpTurn.pSharp);
    // A right angle: s = ½; legs 5 000 and 5 000: ½ + ½ · 0.08.
    expect(sharpChance(A, K, { x: 5000, y: 5000 }, 400).pSharp).toBeCloseTo(0.5 + 0.5 * 0.08, 15);
    // Straight on: s = 0, the chance is w_min / ℓ alone.
    expect(sharpChance(A, K, { x: 0, y: 9000 }, 400).pSharp).toBeCloseTo(400 / 4000, 15);
  });
});

describe('the arc (fitFillet)', () => {
  const face = [ring([[-20000, -20000], [20000, -20000], [20000, 20000], [-20000, 20000]])];

  it('is tangent to both legs, spans the shorter leg, chords ≥ max(w_min, minEdge), ≥ 3 points', () => {
    const cases = [
      [{ x: 0, y: 0 }, { x: 0, y: 6000 }, { x: 4000, y: 7500 }],
      [{ x: 0, y: 0 }, { x: 0, y: 3000 }, { x: 9000, y: 3800 }],
      [{ x: 100, y: -500 }, { x: 900, y: 7000 }, { x: -6000, y: 8000 }],
    ] as const;
    for (const [A, K, B] of cases) {
      for (const w of [400, 10, 900]) {
        const f = fitFillet(face, A, K, B, w, 3);
        expect(f.filleted).toBe(true);
        checkArc(A, K, B, f.arc, w);
      }
    }
  });

  it('leaves the corner sharp when the arc would leave the face', () => {
    // A hole inside the corner's wedge, between K and where the arc would run.
    const A = { x: 0, y: 0 };
    const K = { x: 0, y: 6000 };
    const B = { x: 6000, y: 6000 };
    expect(fitFillet(face, A, K, B, 400, 3).filleted).toBe(true);
    // The quarter arc of radius 6 000 about (6 000, 0) passes (1 757, 4 243): a hole across it.
    const hole = ring([[1500, 4000], [1500, 4500], [2000, 4500], [2000, 4000]]);
    const f = fitFillet([face[0], hole], A, K, B, 400, 3);
    expect(f.filleted).toBe(false);
    expect(f.sharpBecause).toBe('outside');
  });

  it('leaves the corner sharp when it holds fewer than the sample floor', () => {
    const A = { x: 0, y: 0 };
    const K = { x: 0, y: 1000 };
    const B = { x: 1000, y: 1000 };
    // An arc of radius 1 000 through 90°: 1 571 cm — one chord of 900 only.
    const f = fitFillet(face, A, K, B, 900, 3);
    expect(f.filleted).toBe(false);
    // A table that asked for more samples than the arc holds.
    const g = fitFillet(face, A, K, B, 100, 40);
    expect(g.filleted).toBe(false);
    expect(g.sharpBecause).toBe('samples');
  });

  it('on the plan: every arc the face set keeps lies inside the face', () => {
    let n = 0;
    for (const name of FACE_NAMES) {
      for (let seed = 1; seed <= 100; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut' || r.value.cut.fillet?.filleted !== true) continue;
        n += 1;
        const arc = r.value.cut.fillet.arc;
        for (let i = 1; i + 1 < arc.length; i += 1) expect(insideFace(r.value.sides.rings, arc[i])).toBe(true);
        for (let i = 0; i + 1 < arc.length; i += 1) expect(segmentClear(r.value.sides.rings, arc[i], arc[i + 1], 0.5)).toBe(true);
      }
    }
    expect(n).toBeGreaterThan(50);
  });
});
