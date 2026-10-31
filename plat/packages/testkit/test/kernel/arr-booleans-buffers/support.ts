// Support for M0-a-08's oracle-agreement tests (§3.7 "Oracles, not fallbacks", §13.1's differential agreement; the
// placement of C-0122): the cases — M0-k-01's arbitraries and the booleans, buffer, offsetFace and inset cases of
// M0-k-02's constructive set — and the judge that runs our operation (reached only through @plat/kernel's export, the
// arr/index.ts lines of M0-a-08), each oracle (M0-k-03), the split comparison and the report. Every case records its
// verdict against each oracle in an `OracleReport`, so the report carries both shares per operation and the
// unattracted draw count §13.1's vacuity guard reads. Our output is also held to the hard ring checks on EVERY case
// (§3.7 (i): "0 invalid outputs"), not only on the attracted side the comparison checks.
//
// N-44 (3) and N-46 (5) (C-0231): a case our engine REFUSES with E_INVARIANT or E_BELOW_MIN_EDGE is taken
// out of the oracle comparison and classed by replay — insertChain's when the refusing overlay's insertions, fed straight
// to `insertChain` on a fresh arena in `buildOverlay`'s order, meet the same refusal (code and detail); this item's own
// otherwise. insertChain's are counted per family (operation) against the cap measured at the PR size (`REFUSAL_MEASURE`),
// this item's own are held to 1 per 10⁴, and every refused case can be logged for the register (`PLAT_REFUSALS_OUT`).
// A committed result that disagrees with an oracle stays a failure.
import { appendFileSync } from 'node:fs';
import fc from 'fast-check';
import { expect } from 'vitest';
import {
  attachIndex,
  booleans,
  buffer,
  bufferParts,
  canonicalFaceRings,
  createPlat,
  faceEdges,
  faceHoles,
  faceRings,
  insertChain,
  insertTx,
  insetRing,
  isFaceLive,
  LATTICE,
  offsetFace,
  ringEdgeParts,
  snap,
  UNION_FAN_IN,
  type Cm,
  type FaceId,
  type InsertTx,
  type KernelResult,
  type LatticePoint,
  type PlatKey,
  type Warning,
} from '@plat/kernel';
import { arb, fuzzParams, fuzzRuns } from '../../../src/fuzz/index.js';
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
import { polygonClippingRaw } from '../../../src/oracles/polygon-clipping.js';
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
  const r = arenaFaceOr(rings);
  return r === null || 'refusal' in r ? null : r;
}

/**
 * `arenaFace`, or the refusal `insertChain` met entering a ring (the case's setup: insertChain alone on a fresh arena,
 * so such a refusal is insertChain's by construction); null when no bounded face holds the rings.
 */
export function arenaFaceOr(rings: readonly (readonly LatticePoint[])[]): { tx: InsertTx; face: FaceId } | { refusal: { code: string; detail: string } } | null {
  const plat = createPlat(KEY, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(plat, { gridCellCm: 1_024 });
  const tx = insertTx(plat, 0);
  for (let i = 0; i < rings.length; i += 1) {
    const r = insertChain(tx, rings[i].slice(), [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', { closed: true });
    if (!r.ok) return { refusal: { code: r.code, detail: r.detail } };
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

/** The limit on a strip's reach plus the ring's diagonal in the construction's frame (§3.2 (1)'s 2²³ with room to spare). */
export const INSET_FRAME_CM = 4_000_000;

/** A coordinate rounded to the nearest centimetre, a half away from zero (the kernel's `snap` rule), never refused. */
function roundHalfAwayCm(v: number): number {
  return v < 0 ? -Math.round(-v) : Math.round(v);
}

/**
 * The exponent k of the oracleInset construction's 2ᵏ-scaled frame: the largest k ≥ 0 with 2ᵏ · reachCm below
 * `INSET_FRAME_CM`, or −1 when even the unscaled frame does not fit (C-0196 (7) as amended by C-0261).
 */
export function insetFrameExponent(reachCm: number): number {
  if (!(Number.isFinite(reachCm) && reachCm >= 0 && reachCm < INSET_FRAME_CM)) return -1;
  let k = 0;
  while (k < 30 && 2 ** (k + 1) * reachCm < INSET_FRAME_CM) k += 1;
  return k;
}

/**
 * The oracle's insetRing of a convex counter-clockwise ring by dCm (inward when positive, outward when negative): a box
 * well beyond the result less, for every edge, the half-plane strip on the far side of the edge's line moved by dCm —
 * a long quadrilateral — through the engine's own boolean. No half-plane clipping of ours is used.
 *
 * The construction runs in a frame scaled by S = 2ᵏ about the ring's box centre, k the largest that keeps the strips'
 * reach inside `INSET_FRAME_CM` (`insetFrameExponent`): the strips' far corners lie ~L away from the ring, so snapping
 * them to the lattice tilts the moved edge line by up to ~0.7 cm where it meets the result; in the scaled frame that
 * error is ~0.7 / S cm, and the engine's own rounding of the crossings is ~0.7 / S too. The result is divided by S
 * (exact: a power of two) and rounded to the nearest centimetre once. At moderate angles the construction's error is
 * then about the one rounding our engine's answer also carries; it is not one rounding everywhere: at a very sharp
 * vertex the strips' residual tilt (≈ 0.7 ÷ S cm) is multiplied by 1 ÷ sin(θ ÷ 2) at the tip, and outward a long
 * spike leaves k small, so the oracle's vertices there can lie farther from the exact boundary (up to 28.6 cm measured
 * on thin triangles, with every agreement ratio still ≤ 0.50; C-0376). Unscaled (S = 1), the double rounding could put
 * an exact-mitred outward inset's vertices 0.6 cm off, all outward, past the unattracted bound on a correct answer of
 * ours (C-0261).
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
  const L = 2 * (diag + 2 * E);
  const k = insetFrameExponent(L + diag);
  if (k < 0) return { ok: false, engine, error: 'inset oracle: the outward corner reaches past the lattice', refused: true };
  const S = 2 ** k;
  // the ring, the box and the distances in the scaled frame (exact: integers times a power of two)
  const sl = local.map((p) => ({ x: p.x * S, y: p.y * S }));
  const sd = dCm * S;
  const sE = E * S;
  const sL = L * S;
  const lx0 = (x0 - cx) * S;
  const ly0 = (y0 - cy) * S;
  const lx1 = (x1 - cx) * S;
  const ly1 = (y1 - cy) * S;
  // inward the result lies inside the ring; outward inside a box beyond the ring by the corners' reach
  const base: Ring =
    dCm > 0
      ? sl.map((p) => snapped(p.x, p.y))
      : [snapped(lx0 - sE, ly0 - sE), snapped(lx1 + sE, ly0 - sE), snapped(lx1 + sE, ly1 + sE), snapped(lx0 - sE, ly1 + sE)];
  const strips: Ring[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = sl[i];
    const b = sl[(i + 1) % n];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const ux = (b.x - a.x) / len;
    const uy = (b.y - a.y) / len;
    // the inward (left) normal of a counter-clockwise ring
    const nx = -uy;
    const ny = ux;
    const p = (s: number, t: number): LatticePoint => snapped(a.x + s * ux + t * nx, a.y + s * uy + t * ny);
    strips.push([p(-sL, sd - sL), p(len + sL, sd - sL), p(len + sL, sd), p(-sL, sd)]);
  }
  const res = oracleBoolean('difference', [base], strips, 'nonzero', engine);
  if (!res.ok) return res;
  // back to centimetres: divided by S (exact) and moved back by the integer centre, then rounded once; a ring the
  // rounding leaves without area (a sliver under a centimetre) is dropped
  const back = res.rings
    .map((r) => dedupe(r.map((p) => ({ x: roundHalfAwayCm(p.x / S + cx) as Cm, y: roundHalfAwayCm(p.y / S + cy) as Cm }))))
    .filter((r) => r.length >= 3 && signedArea2(r) !== 0);
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
  const route = hotPixelRouter(rings);
  const out: Ring[] = [];
  for (const r of rings) {
    // a ring that passes one lattice point twice (two pieces touching there, written as one ring) is cut into its
    // simple loops there, as our engine's trace cuts its own; zero-area loops dropped
    for (const loop of simpleLoopsOf(route(r))) if (loop.length >= 3 && signedArea2(loop) !== 0) out.push(loop);
  }
  return out;
}

/**
 * Hobby's snap rounding of a ring set as a router: the hot pixels are the unit pixels centred on every vertex of the
 * rings and on every crossing of two of their edges, rounded to the nearest lattice point, hot pixels that are lattice
 * neighbours clustered through their lowest-leftmost pixel (C-0196 (7)); a ring is routed edge by edge through the
 * centres of the hot pixels each edge meets, in order along it, consecutive repeats and the closing repeat dropped.
 */
function hotPixelRouter(rings: readonly Ring[]): (r: Ring) => Ring {
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
  return (r: Ring): Ring => {
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
    return ring;
  };
}

/**
 * The face count with faces that touch at a point counted as one (C-0206 (8)), or null when the canonicalising union
 * refuses: the region's faces as polygon-clipping's non-zero union writes them (C-0144 (3)), joined wherever two of them
 * share a boundary point — a vertex of one on the other's boundary, exactly. A sub-centimetre overlap of two operands is
 * a face's neck the oracle keeps and snapping may close to a point (our engine moving nothing beyond the hot pixel), so
 * the count read this way is the same on both sides.
 */
export function touchMergedFaceCount(rings: readonly Ring[]): number | null {
  const rs = rings.map(dedupe).filter((r) => r.length >= 3);
  if (rs.length === 0) return 0;
  let mp: [number, number][][][];
  try {
    mp = polygonClippingRaw('union', rs, [], 'nonzero');
  } catch {
    return null;
  }
  const faces = mp.filter((poly) => poly[0] !== undefined && signedArea2(poly[0].map(([x, y]) => ({ x: x as Cm, y: y as Cm }))) > 0);
  const parent = faces.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const ringsOf = (poly: [number, number][][]): [number, number][][] => poly;
  for (let i = 0; i < faces.length; i += 1) {
    for (let j = i + 1; j < faces.length; j += 1) {
      if (find(i) === find(j)) continue;
      if (touches(ringsOf(faces[i]), ringsOf(faces[j]))) parent[find(i)] = find(j);
    }
  }
  return new Set(faces.map((_, i) => find(i))).size;
}

/** Do two polygons' boundaries share a point — a vertex of either on an edge (or vertex) of the other, exactly? */
function touches(p: readonly [number, number][][], q: readonly [number, number][][]): boolean {
  const onBoundary = (x: number, y: number, poly: readonly [number, number][][]): boolean => {
    for (const r of poly) {
      for (let i = 0; i < r.length; i += 1) {
        const [ax, ay] = r[i];
        const [bx, by] = r[(i + 1) % r.length];
        if ((bx - ax) * (y - ay) - (by - ay) * (x - ax) !== 0) continue;
        if (Math.min(ax, bx) <= x && x <= Math.max(ax, bx) && Math.min(ay, by) <= y && y <= Math.max(ay, by)) return true;
      }
    }
    return false;
  };
  for (const r of p) for (const [x, y] of r) if (onBoundary(x, y, q)) return true;
  for (const r of q) for (const [x, y] of r) if (onBoundary(x, y, p)) return true;
  return false;
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
  /**
   * Per oracle, the unattracted cases judged again on its rings snap-rounded after failing on the face count alone
   * (C-0196 (7)); under `<engine>/touch`, those whose counts agree only once faces touching at a point are counted as one
   * (C-0206 (8)).
   */
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
  /** Cases our engine refused, taken out of the oracle comparison and classed by replay (N-44 (3), N-46 (5)). */
  engineRefusals: EngineRefusals;
  /**
   * The run's replay seed (L18; Q97): the seed handed to `fc.assert` (`agreementParams`), printed in the verdict's line
   * and its every assertion message and carried by every refused case logged (`PLAT_REFUSALS_OUT`); null for a harness
   * no seeded run drives (a register case, a planted meta-test).
   */
  seed: number | null;
}

/** The refused cases of a run (`separateRefusal`): insertChain's (counted against the family's cap) and this item's own. */
export interface EngineRefusals {
  /** Refusals that replay on insertChain alone — the operation's overlay, or the case's setup (`setup` counts those). */
  insertChain: number;
  /** Refusals that do not replay on insertChain alone: caused in arr/ (or by an operation without a replay), 1 per 10⁴. */
  own: number;
  /** Of `insertChain`: the face services' setup refusals (the face's rings entered through insertChain, `arenaFaceOr`). */
  setup: number;
  /** Per `<class>/<code>`. */
  byCode: Record<string, number>;
  /** The own refusals (the first few), for the report. */
  ownCases: string[];
}

export function newHarness(seed: number | null = null): Harness {
  return {
    seed,
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
    engineRefusals: { insertChain: 0, own: 0, setup: 0, byCode: {}, ownCases: [] },
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
export function judge(
  h: Harness,
  op: string,
  source: string,
  ours: KernelResult<Ring[]> | Ring[],
  oracle: (e: OracleEngine) => OracleResult,
  warnings: readonly Warning[],
  what: () => string,
): void {
  h.sources[source] = (h.sources[source] ?? 0) + 1;
  const own = ownProblems(ours);
  if (own.length > 0) keep(h.invalid, `${op} [${source}]: ${own.join(', ')} — ${what()}`);
  const results = ORACLE_ENGINES.map((e) => {
    const or = oracle(e);
    const v0 = compareSplit(ours, or, warnings);
    // an unattracted case that fails on the face count alone is judged again on the oracle's rings snap-rounded (C-0196 (7))
    if (!or.ok || v0.split !== 'unattracted' || v0.failures.length !== 1 || v0.failures[0] !== 'faces') return { e, or, v: v0 };
    h.snapRounded[e] = (h.snapRounded[e] ?? 0) + 1;
    const v1 = compareSplit(ours, { ...or, rings: snapRoundRings(or.rings) }, warnings);
    if (v1.pass || v1.failures.length !== 1 || v1.failures[0] !== 'faces') return { e, or, v: v1 };
    // still the face count alone: equal once faces touching at a point are counted as one on both sides (C-0206 (8))
    const mineTouch = touchMergedFaceCount(oursRings(ours));
    if (mineTouch === null || mineTouch !== touchMergedFaceCount(or.rings)) return { e, or, v: v1 };
    h.snapRounded[`${e}/touch`] = (h.snapRounded[`${e}/touch`] ?? 0) + 1;
    return { e, or, v: { ...v1, pass: true, faces: { ours: mineTouch, oracle: mineTouch }, failures: [] } };
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

// ── the refusals our engine gives: separated from the oracle comparison and classed by replay (N-44 (3), N-46 (5)) ──

/** The refusal codes taken out of the oracle comparison: insertChain's bound class (N-46 (3)) and the overlay's invariant. */
export const SEPARATED_CODES: ReadonlySet<string> = new Set(['E_INVARIANT', 'E_BELOW_MIN_EDGE']);

/** What a replay on insertChain alone met: the refusal and the chain refused. */
export interface OverlayReplay {
  readonly code: string;
  readonly detail: string;
  readonly chain: LatticePoint[];
  readonly closed: boolean;
}

/** A refused case's class: insertChain's (it replays on insertChain alone) or this item's own. */
export type RefusalClass = 'insertChain' | 'own';

/** The ring without consecutive repeats (the closing repeat included) — the overlay's reading of a ring. */
function distinctRing(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const l = out[out.length - 1];
    if (l === undefined || l.x !== q.x || l.y !== q.y) out.push(q);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The scratch overlay's insertions on insertChain alone, written from `buildOverlay`'s contract (C-0196 (1)) with no
 * arrangement code in it, as M0-a-09's replay.ts writes its overlay part: a fresh L0 arena 2²⁴ cm wide, its index cell
 * about one segment per cell over the inputs' box (64 cm … 2²⁰ cm), the frame 4 096 cm beyond the inputs as one closed
 * mandatory chain, then every distinct segment of the operands (either direction) as a two-point mandatory chain in
 * input order, each under its own `arr:s<i>` row; then the bridges: for every ring's walk (its segments in order, a
 * segment that collapsed left out), where the vertex one kept segment ends on and the vertex the next starts on differ
 * by `minEdge` or more, one more two-point mandatory chain between them (`arr:s<i>` numbering on). The first refusal
 * other than a chain's collapse (E_DEGENERATE `empty`), or null.
 */
export function replayOverlay(operands: readonly (readonly (readonly LatticePoint[])[])[]): OverlayReplay | null {
  const segs: [LatticePoint, LatticePoint][] = [];
  const byKey = new Map<string, number>();
  /** Every ring's walk: its segments in order, signed (+ along the segment's first point → its second). */
  const walks: number[][] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const op of operands) {
    for (const ringIn of op) {
      const ring = distinctRing(ringIn);
      const n = ring.length;
      if (n < 2) continue;
      const steps: number[] = [];
      walks.push(steps);
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % n];
        minX = Math.min(minX, a.x);
        minY = Math.min(minY, a.y);
        maxX = Math.max(maxX, a.x);
        maxY = Math.max(maxY, a.y);
        const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
        const k = fw ? `${String(a.x)},${String(a.y)},${String(b.x)},${String(b.y)}` : `${String(b.x)},${String(b.y)},${String(a.x)},${String(a.y)}`;
        const at = byKey.get(k);
        if (at === undefined) {
          byKey.set(k, segs.length);
          steps.push(segs.length + 1);
          segs.push([a, b]);
        } else {
          const same = segs[at][0].x === a.x && segs[at][0].y === a.y;
          steps.push(same ? at + 1 : -(at + 1));
        }
      }
    }
  }
  if (segs.length === 0) return null;
  const q = createPlat(KEY, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segs.length) < area) cell *= 2;
  attachIndex(q, { gridCellCm: cell });
  const t = insertTx(q, 0);
  const lim = LATTICE.rangeCm - 1;
  const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  const x0 = Math.max(-lim, minX - 4096);
  const y0 = Math.max(-lim, minY - 4096);
  const x1 = Math.min(lim, maxX + 4096);
  const y1 = Math.min(lim, maxY + 4096);
  const frame = [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
  const f = insertChain(t, frame, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  if (!f.ok) return { code: f.code, detail: f.detail, chain: frame, closed: true };
  const starts: number[] = [];
  const ends: number[] = [];
  for (let s = 0; s < segs.length; s += 1) {
    const [a, b] = segs[s];
    const r = insertChain(t, [a, b], [{ role: 'invisible', entity: `arr:s${String(s)}` }], 'mandatory');
    if (r.ok) {
      starts.push(r.value.placed[0]);
      ends.push(r.value.placed[r.value.placed.length - 1]);
    } else if (r.code === 'E_DEGENERATE' && r.detail === 'empty') {
      starts.push(-1);
      ends.push(-1);
    } else return { code: r.code, detail: r.detail, chain: [a, b], closed: false };
  }
  // the bridges, walk after walk
  let id = segs.length;
  const X = q.vertices.x;
  const Y = q.vertices.y;
  const minSq = LATTICE.minEdgeCm * LATTICE.minEdgeCm;
  for (const steps of walks) {
    const kept = steps.filter((st) => starts[Math.abs(st) - 1] >= 0);
    const m = kept.length;
    for (let i = 0; i < m; i += 1) {
      const st = kept[i];
      const nx = kept[(i + 1) % m];
      const from = st > 0 ? ends[st - 1] : starts[-st - 1];
      const to = nx > 0 ? starts[nx - 1] : ends[-nx - 1];
      if (from === to) continue;
      const dx = X[to] - X[from];
      const dy = Y[to] - Y[from];
      if (dx * dx + dy * dy < minSq) continue;
      const a = P(X[from], Y[from]);
      const b = P(X[to], Y[to]);
      const r = insertChain(t, [a, b], [{ role: 'invisible', entity: `arr:s${String(id)}` }], 'mandatory');
      id += 1;
      if (r.ok) {
        starts.push(r.value.placed[0]);
        ends.push(r.value.placed[r.value.placed.length - 1]);
      } else if (r.code === 'E_DEGENERATE' && r.detail === 'empty') {
        starts.push(-1);
        ends.push(-1);
      } else return { code: r.code, detail: r.detail, chain: [a, b], closed: false };
    }
  }
  return null;
}

/** A boolean's one overlay (its two operands) on insertChain alone. */
export function replayBoolean(c: BooleanCase): OverlayReplay | null {
  return replayOverlay([c.a, c.b]);
}

/**
 * A buffer's overlays on insertChain alone, in `unionParts`' order (C-0196 (6)): its parts (`bufferParts`) taken
 * UNION_FAN_IN at a time, level after level, a lone group above the first level passed up; each group's overlay
 * replayed, the first that refuses returned. A group's union, the next level's input, is read from `booleans`' union
 * of the group with nothing (the same overlay: the same segments, frame and cell); if that refuses where the replay did
 * not, the refusal is not insertChain's (null).
 */
export function replayBuffer(c: BufferCase): OverlayReplay | null {
  const parts = bufferParts(c.chains, c.w, c.joins, c.ends);
  if (!parts.ok) return null;
  let level: LatticePoint[][][] = parts.value.map((p) => [p]);
  for (let depth = 0; ; depth += 1) {
    const next: LatticePoint[][][] = [];
    for (let i = 0; i < level.length; i += UNION_FAN_IN) {
      const group = level.slice(i, i + UNION_FAN_IN);
      if (group.length === 1 && level.length > 1 && depth > 0) {
        next.push(group[0]);
        continue;
      }
      const rings: LatticePoint[][] = [];
      for (const g of group) for (const r of g) rings.push(r);
      const rp = replayOverlay([rings]);
      if (rp !== null) return rp;
      const u = booleans('union', rings, [], 'nonzero');
      if (u.ok) {
        if (u.value.length > 0) next.push(u.value);
      } else if (!(u.code === 'E_DEGENERATE' && u.detail === 'empty')) return null;
    }
    if (next.length <= 1) return null;
    level = next;
  }
}

/**
 * offsetFace's one overlay on insertChain alone: the face's rings as offsetFace reads them (`canonicalFaceRings`: the
 * ring split decides each vertex's two edges, so a ring read back from `faceEdges` alone may differ at a pinch), then
 * every edge's parts (`ringEdgeParts`, C-0196 (3)).
 */
export function replayOffset(tx: InsertTx, face: FaceId, d: readonly number[]): OverlayReplay | null {
  const rings = canonicalFaceRings(tx, face);
  const parts = ringEdgeParts(rings, d);
  if (!parts.ok) return null;
  return replayOverlay([rings, parts.value]);
}

/** The class of a refusal: insertChain's when the replay met the same code and detail on a chain of distinct points. */
export function classifyRefusal(r: { code: string; detail: string }, replay: OverlayReplay | null): RefusalClass {
  if (replay === null || replay.code !== r.code || replay.detail !== r.detail) return 'own';
  return new Set(replay.chain.map((p) => `${String(p.x)},${String(p.y)}`)).size === replay.chain.length ? 'insertChain' : 'own';
}

/** One refused case, as the register keeps it (`PLAT_REFUSALS_OUT`, one JSON line each). */
export interface RefusedCase {
  op: string;
  source: string;
  cls: RefusalClass;
  setup: boolean;
  code: string;
  detail: string;
  seed: string | null;
  input: unknown;
}

function logRefused(entry: RefusedCase): void {
  const file = process.env.PLAT_REFUSALS_OUT;
  if (file === undefined || file === '') return;
  appendFileSync(file, `${JSON.stringify(entry)}\n`);
}

function tallyRefusal(h: Harness, op: string, source: string, r: { code: string; detail: string }, cls: RefusalClass, setup: boolean, input: unknown): void {
  const t = h.engineRefusals;
  t[cls] += 1;
  if (setup) t.setup += 1;
  const k = `${cls}${setup ? '/setup' : ''}/${r.code}`;
  t.byCode[k] = (t.byCode[k] ?? 0) + 1;
  if (cls === 'own') keep(t.ownCases, `${op} [${source}]: ${r.code} '${r.detail}' — ${JSON.stringify(input).slice(0, 600)}`);
  logRefused({ op, source, cls, setup, code: r.code, detail: r.detail, seed: h.seed === null ? (process.env.PLAT_FUZZ_SEED ?? null) : String(h.seed), input });
}

/**
 * Takes a refused case out of the oracle comparison (N-44 (3)): when our result is a refusal in SEPARATED_CODES, it is
 * classed by `replay` (run only then) and tallied; true when the case was taken out. Any other result goes to `judge`.
 */
export function separateRefusal(h: Harness, op: string, source: string, ours: KernelResult<Ring[]>, replay: () => OverlayReplay | null, input: unknown): boolean {
  if (ours.ok || !SEPARATED_CODES.has(ours.code)) return false;
  tallyRefusal(h, op, source, ours, classifyRefusal(ours, replay()), false, input);
  return true;
}

/** One boolean case judged. */
export function judgeBoolean(h: Harness, c: BooleanCase): void {
  const ours = booleans(c.op, c.a, c.b, c.fill);
  if (separateRefusal(h, c.op, c.source, ours, () => replayBoolean(c), c)) return;
  judge(h, c.op, c.source, ours, (e) => oracleBoolean(c.op, c.a, c.b, c.fill, e), warningsOf(ours), () => JSON.stringify({ op: c.op, fill: c.fill, a: c.a, b: c.b }));
}

/** One buffer case judged. */
export function judgeBuffer(h: Harness, c: BufferCase): void {
  const ours = buffer(c.chains, c.w, c.joins, c.ends);
  if (separateRefusal(h, 'buffer', c.source, ours, () => replayBuffer(c), c)) return;
  judge(h, 'buffer', c.source, ours, (e) => oracleBuffer(c.chains, c.w, c.joins, c.ends, e), warningsOf(ours), () => JSON.stringify(c));
}

function settle(h: Harness, why: string): void {
  h.settled[why] = (h.settled[why] ?? 0) + 1;
}

/**
 * The face of a face-service case, or false when the case is settled or counted without one: the arena refused the
 * rings — counted as insertChain's when the refusal is in SEPARATED_CODES (the setup is insertChain alone on a fresh
 * arena), settled otherwise — or no bounded face holds them (settled).
 */
function faceOf(h: Harness, op: string, c: FaceCase): { tx: InsertTx; face: FaceId } | false {
  const af = arenaFaceOr(c.rings);
  if (af !== null && !('refusal' in af)) return af;
  if (af !== null && SEPARATED_CODES.has(af.refusal.code)) tallyRefusal(h, op, c.source, af.refusal, 'insertChain', true, c);
  else settle(h, 'arena refused the face');
  return false;
}

/** One offsetFace case judged (the face as the arena holds it; the distances cycled over its edges). */
export function judgeOffset(h: Harness, c: FaceCase): void {
  const af = faceOf(h, 'offsetFace', c);
  if (af === false) return;
  const edges = faceEdges(af.tx, af.face);
  const rings = ringsOfEdges(edges);
  const d = edges.map((_, i) => c.dists[i % c.dists.length]);
  const ours = offsetFace(af.tx, af.face, d);
  if (separateRefusal(h, 'offsetFace', c.source, ours, () => replayOffset(af.tx, af.face, d), c)) return;
  judge(h, 'offsetFace', c.source, ours, (e) => oracleOffset(rings, edges, d, e), warningsOf(ours), () => JSON.stringify({ rings, d }));
}

/** Does the exact inset of the convex ring by dCm (the oracle's construction) have a coordinate at or beyond 2²³? */
export function insetLeavesLattice(ring: Ring, dCm: number): boolean {
  const exact = oracleInset(ring, dCm, 'clipper2');
  return exact.ok && exact.rings.some((r) => r.some((p) => Math.abs(p.x) >= LATTICE.rangeCm || Math.abs(p.y) >= LATTICE.rangeCm));
}

/**
 * One insetRing case judged: on a face the exact check calls non-convex (or holed) our answer must be E_NON_CONVEX
 * and the case is settled without an oracle; on a convex face the collapsed refusal reads as the empty set (the
 * oracle's result must then be empty too, within the bound), its `lastCm` checked to be below dCm. `inset` is the
 * operation judged — `insetRing`, or an answer a meta-test plants in its place.
 */
export function judgeInset(h: Harness, c: FaceCase, inset: typeof insetRing = insetRing): void {
  const af = faceOf(h, 'insetRing', c);
  if (af === false) return;
  const rings = ringsOfEdges(faceEdges(af.tx, af.face));
  const dCm = c.dists[0];
  const ours = inset(af.tx, af.face, dCm);
  if (rings.length !== 1 || !convexCcw(rings[0])) {
    if (!ours.ok && ours.code === 'E_NON_CONVEX') settle(h, 'E_NON_CONVEX on a non-convex face');
    else keep(h.failures, `insetRing [${c.source}]: a non-convex face not refused E_NON_CONVEX — ${JSON.stringify({ rings, dCm })}`);
    return;
  }
  // on a convex face: insetRing's overlay is its half-plane ring, which only the kernel computes — no replay, so a
  // refusal of it is held to this item's own cap (C-0231)
  if (separateRefusal(h, 'insetRing', c.source, ours, () => null, c)) return;
  let mine: KernelResult<Ring[]> | Ring[] = ours;
  if (!ours.ok && ours.code === 'E_OUT_OF_RANGE' && dCm < 0) {
    // an outward inset of a face near the lattice's edge leaves the lattice (§3.2 (1), (7)): settled when the exact
    // answer (the oracle's construction, built about the ring's centre) has a coordinate at or beyond 2²³ (C-0206 (9))
    if (insetLeavesLattice(rings[0], dCm)) {
      settle(h, 'E_OUT_OF_RANGE: the outward inset leaves the lattice');
      return;
    }
  }
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

/**
 * A run's fast-check parameters (L18's test half; Q97; M0-k-03's `agreementParams` the model): the run's size,
 * PLAT_FUZZ_RUNS (`RUNS`: the bar's 10⁴ on a PR, 10⁶ nightly, 10³ in a RELATED run — §3.7 (i)'s bar follows the tier,
 * unlike M0-k-03's fixed 10⁴), and its seed — PLAT_FUZZ_SEED's when set (the replay, C-0057), else the fixed H32 seed
 * of `arr/agreement/<op>` (M0-k-01's `fuzzParams`) — so a run at one size draws the same cases every time and every
 * line and message its verdict prints names the seed that replays it.
 */
export function agreementParams(op: string): { numRuns: number; seed: number } {
  return { numRuns: RUNS, seed: fuzzParams(`arr/agreement/${op}`).seed };
}

/**
 * One operation's agreement run (L18; Q97): `params` — the operation's `agreementParams` unless a pin plants others —
 * handed whole to `fc.assert` (the seed with the size), every drawn case judged on a harness carrying that seed, then
 * the verdict at the run's size. The agreement tests call it, so their seed, their size and their verdict's replay
 * line cannot part.
 */
export function runAgreement<C>(op: string, cases: fc.Arbitrary<C>, judgeCase: (h: Harness, c: C) => void, params: { numRuns: number; seed: number } = agreementParams(op)): Harness {
  const h = newHarness(params.seed);
  fc.assert(
    fc.property(cases, (c) => {
      judgeCase(h, c);
    }),
    params,
  );
  verdict(h, op, params.numRuns);
  return h;
}

/** The replay tag every verdict line and assertion message carries (L18): the seed, and how to replay it. */
export function replayTag(seed: number | null): string {
  return seed === null ? 'seed none (an unseeded harness)' : `seed ${String(seed)}; replay with PLAT_FUZZ_SEED=${String(seed)}`;
}

/**
 * Refusals counted against C-0150's allowance: 0.1 % of the cases, as M0-k-03's own agreement test allows — the
 * share a check refusing correct answers wholesale exceeds at once, the oracles' own refusals (N-39 / N-40's counted
 * steps) staying far below it where measured (Q97: the notes' section 'Hardening round S5').
 */
export const MAX_REFUSAL_SHARE = 0.001;

/**
 * The cap on a run's counted oracle refusals at its size (L18; Q97), M0-k-03's `agreementRefusalCap` form:
 * max(1, ⌈0.001 × runs⌉) — 1 at the RELATED size 10³, 10 at the PR size 10⁴, 1 000 at the nightly 10⁶. The share is
 * the same at every size (C-0150); at 10³ it is judged on the family seed's fixed draw (`agreementParams`), so a RELATED
 * run meets the same count every time instead of a fresh draw's noise (N-s2-4's 2 at 10³ was an unseeded draw).
 */
export function agreementRefusalCap(runs: number): number {
  return Math.max(1, Math.ceil(MAX_REFUSAL_SHARE * runs));
}

/** N-40's third condition: cases every oracle refused on its own operands, at most 1 % of a family's cases. */
export const MAX_ALL_OWN_REFUSED_SHARE = 0.01;

/**
 * insertChain's refusals each operation's agreement met at the PR size (C-0231; N-46 (4) and (5)): the seeds measured
 * (10⁴ cases per operation each) and the refusals classed insertChain's over all of them — the ratchet's baseline. A
 * cap only falls: a later measure that finds fewer lowers it; raising one is the session's call. The seeds and the
 * per-seed counts are C-0231's (every other operation 0 on every seed; every refused case replays on insertChain alone,
 * 0 of this item's own).
 */
export const REFUSAL_MEASURE: Readonly<Record<string, { readonly seeds: number; readonly count: number }>> = {
  union: { seeds: 12, count: 0 },
  intersection: { seeds: 12, count: 0 },
  difference: { seeds: 12, count: 0 },
  xor: { seeds: 12, count: 0 },
  buffer: { seeds: 12, count: 830 },
  offsetFace: { seeds: 13, count: 413 },
  insetRing: { seeds: 12, count: 0 },
};

/**
 * N-46 (4)'s cap per 10⁴ cases for an operation's insertChain refusals: the measured rate plus 3 · √count on the
 * measured total, (count + 3 · √count) ÷ seeds — as M0-a-05's caps.ts reads it; null for an operation not measured.
 */
export function refusalCapPer1e4(op: string): number | null {
  const m = Object.hasOwn(REFUSAL_MEASURE, op) ? REFUSAL_MEASURE[op] : undefined;
  if (m === undefined) return null;
  return (m.count + 3 * Math.sqrt(m.count)) / m.seeds;
}

/**
 * The smallest count c with P(X ≤ c) ≥ 0.999 for X Poisson with mean `mean`, at least 1 — one run's noise about the
 * cap (caps.ts's `poissonCap`, M0-a-05). The terms are carried as logarithms and summed in order: at the nightly size
 * buffer's mean is about 7 600, where exp(−mean) underflows to 0 and a product of terms would never reach 0.999.
 */
export function poissonCap(mean: number): number {
  if (mean <= 0) return 1;
  let logTerm = -mean;
  let sum = Math.exp(logTerm);
  let c = 0;
  while (sum < 0.999) {
    c += 1;
    logTerm += Math.log(mean / c);
    sum += Math.exp(logTerm);
  }
  return Math.max(1, c);
}

/** N-44 (3) for a refusal caused in arr/ (or without a replay): at most 1 per 10⁴ cases (PR 10⁴: 1; nightly 10⁶: 100). */
export function ownRefusalCap(runs: number): number {
  return Math.ceil(runs / 10_000);
}

/**
 * The cap on an operation's insertChain refusals in one run of `runs` cases: the 99.9 % Poisson point of its measured
 * cap scaled to the run (N-44 (3), N-46 (4), (5)); an operation not measured is held to the own cap.
 */
export function insertChainRefusalCap(op: string, runs: number): number {
  const r = refusalCapPer1e4(op);
  return r === null ? ownRefusalCap(runs) : poissonCap((r * runs) / 10_000);
}

/** When PLAT_FUZZ_COUNTS names a file, one JSON line per verdict with the refusal counts (a re-measure reads them). */
function recordCounts(op: string, runs: number, h: Harness, drawn: number): void {
  const file = process.env.PLAT_FUZZ_COUNTS;
  if (file === undefined || file === '') return;
  const t = h.engineRefusals;
  appendFileSync(file, `${JSON.stringify({ op, seed: h.seed === null ? (process.env.PLAT_FUZZ_SEED ?? null) : String(h.seed), runs, drawn, insertChain: t.insertChain, own: t.own, setup: t.setup, byCode: t.byCode, failures: h.failures.length })}\n`);
}

/**
 * An operation's verdict after its run: the report line printed (both shares, the unattracted count against the
 * guard, the refusals by step, the W_PLACED and far-stretch tallies, our engine's refusals by class), then §3.7 (i)'s
 * bar asserted — 0 crashes (a throw fails the property before this), 0 invalid outputs, every judged case passing,
 * every case accounted for (a refused case among them), the oracles' refusals within C-0150's allowance as N-39 / N-40
 * classify them, our engine's refusals within N-44 (3)'s caps — this item's own at 1 per 10⁴, insertChain's at the
 * family's measured cap (C-0231) — and §13.1's vacuity guard (C-0196 (7)). The line and every assertion's message
 * carry the run's seed and its replay command (L18; Q97: `replayTag`), so a red always says how to replay it; the
 * counted oracle refusals are held to `agreementRefusalCap` at the run's size.
 */
export function verdict(h: Harness, op: string, runs: number = RUNS): void {
  const line = h.report.line(op);
  const tag = replayTag(h.seed);
  const said = (what: string): string => `arr/${op} (${tag}): ${what}`;
  const oracleCap = agreementRefusalCap(runs);
  const settled = Object.values(h.settled).reduce((s, n) => s + n, 0);
  const guard = guardFor(runs, UNATTRACTED_DRAW_MIN);
  const ref = h.engineRefusals;
  const icCap = insertChainRefusalCap(op, runs);
  const ownCap = ownRefusalCap(runs);
  recordCounts(op, runs, h, line.draws);
  console.info(
    `arr/${op}: ${h.seed === null ? 'seed none' : `seed ${String(h.seed)}`} — ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}, share ${line.unattractedShare.toFixed(3)}; attracted ${String(line.attracted)}, share ${line.attractedShare.toFixed(3)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)} by step ${JSON.stringify(h.refusalSteps)} (counted ${String(h.refusalsCounted)} of cap ${String(oracleCap)}, excluded ${String(h.refusalsExcluded)}, every oracle on its own operands ${JSON.stringify(h.allOwnRefused)}); unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; W_PLACED cases ${String(h.placed.cases)} (failed ${String(h.placed.failed)}); stretch beyond √2·attractCm ${String(h.stretchFar.cases)} (failed ${String(h.stretchFar.failed)}, farthest ${h.stretchFar.maxCm.toFixed(1)} cm); snap-rounded ${JSON.stringify(h.snapRounded)}; sources ${JSON.stringify(h.sources)}; guard ${String(guard)}; refused by our engine: insertChain's ${String(ref.insertChain)} (setup ${String(ref.setup)}; cap ${String(icCap)}), own ${String(ref.own)} (cap ${String(ownCap)}) ${JSON.stringify(ref.byCode)}${ref.ownCases.length > 0 ? `; own: ${ref.ownCases.join(' | ')}` : ''} (${tag})`,
  );
  expect(h.failures, said('failures')).toEqual([]);
  expect(h.invalid, said('invalid outputs')).toEqual([]);
  expect(line.failures, said('the report’s failures')).toEqual({});
  expect(line.unattractedPass + line.attractedPass, said('every judged case passes')).toBe(line.draws);
  expect(line.draws + line.unjudged + settled + ref.insertChain + ref.own, said('every case accounted for')).toBe(runs);
  expect(h.refusalsCounted, said(`counted oracle refusals against the cap ${String(oracleCap)} at ${String(runs)} cases`)).toBeLessThanOrEqual(oracleCap);
  for (const [source, n] of Object.entries(h.allOwnRefused)) {
    expect(n, said(`cases every oracle refused on its own operands in ${source}`)).toBeLessThanOrEqual(Math.ceil(MAX_ALL_OWN_REFUSED_SHARE * (h.sources[source] ?? 0)));
  }
  // N-44 (3), N-46 (5): our engine's refusals, out of the comparison — this item's own at 1 per 10⁴, insertChain's at
  // the family's measured cap
  expect(ref.own, said(`refusals caused in arr/ (or without a replay) in ${op}`)).toBeLessThanOrEqual(ownCap);
  expect(ref.insertChain, said(`insertChain's refusals in ${op} against the measured cap`)).toBeLessThanOrEqual(icCap);
  expect(h.placed.failed, said('failed W_PLACED cases')).toBe(0);
  expect(h.stretchFar.failed, said('failed far-stretch cases')).toBe(0);
  // §13.1's vacuity guard (C-0196 (7)): 10⁵ unattracted draws at the nightly size, a tenth of the draws below it
  expect(line.unattracted, said('the vacuity guard')).toBeGreaterThanOrEqual(guard);
  expect(h.report.meetsDrawCount(op, guard), said('the draw count')).toBe(true);
}
