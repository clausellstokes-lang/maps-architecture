// The minimal Seam records (M0-e-04; C-0046; II.1's boundary runs; §6.3: "S6's run for Seam records (creation index by
// the run's lowest-then-leftmost vertex)"; readings C-0242 (15)): one record per shared boundary run of a district —
// with another district, with the hinterland across the perimeter, or one-sided (the frame, water, a reservation, the
// wall strips: `sides[1]` null) — its edges one SeamEdge per chain the run follows (the way, wall, shore, reservation
// boundary, perimeter or border it lies on), its portals empty (S8 adds its `baseLane` portals). A run is a maximal
// path of L1 edges with the same two sides; where such edges branch, each branch is its own run.
import { idOf, roleInfo, rowsOn, type HalfEdgeId, type Plat, type VertexId } from '@plat/kernel';
import type { Cm, Id, SeamEdge, Way } from '@plat/model';
import type { FaceGraph } from './faces.js';

/** One boundary run: its two sides, its edges (half-edges in walk order) and vertices, whether it closes. */
export interface SeamRun {
  /** [a, b | null]: in address order, null (one-sided) last. */
  readonly sides: readonly [Id, Id | null];
  readonly halfs: readonly HalfEdgeId[];
  /** Its vertices in walk order (a closed run does not repeat its first). */
  readonly vertices: readonly VertexId[];
  readonly closed: boolean;
}

/** Which side owns a face: a district or the hinterland (an id), or null (anything else). */
export type SideOf = (face: number) => Id | null;

function lowerVertex(p: Plat, a: VertexId, b: VertexId): boolean {
  const ya = p.vertices.y[a];
  const yb = p.vertices.y[b];
  return ya < yb || (ya === yb && p.vertices.x[a] < p.vertices.x[b]);
}

/**
 * The boundary runs of every district (see the module comment), ordered by their lowest-then-leftmost vertex (ties by
 * the sorted vertex lists): an edge is on a run when its two sides differ and at least one is a district.
 */
export function seamRuns(g: FaceGraph, sideOf: SideOf, isDistrict: (id: Id) => boolean): SeamRun[] {
  const p = g.plat;
  const O = p.halfEdges.origin;
  const groups = new Map<string, { sides: [Id, Id | null]; halfs: HalfEdgeId[] }>();
  const seen = new Set<number>();
  g.faces.forEach((_, i) => {
    for (const ring of g.rings[i]) {
      for (const h of ring) {
        if (seen.has(h >> 1)) continue;
        seen.add(h >> 1);
        const other = g.halfFace.get(h ^ 1);
        const a = sideOf(i);
        const b = other === undefined ? null : sideOf(other);
        if (a === b) continue;
        if (!((a !== null && isDistrict(a)) || (b !== null && isDistrict(b)))) continue;
        let sides: [Id, Id | null];
        if (a === null) sides = [b as Id, null];
        else if (b === null) sides = [a, null];
        else sides = a < b ? [a, b] : [b, a];
        const key = `${sides[0]}|${sides[1] ?? ''}`;
        let grp = groups.get(key);
        if (grp === undefined) {
          grp = { sides, halfs: [] };
          groups.set(key, grp);
        }
        grp.halfs.push(h);
      }
    }
  });
  const runs: SeamRun[] = [];
  for (const grp of groups.values()) {
    // The group's edges as an undirected graph by vertex.
    const at = new Map<VertexId, HalfEdgeId[]>();
    for (const h of grp.halfs) {
      for (const e of [h, h ^ 1]) {
        const v = O[e];
        const l = at.get(v);
        if (l === undefined) at.set(v, [e]);
        else l.push(e);
      }
    }
    const used = new Set<number>();
    const vs = [...at.keys()].sort((a, b) => (lowerVertex(p, a, b) ? -1 : lowerVertex(p, b, a) ? 1 : 0));
    const degree = (v: VertexId): number => (at.get(v) as HalfEdgeId[]).filter((e) => !used.has(e >> 1)).length;
    for (;;) {
      // Start at the lowest-then-leftmost end of an open path, else at the lowest-then-leftmost vertex with an edge left.
      let s: VertexId | undefined = vs.find((v) => degree(v) === 1);
      if (s === undefined) s = vs.find((v) => degree(v) > 0);
      if (s === undefined) break;
      const halfs: HalfEdgeId[] = [];
      const verts: VertexId[] = [s];
      let v = s;
      for (;;) {
        const out = (at.get(v) as HalfEdgeId[]).filter((e) => !used.has(e >> 1)).sort((a, b) => (lowerVertex(p, O[a ^ 1], O[b ^ 1]) ? -1 : lowerVertex(p, O[b ^ 1], O[a ^ 1]) ? 1 : 0));
        if (out.length === 0) break;
        const e = out[0];
        used.add(e >> 1);
        halfs.push(e);
        v = O[e ^ 1];
        if (v === s) break;
        verts.push(v);
      }
      runs.push({ sides: grp.sides, halfs, vertices: verts, closed: v === s && halfs.length > 1 });
    }
  }
  const sortedVerts = (r: SeamRun): VertexId[] => r.vertices.slice().sort((a, b) => (lowerVertex(p, a, b) ? -1 : lowerVertex(p, b, a) ? 1 : 0));
  const keyed = runs.map((r) => ({ r, vs: sortedVerts(r) }));
  keyed.sort((x, y) => {
    const n = Math.min(x.vs.length, y.vs.length);
    for (let i = 0; i < n; i += 1) {
      if (x.vs[i] === y.vs[i]) continue;
      return lowerVertex(p, x.vs[i], y.vs[i]) ? -1 : 1;
    }
    return x.vs.length - y.vs.length || (x.r.sides[0] < y.r.sides[0] ? -1 : x.r.sides[0] > y.r.sides[0] ? 1 : 0);
  });
  return keyed.map((k) => k.r);
}

/** A chain's seam type by its role (II.1's first type its role rows give, J-P37), in priority order. */
const TYPE_OF: readonly (readonly [string, SeamEdge['type'], boolean])[] = [
  ['way', 'way', false],
  ['wall', 'wall', true],
  ['wall_gate', 'wall', true],
  ['setback', 'wall', true],
  ['shore', 'water', true],
  ['bank', 'water', true],
  ['reserved', 'reserve', false],
  ['district_bound', 'field', false],
  ['border', 'frame', true],
  ['margin', 'frame', true],
];

/**
 * The run's SeamEdges: per edge, the chain of its first row in II.1's type order (a way first; the perimeter's
 * `district_bound` row reads as a `field` run, C-0242 (15)); consecutive edges on one chain are one SeamEdge. An edge
 * with none of these rows takes `own`, the seam's own `district_bound` chain.
 */
export function seamEdges(p: Plat, run: SeamRun, ways: ReadonlyMap<Id, Way>, own: Id): SeamEdge[] {
  const out: SeamEdge[] = [];
  for (const h of run.halfs) {
    const rows = rowsOn(p, 'edge', h).map((r) => ({ role: roleInfo(p.roles.kind[r]).name, entity: idOf(p, p.roles.entity[r]) }));
    let edge: SeamEdge = { chain: { role: 'district_bound', entity: own }, type: 'field', hard: false };
    for (const [role, type, hard] of TYPE_OF) {
      const r = rows.find((x) => x.role === role && !(role === 'district_bound' && x.entity === own));
      if (r === undefined) continue;
      edge = { chain: { role: r.role, entity: r.entity }, type, hard };
      if (type === 'reserve') edge.reservation = r.entity;
      if (type === 'way') {
        const w = ways.get(r.entity);
        if (w !== undefined) {
          edge.wayClass = w.class;
          if (typeof w.width === 'number') edge.widthCm = w.width as Cm;
        }
      }
      break;
    }
    const prev = out[out.length - 1];
    if (prev !== undefined && prev.chain.role === edge.chain.role && prev.chain.entity === edge.chain.entity) continue;
    out.push(edge);
  }
  return out;
}
