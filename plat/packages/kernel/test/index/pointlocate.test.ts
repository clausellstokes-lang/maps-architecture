// M0-a-03: §3.4's pointLocate(key, level, p) over the index and the face walk — on a vertex of level ≤ n, on a level-n
// route edge (named as a query names it), inside a level-n face, or — where level n holds no record there — inside the
// coarser record that is its own child at n (§2.2 rule 2), or outside every face; judged against a brute-force oracle
// on hand-built and random arenas, with the index all static and all in the grid — finer vertices off their coarser
// routes one level deep (OFFLINE) and three levels deep (CHAIN, also rebuilt and mixed); a foreign key refused by name.
import { describe, expect, it } from 'vitest';
import { isFaceLive, isVertexLive, type Plat } from '../../src/arena/index.js';
import { attachIndex, indexChange, levelItems, pointLocate, rebuildAtStageEnd, type Location } from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import {
  buildArena,
  CELLS,
  CHAIN,
  cmpV,
  faceAt,
  generator,
  GROUND,
  intIn,
  LAKE,
  LEVELS,
  OFFLINE,
  oraclePieces,
  oracleRouteRings,
  oracleRuns,
  pt,
  QUARTERS,
  randomArena,
  winding,
} from './support.js';

/** A generous timeout: the machine is shared (C-0025), so a test's wall-clock is contended. */
const SLOW = 120_000;

type Expected = { on: 'vertex'; vertex: number } | { on: 'edge'; edge: number } | { on: 'face'; level: Level; face: number } | { on: 'none' };

function onPiece(p: Plat, ax: number, ay: number, bx: number, by: number, x: number, y: number): boolean {
  const o = (bx - ax) * (y - ay) - (by - ay) * (x - ax);
  return o === 0 && Math.min(ax, bx) <= x && x <= Math.max(ax, bx) && Math.min(ay, by) <= y && y <= Math.max(ay, by);
}

/** The oracle's location: a vertex, a piece (its representative), else the deepest record ≤ n containing the point. */
function oracleLocate(p: Plat, n: Level, x: number, y: number): Expected {
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && p.vertices.level[v] <= n && p.vertices.x[v] === x && p.vertices.y[v] === y) return { on: 'vertex', vertex: v };
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const hits = oracleRuns(p)
    .filter((r) => r.level <= n)
    .flatMap((r) => oraclePieces(p, r, n))
    .filter((q) => onPiece(p, X[q.a], Y[q.a], X[q.b], Y[q.b], x, y))
    .sort((s, t) => cmpV(p, s.a, t.a) || cmpV(p, s.b, t.b));
  if (hits.length > 0) return { on: 'edge', edge: hits[0].edge };
  for (let m = n; m >= 0; m--) {
    for (let f = 0; f < p.slots.face[m].top; f++) {
      if (!isFaceLive(p, m as Level, f)) continue;
      const rings = oracleRouteRings(p, m as Level, f, n).map((r) => r.map((v) => pt(X[v], Y[v])));
      if (winding(rings[0], x, y) !== 0 && rings.slice(1).every((h) => winding(h, x, y) === 0)) return { on: 'face', level: m as Level, face: f };
    }
  }
  return { on: 'none' };
}

function strip(l: Location): Expected {
  if (l.on === 'vertex') return { on: 'vertex', vertex: l.vertex };
  if (l.on === 'edge') return { on: 'edge', edge: l.edge };
  if (l.on === 'face') return { on: 'face', level: l.level, face: l.face };
  return { on: 'none' };
}

/** Points to locate: every vertex, points on pieces, random points inside and outside, and the caller's extra points. */
function points(p: Plat, W: number, seed: number, extra: readonly [number, number][] = []): [number, number][] {
  const rnd = generator(seed);
  const out: [number, number][] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) out.push([p.vertices.x[v], p.vertices.y[v]]);
  for (const r of oracleRuns(p)) {
    for (const q of oraclePieces(p, r, 4)) {
      const ax = p.vertices.x[q.a];
      const ay = p.vertices.y[q.a];
      const dx = p.vertices.x[q.b] - ax;
      const dy = p.vertices.y[q.b] - ay;
      const len = Math.max(Math.abs(dx), Math.abs(dy));
      if (len >= 2 && (dx === 0 || dy === 0)) {
        const t = intIn(rnd, 1, len - 1);
        out.push([ax + Math.sign(dx) * t, ay + Math.sign(dy) * t]);
      }
    }
  }
  for (let i = 0; i < 120; i++) out.push([intIn(rnd, -60, W + 60), intIn(rnd, -60, W + 60)]);
  out.push(...extra);
  return out;
}

function judge(p: Plat, W: number, seed: number, extra: readonly [number, number][] = []): number {
  let n = 0;
  for (const level of LEVELS) {
    for (const [x, y] of points(p, W, seed, extra)) {
      expect(strip(pointLocate(p, GROUND, level, pt(x, y))), `L${level} at ${x},${y}`).toEqual(oracleLocate(p, level, x, y));
      n++;
    }
  }
  return n;
}

describe('pointLocate (§3.4)', () => {
  it('agrees with the oracle on the quarters arena at every level, static and through the grid', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    expect(judge(p, 1000, 1)).toBeGreaterThan(500);
    for (const level of LEVELS) for (const item of levelItems(p, level)) indexChange(p, item);
    judge(p, 1000, 2);
  }, SLOW);

  it('agrees with the oracle on random arenas', () => {
    for (let seed = 1; seed <= 6; seed++) judge(randomArena(seed, null).built.plat, 4000, seed);
  }, SLOW);

  it('names a coarser record that is its own child where level n holds none, a vertex only at its level or finer', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    // The south-east quarter has no L3 or L4 record: an L4 point there lies in the L2 record (its antenna's face).
    const se = pointLocate(p, GROUND, 4, pt(900, 100));
    expect(se.on === 'face' && se.level).toBe(2);
    expect(pointLocate(p, GROUND, 1, pt(900, 100))).toMatchObject({ on: 'face', level: 1 });
    // The L4 line's end (1000, 750) is a vertex at L4 and a point on the L0 side's route at L0 – L3.
    expect(pointLocate(p, GROUND, 4, pt(1000, 750))).toMatchObject({ on: 'vertex' });
    expect(pointLocate(p, GROUND, 3, pt(1000, 750))).toMatchObject({ on: 'edge' });
    expect(pointLocate(p, GROUND, 0, pt(5000, 5000))).toMatchObject({ on: 'none' });
    expect(() => pointLocate(p, GROUND, 0, { x: 0.5, y: 0 } as never)).toThrow(/lattice point/);
    // A foreign key is refused in a debug build (the tests' default), naming both keys as the arena spells them.
    expect(() => pointLocate(p, { layer: 'underground', part: 3 }, 2, pt(900, 100))).toThrow(/^index: query on arena ground\/0 was handed the key underground\/3$/);
  });

  it('names an L0 record down to L0: the lake (an L0 face with no L1 record) at L1 – L4, static and through the grid', () => {
    const b = buildArena(LAKE);
    const p = b.plat;
    attachIndex(p, { gridCellCm: CELLS });
    const lake = faceAt(b, 0, pt(1000, 1000));
    // The shore holds an L1 record (the L1 edge joins its two rings); the lake holds none.
    expect(b.faces[1]).toHaveLength(1);
    const inLake: [number, number][] = [[1000, 1000], [801, 801], [1199, 1199], [1000, 801]];
    for (const allGrid of [false, true]) {
      if (allGrid) for (const level of LEVELS) for (const item of levelItems(p, level)) indexChange(p, item);
      for (const level of LEVELS) {
        for (const [x, y] of inLake) expect(strip(pointLocate(p, GROUND, level, pt(x, y))), `L${level} at ${x},${y}`).toEqual({ on: 'face', level: 0, face: lake });
      }
      judge(p, 2000, allGrid ? 4 : 3, inLake);
    }
  }, SLOW);

  it('reads a coarser record on the level-n route: a finer vertex off its coarser route (OFFLINE), static and through the grid', () => {
    const b = buildArena(OFFLINE);
    const p = b.plat;
    attachIndex(p, { gridCellCm: CELLS });
    const upper = faceAt(b, 1, pt(500, 900));
    const lower = faceAt(b, 1, pt(500, 100));
    expect(upper).not.toBe(lower);
    // Between A–S and A–B, and between S–B and A–B: below A–B (the L1 route), above A–S or S–B (the L2 route).
    const sliver: [number, number][] = [[400, 501], [350, 501], [499, 501], [700, 502], [670, 502], [749, 502]];
    // Points around S, on and off both routes.
    const near: [number, number][] = [];
    for (let x = 300; x <= 750; x += 25) for (let y = 498; y <= 505; y++) near.push([x, y]);
    for (const allGrid of [false, true]) {
      if (allGrid) for (const level of LEVELS) for (const item of levelItems(p, level)) indexChange(p, item);
      for (const [x, y] of sliver) {
        expect(strip(pointLocate(p, GROUND, 1, pt(x, y))), `L1 at ${x},${y}`).toEqual({ on: 'face', level: 1, face: lower });
        // The upper L1 record is its own child at L2 – L4: named with its level, read on the level-n route through S.
        for (const level of [2, 3, 4] as const) {
          expect(strip(pointLocate(p, GROUND, level, pt(x, y))), `L${level} at ${x},${y}`).toEqual({ on: 'face', level: 1, face: upper });
        }
      }
      expect(pointLocate(p, GROUND, 2, pt(500, 501))).toMatchObject({ on: 'vertex' });
      expect(pointLocate(p, GROUND, 1, pt(500, 501))).toMatchObject({ on: 'face', level: 1, face: lower });
      judge(p, 1000, allGrid ? 6 : 5, [...sliver, ...near]);
    }
  }, SLOW);
  it('reads every coarser record on the level-n route three levels deep (CHAIN): static, grid, rebuilt, mixed', () => {
    const b = buildArena(CHAIN);
    const p = b.plat;
    attachIndex(p, { gridCellCm: CELLS });
    const lower = faceAt(b, 1, pt(1000, 500));
    const upper = faceAt(b, 1, pt(1000, 1500));
    const upperLeft = faceAt(b, 2, pt(300, 1500));
    expect(upper).not.toBe(lower);
    // The lower L1 face holds no finer record: it is its own child at L2 – L4.
    expect(LEVELS.map((n) => strip(pointLocate(p, GROUND, n, pt(1000, 500))))).toEqual([
      { on: 'face', level: 0, face: faceAt(b, 0, pt(1000, 500)) },
      ...[1, 2, 3, 4].map(() => ({ on: 'face', level: 1, face: lower })),
    ]);
    // Between the L1 route A–B and the L2 route A–S1 (below the first, above the second) and between the L2 route and
    // the L3 route A–S2–S1 (above the first, below the second): every lattice point of both slivers, found exactly.
    const above = (ax: number, ay: number, bx: number, by: number, x: number, y: number): number => Math.sign((bx - ax) * (y - ay) - (by - ay) * (x - ax));
    const l1l2: [number, number][] = [];
    const l2l3: [number, number][] = [];
    for (let x = 1; x < 2000; x++) {
      for (let y = 1000; y <= 1006; y++) {
        const r1 = above(0, 1000, 2000, 1006, x, y);
        const r2 = x < 1100 ? above(0, 1000, 1100, 1003, x, y) : above(1100, 1003, 2000, 1006, x, y);
        const r3 = x < 500 ? above(0, 1000, 500, 1002, x, y) : x < 1100 ? above(500, 1002, 1100, 1003, x, y) : r2;
        if (r1 < 0 && r2 > 0) l1l2.push([x, y]);
        if (r2 > 0 && r3 < 0) l2l3.push([x, y]);
      }
    }
    expect([l1l2.length, l2l3.length]).toEqual([298, 349]);
    // A point of each: (1050, 1003) lies in the lower L1 face at L1 and above the run from L2 on; (300, 1001) lies
    // above the run at L1 and L2 and in the lower L1 record, read on the L3 and L4 route, at L3 and L4.
    expect(strip(pointLocate(p, GROUND, 1, pt(1050, 1003)))).toEqual({ on: 'face', level: 1, face: lower });
    expect(pointLocate(p, GROUND, 2, pt(1050, 1003))).toMatchObject({ on: 'face', level: 2, face: upperLeft });
    expect(strip(pointLocate(p, GROUND, 1, pt(300, 1001)))).toEqual({ on: 'face', level: 1, face: upper });
    expect(strip(pointLocate(p, GROUND, 2, pt(300, 1001)))).toEqual({ on: 'face', level: 2, face: upperLeft });
    for (const n of [3, 4] as const) expect(strip(pointLocate(p, GROUND, n, pt(300, 1001))), `L${n}`).toEqual({ on: 'face', level: 1, face: lower });
    // Points along the run, on and off its four routes.
    const near: [number, number][] = [];
    for (let x = 0; x <= 2000; x += 20) for (let y = 998; y <= 1009; y++) near.push([x, y]);
    const extra = [...l1l2, ...l2l3, ...near];
    let n = judge(p, 2000, 7, extra);
    for (const level of LEVELS) for (const item of levelItems(p, level)) indexChange(p, item);
    n += judge(p, 2000, 8, extra);
    rebuildAtStageEnd(p);
    n += judge(p, 2000, 9, extra);
    let i = 0;
    for (const level of LEVELS) for (const item of levelItems(p, level)) if (i++ % 2 === 0) indexChange(p, item);
    n += judge(p, 2000, 10, extra);
    expect(n).toBeGreaterThan(4 * 5 * extra.length);
  }, SLOW);
});
