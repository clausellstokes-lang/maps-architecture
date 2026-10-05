// compactSlots (M0-a-15; §3.9 "slots are compacted on save … so renumbering is free", §3.3 "No output depends on slot
// numbers": "an arena compacted on save, one grown through a long session and one merged from pool overlays give
// identical results for the same next edit"; C-0037). A copy of the arena with every slot table dense — no free slot,
// no gap — and numbered in one canonical order read on lattice positions: vertices by (y, x); edge pairs by their two
// endpoints (the lower first), each pair's even half-edge leaving its lower endpoint; each level's faces by their
// canonical keys (§3.3); role rows element by element in that order, each set in its stored order. It is a renaming
// only: every stored choice among equivalents (a vertex's `out`, a face's `outer` half-edge and hole entries) and every
// list whose order is a history (an owner's face list, a role key's same-key chain) is kept, renamed, so the next
// operation on the copy does exactly what it does on the original. The spatial index is rebuilt from the copy with the
// original's configuration (the load's rebuild, §3.9; a rebuild changes no query's answer, §13.1), and M0-d-04's
// maintained digests are re-attached when the original carried them. The original is not changed. Readings: C-0207.
import {
  compareFaces,
  compareVertices,
  createPlat,
  faceHoles,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  ownerGet,
  ownerSet,
  roleHeadGet,
  roleHeadSet,
  roleInfo,
  roleKeyWord,
  rowsOn,
  setFaceHoles,
  type Five,
  type Plat,
} from '../arena/index.js';
import { attachLevelDigests, hasLevelDigests } from '../digest/index.js';
import { attachIndex } from '../index/index.js';

function fail(message: string): never {
  throw new Error(`compactSlots: ${message}`);
}

/** A dense, canonically numbered copy of `plat` (see the module comment). Throws while a batch is open on it. */
export function compactSlots(plat: Plat): Plat {
  const p = plat;
  if (p.index !== undefined && p.index.log !== null) fail('a batch is open on the arena');
  const V = p.vertices;
  const T = p.halfEdges;
  const R = p.roles;

  // The canonical orders and the old → new maps.
  const verts: number[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) verts.push(v);
  verts.sort((a, b) => compareVertices(p, a, b));
  const vMap = new Int32Array(p.slots.vertex.top).fill(-1);
  verts.forEach((v, i) => (vMap[v] = i));

  const lower = (e: number): number => (compareVertices(p, T.origin[2 * e], T.origin[2 * e + 1]) <= 0 ? T.origin[2 * e] : T.origin[2 * e + 1]);
  const upper = (e: number): number => (lower(e) === T.origin[2 * e] ? T.origin[2 * e + 1] : T.origin[2 * e]);
  const pairs: number[] = [];
  for (let e = 0; e < p.slots.pair.top; e++) if (isHalfEdgeLive(p, 2 * e)) pairs.push(e);
  pairs.sort((a, b) => compareVertices(p, lower(a), lower(b)) || compareVertices(p, upper(a), upper(b)));
  for (let i = 1; i < pairs.length; i++) {
    if (lower(pairs[i]) === lower(pairs[i - 1]) && upper(pairs[i]) === upper(pairs[i - 1])) fail('two edges join one pair of vertices');
  }
  const pMap = new Int32Array(p.slots.pair.top).fill(-1);
  const flip = new Uint8Array(p.slots.pair.top);
  pairs.forEach((e, i) => {
    pMap[e] = i;
    flip[e] = lower(e) === T.origin[2 * e] ? 0 : 1;
  });
  const hMap = (h: number): number => (h < 0 ? h : 2 * pMap[h >> 1] + ((h & 1) ^ flip[h >> 1]));

  const faces: number[][] = [];
  const fMap: Int32Array[] = [];
  for (const level of LEVELS) {
    const fs: number[] = [];
    for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) fs.push(f);
    fs.sort((a, b) => compareFaces(p, level, a, b));
    const m = new Int32Array(p.slots.face[level].top).fill(-1);
    fs.forEach((f, i) => (m[f] = i));
    faces.push(fs);
    fMap.push(m);
  }

  const rows: number[] = [];
  for (const v of verts) for (const r of rowsOn(p, 'vertex', v)) rows.push(r);
  for (const e of pairs) for (const r of rowsOn(p, 'edge', 2 * e)) rows.push(r);
  const rMap = new Int32Array(p.slots.role.top).fill(-1);
  rows.forEach((r, i) => (rMap[r] = i));

  const nv = verts.length;
  const np = pairs.length;
  const nr = rows.length;
  const one = (n: number): number => (n > 0 ? n : 1);
  const q = createPlat(p.key, p.frame, {
    vertices: one(nv),
    edgePairs: one(np),
    faces: faces.map((fs) => one(fs.length)) as Five<number>,
    roleRows: one(nr),
    roleKeys: one(R.head.count),
    owners: LEVELS.map((l) => one(p.faces[l].ownerHead.count)) as Five<number>,
    handles: 1,
    idUnits: 1,
    holes: 16,
  });

  // Vertices.
  verts.forEach((v, i) => {
    q.vertices.x[i] = V.x[v];
    q.vertices.y[i] = V.y[v];
    q.vertices.out[i] = hMap(V.out[v]);
    q.vertices.level[i] = V.level[v];
    q.vertices.flags[i] = V.flags[v];
  });
  q.slots.vertex = { top: nv, free: -1, live: nv };

  // Half-edges.
  pairs.forEach((e, i) => {
    for (const k of [0, 1]) {
      const h = 2 * e + k;
      const g = hMap(h);
      q.halfEdges.origin[g] = vMap[T.origin[h]];
      q.halfEdges.next[g] = hMap(T.next[h]);
      q.halfEdges.prev[g] = hMap(T.prev[h]);
    }
    q.halfEdges.level[i] = T.level[e];
  });
  q.slots.pair = { top: np, free: -1, live: np };

  // Role rows: sets, same-key chains and heads renamed, every order kept.
  const Q = q.roles;
  rows.forEach((r, i) => {
    Q.kind[i] = R.kind[r];
    Q.entity[i] = R.entity[r];
    Q.level[i] = R.level[r];
    Q.ordinal[i] = R.ordinal[r];
    const nx = R.nextInSet[r];
    if (nx >= 0) {
      Q.nextInSet[i] = rMap[nx];
    } else {
      const el = -2 - nx;
      Q.nextInSet[i] = -2 - (roleInfo(R.kind[r]).kind === 'edge' ? pMap[el] : vMap[el]);
    }
    Q.nextSameKey[i] = R.nextSameKey[r] >= 0 ? rMap[R.nextSameKey[r]] : -1;
  });
  verts.forEach((v, i) => (Q.vertexFirst[i] = R.vertexFirst[v] >= 0 ? rMap[R.vertexFirst[v]] : -1));
  pairs.forEach((e, i) => (Q.edgeFirst[i] = R.edgeFirst[e] >= 0 ? rMap[R.edgeFirst[e]] : -1));
  for (const r of rows) {
    const k1 = roleKeyWord(R.kind[r], R.ordinal[r]);
    if (roleHeadGet(R.head, R.entity[r], k1) === r) roleHeadSet(Q.head, R.entity[r], k1, rMap[r]);
  }
  q.slots.role = { top: nr, free: -1, live: nr };

  // The interned handles (not slots, §2.1): copied as they are.
  const t = p.handles;
  q.handles = { units: t.units.slice(), start: t.start.slice(), hash: t.hash.slice(), slots: t.slots.slice(), count: t.count };

  // Faces, level by level: records renamed, hole runs re-laid in the new order, owner lists kept in their order.
  for (const level of LEVELS) {
    const F = p.faces[level];
    const G = q.faces[level];
    const fs = faces[level];
    fs.forEach((f, i) => {
      G.outer[i] = hMap(F.outer[f]);
      G.kind[i] = F.kind[f];
      G.owner[i] = F.owner[f];
      G.parent[i] = level === 0 || F.parent[f] < 0 ? -1 : fMap[level - 1][F.parent[f]];
      G.stage[i] = F.stage[f];
      G.nextOfOwner[i] = F.nextOfOwner[f] >= 0 ? fMap[level][F.nextOfOwner[f]] : -1;
    });
    q.slots.face[level] = { top: fs.length, free: -1, live: fs.length };
    fs.forEach((f, i) => {
      const holes = faceHoles(p, level, f);
      if (holes.length > 0) setFaceHoles(q, level, i, holes.map(hMap));
      const o = F.owner[f];
      if (o >= 0 && ownerGet(F.ownerHead, o) === f) ownerSet(G.ownerHead, o, i);
    });
  }
  q.version = p.version;

  if (p.index !== undefined) {
    const cells = p.index.levels.map((l) => l.dynamic.cellCm) as Five<number>;
    attachIndex(q, p.index.partitionOf === null ? { gridCellCm: cells } : { gridCellCm: cells, partitionOf: p.index.partitionOf });
  }
  if (hasLevelDigests(p)) attachLevelDigests(q);
  return q;
}
