// The harness's digest writer (M0-d-06): H128 (MurmurHash3 x86 128, seed 0 — the kernel's, §6.2) over a stream of u32
// words, read by every leg the same way. Unlike the model's lane encoder (LaneWriter, which normalises −0 and refuses
// NaN as §6.2 asks of a leaf), the harness compares RAW results: a double enters as its IEEE-754 bit pattern with −0 kept
// (a −0 against a +0 on another engine is a difference worth naming), and every NaN as the one quiet NaN
// 0x7ff8000000000000 (C-0135 (1): IEEE 754 leaves a NaN's sign and payload to the hardware, and engines need not keep
// payloads). The bit pattern is read through an explicitly little-endian DataView, never a host-order typed-array alias,
// so the words never depend on the host's byte order. Every value is tagged, so ("ab", "c") and ("a", "bc"), [1, [2]]
// and [[1], 2] hash apart.
import { Murmur128, utf8Bytes, type Hash128 } from '@plat/kernel';
import type { CrossHostHex } from './types.js';

const F64 = new DataView(new ArrayBuffer(8));

/** The one quiet NaN every NaN result is read as: high word, low word. */
export const CROSSHOST_NAN_WORDS: readonly [number, number] = Object.freeze([0x7ff80000, 0]) as readonly [number, number];

/** The two words (low, high) of a double's bit pattern; −0 kept; every NaN the canonical quiet NaN. */
export function crossHostF64Words(v: number): [number, number] {
  if (Number.isNaN(v)) return [CROSSHOST_NAN_WORDS[1], CROSSHOST_NAN_WORDS[0]];
  F64.setFloat64(0, v, true);
  return [F64.getUint32(0, true), F64.getUint32(4, true)];
}

/** The double whose bit pattern is the 16 hexadecimal digits `hex` (high word first, as the vector files write it). */
export function crossHostF64FromHex(hex: string): number {
  if (!/^[0-9a-f]{16}$/.test(hex)) throw new RangeError(`crosshost: not 16 lower-case hexadecimal digits: ${JSON.stringify(hex)}`);
  F64.setUint32(4, Number.parseInt(hex.slice(0, 8), 16), true);
  F64.setUint32(0, Number.parseInt(hex.slice(8), 16), true);
  return F64.getFloat64(0, true);
}

/** A Hash128 as 32 lower-case hexadecimal digits, word 0 first. */
export function crossHostHex(h: Readonly<Hash128>): CrossHostHex {
  return h.map((w) => (w >>> 0).toString(16).padStart(8, '0')).join('');
}

// Value tags of `value()`.
const T_NULL = 1;
const T_UNDEFINED = 2;
const T_FALSE = 3;
const T_TRUE = 4;
const T_NUMBER = 5;
const T_STRING = 6;
const T_ARRAY = 7;
const T_OBJECT = 8;
const T_F64ARRAY = 9;
const T_INTARRAY = 10;
const T_BIGINT = 11;
const T_F32ARRAY = 12;
const T_MAP = 13;

/** Code-unit order: the one string order of the harness (never locale, §6.5 (3)). */
function byCodeUnit(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Writes a word stream and hashes it as it goes. */
export class CrossHostDigestWriter {
  private readonly m = new Murmur128(0);

  /** One u32 word; refuses anything else. */
  u32(v: number): this {
    if ((v >>> 0) !== v) throw new RangeError(`crosshost digest: not a u32: ${String(v)}`);
    this.m.word(v);
    return this;
  }

  /** A double's bit pattern (two words, low first), −0 kept, NaN canonical. */
  f64(v: number): this {
    const [lo, hi] = crossHostF64Words(v);
    this.m.word(lo);
    this.m.word(hi);
    return this;
  }

  /** A string: its UTF-8 byte count, then its bytes zero-padded to whole words. */
  str(s: string): this {
    const b = utf8Bytes(s);
    this.m.word(b.length);
    this.m.update(b, 0, b.length);
    for (let r = b.length & 3; r !== 0 && r < 4; r += 1) this.m.byte(0);
    return this;
  }

  /**
   * Any JSON-like value, tagged: null, undefined, booleans, numbers (bit patterns), strings, bigints, arrays, typed
   * arrays, Maps (in insertion order) and plain objects (own enumerable string keys in code-unit order).
   */
  value(v: unknown): this {
    if (v === null) return this.u32(T_NULL);
    if (v === undefined) return this.u32(T_UNDEFINED);
    if (v === false) return this.u32(T_FALSE);
    if (v === true) return this.u32(T_TRUE);
    if (typeof v === 'number') return this.u32(T_NUMBER).f64(v);
    if (typeof v === 'string') return this.u32(T_STRING).str(v);
    if (typeof v === 'bigint') return this.u32(T_BIGINT).str(v.toString(16));
    if (Array.isArray(v)) {
      this.u32(T_ARRAY).u32(v.length);
      for (const x of v as unknown[]) this.value(x);
      return this;
    }
    if (v instanceof Float64Array) {
      this.u32(T_F64ARRAY).u32(v.length);
      for (const x of v) this.f64(x);
      return this;
    }
    if (v instanceof Float32Array) {
      this.u32(T_F32ARRAY).u32(v.length);
      for (const x of v) this.f64(x);
      return this;
    }
    if (v instanceof Int32Array || v instanceof Uint32Array || v instanceof Int16Array || v instanceof Uint16Array || v instanceof Int8Array || v instanceof Uint8Array || v instanceof Uint8ClampedArray) {
      this.u32(T_INTARRAY).u32(v.length);
      for (const x of v) this.u32(x >>> 0);
      return this;
    }
    if (v instanceof Map) {
      this.u32(T_MAP).u32(v.size);
      for (const [k, x] of v) this.value(k).value(x);
      return this;
    }
    if (typeof v === 'object') {
      const o = v as Record<string, unknown>;
      const keys: string[] = [];
      for (const k in o) if (Object.prototype.hasOwnProperty.call(o, k)) keys.push(k);
      keys.sort(byCodeUnit);
      this.u32(T_OBJECT).u32(keys.length);
      for (const k of keys) this.str(k).value(o[k]);
      return this;
    }
    throw new TypeError(`crosshost digest: cannot digest a ${typeof v}`);
  }

  /** The H128 of the words written so far, as hex (the writer is left as it was). */
  hex(): CrossHostHex {
    return crossHostHex(this.m.digest());
  }
}

/** The digest of one value. */
export function crossHostDigestOf(v: unknown): CrossHostHex {
  return new CrossHostDigestWriter().value(v).hex();
}
