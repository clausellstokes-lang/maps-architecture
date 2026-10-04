// The fuzz's batches (M0-a-03's exit bar: §3.10's index levels and freshness row on every fuzz batch). Each batch is
// one local edit by raw arena primitives (support.ts's writer), then the item-tombstone protocol for what it changed,
// inside an index batch log, then the row's check on the log and the commit-record facts the edit made (promotions,
// demotions). The edits cover every case §3.3's "No item changes in place" lists: a deleted vertex, edge or face; a
// promoted or demoted vertex; a route edge whose run a vertex of its level joins or leaves or a move reshapes; a vertex a
// move displaces; a face whose ring at its own level changes; an item whose partition changes (a regroup); and slots
// freed and reused inside the stage.
import { isHalfEdgeLive, isVertexLive, type Plat, type VertexId } from '../../src/arena/index.js';
import {
  beginIndexBatch,
  checkIndexBatch,
  checkIndexState,
  endIndexBatch,
  query,
  rebuildAtStageEnd,
  rebuildDirty,
  rebuildForFreeze,
  rebuildOverflowing,
  rebuildPartition,
  type BatchIndexFacts,
  type Box,
  type ChangedItem,
  type IndexBatchLog,
  type QueryResult,
} from '../../src/index/index.js';
import type { Level } from '../../src/types/index.js';
import {
  applyProtocol,
  dissolve,
  homesOf,
  intIn,
  levelRange,
  GROUND,
  LEVELS,
  materialiseAgainShuffled,
  nearStraight,
  pick,
  randomArena,
  setLevel,
  signatures,
  slide,
  splitPair,
  type Districts,
} from './support.js';

export const OPS = ['split', 'split', 'split', 'dissolve', 'promote', 'demote', 'slide', 'regroup', 'rewalk', 'reuse'] as const;
export type Op = (typeof OPS)[number];

export interface Ctx {
  p: Plat;
  d: Districts;
  rnd: () => number;
  W: number;
}

export interface BatchResult {
  op: Op;
  log: IndexBatchLog;
  facts: BatchIndexFacts;
  problems: string[];
}

function liveVertices(p: Plat): VertexId[] {
  const out: VertexId[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) out.push(v);
  return out;
}

function livePairs(p: Plat): number[] {
  const out: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) if (isHalfEdgeLive(p, 2 * e)) out.push(e);
  return out;
}

/** A split of a random edge by a vertex of a random level ≥ the edge's: the batch level, or null when none took. */
function doSplit(c: Ctx): Level | null {
  for (let tries = 0; tries < 8; tries++) {
    const e = pick(c.rnd, livePairs(c.p));
    const m = c.p.halfEdges.level[e];
    const level = intIn(c.rnd, m, 4) as Level;
    if (splitPair(c.p, e, level, c.rnd) !== -1) return level;
  }
  return null;
}

/** A dissolution of a random degree-2 vertex: the batch level, or null. */
function doDissolve(c: Ctx): Level | null {
  for (let tries = 0; tries < 12; tries++) {
    const v = pick(c.rnd, liveVertices(c.p));
    const level = c.p.vertices.level[v] as Level;
    if (dissolve(c.p, v)) return level;
  }
  return null;
}

/** A promotion (down) or a demotion (up) of a random vertex within its level range. */
function doRelevel(c: Ctx, up: boolean): { level: Level; v: VertexId } | null {
  for (let tries = 0; tries < 12; tries++) {
    const v = pick(c.rnd, liveVertices(c.p));
    const r = levelRange(c.p, v);
    if (r === null) continue;
    const cur = c.p.vertices.level[v];
    if (up && !nearStraight(c.p, v)) continue; // a demotion leaves a route through v: v must keep the placement bound
    const lo = up ? cur + 1 : r[0];
    const hi = up ? r[1] : cur - 1;
    if (lo > hi) continue;
    const to = intIn(c.rnd, lo, hi) as Level;
    setLevel(c.p, v, to);
    return { level: (up ? cur : to) as Level, v };
  }
  return null;
}

/**
 * Runs one batch of `op` on the context's arena: the edit, the protocol for its changes inside a batch log, and the
 * freshness row's check. `skip` withholds the protocol from the signature keys it names (the negative control). Null
 * when the edit found nothing to act on.
 */
export function runBatch(c: Ctx, op: Op, skip?: (k: string) => boolean): BatchResult | null {
  const p = c.p;
  const before = signatures(p, c.d);
  const homes = homesOf(p, before);
  // The log opens before the edit: a writer deletes from the index what it frees as it frees it. Its level is set once
  // the edit has said which level it wrote (a batch's level is known when it opens; the test learns it from the edit).
  const opened = beginIndexBatch(p, 0);
  let level: Level | null = null;
  const promoted: VertexId[] = [];
  const demotedV: VertexId[] = [];
  switch (op) {
    case 'split':
      level = doSplit(c);
      break;
    case 'dissolve':
      level = doDissolve(c);
      break;
    case 'promote': {
      const r = doRelevel(c, false);
      if (r !== null) {
        level = r.level;
        promoted.push(r.v);
      }
      break;
    }
    case 'demote': {
      const r = doRelevel(c, true);
      if (r !== null) {
        level = r.level;
        demotedV.push(r.v);
      }
      break;
    }
    case 'slide': {
      for (let tries = 0; tries < 12 && level === null; tries++) {
        const v = pick(c.rnd, liveVertices(p));
        if (slide(p, v, c.rnd)) level = p.vertices.level[v] as Level;
      }
      break;
    }
    case 'regroup':
      // S6 re-owns L1 faces between districts and the hinterland: an L1 batch whose writes are the L2–L4 moves.
      c.d.cutX = 10 * intIn(c.rnd, 0, c.W / 10);
      c.d.hinterlandY = 10 * intIn(c.rnd, c.W / 20, c.W / 10 + 5);
      level = 1;
      break;
    case 'rewalk':
      materialiseAgainShuffled(p, c.rnd);
      level = 0;
      break;
    case 'reuse': {
      const a = doDissolve(c);
      const b = a === null ? null : doSplit(c);
      level = a === null ? null : b === null ? a : (Math.min(a, b) as Level);
      break;
    }
  }
  if (level === null) {
    endIndexBatch(p);
    return null;
  }
  const after = signatures(p, c.d);
  let changed: ChangedItem[] = [];
  try {
    changed = applyProtocol(p, before, homes, after, skip);
  } finally {
    endIndexBatch(p); // closed even when the protocol refuses, so the arena's index stays usable
  }
  const log: IndexBatchLog = { level, writes: opened.writes };
  const facts: BatchIndexFacts = { promoted, demoted: { vertices: demotedV, edges: [] }, changed };
  return { op, log, facts, problems: checkIndexBatch(p, log, facts) };
}

// ---- the fuzz case ---------------------------------------------------------------------------------------------------

/** A random closed integer box over the arena: a point, a 10 cm grid segment, a small or a large box. */
export function randomBox(rnd: () => number, W: number): Box {
  const kind = rnd();
  const x = intIn(rnd, -100, W + 100);
  const y = intIn(rnd, -100, W + 100);
  if (kind < 0.2) return { minX: x, minY: y, maxX: x, maxY: y };
  const snapX = 10 * Math.round(x / 10);
  if (kind < 0.35) return { minX: snapX, minY: y, maxX: snapX, maxY: y + intIn(rnd, 0, 400) };
  const w = intIn(rnd, 0, kind < 0.9 ? 600 : W);
  const h = intIn(rnd, 0, kind < 0.9 ? 600 : W);
  return { minX: x, minY: y, maxX: x + w, maxY: y + h };
}

/** One of the three rebuild moments, or a single partition's rebuild, at random. */
export function rebuildMoment(c: Ctx): void {
  const r = c.rnd();
  if (r < 0.25) rebuildAtStageEnd(c.p);
  else if (r < 0.4) rebuildAtStageEnd(c.p, pick(c.rnd, ['d:a', 'd:b', '']));
  else if (r < 0.55) rebuildOverflowing(c.p);
  else if (r < 0.7) rebuildForFreeze(c.p);
  else if (c.p.index !== undefined && c.p.index.partitions.length > 0) rebuildPartition(c.p, intIn(c.rnd, 0, c.p.index.partitions.length - 1));
}

/** What a fuzz case hands its judge after each step. */
export interface FuzzHooks {
  /** After a batch: its result and the index's state problems. */
  batch(i: number, r: BatchResult, state: string[]): void;
  /** A query on the arena to judge against the oracle. */
  query(p: Plat, n: Level, box: Box): void;
  /** A query's answers before and after a rebuild of the partitions it reads. */
  rebuilt(n: Level, box: Box, before: QueryResult, after: QueryResult): void;
  /** After a rebuild moment: the index's state problems. */
  moment(i: number, state: string[]): void;
}

/** What a fuzz case exercised: batches per op, and the kinds of change the row judged. */
export interface Tally {
  ops: Map<Op, number>;
  /** Changed items whose static copy was tombstoned (home before ≠ −1). */
  tombstoned: number;
  /** Changed items re-levelled (a promotion or a demotion). */
  relevelled: number;
  /** Changed items deleted. */
  deleted: number;
  /** Items whose slot was freed and taken by a new item in the same batch (a successor in the same slot after a release). */
  reused: number;
  rebuildMoments: number;
}

export function newTally(): Tally {
  return { ops: new Map(), tombstoned: 0, relevelled: 0, deleted: 0, reused: 0, rebuildMoments: 0 };
}

/** One fuzz case: a random arena from the seed, `batches` random batches, queries and rebuild moments between them. */
export function fuzzCase(seed: number, batches: number, hooks: FuzzHooks, tally: Tally = newTally()): number {
  const W = 4000;
  const d: Districts = { cutX: 2000, hinterlandY: 3000 };
  const { built, rnd } = randomArena(seed, d);
  const c: Ctx = { p: built.plat, d, rnd, W };
  let done = 0;
  for (let i = 0; i < batches; i++) {
    const r = runBatch(c, pick(rnd, OPS));
    if (r === null) continue;
    done++;
    tally.ops.set(r.op, (tally.ops.get(r.op) ?? 0) + 1);
    for (const x of r.facts.changed) {
      if (x.homeBefore !== -1) tally.tombstoned++;
      if (x.successor === null) tally.deleted++;
      else if (x.successor.level !== x.item.level) tally.relevelled++;
      if (r.op === 'reuse' && x.successor !== null && x.item.kind === 0) tally.reused++;
    }
    hooks.batch(i, r, checkIndexState(c.p));
    for (let k = 0; k < 3; k++) hooks.query(c.p, pick(rnd, LEVELS), randomBox(rnd, W));
    if (rnd() < 0.3) {
      const n = pick(rnd, LEVELS);
      const box = randomBox(rnd, W);
      const before = query(c.p, GROUND, n, box);
      rebuildDirty(c.p, (part) => part.level <= n);
      hooks.rebuilt(n, box, before, query(c.p, GROUND, n, box));
    }
    if (rnd() < 0.25) {
      tally.rebuildMoments++;
      rebuildMoment(c);
      hooks.moment(i, checkIndexState(c.p));
    }
  }
  return done;
}
