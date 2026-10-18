// The transaction's overlay at M0: a before-image of the arena and its index, taken when the transaction opens and put
// back when it rejects, so a rejected batch leaves the arena at its version, bit for bit (§2.2 rule 8, §3.3). M0-a-06.
//
// §3.3's scratch overlay is copy-on-write records in overlay-local slots. The writers M0-a-02 … M0-a-05 built (the
// arena's primitives, insertChain, splitThrough, the re-walk) write the arena's typed arrays in place and no item may
// edit them, so at M0 the overlay is the arena itself, written in place, with this before-image as its undo; the
// copy-on-write overlay with overlay-local slots and its merge are the derivation pool's, M1 (§4b; C-0185 (1)). The
// image copies every table (O(arena) memory, no work charged — work is the batch's operation count, §3.3) and the
// index's mutable state: the dynamic grids, the tombstone sets, the partitions' grid shares and the partition lists
// (the packed trees are replaced, never mutated, by a rebuild, and no batch rebuilds; their references are kept).
import type { Five, Plat } from '../arena/index.js';
import type { GridEntry, PackedIndex, SpatialIndex } from '../index/index.js';
import type { Level } from '../types/index.js';

/** A typed array the image copies (every column of §2.2's tables). */
type Column = Int32Array | Int16Array | Uint16Array | Uint8Array;

/** One copied column, put back by assignment (the live one may have been replaced by a doubling). */
function copy<T extends Column>(a: T): T {
  return a.slice() as T;
}

interface IndexImage {
  readonly index: SpatialIndex;
  readonly partitions: number;
  readonly statics: Five<number>;
  readonly tombstones: Five<number[][]>;
  readonly grids: Five<{ readonly cells: [number, number[]][]; readonly large: number[]; readonly entries: [number, GridEntry][] }>;
  readonly parts: { readonly part: PackedIndex; readonly tree: PackedIndex['tree']; readonly keys: Float64Array; readonly pending: number[] }[];
  readonly byKey: Five<[string, number][]>;
  readonly work: { readonly rebuilds: number; readonly items: number };
  readonly log: SpatialIndex['log'];
}

/** The before-image of one arena. */
export interface Savepoint {
  readonly plat: Plat;
  readonly version: number;
  readonly vertices: Plat['vertices'];
  readonly halfEdges: Plat['halfEdges'];
  readonly roles: Omit<Plat['roles'], 'head'> & { readonly head: { k0: Int32Array; k1: Int32Array; first: Int32Array; count: number } };
  readonly faces: Five<Omit<Plat['faces'][0], 'ownerHead'> & { readonly ownerHead: { owner: Int32Array; head: Int32Array; count: number } }>;
  readonly indexHome: Plat['indexHome'];
  readonly handles: { units: Uint16Array; start: Int32Array; hash: Int32Array; slots: Int32Array; count: number };
  readonly slots: Plat['slots'];
  readonly frame: Plat['frame'];
  readonly index: IndexImage | null;
}

const LV: readonly Level[] = [0, 1, 2, 3, 4];

function imageIndex(idx: SpatialIndex): IndexImage {
  const statics = LV.map((l) => idx.levels[l].static.length) as Five<number>;
  const tombstones = LV.map((l) => idx.levels[l].tombstones.map((s) => [...s])) as Five<number[][]>;
  const grids = LV.map((l) => {
    const g = idx.levels[l].dynamic;
    return {
      cells: [...g.cells].map(([k, s]) => [k, [...s]] as [number, number[]]),
      large: [...g.large],
      entries: [...g.entries],
    };
  }) as Five<IndexImage['grids'][0]>;
  return {
    index: idx,
    partitions: idx.partitions.length,
    statics,
    tombstones,
    grids,
    parts: idx.partitions.map((part) => ({ part, tree: part.tree, keys: part.keys, pending: [...part.pending] })),
    byKey: LV.map((l) => [...idx.byKey[l]]) as Five<[string, number][]>,
    work: { rebuilds: idx.work.rebuilds, items: idx.work.items },
    log: idx.log,
  };
}

function restoreIndex(p: Plat, im: IndexImage): void {
  const idx = im.index;
  p.index = idx;
  (idx.partitions as PackedIndex[]).length = im.partitions;
  for (const { part, tree, keys, pending } of im.parts) {
    part.tree = tree;
    part.keys = keys;
    part.pending.clear();
    for (const k of pending) part.pending.add(k);
  }
  for (const l of LV) {
    const L = idx.levels[l];
    (L.static as PackedIndex[]).length = im.statics[l];
    const ts = L.tombstones as Set<number>[];
    ts.length = im.tombstones[l].length;
    im.tombstones[l].forEach((keys, i) => {
      ts[i].clear();
      for (const k of keys) ts[i].add(k);
    });
    const g = L.dynamic;
    g.cells.clear();
    for (const [k, s] of im.grids[l].cells) g.cells.set(k, new Set(s));
    g.large.clear();
    for (const k of im.grids[l].large) g.large.add(k);
    g.entries.clear();
    for (const [k, e] of im.grids[l].entries) g.entries.set(k, e);
    const byKey = idx.byKey[l];
    byKey.clear();
    for (const [k, v] of im.byKey[l]) byKey.set(k, v);
  }
  idx.work.rebuilds = im.work.rebuilds;
  idx.work.items = im.work.items;
  idx.log = im.log;
}

/**
 * The images taken of each arena, in order, and the spans of that order a restore made dead (C-0299's LIFO use, session
 * round S7): putting an image back discards every image taken after it — they hold states the arena no longer leads to —
 * so a later restore of one of them is refused, as is a second restore of one image (its arrays are the arena's since the
 * first). Kept beside the arena and the image, never on them (the `Savepoint` shape is the exported one).
 */
interface Taken {
  count: number;
  /** Disjoint spans (lo, hi] of image numbers made dead, ascending. */
  readonly dead: [number, number][];
}
const TAKEN = new WeakMap<Plat, Taken>();
const NUMBER = new WeakMap<Savepoint, number>();
const USED = new WeakSet<Savepoint>();

function takenOf(p: Plat): Taken {
  let t = TAKEN.get(p);
  if (t === undefined) {
    t = { count: 0, dead: [] };
    TAKEN.set(p, t);
  }
  return t;
}

/**
 * The images taken after image `n` die: the span (n, count] joins the dead spans. `n` is alive (the caller checked), so
 * every span either ends before it or starts at or after it and lies inside the new one: those are dropped, and the
 * list stays ascending and short.
 */
function killAfter(t: Taken, n: number): void {
  if (n >= t.count) return;
  const earlier = t.dead.filter(([, b]) => b < n);
  t.dead.length = 0;
  t.dead.push(...earlier, [n, t.count]);
}

function isDead(t: Taken, n: number): boolean {
  return t.dead.some(([a, b]) => n > a && n <= b);
}

/** The before-image of `p` and its index, as they stand now. */
export function takeSavepoint(p: Plat): Savepoint {
  const s = image(p);
  const t = takenOf(p);
  t.count += 1;
  NUMBER.set(s, t.count);
  return s;
}

function image(p: Plat): Savepoint {
  const v = p.vertices;
  const h = p.halfEdges;
  const r = p.roles;
  const ht = p.handles;
  return {
    plat: p,
    version: p.version,
    vertices: { x: copy(v.x), y: copy(v.y), out: copy(v.out), level: copy(v.level), flags: copy(v.flags) },
    halfEdges: { origin: copy(h.origin), next: copy(h.next), prev: copy(h.prev), level: copy(h.level) },
    roles: {
      edgeFirst: copy(r.edgeFirst), vertexFirst: copy(r.vertexFirst), kind: copy(r.kind), entity: copy(r.entity), level: copy(r.level),
      ordinal: copy(r.ordinal), nextInSet: copy(r.nextInSet), nextSameKey: copy(r.nextSameKey),
      head: { k0: copy(r.head.k0), k1: copy(r.head.k1), first: copy(r.head.first), count: r.head.count },
    },
    faces: LV.map((l) => {
      const f = p.faces[l];
      return {
        outer: copy(f.outer), holesStart: copy(f.holesStart), holes: copy(f.holes), kind: copy(f.kind), owner: copy(f.owner),
        parent: copy(f.parent), stage: copy(f.stage), nextOfOwner: copy(f.nextOfOwner),
        ownerHead: { owner: copy(f.ownerHead.owner), head: copy(f.ownerHead.head), count: f.ownerHead.count },
      };
    }) as Savepoint['faces'],
    indexHome: { vertex: copy(p.indexHome.vertex), edge: copy(p.indexHome.edge), face: LV.map((l) => copy(p.indexHome.face[l])) as Five<Int16Array> },
    handles: { units: copy(ht.units), start: copy(ht.start), hash: copy(ht.hash), slots: copy(ht.slots), count: ht.count },
    slots: {
      vertex: { ...p.slots.vertex },
      pair: { ...p.slots.pair },
      face: LV.map((l) => ({ ...p.slots.face[l] })) as Plat['slots']['face'],
      role: { ...p.slots.role },
      holesTop: [...p.slots.holesTop] as Five<number>,
    },
    frame: { ...p.frame },
    index: p.index === undefined ? null : imageIndex(p.index),
  };
}

/**
 * Each arena's restore generation (C-0299): how many times a before-image was put back across committed batches. Kept
 * beside the arena, never on it and never persisted (the chunk format stores no version either), so a state keyed on
 * (generation, version) — a maintained level digest, a stamp (C-0313) — tells a version reached again after a restore
 * from the one it saw.
 */
const RESTORES = new WeakMap<Plat, number>();

/**
 * The arena's restore generation: 0 until a before-image is put back across a committed batch, then one more per such
 * restore. A rejected or thrown batch restores at its own version and never moves it. Keyed with `version`, it names
 * one arena state: (generation, version) is never reached twice with different content — within one generation the
 * version only rises, and every restore that discards a committed span moves the generation; a dead image (one that
 * could land on a version the generation already reached, with other content) is refused (session round S7).
 */
export function restoreGeneration(p: Plat): number {
  return RESTORES.get(p) ?? 0;
}

/**
 * Puts the before-image back: every table, slot counter, the handle table, the version and the index as they were when
 * the image was taken. The image's arrays become the arena's, so an image is put back at most once; images are put back
 * last-taken first (one taken after an image since put back is dead); and an image is put back between batches, or
 * inside the batch it was taken in — never while another batch is open on the arena. Each misuse throws (a programming
 * error) and changes nothing. Putting it back across committed batches (the version moved since the image) bumps the
 * arena's restore generation.
 */
export function restoreSavepoint(s: Savepoint): void {
  const p = s.plat;
  const log = p.index === undefined ? null : p.index.log;
  if (log !== null && log !== (s.index === null ? null : s.index.log)) {
    throw new Error('tx: a savepoint is put back while a batch it was not taken in is open on the arena (restore between batches)');
  }
  putBack(s);
}

/** The open batch's own before-image put back (its rejection or rollback: tx.ts) — taken before the batch's log opened. */
export function restoreBatchImage(s: Savepoint): void {
  putBack(s);
}

function putBack(s: Savepoint): void {
  const p = s.plat;
  const t = takenOf(p);
  const n = NUMBER.get(s);
  if (n === undefined) throw new Error('tx: a savepoint is put back that takeSavepoint did not take');
  if (USED.has(s)) throw new Error('tx: a savepoint is put back twice (an image is put back at most once)');
  if (isDead(t, n)) throw new Error('tx: a savepoint is put back after an image taken before it (images are put back last-taken first)');
  USED.add(s);
  killAfter(t, n);
  if (p.version !== s.version) RESTORES.set(p, restoreGeneration(p) + 1);
  p.version = s.version;
  p.vertices = s.vertices;
  p.halfEdges = s.halfEdges;
  const r = p.roles;
  r.edgeFirst = s.roles.edgeFirst;
  r.vertexFirst = s.roles.vertexFirst;
  r.kind = s.roles.kind;
  r.entity = s.roles.entity;
  r.level = s.roles.level;
  r.ordinal = s.roles.ordinal;
  r.nextInSet = s.roles.nextInSet;
  r.nextSameKey = s.roles.nextSameKey;
  r.head.k0 = s.roles.head.k0;
  r.head.k1 = s.roles.head.k1;
  r.head.first = s.roles.head.first;
  r.head.count = s.roles.head.count;
  for (const l of LV) {
    const f = p.faces[l];
    const g = s.faces[l];
    f.outer = g.outer;
    f.holesStart = g.holesStart;
    f.holes = g.holes;
    f.kind = g.kind;
    f.owner = g.owner;
    f.parent = g.parent;
    f.stage = g.stage;
    f.nextOfOwner = g.nextOfOwner;
    f.ownerHead.owner = g.ownerHead.owner;
    f.ownerHead.head = g.ownerHead.head;
    f.ownerHead.count = g.ownerHead.count;
  }
  p.indexHome.vertex = s.indexHome.vertex;
  p.indexHome.edge = s.indexHome.edge;
  for (const l of LV) p.indexHome.face[l] = s.indexHome.face[l];
  const ht = p.handles;
  ht.units = s.handles.units;
  ht.start = s.handles.start;
  ht.hash = s.handles.hash;
  ht.slots = s.handles.slots;
  ht.count = s.handles.count;
  p.slots.vertex = { ...s.slots.vertex };
  p.slots.pair = { ...s.slots.pair };
  for (const l of LV) p.slots.face[l] = { ...s.slots.face[l] };
  p.slots.role = { ...s.slots.role };
  for (const l of LV) p.slots.holesTop[l] = s.slots.holesTop[l];
  p.frame = { ...s.frame };
  if (s.index !== null) restoreIndex(p, s.index);
}

/** Was face slot `f` of `level` live in the image? */
export function wasFaceLive(s: Savepoint, level: Level, f: number): boolean {
  return f >= 0 && f < s.slots.face[level].top && s.faces[level].kind[f] !== 0xffff;
}

/** The face's owner handle in the image (−1 when it had none or was not live). */
export function ownerBefore(s: Savepoint, level: Level, f: number): number {
  return wasFaceLive(s, level, f) ? s.faces[level].owner[f] : -1;
}
