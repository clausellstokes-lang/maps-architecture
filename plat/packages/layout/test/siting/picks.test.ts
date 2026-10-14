// Gate picks (§4.2 S3 (4); C-0032; M0-c-01): sequential nested picks from the `gate.pick` stream on the pick contour —
// a smaller N is a prefix of a larger one on the same contour and stream — scored by angular gap, requested bearing,
// terrain and a jitter.
import { CONCERNS, streamFromKey } from '@plat/kernel';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  angularGap,
  bearingCdeg,
  buildLattice,
  fieldT,
  gatePicks,
  gateRoutes,
  gatesOnBoundary,
  insideRing,
  levelSet,
  pickCandidates,
  plaza,
  plazaTree,
  s3Slice,
  siteCosts,
  stageA,
  stageThreshold,
  type LevelSet,
} from '../../src/index.js';
import { segmentMeetsRing } from '../../src/siting/geom.js';
import { inWater, meetsWater } from '../../src/siting/lattice.js';
import { resolveOffDecks } from '../../src/siting/routes.js';
import { P, sliceOf, smallSite } from './support.js';

/** The pick contour of a small site (a 30 ha walled area in a 4 km² frame). */
function pickContour(seed: number): LevelSet {
  const site = smallSite(seed);
  const p = plaza(site.centre, site.stream(CONCERNS['reserve.plaza']), { rung: 'TOWN' });
  const lattice = buildLattice(site, siteCosts(site, [{ id: 'plaza:0', ring: p.ring, attach: p.ring }]));
  const field = fieldT(lattice, [], 1);
  return levelSet(field, stageThreshold(field, site.land.stagesHa[0] * 1e8).t);
}

const CONTOUR = pickContour(3);

describe('nested picks (§4.2 S3 (4))', () => {
  it('a smaller N is a prefix of a larger one on the same contour and stream', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 0xffffffff }), { minLength: 4, maxLength: 4 }), fc.integer({ min: 0, max: 9 }), fc.integer({ min: 0, max: 9 }), (key, a, b) => {
        const small = Math.min(a, b);
        const large = Math.max(a, b);
        const ps = gatePicks(CONTOUR, small, streamFromKey(key));
        const pl = gatePicks(CONTOUR, large, streamFromKey(key));
        expect(ps.length).toBe(small);
        expect(pl.length).toBe(large);
        expect(pl.slice(0, small)).toEqual(ps);
      }),
      { numRuns: 60 },
    );
  });

  it("holds on the flat fixture's own pick contour: the 7 gates' picks extend the first 3", () => {
    const s = sliceOf(1);
    const three = gatePicks(s.pickSet, 3, s.site.stream(CONCERNS['gate.pick']), { centre: s.site.centre });
    expect(s.picks.slice(0, 3)).toEqual(three);
  });

  it('picks lie on the pick contour (inside ends of its crossed edges), distinct, with their ordinals in order', () => {
    const ps = gatePicks(CONTOUR, 8, streamFromKey([1, 2, 3, 4]));
    const cands = new Set(pickCandidates(CONTOUR));
    expect(new Set(ps.map((p) => p.node)).size).toBe(8);
    ps.forEach((p, i) => {
      expect(p.ordinal).toBe(i);
      expect(cands.has(p.node)).toBe(true);
      expect(CONTOUR.selected[p.node]).toBe(1);
      expect(p.ranked[0]).toBe(p.node);
      expect(p.ranked.length).toBe(4);
      expect(p.forced).toBe(false);
    });
  });

  it('spreads the picks: every later pick takes (near) the largest angular gap left, the jitter at most 900 cdeg', () => {
    const centre = { x: 0, y: 0 };
    const pts = CONTOUR.field.lattice.points;
    const cands = pickCandidates(CONTOUR);
    const bOf = (i: number): number => bearingCdeg(pts[i].x - centre.x, pts[i].y - centre.y);
    for (const key of [[1, 2, 3, 4], [9, 9, 9, 9], [0xdeadbeef, 7, 0, 1]]) {
      const ps = gatePicks(CONTOUR, 6, streamFromKey(key));
      for (let k = 1; k < ps.length; k += 1) {
        const gapOf = (i: number): number => Math.min(...ps.slice(0, k).map((p) => angularGap(bOf(i), bOf(p.node))));
        const best = Math.max(...cands.map(gapOf));
        // Score = gap ÷ 18 000 + 0.05 · u: the chosen gap is within 0.05 · 18 000 = 900 cdeg of the best.
        expect(gapOf(ps[k].node)).toBeGreaterThanOrEqual(best - 900);
      }
    }
  });

  it('draws one uniform per candidate per pick: the stream after k picks is advanced by exactly k × candidates', () => {
    const n = pickCandidates(CONTOUR).length;
    const s1 = streamFromKey([5, 6, 7, 8]);
    gatePicks(CONTOUR, 3, s1);
    const s2 = streamFromKey([5, 6, 7, 8]);
    for (let i = 0; i < 3 * n; i += 1) s2.float01();
    expect(s1.u32()).toBe(s2.u32());
  });

  it('a requested bearing pulls its pick toward it', () => {
    const pts = CONTOUR.field.lattice.points;
    for (const req of [0, 9_000, 18_000, 27_000]) {
      const [p] = gatePicks(CONTOUR, 1, streamFromKey([3, 1, 4, 1]), { requestedBearingsCdeg: [req] });
      expect(p.requestedBearingCdeg).toBe(req);
      expect(angularGap(bearingCdeg(pts[p.node].x, pts[p.node].y), req)).toBeLessThanOrEqual(1_800 + 1);
    }
  });

  it('N = 0 picks nothing; a non-integer N is refused', () => {
    expect(gatePicks(CONTOUR, 0, streamFromKey([1, 1, 1, 1]))).toEqual([]);
    expect(() => gatePicks(CONTOUR, 2.5, streamFromKey([1, 1, 1, 1]))).toThrow(RangeError);
  });
});

describe("§4.2 S3 (7)'s deck rule excludes a straddling deck edge in both directions (C-0365)", () => {
  it('a pick reached only across a deck that enters the selection from outside is unserved, never routed across it', () => {
    // The river at x 200–240 m with its deck at y 0; the selection is the land east of the river, so the deck's east
    // edges straddle it, entered from the water (unselected → selected). The plaza (west) reaches the east bank only so.
    const x0 = 20_000;
    const band = [P(x0, -100_000), P(x0 + 4_000, -100_000), P(x0 + 4_000, 100_000), P(x0, 100_000)];
    const water = { faces: [band], decks: [{ id: 'bridge:0', a: P(x0, 0), b: P(x0 + 4_000, 0) }] };
    const s = s3Slice(smallSite(25, { water }), { requestedN: 3 });
    const L = s.lattice;
    const selected = new Uint8Array(L.points.length);
    for (let i = 0; i < L.points.length; i += 1) if (L.points[i].x > x0 + 4_000 && L.water[i] === 0) selected[i] = 1;
    const east = L.points.findIndex((p, i) => L.interior[i] === 1 && p.x > x0 + 8_000 && Math.abs(p.y) < 3_000);
    expect(east).toBeGreaterThanOrEqual(0);
    const pick = { ordinal: 0, node: east, at: L.points[east], ranked: [east], forced: false };
    // Without the exclusion the east bank is reached across the deck; with it, nothing reaches it.
    expect(gateRoutes(plazaTree(L), [pick]).routes.length).toBe(1);
    const r = resolveOffDecks(L, pick, selected);
    expect(r.routes).toEqual([]);
    expect(r.unserved).toEqual([{ ordinal: 0, code: 'unserved', count: 0, limit: Infinity }]);
  });

  it('a gate on a deck edge whose point is dry stands as (5) solved it: the rule re-solves a gate standing in the water only', () => {
    // The river at x 250–290 m, its deck at y 50 m: seed 4's first route leaves the stage on the deck edge from the west
    // bank's last node into the water, its gate (247.02 m, 65.45 m) on land, west of the shore. NO-SHIFT: such a gate
    // was pinned by the trace before the rule, and stands (C-0365).
    const x0 = 25_000;
    const band = [P(x0, -100_000), P(x0 + 4_000, -100_000), P(x0 + 4_000, 100_000), P(x0, 100_000)];
    const water = { faces: [band], decks: [{ id: 'bridge:0', a: P(x0, 5_000), b: P(x0 + 4_000, 5_000) }] };
    const s = s3Slice(smallSite(4, { water }), { requestedN: 3 });
    const L = s.lattice;
    const solved = gateRoutes(plazaTree(L), s.picks, { nodeLimit: s.report.routeNodesLimit }).routes;
    expect(s.routes).toEqual(solved);
    const g = s.gates.find((q) => q.ordinal === 0);
    expect(g?.at).toEqual(P(24_702, 6_545));
    if (g === undefined) return;
    expect(meetsWater(L, L.points[g.edge[0]], L.points[g.edge[1]])).toBe(true);
    expect(inWater(L, g.at)).toBe(false);
    expect([L.water[g.edge[0]], L.water[g.edge[1]]]).toEqual([0, 1]);
    expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(fieldT(L, solved, stageA(s.site)).T.buffer))).toBe(true);
  });
});

describe('picks on a river site: land only (§4.2 S3 (4); C-0201 (8), C-0204)', () => {
  // A 40 m river band across the small site, its deck placed so the pick contour's selection reaches over the water.
  // Before C-0204 the inside ends of the contour's crossings over the water were candidates: a pick landed in the
  // river, the plaza tree never reached it, and the town got N − 1 gates (check M0-c-01 B-1, probes P5 and P7).
  // The second layout's stage spans the river along its deck: as (5) solves it, one route leaves the stage at the far
  // bridgehead, the midpoint of the deck's last water node and the east bank (C-0204 (2)) — a gate in the river, which
  // the trace refused (`gate … is not on the committed trace`, R-28). §4.2 S3 (7)'s deck rule re-solves that route off
  // the decks straddling the boundary, T and the boundary kept as (5) solved it (C-0365): every gate stands on ground.
  const layouts: readonly { seed: number; x0: number; deckY: number; bridgehead: boolean }[] = [
    { seed: 21, x0: 10_000, deckY: 20_000, bridgehead: false },
    { seed: 25, x0: 20_000, deckY: 0, bridgehead: true },
  ];
  for (const { seed, x0, deckY, bridgehead } of layouts) {
    it(`seed ${String(seed)}, river at x ${String(x0 / 100)}–${String(x0 / 100 + 40)} m, deck at y ${String(deckY / 100)} m: no pick or gate on water, every route served, N gates`, () => {
      const band = [P(x0, -100_000), P(x0 + 4_000, -100_000), P(x0 + 4_000, 100_000), P(x0, 100_000)];
      const water = { faces: [band], decks: [{ id: 'bridge:0', a: P(x0, deckY), b: P(x0 + 4_000, deckY) }] };
      const s = s3Slice(smallSite(seed, { water }), { requestedN: 3 });
      const L = s.lattice;
      const contour = s.pickSet;
      // The premise: the pick contour's selection reaches over the river, and the contour crosses edges out of water.
      let wetSelected = 0;
      for (let i = 0; i < L.points.length; i += 1) if (L.water[i] === 1 && contour.selected[i] === 1) wetSelected += 1;
      expect(wetSelected).toBeGreaterThan(0);
      expect(contour.contourEdges.some(([u]) => L.water[u] === 1)).toBe(true);
      // The candidates are exactly the land inside ends of the contour's crossings.
      const land = new Set<number>();
      for (const [u] of contour.contourEdges) if (L.interior[u] === 1 && L.water[u] === 0) land.add(u);
      expect(pickCandidates(contour)).toEqual([...land].sort((a, b) => a - b));
      // No pick, re-draw candidate or gate's inside node lies on water; every route is served; N gates.
      for (const p of s.picks) {
        expect(L.water[p.node]).toBe(0);
        for (const r of p.ranked) expect(L.water[r]).toBe(0);
      }
      // No gate on a deck edge on these layouts: neither end on water, the edge meeting no water face, the point dry.
      for (const g of s.gates) {
        const [u, v] = g.edge;
        expect(L.water[u] + L.water[v]).toBe(0);
        expect(meetsWater(L, L.points[u], L.points[v])).toBe(false);
        expect(insideRing(band, g.at, true)).toBe(false);
      }
      // The routes as (5) solves them: T is their field (not re-derived for a re-solved route), and the bridgehead
      // layout's (5) routes put one gate on a deck edge, its inside end on water along the deck.
      const solved = gateRoutes(plazaTree(L), s.picks, { nodeLimit: s.report.routeNodesLimit }).routes;
      const T5 = fieldT(L, solved, stageA(s.site));
      expect(Buffer.from(s.field.T.buffer).equals(Buffer.from(T5.T.buffer))).toBe(true);
      const gates5 = gatesOnBoundary(solved, s.threshold.t, s.levelSet);
      let heads = 0;
      for (const g of gates5) {
        if (g === null || !meetsWater(L, L.points[g.edge[0]], L.points[g.edge[1]])) continue;
        heads += 1;
        expect(inWater(L, g.at)).toBe(true);
        const [u, v] = g.edge;
        expect(L.water[u]).toBe(1);
        expect(L.water[v]).toBe(0);
        expect(Math.abs(L.points[u].y - deckY)).toBeLessThanOrEqual(L.spacingCm);
        expect(Math.abs(L.points[v].y - deckY)).toBeLessThanOrEqual(L.spacingCm);
      }
      expect(heads).toBe(bridgehead ? 1 : 0);
      // The re-solved route keeps its pick and is a different route from (5)'s exactly where a gate stood on the deck.
      expect(s.routes.map((r) => r.ordinal)).toEqual(solved.map((r) => r.ordinal));
      expect(s.routes.filter((r, i) => r.nodes.join() !== solved[i].nodes.join()).length).toBe(bridgehead ? 1 : 0);
      for (const r of s.routes) expect(r.nodes[r.pickAt]).toBe(s.picks.find((p) => p.ordinal === r.ordinal)?.node);
      // route.nodes (C-0085): the re-solve is charged as a route is — its blocked graph's tree settled plus its A* (the
      // blocked graph built here: every passable wet edge straddling the selection impassable).
      const tree = plazaTree(L);
      const first = gateRoutes(tree, s.picks, { nodeLimit: s.report.routeNodesLimit });
      let work = tree.settled + first.charged;
      const gr = L.graph;
      const cut = Float64Array.from(gr.weights);
      for (let u = 0; u < gr.n; u += 1) {
        for (let e = gr.offsets[u]; e < gr.offsets[u + 1]; e += 1) {
          const v = gr.targets[e];
          if (s.levelSet.selected[u] !== s.levelSet.selected[v] && cut[e] < Infinity && segmentMeetsRing(band, L.points[u], L.points[v])) cut[e] = Infinity;
        }
      }
      for (const g of gates5) {
        if (g === null || !meetsWater(L, L.points[g.edge[0]], L.points[g.edge[1]])) continue;
        const p = s.picks.find((q) => q.ordinal === g.ordinal);
        if (p === undefined) continue;
        const bt = plazaTree({ ...L, graph: { ...gr, weights: cut } });
        work += bt.settled + gateRoutes(bt, [p], { nodeLimit: s.report.routeNodesLimit }).charged;
      }
      expect(s.report.gateRungs).toEqual([]);
      expect(s.report.work['route.nodes']).toBe(work);
      expect(s.report.unserved).toEqual([]);
      expect(s.n).toBe(3);
      expect(s.gates.length).toBe(s.n);
      expect(s.report.gatesDropped).toBe(0);
    });
  }
});
