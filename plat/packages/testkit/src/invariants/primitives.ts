// The B-FUZZ primitives (M0-k-04; §13.1's bar over "every kernel primitive", §13.8's ≈ 20 primitives, §3.4's complete
// list): one entry per kernel operation the runner fuzzes, each with its input family — M0-k-01's arbitraries (`arb`) —
// and its run: the operation through the façade (writers inside `kernel.tx` with M0-a-14's suite), the typed-result
// check (a throw is a crash; a refusal must be a §3.1 code), and the properties §13.1 states for it, checked on the
// result: the whole-arena sweep (`checkCI`: every hard §3.10 row, the Euler characteristic) after every writer, remove ∘
// insert ≡ id, the split's integer area2 tiling and merge ∘ split, the skeleton validator and no roof line outside, OBB
// containing the hull, LIR inside the face, the inset's monotone emptying, and the oracle comparison (M0-k-03) for
// booleans, buffers and tileRings, split by attraction (§3.7). Readings: C-0227.
import fc from 'fast-check';
import {
  area2,
  area2Big,
  buffer,
  delaunay,
  encodeArena,
  decodeArena,
  H128,
  hexLattice,
  hull,
  lir,
  obb,
  orient,
  regularFit,
  removeEdges,
  sampleBoundary,
  sideRuns,
  simplify,
  skeleton,
  snap,
  Stream,
  tileRings,
  utf8Bytes,
  validateSkeleton,
  booleans,
  faceRings,
  faceWalk,
  insertChain,
  isFaceLive,
  pointLocate,
  type Cm,
  type FaceId,
  type KernelResult,
  type LatticePoint,
  type Level,
  type Overlay,
  type Plat,
  type Polygon,
  type SpineWidths,
  type Warning,
} from '@plat/kernel';
import { arb } from '../fuzz/index.js';
import type { FuzzField } from '../fuzz/field.js';
import { compareSplit, oracleBoolean, oracleBuffer, ORACLE_ENGINES, type OracleEngine, type Verdict } from '../oracles/index.js';
import { clipper2Loaded } from '../oracles/clipper2.js';
import { isLatticeRing, ringProblems } from '../oracles/rings.js';
import { arenaPrint, determinismPoint, fixtureSpec, permutationCompare, runTwiceCompare, type DeterminismSequence } from '../determinism/index.js';
import { area2Exact, boxOf, ciProblems, cross, framedAround, inRegionApprox, inRing, interiorPoint, kernelOn, lpt, RANGE, RUNNER_KEY, spec } from './support.js';
import type { BugEntry, WorkUnit } from './types.js';

/** One operation's outcome on one input, as the runner classifies it. */
export interface OpOutcome {
  /** The operation's result: ok, or the §3.1 code it returned. */
  readonly code: 'ok' | string;
  /** Invalid output: one line per broken property (empty when valid). */
  readonly problems: readonly string[];
  readonly warnings: readonly Warning[];
  /** A typed downgrade (W_DOWNGRADE). */
  readonly downgrade?: boolean;
  /** Work charged per counter, with the unit count the law divides by. */
  readonly work?: readonly { readonly counter: string; readonly charged: number; readonly units: number }[];
  /** A bug abort (§5.1 (8)). */
  readonly bug?: BugEntry;
  /** §3.7's split, for the oracle-compared primitives; `refused` when no oracle could judge it. */
  readonly split?: 'attracted' | 'unattracted' | 'refused';
  /** The sampled determinism harness ran on this input. */
  readonly sampled?: 'renumbering' | 'permutation';
  /** The input never reached the operation (no room for a frame, a degenerate set-up ring): counted apart. */
  readonly skipped?: boolean;
  /**
   * Counted findings that judge no output (C-0227 (4)): a follow-up operation a property needs that returned a typed
   * refusal — e.g. the removal of remove ∘ insert refused — by name; reported, never invalid (it fails safely).
   */
  readonly notes?: readonly string[];
}

/**
 * A planted fault (the runner's own tests, §13.1's bar "caught and counted"): an operation replaced, or a write made
 * behind the transaction's back after a commit — the runner's judges stay the real ones. Every judge of a primitive has
 * a plant that reaches it (C-0238 (3)).
 */
export interface Plant {
  /** Replaces `buffer` (an output the oracle comparison and the ring checks judge). */
  readonly buffer?: typeof buffer;
  /**
   * Runs on the arena after a writer's commit (`op`: insertChain, splitFace, warp, corridorUnion), before its judges —
   * a write the transaction never saw.
   */
  readonly afterCommit?: (op: string, p: Plat) => void;
  /** Runs on the arena after remove ∘ insert's removal commits (a write behind the removal). */
  readonly afterRemove?: (p: Plat) => void;
  /** Runs on the arena after mergeFaces ∘ splitFace's merge commits (a write behind the merge). */
  readonly afterMerge?: (p: Plat) => void;
  /**
   * Wraps a writer's transaction (`op`: insertChain, splitFace, mergeFaces, warp, corridorUnion): `commit` runs the real
   * one, and the result the runner judges is the wrapper's — a refusal planted without committing, or after it.
   */
  readonly tx?: (op: string, commit: () => KernelResult<unknown>) => KernelResult<unknown>;
  /**
   * Replaces a service's ok value before its judge reads it (`value` as the service returned it). The names: the pure
   * services by their own names; offsetFace, insetRing (its smaller distance), `insetRing@d2` (its larger), kerb;
   * `query` (the answer after the rebuild), `encodeArena` (the second save), tileRings.
   */
  readonly result?: (primitive: string, value: unknown) => unknown;
  /** Replaces a sampled determinism harness's report (M0-d-08) before its judge reads it. */
  readonly sampled?: (harness: 'renumbering' | 'permutation', report: SampledReport) => SampledReport;
}

/** The part of a sampled harness's report its judge reads. */
export interface SampledReport {
  readonly identical: boolean;
  readonly divergence: unknown;
}

/** A service's result with a planted value, if any (the runner's own tests). */
function planted<T>(ctx: OpContext, name: string, r: KernelResult<T>): KernelResult<T> {
  const f = ctx.plant?.result;
  return f === undefined || !r.ok ? r : { ok: true, value: f(name, r.value) as T, warnings: r.warnings };
}

/** The run context of one input: its index in the run (sampling and replay) and a planted fault, if any. */
export interface OpContext {
  readonly index: number;
  readonly plant?: Plant;
}

/** A fuzzed primitive. */
export interface Primitive<I = unknown> {
  /** §3.4's name of the operation (a writer, a service), or a composite's (`encodeArena`). */
  readonly name: string;
  /** The input family (seeds `seedFamily(family, chunk)`). */
  readonly family: string;
  /** Whether it needs the oracles loaded (`loadOracles()`, M0-k-03). */
  readonly oracles?: boolean;
  readonly arbitrary: () => fc.Arbitrary<I>;
  readonly run: (input: I, ctx: OpContext) => OpOutcome;
}

/** M0.md §2.2's units per kernel counter (C-0021): insertion's per vertex, the walks' per face, the halvings fixed. */
export const COUNTER_UNITS: Readonly<Record<string, WorkUnit>> = Object.freeze({
  'insert.points': 'vertices',
  'insert.attractQueries': 'vertices',
  'insert.placementCandidates': 'vertices',
  'insert.crossings': 'vertices',
  'tx.facesWalked': 'faces',
  'skeleton.events': 'vertices',
  'warp.halvings': 'fixed',
  'index.rebuilds': 'faces',
});

/** The unit of a counter (a counter outside M0.md §2.2's list counts per vertex). */
export function unitOf(counter: string): WorkUnit {
  return COUNTER_UNITS[counter] ?? 'vertices';
}

/** Every sampled-harness interval: one input in this many runs the renumbering and permutation harnesses (M0-d-08). */
export const SAMPLE_EVERY = 97;

const LIMIT = 1 << 20; // the fuzz shapes' coordinate bound: a framed arena around them fits the lattice
const SMALL = 1 << 16;

const ok = (warnings: readonly Warning[] = [], extra: Partial<OpOutcome> = {}): OpOutcome => ({ code: 'ok', problems: [], warnings, ...extra });
/** An input that never reached its operation (C-0227 (2)). */
const skip = (): OpOutcome => ({ code: 'ok', problems: [], warnings: [], skipped: true });
const refusedOf = (r: KernelResult<unknown>, problems: readonly string[] = []): OpOutcome => (r.ok ? ok(r.warnings) : { code: r.code, problems, warnings: [] });

/** The live faces of a level (the law's `faces` count). */
function liveFaces(p: Plat, level: Level): number {
  return p.slots.face[level].live;
}

/** The work an overlay charged, by counter, with its units. */
function workOf(o: Overlay, units: (counter: string) => number): { counter: string; charged: number; units: number }[] {
  const out: { counter: string; charged: number; units: number }[] = [];
  for (const [counter, charged] of o.work.counts) if (charged > 0) out.push({ counter, charged, units: Math.max(1, units(counter)) });
  return out.sort((a, b) => (a.counter < b.counter ? -1 : a.counter > b.counter ? 1 : 0));
}

/** The slot-free print of an arena without its version line (remove ∘ insert compares topology, not versions). */
function topology(p: Plat): string {
  const s = arenaPrint(p);
  const i = s.lastIndexOf('\n#version');
  return i < 0 ? s : s.slice(0, i);
}

/** A ring set's problems as an output (simple, non-degenerate, no edge below minEdge, lattice points). */
function outputProblems(rings: readonly (readonly LatticePoint[])[]): string[] {
  if (!rings.every((r) => isLatticeRing(r))) return ['a ring point off the lattice'];
  return ringProblems(rings.map((r) => r.slice()));
}

// ---- input families ------------------------------------------------------------------------------------------------

const ringArb = (limitCm = LIMIT): fc.Arbitrary<LatticePoint[]> =>
  fc.oneof(
    { weight: 4, arbitrary: arb.polygon({ limitCm }) },
    { weight: 2, arbitrary: arb.thin({ limitCm }) },
    { weight: 2, arbitrary: arb.nearCollinear({ limitCm }) },
    { weight: 2, arbitrary: arb.selfTouching({ limitCm }) },
    { weight: 2, arbitrary: arb.regularSnapped({ limitCm }) },
    { weight: 1, arbitrary: arb.zeroArea({ limitCm }) },
    { weight: 1, arbitrary: arb.duplicated({ limitCm }) },
  );

const simpleRingArb = (limitCm = LIMIT): fc.Arbitrary<LatticePoint[]> =>
  fc.oneof({ weight: 3, arbitrary: arb.polygon({ limitCm }) }, { weight: 1, arbitrary: arb.regularSnapped({ limitCm }) }, { weight: 1, arbitrary: arb.thin({ limitCm }) });

const chainArb = (limitCm = LIMIT): fc.Arbitrary<LatticePoint[]> =>
  fc.oneof(
    { weight: 3, arbitrary: arb.chain({ limitCm }) },
    { weight: 1, arbitrary: arb.stroke({ limitCm }) },
    { weight: 1, arbitrary: arb.nearCollinear({ limitCm, shape: 'chain' }) },
    { weight: 1, arbitrary: arb.selfTouching({ limitCm, shape: 'chain' }) },
    { weight: 1, arbitrary: arb.duplicated({ limitCm, shape: 'chain' }) },
  );

/** Two shapes of one family moved to share a centre (so a boolean or a clip has something to cut). */
function overlapping(a: readonly LatticePoint[], b: readonly LatticePoint[], dx: number, dy: number): [LatticePoint[], LatticePoint[]] {
  const ba = boxOf(a) as number[];
  const bb = boxOf(b) as number[];
  const cx = Math.round((ba[0] + ba[2]) / 2 - (bb[0] + bb[2]) / 2) + dx;
  const cy = Math.round((ba[1] + ba[3]) / 2 - (bb[1] + bb[3]) / 2) + dy;
  return [a.slice(), b.map((q) => lpt(Math.max(-RANGE, Math.min(RANGE, q.x + cx)), Math.max(-RANGE, Math.min(RANGE, q.y + cy))))];
}

/** A counter-clockwise copy of a ring. */
function ccw(r: readonly LatticePoint[]): LatticePoint[] {
  return area2Exact(r) < 0n ? r.slice().reverse() : r.slice();
}

// ---- the arena writers ----------------------------------------------------------------------------------------------

/** A writer's transaction through the plant's `tx` wrapper, if any (the runner's own tests). */
function planTx<R extends KernelResult<unknown>>(ctx: OpContext | undefined, op: string, commit: () => R): R {
  const f = ctx?.plant?.tx;
  return f === undefined ? commit() : (f(op, commit) as R);
}

/** One writer batch on a fresh façade over `p`: the result and the overlay's work. */
function writer<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>, units: (counter: string) => number, opts: { spineWidths?: SpineWidths; ctx?: OpContext; op?: string } = {}) {
  const k = kernelOn([p], opts.spineWidths === undefined ? {} : { spineWidths: opts.spineWidths });
  let work: { counter: string; charged: number; units: number }[] = [];
  const r = planTx(opts.ctx, opts.op ?? '', () =>
    k.tx(spec(level), (o) => {
      const v = fn(o);
      work = workOf(o, units);
      return v;
    }),
  );
  if (r.ok) opts.ctx?.plant?.afterCommit?.(opts.op ?? '', p);
  return { r, work };
}

/** A sampled harness's report through the plant's `sampled`, if any. */
function sampledOf(ctx: OpContext, harness: 'renumbering' | 'permutation', report: SampledReport): SampledReport {
  const f = ctx.plant?.sampled;
  return f === undefined ? report : f(harness, report);
}

/** The L1 face a lattice point lies in (null outside every L1 face). */
function faceAt(p: Plat, level: Level, q: LatticePoint): FaceId | null {
  const loc = pointLocate(p, p.key, level, q);
  return loc.on === 'face' && loc.level === level ? loc.face : null;
}

interface InsertInput {
  readonly face: LatticePoint[];
  readonly chain: LatticePoint[];
  readonly closed: boolean;
  readonly level: 1 | 2 | 3;
  readonly cls: 'mandatory' | 'optional';
}

const insertChainPrimitive: Primitive<InsertInput> = {
  name: 'insertChain',
  family: 'bfuzz/insertChain',
  arbitrary: () =>
    fc.record({
      face: simpleRingArb(SMALL),
      chain: chainArb(SMALL),
      ring: ringArb(SMALL),
      closed: fc.boolean(),
      level: fc.constantFrom(1 as const, 2 as const, 3 as const),
      cls: fc.constantFrom('mandatory' as const, 'optional' as const),
    }).map(({ face, chain, ring, closed, level, cls }) => ({ face: ccw(face), chain: closed ? ring : chain, closed, level, cls })),
  run(input, ctx) {
    const p = framedAround([...input.face, ...input.chain]);
    if (p === null) return skip();
    const k0 = kernelOn([p]);
    const f = k0.tx(spec(1), (o) => k0.geom.insertChain(o, input.face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    if (!f.ok) return skip(); // the face itself refused (a degenerate draw)
    const before = topology(p);
    const role = input.level === 1 ? 'way' : input.level === 2 ? 'kerb' : 'plot_line';
    const entity = `${role}:fuzz`;
    const { r, work } = writer(p, input.level, (o) => k0.geom.insertChain(o, input.chain, [{ role, entity }], input.cls, input.closed ? { closed: true } : {}), () => input.chain.length, { ctx, op: 'insertChain' });
    const problems: string[] = [];
    if (!r.ok) {
      if (input.cls === 'mandatory' && r.code === 'E_OUT_OF_RANGE') {
        return { code: r.code, problems: [], warnings: [], bug: { cls: 'F-NUM', entity, key: `bfuzz/insertChain#${String(ctx.index)}`, stage: 'B-FUZZ' } };
      }
      if (input.cls === 'mandatory' && (r.code === 'E_BELOW_MIN_EDGE' || r.code === 'E_BELOW_MIN_ANGLE')) problems.push(`a mandatory chain rejected for precision: ${r.code} ${r.detail}`);
      if (topology(p) !== before) problems.push('the refused batch changed the arena');
      return { code: r.code, problems, warnings: [], work };
    }
    problems.push(...ciProblems(p));
    // remove(insert(x)) ≡ id on the topology (§13.1).
    const k1 = kernelOn([p]);
    const inserted = topology(p);
    const rm = k1.tx(spec(input.level), (o) => removeEdges(o, { role, entity }));
    const notes: string[] = [];
    if (!rm.ok) {
      // A typed refusal of the removal fails safely (the arena kept): a counted finding, the property unjudged (C-0227 (4)).
      notes.push(`remove-after-insert refused ${rm.code}${rm.detail.startsWith('index-freshness') ? ' index-freshness' : ''}`);
      if (topology(p) !== inserted) problems.push('the refused removal changed the arena');
    } else {
      ctx.plant?.afterRemove?.(p);
      problems.push(...ciProblems(p).map((x) => `after remove: ${x}`));
      if (topology(p) !== before) problems.push('remove(insert(x)) is not the identity on the topology');
    }
    let sampled: OpOutcome['sampled'];
    if (ctx.index % SAMPLE_EVERY === 0 && problems.length === 0) {
      const seq = insertSequence(input);
      const rep = sampledOf(ctx, 'renumbering', runTwiceCompare(seq, { seed: ctx.index + 1 }));
      if (!rep.identical) problems.push(`renumbering: ${JSON.stringify(rep.divergence)}`.slice(0, 400));
      const per = sampledOf(ctx, 'permutation', permutationCompare(seq, { count: 3, seed: ctx.index + 1 }));
      if (!per.identical) problems.push(`op permutation: ${JSON.stringify(per.divergence)}`.slice(0, 400));
      sampled = 'renumbering';
    }
    return { code: 'ok', problems, warnings: r.warnings, work, notes, ...(sampled === undefined ? {} : { sampled }) };
  },
};

/** The input as a determinism sequence: the face, then the chain and the face's mirror chain in one declared batch. */
function insertSequence(input: InsertInput): DeterminismSequence {
  const all = [...input.face, ...input.chain];
  const role = input.level === 1 ? 'way' : input.level === 2 ? 'kerb' : 'plot_line';
  return {
    name: 'bfuzz/insertChain',
    arena: () => framedAround(all) as Plat,
    batches: [
      { name: 'face', build: () => ({ spec: fixtureSpec(1), fn: (o: Overlay) => insertFn(o, input.face, 'way', 'way:face', 'mandatory', true) }) },
      { name: 'chain', build: () => ({ spec: fixtureSpec(input.level), fn: (o: Overlay) => insertFn(o, input.chain, role, `${role}:fuzz`, input.cls, input.closed) }) },
    ],
  };
}

function insertFn(o: Overlay, pts: readonly LatticePoint[], role: string, entity: string, cls: 'mandatory' | 'optional', closed: boolean): KernelResult<unknown> {
  return insertChain(o, pts.map((q) => determinismPoint(q.x, q.y)), [{ role, entity }], cls, closed ? { closed: true } : {});
}

interface SplitInput {
  readonly face: LatticePoint[];
  readonly a: number;
  readonly b: number;
  readonly ta: number;
  readonly tb: number;
  readonly bend: number;
}

/** A lattice point at share t (per mille) along the ring's edge i. */
function alongEdge(r: readonly LatticePoint[], i: number, t: number): LatticePoint {
  const a = r[i % r.length];
  const b = r[(i + 1) % r.length];
  return lpt(Math.round(a.x + ((b.x - a.x) * t) / 1000), Math.round(a.y + ((b.y - a.y) * t) / 1000));
}

/**
 * §13.1's "splitFace children tile the parent exactly (integer area2 equality)", read against the PARENT (C-0238 (1),
 * superseding C-0227 (8)'s joint-boundary identity): `parent` is the parent face's rings as `faceRings` gave them before
 * the split (signed: the outer ring counter-clockwise, holes clockwise). The children's joint boundary — the half-edges of
 * their walks whose twin is in neither walk, the cut's pairs cancelling — must hold exactly the parent's area2. Where a
 * cut end landed on a slanted ring edge, its lattice point lies in the hot pixel of the true crossing, so the edge bends
 * by at most √2/2 cm: then every parent vertex must stand on the joint boundary and the area2 differ by at most √2 × the
 * length of each parent edge the joint boundary does not keep whole. Null when the children tile the parent, else why
 * not. Two unrelated faces, or a child changed behind the transaction, fail.
 */
export function childrenTileParent(parent: readonly (readonly LatticePoint[])[], p: Plat, level: Level, a: FaceId, b: FaceId): string | null {
  const all = new Set<number>([...faceWalk(p, level, a).flat(), ...faceWalk(p, level, b).flat()]);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const key = (x: number, y: number) => `${String(x)},${String(y)}`;
  let s = 0n;
  const vertices = new Set<string>();
  const edges = new Set<string>();
  for (const h of all) {
    if (all.has(h ^ 1)) continue;
    const [u, v] = [O[h], O[h ^ 1]];
    s += BigInt(X[u]) * BigInt(Y[v]) - BigInt(X[v]) * BigInt(Y[u]);
    vertices.add(key(X[u], Y[u]));
    edges.add(`${key(X[u], Y[u])}>${key(X[v], Y[v])}`);
  }
  const want = parent.reduce((t, ring) => t + area2Exact(ring), 0n);
  if (s === want) return null;
  let bound = 0;
  for (const ring of parent) {
    for (let i = 0; i < ring.length; i++) {
      const u = ring[i];
      const v = ring[(i + 1) % ring.length];
      if (!vertices.has(key(u.x, u.y))) return `a parent vertex (${String(u.x)}, ${String(u.y)}) is not on the children's joint boundary`;
      if (!edges.has(`${key(u.x, u.y)}>${key(v.x, v.y)}`)) bound += Math.SQRT2 * Math.hypot(v.x - u.x, v.y - u.y);
    }
  }
  const d = s > want ? s - want : want - s;
  return Number(d) <= bound ? null : `the children's joint boundary holds area2 ${String(s)}, the parent ${String(want)} (the landings' bound ${bound.toFixed(1)})`;
}

const splitFacePrimitive: Primitive<SplitInput> = {
  name: 'splitFace',
  family: 'bfuzz/splitFace',
  arbitrary: () =>
    fc.record({
      face: simpleRingArb(SMALL).map(ccw),
      a: fc.nat(1000),
      b: fc.nat(1000),
      ta: fc.integer({ min: 0, max: 1000 }),
      tb: fc.integer({ min: 0, max: 1000 }),
      bend: fc.integer({ min: -300, max: 300 }),
    }),
  run(input, ctx) {
    const p = framedAround(input.face);
    if (p === null) return skip();
    const k = kernelOn([p]);
    const f = k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    if (!f.ok) return skip();
    const inner = interiorPoint(input.face);
    if (inner === null) return skip();
    const face = faceAt(p, 1, inner);
    if (face === null) return skip();
    const parent = faceRings(p, 1, face);
    const n = parent[0].length;
    const e1 = alongEdge(parent[0], input.a % n, input.ta);
    const e2 = alongEdge(parent[0], input.b % n, input.tb);
    const mid = lpt(Math.round((e1.x + e2.x) / 2 + (input.bend * (e2.y - e1.y)) / 1000), Math.round((e1.y + e2.y) / 2 - (input.bend * (e2.x - e1.x)) / 1000));
    const cut = input.bend === 0 ? [e1, e2] : [e1, mid, e2];
    const before = topology(p);
    const { r, work } = writer(p, 1, (o) => k.geom.splitFace(o, face, cut, { rows: [{ role: 'plot_line', entity: 'plot_line:cut' }] }), (c) => (c.startsWith('insert.') ? cut.length : liveFaces(p, 1)), { ctx, op: 'splitFace' });
    if (!r.ok) return { code: r.code, problems: topology(p) !== before ? ['the refused split changed the arena'] : [], warnings: [], work };
    const [c1, c2] = r.value.value as [FaceId, FaceId];
    const problems = ciProblems(p);
    const tiling = childrenTileParent(parent, p, 1, c1, c2);
    if (tiling !== null) problems.push(`splitFace children do not tile the parent: ${tiling}`);
    // mergeFaces ∘ splitFace restores the ring and the id (§13.1): the arena exactly as it was before the split (C-0238 (2)).
    const m = planTx(ctx, 'mergeFaces', () => k.tx(spec(1), (o) => k.geom.mergeFaces(o, c1, c2)));
    if (!m.ok) problems.push(`mergeFaces after splitFace refused: ${m.code} ${m.detail}`);
    else {
      ctx.plant?.afterMerge?.(p);
      const merged = m.value.value as FaceId;
      if (merged !== face) problems.push(`mergeFaces ∘ splitFace gave face ${String(merged)}, not ${String(face)}`);
      if (topology(p) !== before) problems.push('mergeFaces ∘ splitFace did not restore the arena');
      problems.push(...ciProblems(p).map((x) => `after merge: ${x}`));
    }
    return { code: 'ok', problems, warnings: r.warnings, work };
  },
};

interface WarpInput {
  readonly face: LatticePoint[];
  readonly chain: LatticePoint[];
  readonly field: FuzzField;
}

const warpPrimitive: Primitive<WarpInput> = {
  name: 'warp',
  family: 'bfuzz/warp',
  arbitrary: () =>
    fc.record({ face: simpleRingArb(SMALL).map(ccw), chain: arb.chain({ limitCm: SMALL }), field: arb.field({ limitCm: SMALL, sizeCm: [500, 16_000] }) }),
  run(input, ctx) {
    const p = framedAround([...input.face, ...input.chain, ...input.field.region]);
    if (p === null) return skip();
    const k = kernelOn([p]);
    const f = k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    if (!f.ok) return skip();
    k.tx(spec(1), (o) => k.geom.insertChain(o, input.chain, [{ role: 'way', entity: 'way:chain' }], 'mandatory'));
    const before = topology(p);
    const { r, work } = writer(p, 1, (o) => k.geom.warp(o, input.field, 1, input.field.region), () => 1, { ctx, op: 'warp' });
    if (!r.ok) return { code: r.code, problems: topology(p) !== before ? ['the refused warp changed the arena'] : [], warnings: [], work };
    return { code: 'ok', problems: ciProblems(p), warnings: r.warnings, work };
  },
};

interface ArenaFaceInput {
  readonly face: LatticePoint[];
  readonly d: readonly number[];
}

/** Runs a face service of the open transaction (`offsetFace`, `insetRing`, `kerb`) on an inserted ring. */
function faceService(input: ArenaFaceInput, role: string, call: (k: ReturnType<typeof kernelOn>, face: FaceId) => KernelResult<LatticePoint[][]>, opts: { spineWidths?: SpineWidths } = {}): { r: KernelResult<LatticePoint[][]> | null; region: LatticePoint[][] } {
  const p = framedAround(input.face);
  if (p === null) return { r: null, region: [] };
  const k = kernelOn([p], opts);
  const f = k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role, entity: `${role}:face` }], 'mandatory', { closed: true }));
  if (!f.ok) return { r: null, region: [] };
  const inner = interiorPoint(input.face);
  const face = inner === null ? null : faceAt(p, 1, inner);
  if (face === null) return { r: null, region: [] };
  const region = faceRings(p, 1, face);
  let out: KernelResult<LatticePoint[][]> | null = null;
  k.tx(spec(1), () => {
    out = call(k, face);
    return { ok: true, value: null, warnings: [] };
  });
  return { r: out, region };
}

/** Every vertex of `rings` lies in the region (within 1 cm of its boundary counted as in it). */
function insideProblems(rings: readonly (readonly LatticePoint[])[], region: readonly (readonly LatticePoint[])[], what: string): string[] {
  for (const r of rings) for (const q of r) if (!inRegionApprox(region, q, 1)) return [`${what}: a vertex (${String(q.x)}, ${String(q.y)}) lies outside the face`];
  return [];
}

const offsetFacePrimitive: Primitive<ArenaFaceInput> = {
  name: 'offsetFace',
  family: 'bfuzz/offsetFace',
  arbitrary: () => fc.record({ face: simpleRingArb(SMALL).map(ccw), d: fc.array(fc.integer({ min: 0, max: 3000 }), { minLength: 64, maxLength: 64 }) }),
  run(input, ctx) {
    const { r: r0, region } = faceService(input, 'way', (k, face) => {
      const n = faceRings(k.plat(RUNNER_KEY), 1, face).reduce((s, ring) => s + ring.length, 0);
      return k.geom.offsetFace(face, Array.from({ length: n }, (_, i) => input.d[i % input.d.length]));
    });
    if (r0 === null) return skip();
    const r = planted(ctx, 'offsetFace', r0);
    if (!r.ok) return { code: r.code, problems: [], warnings: [] }; // a typed refusal (§3.11; N-43's fidelity refusal among them)
    return { code: 'ok', problems: [...outputProblems(r.value), ...insideProblems(r.value, region, 'offset(−d)')], warnings: r.warnings };
  },
};

const insetRingPrimitive: Primitive<ArenaFaceInput> = {
  name: 'insetRing',
  family: 'bfuzz/insetRing',
  arbitrary: () => fc.record({ face: fc.oneof(arb.regularSnapped({ limitCm: SMALL }), arb.polygon({ limitCm: SMALL })).map(ccw), d: fc.array(fc.integer({ min: -2000, max: 6000 }), { minLength: 2, maxLength: 2 }) }),
  run(input, ctx) {
    const [d1, d2] = [Math.min(input.d[0], input.d[1]), Math.max(input.d[0], input.d[1])];
    let second: KernelResult<LatticePoint[][]> | null = null;
    const { r: r0, region } = faceService(input, 'way', (k, face) => {
      second = k.geom.insetRing(face, d2);
      return k.geom.insetRing(face, d1);
    });
    if (r0 === null) return skip();
    const r = planted(ctx, 'insetRing', r0);
    const r2 = second === null ? null : planted(ctx, 'insetRing@d2', second as KernelResult<LatticePoint[][]>);
    if (!r.ok) {
      if (r.code === 'E_NON_CONVEX' || r.code === 'E_DEGENERATE') {
        // insetRing empties monotonically: a collapsed inset stays collapsed at a larger distance.
        const problems = r.code === 'E_DEGENERATE' && r2 !== null && r2.ok && d2 > d1 ? [`insetRing(${String(d1)}) collapsed but insetRing(${String(d2)}) did not`] : [];
        return { code: r.code, problems, warnings: [] };
      }
      return { code: r.code, problems: [], warnings: [] };
    }
    const problems = outputProblems(r.value);
    if (d1 > 0) problems.push(...insideProblems(r.value, region, 'the inset'));
    if (d1 < 0) problems.push(...insideProblems(region, r.value, 'the outward inset (the face inside it)'));
    if (r2 !== null && r2.ok && d2 > d1) {
      const a1 = r.value.reduce((s, x) => s + area2Exact(x), 0n);
      const a2 = r2.value.reduce((s, x) => s + area2Exact(x), 0n);
      if (a2 > a1) problems.push('insetRing does not empty monotonically (a larger distance gave a larger inset)');
    }
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

const kerbPrimitive: Primitive<ArenaFaceInput> = {
  name: 'kerb',
  family: 'bfuzz/kerb',
  arbitrary: () => fc.record({ face: simpleRingArb(SMALL).map(ccw), d: fc.array(fc.integer({ min: 0, max: 1500 }), { minLength: 1, maxLength: 1 }) }),
  run(input, ctx) {
    const widths: SpineWidths = (c) => (c.role === 'way' ? { halfWidthCm: input.d[0] } : null);
    const { r: r0, region } = faceService(input, 'way', (k, face) => k.geom.kerb(face), { spineWidths: widths });
    if (r0 === null) return skip();
    const r = planted(ctx, 'kerb', r0);
    if (!r.ok) return { code: r.code, problems: [], warnings: [] };
    return { code: 'ok', problems: [...outputProblems(r.value), ...insideProblems(r.value, region, 'the kerb')], warnings: r.warnings };
  },
};

interface CorridorInput {
  readonly face: LatticePoint[];
  readonly ways: LatticePoint[][];
  readonly hw: number;
}

const corridorUnionPrimitive: Primitive<CorridorInput> = {
  name: 'corridorUnion',
  family: 'bfuzz/corridorUnion',
  arbitrary: () => fc.record({ face: arb.polygon({ limitCm: SMALL, sizeCm: [3000, 30_000] }).map(ccw), ways: fc.array(arb.chain({ limitCm: SMALL }), { minLength: 1, maxLength: 3 }), hw: fc.integer({ min: 50, max: 800 }) }),
  run(input, ctx) {
    const p = framedAround([...input.face, ...input.ways.flat()]);
    if (p === null) return skip();
    const widths: SpineWidths = (c) => (c.role === 'way' ? { halfWidthCm: input.hw } : null);
    const k = kernelOn([p], { spineWidths: widths });
    const f = k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role: 'district_bound', entity: 'district_bound:d' }], 'mandatory', { closed: true }));
    if (!f.ok) return skip();
    input.ways.forEach((w, i) => k.tx(spec(1), (o) => k.geom.insertChain(o, w, [{ role: 'way', entity: `way:w${String(i)}` }], 'mandatory')));
    const faces: FaceId[] = [];
    for (let fid = 0; fid < p.slots.face[1].top; fid++) if (isFaceLive(p, 1, fid)) faces.push(fid);
    // S9 runs on district faces (§4.1): every L1 face owned, as S6 leaves them.
    k.tx(spec(1), (o) => k.geom.setOwner(o, faces, 'district:d'));
    const before = topology(p);
    const { r, work } = writer(p, 2, (o) => k.geom.corridorUnion(o, faces), (c) => (c.startsWith('tx.') ? liveFaces(p, 1) : input.ways.reduce((s, w) => s + w.length, 0)), { spineWidths: widths, ctx, op: 'corridorUnion' });
    if (!r.ok) return { code: r.code, problems: topology(p) !== before ? ['the refused corridorUnion changed the arena'] : [], warnings: [], work };
    return { code: 'ok', problems: ciProblems(p), warnings: r.warnings, work };
  },
};

interface QueryInput {
  readonly face: LatticePoint[];
  readonly chain: LatticePoint[];
  readonly box: readonly number[];
  readonly level: Level;
}

const queryPrimitive: Primitive<QueryInput> = {
  name: 'query',
  family: 'bfuzz/query',
  arbitrary: () =>
    fc.record({
      face: simpleRingArb(SMALL).map(ccw),
      chain: arb.chain({ limitCm: SMALL }),
      box: fc.array(fc.integer({ min: -SMALL, max: SMALL }), { minLength: 4, maxLength: 4 }),
      level: fc.constantFrom(0 as Level, 1 as Level, 2 as Level),
    }),
  run(input, ctx) {
    const p = framedAround([...input.face, ...input.chain]);
    if (p === null) return skip();
    const k = kernelOn([p]);
    k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    k.tx(spec(2), (o) => k.geom.insertChain(o, input.chain, [{ role: 'kerb', entity: 'kerb:chain' }], 'mandatory'));
    const [a, b, c, d] = input.box;
    const box = { minX: Math.min(a, c), minY: Math.min(b, d), maxX: Math.max(a, c), maxY: Math.max(b, d) };
    const q1 = k.index.query(RUNNER_KEY, input.level, box);
    const s1 = JSON.stringify([q1.vertices, q1.edges, q1.faces]);
    k.index.rebuildAtStageEnd(RUNNER_KEY);
    const q2raw = k.index.query(RUNNER_KEY, input.level, box);
    const q2 = (ctx.plant?.result === undefined ? q2raw : ctx.plant.result('query', q2raw)) as typeof q2raw;
    const s2 = JSON.stringify([q2.vertices, q2.edges, q2.faces]);
    const problems = s1 === s2 ? [] : ["a query's answer changed across a rebuild of the partitions it reads"];
    problems.push(...ciProblems(p));
    return { code: 'ok', problems, warnings: [] };
  },
};

const roundTripPrimitive: Primitive<QueryInput> = {
  name: 'encodeArena',
  family: 'bfuzz/encodeArena',
  arbitrary: () => queryPrimitive.arbitrary(),
  run(input, ctx) {
    const p = framedAround([...input.face, ...input.chain]);
    if (p === null) return skip();
    const k = kernelOn([p]);
    k.tx(spec(1), (o) => k.geom.insertChain(o, input.face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    k.tx(spec(2), (o) => k.geom.insertChain(o, input.chain, [{ role: 'kerb', entity: 'kerb:chain' }], 'mandatory'));
    const chunks = encodeArena(p);
    const loaded = decodeArena(chunks, p.key, { index: { gridCellCm: [800, 400, 200, 100, 50] } });
    if (!loaded.ok) return { code: loaded.code, problems: [`decodeArena refused its own save: ${loaded.code} ${loaded.detail}`], warnings: [] };
    const againRaw = encodeArena(loaded.value);
    const again = (ctx.plant?.result === undefined ? againRaw : ctx.plant.result('encodeArena', againRaw)) as typeof againRaw;
    const same = again.length === chunks.length && again.every((c, i) => c.bytes.length === chunks[i].bytes.length && c.bytes.every((x, j) => x === chunks[i].bytes[j]));
    const problems = same ? [] : ['save → load → save is not byte-identical'];
    problems.push(...ciProblems(loaded.value).map((x) => `loaded: ${x}`));
    return { code: 'ok', problems, warnings: [] };
  },
};

// ---- the services ----------------------------------------------------------------------------------------------------

const snapPrimitive: Primitive<[number, number]> = {
  name: 'snap',
  family: 'bfuzz/snap',
  arbitrary: () => {
    const v = fc.oneof(
      fc.double({ min: -9_000_000, max: 9_000_000 }),
      fc.integer({ min: -8_388_610, max: 8_388_610 }).map((i) => i + 0.5),
      fc.constantFrom(Number.NaN, Infinity, -Infinity, 8_388_607.5, -8_388_607.5, 8_388_606.5, -0),
    );
    return fc.tuple(v, v);
  },
  run([x, y], ctx) {
    const r = planted(ctx, 'snap', snap(x, y));
    const want = (v: number) => (v < 0 ? -Math.round(-v) : Math.round(v)) + 0;
    const out = (v: number) => !(Math.abs(want(v)) < 8_388_608);
    if (!r.ok) {
      if (r.code !== 'E_OUT_OF_RANGE') return { code: r.code, problems: [`snap refused ${r.code}`], warnings: [] };
      return { code: r.code, problems: out(x) || out(y) ? [] : ['snap refused an input that rounds into range'], warnings: [] };
    }
    const problems: string[] = [];
    if (out(x) || out(y)) problems.push('snap accepted a value that rounds out of range');
    if (r.value.x !== want(x) || r.value.y !== want(y) || Object.is(r.value.x, -0) || Object.is(r.value.y, -0)) problems.push(`snap(${String(x)}, ${String(y)}) = (${String(r.value.x)}, ${String(r.value.y)})`);
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

const orientPrimitive: Primitive<LatticePoint[]> = {
  name: 'orient',
  family: 'bfuzz/orient',
  arbitrary: () => fc.oneof(arb.nearCollinear({ limitCm: RANGE }), arb.polygon({ limitCm: RANGE }), arb.thin({ limitCm: RANGE })),
  run(ring) {
    const problems: string[] = [];
    for (let i = 0; i + 2 < ring.length && problems.length === 0; i++) {
      const [a, b, c] = [ring[i], ring[i + 1], ring[i + 2]];
      const ref = cross(a, b, c);
      const want = ref > 0n ? 1 : ref < 0n ? -1 : 0;
      if (orient(a, b, c) !== want) problems.push(`orient sign ${String(orient(a, b, c))} ≠ the BigInt reference ${String(want)}`);
    }
    return { code: 'ok', problems, warnings: [] };
  },
};

const area2Primitive: Primitive<LatticePoint[]> = {
  name: 'area2',
  family: 'bfuzz/area2',
  arbitrary: () => fc.oneof(arb.polygon({ limitCm: RANGE }), arb.large({ limitCm: RANGE }), arb.thin({ limitCm: RANGE }), arb.zeroArea({ limitCm: RANGE })),
  run(ring) {
    const ref = area2Exact(ring);
    const problems: string[] = [];
    if (area2Big(ring) !== ref) problems.push(`area2Big ≠ the BigInt shoelace (${String(ref)})`);
    const abs = ref < 0n ? -ref : ref;
    if (abs <= 2n ** 53n && area2(ring) !== Number(ref)) problems.push(`area2 = ${String(area2(ring))}, the exact ${String(ref)}`);
    return { code: 'ok', problems, warnings: [] };
  },
};

/** Whether the points are all collinear or fewer than three distinct (exact). */
function collinearSet(points: readonly LatticePoint[]): boolean {
  const d: LatticePoint[] = [];
  for (const q of points) if (!d.some((u) => u.x === q.x && u.y === q.y)) d.push(q);
  if (d.length < 3) return true;
  for (let i = 2; i < d.length; i++) if (cross(d[0], d[1], d[i]) !== 0n) return false;
  return true;
}

const hullPrimitive: Primitive<LatticePoint[]> = {
  name: 'hull',
  family: 'bfuzz/hull',
  arbitrary: () => ringArb(),
  run(points, ctx) {
    const r = planted(ctx, 'hull', hull(points));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' && collinearSet(points) ? [] : [`hull refused ${r.code} ${r.detail}`], warnings: [] };
    const h = r.value;
    const problems: string[] = [];
    for (let i = 0; i < h.length; i++) if (cross(h[i], h[(i + 1) % h.length], h[(i + 2) % h.length]) <= 0n) problems.push('the hull is not strictly convex counter-clockwise');
    for (const q of points) if (inRing(h, q) < 0) problems.push(`a point (${String(q.x)}, ${String(q.y)}) lies outside the hull`);
    return { code: 'ok', problems: problems.slice(0, 2), warnings: r.warnings };
  },
};

const obbPrimitive: Primitive<LatticePoint[]> = {
  name: 'obb',
  family: 'bfuzz/obb',
  arbitrary: () => ringArb(),
  run(ring, ctx) {
    const r = planted(ctx, 'obb', obb(ring));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' && collinearSet(ring) ? [] : [`obb refused ${r.code} ${r.detail}`], warnings: [] };
    const problems: string[] = [];
    if (collinearSet(ring)) problems.push('obb of collinear input did not return E_DEGENERATE');
    const b = r.value;
    if (!(b.minorCm > 0 && b.majorCm >= b.minorCm)) problems.push(`obb extents ${String(b.majorCm)} × ${String(b.minorCm)}`);
    // OBB contains the hull: every point within the box (a tolerance of 10⁻⁶ of the extent for the doubles).
    const tol = 1e-6 * Math.max(1, b.majorCm);
    for (const q of ring) {
      const u = (q.x - b.centre.x) * b.major.x + (q.y - b.centre.y) * b.major.y;
      const v = (q.x - b.centre.x) * b.minor.x + (q.y - b.centre.y) * b.minor.y;
      if (Math.abs(u) > b.majorCm / 2 + tol || Math.abs(v) > b.minorCm / 2 + tol) {
        problems.push(`a point (${String(q.x)}, ${String(q.y)}) lies outside the OBB`);
        break;
      }
    }
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

const lirPrimitive: Primitive<LatticePoint[]> = {
  name: 'lir',
  family: 'bfuzz/lir',
  arbitrary: () => simpleRingArb(SMALL).map(ccw),
  run(ring, ctx) {
    const r = planted(ctx, 'lir', lir(ring));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' ? [] : [`lir refused ${r.code} ${r.detail}`], warnings: [] };
    const problems: string[] = [];
    const L = r.value;
    if (!(L.widthCm > 0 && L.depthCm > 0)) problems.push('a LIR side is not positive');
    for (const c of L.corners) if (!inRegionApprox([ring], c, 1e-6 * Math.max(1, L.widthCm, L.depthCm))) problems.push(`a LIR corner (${String(c.x)}, ${String(c.y)}) lies outside the face`);
    return { code: 'ok', problems: problems.slice(0, 2), warnings: r.warnings };
  },
};

const regularFitPrimitive: Primitive<LatticePoint[]> = {
  name: 'regularFit',
  family: 'bfuzz/regularFit',
  arbitrary: () => ringArb(),
  run(ring, ctx) {
    const r = planted(ctx, 'regularFit', regularFit(ring));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' ? [] : [`regularFit refused ${r.code} ${r.detail}`], warnings: [] };
    const f = r.value;
    const problems: string[] = [];
    if (f.targets.length !== ring.length || !f.targets.every((t) => Number.isFinite(t.x) && Number.isFinite(t.y))) problems.push('regularFit targets are not one finite point per vertex');
    if (!(f.compactness >= 0 && f.compactness <= 1 + 1e-12)) problems.push(`compactness ${String(f.compactness)} outside [0, 1]`);
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

interface SkeletonInput {
  readonly rings: LatticePoint[][];
}

const skeletonPrimitive: Primitive<SkeletonInput> = {
  name: 'skeleton',
  family: 'bfuzz/skeleton',
  arbitrary: () =>
    fc.oneof(
      { weight: 3, arbitrary: simpleRingArb(SMALL).map((r) => ({ rings: [ccw(r)] })) },
      { weight: 2, arbitrary: arb.holedPolygon({ limitCm: SMALL }).map((h) => ({ rings: h.polygon.map((r) => r.slice()) })) },
      { weight: 1, arbitrary: ringArb(SMALL).map((r) => ({ rings: [r] })) },
    ),
  run(input, ctx) {
    const r = planted(ctx, 'skeleton', skeleton(input.rings as Polygon[], 'roof'));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' || r.code === 'E_OUT_OF_RANGE' ? [] : [`skeleton refused ${r.code} ${r.detail}`], warnings: [] };
    const s = r.value;
    if (s.kind === 'downgrade') {
      const flagged = r.warnings.some((w) => w.code === 'W_DOWNGRADE');
      return { code: 'ok', problems: flagged ? [] : ['a downgrade not reported W_DOWNGRADE'], warnings: r.warnings, downgrade: true, work: [{ counter: 'skeleton.events', charged: s.events, units: input.rings.reduce((t, x) => t + x.length, 0) }] };
    }
    const problems: string[] = [];
    const v = validateSkeleton(s);
    if (!v.ok) problems.push(`the returned skeleton fails the validator: ${v.check} ${v.detail}`);
    problems.push(...roofOutside(s.nodes, s.rings));
    return { code: 'ok', problems, warnings: r.warnings, work: [{ counter: 'skeleton.events', charged: s.events, units: input.rings.reduce((t, x) => t + x.length, 0) }] };
  },
};

/** §13.1's "no roof line lies outside its footprint": every node of the skeleton within the rings' region. */
export function roofOutside(nodes: readonly { readonly x: number; readonly y: number }[], rings: readonly (readonly LatticePoint[])[]): string[] {
  for (const nd of nodes) if (!inRegionApprox(rings, nd, 1e-6 * 1024)) return [`a roof node (${String(nd.x)}, ${String(nd.y)}) lies outside the footprint`];
  return [];
}

const simplifyPrimitive: Primitive<{ chain: LatticePoint[]; seg: number; ang: number }> = {
  name: 'simplify',
  family: 'bfuzz/simplify',
  arbitrary: () => fc.record({ chain: chainArb(), seg: fc.integer({ min: 0, max: 2000 }), ang: fc.integer({ min: 0, max: 9000 }) }),
  run(input, ctx) {
    const r = planted(ctx, 'simplify', simplify(input.chain, input.seg as Cm, input.ang, [], []));
    if (!r.ok) return { code: r.code, problems: r.code === 'E_DEGENERATE' ? [] : [`simplify refused ${r.code} ${r.detail}`], warnings: [] };
    const out = r.value;
    const problems: string[] = [];
    const c = input.chain;
    const ring = c.length >= 4 && c[0].x === c[c.length - 1].x && c[0].y === c[c.length - 1].y;
    const has = new Set(c.map((q) => `${String(q.x)},${String(q.y)}`));
    if (!out.every((q) => has.has(`${String(q.x)},${String(q.y)}`))) problems.push('simplify returned a point not in the chain');
    if (!ring) {
      // An open chain keeps its ends and its order (§3.4: a vertex is removable unless it is an open chain's end).
      let j = 0;
      for (const q of out) {
        while (j < c.length && (c[j].x !== q.x || c[j].y !== q.y)) j++;
        if (j === c.length) {
          problems.push('simplify reordered an open chain');
          break;
        }
        j++;
      }
      const e0 = out[0];
      const e1 = out[out.length - 1];
      if (e0.x !== c[0].x || e0.y !== c[0].y || e1.x !== c[c.length - 1].x || e1.y !== c[c.length - 1].y) problems.push("simplify moved an open chain's end");
    }
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

const hexLatticePrimitive: Primitive<{ region: LatticePoint[]; spacing: number; jitter: number }> = {
  name: 'hexLattice',
  family: 'bfuzz/hexLattice',
  arbitrary: () =>
    fc.record({ region: arb.polygon({ limitCm: SMALL, sizeCm: [500, 20_000] }).map(ccw), spacing: fc.integer({ min: 25, max: 2000 }), jitter: fc.nat(999) }).map((x) => ({
      ...x,
      spacing: Math.max(x.spacing, Math.ceil(Math.sqrt(Math.abs(Number(area2Exact(x.region))) / 2 / 20_000))),
      jitter: Math.floor((x.jitter * Math.max(x.spacing, 25)) / 2000) % Math.max(1, Math.ceil(x.spacing / 2) - 1),
    })),
  run(input, ctx) {
    const rng = new Stream(H128(utf8Bytes(`bfuzz/hexLattice/${String(input.spacing)}`)));
    const h = (ctx.plant?.result?.('hexLattice', hexLattice([input.region], input.spacing, input.jitter, rng)) ?? hexLattice([input.region], input.spacing, input.jitter, rng)) as ReturnType<typeof hexLattice>;
    const problems: string[] = [];
    if (h.adjacency.length !== 6 * h.points.length) problems.push('the adjacency does not hold six entries per point');
    for (const q of h.points) {
      if (inRing(input.region, q) <= 0) {
        problems.push(`a lattice point (${String(q.x)}, ${String(q.y)}) lies outside the region`);
        break;
      }
    }
    for (let i = 0; i < h.points.length && problems.length < 3; i++) {
      for (let d = 0; d < 6; d++) {
        const j = h.adjacency[6 * i + d];
        if (j >= 0 && h.adjacency[6 * j + ((d + 3) % 6)] !== i) {
          problems.push('the adjacency is not symmetric');
          break;
        }
      }
    }
    return { code: 'ok', problems, warnings: [] };
  },
};

const delaunayPrimitive: Primitive<LatticePoint[]> = {
  name: 'delaunay',
  family: 'bfuzz/delaunay',
  arbitrary: () => ringArb(),
  run(points, ctx) {
    const r = planted(ctx, 'delaunay', delaunay(points));
    if (!r.ok) return { code: r.code, problems: [`delaunay refused ${r.code} ${r.detail}`], warnings: [] };
    const d = r.value;
    const problems: string[] = [];
    if (d.triangles.length % 3 !== 0) problems.push('the triangle list is not three sites per triangle');
    if (collinearSet(points) && d.triangles.length > 0) problems.push('collinear or fewer than three sites gave a triangle');
    for (let t = 0; t + 2 < d.triangles.length; t += 3) {
      const [a, b, c] = [d.sites[d.triangles[t]], d.sites[d.triangles[t + 1]], d.sites[d.triangles[t + 2]]];
      if (cross(a, b, c) <= 0n) {
        problems.push('a triangle is not counter-clockwise');
        break;
      }
    }
    return { code: 'ok', problems, warnings: r.warnings };
  },
};

const sideRunsPrimitive: Primitive<LatticePoint[]> = {
  name: 'sideRuns',
  family: 'bfuzz/sideRuns',
  arbitrary: () => simpleRingArb(SMALL).map(ccw),
  run(ring) {
    const runs = sideRuns([ring], 1500);
    const samples = sampleBoundary([ring], 97);
    const problems: string[] = [];
    if (!Array.isArray(runs)) problems.push('sideRuns returned no list');
    for (const s of samples) {
      for (const q of s) {
        if (!(Number.isFinite(q.x) && Number.isFinite(q.y)) || !inRegionApprox([ring], q, 1e-6 * 1024)) {
          problems.push('a boundary sample lies off the ring');
          break;
        }
      }
    }
    return { code: 'ok', problems, warnings: [] };
  },
};

// ---- the arrangement, against the oracles (M0-k-03) ----------------------------------------------------------------

/** Our result judged against every oracle (§3.7: each oracle); the case's split, or `refused` when none could judge. */
function judged(ours: KernelResult<LatticePoint[][]>, oracle: (e: OracleEngine) => ReturnType<typeof oracleBoolean>): { problems: string[]; split: 'attracted' | 'unattracted' | 'refused' } {
  const warnings = ours.ok ? ours.warnings : 'warnings' in ours && Array.isArray((ours as { warnings?: unknown }).warnings) ? ((ours as { warnings: Warning[] }).warnings) : [];
  const verdicts: Verdict[] = ORACLE_ENGINES.map((e) => {
    const or = oracle(e);
    return touchMergedRelaxed(compareSplit(ours, or, warnings), ours.ok ? ours.value : [], or.ok ? or.rings : null);
  });
  const problems: string[] = [];
  let judgedAny = false;
  for (const v of verdicts) {
    if (v.refused) continue;
    judgedAny = true;
    if (!v.pass) problems.push(`${v.engine}: ${v.split} ${v.failures.join(', ')} (Δ ${v.symDiffCm2.toFixed(1)} cm², bound ${v.boundCm2.toFixed(1)})`);
  }
  return { problems, split: judgedAny ? verdicts[0].split : 'refused' };
}

/**
 * An unattracted verdict failing on the face count alone passes when the counts are equal once faces touching at a
 * point are counted as one on both sides (M0-a-08's reading, C-0206 (8); C-0227 (2)) — our engine splits a region
 * pinched at a vertex in two. Any other verdict (another failure beside `faces`, an attracted or refused split, no oracle
 * rings, unequal touch-merged counts) is returned as it is.
 */
export function touchMergedRelaxed(v: Verdict, mine: readonly (readonly LatticePoint[])[], oracleRings: readonly (readonly LatticePoint[])[] | null): Verdict {
  if (oracleRings === null || v.split !== 'unattracted' || v.failures.length !== 1 || v.failures[0] !== 'faces') return v;
  return touchMergedFaces(mine) === touchMergedFaces(oracleRings) ? { ...v, pass: true, failures: [] } : v;
}

/** The face count with faces that touch at a point counted as one (outer rings by their exact signed area, holes apart). */
export function touchMergedFaces(rings: readonly (readonly LatticePoint[])[]): number {
  const faces = rings.filter((r) => area2Exact(r) > 0n);
  const parent = faces.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const keys = faces.map((r) => new Set(r.map((q) => `${String(q.x)},${String(q.y)}`)));
  for (let i = 0; i < faces.length; i++) for (let j = i + 1; j < faces.length; j++) if ([...keys[i]].some((k) => keys[j].has(k))) parent[find(i)] = find(j);
  return new Set(faces.map((_, i) => find(i))).size;
}

function needOracles(): void {
  if (!clipper2Loaded()) throw new Error('runFuzz: the oracle primitives need loadOracles() first (M0-k-03)');
}

const booleansPrimitive: Primitive<{ a: LatticePoint[]; b: LatticePoint[]; op: 'union' | 'intersection' | 'difference' | 'xor'; fill: 'nonzero' | 'evenodd' }> = {
  name: 'booleans',
  family: 'bfuzz/booleans',
  oracles: true,
  arbitrary: () =>
    fc
      .record({
        a: simpleRingArb(SMALL),
        b: simpleRingArb(SMALL),
        dx: fc.integer({ min: -3000, max: 3000 }),
        dy: fc.integer({ min: -3000, max: 3000 }),
        op: fc.constantFrom('union' as const, 'intersection' as const, 'difference' as const, 'xor' as const),
        fill: fc.constantFrom('nonzero' as const, 'evenodd' as const),
      })
      .map(({ a, b, dx, dy, op, fill }) => {
        const [x, y] = overlapping(ccw(a), ccw(b), dx, dy);
        return { a: x, b: y, op, fill };
      }),
  run(input) {
    needOracles();
    const ours = booleans(input.op, [input.a], [input.b], input.fill);
    if (!ours.ok && !(ours.code === 'E_DEGENERATE' && ours.detail === 'empty')) return { code: ours.code, problems: [], warnings: [] }; // a typed refusal (N-43's fidelity refusal among them)
    const j = judged(ours, (e) => oracleBoolean(input.op, [input.a], [input.b], input.fill, e));
    return { code: ours.ok ? 'ok' : ours.code, problems: [...(ours.ok ? outputProblems(ours.value) : []), ...j.problems], warnings: ours.ok ? ours.warnings : [], split: j.split };
  },
};

const bufferPrimitive: Primitive<{ chains: LatticePoint[][]; w: number; joins: 'round' | 'square' | 'miter'; ends: 'round' | 'square' | 'flat' }> = {
  name: 'buffer',
  family: 'bfuzz/buffer',
  oracles: true,
  arbitrary: () =>
    fc.record({
      chains: fc.array(arb.chain({ limitCm: SMALL }), { minLength: 1, maxLength: 2 }),
      w: fc.integer({ min: 0, max: 1500 }),
      joins: fc.constantFrom('round' as const, 'square' as const, 'miter' as const),
      ends: fc.constantFrom('round' as const, 'square' as const, 'flat' as const),
    }),
  run(input, ctx) {
    needOracles();
    const ours = (ctx.plant?.buffer ?? buffer)(input.chains, input.w, input.joins, input.ends);
    if (!ours.ok && !(ours.code === 'E_DEGENERATE' && ours.detail === 'empty')) return { code: ours.code, problems: [], warnings: [] }; // a typed refusal (N-43's fidelity refusal among them)
    const j = judged(ours, (e) => oracleBuffer(input.chains, input.w, input.joins, input.ends, e));
    return { code: ours.ok ? 'ok' : ours.code, problems: [...(ours.ok ? outputProblems(ours.value) : []), ...j.problems], warnings: ours.ok ? ours.warnings : [], split: j.split };
  },
};

const tileRingsPrimitive: Primitive<{ rings: LatticePoint[][] }> = {
  name: 'tileRings',
  family: 'bfuzz/tileRings',
  oracles: true,
  arbitrary: () =>
    fc.record({ a: simpleRingArb(SMALL), b: simpleRingArb(SMALL), dx: fc.integer({ min: -3000, max: 3000 }), dy: fc.integer({ min: -3000, max: 3000 }) }).map(({ a, b, dx, dy }) => {
      const [x, y] = overlapping(ccw(a), ccw(b), dx, dy);
      return { rings: [x, y] };
    }),
  run(input, ctx) {
    needOracles();
    const ours = planted(ctx, 'tileRings', tileRings(input.rings));
    if (!ours.ok) return { code: ours.code, problems: [], warnings: [] }; // a typed refusal: the overlap answer, or N-43's
    const problems: string[] = [];
    let split: 'attracted' | 'unattracted' | 'refused' = 'refused';
    ours.value.forEach((pieces, i) => {
      problems.push(...outputProblems(pieces).map((x) => `ring ${String(i)}: ${x}`));
      const earlier = input.rings.slice(0, i);
      const j = judged({ ok: true, value: pieces, warnings: ours.warnings }, (e) => (earlier.length === 0 ? oracleBoolean('union', [input.rings[i]], [], 'nonzero', e) : oracleBoolean('difference', [input.rings[i]], earlier, 'nonzero', e)));
      problems.push(...j.problems.map((x) => `ring ${String(i)}: ${x}`));
      if (j.split !== 'refused') split = j.split;
    });
    return { code: 'ok', problems, warnings: ours.warnings, split };
  },
};

/** Every fuzzed primitive, in §3.4's order (writers, services), the arrangement's oracle-compared ones last. */
export const PRIMITIVES: readonly Primitive<never>[] = Object.freeze([
  insertChainPrimitive,
  splitFacePrimitive,
  warpPrimitive,
  corridorUnionPrimitive,
  offsetFacePrimitive,
  insetRingPrimitive,
  kerbPrimitive,
  queryPrimitive,
  roundTripPrimitive,
  snapPrimitive,
  orientPrimitive,
  area2Primitive,
  hullPrimitive,
  obbPrimitive,
  lirPrimitive,
  regularFitPrimitive,
  skeletonPrimitive,
  simplifyPrimitive,
  hexLatticePrimitive,
  delaunayPrimitive,
  sideRunsPrimitive,
  booleansPrimitive,
  bufferPrimitive,
  tileRingsPrimitive,
] as unknown as Primitive<never>[]);

/** A primitive by its name. */
export function primitiveNamed(name: string): Primitive<unknown> {
  const p = PRIMITIVES.find((x) => x.name === name);
  if (p === undefined) throw new RangeError(`runFuzz: no primitive ${name} (the primitives: ${PRIMITIVES.map((x) => x.name).join(', ')})`);
  return p as unknown as Primitive<unknown>;
}
