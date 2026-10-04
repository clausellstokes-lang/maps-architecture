// Insertion step 1: snap and decimate (§3.6 *Attraction*, step 1; §3.2 (7); §3.11's "one item" and "degenerate
// geometry" rows). M0-a-04.
//
// Every point passes `snap` (§3.2 (7)), each charged to `insert.points`. Consecutive points closer than `minEdge` are
// decimated: the later one is dropped unless its index is in `opts.pinned` or it carries a knot (§3.4), in which case
// the earlier one is dropped if it is neither; two such exempt points closer than `minEdge` merge at the first
// (W_ATTRACTED), and a merged knot vertex carries both ordinals (a step in its profile). A closed chain's closing pair —
// its last point against its first — is decimated alike, the last point counted the later. A chain that touches or
// crosses itself is split into simple runs, cut greedily at the first segment that touches or crosses the run so far
// (exact `orient2d` on lattice points); the runs are inserted in order, each counting the ones before as existing
// geometry (§3.6). A chain left with fewer than two distinct points takes its class's code: `E_BELOW_MIN_EDGE` if
// optional, `E_DEGENERATE` (`empty`) if mandatory. Step 1 is a plan — it writes nothing — so its W_ATTRACTED merges are
// reported in its own result only; `insertChain` (M0-a-05) folds them into the transaction when the chain goes on, and a
// refused chain leaves the transaction's warnings as they were (C-0169 (1), C-0170 (2)). Readings: C-0169 (3).
import { belowMinEdge, err, ok, orient2d, snap, type KernelResult, type Warning } from '../num/index.js';
import type { Id, LatticePoint, RoleName } from '../types/index.js';
import { addWarning, charge, check, classRefusal, INSERT_POINTS, workLimitHit, type ChainClass, type InsertTx } from './classes.js';

/** A vertex role row a chain point takes (§3.4 `insertChain`'s `opts.knots`): the row's ordinal and, by default, the chain's own entity. */
export interface Knot {
  /** The chain index the row sits on (an input index in `opts.knots`; an output index in `Decimated.knots`). */
  readonly index: number;
  readonly role: RoleName;
  readonly ordinal: number;
  /** Default: the chain's own entity (a knot); another for a vertex role such as a deck's `deck_end`. */
  readonly entity?: Id;
}

/** §3.4's `insertChain` options that step 1 reads. */
export interface DecimateOpts {
  readonly closed?: boolean;
  /** Chain indices exempt from decimation (§3.6 step 1) — not the kernel's pinned flag, which only `pinVertices` sets. */
  readonly pinned?: readonly number[];
  /** Every vertex role row the chain's own vertices take; a point carrying one is exempt from decimation. */
  readonly knots?: readonly Knot[];
}

/** One simple run of the chain: indices into `Decimated.points`, in chain order. */
export interface ChainRun {
  readonly vertices: readonly number[];
  /** A closed chain that is simple whole is one closed run (its last vertex joins its first). */
  readonly closed: boolean;
}

/** The chain after step 1. */
export interface Decimated {
  /** The chain's distinct vertices in order; consecutive ones (and a closed chain's last and first) ≥ `minEdge` apart. */
  readonly points: LatticePoint[];
  /** Per input point: the index in `points` it became — its own, the one it merged into, or the one it was decimated into. */
  readonly of: number[];
  /** The knot rows, each on the output point its input point became (a merged knot vertex carries both). */
  readonly knots: Knot[];
  /** Per output point: whether a pinned input point became it. */
  readonly pinned: boolean[];
  /** The simple runs, in chain order; consecutive runs share their boundary vertex. */
  readonly runs: ChainRun[];
  readonly closed: boolean;
}

interface Kept {
  readonly x: number;
  readonly y: number;
  /** The input indices that became this point. */
  inputs: number[];
  knots: Knot[];
  /** Pinned or carrying a knot: never the dropped one of a pair. */
  exempt: boolean;
  pinned: boolean;
}

/** Do the closed segments a–b and c–d share a point? Exact on lattice points (§3.2 (1), (3)). */
export function segmentsMeet(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = orient2d(ax, ay, bx, by, cx, cy);
  const o2 = orient2d(ax, ay, bx, by, dx, dy);
  const o3 = orient2d(cx, cy, dx, dy, ax, ay);
  const o4 = orient2d(cx, cy, dx, dy, bx, by);
  if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) return true;
  return (o1 === 0 && within(ax, ay, bx, by, cx, cy))
    || (o2 === 0 && within(ax, ay, bx, by, dx, dy))
    || (o3 === 0 && within(cx, cy, dx, dy, ax, ay))
    || (o4 === 0 && within(cx, cy, dx, dy, bx, by));
}

/** For p collinear with a–b: does p lie on the closed segment? */
function within(ax: number, ay: number, bx: number, by: number, px: number, py: number): boolean {
  return Math.min(ax, bx) <= px && px <= Math.max(ax, bx) && Math.min(ay, by) <= py && py <= Math.max(ay, by);
}

/** Does the segment p–q fold back over the segment o–p it follows (collinear, turning back)? */
function foldsBack(ox: number, oy: number, px: number, py: number, qx: number, qy: number): boolean {
  return orient2d(ox, oy, px, py, qx, qy) === 0 && (qx - px) * (ox - px) + (qy - py) * (oy - py) > 0;
}

/** The grid cell's side (cm) of the run's segment buckets, and the most cells one segment is entered in. */
const CELL_CM = 2048;
const MAX_CELLS = 64;
/** Cells are packed as (cx + 2¹³) · 2¹⁴ + (cy + 2¹³): coordinates below 2²³ give |cx|, |cy| < 2¹³ − 1 (exact in a double). */
const CELL_OFFSET = 8192;
const CELL_STRIDE = 16_384;

/** The segments of one run so far, bucketed by grid cell so a new segment meets only its neighbours. */
class RunSegments {
  readonly cells = new Map<number, number[]>();
  readonly large: number[] = [];
  readonly segs: number[] = [];

  add(j: number, ax: number, ay: number, bx: number, by: number): void {
    this.segs.push(j);
    const cells = cellsOf(ax, ay, bx, by);
    if (cells === null) {
      this.large.push(j);
      return;
    }
    for (const c of cells) {
      const list = this.cells.get(c);
      if (list === undefined) this.cells.set(c, [j]);
      else list.push(j);
    }
  }

  /** The run's segments whose cells a segment's box meets, each once (in no output-relevant order). */
  near(ax: number, ay: number, bx: number, by: number, mark: Int32Array, stamp: number): number[] {
    const out: number[] = [];
    const take = (j: number): void => {
      if (mark[j] === stamp) return;
      mark[j] = stamp;
      out.push(j);
    };
    const cells = cellsOf(ax, ay, bx, by);
    if (cells === null) {
      for (const j of this.segs) take(j);
      return out;
    }
    for (const c of cells) {
      const list = this.cells.get(c);
      if (list !== undefined) for (const j of list) take(j);
    }
    for (const j of this.large) take(j);
    return out;
  }
}

/** The packed cells a segment's box meets, or null when they are more than MAX_CELLS. */
function cellsOf(ax: number, ay: number, bx: number, by: number): number[] | null {
  const x0 = Math.floor(Math.min(ax, bx) / CELL_CM);
  const x1 = Math.floor(Math.max(ax, bx) / CELL_CM);
  const y0 = Math.floor(Math.min(ay, by) / CELL_CM);
  const y1 = Math.floor(Math.max(ay, by) / CELL_CM);
  if ((x1 - x0 + 1) * (y1 - y0 + 1) > MAX_CELLS) return null;
  const out: number[] = [];
  for (let cx = x0; cx <= x1; cx++) for (let cy = y0; cy <= y1; cy++) out.push((cx + CELL_OFFSET) * CELL_STRIDE + (cy + CELL_OFFSET));
  return out;
}

/**
 * Step 1 of §3.6 on a chain of `points` (doubles; each passes `snap`): snapping, decimation with the pinned and knot
 * exemptions and the merge rule, and the split into simple runs. Refusals, before anything else is decided: a point
 * `snap` refuses (`E_OUT_OF_RANGE`, detail `point <i> <axis>`), the work limit (`E_WORK_LIMIT`), and fewer than two
 * distinct points (the class's code, §3.6). Writes nothing to the arena or to the transaction's warnings (its merges'
 * W_ATTRACTED are in the result only, C-0170 (2)); charges `insert.points` once per input point.
 */
export function decimate(tx: InsertTx, points: readonly { readonly x: number; readonly y: number }[], cls: ChainClass, opts: DecimateOpts = {}): KernelResult<Decimated> {
  const n = points.length;
  const pinnedSet = new Set<number>();
  for (const i of opts.pinned ?? []) {
    check(Number.isInteger(i) && i >= 0 && i < n, `pinned index ${i} is not a chain index`);
    pinnedSet.add(i);
  }
  const knotsAt = new Map<number, Knot[]>();
  for (const k of opts.knots ?? []) {
    check(Number.isInteger(k.index) && k.index >= 0 && k.index < n, `knot index ${k.index} is not a chain index`);
    check(typeof k.role === 'string' && k.role.length > 0, 'a knot names its role');
    check(Number.isInteger(k.ordinal) && k.ordinal >= 0, 'a knot carries a whole ordinal');
    const list = knotsAt.get(k.index);
    if (list === undefined) knotsAt.set(k.index, [k]);
    else list.push(k);
  }
  if (!charge(tx, INSERT_POINTS, n)) return workLimitHit(INSERT_POINTS);
  const snapped: LatticePoint[] = [];
  for (let i = 0; i < n; i++) {
    const s = snap(points[i].x, points[i].y);
    if (!s.ok) return err(s.code, `point ${i} ${s.detail}`);
    snapped.push(s.value);
  }
  const warnings: Warning[] = [];
  const merge = (into: Kept, from: Kept): void => {
    into.inputs = into.inputs.concat(from.inputs);
    into.knots = into.knots.concat(from.knots);
    into.pinned = into.pinned || from.pinned;
    addWarning(warnings, 'W_ATTRACTED', { x: into.x, y: into.y } as LatticePoint);
  };
  // Decimation, in chain order: each point against the last kept point, dropping the non-exempt one of a close pair
  // (the later first) and merging an exempt pair at the first; dropping the earlier re-tests against the one before.
  const kept: Kept[] = [];
  for (let i = 0; i < n; i++) {
    const knots = knotsAt.get(i) ?? [];
    let cur: Kept | null = { x: snapped[i].x, y: snapped[i].y, inputs: [i], knots, exempt: pinnedSet.has(i) || knots.length > 0, pinned: pinnedSet.has(i) };
    while (cur !== null && kept.length > 0) {
      const top = kept[kept.length - 1];
      if (!belowMinEdge(top.x, top.y, cur.x, cur.y)) break;
      if (!cur.exempt) {
        top.inputs = top.inputs.concat(cur.inputs); // the later is dropped: its index becomes the kept point
        cur = null;
      } else if (!top.exempt) {
        kept.pop(); // the earlier is dropped: its indices become the later point
        cur.inputs = top.inputs.concat(cur.inputs);
      } else {
        merge(top, cur);
        cur = null;
      }
    }
    if (cur !== null) kept.push(cur);
  }
  const closed = opts.closed === true;
  if (closed) {
    // The closing pair: the last point (the later) against the first.
    while (kept.length >= 2) {
      const first = kept[0];
      const last = kept[kept.length - 1];
      if (!belowMinEdge(last.x, last.y, first.x, first.y)) break;
      if (!last.exempt) {
        kept.pop();
        first.inputs = first.inputs.concat(last.inputs);
      } else if (!first.exempt) {
        kept.shift();
        last.inputs = first.inputs.concat(last.inputs);
      } else {
        kept.pop();
        merge(first, last);
      }
    }
  }
  if (kept.length < 2) {
    const refusal = classRefusal<Decimated>(cls, 'belowOneEdge');
    check(refusal !== null, 'a chain below one edge is refused by both classes');
    return refusal;
  }
  const out: LatticePoint[] = kept.map((k) => ({ x: k.x, y: k.y }) as LatticePoint);
  const of = new Array<number>(n).fill(-1);
  const knotsOut: Knot[] = [];
  const pinned: boolean[] = [];
  kept.forEach((k, idx) => {
    for (const i of k.inputs) of[i] = idx;
    for (const kn of k.knots) knotsOut.push(kn.entity === undefined ? { index: idx, role: kn.role, ordinal: kn.ordinal } : { index: idx, role: kn.role, ordinal: kn.ordinal, entity: kn.entity });
    pinned.push(k.pinned);
  });
  return ok({ points: out, of, knots: knotsOut, pinned, runs: simpleRuns(out, closed), closed }, warnings);
}

/**
 * The chain's simple runs (§3.6 step 1): segments in chain order, a run cut before the first segment that touches or
 * crosses a segment of the run so far — its predecessor only where it folds back over it, and a closed chain's closing
 * segment the first one only where it folds back over it at the first vertex. Points are distinct and consecutive ones
 * apart (step 1's decimation), so every run is a simple polyline; a closed chain that is simple whole is one closed run.
 */
export function simpleRuns(pts: readonly LatticePoint[], closed: boolean): ChainRun[] {
  const k = pts.length;
  const segCount = closed ? k : k - 1;
  const start = (j: number): LatticePoint => pts[j];
  const end = (j: number): LatticePoint => pts[(j + 1) % k];
  const runs: ChainRun[] = [];
  const mark = new Int32Array(segCount);
  let stamp = 0;
  let vertices: number[] = [0];
  let segs = new RunSegments();
  for (let j = 0; j < segCount; j++) {
    const a = start(j);
    const b = end(j);
    let cut = false;
    if (segs.segs.length > 0) {
      const prev = segs.segs[segs.segs.length - 1];
      const first = segs.segs[0];
      stamp += 1;
      for (const s of segs.near(a.x, a.y, b.x, b.y, mark, stamp)) {
        const c = start(s);
        const d = end(s);
        if (s === prev) {
          if (foldsBack(c.x, c.y, a.x, a.y, b.x, b.y)) cut = true;
        } else if (closed && j === k - 1 && s === first && first === 0) {
          // The closing segment ends at the first vertex, where the run's first segment starts.
          if (foldsBack(a.x, a.y, b.x, b.y, d.x, d.y)) cut = true;
        } else if (segmentsMeet(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y)) {
          cut = true;
        }
        if (cut) break;
      }
    }
    if (cut) {
      runs.push({ vertices, closed: false });
      vertices = [j];
      segs = new RunSegments();
    }
    segs.add(j, a.x, a.y, b.x, b.y);
    vertices.push((j + 1) % k);
  }
  if (closed && runs.length === 0) {
    vertices.pop(); // the closing segment returned to vertex 0
    runs.push({ vertices, closed: true });
  } else {
    runs.push({ vertices, closed: false });
  }
  return runs;
}
