// M0-a-13: the whole-step validation's predicates on a step's view (validate.ts): the exact distance and triangle tests,
// one vertex per lattice point and minEdge on a mover, the rotation at a vertex, and §3.10's placement bound — a slid or
// re-seated vertex more than the hot pixel off its route as the step leaves it fails the step. And the shared parts the
// warp reads by path (C-0314, C-0321): `nearestLattice` is the placement rule's nearest of four, and the distances and
// bounds it reads from their homes hold the values the warp needs. And the placement rule's own candidates in warp.ts —
// test (i) and the band's order — on N-r10-1's input and on a tie (hardening round S1).
import { describe, expect, it } from 'vitest';
import { insertChain } from '../../src/insert/index.js';
import { HOT_PIXEL_SQ, nearestLatticePoint } from '../../src/insert/placement.js';
import { BOX_RANGE, segmentCloserThan } from '../../src/num/exact.js';
import { LATTICE } from '../../src/num/index.js';
import { routeOf } from '../../src/warp/held.js';
import { nearestLattice } from '../../src/warp/index.js';
import { onRoutePixel, hotPixelCandidates } from '../../src/warp/warp.js';
import { closerThan, heldRunProblem, inTriangle, nestingProblem, placementBoundProblem, rotationKept, stepProblem, vertexProblem } from '../../src/warp/validate.js';
import { padBox, StepView } from '../../src/warp/view.js';
import { commit, framed, must, pt, vertexAtPoint } from './support.js';

const G = { layer: 'ground' as const, part: 0 };

describe('the exact predicates', () => {
  it('closerThan and inTriangle on lattice points', () => {
    expect(closerThan(0, 25, -100, 0, 100, 0, 25)).toBe(false);
    expect(closerThan(0, 24, -100, 0, 100, 0, 25)).toBe(true);
    expect(closerThan(117, 17, -100, 0, 100, 0, 25)).toBe(true); // beyond the end: 17² + 17² = 578 < 625 from (100, 0)
    expect(closerThan(118, 18, -100, 0, 100, 0, 25)).toBe(false); // 18² + 18² = 648
    expect(inTriangle(1, 1, 0, 0, 10, 0, 0, 10)).toBe(true);
    expect(inTriangle(5, 5, 0, 0, 10, 0, 0, 10)).toBe(true); // on the hypotenuse: closed
    expect(inTriangle(6, 6, 0, 0, 10, 0, 0, 10)).toBe(false);
    expect(inTriangle(1, 0, 0, 0, 5, 0, 10, 0)).toBe(false); // a degenerate triangle holds nothing
  });
});

describe('the view\'s checks', () => {
  function kerb() {
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'kerb', entity: 'block:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(1500, 1000), pt(1500, 600)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    return p;
  }

  it('a mover on another vertex\'s point, or too near its neighbour, fails; at a clear point it passes', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const view = new StepView(p, G);
    view.set(s, 1000, 1000);
    expect(vertexProblem(view, s)).toMatch(/^two vertices/);
    view.set(s, 1980, 1000);
    expect(vertexProblem(view, s)).toMatch(/^minEdge/);
    view.set(s, 1600, 1000);
    expect(vertexProblem(view, s)).toBeNull();
    expect(stepProblem(view, [s], new Set())).toBeNull();
    expect(stepProblem(view, [s], new Set([s]))).toMatch(/^held/);
  });

  it('the placement bound: a re-seat 1 cm off its route fails, 0.7 cm passes', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const route = routeOf(p, s);
    expect(route).not.toBeNull();
    const view = new StepView(p, G);
    view.set(s, 1500, 1001);
    expect(placementBoundProblem(view, [{ v: s, route: route as NonNullable<typeof route> }])).toMatch(/^placement bound/);
    // The route's far end lifted by 1.4 cm: (1 500, 1 001) is now 0.3 cm off the line (1 000, 1 000)–(2 000, 1 001.4…).
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1001);
    expect(placementBoundProblem(view, [{ v: s, route: route as NonNullable<typeof route> }])).toBeNull();
  });

  it('the placement bound is the hot pixel, 0.71 cm: a re-seat 0.705 cm off its route passes, 0.712 cm off fails', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const route = routeOf(p, s) as NonNullable<ReturnType<typeof routeOf>>;
    const view = new StepView(p, G);
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1001); // the route (1 000, 1 000)–(2 000, 1 001)
    view.set(s, 1295, 1001); // o = 1 000 · 1 − 1 · 295 = 705: 705² / 1 000 001 = 0.4970 ≤ 0.71²
    expect(placementBoundProblem(view, [{ v: s, route }])).toBeNull();
    view.set(s, 1288, 1001); // o = 712: 712² / 1 000 001 = 0.5069 > 0.71²
    expect(placementBoundProblem(view, [{ v: s, route }])).toMatch(/^placement bound: \(1288, 1001\)/);
  });

  it('nesting: a free chain moved with the ring around it keeps its side; carried out of a ring that moves, it fails', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000), pt(2000, 2000), pt(1000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory', { closed: true }));
    commit(p, 2, (o) => insertChain(o, [pt(1700, 1500), pt(1800, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const ring = [[1000, 1000], [2000, 1000], [2000, 2000], [1000, 2000]].map(([x, y]) => vertexAtPoint(p, x, y));
    const chain = [[1700, 1500], [1800, 1500]].map(([x, y]) => vertexAtPoint(p, x, y));
    expect([...ring, ...chain].every((v) => v >= 0)).toBe(true);
    // Everything 250 cm east: the chain's new points (1 950 – 2 050, 1 500) lie inside the moved ring, though
    // (2 050, 1 500) is outside the ring as it stood — the side is read before at the arena's points, after at the view's.
    const along = new StepView(p, G);
    for (const v of [...ring, ...chain]) along.set(v, p.vertices.x[v] + 250, p.vertices.y[v]);
    expect(nestingProblem(along, [...ring, ...chain])).toBeNull();
    // The chain alone 250 cm east while one ring corner shifts: (2 050, 1 500) leaves the ring.
    const out = new StepView(p, G);
    for (const v of chain) out.set(v, p.vertices.x[v] + 250, p.vertices.y[v]);
    out.set(ring[0], 1000, 990);
    expect(nestingProblem(out, [ring[0], ...chain])).toMatch(/^nesting: the vertex \(1800, 1500\) moved to \(2050, 1500\)/);
  });

  it('nesting: a free chain moved with its ring keeps its side though its old point lies outside the moved ring (P-N3b)', () => {
    // N-r10c-2: the square ring (1 000, 1 000)–(2 000, 2 000) and a chain (1 100, 1 500)–(1 200, 1 500) inside it, all
    // 800 cm east. The chain's old point is read against the ring as it stood (inside), its new point against the moved
    // ring (inside): no change. Read against the moved ring, (1 100, 1 500) would be outside it.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(2000, 1000), pt(2000, 2000), pt(1000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory', { closed: true }));
    commit(p, 2, (o) => insertChain(o, [pt(1100, 1500), pt(1200, 1500)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const ring = [[1000, 1000], [2000, 1000], [2000, 2000], [1000, 2000]].map(([x, y]) => vertexAtPoint(p, x, y));
    const chain = [[1100, 1500], [1200, 1500]].map(([x, y]) => vertexAtPoint(p, x, y));
    expect([...ring, ...chain].every((v) => v >= 0)).toBe(true);
    const view = new StepView(p, G);
    for (const v of [...ring, ...chain]) view.set(v, p.vertices.x[v] + 800, p.vertices.y[v]);
    expect(nestingProblem(view, [...ring, ...chain])).toBeNull();
  });

  it('the mover path: a chain carried whole over an unmoved edge fails though no other check of the step sees it', () => {
    // Note 1: the L2 chain (1 900, 1 900)–(2 000, 1 900) set 160 cm north, over the L1 way (1 000, 2 000)–(3 000, 2 000).
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(3000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(1900, 1900), pt(2000, 1900)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const chain = [[1900, 1900], [2000, 1900]].map(([x, y]) => vertexAtPoint(p, x, y));
    const view = new StepView(p, G);
    for (const v of chain) view.set(v, p.vertices.x[v], 2060);
    for (const v of chain) expect(vertexProblem(view, v)).toBeNull();
    expect(nestingProblem(view, chain)).toBeNull();
    expect(stepProblem(view, chain, new Set())).toMatch(/^swept: the path of \(1900, 1900\) to \(1900, 2060\) crosses the unmoved edge \(1000, 2000\)–\(3000, 2000\)/);
  });

  it('a held finer vertex whose run\'s end moves off its line fails (§3.6 held (5)); with its run\'s ends unmoved it passes', () => {
    const p = kerb();
    const s = vertexAtPoint(p, 1500, 1000);
    const route = routeOf(p, s) as NonNullable<ReturnType<typeof routeOf>>;
    const held = [{ v: s, route }];
    const view = new StepView(p, G);
    expect(heldRunProblem(view, held)).toBeNull();
    view.set(vertexAtPoint(p, 1500, 600), 1500, 640); // a move off the run: no matter
    expect(heldRunProblem(view, held)).toBeNull();
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1040); // one end moved: 20 cm off the line
    expect(heldRunProblem(view, held)).toMatch(/^held placement bound: \(1500, 1000\)/);
    view.set(vertexAtPoint(p, 1000, 1000), 1000, 1040);
    expect(heldRunProblem(view, held)).toMatch(/^held placement bound: \(1500, 1000\)/);
    view.set(vertexAtPoint(p, 1000, 1000), 1000, 1001); // both ends lifted 1 cm: (1 500, 1 000) 1 cm off the line
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1001);
    expect(heldRunProblem(view, held)).toMatch(/^held placement bound/);
    view.set(vertexAtPoint(p, 2000, 1000), 2000, 1000); // one end lifted 1 cm: 0.5 cm off the line, inside the hot pixel
    expect(heldRunProblem(view, held)).toBeNull();
  });

  it('the rotation: a degree-3 vertex whose edge swings past another keeps no order', () => {
    const p = framed();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(2000, 1000), pt(2000, 2000), pt(2000, 3000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(2500, 2000)], [{ role: 'way', entity: 'way:2' }], 'mandatory');
    });
    const j = vertexAtPoint(p, 2000, 2000);
    const e = vertexAtPoint(p, 2500, 2000);
    const view = new StepView(p, G);
    view.set(e, 2400, 2300);
    expect(rotationKept(view, j)).toBe(true);
    view.set(e, 1500, 2100);
    expect(rotationKept(view, j)).toBe(false);
  });
});

/** The oracle: the four lattice points around (x, y), ordered by squared distance, then y, then x; the first. */
function nearestOfFour(x: number, y: number): { x: number; y: number } {
  const fx = Math.floor(x);
  const fy = Math.floor(y);
  const four = [[fx, fy], [fx + 1, fy], [fx, fy + 1], [fx + 1, fy + 1]].map(([cx, cy]) => ({ x: cx + 0, y: cy + 0, d: (cx - x) * (cx - x) + (cy - y) * (cy - y) }));
  four.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
  return { x: four[0].x, y: four[0].y };
}

describe('T-warp-new-1: nearestLattice is the placement rule\'s nearest of four (C-0321 (4); kernel-plan.md §3.4)', () => {
  it('the four tie classes — an x tie, a y tie, a four-way tie, a negative four-way tie — resolve y then x', () => {
    expect(nearestLattice(500.5, 0)).toEqual({ x: 500, y: 0 });
    expect(nearestLattice(500, 0.5)).toEqual({ x: 500, y: 0 });
    expect(nearestLattice(500.5, 0.5)).toEqual({ x: 500, y: 0 });
    expect(nearestLattice(-500.5, -0.5)).toEqual({ x: -501, y: -1 });
    // Never −0: a position just below zero rounds up to +0.
    const z = nearestLattice(-0.25, -0.25);
    expect(Object.is(z.x, 0) && Object.is(z.y, 0)).toBe(true);
    const nz = nearestLattice(-0, -0);
    expect(Object.is(nz.x, 0) && Object.is(nz.y, 0)).toBe(true);
  });

  it('is placement.ts\'s nearestLatticePoint, and agrees with the oracle on every eighth-lattice position of a window', () => {
    expect(nearestLattice).toBe(nearestLatticePoint);
    for (let i = -24; i <= 24; i++) {
      for (let j = -24; j <= 24; j++) {
        for (const [bx, by] of [[0, 0], [517, 4], [-8_388_000, 8_388_000]]) {
          const x = bx + i / 8;
          const y = by + j / 8;
          expect(nearestLattice(x, y), `(${x}, ${y})`).toEqual(nearestOfFour(x, y));
        }
      }
    }
  });
});

describe('the shared distances and bounds the warp reads by path (C-0314, C-0321)', () => {
  it('attractCm 26, minEdge 25, the hot pixel squared 0.71², the index\'s box bound 2²⁴; closerThan is num/exact.ts\'s', () => {
    expect([LATTICE.attractCm, LATTICE.minEdgeCm]).toEqual([26, 25]);
    expect(HOT_PIXEL_SQ).toBe(0.71 * 0.71);
    expect(BOX_RANGE).toBe(16_777_216);
    expect(padBox(-30_000_000, -20_000_000, 30_000_000, 16_777_200, 25)).toEqual({ minX: -16_777_216, minY: -16_777_216, maxX: 16_777_216, maxY: 16_777_216 });
    expect(padBox(10.5, -3.5, 20.2, 7, 2)).toEqual({ minX: 8, minY: -6, maxX: 23, maxY: 9 });
    expect(closerThan).toBe(segmentCloserThan);
  });
});

describe('the placement rule\'s candidates in warp.ts: test (i) and the band\'s order (N-r10c-3, note 5 / N-r10c-4)', () => {
  it('N-r10-1\'s input: 77 candidates; test (i) refuses the nearest (P off the line) and the band\'s 16th, (−8 295 507, 8 303 361)', () => {
    // The band's rounded edge holds (−8 295 507, 8 303 361): o = 4 237, o² = 17 952 169 > 0.71² · 35 612 317 =
    // 17 952 168.9997 (C-0338 (4), N-r10-1). A hot pixel read at 0.75² would let both through.
    const [ax, ay, bx, by, px, py] = [-8_300_000, 8_300_000, -8_295_221, 8_303_574, -8_295_502.8, 8_303_364.1];
    const near = nearestLattice(px, py);
    expect(near).toEqual({ x: -8_295_503, y: 8_303_364 });
    const rest = hotPixelCandidates(ax, ay, bx, by, px, py, near);
    expect(rest).not.toBeNull();
    const all = [near, ...(rest ?? [])];
    expect(all.length).toBe(77);
    expect(all[16]).toEqual({ x: -8_295_507, y: 8_303_361 });
    expect(all.flatMap((q, i) => (onRoutePixel(ax, ay, bx, by, q.x, q.y) ? [] : [i]))).toEqual([0, 16]);
  });

  it('test (i): strictly between the ends, within 0.71 cm of the line — exact at the boundary', () => {
    // The route (1 000, 1 000)–(2 000, 1 001): o = 1 000 · (qy − 1 000) − 1 · (qx − 1 000).
    expect(onRoutePixel(1000, 1000, 2000, 1001, 1295, 1001)).toBe(true); // o = 705: 705² ≤ 0.71² · 1 000 001
    expect(onRoutePixel(1000, 1000, 2000, 1001, 1288, 1001)).toBe(false); // o = 712
    expect(onRoutePixel(1000, 1000, 2000, 1000, 1000, 1000)).toBe(false); // an end
    expect(onRoutePixel(1000, 1000, 2000, 1000, 2000, 1000)).toBe(false);
    expect(onRoutePixel(1000, 1000, 2000, 1000, 1001, 1000)).toBe(true);
    expect(onRoutePixel(1000, 1000, 2000, 1000, 2001, 1000)).toBe(false); // beyond an end
  });

  it('the band\'s ties: equidistant points come y, then x', () => {
    // The route (1 000, 2 000)–(2 000, 1 000) through P = (1 500.5, 1 499.5): the four lattice points around P lie 0.71 cm
    // from it; the nearest is (1 500, 1 499) (y, then x), and the band's next three, all as near, come (1 501, 1 499),
    // (1 500, 1 500), (1 501, 1 500). Read x first, (1 500, 1 500) would come before (1 501, 1 499).
    const near = nearestLattice(1500.5, 1499.5);
    expect(near).toEqual({ x: 1500, y: 1499 });
    expect((hotPixelCandidates(1000, 2000, 2000, 1000, 1500.5, 1499.5, near) ?? []).slice(0, 5)).toEqual([
      { x: 1501, y: 1499 },
      { x: 1500, y: 1500 },
      { x: 1501, y: 1500 },
      { x: 1501, y: 1498 },
      { x: 1502, y: 1499 },
    ]);
  });
});
