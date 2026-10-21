// M0-k-03's fix round S2 (note N3 of the closing check S1; C-0400): the step budget's self-check fails loud. The counter
// is wired to the `splaytree` polygon-clipping resolves from its own folder, and a small union must move it; when it does
// not, the counter would never stop a call, so every call must throw the kit's `oracles: …` error — never set aside as
// one attempt's throw (which would let a later quarter turn answer unbudgeted, a hang input hanging again) and never a
// refusal. Here the library is replaced, in this file's own module graph only, by one whose union never touches the
// splay tree: the check cannot pass, and every call, first and later, throws.
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { OracleResult } from '../../src/oracles/types.js';
import { rect } from './support.js';

/** A polygon-clipping whose every operation answers the empty set without touching its splay tree. */
const blind = { union: () => [], intersection: () => [], difference: () => [], xor: () => [] };

let pc: typeof import('../../src/oracles/polygon-clipping.js');
let oracles: typeof import('../../src/oracles/oracles.js');

beforeAll(async () => {
  vi.resetModules();
  vi.doMock('polygon-clipping', () => ({ default: blind }));
  pc = await import('../../src/oracles/polygon-clipping.js');
  oracles = await import('../../src/oracles/oracles.js');
});

const NOT_REACHED = 'oracles: the step budget does not reach polygon-clipping (its splaytree is another instance)';

/** The message `fn` throws — the kit's own error, whole (a refusal naming it as an attempt's throw is not it). */
function thrown(fn: () => unknown): string {
  try {
    fn();
  } catch (e) {
    return e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  }
  return 'nothing thrown';
}

describe('the step budget’s self-check fails loud (N3)', () => {
  it('every call throws the kit’s error while the counter does not reach the library — the first and every later one', () => {
    const a = [rect(0, 0, 100, 100)];
    const b = [rect(50, 50, 150, 150)];
    for (let i = 0; i < 3; i += 1) {
      expect(thrown(() => pc.polygonClippingBoolean('union', a, b, 'nonzero'))).toBe(`Error: ${NOT_REACHED}`);
      expect(thrown(() => pc.polygonClippingUnionPieces([[[0, 0], [10, 0], [10, 10]]]))).toBe(`Error: ${NOT_REACHED}`);
      expect(thrown(() => pc.underTurns(() => [], () => null))).toBe(`Error: ${NOT_REACHED}`);
    }
    expect(pc.stepCounts().overruns).toBe(0);
  });

  it('through the adapter it is a failed result naming the kit’s error, never a refusal', () => {
    const r: OracleResult = oracles.oracleBoolean('union', [rect(0, 0, 100, 100)], [rect(50, 50, 150, 150)], 'nonzero', 'polygon-clipping');
    expect(r).toEqual({ ok: false, engine: 'polygon-clipping', error: `polygon-clipping: ${NOT_REACHED}` });
  });
});
