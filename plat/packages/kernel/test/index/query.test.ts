// M0-a-03: §3.3's queries and §13.1's index cases — a query's answer identical before and after a rebuild of the
// partitions it reads; a slot freed and reused inside a stage answering as its new item, the stale static copy never;
// results sorted by the canonical key read on the level-n route (the L3-before-and-after-L4 case); a promoted-then-
// demoted item answering an L2 query not at all and an L3 query once; a query whose box meets nothing returning [] (§3.11);
// agreement with the brute-force oracle at every level on hand-built and random arenas, all-static, all-grid and mixed;
// the same answers (as lattice positions) under every slot allocation order — no query reads a slot as a tie-break.
import { describe, expect, it } from 'vitest';
import { allocEdgePair, commitVersion, createPlat, setDebugAssertions, type Plat } from '../../src/arena/index.js';
import {
  attachIndex,
  checkIndexBatch,
  checkIndexState,
  gridInsert,
  homeOf,
  indexAdd,
  indexChange,
  ITEM_EDGE,
  itemKey,
  levelItems,
  query,
  rebuildAtStageEnd,
  rebuildDirty,
  routeHandlePair,
  type Box,
  type ItemRef,
} from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import { linkByAngle } from '../arena/support.js';
import {
  buildArena,
  CELLS,
  dissolve,
  districtResolver,
  edit,
  FRAME,
  generator,
  GROUND,
  intIn,
  LEVELS,
  materialiseAgainShuffled,
  OFFLINE,
  OFFLINE_BASE,
  oracleQuery,
  oracleRouteRings,
  pairOf,
  permutation,
  positions,
  pt,
  QUARTERS,
  randomArena,
  randomSpec,
  setLevel,
  splitAt,
  vertexAtPoint,
  type ArenaSpec,
  type Districts,
} from './support.js';

/** A generous timeout: the machine is shared (C-0025), so a test's wall-clock is contended. */
const SLOW = 120_000;

const box = (minX: number, minY: number, maxX: number, maxY: number): Box => ({ minX, minY, maxX, maxY });

/** A grid of boxes over [−50, W + 50]²: points, thin and fat boxes, on and off the 10 cm grid. */
function boxes(W: number, seed: number, n = 60): Box[] {
  const rnd = generator(seed);
  const out: Box[] = [box(-50, -50, W + 50, W + 50)];
  for (let i = 0; i < n; i++) {
    const x = intIn(rnd, -50, W + 50);
    const y = intIn(rnd, -50, W + 50);
    const k = i % 4;
    if (k === 0) out.push(box(x, y, x, y));
    else if (k === 1) out.push(box(10 * Math.round(x / 10), y, 10 * Math.round(x / 10), y + intIn(rnd, 0, 300)));
    else out.push(box(x, y, x + intIn(rnd, 0, W / 4), y + intIn(rnd, 0, W / 4)));
  }
  return out;
}

function agreeAll(p: Plat, W: number, seed: number): void {
  for (const n of LEVELS) {
    for (const b of boxes(W, seed)) {
      const q = query(p, GROUND, n, b);
      const o = oracleQuery(p, n, b);
      expect([q.vertices, q.edges, q.faces], `L${n} ${JSON.stringify(b)}`).toEqual([o.vertices, o.edges, o.faces]);
    }
  }
}

/** Agreement with the oracle at every level over the given boxes. */
function agreeOn(p: Plat, bs: readonly Box[]): void {
  for (const n of LEVELS) {
    for (const b of bs) {
      const q = query(p, GROUND, n, b);
      const o = oracleQuery(p, n, b);
      expect([q.vertices, q.edges, q.faces], `L${n} ${JSON.stringify(b)}`).toEqual([o.vertices, o.edges, o.faces]);
    }
  }
}

/**
 * Points and small boxes around OFFLINE's off-line vertex S (500, 501): on and off its L1 route A–B and its L2 route
 * A–S–B, in the slivers between them, and boxes of 3 × 1 and 3 × 3 cm about S.
 */
function nearOffline(): Box[] {
  const out: Box[] = [];
  for (let x = 300; x <= 750; x += 25) {
    for (let y = 498; y <= 505; y++) out.push(box(x, y, x, y), box(x - 1, y, x + 1, y));
  }
  for (let x = 490; x <= 510; x++) out.push(box(x, 501, x, 501), box(x, 500, x + 2, 502));
  out.push(box(400, 501, 400, 501), box(700, 502, 700, 502), box(499, 500, 501, 502), box(499, 501, 501, 501), box(499, 502, 501, 502));
  return out;
}

/** Every item of the arena re-entered through the grid: each static copy tombstoned, each item answered by the grid. */
function allToGrid(p: Plat): void {
  for (const level of LEVELS) for (const item of levelItems(p, level)) indexChange(p, item);
}

/** How many structures answer for an item: its untombstoned static copies at its level plus its grid entry. */
function holders(p: Plat, item: ItemRef): number {
  const idx = p.index;
  if (idx === undefined) throw new Error('no index');
  const k = itemKey(item.kind, item.slot);
  const L = idx.levels[item.level];
  let n = L.dynamic.entries.has(k) ? 1 : 0;
  L.static.forEach((part, i) => {
    if (part.keys.includes(k) && !L.tombstones[i].has(k)) n++;
  });
  return n;
}

describe('queries agree with the oracle (§3.3)', () => {
  it('on the hand-built arenas at every level: all static, all in the grid, after a rebuild, and mixed', () => {
    for (const spec of [QUARTERS]) {
      const p = buildArena(spec).plat;
      attachIndex(p, { gridCellCm: CELLS });
      expect(checkIndexState(p)).toEqual([]);
      agreeAll(p, 1000, 1);
      allToGrid(p);
      expect(checkIndexState(p)).toEqual([]);
      agreeAll(p, 1000, 2);
      rebuildAtStageEnd(p);
      expect(checkIndexState(p)).toEqual([]);
      agreeAll(p, 1000, 3);
      // mixed: half the items re-entered through the grid
      let i = 0;
      for (const level of LEVELS) for (const item of levelItems(p, level)) if (i++ % 2 === 0) indexChange(p, item);
      expect(checkIndexState(p)).toEqual([]);
      agreeAll(p, 1000, 4);
    }
  }, SLOW);

  it('around a finer vertex off its coarser route (OFFLINE): points and small boxes, all static, all in the grid, rebuilt', () => {
    const p = buildArena(OFFLINE).plat;
    attachIndex(p, { gridCellCm: CELLS });
    expect(checkIndexState(p)).toEqual([]);
    agreeOn(p, nearOffline());
    agreeAll(p, 1000, 21);
    allToGrid(p);
    expect(checkIndexState(p)).toEqual([]);
    agreeOn(p, nearOffline());
    rebuildAtStageEnd(p);
    expect(checkIndexState(p)).toEqual([]);
    agreeOn(p, nearOffline());
    // The L1 query reads the run on its L1 route A–B (S skipped); the L2 query on A–S and S–B.
    const at = (n: Level, x: number, y: number): number[] => query(p, GROUND, n, box(x, y, x, y)).edges;
    expect(at(1, 400, 501)).toEqual([]);
    expect(at(2, 400, 501)).toEqual([]);
    expect(at(1, 500, 501)).toEqual([]);
    expect(query(p, GROUND, 2, box(500, 501, 500, 501)).vertices).toHaveLength(1);
    expect(query(p, GROUND, 1, box(499, 501, 501, 502)).edges).toHaveLength(1);
    expect(query(p, GROUND, 2, box(499, 501, 501, 502)).edges).toHaveLength(3); // A–S, S–B and S–T
  }, SLOW);

  it('around a finer vertex placed off its coarser route by a later batch: the run’s box, written before it, still answers', () => {
    const p = buildArena(OFFLINE_BASE).plat;
    attachIndex(p, { gridCellCm: CELLS });
    const A = vertexAtPoint(p, 0, 500);
    const B = vertexAtPoint(p, 1000, 503);
    const run: ItemRef = { kind: ITEM_EDGE, level: 1, slot: routeHandlePair(p, 2 * pairOf(p, A, B)) };
    const home = homeOf(p, run);
    expect(home).toBeGreaterThanOrEqual(0);
    const stored = p.index?.partitions[home].tree;
    expect(stored).not.toBeNull();
    // The L2 batch: S (500, 501) 0.5 cm off A–B, T (500, 0) on the L0 side, the L2 line S–T.
    const l2 = edit(p, null, 2, () => {
      const s = splitAt(p, pairOf(p, A, B), pt(500, 501), 2);
      const t = splitAt(p, pairOf(p, vertexAtPoint(p, 0, 0), vertexAtPoint(p, 1000, 0)), pt(500, 0), 2);
      allocEdgePair(p, s, t, 2);
      linkByAngle(p);
    });
    expect(checkIndexBatch(p, l2.log, { promoted: [], demoted: { vertices: [], edges: [] }, changed: l2.changed })).toEqual([]);
    // A finer batch writes only its own level's index: the L1 run is still answered by its static copy, boxed from A and B.
    expect(homeOf(p, run)).toBe(home);
    expect(p.index?.partitions[home].tree).toBe(stored);
    expect(checkIndexState(p)).toEqual([]);
    agreeOn(p, nearOffline());
    // The re-walk (an L0 batch) materialises the L2 records S–T makes.
    const walk = edit(p, null, 0, () => materialiseAgainShuffled(p, generator(7)));
    expect(checkIndexBatch(p, walk.log, { promoted: [], demoted: { vertices: [], edges: [] }, changed: walk.changed })).toEqual([]);
    expect(homeOf(p, run)).toBe(home);
    expect(checkIndexState(p)).toEqual([]);
    agreeOn(p, nearOffline());
    // The same answers, as lattice positions, as the arena built whole.
    const whole = buildArena(OFFLINE).plat;
    attachIndex(whole, { gridCellCm: CELLS });
    for (const n of LEVELS) {
      for (const b of nearOffline()) expect(positions(p, n, query(p, GROUND, n, b)), `L${n} ${JSON.stringify(b)}`).toEqual(positions(whole, n, query(whole, GROUND, n, b)));
    }
  }, SLOW);

  it('on random rectilinear arenas with holes, all static and all in the grid', () => {
    for (let seed = 1; seed <= 12; seed++) {
      const p = randomArena(seed, { cutX: 2000, hinterlandY: 3000 }).built.plat;
      agreeAll(p, 4000, seed);
      allToGrid(p);
      agreeAll(p, 4000, seed + 100);
    }
  }, SLOW);

  it('answers identically before and after a rebuild of the partitions it reads (§13.1)', () => {
    for (let seed = 1; seed <= 8; seed++) {
      const d: Districts = { cutX: 2000, hinterlandY: 3000 };
      const p = randomArena(seed, d).built.plat;
      allToGrid(p);
      for (const n of LEVELS) {
        for (const b of boxes(4000, seed, 20)) {
          const before = query(p, GROUND, n, b);
          rebuildDirty(p, (part) => part.level <= n);
          const after = query(p, GROUND, n, b);
          expect([after.vertices, after.edges, after.faces]).toEqual([before.vertices, before.edges, before.faces]);
          allToGrid(p);
        }
      }
    }
  }, SLOW);
});

describe('a slot freed and reused inside a stage (§13.1, J-K34)', () => {
  it('answers as its new item; the stale static copy never answers', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    const e48 = pairOf(p, vertexAtPoint(p, 500, 0), vertexAtPoint(p, 500, 500));
    let v = -1;
    edit(p, null, 3, () => {
      v = splitAt(p, e48, pt(500, 200), 3);
    });
    rebuildAtStageEnd(p); // the L3 vertex now lives in the static L3 partition
    expect(p.indexHome.vertex[v]).toBeGreaterThanOrEqual(0);
    // Inside the next stage: the vertex is dissolved and its slot taken by a vertex elsewhere.
    let w = -1;
    edit(p, null, 3, () => {
      expect(dissolve(p, v)).toBe(true);
      w = splitAt(p, pairOf(p, vertexAtPoint(p, 1000, 500), vertexAtPoint(p, 500, 500)), pt(700, 500), 3);
    });
    expect(w).toBe(v); // the same slot
    const L3 = p.index?.levels[3];
    const stale = L3?.static.findIndex((part) => part.keys.includes(itemKey(0, v))) ?? -1;
    expect(stale).toBeGreaterThanOrEqual(0); // the stale static copy is still in its partition …
    expect(L3?.tombstones[stale].has(itemKey(0, v))).toBe(true); // … filtered by its tombstone
    expect(query(p, GROUND, 3, box(490, 190, 510, 210)).vertices).toEqual([]);
    expect(query(p, GROUND, 3, box(690, 490, 710, 510)).vertices).toEqual([v]);
    expect(query(p, GROUND, 3, box(0, 0, 1000, 1000)).vertices.filter((x) => x === v)).toHaveLength(1);
    expect(holders(p, { kind: 0, level: 3, slot: v })).toBe(1);
    agreeAll(p, 1000, 9);
  });

  it('a slot freed in one district and reused in another, the second partition rebuilt first: its new item only', () => {
    const d: Districts = { cutX: 400, hinterlandY: 2000 };
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS, partitionOf: districtResolver(d) });
    let v = -1;
    edit(p, d, 3, () => {
      v = splitAt(p, pairOf(p, vertexAtPoint(p, 0, 500), vertexAtPoint(p, 250, 500)), pt(100, 500), 3);
    });
    rebuildAtStageEnd(p);
    const homeA = p.indexHome.vertex[v];
    expect(p.index?.partitions[homeA].key).toBe('d:a');
    let w = -1;
    edit(p, d, 3, () => {
      expect(dissolve(p, v)).toBe(true);
      w = splitAt(p, pairOf(p, vertexAtPoint(p, 1000, 500), vertexAtPoint(p, 500, 500)), pt(800, 500), 3);
    });
    expect(w).toBe(v);
    rebuildAtStageEnd(p, 'd:b'); // the second district's partitions first
    expect(p.index?.partitions[p.indexHome.vertex[v]].key).toBe('d:b');
    expect(query(p, GROUND, 3, box(90, 490, 110, 510)).vertices).toEqual([]);
    expect(query(p, GROUND, 3, box(790, 490, 810, 510)).vertices).toEqual([v]);
    expect(holders(p, { kind: 0, level: 3, slot: v })).toBe(1);
    agreeAll(p, 1000, 10);
    rebuildAtStageEnd(p, 'd:a');
    expect(holders(p, { kind: 0, level: 3, slot: v })).toBe(1);
    expect(checkIndexState(p)).toEqual([]);
    agreeAll(p, 1000, 11);
  });

  it('a writer that frees a slot without its tombstone is caught at the next query (the debug build asserts)', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    const e48 = pairOf(p, vertexAtPoint(p, 500, 0), vertexAtPoint(p, 500, 500));
    let v = -1;
    edit(p, null, 3, () => {
      v = splitAt(p, e48, pt(500, 200), 3);
    });
    rebuildAtStageEnd(p);
    const idx = p.index;
    p.index = undefined; // the forgetting writer: no index write while it frees the slot
    expect(dissolve(p, v)).toBe(true);
    const w = splitAt(p, pairOf(p, vertexAtPoint(p, 1000, 500), vertexAtPoint(p, 500, 500)), pt(700, 500), 3);
    p.index = idx;
    expect(w).toBe(v);
    indexAdd(p, { kind: 0, level: 3, slot: w });
    expect(() => query(p, GROUND, 3, box(0, 0, 1000, 1000))).toThrow(/stale item/);
    expect(checkIndexState(p).join('\n')).toMatch(/whose home is -1/);
    // and the next rebuild refuses the partition holding the stale copy, in every build
    setDebugAssertions(false);
    try {
      expect(() => rebuildAtStageEnd(p)).toThrow(/stale item/);
    } finally {
      setDebugAssertions(true);
    }
  });
});

/**
 * Two L3 plots A and B share their lowest-leftmost vertex c with a third, Z; deriving L4 in B puts an L4 vertex s on the
 * plot line c–e that B and A share (§13.1's L3-before-and-after-L4 case, `fixall_kernel_r3_checks.out` C's shape).
 */
const PLOTS: ArenaSpec = {
  vertices: [
    [0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0], // c q r t
    [1000, 300, 3], // e (on q–r)
    [500, 60, 3], // g
  ],
  edges: [
    [0, 1, 0], [1, 4, 0], [4, 2, 0], [2, 3, 0], [3, 0, 0],
    [0, 5, 3], [5, 1, 3], [0, 4, 3],
  ],
};

describe('results sorted by the canonical key read on the level-n route (§3.3)', () => {
  it('the L3 query over the block returns its plots in the same order before and after S11 derives L4 there', () => {
    const p = buildArena(PLOTS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    const all = box(-10, -10, 1010, 1010);
    const faces = (): string[] => query(p, GROUND, 3, all, { faces: true }).faces.map((f) => oracleRouteRings(p, 3, f, 3)[0].map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`).join(' '));
    const before = faces();
    expect(before).toHaveLength(3);
    const rnd = generator(5);
    edit(p, null, 4, () => {
      const c = vertexAtPoint(p, 0, 0);
      const s = splitAt(p, pairOf(p, c, vertexAtPoint(p, 1000, 300)), pt(100, 30), 4);
      const u = splitAt(p, pairOf(p, vertexAtPoint(p, 1000, 1000), vertexAtPoint(p, 0, 1000)), pt(100, 1000), 4);
      allocEdgePair(p, s, u, 4);
      linkByAngle(p);
      materialiseAgainShuffled(p, rnd);
    });
    expect(p.slots.face[4].live).toBe(2); // L4 derived in B
    const after = faces();
    // The order read on the L3 route is the same (rings compared from the same start; the records may have moved).
    const norm = (r: string): string => r.split(' ').sort().join(' ');
    expect(after.map(norm)).toEqual(before.map(norm));
    agreeAll(p, 1000, 12);
    // The negative control: keys read on the full ring (the L4 vertex not skipped) reverse A and B.
    const fullKey = (f: number): [number, number] => {
      const ring = oracleRouteRings(p, 3, f, 4)[0];
      let best = 0;
      for (let i = 1; i < ring.length; i++) {
        const a = ring[i];
        const b = ring[best];
        const c = p.vertices.y[a] - p.vertices.y[b] || p.vertices.x[a] - p.vertices.x[b];
        const n = (k: number): number => ring[(k + 1) % ring.length];
        if (c < 0 || (c === 0 && (p.vertices.y[n(i)] - p.vertices.y[n(best)] || p.vertices.x[n(i)] - p.vertices.x[n(best)]) < 0)) best = i;
      }
      const s = ring[(best + 1) % ring.length];
      return [p.vertices.y[s], p.vertices.x[s]];
    };
    const l3 = query(p, GROUND, 3, all, { faces: true }).faces;
    const byFull = [...l3].sort((a, b) => fullKey(a)[0] - fullKey(b)[0] || fullKey(a)[1] - fullKey(b)[1]);
    expect(byFull).not.toEqual(l3);
  });
});

/** A kerb (L2) across a square, a plot line (L3) from a vertex on it to the north side (§3.3's plot-line end). */
const KERB: ArenaSpec = {
  vertices: [
    [0, 0, 0], [1000, 0, 0], [1000, 1000, 0], [0, 1000, 0],
    [0, 500, 2], [1000, 500, 2], // the kerb's ends, Steiner on the L0 sides
    [400, 500, 3], // w: the plot-line end on the kerb
    [400, 1000, 3],
  ],
  edges: [
    [0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 7, 0], [7, 3, 0], [3, 4, 0], [4, 0, 0],
    [4, 6, 2], [6, 5, 2],
    [6, 7, 3],
  ],
};

describe('a promoted-then-demoted item answers an L2 query not at all and an L3 query once (§3.3, §13.1)', () => {
  const schedules: [string, boolean, boolean][] = [
    ['no rebuild', false, false],
    ['rebuilt after the promotion', true, false],
    ['rebuilt after the demotion', false, true],
    ['rebuilt after both', true, true],
  ];
  for (const [name, afterPromotion, afterDemotion] of schedules) {
    it(name, () => {
      const p = buildArena(KERB).plat;
      attachIndex(p, { gridCellCm: CELLS });
      const w = vertexAtPoint(p, 400, 500);
      const near = box(390, 490, 410, 510);
      expect(query(p, GROUND, 2, near).vertices).toEqual([]);
      // The neighbour step's L2 batch promotes w (§2.2 rule 3, J-K11): an L2 vertex, splitting the kerb's L2 route edge.
      const promoted = edit(p, null, 2, () => setLevel(p, w, 2));
      expect(promoted.changed.some((c) => c.item.kind === 0 && c.item.slot === w && c.successor?.level === 2)).toBe(true);
      expect(query(p, GROUND, 2, near).vertices).toEqual([w]);
      expect(query(p, GROUND, 2, near).edges).toHaveLength(2);
      if (afterPromotion) rebuildAtStageEnd(p);
      // Its removal (an undo, a reroll) demotes w back to L3, joining the kerb's two L2 items into one.
      edit(p, null, 2, () => setLevel(p, w, 3));
      if (afterDemotion) rebuildAtStageEnd(p);
      const l2 = query(p, GROUND, 2, near);
      expect(l2.vertices).toEqual([]);
      expect(l2.edges).toHaveLength(1);
      expect(query(p, GROUND, 3, near).vertices).toEqual([w]);
      expect(holders(p, { kind: 0, level: 2, slot: w })).toBe(0);
      expect(holders(p, { kind: 0, level: 3, slot: w })).toBe(1);
      expect(checkIndexState(p)).toEqual([]);
      agreeAll(p, 1000, 13);
    });
  }
});

describe('a query whose box meets nothing returns [] (§3.11 no input)', () => {
  it('on an empty arena, and beyond every item of a built one, at every level', () => {
    const empty = createPlat(GROUND, FRAME);
    attachIndex(empty, { gridCellCm: CELLS });
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    for (const n of LEVELS) {
      for (const q of [query(empty, GROUND, n, box(-100, -100, 100, 100)), query(p, GROUND, n, box(2000, 2000, 2500, 2600)), query(p, GROUND, n, box(-5, 500, -1, 600))]) {
        expect([q.vertices, q.edges, q.faces]).toEqual([[], [], []]);
      }
    }
  });
});

describe('no query reads a slot number as a tie-break (§3.3)', () => {
  it('the same answers, as lattice positions and in the same order, under every allocation order', () => {
    const specs: [ArenaSpec, number][] = [[QUARTERS, 1000], [KERB, 1000], [PLOTS, 1000], [randomSpec(generator(3)), 4000], [randomSpec(generator(4)), 4000]];
    for (const [spec, W] of specs) {
      let reference: string[][] | null = null;
      for (let k = 0; k < 4; k++) {
        const order = k === 0 ? {} : { vertices: permutation(spec.vertices.length, k), edges: permutation(spec.edges.length, k + 10) };
        const p = buildArena(spec, order).plat;
        attachIndex(p, { gridCellCm: CELLS });
        if (k % 2 === 1) allToGrid(p);
        const answers = LEVELS.flatMap((n) => boxes(W, 77, 15).map((b) => positions(p, n, query(p, GROUND, n, b))));
        if (reference === null) reference = answers;
        else expect(answers).toEqual(reference);
      }
    }
  }, SLOW);
});

describe('the grid cell changes no answer (§3.3; the lattice table’s index.gridCellM is the caller’s, C-0160)', () => {
  it('the same answers with 1 cm cells, one cell for the whole arena, and the test cells, with every item in the grid', () => {
    for (const [spec, W] of [[QUARTERS, 1000], [randomSpec(generator(8)), 4000]] as [ArenaSpec, number][]) {
      let reference: string[][] | null = null;
      for (const cells of [CELLS, 1, 1_000_000, [3, 70, 900, 25_000, 7]] as const) {
        const p = buildArena(spec).plat;
        attachIndex(p, { gridCellCm: typeof cells === 'number' ? cells : [...cells] as [number, number, number, number, number] });
        allToGrid(p);
        const answers = LEVELS.flatMap((n) => boxes(W, 5, 12).map((b) => positions(p, n, query(p, GROUND, n, b))));
        if (reference === null) reference = answers;
        else expect(answers).toEqual(reference);
      }
    }
  }, SLOW);
});

describe('the query surface', () => {
  it('stamps its answer with the arena key and version; refuses a foreign key in a debug build, a bad box or level', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    commitVersion(p);
    const q = query(p, GROUND, 1, box(0, 0, 10, 10));
    expect(q.key).toEqual(GROUND);
    expect(q.key).not.toBe(p.key);
    expect(q.version).toBe(1);
    expect(() => query(p, { layer: 'underground', part: 0 }, 1, box(0, 0, 10, 10))).toThrow(/handed the key/);
    setDebugAssertions(false);
    try {
      expect(query(p, { layer: 'underground', part: 0 }, 1, box(0, 0, 10, 10)).vertices).toHaveLength(1);
    } finally {
      setDebugAssertions(true);
    }
    expect(() => query(p, GROUND, 1, box(0, 0, 10.5, 10))).toThrow(/whole centimetres/);
    expect(() => query(p, GROUND, 1, box(10, 0, 0, 10))).toThrow(/min ≤ max/);
    expect(() => query(p, GROUND, 1, box(0, 0, 2 ** 24 + 1, 10))).toThrow(/whole centimetres/);
    expect(() => query(p, GROUND, 1, box(-(2 ** 24) - 1, 0, 10, 10))).toThrow(/whole centimetres/);
    // the bound itself is inside (num's BOX_RANGE, 2²⁴): the widest box answers every vertex of the level
    expect(query(p, GROUND, 1, box(-(2 ** 24), -(2 ** 24), 2 ** 24, 2 ** 24)).vertices).toEqual(query(p, GROUND, 1, box(0, 0, 1000, 1000)).vertices);
    expect(() => query(p, GROUND, 5 as Level, box(0, 0, 1, 1))).toThrow(/0 … 4/);
    expect(() => query(createPlat(GROUND, FRAME), GROUND, 0, box(0, 0, 1, 1))).toThrow(/no spatial index/);
    // the kinds asked for, and only those
    const v = query(p, GROUND, 4, box(0, 0, 1000, 1000), { vertices: true });
    expect(v.vertices.length).toBeGreaterThan(0);
    expect([v.edges, v.faces]).toEqual([[], []]);
  });

  it('refuses to insert a live item whose static copy was not tombstoned (no item changes in place)', () => {
    const p = buildArena(QUARTERS).plat;
    attachIndex(p, { gridCellCm: CELLS });
    const item = levelItems(p, 2)[0];
    expect(() => gridInsert(p, item)).toThrow(/tombstone it first/);
    expect(() => gridInsert(p, { kind: 0, level: 4, slot: 0 })).toThrow(/not live/);
  });
});

