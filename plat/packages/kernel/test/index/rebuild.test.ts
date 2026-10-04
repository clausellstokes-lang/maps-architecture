// M0-a-03: the partitions, the home column, the tombstones and the three rebuild moments (§3.3 *Tombstones and
// rebuilds*): one partition per arena at L0–L1 and per district plus one outside at L2–L4, numbered across the levels,
// the smaller key taking an item two partitions share; tombstoning through the home entry; rebuilds at a stage's end
// (an eager stage's every dirty partition, a per-district stage's own), at an editing session's grid overflow past
// max(256, ¼ of the static size), and at the pool freeze's hook (every grid and tombstone set then empty, §3.10's
// frozen-base row); `index.rebuilds` charged; and the exit bar's second half — rebuild work never grows with the number
// of commits (§13.2's cost-model claim), measured on the fixtures.
import { describe, expect, it } from 'vitest';
import { isHalfEdgeLive, type Plat } from '../../src/arena/index.js';
import {
  attachIndex,
  checkIndexState,
  gridDelete,
  homeOf,
  INDEX_REBUILDS,
  indexChange,
  isDirty,
  itemKey,
  levelItems,
  overflowThreshold,
  partitionById,
  partitionKeyOf,
  rebuildAtStageEnd,
  rebuildDirty,
  rebuildForFreeze,
  rebuildOverflowing,
  rebuildPartition,
  tombstone,
  tombstonesOf,
} from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import {
  buildArena,
  CELLS,
  districtOf,
  edit,
  generator,
  LEVELS,
  pt,
  randomArena,
  randomSpec,
  splitAt,
  steinerLineSpec,
  vertexAtPoint,
  type ArenaSpec,
  type Districts,
} from './support.js';

function dirtyCount(p: Plat): number {
  return (p.index?.partitions ?? []).filter((part) => isDirty(p, part)).length;
}

describe('partitions and the home column (§3.3)', () => {
  it('one partition per arena at L0–L1; one per district plus one outside at L2–L4; every item at home in its own', () => {
    const d: Districts = { cutX: 2000, hinterlandY: 3000 };
    const p = randomArena(3, d).built.plat;
    const idx = p.index;
    if (idx === undefined) throw new Error('no index');
    expect(idx.partitions.filter((x) => x.level <= 1).map((x) => [x.level, x.key])).toEqual([[0, ''], [1, '']]);
    for (const part of idx.partitions) {
      expect(partitionById(p, part.id)).toBe(part);
      if (part.level >= 2) expect(['', 'd:a', 'd:b']).toContain(part.key);
    }
    expect(new Set(idx.partitions.map((x) => `${x.level}/${x.key}`)).size).toBe(idx.partitions.length);
    for (const level of LEVELS) {
      for (const item of levelItems(p, level)) {
        const part = partitionById(p, homeOf(p, item));
        expect(part.level).toBe(level);
        expect(part.key).toBe(districtOf(p, d, item));
        expect(part.keys.includes(itemKey(item.kind, item.slot))).toBe(true);
      }
    }
    expect(checkIndexState(p)).toEqual([]);
  });

  it('gives an item two partitions share to the smaller key (as §3.9’s chunks do)', () => {
    const p = buildArena(randomSpec(generator(4))).plat;
    attachIndex(p, { gridCellCm: CELLS, partitionOf: () => ['d:c', 'd:b', 'd:z'] });
    const item = levelItems(p, 2)[0] ?? levelItems(p, 3)[0];
    expect(partitionKeyOf(p, item)).toBe('d:b');
    expect(partitionKeyOf(p, levelItems(p, 1)[0])).toBe('');
    expect(new Set(p.index?.partitions.filter((x) => x.level >= 2).map((x) => x.key))).toEqual(new Set(['d:b']));
    expect(() => attachIndex(p, { gridCellCm: CELLS, partitionOf: () => [] })).toThrow(/at least one key/);
  });

  it('tombstones through the home entry: the key joins that partition’s set and the entry reads −1', () => {
    const p = randomArena(5, null).built.plat;
    const item = levelItems(p, 1)[0];
    const home = homeOf(p, item);
    expect(home).toBeGreaterThanOrEqual(0);
    expect(tombstone(p, item)).toBe(home);
    expect(homeOf(p, item)).toBe(-1);
    expect(tombstonesOf(p, partitionById(p, home)).has(itemKey(item.kind, item.slot))).toBe(true);
    expect(tombstone(p, item)).toBe(-1); // no static copy left: nothing to do
    expect(gridDelete(p, item)).toBe(false);
    // A home names a partition of the item's own level: a tombstone named at another level is a programming error.
    const other = levelItems(p, 2)[0];
    expect(() => tombstone(p, { kind: other.kind, level: 3, slot: other.slot })).toThrow(/home is a partition of L2/);
  });
});

describe('the rebuild moments (§3.3) and index.rebuilds', () => {
  it('(1) a stage end: an eager stage rebuilds every dirty partition once; a per-district stage its own district’s', () => {
    const d: Districts = { cutX: 2000, hinterlandY: 3000 };
    const p = randomArena(6, d).built.plat;
    const idx = p.index;
    if (idx === undefined) throw new Error('no index');
    for (const level of LEVELS) levelItems(p, level).forEach((item, i) => i % 3 === 0 && indexChange(p, item));
    const dirtyA = idx.partitions.filter((x) => isDirty(p, x) && x.level >= 2 && x.key === 'd:a').length;
    const all = dirtyCount(p);
    expect(dirtyA).toBeGreaterThan(0);
    const w0 = idx.work.rebuilds;
    expect(rebuildAtStageEnd(p, 'd:a')).toBe(dirtyA);
    expect(idx.work.rebuilds - w0).toBe(dirtyA);
    expect(idx.partitions.filter((x) => isDirty(p, x) && x.level >= 2 && x.key === 'd:a')).toEqual([]);
    expect(dirtyCount(p)).toBe(all - dirtyA);
    expect(rebuildAtStageEnd(p)).toBe(all - dirtyA);
    expect(dirtyCount(p)).toBe(0);
    for (const level of LEVELS) expect(idx.levels[level].dynamic.entries.size).toBe(0);
    expect(rebuildAtStageEnd(p)).toBe(0); // nothing dirty: nothing rebuilt
    expect(checkIndexState(p)).toEqual([]);
    // The hinterland's unit (the outside partition's key, '' — also the key of the L0 and L1 partitions) rebuilds its
    // L2–L4 partitions only: the arena-wide L0 and L1 partitions wait for an eager stage's end.
    for (const level of LEVELS) levelItems(p, level).forEach((item, i) => i % 3 === 0 && indexChange(p, item));
    const coarse = idx.partitions.filter((x) => x.level <= 1 && isDirty(p, x));
    const outside = idx.partitions.filter((x) => x.level >= 2 && x.key === '' && isDirty(p, x));
    expect(coarse.length).toBe(2);
    expect(outside.length).toBeGreaterThan(0);
    expect(rebuildAtStageEnd(p, '')).toBe(outside.length);
    expect(coarse.every((x) => isDirty(p, x))).toBe(true);
  });

  it('(2) an editing session: a partition is rebuilt when its grid overflow exceeds max(256, ¼ of its static size)', () => {
    expect([overflowThreshold(0), overflowThreshold(1000), overflowThreshold(1027), overflowThreshold(1028), overflowThreshold(4000)]).toEqual([256, 256, 256, 257, 1000]);
    for (const n of [600, 2400]) {
      const p = buildArena(steinerLineSpec(n)).plat;
      attachIndex(p, { gridCellCm: CELLS });
      const idx = p.index;
      if (idx === undefined) throw new Error('no index');
      const part = partitionById(p, idx.byKey[3].get('') ?? -1);
      expect(part.keys.length).toBe(n);
      const limit = overflowThreshold(n);
      const items = levelItems(p, 3);
      for (let i = 0; i < limit; i++) indexChange(p, items[i]);
      expect(part.pending.size).toBe(limit);
      expect(rebuildOverflowing(p)).toBe(0); // at the threshold: not yet
      indexChange(p, items[limit]);
      const w0 = idx.work.rebuilds;
      expect(rebuildOverflowing(p)).toBe(1); // past it: rebuilt, once
      expect(idx.work.rebuilds - w0).toBe(1);
      expect(part.pending.size).toBe(0);
      expect(tombstonesOf(p, part).size).toBe(0);
      expect(checkIndexState(p)).toEqual([]);
    }
  });

  it('(3) the pool freeze’s hook: every dirty partition rebuilt, then every grid and tombstone set empty (§3.10)', () => {
    const d: Districts = { cutX: 2000, hinterlandY: 3000 };
    const p = randomArena(7, d).built.plat;
    for (const level of LEVELS) levelItems(p, level).forEach((item, i) => i % 2 === 0 && indexChange(p, item));
    const dirty = dirtyCount(p);
    expect(rebuildForFreeze(p)).toBe(dirty);
    const idx = p.index;
    if (idx === undefined) throw new Error('no index');
    for (const level of LEVELS) {
      expect(idx.levels[level].dynamic.entries.size).toBe(0);
      for (const t of idx.levels[level].tombstones) expect(t.size).toBe(0);
    }
    expect(rebuildForFreeze(p)).toBe(0);
    expect(checkIndexState(p)).toEqual([]);
  });

  it('charges index.rebuilds: one per partition rebuilt, with the items it indexed', () => {
    const p = randomArena(8, null).built.plat;
    const idx = p.index;
    if (idx === undefined) throw new Error('no index');
    expect(INDEX_REBUILDS).toBe('index.rebuilds');
    const r0 = idx.work.rebuilds;
    const i0 = idx.work.items;
    const part = idx.partitions[idx.partitions.length - 1];
    const n = rebuildPartition(p, part.id);
    expect(n).toBe(part.keys.length);
    expect(idx.work.rebuilds - r0).toBe(1);
    expect(idx.work.items - i0).toBe(n);
  });
});

/** The edits of the cost-model fixture: Steiner and same-level splits at fixed points on axis-parallel edges. */
function editList(p: Plat, n: number, seed: number): { x: number; y: number; level: Level }[] {
  const rnd = generator(seed);
  const out: { x: number; y: number; level: Level }[] = [];
  const taken = new Set<string>();
  const O = p.halfEdges.origin;
  for (let tries = 0; out.length < n && tries < 100 * n; tries++) {
    const e = Math.floor(rnd() * p.slots.pair.top);
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const m = p.halfEdges.level[e];
    if (m === 0) continue;
    const ax = p.vertices.x[O[2 * e]];
    const ay = p.vertices.y[O[2 * e]];
    const bx = p.vertices.x[O[2 * e + 1]];
    const by = p.vertices.y[O[2 * e + 1]];
    const len = Math.abs(bx - ax) + Math.abs(by - ay);
    if (len < 40) continue;
    const t = 10 * (1 + Math.floor(rnd() * (len / 10 - 1)));
    const x = ax + Math.sign(bx - ax) * t;
    const y = ay + Math.sign(by - ay) * t;
    const k = `${x},${y}`;
    if (taken.has(k) || vertexAtPoint(p, x, y) !== -1) continue;
    taken.add(k);
    out.push({ x, y, level: Math.max(m, 2 + Math.floor(rnd() * 3)) as Level });
  }
  return out;
}

function pairThrough(p: Plat, x: number, y: number): number {
  const O = p.halfEdges.origin;
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const ax = p.vertices.x[O[2 * e]];
    const ay = p.vertices.y[O[2 * e]];
    const bx = p.vertices.x[O[2 * e + 1]];
    const by = p.vertices.y[O[2 * e + 1]];
    if ((ax === bx && x === ax && y > Math.min(ay, by) && y < Math.max(ay, by)) || (ay === by && y === ay && x > Math.min(ax, bx) && x < Math.max(ax, bx))) return e;
  }
  throw new Error(`no edge through ${x},${y}`);
}

const EDITS = 240;

/** Applies the fixed edits in `commits` commits; returns the rebuild work charged during the commits and at the stage end. */
function stage(commits: number, mode: 'generation' | 'per-commit'): { during: number; duringItems: number; end: number; endItems: number } {
  const d: Districts = { cutX: 2000, hinterlandY: 3000 };
  const { built } = randomArena(21, d);
  const p = built.plat;
  const idx = p.index;
  if (idx === undefined) throw new Error('no index');
  const edits = editList(p, EDITS, 99);
  expect(edits).toHaveLength(EDITS);
  const r0 = idx.work.rebuilds;
  const i0 = idx.work.items;
  const per = Math.ceil(edits.length / commits);
  for (let c = 0; c < commits; c++) {
    const chunk = edits.slice(c * per, (c + 1) * per);
    if (chunk.length === 0) continue;
    edit(p, d, Math.min(...chunk.map((x) => x.level)) as Level, () => {
      for (const s of chunk) {
        const e = pairThrough(p, s.x, s.y);
        splitAt(p, e, pt(s.x, s.y), Math.max(s.level, p.halfEdges.level[e]) as Level);
      }
    });
    if (mode === 'per-commit') rebuildDirty(p);
  }
  const during = idx.work.rebuilds - r0;
  const duringItems = idx.work.items - i0;
  rebuildAtStageEnd(p);
  expect(checkIndexState(p)).toEqual([]);
  return { during, duringItems, end: idx.work.rebuilds - r0 - during, endItems: idx.work.items - i0 - duringItems };
}

/** An editing session of k one-item commits on the Steiner line, rebuild moment (2) at each commit: the rebuild work. */
function session(n: number, k: number): { rebuilds: number; items: number } {
  const p = buildArena(steinerLineSpec(n)).plat;
  attachIndex(p, { gridCellCm: CELLS });
  const idx = p.index;
  if (idx === undefined) throw new Error('no index');
  const items = levelItems(p, 3);
  const r0 = idx.work.rebuilds;
  const i0 = idx.work.items;
  for (let c = 0; c < k; c++) {
    indexChange(p, items[c % items.length]); // one item edited per commit
    rebuildOverflowing(p);
  }
  expect(checkIndexState(p)).toEqual([]);
  return { rebuilds: idx.work.rebuilds - r0, items: idx.work.items - i0 };
}

describe('rebuild work never grows with the number of commits (§13.2’s cost-model claim; the exit bar)', () => {
  it(`a stage’s ${EDITS} edits in 1, 8, 60 or ${EDITS} commits: no rebuild per commit, the same rebuild work at its end`, () => {
    const runs = [1, 8, 60, EDITS].map((c) => ({ c, ...stage(c, 'generation') }));
    for (const r of runs) {
      expect(r.during, `${r.c} commits`).toBe(0);
      expect([r.end, r.endItems], `${r.c} commits`).toEqual([runs[0].end, runs[0].endItems]);
    }
    // The contrast §3.3 rules out: a rebuild per commit grows with the commits.
    const perCommit = [24, EDITS].map((c) => ({ c, ...stage(c, 'per-commit') }));
    expect(perCommit[1].duringItems).toBeGreaterThan(3 * perCommit[0].duringItems);
    const table = [...runs.map((r) => `generation, ${r.c} commits: ${r.during} + ${r.end} rebuilds, ${r.duringItems} + ${r.endItems} items`),
      ...perCommit.map((r) => `a rebuild per commit, ${r.c} commits: ${r.during} rebuilds, ${r.duringItems} items`)];
    console.log(`cost model (index.rebuilds, items rebuilt):\n  ${table.join('\n  ')}`);
  }, 300_000);

  it('an editing session: rebuild moment (2) keeps the rebuild work per commit flat as the commits grow', () => {
    const n = 2000;
    const t = overflowThreshold(n); // 500
    const runs = [1000, 4000].map((k) => ({ k, ...session(n, k) }));
    for (const r of runs) {
      expect(r.rebuilds, `${r.k} commits`).toBe(Math.floor(r.k / (t + 1)));
      // each rebuild indexes the partition (n items), so the work per commit is n ÷ (threshold + 1), whatever the count
      expect(r.items / r.k).toBeLessThanOrEqual(n / (t + 1) + 0.01);
    }
    console.log(`editing session (n = ${n}, threshold ${t}): ${runs.map((r) => `${r.k} commits → ${r.rebuilds} rebuilds, ${(r.items / r.k).toFixed(2)} items per commit`).join('; ')}`);
  }, 120_000);
});
