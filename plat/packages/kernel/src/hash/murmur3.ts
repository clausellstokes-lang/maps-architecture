// MurmurHash3, x86 128-bit variant, and its 32-bit finaliser (§6.2, §6.1, §13.6 (2); §17.1 (8): Appleby's published
// public-domain algorithm, our own implementation in 32-bit operations — Math.imul, shifts and rotations, no BigInt).
// Correctness is held by SMHasher's verification value 0xB3ECE62A and §13.6 (2)'s check vectors
// (test/hash/murmur3.test.ts, test/hash/h32.test.ts). The render hash RH32 (§8.1) is M1's (M0.md §4b).
//
// Byte order: the algorithm reads its input as little-endian 32-bit words. Bytes are packed into words by shifts, never
// through a typed-array view of the host's memory, so the result never depends on the host's byte order (§6.2).
import type { Hash128 } from './types.js';

const C1 = 0x239b961b;
const C2 = 0xab0e9789;
const C3 = 0x38b34ae5;
const C4 = 0xa1e38b93;

function rotl(x: number, r: number): number {
  return (x << r) | (x >>> (32 - r));
}

/** MurmurHash3's 32-bit finaliser (fmix32): a bijection on u32 with full avalanche; the seed key's mixer (§6.1). */
export function fmix32(h: number): number {
  let x = h | 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return x >>> 0;
}

function assertU32(v: number, what: string): void {
  if ((v >>> 0) !== v) throw new RangeError(`${what} must be an integer in 0 … 2³² − 1, got ${String(v)}`);
}

/**
 * The incremental MurmurHash3 x86 128 state under one seed: bytes (`update`, `byte`) and little-endian u32 words
 * (`word`) may be fed in any split; `digest()` equals the one-shot hash of everything fed so far and leaves the state
 * as it was, so feeding may continue.
 */
export class Murmur128 {
  private h1 = 0;
  private h2 = 0;
  private h3 = 0;
  private h4 = 0;
  /** The current block's four words, filled little-endian; bytes beyond `pos` are zero. */
  private readonly k = new Int32Array(4);
  /** Bytes in the current block, 0 … 15. */
  private pos = 0;
  /** Bytes fed in total. */
  private len = 0;

  constructor(seed = 0) {
    this.reset(seed);
  }

  /** Restarts the hash under `seed` (a u32). */
  reset(seed = 0): this {
    assertU32(seed, 'seed');
    this.h1 = seed | 0;
    this.h2 = seed | 0;
    this.h3 = seed | 0;
    this.h4 = seed | 0;
    this.k.fill(0);
    this.pos = 0;
    this.len = 0;
    return this;
  }

  /** The number of bytes fed so far. */
  get byteLength(): number {
    return this.len;
  }

  /** Feeds one byte (its low eight bits). */
  byte(b: number): this {
    const p = this.pos;
    this.k[p >> 2] |= (b & 0xff) << ((p & 3) << 3);
    this.len += 1;
    if (p === 15) this.flush();
    else this.pos = p + 1;
    return this;
  }

  /** Feeds one 32-bit word as its four little-endian bytes. */
  word(w: number): this {
    const p = this.pos;
    if ((p & 3) === 0) {
      this.k[p >> 2] = w | 0;
      this.len += 4;
      if (p === 12) this.flush();
      else this.pos = p + 4;
      return this;
    }
    this.byte(w);
    this.byte(w >>> 8);
    this.byte(w >>> 16);
    return this.byte(w >>> 24);
  }

  /** Feeds `bytes[start … end)`. */
  update(bytes: Uint8Array, start = 0, end = bytes.length): this {
    if (!(Number.isInteger(start) && Number.isInteger(end) && start >= 0 && start <= end && end <= bytes.length)) {
      throw new RangeError(`update: the range [${String(start)}, ${String(end)}) is not inside 0 … ${String(bytes.length)}`);
    }
    let i = start;
    while (i < end && this.pos !== 0) {
      this.byte(bytes[i]);
      i += 1;
    }
    while (end - i >= 16) {
      this.block(
        bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24),
        bytes[i + 4] | (bytes[i + 5] << 8) | (bytes[i + 6] << 16) | (bytes[i + 7] << 24),
        bytes[i + 8] | (bytes[i + 9] << 8) | (bytes[i + 10] << 16) | (bytes[i + 11] << 24),
        bytes[i + 12] | (bytes[i + 13] << 8) | (bytes[i + 14] << 16) | (bytes[i + 15] << 24),
      );
      this.len += 16;
      i += 16;
    }
    while (i < end) {
      this.byte(bytes[i]);
      i += 1;
    }
    return this;
  }

  /** The hash of everything fed so far (the tail and the finalisation applied to a copy of the state). */
  digest(): Hash128 {
    let h1 = this.h1;
    let h2 = this.h2;
    let h3 = this.h3;
    let h4 = this.h4;
    const n = this.pos;
    if (n > 12) {
      let k4 = this.k[3];
      k4 = Math.imul(k4, C4);
      k4 = rotl(k4, 18);
      k4 = Math.imul(k4, C1);
      h4 ^= k4;
    }
    if (n > 8) {
      let k3 = this.k[2];
      k3 = Math.imul(k3, C3);
      k3 = rotl(k3, 17);
      k3 = Math.imul(k3, C4);
      h3 ^= k3;
    }
    if (n > 4) {
      let k2 = this.k[1];
      k2 = Math.imul(k2, C2);
      k2 = rotl(k2, 16);
      k2 = Math.imul(k2, C3);
      h2 ^= k2;
    }
    if (n > 0) {
      let k1 = this.k[0];
      k1 = Math.imul(k1, C1);
      k1 = rotl(k1, 15);
      k1 = Math.imul(k1, C2);
      h1 ^= k1;
    }
    // The length enters as a u32 (the C routine's `int len`, taken modulo 2³²).
    const len = this.len >>> 0;
    h1 ^= len;
    h2 ^= len;
    h3 ^= len;
    h4 ^= len;
    h1 = (h1 + h2) | 0;
    h1 = (h1 + h3) | 0;
    h1 = (h1 + h4) | 0;
    h2 = (h2 + h1) | 0;
    h3 = (h3 + h1) | 0;
    h4 = (h4 + h1) | 0;
    h1 = fmix32(h1);
    h2 = fmix32(h2);
    h3 = fmix32(h3);
    h4 = fmix32(h4);
    h1 = (h1 + h2) | 0;
    h1 = (h1 + h3) | 0;
    h1 = (h1 + h4) | 0;
    h2 = (h2 + h1) | 0;
    h3 = (h3 + h1) | 0;
    h4 = (h4 + h1) | 0;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
  }

  private flush(): void {
    const k = this.k;
    this.block(k[0], k[1], k[2], k[3]);
    k.fill(0);
    this.pos = 0;
  }

  /** One 16-byte block of the body. */
  private block(k1: number, k2: number, k3: number, k4: number): void {
    let h1 = this.h1;
    let h2 = this.h2;
    let h3 = this.h3;
    let h4 = this.h4;

    k1 = Math.imul(k1, C1);
    k1 = rotl(k1, 15);
    k1 = Math.imul(k1, C2);
    h1 ^= k1;
    h1 = rotl(h1, 19);
    h1 = (h1 + h2) | 0;
    h1 = (Math.imul(h1, 5) + 0x561ccd1b) | 0;

    k2 = Math.imul(k2, C2);
    k2 = rotl(k2, 16);
    k2 = Math.imul(k2, C3);
    h2 ^= k2;
    h2 = rotl(h2, 17);
    h2 = (h2 + h3) | 0;
    h2 = (Math.imul(h2, 5) + 0x0bcaa747) | 0;

    k3 = Math.imul(k3, C3);
    k3 = rotl(k3, 17);
    k3 = Math.imul(k3, C4);
    h3 ^= k3;
    h3 = rotl(h3, 15);
    h3 = (h3 + h4) | 0;
    h3 = (Math.imul(h3, 5) + 0x96cd1c35) | 0;

    k4 = Math.imul(k4, C4);
    k4 = rotl(k4, 18);
    k4 = Math.imul(k4, C1);
    h4 ^= k4;
    h4 = rotl(h4, 13);
    h4 = (h4 + h1) | 0;
    h4 = (Math.imul(h4, 5) + 0x32ac3b17) | 0;

    this.h1 = h1;
    this.h2 = h2;
    this.h3 = h3;
    this.h4 = h4;
  }
}

/** MurmurHash3 x86 128 of `bytes` under `seed` (a u32) — the seeded primitive SMHasher's verification procedure runs. */
export function murmur128(bytes: Uint8Array, seed: number): Hash128 {
  return new Murmur128(seed).update(bytes).digest();
}

/** H128 (§6.2): MurmurHash3 x86 128 with seed 0. A digest leaf's lanes go through `LaneWriter`, which equals this
 * function over the lanes' little-endian bytes. */
export function H128(bytes: Uint8Array): Hash128 {
  return new Murmur128(0).update(bytes).digest();
}
