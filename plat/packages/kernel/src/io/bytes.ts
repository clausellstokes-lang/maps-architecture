// The arena block's byte layer (M0-a-15; §3.9, §6.5 (3)): a growable byte writer and a strict reader over the chunk
// format's four field shapes — unsigned LEB128 varints (minimal, at most 32 bits), zig-zag signed varints, fixed-width
// little-endian u8 / u16 / f64, and strings as varint UTF-16 code units. Nothing here formats a number as text or parses
// one from text: every value is written as its bits (§6.5 (3): no text serialisation on the path). A read past the
// end, an over-long or non-minimal varint, or a value out of its field's range throws a `ChunkFormatError`, which
// `decodeArena` turns into the corrupt-cache result (§3.9). Readings: C-0207.

/** A chunk's bytes do not parse as the format states (decodeArena's corrupt cache, §3.9). */
export class ChunkFormatError extends Error {
  constructor(message: string) {
    super(`arena block: ${message}`);
    this.name = 'ChunkFormatError';
  }
}

/** Throws a ChunkFormatError unless `condition` holds. */
export function need(condition: boolean, message: string): asserts condition {
  if (!condition) throw new ChunkFormatError(message);
}

const U32_LIMIT = 4_294_967_296;

/** A growable byte buffer the encoder appends to. */
export class ByteWriter {
  private buf = new Uint8Array(256);
  private n = 0;
  private readonly scratch = new DataView(new ArrayBuffer(8));

  private room(k: number): void {
    if (this.n + k <= this.buf.length) return;
    let cap = this.buf.length * 2;
    while (cap < this.n + k) cap *= 2;
    const b = new Uint8Array(cap);
    b.set(this.buf.subarray(0, this.n));
    this.buf = b;
  }

  /** One byte, 0 … 255. */
  u8(v: number): void {
    if (!(Number.isInteger(v) && v >= 0 && v <= 0xff)) throw new Error(`arena block: u8 out of range: ${v}`);
    this.room(1);
    this.buf[this.n++] = v;
  }

  /** Two bytes little-endian, 0 … 65 535 (the ordinal and kind columns, §3.9). */
  u16(v: number): void {
    if (!(Number.isInteger(v) && v >= 0 && v <= 0xffff)) throw new Error(`arena block: u16 out of range: ${v}`);
    this.room(2);
    this.buf[this.n++] = v & 0xff;
    this.buf[this.n++] = v >>> 8;
  }

  /** An unsigned LEB128 varint, 0 … 2³² − 1, in its minimal form. */
  uv(v: number): void {
    if (!(Number.isInteger(v) && v >= 0 && v < U32_LIMIT)) throw new Error(`arena block: varint out of range: ${v}`);
    this.room(5);
    let x = v >>> 0;
    while (x >= 0x80) {
      this.buf[this.n++] = (x & 0x7f) | 0x80;
      x >>>= 7;
    }
    this.buf[this.n++] = x;
  }

  /** A signed value in the int32 range, zig-zag encoded as a varint. */
  sv(v: number): void {
    if (!(Number.isInteger(v) && v >= -0x80000000 && v <= 0x7fffffff)) throw new Error(`arena block: signed varint out of range: ${v}`);
    this.uv(((v << 1) ^ (v >> 31)) >>> 0);
  }

  /** A double as its eight IEEE-754 bytes, little-endian (bits, never text). */
  f64(v: number): void {
    this.scratch.setFloat64(0, v, true);
    this.room(8);
    for (let i = 0; i < 8; i++) this.buf[this.n++] = this.scratch.getUint8(i);
  }

  /** A string as its length and its UTF-16 code units, each a varint (exact for any string, lone surrogates included). */
  str(s: string): void {
    this.uv(s.length);
    for (let i = 0; i < s.length; i++) this.uv(s.charCodeAt(i));
  }

  /** Raw bytes. */
  raw(bytes: readonly number[]): void {
    this.room(bytes.length);
    for (const b of bytes) this.buf[this.n++] = b;
  }

  /** The bytes written, as a fresh array. */
  bytes(): Uint8Array {
    return this.buf.slice(0, this.n);
  }
}

/** A strict reader over one chunk's bytes. */
export class ByteReader {
  private at = 0;
  private readonly scratch = new DataView(new ArrayBuffer(8));

  constructor(private readonly buf: Uint8Array) {}

  /** Bytes not read yet. */
  remaining(): number {
    return this.buf.length - this.at;
  }

  u8(): number {
    need(this.at < this.buf.length, 'the chunk ends inside a field');
    return this.buf[this.at++];
  }

  u16(): number {
    need(this.at + 2 <= this.buf.length, 'the chunk ends inside a field');
    const v = this.buf[this.at] | (this.buf[this.at + 1] << 8);
    this.at += 2;
    return v;
  }

  /** An unsigned varint: at most five bytes, at most 32 bits, minimal (no trailing zero group). */
  uv(): number {
    let v = 0;
    let mul = 1;
    for (let k = 0; k < 5; k++) {
      const b = this.u8();
      v += (b & 0x7f) * mul;
      if ((b & 0x80) === 0) {
        need(k === 0 || b !== 0, 'a varint is not in its minimal form');
        need(v < U32_LIMIT, 'a varint exceeds 32 bits');
        return v;
      }
      mul *= 128;
    }
    throw new ChunkFormatError('a varint runs past five bytes');
  }

  /** A zig-zag signed varint. */
  sv(): number {
    const u = this.uv();
    return (u >>> 1) ^ -(u & 1);
  }

  f64(): number {
    need(this.at + 8 <= this.buf.length, 'the chunk ends inside a field');
    for (let i = 0; i < 8; i++) this.scratch.setUint8(i, this.buf[this.at + i]);
    this.at += 8;
    return this.scratch.getFloat64(0, true);
  }

  /** A string of at most `max` code units. */
  str(max: number): string {
    const n = this.uv();
    need(n <= max && n <= this.remaining(), 'a string is longer than its field allows');
    let s = '';
    for (let i = 0; i < n; i++) {
      const c = this.uv();
      need(c <= 0xffff, 'a string code unit exceeds 16 bits');
      s += String.fromCharCode(c);
    }
    return s;
  }

  /** A count of items each at least `minBytes` long: refused when the bytes left cannot hold that many. */
  count(minBytes: number): number {
    const n = this.uv();
    need(n * minBytes <= this.remaining(), 'a count exceeds what the chunk can hold');
    return n;
  }
}
