// Rng — the one stream mixer every reader uses (item M0-d-01; §14 `interface Rng`, §6.1 "A stream is created once per
// derivation and continued; a second request in the same derivation returns the same stream"). One Rng is one
// derivation: the runner gives each stage run (and each scope it derives) its own Rng, and `StageContext.stream` is
// `rng.stream` with the calling stage's id and the entity's cached key (§14; M0-x-02); paint programs and furniture
// pass STAGE_VIEW. The façade (M0-a-16) wires this Rng — it declares no other. No string reaches the mixer: the key is
// keyed and cached by its words, the concern is a ConcernId (a lint-visible brand; test/rng/no-string.test.ts).
import type { Hash128 } from '../hash/index.js';
import type { ConcernId, StageId, StreamOpts } from '../types/index.js';
import type { KeyCensus } from './census.js';
import { mixInto, packInto } from './mixer.js';
import { Stream } from './stream.js';

/** §14: `interface Rng { stream(entityKey: Hash128, stage: number, concern: ConcernId, opts: StreamOpts): Stream }`. */
export interface Rng {
  /**
   * The stream of (entity key, stage, concern, reroll, attempt, epoch, salt): created on the first request in this
   * derivation and returned, continued, on every later one.
   */
  stream(entityKey: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts): Stream;
  /** The number of distinct streams this derivation has created: a read-only diagnostic beside §14's one member (C-0147 (2)). */
  readonly streams: number;
}

/** Options of one derivation's Rng. */
export interface RngOptions {
  /**
   * The distinctness harness (§6.1): every stream the derivation creates is recorded with its source — the entity
   * key's four words and the four packed component words — so a collision across all the derivations sharing the census
   * fails the spike's test (M0-d-09).
   */
  readonly census?: KeyCensus;
}

class DerivationRng implements Rng {
  /** The derivation's streams by 30 bits of their key's word 0; a bucket holds every stream sharing them. */
  private readonly byWord0 = new Map<number, Stream | Stream[]>();
  private count = 0;
  private readonly census: KeyCensus | undefined;
  private readonly packed = new Uint32Array(4);
  private readonly key = new Uint32Array(4);
  private readonly source = new Uint32Array(8);

  constructor(options: RngOptions) {
    this.census = options.census;
  }

  get streams(): number {
    return this.count;
  }

  stream(entityKey: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts): Stream {
    const packed = this.packed;
    const key = this.key;
    packInto(packed, stage, concern, opts);
    mixInto(key, entityKey, packed);
    const k0 = key[0] & 0x3fffffff; // the bucket: 30 bits of word 0, a small integer for the Map
    const found = this.byWord0.get(k0);
    if (found !== undefined) {
      if (found instanceof Stream) {
        if (sameKey(found, key)) return found;
      } else {
        for (const s of found) if (sameKey(s, key)) return s;
      }
    }
    const made = new Stream(key);
    if (found === undefined) this.byWord0.set(k0, made);
    else if (found instanceof Stream) this.byWord0.set(k0, [found, made]);
    else found.push(made);
    this.count += 1;
    if (this.census !== undefined) {
      const src = this.source;
      for (let i = 0; i < 4; i += 1) {
        src[i] = entityKey[i];
        src[4 + i] = packed[i];
      }
      this.census.add(key, src);
    }
    return made;
  }
}

function sameKey(s: Stream, key: Uint32Array): boolean {
  const k = s.key;
  return k[0] === key[0] && k[1] === key[1] && k[2] === key[2] && k[3] === key[3];
}

/** A new derivation's Rng (§14): its streams are created on first request and continued after. */
export function createRng(options: RngOptions = {}): Rng {
  return new DerivationRng(options);
}
