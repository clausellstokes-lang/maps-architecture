// Gates, routes and destinations (§4.2 S3 (5), (7), (13); §13.2 roads leaving = N; C-0032; M0-c-01): every gate lies
// on the level set and is the first point of its route at T = t₁; two routes never share a gate; the routes end at
// the plaza's attach points; the gate count is the law's.
import { astar } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { angularGap, bearingCdeg, flatFixture, gatesOnBoundary, gateRoutes, plazaTree, s3Slice, type S3Slice } from '../../src/index.js';
import { SEEDS, sliceOf, smallSite, vertexIndex } from './support.js';

function check(s: S3Slice): void {
  const set = s.levelSet;
  const pts = s.lattice.points;
  // The exit bar: the gate count by the law (no rung ran on the fixture).
  expect(s.report.gateRungs).toEqual([]);
  expect(s.report.unserved).toEqual([]);
  expect(s.gates.length).toBe(s.n);
  expect(s.routes.length).toBe(s.n);
  const seen = new Set<string>();
  s.gates.forEach((g, k) => {
    const r = s.routes[k];
    expect(g.ordinal).toBe(r.ordinal);
    // On the level set: a vertex of the contour (and of the outline, which pins it) — lattice equality.
    expect(vertexIndex(set.contour, g.at)).toBeGreaterThanOrEqual(0);
    expect(vertexIndex(set.outline, g.at)).toBeGreaterThanOrEqual(0);
    // The first point at T = t₁: every node before the gate edge is selected (T ≤ t₁), the next node is not.
    const [u, v] = g.edge;
    expect(r.nodes[g.routeIndex]).toBe(u);
    expect(r.nodes[g.routeIndex + 1]).toBe(v);
    for (let i = 0; i <= g.routeIndex; i += 1) expect(set.selected[r.nodes[i]]).toBe(1);
    expect(set.selected[v]).toBe(0);
    expect(s.field.T[u]).toBeLessThanOrEqual(s.threshold.t);
    expect(s.field.T[v]).toBeGreaterThan(s.threshold.t);
    // The edge's midpoint snapped (§3.2 (7): a half away from zero).
    const half = (v2: number): number => Math.sign(v2) * Math.round(Math.abs(v2));
    expect(g.at.x).toBe(half((pts[u].x + pts[v].x) / 2));
    expect(g.at.y).toBe(half((pts[u].y + pts[v].y) / 2));
    // Two routes never share a gate.
    const key = `${String(g.at.x)},${String(g.at.y)}`;
    expect(seen.has(key)).toBe(false);
    seen.add(key);
  });
}

describe('gates on the boundary (§4.2 S3 (7))', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: N gates, each on the level set at its route's first point at T = t₁, none shared`, () => {
      check(sliceOf(seed));
    });

    it(`seed ${String(seed)}: roads leaving the walled stage = N — each route leaves the selection once and never re-enters`, () => {
      const s = sliceOf(seed);
      let leaving = 0;
      for (const r of s.routes) {
        let out = 0;
        let back = 0;
        for (let k = 1; k < r.nodes.length; k += 1) {
          const a = s.levelSet.selected[r.nodes[k - 1]];
          const b = s.levelSet.selected[r.nodes[k]];
          if (a === 1 && b === 0) out += 1;
          if (a === 0 && b === 1) back += 1;
        }
        expect(out).toBe(1);
        expect(back).toBe(0);
        leaving += out;
      }
      expect(leaving).toBe(s.n);
    });
  }

  it('takes the first exit when a route leaves, re-enters and leaves again', () => {
    const s = sliceOf(1);
    const g = s.gates[0];
    const r = s.routes[0];
    const [u, v] = g.edge;
    // Another unselected neighbour of the gate's inside node: a second, later exit.
    let w = -1;
    for (let d = 0; d < 6; d += 1) {
      const x = s.lattice.adjacency[6 * u + d];
      if (x !== -1 && x !== v && s.levelSet.selected[x] === 0) w = x;
    }
    expect(w).not.toBe(-1);
    const nodes = [...r.nodes.slice(0, g.routeIndex + 2), u, w, ...r.nodes.slice(g.routeIndex + 2)];
    const [again] = gatesOnBoundary([{ ...r, nodes }], s.threshold.t, s.levelSet);
    expect(again?.edge).toEqual([u, v]);
    expect(again?.at).toEqual(g.at);
    // Starting with the second exit first gives that exit instead.
    const swapped = [...r.nodes.slice(0, g.routeIndex + 1), w, u, v];
    expect(gatesOnBoundary([{ ...r, nodes: swapped }], s.threshold.t, s.levelSet)[0]?.edge).toEqual([u, w]);
  });

  it('a requested bearing routes the pick to the frame at that bearing (§4.2 S3 (4), (5))', () => {
    const site = smallSite(13);
    const s = s3Slice(site, { requestedN: 2, requestedBearingsCdeg: [4_500, 22_500] });
    expect(s.routes.map((r) => r.bearingCdeg)).toEqual([4_500, 22_500]);
    for (const r of s.routes) {
      const end = s.lattice.points[r.nodes[r.nodes.length - 1]];
      expect(s.lattice.rim[r.nodes[r.nodes.length - 1]]).toBe(1);
      // The rim node lies on the bearing's ray from the pick, within a spacing or two of it.
      const p = s.lattice.points[r.nodes[r.pickAt]];
      expect(angularGap(bearingCdeg(end.x - p.x, end.y - p.y), r.bearingCdeg)).toBeLessThan(300);
    }
    expect(s.gateSites.map((g) => g.bearingCdeg)).toEqual([4_500, 22_500]);
  });

  it('gatesOnBoundary refuses a level set at another t, and gives null for a route that never leaves', () => {
    const s = sliceOf(1);
    expect(() => gatesOnBoundary(s.routes, s.threshold.t + 1, s.levelSet)).toThrow(RangeError);
    const inside = { ...s.routes[0], nodes: s.routes[0].nodes.slice(0, s.gates[0].routeIndex + 1) };
    expect(gatesOnBoundary([inside], s.threshold.t, s.levelSet)).toEqual([null]);
  });
});

describe('gate routes (§4.2 S3 (5))', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: each route starts at a plaza attach point (a plaza vertex) and its attach node`, () => {
      const s = sliceOf(seed);
      for (const r of s.routes) {
        expect(vertexIndex(s.plaza.ring, r.attach)).toBe(r.attachIndex);
        expect(r.nodes[0]).toBe(s.lattice.attachNodes[0][r.attachIndex]);
        // The attach node is the nearest passable node outside the plaza to its vertex: within one spacing.
        const p = s.lattice.points[r.nodes[0]];
        expect(Math.hypot(p.x - r.attach.x, p.y - r.attach.y)).toBeLessThan(s.lattice.spacingCm);
      }
    });

    it(`seed ${String(seed)}: the inward part is the plaza-rooted tree's path to the pick, the outward a least-cost path to the frame`, () => {
      const s = sliceOf(seed);
      const tree = plazaTree(s.lattice);
      const rim: number[] = [];
      for (let i = 0; i < s.lattice.points.length; i += 1) if (s.lattice.rim[i] === 1) rim.push(i);
      for (const r of s.routes) {
        const pick = s.picks.find((p) => p.ordinal === r.ordinal);
        expect(pick).toBeDefined();
        expect(r.nodes[r.pickAt]).toBe(pick?.node);
        // Inward: the tree path.
        for (let k = 1; k <= r.pickAt; k += 1) expect(tree.prev[r.nodes[k]]).toBe(r.nodes[k - 1]);
        // Outward: ends on the frame's rim, at the least cost any path from the pick to the rim has.
        const end = r.nodes[r.nodes.length - 1];
        expect(s.lattice.rim[end]).toBe(1);
        const best = astar(s.lattice.graph, r.nodes[r.pickAt], rim);
        expect(best.ok).toBe(true);
        if (best.ok) expect(r.cost - tree.dist[r.nodes[r.pickAt]]).toBeCloseTo(best.value.cost, 3);
        // The bearing is the direction from the pick to the rim node reached.
        const a = s.lattice.points[r.nodes[r.pickAt]];
        const b = s.lattice.points[end];
        expect(r.bearingCdeg).toBe(bearingCdeg(b.x - a.x, b.y - a.y));
        // Consecutive nodes are lattice neighbours over passable edges.
        for (let k = 1; k < r.nodes.length; k += 1) expect(s.lattice.adjacency.subarray(6 * r.nodes[k - 1], 6 * r.nodes[k - 1] + 6)).toContain(r.nodes[k]);
      }
    });
  }

  it("charges route.nodes: the tree's settled nodes plus each A*'s labelled nodes, under the law's limit", () => {
    const s = sliceOf(1);
    const tree = plazaTree(s.lattice);
    const solved = gateRoutes(tree, s.picks, { nodeLimit: s.report.routeNodesLimit });
    expect(s.report.work['route.nodes']).toBe(tree.settled + solved.charged);
    expect(solved.charged).toBe(solved.routes.reduce((a, r) => a + r.charged, 0));
    expect(tree.settled).toBe(s.lattice.points.length - s.lattice.reservedNodes.length);
    // The law: 4 096 + 8 per lattice node (workLimits.json's route.nodes row).
    expect(s.report.routeNodesLimit).toBe(4096 + 8 * s.lattice.points.length);
  });

  it("F-WORK (C-0085): a route whose search reaches route.nodes' limit takes F-ROUTE's unserved rung, reported work_cut with the count", () => {
    const s = sliceOf(1);
    const tree = plazaTree(s.lattice);
    const solved = gateRoutes(tree, s.picks, { nodeLimit: 50 });
    expect(solved.routes).toEqual([]);
    expect(solved.unserved.length).toBe(s.picks.length);
    for (const u of solved.unserved) {
      expect(u.code).toBe('work_cut');
      expect(u.count).toBe(50);
      expect(u.limit).toBe(50);
    }
    // A limit one above the largest route's own charge serves every route.
    const most = Math.max(...s.routes.map((r) => r.charged));
    expect(gateRoutes(tree, s.picks, { nodeLimit: most + 1 }).unserved).toEqual([]);
    expect(gateRoutes(tree, s.picks, { nodeLimit: most }).unserved.length).toBeGreaterThan(0);
  });
});

describe('destinations and gate sites (§4.2 S3 (13), C-0032)', () => {
  it('types the plaza attach points and each gate with its bearing', () => {
    const s = sliceOf(7);
    const attach = s.destinations.filter((d) => d.kind === 'plaza_attach');
    expect(attach.map((d) => d.at)).toEqual(s.plaza.ring);
    expect(attach.map((d) => d.id)).toEqual(s.plaza.ring.map((_, i) => `plaza:0/attach:${String(i)}`));
    const gates = s.destinations.filter((d) => d.kind === 'gate');
    expect(gates.length).toBe(s.n);
    gates.forEach((d, k) => {
      expect(d.at).toEqual(s.gates[k].at);
      expect(d.bearingCdeg).toBe(s.routes[k].bearingCdeg);
      expect(d.id).toBe(`gate:${String(s.gates[k].ordinal)}`);
    });
    expect(s.gateSites).toEqual(s.gates.map((g, k) => ({ ordinal: g.ordinal, at: g.at, bearingCdeg: s.routes[k].bearingCdeg, kind: 'main', forced: false })));
    for (const g of s.gateSites) {
      expect(g.bearingCdeg).toBeGreaterThanOrEqual(0);
      expect(g.bearingCdeg).toBeLessThan(36_000);
    }
  });

  it('is deterministic: the same seed gives the same slice, byte for byte', () => {
    const a = sliceOf(1);
    const b = s3Slice(flatFixture(1));
    expect(b.gates).toEqual(a.gates);
    expect(b.routes).toEqual(a.routes);
    expect(b.levelSet.outline).toEqual(a.levelSet.outline);
    expect(b.plaza).toEqual(a.plaza);
    expect(Buffer.from(b.field.T.buffer).equals(Buffer.from(a.field.T.buffer))).toBe(true);
    // Another seed draws another lattice, plaza and picks.
    expect(sliceOf(7).picks.map((p) => p.at)).not.toEqual(a.picks.map((p) => p.at));
  });
});
