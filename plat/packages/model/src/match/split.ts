// A split through an anchor (item M0-d-05b; §6.3 *Anchors and hysteresis*: "the child left of the directed cut keeps
// the id (§3.6 (5))"; §3.6 `splitFace` contact semantics (5): "the two children are returned in canonical order, the
// face left of the directed cut first, so an anchor lying exactly on the cut belongs to the left child"). The heir of a
// split entity is the first child, in the kernel's canonical order, whose closed area holds the old anchor point — so
// an anchor strictly inside one child goes to that child, and an anchor lying exactly on the cut, which both children
// hold, goes to the left one. The routine reads it through `MatchOptions.splits` (C-0188).
import type { PointCm, PolygonCm } from '../types/index.js';
import { checkPoint, coversPoint, prepareArea, type Area } from './geometry.js';

/** The index of the child that keeps the id: the first of `children` (left of the cut first) whose closed area holds `anchor`; −1 when none does. */
export function splitHeirOf(anchor: PointCm, children: readonly Area[]): number {
  for (let i = 0; i < children.length; i += 1) {
    if (coversPoint(children[i], anchor.x, anchor.y)) return i;
  }
  return -1;
}

/**
 * §3.6 (5)'s tie for a split entity: `children` are the split's faces as the kernel returns them (the face left of the
 * directed cut first). Returns the index of the child that keeps the id, or −1 when no child holds the anchor.
 * Refuses (RangeError) an anchor that is no lattice point and a child that is no area.
 */
export function splitHeir(anchor: PointCm, children: readonly PolygonCm[]): number {
  checkPoint(anchor, 'the split anchor');
  if (!Array.isArray(children)) throw new RangeError('match: the split children are not a list');
  return splitHeirOf(
    anchor,
    children.map((c, i) => prepareArea(c, `split child ${i}`)),
  );
}
