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
  });

  it('a planted write behind the transaction (an edge pulled across the frame after the commit): caught by the sweep', () => {
    let planted = 0;
    const r = runFuzz('insertChain', 30, {
      plant: {
        afterInsert: (p) => {
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

  it('negative controls: nothing planted, nothing counted', () => {
    for (const name of ['orient', 'buffer', 'insertChain']) {
      const r = runFuzz(name, 12);
      expect([name, r.crashes, r.hangs, r.invalid, r.failed]).toEqual([name, 0, 0, 0, 0]);
    }
  });
});
