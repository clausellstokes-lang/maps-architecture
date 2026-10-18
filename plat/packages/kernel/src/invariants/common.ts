// The suite's shared pieces: the cost meter (§13.2: what each row read), the verdict builder, exact lattice predicates
// (distances compared as integers, crossings by the exact orientation), and the face left of a half-edge found through
// the index (§3.10's nesting row: "by index — never by coordinates"). M0-a-14.
import { faceHoles, walkRing, type FaceId, type HalfEdgeId, type Plat } from '../arena/index.js';
import { query } from '../index/index.js';
import { orient2d } from '../num/index.js';
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

function sign(v: number): number {
  return v > 0 ? 1 : v < 0 ? -1 : 0;
}

function onSegment(ax: number, ay: number, bx: number, by: number, x: number, y: number): boolean {
  return Math.min(ax, bx) <= x && x <= Math.max(ax, bx) && Math.min(ay, by) <= y && y <= Math.max(ay, by);
}

/** Do the closed lattice segments a–b and c–d share a point? Exact (robust orientation on integers). */
export function segmentsMeet(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number): boolean {
  const o1 = sign(orient2d(ax, ay, bx, by, cx, cy));
  const o2 = sign(orient2d(ax, ay, bx, by, dx, dy));
  const o3 = sign(orient2d(cx, cy, dx, dy, ax, ay));
  const o4 = sign(orient2d(cx, cy, dx, dy, bx, by));
  if (o1 * o2 < 0 && o3 * o4 < 0) return true;
  return (o1 === 0 && onSegment(ax, ay, bx, by, cx, cy)) || (o2 === 0 && onSegment(ax, ay, bx, by, dx, dy))
    || (o3 === 0 && onSegment(cx, cy, dx, dy, ax, ay)) || (o4 === 0 && onSegment(cx, cy, dx, dy, bx, by));
}

/** The closed whole-centimetre box around a segment, padded by `pad` (an integer). */
export function segmentBox(ax: number, ay: number, bx: number, by: number, pad: number): { minX: number; minY: number; maxX: number; maxY: number } {
  return { minX: Math.min(ax, bx) - pad, minY: Math.min(ay, by) - pad, maxX: Math.max(ax, bx) + pad, maxY: Math.max(ay, by) + pad };
}

/**
 * The face record at `level` whose ring holds half-edge h on its left, through the index (a record storing a half-edge
 * of that ring): −1 where the level holds no record there (an own child, or L0's unbounded outside). Walks one ring.
 */
export function faceLeftOf(p: Plat, level: Level, h: HalfEdgeId, meter: Meter): FaceId {
  const ring = new Set<HalfEdgeId>(walkRing(p, level, h));
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const a = O[h];
  const b = O[h ^ 1];
  const F = p.faces[level];
  for (const f of query(p, p.key, level, segmentBox(X[a], Y[a], X[b], Y[b], 0), { faces: true }).faces) {
    meter.face(level, f);
    if (ring.has(F.outer[f])) return f;
    for (const g of faceHoles(p, level, f)) if (ring.has(g)) return f;
  }
  return -1;
}
