// encodeArena (M0-a-15; §3.9 whole, §3.3's partitions and their rebuild rule, §2.2 rule 3, §6.5 (3); C-0037): the
// arena block as bytes in memory — one chunk for the level-≤ 1 routes and one per non-empty L2–L4 static partition, each
// content-addressed by H128 over its bytes. No slot and no text enters a chunk: vertices are written by lattice point in
// (y, x) order, edges as route triples between their endpoints, rows and faces against those, every list in a canonical
// order read on lattice positions and address ids, so two arenas that differ only in their slots (a compacted one, a
// renumbered one, one grown through a long session) write identical bytes (§3.3 "No output depends on slot numbers").
//
// What goes where (§3.9 *Chunks*; readings C-0207):
// * the routes chunk — every vertex of birth level ≤ 1 (with its flags); every L0–L1 edge as one (origin, destination,
//   birth level) triple between its level-≤ 1 endpoints, i.e. per level-1 route edge (finer vertices on it are not part
//   of the chunk); every row of level ≤ 1 (on a vertex; on a level-1 route edge, constant along it); the L0 and L1 face
//   rows;
// * the chunk of the L2–L4 partition (level ℓ, key) — the vertices of level ℓ that belong to it by §3.3's rebuild rule;
//   the Steiner splits those vertices make on coarser edges, each as the level-(ℓ − 1) route edge it splits (its two
//   endpoints, by lattice point) and the split vertex; the level-ℓ route edges of level-ℓ edges that belong to it; the
//   rows of level ℓ on its own vertices and edges, and the finer rows of level ℓ on coarser vertices and route edges
//   whose level-ℓ faces belong to it (the smaller key where they differ; OUTSIDE where no level-ℓ face is there); its
//   level-ℓ face rows — each named by its canonical key (§3.3), with its holes named alike, its owner, kind and stage
//   rank. Parents, next / prev, twins, `out`, slots and per-level digests are not stored (§3.9).
import {
  compareHandleIds,
  compareVertices,
  dest,
  faceHoles,
  faceKey,
  faceWalk,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  outgoing,
  ROLE_REGISTRY_VERSION,
  rowsOn,
  walkRing,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { H128 } from '../hash/index.js';
import { ITEM_EDGE, ITEM_FACE, ITEM_VERTEX, OUTSIDE, partitionKeyOf, routeHandlePair, type ItemRef } from '../index/index.js';
import type { Handle, Level } from '../types/index.js';
import { ByteWriter } from './bytes.js';
import { FORMAT_VERSION, KIND_PARTITION, KIND_ROUTES, layerCodeOf, MAGIC, ringKey } from './format.js';
import type { Chunk } from './types.js';

/** The arena breaks a structural rule the block relies on (a programming error: the arena itself is invalid). */
function fail(message: string): never {
  throw new Error(`encodeArena: ${message}`);
}

/** One route edge of a level: its endpoints (the lower (y, x) first) and its sub-edges from `a`, directed along it. */
interface Run {
  readonly a: VertexId;
  readonly b: VertexId;
  readonly halfEdges: readonly HalfEdgeId[];
  /** The birth level of its sub-edges (one level along a run, §3.10's level consistency). */
  readonly level: Level;
}

/** The route edges of a level r: every live edge of level ≤ r cut at the vertices of level ≤ r (§3.3). */
interface Runs {
  readonly runs: Run[];
  /** Per edge pair: its run's index, −1 for a pair finer than r or not live. */
  readonly of: Int32Array;
}

/**
 * The half-edge continuing a level-r run past the end of `g`, or −1 where dest(g) is of level ≤ r: at a vertex finer
 * than r the run's two sub-edges are its only edges of level ≤ r (§3.10's level consistency row; §2.2 rule 3).
 */
function onward(p: Plat, g: HalfEdgeId, r: Level): HalfEdgeId {
  const w = dest(p, g);
  if (p.vertices.level[w] <= r) return -1;
  let found = -1;
  let count = 0;
  for (const e of outgoing(p, w)) {
    if (p.halfEdges.level[e >> 1] > r) continue;
    count++;
    if (e !== (g ^ 1)) found = e;
  }
  if (count !== 2 || found === -1) fail(`vertex ${w} (L${p.vertices.level[w]}) inside a level-${r} route has ${count} edges of level ≤ ${r}, not two`);
  return found;
}

function runsAt(p: Plat, r: Level): Runs {
  const top = p.slots.pair.top;
  const of = new Int32Array(top).fill(-1);
  const runs: Run[] = [];
  const T = p.halfEdges;
  for (let e = 0; e < top; e++) {
    if (of[e] !== -1 || !isHalfEdgeLive(p, 2 * e) || T.level[e] > r) continue;
    const forward: HalfEdgeId[] = [2 * e];
    for (let g = onward(p, 2 * e, r); g !== -1; g = onward(p, g, r)) {
      if (g === 2 * e || forward.length > top) fail(`a level-${r} route through pair ${e} has no endpoint of level ≤ ${r}`);
      forward.push(g);
    }
    const backward: HalfEdgeId[] = [];
    for (let g = onward(p, 2 * e + 1, r); g !== -1; g = onward(p, g, r)) {
      if (backward.length + forward.length > top) fail(`a level-${r} route through pair ${e} does not end`);
      backward.push(g);
    }
    let hs: HalfEdgeId[] = [];
    for (let i = backward.length - 1; i >= 0; i--) hs.push(backward[i] ^ 1);
    hs = hs.concat(forward);
    let a = T.origin[hs[0]];
    let b = dest(p, hs[hs.length - 1]);
    if (a === b) fail(`a level-${r} route is a loop off one vertex (${a}): not written at M0 (C-0207)`);
    if (compareVertices(p, b, a) < 0) {
      hs = hs.reverse().map((h) => h ^ 1);
      const t = a;
      a = b;
      b = t;
    }
    const level = T.level[hs[0] >> 1] as Level;
    const id = runs.length;
    for (const h of hs) {
      if (T.level[h >> 1] !== level) fail(`a level-${r} route mixes edge levels`);
      of[h >> 1] = id;
    }
    runs.push({ a, b, halfEdges: hs, level });
  }
  return { runs, of };
}

/** The rows on an element whose level passes `keep`, as their slots in set order (rule 7). */
function rowsWhere(p: Plat, kind: 'edge' | 'vertex', element: number, keep: (level: number) => boolean): number[] {
  return rowsOn(p, kind, element).filter((r) => keep(p.roles.level[r]));
}

/** Do two row lists hold the same rows (role, entity, level, ordinal) in the same order? */
function sameRows(p: Plat, x: readonly number[], y: readonly number[]): boolean {
  if (x.length !== y.length) return false;
  const R = p.roles;
  for (let i = 0; i < x.length; i++) {
    const a = x[i];
    const b = y[i];
    if (R.kind[a] !== R.kind[b] || R.entity[a] !== R.entity[b] || R.level[a] !== R.level[b] || R.ordinal[a] !== R.ordinal[b]) return false;
  }
  return true;
}

/** The rows of a level class on a run — constant along it (§2.2 rule 3), else the arena is malformed. */
function runRows(p: Plat, run: Run, keep: (level: number) => boolean): number[] {
  const first = rowsWhere(p, 'edge', run.halfEdges[0], keep);
  for (let i = 1; i < run.halfEdges.length; i++) {
    if (!sameRows(p, first, rowsWhere(p, 'edge', run.halfEdges[i], keep))) fail('the rows of one level differ along a route edge of that level');
  }
  return first;
}

interface FaceRow {
  readonly level: Level;
  readonly face: number;
  readonly a: VertexId;
  readonly b: VertexId;
  readonly holes: readonly (readonly [VertexId, VertexId])[];
}

interface Bucket {
  readonly level: Level;
  readonly key: string;
  readonly vertices: VertexId[];
  readonly splits: { v: VertexId; a: VertexId; b: VertexId }[];
  readonly edges: { a: VertexId; b: VertexId; level: Level }[];
  readonly vertexRows: { v: VertexId; rows: number[] }[];
  readonly edgeRows: { a: VertexId; b: VertexId; rows: number[] }[];
  readonly faces: FaceRow[];
}

function bucket(level: Level, key: string): Bucket {
  return { level, key, vertices: [], splits: [], edges: [], vertexRows: [], edgeRows: [], faces: [] };
}

/**
 * The arena block of `plat` (§3.9; C-0037): the routes chunk first, then one chunk per non-empty L2–L4 partition in
 * (level, key) order. A partition's key is §3.3's — the attached index's district resolver (OUTSIDE without one, or
 * without an index). Throws on an arena that breaks the structural rules the block relies on (a programming error,
 * never a geometric outcome): a level-r route without endpoints, rows that vary along their route, a face ring with
 * fewer than two vertices of its level, two route edges of one level between one pair of vertices.
 */
export function encodeArena(plat: Plat): Chunk[] {
  const p = plat;
  if (p.index !== undefined && p.index.log !== null) fail('a batch is open on the arena');
  const V = p.vertices;
  const T = p.halfEdges;
  const R = p.roles;
  const keyOf = (item: ItemRef): string => (p.index === undefined ? OUTSIDE : partitionKeyOf(p, item));

  const runs: Runs[] = [];
  for (const r of LEVELS) runs.push(r === 0 ? { runs: [], of: new Int32Array(0) } : runsAt(p, r));
  // §3.3: no two level-r route edges share both endpoints (the key is total); the block names a route by its endpoints.
  for (let r = 1; r <= 4; r++) {
    const seen = new Set<number>();
    for (const run of runs[r].runs) {
      const k = run.a * p.slots.vertex.top + run.b;
      if (seen.has(k)) fail(`two level-${r} route edges join vertices ${run.a} and ${run.b}`);
      seen.add(k);
    }
  }

  // Each level's faces: the face on the left of every half-edge of their rings (the finer rows' partition rule).
  const faceAt: Int32Array[] = [];
  const faceRows: FaceRow[] = [];
  for (const level of LEVELS) {
    const at = new Int32Array(2 * p.slots.pair.top).fill(-1);
    faceAt.push(at);
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const rings = faceWalk(p, level, f);
      for (const ring of rings) for (const h of ring) at[h] = f;
      const [a, b] = faceKey(p, level, f);
      const holes = faceHoles(p, level, f).map((h) => {
        const k = ringKey(p, level, walkRing(p, level, h));
        if (k === null) fail(`a hole ring of L${level} face ${f} holds fewer than two vertices of its level`);
        return k;
      });
      faceRows.push({ level, face: f, a, b, holes });
    }
  }

  const routes = bucket(1, OUTSIDE);
  const parts: Map<string, Bucket>[] = [new Map(), new Map(), new Map(), new Map(), new Map()];
  const partition = (level: Level, key: string): Bucket => {
    let b = parts[level].get(key);
    if (b === undefined) {
      b = bucket(level, key);
      parts[level].set(key, b);
    }
    return b;
  };
  const vertexKey: string[] = [];
  /** The partition of a finer row of `level` on a coarser element: its level-`level` faces' (the smaller key), else OUTSIDE. */
  const finerKey = (level: Level, halfEdges: readonly HalfEdgeId[]): string => {
    let best: string | null = null;
    for (const h of halfEdges) {
      const f = faceAt[level][h];
      if (f < 0) continue;
      const k = keyOf({ kind: ITEM_FACE, level, slot: f });
      if (best === null || k < best) best = k;
    }
    return best ?? OUTSIDE;
  };

  // Vertices and their splits.
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    const lv = V.level[v] as Level;
    if (lv <= 1) {
      routes.vertices.push(v);
      continue;
    }
    const key = keyOf({ kind: ITEM_VERTEX, level: lv, slot: v });
    vertexKey[v] = key;
    const b = partition(lv, key);
    b.vertices.push(v);
    const coarser = outgoing(p, v).filter((h) => T.level[h >> 1] < lv);
    if (coarser.length === 0) continue;
    if (coarser.length !== 2 || T.level[coarser[0] >> 1] !== T.level[coarser[1] >> 1]) fail(`vertex ${v} (L${lv}) has coarser edges that are not one run`);
    const run = runs[lv - 1].runs[runs[lv - 1].of[coarser[0] >> 1]];
    b.splits.push({ v, a: run.a, b: run.b });
  }

  // Route edges, with their rows; finer rows on coarser route edges.
  for (const run of runs[1].runs) {
    routes.edges.push({ a: run.a, b: run.b, level: run.level });
    const rows = runRows(p, run, (l) => l <= 1);
    if (rows.length > 0) routes.edgeRows.push({ a: run.a, b: run.b, rows });
  }
  for (let r = 2; r <= 4; r++) {
    const level = r as Level;
    for (const run of runs[r].runs) {
      const rows = runRows(p, run, (l) => l === r);
      let key: string | null = null;
      if (run.level === level) {
        key = keyOf({ kind: ITEM_EDGE, level, slot: routeHandlePair(p, run.halfEdges[0]) });
        partition(level, key).edges.push({ a: run.a, b: run.b, level });
      }
      if (rows.length === 0) continue;
      if (key === null) key = finerKey(level, [run.halfEdges[0], run.halfEdges[0] ^ 1]);
      partition(level, key).edgeRows.push({ a: run.a, b: run.b, rows });
    }
  }

  // Vertex rows: those of level ≤ 1 in the routes chunk; the rest in their level's partition.
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    const lv = V.level[v];
    const all = rowsOn(p, 'vertex', v);
    const coarse = all.filter((r) => R.level[r] <= 1);
    if (coarse.length > 0) routes.vertexRows.push({ v, rows: coarse });
    for (let r = 2; r <= 4; r++) {
      const level = r as Level;
      const rows = all.filter((x) => R.level[x] === r);
      if (rows.length === 0) continue;
      const key = lv === r ? vertexKey[v] : finerKey(level, outgoing(p, v).filter((h) => T.level[h >> 1] <= r));
      partition(level, key).vertexRows.push({ v, rows });
    }
  }

  // Face rows.
  for (const row of faceRows) {
    if (row.level <= 1) routes.faces.push(row);
    else partition(row.level, keyOf({ kind: ITEM_FACE, level: row.level, slot: row.face })).faces.push(row);
  }

  const chunks: Chunk[] = [write(p, routes, true)];
  for (let level = 2; level <= 4; level++) {
    const keys: string[] = [];
    for (const k of parts[level].keys()) keys.push(k);
    keys.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    for (const k of keys) chunks.push(write(p, parts[level].get(k) as Bucket, false));
  }
  return chunks;
}

/** One bucket's bytes and their content hash. */
function write(p: Plat, b: Bucket, isRoutes: boolean): Chunk {
  const V = p.vertices;
  const R = p.roles;
  const byPoint = (x: VertexId, y: VertexId): number => compareVertices(p, x, y);
  const byPair = (x: { a: VertexId; b: VertexId }, y: { a: VertexId; b: VertexId }): number => byPoint(x.a, y.a) || byPoint(x.b, y.b);

  b.vertices.sort(byPoint);
  const local = new Map<VertexId, number>();
  b.vertices.forEach((v, i) => local.set(v, i));
  b.splits.sort((x, y) => byPoint(x.v, y.v));
  b.edges.sort(byPair);
  b.vertexRows.sort((x, y) => byPoint(x.v, y.v));
  b.edgeRows.sort(byPair);
  b.faces.sort((x, y) => x.level - y.level || byPair(x, y));

  // The entities its rows and owners name, in address-id order.
  const handles = new Set<Handle>();
  for (const g of b.vertexRows) for (const r of g.rows) handles.add(R.entity[r]);
  for (const g of b.edgeRows) for (const r of g.rows) handles.add(R.entity[r]);
  for (const f of b.faces) {
    const o = p.faces[f.level].owner[f.face];
    if (o >= 0) handles.add(o);
  }
  const entities: Handle[] = [];
  for (const h of handles) entities.push(h);
  entities.sort((x, y) => compareHandleIds(p.handles, x, y));
  const entityIndex = new Map<Handle, number>();
  entities.forEach((h, i) => entityIndex.set(h, i));

  const w = new ByteWriter();
  const ref = (v: VertexId): void => {
    const i = local.get(v);
    if (i !== undefined) {
      w.uv(i + 1);
    } else {
      w.uv(0);
      w.sv(V.x[v]);
      w.sv(V.y[v]);
    }
  };
  const rows = (list: readonly number[]): void => {
    w.uv(list.length);
    for (const r of list) {
      w.uv(R.kind[r]);
      w.uv(entityIndex.get(R.entity[r]) as number);
      w.u8(R.level[r]);
      w.u16(R.ordinal[r]);
    }
  };

  w.raw(MAGIC);
  w.uv(FORMAT_VERSION);
  w.u8(isRoutes ? KIND_ROUTES : KIND_PARTITION);
  w.uv(ROLE_REGISTRY_VERSION);
  w.u8(layerCodeOf(p.key.layer));
  w.uv(p.key.part);
  if (isRoutes) {
    w.uv(p.frame.widthCm);
    w.uv(p.frame.heightCm);
    w.f64(p.frame.aspect);
    w.f64(p.frame.marginShare);
  } else {
    w.u8(b.level);
    w.str(b.key);
  }

  w.uv(entities.length);
  for (const h of entities) {
    const t = p.handles;
    w.uv(t.start[h + 1] - t.start[h]);
    for (let i = t.start[h]; i < t.start[h + 1]; i++) w.uv(t.units[i]);
  }

  w.uv(b.vertices.length);
  let px = 0;
  let py = 0;
  for (const v of b.vertices) {
    w.sv(V.x[v] - px);
    w.sv(V.y[v] - py);
    px = V.x[v];
    py = V.y[v];
    w.u8(V.level[v]);
    w.u8(V.flags[v]);
  }

  w.uv(b.splits.length);
  for (const s of b.splits) {
    w.uv(local.get(s.v) as number);
    ref(s.a);
    ref(s.b);
  }

  w.uv(b.edges.length);
  for (const e of b.edges) {
    ref(e.a);
    ref(e.b);
    w.u8(e.level);
  }

  w.uv(b.vertexRows.length);
  for (const g of b.vertexRows) {
    ref(g.v);
    rows(g.rows);
  }

  w.uv(b.edgeRows.length);
  for (const g of b.edgeRows) {
    ref(g.a);
    ref(g.b);
    rows(g.rows);
  }

  w.uv(b.faces.length);
  for (const f of b.faces) {
    const F = p.faces[f.level];
    w.u8(f.level);
    ref(f.a);
    ref(f.b);
    w.u16(F.kind[f.face]);
    const o = F.owner[f.face];
    w.uv(o < 0 ? 0 : (entityIndex.get(o) as number) + 1);
    w.u8(F.stage[f.face]);
    const holes = f.holes.slice().sort((x, y) => byPoint(x[0], y[0]) || byPoint(x[1], y[1]));
    w.uv(holes.length);
    for (const [ha, hb] of holes) {
      ref(ha);
      ref(hb);
    }
  }

  const bytes = w.bytes();
  return { ref: H128(bytes), bytes };
}
