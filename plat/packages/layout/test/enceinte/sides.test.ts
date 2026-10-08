// M0-c-02 session round s1 (N-54 (1) Q5): the trace's SIDES against the water and the reservations — the pull, the
// smoothing, F-WALL's verdict and the final proof tested only vertices, so a vertex pulled across a river onto the far
// bank's land committed bare wall chords over the water (relief-60 CITY seed 9, stage 2: boundary vertex 124 pulled
// 29.8 m onto the far bank; two bare chords 11 m deep). The property, per committed wall edge: it lies over water ⇔ it
// is a water gate's course edge (`wall_gate`). Water is measured here independently (sampled every 25 cm, wet when
// strictly inside the ring and more than 2 cm from its line).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import type { GateSite } from '@plat/model';
import { commitOuterRing, outwardNormals, PULL_STEPS, pullAndPin, rungVerdict, siteContext, smoothPinned, traceBase, WET_TOL_CM, wetSides } from '../../src/index.js';
import { densify, edgesWith, handBuildWater, insideRing, kernelFor, P, ringDist, riverCommitted, smallSite, type EdgeInfo } from './support.js';

type Pt = { x: number; y: number };

/** The deepest point of segment ab inside the ring (cm; 0 when none lies inside), sampled every `step` cm. */
function depthOf(a: Pt, b: Pt, ring: readonly Pt[], step = 25): number {
  // Far from the ring's line by more than half the segment: the whole segment is on one side of it.
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dm = ringDist(mid, ring);
  if (dm > len / 2 + 10) return insideRing(ring, mid) ? dm : 0;
  const n = Math.max(2, Math.ceil(len / step));
  let worst = 0;
  for (let s = 1; s < n; s += 1) {
    const q = { x: a.x + ((b.x - a.x) * s) / n, y: a.y + ((b.y - a.y) * s) / n };
    if (insideRing(ring, q)) worst = Math.max(worst, ringDist(q, ring));
  }
  return worst;
}

/** The wall's committed edges with their depth in the water. */
function wallDepths(plat: Parameters<typeof edgesWith>[0], entity: string, ring: readonly Pt[]): { e: EdgeInfo; depth: number; gated: boolean }[] {
  return edgesWith(plat, 'wall', entity).map((e) => ({ e, depth: depthOf(e.a, e.b, ring), gated: e.rows.some((r) => r.role === 'wall_gate') }));
}

describe('the side test (wet.ts): a side lies over a ring when a point of it lies inside deeper than 2 cm', () => {
  const lake = [P(10000, -50000), P(60000, -50000), P(60000, 50000), P(10000, 50000)];
  const w = wetSides([lake], 1, [[P(10000, 0), P(60000, 1000)]]);

  it('a side across the water, a side wholly in it far from its shore and a land-to-land side across a narrow channel lie over it', () => {
    expect(WET_TOL_CM).toBe(2);
    expect(w.over(P(0, 0), P(20000, 3000))).toBe(true);
    expect(w.over(P(30000, -1000), P(30500, 1000))).toBe(true);
    const channel = [P(0, -100000), P(2200, -100000), P(2200, 100000), P(0, 100000)];
    const c = wetSides([channel], 1);
    expect(c.over(P(-1000, 0), P(3200, 500))).toBe(true);
    expect(c.over(P(-1000, 0), P(-1000, 5000))).toBe(false);
  });

  it('a side along the shore, touching it at a vertex, or leaving a bank point a centimetre inside it lies over nothing', () => {
    expect(w.over(P(10000, -50000), P(10000, 50000))).toBe(false);
    expect(w.over(P(10000, -3000), P(10000, 3000))).toBe(false);
    expect(w.over(P(0, 0), P(10000, 50000))).toBe(false);
    expect(w.over(P(10001, 0), P(0, 2000))).toBe(false);
    // 3 cm deep along 10 m: over (the tolerance is 2 cm).
    expect(w.over(P(10003, -500), P(10003, 500))).toBe(true);
    expect(w.over(P(10001, -500), P(10001, 500))).toBe(false);
  });

  it('a water gate\'s course side may lie over the water (either way), never over a reservation', () => {
    expect(w.over(P(10000, 0), P(60000, 1000))).toBe(false);
    expect(w.over(P(60000, 1000), P(10000, 0))).toBe(false);
    expect(w.course(P(10000, 0), P(60000, 1000))).toBe(true);
    const plaza = [P(20000, -1000), P(22000, -1000), P(22000, 3000), P(20000, 3000)];
    const both = wetSides([lake, plaza], 1, [[P(10000, 0), P(60000, 1000)]]);
    expect(both.over(P(10000, 0), P(60000, 1000))).toBe(true);
    expect(both.firstOver([P(0, 0), P(10000, 0), P(60000, 1000), P(0, 5000)])).toBe(1);
    expect(w.firstOver([P(0, 0), P(10000, 0), P(60000, 1000), P(0, 5000)])).toBe(2);
  });
});

describe('the pull bars a step whose side lies over a barred ring (N-54 (1))', () => {
  // A 600 m square town (a vertex every 50 m, so the pull's slope lets a vertex step across the river); a 22 m river
  // 10 m east of its east side, the length of the map; standing farther out costs less.
  const ring = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]], 5000);
  const river = [P(31000, -200000), P(33200, -200000), P(33200, 200000), P(31000, 200000)];
  const outward = (p: Pt): number => -Math.hypot(p.x, p.y) / 100;

  it('the east side no longer jumps the river onto the far bank: every pulled side dry, the near bank taken', () => {
    const free = new Uint8Array(ring.length);
    const wet = wetSides([river], 1);
    const r = pullAndPin(ring, free, outward, 4000, [river], wet);
    expect(wet.firstOver(r.line)).toBe(-1);
    for (let i = 0; i < ring.length; i += 1) expect(depthOf(r.line[i], r.line[(i + 1) % ring.length], river)).toBe(0);
    // No vertex beyond the river; the east side pulled as far as its near bank allows (two steps of 4.97 m).
    expect(r.line.some((q) => q.x > 33200)).toBe(false);
    const east = ring.map((q, i) => ({ q, i })).filter(({ q }) => q.x === 30000 && Math.abs(q.y) < 30000);
    for (const { i } of east) expect(r.offsetsCm[i]).toBeCloseTo((2 * (4000 - 26)) / PULL_STEPS, 6);
    // The vertex-only bar of before: the same pull with the side test off sends the east side across the water.
    const before = pullAndPin(ring, free, outward, 4000, [river], wetSides([], 0));
    expect(before.line.filter((q) => q.x > 33200).length).toBeGreaterThan(5);
    expect(wet.firstOver(before.line)).toBeGreaterThanOrEqual(0);
  });

  it('the step that closes the cycle onto its first pin is tested too: no vertex beside a lake\'s end closes onto the pin across the water', () => {
    // A lake 10 m east of the town's east side from y −200 m to 20 m; the east side's vertex at y 50 m pinned and first
    // (the cycle opens there): below the lake's end the east side may step onto the far side of the lake (dry), and the
    // vertex before the pin would close onto it across the water.
    const lake = [P(31000, -20000), P(33200, -20000), P(33200, 2000), P(31000, 2000)];
    const at = ring.findIndex((q) => q.x === 30000 && q.y === 5000);
    const rot = [...ring.slice(at), ...ring.slice(0, at)];
    const pins = new Uint8Array(rot.length);
    pins[0] = 1;
    const wet = wetSides([lake], 1);
    const r = pullAndPin(rot, pins, outward, 4000, [lake], wet);
    expect(r.line[0]).toEqual({ x: 30000, y: 5000 });
    expect(wet.firstOver(r.line)).toBe(-1);
    // Below the lake's end the east side still takes the far ground: the pull is barred only where a side would wet.
    expect(r.line.some((q) => q.x > 33200)).toBe(true);
  });

  it('with no barred ring near, the pull is the one it was (the side test only bars)', () => {
    const r = pullAndPin(ring, new Uint8Array(ring.length), outward, 4000, []);
    expect(r.maxOffsetCm).toBeCloseTo(4000 - 26, 9);
    expect(r.offsetsCm.every((s) => Math.abs(s - (4000 - 26)) < 1e-9)).toBe(true);
    const normals = outwardNormals(ring);
    ring.forEach((q, i) => expect(r.line[i].x).toBeCloseTo(q.x + r.offsetsCm[i] * normals[i].x, 6));
  });
});

describe('the smoothing puts back the moved ends of a side it would lay over a barred ring (N-54 (1))', () => {
  // A 600 m square densified every 10 m: one pass moves the south-west corner 2.5 m in along the diagonal; a 50 cm
  // box on its new side to the east (no vertex in it, before or after) is crossed by that side.
  const sq: Pt[] = [];
  for (let i = 0; i < 60; i += 1) sq.push({ x: -30000 + i * 1000, y: -30000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: 30000, y: -30000 + i * 1000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: 30000 - i * 1000, y: 30000 });
  for (let i = 0; i < 60; i += 1) sq.push({ x: -30000, y: 30000 - i * 1000 });
  const box = [P(-29400, -29900), P(-29350, -29900), P(-29350, -29850), P(-29400, -29850)];

  it('the corner keeps its place; with no box it moves; no side of the result crosses the box', () => {
    const free = smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 4000, []);
    expect(free[0]).toEqual({ x: -29750, y: -29750 });
    // The free result's side from the corner east crosses the box, though no vertex enters it.
    expect(wetSides([box], 0).over(free[0], free[1])).toBe(true);
    expect(free.some((q) => insideRing(box, q))).toBe(false);
    const held = smoothPinned(sq, new Uint8Array(sq.length), 1, sq, 4000, [box]);
    expect(held[0]).toEqual(sq[0]);
    expect(wetSides([box], 0).firstOver(held)).toBe(-1);
  });
});

describe('F-WALL\'s verdict tests the sides too (N-54 (1))', () => {
  it('a rung trace with a side across the water is not held (`water`), the same trace with the side a gate\'s course is', () => {
    const boundary = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]]);
    const lake = [P(20000, -10000), P(40000, -10000), P(40000, 10000), P(20000, 10000)];
    const cand = boundary.filter((q) => !(q.x === 30000 && Math.abs(q.y) < 10000));
    const at = cand.findIndex((q) => q.x === 30000 && q.y === 10000);
    const pin = (a: Pt, b: Pt): boolean => a.x === 30000 && b.x === 30000 && Math.abs(a.y) === 10000 && Math.abs(b.y) === 10000;
    expect(at).toBeGreaterThan(0);
    expect(pin(cand[at - 1], cand[at])).toBe(true);
    expect(rungVerdict(cand, boundary, 4000, [], wetSides([lake], 1))).toBe('water');
    expect(rungVerdict(cand, boundary, 4000, [], wetSides([lake], 1, [[P(30000, -10000), P(30000, 10000)]]))).toBeNull();
    expect(rungVerdict(cand, boundary, 4000, [])).toBeNull();
  });
});

describe('through the strategy: no committed wall edge over water but a water gate\'s (the property, per edge)', () => {
  it('the river 10 m outside the town under an outward field: the trace keeps to the near bank, every edge dry, no gate', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const RIVER = [P(31000, -90000), P(33200, -90000), P(33200, 90000), P(31000, 90000)];
    const water = handBuildWater(k, RIVER);
    const boundary = densify([[-30000, -30000], [30000, -30000], [30000, 30000], [-30000, 30000]], 5000);
    const gates: GateSite[] = [
      { ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
      { ordinal: 1, at: P(0, -30000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
    ];
    const r = traceBase(boundary, gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: (p) => -Math.hypot(p.x, p.y) / 100 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.traced.waterGates).toEqual([]);
    expect(r.value.traced.report.pull.moved).toBeGreaterThan(0);
    const depths = wallDepths(plat, 'enceinte:1', RIVER);
    expect(depths.length).toBeGreaterThan(20);
    for (const d of depths) expect(d.depth).toBeLessThanOrEqual(WET_TOL_CM);
    expect(Math.max(...r.value.traced.line.map((q) => q.x))).toBeLessThan(31000);
  }, 120_000);

  for (const seed of [1, 4]) {
    it(`the synthetic river (water.test's seed ${String(seed)}): an edge lies over the water ⇔ it carries a wall_gate; water gates = crossings`, () => {
      const c = riverCommitted(seed);
      const RIVER = [P(30000, -200000), P(34000, -200000), P(34000, 200000), P(30000, 200000)];
      const depths = wallDepths(c.plat, 'enceinte:1', RIVER);
      for (const d of depths) if (d.depth > WET_TOL_CM) expect(d.gated).toBe(true);
      for (const g of c.commit.waterGates) expect(depths.filter((d) => d.depth > WET_TOL_CM && d.e.rows.some((q) => q.role === 'wall_gate' && q.entity === g.id))).toHaveLength(1);
      // Per side of the trace: over the water ⇔ the chord between a water gate's two banks.
      const line = c.commit.traced.line;
      const chord = (a: Pt, b: Pt): boolean => c.commit.waterGates.some((g) => [[0, 1], [1, 0]].some(([i, j]) => g.bankAt[i].x === a.x && g.bankAt[i].y === a.y && g.bankAt[j].x === b.x && g.bankAt[j].y === b.y));
      line.forEach((a, i) => {
        const b = line[(i + 1) % line.length];
        expect(depthOf(a, b, RIVER) > WET_TOL_CM).toBe(chord(a, b));
      });
    }, 120_000);
  }

  it('a graze along a bulged shore arc commits: the trace follows the shore, no wall edge midpoint more than 2 cm in the water, no gate', () => {
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    // A lake east of the town whose west shore bulges 6 m west between y −20 m and 20 m (an arc of five vertices).
    const LAKE = [P(31000, -90000), P(90000, -90000), P(90000, 90000), P(31000, 90000), P(31000, 2000), P(30600, 1200), P(30400, 0), P(30600, -1200), P(31000, -2000)];
    const water = handBuildWater(k, LAKE, 'lake:1', P(60000, 0));
    // The town's east side dips 2 m into the bulge and back (a graze, not a crossing).
    const boundary = densify([[-30000, -30000], [30000, -30000], [30000, -1500], [30600, 0], [30000, 1500], [30000, 30000], [-30000, 30000]]);
    const gates: GateSite[] = [{ ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }];
    const r = traceBase(boundary, gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: (p) => -Math.hypot(p.x, p.y) / 100 });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.traced.waterGates).toEqual([]);
    const wall = edgesWith(plat, 'wall', 'enceinte:1');
    for (const e of wall) {
      const m = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
      expect(insideRing(LAKE, m) && ringDist(m, LAKE) > 2).toBe(false);
      expect(depthOf(e.a, e.b, LAKE)).toBeLessThanOrEqual(WET_TOL_CM);
    }
    // The shore's bulge vertex is a wall vertex (the trace follows the shore there).
    expect(wall.some((e) => [e.a, e.b].some((q) => q.x === 30400 && q.y === 0))).toBe(true);
  }, 120_000);
});

describe('the relief-60 CITY seed 9 stage-2 replay (N-54 (1) Q5): the ring and boundary beside a ~22 m river', () => {
  interface Fixture {
    frame: { widthCm: number; heightCm: number; aspect: number; marginShare: number };
    boundary: [number, number][];
    gateSites: { ordinal: number; at: [number, number]; bearingCdeg: number }[];
    plaza: [number, number][];
    core: [number, number][][];
    water: { body: string; ring: [number, number][]; within: [number, number] };
    costs: Record<string, number>;
    before: { pull: { moved: number; maxOffsetCm: number }; lineLength: number; waterGates: [Pt, Pt][] };
  }
  const fx = JSON.parse(readFileSync(new URL('./fixtures/relief60-s9-stage2.json', import.meta.url), 'utf8')) as Fixture;
  const pts = (l: readonly [number, number][]): LatticePoint[] => l.map(([x, y]) => P(x, y));

  it('every committed wall edge is dry or a water gate\'s course edge; the four crossings are its four water gates', () => {
    const base = smallSite(1);
    const site = { ...base, frame: fx.frame as unknown as typeof base.frame };
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const RING = pts(fx.water.ring);
    const water = handBuildWater(k, RING, fx.water.body, P(fx.water.within[0], fx.water.within[1]));
    let misses = 0;
    const cost = (p: Pt): number => {
      const v = fx.costs[`${String(p.x)},${String(p.y)}`];
      if (v === undefined) misses += 1;
      return v ?? 0;
    };
    const gates: GateSite[] = fx.gateSites.map((g) => ({ ordinal: g.ordinal, at: P(g.at[0], g.at[1]), bearingCdeg: g.bearingCdeg as GateSite['bearingCdeg'], kind: 'main', forced: false }));
    const r = traceBase(pts(fx.boundary), gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, {
      stage: 2,
      enceinteId: 'enceinte:2',
      core: [pts(fx.plaza), ...fx.core.map(pts)],
      costField: cost,
    });
    expect(misses).toBe(0);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const t = r.value.traced;
    // The crossings as before the round: the same four water gates at the same banks.
    expect(t.waterGates.map((g) => g.bankAt.map((q) => ({ x: q.x, y: q.y })))).toEqual(fx.before.waterGates);
    // The pull still moves the line (the seed's own field), within the band.
    expect(t.report.pull.moved).toBeGreaterThan(0);
    expect(t.report.departureCm).toBeLessThanOrEqual(4000);
    // Per side of the trace: over the water ⇔ the chord between a water gate's two banks.
    const chord = (a: Pt, b: Pt): boolean => t.waterGates.some((g) => [[0, 1], [1, 0]].some(([i, j]) => g.bankAt[i].x === a.x && g.bankAt[i].y === a.y && g.bankAt[j].x === b.x && g.bankAt[j].y === b.y));
    t.line.forEach((a, i) => {
      const b = t.line[(i + 1) % t.line.length];
      expect({ side: [a, b], wet: depthOf(a, b, RING) > WET_TOL_CM }).toEqual({ side: [a, b], wet: chord(a, b) });
    });
    // Per committed wall edge: over the water ⇒ a wall_gate edge, and each water gate has its edge over the water.
    const depths = wallDepths(plat, 'enceinte:2', RING);
    for (const d of depths) if (d.depth > WET_TOL_CM) expect({ edge: [d.e.a, d.e.b], gated: d.gated }).toEqual({ edge: [d.e.a, d.e.b], gated: true });
    for (const g of t.waterGates) expect(depths.some((d) => d.depth > WET_TOL_CM && d.e.rows.some((q) => q.role === 'wall_gate' && q.entity === g.id))).toBe(true);
    // Before the round the boundary vertex (53365, −61609) was pulled 29.8 m to (50824, −60052), on the far bank.
    expect(t.line.some((q) => q.x === 50824 && q.y === -60052)).toBe(false);
  }, 300_000);
});
