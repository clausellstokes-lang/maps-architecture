// The polygon-clipping oracle (M0-k-03; §3.7, §13.1, §17.4): polygon-clipping 0.15.7 (MIT, a dev dependency of the
// test kit only, C-0062), a Martinez–Rueda–Feito sweep in doubles. The library has no fill-rule parameter — its README
// says it reads a self-crossing ring by the non-zero rule and a polygon's later rings as holes — so each operand's ring
// set is turned into a geometry with the same region under the declared rule (C-0144 (2)):
// * non-zero: the rings joined into one ring by doubled bridges from the first ring's first vertex — winding numbers
//   add along a closed path and each bridge, traversed once each way, adds none, so the joined ring's non-zero region
//   is the ring set's;
// * even-odd: the XOR of the operand's simple rings, as they are, and of the fan triangles of each ring that is not
//   simple — crossing parity adds over any split of the boundary into closed paths, so the XOR is the even-odd region.
// The library's sweep in doubles throws on some near-degenerate inputs ("Unable to complete output ring", a runaway
// recursion), and on others it returns a wrong region without throwing (the check `checks/M0-k-03.md` F4: a union with
// a self-crossing operand; its own xor of two simple overlapping rings). Every call is therefore run under the four
// exact quarter turns of the plane — the identity first, then 90°, 180° and 270°, each an exact swap and negation of
// the coordinates that changes the sweep's order and every intersection's rounding — the result turned back, and an
// attempt is accepted only when the region check (region-check.ts) finds its region equal to the operands' region
// under the declared rule; an attempt that throws or fails the check is set aside. When no turn gives an accepted
// region the adapter throws an `OracleRefusal` (C-0150, superseding C-0144 (2)'s premise that the library's answer,
// when it returns one, is the operands' region).
//
// The step budget (hardening round S1; KI-6, C-0399). On some inputs the library's sweep never returns: its
// `SweepLine.process` walks the sweep-line tree past consumed segments (`tree.prev` / `tree.next`) and, with the tree's
// order broken by rounding, the walk cycles — the queue never grows, so the library's own size limits never fire
// (register.json's `oracleHang`, offsetFace seed 6101; the buffer case of agreement-buffer at PLAT_FUZZ_SEED=1595 and
// 1 000 runs). Every library call therefore runs under a step budget: the operations on the library's splay trees
// (`insert`, `add`, `remove`, `find`, `prev`, `next`, `pop` — every step of its sweep, its queue and its rounder) are
// counted on the very `splaytree` instance polygon-clipping loads (resolved from the library's own folder; the counter
// checks once that a union moves it, and refuses to run otherwise), and a call that makes more than
// `STEP_BUDGET_BASE + STEP_BUDGET_PER_VERTEX × n` of them (n its input vertices) is stopped and set aside like a throw.
// A count, not a clock: the same input overruns on every machine and under any load, so the outcome never depends on
// time. The budget stands far above every call measured (C-0399 (2)); an attempt that overruns is set aside and the
// next quarter turn tried, and when no turn is accepted the refusal says an attempt overran (`OracleRefusal.overran`).
import { createRequire } from 'node:module';
import polygonClipping from 'polygon-clipping';
import type { BooleanOp, FillRule, Ring } from './types.js';
import { dedupe, fanTriangles, isSimpleRing, snapRing } from './rings.js';
import { checkOperand, regionCheck, wrongRegion, type CheckOperand, type DRing } from './region-check.js';
import { OracleRefusal } from './refusal.js';

export type Pair = [number, number];
export type PcPolygon = Pair[][];
export type PcMultiPolygon = PcPolygon[];

/** A quarter turn of the plane: 0 the identity, 1 = 90°, 2 = 180°, 3 = 270° counter-clockwise — exact on doubles. */
export type Turn = 0 | 1 | 2 | 3;
const TURNS: readonly Turn[] = [0, 1, 2, 3];

function turned(x: number, y: number, k: Turn): Pair {
  switch (k) {
    case 0:
      return [x, y];
    case 1:
      return [-y, x];
    case 2:
      return [-x, -y];
    case 3:
      return [y, -x];
  }
}

/** The inverse quarter turn. */
function inverse(k: Turn): Turn {
  return ((4 - k) % 4) as Turn;
}

function turnMulti(mp: PcMultiPolygon, k: Turn): PcMultiPolygon {
  if (k === 0) return mp;
  return mp.map((poly) => poly.map((ring) => ring.map(([x, y]) => turned(x, y, k))));
}

function pairs(r: Ring, k: Turn): Pair[] {
  return r.map((p) => turned(p.x, p.y, k));
}

/** One attempt's outcome, for the refusal's message. */
function attemptLine(k: Turn, outcome: string): string {
  return `turn ${k * 90}°: ${outcome}`;
}

// ── the step budget (KI-6, C-0399) ──

/** The steps every library call may take whatever its size: 2²¹ (the largest call measured took 532 876). */
export const STEP_BUDGET_BASE = 2_097_152;

/** The further steps per input vertex: 2¹³ (the most measured per vertex: 459). */
export const STEP_BUDGET_PER_VERTEX = 8_192;

/** A step budget: the steps every call may take, and the further steps per input vertex. */
export interface StepBudget {
  readonly base: number;
  readonly perVertex: number;
}

const DEFAULT_BUDGET: StepBudget = Object.freeze({ base: STEP_BUDGET_BASE, perVertex: STEP_BUDGET_PER_VERTEX });

let budgetInForce: StepBudget = DEFAULT_BUDGET;

/** The splay-tree operations of the library counted as its steps. */
const COUNTED = ['insert', 'add', 'remove', 'find', 'prev', 'next', 'pop'] as const;

/** The steps of the call in progress, its limit (infinite outside a call) and the overruns since the module loaded. */
// `wrapped`: the counted methods are in place (done once); `armed`: the self-check has passed (until it does, every call
// runs it again and throws, so a counter that does not reach the library never lets a call run unbudgeted; N3).
const steps = { taken: 0, limit: Number.POSITIVE_INFINITY, overruns: 0, wrapped: false, armed: false };

/** A library call stopped by its step budget: the attempt sets it aside like a throw (`underTurns`). */
export class StepBudgetOverrun extends Error {
  readonly taken: number;
  readonly limit: number;

  constructor(taken: number, limit: number, vertices: number) {
    super(`overran its step budget (${String(taken)} steps; budget ${String(limit)} for ${String(vertices)} input vertices)`);
    this.name = 'StepBudgetOverrun';
    this.taken = taken;
    this.limit = limit;
  }
}

/** The sentinel thrown inside the library when the budget is spent (turned into a `StepBudgetOverrun` outside it). */
class Spent extends Error {}

/**
 * Counts the library's steps: wraps the counted methods of the `splaytree` polygon-clipping loads — resolved from the
 * library's own folder, so the very instance its sweep uses — once, then checks that a small union moves the count
 * and throws an `oracles: …` error (a test-kit fault, never a refusal) when it does not. It counts as armed only once
 * the check has passed (N3, C-0400): a failed check throws again on every later call, never letting one run
 * unbudgeted; `underTurns` arms before its first attempt, so the error is never set aside as an attempt's throw.
 */
function armSteps(): void {
  if (steps.armed) return;
  const req = createRequire(import.meta.url);
  const lib = createRequire(req.resolve('polygon-clipping'))('splaytree') as { prototype?: Record<string, unknown> } | undefined;
  const proto = lib?.prototype;
  if (proto === undefined) throw new Error("oracles: polygon-clipping's splaytree could not be loaded to count its steps");
  if (!steps.wrapped) {
    for (const name of COUNTED) {
      if (typeof proto[name] !== 'function') throw new Error(`oracles: polygon-clipping's splaytree has no ${name} to count`);
    }
    for (const name of COUNTED) {
      const orig = proto[name] as (...a: unknown[]) => unknown;
      proto[name] = function counted(this: unknown, ...args: unknown[]): unknown {
        steps.taken += 1;
        if (steps.taken > steps.limit) throw new Spent();
        return orig.apply(this, args);
      };
    }
    steps.wrapped = true;
  }
  const before = steps.taken;
  polygonClipping.union([[[0, 0], [1, 0], [1, 1], [0, 1]]], [[[2, 0], [3, 0], [3, 1], [2, 1]]]);
  if (!(steps.taken > before)) throw new Error("oracles: the step budget does not reach polygon-clipping (its splaytree is another instance)");
  steps.armed = true;
}

/** The number of points in a library geometry (any nesting of [x, y] pairs). */
function vertexCount(g: unknown): number {
  if (!Array.isArray(g)) return 0;
  if (typeof g[0] === 'number') return 1;
  let n = 0;
  for (const x of g) n += vertexCount(x);
  return n;
}

/**
 * One library call under the step budget: base + perVertex × n steps for n input vertices (`STEP_BUDGET_BASE` and
 * `STEP_BUDGET_PER_VERTEX`, or the budget `withStepBudget` put in force). Throws a `StepBudgetOverrun` when the call
 * would take more; any other throw is the library's own.
 */
function budgeted<T>(geoms: readonly unknown[], call: () => T): T {
  armSteps();
  const n = vertexCount(geoms);
  const limit = budgetInForce.base + budgetInForce.perVertex * n;
  steps.taken = 0;
  steps.limit = limit;
  try {
    return call();
  } catch (e) {
    if (e instanceof Spent) {
      steps.overruns += 1;
      throw new StepBudgetOverrun(steps.taken, limit, n);
    }
    throw e;
  } finally {
    steps.limit = Number.POSITIVE_INFINITY;
  }
}

/**
 * Runs `fn` with another step budget in force — a test seam, as `CompareOptions.measure` is one (every harness runs
 * under the default); the budget before is restored after, whatever `fn` does.
 */
export function withStepBudget<T>(budget: StepBudget, fn: () => T): T {
  if (!(budget.base >= 0 && budget.perVertex >= 0)) throw new RangeError('oracles: a step budget is non-negative');
  const before = budgetInForce;
  budgetInForce = { base: budget.base, perVertex: budget.perVertex };
  try {
    return fn();
  } finally {
    budgetInForce = before;
  }
}

/** The steps the last library call took and the overruns since the module loaded (read by the tests). */
export function stepCounts(): { lastTaken: number; overruns: number } {
  return { lastTaken: steps.taken, overruns: steps.overruns };
}

/**
 * Runs `run` under each quarter turn in order, turns each result back and returns the first one the region check
 * accepts; throws an `OracleRefusal` naming every attempt's outcome when none is accepted (C-0150) — marked `overran`
 * when an attempt ran past its step budget (KI-6, C-0399).
 */
export function underTurns(run: (k: Turn) => PcMultiPolygon, accept: (mp: PcMultiPolygon) => string | null): PcMultiPolygon {
  armSteps(); // a counter that does not reach the library is the kit's fault: thrown here, never an attempt's (N3)
  const outcomes: string[] = [];
  let overran = false;
  for (const k of TURNS) {
    let mp: PcMultiPolygon;
    try {
      mp = turnMulti(run(k), inverse(k));
    } catch (e) {
      if (e instanceof StepBudgetOverrun) {
        overran = true;
        outcomes.push(attemptLine(k, e.message));
      } else outcomes.push(attemptLine(k, `threw (${e instanceof Error ? e.message : String(e)})`));
      continue;
    }
    const wrong = accept(mp);
    if (wrong === null) return mp;
    outcomes.push(attemptLine(k, wrong));
  }
  throw new OracleRefusal('polygon-clipping', `no quarter turn gave the operands' region — ${outcomes.join('; ')}`, { overran });
}

/** A MultiPolygon's rings as the region check reads them. */
function ringsOf(mp: PcMultiPolygon): DRing[] {
  return mp.flat();
}

/** The acceptance test of one attempt: null when its region is the operands' region, else why not. */
function checker(op: BooleanOp, a: CheckOperand, b: CheckOperand): (mp: PcMultiPolygon) => string | null {
  return (mp) => {
    const r = regionCheck(op, a, b, ringsOf(mp));
    return r.ok ? null : wrongRegion(r);
  };
}

/** One operand as a polygon-clipping MultiPolygon with the ring set's region under `fill`, under quarter turn k. */
function operandGeometry(rings: readonly Ring[], fill: FillRule, k: Turn): PcMultiPolygon {
  const rs = rings.map((r) => dedupe(r)).filter((r) => r.length >= 3);
  if (rs.length === 0) return [];
  if (fill === 'nonzero') {
    const base = rs[0];
    const start = turned(base[0].x, base[0].y, k);
    const joined: Pair[] = pairs(base, k);
    joined.push(start);
    for (let i = 1; i < rs.length; i += 1) {
      const r = rs[i];
      joined.push(...pairs(r, k));
      joined.push(turned(r[0].x, r[0].y, k));
      joined.push(start);
    }
    return [[joined]];
  }
  const pieces: PcPolygon[] = [];
  for (const r of rs) {
    if (isSimpleRing(r)) pieces.push([pairs(r, k)]);
    else for (const t of fanTriangles(r)) pieces.push([pairs(t, k)]);
  }
  if (pieces.length === 0) return [];
  if (pieces.length === 1) return [pieces[0]];
  const [first, ...rest] = pieces;
  return budgeted(pieces, () => polygonClipping.xor(first, ...rest));
}

/** A polygon-clipping MultiPolygon into our rings, every point snapped (§3.2 (7)); null when a point is refused. */
export function readMultiPolygon(mp: PcMultiPolygon): Ring[] | null {
  const out: Ring[] = [];
  for (const poly of mp) {
    for (const ring of poly) {
      const r = snapRing(ring);
      if (r === null) return null;
      if (r.length > 0) out.push(r);
    }
  }
  return out;
}

function apply(op: BooleanOp, ga: PcMultiPolygon, gb: PcMultiPolygon): PcMultiPolygon {
  return budgeted([ga, gb], () => {
    switch (op) {
      case 'union':
        return polygonClipping.union(ga, gb);
      case 'intersection':
        return polygonClipping.intersection(ga, gb);
      case 'difference':
        return polygonClipping.difference(ga, gb);
      case 'xor':
        return polygonClipping.xor(ga, gb);
    }
  });
}

/**
 * polygon-clipping's boolean, `a op b` under the fill rule, as a MultiPolygon in doubles — the first quarter turn whose
 * region the region check accepts; throws an `OracleRefusal` when none is (C-0150).
 */
export function polygonClippingRaw(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): PcMultiPolygon {
  return underTurns(
    (k) => apply(op, operandGeometry(a, fill, k), operandGeometry(b, fill, k)),
    checker(op, checkOperand(a, fill), checkOperand(b, fill)),
  );
}

/**
 * One unchecked attempt — the library's own answer under quarter turn `turn`, turned back (throws as the library
 * does). The regression tests read it to show the library's wrong region and the check that sets it aside.
 */
export function polygonClippingAttempt(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule, turn: Turn): PcMultiPolygon {
  return turnMulti(apply(op, operandGeometry(a, fill, turn), operandGeometry(b, fill, turn)), inverse(turn));
}

/** polygon-clipping's boolean in our frame (throws an `OracleRefusal` when no attempt is accepted). */
export function polygonClippingBoolean(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): Ring[] | null {
  return readMultiPolygon(polygonClippingRaw(op, a, b, fill));
}

/**
 * polygon-clipping's union of counter-clockwise pieces in doubles (the buffer construction), snapped at the end; the
 * region check reads the pieces under the non-zero rule (throws an `OracleRefusal` when no attempt is accepted).
 */
export function polygonClippingUnionPieces(pieces: readonly (readonly [number, number])[][]): Ring[] | null {
  const kept = pieces.filter((piece) => piece.length >= 3);
  if (kept.length === 0) return [];
  const mp = underTurns(
    (k) => {
      const polys: PcPolygon[] = kept.map((piece) => [piece.map(([x, y]) => turned(x, y, k))]);
      const [first, ...rest] = polys;
      return budgeted(polys, () => polygonClipping.union(first, ...rest));
    },
    checker('union', { rings: kept, fill: 'nonzero' }, { rings: [], fill: 'nonzero' }),
  );
  return readMultiPolygon(mp);
}

/** The area of a MultiPolygon in cm², from its doubles (outer rings counter-clockwise, holes clockwise). */
export function multiPolygonArea(mp: PcMultiPolygon): number {
  let s = 0;
  for (const poly of mp) {
    for (const ring of poly) {
      const n = ring.length;
      for (let i = 0; i < n; i += 1) {
        const [ax, ay] = ring[i];
        const [bx, by] = ring[(i + 1) % n];
        s += ax * by - bx * ay;
      }
    }
  }
  return s / 2;
}
