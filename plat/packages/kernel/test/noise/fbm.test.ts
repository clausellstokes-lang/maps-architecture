// M0-e-01: the noise module — the seeded sampler and fBm (§3.1, §4.2 S1 (1), §6.1; C-0065). The item's test: "the fBm
// is a function of the stream alone: two runs byte-identical; a different seed differs" — plus the module's contract:
// the draws a sampler takes, the normalised range, the octave decomposition, the batch forms equal to the single calls
// to the bit, the refusals, and a pinned sample (the same bytes on every host, M0-d-06's later cross-host check).
import { createHash } from 'node:crypto';
import fc from 'fast-check';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  fbm,
  fbmRow,
  MAX_NOISE_OCTAVES,
  NOISE_DRAWS_PER_OCTAVE,
  noiseStream,
  octaveNorm,
  octaveRow,
  octaveTerm,
  type NoiseShape,
  type NoiseStream,
} from '../../src/noise/index.js';
import { createRng, entityKey, seedKey, streamFromKey, type Stream } from '../../src/rng/index.js';
import { CONCERNS, STAGES } from '../../src/registry/index.js';
import type { Hash128 } from '../../src/hash/index.js';

const SHAPE: NoiseShape = { lacunarity: 2, gain: 0.5 };

function sampler(key: readonly number[], octaves = 6, shape: NoiseShape = SHAPE): NoiseStream {
  const r = noiseStream(streamFromKey(key), shape, octaves);
  if (!r.ok) throw new Error(r.detail);
  return r.value;
}

/** S1's stream: `terrain.noise` on a town root's key for `seed` (the lineage stands in for §6.3's town lineage). */
function terrainNoiseStream(seed: number): Stream {
  const town: Hash128 = entityKey(seedKey(seed), [0, 0], { layer: 'ground', part: 0 });
  return createRng().stream(town, STAGES.S1, CONCERNS['terrain.noise'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
}

/** A 64 × 64 sample of fbm(·, ·, 5) over a few noise units, as bytes. */
function sampleBytes(ns: NoiseStream): Uint8Array {
  const out = new Float64Array(64 * 64);
  for (let j = 0; j < 64; j += 1) for (let i = 0; i < 64; i += 1) out[j * 64 + i] = fbm(i * 0.0625 - 2, j * 0.0625 - 2, 5, ns);
  return new Uint8Array(out.buffer);
}

function sha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

describe('fBm is a function of the stream alone (the item\'s test; §6.1)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('two runs from the same seed are byte-identical', () => {
    const a = noiseStream(terrainNoiseStream(20251004), SHAPE, 6);
    const b = noiseStream(terrainNoiseStream(20251004), SHAPE, 6);
    if (!a.ok || !b.ok) throw new Error('refused');
    expect(Buffer.from(sampleBytes(a.value)).equals(Buffer.from(sampleBytes(b.value)))).toBe(true);
  });

  it('a different seed differs (at almost every point)', () => {
    const a = noiseStream(terrainNoiseStream(1), SHAPE, 6);
    const b = noiseStream(terrainNoiseStream(2), SHAPE, 6);
    if (!a.ok || !b.ok) throw new Error('refused');
    const va = new Float64Array(sampleBytes(a.value).buffer);
    const vb = new Float64Array(sampleBytes(b.value).buffer);
    let same = 0;
    for (let i = 0; i < va.length; i += 1) if (va[i] === vb[i]) same += 1;
    expect(same).toBeLessThan(va.length / 100);
  });

  it('as a property: equal stream keys give equal values, keys one bit apart give different samples', () => {
    fc.assert(
      fc.property(fc.tuple(fc.nat(), fc.nat(), fc.nat(), fc.nat()), fc.integer({ min: 0, max: 127 }), fc.double({ min: -1e4, max: 1e4, noNaN: true }), fc.double({ min: -1e4, max: 1e4, noNaN: true }), (key, bit, x, y) => {
          const k = key.map((w) => w >>> 0);
          const flipped = k.slice();
          flipped[bit >> 5] = (flipped[bit >> 5] ^ (1 << (bit & 31))) >>> 0;
          const a = sampler(k, 5);
          const b = sampler(k, 5);
          expect(Object.is(fbm(x, y, 5, a), fbm(x, y, 5, b))).toBe(true);
          const c = sampler(flipped, 5);
          let differ = 0;
          for (let i = 0; i < 8; i += 1) if (fbm(x + i * 0.37, y - i * 0.29, 5, a) !== fbm(x + i * 0.37, y - i * 0.29, 5, c)) differ += 1;
          expect(differ).toBeGreaterThan(0);
        }),
      { numRuns: 300 },
    );
  });

  it('reads no Math.random: a sampler is made and sampled with Math.random throwing (C-0011)', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('Math.random read');
    });
    const ns = sampler([3, 1, 4, 1]);
    expect(Number.isFinite(fbm(0.5, 0.5, 6, ns))).toBe(true);
    expect(Math.random).not.toHaveBeenCalled();
  });

  it('the pinned sample: 64 × 64 values of fbm(·, ·, 5) for the key (1, 2, 3, 4) hash to their recorded SHA-256', () => {
    // Recorded at M0-e-01's landing (Node 24.12 arm64): every IEEE host computes the same doubles (+ − × and floor
    // only), so a different hash here is a changed sampler, a declared change.
    expect(sha256(sampleBytes(sampler([1, 2, 3, 4])))).toBe(PINNED_SAMPLE_SHA256);
    const ns = sampler([1, 2, 3, 4]);
    expect([fbm(0, 0, 5, ns), fbm(0.5, 0.25, 5, ns), fbm(1.7, -3.2, 5, ns), fbm(100.1, 42.42, 5, ns)]).toEqual(PINNED_VALUES);
  });
});

describe('the seeded sampler (noiseStream)', () => {
  it('draws octaves × (255 + 2) uniforms, in order, and leaves the stream continued after them', () => {
    for (const octaves of [1, 5, 6, MAX_NOISE_OCTAVES]) {
      const a = streamFromKey([7, 7, 7, 7]);
      const b = streamFromKey([7, 7, 7, 7]);
      const r = noiseStream(a, SHAPE, octaves);
      expect(r.ok).toBe(true);
      for (let i = 0; i < octaves * NOISE_DRAWS_PER_OCTAVE; i += 1) b.float01();
      expect(a.u32()).toBe(b.u32());
    }
    expect(NOISE_DRAWS_PER_OCTAVE).toBe(257);
  });

  it('refuses octaves outside 1 … 16 and a lacunarity or gain that is not finite and positive, drawing nothing', () => {
    const bad: [NoiseShape, number, string][] = [
      [SHAPE, 0, 'noise.octaves'],
      [SHAPE, MAX_NOISE_OCTAVES + 1, 'noise.octaves'],
      [SHAPE, 2.5, 'noise.octaves'],
      [{ lacunarity: 0, gain: 0.5 }, 5, 'noise.shape'],
      [{ lacunarity: -2, gain: 0.5 }, 5, 'noise.shape'],
      [{ lacunarity: Number.NaN, gain: 0.5 }, 5, 'noise.shape'],
      [{ lacunarity: 2, gain: 0 }, 5, 'noise.shape'],
      [{ lacunarity: 2, gain: Number.POSITIVE_INFINITY }, 5, 'noise.shape'],
    ];
    for (const [shape, octaves, detail] of bad) {
      const s = streamFromKey([1, 1, 1, 1]);
      const r = noiseStream(s, shape, octaves);
      expect(r).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail });
      expect(s.u32()).toBe(streamFromKey([1, 1, 1, 1]).u32());
    }
  });

  it('holds its shape, frozen', () => {
    const ns = sampler([2, 2, 2, 2], 4, { lacunarity: 2.5, gain: 0.4 });
    expect(ns.octaves).toBe(4);
    expect(ns.shape).toEqual({ lacunarity: 2.5, gain: 0.4 });
    expect(Object.isFrozen(ns)).toBe(true);
  });
});

describe('fbm, its octaves and its batch forms', () => {
  const ns = sampler([42, 0, 42, 0], 6);

  it('lies in [−1, 1], centred near 0, with a spread', () => {
    let sum = 0;
    let sum2 = 0;
    const N = 150;
    for (let j = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) {
        const v = fbm(i * 0.041, j * 0.037, 5, ns);
        expect(Math.abs(v)).toBeLessThanOrEqual(1);
        sum += v;
        sum2 += v * v;
      }
    }
    const mean = sum / (N * N);
    expect(Math.abs(mean)).toBeLessThan(0.05);
    expect(Math.sqrt(sum2 / (N * N) - mean * mean)).toBeGreaterThan(0.1);
  });

  it('is the octave terms summed in order times the normaliser 1 ÷ Σ gain^o, to the bit', () => {
    fc.assert(
      fc.property(fc.double({ min: -500, max: 500, noNaN: true }), fc.double({ min: -500, max: 500, noNaN: true }), fc.integer({ min: 1, max: 6 }), (x, y, n) => {
        let sum = 0;
        for (let o = 0; o < n; o += 1) sum += octaveTerm(x, y, o, ns);
        expect(Object.is(fbm(x, y, n, ns), sum * octaveNorm(n, ns))).toBe(true);
      }),
    );
    expect(octaveNorm(1, ns)).toBe(1);
    expect(octaveNorm(5, ns)).toBe(1 / (1 + 0.5 + 0.25 + 0.125 + 0.0625));
  });

  it('octave o is octave 0\'s kind of field at lacunarity^o and gain^o: |term| ≤ gain^o', () => {
    for (let o = 0; o < 6; o += 1) {
      for (let i = 0; i < 200; i += 1) expect(Math.abs(octaveTerm(i * 0.11, i * -0.07, o, ns))).toBeLessThanOrEqual(0.5 ** o);
    }
  });

  it('fbmRow and octaveRow equal the single calls to the bit', () => {
    fc.assert(
      fc.property(fc.double({ min: -1000, max: 1000, noNaN: true }), fc.double({ min: 1e-4, max: 2, noNaN: true }), fc.double({ min: -1000, max: 1000, noNaN: true }), fc.integer({ min: 0, max: 40 }), fc.integer({ min: 0, max: 5 }), (x0, dx, y, n, o) => {
        const row = new Float64Array(n);
        fbmRow(row, x0, dx, n, y, 5, ns);
        for (let i = 0; i < n; i += 1) expect(Object.is(row[i], fbm(x0 + i * dx, y, 5, ns))).toBe(true);
        octaveRow(row, x0, dx, n, y, o, ns);
        for (let i = 0; i < n; i += 1) expect(Object.is(row[i], octaveTerm(x0 + i * dx, y, o, ns))).toBe(true);
      }),
      { numRuns: 2000 },
    );
  });

  it('refuses an octave count the sampler does not hold, and a foreign sampler', () => {
    expect(() => fbm(0, 0, 0, ns)).toThrow(RangeError);
    expect(() => fbm(0, 0, 7, ns)).toThrow(RangeError);
    expect(() => octaveTerm(0, 0, 6, ns)).toThrow(RangeError);
    expect(() => octaveTerm(0, 0, -1, ns)).toThrow(RangeError);
    expect(() => octaveNorm(7, ns)).toThrow(RangeError);
    expect(() => fbmRow(new Float64Array(2), 0, 1, 3, 0, 5, ns)).toThrow(RangeError);
    expect(() => octaveRow(new Float64Array(2), 0, 1, 2, 0, 6, ns)).toThrow(RangeError);
    expect(() => fbm(0, 0, 1, { octaves: 6, shape: SHAPE })).toThrow(/not a sampler made by noiseStream/);
    expect(() => octaveNorm(1, { octaves: 6, shape: SHAPE })).toThrow(/not a sampler made by noiseStream/);
  });
});

/** Recorded on Node 24.12 arm64 and re-run equal on x64 under Rosetta 2 (a bundled copy, lane build/M0-e-01). */
const PINNED_SAMPLE_SHA256 = 'b89714033e7f72e36ac4751a1647094c7fe4fb8441f067c0fa9cc9be64fb5e38';
const PINNED_VALUES: number[] = [-0.3456941083095525, -0.2189207521846885, -0.1322000902002897, 0.42721410208047694];
