// M0-c-03: water crossings in their basic form (C-0076; §4.3 *Decks*, §4.1's S4 row, §2.7 `Bridge`) — on a synthetic
// river hand-built on L0 with two crossing sites (each a `Bridge` in state `site`, its two `deck_end` vertices pinned
// on the banks): a gate route reaching a site passes along its deck, the way's span lies through the two deck ends,
// the Bridge becomes `built` with that way, and a site no route uses stays a site. A route that would cross the water
// away from a site is refused by the lattice.
import { describe, expect, it } from 'vitest';
import { buildLattice, routeGraph, siteCosts, solve } from '../../src/index.js';
import { edgesWith, handBuildRiver, incidentEdgeRows, insideRing, P, riverRing, runSite, smallSite, vertexRows, type Run } from './support.js';

const RIVER = riverRing(50000, 54000, -90000, 90000);
const SITE = { id: 'bridge:0', a: P(50000, 0), b: P(54000, 0) };
const FAR = { id: 'bridge:1', a: P(50000, 60000), b: P(54000, 60000) };

const CACHE = new Map<number, Run>();
function riverRun(seed: number): Run {
  let r = CACHE.get(seed);
  if (r === undefined) {
    r = runSite(smallSite(seed, { faces: [RIVER], decks: [SITE, FAR] }), { prepare: (k) => handBuildRiver(k, RIVER, [SITE, FAR]), slice: { requestedBearingsCdeg: [9000] } });
    CACHE.set(seed, r);
  }
  return r;
}

describe('a route through a crossing site lays the span and the Bridge becomes built (C-0076)', { timeout: 60_000 }, () => {
  for (const seed of [1, 2, 3]) {
    it(`seed ${String(seed)}: the span through the two deck_end vertices, the Bridge built, the far site still a site`, () => {
      const run = riverRun(seed);
      const built = run.s4.bridges.find((b) => b.id === SITE.id);
      expect(built?.state).toBe('built');
      const way = run.s4.network.ways.find((w) => w.id === built?.way);
      expect(way).toBeDefined();
      expect(way?.bridge).toBe(SITE.id);
      // The span: the way's L1 edge between the two deck ends, which still carry their deck_end rows.
      const span = edgesWith(run.plat, 'way', way?.id).filter((e) => (e.a.x === SITE.a.x && e.a.y === SITE.a.y && e.b.x === SITE.b.x && e.b.y === SITE.b.y) || (e.b.x === SITE.a.x && e.b.y === SITE.a.y && e.a.x === SITE.b.x && e.a.y === SITE.b.y));
      expect(span).toHaveLength(1);
      expect(vertexRows(run.plat, SITE.a).some((r) => r.role === 'deck_end' && r.entity === SITE.id && r.ordinal === 0)).toBe(true);
      expect(vertexRows(run.plat, SITE.b).some((r) => r.role === 'deck_end' && r.entity === SITE.id && r.ordinal === 1)).toBe(true);
      // Each deck end is a bridgehead junction.
      for (const end of [SITE.a, SITE.b]) {
        const j = vertexRows(run.plat, end).find((r) => r.role === 'junction');
        expect(run.s4.network.junctions.find((x) => x.id === j?.entity)?.kind).toBe('bridgehead');
      }
      // No way edge but the span lies over the water.
      for (const e of edgesWith(run.plat, 'way')) {
        const mid = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
        if (insideRing(RIVER, mid)) expect(span.map((s) => s.h)).toContain(e.h);
      }
      // The site no route uses stays a site: no way meets its deck ends.
      const far = run.s4.bridges.find((b) => b.id === FAR.id);
      expect(far?.state).toBe('site');
      expect(far?.way).toBeNull();
      for (const end of [FAR.a, FAR.b]) expect(incidentEdgeRows(run.plat, end).some((rs) => rs.some((r) => r.role === 'way'))).toBe(false);
      expect(run.s4.report.stretchShared).toBe(0);
    });
  }

  it("a route that would cross the water away from a site is refused by the lattice (M0-c-01's costs, C-0076)", () => {
    const site = smallSite(1, { faces: [RIVER], decks: [] });
    const lattice = buildLattice(site, siteCosts(site));
    const rg = routeGraph(lattice);
    const west = nearest(lattice.points, P(30000, 0));
    const east = nearest(lattice.points, P(70000, 0));
    // The river spans the frame but for two strips at its ends: the west–east route has to go round it.
    const s = solve(rg, [west], [east], { class: 'through' });
    expect(s.ok).toBe(true);
    if (s.ok) for (const v of s.nodes) expect(insideRing(RIVER, lattice.points[v])).toBe(false);
    // With the river spanning the whole frame, no route crosses at all.
    const wide = riverRing(50000, 54000, -120000, 120000);
    const site2 = smallSite(1, { faces: [wide], decks: [] });
    const lat2 = buildLattice(site2, siteCosts(site2));
    const s2 = solve(routeGraph(lat2), [nearest(lat2.points, P(30000, 0))], [nearest(lat2.points, P(70000, 0))], { class: 'through' });
    expect(s2.ok).toBe(false);
    if (!s2.ok) expect(s2.code).toBe('no_path');
    // With a site, the route crosses along its deck.
    const site3 = smallSite(1, { faces: [wide], decks: [SITE] });
    const lat3 = buildLattice(site3, siteCosts(site3));
    const rg3 = routeGraph(lat3);
    const s3 = solve(rg3, [nearest(lat3.points, P(30000, 0))], [nearest(lat3.points, P(70000, 0))], { class: 'through' });
    expect(s3.ok).toBe(true);
    if (s3.ok) {
      const wet = s3.nodes.filter((v) => insideRing(wide, lat3.points[v]));
      for (const v of wet) expect(Math.abs(lat3.points[v].y)).toBeLessThanOrEqual(lat3.spacingCm);
    }
  });
});

function nearest(points: readonly { x: number; y: number }[], p: { x: number; y: number }): number {
  let best = 0;
  let bd = Infinity;
  points.forEach((q, i) => {
    const d = (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  return best;
}
