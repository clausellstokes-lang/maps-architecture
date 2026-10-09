// The S8 Stage (§4.6, §4.1: callback form; §14 `Stage`, `StrategyRegistry.fabric`; M0-b-03): the per-district loop that
// calls each district's registered FabricStrategy — `BentCutFabric` for `bent-cut` — in lineage order, one callback L1
// transaction per district (the strategy's), over the kernel façade the runner hands it. Its registration into the base
// table is M0-x-04's. Readings: C-0237.
//
// The stage's input is the record the runner's model hands it (C-0237 (9), as S1's L0 batch takes its own, C-0229 (1)):
// the façade and the arena key, the seed key, the districts with their pass-1 values and lineage, the ways that bound
// their faces with their widths (the map the kernel's `spineWidths` reads — S8 writes its lanes into it as it inserts
// them, so a child's kerb reads the lane that made it), the seams (C-0046's minimal records) and the entities live
// before it. A district whose transaction is refused stays uncut and is reported, never silently: the stage goes on
// with the next (§5.1 (1): no restart above a district).
import { STAGES, err, ok, type Hash128, type Invariant, type Kernel, type KernelResult, type LineageHash, type PlatKey } from '@plat/kernel';
import { compareLineage, type Block, type District, type Id, type Junction, type LiveEntry, type Rung, type Scope, type Seam, type Stage, type StageContext, type Way, type WorkLimitLaw } from '@plat/model';
import { loadTable, loadWorkLimits, rungProfile, type PresetId, type Row, type Table, type WorkLimitsTable } from '@plat/tables';
import { BLOCK_FLOOR_ROW, BentCutFabric, BENT_CUT, S8_COUNTERS, type BlockFaces, type DistrictContext, type DistrictReport, type FabricStrategy, type PartitionResult } from './bentCutFabric.js';
import { granularityBands, type GranularityBands } from './granularityBands.js';
import { cutCells } from './planner.js';
import { portalInvariant, type PortalProblem } from './portals.js';

/** The ground arena (§2.2). */
const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** One district as S8 reads it. */
export interface S8District {
  readonly district: District;
  readonly lineage: Readonly<LineageHash>;
  readonly reroll?: number;
  /** The pass-1 prosperity and density values (§4.5). */
  readonly prosperity: number;
  readonly density: number;
  /** The granularity bands at its band (default: M0-b-01's at the prosperity value and the rung). */
  readonly bands?: GranularityBands;
  /** Its stage regime's row (§4.4), absent for none. */
  readonly regime?: Row;
  readonly walled?: boolean;
  readonly laneLengthM?: readonly [number, number];
}

/** S8's input record (C-0237 (9)). */
export interface S8Input {
  readonly kernel: Kernel;
  readonly key?: PlatKey;
  readonly seedKey: Readonly<Hash128>;
  readonly epoch?: number;
  readonly rung: 'TOWN' | 'CITY' | 'METROPOLIS';
  readonly districts: readonly S8District[];
  readonly ways: readonly Way[];
  readonly seams: readonly Seam[];
  /** Way id → width (cm), shared with the kernel's spineWidths; S8 adds its lanes. */
  readonly widths: Map<Id, number>;
  readonly live?: readonly LiveEntry[];
  readonly preset?: PresetId;
  /** The registered fabrics (§14's StrategyRegistry.fabric); default `bent-cut` → BentCutFabric. */
  readonly fabrics?: ReadonlyMap<string, FabricStrategy>;
  readonly tables?: { readonly cut?: Table; readonly ways?: Table; readonly interior?: Table; readonly faces?: Table; readonly workLimits?: WorkLimitsTable };
  readonly deepFactor?: number;
}

/** S8's report: each district's, and the districts refused (their code). */
export interface S8Report {
  readonly districts: readonly DistrictReport[];
  readonly refused: readonly { readonly district: Id; readonly code: string; readonly detail: string }[];
}

/** S8's output (the data keys it writes). */
export interface S8Output {
  readonly lanes: Way[];
  readonly blocks: Block[];
  readonly infill: { readonly junctions: Junction[]; readonly seams: Seam[]; readonly blockFaces: BlockFaces[]; readonly report: S8Report; readonly live: LiveEntry[] };
}

/** The default fabric registry: the base's `bent-cut` (§4.6 *The strategy slot*). */
export const BASE_FABRICS: ReadonlyMap<string, FabricStrategy> = new Map([[BENT_CUT, BentCutFabric]]);

/**
 * S8 (§4.6): every district in lineage order through its registered fabric's `partition`; the seams carry each
 * district's new portals into the next; the lanes' widths join the shared map. Refused districts are reported.
 */
export function runS8(input: S8Input, ctx: StageContext): KernelResult<S8Output> {
  const key = input.key ?? GROUND;
  const fabrics = input.fabrics ?? BASE_FABRICS;
  const profile = rungProfile(input.rung);
  const live: LiveEntry[] = (input.live ?? []).slice();
  const ways = new Map<Id, Way>(input.ways.map((w) => [w.id, w]));
  let seams: Seam[] = input.seams.map((s) => ({ ...s, portals: s.portals.slice() }));
  const order = input.districts.slice().sort((a, b) => compareLineage(a.lineage, b.lineage) || (a.district.id < b.district.id ? -1 : a.district.id > b.district.id ? 1 : 0));
  const lanes: Way[] = [];
  const blocks: Block[] = [];
  const junctions: Junction[] = [];
  const blockFaces: BlockFaces[] = [];
  const reports: DistrictReport[] = [];
  const refused: { district: Id; code: string; detail: string }[] = [];
  for (const d of order) {
    const fabric = fabrics.get(d.district.fabric);
    if (fabric === undefined) {
      refused.push({ district: d.district.id, code: 'not_built', detail: `no fabric registered for '${d.district.fabric}'` });
      continue;
    }
    const dctx: DistrictContext = {
      key,
      lineage: d.lineage,
      reroll: d.reroll ?? 0,
      seedKey: input.seedKey,
      epoch: input.epoch ?? 0,
      prosperity: d.prosperity,
      density: d.density,
      rung: input.rung,
      bands: d.bands ?? granularityBands(d.prosperity, profile),
      ...(d.regime === undefined ? {} : { regime: d.regime }),
      walled: d.walled ?? false,
      ...(d.laneLengthM === undefined ? {} : { laneLengthM: d.laneLengthM }),
      ...(input.preset === undefined ? {} : { preset: input.preset }),
      ways,
      widths: input.widths,
      live,
      ...(input.tables === undefined ? {} : { tables: input.tables }),
      ...(input.deepFactor === undefined ? {} : { deepFactor: input.deepFactor }),
    };
    const r = fabric.partition(d.district, seams, dctx, ctx, input.kernel);
    if (!r.ok) {
      refused.push({ district: d.district.id, code: r.code, detail: r.detail });
      continue;
    }
    const v: PartitionResult = r.value;
    seams = v.seams;
    for (const w of v.ways) {
      ways.set(w.id, w);
      lanes.push(w);
    }
    blocks.push(...v.blocks);
    junctions.push(...v.junctions);
    blockFaces.push(...v.blockFaces);
    reports.push(v.report);
  }
  // The stage's end: the L1 partitions rebuilt once (§3.3's rebuild moment (1)).
  input.kernel.index.rebuildAtStageEnd(key);
  // The stage-end hard row (§5.3's and §13.2's seam-portal row; C-0298): evaluated once over the committed seams and the
  // lanes this run committed, its evaluation reported through the context's sink; a breach refuses the stage
  // (E_INVARIANT, §3.3; §5.1 (8): the runner puts its arenas back and writes the bug entry, C-0295).
  const problems = seamPortalProblems(input, key, seams, lanes);
  reportRow(ctx, SEAM_PORTAL_ROW.name, problems.length === 0);
  if (problems.length > 0) return err('E_INVARIANT', seamPortalDetail(problems));
  return ok({ lanes, blocks, infill: { junctions, seams, blockFaces, report: { districts: reports, refused }, live } });
}

/**
 * The seam-portal row's evaluation at S8's end (§13.2: "every `baseLane` portal matches one S8 lane end and vice versa,
 * spaced by the portal gap"; checked against "the `Seam` records against the lanes' end vertices"): `portalInvariant`
 * over the seams as the stage leaves them and the lanes it committed, the gap from the cut table's cells (the planner's,
 * at the run's preset). Every `baseLane` portal is S8's at M0, so one that names no lane of the run is a breach.
 */
export function seamPortalProblems(input: Pick<S8Input, 'kernel' | 'tables' | 'preset'>, key: PlatKey, seams: readonly Seam[], lanes: readonly Way[]): PortalProblem[] {
  const cells = cutCells(input.tables?.cut ?? loadTable('cut'), input.preset);
  return portalInvariant(input.kernel.plat(key), key, seams, lanes, cells);
}

/** The refusal's detail: the row's name first (the runner's `<row>: ` convention), the count and the first problems. */
function seamPortalDetail(problems: readonly PortalProblem[]): string {
  const shown = problems.slice(0, 8).map((p) => `${p.what} (seam ${p.seam}${p.portal === undefined ? '' : `, portal ${p.portal}`}${p.lane === undefined ? '' : `, lane ${p.lane}`})`);
  return `${SEAM_PORTAL_ROW.name}: ${String(problems.length)} problem(s) at S8's end: ${shown.join('; ')}${problems.length > shown.length ? '; …' : ''}`;
}

/**
 * One evaluation of a declared stage-scope row through the context's report sink (§5.4's `ReportSink.invariant`; the
 * runner counts it in `GenerationReport.stages[].invariants`), when the context carries one: a context with no sink (a
 * test's, a bench's) still evaluates the row and refuses on its breach.
 */
function reportRow(ctx: StageContext, name: string, pass: boolean): void {
  const sink = (ctx as { report?: unknown } | undefined)?.report as { invariant?: (name: string, pass: boolean) => void } | undefined;
  if (sink !== undefined && sink !== null && typeof sink.invariant === 'function') sink.invariant(name, pass);
}

/** §12.4's S8 row: ≈ 1 500 cuts at ≈ 12 µs per cut, 20 ms at CITY (reporting only; the other rungs read it until M1). */
const BUDGET_MS: Record<Rung, number> = { TOWN: 20, CITY: 20, METROPOLIS: 20, THORP: 20, HAMLET: 20, VILLAGE: 20 };

/** The laws of S8's counters (§4.12's `workLimits`): the three cut counters (C-0085). */
function laws(wl: WorkLimitsTable): WorkLimitLaw[] {
  return S8_COUNTERS.map((c) => {
    const law = wl.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S8: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/** §13.2's seam-portal row as S8's stage-end invariant (§5.3). */
export const SEAM_PORTAL_ROW: Invariant = Object.freeze({ name: 'seam-portals', scope: 'stage', class: 'hard', kind: 'check', check: 'seam-portals' });

/**
 * S8 as §14's Stage: id S8, callback form (§4.1), the cut concerns as its stream keys, F-CUT's and F-WORK's ladders,
 * the block floor (batch) and the seam-portal row (stage end). Its input is the model's record for the stage (S8Input,
 * checked for its fields).
 */
export function s8Stage(opts: { workLimits?: WorkLimitsTable } = {}): Stage<S8Input | null, S8Output | Record<string, never>> {
  const wl = opts.workLimits ?? loadWorkLimits();
  return Object.freeze({
    id: STAGES.S8,
    version: '1',
    inputs: ['districts', 'fieldBands', 'network', 'enceintes'] as string[],
    outputs: ['lanes', 'blocks', 'infill'] as string[],
    streamKeys: ['cut.stop', 'cut.t', 'cut.arc', 'cut.width', 'cut.interior'] as string[],
    invariants: [BLOCK_FLOOR_ROW, SEAM_PORTAL_ROW],
    ladder: [
      { failureClass: 'F-CUT', rungs: ['reflexPreCut', 'antennaSplit', 'turnedFrame', 'meanNormal', 'perpendicularSlide', 'substitution'] },
      { failureClass: 'F-WORK', rungs: ['recursionStops'] },
    ],
    workLimits: laws(wl),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: STAGES.S8 },
    lineageUnit: 'cell',
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: unknown, _scope: Scope): S8Input | null {
      const m = model as { get?: (k: string) => unknown } | Partial<S8Input> | null | undefined;
      const viaView = m !== null && m !== undefined && typeof (m as { get?: unknown }).get === 'function';
      const rec = (viaView ? (m as { get: (k: string) => unknown }).get('districts') : m) as Partial<S8Input> | null | undefined;
      // No districts written (an earlier stage produced none): S8 has nothing to cut (§5.4: the stage decides; the report stays whole).
      if (rec === undefined || rec === null) return null;
      return rec as S8Input;
    },
    run(input: S8Input | null, ctx: StageContext): KernelResult<S8Output | Record<string, never>> {
      if (input === null) return ok({});
      if (input.kernel === undefined || input.districts === undefined || input.widths === undefined || input.seedKey === undefined || input.ways === undefined || input.seams === undefined) {
        return err('E_INVARIANT', 'S8: its record lacks the façade, the seed key, the districts, the ways, the seams or the width map (C-0237 (9))');
      }
      return runS8(input, ctx);
    },
  });
}
