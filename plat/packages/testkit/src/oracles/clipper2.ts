// The Clipper2 oracle (M0-k-03; §3.7, §13.1, §17.4): clipper2-wasm 0.4.0 (BSL-1.0, a dev dependency of the test kit
// only, C-0062) run in Node. Its WebAssembly module loads asynchronously, once, through `loadOracles()` (C-0144 (1));
// every call after that is synchronous. The module is read through the narrow interfaces below — the library's own
// declaration file is missing from its tarball (C-0124 (2)) — and every embind object the adapter creates is deleted
// before the call returns, so 10⁶ calls hold no WebAssembly memory. Every boolean and union answer passes the region
// check (region-check.ts) as polygon-clipping's does; a throw or a wrong region is an `OracleRefusal` (C-0150) — the
// library has no quarter-turn retries, since none of its answers has failed the check (10⁵ cases measured).
import factory from 'clipper2-wasm';
import type { BooleanOp, EndKind, FillRule, Ring } from './types.js';
import { dedupe, snapRing } from './rings.js';
import { checkOperand, regionCheck, wrongRegion, type CheckOperand } from './region-check.js';
import { OracleRefusal } from './refusal.js';

interface Deletable {
  delete(): void;
}
interface Path64 extends Deletable {
  size(): number;
  /** x, y, z per point, as BigInt64 (the build carries a z coordinate). */
  view(): BigInt64Array;
}
interface Paths64 extends Deletable {
  size(): number;
  get(i: number): Path64;
  push_back(p: Path64): void;
}
interface PathD extends Deletable {
  size(): number;
  /** x, y, z per point. */
  view(): Float64Array;
}
interface PathsD extends Deletable {
  size(): number;
  get(i: number): PathD;
  push_back(p: PathD): void;
}
interface EnumValue {
  value: number;
}

/** The part of the loaded module the adapter uses. */
interface ClipperModule {
  ClipType: { Intersection: EnumValue; Union: EnumValue; Difference: EnumValue; Xor: EnumValue };
  FillRule: { EvenOdd: EnumValue; NonZero: EnumValue };
  JoinType: { Square: EnumValue; Round: EnumValue; Miter: EnumValue };
  EndType: { Butt: EnumValue; Square: EnumValue; Round: EnumValue };
  Paths64: new () => Paths64;
  PathsD: new () => PathsD;
  MakePath64(xy: number[]): Path64;
  MakePathD(xy: number[]): PathD;
  BooleanOpD(clipType: EnumValue, fillRule: EnumValue, subjects: PathsD, clips: PathsD, precision: number): PathsD;
  UnionSelfD(subjects: PathsD, fillRule: EnumValue, precision: number): PathsD;
  InflatePaths64(
    paths: Paths64,
    delta: number,
    joinType: EnumValue,
    endType: EnumValue,
    miterLimit: number,
    arcTolerance: number,
  ): Paths64;
}

const NEEDED = ['MakePath64', 'MakePathD', 'BooleanOpD', 'UnionSelfD', 'InflatePaths64', 'Paths64', 'PathsD'] as const;

/** The decimal places Clipper2's double API keeps (its `precision`): 10⁻³ cm, far below the final snap. */
const PRECISION = 3;

let loaded: ClipperModule | null = null;
let loading: Promise<ClipperModule> | null = null;

/** Loads Clipper2's WebAssembly module once (idempotent; concurrent callers share one load). */
export async function loadClipper2(): Promise<void> {
  if (loaded !== null) return;
  if (loading === null) {
    loading = factory().then((m) => {
      const mod = m as Record<string, unknown>;
      for (const name of NEEDED) {
        if (mod[name] === undefined) throw new Error(`clipper2-wasm: the loaded module has no ${name}`);
      }
      return m as ClipperModule;
    });
  }
  loaded = await loading;
}

/** The loaded module; a call before `loadOracles()` is a test-kit usage error and throws (C-0144 (1)). */
function clipper(): ClipperModule {
  if (loaded === null) throw new Error('oracles: await loadOracles() before calling a Clipper2 oracle');
  return loaded;
}

/** Whether the module is loaded. */
export function clipper2Loaded(): boolean {
  return loaded !== null;
}

/** Integer rings into a Paths64 (rings of fewer than `min` distinct points left out); the caller deletes it. */
function paths64(c: ClipperModule, rings: readonly Ring[], min: number): Paths64 {
  const out = new c.Paths64();
  for (const raw of rings) {
    const r = dedupe(raw);
    if (r.length < min) continue;
    const xy: number[] = [];
    for (const p of r) xy.push(p.x, p.y);
    const path = c.MakePath64(xy);
    out.push_back(path);
    path.delete();
  }
  return out;
}

/** A Paths64 into our rings (Clipper2's output is integer already); deletes nothing it did not create. */
function readPaths64(paths: Paths64): Ring[] | null {
  const out: Ring[] = [];
  for (let i = 0; i < paths.size(); i += 1) {
    const path = paths.get(i);
    const v = path.view();
    const pts: [number, number][] = [];
    for (let k = 0; k + 2 < v.length; k += 3) pts.push([Number(v[k]), Number(v[k + 1])]);
    path.delete();
    const r = snapRing(pts);
    if (r === null) return null;
    if (r.length > 0) out.push(r);
  }
  return out;
}

function clipType(c: ClipperModule, op: BooleanOp): EnumValue {
  switch (op) {
    case 'union':
      return c.ClipType.Union;
    case 'intersection':
      return c.ClipType.Intersection;
    case 'difference':
      return c.ClipType.Difference;
    case 'xor':
      return c.ClipType.Xor;
  }
}

/** Integer rings into a PathsD (rings of fewer than three distinct points left out); the caller deletes it. */
function pathsD(c: ClipperModule, rings: readonly Ring[]): PathsD {
  const out = new c.PathsD();
  for (const raw of rings) {
    const r = dedupe(raw);
    if (r.length < 3) continue;
    const xy: number[] = [];
    for (const p of r) xy.push(p.x, p.y);
    const path = c.MakePathD(xy);
    out.push_back(path);
    path.delete();
  }
  return out;
}

/** A PathsD as rings of doubles [x, y]. */
function readPathsDRaw(paths: PathsD): [number, number][][] {
  const out: [number, number][][] = [];
  for (let i = 0; i < paths.size(); i += 1) {
    const path = paths.get(i);
    const v = path.view();
    const pts: [number, number][] = [];
    for (let k = 0; k + 2 < v.length; k += 3) pts.push([v[k], v[k + 1]]);
    path.delete();
    out.push(pts);
  }
  return out;
}

/** Rings of doubles snapped into our frame (§3.2 (7)); null when a point is refused. */
function snapAll(rings: readonly [number, number][][]): Ring[] | null {
  const out: Ring[] = [];
  for (const ring of rings) {
    const r = snapRing(ring);
    if (r === null) return null;
    if (r.length > 0) out.push(r);
  }
  return out;
}

/** Runs one library call: its throw becomes a refusal, its answer must pass the region check (C-0150). */
function checked(
  run: () => PathsD,
  op: BooleanOp,
  a: CheckOperand,
  b: CheckOperand,
): [number, number][][] {
  let res: PathsD;
  try {
    res = run();
  } catch (e) {
    throw new OracleRefusal('clipper2', `threw (${e instanceof Error ? e.message : String(e)})`);
  }
  const out = readPathsDRaw(res);
  res.delete();
  const r = regionCheck(op, a, b, out);
  if (!r.ok) throw new OracleRefusal('clipper2', wrongRegion(r));
  return out;
}

/**
 * Clipper2's boolean `a op b` under the fill rule (both operands), in doubles: through the library's double API at
 * `PRECISION` decimal places, because its integer API truncates every new intersection point toward zero (up to 1 cm
 * on each axis, measured on this machine), where our frame rounds to the nearest lattice point (§3.2 (1); C-0144 (1)).
 * Throws an `OracleRefusal` when the library throws or its region fails the check.
 */
export function clipper2BooleanRaw(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): [number, number][][] {
  const c = clipper();
  const pa = pathsD(c, a);
  const pb = pathsD(c, b);
  const fr = fill === 'nonzero' ? c.FillRule.NonZero : c.FillRule.EvenOdd;
  try {
    return checked(() => c.BooleanOpD(clipType(c, op), fr, pa, pb, PRECISION), op, checkOperand(a, fill), checkOperand(b, fill));
  } finally {
    // deleted whether or not the library throws, so a throwing case holds no WebAssembly memory (check note N-2)
    pa.delete();
    pb.delete();
  }
}

/** Clipper2's boolean in our frame: the double result snapped to the nearest lattice point (§3.2 (7)). */
export function clipper2Boolean(op: BooleanOp, a: readonly Ring[], b: readonly Ring[], fill: FillRule): Ring[] | null {
  return snapAll(clipper2BooleanRaw(op, a, b, fill));
}

/**
 * Clipper2's union of counter-clockwise pieces given in doubles (the buffer construction), snapped at the end; the
 * region check reads the pieces under the non-zero rule.
 */
export function clipper2UnionPieces(pieces: readonly (readonly [number, number])[][]): Ring[] | null {
  const c = clipper();
  const kept = pieces.filter((piece) => piece.length >= 3);
  const ps = new c.PathsD();
  for (const piece of kept) {
    const xy: number[] = [];
    for (const [x, y] of piece) xy.push(x, y);
    const path = c.MakePathD(xy);
    ps.push_back(path);
    path.delete();
  }
  try {
    return snapAll(
      checked(() => c.UnionSelfD(ps, c.FillRule.NonZero, PRECISION), 'union', { rings: kept, fill: 'nonzero' }, { rings: [], fill: 'nonzero' }),
    );
  } finally {
    ps.delete();
  }
}

/**
 * Clipper2's own offsetting (`InflatePaths64`) of open chains at one half-width — an algorithm independent of the
 * strip-and-join construction, whose round and square joins and butt, square and round ends match §3.7's (equal arc
 * steps, the square cut at the half-width). Used to check the construction (`test/oracles/`), never as an oracle
 * result: its over-limit miter cuts at the half-width where §3.7 cuts at twice it (C-0144 (4)).
 */
export function clipper2Inflate(
  chains: readonly Ring[],
  halfWidthCm: number,
  joins: 'round' | 'square',
  ends: EndKind,
  arcToleranceCm: number,
): Ring[] | null {
  const c = clipper();
  const ps = paths64(c, chains, 2);
  const jt = joins === 'round' ? c.JoinType.Round : c.JoinType.Square;
  const et = ends === 'flat' ? c.EndType.Butt : ends === 'square' ? c.EndType.Square : c.EndType.Round;
  let res: Paths64;
  try {
    res = c.InflatePaths64(ps, halfWidthCm, jt, et, 2, arcToleranceCm);
  } finally {
    ps.delete();
  }
  const out = readPaths64(res);
  res.delete();
  return out;
}
