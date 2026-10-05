// decodeArena (M0-a-15; §3.9 *Load*, §3.3's rebuild, §2.2 rules 2, 3 and 7, §3.11's corrupt cache; C-0037): the arena a
// block's chunks describe, rebuilt — the level-≤ 1 routes first, then the partitions level by level in key order (each
// level's splits first, sorted along each coarser edge by position, then its edges, then its rows), `next` / `prev`
// rebuilt by exact angle sort (quadrant, then orient2d), the faces re-walked level by level from their canonical keys,
// each parent recovered from its boundary edges, the role reverse index rebuilt row by row, and — when the caller names
// the index's configuration — every static partition rebuilt (`attachIndex`, the load's rebuild). O(E log d) but for the
// lookups' hashing. A chunk whose bytes do not hash to its ref, that fails to parse, or whose references or rows do not
// fit the arena the others describe makes the stored geometry a corrupt cache: decodeArena returns that typed failure
// and never a partial arena (the replay is M1's, §4b). Readings: C-0207.
import {
  allocEdgePair,
  allocFace,
  allocVertex,
  compareKeys,
  createPlat,
  dest,
  internId,
  handleOfId,
  addRoleRow,
  nextAt,
  ROLE_REGISTRY,
  ROLE_REGISTRY_VERSION,
  roleInfo,
  rowsOn,
  setFaceHoles,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { attachLevelDigests } from '../digest/index.js';
import { H128 } from '../hash/index.js';
import { attachIndex } from '../index/index.js';
import { area2Big, ok, orient2d, type Frame, type KernelResult } from '../num/index.js';
import type { Cm, LatticePoint, Level, PlatKey } from '../types/index.js';
import { ByteReader, ChunkFormatError, need } from './bytes.js';
import { FORMAT_VERSION, inRange, KIND_PARTITION, KIND_ROUTES, layerOfCode, MAGIC, MAX_ID_UNITS, pointKey, ringKey } from './format.js';
import { corruptCache, type Chunk, type DecodeOptions } from './types.js';

/** A vertex reference inside a chunk: one of its own vertices (by position), or another chunk's by lattice point. */
interface Ref {
  readonly local: number;
  readonly x: number;
  readonly y: number;
}

interface Row {
  readonly role: number;
  readonly entity: number;
  readonly level: number;
  readonly ordinal: number;
}

interface FaceRowIn {
  readonly level: Level;
  readonly a: Ref;
  readonly b: Ref;
  readonly kind: number;
  /** An index into the chunk's entities, −1 for no owner. */
  readonly owner: number;
  readonly stage: number;
  readonly holes: readonly (readonly [Ref, Ref])[];
}

interface Parsed {
  readonly routes: boolean;
  /** Routes: 1 (its routes are level-1 route edges); a partition: its level. */
  readonly level: Level;
  readonly key: string;
  readonly layer: string;
  readonly part: number;
  readonly frame: Frame | null;
  readonly entities: readonly string[];
  readonly vertices: readonly { x: number; y: number; level: number; flags: number }[];
  readonly splits: readonly { v: number; a: Ref; b: Ref }[];
  readonly edges: readonly { a: Ref; b: Ref; level: number }[];
  readonly vertexRows: readonly { v: Ref; rows: Row[] }[];
  readonly edgeRows: readonly { a: Ref; b: Ref; rows: Row[] }[];
  readonly faces: readonly FaceRowIn[];
}

const VERTEX_FLAG_MASK = 7;
const FREE_KIND = 0xffff;

/** Parses one chunk's bytes, checking every field against the format (a ChunkFormatError otherwise). */
function parse(bytes: Uint8Array): Parsed {
  const r = new ByteReader(bytes);
  for (const m of MAGIC) need(r.u8() === m, 'not an arena block chunk (magic)');
  need(r.uv() === FORMAT_VERSION, 'an unknown block format version');
  const kind = r.u8();
  need(kind === KIND_ROUTES || kind === KIND_PARTITION, 'an unknown chunk kind');
  const routes = kind === KIND_ROUTES;
  need(r.uv() <= ROLE_REGISTRY_VERSION, 'a chunk written under a newer role registry');
  const layer = layerOfCode(r.u8());
  need(layer !== null, 'an unknown layer');
  const part = r.uv();
  need(part <= 0x7fffffff, 'a part number out of range');
  let frame: Frame | null = null;
  let level: Level = 1;
  let key = '';
  if (routes) {
    const widthCm = r.uv() as Cm;
    const heightCm = r.uv() as Cm;
    frame = { widthCm, heightCm, aspect: r.f64(), marginShare: r.f64() };
  } else {
    const l = r.u8();
    need(l >= 2 && l <= 4, 'a partition chunk of a level outside L2–L4');
    level = l as Level;
    key = r.str(MAX_ID_UNITS);
  }

  const entities: string[] = [];
  const ne = r.count(2);
  for (let i = 0; i < ne; i++) {
    const id = r.str(MAX_ID_UNITS);
    need(id.length > 0, 'an empty address id');
    need(i === 0 || compareKeys(entities[i - 1], id) < 0, 'the entities are not in strict address-id order');
    entities.push(id);
  }

  const vertices: { x: number; y: number; level: number; flags: number }[] = [];
  const localAt = new Map<number, number>();
  const nv = r.count(4);
  let px = 0;
  let py = 0;
  for (let i = 0; i < nv; i++) {
    const x = px + r.sv();
    const y = py + r.sv();
    need(inRange(x, y), 'a vertex outside the lattice range');
    need(i === 0 || y > py || (y === py && x > px), 'the vertices are not in strict (y, x) order');
    px = x;
    py = y;
    const vl = r.u8();
    const flags = r.u8();
    need(routes ? vl <= 1 : vl === level, `a vertex of level ${vl} in a level-${routes ? '≤ 1' : level} chunk`);
    need((flags & ~VERTEX_FLAG_MASK) === 0, 'a vertex flag outside pinned | steiner | split');
    localAt.set(pointKey(x, y), i);
    vertices.push({ x, y, level: vl, flags });
  }

  const ref = (): Ref => {
    const t = r.uv();
    if (t > 0) {
      need(t <= nv, 'a vertex reference past the chunk\'s vertices');
      return { local: t - 1, x: vertices[t - 1].x, y: vertices[t - 1].y };
    }
    need(!routes, 'the routes chunk names a vertex it does not hold');
    const x = r.sv();
    const y = r.sv();
    need(inRange(x, y), 'a lattice-point reference outside the lattice range');
    need(!localAt.has(pointKey(x, y)), 'a lattice-point reference to a vertex the chunk holds');
    return { local: -1, x, y };
  };
  const rows = (): Row[] => {
    const out: Row[] = [];
    const n = r.count(5);
    need(n > 0, 'an element with an empty row list');
    for (let i = 0; i < n; i++) {
      const role = r.uv();
      need(role < ROLE_REGISTRY.length, 'a role id outside the registry');
      const entity = r.uv();
      need(entity < entities.length, 'an entity index outside the chunk\'s entities');
      const rl = r.u8();
      need(routes ? rl <= 1 : rl === level, `a row of level ${rl} in a level-${routes ? '≤ 1' : level} chunk`);
      out.push({ role, entity, level: rl, ordinal: r.u16() });
    }
    return out;
  };

  const splits: { v: number; a: Ref; b: Ref }[] = [];
  const ns = r.count(3);
  need(!routes || ns === 0, 'the routes chunk holds splits');
  for (let i = 0; i < ns; i++) {
    const v = r.uv();
    need(v < nv && (i === 0 || v > splits[i - 1].v), 'the splits do not name the chunk\'s vertices in order');
    splits.push({ v, a: ref(), b: ref() });
  }

  const edges: { a: Ref; b: Ref; level: number }[] = [];
  const nE = r.count(3);
  for (let i = 0; i < nE; i++) {
    const a = ref();
    const b = ref();
    const el = r.u8();
    need(routes ? el <= 1 : el === level, `an edge of level ${el} in a level-${routes ? '≤ 1' : level} chunk`);
    edges.push({ a, b, level: el });
  }

  const vertexRows: { v: Ref; rows: Row[] }[] = [];
  const nvr = r.count(2);
  for (let i = 0; i < nvr; i++) vertexRows.push({ v: ref(), rows: rows() });

  const edgeRows: { a: Ref; b: Ref; rows: Row[] }[] = [];
  const ner = r.count(3);
  for (let i = 0; i < ner; i++) edgeRows.push({ a: ref(), b: ref(), rows: rows() });

  const faces: FaceRowIn[] = [];
  const nf = r.count(8);
  for (let i = 0; i < nf; i++) {
    const fl = r.u8();
    need(routes ? fl <= 1 : fl === level, `a face of level ${fl} in a level-${routes ? '≤ 1' : level} chunk`);
    const a = ref();
    const b = ref();
    const fk = r.u16();
    need(fk !== FREE_KIND, 'a face of the free kind');
    const owner = r.uv();
    need(owner <= entities.length, 'a face owner outside the chunk\'s entities');
    const stage = r.u8();
    const holes: [Ref, Ref][] = [];
    const nh = r.count(2);
    for (let k = 0; k < nh; k++) holes.push([ref(), ref()]);
    faces.push({ level: fl as Level, a, b, kind: fk, owner: owner - 1, stage, holes });
  }
  need(r.remaining() === 0, 'bytes after the last section');
  return { routes, level, key, layer: layer as string, part, frame, entities, vertices, splits, edges, vertexRows, edgeRows, faces };
}

/** The rebuild refuses: the chunks parse but do not describe one valid arena. */
class Corrupt extends Error {}

function bad(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Corrupt(message);
}

/** The quadrant of a direction, counter-clockwise from +x: [0°, 90°) 0, [90°, 180°) 1, [180°, 270°) 2, [270°, 360°) 3. */
function quadrant(dx: number, dy: number): number {
  if (dy > 0) return dx > 0 ? 0 : 1;
  if (dy < 0) return dx < 0 ? 2 : 3;
  return dx > 0 ? 0 : 2;
}

/**
 * The arena a block's chunks describe (§3.9 *Load*), keyed `key`: the typed corrupt-cache failure when a chunk does not
 * hash to its ref, fails to decode, or names a vertex no chunk holds, or when the chunks do not fit together into one
 * arena (two vertices on one lattice point, an edge twice, a face ring that is not one, a row its element cannot carry);
 * never a partial arena. The loaded arena's version is 0 (a version is not stored); its slots are dense; its index is
 * rebuilt when `opts.index` is given, and its maintained level digests attached when `opts.digests` is set.
 */
export function decodeArena(chunks: readonly Chunk[], key: PlatKey, opts: DecodeOptions = {}): KernelResult<Plat> {
  const parsed: Parsed[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const h = H128(c.bytes);
    if (h.length !== c.ref.length || h.some((w, k) => w !== c.ref[k])) return corruptCache(`chunk ${i} does not hash to its ref`);
    try {
      parsed.push(parse(c.bytes));
    } catch (e) {
      if (e instanceof ChunkFormatError) return corruptCache(`chunk ${i} fails to decode: ${e.message}`);
      throw e;
    }
  }
  try {
    return ok(rebuild(parsed, key, opts));
  } catch (e) {
    if (e instanceof Corrupt) return corruptCache(e.message);
    // The arena's own refusals (its `check`) on what the chunks asked of it: still the stored geometry's fault.
    if (e instanceof Error && /^(arena|index|digest): /.test(e.message)) return corruptCache(`the chunks do not fit one arena: ${e.message}`);
    throw e;
  }
}

function rebuild(parsed: readonly Parsed[], key: PlatKey, opts: DecodeOptions): Plat {
  for (const c of parsed) bad(c.layer === key.layer && c.part === key.part, 'a chunk of another arena');
  const routesAll = parsed.filter((c) => c.routes);
  bad(routesAll.length === 1, routesAll.length === 0 ? 'no level-≤ 1 routes chunk' : 'two routes chunks');
  const routes = routesAll[0];
  const partitions = parsed.filter((c) => !c.routes).sort((x, y) => x.level - y.level || compareKeys(x.key, y.key));
  for (let i = 1; i < partitions.length; i++) {
    bad(partitions[i].level !== partitions[i - 1].level || partitions[i].key !== partitions[i - 1].key, 'two chunks for one partition');
  }
  const ordered = [routes, ...partitions];

  // Sizes, so the tables are allocated once.
  let nv = 0;
  let np = 0;
  let nr = 0;
  let units = 0;
  const nf = [0, 0, 0, 0, 0];
  const ids: string[] = [];
  for (const c of ordered) {
    nv += c.vertices.length;
    np += c.edges.length + c.splits.length;
    for (const g of c.vertexRows) nr += g.rows.length;
    for (const g of c.edgeRows) nr += g.rows.length;
    for (const f of c.faces) nf[f.level]++;
    for (const id of c.entities) {
      ids.push(id);
      units += id.length;
    }
  }
  ids.sort(compareKeys);
  const at1 = (n: number): number => (n > 0 ? n : 1);
  const p = createPlat(key, routes.frame as Frame, {
    vertices: at1(nv),
    edgePairs: at1(np),
    faces: nf.map(at1) as [number, number, number, number, number],
    roleRows: at1(nr),
    roleKeys: at1(nr),
    owners: nf.map(at1) as [number, number, number, number, number],
    handles: at1(ids.length),
    idUnits: at1(units),
    holes: 16,
  });
  // Handles in address-id order (they are not output; this only makes the load's tables one function of the chunks).
  for (let i = 0; i < ids.length; i++) if (i === 0 || ids[i] !== ids[i - 1]) internId(p.handles, ids[i]);

  const vAt = new Map<number, VertexId>();
  const vertexIds: VertexId[][] = ordered.map(() => []);
  const handlesOf: number[][] = ordered.map((c) => c.entities.map((id) => handleOfId(p.handles, id)));
  const span = at1(nv);
  const pairAt = new Map<number, number>();
  const pairKey = (a: VertexId, b: VertexId): number => (a < b ? a * span + b : b * span + a);

  const resolve = (ci: number, r: Ref): VertexId => {
    if (r.local >= 0) return vertexIds[ci][r.local];
    const v = vAt.get(pointKey(r.x, r.y));
    bad(v !== undefined, `a lattice-point reference (${r.x}, ${r.y}) finds no vertex`);
    return v;
  };
  const pairOf = (a: VertexId, b: VertexId, what: string): number => {
    const e = pairAt.get(pairKey(a, b));
    bad(e !== undefined, `${what}: no route edge joins (${p.vertices.x[a]}, ${p.vertices.y[a]}) and (${p.vertices.x[b]}, ${p.vertices.y[b]})`);
    return e;
  };
  const addVertices = (ci: number): void => {
    for (const v of ordered[ci].vertices) {
      const k = pointKey(v.x, v.y);
      bad(!vAt.has(k), `two vertices on the lattice point (${v.x}, ${v.y})`);
      const id = allocVertex(p, { x: v.x as Cm, y: v.y as Cm } as LatticePoint, v.level as Level, v.flags);
      vAt.set(k, id);
      vertexIds[ci].push(id);
    }
  };
  const addEdges = (ci: number, runLevel: Level): void => {
    for (const e of ordered[ci].edges) {
      const a = resolve(ci, e.a);
      const b = resolve(ci, e.b);
      bad(a !== b, 'an edge from a vertex to itself');
      bad(p.vertices.level[a] <= runLevel && p.vertices.level[b] <= runLevel, `a level-${runLevel} route edge ending at a finer vertex`);
      const k = pairKey(a, b);
      bad(!pairAt.has(k), 'two route edges between one pair of vertices');
      pairAt.set(k, allocEdgePair(p, a, b, e.level as Level) >> 1);
    }
  };
  const addRows = (ci: number): void => {
    const c = ordered[ci];
    const hs = handlesOf[ci];
    for (const g of c.vertexRows) {
      const v = resolve(ci, g.v);
      for (const row of g.rows) {
        bad(roleInfo(row.role).kind === 'vertex', 'an edge role on a vertex');
        bad(p.vertices.level[v] <= row.level, 'a row coarser than its vertex');
        addRoleRow(p, v, row.role, hs[row.entity], row.level as Level, row.ordinal);
      }
    }
    for (const g of c.edgeRows) {
      const e = pairOf(resolve(ci, g.a), resolve(ci, g.b), 'an edge row');
      for (const row of g.rows) {
        bad(roleInfo(row.role).kind === 'edge', 'a vertex role on an edge');
        bad(p.halfEdges.level[e] <= row.level, 'a row coarser than its edge');
        addRoleRow(p, 2 * e, row.role, hs[row.entity], row.level as Level, row.ordinal);
      }
    }
  };

  // Level ≤ 1: the routes.
  addVertices(0);
  addEdges(0, 1);
  addRows(0);

  // Levels 2 … 4: each level's vertices, then its splits on the coarser route edges, then its edges, then its rows.
  for (let level = 2 as Level; level <= 4; level = (level + 1) as Level) {
    const here: number[] = [];
    for (let ci = 1; ci < ordered.length; ci++) if (ordered[ci].level === level) here.push(ci);
    for (const ci of here) addVertices(ci);
    // Splits, grouped by the route edge they split (each a single pair now: every vertex standing is of level < ℓ).
    const groups = new Map<number, { s: VertexId; t: number }[]>();
    const order: number[] = [];
    for (const ci of here) {
      for (const sp of ordered[ci].splits) {
        const a = resolve(ci, sp.a);
        const b = resolve(ci, sp.b);
        const e = pairOf(a, b, 'a split');
        bad(p.halfEdges.level[e] < level, 'a split of an edge of its own level');
        const s = vertexIds[ci][sp.v];
        const O = p.halfEdges.origin;
        const ox = p.vertices.x[O[2 * e]];
        const oy = p.vertices.y[O[2 * e]];
        const t = (p.vertices.x[s] - ox) * (p.vertices.x[O[2 * e + 1]] - ox) + (p.vertices.y[s] - oy) * (p.vertices.y[O[2 * e + 1]] - oy);
        let list = groups.get(e);
        if (list === undefined) {
          list = [];
          groups.set(e, list);
          order.push(e);
        }
        list.push({ s, t });
      }
    }
    for (const e of order) splitPair(p, e, groups.get(e) as { s: VertexId; t: number }[], pairAt, pairKey);
    for (const ci of here) addEdges(ci, level);
    for (const ci of here) addRows(ci);
  }

  linkRotations(p);
  buildFaces(p, ordered, resolve, handlesOf);
  if (opts.index !== undefined) attachIndex(p, opts.index);
  if (opts.digests === true) attachLevelDigests(p);
  return p;
}

/**
 * Splits pair `e` (its origin to its destination, a single pair now) at the vertices `splits`, sorted along it by
 * position: the pair keeps its first part, each further part is a new pair of its level carrying copies of its rows
 * (§2.2 rule 5: splits carry roles to both parts).
 */
function splitPair(p: Plat, e: number, splits: { s: VertexId; t: number }[], pairAt: Map<number, number>, pairKey: (a: VertexId, b: VertexId) => number): void {
  const O = p.halfEdges.origin;
  const a = O[2 * e];
  const b = O[2 * e + 1];
  const dx = p.vertices.x[b] - p.vertices.x[a];
  const dy = p.vertices.y[b] - p.vertices.y[a];
  const len2 = dx * dx + dy * dy;
  splits.sort((u, w) => u.t - w.t);
  for (let i = 0; i < splits.length; i++) {
    bad(splits[i].t > 0 && splits[i].t < len2, 'a split vertex outside the span of the edge it splits');
    bad(i === 0 || splits[i].t > splits[i - 1].t, 'two split vertices at one position along an edge');
  }
  const rows = rowsOn(p, 'edge', 2 * e).map((r) => ({ kind: p.roles.kind[r], entity: p.roles.entity[r], level: p.roles.level[r] as Level, ordinal: p.roles.ordinal[r] }));
  const level = p.halfEdges.level[e] as Level;
  pairAt.delete(pairKey(a, b));
  O[2 * e + 1] = splits[0].s;
  pairAt.set(pairKey(a, splits[0].s), e);
  for (let i = 0; i < splits.length; i++) {
    const from = splits[i].s;
    const to = i + 1 < splits.length ? splits[i + 1].s : b;
    const h = allocEdgePair(p, from, to, level);
    for (const r of rows) addRoleRow(p, h, r.kind, r.entity, r.level, r.ordinal);
    pairAt.set(pairKey(from, to), h >> 1);
  }
}

/**
 * `next` / `prev` and each vertex's `out` from the exact angle order (§3.9 *Load*): at every vertex its outgoing
 * half-edges sorted counter-clockwise from +x (quadrant, then orient2d); next(twin(e)) is the outgoing half-edge after e
 * clockwise — the arena's rotation convention (arena/walk.ts) — and prev its inverse. Two outgoing half-edges in one
 * direction (overlapping edges) are refused.
 */
function linkRotations(p: Plat): void {
  const nV = p.slots.vertex.top;
  const nH = 2 * p.slots.pair.top;
  const T = p.halfEdges;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const start = new Int32Array(nV + 1);
  for (let h = 0; h < nH; h++) start[T.origin[h] + 1]++;
  for (let v = 0; v < nV; v++) start[v + 1] += start[v];
  const fill = start.slice(0, nV);
  const out = new Int32Array(nH);
  for (let h = 0; h < nH; h++) out[fill[T.origin[h]]++] = h;
  for (let v = 0; v < nV; v++) {
    const n = start[v + 1] - start[v];
    if (n === 0) continue;
    const list = Array.from(out.subarray(start[v], start[v + 1]));
    const vx = X[v];
    const vy = Y[v];
    const q = (h: HalfEdgeId): number => quadrant(X[dest(p, h)] - vx, Y[dest(p, h)] - vy);
    list.sort((g, h) => {
      const d = q(g) - q(h);
      if (d !== 0) return d;
      const o = orient2d(vx, vy, X[dest(p, g)], Y[dest(p, g)], X[dest(p, h)], Y[dest(p, h)]);
      return o > 0 ? -1 : o < 0 ? 1 : 0;
    });
    for (let i = 0; i < n; i++) {
      const g = list[i];
      const h = list[i + 1 < n ? i + 1 : 0];
      bad(n === 1 || quadrant(X[dest(p, g)] - vx, Y[dest(p, g)] - vy) !== quadrant(X[dest(p, h)] - vx, Y[dest(p, h)] - vy)
        || orient2d(vx, vy, X[dest(p, g)], Y[dest(p, g)], X[dest(p, h)], Y[dest(p, h)]) !== 0, `two edges leave (${vx}, ${vy}) in one direction`);
      // h follows g counter-clockwise, so g follows h clockwise: next(twin(h)) = g.
      T.next[h ^ 1] = g;
      T.prev[g] = h ^ 1;
    }
    p.vertices.out[v] = list[0];
  }
}

/** The half-edge leaving `a` along the level-`level` route that ends at `b`, or −1. */
function routeFrom(p: Plat, level: Level, a: VertexId, b: VertexId): HalfEdgeId {
  const T = p.halfEdges;
  const first = p.vertices.out[a];
  if (first === -1) return -1;
  let g = first;
  let guard = 0;
  do {
    if (T.level[g >> 1] <= level) {
      let x = g;
      let steps = 0;
      while (p.vertices.level[dest(p, x)] > level) {
        x = nextAt(p, level, x);
        bad(++steps <= T.origin.length, 'a route does not end');
      }
      if (dest(p, x) === b) return g;
    }
    g = T.next[g ^ 1];
    bad(++guard <= T.origin.length, 'a rotation does not close');
  } while (g !== first);
  return -1;
}

/**
 * The face records, level by level (§3.9 *Load*): each row's rings walked from its canonical key (which must be the
 * ring's own key, the outer ring counter-clockwise, every half-edge in at most one record's rings), its parent recovered
 * from a boundary half-edge of the coarser level — the record left of it one level up — or, for a record whose rings run
 * on its own level's edges only, from the record across one of them (the two lie in one coarser face).
 */
function buildFaces(p: Plat, ordered: readonly Parsed[], resolve: (ci: number, r: Ref) => VertexId, handlesOf: readonly (readonly number[])[]): void {
  const T = p.halfEdges;
  const nH = 2 * p.slots.pair.top;
  let coarser: Int32Array | null = null; // half-edge → face record one level up
  for (let level = 0 as Level; level <= 4; level = (level + 1) as Level) {
    const rows: { ci: number; f: FaceRowIn }[] = [];
    for (let ci = 0; ci < ordered.length; ci++) for (const f of ordered[ci].faces) if (f.level === level) rows.push({ ci, f });
    const rowAt = new Int32Array(nH).fill(-1);
    const rings: { outer: HalfEdgeId; ring: HalfEdgeId[]; holes: HalfEdgeId[]; holeRings: HalfEdgeId[][] }[] = [];
    const ringOf = (ci: number, ra: Ref, rb: Ref, i: number, outer: boolean): { start: HalfEdgeId; ring: HalfEdgeId[] } => {
      const a = resolve(ci, ra);
      const b = resolve(ci, rb);
      const g = routeFrom(p, level, a, b);
      bad(g !== -1, `an L${level} face row names a route edge that does not exist`);
      const ring = walkRing(p, level, g);
      const k = ringKey(p, level, ring);
      bad(k !== null && k[0] === a && k[1] === b, `an L${level} face row's key is not its ring's own key`);
      const pts = ring.map((h) => ({ x: p.vertices.x[T.origin[h]], y: p.vertices.y[T.origin[h]] }) as LatticePoint);
      const area = area2Big(pts);
      bad(outer ? area > 0n : area <= 0n, outer ? `an L${level} face's outer ring is not counter-clockwise` : `an L${level} hole ring is counter-clockwise`);
      for (const h of ring) {
        bad(rowAt[h] === -1, `two L${level} face rows claim one ring`);
        rowAt[h] = i;
      }
      return { start: g, ring };
    };
    rows.forEach(({ ci, f }, i) => {
      const o = ringOf(ci, f.a, f.b, i, true);
      const hs = f.holes.map(([ha, hb]) => ringOf(ci, ha, hb, i, false));
      rings.push({ outer: o.start, ring: o.ring, holes: hs.map((x) => x.start), holeRings: hs.map((x) => x.ring) });
    });
    // Parents.
    const parent = new Int32Array(rows.length).fill(-1);
    if (level > 0) {
      const up = coarser as Int32Array;
      const pending: number[] = [];
      rings.forEach((r, i) => {
        for (const ring of [r.ring, ...r.holeRings]) {
          for (const h of ring) {
            if (T.level[h >> 1] < level) {
              bad(up[h] !== -1, `an L${level} face lies in no L${level - 1} face record`);
              parent[i] = up[h];
              return;
            }
          }
        }
        pending.push(i);
      });
      for (let changed = true; changed && pending.length > 0; ) {
        changed = false;
        for (let k = 0; k < pending.length; k++) {
          const i = pending[k];
          for (const h of rings[i].ring) {
            const j = rowAt[h ^ 1];
            if (j !== -1 && j !== i && parent[j] !== -1) {
              parent[i] = parent[j];
              pending.splice(k--, 1);
              changed = true;
              break;
            }
          }
        }
      }
      bad(pending.length === 0, `an L${level} face's parent cannot be recovered from its boundary`);
    }
    const faceAt = new Int32Array(nH).fill(-1);
    rows.forEach(({ ci, f }, i) => {
      const owner = f.owner < 0 ? -1 : handlesOf[ci][f.owner];
      const id: FaceId = allocFace(p, level, { outer: rings[i].outer, kind: f.kind, owner, stage: f.stage, parent: parent[i] });
      if (rings[i].holes.length > 0) setFaceHoles(p, level, id, rings[i].holes);
      for (const h of rings[i].ring) faceAt[h] = id;
      for (const ring of rings[i].holeRings) for (const h of ring) faceAt[h] = id;
    });
    coarser = faceAt;
  }
}

/** A chunk's header and section counts, for inspection (a test, a checker): parsed exactly as decodeArena parses it. */
export interface ChunkSummary {
  readonly kind: 'routes' | 'partition';
  readonly level: Level;
  readonly key: string;
  readonly entities: number;
  readonly vertices: number;
  readonly splits: number;
  readonly edges: number;
  readonly vertexRows: number;
  readonly edgeRows: number;
  readonly rows: number;
  readonly faces: number;
  readonly holes: number;
  /** References to vertices another chunk holds (by lattice point). */
  readonly foreignRefs: number;
  /** The lattice points of the vertices the chunk holds, in its (y, x) order. */
  readonly points: readonly (readonly [number, number])[];
}

/** The summary of one chunk's bytes; throws a ChunkFormatError when they do not parse. */
export function describeChunk(bytes: Uint8Array): ChunkSummary {
  const c = parse(bytes);
  let rows = 0;
  let foreign = 0;
  const f = (r: Ref): void => {
    if (r.local < 0) foreign++;
  };
  for (const s of c.splits) {
    f(s.a);
    f(s.b);
  }
  for (const e of c.edges) {
    f(e.a);
    f(e.b);
  }
  for (const g of c.vertexRows) {
    f(g.v);
    rows += g.rows.length;
  }
  for (const g of c.edgeRows) {
    f(g.a);
    f(g.b);
    rows += g.rows.length;
  }
  let holes = 0;
  for (const x of c.faces) {
    f(x.a);
    f(x.b);
    holes += x.holes.length;
    for (const [a, b] of x.holes) {
      f(a);
      f(b);
    }
  }
  return {
    kind: c.routes ? 'routes' : 'partition',
    level: c.level,
    key: c.key,
    entities: c.entities.length,
    vertices: c.vertices.length,
    splits: c.splits.length,
    edges: c.edges.length,
    vertexRows: c.vertexRows.length,
    edgeRows: c.edgeRows.length,
    rows,
    faces: c.faces.length,
    holes,
    foreignRefs: foreign,
    points: c.vertices.map((v) => [v.x, v.y] as const),
  };
}
