// Test support for M0-a-05's insertion steps 3 – 5 (insertChain). The arenas, the step-1–2 validator (§3.10's
// half-edge links, minEdge, one vertex per lattice point, no crossing, clearance, level consistency, counter-clockwise
// records, the index state) and the fingerprint come from M0-a-04's support; this file adds the oracles the re-walk is
// judged with, written from §2.2 rules 1 – 2 and §3.10 without the code under test: the level-l view's faces from its
// cycles, every face record against them (outer ring, holes, nothing missing but own children), nesting (each record
// inside its parent), and the Euler characteristic per level (V − E + F = 1 + components).
import {
  createPlat,
  faceWalk,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  outgoing,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { insertChain, type ChainInsert, type InsertChainOpts } from '../../../src/insert/insertChain.js';
import type { KernelResult } from '../../../src/num/index.js';
import type { Level } from '../../../src/types/index.js';
import { FRAME, GROUND, pt } from '../../arena/support.js';
import { CELLS, problems } from '../step1-2/support.js';

export { buildArena, chordArena, CELLS, fingerprint, generator, indexed, intIn, liveEdges, liveVertices, problems, pt, SLANT, TIMEOUT, W } from '../step1-2/support.js';

const B = (v: number): bigint => BigInt(v);

/** An empty ground arena with the index attached. */
export function emptyArena(): Plat {
  const p = createPlat(GROUND, FRAME);
  attachIndex(p, { gridCellCm: CELLS });
  return p;
}

/** A transaction shell at `level`. */
export function tx(p: Plat, level: Level, workLimit?: number): InsertTx {
  return insertTx(p, level, workLimit === undefined ? {} : { workLimit });
}

/** insertChain from integer pairs. */
export function ins(t: InsertTx, pts: readonly (readonly [number, number])[], roles: { role: string; entity: string; ordinal?: number }[], cls: 'mandatory' | 'optional' = 'mandatory', opts: InsertChainOpts = {}): KernelResult<ChainInsert> {
  return insertChain(t, pts.map(([x, y]) => pt(x, y)), roles, cls, opts);
}

/** An L0 square [0, side]² inserted into an empty arena as a closed `margin` chain: the arena's outer ring. */
export function framed(side = 4000): Plat {
  const p = emptyArena();
  const r = ins(tx(p, 0), [[0, 0], [side, 0], [side, side], [0, side]], [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!r.ok) throw new Error(`support: the frame ring was refused: ${r.code} ${r.detail}`);
  return p;
}

// ---- the level views (oracles) ----------------------------------------------------------------------------------------

/** Twice the signed area of a ring of half-edges' origins, exact (BigInt). */
export function ringArea2(p: Plat, ring: readonly HalfEdgeId[]): bigint {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let s = 0n;
  for (let i = 0; i < ring.length; i++) {
    const a = O[ring[i]];
    const b = O[ring[(i + 1) % ring.length]];
    s += B(X[a]) * B(Y[b]) - B(X[b]) * B(Y[a]);
  }
  return s;
}

/** Is the lattice point strictly inside the ring of half-edges' origins (crossing number; BigInt orientation)? */
export function strictlyInsideRing(p: Plat, ring: readonly HalfEdgeId[], qx: number, qy: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = O[ring[i]];
    const b = O[ring[(i + 1) % ring.length]];
    const o = (B(X[b]) - B(X[a])) * (B(qy) - B(Y[a])) - (B(Y[b]) - B(Y[a])) * (B(qx) - B(X[a]));
    const onSeg = o === 0n && Math.min(X[a], X[b]) <= qx && qx <= Math.max(X[a], X[b]) && Math.min(Y[a], Y[b]) <= qy && qy <= Math.max(Y[a], Y[b]);
    if (onSeg) return false;
    if ((Y[a] > qy) !== (Y[b] > qy)) {
      if (Y[b] > Y[a] ? o > 0n : o < 0n) inside = !inside;
    }
  }
  return inside;
}

/** One face of a level's view: its outer cycle and its hole cycles. */
export interface ViewFace {
  readonly outer: HalfEdgeId[];
  readonly holes: HalfEdgeId[][];
  readonly area: bigint;
}

/** Every level-l cycle (each half-edge of level ≤ l in exactly one). */
export function cyclesAt(p: Plat, level: Level): HalfEdgeId[][] {
  const seen = new Set<HalfEdgeId>();
  const out: HalfEdgeId[][] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h) || p.halfEdges.level[h >> 1] > level || seen.has(h)) continue;
    const ring = walkRing(p, level, h);
    for (const g of ring) seen.add(g);
    out.push(ring);
  }
  return out;
}

/** The faces of the level-l view: counter-clockwise cycles are outer rings; every other cycle is a hole of the smallest face strictly holding one of its vertices off that face's ring, or the unbounded outside. */
export function viewFaces(p: Plat, level: Level): ViewFace[] {
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const faces: ViewFace[] = [];
  const others: HalfEdgeId[][] = [];
  for (const c of cyclesAt(p, level)) {
    const a = ringArea2(p, c);
    if (a > 0n) faces.push({ outer: c, holes: [], area: a });
    else others.push(c);
  }
  for (const c of others) {
    let best = -1;
    for (let i = 0; i < faces.length; i++) {
      const on = new Set(faces[i].outer.map((h) => O[h]));
      const v = c.map((h) => O[h]).find((w) => !on.has(w));
      if (v === undefined) continue;
      if (strictlyInsideRing(p, faces[i].outer, X[v], Y[v]) && (best < 0 || faces[i].area < faces[best].area)) best = i;
    }
    if (best >= 0) faces[best].holes.push(c);
  }
  return faces;
}

const asKey = (ring: readonly HalfEdgeId[]): string => [...ring].sort((a, b) => a - b).join(',');

/**
 * §2.2 rules 1 – 2 and §3.10's nesting row against the records: per level, every live record's outer ring is a view
 * face's outer cycle and its holes exactly that face's holes; a view face without a record has no edge of its level on
 * any of its rings (an own child); every record above L0 has a live parent one level coarser that holds it. Returns the
 * problems found.
 */
export function faceProblems(p: Plat): string[] {
  const out: string[] = [];
  const O = p.halfEdges.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const T = p.halfEdges;
  const views = LEVELS.map((l) => viewFaces(p, l));
  for (const level of LEVELS) {
    const view = views[level];
    const byOuter = new Map<string, number>();
    view.forEach((f, i) => byOuter.set(asKey(f.outer), i));
    const used = new Set<number>();
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      let rings: HalfEdgeId[][];
      try {
        rings = faceWalk(p, level, f);
      } catch (e) {
        out.push(`L${level} face ${f} does not walk: ${String(e)}`);
        continue;
      }
      const i = byOuter.get(asKey(rings[0]));
      if (i === undefined) {
        out.push(`L${level} face ${f}'s outer ring is no face of the level's view`);
        continue;
      }
      if (used.has(i)) out.push(`two L${level} records share one view face`);
      used.add(i);
      const want = view[i].holes.map(asKey).sort();
      const have = rings.slice(1).map(asKey).sort();
      if (want.join('|') !== have.join('|')) out.push(`L${level} face ${f}'s holes are not its view face's (${have.length} recorded, ${want.length} in the view)`);
      if (level > 0) {
        const par = p.faces[level].parent[f];
        if (!isFaceLive(p, (level - 1) as Level, par)) {
          out.push(`L${level} face ${f} has no live parent`);
        } else {
          const pr = faceWalk(p, (level - 1) as Level, par);
          const coarse = rings[0].find((h) => T.level[h >> 1] <= level - 1);
          let holds: boolean;
          if (coarse !== undefined) {
            holds = pr.some((r) => r.includes(coarse));
          } else {
            // A ring of edges of its own level: a vertex of it strictly inside the parent's outer ring, in none of its holes.
            const v = O[rings[0][0]];
            holds = strictlyInsideRing(p, pr[0], X[v], Y[v]) && pr.slice(1).every((r) => !strictlyInsideRing(p, r, X[v], Y[v]));
            if (!holds) {
              // the vertex may sit on the parent's boundary: try the ring's edge midpoints (doubled)
              holds = rings[0].some((h) => {
                const a = O[h];
                const b = O[h ^ 1];
                const mx = X[a] + X[b];
                const my = Y[a] + Y[b];
                const dbl = (r: HalfEdgeId[]): boolean => {
                  const pts = r.map((g) => [2 * X[O[g]], 2 * Y[O[g]]]);
                  let inside = false;
                  for (let k = 0; k < pts.length; k++) {
                    const [ax, ay] = pts[k];
                    const [bx, by] = pts[(k + 1) % pts.length];
                    if ((ay > my) !== (by > my)) {
                      const o = (B(bx) - B(ax)) * (B(my) - B(ay)) - (B(by) - B(ay)) * (B(mx) - B(ax));
                      if (by > ay ? o > 0n : o < 0n) inside = !inside;
                    }
                  }
                  return inside;
                };
                return dbl(pr[0]) && pr.slice(1).every((r) => !dbl(r));
              });
            }
          }
          if (!holds) out.push(`L${level} face ${f} does not lie in its parent (L${level - 1} face ${par})`);
        }
      }
    }
    view.forEach((vf, i) => {
      if (used.has(i)) return;
      const rings = [vf.outer, ...vf.holes];
      if (rings.some((r) => r.some((h) => T.level[h >> 1] === level))) {
        out.push(`an L${level} view face (outer ring from (${X[O[vf.outer[0]]]}, ${Y[O[vf.outer[0]]]})) holds an L${level} edge but has no record`);
      }
    });
  }
  return out;
}

/** The level-l view's V, E, F (faces + the outside) and components, from the arena alone. */
export function eulerCounts(p: Plat, level: Level): { v: number; e: number; f: number; c: number } {
  const T = p.halfEdges;
  const L = p.vertices.level;
  const O = T.origin;
  // Vertices of the view: level ≤ l with an edge of level ≤ l. Pieces: pairs of level ≤ l, less one per finer vertex a
  // run of level ≤ l passes through.
  const parent = new Map<VertexId, VertexId>();
  const find = (v: VertexId): VertexId => {
    let r = v;
    while (parent.get(r) !== r) r = parent.get(r) as VertexId;
    let w = v;
    while (w !== r) {
      const nx = parent.get(w) as VertexId;
      parent.set(w, r);
      w = nx;
    }
    return r;
  };
  let pairs = 0;
  const touched = new Set<VertexId>();
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e) || T.level[e] > level) continue;
    pairs += 1;
    const a = O[2 * e];
    const b = O[2 * e + 1];
    touched.add(a);
    touched.add(b);
    if (!parent.has(a)) parent.set(a, a);
    if (!parent.has(b)) parent.set(b, b);
    parent.set(find(a), find(b));
  }
  let v = 0;
  let through = 0;
  for (const w of touched) {
    if (L[w] <= level) v += 1;
    else through += 1; // a finer vertex inside a run of level ≤ l: two sub-edges, one piece
  }
  const roots = new Set<VertexId>();
  for (const w of touched) roots.add(find(w));
  const f = viewFaces(p, level).length + 1;
  return { v, e: pairs - through, f, c: roots.size };
}

/** §3.10's Euler row on every level: V − E + F = 1 + components. Returns the problems. */
export function eulerProblems(p: Plat): string[] {
  const out: string[] = [];
  for (const level of LEVELS) {
    const k = eulerCounts(p, level);
    if (k.e === 0) continue;
    if (k.v - k.e + k.f !== 1 + k.c) out.push(`L${level}: V − E + F = ${k.v} − ${k.e} + ${k.f} ≠ 1 + ${k.c}`);
  }
  return out;
}

/** Every check after an insertion: M0-a-04's validator, the face records, the Euler characteristic. */
export function allProblems(p: Plat): string[] {
  return [...problems(p), ...faceProblems(p), ...eulerProblems(p)];
}

/** The live face records of a level. */
export function facesAt(p: Plat, level: Level): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) out.push(f);
  return out;
}

/** The vertex at a lattice point, or −1. */
export function vertexAtPoint(p: Plat, x: number, y: number): VertexId {
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && p.vertices.x[v] === x && p.vertices.y[v] === y) return v;
  return -1;
}

/** The neighbours of a vertex's lattice points, as text. */
export function neighbourPoints(p: Plat, v: VertexId): string[] {
  return outgoing(p, v).map((h) => `${p.vertices.x[p.halfEdges.origin[h ^ 1]]},${p.vertices.y[p.halfEdges.origin[h ^ 1]]}`).sort();
}

/**
 * A canonical fingerprint of the arena's content, free of slot numbers: every vertex (point, level, flags, rows), every
 * edge (its ends' points, level, rows), every face record per level (its rings as point texts, kind, owner, stage, its
 * parent's outer ring). Two equal fingerprints mean the same arena whatever the slots (a refused op wrote nothing).
 */
export function contentPrint(p: Plat): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const R = p.roles;
  const rowText = (rows: number[]): string => rows.map((r) => `${R.kind[r]}/${idOfRow(p, r)}/${R.level[r]}/${R.ordinal[r]}`).sort().join(';');
  const out: string[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    out.push(`v ${X[v]},${Y[v]} L${p.vertices.level[v]} f${p.vertices.flags[v]} [${rowText(rowsOnV(p, v))}]`);
  }
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const a = O[2 * e];
    const b = O[2 * e + 1];
    const [s, t] = X[a] < X[b] || (X[a] === X[b] && Y[a] < Y[b]) ? [a, b] : [b, a];
    out.push(`e ${X[s]},${Y[s]}-${X[t]},${Y[t]} L${p.halfEdges.level[e]} [${rowText(rowsOnE(p, 2 * e))}]`);
  }
  const ringText = (ring: readonly HalfEdgeId[]): string => {
    const pts = ring.map((h) => `${X[O[h]]},${Y[O[h]]}`);
    let low = 0;
    for (let i = 1; i < pts.length; i++) if (pts[i] < pts[low]) low = i;
    return pts.slice(low).concat(pts.slice(0, low)).join(' ');
  };
  for (const level of LEVELS) {
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const rings = faceWalk(p, level, f).map(ringText);
      const F = p.faces[level];
      const par = level === 0 ? '-' : ringText(faceWalk(p, (level - 1) as Level, F.parent[f])[0]);
      out.push(`f${level} ${rings[0]} | ${rings.slice(1).sort().join(' | ')} k${F.kind[f]} o${F.owner[f] < 0 ? '-' : idOfHandleText(p, F.owner[f])} s${F.stage[f]} p(${par})`);
    }
  }
  return out.sort().join('\n');
}

import { idOf, rowsOn } from '../../../src/arena/index.js';
function rowsOnV(p: Plat, v: VertexId): number[] {
  return rowsOn(p, 'vertex', v);
}
function rowsOnE(p: Plat, h: HalfEdgeId): number[] {
  return rowsOn(p, 'edge', h);
}
function idOfRow(p: Plat, r: number): string {
  return idOf(p, p.roles.entity[r]);
}
function idOfHandleText(p: Plat, h: number): string {
  return idOf(p, h);
}

import { rowKey } from '../../../src/arena/index.js';

/** The half-edge from the vertex at a to the vertex at b (lattice points), or −1. */
export function halfEdgeBetween(p: Plat, a: readonly [number, number], b: readonly [number, number]): HalfEdgeId {
  const va = vertexAtPoint(p, a[0], a[1]);
  const vb = vertexAtPoint(p, b[0], b[1]);
  if (va < 0 || vb < 0) return -1;
  for (const h of outgoing(p, va)) if (p.halfEdges.origin[h ^ 1] === vb) return h;
  return -1;
}

/** The rows on a half-edge's pair as sorted "role/entity" texts. */
export function rowTexts(p: Plat, h: HalfEdgeId): string[] {
  return rowsOn(p, 'edge', h).map((r) => {
    const k = rowKey(p, r);
    return `${k.role}/${k.entity}`;
  }).sort();
}

/** The rows on the edge between two lattice points, or null when no edge joins them. */
export function edgeRows(p: Plat, a: readonly [number, number], b: readonly [number, number]): string[] | null {
  const h = halfEdgeBetween(p, a, b);
  return h < 0 ? null : rowTexts(p, h);
}
