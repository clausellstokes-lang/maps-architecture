// §13.1 (2) *expectations (§3.3 Expectations)*: "a batch whose `expect` carries a class floor its result breaks, under
// each `onFail` — reject (the version kept, the E_BELOW_MIN_WIDTH, E_BELOW_MIN_AREA or E_BELOW_MIN_ANGLE code returned
// to the stage's class), repair (a sliver below its width or area floor absorbed by absorbSliver, re-checked and the
// batch committed; a face below its angle floor still rejected after the repair) and downgrade (the version kept, the
// code returned for the ladder's simpler rung) — and a batch whose failed entry is not a class floor (E_INVARIANT)".
// Each draw is an L1 face and one cut whose child breaks exactly the floor the case names (`params.minWidthCm`,
// `minAreaCm2`, `minAngleCdeg` — the class floor the batch's `expect` carries); the cut is a partition edge
// (`plot_line`), so the repair may absorb across it. M0-a-06 and M0-a-07's, run by M0-k-04 (C-0110).
import { dmath } from '@plat/kernel';
import { ATTRACT, m0Case, makeInput, place, rect, step, type Draw } from '../draw.js';
import type { ConstructiveCase, ConstructiveExpect, ConstructiveInput } from '../types.js';

const SOURCE = '§3.3 Expectations';

type Floor = 'width' | 'area' | 'angle' | 'check';

/** The face, the cut and the floors under which exactly `floor` fails. */
function build(id: string, d: Draw, floor: Floor, onFail: 'reject' | 'repair' | 'downgrade'): ConstructiveInput {
  const W = d.int(4000, 40_000);
  const H = d.int(2000, 20_000);
  let cut: { x: number; y: number }[];
  const params: Record<string, number | string> = { onFail, minWidthCm: 1, minAreaCm2: 1, minAngleCdeg: 0 };
  if (floor === 'angle') {
    // A corner triangle (0, 0), (x2, 0), (0, y1) whose angle at (x2, 0) is atan(y1 / x2) ≤ 2.9°.
    const x2 = d.int(1200, W - 2 * ATTRACT);
    const y1 = d.int(2 * ATTRACT + 8, Math.floor(x2 / 20));
    cut = [{ x: 0, y: y1 }, { x: x2, y: 0 }];
    params.minAngleCdeg = d.int(300, 1000); // 3° – 10°, above the child's corner
    params.childCornerCdeg = Math.floor((dmath.atan(y1 / x2) * 18_000) / Math.PI);
  } else {
    const s = floor === 'width' ? d.int(2 * ATTRACT, 300) : d.int(300, Math.floor(W / 4));
    cut = [{ x: s, y: 0 }, { x: s, y: H }];
    if (floor === 'width') params.minWidthCm = s + d.int(1, 200);
    else if (floor === 'area') {
      params.minWidthCm = d.int(1, s);
      params.minAreaCm2 = s * H + d.int(1, 1_000_000);
      params.childAreaCm2 = s * H;
    } else {
      params.check = 'maxFaceCount';
      params.maxFaceCount = 1; // a §5.3 check of kind `check`, not a class floor: the split makes two faces
    }
    params.childWidthCm = s;
  }
  const placed = place(d, { rings: { face: rect(0, 0, W, H) }, chains: { cut } });
  return makeInput(id, d.seed, placed, params, [
    step('insertChain', { ring: 'face', level: 1, cls: 'mandatory', role: 'way' }),
    step('splitFace', { face: 'face', cut: 'cut', level: 2, role: 'plot_line', onFail, expect: floor === 'check' ? 'check' : 'classFloor' }),
  ]);
}

const rejected = (code: ConstructiveExpect['code'], tier: 1 | 4, clause: string): ConstructiveExpect => ({ outcome: 'refused', code, tier, holds: ['version-kept'], clause });

const CASES: readonly [string, Floor, 'reject' | 'repair' | 'downgrade', ConstructiveExpect][] = [
  ['expect/reject-min-width', 'width', 'reject', rejected('E_BELOW_MIN_WIDTH', 1, 'reject (tier 1): the version kept, E_BELOW_MIN_WIDTH returned to the stage’s class')],
  ['expect/reject-min-area', 'area', 'reject', rejected('E_BELOW_MIN_AREA', 1, 'reject (tier 1): the version kept, E_BELOW_MIN_AREA returned to the stage’s class')],
  ['expect/reject-min-angle', 'angle', 'reject', rejected('E_BELOW_MIN_ANGLE', 1, 'reject (tier 1): the version kept, E_BELOW_MIN_ANGLE returned to the stage’s class')],
  [
    'expect/repair-sliver-width',
    'width',
    'repair',
    { outcome: 'ok', tier: 2, holds: ['absorbed', 'hard-invariants'], clause: 'repair (tier 2): a sliver below its width floor absorbed by absorbSliver, re-checked and the batch committed' },
  ],
  [
    'expect/repair-sliver-area',
    'area',
    'repair',
    { outcome: 'ok', tier: 2, holds: ['absorbed', 'hard-invariants'], clause: 'repair (tier 2): a sliver below its area floor absorbed by absorbSliver, re-checked and the batch committed' },
  ],
  ['expect/repair-angle-rejected', 'angle', 'repair', rejected('E_BELOW_MIN_ANGLE', 1, 'repair: a face below its angle floor still rejected after the repair')],
  ['expect/downgrade', 'width', 'downgrade', rejected('E_BELOW_MIN_WIDTH', 4, "downgrade (tier 4): the version kept, the code returned for the ladder's simpler rung")],
  ['expect/non-floor-invariant', 'check', 'reject', rejected('E_INVARIANT', 1, 'a batch whose failed entry is not a class floor (E_INVARIANT)')],
];

export const EXPECTATION_CASES: readonly ConstructiveCase[] = Object.freeze(
  CASES.map(([id, floor, onFail, expect]) =>
    m0Case({
      id,
      class: 'expectations',
      source: SOURCE,
      ops: ['splitFace', 'tx', ...(onFail === 'repair' ? ['absorbSliver'] : [])],
      expect,
      build: (d) => build(id, d, floor, onFail),
      witness: (input) => {
        const p = input.params;
        if (floor === 'width') return (p.childWidthCm as number) < (p.minWidthCm as number) ? null : 'the child is not below its width floor';
        if (floor === 'area') {
          return (p.childWidthCm as number) >= (p.minWidthCm as number) && (p.childAreaCm2 as number) < (p.minAreaCm2 as number) ? null : 'the child does not break its area floor alone';
        }
        if (floor === 'angle') return (p.childCornerCdeg as number) < (p.minAngleCdeg as number) ? null : 'the child corner is not below its angle floor';
        return p.maxFaceCount === 1 ? null : 'the check would hold';
      },
    }),
  ),
);
