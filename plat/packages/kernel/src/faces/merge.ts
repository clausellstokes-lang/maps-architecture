// mergeFaces and absorbSliver (§3.4; §3.6 *Roles on shared stretches, and slivers*). M0-a-07. Readings: C-0192.
//
// * mergeFaces(tx, a, b) deletes the edges a and b share — partition edges only: a shared edge carrying a structural
//   role (rule 7's bold rows: way, wall, shore, bank, border …) refuses E_STRUCTURAL, one carrying a row coarser than the
//   batch refuses E_LEVEL (§3.3: one level per transaction). The batch-level rows of the shared edges are stripped
//   through removeEdges' engine (`rewriteRows`, §3.4 *The doors*: the removal door), so rule 3 follows — an edge left
//   with a finer row stays as that finer level's edge, a vertex left with no edge goes, a split vertex dissolves and the
//   edge it split is restored exactly — and the merged face keeps the record of the two with the smaller canonical key
//   (C-0185 (3)), which is why `mergeFaces ∘ splitFace` restores the ring and the id (§13.1). Where the merged region
//   keeps no edge of the batch's level it is its parent's own child again and keeps no record (§2.2 rule 2): the
//   result is −1, as a split of an own child restored by the merge (C-0192).
// * absorbSliver(tx, face, floor) leaves a face at or above both floors alone. A face below one (width by the batch's
//   width measure, area exact — never `minEdge`) merges into the neighbour across its longest shared boundary whose
//   edges carry only partition roles of the batch's level; with no such neighbour no edge is deleted and the face stays,
//   of kind `residue`, owned by the neighbour across its longest boundary (W_SLIVER_RETYPED). A structural edge is
//   never deleted.
import {
  faceKey,
  faceWalk,
  idOf,
  isFaceLive,
  roleInfo,
  rowsOn,
  type FaceId,
  type HalfEdgeId,
  type Plat,
} from '../arena/index.js';
import { warn } from '../insert/classes.js';
import { TX_FACES_WALKED } from '../insert/index.js';
import { err, ok, type KernelResult, type Warning } from '../num/index.js';
import { recordLeftOf, rewriteRows } from '../tx/relevel.js';
import { setOwner } from '../tx/writers.js';
import { chargeTx, check, noteRow, type OpenTx } from '../tx/state.js';
import type { Overlay } from '../tx/types.js';
import type { Cm, Level } from '../types/index.js';
import { compareFaceKeys, comparePairs, enter, faceArea2, faceWidth, lp, overLimit, pairLength, refuse } from './common.js';

/** The face kind a sliver retyped by absorbSliver takes (§3.6: "a face of kind `residue`"); 0 is an ordinary face (C-0192). */
export const FACE_KIND_RESIDUE = 1;

/** The edge pairs two faces of level n share (a half-edge of one whose twin bounds the other), ascending. */
function sharedPairs(p: Plat, n: Level, a: FaceId, b: FaceId): number[] {
  const inB = new Set<HalfEdgeId>(faceWalk(p, n, b).flat());
  const out = new Set<number>();
  for (const h of faceWalk(p, n, a).flat()) if (inB.has(h ^ 1)) out.add(h >> 1);
  return [...out].sort((x, y) => comparePairs(p, x, y));
}

/**
 * Whether the shared pairs may be deleted at the batch's level: null and the rows to strip (the batch-level rows), or the
 * refusal — E_STRUCTURAL for a structural row (§3.6), E_LEVEL for a row coarser than the batch (§3.3).
 */
function removable(p: Plat, n: Level, pairs: readonly number[]): { strip: number[] } | { code: 'E_STRUCTURAL' | 'E_LEVEL'; detail: string } {
  const strip: number[] = [];
  const R = p.roles;
  let coarser: string | null = null;
  for (const e of pairs) {
    for (const r of rowsOn(p, 'edge', 2 * e)) {
      const info = roleInfo(R.kind[r]);
      if (info.structural) return { code: 'E_STRUCTURAL', detail: `a shared edge carries the structural role ${info.name} (§3.6: never deleted by a merge)` };
      if (R.level[r] < n) coarser ??= `a shared edge carries an L${R.level[r]} ${info.name} row: an L${n} batch deletes none (§3.3)`;
      else if (R.level[r] === n) strip.push(r);
    }
  }
  if (coarser !== null) return { code: 'E_LEVEL', detail: coarser };
  return { strip };
}

/** Strips the shared pairs' batch-level rows (the removal door's engine) and returns the surviving record. */
function mergeAcross(t: OpenTx, a: FaceId, b: FaceId, strip: readonly number[]): KernelResult<FaceId> {
  const p = t.plat;
  const n = t.level;
  const R = p.roles;
  for (const r of strip) noteRow(t, R.kind[r], R.entity[r], R.ordinal[r]);
  for (const f of [a, b]) if (p.faces[n].owner[f] >= 0) t.log.owners.add(idOf(p, p.faces[n].owner[f]));
  if (!rewriteRows(t, { strip, add: [] })) return overLimit(t);
  const la = isFaceLive(p, n, a);
  const lb = isFaceLive(p, n, b);
  check(!(la && lb), 'a merge leaves at most one of its two records');
  // Neither: the merged region holds no edge of the batch's level, so it is its parent's own child again and keeps no
  // record (§2.2 rule 2; C-0185 (3)) — the result is −1 (C-0192).
  return ok(la ? a : lb ? b : -1);
}

/**
 * §3.4's `mergeFaces(tx, a, b)`: the faces a and b of the batch's level merged by deleting the edges they share. Refuses,
 * writing nothing: E_STRUCTURAL (a shared edge carries a structural role), E_LEVEL (a shared edge carries a row coarser
 * than the batch), E_DEGENERATE `empty` (the faces share no edge, or a and b are one face), E_WORK_LIMIT.
 */
export function mergeFaces(o: Overlay, a: FaceId, b: FaceId): KernelResult<FaceId> {
  const { t, refused } = enter<FaceId>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const n = t.level;
  check(isFaceLive(p, n, a) && isFaceLive(p, n, b), `mergeFaces takes two live face records of the batch's level L${n}`);
  if (a === b) return err('E_DEGENERATE', 'empty');
  if (!chargeTx(t, TX_FACES_WALKED, 2)) return overLimit(t);
  const pairs = sharedPairs(p, n, a, b);
  if (pairs.length === 0) return err('E_DEGENERATE', 'empty');
  const rule = removable(p, n, pairs);
  if ('code' in rule) return refuse(rule.code, rule.detail);
  if (t.work.total > t.workLimit) return overLimit(t);
  return mergeAcross(t, a, b, rule.strip);
}

/** One neighbour of a face across its boundary: the record, the shared pairs and their total length. */
interface Neighbour {
  readonly face: FaceId;
  readonly pairs: number[];
  readonly length: number;
}

/**
 * The face's neighbouring records at level n — faces sharing an edge with it across any of its rings, not a vertex
 * one-ring — longest shared boundary first, ties by key.
 */
function neighbours(t: OpenTx, f: FaceId): Neighbour[] {
  const p = t.plat;
  const n = t.level;
  const by = new Map<FaceId, Set<number>>();
  const own = new Set<HalfEdgeId>(faceWalk(p, n, f).flat());
  for (const h of own) {
    if (own.has(h ^ 1)) continue; // an antenna or a bridge of the face itself
    const g = recordLeftOf(t, n, h ^ 1);
    if (g < 0 || g === f) continue;
    const s = by.get(g) ?? new Set<number>();
    s.add(h >> 1);
    by.set(g, s);
  }
  const out: Neighbour[] = [];
  for (const [g, s] of by) {
    const pairs = [...s].sort((x, y) => comparePairs(p, x, y));
    let length = 0;
    for (const e of pairs) length += pairLength(p, e);
    out.push({ face: g, pairs, length });
  }
  out.sort((x, y) => (x.length !== y.length ? (x.length > y.length ? -1 : 1) : compareFaceKeys(p, n, x.face, y.face)));
  return out;
}

/**
 * §3.4's `absorbSliver(tx, face, floor)` (§3.6's sliver rule; see the module comment): the face itself when it is at or
 * above both floors, the merged face, or the sliver retyped `residue` (W_SLIVER_RETYPED). Refuses only E_WORK_LIMIT.
 */
export function absorbSliver(o: Overlay, face: FaceId, floor: { minWidthCm: Cm | number; minAreaCm2: number }): KernelResult<FaceId> {
  const { t, refused } = enter<FaceId>(o);
  if (refused !== null) return refused;
  const p = t.plat;
  const n = t.level;
  check(isFaceLive(p, n, face), `absorbSliver takes a live face record of the batch's level L${n}`);
  if (!chargeTx(t, TX_FACES_WALKED, 1)) return overLimit(t);
  const below = faceArea2(p, n, face) < 2 * floor.minAreaCm2 || faceWidth(t, n, face) < floor.minWidthCm;
  if (!below) return ok(face);
  const near = neighbours(t, face);
  if (t.work.total > t.workLimit) return overLimit(t);
  for (const g of near) {
    const rule = removable(p, n, g.pairs);
    if ('code' in rule || rule.strip.length === 0) continue;
    return mergeAcross(t, face, g.face, rule.strip);
  }
  // Residue: no edge deleted; the face takes kind `residue` and the owner across its longest boundary.
  const F = p.faces[n];
  const k = faceKey(p, n, face)[0];
  const at = lp(p.vertices.x[k], p.vertices.y[k]);
  const warnings: Warning[] = [];
  warn(t, warnings, 'W_SLIVER_RETYPED', at);
  if (F.owner[face] >= 0) t.log.owners.add(idOf(p, F.owner[face]));
  F.kind[face] = FACE_KIND_RESIDUE;
  t.log.faces[n].changed.push(face);
  if (near.length > 0 && F.owner[near[0].face] >= 0) {
    // The setOwner door: the owner, the batch's stage rank and the face's index item (§3.3).
    const r = setOwner(t, [face], idOf(p, F.owner[near[0].face]));
    if (!r.ok) return refuse(r.code, r.detail);
  }
  return ok(face, warnings);
}
