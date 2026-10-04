// Test support for the fuzz generators (M0-k-01): the run count of the generators' own properties, every arbitrary in
// one table with the lattice points each value carries, and the exact checks the tests judge them with — a proper
// crossing, point in ring by winding number. Every topological decision is the kernel's integer `orient2d`.
import fc from 'fast-check';
import { orient2d, type LatticePoint } from '@plat/kernel';
import { arb, FUZZ_FACE_KINDS, type FuzzFace, type FuzzField, type FuzzHoledPolygon } from '@plat/testkit';

/**
 * The generators' own properties run min(PLAT_FUZZ_RUNS, 2 000) cases (C-0161 (8)): their claims name no size, and
 * the tier sizes 10⁴ / 10⁶ are B-FUZZ's per kernel primitive (§13.8), drawn from these generators by M0-k-04's runner.
 */
export const SELF_TEST_RUNS = Math.min(fc.readConfigureGlobal().numRuns ?? 10_000, 2_000);

/** The runs of a property whose check is quadratic in a ≥ 300-vertex shape. */
export const QUADRATIC_RUNS = Math.min(SELF_TEST_RUNS, 100);

/** One arbitrary of the kit, named, with the lattice points of its values. */
export interface ArbCase {
  name: string;
  arbitrary: fc.Arbitrary<unknown>;
  points: (v: unknown) => LatticePoint[];
}

const ring = (v: unknown) => v as LatticePoint[];
const holed = (v: unknown) => (v as FuzzHoledPolygon).polygon.flat();
const face = (v: unknown) => (v as FuzzFace).polygon.flat();
const fieldPoints = (v: unknown) => {
  const f = v as FuzzField;
  return [f.centre, ...f.region];
};

/** Every arbitrary of the kit, each form, and the small-range options of the bounded ones. */
export function allArbitraries(): ArbCase[] {
  const small = { limitCm: 65_536 };
  return [
    { name: 'arb.polygon()', arbitrary: arb.polygon(), points: ring },
    { name: 'arb.polygon({ limitCm: 65 536 })', arbitrary: arb.polygon(small), points: ring },
    { name: 'arb.holedPolygon()', arbitrary: arb.holedPolygon(), points: holed },
    { name: 'arb.holedPolygon({ limitCm: 65 536 })', arbitrary: arb.holedPolygon(small), points: holed },
    { name: 'arb.chain()', arbitrary: arb.chain(), points: ring },
    { name: 'arb.chain({ limitCm: 65 536 })', arbitrary: arb.chain(small), points: ring },
    { name: 'arb.thin()', arbitrary: arb.thin(), points: ring },
    { name: "arb.thin({ shape: 'chain' })", arbitrary: arb.thin({ shape: 'chain' }), points: ring },
    { name: 'arb.thin({ limitCm: 65 536 })', arbitrary: arb.thin(small), points: ring },
    { name: 'arb.nearCollinear()', arbitrary: arb.nearCollinear(), points: ring },
    { name: "arb.nearCollinear({ shape: 'chain' })", arbitrary: arb.nearCollinear({ shape: 'chain' }), points: ring },
    { name: 'arb.nearCollinear({ limitCm: 65 536 })', arbitrary: arb.nearCollinear(small), points: ring },
    { name: 'arb.selfTouching()', arbitrary: arb.selfTouching(), points: ring },
    { name: "arb.selfTouching({ shape: 'chain' })", arbitrary: arb.selfTouching({ shape: 'chain' }), points: ring },
    { name: 'arb.selfTouching({ limitCm: 65 536 })', arbitrary: arb.selfTouching(small), points: ring },
    { name: 'arb.regularSnapped()', arbitrary: arb.regularSnapped(), points: ring },
    { name: "arb.regularSnapped({ shape: 'chain' })", arbitrary: arb.regularSnapped({ shape: 'chain' }), points: ring },
    { name: 'arb.field()', arbitrary: arb.field(), points: fieldPoints },
    { name: 'arb.field({ limitCm: 65 536 })', arbitrary: arb.field(small), points: fieldPoints },
    { name: 'arb.duplicated()', arbitrary: arb.duplicated(), points: ring },
    { name: "arb.duplicated({ shape: 'chain' })", arbitrary: arb.duplicated({ shape: 'chain' }), points: ring },
    { name: 'arb.zeroArea()', arbitrary: arb.zeroArea(), points: ring },
    { name: "arb.zeroArea({ shape: 'chain' })", arbitrary: arb.zeroArea({ shape: 'chain' }), points: ring },
    { name: 'arb.zeroArea({ limitCm: 65 536 })', arbitrary: arb.zeroArea(small), points: ring },
    { name: 'arb.large()', arbitrary: arb.large(), points: ring },
    { name: "arb.large({ shape: 'chain' })", arbitrary: arb.large({ shape: 'chain' }), points: ring },
    { name: 'arb.stroke()', arbitrary: arb.stroke(), points: ring },
    ...FUZZ_FACE_KINDS.map((k) => ({ name: `arb.faceSet('${k}')`, arbitrary: arb.faceSet(k), points: face })),
    ...FUZZ_FACE_KINDS.map((k) => ({ name: `arb.faceSet('${k}', { scale: 'plot' })`, arbitrary: arb.faceSet(k, { scale: 'plot' }), points: face })),
  ];
}

/** Whether p, collinear with ab, lies on the closed segment ab. */
export function within(a: LatticePoint, b: LatticePoint, p: LatticePoint): boolean {
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
}

/** Whether segments ab and cd cross at one point inside both, neither touching the other's line elsewhere (exact). */
export function properCross(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
  const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
  const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
  const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
  return o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0 && o1 !== o2 && o3 !== o4;
}

/** Whether segments ab and cd overlap along a stretch of positive length (exact). */
export function overlap(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): boolean {
  if (orient2d(a.x, a.y, b.x, b.y, c.x, c.y) !== 0 || orient2d(a.x, a.y, b.x, b.y, d.x, d.y) !== 0) return false;
  const useX = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
  const lo1 = useX ? Math.min(a.x, b.x) : Math.min(a.y, b.y);
  const hi1 = useX ? Math.max(a.x, b.x) : Math.max(a.y, b.y);
  const lo2 = useX ? Math.min(c.x, d.x) : Math.min(c.y, d.y);
  const hi2 = useX ? Math.max(c.x, d.x) : Math.max(c.y, d.y);
  return Math.min(hi1, hi2) > Math.max(lo1, lo2);
}

/** Where p lies against a ring: by winding number, exact (coordinates below 2²⁵). */
export function pointInRing(p: LatticePoint, r: readonly LatticePoint[]): 'inside' | 'on' | 'outside' {
  let wn = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    const o = orient2d(a.x, a.y, b.x, b.y, p.x, p.y);
    if (o === 0 && within(a, b, p)) return 'on';
    if (a.y <= p.y) {
      if (b.y > p.y && o > 0) wn += 1;
    } else if (b.y <= p.y && o < 0) wn -= 1;
  }
  return wn !== 0 ? 'inside' : 'outside';
}

/** The point doubled (for exact midpoint tests against a doubled ring). */
export function twice(p: LatticePoint): LatticePoint {
  return { x: 2 * p.x, y: 2 * p.y } as LatticePoint;
}

/** The ring's edges as point pairs (a ring closes; a chain does not). */
export function edgesOf(r: readonly LatticePoint[], closed: boolean): [LatticePoint, LatticePoint][] {
  const out: [LatticePoint, LatticePoint][] = [];
  const n = closed ? r.length : r.length - 1;
  for (let i = 0; i < n; i += 1) out.push([r[i], r[(i + 1) % r.length]]);
  return out;
}

/** Whether two edge indices of a ring or chain are adjacent (share an end by index). */
export function adjacent(i: number, j: number, n: number, closed: boolean): boolean {
  if (Math.abs(i - j) <= 1) return true;
  return closed && ((i === 0 && j === n - 1) || (j === 0 && i === n - 1));
}
