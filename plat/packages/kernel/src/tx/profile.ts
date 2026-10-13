// Chain profiles: reading and cutting (§2.2 rule 5 *Chain attributes are knot profiles*, *Cutting and joining a
// profiled chain* (J-K23), *Stretch-state profiles*' Read; §3.4 `sampleProfile`; C-0045). M0-a-06.
//
// A profile's knots are vertices of the entity's own-level route carrying the registry's knot role for the attribute
// with an ordinal, `values[i]` belonging to the vertex carrying (knotRole, entity, i). Between consecutive knots the
// value is interpolated linearly by arc length along that route (`linear`) or held to the next knot (`step`); it is
// constant before the first and after the last knot of an open chain, a ring interpolates cyclically, and a chain of
// several rings never interpolates across them. Arc lengths are sums of + − × √ over lattice coordinates and every
// interpolation divides through `ratio()` (§3.2 (8)), so every engine computes the same doubles (§2.2 rule 5).
//
// The pure core — a "knot line": a run's knots with their arc positions — gives the three ops the item names:
// `cutKnot` (the sample a cut knot carries), `joinProfiles` (concatenation in chain order with the join rule) and
// `renumberKnots` (ordinals from 0 in chain order). Readings: C-0185 (6), (7).
import { handleOf, idOf, isVertexLive, outgoing, resolve, roleInfo, rowElement, rowsOfKey, rowsOn, type Plat, type VertexId } from '../arena/index.js';
import { ratio } from '../num/index.js';
import type { ChainProfile, ChainRef, Cm, Id, Level, Order, PlatKey, RoleName } from '../types/index.js';
import { linesOfRuns } from './chains.js';
import { check, notBuilt, roleId } from './state.js';
import type { ProfileOut, ProfileValue } from './types.js';

/** §2.2 rule 5's join tolerance: a knot at a join drops only where the joined profile samples within it without it. */
export const JOIN_TOLERANCE_CM = 1e-9;

/** One knot on a run: its arc position (cm from the run's start) and value; `ordinal` its row's ordinal (−1 for a cut knot). */
export interface ProfileKnot<T extends ProfileValue = ProfileValue> {
  readonly pos: number;
  readonly value: T;
  readonly ordinal: number;
  /** The vertex carrying it, where the knot is a row of the arena. */
  readonly vertex?: VertexId;
}

/** A profile of any value kind (§2.2's ChainProfile<number | string | Order>). */
export type AnyProfile = ChainProfile<number> | ChainProfile<string> | ChainProfile<Order>;

/** One run's knots in chain order, with the run's length and closure — the pure profile's domain. */
export interface KnotLine<T extends ProfileValue = ProfileValue> {
  readonly interp: 'linear' | 'step';
  readonly closed: boolean;
  /** The run's own-level route length (cm). */
  readonly length: number;
  /** In chain order: by arc position, a vertex's knots in their order along the chain. */
  readonly knots: readonly ProfileKnot<T>[];
}

/** Two profile values equal (numbers and strings by value, an Order by its seq then its step). */
export function sameValue(a: ProfileValue, b: ProfileValue): boolean {
  if (typeof a === 'object' && typeof b === 'object') return a.seq === b.seq && a.step === b.step;
  return a === b;
}

function lerp(a: number, b: number, s0: number, s1: number, s: number): number {
  const t = ratio(s - s0, s1 - s0, 'length');
  check(t.ok, 'two knots a sample is interpolated between stand at least 1 cm apart along the route');
  return a + (b - a) * t.value;
}

/**
 * The profile's sample at arc position `s` on the run (§2.2 rule 5): linear between the bracketing knots, the held value
 * for `step`, the constant before the first and after the last knot of an open run, cyclic on a ring. A position with
 * two knots (a step of two ordinals on one vertex) samples the later one. Also the value a cut knot at `s` carries —
 * the item's `cutKnot` (C-0045).
 */
export function cutKnot<T extends ProfileValue>(line: KnotLine<T>, s: number): T {
  const ks = line.knots;
  check(ks.length > 0, 'a profile has at least one knot on the run it is sampled on');
  let i = -1; // the last knot at or before s
  for (let k = 0; k < ks.length; k++) if (ks[k].pos <= s) i = k;
  const j = i + 1 < ks.length ? i + 1 : -1; // the first knot after s
  if (line.interp === 'step') {
    if (i >= 0) return ks[i].value;
    return line.closed ? ks[ks.length - 1].value : ks[0].value;
  }
  if (!line.closed) {
    if (i < 0) return ks[0].value;
    if (j < 0) return ks[i].value;
    return lerp(ks[i].value as number, ks[j].value as number, ks[i].pos, ks[j].pos, s) as T;
  }
  if (ks.length === 1) return ks[0].value;
  const a = i >= 0 ? ks[i] : ks[ks.length - 1];
  const aPos = i >= 0 ? a.pos : a.pos - line.length;
  const b = j >= 0 ? ks[j] : ks[0];
  const bPos = j >= 0 ? b.pos : b.pos + line.length;
  if (aPos === bPos) return b.value;
  return lerp(a.value as number, b.value as number, aPos, bPos, s) as T;
}

/**
 * The knots of a join (§2.2 rule 5, J-K23): `a`'s knots, then `b`'s shifted by `a`'s length, in chain order; at the join
 * vertex (position `a.length`) two equal knots become one, and a knot there drops only where the joined profile samples
 * identically without it — its value within 1e-9 cm of the interpolation between its neighbouring knots (`linear`,
 * decided in doubles; one neighbour: equal to it) or equal to the previous knot's (`step`). Two different values stay as
 * a step of two ordinals. The item's `joinProfiles`.
 */
export function joinProfiles<T extends ProfileValue>(a: KnotLine<T>, b: KnotLine<T>): KnotLine<T> {
  check(a.interp === b.interp, 'joined profiles share their interpolation');
  check(!a.closed && !b.closed, 'a join concatenates two open runs');
  const at = a.length;
  const before = a.knots.filter((k) => k.pos < at);
  const after = b.knots.filter((k) => k.pos > 0).map((k) => ({ pos: k.pos + at, value: k.value, ordinal: k.ordinal }));
  const atJoin: ProfileKnot<T>[] = [...a.knots.filter((k) => k.pos >= at), ...b.knots.filter((k) => k.pos <= 0).map((k) => ({ pos: at, value: k.value, ordinal: k.ordinal }))];
  const joint: ProfileKnot<T>[] = [];
  for (const k of atJoin) if (joint.length === 0 || !sameValue(joint[joint.length - 1].value, k.value)) joint.push({ pos: at, value: k.value, ordinal: k.ordinal });
  let keep = joint;
  if (joint.length === 1) {
    const v = joint[0].value;
    const prev = before.length > 0 ? before[before.length - 1] : null;
    const next = after.length > 0 ? after[0] : null;
    let drop: boolean;
    if (a.interp === 'step') {
      drop = prev !== null ? sameValue(prev.value, v) : next !== null && sameValue(next.value, v);
    } else if (prev !== null && next !== null) {
      drop = Math.abs(lerp(prev.value as number, next.value as number, prev.pos, next.pos, at) - (v as number)) <= JOIN_TOLERANCE_CM;
    } else if (prev !== null || next !== null) {
      const n = (prev ?? next) as ProfileKnot<T>;
      drop = Math.abs((n.value as number) - (v as number)) <= JOIN_TOLERANCE_CM;
    } else {
      drop = false;
    }
    if (drop) keep = [];
  }
  return { interp: a.interp, closed: false, length: a.length + b.length, knots: [...before, ...keep, ...after] };
}

/** The values of knots renumbered from 0 in chain order (§3.4's rekey; the item's `renumberKnots`): ordinal i is values[i]. */
export function renumberKnots<T extends ProfileValue>(knots: readonly ProfileKnot<T>[]): { values: T[]; ordinals: number[] } {
  return { values: knots.map((k) => k.value), ordinals: knots.map((_, i) => i) };
}

// ---- the chain's own-level route ------------------------------------------------------------------------------------

/** One run of a chain's own-level route: its route vertices in chain order and their arc positions. */
export interface RouteLine {
  readonly vertices: VertexId[];
  readonly pos: number[];
  readonly closed: boolean;
  readonly length: number;
}

/** The route level of a chain: the lowest level among its (role, entity) rows (§2.2 rule 5's "own-level route"). */
export function chainLevel(p: Plat, chain: ChainRef): Level {
  const h = handleOf(p, chain.entity);
  let lvl = 5;
  for (const r of rowsOfKey(p, roleId(chain.role), h, 0)) lvl = Math.min(lvl, p.roles.level[r]);
  check(lvl <= 4, `the chain (${chain.role}, ${chain.entity}) carries no row`);
  return lvl as Level;
}

/**
 * The chain's own-level route, run by run, in `resolve`'s order (an open run from its lower (y, x) end, a ring
 * counter-clockwise; C-0146 (5)): `linesOfRuns` at the chain's level — each run's vertices of level ≤ it with their arc
 * lengths from the run's first route vertex. [] for a chain that resolves to no edge.
 */
export function routeLines(p: Plat, chain: ChainRef, key: PlatKey): RouteLine[] {
  const r = resolve(p, chain, key);
  if (r.view !== 'edges' || r.runs.length === 0) return [];
  return linesOfRuns(p, r.runs, chainLevel(p, chain));
}

/** The vertex carrying (knotRole, entity, ordinal), or −1. */
export function knotVertex(p: Plat, knotRole: RoleName, entity: Id, ordinal: number): VertexId {
  const rows = rowsOfKey(p, roleId(knotRole), handleOf(p, entity), ordinal);
  check(rows.length <= 1, `two vertices carry (${knotRole}, ${entity}, ${ordinal})`);
  return rows.length === 0 ? -1 : rowElement(p, rows[0]);
}

/** The knot lines of a profile on its chain: per run, its knots (ordinal i ↦ values[i]) by arc position, ordinal second. */
export function knotLines(p: Plat, profile: AnyProfile, entity: Id, lines: readonly RouteLine[]): KnotLine[] {
  const at = new Map<VertexId, { run: number; i: number }>();
  lines.forEach((ln, run) => ln.vertices.forEach((v, i) => at.set(v, { run, i })));
  const per: ProfileKnot[][] = lines.map(() => []);
  const values = profile.values as readonly ProfileValue[];
  for (let o = 0; o < values.length; o++) {
    const v = knotVertex(p, profile.knotRole, entity, o);
    check(v >= 0, `knot ${o} of (${profile.knotRole}, ${entity}) is on no vertex`);
    const where = at.get(v);
    check(where !== undefined, `knot ${o} of (${profile.knotRole}, ${entity}) is not a vertex of the chain's own-level route`);
    per[where.run].push({ pos: lines[where.run].pos[where.i], value: values[o], ordinal: o, vertex: v });
  }
  return lines.map((ln, run) => {
    const ks = per[run].slice().sort((a, b) => a.pos - b.pos || a.ordinal - b.ordinal);
    return { interp: profile.interp, closed: ln.closed, length: ln.length, knots: ks };
  });
}

/** The chain role of an entity's profile: the edge role of the entity present at every knot vertex (lowest rank first). */
export function profileChain(p: Plat, profile: AnyProfile, owner: Id): ChainRef | null {
  const h = handleOf(p, owner);
  if (h < 0 || profile.values.length === 0) return null;
  let common: Set<number> | null = null;
  for (let o = 0; o < profile.values.length; o++) {
    const v = knotVertex(p, profile.knotRole, owner, o);
    if (v < 0 || !isVertexLive(p, v)) return null;
    const here = new Set<number>();
    for (const e of outgoing(p, v)) {
      for (const r of rowsOn(p, 'edge', e)) if (p.roles.entity[r] === h && p.roles.ordinal[r] === 0) here.add(p.roles.kind[r]);
    }
    const prev: Set<number> | null = common;
    common = prev === null ? here : new Set<number>([...prev].filter((x: number) => here.has(x)));
  }
  if (common === null || common.size === 0) return null;
  const best = [...common].sort((a, b) => roleInfo(a).rank - roleInfo(b).rank)[0];
  return { role: roleInfo(best).name, entity: idOf(p, h) };
}

/**
 * Samples a profile along an explicit chain (the core of `sampleProfile`): per run in chain order, at every route vertex
 * (`'perVertex'`) or at arc lengths 0, atCm, 2·atCm … ≤ the run's length (C-0185 (6)); a chain that resolves to no edge
 * gives [].
 */
export function sampleChain(p: Plat, profile: AnyProfile, chain: ChainRef, key: PlatKey, atCm: Cm | 'perVertex'): (number | string)[] {
  const lines = routeLines(p, chain, key);
  if (lines.length === 0) return [];
  if (atCm !== 'perVertex') check(Number.isFinite(atCm) && atCm >= 1, 'a sampling step is at least 1 cm');
  const kl = knotLines(p, profile, chain.entity, lines);
  const out: (number | string)[] = [];
  lines.forEach((ln, run) => {
    const line = kl[run];
    check(line.knots.length > 0, `a run of (${chain.role}, ${chain.entity}) carries no knot of its profile (§3.10: at least one knot per ring)`);
    const at: number[] = atCm === 'perVertex' ? ln.pos.slice() : [];
    if (atCm !== 'perVertex') for (let s = 0; s <= ln.length; s += atCm) at.push(s);
    for (const s of at) {
      const v = cutKnot(line, s);
      // An Order is a stretch-state profile's value, read by the Write protocol's readers (M2b, C-0045).
      if (typeof v === 'object') notBuilt('M2b', 'sampling an Order-valued stretch-state profile');
      out.push(v);
    }
  });
  return out;
}

/**
 * §3.4's `sampleProfile(p, owner, key, atCm)` on arena `plat` (the façade maps the key to its arena, M0-a-16): the
 * profile sampled by arc length along the owner's own-level route, interpolated as §2.2 rule 5 states (a ring
 * cyclically; a step profile's categorical values as given). The chain is the owner's edge role present at every knot
 * vertex (C-0185 (6)); a profile whose chain resolves to no edge gives [].
 */
export function sampleProfile(plat: Plat, profile: AnyProfile, owner: Id, key: PlatKey, atCm: Cm | 'perVertex'): number[] | string[] {
  const chain = profileChain(plat, profile, owner);
  if (chain === null) return [];
  return sampleChain(plat, profile, chain, key, atCm) as number[] | string[];
}

/** A part's knots as the profile the caller writes, or the scalar a part with no knot takes (§2.2 rule 5). */
export function profileOut(knotRole: RoleName, interp: 'linear' | 'step', values: readonly ProfileValue[], scalar: ProfileValue | null): ProfileOut {
  if (values.length === 0) {
    check(scalar !== null, 'a part with no knot takes a scalar');
    return scalar;
  }
  return { knotRole, values: values.slice(), interp } as ProfileOut;
}
