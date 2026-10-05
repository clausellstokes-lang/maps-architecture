// M0-d-05b: the overlap-anchored kinds take their candidates from the kernel's spatial index (§6.3; §3.3; M0-a-03's
// `query`): `indexCandidates` over a hand-built fresh arena — water bodies as owned L0 faces, a way as 'way' rows on
// L1 route edges — answers a box with the owners and the way entities that meet it, and the routine run on those
// candidates gives the outcomes it gives on its own box grid.
import {
  addRole,
  allocEdgePair,
  allocFace,
  allocVertex,
  attachIndex,
  createPlat,
  intern,
  isHalfEdgeLive,
  orient2d,
  type Cm,
  type Frame,
  type HalfEdgeId,
  type Level,
  type Plat,
  type PlatKey,
  type VertexId,
} from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { indexCandidates, match, M0_ANCHORS, resolveAnchors, type MatchEntity } from '../../src/index.js';
import { areaEntity, L, P, rect, wayEntity } from './support.js';

const TABLE = resolveAnchors(M0_ANCHORS, () => 30);
const GROUND: PlatKey = { layer: 'ground', part: 0 };
const FRAME: Frame = { widthCm: 200_000 as Cm, heightCm: 200_000 as Cm, aspect: 1, marginShare: 0.3 };

const quadrant = (dx: number, dy: number): number => (dx > 0 && dy >= 0 ? 0 : dx <= 0 && dy > 0 ? 1 : dx < 0 && dy <= 0 ? 2 : 3);

/** Links next / prev / out around every vertex by exact angle (the arena's rotation rule). */
function linkByAngle(p: Plat): void {
  const t = p.halfEdges;
  const byVertex = new Map<VertexId, HalfEdgeId[]>();
  for (let h = 0; h < 2 * p.slots.pair.top; h += 1) {
    if (!isHalfEdgeLive(p, h)) continue;
    const v = t.origin[h];
    const list = byVertex.get(v) ?? [];
    list.push(h);
    byVertex.set(v, list);
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  for (const [v, list] of byVertex) {
    const d = (h: HalfEdgeId): [number, number] => [X[t.origin[h ^ 1]] - X[v], Y[t.origin[h ^ 1]] - Y[v]];
    list.sort((a, b) => {
      const [ax, ay] = d(a);
      const [bx, by] = d(b);
      return quadrant(ax, ay) - quadrant(bx, by) || -Math.sign(orient2d(0, 0, ax, ay, bx, by));
    });
    const k = list.length;
    for (let i = 0; i < k; i += 1) {
      const e = list[i];
      const before = list[(i - 1 + k) % k];
      t.next[e ^ 1] = before;
      t.prev[before] = e ^ 1;
    }
    p.vertices.out[v] = list[0];
  }
}

interface Scene {
  plat: Plat;
  water: MatchEntity[];
  ways: MatchEntity[];
}

/** Three L0 squares owned by fresh water bodies and two L1 polylines carrying fresh ways' rows. */
function freshArena(): Scene {
  const p = createPlat(GROUND, FRAME);
  const squares: [string, number, number, number][] = [
    ['water:f1', 0, 0, 10_000],
    ['water:f2', 20_000, 0, 10_000],
    ['water:f3', 0, 30_000, 5_000],
  ];
  const outers: [string, HalfEdgeId][] = [];
  for (const [id, x, y, s] of squares) {
    const vs = [P(x, y), P(x + s, y), P(x + s, y + s), P(x, y + s)].map((q) => allocVertex(p, q as never, 0 as Level));
    const hs = vs.map((v, i) => allocEdgePair(p, v, vs[(i + 1) % 4], 0 as Level));
    outers.push([id, hs[0]]);
  }
  const lines: [string, [number, number][]][] = [
    ['way:f1', [[50_000, 0], [60_000, 0], [60_000, 10_000]]],
    ['way:f2', [[50_000, 20_000], [70_000, 20_000]]],
  ];
  const wayEdges: [string, HalfEdgeId[]][] = [];
  for (const [id, pts] of lines) {
    const vs = pts.map(([x, y]) => allocVertex(p, P(x, y) as never, 1 as Level));
    wayEdges.push([id, vs.slice(1).map((v, i) => allocEdgePair(p, vs[i], v, 1 as Level))]);
  }
  linkByAngle(p);
  for (const [id, h] of outers) allocFace(p, 0 as Level, { outer: h, kind: 1, owner: intern(p, id), stage: 0, parent: -1 });
  for (const [id, hs] of wayEdges) for (const h of hs) addRole(p, h, { role: 'way', entity: id }, 1 as Level);
  attachIndex(p, { gridCellCm: 5_000 });
  return {
    plat: p,
    water: squares.map(([id, x, y, s]) => areaEntity('water', id, rect(x, y, x + s, y + s), { lineage: L(id.length, 7) })),
    ways: lines.map(([id, pts]) => wayEntity(id, [null, null], pts, { lineage: L(id.length, 8) })),
  };
}

describe('the overlap-anchored kinds\' candidates from the kernel\'s spatial index (§6.3, §3.3)', () => {
  it('answers a box with the owners of the faces and the entities of the way rows that meet it, each once', () => {
    const { plat } = freshArena();
    const water = indexCandidates(plat, 0 as Level);
    expect([...water({ minX: 5_000, minY: 5_000, maxX: 25_000, maxY: 6_000 } as never)].sort()).toEqual(['water:f1', 'water:f2']);
    expect(water({ minX: 40_000, minY: 40_000, maxX: 41_000, maxY: 41_000 } as never)).toEqual([]);
    const ways = indexCandidates(plat, 1 as Level, 'way');
    expect(ways({ minX: 55_000, minY: -100, maxX: 65_000, maxY: 25_000 } as never).slice().sort()).toEqual(['way:f1', 'way:f2']);
    expect(ways({ minX: 59_000, minY: 1_000, maxX: 61_000, maxY: 2_000 } as never)).toEqual(['way:f1']);
    expect(() => indexCandidates(plat, 1 as Level, 'no-such-role' as never)).toThrow(/no role/);
  });

  it('the routine on the index\'s candidates gives the outcomes of its own box grid', () => {
    const { plat, water, ways } = freshArena();
    const old: MatchEntity[] = [
      areaEntity('water', 'water:o1', rect(500, 0, 10_500, 10_000)),
      areaEntity('water', 'water:o2', rect(20_000, 6_000, 30_000, 16_000)),
      areaEntity('water', 'water:o3', rect(0, 30_000, 2_000, 35_000)),
      wayEntity('way:o1', [null, null], [[50_000, 10], [60_010, 10], [60_010, 9_000]]),
      wayEntity('way:o2', [null, null], [[50_000, 20_000], [55_000, 20_000], [55_000, 40_000]]),
    ];
    const fresh = [...water, ...ways];
    const candidates = new Map([
      ['water', indexCandidates(plat, 0 as Level)],
      ['way', indexCandidates(plat, 1 as Level, 'way')],
    ]);
    const viaIndex = match(old, fresh, TABLE, { candidates });
    const viaGrid = match(old, fresh, TABLE);
    expect(viaIndex.outcomes).toEqual(viaGrid.outcomes);
    expect(viaIndex.old.get('water:o1')).toMatchObject({ outcome: 'succeed', fresh: 'water:f1', by: 'overlap' });
    // o2 meets f2 by 4 000 / 16 000 < 0.5: a tombstone superseded by it.
    expect(viaIndex.old.get('water:o2')).toMatchObject({ outcome: 'tombstone', supersededBy: 'water:f2' });
    expect(viaIndex.old.get('water:o3')?.outcome).toBe('tombstone');
    expect(viaIndex.old.get('way:o1')).toMatchObject({ outcome: 'succeed', fresh: 'way:f1', by: 'overlap' });
    expect(viaIndex.old.get('way:o2')).toMatchObject({ outcome: 'tombstone', supersededBy: 'way:f2' });
  });
});
