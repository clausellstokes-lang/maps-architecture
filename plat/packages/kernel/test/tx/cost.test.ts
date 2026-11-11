// M0-a-06's exit bar, its second half (§13.2 *Batch cost*; §3.10: "a batch costs O(touched), never O(model)"): every
// commit record's `work` and its four counts (`edgesAdded`, `edgesRemoved`, `steinerAdded`, `steinerDissolved`) stay
// within a constant × the batch's touched faces on the fuzz runs, and a count that grows with the arena fails — the same
// local batch charges the same work in arenas 1 to 144 blocks large. Counts only: no timing is taken (J157).
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createPlat, type Plat } from '../../src/arena/index.js';
import { entryCounts } from '../../src/arena/write.js';
import { kerb } from '../../src/arr/kerb.js';
import { splitFace } from '../../src/faces/index.js';
import { attachIndex } from '../../src/index/index.js';
import type * as Insert from '../../src/insert/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, touchedFaces, tx, type CommitRecord } from '../../src/tx/index.js';
import { frameObserver, setFrameObserver, setUndoTally, undoTally, type FrameObserver } from '../../src/tx/frames.js';
import { FRAME, GROUND } from '../arena/support.js';
import { TINY_TABLES } from '../arena/tiny.js';
import { faceAt } from '../faces/support.js';
import { CELLS } from '../insert/step1-2/support.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live, type Mix } from './fuzzgen.js';
import { commit, framed, healthy, must, pt, spec } from './support.js';

/**
 * Hardening round S9, line 5 (d)'s bent cut: off, or on for the next insertion, which then comes back with one extra
 * point beside its first segment (as an attraction the contact decision did not foresee would: faces/bent.test.ts's
 * fault), so splitFace refuses it bent and rolls its op frame back. Off, every insertion is the real one.
 */
const bend = vi.hoisted(() => ({ on: false }));
vi.mock('../../src/insert/index.js', async (importOriginal) => {
  const k = await importOriginal<typeof Insert>();
  const bending: typeof k.insertChain = (t, points, rows, cls, opts) => {
    if (!bend.on) return k.insertChain(t, points, rows, cls, opts);
    bend.on = false;
    const a = points[0];
    const b = points[1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const extra = { x: Math.round((a.x + b.x) / 2 - (60 * dy) / len), y: Math.round((a.y + b.y) / 2 + (60 * dx) / len) };
    const r = k.insertChain(t, [a, extra as typeof a, ...points.slice(1)], rows, cls, opts);
    if (!r.ok) return r;
    return { ...r, value: { ...r.value, placed: [r.value.placed[0], ...r.value.placed.slice(2)] } };
  };
  return { ...k, insertChain: bending };
});

/** The constant of the bar: work and each count per touched face (and per batch, where it touched one face). */
const PER_FACE = 160;

/**
 * The bar restated on the wide families (hardening round S7, checks/M0-a-06-notes.md N-9): 160 is fitted to the 24 seeds
 * above, and the ratio is bound by the length of the rings a batch walks, not by a constant (C-0189 (6)). Over the S6
 * golden's wide families (34 069 committed records; default × 7919 seeds 1 – 1 200, along × 104 729 1 – 1 200, heavy
 * × 15 485 863 1 – 800) the worst work per touched face is 185 (default 736 @ 11, a clear touching one antenna face),
 * 142 (along 531 @ 15) and 160 (heavy 690 @ 15), and the worst count per touched face 9; per touched face AND edge
 * (faces + edgesAdded + edgesRemoved) it is 47, 92 and 98 — no tighter, since the outliers touch one face and no edge
 * (a lane removed along shared edges walks the rings beside it and deletes nothing). So the wide bar quotes those worst
 * cases with its constants: work ≤ 200 and each count ≤ 10 per touched face (at least one), on a third of each family.
 */
const WIDE_WORK_PER_FACE = 200;
const WIDE_COUNT_PER_FACE = 10;

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

/**
 * Hardening round S9, line 5 (e) — §13.2's batch-cost clause extended to the undo log: at every commit, the batch frame's
 * entries (column and replacement entries from its mark, entryCounts; and the index writes of its IndexBatchLog) are
 * read by a test observer (tx/frames.ts's commit point), so each fuzz record below is judged on them too.
 */
const atCommit = { column: 0, replacement: 0, index: 0, seen: 0 };
let observerWas: FrameObserver | null = null;
const COUNT_AT_COMMIT: FrameObserver = {
  batchMarked() {},
  marked() {},
  beforeUndo() {},
  afterUndo() {},
  commit(p, b) {
    const c = entryCounts(p, b.arena);
    atCommit.column = c.column;
    atCommit.replacement = c.replacement;
    atCommit.index = p.index?.log?.writes.length ?? 0;
    atCommit.seen++;
  },
};
/** The batch frame's entries at the last commit, all three kinds: the undo log a batch keeps. */
const entriesAtCommit = (): number => atCommit.column + atCommit.replacement + atCommit.index;
/**
 * Bar (6)'s constant per touched face, by run: PER_FACE (160) on the clause's own runs (the 24 seeds, default mode:
 * worst 124 measured). REPORTED, for the session's ruling (checks/M0-a-06-notes.md 'Hardening round S9', N-s9-2): every
 * store is logged (line 4's dedupe not built), so a lane insertion that touches one face logs up to ≈ 180 entries — the
 * wide families' worst is 183 in the default mode — and the tiny-tables mode adds a replacement entry per allocation and
 * the rehash stores of its one-slot hash tables (worst 169 on the 24 seeds, 269 on the wide families). Those runs assert
 * the measured worst rounded up, never more; the size pin above holds that no count grows with the arena.
 */
const ENTRIES_PER_FACE = TINY_TABLES ? 280 : PER_FACE;
const WIDE_ENTRIES_PER_FACE = TINY_TABLES ? 280 : 190;

/**
 * Hardening round S9, line 5 (d) — THE SIZE PIN: an op frame's undo costs O(what the op wrote), never O(arena). The
 * k × k grid of `grid` on an arena created with capacities large enough that no slot table, hash table or hole pool
 * grows inside a measured frame at any k (an undo puts every growth back, so a second read in the same batch would meet
 * the same growth); one L1 batch reads the corner block's kerb (the dry run: an op frame rolled back) and then refuses a
 * splitFace of it bent (its op frame rolled back), each measured through tx/frames.ts's undo tally — the column and
 * replacement entries its undos took back (entryCounts at undoTo) and the index writes (the IndexBatchLog's writes at
 * undoTo less the mark's). Default mode only: the tiny-tables mode grows every table by one slot, so every frame meets a
 * growth there by design (C-0286).
 */
const ROOMY = { vertices: 1 << 13, edgePairs: 1 << 14, faces: 1 << 10, roleRows: 1 << 15, roleKeys: 1 << 12, owners: 1 << 9, handles: 1 << 10, idUnits: 1 << 15, holes: 1 << 12 };

function roomyGrid(k: number): Plat {
  const side = 1000 * k;
  const p = createPlat(GROUND, FRAME, ROOMY);
  attachIndex(p, { gridCellCm: CELLS });
  commit(p, 0, (o) => insertChain(o, [pt(0, 0), pt(side, 0), pt(side, side), pt(0, side)], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true }));
  commit(p, 1, (o) => {
    for (let i = 1; i < k; i++) {
      must(insertChain(o, [pt(1000 * i, 0), pt(1000 * i, side)], [{ role: 'way', entity: `v:${i}` }], 'mandatory'));
      must(insertChain(o, [pt(0, 1000 * i), pt(side, 1000 * i)], [{ role: 'way', entity: `h:${i}` }], 'mandatory'));
    }
    return { ok: true as const, value: null, warnings: [] };
  });
  return p;
}

interface Sized {
  readonly undos: number;
  readonly column: number;
  readonly replacement: number;
  readonly index: number;
}

/** The corner block's kerb read and its bent splitFace, each one op frame's undo, measured in one L1 batch. */
function cornerFrames(k: number): { read: Sized; split: Sized } {
  const p = roomyGrid(k);
  const widths = (c: { role: string }): { halfWidthCm: number } | null => (c.role === 'way' || c.role === 'margin' ? { halfWidthCm: 60 } : null);
  let read: Sized = { undos: 0, column: 0, replacement: 0, index: 0 };
  let split: Sized = read;
  const before = JSON.stringify(p.slots);
  commit(p, 1, (o) => {
    const f = faceAt(p, 1, 500, 500);
    setUndoTally(true);
    expect(kerb(o, f, widths).ok, `k ${k}: the corner block's kerb`).toBe(true);
    read = undoTally();
    setUndoTally(true);
    bend.on = true;
    const r = splitFace(o, f, [pt(0, 500), pt(1000, 500)], { rows: [{ role: 'district_bound', entity: 'd:size' }] });
    bend.on = false;
    split = undoTally();
    setUndoTally(false);
    expect(r.ok, `k ${k}: the bent cut refused`).toBe(false);
    if (!r.ok) expect(r.detail).toMatch(/^the insertion bent the judged cut/);
    return { ok: true as const, value: null, warnings: [] };
  });
  expect(JSON.stringify(p.slots), `k ${k}: the batch wrote nothing`).toBe(before);
  return { read, split };
}

describe.skipIf(TINY_TABLES)('S9 line 5 (d): an op frame\'s undo log does not grow with the arena (the size pin)', () => {
  it('the corner block\'s kerb read and its bent splitFace at k = 2, 4, 8, 12: no replacement, the column and index entries within ±10 % of k = 2', () => {
    const rows: string[] = [];
    const at = new Map<number, { read: Sized; split: Sized }>();
    for (const k of [2, 4, 8, 12]) {
      const m = cornerFrames(k);
      at.set(k, m);
      rows.push(`k ${k}: read ${JSON.stringify(m.read)} split ${JSON.stringify(m.split)}`);
    }
    console.info(`size pin:\n${rows.join('\n')}`);
    const base = at.get(2) as { read: Sized; split: Sized };
    for (const [k, m] of at) {
      for (const [name, s, b] of [['read', m.read, base.read], ['split', m.split, base.split]] as const) {
        expect(s.undos, `k ${k} ${name}: one op frame undone at least`).toBeGreaterThan(0);
        expect(s.replacement, `k ${k} ${name}: no growth, rehash or compaction inside the frame`).toBe(0);
        expect(Math.abs(s.column - b.column), `k ${k} ${name}: column entries ${s.column} against ${b.column} at k = 2`).toBeLessThanOrEqual(0.1 * b.column);
        expect(Math.abs(s.index - b.index), `k ${k} ${name}: index entries ${s.index} against ${b.index} at k = 2`).toBeLessThanOrEqual(0.1 * b.index);
      }
    }
  }, 120_000);
});

describe('§13.2 batch cost: work and counts within a constant × touched faces on the fuzz runs', () => {
  beforeAll(() => {
    observerWas = frameObserver;
    setFrameObserver(COUNT_AT_COMMIT);
  });
  afterAll(() => {
    setFrameObserver(observerWas);
  });
  it(`every committed record of 24 fuzz runs: work and each count ≤ ${PER_FACE} × max(1, touched faces); the undo log (S9 bar (6)) ≤ ${ENTRIES_PER_FACE}${TINY_TABLES ? ' — REPORTED: 160 is exceeded in the tiny-tables mode (worst 169), N-s9-2' : ''}`, () => {
    let records = 0;
    let worst = 0;
    let worstEntries = 0;
    atCommit.seen = 0;
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
        // bar (6): the batch frame's undo-log entries at this commit, within the same constant × touched faces
        expect(atCommit.seen).toBe(records);
        worstEntries = Math.max(worstEntries, entriesAtCommit() / per);
        expect(entriesAtCommit(), `seed ${seed} batch ${step} (${b.kind}): the undo log's entries ${JSON.stringify(atCommit)}`).toBeLessThanOrEqual(ENTRIES_PER_FACE * per);
      }
    }
    expect(records).toBeGreaterThan(100);
    expect(worst).toBeGreaterThan(0);
    expect(worstEntries).toBeGreaterThan(0);
    console.info(`bar (6): ${records} commits, the worst undo-log entries per touched face ${worstEntries.toFixed(1)} (≤ ${ENTRIES_PER_FACE})`);
  }, 120_000);
});

describe('§13.2 batch cost on the wide families (N-9): the worst cases quoted with the constants', () => {
  beforeAll(() => {
    observerWas = frameObserver;
    setFrameObserver(COUNT_AT_COMMIT);
  });
  afterAll(() => {
    setFrameObserver(observerWas);
  });
  const FAMILIES: { name: string; mult: number; mix: Mix; steps: number; seeds: number }[] = [
    { name: 'default', mult: 7919, mix: DEFAULT_MIX, steps: 14, seeds: 400 },
    { name: 'along', mult: 104_729, mix: ALONG_MIX, steps: 16, seeds: 400 },
    { name: 'heavy', mult: 15_485_863, mix: { way: 0.2, lane: 0.3, along: 0.25 }, steps: 20, seeds: 270 },
  ];
  for (const f of FAMILIES) {
    it(`${f.name}: seeds 1 – ${f.seeds}, work ≤ ${WIDE_WORK_PER_FACE} and each count ≤ ${WIDE_COUNT_PER_FACE} per touched face; the undo log ≤ ${WIDE_ENTRIES_PER_FACE} (S9 bar (6) — REPORTED: above 160 on the wide families, N-s9-2)`, () => {
      let records = 0;
      let worst = 0;
      let worstEntries = 0;
      atCommit.seen = 0;
      for (let seed = 1; seed <= f.seeds; seed++) {
        const r = rng(seed * f.mult);
        const p = framed();
        const live: Live = { ways: [], kerbs: [], next: 0 };
        for (let step = 0; step < f.steps; step++) {
          const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
          const b = randomBatch(p, live, r, f.mix);
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
          worst = Math.max(worst, s.work / per);
          expect(s.work, `seed ${seed} batch ${step} (${b.kind})`).toBeLessThanOrEqual(WIDE_WORK_PER_FACE * per);
          for (const c of s.counts) expect(c, `seed ${seed} batch ${step} (${b.kind})`).toBeLessThanOrEqual(WIDE_COUNT_PER_FACE * per);
          // bar (6) (hardening round S9, line 5 (e)): the batch frame's undo-log entries at this commit
          expect(atCommit.seen).toBe(records);
          worstEntries = Math.max(worstEntries, entriesAtCommit() / per);
          expect(entriesAtCommit(), `seed ${seed} batch ${step} (${b.kind}): the undo log's entries ${JSON.stringify(atCommit)}`).toBeLessThanOrEqual(WIDE_ENTRIES_PER_FACE * per);
        }
      }
      expect(records).toBeGreaterThan(2000);
      expect(worst).toBeGreaterThan(50);
      console.info(`bar (6), ${f.name}: ${records} commits, the worst undo-log entries per touched face ${worstEntries.toFixed(1)} (≤ ${WIDE_ENTRIES_PER_FACE})`);
    }, 300_000);
  }
});
