// M0-a-03: §3.4's pointLocate(key, level, p) over the index and the face walk — on a vertex of level ≤ n, on a level-n
// route edge (named as a query names it), inside a level-n face, or — where level n holds no record there — inside the
// coarser record that is its own child at n (§2.2 rule 2), or outside every face; judged against a brute-force oracle
// on hand-built and random arenas, with the index all static and all in the grid.
import { describe, expect, it } from 'vitest';
import { isFaceLive, isVertexLive, type Plat } from '../../src/arena/index.js';
import { attachIndex, indexChange, levelItems, pointLocate, type Location } from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import {
  buildArena,
  CELLS,
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
});
