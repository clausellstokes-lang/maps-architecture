// M0-d-02: the lane encoder of the digest leaves (§6.2; C-0132). −0 and +0 hash alike, NaN is refused, and the
// incremental writer equals one-shot H128 over the lanes' bytes on 10⁴ random lane streams (at least; more under a
// larger PLAT_FUZZ_RUNS). The byte-order independence across arm64 and Rosetta is M0-d-06's run; the committed lane
// vectors are its fixed points.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { H128, LaneWriter } from '../../src/hash/index.js';
import { serialiseLanes, vectorOps, vectors, type LaneOp } from './support.js';

function write(ops: readonly LaneOp[], w = new LaneWriter()): LaneWriter {
  for (const op of ops) {
    if (op[0] === 'u32') w.u32(op[1]);
    else if (op[0] === 'i32') w.i32(op[1]);
    else if (op[0] === 'f64') w.f64(op[1]);
    else w.utf8(op[1]);
  }
  return w;
}

const laneOp: fc.Arbitrary<LaneOp> = fc.oneof(
  fc.tuple(fc.constant('u32' as const), fc.nat(0xffffffff)),
  fc.tuple(fc.constant('i32' as const), fc.integer({ min: -0x80000000, max: 0x7fffffff })),
  fc.tuple(fc.constant('f64' as const), fc.double({ noNaN: true })),
  fc.tuple(fc.constant('utf8' as const), fc.string({ unit: 'binary', maxLength: 24 })),
);

describe('LaneWriter (§6.2, C-0132)', () => {
  it('hashes −0 and +0 alike', () => {
    expect(new LaneWriter().f64(-0).digest()).toEqual(new LaneWriter().f64(0).digest());
    expect(new LaneWriter().u32(7).f64(-0).u32(9).digest()).toEqual(new LaneWriter().u32(7).f64(0).u32(9).digest());
    expect(new LaneWriter().u32(-0).digest()).toEqual(new LaneWriter().u32(0).digest());
    expect(new LaneWriter().i32(-0).digest()).toEqual(new LaneWriter().i32(0).digest());
  });

  it('refuses NaN', () => {
    expect(() => new LaneWriter().f64(Number.NaN)).toThrow(RangeError);
    expect(() => new LaneWriter().f64(0 / 0)).toThrow(RangeError);
    const w = new LaneWriter().u32(1);
    expect(() => w.f64(Number.NaN)).toThrow(/NaN/);
    expect(w.lanes).toBe(1);
  });

  it('refuses a non-integer or out-of-range integer lane', () => {
    for (const v of [-1, 0x100000000, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => new LaneWriter().u32(v)).toThrow(RangeError);
    }
    for (const v of [0x80000000, -0x80000001, 0.5, Number.NaN, Number.NEGATIVE_INFINITY]) {
      expect(() => new LaneWriter().i32(v)).toThrow(RangeError);
    }
  });

  it('writes an i32 as its two\'s complement and ±Infinity as bit patterns', () => {
    expect(new LaneWriter().i32(-1).digest()).toEqual(new LaneWriter().u32(0xffffffff).digest());
    expect(new LaneWriter().i32(-0x80000000).digest()).toEqual(new LaneWriter().u32(0x80000000).digest());
    expect(new LaneWriter().f64(Number.POSITIVE_INFINITY).digest()).toEqual(new LaneWriter().u32(0).u32(0x7ff00000).digest());
    expect(new LaneWriter().f64(Number.NEGATIVE_INFINITY).digest()).toEqual(new LaneWriter().u32(0).u32(0xfff00000).digest());
  });

  it('writes an f64 as two lanes, low word then high word', () => {
    // 1.5 = 0x3FF8000000000000; 0.1 = 0x3FB999999999999A.
    expect(new LaneWriter().f64(1.5).digest()).toEqual(new LaneWriter().u32(0).u32(0x3ff80000).digest());
    expect(new LaneWriter().f64(0.1).digest()).toEqual(new LaneWriter().u32(0x9999999a).u32(0x3fb99999).digest());
    expect(new LaneWriter().f64(0.1).lanes).toBe(2);
  });

  it('frames a string by its byte count and pads it to whole lanes', () => {
    expect(new LaneWriter().utf8('ab').utf8('c').digest()).not.toEqual(new LaneWriter().utf8('a').utf8('bc').digest());
    expect(new LaneWriter().utf8('').digest()).toEqual(new LaneWriter().u32(0).digest());
    // 'abcde' → count 5, then 'abcd' and 'e' + three zero bytes, little-endian.
    expect(new LaneWriter().utf8('abcde').digest()).toEqual(new LaneWriter().u32(5).u32(0x64636261).u32(0x65).digest());
    for (const [s, lanes] of [['', 1], ['a', 2], ['abcd', 2], ['abcde', 3], ['\u{1d11e}', 2], ['é€\u{1d11e}海', 4]] as const) {
      expect(new LaneWriter().utf8(s).lanes).toBe(lanes);
    }
    expect(() => new LaneWriter().utf8('a\ud800')).toThrow(RangeError);
    const long = 'x'.repeat(1000) + '\u{10ffff}';
    expect(new LaneWriter().utf8(long).digest()).toEqual(H128(serialiseLanes([['utf8', long]])));
  });

  it('incremental = one-shot on 10⁴ random lane streams', () => {
    const numRuns = Math.max(10_000, fc.readConfigureGlobal().numRuns ?? 0);
    let runs = 0;
    fc.assert(
      fc.property(fc.array(laneOp, { maxLength: 24 }), (ops) => {
        runs += 1;
        const w = write(ops);
        const bytes = serialiseLanes(ops);
        expect(w.lanes * 4).toBe(bytes.length);
        expect(w.digest()).toEqual(H128(bytes));
      }),
      { numRuns },
    );
    expect(runs).toBe(numRuns);
    expect(runs).toBeGreaterThanOrEqual(10_000);
  });

  it('gives the committed lane vectors (the cross-host fixed points)', () => {
    expect(vectors.lanes.length).toBeGreaterThan(0);
    for (const v of vectors.lanes) {
      const ops = vectorOps(v.ops);
      const w = write(ops);
      expect(w.lanes).toBe(v.lanes);
      expect(w.digest()).toEqual(v.h128);
      expect(H128(serialiseLanes(ops))).toEqual(v.h128);
    }
  });

  it('reads a digest without disturbing the writer, and reset empties it', () => {
    const w = new LaneWriter().utf8('plot').u32(3);
    const first = w.digest();
    expect(w.digest()).toEqual(first);
    w.f64(2.5);
    expect(w.digest()).toEqual(new LaneWriter().utf8('plot').u32(3).f64(2.5).digest());
    expect(w.reset().lanes).toBe(0);
    expect(w.digest()).toEqual(H128(new Uint8Array(0)));
    expect(w.utf8('plot').u32(3).digest()).toEqual(first);
  });

  it('digest64 is words 0 and 1 of the digest (the lineage hash form)', () => {
    fc.assert(
      fc.property(fc.array(laneOp, { maxLength: 8 }), (ops) => {
        const h = write(ops).digest();
        expect(write(ops).digest64()).toEqual([h[0], h[1]]);
      }),
      { numRuns: 1_000 },
    );
  });
});
