// M0-a-06's exit bar, its second half (§13.2 *Batch cost*; §3.10: "a batch costs O(touched), never O(model)"): every
// commit record's `work` and its four counts (`edgesAdded`, `edgesRemoved`, `steinerAdded`, `steinerDissolved`) stay
// within a constant × the batch's touched faces on the fuzz runs, and a count that grows with the arena fails — the same
// local batch charges the same work in arenas 1 to 144 blocks large. Counts only: no timing is taken (J157).
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, touchedFaces, tx, type CommitRecord } from '../../src/tx/index.js';
import { randomBatch, rng, type Live } from './fuzzgen.js';
import { commit, framed, healthy, must, pt, spec } from './support.js';

/** The constant of the bar: work and each count per touched face (and per batch, where it touched one face). */
const PER_FACE = 160;

/** A k × k grid of 1000 cm blocks: a frame of side 1000·k crossed by k − 1 ways each way. */
function grid(k: number): Plat {
  const side = 1000 * k;
  const p = framed(side);
  commit(p, 1, (o) => {
    for (let i = 1; i < k; i++) {
      must(insertChain(o, [pt(1000 * i, 0), pt(1000 * i, side)], [{ role: 'way', entity: `v:${i}` }], 'mandatory'));
      must(insertChain(o, [pt(0, 1000 * i), pt(side, 1000 * i)], [{ role: 'way', entity: `h:${i}` }], 'mandatory'));
    }
    return { ok: true as const, value: null, warnings: [] };
  });
  return p;
}

/** The record's size: its work, its four counts and its touched faces. */
function size(r: CommitRecord): { work: number; counts: number[]; touched: number } {
  return { work: r.work, counts: [r.edgesAdded, r.edgesRemoved, r.steinerAdded, r.steinerDissolved], touched: touchedFaces(r) };
}

describe('§13.2 batch cost: a count that grows with the arena fails', () => {
  it('a lane across the corner block, then its removal: the same work and counts at k = 2, 4, 8, 12', () => {
    const rows: string[] = [];
    for (const k of [2, 4, 8, 12]) {
      const p = grid(k);
      const a = commit(p, 1, (o) => insertChain(o, [pt(500, 0), pt(500, 1000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
      const b = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
      healthy(p);
      const sa = size(a.record as CommitRecord);
      const sb = size(b.record as CommitRecord);
      rows.push(JSON.stringify([sa, sb]));
    }
    expect(new Set(rows).size).toBe(1);
  }, 120_000);
});

describe('§13.2 batch cost: work and counts within a constant × touched faces on the fuzz runs', () => {
  it(`every committed record of 24 fuzz runs: work and each count ≤ ${PER_FACE} × max(1, touched faces)`, () => {
    let records = 0;
    let worst = 0;
    for (let seed = 1; seed <= 24; seed++) {
      const r = rng(seed * 7919);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let step = 0; step < 14; step++) {
        const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
        const b = randomBatch(p, live, r);
        const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
        if (!res.ok) {
          live.ways = snapshot.ways;
          live.kerbs = snapshot.kerbs;
          continue;
        }
        if (res.value.record === null) continue;
        const s = size(res.value.record);
        const per = Math.max(1, s.touched);
        records++;
        worst = Math.max(worst, s.work / per, ...s.counts.map((c) => c / per));
        expect(s.work).toBeLessThanOrEqual(PER_FACE * per);
        for (const c of s.counts) expect(c).toBeLessThanOrEqual(PER_FACE * per);
      }
    }
    expect(records).toBeGreaterThan(100);
    expect(worst).toBeGreaterThan(0);
  }, 120_000);
});
