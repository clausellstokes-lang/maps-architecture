// S5c growth of the secondaries (M0-c-05; §4.4 S5c, §4.1 (S5c's callback form; S5's batch row), §6.1 (`growth.heading`,
// `growth.branch`, `growth.curvature`), §6.3 (S5 ways keyed by the growth stage in acceptance order), §5.2 (F-NUM for
// optional chains, F-WORK); C-0085, C-0158; readings C-0254).
//
// Inside the stage's land a priority queue of proposals grows streets FTG-style, lowest priority first. Each proposal is
// {origin junction, heading, curvature, goalHeading, class, remainingSegments, branchCounter, priority}:
//   * seeds (C-0254 (3)): the junctions S5c makes on the stage's arterials (S4's and S5b's `through` and `primary`
//     ways) — one every seed spacing (twice the legality's clearance core, max(minimum block depth, separation ÷ 2): 160 m
//     in a walled CITY regime, district scale; block scale in an extramural one) along each arterial inside the stage's
//     land, clear of the wall's setback lines, the reservations and the junctions standing — each giving two proposals
//     of class `secondary`, perpendicular to the arterial on either side ± the branch jitter;
//   * each pop is one step: its length drawn in the class's step range, its heading by the `ou` walk (./heading.ts), the
//     step judged by `legal` (./legality.ts); an accepted step is one optional `insertChain` of the proposal's way, in one
//     L1 callback batch for the stage (§4.1: S5c's ops read the faces earlier ops made); a refused insert re-proposes
//     once from the next attempt stream and is then rejected with a report line (F-NUM); the street ends where its step
//     ends it, where a step is rejected, or when its segments run out;
//   * branching: after `branch.afterSegments` steps, with the class's probability, a child perpendicular ± the jitter
//     (FTG's `Continue`): `secondary` in a walled regime (lanes come from S8's bent cut), `lane` in an extramural one —
//     unless `lanesInfillOnly` (the fusion gate's time fallback, §4.4) holds, which grows no lane;
//   * F-WORK (C-0085): `growth.proposals` (each pop) and `growth.candidates` (each step judged) are charged against their
//     laws over the stage's land; reaching either closes the queue and the stage ends with the steps it accepted,
//     reported `work_cut` with the count.
// Ways are `way:<n>` after every standing way (no mint, as S4's and S5b's, C-0244 (7)), each keyed by the growth stage in
// acceptance order (its lineage: the stage's unit, S5, the acceptance index); junctions `junction:<n>` likewise: a `T`
// where a street leaves its arterial or parent and where it ends on a way, an `X` where it crosses one, an `end` at a
// dead end (the setback line, a shore, a reservation, a rejected step).
import {
  BinaryHeap,
  CONCERNS,
  createRng,
  dmath,
  err,
  ok,
  STAGES,
  type HalfEdgeId,
  type Kernel,
  type Knot,
  type KernelTx,
  type KernelResult,
  type LatticePoint,
  type LineageHash,
  type Overlay,
  type PlatKey,
  type StageId,
  type Stream,
} from '@plat/kernel';
import { lineageHash, TOWN_ROOT, type Cdeg, type Cm, type Id, type Junction, type Rung, type Scope, type Stage, type StageContext, type Way, type WayClass, type WorkLimitLaw } from '@plat/model';
import { TOWN_ROOT as TOWN_HANDLE } from '@plat/site';
import { loadWorkLimits, workLimitOf, type TableView, type WorkLimitsTable } from '@plat/tables';
import { footOn, lat } from '../enceinte/plane.js';
import type { EnceinteEnv } from '../enceinte/types.js';
import { generated } from '../enceinte/water.js';
import { bearingCdeg, insideRing, PI, quot } from '../siting/geom.js';
import type { S3Slice } from '../siting/types.js';
import { HA_CM2, wayLines, type StageBoundary } from './boundary.js';
import { headingModel, headingStep, initialCurvature, RAD_PER_CDEG, wrapAngle, type HeadingModel } from './heading.js';
import { crossingMatrix, FeatureIndex, legal, type Accepted, type EndKind, type Feature, type LegalityContext, type LegalityRules, type XY } from './legality.js';
import { s5bWorkLimit, type GrowthStage, type GrowthState, type S5Input } from './mainRoads.js';

/** The classes S5c grows (§4.4: district-scale secondaries in walled regimes; secondaries and lanes extramural). */
export type GrowthClass = 'secondary' | 'lane';

/** §4.4 S5c's proposal (its design fields first; the rest the street it lays). */
export interface Proposal {
  readonly id: number;
  /** The origin junction: where the proposal leaves its arterial or its parent street, and that way. */
  readonly origin: { readonly at: LatticePoint; readonly way: Id };
  heading: number;
  curvature: number;
  goalHeading: number;
  readonly class: GrowthClass;
  remainingSegments: number;
  branchCounter: number;
  priority: number;
  /** The point the next step starts from. */
  at: LatticePoint;
  /** The turn from its last step's direction to `heading` (radians; 0 before its first step). */
  turn: number;
  /** Steps laid and their length (cm). */
  steps: number;
  lengthCm: number;
  /** The street it lays (from its first accepted step). */
  street: GrownStreet | null;
}

/** A street S5c grew: its way, its lineage (the growth stage's unit, S5, the acceptance index) and its line as laid. */
export interface GrownStreet {
  readonly way: Way;
  readonly lineage: LineageHash;
  /** The acceptance index (its way's creation index in the growth stage). */
  readonly index: number;
  readonly proposal: number;
  /** The way it leaves (an arterial, or its parent street). */
  readonly parent: Id;
  readonly points: LatticePoint[];
  /** How it ends: as `legal` ended it, `dead` (a rejected step, its segments run out, the queue closed). */
  ends: EndKind | 'dead' | null;
  /** The way or junction it ends on (a T, a snap), and how its last step reached it. */
  meets: Id | null;
  endVia?: Accepted['via'];
  /** Its last step left the unwalled stage's boundary (the trim's to cut). */
  provisional: boolean;
}

/** A ladder use S5c reports (§5.2's F-NUM and F-WORK rungs). */
export type GrowthRung =
  | { readonly cause: 'F-NUM'; readonly rung: 're_propose' | 'reject'; readonly proposal: number; readonly code: string }
  | { readonly cause: 'F-WORK'; readonly rung: 'work_cut'; readonly counter: string; readonly count: number; readonly limit: number };

/** S5c's record of one stage's growth. */
export interface S5cRecord {
  readonly k: number;
  readonly regime: string;
  readonly walled: boolean;
  readonly lanesInfillOnly: boolean;
  /** The seeds and the proposals they and the branches made. */
  readonly seeds: number;
  proposalsMade: number;
  readonly streets: GrownStreet[];
  readonly junctions: Junction[];
  /** The work charged (§5.1 (5)) and the laws' limits. */
  readonly work: { 'growth.proposals': number; 'growth.candidates': number };
  readonly limits: { 'growth.proposals': number; 'growth.candidates': number };
  /** Steps accepted, rejected by `legal` (by why), deflected and biased. */
  readonly steps: { accepted: number; rejected: Record<string, number>; deflected: number; biased: number };
  readonly rungs: GrowthRung[];
  /** Kernel refusals other than F-NUM's codes, by code (each step left out). */
  readonly refused: Record<string, number>;
  workCut: { readonly counter: string; readonly count: number; readonly limit: number } | null;
  /** The batch refused as a whole at its commit (nothing of it written; the stage stands ungrown, reported). */
  batchRefused?: { readonly code: string; readonly detail: string };
}

// ---- the rules ------------------------------------------------------------------------------------------------------------

/** The growth rules of a stage's regime (§4.4's regime table, regimes.json, ways.json; C-0158, C-0254 (2)). */
export interface GrowthRules {
  readonly regime: string;
  readonly walled: boolean;
  readonly lanesInfillOnly: boolean;
  readonly model: HeadingModel;
  readonly legality: LegalityRules;
  /** The step range of a class (cm). */
  stepCm(c: GrowthClass): readonly [number, number];
  /** The class a branch of `c` takes, or null when none grows. */
  branchClass(c: GrowthClass): GrowthClass | null;
  /** The way width of a class (cm): the low end of its band at the rung. */
  widthCm(c: GrowthClass): number;
  readonly branch: { readonly after: number; probability(c: GrowthClass): number; readonly jitterRad: number };
  /** The seeds' spacing along an arterial (cm). */
  readonly seedSpacingCm: number;
  /** The minimum block depth of the regime (cm): the prune's block width. */
  readonly blockDepthCm: number;
}

/** The options a stage's rules take. */
export interface GrowthRuleOptions {
  /** The fusion gate's time fallback (§4.4): extramural growth stops at `secondary`. Default regimes.json's setting. */
  readonly lanesInfillOnly?: boolean;
}

/**
 * A regime's growth rules (C-0254 (2)): the separation the regime row gives at the rung (district scale, walled), else
 * the class's own (ways.json, block scale); the clearance max(minimum block depth, separation ÷ 2) + half the class's
 * corridor; the `ou` model of the base preset (`heading.organic`; a row with no `heading` cell — the ribbon — reads the
 * organic default); destination bias as the row's cell, on where it has none.
 */
export function growthRules(tables: TableView, regime: string, rung: Rung, opts: GrowthRuleOptions = {}): GrowthRules {
  const reg = tables.table('regimes');
  const ways = tables.table('ways');
  const walled = reg.has(regime, 'walled') && reg.value(regime, 'walled') === true;
  if (reg.has(regime, 'heading') && reg.value(regime, 'heading') !== 'ou') {
    throw new RangeError(`notBuilt('M2b'): the '${String(reg.value(regime, 'heading'))}' heading model of the ${regime} regime (§4.4; §4b — the suburb regime is M2b's)`);
  }
  const lanesInfillOnly = opts.lanesInfillOnly ?? reg.value('settings', 'lanesInfillOnly') === true;
  const depth = reg.pair(regime, 'blockDepthFloorM')[0] * 100;
  const sepOf = (c: GrowthClass): number => (reg.has(regime, `separationM.${rung}`) ? reg.num(regime, `separationM.${rung}`) : ways.num(c, 'separationM')) * 100;
  const widthCm = (c: GrowthClass): number => ways.pair(c, `widthM.${rung}`)[0] * 100;
  const clearance = (c: WayClass): number => {
    const g: GrowthClass = c === 'lane' ? 'lane' : 'secondary';
    return Math.max(depth, sepOf(g) * 0.5) + widthCm(g) * 0.5;
  };
  const g = 'growth';
  const legality: LegalityRules = {
    clearanceCm: clearance,
    snapShare: reg.num(g, 'snapStepShare'),
    bias: reg.has(regime, 'destinationBias') ? reg.value(regime, 'destinationBias') === true : true,
    biasSteps: reg.num(g, 'destinationBiasSteps'),
    legalAngle: reg.num(g, 'legalAngleCdeg') * RAD_PER_CDEG,
    matrix: crossingMatrix('organic', reg.num('crossing.organic', 'collinearCdeg')),
    minRadiusCm: (c) => ways.num(c === 'lane' ? 'lane' : 'secondary', 'minRadiusM') * 100,
  };
  return {
    regime,
    walled,
    lanesInfillOnly,
    model: headingModel(tables, 'organic'),
    legality,
    stepCm: (c) => {
      const [lo, hi] = reg.pair(g, `stepM.${c}`);
      return [lo * 100, hi * 100];
    },
    branchClass: (c) => {
      if (walled) return 'secondary';
      return lanesInfillOnly ? null : 'lane';
    },
    widthCm,
    branch: {
      after: reg.num(g, 'branch.afterSegments'),
      probability: (c) => reg.num(g, `branch.probability.${c}`),
      jitterRad: reg.num(g, 'branch.jitterCdeg') * RAD_PER_CDEG,
    },
    seedSpacingCm: 2 * Math.max(depth, sepOf('secondary') * 0.5),
    blockDepthCm: depth,
  };
}

// ---- the stage's area -----------------------------------------------------------------------------------------------------

/** A seed: a point on an arterial and the arterial's direction there. */
export interface GrowthSeed {
  readonly at: LatticePoint;
  readonly way: Id;
  readonly along: XY;
}

/** What one stage's growth reads (built from the growth state by `growthArea`, or by hand in a test). */
export interface GrowthArea {
  readonly k: number;
  readonly key: PlatKey;
  readonly rules: GrowthRules;
  /** The features standing (ways, setback lines and walls, shores, reservations, an unwalled stage's boundary). */
  readonly features: readonly Feature[];
  /** The junction vertices a step may snap to. */
  readonly junctions: readonly { readonly id: Id; readonly at: XY }[];
  readonly seeds: readonly GrowthSeed[];
  /** The stage's land (ha): the work laws' unit. */
  readonly landHa: number;
  /** The segments a proposal may lay (the region's diagonal over the shortest step, C-0254 (4)). */
  readonly maxSegments: number;
  /** The first way and junction numbers free. */
  readonly firstWay: number;
  readonly firstJunction: number;
  /** The growth stage's lineage (the unit its ways are keyed by) and the derivation unit's reroll. */
  readonly unit: LineageHash;
  readonly reroll: number;
}

/** The number after an id's prefix (`way:12` → 12), −1 when it has another form. */
export function idNumber(id: Id, prefix: string): number {
  if (!id.startsWith(prefix)) return -1;
  const n = Number(id.slice(prefix.length));
  return Number.isInteger(n) ? n : -1;
}

/** The growth stage k's lineage (§6.3: the unit of S5's ways): the town's unit, S5, creation index k. */
export function growthStageLineage(key: PlatKey, k: number, reroll = 0): LineageHash {
  return lineageHash({ arena: key, unit: lineageHash(TOWN_ROOT), stage: STAGES.S5 as StageId, epoch: 0, index: k, reroll });
}

/** The segments of a polyline (closed: its closing side too). */
function segments(pts: readonly XY[], closed: boolean): [XY, XY][] {
  const out: [XY, XY][] = [];
  for (let i = 0; i + 1 < pts.length; i += 1) out.push([pts[i], pts[i + 1]]);
  if (closed && pts.length > 2) out.push([pts[pts.length - 1], pts[0]]);
  return out;
}

/** The line segments of every chain a role row names (its committed edges, read through the façade). */
function roleSegments(k: Kernel, key: PlatKey, role: string, entity: Id): [XY, XY][] {
  const r = k.resolve({ role, entity } as never, key);
  if (r.view !== 'edges') return [];
  const p = k.plat(key);
  const out: [XY, XY][] = [];
  for (const run of r.runs) {
    for (const h of run) {
      const a = p.halfEdges.origin[h];
      const b = p.halfEdges.origin[h ^ 1];
      out.push([
        { x: p.vertices.x[a], y: p.vertices.y[a] },
        { x: p.vertices.x[b], y: p.vertices.y[b] },
      ]);
    }
  }
  return out;
}

/** The point at arc length s along a polyline and the direction of its segment there; null past its end. */
function alongLine(pts: readonly XY[], s: number): { at: XY; dir: XY } | null {
  let walked = 0;
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
    if (len === 0) continue;
    if (walked + len >= s) {
      const t = quot(s - walked, len, 'length', 'seed position');
      return { at: { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }, dir: { x: quot(b.x - a.x, len, 'length', 'seed direction'), y: quot(b.y - a.y, len, 'length', 'seed direction') } };
    }
    walked += len;
  }
  return null;
}

/** The options of `growthArea`. */
export interface GrowthAreaOptions extends GrowthRuleOptions {
  /** The stage's boundary in place of its record's (S5d's top-up grows the rim of a grown boundary). */
  readonly boundary?: StageBoundary;
  /** The ring the growth stays outside of (S5d's rim: the boundary before the top-up). */
  readonly inner?: readonly XY[];
  /** The derivation unit's reroll (the runner's for S5). */
  readonly reroll?: number;
}

/** The wall line of every stage standing, by stage (null: unwalled or folded). */
function wallLines(state: GrowthState): (readonly LatticePoint[] | null)[] {
  return state.stages.map((s) => s.wall);
}

/**
 * Stage k's growth area (C-0254 (3)): its land — inside its own wall (walled) or its boundary (unwalled), outside the
 * previous stage's wall or boundary — the features standing, the snap junctions and the seeds.
 */
export function growthArea(state: GrowthState, k: number, opts: GrowthAreaOptions = {}): GrowthArea {
  const rec = state.stages[k - 1];
  if (rec === undefined || rec.k !== k) throw new RangeError(`growthArea: stage ${String(k)} has no S5a / S5b record`);
  const site = state.slice.site;
  const kernel = state.kernel;
  const key = state.key;
  const rules = growthRules(site.tables, rec.regime, site.rung, opts);
  const boundary = opts.boundary ?? rec.boundary;
  if (boundary === null) throw new RangeError(`growthArea: stage ${String(k)} is folded (no land of its own)`);
  const walls = wallLines(state);
  const ownWall = rec.walled ? walls[k - 1] : null;
  // The region: inside the stage's wall or boundary, outside the previous stage's wall or boundary (or `inner`).
  const outer: readonly XY[] = ownWall ?? boundary.set.outline;
  let inner: readonly XY[] | null = opts.inner ?? null;
  if (inner === null) {
    for (let j = k - 2; j >= 0 && inner === null; j -= 1) {
      const s = state.stages[j];
      if (s.wall !== null) inner = s.wall;
      else if (s.boundary !== null) inner = s.boundary.set.outline;
    }
  }
  const inRegion = (p: XY): boolean => insideRing(outer, p) && (inner === null || !insideRing(inner, p, true));

  const features: Feature[] = [];
  // Every enceinte's wall and setback lines: a band never crossed.
  const enceintes = new Set<Id>();
  for (const s of state.stages) for (const g of s.gates) enceintes.add(g.enceinte);
  for (const e of [...enceintes].sort((x, y) => (x < y ? -1 : x > y ? 1 : 0))) {
    for (const role of ['wall', 'setback']) for (const [a, b] of roleSegments(kernel, key, role, e)) features.push({ a, b, kind: 'band' });
  }
  // The ways standing, with their classes.
  const lines = wayLines(kernel, state.ways.map((w) => w.id), key);
  const clsOf = new Map<Id, WayClass>(state.ways.map((w) => [w.id, w.class]));
  for (const l of lines) for (const run of l.runs) for (const [a, b] of segments(run.points, false)) features.push({ a, b, kind: 'way', way: l.way, cls: clsOf.get(l.way) ?? 'secondary' });
  // Shores and the reservations.
  for (const ring of state.slice.lattice.costs.water.faces) for (const [a, b] of segments(ring, true)) features.push({ a, b, kind: 'shore' });
  for (const [a, b] of segments(state.slice.plaza.ring, true)) features.push({ a, b, kind: 'reservation' });
  // An unwalled stage's boundary: crossed only provisionally.
  if (ownWall === null) for (const [a, b] of segments(boundary.set.outline, true)) features.push({ a, b, kind: 'boundary' });

  // The junction vertices standing (T, X and Y: a gate, a square or an end is no place to join).
  const p = kernel.plat(key);
  const junctions: { id: Id; at: XY }[] = [];
  for (const j of state.junctions) {
    if (j.kind !== 'T' && j.kind !== 'X' && j.kind !== 'Y') continue;
    const r = kernel.resolve(j.vertex, key);
    if (r.view !== 'vertices' || r.vertices.length === 0) continue;
    const v = r.vertices[0];
    const at = { x: p.vertices.x[v], y: p.vertices.y[v] };
    if (inRegion(at)) junctions.push({ id: j.id, at });
  }

  // The seeds: along each arterial inside the region, one per seed spacing, clear of bands, reservations and junctions.
  const D = rules.legality.clearanceCm('secondary');
  const S = rules.seedSpacingCm;
  const clearOf = features.filter((f) => f.kind === 'band' || f.kind === 'reservation' || f.kind === 'shore');
  const seeds: GrowthSeed[] = [];
  for (const l of lines) {
    const cls = clsOf.get(l.way);
    if (cls !== 'through' && cls !== 'primary') continue;
    for (const run of l.runs) {
      for (let s = S * 0.5; ; s += S) {
        const at = alongLine(run.points, s);
        if (at === null) break;
        const q = lat(at.at);
        if (!inRegion(q)) continue;
        if (clearOf.some((f) => footOn(q, f.a, f.b).d2 < D * D)) continue;
        if (junctions.some((j) => (j.at.x - q.x) * (j.at.x - q.x) + (j.at.y - q.y) * (j.at.y - q.y) < S * S * 0.25)) continue;
        if (seeds.some((x) => (x.at.x - q.x) * (x.at.x - q.x) + (x.at.y - q.y) * (x.at.y - q.y) < S * S * 0.25)) continue;
        seeds.push({ at: q, way: l.way, along: at.dir });
      }
    }
  }

  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of outer) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  const diag = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
  const lo = Math.min(rules.stepCm('secondary')[0], rules.stepCm('lane')[0]);
  let wayN = 0;
  for (const w of state.ways) wayN = Math.max(wayN, idNumber(w.id, 'way:') + 1);
  let jN = 0;
  for (const j of state.junctions) jN = Math.max(jN, idNumber(j.id, 'junction:') + 1);
  const reroll = opts.reroll ?? 0;
  return {
    k,
    key,
    rules,
    features,
    junctions,
    seeds,
    landHa: quot(Math.max(0, boundary.addedCm2), HA_CM2, 'count', 'land in ha'),
    maxSegments: Math.max(1, Math.ceil(quot(diag, lo, 'length', 'segments'))),
    firstWay: wayN,
    firstJunction: jN,
    unit: growthStageLineage(key, k, reroll),
    reroll,
  };
}

// ---- the streams ----------------------------------------------------------------------------------------------------------

/** S5c's streams (§6.1): `growth.heading` (each step's length and ξ, a seed's jitter), its next attempt stream (F-NUM's
 * re-proposal), `growth.curvature` (a proposal's first curvature) and `growth.branch` (each branch test). */
export interface GrowthStreams {
  readonly heading: Stream;
  readonly retry: Stream;
  readonly curvature: Stream;
  readonly branch: Stream;
}

/** The town root's growth streams under S5 for a run outside the pipeline's runner (attempt 0; the retry attempt 1). */
export function growthStreams(slice: S3Slice, reroll = 0): GrowthStreams {
  const rng = createRng();
  const s = (c: keyof typeof CONCERNS, attempt: number): Stream => rng.stream(slice.site.townKey, STAGES.S5 as StageId, CONCERNS[c], { reroll, attempt, epoch: 0, salt: 0 });
  return { heading: s('growth.heading', 0), retry: s('growth.heading', 1), curvature: s('growth.curvature', 0), branch: s('growth.branch', 0) };
}

// ---- the growth -----------------------------------------------------------------------------------------------------------

/** F-NUM's precision codes for an optional chain (§5.2). */
export const PRECISION_CODES: ReadonlySet<string> = new Set(['E_OUT_OF_RANGE', 'E_BELOW_MIN_EDGE', 'E_BELOW_MIN_ANGLE', 'E_SELF_INTERSECT']);

/** The options of a growth run. */
export interface StreetGrowOptions {
  /** The work-limit laws (default the shipped table; a test's low floor forces F-WORK). */
  readonly workLimits?: WorkLimitsTable;
  /**
   * The step's insert (default the kernel's `insertChain`, optional): a ladder fixture may plant a refusal on one step
   * (F-NUM's test; M0-x-05's rung fixture). Called with the proposal, its attempt and the arguments of the insert.
   */
  readonly insert?: (o: Overlay, points: readonly LatticePoint[], wayId: Id, knots: readonly Knot[], at: { proposal: number; attempt: number }) => KernelResult<unknown>;
}

/** A growth work law's limit over the stage's land. */
function limitOf(t: WorkLimitsTable, counter: string, landHa: number): number {
  return workLimitOf(t.law(counter), { kind: 'stage', stage: STAGES.S5 as StageId }, { landHa });
}

/** A step's length: one uniform of the stream in the class's step range (cm, whole). */
function stepLength(P: Proposal, rules: GrowthRules, s: Stream): number {
  const [lo, hi] = rules.stepCm(P.class);
  return Math.round(lo + (hi - lo) * s.float01());
}

/** S5c's batch on one stage's area: its spec (one L1 callback batch at S5's rank) and its callback, which returns the record. */
export interface GrowthBatch {
  readonly spec: KernelTx;
  readonly fn: (o: Overlay) => KernelResult<S5cRecord>;
}

/**
 * S5c's one L1 callback batch on a stage's area (see the header): every draw and every op is the callback's, so the batch
 * built afresh on any arena holding the same features — on any slot assignment — runs alike (§3.3 *Two op forms*; the
 * issue-order harness of M0-d-08 runs it so).
 */
export function growthBatch(kernel: Kernel, area: GrowthArea, streams: GrowthStreams, opts: StreetGrowOptions = {}): GrowthBatch {
  const rules = area.rules;
  const wl = opts.workLimits ?? loadWorkLimits();
  const limits = { 'growth.proposals': limitOf(wl, 'growth.proposals', area.landHa), 'growth.candidates': limitOf(wl, 'growth.candidates', area.landHa) };
  const key = area.key;
  const spec: KernelTx = {
    key,
    level: 1,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: STAGES.S5 as StageId },
    stage: STAGES.S5 as StageId,
    rederivesFrom: STAGES.S5 as StageId,
    workLimit: s5bWorkLimit(Math.ceil(4 * limits['growth.candidates']) + 64, Math.ceil(2 * limits['growth.proposals']) + 64),
  };
  const fn = (o: Overlay): KernelResult<S5cRecord> => {
    const rec: S5cRecord = {
      k: area.k,
      regime: rules.regime,
      walled: rules.walled,
      lanesInfillOnly: rules.lanesInfillOnly,
      seeds: area.seeds.length,
      proposalsMade: 0,
      streets: [],
      junctions: [],
      work: { 'growth.proposals': 0, 'growth.candidates': 0 },
      limits,
      steps: { accepted: 0, rejected: {}, deflected: 0, biased: 0 },
      rungs: [],
      refused: {},
      workCut: null,
    };
    const index = new FeatureIndex();
    for (const f of area.features) index.add(f);
    const junctionPts: { id: Id; at: XY }[] = area.junctions.slice();
    const ctx: LegalityContext = { index, junctions: junctionPts, rules: rules.legality };
    let nextWay = area.firstWay;
    let nextJunction = area.firstJunction;
    const all: Proposal[] = [];
    const queue = new BinaryHeap();
    const make = (origin: { at: LatticePoint; way: Id }, heading: number, cls: GrowthClass, remaining: number, priority: number): Proposal => {
      const P: Proposal = {
        id: all.length,
        origin,
        heading: wrapAngle(heading),
        curvature: initialCurvature(rules.model, streams.curvature),
        goalHeading: wrapAngle(heading),
        class: cls,
        remainingSegments: remaining,
        branchCounter: 0,
        priority,
        at: origin.at,
        turn: 0,
        steps: 0,
        lengthCm: 0,
        street: null,
      };
      all.push(P);
      queue.push(P.id, priority);
      return P;
    };
    // The seeds' proposals, in seed order: left, then right, each square to its arterial (C-0254 (3)).
    for (const s of area.seeds) {
      const base = dmath.atan2(s.along.y, s.along.x);
      for (const side of [1, -1]) make({ at: s.at, way: s.way }, base + side * PI * 0.5, 'secondary', area.maxSegments, 0);
    }
    const widthOf = (c: GrowthClass): number => rules.widthCm(c);
    const newJunction = (at: LatticePoint, arms: Id[], kind: Junction['kind']): Junction => {
      const id = `junction:${String(nextJunction)}`;
      nextJunction += 1;
      const j: Junction = { id, vertex: { role: 'junction', entity: id, ordinal: 0 }, arms: arms.slice().sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)), kind, lifecycle: generated(0) };
      rec.junctions.push(j);
      if (kind !== 'end') junctionPts.push({ id, at });
      return j;
    };

    const insertDefault = (points: readonly LatticePoint[], wayId: Id, knots: readonly Knot[]): KernelResult<unknown> =>
      kernel.geom.insertChain(o, points, [{ role: 'way', entity: wayId }], 'optional', { pinned: points.map((_, i) => i), knots });
    /** A vertex of the way at `at` given a junction row (the doors' way to add a vertex row: splitThrough, §3.4). */
    const mark = (wayId: Id, at: LatticePoint, jId: Id): boolean => {
      const res = kernel.resolve({ role: 'way', entity: wayId }, key);
      if (res.view !== 'edges') return false;
      const p = kernel.plat(key);
      for (const run of res.runs) {
        for (const h of run) {
          for (const e of [h, h ^ 1]) {
            const v = p.halfEdges.origin[e];
            if (p.vertices.x[v] !== at.x || p.vertices.y[v] !== at.y) continue;
            const s = kernel.geom.splitThrough(o, e as HalfEdgeId, at, { role: 'junction', entity: jId, ordinal: 0 });
            return s.ok;
          }
        }
      }
      return false;
    };
    /** The street's end at a dead end: an `end` junction at its last vertex. */
    const deadEnd = (P: Proposal): void => {
      const st = P.street;
      if (st === null || st.ends !== null) return;
      st.ends = 'dead';
      const j = newJunction(P.at, [st.way.id], 'end');
      if (!mark(st.way.id, P.at, j.id)) {
        rec.junctions.pop();
        st.way.to = { kind: 'bearing', bearingCdeg: bearingCdeg(dmath.cos(P.heading), dmath.sin(P.heading)) as Cdeg };
        rec.refused['W_END_UNMARKED'] = (rec.refused['W_END_UNMARKED'] ?? 0) + 1;
        return;
      }
      st.way.to = { kind: 'junction', id: j.id };
    };
    /** One attempt's insert of an accepted step: the knots its points take; the way id it would take. */
    const tryInsert = (P: Proposal, v: Accepted, attempt: number): { res: KernelResult<unknown>; wayId: Id; points: LatticePoint[]; knotOf: Map<number, { kind: Junction['kind']; arms: Id[] }> } => {
      const wayId = P.street?.way.id ?? `way:${String(nextWay)}`;
      const points: LatticePoint[] = [P.at];
      for (const c of v.crossings) if (!same(points[points.length - 1], c.at)) points.push(c.at);
      if (!same(points[points.length - 1], v.to)) points.push(v.to);
      const knotOf = new Map<number, { kind: Junction['kind']; arms: Id[] }>();
      if (P.street === null) knotOf.set(0, { kind: 'T', arms: [P.origin.way, wayId] });
      v.crossings.forEach((c) => {
        const i = points.findIndex((q) => same(q, c.at));
        if (i > 0 && i < points.length - 1) knotOf.set(i, { kind: 'X', arms: [c.way, wayId] });
      });
      const last = points.length - 1;
      const willEnd = v.ends !== null || P.remainingSegments <= 1;
      if (willEnd && v.ends !== 'snap') {
        const meets = v.ends === 'T' ? v.meets : null;
        knotOf.set(last, meets === null ? { kind: 'end', arms: [wayId] } : { kind: 'T', arms: [meets, wayId] });
      }
      let n = nextJunction;
      const knots = [...knotOf.keys()]
        .sort((a, b) => a - b)
        .map((i): Knot => {
          const entity = `junction:${String(n)}`;
          n += 1;
          return { index: i, role: 'junction', ordinal: 0, entity };
        });
      if (points.length < 2) return { res: err('E_DEGENERATE', 'empty'), wayId, points, knotOf };
      const res = opts.insert === undefined ? insertDefault(points, wayId, knots) : opts.insert(o, points, wayId, knots, { proposal: P.id, attempt });
      return { res, wayId, points, knotOf };
    };
    const charge = (counter: 'growth.proposals' | 'growth.candidates'): boolean => {
      if (rec.work[counter] >= limits[counter]) {
        rec.workCut = { counter, count: rec.work[counter], limit: limits[counter] };
        rec.rungs.push({ cause: 'F-WORK', rung: 'work_cut', counter, count: rec.work[counter], limit: limits[counter] });
        return false;
      }
      rec.work[counter] += 1;
      return true;
    };

    while (queue.size > 0) {
      if (!charge('growth.proposals')) break;
      const P = all[queue.pop()];
      if (!charge('growth.candidates')) {
        queue.push(P.id, P.priority);
        break;
      }
      // The step is laid along the proposal's heading; the walk advances the heading after it (C-0254 (1)).
      let ds = stepLength(P, rules, streams.heading);
      let curvature = P.curvature;
      let v = legal({ street: P.id, class: P.class, at: P.at, heading: P.heading, stepCm: ds, turn: P.turn, steps: P.steps }, ctx);
      if (v.verdict === 'reject') {
        rec.steps.rejected[v.why] = (rec.steps.rejected[v.why] ?? 0) + 1;
        deadEnd(P);
        continue;
      }
      let ins = tryInsert(P, v, 0);
      if (!ins.res.ok && PRECISION_CODES.has(ins.res.code)) {
        // F-NUM: re-propose from the next attempt stream, then reject with a report line.
        rec.rungs.push({ cause: 'F-NUM', rung: 're_propose', proposal: P.id, code: ins.res.code });
        if (!charge('growth.candidates')) {
          queue.push(P.id, P.priority);
          break;
        }
        ds = stepLength(P, rules, streams.retry);
        const hs = headingStep({ heading: P.heading, curvature: P.curvature, goalHeading: P.goalHeading, stepCm: ds, model: rules.model }, streams.retry);
        curvature = hs.curvature;
        v = legal({ street: P.id, class: P.class, at: P.at, heading: hs.heading, stepCm: ds, turn: P.turn + hs.turn, steps: P.steps }, ctx);
        if (v.verdict === 'reject') {
          rec.steps.rejected[v.why] = (rec.steps.rejected[v.why] ?? 0) + 1;
          rec.rungs.push({ cause: 'F-NUM', rung: 'reject', proposal: P.id, code: `illegal:${v.why}` });
          deadEnd(P);
          continue;
        }
        ins = tryInsert(P, v, 1);
        if (!ins.res.ok) {
          rec.rungs.push({ cause: 'F-NUM', rung: 'reject', proposal: P.id, code: ins.res.code });
          deadEnd(P);
          continue;
        }
      } else if (!ins.res.ok) {
        rec.refused[ins.res.code] = (rec.refused[ins.res.code] ?? 0) + 1;
        if (ins.res.code === 'E_WORK_LIMIT') {
          rec.workCut = { counter: 'kernel', count: rec.work['growth.candidates'], limit: limits['growth.candidates'] };
          rec.rungs.push({ cause: 'F-WORK', rung: 'work_cut', counter: 'kernel', count: rec.work['growth.candidates'], limit: limits['growth.candidates'] });
          deadEnd(P);
          break;
        }
        deadEnd(P);
        continue;
      }
      // The step stands: the street, its junctions, its features.
      rec.steps.accepted += 1;
      if (v.deflected) rec.steps.deflected += 1;
      if (v.biased) rec.steps.biased += 1;
      const first = P.street === null;
      if (first) {
        nextWay += 1;
        const way: Way = {
          id: ins.wayId,
          class: P.class,
          spine: { role: 'way', entity: ins.wayId },
          width: widthOf(P.class) as Cm,
          from: { kind: 'junction', id: '' },
          to: { kind: 'junction', id: '' },
          growthStage: area.k,
          epoch: 0,
          provisional: false,
          lifecycle: generated(0),
        };
        const index = rec.streets.length;
        P.street = {
          way,
          lineage: lineageHash({ arena: key, unit: area.unit, stage: STAGES.S5 as StageId, epoch: 0, index, reroll: area.reroll }),
          index,
          proposal: P.id,
          parent: P.origin.way,
          points: [P.at],
          ends: null,
          meets: null,
          provisional: false,
        };
        rec.streets.push(P.street);
      }
      const st = P.street as GrownStreet;
      const jIds = new Map<number, Id>();
      for (const i of [...ins.knotOf.keys()].sort((a, b) => a - b)) {
        const kn = ins.knotOf.get(i) as { kind: Junction['kind']; arms: Id[] };
        jIds.set(i, newJunction(ins.points[i], kn.arms, kn.kind).id);
      }
      if (first) st.way.from = { kind: 'junction', id: jIds.get(0) ?? '' };
      for (let i = 1; i < ins.points.length; i += 1) {
        index.add({ a: ins.points[i - 1], b: ins.points[i], kind: 'way', way: st.way.id, cls: P.class, street: P.id, step: P.steps });
        st.points.push(ins.points[i]);
      }
      const stepLen = Math.sqrt((v.to.x - P.at.x) * (v.to.x - P.at.x) + (v.to.y - P.at.y) * (v.to.y - P.at.y));
      P.steps += 1;
      P.lengthCm += stepLen;
      P.priority += stepLen;
      P.remainingSegments -= 1;
      // The step's heading as taken (bias or deflection); a deflection is also the new goal (C-0254 (5)).
      P.heading = v.heading;
      if (v.deflected) P.goalHeading = v.heading;
      P.at = v.to;
      if (v.provisional) {
        st.provisional = true;
        st.way.provisional = true;
      }
      const lastIdx = ins.points.length - 1;
      if (v.ends !== null) {
        st.ends = v.ends;
        st.meets = v.meets;
        st.endVia = v.via;
        if (v.ends === 'snap') {
          st.way.to = { kind: 'junction', id: v.meets ?? '' };
          snapArm(rec, v.meets ?? '', st.way.id);
        } else st.way.to = { kind: 'junction', id: jIds.get(lastIdx) ?? '' };
        continue;
      }
      if (P.remainingSegments <= 0) {
        st.ends = 'dead';
        st.way.to = { kind: 'junction', id: jIds.get(lastIdx) ?? '' };
        continue;
      }
      // The walk advances the heading over the step laid (a deflected or biased step restarts its curvature at 0).
      const walk = headingStep({ heading: v.heading, curvature: v.deflected || v.biased ? 0 : curvature, goalHeading: P.goalHeading, stepCm: Math.max(1, stepLen), model: rules.model }, streams.heading);
      P.heading = walk.heading;
      P.curvature = walk.curvature;
      P.turn = walk.turn;
      // Branching (FTG's Continue): after `after` steps, with the class's probability.
      P.branchCounter += 1;
      if (P.branchCounter >= rules.branch.after) {
        P.branchCounter = 0;
        if (streams.branch.float01() < rules.branch.probability(P.class)) {
          const side = streams.branch.float01() < 0.5 ? 1 : -1;
          const jitter = (2 * streams.branch.float01() - 1) * rules.branch.jitterRad;
          const cls = rules.branchClass(P.class);
          if (cls !== null) make({ at: P.at, way: st.way.id }, P.heading + side * PI * 0.5 + jitter, cls, P.remainingSegments, P.priority);
        }
      }
      queue.push(P.id, P.priority);
    }
    // The queue closed (empty, or F-WORK): every street still growing ends where it stands.
    for (const P of all) if (P.street !== null && P.street.ends === null) deadEnd(P);
    rec.proposalsMade = all.length;
    return ok(rec);
  };
  return { spec, fn };
}

/**
 * S5c on one stage's area (see the header): the proposals grown in one L1 callback batch at S5's rank. The record holds
 * every street and junction it laid; a batch the kernel refuses as a whole is the stage's refusal.
 */
export function growStreets(kernel: Kernel, area: GrowthArea, streams: GrowthStreams, opts: StreetGrowOptions = {}): KernelResult<S5cRecord> {
  const b = growthBatch(kernel, area, streams, opts);
  const r = kernel.tx(b.spec, b.fn);
  if (!r.ok) {
    // Fail safe (N-45): the batch refused as a whole writes nothing; the stage stands ungrown and says why.
    return ok({ ...emptyRecord(area.k, area.rules), seeds: area.seeds.length, batchRefused: { code: r.code, detail: r.detail } });
  }
  const v = r.value.value as KernelResult<S5cRecord> | S5cRecord;
  const rec = 'ok' in v ? (v.ok ? v.value : null) : v;
  if (rec === null) return err('E_INVARIANT', `S5c: stage ${String(area.k)}'s growth batch returned no record`);
  return ok(rec, r.warnings);
}

/** A record of no growth (a folded stage; a batch refused whole). */
function emptyRecord(k: number, rules: GrowthRules): S5cRecord {
  return {
    k,
    regime: rules.regime,
    walled: rules.walled,
    lanesInfillOnly: rules.lanesInfillOnly,
    seeds: 0,
    proposalsMade: 0,
    streets: [],
    junctions: [],
    work: { 'growth.proposals': 0, 'growth.candidates': 0 },
    limits: { 'growth.proposals': 0, 'growth.candidates': 0 },
    steps: { accepted: 0, rejected: {}, deflected: 0, biased: 0 },
    rungs: [],
    refused: {},
    workCut: null,
  };
}

/** The junctions S5c snapped to that it made itself take the new arm here (a standing one's record is updated by the caller). */
function snapArm(rec: S5cRecord, jId: Id, wayId: Id): void {
  const j = rec.junctions.find((x) => x.id === jId);
  if (j === undefined) return;
  j.arms = [...j.arms, wayId].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  if (j.arms.length >= 4) j.kind = 'X';
}

function same(a: XY, b: XY): boolean {
  return a.x === b.x && a.y === b.y;
}

// ---- the stage step -------------------------------------------------------------------------------------------------------

/** The options of a stage's growth. */
export interface GrowthStepOptions extends GrowthAreaOptions, StreetGrowOptions {}

/**
 * S5c for stage k (§4.4; see the header): the stage's area from the growth state, its streets grown in one callback
 * batch, their ways and junctions joined to the state (a standing junction snapped to takes its new arm in a fresh
 * record). A folded stage grows nothing.
 */
export function growthStep(state: GrowthState, k: number, streams: GrowthStreams, opts: GrowthStepOptions = {}): KernelResult<S5cRecord> {
  const rec = state.stages[k - 1];
  if (rec === undefined || rec.k !== k) throw new RangeError(`growthStep: stage ${String(k)} has no S5a / S5b record`);
  if (rec.boundary === null && opts.boundary === undefined) {
    const site = state.slice.site;
    return ok(emptyRecord(k, growthRules(site.tables, rec.regime, site.rung, opts)));
  }
  const area = growthArea(state, k, opts);
  const grown = growStreets(state.kernel, area, streams, opts);
  if (!grown.ok) return grown;
  joinState(state, grown.value);
  return grown;
}

/** The record's ways and junctions joined to the growth state; a standing junction a street snapped to takes its arm. */
export function joinState(state: GrowthState, rec: S5cRecord): void {
  for (const s of rec.streets) {
    state.ways.push(s.way);
    if (s.ends === 'snap' && s.meets !== null) {
      const i = state.junctions.findIndex((j) => j.id === s.meets);
      if (i >= 0) {
        const j = state.junctions[i];
        const arms = [...j.arms, s.way.id].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        state.junctions[i] = { ...j, arms, kind: arms.length >= 4 ? 'X' : j.kind };
      }
    }
  }
  for (const j of rec.junctions) state.junctions.push(j);
}

// ---- the Stage --------------------------------------------------------------------------------------------------------------

/** §12.4's S5 row (40 ms at CITY): reported only. */
const BUDGET_MS: Record<Rung, number> = { TOWN: 40, CITY: 40, METROPOLIS: 40, THORP: 40, HAMLET: 40, VILLAGE: 40 };

/** The laws of S5c's counters (§4.12 `workLimits`): growth.proposals and growth.candidates (C-0085). */
function laws(wl: WorkLimitsTable): WorkLimitLaw[] {
  return ['growth.proposals', 'growth.candidates'].map((c) => {
    const law = wl.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S5c: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/** What S5c's Stage reads: the growth state and, optionally, its switches. */
export interface S5cInput extends S5Input {
  readonly lanesInfillOnly?: boolean;
}

/** The S5c records a growth state holds, by stage (read by the prune, S5d and the harnesses). */
const RECORDS = new WeakMap<GrowthState, Map<number, S5cRecord>>();

/** The S5c record of stage k a growth state holds, if S5c ran. */
export function growthRecord(state: GrowthState, k: number): S5cRecord | undefined {
  return RECORDS.get(state)?.get(k);
}

/** Records stage k's S5c run on the state. */
export function keepRecord(state: GrowthState, rec: S5cRecord): void {
  let m = RECORDS.get(state);
  if (m === undefined) {
    m = new Map();
    RECORDS.set(state, m);
  }
  m.set(rec.k, rec);
}

/**
 * S5c as §14's Stage for stage k (callback form, §4.1; F-NUM and F-WORK its ladders): the growth from the town root's
 * `growth.heading`, `growth.curvature` and `growth.branch` streams (the heading's attempt 1 for F-NUM's re-proposal),
 * the runner's reroll for S5 applying. Registered under the one S5 id by M0-x-04 (§4.1: each stage k runs S5a – S5d in
 * order; C-0244 (11)).
 */
export function s5cStage(k: number, opts: StreetGrowOptions = {}): Stage<S5cInput, S5cRecord, EnceinteEnv> {
  const wl = opts.workLimits ?? loadWorkLimits();
  return Object.freeze({
    id: STAGES.S5 as StageId,
    version: '1',
    inputs: ['s5.growth'],
    outputs: ['s5.growth', 'ways', 'junctions'],
    streamKeys: ['growth.heading', 'growth.curvature', 'growth.branch'],
    invariants: [],
    ladder: [
      { failureClass: 'F-NUM', rungs: ['re_propose', 'reject'] },
      { failureClass: 'F-WORK', rungs: ['work_cut'] },
    ],
    workLimits: laws(wl),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: unknown, _scope: Scope): S5cInput {
      const m = model as Partial<S5cInput> | null | undefined;
      if (m === null || m === undefined || m.growth === undefined) throw new TypeError('S5c: the model hands S5 its growth state (growthStart, then S5a / S5b)');
      return m as S5cInput;
    },
    run(input: S5cInput, ctx: StageContext<EnceinteEnv>): KernelResult<S5cRecord> {
      const s = (c: keyof typeof CONCERNS, attempt: number): Stream => ctx.stream(CONCERNS[c], TOWN_HANDLE, ctx.streamOpts(CONCERNS[c], TOWN_HANDLE, attempt));
      const streams: GrowthStreams = { heading: s('growth.heading', 0), retry: s('growth.heading', 1), curvature: s('growth.curvature', 0), branch: s('growth.branch', 0) };
      const reroll = ctx.streamOpts(CONCERNS['growth.heading'], TOWN_HANDLE).reroll;
      const r = growthStep(input.growth, k, streams, { ...opts, workLimits: wl, reroll, ...(input.lanesInfillOnly === undefined ? {} : { lanesInfillOnly: input.lanesInfillOnly }) });
      if (r.ok) keepRecord(input.growth, r.value);
      return r;
    },
  });
}

export type { GrowthStage };
