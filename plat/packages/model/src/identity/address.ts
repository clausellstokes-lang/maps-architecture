// Address ids (item M0-d-05a; §6.3 *Address id*, §2.1 *Ids*): `kind:token`, prefixed `<layer><part>/` outside the
// ground layer. The token of a generated entity is the base-32 form of its lineage hash at creation (13 characters);
// a user-created entity's is the base-32 form of the hash of its creating event's `seq` and its ordinal. The address
// is opaque: `parseAddress` reads the kind and the arena prefix only, never a parent (J-DET-1) — the parent is the
// `Identity.parent` field.
//
// Choices (C-0179 (2), (3)): the alphabet is Crockford's base 32 in lower case (no i, l, o, u); the 64-bit hash is
// written most significant first, word 1 the high word — the first character carries the top 4 bits, the other twelve
// 5 bits each. The prefixes: the underground's part 0 `under/`, its part n ≥ 1 `under<n>/`, a sky part n `sky<n>/`
// (every n, 0 included), every ground part bare (a raised way's part is read from Identity.key, §2.1). A collision
// suffix `~k` (§6.3, `mint`) ends the address.
import { LaneWriter, type Layer, type LineageHash, type PlatKey } from '@plat/kernel';
import type { Id } from '../types/index.js';
import { GROUND } from './lineage.js';

/** Crockford's base-32 alphabet, lower case. */
export const TOKEN_ALPHABET = '0123456789abcdefghjkmnpqrstvwxyz';

/** The characters of a token (64 bits at 5 bits a character, rounded up). */
export const TOKEN_LENGTH = 13;

const isU32 = (v: number): boolean => (v >>> 0) === v;

const KIND = /^[A-Za-z][A-Za-z0-9._-]*$/;

/** The base-32 token of a 64-bit hash (13 characters, most significant first). */
export function tokenOf(hash: Readonly<LineageHash>): string {
  const lo = hash[0];
  const hi = hash[1];
  if (hash.length !== 2 || !isU32(lo) || !isU32(hi)) throw new RangeError(`token: not a 64-bit hash of two u32 lanes: ${String(hash)}`);
  // The first character: the top 4 bits; then 60 bits, (hi & 0x0fffffff) : lo, in 5-bit groups from bit 55 down.
  let s = TOKEN_ALPHABET[hi >>> 28];
  const top = hi & 0x0fffffff;
  for (let p = 55; p >= 0; p -= 5) {
    let v: number;
    if (p >= 32) v = (top >>> (p - 32)) & 31;
    else if (p + 5 <= 32) v = (lo >>> p) & 31;
    else v = ((lo >>> p) | (top << (32 - p))) & 31;
    s += TOKEN_ALPHABET[v];
  }
  return s;
}

const USER_DOMAIN = 0x75736572; // the lane that sets a user token's stream apart from a lineage key's ten lanes
const USER_WRITER = new LaneWriter();

/** The hash a user-created entity's token is written from: H128's low 64 bits over (domain, seq, ordinal). */
export function userTokenHash(seq: number, ordinal: number): LineageHash {
  if (!isU32(seq)) throw new RangeError(`user token: seq is not a u32: ${String(seq)}`);
  if (!isU32(ordinal)) throw new RangeError(`user token: ordinal is not a u32: ${String(ordinal)}`);
  USER_WRITER.reset();
  USER_WRITER.u32(USER_DOMAIN).u32(seq).u32(ordinal);
  return USER_WRITER.digest64();
}

/** The arena prefix of an address: '' on the ground layer, `under/`, `under<n>/` or `sky<n>/`. */
export function arenaPrefix(arena: Readonly<PlatKey>): string {
  const part = arena.part;
  if (!isU32(part)) throw new RangeError(`address: the arena part is not a u32: ${String(part)}`);
  switch (arena.layer) {
    case 'ground':
      return '';
    case 'underground':
      return part === 0 ? 'under/' : `under${String(part)}/`;
    case 'sky':
      return `sky${String(part)}/`;
    default:
      throw new RangeError(`address: not a layer: ${String(arena.layer)}`);
  }
}

/** §6.3's kind rule (C-0179 (3)): refuses (RangeError) a kind that is not `[A-Za-z][A-Za-z0-9._-]*`. */
export function checkKind(kind: string): void {
  if (typeof kind !== 'string' || !KIND.test(kind)) throw new RangeError(`address: not an entity kind: ${String(kind)}`);
}

/** §6.3's natural address of a generated entity: `[prefix]kind:token`, the token its lineage hash's at creation. */
export function addressOf(kind: string, lineageHash: Readonly<LineageHash>, arena: Readonly<PlatKey> = GROUND): Id {
  checkKind(kind);
  return `${arenaPrefix(arena)}${kind}:${tokenOf(lineageHash)}`;
}

/** The natural address of a user-created entity: its token from the creating event's `seq` and its ordinal. */
export function userAddressOf(kind: string, seq: number, ordinal: number, arena: Readonly<PlatKey> = GROUND): Id {
  checkKind(kind);
  return `${arenaPrefix(arena)}${kind}:${tokenOf(userTokenHash(seq, ordinal))}`;
}

/** What an address states and nothing more: its kind and its arena prefix (a ground address's part is null). */
export interface ParsedAddress {
  readonly kind: string;
  readonly layer: Layer;
  /** The part the prefix names; null on the ground layer, whose part is read from Identity.key (§2.1). */
  readonly part: number | null;
}

const ADDRESS = /^(?:(under|sky)(0|[1-9][0-9]*)?\/)?([A-Za-z][A-Za-z0-9._-]*):([^:/\s]+)$/;

/**
 * Reads an address's kind and arena prefix (§2.1, §6.3). Opaque: the token is never decoded and no parent is read —
 * the parent is `Identity.parent`, a field. Refuses a string that is not an address (RangeError).
 */
export function parseAddress(id: Id): ParsedAddress {
  const m = typeof id === 'string' ? ADDRESS.exec(id) : null;
  if (m === null) throw new RangeError(`address: not an address: ${String(id)}`);
  const kind = m[3];
  if (m[1] === undefined) return Object.freeze({ kind, layer: 'ground', part: null });
  const digits = m[2];
  if (m[1] === 'under') {
    if (digits === '0') throw new RangeError(`address: the underground's part 0 is written bare (under/): ${id}`);
    const part = digits === undefined ? 0 : Number(digits);
    if (!isU32(part)) throw new RangeError(`address: the part is not a u32: ${id}`);
    return Object.freeze({ kind, layer: 'underground', part });
  }
  if (digits === undefined) throw new RangeError(`address: a sky prefix names its part (sky<n>/): ${id}`);
  const part = Number(digits);
  if (!isU32(part)) throw new RangeError(`address: the part is not a u32: ${id}`);
  return Object.freeze({ kind, layer: 'sky', part });
}
