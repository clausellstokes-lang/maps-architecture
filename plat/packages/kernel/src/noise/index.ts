// @plat/kernel's noise module (M0-e-01; §3.1's "noise (fBm, domain warp, ridged): adopt + build", §4.2 S1 (1), §6.1;
// C-0065): the seeded sampler and fBm over the one simplex-noise adapter (../adapters/simplex-noise.ts). Folder and
// index created empty by the scaffold's fix round (C-0064); its one re-export line in kernel/src/index.ts is the
// scaffold's.
//
// The seeded sampler (`noiseStream`) is made once from a sub-stream (§6.1 — S1 passes `terrain.noise` on the town root's
// key) and holds one independent simplex field per octave, each with its own offset; fBm sums the octaves at the
// table's lacunarity and gain (§3.1: "octaves and lacunarity are table values" — the kernel reads no table, so the
// caller hands them in as the stream's `NoiseShape`). Every value is a function of the stream's state when the sampler
// was made and of the arguments alone: no Math.random (C-0011), no transcendental, powers by repeated multiplication.
//
// Staged: the domain warp and the ridged variant join with their first readers (C-0065) — the coast's displacement
// (§4.2 S1 (2), M1) and the later relief readers; M0's readers (S1's heightfield, M0-e-05's ε) read fBm alone.
import { seededSimplex2, SIMPLEX2_DRAWS, type Simplex2 } from '../adapters/simplex-noise.js';
import { err, ok, ratio, type KernelResult } from '../num/index.js';
import type { Stream } from '../rng/index.js';

export { SIMPLEX2_DRAWS, type Simplex2 } from '../adapters/simplex-noise.js';

/** The fBm's table values (§3.1): each octave's frequency is the last one's × lacunarity, its amplitude × gain. */
export interface NoiseShape {
  readonly lacunarity: number;
  readonly gain: number;
}

/** The most octaves one sampler holds. */
export const MAX_NOISE_OCTAVES = 16;

/** The uniforms one octave draws: its field's permutation (SIMPLEX2_DRAWS), then its x and y offsets. */
export const NOISE_DRAWS_PER_OCTAVE = SIMPLEX2_DRAWS + 2;

/** The span of an octave's offset draw: each offset is uniform in [0, 256) noise units. */
const OFFSET_SPAN = 256;

/**
 * The seeded sampler: `octaves` independent simplex fields, each with its own offset, and the shape they are summed
 * with. Opaque — read through `fbm`, `octaveTerm` and `octaveNorm`.
 */
export interface NoiseStream {
  /** The octaves it holds (0 … octaves − 1). */
  readonly octaves: number;
  readonly shape: NoiseShape;
}

class SeededNoise implements NoiseStream {
  readonly octaves: number;
  readonly shape: NoiseShape;
  /** Per octave: its field, its offsets, its frequency (lacunarity^o) and amplitude (gain^o). */
  readonly fields: Simplex2[];
  readonly offX: Float64Array;
  readonly offY: Float64Array;
  readonly freq: Float64Array;
  readonly amp: Float64Array;
  /** invSum[n] = 1 ÷ Σ_{o < n} gain^o, for n = 1 … octaves (index 0 unused). */
  readonly invSum: Float64Array;

  constructor(octaves: number, shape: NoiseShape, fields: Simplex2[], offX: Float64Array, offY: Float64Array, invSum: Float64Array) {
    this.octaves = octaves;
    this.shape = Object.freeze({ lacunarity: shape.lacunarity, gain: shape.gain });
    this.fields = fields;
    this.offX = offX;
    this.offY = offY;
    this.freq = new Float64Array(octaves);
    this.amp = new Float64Array(octaves);
    let f = 1;
    let a = 1;
    for (let o = 0; o < octaves; o += 1) {
      this.freq[o] = f;
      this.amp[o] = a;
      f *= shape.lacunarity;
      a *= shape.gain;
    }
    this.invSum = invSum;
    Object.freeze(this);
  }
}

/**
 * The seeded sampler over `stream` (§3.1, §6.1): for each octave o = 0 … octaves − 1 in order, its simplex field
 * (SIMPLEX2_DRAWS uniforms) then its x and y offsets (one uniform each, × 256) — octaves × NOISE_DRAWS_PER_OCTAVE
 * uniforms in all, the stream continued after them. Refused with E_OUT_OF_RANGE (detail `noise.octaves` or
 * `noise.shape`) when `octaves` is not an integer in 1 … MAX_NOISE_OCTAVES, or the lacunarity or the gain is not finite
 * and positive; nothing is drawn then.
 */
export function noiseStream(stream: Stream, shape: NoiseShape, octaves: number): KernelResult<NoiseStream> {
  if (!(Number.isInteger(octaves) && octaves >= 1 && octaves <= MAX_NOISE_OCTAVES)) return err('E_OUT_OF_RANGE', 'noise.octaves');
  const { lacunarity, gain } = shape;
  if (!(Number.isFinite(lacunarity) && lacunarity > 0 && Number.isFinite(gain) && gain > 0)) return err('E_OUT_OF_RANGE', 'noise.shape');
  const invSum = new Float64Array(octaves + 1);
  let sum = 0;
  let a = 1;
  for (let n = 1; n <= octaves; n += 1) {
    sum += a;
    a *= gain;
    // Σ gain^o ≥ 1 (its first term is 1), so the count floor never refuses it.
    const inv = ratio(1, sum, 'count');
    if (!inv.ok) return err(inv.code, inv.detail);
    invSum[n] = inv.value;
  }
  const fields: Simplex2[] = [];
  const offX = new Float64Array(octaves);
  const offY = new Float64Array(octaves);
  for (let o = 0; o < octaves; o += 1) {
    fields.push(seededSimplex2(stream));
    offX[o] = stream.float01() * OFFSET_SPAN;
    offY[o] = stream.float01() * OFFSET_SPAN;
  }
  return ok(new SeededNoise(octaves, shape, fields, offX, offY, invSum));
}

function held(stream: NoiseStream): SeededNoise {
  if (!(stream instanceof SeededNoise)) throw new TypeError('noise: not a sampler made by noiseStream()');
  return stream;
}

function checkOctaves(n: number, s: SeededNoise, what: string): void {
  if (!(Number.isInteger(n) && n >= 1 && n <= s.octaves)) {
    throw new RangeError(`${what}: ${String(n)} octaves, the sampler holds 1 … ${String(s.octaves)}`);
  }
}

/**
 * One octave's un-normalised term at (x, y): gain^o · N_o(x · lacunarity^o + offX_o, y · lacunarity^o + offY_o), N_o
 * the octave's simplex field — a value in [−gain^o, gain^o]. `octave` is an integer in 0 … octaves − 1.
 */
export function octaveTerm(x: number, y: number, octave: number, stream: NoiseStream): number {
  const s = held(stream);
  if (!(Number.isInteger(octave) && octave >= 0 && octave < s.octaves)) {
    throw new RangeError(`octaveTerm: octave ${String(octave)}, the sampler holds 0 … ${String(s.octaves - 1)}`);
  }
  const f = s.freq[octave];
  return s.amp[octave] * s.fields[octave](x * f + s.offX[octave], y * f + s.offY[octave]);
}

/** fBm's normaliser for `octaves` octaves: 1 ÷ Σ_{o < octaves} gain^o, so the normalised sum lies in [−1, 1]. */
export function octaveNorm(octaves: number, stream: NoiseStream): number {
  const s = held(stream);
  checkOctaves(octaves, s, 'octaveNorm');
  return s.invSum[octaves];
}

/**
 * One octave's terms along a row, the batch form of `octaveTerm`: out[i] = octaveTerm(x0 + i · dx, y, octave) for
 * i = 0 … n − 1 (x0 + i · dx computed as written, so each equals the single call's argument to the bit).
 */
export function octaveRow(out: Float64Array, x0: number, dx: number, n: number, y: number, octave: number, stream: NoiseStream): void {
  const s = held(stream);
  if (!(Number.isInteger(octave) && octave >= 0 && octave < s.octaves)) {
    throw new RangeError(`octaveRow: octave ${String(octave)}, the sampler holds 0 … ${String(s.octaves - 1)}`);
  }
  if (!(Number.isInteger(n) && n >= 0 && n <= out.length)) throw new RangeError(`octaveRow: ${String(n)} values into ${String(out.length)}`);
  const f = s.freq[octave];
  const a = s.amp[octave];
  const field = s.fields[octave];
  const ox = s.offX[octave];
  const yy = y * f + s.offY[octave];
  for (let i = 0; i < n; i += 1) out[i] = a * field((x0 + i * dx) * f + ox, yy);
}

/**
 * fBm along a row, the batch form of `fbm`: out[i] = fbm(x0 + i · dx, y, octaves) for i = 0 … n − 1, each equal to the
 * single call to the bit (the octaves summed in the same order).
 */
export function fbmRow(out: Float64Array, x0: number, dx: number, n: number, y: number, octaves: number, stream: NoiseStream): void {
  const s = held(stream);
  checkOctaves(octaves, s, 'fbmRow');
  if (!(Number.isInteger(n) && n >= 0 && n <= out.length)) throw new RangeError(`fbmRow: ${String(n)} values into ${String(out.length)}`);
  const inv = s.invSum[octaves];
  for (let i = 0; i < n; i += 1) {
    const x = x0 + i * dx;
    let sum = 0;
    for (let o = 0; o < octaves; o += 1) {
      const f = s.freq[o];
      sum += s.amp[o] * s.fields[o](x * f + s.offX[o], y * f + s.offY[o]);
    }
    out[i] = sum * inv;
  }
}

/**
 * fBm (§3.1, §4.2 S1 (1)): Σ_{o < octaves} octaveTerm(x, y, o) × octaveNorm(octaves) — the octaves summed in order,
 * normalised into [−1, 1]. A function of the sampler (that is, of its stream) and of x, y and octaves alone: the same
 * stream state gives the same value to the bit on every host. `octaves` is an integer in 1 … the sampler's octaves.
 */
export function fbm(x: number, y: number, octaves: number, stream: NoiseStream): number {
  const s = held(stream);
  checkOctaves(octaves, s, 'fbm');
  let sum = 0;
  for (let o = 0; o < octaves; o += 1) {
    const f = s.freq[o];
    sum += s.amp[o] * s.fields[o](x * f + s.offX[o], y * f + s.offY[o]);
  }
  return sum * s.invSum[octaves];
}
