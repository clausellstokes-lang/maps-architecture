// T36-1 (§4.6 steps 2–3; §13.2): the start A draws nothing — it is a pure function of the face, the frame and the
// position f, and a face planned with a different cut.t stream keeps its start run — and lies on the run whose chord
// is most nearly parallel to the working major axis (ties: the earlier run in boundary order); the first leg leaves
// A exactly perpendicular to its run (its chord, or its tangent on a curved run). Step 2's position: f = (c + b) / 2
// with c the area centroid's relative position, never more than 0.25 from (0.5 + c) / 2.
import { describe, expect, it } from 'vitest';
import { planCut, startOf, type StopRecord } from '../../../src/infill/planner.js';
import { faceSides, sideDir } from '../../../src/infill/sides.js';
import { asCut, cross, CTX, dot, FACE_NAMES, FACES, ring, streamsFor } from './support.js';

const SEEDS = 80;

describe('T36-1: the start draws nothing', () => {
  for (const name of FACE_NAMES) {
    it(`${name}: A is startOf(face, frame, f) — the position draw alone moves it`, () => {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut') continue;
        const p = r.value;
        const again = startOf(p.sides, p.frame, p.start.f);
        expect(again).not.toBeNull();
        expect(again?.A).toEqual(p.start.A);
        expect(again?.run).toBe(p.start.run);
        // The draws between the position and the corner: none.
        const steps = p.draws.map((d) => d.step);
        expect(steps.slice(0, 3)).toEqual(['stop', 'position', 'corner']);
      }
    });
  }

  it('a face planned with a different cut.t stream keeps its start run', () => {
    for (const name of ['rectangle', 'trapezoid', 'triangle', 'roundJoined', 'curved']) {
      const base = asCut(planCut(FACES[name], CTX, streamsFor(1)));
      const stop: StopRecord = base.stop;
      const runs = new Set<number>();
      const fs = new Set<number>();
      for (let lineage = 1; lineage <= SEEDS; lineage += 1) {
        // Another face key: other cut.t (and cut.arc) streams; the stop record held, as the ladder holds it.
        const p = asCut(planCut(FACES[name], { ...CTX, stop }, streamsFor(1, [lineage, 7])));
        runs.add(p.start.run);
        fs.add(p.start.f);
      }
      expect(fs.size).toBeGreaterThan(SEEDS / 2);
      expect([...runs]).toEqual([base.start.run]);
    }
  });
});

describe('T36-1: A lies on the run most nearly parallel to the working major axis (ties: the earlier run)', () => {
  for (const name of FACE_NAMES) {
    it(`${name}`, () => {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut') continue;
        const { sides, frame, start } = r.value;
        const par = (i: number): number => cross(sides.runs[i].dir, frame.major) ** 2;
        const mine = par(start.run);
        const other = par(start.otherRun);
        expect(mine).toBeLessThanOrEqual(other);
        if (mine === other && start.run !== start.otherRun) expect(start.run).toBeLessThan(start.otherRun);
        // Both candidates lie on the minor-axis line at f.
        const s = (q: { x: number; y: number }): number => dot({ x: q.x - frame.centre.x, y: q.y - frame.centre.y }, frame.major);
        expect(s(start.A)).toBeCloseTo(frame.sMin + start.f * frame.lengthCm, 6);
        expect(s(start.other)).toBeCloseTo(frame.sMin + start.f * frame.lengthCm, 6);
      }
    });
  }

  it('a rectangle\'s two long sides tie: the start takes the earlier in boundary order, whatever the ring\'s first vertex', () => {
    const rings: (readonly [number, number])[][] = [
      [[0, 0], [12000, 0], [12000, 7000], [0, 7000]],
      [[12000, 7000], [0, 7000], [0, 0], [12000, 0]],
      [[12000, 7000], [12000, 0], [0, 0], [0, 7000]],
    ];
    for (const r of rings) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const p = asCut(planCut({ rings: [ring(r)] }, CTX, streamsFor(seed)));
        // sideRuns starts at the largest turn, ties lowest-leftmost: (0, 0) — the south side is run 0.
        expect(p.start.A.y).toBe(0);
        expect(p.start.run).toBe(0);
        expect(p.start.otherRun).toBe(2);
      }
    }
  });

  it('a candidate on a less parallel run loses to one on a more parallel run', () => {
    // A trapezoid whose north side leans 10°+ from the south: A always on the south side (run 0, the chord parallel).
    for (let seed = 1; seed <= 30; seed += 1) {
      const p = asCut(planCut(FACES.trapezoid, CTX, streamsFor(seed)));
      expect(p.start.A.y).toBe(0);
      // A face whose south side leans and whose north side is parallel to the major axis starts on the north.
      const flipped = { rings: [ring([[0, 0], [12000, 1500], [12000, 8000], [0, 8000]])] };
      const q = asCut(planCut(flipped, CTX, streamsFor(seed)));
      expect(q.start.A.y).toBeCloseTo(8000, 9);
    }
  });
});

describe('the first leg leaves A exactly perpendicular to its run (§4.6 step 3)', () => {
  for (const name of FACE_NAMES) {
    it(`${name}`, () => {
      for (let seed = 1; seed <= SEEDS; seed += 1) {
        const r = planCut(FACES[name], CTX, streamsFor(seed));
        if (!r.ok || r.value.kind !== 'cut') continue;
        const { sides, start } = r.value;
        const d = sideDir(sides, sides.runs[start.run], start.A);
        expect(Math.abs(dot(start.normal, d))).toBeLessThan(1e-12);
        expect(cross(d, start.normal)).toBeCloseTo(1, 12);
      }
    });
  }
});

describe('step 2: f = (c + b) / 2 on a plain face', () => {
  it('c is the area centroid\'s relative position; f stays within 0.25 of (0.5 + c) / 2', () => {
    // An L-ish face whose mass sits west: c < 0.5.
    const face = { rings: [ring([[0, 0], [14000, 0], [14000, 4500], [5000, 4500], [5000, 9000], [0, 9000]])] };
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const r = planCut(face, CTX, streamsFor(seed));
      if (!r.ok || r.value.kind !== 'cut') continue;
      const { start, frame } = r.value;
      const b = r.value.draws[1].value;
      expect(start.c).not.toBeNull();
      expect(start.m).toBeNull();
      expect(start.f).toBe(((start.c ?? 0) + b) / 2);
      expect(Math.abs(start.f - (0.5 + (start.c ?? 0)) / 2)).toBeLessThanOrEqual(0.25);
      // The centroid of the L: (Σ Aᵢ xᵢ) / A over its two rectangles, projected on the frame's axis.
      const ax = 14000 * 4500;
      const bx = 5000 * 4500;
      const cx = (ax * 7000 + bx * 2500) / (ax + bx);
      const cy = (ax * 2250 + bx * 6750) / (ax + bx);
      const s = (cx - frame.centre.x) * frame.major.x + (cy - frame.centre.y) * frame.major.y;
      expect(start.c).toBeCloseTo((s - frame.sMin) / frame.lengthCm, 9);
    }
  });

  it('startOf is a pure function: the same face, frame and f give the same start', () => {
    const p = asCut(planCut(FACES.cShape, CTX, streamsFor(2)));
    const sides = faceSides(FACES.cShape.rings, 1000, 300, 500);
    expect(startOf(sides, p.frame, p.start.f)?.A).toEqual(p.start.A);
  });
});
