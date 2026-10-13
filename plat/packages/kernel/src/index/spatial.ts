// The spatial index (§3.3 *Spatial indexes*, *No item changes in place*, *Tombstones and rebuilds*; §2.2's
// `Plat.index` and `Plat.indexHome`; SCL-2, J-K6, J-K34). M0-a-03.
//
// Each level has (a) static packed partitions over flatbush — one per arena at L0–L1; at L2–L4 one per district plus
// one for everything outside districts — each with a tombstone set, and (b) one dynamic uniform grid. Partitions are
// numbered across the levels; an item's home entry (`Plat.indexHome`, the arena's column) names the partition whose
// build holds it, −1 if none. **No item changes in place:** every item a batch deletes, re-levels, changes or moves to
// another partition is tombstoned in the partition its home entry names (the entry then reads −1) and its successor, if
// any, is inserted in the grid of its current level; tombstones filter their partition's hits only, never the grid, so
// a slot freed and reused, or an item that changed level, is answered by its new self and never by the stale static
// copy. A partition's rebuild indexes the live items that belong to it — its untombstoned static items and the grid's
// items that will join it — sets their home entries, removes them from the grid and empties its tombstone set; it runs
// at three moments, never per batch: a stage's end, an editing session's grid overflow past max(256, ¼ of the static
// size), and a pool freeze (the hook here; the pool and its frozen copy are M1's, §4b).
//
// Readings recorded in C-0160: the index hangs on the arena as `Plat.index` (declared here by interface merging, as
// C-0146 (1) leaves it), attached by `attachIndex` with the grid cells the caller reads from the lattice table and the
// district membership S6 supplies (built now by partition key; every L2–L4 item outside districts until M0-e-04 hands a
// resolver); a vertex on an L1 edge two partitions share — a resolver answering several keys — goes to the smaller key.
import { packBoxes, searchPacked, type PackedTree } from '../adapters/flatbush.js';
import { compareKeys, LEVELS, type Five, type Plat } from '../arena/index.js';
import type { Level } from '../types/index.js';
import { createGrid, gridPut, gridTake, type UniformGrid } from './grid.js';
import {
  check,
  homeOf,
  isItemLive,
  itemBox,
  itemKey,
  keyKind,
  keySlot,
  levelItems,
  setHome,
  type Box,
  type ItemKind,
  type ItemRef,
} from './items.js';

/** The partition key of everything outside districts at L2–L4, and of the one partition of each of L0 and L1. */
export const OUTSIDE = '';

/** The work-limit counter a rebuild charges (M0.md §2.2's `index.rebuilds`, unit `faces`). */
export const INDEX_REBUILDS = 'index.rebuilds';

/** The largest partition number the home column holds (an Int16; −1 = none). */
export const MAX_PARTITIONS = 32_767;

/** The floor of rebuild moment (2)'s overflow threshold: max(256, ¼ of the static size). */
export const OVERFLOW_FLOOR = 256;

/**
 * S6's district membership of an L2–L4 item (M0-e-04 supplies it): its district's partition key — a district's
 * address id — or `OUTSIDE`; several keys when the item lies on an L1 edge two partitions share, the smaller of which
 * takes it (§3.3, as §3.9's chunks do).
 */
export type PartitionResolver = (p: Plat, item: ItemRef) => string | readonly string[];

/** What `attachIndex` reads. */
export interface IndexConfig {
  /**
   * The grid's cell per level in centimetres — the base settings row's `index.gridCellM` × 100, which the caller reads
   * from the lattice table (§3.3): one number for every level, or five.
   */
  gridCellCm: number | Five<number>;
  /** S6's district membership (default: every L2–L4 item outside districts). */
  partitionOf?: PartitionResolver;
}

/** One static partition (§2.2's `PackedIndex`): kernel-internal. */
export interface PackedIndex {
  /** Its number across the levels: the value its items' home entries hold. */
  readonly id: number;
  readonly level: Level;
  /** Its place in its level's `static` and `tombstones` lists. */
  readonly pos: number;
  /** `OUTSIDE` or a district's address id. */
  readonly key: string;
  /** The packed tree over its items, or null when it holds none. */
  tree: PackedTree | null;
  /** The item key of each tree entry, in the order the tree answers them. */
  keys: Float64Array;
  /** The keys of the grid's items that join it at its next rebuild — its grid overflow (rebuild moment (2)). */
  readonly pending: Set<number>;
}

/** §2.2's `LevelIndex`: a level's static partitions, its dynamic grid, and one tombstone set per partition. */
export interface LevelIndex {
  readonly static: PackedIndex[];
  readonly dynamic: UniformGrid;
  readonly tombstones: Set<number>[];
}

/** The rebuild work charged so far: the `index.rebuilds` counter and the items the rebuilds indexed. */
export interface IndexWork {
  rebuilds: number;
  items: number;
}

/** One write of the index, recorded while a batch log is open (§3.10's index levels and freshness row). */
export interface IndexWrite {
  readonly op: 'tombstone' | 'insert' | 'delete';
  readonly kind: ItemKind;
  readonly level: Level;
  readonly slot: number;
  /** The partition tombstoned in or joined; −1 for a delete. */
  readonly partition: number;
}

/** The index writes of one batch (`beginIndexBatch` … `endIndexBatch`). */
export interface IndexBatchLog {
  readonly level: Level;
  readonly writes: IndexWrite[];
}

/** One arena's spatial index: the five `LevelIndex` of §2.2's `Plat.index`, the partitions by number, the work. */
export interface SpatialIndex {
  readonly levels: Five<LevelIndex>;
  /** Every partition by its number (across the levels). */
  readonly partitions: PackedIndex[];
  /** Per level: partition key → partition number. */
  readonly byKey: Five<Map<string, number>>;
  readonly partitionOf: PartitionResolver | null;
  readonly work: IndexWork;
  log: IndexBatchLog | null;
}

declare module '../arena/plat.js' {
  interface Plat {
    /** §2.2's `Plat.index` (§3.3): attached by `attachIndex` (M0-a-03; C-0146 (1), C-0160). */
    index?: SpatialIndex;
  }
}

function five(v: number | Five<number>): Five<number> {
  return typeof v === 'number' ? [v, v, v, v, v] : v;
}

/** The arena's index; an arena with none attached is a programming error. */
export function indexOf(p: Plat): SpatialIndex {
  const idx = p.index;
  check(idx !== undefined, 'the arena has no spatial index (attachIndex)');
  return idx;
}

function record(idx: SpatialIndex, op: IndexWrite['op'], item: ItemRef, level: Level, partition: number): void {
  if (idx.log !== null) idx.log.writes.push({ op, kind: item.kind, level, slot: item.slot, partition });
}

/** The partition of `level` with `key`, made empty when it does not exist yet. */
function partitionFor(idx: SpatialIndex, level: Level, key: string): PackedIndex {
  const known = idx.byKey[level].get(key);
  if (known !== undefined) return idx.partitions[known];
  const id = idx.partitions.length;
  check(id <= MAX_PARTITIONS, `more than ${MAX_PARTITIONS + 1} static partitions`);
  const L = idx.levels[level];
  const part: PackedIndex = { id, level, pos: L.static.length, key, tree: null, keys: new Float64Array(0), pending: new Set() };
  L.static.push(part);
  L.tombstones.push(new Set());
  idx.partitions.push(part);
  idx.byKey[level].set(key, id);
  return part;
}

/** The partition key an item belongs to now: the one of its level at L0–L1; S6's district (the smaller key) at L2–L4. */
export function partitionKeyOf(p: Plat, item: ItemRef): string {
  const idx = indexOf(p);
  if (item.level <= 1 || idx.partitionOf === null) return OUTSIDE;
  const answer = idx.partitionOf(p, item);
  if (typeof answer === 'string') return answer;
  check(answer.length >= 1, 'a partition resolver answers at least one key');
  let best = answer[0];
  for (const k of answer) if (compareKeys(k, best) < 0) best = k;
  return best;
}

/** The partition with this number. */
export function partitionById(p: Plat, id: number): PackedIndex {
  const idx = indexOf(p);
  check(Number.isInteger(id) && id >= 0 && id < idx.partitions.length, `no static partition ${id}`);
  return idx.partitions[id];
}

/** A partition's tombstone set. */
export function tombstonesOf(p: Plat, part: PackedIndex): Set<number> {
  return indexOf(p).levels[part.level].tombstones[part.pos];
}

/**
 * Attaches an empty index to the arena and builds every partition from its live items (the load's rebuild, §3.9): every
 * home entry is reset first, so a re-attached arena starts from its geometry alone. Returns the index.
 */
export function attachIndex(p: Plat, config: IndexConfig): SpatialIndex {
  const cells = five(config.gridCellCm);
  const levels = cells.map((c) => ({ static: [], dynamic: createGrid(c), tombstones: [] })) as unknown as Five<LevelIndex>;
  const idx: SpatialIndex = {
    levels,
    partitions: [],
    byKey: [new Map(), new Map(), new Map(), new Map(), new Map()],
    partitionOf: config.partitionOf ?? null,
    work: { rebuilds: 0, items: 0 },
    log: null,
  };
  p.index = idx;
  p.indexHome.vertex.fill(-1);
  p.indexHome.edge.fill(-1);
  for (const col of p.indexHome.face) col.fill(-1);
  for (const level of LEVELS) for (const item of levelItems(p, level)) gridInsert(p, item);
  rebuildDirty(p);
  return idx;
}

// ---- the item-tombstone rule ----------------------------------------------------------------------------------------

/**
 * Tombstones the item's static copy, if its slot's home entry names one: its key joins that partition's tombstone set
 * and the entry then reads −1 (§3.3). Returns the partition, or −1 when the item had no static copy. Call it before the
 * item's slot is reallocated (the arena resets the entry of a slot it hands out again).
 */
export function tombstone(p: Plat, item: ItemRef): number {
  const idx = indexOf(p);
  const home = homeOf(p, item);
  if (home === -1) return -1;
  const part = partitionById(p, home);
  check(part.level === item.level, `item ${item.kind}:${item.slot}'s home is a partition of L${part.level}, not L${item.level}`);
  idx.levels[part.level].tombstones[part.pos].add(itemKey(item.kind, item.slot));
  setHome(p, item, -1);
  record(idx, 'tombstone', item, part.level, home);
  return home;
}

/**
 * Inserts the live item, as it is now, in the grid of its level (replacing an entry with its key): its box from the
 * arena, its partition from its membership. An item whose static copy is not tombstoned would answer twice — that is
 * an item changing in place, refused.
 */
export function gridInsert(p: Plat, item: ItemRef): void {
  const idx = indexOf(p);
  check(isItemLive(p, item), `item ${item.kind}:${item.slot} is not live at L${item.level}`);
  check(homeOf(p, item) === -1, `item ${item.kind}:${item.slot} at L${item.level} still has a static copy: tombstone it first (no item changes in place)`);
  const key = itemKey(item.kind, item.slot);
  const part = partitionFor(idx, item.level, partitionKeyOf(p, item));
  const old = gridPut(idx.levels[item.level].dynamic, key, part.id, itemBox(p, item));
  if (old !== undefined) idx.partitions[old.partition].pending.delete(key);
  part.pending.add(key);
  record(idx, 'insert', item, item.level, part.id);
}

/** Deletes the item from the grid of `item.level`; false when the grid held none. */
export function gridDelete(p: Plat, item: ItemRef): boolean {
  const idx = indexOf(p);
  const key = itemKey(item.kind, item.slot);
  const old = gridTake(idx.levels[item.level].dynamic, key);
  if (old === undefined) return false;
  idx.partitions[old.partition].pending.delete(key);
  record(idx, 'delete', item, item.level, -1);
  return true;
}

/** A new item (a fresh slot, or one freed and reused): into the grid of its level. */
export function indexAdd(p: Plat, item: ItemRef): void {
  gridInsert(p, item);
}

/** An item changed at its level or moved to another partition: its static copy tombstoned, its successor in the grid. */
export function indexChange(p: Plat, item: ItemRef): void {
  tombstone(p, item);
  gridInsert(p, item);
}

/** A deleted item (call it before its slot is reallocated): its static copy tombstoned, its grid entry removed. */
export function indexDelete(p: Plat, item: ItemRef): void {
  tombstone(p, item);
  gridDelete(p, item);
}

/** A promoted or demoted item, now of `item.level`, before of `from`: tombstoned, out of `from`'s grid, into its own. */
export function indexRelevel(p: Plat, item: ItemRef, from: Level): void {
  tombstone(p, { kind: item.kind, level: from, slot: item.slot });
  gridDelete(p, { kind: item.kind, level: from, slot: item.slot });
  gridInsert(p, item);
}

// ---- rebuilds ----------------------------------------------------------------------------------------------------

/**
 * Rebuilds one partition from the live items that belong to it — its untombstoned static items and the grid's items
 * that join it — writing their home entries, removing them from the grid and emptying its tombstone set. Charges one
 * `index.rebuilds`. Returns the number of items it now holds. The rebuild changes no query's answer (§13.1).
 */
export function rebuildPartition(p: Plat, id: number): number {
  const idx = indexOf(p);
  const part = partitionById(p, id);
  const L = idx.levels[part.level];
  const dead = L.tombstones[part.pos];
  const keys: number[] = [];
  for (const k of part.keys) {
    if (dead.has(k)) continue;
    const item: ItemRef = { kind: keyKind(k), level: part.level, slot: keySlot(k) };
    check(homeOf(p, item) === id && isItemLive(p, item), `partition ${id} holds a stale item ${k} that no tombstone filters`);
    keys.push(k);
  }
  for (const k of part.pending) keys.push(k);
  keys.sort((a, b) => a - b);
  const boxes = new Float64Array(4 * keys.length);
  keys.forEach((k, i) => {
    const b: Box = itemBox(p, { kind: keyKind(k), level: part.level, slot: keySlot(k) });
    boxes[4 * i] = b.minX;
    boxes[4 * i + 1] = b.minY;
    boxes[4 * i + 2] = b.maxX;
    boxes[4 * i + 3] = b.maxY;
  });
  for (const k of part.pending) gridTake(L.dynamic, k);
  part.pending.clear();
  dead.clear();
  part.tree = keys.length === 0 ? null : packBoxes(boxes, keys.length);
  part.keys = Float64Array.from(keys);
  for (const k of keys) setHome(p, { kind: keyKind(k), level: part.level, slot: keySlot(k) }, id);
  idx.work.rebuilds++;
  idx.work.items += keys.length;
  return keys.length;
}

/** Is the partition dirty — items waiting in the grid to join it, or tombstones filtering it? */
export function isDirty(p: Plat, part: PackedIndex): boolean {
  return part.pending.size > 0 || tombstonesOf(p, part).size > 0;
}

/** Rebuilds every dirty partition (that `only` accepts), in partition-number order; returns how many it rebuilt. */
export function rebuildDirty(p: Plat, only?: (part: PackedIndex) => boolean): number {
  const idx = indexOf(p);
  let n = 0;
  for (const part of idx.partitions) {
    if (!isDirty(p, part) || (only !== undefined && !only(part))) continue;
    rebuildPartition(p, part.id);
    n++;
  }
  return n;
}

/**
 * Rebuild moment (1), a stage's end: an eager stage rebuilds every dirty partition once, after its last batch; a lazy or
 * pooled per-district stage passes its district, whose own L2–L4 partitions are rebuilt after that district's run.
 */
export function rebuildAtStageEnd(p: Plat, district?: string): number {
  if (district === undefined) return rebuildDirty(p);
  return rebuildDirty(p, (part) => part.level >= 2 && part.key === district);
}

/** Rebuild moment (2)'s threshold: a partition is rebuilt when its grid overflow exceeds max(256, ¼ of its static size). */
export function overflowThreshold(staticSize: number): number {
  return Math.max(OVERFLOW_FLOOR, Math.floor(staticSize / 4));
}

/** Rebuild moment (2), during an editing session (at a commit — a count, never an idle timer): the overflowing partitions. */
export function rebuildOverflowing(p: Plat): number {
  return rebuildDirty(p, (part) => part.pending.size > overflowThreshold(part.keys.length));
}

/**
 * Rebuild moment (3)'s hook, the pool freeze (§3.3 pool step 1): every partition whose grid share or tombstone set is
 * not empty is rebuilt, then every level's grid and every tombstone set is asserted empty (§3.10's frozen-base row).
 * The freeze itself, the copy and the pool are M1's (§4b). Returns the partitions rebuilt.
 */
export function rebuildForFreeze(p: Plat): number {
  const idx = indexOf(p);
  const n = rebuildDirty(p);
  for (const level of LEVELS) {
    const L = idx.levels[level];
    check(L.dynamic.entries.size === 0, `L${level}'s grid is not empty at the freeze`);
    for (const t of L.tombstones) check(t.size === 0, `an L${level} tombstone set is not empty at the freeze`);
  }
  return n;
}

// ---- the batch log (§3.10's index levels and freshness row) ----------------------------------------------------------

/** Opens the log of one batch's index writes (the transaction opens it at its start; M0-a-06). */
export function beginIndexBatch(p: Plat, level: Level): IndexBatchLog {
  const idx = indexOf(p);
  check(idx.log === null, 'an index batch log is already open');
  const log: IndexBatchLog = { level, writes: [] };
  idx.log = log;
  return log;
}

/** Closes the open batch log and returns it. */
export function endIndexBatch(p: Plat): IndexBatchLog {
  const idx = indexOf(p);
  const log = idx.log;
  check(log !== null, 'no index batch log is open');
  idx.log = null;
  return log;
}
