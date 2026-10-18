// M0-e-06's two derivation tests (M0-work.json's tests 2 and 3), on the spike's river fixture at the test size (900 ha
// frame, 30 ha walled; C-0271 (3)), each read twice — by the harness's receipt and directly from the committed arena
// through the kernel's own readers — with a negative control per receipt:
// * "a route through a site's deck_end vertices lays the span and the Bridge becomes built; a site no route uses stays a
//   site with no span (§4.2 S1 (5))" — 60 m relief, the river from the north, seed 3: S4 crosses at one site (C-0076);
// * "the river fixture's trace crosses the river only at water gates; every gate_end vertex lies on a shore and
//   resolves; the strips end at the banks (C-0087)" — the spike's relief-60 fixture (the river from the west), seed 2:
//   stage 1's trace crosses the river twice.
// The receipt's own readings carry controls of their own (C-0275 (3)): the strip count is shown counting (the town's
// land face read as the water, every strip vertex inside it counted as the arena reads it), and the 2 cm tolerance is
// pinned on both sides (1 cm inside the river is not in the water; 10 cm and 50 cm inside are).
// Every enceinte is read against its own water gates (N-54 (4); C-0291): on relief-60 at CITY, seed 9, stage 2's wall
// crosses the river at stage 2's water gates (S5's output) and reads gated, while stage 1's records alone read the same
// edges ungated; a stage-2 chord without its gate, a gate of another enceinte and a chord not between its gate's two
// bank pins each still read ungated.
import { dest, idOf, isHalfEdgeLive, isVertexLive, outgoing, rowKey, rowsOn, type LatticePoint, type Plat, type PlatKey } from '@plat/kernel';
import type { Bridge, Gate, WaterSet } from '@plat/model';
import type { S3Commit, S3Slice, S4Output, S6Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { bridgeReceipt, CONTAINMENT_STEP_CM, deriveSpike, districtReceipt, edgeInWaterDeep, fixtureNamed, foldGroup, pointInWaterDeep, RELIEF_60, riverOn, runRecord, s5Walls, waterGateReceipt, WET_DEPTH_CM, type S5Walls, type SiteFixture, type SpikeDerivation } from '../../src/site/index.js';

const GROUND: PlatKey = { layer: 'ground', part: 0 } as PlatKey;
const HEAVY = 900_000;

/** The 60 m relief with the river from the north (inflow bearing 0). */
const NORTH_60: SiteFixture = { name: 'relief-60-north', blueprint: { ...riverOn(RELIEF_60), site: { ...RELIEF_60, river: { inflowBearingCdeg: 0, mouth: 'none' } } } };

const RUNS = new Map<string, SpikeDerivation>();
function derivation(f: SiteFixture, seed: number, size: 'test' | 'city' = 'test'): SpikeDerivation {
  const k = `${f.name}:${String(seed)}:${size}`;
  let d = RUNS.get(k);
  if (d === undefined) {
    d = deriveSpike(f, seed, 'default', size);
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

/** C-0271 (6)'s tolerance, written out here so that a changed WET_DEPTH_CM is caught by the readings, not followed. */
const TOLERANCE_CM = 2;

/** Even–odd containment over a set of rings (strict; independent of the receipts' locator). */
function insideRings(rings: readonly (readonly { x: number; y: number }[])[], q: { x: number; y: number }): boolean {
  let c = false;
  for (const ring of rings)
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
      const a = ring[i];
      const b = ring[j];
      if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) c = !c;
    }
  return c;
}

/** The distance (cm) from a point to the nearest edge of a set of rings. */
function ringsDist(rings: readonly (readonly { x: number; y: number }[])[], q: { x: number; y: number }): number {
  let best = Infinity;
  for (const r of rings)
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const l = dx * dx + dy * dy;
      const t = Math.max(0, Math.min(1, l === 0 ? 0 : ((q.x - a.x) * dx + (q.y - a.y) * dy) / l));
      best = Math.min(best, Math.hypot(q.x - a.x - t * dx, q.y - a.y - t * dy));
    }
  return best;
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

describe('the water-gate receipt\'s own readings: the strip count counts, and the 2 cm tolerance holds on both sides (C-0087; C-0271 (6))', () => {
  it('the strip receipt is not blind: with the town\'s land face read as the water, it counts every strip vertex inside that face past the tolerance, as the arena reads them', { timeout: HEAVY }, () => {
    const d = derivation(fixtureNamed('relief-60') as SiteFixture, 2);
    const p = ground(d);
    const k = d.model.kernel;
    const commit = d.model.data.get('s3.commit') as S3Commit;
    const slice = d.model.data.get('s3.slice') as S3Slice;
    const water = d.model.data.get('water') as WaterSet;
    const v1 = k.view(GROUND, 1);
    const owners = new Set([commit.strips.owners.inner, commit.strips.owners.outer]);
    const strips = v1.faces().filter((f) => owners.has(v1.owner(f) ?? ''));
    expect(strips.length).toBeGreaterThanOrEqual(2);
    // the S1 land face under the strips (the L0 owner at a strip vertex)
    let land: string | null = null;
    for (const f of strips) {
      for (const q of v1.rings(f)[0]) {
        const loc = k.geom.pointLocate(GROUND, 0, q);
        if (loc.on !== 'face') continue;
        const h = p.faces[loc.level].owner[loc.face];
        const id = h >= 0 ? idOf(p, h) : null;
        if (id !== null && id.startsWith('land:')) land = id;
        if (land !== null) break;
      }
      if (land !== null) break;
    }
    expect(land).not.toBeNull();
    const v0 = k.view(GROUND, 0);
    const landRings = v0.faces().filter((f) => v0.owner(f) === land).flatMap((f) => v0.rings(f).map((r) => r.map((q) => ({ x: q.x as number, y: q.y as number }))));
    let inside = 0;
    for (const f of strips) for (const ring of v1.rings(f)) for (const q of ring) if (insideRings(landRings, q) && ringsDist(landRings, q) > TOLERANCE_CM) inside += 1;
    expect(inside).toBeGreaterThan(0);
    const asWater = { ...water, bodies: [{ ...water.bodies[0], id: land as string }] } as WaterSet;
    const r = waterGateReceipt(k, p, asWater, commit, slice);
    expect(r.stripVerticesInWater).toBe(inside);
    // with the river as the water the same count is 0 (the strips end at the banks)
    expect(waterGateReceipt(k, p, water, commit, slice).stripVerticesInWater).toBe(0);
  });

  it('the tolerance: a point or an edge\'s midpoint 1 cm inside the river is not over the water; 10 cm and 50 cm inside are; 10 cm outside is not', { timeout: HEAVY }, () => {
    const d = derivation(fixtureNamed('relief-60') as SiteFixture, 2);
    const p = ground(d);
    const water = d.model.data.get('water') as WaterSet;
    const rings = riverRings(d);
    const R = (x: number, y: number): LatticePoint => ({ x: Math.round(x), y: Math.round(y) }) as LatticePoint;
    // the longest shore edge (≥ 20 m) whose one side is the river and the other land, 10 cm off its midpoint
    let best: { m: { x: number; y: number }; n: { x: number; y: number }; t: { x: number; y: number }; len: number } | null = null;
    for (const r of rings)
      for (let i = 0; i < r.length; i += 1) {
        const a = r[i];
        const b = r[(i + 1) % r.length];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        if (len < 2000 || (best !== null && len <= best.len)) continue;
        const t = { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
        const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        for (const s of [1, -1]) {
          const n = { x: -t.y * s, y: t.x * s };
          if (insideRings(rings, R(m.x + 10 * n.x, m.y + 10 * n.y)) && !insideRings(rings, R(m.x - 10 * n.x, m.y - 10 * n.y))) best = { m, n, t, len };
        }
      }
    expect(best).not.toBeNull();
    const { m, n, t } = best as NonNullable<typeof best>;
    const at = (depth: number): LatticePoint => R(m.x + depth * n.x, m.y + depth * n.y);
    const half = R(300 * t.x, 300 * t.y);
    const edge = (q: LatticePoint): [LatticePoint, LatticePoint] => [R(q.x - half.x, q.y - half.y), R(q.x + half.x, q.y + half.y)];
    // the depths as read independently: 1 cm in (within the tolerance, off the shore), 10 and 50 cm in, 10 cm out
    const q1 = at(1);
    const q10 = at(10);
    const q50 = at(50);
    const out10 = at(-10);
    expect(insideRings(rings, q1)).toBe(true);
    expect(ringsDist(rings, q1)).toBeGreaterThan(0);
    expect(ringsDist(rings, q1)).toBeLessThanOrEqual(TOLERANCE_CM);
    for (const q of [q10, q50]) {
      expect(insideRings(rings, q)).toBe(true);
      expect(ringsDist(rings, q)).toBeGreaterThan(5);
      expect(ringsDist(rings, q)).toBeLessThan(60);
    }
    expect(insideRings(rings, out10)).toBe(false);
    // the receipts' reading
    expect([q1, q10, q50, out10].map((q) => pointInWaterDeep(p, water, q))).toEqual([false, true, true, false]);
    expect([q1, q10, q50, out10].map((q) => edgeInWaterDeep(p, water, ...edge(q)))).toEqual([false, true, true, false]);
  });
});

describe('every enceinte\'s wall over water is read against its own water gates (N-54 (4); C-0087)', () => {
  // relief-60 at CITY, seed 9 (the case N-54 names): stage 1's trace meets no water, stage 2's (enceinte:2) crosses the
  // river at water gates `gate:w0..` of its own (C-0244: lawful while stage 1 holds none). The water gates of a stage
  // k ≥ 2 are S5's output; S4's gates — stage 1's list in S5 — hold the main gates only.
  const city9 = (): SpikeDerivation => derivation(fixtureNamed('relief-60') as SiteFixture, 9, 'city');
  interface Later {
    d: SpikeDerivation;
    p: Plat;
    commit: S3Commit;
    slice: S3Slice;
    water: WaterSet;
    s5: S5Walls;
    id: string;
    gates: Gate[];
    /** enceinte:2's wall edges over the river, read independently. */
    over: Edge[];
    /** Per gate, its two banks resolved (fewer when one does not resolve to one vertex). */
    ends: Map<string, LatticePoint[]>;
    /** Of `over`, the edges carrying exactly one wall_gate row of enceinte:2's water gates and joining that gate's two bank pins. */
    chordEdges: Edge[];
    /** The gates whose one wet edge is their chord between their two bank pins. */
    chords: Gate[];
  }
  const joins = (e: Edge, u: LatticePoint, v: LatticePoint): boolean => (same(e.a, u) && same(e.b, v)) || (same(e.a, v) && same(e.b, u));
  function later(): Later {
    const d = city9();
    const p = ground(d);
    const k = d.model.kernel;
    const commit = d.model.data.get('s3.commit') as S3Commit;
    const slice = d.model.data.get('s3.slice') as S3Slice;
    const water = d.model.data.get('water') as WaterSet;
    const s5 = s5Walls(d) as S5Walls;
    const e2 = s5.enceintes.find((e) => e.stage === 2);
    if (e2 === undefined) throw new Error('seed 9: no stage-2 enceinte');
    const gates = s5.gates.filter((g) => g.kind === 'water' && g.enceinte === e2.id);
    // its wall edges over the river, read independently: the midpoint inside the river's rings past the tolerance
    const rings = riverRings(d);
    const over = edges(p).filter((e) => {
      const m = { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 };
      return e.rows.some((r) => r.role === 'wall' && r.entity === e2.id) && insideRings(rings, m) && ringsDist(rings, m) > TOLERANCE_CM;
    });
    const ends = new Map<string, LatticePoint[]>();
    for (const g of gates) {
      const q: LatticePoint[] = [];
      for (const ref of g.banks ?? []) {
        const r = k.resolve(ref, GROUND);
        if (r.view === 'vertices' && r.vertices.length === 1) q.push({ x: p.vertices.x[r.vertices[0]], y: p.vertices.y[r.vertices[0]] } as LatticePoint);
      }
      ends.set(g.id, q);
    }
    const ids = new Set(gates.map((g) => g.id));
    const chordEdges = over.filter((e) => {
      const gs = e.rows.filter((r) => r.role === 'wall_gate' && ids.has(r.entity));
      const q = gs.length === 1 ? (ends.get(gs[0].entity) ?? []) : [];
      return q.length === 2 && joins(e, q[0], q[1]);
    });
    const chords = gates.filter((g) => {
      const mine = over.filter((e) => e.rows.some((r) => r.role === 'wall_gate' && r.entity === g.id));
      const q = ends.get(g.id) ?? [];
      return q.length === 2 && mine.length === 1 && joins(mine[0], q[0], q[1]);
    });
    return { d, p, commit, slice, water, s5, id: e2.id, gates, over, ends, chordEdges, chords };
  }

  it('relief-60 CITY seed 9: stage 2\'s water gates are read as stage 2\'s — each wall edge over the river that is its gate\'s chord between the gate\'s two bank pins reads gated; read with stage 1\'s records only, every one reads ungated', { timeout: HEAVY }, () => {
    const { d, p, commit, slice, water, s5, id, gates, over, ends, chordEdges, chords } = later();
    const k = d.model.kernel;
    expect(d.report.bugs.filter((b) => ['S1', 'S3', 'S4', 'S5'].includes(b.stage))).toEqual([]);
    expect(commit.waterGates).toEqual([]);
    expect(gates.length).toBeGreaterThanOrEqual(1);
    // S5's gates hold no stage-1 water gate: stage 1's list is S4's (main gates only)
    expect(s5.gates.filter((g) => g.enceinte === commit.enceinte.id && g.kind === 'water')).toEqual([]);
    // stage 2's wall meets the river, and at least one of its gates is a chord between its two bank pins
    expect(over.length).toBeGreaterThanOrEqual(1);
    expect(chordEdges.length).toBeGreaterThanOrEqual(1);
    let onShore = 0;
    for (const q of ends.values()) for (const v of q) if (incident(p, v).some((x) => (x.role === 'shore' || x.role === 'bank') && water.bodies.some((b) => b.id === x.entity))) onShore += 1;
    // the receipt with S5's output: enceinte:2's row equals the independent reading, its strips read
    const r = waterGateReceipt(k, p, water, commit, slice, s5);
    const row = r.enceintes.find((e) => e.enceinte === id);
    expect(row).toMatchObject({
      stage: 2,
      recorded: true,
      gates: gates.length,
      wallOverWater: over.length,
      wallOverWaterGated: chordEdges.length,
      gatesWithOneEdge: chords.length,
      endsResolved: [...ends.values()].reduce((t, q) => t + q.length, 0),
      endsOnShore: onShore,
      stripVerticesInWater: 0,
    });
    expect(row?.stripFaces).toBeGreaterThanOrEqual(2);
    expect(r.enceintes.map((e) => e.enceinte)).toEqual(s5.enceintes.map((e) => e.id));
    const rec = runRecord(d);
    expect(rec.waterGates).toEqual(r);
    // a gate that is no chord, or a wet edge that is none, fails the bar (cross-item; C-0291 (4) names seed 9's)
    const verdict = foldGroup('relief-60', 'default', [rec]).bars.waterGates.verdict;
    if (chords.length < gates.length || chordEdges.length < over.length || over.length !== gates.length) expect(verdict).toBe('fail');
    else expect(verdict).not.toBe('unobserved');
    // stage 1's records only (the receipt before N-54 (4)): enceinte:2 has no record, its wall over water no gate
    const old = waterGateReceipt(k, p, water, commit, slice);
    expect(old.enceintes.find((e) => e.enceinte === id)).toMatchObject({ stage: 0, recorded: false, gates: 0, wallOverWater: over.length, wallOverWaterGated: 0, gatesWithOneEdge: 0 });
    expect(foldGroup('relief-60', 'default', [{ ...rec, waterGates: old }]).bars.waterGates.verdict).toBe('fail');
  });

  it('a stage-2 bare chord still reads ungated: a chord whose gate S5 does not hold, a gate of another enceinte, a chord not between its gate\'s two bank pins', { timeout: HEAVY }, () => {
    const { d, p, commit, slice, water, s5, id, gates, over, chordEdges, chords } = later();
    const k = d.model.kernel;
    const rec = runRecord(d);
    const row = (r: ReturnType<typeof waterGateReceipt>, e: string) => r.enceintes.find((x) => x.enceinte === e);
    const fails = (r: ReturnType<typeof waterGateReceipt>): boolean => foldGroup('relief-60', 'default', [{ ...rec, waterGates: r }]).bars.waterGates.verdict === 'fail';
    // g0: a gate that is its chord (the first test shows one exists)
    const g0 = chords[0];
    expect(g0).toBeDefined();
    // (a) S5's output without g0: its chord carries a wall_gate row no gate of enceinte:2 holds
    const dropped = waterGateReceipt(k, p, water, commit, slice, { ...s5, gates: s5.gates.filter((g) => g.id !== g0.id) });
    expect(row(dropped, id)).toMatchObject({ gates: gates.length - 1, wallOverWater: over.length, wallOverWaterGated: chordEdges.length - 1, gatesWithOneEdge: chords.length - 1 });
    expect(fails(dropped)).toBe(true);
    // (b) enceinte:2's gates recorded as stage 1's: none gates stage 2's wall, and stage 1's wall has no chord for them
    const moved = waterGateReceipt(k, p, water, commit, slice, { ...s5, gates: s5.gates.map((g) => (g.enceinte === id ? { ...g, enceinte: commit.enceinte.id } : g)) });
    expect(row(moved, id)).toMatchObject({ gates: 0, wallOverWater: over.length, wallOverWaterGated: 0 });
    expect(row(moved, commit.enceinte.id)).toMatchObject({ gates: gates.length, gatesWithOneEdge: 0 });
    expect(fails(moved)).toBe(true);
    // (c) the strict span reading: g0's banks naming its ends in the wrong order resolve neither, so its edge — still
    // carrying exactly one wall_gate row of an enceinte:2 gate — is no chord between two bank pins and reads ungated
    const reversed = waterGateReceipt(k, p, water, commit, slice, { ...s5, gates: s5.gates.map((g) => (g.id === g0.id ? ({ ...g, banks: [g.banks?.[1], g.banks?.[0]] } as Gate) : g)) });
    const base = row(waterGateReceipt(k, p, water, commit, slice, s5), id);
    expect(row(reversed, id)).toMatchObject({ gates: gates.length, endsResolved: (base?.endsResolved ?? 0) - 2, wallOverWater: over.length, wallOverWaterGated: chordEdges.length - 1, gatesWithOneEdge: chords.length - 1 });
    expect(fails(reversed)).toBe(true);
  });
});

describe('containment never counts an S1 land face as held (§4.5; C-0265)', () => {
  it('relief-60, seed 2 (S5 refused, S6 not reached): over the arena S4 left, a perimeter at the frame meets land:<n> faces, each counted against the bar', { timeout: HEAVY }, () => {
    const d = derivation(fixtureNamed('relief-60') as SiteFixture, 2);
    expect(d.model.data.get('s6')).toBeUndefined();
    const p = ground(d);
    const k = d.model.kernel;
    // the frame's rectangle inset by 137 cm (no 50 m sample on its edge)
    const fr = (d.model.data.get('s3.slice') as S3Slice).site.frameRing;
    const x0 = Math.min(...fr.map((q) => q.x)) + 137;
    const x1 = Math.max(...fr.map((q) => q.x)) - 137;
    const y0 = Math.min(...fr.map((q) => q.y)) + 137;
    const y1 = Math.max(...fr.map((q) => q.y)) - 137;
    const frame = [{ x: x0, y: y0 }, { x: x1, y: y0 }, { x: x1, y: y1 }, { x: x0, y: y1 }] as LatticePoint[];
    const grid: LatticePoint[] = [];
    for (let x = Math.ceil(x0 / CONTAINMENT_STEP_CM) * CONTAINMENT_STEP_CM; x <= x1; x += CONTAINMENT_STEP_CM) for (let y = Math.ceil(y0 / CONTAINMENT_STEP_CM) * CONTAINMENT_STEP_CM; y <= y1; y += CONTAINMENT_STEP_CM) grid.push({ x, y } as LatticePoint);
    const s6 = { districts: [], perimeter: [...frame], hinterland: 'district:none', report: { landHa: 1, nd: 1, unowned: 0, leftovers: 0, belowFloor: 0, merges: 0 }, grow: { grown: [] } } as unknown as S6Output;
    const r = districtReceipt(k, p, s6);
    // the samples' owners, read independently: S1's land components, the faces S6 would not claim, none
    let land = 0;
    let other = 0;
    for (const q of grid) {
      const loc = k.geom.pointLocate({ layer: 'ground', part: 0 } as PlatKey, 1, q);
      if (loc.on !== 'face') continue;
      const h = p.faces[loc.level].owner[loc.face];
      const owner = h >= 0 ? idOf(p, h) : null;
      if (owner !== null && owner.startsWith('land:')) land += 1;
      else if (owner !== null) other += 1;
    }
    expect(land).toBeGreaterThan(0);
    expect(r.samples).toBeGreaterThan(land);
    expect(r.samplesContained).toBe(other);
    expect(r.samplesInDistricts).toBe(0);
  });
});

