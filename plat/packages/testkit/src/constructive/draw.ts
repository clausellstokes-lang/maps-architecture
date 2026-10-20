// The constructive set's draw and placement helpers (M0-k-02; §13.1 (2): "every degenerate class is built on purpose
// from random parameters"). A case draws its parameters from a stream keyed by the case's id and the seed —
// xoshiro128** (the kernel's `Stream`, §6.1) over H128("constructive/<id>/<seed>") — so a draw is a function of
// (id, seed) alone, the same on every host. A case builds its degeneracy in local integer coordinates, where the
// claim is exact (a point on a segment by gcd stepping, a vertex 25.3 cm from a kerb), and places it with a symmetry of
// the square lattice and a translation: a lattice isometry, so every incidence, distance and touch survives exactly.
// Rotations by arbitrary angles go through `dmath` (fdlibm to the bit, §6.5 (2)) and `snap` — the one door (§3.2 (7)).
import { H128, Stream, dmath, snap, utf8Bytes, type LatticePoint, type Seed } from '@plat/kernel';
import type {
  ConstructiveCase,
  ConstructiveClass,
  ConstructiveDeferred,
  ConstructiveExpect,
  ConstructiveInput,
  ConstructiveMilestone,
  ConstructiveParam,
  ConstructiveStep,
  ConstructiveVerdict,
  ConstructiveDegenerateKind,
} from './types.js';

/** The largest |coordinate| `snap` accepts: 2²³ − 1 (§3.2 (1)). */
export const RANGE_MAX = 8_388_607;

/** `LatticeSpec.minEdgeCm` and `attractCm` (§2.2), as the cases' geometry reads them. */
export const MIN_EDGE = 25;
export const ATTRACT = 26;

/** A local integer point, before placement. */
export interface P {
  x: number;
  y: number;
}

/** A seed must be a u32 (§2.1's `Seed`); anything else is a usage error. */
export function checkSeed(seed: Seed): number {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError(`constructive: a seed is an integer in [0, 2³² − 1], got ${String(seed)}`);
  }
  return seed;
}

/** A case's draw: the kernel's stream over H128("constructive/<id>/<seed>"). */
export class Draw {
  private readonly s: Stream;
  constructor(
    readonly id: string,
    readonly seed: Seed,
  ) {
    this.s = new Stream(H128(utf8Bytes(`constructive/${id}/${String(checkSeed(seed))}`)));
  }

  /** A uniform integer in [lo, hi]. */
  int(lo: number, hi: number): number {
    return this.s.int(lo, hi);
  }

  /**
   * An integer in [lo, hi] (0 ≤ lo ≤ hi), log-uniform by octave — an octave [2ᵉ, 2ᵉ⁺¹) drawn first, then a place in
   * it, 0 its own octave when lo is 0 — so small and large sizes are both drawn.
   */
  log(lo: number, hi: number): number {
    if (!(Number.isInteger(lo) && Number.isInteger(hi) && lo >= 0 && lo <= hi)) {
      throw new RangeError(`${this.id}: Draw.log needs integers 0 ≤ lo ≤ hi, got [${String(lo)}, ${String(hi)}]`);
    }
    let e0 = lo === 0 ? -1 : 0;
    while (lo > 0 && 2 ** (e0 + 1) <= lo) e0 += 1;
    let e1 = Math.max(e0, 0);
    while (2 ** (e1 + 1) <= hi) e1 += 1;
    if (hi === 0) return 0;
    const e = this.s.int(e0, e1);
    if (e < 0) return 0;
    return this.s.int(Math.max(lo, 2 ** e), Math.min(hi, 2 ** (e + 1) - 1));
  }

  /** One of the items, uniformly. */
  pick<T>(items: readonly T[]): T {
    return items[this.s.int(0, items.length - 1)];
  }

  /** ±1. */
  sign(): 1 | -1 {
    return this.s.int(0, 1) === 0 ? 1 : -1;
  }

  /** A fair coin. */
  bool(): boolean {
    return this.s.int(0, 1) === 1;
  }
}

/** A lattice point through `snap`; a refusal is a generator bug and throws, naming the case. */
export function lp(x: number, y: number, id = 'constructive'): LatticePoint {
  const s = snap(x, y);
  if (!s.ok) throw new Error(`${id}: a generator built a point snap refuses (${String(x)}, ${String(y)}): ${s.code} ${s.detail}`);
  return s.value;
}

/** Local geometry, named, before placement. */
export interface Geo {
  points?: Record<string, P>;
  pointSets?: Record<string, P[]>;
  chains?: Record<string, P[]>;
  rings?: Record<string, P[]>;
}

/** The eight symmetries of the square lattice: (x, y) → (a·x + b·y, c·x + d·y). */
const SYMMETRIES: readonly (readonly [number, number, number, number])[] = Object.freeze([
  [1, 0, 0, 1],
  [0, -1, 1, 0],
  [-1, 0, 0, -1],
  [0, 1, -1, 0],
  [-1, 0, 0, 1],
  [1, 0, 0, -1],
  [0, 1, 1, 0],
  [0, -1, -1, 0],
]);

/** Every point of local geometry. */
function allPoints(g: Geo): P[] {
  const out: P[] = [];
  for (const p of Object.values(g.points ?? {})) out.push(p);
  for (const s of [g.pointSets, g.chains, g.rings]) for (const ps of Object.values(s ?? {})) out.push(...ps);
  return out;
}

/** Placed geometry: lattice points, with every ring kept in its orientation. */
export interface Placed {
  points: Record<string, LatticePoint>;
  pointSets: Record<string, LatticePoint[]>;
  chains: Record<string, LatticePoint[]>;
  rings: Record<string, LatticePoint[]>;
  /**
   * Whether the drawn symmetry was a reflection — so a ring's placed vertex i is its local vertex (n − i) mod n
   * (`placedRingIndex`). Never part of a case's input (`makeInput` copies the four geometry records only).
   */
  reflected?: boolean;
}

/**
 * Places local geometry by a drawn lattice isometry — one of the square's eight symmetries, then a translation that
 * keeps every point within ±limit (default 2²³ − 1). A reflection reverses rings, so each keeps its orientation (an
 * outer ring counter-clockwise, a hole clockwise); a ring's vertex list is reversed from its second vertex, its first
 * vertex kept. `fixed` places without moving (identity, no translation); `translateOnly` translates without turning
 * (a case whose angle is its parameter).
 */
export function place(d: Draw, g: Geo, opts: { limit?: number; fixed?: boolean; translateOnly?: boolean } = {}): Placed {
  const limit = opts.limit ?? RANGE_MAX;
  const [a, b, c, e] = opts.fixed === true || opts.translateOnly === true ? SYMMETRIES[0] : SYMMETRIES[d.int(0, 7)];
  const map = (p: P): P => ({ x: a * p.x + b * p.y, y: c * p.x + e * p.y });
  const pts = allPoints(g).map(map);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  if (pts.length > 0 && (maxX - minX > 2 * limit || maxY - minY > 2 * limit)) {
    throw new Error(`${d.id}: a construction of extent ${String(maxX - minX)} × ${String(maxY - minY)} cannot fit in ±${String(limit)}`);
  }
  let tx = 0;
  let ty = 0;
  if (pts.length > 0 && opts.fixed !== true) {
    tx = d.int(-limit - minX, limit - maxX);
    ty = d.int(-limit - minY, limit - maxY);
  }
  const reflect = a * e - b * c < 0;
  const to = (p: P): LatticePoint => {
    const q = map(p);
    return lp(q.x + tx, q.y + ty, d.id);
  };
  const ring = (r: P[]): LatticePoint[] => {
    const m = r.map(to);
    return reflect && m.length > 2 ? [m[0], ...m.slice(1).reverse()] : m;
  };
  const rec = <T, U>(o: Record<string, T> | undefined, f: (v: T) => U): Record<string, U> => {
    const out: Record<string, U> = {};
    for (const k of Object.keys(o ?? {}).sort()) out[k] = f((o as Record<string, T>)[k]);
    return out;
  };
  return {
    points: rec(g.points, to),
    pointSets: rec(g.pointSets, (s) => s.map(to)),
    chains: rec(g.chains, (s) => s.map(to)),
    rings: rec(g.rings, ring),
    reflected: reflect,
  };
}

/** The placed index of a ring's local vertex i (a reflection keeps vertex 0 and reverses the rest, `place`). */
export function placedRingIndex(placed: Placed, n: number, i: number): number {
  return placed.reflected === true && i > 0 ? n - i : i;
}

/** `resolve`'s vertex order: by y, then x (the kernel's `compareVertices`). */
export function compareYX(p: P, q: P): number {
  return p.y !== q.y ? (p.y < q.y ? -1 : 1) : p.x !== q.x ? (p.x < q.x ? -1 : 1) : 0;
}

/** A profiled line rewritten in chain order, its knots renumbered along it (`inChainOrder`). */
export interface ChainOrdered {
  /** The line's vertices in `resolve`'s chain order. */
  line: LatticePoint[];
  /** The knots as indices into `line`, strictly ascending: ordinal i is the i-th knot along the chain. */
  knots: number[];
  /** The knots' values, in the same order. */
  values: number[];
  /** A placed vertex index's index in `line`. */
  index: (i: number) => number;
}

/**
 * A profiled line in `resolve`'s chain order (§2.2 rule 5: a join "concatenates their knots in chain order"; C-0185 (6),
 * (7); C-0191): an open chain from its lower (y, x) end, a ring counter-clockwise from its lowest-leftmost vertex. The
 * line's vertex list is rewritten to run that way, and the knots — placed vertex indices, one value each — are renumbered
 * so that ordinal i is the i-th knot along the chain, as the kernel numbers them after a rekey; a split and a re-join then
 * give the profile back bit for bit. A ring must already turn counter-clockwise (an assertion).
 */
export function inChainOrder(line: readonly LatticePoint[], closed: boolean, knots: readonly number[], values: readonly number[]): ChainOrdered {
  const n = line.length;
  if (knots.length !== values.length || new Set(knots).size !== knots.length || knots.some((k) => !Number.isInteger(k) || k < 0 || k >= n)) {
    throw new Error('inChainOrder: the knots must be distinct vertex indices of the line, one value each');
  }
  let index: (i: number) => number;
  if (closed) {
    let a2 = 0;
    for (let i = 0; i < n; i += 1) {
      const p = line[i];
      const q = line[(i + 1) % n];
      a2 += p.x * q.y - q.x * p.y;
    }
    if (!(a2 > 0)) throw new Error('inChainOrder: a profiled ring must turn counter-clockwise');
    let low = 0;
    for (let i = 1; i < n; i += 1) if (compareYX(line[i], line[low]) < 0) low = i;
    index = (i) => (i - low + n) % n;
  } else {
    const flip = compareYX(line[n - 1], line[0]) < 0;
    index = flip ? (i) => n - 1 - i : (i) => i;
  }
  const out: LatticePoint[] = new Array<LatticePoint>(n);
  for (let i = 0; i < n; i += 1) out[index(i)] = line[i];
  const pairs = knots.map((k, j) => [index(k), values[j]] as const).sort((u, v) => u[0] - v[0]);
  return { line: out, knots: pairs.map((u) => u[0]), values: pairs.map((u) => u[1]), index };
}

/** Points turned by `angle` radians about `centre` (doubles, `dmath`) and snapped. */
export function turned(points: readonly P[], angle: number, centre: P, id: string): P[] {
  const cs = dmath.cos(angle);
  const sn = dmath.sin(angle);
  return points.map((p) => {
    const dx = p.x - centre.x;
    const dy = p.y - centre.y;
    const q = lp(centre.x + dx * cs - dy * sn, centre.y + dx * sn + dy * cs, id);
    return { x: q.x, y: q.y };
  });
}

/** An axis-aligned rectangle, counter-clockwise from its lower-left corner. */
export function rect(x0: number, y0: number, w: number, h: number): P[] {
  return [
    { x: x0, y: y0 },
    { x: x0 + w, y: y0 },
    { x: x0 + w, y: y0 + h },
    { x: x0, y: y0 + h },
  ];
}

/** The ring reversed (a clockwise hole from a counter-clockwise outline), its first vertex kept. */
export function cw(r: readonly P[]): P[] {
  return [r[0], ...r.slice(1).reverse()];
}

/** gcd(|a|, |b|). */
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

/** A primitive direction with |components| in [1, max], drawn (not both zero; gcd 1). */
export function primitiveDir(d: Draw, max: number): P {
  for (;;) {
    const x = d.int(-max, max);
    const y = d.int(-max, max);
    if ((x !== 0 || y !== 0) && gcd(x, y) === 1) return { x, y };
  }
}

/** An input, its records frozen. */
export function makeInput(
  id: string,
  seed: Seed,
  placed: Partial<Placed>,
  params: Record<string, ConstructiveParam> = {},
  steps: ConstructiveStep[] = [],
): ConstructiveInput {
  return Object.freeze({
    kind: 'input' as const,
    id,
    seed,
    points: Object.freeze({ ...(placed.points ?? {}) }),
    pointSets: Object.freeze({ ...(placed.pointSets ?? {}) }),
    chains: Object.freeze({ ...(placed.chains ?? {}) }),
    rings: Object.freeze({ ...(placed.rings ?? {}) }),
    params: Object.freeze({ ...params }),
    steps: Object.freeze(steps.map((s) => Object.freeze({ op: s.op, args: Object.freeze({ ...s.args }) }))),
  });
}

/** A scenario step. */
export function step(op: string, args: Record<string, string | number | boolean> = {}): ConstructiveStep {
  return { op, args };
}

/** Every lattice point of an input (its points, point sets, chains and rings). */
export function constructiveCoords(input: ConstructiveInput): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const p of Object.values(input.points)) out.push(p);
  for (const s of [input.pointSets, input.chains, input.rings]) for (const ps of Object.values(s)) out.push(...ps);
  return out;
}

/** The fields of an M0 case its module states. */
export interface M0CaseSpec {
  id: string;
  class: ConstructiveClass;
  source: string;
  ops: readonly string[];
  expect: ConstructiveExpect;
  sweep?: number;
  ladder?: { failureClass: 'F-NUM' | 'F-SKELETON'; kind: ConstructiveDegenerateKind };
  /** Builds the draw's input from its stream. */
  build: (d: Draw) => ConstructiveInput;
  witness?: (input: ConstructiveInput) => string | null;
  run?: (input: ConstructiveInput) => ConstructiveVerdict;
}

/** An M0 case: its generator draws from the case's stream; a numeric-core case is one that carries `run`. */
export function m0Case(spec: M0CaseSpec): ConstructiveCase {
  const c: ConstructiveCase = {
    id: spec.id,
    class: spec.class,
    milestone: 'M0',
    source: spec.source,
    ops: Object.freeze([...spec.ops]),
    numericCore: spec.run !== undefined,
    ...(spec.sweep !== undefined ? { sweep: spec.sweep } : {}),
    ...(spec.ladder !== undefined ? { ladder: Object.freeze({ ...spec.ladder }) } : {}),
    generate: (seed: Seed) => spec.build(new Draw(spec.id, seed)),
    expect: freezeExpect(spec.expect),
    ...(spec.witness !== undefined ? { witness: spec.witness } : {}),
    ...(spec.run !== undefined ? { run: spec.run } : {}),
  };
  return Object.freeze(c);
}

/** The fields of a deferred case its module states. */
export interface DeferredCaseSpec {
  id: string;
  class: ConstructiveClass;
  milestone: Exclude<ConstructiveMilestone, 'M0'>;
  source: string;
  ops: readonly string[];
  expect: ConstructiveExpect;
}

/** A deferred case: its generator is a stub returning `deferred` with the tag (C-0038), whatever the seed. */
export function deferredCase(spec: DeferredCaseSpec): ConstructiveCase {
  const stub: ConstructiveDeferred = Object.freeze({ kind: 'deferred' as const, id: spec.id, milestone: spec.milestone });
  return Object.freeze({
    id: spec.id,
    class: spec.class,
    milestone: spec.milestone,
    source: spec.source,
    ops: Object.freeze([...spec.ops]),
    numericCore: false,
    generate: (seed: Seed) => {
      checkSeed(seed);
      return stub;
    },
    expect: freezeExpect(spec.expect),
  });
}

function freezeExpect(e: ConstructiveExpect): ConstructiveExpect {
  return Object.freeze({
    ...e,
    holds: Object.freeze([...e.holds]),
    ...(e.staticHolds !== undefined ? { staticHolds: Object.freeze([...e.staticHolds]) } : {}),
    ...(e.codes !== undefined ? { codes: Object.freeze([...e.codes]) } : {}),
    ...(e.warnings !== undefined ? { warnings: Object.freeze([...e.warnings]) } : {}),
  });
}
