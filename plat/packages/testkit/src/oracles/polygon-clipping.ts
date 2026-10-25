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

/**
 * Runs `run` under each quarter turn in order, turns each result back and returns the first one the region check
 * accepts; throws an `OracleRefusal` naming every attempt's outcome when none is accepted (C-0150).
 */
export function underTurns(run: (k: Turn) => PcMultiPolygon, accept: (mp: PcMultiPolygon) => string | null): PcMultiPolygon {
  const outcomes: string[] = [];
  for (const k of TURNS) {
    let mp: PcMultiPolygon;
    try {
      mp = turnMulti(run(k), inverse(k));
    } catch (e) {
      outcomes.push(attemptLine(k, `threw (${e instanceof Error ? e.message : String(e)})`));
      continue;
    }
    const wrong = accept(mp);
    if (wrong === null) return mp;
    outcomes.push(attemptLine(k, wrong));
  }
  throw new OracleRefusal('polygon-clipping', `no quarter turn gave the operands' region — ${outcomes.join('; ')}`);
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
  return polygonClipping.xor(first, ...rest);
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
      return polygonClipping.union(first, ...rest);
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
