// M0-a-03: what each level's index holds (§3.3) — item keys (kind · 2³² + slot); route edges as maximal runs of one
// level's sub-edges through finer vertices, keyed by the handle pair leaving the lower (y, x) endpoint (a loop off one
// vertex leaves it toward its smaller neighbour), boxed over every vertex standing on the run and padded by the 0.71 cm
// hot pixel; their level-n pieces; the faces' level-n route rings; every level's items equal to the oracle's.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import {
  faceRouteRings,
  HOT_PIXEL_CM,
  isItemLive,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  itemBox,
  itemKey,
  keyKind,
  keySlot,
  levelItems,
  routeHandlePair,
  routePieces,
  routeRun,
} from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, generator, LEVELS, oraclePieces, oracleRouteRings, oracleRuns, pairOf, permutation, QUARTERS, randomSpec, vertexAtPoint, type ArenaSpec } from './support.js';

/** A generous timeout: the machine is shared (C-0025), so a test's wall-clock is contended. */
const SLOW = 120_000;

const at = (p: Plat, v: number): string => `${p.vertices.x[v]},${p.vertices.y[v]}`;

describe('item keys (§3.3: kind · 2³² + slot)', () => {
  it('round-trip every kind with slots up to 2³² − 1, exactly', () => {
    for (const kind of [ITEM_VERTEX, ITEM_EDGE, ITEM_FACE] as const) {
      for (const slot of [0, 1, 65_535, 2 ** 31, 2 ** 32 - 1]) {
        const k = itemKey(kind, slot);
        expect(k).toBe(kind * 2 ** 32 + slot);
        expect([keyKind(k), keySlot(k)]).toEqual([kind, slot]);
      }
    }
  });
});

/** An L1 loop off one L1 vertex (at the end of an L1 stem from the L0 bottom side), its other vertices L2 (finer). */
const LOOP: ArenaSpec = {
  vertices: [
    [0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0],
    [500, 0, 1], [500, 100, 1], // the stem; the loop's one L1 vertex is its top
    [700, 400, 2], [500, 700, 2], [300, 400, 2], // the loop's finer vertices
  ],
  edges: [
    [0, 4, 0], [4, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0],
    [4, 5, 1],
    [5, 6, 1], [6, 7, 1], [7, 8, 1], [8, 5, 1],
  ],
};

describe('route edges (§3.3 What each level’s index holds)', () => {
  it('the L0 bottom side of the quarters arena is one route edge through its L1 and L2 vertices, from its lower end', () => {
    const p = buildArena(QUARTERS).plat;
    const o = vertexAtPoint(p, 0, 0);
    const first = pairOf(p, o, vertexAtPoint(p, 250, 0));
    for (const e of [first, pairOf(p, vertexAtPoint(p, 750, 0), vertexAtPoint(p, 1000, 0))]) {
      for (const h of [2 * e, 2 * e + 1]) {
        const run = routeRun(p, h);
        expect(run.level).toBe(0);
        expect(run.halfEdges.map((g) => at(p, p.halfEdges.origin[g]))).toEqual(['0,0', '250,0', '500,0', '750,0']);
        expect(run.halfEdges[0] >> 1).toBe(first); // the handle: the pair leaving the lower end, whatever half-edge asked
        expect(routeHandlePair(p, h)).toBe(first);
      }
    }
    const run = routeRun(p, 2 * first);
    const ends = (n: Level): string[] => routePieces(p, run, n).map((q) => `${at(p, q.a)}>${at(p, q.b)}@${at(p, p.halfEdges.origin[q.edge])}`);
    expect(ends(0)).toEqual(['0,0>1000,0@0,0']);
    expect(ends(1)).toEqual(['0,0>500,0@0,0', '500,0>1000,0@500,0']);
    expect(ends(2)).toEqual(['0,0>250,0@0,0', '250,0>500,0@250,0', '500,0>750,0@500,0', '750,0>1000,0@750,0']);
    expect(() => routePieces(p, routeRun(p, 2 * pairOf(p, vertexAtPoint(p, 250, 0), vertexAtPoint(p, 250, 500))), 1)).toThrow(/no level-1 pieces/);
    expect(itemBox(p, { kind: ITEM_EDGE, level: 0, slot: first })).toEqual({ minX: -HOT_PIXEL_CM, minY: -HOT_PIXEL_CM, maxX: 1000 + HOT_PIXEL_CM, maxY: HOT_PIXEL_CM });
  });

  it('a piece whose ends run downward is named by its sub-edge leaving its lower end', () => {
    const p = buildArena(LOOP).plat;
    const run = routeRun(p, 2 * pairOf(p, vertexAtPoint(p, 500, 700), vertexAtPoint(p, 700, 400)));
    const pieces = routePieces(p, run, 2).map((q) => `${at(p, q.a)}>${at(p, q.b)}@${at(p, p.halfEdges.origin[q.edge])}>${at(p, p.halfEdges.origin[q.edge ^ 1])}`);
    expect(pieces).toEqual(['500,100>300,400@500,100>300,400', '300,400>500,700@300,400>500,700', '700,400>500,700@700,400>500,700', '500,100>700,400@500,100>700,400']);
    expect(routePieces(p, run, 1).map((q) => `${at(p, q.a)}>${at(p, q.b)}`)).toEqual(['500,100>500,100']);
  });

  it('a loop off one vertex of its level leaves it toward its smaller neighbour, under every allocation order', () => {
    for (let k = 0; k < 5; k++) {
      const p = buildArena(LOOP, k === 0 ? {} : { vertices: permutation(9, k), edges: permutation(10, 20 + k) }).plat;
      const v = vertexAtPoint(p, 500, 100);
      const run = routeRun(p, 2 * pairOf(p, vertexAtPoint(p, 500, 700), vertexAtPoint(p, 700, 400)));
      expect(run.halfEdges.map((g) => at(p, p.halfEdges.origin[g]))).toEqual(['500,100', '300,400', '500,700', '700,400']);
      expect(p.halfEdges.origin[run.halfEdges[0]]).toBe(v);
      expect(levelItems(p, 1).filter((i) => i.kind === ITEM_EDGE)).toHaveLength(2); // the stem and the loop
    }
  });

  it('refuses a ring with no vertex of its level, and a finer vertex with more than two coarser edges', () => {
    const RING: ArenaSpec = {
      vertices: [[0, 0, 2], [100, 0, 2], [100, 100, 2], [0, 100, 2], [-100, -100, 0], [200, -100, 0], [200, 200, 0], [-100, 200, 0]],
      edges: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 0, 1], [4, 5, 0], [5, 6, 0], [6, 7, 0], [7, 4, 0]],
    };
    const p = buildArena(RING).plat;
    expect(() => routeRun(p, 0)).toThrow(/has no endpoint of its level/);
    const STAR: ArenaSpec = {
      vertices: [[0, 0, 0], [200, 0, 0], [100, 100, 0], [100, 0, 2], [100, -100, 0]],
      edges: [[0, 3, 0], [3, 1, 0], [3, 2, 0], [3, 4, 0], [0, 4, 0], [4, 1, 0], [1, 2, 0], [2, 0, 0]],
    };
    const q = buildArena(STAR).plat;
    expect(() => routeRun(q, 2 * pairOf(q, vertexAtPoint(q, 0, 0), vertexAtPoint(q, 100, 0)))).toThrow(/exactly two coarser edges/);
  });

  it('every level’s items equal the oracle’s: its vertices, its runs once by handle pair, its face records', () => {
    for (const spec of [QUARTERS, randomSpec(generator(1)), randomSpec(generator(2))]) {
      const p = buildArena(spec).plat;
      const runs = oracleRuns(p);
      for (const level of LEVELS) {
        const items = levelItems(p, level);
        const v = items.filter((i) => i.kind === ITEM_VERTEX).map((i) => i.slot);
        const e = items.filter((i) => i.kind === ITEM_EDGE).map((i) => i.slot);
        const f = items.filter((i) => i.kind === ITEM_FACE).map((i) => i.slot);
        const ov: number[] = [];
        for (let x = 0; x < p.slots.vertex.top; x++) if (p.vertices.level[x] === level && (p.vertices.flags[x] & 8) === 0) ov.push(x);
        expect(v).toEqual(ov);
        expect([...e].sort((a, b) => a - b)).toEqual(runs.filter((r) => r.level === level).map((r) => r.pairs[0]).sort((a, b) => a - b));
        expect(f.length).toBe(p.slots.face[level].live);
        for (const item of items) expect(isItemLive(p, item)).toBe(true);
        for (const r of runs.filter((x) => x.level === level)) {
          for (const n of LEVELS.filter((x) => x >= level)) {
            const mine = routePieces(p, routeRun(p, 2 * r.pairs[0]), n).map((q) => [q.a, q.b, q.edge]);
            expect(mine).toEqual(oraclePieces(p, r, n).map((q) => [q.a, q.b, q.edge]));
          }
        }
        for (const face of f) for (const n of LEVELS.filter((x) => x >= level)) expect(faceRouteRings(p, level, face, n)).toEqual(oracleRouteRings(p, level, face, n));
      }
      // A pair inside a run is no item; a vertex at another level is not that level's item.
      const inner = runs.find((r) => r.pairs.length >= 2);
      if (inner !== undefined) expect(isItemLive(p, { kind: ITEM_EDGE, level: inner.level, slot: inner.pairs[1] })).toBe(false);
      expect(isItemLive(p, { kind: ITEM_VERTEX, level: 4, slot: levelItems(p, 0)[0].slot })).toBe(false);
    }
  }, SLOW);

  it('boxes cover every vertex standing on a run or a face ring, padded by the hot pixel', () => {
    const p = buildArena(randomSpec(generator(6))).plat;
    for (const level of LEVELS) {
      for (const item of levelItems(p, level)) {
        const b = itemBox(p, item);
        if (item.kind === ITEM_VERTEX) {
          expect(b).toEqual({ minX: p.vertices.x[item.slot], minY: p.vertices.y[item.slot], maxX: p.vertices.x[item.slot], maxY: p.vertices.y[item.slot] });
          continue;
        }
        const vs = item.kind === ITEM_EDGE
          ? oracleRuns(p).find((r) => r.pairs[0] === item.slot)?.vertices ?? []
          : oracleRouteRings(p, level, item.slot, 4)[0];
        const xs = vs.map((v) => p.vertices.x[v]);
        const ys = vs.map((v) => p.vertices.y[v]);
        expect(b).toEqual({ minX: Math.min(...xs) - HOT_PIXEL_CM, minY: Math.min(...ys) - HOT_PIXEL_CM, maxX: Math.max(...xs) + HOT_PIXEL_CM, maxY: Math.max(...ys) + HOT_PIXEL_CM });
      }
    }
    expect(() => itemBox(p, { kind: ITEM_FACE, level: 4, slot: 10_000 })).toThrow(/not live/);
  }, SLOW);
});
