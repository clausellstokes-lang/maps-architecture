// Support for M0-a-08's oracle-agreement tests (§3.7 "Oracles, not fallbacks", §13.1's differential agreement; the
// placement of C-0122): the cases — M0-k-01's arbitraries and the booleans, buffer, offsetFace and inset cases of
// M0-k-02's constructive set — and the judge that runs our operation (reached only through @plat/kernel's export, the
// arr/index.ts lines of M0-a-08), each oracle (M0-k-03), the split comparison and the report. Every case records its
// verdict against each oracle in an `OracleReport`, so the report carries both shares per operation and the
// unattracted draw count §13.1's vacuity guard reads. Our output is also held to the hard ring checks on EVERY case
// (§3.7 (i): "0 invalid outputs"), not only on the attracted side the comparison checks.
import fc from 'fast-check';
import {
  attachIndex,
  booleans,
  buffer,
  createPlat,
  faceEdges,
  faceHoles,
  insertChain,
  insertTx,
  insetRing,
  isFaceLive,
  offsetFace,
  snap,
  type Cm,
  type FaceId,
  type InsertTx,
  type KernelResult,
  type LatticePoint,
  type PlatKey,
  type Warning,
} from '@plat/kernel';
import { arb } from '../../../src/fuzz/index.js';
import { constructiveCase } from '../../../src/constructive/index.js';
import type { ConstructiveInput } from '../../../src/constructive/types.js';
import { compareSplit, oracleBoolean, oracleBuffer, OracleReport, type OracleResult, type Verdict } from '../../../src/oracles/index.js';
import { ringProblems, perimeterOf } from '../../../src/oracles/rings.js';
import { ORACLE_ENGINES, type BooleanOp, type EndKind, type FillRule, type JoinKind, type OracleEngine, type Ring } from '../../../src/oracles/types.js';

/** Every generated coordinate lies in ±2¹⁶ cm (M0-k-01's smallest range), so two operands meet often. */
export const LIMIT_CM = 65_536;

/**
 * At every size the unattracted cases must make at least this share of an operation's draws (C-0193 (6)): with
 * `min(10⁵, ⌈share × runs⌉)` asserted, the nightly 10⁶ run asserts §13.1's 10⁵ guard and the PR's 10⁴ a floor of 2 500.
 */
export const MIN_UNATTRACTED_SHARE = 0.25;

/** One operand: its rings (outer counter-clockwise, holes clockwise; a self-touching or crossing ring as drawn). */
export type Operand = LatticePoint[][];

const sized = { limitCm: LIMIT_CM, sizeCm: [300, 30_000] as const };

/** The operand families of M0-k-01 (§13.1 (1)): simple, holed, thin, near-collinear, self-touching, snapped regular. */
export const operandArb: fc.Arbitrary<Operand> = fc.oneof(
  { weight: 4, arbitrary: arb.polygon({ ...sized, vertices: [3, 16] }).map((r) => [r]) },
  { weight: 2, arbitrary: arb.holedPolygon({ ...sized, holes: [1, 2] }).map((h) => h.polygon.map((r) => r.slice())) },
  { weight: 1, arbitrary: arb.thin({ limitCm: LIMIT_CM }).map((r) => [r]) },
  { weight: 1, arbitrary: arb.nearCollinear({ limitCm: LIMIT_CM }).map((r) => [r]) },
  { weight: 1, arbitrary: arb.selfTouching({ limitCm: LIMIT_CM }).map((r) => [r]) },
  { weight: 2, arbitrary: arb.regularSnapped({ limitCm: LIMIT_CM, sizeCm: [300, 30_000] }).map((r) => [r]) },
);

function translated(o: Operand, dx: number, dy: number): Operand {
  return o.map((r) => r.map((p) => ({ x: (p.x + dx) as Cm, y: (p.y + dy) as Cm })));
}

function inRange(o: Operand): boolean {
  return o.every((r) => r.every((p) => Math.abs(p.x) < 1 << 22 && Math.abs(p.y) < 1 << 22));
}

/** The constructive case's draw (an M0 case: an input), by id and fast-check's seed. */
function drawCase(id: string, seed: number): ConstructiveInput {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(`support: no constructive case ${id}`);
  const d = c.generate(seed);
  if (d.kind !== 'input') throw new Error(`support: ${id} is deferred`);
  return d;
}

const seedArb = fc.integer({ min: 0, max: 0x7fff_ffff });

/** A boolean case: the operation, the fill rule, the two operands and where they came from. */
export interface BooleanCase {
  op: BooleanOp;
  fill: FillRule;
  a: Operand;
  b: Operand;
  source: string;
}

const fillArb = fc.constantFrom<FillRule>('nonzero', 'evenodd');

/** Boolean operands for one operation: two independent draws, a draw and its small translate, or M0-k-02's empty case. */
export function booleanCaseArb(op: BooleanOp): fc.Arbitrary<BooleanCase> {
  const independent = fc.record({ a: operandArb, b: operandArb, fill: fillArb }).map(({ a, b, fill }) => ({ op, fill, a, b, source: 'arb' }));
  const shifted = fc
    .record({ a: operandArb, dx: fc.integer({ min: -3_000, max: 3_000 }), dy: fc.integer({ min: -3_000, max: 3_000 }), fill: fillArb })
    .map(({ a, dx, dy, fill }) => ({ op, fill, a, b: translated(a, dx, dy), source: 'arb-shifted' }));
  const constructive = seedArb.map((seed) => {
    const d = drawCase('limit/no-input-booleans-empty', seed);
    return { op, fill: 'nonzero' as FillRule, a: [d.rings.a.slice()], b: [d.rings.b.slice()], source: 'limit/no-input-booleans-empty' };
  });
  return fc
    .oneof({ weight: 6, arbitrary: independent }, { weight: 3, arbitrary: shifted }, { weight: 1, arbitrary: constructive })
    .filter((c) => inRange(c.a) && inRange(c.b));
}

/** A buffer case. */
export interface BufferCase {
  chains: LatticePoint[][];
  w: number | number[];
  joins: JoinKind;
  ends: EndKind;
  source: string;
}

const joinArb = fc.constantFrom<JoinKind>('round', 'square', 'miter');
const endArb = fc.constantFrom<EndKind>('round', 'square', 'flat');

const chainArb: fc.Arbitrary<LatticePoint[]> = fc.oneof(
  { weight: 4, arbitrary: arb.chain({ limitCm: LIMIT_CM, vertices: [2, 12], sizeCm: [50, 5_000] }) },
  { weight: 2, arbitrary: arb.stroke({ limitCm: LIMIT_CM, sizeCm: [200, 16_000] }) },
  { weight: 1, arbitrary: arb.thin({ limitCm: LIMIT_CM, shape: 'chain' }) },
  { weight: 1, arbitrary: arb.nearCollinear({ limitCm: LIMIT_CM, shape: 'chain' }) },
);

/** Buffer cases: 1–3 chains, one half-width or one per point, every join and end; and M0-k-02's buffer cases. */
export const bufferCaseArb: fc.Arbitrary<BufferCase> = fc.oneof(
  {
    weight: 8,
    arbitrary: fc
      .record({
        chains: fc.array(chainArb, { minLength: 1, maxLength: 3 }),
        uniform: fc.boolean(),
        w: fc.integer({ min: 1, max: 2_000 }),
        ws: fc.array(fc.integer({ min: 1, max: 2_000 }), { minLength: 128, maxLength: 128 }),
        joins: joinArb,
        ends: endArb,
      })
      .map(({ chains, uniform, w, ws, joins, ends }) => {
        const n = chains.reduce((s, c) => s + c.length, 0);
        const per = Array.from({ length: n }, (_, i) => ws[i % ws.length]);
        return { chains, w: uniform ? w : per, joins, ends, source: 'arb' };
      }),
  },
  {
    weight: 2,
    arbitrary: fc
      .record({ id: fc.constantFrom('further/buffer-miter-joins', 'further/buffer-square-joins', 'further/buffer-flat-ends', 'limit/no-input-buffer-empty'), seed: seedArb })
      .map(({ id, seed }) => {
        const d = drawCase(id, seed);
        const p = d.params;
        return {
          chains: Object.values(d.chains).map((c) => c.slice()),
          w: Number(p.halfWidthCm),
          joins: p.joins as JoinKind,
          ends: p.ends as EndKind,
          source: id,
        };
      }),
  },
).filter((c) => c.chains.every((ch) => ch.every((p) => Math.abs(p.x) < 1 << 22 && Math.abs(p.y) < 1 << 22)));

/** A face case: the rings entered into an arena, the distance(s) and where they came from. */
export interface FaceCase {
  rings: LatticePoint[][];
  /** offsetFace: one distance, or a list cycled over the face's edges. insetRing: dists[0]. */
  dists: number[];
  source: string;
}

/** Faces for offsetFace: simple and holed polygons, snapped regular rings; and M0-k-02's empty-offset case. */
export const offsetCaseArb: fc.Arbitrary<FaceCase> = fc.oneof(
  {
    weight: 9,
    arbitrary: fc
      .record({
        rings: fc.oneof(
          arb.polygon({ ...sized, vertices: [3, 14] }).map((r) => [r]),
          arb.holedPolygon({ ...sized, holes: [1, 2] }).map((h) => h.polygon.map((r) => r.slice())),
          arb.regularSnapped({ limitCm: LIMIT_CM, sizeCm: [300, 30_000] }).map((r) => [r]),
        ),
        dists: fc.array(fc.integer({ min: 0, max: 3_000 }), { minLength: 1, maxLength: 6 }),
      })
      .map(({ rings, dists }) => ({ rings, dists, source: 'arb' })),
  },
  {
    weight: 1,
    arbitrary: seedArb.map((seed) => {
      const d = drawCase('limit/no-input-offsetface-empty', seed);
      return { rings: [d.rings.face.slice()], dists: (d.params.perEdgeCm as readonly number[]).slice(), source: 'limit/no-input-offsetface-empty' };
    }),
  },
);

/** Convex faces and distances for insetRing: snapped regular rings, rotated rectangles; and M0-k-02's inset cases. */
export const insetCaseArb: fc.Arbitrary<FaceCase> = fc.oneof(
  {
    weight: 8,
    arbitrary: fc
      .record({
        ring: fc.oneof(arb.regularSnapped({ limitCm: LIMIT_CM, sizeCm: [300, 30_000] }), arb.polygon({ ...sized, vertices: [3, 3] })),
        d: fc.oneof(fc.integer({ min: -3_000, max: 3_000 }), fc.integer({ min: 0, max: 30_000 })),
      })
      .map(({ ring, d }) => ({ rings: [ring], dists: [d], source: 'arb' })),
  },
  {
    weight: 2,
    arbitrary: fc
      .record({ id: fc.constantFrom('further/inset-zero', 'further/inset-negative', 'further/inset-non-convex', 'limit/no-input-insetring-empty'), seed: seedArb })
      .map(({ id, seed }) => {
        const d = drawCase(id, seed);
        return { rings: [d.rings.face.slice()], dists: [Number(d.params.dCm)], source: id };
      }),
  },
);

// ── the arena a face service reads ──

const KEY: PlatKey = { layer: 'ground', part: 0 };

/** The rings entered as closed chains into a fresh arena and the bounded face holding every hole; null when the arena refused them. */
export function arenaFace(rings: readonly (readonly LatticePoint[])[]): { tx: InsertTx; face: FaceId } | null {
  const plat = createPlat(KEY, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(plat, { gridCellCm: 1_024 });
  const tx = insertTx(plat, 0);
  for (let i = 0; i < rings.length; i += 1) {
    const r = insertChain(tx, rings[i].slice(), [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', { closed: true });
    if (!r.ok) return null;
  }
  let face = -1;
  let best = -1;
  for (let f = 0; f < plat.slots.face[0].top; f += 1) {
    if (!isFaceLive(plat, 0, f)) continue;
    const h = faceHoles(plat, 0, f).length;
    if (h > best) {
      best = h;
      face = f;
    }
  }
  return face < 0 ? null : { tx, face };
}

/** The face's rings, read back from `faceEdges` (the order the distances follow). */
export function ringsOfEdges(edges: readonly { a: LatticePoint; b: LatticePoint }[]): Ring[] {
  const out: Ring[] = [];
  let cur: LatticePoint[] = [];
  for (let i = 0; i < edges.length; i += 1) {
    const e = edges[i];
    cur.push(e.a);
    const next = edges[i + 1];
    if (next === undefined || next.a.x !== e.b.x || next.a.y !== e.b.y || (cur[0].x === e.b.x && cur[0].y === e.b.y)) {
      out.push(cur);
      cur = [];
    }
  }
  return out;
}

/** Is the ring convex — every turn a left turn or straight (exact, BigInt), and counter-clockwise? */
export function convexCcw(ring: readonly LatticePoint[]): boolean {
  const n = ring.length;
  if (n < 3) return false;
  let left = 0;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    const c = ring[(i + 2) % n];
    const o = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    if (o < 0n) return false;
    if (o > 0n) left += 1;
  }
  return left > 0;
}

// ── the oracle side of the face services ──

function snapped(x: number, y: number): LatticePoint {
  const s = snap(x, y);
  if (!s.ok) throw new Error(`support: oracle point out of range ${String(x)}, ${String(y)}`);
  return s.value;
}

/**
 * The oracle's offsetFace: the face less the union of every edge's round-ended buffer at its own distance, both
 * through the engine's own boolean (§3.4's definition, "face − ⋃ buffer(edgeᵢ, dᵢ)"). The perimeter is the face's and
 * the result's boundary length (the two operands' perimeter of §3.7, the edges' buffers standing for the face's edges).
 */
export function oracleOffset(rings: readonly Ring[], edges: readonly { a: LatticePoint; b: LatticePoint }[], d: readonly number[], engine: OracleEngine): OracleResult {
  const chains: LatticePoint[][] = [];
  const ws: number[] = [];
  edges.forEach((e, i) => {
    if (d[i] > 0) {
      chains.push([e.a, e.b]);
      ws.push(d[i], d[i]);
    }
  });
  if (chains.length === 0) return { ok: true, engine, rings: rings.map((r) => r.slice()), perimeterCm: 2 * perimeterOf(rings) };
  const buf = oracleBuffer(chains, ws, 'round', 'round', engine);
  if (!buf.ok) return buf;
  const res = oracleBoolean('difference', rings, buf.rings, 'nonzero', engine);
  if (!res.ok) return res;
  return { ...res, perimeterCm: perimeterOf(rings) + perimeterOf(res.rings) };
}

/**
 * The oracle's insetRing of a convex counter-clockwise ring by dCm (inward when positive, outward when negative): a box
 * well beyond the result less, for every edge, the half-plane strip on the far side of the edge's line moved by dCm —
 * a long quadrilateral, its corners snapped — through the engine's own boolean. No half-plane clipping of ours is used.
 */
export function oracleInset(ring: Ring, dCm: number, engine: OracleEngine): OracleResult {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of ring) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x);
    y1 = Math.max(y1, p.y);
  }
  const E = 1 << 21;
  const box: Ring = [snapped(x0 - E, y0 - E), snapped(x1 + E, y0 - E), snapped(x1 + E, y1 + E), snapped(x0 - E, y1 + E)];
  const strips: Ring[] = [];
  const n = ring.length;
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % n];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const ux = (b.x - a.x) / len;
    const uy = (b.y - a.y) / len;
    // the inward (left) normal of a counter-clockwise ring
    const nx = -uy;
    const ny = ux;
    const L = 4 * E;
    const p = (s: number, t: number): LatticePoint => snapped(a.x + s * ux + t * nx, a.y + s * uy + t * ny);
    strips.push([p(-L, dCm - L), p(len + L, dCm - L), p(len + L, dCm), p(-L, dCm)]);
  }
  const res = oracleBoolean('difference', [box], strips, 'nonzero', engine);
  if (!res.ok) return res;
  return { ...res, perimeterCm: perimeterOf([ring]) + perimeterOf(res.rings) };
}

// ── snapping the oracle's rings (§3.7: "equal face counts after both are snapped") ──

/** Does the segment p → q meet the closed unit pixel centred on (cx, cy)? (Liang–Barsky against the pixel's box.) */
function meetsPixel(px: number, py: number, qx: number, qy: number, cx: number, cy: number): number | null {
  let t0 = 0;
  let t1 = 1;
  const dx = qx - px;
  const dy = qy - py;
  const clip = (p: number, q: number): boolean => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
    return true;
  };
  const h = 0.5;
  if (!clip(-dx, px - (cx - h)) || !clip(dx, cx + h - px) || !clip(-dy, py - (cy - h)) || !clip(dy, cy + h - py)) return null;
  return (t0 + t1) / 2;
}

/**
 * The oracle's rings snap-rounded (C-0195 (2)): the hot pixels are the unit pixels centred on every vertex of the rings and
 * on every crossing of two of their edges, rounded to the nearest lattice point; each edge is replaced by the path
 * through the centres of the hot pixels it meets, in order along it (Hobby's snap rounding). The oracle's doubles are
 * rounded point by point, so where the exact result has two pieces touching at a point inside an edge the rounded
 * rings may cross or overlap that point by a fraction of a centimetre, and the face count reads one face where the
 * region has two. Our engine's rings are snap-rounded by the insertion rules, so this is the oracle's half of "after
 * both are snapped". The area is unchanged within ½ cm × the perimeter.
 */
export function snapRoundRings(rings: readonly Ring[]): Ring[] {
  const segs: [LatticePoint, LatticePoint][] = [];
  for (const r of rings) for (let i = 0; i < r.length; i += 1) segs.push([r[i], r[(i + 1) % r.length]]);
  const hot = new Map<string, LatticePoint>();
  const addHot = (x: number, y: number): void => {
    const rx = Math.round(x);
    const ry = Math.round(y);
    hot.set(`${String(rx)},${String(ry)}`, { x: rx as Cm, y: ry as Cm });
  };
  for (const r of rings) for (const p of r) addHot(p.x, p.y);
  for (let i = 0; i < segs.length; i += 1) {
    const [a, b] = segs[i];
    for (let j = i + 1; j < segs.length; j += 1) {
      const [c, d] = segs[j];
      const den = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
      if (den === 0) continue;
      const t = ((c.x - a.x) * (d.y - c.y) - (c.y - a.y) * (d.x - c.x)) / den;
      const u = ((c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x)) / den;
      if (t > 0 && t < 1 && u > 0 && u < 1) addHot(a.x + t * (b.x - a.x), a.y + t * (b.y - a.y));
    }
  }
  const pixels = [...hot.values()];
  const out: Ring[] = [];
  for (const r of rings) {
    const ring: LatticePoint[] = [];
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const on: [number, LatticePoint][] = [];
      for (const h of pixels) {
        const t = meetsPixel(a.x, a.y, b.x, b.y, h.x, h.y);
        if (t !== null) on.push([t, h]);
      }
      on.sort((x, y) => x[0] - y[0]);
      for (const [, h] of on) {
        const last = ring[ring.length - 1];
        if (last === undefined || last.x !== h.x || last.y !== h.y) ring.push(h);
      }
    }
    while (ring.length > 1 && ring[0].x === ring[ring.length - 1].x && ring[0].y === ring[ring.length - 1].y) ring.pop();
    if (ring.length >= 3) out.push(ring);
  }
  return out;
}

// ── the judge ──

/** Faults of ours found on any case, attracted or not: a typed failure we must not give, an invalid ring set. */
export function ownProblems(ours: KernelResult<Ring[]> | readonly Ring[]): string[] {
  if (Array.isArray(ours)) return ringProblems(ours as Ring[]).map((p) => `invalid: ${p}`);
  const r = ours as KernelResult<Ring[]>;
  if (r.ok) return ringProblems(r.value).map((p) => `invalid: ${p}`);
  return [];
}

/** The warnings of our result (an empty result's refusal carries them, C-0193 (4)). */
export function warningsOf(ours: KernelResult<Ring[]>): Warning[] {
  if (ours.ok) return ours.warnings;
  const w = (ours as { warnings?: Warning[] }).warnings;
  return w ?? [];
}

/** A harness run's tallies besides the report: invalid outputs, crashes, and the cases a typed refusal settled. */
export interface Harness {
  report: OracleReport;
  invalid: string[];
  failures: string[];
  /** Cases settled without an oracle (E_NON_CONVEX on a face the exact check calls non-convex; an arena refusal of the setup). */
  settled: Record<string, number>;
  sources: Record<string, number>;
  /** Per oracle, the unattracted cases judged again on its rings snap-rounded after failing on the face count alone (C-0195 (2)). */
  snapRounded: Record<string, number>;
}

export function newHarness(): Harness {
  return { report: new OracleReport(), invalid: [], failures: [], settled: {}, sources: {}, snapRounded: {} };
}

const MAX_KEPT = 20;

function keep(list: string[], s: string): void {
  if (list.length < MAX_KEPT) list.push(s);
}

/** Records one case: our result against each oracle, and our output's validity on either side of the split. */
export function judge(h: Harness, op: string, source: string, ours: KernelResult<Ring[]> | Ring[], oracle: (e: OracleEngine) => OracleResult, warnings: readonly Warning[], what: () => string): void {
  h.sources[source] = (h.sources[source] ?? 0) + 1;
  const own = ownProblems(ours);
  if (own.length > 0) keep(h.invalid, `${op} [${source}]: ${own.join(', ')} — ${what()}`);
  const verdicts: Verdict[] = ORACLE_ENGINES.map((e) => {
    const or = oracle(e);
    const v = compareSplit(ours, or, warnings);
    // an unattracted case that fails on the face count alone is judged again on the oracle's rings snap-rounded (C-0195 (2))
    if (!or.ok || v.split !== 'unattracted' || v.failures.length !== 1 || v.failures[0] !== 'faces') return v;
    h.snapRounded[e] = (h.snapRounded[e] ?? 0) + 1;
    return compareSplit(ours, { ...or, rings: snapRoundRings(or.rings) }, warnings);
  });
  h.report.record(op, verdicts);
  const bad = verdicts.find((v) => !v.pass && !v.refused);
  if (bad !== undefined) {
    keep(
      h.failures,
      `${op} [${source}] ${bad.split} vs ${bad.engine}: ${bad.failures.join(', ')} (faces ${String(bad.faces.ours)}/${String(bad.faces.oracle)}, |Δ| ${bad.symDiffCm2.toFixed(1)} ≤ ${bad.boundCm2.toFixed(1)}?) — ${what()}`,
    );
  }
}

/** One boolean case judged. */
export function judgeBoolean(h: Harness, c: BooleanCase): void {
  const ours = booleans(c.op, c.a, c.b, c.fill);
  judge(h, c.op, c.source, ours, (e) => oracleBoolean(c.op, c.a, c.b, c.fill, e), warningsOf(ours), () => JSON.stringify({ op: c.op, fill: c.fill, a: c.a, b: c.b }));
}

/** One buffer case judged. */
export function judgeBuffer(h: Harness, c: BufferCase): void {
  const ours = buffer(c.chains, c.w, c.joins, c.ends);
  judge(h, 'buffer', c.source, ours, (e) => oracleBuffer(c.chains, c.w, c.joins, c.ends, e), warningsOf(ours), () => JSON.stringify(c));
}

function settle(h: Harness, why: string): void {
  h.settled[why] = (h.settled[why] ?? 0) + 1;
}

/** One offsetFace case judged (the face as the arena holds it; the distances cycled over its edges). */
export function judgeOffset(h: Harness, c: FaceCase): void {
  const af = arenaFace(c.rings);
  if (af === null) {
    settle(h, 'arena refused the face');
    return;
  }
  const edges = faceEdges(af.tx, af.face);
  const rings = ringsOfEdges(edges);
  const d = edges.map((_, i) => c.dists[i % c.dists.length]);
  const ours = offsetFace(af.tx, af.face, d);
  judge(h, 'offsetFace', c.source, ours, (e) => oracleOffset(rings, edges, d, e), warningsOf(ours), () => JSON.stringify({ rings, d }));
}

/**
 * One insetRing case judged: on a face the exact check calls non-convex (or holed) our answer must be E_NON_CONVEX
 * and the case is settled without an oracle; on a convex face the collapsed refusal reads as the empty set (the
 * oracle's result must then be empty too, within the bound), its `lastCm` checked to be below dCm.
 */
export function judgeInset(h: Harness, c: FaceCase): void {
  const af = arenaFace(c.rings);
  if (af === null) {
    settle(h, 'arena refused the face');
    return;
  }
  const rings = ringsOfEdges(faceEdges(af.tx, af.face));
  const dCm = c.dists[0];
  const ours = insetRing(af.tx, af.face, dCm);
  if (rings.length !== 1 || !convexCcw(rings[0])) {
    if (!ours.ok && ours.code === 'E_NON_CONVEX') settle(h, 'E_NON_CONVEX on a non-convex face');
    else keep(h.failures, `insetRing [${c.source}]: a non-convex face not refused E_NON_CONVEX — ${JSON.stringify({ rings, dCm })}`);
    return;
  }
  let mine: KernelResult<Ring[]> | Ring[] = ours;
  if (!ours.ok) {
    if (ours.code === 'E_DEGENERATE' && ours.detail === 'collapsed' && dCm > 0) {
      const last = (ours as { lastCm?: number }).lastCm;
      if (typeof last !== 'number' || !(last >= 0 && last < dCm)) keep(h.failures, `insetRing [${c.source}]: collapsed without a last distance below dCm — ${JSON.stringify({ rings, dCm, last })}`);
      mine = [];
    } else {
      keep(h.failures, `insetRing [${c.source}]: ${ours.code} ${ours.detail} on a convex face — ${JSON.stringify({ rings, dCm })}`);
    }
  }
  const ring = rings[0];
  judge(h, 'insetRing', c.source, mine, (e) => oracleInset(ring, dCm, e), ours.ok ? ours.warnings : [], () => JSON.stringify({ rings, dCm }));
}

/** The guard's draw count for a run of `runs` cases (C-0193 (6)): min(10⁵, ⌈share × runs⌉). */
export function guardFor(runs: number, min: number): number {
  return Math.min(min, Math.ceil(MIN_UNATTRACTED_SHARE * runs));
}
