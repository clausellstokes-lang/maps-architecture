// The rung fixtures (M0-x-05; §13.1 *Ladder coverage*; C-0085, C-0269): one per rung of `STAGE_LADDERS` M0 builds, each
// forcing its rung on the real stage — through the base chain (`runChain`: M0-x-04's registrations, the runner, a
// stage's own Stage object with the forcing option where the rung is entered by one) or through the stage's own entry
// (S8's Stage object on a hand-built district; S3's and S5a's registered EnceinteStrategy on a hand boundary; the kernel
// façade for the kernel's typed E_WORK_LIMIT) — and the plain controls: the same entries with nothing forced. Each
// returns what its run left, read by the stage's reader (readers.ts) under the registry's leaf keys.
import fc from 'fast-check';
import { createKernel, createPlat, err, STAGES, attachIndex, type Cm, type Frame, type Kernel, type KernelTx, type PolygonCm } from '@plat/kernel';
import { baseEnceinte, capacityCheck, commitOuterRing, flatFixture, s3Slice, s8Stage, siteContext, type CostField, type GatePick, type GateSite, type S8Input, type S8Output, type SliceOptions } from '@plat/layout';
import { arb, seedFamily } from '../fuzz/index.js';
import { runChain, type ChainSpec } from './chain.js';
import { readModel, readS8, readTrace, sumLeaves, bump, type Tally } from './readers.js';
import { districtOf, eastward, GROUND, heightStrategy, lowFloor, P, smallFlat, smallRiver, valley, valleyWithRidge, valleyWithSink, waysCase, type S8Case } from './support.js';
import type { Leaves } from './types.js';

/** A fixture: its id, what it forces, and its run. */
export interface LadderFixture {
  readonly id: string;
  /** How the fixture forces its rung (the report's description). */
  readonly forces: string;
  readonly run: () => Leaves;
}

// ---- S8 (F-CUT; F-WORK's cut counters) ---------------------------------------------------------------------------------

/** S8's own Stage object over a hand-built case's input (§14 Stage; callback form). */
function runS8Stage(c: S8Case, patch: Partial<S8Input> = {}): Leaves {
  const st = s8Stage();
  const r = st.run(st.inputsOf({ ...c.input, ...patch }, { kind: 'all' }), { report: undefined } as never);
  if (!r.ok) throw new Error(`ladders: S8 refused the fixture: ${r.code} ${r.detail}`);
  const t: Tally = {};
  readS8(t, r.value as S8Output);
  return sumLeaves(t);
}

/** A face of M0-k-01's M0 (b) synthetic set at block scale, drawn at `seedFamily('x05/<kind>', i)` (M0-b-04's draw). */
export function familyFace(kind: 'curved' | 'round-joined' | 'triangular' | 'C-shaped' | 'holed', i: number): { polygon: PolygonCm; seed: number } {
  const s = seedFamily(`x05/${kind}`, i);
  const [face] = fc.sample(arb.faceSet(kind, { scale: 'block' }), { seed: s | 0, numRuns: 1 });
  return { polygon: face.polygon, seed: s >>> 0 };
}

/** An L of 300 m arms, 120 m wide: its reflex vertex 127 m from the hull's lid, deeper than any band's plot depth. */
export const L_SHAPE = [P(0, 0), P(30_000, 0), P(30_000, 12_000), P(12_000, 12_000), P(12_000, 30_000), P(0, 30_000)];

/** The plain district: a 200 m × 150 m rectangle (no reflex vertex, no antenna; its ladder takes rung (a) at attempt 0). */
export const RECT = [P(0, 0), P(20_000, 0), P(20_000, 15_000), P(0, 15_000)];

/** Two districts in a 400 m × 300 m ring road split by an arterial (M0-b-03's F-WORK fixture). */
export function twoDistricts(seed: number): S8Case {
  const W = 40_000;
  const H = 30_000;
  return waysCase(
    60_000,
    [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(W / 2, 0), P(W / 2, H)] },
    ],
    [[P(W / 4, H / 2)], [P((3 * W) / 4, H / 2)]],
    seed,
  );
}

// ---- the trace (F-WALL's trace rungs) ------------------------------------------------------------------------------------

type Corner = readonly [number, number];
const NOTCH_TOP = (w: number): Corner[] => [[w / 2, 30_000], [w / 2, 20_000], [-w / 2, 20_000], [-w / 2, 30_000]];
const NOTCH_BOTTOM = (w: number): Corner[] => [[-w / 2, -30_000], [-w / 2, -20_000], [w / 2, -20_000], [w / 2, -30_000]];
const squareWith = (top: Corner[], bottom: Corner[] = []): Corner[] => [[-30_000, -30_000], ...bottom, [30_000, -30_000], [30_000, 30_000], ...top, [-30_000, 30_000]];
/** High ground down the north notch's centre line (a ridge): the pull brings the notch's two walls together. */
const RIDGE: CostField = (q) => (Math.abs(q.x) < 6000 && q.y > 15_000 ? Math.abs(q.x) / 100 : 0);

function densify(corners: readonly Corner[], step = 1000) {
  const out = [];
  for (let i = 0; i < corners.length; i += 1) {
    const a = corners[i];
    const b = corners[(i + 1) % corners.length];
    const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let s = 0; s < n; s += 1) out.push(P(Math.round(a[0] + ((b[0] - a[0]) * s) / n), Math.round(a[1] + ((b[1] - a[1]) * s) / n)));
  }
  return out;
}

/**
 * The registered EnceinteStrategy (`baseEnceinte`, M0-c-02) tracing a 600 m square boundary — with notches when given —
 * on the small flat site (M0-c-02's F-WALL fixtures): the trace's rungs read from its report.
 */
function traceRun(corners: Corner[], gates: Corner[], cost?: CostField): Leaves {
  const site = flatFixture(2, { frameAreaHa: 400, walledHa: 30 });
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const outer = commitOuterRing(site, k);
  if (!outer.ok) throw new Error(`ladders: the outer ring was refused: ${outer.code}`);
  const sites: GateSite[] = gates.map(([x, y], i) => ({ ordinal: i, at: P(x, y), bearingCdeg: 0 as GateSite['bearingCdeg'], kind: 'main', forced: false }));
  const r = baseEnceinte.trace(densify(corners), sites, [], site.terrain, { bodies: [], bridges: [] }, { waterfront: 'open', placement: 'aroundAll' }, siteContext(site), k, cost === undefined ? {} : { costField: cost });
  if (!r.ok) throw new Error(`ladders: the trace was refused: ${r.code} ${r.detail}`);
  const t: Tally = {};
  readTrace(t, r.value.traced.report.rungs);
  return sumLeaves(t);
}

const SIDES: Corner[] = [[-30_000, 0], [30_000, 0], [0, -30_000]];

// ---- the chain fixtures ----------------------------------------------------------------------------------------------------

function chain(spec: ChainSpec): Leaves {
  const r = runChain(spec);
  return readModel(r.model);
}

/** F-WALL's planted gate picks (M0-c-01's fixture form): two picks at one node, the later ranking `ranked` after it. */
export function plantedPicks(ranked: (a: number, c: number) => number[]): (site: Parameters<NonNullable<NonNullable<ChainSpec['override']>['S3']>['slice']>[0]) => SliceOptions {
  return (site) => {
    const plain = s3Slice(site);
    const a = plain.picks[0].node;
    const pts = plain.lattice.points;
    // The candidate farthest from `a` on the plain pick contour (seen from the nucleus): a re-draw that stands.
    let c = a;
    let best = -1;
    for (let i = 0; i < pts.length; i += 1) {
      const d = Math.hypot(pts[i].x - pts[a].x, pts[i].y - pts[a].y);
      if (plain.picks.some((p) => p.ranked.includes(i)) && d > best) {
        best = d;
        c = i;
      }
    }
    const pick = (ordinal: number, list: number[]): GatePick => ({ ordinal, node: a, at: pts[a] as GatePick['at'], ranked: list, forced: false });
    return { requestedN: 2, picks: [pick(0, [a]), pick(1, ranked(a, c))] };
  };
}

/** The S5c insert of the base (the kernel's optional insertChain), refusing `refuse(proposal, attempt)`'s steps with `code`. */
export function plantedInsert(kernel: Kernel, code: 'E_BELOW_MIN_EDGE' | 'E_SELF_INTERSECT', refuse: (proposal: number, attempt: number) => boolean) {
  return {
    insert: (o: Parameters<Kernel['geom']['insertChain']>[0], points: Parameters<Kernel['geom']['insertChain']>[1], wayId: string, knots: readonly { index: number; role: string; ordinal: number; entity: string }[], at: { proposal: number; attempt: number }) =>
      refuse(at.proposal, at.attempt) ? err(code, 'planted (M0-x-05)') : kernel.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots: [...knots] }),
  };
}

/** The kernel's own counter (§3.3, F-WORK): an insertion under a work limit of 1 returns the typed E_WORK_LIMIT. */
function kernelWork(limit: number): Leaves {
  const frame: Frame = { widthCm: 100_000 as Cm, heightCm: 100_000 as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), {});
  const spec: KernelTx = { key: GROUND, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S1 }, stage: STAGES.S1, rederivesFrom: STAGES.S1, workLimit: limit };
  const r = k.tx(spec, (o) => k.geom.insertChain(o, [P(-10_000, -10_000), P(10_000, -10_000), P(10_000, 10_000), P(-10_000, 10_000)], [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  const t: Tally = {};
  if (!r.ok && r.code === 'E_WORK_LIMIT') bump(t, 'kernel F-WORK E_WORK_LIMIT');
  else if (!r.ok) throw new Error(`ladders: the kernel refused the work fixture with ${r.code}`);
  return sumLeaves(t);
}

const SINK = 'x05-sink';
const RIDGE_T = 'x05-ridge';
const EAST = 'x05-east';
const VALLEY = 'x05-valley';
const NORTH = Object.freeze({ inflowBearingCdeg: 0, mouth: 'none' as const });

/** The small flat town the S3 – S6 fixtures and the plain chain run on: 400 ha, 60 ha walled (S5c grows streets). */
const TOWN = smallFlat('flat', 60);

/** The district of the small flat town at seed 2 whose face took rung (c) with its foot slid 30 steps (C-0269). */
export const SLID_DISTRICT = 'district:1cjkxbz67mrwc';

/** The district of the small flat town at seed 6 whose face took the antenna split (C-0269). */
export const ANTENNA_DISTRICT = 'district:47xb61jjvvnpd';

/** Every rung fixture, by id (the registry's `fixture`). */
export const LADDER_FIXTURES: readonly LadderFixture[] = Object.freeze([
  // F-CUT on S8's Stage object.
  { id: 'cut/reflex', forces: 'an L-shaped one-face district (300 m arms, 120 m wide): its reflex vertex 127 m deep', run: () => runS8Stage(districtOf([L_SHAPE], 1)) },
  { id: 'cut/antenna', forces: `the small flat town at seed 6 through S8, its district ${ANTENNA_DISTRICT}: a face whose ring carries a dead-end way’s antenna`, run: () => chain({ blueprint: smallFlat(), seed: 6, until: 'S8', override: { S8: { districts: [ANTENNA_DISTRICT] } } }) },
  { id: 'cut/turned-frame', forces: 'M0 (b)’s curved face x05/curved #4: its attempt-0 plan refused, the turned frame cuts', run: () => { const f = familyFace('curved', 4); return runS8Stage(districtOf(f.polygon, f.seed)); } },
  { id: 'cut/mean-normal', forces: 'M0 (b)’s round-joined face x05/round-joined #35: the three frames refused, rung (b) cuts', run: () => { const f = familyFace('round-joined', 35); return runS8Stage(districtOf(f.polygon, f.seed)); } },
  { id: 'cut/court', forces: 'M0 (b)’s round-joined face x05/round-joined #25: a face within (d)’s area bound no rung can cut', run: () => { const f = familyFace('round-joined', 25); return runS8Stage(districtOf(f.polygon, f.seed)); } },
  { id: 'cut/slide', forces: `the small flat town at seed 2 through S8, its district ${SLID_DISTRICT}: rung (c)’s foot slides 30 steps`, run: () => chain({ blueprint: smallFlat(), seed: 2, until: 'S8', override: { S8: { districts: [SLID_DISTRICT] } } }) },
  { id: 'work/cut', forces: 'two districts under a test-side cut.recursionDepth floor of 2', run: () => runS8Stage(twoDistricts(7), { tables: { workLimits: lowFloor('cut.recursionDepth', 2) } }) },
  // F-ROUTE on S4's Stage object.
  { id: 'route/another-site', forces: 'the small river town (a river from the west) at seed 2 through S4: a gate route’s nearest crossing site cannot meet the class radius', run: () => chain({ blueprint: smallRiver(), seed: 2, until: 'S4' }) },
  { id: 'route/slope', forces: 'the same town, S4 with through’s grade limit at 0.01 %: the re-solve after the site is given up relaxes one class', run: () => chain({ blueprint: smallRiver(), seed: 2, until: 'S4', override: { S4: { gradeLimits: { through: 0.0001 } } } }) },
  { id: 'route/unserved', forces: 'the same town, every class’s grade limit at 0.01 %: no class reaches the frame, the destination unserved', run: () => chain({ blueprint: smallRiver(), seed: 2, until: 'S4', override: { S4: { gradeLimits: { through: 0.0001, primary: 0.0001, secondary: 0.0001, track: 0.0001, path: 0.0001 } } } }) },
  { id: 'work/route-s4', forces: 'the same town, S4’s re-solve under route.nodes’ limit of 1', run: () => chain({ blueprint: smallRiver(), seed: 2, until: 'S4', override: { S4: { routeNodesLimit: 1 } } }) },
  { id: 'work/route-s3', forces: 'the small flat town (60 ha walled), S3’s slice under route.nodes’ limit of 1', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S3', override: { S3: { slice: () => ({ routeNodesLimit: 1 }) } } }) },
  // F-WALL's gate rungs on S3's slice, its trace rungs on the registered EnceinteStrategy.
  { id: 'wall/redraw', forces: 'the small flat town (60 ha walled), S3’s two picks at one node, the later ranking a far candidate next', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S3', override: { S3: { slice: plantedPicks((a, c) => [a, c]) } } }) },
  { id: 'wall/drop', forces: 'the small flat town (60 ha walled), S3’s two picks at one node, the later ranking only that node', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S3', override: { S3: { slice: plantedPicks((a) => [a, a, a, a]) } } }) },
  { id: 'wall/reoffset', forces: 'a 600 m square with a 60 m notch whose walls a ridge pulls together (the trace self-touches)', run: () => traceRun(squareWith(NOTCH_TOP(6000)), SIDES, RIDGE) },
  { id: 'wall/union-simplify', forces: 'the notched square with a gate on a second, 70 m notch the re-offset would close over', run: () => traceRun(squareWith(NOTCH_TOP(6000), NOTCH_BOTTOM(7000)), [[-30_000, 0], [30_000, 0], [-3500, -25_000]], RIDGE) },
  // F-NUM's re-propose and reject, F-WORK's queue, F-BUDGET-STAGE on S5's Stage objects.
  { id: 'growth/re-propose', forces: 'the small flat town (60 ha walled), S5c’s insertion of proposal 2 at attempt 0 refused E_BELOW_MIN_EDGE (planted)', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S5', override: { S5: { growth: (k, kernel) => (k === 1 ? plantedInsert(kernel, 'E_BELOW_MIN_EDGE', (p, a) => p === 2 && a === 0) : {}) } } }) },
  { id: 'growth/reject', forces: 'the small flat town (60 ha walled), S5c’s insertion of proposal 2 refused E_SELF_INTERSECT at every attempt (planted)', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S5', override: { S5: { growth: (k, kernel) => (k === 1 ? plantedInsert(kernel, 'E_SELF_INTERSECT', (p) => p === 2) : {}) } } }) },
  { id: 'work/growth', forces: 'the small flat town (60 ha walled), S5c under a test-side growth.proposals floor of 12', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S5', override: { S5: { growth: () => ({ workLimits: lowFloor('growth.proposals', 12) }) } } }) },
  { id: 'budget/top-up', forces: 'the small flat town (60 ha walled), S5d’s demand at the unwalled stage 3 raised to 1.3 × its built land by band', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S5', override: { S5: { demand: (k, state) => (k === 3 ? { bandsCm2: capacityCheck({ state, k }).landByBand.map((l) => l * 1.3) } : undefined) } } }) },
  { id: 'budget/accept', forces: 'the small flat town (60 ha walled), S5d’s demand at the walled stage 1 raised to 1.5 × its built land by band', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S5', override: { S5: { demand: (k, state) => (k === 1 ? { bandsCm2: capacityCheck({ state, k }).landByBand.map((l) => l * 1.5) } : undefined) } } }) },
  // F-WORK on S6's Stage object and the fields' pass 1.
  { id: 'work/grower', forces: 'the small flat town (60 ha walled), S6 under a test-side grower.turns floor of 5', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S6', override: { S6: { workLimits: lowFloor('grower.turns', 5) } } }) },
  { id: 'work/fields', forces: 'the small flat town, the fields’ pass 1 under a test-side field.cells floor of 1 000', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S6', override: { S6: { fields: { workLimits: lowFloor('field.cells', 1000) } } } }) },
  // F-RIVER and F-WORK on S1's registered RiverStrategy.
  { id: 'river/sink', forces: 'a river from the north down a valley with a 3 m sink on its axis (100 ha frame)', run: () => chain({ blueprint: smallRiver(SINK, 100, NORTH), terrains: { [SINK]: heightStrategy(valleyWithSink) }, seed: 1, until: 'S1' }) },
  { id: 'river/ridge', forces: 'a river from the north down a valley crossed by a one-row 6 m ridge (the carve plan fails past the second knot)', run: () => chain({ blueprint: smallRiver(RIDGE_T, 100, NORTH), terrains: { [RIDGE_T]: heightStrategy(valleyWithRidge) }, seed: 1, until: 'S1' }) },
  { id: 'river/eastward', forces: 'a river from the north over ground falling 2 % east (its course leaves the frame before the core)', run: () => chain({ blueprint: smallRiver(EAST, 100, NORTH), terrains: { [EAST]: heightStrategy(eastward) }, seed: 1, until: 'S1' }) },
  { id: 'work/hydro', forces: 'the small river town, S1 under a test-side hydro.cells floor of 1', run: () => chain({ blueprint: smallRiver(), seed: 1, until: 'S1', workLimits: lowFloor('hydro.cells', 1) }) },
  // F-WORK on the kernel's own counters.
  { id: 'work/kernel', forces: 'a closed ring inserted under a batch work limit of 1', run: () => kernelWork(1) },
] satisfies LadderFixture[]);

/**
 * The plain controls — the same entries with nothing forced: the small flat town through S6 (S1 – S6 and the fields'
 * pass 1 at seed 1), S8's Stage object on a plain rectangle district, the registered EnceinteStrategy on a plain
 * square, a river down a plain valley, and the kernel insertion under an ample limit.
 */
export const LADDER_CONTROLS: readonly LadderFixture[] = Object.freeze([
  { id: 'plain/chain', forces: 'the small flat town at seed 1 through S6 and the fields’ pass 1', run: () => chain({ blueprint: TOWN, seed: 1, until: 'S6' }) },
  { id: 'plain/s8', forces: 'a 200 m × 150 m rectangle district through S8', run: () => runS8Stage(districtOf([RECT], 1)) },
  { id: 'plain/trace', forces: 'a 600 m square traced (no notch)', run: () => traceRun(squareWith([]), SIDES) },
  { id: 'plain/river', forces: 'a river from the north down a plain valley (100 ha frame)', run: () => chain({ blueprint: smallRiver(VALLEY, 100, NORTH), terrains: { [VALLEY]: heightStrategy(valley) }, seed: 1, until: 'S1' }) },
  { id: 'plain/kernel', forces: 'the closed ring under an ample work limit', run: () => kernelWork(1_000_000) },
] satisfies LadderFixture[]);
