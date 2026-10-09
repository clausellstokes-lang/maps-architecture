// M0-c-03: S4's router and F-ROUTE's M0 rungs (§5.2 F-ROUTE; §4.3 *The class grade limit*, *Decks*; C-0076, C-0085;
// readings C-0236 (2), (4)) on synthetic lattices: the slope rung relaxes a class on a synthetic impassable edge, then
// reports `unserved`; another crossing site within the search band when the nearest site's approach cannot meet the
// class radius (the next within the band taken), the extra-bridge rung listed `notBuilt(M1)`; route.nodes reached →
// `work_cut` with the count, then `unserved` (F-WORK). Session round S1 (Q24; N-54 (2), C-0289, C-0297): a deck with an end
// beyond the frame is no deck of S4's route graph (`deckOf` −1 on every edge, no route spans it; moved inside, it is
// spanned), and the deck given up is re-solved around whether or not another site stands in the band — the re-solve
// may take, as a new crossing, only a site within the band (a crossing the course already makes usably kept).
import { describe, expect, it } from 'vitest';
import { tableView } from '@plat/tables';
import { approachUsable, buildLattice, classGeometryCm, crossingsOf, insideTurningCircles, routeGraph, routeLadder, siteCosts, solve, type Lattice, type RouteClass, type RouteRung } from '../../src/index.js';
import { P, riverRing, smallSite } from './support.js';

const T = tableView();
const radius = (c: RouteClass): number => classGeometryCm(T, c).minRadiusCm;
const BAND = T.table('terrain').num('crossing', 'searchBandM') * 100;

function nearest(lattice: Lattice, p: { x: number; y: number }): number {
  let best = 0;
  let bd = Infinity;
  lattice.points.forEach((q, i) => {
    const d = (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return best;
}

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
    const from = nearest(lattice, P(-50000, 0));
    const to = nearest(lattice, P(50000, 0));
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
    const r = routeLadder(rg, [nearest(lattice, P(-50000, 0))], [nearest(lattice, P(50000, 0))], { class: 'through', gradeLimits: LIMITS, radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 });
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
    const r = routeLadder(rg, [nearest(lattice, P(-50000, 0))], [nearest(lattice, P(50000, 0))], { class: 'through', nodeLimit: 25, radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, work);
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([
      { route: 'test', rung: 'work_cut', count: 25, limit: 25, held: true },
      { route: 'test', rung: 'unserved', held: true, why: 'work_cut' },
    ]);
    expect(work.n).toBe(25);
    // One node more than the search needs: served.
    const s = solve(rg, [nearest(lattice, P(-50000, 0))], [nearest(lattice, P(50000, 0))], { class: 'through' });
    expect(s.ok).toBe(true);
    if (s.ok) expect(solve(rg, [nearest(lattice, P(-50000, 0))], [nearest(lattice, P(50000, 0))], { class: 'through', nodeLimit: s.charged + 1 }).ok).toBe(true);
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
    const from = nearest(lattice, P(20000, -15000));
    const to = nearest(lattice, P(80000, -15000));
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
    const from = nearest(lattice, P(20000, -40000));
    const to = nearest(lattice, P(80000, -40000));
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
    const from = nearest(lattice, P(20000, -15000));
    const to = nearest(lattice, P(80000, -15000));
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
    const from = nearest(lattice, P(-80000, -15000));
    const to = nearest(lattice, P(80000, -15000));
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
    const r = routeLadder(routeGraph(lattice), [nearest(lattice, P(20000, 0))], [nearest(lattice, P(80000, 0))], { class: 'through', radiusCm: radius, searchBandCm: BAND, route: 'test' }, rungs, { n: 0 });
    expect(r.ok && r.value === null).toBe(true);
    expect(rungs).toEqual([{ route: 'test', rung: 'unserved', held: true, why: 'no path' }]);
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
  const ends = (lattice: Lattice): { from: number; to: number } => ({ from: nearest(lattice, P(-20000, top - 5000)), to: nearest(lattice, P(20000, top - 5000)) });

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
