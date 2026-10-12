// References by role (§2.2 rule 5, J-K3, J-K9): an entity reaches its geometry through the role and owner tables,
// resolved on demand. `resolve` turns a FaceRef, ChainRef, EdgeSetRef or VertexRef into the current slots, stamped with
// the arena's key, restore generation and version and valid until its next commit; a debug build asserts the stamp
// wherever a stamped value is passed (§3.4 *Arenas, keys and services*). `signature` is what an edit stores beside a
// position (rule 5, *Positions in the log*). Every list returned is in a canonical order read on lattice positions
// (§3.3's keys), never slot order, and a ref that finds no geometry resolves empty (§3.11). M0-a-02. Readings:
// C-0146 (4) – (6), the stamp's restore generation C-0313.
//
// Exported by path for the kernel's other folders, not through the arena's index (the package's API is unchanged):
// `edgeRuns`, the one run ordering of a pair set (C-0146 (5)), and `stamp` / `keyName`, the stamp of an arena now and
// the text a stamp message names an arena by. `debugCheck` stays this module's own: its `arena: ` prefix is one of the
// kernel's assertion prefixes (C-0215).
import { orient2d } from '../num/index.js';
import type { ChainRef, EdgeSetRef, FaceRef, LatticePoint, Level, PlatKey, VertexRef, VertexSig } from '../types/index.js';
// The module itself, not the tx barrel: savepoint.ts imports only types, so the arena reads the generation with no
// runtime import cycle (C-0313 (2)).
import { restoreGeneration } from '../tx/savepoint.js';
import { check, debugAssertions } from './debug.js';
import { dest, facesOfOwner, isLevel, isVertexLive, sameKey, type FaceId, type HalfEdgeId, type Plat, type VertexId } from './plat.js';
import { roleIdOf, roleInfo } from './registry.js';
import { compareRowKeys, handleOf, rowElement, rowKey, rowsOfKey, rowsOn } from './rows.js';
import { compareFaces, compareVertices, outgoing } from './walk.js';

/**
 * The arena and version a value holding slots was read at (§3.4), with the arena's restore generation (C-0299: how many
 * times a savepoint was put back across committed batches). A restore sets the version back, so the version alone names
 * no state: (generation, version) does — it is never reached twice with different content (C-0299 (2)). `generation` is
 * written only when it is not 0 and an absent one reads 0, so a stamp of an arena never restored across commits has the
 * shape it always had (C-0313 (1)). Never hashed, encoded or persisted.
 */
export interface Stamp {
  readonly key: PlatKey;
  readonly version: number;
  /** The arena's restore generation when the value was read; absent reads 0. */
  readonly generation?: number;
}

/** A resolved reference: current slots, valid until the arena's next commit. */
export type Resolved = Stamp & (
  /** A FaceRef: the faces whose owner at that level is the entity, by canonical face key. */
  | { readonly view: 'faces'; readonly level: Level; readonly faces: FaceId[] }
  /**
   * A ChainRef or an EdgeSetRef (an edge role): the edges carrying the key as runs — maximal paths between vertices
   * where the edges do not continue in exactly one way — each run's half-edges directed along it. An open run starts at
   * its end with the lower lattice position (y, then x); a closed run (a ring) at its lowest-leftmost vertex,
   * counter-clockwise; runs are ordered by their first two vertices.
   */
  | { readonly view: 'edges'; readonly runs: HalfEdgeId[][] }
  /** A VertexRef (a vertex role): the vertices carrying the key, by lattice position. */
  | { readonly view: 'vertices'; readonly vertices: VertexId[] }
);

function debugCheck(condition: boolean, message: string): void {
  if (debugAssertions() && !condition) throw new Error(`arena: ${message}`);
}

/** An arena key as stamp messages name it: `layer/part` (e.g. `ground/0`). */
export function keyName(k: PlatKey): string {
  return `${k.layer}/${k.part}`;
}

/** A stamp's restore generation (absent reads 0). */
function generationOf(stamp: Stamp): number {
  return stamp.generation ?? 0;
}

/**
 * Was the stamp read at this arena's current state — its key, its restore generation and its version? A stamp read
 * before a savepoint was put back across committed batches is never current again, however many commits follow
 * (C-0313 (1)).
 */
export function isCurrent(p: Plat, stamp: Stamp): boolean {
  return sameKey(stamp.key, p.key) && generationOf(stamp) === restoreGeneration(p) && stamp.version === p.version;
}

/**
 * The debug build's assertion on a stamped value passed to an op or a service acting on `p`: its key is this arena,
 * its restore generation is the arena's and its version is current — a stale or foreign slot asserts, never a silent
 * read (§3.4, §3.11; C-0313 (1)). A no-op when the build does not assert (M0-a-14's flag).
 */
export function assertStamp(p: Plat, stamp: Stamp): void {
  debugCheck(sameKey(stamp.key, p.key), `a slot stamped for arena ${keyName(stamp.key)} was passed to arena ${keyName(p.key)}`);
  if (!debugAssertions()) return;
  const g = restoreGeneration(p);
  debugCheck(
    generationOf(stamp) === g,
    `a stale slot: stamped at version ${stamp.version} in restore generation ${generationOf(stamp)}, arena ${keyName(p.key)} is at version ${p.version} in restore generation ${g} (a savepoint was put back across committed batches since)`,
  );
  debugCheck(stamp.version === p.version, `a stale slot: stamped at version ${stamp.version}, arena ${keyName(p.key)} is at version ${p.version}`);
}

/** The stamp of `p` now: a copy of its key, its version and — when not 0 — its restore generation (C-0313 (1)). */
export function stamp(p: Plat): Stamp {
  const key = { layer: p.key.layer, part: p.key.part };
  const generation = restoreGeneration(p);
  return generation === 0 ? { key, version: p.version } : { key, version: p.version, generation };
}

function lowerBound(sorted: readonly number[], x: number): number {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (sorted[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * The runs a set of edge pairs forms, in the arena's one run ordering (C-0146 (5)): `resolve`'s edges view, and through
 * it `routeLines`, the stretch references and warp's chains. A run is a maximal path cut at every vertex where the set
 * does not continue in exactly one way (degree ≠ 2 within the set); its half-edges are directed along it.
 *   - An open run starts at its end with the lower lattice position (y, then x).
 *   - A loop hanging off a branch vertex starts at that vertex, its first step to the smaller (y, then x) of its two
 *     neighbours.
 *   - A ring (every vertex continuing in exactly one way) starts at its lowest-leftmost vertex and runs
 *     counter-clockwise (a collinear corner there, which only a degenerate ring has: toward the smaller neighbour).
 *   - The runs are ordered by their first two vertices, by lattice position.
 * A pair listed twice counts once. Slots only pick which run is walked first, so the output depends on lattice
 * positions alone. `pairsIn` are the edge pairs (h >> 1) of live edges.
 */
export function edgeRuns(p: Plat, pairsIn: readonly number[]): HalfEdgeId[][] {
  const pairs = [...pairsIn].sort((a, b) => a - b).filter((e, i, a) => i === 0 || a[i - 1] !== e);
  const origin = p.halfEdges.origin;
  // Every endpoint with its pair, sorted by vertex: the edges of the set at each vertex.
  const ends: [VertexId, number][] = [];
  for (const e of pairs) ends.push([origin[2 * e], e], [origin[2 * e + 1], e]);
  ends.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const endV = ends.map((x) => x[0]);
  const at = (v: VertexId): number[] => {
    const out: number[] = [];
    for (let i = lowerBound(endV, v); i < ends.length && ends[i][0] === v; i++) out.push(ends[i][1]);
    return out;
  };
  const used = new Uint8Array(pairs.length);
  const usedAt = (e: number): number => lowerBound(pairs, e);
  const walk = (s: VertexId, e0: number): HalfEdgeId[] => {
    const run: HalfEdgeId[] = [];
    let v = s;
    let e = e0;
    for (;;) {
      used[usedAt(e)] = 1;
      const h = origin[2 * e] === v ? 2 * e : 2 * e + 1;
      run.push(h);
      v = origin[h ^ 1];
      const inc = at(v);
      if (inc.length !== 2) break;
      const n = inc[0] === e ? inc[1] : inc[0];
      if (used[usedAt(n)] === 1) break;
      e = n;
    }
    return run;
  };
  const flip = (run: HalfEdgeId[]): HalfEdgeId[] => run.map((h) => h ^ 1).reverse();
  const runs: HalfEdgeId[][] = [];
  // Open runs: from every end or branch vertex (where the set does not continue in exactly one way).
  for (const [v] of ends) {
    const inc = at(v);
    if (inc.length === 2) continue;
    for (const e of inc) {
      if (used[usedAt(e)] === 1) continue;
      let run = walk(v, e);
      const a = origin[run[0]];
      const b = dest(p, run[run.length - 1]);
      if (a === b) {
        // A loop hanging off a branch vertex: it starts there, its first step to the smaller of its two neighbours.
        if (compareVertices(p, origin[run[run.length - 1]], dest(p, run[0])) < 0) run = flip(run);
      } else if (compareVertices(p, b, a) < 0) {
        run = flip(run);
      }
      runs.push(run);
    }
  }
  // Rings: what is left lies on cycles of vertices where the set continues in exactly one way.
  for (let i = 0; i < pairs.length; i++) {
    if (used[i] === 1) continue;
    let run = walk(origin[2 * pairs[i]], pairs[i]);
    let low = 0;
    for (let k = 1; k < run.length; k++) if (compareVertices(p, origin[run[k]], origin[run[low]]) < 0) low = k;
    run = run.slice(low).concat(run.slice(0, low));
    const v = origin[run[0]];
    const a = dest(p, run[0]);
    const b = origin[run[run.length - 1]];
    const t = p.vertices;
    const turn = orient2d(t.x[v], t.y[v], t.x[a], t.y[a], t.x[b], t.y[b]);
    // Reversed, the ring still starts at v: its first half-edge is the twin of the one that ended there.
    if (turn < 0 || (turn === 0 && compareVertices(p, b, a) < 0)) run = flip(run);
    runs.push(run);
  }
  runs.sort((r, s) => compareVertices(p, origin[r[0]], origin[s[0]]) || compareVertices(p, dest(p, r[0]), dest(p, s[0])));
  return runs;
}

/**
 * The current geometry of a reference on arena `p` (§3.4 `resolve(ref, key)`; the arena handed in by the caller — the
 * façade's `resolve(ref, key)` maps the key to its arena, M0-a-16). A FaceRef gives its faces; a role reference gives
 * the edges (an edge role: ChainRef and EdgeSetRef read alike) or the vertices (a vertex role) carrying the key; an
 * absent ordinal reads ordinal 0. A ref that finds no geometry resolves empty; a role the registry does not hold is a
 * programming error; in a debug build `key` must name `p` (§3.10's arena isolation).
 */
export function resolve(p: Plat, ref: FaceRef | ChainRef | EdgeSetRef | VertexRef, key: PlatKey): Resolved {
  debugCheck(sameKey(key, p.key), `resolve on arena ${keyName(p.key)} was handed the key ${keyName(key)}`);
  const s = stamp(p);
  if ('owner' in ref) {
    check(isLevel(ref.level), 'a FaceRef level is 0 … 4');
    const faces = facesOfOwner(p, ref.level, handleOf(p, ref.owner)).sort((a, b) => compareFaces(p, ref.level, a, b));
    return { ...s, view: 'faces', level: ref.level, faces };
  }
  const role = roleIdOf(ref.role);
  check(role >= 0, `no role named ${ref.role}`);
  const info = roleInfo(role);
  const ordinal = 'ordinal' in ref && ref.ordinal !== undefined ? ref.ordinal : 0;
  const rows = rowsOfKey(p, role, handleOf(p, ref.entity), ordinal);
  const elements = rows.map((r) => rowElement(p, r));
  if (info.kind === 'vertex') {
    const vertices = elements.sort((a, b) => compareVertices(p, a, b));
    return { ...s, view: 'vertices', vertices };
  }
  return { ...s, view: 'edges', runs: edgeRuns(p, elements) };
}

/**
 * The vertex at a lattice point, or −1 (§3.10: one vertex per lattice point): a scan of the live vertex slots, O(n). It
 * is the no-index path only (C-0146 (6)): the arena's own `signature` of a lattice point reads it, and the façade's
 * `signature` reads it on an arena with no spatial index attached; the façade reads an indexed arena through
 * `pointLocate` (M0-a-03, M0-a-16).
 */
export function vertexAt(p: Plat, at: LatticePoint): VertexId {
  const t = p.vertices;
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v) && t.x[v] === at.x && t.y[v] === at.y) return v;
  }
  return -1;
}

/** A vertex's signature (rule 5): its own rows, sorted; the structural rows of its incident edges, sorted, deduplicated. */
export function vertexSignature(p: Plat, v: VertexId): VertexSig {
  check(isVertexLive(p, v), `vertex ${v} is not live`);
  const own = rowsOn(p, 'vertex', v).map((r) => rowKey(p, r));
  const rows: number[] = [];
  for (const h of outgoing(p, v)) {
    for (const r of rowsOn(p, 'edge', h)) if (roleInfo(p.roles.kind[r]).structural) rows.push(r);
  }
  const t = p.roles;
  const cmp = (a: number, b: number): number => compareRowKeys(p, t.kind[a], t.entity[a], t.ordinal[a], t.kind[b], t.entity[b], t.ordinal[b]);
  rows.sort(cmp);
  const e = rows.filter((r, i) => i === 0 || cmp(rows[i - 1], r) !== 0).map((r) => rowKey(p, r));
  return { v: own, e };
}

/**
 * What an edit stores beside a position (§3.4 `signature(key, v)`): the signature of the vertex a VertexRef resolves to
 * or of the vertex at a lattice point; empty (`v` and `e` both []) when there is none. A VertexRef that finds several
 * vertices asserts in a debug build (§3.10: an indexed role finds one vertex per ordinal).
 */
export function signature(p: Plat, v: VertexRef | LatticePoint, key: PlatKey): VertexSig {
  debugCheck(sameKey(key, p.key), `signature on arena ${keyName(p.key)} was handed the key ${keyName(key)}`);
  let vertex: VertexId;
  if ('role' in v) {
    check(roleIdOf(v.role) >= 0 && roleInfo(roleIdOf(v.role)).kind === 'vertex', `${v.role} is not a vertex role`);
    const r = resolve(p, v, key);
    const vs = r.view === 'vertices' ? r.vertices : [];
    debugCheck(vs.length <= 1, `the VertexRef (${v.role}, ${v.entity}) finds ${vs.length} vertices`);
    vertex = vs.length === 0 ? -1 : vs[0];
  } else {
    vertex = vertexAt(p, v);
  }
  return vertex === -1 ? { v: [], e: [] } : vertexSignature(p, vertex);
}
