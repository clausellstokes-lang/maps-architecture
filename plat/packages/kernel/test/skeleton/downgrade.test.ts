// M0-a-11 (fix round 1, F-1): §3.8 *Post-condition validator* — "a failure of any of the four [checks], E_WORK_LIMIT, or
// an input the numeric contract refuses takes the reader's downgrade, reported W_DOWNGRADE … Never a crash, never a
// roof line outside its footprint and never unvalidated output" — on the validator's path: the engine finished (its
// wavefront collapsed, status ok) and its output fails the validator. Two inputs reach it: (a) a natural one, a
// 14-vertex rotated orthogonal ring whose finished skeleton has two arcs crossing (found by the checker of
// `checks/M0-a-11.md` in 5 532 rotated orthogonal outlines), and (b) the engine's finished output corrupted through the
// test hook `EngineHooks.finished` the way each of the four checks guards against, so the path stays covered whatever a
// later engine repair does to (a). Every reader takes its typed downgrade: `to` = DOWNGRADE_OF[use], the cause the
// validator with its check, the events that ran (> 0), exactly one W_DOWNGRADE warning, and the spine reader's
// injected axis (C-0171).
import { describe, expect, it } from 'vitest';
import type { RawArc, RawNode } from '../../src/skeleton/engine.js';
import { runSkeleton } from '../../src/skeleton/skeleton.js';
import { DOWNGRADE_OF, skeleton, validateSkeleton, type SkeletonUse, type ValidatorCheck } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

const USES: SkeletonUse[] = ['roof', 'spine', 'regions'];

/** The natural input: a rotated orthogonal outline the engine finishes with arcs 6 and 8 crossing. */
const CROSSING: LatticePoint[] = [
  [589, -2_802],
  [371, -2_924],
  [152, -3_046],
  [274, -3_264],
  [396, -3_482],
  [178, -3_604],
  [300, -3_823],
  [518, -3_701],
  [736, -3_579],
  [954, -3_457],
  [833, -3_239],
  [1_051, -3_117],
  [929, -2_899],
  [711, -3_020],
].map(([x, y]) => pt(x, y));

/** The L the corruptions start from: its bounding-box corner is the origin, so the engine's nodes are world nodes. */
const L = [pt(0, 0), pt(2_000, 0), pt(2_000, 500), pt(500, 500), pt(500, 2_000), pt(0, 2_000)];

/**
 * Runs `skeleton()` with the engine's `finished` hook (observing that the engine finished, then applying `corrupt`) and
 * checks the reader's typed downgrade on a validator failure; returns the check.
 */
function validatorDowngrade(rings: LatticePoint[][], use: SkeletonUse, corrupt: (nodes: RawNode[], arcs: RawArc[]) => void = () => undefined): ValidatorCheck {
  let finished = 0;
  const axisOf = (): string => 'axis';
  const r = runSkeleton(rings, use, { medialAxis: axisOf }, {
    finished: (nodes, arcs) => {
      finished += 1;
      corrupt(nodes, arcs);
    },
  });
  expect(finished).toBe(1); // the wavefront collapsed: status ok, no work limit, no stall
  expect(r.ok).toBe(true);
  if (!r.ok || r.value.kind !== 'downgrade') throw new Error(`expected a downgrade, got ${JSON.stringify(r).slice(0, 200)}`);
  const v = r.value;
  expect(v.use).toBe(use);
  expect(v.to).toBe(DOWNGRADE_OF[use]);
  expect(v.events).toBeGreaterThan(0);
  expect(v.axis).toBe(use === 'spine' ? 'axis' : undefined);
  expect(r.warnings).toEqual([{ code: 'W_DOWNGRADE', count: 1 }]);
  if (v.cause.code !== 'validator') throw new Error(`expected a validator cause, got ${JSON.stringify(v.cause)}`);
  expect(v.cause.detail.length).toBeGreaterThan(0);
  return v.cause.check;
}

/** The engine-relative node at (x, y), an interior one. */
function nodeAt(nodes: readonly RawNode[], x: number, y: number): number {
  const i = nodes.findIndex((q, j) => j >= L.length && Math.abs(q.x - x) < 1e-6 && Math.abs(q.y - y) < 1e-6);
  if (i < 0) throw new Error(`no node at ${x}, ${y}`);
  return i;
}

describe('a validator failure after the engine finished takes the reader’s downgrade, W_DOWNGRADE (§3.8)', () => {
  it('(a) the natural input: the finished skeleton’s crossing arcs are a planarity failure, never returned', () => {
    for (const use of USES) {
      expect(validatorDowngrade([CROSSING], use)).toBe('planarity');
      // the public call takes the same path
      const r = skeleton([CROSSING], use);
      expect(r.ok && r.value.kind === 'downgrade' && r.value.cause).toEqual({ code: 'validator', check: 'planarity', detail: 'arc 6 crosses arc 8' });
      expect(r.ok && r.value.kind === 'downgrade' && r.value.events).toBe(9);
    }
  });

  it('(b) each of the four checks, failed by the finished output corrupted, takes the downgrade for every reader', () => {
    const corruptions: [ValidatorCheck, (nodes: RawNode[], arcs: RawArc[]) => void][] = [
      // (1) a node moved out of the face: its arcs cross the input edge
      ['planarity', (nodes) => void (nodes[nodeAt(nodes, 1_750, 250)].y = -300)],
      // (2) an arc's faces swapped: a face on the wrong side
      ['faces', (_nodes, arcs) => void (arcs[0] = { ...arcs[0], left: arcs[0].right, right: arcs[0].left })],
      // (3) a node 2 cm off its time
      ['heights', (nodes) => void (nodes[nodeAt(nodes, 250, 1_750)].t += 2)],
      // (4) an interior node with no arc
      ['topology', (nodes) => void nodes.push({ x: 300, y: 300, t: 250 })],
    ];
    for (const [check, corrupt] of corruptions) for (const use of USES) expect(validatorDowngrade([L], use, corrupt)).toBe(check);
  });

  it('the hook unused, the same L validates: the downgrades above are the corruptions’, not the input’s', () => {
    let finished = 0;
    const r = runSkeleton([L], 'roof', {}, { finished: () => void (finished += 1) });
    expect(finished).toBe(1);
    if (!r.ok || r.value.kind !== 'skeleton') throw new Error('expected a skeleton');
    expect(validateSkeleton(r.value).ok).toBe(true);
    expect(r.warnings).toEqual([]);
  });

  it('the hook is called only when the wavefront collapsed: never on a contract refusal or at the work limit', () => {
    let finished = 0;
    const hooks = { finished: (): void => void (finished += 1) };
    runSkeleton([[pt(0, 0), pt(1_000, -42), pt(1_000, 42)]], 'roof', {}, hooks); // a 4.81° corner: refused
    runSkeleton([L], 'roof', {}, { ...hooks, skipResolution: () => true }); // every event left unresolved
    expect(finished).toBe(0);
  });
});
