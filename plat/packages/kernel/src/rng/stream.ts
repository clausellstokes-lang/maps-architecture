// The stream: xoshiro128** with §6.1's draw helpers (item M0-d-01; §6.1 Engine and Draw helpers, §17.1 (8)).
//
// The engine is our TypeScript port of the authors' published C (David Blackman and Sebastiano Vigna, xoshiro128** 1.1,
// public domain; plat/vendor/xoshiro/, CLEAN-ROOM.md §5): four 32-bit words of state, period 2¹²⁸ − 1, Math.imul,
// shifts and rotations only — no BigInt, no float on the state. A stream key's four words seed the state directly; the
// all-zero state, which the engine never leaves, is replaced by a fixed nudge (§6.1; C-0143). Bit-exactness to the
// C is held by the known-answer vectors of both architectures (test/vectors/xoshiro/, test/rng/kat.test.ts).
//
// The helpers draw uniforms only — no transcendental in the RNG layer (G-R12); a power of a draw goes through
// dmath.pow at its reader (§6.5 (3)).
import type { Hash128 } from '../hash/index.js';

/**
 * The state an all-zero stream key is replaced by (§6.1's "fixed nudge"; C-0143): the first four words of SHA-256's
 * initial hash value (FIPS 180-4 §5.3.3, the fractional parts of the square roots of 2, 3, 5 and 7) — dense,
 * published, nothing chosen.
 */
export const ZERO_STATE_NUDGE: Readonly<Hash128> = Object.freeze([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a]) as Readonly<Hash128>;

/** 2⁻²⁴, exactly: float01's scale. */
const TWO_POW_M24 = 5.9604644775390625e-8;
/** 2³², exactly. */
const TWO_POW_32 = 4294967296;

function rotl(x: number, k: number): number {
  return (x << k) | (x >>> (32 - k));
}

function u32Of(words: ArrayLike<number>, i: number): number {
  const v = words[i];
  if ((v >>> 0) !== v) throw new RangeError(`Stream: key word ${String(i)} is not a u32: ${String(v)}`);
  return v;
}

/**
 * One stream: xoshiro128** over a stream key, with §6.1's draw helpers. A stream is created once per derivation (by
 * `Rng.stream`) and continued; its draws are a pure function of its key and the order of the calls.
 */
export class Stream {
  /** The stream key it was seeded from (§6.1). */
  readonly key: Readonly<Hash128>;
  private s0: number;
  private s1: number;
  private s2: number;
  private s3: number;

  /** Seeds the state with the key's four u32 words directly; the all-zero key takes ZERO_STATE_NUDGE. */
  constructor(key: ArrayLike<number>) {
    if (key.length !== 4) throw new RangeError(`Stream: a stream key has four u32 words, got ${String(key.length)}`);
    const k: Hash128 = [u32Of(key, 0), u32Of(key, 1), u32Of(key, 2), u32Of(key, 3)];
    this.key = Object.freeze(k) as Readonly<Hash128>;
    const zero = (k[0] | k[1] | k[2] | k[3]) === 0;
    const s = zero ? ZERO_STATE_NUDGE : k;
    this.s0 = s[0] | 0;
    this.s1 = s[1] | 0;
    this.s2 = s[2] | 0;
    this.s3 = s[3] | 0;
  }

  /** The next 32-bit output (xoshiro128**'s `next()`): a u32. */
  u32(): number {
    const s0 = this.s0;
    const s1 = this.s1;
    const result = Math.imul(rotl(Math.imul(s1, 5), 7), 9) >>> 0;
    const t = s1 << 9;
    let s2 = this.s2 ^ s0;
    let s3 = this.s3 ^ s1;
    this.s1 = s1 ^ s2;
    this.s0 = s0 ^ s3;
    s2 ^= t;
    s3 = rotl(s3, 11);
    this.s2 = s2;
    this.s3 = s3;
    return result;
  }

  /** A uniform in [0, 1): the top 24 bits of one output, `(u32 >>> 8) · 2⁻²⁴` (§6.1). */
  float01(): number {
    return (this.u32() >>> 8) * TWO_POW_M24;
  }

  /**
   * A uniform integer in [lo, hi], both ends included (C-0143): `lo` and `hi` safe integers, hi − lo < 2³². Unbiased
   * by rejection: an output at or above the largest multiple of the range below 2³² is drawn again, so a call usually
   * draws one output and draws more with chance below (hi − lo + 1) / 2³².
   */
  int(lo: number, hi: number): number {
    if (!(Number.isSafeInteger(lo) && Number.isSafeInteger(hi) && lo <= hi && hi - lo < TWO_POW_32)) {
      throw new RangeError(`Stream.int: [${String(lo)}, ${String(hi)}] is not an integer range of at most 2³² values`);
    }
    const span = hi - lo + 1;
    if (span === TWO_POW_32) return lo + this.u32();
    const limit = TWO_POW_32 - (TWO_POW_32 % span);
    let u = this.u32();
    while (u >= limit) u = this.u32();
    return lo + (u % span);
  }

  /** True with chance p: one uniform, `float01() < p` (p ≤ 0 never, p ≥ 1 always). */
  bool(p: number): boolean {
    if (Number.isNaN(p)) throw new RangeError('Stream.bool: p is NaN');
    return this.float01() < p;
  }

  /** A standard normal by Irwin–Hall: the sum of twelve uniforms less 6 — mean 0, variance 1, range [−6, 6] (§6.1). */
  normal(): number {
    let sum = 0;
    for (let i = 0; i < 12; i += 1) sum += this.float01();
    return sum - 6;
  }

  /** The folded bell |(u₁ + u₂ + u₃ + u₄) / 2 − 1| on [0, 1], mean seven thirtieths — the stop test's draw (§6.1, §4.6). */
  bell4(): number {
    const sum = this.float01() + this.float01() + this.float01() + this.float01();
    return Math.abs(sum * 0.5 - 1);
  }

  /** Three uniforms averaged — §4.6's position and corner draws (§6.1). */
  mean3(): number {
    return (this.float01() + this.float01() + this.float01()) / 3;
  }

  /**
   * A value about the middle of [0, 1] whose spread grows with f ∈ [0, 1] (C-0143): 0.5 + f · (mean3() − 0.5) — the
   * centre at f = 0, mean3() at f = 1, in [0.5 − f/2, 0.5 + f/2]. It always draws mean3()'s three uniforms, so f never
   * changes how many draws a stream makes.
   */
  fuzzy(f: number): number {
    if (!(f >= 0 && f <= 1)) throw new RangeError(`Stream.fuzzy: f must lie in [0, 1], got ${String(f)}`);
    return 0.5 + f * (this.mean3() - 0.5);
  }

  /**
   * An index into `weights` drawn with chance proportional to its weight (C-0143): one uniform scaled by the total and
   * walked through the running sums in index order; a zero weight is never drawn. Weights finite and ≥ 0, total > 0.
   */
  weighted(weights: ArrayLike<number>): number {
    let total = 0;
    let last = -1;
    for (let i = 0; i < weights.length; i += 1) {
      const w = weights[i];
      if (!(w >= 0 && w < Infinity)) throw new RangeError(`Stream.weighted: weight ${String(i)} is not finite and ≥ 0: ${String(w)}`);
      total += w;
      if (w > 0) last = i;
    }
    if (!(total > 0 && total < Infinity)) throw new RangeError('Stream.weighted: the weights must have a finite positive total');
    const u = this.float01() * total;
    let acc = 0;
    for (let i = 0; i < weights.length; i += 1) {
      acc += weights[i];
      if (u < acc) return i;
    }
    // Unreachable: u < total and the last running sum is total, summed in the same order.
    return last;
  }

  /** A deck over `table` (§6.1: draw without replacement); each `draw()` takes one uniform card off this stream. */
  deck<T>(table: readonly T[]): Deck<T> {
    return new Deck(table, this);
  }
}

/**
 * Draw without replacement (§6.1's `deck(table)`; C-0143): each `draw()` takes a uniform card among those left —
 * `int(0, left − 1)` — and removes it; drawing from an empty deck is refused. A table that repeats an entry gives that
 * entry its multiplicity.
 */
export class Deck<T> {
  private readonly cards: T[];
  private left: number;
  private readonly stream: Stream;

  constructor(table: readonly T[], stream: Stream) {
    this.cards = table.slice();
    this.left = this.cards.length;
    this.stream = stream;
  }

  /** The number of cards left. */
  get size(): number {
    return this.left;
  }

  /** Takes one card, uniformly among those left. */
  draw(): T {
    if (this.left === 0) throw new RangeError('Deck.draw: the deck is empty');
    const j = this.stream.int(0, this.left - 1);
    const card = this.cards[j];
    this.left -= 1;
    this.cards[j] = this.cards[this.left];
    this.cards[this.left] = card;
    return card;
  }
}

/** A fresh stream over a stream key, outside any derivation's cache (the known-answer tests, a harness). */
export function streamFromKey(key: ArrayLike<number>): Stream {
  return new Stream(key);
}
