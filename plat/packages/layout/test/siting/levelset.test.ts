// The stage-1 level set (§4.2 S3 (6), §4.4 S5a; C-0017; M0-c-01): marching triangles over the lattice's triangle mesh
// at ½ with crossings at edge midpoints, then simplified and Chaikin-smoothed. The contour is closed and simple,
// encloses exactly the selected nodes, and its land equals the stage's share within one cell.
import { describe, expect, it } from 'vitest';
import { area2Of } from '../../src/siting/geom.js';
import { OUTLINE_CHAIKIN_PASSES, smoothOutline } from '../../src/siting/levelset.js';
import { fieldT, insideRing, levelSet, marchingRings, ringIsSimple, s3Slice, selectNodes, stageThreshold, type LevelSet } from '../../src/index.js';
import { P, SEEDS, sliceOf, smallSite } from './support.js';

/** Every node's side of `ring` against the selection: the count of nodes on the wrong side. */
function wrongSide(set: LevelSet, ring: readonly { x: number; y: number }[]): number {
  let bad = 0;
  const pts = set.field.lattice.points;
  for (let i = 0; i < pts.length; i += 1) if (insideRing(ring, pts[i]) !== (set.selected[i] === 1)) bad += 1;
  return bad;
}

describe('the stage-1 level set (C-0017)', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: one closed, simple, counter-clockwise contour enclosing exactly the selected nodes`, () => {
      const set = sliceOf(seed).levelSet;
      expect(set.rings).toBe(1);
      expect(set.contour.length).toBeGreaterThan(100);
      expect(ringIsSimple(set.contour)).toBe(true);
      expect(area2Of(set.contour)).toBeGreaterThan(0);
      expect(wrongSide(set, set.contour)).toBe(0);
      // The selection is the interior nodes with T ≤ t₁ (no pocket on the fixture).
      expect(set.filled).toBe(0);
      const { lattice, T } = set.field;
      for (let i = 0; i < T.length; i += 1) expect(set.selected[i]).toBe(lattice.interior[i] === 1 && T[i] <= set.t ? 1 : 0);
    });

    it(`seed ${String(seed)}: its land equals stage 1's share (137.5 ha) within one cell`, () => {
      const s = sliceOf(seed);
      expect(Math.abs(s.levelSet.landCm2 - 137.5e8)).toBeLessThanOrEqual(s.lattice.cellAreaCm2);
      expect(s.levelSet.landCm2).toBe(s.threshold.landCm2);
      // The contour's own area agrees with the cell count to within its boundary band (half a cell per crossing).
      const polygon = area2Of(s.levelSet.contour) * 0.5;
      expect(Math.abs(polygon - s.levelSet.landCm2)).toBeLessThan(0.05 * s.levelSet.landCm2);
    });

    it(`seed ${String(seed)}: each contour vertex is the midpoint of its crossed edge, inside node selected, outside not`, () => {
      const set = sliceOf(seed).levelSet;
      const pts = set.field.lattice.points;
      expect(set.contourEdges.length).toBe(set.contour.length);
      set.contour.forEach((p, k) => {
        const [u, v] = set.contourEdges[k];
        expect(set.selected[u]).toBe(1);
        expect(set.selected[v]).toBe(0);
        expect(Math.abs(p.x - (pts[u].x + pts[v].x) / 2)).toBeLessThanOrEqual(0.5);
        expect(Math.abs(p.y - (pts[u].y + pts[v].y) / 2)).toBeLessThanOrEqual(0.5);
      });
      // Every crossed lattice edge of the selection is on the contour exactly once.
      let crossed = 0;
      const { adjacency } = set.field.lattice;
      for (let i = 0; i < pts.length; i += 1) {
        if (set.selected[i] !== 1) continue;
        for (let d = 0; d < 6; d += 1) if (set.selected[adjacency[6 * i + d]] === 0) crossed += 1;
      }
      expect(set.contour.length).toBe(crossed);
    });

    it(`seed ${String(seed)}: the outline is simplified and smoothed, simple, keeps every node on its side and pins the gates`, () => {
      const s = sliceOf(seed);
      const set = s.levelSet;
      expect(set.smoothPasses).toBe(2);
      expect(ringIsSimple(set.outline)).toBe(true);
      expect(wrongSide(set, set.outline)).toBe(0);
      expect(set.outline).not.toEqual(set.contour);
      for (const g of s.gates) expect(set.outline.some((q) => q.x === g.at.x && q.y === g.at.y)).toBe(true);
    });
  }

  it('fills a pocket the selection encloses, so the boundary is one ring (C-XXXX (5))', () => {
    const s = sliceOf(1);
    const field = s.field;
    const t = s.threshold.t;
    // Raise one selected node well inside to above t₁: a pocket.
    const inner = s.routes[0].nodes[Math.floor(s.routes[0].pickAt / 2)];
    const T = Float64Array.from(field.T);
    T[inner] = t * 10;
    const holed = { ...field, T };
    const sel = selectNodes(holed, t);
    expect(sel.filled).toBe(1);
    expect(sel.selected[inner]).toBe(1);
    const set = levelSet(holed, t);
    expect(set.rings).toBe(1);
    // Without the fill the marching finds two rings (the pocket's own).
    const raw = new Uint8Array(sel.selected);
    raw[inner] = 0;
    expect(marchingRings(holed, raw).length).toBe(2);
  });

  it('caps t₁ at the reachable land and still closes inside the frame (§4.2 S3 (6) capped; EP-20)', () => {
    // A 1 km² frame (100 ha) cannot hold 137.5 ha: t₁ is the largest T over the land nodes, the shortfall reported.
    const site = smallSite(4, { frameAreaHa: 100, walledHa: 220 });
    const s = s3Slice(site, { requestedN: 3 });
    expect(s.threshold.capped).toBe(true);
    expect(s.threshold.shortfallCm2).toBeGreaterThan(0);
    expect(s.report.shortfallCm2).toBe(s.threshold.shortfallCm2);
    expect(s.threshold.landCm2 + s.threshold.shortfallCm2).toBeCloseTo(137.5e8, 0);
    const set = s.levelSet;
    expect(set.rings).toBe(1);
    expect(ringIsSimple(set.contour)).toBe(true);
    expect(wrongSide(set, set.contour)).toBe(0);
    // Every rim node lies outside; the contour stays strictly inside the frame.
    const f = s.lattice.frame;
    for (const p of set.contour) {
      expect(p.x).toBeGreaterThan(f.minX);
      expect(p.x).toBeLessThan(f.maxX);
      expect(p.y).toBeGreaterThan(f.minY);
      expect(p.y).toBeLessThan(f.maxY);
    }
    for (let i = 0; i < s.lattice.points.length; i += 1) if (s.lattice.rim[i] === 1) expect(set.selected[i]).toBe(0);
  });

  it('spans a river: the water the selection reaches from its banks is selected, never counted as land, and the boundary crosses the river (C-XXXX (8))', () => {
    const band = [P(10_000, -100_000), P(14_000, -100_000), P(14_000, 100_000), P(10_000, 100_000)];
    const water = { faces: [band], decks: [{ id: 'bridge:0', a: P(10_000, 0), b: P(14_000, 0) }] };
    const s = s3Slice(smallSite(21, { water }), { requestedN: 3 });
    const L = s.lattice;
    const set = s.levelSet;
    let wet = 0;
    let wetSelected = 0;
    for (let i = 0; i < L.points.length; i += 1) {
      expect(L.water[i]).toBe(insideRing(band, L.points[i], true) ? 1 : 0);
      wet += L.water[i];
      if (L.water[i] === 1 && set.selected[i] === 1) wetSelected += 1;
    }
    expect(wet).toBeGreaterThan(100);
    expect(wetSelected).toBeGreaterThan(5);
    expect(wetSelected).toBeLessThan(wet);
    // Land excludes the water: within one cell of stage 1's share.
    let land = 0;
    for (let i = 0; i < L.points.length; i += 1) if (set.selected[i] === 1 && L.water[i] === 0) land += 1;
    expect(set.landCm2).toBe(land * L.cellAreaCm2);
    expect(Math.abs(set.landCm2 - s.site.land.stagesHa[0] * 1e8)).toBeLessThanOrEqual(L.cellAreaCm2 / 2);
    // One closed, simple ring around land and the water between, crossing the river twice (its runs over the water).
    expect(set.rings).toBe(1);
    expect(ringIsSimple(set.contour)).toBe(true);
    expect(wrongSide(set, set.contour)).toBe(0);
    // Read the ring by bank, skipping its vertices over the water: it passes from one bank to the other twice.
    const banks = set.contour.filter((p) => p.x < 10_000 || p.x > 14_000).map((p) => (p.x < 10_000 ? 'W' : 'E'));
    let runs = 0;
    banks.forEach((b, k) => {
      if (b !== banks[(k + banks.length - 1) % banks.length]) runs += 1;
    });
    expect(set.contour.some((p) => insideRing(band, p))).toBe(true);
    expect(runs).toBe(2);
    // The water reached is reached from the banks within t₁: for each selected water node some selected bank node's T
    // plus the straight distance to it (a lower bound of the way across the water) is ≤ t₁.
    const banksNodes: number[] = [];
    for (let i = 0; i < L.points.length; i += 1) {
      if (L.water[i] === 1 || set.selected[i] !== 1) continue;
      for (let d = 0; d < 6; d += 1) {
        const j = L.adjacency[6 * i + d];
        if (j !== -1 && L.water[j] === 1) {
          banksNodes.push(i);
          break;
        }
      }
    }
    expect(banksNodes.length).toBeGreaterThan(0);
    for (let i = 0; i < L.points.length; i += 1) {
      if (L.water[i] !== 1 || set.selected[i] !== 1) continue;
      const p = L.points[i];
      const reach = Math.min(...banksNodes.map((j) => s.field.T[j] + Math.hypot(L.points[j].x - p.x, L.points[j].y - p.y)));
      expect(reach).toBeLessThanOrEqual(s.threshold.t + 1e-6);
    }
    // Every route crosses the river only along the deck (C-0076).
    for (const r of s.routes) {
      for (let k = 1; k < r.nodes.length; k += 1) {
        const a = L.points[r.nodes[k - 1]];
        const b = L.points[r.nodes[k]];
        if (L.water[r.nodes[k - 1]] === 1 || L.water[r.nodes[k]] === 1) {
          expect(Math.abs(a.y)).toBeLessThanOrEqual(L.spacingCm);
          expect(Math.abs(b.y)).toBeLessThanOrEqual(L.spacingCm);
        }
      }
    }
  });

  it('a larger t takes a superset of nodes (the stages nest)', () => {
    const s = sliceOf(7);
    const a = levelSet(s.field, s.threshold.t);
    const b = levelSet(s.field, stageThreshold(s.field, 220e8).t);
    for (let i = 0; i < a.selected.length; i += 1) if (a.selected[i] === 1) expect(b.selected[i]).toBe(1);
    expect(b.landCm2).toBeGreaterThan(a.landCm2);
  });

  it('the outline keeps every node on its side: a Chaikin pass that would cut a node off is not applied (C-XXXX (5))', () => {
    const square = [P(0, 0), P(10_000, 0), P(10_000, 10_000), P(0, 10_000)];
    const points = [P(5_000, 5_000), P(300, 300), P(20_000, 20_000)];
    // Only the centre and a far node guarded: both passes stand.
    const free = smoothOutline(square, [], points, { inside: new Set([0]), outside: new Set([2]) });
    expect(free.passes).toBe(OUTLINE_CHAIKIN_PASSES);
    expect(free.outline.length).toBe(16);
    // A node in the corner a pass would cut: no pass is applied, the ring stands.
    const cut = smoothOutline(square, [], points, { inside: new Set([0, 1]), outside: new Set([2]) });
    expect(cut.passes).toBe(0);
    expect(cut.outline).toEqual(square);
    // Pinning that corner keeps it, and the node with it: both passes stand again, the pin a vertex.
    const pinned = smoothOutline(square, [0], points, { inside: new Set([0, 1]), outside: new Set([2]) });
    expect(pinned.passes).toBe(OUTLINE_CHAIKIN_PASSES);
    expect(pinned.outline[0]).toEqual(P(0, 0));
    expect(insideRing(pinned.outline, points[1])).toBe(true);
    // An outside node a pass would swallow (beside a reflex corner) also stops it.
    const ell = [P(0, 0), P(10_000, 0), P(10_000, 5_000), P(5_000, 5_000), P(5_000, 10_000), P(0, 10_000)];
    const near = [P(2_000, 2_000), P(5_300, 5_300)];
    expect(smoothOutline(ell, [], near, { inside: new Set([0]), outside: new Set([1]) }).passes).toBe(0);
    expect(smoothOutline(ell, [], near, { inside: new Set([0]), outside: new Set() }).passes).toBe(OUTLINE_CHAIKIN_PASSES);
  });

  it('an empty selection gives no contour', () => {
    const s = sliceOf(1);
    const set = levelSet(fieldT(s.lattice, [], 1), -1);
    expect(set.contour).toEqual([]);
    expect(set.rings).toBe(0);
  });
});
