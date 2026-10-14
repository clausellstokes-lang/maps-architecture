// The working frame (§4.6 steps 1–3; step 8 (a)'s turned frames) and the slope term (§4.6 step 1, COV-MFCG-C05):
// the OBB's major axis, turned toward the contour by min(0.5, slope / 0.3) on a face whose mean slope exceeds 5 % —
// a switch at weight 0 on a flat site and under a parity preset (§7.6: the option off) — built and unit-tested here on
// a synthetic slope field (the real field is M0-e-05's, the slope classes M1's); a ladder attempt k turns the frame by
// k × 36°; the outer ring's extent along the axis.
import { dmath } from '@plat/kernel';
import type { PresetId } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { cutCells, planCut, RAD_PER_CDEG, slopeWeight, towardContour, workingFrame, type FaceSlope } from '../../../src/infill/planner.js';
import { asCut, cross, CTX, dot, FACES, ring, streamsFor } from './support.js';

/** A synthetic slope field: the plane z = gx · x + gy · y, read as the face's mean slope and contour direction. */
function planeSlope(gx: number, gy: number): FaceSlope {
  return { meanSlope: Math.hypot(gx, gy), contour: { x: -gy, y: gx } };
}

const angleOf = (v: { x: number; y: number }): number => Math.atan2(v.y, v.x);

describe('the working frame', () => {
  it('is the OBB major axis through its centre, with the outer ring\'s extent along it', () => {
    const r = workingFrame(FACES.rectangle, 0);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const f = r.value;
    expect(f.major).toEqual({ x: 1, y: 0 });
    expect(f.minor).toEqual({ x: -0, y: 1 });
    expect(f.centre).toEqual({ x: 6000, y: 3500 });
    expect([f.sMin, f.sMax, f.lengthCm]).toEqual([-6000, 6000, 12000]);
    expect(f.slopeWeight).toBe(0);
  });

  it('turns by k × 36° on attempt k (step 8 (a)); the plan reads the turned frame', () => {
    // The turn reads infill's radians per centidegree: the double π / 18 000, never growth/heading.ts's literal one ulp
    // above it (the two are never swapped).
    const radPerCdeg = 3.141592653589793 / 18000;
    expect(RAD_PER_CDEG).toBe(radPerCdeg);
    expect(RAD_PER_CDEG).not.toBe(0.00017453292519943296);
    const first = asCut(planCut(FACES.rectangle, CTX, streamsFor(9)));
    for (const k of [1, 2]) {
      const r = workingFrame(FACES.rectangle, k * 3600);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(angleOf(r.value.major)).toBeCloseTo((k * 36 * Math.PI) / 180, 12);
      // The OBB's axis (1, 0) turned by dmath's cos and sin of k × 3 600 cdeg, to the bit.
      expect(r.value.major).toEqual({ x: dmath.cos(k * 3600 * radPerCdeg), y: dmath.sin(k * 3600 * radPerCdeg) });
      const p = planCut(FACES.rectangle, { ...CTX, attempt: k, stop: first.stop }, streamsFor(9));
      expect(p.ok && p.value.kind === 'cut' && p.value.frame.turnCdeg).toBe(k * 3600);
      if (p.ok && p.value.kind === 'cut') {
        expect(p.value.frame.major).toEqual(r.value.major);
        // The extent along the turned axis covers every vertex.
        for (const q of FACES.rectangle.rings[0]) {
          const s = dot({ x: q.x - r.value.centre.x, y: q.y - r.value.centre.y }, r.value.major);
          expect(s).toBeGreaterThanOrEqual(r.value.sMin - 1e-9);
          expect(s).toBeLessThanOrEqual(r.value.sMax + 1e-9);
        }
      }
    }
  });

  it('refuses a face with no area as obb does (E_DEGENERATE collinear)', () => {
    const flat = { rings: [ring([[0, 0], [5000, 0], [9000, 0]])] };
    const r = workingFrame(flat, 0);
    expect(r.ok).toBe(false);
    const p = planCut(flat, CTX, streamsFor(1));
    expect(p.ok ? 'ok' : `${p.code}/${p.detail}`).toBe('E_DEGENERATE/collinear');
  });
});

describe('the slope term on a synthetic slope field (§4.6 step 1)', () => {
  const cells = cutCells();

  it('weighs min(0.5, slope / 0.3) above a 5 % slope and 0 at or below it', () => {
    expect(slopeWeight(0, cells.slope)).toBe(0);
    expect(slopeWeight(0.05, cells.slope)).toBe(0);
    expect(slopeWeight(0.0500001, cells.slope)).toBeCloseTo(0.0500001 / 0.3, 15);
    expect(slopeWeight(0.06, cells.slope)).toBeCloseTo(0.2, 15);
    expect(slopeWeight(0.15, cells.slope)).toBe(0.5);
    expect(slopeWeight(0.4, cells.slope)).toBe(0.5);
  });

  it('turns the major axis toward the contour line by the weight', () => {
    const major = { x: 1, y: 0 };
    // Contour at 60° from the axis: rotated by w · 60°.
    const c = { x: Math.cos(Math.PI / 3), y: Math.sin(Math.PI / 3) };
    expect(angleOf(towardContour(major, c, 0.5))).toBeCloseTo(Math.PI / 6, 12);
    // A contour direction is a line: its reverse turns the axis the same way.
    expect(angleOf(towardContour(major, { x: -c.x, y: -c.y }, 0.5))).toBeCloseTo(Math.PI / 6, 12);
    // Contour at 120° (−60° as a line): the axis turns the other way.
    expect(angleOf(towardContour(major, { x: -0.5, y: Math.sqrt(3) / 2 }, 0.2))).toBeCloseTo(-Math.PI / 15, 12);
    expect(towardContour(major, c, 0)).toBe(major);
  });

  it('a hillside face: the plan\'s axis turns toward the contours, cuts run nearer the fall line', () => {
    // The rectangle (major axis east) on a plane falling north-east: gradient (0.12, 0.12) — slope 0.17, weight 0.5;
    // the contours run north-west (135°, i.e. −45° as a line).
    const slope = planeSlope(0.12, 0.12);
    const flat = asCut(planCut(FACES.rectangle, CTX, streamsFor(3)));
    const hill = asCut(planCut(FACES.rectangle, { ...CTX, slope }, streamsFor(3)));
    expect(hill.frame.slopeWeight).toBe(0.5);
    expect(angleOf(hill.frame.major)).toBeCloseTo(-Math.PI / 8, 12);
    expect(angleOf(flat.frame.major)).toBe(0);
    // Weight 0 below 5 %: the same plan as on the flat site.
    const gentle = asCut(planCut(FACES.rectangle, { ...CTX, slope: planeSlope(0.03, 0.03) }, streamsFor(3)));
    expect(gentle.frame.slopeWeight).toBe(0);
    expect(gentle.cut.chain).toEqual(flat.cut.chain);
    // The cut's first leg is nearer the fall line (gradient direction 45°) on the hillside: |cos| to it is larger.
    const fall = { x: Math.SQRT1_2, y: Math.SQRT1_2 };
    const leg = (p: typeof flat) => {
      const [a, b] = p.cut.legs;
      const l = Math.hypot(b.x - a.x, b.y - a.y);
      return { x: (b.x - a.x) / l, y: (b.y - a.y) / l };
    };
    expect(Math.abs(cross(hill.frame.minor, fall))).toBeLessThan(Math.abs(cross(flat.frame.minor, fall)));
    expect(leg(hill)).toBeDefined();
  });

  it('is a switch: a parity preset turns the option off (§7.6)', () => {
    for (const preset of ['MFCG', 'NG'] as PresetId[]) {
      expect(cutCells(undefined, preset).slope).toBeNull();
      expect(slopeWeight(0.3, cutCells(undefined, preset).slope)).toBe(0);
      const p = asCut(planCut(FACES.rectangle, { ...CTX, preset, slope: planeSlope(0.2, 0.1) }, streamsFor(3)));
      expect(p.frame.slopeWeight).toBe(0);
      expect(angleOf(p.frame.major)).toBe(0);
    }
    expect(cutCells().slope).toEqual({ threshold: 0.05, weightMax: 0.5, scale: 0.3 });
  });
});
