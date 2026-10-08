// The arena (§2.2): one vertex-and-half-edge arena per PlatKey, the five refinement levels as views of it, every table
// a typed array. M0-a-02 builds the storage — the tables, their growth, slot allocation and free lists — and the raw
// slot primitives below; the doors that write geometry (insertChain, splitThrough, removeEdges, clearFiner, retypeEdges,
// setOwner, warp, pinVertices; §3.4) are M0-a-04 … M0-a-06's and M0-a-13's, built on these. Slots are kernel-internal
// (§2.2 rule 5, §3.9): nothing outside the kernel stores one and no output depends on one.
//
// Readings of §2.2 recorded in C-0146: the per-level spatial index (`Plat.index`, §3.3) is M0-a-03's; the arena adds two
// kernel-internal fields the design's block does not list — `handles` (the interned-handle table, §2.1) and `slots`
// (each table's high-water mark, free-list head and live count) — and marks a free slot by the flag or the sentinel
// below; a face's holes are runs in a per-level pool, each ended by −1.
import { LATTICE, type Frame, type LatticeSpec } from '../num/index.js';
import type { Handle, LatticePoint, Level, PlatKey } from '../types/index.js';
import { check, tinyTables } from './debug.js';
import { createHandleTable, type HandleTable } from './handles.js';
import {
  createOwnerTable,
  createRoleHeadTable,
  ownerDelete,
  ownerGet,
  ownerSet,
  tableCapacityFor,
  type OwnerTable,
  type RoleHeadTable,
} from './tables.js';

/** Arena slots: kernel-internal, valid within one batch (rule 5). twin(h) = h ^ 1; an edge pair is h >> 1. */
export type VertexId = number;
export type HalfEdgeId = number;
export type FaceId = number;

/** Five of a thing, one per level L0 … L4. */
export type Five<T> = [T, T, T, T, T];

/** The levels, in order. */
export const LEVELS: readonly Level[] = Object.freeze([0, 1, 2, 3, 4]);

// The vertex flag bits (§2.2: "pinned | steiner | split | free slot"). Their writers are pinVertices (pinned, §3.4),
// the insertion (steiner, split; §3.6) and rule 3's re-levelling (clears) — M0-a-04 … M0-a-06's; declared here.
/** Set only by `pinVertices` (§3.4); released only by rule 3 (b). */
export const VERTEX_PINNED = 1;
/** A finer vertex on a coarser edge's route (rule 3). */
export const VERTEX_STEINER = 2;
/** Its dissolution restores exactly the edge it was created on (rule 3's split flag). */
export const VERTEX_SPLIT = 4;
/** The slot is on the free list. */
export const VERTEX_FREE = 8;

/** The `kind` a free face slot or a free role-row slot carries (no face kind and no role id takes it). */
export const FREE_KIND = 0xffff;

/** §2.2's vertex columns. */
export interface VertexTable {
  x: Int32Array;
  y: Int32Array;
  /** One outgoing half-edge; −1 for a vertex with no edge (on the free list: the next free slot). */
  out: Int32Array;
  /** Birth level: lowered by promotion, raised by demotion (rule 3). */
  level: Uint8Array;
  /** VERTEX_PINNED | VERTEX_STEINER | VERTEX_SPLIT | VERTEX_FREE. */
  flags: Uint8Array;
}

/** §2.2's half-edge columns: half-edges are allocated in pairs, twin(h) = h ^ 1. */
export interface HalfEdgeTable {
  /** −1 on both half-edges of a free pair. */
  origin: Int32Array;
  /** The next half-edge around the face on its left, at the finest level (on a free pair's even half-edge: the next free pair). */
  next: Int32Array;
  prev: Int32Array;
  /** Per pair (h >> 1): the edge's birth level — the lowest level among its role rows (rule 3). */
  level: Uint8Array;
}

/** One level's face records (§2.2). */
export interface LevelFaces {
  /** A half-edge of the outer ring, of this level or coarser, the face on its left. */
  outer: Int32Array;
  /** The face's run in `holes` (one half-edge per hole ring, ended by −1), or −1 when it has no hole. */
  holesStart: Int32Array;
  /** The pool of hole runs (append-only, compacted when full). */
  holes: Int32Array;
  /** The face kind; FREE_KIND on the free list. */
  kind: Uint16Array;
  /** Interned entity handle; −1 for none. */
  owner: Int32Array;
  /** The level − 1 face containing it; −1 at L0. */
  parent: Int32Array;
  /** Rank (§4.1 order) of the stage whose batch created or last re-owned the face: the kept-content rule (§3.3). */
  stage: Uint8Array;
  /** The next face of the same owner at this level, −1 at the end (on the free list: the next free slot). */
  nextOfOwner: Int32Array;
  /** Owner handle → first face of that owner at this level. */
  ownerHead: OwnerTable;
}

/** (role, entity, level, ordinal) rows on edge pairs and vertices, with a reverse index (rule 7). */
export interface RoleTable {
  /** Per edge pair: the first row of its set, −1 if none. */
  edgeFirst: Int32Array;
  /** Per vertex: the first row of its set, −1 if none. */
  vertexFirst: Int32Array;
  /** The role's id in the registry (its interned RoleName); FREE_KIND on the free list. */
  kind: Uint16Array;
  /** The entity's interned handle. */
  entity: Int32Array;
  /** The level of the batch that added it. */
  level: Uint8Array;
  /** 0 unless the registry declares the role indexed (rule 7). */
  ordinal: Uint16Array;
  /**
   * The next row of the same set; the set's last row holds −2 − e, e the edge pair or vertex the set belongs to, so a
   * row finds its element by walking to the end of its set (sets are small) — C-0146 (3).
   */
  nextInSet: Int32Array;
  /** The next row with the same (role, entity, ordinal), −1 at the end (on the free list: the next free slot). */
  nextSameKey: Int32Array;
  head: RoleHeadTable;
}

/** Per slot: the static index partition whose build holds the item, −1 if none (§3.3; written by M0-a-03). */
export interface IndexHome {
  vertex: Int16Array;
  /** Per edge pair. */
  edge: Int16Array;
  /** Per level, per face slot. */
  face: Five<Int16Array>;
}

/** One table's slot bookkeeping: the high-water mark, the free-list head (−1 when empty) and the live count. */
export interface SlotCounter {
  top: number;
  free: number;
  live: number;
}

/** The arena's slot bookkeeping (C-0146 (1)): kernel-internal, never persisted (§3.9 compacts slots on save). */
export interface PlatSlots {
  vertex: SlotCounter;
  /** Edge pairs. */
  pair: SlotCounter;
  face: Five<SlotCounter>;
  role: SlotCounter;
  /** Per level: the used length of `LevelFaces.holes`. */
  holesTop: Five<number>;
}

/** One arena (§2.2). Typed-array tables only: no Map or Set is reachable from a Plat (§13.1's frozen-copy property). */
export interface Plat {
  readonly key: PlatKey;
  /** §3.2 (9): set at creation; replaceable by the frame growth of an epoch (M4) or a Re-derive. */
  frame: Frame;
  /** Fixed for the arena's life (§3.2 (1), §3.11). */
  readonly lattice: LatticeSpec;
  vertices: VertexTable;
  halfEdges: HalfEdgeTable;
  roles: RoleTable;
  faces: Five<LevelFaces>;
  indexHome: IndexHome;
  /** Every committed batch bumps it. */
  version: number;
  /** The interned-handle table of the entities this arena's rows and owners name (C-0146 (1)). */
  handles: HandleTable;
  slots: PlatSlots;
}

/**
 * Initial table sizes; each grows by doubling.
 *
 * THE RE-READ RULE (N-53 (4), C-XXXX). A doubling REPLACES the table it grows: `allocVertex` assigns a new
 * `p.vertices` (and new `p.roles.vertexFirst`, `p.indexHome.vertex`), `allocEdgePair` a new `p.halfEdges` (and
 * `p.roles.edgeFirst`, `p.indexHome.edge`), `allocFace` new columns of `p.faces[level]` (and `p.indexHome.face[level]`),
 * a role row new columns of the one `p.roles` object, `setFaceHoles` a new `holes` pool, an owner, role-head or handle
 * insert new arrays inside its table. So a writer re-reads `p.vertices`, `p.halfEdges` and every column after ANY
 * allocation: a table or column captured before one is a dead copy once it grows, and writes to it are lost (the
 * stale capture behind M0-x-06's rotation crashes, N-53 (1)). A writer that needs several slots allocates them all
 * first, then reads the tables once. The tiny-tables mode (`setTinyTables`, debug.ts; PLAT_TINY_TABLES=1 in the tests)
 * starts every table at capacity 1 and grows a slot table by one slot, so every allocation replaces its table and
 * every writer meets the rule at once.
 */
export interface PlatCapacity {
  vertices: number;
  edgePairs: number;
  /** Face slots per level (one number for every level, or five). */
  faces: number | Five<number>;
  roleRows: number;
  /** Distinct (role, entity, ordinal) keys the role-head table holds at load ≤ 0.5. */
  roleKeys: number;
  /** Distinct owners per level the owner tables hold at load ≤ 0.5. */
  owners: number | Five<number>;
  /** Interned entities. */
  handles: number;
  /** UTF-16 code units of their address ids. */
  idUnits: number;
  /** Entries of each level's hole pool. */
  holes: number;
}

const DEFAULT_CAPACITY: PlatCapacity = {
  vertices: 64, edgePairs: 64, faces: 16, roleRows: 64, roleKeys: 16, owners: 8, handles: 16, idUnits: 256, holes: 16,
};

function five(v: number | Five<number>): Five<number> {
  return typeof v === 'number' ? [v, v, v, v, v] : v;
}

function positive(n: number, what: string): number {
  check(Number.isInteger(n) && n >= 1 && n <= 0x40000000, `${what} must be a positive integer`);
  return n;
}

function filled32(n: number, v: number): Int32Array {
  return new Int32Array(n).fill(v);
}

function filled16(n: number, v: number): Int16Array {
  return new Int16Array(n).fill(v);
}

function levelFaces(cap: number, ownerCap: number, holes: number): LevelFaces {
  return {
    outer: filled32(cap, -1),
    holesStart: filled32(cap, -1),
    holes: filled32(holes, -1),
    kind: new Uint16Array(cap).fill(FREE_KIND),
    owner: filled32(cap, -1),
    parent: filled32(cap, -1),
    stage: new Uint8Array(cap),
    nextOfOwner: filled32(cap, -1),
    ownerHead: createOwnerTable(ownerCap),
  };
}

function counter(): SlotCounter {
  return { top: 0, free: -1, live: 0 };
}

/** Is `level` one of the five levels? */
export function isLevel(level: number): level is Level {
  return level === 0 || level === 1 || level === 2 || level === 3 || level === 4;
}

/** Is `key` a well-formed PlatKey (a layer and a part number ≥ 0)? */
export function isPlatKey(key: PlatKey): boolean {
  return (key.layer === 'ground' || key.layer === 'underground' || key.layer === 'sky')
    && Number.isInteger(key.part) && key.part >= 0 && key.part <= 0x7fffffff;
}

/** Do two keys name one arena? */
export function sameKey(a: PlatKey, b: PlatKey): boolean {
  return a.layer === b.layer && a.part === b.part;
}

/**
 * An empty arena for `key` over `frame`, with the fixed lattice (§3.2 (1)): no vertex, no edge, no face, no role row,
 * version 0. Its outer ring is written by the first batch (S1's, §4.1). `capacity` sizes the tables (each still grows
 * by doubling — mind the re-read rule above `PlatCapacity`); the defaults are small. In the tiny-tables mode every
 * table starts at capacity 1 whatever `capacity` asks (N-53 (4), C-XXXX); a malformed `capacity` is still refused.
 */
export function createPlat(key: PlatKey, frame: Frame, capacity: Partial<PlatCapacity> = {}): Plat {
  check(isPlatKey(key), 'a PlatKey is a layer and a part number ≥ 0');
  check(Number.isInteger(frame.widthCm) && frame.widthCm > 0 && Number.isInteger(frame.heightCm) && frame.heightCm > 0,
    'a frame has positive whole-centimetre sides');
  check(frame.aspect >= 0.5 && frame.aspect <= 2, 'a frame aspect lies in [0.5, 2]');
  check(Number.isFinite(frame.marginShare) && frame.marginShare >= 0, 'a frame margin share is finite and ≥ 0');
  const c: PlatCapacity = {
    vertices: capacity.vertices ?? DEFAULT_CAPACITY.vertices,
    edgePairs: capacity.edgePairs ?? DEFAULT_CAPACITY.edgePairs,
    faces: capacity.faces ?? DEFAULT_CAPACITY.faces,
    roleRows: capacity.roleRows ?? DEFAULT_CAPACITY.roleRows,
    roleKeys: capacity.roleKeys ?? DEFAULT_CAPACITY.roleKeys,
    owners: capacity.owners ?? DEFAULT_CAPACITY.owners,
    handles: capacity.handles ?? DEFAULT_CAPACITY.handles,
    idUnits: capacity.idUnits ?? DEFAULT_CAPACITY.idUnits,
    holes: capacity.holes ?? DEFAULT_CAPACITY.holes,
  };
  // Every size is checked first, so the tiny-tables mode refuses what the default mode refuses.
  const tiny = tinyTables();
  const size = (n: number, what: string): number => {
    positive(n, what);
    return tiny ? 1 : n;
  };
  const nv = size(c.vertices, 'capacity.vertices');
  const np = size(c.edgePairs, 'capacity.edgePairs');
  const nf = five(c.faces).map((n) => size(n, 'capacity.faces')) as Five<number>;
  const no = five(c.owners).map((n) => positive(n, 'capacity.owners')) as Five<number>;
  const nr = size(c.roleRows, 'capacity.roleRows');
  const nh = size(c.holes, 'capacity.holes');
  const nk = positive(c.roleKeys, 'capacity.roleKeys');
  const ni = size(c.handles, 'capacity.handles');
  const nu = size(c.idUnits, 'capacity.idUnits');
  // A hash table's capacity: the least that holds its keys at load ≤ 0.5 — or 1 in the tiny mode (its first insert doubles it).
  const hashCap = (keys: number): number => (tiny ? 1 : tableCapacityFor(keys));
  return {
    key: { layer: key.layer, part: key.part },
    frame: { widthCm: frame.widthCm, heightCm: frame.heightCm, aspect: frame.aspect, marginShare: frame.marginShare },
    lattice: LATTICE,
    vertices: { x: new Int32Array(nv), y: new Int32Array(nv), out: filled32(nv, -1), level: new Uint8Array(nv), flags: new Uint8Array(nv).fill(VERTEX_FREE) },
    halfEdges: { origin: filled32(2 * np, -1), next: filled32(2 * np, -1), prev: filled32(2 * np, -1), level: new Uint8Array(np) },
    roles: {
      edgeFirst: filled32(np, -1),
      vertexFirst: filled32(nv, -1),
      kind: new Uint16Array(nr).fill(FREE_KIND),
      entity: filled32(nr, -1),
      level: new Uint8Array(nr),
      ordinal: new Uint16Array(nr),
      nextInSet: filled32(nr, -1),
      nextSameKey: filled32(nr, -1),
      head: createRoleHeadTable(hashCap(nk)),
    },
    faces: [0, 1, 2, 3, 4].map((l) => levelFaces(nf[l], hashCap(no[l]), nh)) as Five<LevelFaces>,
    indexHome: { vertex: filled16(nv, -1), edge: filled16(np, -1), face: [0, 1, 2, 3, 4].map((l) => filled16(nf[l], -1)) as Five<Int16Array> },
    version: 0,
    handles: createHandleTable(ni, nu),
    slots: { vertex: counter(), pair: counter(), face: [counter(), counter(), counter(), counter(), counter()], role: counter(), holesTop: [0, 0, 0, 0, 0] },
  };
}

// ---- growth -------------------------------------------------------------------------------------------------------
// Each grow function REPLACES the arrays it grows (content copied, the new slots filled free / empty): a writer
// re-reads the tables after any allocation — the re-read rule above `PlatCapacity` (N-53 (4)). A slot table doubles;
// in the tiny-tables mode it grows by exactly one slot, so it is always full and EVERY allocation replaces it (C-XXXX).

/** A slot table's next capacity: double, or one more slot in the tiny-tables mode. */
function grownCap(length: number): number {
  return tinyTables() ? length + 1 : length * 2;
}

function grow32(a: Int32Array, cap: number, fill: number): Int32Array {
  const b = new Int32Array(cap);
  b.set(a);
  if (fill !== 0) b.fill(fill, a.length);
  return b;
}

function grow16(a: Int16Array, cap: number, fill: number): Int16Array {
  const b = new Int16Array(cap);
  b.set(a);
  if (fill !== 0) b.fill(fill, a.length);
  return b;
}

function growU16(a: Uint16Array, cap: number, fill: number): Uint16Array {
  const b = new Uint16Array(cap);
  b.set(a);
  if (fill !== 0) b.fill(fill, a.length);
  return b;
}

function growU8(a: Uint8Array, cap: number, fill: number): Uint8Array {
  const b = new Uint8Array(cap);
  b.set(a);
  if (fill !== 0) b.fill(fill, a.length);
  return b;
}

function growVertices(p: Plat): void {
  const cap = grownCap(p.vertices.x.length);
  const v = p.vertices;
  p.vertices = { x: grow32(v.x, cap, 0), y: grow32(v.y, cap, 0), out: grow32(v.out, cap, -1), level: growU8(v.level, cap, 0), flags: growU8(v.flags, cap, VERTEX_FREE) };
  p.roles.vertexFirst = grow32(p.roles.vertexFirst, cap, -1);
  p.indexHome.vertex = grow16(p.indexHome.vertex, cap, -1);
}

function growPairs(p: Plat): void {
  const cap = grownCap(p.halfEdges.level.length);
  const h = p.halfEdges;
  p.halfEdges = { origin: grow32(h.origin, 2 * cap, -1), next: grow32(h.next, 2 * cap, -1), prev: grow32(h.prev, 2 * cap, -1), level: growU8(h.level, cap, 0) };
  p.roles.edgeFirst = grow32(p.roles.edgeFirst, cap, -1);
  p.indexHome.edge = grow16(p.indexHome.edge, cap, -1);
}

function growFaces(p: Plat, level: Level): void {
  const f = p.faces[level];
  const cap = grownCap(f.outer.length);
  f.outer = grow32(f.outer, cap, -1);
  f.holesStart = grow32(f.holesStart, cap, -1);
  f.kind = growU16(f.kind, cap, FREE_KIND);
  f.owner = grow32(f.owner, cap, -1);
  f.parent = grow32(f.parent, cap, -1);
  f.stage = growU8(f.stage, cap, 0);
  f.nextOfOwner = grow32(f.nextOfOwner, cap, -1);
  p.indexHome.face[level] = grow16(p.indexHome.face[level], cap, -1);
}

/** Grows the role-row columns — doubles them, or one row more in the tiny-tables mode (rows.ts allocates; the table is the arena's). */
export function growRoleRows(p: Plat): void {
  const r = p.roles;
  const cap = grownCap(r.kind.length);
  r.kind = growU16(r.kind, cap, FREE_KIND);
  r.entity = grow32(r.entity, cap, -1);
  r.level = growU8(r.level, cap, 0);
  r.ordinal = growU16(r.ordinal, cap, 0);
  r.nextInSet = grow32(r.nextInSet, cap, -1);
  r.nextSameKey = grow32(r.nextSameKey, cap, -1);
}

// ---- liveness -----------------------------------------------------------------------------------------------------

/** Is `v` a live vertex slot? */
export function isVertexLive(p: Plat, v: VertexId): boolean {
  return Number.isInteger(v) && v >= 0 && v < p.slots.vertex.top && (p.vertices.flags[v] & VERTEX_FREE) === 0;
}

/** Is `h` a half-edge of a live pair? */
export function isHalfEdgeLive(p: Plat, h: HalfEdgeId): boolean {
  return Number.isInteger(h) && h >= 0 && h >> 1 < p.slots.pair.top && p.halfEdges.origin[h & ~1] !== -1;
}

/** Is `f` a live face slot of `level`? */
export function isFaceLive(p: Plat, level: Level, f: FaceId): boolean {
  return Number.isInteger(f) && f >= 0 && f < p.slots.face[level].top && p.faces[level].kind[f] !== FREE_KIND;
}

/** The half-edge's twin (§2.2: allocated in pairs). */
export function twin(h: HalfEdgeId): HalfEdgeId {
  return h ^ 1;
}

/** The vertex a half-edge ends at. */
export function dest(p: Plat, h: HalfEdgeId): VertexId {
  return p.halfEdges.origin[h ^ 1];
}

/** A pair's birth level, read from either of its half-edges. */
export function edgeLevel(p: Plat, h: HalfEdgeId): Level {
  return p.halfEdges.level[h >> 1] as Level;
}

/** A vertex's lattice point. */
export function pointOf(p: Plat, v: VertexId): LatticePoint {
  return { x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint;
}

// ---- raw slot primitives ------------------------------------------------------------------------------------------

/**
 * A vertex slot at lattice point `at` with birth `level` and `flags` (no free bit): the free list's head, else the
 * next slot above the high-water mark (the tables doubling when full). Its `out` is −1 and it carries no row. A raw
 * primitive: the insertion (M0-a-04, M0-a-05) decides where vertices go; this only stores one.
 */
export function allocVertex(p: Plat, at: LatticePoint, level: Level, flags = 0): VertexId {
  check(Number.isInteger(at.x) && Number.isInteger(at.y) && Math.abs(at.x) < p.lattice.rangeCm && Math.abs(at.y) < p.lattice.rangeCm,
    'a vertex stands on a lattice point inside the range invariant (§3.2 (1); snap is the door)');
  check(isLevel(level), 'a birth level is 0 … 4');
  check(Number.isInteger(flags) && flags >= 0 && flags < VERTEX_FREE, 'vertex flags are pinned | steiner | split');
  const s = p.slots.vertex;
  let v: VertexId;
  if (s.free !== -1) {
    v = s.free;
    s.free = p.vertices.out[v];
  } else {
    if (s.top === p.vertices.x.length) growVertices(p);
    v = s.top++;
  }
  const t = p.vertices;
  t.x[v] = at.x;
  t.y[v] = at.y;
  t.out[v] = -1;
  t.level[v] = level;
  t.flags[v] = flags;
  p.roles.vertexFirst[v] = -1;
  p.indexHome.vertex[v] = -1;
  s.live++;
  return v;
}

/** Returns a vertex slot to the free list; the vertex must carry no role row. */
export function freeVertex(p: Plat, v: VertexId): void {
  check(isVertexLive(p, v), `vertex ${v} is not live`);
  check(p.roles.vertexFirst[v] === -1, `vertex ${v} still carries role rows`);
  const s = p.slots.vertex;
  p.vertices.flags[v] = VERTEX_FREE;
  p.vertices.out[v] = s.free;
  p.vertices.level[v] = 0;
  s.free = v;
  s.live--;
}

/**
 * An edge pair from `a` to `b` with birth `level`; returns its even half-edge (origin a; its twin's origin b). `next`
 * and `prev` are −1 — linking the pair into the vertex rotations is the insertion's (M0-a-05) — and it carries no row.
 */
export function allocEdgePair(p: Plat, a: VertexId, b: VertexId, level: Level): HalfEdgeId {
  check(isVertexLive(p, a) && isVertexLive(p, b), 'an edge joins two live vertices');
  check(a !== b, 'an edge joins two distinct vertices');
  check(isLevel(level), 'a birth level is 0 … 4');
  const s = p.slots.pair;
  let e: number;
  if (s.free !== -1) {
    e = s.free;
    s.free = p.halfEdges.next[2 * e];
  } else {
    if (s.top === p.halfEdges.level.length) growPairs(p);
    e = s.top++;
  }
  const h = 2 * e;
  const t = p.halfEdges;
  t.origin[h] = a;
  t.origin[h + 1] = b;
  t.next[h] = -1;
  t.next[h + 1] = -1;
  t.prev[h] = -1;
  t.prev[h + 1] = -1;
  t.level[e] = level;
  p.roles.edgeFirst[e] = -1;
  p.indexHome.edge[e] = -1;
  s.live++;
  return h;
}

/** Returns an edge pair (named by either half-edge) to the free list; it must carry no role row. */
export function freeEdgePair(p: Plat, h: HalfEdgeId): void {
  check(isHalfEdgeLive(p, h), `half-edge ${h} is not live`);
  const e = h >> 1;
  check(p.roles.edgeFirst[e] === -1, `edge pair ${e} still carries role rows`);
  const s = p.slots.pair;
  const t = p.halfEdges;
  t.origin[2 * e] = -1;
  t.origin[2 * e + 1] = -1;
  t.next[2 * e] = s.free;
  t.next[2 * e + 1] = -1;
  t.prev[2 * e] = -1;
  t.prev[2 * e + 1] = -1;
  t.level[e] = 0;
  s.free = e;
  s.live--;
}

/** The fields a face record starts with (§2.2). */
export interface FaceInit {
  /** A half-edge of its outer ring, of this level or coarser, the face on its left. */
  outer: HalfEdgeId;
  kind: number;
  /** Interned entity handle, or −1 for none. */
  owner: Handle;
  /** The stage rank (§4.1 order; its table is M0-x-02's). */
  stage: number;
  /** The level − 1 face containing it; −1 at L0. */
  parent: FaceId;
}

/** A face record at `level` (no holes); linked into its owner's list. A raw primitive: the re-walk is M0-a-05's. */
export function allocFace(p: Plat, level: Level, init: FaceInit): FaceId {
  check(isLevel(level), 'a face level is 0 … 4');
  check(isHalfEdgeLive(p, init.outer) && p.halfEdges.level[init.outer >> 1] <= level,
    'a face\'s outer half-edge is live and of its level or coarser');
  check(Number.isInteger(init.kind) && init.kind >= 0 && init.kind < FREE_KIND, 'a face kind is a u16 below 0xffff');
  check(Number.isInteger(init.stage) && init.stage >= 0 && init.stage <= 255, 'a stage rank is a u8');
  check(init.owner === -1 || (Number.isInteger(init.owner) && init.owner >= 0 && init.owner < p.handles.count), 'a face owner is an interned handle or −1');
  if (level === 0) check(init.parent === -1, 'an L0 face has no parent');
  else check(isFaceLive(p, (level - 1) as Level, init.parent), 'a face\'s parent is a live face one level coarser');
  // The owner's head, read before the slot is taken: the lookup a malformed (full) owner table refuses, so the linking
  // below cannot refuse after the face is written (C-0149 (2)).
  if (init.owner !== -1) ownerGet(p.faces[level].ownerHead, init.owner);
  const s = p.slots.face[level];
  const t = p.faces[level];
  let f: FaceId;
  if (s.free !== -1) {
    f = s.free;
    s.free = t.nextOfOwner[f];
  } else {
    if (s.top === t.outer.length) growFaces(p, level);
    f = s.top++;
  }
  t.outer[f] = init.outer;
  t.holesStart[f] = -1;
  t.kind[f] = init.kind;
  t.owner[f] = -1;
  t.parent[f] = init.parent;
  t.stage[f] = init.stage;
  t.nextOfOwner[f] = -1;
  p.indexHome.face[level][f] = -1;
  s.live++;
  if (init.owner !== -1) setFaceOwner(p, level, f, init.owner);
  return f;
}

/** Returns a face slot to the free list, unlinking it from its owner's list. */
export function freeFace(p: Plat, level: Level, f: FaceId): void {
  check(isFaceLive(p, level, f), `face ${f} is not live at L${level}`);
  setFaceOwner(p, level, f, -1);
  const s = p.slots.face[level];
  const t = p.faces[level];
  t.outer[f] = -1;
  t.holesStart[f] = -1;
  t.kind[f] = FREE_KIND;
  t.parent[f] = -1;
  t.stage[f] = 0;
  t.nextOfOwner[f] = s.free;
  s.free = f;
  s.live--;
}

/** The faces of an owner at a level, in list order (kernel-internal; `resolve` returns them canonically). */
export function facesOfOwner(p: Plat, level: Level, owner: Handle): FaceId[] {
  const t = p.faces[level];
  const out: FaceId[] = [];
  if (owner < 0) return out;
  for (let f = ownerGet(t.ownerHead, owner); f !== -1; f = t.nextOfOwner[f]) {
    out.push(f);
    check(out.length <= p.slots.face[level].top, `the L${level} face list of owner ${owner} does not end`);
  }
  return out;
}

/**
 * Re-links a face under `owner` (−1: no owner) in the level's owner table: the table maintenance under the door
 * `setOwner` (M0-a-06), which also sets the stage rank and records the change. Everything that can refuse is read
 * first — the new owner's head (a full owner table without it is refused) and the face's predecessor in its old
 * owner's list (a list that does not end, or does not hold the face, is refused) — and the one write that can refuse,
 * deleting the old owner from a full table, comes first (C-0149 (2)).
 */
export function setFaceOwner(p: Plat, level: Level, f: FaceId, owner: Handle): void {
  check(isFaceLive(p, level, f), `face ${f} is not live at L${level}`);
  check(owner === -1 || (Number.isInteger(owner) && owner >= 0 && owner < p.handles.count), 'a face owner is an interned handle or −1');
  const t = p.faces[level];
  const old = t.owner[f];
  if (old === owner) return;
  const newFirst = owner === -1 ? -1 : ownerGet(t.ownerHead, owner);
  let pred = -1; // the face before f in its old owner's list; −1 when f heads it
  if (old !== -1) {
    const first = ownerGet(t.ownerHead, old);
    if (first !== f) {
      // A list holds at most every face slot of the level once: a longer walk has met a cycle (C-0146 (10)).
      let g = first;
      let steps = 0;
      while (t.nextOfOwner[g] !== f) {
        check(t.nextOfOwner[g] >= 0, `face ${f} is missing from its owner's list`);
        check(++steps <= p.slots.face[level].top, `the L${level} face list of owner ${old} does not end`);
        g = t.nextOfOwner[g];
      }
      pred = g;
    }
    if (pred !== -1) t.nextOfOwner[pred] = t.nextOfOwner[f];
    else if (t.nextOfOwner[f] === -1) ownerDelete(t.ownerHead, old);
    else ownerSet(t.ownerHead, old, t.nextOfOwner[f]);
  }
  // The old owner's entry and the new one's are distinct keys, so the unlink leaves `newFirst` current; and the new
  // owner's slot, found above or freed by the delete, is found again by `ownerSet` without refusal.
  t.owner[f] = owner;
  t.nextOfOwner[f] = newFirst;
  if (owner !== -1) ownerSet(t.ownerHead, owner, f);
}

/**
 * A face's run in the level's hole pool. Every run starts and ends (its −1) below the pool's used length
 * (`slots.holesTop`), so a run that reaches it has lost its terminator and is refused (C-0146 (10)).
 */
function holeRun(p: Plat, level: Level, f: FaceId): HalfEdgeId[] {
  const t = p.faces[level];
  const out: HalfEdgeId[] = [];
  const s = t.holesStart[f];
  if (s === -1) return out;
  const used = p.slots.holesTop[level];
  check(Number.isInteger(s) && s >= 0 && s < used, `face ${f}'s hole run starts outside the L${level} pool`);
  for (let i = s; ; i++) {
    check(i < used, `the L${level} hole run of face ${f} does not end`);
    const h = t.holes[i];
    if (h === -1) return out;
    out.push(h);
  }
}

/** The face's hole rings, one half-edge each (the face on its left), in stored order. */
export function faceHoles(p: Plat, level: Level, f: FaceId): HalfEdgeId[] {
  check(isFaceLive(p, level, f), `face ${f} is not live at L${level}`);
  return holeRun(p, level, f);
}

/**
 * Packs the live runs of a level's hole pool to its front, in face-slot order, leaving out face `skip`'s run (the run
 * `setFaceHoles` is replacing; its start ends −1); returns the used length. Every run is read before anything is
 * written, so a malformed run is refused with the pool and every start untouched. Live runs are disjoint and lie below
 * the used length, so they always fit the pool; runs that do not fit share entries, and are refused rather than cut.
 */
function compactHoles(p: Plat, level: Level, skip: FaceId): number {
  const t = p.faces[level];
  const top = p.slots.face[level].top;
  const packed = new Int32Array(t.holes.length).fill(-1);
  const starts = new Int32Array(top).fill(-1);
  let n = 0;
  for (let f = 0; f < top; f++) {
    if (f === skip || t.kind[f] === FREE_KIND || t.holesStart[f] === -1) continue;
    const run = holeRun(p, level, f);
    check(n + run.length < packed.length, `the L${level} hole runs do not fit the pool (two faces share entries)`);
    starts[f] = n;
    for (const h of run) packed[n++] = h;
    packed[n++] = -1;
  }
  t.holesStart.set(starts);
  t.holes = packed;
  p.slots.holesTop[level] = n;
  return n;
}

/**
 * Sets the face's hole rings (one half-edge each, of its level or coarser, the face on its left); an empty list
 * clears them. The run is appended to the level's pool (the old run left for the next compaction). The face's own
 * start is written only after the compaction — the one step that can refuse (another face's malformed run) — has
 * succeeded, so a refused call leaves the face's holes as they were (C-0149 (2)).
 */
export function setFaceHoles(p: Plat, level: Level, f: FaceId, holes: readonly HalfEdgeId[]): void {
  check(isFaceLive(p, level, f), `face ${f} is not live at L${level}`);
  for (const h of holes) check(isHalfEdgeLive(p, h) && p.halfEdges.level[h >> 1] <= level, 'a hole half-edge is live and of the face\'s level or coarser');
  const t = p.faces[level];
  if (holes.length === 0) {
    t.holesStart[f] = -1;
    return;
  }
  const need = holes.length + 1;
  let top = p.slots.holesTop[level];
  if (top + need > t.holes.length) {
    top = compactHoles(p, level, f);
    if (top + need > t.holes.length) {
      // doubled until the run fits — or exactly the run's room in the tiny-tables mode (C-XXXX)
      let cap = tinyTables() ? top + need : t.holes.length * 2;
      while (cap < top + need) cap *= 2;
      t.holes = grow32(t.holes, cap, -1);
    }
  }
  t.holesStart[f] = top;
  for (let i = 0; i < holes.length; i++) t.holes[top + i] = holes[i];
  t.holes[top + holes.length] = -1;
  p.slots.holesTop[level] = top + need;
}

/** Bumps the arena's version: the last act of a committed batch (M0-a-06's commit), which every stamp is read against. */
export function commitVersion(p: Plat): number {
  p.version++;
  return p.version;
}
