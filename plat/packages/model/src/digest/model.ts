// The model digest (§6.2 *The model digest is a Merkle digest over the eager model's content only*; §3.3 *The commit
// record*; M0-d-04, C-0194 (5)–(8)). The tree:
//   leaf(record)  — leaf.ts;
//   node(entity)  = H128(NODE ‖ its leaf ‖ its children's nodes, sorted by address id) — an entity's children are the
//                   entities of its layer whose Identity.parent it is (district → block → plot);
//   layer node    = H128(LAYER ‖ the layer ‖ its top entities' nodes, sorted by address id) — the eleven layers of
//                   §6.2, `identity` over the tombstones and the lifecycle event block, `plats` over each arena's five
//                   level digests (the kernel's, levelDigest.ts);
//   root          = H128(ROOT ‖ the eleven layer nodes in §6.2's order).
// Maintenance: at every commit (`onDirty`, or `listener` as TxEnv.onCommit) the leaves of the records whose faces or
// chains the batch touched are re-hashed with the nodes on their paths to their layer node — O(touched × depth); a
// record written by a stage (`put`, `remove`) the same way. The root over the layer nodes is finalised when read
// (`finaliseRoot`); `recomputeRoot` computes it from nothing — the CI oracle (§5.3's CI-only row). The three pre-decided
// fallbacks of §6.2's bars are switches, all off (C-0026: a fallback follows a measured timing-phase miss):
//   (i)  `deferLeaves`   — leaves are re-hashed at the next coarser batch boundary (`flush`) instead of every commit;
//   (ii) `rootOnReadOnly` — `stageEnd` does not finalise the root (it is finalised only when read);
//   (iii) `subtreeOracle` — `oracle(seed)` recomputes one subtree per layer chosen by the seed instead of the whole root.
// None moves a root: the root is a pure function of the leaves whenever it is computed.
import {
  changedEntities,
  compareKeys,
  freshLevelDigests,
  fmix32,
  hasLevelDigests,
  attachLevelDigests,
  LaneWriter,
  layerCode,
  levelDigests,
  updateLevelDigests,
  type CommitRecord,
  type DirtySet,
  type Hash128,
  type Id,
  type LevelDigestView,
  type Plat,
  type PlatKey,
} from '@plat/kernel';
import type { LifecycleEvent, Tombstone } from '../types/identity.js';
import { refEntity, writeValue, type GeomRefLike } from './encode.js';
import { DIGEST_LAYERS, digestLeaf, LAYER_OF, leafRefs, type DigestEntry, type DigestLayer, type GeometryOf } from './leaf.js';

/** §6.2's pre-decided fallbacks, as switches (all off by default; C-0026). */
export interface DigestSwitches {
  /** (i) Re-hash leaves at the next coarser batch boundary (`flush`), not at every commit. */
  readonly deferLeaves?: boolean;
  /** (ii) Leave the root unfinalised at a stage end; it is finalised only when read. */
  readonly rootOnReadOnly?: boolean;
  /** (iii) The CI oracle recomputes one subtree per layer, chosen by the run's seed, not the whole root. */
  readonly subtreeOracle?: boolean;
}

/** The oracle's verdict (§5.3: the digest-maintenance oracle). */
export interface OracleResult {
  readonly mode: 'root' | 'subtrees';
  readonly ok: boolean;
  /** What differed: 'root', or '<layer>' / '<layer>:<entity id>' for a subtree. */
  readonly mismatches: readonly string[];
}

const TAG_NODE = 0x45444f4e; // 'NODE'
const TAG_LAYER = 0x5259414c; // 'LAYR'
const TAG_ROOT = 0x544f4f52; // 'ROOT'
const TAG_UNRESOLVED = 0x4e524e55; // 'UNRN'

const LAYER_INDEX = new Map<string, number>(DIGEST_LAYERS.map((l, i) => [l, i]));

function arenaKey(key: PlatKey): string {
  return `${layerCode(key.layer)}:${key.part}`;
}

function compareArenas(a: Plat, b: Plat): number {
  const la = layerCode(a.key.layer);
  const lb = layerCode(b.key.layer);
  if (la !== lb) return la < lb ? -1 : 1;
  return a.key.part === b.key.part ? 0 : a.key.part < b.key.part ? -1 : 1;
}

/** The digest a reference takes when its arena is not registered: the reference's own lanes (no geometry to read). */
function unresolved(ref: GeomRefLike, key: PlatKey): Hash128 {
  const w = new LaneWriter().u32(TAG_UNRESOLVED).u32(layerCode(key.layer)).u32(key.part);
  if ('owner' in ref) w.u32(0).utf8(ref.owner).u32(ref.level);
  else {
    const ordinal = (ref as { ordinal?: number }).ordinal;
    w.u32(1).utf8(ref.role).utf8(ref.entity).u32(ordinal === undefined ? 0 : 1).u32(ordinal ?? 0);
  }
  return w.digest();
}

function geometryWith(arenas: ReadonlyMap<string, Plat>, view: (p: Plat) => LevelDigestView): GeometryOf {
  return (ref, key) => {
    const p = arenas.get(arenaKey(key));
    return p === undefined ? unresolved(ref, key) : view(p).ref(ref);
  };
}

function writeHash(w: LaneWriter, h: Hash128): void {
  w.u32(h[0]).u32(h[1]).u32(h[2]).u32(h[3]);
}

/** node(entity) from its leaf and its children's nodes (already in address-id order). */
function nodeHash(leaf: Hash128, kids: readonly Hash128[]): Hash128 {
  const w = new LaneWriter().u32(TAG_NODE);
  writeHash(w, leaf);
  w.u32(kids.length);
  for (const k of kids) writeHash(w, k);
  return w.digest();
}

function layerHash(layer: DigestLayer, tops: readonly Hash128[]): Hash128 {
  const w = new LaneWriter().u32(TAG_LAYER).u32(LAYER_INDEX.get(layer) as number).u32(tops.length);
  for (const t of tops) writeHash(w, t);
  return w.digest();
}

function rootHash(layers: readonly Hash128[]): Hash128 {
  const w = new LaneWriter().u32(TAG_ROOT).u32(layers.length);
  for (const l of layers) writeHash(w, l);
  return w.digest();
}

function platsHash(arenas: readonly Plat[], view: (p: Plat) => LevelDigestView): Hash128 {
  const w = new LaneWriter().u32(TAG_LAYER).u32(LAYER_INDEX.get('plats') as number).u32(arenas.length);
  for (const p of arenas) {
    const v = view(p);
    w.u32(layerCode(p.key.layer)).u32(p.key.part);
    for (const n of [0, 1, 2, 3, 4] as const) writeHash(w, v.level(n));
  }
  return w.digest();
}

function identityHash(tombstones: ReadonlyMap<Id, Id | null>, events: ReadonlyMap<Id, readonly LifecycleEvent[]>): Hash128 {
  const w = new LaneWriter().u32(TAG_LAYER).u32(LAYER_INDEX.get('identity') as number);
  const ids = [...tombstones.keys()].sort(compareKeys);
  w.u32(ids.length);
  for (const id of ids) {
    const sup = tombstones.get(id) ?? null;
    w.utf8(id);
    if (sup === null) w.u32(0);
    else w.u32(1).utf8(sup);
  }
  const owners = [...events.keys()].sort(compareKeys);
  w.u32(owners.length);
  for (const id of owners) {
    const list = events.get(id) as readonly LifecycleEvent[];
    w.utf8(id).u32(list.length);
    for (let i = 0; i < list.length; i++) writeValue(w, list[i], `events.${id}[${i}]`, null);
  }
  return w.digest();
}

interface LeafState {
  readonly entry: DigestEntry;
  readonly layer: DigestLayer;
  /** Dependency keys '<arena>|<entity>' of the references it holds. */
  readonly deps: readonly string[];
  /** Null until hashed (pending). */
  leaf: Hash128 | null;
}

/** The model digest of one document's model: the maintained tree, its finalisation and its recomputation. */
export class ModelDigest {
  readonly switches: Readonly<Required<DigestSwitches>>;
  /** TxEnv.onCommit: the kernel's level digests first (updateLevelDigests), then this tree (`onDirty`). */
  readonly listener: (plat: Plat, dirty: DirtySet, record: CommitRecord) => void;
  private readonly arenas = new Map<string, Plat>();
  private readonly leaves = new Map<Id, LeafState>();
  private readonly childrenOf = new Map<Id, Set<Id>>();
  private readonly tops = new Map<DigestLayer, Set<Id>>();
  private readonly nodes = new Map<Id, Hash128>();
  private readonly layers = new Map<DigestLayer, Hash128>();
  private readonly dependents = new Map<string, Set<Id>>();
  private readonly pending = new Set<Id>();
  private readonly tombstones = new Map<Id, Id | null>();
  private readonly events = new Map<Id, readonly LifecycleEvent[]>();
  private depth = 0;
  private readonly geometry: GeometryOf;

  constructor(switches: DigestSwitches = {}) {
    this.switches = Object.freeze({
      deferLeaves: switches.deferLeaves === true,
      rootOnReadOnly: switches.rootOnReadOnly === true,
      subtreeOracle: switches.subtreeOracle === true,
    });
    for (const l of DIGEST_LAYERS) this.tops.set(l, new Set());
    this.geometry = geometryWith(this.arenas, levelDigests);
    this.listener = (plat, dirty, record) => {
      updateLevelDigests(plat, dirty, record);
      this.onDirty(dirty);
    };
  }

  // ---- arenas, records, identity ------------------------------------------------------------------------------------

  /** Registers an arena (its level digests attached if they are not); its records' references resolve in it. */
  addArena(plat: Plat): void {
    if (!hasLevelDigests(plat)) attachLevelDigests(plat);
    this.arenas.set(arenaKey(plat.key), plat);
    for (const id of this.dependentsOfArena(plat.key)) this.pending.add(id);
    this.layers.delete('plats');
    this.settle();
  }

  private dependentsOfArena(key: PlatKey): Id[] {
    const prefix = `${arenaKey(key)}|`;
    const out: Id[] = [];
    for (const [dep, ids] of this.dependents) if (dep.startsWith(prefix)) out.push(...ids);
    return out;
  }

  /** Writes (or rewrites) a record: its leaf re-hashed and the nodes on its path to its layer node. */
  put(entry: DigestEntry): void {
    const refs = leafRefs(entry); // checks the entry
    const layer = LAYER_OF[entry.kind];
    const old = this.leaves.get(entry.id);
    if (old !== undefined) this.detach(entry.id, old);
    const deps = refs.map((r) => `${arenaKey(entry.identity.key)}|${refEntity(r)}`);
    // Under fallback (i) a rewritten record keeps its last leaf until the boundary re-hashes it; a new one is hashed
    // when its node is first read (there is nothing older to keep).
    const st: LeafState = { entry, layer, deps, leaf: this.switches.deferLeaves && old !== undefined ? old.leaf : null };
    this.leaves.set(entry.id, st);
    for (const d of deps) {
      let s = this.dependents.get(d);
      if (s === undefined) {
        s = new Set();
        this.dependents.set(d, s);
      }
      s.add(entry.id);
    }
    const parent = entry.identity.parent;
    if (parent !== undefined) {
      let kids = this.childrenOf.get(parent);
      if (kids === undefined) {
        kids = new Set();
        this.childrenOf.set(parent, kids);
      }
      kids.add(entry.id);
    }
    this.refreshTop(entry.id);
    for (const k of this.childrenOf.get(entry.id) ?? []) this.refreshTop(k);
    this.pending.add(entry.id);
    this.markPath(entry.id);
    this.settle();
  }

  /** Removes a record (a demolished or superseded entity leaves the working set, §2.8). */
  remove(id: Id): void {
    const old = this.leaves.get(id);
    if (old === undefined) return;
    this.detach(id, old);
    this.leaves.delete(id);
    this.pending.delete(id);
    for (const k of this.childrenOf.get(id) ?? []) {
      this.refreshTop(k);
      this.markPath(k);
    }
    this.settle();
  }

  /** Takes a record out of its parent's children, its layer's tops, the dependents; marks its old path. */
  private detach(id: Id, old: LeafState): void {
    this.markPath(id);
    this.nodes.delete(id);
    for (const d of old.deps) {
      const s = this.dependents.get(d);
      if (s === undefined) continue;
      s.delete(id);
      if (s.size === 0) this.dependents.delete(d);
    }
    const parent = old.entry.identity.parent;
    if (parent !== undefined) {
      const kids = this.childrenOf.get(parent);
      if (kids !== undefined) {
        kids.delete(id);
        if (kids.size === 0) this.childrenOf.delete(parent);
      }
    }
    (this.tops.get(old.layer) as Set<Id>).delete(id);
    this.layers.delete(old.layer);
  }

  /** The parent of a registered entity inside its own layer, or null (then it is one of the layer's tops). */
  private parentIn(id: Id): Id | null {
    const st = this.leaves.get(id);
    if (st === undefined) return null;
    const p = st.entry.identity.parent;
    if (p === undefined) return null;
    const ps = this.leaves.get(p);
    return ps !== undefined && ps.layer === st.layer ? p : null;
  }

  private refreshTop(id: Id): void {
    const st = this.leaves.get(id);
    if (st === undefined) return;
    const tops = this.tops.get(st.layer) as Set<Id>;
    const isTop = this.parentIn(id) === null;
    if (isTop !== tops.has(id)) {
      if (isTop) tops.add(id);
      else tops.delete(id);
      this.layers.delete(st.layer);
    }
  }

  /** Marks the nodes from `id` up to its layer node for re-hashing. */
  private markPath(id: Id): void {
    let x: Id | null = id;
    let guard = 0;
    while (x !== null && this.leaves.has(x)) {
      this.nodes.delete(x);
      const layer = (this.leaves.get(x) as LeafState).layer;
      this.layers.delete(layer);
      x = this.parentIn(x);
      if (++guard > this.leaves.size) throw new RangeError(`digest: the parent chain of ${id} is a cycle`);
    }
  }

  /** Writes a tombstone's id and supersededBy link into the identity layer (§2.8). */
  putTombstone(t: Pick<Tombstone, 'id' | 'supersededBy'>): void {
    this.tombstones.set(t.id, t.supersededBy ?? null);
    this.layers.delete('identity');
    this.settle();
  }

  removeTombstone(id: Id): void {
    if (this.tombstones.delete(id)) this.layers.delete('identity');
    this.settle();
  }

  /** Sets an entity's entries of the lifecycle event block (ordered by `seq`, §2.8); [] removes them. */
  setEvents(id: Id, events: readonly LifecycleEvent[]): void {
    for (const e of events) if (e.id !== id) throw new RangeError(`digest: an event of ${e.id} under ${id}`);
    for (let i = 1; i < events.length; i++) if (events[i].seq < events[i - 1].seq) throw new RangeError(`digest: ${id}'s events are not in seq order`);
    if (events.length === 0) this.events.delete(id);
    else this.events.set(id, events.slice());
    this.layers.delete('identity');
    this.settle();
  }

  // ---- maintenance --------------------------------------------------------------------------------------------------

  /**
   * The commit's update (§3.3): re-hashes the leaves whose faces or chains the batch touched — the record's owners and
   * role keys' entities, and every entity whose face or chain item the kernel's update changed — and the nodes on their
   * paths; the arena's level digests enter the `plats` node. Call after the kernel's `updateLevelDigests` (`listener`
   * does both).
   */
  onDirty(dirty: DirtySet): void {
    const plat = this.arenas.get(arenaKey(dirty.key));
    if (plat === undefined) return;
    const prefix = `${arenaKey(dirty.key)}|`;
    const entities = new Set<Id>(dirty.owners);
    for (const k of dirty.roles) entities.add(k.entity);
    for (const e of changedEntities(plat, dirty.version)) entities.add(e);
    for (const e of entities) for (const id of this.dependents.get(prefix + e) ?? []) this.pending.add(id);
    this.layers.delete('plats');
    this.settle();
  }

  /** Groups writes: the nodes are re-hashed once, when the outermost batch ends. */
  batch<T>(fn: () => T): T {
    this.depth++;
    try {
      return fn();
    } finally {
      this.depth--;
      this.settle();
    }
  }

  /** Fallback (i)'s boundary: re-hashes the leaves deferred since the last one (a no-op when nothing is deferred). */
  flush(): void {
    this.rehashPending();
    this.settleNodes();
  }

  private rehashPending(): void {
    for (const id of this.pending) {
      const st = this.leaves.get(id);
      if (st === undefined) continue;
      st.leaf = digestLeaf(st.entry, this.geometry);
      this.markPath(id);
    }
    this.pending.clear();
  }

  private settle(): void {
    if (this.depth > 0) return;
    if (!this.switches.deferLeaves) this.rehashPending();
    this.settleNodes();
  }

  private nodeOf(id: Id, guard = 0): Hash128 {
    const have = this.nodes.get(id);
    if (have !== undefined) return have;
    if (guard > this.leaves.size) throw new RangeError(`digest: the parent chain at ${id} is a cycle`);
    const st = this.leaves.get(id) as LeafState;
    if (st.leaf === null) st.leaf = digestLeaf(st.entry, this.geometry); // first hash of a deferred leaf
    const kids = this.kidsOf(id).map((k) => this.nodeOf(k, guard + 1));
    const h = nodeHash(st.leaf, kids);
    this.nodes.set(id, h);
    return h;
  }

  /** A registered entity's children in its layer, in address-id order. */
  private kidsOf(id: Id): Id[] {
    const layer = (this.leaves.get(id) as LeafState).layer;
    const out: Id[] = [];
    for (const k of this.childrenOf.get(id) ?? []) {
      const ks = this.leaves.get(k);
      if (ks !== undefined && ks.layer === layer) out.push(k);
    }
    return out.sort(compareKeys);
  }

  private settleNodes(): void {
    for (const layer of DIGEST_LAYERS) {
      if (this.layers.has(layer)) continue;
      this.layers.set(layer, this.computeLayer(layer));
    }
  }

  private computeLayer(layer: DigestLayer): Hash128 {
    if (layer === 'plats') return platsHash(this.sortedArenas(), levelDigests);
    if (layer === 'identity') return identityHash(this.tombstones, this.events);
    const tops = [...(this.tops.get(layer) as Set<Id>)].sort(compareKeys);
    return layerHash(layer, tops.map((id) => this.nodeOf(id)));
  }

  private sortedArenas(): Plat[] {
    return [...this.arenas.values()].sort(compareArenas);
  }

  // ---- reading ------------------------------------------------------------------------------------------------------

  /** The maintained leaf of a record (null while deferred), or undefined when no record has the id. */
  leaf(id: Id): Hash128 | null | undefined {
    const st = this.leaves.get(id);
    return st === undefined ? undefined : st.leaf;
  }

  /** The maintained node of a layer. */
  layer(name: DigestLayer): Hash128 {
    this.settleNodes();
    return this.layers.get(name) as Hash128;
  }

  /** The records registered (a count). */
  get size(): number {
    return this.leaves.size;
  }

  /** The root, finalised now over the maintained layer nodes (deferred leaves are flushed first). */
  finaliseRoot(): Hash128 {
    this.flush();
    return rootHash(DIGEST_LAYERS.map((l) => this.layers.get(l) as Hash128));
  }

  /** A stage's end: the root finalised (§6.2's ≤ 5 ms bar), or — under fallback (ii) — left to be finalised when read. */
  stageEnd(): Hash128 | null {
    return this.switches.rootOnReadOnly ? null : this.finaliseRoot();
  }

  // ---- the oracle ---------------------------------------------------------------------------------------------------

  /** The root computed from nothing: every leaf, node, layer and level digest read afresh (§6.2; §5.3's oracle). */
  recomputeRoot(): Hash128 {
    return rootHash(this.recomputeLayers(DIGEST_LAYERS).map(([, h]) => h));
  }

  private freshContext(): { geometry: GeometryOf; view: (p: Plat) => LevelDigestView } {
    const views = new Map<Plat, LevelDigestView>();
    const view = (p: Plat): LevelDigestView => {
      let v = views.get(p);
      if (v === undefined) {
        v = freshLevelDigests(p);
        views.set(p, v);
      }
      return v;
    };
    return { geometry: geometryWith(this.arenas, view), view };
  }

  /** Each record's in-layer children, read afresh from the records' Identity.parent (not the maintained index). */
  private freshKids(): Map<Id, Id[]> {
    const kids = new Map<Id, Id[]>();
    for (const id of this.leaves.keys()) {
      const parent = this.parentIn(id);
      if (parent === null) continue;
      const list = kids.get(parent);
      if (list === undefined) kids.set(parent, [id]);
      else list.push(id);
    }
    for (const list of kids.values()) list.sort(compareKeys);
    return kids;
  }

  private freshNode(id: Id, geometry: GeometryOf, memo: Map<Id, Hash128>, kidsOf: ReadonlyMap<Id, Id[]>, guard = 0): Hash128 {
    const have = memo.get(id);
    if (have !== undefined) return have;
    if (guard > this.leaves.size) throw new RangeError(`digest: the parent chain at ${id} is a cycle`);
    const st = this.leaves.get(id) as LeafState;
    const leaf = digestLeaf(st.entry, geometry);
    const kids = (kidsOf.get(id) ?? []).map((k) => this.freshNode(k, geometry, memo, kidsOf, guard + 1));
    const h = nodeHash(leaf, kids);
    memo.set(id, h);
    return h;
  }

  private recomputeLayers(which: readonly DigestLayer[]): [DigestLayer, Hash128][] {
    const { geometry, view } = this.freshContext();
    const memo = new Map<Id, Hash128>();
    const kidsOf = this.freshKids();
    const members = new Map<DigestLayer, Id[]>();
    for (const l of DIGEST_LAYERS) members.set(l, []);
    for (const [id, st] of this.leaves) if (this.parentIn(id) === null) (members.get(st.layer) as Id[]).push(id);
    return which.map((layer): [DigestLayer, Hash128] => {
      if (layer === 'plats') return [layer, platsHash(this.sortedArenas(), view)];
      if (layer === 'identity') return [layer, identityHash(this.tombstones, this.events)];
      const tops = (members.get(layer) as Id[]).sort(compareKeys);
      return [layer, layerHash(layer, tops.map((id) => this.freshNode(id, geometry, memo, kidsOf)))];
    });
  }

  /**
   * The digest-maintenance oracle (§5.3's CI-only row): the full recomputation equals the maintained root — or, under
   * fallback (iii), per layer one top subtree chosen by `seed` (every subtree covered across runs) equals its maintained
   * node, and the identity and plats nodes equal theirs.
   */
  oracle(seed = 0): OracleResult {
    if (!this.switches.subtreeOracle) {
      const ok = sameHash(this.finaliseRoot(), this.recomputeRoot());
      return { mode: 'root', ok, mismatches: ok ? [] : ['root'] };
    }
    this.flush();
    const mismatches: string[] = [];
    const { geometry, view } = this.freshContext();
    const memo = new Map<Id, Hash128>();
    const kidsOf = this.freshKids();
    for (const layer of DIGEST_LAYERS) {
      if (layer === 'plats') {
        if (!sameHash(this.layer(layer), platsHash(this.sortedArenas(), view))) mismatches.push(layer);
        continue;
      }
      if (layer === 'identity') {
        if (!sameHash(this.layer(layer), identityHash(this.tombstones, this.events))) mismatches.push(layer);
        continue;
      }
      const tops = [...(this.tops.get(layer) as Set<Id>)].sort(compareKeys);
      if (tops.length === 0) continue;
      const pick = tops[fmix32((seed ^ (LAYER_INDEX.get(layer) as number)) >>> 0) % tops.length];
      if (!sameHash(this.nodeOf(pick), this.freshNode(pick, geometry, memo, kidsOf))) mismatches.push(`${layer}:${pick}`);
    }
    return { mode: 'subtrees', ok: mismatches.length === 0, mismatches };
  }
}

function sameHash(a: Hash128, b: Hash128): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
