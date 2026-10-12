// M0-c-02: the basic water gate (C-0087; §4.2 S3 (7), §4.4 *Water and the waterfront*, §2.2 rule 7, §2.7 `Gate.banks`)
// — on a synthetic water face crossing the boundary (hand-built through the façade, its shores and banks typed), the
// trace crosses the water exactly once per crossing at a water gate whose two gate_end vertices lie on the shores and
// resolve by VertexRef('gate_end', gate, 0 | 1); Gate.banks set and way null; N unchanged; the strips end at the banks;
// the wall's edge between the banks lies across the water. Where the boundary only runs along a bank, the trace follows
// the shore there (a graze, C-0226 (7)) and no gate is written.
import { describe, expect, it } from 'vitest';
import type { GateSite } from '@plat/model';
import { commitOuterRing, crossWater, GRAZE_RATIO, siteContext, traceBase, waterGates } from '../../src/index.js';
import { closedChain, densify, edgesWith, GROUND, handBuildWater, incidentRows, insideRing, kernelFor, P, RIVER, riverCommitted, ringDist, smallSite, verticesWith } from './support.js';
import { ccw, lat, openRing } from '../../src/enceinte/plane.js';

const WALL = { role: 'wall', entity: 'enceinte:1' };
const SEEDS = [1, 4];

/**
 * The boundary's passages across the river, counted independently: the outline's points where it meets a bank line, in
 * order; each stretch between two such points lying in the water is a passage when its ends are on opposite banks.
 */
function bankToBank(outline: readonly { x: number; y: number }[]): number {
  const n = outline.length;
  const hits: { x: number; y: number; i: number; t: number }[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = outline[i];
    const b = outline[(i + 1) % n];
    for (const xb of [30000, 34000]) {
      if ((a.x - xb) * (b.x - xb) < 0) {
        const t = (xb - a.x) / (b.x - a.x);
        hits.push({ x: xb, y: a.y + t * (b.y - a.y), i, t });
      }
    }
  }
  hits.sort((p, q) => p.i - q.i || p.t - q.t);
  let count = 0;
  for (let k = 0; k < hits.length; k += 1) {
    const p = hits[k];
    const q = hits[(k + 1) % hits.length];
    const mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    if (p.x !== q.x && insideRing(RIVER, mid)) count += 1;
  }
  return count;
}

describe('the water gate on a synthetic river (C-0087)', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: one water gate per crossing, its gate_end vertices on the shores, banks set, way null, N unchanged`, () => {
      const c = riverCommitted(seed);
      const wg = c.commit.waterGates;
      const crossings = bankToBank(c.slice.levelSet.outline);
      expect(crossings).toBeGreaterThanOrEqual(1);
      expect(wg).toHaveLength(crossings);
      // N unchanged: the main gates are the gate sites, one each; the water gates come after, not counted in N.
      const mains = c.commit.gates.filter((g) => g.kind === 'main');
      expect(mains).toHaveLength(c.slice.gateSites.length);
      expect(c.commit.enceinte.gates).toEqual([...mains.map((g) => g.id), ...wg.map((g) => g.id)]);
      expect(c.commit.traced.report.waterGates).toBe(wg.length);
      for (const g of wg) {
        expect(g.kind).toBe('water');
        expect(g.way).toBeNull();
        expect(g.enceinte).toBe('enceinte:1');
        expect(g.banks).toEqual([
          { role: 'gate_end', entity: g.id, ordinal: 0 },
          { role: 'gate_end', entity: g.id, ordinal: 1 },
        ]);
        for (const end of [0, 1] as const) {
          // Resolves to exactly one vertex, the one the record names, lying on the river's shore and on a shore edge.
          const r = c.k.resolve((g.banks as NonNullable<typeof g.banks>)[end], GROUND);
          expect(r.view).toBe('vertices');
          if (r.view !== 'vertices') continue;
          expect(r.vertices).toHaveLength(1);
          const at = verticesWith(c.plat, 'gate_end', g.id, end);
          expect(at).toEqual([g.bankAt[end]]);
          expect(ringDist(at[0], RIVER)).toBeLessThanOrEqual(1);
          const rows = incidentRows(c.plat, at[0]);
          expect(rows.some((q) => q.role === 'shore' && q.entity === 'river:1')).toBe(true);
          expect(rows.some((q) => q.role === 'wall')).toBe(true);
        }
        // The two banks are on opposite shores of the river.
        const bank = (q: { x: number }): string => (Math.abs(q.x - 30000) <= 1 ? 'west' : Math.abs(q.x - 34000) <= 1 ? 'east' : 'off');
        expect(new Set(g.bankAt.map(bank))).toEqual(new Set(['west', 'east']));
      }
    }, 120_000);

    it(`seed ${String(seed)}: the trace crosses the water only at its water gates, each once, the wall's edge between the banks lying across the water`, () => {
      const c = riverCommitted(seed);
      const wall = edgesWith(c.plat, 'wall');
      const across = wall.filter((e) => insideRing(RIVER, { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 }));
      // Every wall edge over water carries the wall_gate row of exactly one water gate, and each water gate has one.
      for (const e of across) {
        const gates = e.rows.filter((r) => r.role === 'wall_gate');
        expect(gates).toHaveLength(1);
      }
      for (const g of c.commit.waterGates) {
        const mine = across.filter((e) => e.rows.some((r) => r.role === 'wall_gate' && r.entity === g.id));
        expect(mine).toHaveLength(1);
        const e = mine[0];
        const ends = [e.a, e.b].map((q) => `${String(q.x)},${String(q.y)}`).sort();
        expect(ends).toEqual(g.bankAt.map((q) => `${String(q.x)},${String(q.y)}`).sort());
      }
      expect(across).toHaveLength(c.commit.waterGates.length);
      // The wall_gate rows lie only on those edges.
      expect(edgesWith(c.plat, 'wall_gate')).toHaveLength(c.commit.waterGates.length);
      // The trace stays one closed chain.
      expect(closedChain(c.plat, WALL).length).toBeGreaterThan(10);
    }, 120_000);

    it(`seed ${String(seed)}: the strips end at the banks — no strip face lies in the water`, () => {
      const c = riverCommitted(seed);
      const v = c.k.view(GROUND, 1);
      const strips = v.faces().filter((f) => (v.owner(f) ?? '').startsWith('wall_strip'));
      expect(strips.length).toBeGreaterThanOrEqual(2 * (c.slice.gates.length + c.commit.waterGates.length));
      for (const f of strips) {
        const ring = v.rings(f)[0];
        // No strip vertex strictly inside the water, and the strip's area outside it (its middle on land).
        for (const q of ring) expect(insideRing(RIVER, q) && ringDist(q, RIVER) > 2).toBe(false);
      }
      // Near each bank vertex a strip ends on the shore: a strip face has a vertex on the river's shore within 30 m (on a
      // bank the trace follows, the inner strip's line lies in the water and only the outer strip ends there).
      for (const g of c.commit.waterGates) {
        for (const b of g.bankAt) {
          const touching = strips.filter((f) => v.rings(f)[0].some((q) => ringDist(q, RIVER) <= 1 && Math.hypot(q.x - b.x, q.y - b.y) <= 3000));
          expect(touching.length).toBeGreaterThanOrEqual(1);
        }
      }
    }, 120_000);
  }

  it('the pull keeps each water crossing where the boundary crosses: under a field pulling the vertices about the crossings out, the bank points stay on the shores', () => {
    const plain = riverCommitted(1);
    // Farther from the centre costs less, about the two crossings (north and south of the town).
    const pulled = riverCommitted(1, (q) => (q.y < -56000 || q.y > 53000 ? -Math.hypot(q.x, q.y) / 100 : 0), 'outward');
    expect(pulled.commit.traced.report.pull.moved).toBeGreaterThan(0);
    expect(pulled.commit.waterGates.map((g) => g.bankAt)).toEqual(plain.commit.waterGates.map((g) => g.bankAt));
    for (const g of pulled.commit.waterGates) {
      for (const end of [0, 1] as const) {
        const at = verticesWith(pulled.plat, 'gate_end', g.id, end);
        expect(at).toEqual([g.bankAt[end]]);
        expect(ringDist(at[0], RIVER)).toBeLessThanOrEqual(1);
      }
    }
  }, 120_000);

  it('waterGates(trace, water, k) reads the water through the façade: one gate per crossing, in trace order', () => {
    const c = riverCommitted(1);
    const gates = waterGates(c.slice.levelSet.outline, c.water, c.k);
    expect(gates.map((g) => g.bankAt)).toHaveLength(c.commit.waterGates.length);
    expect(gates.map((g) => g.id)).toEqual(gates.map((_g, i) => `gate:w${String(i)}`));
    for (const g of gates) {
      expect(g.way).toBeNull();
      expect(g.body).toBe('river:1');
    }
  }, 120_000);
});

describe('crossings and grazes (C-0226 (7))', () => {
  const square = (x0: number, y0: number, x1: number, y1: number) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
  const river = [{ body: 'r', ring: square(-2000, -50000, 2000, 50000) }];

  it('a boundary crossing the river bank to bank makes one crossing per passage, its bank points on the two banks, the chord across', () => {
    const ring = ccw(openRing(square(-10000, -10000, 10000, 10000).map(lat)));
    const r = crossWater(ring, new Set(), river);
    expect(r.crossings).toHaveLength(2);
    for (const c of r.crossings) {
      expect(c.chord).toBe(true);
      expect(new Set([c.entry.x, c.exit.x])).toEqual(new Set([-2000, 2000]));
      expect(r.keep.has(`${String(c.entry.x)},${String(c.entry.y)}`)).toBe(true);
      expect(r.keep.has(`${String(c.exit.x)},${String(c.exit.y)}`)).toBe(true);
    }
    // No boundary vertex is left inside the water.
    for (const q of r.ring) expect(insideRing(river[0].ring, q) && ringDist(q, river[0].ring) > 1).toBe(false);
  });

  it('a boundary dipping into the water and back to the same bank is a graze: no gate, the trace follows the shore', () => {
    // A boundary whose east side bulges 5 m into a lake's west shore over 30 m.
    const lake = [{ body: 'lake', ring: square(10000, -50000, 60000, 50000) }];
    const ring = ccw(openRing([P(-10000, -10000), P(10000, -10000), P(10000, -1500), P(10500, 0), P(10000, 1500), P(10000, 10000), P(-10000, 10000)]));
    const r = crossWater(ring, new Set(), lake);
    expect(r.crossings).toEqual([]);
    for (const q of r.ring) expect(insideRing(lake[0].ring, q) && ringDist(q, lake[0].ring) > 1).toBe(false);
    // The dip is replaced by the shore between the two points: kept, on the shore.
    const kept = [...r.keep];
    expect(kept.length).toBeGreaterThanOrEqual(2);
    for (const k of kept) expect(Number(k.split(',')[0])).toBe(10000);
    expect(GRAZE_RATIO).toBe(2);
  });

  it('a main gate standing in the water keeps the boundary\'s own course between the banks (no chord across it)', () => {
    const ring = ccw(openRing([P(-10000, -10000), P(0, -10000), P(10000, -10000), P(10000, 10000), P(-10000, 10000)]));
    const r = crossWater(ring, new Set(['0,-10000']), river);
    const across = r.crossings.find((c) => c.entry.y === -10000);
    expect(across?.chord).toBe(false);
    expect(r.ring.some((q) => q.x === 0 && q.y === -10000)).toBe(true);
  });
});

describe('a crossing whose chord would leave the water (C-0226 (7); §2.2 rule 7)', () => {
  // An L-shaped river: an arm x 200–240 m from the south turning east along y 320–360 m. The boundary crosses the bend
  // obliquely, entering on the east arm's south shore (y 320 m, east of the inner corner at (240, 320) m) and leaving by
  // the north arm's west shore (x 200 m): the straight chord between those banks passes south of the inner corner, over
  // land. Its south side crosses the north arm square, where the chord stays in the water.
  const BEND = [P(20000, -90000), P(24000, -90000), P(24000, 32000), P(90000, 32000), P(90000, 36000), P(20000, 36000)];
  const CORNERS: [number, number][] = [[-30000, -30000], [30000, -30000], [30000, 31000], [22000, 34000], [16000, 26000], [-30000, 30000]];
  const BOUNDARY = densify(CORNERS);
  const k2 = (q: { x: number; y: number }): string => `${String(q.x)},${String(q.y)}`;
  /** Is q over the water (inside the bend, or on its shore within 2 cm)? */
  const wet = (q: { x: number; y: number }): boolean => insideRing(BEND, q) || ringDist(q, BEND) <= 2;

  it('crossWater: the oblique crossing takes no chord and keeps the boundary\'s own course between its banks; the square crossing takes the chord', () => {
    const ring = ccw(openRing(BOUNDARY.map(lat)));
    const r = crossWater(ring, new Set(), [{ body: 'river:1', ring: BEND }]);
    expect(r.crossings).toHaveLength(2);
    const oblique = r.crossings.filter((c) => c.entry.y > 0);
    const square = r.crossings.filter((c) => c.entry.y < 0);
    expect(oblique).toHaveLength(1);
    expect(square).toHaveLength(1);
    expect(square[0].chord).toBe(true);
    const c = oblique[0];
    expect(c.chord).toBe(false);
    // Its banks: on the east arm's south shore and on the north arm's west shore.
    const banks = [c.entry, c.exit];
    expect(banks.some((q) => q.y === 32000 && q.x > 24000)).toBe(true);
    expect(banks.some((q) => q.x === 20000 && q.y < 32000)).toBe(true);
    // The chord between them would cross land (the independent check of why it is refused).
    const chordDry = Array.from({ length: 19 }, (_v, i) => (i + 1) / 20).some((t) => !wet({ x: c.entry.x + t * (c.exit.x - c.entry.x), y: c.entry.y + t * (c.exit.y - c.entry.y) }));
    expect(chordDry).toBe(true);
    // The boundary's own course is kept between the banks: every boundary vertex in the water there (the corner at
    // (220, 340) m among them) is on the new ring and kept.
    const between = ring.filter((q) => q.y > 0 && insideRing(BEND, q));
    expect(between.some((q) => q.x === 22000 && q.y === 34000)).toBe(true);
    const onRing = new Set(r.ring.map(k2));
    for (const q of between) {
      expect(onRing.has(k2(q))).toBe(true);
      expect(r.keep.has(k2(q))).toBe(true);
    }
  });

  it('through the strategy: the oblique crossing is routed along its banks to a clear chord and commits, each water gate one wall_gate edge (C-0324; was refused E_INVARIANT `water` under C-0300)', () => {
    // Before session round s2 the trace kept the boundary's own course between the banks, several wall_gate edges over
    // the water, none of them a chord between the gate's two bank pins; session round s2 refused it (C-0300); session
    // round s4 routes it along its banks within the band (Q40, J264; bend.test.ts holds the route and its refusal).
    const site = smallSite(2);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const water = handBuildWater(k, BEND, 'river:1', P(22000, 0));
    const gates: GateSite[] = [
      { ordinal: 0, at: P(-30000, 0), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
      { ordinal: 1, at: P(0, -30000), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false },
    ];
    const r = traceBase(BOUNDARY, gates, [], site.terrain, water, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    if (!r.ok) return;
    expect(r.value.traced.waterGates).toHaveLength(2);
    for (const g of r.value.traced.waterGates) {
      const e = edgesWith(plat, 'wall_gate', g.id);
      expect(e).toHaveLength(1);
      // The gate's one edge joins its two banks, every inner point of it over the water.
      expect([k2(e[0].a), k2(e[0].b)].sort()).toEqual(g.bankAt.map(k2).sort());
      for (let i = 1; i < 20; i += 1) expect(wet({ x: e[0].a.x + (i / 20) * (e[0].b.x - e[0].a.x), y: e[0].a.y + (i / 20) * (e[0].b.y - e[0].a.y) })).toBe(true);
    }
  }, 120_000);
});
