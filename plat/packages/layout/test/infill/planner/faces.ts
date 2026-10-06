// M0-b-02's test fixtures (no vitest import, so a probe can load them): the M0 (b) synthetic face set at CITY block scales (§16 M0 (b): curved, round-joined,
// triangular, C-shaped and holed faces, with plain rectangles and trapezoids beside them), the face's streams, a
// district context in the design's own numbers (poor's plot depths 12–20 m → e = [24, 40] m; w_min 4 m — so the
// tests never read the shipped tables' re-fit, C-0162 (1)'s pattern), and the invariant checks the shape clauses of
// T37-1 and T38-1 assert on every plan.
import { chaikin, createRng, entityKey, seedKey, type Hash128, type LatticePoint, type Rng } from '@plat/kernel';
import type { CutGeometry, CutPlan, CutPlanned, KerbFace, KerbSpine, PlanContext, PlanStreams, XY } from '../../../src/infill/planner.js';

/** A lattice point from numbers the fixture keeps integral. */
export function P(x: number, y: number): LatticePoint {
  return { x: Math.round(x), y: Math.round(y) } as LatticePoint;
}

/** A ring from [x, y] pairs. */
export function ring(xy: readonly (readonly [number, number])[]): LatticePoint[] {
  return xy.map(([x, y]) => P(x, y));
}

const RAD = 3.141592653589793 / 180;

/** Points on a circular arc about (cx, cy) of radius r from angle a0 to a1 (degrees), `n` steps, both ends included. */
export function arc(cx: number, cy: number, r: number, a0: number, a1: number, n: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i += 1) {
    const a = (a0 + ((a1 - a0) * i) / n) * RAD;
    out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return out;
}

/** The spine beside a side a → b of a counter-clockwise ring: offset outward by hw, extended `ext` past both ends. */
export function spineBeside(a: readonly [number, number], b: readonly [number, number], hw: number, ext = 2000, extra: Partial<KerbSpine> = {}): KerbSpine {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  const ux = dx / l;
  const uy = dy / l;
  // Outward of a counter-clockwise ring: the right-hand normal.
  const nx = uy;
  const ny = -ux;
  return {
    points: [
      { x: a[0] - ux * ext + nx * hw, y: a[1] - uy * ext + ny * hw },
      { x: b[0] + ux * ext + nx * hw, y: b[1] + uy * ext + ny * hw },
    ],
    halfWidthCm: hw,
    ...extra,
  };
}

/** A face from a counter-clockwise outer polygon with a spine beside every side (half-width hw). */
export function withSpines(outer: readonly (readonly [number, number])[], hw = 300, holes: LatticePoint[][] = []): KerbFace {
  const spines: KerbSpine[] = [];
  for (let i = 0; i < outer.length; i += 1) spines.push(spineBeside(outer[i], outer[(i + 1) % outer.length], hw));
  return { rings: [ring(outer), ...holes], spines };
}

const RECT: [number, number][] = [
  [0, 0],
  [12000, 0],
  [12000, 7000],
  [0, 7000],
];
const TRAPEZOID: [number, number][] = [
  [0, 0],
  [12000, 0],
  [11000, 8000],
  [0, 6500],
];
const TRIANGLE: [number, number][] = [
  [0, 0],
  [14000, 0],
  [5000, 10000],
];
/** A C-shape opening to the west: its notch 7 000 cm deep. */
const C_SHAPE: [number, number][] = [
  [0, 0],
  [13000, 0],
  [13000, 10000],
  [0, 10000],
  [0, 6500],
  [7000, 6500],
  [7000, 3500],
  [0, 3500],
];

/** A curved face: a straight south side and a northern arc bulging 2 500 cm, sampled every 5°. */
function curvedRing(): [number, number][] {
  // The arc's chord (0, 6000)–(12000, 6000), sagitta 2 500: r = (6000² + 2500²) / (2 · 2500) = 8 450.
  const r = 8450;
  const cy = 6000 + 2500 - r;
  const half = Math.asin(6000 / r) / RAD;
  const top = arc(6000, cy, r, 90 - half, 90 + half, Math.round((2 * half) / 5));
  const pts: [number, number][] = [[0, 0], [12000, 0], ...top];
  return pts.map(([x, y]) => [Math.round(x), Math.round(y)] as [number, number]);
}

/** A rectangle 12 000 × 7 000 whose corners are round joins of radius `r` (a kerb's convex corners), 10° pieces. */
function roundJoined(r: number): [number, number][] {
  const w = 12000;
  const h = 7000;
  const pts: [number, number][] = [];
  pts.push(...arc(w - r, r, r, -90, 0, 9));
  pts.push(...arc(w - r, h - r, r, 0, 90, 9));
  pts.push(...arc(r, h - r, r, 90, 180, 9));
  pts.push(...arc(r, r, r, 180, 270, 9));
  return pts.map(([x, y]) => [Math.round(x), Math.round(y)] as [number, number]);
}

/** A Chaikin-smoothed pentagon (two passes), snapped: a kerb with no straight run. */
function chaikinRing(): [number, number][] {
  const pent = [
    { x: 0, y: 0 },
    { x: 13000, y: 1000 },
    { x: 14000, y: 8000 },
    { x: 6000, y: 11000 },
    { x: -1000, y: 7000 },
  ];
  return chaikin(pent, { closed: true, iterations: 2 }).map((p) => [Math.round(p.x), Math.round(p.y)] as [number, number]);
}

const HOLE = ring([
  [5000, 3500],
  [5000, 6500],
  [9000, 6500],
  [9000, 3500],
]);

/** The M0 (b) synthetic face set (§16 M0 (b)), each with a spine beside every outer side. */
export const FACES: Readonly<Record<string, KerbFace>> = Object.freeze({
  rectangle: withSpines(RECT),
  trapezoid: withSpines(TRAPEZOID),
  triangle: withSpines(TRIANGLE),
  cShape: withSpines(C_SHAPE),
  curved: { rings: [ring(curvedRing())], spines: [spineBeside([0, 0], [12000, 0], 300)] },
  roundJoined: {
    rings: [ring(roundJoined(300))],
    spines: [
      spineBeside([0, 0], [12000, 0], 300, 300),
      spineBeside([12000, 0], [12000, 7000], 300, 300),
      spineBeside([12000, 7000], [0, 7000], 300, 300),
      spineBeside([0, 7000], [0, 0], 300, 300),
    ],
  },
  chaikin: { rings: [ring(chaikinRing())] },
  holed: withSpines(
    [
      [0, 0],
      [14000, 0],
      [14000, 10000],
      [0, 10000],
    ],
    300,
    [HOLE],
  ),
});

export const FACE_NAMES = Object.keys(FACES).sort();

/** The design's district context: poor's plot depths 12–20 m → e = [24, 40] m (§4.6 step 1, §4.7); w_min 4 m. */
export const CTX: PlanContext = Object.freeze({ depthRangeM: [24, 40] as const, minFrontageM: 4 });

/** A face's streams: a fresh derivation's Rng, the face's entity key from a seed and a lineage. */
export function streamsFor(seed: number, lineage: readonly [number, number] = [0x1234_5678, 0x0bad_cafe], rng: Rng = createRng()): PlanStreams {
  const key: Hash128 = entityKey(seedKey(seed), lineage as unknown as Hash128 as never, { layer: 'ground', part: 0 });
  return { rng, faceKey: key, entity: `face:${seed.toString(16)}`, reroll: 0, epoch: 0 };
}

/** The plan as a cut (fails the test otherwise). */
export function asCut(r: ReturnType<typeof import('../../../src/infill/planner.js').planCut>): CutPlanned {
  if (!r.ok) throw new Error(`plan refused: ${r.code} ${r.detail}`);
  if (r.value.kind !== 'cut') throw new Error(`plan is ${r.value.kind}`);
  return r.value;
}

export function sub(b: XY, a: XY): XY {
  return { x: b.x - a.x, y: b.y - a.y };
}
export function dot(a: XY, b: XY): number {
  return a.x * b.x + a.y * b.y;
}
export function cross(a: XY, b: XY): number {
  return a.x * b.y - a.y * b.x;
}
export function norm(v: XY): number {
  return Math.hypot(v.x, v.y);
}
export function unitV(v: XY): XY {
  const l = norm(v);
  return { x: v.x / l, y: v.y / l };
}

/** The lattice tolerance of a direction over a leg: both ends snapped by ≤ √½ cm. */
export function latticeTol(legCm: number): number {
  return (2 * Math.SQRT1_2) / legCm;
}

/** Is p on the closed ring (within tol cm of an edge)? */
export function onRing(r: readonly LatticePoint[], p: XY, tol = 0.5): boolean {
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const d = sub(b, a);
    const t = Math.max(0, Math.min(1, dot(sub(p, a), d) / dot(d, d)));
    const q = { x: a.x + d.x * t, y: a.y + d.y * t };
    if (norm(sub(p, q)) <= tol) return true;
  }
  return false;
}

/** The ring index p lies on (−1 for none). */
export function ringOf(face: { rings: readonly (readonly LatticePoint[])[] }, p: XY, tol = 0.5): number {
  for (let i = 0; i < face.rings.length; i += 1) if (onRing(face.rings[i], p, tol)) return i;
  return -1;
}

/** Every plan of a face over `n` seeds that is a cut. */
export function cutsOver(plan: (seed: number) => ReturnType<typeof import('../../../src/infill/planner.js').planCut>, n: number): CutPlanned[] {
  const out: CutPlanned[] = [];
  for (let s = 1; s <= n; s += 1) {
    const r = plan(s);
    if (r.ok && r.value.kind === 'cut') out.push(r.value);
  }
  return out;
}

export type { CutPlan };
