// The arena block's format constants and the readings both directions share (M0-a-15; §3.9, §3.3). Readings: C-0207.
//
// A chunk is: the magic `PLBK`, the format version, the chunk kind (0 the level-≤ 1 routes, 1 one L2–L4 static
// partition), the role registry's version (§2.2 rule 7: role ids are append-only, so a chunk names roles by id), the
// arena's key (layer code, part), then — routes: the frame (§3.2 (9); widths as varints, aspect and margin share as
// IEEE-754 bits); a partition: its level and key — then seven sections in order: entities (the address ids the rows and
// owners name, sorted), vertices, splits, edges, vertex rows, edge rows, faces. Inside a chunk a vertex the chunk holds
// is named by its position in the chunk's vertex list; every vertex another chunk holds is named by its lattice point
// (§3.9), never by a slot or a (chunk, index) pair.
import { compareVertices, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import type { Layer, Level } from '../types/index.js';

/** `PLBK`. */
export const MAGIC: readonly number[] = Object.freeze([0x50, 0x4c, 0x42, 0x4b]);
/** The block format's version (raised by any change of the bytes' meaning). */
export const FORMAT_VERSION = 1;
export const KIND_ROUTES = 0;
export const KIND_PARTITION = 1;

/** The longest address id or partition key the decoder accepts (UTF-16 code units). */
export const MAX_ID_UNITS = 4096;

const LAYERS: readonly Layer[] = Object.freeze(['ground', 'underground', 'sky'] as Layer[]);

/** A layer's code in a chunk header. */
export function layerCodeOf(layer: Layer): number {
  const i = LAYERS.indexOf(layer);
  if (i < 0) throw new Error(`arena block: no layer ${String(layer)}`);
  return i;
}

/** The layer of a header code, or null. */
export function layerOfCode(code: number): Layer | null {
  return code >= 0 && code < LAYERS.length ? LAYERS[code] : null;
}

/** 2²³: a lattice coordinate lies in (−2²³, 2²³) (§3.2 (1)). */
const HALF = 8_388_608;
/** 2²⁴. */
const SPAN = 16_777_216;

/** One number per lattice point (y first, so the numbers sort as (y, x) does): exact below 2⁴⁸. */
export function pointKey(x: number, y: number): number {
  return (y + HALF) * SPAN + (x + HALF);
}

/** Is (x, y) a lattice point inside the range invariant? */
export function inRange(x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x > -HALF && x < HALF && y > -HALF && y < HALF;
}

/**
 * The canonical key of a ring read at `level` (§3.3's face key, applied to any ring — a hole's too): the lowest-then-
 * leftmost vertex of level ≤ level on it and the next such vertex along the walk, finer vertices skipped; where the
 * ring visits that vertex twice, the smaller of its two successors. One directed level-`level` route edge, which bounds
 * exactly one level-`level` ring. Null when the ring holds fewer than two vertices of the level.
 */
export function ringKey(p: Plat, level: Level, ring: readonly HalfEdgeId[]): [VertexId, VertexId] | null {
  const vs: VertexId[] = [];
  for (const h of ring) {
    const v = p.halfEdges.origin[h];
    if (p.vertices.level[v] <= level) vs.push(v);
  }
  if (vs.length < 2) return null;
  let first = -1;
  let second = -1;
  for (let i = 0; i < vs.length; i++) {
    const v = vs[i];
    const succ = vs[i + 1 < vs.length ? i + 1 : 0];
    const c = first === -1 ? -1 : compareVertices(p, v, first);
    if (c < 0 || (c === 0 && compareVertices(p, succ, second) < 0)) {
      first = v;
      second = succ;
    }
  }
  return [first, second];
}

/**
 * A table's capacity for `n` items in an arena the block or a compaction builds: the smallest 64 · 2ᵏ above n — what the
 * arena's own doubling from its default 64 leaves (createPlat), never a full table, so the first allocation after a load
 * or a compaction does not grow it (C-0207: a growth inside M0-a-04's split writes through a stale half-edge table).
 */
export function roomFor(n: number): number {
  let c = 64;
  while (c <= n) c *= 2;
  return c;
}
