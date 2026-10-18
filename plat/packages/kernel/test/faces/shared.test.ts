// M0-a-07: the face partitioners read the kernel's shared exact predicates (kernel-plan.md §1.6 F-1 – F-4; C-0314,
// C-0365). `insideRing` counts each edge by num's crossing rule `crossingStep` on doubled coordinates; `segmentsTouch`,
// `comparePoints`, `lp`, `faceArea2`, `enter` and `overLimit` are num's, the index's and the transaction's own functions
// under the names the partitioners and their importers read; fan.ts's π is num's. The oracles here are the folder's
// own predicate bodies as they stood before the shared module (written out below, never imported), so the delegation
// is held equal to them: the per-edge toggle exhaustively on a window of doubled coordinates (the four cases ay ≤/> qy,
// by ≤/> qy, each side and on the line), the ring test on random star faces with and without a hole at points off and
// at the rings' heights, and the closed-segment contact exhaustively on a window and on random lattice segments. On a
// ring edge `insideRing`'s answer is the half-open parity's, not a rule: the callers that can pass such a point refuse
// or land it by their own attractCm tests (planCut's interior point, radialSplit's apex), as its doc says.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { faceWalk, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { dmath } from '../../src/dmath/index.js';
import * as common from '../../src/faces/common.js';
import { radialSplit, splitFace } from '../../src/faces/index.js';
import { faceArea2 as itemsFaceArea2 } from '../../src/index/items.js';
import { insertChain } from '../../src/insert/index.js';
import * as exact from '../../src/num/exact.js';
import { orient2d } from '../../src/num/index.js';
import { tx } from '../../src/tx/index.js';
import { enterWriter, overLimit as stateOverLimit } from '../../src/tx/state.js';
import { attempt, commit, faceAt, facesAt, halves, pt, spec } from './support.js';

const DIR = join(import.meta.dirname, '../../src/faces');

/** The folder's own crossing toggle before the shared rule: an edge a → b toggles the parity of q (doubled coordinates). */
function referenceToggle(ax: number, ay: number, bx: number, by: number, qx: number, qy: number): boolean {
  if ((ay > qy) !== (by > qy)) {
    const o = orient2d(ax, ay, bx, by, qx, qy);
    return by > ay ? o > 0 : o < 0;
  }
  return false;
}

/** The folder's own ring test before the shared rule (crossing number on doubled coordinates). */
function referenceInsideRing(p: Plat, ring: readonly HalfEdgeId[], qx2: number, qy2: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let inside = false;
  for (const h of ring) {
    const a = O[h];
    const b = O[h ^ 1];
    if (referenceToggle(2 * X[a], 2 * Y[a], 2 * X[b], 2 * Y[b], qx2, qy2)) inside = !inside;
  }
  return inside;
}

/** The folder's own closed-segment contact before the shared predicate (signs of orient2d, then the collinear ends). */
function referenceSegmentsTouch(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const sign = (v: number): number => (v > 0 ? 1 : v < 0 ? -1 : 0);
  const on = (px: number, py: number, qx: number, qy: number, rx: number, ry: number): boolean =>
    orient2d(px, py, qx, qy, rx, ry) === 0 && Math.min(px, qx) <= rx && rx <= Math.max(px, qx) && Math.min(py, qy) <= ry && ry <= Math.max(py, qy);
  const d1 = sign(orient2d(cx, cy, dx, dy, ax, ay));
  const d2 = sign(orient2d(cx, cy, dx, dy, bx, by));
  const d3 = sign(orient2d(ax, ay, bx, by, cx, cy));
  const d4 = sign(orient2d(ax, ay, bx, by, dx, dy));
  if (d1 * d2 < 0 && d3 * d4 < 0) return true;
  return (d1 === 0 && on(cx, cy, dx, dy, ax, ay)) || (d2 === 0 && on(cx, cy, dx, dy, bx, by))
    || (d3 === 0 && on(ax, ay, bx, by, cx, cy)) || (d4 === 0 && on(ax, ay, bx, by, dx, dy));
}

/** A random star face (concave or convex, 6 – 10 vertices) inside the lower half of `halves()`, with a hole when asked. */
const arbStar = fc.record({
  radii: fc.array(fc.integer({ min: 300, max: 900 }), { minLength: 6, maxLength: 10 }),
  phase: fc.integer({ min: 0, max: 35_999 }),
  hole: fc.boolean(),
  points: fc.array(fc.tuple(fc.integer({ min: 1000, max: 3000 }), fc.integer({ min: 0, max: 2000 }), fc.integer({ min: 0, max: 3 })), { minLength: 32, maxLength: 32 }),
});

function polar(cdeg: number, r: number): [number, number] {
  const a = (cdeg * exact.PI) / 18_000;
  return [Math.round(2000 + r * dmath.cos(a)), Math.round(1000 + r * dmath.sin(a))];
}

function starArena(radii: readonly number[], phase: number, hole: boolean): Plat | null {
  const p = halves();
  const k = radii.length;
  const ring = radii.map((r, i) => polar(phase + (i * 36_000) / k, r));
  const a = tx(p, spec(1), (o) => insertChain(o, ring.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'star:1' }], 'mandatory', { closed: true }));
  if (!a.ok) return null;
  if (hole) {
    const h = [0, 1, 2, 3].map((i) => polar(phase + i * 9000, 150));
    const b = tx(p, spec(1), (o) => insertChain(o, h.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'hole:1' }], 'mandatory', { closed: true }));
    if (!b.ok) return null;
  }
  return p;
}

describe('src/faces: the shared predicates (kernel-plan.md §1.6)', () => {
  it('the crossing toggle: crossingStep ≠ 0 exactly where the folder\'s own rule toggled, the four cases each side and on the line', () => {
    let toggles = 0;
    const W = [-2, -1, 0, 1, 2];
    for (const ax of W) for (const ay of W) for (const bx of W) for (const by of W) for (const qx of W) for (const qy of W) {
      const want = referenceToggle(ax, ay, bx, by, qx, qy);
      const got = exact.crossingStep(ax, ay, bx, by, qx, qy) !== 0;
      if (got !== want) expect.fail(`(${ax}, ${ay}) → (${bx}, ${by}) at (${qx}, ${qy}): ${got} where the folder's rule gives ${want}`);
      if (want) toggles++;
    }
    expect(toggles).toBeGreaterThan(0);
  });

  it('insideRing equals the folder\'s own ring test on random star faces, off the rings and at their vertices\' heights', () => {
    let asked = 0;
    fc.assert(
      fc.property(arbStar, (c) => {
        const p = starArena(c.radii, c.phase, c.hole);
        if (p === null) return;
        const Y = p.vertices.y;
        const O = p.halfEdges.origin;
        for (const f of facesAt(p, 1)) {
          for (const ring of faceWalk(p, 1, f)) {
            for (const [x, y, mode] of c.points) {
              // mode 0: a lattice point; 1: a half-lattice point; 2, 3: at a ring vertex's height (x on or off the half lattice).
              const v = O[ring[(x + y) % ring.length]];
              const qx2 = mode < 2 ? 2 * x + mode : 2 * x + (mode - 2);
              const qy2 = mode < 2 ? 2 * y + mode : 2 * Y[v];
              expect(common.insideRing(p, ring, qx2, qy2)).toBe(referenceInsideRing(p, ring, qx2, qy2));
              asked++;
            }
          }
        }
      }),
      { numRuns: 300 },
    );
    expect(asked).toBeGreaterThan(1000);
  });

  it('segmentsTouch equals the folder\'s own contact test exhaustively on a window and on random lattice segments', () => {
    const W = [-1, 0, 1, 2];
    for (const ax of W) for (const ay of W) for (const bx of W) for (const by of W) for (const cx of W) for (const cy of W) for (const dx of W) for (const dy of W) {
      const got = common.segmentsTouch(ax, ay, bx, by, cx, cy, dx, dy);
      if (got !== referenceSegmentsTouch(ax, ay, bx, by, cx, cy, dx, dy)) expect.fail(`(${ax}, ${ay})–(${bx}, ${by}) and (${cx}, ${cy})–(${dx}, ${dy}): ${got}`);
    }
    const c = fc.integer({ min: -4_000_000, max: 4_000_000 });
    fc.assert(
      fc.property(c, c, c, c, c, c, fc.integer({ min: -3, max: 3 }), fc.integer({ min: -3, max: 3 }), (ax, ay, bx, by, cx, cy, s, t) => {
        // c–d through a or along a–b half the time, so ends on the other segment and collinear overlaps are drawn.
        const [dx, dy] = s === 0 ? [ax + t * (bx - ax), ay + t * (by - ay)] : [cx + s * 1000, cy + t * 1000];
        expect(common.segmentsTouch(ax, ay, bx, by, cx, cy, dx, dy)).toBe(referenceSegmentsTouch(ax, ay, bx, by, cx, cy, dx, dy));
        expect(common.segmentsTouch(ax, ay, bx, by, ax, ay, dx, dy)).toBe(referenceSegmentsTouch(ax, ay, bx, by, ax, ay, dx, dy));
      }),
      { numRuns: 10_000 },
    );
  });

  it('the public names are the shared functions themselves (no copy beside them)', () => {
    expect(common.segmentsTouch).toBe(exact.segmentsMeet);
    expect(common.comparePoints).toBe(exact.comparePoints);
    expect(common.lp).toBe(exact.lp);
    expect(common.faceArea2).toBe(itemsFaceArea2);
    expect(common.enter).toBe(enterWriter);
    expect(common.overLimit).toBe(stateOverLimit);
  });

  it('insideRing on a ring edge gives the half-open parity\'s answer, not a rule: planCut and radialSplit refuse or land such a point by attractCm', () => {
    const p = halves();
    const f = faceAt(p, 1, 1000, 1000);
    const ring = faceWalk(p, 1, f)[0];
    const pts = ring.map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }));
    // The lower face [0, 4000] × [0, 2000]: doubled points on its bottom, left, top and right edges, then off the ring.
    const onEdge: [number, number, boolean][] = [[4000, 0, true], [0, 2000, true], [4000, 4000, false], [8000, 2000, false]];
    for (const [qx2, qy2, want] of onEdge) {
      expect(common.insideRing(p, ring, qx2, qy2), `(${qx2}, ${qy2}) doubled`).toBe(want);
      expect(exact.insideDoubledRing(pts, qx2, qy2)).toBe(want);
    }
    expect(common.insideRing(p, ring, 4000, 2000)).toBe(true);
    expect(common.insideRing(p, ring, 4000, -2)).toBe(false);
    // planCut: the interior point (2000, 0) passes the parity (bottom edge) and is refused by its attractCm test.
    const cut = attempt(p, 1, (o) => splitFace(o, f, [pt(0, 1000), pt(2000, 0), pt(4000, 1000)], { rows: [{ role: 'district_bound', entity: 'd:1' }] }));
    expect(!cut.ok && cut.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(!cut.ok && cut.detail).toBe('the cut\'s point (2000, 0) lies within attractCm of the boundary (§3.6 (2))');
    // radialSplit: an apex on the bottom or the left edge passes the parity and is landed on the boundary, so one ray
    // splits the face in two (from an interior apex one ray is refused).
    for (const [x, y, ray] of [[2000, 0, 9000], [0, 1000, 0]] as const) {
      const q = halves();
      const g = faceAt(q, 1, 1000, 1000);
      expect(common.insideRing(q, faceWalk(q, 1, g)[0], 2 * x, 2 * y)).toBe(true);
      expect(commit(q, 1, (o) => radialSplit(o, g, pt(x, y), [ray], { rows: [{ role: 'district_bound', entity: 'd:1' }] })).value).toHaveLength(2);
    }
  });

  it('insideRing counts by crossingStep, and the folder spells no π of its own', () => {
    const src = readFileSync(join(DIR, 'common.ts'), 'utf8');
    const body = src.slice(src.indexOf('export function insideRing('), src.indexOf('export function insideRegion('));
    expect(body).toMatch(/crossingStep\(2 \* X\[a\], 2 \* Y\[a\], 2 \* X\[b\], 2 \* Y\[b\], qx2, qy2\) !== 0/);
    expect(body).not.toMatch(/orient2d\(/);
    for (const f of ['claim.ts', 'common.ts', 'fan.ts', 'index.ts', 'merge.ts', 'ops.ts', 'split.ts']) {
      expect(readFileSync(join(DIR, f), 'utf8'), f).not.toMatch(/3\.14159/);
    }
    expect(readFileSync(join(DIR, 'fan.ts'), 'utf8')).toMatch(/import \{ PI \} from '\.\.\/num\/exact\.js';/);
  });
});
