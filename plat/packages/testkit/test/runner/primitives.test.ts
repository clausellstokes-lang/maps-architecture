// The B-FUZZ runner over every kernel primitive (M0-k-04; §13.1's bar, §13.8's sizes; C-0091): each primitive of the
// runner's table run on the first inputs of its family — 0 crashes, 0 hangs, 0 invalid outputs, bugs empty — with the
// counts the report carries: typed refusals per §3.1 code, warnings per code, downgrades, work-limit hits, the oracle
// split for booleans, buffers and tileRings, the sampled determinism harnesses, the work quantiles per counter with
// their unit counts. A run is a function of (family, index): run twice it gives the same report, and a run of [first,
// first + n) is the corresponding slice of a longer run (the nightly's partitions). The bar's own size is the bench's.
import { beforeAll, describe, expect, it } from 'vitest';
import { FUZZ_COUNTER_UNITS, FUZZ_PRIMITIVES, FUZZ_SAMPLE_EVERY, loadOracles, runFuzz } from '@plat/testkit';

beforeAll(async () => {
  await loadOracles();
});

/** Inputs per primitive here (a run's first inputs; the PR size 10⁴ is the bench's). */
const N = 40;

/** §3.4's operations the table must hold (writers and services the kernel's façade lists, ≈ 20 primitives, §13.8). */
const REQUIRED = ['insertChain', 'splitFace', 'warp', 'corridorUnion', 'offsetFace', 'insetRing', 'kerb', 'query', 'encodeArena', 'snap', 'orient', 'area2', 'hull', 'obb', 'lir', 'regularFit', 'skeleton', 'simplify', 'hexLattice', 'delaunay', 'sideRuns', 'booleans', 'buffer', 'tileRings'];

describe('B-FUZZ over every kernel primitive (§13.1)', () => {
  it('the table holds every primitive the runner fuzzes, each with its family', () => {
    expect(FUZZ_PRIMITIVES.map((p) => p.name)).toEqual(REQUIRED);
    for (const p of FUZZ_PRIMITIVES) expect(p.family).toBe(`bfuzz/${p.name}`);
  });

  it.each(FUZZ_PRIMITIVES.map((p) => [p.name] as const))('%s: 0 crashes, 0 hangs, 0 invalid outputs, bugs empty', (name) => {
    const r = runFuzz(name, N);
    expect(r.runs).toBe(N);
    expect(r.failures.slice(0, 3)).toEqual([]);
    expect([r.crashes, r.hangs, r.invalid, r.bugs.length]).toEqual([0, 0, 0, 0]);
    expect(r.ok + r.skipped + Object.values(r.refused).reduce((a, b) => a + b, 0)).toBe(N);
    // the input reached the operation on most draws (a family that never reaches its primitive judges nothing)
    expect(r.skipped).toBeLessThan(N / 2);
    if (['booleans', 'buffer', 'tileRings'].includes(name)) {
      const o = r.oracle as { unattracted: number; attracted: number; refused: number };
      expect(o.unattracted + o.attracted).toBeGreaterThan(0);
    } else expect(r.oracle).toBeNull();
  }, 300_000);

  it('insertChain: the sampled renumbering and permutation harnesses ran (M0-d-08), and remove ∘ insert is judged', () => {
    const r = runFuzz('insertChain', 2 * FUZZ_SAMPLE_EVERY + 1);
    expect(r.sampled.renumbering).toBeGreaterThanOrEqual(2);
    expect(r.sampled.permutation).toBe(r.sampled.renumbering);
    expect(r.invalid).toBe(0);
  }, 300_000);

  it('the work quantiles per counter (C-0091): n, p50 ≤ p99 ≤ p999 ≤ max, the unit count, the unit of M0.md §2.2', () => {
    const r = runFuzz('insertChain', N);
    const counters = r.work.map((w) => w.counter);
    expect(counters).toContain('insert.points');
    for (const w of r.work) {
      expect(w.n).toBeGreaterThan(0);
      expect(w.p50).toBeLessThanOrEqual(w.p99);
      expect(w.p99).toBeLessThanOrEqual(w.p999);
      expect(w.p999).toBeLessThanOrEqual(w.max);
      expect(w.units).toBeGreaterThan(0);
      expect(w.unit).toBe(FUZZ_COUNTER_UNITS[w.counter] ?? 'vertices');
    }
    // insert.points charges a point per input point: at least one per vertex of the chain
    expect(r.work.find((w) => w.counter === 'insert.points')?.p50).toBeGreaterThanOrEqual(1);
    const sk = runFuzz('skeleton', N);
    expect(sk.work.map((w) => w.counter)).toEqual(['skeleton.events']);
    expect(sk.work[0].unit).toBe('vertices');
  }, 300_000);

  it('a run is a function of (family, index): twice the same report, and [first, first + n) a slice of a longer run', () => {
    const a = runFuzz('obb', 30);
    const b = runFuzz('obb', 30);
    expect(b).toEqual(a);
    const head = runFuzz('regularFit', 1_005);
    const tail = runFuzz('regularFit', 10, { first: 995 });
    const whole = runFuzz('regularFit', 995);
    expect(whole.runs + tail.runs).toBe(head.runs);
    const sum = (r: typeof head) => Object.values(r.refused).reduce((x, y) => x + y, 0);
    expect(sum(whole) + sum(tail)).toBe(sum(head));
    expect(whole.ok + tail.ok).toBe(head.ok);
  }, 300_000);

  it('refuses an empty run and an unknown primitive (§13.8 Edges: never a vacuous pass)', () => {
    expect(() => runFuzz('obb', 0)).toThrow(RangeError);
    expect(() => runFuzz('noSuchPrimitive', 5)).toThrow(RangeError);
  });
});
