// M0-k-04's listed test: "a planted throw, a planted hang (a loop) and a planted self-intersecting output are each
// caught and counted" (§13.1's bar: 0 crashes, 0 hangs (hard timeout), 0 invalid outputs). Each fault is planted into a
// run of the real runner — a primitive whose operation throws or loops on chosen inputs, `buffer` replaced by an
// operation that returns a bowtie, and a write made behind the transaction's back after insertChain's commit — and the
// runner's own judges (the hard timeout, the typed-result check, the ring checks and the oracle comparison, the
// whole-arena sweep) must catch each one, count it once, and name it with its input's index. Negative controls: the
// same runs with nothing planted count nothing.
import { beforeAll, describe, expect, it } from 'vitest';
import { isVertexLive, outgoing } from '@plat/kernel';
import { lp } from './support.js';
import { fuzzGuarded, fuzzPrimitive, loadOracles, runFuzz, type FuzzPrimitive } from '@plat/testkit';

beforeAll(async () => {
  await loadOracles();
});

/** The real `orient` primitive with a fault planted on the inputs `at`. */
function planted(fault: (index: number) => void, at: readonly number[]): FuzzPrimitive<unknown> {
  const real = fuzzPrimitive('orient');
  return { ...real, name: 'orient (planted)', run: (input, ctx) => (at.includes(ctx.index) ? (fault(ctx.index), real.run(input, ctx)) : real.run(input, ctx)) };
}

describe('the hard timeout (§13.1: a hang is a failure, never a wait)', () => {
  it('returns a value, a throw as a crash, and interrupts a synchronous loop as a hang', () => {
    expect(fuzzGuarded(() => 41 + 1)).toEqual({ kind: 'value', value: 42 });
    const c = fuzzGuarded(() => {
      throw new TypeError('planted');
    });
    expect(c.kind).toBe('crash');
    expect(c.kind === 'crash' && c.message).toBe('TypeError: planted');
    const t0 = performance.now();
    const h = fuzzGuarded(() => {
      for (;;) {
        // a planted hang
      }
    }, 150);
    expect(h).toEqual({ kind: 'hang', ms: 150 });
    expect(performance.now() - t0).toBeLessThan(5_000);
    // the guard is usable again after an interrupted call
    expect(fuzzGuarded(() => 'again')).toEqual({ kind: 'value', value: 'again' });
  });
});

describe('a planted throw, a planted hang and a planted self-intersecting output are caught and counted', () => {
  it('a planted throw on two inputs: 2 crashes, named by index, the other inputs ok', () => {
    const r = runFuzz(
      planted(() => {
        throw new Error('planted throw');
      }, [3, 7]),
      12,
    );
    expect(r.runs).toBe(12);
    expect(r.crashes).toBe(2);
    expect(r.hangs).toBe(0);
    expect(r.invalid).toBe(0);
    expect(r.failures.map((f) => [f.kind, f.index])).toEqual([
      ['crash', 3],
      ['crash', 7],
    ]);
    expect(r.failures[0].reason).toBe('Error: planted throw');
    expect(r.ok).toBe(10);
  });

  it('a planted hang (a loop) on one input: 1 hang under the hard timeout, the run goes on', () => {
    const r = runFuzz(
      planted(() => {
        for (;;) {
          // a planted hang
        }
      }, [5]),
      9,
      { timeoutMs: 200 },
    );
    expect(r.hangs).toBe(1);
    expect(r.crashes).toBe(0);
    expect(r.failures).toEqual([{ primitive: 'orient (planted)', index: 5, kind: 'hang', reason: 'no result within the hard timeout of 200 ms' }]);
    expect(r.runs).toBe(9);
    expect(r.ok).toBe(8);
  });

  it('a planted self-intersecting output of buffer: every input invalid (the ring checks and the oracles catch it)', () => {
    const bowtie = () => ({ ok: true as const, value: [[lp(0, 0), lp(1000, 1000), lp(1000, 0), lp(0, 1000)]], warnings: [] });
    const r = runFuzz('buffer', 10, { plant: { buffer: bowtie as never } });
    expect(r.invalid).toBe(10);
    expect(r.crashes + r.hangs).toBe(0);
    expect(r.failures.every((f) => f.kind === 'invalid' && /crossing edges|faces|area/.test(f.reason))).toBe(true);
    // A simple, valid ring in the wrong place: only the oracle comparison (§3.7's split) can see it.
    const square = () => ({ ok: true as const, value: [[lp(5_000_000, 5_000_000), lp(5_001_000, 5_000_000), lp(5_001_000, 5_001_000), lp(5_000_000, 5_001_000)]], warnings: [] });
    const o = runFuzz('buffer', 10, { plant: { buffer: square as never } });
    expect(o.invalid).toBe(10);
    expect(o.failures.every((f) => /clipper2: .*area|polygon-clipping: .*area/.test(f.reason))).toBe(true);
  });

  it('a planted write behind the transaction (an edge pulled across the frame after the commit): caught by the sweep', () => {
    let planted = 0;
    const r = runFuzz('insertChain', 30, {
      plant: {
        afterCommit: (op, p) => {
          if (op !== 'insertChain') return;
          // A vertex the insertion made, with a neighbour inside the frame, jumps 5 m beyond the frame's west side: its
          // edge to that neighbour now crosses the frame ring — a self-intersecting arena the transaction never saw.
          let west = Infinity;
          for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.level[v] === 0) west = Math.min(west, p.vertices.x[v]);
          for (let v = p.slots.vertex.top - 1; v >= 0; v--) {
            if (!isVertexLive(p, v) || p.vertices.level[v] === 0) continue;
            const inner = outgoing(p, v).some((h) => p.vertices.x[p.halfEdges.origin[h ^ 1]] > west);
            if (!inner) continue;
            p.vertices.x[v] = west - 500;
            planted++;
            return;
          }
        },
      },
    });
    expect(planted).toBeGreaterThan(10);
    expect(planted).toBe(r.ok);
    expect(r.invalid).toBe(planted);
    expect(r.failures.every((f) => f.kind === 'invalid' && /simple-faces|crossing|cross/.test(f.reason))).toBe(true);
  });

  it('one broken property on one input is one invalid output, named with its reason (the runner counts every problem list)', () => {
    const real = fuzzPrimitive('orient');
    const one: FuzzPrimitive<unknown> = { ...real, name: 'orient (one problem)', run: (input, ctx) => (ctx.index === 2 ? { ...real.run(input, ctx), problems: ['a planted broken property'] } : real.run(input, ctx)) };
    const r = runFuzz(one, 6);
    expect(r.invalid).toBe(1);
    expect(r.failures).toEqual([{ primitive: 'orient (one problem)', index: 2, kind: 'invalid', reason: 'a planted broken property' }]);
    expect(r.ok).toBe(6);
  });

  it('a planted bug abort on one input: one `bugs` entry and one failure, named by index (§5.1 (8))', () => {
    const real = fuzzPrimitive('orient');
    const bug = { cls: 'F-NUM', entity: 'way:fuzz', key: 'bfuzz/orient#4', stage: 'B-FUZZ' };
    const one: FuzzPrimitive<unknown> = { ...real, name: 'orient (bug)', run: (input, ctx) => (ctx.index === 4 ? { ...real.run(input, ctx), bug } : real.run(input, ctx)) };
    const r = runFuzz(one, 8);
    expect(r.bugs).toEqual([bug]);
    expect(r.failures).toEqual([{ primitive: 'orient (bug)', index: 4, kind: 'bug', reason: 'a bug abort: F-NUM on way:fuzz' }]);
    expect([r.crashes, r.hangs, r.invalid]).toEqual([0, 0, 0]);
  });

  it('a mandatory chain refused E_OUT_OF_RANGE in the real insertChain family is a bug abort: a `bugs` entry per such input, never an invalid output (N-4)', () => {
    // No fuzz family reaches E_OUT_OF_RANGE (its coordinates stay inside 2²⁰), so the refusal is planted on the family's
    // own path: the insertChain primitive's transaction answers E_OUT_OF_RANGE, nothing committed.
    const r = runFuzz('insertChain', 60, { plant: { tx: (op, commit) => (op === 'insertChain' ? ({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'planted' } as never) : commit()) } });
    const refused = r.refused.E_OUT_OF_RANGE ?? 0;
    expect(r.bugs.length).toBeGreaterThan(5);
    expect(r.bugs.length).toBeLessThan(refused); // an optional chain's E_OUT_OF_RANGE is a typed refusal, no abort
    expect(r.bugs.every((b) => b.cls === 'F-NUM' && b.entity !== '' && /^bfuzz\/insertChain#\d+$/.test(b.key) && b.stage === 'B-FUZZ')).toBe(true);
    expect(r.failures.every((f) => f.kind === 'bug')).toBe(true);
    expect(r.failed).toBe(r.bugs.length);
    expect([r.crashes, r.hangs, r.invalid]).toEqual([0, 0, 0]);
  }, 120_000);

  it('remove ∘ insert is counted judged per level, every level shown, 0 included (N-1)', () => {
    const r = runFuzz('insertChain', 60);
    expect(Object.keys(r.judged)).toEqual(['remove∘insert L1', 'remove∘insert L2', 'remove∘insert L3']);
    for (const [k, n] of Object.entries(r.judged)) expect([k, n > 0]).toEqual([k, true]);
    const refusedRemovals = Object.entries(r.notes).filter(([k]) => k.startsWith('remove-after-insert refused')).reduce((t, [, n]) => t + n, 0);
    expect(Object.values(r.judged).reduce((t, n) => t + n, 0)).toBe(r.ok - refusedRemovals);
    // a declared judgement never made is reported as 0, never absent (a level whose removal is refused on every input,
    // the N-49 shape, would show so)
    const never: FuzzPrimitive<unknown> = { ...fuzzPrimitive('orient'), name: 'orient (declares a judgement)', judges: ['never judged'] };
    expect(runFuzz(never, 3).judged).toEqual({ 'never judged': 0 });
    expect(runFuzz('orient', 3).judged).toEqual({});
  }, 120_000);

  it("each service's judge catches its planted wrong output (a value the service never returns)", () => {
    type XY = { x: number; y: number };
    const cases: [string, (v: unknown) => unknown, RegExp][] = [
      ['obb', (v) => ({ ...(v as object), majorCm: (v as { majorCm: number }).majorCm * 0.9 }), /outside the OBB/],
      ['lir', (v) => {
        const L = v as { centre: XY; corners: XY[] };
        return { ...L, corners: L.corners.map((c) => ({ x: L.centre.x + 3 * (c.x - L.centre.x), y: L.centre.y + 3 * (c.y - L.centre.y) })) };
      }, /LIR corner .* outside the face/],
      ['hull', (v) => (v as XY[]).slice(1), /outside the hull|not strictly convex/],
      ['simplify', (v) => [...(v as XY[]), { x: 123_457, y: -98_765 }], /not in the chain/],
      ['snap', (v) => ({ x: (v as XY).x + 1, y: (v as XY).y }), /snap\(/],
      ['regularFit', (v) => ({ ...(v as object), compactness: 2 }), /compactness/],
      ['hexLattice', (v) => {
        const h = v as { points: XY[]; adjacency: Int32Array };
        return h.points.length === 0 ? h : { ...h, points: [{ x: h.points[0].x + 10_000_000, y: h.points[0].y }, ...h.points.slice(1)] };
      }, /outside the region/],
      ['skeleton', (v) => {
        const g = v as { kind: string; nodes: { x: number; y: number; t: number }[] };
        return g.kind !== 'skeleton' ? g : { ...g, nodes: [{ ...g.nodes[g.nodes.length - 1], x: g.nodes[g.nodes.length - 1].x + 1e7 }, ...g.nodes.slice(0, -1)].reverse().reverse() };
      }, /validator|outside the footprint/],
    ];
    for (const [name, wrong, why] of cases) {
      const clean = runFuzz(name, 25);
      const r = runFuzz(name, 25, { plant: { result: (p, v) => (p === name ? wrong(v) : v) } });
      expect([name, clean.invalid]).toEqual([name, 0]);
      expect(r.invalid, name).toBeGreaterThan(0);
      expect(r.failures[0].reason, name).toMatch(why);
    }
  }, 120_000);

  it('remove ∘ insert: a write left behind the removal is caught as "not the identity on the topology"', () => {
    const r = runFuzz('insertChain', 20, {
      plant: {
        afterRemove: (p) => {
          for (let v = 0; v < p.slots.vertex.top; v++) {
            if (isVertexLive(p, v) && p.vertices.level[v] === 0) {
              p.vertices.flags[v] |= 1; // pinned behind the batch's back: the print changes, no row reads it
              return;
            }
          }
        },
      },
    });
    const judged = r.ok - (r.notes['remove-after-insert refused E_INVARIANT index-freshness'] ?? 0);
    expect(judged).toBeGreaterThan(5);
    expect(r.invalid).toBe(judged);
    expect(r.failures.every((f) => /not the identity on the topology/.test(f.reason))).toBe(true);
  });

  it('negative controls: nothing planted, nothing counted', () => {
    for (const name of ['orient', 'buffer', 'insertChain']) {
      const r = runFuzz(name, 12);
      expect([name, r.crashes, r.hangs, r.invalid, r.failed]).toEqual([name, 0, 0, 0, 0]);
    }
  });
});
