// M0-c-02: the strip stand-in (C-0033; §4.8 *Wall strips*, §4.6 "the wall is a barrier", §2.2 rule 7's `setback`):
// the inner setback line at band half + inner setback and the glacis line at band half + outer setback and glacis,
// read from walls.json's era row (8 m and 15 m at the default row), two L1 chains carrying the structural `setback`
// role, each stopping at the corridor of the way through each gate, so each strip is one face typed `wall_strip`;
// kerb(F) beside the wall stops at the strip, and a lane planned through the strip is refused by that barrier. The
// "0 lanes cross a strip" bar on real cuts is M0-b-03's and M0-c-06's.
import { describe, expect, it } from 'vitest';
import { booleans, buffer, roleNamed, STAGES, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { GateSite } from '@plat/model';
import { commitOuterRing, commitS3Batch, flatFixture, layStrips, s3Slice, siteContext, stripWidths, traceBase, WAY_SPAN_NODES } from '../../src/index.js';
import { closedChain, commitSite, densify, edgesWith, GROUND, insideRing, kernelFor, ringDist, segDist, smallCommitted, smallSite, WALL, wallsWith, type Committed } from './support.js';

/** The faces an owner holds at L1 and their outer rings. */
function ownedFaces(c: Committed, owner: string): { face: number; ring: LatticePoint[] }[] {
  const v = c.k.view(GROUND, 1);
  return v.faces().filter((f) => v.owner(f) === owner).map((f) => ({ face: f, ring: v.rings(f)[0] }));
}

/** The way's centreline near each gate (the route's lattice nodes about its gate edge) and its corridor half-width. */
function ways(c: Committed): { gate: LatticePoint; path: LatticePoint[]; h: number }[] {
  const h = c.site.tables.table('ways').pair('through', `widthM.${c.site.rung}`)[1] * 50;
  return c.slice.gates.map((g) => {
    const r = c.slice.routes.find((q) => q.ordinal === g.ordinal);
    if (r === undefined) throw new Error('no route');
    const nodes = r.nodes.slice(Math.max(0, g.routeIndex - WAY_SPAN_NODES), g.routeIndex + 2 + WAY_SPAN_NODES);
    return { gate: g.at, path: nodes.map((n) => c.slice.lattice.points[n]), h };
  });
}

function pathDist(p: { x: number; y: number }, path: readonly { x: number; y: number }[]): number {
  let best = Infinity;
  for (let i = 0; i + 1 < path.length; i += 1) best = Math.min(best, segDist(p, path[i], path[i + 1]));
  return best;
}

const SEEDS = [3, 5];

describe('the strips (C-0033)', () => {
  for (const seed of SEEDS) {
    it(`seed ${String(seed)}: each strip is one L1 face typed wall_strip, one per arc between gates on each side, beside the trace`, () => {
      const c = smallCommitted(seed);
      const n = c.slice.gates.length;
      expect(n).toBeGreaterThan(1);
      const inner = ownedFaces(c, 'wall_strip:1-inner');
      const outer = ownedFaces(c, 'wall_strip:1-outer');
      expect(inner).toHaveLength(n);
      expect(outer).toHaveLength(n);
      expect(c.commit.strips.faces).toEqual({ inner: n, outer: n });
      // The Enceinte's FaceRefs name exactly these faces.
      for (const [side, faces] of [['inner', inner], ['outer', outer]] as const) {
        const r = c.k.resolve(c.commit.enceinte.strips[side], GROUND);
        expect(r.view).toBe('faces');
        if (r.view === 'faces') expect([...r.faces].sort((a, b) => a - b)).toEqual(faces.map((f) => f.face).sort((a, b) => a - b));
      }
      // Each strip lies along the trace: on its side of the wall, within its width of it, touching it.
      const wall = closedChain(c.plat, WALL);
      const w = stripWidths(c.site.tables.table('walls').row('era.default'));
      for (const { ring } of inner) {
        for (const q of ring) expect(ringDist(q, wall)).toBeLessThanOrEqual(w.inner + 2);
        expect(ring.filter((q) => ringDist(q, wall) < 1).length).toBeGreaterThanOrEqual(2);
        const mid = ring.reduce((m, q) => (ringDist(q, wall) > ringDist(m, wall) ? q : m), ring[0]);
        expect(insideRing(wall, mid)).toBe(true);
      }
      for (const { ring } of outer) {
        for (const q of ring) expect(ringDist(q, wall)).toBeLessThanOrEqual(w.outer + 2);
        const far = ring.reduce((m, q) => (ringDist(q, wall) > ringDist(m, wall) ? q : m), ring[0]);
        expect(insideRing(wall, far)).toBe(false);
      }
      // Between two neighbouring gates along the trace lies exactly one inner and one outer strip.
      const order = c.slice.gates.map((g) => wall.findIndex((q) => q.x === g.at.x && q.y === g.at.y)).sort((a, b) => a - b);
      for (let i = 0; i < order.length; i += 1) {
        const a = order[i];
        const b = order[(i + 1) % order.length];
        const span = b > a ? b - a : b + wall.length - a;
        const mid = wall[(a + Math.floor(span / 2)) % wall.length];
        expect(inner.filter((f) => ringDist(mid, f.ring) < 1)).toHaveLength(1);
        expect(outer.filter((f) => ringDist(mid, f.ring) < 1)).toHaveLength(1);
      }
    }, 60_000);

    it(`seed ${String(seed)}: the strips end at each gate's corridor — none enters it, each reaches it`, () => {
      const c = smallCommitted(seed);
      const strips = [...ownedFaces(c, 'wall_strip:1-inner'), ...ownedFaces(c, 'wall_strip:1-outer')];
      for (const way of ways(c)) {
        let nearest = Infinity;
        for (const { ring } of strips) {
          for (const q of ring) {
            const d = pathDist(q, way.path);
            // No strip vertex inside the corridor (2 cm for the lattice's rounding of the buffer).
            expect(d).toBeGreaterThanOrEqual(way.h - 10);
            nearest = Math.min(nearest, d);
          }
          // Nor does a strip's side cross the way's centreline.
          for (let i = 0; i < ring.length; i += 1) {
            const a = ring[i];
            const b = ring[(i + 1) % ring.length];
            for (let j = 0; j + 1 < way.path.length; j += 1) {
              const p = way.path[j];
              const q = way.path[j + 1];
              const o1 = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
              const o2 = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
              const o3 = (q.x - p.x) * (a.y - p.y) - (q.y - p.y) * (a.x - p.x);
              const o4 = (q.x - p.x) * (b.y - p.y) - (q.y - p.y) * (b.x - p.x);
              expect(Math.sign(o1) !== Math.sign(o2) && Math.sign(o3) !== Math.sign(o4)).toBe(false);
            }
          }
        }
        // The strips come up to the corridor's edge (20 cm: the buffer's joins): one strip each side of the wall on each side of the way.
        expect(nearest).toBeLessThanOrEqual(way.h + 20);
        const atEdge = strips.filter(({ ring }) => ring.some((q) => Math.abs(pathDist(q, way.path) - way.h) <= 20));
        expect(atEdge.length).toBe(4);
      }
    }, 60_000);
  }

  it('the setback lines are L1 chains carrying the structural setback role on the enceinte; a strip cannot be merged away', () => {
    const c = smallCommitted(3);
    const es = edgesWith(c.plat, 'setback');
    expect(es.length).toBeGreaterThan(20);
    for (const e of es) {
      expect(e.level).toBe(1);
      expect(e.rows.filter((r) => r.role === 'setback')).toEqual([{ role: 'setback', entity: 'enceinte:1', ordinal: 0 }]);
    }
    expect(roleNamed('setback').structural).toBe(true);
    // A merge of a strip with the town face beside it would delete a setback edge: refused (§3.6, E_STRUCTURAL).
    const strip = ownedFaces(c, 'wall_strip:1-inner')[0].face;
    const v = c.k.plat(GROUND).version;
    const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000 };
    // The town face: the L1 face on the other side of the strip's setback line.
    const inner = c.commit.strips.lines.inner[0];
    const m = inner[Math.floor(inner.length / 2)];
    const wall = closedChain(c.plat, WALL);
    // A point 2 m beyond the setback line, away from the wall.
    let foot = wall[0];
    for (let i = 0; i < wall.length; i += 1) if (segDist(m, wall[i], wall[(i + 1) % wall.length]) < segDist(m, foot, foot)) foot = wall[i];
    const away = { x: m.x + ((m.x - foot.x) / Math.hypot(m.x - foot.x, m.y - foot.y)) * 200, y: m.y + ((m.y - foot.y) / Math.hypot(m.x - foot.x, m.y - foot.y)) * 200 };
    const across = c.k.view(GROUND, 1).pointLocate({ x: Math.round(away.x), y: Math.round(away.y) } as LatticePoint);
    expect(across.on).toBe('face');
    if (across.on !== 'face') return;
    const r = c.k.tx(spec, (o) => c.k.geom.mergeFaces(o, strip, across.face));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_STRUCTURAL');
    expect(c.k.plat(GROUND).version).toBe(v);
  });

  it('reads the strip widths from walls.json\'s era row: 8 m and 15 m at the default row, and a changed cell moves the line', () => {
    const c = smallCommitted(3);
    const row = c.site.tables.table('walls').row('era.default');
    expect(stripWidths(row)).toEqual({ inner: 800, outer: 1500 });
    expect(c.commit.strips.widthsCm).toEqual({ inner: 800, outer: 1500 });
    const wall = closedChain(c.plat, WALL);
    // Each line's vertices (its caps aside) at its width from the wall: the median within 2 cm, every one within the
    // kernel buffer's join accuracy (15 cm).
    const distances = (lines: readonly (readonly LatticePoint[])[]): number[] => lines.flatMap((l) => l.slice(2, -2).map((q) => ringDist(q, wall))).sort((a, b) => a - b);
    const median = (d: readonly number[]): number => d[Math.floor(d.length / 2)];
    const di = distances(c.commit.strips.lines.inner);
    const dout = distances(c.commit.strips.lines.outer);
    expect(Math.abs(median(di) - 800)).toBeLessThanOrEqual(2);
    expect(Math.abs(median(dout) - 1500)).toBeLessThanOrEqual(2);
    expect(Math.min(...di)).toBeGreaterThanOrEqual(785);
    expect(Math.max(...di)).toBeLessThanOrEqual(815);
    expect(Math.min(...dout)).toBeGreaterThanOrEqual(1485);
    expect(Math.max(...dout)).toBeLessThanOrEqual(1515);
    // The inner setback 9 m and the band 3 m: the inner line at 1.5 + 9 = 10.5 m, the glacis at 1.5 + 14 = 15.5 m.
    const tables = wallsWith('era.default', 'thicknessM', 3, wallsWith('era.default', 'innerSetbackM', 9));
    const d = commitSite(smallSite(3, { tables }));
    expect(d.commit.strips.widthsCm).toEqual({ inner: 1050, outer: 1550 });
    const wall2 = closedChain(d.plat, WALL);
    const di2 = d.commit.strips.lines.inner.flatMap((l) => l.slice(2, -2).map((q) => ringDist(q, wall2))).sort((a, b) => a - b);
    expect(Math.abs(median(di2) - 1050)).toBeLessThanOrEqual(2);
    expect(d.commit.enceinte.thicknessCm).toBe(300);
    expect(d.commit.enceinte.setbackCm).toEqual({ inner: 900, outer: 1400 });
  }, 60_000);

  it('a sealed town (N = 0): each strip is one ring face, the setback lines closed', () => {
    const c = commitSite(smallSite(3), {}, undefined, { requestedN: 0 });
    expect(c.slice.gates).toEqual([]);
    expect(ownedFaces(c, 'wall_strip:1-inner')).toHaveLength(1);
    expect(ownedFaces(c, 'wall_strip:1-outer')).toHaveLength(1);
    expect(c.commit.strips.lines.inner).toHaveLength(1);
    expect(c.commit.strips.lines.outer).toHaveLength(1);
    // Two closed setback runs, the inner one inside the wall and the outer one outside it.
    const runs = c.k.resolve({ role: 'setback', entity: 'enceinte:1' }, GROUND);
    expect(runs.view).toBe('edges');
    if (runs.view === 'edges') expect(runs.runs).toHaveLength(2);
    const wall = closedChain(c.plat, WALL);
    expect(insideRing(wall, c.commit.strips.lines.inner[0][0])).toBe(true);
    expect(insideRing(wall, c.commit.strips.lines.outer[0][0])).toBe(false);
  }, 60_000);
});

describe('the strips at the map border and from the arena alone', () => {
  it('a capped boundary near the border (EP-20\'s too-small frame): the glacis stops at the border, the outer strips still one face per arc, none taking a gate\'s corridor', () => {
    const c = commitSite(flatFixture(3, { frameAreaHa: 20, walledHa: 60 }));
    expect(c.slice.threshold.capped).toBe(true);
    const n = c.slice.gates.length;
    expect(n).toBeGreaterThan(1);
    expect(ownedFaces(c, 'wall_strip:1-inner')).toHaveLength(n);
    // The outer strips: at least one face per arc (where the wall nears the border closer than the glacis, the border
    // itself cuts an arc's strip in two — a note for M4, not a merge across a gate).
    expect(ownedFaces(c, 'wall_strip:1-outer').length).toBeGreaterThanOrEqual(n);
    // Some setback edge ends on the map border (the frame rectangle).
    const half = c.site.frame.widthCm / 2;
    const onBorder = edgesWith(c.plat, 'setback').filter((e) => [e.a, e.b].some((q) => Math.max(Math.abs(q.x), Math.abs(q.y)) >= half - 1));
    expect(onBorder.length).toBeGreaterThan(0);
    // No outer strip takes a way's corridor: no strip vertex inside it.
    const strips = ownedFaces(c, 'wall_strip:1-outer');
    for (const way of ways(c)) for (const { ring } of strips) for (const q of ring) expect(pathDist(q, way.path)).toBeGreaterThanOrEqual(way.h - 10);
  }, 60_000);

  it('a gate within the glacis width of the border: the outer strips stop at its way all the same (a cap out to the border)', () => {
    const site = smallSite(2);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    // The map border on L1 (S3's chain), then a town 10 m inside the frame's west side, a gate there and one east.
    const spec = { key: GROUND, level: 1 as const, ops: [], expect: [], onFail: 'reject' as const, batch: { kind: 'stage' as const, stage: STAGES.S3 as StageId }, stage: STAGES.S3 as StageId, rederivesFrom: STAGES.S3 as StageId, workLimit: 1_000_000 };
    expect(k.tx(spec, (o) => k.geom.insertChain(o, site.frameRing, [{ role: 'border', entity: site.terrain.id }], 'mandatory', { closed: true })).ok).toBe(true);
    const west = -site.frame.widthCm / 2 + 1000;
    const boundary = densify([[west, -30000], [-40000, -30000], [-40000, 30000], [west, 30000]]);
    const gates = [[west, 0], [-40000, 0]].map(([x, y], i) => ({ ordinal: i, at: { x, y } as LatticePoint, bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main' as const, forced: false }));
    const t = traceBase(boundary, gates, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, { costField: () => 0 });
    expect(t.ok).toBe(true);
    if (!t.ok) return;
    const stops = [
      { kind: 'way' as const, gate: 'gate:0', at: gates[0].at, path: [{ x: west + 5000, y: 0 }, gates[0].at, { x: west - 1000, y: 0 }], halfWidthCm: 700 },
      { kind: 'way' as const, gate: 'gate:1', at: gates[1].at, path: [{ x: -45000, y: 0 }, gates[1].at, { x: -35000, y: 0 }], halfWidthCm: 700 },
    ];
    const r = layStrips(t.value, site.tables.table('walls').row('era.default'), k, { stops, frame: site.frameRing });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.faces).toEqual({ inner: 2, outer: 2 });
    // The two caps out to the border at the west gate: setback chains from the trace's corridor crossings to the frame.
    const toBorder = r.value.lines.outer.filter((l) => l.length === 2 && l.some((q) => q.x === -site.frame.widthCm / 2));
    expect(toBorder).toHaveLength(2);
    const v = k.view(GROUND, 1);
    for (const f of v.faces().filter((g) => v.owner(g) === 'wall_strip:1-outer')) {
      for (const q of v.rings(f)[0]) expect(Math.abs(q.y) >= 690 || q.x > west + 100).toBe(true);
    }
  }, 60_000);

  it('layStrips reads its stops from the arena when none are given: each main gate\'s way along the trace\'s normal', () => {
    const site = smallSite(5);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const b = commitS3Batch(slice, k);
    expect(b.ok).toBe(true);
    if (!b.ok) return;
    const t = traceBase(slice.levelSet.outline, slice.gateSites, [b.value.plaza], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k);
    expect(t.ok).toBe(true);
    if (!t.ok) return;
    const row = site.tables.table('walls').row('era.default');
    expect(() => layStrips(t.value, row, k)).toThrow(RangeError);
    const r = layStrips(t.value, row, k, { wayHalfWidthCm: 700, frame: site.frameRing });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const n = slice.gates.length;
    expect(r.value.faces).toEqual({ inner: n, outer: n });
    const v = k.view(GROUND, 1);
    const strips = v.faces().filter((f) => (v.owner(f) ?? '').startsWith('wall_strip')).map((f) => v.rings(f)[0]);
    expect(strips).toHaveLength(2 * n);
    // No strip comes within 7 m (less the buffer's rounding) of a gate.
    for (const g of slice.gates) for (const ring of strips) for (const q of ring) expect(Math.hypot(q.x - g.at.x, q.y - g.at.y)).toBeGreaterThanOrEqual(690);
  }, 60_000);
});

describe('the wall is a barrier (§4.6): kerb(F) beside the wall stops at the strip', () => {
  /** kerb(F) of the L1 face at `at`, read inside an empty callback batch (the service reads the open transaction). */
  function kerbAt(c: Committed, at: LatticePoint): LatticePoint[][] {
    const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000 };
    let rings: LatticePoint[][] = [];
    const r = c.k.tx(spec, () => {
      const loc = c.k.geom.pointLocate(GROUND, 1, at);
      if (loc.on !== 'face') throw new Error('no face');
      const k = c.k.geom.kerb(loc.face);
      if (!k.ok) return k;
      rings = k.value.map((q) => q.map((p) => p));
      return { ok: true, value: null, warnings: [] };
    });
    if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
    return rings;
  }

  it('the town face\'s kerb meets no strip and keeps the inner setback distance from the wall outside the gates\' corridors', () => {
    const c = smallCommitted(3);
    // A point of the town face beside the wall: 12 m inside it, mid-arc.
    const inner = c.commit.strips.lines.inner[0];
    const m = inner[Math.floor(inner.length / 2)];
    const wall = closedChain(c.plat, WALL);
    // The town face: between the plaza and the wall (the plaza is its hole).
    const town = { x: Math.round((m.x + c.site.centre.x) / 2), y: Math.round((m.y + c.site.centre.y) / 2) } as LatticePoint;
    const kerb = kerbAt(c, town);
    const toward = (d: number): LatticePoint => {
      const l = Math.hypot(c.site.centre.x - m.x, c.site.centre.y - m.y);
      return { x: Math.round(m.x + ((c.site.centre.x - m.x) / l) * d), y: Math.round(m.y + ((c.site.centre.y - m.y) / l) * d) } as LatticePoint;
    };
    const beside = kerbAt(c, toward(200));
    // The face beside the wall is the town face.
    expect(beside).toEqual(kerb);
    const strips = [...ownedFaces(c, 'wall_strip:1-inner'), ...ownedFaces(c, 'wall_strip:1-outer')].map((f) => f.ring);
    const meet = booleans('intersection', kerb, strips, 'nonzero');
    expect(meet.ok).toBe(false);
    if (!meet.ok) expect(meet.detail).toBe('empty');
    const corridors = ways(c);
    for (const ring of kerb) {
      for (const q of ring) {
        const inCorridor = corridors.some((w) => pathDist(q, w.path) <= w.h + 20);
        if (!inCorridor) expect(ringDist(q, wall)).toBeGreaterThanOrEqual(785);
      }
    }
    // The kerb comes up to the setback line: its nearest point to the wall is the line itself.
    let near = Infinity;
    for (const ring of kerb) for (const q of ring) if (!corridors.some((w) => pathDist(q, w.path) <= w.h + 20)) near = Math.min(near, ringDist(q, wall));
    expect(near).toBeLessThanOrEqual(815);
  });

  it('a synthetic L1 lane planned through the strip is refused by the barrier; one inside the town is admitted', () => {
    const c = smallCommitted(3);
    const wall = closedChain(c.plat, WALL);
    const inner = c.commit.strips.lines.inner[0];
    const m = inner[Math.floor(inner.length / 2)];
    let foot = wall[0];
    let best = Infinity;
    for (let i = 0; i < wall.length; i += 1) {
      const a = wall[i];
      const b = wall[(i + 1) % wall.length];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const t = Math.max(0, Math.min(1, ((m.x - a.x) * dx + (m.y - a.y) * dy) / (dx * dx + dy * dy)));
      const f = { x: a.x + t * dx, y: a.y + t * dy };
      const d = Math.hypot(f.x - m.x, f.y - m.y);
      if (d < best) {
        best = d;
        foot = { x: f.x, y: f.y } as LatticePoint;
      }
    }
    const u = { x: (m.x - foot.x) / best, y: (m.y - foot.y) / best };
    const at = (d: number): LatticePoint => ({ x: Math.round(foot.x + u.x * d), y: Math.round(foot.y + u.y * d) }) as LatticePoint;
    // kerb(F) of the face beside the wall: the town face, 20 m in from the wall.
    const kerb = kerbAt(c, at(2000));
    // Planned on kerb(F): a lane is admitted when its corridor (a 2 m half-width) lies inside the kerb.
    const admitted = (a: LatticePoint, b: LatticePoint): boolean => {
      const lane = buffer([[a, b]], 200, 'round', 'flat');
      if (!lane.ok) throw new Error(lane.detail);
      const outside = booleans('difference', lane.value, kerb, 'nonzero');
      return !outside.ok && outside.detail === 'empty';
    };
    expect(admitted(at(4000), at(1500))).toBe(true);
    expect(admitted(at(4000), at(200))).toBe(false);
    // The lane's end in the strip lies in a face S8 never cuts: a wall strip.
    const end = c.k.view(GROUND, 1).pointLocate(at(400));
    expect(end.on).toBe('face');
    if (end.on === 'face') expect(c.k.view(GROUND, 1).owner(end.face)).toBe('wall_strip:1-inner');
  });
});
