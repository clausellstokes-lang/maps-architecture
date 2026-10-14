// The suite's shared pieces: the cost meter (§13.2: what each row read), the verdict builder, the exact distance
// comparison (BigInt, against a rational bound), the whole-centimetre query box, and the face left of a half-edge found
// through the index (§3.10's nesting row: "by index — never by coordinates"). The closed-segment contact test is the
// kernel's one, `num/exact.ts`'s `segmentsMeet`. M0-a-14.
import { faceHoles, walkRing, type FaceId, type HalfEdgeId, type Plat } from '../arena/index.js';
import { query } from '../index/index.js';
import { WALK_REACH_CM } from '../insert/rewalk.js';
import type { Level } from '../types/index.js';
import type { Checked, InvariantResult, RowDecl } from './types.js';

/** What a row read: distinct faces walked (by level), vertices and edges examined. */
export class Meter {
  private readonly faceSet = new Set<number>();
  private readonly vertexSet = new Set<number>();
  private readonly edgeSet = new Set<number>();

  face(level: Level, f: FaceId): void {
    this.faceSet.add(f * 8 + level);
  }

  vertex(v: number): void {
    this.vertexSet.add(v);
  }

  edge(pair: number): void {
    this.edgeSet.add(pair);
  }

  read(): Checked {
    return { faces: this.faceSet.size, vertices: this.vertexSet.size, edges: this.edgeSet.size };
  }
}

/** A row's verdict. */
export function verdict(row: RowDecl, subjects: number, problems: readonly string[], meter: Meter, note?: string): InvariantResult {
  const r: InvariantResult = {
    name: row.name,
    scope: row.scope,
    class: row.class,
    holds: problems.length === 0,
    subjects,
    problems: problems.map((p) => `${row.name}: ${p}`),
    checked: meter.read(),
  };
  return note === undefined ? r : { ...r, note };
}

/** A row whose subject is absent: it holds vacuously with a count of 0 (§5.3), its reason noted. */
export function vacuous(row: RowDecl, note: string): InvariantResult {
  return verdict(row, 0, [], new Meter(), note);
}

const B = (v: number): bigint => BigInt(v);

/**
 * Compares the squared distance from the lattice point p to the closed segment a–b with num / den (both ≥ 0, whole
 * numbers): −1 below, 0 equal, 1 above. Exact (BigInt): a squared perpendicular distance is o² / l², o an orientation.
 * A three-way comparison against a rational bound, exact beyond 2⁵³ — not `num/exact.ts`'s `segmentCloserThan`, a
 * strict test against a whole radius in doubles.
 */
export function compareDist2(px: number, py: number, ax: number, ay: number, bx: number, by: number, num: number, den: number): number {
  const dx = B(bx) - B(ax);
  const dy = B(by) - B(ay);
  const l2 = dx * dx + dy * dy;
  const dot = (B(px) - B(ax)) * dx + (B(py) - B(ay)) * dy;
  const cmp = (lhs: bigint, rhs: bigint): number => (lhs < rhs ? -1 : lhs > rhs ? 1 : 0);
  const end = (x: number, y: number): number => {
    const ex = B(px) - B(x);
    const ey = B(py) - B(y);
    return cmp((ex * ex + ey * ey) * B(den), B(num));
  };
  if (l2 === 0n || dot <= 0n) return end(ax, ay);
  if (dot >= l2) return end(bx, by);
  const o = (B(bx) - B(ax)) * (B(py) - B(ay)) - (B(by) - B(ay)) * (B(px) - B(ax));
  return cmp(o * o * B(den), B(num) * l2);
}

/**
 * The closed-segment contact test, `num/exact.ts`'s, under this file's name: the suite's rows import it from num;
 * the name stays here for M0-a-01's copy table (`test/num/copies.ts`), which reads it from this file.
 */
export { segmentsMeet } from '../num/exact.js';

/**
 * The closed whole-centimetre box around a lattice segment, padded by `pad` (an integer): the box a row queries the
 * index with. Unclamped: on the lattice (|x|, |y| < 2²³, §3.2 (1)) the rows' pads (0, minEdge, `WALK_REACH_CM`) keep
 * it inside the index's ±2²⁴ bound. Kept beside `insert/stretch.ts`'s `segmentBox`, which floors and ceils double coordinates and
 * clamps to that bound (`BOX_RANGE`): the two agree on lattice inputs only.
 */
export function segmentBox(ax: number, ay: number, bx: number, by: number, pad: number): { minX: number; minY: number; maxX: number; maxY: number } {
  return { minX: Math.min(ax, bx) - pad, minY: Math.min(ay, by) - pad, maxX: Math.max(ax, bx) + pad, maxY: Math.max(ay, by) + pad };
}

/**
 * The face record at `level` whose ring holds half-edge h on its left, through the index (a record storing a half-edge
 * of that ring): −1 where the level holds no record there (an own child, or L0's unbounded outside). Walks one ring.
 * The index is asked with h's segment box padded by `WALK_REACH_CM` (3 cm, `insert/rewalk.ts`'s one definition;
 * C-0349 (1)'s multi-level reach), never 0: the index reads a record on its level-`level` route while h lies on its
 * walk, through every finer Steiner vertex, each within one hot pixel of the route per level it is finer — a sub-edge
 * whose both ends are Steiner vertices off the route on one side has a box the route misses and a corner the other
 * face holds (N-s8c-1, `checks/M0-a-05-notes.md`). With the reach the record whose ring holds h is always a candidate
 * and the exact ring-membership test below decides; the pad only adds candidates that test rejects (C-0370).
 */
export function faceLeftOf(p: Plat, level: Level, h: HalfEdgeId, meter: Meter): FaceId {
  const ring = new Set<HalfEdgeId>(walkRing(p, level, h));
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const a = O[h];
  const b = O[h ^ 1];
  const F = p.faces[level];
  for (const f of query(p, p.key, level, segmentBox(X[a], Y[a], X[b], Y[b], WALK_REACH_CM), { faces: true }).faces) {
    meter.face(level, f);
    if (ring.has(F.outer[f])) return f;
    for (const g of faceHoles(p, level, f)) if (ring.has(g)) return f;
  }
  return -1;
}
