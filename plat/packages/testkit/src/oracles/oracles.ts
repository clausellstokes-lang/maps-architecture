// The two CI oracles behind one signature each (M0-k-03; §3.7 "Oracles, not fallbacks", §13.1's differential
// agreement): `oracleBoolean(op, a, b, fill, engine)` and `oracleBuffer(chains, w, joins, ends, engine)` take §3.4's
// arguments for `booleans` and `buffer` plus the engine, and return the oracle's rings in our integer frame with the
// case's perimeter. Every answer has passed the region check (region-check.ts); a library that could not give one —
// every attempt threw or failed the check — returns a refused result, which the comparison counts as "this oracle
// cannot judge this case", never as a fault of ours (C-0150). Dev-only: nothing shipped imports the test kit (§14;
// the isolation test in test/oracles/).
import { isLatticeRing, perimeterOf, toRing } from './rings.js';
import { bufferParts } from './buffer-parts.js';
import { clipper2Boolean, clipper2BooleanRaw, clipper2UnionPieces, loadClipper2 } from './clipper2.js';
import {
  multiPolygonArea,
  polygonClippingBoolean,
  polygonClippingRaw,
  polygonClippingUnionPieces,
} from './polygon-clipping.js';
import { isOracleRefusal } from './refusal.js';
import type { BooleanOp, EndKind, FillRule, JoinKind, OracleEngine, OracleResult, Ring, RingLike } from './types.js';

/**
 * Loads both oracles — Clipper2's WebAssembly module is asynchronous; polygon-clipping needs nothing — once. Every
 * oracle call afterwards is synchronous; a Clipper2 call before it throws (C-0144 (1)).
 */
export async function loadOracles(): Promise<void> {
  await loadClipper2();
}

function failure(engine: OracleEngine, error: string): OracleResult {
  return { ok: false, engine, error };
}

function message(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/**
 * A thrown value as a result: a library's refusal is a refused result (C-0150); a Clipper2 call before
 * `loadOracles()` is the harness's usage error and is rethrown; anything else is a failed result naming it.
 */
export function resultOfThrow(engine: OracleEngine, e: unknown): OracleResult {
  if (isOracleRefusal(e)) return { ok: false, engine, error: e.message, refused: true, seed: e.seed, overran: e.overran };
  if (engine === 'clipper2' && message(e).startsWith('oracles:')) throw e;
  return failure(engine, `${engine}: ${message(e)}`);
}

/**
 * The oracle's `a op b` under the fill rule (both operands), §3.4's `booleans` arguments. The operands must be lattice
 * rings (integers, |v| < 2²³); anything else fails (`input`). The perimeter is the summed boundary length of both
 * operands (§3.7).
 */
export function oracleBoolean(
  op: BooleanOp,
  a: readonly RingLike[],
  b: readonly RingLike[],
  fill: FillRule,
  engine: OracleEngine,
): OracleResult {
  if (!a.every(isLatticeRing) || !b.every(isLatticeRing)) return failure(engine, 'input: not lattice rings');
  const ra = a.map(toRing);
  const rb = b.map(toRing);
  const perimeterCm = perimeterOf(ra) + perimeterOf(rb);
  let rings: Ring[] | null;
  try {
    rings = engine === 'clipper2' ? clipper2Boolean(op, ra, rb, fill) : polygonClippingBoolean(op, ra, rb, fill);
  } catch (e) {
    return resultOfThrow(engine, e);
  }
  if (rings === null) return failure(engine, 'output: a point outside the lattice range');
  return { ok: true, engine, rings, perimeterCm };
}

/**
 * The oracle's buffer of the chains, §3.4's `buffer` arguments: the union, through the engine's own boolean, of §3.7's
 * strips, joins and ends (`buffer-parts.ts`; C-0144 (4)). The chains must be lattice points; the half-widths one
 * non-negative number, or one per input point in chain order. The perimeter is the boundary length of the result
 * (C-0144 (5)). An empty buffer returns no rings.
 */
export function oracleBuffer(
  chains: readonly RingLike[],
  w: number | readonly number[],
  joins: JoinKind,
  ends: EndKind,
  engine: OracleEngine,
): OracleResult {
  if (!chains.every(isLatticeRing)) return failure(engine, 'input: not lattice points');
  const parts = bufferParts(chains, w, joins, ends);
  if (typeof parts === 'string') return failure(engine, `input: ${parts}`);
  let rings: Ring[] | null;
  try {
    rings = engine === 'clipper2' ? clipper2UnionPieces(parts) : polygonClippingUnionPieces(parts);
  } catch (e) {
    return resultOfThrow(engine, e);
  }
  if (rings === null) return failure(engine, 'output: a point outside the lattice range');
  return { ok: true, engine, rings, perimeterCm: perimeterOf(rings) };
}

/**
 * |x Δ y| in cm² through the engine's own boolean: the xor of the two ring sets, both read by the non-zero rule (an
 * engine output and ours are sets of disjoint faces, outer rings counter-clockwise and holes clockwise), its area taken
 * from the engine's doubles before any snap — a xor the region check accepted. Throws an `OracleRefusal` when the
 * library cannot give one (C-0150).
 */
export function symDiffArea(x: readonly Ring[], y: readonly Ring[], engine: OracleEngine): number {
  const rings = engine === 'clipper2' ? [clipper2BooleanRaw('xor', x, y, 'nonzero')] : polygonClippingRaw('xor', x, y, 'nonzero');
  return Math.abs(multiPolygonArea(rings));
}
