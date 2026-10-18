// faceNeighbours(key, face, level) (§3.4; §3.10's reachability walk crosses passage, alley and court faces through it):
// the faces of `level` that share an edge of the level-n view with `face` — across its outer ring and across each of its
// holes — by the half-edge structure. M0-a-10; C-0159 (6), made complete by C-0163.
//
// A half-edge does not store its face (§2.2's tables), so the half-edge → face map of a level is built from the level's
// face records (every live face's level walks) and kept per arena, keyed by the arena's restore generation, version and
// slot counts — a committed batch bumps the version (§3.3), so the first query after a commit rebuilds, and a savepoint
// put back across committed batches sets the version back but bumps the generation (C-0299), so a map built before such
// a restore is never taken as current once as many later commits bring the version back (Q34, C-0319). The key is a
// cost path only:
// every claim the map makes for a query is re-checked against the arena as it is now, so an arena written under an
// unchanged version and unchanged counts (a batch between its writes and its commit) costs a rebuild, never an answer
// (C-0163):
// * a neighbour f across half-edge g — f live, and g on one of f's rings now;
// * the face itself across g (an antenna's two sides are one face) — g on one of the face's own rings now;
// * no face across g — the level's face records (liveness, outer and hole anchors) are those the map was built from, and
//   no half-edge of g's ring (walked now) is mapped to a face. A face that owns that ring now has its anchor on it; with
//   the anchors unchanged it owned the anchor's ring when the map was built, so the map holds that face for the anchor.
// The last check reads every face record of the level once, so a query with such a claim costs O(faces of the level);
// the others cost the rings they read.
import {
  compareFaces,
  debugAssertions,
  faceWalk,
  isFaceLive,
  sameKey,
  walkRing,
  FREE_KIND,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type Stamp,
} from '../arena/index.js';
import { restoreGeneration } from '../tx/index.js';
import type { Level, PlatKey } from '../types/index.js';

/** The answer: the neighbours' slots by canonical face key (§3.3), stamped with the arena's key and version (§3.4). */
export type FaceNeighbours = Stamp & { readonly level: Level; readonly faces: FaceId[] };

/** A level's map: per half-edge, the face on its left (−1: none recorded — finer than the level, or no face there). */
interface LevelMap {
  /** The arena's restore generation when the map was built (C-0299): with `version`, one arena state. */
  generation: number;
  version: number;
  fingerprint: string;
  face: Int32Array;
  /** The level's face records it was built from: per slot below `top`, −2 for a free slot, else its outer half-edge, its hole half-edges and −1. */
  anchors: Int32Array;
}

interface ArenaMaps {
  levels: (LevelMap | undefined)[];
  /** How many maps this arena has built (kernel-internal; the cache-key tests read it). */
  builds: number;
}

const maps = new WeakMap<Plat, ArenaMaps>();

/** The slot counters that any face or edge change moves (with the version). */
function fingerprint(p: Plat, level: Level): string {
  const s = p.slots;
  return `${s.pair.top}/${s.pair.live}/${s.face[level].top}/${s.face[level].live}/${s.vertex.top}/${s.holesTop[level]}`;
}

/**
 * Calls `visit` with the level's face-record anchors in order (see `LevelMap.anchors`); stops and returns false when
 * `visit` does, or when a hole run reaches the pool's used length without its −1 (a malformed run: no map is kept for it).
 */
function eachAnchor(p: Plat, level: Level, visit: (v: number) => boolean): boolean {
  const t = p.faces[level];
  const used = p.slots.holesTop[level];
  for (let f = 0; f < p.slots.face[level].top; f += 1) {
    if (t.kind[f] === FREE_KIND) {
      if (!visit(-2)) return false;
      continue;
    }
    if (!visit(t.outer[f])) return false;
    const s = t.holesStart[f];
    if (s !== -1) {
      for (let i = s; ; i += 1) {
        if (i < 0 || i >= used) return false;
        const h = t.holes[i];
        if (h === -1) break;
        if (!visit(h)) return false;
      }
    }
    if (!visit(-1)) return false;
  }
  return true;
}

function build(p: Plat, level: Level): LevelMap {
  const face = new Int32Array(2 * p.slots.pair.top).fill(-1);
  for (let f = 0; f < p.slots.face[level].top; f += 1) {
    if (!isFaceLive(p, level, f)) continue;
    for (const ring of faceWalk(p, level, f)) for (const h of ring) face[h] = f;
  }
  const list: number[] = [];
  eachAnchor(p, level, (v) => {
    list.push(v);
    return true;
  });
  return { generation: restoreGeneration(p), version: p.version, fingerprint: fingerprint(p, level), face, anchors: Int32Array.from(list) };
}

function entry(p: Plat): ArenaMaps {
  let e = maps.get(p);
  if (e === undefined) {
    e = { levels: [], builds: 0 };
    maps.set(p, e);
  }
  return e;
}

/** The kept map of the level when its key (restore generation, version and slot counts) matches the arena's, else undefined. */
function keptMap(p: Plat, level: Level): LevelMap | undefined {
  const m = entry(p).levels[level];
  return m !== undefined && m.generation === restoreGeneration(p) && m.version === p.version && m.fingerprint === fingerprint(p, level)
    ? m
    : undefined;
}

function rebuild(p: Plat, level: Level): LevelMap {
  const e = entry(p);
  const m = build(p, level);
  e.levels[level] = m;
  e.builds += 1;
  return m;
}

/** Are the level's face records (liveness, outer and hole anchors) those the map was built from? */
function sameAnchors(p: Plat, level: Level, m: LevelMap): boolean {
  let i = 0;
  const all = eachAnchor(p, level, (v) => i < m.anchors.length && m.anchors[i++] === v);
  return all && i === m.anchors.length;
}

/** How many half-edge → face maps arena `p` has built (kernel-internal: the cache-key tests read it; not exported by the package). */
export function neighbourMapBuilds(p: Plat): number {
  return maps.get(p)?.builds ?? 0;
}

/**
 * The faces of `level` sharing an edge with `face` on arena `p` (the façade maps `key` to its arena, M0-a-16; in a debug
 * build `key` must name `p`), by canonical face key, each once, `face` itself excluded (an antenna's two sides are
 * one face). The arena's outside is no face, and neither is a region with no record at the level (its own child, C-0146
 * (2)). `key` is a PlatKey until M0-a-16 declares `ArenaKey` (C-0041).
 */
export function faceNeighbours(p: Plat, key: PlatKey, face: FaceId, level: Level): FaceNeighbours {
  if (debugAssertions() && !sameKey(key, p.key)) {
    throw new Error(`arena: faceNeighbours on arena ${p.key.layer}/${p.key.part} was handed the key ${key.layer}/${key.part}`);
  }
  const rings = faceWalk(p, level, face);
  const own = new Set<HalfEdgeId>();
  const twins: HalfEdgeId[] = [];
  for (const ring of rings) {
    for (const h of ring) {
      own.add(h);
      twins.push(h ^ 1);
    }
  }
  // Each face's ring half-edges, read once per query for the claims that name it.
  const ringsOf = new Map<FaceId, Set<HalfEdgeId>>();
  const onFace = (f: FaceId, g: HalfEdgeId): boolean => {
    let set = ringsOf.get(f);
    if (set === undefined) {
      set = new Set<HalfEdgeId>();
      if (isFaceLive(p, level, f)) for (const ring of faceWalk(p, level, f)) for (const h of ring) set.add(h);
      ringsOf.set(f, set);
    }
    return set.has(g);
  };
  // The neighbours the map gives; with `check`, null when any claim it makes does not hold of the arena now.
  const collect = (m: LevelMap, check: boolean): FaceId[] | null => {
    const found = new Set<FaceId>();
    const absent: HalfEdgeId[] = [];
    for (const g of twins) {
      const f = g < m.face.length ? m.face[g] : -1;
      if (f === face) {
        if (check && !own.has(g)) return null;
      } else if (f >= 0) {
        if (check && !onFace(f, g)) return null;
        found.add(f);
      } else if (check) {
        absent.push(g);
      }
    }
    if (absent.length > 0) {
      if (!sameAnchors(p, level, m)) return null;
      const walked = new Set<HalfEdgeId>();
      for (const g of absent) {
        if (walked.has(g)) continue;
        for (const r of walkRing(p, level, g)) {
          if (r >= m.face.length || m.face[r] !== -1) return null;
          walked.add(r);
        }
      }
    }
    return [...found].sort((a, b) => compareFaces(p, level, a, b));
  };
  const kept = keptMap(p, level);
  const faces = (kept === undefined ? null : collect(kept, true)) ?? (collect(rebuild(p, level), false) as FaceId[]);
  return { key: { layer: p.key.layer, part: p.key.part }, version: p.version, level, faces };
}
