// M0-a-14 on the fuzz runs (§13.1 B-FUZZ for this item; the spec note N-16: the item's own arbitraries — M0-a-06's batch
// generator and M0-a-13's warp steps — in its kernel test folder): every batch runs with the whole suite wired into its
// transaction. The suite never refuses a batch the independent oracles find valid, every committed arena passes the
// CI sweep (the Euler characteristic per level on every arena, every batch-local row over the whole arena, the stored
// references, the index state), and §13.2's cost model holds: the faces the suite reads per batch stay within a constant
// × the batch's touched faces, and the same local batch reads the same counts in arenas 16 to 256 blocks large.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { isVertexLive, type Plat, type VertexId } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { checkCI, hardProblems, rowNamed } from '../../src/invariants/index.js';
import { removeEdges, tx } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { warp, type WarpOptions } from '../../src/warp/index.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live } from '../tx/fuzzgen.js';
import { box, brush, type BrushKind } from '../warp/support.js';
import { allProblems, commit, framed, fuzzRun, must, pt, spec, suiteRefusal, suiteTx } from './support.js';
import { suiteEnv, suiteReport } from '../../src/invariants/index.js';

/** PLAT_FUZZ_RUNS (10⁴ in the PR tier, 10⁶ nightly; C-0057): the seeds and warp cases scale with it. */
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const SEEDS = Math.max(12, Math.floor(RUNS / 500));
const WARPS = Math.max(48, Math.floor(RUNS / 100));

/** The cost bar's constant: distinct faces the suite reads per touched face (and per batch where it touched none). */
const FACES_PER_TOUCHED = 12;

describe('B-FUZZ: the suite on every batch of the fuzz runs', () => {
  for (let seed = 1; seed <= SEEDS; seed++) {
    it(`seed ${seed}: no batch the oracles accept is refused by the suite; every arena passes the CI sweep`, () => {
      let checked = 0;
      const mix = seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX;
      const run = fuzzRun(seed * 7919, 18, mix, (p, s) => {
        if (s.refused !== null) expect(suiteRefusal(s.refused.slice(s.refused.indexOf(' ') + 1)), s.refused).toBeNull();
        expect(allProblems(p)).toEqual([]);
        const ci = checkCI(p);
        expect(hardProblems(ci)).toEqual([]);
        expect(ci.find((r) => r.name === 'euler')?.subjects).toBeGreaterThan(0);
        checked++;
      });
      expect(checked).toBe(18);
      expect(run.steps.some((s) => s.record !== null)).toBe(true);
    }, 300_000);
  }
});

describe('§13.2 cost model: the faces the suite reads stay within a constant × touched faces', () => {
  it(`every checked batch of 12 fuzz runs reads ≤ ${FACES_PER_TOUCHED} × max(1, touched) faces`, () => {
    let lines = 0;
    let worst = 0;
    for (let seed = 1; seed <= 12; seed++) {
      const run = fuzzRun(seed * 104_729, 16, seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX);
      for (const line of run.report.batches) {
        const per = Math.max(1, line.touchedFaces);
        lines++;
        worst = Math.max(worst, line.checked.faces / per);
        expect(line.checked.faces, JSON.stringify({ touched: line.touchedFaces, checked: line.checked })).toBeLessThanOrEqual(FACES_PER_TOUCHED * per);
      }
    }
    expect(lines).toBeGreaterThan(100);
    expect(worst).toBeGreaterThan(0);
  }, 300_000);
});

/** A k × k grid of 1000 cm blocks: a frame of side 1000·k crossed by k − 1 ways each way, each block then crossed by an L2 kerb. */
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

describe('§13.2 cost model: a count that grows with the arena fails', () => {
  it('an L2 lane inside the corner block, then its removal: the same checked counts at k = 4, 8, 12, 16 (an interior block in each)', () => {
    const rows: string[] = [];
    for (const k of [4, 8, 12, 16]) {
      const p = grid(k);
      const a = suiteTx(p, 2, (o) => insertChain(o, [pt(1300, 1200), pt(1700, 1800)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
      const b = suiteTx(p, 2, (o) => removeEdges(o, { role: 'kerb', entity: 'lane:1' }));
      expect(a.res.ok && b.res.ok).toBe(true);
      const la = a.report.batches[0];
      const lb = b.report.batches[0];
      rows.push(JSON.stringify([la.touchedFaces, la.checked, lb.touchedFaces, lb.checked]));
    }
    expect(rows[0]).toContain('"faces"');
    expect(rows).toEqual([rows[0], rows[0], rows[0], rows[0]]);
  }, 120_000);

  it('the row names in the report are the declared rows', () => {
    const p = grid(2);
    const a = suiteTx(p, 2, (o) => insertChain(o, [pt(1300, 1200), pt(1700, 1800)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    for (const r of a.report.batches[0].results) expect(rowNamed(r.name).scope).toBe('batch');
  });
});

describe('B-FUZZ: the suite on warp steps (M0-a-13\'s moves), the held set and the moved vertices as its context', () => {
  const kinds: BrushKind[] = ['displace', 'pinch', 'bloat', 'swirl', 'jitter'];
  it(`${WARPS} warp cases over random arrangements: no valid step refused by the suite; every arena passes the CI sweep`, () => {
    let moved = 0;
    let heldCases = 0;
    for (let c = 1; c <= WARPS; c++) {
      const r = rng(c * 15_485_863);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      for (let i = 0; i < 3 + (c % 6); i++) {
        const b = randomBatch(p, live, r, { way: 0.35, lane: 0.75, along: 0.25 });
        tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
      }
      let top = 1;
      for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) top = Math.max(top, p.vertices.level[v]);
      const level = Math.min(1 + (c % 3), top) as Level;
      const movable: VertexId[] = [];
      for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.level[v] >= level) movable.push(v);
      const at = movable.length > 0 ? movable[Math.floor(r() * movable.length)] : -1;
      const cx = at >= 0 ? p.vertices.x[at] : 2000;
      const cy = at >= 0 ? p.vertices.y[at] : 2000;
      const radius = 200 + Math.floor(r() * 1200);
      const field = brush(kinds[c % kinds.length], cx, cy, radius, 0.2 + r() * 0.6, Math.floor(r() * 400) - 200, Math.floor(r() * 400) - 200);
      const region = box(Math.max(-10, cx - radius), Math.max(-10, cy - radius), Math.min(4010, cx + radius), Math.min(4010, cy + radius));
      const way = live.ways.length > 0 && c % 2 === 0 ? live.ways[c % live.ways.length] : null;
      const opts: WarpOptions = { held: way === null ? [] : [{ entity: way, ref: { role: 'way', entity: way } }] };
      let held: VertexId[] = [];
      const report = suiteReport();
      const res = tx(p, spec(level, { rederivesFrom: 0 as never }), (o) => {
        const w = warp(o, field, level, region, undefined, opts);
        if (w.ok) held = w.value.held;
        return w;
      }, suiteEnv({ report, context: () => ({ held }) }));
      if (!res.ok) expect(suiteRefusal(res.detail), res.detail).toBeNull();
      if (res.ok && res.value.record !== null) {
        moved += res.value.record.moved.length;
        if (held.length > 0) heldCases++;
        const line = report.batches[report.batches.length - 1];
        const h = line.results.find((x) => x.name === 'held-vertices');
        expect(h?.subjects).toBe(res.value.record.moved.length);
      }
      expect(allProblems(p)).toEqual([]);
      expect(hardProblems(checkCI(p))).toEqual([]);
    }
    expect(moved).toBeGreaterThan(WARPS);
    expect(heldCases).toBeGreaterThan(0);
  }, 300_000);
});
