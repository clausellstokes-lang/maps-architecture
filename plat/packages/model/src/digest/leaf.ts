// The model digest's leaf (§6.2: "leaf(record) = H128(kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags ‖ attributes in
// schema order ‖ digests of the faces and chains it owns)"; M0-d-04, C-0194 (3)–(5)) and the layer each M0 kind's
// leaves hang under. The attributes are the kind's schema order (M0-m-01's table; the excluded fields — provenance,
// derivation and naming records — are not in it, so they move no leaf); each enters by the value rule of encode.ts.
// The geometry references the attributes hold are the faces and chains the record owns: after the attributes come the
// digests of what they resolve to (the kernel's face and chain items, §6.2 "so no coordinate is hashed twice"), in the
// order the references are met, each once.
import { LaneWriter, type Hash128, type Id, type LineageHash, type PlatKey } from '@plat/kernel';
import { schemaOrder, type RecordKind, type RecordOf } from '../schema/index.js';
import type { Lifecycle } from '../types/identity.js';
import { isU32 } from '../identity/lineage.js';
import { refText, writeHash128, writeValue, type GeomRefLike } from './encode.js';

/** The layer nodes under the model root, in the root's order (§6.2). */
export const DIGEST_LAYERS = Object.freeze([
  'site',
  'network',
  'districts',
  'hinterland',
  'content',
  'names',
  'closeups',
  'underground',
  'sky',
  'identity',
  'plats',
] as const);

/** One of the model root's layer nodes. */
export type DigestLayer = (typeof DIGEST_LAYERS)[number];

/**
 * The layer each M0 kind's leaves hang under (§6.2's list; C-0194 (5)): the site's terrain and L0 water; the network's
 * ways, junctions, walls, gates and bridges; the districts' districts, blocks, frontages, plots, seams and reservations;
 * the content's Allocation and FieldBands. hinterland, names, closeups, underground and sky hold no M0 kind (empty).
 */
export const LAYER_OF: Readonly<Record<RecordKind, DigestLayer>> = Object.freeze({
  terrain: 'site',
  waterBody: 'site',
  way: 'network',
  junction: 'network',
  enceinte: 'network',
  gate: 'network',
  bridge: 'network',
  district: 'districts',
  block: 'districts',
  frontage: 'districts',
  plot: 'districts',
  seam: 'districts',
  reservation: 'districts',
  allocation: 'content',
  fieldBands: 'content',
});

/** The identity fields a leaf reads beside the record (§2.8's Identity: `parent` and `lineage`; `key` resolves its geometry). */
export interface LeafIdentity {
  readonly lineage: LineageHash;
  /** Containment parent (§2.8): a field, never parsed from the id. */
  readonly parent?: Id;
  /** The arena its geometry lies in. */
  readonly key: PlatKey;
}

/** One record as the digest reads it: its kind, its address id, its identity and the record. */
export interface DigestEntry<K extends RecordKind = RecordKind> {
  readonly kind: K;
  /** The address id (§6.3): the record's own `id` where it has one (FieldBands has none: the caller names it). */
  readonly id: Id;
  readonly identity: LeafIdentity;
  readonly record: RecordOf[K];
}

/** Resolves a stored geometry reference in an arena to the digest of the faces or chains it names. */
export type GeometryOf = (ref: GeomRefLike, key: PlatKey) => Hash128;

const TAG_LEAF = 0x4641454c; // 'LEAF'
const LOCKED = 1;
const PINNED = 2;
const EDITED = 4;
const ASSIGNED = 8;

const W = new LaneWriter();

function checkEntry(entry: DigestEntry): void {
  if (typeof entry.id !== 'string' || entry.id.length === 0) throw new RangeError('digest: an entry names its address id');
  const rec = entry.record as unknown as { id?: unknown };
  if (rec.id !== undefined && rec.id !== entry.id) throw new RangeError(`digest: entry ${entry.id} holds the record of ${String(rec.id)}`);
  const lin = entry.identity.lineage;
  if (lin.length !== 2 || !isU32(lin[0]) || !isU32(lin[1])) throw new RangeError(`digest: ${entry.id}'s lineage is not two u32 lanes`);
  if ('dossier' in entry.identity) {
    throw new RangeError(`digest: ${entry.id} carries a dossier ref; Identity.dossier enters the leaf with the dossier port (M1, §4b; C-0194 (3))`);
  }
}

/** Writes the leaf's lanes up to and including the attributes; the references met are pushed to `refs`. */
function writeHead(w: LaneWriter, entry: DigestEntry, refs: GeomRefLike[]): void {
  const order = schemaOrder(entry.kind);
  w.reset().u32(TAG_LEAF).utf8(entry.kind).utf8(entry.id).u32(entry.identity.lineage[0]).u32(entry.identity.lineage[1]);
  const parent = entry.identity.parent;
  if (parent === undefined) w.u32(0);
  else w.u32(1).utf8(parent);
  const rec = entry.record as unknown as Record<string, unknown>;
  const life = rec.lifecycle as Lifecycle | undefined;
  if (life === undefined) w.u32(0);
  else {
    const f = life.flags;
    w.u32(1).utf8(life.existence);
    w.u32((f.locked ? LOCKED : 0) | (f.pinned ? PINNED : 0) | (f.edited ? EDITED : 0) | (f.assigned ? ASSIGNED : 0));
    writeValue(w, f.lockedPaths, `${entry.id}.lifecycle.flags.lockedPaths`, null);
    writeValue(w, f.editedPaths, `${entry.id}.lifecycle.flags.editedPaths`, null);
  }
  w.u32(order.length);
  for (const attr of order) writeValue(w, rec[attr], `${entry.id}.${attr}`, refs);
}

/** The geometry references a record's attributes hold, each once, in the order met. */
export function leafRefs(entry: DigestEntry): GeomRefLike[] {
  checkEntry(entry);
  const refs: GeomRefLike[] = [];
  writeHead(new LaneWriter(), entry, refs);
  return dedupe(refs);
}

function dedupe(refs: readonly GeomRefLike[]): GeomRefLike[] {
  const seen = new Set<string>();
  const out: GeomRefLike[] = [];
  for (const r of refs) {
    const t = refText(r);
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(r);
  }
  return out;
}

/**
 * The leaf digest of a record (§6.2): kind ‖ id ‖ lineage ‖ parent ‖ existence ‖ flags ‖ attributes in schema order ‖
 * the digests of the faces and chains its references resolve to (`geometry`, in the entity's arena). The lifecycle's
 * `since` is not in the leaf: the event that set it is in the identity layer's event block (C-0194 (3)). This is the
 * item's `digestLeaf(record)`: the record enters with its kind, address id and identity (`entry`), and its geometry
 * references through the resolver of the tree that holds it (`geometry`) — the maintained or the fresh one (C-0412).
 */
export function digestLeaf(entry: DigestEntry, geometry: GeometryOf): Hash128 {
  checkEntry(entry);
  const refs: GeomRefLike[] = [];
  writeHead(W, entry, refs);
  const owned = dedupe(refs);
  // The references are resolved after the head is written; `geometry` never reaches this module's writer (it is private
  // here, and a leaf never resolves another leaf).
  const digests = owned.map((r) => geometry(r, entry.identity.key));
  W.u32(digests.length);
  for (const d of digests) writeHash128(W, d);
  return W.digest();
}
