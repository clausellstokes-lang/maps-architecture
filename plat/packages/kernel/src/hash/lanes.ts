// The lane encoder every digest leaf uses (§6.2: "integers enter as 32-bit lanes, doubles as their IEEE-754 bit
// patterns (−0 normalised to +0; NaN refused), strings as UTF-8 — no text serialisation on the digest path, and no
// dependence on byte order"). The stream is a sequence of u32 lanes; its hash is H128 over the lanes' little-endian
// bytes, fed incrementally, so a leaf never builds a byte string. The encoding (C-0132):
//   u32(v)  one lane, v an integer in 0 … 2³² − 1;
//   i32(v)  one lane, v an integer in −2³¹ … 2³¹ − 1, as its two's-complement u32 (i32(−1) and u32(0xffffffff) are one
//           lane: a leaf's schema order, not the lane, says how a value reads);
//   f64(v)  two lanes, the low then the high word of v's IEEE-754 bit pattern (the double's little-endian bytes), after
//           −0 → +0; NaN refused; ±Infinity are ordinary bit patterns;
//   utf8(s) one lane holding the UTF-8 byte count n, then the bytes packed little-endian into ⌈n / 4⌉ lanes, the last
//           one zero-padded — so a field boundary is never ambiguous (("ab", "c") ≠ ("a", "bc")) and the stream stays
//           lane-aligned; a lone surrogate refused (C-0133).
// Every refusal is a RangeError naming the value; nothing is coerced silently.
import { Murmur128 } from './murmur3.js';
import type { Hash128, Hash64 } from './types.js';
import { encodeUtf8Into, utf8Length } from './utf8.js';

// The f64 bit pattern, read through an explicitly little-endian DataView (never a host-order typed-array alias).
const F64_VIEW = new DataView(new ArrayBuffer(8));

/** Writes a lane stream and hashes it with H128 (seed 0) as it goes; `digest()` may be read at any point. */
export class LaneWriter {
  private readonly m = new Murmur128(0);
  private scratch = new Uint8Array(64);

  /** One u32 lane. */
  u32(v: number): this {
    if ((v >>> 0) !== v) throw new RangeError(`LaneWriter.u32: not an integer in 0 … 2³² − 1: ${String(v)}`);
    this.m.word(v);
    return this;
  }

  /** One i32 lane (two's complement). */
  i32(v: number): this {
    if ((v | 0) !== v) throw new RangeError(`LaneWriter.i32: not an integer in −2³¹ … 2³¹ − 1: ${String(v)}`);
    this.m.word(v);
    return this;
  }

  /** Two lanes: the low and high words of the IEEE-754 bit pattern; −0 → +0; NaN refused. */
  f64(v: number): this {
    if (Number.isNaN(v)) throw new RangeError('LaneWriter.f64: NaN is refused (§6.2)');
    F64_VIEW.setFloat64(0, v === 0 ? 0 : v, true);
    this.m.word(F64_VIEW.getUint32(0, true));
    this.m.word(F64_VIEW.getUint32(4, true));
    return this;
  }

  /** A byte-count lane, then the UTF-8 bytes zero-padded to whole lanes. */
  utf8(s: string): this {
    const n = utf8Length(s);
    if (n > this.scratch.length) {
      let size = this.scratch.length;
      while (size < n) size += size;
      this.scratch = new Uint8Array(size);
    }
    encodeUtf8Into(s, this.scratch, 0);
    this.m.word(n);
    this.m.update(this.scratch, 0, n);
    for (let r = n & 3; r !== 0 && r < 4; r += 1) this.m.byte(0);
    return this;
  }

  /** The number of lanes written so far. */
  get lanes(): number {
    return this.m.byteLength >>> 2;
  }

  /** H128 of the lanes written so far (the writer is left as it was). */
  digest(): Hash128 {
    return this.m.digest();
  }

  /** Words 0 and 1 (the low 64 bits) of `digest()` — the form a lineage hash takes (§6.3, C-0132). */
  digest64(): Hash64 {
    const h = this.m.digest();
    return [h[0], h[1]];
  }

  /** Empties the writer for the next leaf. */
  reset(): this {
    this.m.reset(0);
    return this;
  }
}
