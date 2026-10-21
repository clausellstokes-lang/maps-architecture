// The kernel's per-level route digests (§6.2 *Geometry is hashed once, by the kernel, per level*; §3.3 *The commit
// record*; M0-d-04). Each arena keeps one digest per level n over its level-n route — vertices, roles, face owners and
// kinds of level ≤ n in canonical order, never arena slots — maintained along each commit record's dirty set and
// finalised when read; `recomputeLevelDigest` is the same digest computed from nothing (the CI oracle's half).
// Readings (C-0194):
//
// * **Items.** A level-n digest is a function of two kinds of item, each hashed once on its own level's route:
//   - a *face item* per live face record of level m ≤ n: its kind, its owner's address id, and its rings at level m —
//     the lattice points of the vertices of level ≤ m along its level-m walk (finer vertices skipped), the outer ring
//     from its lowest-then-leftmost vertex (a vertex visited twice: the smaller successor, then the rest of the ring),
//     the holes rotated alike and sorted;
//   - a *chain item* per (role, entity, ordinal) key and row level ℓ ≤ n: the role, the entity's address id, the
//     ordinal and ℓ, and the key's level-ℓ geometry — for an edge role its pieces, the runs of its edges between
//     vertices of level ≤ ℓ (or where the chain branches or ends), each as its two end points, the lower (y, x) first;
//     for a vertex role its vertices' points.
//   A record that is its parent's own child (§2.2 rule 2: the one level-m record inside its parent, of the parent's
//   kind and owner) stays out of the level-m tree: it is the coarser face read at level m, materialised only because a
//   finer record needed a parent — by a finer batch as often as not (C-0177 (9)) — and what it would add is in its
//   neighbours' rings and the chain items already. So a finer level's derivation, which adds finer vertices (skipped
//   by every coarser reading), finer rows (in a finer chain item), finer records and coarser own children, never
//   changes a coarser level's digest (§3.3's canonical-key property); a promotion or demotion moves a vertex or edge
//   between the levels' readings, and a reversal restores them exactly.
// * **Trees.** Per level m, the face items and the chain items each fill a fixed tree of DIGEST_BUCKETS buckets (an
//   item's bucket is a hash of its sort key); a bucket's digest is H128 over its items' hashes in sort-key order, a
//   tree's root H128 over its buckets. `levelDigest(p, n)` = H128(tag, layer, part, n, the face and chain roots of
//   levels 0 … n). A pure function of the items, whichever order they were maintained in.
// * **Maintenance.** `updateLevelDigests` (TxEnv.onCommit's kernel half) re-hashes, at each commit, the items the
//   commit touched: the dirty faces and the coarser records a finer batch materialised above them (the record lists
//   the batch's level and finer ones), the faces and chains registered on the pairs and vertices those faces gained or
//   lost, on the promoted, demoted, unflagged and moved vertices and the demoted edges, and every key the record names,
//   then the own-child standing of their parents' children; their buckets are marked and re-hashed when a digest is
//   read. O(touched), never a walk of the arena. A state that missed a commit (no listener ran) is rebuilt when next
//   read, and counted (`levelDigestBuilds`).
// * **The state's key (N-56 (5), C-0299, C-0305).** A state is keyed on the arena's (restore generation, version), never
//   the version alone: `restoreSavepoint` across committed batches sets the version back and bumps the generation, so
//   a state that saw the rolled-back commits is foreign to the restored arena — its listener skips every later commit
//   and the next read rebuilds it, whatever the version has come back to. (generation, version) names one arena state.
// * **Doubles.** None enters: every value is an integer lane (lattice coordinates, kinds, levels, ordinals) or UTF-8.
import {
  faceWalk,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isRoleRowLive,
  isVertexLive,
  LEVELS,
  outgoing,
  roleIdOf,
  roleInfo,
  rowElement,
  rowsOfKey,
  rowsOn,
  handleOf,
  facesOfOwner,
  compareKeys,
  type FaceId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { fmix32, H32, LaneWriter, type Hash128 } from '../hash/index.js';
import { layerCode } from '../rng/index.js';
import { restoreGeneration, type CommitRecord, type DirtySet } from '../tx/index.js';
import type { ChainRef, EdgeSetRef, FaceRef, Id, Level, VertexRef } from '../types/index.js';

/** The buckets of each per-level item tree. */
export const DIGEST_BUCKETS = 64;

// Lane tags (four ASCII bytes each), so no two kinds of hashed stream can be read as each other.
const TAG_FACE = 0x45434146; // 'FACE'
const TAG_CHAIN = 0x4e494843; // 'CHIN'
const TAG_BUCKET = 0x544b4342; // 'BCKT'
const TAG_TREE = 0x45455254; // 'TREE'
const TAG_LEVEL = 0x4c56454c; // 'LEVL'
const TAG_FACEREF = 0x46524346; // 'FCRF'
const TAG_CHAINREF = 0x46524843; // 'CHRF'
const FACES = 0;
const CHAINS = 1;
const EDGE_ROLE = 0;
const VERTEX_ROLE = 1;

function check(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(`digest: ${message}`);
}

/** A point as [y, x] (the canonical order reads y first). */
type YX = readonly [number, number];

/** One hashed item: its hash, its sort key, its bucket, and what it was read from (for the reverse registration). */
interface Item {
  readonly id: string;
  readonly hash: Hash128;
  /** The sort key — faces: [y0, x0, y1, x1]; chains: [role rank, ordinal, level], with `entity` beside it. */
  readonly rank: readonly number[];
  readonly entity: string | null;
  readonly bucket: number;
  readonly pairs: readonly number[];
  readonly vertices: readonly number[];
  /** Faces: the parent record's slot one level coarser (−1 at L0); chains: −1. */
  readonly parent: number;
}

/** One per-level tree: its buckets (item id → item) and their cached digests (null: to re-hash). */
interface Tree {
  readonly buckets: Map<string, Item>[];
  readonly digests: (Hash128 | null)[];
  root: Hash128 | null;
}

/** The maintained state of one arena (kept beside it: no Map is reachable from a Plat, §13.1). */
interface State {
  /** The arena's restore generation and version this state is current with (the key, C-0305). */
  readonly generation: number;
  version: number;
  readonly trees: [Tree[], Tree[]];
  /** Per level: face slot → item. */
  readonly faceAt: Map<number, Item>[];
  /** Per level: chain id → item. */
  readonly chainAt: Map<string, Item>[];
  /** Per level m ≥ 1: parent slot (level m − 1) → the slots of its level-m child records. */
  readonly children: Map<number, Set<number>>[];
  /** Pair → the item refs ('f<m>:<slot>' / 'c<m>:<id>') read from it; vertex → likewise. */
  readonly pairReg: Map<number, Set<string>>;
  readonly vertexReg: Map<number, Set<string>>;
  /** Entity → the chain ids ('<role>|<ordinal>|<entity>') of its keys, every level. */
  readonly keysOf: Map<string, Set<string>>;
  /** The entities whose face or chain items the last update changed, and that update's generation and version. */
  changed: { generation: number; version: number; entities: Id[] };
  /** Diagnostics: full builds of this state (1 after attaching; more only when an update was missed). */
  builds: number;
}

const STATES = new WeakMap<Plat, State>();

function emptyTree(): Tree {
  const buckets: Map<string, Item>[] = [];
  const digests: (Hash128 | null)[] = [];
  for (let b = 0; b < DIGEST_BUCKETS; b++) {
    buckets.push(new Map());
    digests.push(null);
  }
  return { buckets, digests, root: null };
}

function emptyState(generation: number, version: number): State {
  const faces: Tree[] = [];
  const chains: Tree[] = [];
  const faceAt: Map<number, Item>[] = [];
  const chainAt: Map<string, Item>[] = [];
  const children: Map<number, Set<number>>[] = [];
  for (let m = 0; m < 5; m++) {
    faces.push(emptyTree());
    chains.push(emptyTree());
    faceAt.push(new Map());
    chainAt.push(new Map());
    children.push(new Map());
  }
  return {
    generation,
    version,
    trees: [faces, chains],
    faceAt,
    chainAt,
    children,
    pairReg: new Map(),
    vertexReg: new Map(),
    keysOf: new Map(),
    changed: { generation, version, entities: [] },
    builds: 0,
  };
}

const W = new LaneWriter();

// ---- canonical rings ------------------------------------------------------------------------------------------------

function cmpYX(a: YX, b: YX): number {
  if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1;
  if (a[1] !== b[1]) return a[1] < b[1] ? -1 : 1;
  return 0;
}

/** A ring's points rotated to start at its lowest-then-leftmost point, ties broken by the rest of the ring. */
function canonicalRing(pts: readonly YX[]): YX[] {
  const n = pts.length;
  if (n === 0) return [];
  let best = 0;
  for (let i = 1; i < n; i++) {
    const c = cmpYX(pts[i], pts[best]);
    if (c < 0) best = i;
    else if (c === 0) {
      // The same point visited twice: the rotation that reads smaller from there on (its successor first).
      for (let k = 1; k < n; k++) {
        const d = cmpYX(pts[(i + k) % n], pts[(best + k) % n]);
        if (d !== 0) {
          if (d < 0) best = i;
          break;
        }
      }
    }
  }
  const out: YX[] = [];
  for (let k = 0; k < n; k++) out.push(pts[(best + k) % n]);
  return out;
}

function cmpRings(a: readonly YX[], b: readonly YX[]): number {
  const n = a.length < b.length ? a.length : b.length;
  for (let i = 0; i < n; i++) {
    const c = cmpYX(a[i], b[i]);
    if (c !== 0) return c;
  }
  return a.length === b.length ? 0 : a.length < b.length ? -1 : 1;
}

function writeRing(w: LaneWriter, ring: readonly YX[]): void {
  w.u32(ring.length);
  for (const [y, x] of ring) w.i32(x).i32(y);
}

// ---- items ----------------------------------------------------------------------------------------------------------

function faceBucket(key: readonly number[]): number {
  let h = 0;
  for (const v of key) h = fmix32((h ^ (v >>> 0)) >>> 0);
  return h & (DIGEST_BUCKETS - 1);
}

/** The face item of live face `f` of level `m`. */
function faceItem(p: Plat, m: Level, f: FaceId): Item {
  const rings = faceWalk(p, m, f);
  const O = p.halfEdges.origin;
  const lv = p.vertices.level;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const pairs: number[] = [];
  const vertices: number[] = [];
  const read: YX[][] = [];
  for (const ring of rings) {
    const pts: YX[] = [];
    for (const h of ring) {
      const v = O[h];
      pairs.push(h >> 1);
      vertices.push(v);
      if (lv[v] <= m) pts.push([Y[v], X[v]]);
    }
    read.push(canonicalRing(pts));
  }
  const outer = read[0];
  const holes = read.slice(1).sort(cmpRings);
  const ownerHandle = p.faces[m].owner[f];
  const owner = ownerHandle >= 0 ? idOf(p, ownerHandle) : null;
  W.reset().u32(TAG_FACE).u32(m).u32(p.faces[m].kind[f]);
  if (owner === null) W.u32(0);
  else W.u32(1).utf8(owner);
  W.u32(read.length);
  writeRing(W, outer);
  for (const h of holes) writeRing(W, h);
  const a = outer.length > 0 ? outer[0] : ([0, 0] as YX);
  const b = outer.length > 1 ? outer[1] : a;
  const rank = [a[0], a[1], b[0], b[1]];
  return { id: String(f), hash: W.digest(), rank, entity: owner, bucket: faceBucket(rank), pairs, vertices, parent: m === 0 ? -1 : p.faces[m].parent[f] };
}

function chainId(role: number, ordinal: number, entity: Id): string {
  return `${role}|${ordinal}|${entity}`;
}

function chainBucket(role: number, ordinal: number, entity: Id, level: number): number {
  const h = fmix32((H32(entity) ^ Math.imul(role + 1, 0x9e3779b1) ^ Math.imul(ordinal + 1, 0x85ebca6b) ^ level) >>> 0);
  return h & (DIGEST_BUCKETS - 1);
}

/**
 * The chain item of key (role, entity, ordinal) at row level ℓ, or null when the key has no row of that level. Edge
 * roles: the pieces of its edges between vertices of level ≤ ℓ, branch points and ends; vertex roles: the points.
 */
function chainItem(p: Plat, role: number, entity: Id, ordinal: number, level: Level): Item | null {
  const h = handleOf(p, entity);
  if (h < 0) return null;
  const rows = rowsOfKey(p, role, h, ordinal).filter((r) => p.roles.level[r] === level);
  if (rows.length === 0) return null;
  const info = roleInfo(role);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const lv = p.vertices.level;
  const pairs: number[] = [];
  const vertices: number[] = [];
  const parts: (readonly number[])[] = [];
  if (info.kind === 'vertex') {
    for (const r of rows) {
      const v = rowElement(p, r);
      vertices.push(v);
      parts.push([Y[v], X[v]]);
    }
  } else {
    const set = new Set<number>();
    for (const r of rows) set.add(rowElement(p, r));
    // The key's degree at each vertex (its own edges only).
    const degree = new Map<VertexId, number>();
    for (const e of set) {
      pairs.push(e);
      for (const v of [O[2 * e], O[2 * e + 1]]) {
        vertices.push(v);
        degree.set(v, (degree.get(v) ?? 0) + 1);
      }
    }
    const breaks = (v: VertexId): boolean => lv[v] <= level || degree.get(v) !== 2;
    // The key's other edge at a pass-through vertex w, arriving by pair e.
    const onward = (w: VertexId, e: number): number => {
      for (const g of outgoing(p, w)) if ((g >> 1) !== e && set.has(g >> 1)) return g >> 1;
      return -1;
    };
    const seen = new Set<number>();
    for (const e0 of set) {
      if (seen.has(e0)) continue;
      seen.add(e0);
      const ends: VertexId[] = [];
      const on: VertexId[] = [O[2 * e0], O[2 * e0 + 1]];
      for (const start of [O[2 * e0], O[2 * e0 + 1]]) {
        // Walk away from e0 through `start` until a breaking vertex.
        let w = start;
        let e = e0;
        let guard = 0;
        while (!breaks(w)) {
          const next = onward(w, e);
          if (next === -1 || seen.has(next)) break;
          seen.add(next);
          w = O[2 * next] === w ? O[2 * next + 1] : O[2 * next];
          on.push(w);
          e = next;
          check(++guard <= set.size, `the chain ${roleInfo(role).name}/${entity} does not end`);
        }
        ends.push(w);
      }
      if (!breaks(ends[0]) && !breaks(ends[1])) {
        // A closed run with no vertex of its level: read from its lowest-then-leftmost point, both ends there.
        let lo = on[0];
        for (const v of on) if (cmpYX([Y[v], X[v]], [Y[lo], X[lo]]) < 0) lo = v;
        ends[0] = lo;
        ends[1] = lo;
      }
      let a: YX = [Y[ends[0]], X[ends[0]]];
      let b: YX = [Y[ends[1]], X[ends[1]]];
      if (cmpYX(b, a) < 0) {
        const t = a;
        a = b;
        b = t;
      }
      parts.push([a[0], a[1], b[0], b[1]]);
    }
  }
  parts.sort((u, v) => {
    for (let i = 0; i < u.length; i++) if (u[i] !== v[i]) return u[i] < v[i] ? -1 : 1;
    return 0;
  });
  W.reset().u32(TAG_CHAIN).utf8(info.name).utf8(entity).u32(ordinal).u32(level).u32(info.kind === 'vertex' ? VERTEX_ROLE : EDGE_ROLE).u32(parts.length);
  for (const q of parts) {
    // [y, x] or [ay, ax, by, bx]: written x then y per point.
    for (let i = 0; i < q.length; i += 2) W.i32(q[i + 1]).i32(q[i]);
  }
  return {
    id: chainId(role, ordinal, entity),
    hash: W.digest(),
    rank: [info.rank, ordinal, level],
    entity,
    bucket: chainBucket(role, ordinal, entity, level),
    pairs,
    vertices,
    parent: -1,
  };
}

function compareItems(kind: number, a: Item, b: Item): number {
  if (kind === FACES) {
    for (let i = 0; i < 4; i++) if (a.rank[i] !== b.rank[i]) return a.rank[i] < b.rank[i] ? -1 : 1;
    return 0;
  }
  if (a.rank[0] !== b.rank[0]) return a.rank[0] < b.rank[0] ? -1 : 1;
  const e = compareKeys(a.entity as string, b.entity as string);
  if (e !== 0) return e;
  if (a.rank[1] !== b.rank[1]) return a.rank[1] < b.rank[1] ? -1 : 1;
  return a.rank[2] === b.rank[2] ? 0 : a.rank[2] < b.rank[2] ? -1 : 1;
}

/**
 * Items in sort-key order. §3.3's face key is total over live level-m faces (one directed level-m route edge bounds one
 * face), so two face items with one key are a degenerate face (an outer ring with no vertex of level ≤ m reads
 * [0, 0, 0, 0]) and are refused rather than left in Map insertion order, which would make the digest depend on history
 * (N-6). Chain items never tie: their ids are unique per level and the role ranks are distinct.
 */
function sortItems(kind: number, level: number, items: Item[]): Item[] {
  items.sort((x, y) => compareItems(kind, x, y));
  if (kind === FACES) for (let i = 1; i < items.length; i++) check(compareItems(kind, items[i - 1], items[i]) !== 0, `two L${level} face items share the sort key ${items[i].rank.join(',')} (§3.3: the key is total; a degenerate face)`);
  return items;
}

// ---- trees ----------------------------------------------------------------------------------------------------------

function treeRoot(tree: Tree, kind: number, level: number): Hash128 {
  if (tree.root !== null) return tree.root;
  for (let b = 0; b < DIGEST_BUCKETS; b++) {
    if (tree.digests[b] !== null) continue;
    const items = sortItems(kind, level, [...tree.buckets[b].values()]);
    W.reset().u32(TAG_BUCKET).u32(items.length);
    for (const it of items) for (const w of it.hash) W.u32(w);
    tree.digests[b] = W.digest();
  }
  W.reset().u32(TAG_TREE).u32(kind).u32(level);
  for (const d of tree.digests) for (const w of d as Hash128) W.u32(w);
  tree.root = W.digest();
  return tree.root;
}

function register(reg: Map<number, Set<string>>, keys: readonly number[], ref: string): void {
  for (const k of keys) {
    let s = reg.get(k);
    if (s === undefined) {
      s = new Set();
      reg.set(k, s);
    }
    s.add(ref);
  }
}

function unregister(reg: Map<number, Set<string>>, keys: readonly number[], ref: string): void {
  for (const k of keys) {
    const s = reg.get(k);
    if (s === undefined) continue;
    s.delete(ref);
    if (s.size === 0) reg.delete(k);
  }
}

function faceRef(m: number, f: number): string {
  return `f${m}:${f}`;
}

function chainRefText(level: number, id: string): string {
  return `c${level}:${id}`;
}

/**
 * Puts (or with `item` null, removes) the face item of level m's slot f — its registration and its place among its
 * parent's children — and takes it out of the tree; `placeFace` decides whether it goes back in. Returns the old item.
 */
function setFace(st: State, m: Level, f: FaceId, item: Item | null): Item | undefined {
  const old = st.faceAt[m].get(f);
  const tree = st.trees[FACES][m];
  const ref = faceRef(m, f);
  if (old !== undefined) {
    if (tree.buckets[old.bucket].delete(old.id)) {
      tree.digests[old.bucket] = null;
      tree.root = null;
    }
    unregister(st.pairReg, old.pairs, ref);
    unregister(st.vertexReg, old.vertices, ref);
    const kids = st.children[m].get(old.parent);
    if (kids !== undefined) {
      kids.delete(f);
      if (kids.size === 0) st.children[m].delete(old.parent);
    }
    st.faceAt[m].delete(f);
  }
  if (item !== null) {
    register(st.pairReg, item.pairs, ref);
    register(st.vertexReg, item.vertices, ref);
    if (m > 0) {
      let kids = st.children[m].get(item.parent);
      if (kids === undefined) {
        kids = new Set();
        st.children[m].set(item.parent, kids);
      }
      kids.add(f);
    }
    st.faceAt[m].set(f, item);
  }
  return old;
}

/**
 * Is level m's record f its parent's own child (§2.2 rule 2) — the one record of level m inside its parent, of the
 * parent's kind and owner? Such a record is the coarser face read at level m, materialised only because a finer one
 * needed a parent (C-0177 (9)) — by a finer batch as often as not — so it stays out of the level-m tree: what it would
 * add (the level-m vertices on its rings) is in its neighbours' rings and the chains' items already, and a finer
 * batch's materialising it moves no coarser digest (C-0194 (2)).
 */
function isOwnChild(p: Plat, st: State, m: Level, f: FaceId, item: Item): boolean {
  if (m === 0) return false;
  const parent = item.parent;
  const up = (m - 1) as Level;
  if (parent < 0 || !isFaceLive(p, up, parent)) return false;
  const kids = st.children[m].get(parent);
  if (kids === undefined || kids.size !== 1 || !kids.has(f)) return false;
  return p.faces[m].kind[f] === p.faces[up].kind[parent] && p.faces[m].owner[f] === p.faces[up].owner[parent];
}

/** Puts level m's live record f into its tree, or keeps it out when it is its parent's own child. */
function placeFace(p: Plat, st: State, m: Level, f: FaceId): void {
  const item = st.faceAt[m].get(f);
  if (item === undefined) return;
  const tree = st.trees[FACES][m];
  const bucket = tree.buckets[item.bucket];
  const inTree = bucket.get(item.id) === item;
  const want = !isOwnChild(p, st, m, f, item);
  if (inTree === want) return;
  if (want) bucket.set(item.id, item);
  else bucket.delete(item.id);
  tree.digests[item.bucket] = null;
  tree.root = null;
}

/** Re-places every child record of the given parents ('<child level>:<parent slot>'). */
function placeChildren(p: Plat, st: State, parents: Iterable<string>): void {
  for (const key of parents) {
    const colon = key.indexOf(':');
    const m = Number(key.slice(0, colon)) as Level;
    const kids = st.children[m].get(Number(key.slice(colon + 1)));
    if (kids !== undefined) for (const f of kids) placeFace(p, st, m, f);
  }
}

/** Puts (or removes) the chain item `id` at row level ℓ; returns the item it replaced. */
function setChain(st: State, level: Level, id: string, entity: Id, item: Item | null): Item | undefined {
  const old = st.chainAt[level].get(id);
  const tree = st.trees[CHAINS][level];
  const ref = chainRefText(level, id);
  if (old !== undefined) {
    tree.buckets[old.bucket].delete(old.id);
    tree.digests[old.bucket] = null;
    unregister(st.pairReg, old.pairs, ref);
    unregister(st.vertexReg, old.vertices, ref);
    st.chainAt[level].delete(id);
  }
  if (item !== null) {
    tree.buckets[item.bucket].set(item.id, item);
    tree.digests[item.bucket] = null;
    register(st.pairReg, item.pairs, ref);
    register(st.vertexReg, item.vertices, ref);
    st.chainAt[level].set(id, item);
  }
  if (old !== undefined || item !== null) tree.root = null;
  // The entity's key index: a key with no item left at any level leaves it.
  const key = id.slice(0, id.length - entity.length - 1);
  let keys = st.keysOf.get(entity);
  if (item !== null) {
    if (keys === undefined) {
      keys = new Set();
      st.keysOf.set(entity, keys);
    }
    keys.add(key);
  } else if (keys !== undefined) {
    let any = false;
    for (const l of LEVELS) if (st.chainAt[l].has(id)) any = true;
    if (!any) {
      keys.delete(key);
      if (keys.size === 0) st.keysOf.delete(entity);
    }
  }
  return old;
}

function sameHash(a: Hash128 | undefined, b: Hash128 | undefined): boolean {
  if (a === undefined || b === undefined) return a === b;
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/** Re-reads every level's chain item of key (role, ordinal, entity); notes the entity when one changed. */
function refreshKey(p: Plat, st: State, role: number, ordinal: number, entity: Id, changed: Set<Id>): void {
  const id = chainId(role, ordinal, entity);
  for (const l of LEVELS) {
    const item = chainItem(p, role, entity, ordinal, l);
    const old = setChain(st, l, id, entity, item);
    if (!sameHash(old?.hash, item?.hash)) changed.add(entity);
  }
}

/** Re-reads the face item of level m's slot f (removed when the slot is no longer live). */
function refreshFace(p: Plat, st: State, m: Level, f: FaceId, changed: Set<Id>, parents: Set<string>, known?: Item | null): void {
  const item = known !== undefined ? known : isFaceLive(p, m, f) ? faceItem(p, m, f) : null;
  const old = setFace(st, m, f, item);
  // Its own place, its siblings' (old parent and new) and its children's may change with it.
  if (old !== undefined && m > 0) parents.add(`${m}:${old.parent}`);
  if (item !== null && m > 0) parents.add(`${m}:${item.parent}`);
  if (m < 4) parents.add(`${m + 1}:${f}`);
  if (!sameHash(old?.hash, item?.hash) || old?.entity !== item?.entity) {
    if (old?.entity) changed.add(old.entity);
    if (item?.entity) changed.add(item.entity);
  }
}

function build(p: Plat): State {
  const st = emptyState(restoreGeneration(p), p.version);
  const sink = new Set<Id>();
  for (const m of LEVELS) {
    for (let f = 0; f < p.slots.face[m].top; f++) if (isFaceLive(p, m, f)) setFace(st, m, f, faceItem(p, m, f));
  }
  for (const m of LEVELS) for (const f of st.faceAt[m].keys()) placeFace(p, st, m, f);
  const keys = new Map<string, readonly [number, number, Id]>();
  for (let r = 0; r < p.slots.role.top; r++) {
    if (!isRoleRowLive(p, r)) continue;
    const role = p.roles.kind[r];
    const ordinal = p.roles.ordinal[r];
    const entity = idOf(p, p.roles.entity[r]);
    keys.set(chainId(role, ordinal, entity), [role, ordinal, entity]);
  }
  for (const [role, ordinal, entity] of keys.values()) refreshKey(p, st, role, ordinal, entity, sink);
  st.builds = 1;
  return st;
}

// ---- the public surface -----------------------------------------------------------------------------------------------

/**
 * Attaches the maintained level digests to `p` (a full read of the arena, once): from then on every commit whose
 * TxEnv.onCommit calls `updateLevelDigests` maintains them. Re-attaching rebuilds.
 */
export function attachLevelDigests(p: Plat): void {
  STATES.set(p, build(p));
}

/** Is a maintained state attached to `p`? */
export function hasLevelDigests(p: Plat): boolean {
  return STATES.has(p);
}

/** Is `st` keyed on the arena's present (restore generation, version)? */
function isCurrent(p: Plat, st: State): boolean {
  return st.generation === restoreGeneration(p) && st.version === p.version;
}

/**
 * The attached state, current with the arena: a state that missed a commit (no listener ran), or one of another
 * restore generation (a savepoint was put back across committed batches since it was built), is rebuilt, and counted.
 */
function current(p: Plat): State {
  let st = STATES.get(p);
  if (st === undefined) {
    st = build(p);
    STATES.set(p, st);
  } else if (!isCurrent(p, st)) {
    const builds = st.builds;
    st = build(p);
    st.builds = builds + 1;
    STATES.set(p, st);
  }
  return st;
}

/**
 * The kernel half of the digest listener (TxEnv.onCommit, §3.3): re-hashes the items the commit touched — see the
 * module comment — and records the entities whose items changed (`changedEntities`). A no-op on an arena without an
 * attached state; a state that missed an earlier commit, or of a foreign restore generation, is left to be rebuilt
 * when next read.
 */
export function updateLevelDigests(p: Plat, dirty: DirtySet, record: CommitRecord): void {
  const st = STATES.get(p);
  if (st === undefined) return;
  // A foreign generation (a restore across committed batches since the state was built) or a missed commit: `current`
  // rebuilds on the next read. The version alone could match again after the restore's replayed commits (C-0305).
  if (st.generation !== restoreGeneration(p)) return;
  if (st.version !== dirty.version - 1) return;
  const changed = new Set<Id>();
  const Ep = new Set<number>();
  const Ev = new Set<VertexId>();
  const faces = new Set<string>();
  const chains = new Set<string>();
  const fresh = new Map<string, Item | null>();
  // (1) The dirty faces, and what each gained or lost.
  for (const d of dirty.faces) {
    for (const f of [...d.created, ...d.changed, ...d.removed]) {
      faces.add(faceRef(d.level, f));
      const old = st.faceAt[d.level].get(f);
      const now = isFaceLive(p, d.level, f) ? faceItem(p, d.level, f) : null;
      fresh.set(faceRef(d.level, f), now);
      const oldP = new Set(old?.pairs ?? []);
      const nowP = new Set(now?.pairs ?? []);
      const oldV = new Set(old?.vertices ?? []);
      const nowV = new Set(now?.vertices ?? []);
      for (const e of oldP) if (!nowP.has(e)) Ep.add(e);
      for (const e of nowP) if (!oldP.has(e)) Ep.add(e);
      for (const v of oldV) if (!nowV.has(v)) Ev.add(v);
      for (const v of nowV) if (!oldV.has(v)) Ev.add(v);
    }
  }
  // (1a) The children of every removed record: a re-level that frees a record moves its live children to a survivor
  // without listing them (relevel's face pass), so their items would keep the freed slot as their parent and their
  // own-child standing would be judged on it (closing check s2's B-1, C-0388). Re-read, each child's item carries its
  // new parent; a child that left with its parent reads as removed.
  for (const d of dirty.faces) {
    if (d.level === 4) continue;
    for (const f of d.removed) {
      const kids = st.children[d.level + 1].get(f);
      if (kids !== undefined) for (const c of kids) faces.add(faceRef(d.level + 1, c));
    }
  }
  // (1b) Coarser records a finer batch materialised as parents (§2.2 rule 2, C-0177 (9)) — the record lists the batch's
  // level and finer ones only: every unknown live ancestor of a dirty face.
  for (const d of dirty.faces) {
    for (const f0 of [...d.created, ...d.changed]) {
      if (!isFaceLive(p, d.level, f0)) continue;
      let f = f0;
      for (let m = d.level; m > 0; m--) {
        const up = p.faces[m].parent[f];
        if (up < 0 || !isFaceLive(p, (m - 1) as Level, up)) break;
        if (!st.faceAt[m - 1].has(up)) faces.add(faceRef(m - 1, up));
        f = up;
      }
    }
  }
  // (2) The vertices and edges whose level, flags or place the batch changed.
  for (const v of record.promoted) Ev.add(v);
  for (const v of record.demoted.vertices) Ev.add(v);
  for (const v of record.unflagged) Ev.add(v);
  for (const v of record.moved) Ev.add(v);
  for (const h of record.demoted.edges) Ep.add(h >> 1);
  // (3) The keys the record names: their current rows and their old readings.
  for (const k of dirty.roles) {
    const role = roleIdOf(k.role);
    check(role >= 0, `no role named ${k.role}`);
    const id = chainId(role, k.ordinal, k.entity);
    chains.add(id);
    for (const l of LEVELS) {
      const old = st.chainAt[l].get(id);
      if (old !== undefined) {
        for (const e of old.pairs) Ep.add(e);
        for (const v of old.vertices) Ev.add(v);
      }
    }
    const h = handleOf(p, k.entity);
    if (h >= 0) {
      for (const r of rowsOfKey(p, role, h, k.ordinal)) {
        const el = rowElement(p, r);
        if (roleInfo(role).kind === 'edge') Ep.add(el);
        else Ev.add(el);
      }
    }
  }
  // (4) The edges at every such vertex; then every item read from those edges and vertices.
  for (const v of Ev) if (isVertexLive(p, v)) for (const g of outgoing(p, v)) Ep.add(g >> 1);
  const take = (ref: string): void => {
    if (ref[0] === 'f') faces.add(ref);
    else chains.add(ref.slice(ref.indexOf(':') + 1));
  };
  for (const e of Ep) {
    for (const ref of st.pairReg.get(e) ?? []) take(ref);
    if (isHalfEdgeLive(p, 2 * e)) for (const r of rowsOn(p, 'edge', 2 * e)) chains.add(chainId(p.roles.kind[r], p.roles.ordinal[r], idOf(p, p.roles.entity[r])));
  }
  for (const v of Ev) {
    for (const ref of st.vertexReg.get(v) ?? []) take(ref);
    if (isVertexLive(p, v)) for (const r of rowsOn(p, 'vertex', v)) chains.add(chainId(p.roles.kind[r], p.roles.ordinal[r], idOf(p, p.roles.entity[r])));
  }
  // (5) Re-read them; then re-place every record whose own-child standing they may have changed.
  const parents = new Set<string>();
  for (const ref of faces) {
    const colon = ref.indexOf(':');
    refreshFace(p, st, Number(ref.slice(1, colon)) as Level, Number(ref.slice(colon + 1)), changed, parents, fresh.get(ref));
  }
  for (const ref of faces) {
    const colon = ref.indexOf(':');
    placeFace(p, st, Number(ref.slice(1, colon)) as Level, Number(ref.slice(colon + 1)));
  }
  placeChildren(p, st, parents);
  for (const id of chains) {
    const a = id.indexOf('|');
    const b = id.indexOf('|', a + 1);
    refreshKey(p, st, Number(id.slice(0, a)), Number(id.slice(a + 1, b)), id.slice(b + 1), changed);
  }
  st.version = dirty.version;
  st.changed = { generation: st.generation, version: dirty.version, entities: [...changed].sort(compareKeys) };
}

/**
 * The entities whose face or chain items the commit of `version` changed (address-id order); [] for another version,
 * or when the maintained state did not follow that commit (it is of another restore generation than the arena's).
 */
export function changedEntities(p: Plat, version: number): readonly Id[] {
  const st = STATES.get(p);
  if (st === undefined || st.changed.version !== version || st.changed.generation !== restoreGeneration(p)) return [];
  return st.changed.entities;
}

/** How many full builds the attached state took (1: attached once and maintained since); 0 when none is attached. */
export function levelDigestBuilds(p: Plat): number {
  return STATES.get(p)?.builds ?? 0;
}

function levelOf(st: State, p: Plat, n: Level): Hash128 {
  check(n === 0 || n === 1 || n === 2 || n === 3 || n === 4, 'a level is 0 … 4');
  const roots: Hash128[] = [];
  for (let m = 0; m <= n; m++) {
    roots.push(treeRoot(st.trees[FACES][m], FACES, m));
    roots.push(treeRoot(st.trees[CHAINS][m], CHAINS, m));
  }
  W.reset().u32(TAG_LEVEL).u32(layerCode(p.key.layer)).u32(p.key.part).u32(n);
  for (const r of roots) for (const w of r) W.u32(w);
  return W.digest();
}

/** The maintained level-n digest of arena `p` (§6.2), finalised on read: only the buckets a commit marked are re-hashed. */
export function levelDigest(p: Plat, level: Level): Hash128 {
  return levelOf(current(p), p, level);
}

/** The level-n digest of `p` computed from nothing (every item read afresh): the CI oracle's kernel half (§5.3). */
export function recomputeLevelDigest(p: Plat, level: Level): Hash128 {
  return levelOf(build(p), p, level);
}

/** A view of one arena's items: the maintained state, or a fresh one (the oracle's). */
export interface LevelDigestView {
  /** The level-n digest. */
  level(n: Level): Hash128;
  /** The digest of what a geometry reference resolves to (§6.2: "its FaceRef and ChainRef resolved"). */
  ref(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef): Hash128;
}

function viewOf(p: Plat, st: State): LevelDigestView {
  return {
    level: (n) => levelOf(st, p, n),
    ref: (ref) => refOf(p, st, ref),
  };
}

/** The maintained view of `p` (rebuilt first if it missed a commit). */
export function levelDigests(p: Plat): LevelDigestView {
  return viewOf(p, current(p));
}

/** A fresh view of `p`, read from nothing and attached to nothing (the oracle's). */
export function freshLevelDigests(p: Plat): LevelDigestView {
  return viewOf(p, build(p));
}

function isFaceRefShape(ref: FaceRef | ChainRef | EdgeSetRef | VertexRef): ref is FaceRef {
  return 'owner' in ref;
}

function refOf(p: Plat, st: State, ref: FaceRef | ChainRef | EdgeSetRef | VertexRef): Hash128 {
  if (isFaceRefShape(ref)) {
    // The faces the entity owns at the level, each item's hash, in canonical face order.
    check(ref.level === 0 || ref.level === 1 || ref.level === 2 || ref.level === 3 || ref.level === 4, 'a FaceRef level is 0 … 4');
    const h = handleOf(p, ref.owner);
    const items: Item[] = [];
    if (h >= 0) {
      for (const f of facesOfOwner(p, ref.level, h)) {
        const it = st.faceAt[ref.level].get(f);
        check(it !== undefined, `face ${f} at L${ref.level} has no item`);
        items.push(it);
      }
    }
    sortItems(FACES, ref.level, items);
    W.reset().u32(TAG_FACEREF).u32(ref.level).utf8(ref.owner).u32(items.length);
    for (const it of items) for (const w of it.hash) W.u32(w);
    return W.digest();
  }
  const role = roleIdOf(ref.role);
  check(role >= 0, `no role named ${ref.role}`);
  // A ChainRef names every ordinal of (role, entity); an EdgeSetRef or VertexRef with an ordinal names that one.
  const ordinal = (ref as EdgeSetRef).ordinal;
  const ordinals: number[] = [];
  if (ordinal !== undefined) ordinals.push(ordinal);
  else {
    const prefix = `${role}|`;
    for (const key of st.keysOf.get(ref.entity) ?? []) if (key.startsWith(prefix)) ordinals.push(Number(key.slice(prefix.length)));
    ordinals.sort((a, b) => a - b);
  }
  W.reset().u32(TAG_CHAINREF).utf8(ref.role).utf8(ref.entity).u32(ordinal === undefined ? 0 : 1).u32(ordinal ?? 0);
  const hashes: Hash128[] = [];
  for (const o of ordinals) {
    const id = chainId(role, o, ref.entity);
    for (const l of LEVELS) {
      const it = st.chainAt[l].get(id);
      if (it !== undefined) hashes.push(it.hash);
    }
  }
  W.u32(hashes.length);
  for (const x of hashes) for (const w of x) W.u32(w);
  return W.digest();
}
