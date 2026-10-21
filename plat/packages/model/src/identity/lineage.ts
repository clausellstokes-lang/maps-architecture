// The lineage key and its 64-bit lineage hash (item M0-d-05a; §6.3 *Lineage key*, §6.1, §2.8 `Identity.lineage`).
//
//   lineage key   (arena key — layer and part, §2.2 —, the derivation unit's lineage hash, stage, creation epoch,
//                 creation index, the derivation unit's reroll[, dup])
//   lineage hash  H128 over the key's ten u32 lanes (M0-d-02's LaneWriter, C-0132), truncated to its low 64 bits
//                 (words 0 and 1, `digest64`) — the Hash64 every Identity persists
//
// The lanes are fixed in number and order (C-0179 (1)): layer code, part, unit flag, unit word 0, unit word 1, stage,
// epoch, index, reroll, dup — so two different keys never share a lane stream (the encoder guard of §6.1's
// distinctness test). A key with no derivation unit (the town root) writes flag 0 and zero words; dup absent writes 0
// and a present dup is 1 … 2³² − 1, so each key has exactly one lane form. Integers only; every refusal is a
// RangeError naming the field, nothing is coerced.
//
// `isU32`, `isU16`, `isObject` and `copyLineage` are file-level exports the identity, matching and digest modules
// share, imported by path; they are not part of the package's API (the folder index does not export them).
import { LaneWriter, layerCode, STAGES, type Hash128, type LineageHash, type PlatKey, type StageId } from '@plat/kernel';

/**
 * §6.3's lineage key: what keys an entity's random streams. `unit` is the derivation unit's lineage hash (null only for
 * the town root, which has no parent); `stage` the u16 stage id of the run that created the entity; `epoch` the u32
 * creation epoch; `index` the u32 creation index in the unit's run; `reroll` the derivation unit's u16 reroll; `dup`
 * the collision component `mint` alone sets (absent on every fresh key).
 */
export interface LineageKey {
  readonly arena: Readonly<PlatKey>;
  readonly unit: Readonly<LineageHash> | null;
  readonly stage: StageId;
  readonly epoch: number;
  readonly index: number;
  readonly reroll: number;
  readonly dup?: number;
}

/** The number of u32 lanes a lineage key writes. */
export const LINEAGE_LANES = 10;

/** A u32: a number that is an integer in 0 … 2³² − 1 (NaN, a fraction, a negative, 2³² or a non-number fails). */
export function isU32(v: unknown): v is number {
  return typeof v === 'number' && (v >>> 0) === v;
}

/** A u16: a number that is an integer in 0 … 0xffff (a fraction, a negative, 0x10000 or a non-number fails). */
export function isU16(v: unknown): v is number {
  return typeof v === 'number' && (v & 0xffff) === v;
}

/** A non-null object (an array included). */
export function isObject(v: unknown): v is object {
  return typeof v === 'object' && v !== null;
}

function refuse(field: string, v: unknown): never {
  throw new RangeError(`lineage key: ${field} is not valid: ${String(v)}`);
}

/** Writes the key's ten lanes into `out` (from 0), checking every field. */
export function lineageLanesInto(key: LineageKey, out: Uint32Array | number[]): void {
  const arena = key.arena;
  if (arena === null || typeof arena !== 'object') refuse('arena', arena);
  const layer = layerCode(arena.layer);
  if (!isU32(arena.part)) refuse('arena.part', arena.part);
  const unit = key.unit;
  let flag = 0;
  let u0 = 0;
  let u1 = 0;
  if (unit !== null) {
    if (unit === undefined || unit.length !== 2 || !isU32(unit[0]) || !isU32(unit[1])) refuse('unit', unit);
    flag = 1;
    u0 = unit[0];
    u1 = unit[1];
  }
  if (!isU16(key.stage)) refuse('stage', key.stage);
  if (!isU32(key.epoch)) refuse('epoch', key.epoch);
  if (!isU32(key.index)) refuse('index', key.index);
  if (!isU16(key.reroll)) refuse('reroll', key.reroll);
  const dup = key.dup;
  if (dup !== undefined && !(isU32(dup) && dup !== 0)) refuse('dup', dup);
  out[0] = layer;
  out[1] = arena.part;
  out[2] = flag;
  out[3] = u0;
  out[4] = u1;
  out[5] = key.stage;
  out[6] = key.epoch;
  out[7] = key.index;
  out[8] = key.reroll;
  out[9] = dup ?? 0;
}

/** The key's ten u32 lanes (the source a distinctness census records beside the hash). */
export function lineageLanes(key: LineageKey): Uint32Array {
  const out = new Uint32Array(LINEAGE_LANES);
  lineageLanesInto(key, out);
  return out;
}

const WRITER = new LaneWriter();
const LANES = new Uint32Array(LINEAGE_LANES);

/** §6.3's `lineageHash`: the key's 64-bit hash — words 0 and 1 of H128 over its lanes (C-0132 (4)). */
export function lineageHash(key: LineageKey): LineageHash {
  lineageLanesInto(key, LANES);
  WRITER.reset();
  for (let i = 0; i < LINEAGE_LANES; i += 1) WRITER.u32(LANES[i]);
  return WRITER.digest64();
}

/** Orders two lineage hashes as unsigned 64-bit numbers (word 1 the high word): the batch's canonical order (§6.3). */
export function compareLineage(a: Readonly<LineageHash>, b: Readonly<LineageHash>): number {
  if (a[1] !== b[1]) return a[1] < b[1] ? -1 : 1;
  if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
  return 0;
}

/** Whether two lineage hashes are equal. */
export function sameLineage(a: Readonly<LineageHash>, b: Readonly<LineageHash>): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

/** A new frozen two-lane copy of a lineage hash (the same two numbers; never the input itself). */
export function copyLineage(h: Readonly<LineageHash>): Readonly<LineageHash> {
  return Object.freeze([h[0], h[1]]) as unknown as Readonly<LineageHash>;
}

/** The ground part 0 (§2.1): the town root's arena. */
export const GROUND: Readonly<PlatKey> = Object.freeze({ layer: 'ground', part: 0 });

/**
 * §6.1's town lineage: the town root's lineage key — ground arena, no parent, creation epoch 0, creation index 0 (§6.1;
 * the standalone neighbourhood document's index 1 is V01's, staged with it, C-0179 (5)). Its stage lane is S0's id
 * and its reroll 0 (C-0179 (6)): no stage run and no unit creates it, and its flag lane 0 keeps it apart from every
 * key with a unit.
 */
export const TOWN_ROOT: LineageKey = Object.freeze({
  arena: GROUND,
  unit: null,
  stage: STAGES.S0,
  epoch: 0,
  index: 0,
  reroll: 0,
});

/** An entity key (§6.1): 128 bits, derived from the seed key, the lineage hash and the arena key; never persisted. */
export type EntityKey = Hash128;
