// One seed of the flat CITY fixture through M0-x-02's runner, twice (M0-c-06; §16 M0 (c), §4.4's fusion gate, §12.4;
// C-0016, C-0034, C-0077, C-0084; readings C-0268):
//   (a) the FUSION run — the base's registered S1 (the flat L0 batch: the outer ring), S3's slice, S4 and S5 (its three
//       growth stages), then S8 over stand-in districts: each walled S5 coarse face its own district, its band read from
//       the synthetic prosperity ramp (C-0034; ramp.ts) — no S6;
//   (b) the INTEGRATED run — the base's six stages, S4 + S5 + S6 + S8 with S6's real districts and pass-1 field
//       (M0-x-04's `registerBase`, M0-e-04, M0-e-05).
// Both runs register through the base table, so S1 – S5 are the same stages on the same seed: the two runs' stage roots
// through S5 are equal (C-0268 (1); the report quotes the check).
//
// Every registered stage is instrumented here, not in the model: its run is wrapped to stamp its wall-clock (M0-f-01's
// timing harness takes the timing-phase figure from these stamps, C-0084; outside it they are CONTENDED and never
// judged) and to count its invocations — the restart guard (§5.1 (1): the pipeline has no restart path; a stage run twice
// in one derivation, or a stage of the order not run, is a restart). The district faces the skeleton corpus re-runs on
// (C-0067) are read right after S6 (integrated) or the stand-in step (fusion), before S8 cuts them.
import { CONCERNS, compareFaces, faceRings, idOf, isFaceLive, setOwner, STAGES, stageText, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type LineageHash, type Plat, type PlatKey, type Polygon, type StageId } from '@plat/kernel';
import {
  baseArena,
  createRegistry,
  districtValue,
  FLAT_BLUEPRINT,
  isS1LandOwner,
  register,
  registerBase,
  run,
  runS8,
  s8Stage,
  stageOneReach,
  wayWidthCm,
  type BaseBlueprint,
  type FieldsPass1,
  type GenerationReport,
  type GrowthState,
  type PipelineContext,
  type PipelineModel,
  type PipelineStage,
  type S8District,
  type S8Input,
  type StrategyRegistry,
} from '@plat/layout';
import { lineageHash, mint, TOWN_ROOT as TOWN_ROOT_KEY, type District, type Id, type LiveEntry, type Seed } from '@plat/model';
import { TOWN_ROOT } from '@plat/site';
import { bandOf, defaultBandCuts, type BandCuts } from '@plat/tables';
import { ringCentroid, syntheticBandRamp } from './ramp.js';

/** The ground arena (§2.2). */
export const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 });

/** The two runs of a seed. */
export type RunKind = 'fusion' | 'integrated';
export const RUN_KINDS: readonly RunKind[] = Object.freeze(['fusion', 'integrated'] as const);

/** The fixture's size: the flat CITY fixture (C-0016) unless a test passes a smaller frame and walled area (C-0264 (10)). */
export interface FixtureSize {
  /** The frame's area (ha); default the rung's (2 500 ha at CITY). */
  readonly frameHa?: number;
  /** The walled land (ha); default §12.2's 220. */
  readonly walledHa?: number;
}

/** The blueprint of a run at a size (C-0264 (3): CITY, aspect 1, the flat terrain, no river). */
export function fixtureBlueprint(size: FixtureSize = {}): BaseBlueprint {
  return {
    ...FLAT_BLUEPRINT,
    size: { ...FLAT_BLUEPRINT.size, ...(size.frameHa === undefined ? {} : { areaHa: size.frameHa }) },
    ...(size.walledHa === undefined ? {} : { walledHa: size.walledHa }),
  };
}

/** A stand-in district of the fusion run: its id, growth stage, ramp value and band, and the face it stands for. */
export interface StandIn {
  readonly id: Id;
  readonly k: number;
  readonly value: number;
  readonly band: string;
  /** The face's outer-ring centroid (cm). */
  readonly centroid: { readonly x: number; readonly y: number };
}

/** What the instrumented registry recorded over one derivation. */
export interface Instruments {
  /** Each stage's wall-clock (ms), by name, summed over its invocations. */
  readonly stamps: Map<string, number>;
  /** How many times each registered stage's run was invoked, by name. */
  readonly invocations: Map<string, number>;
  /** The district faces before S8 (each face its rings, outer first), in the districts' order. */
  districtFaces: LatticePoint[][][];
  /** The fusion run's stand-in districts (empty for the integrated run). */
  standIns: StandIn[];
  /** The district → band map S8's districts were reported under. */
  readonly bandOf: Map<Id, string>;
}

/** A clock in ms (the bench's own; never a model package's). */
export type Clock = () => number;

const defaultClock: Clock = () => performance.now();

/**
 * Wraps every stage of the registry's base product: its wall-clock stamped and its invocations counted; `after` sees each
 * stage's result and context (the face reads). The product's stage objects are replaced, never mutated (they are frozen).
 */
export function instrument(registry: StrategyRegistry, ins: Instruments, after?: (name: string, value: unknown, ctx: PipelineContext) => void, clock: Clock = defaultClock): void {
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('instrument: the registry holds no base product');
  product.stages.forEach((s, i) => {
    const name = stageText(s.id);
    const orig = s.run;
    const wrapped: PipelineStage = {
      ...s,
      run(input: unknown, ctx: PipelineContext) {
        ins.invocations.set(name, (ins.invocations.get(name) ?? 0) + 1);
        const t0 = clock();
        const r = orig.call(s, input, ctx);
        ins.stamps.set(name, (ins.stamps.get(name) ?? 0) + (clock() - t0));
        if (r.ok && after !== undefined) after(name, r.value, ctx);
        return r;
      },
    } as PipelineStage;
    product.stages[i] = wrapped;
  });
}

/** Fresh instruments. */
export function newInstruments(): Instruments {
  return { stamps: new Map(), invocations: new Map(), districtFaces: [], standIns: [], bandOf: new Map() };
}

/** The live L1 faces an entity owns, as their rings (outer first), in canonical face order. */
export function ownedFaces(p: Plat, owner: Id): LatticePoint[][][] {
  const out: number[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    const h = p.faces[1].owner[f];
    if (h >= 0 && idOf(p, h) === owner) out.push(f);
  }
  out.sort((a, b) => compareFaces(p, 1, a, b));
  return out.map((f) => faceRings(p, 1, f).map((r) => r.slice()));
}

// ---- point in ring with a tolerance ----------------------------------------------------------------------------------------

/** The squared distance from p to the segment ab. */
export function segDist2(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  const qx = a.x + t * dx - p.x;
  const qy = a.y + t * dy - p.y;
  return qx * qx + qy * qy;
}

/** Where a point lies against a closed ring (open or closed list): 'on' within `tolCm` of its boundary, else in / out. */
export function sideOfRing(p: { x: number; y: number }, ring: readonly { x: number; y: number }[], tolCm = 1): 'in' | 'out' | 'on' {
  const n = ring.length;
  const tol2 = tolCm * tolCm;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    if (segDist2(p, a, b) <= tol2) return 'on';
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside ? 'in' : 'out';
}

/** A face lies inside a ring when none of its outer vertices lies outside it and one lies strictly inside. */
export function faceInside(outer: readonly { x: number; y: number }[], ring: readonly { x: number; y: number }[]): boolean {
  let any = false;
  for (const q of outer) {
    const s = sideOfRing(q, ring);
    if (s === 'out') return false;
    if (s === 'in') any = true;
  }
  return any;
}

// ---- the fusion run's stand-in step and S8 ---------------------------------------------------------------------------------

function generated(): District['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

/** A stand-in district's lineage key (§6.3's S6 keying: the town, S6, its canonical ordinal; C-0268 (3)). */
function standInLineage(index: number): LineageHash {
  return lineageHash({ arena: GROUND, unit: lineageHash(TOWN_ROOT_KEY), stage: STAGES.S6 as StageId, epoch: 0, index, reroll: 0 });
}

/** The walled stages' wall lines (k, ring), innermost first. */
export function wallLines(state: GrowthState): { k: number; ring: readonly LatticePoint[] }[] {
  const out: { k: number; ring: readonly LatticePoint[] }[] = [];
  for (const st of state.stages) if (st.walled && st.wall !== null && st.wall.length >= 3) out.push({ k: st.k, ring: st.wall });
  return out;
}

/**
 * The fusion run's S8 (C-0034, C-0268 (2), (3)): the walled S5 coarse faces — every live L1 face inside the outermost
 * walled stage's wall line that S6 would take (no owner, or an S1 land component, `isS1LandOwner`) — each re-owned by a
 * stand-in district minted in canonical face order, its growth stage the innermost wall line holding it, its pass-1
 * prosperity C-0034's ramp at the face (density 0.5, M0-b-04's constant), its regime its stage's row; then S8 over them
 * (M0-b-03's `runS8`), under S8's own declaration.
 */
export function fusionS8Stage(ins: Instruments): PipelineStage<{ state: GrowthState } | null, Record<string, unknown>> {
  const item = s8Stage();
  return Object.freeze({
    id: item.id,
    version: item.version,
    inputs: ['s3.slice', 's5.growth'],
    outputs: ['lanes', 'blocks', 'infill', 'fusion.districts'],
    streamKeys: [...item.streamKeys],
    invariants: [...item.invariants],
    ladder: item.ladder,
    workLimits: [...item.workLimits],
    budgetMs: item.budgetMs,
    batch: item.batch,
    lineageUnit: item.lineageUnit,
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: { get(k: string): unknown }): { state: GrowthState } | null {
      const state = model.get('s5.growth') as GrowthState | undefined;
      return state === undefined ? null : { state };
    },
    run(input: { state: GrowthState } | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return { ok: true, value: {}, warnings: [] };
      const state = input.state;
      const k: Kernel = ctx.kernel;
      const p = k.plat(GROUND);
      const walls = wallLines(state);
      if (walls.length === 0) return { ok: false, code: 'E_INVARIANT', detail: 'fusion: S5 left no walled stage: no walled coarse face to stand in for a district' };
      const outer = walls[walls.length - 1].ring;
      const faces: number[] = [];
      for (let f = 0; f < p.slots.face[1].top; f += 1) {
        if (!isFaceLive(p, 1, f)) continue;
        const h = p.faces[1].owner[f];
        const owner = h < 0 ? null : idOf(p, h);
        if (owner !== null && !isS1LandOwner(owner)) continue;
        if (faceInside(faceRings(p, 1, f)[0], outer)) faces.push(f);
      }
      faces.sort((a, b) => compareFaces(p, 1, a, b));
      const centre = state.slice.site.centre;
      const plaza = state.slice.plaza.ring.length >= 3 ? ringCentroid(state.slice.plaza.ring) : centre;
      const R = stageOneReach(state);
      const cuts: BandCuts = defaultBandCuts();
      const live: LiveEntry[] = [];
      const regimes = state.slice.site.tables.table('regimes');
      const plan = faces.map((f, i) => {
        const ring = faceRings(p, 1, f)[0];
        let kk = walls[walls.length - 1].k;
        for (const w of walls) {
          if (faceInside(ring, w.ring)) {
            kk = w.k;
            break;
          }
        }
        const ramp = syntheticBandRamp(ring, plaza, R, cuts);
        const m = mint([{ kind: 'district', key: { arena: GROUND, unit: lineageHash(TOWN_ROOT_KEY), stage: STAGES.S6 as StageId, epoch: 0, index: i, reroll: 0 } }], live, [], ctx.seedKey)[0];
        live.push({ id: m.identity.id, lineage: m.identity.lineage });
        return { face: f, k: kk, ramp, id: m.identity.id, lineage: standInLineage(i) };
      });
      const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000_000 };
      const owned = k.tx(spec, (o) => {
        for (const x of plan) {
          const r = setOwner(o, [x.face], x.id);
          if (!r.ok) return r;
        }
        return { ok: true as const, value: undefined, warnings: [] };
      });
      if (!owned.ok) return { ok: false, code: owned.code, detail: `fusion: the stand-in districts' owners: ${owned.detail}` };
      const districts: S8District[] = plan.map((x, i) => {
        const gs = state.stages[x.k - 1];
        const district: District = { id: x.id, kind: 'craft', quarter: 'quarter:fusion', faces: { owner: x.id, level: 1 }, seams: [], growthStage: x.k, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() };
        ins.bandOf.set(x.id, x.ramp.band);
        ins.standIns.push({ id: x.id, k: x.k, value: x.ramp.value, band: x.ramp.band, centroid: x.ramp.centroid });
        return { district, lineage: [plan[i].lineage[0], plan[i].lineage[1]] as LineageHash, reroll: ctx.streamOpts(CONCERNS['cut.stop'], TOWN_ROOT).reroll, prosperity: x.ramp.value, density: 0.5, regime: regimes.row(gs.regime), walled: gs.walled };
      });
      ins.districtFaces = plan.flatMap((x) => ownedFaces(p, x.id));
      const widths = new Map<Id, number>();
      for (const w of state.ways) widths.set(w.id, wayWidthCm(w));
      const s8in: S8Input = { kernel: k, key: GROUND, seedKey: ctx.seedKey, epoch: 0, rung: 'CITY', districts, ways: state.ways.slice(), seams: [], widths, live };
      const r = runS8(s8in, ctx as never);
      if (!r.ok) return { ok: false, code: r.code, detail: r.detail };
      return { ok: true, value: { ...r.value, 'fusion.districts': ins.standIns.slice() }, warnings: r.warnings };
    },
  }) as unknown as PipelineStage<{ state: GrowthState } | null, Record<string, unknown>>;
}

// ---- the two runs ----------------------------------------------------------------------------------------------------------

/** One derivation: the model, its report and what the instruments recorded. */
export interface Derivation {
  readonly kind: RunKind;
  readonly seed: number;
  readonly model: PipelineModel;
  readonly report: GenerationReport;
  readonly ins: Instruments;
  /** The registered stages' names (the order's denominator for the restart guard). */
  readonly registered: readonly string[];
}

/** Options of one derivation: the size, the clock, and a test's hook over the registry (a planted stage). */
export interface DeriveOptions extends FixtureSize {
  readonly clock?: Clock;
  readonly plant?: (registry: StrategyRegistry, blueprint: BaseBlueprint & { seed: Seed }) => void;
}

/**
 * The registry of a run: the base registered (M0-x-04); for the fusion run its S6 and S8 removed and the fusion S8
 * registered in their place. Instrumented.
 */
export function runRegistry(kind: RunKind, ins: Instruments, opts: DeriveOptions = {}): StrategyRegistry {
  const registry = createRegistry();
  registerBase(registry);
  if (kind === 'fusion') {
    const product = registry.products.get('base');
    if (product === undefined) throw new Error('runRegistry: no base product');
    const keep = product.stages.filter((s) => s.id !== STAGES.S6 && s.id !== STAGES.S8);
    product.stages.length = 0;
    for (const s of keep) product.stages.push(s);
    register(registry, fusionS8Stage(ins) as unknown as PipelineStage);
  }
  return registry;
}

/** Derives one run of a seed (see the module comment). */
export function derive(kind: RunKind, seed: number, opts: DeriveOptions = {}): Derivation {
  const ins = newInstruments();
  const registry = runRegistry(kind, ins, opts);
  const blueprint = { ...fixtureBlueprint(opts), seed: seed as Seed };
  opts.plant?.(registry, blueprint);
  const registered = (registry.products.get('base')?.stages ?? []).map((s) => stageText(s.id));
  instrument(
    registry,
    ins,
    (name, value, ctx) => {
      if (kind !== 'integrated' || name !== 'S6') return;
      const v = value as { districts?: readonly District[] };
      const p = ctx.kernel.plat(GROUND);
      const ds = v.districts ?? [];
      ins.districtFaces = ds.flatMap((d) => ownedFaces(p, d.id));
    },
    opts.clock,
  );
  const { model, report } = run(registry, blueprint, { kind: 'all' }, { arenas: () => [baseArena(blueprint)] });
  if (kind === 'integrated') {
    // The integrated run's districts are grouped by the town's recorded prosperity bands (FieldBands, §4.5; C-0268 (4)).
    const fields = model.data.get('fields') as FieldsPass1 | undefined;
    const districts = (model.data.get('districts') as readonly District[] | undefined) ?? [];
    if (fields !== undefined) for (const d of districts) ins.bandOf.set(d.id, bandOfDistrict(fields, d.id));
  }
  return { kind, seed, model, report, ins, registered };
}

/** The integrated run's band of a district: its pass-1 prosperity (M0-x-04's `districtValue`) cut by the town's FieldBands. */
function bandOfDistrict(fields: FieldsPass1, id: Id): string {
  return bandOf(districtValue(fields.prosperity, id), fields.prosperity.bands);
}

/** Polygon rings for the skeleton corpus (the kernel's Polygon is a ring of lattice points). */
export function asPolygons(faces: readonly LatticePoint[][][]): Polygon[][] {
  return faces.map((rings) => rings.map((r) => r.slice() as unknown as Polygon));
}
