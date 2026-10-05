// §13.1 (2) *quantisation*: "half-centimetre ties before snapping and ± (2²³ − 1); values `snap` must refuse (± 2²³,
// NaN, ± ∞)" — the numeric core's door (§3.2 (1), (7)), every case run green here against M0-a-01 (C-0110). The raw
// doubles `snap` is fed are parameters (`params.raw`, a pair), never coordinates; the lattice point an accepted pair
// must become is the input's `points.expected`, so every coordinate the case yields is one `snap` accepts.
import { snap } from '@plat/kernel';
import { Draw, lp, m0Case, makeInput, RANGE_MAX } from '../draw.js';
import { GREEN, fail, refSnap, RANGE_BOUND } from '../numeric.js';
import type { ConstructiveCase, ConstructiveInput, ConstructiveVerdict } from '../types.js';

const SOURCE = '§13.1 quantisation';

/** A tie k + ½ whose rounding stays in range, or an integer, with its magnitude drawn by octave. */
function tieOrInt(d: Draw): number {
  const m = d.log(0, RANGE_MAX - 1);
  if (d.int(0, 3) === 0) return d.sign() * m; // an integer coordinate beside a tie
  // k + ½ for k ∈ [−(2²³ − 1), 2²³ − 2]: positive ties round up to k + 1 ≤ 2²³ − 1, negative ones down to k.
  return d.sign() > 0 ? m + 0.5 : -m - 0.5;
}

/** An accepted pair's input: the raw doubles and the reference's rounded point. */
function accepted(id: string, d: Draw, x: number, y: number): ConstructiveInput {
  const r = refSnap(x, y);
  if (!r.ok) throw new Error(`${id}: drew a pair snap refuses (${String(x)}, ${String(y)})`);
  return makeInput(id, d.seed, { points: { expected: lp(r.x, r.y, id) } }, { raw: [x, y] }, [
    { op: 'snap', args: { raw: 'raw', expected: 'expected' } },
  ]);
}

/** snap(raw) is ok and equals `points.expected`, coordinate by coordinate, never −0. */
function runAccepted(input: ConstructiveInput): ConstructiveVerdict {
  const [x, y] = input.params.raw as readonly number[];
  const e = input.points.expected;
  const r = refSnap(x, y);
  if (!r.ok || r.x !== e.x || r.y !== e.y) return fail(`the draw's expected point disagrees with the reference for (${String(x)}, ${String(y)})`);
  const s = snap(x, y);
  if (!s.ok) return fail(`snap(${String(x)}, ${String(y)}) refused ${s.code} ${s.detail}; expected (${String(e.x)}, ${String(e.y)})`);
  if (s.value.x !== e.x || s.value.y !== e.y) return fail(`snap(${String(x)}, ${String(y)}) = (${String(s.value.x)}, ${String(s.value.y)}); expected (${String(e.x)}, ${String(e.y)})`);
  if (Object.is(s.value.x, -0) || Object.is(s.value.y, -0)) return fail(`snap(${String(x)}, ${String(y)}) returned −0`);
  return GREEN;
}

/** snap(raw) refuses E_OUT_OF_RANGE naming `params.detail`, the reference's refused coordinate. */
function runRefused(input: ConstructiveInput): ConstructiveVerdict {
  const [x, y] = input.params.raw as readonly number[];
  const want = input.params.detail;
  const r = refSnap(x, y);
  if (r.ok || r.detail !== want) return fail(`the draw's detail ${String(want)} disagrees with the reference for (${String(x)}, ${String(y)})`);
  const s = snap(x, y);
  if (s.ok) return fail(`snap(${String(x)}, ${String(y)}) accepted (${String(s.value.x)}, ${String(s.value.y)}); expected E_OUT_OF_RANGE ${String(want)}`);
  if (s.code !== 'E_OUT_OF_RANGE' || s.detail !== want) return fail(`snap(${String(x)}, ${String(y)}) refused ${s.code} ${s.detail}; expected E_OUT_OF_RANGE ${String(want)}`);
  return GREEN;
}

/** A refused pair's input: the raw doubles and the refused coordinate. */
function refused(id: string, d: Draw, bad: () => number): ConstructiveInput {
  const good = d.sign() * d.log(0, RANGE_MAX);
  const where = d.int(0, 2); // 0: x refused, 1: y refused, 2: both (x named first)
  const x = where === 1 ? good : bad();
  const y = where === 0 ? good : bad();
  const r = refSnap(x, y);
  if (r.ok) throw new Error(`${id}: drew a pair snap accepts (${String(x)}, ${String(y)})`);
  return makeInput(id, d.seed, {}, { raw: [x, y], detail: r.detail }, [{ op: 'snap', args: { raw: 'raw' } }]);
}

/** The edge values that round to ±(2²³ − 1): the bound itself, a tie below it and fractions short of the next tie. */
const EDGE_OFFSETS: readonly number[] = Object.freeze([0, -0.5, 0.25, -0.25, 0.4375, -0.4999999]);

/** The magnitudes `snap` must refuse: 2²³, the half below it (C-0134 (1)), past 2³¹, and far past. */
function outOfRange(d: Draw): number {
  const kind = d.int(0, 4);
  const m =
    kind === 0
      ? RANGE_BOUND
      : kind === 1
        ? RANGE_BOUND - 0.5 + d.int(0, 1023) / 2048 // [2²³ − ½, 2²³): rounds to 2²³
        : kind === 2
          ? RANGE_BOUND + d.log(1, 2 ** 31) // beyond, up to 2³¹ + 2²³
          : kind === 3
            ? 2 ** 31 + d.int(0, 2 ** 20) // past an Int32's range, which would wrap (§3.2 (7))
            : 1e300;
  return d.sign() * m;
}

const NON_FINITE: readonly number[] = Object.freeze([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);

export const QUANTISATION_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'quant/half-ties',
    class: 'quantisation',
    source: SOURCE,
    ops: ['snap'],
    expect: {
      outcome: 'ok',
      holds: ['snap-half-away'],
      clause: 'half-centimetre ties before snapping',
    },
    build: (d) => {
      const m = d.log(0, RANGE_MAX - 1);
      const tie = d.sign() > 0 ? m + 0.5 : -m - 0.5;
      const other = tieOrInt(d);
      return d.bool() ? accepted('quant/half-ties', d, tie, other) : accepted('quant/half-ties', d, other, tie);
    },
    witness: (input) => {
      const [x, y] = input.params.raw as readonly number[];
      const tie = (v: number) => Math.abs(v) - Math.floor(Math.abs(v)) === 0.5;
      return tie(x) || tie(y) ? null : `neither coordinate of (${String(x)}, ${String(y)}) is a half-centimetre tie`;
    },
    run: runAccepted,
  }),
  m0Case({
    id: 'quant/range-edge',
    class: 'quantisation',
    source: SOURCE,
    ops: ['snap'],
    expect: { outcome: 'ok', holds: ['snap-exact', 'snap-half-away'], clause: '± (2²³ − 1)' },
    build: (d) => {
      const edge = () => d.sign() * (RANGE_MAX + d.pick(EDGE_OFFSETS));
      const which = d.int(0, 2);
      const x = which === 1 ? d.sign() * d.log(0, RANGE_MAX) : edge();
      const y = which === 0 ? d.sign() * d.log(0, RANGE_MAX) : edge();
      return accepted('quant/range-edge', d, x, y);
    },
    witness: (input) => {
      const e = input.points.expected;
      return Math.abs(e.x) === RANGE_MAX || Math.abs(e.y) === RANGE_MAX ? null : 'no coordinate snaps to ±(2²³ − 1)';
    },
    run: runAccepted,
  }),
  m0Case({
    id: 'quant/refuse-out-of-range',
    class: 'quantisation',
    source: SOURCE,
    ops: ['snap'],
    expect: {
      outcome: 'refused',
      code: 'E_OUT_OF_RANGE',
      holds: ['snap-refuses'],
      clause: 'values snap must refuse (± 2²³); §3.11 the caps: the range invariant (E_OUT_OF_RANGE, §3.2 (7))',
    },
    build: (d) => refused('quant/refuse-out-of-range', d, () => outOfRange(d)),
    run: runRefused,
  }),
  m0Case({
    id: 'quant/refuse-non-finite',
    class: 'quantisation',
    source: SOURCE,
    ops: ['snap'],
    expect: { outcome: 'refused', code: 'E_OUT_OF_RANGE', holds: ['snap-refuses'], clause: 'values snap must refuse (NaN, ± ∞)' },
    build: (d) => refused('quant/refuse-non-finite', d, () => d.pick(NON_FINITE)),
    run: runRefused,
  }),
]);
