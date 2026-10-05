// @plat/model's identity module (item M0-d-05a; §6.3, §2.1 *Ids*, §2.8, §6.1): the lineage key and its 64-bit hash,
// address ids (the base-32 token, the arena prefixes, the opaque parse), the one collision rule (`mint`) with the
// entity-key cache (C-0147), and the town root's lineage.
export {
  compareLineage,
  GROUND,
  LINEAGE_LANES,
  lineageHash,
  lineageLanes,
  lineageLanesInto,
  sameLineage,
  TOWN_ROOT,
  type EntityKey,
  type LineageKey,
} from './lineage.js';
export {
  addressOf,
  arenaPrefix,
  parseAddress,
  TOKEN_ALPHABET,
  TOKEN_LENGTH,
  tokenOf,
  userAddressOf,
  userTokenHash,
  type ParsedAddress,
} from './address.js';
export { mint, mintTownRoot, TOWN_KIND, type BatchRecord, type LiveEntry, type Minted } from './mint.js';
