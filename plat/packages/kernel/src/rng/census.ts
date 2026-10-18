// The distinctness harness (item M0-d-01; §6.1 *Distinctness*: "a CI test asserts that every stream key and every
// lineage hash in a B-CITY city and in a sky-island fixture is distinct … the test guards the encoder, not the
// arithmetic"). A KeyCensus records hashes with the source each was made from — a stream key with its entity key and
// packed components, a lineage hash with its lineage key's lanes — and tells apart a **reuse** (the same source made the
// same hash again: the same stream asked for in two derivations) from a **collision** (two different sources gave one
// hash: an encoder failure, which the test fails on). M0-d-09's spike runner passes one to `createRng` and to the
// lineage minting over the spike city (the bar "every stream key and lineage hash distinct", C-0143). Typed arrays
// and integers only: no string is built.
import { fmix32 } from '../hash/index.js';

/** The open-addressing slot hash of a stored hash: fmix32 folded over its words, so structured inputs spread too. */
function slotHash(words: ArrayLike<number>, base: number, width: number): number {
  let h = width;
  for (let i = 0; i < width; i += 1) h = fmix32(h ^ words[base + i]);
  return h;
}

function u32At(words: ArrayLike<number>, i: number): number {
  const v = words[i];
  if ((v >>> 0) !== v) throw new RangeError(`KeyCensus: word ${String(i)} is not a u32: ${String(v)}`);
  return v;
}

/** What `add` found. */
export type CensusResult = 'new' | 'reused' | 'collision';

/** The first collision a census met: the hash and the two different sources that gave it. */
export interface CensusCollision {
  readonly hash: number[];
  readonly first: number[];
  readonly second: number[];
}

/** Records fixed-width hashes (2 words for a lineage hash, 4 for a stream key) with their sources. */
export class KeyCensus {
  /** The words per hash. */
  readonly width: number;
  private hashes: Uint32Array;
  private srcStart: Int32Array;
  private srcLen: Int32Array;
  private sources: Uint32Array;
  private srcUsed = 0;
  private slots: Int32Array;
  private count = 0;
  private reuses = 0;
  private collisionCount = 0;
  private first: CensusCollision | undefined;

  constructor(width = 4, capacity = 1024) {
    if (!(Number.isInteger(width) && width >= 1 && width <= 8)) throw new RangeError(`KeyCensus: width ${String(width)} is not 1 … 8`);
    let slots = 16;
    while (slots < capacity * 2) slots *= 2;
    this.width = width;
    this.hashes = new Uint32Array((slots >>> 1) * width);
    this.srcStart = new Int32Array(slots >>> 1);
    this.srcLen = new Int32Array(slots >>> 1);
    this.sources = new Uint32Array((slots >>> 1) * 8);
    this.slots = new Int32Array(slots).fill(-1);
  }

  /** The distinct hashes recorded. */
  get size(): number {
    return this.count;
  }

  /** The adds whose hash and source were both seen before. */
  get reused(): number {
    return this.reuses;
  }

  /** The adds whose hash was seen before with a different source. */
  get collisions(): number {
    return this.collisionCount;
  }

  /** The first collision, if any. */
  get firstCollision(): CensusCollision | undefined {
    return this.first;
  }

  /** Records `hash` (exactly `width` u32 words) made from `source` (any number of u32 words). */
  add(hash: ArrayLike<number>, source: ArrayLike<number>): CensusResult {
    const w = this.width;
    if (hash.length !== w) throw new RangeError(`KeyCensus.add: a hash of ${String(hash.length)} words, the census holds ${String(w)}`);
    for (let i = 0; i < hash.length; i += 1) u32At(hash, i);
    for (let i = 0; i < source.length; i += 1) u32At(source, i);
    const mask = this.slots.length - 1;
    let s = slotHash(hash, 0, w) & mask;
    for (;;) {
      const at = this.slots[s];
      if (at < 0) break;
      if (this.sameHash(at, hash)) {
        if (this.sameSource(at, source)) {
          this.reuses += 1;
          return 'reused';
        }
        this.collisionCount += 1;
        if (this.first === undefined) this.first = { hash: Array.from(hash), first: this.sourceOf(at), second: Array.from(source) };
        return 'collision';
      }
      s = (s + 1) & mask;
    }
    this.store(hash, source);
    this.slots[s] = this.count - 1;
    if (this.count * 2 > this.slots.length) this.grow();
    return 'new';
  }

  private sameHash(at: number, hash: ArrayLike<number>): boolean {
    const w = this.width;
    for (let i = 0; i < w; i += 1) if (this.hashes[at * w + i] !== hash[i]) return false;
    return true;
  }

  private sameSource(at: number, source: ArrayLike<number>): boolean {
    const n = this.srcLen[at];
    if (n !== source.length) return false;
    const base = this.srcStart[at];
    for (let i = 0; i < n; i += 1) if (this.sources[base + i] !== source[i]) return false;
    return true;
  }

  private sourceOf(at: number): number[] {
    return Array.from(this.sources.subarray(this.srcStart[at], this.srcStart[at] + this.srcLen[at]));
  }

  private store(hash: ArrayLike<number>, source: ArrayLike<number>): void {
    const w = this.width;
    const at = this.count;
    if ((at + 1) * w > this.hashes.length) {
      const bigger = new Uint32Array(this.hashes.length * 2);
      bigger.set(this.hashes);
      this.hashes = bigger;
      const starts = new Int32Array(this.srcStart.length * 2);
      starts.set(this.srcStart);
      this.srcStart = starts;
      const lens = new Int32Array(this.srcLen.length * 2);
      lens.set(this.srcLen);
      this.srcLen = lens;
    }
    if (this.srcUsed + source.length > this.sources.length) {
      let size = this.sources.length * 2;
      while (this.srcUsed + source.length > size) size *= 2;
      const bigger = new Uint32Array(size);
      bigger.set(this.sources);
      this.sources = bigger;
    }
    for (let i = 0; i < w; i += 1) this.hashes[at * w + i] = hash[i];
    this.srcStart[at] = this.srcUsed;
    this.srcLen[at] = source.length;
    for (let i = 0; i < source.length; i += 1) this.sources[this.srcUsed + i] = source[i];
    this.srcUsed += source.length;
    this.count += 1;
  }

  private grow(): void {
    const w = this.width;
    const slots = new Int32Array(this.slots.length * 2).fill(-1);
    const mask = slots.length - 1;
    for (let at = 0; at < this.count; at += 1) {
      let s = slotHash(this.hashes, at * w, w) & mask;
      while (slots[s] >= 0) s = (s + 1) & mask;
      slots[s] = at;
    }
    this.slots = slots;
  }
}
