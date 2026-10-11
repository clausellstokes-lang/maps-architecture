// M0-a-01: `src/num/exact.ts` equals every copy it replaces (kernel-plan.md §1.0 N-1 – N-4; C-0314). Each shared
// predicate is compared with each copy of copies.ts's table on the same inputs, four ways: exhaustively on small
// windows (every tie, endpoint and degenerate case), on the fuzz arenas (the edges, vertices and face rings of tx's
// B-FUZZ batch sequences), on the inputs the copies' own tests pin, and as fast-check properties at PLAT_FUZZ_RUNS
// (10⁴ in the PR tier, C-0057). Each constant is pinned to its one home's value. A site a later round has consolidated
// (its copy gone) must import the shared name instead.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { isHalfEdgeLive, isVertexLive, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { PI as GEOM_PI } from '../../src/geom/common.js';
import { HOT_PIXEL_SQ } from '../../src/insert/placement.js';
import { HOT_PIXEL_CM } from '../../src/index/index.js';
import { LATTICE } from '../../src/num/index.js';
import {
  BOX_RANGE,
  PI,
  POW2_20,
  divScaled,
  insideDoubledRing,
  insideLatticeRing,
  insideOrOnRing,
  segmentCloserThan,
  segmentsMeet,
  strictlyInsideRings,
  windingNumber,
} from '../../src/num/exact.js';
import { tx } from '../../src/tx/index.js';
import type { Level, LatticePoint } from '../../src/types/index.js';
import { levelCycles } from '../arena/support.js';
import { randomBatch, rng, type Live, type Mix } from '../tx/fuzzgen.js';
import { framed, spec } from '../tx/support.js';
import { CLOSER_SITES, CONST_SITES, DIV_SITES, MEET_SITES, RING_SITES, constOf, importsShared, ringCase, type Reading, type RingCase } from './copies.js';
import { MAX, TIMEOUT, coord, generator, intIn, pt } from './support.js';

/** What exact.ts answers for each reading — the table that maps every N-3 caller to the shared predicate it becomes. */
const READ: Readonly<Record<Reading, (rings: readonly RingCase[], qx: number, qy: number) => boolean | number>> = {
  'open, even–odd, lattice': (r, x, y) => insideLatticeRing(r[0].pts, x, y),
  'open, even–odd, doubled': (r, x, y) => insideDoubledRing(r[0].pts, x, y),
  'closed, even–odd, lattice (fewer than three points: outside)': (r, x, y) => r[0].pts.length >= 3 && insideOrOnRing(r[0].pts, x, y, 'evenOdd'),
  'closed, non-zero, lattice': (r, x, y) => insideOrOnRing(r[0].pts, x, y, 'nonZero'),
  'strict, even–odd, lattice, ring set': (r, x, y) => strictlyInsideRings(r.map((c) => c.pts), x, y, 'evenOdd'),
  'strict, non-zero, lattice rings, any query, ring set': (r, x, y) => strictlyInsideRings(r.map((c) => c.pts), x, y, 'nonZero'),
  'winding number, lattice': (r, x, y) => windingNumber(r[0].pts, x, y),
};

/** The sites still holding a copy (a consolidated one is the table test's). */
const live = <S extends { call: unknown }>(sites: readonly S[]): (S & { call: NonNullable<S['call']> })[] =>
  sites.filter((s): s is S & { call: NonNullable<S['call']> } => s.call !== null);

/** Fails with the first disagreement, naming the site and the input. */
function agree(id: string, got: unknown, want: unknown, input: () => string): void {
  if (!Object.is(got, want)) expect.fail(`${id}: ${String(got)} where exact.ts gives ${String(want)} at ${input()}`);
}

// ---- the fuzz arenas ----------------------------------------------------------------------------------------------------

interface FuzzArena {
  readonly p: Plat;
  /** Live edges as [ax, ay, bx, by]. */
  readonly edges: readonly (readonly [number, number, number, number])[];
  /** Live vertices' points. */
  readonly points: readonly LatticePoint[];
  /** Each level's cycles, as ring cases on the arena itself. */
  readonly rings: readonly (readonly RingCase[])[];
}

/** The arena after `steps` of tx's B-FUZZ random batches from `seed` (fuzz.test.ts's recipe: seed × 7919). */
function fuzzArena(seed: number, steps: number, mix: Mix): FuzzArena {
  const r = rng(seed * 7919);
  const p = framed();
  const lv: Live = { ways: [], kerbs: [], next: 0 };
  for (let step = 0; step < steps; step++) {
    const keep = { ways: lv.ways.slice(), kerbs: lv.kerbs.slice() };
    const b = randomBatch(p, lv, r, mix);
    if (!tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok) {
      lv.ways = keep.ways;
      lv.kerbs = keep.kerbs;
    }
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const edges: [number, number, number, number][] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) if (isHalfEdgeLive(p, h)) edges.push([X[O[h]], Y[O[h]], X[O[h + 1]], Y[O[h + 1]]]);
  const points: LatticePoint[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) points.push(pt(X[v], Y[v]));
  const rings = [0, 1, 2, 3, 4].map((l) =>
    levelCycles(p, l as Level).map((c: HalfEdgeId[]): RingCase => ({ pts: c.map((h) => pt(X[O[h]], Y[O[h]])), p, halfEdges: c, vertexIds: c.map((h) => O[h]) })),
  );
  return { p, edges, points, rings };
}

/** fuzz.test.ts's generator with insertion-heavy mixes, so the arenas grow: ways and lanes, and finer chains along ways. */
const GROW: Mix = { way: 0.45, lane: 0.95 };
const GROW_ALONG: Mix = { way: 0.35, lane: 0.7, along: 0.25 };
const ARENAS: readonly FuzzArena[] = [fuzzArena(1, 40, GROW), fuzzArena(286, 40, GROW), fuzzArena(93, 40, GROW_ALONG)];

// ---- the table -------------------------------------------------------------------------------------------------------

describe('the copy table (kernel-plan.md §1.0)', () => {
  it('names every site the plan lists, each a copy in place or an import of the shared name', () => {
    expect([CLOSER_SITES.length, MEET_SITES.length, RING_SITES.length, CONST_SITES.length, DIV_SITES.length]).toEqual([3, 5, 11, 22, 2]);
    for (const s of [...CLOSER_SITES, ...MEET_SITES, ...RING_SITES, ...DIV_SITES]) {
      if (s.call === null) expect(importsShared(s.file, s.symbol), `${s.id}: the copy is gone but ${s.file} imports no shared name`).toBe(true);
    }
    const readings = new Set(RING_SITES.map((s) => s.reading));
    expect([...readings].sort()).toEqual(Object.keys(READ).sort());
  });

  it('the fuzz arenas hold edges, vertices and face rings on every level', () => {
    for (const a of ARENAS) {
      expect(a.edges.length).toBeGreaterThan(10);
      expect(a.points.length).toBeGreaterThan(10);
      expect(a.rings.every((level) => level.length > 0)).toBe(true);
    }
  });
});

// ---- N-1 -------------------------------------------------------------------------------------------------------------

describe('N-1: segmentCloserThan ≡ placement\'s, tx\'s closer, warp\'s closerThan', () => {
  const sites = live(CLOSER_SITES);
  const all = (px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number): void => {
    const want = segmentCloserThan(px, py, ax, ay, bx, by, r);
    for (const s of sites) agree(s.id, s.call(px, py, ax, ay, bx, by, r), want, () => `p (${px}, ${py}), a–b (${ax}, ${ay})–(${bx}, ${by}), r ${r}`);
  };

  it('on every lattice point of a window around small segments, r 0 – 6: the ties, the inclusive ends, the point segment', () => {
    for (let ax = -2; ax <= 2; ax++) for (let ay = -2; ay <= 2; ay++) for (let bx = -2; bx <= 2; bx++) for (let by = -2; by <= 2; by++) {
      for (let px = -6; px <= 6; px++) for (let py = -6; py <= 6; py++) for (const r of [0, 1, 2, 3, 5, 6]) all(px, py, ax, ay, bx, by, r);
    }
  });

  it('on the fuzz arenas: every live vertex and its eight lattice neighbours against every live edge, at minEdge and attractCm', () => {
    for (const a of ARENAS) {
      for (const q of a.points) for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
        for (const [ax, ay, bx, by] of a.edges) {
          all(q.x + ox, q.y + oy, ax, ay, bx, by, LATTICE.minEdgeCm);
          all(q.x + ox, q.y + oy, ax, ay, bx, by, LATTICE.attractCm);
        }
      }
    }
  }, TIMEOUT);

  it('on the inputs the copies\' own tests pin (warp/validate.test.ts, warp/fixtures.test.ts, the 25 cm cases)', () => {
    const cases: [number, number, number, number, number, number, number][] = [
      [0, 25, -100, 0, 100, 0, 25],
      [0, 24, -100, 0, 100, 0, 25],
      [117, 17, -100, 0, 100, 0, 25],
      [118, 18, -100, 0, 100, 0, 25],
      [1517, 1030, 1517, 1005, 2000, 1009, 25],
      [1517, 1030, 1517, 1004, 2000, 1009, 25],
      [0, 25, 0, 0, 0, 0, 25],
      [7, 24, 0, 0, 1000, 0, 25],
      [-15, 20, 0, 0, 1000, 0, 25],
      [1015, -20, 0, 0, 1000, 0, 25],
      [500, 26, 0, 0, 1000, 1, 26],
    ];
    for (const c of cases) all(...c);
  });

  it('property at PLAT_FUZZ_RUNS: random lattice segments and points across the range, near the r-band half the time', () => {
    fc.assert(
      fc.property(coord(), coord(), coord(), coord(), coord(), coord(), fc.double({ min: -0.2, max: 1.2, noNaN: true }), fc.integer({ min: -40, max: 40 }), fc.integer({ min: 0, max: 40 }), fc.boolean(), (ax, ay, bx0, by0, px0, py0, t, off, r, near) => {
        // near: a short segment from a and a point within a few cm of the band r away from it
        const bx = near ? Math.max(-MAX, Math.min(MAX, ax + (bx0 % 4096))) : bx0;
        const by = near ? Math.max(-MAX, Math.min(MAX, ay + (by0 % 4096))) : by0;
        const l = Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) || 1;
        const px = near ? Math.max(-MAX, Math.min(MAX, Math.round(ax + t * (bx - ax) - (off * (by - ay)) / l))) : px0;
        const py = near ? Math.max(-MAX, Math.min(MAX, Math.round(ay + t * (by - ay) + (off * (bx - ax)) / l))) : py0;
        all(px, py, ax, ay, bx, by, r);
      }),
    );
  }, TIMEOUT);
});

// ---- N-2 -------------------------------------------------------------------------------------------------------------

describe('N-2: segmentsMeet ≡ decimate\'s, faces\' segmentsTouch, invariants\', medial\'s, skeleton\'s point-typed form', () => {
  const sites = live(MEET_SITES);
  const all = (v: readonly number[]): void => {
    const [ax, ay, bx, by, cx, cy, dx, dy] = v;
    const want = segmentsMeet(ax, ay, bx, by, cx, cy, dx, dy);
    for (const s of sites) agree(s.id, s.call(ax, ay, bx, by, cx, cy, dx, dy), want, () => `(${ax}, ${ay})–(${bx}, ${by}) with (${cx}, ${cy})–(${dx}, ${dy})`);
  };

  it('on every pair of segments with ends in a 4 × 4 grid: crossings, touches, overlaps, point segments', () => {
    for (let a = 0; a < 16; a++) for (let b = 0; b < 16; b++) for (let c = 0; c < 16; c++) for (let d = 0; d < 16; d++) {
      all([a & 3, a >> 2, b & 3, b >> 2, c & 3, c >> 2, d & 3, d >> 2]);
    }
  });

  it('on the fuzz arenas: every pair of live edges', () => {
    for (const a of ARENAS) for (const e of a.edges) for (const f of a.edges) all([...e, ...f]);
  }, TIMEOUT);

  it('property at PLAT_FUZZ_RUNS: random, collinear and end-sharing pairs across the range', () => {
    const step = fc.integer({ min: -2000, max: 2000 });
    const collinear = fc.tuple(coord(), coord(), step, step, fc.array(fc.integer({ min: -3000, max: 3000 }), { minLength: 4, maxLength: 4 })).map(([x, y, sx, sy, ts]) => {
      const c = (v: number): number => Math.max(-MAX, Math.min(MAX, v));
      return ts.flatMap((t) => [c(x + t * sx), c(y + t * sy)]);
    });
    const any = fc.array(coord(), { minLength: 8, maxLength: 8 });
    const sharing = fc.tuple(any, fc.integer({ min: 0, max: 3 })).map(([v, k]) => {
      const out = v.slice();
      out[4 + 2 * (k & 1)] = v[2 * (k >> 1)];
      out[5 + 2 * (k & 1)] = v[2 * (k >> 1) + 1];
      return out;
    });
    fc.assert(fc.property(fc.oneof(any, collinear, sharing), (v) => { all(v); }));
  }, TIMEOUT);

  it('property at PLAT_FUZZ_RUNS: finite doubles, as the medial axis passes its arcs\' ends (the same arithmetic, so the same answer)', () => {
    const d = fc.double({ min: -1e7, max: 1e7, noNaN: true, noDefaultInfinity: true });
    fc.assert(fc.property(fc.array(d, { minLength: 8, maxLength: 8 }), (v) => { all(v); }));
  }, TIMEOUT);
});

// ---- N-3 -------------------------------------------------------------------------------------------------------------

describe('N-3: the crossing-number sites ≡ exact.ts\'s reading for each (open / closed / strict; even–odd / non-zero; lattice / doubled)', () => {
  const sites = live(RING_SITES);
  const all = (rings: readonly RingCase[], qx: number, qy: number): void => {
    for (const s of sites) {
      const use = s.ringSet ? rings : rings.slice(0, 1);
      agree(s.id, s.call(use, qx, qy), READ[s.reading](use, qx, qy), () => `q (${qx}, ${qy}) in ${use.map((r) => r.pts.map((q) => `(${q.x}, ${q.y})`).join(' ')).join(' | ')}`);
    }
  };
  /** A random ring of 1 – 9 points in a small box, so collinear runs, repeats, spikes and self-crossings are common. */
  const smallRing = (rnd: () => number, lo: number, hi: number): RingCase =>
    ringCase(Array.from({ length: intIn(rnd, 1, 9) }, () => pt(intIn(rnd, lo, hi), intIn(rnd, lo, hi))));

  it('on 3 000 small random ring sets against every lattice and doubled query of their box', () => {
    const rnd = generator(0x0e3a);
    for (let k = 0; k < 3000; k++) {
      const rings = Array.from({ length: intIn(rnd, 1, 3) }, () => smallRing(rnd, 0, 6));
      for (let qx = -1; qx <= 13; qx++) for (let qy = -1; qy <= 13; qy++) all(rings, qx, qy);
    }
  }, TIMEOUT);

  it('on the fuzz arenas: every level\'s face rings, alone and as one ring set, against vertices, doubled vertices and edge midpoints', () => {
    for (const a of ARENAS) {
      for (const level of a.rings) {
        const queries: [number, number][] = [];
        for (const q of a.points) queries.push([q.x, q.y], [2 * q.x, 2 * q.y], [q.x + 1, q.y - 1]);
        for (const [ax, ay, bx, by] of a.edges) queries.push([ax + bx, ay + by]);
        for (const ring of level) for (const [qx, qy] of queries) all([ring], qx, qy);
        for (const [qx, qy] of queries) all(level, qx, qy);
      }
    }
  }, TIMEOUT);

  it('property at PLAT_FUZZ_RUNS: random rings and ring sets across the range, queries at a vertex\'s height or column half the time', () => {
    const point = fc.tuple(coord(), coord()).map(([x, y]) => pt(x, y));
    const ringArb = fc.array(point, { minLength: 1, maxLength: 12 });
    fc.assert(
      fc.property(fc.array(ringArb, { minLength: 1, maxLength: 3 }), coord(), coord(), fc.nat(), (rs, x, y, k) => {
        const v = rs[0][k % rs[0].length];
        const [qx, qy] = k % 4 === 0 ? [x, v.y] : k % 4 === 1 ? [v.x, y] : k % 4 === 2 ? [v.x, v.y] : [x, y];
        all(rs.map(ringCase), qx, qy);
      }),
    );
  }, TIMEOUT);

  it('property at PLAT_FUZZ_RUNS: kerb\'s strict reading at double queries (its chain pieces\' midpoints)', () => {
    const kerb = RING_SITES.find((s) => s.id === 'N-3 arr/kerb');
    if (kerb === undefined || kerb.call === null) return;
    const call = kerb.call;
    const small = fc.integer({ min: -8, max: 8 });
    fc.assert(
      fc.property(fc.array(fc.array(fc.tuple(small, small).map(([x, y]) => pt(x, y)), { minLength: 1, maxLength: 8 }), { minLength: 1, maxLength: 3 }), fc.double({ min: -9, max: 9, noNaN: true }), fc.double({ min: -9, max: 9, noNaN: true }), fc.boolean(), (rs, x, y, half) => {
        const [qx, qy] = half ? [Math.round(x) + 0.5, Math.round(y)] : [x, y];
        const cases = rs.map(ringCase);
        agree(kerb.id, call(cases, qx, qy), READ[kerb.reading](cases, qx, qy), () => `q (${qx}, ${qy})`);
      }),
    );
  }, TIMEOUT);
});

// ---- N-4 -------------------------------------------------------------------------------------------------------------

describe('N-4: every spelt constant holds its one home\'s value; every div is divScaled', () => {
  const value: Readonly<Record<string, number>> = {
    PI,
    BOX_RANGE,
    SCALE: POW2_20,
    HOT_PIXEL_SQ: HOT_PIXEL_CM * HOT_PIXEL_CM,
    HOT_SQ: HOT_PIXEL_CM * HOT_PIXEL_CM,
    MIN_EDGE: LATTICE.minEdgeCm,
    ATTRACT: LATTICE.attractCm,
  };

  it('each site\'s constant equals its home\'s, or the site imports the name', () => {
    for (const s of CONST_SITES) {
      const v = constOf(s.file, s.name);
      if (v === null) expect(importsShared(s.file, s.name), `${s.id}: the constant is gone but ${s.file} imports no ${s.name}`).toBe(true);
      else expect(Object.is(v, value[s.name]), `${s.id} = ${v}, its home (${s.home}) ${value[s.name]}`).toBe(true);
    }
  });

  it('the homes hold the values the literals spell: π, 2²⁴, 2²⁰, 0.71², 25, 26', () => {
    expect(PI).toBe(GEOM_PI);
    expect(PI).toBe(3.141592653589793);
    expect(BOX_RANGE).toBe(16_777_216);
    expect(POW2_20).toBe(1_048_576);
    expect(HOT_PIXEL_SQ).toBe(HOT_PIXEL_CM * HOT_PIXEL_CM);
    expect(HOT_PIXEL_SQ).toBe(0.5041);
    expect([LATTICE.minEdgeCm, LATTICE.attractCm]).toEqual([25, 26]);
  });

  it('property at PLAT_FUZZ_RUNS: kerb\'s div and buffer\'s div are divScaled(·, ·, \'length\'), NaN, ∞ and the 2⁻²⁰ floor included', () => {
    const sites = live(DIV_SITES);
    const num = fc.oneof(fc.double(), fc.constantFrom(0, -0, 1, -1, Number.NaN, Infinity, -Infinity));
    const den = fc.oneof(fc.double(), fc.double({ min: -(2 ** -19), max: 2 ** -19 }), fc.constantFrom(2 ** -20, -(2 ** -20), 2 ** -20 - 2 ** -73, 0, -0, Number.NaN, Infinity));
    fc.assert(
      fc.property(num, den, (n, d) => {
        const want = divScaled(n, d, 'length');
        for (const s of sites) agree(s.id, s.call(n, d), want, () => `${n} ÷ ${d}`);
      }),
    );
  }, TIMEOUT);
});
