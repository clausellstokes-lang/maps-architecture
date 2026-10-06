// M0-e-03's L0 water batch on hand-built water (§4.1's S1 row; §4.2 S1 (8): "water faces enter L0 with shore / bank
// edges; land components by flood fill"; §2.2 rule 7: coincident features are one edge with several roles): the outer
// ring first and alone; a river across the arena sharing the ring's edge where it reaches it; a tributary meeting its
// river; the basic estuary; a closed channel round an island; the batch's refusal writing nothing.
import { rowKey, rowsOn, STAGES, type Frame, type Kernel, type Plat } from '@plat/kernel';
import type { Cm, CmArray, WaterBody } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { GROUND_KEY } from '../../src/terrain/index.js';
import { landComponents, leftFaces, outerRingBatch, reachOf, splitEstuary, waterFaces, waterPolygons, type WaterReach } from '../../src/water/index.js';
import { ground, pt } from './support.js';

/** A 1 000 m × 600 m arena (frame 500 m × 300 m, margin ½). */
const FRAME: Frame = { widthCm: 50_000 as Cm, heightCm: 30_000 as Cm, aspect: 5 / 3, marginShare: 0.5 };
const REACH = reachOf(FRAME);
const OPTS = { key: GROUND_KEY, stage: STAGES.S1, workLimit: 1e9 };
const LIFE = { existence: 'generated' as const, flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

function body(id: string, kind: WaterBody['kind'], course: [number, number][], width: number, extra: Partial<WaterBody> = {}): WaterBody {
  return {
    id,
    kind,
    face: { owner: id, level: 0 },
    shore: { role: 'shore', entity: id },
    course: course.map(([x, y]) => pt(x, y)),
    widthProfile: Int32Array.from(course.map(() => width)) as CmArray,
    lifecycle: LIFE,
    ...extra,
  };
}

/** The river along y = 0 from the west edge to the east edge, a course point every 50 m, 20 m wide. */
function river(): WaterBody {
  const c: [number, number][] = [];
  for (let x = -50_000; x <= 50_000; x += 5000) c.push([x, 0]);
  return body('water:river:0', 'river', c, 2000);
}

/** Runs the ring and the water batches over bodies; returns the arena, the façade and the batch's result. */
function build(bodies: WaterBody[], mouth?: 'estuary'): { plat: Plat; kernel: Kernel; reaches: WaterReach[]; land: number; faces: number[][] } {
  const { plat, kernel } = ground(FRAME);
  const polys = waterPolygons(splitEstuary(bodies, REACH, mouth), REACH);
  if (!polys.ok) throw new Error(polys.detail);
  const ring = outerRingBatch(kernel, 'terrain:ground', REACH, OPTS);
  if (!ring.ok) throw new Error(ring.detail);
  const r = waterFaces(polys.value.reaches, kernel, { ...OPTS, sites: [], bridgeIds: [] });
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
  return { plat, kernel, reaches: polys.value.reaches, land: r.value.land.length, faces: r.value.faces };
}

/** Every live L0 edge pair as its rows' texts, keyed by "x0,y0 x1,y1" (ends sorted). */
function edges(p: Plat): { rows: string[]; faces: [number, number] }[] {
  const left = leftFaces(p);
  const seen = new Set<number>();
  const out: { rows: string[]; faces: [number, number] }[] = [];
  for (const [h] of left) {
    if (seen.has(h >> 1)) continue;
    seen.add(h >> 1);
    out.push({ rows: rowsOn(p, 'edge', h).map((r) => `${rowKey(p, r).role} ${rowKey(p, r).entity}`).sort(), faces: [left.get(h) ?? -1, left.get(h ^ 1) ?? -1] });
  }
  return out;
}

describe('§4.1\'s S1 row: the outer ring first', () => {
  it('committed alone, the ring gives one L0 face, every edge of it carrying (margin, terrain): a boundary before any water', () => {
    const { plat, kernel } = ground(FRAME);
    const r = outerRingBatch(kernel, 'terrain:ground', REACH, OPTS);
    expect(r.ok).toBe(true);
    const faces = kernel.view(GROUND_KEY, 0).faces();
    expect(faces).toHaveLength(1);
    expect(kernel.view(GROUND_KEY, 0).rings(faces[0])).toEqual([[pt(-50_000, -30_000), pt(50_000, -30_000), pt(50_000, 30_000), pt(-50_000, 30_000)]]);
    for (const e of edges(plat)) expect(e.rows).toEqual(['margin terrain:ground']);
    // the ring resolves as one closed chain of the terrain entity
    const res = kernel.resolve({ role: 'margin', entity: 'terrain:ground' }, GROUND_KEY);
    expect(res.view === 'edges' && res.runs.length).toBe(1);
  });
});

describe('§4.2 S1 (8): water faces with shore and bank edges; land components by flood fill', () => {
  it('a river across the arena: one water face owned by it; two land components; shore on its every edge, bank where land lies beside it, the ring\'s edge shared (margin and shore, one edge)', () => {
    const { plat, kernel, land, faces } = build([river()]);
    expect(land).toBe(2);
    expect(faces).toEqual([[expect.any(Number)]]);
    const view = kernel.view(GROUND_KEY, 0);
    const all = view.faces();
    expect(all).toHaveLength(3);
    // every face owned: the river's, land:0, land:1
    expect(all.map((f) => view.owner(f)).sort()).toEqual(['land:0', 'land:1', 'water:river:0']);
    const water = faces[0][0];
    let sharedWithRing = 0;
    let banks = 0;
    for (const e of edges(plat)) {
      const onWater = e.faces.includes(water);
      if (!onWater) {
        expect(e.rows).toEqual(['margin terrain:ground']);
        continue;
      }
      expect(e.rows).toContain('shore water:river:0');
      const outside = e.faces.includes(-1);
      if (outside) {
        // the river reaching the ring: one edge carrying both roles, no bank
        expect(e.rows).toEqual(['margin terrain:ground', 'shore water:river:0']);
        sharedWithRing += 1;
      } else {
        expect(e.rows).toEqual(['bank water:river:0', 'shore water:river:0']);
        banks += 1;
      }
    }
    expect(sharedWithRing).toBe(2);
    expect(banks).toBe(2); // a straight river: one bank edge on each side
    // the land faces are those landComponents finds again from the arena alone
    const again = landComponents(plat);
    expect(again.map((c) => c.id)).toEqual(['land:0', 'land:1']);
    expect(again.flatMap((c) => c.faces).sort()).toEqual(all.filter((f) => f !== water).sort());
  });

  it('a tributary meeting its river: its own face, the edge between the two bodies shore of both and no bank; three land components', () => {
    const trib = body('water:tributary:0', 'tributary', [[0, 30_000], [0, 20_000], [0, 10_000], [0, 3000]], 600, { flowTo: 'water:river:0' });
    const { plat, kernel, land, faces } = build([river(), trib]);
    expect(land).toBe(3);
    expect(faces.map((f) => f.length)).toEqual([1, 1]);
    const view = kernel.view(GROUND_KEY, 0);
    expect(view.owner(faces[1][0])).toBe('water:tributary:0');
    const between = edges(plat).filter((e) => e.faces.includes(faces[0][0]) && e.faces.includes(faces[1][0]));
    expect(between.length).toBeGreaterThan(0);
    for (const e of between) expect(e.rows).toEqual(['shore water:river:0', 'shore water:tributary:0']);
    // the tributary's land-facing edges are its banks; its edge on the ring is margin and shore
    for (const e of edges(plat).filter((q) => q.faces.includes(faces[1][0]) && !q.faces.includes(faces[0][0]))) {
      expect(e.rows.includes('bank water:tributary:0') !== e.faces.includes(-1)).toBe(true);
    }
  });

  it('the basic estuary: mouth `estuary` splits the river\'s last 400 m off as a body of kind estuary, flowing from it, with its own face', () => {
    const bodies = splitEstuary([river()], REACH, 'estuary');
    expect(bodies.map((b) => [b.id, b.kind, b.flowTo, b.flowFrom])).toEqual([
      ['water:river:0', 'river', 'water:estuary:0', undefined],
      ['water:estuary:0', 'estuary', undefined, 'water:river:0'],
    ]);
    expect(bodies[1].course?.[0]).toEqual(pt(10_000, 0));
    expect(bodies[0].course?.at(-1)).toEqual(pt(10_000, 0));
    const { plat, kernel, faces, land } = build([river()], 'estuary');
    expect(land).toBe(2);
    const view = kernel.view(GROUND_KEY, 0);
    expect(faces.map((f) => view.owner(f[0]))).toEqual(['water:river:0', 'water:estuary:0']);
    const between = edges(plat).filter((e) => e.faces.includes(faces[0][0]) && e.faces.includes(faces[1][0]));
    expect(between.length).toBeGreaterThan(0);
    for (const e of between) expect(e.rows).toEqual(['shore water:estuary:0', 'shore water:river:0']);
    // no estuary without the mouth, nor on a river shorter than twice its length
    expect(splitEstuary([river()], REACH, 'none')).toHaveLength(1);
    // a 600 m river: its estuary would leave the river 200 m, under the estuary's own 400 m
    const short = body('water:river:0', 'river', [[-10_000, 0], [50_000, 0]], 2000);
    expect(splitEstuary([short], REACH, 'estuary')).toHaveLength(1);
    // an 800 m one splits
    const long = body('water:river:0', 'river', [[-30_000, 0], [50_000, 0]], 2000);
    expect(splitEstuary([long], REACH, 'estuary')).toHaveLength(2);
  });

  it('a channel round an island: two land components (the island and the land outside), bank on both of its rings', () => {
    const outer = [pt(-20_000, -15_000), pt(20_000, -15_000), pt(20_000, 15_000), pt(-20_000, 15_000)];
    const hole = [pt(-10_000, -5000), pt(-10_000, 5000), pt(10_000, 5000), pt(10_000, -5000)];
    const reach: WaterReach = { body: body('water:river:0', 'river', [[-15_000, -10_000], [15_000, -10_000]], 1000), parts: [{ rings: [outer, hole], seeds: [pt(0, -10_000), pt(0, 10_000)] }] };
    const { plat, kernel } = ground(FRAME);
    expect(outerRingBatch(kernel, 'terrain:ground', REACH, OPTS).ok).toBe(true);
    const r = waterFaces([reach], kernel, { ...OPTS, sites: [], bridgeIds: [] });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.land.map((c) => c.faces.length)).toEqual([1, 1]);
    const view = kernel.view(GROUND_KEY, 0);
    expect(view.faces()).toHaveLength(3);
    for (const e of edges(plat)) {
      if (e.rows.includes('margin terrain:ground')) continue;
      expect(e.rows).toEqual(['bank water:river:0', 'shore water:river:0']);
    }
    // every face assigned, and the island is a component of its own
    expect(view.faces().every((f) => view.owner(f) !== null)).toBe(true);
    const island = view.pointLocate(pt(0, 0));
    expect(island.on === 'face' && view.owner(island.face)).toBe('land:1');
  });

  it('detect and refuse: two bodies claiming one face is E_INVARIANT, and the batch writes nothing', () => {
    const { plat, kernel } = ground(FRAME);
    expect(outerRingBatch(kernel, 'terrain:ground', REACH, OPTS).ok).toBe(true);
    const v = plat.version;
    const ring = [pt(-10_000, -5000), pt(10_000, -5000), pt(10_000, 5000), pt(-10_000, 5000)];
    const a: WaterReach = { body: body('water:river:0', 'river', [[-5000, 0], [5000, 0]], 1000), parts: [{ rings: [ring], seeds: [pt(0, 0)] }] };
    const b: WaterReach = { body: body('water:tributary:0', 'tributary', [[-5000, 0], [5000, 0]], 1000), parts: [{ rings: [ring], seeds: [pt(1000, 0)] }] };
    const r = waterFaces([a, b], kernel, { ...OPTS, sites: [], bridgeIds: [] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_INVARIANT');
    expect(plat.version).toBe(v);
    expect(kernel.view(GROUND_KEY, 0).faces()).toHaveLength(1);
    // a body whose seeds find no face (a seed on its own shore) is refused too
    const c: WaterReach = { body: body('water:river:0', 'river', [[-5000, 0], [5000, 0]], 1000), parts: [{ rings: [ring], seeds: [pt(10_000, 0)] }] };
    const r2 = waterFaces([c], kernel, { ...OPTS, sites: [], bridgeIds: [] });
    expect(r2.ok).toBe(false);
    if (!r2.ok) expect(r2.code).toBe('E_INVARIANT');
    expect(plat.version).toBe(v);
  });
});

