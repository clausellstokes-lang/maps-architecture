// The keys and the one structured mixer (item M0-d-01; §6.1, §14 `Rng.stream`; C-0143): the seed key's four lane
// finalisers, the entity key, the packed components, the finaliser round's bijection (inverted here), distinct
// components giving distinct keys on 10⁶ random component tuples and on an exhaustive structured set, and every
// refusal. The ≤ 0.1 µs bar is the timing phase's (M0-t-01); the figure printed here is CONTENDED and informative only.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { fmix32, type Hash128 } from '../../src/hash/index.js';
import { attemptCap, CONCERN_COUNT, CONCERNS, STAGE_COUNT, STAGE_VIEW, STAGES } from '../../src/registry/index.js';
import { KeyCensus } from '../../src/rng/census.js';
import { layerCode } from '../../src/rng/layer.js';
import { entityKey, laneKey, mixInto, packComponents, SEED_SALTS, seedKey, streamKey } from '../../src/rng/mixer.js';
import { streamFromKey } from '../../src/rng/stream.js';
import type { ConcernId, StageId, StreamOpts } from '../../src/types/index.js';
import { unfinalise } from './invert.js';

const u32 = fc.nat({ max: 0xffffffff });
const u32x4 = fc.tuple(u32, u32, u32, u32);
const OPTS0: StreamOpts = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };
const EK: Hash128 = [0x11111111, 0x22222222, 0x33333333, 0x44444444];

const finalise = (words: readonly number[]): Hash128 => {
  const out: Hash128 = [0, 0, 0, 0];
  mixInto(out, words as Hash128, [0, 0, 0, 0]);
  return out;
};

describe('the seed key: four 32-bit-lane finalisers with distinct salts (§6.1)', () => {
  it('is fmix32(seed ^ salt_i) per lane, the salts distinct', () => {
    fc.assert(
      fc.property(u32, (seed) => {
        const k = seedKey(seed);
        return SEED_SALTS.every((s, i) => k[i] === fmix32(s ^ seed));
      }),
    );
    expect(new Set(SEED_SALTS).size).toBe(4);
  }, 120_000);

  it("takes SHA-256's first four round constants as its salts, by value, and gives known answers (C-0143 (1))", () => {
    // FIPS 180-4 §4.2.2's K₀ … K₃, written out, then derived again: Kᵢ = ⌊frac(∛p) · 2³²⌋ for p = 2, 3, 5, 7 — the
    // integer cube root of p · 2⁹⁶ less 2³², since ∛p lies in [1, 2). A change to the salts re-keys every stream of every
    // document, so they are pinned by value as the nudge is (stream.test.ts; checks/M0-d-01.md F-7).
    expect([...SEED_SALTS]).toEqual([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5]);
    const icbrt = (n: bigint): bigint => {
      let lo = 0n;
      let hi = 1n << 40n;
      while (lo < hi) {
        const mid = (lo + hi + 1n) >> 1n;
        if (mid * mid * mid <= n) lo = mid;
        else hi = mid - 1n;
      }
      return lo;
    };
    expect([2n, 3n, 5n, 7n].map((p) => Number(icbrt(p << 96n) - (1n << 32n)))).toEqual([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5]);
    // the seed key end to end, computed outside the item with MurmurHash3's published fmix32 over these salts
    expect(seedKey(0)).toEqual([0xb30705af, 0xbaaedc8b, 0xb0675f61, 0x0889e26d]);
    expect(seedKey(1)).toEqual([0x27909591, 0xcd4901e5, 0xede5b0e6, 0x6022ffcf]);
    expect(seedKey(0xffffffff)).toEqual([0xd746e956, 0xfe3f7222, 0xc0a260ec, 0x26915c8d]);
  });

  it('is laneKey over the one word, and laneKey folds its words in order', () => {
    fc.assert(
      fc.property(u32, u32, (a, b) => {
        const one = laneKey([a]);
        const two = laneKey([a, b]);
        const swapped = laneKey([b, a]);
        return (
          seedKey(a).every((w, i) => w === one[i]) &&
          SEED_SALTS.every((s, i) => two[i] === fmix32(fmix32(s ^ a) ^ b)) &&
          (a === b || two.some((w, i) => w !== swapped[i]))
        );
      }),
    );
  }, 120_000);

  it('gives distinct seeds distinct keys (each lane is a bijection of the seed)', () => {
    const lane0 = new Set<number>();
    for (let seed = 0; seed < 100000; seed += 1) lane0.add(seedKey(seed)[0]);
    expect(lane0.size).toBe(100000);
  }, 120_000);

  it('refuses a seed that is not a u32, and an empty or non-u32 lane word list', () => {
    for (const bad of [-1, 2 ** 32, 1.5, Number.NaN, '7' as unknown as number]) expect(() => seedKey(bad)).toThrow(RangeError);
    expect(() => laneKey([])).toThrow(RangeError);
    expect(() => laneKey([1, -2])).toThrow(RangeError);
  });
});

describe('the finaliser round is a bijection on 128 bits (the encoder guard rests on it)', () => {
  it('inverts: unfinalise(finalise(x)) = x on random words', () => {
    fc.assert(
      fc.property(u32x4, (x) => {
        const back = unfinalise(finalise(x));
        return back.every((w, i) => w === x[i]);
      }),
      { numRuns: 20000 },
    );
  }, 120_000);

  it('mixes every input word into every output word', () => {
    let allFour = 0;
    const n = 2000;
    const s = streamFromKey([5, 6, 7, 8]);
    for (let i = 0; i < n; i += 1) {
      const x: Hash128 = [s.u32(), s.u32(), s.u32(), s.u32()];
      const y: Hash128 = [...x];
      y[i % 4] = (y[i % 4] ^ (1 << (i % 32))) >>> 0;
      const a = finalise(x);
      const b = finalise(y);
      if (a.every((w, k) => w !== b[k])) allFour += 1;
    }
    expect(allFour / n).toBeGreaterThan(0.99);
  }, 120_000);
});

describe('the entity key: the seed key mixed with the lineage hash and the arena key (§6.1)', () => {
  const SK = seedKey(20261003);
  const GROUND0 = { layer: 'ground', part: 0 } as const;

  it('is one finaliser round over seedKey ⊕ (lineage₀, lineage₁, layer code, part)', () => {
    fc.assert(
      fc.property(u32x4, u32, u32, fc.constantFrom('ground', 'underground', 'sky' as const), u32, (sk, l0, l1, layer, part) => {
        const got = entityKey(sk, [l0, l1], { layer, part });
        const want = finalise([sk[0] ^ l0, sk[1] ^ l1, sk[2] ^ layerCode(layer), sk[3] ^ part].map((w) => w >>> 0));
        return got.every((w, i) => w === want[i]);
      }),
    );
    expect([layerCode('ground'), layerCode('underground'), layerCode('sky')]).toEqual([0, 1, 2]);
  }, 120_000);

  it('depends on the seed, either lineage word, the layer and the part — every word of it', () => {
    const base = entityKey(SK, [1, 2], GROUND0);
    const variants = [
      entityKey(seedKey(20261004), [1, 2], GROUND0),
      entityKey(SK, [3, 2], GROUND0),
      entityKey(SK, [1, 3], GROUND0),
      entityKey(SK, [1, 2], { layer: 'sky', part: 0 }),
      entityKey(SK, [1, 2], { layer: 'ground', part: 1 }),
    ];
    for (const v of variants) for (let k = 0; k < 4; k += 1) expect(v[k]).not.toBe(base[k]);
  });

  it('is distinct over 4 000 lineages × three layers × four parts of one seed (injective for a seed)', () => {
    const census = new KeyCensus(4, 1 << 15);
    for (let l = 0; l < 4000; l += 1) {
      for (const layer of ['ground', 'underground', 'sky'] as const) {
        for (let part = 0; part < 4; part += 1) census.add(entityKey(SK, [l, Math.imul(l, 2654435761) >>> 0], { layer, part }), [l, layerCode(layer), part]);
      }
    }
    expect(census.size).toBe(48000);
    expect(census.collisions).toBe(0);
  }, 120_000);

  it('refuses a malformed seed key, lineage hash or arena key', () => {
    expect(() => entityKey([1, 2, 3] as unknown as Hash128, [1, 2], GROUND0)).toThrow(RangeError);
    expect(() => entityKey(SK, [1, 2, 3] as unknown as [number, number], GROUND0)).toThrow(RangeError);
    expect(() => entityKey(SK, [1, -2], GROUND0)).toThrow(RangeError);
    expect(() => entityKey(SK, [1, 2], { layer: 'attic' as 'ground', part: 0 })).toThrow(RangeError);
    expect(() => entityKey(SK, [1, 2], { layer: 'ground', part: -1 })).toThrow(RangeError);
    expect(() => entityKey(SK, [1, 2], { layer: 'ground', part: 2 ** 32 })).toThrow(RangeError);
  });
});

describe('the packed components: stage u16, concern u16, reroll u16, attempt u8, epoch u32, salt u16 in four words', () => {
  it('lays the 104 bits out as stage ≪ 16 | concern, reroll ≪ 16 | salt, epoch, attempt', () => {
    const p = packComponents(STAGES.S8, CONCERNS['cut.t'], { reroll: 0xabcd, attempt: 2, epoch: 0x80000001, salt: 0x1234 });
    expect(p).toEqual([((STAGES.S8 << 16) | CONCERNS['cut.t']) >>> 0, 0xabcd1234, 0x80000001, 2]);
    const v = packComponents(STAGE_VIEW, CONCERNS['style.jitter'], { reroll: 65535, attempt: 0, epoch: 0xffffffff, salt: 0xffff });
    expect(v).toEqual([((0xffff << 16) | CONCERNS['style.jitter']) >>> 0, 0xffffffff, 0xffffffff, 0]);
  });

  it('is injective: each component is read back from its own bits', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: STAGE_COUNT - 1 }),
        fc.integer({ min: 0, max: CONCERN_COUNT - 1 }).filter((c) => attemptCap(c) >= 0),
        fc.nat({ max: 0xffff }),
        u32,
        fc.nat({ max: 0xffff }),
        (stage, concern, reroll, epoch, salt) => {
          const attempt = attemptCap(concern);
          const p = packComponents(stage as StageId, concern as ConcernId, { reroll, attempt, epoch, salt });
          const back = [p[0] >>> 16, p[0] & 0xffff, p[1] >>> 16, p[3], p[2], p[1] & 0xffff];
          return back.every((v, i) => v === [stage, concern, reroll, attempt, epoch, salt][i]);
        },
      ),
    );
  }, 120_000);
});

describe('the one structured mixer: stream keys', () => {
  it('is the finaliser round over entityKey ⊕ packed, and seeds the stream with its words directly', () => {
    const opts: StreamOpts = { reroll: 1, attempt: 2, epoch: 3, salt: 4 };
    const p = packComponents(STAGES.S11, CONCERNS.siteplan, opts);
    const k = streamKey(EK, STAGES.S11, CONCERNS.siteplan, opts);
    expect(k).toEqual(finalise(EK.map((w, i) => (w ^ p[i]) >>> 0)));
    expect(streamFromKey(k).key).toEqual(k);
  });

  it('gives distinct component tuples distinct keys on 10⁶ random tuples (0 collisions)', () => {
    const live = Array.from({ length: CONCERN_COUNT }, (_, i) => i).filter((c) => attemptCap(c) >= 0);
    const entities = Array.from({ length: 8 }, (_, i) => seedKey(i));
    const r = streamFromKey([0x9e3779b9, 1, 2, 3]);
    const census = new KeyCensus(4, 1 << 20);
    const n = 1_000_000;
    for (let i = 0; i < n; i += 1) {
      const ek = entities[r.int(0, entities.length - 1)];
      const stage = r.bool(0.05) ? STAGE_VIEW : (r.int(0, STAGE_COUNT - 1) as StageId);
      const concern = live[r.int(0, live.length - 1)] as ConcernId;
      const opts: StreamOpts = {
        reroll: r.bool(0.5) ? 0 : r.int(0, 0xffff),
        attempt: r.int(0, attemptCap(concern)),
        epoch: r.bool(0.5) ? 0 : r.u32(),
        salt: r.bool(0.75) ? 0 : r.int(0, 0xffff),
      };
      const p = packComponents(stage, concern, opts);
      census.add(streamKey(ek, stage, concern, opts), [...ek, ...p]);
    }
    expect(census.collisions).toBe(0);
    expect(census.size + census.reused).toBe(n);
    expect(census.size).toBeGreaterThan(800_000); // the rest are true reuses of a tuple drawn twice
  }, 120_000);

  it('gives every tuple of an exhaustive structured set its own key (one entity, every stage, concern and attempt)', () => {
    const census = new KeyCensus(4, 1 << 18);
    const stages = [...Array.from({ length: STAGE_COUNT }, (_, i) => i), STAGE_VIEW];
    let n = 0;
    for (const stage of stages) {
      for (let concern = 0; concern < CONCERN_COUNT; concern += 1) {
        const cap = attemptCap(concern);
        for (let attempt = 0; attempt <= cap; attempt += 1) {
          for (const reroll of [0, 1, 32767, 65535]) {
            for (const epoch of [0, 1, 0x80000001]) {
              const opts = { reroll, attempt, epoch, salt: 0 };
              census.add(streamKey(EK, stage as StageId, concern as ConcernId, opts), packComponents(stage as StageId, concern as ConcernId, opts));
              n += 1;
            }
          }
        }
      }
    }
    expect(n).toBeGreaterThan(50_000);
    expect(census.size).toBe(n);
    expect(census.collisions).toBe(0);
  }, 120_000);

  it('refuses an unregistered stage or concern, a retired concern (T41-1), an attempt past the cap, and out-of-width fields', () => {
    const ok = (stage: number, concern: number, opts: Partial<StreamOpts> = {}): Hash128 =>
      streamKey(EK, stage as StageId, concern as ConcernId, { ...OPTS0, ...opts });
    expect(() => ok(STAGES.S8, CONCERNS['cut.stop'])).not.toThrow();
    expect(() => ok(STAGE_VIEW, CONCERNS['style.compass'])).not.toThrow();
    expect(() => ok(STAGE_COUNT, CONCERNS.route)).toThrow(/stage/);
    expect(() => ok(-1, CONCERNS.route)).toThrow(/stage/);
    expect(() => ok(STAGES.S4, CONCERN_COUNT)).toThrow(/concern/);
    expect(() => ok(STAGES.S8, CONCERNS['cut.side'])).toThrow(/retired/);
    expect(() => ok(STAGES.S8, CONCERNS['cut.farSideAlt'])).toThrow(/retired/);
    expect(() => ok(STAGES.S8, CONCERNS['cut.stop'], { attempt: 1 })).toThrow(/attempt/);
    expect(() => ok(STAGES.S8, CONCERNS['cut.t'], { attempt: 2 })).not.toThrow();
    expect(() => ok(STAGES.S8, CONCERNS['cut.t'], { attempt: 3 })).toThrow(/attempt/);
    expect(() => ok(STAGES.S13a, CONCERNS.naming, { attempt: 8 })).not.toThrow();
    expect(() => ok(STAGES.S13a, CONCERNS.naming, { attempt: 9 })).toThrow(/attempt/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { reroll: 65536 })).toThrow(/reroll/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { salt: -1 })).toThrow(/salt/);
    // salt is u16 (§6.1): a wider salt would OR into reroll's half of word 1, so (reroll r + 1, salt s) and (reroll r,
    // salt s + 2¹⁶) would pack to one word — the width check is the encoder guard's (checks/M0-d-01.md F-2)
    expect(() => ok(STAGES.S4, CONCERNS.route, { salt: 0xffff })).not.toThrow();
    expect(() => ok(STAGES.S4, CONCERNS.route, { salt: 0x10000 })).toThrow(/salt/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { reroll: 0, salt: 0x10005 })).toThrow(/salt/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { salt: 2 ** 32 })).toThrow(/salt/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { salt: 1.5 })).toThrow(/salt/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { epoch: 2 ** 32 })).toThrow(/epoch/);
    expect(() => ok(STAGES.S4, CONCERNS.route, { epoch: 1.5 })).toThrow(/epoch/);
    expect(() => streamKey([1, 2, 3] as unknown as Hash128, STAGES.S4, CONCERNS.route, OPTS0)).toThrow(/entity key/);
  });

  it('refuses every field outside its width on each side — negative, fractional, too wide, NaN — and accepts both ends', () => {
    // C-0143 (3): "any field outside its width" is refused. Each half of a width check is the encoder guard's: without
    // its negative or fractional half, reroll −1 would pack as 65535, reroll 1.5 as 1, attempt 1.5 as 1 and epoch −1 as
    // 0xffffffff — two tuples, one stream key (checks/M0-d-01.md F-2 for salt, F-5 for attempt, reroll and epoch).
    const key = (opts: Partial<StreamOpts>, stage: number = STAGES.S8, concern: number = CONCERNS['cut.t']): Hash128 =>
      streamKey(EK, stage as StageId, concern as ConcernId, { ...OPTS0, ...opts });
    const cap = attemptCap(CONCERNS['cut.t']);
    expect(cap).toBe(2);
    // [field, its largest lawful value, values outside its width]; attempt's width is u8 and its cap the concern's
    const fields: readonly (readonly [keyof StreamOpts, number, readonly number[]])[] = [
      ['reroll', 0xffff, [-1, -0x10000, 0.5, 1.5, 0xffff + 0.5, 0x10000, 0x10001, 2 ** 32, Number.NaN, Infinity, -Infinity]],
      ['attempt', cap, [-1, -0x100, 0.5, 1.5, cap + 1, 0x100, 0x10000, 2 ** 32, Number.NaN, Infinity]],
      ['epoch', 0xffffffff, [-1, -(2 ** 31), -(2 ** 32), 0.5, 1.5, 2 ** 32 - 0.5, 2 ** 32, 2 ** 33, Number.NaN, Infinity]],
      ['salt', 0xffff, [-1, -0x10000, 0.5, 1.5, 0x10000, 0x10005, 2 ** 32, Number.NaN, Infinity]],
    ];
    for (const [field, max, bad] of fields) {
      expect(() => key({ [field]: 0 }), `${field} 0`).not.toThrow();
      expect(() => key({ [field]: max }), `${field} ${String(max)}`).not.toThrow();
      const refusal = new RegExp(`${field} must be`);
      for (const v of bad) expect(() => key({ [field]: v }), `${field} ${String(v)}`).toThrow(refusal);
    }
    // the stage and the concern: u16 ids, registered (STAGE_VIEW besides), on each side too
    for (const s of [-1, 0.5, 1.5, Number.NaN, STAGE_COUNT, STAGE_VIEW - 1, STAGE_VIEW + 1, STAGE_VIEW + 0.5, 2 ** 32 + STAGES.S8]) {
      expect(() => key({}, s), `stage ${String(s)}`).toThrow(/the stage must be/);
    }
    for (const c of [-1, 0.5, 1.5, Number.NaN, CONCERN_COUNT, 0x10000, 0x10000 + CONCERNS['cut.t'], 2 ** 32 + CONCERNS['cut.t']]) {
      expect(() => key({}, STAGES.S8, c), `concern ${String(c)}`).toThrow(/the concern must be/);
    }
  });

  it('times the mixer (CONTENDED, informative only: the ≤ 0.1 µs bar is measured in the timing phase, M0-t-01)', () => {
    const n = 200_000;
    const opts: StreamOpts = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };
    let x = 0;
    const t0 = performance.now();
    for (let i = 0; i < n; i += 1) x ^= streamKey(EK, STAGES.S5, CONCERNS['growth.heading'], opts)[i & 3];
    const us = ((performance.now() - t0) * 1000) / n;
    process.stdout.write(`rng mixer: ${us.toFixed(3)} µs per stream key over ${String(n)} keys — CONTENDED (shared machine), never a result (${String(x & 1)})\n`);
    expect(us).toBeGreaterThan(0);
  }, 120_000);
});
