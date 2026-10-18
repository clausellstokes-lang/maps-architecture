// M0-c-03: the arterial graph (§4.3 *One graph*: the union of the routes' edges with their multiplicities, split into
// chains at every node of degree ≠ 2 and at every pinned node, junctions closer than 8 m merged on the graph; C-0236
// (3)) and the parallel fold (C-0236 (16): a later route's run within the class separation of an earlier one for more
// than a step is laid along it).
import { describe, expect, it } from 'vitest';
import { arterialGraph, foldParallel, type RoutePoint, type S4Route } from '../../src/index.js';
import { P } from './support.js';

const MERGE = 800;

function route(id: string, order: number, pts: (RoutePoint | [number, number])[], part: 'inward' | 'outward' = 'inward', cls: 'primary' | 'through' = 'primary'): S4Route {
  const points = pts.map((p) => (Array.isArray(p) ? { at: P(p[0], p[1]) } : p));
  return { id, order, part, class: cls, points, spans: [], from: { kind: 'plaza', id: 'plaza:0' }, to: { kind: 'gate', id: `gate:${id}` } };
}
const pin = (x: number, y: number, kind: RoutePoint['pin'] = 'attach', id = 'plaza:0'): RoutePoint => ({ at: P(x, y), pin: kind, pinId: id });

describe('the arterial graph (§4.3; C-0236 (3))', () => {
  it('is the union of the routes with each edge carrying its multiplicity; chains split at degree ≠ 2 and at pins', () => {
    // Two routes share 0 → 3 000 and split there; the second also passes a pinned point at (6 000, 3 000).
    const a = route('a', 0, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [4000, 0], pin(5000, 0, 'gate', 'gate:a')]);
    const b = route('b', 1, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [4000, 1000], [5000, 2000], pin(6000, 3000, 'deck_end', 'bridge:0'), [7000, 3000], pin(8000, 3000, 'gate', 'gate:b')]);
    const g = arterialGraph([a, b], MERGE);
    expect(g.nodes).toHaveLength(11);
    const shared = g.edges.filter((e) => e.routes.length === 2);
    expect(shared).toHaveLength(3);
    // Chains: the shared run (multiplicity 2), a's branch, b's branch to the pin, b's run past the pin.
    expect(g.chains.map((c) => [c.nodes.map((n) => g.nodes[n].at.x), c.multiplicity])).toEqual([
      [[0, 1000, 2000, 3000], 2],
      [[3000, 4000, 5000], 1],
      [[3000, 4000, 5000, 6000], 1],
      [[6000, 7000, 8000], 1],
    ]);
    expect(g.chains[0].routes).toEqual([0, 1]);
    expect(g.merges).toEqual([]);
  });

  it('merges junctions closer than 8 m on the graph (into the higher degree), and not those 8 m apart', () => {
    // A T at (3 000, 0) and another at (3 700, 0), 7 m apart: one junction.
    const a = route('a', 0, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [3700, 0], [5000, 0], pin(6000, 0, 'gate', 'gate:a')]);
    const b = route('b', 1, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [3000, 2000], pin(3000, 4000, 'gate', 'gate:b')]);
    const c = route('c', 2, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [3700, 0], [3700, -2000], pin(3700, -4000, 'gate', 'gate:c')]);
    const g = arterialGraph([a, b, c], MERGE);
    expect(g.merges).toHaveLength(1);
    expect(g.merges[0].distanceCm).toBe(700);
    // Both junctions had degree 3: the lower-then-leftmost (3 000, 0) is kept.
    expect(g.merges[0].kept).toEqual(P(3000, 0));
    expect(g.nodes.some((n) => n.at.x === 3700 && n.at.y === 0)).toBe(false);
    const deg4 = g.nodes.filter((n) => n.edges.length === 4);
    expect(deg4.map((n) => n.at)).toEqual([P(3000, 0)]);
    // 8 m apart (a diagonal pair: 480 × 640 cm): two junctions; 7.99 m (479 × 640): one.
    const at = (x: number, y: number): [S4Route, S4Route] => [
      route('a', 0, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [x, y], [5000, y], pin(6000, y, 'gate', 'gate:a')]),
      route('c', 2, [pin(0, 0), [1000, 0], [2000, 0], [3000, 0], [x, y], [x, -2000], pin(x, -4000, 'gate', 'gate:c')]),
    ];
    const [a8, c8] = at(3480, 640);
    expect(arterialGraph([a8, b, c8], MERGE).merges).toEqual([]);
    const [a7, c7] = at(3479, 640);
    expect(arterialGraph([a7, b, c7], MERGE).merges).toHaveLength(1);
  });

  it('merges a junction into a pinned one, keeps two pinned ones apart, and never merges into a gate', () => {
    // An attach point (pinned, degree 1) 5 m from the split node (degree 3): merged into the attach point.
    const a = route('a', 0, [pin(0, 0), [500, 0], [1500, 1000], pin(2500, 2000, 'gate', 'gate:a')]);
    const b = route('b', 1, [pin(0, 0), [500, 0], [1500, -1000], pin(2500, -2000, 'gate', 'gate:b')]);
    const g = arterialGraph([a, b], MERGE);
    expect(g.merges.map((m) => [m.kept, m.merged])).toEqual([[P(0, 0), P(500, 0)]]);
    expect(g.routes[0].points.map((p) => p.at)).toEqual([P(0, 0), P(1500, 1000), P(2500, 2000)]);
    // Two pinned junctions 5 m apart: kept apart, reported.
    const c = route('c', 0, [pin(0, 0), [2000, 0], pin(2500, 0, 'deck_end', 'bridge:0'), pin(3000, 0, 'deck_end', 'bridge:0'), [5000, 0], pin(6000, 0, 'gate', 'gate:c')]);
    const d = route('d', 1, [pin(0, 0), [2000, 0], pin(2500, 0, 'deck_end', 'bridge:0'), [2500, 2000], pin(2500, 4000, 'gate', 'gate:d')]);
    const gd = arterialGraph([c, d], MERGE);
    expect(gd.keptApart.map((k) => k.why)).toEqual(['both_pinned']);
    // A gate 6 m from a junction: kept apart (a gate carries its road out and its street in alone).
    const e = route('e', 0, [pin(0, 0), [2000, 0], [3000, 0], pin(3600, 0, 'gate', 'gate:e'), [5000, 0]]);
    const f = route('f', 1, [pin(0, 0), [2000, 0], [3000, 0], [3000, 2000], pin(3000, 4000, 'gate', 'gate:f')]);
    const ge = arterialGraph([e, f], MERGE);
    expect(ge.keptApart.map((k) => k.why)).toEqual(['gate']);
    expect(ge.merges).toEqual([]);
  });

  it('cuts out a loop a merge makes in a route', () => {
    // Route b passes (3 000, 0), leaves, and comes back to (3 500, 0), 5 m off: after the merge it would revisit.
    const a = route('a', 0, [pin(0, 0), [1000, 0], [3000, 0], [3000, 1000], pin(3000, 3000, 'gate', 'gate:a')]);
    const b = route('b', 1, [pin(0, 0), [1000, 0], [3000, 0], [3000, -1000], [3500, -1000], [3500, 0], [3500, 1000], [5000, 0], pin(6000, 0, 'gate', 'gate:b')]);
    // A third route ends there, so (3 500, 0) is a junction 5 m from the one at (3 000, 0).
    const c = route('c', 2, [pin(6000, 3000, 'gate', 'gate:c'), [4500, 1500], [3500, 0]]);
    const g = arterialGraph([a, b, c], MERGE);
    expect(g.merges.map((m) => [m.kept, m.merged])).toEqual([[P(3000, 0), P(3500, 0)]]);
    const pts = g.routes[1].points.map((p) => `${String(p.at.x)},${String(p.at.y)}`);
    expect(new Set(pts).size).toBe(pts.length);
    expect(pts).toEqual(['0,0', '1000,0', '3000,0', '3500,1000', '5000,0', '6000,0']);
  });
});

describe('the parallel fold (C-0236 (16))', () => {
  const sep = (): number => 4000;
  it('lays a later route running within the separation of an earlier one for more than a step along it', () => {
    const a = route('a', 0, [pin(0, 0), [2500, 0], [5000, 0], [7500, 0], [10000, 0], [12500, 0], pin(15000, 0, 'gate', 'gate:a')]);
    // b runs 20 m off a from x = 2 500 to 10 000, then leaves.
    const b = route('b', 1, [pin(0, 0), [2500, 2000], [5000, 2000], [7500, 2000], [10000, 2000], [12500, 8000], pin(15000, 15000, 'gate', 'gate:b')]);
    const f = foldParallel([a, b], sep, 2500, []);
    expect(f.folds).toHaveLength(1);
    expect(f.folds[0]).toMatchObject({ route: 'b', onto: 'a', lengthCm: 7500 });
    expect(f.routes[1].points.map((p) => [p.at.x, p.at.y])).toEqual([
      [0, 0],
      [2500, 0],
      [5000, 0],
      [7500, 0],
      [10000, 0],
      [12500, 8000],
      [15000, 15000],
    ]);
    const g = arterialGraph(f.routes, MERGE);
    expect(Math.max(...g.chains.map((c) => c.multiplicity))).toBe(2);
  });

  it('leaves runs beyond the separation, runs of one step, held points, the other kind of part, and runs whose joins cross', () => {
    const a = route('a', 0, [pin(0, 0), [2500, 0], [5000, 0], [7500, 0], [10000, 0], [12500, 0], pin(15000, 0, 'gate', 'gate:a')]);
    const far = route('b', 1, [pin(0, 0), [2500, 4100], [5000, 4100], [7500, 4100], [10000, 4100], [12500, 8000], pin(15000, 15000, 'gate', 'gate:b')]);
    expect(foldParallel([a, far], sep, 2500, []).folds).toEqual([]);
    const short = route('b', 1, [pin(0, 0), [2500, 6000], [5000, 2000], [7500, 2000], [10000, 6000], pin(15000, 15000, 'gate', 'gate:b')]);
    expect(foldParallel([a, short], sep, 2500, []).folds).toEqual([]);
    const held = route('b', 1, [pin(0, 0), { at: P(2500, 2000), held: true }, { at: P(5000, 2000), held: true }, { at: P(7500, 2000), held: true }, { at: P(10000, 2000), held: true }, [12500, 8000], pin(15000, 15000, 'gate', 'gate:b')]);
    expect(foldParallel([a, held], sep, 2500, []).folds).toEqual([]);
    const outward = route('b', 1, [pin(0, 0), [2500, 2000], [5000, 2000], [7500, 2000], [10000, 2000], [12500, 8000], pin(15000, 15000, 'gate', 'gate:b')], 'outward');
    expect(foldParallel([a, outward], sep, 2500, []).folds).toEqual([]);
    const near = route('b', 1, [pin(0, 0), [2500, 2000], [5000, 2000], [7500, 2000], [10000, 2000], [12500, 8000], pin(15000, 15000, 'gate', 'gate:b')]);
    // A wall side across the join from (0, 0) to the run's first point on a.
    expect(foldParallel([a, near], sep, 2500, [[1000, -500, 1000, 3000], [1000, 3000, 1000, 6000]]).folds).toEqual([]);
  });
});
