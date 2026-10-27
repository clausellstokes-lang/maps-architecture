// M0-c-02: the S3 slice's commits through the façade — §4.1's S1 row (the arena's outer ring, one closed `margin` chain
// on the Terrain entity, every L0 face bounded before any water exists) and S3 row (the map border on L1, one closed
// `border` chain crossing no L0 edge; the plaza as a barrier face carrying `reserved`, C-0032 (12)).
import { describe, expect, it } from 'vitest';
import { arenaReach } from '@plat/site';
import { commitOuterRing, commitS3Batch, commitS3Slice, flatFixture, outerRing, PLAZA_ID } from '../../src/index.js';
import { STAGES, type StageId } from '@plat/kernel';
import { area2, closedChain, edgesOf, edgesWith, GROUND, handBuildWater, insideRing, kernelFor, P, ringDist, riverRing, smallCommitted, smallSite, verticesWith, WALL } from './support.js';
import { s3Slice } from '../../src/index.js';

const key = (q: { x: number; y: number }): string => `${String(q.x)},${String(q.y)}`;
const sameRing = (a: readonly { x: number; y: number }[], b: readonly { x: number; y: number }[]): boolean => {
  if (a.length !== b.length) return false;
  const start = a.findIndex((q) => q.x === b[0].x && q.y === b[0].y);
  if (start < 0) return false;
  return b.every((q, i) => key(a[(start + i) % a.length]) === key(q));
};

describe('the outer ring (§4.1 S1: the frame plus its context margin, one closed margin chain)', () => {
  it('is one closed margin chain on the Terrain entity at the frame plus the margin on every side, and the one L0 face is bounded by it', () => {
    const site = smallSite(3);
    const { plat, k } = kernelFor(site);
    expect(k.view(GROUND, 0).faces()).toEqual([]);
    const r = commitOuterRing(site, k);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value).toEqual({ role: 'margin', entity: site.terrain.id });
    // The reach is the frame's half plus its margin share of each side (§3.2 (9)).
    const reach = arenaReach(site.frame);
    expect(reach.x).toBe(Math.ceil(site.frame.widthCm * (0.5 + site.frame.marginShare)));
    const ring = closedChain(plat, { role: 'margin', entity: site.terrain.id });
    expect(ring).toHaveLength(4);
    expect(sameRing(ring, [P(-reach.x, -reach.y), P(reach.x, -reach.y), P(reach.x, reach.y), P(-reach.x, reach.y)]) || sameRing([...ring].reverse(), [P(-reach.x, -reach.y), P(reach.x, -reach.y), P(reach.x, reach.y), P(-reach.x, reach.y)])).toBe(true);
    // Every edge of the arena is the margin chain's, at L0, and structural margin only.
    const all = edgesOf(plat);
    expect(all).toHaveLength(4);
    for (const e of all) {
      expect(e.level).toBe(0);
      expect(e.rows).toEqual([{ role: 'margin', entity: site.terrain.id, ordinal: 0 }]);
    }
    // Every L0 face has a boundary before any water exists: one face, its outer ring the margin chain.
    const v0 = k.view(GROUND, 0);
    const faces = v0.faces();
    expect(faces).toHaveLength(1);
    const rings = v0.rings(faces[0]);
    expect(rings).toHaveLength(1);
    expect(area2(rings[0])).toBeGreaterThan(0);
    expect(sameRing(rings[0], outerRing(site))).toBe(true);
  });
});

describe('S3\'s L1 batch (§4.1 S3: the map border, then the plaza as a barrier face)', () => {
  it('lays the border as one closed L1 chain on the frame rectangle carrying border on the Terrain entity, and adds no L0 edge', () => {
    const c = smallCommitted(3);
    const ring = closedChain(c.plat, { role: 'border', entity: c.site.terrain.id });
    expect(ring).toHaveLength(4);
    const frame = c.site.frameRing;
    expect(sameRing(ring, frame) || sameRing([...ring].reverse(), frame)).toBe(true);
    for (const e of edgesWith(c.plat, 'border')) {
      expect(e.level).toBe(1);
      expect(e.rows.filter((r) => r.role === 'border')).toEqual([{ role: 'border', entity: c.site.terrain.id, ordinal: 0 }]);
    }
    // The only L0 edges are the outer ring's four: the border crossed no L0 edge and added none.
    const l0 = edgesOf(c.plat).filter((e) => e.level === 0);
    expect(l0).toHaveLength(4);
    for (const e of l0) expect(e.rows.map((r) => r.role)).toEqual(['margin']);
  });

  it('lays the border across water as across land: an L1 chain, the water\'s L0 edges unsplit at L0 and the water face whole at L0', () => {
    const site = smallSite(3);
    const { plat, k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    // A water face straddling the frame's east side.
    const half = site.frame.widthCm / 2;
    handBuildWater(k, riverRing(half - 5000, half + 5000, -20000, 20000), 'lake:1');
    const l0Before = edgesOf(plat).filter((e) => e.level === 0).map((e) => `${key(e.a)}|${key(e.b)}`).sort();
    const facesBefore = k.view(GROUND, 0).faces().length;
    const r = commitS3Batch(s3Slice(site), k);
    expect(r.ok).toBe(true);
    // The L0 level is unchanged: the same edges between the same points and the same faces.
    const l0After = edgesOf(plat).filter((e) => e.level === 0);
    const atL0 = new Set(l0Before);
    // An L1 vertex on an L0 edge splits it into L0 pieces only in the arena's tables; at L0 the edge set between L0 vertices is the same chain.
    expect(k.view(GROUND, 0).faces()).toHaveLength(facesBefore);
    for (const e of edgesWith(plat, 'border')) expect(e.level).toBe(1);
    // One border edge lies across the water, as a deck span lies across its water.
    const lake = riverRing(half - 5000, half + 5000, -20000, 20000);
    expect(edgesWith(plat, 'border').filter((e) => insideRing(lake, { x: (e.a.x + e.b.x) / 2, y: (e.a.y + e.b.y) / 2 }))).toHaveLength(1);
    // Each L0 piece lies on an L0 edge that existed before (no new L0 line).
    for (const e of l0After) {
      const onOld = l0Before.some((s) => {
        const [a, b] = s.split('|').map((t) => t.split(',').map(Number));
        const cross = (b[0] - a[0]) * (e.a.y - a[1]) - (b[1] - a[1]) * (e.a.x - a[0]);
        const cross2 = (b[0] - a[0]) * (e.b.y - a[1]) - (b[1] - a[1]) * (e.b.x - a[0]);
        return cross === 0 && cross2 === 0;
      });
      expect(onOld || atL0.has(`${key(e.a)}|${key(e.b)}`)).toBe(true);
    }
  });

  it('lays the plaza as a barrier face: its ring carrying the structural reserved role, its vertices the attach rows in ring order, the face owned by the reservation', () => {
    const c = smallCommitted(3);
    const plaza = c.slice.plaza.ring;
    const ring = closedChain(c.plat, { role: 'reserved', entity: PLAZA_ID });
    expect(sameRing(ring, plaza)).toBe(true);
    for (const e of edgesWith(c.plat, 'reserved', PLAZA_ID)) expect(e.level).toBe(1);
    plaza.forEach((q, i) => {
      expect(verticesWith(c.plat, 'attach', PLAZA_ID, i)).toEqual([q]);
      expect(c.commit.plaza.attach[i]).toEqual({ role: 'attach', entity: PLAZA_ID, ordinal: i });
    });
    // The face: resolved by the reservation's FaceRef, its ring the plaza.
    const r = c.k.resolve(c.commit.plaza.face, GROUND);
    expect(r.view).toBe('faces');
    if (r.view !== 'faces') return;
    expect(r.faces).toHaveLength(1);
    expect(sameRing(c.k.view(GROUND, 1).rings(r.faces[0])[0], plaza)).toBe(true);
    expect(c.k.view(GROUND, 1).owner(r.faces[0])).toBe(PLAZA_ID);
    expect(c.commit.plaza.kind).toBe('plaza');
    expect(c.commit.plaza.face).toEqual({ owner: PLAZA_ID, level: 1 });
  });

  it('is one declared batch: the border, the plaza ring and its owner commit together or not at all', () => {
    const site = smallSite(3);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    const v = k.plat(GROUND).version;
    expect(commitS3Batch(slice, k).ok).toBe(true);
    expect(k.plat(GROUND).version).toBe(v + 1);
  });
});

describe('the slice\'s trace keeps out of the plaza (N-39, A08: `traceWithStrips` hands the S3 batch\'s plaza to the strategy)', () => {
  it('a 3 ha town (its plaza 26.8 m inside the outline) under a field pulling the line toward the plaza: the trace is held on its ring, never inside', () => {
    const site = flatFixture(1, { frameAreaHa: 400, walledHa: 3 });
    const slice = s3Slice(site);
    const ring = slice.plaza.ring;
    const c = { x: ring.reduce((t, q) => t + q.x, 0) / ring.length, y: ring.reduce((t, q) => t + q.y, 0) / ring.length };
    const { plat, k } = kernelFor(site);
    const r = commitS3Slice(slice, k, { costField: (p) => Math.hypot(p.x - c.x, p.y - c.y) / 100 });
    expect(r.ok ? 'ok' : `${r.code} ${r.detail}`).toBe('ok');
    const wall = closedChain(plat, WALL);
    expect(wall.filter((q) => insideRing(ring, q))).toEqual([]);
    // The pull reaches the plaza: some wall vertex stands on its ring.
    expect(wall.some((q) => ringDist(q, ring) < 1)).toBe(true);
  }, 120_000);
});

describe('the slice\'s commits report the trace\'s warnings, then the strips\' (N-39, A07; C-0336)', () => {
  it('a way\'s vertex 10 cm off the boundary draws the trace onto it: commitS3Slice\'s warnings begin with the trace\'s W_ATTRACTED there', () => {
    const site = smallSite(3);
    const slice = s3Slice(site);
    const { k } = kernelFor(site);
    expect(commitOuterRing(site, k).ok).toBe(true);
    // A stub on L1 from 10 cm outside the middle of the outline's sixth side, 3 m out (S4 lays ways at L1).
    const spec = { key: GROUND, level: 1 as const, ops: [], expect: [], onFail: 'reject' as const, batch: { kind: 'stage' as const, stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };
    const X = P(-8274, -22959);
    expect(k.tx(spec, (o) => k.geom.insertChain(o, [X, P(-8266, -23259)], [{ role: 'way', entity: 'way:x' }], 'mandatory', {})).ok).toBe(true);
    const r = commitS3Slice(slice, k, { outerRing: 'present' });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.warnings[0]).toEqual({ code: 'W_ATTRACTED', count: 1, at: X });
  }, 60_000);
});
