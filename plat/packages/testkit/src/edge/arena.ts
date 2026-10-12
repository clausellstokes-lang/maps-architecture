// Readers of a committed arena for the edge fixtures (M0-x-06): the arena's own tables read directly — its live
// vertices, the role rows on its edges and vertices, a crossing site's two deck ends — never through the code under test.
import { dest, isHalfEdgeLive, isVertexLive, rowKey, rowsOn, type Kernel, type LatticePoint, type Plat, type PlatKey } from '@plat/kernel';
import type { Bridge } from '@plat/model';

/** A point. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** Every live vertex of the arena with its level. */
export function liveVertices(p: Plat): { v: number; x: number; y: number; level: number }[] {
  const out: { v: number; x: number; y: number; level: number }[] = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v)) out.push({ v, x: p.vertices.x[v], y: p.vertices.y[v], level: p.vertices.level[v] });
  return out;
}

/** Every live edge pair (its even half-edge) with its two ends and the roles on it. */
export function liveEdges(p: Plat): { h: number; a: XY; b: XY; roles: { role: string; entity: string }[] }[] {
  const out: { h: number; a: XY; b: XY; roles: { role: string; entity: string }[] }[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h)) continue;
    const a = p.halfEdges.origin[h];
    const b = dest(p, h);
    const roles = [...rowsOn(p, 'edge', h), ...rowsOn(p, 'edge', h ^ 1)].map((r) => {
      const k = rowKey(p, r);
      return { role: k.role, entity: k.entity };
    });
    out.push({ h, a: { x: p.vertices.x[a], y: p.vertices.y[a] }, b: { x: p.vertices.x[b], y: p.vertices.y[b] }, roles });
  }
  return out;
}

/** The vertices carrying a vertex role (`deck_end`, `gate`, …), with the role row's entity. */
export function roleVertices(p: Plat, role: string): { x: number; y: number; entity: string }[] {
  const out: { x: number; y: number; entity: string }[] = [];
  for (let v = 0; v < p.slots.vertex.top; v += 1) {
    if (!isVertexLive(p, v)) continue;
    for (const r of rowsOn(p, 'vertex', v)) {
      const k = rowKey(p, r);
      if (k.role === role) out.push({ x: p.vertices.x[v], y: p.vertices.y[v], entity: k.entity });
    }
  }
  return out;
}

/** The box of the arena's outer ring (its `margin` edges' extent). */
export function marginBox(p: Plat): { x0: number; y0: number; x1: number; y1: number } | null {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const e of liveEdges(p)) {
    if (!e.roles.some((r) => r.role === 'margin')) continue;
    for (const q of [e.a, e.b]) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
  }
  return Number.isFinite(x0) ? { x0, y0, x1, y1 } : null;
}

/** Is q inside the box (closed)? */
export function inBox(q: XY, b: { x0: number; y0: number; x1: number; y1: number }): boolean {
  return q.x >= b.x0 && q.x <= b.x1 && q.y >= b.y0 && q.y <= b.y1;
}

/** The box of a counter-clockwise rectangle ring (the frame ring). */
export function ringBox(ring: readonly XY[]): { x0: number; y0: number; x1: number; y1: number } {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of ring) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  return { x0, y0, x1, y1 };
}

/** A bridge's two deck ends where the arena placed them (its `deck_end` vertex refs resolved), or null. */
export function deckEnds(k: Kernel, key: PlatKey, b: Bridge): LatticePoint[] | null {
  const p = k.plat(key);
  const out: LatticePoint[] = [];
  for (const ref of b.deck) {
    const r = k.resolve(ref, key);
    if (r.view !== 'vertices' || r.vertices.length !== 1) return null;
    const v = r.vertices[0];
    out.push({ x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint);
  }
  return out;
}

/** The smallest distance from any point to the box's sides (cm): its inset (negative when a point lies outside). */
export function insetIn(points: readonly XY[], b: { x0: number; y0: number; x1: number; y1: number }): number {
  let m = Infinity;
  for (const q of points) m = Math.min(m, q.x - b.x0, b.x1 - q.x, q.y - b.y0, b.y1 - q.y);
  return m;
}
