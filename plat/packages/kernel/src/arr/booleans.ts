// booleans(op, a, b, fill) (§3.4; §3.7 *Decision*; §3.11 *no input*). M0-a-08.
//
// The operands' rings overlaid on the scratch arrangement (`winding.ts`), every face labelled with both operands'
// winding numbers, the faces the operation selects kept under the fill rule declared for the call — `nonzero`: inside
// where the operand's winding number is not 0; `evenodd`: where it is odd — and the edges between two kept faces
// removed. The result is the kept region's rings: outer rings counter-clockwise, holes clockwise, integer in and integer
// out, every output edge an edge the insertion rules produced. An empty result is `E_DEGENERATE` (`empty`); a coordinate
// off the lattice `E_OUT_OF_RANGE`. The warnings are the overlay insertions' — what §3.7's split reads; an empty
// result's refusal carries them too (`EmptyResult`, C-0196 (4)).
import { ok, type KernelResult } from '../num/index.js';
import { emptyResult, overlayRegion, type Ring } from './winding.js';

/** §3.4's operations. */
export type BooleanOp = 'union' | 'intersection' | 'difference' | 'xor';

/** §3.4's fill rules, declared per call (§3.7). */
export type FillRule = 'nonzero' | 'evenodd';

/** Is a winding number inside under the fill rule? */
export function insideBy(fill: FillRule, w: number): boolean {
  return fill === 'nonzero' ? w !== 0 : (w & 1) !== 0;
}

/** Does the operation keep a face inside `inA` and `inB`? */
export function keeps(op: BooleanOp, inA: boolean, inB: boolean): boolean {
  switch (op) {
    case 'union':
      return inA || inB;
    case 'intersection':
      return inA && inB;
    case 'difference':
      return inA && !inB;
    case 'xor':
      return inA !== inB;
  }
}

/** §3.4's `booleans`: `a op b` under the fill rule, as rings; an empty result E_DEGENERATE `empty` (§3.7, §3.11). */
export function booleans(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): KernelResult<Ring[]> {
  if (op !== 'union' && op !== 'intersection' && op !== 'difference' && op !== 'xor') throw new RangeError(`booleans: unknown operation ${String(op)}`);
  if (fill !== 'nonzero' && fill !== 'evenodd') throw new RangeError(`booleans: unknown fill rule ${String(fill)}`);
  const r = overlayRegion([a, b], (w) => keeps(op, insideBy(fill, w[0]), insideBy(fill, w[1])));
  if (!r.ok) return r;
  if (r.value.length === 0) return emptyResult(r.warnings);
  return ok(r.value, r.warnings);
}
