// The slot-renumbering harness (M0-d-08; §13.1 "renumbering the arena's slots gives identical output", §3.3 "No output
// depends on slot numbers": "an arena compacted on save, one grown through a long session and one merged from pool
// overlays give identical results for the same next edit"). `renumberSlots(plat, seed)` returns a copy of the arena
// with every slot table permuted and every table that names a slot rewritten:
//
// * vertex slots, edge-pair slots (each pair's two half-edges also swapped, so twin(h) = h ^ 1 still holds), the face
//   slots of each level and the role-row slots — each a random permutation of [0, top) (or, in `reverse` mode, the
//   reversal, which flips the order of every two slots and swaps every pair's halves, so a lowest-slot tie-break always
//   moves);
// * every column that names one — `out`, `origin` / `next` / `prev`, a face's `outer`, holes and `parent`, a row set's
//   links and its element mark, the role-head and owner tables, `vertexFirst` / `edgeFirst`, the home column;
// * the slot-like choices among equivalents (the kernel's own, never an output): which outgoing half-edge a vertex's
//   `out` names, which half-edge of its ring a face's `outer` and each hole entry name — re-drawn;
// * the lists whose order is a history of allocations, not a canonical order — an owner's face list, a role key's
//   same-key chain — re-linked in the new slot order, as a load would link them; the role-head and owner hash tables
//   rebuilt in that order; the free lists rebuilt in ascending slot order;
// * the spatial index carried over item by item — each partition's tree kept and its keys renamed, its tombstones and
//   grid overflow renamed, the dynamic grid's entries renamed in their cells — so the copy's index state is the
//   original's, renamed (no rebuild that would hide an index-state dependence); and M0-d-04's maintained level digests
//   re-attached when the original carried them.
//
// Interned handles are left as they are: they are not slots (§2.1), and §3.3's clause is about slots (C-XXXX (2)).
import {
  attachLevelDigests,
  createOwnerTable,
  createRoleHeadTable,
  faceHoles,
  FREE_KIND,
  hasLevelDigests,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  ITEM_EDGE,
  ITEM_VERTEX,
  itemKey,
  keyKind,
  keySlot,
  LEVELS,
  outgoing,
  ownerSet,
  roleHeadSet,
  roleInfo,
  roleKeyWord,
  VERTEX_FREE,
  walkRing,
  type Five,
  type GridEntry,
  type HalfEdgeId,
  type ItemKind,
  type Level,
  type LevelFaces,
  type LevelIndex,
  type PackedIndex,
  type Plat,
  type SpatialIndex,
  type UniformGrid,
} from '@plat/kernel';
import { below, harnessRng, shuffled, type HarnessRng } from './rng.js';

/** How the slots are moved: a seeded random permutation, or the reversal (every relative order flipped). */
export type RenumberMode = 'random' | 'reverse';

/** The options of a renumbering. */
export interface RenumberOptions {
  /** Default 'random'. */
  readonly mode?: RenumberMode;
  /** Re-draw `out`, `outer` and the hole entries among their equivalents (default true). */
  readonly starts?: boolean;
}

/** The permutations a renumbering applied (old slot → new slot), for the harness's own tests. */
export interface SlotMaps {
  readonly vertex: Int32Array;
  readonly pair: Int32Array;
  /** Per old pair: whether its two half-edges were swapped. */
  readonly flip: Uint8Array;
  readonly face: Five<Int32Array>;
  readonly role: Int32Array;
}

function permutation(n: number, mode: RenumberMode, r: HarnessRng): Int32Array {
  const out = new Int32Array(n);
  if (mode === 'reverse') {
    for (let i = 0; i < n; i++) out[i] = n - 1 - i;
    return out;
  }
  const order = shuffled(Array.from({ length: n }, (_, i) => i), r);
  for (let i = 0; i < n; i++) out[i] = order[i];
  return out;
}

/** One of `n` equivalent choices: a random one, or (reverse mode) the next after the stored one. */
function pick(n: number, mode: RenumberMode, r: HarnessRng): number {
  if (n <= 1) return 0;
  return mode === 'reverse' ? 1 : below(r, n);
}

function filled32(n: number, v: number): Int32Array {
  return new Int32Array(n).fill(v);
}

/**
 * The renumbered copy and the permutations it applied. The original is not changed. An arena with a batch open on it
 * (its index's batch log) is refused: slots are valid within one batch only, and renumbering happens between batches.
 */
export function renumbering(p: Plat, seed: number, opts: RenumberOptions = {}): { plat: Plat; maps: SlotMaps } {
  const mode = opts.mode ?? 'random';
  const starts = opts.starts ?? true;
  const r = harnessRng(seed);
  if (p.index !== undefined && p.index.log !== null) throw new Error('renumberSlots: a batch is open on the arena');
  const topV = p.slots.vertex.top;
  const topP = p.slots.pair.top;
  const topR = p.slots.role.top;
  const vMap = permutation(topV, mode, r);
  const pMap = permutation(topP, mode, r);
  const flip = new Uint8Array(topP);
  for (let e = 0; e < topP; e++) flip[e] = mode === 'reverse' ? 1 : r() < 0.5 ? 1 : 0;
  const fMap = LEVELS.map((l) => permutation(p.slots.face[l].top, mode, r)) as Five<Int32Array>;
  const rMap = permutation(topR, mode, r);
  const H = (h: HalfEdgeId): HalfEdgeId => (h < 0 ? h : 2 * pMap[h >> 1] + ((h & 1) ^ flip[h >> 1]));
  const R = (row: number): number => (row < 0 ? row : rMap[row]);

  // ---- vertices --------------------------------------------------------------------------------------------------
  const capV = p.vertices.x.length;
  const V = {
    x: new Int32Array(capV),
    y: new Int32Array(capV),
    out: filled32(capV, -1),
    level: new Uint8Array(capV),
    flags: new Uint8Array(capV).fill(VERTEX_FREE),
  };
  const vertexFirst = filled32(capV, -1);
  const homeV = new Int16Array(capV).fill(-1);
  const takenV = new Uint8Array(topV);
  for (let v = 0; v < topV; v++) {
    if (!isVertexLive(p, v)) continue;
    const n = vMap[v];
    takenV[n] = 1;
    V.x[n] = p.vertices.x[v];
    V.y[n] = p.vertices.y[v];
    V.level[n] = p.vertices.level[v];
    V.flags[n] = p.vertices.flags[v];
    let out = p.vertices.out[v];
    if (starts && out >= 0) {
      const ring = outgoing(p, v);
      out = ring[pick(ring.length, mode, r)];
    }
    V.out[n] = H(out);
    vertexFirst[n] = R(p.roles.vertexFirst[v]);
    homeV[n] = p.indexHome.vertex[v];
  }
  let freeV = -1;
  for (let n = topV - 1; n >= 0; n--) {
    if (takenV[n] === 1) continue;
    V.flags[n] = VERTEX_FREE;
    V.out[n] = freeV;
    freeV = n;
  }

  // ---- edge pairs --------------------------------------------------------------------------------------------------
  const capP = p.halfEdges.level.length;
  const E = { origin: filled32(2 * capP, -1), next: filled32(2 * capP, -1), prev: filled32(2 * capP, -1), level: new Uint8Array(capP) };
  const edgeFirst = filled32(capP, -1);
  const homeE = new Int16Array(capP).fill(-1);
  const takenP = new Uint8Array(topP);
  for (let e = 0; e < topP; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const n = pMap[e];
    takenP[n] = 1;
    for (const h of [2 * e, 2 * e + 1]) {
      const g = H(h);
      E.origin[g] = vMap[p.halfEdges.origin[h]];
      E.next[g] = H(p.halfEdges.next[h]);
      E.prev[g] = H(p.halfEdges.prev[h]);
    }
    E.level[n] = p.halfEdges.level[e];
    edgeFirst[n] = R(p.roles.edgeFirst[e]);
    homeE[n] = p.indexHome.edge[e];
  }
  let freeP = -1;
  for (let n = topP - 1; n >= 0; n--) {
    if (takenP[n] === 1) continue;
    E.next[2 * n] = freeP;
    freeP = n;
  }

  // ---- faces, per level --------------------------------------------------------------------------------------------
  const faces: LevelFaces[] = [];
  const homeF: Int16Array[] = [];
  const holesTop: number[] = [];
  const freeF: number[] = [];
  for (const l of LEVELS) {
    const F = p.faces[l];
    const top = p.slots.face[l].top;
    const cap = F.outer.length;
    const M = fMap[l];
    const outer = filled32(cap, -1);
    const kind = new Uint16Array(cap).fill(FREE_KIND);
    const owner = filled32(cap, -1);
    const parent = filled32(cap, -1);
    const stage = new Uint8Array(cap);
    const nextOfOwner = filled32(cap, -1);
    const home = new Int16Array(cap).fill(-1);
    const runs: (HalfEdgeId[] | null)[] = new Array<HalfEdgeId[] | null>(top).fill(null);
    const lists = new Map<number, number[]>();
    for (let f = 0; f < top; f++) {
      if (!isFaceLive(p, l, f)) continue;
      const n = M[f];
      const ringStart = (h: HalfEdgeId): HalfEdgeId => {
        if (!starts) return h;
        const ring = walkRing(p, l, h).filter((g) => p.halfEdges.level[g >> 1] <= l);
        return ring.length === 0 ? h : ring[pick(ring.length, mode, r)];
      };
      outer[n] = H(ringStart(F.outer[f]));
      kind[n] = F.kind[f];
      owner[n] = F.owner[f];
      parent[n] = l === 0 || F.parent[f] < 0 ? -1 : fMap[l - 1][F.parent[f]];
      stage[n] = F.stage[f];
      home[n] = p.indexHome.face[l][f];
      const holes = faceHoles(p, l, f);
      if (holes.length > 0) runs[n] = holes.map((h) => H(ringStart(h)));
      if (F.owner[f] >= 0) {
        const list = lists.get(F.owner[f]);
        if (list === undefined) lists.set(F.owner[f], [n]);
        else list.push(n);
      }
    }
    // The hole pool, packed in the new slot order.
    let need = 1;
    for (const run of runs) if (run !== null) need += run.length + 1;
    const holes = filled32(Math.max(F.holes.length, need), -1);
    const holesStart = filled32(cap, -1);
    let k = 0;
    for (let n = 0; n < top; n++) {
      const run = runs[n];
      if (run === null) continue;
      holesStart[n] = k;
      for (const h of run) holes[k++] = h;
      holes[k++] = -1;
    }
    // Owner lists re-linked in the new slot order; the owner table rebuilt.
    const ownerHead = createOwnerTable(F.ownerHead.head.length);
    for (const [o, list] of lists) {
      list.sort((a, b) => a - b);
      for (let i = 0; i + 1 < list.length; i++) nextOfOwner[list[i]] = list[i + 1];
      ownerSet(ownerHead, o, list[0]);
    }
    // The free list, ascending.
    let free = -1;
    for (let n = top - 1; n >= 0; n--) {
      if (kind[n] !== FREE_KIND) continue;
      nextOfOwner[n] = free;
      free = n;
    }
    faces.push({ outer, holesStart, holes, kind, owner, parent, stage, nextOfOwner, ownerHead });
    homeF.push(home);
    holesTop.push(k);
    freeF.push(free);
  }

  // ---- role rows ---------------------------------------------------------------------------------------------------
  const capR = p.roles.kind.length;
  const RT = p.roles;
  const rkind = new Uint16Array(capR).fill(FREE_KIND);
  const entity = filled32(capR, -1);
  const rlevel = new Uint8Array(capR);
  const ordinal = new Uint16Array(capR);
  const nextInSet = filled32(capR, -1);
  const nextSameKey = filled32(capR, -1);
  const chains = new Map<string, { e: number; w: number; rows: number[] }>();
  for (let row = 0; row < topR; row++) {
    if (RT.kind[row] === FREE_KIND) continue;
    const n = rMap[row];
    rkind[n] = RT.kind[row];
    entity[n] = RT.entity[row];
    rlevel[n] = RT.level[row];
    ordinal[n] = RT.ordinal[row];
    const nx = RT.nextInSet[row];
    if (nx >= 0) nextInSet[n] = rMap[nx];
    else if (nx <= -2) {
      const el = -2 - nx;
      nextInSet[n] = -2 - (roleInfo(RT.kind[row]).kind === 'edge' ? pMap[el] : vMap[el]);
    } else throw new Error(`renumberSlots: role row ${row} has no set link`);
    const w = roleKeyWord(RT.kind[row], RT.ordinal[row]);
    const key = `${RT.entity[row]}:${w}`;
    const c = chains.get(key);
    if (c === undefined) chains.set(key, { e: RT.entity[row], w, rows: [n] });
    else c.rows.push(n);
  }
  const head = createRoleHeadTable(RT.head.first.length);
  for (const c of chains.values()) {
    c.rows.sort((a, b) => a - b);
    for (let i = 0; i + 1 < c.rows.length; i++) nextSameKey[c.rows[i]] = c.rows[i + 1];
    roleHeadSet(head, c.e, c.w, c.rows[0]);
  }
  let freeR = -1;
  for (let n = topR - 1; n >= 0; n--) {
    if (rkind[n] !== FREE_KIND) continue;
    nextSameKey[n] = freeR;
    freeR = n;
  }

  // ---- the copy ----------------------------------------------------------------------------------------------------
  const ht = p.handles;
  const q: Plat = {
    key: { layer: p.key.layer, part: p.key.part },
    frame: { ...p.frame },
    lattice: p.lattice,
    vertices: V,
    halfEdges: E,
    roles: { edgeFirst, vertexFirst, kind: rkind, entity, level: rlevel, ordinal, nextInSet, nextSameKey, head },
    faces: faces as Five<LevelFaces>,
    indexHome: { vertex: homeV, edge: homeE, face: homeF as Five<Int16Array> },
    version: p.version,
    handles: { units: ht.units.slice(), start: ht.start.slice(), hash: ht.hash.slice(), slots: ht.slots.slice(), count: ht.count },
    slots: {
      vertex: { top: topV, free: freeV, live: p.slots.vertex.live },
      pair: { top: topP, free: freeP, live: p.slots.pair.live },
      face: LEVELS.map((l) => ({ top: p.slots.face[l].top, free: freeF[l], live: p.slots.face[l].live })) as Five<{ top: number; free: number; live: number }>,
      role: { top: topR, free: freeR, live: p.slots.role.live },
      holesTop: holesTop as Five<number>,
    },
  };
  if (p.index !== undefined) q.index = renameIndex(p.index, (kind, level, slot) => (kind === ITEM_VERTEX ? vMap[slot] : kind === ITEM_EDGE ? pMap[slot] : fMap[level][slot]));
  if (hasLevelDigests(p)) attachLevelDigests(q);
  return { plat: q, maps: { vertex: vMap, pair: pMap, flip, face: fMap, role: rMap } };
}

/** The spatial index with every item key renamed (its trees, boxes and partitions kept). */
function renameIndex(idx: SpatialIndex, slotOf: (kind: ItemKind, level: Level, slot: number) => number): SpatialIndex {
  const rename = (level: Level, k: number): number => {
    const kind = keyKind(k);
    return itemKey(kind, slotOf(kind, level, keySlot(k)));
  };
  const partitions: PackedIndex[] = idx.partitions.map((part) => ({
    id: part.id,
    level: part.level,
    pos: part.pos,
    key: part.key,
    tree: part.tree,
    keys: Float64Array.from(part.keys, (k) => rename(part.level, k)),
    pending: new Set([...part.pending].map((k) => rename(part.level, k))),
  }));
  const levels = LEVELS.map((l): LevelIndex => {
    const L = idx.levels[l];
    return {
      static: L.static.map((part) => partitions[part.id]),
      dynamic: renameGrid(L.dynamic, (k) => rename(l, k)),
      tombstones: L.tombstones.map((t) => new Set([...t].map((k) => rename(l, k)))),
    };
  }) as Five<LevelIndex>;
  return {
    levels,
    partitions,
    byKey: idx.byKey.map((m) => new Map(m)) as SpatialIndex['byKey'],
    partitionOf: idx.partitionOf,
    work: { rebuilds: idx.work.rebuilds, items: idx.work.items },
    log: null,
  };
}

function renameGrid(g: UniformGrid, rename: (k: number) => number): UniformGrid {
  const cells = new Map<number, Set<number>>();
  const large = new Set<number>();
  const entries = new Map<number, GridEntry>();
  for (const e of g.entries.values()) {
    const key = rename(e.key);
    entries.set(key, { key, partition: e.partition, box: e.box, cells: e.cells });
    if (e.cells === null) large.add(key);
    else {
      for (const c of e.cells) {
        const s = cells.get(c);
        if (s === undefined) cells.set(c, new Set([key]));
        else s.add(key);
      }
    }
  }
  return { cellCm: g.cellCm, inv: g.inv, cells, large, entries };
}

/**
 * §13.1's renumbering: a copy of `plat` whose vertex, half-edge, face and role-row slots are permuted by `seed` (or
 * reversed, `opts.mode`), with every table that names a slot rewritten — the same arena under other slot numbers.
 */
export function renumberSlots(plat: Plat, seed: number, opts: RenumberOptions = {}): Plat {
  return renumbering(plat, seed, opts).plat;
}
