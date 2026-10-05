// M0-a-07's exit bar B-FUZZ (§13.1; marked *here* in M0-work.json): 0 crashes, 0 hangs, 0 invalid outputs per
// partitioner on PLAT_FUZZ_RUNS random concave and holed faces — 10⁴ in the PR tier, 10⁶ nightly (C-0057). The item's own
// fast-check property meets the bar (the spec note N-16). Each case builds one random face — a star of 6 – 12 vertices
// at random radii (concave; near-collinear runs where neighbouring radii agree; a regular, convex one in a share of
// cases) inside the lower half of a framed square, with a random star hole in half of them — and runs every partitioner
// on it, each from the same arena (the arena's before-image put back between them, M0-a-06's savepoint):
// splitFace (and mergeFaces on its children: `mergeFaces ∘ splitFace` restores the arena), connectHole, mergeFaces,
// absorbSliver, radialSplit, ringBand, claimSubFace (ring form) and pinVertices, with random parameters. A crash is a
// throw; a hang fails the hard timeout; an output is valid when the arena passes every oracle (§3.10's half-edge links,
// minEdge, one vertex per lattice point, no crossing, clearance, level consistency, the face records against the level
// views, nesting, Euler per level, the index state), a split's children tile the parent exactly (integer area2) and are
// each simple — never a pinch (the listed property) — and a refusal is one of the op's codes and writes nothing.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { faceWalk, type FaceId, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import {
  absorbSliver,
  claimSubFace,
  connectHole,
  mergeFaces,
  pinVertices,
  radialSplit,
  ringBand,
  splitFace,
} from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { restoreSavepoint, takeSavepoint } from '../../src/tx/savepoint.js';
import { tx, type Overlay } from '../../src/tx/index.js';
import { dmath } from '../../src/dmath/index.js';
import { TIMEOUT } from '../insert/step3-5/support.js';
import { commit, faceArea2Big, faceAt, halves, healthy, pt, spec, state } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:9' }];
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** The hard timeout (0 hangs): M0-a-04's 600 s, or a few times the CONTENDED cost per case at 10⁴ where the run is longer. */
const HARD = Math.max(TIMEOUT, RUNS * 60);
const CX = 2000;
const CY = 1000;

interface Case {
  readonly radii: readonly number[];
  readonly jitter: readonly number[];
  readonly phase: number;
  readonly convex: boolean;
  readonly hole: readonly number[] | null;
  readonly i: number;
  readonly j: number;
  readonly bend: readonly [number, number] | null;
  readonly rays: readonly number[];
  readonly width: number;
  readonly floor: readonly [number, number];
  readonly claim: readonly [number, number, number, number];
}

const arbCase: fc.Arbitrary<Case> = fc.integer({ min: 6, max: 12 }).chain((k) => fc.record({
  radii: fc.array(fc.integer({ min: 400, max: 900 }), { minLength: k, maxLength: k }),
  jitter: fc.array(fc.integer({ min: -400, max: 400 }), { minLength: k, maxLength: k }),
  phase: fc.integer({ min: 0, max: 35_999 }),
  convex: fc.boolean(),
  hole: fc.option(fc.array(fc.integer({ min: 60, max: 200 }), { minLength: 3, maxLength: 6 }), { nil: null }),
  i: fc.integer({ min: 0, max: k - 1 }),
  j: fc.integer({ min: 0, max: k - 1 }),
  bend: fc.option(fc.tuple(fc.integer({ min: -350, max: 350 }), fc.integer({ min: -350, max: 350 })), { nil: null }),
  rays: fc.array(fc.integer({ min: -36_000, max: 72_000 }), { minLength: 0, maxLength: 5 }),
  width: fc.integer({ min: 10, max: 600 }),
  floor: fc.tuple(fc.integer({ min: 0, max: 1500 }), fc.integer({ min: 0, max: 2_000_000 })),
  claim: fc.tuple(fc.integer({ min: 900, max: 2000 }), fc.integer({ min: 100, max: 1000 }), fc.integer({ min: 2000, max: 3200 }), fc.integer({ min: 1000, max: 1900 })),
}));

/** A point at `cdeg`, distance r from the centre, rounded (dmath). */
function polar(cdeg: number, r: number): [number, number] {
  const a = (cdeg * 3.141592653589793) / 18_000;
  return [Math.round(CX + r * dmath.cos(a)), Math.round(CY + r * dmath.sin(a))];
}

/** The case's arena and its face (null where the random rings did not leave the face the case describes). */
function build(c: Case): { p: Plat; f: FaceId; star: [number, number][]; hole: [number, number][] } | null {
  const p = halves();
  const k = c.radii.length;
  const star = c.radii.map((r, i) => polar(c.phase + (i * 36_000) / k + (c.convex ? 0 : c.jitter[i]), c.convex ? c.radii[0] : r));
  const knots = [{ index: 0, role: 'junction', ordinal: 0 }];
  commit(p, 1, (o) => insertChain(o, star.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'star:1' }], 'mandatory', { closed: true, knots }));
  let hole: [number, number][] = [];
  if (c.hole !== null) {
    const m = c.hole.length;
    hole = c.hole.map((r, i) => polar(c.phase + (i * 36_000) / m, r));
    commit(p, 1, (o) => insertChain(o, hole.map(([x, y]) => pt(x, y)), [{ role: 'district_bound', entity: 'hole:1' }], 'mandatory', { closed: true }));
  }
  const f = faceAt(p, 1, CX + 300, CY);
  if (f < 0) return null;
  return { p, f, star, hole };
}

/** Is every ring of the face simple (no vertex visited twice: never a pinch)? */
function simpleFace(p: Plat, f: FaceId): boolean {
  for (const ring of faceWalk(p, 1, f)) {
    const seen = new Set<number>();
    for (const h of ring) {
      const v = p.halfEdges.origin[h];
      if (seen.has(v)) return false;
      seen.add(v);
    }
  }
  return true;
}

/** The children tile the parent exactly: their area2 sums to the area2 of their joint boundary less the cut. */
function tiles(p: Plat, a: FaceId, b: FaceId): boolean {
  const all = new Set<HalfEdgeId>([...faceWalk(p, 1, a).flat(), ...faceWalk(p, 1, b).flat()]);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let s = 0n;
  for (const h of all) if (!all.has(h ^ 1)) s += BigInt(X[O[h]]) * BigInt(Y[O[h ^ 1]]) - BigInt(X[O[h ^ 1]]) * BigInt(Y[O[h]]);
  return faceArea2Big(p, 1, a) + faceArea2Big(p, 1, b) === s;
}

/**
 * One trial on the case's arena: the op in its own batch; a refusal must be one of `codes` and write nothing; a commit
 * leaves a valid arena and passes `judge`. The arena's image is put back afterwards.
 */
function trial<T>(p: Plat, name: string, codes: readonly string[], op: (o: Overlay) => KernelResult<T>, judge: (value: T) => void = () => {}): void {
  const image = takeSavepoint(p);
  const before = state(p);
  const r = tx(p, spec(1), op);
  if (!r.ok) {
    expect(codes, `${name}: refused ${r.code} (${r.detail})`).toContain(r.code);
    expect(state(p), `${name}: a refusal wrote`).toBe(before);
  } else {
    healthy(p);
    judge(r.value.value as T);
  }
  restoreSavepoint(image);
}

const CUT = ['E_NOT_TWO_CROSSINGS', 'E_HOLE_CONTACT'];

describe('B-FUZZ (§13.1): every partitioner on PLAT_FUZZ_RUNS random concave and holed faces', () => {
  it('0 crashes, 0 hangs, 0 invalid outputs; splitFace never bends a cut into a pinch', () => {
    let built = 0;
    const done = new Map<string, number>();
    const count = (k: string): void => {
      done.set(k, (done.get(k) ?? 0) + 1);
    };
    fc.assert(
      fc.property(arbCase, (c) => {
        const b = build(c);
        if (b === null) return;
        built++;
        const { p, f, star, hole } = b;
        const a = star[c.i];
        const z = star[c.j];
        const cut = c.bend === null ? [a, z] : [a, [CX + c.bend[0], CY + c.bend[1]] as [number, number], z];
        const parent = state(p).replace(/#v\d+$/, '');
        trial(p, 'splitFace', CUT, (o) => splitFace(o, f, cut.map(([x, y]) => pt(x, y)), { rows: DB }), ([l, r]) => {
          count('split');
          expect(simpleFace(p, l) && simpleFace(p, r), 'a child with a pinch').toBe(true);
          expect(tiles(p, l, r), 'the children do not tile the parent').toBe(true);
          // mergeFaces ∘ splitFace restores the arena (and the id).
          const m = tx(p, spec(1), (o) => mergeFaces(o, l, r));
          expect(m.ok && (m.value.value === f), 'the merge does not restore the record').toBe(true);
          expect(state(p).replace(/#v\d+$/, '')).toBe(parent);
        });
        if (hole.length > 0) {
          trial(p, 'connectHole', CUT, (o) => connectHole(o, f, [a, hole[c.j % hole.length]].map(([x, y]) => pt(x, y)), { rows: DB }), (g) => {
            count('hole');
            expect(faceWalk(p, 1, g)).toHaveLength(1);
          });
          const h = faceAt(p, 1, hole[0][0] + Math.sign(CX - hole[0][0]) * 20, hole[0][1] + Math.sign(CY - hole[0][1]) * 20);
          if (h >= 0 && h !== f) trial(p, 'mergeFaces', ['E_STRUCTURAL', 'E_LEVEL', 'E_DEGENERATE'], (o) => mergeFaces(o, f, h), () => count('merge'));
        } else {
          const out = faceAt(p, 1, 100, 100);
          trial(p, 'mergeFaces', ['E_STRUCTURAL', 'E_LEVEL', 'E_DEGENERATE'], (o) => mergeFaces(o, f, out), () => count('merge'));
        }
        trial(p, 'absorbSliver', [], (o) => absorbSliver(o, f, { minWidthCm: c.floor[0], minAreaCm2: c.floor[1] }), () => count('absorb'));
        const apex = hole.length > 0 ? a : [CX + (c.bend?.[0] ?? 0) / 4, CY + (c.bend?.[1] ?? 0) / 4];
        trial(p, 'radialSplit', [...CUT, 'E_DEGENERATE'], (o) => radialSplit(o, f, pt(apex[0], apex[1]), c.rays, { rows: DB }), (s) => {
          count('radial');
          for (const g of s) expect(simpleFace(p, g)).toBe(true);
        });
        trial(p, 'ringBand', ['E_NON_CONVEX', 'E_BELOW_MIN_WIDTH', 'E_DEGENERATE', ...CUT], (o) => ringBand(o, f, c.width, { rows: DB }), (r) => {
          count('band');
          expect(r.band.length).toBeGreaterThanOrEqual(3);
        });
        const [x0, y0, x1, y1] = c.claim;
        trial(p, 'claimSubFace', ['E_SELF_INTERSECT', 'E_DEGENERATE'], (o) => claimSubFace(o, { ring: [pt(x0, y0), pt(x1, y0), pt(x1, y1), pt(x0, y1)] }, 'claim:1'), () => count('claim'));
        trial(p, 'pinVertices', [], (o) => pinVertices(o, [{ role: 'junction', entity: 'star:1' }]), () => count('pin'));
      }),
    );
    // The families were exercised (the commits counted; refusals are the rest). Informative only.
    console.log(`B-FUZZ faces: ${built} built of ${RUNS}; commits ${JSON.stringify([...done].sort((x, y) => (x[0] < y[0] ? -1 : 1)))}`);
    expect(built).toBeGreaterThan(RUNS / 2);
    for (const k of ['split', 'merge', 'absorb', 'claim', 'pin']) expect(done.get(k) ?? 0, k).toBeGreaterThan(0);
    if (RUNS >= 1000) for (const k of ['hole', 'radial', 'band']) expect(done.get(k) ?? 0, k).toBeGreaterThan(0);
  }, HARD);
});
