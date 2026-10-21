// skeleton(rings, use): §3.4's service, §3.8's construction (M0-a-11). The rings are the outer ring first and its
// holes after it, lattice points in either orientation. An off-lattice coordinate is the caller's bug (E_OUT_OF_RANGE,
// as every geometry service refuses it). Every other outcome is ok: the validated skeleton, or — when the numeric
// contract refuses the rings (without running), the queue reaches its work law (E_WORK_LIMIT), or the validator fails
// the output — the reader's typed downgrade, reported W_DOWNGRADE (§3.8, §5.2 F-SKELETON). Never a crash, never
// unvalidated output; nothing stored.
import { offLattice } from '../geom/common.js';
import { ok, type KernelResult } from '../num/index.js';
import type { Cm, Polygon } from '../types/index.js';
import { coalesce, type RawGraph } from './coalesce.js';
import { buildLines, runEngine, skeletonEventLimit, type EngineHooks } from './engine.js';
import { prepareRings } from './prepare.js';
import type {
  DowngradePath,
  Skeleton,
  SkeletonDowngrade,
  SkeletonFailure,
  SkeletonGraph,
  SkeletonOptions,
  SkeletonUse,
} from './types.js';
import { validateSkeleton } from './validate.js';

/** Each reader's downgrade (§3.8). */
export const DOWNGRADE_OF: Readonly<Record<SkeletonUse, DowngradePath>> = Object.freeze({
  roof: 'plainRoof',
  spine: 'medialAxis',
  regions: 'reflexPreCut',
});

function downgrade<A>(
  rings: readonly Polygon[],
  use: SkeletonUse,
  cause: SkeletonFailure,
  events: number,
  opts: SkeletonOptions<A>,
): KernelResult<Skeleton<A>> {
  const value: SkeletonDowngrade<A> = { kind: 'downgrade', use, to: DOWNGRADE_OF[use], cause, events };
  if (use === 'spine' && opts.medialAxis !== undefined) value.axis = opts.medialAxis(rings);
  const at = cause.code === 'contract' ? cause.at : undefined;
  return ok(value, [at === undefined ? { code: 'W_DOWNGRADE', count: 1 } : { code: 'W_DOWNGRADE', count: 1, at }]);
}

/**
 * The service with the engine's test hook (the work-limit test's fault injection); `skeleton` is this without hooks.
 */
export function runSkeleton<A = unknown>(
  rings: readonly Polygon[],
  use: SkeletonUse,
  opts: SkeletonOptions<A> = {},
  hooks: EngineHooks = {},
): KernelResult<Skeleton<A>> {
  for (const ring of rings) {
    const bad = offLattice<Skeleton<A>>(ring);
    if (bad !== null) return bad;
  }
  const prep = prepareRings(rings);
  if (!prep.ok) {
    const cause: SkeletonFailure = prep.at === undefined ? { code: 'contract', refusal: prep.refusal } : { code: 'contract', refusal: prep.refusal, at: prep.at };
    return downgrade(rings, use, cause, 0, opts);
  }
  const { rings: clean, edges, n, r } = prep.value;
  let ox = clean[0][0].x as number;
  let oy = clean[0][0].y as number;
  for (const ring of clean) {
    for (const p of ring) {
      if (p.x < ox) ox = p.x;
      if (p.y < oy) oy = p.y;
    }
  }
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  const ringStart = new Int32Array(clean.length + 1);
  let i = 0;
  for (let k = 0; k < clean.length; k += 1) {
    ringStart[k] = i;
    for (const p of clean[k]) {
      xs[i] = p.x - ox;
      ys[i] = p.y - oy;
      i += 1;
    }
  }
  ringStart[clean.length] = i;
  const floor = skeletonEventLimit(n, r);
  const asked = opts.maxEvents;
  const limit = asked !== undefined && Number.isInteger(asked) && asked > floor ? asked : floor;
  const input = { xs, ys, ringStart };
  const run = runEngine(input, limit, hooks);
  if (run.status === 'workLimit') return downgrade(rings, use, { code: 'E_WORK_LIMIT', count: run.events, limit }, run.events, opts);
  const graphOf = (g: RawGraph): SkeletonGraph => ({
    kind: 'skeleton',
    use,
    rings: clean.map((ring) => ring.map((p) => ({ x: p.x as Cm, y: p.y as Cm }))),
    edges,
    nodes: g.nodes.map((q, j) => (j < n ? { x: q.x + ox, y: q.y + oy, t: 0 } : { x: q.x + ox, y: q.y + oy, t: q.t })),
    arcs: g.arcs,
    faces: [],
    events: run.events,
  });
  // §3.8's coalescing first (C-0168 (4)); the engine's own graph when the coalesced one does not validate
  const raw: RawGraph = { nodes: run.nodes, arcs: run.arcs };
  const merged = run.status === 'ok' ? coalesce(raw, n, buildLines(input)) : null;
  let first: SkeletonFailure | null = null;
  for (const g of merged === null ? [raw] : [merged, raw]) {
    const graph = graphOf(g);
    const verdict = validateSkeleton(graph);
    if (!verdict.ok) {
      first ??= { code: 'validator', check: verdict.check, detail: verdict.detail };
      continue;
    }
    if (run.status !== 'ok') {
      first ??= { code: 'validator', check: 'topology', detail: `the wavefront ${run.status} before it collapsed` };
      continue;
    }
    graph.faces = verdict.faces;
    return ok(graph);
  }
  return downgrade(rings, use, first ?? { code: 'validator', check: 'topology', detail: 'no output' }, run.events, opts);
}

/**
 * §3.4's `skeleton(rings, use)`: the validated straight skeleton of the face the rings bound (`rings[0]` the outer
 * ring, the rest its holes) or `use`'s typed downgrade, W_DOWNGRADE. `opts.medialAxis` injects the `spine` reader's
 * sampled medial axis (M0-a-12's); `opts.maxEvents` a table law above §3.8's floor.
 */
export function skeleton<A = unknown>(rings: readonly Polygon[], use: SkeletonUse, opts: SkeletonOptions<A> = {}): KernelResult<Skeleton<A>> {
  return runSkeleton(rings, use, opts);
}
