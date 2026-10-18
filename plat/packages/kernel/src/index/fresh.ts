// §3.10's "index levels and freshness" row, as checks the invariant suite wires (M0-a-14): a batch wrote no index of a
// level coarser than its own, except the promotions and demotions it made, and left no static item of what it deleted,
// re-levelled, changed or moved to another partition unfiltered — each is tombstoned in the partition its home entry
// named and its successor lives in the grid of its current level (§3.3). `checkIndexBatch` judges one batch from its
// index log and the commit record's facts; `checkIndexState` judges the whole index against the arena (every live item
// answered by exactly one structure, every static item current, every grid entry current) — O(arena), for stage ends
// and the fuzz. Both return their problems as text, empty when the row holds. M0-a-03.
import { faceWalk, LEVELS, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import {
  homeOf,
  isItemLive,
  ITEM_EDGE,
  ITEM_VERTEX,
  itemKey,
  keyKind,
  keySlot,
  levelItems,
  routeRun,
  type Box,
  type ItemRef,
} from './items.js';
import { indexOf, partitionKeyOf, type IndexBatchLog } from './spatial.js';

/** An item the batch deleted, re-levelled, changed or moved to another partition. */
export interface ChangedItem {
  /** The item as it was before the batch (its level then). */
  readonly item: ItemRef;
  /** Its slot's home entry before the batch: the partition whose static copy held it, −1 if none. */
  readonly homeBefore: number;
  /** What answers for it now — the item changed, re-levelled or moved, or the slot's new item — or null when deleted. */
  readonly successor: ItemRef | null;
}

/** The commit record's facts the row reads (§3.3's `CommitRecord.promoted` and `demoted`) and the batch's changed items. */
export interface BatchIndexFacts {
  readonly promoted: readonly VertexId[];
  readonly demoted: { readonly vertices: readonly VertexId[]; readonly edges: readonly HalfEdgeId[] };
  readonly changed: readonly ChangedItem[];
}

function name(item: ItemRef): string {
  const kind = item.kind === ITEM_VERTEX ? 'vertex' : item.kind === ITEM_EDGE ? 'route edge' : 'face';
  return `${kind} ${item.slot} (L${item.level})`;
}

/** Do the item's live vertices all lie in the box? */
function geometryIn(p: Plat, item: ItemRef, box: Box): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const inBox = (v: VertexId): boolean => X[v] >= box.minX && X[v] <= box.maxX && Y[v] >= box.minY && Y[v] <= box.maxY;
  if (item.kind === ITEM_VERTEX) return inBox(item.slot);
  const O = p.halfEdges.origin;
  if (item.kind === ITEM_EDGE) {
    const run = routeRun(p, 2 * item.slot).halfEdges;
    return run.every((h) => inBox(O[h])) && inBox(O[run[run.length - 1] ^ 1]);
  }
  return faceWalk(p, item.level, item.slot)[0].every((h) => inBox(O[h]));
}

/** The problems with one grid entry for a live item, or none. */
function gridProblems(p: Plat, item: ItemRef): string[] {
  const idx = indexOf(p);
  const e = idx.levels[item.level].dynamic.entries.get(itemKey(item.kind, item.slot));
  if (e === undefined) return [`${name(item)} is in no grid of its level`];
  const out: string[] = [];
  const part = idx.partitions[e.partition];
  if (part.key !== partitionKeyOf(p, item)) out.push(`${name(item)} waits for partition '${part.key}', but belongs to '${partitionKeyOf(p, item)}'`);
  if (!part.pending.has(e.key)) out.push(`${name(item)} is missing from its partition's grid share`);
  if (!geometryIn(p, item, e.box)) out.push(`${name(item)}'s grid box does not hold its geometry`);
  if (homeOf(p, item) !== -1) out.push(`${name(item)} is in the grid and still has a static home ${homeOf(p, item)}`);
  return out;
}

/**
 * §3.10's index levels and freshness row for one batch: its log (`beginIndexBatch` … `endIndexBatch`) and the commit
 * record's facts. Returns the problems found (none when the row holds).
 */
export function checkIndexBatch(p: Plat, log: IndexBatchLog, facts: BatchIndexFacts): string[] {
  const idx = indexOf(p);
  const out: string[] = [];
  const moved = new Set<VertexId>([...facts.promoted, ...facts.demoted.vertices]);
  const movedPairs = new Set<number>(facts.demoted.edges.map((h) => h >> 1));
  for (const w of log.writes) {
    if (w.level >= log.level) continue;
    const allowed = (w.kind === ITEM_VERTEX && moved.has(w.slot)) || (w.kind === ITEM_EDGE && movedPairs.has(w.slot));
    if (!allowed) out.push(`an L${log.level} batch wrote the L${w.level} index (${w.op} of ${name({ kind: w.kind, level: w.level, slot: w.slot })}) outside its promotions and demotions`);
  }
  for (const c of facts.changed) {
    const key = itemKey(c.item.kind, c.item.slot);
    if (c.homeBefore !== -1) {
      const part = idx.partitions[c.homeBefore];
      if (part === undefined || !idx.levels[part.level].tombstones[part.pos].has(key)) {
        out.push(`${name(c.item)} was not tombstoned in partition ${c.homeBefore}, which held its static copy`);
      }
      if (homeOf(p, c.item) === c.homeBefore) out.push(`${name(c.item)}'s home entry still names partition ${c.homeBefore}`);
    }
    if (c.successor !== null) {
      if (!isItemLive(p, c.successor)) out.push(`${name(c.item)}'s successor ${name(c.successor)} is not live`);
      else out.push(...gridProblems(p, c.successor));
    } else {
      const e = idx.levels[c.item.level].dynamic.entries.get(key);
      if (e !== undefined && !isItemLive(p, c.item)) out.push(`deleted ${name(c.item)} is still in the L${c.item.level} grid`);
    }
  }
  return out;
}

/**
 * The whole index against the arena: every live item of every level answered by exactly one structure — its home
 * partition (untombstoned) or the grid of its level, never both; every untombstoned static item live at its partition's
 * level with its home entry naming that partition; every grid entry live, current and in its partition's grid share.
 */
export function checkIndexState(p: Plat): string[] {
  const idx = indexOf(p);
  const out: string[] = [];
  for (const part of idx.partitions) {
    const dead = idx.levels[part.level].tombstones[part.pos];
    for (const k of part.keys) {
      if (dead.has(k)) continue;
      const item: ItemRef = { kind: keyKind(k), level: part.level, slot: keySlot(k) };
      if (!isItemLive(p, item)) out.push(`partition ${part.id} holds a dead ${name(item)} no tombstone filters`);
      else if (homeOf(p, item) !== part.id) out.push(`partition ${part.id} holds ${name(item)} whose home is ${homeOf(p, item)}`);
    }
    for (const k of part.pending) {
      const e = idx.levels[part.level].dynamic.entries.get(k);
      if (e === undefined || e.partition !== part.id) out.push(`partition ${part.id}'s grid share names ${k}, which the grid does not give it`);
    }
  }
  for (const level of LEVELS) {
    const live = new Set<number>();
    for (const item of levelItems(p, level)) {
      const k = itemKey(item.kind, item.slot);
      live.add(k);
      const home = homeOf(p, item);
      const inGrid = idx.levels[level].dynamic.entries.has(k);
      if (home !== -1) {
        const part = idx.partitions[home];
        const held = part !== undefined && part.level === level && part.keys.includes(k) && !idx.levels[level].tombstones[part.pos].has(k);
        if (!held) out.push(`${name(item)}'s home ${home} does not answer for it`);
        if (inGrid) out.push(`${name(item)} answers from partition ${home} and the grid`);
      } else if (!inGrid) {
        out.push(`${name(item)} is in no structure`);
      } else {
        out.push(...gridProblems(p, item));
      }
    }
    for (const e of idx.levels[level].dynamic.entries.values()) {
      if (!live.has(e.key)) out.push(`the L${level} grid holds ${e.key}, no live item of the level`);
    }
  }
  return out;
}
