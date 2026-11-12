// M0-a-09 hardening round S20, line 6: the observer (observer.ts) the CITY probe installs, judged against the test-side
// readings it replaces where no mock can stand — derived.test.ts's relation (relation.ts, its service read from this
// file's own wrapper of insertChain) and the record form of the definition oracle (definition.ts `judge` on the test's
// insertion record). The pins:
//   * THE CLASSES: on line 8's fixtures and a corpus slice (B-FUZZ chord networks, max(10, RUNS ÷ 100)), the observer's
//     relation class of every read equals the class derived.test.ts's reading gives it wherever the two no-move readings
//     agree (the mock's: every dry-run call placed its points at themselves; the CITY reading's: served first with none
//     of the move warnings); every disagreement listed (the CITY reading's cost, REPORTED); an attracted first read is
//     never no-move (OB1);
//   * THE ARENA FORM (restated in fix round S21: round S20's pin — 'its verdict equals the record form's, and both fail X
//     translated 10 cm' — was red by the seed): what it PROMISES, asserted on every corpus face it judges — at GRID_CM
//     the capped form IS the oracle (`judge`) on the arena's own truth (X's whole verdict; X + 10 cm's samples); its
//     vertex and simplicity checks read no sample and are the same at its capped step (max(GRID_CM, √(area ⁄
//     CAP_SAMPLES))), so a plant failed by a vertex or simplicity fault is failed at the capped step; where the record's
//     chain geometry about F is the arena's, the two readings (widths, ends, junction ends) and verdicts are equal. What
//     it does NOT promise, counted in the `OBSERVER arena form` line and never asserted: a catch by samples alone at the
//     capped step (both forms skip every sample within MARGIN_CM of F, of the truth's boundary and of X, so a 10 cm
//     translation leaves a strip ≈ 2 cm wide a coarser grid may never sample — round S20's F1, network [{a: 11879,
//     b: 919, hw: 10}] face 1, a named fixture below); and the record form's verdict where the two readings' geometry
//     differs (a crossing's split vertex is a seam of the arena's buffer, a snapped crossing bends the arena's route off
//     the record's placed points); the arena form imports nothing of arr/ beyond its two constants (OB3: an import pin
//     on the module's text);
//   * THE LINEAGE AND THE IDENTITY on a two-cut fixture: a grandchild's parent is the child it was cut from (the LATEST
//     earlier containing content), never the root (OB2), and 986 (c)'s identity holds or is classed;
//   * BOTH PLANTS FAIL: the comparand translated 5 cm on every no-move read fails the relation; X translated 10 cm
//     before the oracle fails the oracle;
//   * THE LOCAL ARBITRATION (the session's ruling J785 (2)): a MOVED read of the corpus is X-RIGHT, X-WRONG with X
//     translated 10 cm (its control), no unplanted fixture read X-WRONG; a THIN difference THIN; the witnesses at the
//     midpoints (LA1 – LA3); the truth at a point reads spinesOf's vertex rule at the point (LA4); farPairs is
//     hausdorff's far set with each sample's nearest point.
import { readFileSync } from 'node:fs';
import fc from 'fast-check';
import { afterEach, describe, expect, it, vi } from 'vitest';

const rec = vi.hoisted(() => ({
  opSave: 0,
  on: false,
  calls: [] as { save: number; given: { x: number; y: number }[]; placed: { x: number; y: number }[] | null; refused: string | null; warnings: string[] }[],
  ways: [] as { entity: string; placed: { x: number; y: number }[] | null }[],
}));

vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { rec.opSave += 1; return real.opSave(...a); } };
});
vi.mock('../../../src/insert/insertChain.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/insert/insertChain.js')>();
  return {
    ...real,
    insertChain: (...a: Parameters<typeof real.insertChain>) => {
      const r = real.insertChain(...a);
      const [t, points, roles] = a;
      const dry = rec.on && roles.some((x) => x.role === 'invisible');
      const way = roles.find((x) => x.role === 'way' && typeof x.entity === 'string');
      const p = t.plat;
      const placed = r.ok ? r.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] })) : null;
      if (dry) {
        const moves = new Set(['W_ATTRACTED', 'W_PLACED', 'W_SNAP_PASSES', 'W_WEDGE_ROUTED']);
        rec.calls.push({ save: rec.opSave, given: points.map((q) => ({ x: q.x, y: q.y })), placed, refused: r.ok ? null : `${r.code} ${r.detail}`, warnings: (r.ok ? r.warnings : []).map((w) => w.code).filter((c) => moves.has(c)) });
      } else if (way !== undefined && !rec.on) rec.ways.push({ entity: way.entity, placed });
      return r;
    },
  };
});

import type { FaceId, Plat } from '../../../src/arena/index.js';
import { bridgesOf, kerbCensus, kerbParts, readFace, readKerb, ringCrosses, type SpineWidths } from '../../../src/arr/kerb.js';
import { exactRegion, exactRegionOfFace, setExactShadow } from '../../../src/arr/kerbExact.js';
import { connectHole, splitFace } from '../../../src/faces/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { err, ok } from '../../../src/num/index.js';
import { setOwner } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { clean, endsOf, GRID_CM, insideRings, judge, judgeCapped, MARGIN_CM, spinesOf, truthAtOf, truthOfFace, type TruthChain, type Verdict, type XY } from './definition.js';
import { hausdorffFast, ShadowObserver, widthsFromRead } from './observer.js';
import { arbitrateLocal, farPairs, hausdorff, NEAR_CM, relate, relateX, ringDist, servedOf, servedOfRead, witnessesOf, WITNESS_GAP_CM, xRightBy, type RelClass } from './relation.js';
import { commit, framed, network, P, readIn, ringsOf, widthsOf, type Chord } from './support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const NETS = Math.max(10, Math.floor(RUNS / 100));
const HARD = 3_600_000;

afterEach(() => {
  setExactShadow(null);
});

/** The live L1 faces. */
function liveL1(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) out.push(f);
  return out;
}

/** Is q strictly inside the rings? */
function insideF(rs: readonly (readonly XY[])[], q: XY): boolean {
  let w = 0;
  for (const r of rs) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const s = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && s > 0) w += 1;
      } else if (b.y <= q.y && s < 0) w -= 1;
    }
  }
  return w !== 0;
}

/** The live L1 face holding q. */
function faceAtXY(p: Plat, q: readonly [number, number]): FaceId {
  const f = liveL1(p).find((g) => insideF(ringsOf(p, 1, g), { x: q[0], y: q[1] }));
  if (f === undefined) throw new Error(`test: no L1 face holds (${String(q[0])}, ${String(q[1])})`);
  return f;
}

/** A recorded case: its arena, widths and the record (each chain's placed points, width and ends). */
interface Case {
  readonly p: Plat;
  readonly ws: SpineWidths;
  readonly chains: Omit<TruthChain, 'junction'>[];
}

type Table = Record<string, { halfWidthCm: number; ends: 'round' | 'square' }>;

/** A case builder: ways and lanes, each recorded as it is placed. */
function builder(table: Table): { p: Plat; way: (e: string, pts: readonly (readonly [number, number])[], closed?: boolean) => void; lane: (inside: readonly [number, number], e: string, pts: readonly (readonly [number, number])[], slit?: boolean) => void; own: () => void; done: () => Case } {
  const p = framed();
  const chains: Omit<TruthChain, 'junction'>[] = [];
  const push = (e: string, placed: XY[], closed: boolean): void => {
    const w = table[e];
    chains.push({ key: `way:${e}`, role: 'way', points: placed, closed, hw: w === undefined ? null : w.halfWidthCm, ends: w === undefined ? 'round' : w.ends });
  };
  return {
    p,
    way: (e, pts, closed = false) => {
      const n0 = rec.ways.length;
      commit(p, 1, (o) => insertChain(o, pts.map(([x, y]) => P(x, y)), [{ role: 'way', entity: e }], 'mandatory', closed ? { closed: true } : {}));
      push(e, (rec.ways.slice(n0).find((c) => c.entity === e)?.placed ?? []) as XY[], closed);
    },
    lane: (inside, e, pts, slit = false) => {
      const n0 = rec.ways.length;
      commit(p, 1, (o) => {
        const f = faceAtXY(p, inside);
        const rows = [{ role: 'way', entity: e }];
        const r = slit ? connectHole(o, f, pts.map(([x, y]) => P(x, y)), { rows }) : splitFace(o, f, pts.map(([x, y]) => P(x, y)), { rows });
        return r.ok ? ok(null) : err<null>(r.code, r.detail);
      });
      push(e, (rec.ways.slice(n0).find((c) => c.entity === e && c.placed !== null)?.placed ?? []) as XY[], false);
    },
    own: () => {
      const faces = liveL1(p);
      commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
    },
    done: () => ({ p, ws: (c) => (c.role === 'way' ? (table[c.entity] ?? null) : null), chains }),
  };
}

/** Line 8's fixtures (derived.test.ts's FIX), recorded. */
const FIXTURES: Record<string, () => Case> = {
  half: () => {
    const b = builder({ 'way:p': { halfWidthCm: 100, ends: 'round' }, 'way:q': { halfWidthCm: 100, ends: 'round' } });
    b.way('way:p', [[0, 101], [3899, 4000]]);
    b.way('way:q', [[4000, 100], [100, 4000]]);
    b.own();
    return b.done();
  },
  oblique: () => {
    const b = builder({ 'lane:1': { halfWidthCm: 100, ends: 'round' } });
    b.way('way:z', [[0, 2000], [4000, 2000]]);
    b.own();
    b.lane([2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    return b.done();
  },
  ring: () => {
    const b = builder({ 'way:r': { halfWidthCm: 50, ends: 'square' } });
    b.way('way:r', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    b.own();
    return b.done();
  },
  holeSlit: () => {
    const b = builder({ 'way:h': { halfWidthCm: 40, ends: 'round' }, 'lane:s': { halfWidthCm: 30, ends: 'round' } });
    b.way('way:h', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    b.own();
    b.lane([500, 500], 'lane:s', [[2000, 0], [2000, 1000]], true);
    return b.done();
  },
  empty: () => {
    const b = builder({ 'way:1': { halfWidthCm: 100, ends: 'round' }, 'way:2': { halfWidthCm: 100, ends: 'round' } });
    b.way('way:1', [[0, 2000], [4000, 2000]]);
    b.way('way:2', [[0, 2100], [4000, 2100]]);
    b.own();
    return b.done();
  },
  partless: () => {
    const b = builder({});
    b.way('way:a', [[2000, 0], [2000, 4000]]);
    b.way('way:b', [[2000, 2000], [4000, 2000]]);
    b.own();
    return b.done();
  },
  dangling: () => {
    const b = builder({});
    b.way('way:0', [[2000, 0], [2000, 800], [2600, 1500]]);
    b.own();
    return b.done();
  },
  reach: () => {
    const b = builder({ 'way:s': { halfWidthCm: 20, ends: 'round' }, 'lane:1': { halfWidthCm: 100, ends: 'round' } });
    b.way('way:s', [[0, 2000], [4000, 2000]]);
    b.own();
    b.lane([2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    return b.done();
  },
  noReach: () => {
    const b = builder({ 'way:w': { halfWidthCm: 40, ends: 'round' }, 'lane:1': { halfWidthCm: 15, ends: 'square' } });
    b.way('way:w', [[0, 2000], [4000, 2000]]);
    b.own();
    b.lane([2000, 1000], 'lane:1', [[2000, 0], [2000, 2000]]);
    return b.done();
  },
  kink: () => {
    const b = builder({ 'way:k': { halfWidthCm: 0.9, ends: 'round' } });
    b.way('way:k', [[0, 1000], [4000, 3333]]);
    b.own();
    b.lane([3000, 500], 'lane:1', [[1995, 0], [1995, 2164]]);
    return b.done();
  },
  narrow: () => {
    const b = builder({ 'way:n': { halfWidthCm: 3, ends: 'round' } });
    b.way('way:n', [[0, 1000], [4000, 3000]]);
    b.own();
    return b.done();
  },
};

/** B-FUZZ's chord arbitrary (bfuzz.test.ts's). */
const chordArb: fc.Arbitrary<Chord> = fc.record({
  a: fc.integer({ min: 0, max: 15_999 }),
  b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
  hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
  knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
  ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
});

/** Round S20's F1 (its closing check, seed 1696442892): the network whose face 1 the capped step's grid misses X + 10 cm on. */
const F1_COUNTEREXAMPLE: readonly Chord[] = [{ a: 11879, b: 919, hw: 10, knots: null, ends: 'round' }];

/** A chord network recorded (support.ts `network`, its chords' placed points read through the wrapper). */
function chordCase(chords: readonly Chord[]): Case & { faces: FaceId[] } {
  const n0 = rec.ways.length;
  const n = network(chords);
  const chains: Omit<TruthChain, 'junction'>[] = [];
  for (const c of rec.ways.slice(n0)) {
    const w = n.table[c.entity];
    if (w === undefined || c.placed === null) continue;
    chains.push({ key: `way:${c.entity}`, role: 'way', points: c.placed, closed: false, hw: 'knotRole' in w ? [w.values[0], w.values[1]] : w.halfWidthCm, ends: 'knotRole' in w ? 'round' : w.ends });
  }
  return { p: n.p, ws: widthsOf(n.table), chains, faces: n.faces };
}

/** Is q on the frame [0, 4000]²'s boundary? */
const onFrameXY = (q: XY): boolean => q.x === 0 || q.x === 4000 || q.y === 0 || q.y === 4000;

/** derived.test.ts's reading of one read (the wrapper's service; relate against X_U / X_F) beside the observer's. */
interface Pair {
  readonly at: string;
  readonly derived: { by: string; noMove: boolean; cls: RelClass } | null;
  readonly city: { by: string; noMove: boolean; cls: RelClass | null; warnings: string[]; xcls: string | null; local: string | null; witnesses: string[] };
}

/** Every face of a case read once with the observer installed and the wrapper recording: the two readings side by side. */
function readPairs(c: Case, faces: readonly FaceId[], o: ShadowObserver, label: string): Pair[] {
  const out: Pair[] = [];
  setExactShadow(o);
  for (const f of faces) {
    const n0 = o.perRead.length;
    let warnings: string[] = [];
    const got = readIn(c.p, 1, (t) => {
      rec.calls = [];
      rec.on = true;
      const s0 = rec.opSave;
      const k = readKerb(t, f, c.ws);
      rec.on = false;
      return { k, calls: rec.calls, saves: rec.opSave - s0, faithful: kerbCensus(c.p)?.faithful ?? 'none' };
    });
    if (got.k.ok) warnings = got.k.warnings.map((w) => w.code);
    const city = o.perRead[n0];
    let derived: Pair['derived'] = null;
    if (got.k.ok) {
      const served = servedOf(got.calls, got.saves, got.faithful);
      const rf = readFace(c.p, f, c.ws);
      const xu = kerbParts(rf.rings, got.k.value.spines, false);
      const xf = kerbParts(rf.rings, got.k.value.spines, true);
      if (xu.ok && xf.ok) {
        const comparand = served.by === 'faithful' ? exactRegion(rf.rings, xf.value) : exactRegion(rf.rings, xu.value);
        derived = { by: served.by, noMove: served.noMove, cls: relate(got.k.value.region, comparand, served).cls };
      }
    }
    out.push({ at: `${label} face ${String(f)}`, derived, city: { by: city.by, noMove: city.noMove, cls: city.cls, warnings, xcls: city.xcls, local: city.local, witnesses: city.witnesses.map((w) => `${w.cls}${w.note === undefined ? '' : `/${w.note}`}@${w.gap.toFixed(1)}`) } });
  }
  setExactShadow(null);
  return out;
}

describe('line 6 (a), (c): the observer\'s relation classes against derived.test.ts\'s reading', () => {
  it('line 8\'s fixtures and a corpus slice: equal classes wherever the two no-move readings agree; an attracted first read never no-move (OB1)', { timeout: HARD }, () => {
    const pairs: Pair[] = [];
    for (const [name, build] of Object.entries(FIXTURES)) {
      const c = build();
      pairs.push(...readPairs(c, liveL1(c.p), new ShadowObserver(), name));
    }
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), (chords) => {
        const c = chordCase(chords);
        pairs.push(...readPairs(c, c.faces, new ShadowObserver(), `network ${JSON.stringify(chords)}`));
      }),
      { numRuns: NETS },
    );
    const both = pairs.filter((q) => q.derived !== null && q.city.cls !== null);
    const agree = both.filter((q) => (q.derived as NonNullable<Pair['derived']>).noMove === q.city.noMove);
    const disagree = both.filter((q) => (q.derived as NonNullable<Pair['derived']>).noMove !== q.city.noMove);
    // where the readings agree on no-move, the classes are equal; a moved read's MOVED by the mock's locus is the CITY
    // reading's BEYOND or MOVED (within DRY_MOVE_CM) — the locus is the mock's alone
    for (const q of agree) {
      const d = q.derived as NonNullable<Pair['derived']>;
      if (d.noMove || (d.cls !== 'MOVED' && d.cls !== 'BEYOND')) expect(q.city.cls, `${q.at}: derived ${JSON.stringify(d)}`).toBe(d.cls);
      else expect(['MOVED', 'BEYOND'], q.at).toContain(q.city.cls);
    }
    // OB1: a first read whose served warnings carry a move is never no-move in the CITY reading
    const attracted = pairs.filter((q) => q.city.by === 'first' && q.city.warnings.some((w) => ['W_ATTRACTED', 'W_PLACED', 'W_SNAP_PASSES', 'W_WEDGE_ROUTED'].includes(w)));
    expect(attracted.length, 'attracted first reads met').toBeGreaterThan(0);
    for (const q of attracted) expect(q.city.noMove, q.at).toBe(false);
    expect(servedOfRead({ faithful: 'none' }, false, ['W_ATTRACTED']).noMove).toBe(false);
    expect(servedOfRead({ faithful: 'none' }, false, []).noMove).toBe(true);
    console.info(`OBSERVER classes: ${String(pairs.length)} reads, ${String(both.length)} with both classes, no-move readings agree on ${String(agree.length)}, disagree on ${String(disagree.length)} (REPORTED: ${JSON.stringify(disagree.slice(0, 10).map((q) => ({ at: q.at, derived: q.derived, city: q.city.noMove })))}); attracted first reads ${String(attracted.length)}`);
    expect(agree.length).toBeGreaterThan(both.length / 2);
  });
});

describe('the observer\'s reported distances', () => {
  it('hausdorffFast is relation.ts\'s hausdorff (its samples, its segDist): X against X_U and the construction\'s region on every fixture face', { timeout: HARD }, () => {
    let n = 0;
    for (const [, build] of Object.entries(FIXTURES)) {
      const c = build();
      for (const f of liveL1(c.p)) {
        const ex = exactRegionOfFace(c.p, f, c.ws);
        const rf = readFace(c.p, f, c.ws);
        const k = readIn(c.p, 1, (t) => readKerb(t, f, c.ws));
        if (!ex.ok || !k.ok) continue;
        const xu = kerbParts(rf.rings, k.value.spines, false);
        if (!xu.ok) continue;
        const XU = exactRegion(rf.rings, xu.value);
        for (const [a, b] of [[ex.value.region, XU], [k.value.region, ex.value.region], [k.value.region.map((r) => r.map((q) => P(q.x + 7, q.y - 3))), XU]] as const) {
          expect(hausdorffFast(a, b)).toBe(hausdorff(a, b).h);
          // farPairs (J785 (2) (a)): hausdorff's h and far set, each far sample paired with its nearest point at its distance
          const fp = farPairs(a, b, NEAR_CM);
          const hh = hausdorff(a, b, NEAR_CM);
          expect(fp.h).toBe(hh.h);
          expect(fp.far.map((q) => q.q)).toEqual(hh.far);
          for (const q of fp.far) expect(Math.abs(Math.hypot(q.q.x - q.r.x, q.q.y - q.r.y) - q.d)).toBeLessThan(1e-6);
          n += 1;
        }
      }
    }
    expect(n).toBeGreaterThan(30);
  });
});

describe('line 6 (b): the arena form of the definition oracle', () => {
  it('OB3: the module imports nothing of arr/ beyond its two constants (an import pin on its text)', () => {
    const text = readFileSync(new URL('./definition.ts', import.meta.url), 'utf8');
    // every import statement, a bare side-effect import and a dynamic import included
    const imports = [...text.matchAll(/^import\s+(?:[^;]*?\s+from\s+)?'([^']+)';$/gms)].map((m) => m[1]).sort();
    expect(text).not.toMatch(/import\s*\(/);
    expect(imports).toEqual(['../../../src/arena/index.js', '../../../src/arr/buffer.js', '../../../src/index/index.js', '../../../src/types/index.js', './simple.js']);
    expect(text).toMatch(/^import \{ SAGITTA_CM \} from '\.\.\/\.\.\/\.\.\/src\/arr\/buffer\.js';$/m);
  });

  it('on every corpus face it judges (line 8\'s fixtures, round S20\'s F1 counterexample, B-FUZZ chord networks): at GRID_CM the capped form IS the oracle (judge) on the arena\'s truth — X\'s whole verdict, X + 10 cm\'s samples; its vertex and simplicity checks are the same at its capped step, so X + 10 cm failed by a vertex or simplicity fault is failed at the capped step; where the record\'s and the arena\'s chain geometry coincide, the two readings and verdicts are equal — the sample-only catches at the capped step and the record-against-arena verdicts elsewhere counted, never asserted', { timeout: HARD }, () => {
    let judged = 0;
    // `same` the faces whose incident chain geometry the record and the arena read alike (asserted equal there);
    // `agree` / `differ` the record form's unplanted verdict against the arena form's at its step elsewhere (counted)
    let same = 0;
    let agree = 0;
    const differ: string[] = [];
    // X + 10 cm: `planted` the faces the arena truth's oracle fails it on (judge = the capped form at GRID_CM); of them
    // `byVertex` with a vertex or simplicity fault (asserted at the capped step) and `sampleOnly` by samples alone
    // (caught k of n at the capped step: counted); `recordPlantDiffer` the faces the record form's X + 10 cm verdict
    // differs from the arena truth's (counted)
    let planted = 0;
    let byVertex = 0;
    let sampleOnly = 0;
    let sampleOnlyCaught = 0;
    const recordPlantDiffer: string[] = [];
    const floors = { judged: 0, same: 0, planted: 0, byVertex: 0, sampleOnly: 0 };
    const unjudged: Record<string, number> = {};
    /** A chain's geometry and its reading (route, closedness; width, ends, junction ends). */
    const geometry = (c: TruthChain): string => JSON.stringify([c.key, c.route ?? c.points, c.closed]);
    // (a profile of two equal knots is the scalar the read's widths give: the same buffer)
    const reading = (c: TruthChain): string => JSON.stringify([c.key, Array.isArray(c.hw) && c.hw[0] === c.hw[1] ? c.hw[0] : c.hw, c.ends, c.junction]);
    const check = (c: Case, faces: readonly FaceId[], label: string, floor: boolean): void => {
      const truth = endsOf(c.chains, onFrameXY);
      for (const f of faces) {
        const ex = exactRegionOfFace(c.p, f, c.ws);
        if (!ex.ok) continue;
        const rf = readFace(c.p, f, c.ws);
        const a = truthOfFace(c.p, f, widthsFromRead(rf));
        if (!a.ok) {
          unjudged[a.unjudged] = (unjudged[a.unjudged] ?? 0) + 1;
          continue;
        }
        const along = bridgesOf(c.p, rf.edges);
        const own = new Set(rf.rings.map((r) => JSON.stringify(r)));
        const exempt = (r: readonly LatticePoint[]): boolean | null => (own.has(JSON.stringify(r)) ? !ringCrosses(r, along) : null);
        const F = ringsOf(c.p, 1, f);
        const X = ex.value.region;
        const at = `${label} face ${String(f)}`;
        const verdict = (v: Verdict): unknown[] => [v.misses, v.vertexFaults, v.simplicity, v.judged, v.samples, v.spines];
        judged += 1;
        if (floor) floors.judged += 1;
        // (i) at ONE step the capped form is the oracle on the arena's own truth: X's whole verdict (X lies in F)
        const vo = judge(a.value.F, a.value.chains, X, exempt);
        const vg = judgeCapped(a.value.F, a.value.chains, X, GRID_CM, exempt);
        expect(verdict(vg), `${at}: X, the arena form at GRID_CM against judge on the arena's truth`).toEqual(verdict(vo));
        const va = judgeCapped(a.value.F, a.value.chains, X, a.value.step, exempt);
        const vr = judge(F, truth, X, exempt);
        // the two truth readings: where the record's chain geometry about F is the arena's, the readings and verdicts are
        const rs = spinesOf(F, truth);
        const as = spinesOf(a.value.F, a.value.chains);
        const rAll = [...rs.edge, ...rs.vertex, ...rs.touching];
        const aAll = [...as.edge, ...as.vertex, ...as.touching];
        if (JSON.stringify(F) === JSON.stringify(a.value.F) && JSON.stringify(rAll.map(geometry)) === JSON.stringify(aAll.map(geometry))) {
          same += 1;
          if (floor) floors.same += 1;
          expect(aAll.map(reading), `${at}: the arena's reading of the record's chains`).toEqual(rAll.map(reading));
          expect(verdict(vo), `${at}: the arena truth's verdict on X against the record's`).toEqual(verdict(vr));
        } else if (clean(va) === clean(vr)) agree += 1;
        else differ.push(`${at}: record ${JSON.stringify(vr.misses.slice(0, 2))} ${JSON.stringify(vr.vertexFaults.slice(0, 2))}; arena ${JSON.stringify(va.misses.slice(0, 2))} ${JSON.stringify(va.vertexFaults.slice(0, 2))}`);
        if (X.length === 0) continue;
        const X10 = X.map((r) => r.map((q) => P(q.x + 10, q.y)));
        // (i) X + 10 cm: the samples (each inside F) read alike by the capped form at GRID_CM and by judge
        const po = judge(a.value.F, a.value.chains, X10, exempt);
        const pg = judgeCapped(a.value.F, a.value.chains, X10, GRID_CM, exempt);
        expect([pg.misses, pg.judged, pg.samples], `${at}: X + 10 cm, the arena form's samples at GRID_CM against judge`).toEqual([po.misses, po.judged, po.samples]);
        // (ii) the vertex and simplicity checks read no sample: the same at the capped step as at GRID_CM
        const pa = judgeCapped(a.value.F, a.value.chains, X10, a.value.step, exempt);
        expect(pa.vertexFaults, `${at}: X + 10 cm, vertex faults at step ${a.value.step.toFixed(2)} and at GRID_CM`).toEqual(pg.vertexFaults);
        expect(pa.simplicity, `${at}: X + 10 cm, simplicity at step ${a.value.step.toFixed(2)} and at GRID_CM`).toEqual(pg.simplicity);
        const pr = judge(F, truth, X10, exempt);
        if (clean(pr) !== clean(pg)) recordPlantDiffer.push(`${at}: record ${String(pr.misses.length)} misses ${JSON.stringify(pr.vertexFaults.slice(0, 2))}, arena at GRID_CM ${String(pg.misses.length)} misses ${JSON.stringify(pg.vertexFaults.slice(0, 2))}`);
        if (clean(pg)) continue;
        planted += 1;
        if (floor) floors.planted += 1;
        if (pg.vertexFaults.length > 0 || pg.simplicity.length > 0) {
          // a failure that reads no sample is the capped form's at its own step too
          byVertex += 1;
          if (floor) floors.byVertex += 1;
          expect(clean(pa), `${at}: X + 10 cm, the arena form at step ${a.value.step.toFixed(2)} (vertex faults ${JSON.stringify(pg.vertexFaults.slice(0, 2))})`).toBe(false);
        } else {
          // a failure by samples alone: the capped grid may never meet the ≈ 2 cm strip — counted, never asserted
          sampleOnly += 1;
          if (floor) floors.sampleOnly += 1;
          if (!clean(pa)) sampleOnlyCaught += 1;
        }
      }
    };
    for (const [name, build] of Object.entries(FIXTURES)) {
      const c = build();
      check(c, liveL1(c.p), `fixture ${name}`, true);
    }
    // round S20's F1 (every seed meets it): a sample-only failure the capped step does not catch
    const f1 = chordCase(F1_COUNTEREXAMPLE);
    check(f1, f1.faces, `F1 counterexample ${JSON.stringify(F1_COUNTEREXAMPLE)}`, true);
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), (chords) => {
        const c = chordCase(chords);
        // a chord along a frame side runs on the level-0 content (derived.test.ts discards it: no truth the end rule reads)
        if (c.chains.some((q) => q.points.every((v) => v.x === 0) || q.points.every((v) => v.x === 4000) || q.points.every((v) => v.y === 0) || q.points.every((v) => v.y === 4000))) return;
        check(c, c.faces, `network ${JSON.stringify(chords)}`, false);
      }),
      { numRuns: NETS },
    );
    console.info(`OBSERVER arena form: ${String(judged)} faces judged by both forms; at GRID_CM the capped form = judge on the arena's truth on all; the record's chain geometry the arena's on ${String(same)} (readings and verdicts equal), elsewhere the verdicts on X equal on ${String(agree)} of ${String(agree + differ.length)} (counted: ${JSON.stringify(differ.slice(0, 3))}); X + 10 cm failed by the arena truth's oracle on ${String(planted)}: at the capped step ${String(byVertex)} with a vertex or simplicity fault (asserted, all caught), ${String(sampleOnly)} by samples alone, caught ${String(sampleOnlyCaught)} of ${String(sampleOnly)} (counted, never asserted); the record form's X + 10 cm verdict differs on ${String(recordPlantDiffer.length)} (counted: ${JSON.stringify(recordPlantDiffer.slice(0, 3))}); UNJUDGED ${JSON.stringify(unjudged)}; the fixtures' floors ${JSON.stringify(floors)}`);
    // the floors are the fixtures' and F1's (seed-independent)
    expect(floors.judged).toBeGreaterThan(20);
    expect(floors.same).toBeGreaterThan(0);
    expect(floors.planted).toBeGreaterThan(5);
    expect(floors.byVertex).toBeGreaterThan(0);
    expect(floors.sampleOnly).toBeGreaterThan(0);
  });

  it('round S20\'s F1, a named fixture (network [{a: 11879, b: 919, hw: 10, round}], face 1): X + 10 cm is failed by the record form by 13 samples; the arena form at GRID_CM reads the same 13; at its capped step (22.80 cm) it has no sample in the ≈ 2 cm strip and no vertex fault — clean: the capped form does not promise a sample-only catch', () => {
    const c = chordCase(F1_COUNTEREXAMPLE);
    const f = 1;
    expect(c.faces).toContain(f);
    const ex = exactRegionOfFace(c.p, f, c.ws);
    expect(ex.ok).toBe(true);
    if (!ex.ok) return;
    const rf = readFace(c.p, f, c.ws);
    const a = truthOfFace(c.p, f, widthsFromRead(rf));
    expect(a.ok).toBe(true);
    if (!a.ok) return;
    const along = bridgesOf(c.p, rf.edges);
    const own = new Set(rf.rings.map((r) => JSON.stringify(r)));
    const exempt = (r: readonly LatticePoint[]): boolean | null => (own.has(JSON.stringify(r)) ? !ringCrosses(r, along) : null);
    const F = ringsOf(c.p, 1, f);
    const truth = endsOf(c.chains, onFrameXY);
    const X = ex.value.region;
    // unplanted, X is right on the face by both forms
    expect(clean(judge(F, truth, X, exempt))).toBe(true);
    expect(clean(judgeCapped(a.value.F, a.value.chains, X, a.value.step, exempt))).toBe(true);
    const X10 = X.map((r) => r.map((q) => P(q.x + 10, q.y)));
    const pr = judge(F, truth, X10, exempt);
    const pg = judgeCapped(a.value.F, a.value.chains, X10, GRID_CM, exempt);
    const pa = judgeCapped(a.value.F, a.value.chains, X10, a.value.step, exempt);
    expect(a.value.step.toFixed(2)).toBe('22.80');
    expect([pr.misses.length, pr.vertexFaults.length, pr.simplicity.length, pr.judged, pr.samples]).toEqual([13, 0, 0, 4873, 5200]);
    expect([pg.misses.length, pg.vertexFaults.length, pg.simplicity.length, pg.judged, pg.samples]).toEqual([13, 0, 0, 4873, 5200]);
    expect(pg.misses).toEqual(pr.misses);
    expect([pa.misses.length, pa.vertexFaults.length, pa.simplicity.length, pa.judged, pa.samples]).toEqual([0, 0, 0, 3710, 3990]);
    expect(clean(pa)).toBe(true);
    console.info(`OBSERVER F1 fixture: face ${String(f)} area ${String(a.value.area)} cm²; X + 10 cm: record ${String(pr.misses.length)} misses (judged ${String(pr.judged)} of ${String(pr.samples)}), arena at GRID_CM ${String(pg.misses.length)} (judged ${String(pg.judged)} of ${String(pg.samples)}), arena at step ${a.value.step.toFixed(2)} ${String(pa.misses.length)} misses, ${String(pa.vertexFaults.length)} vertex faults (judged ${String(pa.judged)} of ${String(pa.samples)}); first record misses ${JSON.stringify(pr.misses.slice(0, 3))}`);
  });
});

describe('line 6 (c): the lineage, the identity and the plants', () => {
  it('a two-cut fixture: each grandchild\'s parent is the child it was cut from (the latest containing content), never the root (OB2); the identity holds or is classed', () => {
    const b = builder({ 'way:z': { halfWidthCm: 50, ends: 'round' }, 'lane:1': { halfWidthCm: 40, ends: 'round' }, 'lane:2': { halfWidthCm: 30, ends: 'square' } });
    b.way('way:z', [[0, 2000], [4000, 2000]]);
    b.own();
    const c0 = b.done();
    const o = new ShadowObserver();
    setExactShadow(o);
    const readAll = (): void => {
      for (const f of liveL1(c0.p)) readIn(c0.p, 1, (t) => readKerb(t, f, c0.ws));
    };
    readAll();
    const rootIndex = o.perRead.find((q) => q.face === faceAtXY(c0.p, [1000, 1000]))?.key;
    b.lane([2000, 1000], 'lane:1', [[1500, 0], [1500, 2000]]);
    const right = faceAtXY(c0.p, [3000, 1000]);
    const n1 = o.perRead.length;
    readAll();
    const rightRead = o.perRead.slice(n1).find((q) => q.face === right);
    b.lane([3000, 1000], 'lane:2', [[2700, 0], [2700, 2000]]);
    const g1 = faceAtXY(c0.p, [2000, 1000]);
    const g2 = faceAtXY(c0.p, [3500, 1000]);
    const n2 = o.perRead.length;
    readAll();
    setExactShadow(null);
    const index = (q: (typeof o.perRead)[number]): number => o.perRead.indexOf(q) + 1;
    expect(rootIndex).not.toBe(undefined);
    expect(rightRead).not.toBe(undefined);
    const rightIndex = index(rightRead as (typeof o.perRead)[number]);
    for (const g of [g1, g2]) {
      const q = o.perRead.slice(n2).find((r) => r.face === g);
      expect(q, `grandchild ${String(g)}`).not.toBe(undefined);
      expect(q?.parent, `grandchild ${String(g)}: its parent the right child (read ${String(rightIndex)})`).toBe(rightIndex);
      expect(q?.identity === 'EQUAL' || (q?.identity ?? '').length > 0).toBe(true);
    }
    expect(rightRead?.parent).not.toBe(null);
    expect(o.withParent).toBeGreaterThanOrEqual(4);
    expect(o.identityClasses.OTHER ?? 0).toBe(0);
    console.info(`OBSERVER two-cut: ${o.tables('two-cut', 2).slice(3, 5).join(' | ')}`);
  });

  it('both plants FAIL: the comparand +5 cm on every no-move read fails the relation; X +10 cm before the oracle fails the oracle', { timeout: HARD }, () => {
    const run = (o: ShadowObserver): ShadowObserver => {
      setExactShadow(o);
      for (const [, build] of Object.entries(FIXTURES)) {
        const c = build();
        for (const f of liveL1(c.p)) readIn(c.p, 1, (t) => readKerb(t, f, c.ws));
      }
      setExactShadow(null);
      return o;
    };
    const clean0 = run(new ShadowObserver());
    expect(clean0.failing(), 'unplanted: no failure').toEqual({ oracleFaults: 0, relationFailures: 0, xRefusedWhereOk: 0, k1Throws: 0, exceptions: 0, localXWrong: 0 });
    const rel = run(new ShadowObserver({ plantRelation: 5 }));
    expect(rel.plantedReads).toBeGreaterThan(0);
    expect(rel.relationFailures).toBeGreaterThan(0);
    const orc = run(new ShadowObserver({ plantOracle: 10 }));
    expect(orc.keysFaults).toBeGreaterThan(0);
    // J785 (2) (d): X +10 cm before the local arbitration on every read — X-WRONG
    const loc = run(new ShadowObserver({ plantLocal: 10 }));
    expect(loc.plantedLocalReads).toBeGreaterThan(0);
    expect(loc.localClasses['X-WRONG']).toBeGreaterThan(0);
    expect(clean0.readsDecided).toBeGreaterThan(0);
    console.info(`OBSERVER plants: relation +5 cm ${String(rel.relationFailures)} failures on ${String(rel.plantedReads)} no-move reads; oracle +10 cm ${String(orc.keysFaults)} faults of ${String(orc.keysJudged)} judged`);
  });
});

describe('J785 (2): the local arbitration (the served region against X, the truth read at the difference)', () => {
  it('a MOVED read of the corpus (the ring and holeSlit fixtures) is X-RIGHT, and X-WRONG with X +10 cm; no fixture read is X-WRONG unplanted (LA2)', { timeout: HARD }, () => {
    const at = (o: ShadowObserver, name: string): Pair[] => {
      const c = FIXTURES[name]();
      return readPairs(c, liveL1(c.p), o, name);
    };
    for (const name of ['ring', 'holeSlit']) {
      const plain = at(new ShadowObserver(), name);
      const moved = plain.filter((q) => q.derived?.cls === 'MOVED');
      expect(moved.length, `${name}: a MOVED read of the corpus`).toBeGreaterThan(0);
      for (const q of moved) {
        expect(q.city.xcls, q.at).toBe('DIFFERENT');
        expect(q.city.local, `${q.at}: ${JSON.stringify(q.city.witnesses)}`).toBe('X-RIGHT');
      }
      const planted = at(new ShadowObserver({ plantLocal: 10 }), name);
      for (const q of moved) expect(planted.find((r) => r.at === q.at)?.city.local, `${q.at}: X + 10 cm`).toBe('X-WRONG');
    }
    const all: Pair[] = [];
    for (const name of Object.keys(FIXTURES)) all.push(...at(new ShadowObserver(), name));
    expect(all.filter((q) => q.city.local === 'X-WRONG').map((q) => q.at)).toEqual([]);
    console.info(`OBSERVER local arbitration (fixtures): ${JSON.stringify(all.filter((q) => q.city.xcls === 'DIFFERENT').map((q) => `${q.at} ${String(q.derived?.cls)} → ${String(q.city.local)}`))}`);
  });

  it('a THIN difference is THIN (LA3); the witnesses stand at the midpoints, more than MARGIN_CM from both outlines (LA1)', () => {
    const sq = (x0: number, y0: number, s: number): LatticePoint[][] => [[P(x0, y0), P(x0 + s, y0), P(x0 + s, y0 + s), P(x0, y0 + s)]];
    const X = sq(0, 0, 1000);
    const truthIsX = (q: XY): 'in' | 'out' | 'undecided' => (ringDist(X, q) <= MARGIN_CM ? 'undecided' : insideRings(X, q) ? 'in' : 'out');
    // 5 cm apart: beyond NEAR_CM, not beyond 2 · MARGIN_CM — THIN
    const thin = sq(5, 0, 1000);
    const rt = relateX(thin, X);
    expect(rt.cls).toBe('DIFFERENT');
    expect(witnessesOf(thin, X, rt.far)).toEqual([]);
    expect(arbitrateLocal(thin, X, truthIsX, witnessesOf(thin, X, rt.far)).cls).toBe('THIN');
    // 12 cm apart: witnesses 6 cm from both outlines, X-RIGHT where the truth is X's, X-WRONG where it is the region's
    const off = sq(12, 0, 1000);
    const ro = relateX(off, X);
    const ws = witnessesOf(off, X, ro.far);
    expect(ws.length).toBeGreaterThan(10);
    for (const w of ws) {
      expect(w.gap).toBeGreaterThan(WITNESS_GAP_CM);
      expect(Math.hypot(w.q.x - w.r.x, w.q.y - w.r.y)).toBeCloseTo(w.gap, 6);
      expect(w.at).toEqual({ x: (w.q.x + w.r.x) / 2, y: (w.q.y + w.r.y) / 2 });
    }
    // along the two vertical sides the midpoints stand 6 cm from both outlines (at the corners, where the horizontal
    // sides overlap, a midpoint can fall on both: the truth reads those UNDECIDED)
    const clear = ws.filter((w) => ringDist(off, w.at) > MARGIN_CM && ringDist(X, w.at) > MARGIN_CM);
    expect(clear.length).toBeGreaterThan(ws.length / 2);
    expect(arbitrateLocal(off, X, truthIsX, ws).cls).toBe('X-RIGHT');
    const truthIsOff = (q: XY): 'in' | 'out' | 'undecided' => (ringDist(off, q) <= MARGIN_CM ? 'undecided' : insideRings(off, q) ? 'in' : 'out');
    expect(arbitrateLocal(off, X, truthIsOff, ws).cls).toBe('X-WRONG');
    expect(xRightBy(ws, []).by).toBe('move');
  });

  it('the truth at a point reads spinesOf\'s vertex rule at the point: a touching chain\'s poke the capped grid misses still bounds it (LA4)', () => {
    const F: XY[][] = [[{ x: 0, y: 0 }, { x: 40_000, y: 0 }, { x: 40_000, y: 40_000 }, { x: 0, y: 40_000 }]];
    const chains: TruthChain[] = [
      { key: 'way:a', role: 'way', points: [{ x: 0, y: 0 }, { x: 40_000, y: 0 }], closed: false, hw: 100, ends: 'round', junction: [false, false] },
      { key: 'way:b', role: 'way', points: [{ x: 50_000, y: 50_000 }, { x: 40_000, y: 40_000 }], closed: false, hw: 300, ends: 'round', junction: [false, false] },
    ];
    // the capped step √(area ⁄ 4 000) = 632 cm: no sample within 300 cm of the corner b's round end covers
    const step = Math.sqrt((40_000 * 40_000) / 4000);
    expect(judgeCapped(F, chains, [], step).spines).toEqual(['way:a']);
    const truthAt = truthAtOf(F, chains, step);
    expect(truthAt({ x: 39_900, y: 39_900 })).toBe('out');
    expect(truthAt({ x: 20_000, y: 20_000 })).toBe('in');
    expect(truthAt({ x: 20_000, y: 50 })).toBe('out');
    expect(truthAt({ x: 20_000, y: 98 })).toBe('undecided');
  });
});
