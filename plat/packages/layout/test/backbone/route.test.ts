// M0-c-03: S4's router and F-ROUTE's M0 rungs (§5.2 F-ROUTE; §4.3 *The class grade limit*, *Decks*; C-0076, C-0085;
// readings C-0236 (2), (4)) on synthetic lattices: the slope rung relaxes a class on a synthetic impassable edge, then
// reports `unserved`; another crossing site within the search band when the nearest site's approach cannot meet the
// class radius (the next within the band taken), the extra-bridge rung listed `notBuilt(M1)`; route.nodes reached →
// `work_cut` with the count, then `unserved` (F-WORK). A deck with an end beyond the frame is no deck of S4's route graph
// (N-54 (2), C-0289: `deckOf` −1 on every edge, no route spans it; moved inside, it is spanned); the deck given up is
// re-solved around whether or not another site stands in the band, and the re-solve may take, as a new crossing, only a
// site within the band (C-0297; a crossing the course already makes usably is kept); only a passable edge across water
// carries a deck (C-0304: a dry edge along a deck, within one spacing of it and within 30° of its direction, answers
// `deckOf` −1).
import { describe, expect, it } from 'vitest';
import { approachUsable, buildLattice, classGeometryCm, crossingsOf, insideTurningCircles, routeGraph, routeLadder, siteCosts, solve, type Lattice, type RouteClass, type RouteRung } from '../../src/index.js';
import { distToSegment, segmentMeetsRing } from '../../src/siting/geom.js';
import { nearest, P, riverRing, smallSite, T } from './support.js';

const radius = (c: RouteClass): number => classGeometryCm(T, c).minRadiusCm;
const BAND = T.table('terrain').num('crossing', 'searchBandM') * 100;

/** A dry small site's lattice and a height step of `dh` cm at x = 0 across the whole frame (a synthetic cliff). */
function cliff(dh: number): { lattice: Lattice; heights: Float64Array } {
  const site = smallSite(1);
  const lattice = buildLattice(site, siteCosts(site));
  const heights = new Float64Array(lattice.points.length);
  lattice.points.forEach((p, i) => {
    heights[i] = p.x >= 0 ? dh : 0;
  });
  return { lattice, heights };
}

const LIMITS: Partial<Record<RouteClass, number>> = { through: 0.01, primary: 1, track: 1.5, path: 2 };

describe("F-ROUTE's slope and unserved rungs on a synthetic impassable edge (§5.2; C-0085)", () => {
  it('a 1 m step is too steep for through (0.01) but not for primary: the route relaxes one class', () => {
    const { lattice, heights } = cliff(100);
    const rg = routeGraph(lattice, heights);
    const from = nearest(lattice.points, P(-50000, 0));
    const to = nearest(lattice.points, P(50000, 0));
    // The cliff edges are impassable at through's limit, passable at primary's.
    expect(solve(rg, [from], [to], { class: 'through', gradeLimits: LIMITS }).ok).toBe(false);
    expect(solve(rg, [from], [to], { class: 'primary', gradeLimits: LIMITS }).ok).toBe(true);
    const rungs: RouteRung[] = [];
    const work = { n: 0 };
    const r = routeLadder(rg, [from], [to], { class: 'through', gradeLimits: LIMITS, radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, work);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error('no route');
    expect(r.value.class).toBe('primary');
    expect(rungs).toEqual([{ route: 'test', rung: 'slope', fromClass: 'through', toClass: 'primary', held: true }]);
    expect(work.n).toBeGreaterThan(0);
    // Without grade limits (the M0 default: V11's rows are M1's) the step is no edge at all.
    expect(solve(rg, [from], [to], { class: 'through' }).ok).toBe(true);
  });

  it('a 100 km step defeats every class: through → primary → track → path, then unserved', () => {
    const { lattice, heights } = cliff(10_000_000);
    const rg = routeGraph(lattice, heights);
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [nearest(lattice.points, P(-50000, 0))], [nearest(lattice.points, P(50000, 0))], { class: 'through', gradeLimits: LIMITS, radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBeNull();
    expect(rungs.map((x) => [x.rung, x.fromClass ?? null, x.toClass ?? null])).toEqual([
      ['slope', 'through', 'primary'],
      ['slope', 'primary', 'track'],
      ['slope', 'track', 'path'],
      ['unserved', null, null],
    ]);
  });

  it("route.nodes reached → F-ROUTE's unserved rung, reported work_cut with the count (F-WORK, C-0085)", () => {
    const { lattice } = cliff(0);
    const rg = routeGraph(lattice);
    const rungs: RouteRung[] = [];
    const work = { n: 0 };
    const r = routeLadder(rg, [nearest(lattice.points, P(-50000, 0))], [nearest(lattice.points, P(50000, 0))], { class: 'through', nodeLimit: 25, radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, work);
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([
      { route: 'test', rung: 'work_cut', count: 25, limit: 25, held: true },
      { route: 'test', rung: 'unserved', held: true, why: 'work_cut' },
    ]);
    expect(work.n).toBe(25);
    // One node more than the search needs: served.
    const s = solve(rg, [nearest(lattice.points, P(-50000, 0))], [nearest(lattice.points, P(50000, 0))], { class: 'through' });
    expect(s.ok).toBe(true);
    if (s.ok) expect(solve(rg, [nearest(lattice.points, P(-50000, 0))], [nearest(lattice.points, P(50000, 0))], { class: 'through', nodeLimit: s.charged + 1 }).ok).toBe(true);
  });
});

// A river across the whole frame with a tilted site near the straight line (its approach cannot meet through's 60 m
// radius) and a square site 150 m south (within the 300 m band); a second variant puts the square one 400 m away.
const WIDE = riverRing(50000, 54000, -120000, 120000);
const TILTED = { id: 'bridge:0', a: P(50000, 0), b: P(54000, 6000) };
const SQUARE = { id: 'bridge:1', a: P(50000, -15000), b: P(54000, -15000) };
const FAR = { id: 'bridge:2', a: P(50000, -40000), b: P(54000, -40000) };

function riverLattice(decks: (typeof TILTED)[]): Lattice {
  const site = smallSite(1, { faces: [WIDE], decks });
  return buildLattice(site, siteCosts(site));
}

describe("F-ROUTE's another crossing site within the band (§5.2; C-0085; C-0236 (4))", () => {
  it('the turning circles: a point inside either circle tangent at the deck end is out of reach', () => {
    const end = P(0, 0);
    const other = P(-1000, 0);
    // Heading +x from the end; radius 6 000: (6 000, 6 000) lies on the circle about (0, 6 000) — not strictly inside.
    expect(insideTurningCircles(end, other, { x: 6000, y: 6000 }, 6000)).toBe(false);
    expect(insideTurningCircles(end, other, { x: 3000, y: 3000 }, 6000)).toBe(true);
    expect(insideTurningCircles(end, other, { x: 3000, y: -3000 }, 6000)).toBe(true);
    expect(insideTurningCircles(end, other, { x: 6000, y: 0 }, 6000)).toBe(false);
  });

  it('the nearest site, whose approach cannot meet the radius, is given up for the next within the band', () => {
    const lattice = riverLattice([TILTED, SQUARE]);
    const rg = routeGraph(lattice);
    const from = nearest(lattice.points, P(20000, -15000));
    const to = nearest(lattice.points, P(80000, -15000));
    // The route as S3 might hand it: across the tilted site.
    const given = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([SQUARE.id]) });
    expect(given.ok).toBe(true);
    if (!given.ok) return;
    const cs = crossingsOf(rg, given.nodes);
    expect(cs.map((c) => c.deck.id)).toEqual([TILTED.id]);
    expect(approachUsable(rg, given.nodes, cs[0], radius('through'))).toBe(false);
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [from], [to], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 }, given.nodes);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error('unserved');
    expect(r.value.crossings.map((c) => c.deck.id)).toEqual([SQUARE.id]);
    expect(rungs).toEqual([{ route: 'test', rung: 'another_site', from: TILTED.id, to: SQUARE.id, held: true }]);
    // The square site's approach meets the radius; its route never wets a node off the deck.
    expect(approachUsable(rg, r.value.nodes, r.value.crossings[0], radius('through'))).toBe(true);
  });

  it('no other site within the band: the extra-bridge rung is listed notBuilt(M1), then unserved', () => {
    const lattice = riverLattice([TILTED, FAR]);
    const rg = routeGraph(lattice);
    // The ends on the far site's line: only the band keeps the route from taking it.
    const from = nearest(lattice.points, P(20000, -40000));
    const to = nearest(lattice.points, P(80000, -40000));
    const given = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([FAR.id]) });
    expect(given.ok).toBe(true);
    if (!given.ok) return;
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [from], [to], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 }, given.nodes);
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([
      { route: 'test', rung: 'another_site', from: TILTED.id, to: null, held: false, why: 'no other site in the band' },
      { route: 'test', rung: 'extra_bridge', held: false, why: 'notBuilt(M1)' },
      { route: 'test', rung: 'unserved', held: true, why: 'approach' },
    ]);
    // The far site itself is usable from there: it is the band, not its approach, that rules it out.
    const direct = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([TILTED.id]) });
    expect(direct.ok).toBe(true);
    if (direct.ok) {
      const cs = crossingsOf(rg, direct.nodes);
      expect(cs.map((c) => c.deck.id)).toEqual([FAR.id]);
      expect(approachUsable(rg, direct.nodes, cs[0], radius('through'))).toBe(true);
    }
  });

  it('no other site within the band, but a dry way round: the given-up site is re-solved around, served with no new crossing (Q24)', () => {
    // The river stops 300 m inside the frame's north edge; the far site (400 m off) lies beyond the band.
    const open = riverRing(50000, 54000, -120000, 70000);
    const site = smallSite(1, { faces: [open], decks: [TILTED, FAR] });
    const lattice = buildLattice(site, siteCosts(site));
    const rg = routeGraph(lattice);
    const from = nearest(lattice.points, P(20000, -15000));
    const to = nearest(lattice.points, P(80000, -15000));
    const given = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([FAR.id]) });
    expect(given.ok).toBe(true);
    if (!given.ok) return;
    expect(crossingsOf(rg, given.nodes).map((c) => c.deck.id)).toEqual([TILTED.id]);
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [from], [to], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 }, given.nodes);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error('unserved');
    // Round the river's north end: no crossing at all — the far site, beyond the band, is never taken.
    expect(r.value.crossings).toEqual([]);
    expect(r.value.nodes.some((n) => lattice.points[n].y > 70000)).toBe(true);
    expect(rungs).toEqual([{ route: 'test', rung: 'another_site', from: TILTED.id, to: null, held: true }]);
    // The far site is usable and nearer than the way round the river's end: only the band keeps the re-solve off it.
    const via = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([TILTED.id]) });
    expect(via.ok).toBe(true);
    if (via.ok) expect(crossingsOf(rg, via.nodes).map((c) => c.deck.id)).toEqual([FAR.id]);
  });

  it('a crossing the course already makes with a usable approach is kept, beyond the band (Q24)', () => {
    // A second river at x −520 m with a square site far beyond the tilted site's band; the course crosses both.
    const west = riverRing(-54000, -50000, -120000, 120000);
    const GOOD = { id: 'bridge:3', a: P(-54000, -15000), b: P(-50000, -15000) };
    const site = smallSite(1, { faces: [west, WIDE], decks: [GOOD, TILTED, SQUARE] });
    const lattice = buildLattice(site, siteCosts(site));
    const rg = routeGraph(lattice);
    const from = nearest(lattice.points, P(-80000, -15000));
    const to = nearest(lattice.points, P(80000, -15000));
    const given = solve(rg, [from], [to], { class: 'through', excludedDecks: new Set([SQUARE.id]) });
    expect(given.ok).toBe(true);
    if (!given.ok) return;
    expect(crossingsOf(rg, given.nodes).map((c) => c.deck.id)).toEqual([GOOD.id, TILTED.id]);
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [from], [to], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 }, given.nodes);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error('unserved');
    expect(r.value.crossings.map((c) => c.deck.id)).toEqual([GOOD.id, SQUARE.id]);
    expect(rungs).toEqual([{ route: 'test', rung: 'another_site', from: TILTED.id, to: SQUARE.id, held: true }]);
  });

  it('a route with no path across the water (no site at all) is unserved', () => {
    const lattice = riverLattice([]);
    const rungs: RouteRung[] = [];
    const r = routeLadder(routeGraph(lattice), [nearest(lattice.points, P(20000, 0))], [nearest(lattice.points, P(80000, 0))], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 });
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([{ route: 'test', rung: 'unserved', held: true, why: 'no path' }]);
  });
});

// The band rule's details (the hardening notes 14 – 16; §5.2 F-ROUTE "another crossing site on the reach within its
// search band", read per crossing, c-03 S3): each failing crossing is given up for a site within its own band; the
// band's edge is inclusive; it is measured between deck midpoints; after a failed band search the slope rung runs.
describe("F-ROUTE's band, read per crossing (C-0297, c-03 S3)", () => {
  const WEST = riverRing(-54000, -50000, -120000, 120000);
  const TILTED_W = { id: 'bridge:4', a: P(-54000, 4000), b: P(-50000, -2000) };
  const SQUARE_W = { id: 'bridge:5', a: P(-54000, -15000), b: P(-50000, -15000) };
  const mid = (d: typeof TILTED): { x: number; y: number } => ({ x: (d.a.x + d.b.x) / 2, y: (d.a.y + d.b.y) / 2 });
  const apart = (a: typeof TILTED, b: typeof TILTED): number => Math.hypot(mid(a).x - mid(b).x, mid(a).y - mid(b).y);
  const ladder = (lattice: Lattice, from: { x: number; y: number }, to: { x: number; y: number }, avoid: string[], extra: { gradeLimits?: Partial<Record<RouteClass, number>>; heights?: Float64Array } = {}): { given: number[]; rungs: RouteRung[]; r: ReturnType<typeof routeLadder>; rg: ReturnType<typeof routeGraph> } => {
    const rg = routeGraph(lattice, extra.heights);
    const f = nearest(lattice.points, from);
    const t = nearest(lattice.points, to);
    const g = solve(rg, [f], [t], { class: 'through', excludedDecks: new Set(avoid), ...(extra.gradeLimits === undefined ? {} : { gradeLimits: extra.gradeLimits }) });
    expect(g.ok).toBe(true);
    const given = g.ok ? g.nodes : [];
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [f], [t], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test', ...(extra.gradeLimits === undefined ? {} : { gradeLimits: extra.gradeLimits }) }, rungs, { n: 0 }, given);
    return { given, rungs, r, rg };
  };

  it("two rivers, both crossings failing their approach: each is given up for the usable site within its own band (note 14)", () => {
    const site = smallSite(1, { faces: [WEST, WIDE], decks: [TILTED_W, SQUARE_W, TILTED, SQUARE] });
    const lattice = buildLattice(site, siteCosts(site));
    // The second river's usable site lies within its own crossing's band and far beyond the first's.
    expect(apart(TILTED, SQUARE)).toBeLessThanOrEqual(BAND);
    expect(apart(TILTED_W, SQUARE)).toBeGreaterThan(BAND);
    expect(apart(TILTED_W, SQUARE_W)).toBeLessThanOrEqual(BAND);
    const { given, rungs, r, rg } = ladder(lattice, P(-80000, -15000), P(80000, -15000), [SQUARE_W.id, SQUARE.id]);
    const cs = crossingsOf(rg, given);
    expect(cs.map((c) => c.deck.id)).toEqual([TILTED_W.id, TILTED.id]);
    for (const c of cs) expect(approachUsable(rg, given, c, radius('through')), c.deck.id).toBe(false);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error(`unserved: ${JSON.stringify(rungs)}`);
    expect(r.value.crossings.map((c) => c.deck.id)).toEqual([SQUARE_W.id, SQUARE.id]);
    expect(rungs).toEqual([{ route: 'test', rung: 'another_site', from: TILTED_W.id, to: SQUARE_W.id, held: true }]);
  });

  it("the band's edge is inclusive: a site whose midpoint lies exactly the band from the given-up deck's is taken (note 15, Z11)", () => {
    const EDGE = { id: 'bridge:6', a: P(50000, 3000 - BAND), b: P(54000, 3000 - BAND) };
    expect(apart(TILTED, EDGE)).toBe(BAND);
    const site = smallSite(1, { faces: [WIDE], decks: [TILTED, EDGE] });
    const lattice = buildLattice(site, siteCosts(site));
    const { rungs, r } = ladder(lattice, P(20000, EDGE.a.y), P(80000, EDGE.a.y), [EDGE.id]);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error(`unserved: ${JSON.stringify(rungs)}`);
    expect(r.value.crossings.map((c) => c.deck.id)).toEqual([EDGE.id]);
    expect(rungs).toEqual([{ route: 'test', rung: 'another_site', from: TILTED.id, to: EDGE.id, held: true }]);
  });

  it("the band is measured between the decks' midpoints: a site whose midpoint is within it and whose end lies beyond is taken (note 15, Z16)", () => {
    const y = 3000 - 29950;
    const NEAR_EDGE = { id: 'bridge:6', a: P(50000, y), b: P(54000, y) };
    expect(apart(TILTED, NEAR_EDGE)).toBeLessThanOrEqual(BAND);
    expect(Math.hypot(NEAR_EDGE.a.x - mid(TILTED).x, NEAR_EDGE.a.y - mid(TILTED).y)).toBeGreaterThan(BAND);
    const site = smallSite(1, { faces: [WIDE], decks: [TILTED, NEAR_EDGE] });
    const lattice = buildLattice(site, siteCosts(site));
    const { rungs, r } = ladder(lattice, P(20000, y), P(80000, y), [NEAR_EDGE.id]);
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error(`unserved: ${JSON.stringify(rungs)}`);
    expect(r.value.crossings.map((c) => c.deck.id)).toEqual([NEAR_EDGE.id]);
  });

  it('after a failed band search the slope rung runs, and the given-up site is not reported again (note 16, Z17 and Z18)', () => {
    // The river stops 300 m inside the frame's north edge, and the ground north of its end stands 1 m higher: the way
    // round is too steep for through (0.01) but not for primary. The only other site lies beyond the band.
    const open = riverRing(50000, 54000, -120000, 70000);
    const site = smallSite(1, { faces: [open], decks: [TILTED, FAR] });
    const lattice = buildLattice(site, siteCosts(site));
    const heights = new Float64Array(lattice.points.length);
    lattice.points.forEach((p, i) => {
      heights[i] = p.y > 70000 ? 100 : 0;
    });
    expect(apart(TILTED, FAR)).toBeGreaterThan(BAND);
    const { rungs, r } = ladder(lattice, P(20000, -15000), P(80000, -15000), [FAR.id], { gradeLimits: LIMITS, heights });
    expect(r.ok).toBe(true);
    if (!r.ok || r.value === null) throw new Error(`unserved: ${JSON.stringify(rungs)}`);
    expect(r.value.class).toBe('primary');
    expect(r.value.crossings).toEqual([]);
    expect(rungs).toEqual([
      { route: 'test', rung: 'another_site', from: TILTED.id, to: null, held: false, why: 'no other site in the band' },
      { route: 'test', rung: 'extra_bridge', held: false, why: 'notBuilt(M1)' },
      { route: 'test', rung: 'slope', fromClass: 'through', toClass: 'primary', held: true },
    ]);
  });
});

// RouteGraph.deckOf with two decks less than one spacing apart and 45° to each other (N-c1b-2, N-c1c-2): each edge
// carrying a deck runs within 30° of that deck — the backbone's own cone names the deck an edge runs along, where the
// lattice's cone (a wet edge passable along some deck within 30°) does not say which.
describe('deckOf names the deck an edge runs along (N-c1b-2)', () => {
  it('two decks 10 m apart at their west ends, 45° to each other: every carried edge within 30° of its own deck', () => {
    const A = { id: 'bridge:7', a: P(50000, 0), b: P(54000, 0) };
    const B = { id: 'bridge:8', a: P(50000, 1000), b: P(54000, 5000) };
    const site = smallSite(1, { faces: [WIDE], decks: [A, B] });
    const lattice = buildLattice(site, siteCosts(site));
    const rg = routeGraph(lattice);
    expect(rg.decks.map((d) => d.id)).toEqual([A.id, B.id]);
    const g = lattice.graph;
    const per = [0, 0];
    for (let u = 0; u < g.n; u += 1) {
      for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
        const d = rg.deckOf[e];
        if (d === -1) continue;
        per[d] += 1;
        const deck = rg.decks[d];
        const p = lattice.points[u];
        const q = lattice.points[g.targets[e]];
        const dot = Math.abs((q.x - p.x) * (deck.b.x - deck.a.x) + (q.y - p.y) * (deck.b.y - deck.a.y));
        expect(dot >= (Math.sqrt(3) / 2) * Math.hypot(q.x - p.x, q.y - p.y) * Math.hypot(deck.b.x - deck.a.x, deck.b.y - deck.a.y), `edge ${String(u)}→${String(g.targets[e])} on ${deck.id}`).toBe(true);
      }
    }
    expect(per[0]).toBeGreaterThanOrEqual(2);
    expect(per[1]).toBeGreaterThanOrEqual(2);
  });
});

// N-54 (2), C-0289: the lattice reads only the decks whose two ends lie inside the frame, so S4's route graph holds no
// deck with an end beyond it — `deckOf` answers −1 on every edge and no route spans it; the same deck moved 1 m inside
// is spanned (the control). A 40 m river across the whole frame, north to south; the deck slants across it near the
// frame's north edge, its east end `dy` cm north of the frame line.
describe("a deck with an end beyond the frame is no deck of S4's route graph (N-54 (2), C-0289; Q24)", () => {
  const band = riverRing(-2000, 2000, -120000, 120000);
  const top = smallSite(1).frameRing.reduce((m, q) => Math.max(m, q.y), -Infinity);
  const deckAt = (dy: number): (typeof TILTED) => ({ id: 'bridge:0', a: P(-2000, top + dy - 1200), b: P(2000, top + dy) });
  const graphWith = (deck: typeof TILTED): { lattice: Lattice; rg: ReturnType<typeof routeGraph> } => {
    const site = smallSite(1, { faces: [band], decks: [deck] });
    const lattice = buildLattice(site, siteCosts(site));
    return { lattice, rg: routeGraph(lattice) };
  };
  const ends = (lattice: Lattice): { from: number; to: number } => ({ from: nearest(lattice.points, P(-20000, top - 5000)), to: nearest(lattice.points, P(20000, top - 5000)) });

  it('one end 1 m beyond the frame: deckOf answers −1 on every edge, the graph holds no deck, and no route spans it', () => {
    const { lattice, rg } = graphWith(deckAt(100));
    expect(rg.decks).toEqual([]);
    expect(rg.deckOf.every((d) => d === -1)).toBe(true);
    const { from, to } = ends(lattice);
    expect(solve(rg, [from], [to], { class: 'path' }).ok).toBe(false);
    const rungs: RouteRung[] = [];
    const r = routeLadder(rg, [from], [to], { class: 'path', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 });
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([{ route: 'test', rung: 'unserved', held: true, why: 'no path' }]);
  });

  it('the same deck moved 1 m inside the frame: deckOf holds it, and the route spans it (the control)', () => {
    const deck = deckAt(-100);
    const { lattice, rg } = graphWith(deck);
    expect(rg.decks).toEqual([deck]);
    expect(rg.deckOf.filter((d) => d === 0).length).toBeGreaterThanOrEqual(2);
    const { from, to } = ends(lattice);
    const s = solve(rg, [from], [to], { class: 'path' });
    expect(s.ok).toBe(true);
    if (s.ok) expect(crossingsOf(rg, s.nodes).map((c) => c.deck.id)).toEqual([deck.id]);
  });
});

// RouteGraph.deckOf's contract (C-0304): "the index of the deck a passable edge ACROSS WATER runs along, else −1". A 10 m
// river from the frame's south edge that ends 10 m north of a short square deck (its ends on the two shores): the
// lattice's edges along the deck (both ends within one spacing of it, within 30° of its direction) south of the river's
// end cross the water and carry the deck; those north of it run on dry ground beside the deck and must answer −1 — a
// dry approach edge folded into the crossing would shorten the committed course (seed 3418200249's `gate:0/out`,
// pinned in frame.test.ts).
describe('only a passable edge across water carries a deck (RouteGraph.deckOf; B-2)', () => {
  const DECK = { id: 'bridge:0', a: P(-500, 0), b: P(500, 0) };
  const site = smallSite(1, { faces: [riverRing(-500, 500, -120000, 1000)], decks: [DECK] });
  const lattice = buildLattice(site, siteCosts(site));
  const rg = routeGraph(lattice);
  const g = lattice.graph;
  const s = lattice.spacingCm;
  const wetEdge = (p: { x: number; y: number }, q: { x: number; y: number }): boolean => lattice.costs.water.faces.some((f) => segmentMeetsRing(f, p, q));

  it('every edge that carries the deck meets a water face', () => {
    expect(rg.decks).toEqual([DECK]);
    let carried = 0;
    for (let u = 0; u < g.n; u += 1) {
      for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
        if (rg.deckOf[e] === -1) continue;
        carried += 1;
        expect(rg.deckOf[e]).toBe(0);
        const p = lattice.points[u];
        const q = lattice.points[g.targets[e]];
        expect(wetEdge(p, q), `edge ${String(u)}→${String(g.targets[e])}`).toBe(true);
        // … and runs along it: within 30° of its direction (cos 30° = √3 ÷ 2, written here).
        const dot = Math.abs((q.x - p.x) * (DECK.b.x - DECK.a.x) + (q.y - p.y) * (DECK.b.y - DECK.a.y));
        expect(dot >= (Math.sqrt(3) / 2) * Math.hypot(q.x - p.x, q.y - p.y) * Math.hypot(DECK.b.x - DECK.a.x, DECK.b.y - DECK.a.y), `edge ${String(u)}→${String(g.targets[e])} within 30°`).toBe(true);
      }
    }
    expect(carried).toBeGreaterThanOrEqual(2);
  });

  it('along the deck, the wet edges carry it and the dry ones beside it answer −1', () => {
    const dx = DECK.b.x - DECK.a.x;
    const dy = DECK.b.y - DECK.a.y;
    const along: { wet: boolean; deck: number; y: number }[] = [];
    for (let u = 0; u < g.n; u += 1) {
      for (let e = g.offsets[u]; e < g.offsets[u + 1]; e += 1) {
        if (!(g.weights[e] < Infinity)) continue;
        const p = lattice.points[u];
        const q = lattice.points[g.targets[e]];
        if (distToSegment(p, DECK.a, DECK.b) > s || distToSegment(q, DECK.a, DECK.b) > s) continue;
        const ex = q.x - p.x;
        const ey = q.y - p.y;
        if (Math.abs(ex * dx + ey * dy) < 0.9 * Math.sqrt(ex * ex + ey * ey) * Math.sqrt(dx * dx + dy * dy)) continue;
        along.push({ wet: wetEdge(p, q), deck: rg.deckOf[e], y: Math.min(p.y, q.y) });
      }
    }
    const wet = along.filter((a) => a.wet);
    const dry = along.filter((a) => !a.wet);
    // Both kinds stand in the fixture: wet edges across the river, dry edges north of its end.
    expect(wet.length).toBeGreaterThanOrEqual(2);
    expect(dry.length).toBeGreaterThanOrEqual(2);
    for (const a of dry) expect(a.y).toBeGreaterThan(1000);
    expect(wet.map((a) => a.deck)).toEqual(wet.map(() => 0));
    expect(dry.map((a) => a.deck)).toEqual(dry.map(() => -1));
  });
});
