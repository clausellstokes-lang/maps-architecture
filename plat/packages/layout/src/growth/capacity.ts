// S5d, the capacity check (M0-c-05; §4.4 S5d (FTG-2), §5.2 F-BUDGET-STAGE, §4.5 *Bands* (the cut points), §4.1's S5
// row ("S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1"); C-0016, C-0034, C-0049; readings C-0254 (9)–(12)).
//
// Right after S5c (and its prune and trim) the stage's new coarse faces are priced:
//   * each L1 face holding land of the stage — its lattice cells (S3's measure of land: interior dry nodes, exact to
//     one cell) located in the L1 view — gets that land less its spines' corridor reserve (each `way` edge of its
//     boundary × the widest way's declared half-width there, in the share of the face the stage's land fills), floored at
//     0; a reservation's face and a wall strip's face (C-0033's stand-in for S7's band) hold no built land;
//   * each face's band is the prosperity field at its centroid, read through an injected FieldProvider — the synthetic
//     ramp of C-0034 (1 − d ÷ R from the plaza, R the stage-1 level set's reach) unless the caller hands S6's driver-only
//     pass-1 field (wired by M0-c-06) — cut by provisional cut points computed as §4.5 computes the recorded bands: over
//     the built land grown so far (stages 1 … k), so that each band's share of it equals the band's household share;
//   * the land per band is compared with the stage's demand per band (S2's Σ n(c, b, k) · plotArea(c, b) · (1 + λ_b) ÷
//     plotShare, M1's; at M0 the caller's, or the stand-in of C-0016: the stage's quota at the stage's own measured
//     built share, spread over the bands as its land is); a total shortfall above 5 % of the demand takes ONE top-up
//     (F-BUDGET-STAGE): an unwalled stage's level set grows by the shortfall at the stage's measured built share and
//     S5c grows the added rim (then its prune and trim); a walled stage's arc re-trace is M1's — its shortfall is
//     accepted and reported (C-0254 (11)); a capped stage has no reachable land left, so it takes none. The remainder is
//     reported, never a restart.
import { area2, CONCERNS, err, faceRings, faceWalk, idOf, isFaceLive, ok, pointLocate, rowKey, rowsOn, STAGES, type FaceId, type KernelResult, type LatticePoint, type StageId } from '@plat/kernel';
import type { Id, Rung, Scope, Stage, StageContext } from '@plat/model';
import { TOWN_ROOT as TOWN_HANDLE } from '@plat/site';
import { bandOf, loadTable, type BandCuts } from '@plat/tables';
import type { EnceinteEnv } from '../enceinte/types.js';
import { quot } from '../siting/geom.js';
import { HA_CM2, stageBoundary, type StageBoundary } from './boundary.js';
import { growthStart, mainRoadsStep, mainRoadStream, traceStep, type GrowthInput, type GrowthState, type S5Input } from './mainRoads.js';
import type { XY } from './legality.js';
import { acceptedStreets, growthStep, growthStreams, keepRecord, type GrowthRuleOptions, type GrowthStreams, type S5cRecord, type StreetGrowOptions } from './proposals.js';
import { pruneAndTrim, type PruneRecord, type StageRef } from './prune.js';

/** The stage's tolerance before a top-up: 5 % of its demand (§4.4 S5d). */
export const CAPACITY_TOLERANCE = 0.05;

/** The prosperity field S5d reads a face's band from (§4.4 S5d: the driver-only field, S6 pass 1's kernels). */
export interface FieldProvider {
  readonly name: string;
  prosperityAt(p: XY): number;
}

/** C-0034's synthetic prosperity ramp: 1 − d ÷ R, d the distance from `centre`, clamped to [0, 1]. */
export function syntheticRamp(centre: XY, reachCm: number): FieldProvider {
  if (!(reachCm > 0)) throw new RangeError(`syntheticRamp: the reach is a length > 0, got ${String(reachCm)}`);
  return Object.freeze({
    name: 'synthetic-ramp',
    prosperityAt(p: XY): number {
      const d = Math.sqrt((p.x - centre.x) * (p.x - centre.x) + (p.y - centre.y) * (p.y - centre.y));
      return Math.min(1, Math.max(0, 1 - quot(d, reachCm, 'length', 'ramp reach')));
    },
  });
}

/** The stage-1 level set's reach R (C-0034): the farthest outline vertex from the site's centre (cm). */
export function stageOneReach(state: GrowthState): number {
  const c = state.slice.site.centre;
  let r = 0;
  for (const q of state.slice.levelSet.outline) r = Math.max(r, Math.sqrt((q.x - c.x) * (q.x - c.x) + (q.y - c.y) * (q.y - c.y)));
  return r;
}

/** The demand S5d compares the stage's land with, per band in the band set's order (cm² of built land). */
export interface CapacityDemand {
  readonly bandsCm2: readonly number[];
}

/** One priced face. */
export interface PricedFace {
  /** The face's canonical key: its outer ring's lowest-then-leftmost vertex (slot-free). */
  readonly key: string;
  readonly centroid: XY;
  readonly areaCm2: number;
  /** The stage's land in it (its cells) and the corridor reserve in that land's share of the face. */
  readonly landCm2: number;
  readonly reserveCm2: number;
  readonly reserved: 'reservation' | 'strip' | null;
  readonly builtCm2: number;
  readonly value: number;
  readonly band: string;
}

/** S5d's pricing of a stage. */
export interface CapacityResult {
  readonly k: number;
  readonly field: string;
  readonly faces: readonly PricedFace[];
  /** The provisional cut points over the built land grown so far (§4.5's computation). */
  readonly cuts: BandCuts;
  readonly landCm2: number;
  readonly builtCm2: number;
  readonly landByBand: readonly number[];
  readonly demandByBand: readonly number[];
  readonly demandCm2: number;
  /** Σ_b max(0, demand_b − land_b). */
  readonly shortfallCm2: number;
  /** The shortfall exceeds 5 % of the demand. */
  readonly short: boolean;
}

/** The band set and each band's household share (bands.json, in its order; they sum to 1). */
function bandShares(): { bands: string[]; shares: number[] } {
  const t = loadTable('bands');
  const bands = [...t.strs('settings', 'order')];
  return { bands, shares: bands.map((b) => t.num(b, 'share')) };
}

/** Each lattice node's growth stage (1 … K: the first stage whose selection holds it), 0 for none. */
function stageOfNodes(state: GrowthState, upTo: number): Uint8Array {
  const n = state.slice.lattice.points.length;
  const out = new Uint8Array(n);
  for (let j = 0; j < Math.min(upTo, state.stages.length); j += 1) {
    const b = state.stages[j].boundary;
    if (b === null) continue;
    const sel = b.set.selected;
    for (let i = 0; i < n; i += 1) if (out[i] === 0 && sel[i] === 1) out[i] = j + 1;
  }
  return out;
}

interface FaceInfo {
  readonly key: string;
  readonly centroid: XY;
  readonly areaCm2: number;
  readonly reserveCm2: number;
  readonly reserved: 'reservation' | 'strip' | null;
}

/**
 * The stage's faces priced (see the header) and compared with `demand` — or, without one, the stand-in of C-0016 (the
 * stage's quota at its own measured built share, spread over the bands as its built land is). `field` defaults to
 * C-0034's synthetic ramp.
 */
export function capacityCheck(stage: StageRef, demand?: CapacityDemand, opts: { readonly field?: FieldProvider } = {}): CapacityResult {
  const { state, k } = stage;
  const gs = state.stages[k - 1];
  if (gs === undefined || gs.k !== k) throw new RangeError(`capacityCheck: stage ${String(k)} has no S5a / S5b record`);
  const field = opts.field ?? syntheticRamp(state.slice.site.centre, stageOneReach(state));
  const lattice = state.slice.lattice;
  const kernel = state.kernel;
  const key = state.key;
  const p = kernel.plat(key);
  const stageOf = stageOfNodes(state, k);
  const widthOf = new Map<Id, number>();
  for (const w of state.ways) widthOf.set(w.id, typeof w.width === 'number' ? w.width : 0);
  const plaza = state.plaza.id;
  // Cells → faces (a cell on a vertex or an edge read 1 cm off it, toward +x then +y).
  const cellsAll = new Map<FaceId, number>();
  const cellsK = new Map<FaceId, number>();
  const at = (x: number, y: number): FaceId | null => {
    const l = pointLocate(p, key, 1, { x, y } as LatticePoint);
    return l.on === 'face' && l.level === 1 ? l.face : null;
  };
  for (let i = 0; i < lattice.points.length; i += 1) {
    const s = stageOf[i];
    if (s === 0 || lattice.interior[i] !== 1 || lattice.water[i] !== 0) continue;
    const q = lattice.points[i];
    const f = at(q.x, q.y) ?? at(q.x + 1, q.y) ?? at(q.x, q.y + 1) ?? at(q.x + 1, q.y + 1);
    if (f === null) continue;
    cellsAll.set(f, (cellsAll.get(f) ?? 0) + 1);
    if (s === k) cellsK.set(f, (cellsK.get(f) ?? 0) + 1);
  }
  const info = new Map<FaceId, FaceInfo>();
  const faceInfo = (f: FaceId): FaceInfo => {
    const had = info.get(f);
    if (had !== undefined) return had;
    const rings = faceRings(p, 1, f);
    const outer = rings[0];
    let a2 = area2(outer);
    for (let r = 1; r < rings.length; r += 1) a2 -= Math.abs(area2(rings[r]));
    let cx = 0;
    let cy = 0;
    let w = 0;
    let lowest = outer[0];
    for (let i = 0; i < outer.length; i += 1) {
      const a = outer[i];
      const b = outer[i + 1 === outer.length ? 0 : i + 1];
      const c = a.x * b.y - b.x * a.y;
      cx += (a.x + b.x) * c;
      cy += (a.y + b.y) * c;
      w += c;
      if (a.y < lowest.y || (a.y === lowest.y && a.x < lowest.x)) lowest = a;
    }
    const centroid = Math.abs(3 * w) < 1 ? { x: outer[0].x, y: outer[0].y } : { x: quot(cx, 3 * w, 'area', 'centroid'), y: quot(cy, 3 * w, 'area', 'centroid') };
    let reserve = 0;
    for (const ring of faceWalk(p, 1, f)) {
      for (const h of ring) {
        let half = 0;
        for (const r of rowsOn(p, 'edge', h)) {
          const kk = rowKey(p, r);
          if (kk.role === 'way') half = Math.max(half, (widthOf.get(kk.entity) ?? 0) * 0.5);
        }
        if (half === 0) continue;
        const a = p.halfEdges.origin[h];
        const b = p.halfEdges.origin[h ^ 1];
        const dx = p.vertices.x[b] - p.vertices.x[a];
        const dy = p.vertices.y[b] - p.vertices.y[a];
        reserve += Math.sqrt(dx * dx + dy * dy) * half;
      }
    }
    const oh = p.faces[1].owner[f];
    const owner = oh >= 0 ? idOf(p, oh) : '';
    const reserved = owner === plaza ? 'reservation' : owner.startsWith('wall_strip:') ? 'strip' : null;
    const v: FaceInfo = { key: `${String(lowest.x)},${String(lowest.y)}`, centroid, areaCm2: Math.abs(a2) * 0.5, reserveCm2: reserve, reserved };
    info.set(f, v);
    return v;
  };
  const cellArea = lattice.cellAreaCm2;
  const builtOf = (fi: FaceInfo, land: number): { reserve: number; built: number } => {
    const share = fi.areaCm2 >= 1 ? Math.min(1, quot(land, fi.areaCm2, 'area', 'land share')) : 0;
    const reserve = fi.reserveCm2 * share;
    return { reserve, built: fi.reserved === null ? Math.max(0, land - reserve) : 0 };
  };
  // The cut points over the built land grown so far (§4.5): each band's share of it the band's household share.
  const { bands, shares } = bandShares();
  const sofar: { value: number; built: number; key: string }[] = [];
  for (const f of [...cellsAll.keys()].sort((a, b) => a - b)) {
    if (!isFaceLive(p, 1, f)) continue;
    const fi = faceInfo(f);
    const b = builtOf(fi, (cellsAll.get(f) ?? 0) * cellArea).built;
    if (b > 0) sofar.push({ value: clamp01(field.prosperityAt(fi.centroid)), built: b, key: fi.key });
  }
  sofar.sort((a, b) => a.value - b.value || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  let total = 0;
  for (const s of sofar) total += s.built;
  const cuts: number[] = [];
  let cum = 0;
  let acc = 0;
  let idx = 0;
  for (let i = 0; i + 1 < bands.length; i += 1) {
    cum += shares[i];
    const target = cum * total;
    while (idx < sofar.length && acc + sofar[idx].built <= target) {
      acc += sofar[idx].built;
      idx += 1;
    }
    const c = idx < sofar.length ? sofar[idx].value : 1;
    cuts.push(Math.max(cuts.length > 0 ? cuts[cuts.length - 1] : 0, Math.min(1, c)));
  }
  const cutSet: BandCuts = { bands, cuts };
  // The stage's own faces.
  const faces: PricedFace[] = [];
  const landByBand = bands.map(() => 0);
  let landK = 0;
  let builtK = 0;
  for (const f of [...cellsK.keys()].sort((a, b) => a - b)) {
    const fi = faceInfo(f);
    const land = (cellsK.get(f) ?? 0) * cellArea;
    const { reserve, built } = builtOf(fi, land);
    const value = clamp01(field.prosperityAt(fi.centroid));
    const band = bandOf(value, cutSet);
    faces.push({ key: fi.key, centroid: fi.centroid, areaCm2: fi.areaCm2, landCm2: land, reserveCm2: reserve, reserved: fi.reserved, builtCm2: built, value, band });
    landByBand[bands.indexOf(band)] += built;
    landK += land;
    builtK += built;
  }
  faces.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
  const d = demand ?? standInDemand(state, k, landK, builtK, landByBand, shares);
  if (d.bandsCm2.length !== bands.length) throw new RangeError(`capacityCheck: the demand has ${String(d.bandsCm2.length)} bands, the band set ${String(bands.length)}`);
  let demandCm2 = 0;
  let shortfall = 0;
  d.bandsCm2.forEach((x, i) => {
    demandCm2 += x;
    shortfall += Math.max(0, x - landByBand[i]);
  });
  return {
    k,
    field: field.name,
    faces,
    cuts: cutSet,
    landCm2: landK,
    builtCm2: builtK,
    landByBand,
    demandByBand: [...d.bandsCm2],
    demandCm2,
    shortfallCm2: shortfall,
    short: shortfall > CAPACITY_TOLERANCE * demandCm2,
  };
}

function clamp01(v: number): number {
  return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0;
}

/**
 * The stand-in demand of C-0016 at M0 (S2's is M1's; C-0254 (10)): the stage's quota (its share of the fixture's land,
 * with any quota folded into it) at the stage's own measured built share, spread over the bands as its built land is
 * (by the household shares when it has none).
 */
export function standInDemand(state: GrowthState, k: number, landCm2: number, builtCm2: number, landByBand: readonly number[], shares: readonly number[]): CapacityDemand {
  const quota = (state.slice.site.land.stagesHa[k - 1] + (state.folded[k - 1] ?? 0)) * HA_CM2;
  const share = landCm2 >= 1 ? quot(builtCm2, landCm2, 'area', 'built share') : 0;
  const total = quota * share;
  if (!(builtCm2 >= 1)) return { bandsCm2: shares.map((s) => total * s) };
  return { bandsCm2: landByBand.map((l) => total * quot(l, builtCm2, 'area', 'band share')) };
}

// ---- S5d ------------------------------------------------------------------------------------------------------------------

/** F-BUDGET-STAGE's rungs as S5d took them (§5.2). */
export interface BudgetRung {
  readonly cause: 'F-BUDGET-STAGE';
  readonly rung: 'top_up' | 'accept_shortfall';
  readonly shortfallCm2: number;
  readonly why?: 'walled' | 'capped' | 'no_land' | 'remainder';
}

/** S5d's record of one stage. */
export interface S5dRecord {
  readonly k: number;
  readonly check: CapacityResult;
  readonly topUp: 'none' | 'grown' | 'skipped_walled' | 'skipped_capped' | 'skipped_no_land';
  /** The land the top-up asked the level set for (cm²) and the boundary it grew. */
  readonly extraCm2: number;
  readonly boundary: StageBoundary | null;
  readonly rim: S5cRecord | null;
  readonly rimPrune: PruneRecord | null;
  readonly after: CapacityResult | null;
  /** The shortfall left, reported (F-BUDGET-STAGE; at M0 it goes to M1's exact check after S10). */
  readonly shortfallCm2: number;
  readonly rungs: readonly BudgetRung[];
}

/** The options of S5d. */
export interface CapacityOptions extends StreetGrowOptions, GrowthRuleOptions {
  readonly field?: FieldProvider;
  /** The stage's demand (default the stand-in). */
  readonly demand?: CapacityDemand;
  readonly reroll?: number;
}

/**
 * S5d for stage k (see the header): the check, then at most one top-up — never a restart — and the remainder
 * reported. `streams` are S5c's (the rim grows from them, continued).
 */
export function capacityStep(state: GrowthState, k: number, streams: GrowthStreams, opts: CapacityOptions = {}): KernelResult<S5dRecord> {
  const gs = state.stages[k - 1];
  if (gs === undefined || gs.k !== k) throw new RangeError(`capacityStep: stage ${String(k)} has no S5a / S5b record`);
  const field = opts.field ?? syntheticRamp(state.slice.site.centre, stageOneReach(state));
  const check = capacityCheck({ state, k }, opts.demand, { field });
  const base = { k, check, extraCm2: 0, boundary: null, rim: null, rimPrune: null, after: null };
  if (!check.short) return ok({ ...base, topUp: 'none', shortfallCm2: check.shortfallCm2, rungs: [] });
  const b = gs.boundary;
  if (b === null) return ok({ ...base, topUp: 'skipped_no_land', shortfallCm2: check.shortfallCm2, rungs: [{ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: check.shortfallCm2, why: 'no_land' }] });
  if (b.capped) return ok({ ...base, topUp: 'skipped_capped', shortfallCm2: check.shortfallCm2, rungs: [{ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: check.shortfallCm2, why: 'capped' }] });
  if (gs.walled) {
    // C-0254 (11): the walled arc's re-trace between its pinned gates is M1's; the shortfall is accepted and reported.
    return ok({ ...base, topUp: 'skipped_walled', shortfallCm2: check.shortfallCm2, rungs: [{ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: check.shortfallCm2, why: 'walled' }] });
  }
  // The level set grown by the shortfall at the stage's measured built share (§5.2's "at the stage's measured plot
  // density"), nested on the stage's own selection.
  const extra = check.builtCm2 >= 1 ? quot(check.shortfallCm2 * check.landCm2, check.builtCm2, 'area', 'top-up land') : check.shortfallCm2;
  const site = state.slice.site;
  const stagesHa = site.land.stagesHa.slice();
  stagesHa[k - 1] += quot(extra, HA_CM2, 'count', 'top-up ha');
  const grown = stageBoundary(state.field, k, { stagesHa }, { enclosure: b.set.selected });
  const rungs: BudgetRung[] = [{ cause: 'F-BUDGET-STAGE', rung: 'top_up', shortfallCm2: check.shortfallCm2 }];
  // The rim's streets continue the stage's acceptance index (§6.3; no lineage key reused).
  const rim = growthStep(state, k, streams, { ...opts, boundary: grown, inner: b.set.outline, firstIndex: acceptedStreets(state, k) });
  if (!rim.ok) return err(rim.code, rim.detail);
  const pr = pruneAndTrim({ state, k, record: rim.value }, { boundary: grown });
  if (!pr.ok) return err(pr.code, pr.detail);
  // The stage's boundary is the grown one; the next stage nests on it.
  const grownFull: StageBoundary = { ...grown, enclosureCm2: b.enclosureCm2, addedCm2: grown.landCm2 - b.enclosureCm2 };
  gs.boundary = grownFull;
  if (state.lastWithLand === k) state.enclosure = grown.set.selected;
  const after = capacityCheck({ state, k }, check.demandByBand.length > 0 ? { bandsCm2: check.demandByBand } : undefined, { field });
  if (after.shortfallCm2 > 0) rungs.push({ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: after.shortfallCm2, why: 'remainder' });
  return ok({ k, check, topUp: 'grown', extraCm2: extra, boundary: grownFull, rim: rim.value, rimPrune: pr.value, after, shortfallCm2: after.shortfallCm2, rungs });
}

/** What S5d's Stage reads: the growth state, and optionally the demand and the field. */
export interface S5dInput extends S5Input {
  readonly demand?: CapacityDemand;
  readonly field?: FieldProvider;
}

/** §12.4's S5 row (40 ms at CITY): reported only. */
const BUDGET_MS: Record<Rung, number> = { TOWN: 40, CITY: 40, METROPOLIS: 40, THORP: 40, HAMLET: 40, VILLAGE: 40 };

/**
 * S5d as §14's Stage for stage k (F-BUDGET-STAGE its ladder; its top-up's rim grown from the S5c streams). Registered
 * under the one S5 id by M0-x-04 (§4.1; C-0244 (11)).
 */
export function s5dStage(k: number, opts: CapacityOptions = {}): Stage<S5dInput, S5dRecord, EnceinteEnv> {
  return Object.freeze({
    id: STAGES.S5 as StageId,
    version: '1',
    inputs: ['s5.growth'],
    outputs: ['s5.growth', 'ways', 'junctions'],
    streamKeys: ['growth.heading', 'growth.curvature', 'growth.branch'],
    invariants: [],
    ladder: [{ failureClass: 'F-BUDGET-STAGE', rungs: ['top_up', 'accept_shortfall'] }],
    workLimits: [],
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S5 as StageId },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: unknown, _scope: Scope): S5dInput {
      const m = model as Partial<S5dInput> | null | undefined;
      if (m === null || m === undefined || m.growth === undefined) throw new TypeError('S5d: the model hands S5 its growth state (after S5c)');
      return m as S5dInput;
    },
    run(input: S5dInput, ctx: StageContext<EnceinteEnv>): KernelResult<S5dRecord> {
      const s = (c: keyof typeof CONCERNS, attempt: number) => ctx.stream(CONCERNS[c], TOWN_HANDLE, ctx.streamOpts(CONCERNS[c], TOWN_HANDLE, attempt));
      const streams: GrowthStreams = { heading: s('growth.heading', 0), retry: s('growth.heading', 1), curvature: s('growth.curvature', 0), branch: s('growth.branch', 0) };
      const reroll = ctx.streamOpts(CONCERNS['growth.heading'], TOWN_HANDLE).reroll;
      return capacityStep(input.growth, k, streams, { ...opts, reroll, ...(input.demand === undefined ? {} : { demand: input.demand }), ...(input.field === undefined ? {} : { field: input.field }) });
    },
  });
}

// ---- S5 whole ---------------------------------------------------------------------------------------------------------------

/** One S5 run's records: the state and, per stage, S5c, its prune and trim, and S5d. */
export interface S5Run {
  readonly state: GrowthState;
  readonly growth: readonly S5cRecord[];
  readonly prune: readonly PruneRecord[];
  readonly capacity: readonly S5dRecord[];
}

/** The options of a whole S5 run. */
export interface S5Options extends CapacityOptions {
  /** Each stage's demand (default the stand-in). */
  readonly demandOf?: (k: number) => CapacityDemand | undefined;
}

/**
 * S5 for every stage k = 1 … K in §4.1's order (no restart path: each sub-step runs once per stage, S5d's one top-up
 * inside its own step): k ≥ 2 — S5a's boundary and S5b (M0-c-04's `mainRoadsStep`), S5a's trace (`traceStep`); every k —
 * S5c, its prune and trim, S5d. Streams are the town root's under S5 (outside the runner).
 */
export function runS5(input: GrowthInput, opts: S5Options = {}): KernelResult<S5Run> {
  const state = growthStart(input);
  const mainroad = mainRoadStream(input.slice);
  const streams = growthStreams(input.slice, opts.reroll ?? 0);
  const K = input.slice.site.land.stagesHa.length;
  const growth: S5cRecord[] = [];
  const prune: PruneRecord[] = [];
  const capacity: S5dRecord[] = [];
  for (let k = 1; k <= K; k += 1) {
    if (k >= 2) {
      const m = mainRoadsStep(state, k, mainroad);
      if (!m.ok) return err(m.code, m.detail);
      const t = traceStep(state, k);
      if (!t.ok) return err(t.code, t.detail);
    }
    const c = growthStep(state, k, streams, opts);
    if (!c.ok) return err(c.code, c.detail);
    keepRecord(state, c.value);
    growth.push(c.value);
    const pr = pruneAndTrim({ state, k, record: c.value });
    if (!pr.ok) return err(pr.code, pr.detail);
    prune.push(pr.value);
    const demand = opts.demandOf?.(k) ?? opts.demand;
    const d = capacityStep(state, k, streams, { ...opts, ...(demand === undefined ? {} : { demand }) });
    if (!d.ok) return err(d.code, d.detail);
    capacity.push(d.value);
  }
  return ok({ state, growth, prune, capacity });
}
