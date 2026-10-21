// The mint (item M0-d-05a; §6.3 *Never reused; one collision rule*, §6.1's entity key, C-0147).
//
// Minting runs after the succession matching (M0-d-05b): it gives every fresh entity of a batch its lineage hash and,
// unless succession handed it a predecessor's address (a retired entity's, already among the taken addresses), its
// address.
//   * A fresh lineage key whose hash equals a survivor's — a live entity outside the batch's re-derived set — or one
//     this batch has already minted takes the smallest free `dup` (1, 2, …), so no two live entities share draws; the
//     entities the batch itself replaces (`retired`) are not collisions, so a faithful Regenerate re-mints their keys.
//   * A fresh entity whose natural address equals a live address, a tombstone, an address its own batch retires or one
//     this batch has already given takes the suffix `~k` with the smallest free k.
//   * Both are resolved in the batch's canonical order — records sorted by their fresh lineage hash (ties, a 64-bit
//     collision, by the key's lanes) — never by arrival order, so the session and a replay resolve them identically.
// The entity key (§6.1) is computed here once per minted entity and cached beside the lineage hash it mints (C-0147):
// `Minted.entityKey`, derived, never persisted — `Minted.identity` (the persisted Identity) does not hold it.
//
// Every input is checked before anything is minted (C-0179 (4), C-0184): every record's kind by the kind rule, whether
// or not it is handed an address; a handed-on address of another kind or another arena (§6.3 *EntityKind*: the address's
// `kind:` prefix spells Identity.kind; §2.1 *Ids*: its prefix names its arena — the layer always, the part off the
// ground layer) is refused; a live entry's lineage must be two u32 lanes — a signed form of a survivor's hash would
// slip past the dup rule — and every id a string; the seed key four u32 lanes even when the batch is empty.
//
// Staged (C-0179 (5)): an address an `undo` withdraws being free again for the same derivation only is the edit log's
// (M2a); JOIN / SPLIT lineage continuation is M2a / M3a's; succession and carry-over are M0-d-05b's; the archive and
// its tombstone store are M1's — `mint` reads the tombstones it is handed.
import { entityKey, type Hash128, type LineageHash } from '@plat/kernel';
import type { EntityKind, Id, Identity, Tombstone } from '../types/index.js';
import { addressOf, checkKind, parseAddress, tokenOf, userAddressOf } from './address.js';
import {
  compareLineage,
  GROUND,
  isObject,
  isU16,
  isU32,
  LINEAGE_LANES,
  lineageHash,
  lineageLanes,
  TOWN_ROOT,
  type LineageKey,
} from './lineage.js';

/** One fresh entity of a batch, before minting. */
export interface BatchRecord {
  readonly kind: EntityKind;
  /** Its fresh lineage key, without `dup` (the mint sets it). */
  readonly key: LineageKey;
  /** Its containment parent: a field, never parsed from an id. */
  readonly parent?: Id;
  /** Its own reroll count as a derivation unit (Identity.reroll); 0 when absent. */
  readonly reroll?: number;
  /** A user-created entity: the creating event's `seq` and its ordinal, which give its token. */
  readonly origin?: { readonly seq: number; readonly ordinal: number };
  /** The address succession handed it — its predecessor's, an entity this batch re-derives (a retired live entry). */
  readonly address?: Id;
}

/** A live entity as the mint reads it: its address and lineage; `retired` when this batch re-derives it. */
export interface LiveEntry {
  readonly id: Id;
  readonly lineage: Readonly<LineageHash>;
  /** In the batch's re-derived set: its address is retired by the batch, its lineage no collision. */
  readonly retired?: boolean;
}

/** A minted entity: its persisted identity, its full lineage key and the derived entity key cached beside it. */
export interface Minted {
  /** The persisted part (§2.8): id, kind, parent, arena key, lineage, reroll. No entity key. */
  readonly identity: Identity;
  /** The lineage key the lineage hash is of (with `dup` when one was taken). */
  readonly key: LineageKey;
  /** §6.1's entity key: entityKey(seedKey, identity.lineage, identity.key) — derived, never persisted (C-0147). */
  readonly entityKey: Readonly<Hash128>;
  /** The natural address before any suffix (the handed-on address for a successor). */
  readonly natural: Id;
  /** The `~k` taken, 0 when none. */
  readonly suffix: number;
  /** The `dup` taken, 0 when none. */
  readonly dup: number;
}

type Item = { readonly at: number; readonly rec: BatchRecord; readonly hash: LineageHash; readonly lanes: Uint32Array };

/** An exact set of 64-bit lineage hashes, bucketed by word 0. */
class HashSet {
  private readonly map = new Map<number, number[]>();
  has(h: Readonly<LineageHash>): boolean {
    const highs = this.map.get(h[0]);
    return highs !== undefined && highs.includes(h[1]);
  }
  add(h: Readonly<LineageHash>): void {
    const highs = this.map.get(h[0]);
    if (highs === undefined) this.map.set(h[0], [h[1]]);
    else if (!highs.includes(h[1])) highs.push(h[1]);
  }
}

/**
 * The key's ten lanes in order: the canonical order's tie-break for two keys whose lineage hashes are equal (a 64-bit
 * collision), and the test for two records carrying one key (equal lanes, refused); `compareLineage` is the order
 * itself (C-0179 (4)).
 */
function compareLanes(a: Uint32Array, b: Uint32Array): number {
  for (let i = 0; i < LINEAGE_LANES; i += 1) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
}

function canonical(a: Item, b: Item): number {
  const c = compareLineage(a.hash, b.hash);
  return c !== 0 ? c : compareLanes(a.lanes, b.lanes);
}

/** Four u32 lanes, checked before the batch is read (so an empty batch refuses a malformed seed key too). */
function checkSeedKey(seedKey: Readonly<Hash128>): void {
  if (!isObject(seedKey) || seedKey.length !== 4 || !isU32(seedKey[0]) || !isU32(seedKey[1]) || !isU32(seedKey[2]) || !isU32(seedKey[3])) {
    throw new RangeError(`mint: the seed key is not four u32 lanes: ${String(seedKey)}`);
  }
}

/** A live entry: a string id, a lineage of two u32 lanes (a signed lane is refused, never read as its u32), retired a boolean. */
function checkLive(e: LiveEntry): void {
  if (!isObject(e)) throw new RangeError(`mint: a live entry is not an object: ${String(e)}`);
  if (typeof e.id !== 'string') throw new RangeError(`mint: a live entry's id is not a string: ${String(e.id)}`);
  const l = e.lineage;
  if (!isObject(l) || l.length !== 2 || !isU32(l[0]) || !isU32(l[1])) {
    throw new RangeError(`mint: the live entry ${e.id}'s lineage is not two u32 lanes: ${String(l)}`);
  }
  if (e.retired !== undefined && typeof e.retired !== 'boolean') throw new RangeError(`mint: the live entry ${e.id}'s retired flag is not a boolean: ${String(e.retired)}`);
}

/** A batch record's own fields: its kind by the kind rule (handed an address or not), parent, reroll, origin, address. */
function checkRecord(rec: BatchRecord): void {
  if (!isObject(rec)) throw new RangeError(`mint: a batch record is not an object: ${String(rec)}`);
  checkKind(rec.kind);
  if (!isObject(rec.key)) throw new RangeError(`mint: a batch record's lineage key is not an object: ${String(rec.key)}`);
  if (rec.parent !== undefined) parseAddress(rec.parent); // an address id (§2.8 Identity.parent): refused when not one
  const reroll = rec.reroll ?? 0;
  if (!isU16(reroll)) throw new RangeError(`mint: reroll is not a u16: ${String(reroll)}`);
  const o = rec.origin;
  if (o !== undefined && (!isObject(o) || !isU32(o.seq) || !isU32(o.ordinal))) throw new RangeError(`mint: the origin is not (u32 seq, u32 ordinal): ${String(o)}`);
}

/**
 * A handed-on address names the record's kind and arena (§6.3 *EntityKind*: an address's `kind:` prefix spells
 * Identity.kind; §2.1 *Ids*: the prefix names the arena — the layer always, the part off the ground layer, every ground
 * part bare). Refuses (RangeError) a string that is not an address, another kind or another arena.
 */
function checkHandedOn(rec: BatchRecord, address: Id): void {
  const p = parseAddress(address);
  if (p.kind !== rec.kind) throw new RangeError(`mint: the handed-on address ${address} is of kind ${p.kind}, the record's kind is ${rec.kind}`);
  const arena = rec.key.arena;
  if (p.layer !== arena.layer || (p.layer !== 'ground' && p.part !== arena.part)) {
    throw new RangeError(`mint: the handed-on address ${address} does not name the record's arena (${String(arena.layer)} part ${String(arena.part)})`);
  }
}

function identityOf(rec: BatchRecord, id: Id, lineage: LineageHash, key: LineageKey): Identity {
  const reroll = rec.reroll ?? 0;
  const arena = Object.freeze({ layer: key.arena.layer, part: key.arena.part });
  const identity: Identity =
    rec.parent === undefined
      ? { id, kind: rec.kind, key: arena, lineage, reroll }
      : { id, kind: rec.kind, parent: rec.parent, key: arena, lineage, reroll };
  return Object.freeze(identity);
}

/**
 * §6.3's mint over one batch: returns one `Minted` per batch record, in the records' order. `live` is every live entity
 * (its `retired` flag marking the batch's re-derived set), `tombstones` the archive's; `seedKey` the derivation's seed
 * key (§6.1), from which each entity key is computed once and cached (C-0147). Refuses (RangeError) a fresh key that
 * already carries `dup`, two records with one lineage key, a handed-on address that is no retired live entry's (a
 * survivor's, or nobody's), is handed to two records, or is of another kind or another arena than its record's, and
 * any malformed field — a kind outside the kind rule, a live lineage that is not two u32 lanes, an id that is not a
 * string, a seed key that is not four u32 lanes (C-0184).
 */
export function mint(
  batchRecords: readonly BatchRecord[],
  live: Iterable<LiveEntry>,
  tombstones: Iterable<Pick<Tombstone, 'id'>>,
  seedKey: Readonly<Hash128>,
): Minted[] {
  checkSeedKey(seedKey);
  const takenIds = new Set<Id>();
  const retiredIds = new Set<Id>();
  const takenLineage = new HashSet();
  for (const e of live) {
    checkLive(e);
    takenIds.add(e.id);
    if (e.retired === true) retiredIds.add(e.id);
    else takenLineage.add(e.lineage);
  }
  for (const t of tombstones) {
    if (!isObject(t) || typeof t.id !== 'string') throw new RangeError(`mint: a tombstone's id is not a string: ${String(isObject(t) ? t.id : t)}`);
    takenIds.add(t.id);
  }

  const items: Item[] = [];
  const handed = new Set<Id>();
  for (let at = 0; at < batchRecords.length; at += 1) {
    const rec = batchRecords[at];
    checkRecord(rec);
    if (rec.key.dup !== undefined) throw new RangeError(`mint: a fresh lineage key carries dup ${String(rec.key.dup)} (the mint sets it)`);
    const lanes = lineageLanes(rec.key); // checks every field of the key, its arena among them
    if (rec.address !== undefined) {
      checkHandedOn(rec, rec.address);
      // Succession hands on the address of an entity the batch re-derives: a retired live entry's, never a survivor's.
      if (!retiredIds.has(rec.address)) throw new RangeError(`mint: the handed-on address ${rec.address} is no retired entity's`);
      if (handed.has(rec.address)) throw new RangeError(`mint: the address ${rec.address} is handed to two records`);
      handed.add(rec.address);
    }
    items.push({ at, rec, hash: lineageHash(rec.key), lanes });
  }
  items.sort(canonical);
  for (let i = 1; i < items.length; i += 1) {
    if (compareLanes(items[i - 1].lanes, items[i].lanes) === 0) {
      throw new RangeError(`mint: two records of the batch carry one lineage key (creation index ${String(items[i].rec.key.index)})`);
    }
  }

  const out = new Array<Minted>(batchRecords.length);
  for (const item of items) {
    const rec = item.rec;
    // The lineage: the smallest free dup against the survivors and the lineages already minted.
    let key: LineageKey = rec.key;
    let lineage = item.hash;
    let dup = 0;
    while (takenLineage.has(lineage)) {
      dup += 1;
      key = { ...rec.key, dup };
      lineage = lineageHash(key);
    }
    takenLineage.add(lineage);
    // The address: handed on by succession, or natural with the smallest free suffix.
    let natural: Id;
    let id: Id;
    let suffix = 0;
    if (rec.address !== undefined) {
      natural = rec.address;
      id = rec.address;
    } else {
      natural =
        rec.origin === undefined
          ? addressOf(rec.kind, lineage, rec.key.arena)
          : userAddressOf(rec.kind, rec.origin.seq, rec.origin.ordinal, rec.key.arena);
      id = natural;
      while (takenIds.has(id)) {
        suffix += 1;
        id = `${natural}~${String(suffix)}`;
      }
      takenIds.add(id);
    }
    const frozenKey = Object.freeze({ ...key });
    const identity = identityOf(rec, id, lineage, frozenKey);
    out[item.at] = Object.freeze({
      identity,
      key: frozenKey,
      entityKey: Object.freeze(entityKey(seedKey, lineage, identity.key)) as Readonly<Hash128>,
      natural,
      suffix,
      dup,
    });
  }
  return out;
}

/** The town root's address kind (§6.3's EntityKind 'town'). */
export const TOWN_KIND = 'town';

/**
 * The town root minted: §6.1's fixed town lineage (TOWN_ROOT) on ground part 0, its address `town:<token>`, its entity
 * key entityKey(seedKey, its lineage, ground part 0) computed once and cached the same way (C-0147).
 */
export function mintTownRoot(seedKey: Readonly<Hash128>): Minted {
  checkSeedKey(seedKey);
  const lineage = lineageHash(TOWN_ROOT);
  const id = `${TOWN_KIND}:${tokenOf(lineage)}`;
  const identity: Identity = Object.freeze({ id, kind: TOWN_KIND, key: GROUND, lineage, reroll: 0 });
  return Object.freeze({
    identity,
    key: TOWN_ROOT,
    entityKey: Object.freeze(entityKey(seedKey, lineage, GROUND)) as Readonly<Hash128>,
    natural: id,
    suffix: 0,
    dup: 0,
  });
}
