// The records digest (§6.2 *The records digest*; §2.8 — derivation and naming records: persisted, outside the model
// digest, inside this one; M0-d-04, C-0194 (9)). A second Merkle tree beside the model's, with its own tags (RLEF, RNOD,
// RROT), so its node and root writers stay apart from model.ts's — two persisted forms:
//   leaf  = H128(RLEAF ‖ entity id ‖ record kind ‖ its fields in schema order ‖ each cited slice as (table, version,
//           kind, key, hash));
//   node  = H128(RNODE ‖ its partition ‖ its leaves, sorted by entity id then record kind) — one node per static-index
//           partition holding records (a district's, or OUTSIDE: the partition outside districts) plus the TOWN node,
//           which holds the records of entities in no partition (ways, walls, water bodies, districts);
//   root  = H128(RROOT ‖ the non-empty nodes, sorted by partition).
// The tree is maintained as the model tree is: a write re-hashes its leaf and that leaf's node; a move between
// partitions (a re-parent across districts, a merge or split) moves the leaves and re-hashes both nodes, though no record
// changed. The root is finalised when read; `recomputeRoot` reads everything afresh (the oracle). The leaf encoding is
// the file schema's, not an output version's: the records are stored inputs.
//
// The record kind `order` — an enceinte's `laidAt` or a raised way's `courseAt` profile (§2.7's laws' *Order*) — has
// no M0 writer: `Enceinte.laidAt` is staged to M3a (C-0142 (2)) and the raised way is M3a's; `put` refuses it naming the
// milestone (C-0194 (9)).
import { compareKeys, LaneWriter, type Hash128, type Id } from '@plat/kernel';
import type { DerivationRecord, NamingRecord, SliceRef } from '../types/vocabulary.js';
import { isU32 } from '../identity/lineage.js';
import { writeHash128, writeValue } from './encode.js';

/** The partition outside every district (§3.3: "one for everything outside districts (hinterland, margin)"). */
export const RECORDS_OUTSIDE = 'outside';
/** The town node: the records of entities that belong to no partition. */
export const RECORDS_TOWN = 'town';

/** The record kinds of the records digest at M0. */
export type RecordsKind = 'derivation' | 'naming';

/** The fields of each record kind in schema order (§2.8's declaration order), less `slices` (hashed last, as cited). */
export const RECORDS_SCHEMA_ORDER = Object.freeze({
  derivation: Object.freeze(['ctx', 'fields', 'band', 'allocationRow', 'epoch', 'params', 'placements'] as const),
  naming: Object.freeze(['salt', 'epoch'] as const),
} as const);

/** One persisted record as the records digest reads it. */
export type RecordsEntry =
  | { readonly entity: Id; readonly kind: 'derivation'; readonly partition: string; readonly record: DerivationRecord }
  | { readonly entity: Id; readonly kind: 'naming'; readonly partition: string; readonly record: NamingRecord };

const TAG_RLEAF = 0x46454c52; // 'RLEF'
const TAG_RNODE = 0x444f4e52; // 'RNOD'
const TAG_RROOT = 0x544f5252; // 'RROT'

function checkEntry(e: RecordsEntry): void {
  const kind = (e as { kind: string }).kind;
  if (kind === 'order') throw new RangeError('records digest: the order record (Enceinte.laidAt, RaisedWayRecord.courseAt) has no writer before M3a (C-0142 (2); C-0194 (9))');
  if (kind !== 'derivation' && kind !== 'naming') throw new RangeError(`records digest: no record kind '${kind}'`);
  if (typeof e.entity !== 'string' || e.entity.length === 0) throw new RangeError('records digest: a record names its entity\'s address id');
  if (typeof e.partition !== 'string' || e.partition.length === 0) throw new RangeError(`records digest: ${e.entity}'s record names its partition`);
}

function writeSlice(w: LaneWriter, s: SliceRef): void {
  const h = s.hash;
  if (h.length !== 2 || !isU32(h[0]) || !isU32(h[1])) throw new RangeError(`records digest: slice ${s.table}/${s.key}'s hash is not two u32 lanes`);
  w.utf8(s.table).utf8(s.version).utf8(s.kind).utf8(s.key).u32(h[0]).u32(h[1]);
}

/** A record's leaf (§6.2): id ‖ record kind ‖ its fields in schema order ‖ each cited slice. */
export function recordsLeaf(e: RecordsEntry): Hash128 {
  checkEntry(e);
  const w = new LaneWriter().u32(TAG_RLEAF).utf8(e.entity).utf8(e.kind);
  const order: readonly string[] = RECORDS_SCHEMA_ORDER[e.kind];
  const rec = e.record as unknown as Record<string, unknown>;
  w.u32(order.length);
  for (const f of order) writeValue(w, rec[f], `${e.entity}.${e.kind}.${f}`, null);
  const slices = e.record.slices;
  w.u32(slices.length);
  for (const s of slices) writeSlice(w, s);
  return w.digest();
}

function leafKey(entity: Id, kind: RecordsKind): string {
  return `${entity}|${kind}`;
}

interface Leaf {
  readonly entry: RecordsEntry;
  readonly hash: Hash128;
}

function compareLeaves(a: Leaf, b: Leaf): number {
  return compareKeys(a.entry.entity, b.entry.entity) || compareKeys(a.entry.kind, b.entry.kind);
}

function nodeHash(partition: string, leaves: readonly Leaf[]): Hash128 {
  const w = new LaneWriter().u32(TAG_RNODE).utf8(partition).u32(leaves.length);
  for (const l of leaves) writeHash128(w, l.hash);
  return w.digest();
}

function rootHash(nodes: readonly (readonly [string, Hash128])[]): Hash128 {
  const w = new LaneWriter().u32(TAG_RROOT).u32(nodes.length);
  for (const [p, h] of nodes) {
    w.utf8(p);
    writeHash128(w, h);
  }
  return w.digest();
}

/** The records digest of one document: maintained leaves and partition nodes, the root finalised when read. */
export class RecordsDigest {
  private readonly leaves = new Map<string, Leaf>();
  private readonly members = new Map<string, Set<string>>();
  private readonly nodes = new Map<string, Hash128>();
  private depth = 0;

  /** Writes (or rewrites, or moves) a record: its leaf re-hashed, its node (and a node it left) re-hashed. */
  put(e: RecordsEntry): void {
    const hash = recordsLeaf(e);
    const key = leafKey(e.entity, e.kind);
    const old = this.leaves.get(key);
    if (old !== undefined && old.entry.partition !== e.partition) this.leave(key, old.entry.partition);
    this.leaves.set(key, { entry: e, hash });
    let m = this.members.get(e.partition);
    if (m === undefined) {
      m = new Set();
      this.members.set(e.partition, m);
    }
    m.add(key);
    this.nodes.delete(e.partition);
    this.settle();
  }

  private leave(key: string, partition: string): void {
    const m = this.members.get(partition);
    if (m !== undefined) {
      m.delete(key);
      if (m.size === 0) this.members.delete(partition);
    }
    this.nodes.delete(partition);
  }

  /** Removes a record. */
  remove(entity: Id, kind: RecordsKind): void {
    const key = leafKey(entity, kind);
    const old = this.leaves.get(key);
    if (old === undefined) return;
    this.leaves.delete(key);
    this.leave(key, old.entry.partition);
    this.settle();
  }

  /** Moves every record of an entity to another partition (§6.2: a re-parent across districts, a merge or split). */
  move(entity: Id, partition: string): void {
    this.batch(() => {
      for (const kind of ['derivation', 'naming'] as const) {
        const old = this.leaves.get(leafKey(entity, kind));
        if (old !== undefined && old.entry.partition !== partition) this.put({ ...old.entry, partition } as RecordsEntry);
      }
    });
  }

  /** Groups writes: each touched node is re-hashed once, when the outermost batch ends. */
  batch<T>(fn: () => T): T {
    this.depth++;
    try {
      return fn();
    } finally {
      this.depth--;
      this.settle();
    }
  }

  private settle(): void {
    if (this.depth > 0) return;
    for (const [p, m] of this.members) {
      if (this.nodes.has(p)) continue;
      const leaves = [...m].map((k) => this.leaves.get(k) as Leaf).sort(compareLeaves);
      this.nodes.set(p, nodeHash(p, leaves));
    }
  }

  /** The records held (a count). */
  get size(): number {
    return this.leaves.size;
  }

  /** The maintained node of a partition, or undefined when it holds no record. */
  node(partition: string): Hash128 | undefined {
    this.settle();
    return this.nodes.get(partition);
  }

  /** The root, finalised now over the maintained nodes. */
  finaliseRoot(): Hash128 {
    this.settle();
    const parts = [...this.members.keys()].sort(compareKeys);
    return rootHash(parts.map((p) => [p, this.nodes.get(p) as Hash128] as const));
  }

  /** The root computed from nothing: every leaf re-hashed from its record, the nodes regrouped (the oracle). */
  recomputeRoot(): Hash128 {
    const groups = new Map<string, Leaf[]>();
    for (const l of this.leaves.values()) {
      const fresh: Leaf = { entry: l.entry, hash: recordsLeaf(l.entry) };
      const g = groups.get(l.entry.partition);
      if (g === undefined) groups.set(l.entry.partition, [fresh]);
      else g.push(fresh);
    }
    const parts = [...groups.keys()].sort(compareKeys);
    return rootHash(parts.map((p) => [p, nodeHash(p, (groups.get(p) as Leaf[]).sort(compareLeaves))] as const));
  }
}
