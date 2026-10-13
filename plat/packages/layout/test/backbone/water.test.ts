// M0-c-03: S4's routes reach the commit dry and simple (C-0250; §2.2 rule 7, C-0076, §3.10 role consistency). On
// hand-built water: a river at the frame's edge where a through-road leaves (its frame stub would cross it: the road
// ends at its last dry node), a U-shaped river whose crossing site the outward route gives up (F-ROUTE's another_site
// re-solve from the corridor's end would step back into the held corridor: it is kept out of it), a gate route
// carrying an A → B → A spur (cut to a simple path), a course across water handed to the commit (refused, never
// committed), and a route over two decks (one deck per way).
import { describe, expect, it } from 'vitest';
import type { Cdeg } from '@plat/model';
import { tableView } from '@plat/tables';
import { commitOuterRing, commitRoutes, commitS3Slice, runS4, s3Slice, WAY_SPAN_NODES, type RoutePoint, type S3Slice, type S4Route } from '../../src/index.js';
import { partMeetsWater, simpleCourse } from '../../src/backbone/stage.js';
import { waterSides } from '../../src/backbone/commit.js';
import { edgesWith, handBuildRiver, insideRing, kernelFor, key, P, riverRing, runSite, segsMeet, smallSite, wayEdges, wayLine, waysWith, type Run } from './support.js';

type XY = { x: number; y: number };
const sidesOf = (ring: readonly XY[]): [XY, XY][] => ring.map((p, i) => [p, ring[(i + 1) % ring.length]]);

/** No way edge meets a ring's sides or lies inside it, but the spans (read from the arena's own rows). */
function waysDry(run: Run, rings: readonly (readonly XY[])[], spans: readonly [XY, XY][] = []): void {
  const isSpan = (a: XY, b: XY): boolean => spans.some(([u, v]) => (key(u) === key(a) && key(v) === key(b)) || (key(u) === key(b) && key(v) === key(a)));
  for (const e of edgesWith(run.plat, 'way')) {
    if (isSpan(e.a, e.b)) continue;
    const mid = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
    for (const ring of rings) {
      expect(insideRing(ring, mid), `way edge ${key(e.a)} → ${key(e.b)} in the water`).toBe(false);
      for (const [a, b] of sidesOf(ring)) {
        const touchesAtEnd = spans.some(([u, v]) => [u, v].some((d) => (key(d) === key(e.a) || key(d) === key(e.b)) && segsMeet(d, d, a, b)));
        if (!touchesAtEnd) expect(segsMeet(e.a, e.b, a, b), `way edge ${key(e.a)} → ${key(e.b)} meets the shore`).toBe(false);
      }
    }
  }
}

/** Every route part's points pairwise distinct, and every way one open path in the arena. */
function simpleEverywhere(run: Run): void {
  for (const r of run.s4.routes) {
    const keys = r.points.map((p) => key(p.at));
    expect(new Set(keys).size, `${r.id} revisits a point`).toBe(keys.length);
  }
  for (const [id, edges] of wayEdges(run.plat)) expect(() => wayLine(edges), id).not.toThrow();
}

// A river along the frame's west edge, 1 m inside it, 19 m wide: the lattice's west rim nodes beyond x = −980 m lie in
// it, so the westward through-road reaches the rim on its east bank and the stub to the frame would cross it.
const EDGE_RIVER = riverRing(-99_900, -98_000, -90_000, 90_000);

describe('a river at the frame edge where a through-road leaves (C-0250; integration g12 B-2)', { timeout: 120_000 }, () => {
  for (const seed of [1, 2]) {
    it(`seed ${String(seed)}: the through-road ends at its last dry lattice node, its frame end; no way meets the river`, () => {
      const run = runSite(smallSite(seed, { faces: [EDGE_RIVER], decks: [] }), { prepare: (k) => handBuildRiver(k, EDGE_RIVER, []), slice: { requestedBearingsCdeg: [9000] } });
      expect(run.s4.report.unserved).toEqual([]);
      expect(run.s4.routes).toHaveLength(2 * run.slice.gates.length);
      // The westward through-road: its end is its frame end, on the river's east bank, short of the frame.
      const west = run.s4.routes.filter((r) => r.part === 'outward').reduce((a, b) => (a.points[a.points.length - 1].at.x <= b.points[b.points.length - 1].at.x ? a : b));
      const end = west.points[west.points.length - 1];
      expect(end.pin).toBe('frame');
      expect(end.at.x).toBeGreaterThan(-98_000);
      expect(end.at.x).toBeLessThan(-95_000);
      expect(west.to.kind).toBe('bearing');
      // Its end is a lattice node (no stub was laid past it).
      const nodes = new Set(run.slice.lattice.points.map(key));
      expect(nodes.has(key(end.at))).toBe(true);
      // No route part, and no committed way edge, meets the river.
      const sides = waterSides([EDGE_RIVER]);
      for (const r of run.s4.routes) expect(partMeetsWater(r.points, r.spans, sides), r.id).toBe(false);
      waysDry(run, [EDGE_RIVER]);
      simpleEverywhere(run);
    });
  }
});

// A U-shaped river opening west: the gate route of the east gate runs from the gate through its held corridor into the
// pocket and crosses the U's east arm at `bridge:0`. With the through class's minimum radius at 100 km no approach can
// meet it, so F-ROUTE gives the site up for the pond's `bridge:1` (within the band), and the re-solve from the
// corridor's end has to leave the pocket westward — back past the held corridor, which it may not step into.
const U = [P(46_000, 20_000), P(36_000, 20_000), P(36_000, 4000), P(44_000, 4000), P(44_000, -4000), P(36_000, -4000), P(36_000, -20_000), P(46_000, -20_000)];
const POND = [P(40_000, 24_000), P(44_000, 24_000), P(44_000, 28_000), P(40_000, 28_000)];
const SITE = { id: 'bridge:0', a: P(44_000, 0), b: P(46_000, 0) };
const FAR = { id: 'bridge:1', a: P(40_000, 26_000), b: P(44_000, 26_000) };

describe("F-ROUTE's another_site re-solve never steps back into the held corridor (C-0250; integration g12 B-3)", { timeout: 120_000 }, () => {
  it('seed 1: the outward part keeps its corridor and the corridor end, never revisits them, and S4 commits every way as one path', () => {
    const site = smallSite(1, { faces: [U, POND], decks: [SITE, FAR] }, waysWith('through', 'minRadiusM', 100_000));
    const run = runSite(site, {
      prepare: (k) => {
        const a = handBuildRiver(k, U, [SITE], 'river:1');
        const b = handBuildRiver(k, POND, [FAR], 'river:2');
        return { bodies: [...a.bodies, ...b.bodies], bridges: [...a.bridges, ...b.bridges] };
      },
      slice: { requestedBearingsCdeg: [9000] },
    });
    // The shape: the east route's outward part gave its site up and was re-solved with no crossing.
    const east = run.slice.gates.reduce((a, b) => (a.at.x >= b.at.x ? a : b));
    const id = `gate:${String(east.ordinal)}/out`;
    expect(run.s4.report.rungs).toContainEqual({ route: id, rung: 'another_site', from: SITE.id, to: null, held: true });
    const r = run.slice.routes.find((q) => q.ordinal === east.ordinal);
    expect(r).toBeDefined();
    if (r === undefined) return;
    const gi = east.routeIndex;
    const outFrom = gi + 1 + WAY_SPAN_NODES;
    const corridor = r.nodes.slice(gi + 1, outFrom + 1).map((n) => key(run.slice.lattice.points[n]));
    // The given route crossed the U's east arm at the site: the pocket held the corridor's end.
    expect(insideRing(U, run.slice.lattice.points[r.nodes[outFrom]])).toBe(false);
    expect(run.slice.lattice.points[r.nodes[outFrom]].x).toBeGreaterThan(36_000);
    const out = run.s4.routes.find((q) => q.id === id);
    expect(out).toBeDefined();
    if (out === undefined) return;
    const pts = out.points.map((p) => key(p.at));
    // The gate, then the held corridor and its end in order, and none of them again.
    expect(pts.slice(1, corridor.length + 1)).toEqual(corridor);
    for (const c of corridor) expect(pts.indexOf(c)).toBe(pts.lastIndexOf(c));
    expect(run.s4.network.ways).toHaveLength(2 * run.slice.gates.length);
    simpleEverywhere(run);
    waysDry(run, [U, POND]);
    for (const b of run.s4.bridges) expect(b.state).toBe('site');
  });
});

/** The slice with an A → B → A spur inserted at `at` on the route of the gate of `ordinal` (B a free inside neighbour of A). */
function withSpur(slice: S3Slice, ordinal: number, at: number): S3Slice {
  const r = slice.routes.find((q) => q.ordinal === ordinal);
  if (r === undefined) throw new Error('no route');
  const a = r.nodes[at];
  const on = new Set(r.nodes);
  let b = -1;
  for (let d = 0; d < 6 && b === -1; d += 1) {
    const n = slice.lattice.adjacency[6 * a + d];
    if (n !== -1 && !on.has(n) && slice.levelSet.selected[n] === 1) b = n;
  }
  if (b === -1) throw new Error('no free neighbour');
  const nodes = [...r.nodes.slice(0, at + 1), b, a, ...r.nodes.slice(at + 1)];
  return {
    ...slice,
    routes: slice.routes.map((q) => (q.ordinal === ordinal ? { ...q, nodes } : q)),
    gates: slice.gates.map((g) => (g.ordinal === ordinal ? { ...g, routeIndex: g.routeIndex + 2 } : g)),
  };
}

describe('a gate route that revisits a node reaches the commit as a simple path (C-0250; integration g12 B-3, B-4)', { timeout: 120_000 }, () => {
  it('simpleCourse cuts each loop at its first repeated node, keeping both ends', () => {
    // A re-solve from the corridor's end that steps back: the corridor …, X, Y, the corridor's end O, then Y, X, then on.
    expect(simpleCourse([1, 2, 3, 4, 5, 4, 3, 6, 7])).toEqual([1, 2, 3, 6, 7]);
    // An A → B → A spur at the pick.
    expect(simpleCourse([1, 2, 3, 9, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(simpleCourse([1, 2, 1])).toEqual([1]);
    expect(simpleCourse([7, 8, 9, 8, 9, 10])).toEqual([7, 8, 9, 10]);
    expect(simpleCourse([1, 2, 3])).toEqual([1, 2, 3]);
    expect(simpleCourse([])).toEqual([]);
  });

  it('seed 1: a spur on the inward part is cut and S4 commits every way as one open path', () => {
    const site = smallSite(1);
    const slice = s3Slice(site);
    const { plat, k } = kernelFor(site);
    const c = commitS3Slice(slice, k);
    expect(c.ok).toBe(true);
    if (!c.ok) return;
    const g = slice.gates[0];
    const spurred = withSpur(slice, g.ordinal, 2);
    const r = runS4({ slice: spurred, commit: c.value, kernel: k });
    expect(r.ok, r.ok ? '' : r.detail).toBe(true);
    if (!r.ok) return;
    for (const part of r.value.routes) {
      const keys = part.points.map((p) => key(p.at));
      expect(new Set(keys).size, part.id).toBe(keys.length);
    }
    expect(r.value.network.ways).toHaveLength(2 * slice.gates.length);
    for (const [id, edges] of wayEdges(plat)) expect(() => wayLine(edges), id).not.toThrow();
  });
});

describe('the commit never lays a course across water off a deck (C-0250; integration g12 B-2)', () => {
  const pin = (i: number, n: number): Partial<RoutePoint> => (i === 0 ? { pin: 'attach', pinId: 'plaza:9' } : i === n - 1 ? { pin: 'gate', pinId: 'gate:9' } : {});

  it('a lattice course through a water face is refused (E_INVARIANT), and nothing is committed', () => {
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const xs = [0, 2500, 5000, 7500, 10_000, 12_500, 15_000];
    const route: S4Route = { id: 'gate:9/in', order: 0, part: 'inward', class: 'primary', points: xs.map((x, i) => ({ at: P(x, 0), ...pin(i, xs.length) })), spans: [], from: { kind: 'plaza', id: 'plaza:9' }, to: { kind: 'gate', id: 'gate:9' } };
    const pond = riverRing(6000, 9000, -3000, 3000);
    const r = commitRoutes([route], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500, water: [pond] });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail).toMatch(/meets the water off a deck/);
    }
    expect(edgesWith(plat, 'way')).toHaveLength(0);
    // The same course beside the pond commits.
    const site2 = smallSite(1);
    const k2 = kernelFor(site2);
    commitOuterRing(site2, k2.k);
    expect(commitRoutes([route], k2.k, { tables: tableView(), rung: 'CITY', spacingCm: 2500, water: [riverRing(6000, 9000, 1000, 4000)] }).ok).toBe(true);
  });

  it('a route over two decks makes one way per deck, each built bridge named by its own way (§2.4 Way.bridge)', () => {
    const site = smallSite(1);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const w1 = riverRing(10_000, 12_000, -5000, 5000);
    const w2 = riverRing(20_000, 22_000, -5000, 5000);
    const b1 = { id: 'bridge:1', a: P(10_000, 0), b: P(12_000, 0) };
    const b2 = { id: 'bridge:2', a: P(20_000, 0), b: P(22_000, 0) };
    const s1 = handBuildRiver(k, w1, [b1], 'river:1');
    const s2 = handBuildRiver(k, w2, [b2], 'river:2');
    const deck = (b: typeof b1, o: 0 | 1): RoutePoint => ({ at: o === 0 ? b.a : b.b, pin: 'deck_end', pinId: b.id, pinOrdinal: o });
    const points: RoutePoint[] = [
      { at: P(2500, 0), pin: 'gate', pinId: 'gate:9' },
      { at: P(5000, 0) },
      { at: P(7500, 0) },
      deck(b1, 0),
      deck(b1, 1),
      { at: P(14_500, 0) },
      { at: P(17_000, 0) },
      deck(b2, 0),
      deck(b2, 1),
      { at: P(24_500, 0) },
      { at: P(27_000, 0) },
      { at: P(29_500, 0), pin: 'frame' },
    ];
    const route: S4Route = { id: 'gate:9/out', order: 0, part: 'outward', class: 'through', points, spans: [{ at: 3, bridge: b1.id }, { at: 7, bridge: b2.id }], from: { kind: 'gate', id: 'gate:9' }, to: { kind: 'bearing', bearingCdeg: 9000 as Cdeg } };
    const r = commitRoutes([route], k, { tables: tableView(), rung: 'CITY', spacingCm: 2500, water: [w1, w2], bridges: [...s1.bridges, ...s2.bridges] });
    expect(r.ok, r.ok ? '' : r.detail).toBe(true);
    if (!r.ok) return;
    for (const b of [b1, b2]) {
      const built = r.value.bridges.find((x) => x.id === b.id);
      expect(built?.state).toBe('built');
      const way = r.value.network.ways.find((w) => w.id === built?.way);
      expect(way?.bridge).toBe(b.id);
    }
    const named = r.value.network.ways.map((w) => w.bridge).filter((x) => x !== undefined);
    expect(named.sort()).toEqual([b1.id, b2.id]);
    for (const [id, edges] of wayEdges(plat)) expect(() => wayLine(edges), id).not.toThrow();
  });
});
