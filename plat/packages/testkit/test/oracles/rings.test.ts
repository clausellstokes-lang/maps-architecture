// M0-k-03's unit tests of the ring helpers behind the comparison (C-0144 (2), (3), (6)): the face count from the
// region however a library writes its rings, loops, simplicity, the fan triangles' parity, the ring-level checks,
// and the snap into our frame.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { orient } from '@plat/kernel';
import { faceCount } from '../../src/oracles/faces.js';
import {
  dedupe,
  fanTriangles,
  isLatticeRing,
  isSimpleRing,
  loopFaceCount,
  loops,
  ringProblems,
  segmentsCross,
  segmentsMeet,
  snapRing,
} from '../../src/oracles/rings.js';
import { P, R, rect, reversed, starRing } from './support.js';

describe('the face count after snapping (§3.7)', () => {
  it('counts two faces touching at a point as two, however the rings are written', () => {
    const twoRings = [rect(0, 0, 100, 100), rect(100, 100, 200, 200)];
    const oneRing = [R([0, 0], [100, 0], [100, 100], [200, 100], [200, 200], [100, 200], [100, 100], [0, 100])];
    expect(faceCount(twoRings)).toBe(2);
    expect(faceCount(oneRing)).toBe(2);
    expect(loopFaceCount(oneRing)).toBe(2);
    // One ring touching itself at a vertex, (100, 0), that lies inside its own first edge: two triangles meeting at a
    // point. The loops see one ring without a repeated vertex; the region has two faces.
    const tTouch = [R([0, 0], [200, 0], [200, 100], [100, 0], [0, 100])];
    expect(loopFaceCount(tTouch)).toBe(1);
    expect(faceCount(tTouch)).toBe(2);
  });

  it('counts a hole as no face, touching its outline or not', () => {
    expect(faceCount([rect(0, 0, 300, 300), reversed(rect(100, 100, 200, 200))])).toBe(1);
    expect(faceCount([rect(0, 0, 300, 300), reversed(R([0, 150], [100, 100], [100, 200]))])).toBe(1); // touching at (0, 150)
  });

  it('drops zero-area faces: spikes, antennae and collinear rings', () => {
    expect(faceCount([R([0, 0], [100, 0], [200, 0])])).toBe(0);
    expect(faceCount([R([0, 0], [100, 0], [100, 100], [0, 100], [0, 0], [-100, 0])])).toBe(1);
    expect(loops(R([0, 0], [50, 0], [0, 0], [0, 50]))).toEqual([]);
    expect(faceCount([])).toBe(0);
  });

  it('agrees with the loop count on simple rings', () => {
    fc.assert(
      fc.property(fc.array(starRing, { minLength: 1, maxLength: 3 }), (rs) => {
        // Disjoint simple rings: one face each by the region, whichever way a ring runs; the loop count reads the
        // convention (outer rings counter-clockwise), so it agrees once every ring runs counter-clockwise.
        const simple = rs.filter(isSimpleRing);
        const far = simple.map((r, i) => r.map((p) => P(p.x + i * 20_000, p.y)));
        const ccw = far.map((r) => (orient(r) > 0 ? r : reversed(r)));
        return faceCount(far) === far.length && loopFaceCount(ccw) === far.length && faceCount(ccw) === far.length;
      }),
      { numRuns: 500 },
    );
  });
});

describe('ring helpers', () => {
  it('dedupes consecutive and closing duplicates', () => {
    expect(dedupe(R([0, 0], [0, 0], [1, 0], [1, 1], [0, 0]))).toEqual(R([0, 0], [1, 0], [1, 1]));
  });

  it('checks the lattice and snaps doubles to the nearest centimetre', () => {
    expect(isLatticeRing([{ x: 1, y: 2 }])).toBe(true);
    expect(isLatticeRing([{ x: 1.5, y: 2 }])).toBe(false);
    expect(isLatticeRing([{ x: 8_388_608, y: 2 }])).toBe(false);
    expect(snapRing([[0.4, 0.6], [10.5, -10.5], [10.5, -10.5]])).toEqual(R([0, 1], [11, -11]));
    expect(snapRing([[Number.NaN, 0]])).toBeNull();
  });

  it('tells simple rings from crossing, touching and folded ones', () => {
    expect(isSimpleRing(rect(0, 0, 10, 10))).toBe(true);
    expect(isSimpleRing(R([0, 0], [10, 10], [10, 0], [0, 10]))).toBe(false); // a bow-tie
    expect(isSimpleRing(R([0, 0], [10, 0], [10, 10], [5, 0], [0, 10]))).toBe(false); // a vertex on an edge
    expect(isSimpleRing(R([0, 0], [10, 0], [5, 0], [5, 5]))).toBe(false); // a fold-back
    expect(isSimpleRing(R([0, 0], [10, 0]))).toBe(false);
  });

  it('splits the even-odd region of a ring into fan triangles whose XOR is it (parity at sample points)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ x: fc.integer({ min: -50, max: 50 }), y: fc.integer({ min: -50, max: 50 }) }), { minLength: 3, maxLength: 9 }),
        fc.record({ x: fc.integer({ min: -60, max: 60 }), y: fc.integer({ min: -60, max: 60 }) }),
        (pts, q) => {
          const ring = dedupe(pts.map((p) => P(p.x, p.y)));
          if (ring.length < 3) return true;
          // A sample point off every lattice line: (q + ¼, q + ⅓) never lies on an edge between lattice points.
          const x = q.x + 0.25;
          const y = q.y + 1 / 3;
          const inside = (r: { x: number; y: number }[]): boolean => {
            let c = false;
            for (let i = 0, j = r.length - 1; i < r.length; j = i, i += 1) {
              const a = r[i];
              const b = r[j];
              if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) c = !c;
            }
            return c;
          };
          const parity = fanTriangles(ring).reduce((acc, t) => acc !== inside(t), false);
          return parity === inside(ring);
        },
      ),
      { numRuns: 2_000 },
    );
  });

  it('meets and crosses: exact segment tests', () => {
    expect(segmentsMeet(P(0, 0), P(10, 0), P(10, 0), P(10, 10))).toBe(true);
    expect(segmentsCross(P(0, 0), P(10, 0), P(10, 0), P(10, 10))).toBe(false);
    expect(segmentsCross(P(0, 0), P(10, 10), P(0, 10), P(10, 0))).toBe(true);
    expect(segmentsCross(P(0, 0), P(10, 0), P(5, 0), P(20, 0))).toBe(true); // overlap of 5 cm
    expect(segmentsCross(P(0, 0), P(10, 0), P(10, 0), P(20, 0))).toBe(false); // end to end
    expect(segmentsCross(P(0, 0), P(10, 0), P(5, 0), P(5, 10))).toBe(false); // a T-touch
    expect(segmentsMeet(P(0, 0), P(10, 0), P(11, 0), P(20, 0))).toBe(false);
  });

  it('names the ring-level problems of an output', () => {
    expect(ringProblems([rect(0, 0, 100, 100)])).toEqual([]);
    expect(ringProblems([rect(0, 0, 100, 100), rect(100, 100, 200, 200)])).toEqual([]); // a touch at a vertex
    expect(ringProblems([rect(0, 0, 300, 300), reversed(rect(100, 100, 200, 200))])).toEqual([]);
    expect(ringProblems([R([0, 0], [200, 200], [200, 0], [0, 100])])).toEqual(['crossing edges']);
    expect(ringProblems([R([0, 0], [100, 100], [100, 0], [0, 100])])).toEqual(['crossing edges', 'degenerate ring']);
    expect(ringProblems([rect(0, 0, 100, 10)])).toEqual(['edge below minEdge']);
    expect(ringProblems([R([0, 0], [100, 0], [200, 0])])).toEqual(['crossing edges', 'degenerate ring']); // it folds back
    expect(ringProblems([rect(0, 0, 100, 100), rect(50, 0, 150, 100)])).toEqual(['crossing edges']);
  });
});
