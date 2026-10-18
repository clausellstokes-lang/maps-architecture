// M0-a-03 (fix round 1, checks/M0-a-03.md F-1 and F-2): §3.10's index levels and freshness row (`checkIndexBatch`) and
// the whole-index state check (`checkIndexState`) — the instruments of the item's *here* bar, handed to M0-a-14 — each
// clause shown to turn red on its own fault, alone and with its exact text, and the row's exceptions (the batch's own
// promotions and demotions, a vertex or an edge) shown to pass only what they name. Every case starts from a clean
// index on the quarters arena (asserted) and makes one fault; where a clean writer exists, it is run beside the faulty
// one with the same facts.
import { describe, expect, it } from 'vitest';
import { freeFace, type Plat } from '../../src/arena/index.js';
import { gridPut } from '../../src/index/grid.js';
import {
  attachIndex,
  beginIndexBatch,
  checkIndexBatch,
  checkIndexState,
  endIndexBatch,
  gridDelete,
  gridInsert,
  homeOf,
  indexChange,
  indexOf,
  ITEM_EDGE,
  ITEM_FACE,
  ITEM_VERTEX,
  itemBox,
  itemKey,
  partitionById,
  routeHandlePair,
  tombstone,
  tombstonesOf,
  type BatchIndexFacts,
  type IndexBatchLog,
  type ItemRef,
} from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, CELLS, districtResolver, QUARTERS, vertexAtPoint, type Built, type Districts } from './support.js';

/** The quarters arena with its index attached (all static), the index clean. */
function arena(d?: Districts): Built {
  const b = buildArena(QUARTERS);
  attachIndex(b.plat, { gridCellCm: CELLS, ...(d === undefined ? {} : { partitionOf: districtResolver(d) }) });
  expect(checkIndexState(b.plat)).toEqual([]);
  return b;
}

/** The vertex item at a point (its birth level). */
function vertexItem(p: Plat, x: number, y: number): ItemRef {
  const v = vertexAtPoint(p, x, y);
  expect(v).toBeGreaterThanOrEqual(0);
  return { kind: ITEM_VERTEX, level: p.vertices.level[v] as Level, slot: v };
}

/** One batch of `level`: its index writes. */
function batch(p: Plat, level: Level, fn: () => unknown): IndexBatchLog {
  beginIndexBatch(p, level);
  fn();
  return endIndexBatch(p);
}

/** Facts with nothing promoted or demoted. */
function facts(changed: BatchIndexFacts['changed'], more: Partial<BatchIndexFacts> = {}): BatchIndexFacts {
  return { promoted: [], demoted: { vertices: [], edges: [] }, changed, ...more };
}

// QUARTERS' items the cases use: (250, 500) is an L2 vertex (the L2 line's end on the cross), (500, 500) the L1 centre,
// (50, 100) an L3 courtyard corner; edge 11 is the L1 cross arm (500, 0) → (500, 500); the L4 records split the
// north-east quarter.
const L2_VERTEX = [250, 500] as const;
const L1_VERTEX = [500, 500] as const;
const L3_VERTEX = [50, 100] as const;

describe('the index levels and freshness row (§3.10, checkIndexBatch): each clause red on its own fault', () => {
  it('a changed item tombstoned whose successor never entered the grid: "in no grid of its level"', () => {
    for (const faulty of [false, true]) {
      const p = arena().plat;
      const x = vertexItem(p, ...L2_VERTEX);
      const home = homeOf(p, x);
      expect(home).toBeGreaterThanOrEqual(0);
      const log = batch(p, 2, () => (faulty ? tombstone(p, x) : indexChange(p, x)));
      const problems = checkIndexBatch(p, log, facts([{ item: x, homeBefore: home, successor: x }]));
      expect(problems).toEqual(faulty ? [`vertex ${x.slot} (L2) is in no grid of its level`] : []);
    }
  });

  it('a successor not live as named', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const home = homeOf(p, x);
    const log = batch(p, 2, () => indexChange(p, x));
    const ghost: ItemRef = { kind: ITEM_VERTEX, level: 3, slot: x.slot };
    expect(checkIndexBatch(p, log, facts([{ item: x, homeBefore: home, successor: ghost }]))).toEqual([
      `vertex ${x.slot} (L2)'s successor vertex ${x.slot} (L3) is not live`,
    ]);
  });

  it('a home entry written back after the item was re-entered: the entry still names the partition, and the grid item has a static home', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const home = homeOf(p, x);
    const log = batch(p, 2, () => {
      indexChange(p, x);
      p.indexHome.vertex[x.slot] = home;
    });
    expect(checkIndexBatch(p, log, facts([{ item: x, homeBefore: home, successor: x }]))).toEqual([
      `vertex ${x.slot} (L2)'s home entry still names partition ${home}`,
      `vertex ${x.slot} (L2) is in the grid and still has a static home ${home}`,
    ]);
  });

  it('a deleted item whose slot was freed while its grid entry stayed: "still in the L4 grid"', () => {
    for (const faulty of [false, true]) {
      const b = arena();
      const p = b.plat;
      const f = b.faces[4][0];
      const item: ItemRef = { kind: ITEM_FACE, level: 4, slot: f };
      indexChange(p, item); // an earlier batch of the stage re-entered it: it lives in the grid
      const log = batch(p, 4, () => {
        if (!faulty) gridDelete(p, item);
        freeFace(p, 4, f);
      });
      const problems = checkIndexBatch(p, log, facts([{ item, homeBefore: -1, successor: null }]));
      expect(problems).toEqual(faulty ? [`deleted face ${f} (L4) is still in the L4 grid`] : []);
    }
  });

  it('an L2 batch writing the L1 index (one level coarser) is flagged; named as a promotion or a demotion it passes', () => {
    const p = arena().plat;
    const v = vertexItem(p, ...L1_VERTEX);
    expect(v.level).toBe(1);
    const log = batch(p, 2, () => indexChange(p, v));
    const flagged = [
      `an L2 batch wrote the L1 index (tombstone of vertex ${v.slot} (L1)) outside its promotions and demotions`,
      `an L2 batch wrote the L1 index (insert of vertex ${v.slot} (L1)) outside its promotions and demotions`,
    ];
    expect(checkIndexBatch(p, log, facts([]))).toEqual(flagged);
    expect(checkIndexBatch(p, log, facts([], { promoted: [v.slot] }))).toEqual([]);
    expect(checkIndexBatch(p, log, facts([], { demoted: { vertices: [v.slot], edges: [] } }))).toEqual([]);
    // A demoted edge whose pair carries the vertex's number excuses no vertex write.
    expect(checkIndexBatch(p, log, facts([], { demoted: { vertices: [], edges: [2 * v.slot, 2 * v.slot + 1] } }))).toEqual(flagged);
  });

  it('writes of the batch’s own level and finer levels pass', () => {
    const p = arena().plat;
    const own = vertexItem(p, ...L2_VERTEX);
    const finer = vertexItem(p, ...L3_VERTEX);
    expect(finer.level).toBe(3);
    const log = batch(p, 2, () => {
      indexChange(p, own);
      indexChange(p, finer);
    });
    expect(log.writes.map((w) => w.level)).toEqual([2, 2, 3, 3]);
    expect(checkIndexBatch(p, log, facts([]))).toEqual([]);
  });

  it('a demoted edge: its pair’s writes in a finer batch pass when the commit record names it, and are flagged otherwise', () => {
    const b = arena();
    const p = b.plat;
    const pair = routeHandlePair(p, b.he[11]);
    const item: ItemRef = { kind: ITEM_EDGE, level: 1, slot: pair };
    expect(homeOf(p, item)).toBeGreaterThanOrEqual(0);
    const log = batch(p, 2, () => indexChange(p, item));
    const flagged = [
      `an L2 batch wrote the L1 index (tombstone of route edge ${pair} (L1)) outside its promotions and demotions`,
      `an L2 batch wrote the L1 index (insert of route edge ${pair} (L1)) outside its promotions and demotions`,
    ];
    expect(checkIndexBatch(p, log, facts([]))).toEqual(flagged);
    // Named by either half-edge of its pair, the demotion excuses both writes.
    expect(checkIndexBatch(p, log, facts([], { demoted: { vertices: [], edges: [2 * pair + 1] } }))).toEqual([]);
    expect(checkIndexBatch(p, log, facts([], { demoted: { vertices: [], edges: [2 * pair] } }))).toEqual([]);
    // Another pair named, or a vertex carrying the pair's number, excuses nothing.
    expect(checkIndexBatch(p, log, facts([], { demoted: { vertices: [], edges: [2 * pair + 2] } }))).toEqual(flagged);
    expect(checkIndexBatch(p, log, facts([], { promoted: [pair], demoted: { vertices: [pair], edges: [] } }))).toEqual(flagged);
  });
});

describe('the whole-index state check (checkIndexState): each clause red on its own corruption', () => {
  it('a live item tombstoned and never re-entered "is in no structure"', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    tombstone(p, x);
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L2) is in no structure`]);
    gridInsert(p, x);
    expect(checkIndexState(p)).toEqual([]);
  });

  it('an item entered in the grid while its static copy still answers "answers from partition … and the grid"', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const home = homeOf(p, x);
    gridPut(indexOf(p).levels[2].dynamic, itemKey(ITEM_VERTEX, x.slot), home, itemBox(p, x));
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L2) answers from partition ${home} and the grid`]);
  });

  it('a vertex moved after its grid entry was written: "grid box does not hold its geometry"', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    indexChange(p, x);
    expect(checkIndexState(p)).toEqual([]);
    p.vertices.x[x.slot] += 10;
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L2)'s grid box does not hold its geometry`]);
    indexChange(p, x); // the writer that re-enters what it moved
    expect(checkIndexState(p)).toEqual([]);
  });

  it('a regroup that does not re-enter a grid item: it "waits for partition" of its old district', () => {
    const d: Districts = { cutX: 400, hinterlandY: 2000 };
    const p = arena(d).plat;
    const x = vertexItem(p, ...L3_VERTEX);
    indexChange(p, x);
    expect(checkIndexState(p)).toEqual([]);
    d.cutX = 0; // S6 re-owns the courtyard's block from 'd:a' to 'd:b'
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L3) waits for partition 'd:a', but belongs to 'd:b'`]);
    indexChange(p, x);
    expect(checkIndexState(p)).toEqual([]);
  });

  it('a home entry naming a partition that does not answer for the item: "does not answer for it"', () => {
    // (a) the tombstone written, the entry not reset: the partition it names filters the item.
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const home = homeOf(p, x);
    tombstonesOf(p, partitionById(p, home)).add(itemKey(ITEM_VERTEX, x.slot));
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L2)'s home ${home} does not answer for it`]);
    // (b) the entry naming another partition of the level, which never held the item.
    const d: Districts = { cutX: 400, hinterlandY: 2000 };
    const q = arena(d).plat;
    const y = vertexItem(q, ...L3_VERTEX);
    const own = homeOf(q, y);
    const other = indexOf(q).byKey[3].get('d:b');
    expect(other).toBeDefined();
    expect(partitionById(q, own).key).toBe('d:a');
    q.indexHome.vertex[y.slot] = other ?? -1;
    expect(checkIndexState(q)).toEqual([
      `partition ${own} holds vertex ${y.slot} (L3) whose home is ${other}`,
      `vertex ${y.slot} (L3)'s home ${other} does not answer for it`,
    ]);
  });

  it('a grid entry for a freed slot: the grid holds "no live item of the level"', () => {
    const b = arena();
    const p = b.plat;
    const f = b.faces[4][0];
    indexChange(p, { kind: ITEM_FACE, level: 4, slot: f });
    expect(checkIndexState(p)).toEqual([]);
    freeFace(p, 4, f); // the writer frees the slot and forgets the grid
    expect(checkIndexState(p)).toEqual([`the L4 grid holds ${itemKey(ITEM_FACE, f)}, no live item of the level`]);
  });

  it('a static item freed without its tombstone: the partition "holds a dead" item', () => {
    const b = arena();
    const p = b.plat;
    const f = b.faces[4][0];
    const home = homeOf(p, { kind: ITEM_FACE, level: 4, slot: f });
    freeFace(p, 4, f);
    expect(checkIndexState(p)).toEqual([`partition ${home} holds a dead face ${f} (L4) no tombstone filters`]);
  });

  it('a static item whose home entry was cleared: "whose home is -1", and it is in no structure', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const home = homeOf(p, x);
    p.indexHome.vertex[x.slot] = -1;
    expect(checkIndexState(p)).toEqual([
      `partition ${home} holds vertex ${x.slot} (L2) whose home is -1`,
      `vertex ${x.slot} (L2) is in no structure`,
    ]);
  });

  it('a grid item missing from its partition’s grid share, and a grid share naming a key the grid does not give it', () => {
    const p = arena().plat;
    const x = vertexItem(p, ...L2_VERTEX);
    const key = itemKey(ITEM_VERTEX, x.slot);
    indexChange(p, x);
    const entry = indexOf(p).levels[2].dynamic.entries.get(key);
    expect(entry).toBeDefined();
    const part = partitionById(p, entry?.partition ?? -1);
    part.pending.delete(key);
    expect(checkIndexState(p)).toEqual([`vertex ${x.slot} (L2) is missing from its partition's grid share`]);
    const q = arena().plat;
    const y = vertexItem(q, ...L2_VERTEX);
    const home = homeOf(q, y);
    partitionById(q, home).pending.add(itemKey(ITEM_VERTEX, y.slot));
    expect(checkIndexState(q)).toEqual([`partition ${home}'s grid share names ${itemKey(ITEM_VERTEX, y.slot)}, which the grid does not give it`]);
  });
});
