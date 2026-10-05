// §4.3's lattice and costs (§4.2 S3 (3); C-0076; M0-c-01): hexLattice at the lattice table's ≈ 25 m spacing and its
// jitter from the route stream; edge cost = length × (1 + k_slope · slope²) × penalties; water impassable except
// along a crossing site's deck segment; a reservation impassable inside and reached at its attach points.
import { CONCERNS, dijkstraTree, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { buildLattice, edgeCost, insideRing, siteCosts, type Costs, type Lattice, type WaterPlan } from '../../src/index.js';
import { distToSegment, segmentMeetsRing } from '../../src/siting/geom.js';
import { terrainSampler } from '@plat/site';
import { P, sliceOf, smallSite } from './support.js';

/** Every graph edge as [from, to, weight, length]. */
function edges(l: Lattice): [number, number, number, number][] {
  const out: [number, number, number, number][] = [];
  for (let u = 0; u < l.graph.n; u += 1) for (let e = l.graph.offsets[u]; e < l.graph.offsets[u + 1]; e += 1) out.push([u, l.graph.targets[e], l.graph.weights[e], l.length[e]]);
  return out;
}

describe('the lattice (§4.3, §3.4 hexLattice)', () => {
  const s = sliceOf(1);
  const L = s.lattice;

  it("takes the lattice table's spacing (25 m) and jitter (5 m), and its draws from the route stream", () => {
    expect(L.spacingCm).toBe(2500);
    expect(L.jitterCm).toBe(500);
    // The same site and the route stream give the same lattice; another stream another one.
    const site = s.site;
    const again = buildLattice(site, L.costs, site.stream(CONCERNS.route));
    expect(again.points).toEqual(L.points);
    const other = buildLattice(site, L.costs, site.stream(CONCERNS['gate.pick']));
    expect(other.points).not.toEqual(L.points);
  });

  it('covers the frame: every node inside it, about one per s² · √3 ÷ 2 of its area; the rim on its edge', () => {
    const f = L.frame;
    for (const p of L.points) {
      expect(p.x > f.minX && p.x < f.maxX && p.y > f.minY && p.y < f.maxY).toBe(true);
    }
    const expected = ((f.maxX - f.minX) * (f.maxY - f.minY)) / L.cellAreaCm2;
    expect(Math.abs(L.points.length - expected)).toBeLessThan(0.01 * expected);
    let rim = 0;
    for (let i = 0; i < L.points.length; i += 1) {
      expect(L.rim[i] + L.interior[i]).toBe(1);
      rim += L.rim[i];
      if (L.rim[i] === 1) {
        const p = L.points[i];
        expect(Math.min(p.x - f.minX, f.maxX - p.x, p.y - f.minY, f.maxY - p.y)).toBeLessThanOrEqual(L.rimInsetCm);
      }
    }
    expect(L.rimInsetCm).toBeLessThan(2 * L.spacingCm);
    expect(rim).toBeGreaterThan(4 * 180);
    expect(L.cellAreaCm2).toBeCloseTo(2500 * 2500 * Math.sqrt(3) / 2, 6);
  });

  it('on flat ground away from the plaza each edge costs its length; the graph is symmetric', () => {
    for (const [u, v, w, len] of edges(L)) {
      if (w === Infinity) continue;
      expect(w).toBe(len);
      // Symmetric: the reverse edge exists with the same weight.
      const back = L.slot[6 * v + L.adjacency.subarray(6 * v, 6 * v + 6).indexOf(u)];
      expect(L.graph.weights[back]).toBe(w);
    }
    expect(L.minCostPerCm).toBe(1);
  });

  it('the plaza is impassable inside and reached only at its attach nodes', () => {
    const ring = L.costs.reservations[0].ring;
    expect(L.reservedNodes.length).toBeGreaterThan(0);
    for (const i of L.reservedNodes) {
      expect(insideRing(ring, L.points[i])).toBe(true);
      for (let e = L.graph.offsets[i]; e < L.graph.offsets[i + 1]; e += 1) expect(L.graph.weights[e]).toBe(Infinity);
    }
    for (const [u, v, w] of edges(L)) {
      if (segmentMeetsRing(ring, L.points[u], L.points[v])) expect(w).toBe(Infinity);
      else expect(w).toBeLessThan(Infinity);
    }
    for (const i of L.attachNodes[0]) {
      expect(insideRing(ring, L.points[i], true)).toBe(false);
      expect(L.graph.weights[L.graph.offsets[i]] < Infinity || L.graph.weights[L.graph.offsets[i] + 1] < Infinity).toBe(true);
    }
  });
});

describe('the slope term (§4.3): length × (1 + k_slope · slope²), k_slope from ways.json', () => {
  const costs: Costs = { kSlope: 100, water: { faces: [], decks: [] }, reservations: [], deckPenalty: 1 };

  it('prices a 10 % grade at twice its length (k = 100) and is symmetric in the rise', () => {
    expect(edgeCost(costs, P(0, 0), P(1000, 0), 0, 100, 2500)).toBe(2000);
    expect(edgeCost(costs, P(0, 0), P(1000, 0), 100, 0, 2500)).toBe(2000);
    expect(edgeCost(costs, P(0, 0), P(0, 2000), 50, 50, 2500)).toBe(2000);
    expect(edgeCost({ ...costs, kSlope: 0 }, P(0, 0), P(1000, 0), 0, 100, 2500)).toBe(1000);
  });

  it("reads the site's k_slope cell and its terrain: on a tilted plane every edge costs len · (1 + 100 · (Δh ÷ len)²)", () => {
    const site = smallSite(2, { frameAreaHa: 25 });
    expect(siteCosts(site).kSlope).toBe(100);
    // Tilt the raster: 5 cm per metre eastward (a 5 % grade).
    const t = site.terrain;
    for (let j = 0; j < t.rows; j += 1) for (let i = 0; i < t.cols; i += 1) t.heightCm[j * t.cols + i] = Math.round(0.05 * (t.originX + (i + 0.5) * t.cellCm));
    const L = buildLattice(site, siteCosts(site));
    const sampler = terrainSampler(t, 250);
    let graded = 0;
    for (const [u, v, w, len] of edges(L)) {
      const a = L.points[u];
      const b = L.points[v];
      const rise = Math.abs(sampler.heightAt(b) - sampler.heightAt(a));
      expect(w).toBeCloseTo(len * (1 + 100 * (rise / len) * (rise / len)), 6);
      if (Math.abs(b.y - a.y) < 300) {
        // An east–west edge climbs about 5 %: about 1.25 × its length.
        expect(w / len).toBeGreaterThan(1.2);
        expect(w / len).toBeLessThan(1.3);
        graded += 1;
      }
    }
    expect(graded).toBeGreaterThan(50);
  });
});

/** A 1 km² site with a 40 m river band from south to north at x ∈ [−20, 20] m and one crossing site across it. */
function riverSite(deckPenalty: number): { L: Lattice; water: WaterPlan } {
  const band: LatticePoint[] = [P(-2000, -60_000), P(2000, -60_000), P(2000, 60_000), P(-2000, 60_000)];
  const deck = { id: 'bridge:0', a: P(-2000, 1000), b: P(2000, 1000) };
  const water: WaterPlan = { faces: [band], decks: [deck] };
  const site = smallSite(9, { frameAreaHa: 100, water });
  const L = buildLattice(site, { ...siteCosts(site), deckPenalty });
  return { L, water };
}

describe("the lattice's water rule (C-0076)", () => {
  it('an edge crossing a synthetic water face is impassable; an edge along the deck segment passes at the deck penalty', () => {
    for (const penalty of [1, 2.5]) {
      const { L, water } = riverSite(penalty);
      const deck = water.decks[0];
      let wetPassable = 0;
      let wetBlocked = 0;
      for (const [u, v, w, len] of edges(L)) {
        const a = L.points[u];
        const b = L.points[v];
        if (!segmentMeetsRing(water.faces[0], a, b)) {
          expect(w).toBe(len);
          continue;
        }
        const near = distToSegment(a, deck.a, deck.b) <= L.spacingCm && distToSegment(b, deck.a, deck.b) <= L.spacingCm;
        const along = Math.abs(b.y - a.y) <= Math.abs(b.x - a.x) * Math.tan(Math.PI / 6);
        if (near && along) {
          expect(w).toBeCloseTo(len * penalty, 9);
          wetPassable += 1;
        } else {
          expect(w).toBe(Infinity);
          wetBlocked += 1;
        }
      }
      expect(wetPassable).toBeGreaterThanOrEqual(2);
      expect(wetBlocked).toBeGreaterThan(100);
    }
  });

  it('a search from the west bank reaches the east bank only across the deck', () => {
    const { L, water } = riverSite(1);
    const west = L.points.findIndex((p, i) => L.interior[i] === 1 && p.x < -20_000 && Math.abs(p.y) < 2000);
    const tree = dijkstraTree(L.graph, west);
    let east = 0;
    for (let i = 0; i < L.points.length; i += 1) {
      if (L.points[i].x <= 2000 || !(tree.dist[i] < Infinity)) continue;
      east += 1;
      // Walk back to the west bank: the one wet step lies on the deck's line.
      for (let v = i; tree.prev[v] !== -1; v = tree.prev[v]) {
        const a = L.points[tree.prev[v]];
        const b = L.points[v];
        if (segmentMeetsRing(water.faces[0], a, b)) {
          expect(Math.abs(a.y - 1000)).toBeLessThanOrEqual(L.spacingCm);
          expect(Math.abs(b.y - 1000)).toBeLessThanOrEqual(L.spacingCm);
        }
      }
    }
    expect(east).toBeGreaterThan(100);
    // Without the deck the east bank is out of reach.
    const site = smallSite(9, { frameAreaHa: 100, water: { faces: water.faces, decks: [] } });
    const dry = buildLattice(site, siteCosts(site));
    const t2 = dijkstraTree(dry.graph, west);
    for (let i = 0; i < dry.points.length; i += 1) if (dry.points[i].x > 2000) expect(t2.dist[i]).toBe(Infinity);
  });
});
