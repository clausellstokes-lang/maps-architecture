// M0-e-06's two derivation tests (M0-work.json's tests 2 and 3), on the spike's river fixture at the test size (900 ha
// frame, 30 ha walled; C-0271 (3)), each read twice — by the harness's receipt and directly from the committed arena
// through the kernel's own readers — with a negative control per receipt:
// * "a route through a site's deck_end vertices lays the span and the Bridge becomes built; a site no route uses stays a
//   site with no span (§4.2 S1 (5))" — 60 m relief, the river from the north, seed 3: S4 crosses at one site (C-0076);
// * "the river fixture's trace crosses the river only at water gates; every gate_end vertex lies on a shore and
//   resolves; the strips end at the banks (C-0087)" — the spike's relief-60 fixture (the river from the west), seed 2:
//   stage 1's trace crosses the river twice.
import { dest, isHalfEdgeLive, isVertexLive, outgoing, rowKey, rowsOn, type LatticePoint, type Plat, type PlatKey } from '@plat/kernel';
import type { Bridge, WaterSet } from '@plat/model';
import type { S3Commit, S3Slice, S4Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { bridgeReceipt, deriveSpike, fixtureNamed, RELIEF_60, riverOn, runRecord, waterGateReceipt, WET_DEPTH_CM, type SiteFixture, type SpikeDerivation } from '../../src/site/index.js';

const GROUND: PlatKey = { layer: 'ground', part: 0 } as PlatKey;
const HEAVY = 900_000;

/** The 60 m relief with the river from the north (inflow bearing 0). */
const NORTH_60: SiteFixture = { name: 'relief-60-north', blueprint: { ...riverOn(RELIEF_60), site: { ...RELIEF_60, river: { inflowBearingCdeg: 0, mouth: 'none' } } } };

const RUNS = new Map<string, SpikeDerivation>();
function derivation(f: SiteFixture, seed: number): SpikeDerivation {
  const k = `${f.name}:${String(seed)}`;
  let d = RUNS.get(k);
  if (d === undefined) {
    d = deriveSpike(f, seed, 'default', 'test');
    RUNS.set(k, d);
  }
  return d;
}

function ground(d: SpikeDerivation): Plat {
  return d.model.plats.get('ground/0') as Plat;
}

interface Edge {
  a: LatticePoint;
  b: LatticePoint;
  rows: { role: string; entity: string; ordinal: number }[];
}

function edges(p: Plat): Edge[] {
  const out: Edge[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    const o = p.halfEdges.origin[h];
    const t = dest(p, h);
    out.push({ a: { x: p.vertices.x[o], y: p.vertices.y[o] } as LatticePoint, b: { x: p.vertices.x[t], y: p.vertices.y[t] } as LatticePoint, rows: rowsOn(p, 'edge', h).map((r) => rowKey(p, r) as Edge['rows'][number]) });
  }
  return out;
}

function vertexRows(p: Plat, q: LatticePoint): { role: string; entity: string; ordinal: number }[] {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return rowsOn(p, 'vertex', v).map((r) => rowKey(p, r) as Edge['rows'][number]);
  return [];
}

function incident(p: Plat, q: LatticePoint): { role: string; entity: string }[] {
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v) && p.vertices.x[v] === q.x && p.vertices.y[v] === q.y) return outgoing(p, v).flatMap((h) => rowsOn(p, 'edge', h).map((r) => rowKey(p, r) as { role: string; entity: string }));
  return [];
}

const same = (a: LatticePoint, b: LatticePoint): boolean => a.x === b.x && a.y === b.y;

/** The rings of the water bodies' L0 faces, read through the façade's level-0 view (not the receipt's own reader). */
function riverRings(d: SpikeDerivation): { x: number; y: number }[][] {
  const water = d.model.data.get('water') as WaterSet;
  const ids = new Set(water.bodies.map((b) => b.id));
  const v = d.model.kernel.view(GROUND, 0);
  return v.faces().filter((f) => ids.has(v.owner(f) ?? '')).flatMap((f) => v.rings(f).map((r) => r.map((q) => ({ x: q.x as number, y: q.y as number }))));
}

describe('a route through a crossing site lays the span and the Bridge becomes built; a site no route uses stays a site (C-0076; §4.2 S1 (5))', () => {
  it('60 m relief, river from the north, seed 3: one bridge built with its span through its two deck_end vertices, every other site clear', { timeout: HEAVY }, () => {
    const d = derivation(NORTH_60, 3);
    const p = ground(d);
    const k = d.model.kernel;
    expect(d.model.order.slice(0, 3)).toEqual(['S1', 'S3', 'S4']);
    expect(d.report.bugs.filter((b) => b.stage === 'S1' || b.stage === 'S3' || b.stage === 'S4')).toEqual([]);
    const s4 = d.model.data.get('s4') as S4Output;
    const built = s4.bridges.filter((b) => b.state === 'built');
    expect(built.length).toBeGreaterThanOrEqual(1);
    const sites = s4.bridges.filter((b) => b.state === 'site');
    expect(sites.length).toBeGreaterThanOrEqual(1);
    const all = edges(p);
    const endsOf = (b: Bridge): LatticePoint[] =>
      b.deck.map((ref) => {
        const r = k.resolve(ref, GROUND);
        if (r.view !== 'vertices' || r.vertices.length !== 1) throw new Error(`${b.id}: a deck end resolves to no single vertex`);
        return { x: p.vertices.x[r.vertices[0]], y: p.vertices.y[r.vertices[0]] } as LatticePoint;
      });
    for (const b of built) {
      const way = s4.network.ways.find((w) => w.id === b.way);
      expect(way?.bridge).toBe(b.id);
      const [a, z] = endsOf(b);
      // The span: the way's L1 edge between the two deck ends, which still carry their deck_end rows (0, then 1).
      const span = all.filter((e) => e.rows.some((r) => r.role === 'way' && r.entity === b.way) && ((same(e.a, a) && same(e.b, z)) || (same(e.a, z) && same(e.b, a))));
      expect(span).toHaveLength(1);
      expect(vertexRows(p, a).some((r) => r.role === 'deck_end' && r.entity === b.id && r.ordinal === 0)).toBe(true);
      expect(vertexRows(p, z).some((r) => r.role === 'deck_end' && r.entity === b.id && r.ordinal === 1)).toBe(true);
    }
    for (const b of sites) {
      expect(b.way).toBeNull();
      for (const q of endsOf(b)) expect(incident(p, q).some((r) => r.role === 'way')).toBe(false);
    }
    // The harness's receipt reads the same.
    const water = d.model.data.get('water') as WaterSet;
    const r = bridgeReceipt(k, p, water, s4);
    expect(r).toEqual({ sites: s4.bridges.length, built: built.length, builtWithSpan: built.length, builtWayNamed: built.length, sitesClear: sites.length, wayOverWaterOffSpan: 0 });
    expect(runRecord(d).bridges).toEqual(r);
  });

  it('the receipt is not blind: a built bridge whose way is not the span\'s, and a site whose deck a way meets, are counted against the bar', { timeout: HEAVY }, () => {
    const d = derivation(NORTH_60, 3);
    const p = ground(d);
    const s4 = d.model.data.get('s4') as S4Output;
    const water = d.model.data.get('water') as WaterSet;
    const b = s4.bridges.find((x) => x.state === 'built') as Bridge;
    const other = s4.network.ways.find((w) => w.id !== b.way) as { id: string };
    // the built bridge's record names another way: no span of that way through its deck ends
    const moved = { ...s4, bridges: s4.bridges.map((x) => (x.id === b.id ? { ...x, way: other.id } : x)) };
    const r1 = bridgeReceipt(d.model.kernel, p, water, moved);
    expect([r1.builtWithSpan, r1.builtWayNamed]).toEqual([0, 0]);
    // the built bridge recorded as a site: its deck ends meet the way, so it is no clear site
    const unbuilt = { ...s4, bridges: s4.bridges.map((x) => (x.id === b.id ? { ...x, state: 'site' as const, way: null } : x)) };
    const r2 = bridgeReceipt(d.model.kernel, p, water, unbuilt);
    expect(r2.sitesClear).toBe(r2.sites - 1);
    expect(r2.built).toBe(0);
    // and the span it kept is now a way over water off any span
    expect(r2.wayOverWaterOffSpan).toBeGreaterThanOrEqual(1);
  });
});

describe('the river fixture\'s trace crosses the river only at water gates; every gate_end vertex lies on a shore and resolves; the strips end at the banks (C-0087)', () => {
  it('relief-60, seed 2: two water gates, the wall over the water only on their edges, each end on the river\'s shore, N unchanged', { timeout: HEAVY }, () => {
    const f = fixtureNamed('relief-60') as SiteFixture;
    const d = derivation(f, 2);
    const p = ground(d);
    const k = d.model.kernel;
    expect(d.report.bugs.filter((b) => b.stage === 'S1' || b.stage === 'S3')).toEqual([]);
    const commit = d.model.data.get('s3.commit') as S3Commit;
    const slice = d.model.data.get('s3.slice') as S3Slice;
    const water = d.model.data.get('water') as WaterSet;
    expect(commit.waterGates.length).toBeGreaterThanOrEqual(1);
    const rings = riverRings(d);
    expect(rings.length).toBeGreaterThan(0);
    const all = edges(p);
    const wall = all.filter((e) => e.rows.some((r) => r.role === 'wall'));
    // Over the water: an edge whose midpoint the even–odd rule puts inside the river's polygon and that is no shore
    // edge (an edge along the shore, a graze, carries the shore's row).
    const inside = (q: { x: number; y: number }): boolean =>
      rings.some((ring) => {
        let c = false;
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
          const a = ring[i];
          const b = ring[j];
          if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) c = !c;
        }
        return c;
      });
    const over = wall.filter((e) => !e.rows.some((r) => r.role === 'shore' || r.role === 'bank') && inside({ x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 }));
    expect(over.length).toBe(commit.waterGates.length);
    for (const g of commit.waterGates) {
      expect(g.kind).toBe('water');
      expect(g.way).toBeNull();
      expect(g.banks).toEqual([
        { role: 'gate_end', entity: g.id, ordinal: 0 },
        { role: 'gate_end', entity: g.id, ordinal: 1 },
      ]);
      const ends: LatticePoint[] = [];
      for (const end of [0, 1] as const) {
        const r = k.resolve((g.banks as NonNullable<typeof g.banks>)[end], GROUND);
        expect(r.view).toBe('vertices');
        if (r.view !== 'vertices') continue;
        expect(r.vertices).toHaveLength(1);
        const q = { x: p.vertices.x[r.vertices[0]], y: p.vertices.y[r.vertices[0]] } as LatticePoint;
        ends.push(q);
        const rows = incident(p, q);
        expect(rows.some((x) => x.role === 'shore' && water.bodies.some((b) => b.id === x.entity))).toBe(true);
        expect(rows.some((x) => x.role === 'wall')).toBe(true);
      }
      const mine = over.filter((e) => e.rows.some((r) => r.role === 'wall_gate' && r.entity === g.id));
      expect(mine).toHaveLength(1);
      expect([mine[0].a, mine[0].b].map((q) => `${String(q.x)},${String(q.y)}`).sort()).toEqual(ends.map((q) => `${String(q.x)},${String(q.y)}`).sort());
    }
    // every wall edge over water is a water gate's
    for (const e of over) expect(e.rows.filter((r) => r.role === 'wall_gate').length).toBe(1);
    // N unchanged: the main gates are the gate sites; the water gates come after them in the enceinte's list
    const mains = commit.gates.filter((g) => g.kind === 'main');
    expect(mains).toHaveLength(slice.gateSites.length);
    expect(commit.enceinte.gates).toEqual([...mains.map((g) => g.id), ...commit.waterGates.map((g) => g.id)]);
    // the harness's receipt reads the same
    const r = waterGateReceipt(k, p, water, commit, slice);
    expect(r).toMatchObject({ gates: commit.waterGates.length, wallOverWater: over.length, wallOverWaterGated: over.length, gatesWithOneEdge: commit.waterGates.length, endsResolved: 2 * commit.waterGates.length, endsOnShore: 2 * commit.waterGates.length, stripVerticesInWater: 0, mainGates: slice.gateSites.length, gateSites: slice.gateSites.length });
    expect(r.stripFaces).toBeGreaterThanOrEqual(2 * (slice.gates.length + commit.waterGates.length));
  });

  it('the strips end at the banks: no strip face\'s vertex lies inside the river beyond the tolerance; a strip ends on the shore near each bank', { timeout: HEAVY }, () => {
    const d = derivation(fixtureNamed('relief-60') as SiteFixture, 2);
    const p = ground(d);
    const commit = d.model.data.get('s3.commit') as S3Commit;
    const rings = riverRings(d);
    const v = d.model.kernel.view(GROUND, 1);
    const owners = new Set([commit.strips.owners.inner, commit.strips.owners.outer]);
    const strips = v.faces().filter((f) => owners.has(v.owner(f) ?? ''));
    expect(strips.length).toBeGreaterThanOrEqual(2);
    const dist = (q: { x: number; y: number }): number => {
      let best = Infinity;
      for (const r of rings)
        for (let i = 0; i < r.length; i += 1) {
          const a = r[i];
          const b = r[(i + 1) % r.length];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const l = dx * dx + dy * dy;
          let t = l === 0 ? 0 : ((q.x - a.x) * dx + (q.y - a.y) * dy) / l;
          t = Math.max(0, Math.min(1, t));
          best = Math.min(best, Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy));
        }
      return best;
    };
    const inside = (q: { x: number; y: number }): boolean =>
      rings.some((ring) => {
        let c = false;
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
          const a = ring[i];
          const b = ring[j];
          if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) c = !c;
        }
        return c;
      });
    for (const f of strips) for (const q of v.rings(f)[0]) expect(inside(q) && dist(q) > WET_DEPTH_CM).toBe(false);
    for (const g of commit.waterGates) {
      for (const b of g.bankAt) {
        const touching = strips.filter((f) => v.rings(f)[0].some((q) => dist(q) <= 1 && Math.hypot(q.x - b.x, q.y - b.y) <= 3000));
        expect(touching.length).toBeGreaterThanOrEqual(1);
      }
    }
    expect(p.slots.face[1].top).toBeGreaterThan(0);
  });

  it('the receipt is not blind: a commit naming no water gate leaves the wall over water ungated; a gate whose banks name another gate does not resolve', { timeout: HEAVY }, () => {
    const d = derivation(fixtureNamed('relief-60') as SiteFixture, 2);
    const p = ground(d);
    const commit = d.model.data.get('s3.commit') as S3Commit;
    const slice = d.model.data.get('s3.slice') as S3Slice;
    const water = d.model.data.get('water') as WaterSet;
    const none = waterGateReceipt(d.model.kernel, p, water, { ...commit, waterGates: [] }, slice);
    expect(none.wallOverWater).toBeGreaterThan(0);
    expect(none.wallOverWaterGated).toBe(0);
    const g0 = commit.waterGates[0];
    const swapped = { ...commit, waterGates: commit.waterGates.map((g) => (g.id === g0.id ? { ...g, banks: [{ role: 'gate_end', entity: 'gate:nope', ordinal: 0 }, g.banks?.[1]] } : g)) } as unknown as S3Commit;
    const r = waterGateReceipt(d.model.kernel, p, water, swapped, slice);
    expect(r.endsResolved).toBe(2 * commit.waterGates.length - 1);
    expect(r.gatesWithOneEdge).toBe(commit.waterGates.length - 1);
    // each end is the gate's own VertexRef('gate_end', gate, end): banks naming the gate's ends in the wrong order resolve neither
    const reversed = { ...commit, waterGates: commit.waterGates.map((g) => (g.id === g0.id ? { ...g, banks: [g.banks?.[1], g.banks?.[0]] } : g)) } as unknown as S3Commit;
    const rv = waterGateReceipt(d.model.kernel, p, water, reversed, slice);
    expect([rv.endsResolved, rv.endsOnShore, rv.gatesWithOneEdge]).toEqual([2 * commit.waterGates.length - 2, 2 * commit.waterGates.length - 2, commit.waterGates.length - 1]);
    const fewer = waterGateReceipt(d.model.kernel, p, water, commit, { ...slice, gateSites: slice.gateSites.slice(1) });
    expect(fewer.mainGates).not.toBe(fewer.gateSites);
    // an end counts on the shore only beside the river's own shore or bank edge: with the river's id unknown, none does
    const other = { bodies: water.bodies.map((b) => ({ ...b, id: `${b.id}:other` })), bridges: water.bridges };
    const off = waterGateReceipt(d.model.kernel, p, other, commit, slice);
    expect([off.endsResolved, off.endsOnShore]).toEqual([2 * commit.waterGates.length, 0]);
  });
});
