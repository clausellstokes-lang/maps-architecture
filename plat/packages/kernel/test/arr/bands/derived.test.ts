// M0-a-09's hardening round S18 (lane build/M0-a-09-fix-s18; the library round of round 2A of the kernel amendment z,
// item 986 — J742 R-A, J744 (2)): §3.7's EXACT KERB X(F) = region(F) − ⋃ B(s) as a pure function (arr/kerbExact.ts, by
// path: the barrel and arr/index.ts gain nothing), its content key, the definition oracle (definition.ts), the
// construction relation judged by this file's own wrapper of insertChain, the literal-ring pins and 986 (c)'s
// incremental identity MEASURED — beside the construction, which serves every read as before (nothing calls X).
//
// THE MOCKS (dryrun.test.ts's form: each module spread `...real`, one function wrapped): createPlat (arena/index.js —
// the door a scratch Plat is built through) and buildOverlay (arr/winding.js) are counted, so X is shown to build no
// Plat; opSave (faces/common.js) is counted, so a read's dry runs are told apart; insertChain (insert/insertChain.js,
// which kerb.ts imports and faces/split.ts reaches through insert/index.js) is counted and, for the calls whose rows
// carry the role `invisible` (the dry run's, kerb.ts DRY_ROLE) made between this file's marks round a read, RECORDED:
// the points given, the coordinates placed (read from the arena right after the call), a refusal and the move warnings
// (W_ATTRACTED, W_PLACED, W_SNAP_PASSES, W_WEDGE_ROUTED); every call whose rows carry a `lane:` entity is recorded too —
// the cut log the definition oracle's truth is read from (S18R-2). No flag is added to kerb.ts (J744 (2)).
//
// THE SECTIONS: line 3 (exactRegion's rounding pins, the order property on random part sets, every output vertex an input
// vertex or a rounded crossing, simple and well-nested rings); line 8 (literal rings on hand-checked fixtures — parts
// quoted from bufferParts, clip intersections computed by hand in the comments); line 2 (X writes nothing, its
// degenerate outputs); lines 4 and 5 (the key: X a function of it, each input of X moving it, free of the
// representation); line 6 (the oracle's own pins); line 7 (the relation's classes and locus); line 9 (the corpus: the
// test's own networks — B-FUZZ's chords, one in four widthless, and the widened family's ways — cut S8-style to depth 3
// on up to two root faces, every face of each cut's read set judged: the oracle on X, the relation on the construction,
// (k1), X's refusals, the lemma of line 2, line 3 on X, and line 10's incremental identity measured), with its figures
// printed as `DERIVED …` lines. Its size: PLAT_FUZZ_RUNS ÷ 100 networks per property, at least 10.
//
// THE TEST'S READINGS (each stated in the round's notes): (a) a two-knot lane is inserted through the door (insertChain
// with its two knots on its ends, as splitFace inserts a cut) — splitFace's options carry no knots; a scalar lane and
// every slit go through splitFace / connectHole with S8's `way` row; (b) the record follows the insertion: a chain whose
// route a lane's end split runs through that end's placed point (read from the arena right after the insertion), so the
// junction rule and the buffers read the route as the arena holds it; (c) a network whose chain's placed points repeat
// (a bent way out and back to one frame point: its route is one run with an end where its points turn back) is discarded
// and counted, as a chord whose route leaves its placed line is; (d) THE COMPARAND ARBITRATION: a BEYOND read whose
// comparand (X_U or X_F over the construction's own spines) the oracle finds wrong FAILS where those spines are X's;
// where the construction's census kept another spine set (J318's reach read on its attracted base, not on X_E), the
// comparand over X's spines is judged in its place, and only exactRegion's own error on it fails the round — the census's
// difference is the construction's case, listed. A replay: PLAT_DERIVED_REPLAY=<the input a failure line prints> runs
// that one network with its reads' details; PLAT_DERIVED_PROBE=all prints line 8's fixtures and the construction's reads.
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

const rec = vi.hoisted(() => ({
  createPlat: 0,
  buildOverlay: 0,
  insertChain: 0,
  opSave: 0,
  /** Record the dry run's calls (between the marks round a read). */
  on: false,
  calls: [] as { save: number; given: { x: number; y: number }[]; placed: { x: number; y: number }[] | null; refused: string | null; warnings: string[] }[],
  lanes: [] as { entity: string; given: { x: number; y: number }[]; placed: { x: number; y: number }[] | null }[],
}));

vi.mock('../../../src/arena/index.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arena/index.js')>();
  return { ...real, createPlat: (...a: Parameters<typeof real.createPlat>) => { rec.createPlat += 1; return real.createPlat(...a); } };
});
vi.mock('../../../src/arr/winding.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arr/winding.js')>();
  return { ...real, buildOverlay: (...a: Parameters<typeof real.buildOverlay>) => { rec.buildOverlay += 1; return real.buildOverlay(...a); } };
});
vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { rec.opSave += 1; return real.opSave(...a); } };
});
vi.mock('../../../src/insert/insertChain.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/insert/insertChain.js')>();
  return {
    ...real,
    insertChain: (...a: Parameters<typeof real.insertChain>) => {
      rec.insertChain += 1;
      const r = real.insertChain(...a);
      const [t, points, roles] = a;
      const dry = rec.on && roles.some((x) => x.role === 'invisible');
      const lane = roles.find((x) => typeof x.entity === 'string' && x.entity.startsWith('lane:'));
      if (dry || lane !== undefined) {
        const p = t.plat;
        const placed = r.ok ? r.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] })) : null;
        const given = points.map((q) => ({ x: q.x, y: q.y }));
        if (dry) {
          const moves = new Set(['W_ATTRACTED', 'W_PLACED', 'W_SNAP_PASSES', 'W_WEDGE_ROUTED']);
          rec.calls.push({ save: rec.opSave, given, placed, refused: r.ok ? null : `${r.code} ${r.detail}`, warnings: (r.ok ? r.warnings : []).map((w) => w.code).filter((c) => moves.has(c)) });
        } else if (lane !== undefined) rec.lanes.push({ entity: lane.entity, given, placed });
      }
      return r;
    },
  };
});

import { idOf, isHalfEdgeLive, roleInfo, rowsOn, type FaceId, type Plat } from '../../../src/arena/index.js';
import { bridgesOf, DRY_MOVE_CM, kerbCensus, kerbParts, readFace, readKerb, ringCrosses, type KerbRead, type SpineWidths } from '../../../src/arr/kerb.js';
import { exactKey, exactKeyContent, exactRegion, exactRegionOfFace, exactRegionOfKey, roundQuotientHalfAway } from '../../../src/arr/kerbExact.js';
import { canonicalRing, compareRings, type Ring } from '../../../src/arr/winding.js';
import { connectHole, splitFace } from '../../../src/faces/index.js';
import { HOT_PIXEL_CM } from '../../../src/index/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { err, LATTICE, ok } from '../../../src/num/index.js';
import { setOwner, tx } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { bits } from '../../tx/support.js';
import { bufferParts as bufferPartsT } from '../../../src/arr/buffer.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import { faceWalk as faceWalkOf, setFaceHoles as setFaceHolesOf } from '../../../src/arena/index.js';
import { compactSlots, decodeArena, encodeArena } from '../../../src/io/index.js';
import { clean, endsOf, judge, MARGIN_ARC_CM, MARGIN_CM, MARGIN_STRAIGHT_CM, spinesOf, type TruthChain, type Verdict, type XY } from './definition.js';
import { arbitrate as arbitrateOf, hausdorff, NEAR_CM, relate, ringDist, segDist, servedOf, T, type RelClass, type Served } from './relation.js';
import { emptyArena, ins as insQ, tx as shellQ } from '../../insert/step3-5/support.js';
import { AT_S9, commit, framed, nestingProblems, onFrame, own, P, profile, ringsOf, simpleRing, spec, state, type Chord, type ChordWidth, type WideWay } from './support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** Line 9's size: PLAT_FUZZ_RUNS ÷ 100, at least 10 (100 at the PR size, 10 at RELATED's 1 000). */
const NETS = Math.max(10, Math.floor(RUNS / 100));
const HARD = 3_600_000;

// ---- texts, rings, distances ------------------------------------------------------------------------------------------

/** Rings from "x,y x,y …" texts. */
const R = (s: string): LatticePoint[] => s.split(' ').map((q) => P(Number(q.split(',')[0]), Number(q.split(',')[1])));
/** The QUADRANTS other than the first (round S19, F1): the point reflection and the two axis reflections. */
const QUADRANTS: readonly (readonly [number, number])[] = [[-1, -1], [-1, 1], [1, -1]];
/** Rings under (x, y) → (sx·x, sy·y), each ring's orientation kept (reversed where the map turns the plane over). */
const mirror = (rs: readonly (readonly XY[])[], sx: number, sy: number): LatticePoint[][] =>
  rs.map((r) => {
    const m = r.map((q) => P(sx * q.x + 0, sy * q.y + 0));
    return sx * sy < 0 ? m.reverse() : m;
  });
/** A region's rings under the map, in KerbRead.region's normal form (canonical rings, compareRings order): X of the mirrored input must be this. */
const reflected = (rs: readonly (readonly XY[])[], sx: number, sy: number): Ring[] => mirror(rs, sx, sy).map((r) => canonicalRing(r)).sort(compareRings);

/** Is the lattice point q a vertex of one of the rings? */
const hasVertex = (rs: readonly (readonly XY[])[], q: XY): boolean => rs.some((r) => r.some((v) => v.x === q.x && v.y === q.y));

/** A face's L1 rings as the test reads them (the arena's walk). */
const F1 = (p: Plat, f: FaceId): LatticePoint[][] => ringsOf(p, 1, f);

/** The test's exemption of line 2 (S18R-6): a ring of X equal to one of readFace's own route rings is judged by ringCrosses with F's bridges. */
function exemptOf(p: Plat, f: FaceId, ws: SpineWidths): (r: readonly LatticePoint[]) => boolean | null {
  const rf = readFace(p, f, ws);
  const along = bridgesOf(p, rf.edges);
  const own = new Set(rf.rings.map((r) => cyclic(r)));
  return (r) => (own.has(cyclic(r)) ? !ringCrosses(r, along) : null);
}

/** A ring's text from its lowest-leftmost vertex (the first such visit): its identity up to the start. */
function cyclic(r: readonly XY[]): string {
  let s = 0;
  for (let i = 1; i < r.length; i += 1) if (r[i].y < r[s].y || (r[i].y === r[s].y && r[i].x < r[s].x)) s = i;
  return T([[...r.slice(s), ...r.slice(0, s)]])[0];
}

// ---- the construction relation (line 7) ------------------------------------------------------------------------------

// ---- the corpus (line 9): the test's own networks and cuts, recorded --------------------------------------------------

/** A chord of the corpus: B-FUZZ's, one in four widthless (its widths answer null: a zero-width L1 chain, S18R-11). */
interface CorpusChord extends Chord {
  readonly widthless: boolean;
}

/** A built network with its record. */
interface Net {
  readonly p: Plat;
  readonly faces: FaceId[];
  readonly table: Record<string, ChordWidth | { halfWidthCm: number; ends: 'round' | 'square' }>;
  /** The record: each chain's placed points, width and ends (the junction rule is applied per read, `endsOf`). */
  readonly chains: Omit<TruthChain, 'junction'>[];
}

/** Every live L1 face owned by district:1 (support.ts `network`'s ownership), the faces returned. */
function setOwnerAll(p: Plat): FaceId[] {
  const faces = liveL1(p);
  commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
  return faces;
}

/** Is q on the frame [0, 4000]²'s boundary? */
const onFrameXY = (q: XY): boolean => q.x === 0 || q.x === 4000 || q.y === 0 || q.y === 4000;

/** Every L1 edge's end points carrying a row of (role, entity), by entity id. */
function routeVertices(p: Plat, role: string): Map<string, XY[]> {
  const out = new Map<string, XY[]>();
  const O = p.halfEdges.origin;
  for (let e = 0; e < p.slots.pair.top; e += 1) {
    if (!isHalfEdgeLive(p, 2 * e) || p.halfEdges.level[e] > 1) continue;
    for (const r of rowsOn(p, 'edge', 2 * e)) {
      if (roleInfo(p.roles.kind[r]).name !== role) continue;
      const id = idOf(p, p.roles.entity[r]);
      const l = out.get(id) ?? [];
      l.push({ x: p.vertices.x[O[2 * e]], y: p.vertices.y[O[2 * e]] }, { x: p.vertices.x[O[2 * e + 1]], y: p.vertices.y[O[2 * e + 1]] });
      out.set(id, l);
    }
  }
  return out;
}

/** Distance from q to an open or closed polyline. */
function polyDist(q: XY, pts: readonly XY[], closed: boolean): number {
  let d = Infinity;
  for (let i = 0; i < (closed ? pts.length : pts.length - 1); i += 1) d = Math.min(d, segDist(q, pts[i], pts[(i + 1) % pts.length]));
  return d;
}

/** Does every chain's route, walked along the edges carrying its own row, stay within HOT_PIXEL_CM of the line through its placed points (S18R-2)? */
function routesTrue(p: Plat, chains: readonly Omit<TruthChain, 'junction'>[]): boolean {
  const at = routeVertices(p, 'way');
  return chains.every((c) => (at.get(c.key.slice(4)) ?? []).every((q) => polyDist(q, c.points, c.closed) <= HOT_PIXEL_CM));
}

/** B-FUZZ's network (support.ts `network`), built by the test's own builder that records each insertion. */
function chordNet(chords: readonly CorpusChord[]): Net {
  const p = framed();
  const table: Net['table'] = {};
  const chains: Net['chains'] = [];
  chords.forEach((c, i) => {
    const a = onFrame(c.a);
    const b = onFrame(c.b);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 300 || (a[0] === b[0] && (a[0] === 0 || a[0] === 4000)) || (a[1] === b[1] && (a[1] === 0 || a[1] === 4000))) return;
    const knots = c.knots === null ? {} : { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] };
    let placed: XY[] = [];
    const r = tx(p, spec(1), (o) => {
      const res = insertChain(o, [P(a[0], a[1]), P(b[0], b[1])], [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', knots);
      if (res.ok) placed = res.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }));
      return res;
    });
    if (!r.ok) return;
    if (!c.widthless) table[`way:${String(i)}`] = c.knots === null ? { halfWidthCm: c.hw, ends: c.ends } : profile([c.knots[0], c.knots[1]]);
    chains.push({ key: `way:way:${String(i)}`, role: 'way', points: placed, closed: false, hw: c.widthless ? null : c.knots === null ? c.hw : [c.knots[0], c.knots[1]], ends: c.knots === null ? c.ends : 'round' });
  });
  return { p, faces: setOwnerAll(p), table, chains };
}

/** The widened family's network (support.ts `wideNetwork`), recorded. */
function wayNet(ways: readonly WideWay[]): Net {
  const p = framed();
  const table: Net['table'] = {};
  const chains: Net['chains'] = [];
  ways.forEach((c, i) => {
    let pts: [number, number][];
    if (c.kind === 'ring') pts = [[c.x, c.y], [c.x + c.w, c.y], [c.x + c.w, c.y + c.h], [c.x, c.y + c.h]];
    else if (c.kind === 'dead') pts = [onFrame(c.a), [c.x, c.y]];
    else pts = [onFrame(c.a), [c.x, c.y], onFrame(c.b)];
    if (Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]) < 300) return;
    const profiled = c.knots !== null && c.kind !== 'ring';
    const knots = profiled ? { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: pts.length - 1, role: 'width_knot', ordinal: 1 }] } : {};
    let placed: XY[] = [];
    const r = tx(p, spec(1), (o) => {
      const res = insertChain(o, pts.map(([x, y]) => P(x, y)), [{ role: 'way', entity: `way:${String(i)}` }], 'mandatory', { ...knots, ...(c.kind === 'ring' ? { closed: true } : {}) });
      if (res.ok) placed = res.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }));
      return res;
    });
    if (!r.ok) return;
    table[`way:${String(i)}`] = profiled ? profile([(c.knots as [number, number])[0], (c.knots as [number, number])[1]]) : { halfWidthCm: c.hw, ends: c.ends };
    chains.push({ key: `way:way:${String(i)}`, role: 'way', points: placed, closed: c.kind === 'ring', hw: profiled ? [(c.knots as [number, number])[0], (c.knots as [number, number])[1]] : c.hw, ends: profiled ? 'round' : c.ends });
  });
  return { p, faces: setOwnerAll(p), table, chains };
}

/** The widths of a net (support.ts `widthsOf`'s reading: every `way` chain by its entity, null where the table has none). */
function widthsOfNet(n: Net): SpineWidths {
  return (c) => {
    if (c.role !== 'way') return null;
    const w = n.table[c.entity];
    if (w === undefined) return null;
    return 'knotRole' in w ? { halfWidthCm: w } : w;
  };
}

/** The replay's detail switch (a failing read's chains, spines, X and verdict printed). */
const DETAIL = { on: false };

/** One read of the corpus (line 9), every judgement on it. */
interface ReadOut {
  readonly tag: string;
  readonly face: FaceId;
  readonly key: string;
  readonly x: Ring[] | null;
  readonly xRefused: string | null;
  readonly constructionOk: boolean;
  readonly served: Served | null;
  readonly rel: { cls: RelClass; h: number; tip?: boolean } | null;
  readonly straight: { equal: boolean; h: number } | null;
  readonly verdict: Verdict | null;
  readonly failures: string[];
  readonly constructionCases: string[];
  readonly xMs: number;
  readonly cMs: number;
  readonly ringPoints: number;
  readonly lemma: { equal: boolean; h: number; clear: boolean } | null;
  readonly spines: readonly string[];
  readonly junctions: ReadonlyMap<string, string>;
}

/** The figures a property accumulates (line 9's REPORTED rows, line 7's classes, line 10's identity). */
interface Figures {
  drawn: number;
  kept: number;
  discards: Record<string, number>;
  cuts: number;
  slits: number;
  judged: number;
  classes: Record<RelClass, number>;
  noMove: Record<RelClass, number>;
  servedBy: Record<string, number>;
  straightUnequal: number;
  straightMaxH: number;
  keys: Map<string, string>;
  failures: string[];
  constructionCases: string[];
  xMs: number[];
  cMs: number[];
  xByPoints: { pts: number; ms: number }[];
  lemmaReads: number;
  lemmaEqual: number;
  lemmaMaxH: number;
  identity: { measured: number; equal: number; classes: Record<string, number>; other: string[] };
  xRefusedWhereOk: number;
  writes: number;
  untouchedChanged: string[];
  planted: { reads: number; failed: number };
  placedOffSilent: number;
  tipNear: number;
  /** Round S19's F1: the reads whose arrangement was placed in the three other quadrants, and those whose X was the mirror there. */
  reflected: { reads: number; equal: number };
}

const newFigures = (): Figures => ({
  drawn: 0,
  kept: 0,
  discards: {},
  cuts: 0,
  slits: 0,
  judged: 0,
  classes: { EQUAL: 0, NEAR: 0, MOVED: 0, BEYOND: 0 },
  noMove: { EQUAL: 0, NEAR: 0, MOVED: 0, BEYOND: 0 },
  servedBy: {},
  straightUnequal: 0,
  straightMaxH: 0,
  keys: new Map(),
  failures: [],
  constructionCases: [],
  xMs: [],
  cMs: [],
  xByPoints: [],
  lemmaReads: 0,
  lemmaEqual: 0,
  lemmaMaxH: 0,
  identity: { measured: 0, equal: 0, classes: {}, other: [] },
  xRefusedWhereOk: 0,
  writes: 0,
  untouchedChanged: [],
  planted: { reads: 0, failed: 0 },
  placedOffSilent: 0,
  tipNear: 0,
  reflected: { reads: 0, equal: 0 },
});

const discard = (fig: Figures, why: string): void => {
  fig.discards[why] = (fig.discards[why] ?? 0) + 1;
};

/** The truth chains of a net with their ends (the oracle's end rule). */
const truthOf = (n: Net): TruthChain[] => endsOf(n.chains, onFrameXY);

/** The least distance between a ring and a ring set (0 where they overlap or one holds a vertex of the other). */
function partToRegion(part: readonly XY[], region: readonly (readonly XY[])[]): number {
  if (region.length === 0) return Infinity;
  const inside = (rs: readonly (readonly XY[])[], q: XY): boolean => {
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
  };
  if (part.some((q) => inside(region, q)) || region.some((r) => r.some((q) => inside([part], q)))) return 0;
  let d = Infinity;
  for (const q of part) d = Math.min(d, ringDist(region, q));
  for (const r of region) for (const q of r) d = Math.min(d, ringDist([part], q));
  return d;
}

/**
 * One face read every way (line 9's read set entry), in its own L1 batch: the construction under the wrappers, X (and
 * its writes counted), X_U / X_F, the definition oracle on X, the key, the lemma (line 2).
 */
function readAll(n: Net, f: FaceId, tag: string, fig: Figures): ReadOut {
  const { p } = n;
  const ws = widthsOfNet(n);
  const failures: string[] = [];
  const constructionCases: string[] = [];
  let out: ReadOut | null = null;
  const before = state(p).replace(/#v\d+$/, '');
  commit(p, 1, (o) => {
    rec.calls = [];
    rec.on = true;
    const save0 = rec.opSave;
    const c0 = performance.now();
    const k = readKerb(o, f, ws);
    const cMs = performance.now() - c0;
    rec.on = false;
    const calls = rec.calls;
    const saves = rec.opSave - save0;
    // FM2's reading: a call that placed a point off its input with none of the move warnings
    for (const c of calls) if (c.refused === null && c.warnings.length === 0 && c.placed !== null && (c.placed.length !== c.given.length || c.placed.some((q, i) => q.x !== c.given[i].x || q.y !== c.given[i].y))) fig.placedOffSilent += 1;
    const faithful = kerbCensus(p)?.faithful ?? 'none';
    // X, writing nothing: no Plat built, no insertion, no savepoint; the arena and the batch as found
    const b0 = bits(p);
    const s0 = state(p);
    const w0 = JSON.stringify({ work: o.work.total, counts: [...o.work.counts], warnings: o.warnings, journal: o.journal });
    const n0 = { createPlat: rec.createPlat, buildOverlay: rec.buildOverlay, insertChain: rec.insertChain, opSave: rec.opSave };
    const x0 = performance.now();
    const ex = exactRegionOfFace(p, f, ws);
    const xMs = performance.now() - x0;
    const n1 = { createPlat: rec.createPlat, buildOverlay: rec.buildOverlay, insertChain: rec.insertChain, opSave: rec.opSave };
    const wrote = bits(p) !== b0 || state(p) !== s0 || JSON.stringify({ work: o.work.total, counts: [...o.work.counts], warnings: o.warnings, journal: o.journal }) !== w0 || JSON.stringify(n0) !== JSON.stringify(n1);
    if (wrote) {
      fig.writes += 1;
      failures.push(`${tag}: X wrote or built (${JSON.stringify(n0)} → ${JSON.stringify(n1)})`);
    }
    const key = exactKey(p, f, ws);
    if (ex.ok && ex.value.key !== key) failures.push(`${tag}: exactRegionOfFace's key and exactKey differ`);
    // THE DIFFERENTIAL PIN (line 4, KM8): X equals exactRegion over the key content's rings and parts, byte for byte
    const content = exactKeyContent(p, f, ws);
    if (ex.ok && content.ok && JSON.stringify(T(exactRegionOfKey(content.value))) !== JSON.stringify(T(ex.value.region))) failures.push(`${tag}: X differs from exactRegion of its key's content`);
    const truth = truthOf(n);
    const Fr = F1(p, f);
    const exempt = exemptOf(p, f, ws);
    const rf = readFace(p, f, ws);
    let verdict: Verdict | null = null;
    let served: Served | null = null;
    let rel: ReadOut['rel'] = null;
    let straight: ReadOut['straight'] = null;
    let lemma: ReadOut['lemma'] = null;
    // line 7's arbitration of a BEYOND read (relation.ts `arbitrate`, lifted from this closure by round S20's line 6 (a))
    const arbitrate = (region: readonly (readonly XY[])[], comparand: readonly (readonly LatticePoint[])[], served: Served, isReading: boolean): { fails: boolean; line: string } =>
      arbitrateOf({ tag, Fr, truth, exempt, content, k, rf }, region, comparand, served, isReading);
    if (!ex.ok) {
      if (k.ok) {
        fig.xRefusedWhereOk += 1;
        failures.push(`${tag}: X refused ${ex.code} ${ex.detail} where the construction read ok`);
      }
    } else {
      const X = ex.value.region;
      const sp = spinesOf(Fr, truth);
      verdict = judge(Fr, truth, X, exempt, sp);
      if (DETAIL.on && !clean(verdict)) {
        console.info(`DETAIL ${tag}\n F ${JSON.stringify(T(Fr))}\n X ${JSON.stringify(T(X))}\n verdict ${JSON.stringify(verdict)}`);
        for (const t of truth) console.info(` TRUTH ${t.key} ${JSON.stringify(t.points)} hw ${JSON.stringify(t.hw)} ${t.ends} junction ${JSON.stringify(t.junction)}`);
        for (const s2 of [...rf.spines.values(), ...rf.through]) console.info(` SPINE ${s2.key} ${JSON.stringify(s2.lines.map((l) => ({ pts: T([l.points])[0], hw: l.hw, closed: l.closed, junction: l.junction })))}`);
        if (content.ok) console.info(` KEY ${content.value.text}`);
      }
      if (!clean(verdict)) failures.push(`${tag}: the oracle on X — misses ${JSON.stringify(verdict.misses.slice(0, 3))} vertices ${JSON.stringify(verdict.vertexFaults.slice(0, 3))} simplicity ${JSON.stringify(verdict.simplicity.slice(0, 2))}`);
      // line 3 over line 9's faces: (a) X of a permutation of the key's content byte-identical (the spines and their parts
      // reversed, every ring's and part's start rotated, the holes reversed); (b), (c) its vertices and rings
      if (content.ok) {
        const parts = content.value.spines.flatMap((s2) => s2.parts);
        const [r2, p2] = permuted(content.value.rings, parts, parts.map((_, i) => parts.length - i), 1 + (f % 5));
        if (JSON.stringify(T(exactRegion(r2, p2))) !== JSON.stringify(T(X))) failures.push(`${tag}: line 3 (a) — a permutation of X's input gives another X`);
        const faults = regionFaults(content.value.rings, parts, X, exempt);
        if (faults.length > 0) failures.push(`${tag}: line 3 (b) / (c) — ${JSON.stringify(faults.slice(0, 3))}`);
        // BOTH PLACEMENTS (round S19, F1): the read's arrangement placed in each other quadrant of a frame centred on the
        // origin — X of the mirrored key content is the mirror of X, byte for byte (the half-away rule is symmetric)
        fig.reflected.reads += 1;
        let same = true;
        for (const [sx, sy] of QUADRANTS) {
          let Xm: Ring[];
          try {
            Xm = exactRegion(mirror(content.value.rings, sx, sy), mirror(parts, sx, sy));
          } catch (e) {
            same = false;
            failures.push(`${tag}: line 3 — the arrangement placed in quadrant (${String(sx)}, ${String(sy)}) refused: ${String(e)}`);
            continue;
          }
          if (JSON.stringify(T(Xm)) !== JSON.stringify(T(reflected(X, sx, sy)))) {
            same = false;
            failures.push(`${tag}: line 3 — the arrangement placed in quadrant (${String(sx)}, ${String(sy)}) gives another X: ${JSON.stringify(T(Xm)).slice(0, 300)}`);
          }
        }
        if (same) fig.reflected.equal += 1;
      }
      // the lemma (line 2, S18R-5): X over ALL of F's `through` spines and X over the reaching ones
      if (content.ok) {
        const reaching = new Set(content.value.reaching);
        const others = rf.through.filter((s) => !reaching.has(s.key));
        const edgeAndReach = new Map([...rf.spines, ...rf.through.filter((s) => reaching.has(s.key)).map((s) => [s.key, s] as const)]);
        const all = new Map([...rf.spines, ...rf.through.map((s) => [s.key, s] as const)]);
        const pr = kerbParts(rf.rings, edgeAndReach, true);
        const pa = kerbParts(rf.rings, all, true);
        const po = kerbParts(rf.rings, new Map(others.map((s) => [s.key, s] as const)), true);
        if (pr.ok && pa.ok && po.ok) {
          const xr = exactRegion(rf.rings, pr.value);
          const xa = exactRegion(rf.rings, pa.value);
          const equal = JSON.stringify(T(xr)) === JSON.stringify(T(xa));
          const h = equal ? 0 : hausdorff(xr, xa).h;
          const clear = po.value.every((q) => partToRegion(q, content.value.edgeRegion) > 2);
          lemma = { equal, h, clear };
          if (h > NEAR_CM) failures.push(`${tag}: the lemma — X over every through spine ${h.toFixed(2)} cm from X over the reaching ones`);
          if (clear && !equal) failures.push(`${tag}: the lemma — every non-reaching part clear of X_E by 2 cm, yet X differs`);
        }
      }
      if (k.ok) {
        const read = k.value;
        served = servedOf(calls, saves, faithful);
        const xu = kerbParts(rf.rings, read.spines, false);
        const xf = kerbParts(rf.rings, read.spines, true);
        if (xu.ok && xf.ok) {
          const XU = exactRegion(rf.rings, xu.value);
          const XF = exactRegion(rf.rings, xf.value);
          const comparand = served.by === 'faithful' ? XF : XU;
          rel = relate(read.region, comparand, served);
          // THE PLANTED CONTROL (line 7): on a no-move read, X_U translated 5 cm must be reported a failure — through
          // the same arbitration, the planted comparand being no reading's region
          if (served.noMove && comparand.length > 0) {
            const moved5 = comparand.map((r) => r.map((q) => P(q.x + 5, q.y)));
            const pr = relate(read.region, moved5, served);
            fig.planted.reads += 1;
            if (pr.cls === 'BEYOND' && arbitrate(read.region, moved5, served, false).fails) fig.planted.failed += 1;
          }
          // the STRAIGHT-THROUGH figure: X against X_U
          const se = JSON.stringify(T(X)) === JSON.stringify(T(XU));
          straight = { equal: se, h: se ? 0 : hausdorff(X, XU).h };
          if (DETAIL.on && rel.cls === 'BEYOND') console.info(`DETAIL-REL ${tag} served ${JSON.stringify(served)} construction spines ${JSON.stringify([...read.spines.keys()])} census ${JSON.stringify(read.census?.reaching ?? null)} X spines ${JSON.stringify(content.ok ? content.value.spines.map((s2) => s2.key) : null)}\n region ${JSON.stringify(T(read.region))}\n comparand ${JSON.stringify(T(comparand))}`);
          if (rel.cls === 'BEYOND') {
            const ab = arbitrate(read.region, comparand, served, true);
            if (ab.fails) failures.push(ab.line);
            else constructionCases.push(ab.line);
          }
        }
      }
    }
    const junctions = new Map<string, string>();
    for (const s of rf.spines.values()) junctions.set(s.key, JSON.stringify(s.lines.map((l) => l.junction)));
    for (const s of rf.through) junctions.set(s.key, JSON.stringify(s.lines.map((l) => l.junction)));
    out = {
      tag,
      face: f,
      key,
      x: ex.ok ? ex.value.region : null,
      xRefused: ex.ok ? null : `${ex.code} ${ex.detail}`,
      constructionOk: k.ok,
      served,
      rel,
      straight,
      verdict,
      failures,
      constructionCases,
      xMs,
      cMs,
      ringPoints: Fr.reduce((s, r) => s + r.length, 0),
      lemma,
      spines: content.ok ? content.value.spines.map((s) => s.key) : [],
      junctions,
    };
    return ok(null);
  });
  if (state(p).replace(/#v\d+$/, '') !== before) failures.push(`${tag}: the read's batch changed the arena`);
  const r = out as unknown as ReadOut;
  // the figures
  fig.judged += 1;
  if (r.rel !== null) {
    fig.classes[r.rel.cls] += 1;
    if (r.rel.tip === true) fig.tipNear += 1;
    if (r.served?.noMove === true) fig.noMove[r.rel.cls] += 1;
  }
  if (r.served !== null) fig.servedBy[r.served.by] = (fig.servedBy[r.served.by] ?? 0) + 1;
  if (r.straight !== null && !r.straight.equal) {
    fig.straightUnequal += 1;
    fig.straightMaxH = Math.max(fig.straightMaxH, r.straight.h);
  }
  if (r.lemma !== null) {
    fig.lemmaReads += 1;
    if (r.lemma.equal) fig.lemmaEqual += 1;
    fig.lemmaMaxH = Math.max(fig.lemmaMaxH, r.lemma.h);
  }
  // (k1): every pair of reads with equal keys has byte-identical X
  if (r.x !== null) {
    const xt = JSON.stringify(T(r.x));
    const seen = fig.keys.get(r.key);
    if (seen !== undefined && seen !== xt) failures.push(`${tag}: (k1) two reads with one key and two X`);
    fig.keys.set(r.key, xt);
  }
  fig.xMs.push(r.xMs);
  fig.cMs.push(r.cMs);
  fig.xByPoints.push({ pts: r.ringPoints, ms: r.xMs });
  for (const s of failures) fig.failures.push(s);
  for (const s of r.constructionCases) fig.constructionCases.push(s);
  return r;
}

/** A lane draw: its landings' edge picks and parameters, its bend, half-width and ends. */
interface LaneDraw {
  readonly e0: number;
  readonly e1: number;
  readonly t0: number;
  readonly t1: number;
  readonly bend: number;
  readonly hw: number;
  readonly knots: readonly [number, number] | null;
  readonly ends: 'round' | 'square';
  readonly pick: number;
}

const laneArb = (bent: boolean): fc.Arbitrary<LaneDraw> =>
  fc.record({
    e0: fc.nat(1000),
    e1: fc.nat(1000),
    t0: fc.integer({ min: 5, max: 95 }),
    t1: fc.integer({ min: 5, max: 95 }),
    bend: bent ? fc.oneof(fc.constant(0), fc.integer({ min: -30, max: 30 })) : fc.constant(0),
    hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 300 })),
    knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 300 }), fc.integer({ min: 5, max: 300 })), { freq: 4 }),
    ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    pick: fc.nat(1000),
  });

/** The ring's edges long enough to take a landing more than attractCm from both their ends. */
function landable(r: readonly XY[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < r.length; i += 1) if (Math.hypot(r[(i + 1) % r.length].x - r[i].x, r[(i + 1) % r.length].y - r[i].y) > 2 * LATTICE.attractCm + 4) out.push(i);
  return out;
}

/**
 * A landing on the ring edge i, more than attractCm from its ends (at `t` percent of the rest), rounded to the lattice;
 * null where it lies within attractCm of any vertex of F (S18R-2: planCut then splits the edge, never lands on a vertex).
 */
function landing(Fr: readonly (readonly XY[])[], ring: number, i: number, t: number): LatticePoint | null {
  const r = Fr[ring];
  const a = r[i % r.length];
  const b = r[(i + 1) % r.length];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const free = len - 2 * (LATTICE.attractCm + 2);
  if (!(free > 0)) return null;
  const s = (LATTICE.attractCm + 2 + (free * t) / 100) / len;
  const q = P(Math.round(a.x + (b.x - a.x) * s), Math.round(a.y + (b.y - a.y) * s));
  for (const rr of Fr) for (const v of rr) if (Math.hypot(v.x - q.x, v.y - q.y) <= LATTICE.attractCm) return null;
  return q;
}

/** The live L1 faces with a ring vertex at q. */
function facesAtVertex(p: Plat, faces: readonly FaceId[], q: XY): FaceId[] {
  return faces.filter((f) => F1(p, f).some((r) => r.some((v) => v.x === q.x && v.y === q.y)));
}

/** The live L1 faces of the arena (by slot). */
function liveL1(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) out.push(f);
  return out;
}

/**
 * One cut of the corpus on face F (S8-style; line 9): a lane between two boundary points drawn more than attractCm from
 * F's vertices — splitFace (a scalar lane) or the door with its two knots (a two-knot lane), or connectHole where `slit`
 * and F has a hole — in its own L1 batch, rejected and counted where the children's rings do not hold the lane's placed
 * points exactly or its route leaves the line through them (S18R-2). Returns the children and the lane's placed points.
 */
function cut(n: Net, f: FaceId, d: LaneDraw, k: number, slit: boolean, fig: Figures): { children: FaceId[]; placed: XY[]; entity: string } | null {
  const { p } = n;
  const Fr = F1(p, f);
  const holed = slit && Fr.length > 1 && d.pick % 2 === 0;
  const r0 = 0;
  const r1 = holed ? 1 + (d.pick % (Fr.length - 1)) : 0;
  const l0 = landable(Fr[r0]);
  const l1 = landable(Fr[r1]);
  if (l0.length === 0 || l1.length === 0 || (!holed && l0.length < 2)) {
    discard(fig, 'no edge of F long enough to land on');
    return null;
  }
  const i0 = l0[d.e0 % l0.length];
  let j = d.e1 % l1.length;
  if (!holed && l1[j] === i0) j = (j + 1) % l1.length;
  const a = landing(Fr, r0, i0, d.t0);
  const b = landing(Fr, r1, l1[j], d.t1);
  if (a === null || b === null) {
    discard(fig, 'a landing within attractCm of a vertex of F');
    return null;
  }
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  if (len < 4 * LATTICE.attractCm) {
    discard(fig, 'landings too close');
    return null;
  }
  const pts: LatticePoint[] = [a];
  if (d.bend !== 0) pts.push(P(Math.round((a.x + b.x) / 2 - ((b.y - a.y) * d.bend) / 100), Math.round((a.y + b.y) / 2 + ((b.x - a.x) * d.bend) / 100)));
  pts.push(b);
  const entity = `lane:${String(k)}`;
  const rows = [{ role: 'way', entity }];
  const twoKnot = d.knots !== null && !holed;
  const before = rec.lanes.length;
  let children: FaceId[] = [];
  let placed: XY[] = [];
  const res = tx(p, spec(1), (o) => {
    let kids: FaceId[];
    if (holed) {
      const h = connectHole(o, f, pts, { rows });
      if (!h.ok) return err<null>(h.code, h.detail);
      kids = [h.value];
    } else if (twoKnot) {
      const h = insertChain(o, pts, rows, 'mandatory', { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: pts.length - 1, role: 'width_knot', ordinal: 1 }] });
      if (!h.ok) return err<null>(h.code, h.detail);
      // the two children: the faces either side of the lane's first segment
      const pl = h.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }));
      const mx = (pl[0].x + pl[1].x) / 2;
      const my = (pl[0].y + pl[1].y) / 2;
      const l = Math.hypot(pl[1].x - pl[0].x, pl[1].y - pl[0].y);
      const nx = -(pl[1].y - pl[0].y) / l;
      const ny = (pl[1].x - pl[0].x) / l;
      kids = liveL1(p).filter((g) => [1, -1].some((s) => insideF(F1(p, g), { x: mx + s * 3 * nx, y: my + s * 3 * ny })));
      if (kids.length !== 2) return err<null>('E_INVARIANT', 'test: a two-knot lane did not split its face in two');
    } else {
      const h = splitFace(o, f, pts, { rows });
      if (!h.ok) return err<null>(h.code, h.detail);
      kids = [...h.value];
    }
    const call = rec.lanes.slice(before).find((c) => c.entity === entity && c.placed !== null);
    if (call === undefined) return err<null>('E_INVARIANT', 'test: no lane insertion recorded');
    placed = call.placed as XY[];
    // a bend the hot pixel reads as straight (its point within HOT_PIXEL_CM of the line through its neighbours: the
    // faithful read's straight-through drop, which turns a junction end's line with it) or merged into an end is no bend
    // the record can tell — discarded and counted (round S19, F5: the filter at the hot pixel, its stated reason, not 5 cm)
    if (placed.some((q, i) => i > 0 && q.x === placed[i - 1].x && q.y === placed[i - 1].y)) return err<null>('E_INVARIANT', 'test: discard — a lane\'s bend merged into its end');
    if (placed.length === 3 && segDist(placed[1], placed[0], placed[2]) < HOT_PIXEL_CM) return err<null>('E_INVARIANT', 'test: discard — a bend within the hot pixel of straight');
    // the children's rings hold the lane's placed points exactly, and its route runs on the line through them
    const kidRings = kids.map((g) => F1(p, g));
    if (!placed.every((q) => kidRings.every((rs) => hasVertex(rs, q)))) return err<null>('E_INVARIANT', 'test: discard — the children do not hold the placed points');
    const route = routeVertices(p, 'way').get(entity) ?? [];
    if (!route.every((q) => polyDist(q, placed, false) <= HOT_PIXEL_CM)) return err<null>('E_INVARIANT', 'test: discard — the lane route off its line');
    children = kids;
    return ok(null);
  });
  if (!res.ok) {
    discard(fig, res.detail.startsWith('test: discard') ? res.detail.slice(16) : res.detail.startsWith('test: ') ? res.detail.slice(6) : `cut refused ${res.code}`);
    return null;
  }
  n.table[entity] = twoKnot ? profile([(d.knots as [number, number])[0], (d.knots as [number, number])[1]]) : { halfWidthCm: d.hw, ends: d.ends };
  n.chains.push({ key: `way:${entity}`, role: 'way', points: placed, closed: false, hw: twoKnot ? [(d.knots as [number, number])[0], (d.knots as [number, number])[1]] : d.hw, ends: twoKnot ? 'round' : d.ends });
  // the record follows the insertion (S18R-2): a chain whose route the lane's end split now runs through that end's
  // placed point (read from the arena right after the insertion: an edge of its row ends there), so its truth does too
  const at = routeVertices(p, 'way');
  for (const q of [placed[0], placed[placed.length - 1]]) {
    for (const c of n.chains) {
      const rt = c.route ?? c.points;
      if (c.key === `way:${entity}` || rt.some((v) => v.x === q.x && v.y === q.y)) continue;
      if (!(at.get(c.key.slice(4)) ?? []).some((v) => v.x === q.x && v.y === q.y)) continue;
      const m = rt.length;
      let best = -1;
      let bd = Infinity;
      for (let i = 0; i < (c.closed ? m : m - 1); i += 1) {
        const d2 = segDist(q, rt[i], rt[(i + 1) % m]);
        if (d2 < bd) {
          bd = d2;
          best = i;
        }
      }
      const r0 = c.route ?? c.points;
      (c as unknown as { route: XY[] }).route = [...r0.slice(0, best + 1), q, ...r0.slice(best + 1)];
    }
  }
  if (holed) fig.slits += 1;
  fig.cuts += 1;
  return { children, placed, entity };
}

/** Is q strictly inside the rings (non-zero)? */
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

/**
 * LINE 10: 986 (c)'s incremental identity at a cut, measured — I(child₁) := exactRegion(X(parent)'s rings, child₂'s route
 * rings ∪ the lane's parts as child₁'s read takes them) against X(child₁) (and the same for child₂; for connectHole, the
 * slit's parts alone), each unequal case classed by where its difference lies.
 */
function identity(n: Net, parentX: Ring[], parentRead: ReadOut, kids: readonly FaceId[], lane: string, reads: ReadonlyMap<FaceId, ReadOut>, fig: Figures): void {
  const { p } = n;
  const ws = widthsOfNet(n);
  for (const [i, c] of kids.entries()) {
    const own = reads.get(c);
    if (own === undefined || own.x === null) continue;
    const rf = readFace(p, c, ws);
    const ls = rf.spines.get(`way:${lane}`);
    const laneParts = ls === undefined ? ok<Ring[]>([]) : kerbParts(rf.rings, new Map([[ls.key, ls]]), true);
    if (!laneParts.ok) continue;
    const sibling = kids.length === 2 ? F1(p, kids[1 - i]) : [];
    const I = exactRegion(parentX, [...sibling, ...laneParts.value]);
    fig.identity.measured += 1;
    if (JSON.stringify(T(I)) === JSON.stringify(T(own.x))) {
      fig.identity.equal += 1;
      continue;
    }
    const { h, far } = hausdorff(I, own.x, 0.25);
    const truth = truthOf(n);
    const bufOf = (key: string): TruthChain | undefined => truth.find((t) => t.key === key);
    const within = (key: string, q: XY, extra = NEAR_CM): boolean => {
      const t = bufOf(key);
      if (t === undefined || t.hw === null) return false;
      const hw = typeof t.hw === 'number' ? t.hw : Math.max(t.hw[0], t.hw[1]);
      return polyDist(q, t.points, t.closed) <= hw + extra;
    };
    const parentSpines = parentRead.spines.filter((s) => s !== `way:${lane}`);
    const childSpines = own.spines.filter((s) => s !== `way:${lane}`);
    const gone = parentSpines.filter((s) => !childSpines.includes(s));
    const fresh = childSpines.filter((s) => !parentSpines.includes(s));
    const changed = [...own.junctions.keys()].filter((s) => parentRead.junctions.has(s) && parentRead.junctions.get(s) !== own.junctions.get(s));
    const cls = new Set<string>();
    for (const q of far) {
      if (gone.some((s) => within(s, q))) cls.add('INHERITED');
      else if (fresh.some((s) => within(s, q))) cls.add('CONTACT');
      else if (changed.some((s) => within(s, q, DRY_MOVE_CM))) cls.add('END-CHANGED');
      else if (h <= NEAR_CM) cls.add('ROUNDING');
      else cls.add('OTHER');
    }
    if (cls.size === 0) cls.add(h <= NEAR_CM ? 'ROUNDING' : 'OTHER');
    for (const c2 of cls) fig.identity.classes[c2] = (fig.identity.classes[c2] ?? 0) + 1;
    if (cls.has('OTHER') && fig.identity.other.length < 20) fig.identity.other.push(`face ${String(c)} lane ${lane}: I ${JSON.stringify(T(I))} X ${JSON.stringify(T(own.x))} (${h.toFixed(2)} cm)`);
  }
}

/** One network of a property: up to two root faces, each cut to depth 3 (one child recursed per level), every read judged. */
function runNetwork(n: Net, lanes: readonly LaneDraw[], roots: readonly number[], slits: boolean, fig: Figures, input: unknown): void {
  fig.drawn += 1;
  if (!routesTrue(n.p, n.chains)) {
    discard(fig, 'a chord route off its line');
    return;
  }
  // a chord along a frame side (its ends attracted onto one side: network()'s own filter defeated) runs on the level-0
  // content, through other chains' ends there — no truth the end rule can read
  if (n.chains.some((c) => !c.closed && (c.points.every((q) => q.x === 0) || c.points.every((q) => q.x === 4000) || c.points.every((q) => q.y === 0) || c.points.every((q) => q.y === 4000)))) {
    discard(fig, 'a chord along a frame side');
    return;
  }
  // a chain whose placed points repeat retraces its own route (a bent way out and back to one frame point): its route is
  // one run with an end where its points turn back — no truth the oracle can read from its points
  if (n.chains.some((c) => new Set(c.points.map((q) => `${String(q.x)},${String(q.y)}`)).size !== c.points.length)) {
    discard(fig, 'a chain retracing its route');
    return;
  }
  fig.kept += 1;
  const faces = n.faces;
  if (faces.length === 0) return;
  let li = 0;
  let k = 0;
  const reads = new Map<FaceId, ReadOut>();
  const readOnce = (f: FaceId, tag: string): ReadOut => {
    const r = readAll(n, f, `${tag} ${JSON.stringify(input)}`, fig);
    reads.set(f, r);
    return r;
  };
  // the slits' property starts from a face with a hole where the network has one
  const holed = slits ? faces.filter((g) => F1(n.p, g).length > 1) : [];
  // two roots: the second drawn among the faces live after the first root's cuts and not cut yet (a network of one face
  // has the first root's children to start from), so every kept network meets up to six cuts
  const used = new Set<FaceId>();
  for (const [j, i] of roots.entries()) {
    const pool = j === 0 ? (holed.length > 0 ? holed : faces) : liveL1(n.p).filter((g) => !used.has(g));
    if (pool.length === 0) break;
    let F = pool[i % pool.length];
    used.add(F);
    let parent = readOnce(F, `root ${String(F)}`);
    for (let depth = 1; depth <= 3; depth += 1) {
      let made: ReturnType<typeof cut> = null;
      // up to six draws per level (a refused or discarded draw is counted)
      for (let tries = 0; tries < 6 && made === null && li < lanes.length; tries += 1) {
        const d = lanes[li];
        li += 1;
        const untouched = liveL1(n.p).filter((g) => g !== F);
        const other = untouched.length > 0 ? untouched[d.pick % untouched.length] : null;
        const keyBefore = other === null ? null : exactKey(n.p, other, widthsOfNet(n));
        made = cut(n, F, d, k, slits, fig);
        k += 1;
        if (made === null) continue;
        const live = liveL1(n.p);
        const kids = made.children;
        for (const c of kids) readOnce(c, `cut ${made.entity} child ${String(c)}`);
        const ends = [made.placed[0], made.placed[made.placed.length - 1]];
        const touched = [...new Set(ends.flatMap((q) => facesAtVertex(n.p, live, q)))].filter((g) => !kids.includes(g));
        for (const g of touched) readOnce(g, `cut ${made.entity} landing face ${String(g)}`);
        if (other !== null && !kids.includes(other) && !touched.includes(other) && live.includes(other)) {
          const r = readOnce(other, `cut ${made.entity} untouched face ${String(other)}`);
          if (keyBefore !== null && keyBefore !== r.key) {
            const a = keyBefore.split('\n');
            const b = r.key.split('\n');
            fig.untouchedChanged.push(`untouched face ${String(other)} under ${made.entity}: − ${JSON.stringify(a.filter((l) => !b.includes(l)).slice(0, 3))} + ${JSON.stringify(b.filter((l) => !a.includes(l)).slice(0, 3))} ${JSON.stringify(input)}`);
          }
        }
        if (parent.x !== null) identity(n, parent.x, parent, kids, made.entity, reads, fig);
        F = kids[d.pick % kids.length];
        for (const g of kids) used.add(g);
        parent = reads.get(F) as ReadOut;
      }
      if (made === null) break;
    }
  }
}

/** The figures' report line (line 9's REPORTED rows). */
function report(name: string, fig: Figures): string {
  const q = (xs: number[], f: number): number => {
    const s = xs.slice().sort((a, b) => a - b);
    return s.length === 0 ? 0 : s[Math.min(s.length - 1, Math.floor(f * s.length))];
  };
  const distinct = new Map<string, number>();
  for (const x of fig.keys.values()) if (x !== '[]') distinct.set(x, (distinct.get(x) ?? 0) + 1);
  const byPts = [100, 1000, Infinity].map((lim, i, a) => {
    const lo = i === 0 ? 0 : a[i - 1];
    const ms = fig.xByPoints.filter((r) => r.pts > lo && r.pts <= lim).map((r) => r.ms);
    return `${String(lo)}–${String(lim)} pts: ${String(ms.length)} reads, median ${q(ms, 0.5).toFixed(2)} p90 ${q(ms, 0.9).toFixed(2)} p99 ${q(ms, 0.99).toFixed(2)} ms`;
  });
  return `DERIVED ${name}: networks drawn ${String(fig.drawn)} kept ${String(fig.kept)}; discards ${JSON.stringify(fig.discards)}; cuts ${String(fig.cuts)} (slits ${String(fig.slits)}); faces judged ${String(fig.judged)}; ` +
    `line 7 classes ${JSON.stringify(fig.classes)} (NEAR at a tip ${String(fig.tipNear)}; no-move ${JSON.stringify(fig.noMove)}; served ${JSON.stringify(fig.servedBy)}; moved share ${(1 - (fig.servedBy.first ?? 0) / Math.max(1, fig.judged)).toFixed(3)}); ` +
    `straight-through (X ≠ X_U) ${String(fig.straightUnequal)} reads, max ${fig.straightMaxH.toFixed(2)} cm; keys ${String(fig.keys.size)} for ${String(distinct.size)} distinct non-empty X; ` +
    `lemma ${String(fig.lemmaEqual)}/${String(fig.lemmaReads)} byte-equal, max ${fig.lemmaMaxH.toFixed(2)} cm; identity (line 10) ${String(fig.identity.equal)}/${String(fig.identity.measured)} equal, classes ${JSON.stringify(fig.identity.classes)}; ` +
    `X per read median ${q(fig.xMs, 0.5).toFixed(2)} p90 ${q(fig.xMs, 0.9).toFixed(2)} p99 ${q(fig.xMs, 0.99).toFixed(2)} ms (${byPts.join('; ')}); construction median ${q(fig.cMs, 0.5).toFixed(2)} p90 ${q(fig.cMs, 0.9).toFixed(2)} p99 ${q(fig.cMs, 0.99).toFixed(2)} ms; ` +
    `construction's cases ${String(fig.constructionCases.length)}; X refused where the construction read ok ${String(fig.xRefusedWhereOk)}; ` +
    `planted control (X_U + 5 cm on no-move reads) ${String(fig.planted.failed)}/${String(fig.planted.reads)} failed; calls placed off their input with no move warning ${String(fig.placedOffSilent)}; untouched faces whose key changed ${String(fig.untouchedChanged.length)}; ` +
    `both placements (round S19: the arrangement in the three other quadrants) ${String(fig.reflected.equal)}/${String(fig.reflected.reads)} reads mirrored byte for byte`;
}

/** Line 9's bars on a property's figures: FAILING (i) – (iv) and the floors that scale with numRuns. */
function bars(fig: Figures): void {
  for (const c of fig.constructionCases.slice(0, 20)) console.info(`CONSTRUCTION CASE ${c}`);
  for (const c of fig.identity.other) console.info(`IDENTITY OTHER ${c}`);
  for (const c of fig.untouchedChanged.slice(0, 10)) console.info(`UNTOUCHED KEY ${c}`);
  expect(fig.failures.slice(0, 10)).toEqual([]);
  expect(fig.xRefusedWhereOk).toBe(0);
  expect(fig.writes).toBe(0);
  // the planted control: every no-move read's comparand moved 5 cm is reported a failure
  expect(fig.planted.failed).toBe(fig.planted.reads);
  expect(fig.planted.reads).toBeGreaterThan(0);
  // both placements (round S19, F1): every read's arrangement mirrored into the three other quadrants gives X mirrored
  expect(fig.reflected.equal).toBe(fig.reflected.reads);
  expect(fig.reflected.reads).toBeGreaterThan(0);
  // the floors, per run: kept ≥ ½ of those drawn; cuts ≥ 3 and faces judged ≥ 12 per kept network on average
  expect(fig.kept * 2).toBeGreaterThanOrEqual(fig.drawn);
  expect(fig.cuts).toBeGreaterThanOrEqual(3 * fig.kept);
  expect(fig.judged).toBeGreaterThanOrEqual(12 * fig.kept);
}

// ---- line 8's fixtures (each built in the test: a frame, ways by `way` / insertChain, cuts by splitFace / connectHole with a
// `way` row as S8 makes them) -------------------------------------------------------------------------------------------

/** A fixture: its arena, its widths and its named faces (by an interior point each). */
interface Fixture {
  readonly p: Plat;
  readonly ws: SpineWidths;
  readonly at: Record<string, readonly [number, number]>;
  readonly chains: Omit<TruthChain, 'junction'>[];
}

/** An L1 way inserted in its own batch, its placed points recorded (`way`'s form; closed for a ring way). */
function wayRec(p: Plat, entity: string, pts: readonly (readonly [number, number])[], closed = false): XY[] {
  let placed: XY[] = [];
  commit(p, 1, (o) => {
    const r = insertChain(o, pts.map(([x, y]) => P(x, y)), [{ role: 'way', entity }], 'mandatory', closed ? { closed: true } : {});
    if (r.ok) placed = r.value.placed.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }));
    return r;
  });
  return placed;
}

/** A lane cut by splitFace (or connectHole where `slit`) on the face at `inside`, rows [{ role: 'way', entity }] as S8's; its placed points. */
function laneRec(p: Plat, inside: readonly [number, number], entity: string, pts: readonly (readonly [number, number])[], slit = false): XY[] {
  const before = rec.lanes.length;
  commit(p, 1, (o) => {
    const f = faceAtXY(p, inside);
    const rows = [{ role: 'way', entity }];
    const r = slit ? connectHole(o, f, pts.map(([x, y]) => P(x, y)), { rows }) : splitFace(o, f, pts.map(([x, y]) => P(x, y)), { rows });
    return r.ok ? ok(null) : err<null>(r.code, r.detail);
  });
  const call = rec.lanes.slice(before).find((c) => c.entity === entity);
  return (call?.placed ?? []) as XY[];
}

/** The live L1 face holding the point (strictly). */
function faceAtXY(p: Plat, q: readonly [number, number]): FaceId {
  const f = liveL1(p).find((g) => insideF(F1(p, g), { x: q[0], y: q[1] }));
  if (f === undefined) throw new Error(`test: no L1 face holds (${String(q[0])}, ${String(q[1])})`);
  return f;
}

/** Widths from a table: every `way` chain by its entity, null where the table has none (a zero-width chain). */
const tableWidths = (t: Record<string, { halfWidthCm: number; ends: 'round' | 'square' }>): SpineWidths => (c) => (c.role === 'way' ? (t[c.entity] ?? null) : null);

/** The fixtures of line 8 (and of lines 2, 4, 5), by name. */
const FIX: Record<string, () => Fixture> = {
  // (1) HALF-COORDINATE: two 45° ways crossing — x − y = −1 (way:p) and x + y = 4000 (way:q), hw 100 each
  half: () => {
    const p = framed();
    const a = wayRec(p, 'way:p', [[0, 101], [3899, 4000]]);
    const b = wayRec(p, 'way:q', [[4000, 100], [100, 4000]]);
    setOwnerAll(p);
    const t = { 'way:p': { halfWidthCm: 100, ends: 'round' as const }, 'way:q': { halfWidthCm: 100, ends: 'round' as const } };
    return { p, ws: tableWidths(t), at: { F: [2000, 300] }, chains: [{ key: 'way:way:p', role: 'way', points: a, closed: false, hw: 100, ends: 'round' }, { key: 'way:way:q', role: 'way', points: b, closed: false, hw: 100, ends: 'round' }] };
  },
  // (2) OBLIQUE T: a lane (hw 100) at 60° to a zero-width L1 chain way:z (widths null), its end flat at the T
  oblique: () => {
    const p = framed();
    const z = wayRec(p, 'way:z', [[0, 2000], [4000, 2000]]);
    setOwnerAll(p);
    const l = laneRec(p, [2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    const t = { 'lane:1': { halfWidthCm: 100, ends: 'round' as const } };
    return { p, ws: tableWidths(t), at: { left: [300, 1000], right: [3000, 1000], N: [2000, 3000] }, chains: [{ key: 'way:way:z', role: 'way', points: z, closed: false, hw: null, ends: 'round' }, { key: 'way:lane:1', role: 'way', points: l, closed: false, hw: 100, ends: 'round' }] };
  },
  // (3) JUNCTION-FLAG FLIP: (2), then a second lane of the same role ending at the T from the far side: both ends capped
  flip: () => {
    const f = FIX.oblique();
    const l2 = laneRec(f.p, [2000, 3000], 'lane:2', [[3155, 4000], [2000, 2000]]);
    const t = { 'lane:1': { halfWidthCm: 100, ends: 'round' as const }, 'lane:2': { halfWidthCm: 100, ends: 'round' as const } };
    return { p: f.p, ws: tableWidths(t), at: { left: [300, 1000], right: [3000, 1000], Nleft: [500, 3500], Nright: [3500, 3500] }, chains: [...f.chains, { key: 'way:lane:2', role: 'way', points: l2, closed: false, hw: 100, ends: 'round' }] };
  },
  // (4) A RING WAY round an island (hw 50, ends declared square: a ring has none)
  ring: () => {
    const p = framed();
    const r = wayRec(p, 'way:r', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:r': { halfWidthCm: 50, ends: 'square' } }), at: { island: [2000, 2000], outer: [500, 500] }, chains: [{ key: 'way:way:r', role: 'way', points: r, closed: true, hw: 50, ends: 'square' }] };
  },
  // (5) A HOLE whose way's band (hw 40) is subtracted on the hole's side; `holeSlit` adds a connectHole slit (hw 30) to it
  hole: () => {
    const p = framed();
    const r = wayRec(p, 'way:h', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:h': { halfWidthCm: 40, ends: 'round' }, 'lane:s': { halfWidthCm: 30, ends: 'round' } }), at: { outer: [500, 500] }, chains: [{ key: 'way:way:h', role: 'way', points: r, closed: true, hw: 40, ends: 'round' }] };
  },
  holeSlit: () => {
    const f = FIX.hole();
    const s2 = laneRec(f.p, [500, 500], 'lane:s', [[2000, 0], [2000, 1000]], true);
    return { ...f, chains: [...f.chains, { key: 'way:lane:s', role: 'way', points: s2, closed: false, hw: 30, ends: 'round' }] };
  },
  // (6) THE EMPTY KERB: a sliver face between two ways 100 cm apart, each hw 100
  empty: () => {
    const p = framed();
    const a = wayRec(p, 'way:1', [[0, 2000], [4000, 2000]]);
    const b = wayRec(p, 'way:2', [[0, 2100], [4000, 2100]]);
    setOwnerAll(p);
    const t = { 'way:1': { halfWidthCm: 100, ends: 'round' as const }, 'way:2': { halfWidthCm: 100, ends: 'round' as const } };
    return { p, ws: tableWidths(t), at: { sliver: [2000, 2050] }, chains: [{ key: 'way:way:1', role: 'way', points: a, closed: false, hw: 100, ends: 'round' }, { key: 'way:way:2', role: 'way', points: b, closed: false, hw: 100, ends: 'round' }] };
  },
  // (7) THE PART-LESS FACE: two zero-width chains, the second ending in a T on the first — the left face's ring keeps the
  // exactly collinear T vertex (2000, 2000)
  partless: () => {
    const p = framed();
    const a = wayRec(p, 'way:a', [[2000, 0], [2000, 4000]]);
    const b = wayRec(p, 'way:b', [[2000, 2000], [4000, 2000]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({}), at: { left: [1000, 2000] }, chains: [{ key: 'way:way:a', role: 'way', points: a, closed: false, hw: null, ends: 'round' }, { key: 'way:way:b', role: 'way', points: b, closed: false, hw: null, ends: 'round' }] };
  },
  // (8) A DANGLING CHAIN of two widthless edges in a spine-less face (round S17's B-GUARD fixture)
  dangling: () => {
    const p = framed();
    const a = wayRec(p, 'way:0', [[2000, 0], [2000, 800], [2600, 1500]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({}), at: { F: [100, 100] }, chains: [{ key: 'way:way:0', role: 'way', points: a, closed: false, hw: null, ends: 'round' }] };
  },
  // (9) A VERTEX-ONLY CONTACT that reaches: way:s (hw 20) along y = 2000, a lane (hw 100) at 60° ending flat on it from
  // below — its end's corner reaches 50 cm past the chain, 30 cm past way:s's band, into N above
  reachBefore: () => {
    const p = framed();
    const a = wayRec(p, 'way:s', [[0, 2000], [4000, 2000]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:s': { halfWidthCm: 20, ends: 'round' }, 'lane:1': { halfWidthCm: 100, ends: 'round' } }), at: { N: [2000, 3000] }, chains: [{ key: 'way:way:s', role: 'way', points: a, closed: false, hw: 20, ends: 'round' }] };
  },
  reach: () => {
    const f = FIX.reachBefore();
    const l = laneRec(f.p, [2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    return { ...f, chains: [...f.chains, { key: 'way:lane:1', role: 'way', points: l, closed: false, hw: 100, ends: 'round' }] };
  },
  // ... and one that does not: way:w (hw 40), a lane (hw 15) square to it ending flat on it from below — no part of it
  // comes within its half-width of N's kerb
  noReachBefore: () => {
    const p = framed();
    const a = wayRec(p, 'way:w', [[0, 2000], [4000, 2000]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:w': { halfWidthCm: 40, ends: 'round' }, 'lane:1': { halfWidthCm: 15, ends: 'square' } }), at: { N: [2000, 3000] }, chains: [{ key: 'way:way:w', role: 'way', points: a, closed: false, hw: 40, ends: 'round' }] };
  },
  noReach: () => {
    const f = FIX.noReachBefore();
    const l = laneRec(f.p, [2000, 1000], 'lane:1', [[2000, 0], [2000, 2000]]);
    return { ...f, chains: [...f.chains, { key: 'way:lane:1', role: 'way', points: l, closed: false, hw: 15, ends: 'square' }] };
  },
  // line 5's NARROW BAND (KM8): way:k (hw 0.9: its strip's edges one centimetre above and below its line, vertically) and
  // a ZERO-WIDTH lane ending in a T on it from below at x = 1995 (its line at y = 2163.58): the T vertex v the ring rule
  // drops from N's ring, held by way:k's strip, whose upper edge passes within L∞ 0.5 cm of v
  kink: () => {
    const p = framed();
    const a = wayRec(p, 'way:k', [[0, 1000], [4000, 3333]]);
    setOwnerAll(p);
    const l = laneRec(p, [3000, 500], 'lane:1', [[1995, 0], [1995, 2164]]);
    return { p, ws: tableWidths({ 'way:k': { halfWidthCm: 0.9, ends: 'round' } }), at: { N: [500, 3500] }, chains: [{ key: 'way:way:k', role: 'way', points: a, closed: false, hw: 0.9, ends: 'round' }, { key: 'way:lane:1', role: 'way', points: l, closed: false, hw: null, ends: 'round' }] };
  },
  // (10) A NARROW BAND: a spine of half-width 3 cm (line 6's blind spot, covered here)
  narrow: () => {
    const p = framed();
    const a = wayRec(p, 'way:n', [[0, 1000], [4000, 3000]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:n': { halfWidthCm: 3, ends: 'round' } }), at: { below: [3000, 500], above: [1000, 3000] }, chains: [{ key: 'way:way:n', role: 'way', points: a, closed: false, hw: 3, ends: 'round' }] };
  },
};

/** One fixture face read every way (the literal pins' and the notes' quotes): X, the key content, the construction's read, its line 7 class. */
function fixtureRead(fx: Fixture, name: string): { x: string[]; key: string; content: ReturnType<typeof exactKeyContent>; region: string[] | string; cls: string; parts: string[]; verdict: Verdict | null } {
  const f = faceAtXY(fx.p, fx.at[name]);
  const ex = exactRegionOfFace(fx.p, f, fx.ws);
  const content = exactKeyContent(fx.p, f, fx.ws);
  let region: string[] | string = '';
  let cls = '';
  const parts: string[] = [];
  commit(fx.p, 1, (o) => {
    rec.calls = [];
    rec.on = true;
    const s0 = rec.opSave;
    const k = readKerb(o, f, fx.ws);
    rec.on = false;
    if (!k.ok) {
      region = `${k.code} ${k.detail}`;
      return ok(null);
    }
    region = T(k.value.region);
    const served = servedOf(rec.calls, rec.opSave - s0, kerbCensus(fx.p)?.faithful ?? 'none');
    const rf = readFace(fx.p, f, fx.ws);
    const pu = kerbParts(rf.rings, k.value.spines, served.by === 'faithful');
    if (pu.ok) {
      const rel = relate(k.value.region, exactRegion(rf.rings, pu.value), served);
      cls = `${rel.cls} (${rel.h.toFixed(2)} cm; served ${served.by}${served.noMove ? ', no move' : ''})`;
    }
    return ok(null);
  });
  if (content.ok) for (const s2 of content.value.spines) for (const q of s2.parts) parts.push(`${s2.key}: ${T([q])[0]}`);
  const verdict = ex.ok ? judge(F1(fx.p, f), endsOf(fx.chains, onFrameXY), ex.value.region, exemptOf(fx.p, f, fx.ws)) : null;
  return { x: ex.ok ? T(ex.value.region) : [`refused ${ex.code}`], key: ex.ok ? ex.value.key : '', content, region, cls, parts, verdict };
}

const PROBE = process.env.PLAT_DERIVED_PROBE;
if (PROBE !== undefined && PROBE !== '') {
  it('prints line 8\'s fixtures (PLAT_DERIVED_PROBE)', () => {
    for (const [fname, make] of Object.entries(FIX)) {
      if (PROBE !== 'all' && !PROBE.split(',').includes(fname)) continue;
      const fx = make();
      for (const face of Object.keys(fx.at)) {
        const r = fixtureRead(fx, face);
        console.info(`FIXTURE ${fname}.${face}\n X ${JSON.stringify(r.x)}\n construction ${JSON.stringify(r.region)} — ${r.cls}\n oracle ${JSON.stringify(r.verdict === null ? null : { misses: r.verdict.misses.length, v: r.verdict.vertexFaults, s: r.verdict.simplicity })}\n parts\n  ${r.parts.join('\n  ')}\n key rings ${JSON.stringify(r.content.ok ? T(r.content.value.rings) : null)} reaching ${JSON.stringify(r.content.ok ? r.content.value.reaching : null)}`);
      }
    }
  });
}

// ---- line 3: exactRegion's own pins — the order property, the rounding rule, simplicity and nesting -------------------

/** N / D rounded half away from zero, by BigInt division (the test's own reading of §3.2's rule). */
function halfAwayTest(N: bigint, D: bigint): bigint {
  const neg = N < 0n !== D < 0n;
  const n = N < 0n ? -N : N;
  const d = D < 0n ? -D : D;
  const k = (2n * n + d) / (2n * d);
  return neg ? -k : k;
}

/** Every lattice point an output vertex may be (line 3 (b)): the input vertices and the half-away roundings of the exact proper crossings of two input segments, recomputed in BigInt. */
function candidates(rings: readonly (readonly XY[])[], parts: readonly (readonly XY[])[]): Set<string> {
  const segs: [XY, XY][] = [];
  const out = new Set<string>();
  for (const r of [...rings, ...parts]) {
    for (let i = 0; i < r.length; i += 1) {
      out.add(`${String(r[i].x)},${String(r[i].y)}`);
      const b = r[(i + 1) % r.length];
      if (b.x !== r[i].x || b.y !== r[i].y) segs.push([r[i], b]);
    }
  }
  const o = (a: XY, b: XY, c: XY): bigint => (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
  for (let i = 0; i < segs.length; i += 1) {
    const [a, b] = segs[i];
    for (let j = i + 1; j < segs.length; j += 1) {
      const [c, d] = segs[j];
      if (Math.max(c.x, d.x) < Math.min(a.x, b.x) || Math.min(c.x, d.x) > Math.max(a.x, b.x) || Math.max(c.y, d.y) < Math.min(a.y, b.y) || Math.min(c.y, d.y) > Math.max(a.y, b.y)) continue;
      const o1 = o(a, b, c);
      const o2 = o(a, b, d);
      const o3 = o(c, d, a);
      const o4 = o(c, d, b);
      if (!(((o1 > 0n && o2 < 0n) || (o1 < 0n && o2 > 0n)) && ((o3 > 0n && o4 < 0n) || (o3 < 0n && o4 > 0n)))) continue;
      const rx = BigInt(b.x - a.x);
      const ry = BigInt(b.y - a.y);
      const D = rx * BigInt(d.y - c.y) - ry * BigInt(d.x - c.x);
      const t = (BigInt(c.x) - BigInt(a.x)) * BigInt(d.y - c.y) - (BigInt(c.y) - BigInt(a.y)) * BigInt(d.x - c.x);
      out.add(`${String(halfAwayTest(BigInt(a.x) * D + rx * t, D))},${String(halfAwayTest(BigInt(a.y) * D + ry * t, D))}`);
    }
  }
  return out;
}

/** Line 3's checks on one exactRegion result: (b) every vertex a lattice point among the candidates, (c) simple rings (line 2's exemption apart), nested as a region's rings do. */
function regionFaults(rings: readonly (readonly XY[])[], parts: readonly (readonly XY[])[], X: readonly (readonly LatticePoint[])[], exempt: (r: readonly LatticePoint[]) => boolean | null = () => null): string[] {
  const out: string[] = [];
  const ok2 = candidates(rings, parts);
  for (const r of X) {
    for (const q of r) {
      if (!Number.isInteger(q.x) || !Number.isInteger(q.y)) out.push(`(${String(q.x)}, ${String(q.y)}) off the lattice`);
      else if (!ok2.has(`${String(q.x)},${String(q.y)}`)) out.push(`(${String(q.x)}, ${String(q.y)}) neither an input vertex nor a rounded crossing`);
    }
    const ex = exempt(r);
    if (ex === null ? !simpleRing(r) : !ex) out.push(`a ring not simple: ${T([r])[0]}`);
  }
  for (const n of nestingProblems(X)) out.push(n);
  return out;
}

/** A ring's doubled signed area (the test's own, plain arithmetic). */
const area2Of = (r: readonly XY[]): number => r.reduce((s, q, i) => s + q.x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * q.y, 0);

/** The half-away roundings of every exact proper crossing of two input segments that lies at an EXACT half in x and in y with a negative coordinate (round S19, F1: the case the half-open pixel got wrong), recomputed in BigInt. */
function halfHalfNegative(rings: readonly (readonly XY[])[], parts: readonly (readonly XY[])[]): Set<string> {
  const segs: [XY, XY][] = [];
  for (const r of [...rings, ...parts]) for (let i = 0; i < r.length; i += 1) if (r[(i + 1) % r.length].x !== r[i].x || r[(i + 1) % r.length].y !== r[i].y) segs.push([r[i], r[(i + 1) % r.length]]);
  const o = (a: XY, b: XY, c: XY): bigint => (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
  const half = (N: bigint, D: bigint): boolean => (2n * N) % D === 0n && ((2n * N) / D) % 2n !== 0n;
  const out = new Set<string>();
  for (let i = 0; i < segs.length; i += 1) {
    const [a, b] = segs[i];
    for (let j = i + 1; j < segs.length; j += 1) {
      const [c, d] = segs[j];
      const o1 = o(a, b, c);
      const o2 = o(a, b, d);
      const o3 = o(c, d, a);
      const o4 = o(c, d, b);
      if (!(((o1 > 0n && o2 < 0n) || (o1 < 0n && o2 > 0n)) && ((o3 > 0n && o4 < 0n) || (o3 < 0n && o4 > 0n)))) continue;
      const rx = BigInt(b.x - a.x);
      const ry = BigInt(b.y - a.y);
      const D = rx * BigInt(d.y - c.y) - ry * BigInt(d.x - c.x);
      const t = (BigInt(c.x) - BigInt(a.x)) * BigInt(d.y - c.y) - (BigInt(c.y) - BigInt(a.y)) * BigInt(d.x - c.x);
      const Nx = BigInt(a.x) * D + rx * t;
      const Ny = BigInt(a.y) * D + ry * t;
      if (!half(Nx, D) || !half(Ny, D)) continue;
      const qx = halfAwayTest(Nx, D);
      const qy = halfAwayTest(Ny, D);
      if (qx < 0n || qy < 0n) out.add(`${String(qx)},${String(qy)}`);
    }
  }
  return out;
}

/** Every permutation line 3 (a) draws: the parts shuffled, each ring's and part's start rotated, the holes reversed. */
function permuted(rings: readonly (readonly LatticePoint[])[], parts: readonly (readonly LatticePoint[])[], perm: readonly number[], rot: number): [LatticePoint[][], LatticePoint[][]] {
  const turn = (r: readonly LatticePoint[], k: number): LatticePoint[] => [...r.slice(k % r.length), ...r.slice(0, k % r.length)];
  const rs = rings.map((r, i) => turn(r, rot + i));
  const holes = rs.slice(1).reverse();
  const order = parts.map((_, i) => i).sort((a, b) => (perm[a % perm.length] ?? 0) - (perm[b % perm.length] ?? 0) || b - a);
  return [[rs[0], ...holes], order.map((i, j) => turn(parts[i], rot + j))];
}

describe('line 3: exactRegion — one arrangement, the half-away rounding without division, order-free', () => {
  it('(d) the rounding\'s own pins: exact halves of both signs away from zero, and next to them (x.5 ± 1⁄D)', () => {
    // +x.5 → up, −x.5 → down (away from zero); XR2 (truncation) and XR4 (Math.round, half up) are red here
    expect(roundQuotientHalfAway(5n, 2n)).toBe(3);
    expect(roundQuotientHalfAway(-5n, 2n)).toBe(-3);
    expect(roundQuotientHalfAway(5n, -2n)).toBe(-3);
    expect(roundQuotientHalfAway(-5n, -2n)).toBe(3);
    expect(roundQuotientHalfAway(1n, 2n)).toBe(1);
    expect(roundQuotientHalfAway(-1n, 2n)).toBe(-1);
    expect(roundQuotientHalfAway(4_000_001n, 2n)).toBe(2_000_001);
    expect(roundQuotientHalfAway(-4_000_001n, 2n)).toBe(-2_000_001);
    // next to the halves: 2.5 ± 1⁄1000, −2.5 ± 1⁄1000
    expect(roundQuotientHalfAway(2501n, 1000n)).toBe(3);
    expect(roundQuotientHalfAway(2499n, 1000n)).toBe(2);
    expect(roundQuotientHalfAway(-2499n, 1000n)).toBe(-2);
    expect(roundQuotientHalfAway(-2501n, 1000n)).toBe(-3);
    // a numerator past 2⁵³ (the exact crossing's, S18R-9): 2⁴⁰ · 1 234 567 + 2³⁹ over 2⁴⁰ — an exact half the double
    // estimate cannot see — and one unit below it
    const D40 = 2n ** 40n;
    expect(roundQuotientHalfAway(D40 * 1_234_567n + D40 / 2n, D40)).toBe(1_234_568);
    expect(roundQuotientHalfAway(D40 * 1_234_567n + D40 / 2n - 1n, D40)).toBe(1_234_567);
    expect(roundQuotientHalfAway(-(D40 * 1_234_567n + D40 / 2n), D40)).toBe(-1_234_568);
    expect(roundQuotientHalfAway(-(D40 * 1_234_567n + D40 / 2n - 1n), D40)).toBe(-1_234_567);
    expect(roundQuotientHalfAway(7_000_001n * 3n + 2n, 3n)).toBe(7_000_002);
    expect(roundQuotientHalfAway(7_000_001n * 3n + 1n, 3n)).toBe(7_000_001);
    // the identity on every quotient of small numbers, both signs
    for (let n = -40n; n <= 40n; n += 1n) for (const d of [1n, 2n, 3n, 4n, 7n, -2n, -5n]) expect(BigInt(roundQuotientHalfAway(n, d)), `${String(n)}/${String(d)}`).toBe(halfAwayTest(n, d));
  });

  it('(a) – (c) on random part sets on random rings: every permutation drawn byte-identical; every vertex an input vertex or a rounded crossing; simple, well-nested rings', { timeout: HARD }, () => {
    const box = fc.tuple(fc.integer({ min: -500, max: 3000 }), fc.integer({ min: -500, max: 3000 }), fc.integer({ min: 30, max: 2000 }), fc.integer({ min: 30, max: 2000 }));
    const rect = box.map(([x, y, w, h]) => [P(x, y), P(x + w, y), P(x + w, y + h), P(x, y + h)]);
    const tri = fc.tuple(fc.integer({ min: -500, max: 3500 }), fc.integer({ min: -500, max: 3500 }), fc.integer({ min: -500, max: 3500 }), fc.integer({ min: -500, max: 3500 }), fc.integer({ min: -500, max: 3500 }), fc.integer({ min: -500, max: 3500 })).map(([a, b, c, d, e, f]) => {
      const t = [P(a, b), P(c, d), P(e, f)];
      const ar = (t[1].x - t[0].x) * (t[2].y - t[0].y) - (t[1].y - t[0].y) * (t[2].x - t[0].x);
      return ar < 0 ? t.reverse() : t;
    });
    // real buffer parts: bufferParts of a random chain (strips, round joins, caps)
    const chain = fc.tuple(fc.array(fc.tuple(fc.integer({ min: -200, max: 3200 }), fc.integer({ min: -200, max: 3200 })), { minLength: 2, maxLength: 4 }), fc.integer({ min: 1, max: 300 }), fc.constantFrom<'round' | 'square' | 'flat'>('round', 'square', 'flat'));
    const ringsArb = fc.tuple(fc.integer({ min: 0, max: 2000 }), fc.integer({ min: 0, max: 2000 }), fc.integer({ min: 600, max: 3000 }), fc.integer({ min: 600, max: 3000 }), fc.option(fc.tuple(fc.integer({ min: 100, max: 400 }), fc.integer({ min: 100, max: 400 })), { freq: 2 }), fc.oneof(fc.constant(null), tri)).map(([x, y, w, h, hole, t]) => {
      const out: LatticePoint[][] = [t !== null && (t[1].x - t[0].x) * (t[2].y - t[0].y) - (t[1].y - t[0].y) * (t[2].x - t[0].x) !== 0 ? t : [P(x, y), P(x + w, y), P(x + w, y + h), P(x, y + h)]];
      if (hole !== null && t === null) {
        out.push([P(x + hole[0], y + hole[1]), P(x + hole[0], y + h - hole[1]), P(x + w - hole[0], y + h - hole[1]), P(x + w - hole[0], y + hole[1])]);
        out.push([P(x + hole[0] / 2, y + hole[1] / 2), P(x + hole[0] / 2, y + hole[1] / 2 + 20), P(x + hole[0] / 2 + 20, y + hole[1] / 2 + 20), P(x + hole[0] / 2 + 20, y + hole[1] / 2)].map((q) => P(Math.round(q.x), Math.round(q.y))));
      }
      return out;
    });
    let nonEmpty = 0;
    let rounded = 0;
    fc.assert(
      fc.property(ringsArb, fc.array(fc.oneof(rect, tri, chain), { minLength: 1, maxLength: 6 }), fc.array(fc.nat(100), { minLength: 1, maxLength: 8 }), fc.nat(20), (rings, ps, perm, rot) => {
        const parts: LatticePoint[][] = [];
        for (const q of ps) {
          if (Array.isArray(q[0])) {
            const [pts, hw, ends] = q as unknown as [[number, number][], number, 'round' | 'square' | 'flat'];
            const b = bufferPartsT([pts.map(([x, y]) => P(x, y))], hw, 'round', ends);
            if (b.ok) for (const r of b.value) parts.push(r);
          } else if ((q as LatticePoint[]).length >= 3) parts.push(q as LatticePoint[]);
        }
        if (parts.length === 0) return;
        const X = exactRegion(rings, parts);
        if (X.length > 0) nonEmpty += 1;
        const [r2, p2] = permuted(rings, parts, perm, rot);
        expect(T(exactRegion(r2, p2))).toEqual(T(X));
        const faults = regionFaults(rings, parts, X);
        expect(faults).toEqual([]);
        const inputs = new Set([...rings, ...parts].flatMap((r) => r.map((q) => `${String(q.x)},${String(q.y)}`)));
        if (X.some((r) => r.some((q) => !inputs.has(`${String(q.x)},${String(q.y)}`)))) rounded += 1;
      }),
      { numRuns: Math.max(200, Math.floor(RUNS / 10)) },
    );
    console.info(`LINE 3 order property: ${String(Math.max(200, Math.floor(RUNS / 10)))} draws, ${String(nonEmpty)} non-empty, ${String(rounded)} with a rounded crossing`);
    expect(nonEmpty).toBeGreaterThan(0);
    expect(rounded).toBeGreaterThan(0);
  });

  it('XR1\'s literal: a crossing at an exact half met only through the whole arrangement — the same X in either part order', () => {
    // a ring and two parts whose edges cross at (1999.5, 1958.5) and (2000.5, 1959.5): one arrangement rounds each once
    const rings = [R('0,0 4000,0 4000,4000 0,4000')];
    const a = R('71,30 3970,3929 3899,4000 -71,172');
    const b = R('3929,29 4071,171 171,4071 29,3929');
    const c = R('0,-100 4000,-100 4000,1960 0,1960');
    for (const parts of [[a, b, c], [c, b, a], [b, c, a]]) expect(T(exactRegion(rings, parts))).toEqual(T(exactRegion(rings, [a, b, c])));
  });

  // ---- round S19, F1: the half-away rule in every quadrant (every frame is centred on the origin, num/lattice.ts) -------

  it('F1 (round S19): the minimal box — y = x and x + y = 9 cross at exactly (4.5, 4.5) — in all four quadrants, each X the mirror of the first', () => {
    // the box 0,0 10,0 10,10 0,10 less the triangles below y = x and below x + y = 9: the kept region's corner is the
    // crossing (4.5, 4.5), half away (5, 5); mirrored, (−4.5, −4.5) → (−5, −5) etc. A pixel half-open the same way for every
    // sign (round S18's) read [] or the whole box in the other three quadrants
    const box = [R('0,0 10,0 10,10 0,10')];
    const tris = [R('0,0 10,0 10,10'), R('-1,10 -1,-1 10,-1')];
    const first = exactRegion(box, tris);
    expect(T(first)).toEqual(['5,5 10,10 0,10 0,9']);
    for (const [sx, sy] of QUADRANTS) {
      const X = exactRegion(mirror(box, sx, sy), mirror(tris, sx, sy));
      expect(T(X), `quadrant ${String(sx)},${String(sy)}`).toEqual(T(reflected(first, sx, sy)));
      expect(regionFaults(mirror(box, sx, sy), mirror(tris, sx, sy), X)).toEqual([]);
    }
    expect(T(reflected(first, -1, -1))).toEqual(['-10,-10 0,-10 0,-9 -5,-5']);
    // round S18's notes row 183 (a): the box 0,0 100,0 100,100 0,100 less line 8 (1)'s two strips (way:p's strip and
    // flat start end, way:q's strip) — BY HAND the kept region is below way:p's lower edge x − y = 41 (it meets x = 100
    // at y = 59) or before its flat end x + y = 101 (it meets y = 100 at x = 1), with the strip's corner 71,30: the same
    // region, mirrored, in every quadrant (the half-open pixel kept a corner triangle in one and lost it in the other)
    const box100 = [R('0,0 100,0 100,100 0,100')];
    const strips = [R('71,30 3970,3929 3899,4000 3828,4071 -71,172 0,101'), R('3929,29 4000,100 4071,171 171,4071 100,4000 29,3929')];
    const first100 = exactRegion(box100, strips);
    expect(T(first100)).toEqual(['0,0 100,0 100,59 71,30 1,100 0,100']);
    for (const [sx, sy] of QUADRANTS) expect(T(exactRegion(mirror(box100, sx, sy), mirror(strips, sx, sy))), `box100 ${String(sx)},${String(sy)}`).toEqual(T(reflected(first100, sx, sy)));
  });

  it('F1 (round S19): (a) – (c) on rings and parts on BOTH sides of the origin — 45° strips of odd offsets (crossings at exact half-half points of every sign): X of every mirrored input the mirror of X, every permutation byte-identical, every vertex an input vertex or a rounded crossing, simple, well-nested', { timeout: HARD }, () => {
    // a 45° strip: centre c, direction (1, ±1), half-length L, half-width w — its edges the lines x ∓ y = const and
    // x ± y = const, so two strips of the two directions cross at a half-half point wherever their constants' sum is odd
    const strip = fc.tuple(fc.integer({ min: -2500, max: 2500 }), fc.integer({ min: -2500, max: 2500 }), fc.boolean(), fc.integer({ min: 50, max: 2000 }), fc.integer({ min: 1, max: 300 })).map(([cx, cy, up, L, w]) => {
      const dy = up ? 1 : -1;
      const r = [P(cx - L + w * dy, cy - L * dy - w), P(cx + L + w * dy, cy + L * dy - w), P(cx + L - w * dy, cy + L * dy + w), P(cx - L - w * dy, cy - L * dy + w)];
      return area2Of(r) < 0 ? r.reverse() : r;
    });
    const chain = fc.tuple(fc.array(fc.tuple(fc.integer({ min: -3000, max: 3000 }), fc.integer({ min: -3000, max: 3000 })), { minLength: 2, maxLength: 4 }), fc.integer({ min: 1, max: 300 }), fc.constantFrom<'round' | 'square' | 'flat'>('round', 'square', 'flat'));
    const ringsArb = fc.tuple(fc.integer({ min: -3000, max: -200 }), fc.integer({ min: -3000, max: -200 }), fc.integer({ min: 200, max: 3000 }), fc.integer({ min: 200, max: 3000 }), fc.option(fc.tuple(fc.integer({ min: -1500, max: 1500 }), fc.integer({ min: -1500, max: 1500 }), fc.integer({ min: 20, max: 150 })), { freq: 2 })).map(([x0, y0, x1, y1, hole]) => {
      const out: LatticePoint[][] = [[P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)]];
      if (hole !== null && hole[0] - hole[2] > x0 && hole[0] + hole[2] < x1 && hole[1] - hole[2] > y0 && hole[1] + hole[2] < y1) {
        const [hx, hy, s] = hole;
        out.push([P(hx - s, hy - s), P(hx - s, hy + s), P(hx + s, hy + s), P(hx + s, hy - s)]);
      }
      return out;
    });
    let draws = 0;
    let negHalf = 0;
    let negRounded = 0;
    fc.assert(
      fc.property(ringsArb, fc.array(fc.oneof({ weight: 3, arbitrary: strip }, { weight: 1, arbitrary: chain }), { minLength: 1, maxLength: 6 }), fc.array(fc.nat(100), { minLength: 1, maxLength: 8 }), fc.nat(20), (rings, ps, perm, rot) => {
        const parts: LatticePoint[][] = [];
        for (const q of ps) {
          if (Array.isArray(q[0])) {
            const [pts, hw, ends] = q as unknown as [[number, number][], number, 'round' | 'square' | 'flat'];
            const b = bufferPartsT([pts.map(([x, y]) => P(x, y))], hw, 'round', ends);
            if (b.ok) for (const r of b.value) parts.push(r);
          } else parts.push(q as LatticePoint[]);
        }
        if (parts.length === 0) return;
        draws += 1;
        const X = exactRegion(rings, parts);
        const hh = halfHalfNegative(rings, parts);
        if (hh.size > 0) negHalf += 1;
        if (X.some((r) => r.some((v) => hh.has(`${String(v.x)},${String(v.y)}`)))) negRounded += 1;
        expect(regionFaults(rings, parts, X)).toEqual([]);
        const [r2, p2] = permuted(rings, parts, perm, rot);
        expect(T(exactRegion(r2, p2))).toEqual(T(X));
        for (const [sx, sy] of QUADRANTS) {
          const Xm = exactRegion(mirror(rings, sx, sy), mirror(parts, sx, sy));
          expect(T(Xm), `quadrant ${String(sx)},${String(sy)}`).toEqual(T(reflected(X, sx, sy)));
        }
      }),
      { numRuns: Math.max(200, Math.floor(RUNS / 10)) },
    );
    console.info(`LINE 3 both sides of the origin (round S19): ${String(draws)} draws, ${String(negHalf)} with an exact half-half crossing at a negative coordinate, ${String(negRounded)} with its rounding a vertex of X`);
    expect(negHalf).toBeGreaterThan(0);
    expect(negRounded).toBeGreaterThan(0);
  });
});

// ---- line 8: the literal-ring pins ------------------------------------------------------------------------------------

/** The literal X of each fixture face (canonical ring text), with its parts quoted from bufferParts and its clip intersections computed by hand in the comment. */
const LITERAL: Record<string, Record<string, string[]>> = {
  // (1) HALF-COORDINATE (kills XR2). Parts (bufferParts, way:p (0, 101) → (3899, 4000) hw 100; way:q (4000, 100) →
  // (100, 4000) hw 100): way:p's strip 71,30 3970,3929 3899,4000 3828,4071 -71,172 0,101 and start cap 0,1 38,9 71,30 …;
  // way:q's strip 3929,29 4000,100 4071,171 171,4071 100,4000 29,3929 and end cap 4000,0 4038,8 4071,29 … 3929,29 3962,8.
  // The clip intersection BY HAND: way:p's lower edge 71,30 – 3970,3929 is x − y = 41, way:q's 3929,29 – 29,3929 is
  // x + y = 3958; they meet at exactly (1999.5, 1958.5) — §3.2's half away gives (2000, 1959) (the construction's
  // placement rule ties toward the smaller coordinate: its read holds (1999, 1958), S18R-4). The other vertices are F's
  // corners and the two caps' vertices on the frame.
  half: { F: ['0,0 4000,0 3962,8 3929,29 2000,1959 71,30 38,9 0,1'] },
  // (2) OBLIQUE T (kills XM3). Parts (lane:1 (845, 0) → (2000, 2000), hw 100, its end on way:z flat): strip
  // 932,-50 2087,1950 2000,2000 1913,2050 758,50 845,0; start cap 832,-99 … 845,0 758,50 746,13 748,-26 ….
  // BY HAND: the cap edge 746,13 – 748,-26 meets y = 0 at x = 746 + 2·13⁄39 = 746.67 → 747; the strip edge
  // 758,50 – 1913,2050 meets y = 2000 at x = 758 + 1950·1155⁄2000 = 1884.125 → 1884; the strip edge 932,-50 – 2087,1950
  // meets y = 0 at x = 932 + 50·1155⁄2000 = 960.875 → 961. Each child ends on the end line 1913,2050 – 2087,1950 (square
  // to the lane through the T (2000, 2000)); N (beyond the zero-width chain) loses the corner 1884,2000 1913,2050 2000,2000.
  oblique: {
    left: ['0,0 747,0 746,13 758,50 1884,2000 0,2000'],
    right: ['961,0 4000,0 4000,2000 2000,2000 2087,1950'],
    N: ['0,2000 1884,2000 1913,2050 2000,2000 4000,2000 4000,4000 0,4000'],
  },
  // (3) JUNCTION-FLAG FLIP: lane:2 (3155, 4000) → (2000, 2000) of the same role ends at the T too — both ends capped
  // (lane:1's end cap 2087,1950 2099,1987 … 1913,2050 2000,2000; lane:2's 1987,1901 … 1950,1913 and its strip
  // 2087,1950 3242,3950 3155,4000 3068,4050 1913,2050 2000,2000). BY HAND: lane:2's strip edge 2087,1950 – 3242,3950 meets
  // y = 2000 at 2087 + 50·1155⁄2000 = 2115.875 → 2116; its edge 1913,2050 – 3068,4050 meets y = 4000 at
  // 1913 + 1950·1155⁄2000 = 3039.125 → 3039; its end cap's edge 3254,3987 – 3252,4026 meets y = 4000 at 3253.33 → 3253.
  flip: {
    left: ['0,0 747,0 746,13 758,50 1884,2000 0,2000'],
    right: ['961,0 4000,0 4000,2000 2116,2000 2087,1950'],
    Nleft: ['0,2000 1884,2000 1913,2050 3039,4000 0,4000'],
    Nright: ['2116,2000 4000,2000 4000,4000 3253,4000 3254,3987 3242,3950'],
  },
  // (4) A RING WAY (kills XM4): hw 50 once round, every vertex a round join, no cap (declared square: a ring has none).
  // The island's corners are the strips' inner edges' crossings (exact: 1050 / 2950); the outer face's hole is the
  // strips' outer edges and the joins' arcs, every vertex a part vertex (bufferParts: 1000,950 975,957 957,975 950,1000 …).
  ring: {
    island: ['1050,1050 2950,1050 2950,2950 1050,2950'],
    outer: ['0,0 4000,0 4000,4000 0,4000', '1000,950 975,957 957,975 950,1000 950,3000 957,3025 975,3043 1000,3050 3000,3050 3025,3043 3043,3025 3050,3000 3050,1000 3043,975 3025,957 3000,950'],
  },
  // (5) A HOLE (kills XM5): the ring way's band (hw 40) subtracted on the hole's side — every vertex a part vertex.
  hole: { outer: ['0,0 4000,0 4000,4000 0,4000', '1000,960 980,965 965,980 960,1000 960,3000 965,3020 980,3035 1000,3040 3000,3040 3020,3035 3035,3020 3040,3000 3040,1000 3035,980 3020,965 3000,960'] },
  // ... then a connectHole slit (lane:s (2000, 0) → (2000, 1000), hw 30, its end on the ring way flat): the slit's
  // edges x = 1970 / 2030 meet the band's edge y = 960 exactly
  holeSlit: { outer: ['0,0 1970,0 1970,960 1000,960 980,965 965,980 960,1000 960,3000 965,3020 980,3035 1000,3040 3000,3040 3020,3035 3035,3020 3040,3000 3040,1000 3035,980 3020,965 3000,960 2030,960 2030,0 4000,0 4000,4000 0,4000'] },
  // (6) THE EMPTY KERB (kills XM6): ok([])
  empty: { sliver: [] },
  // (7) THE PART-LESS FACE (kills XM7): the route rings verbatim, the exactly collinear T (2000, 2000) kept
  partless: { left: ['0,0 2000,0 2000,2000 2000,4000 0,4000'] },
  // (8) A DANGLING CHAIN: F's walk out and back, verbatim (judged by ringCrosses with F's bridges, line 2)
  dangling: { F: ['0,0 2000,0 2000,800 2600,1500 2000,800 2000,0 4000,0 4000,4000 0,4000'] },
  // (9) A VERTEX-ONLY CONTACT that reaches (kills XM1): lane:1 (hw 100, 60°) ends flat on way:s (hw 20; strip
  // 0,1980 4000,1980 4000,2000 4000,2020 0,2020 0,2000); BY HAND: the lane's edge 758,50 – 1913,2050 meets y = 2020 at
  // 758 + 1970·1155⁄2000 = 1895.675 → 1896; its end line 1913,2050 – 2087,1950 meets y = 2020 at 1913 + 30·174⁄100 =
  // 1965.2 → 1965 — N loses the corner 1896,2020 1913,2050 1965,2020
  reach: { N: ['0,2020 1896,2020 1913,2050 1965,2020 4000,2020 4000,4000 0,4000'] },
  reachBefore: { N: ['0,2020 4000,2020 4000,4000 0,4000'] },
  // ... and one that does not: lane:1 (hw 15, square to way:w hw 40) — N's X and key unchanged
  noReach: { N: ['0,2040 4000,2040 4000,4000 0,4000'] },
  noReachBefore: { N: ['0,2040 4000,2040 4000,4000 0,4000'] },
  // (10) A NARROW BAND: way:n (0, 1000) → (4000, 3000), hw 3 (parts: strip 1,997 4001,2997 4000,3000 3999,3003
  // -1,1003 0,1000; caps 1,997 0,1000 -1,1003 -3,999 and 4001,2997 4003,3001 3999,3003 4000,3000). BY HAND, three exact
  // halves: the lower edge meets x = 4000 at y = 997 + 3999⁄2 = 2996.5 → 2997; the start cap's edge -3,999 – 1,997 meets
  // x = 0 at y = 997.5 → 998; the upper edge -1,1003 – 3999,3003 meets x = 0 at y = 1003.5 → 1004; the end cap's edge
  // 4003,3001 – 3999,3003 meets x = 4000 at y = 3002.5 → 3003
  narrow: { below: ['0,0 4000,0 4000,2997 1,997 0,998'], above: ['0,1004 3999,3003 4000,3003 4000,4000 0,4000'] },
};

describe('line 8: literal-ring pins — X on hand-checked fixtures (parts quoted from bufferParts, clip intersections by hand)', () => {
  for (const [name, faces] of Object.entries(LITERAL)) {
    it(`${name}: ${Object.keys(faces).join(', ')}`, () => {
      const fx = FIX[name]();
      for (const [face, want] of Object.entries(faces)) {
        const f = faceAtXY(fx.p, fx.at[face]);
        const ex = exactRegionOfFace(fx.p, f, fx.ws);
        expect(ex.ok, `${name}.${face}`).toBe(true);
        expect(T((ex as { value: { region: Ring[] } }).value.region), `${name}.${face}`).toEqual(want);
        // and the definition oracle passes it (line 6's own pin: it passes line 8's literal rings)
        const v = judge(F1(fx.p, f), endsOf(fx.chains, onFrameXY), R1(want), exemptOf(fx.p, f, fx.ws));
        expect(clean(v), `${name}.${face}: ${JSON.stringify(v)}`).toBe(true);
      }
    });
  }

  it('F1 (round S19): (1) HALF-COORDINATE in all four quadrants — the fixture built on a frame in each quadrant round the origin (every frame is centred on it): every face\'s X the point / axis reflection of the first quadrant\'s, F\'s the reflection of the literal', () => {
    // the first quadrant is FIX.half on [0, 4000]²; the others its mirror (x, y) → (sx·x, sy·y): way:p (0, ±101) →
    // (±3899, ±4000), way:q (±4000, ±100) → (±100, ±4000), hw 100 — their lower / upper edges cross at exactly
    // (±1999.5, ±1958.5), half away (±2000, ±1959). Round S18's pixel read [] on every face of (−, −) and (+, −) and one
    // clockwise ring on (−, +)
    const faces = [[2000, 300], [300, 2000], [3700, 2000], [2000, 3700]] as const;
    const build = (sx: number, sy: number): { p: Plat; ws: SpineWidths } => {
      const m = (pts: readonly (readonly [number, number])[]): [number, number][] => pts.map(([x, y]) => [sx * x + 0, sy * y + 0] as [number, number]);
      const p = emptyArena();
      const fr = insQ(shellQ(p, 0), m([[0, 0], [4000, 0], [4000, 4000], [0, 4000]]), [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true });
      expect(fr.ok).toBe(true);
      wayRec(p, 'way:p', m([[0, 101], [3899, 4000]]));
      wayRec(p, 'way:q', m([[4000, 100], [100, 4000]]));
      setOwnerAll(p);
      return { p, ws: tableWidths({ 'way:p': { halfWidthCm: 100, ends: 'round' }, 'way:q': { halfWidthCm: 100, ends: 'round' } }) };
    };
    const xOf = (q: { p: Plat; ws: SpineWidths }, at: readonly [number, number]): Ring[] => {
      const f = faceAtXY(q.p, at);
      const ex = exactRegionOfFace(q.p, f, q.ws);
      expect(ex.ok).toBe(true);
      const X = (ex as { value: { region: Ring[] } }).value.region;
      // line 3 (b), (c) on the face's own key content
      const c = exactKeyContent(q.p, f, q.ws);
      if (c.ok) expect(regionFaults(c.value.rings, c.value.spines.flatMap((s2) => s2.parts), X)).toEqual([]);
      return X;
    };
    const first = build(1, 1);
    const firstX = faces.map((at) => xOf(first, at));
    expect(T(firstX[0])).toEqual(LITERAL.half.F);
    for (const X of firstX) expect(X.length).toBeGreaterThan(0);
    for (const [sx, sy] of QUADRANTS) {
      const q = build(sx, sy);
      faces.forEach((at, i) => {
        const X = xOf(q, [sx * at[0], sy * at[1]]);
        expect(T(X), `quadrant ${String(sx)},${String(sy)} face at ${String(sx * at[0])},${String(sy * at[1])}`).toEqual(T(reflected(firstX[i], sx, sy)));
      });
      // F: the literal's reflection, by hand — (2000, 1959) → (sx·2000, sy·1959)
      expect(T(xOf(q, [sx * 2000, sy * 300]))).toEqual(T(reflected(R1(LITERAL.half.F), sx, sy)));
      expect(hasVertex(xOf(q, [sx * 2000, sy * 300]), { x: sx * 2000, y: sy * 1959 })).toBe(true);
    }
  });
});

/** Rings from texts. */
const R1 = (rs: readonly string[]): LatticePoint[][] => rs.map(R);

// ---- line 2: X writes nothing, refuses only where its readers refuse, and its degenerate outputs ---------------------

describe('line 2: X is a pure function — writes nothing, builds no Plat, its degenerate outputs the construction’s readings', () => {
  it('the degenerate four and the dangling chain: ok([]), the route rings verbatim, holes kept, a ring way once round', () => {
    // a face wholly within its bands: ok([]), no refusal
    expect(fixtureX('empty', 'sliver')).toEqual([]);
    // a key with no part: its route rings verbatim (the collinear T kept)
    expect(fixtureX('partless', 'left')).toEqual(['0,0 2000,0 2000,2000 2000,4000 0,4000']);
    // holes kept where no band covers them: a widthless ring (a district bound) inside a face a way bounds
    const p = framed();
    wayRec(p, 'way:1', [[0, 2000], [4000, 2000]]);
    commit(p, 1, (o) => insertChain(o, [P(1000, 500), P(2000, 500), P(2000, 1200), P(1000, 1200)], [{ role: 'district_bound', entity: 'district:9' }], 'mandatory', { closed: true }));
    setOwnerAll(p);
    const ws = tableWidths({ 'way:1': { halfWidthCm: 100, ends: 'round' } });
    const f = faceAtXY(p, [3000, 500]);
    const x = exactRegionOfFace(p, f, ws);
    expect(x.ok && T(x.value.region)).toEqual(['0,0 4000,0 4000,1900 0,1900', '1000,500 1000,1200 2000,1200 2000,500']);
    // a ring way buffered once round with no cap (its outer face's hole the band's arcs: the literal of line 8 (4))
    expect(fixtureX('ring', 'outer')).toEqual(LITERAL.ring.outer);
    // a spine-less face holding a dangling chain of two edges: F's walk out and back, judged by ringCrosses with F's bridges
    const d = FIX.dangling();
    const g = faceAtXY(d.p, d.at.F);
    const xd = exactRegionOfFace(d.p, g, d.ws);
    expect(xd.ok).toBe(true);
    const X = (xd as { value: { region: Ring[] } }).value.region;
    expect(T(X)).toEqual(LITERAL.dangling.F);
    expect(X.every((r) => simpleRing(r))).toBe(false);
    const rf = readFace(d.p, g, d.ws);
    for (const r of X) expect(ringCrosses(r, bridgesOf(d.p, rf.edges))).toBe(false);
    expect(regionFaults(rf.rings, [], X, exemptOf(d.p, g, d.ws))).toEqual([]);
  });

  it('X writes nothing: the arena bit for bit, its state, the batch, and no createPlat, buildOverlay, insertChain or opSave (dryrun.test.ts\'s form)', () => {
    for (const [name, make] of Object.entries(FIX)) {
      const fx = make();
      for (const face of Object.keys(fx.at)) {
        const f = faceAtXY(fx.p, fx.at[face]);
        commit(fx.p, 1, (o) => {
          const b0 = bits(fx.p);
          const s0 = state(fx.p);
          const w0 = JSON.stringify({ work: o.work.total, warnings: o.warnings, journal: o.journal });
          const n0 = [rec.createPlat, rec.buildOverlay, rec.insertChain, rec.opSave];
          exactRegionOfFace(fx.p, f, fx.ws);
          exactKey(fx.p, f, fx.ws, false);
          expect([rec.createPlat, rec.buildOverlay, rec.insertChain, rec.opSave], `${name}.${face}`).toEqual(n0);
          expect(bits(fx.p) === b0 && state(fx.p) === s0 && JSON.stringify({ work: o.work.total, warnings: o.warnings, journal: o.journal }) === w0, `${name}.${face}`).toBe(true);
          return ok(null);
        });
      }
    }
  });

  it('vertexContacts false ≡ X over the edge spines alone', () => {
    const fx = FIX.reach();
    const f = faceAtXY(fx.p, fx.at.N);
    const off = exactRegionOfFace(fx.p, f, fx.ws, false);
    const on = exactRegionOfFace(fx.p, f, fx.ws, true);
    const rf = readFace(fx.p, f, fx.ws);
    const edge = kerbParts(rf.rings, rf.spines, true);
    expect(off.ok && on.ok && edge.ok).toBe(true);
    if (!off.ok || !on.ok || !edge.ok) return;
    expect(T(off.value.region)).toEqual(T(exactRegion(rf.rings, edge.value)));
    expect(T(off.value.region)).toEqual(LITERAL.reachBefore.N);
    expect(T(on.value.region)).toEqual(LITERAL.reach.N);
    expect(off.value.key).not.toBe(on.value.key);
  });
});

/** A fixture face's X as ring texts. */
function fixtureX(name: string, face: string): string[] {
  const fx = FIX[name]();
  const ex = exactRegionOfFace(fx.p, faceAtXY(fx.p, fx.at[face]), fx.ws);
  if (!ex.ok) return [`refused ${ex.code} ${ex.detail}`];
  return T(ex.value.region);
}

/** A fixture face's key content. */
function contentOf(fx: Fixture, face: string): ReturnType<typeof exactKeyContent> & { ok: true } {
  const c = exactKeyContent(fx.p, faceAtXY(fx.p, fx.at[face]), fx.ws);
  if (!c.ok) throw new Error(`test: the key refused ${c.code}`);
  return c;
}

// ---- lines 4 and 5: the content key -------------------------------------------------------------------------------------

describe('line 4: the content key — X is a function of it (k1), the neighbour’s T named both ways', () => {
  it('(k1) and THE DIFFERENTIAL PIN on every line-8 literal: X equals exactRegion over the key content’s rings and parts, byte for byte', () => {
    for (const [name, make] of Object.entries(FIX)) {
      const fx = make();
      for (const face of Object.keys(fx.at)) {
        const f = faceAtXY(fx.p, fx.at[face]);
        const ex = exactRegionOfFace(fx.p, f, fx.ws);
        const c = exactKeyContent(fx.p, f, fx.ws);
        expect(ex.ok && c.ok, `${name}.${face}`).toBe(true);
        if (!ex.ok || !c.ok) continue;
        expect(T(exactRegionOfKey(c.value)), `${name}.${face}`).toEqual(T(ex.value.region));
        expect(ex.value.key).toBe(c.value.text);
        expect(exactKey(fx.p, f, fx.ws)).toBe(c.value.text);
      }
    }
  });

  it('the neighbour’s T, square onto a wide spine: X(N) unchanged and the key unchanged (the lane does not reach)', () => {
    const before = FIX.noReachBefore();
    const after = FIX.noReach();
    const kb = contentOf(before, 'N');
    const ka = contentOf(after, 'N');
    expect(ka.value.reaching).toEqual([]);
    expect(ka.value.text).toBe(kb.value.text);
    expect(fixtureX('noReach', 'N')).toEqual(fixtureX('noReachBefore', 'N'));
    // the T vertex (2000, 2000) is on N's route ring, and the ring rule leaves it out (way:w's strip holds it)
    expect(readFace(after.p, faceAtXY(after.p, after.at.N), after.ws).rings[0].some((q) => q.x === 2000 && q.y === 2000)).toBe(true);
    expect(T(ka.value.rings)).toEqual(['0,2000 4000,2000 4000,4000 0,4000']);
  });

  it('the neighbour’s T, oblique and reaching N: both the key and X(N) changed', () => {
    const kb = contentOf(FIX.reachBefore(), 'N');
    const ka = contentOf(FIX.reach(), 'N');
    expect(ka.value.reaching).toEqual(['way:lane:1']);
    expect(ka.value.text).not.toBe(kb.value.text);
    expect(fixtureX('reach', 'N')).not.toEqual(fixtureX('reachBefore', 'N'));
  });
});

describe('line 5: the key covers every input of X (k2) and is free of the representation (k3)', () => {
  it('(k2) a vertex-only spine arriving WITH reach changes the key (and X); one arriving without does not', () => {
    expect(contentOf(FIX.reach(), 'N').value.text).not.toBe(contentOf(FIX.reachBefore(), 'N').value.text);
    expect(contentOf(FIX.noReach(), 'N').value.text).toBe(contentOf(FIX.noReachBefore(), 'N').value.text);
  });

  it('(k2) a junction flag flipping an end flat → capped (a second lane of the same role ending at the T) changes the key and X', () => {
    const a = contentOf(FIX.oblique(), 'right');
    const b = contentOf(FIX.flip(), 'right');
    expect(b.value.text).not.toBe(a.value.text);
    // lane:1's parts gain its end cap at the T
    const parts = (c: typeof a, k: string): string[] => T(c.value.spines.find((s2) => s2.key === k)?.parts ?? []);
    expect(parts(b, 'way:lane:1').length).toBe(parts(a, 'way:lane:1').length + 1);
    expect(fixtureX('flip', 'right')).not.toEqual(fixtureX('oblique', 'right'));
  });

  it('(k2) the junction flag ALONE (round S19, F2; kills KM2 in its key-text form): a WIDTHLESS second lane of the same role ending at the T — no spine arrives, lane:1\'s end turns capped, and the key\'s text and X both change', () => {
    // line 8 (2)'s oblique T, then lane:2 (3155, 4000) → (2000, 2000) of the same role with NO width: junctionEnd
    // counts the role, not the width, so lane:1's end at the T turns capped, while lane:2 itself is no spine (null
    // widths) — the one input of X that changes is lane:1's junction flag
    const a = FIX.oblique();
    const b = FIX.oblique();
    laneRec(b.p, [2000, 3000], 'lane:2', [[3155, 4000], [2000, 2000]]);
    const ws = tableWidths({ 'lane:1': { halfWidthCm: 100, ends: 'round' } });
    const fa = faceAtXY(a.p, [3000, 1000]);
    const fb = faceAtXY(b.p, [3000, 1000]);
    const ca = exactKeyContent(a.p, fa, ws);
    const cb = exactKeyContent(b.p, fb, ws);
    expect(ca.ok && cb.ok).toBe(true);
    if (!ca.ok || !cb.ok) return;
    // the same spines, nothing reaching: only lane:1's parts differ (its end cap 2087,1950 2099,1987 … 2000,2000 added)
    expect(cb.value.reaching).toEqual([]);
    expect(cb.value.spines.map((s2) => s2.key)).toEqual(ca.value.spines.map((s2) => s2.key));
    expect(T(cb.value.rings)).toEqual(T(ca.value.rings));
    const lane1 = (c: typeof ca): readonly Ring[] => c.value.spines.find((s2) => s2.key === 'way:lane:1')?.parts ?? [];
    expect(lane1(cb).length).toBe(lane1(ca).length + 1);
    // the key's TEXT changes (KM2t — the text printed with every end capped, content and X true — leaves it equal) …
    expect(exactKey(b.p, fb, ws)).not.toBe(exactKey(a.p, fa, ws));
    // … and X with it. lane:1's end cap (bufferParts, quoted): 2087,1950 2099,1987 2097,2026 2079,2061 2050,2087 2013,2099
    // 1974,2097 1939,2079 1913,2050 2000,2000. BY HAND: the right child lies below the zero-width way:z (y = 2000); the
    // cap's edge 2099,1987 – 2097,2026 meets y = 2000 at x = 2099 − 2·13⁄39 = 2098.33 → 2098, so the corner 2000,2000 of
    // the flat end gives way to 2098,2000 2099,1987
    const xa = exactRegionOfFace(a.p, fa, ws);
    const xb = exactRegionOfFace(b.p, fb, ws);
    expect(xa.ok && xb.ok).toBe(true);
    if (xa.ok && xb.ok) {
      expect(T(xa.value.region)).toEqual(LITERAL.oblique.right);
      expect(T(xb.value.region)).toEqual(['961,0 4000,0 4000,2000 2098,2000 2099,1987 2087,1950']);
      expect(xb.value.key).not.toBe(xa.value.key);
    }
  });

  it('the ring rule\'s part condition (round S19, F3; kills KM5 in its coveredBy-only form): a T on a zero-width chain, off its line, on a face whose key holds a part that does not hold the dropped polygon — the key\'s ring keeps the T vertex and X has it', () => {
    // line 5's zero-width fixture (way:z (0, 1000) → (4000, 2001) widthless; a widthless lane's T at (2000, 1500), 0.5 cm
    // off way:z's line, which passes x = 2000 at y = 1500.5) with way:w (0, 3000) → (4000, 3000), hw 50, bounding the
    // face above: the face's key holds way:w's parts, none of which holds the sliver (0,1000) (2000,1500) (4000,2001)
    const p = framed();
    wayRec(p, 'way:z', [[0, 1000], [4000, 2001]]);
    wayRec(p, 'way:w', [[0, 3000], [4000, 3000]]);
    setOwnerAll(p);
    laneRec(p, [2000, 300], 'lane:1', [[2000, 0], [2000, 1500]]);
    const ws = tableWidths({ 'way:w': { halfWidthCm: 50, ends: 'round' } });
    const f = faceAtXY(p, [2000, 2300]);
    const rf = readFace(p, f, ws);
    expect(T(rf.rings)).toEqual(['0,1000 2000,1500 4000,2001 4000,3000 0,3000']);
    // the precondition: the T vertex is straight-through on its ring (within HOT_PIXEL_CM of the line between its kept
    // neighbours), so only the part condition keeps it
    expect(segDist({ x: 2000, y: 1500 }, { x: 0, y: 1000 }, { x: 4000, y: 2001 })).toBeLessThan(HOT_PIXEL_CM);
    const c = exactKeyContent(p, f, ws);
    expect(c.ok).toBe(true);
    if (!c.ok) return;
    expect(c.value.spines.map((s2) => s2.key)).toEqual(['way:way:w']);
    expect(T(c.value.rings)).toEqual(['0,1000 2000,1500 4000,2001 4000,3000 0,3000']);
    const ex = exactRegionOfFace(p, f, ws);
    expect(ex.ok).toBe(true);
    if (ex.ok) expect(T(ex.value.region)).toEqual(['0,1000 2000,1500 4000,2001 4000,2950 0,2950']);
  });

  /** A face bounded by way:v (hw 100), straight to (3800, 2000), then bent at (3900, 2000 + d) beyond F's corner (x = 3700, way:c). */
  function bend(d: number, hw = 100, corner = 3000): { p: Plat; ws: SpineWidths; f: FaceId } {
    const p = framed();
    wayRec(p, 'way:v', [[0, 2000], [3800, 2000], [3900, 2000 + d], [4000, 2000]]);
    wayRec(p, 'way:c', [[3700, 0], [3700, 4000]]);
    wayRec(p, 'way:e', [[0, corner], [3700, corner]]);
    setOwnerAll(p);
    const ws = tableWidths({ 'way:v': { halfWidthCm: hw, ends: 'round' }, 'way:c': { halfWidthCm: 30, ends: 'round' } });
    return { p, ws, f: faceAtXY(p, [1000, 1000]) };
  }

  it('(k2) a route vertex of a spine within reach of F moved (beyond F\'s corners) changes the key', () => {
    const a = bend(40);
    const b = bend(60);
    // F's own ring is the same on both arenas: the bend lies beyond F's corner at x = 3700
    expect(T(readFace(a.p, a.f, a.ws).rings)).toEqual(T(readFace(b.p, b.f, b.ws).rings));
    expect(exactKey(a.p, a.f, a.ws)).not.toBe(exactKey(b.p, b.f, b.ws));
  });

  it('(k2) a half-width sample changed (the widths answer for one spine) changes the key and X', () => {
    const a = bend(40, 100);
    const b = bend(40, 101);
    expect(exactKey(a.p, a.f, a.ws)).not.toBe(exactKey(b.p, b.f, b.ws));
    const xa = exactRegionOfFace(a.p, a.f, a.ws);
    const xb = exactRegionOfFace(b.p, b.f, b.ws);
    expect(xa.ok && xb.ok && JSON.stringify(T(xa.value.region)) !== JSON.stringify(T(xb.value.region))).toBe(true);
  });

  it('(k2) a turning ring vertex of F moved changes the key and X', () => {
    const p = framed();
    wayRec(p, 'way:a', [[0, 2000], [4000, 2100]]);
    setOwnerAll(p);
    const q = framed();
    wayRec(q, 'way:a', [[0, 2000], [4000, 2140]]);
    setOwnerAll(q);
    const ws = tableWidths({ 'way:a': { halfWidthCm: 50, ends: 'round' } });
    const fp = faceAtXY(p, [2000, 3500]);
    const fq = faceAtXY(q, [2000, 3500]);
    expect(exactKey(p, fp, ws)).not.toBe(exactKey(q, fq, ws));
    const xp = exactRegionOfFace(p, fp, ws);
    const xq = exactRegionOfFace(q, fq, ws);
    expect(xp.ok && xq.ok && JSON.stringify(T(xp.value.region)) !== JSON.stringify(T(xq.value.region))).toBe(true);
  });

  it('(k2) THE ZERO-WIDTH CHAIN (kills KM5): a T on an L1 chain whose widths answer is null, its vertex off the lattice line — the key keeps it and X changes with it', () => {
    const make = (withLane: boolean): { p: Plat; f: FaceId; ws: SpineWidths } => {
      const p = framed();
      wayRec(p, 'way:z', [[0, 1000], [4000, 2001]]);
      setOwnerAll(p);
      if (withLane) laneRec(p, [2000, 300], 'lane:1', [[2000, 0], [2000, 1500]]);
      return { p, f: faceAtXY(p, [2000, 3500]), ws: tableWidths({}) };
    };
    const a = make(false);
    const b = make(true);
    const cb = exactKeyContent(b.p, b.f, b.ws);
    expect(cb.ok).toBe(true);
    if (!cb.ok) return;
    // the T vertex: on N's route ring, off way:z's line (its line at x = 2000 is y = 1500.5)
    const tv = readFace(b.p, b.f, b.ws).rings[0].find((q) => q.x === 2000);
    expect(tv).toBeDefined();
    expect(cb.value.rings[0].some((q) => q.x === 2000)).toBe(true);
    expect(exactKey(b.p, b.f, b.ws)).not.toBe(exactKey(a.p, a.f, a.ws));
    const xa = exactRegionOfFace(a.p, a.f, a.ws);
    const xb = exactRegionOfFace(b.p, b.f, b.ws);
    expect(xa.ok && xb.ok).toBe(true);
    if (xa.ok && xb.ok) {
      expect(T(xb.value.region)).not.toEqual(T(xa.value.region));
      expect(xb.value.region[0].some((q) => q.x === 2000)).toBe(true);
    }
  });

  it('(k2) THE NARROW BAND (kills KM8): a T vertex the ring rule drops, held by a part whose edge passes within L∞ 0.5 cm of it — X is computed from the key\'s rings, not F\'s', () => {
    const fx = FIX.kink();
    const f = faceAtXY(fx.p, fx.at.N);
    const rf = readFace(fx.p, f, fx.ws);
    const c = contentOf(fx, 'N');
    const v = rf.rings[0].find((q) => !c.value.rings[0].some((k) => k.x === q.x && k.y === q.y));
    expect(v).toBeDefined();
    if (v === undefined) return;
    // the precondition: an edge of a keyed part passes within L∞ 0.5 cm of v (v's hot pixel would reroute it)
    // the L∞ distance from q to the segment a–b, exactly: max(|ex(t)|, |ey(t)|) is convex in t, its least at an end, where
    // one term is 0, or where the two terms are equal in size
    const linf = (q: XY, a: XY, b: XY): number => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const ts = [0, 1];
      if (dx !== 0) ts.push((q.x - a.x) / dx);
      if (dy !== 0) ts.push((q.y - a.y) / dy);
      if (dx - dy !== 0) ts.push((q.x - a.x - (q.y - a.y)) / (dx - dy));
      if (dx + dy !== 0) ts.push((q.x - a.x + (q.y - a.y)) / (dx + dy));
      let best = Infinity;
      for (const t of ts) if (t >= 0 && t <= 1) best = Math.min(best, Math.max(Math.abs(a.x + t * dx - q.x), Math.abs(a.y + t * dy - q.y)));
      return best;
    };
    const parts = c.value.spines.flatMap((s2) => s2.parts);
    const near = parts.some((pt) => pt.some((a, i) => linf(v, a, pt[(i + 1) % pt.length]) <= 0.5));
    expect(near).toBe(true);
    const ex = exactRegionOfFace(fx.p, f, fx.ws);
    expect(ex.ok).toBe(true);
    if (!ex.ok) return;
    expect(T(ex.value.region)).toEqual(T(exactRegionOfKey(c.value)));
    // F's own rings would make v a hot pixel and move X: the differential the key's rings avoid
    expect(T(exactRegion(rf.rings, parts))).not.toEqual(T(ex.value.region));
    expect(T(ex.value.region)).toEqual(['0,1001 4000,3334 4000,4000 0,4000']);
  });

  /** representation.test.ts's fixture: the frame [0, 6000]², way:b, way:a, way:c ending in a T on way:a, two district rings as holes. */
  function repr(): Plat {
    const p = framed(6000);
    wayRec(p, 'way:b', [[3000, 0], [3000, 6000]]);
    wayRec(p, 'way:a', [[0, 3000], [6000, 3000]]);
    wayRec(p, 'way:c', [[1500, 3000], [1500, 6000]]);
    for (const [entity, x0] of [['district:7', 500], ['district:8', 1600]] as const) {
      commit(p, 1, (o) => insertChain(o, [P(x0, 500), P(x0 + 700, 500), P(x0 + 700, 1200), P(x0, 1200)], [{ role: 'district_bound', entity }], 'mandatory', { closed: true }));
    }
    own(p, 'district:1', REPR_AT);
    return p;
  }
  const REPR_AT: readonly (readonly [number, number])[] = [[2600, 2000], [4500, 1500], [700, 4500], [4500, 4500]];
  const REPR_WS = tableWidths({ 'way:a': { halfWidthCm: 300, ends: 'round' }, 'way:b': { halfWidthCm: 250, ends: 'round' }, 'way:c': { halfWidthCm: 200, ends: 'round' } });
  const readsOf = (p: Plat): string[] => REPR_AT.map(([x, y]) => {
    const f = faceAtXY(p, [x, y]);
    const ex = exactRegionOfFace(p, f, REPR_WS);
    return ex.ok ? `${ex.value.key}\n${JSON.stringify(T(ex.value.region))}` : `refused ${ex.code}`;
  });

  it('(k3) representation-free: equal keys and X with the stored starts re-drawn, after compactSlots and on a decodeArena(encodeArena(·)) copy', () => {
    const base = readsOf(repr());
    const s2 = repr();
    for (const [x, y] of REPR_AT) {
      const f = faceAtXY(s2, [x, y]);
      const route = (ring: readonly number[]): number[] => ring.filter((h) => s2.halfEdges.level[h >> 1] <= 1);
      const [outer, ...holes] = faceWalkOf(s2, 1, f);
      const ro = route(outer);
      s2.faces[1].outer[f] = ro[2 % ro.length];
      if (holes.length > 0) setFaceHolesOf(s2, 1, f, holes.map((r) => route(r)[1 % route(r).length]).reverse());
    }
    expect(readsOf(s2)).toEqual(base);
    expect(readsOf(compactSlots(repr()))).toEqual(base);
    const p = repr();
    const d = decodeArena(encodeArena(p), p.key, { index: { gridCellCm: (p.index?.levels.map((l) => l.dynamic.cellCm) ?? []) as [number, number, number, number, number] } });
    expect(d.ok).toBe(true);
    if (d.ok) expect(readsOf(d.value)).toEqual(base);
  });

  it('(k3) before and after an L2 commit (corridorUnion) on the face: L2 content lies outside the key', () => {
    const p = repr();
    const base = readsOf(p);
    const faces = REPR_AT.map(([x, y]) => faceAtXY(p, [x, y]));
    commit(p, 2, (o) => corridorUnion(o, faces, REPR_WS), AT_S9);
    expect(readsOf(p)).toEqual(base);
  });
});

// ---- line 6: the definition oracle's own pins ---------------------------------------------------------------------------

describe('line 6: the definition oracle — it passes the literal rings and fails a planted X by name', () => {
  /** A crossing fixture: way:1 (hw 120) along y = 2000, way:2 (hw 80) along x = 2000; the lower-left face. */
  function cross(): Fixture {
    const p = framed();
    const a = wayRec(p, 'way:1', [[0, 2000], [4000, 2000]]);
    const b = wayRec(p, 'way:2', [[2000, 0], [2000, 4000]]);
    setOwnerAll(p);
    return { p, ws: tableWidths({ 'way:1': { halfWidthCm: 120, ends: 'round' }, 'way:2': { halfWidthCm: 80, ends: 'round' } }), at: { F: [1000, 1000] }, chains: [{ key: 'way:way:1', role: 'way', points: a, closed: false, hw: 120, ends: 'round' }, { key: 'way:way:2', role: 'way', points: b, closed: false, hw: 80, ends: 'round' }] };
  }

  it('the margin\'s sums: 3.41 cm at an arc, 2.84 cm on a straight strip, both within the 4 cm margin', () => {
    expect(MARGIN_ARC_CM).toBeCloseTo(3.414, 2);
    expect(MARGIN_STRAIGHT_CM).toBeCloseTo(2.834, 2);
    expect(Math.max(MARGIN_ARC_CM, MARGIN_STRAIGHT_CM)).toBeLessThan(MARGIN_CM);
  });

  it('X of the crossing face passes; one spine left out, a band at half its width, X shifted 10 cm each fail', () => {
    const fx = cross();
    const f = faceAtXY(fx.p, fx.at.F);
    const Fr = F1(fx.p, f);
    const truth = endsOf(fx.chains, onFrameXY);
    const ex = exactRegionOfFace(fx.p, f, fx.ws);
    expect(ex.ok).toBe(true);
    if (!ex.ok) return;
    expect(T(ex.value.region)).toEqual(['0,0 1920,0 1920,1880 0,1880']);
    expect(clean(judge(Fr, truth, ex.value.region))).toBe(true);
    // one spine left out (OM1's planted form)
    const rf = readFace(fx.p, f, fx.ws);
    const only1 = kerbParts(rf.rings, new Map([...rf.spines].filter(([k]) => k === 'way:way:1')), true);
    expect(only1.ok).toBe(true);
    if (only1.ok) expect(clean(judge(Fr, truth, exactRegion(rf.rings, only1.value)))).toBe(false);
    // a band at half its width (OM2's)
    const half = tableWidths({ 'way:1': { halfWidthCm: 60, ends: 'round' }, 'way:2': { halfWidthCm: 80, ends: 'round' } });
    const xh = exactRegionOfFace(fx.p, f, half);
    expect(xh.ok && !clean(judge(Fr, truth, xh.value.region))).toBe(true);
    // shifted 10 cm
    const shifted = ex.value.region.map((r) => r.map((q) => P(q.x + 10, q.y + 10)));
    expect(clean(judge(Fr, truth, shifted))).toBe(false);
  });
});

// ---- line 7: the relation's own pins --------------------------------------------------------------------------------------

describe('line 7: the construction relation — its classes, its locus over whole outlines, its near bound', () => {
  const square = (x0: number, y0: number, x1: number, y1: number): LatticePoint[] => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];

  it('NEAR_CM is 2 · HOT_PIXEL_CM + √2⁄2 rounded up to the centimetre\'s hundredth', () => {
    expect(2 * HOT_PIXEL_CM + Math.SQRT2 / 2).toBeCloseTo(2.127, 3);
    expect(NEAR_CM).toBe(2.13);
  });

  it('the classes: EQUAL, NEAR within 2.13 cm (an off-lattice T’s 1.5 cm is NEAR, FM5), MOVED over whole outlines of a moved part (FM3), BEYOND', () => {
    const noMove: Served = { by: 'first', noMove: true, movedParts: [] };
    const base = [square(0, 0, 1000, 1000)];
    expect(relate(base, base, noMove).cls).toBe('EQUAL');
    // 1.5 cm: within the near bound (NEAR at 1 cm — FM5 — would class it BEYOND)
    expect(relate([R('0,0 1000,0 1000,1000 0,1000')], [R('0,0 1000,0 1000,1001 2,1002 0,1000')], noMove).cls).toBe('NEAR');
    // the far-move pair: the top edge 10 cm off along the whole outline of a moved strip whose MOVED POINT is at its
    // left end only — every difference lies within DRY_MOVE_CM of the part's outline, far beyond it from the point
    const moved: Served = { by: 'first', noMove: false, movedParts: [square(-5, 990, 1005, 1012)] };
    expect(relate([square(0, 0, 1000, 1010)], base, moved).cls).toBe('MOVED');
    // an acute tip (the PR-size run's root face, a 15° corner): the construction's corner 2.24 cm beyond X_U's along the
    // bisector, every other point within 0.7 cm — NEAR by the tip bound (h ⁄ sin(θ⁄2) + h + √2⁄2 ≈ 7.4 cm there)
    expect(relate([R('0,1404 2905,3315 34,2378 0,2372')], [R('0,1404 2903,3314 34,2378 0,2372')], noMove)).toEqual({ cls: 'NEAR', h: expect.closeTo(2.24, 1), tip: true });
    // … and 3 cm along a straight edge, beyond every corner's bound (2.42 cm at a right angle), is BEYOND
    expect(relate([square(0, 0, 1000, 1003)], base, noMove).cls).toBe('BEYOND');
    // the same difference with no part moved there is BEYOND; and a no-move read is never MOVED (FM1)
    expect(relate([square(0, 0, 1000, 1010)], base, { by: 'first', noMove: false, movedParts: [square(-5, -5, 20, 20)] }).cls).toBe('BEYOND');
    expect(relate([square(0, 0, 1000, 1010)], base, noMove).cls).toBe('BEYOND');
  });

  it('a collapsing / attracted fixture is MOVED, never no-move (FM1, FM2): the oblique T\'s left child and the ring way\'s outer face', () => {
    for (const [name, face] of [['oblique', 'left'], ['ring', 'outer']] as const) {
      const fx = FIX[name]();
      const f = faceAtXY(fx.p, fx.at[face]);
      commit(fx.p, 1, (o) => {
        rec.calls = [];
        rec.on = true;
        const s0 = rec.opSave;
        const k = readKerb(o, f, fx.ws);
        rec.on = false;
        expect(k.ok).toBe(true);
        const sv = servedOf(rec.calls, rec.opSave - s0, kerbCensus(fx.p)?.faithful ?? 'none');
        expect(sv.noMove, `${name}.${face}`).toBe(false);
        // a call placed points off what it was given
        expect(rec.calls.some((c) => c.placed !== null && c.placed.some((q, i) => q.x !== c.given[i].x || q.y !== c.given[i].y)), `${name}.${face}`).toBe(true);
        if (k.ok) {
          const rf = readFace(fx.p, f, fx.ws);
          const pu = kerbParts(rf.rings, k.value.spines, sv.by === 'faithful');
          if (pu.ok) expect(['NEAR', 'MOVED', 'EQUAL']).toContain(relate(k.value.region, exactRegion(rf.rings, pu.value), sv).cls);
        }
        return ok(null);
      });
    }
  });

  it('X_U (the unreduced runs a first read lays) and X differ by the straight-through figure, reported apart — a first read is judged against X_U, never X (FM4 is red on the straight-through pin below)', () => {
    const fx = FIX.half();
    const f = faceAtXY(fx.p, fx.at.F);
    const rf = readFace(fx.p, f, fx.ws);
    const pu = kerbParts(rf.rings, rf.spines, false);
    const pf = kerbParts(rf.rings, rf.spines, true);
    expect(pu.ok && pf.ok).toBe(true);
    if (!pu.ok || !pf.ok) return;
    // X_U (the unreduced runs: the crossing vertex (1999, 2100) a join of each way) and X differ: the straight-through figure
    const XU = exactRegion(rf.rings, pu.value);
    const X = exactRegion(rf.rings, pf.value);
    expect(T(X)).toEqual(LITERAL.half.F);
    expect(hausdorff(XU, X).h).toBeLessThanOrEqual(NEAR_CM);
  });

  it('THE STRAIGHT-THROUGH PIN (round S19, F4; kills FM4): two no-move FIRST reads that stand on X_U, while X ≠ X_U by 3 cm and 300 cm — judged against X_U they pass, against X they would fail', () => {
    // a zero-width chain way:z on y = 2000; lane:1 (1980, 0) → (2000, 2000), hw 300 round, ending on it; a WIDTHLESS
    // lane:2 (4000, 1950) → (2000, 1950) whose T on lane:1 stands 0.5 cm off lane:1's line, 50 cm from its junction end.
    // X (the reduced run: the T vertex dropped) keeps lane:1's end square to the lane through (2000, 2000); the first read
    // lays the UNREDUCED runs (the kink at the T turns the end's line), which is X_U
    const p = framed();
    const z = wayRec(p, 'way:z', [[0, 2000], [4000, 2000]]);
    setOwnerAll(p);
    const l1 = laneRec(p, [3000, 1000], 'lane:1', [[1980, 0], [2000, 2000]]);
    const l2 = laneRec(p, [3000, 1000], 'lane:2', [[4000, 1950], [2000, 1950]]);
    const V = l2[l2.length - 1];
    const E = l1[l1.length - 1];
    expect(segDist(V, l1[0], E)).toBeLessThan(HOT_PIXEL_CM);
    const chains: Net['chains'] = [
      { key: 'way:way:z', role: 'way', points: z, route: [z[0], E, z[1]], closed: false, hw: null, ends: 'round' },
      { key: 'way:lane:1', role: 'way', points: l1, route: [l1[0], V, l1[1]], closed: false, hw: 300, ends: 'round' },
      { key: 'way:lane:2', role: 'way', points: l2, closed: false, hw: null, ends: 'round' },
    ];
    const n: Net = { p, faces: liveL1(p), table: { 'lane:1': { halfWidthCm: 300, ends: 'round' } }, chains };
    const fig = newFigures();
    const want: Record<string, { at: readonly [number, number]; x: string[]; h: number }> = {
      N: { at: [2000, 3000], x: ['0,2000 1700,2000 1700,2003 2000,2000 4000,2000 4000,4000 0,4000'], h: 3 },
      Rup: { at: [3000, 1975], x: ['2300,1950 4000,1950 4000,2000 2000,2000 2300,1997'], h: 300 },
    };
    for (const [name, w] of Object.entries(want)) {
      const r = readAll(n, faceAtXY(p, w.at), name, fig);
      expect(r.x === null ? null : T(r.x), name).toEqual(w.x);
      // the oracle finds X right
      expect(r.verdict !== null && clean(r.verdict), name).toBe(true);
      // a first read, served with no move, standing on X_U (EQUAL or NEAR) …
      expect(r.served, name).toMatchObject({ by: 'first', noMove: true });
      expect(['EQUAL', 'NEAR'], name).toContain(r.rel?.cls);
      // … while X and X_U differ (the straight-through figure)
      expect(r.straight?.equal, name).toBe(false);
      expect(r.straight?.h ?? 0, name).toBeCloseTo(w.h, 1);
    }
    // judged against X_U the two reads pass; FM4 (judged against X) fails both — 'neither found wrong by the oracle'
    expect(fig.failures).toEqual([]);
  });
});

// A replay of one network of the corpus (PLAT_DERIVED_REPLAY: the input a failure line prints): its reads' details.
const REPLAY = process.env.PLAT_DERIVED_REPLAY;
if (REPLAY !== undefined && REPLAY !== '') {
  it('replays one network of line 9 (PLAT_DERIVED_REPLAY)', { timeout: HARD }, () => {
    const inp = JSON.parse(REPLAY) as { chords?: CorpusChord[]; ways?: WideWay[]; lanes: LaneDraw[]; roots: [number, number] };
    const fig = newFigures();
    const n = inp.chords !== undefined ? chordNet(inp.chords) : wayNet(inp.ways as WideWay[]);
    DETAIL.on = true;
    runNetwork(n, inp.lanes, inp.roots, inp.ways !== undefined, fig, 'replay');
    DETAIL.on = false;
    console.info(report('replay', fig));
    for (const f of fig.failures) console.info(`FAILURE ${f}`);
  });
}

describe('line 9: derived.test.ts — the exact kerb on the test’s own S8-style cuts, judged by the definition oracle, the construction relation and the key', () => {
  const chordArb: fc.Arbitrary<CorpusChord> = fc.record({
    a: fc.integer({ min: 0, max: 15_999 }),
    b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
    hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
    knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
    ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    widthless: fc.integer({ min: 0, max: 3 }).map((x) => x === 0),
  });

  it(`straight lanes on B-FUZZ's chord networks (one chord in four widthless): ${String(NETS)} networks`, { timeout: HARD }, () => {
    const fig = newFigures();
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), fc.array(laneArb(false), { minLength: 36, maxLength: 36 }), fc.tuple(fc.nat(100), fc.nat(100)), (chords, lanes, roots) => {
        runNetwork(chordNet(chords), lanes, roots, false, fig, { chords, lanes, roots });
      }),
      { numRuns: NETS },
    );
    console.info(report('straight', fig));
    bars(fig);
  });

  it(`bent lanes and slits on the widened family's networks (ring ways: faces with holes): ${String(NETS)} networks`, { timeout: HARD }, () => {
    const wayArb: fc.Arbitrary<WideWay> = fc.record({
      kind: fc.constantFrom<'bent' | 'dead' | 'ring'>('bent', 'dead', 'ring'),
      a: fc.integer({ min: 0, max: 15_999 }),
      b: fc.integer({ min: 0, max: 15_999 }),
      x: fc.integer({ min: 400, max: 3600 }),
      y: fc.integer({ min: 400, max: 3600 }),
      w: fc.integer({ min: 300, max: 1600 }),
      h: fc.integer({ min: 300, max: 1600 }),
      hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 300 })),
      knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 300 }), fc.integer({ min: 5, max: 300 })), { freq: 3 }),
      ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    }).map((c) => (c.kind === 'ring' ? { ...c, x: Math.min(c.x, 3700 - c.w), y: Math.min(c.y, 3700 - c.h) } : c));
    const fig = newFigures();
    fc.assert(
      fc.property(fc.array(wayArb, { minLength: 1, maxLength: 3 }), fc.array(laneArb(true), { minLength: 36, maxLength: 36 }), fc.tuple(fc.nat(100), fc.nat(100)), (ways, lanes, roots) => {
        runNetwork(wayNet(ways), lanes, roots, true, fig, { ways, lanes, roots });
      }),
      { numRuns: NETS },
    );
    console.info(report('bent+slits', fig));
    bars(fig);
  });
});

