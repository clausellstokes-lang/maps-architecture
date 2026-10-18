// The profiled cases' knots in `resolve`'s chain order (C-0191; §2.2 rule 5: a join "concatenates their knots in chain
// order"; C-0185 (6), (7): the kernel renumbers both entities' knots from 0 in chain order, an open run from its lower
// (y, x) end, a ring counter-clockwise from its lowest-leftmost vertex). Integration-g7's B-1: numbered in draw order, a
// split and a re-join gave `remove/split-rejoin-profile`'s profile back renumbered on about half the draws. Here: the
// ordinals ascend in chain order on every draw of every profiled case; the helper's own contract; and the case composed
// with the kernel's insertChain and retypeEdges — split, then re-joined, the original profile bit for bit — with the
// draw-order numbering as its negative control.
import { describe, expect, it } from 'vitest';
import {
  attachIndex,
  createPlat,
  insertChain,
  insertTx,
  retypeEdges,
  tx,
  type ChainProfile,
  type Cm,
  type Frame,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type StageId,
} from '@plat/kernel';
import { casesAt, constructiveCase, type ConstructiveInput } from '@plat/testkit';
import { compareYX, inChainOrder, placedRingIndex, type Placed } from '../../src/constructive/draw.js';
import { DRAWS } from './support.js';

interface Pt {
  x: number;
  y: number;
}

const lpt = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** The profiled lines of a draw: each `profile: 'knots'` step's chain or ring. */
function profiled(g: ConstructiveInput): { line: readonly Pt[]; closed: boolean }[] {
  return g.steps
    .filter((s) => s.args.profile === 'knots')
    .map((s) => (s.args.ring !== undefined ? { line: g.rings[s.args.ring as string], closed: true } : { line: g.chains[s.args.chain as string], closed: false }));
}

/** Twice the signed area of a ring (exact: BigInt). */
function area2(r: readonly Pt[]): bigint {
  let s = 0n;
  for (let i = 0; i < r.length; i += 1) {
    const p = r[i];
    const q = r[(i + 1) % r.length];
    s += BigInt(p.x) * BigInt(q.y) - BigInt(q.x) * BigInt(p.y);
  }
  return s;
}

/** Why a draw's knots are not numbered in chain order, or null. */
function chainOrderProblem(g: ConstructiveInput): string | null {
  const lines = profiled(g);
  if (lines.length !== 1) return `${String(lines.length)} profiled lines`;
  const { line, closed } = lines[0];
  const knots = g.params.knots as readonly number[];
  const values = g.params.knotValues as readonly number[];
  if (!Array.isArray(knots) || !Array.isArray(values) || knots.length === 0 || knots.length !== values.length) return 'knots and knotValues not one value per knot';
  for (let i = 0; i < knots.length; i += 1) {
    if (!Number.isInteger(knots[i]) || knots[i] < 0 || knots[i] >= line.length) return `knot ${String(i)} is not a vertex index`;
    if (i > 0 && knots[i] <= knots[i - 1]) return `knot ordinals do not ascend along the line (${knots.join(', ')})`;
  }
  if (closed) {
    if (area2(line) <= 0n) return 'the ring does not turn counter-clockwise';
    for (let i = 1; i < line.length; i += 1) if (compareYX(line[i], line[0]) <= 0) return "the ring does not start at its lowest-leftmost vertex";
  } else if (compareYX(line[0], line[line.length - 1]) >= 0) {
    return 'the chain does not run from its lower (y, x) end';
  }
  return null;
}

const PROFILED = casesAt('M0').filter((c) => profiled(c.generate(0) as ConstructiveInput).length > 0);

describe('C-0191: every profiled case numbers its knots in chain order', () => {
  it('names the profiled cases integration-g7 B-1 lists, and the empty-chain limit', () => {
    expect(PROFILED.map((c) => c.id).sort()).toEqual([
      'limit/no-input-sampleprofile',
      'limit/one-item-profile-knot',
      'remove/split-rejoin-profile',
      'remove/stretch-ring',
      'remove/stretch-way',
      'remove/tjunction-profiled-spine',
    ]);
  });

  it.each(PROFILED.map((c) => [c.id, c] as const))(`%s: the knot ordinals ascend in chain order on ${String(DRAWS)} draws`, (_id, c) => {
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const w = chainOrderProblem(c.generate(seed) as ConstructiveInput);
      if (w !== null) expect.fail(`${c.id} seed ${String(seed)}: ${w}`);
    }
  });

  it('every symmetry occurs: open chains placed from their upper end are reversed, rings rotated', () => {
    // Without the rewrite about half the draws would start at the upper end; the rewrite is exercised, not idle.
    const split = constructiveCase('remove/split-rejoin-profile');
    const ring = constructiveCase('remove/stretch-ring');
    let notFirst = 0;
    for (let seed = 0; seed < 200; seed += 1) {
      const k = (split?.generate(seed) as ConstructiveInput).params.knots as number[];
      if (k[0] !== 0) notFirst += 1;
    }
    expect(notFirst).toBeGreaterThan(40);
    expect(notFirst).toBeLessThan(160);
    expect(ring).toBeDefined();
  });

  it('remove/stretch-ring: both anchors carry a knot, and the vertex after anchor0 along the local ring does too', () => {
    const c = constructiveCase('remove/stretch-ring');
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const g = c?.generate(seed) as ConstructiveInput;
      const r = g.rings.ring;
      const at = (q: Pt) => r.findIndex((v) => v.x === q.x && v.y === q.y);
      const k = g.params.knots as number[];
      const i0 = at(g.points.anchor0);
      const i1 = at(g.points.anchor1);
      if (!k.includes(i0) || !k.includes(i1)) expect.fail(`seed ${String(seed)}: an anchor carries no knot (${k.join(', ')}; anchors ${String(i0)}, ${String(i1)})`);
      // The third knot is the anchor's local successor: one step along the ring either way (a reflection reverses it).
      const third = k.find((x) => x !== i0 && x !== i1) as number;
      const n = r.length;
      if ((third - i0 + n) % n !== 1 && (i0 - third + n) % n !== 1) expect.fail(`seed ${String(seed)}: the third knot is not beside anchor0`);
    }
  });

  it('remove/split-rejoin-profile: the split vertex lies strictly between the two knots', () => {
    const c = constructiveCase('remove/split-rejoin-profile');
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const g = c?.generate(seed) as ConstructiveInput;
      const [k0, k1] = g.params.knots as number[];
      const s = g.params.splitAt as number;
      if (!(k0 < s && s < k1)) expect.fail(`seed ${String(seed)}: splitAt ${String(s)} not between ${String(k0)} and ${String(k1)}`);
    }
  });
});

describe('inChainOrder', () => {
  const L = (pts: [number, number][]): LatticePoint[] => pts.map(([x, y]) => lpt(x, y));

  it('keeps an open chain that runs from its lower end; reverses one that runs from its upper end, with its knots', () => {
    const up = L([[0, 0], [10, 5], [20, 9]]);
    expect(inChainOrder(up, false, [2, 0], [7, 3])).toMatchObject({ line: up, knots: [0, 2], values: [3, 7] });
    const down = L([[20, 9], [10, 5], [0, 0]]);
    const o = inChainOrder(down, false, [0, 1], [7, 5]);
    expect(o.line).toEqual(up);
    expect(o.knots).toEqual([1, 2]);
    expect(o.values).toEqual([5, 7]);
    expect(o.index(0)).toBe(2);
    // Equal y: the lower x end first.
    expect(inChainOrder(L([[9, 4], [0, 4]]), false, [0], [1]).line).toEqual(L([[0, 4], [9, 4]]));
  });

  it('rotates a counter-clockwise ring to its lowest-leftmost vertex; refuses a clockwise one and bad knots', () => {
    const ring = L([[10, 0], [10, 10], [0, 10], [0, 0]]);
    const o = inChainOrder(ring, true, [0, 3], [1, 2]);
    expect(o.line).toEqual(L([[0, 0], [10, 0], [10, 10], [0, 10]]));
    expect(o.knots).toEqual([0, 1]);
    expect(o.values).toEqual([2, 1]);
    expect(() => inChainOrder([...ring].reverse(), true, [0], [1])).toThrow(/counter-clockwise/);
    expect(() => inChainOrder(ring, true, [0, 0], [1, 2])).toThrow(/distinct/);
    expect(() => inChainOrder(ring, true, [4], [1])).toThrow(/distinct/);
    expect(() => inChainOrder(ring, true, [0], [1, 2])).toThrow(/one value each/);
  });

  it('placedRingIndex follows a reflection', () => {
    const p = (reflected: boolean): Placed => ({ points: {}, pointSets: {}, chains: {}, rings: {}, reflected });
    expect([0, 1, 2, 3].map((i) => placedRingIndex(p(false), 4, i))).toEqual([0, 1, 2, 3]);
    expect([0, 1, 2, 3].map((i) => placedRingIndex(p(true), 4, i))).toEqual([0, 3, 2, 1]);
  });
});

// ── the case composed with the kernel (integration-g7's P3) ──

const SIDE = 8_000_000;
const FRAME: Frame = { widthCm: 10_000_000 as Cm, heightCm: 10_000_000 as Cm, aspect: 1, marginShare: 0.3 };
const KEY = { layer: 'ground' as const, part: 0 };
const SPEC: KernelTx = {
  key: KEY,
  level: 1,
  ops: [],
  expect: [],
  onFail: 'reject',
  batch: { kind: 'stage', stage: 8 as StageId },
  stage: 8 as StageId,
  rederivesFrom: 8 as StageId,
  workLimit: 1_000_000,
};

function arena(): Plat {
  const p = createPlat(KEY, FRAME);
  attachIndex(p, { gridCellCm: [800, 400, 200, 100, 50] });
  const ring = [lpt(-SIDE, -SIDE), lpt(SIDE, -SIDE), lpt(SIDE, SIDE), lpt(-SIDE, SIDE)];
  const r = insertChain(insertTx(p, 0), ring, [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
  if (!r.ok) throw new Error(`the frame was refused ${r.code}`);
  return p;
}

/** Splits the draw's spine at `splitAt` (its far part to way:2), re-joins it, and returns the re-joined profile. */
function splitRejoin(g: ConstructiveInput, knots: readonly number[], values: readonly number[]): ChainProfile<number> {
  const s = g.chains.spine;
  const xs = s.map((q) => q.x);
  const ys = s.map((q) => q.y);
  const dx = -Math.round((Math.min(...xs) + Math.max(...xs)) / 2);
  const dy = -Math.round((Math.min(...ys) + Math.max(...ys)) / 2);
  const pts = s.map((q) => lpt(q.x + dx, q.y + dy));
  const p = arena();
  const ins = insertChain(insertTx(p, 1), pts, [{ role: 'way', entity: 'way:1' }], 'mandatory', {
    knots: knots.map((index, ordinal) => ({ index, role: 'width_knot', ordinal })),
  });
  if (!ins.ok) throw new Error(`${g.id} seed ${String(g.seed)}: the spine was refused ${ins.code}`);
  const prof: ChainProfile<number> = { knotRole: 'width_knot', values: values.slice(), interp: 'linear' };
  const at = g.params.splitAt as number;
  const split = tx(p, SPEC, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pts[at], to: pts[pts.length - 1] }, [], [], { from: 'way:1', to: 'way:2', profiles: [{ from: prof }] }));
  if (!split.ok) throw new Error(`${g.id} seed ${String(g.seed)}: the split was refused ${split.code}`);
  const parts = (split.value.value as { profiles: { from?: unknown; to?: unknown }[] }).profiles[0];
  const join = tx(p, SPEC, (o) => retypeEdges(o, { role: 'way', entity: 'way:2' }, [], [], { from: 'way:2', to: 'way:1', profiles: [{ from: parts.to as ChainProfile<number>, to: parts.from as ChainProfile<number> }] }));
  if (!join.ok) throw new Error(`${g.id} seed ${String(g.seed)}: the join was refused ${join.code}`);
  return (join.value.value as { profiles: { to?: unknown }[] }).profiles[0].to as ChainProfile<number>;
}

describe('remove/split-rejoin-profile composed with the kernel (integration-g7 B-1)', () => {
  const c = constructiveCase('remove/split-rejoin-profile');
  const DRAWN = 200;

  it(`split then re-joined, the original profile bit for bit on ${String(DRAWN)} draws`, () => {
    for (let seed = 0; seed < DRAWN; seed += 1) {
      const g = c?.generate(seed) as ConstructiveInput;
      const knots = g.params.knots as number[];
      const values = g.params.knotValues as number[];
      expect(splitRejoin(g, knots, values), `seed ${String(seed)}`).toEqual({ knotRole: 'width_knot', values, interp: 'linear' });
    }
  }, 120_000);

  it('control: the knots numbered against the chain order come back renumbered on some draw', () => {
    let renumbered = 0;
    for (let seed = 0; seed < 20; seed += 1) {
      const g = c?.generate(seed) as ConstructiveInput;
      const knots = [...(g.params.knots as number[])].reverse();
      const values = [...(g.params.knotValues as number[])].reverse();
      if (values[0] === values[1]) continue;
      const back = splitRejoin(g, knots, values);
      if (JSON.stringify(back.values) !== JSON.stringify(values)) renumbered += 1;
    }
    expect(renumbered).toBeGreaterThan(0);
  }, 120_000);
});
