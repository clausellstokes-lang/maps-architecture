// Insertion step 5 — the local re-walk (§3.6 *Attraction*, step 5; §2.2 rules 2 and 4; §3.3 *Kept content*'s
// re-parenting; §3.10's faces-simple, nesting and level-consistency rows). M0-a-05.
//
// Only faces incident to touched edges are re-walked; face records, owners, parents and stage ranks are updated — a
// split face's parts both inherit its owner and stage rank until the stage re-owns one (§2.2 rule 4), and a kept face is
// re-parented into the new face that contains it (§3.3) — and the journal lists them (the commit record's `faces`). A
// level's face records inside a parent face are materialised when the first edge of that level is inserted there (§2.2
// rule 2); until then the parent face is its own child.
//
// `rewalk(tx, touched)` takes the batch's new edge pairs (all of its level n): new edges change the level-l cycles at
// every l ≥ n, but a level-n chain never enters a finer face record (finer records are kept content at M0, C-0177 (4)),
// so the records that change are level n's — and level n + 1's parents, re-parented. The re-walk: (1) walks the level-n
// cycles through the new half-edges; (2) finds the old records whose regions held new edges (index queries around them)
// and walks their old rings in the old view — the arena without the new edges; (3) gives each new cycle its old region:
// a record whose old ring holds one of the cycle's old half-edges, the region across a new edge, the region holding a
// new edge's midpoint, or — where level n has no record there — the coarser record that holds it (a level-n region
// materialised from it, C-0177 (9)): the record whose walk holds one of the cycle's coarser sub-edges, a failed premise
// (a finer record under it) refused E_INVARIANT (C-0349); (4) in each region, splits the cycles into faces: a
// counter-clockwise cycle (exact `area2` > 0) is a face's outer ring, every other one a hole of the smallest face that
// strictly holds it, or the unbounded outside; (5) writes the records — a region's face holding its record's stored
// outer half-edge keeps the record (its rings changed), every other face is a new record inheriting the region's kind,
// owner, stage rank and parent — with the index (§3.3 "No item changes in place") and the journal; (6) re-parents the
// level-(n + 1) records of a split record by containment, each listed in the journal's level-(n + 1) `changed` (the
// commit record lists them, §3.6 step 5). Charges `tx.facesWalked` once per ring walked. Readings: C-0177 (8), (9),
// refined by C-0178 (the re-parented kept records the journal lists) and C-0349 (the coarser record, round S8).
import {
  allocFace,
  faceHoles,
  freeFace,
  faceWalk,
  FREE_KIND,
  isFaceLive,
  setFaceHoles,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { homeOf, HOT_PIXEL_CM, indexAdd, indexChange, ITEM_FACE, query } from '../index/index.js';
import { area2, err, ok, orient2d, type KernelResult } from '../num/index.js';
import type { Cm, LatticePoint, Level } from '../types/index.js';
import { charge, check, workLimitHit, type InsertTx } from './classes.js';
import { chainJournal, segmentBox } from './stretch.js';

/** The work-limit counter of the faces a batch walks (M0.md §2.2's `tx.facesWalked`, unit `faces`). */
export const TX_FACES_WALKED = 'tx.facesWalked';

/**
 * How far past a point a face record is asked of the index when the exact test reads its walk (whole cm): the index
 * reads a level-m record on its level-m route, the walk passes every Steiner vertex on its edges, each within one hot
 * pixel (0.71 cm, §2.2 rule 3) of the route per level it is finer, four levels at most — so a record holding a point by
 * its walk always meets the box (C-0349 (1); Q53, checks/diagnosis-a09-sliver.md §5). 3 cm.
 */
export const WALK_REACH_CM = Math.ceil(4 * HOT_PIXEL_CM);
const REACH = WALK_REACH_CM;

/** What a batch touched that the re-walk reads: its new edge pairs (of the batch's level). */
export interface Touched {
  readonly pairs: readonly number[];
}

/** The attributes a face record inherits (§2.2 rule 4): kind, owner (interned handle), stage rank, parent. */
interface Base {
  readonly kind: number;
  readonly owner: number;
  readonly stage: number;
  readonly parent: FaceId;
}

/** An old level-n region: a record, a region materialised from a coarser record, or the unbounded outside of L0. */
interface Region {
  readonly kind: 'record' | 'virtual' | 'none';
  /** The record (kind `record`), else −1. */
  readonly rec: FaceId;
  /** For `virtual`: the coarser record it is materialised from, and that record's level. */
  readonly from: FaceId;
  readonly fromLevel: number;
  readonly base: Base;
  /** Its stored rings — one half-edge each, outer first (the record's, or for `virtual` the coarser record's); none for `none`. */
  readonly stored: HalfEdgeId[];
  /** Its old rings, walked when first needed (index-aligned with `stored`). */
  readonly oldRings: (HalfEdgeId[] | null)[];
}

/** The lattice points of a ring's origins. */
function ringPoints(p: Plat, ring: readonly HalfEdgeId[]): LatticePoint[] {
  const O = p.halfEdges.origin;
  return ring.map((h) => ({ x: p.vertices.x[O[h]] as Cm, y: p.vertices.y[O[h]] as Cm }));
}

/** Is the doubled point strictly inside the ring of half-edges (their origins; crossing number on doubled coordinates)? */
function insideRing(p: Plat, ring: readonly HalfEdgeId[], qx2: number, qy2: number): boolean {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = O[ring[i]];
    const b = O[ring[(i + 1) % ring.length]];
    const ay = 2 * Y[a];
    const by = 2 * Y[b];
    if ((ay > qy2) !== (by > qy2)) {
      const o = orient2d(2 * X[a], ay, 2 * X[b], by, qx2, qy2);
      if (by > ay ? o > 0 : o < 0) inside = !inside;
    }
  }
  return inside;
}

/**
 * `rewalk(touched)` (§3.6 step 5) on the transaction's arena at its level (see the module comment). It reads only the
 * rings the new edges touch — an untouched ring of a region is walked only where the region splits into several faces
 * and the ring must be placed in one — so its cost is that of the touched faces (§3.10, SCL-1). Refuses E_LEVEL where a
 * new edge of a batch above L0 lies outside every L0 face (no parent can hold its faces; §2.2 rule 2), and E_WORK_LIMIT
 * before it writes a record; otherwise writes the records and returns.
 */
export function rewalk(tx: InsertTx, touched: Touched, undo?: (() => void)[]): KernelResult<null> {
  const p = tx.plat;
  const n = tx.level;
  if (touched.pairs.length === 0) return ok(null);
  const T = p.halfEdges;
  const F = p.faces[n];
  const isNew = new Set<number>(touched.pairs);
  const journal = chainJournal(tx);
  const walked = (k: number): boolean => charge(tx, TX_FACES_WALKED, k);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = T.origin;

  // (1) The level-n cycles through the new half-edges.
  const onNew = new Map<HalfEdgeId, number>(); // half-edge → index in `cycles`
  const cycles: HalfEdgeId[][] = [];
  for (const e of touched.pairs) {
    for (const h of [2 * e, 2 * e + 1]) {
      if (onNew.has(h)) continue;
      const ring = walkRing(p, n, h);
      for (const g of ring) onNew.set(g, cycles.length);
      cycles.push(ring);
    }
  }
  if (!walked(cycles.length)) return workLimitHit(TX_FACES_WALKED);

  // The old view: the level-n walk skipping the new pairs.
  const oldWalk = (h: HalfEdgeId): HalfEdgeId[] => {
    const ring: HalfEdgeId[] = [];
    let g = h;
    do {
      ring.push(g);
      check(ring.length <= T.origin.length, 'an old ring does not close');
      let x = T.next[g];
      let guard = 0;
      while (T.level[x >> 1] > n || isNew.has(x >> 1)) {
        x = T.next[x ^ 1];
        check(++guard <= T.origin.length, 'a rotation does not close');
      }
      g = x;
    } while (g !== h);
    return ring;
  };

  // (2) The old records round the new edges, by their stored half-edges (no ring walked yet).
  const regions: Region[] = [];
  const storedBy = new Map<HalfEdgeId, Region>();
  const recordRegion = new Map<FaceId, Region>();
  const addRegion = (r: Region): Region => {
    regions.push(r);
    for (const h of r.stored) if (!storedBy.has(h)) storedBy.set(h, r);
    return r;
  };
  const addRecord = (f: FaceId): Region => {
    const known = recordRegion.get(f);
    if (known !== undefined) return known;
    const stored = [F.outer[f], ...faceHoles(p, n, f)];
    const r = addRegion({
      kind: 'record', rec: f, from: -1, fromLevel: -1,
      base: { kind: F.kind[f], owner: F.owner[f], stage: F.stage[f], parent: F.parent[f] },
      stored, oldRings: stored.map(() => null),
    });
    recordRegion.set(f, r);
    return r;
  };
  // The candidates are asked `REACH` past each new edge: the index reads a record on its level-n route, the regions below
  // by its walk through any finer Steiner vertex (the S8 survey of Q53's mismatch, C-0349 (3)).
  for (const e of touched.pairs) {
    const a = O[2 * e];
    const b = O[2 * e + 1];
    for (const f of query(p, tx.key, n, segmentBox(X[a], Y[a], X[b], Y[b], REACH), { faces: true }).faces) addRecord(f);
  }
  const oldRing = (r: Region, i: number): HalfEdgeId[] => {
    let ring = r.oldRings[i];
    if (ring === null) {
      ring = oldWalk(r.stored[i]);
      r.oldRings[i] = ring;
      walked(1);
    }
    return ring;
  };
  const insideRegion = (r: Region, qx2: number, qy2: number): boolean => {
    if (r.stored.length === 0) return false;
    if (!insideRing(p, oldRing(r, 0), qx2, qy2)) return false;
    for (let i = 1; i < r.stored.length; i++) if (insideRing(p, oldRing(r, i), qx2, qy2)) return false;
    return true;
  };

  // (3) Each new cycle's old region: by the old ring through one of its old half-edges (the region storing a half-edge
  // of that ring), across a new edge, by a new edge's midpoint, or from the coarser record that holds it.
  const regionOf: (Region | null)[] = cycles.map(() => null);
  const ownerOf = new Map<HalfEdgeId, Region | null>(); // old half-edge → its old ring's region (null: none stored yet)
  const byOldRing = (g: HalfEdgeId): Region | null => {
    const known = ownerOf.get(g);
    if (known !== undefined && known !== null) return known;
    const ring = oldWalk(g);
    walked(1);
    let found: Region | null = null;
    for (const h of ring) {
      const r = storedBy.get(h);
      if (r !== undefined) {
        found = r;
        break;
      }
    }
    for (const h of ring) ownerOf.set(h, found);
    return found;
  };
  const viaOld = (i: number): void => {
    for (const g of cycles[i]) {
      if (isNew.has(g >> 1)) continue;
      const r = byOldRing(g);
      if (r !== null) regionOf[i] = r;
      return; // one old half-edge decides: its old ring bounds the cycle's old region
    }
  };
  const propagate = (): void => {
    for (let changed = true; changed; ) {
      changed = false;
      for (let i = 0; i < cycles.length; i++) {
        if (regionOf[i] !== null) continue;
        for (const g of cycles[i]) {
          if (!isNew.has(g >> 1)) continue; // across a new edge only: an old edge bounds two old regions
          const j = onNew.get(g ^ 1);
          if (j !== undefined && regionOf[j] !== null) {
            regionOf[i] = regionOf[j];
            changed = true;
            break;
          }
        }
      }
    }
  };
  for (let i = 0; i < cycles.length; i++) viaOld(i);
  propagate();
  const virtualOf = new Map<string, Region>();
  let outside = false;
  let premiseBroken: string | null = null;
  for (let i = 0; i < cycles.length; i++) {
    if (regionOf[i] !== null) continue;
    // The midpoint of one of its new edges, doubled: strictly inside one old region.
    let g = -1;
    for (const h of cycles[i]) {
      if (isNew.has(h >> 1)) {
        g = h;
        break;
      }
    }
    check(g >= 0, 'a cycle through the new edges holds a new half-edge');
    const qx2 = X[O[g]] + X[O[g ^ 1]];
    const qy2 = Y[O[g]] + Y[O[g ^ 1]];
    let found: Region | null = null;
    for (const r of regions) if (r.kind !== 'none' && insideRegion(r, qx2, qy2)) found = r;
    if (found === null) {
      found = coarserRegion(cycles[i], g, qx2, qy2);
      // The premise of a region materialised from a coarser record failed (C-0349 (2)): refuse before any record is
      // written — never a phantom record (N-45 (a)).
      if (premiseBroken !== null) return err('E_INVARIANT', premiseBroken);
    }
    if (found === null) {
      if (n > 0) {
        outside = true;
        continue;
      }
      found = noneRegion();
    }
    regionOf[i] = found;
    // A region just made may name old rings other cycles run along; then its neighbours across new edges share it.
    for (let k = 0; k < cycles.length; k++) if (regionOf[k] === null) viaOld(k);
    propagate();
  }

  /**
   * The coarser record holding a cycle no level-n record holds (§2.2 rule 2's own child), found in the batch's own
   * reading — the arena's walk, through every Steiner vertex — never by a level-m route reading of a point (C-0349 (1);
   * Q53, plat/docs/build/checks/diagnosis-a09-sliver.md §5). For each level m from n − 1 down: an old half-edge of the
   * cycle of level ≤ m is a sub-edge of a level-≤ m edge, and the level-m face on its left holds the cycle (nesting,
   * §2.2 rule 2); its record is the one whose level-m walk holds that half-edge (§3.10's nesting row, "by index — never
   * by coordinates"; `reparent`'s reading below), the candidates asked of the index round the half-edge's origin. A
   * cycle with no old half-edge of level ≤ m (new edges alone) is placed by the new edge's midpoint `g`, strictly
   * inside one level-m walk. Either way the candidate box reaches `REACH` past the point: the index reads each record
   * on its level-m route, the walk lies within one hot pixel of it per finer level (§2.2 rule 3), so the record holding
   * the point by its walk is always a candidate and the exact test decides. No record at m: level m is the coarser
   * record's own child there, and the search goes on at m − 1.
   */
  function coarserRegion(cycle: readonly HalfEdgeId[], g: HalfEdgeId, qx2: number, qy2: number): Region | null {
    for (let m = n - 1; m >= 0; m--) {
      const lm = m as Level;
      const f = holderAt(lm, cycle, qx2, qy2);
      if (f < 0) continue;
      const key = `${m}:${f}`;
      const known = virtualOf.get(key);
      if (known !== undefined) return known;
      // Its level-n region: the coarser record's rings, walked at level n in the old view — premised on no record of a
      // level m + 1 … n lying under it (else that level holds the cycle's record there): checked round the new edge,
      // a failed premise refused E_INVARIANT before anything is written (C-0349 (2); diagnosis §8 (4)).
      premiseBroken = recordUnder(lm, f, g);
      if (premiseBroken !== null) return null;
      const Fm = p.faces[lm];
      const stored = [Fm.outer[f], ...faceHoles(p, lm, f)];
      const r = addRegion({
        kind: 'virtual', rec: -1, from: f, fromLevel: m,
        base: { kind: Fm.kind[f], owner: Fm.owner[f], stage: Fm.stage[f], parent: -1 },
        stored, oldRings: stored.map(() => null),
      });
      virtualOf.set(key, r);
      // The old rings already read as "no region" may be this region's.
      for (const [h, v] of ownerOf) if (v === null) ownerOf.delete(h);
      return r;
    }
    return null;
  }

  /** The level-m record holding the cycle (see `coarserRegion`), or −1 where level m has none there. */
  function holderAt(lm: Level, cycle: readonly HalfEdgeId[], qx2: number, qy2: number): FaceId {
    let s = -1;
    for (const h of cycle) {
      if (!isNew.has(h >> 1) && T.level[h >> 1] <= lm) {
        s = h;
        break;
      }
    }
    if (s >= 0) {
      const v = O[s];
      for (const f of query(p, tx.key, lm, { minX: X[v] - REACH, minY: Y[v] - REACH, maxX: X[v] + REACH, maxY: Y[v] + REACH }, { faces: true }).faces) {
        const rings = faceWalk(p, lm, f);
        walked(rings.length);
        for (const ring of rings) if (ring.includes(s)) return f;
      }
      return -1;
    }
    const x0 = Math.floor(qx2 / 2);
    const y0 = Math.floor(qy2 / 2);
    for (const f of query(p, tx.key, lm, { minX: x0 - REACH, minY: y0 - REACH, maxX: x0 + 1 + REACH, maxY: y0 + 1 + REACH }, { faces: true }).faces) {
      const rings = faceWalk(p, lm, f);
      walked(rings.length);
      if (!insideRing(p, rings[0], qx2, qy2)) continue;
      let inHole = false;
      for (let i = 1; i < rings.length; i++) if (insideRing(p, rings[i], qx2, qy2)) inHole = true;
      if (!inHole) return f;
    }
    return -1;
  }

  /**
   * The failed premise of a region materialised from the level-m record `f`, or null: a live record of a level m + 1 … n
   * under `f` (its parent chain reaches `f`) round the new half-edge `g` — an own child this batch materialised from `f`
   * excepted (`materialiseParent` reuses it). Records of a level tile their parent once materialised (§2.2 rule 2), so
   * where `f` has any at m + 1 one of them meets the box round the new edge; expected never, counted where it occurs.
   */
  function recordUnder(lm: Level, f: FaceId, g: HalfEdgeId): string | null {
    const a = O[g];
    const b = O[g ^ 1];
    const box = segmentBox(X[a], Y[a], X[b], Y[b], REACH);
    const own = new Set<string>(chainJournal(tx).materialised.map((x) => `${x.level}:${x.face}`));
    for (let k = lm + 1; k <= n; k++) {
      const lk = k as Level;
      for (const c of query(p, tx.key, lk, box, { faces: true }).faces) {
        if (!isFaceLive(p, lk, c) || (k < n && own.has(`${k}:${c}`))) continue;
        let x = c;
        for (let l = k; l > lm && x >= 0; l--) x = p.faces[l as Level].parent[x];
        if (x === f) return `insert: the L${k} record ${c} lies under the L${lm} face ${f} that a region of the L${n} batch would be materialised from (§2.2 rule 2)`;
      }
    }
    return null;
  }

  function noneRegion(): Region {
    const known = virtualOf.get('none');
    if (known !== undefined) return known;
    const r = addRegion({ kind: 'none', rec: -1, from: -1, fromLevel: -1, base: { kind: 0, owner: -1, stage: 0, parent: -1 }, stored: [], oldRings: [] });
    virtualOf.set('none', r);
    return r;
  }

  // Every ring this re-walk must read to decide is read by now: past the work limit, refuse before writing a record.
  if (tx.work.total > tx.workLimit) return workLimitHit(TX_FACES_WALKED);
  // (4) – (5) Per region: its faces, and the records.
  const parentAt = (m: number, from: FaceId, fromLevel: number, base: Base): FaceId => materialiseParent(tx, m, from, fromLevel, base, undo);
  for (const r of regions) {
    const mine: HalfEdgeId[][] = [];
    for (let i = 0; i < cycles.length; i++) if (regionOf[i] === r) mine.push(cycles[i]);
    if (mine.length === 0) continue;
    // The region's stored rings no new edge touched stay as they are (an untouched ring has no half-edge on a new cycle).
    const untouched: number[] = [];
    for (let i = 0; i < r.stored.length; i++) if (!onNew.has(r.stored[i])) untouched.push(i);
    const areas = mine.map((ring) => area2(ringPoints(p, ring)));
    // The faces: the positive new cycles, and the region's outer ring when untouched.
    type Ring = { readonly kind: 'new'; readonly i: number } | { readonly kind: 'old'; readonly i: number };
    const outers: Ring[] = [];
    const holes: Ring[] = [];
    for (let i = 0; i < mine.length; i++) (areas[i] > 0 ? outers : holes).push({ kind: 'new', i });
    for (const i of untouched) (i === 0 && r.kind !== 'none' ? outers : holes).push({ kind: 'old', i });
    const ringOf = (x: Ring): HalfEdgeId[] => (x.kind === 'new' ? mine[x.i] : oldRing(r, x.i));
    const halfOf = (x: Ring): HalfEdgeId => (x.kind === 'new' ? mine[x.i][0] : r.stored[x.i]);
    const areaOf = (x: Ring): number => (x.kind === 'new' ? areas[x.i] : area2(ringPoints(p, ringOf(x))));
    const holesOf = new Map<Ring, Ring[]>();
    for (const o of outers) holesOf.set(o, []);
    if (outers.length === 1 && r.kind !== 'none') {
      // One face of a bounded region: every hole is its (no containment to decide; L0's unbounded outside is decided
      // by containment).
      for (const h of holes) (holesOf.get(outers[0]) as Ring[]).push(h);
    } else {
      const oArea = outers.map(areaOf);
      for (const h of holes) {
        // The smallest outer ring strictly holding one of the hole's vertices that is not on that ring.
        const hv = ringOf(h).map((g) => O[g]);
        let best = -1;
        for (let k = 0; k < outers.length; k++) {
          if (best >= 0 && oArea[k] >= oArea[best]) continue;
          const oRing = ringOf(outers[k]);
          const onRing = new Set<VertexId>(oRing.map((g) => O[g]));
          const v = hv.find((w) => !onRing.has(w));
          if (v === undefined) continue;
          if (insideRing(p, oRing, 2 * X[v], 2 * Y[v])) best = k;
        }
        if (best >= 0) (holesOf.get(outers[best]) as Ring[]).push(h);
        else check(r.kind === 'none', 'a hole cycle of a bounded region lies in none of its faces');
      }
    }
    // Which face keeps the record: the one whose outer ring holds the record's stored outer half-edge (§2.2 rule 4's
    // parts both inherit; the slot is never an output).
    let keep: Ring | null = null;
    if (r.kind === 'record') {
      const h0 = r.stored[0];
      for (const o of outers) if (o.kind === 'old' ? o.i === 0 : mine[o.i].includes(h0)) keep = o;
      if (keep === null && outers.length > 0) keep = outers[0];
    }
    const parent = r.kind === 'record' ? r.base.parent : r.kind === 'virtual' ? parentAt(n - 1, r.from, r.fromLevel, r.base) : -1;
    const parts: FaceId[] = [];
    for (const o of outers) {
      const hs = (holesOf.get(o) as Ring[]).map(halfOf);
      if (o === keep) {
        const f = r.rec;
        const item = { kind: ITEM_FACE, level: n, slot: f } as const;
        tx.journal.changed.push({ item, homeBefore: homeOf(p, item), successor: item });
        const oldOuter = F.outer[f];
        const oldHoles = faceHoles(p, n, f);
        undo?.push(() => {
          F.outer[f] = oldOuter;
          setFaceHoles(p, n, f, oldHoles);
        });
        F.outer[f] = halfOf(o);
        setFaceHoles(p, n, f, hs);
        indexChange(p, item);
        journal.faces[n].changed.push(f);
        parts.push(f);
      } else {
        const f = allocFace(p, n, { outer: halfOf(o), kind: r.base.kind, owner: r.base.owner, stage: r.base.stage, parent });
        undo?.push(() => freeFace(p, n, f));
        if (hs.length > 0) setFaceHoles(p, n, f, hs);
        indexAdd(p, { kind: ITEM_FACE, level: n, slot: f });
        journal.faces[n].created.push(f);
        parts.push(f);
      }
    }
    // (6) A split record's finer children go to the part that holds them (kept faces re-parented, §3.3).
    if (r.kind === 'record' && n < 4 && parts.length > 1) reparent(tx, r.rec, parts, undo);
  }
  if (outside) return err('E_LEVEL', `a new edge of an L${n} batch lies outside every L0 face: no parent holds its faces (§2.2 rule 2)`);
  // The re-parenting walks the children of a split record as it writes: past the limit now, the op refuses (its writes
  // are undone by the chain, C-0177 (8)).
  if (tx.work.total > tx.workLimit) return workLimitHit(TX_FACES_WALKED);
  return ok(null);
}

/**
 * The record of level `m` holding a region materialised from the coarser record `from` (of level `fromLevel` ≤ m):
 * `from` itself when m = fromLevel, else the own child at level m — an existing record at m whose parent chain reaches
 * `from` and whose rings are `from`'s, or one materialised now with `from`'s rings, kind, owner and stage, its parent
 * the record at m − 1 (§2.2 rule 2: a face record exists where a finer one needs a parent). C-0177 (9).
 */
function materialiseParent(tx: InsertTx, m: number, from: FaceId, fromLevel: number, base: Base, undo?: (() => void)[]): FaceId {
  if (m === fromLevel) return from;
  const p = tx.plat;
  const lm = m as Level;
  const parent = materialiseParent(tx, m - 1, from, fromLevel, base, undo);
  const Ff = p.faces[fromLevel as Level];
  // An own child already materialised at m by this batch for the same coarser record.
  const Fm = p.faces[lm];
  for (const { level, face } of chainJournal(tx).materialised) {
    if (level === m && isFaceLive(p, lm, face) && Fm.parent[face] === parent && Fm.outer[face] === Ff.outer[from]) return face;
  }
  const f = allocFace(p, lm, { outer: Ff.outer[from], kind: base.kind, owner: base.owner, stage: base.stage, parent });
  undo?.push(() => freeFace(p, lm, f));
  const holes = faceHoles(p, fromLevel as Level, from);
  if (holes.length > 0) setFaceHoles(p, lm, f, holes);
  indexAdd(p, { kind: ITEM_FACE, level: lm, slot: f });
  chainJournal(tx).materialised.push({ level: lm, face: f });
  chainJournal(tx).faces[lm].created.push(f);
  return f;
}

/**
 * Re-parents the level-(n + 1) records whose parent was the split record `old` into the part that holds each: a half-edge
 * of level ≤ n on its outer ring names the part on its left; a ring of finer edges only is tested by one of its vertices.
 * Each record whose parent changes is listed in the journal's `faces[n + 1].changed` (the commit record's dirty set); one
 * in the part that kept `old` is untouched and unlisted.
 */
function reparent(tx: InsertTx, old: FaceId, parts: readonly FaceId[], undo?: (() => void)[]): void {
  const p = tx.plat;
  const n = tx.level;
  const up = (n + 1) as Level;
  const T = p.halfEdges;
  const O = T.origin;
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const Fu = p.faces[up];
  const partRings = parts.map((f) => faceWalk(p, n, f));
  const partOf = new Map<HalfEdgeId, FaceId>();
  partRings.forEach((rings, i) => {
    for (const ring of rings) for (const g of ring) partOf.set(g, parts[i]);
  });
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const rings of partRings) {
    for (const g of rings[0]) {
      const v = O[g];
      minX = Math.min(minX, X[v]);
      minY = Math.min(minY, Y[v]);
      maxX = Math.max(maxX, X[v]);
      maxY = Math.max(maxY, Y[v]);
    }
  }
  const box = segmentBox(minX, minY, maxX, maxY, 1);
  for (const c of query(p, tx.key, up, box, { faces: true }).faces) {
    if (Fu.parent[c] !== old || Fu.kind[c] === FREE_KIND) continue;
    const ring = faceWalk(p, up, c)[0];
    charge(tx, TX_FACES_WALKED, 1);
    let to = -1;
    for (const g of ring) {
      if (T.level[g >> 1] <= n) {
        const part = partOf.get(g);
        if (part !== undefined) {
          to = part;
          break;
        }
      }
    }
    if (to < 0) {
      const v = O[ring[0]];
      for (let i = 0; i < parts.length && to < 0; i++) {
        const rings = partRings[i];
        if (!insideRing(p, rings[0], 2 * X[v], 2 * Y[v])) continue;
        let inHole = false;
        for (let k = 1; k < rings.length; k++) if (insideRing(p, rings[k], 2 * X[v], 2 * Y[v])) inHole = true;
        if (!inHole) to = parts[i];
      }
    }
    check(to >= 0, `the L${up} face ${c} lies in no part of the face it was nested in`);
    if (to === old) continue; // in the part that kept the record: its parent is unchanged, so it is not dirty
    undo?.push(() => {
      Fu.parent[c] = old;
    });
    Fu.parent[c] = to;
    // §3.6 step 5: "the commit record lists them" — a re-parented record is in the batch's dirty set at its level
    // (§3.3's CommitRecord.faces, per level ≥ the batch's), as `changed`; a refused chain truncates the list with the rest
    // of the journal (C-0177 (8)).
    chainJournal(tx).faces[up].changed.push(c);
  }
}
