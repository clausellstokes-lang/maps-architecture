// arb.selfTouching (M0-k-01; §13.1 (1) self-touching polygons and chains). Rings: two x-monotone chains on one x
// grid, a lower one D and an upper one U standing 1 … G cm above it at every grid x except at one or more interior,
// non-adjacent touch indices, where U comes down onto D — at D's own vertex (a pinch: the ring passes one lattice point
// twice) or at a lattice point inside one of D's edges, D's vertex there left out (a vertex touching an edge). Between
// grid points both chains are straight, so U lies strictly above D everywhere but at the touches: the ring meets itself
// exactly there and is otherwise simple. Chains: an x-monotone chain P, then an excursion up above all of P, back over
// to the x of a target point t on P (one of P's vertices, or a lattice point inside one of its edges) and straight down
// onto t — the vertical line meets an x-monotone P only at t, so the chain touches itself exactly at its last vertex.
// Both then go through a unimodular lattice map (a rotated copy, exact) into the range.
import fc from 'fast-check';
import { MAP_GROWTH, det, fitIntoRange, latticeMapArb, mapVecs, place, posArb, resolveLimit, reversedRing, scaleArb, type Vec } from './lattice.js';
import type { FuzzChain, FuzzRing, FuzzShapeOptions } from './types.js';

/** The largest interval count. */
const MAX_INTERVALS = 24;

/** One grid interval of the ring's draw. */
const intervalArb = (step: number) =>
  fc.record({
    dx: scaleArb(1, step),
    dd: fc.integer({ min: -step, max: step }),
    gap: fc.integer({ min: 1, max: step }),
    touch: fc.boolean(),
    edge: fc.boolean(),
    mu: fc.integer({ min: 1, max: 3 }),
  });

/** The step bound that keeps the mapped shape inside ±limit. */
function stepFor(limit: number): number {
  return Math.max(1, Math.floor(Math.floor(limit / 8) / (MAP_GROWTH * 4 * MAX_INTERVALS)));
}

/** Self-touching rings; see the module comment. */
function touchingRing(limit: number): fc.Arbitrary<FuzzRing> {
  const step = stepFor(limit);
  return fc
    .record({
      rows: fc.array(intervalArb(step), { minLength: 2, maxLength: MAX_INTERVALS }),
      map: latticeMapArb,
      fx: posArb,
      fy: posArb,
    })
    .map(({ rows, map, fx, fy }) => {
      const n = rows.length; // grid points 0 … n
      const steps = rows.map((r) => ({ dx: r.dx, dd: r.dd }));
      const touches = new Map<number, 'vertex' | 'edge'>();
      for (let k = 1; k < n; k += 1) {
        const r = rows[k - 1];
        if (!r.touch || touches.has(k - 1)) continue;
        touches.set(k, r.edge ? 'edge' : 'vertex');
        // An edge touch: the interval after k continues the one before it (μ times as long), so D's point at grid k
        // lies inside the straight edge from k − 1 to k + 1.
        if (r.edge) steps[k] = { dx: r.mu * steps[k - 1].dx, dd: r.mu * steps[k - 1].dd };
      }
      if (touches.size === 0) touches.set(1, 'vertex');
      const xs = [0];
      const ds = [0];
      steps.forEach((s, i) => {
        xs.push(xs[i] + s.dx);
        ds.push(ds[i] + s.dd);
      });
      const low: Vec[] = [];
      const high: Vec[] = [];
      for (let i = 0; i <= n; i += 1) {
        const t = touches.get(i);
        if (t !== 'edge') low.push({ x: xs[i], y: ds[i] });
        high.push({ x: xs[i], y: ds[i] + (t === undefined ? rows[Math.min(i, n - 1)].gap : 0) });
      }
      const ring = fitIntoRange(mapVecs([...low, ...high.reverse()], map), limit, fx, fy);
      return det(map) > 0 ? ring : reversedRing(ring);
    });
}

/** Self-touching chains; see the module comment. */
function touchingChain(limit: number): fc.Arbitrary<FuzzChain> {
  const step = stepFor(limit);
  return fc
    .record({
      rows: fc.array(fc.record({ dx: scaleArb(1, step), dy: fc.integer({ min: -step, max: step }) }), { minLength: 1, maxLength: MAX_INTERVALS }),
      at: posArb,
      edge: fc.boolean(),
      mu: fc.integer({ min: 2, max: 4 }),
      nu: posArb,
      h: fc.integer({ min: 1, max: step }),
      map: latticeMapArb,
      fx: posArb,
      fy: posArb,
    })
    .map(({ rows, at, edge, mu, nu, h, map, fx, fy }) => {
      const n = rows.length; // vertices 0 … n
      const j = place(0, n - 1, at); // the target's vertex, or the start of its edge
      const steps = rows.map((r) => ({ dx: r.dx, dy: r.dy }));
      // An edge target: the edge from j to j + 1 is μ times a step, so it holds lattice points inside it.
      if (edge) steps[j] = { dx: mu * steps[j].dx, dy: mu * steps[j].dy };
      const p: Vec[] = [{ x: 0, y: 0 }];
      steps.forEach((s, i) => p.push({ x: p[i].x + s.dx, y: p[i].y + s.dy }));
      const k = place(1, mu - 1, nu);
      const t = edge ? { x: p[j].x + (k * steps[j].dx) / mu, y: p[j].y + (k * steps[j].dy) / mu } : p[j];
      let top = -Infinity;
      for (const v of p) if (v.y > top) top = v.y;
      top += h;
      const last = p[n];
      return fitIntoRange(mapVecs([...p, { x: last.x, y: top }, { x: t.x, y: top }, { x: t.x, y: t.y }], map), limit, fx, fy);
    });
}

/** Self-touching polygons (the default) or chains (§13.1 (1)); see the module comment. */
export function selfTouching(opts: FuzzShapeOptions = {}): fc.Arbitrary<FuzzRing> {
  const limit = resolveLimit(opts.limitCm);
  return opts.shape === 'chain' ? touchingChain(limit) : touchingRing(limit);
}
