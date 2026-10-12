// A step's positions before they are written (§3.6 *Order within a step*, *Whole-step validation*): the arena's points
// with the step's planned points laid over them, and the neighbourhood reads the placement and the validation make on
// that view. Nothing is written to the arena or its index until the whole step has validated, so the index answers
// every unmoved vertex and every unmoved edge exactly (its boxes are the arena's, and an unmoved edge's run box still
// holds both its ends), and the step's own moved vertices and edges are read from a local bucket grid at their planned
// points. Every predicate is exact on lattice points (§3.2 (3)). A query box is clamped to the index's bound,
// num/exact.ts's `BOX_RANGE` (C-0314). M0-a-13. Readings: C-0193 (3).
import { outgoing, type HalfEdgeId, type Plat, type VertexId } from '../arena/index.js';
import { query, type Box } from '../index/index.js';
import { BOX_RANGE } from '../num/exact.js';
import type { PlatKey } from '../types/index.js';

/** The bucket side (cm) of the step's local grid. */
const CELL = 1024;

const clamp = (v: number): number => Math.max(-BOX_RANGE, Math.min(BOX_RANGE, v));

/** An integer box padded by `r`, clamped to the index's range (±`BOX_RANGE`, 2²⁴). */
export function padBox(minX: number, minY: number, maxX: number, maxY: number, r: number): Box {
  return {
    minX: clamp(Math.floor(minX) - r),
    minY: clamp(Math.floor(minY) - r),
    maxX: clamp(Math.ceil(maxX) + r),
    maxY: clamp(Math.ceil(maxY) + r),
  };
}

const cellKey = (cx: number, cy: number): number => (cx + 16_384) * 32_768 + (cy + 16_384);

/** The arena's positions with a step's planned points over them, and the step's moved edges. */
export class StepView {
  readonly p: Plat;
  readonly key: PlatKey;
  /** Planned points of the step's moving vertices (placed or, before placement, rounded targets). */
  private readonly over = new Map<VertexId, { x: number; y: number }>();
  private readonly ring = new Map<VertexId, VertexId[]>();
  private grid: Map<number, VertexId[]> | null = null;
  private edgeGrid: Map<number, number[]> | null = null;

  constructor(p: Plat, key: PlatKey) {
    this.p = p;
    this.key = key;
  }

  x(v: VertexId): number {
    const o = this.over.get(v);
    return o === undefined ? this.p.vertices.x[v] : o.x;
  }

  y(v: VertexId): number {
    const o = this.over.get(v);
    return o === undefined ? this.p.vertices.y[v] : o.y;
  }

  /** Is the vertex one of the step's movers (an overridden point)? */
  moving(v: VertexId): boolean {
    return this.over.has(v);
  }

  /** Every overridden vertex. */
  movers(): VertexId[] {
    return [...this.over.keys()];
  }

  /** Lays a planned point over a vertex (the local grid is rebuilt on its next read). */
  set(v: VertexId, x: number, y: number): void {
    this.over.set(v, { x, y });
    this.grid = null;
    this.edgeGrid = null;
  }

  /** Removes a vertex's planned point. */
  unset(v: VertexId): void {
    this.over.delete(v);
    this.grid = null;
    this.edgeGrid = null;
  }

  /** The vertex's topological neighbours (its one-ring), cached: the step changes no topology. */
  neighbours(v: VertexId): VertexId[] {
    let n = this.ring.get(v);
    if (n === undefined) {
      const O = this.p.halfEdges.origin;
      n = outgoing(this.p, v).map((h) => O[h ^ 1]);
      this.ring.set(v, n);
    }
    return n;
  }

  /** The edge pairs incident to a mover (each once): the step's moved edges. */
  movedPairs(): number[] {
    const seen = new Set<number>();
    const out: number[] = [];
    for (const v of this.over.keys()) {
      for (const h of outgoing(this.p, v)) {
        const e = h >> 1;
        if (!seen.has(e)) {
          seen.add(e);
          out.push(e);
        }
      }
    }
    return out.sort((a, b) => a - b);
  }

  private buildGrids(): void {
    const g = new Map<number, VertexId[]>();
    for (const v of this.over.keys()) {
      const k = cellKey(Math.floor(this.x(v) / CELL), Math.floor(this.y(v) / CELL));
      const list = g.get(k);
      if (list === undefined) g.set(k, [v]);
      else list.push(v);
    }
    const eg = new Map<number, number[]>();
    const O = this.p.halfEdges.origin;
    for (const e of this.movedPairs()) {
      const a = O[2 * e];
      const b = O[2 * e + 1];
      const x0 = Math.floor(Math.min(this.x(a), this.x(b)) / CELL);
      const x1 = Math.floor(Math.max(this.x(a), this.x(b)) / CELL);
      const y0 = Math.floor(Math.min(this.y(a), this.y(b)) / CELL);
      const y1 = Math.floor(Math.max(this.y(a), this.y(b)) / CELL);
      for (let cx = x0; cx <= x1; cx++) {
        for (let cy = y0; cy <= y1; cy++) {
          const k = cellKey(cx, cy);
          const list = eg.get(k);
          if (list === undefined) eg.set(k, [e]);
          else list.push(e);
        }
      }
    }
    this.grid = g;
    this.edgeGrid = eg;
  }

  /** The vertices whose point in the view lies in the closed box: the index's unmoved ones and the step's movers. */
  verticesIn(box: Box): VertexId[] {
    const out: VertexId[] = [];
    for (const v of query(this.p, this.key, 4, box, { vertices: true }).vertices) if (!this.over.has(v)) out.push(v);
    if (this.over.size > 0) {
      if (this.grid === null) this.buildGrids();
      const g = this.grid as Map<number, VertexId[]>;
      for (let cx = Math.floor(box.minX / CELL); cx <= Math.floor(box.maxX / CELL); cx++) {
        for (let cy = Math.floor(box.minY / CELL); cy <= Math.floor(box.maxY / CELL); cy++) {
          for (const v of g.get(cellKey(cx, cy)) ?? []) {
            const x = this.x(v);
            const y = this.y(v);
            if (x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY) out.push(v);
          }
        }
      }
    }
    return out;
  }

  /**
   * The edge pairs that may meet the box in the view: every unmoved edge the index finds there (exact against the box),
   * and every moved edge whose view box meets it (the caller's predicate decides exactly).
   */
  edgesNear(box: Box): number[] {
    const O = this.p.halfEdges.origin;
    const out: number[] = [];
    for (const h of query(this.p, this.key, 4, box, { edges: true }).edges) {
      if (this.over.has(O[h]) || this.over.has(O[h ^ 1])) continue;
      out.push(h >> 1);
    }
    if (this.over.size > 0) {
      if (this.edgeGrid === null) this.buildGrids();
      const eg = this.edgeGrid as Map<number, number[]>;
      const seen = new Set<number>();
      for (let cx = Math.floor(box.minX / CELL); cx <= Math.floor(box.maxX / CELL); cx++) {
        for (let cy = Math.floor(box.minY / CELL); cy <= Math.floor(box.maxY / CELL); cy++) {
          for (const e of eg.get(cellKey(cx, cy)) ?? []) {
            if (seen.has(e)) continue;
            seen.add(e);
            const a = O[2 * e];
            const b = O[2 * e + 1];
            if (Math.max(this.x(a), this.x(b)) < box.minX || Math.min(this.x(a), this.x(b)) > box.maxX) continue;
            if (Math.max(this.y(a), this.y(b)) < box.minY || Math.min(this.y(a), this.y(b)) > box.maxY) continue;
            out.push(e);
          }
        }
      }
    }
    return out;
  }
}

/** The half-edge's pair ends in the view (origin of the even half-edge first). */
export function pairEnds(p: Plat, e: number): [VertexId, VertexId] {
  return [p.halfEdges.origin[2 * e], p.halfEdges.origin[2 * e + 1]];
}

/** The pair of a half-edge. */
export function pairOf(h: HalfEdgeId): number {
  return h >> 1;
}
