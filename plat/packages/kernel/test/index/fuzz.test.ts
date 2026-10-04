// M0-a-03's exit bar (marked *here*): §3.10's index levels and freshness row holds on every fuzz batch — the batch wrote
// no index coarser than its own but for its promotions and demotions, and every item it deleted, re-levelled, changed
// or moved to another partition is tombstoned where its home entry pointed, its successor in the grid of its level —
// and, after every batch, the whole index agrees with the arena (checkIndexState), every query agrees with the
// brute-force oracle at every level, and every query's answer is identical before and after a rebuild of the partitions
// it reads (§13.1). Random rectilinear arenas, random batches (splits at every level, dissolutions, promotions,
// demotions, slides, regroups, re-walks of every face record, slots freed and reused), random rebuild moments between
// them. The size: PLAT_FUZZ_RUNS ÷ 50 arenas (200 at the PR size) × 40 batches each (C-0160); a negative control — one
// item's protocol withheld — fails the row.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { beginIndexBatch, checkIndexBatch, endIndexBatch, indexChange, query } from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import { fuzzCase, newTally, OPS, type FuzzHooks } from './batches.js';
import { applyProtocol, GROUND, homesOf, oracleQuery, randomArena, signatures, type Districts } from './support.js';

/** A generous timeout: the machine is shared (C-0025), so a test's wall-clock is contended. */
const SLOW = 120_000;

const RUNS = Math.max(4, Math.floor(Number(process.env.PLAT_FUZZ_RUNS ?? 10_000) / 50));
const BATCHES = 40;
const TIMEOUT = 900_000;

/** The fuzz's judge: every batch's row and the index's state clean, every query equal to the oracle's and across rebuilds. */
export function judge(): FuzzHooks {
  return {
    batch(i, r, state) {
      expect(r.problems, `batch ${i} (${r.op})`).toEqual([]);
      expect(state, `after batch ${i} (${r.op})`).toEqual([]);
    },
    query(p: Plat, n, box) {
      const q = query(p, GROUND, n, box);
      const o = oracleQuery(p, n, box);
      expect({ v: q.vertices, e: q.edges, f: q.faces }, `L${n} query over ${JSON.stringify(box)}`).toEqual({ v: o.vertices, e: o.edges, f: o.faces });
    },
    rebuilt(n, box, before, after) {
      // §13.1: a query's answer is identical before and after a rebuild of the partitions it reads.
      expect([after.vertices, after.edges, after.faces], `L${n} over ${JSON.stringify(box)} across a rebuild`).toEqual([before.vertices, before.edges, before.faces]);
    },
    moment(i, state) {
      expect(state, `after a rebuild moment following batch ${i}`).toEqual([]);
    },
  };
}

describe('the index levels and freshness row on every fuzz batch (§3.10; the exit bar)', () => {
  it(`holds on ${RUNS} random arenas × ${BATCHES} batches, the index agreeing with the arena and the oracle after each`, () => {
    let total = 0;
    const tally = newTally();
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 0x7fffffff }), (seed) => {
        total += fuzzCase(seed, BATCHES, judge(), tally);
      }),
      { numRuns: RUNS },
    );
    expect(total).toBeGreaterThan(RUNS * BATCHES * 0.8);
    // Every kind of batch ran, and every kind of change the row judges occurred.
    for (const op of OPS) expect(tally.ops.get(op) ?? 0, op).toBeGreaterThan(0);
    expect(tally.tombstoned).toBeGreaterThan(0);
    expect(tally.relevelled).toBeGreaterThan(0);
    expect(tally.deleted).toBeGreaterThan(0);
    expect(tally.reused).toBeGreaterThan(0);
    expect(tally.rebuildMoments).toBeGreaterThan(0);
    console.log(`fuzz: ${total} batches on ${RUNS} arenas; ops ${JSON.stringify([...tally.ops])}; tombstoned ${tally.tombstoned}, re-levelled ${tally.relevelled}, deleted ${tally.deleted}, reused ${tally.reused}, rebuild moments ${tally.rebuildMoments}`);
  }, TIMEOUT);

  it('fails when one changed item with a static copy is left untombstoned (the negative control)', () => {
    let caught = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const d: Districts = { cutX: 2000, hinterlandY: 3000 };
      const { built } = randomArena(seed, d);
      const p = built.plat;
      // A regroup (an L1 batch) moves statically held L2–L4 items to other partitions; the writer forgets one of them.
      const before = signatures(p, d);
      const homes = homesOf(p, before);
      d.cutX = 0;
      d.hinterlandY = 4000;
      const after = signatures(p, d);
      let victim: string | null = null;
      for (const [k, s] of before) if (s.item.level >= 2 && (homes.get(k) ?? -1) !== -1 && after.get(k)?.sig !== s.sig) victim = victim ?? k;
      if (victim === null) continue;
      beginIndexBatch(p, 1);
      const changed = applyProtocol(p, before, homes, after, (k) => k === victim);
      const log = endIndexBatch(p);
      const problems = checkIndexBatch(p, log, { promoted: [], demoted: { vertices: [], edges: [] }, changed });
      expect(problems.join('\n')).toMatch(/was not tombstoned in partition/);
      expect(problems.length).toBe(problems.filter((x) => x.includes(`${before.get(victim)?.item.slot}`)).length);
      caught++;
    }
    expect(caught).toBeGreaterThanOrEqual(6);
  }, SLOW);

  it('fails when a batch writes an index coarser than its own outside its promotions and demotions', () => {
    const d: Districts = { cutX: 2000, hinterlandY: 3000 };
    const { built } = randomArena(11, d);
    const p = built.plat;
    let v = -1;
    for (let u = 0; u < p.slots.vertex.top && v === -1; u++) if (p.vertices.level[u] === 1) v = u;
    expect(v).toBeGreaterThanOrEqual(0);
    const item = { kind: 0 as const, level: 1 as Level, slot: v };
    beginIndexBatch(p, 3);
    indexChange(p, item);
    const log = endIndexBatch(p);
    expect(checkIndexBatch(p, log, { promoted: [], demoted: { vertices: [], edges: [] }, changed: [] }).join('\n')).toMatch(/an L3 batch wrote the L1 index/);
    // Named as a promotion, the same write is the row's exception.
    expect(checkIndexBatch(p, log, { promoted: [v], demoted: { vertices: [], edges: [] }, changed: [] })).toEqual([]);
  });
});
