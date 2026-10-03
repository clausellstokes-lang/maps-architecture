// M0-d-02: the type test of C-0112 — H128 returns a Hash128 and the lineage hash is a Hash64. The `expectTypeOf` and
// `@ts-expect-error` lines are judged by the type checker (`corepack pnpm build`, the kernel's test project under
// `tsc -b`); the runtime lines check the shapes and that the package index re-exports the hash module.
import { describe, expect, expectTypeOf, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { H128, H32, LaneWriter, murmur128, type Hash128, type Hash64, type LineageHash } from '../../src/hash/index.js';

describe('the hash types (§2.8, C-0112)', () => {
  it('H128 returns a Hash128 and the lineage hash is a Hash64', () => {
    expectTypeOf(H128).returns.toEqualTypeOf<Hash128>();
    expectTypeOf(murmur128).returns.toEqualTypeOf<Hash128>();
    expectTypeOf<LaneWriter['digest']>().returns.toEqualTypeOf<Hash128>();
    expectTypeOf<LaneWriter['digest64']>().returns.toEqualTypeOf<Hash64>();
    expectTypeOf<LaneWriter['digest64']>().returns.toEqualTypeOf<LineageHash>();
    expectTypeOf<LineageHash>().toEqualTypeOf<Hash64>();
    expectTypeOf<Hash128>().toEqualTypeOf<[number, number, number, number]>();
    expectTypeOf<Hash64>().toEqualTypeOf<[number, number]>();
    expectTypeOf(H32).returns.toEqualTypeOf<number>();

    const lineage: LineageHash = new LaneWriter().u32(1).digest64();
    const h: Hash128 = H128(new Uint8Array(3));
    // @ts-expect-error — a Hash128 is not a lineage hash (four lanes, not two)
    const notLineage: LineageHash = h;
    // @ts-expect-error — a lineage hash is not a Hash128
    const notH128: Hash128 = lineage;
    expect(lineage).toHaveLength(2);
    expect(h).toHaveLength(4);
    expect(notLineage).toBe(h);
    expect(notH128).toBe(lineage);
  });

  it('is exported by the kernel\'s package index', () => {
    expect(kernel.H128).toBe(H128);
    expect(kernel.H32).toBe(H32);
    expect(kernel.LaneWriter).toBe(LaneWriter);
    expect(typeof kernel.fmix32).toBe('function');
  });
});
