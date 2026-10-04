// The keys and the one structured mixer (item M0-d-01; §6.1 "Keys are mixed from structured components, never from
// strings", §14 `Rng.stream`; C-0143). Integer arithmetic only — XOR, additions modulo 2³² and MurmurHash3's 32-bit
// finaliser fmix32 (Math.imul and shifts; M0-d-02) — and no string anywhere on this path: this file holds no string
// literal or template, and a refusal names its value through ./text.js, off the generation path (the lint test
// test/rng/no-string.test.ts holds it).
//
//   seed key     four 32-bit-lane finalisers with distinct salts over the seed: lane i = fmix32(seed ^ SALT_i)
//   entity key   the seed key mixed with the entity's lineage hash and arena key (layer, part): one finaliser round
//                over seedKey ⊕ (lineage₀, lineage₁, layer code, part). This file is the pure function only; §6.1's
//                "computed once when the entity is minted and cached … beside the lineage hash" is M0-d-05a's `mint`,
//                which calls entityKey() once per minted entity and caches the key, derived and never persisted,
//                beside the lineage hash it mints (C-0147)
//   stream key   one finaliser round over entityKey ⊕ the packed components (stage u16, concern u16, reroll u16,
//                attempt u8, epoch u32, salt u16 — 104 bits in four 32-bit words); its four words seed the stream
//
// The finaliser round is MurmurHash3 x86-128's finalisation mix (§17.1 (8)): the lanes summed into the first and the
// first added back into the others, fmix32 on every lane, then the sums again. Every step is invertible, so the round is
// a bijection on 128 bits: for one entity key, distinct components give distinct stream keys, and for one seed key,
// distinct (lineage, arena) give distinct entity keys — the encoder guard of §6.1's distinctness test.
import { fmix32, type Hash128, type LineageHash } from '../hash/index.js';
import { attemptCap, isStreamStage } from '../registry/index.js';
import type { ConcernId, PlatKey, Seed, StageId, StreamOpts } from '../types/index.js';
import { layerCode } from './layer.js';
import {
  R_ARENA_PART,
  R_ATTEMPT,
  R_CONCERN,
  R_ENTITY_KEY,
  R_EPOCH,
  R_LANE_WORD,
  R_LANE_WORDS,
  R_LINEAGE,
  R_REROLL,
  R_SALT,
  R_SEED,
  R_SEED_KEY,
  R_STAGE,
  refuse,
} from './text.js';

/**
 * The seed key's four lane salts (C-0143): the first four of SHA-256's round constants (FIPS 180-4 §4.2.2, the
 * fractional parts of the cube roots of 2, 3, 5 and 7) — distinct, dense, published.
 */
export const SEED_SALTS: Readonly<Hash128> = Object.freeze([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5]) as Readonly<Hash128>;

const SALT0 = 0x428a2f98;
const SALT1 = 0x71374491;
const SALT2 = 0xb5c0fbcf;
const SALT3 = 0xe9b5dba5;

// Strict equality keeps every non-number out: a string, a boolean or an object never equals the number its coercion
// gives, and a bigint throws on the shift.
function isU32(v: number): boolean {
  return (v >>> 0) === v;
}

function isU16(v: number): boolean {
  return (v & 0xffff) === v;
}

function checkKey(key: ArrayLike<number>, words: number, code: number): void {
  if (key.length !== words) refuse(code, key);
  for (let i = 0; i < words; i += 1) if (!isU32(key[i])) refuse(code, key);
}

/** The finaliser round (MurmurHash3 x86-128's finalisation mix) over four 32-bit words, written into `out`. */
function finaliseInto(out: Hash128 | Uint32Array, a0: number, a1: number, a2: number, a3: number): void {
  let h1 = a0 | 0;
  let h2 = a1 | 0;
  let h3 = a2 | 0;
  let h4 = a3 | 0;
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
  out[0] = h1 >>> 0;
  out[1] = h2 >>> 0;
  out[2] = h3 >>> 0;
  out[3] = h4 >>> 0;
}

/**
 * The four 32-bit-lane finalisers over a list of u32 words (§6.1: the seed key's construction, which §6.1's
 * `render.stampTiles` and `view.weather` rows reuse "as for the seed key" over their own words): lane i starts at its
 * salt and takes h ← fmix32(h ^ w) for each word in order. One word gives the seed key.
 */
export function laneKey(words: ArrayLike<number>): Hash128 {
  if (words.length < 1) refuse(R_LANE_WORDS, words.length);
  let h0 = SALT0;
  let h1 = SALT1;
  let h2 = SALT2;
  let h3 = SALT3;
  for (let i = 0; i < words.length; i += 1) {
    const w = words[i];
    if (!isU32(w)) refuse(R_LANE_WORD, w);
    h0 = fmix32(h0 ^ w);
    h1 = fmix32(h1 ^ w);
    h2 = fmix32(h2 ^ w);
    h3 = fmix32(h3 ^ w);
  }
  return [h0, h1, h2, h3];
}

/** The seed key (§6.1): derived once from the seed (a u32, §2.9) by four lane finalisers with distinct salts. */
export function seedKey(seed: Seed): Hash128 {
  if (!isU32(seed)) refuse(R_SEED, seed);
  return [fmix32(SALT0 ^ seed), fmix32(SALT1 ^ seed), fmix32(SALT2 ^ seed), fmix32(SALT3 ^ seed)];
}

/**
 * An entity's entity key (§6.1): the mix of the seed key, its lineage hash (§6.3) and its arena key (layer and part,
 * §2.2) — one finaliser round over seedKey ⊕ (lineage₀, lineage₁, layer code, part). Computed once when the entity is
 * minted and cached beside its lineage hash by M0-d-05a's `mint` (C-0147), never here; the town root's is this function
 * over the fixed town lineage (§6.1).
 */
export function entityKey(seed: Readonly<Hash128>, lineage: Readonly<LineageHash>, arenaKey: PlatKey): Hash128 {
  checkKey(seed, 4, R_SEED_KEY);
  checkKey(lineage, 2, R_LINEAGE);
  const layer = layerCode(arenaKey.layer);
  const part = arenaKey.part;
  if (!isU32(part)) refuse(R_ARENA_PART, part);
  const out: Hash128 = [0, 0, 0, 0];
  finaliseInto(out, seed[0] ^ lineage[0], seed[1] ^ lineage[1], seed[2] ^ layer, seed[3] ^ part);
  return out;
}

/**
 * Packs and checks the components into `out` (four words): stage ≪ 16 | concern, reroll ≪ 16 | salt, epoch, attempt.
 * Refuses a stage that is neither registered nor STAGE_VIEW, a concern no row holds or a retired one (T41-1), and an
 * attempt past the concern's cap; every field must be an integer of its width.
 */
export function packInto(out: Hash128 | Uint32Array, stage: StageId, concern: ConcernId, opts: StreamOpts): void {
  if (!isU16(stage) || !isStreamStage(stage)) refuse(R_STAGE, stage);
  const cap = isU16(concern) ? attemptCap(concern) : -1;
  if (cap < 0) refuse(R_CONCERN, concern);
  const { reroll, attempt, epoch, salt } = opts;
  if (!isU16(reroll)) refuse(R_REROLL, reroll);
  if (!(isU16(attempt) && attempt <= cap)) refuse(R_ATTEMPT, attempt);
  if (!isU32(epoch)) refuse(R_EPOCH, epoch);
  if (!isU16(salt)) refuse(R_SALT, salt);
  out[0] = ((stage << 16) | concern) >>> 0;
  out[1] = ((reroll << 16) | salt) >>> 0;
  out[2] = epoch;
  out[3] = attempt;
}

/** The packed components of a stream key (§6.1's 104 bits in four words), checked as `packInto` checks them. */
export function packComponents(stage: StageId, concern: ConcernId, opts: StreamOpts): Hash128 {
  const out: Hash128 = [0, 0, 0, 0];
  packInto(out, stage, concern, opts);
  return out;
}

/** The finaliser round over entityKey ⊕ packed, into `out`; the entity key is checked. */
export function mixInto(out: Hash128 | Uint32Array, key: Readonly<Hash128>, packed: ArrayLike<number>): void {
  checkKey(key, 4, R_ENTITY_KEY);
  finaliseInto(out, key[0] ^ packed[0], key[1] ^ packed[1], key[2] ^ packed[2], key[3] ^ packed[3]);
}

/**
 * The one structured mixer (§6.1, §14 `Rng.stream`): the stream key of (entity key, stage, concern, reroll, attempt,
 * epoch, salt) — one finaliser round over the entity key combined with the packed components. Its four words seed the
 * stream. `Rng.stream` calls this path and keeps the derivation's streams; this function alone is what §6.1's
 * ≤ 0.1 µs budget times.
 */
export function streamKey(key: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts): Hash128 {
  const packed: Hash128 = [0, 0, 0, 0];
  packInto(packed, stage, concern, opts);
  const out: Hash128 = [0, 0, 0, 0];
  mixInto(out, key, packed);
  return out;
}
