// Support for M0-a-08's oracle-agreement tests (§3.7 "Oracles, not fallbacks", §13.1's differential agreement; the
// placement of C-0122): the cases — M0-k-01's arbitraries and the booleans, buffer, offsetFace and inset cases of
// M0-k-02's constructive set — and the judge that runs our operation (reached only through @plat/kernel's export, the
// arr/index.ts lines of M0-a-08), each oracle (M0-k-03), the split comparison and the report. Every case records its
// verdict against each oracle in an `OracleReport`, so the report carries both shares per operation and the
// unattracted draw count §13.1's vacuity guard reads. Our output is also held to the hard ring checks on EVERY case
// (§3.7 (i): "0 invalid outputs"), not only on the attracted side the comparison checks.
import fc from 'fast-check';
import { expect } from 'vitest';
import {
  attachIndex,
  booleans,
  buffer,
  createPlat,
  faceEdges,
  faceHoles,
  faceRings,
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
import { arb, fuzzRuns } from '../../../src/fuzz/index.js';
import { constructiveCase } from '../../../src/constructive/index.js';
import type { ConstructiveInput } from '../../../src/constructive/types.js';
import {
  ATTRACTED_CM,
  compareSplit,
  isOracleRefusal,
  oracleBoolean,
  oracleBuffer,
  OracleReport,
  splitOf,
  UNATTRACTED_DRAW_MIN,
  symDiffArea,
  type OracleResult,
  type Verdict,
} from '../../../src/oracles/index.js';
import { dedupe, ringProblems, perimeterOf } from '../../../src/oracles/rings.js';
import { ORACLE_ENGINES, type BooleanOp, type EndKind, type FillRule, type JoinKind, type OracleEngine, type Ring } from '../../../src/oracles/types.js';

/** Every generated coordinate lies in ±2¹⁶ cm (M0-k-01's smallest range), so two operands meet often. */
export const LIMIT_CM = 65_536;

/**
 * At every size the unattracted cases must make at least this share of an operation's draws (C-0196 (7)): with
 * `min(10⁵, ⌈share × runs⌉)` asserted, the nightly 10⁶ run asserts §13.1's 10⁵ guard exactly and the PR's 10⁴ a floor
 * of 1 000; the families are weighted so every operation's share stands well above it (each run reports it).
 */
export const MIN_UNATTRACTED_SHARE = 0.1;

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

/** M0-k-01's chain families for buffers, each drawn whole for one case (its source names it). */
const chainFamilies: readonly { name: string; weight: number; arb: fc.Arbitrary<LatticePoint[]> }[] = [
  { name: 'chain', weight: 4, arb: arb.chain({ limitCm: LIMIT_CM, vertices: [2, 12], sizeCm: [50, 5_000] }) },
  { name: 'stroke', weight: 2, arb: arb.stroke({ limitCm: LIMIT_CM, sizeCm: [200, 16_000] }) },
  { name: 'thin', weight: 1, arb: arb.thin({ limitCm: LIMIT_CM, shape: 'chain' }) },
  { name: 'near-collinear', weight: 1, arb: arb.nearCollinear({ limitCm: LIMIT_CM, shape: 'chain' }) },
];

/**
 * Buffer cases: 1–3 chains of one family, one half-width or one per point, every join and end; open chains of long
 * steps under half-widths from 1 m to a quarter of the shortest step (`arb-chain-sparse`: the strips meet only near
 * their joins and every round chord is longer than `minEdge`, the cases §3.7's strict comparison reads); and M0-k-02's
 * buffer cases.
 */
export const bufferCaseArb: fc.Arbitrary<BufferCase> = fc.oneof(
  {
    weight: 12,
    arbitrary: fc
      .record({
        chains: fc.array(arb.chain({ limitCm: LIMIT_CM, vertices: [2, 4], sizeCm: [1_000, 8_192] }), { minLength: 1, maxLength: 2 }),
        tenths: fc.integer({ min: 1, max: 1_000 }),
        joins: joinArb,
        ends: endArb,
      })
      .map(({ chains, tenths, joins, ends }) => {
        let shortest = Infinity;
        for (const c of chains) for (let i = 1; i < c.length; i += 1) shortest = Math.min(shortest, Math.hypot(c[i].x - c[i - 1].x, c[i].y - c[i - 1].y));
        const w = 100 + Math.floor(((Math.max(400, Math.min(shortest, 8_192)) / 4 - 100) * tenths) / 1_000);
        return { chains, w, joins, ends, source: 'arb-chain-sparse' };
      }),
  },
  ...chainFamilies.map((f) => ({
    weight: f.weight * 2,
    arbitrary: fc
      .record({
        chains: fc.array(f.arb, { minLength: 1, maxLength: 3 }),
        uniform: fc.boolean(),
        w: fc.integer({ min: 1, max: 2_000 }),
        ws: fc.array(fc.integer({ min: 1, max: 2_000 }), { minLength: 128, maxLength: 128 }),
        joins: joinArb,
        ends: endArb,
      })
      .map(({ chains, uniform, w, ws, joins, ends }) => {
        const n = chains.reduce((s, c) => s + c.length, 0);
        const per = Array.from({ length: n }, (_, i) => ws[i % ws.length]);
        return { chains, w: uniform ? w : per, joins, ends, source: `arb-${f.name}` };
      }),
  })),
  {
    weight: 4,
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
  // The face the rings bound: its outer ring runs through the first ring's lowest-leftmost point (the arena's own frame
  // face holds that ring as a hole, never as its outer ring); among such faces the one holding the most holes, then the
  // one with the smallest outer area.
  let low = rings[0][0];
  for (const p of rings[0]) if (p.y < low.y || (p.y === low.y && p.x < low.x)) low = p;
  let face = -1;
  let bestHoles = -1;
  let bestArea = Infinity;
  for (let f = 0; f < plat.slots.face[0].top; f += 1) {
    if (!isFaceLive(plat, 0, f)) continue;
    const outer = faceRings(plat, 0, f)[0];
    if (!outer.some((p) => p.x === low.x && p.y === low.y)) continue;
    let a = 0;
    for (let i = 0; i < outer.length; i += 1) {
      const q = outer[(i + 1) % outer.length];
      a += outer[i].x * q.y - q.x * outer[i].y;
    }
    if (!(a > 0)) continue;
    const h = faceHoles(plat, 0, f).length;
    if (h > bestHoles || (h === bestHoles && a < bestArea)) {
      bestHoles = h;
      bestArea = a;
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

/** The distance from p to the segment a–b (doubles; the harness's own geometry). */
function distPointSegment(p: LatticePoint, a: LatticePoint, b: LatticePoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
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
  // An edge set back by at least its farthest distance from the face covers the face — the distance to a segment is
  // convex, so over the face (inside its vertices' hull) it is largest at a vertex — and the exact result is empty:
  // read from the geometry, not from our engine (the oracles' buffers would reach far past the face there, where
  // polygon-clipping is fragile).
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const r of rings) {
    for (const p of r) {
      x0 = Math.min(x0, p.x);
      y0 = Math.min(y0, p.y);
      x1 = Math.max(x1, p.x);
      y1 = Math.max(y1, p.y);
    }
  }
  const covers = edges.some((e, i) => {
    let far = 0;
    for (const r of rings) for (const p of r) far = Math.max(far, distPointSegment(p, e.a, e.b));
    return d[i] > 0 && d[i] >= far;
  });
  if (covers || d.some((di) => di >= Math.hypot(x1 - x0, y1 - y0))) return { ok: true, engine, rings: [], perimeterCm: perimeterOf(rings) };
  // The construction runs about the face's box centre (an exact integer translation; the offset commutes with it), so
  // a face near the lattice's edge keeps the edges' buffers inside the range.
  const cx = Math.round((x0 + x1) / 2);
  const cy = Math.round((y0 + y1) / 2);
  const move = (p: LatticePoint, sx: number, sy: number): LatticePoint => ({ x: (p.x + sx) as Cm, y: (p.y + sy) as Cm });
  const local = rings.map((r) => r.map((p) => move(p, -cx, -cy)));
  const buf = oracleBuffer(
    chains.map((c) => c.map((p) => move(p, -cx, -cy))),
    ws,
    'round',
    'round',
    engine,
  );
  if (!buf.ok) return buf;
  const res = oracleBoolean('difference', local, buf.rings, 'nonzero', engine);
  if (!res.ok) return res;
  const back = res.rings.map((r) => r.map((p) => move(p, cx, cy)));
  return { ...res, rings: back, perimeterCm: perimeterOf(rings) + perimeterOf(back) };
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
  // The construction runs about the ring's box centre (an exact integer translation; the inset commutes with it), so a
  // ring near the lattice's edge keeps its strips inside the range.
  const cx = Math.round((x0 + x1) / 2);
  const cy = Math.round((y0 + y1) / 2);
  const local = ring.map((p) => ({ x: p.x - cx, y: p.y - cy }));
  const diag = Math.hypot(x1 - x0, y1 - y0);
  // How far the result reaches beyond the ring: outward, a corner of interior angle θ moves |d| ÷ sin(θ/2).
  let spike = 0;
  const n = local.length;
  if (dCm < 0) {
    for (let i = 0; i < n; i += 1) {
      const a = local[(i + n - 1) % n];
      const v = local[i];
      const b = local[(i + 1) % n];
      const la = Math.hypot(a.x - v.x, a.y - v.y);
      const lb = Math.hypot(b.x - v.x, b.y - v.y);
      if (la === 0 || lb === 0) continue;
      const cos = ((a.x - v.x) * (b.x - v.x) + (a.y - v.y) * (b.y - v.y)) / (la * lb);
      const sinHalf = Math.sqrt(Math.max(0, (1 - cos) / 2));
      spike = Math.max(spike, sinHalf > 0 ? -dCm / sinHalf : Infinity);
    }
  }
  const E = Math.ceil(diag / 2 + spike + Math.abs(dCm) + 1_000);
  const lx0 = x0 - cx;
  const ly0 = y0 - cy;
  const lx1 = x1 - cx;
  const ly1 = y1 - cy;
  const L = 2 * (diag + 2 * E);
  if (!(Number.isFinite(L) && L + diag < 4_000_000)) return { ok: false, engine, error: 'inset oracle: the outward corner reaches past the lattice', refused: true };
  // inward the result lies inside the ring; outward inside a box beyond the ring by the corners' reach
  const base: Ring =
    dCm > 0
      ? local.map((p) => snapped(p.x, p.y))
      : [snapped(lx0 - E, ly0 - E), snapped(lx1 + E, ly0 - E), snapped(lx1 + E, ly1 + E), snapped(lx0 - E, ly1 + E)];
  const strips: Ring[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = local[i];
    const b = local[(i + 1) % n];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const ux = (b.x - a.x) / len;
    const uy = (b.y - a.y) / len;
    // the inward (left) normal of a counter-clockwise ring
    const nx = -uy;
    const ny = ux;
    const p = (s: number, t: number): LatticePoint => snapped(a.x + s * ux + t * nx, a.y + s * uy + t * ny);
    strips.push([p(-L, dCm - L), p(len + L, dCm - L), p(len + L, dCm), p(-L, dCm)]);
  }
  const res = oracleBoolean('difference', [base], strips, 'nonzero', engine);
  if (!res.ok) return res;
  const back = res.rings.map((r) => r.map((p) => ({ x: (p.x + cx) as Cm, y: (p.y + cy) as Cm })));
  return { ...res, rings: back, perimeterCm: perimeterOf([ring]) + perimeterOf(back) };
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
 * The oracle's rings snap-rounded (C-0196 (7)): the hot pixels are the unit pixels centred on every vertex of the rings and
 * on every crossing of two of their edges, rounded to the nearest lattice point; each edge is replaced by the path
 * through the centres of the hot pixels it meets, in order along it (Hobby's snap rounding). The oracle's doubles are
 * rounded point by point, so where the exact result has two pieces touching at a point inside an edge the rounded
 * rings may cross or overlap that point by a fraction of a centimetre, and the face count reads one face where the
 * region has two. Our engine's rings are snap-rounded by the insertion rules, so this is the oracle's half of "after
 * both are snapped". A rounded ring that passes one lattice point twice — two pieces touching there, which Clipper2 may
 * write as one ring — is cut into its simple loops there, as our engine's trace cuts its own; hot pixels that are
 * lattice neighbours are one cluster, routed through its lowest-leftmost pixel, as our engine makes crossings under a
 * centimetre apart one vertex without a reported move. The area is unchanged within 1½ cm × the perimeter.
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
  // hot pixels that are lattice neighbours (|dx|, |dy| ≤ 1) are one cluster, routed through its lowest-leftmost pixel:
  // two crossings under a centimetre apart are one vertex in our engine without any move beyond the hot pixel, so the
  // oracle's two pieces meeting there touch at that point instead of sharing a 1 cm stretch
  const rep = new Map<string, LatticePoint>();
  const keyOf = (p: LatticePoint): string => `${String(p.x)},${String(p.y)}`;
  const parent = new Map<string, string>();
  const find = (k: string): string => {
    let r = k;
    while (parent.get(r) !== r) r = parent.get(r) as string;
    return r;
  };
  for (const h of pixels) parent.set(keyOf(h), keyOf(h));
  for (const h of pixels) {
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let dy = -1; dy <= 1; dy += 1) {
        const k = `${String(h.x + dx)},${String(h.y + dy)}`;
        if (!parent.has(k)) continue;
        const a = find(keyOf(h));
        const b = find(k);
        if (a !== b) parent.set(a, b);
      }
    }
  }
  for (const h of pixels) {
    const root = find(keyOf(h));
    const cur = rep.get(root);
    if (cur === undefined || h.y < cur.y || (h.y === cur.y && h.x < cur.x)) rep.set(root, h);
  }
  const repOf = (h: LatticePoint): LatticePoint => rep.get(find(keyOf(h))) as LatticePoint;
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
      for (const [, h0] of on) {
        const h = repOf(h0);
        const last = ring[ring.length - 1];
        if (last === undefined || last.x !== h.x || last.y !== h.y) ring.push(h);
      }
    }
    while (ring.length > 1 && ring[0].x === ring[ring.length - 1].x && ring[0].y === ring[ring.length - 1].y) ring.pop();
    // a ring that passes one lattice point twice (two pieces touching there, written as one ring) is cut into its
    // simple loops there, as our engine's trace cuts its own; zero-area loops dropped
    for (const loop of simpleLoopsOf(ring)) if (loop.length >= 3 && signedArea2(loop) !== 0) out.push(loop);
  }
  return out;
}

/** Twice the signed area of a ring. */
function signedArea2(r: readonly LatticePoint[]): number {
  let a = 0;
  for (let i = 0; i < r.length; i += 1) {
    const q = r[(i + 1) % r.length];
    a += r[i].x * q.y - q.x * r[i].y;
  }
  return a;
}

/** A closed walk of lattice points cut into simple loops at every point it visits twice (each loop in walk order). */
function simpleLoopsOf(ring: readonly LatticePoint[]): LatticePoint[][] {
  const loops: LatticePoint[][] = [];
  const stack: LatticePoint[] = [];
  const at = new Map<string, number>();
  for (const p of ring) {
    const k = `${String(p.x)},${String(p.y)}`;
    const i = at.get(k);
    if (i !== undefined) {
      const loop = stack.splice(i);
      for (const u of loop) at.delete(`${String(u.x)},${String(u.y)}`);
      loops.push(loop);
    }
    at.set(k, stack.length);
    stack.push(p);
  }
  if (stack.length > 0) loops.push(stack);
  return loops;
}

// ── the judge ──

/** Faults of ours found on any case, attracted or not: a typed failure we must not give, an invalid ring set. */
export function ownProblems(ours: KernelResult<Ring[]> | readonly Ring[]): string[] {
  if (Array.isArray(ours)) return ringProblems(ours as Ring[]).map((p) => `invalid: ${p}`);
  const r = ours as KernelResult<Ring[]>;
  if (r.ok) return ringProblems(r.value).map((p) => `invalid: ${p}`);
  return [];
}

/** The warnings of our result (an empty result's refusal carries them, C-0196 (4)). */
export function warningsOf(ours: KernelResult<Ring[]>): Warning[] {
  if (ours.ok) return ours.warnings;
  const w = (ours as { warnings?: Warning[] }).warnings;
  return w ?? [];
}

/**
 * The step that refused (the spec note N-39): the oracle's own answer on the case's operands (`own`), the area of
 * |ours Δ oracle| through the oracle's own xor (`measure`), or the same area through the other oracle (`cross-check`).
 */
export type RefusalStep = 'own' | 'measure' | 'cross-check';

/** A tally of cases of one kind and how many of them failed against some oracle. */
export interface CaseTally {
  cases: number;
  failed: number;
  /** The largest distance seen (cm): for `stretchFar` the farthest vertex of ours from the oracle's boundary. */
  maxCm: number;
}

/** A harness run's tallies besides the report: invalid outputs, crashes, and the cases a typed refusal settled. */
export interface Harness {
  report: OracleReport;
  invalid: string[];
  failures: string[];
  /** Cases settled without an oracle (E_NON_CONVEX on a face the exact check calls non-convex; an arena refusal of the setup). */
  settled: Record<string, number>;
  sources: Record<string, number>;
  /** Per oracle, the unattracted cases judged again on its rings snap-rounded after failing on the face count alone (C-0196 (7)). */
  snapRounded: Record<string, number>;
  /** Refused verdicts by `<engine>/<step>` (N-39). */
  refusalSteps: Record<string, number>;
  /** Refused verdicts that count against C-0150's 0.1 % allowance: every measurement and cross-check refusal, and an own-operand refusal the three conditions of N-40 do not exclude. */
  refusalsCounted: number;
  /** Own-operand refusals excluded from the allowance (N-39 as amended by N-40). */
  refusalsExcluded: number;
  /** Per source (family), the cases every oracle refused on its own operands — N-40's third condition caps them at 1 %. */
  allOwnRefused: Record<string, number>;
  /** Cases reporting W_PLACED (an endpoint-route landing among them, N-37 / N-40), measured on the attracted bound. */
  placed: CaseTally;
  /** Cases reporting W_STRETCH_SHARED with a vertex of ours more than √2 · attractCm from the oracle's boundary (N-41 (2)). */
  stretchFar: CaseTally;
}

export function newHarness(): Harness {
  return {
    report: new OracleReport(),
    invalid: [],
    failures: [],
    settled: {},
    sources: {},
    snapRounded: {},
    refusalSteps: {},
    refusalsCounted: 0,
    refusalsExcluded: 0,
    allOwnRefused: {},
    placed: { cases: 0, failed: 0, maxCm: 0 },
    stretchFar: { cases: 0, failed: 0, maxCm: 0 },
  };
}

const MAX_KEPT = 20;

function keep(list: string[], s: string): void {
  if (list.length < MAX_KEPT) list.push(s);
}

/** Our result as rings (E_DEGENERATE `empty` and any other refusal read as none), as `compareSplit` reads them. */
function oursRings(ours: KernelResult<Ring[]> | readonly Ring[]): Ring[] {
  if (Array.isArray(ours)) return (ours as readonly Ring[]).map(dedupe);
  const r = ours as KernelResult<Ring[]>;
  return r.ok ? r.value.map(dedupe) : [];
}

/** Does the oracle's own xor refuse to measure |ours Δ its rings|? (Re-run on a refused verdict only, to name the step.) */
function measureRefuses(mine: readonly Ring[], rings: readonly Ring[], e: OracleEngine): boolean {
  try {
    symDiffArea(mine, rings, e);
    return false;
  } catch (err) {
    return isOracleRefusal(err);
  }
}

/** The distance from p to the segment a–b (doubles). */
function distToSegment(px: number, py: number, a: LatticePoint, b: LatticePoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / len2));
  return Math.hypot(px - (a.x + t * dx), py - (a.y + t * dy));
}

/**
 * The farthest any vertex of ours lies from the oracle's boundary (cm; Infinity when ours has a vertex and the oracle's
 * result is empty, 0 when ours is empty): N-41 (2)'s measure of how far a shared stretch carried our boundary.
 */
export function farthestVertexCm(mine: readonly Ring[], theirs: readonly Ring[]): number {
  let worst = 0;
  const segs: [LatticePoint, LatticePoint][] = [];
  for (const r of theirs) for (let i = 0; i < r.length; i += 1) segs.push([r[i], r[(i + 1) % r.length]]);
  for (const r of mine) {
    for (const p of r) {
      let best = Infinity;
      for (const [a, b] of segs) {
        const d = distToSegment(p.x, p.y, a, b);
        if (d < best) best = d;
        if (best <= worst) break;
      }
      if (best > worst) worst = best;
    }
  }
  return worst;
}

/**
 * Records one case: our result against each oracle, and our output's validity on either side of the split. A refused
 * verdict is classified by the step that refused (N-39) and counted against C-0150's allowance unless it is an
 * own-operand refusal that N-40's conditions exclude: every oracle that answered still judges the case, and our result
 * passes the hard ring checks (C-0150 (4)); the third condition — cases every oracle refused on its own operands stay
 * ≤ 1 % per family — is the caller's assertion on `allOwnRefused`.
 */
export function judge(h: Harness, op: string, source: string, ours: KernelResult<Ring[]> | Ring[], oracle: (e: OracleEngine) => OracleResult, warnings: readonly Warning[], what: () => string): void {
  h.sources[source] = (h.sources[source] ?? 0) + 1;
  const own = ownProblems(ours);
  if (own.length > 0) keep(h.invalid, `${op} [${source}]: ${own.join(', ')} — ${what()}`);
  const results = ORACLE_ENGINES.map((e) => {
    const or = oracle(e);
    const v0 = compareSplit(ours, or, warnings);
    // an unattracted case that fails on the face count alone is judged again on the oracle's rings snap-rounded (C-0196 (7))
    if (!or.ok || v0.split !== 'unattracted' || v0.failures.length !== 1 || v0.failures[0] !== 'faces') return { e, or, v: v0 };
    h.snapRounded[e] = (h.snapRounded[e] ?? 0) + 1;
    return { e, or, v: compareSplit(ours, { ...or, rings: snapRoundRings(or.rings) }, warnings) };
  });
  const verdicts: Verdict[] = results.map((r) => r.v);
  h.report.record(op, verdicts);
  // N-39 / N-40: each refusal's step, and whether it counts against the allowance
  const mine = oursRings(ours);
  const answeredJudge = results.filter((r) => r.or.ok).every((r) => !r.v.refused);
  const excludable = answeredJudge && own.length === 0;
  let ownRefusals = 0;
  for (const r of results) {
    if (!r.v.refused) continue;
    const step: RefusalStep = !r.or.ok ? 'own' : measureRefuses(mine, r.or.rings, r.e) ? 'measure' : 'cross-check';
    h.refusalSteps[`${r.e}/${step}`] = (h.refusalSteps[`${r.e}/${step}`] ?? 0) + 1;
    if (step === 'own') ownRefusals += 1;
    if (step === 'own' && excludable) h.refusalsExcluded += 1;
    else h.refusalsCounted += 1;
  }
  if (ownRefusals === results.length) h.allOwnRefused[source] = (h.allOwnRefused[source] ?? 0) + 1;
  const bad = verdicts.find((v) => !v.pass && !v.refused);
  // N-40 (W_PLACED: the endpoint route's landings) and N-41 (2) (a shared stretch leaving far from the input): tallied
  // on the attracted bound the verdicts above already apply
  if (splitOf(warnings) === 'attracted') {
    const failed = bad !== undefined ? 1 : 0;
    if (warnings.some((w) => w.code === 'W_PLACED' && w.count > 0)) {
      h.placed.cases += 1;
      h.placed.failed += failed;
    }
    const answer = results.find((r) => r.or.ok)?.or;
    if (answer !== undefined && answer.ok && warnings.some((w) => w.code === 'W_STRETCH_SHARED' && w.count > 0)) {
      const far = farthestVertexCm(mine, answer.rings);
      if (far > ATTRACTED_CM) {
        h.stretchFar.cases += 1;
        h.stretchFar.failed += failed;
        if (far > h.stretchFar.maxCm) h.stretchFar.maxCm = far;
      }
    }
  }
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
  judge(h, 'insetRing', c.source, mine, (e) => oracleInset(ring, dCm, e), warningsOf(ours), () => JSON.stringify({ rings, dCm }));
}

/** The guard's draw count for a run of `runs` cases (C-0196 (7)): min(10⁵, ⌈share × runs⌉). */
export function guardFor(runs: number, min: number): number {
  return Math.min(min, Math.ceil(MIN_UNATTRACTED_SHARE * runs));
}

/** The size of an agreement run: PLAT_FUZZ_RUNS cases per operation (10⁴ on a PR, 10⁶ nightly; C-0057). */
export const RUNS = fuzzRuns();

/** One operation's run may take this long at the nightly size (the PR's 10⁴ takes minutes). */
export const TIMEOUT = 3_600_000;

/** Refusals counted against C-0150's allowance: 0.1 % of the cases, as M0-k-03's own agreement test allows. */
export const MAX_REFUSAL_SHARE = 0.001;

/** N-40's third condition: cases every oracle refused on its own operands, at most 1 % of a family's cases. */
export const MAX_ALL_OWN_REFUSED_SHARE = 0.01;

/**
 * An operation's verdict after its run: the report line printed (both shares, the unattracted count against the
 * guard, the refusals by step, the W_PLACED and far-stretch tallies), then §3.7 (i)'s bar asserted — 0 crashes (a
 * throw fails the property before this), 0 invalid outputs, every judged case passing, every case accounted for,
 * refusals within C-0150's allowance as N-39 / N-40 classify them, and §13.1's vacuity guard (C-0196 (7)).
 */
export function verdict(h: Harness, op: string, runs: number = RUNS): void {
  const line = h.report.line(op);
  const settled = Object.values(h.settled).reduce((s, n) => s + n, 0);
  const guard = guardFor(runs, UNATTRACTED_DRAW_MIN);
  console.info(
    `arr/${op}: ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}, share ${line.unattractedShare.toFixed(3)}; attracted ${String(line.attracted)}, share ${line.attractedShare.toFixed(3)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)} by step ${JSON.stringify(h.refusalSteps)} (counted ${String(h.refusalsCounted)}, excluded ${String(h.refusalsExcluded)}, every oracle on its own operands ${JSON.stringify(h.allOwnRefused)}); unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; W_PLACED cases ${String(h.placed.cases)} (failed ${String(h.placed.failed)}); stretch beyond √2·attractCm ${String(h.stretchFar.cases)} (failed ${String(h.stretchFar.failed)}, farthest ${h.stretchFar.maxCm.toFixed(1)} cm); snap-rounded ${JSON.stringify(h.snapRounded)}; sources ${JSON.stringify(h.sources)}; guard ${String(guard)}`,
  );
  expect(h.failures).toEqual([]);
  expect(h.invalid).toEqual([]);
  expect(line.failures).toEqual({});
  expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
  expect(line.draws + line.unjudged + settled).toBe(runs);
  expect(h.refusalsCounted).toBeLessThanOrEqual(Math.ceil(MAX_REFUSAL_SHARE * runs));
  for (const [source, n] of Object.entries(h.allOwnRefused)) {
    expect(n, `cases every oracle refused on its own operands in ${source}`).toBeLessThanOrEqual(Math.ceil(MAX_ALL_OWN_REFUSED_SHARE * (h.sources[source] ?? 0)));
  }
  expect(h.placed.failed).toBe(0);
  expect(h.stretchFar.failed).toBe(0);
  // §13.1's vacuity guard (C-0196 (7)): 10⁵ unattracted draws at the nightly size, a tenth of the draws below it
  expect(line.unattracted).toBeGreaterThanOrEqual(guard);
  expect(h.report.meetsDrawCount(op, guard)).toBe(true);
}
