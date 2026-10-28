// Phase b's runs: S8 on NG's hood outlines as the district shapes (M0-c-07; §16 M0 (c): "block-area and junction-degree
// distributions inside the NG bands on the same district shapes"; §4.4's gate; C-0043, C-0071, C-0101, C-0117).
//
// One task is one hood outline at one derivation seed, run through M0-x-04's base registration and M0-x-02's runner on
// the flat fixture (M0-c-06's `fixtureBlueprint`, its CITY size or a test size): the registry is the base's
// (`registerBase`), S1 kept — the fixture's frame and its L0 batch — and the fixture's S3 – S6 replaced by the outline's
// face: the hood stage, registered under S8's id, inserts the outline at L1 as a `district_bound` chain (a boundary
// with no spine, so its kerb is the face itself, §3.7 — M0-b-04's one-face district), owns the face by one district
// minted as S6 would mint it, and runs S8 (M0-b-03's `runS8`) over it at M0-b-04's pass-1 values (prosperity 0.3,
// density 0.5: the CITY band M0-b-05's NG runs read, C-0162 (1)). `runBase` itself takes no stage replacement, so the
// harness composes `registerBase` and M0-x-02's `run` as M0-c-06's `derive` does (C-0442 (3)). S3's slice is not kept:
// its plaza and stage-1 trace would cut through a placed outline (C-0442 (3)).
//
// The outline is moved so its box is centred on the frame's centre (a translation by whole centimetres changes no
// shape, length, area or angle); an outline that does not fit inside the frame less its margin is not run (`setup`,
// counted, failing the run clause). The record holds plain numbers: the outline as the arena holds it after S8 (the
// `district_bound` chain resolved, every lane's junction vertex on it), S8's lanes, its blocks (working ring, content,
// depth class, interior), its warnings and the report's census fields — so the folds read the records in task order.
import { area2, compareFaces, CONCERNS, faceRings, isFaceLive, STAGES, type Cm, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type PlatKey, type Seed } from '@plat/kernel';
import { baseArena, createRegistry, register, registerBase, run, runS8, s8Stage, wayLines, type PipelineContext, type PipelineStage, type S8District, type S8Input, type S8Output } from '@plat/layout';
import { lineageHash, mint, TOWN_ROOT as TOWN_ROOT_KEY, type Block, type District, type LiveEntry } from '@plat/model';
import { TOWN_ROOT } from '@plat/site';
import type { Table } from '@plat/tables';
import { seedFamily, type NgHood, type NgTemplate } from '@plat/testkit';
import { DENSITY, PROSPERITY } from '../bentcut/index.js';
import { fixtureBlueprint } from '../fusion/index.js';
import type { RunSize } from './report.js';

/** The ground arena (§2.2). */
export const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 });

/** A point in centimetres, plain. */
export interface XYcm {
  readonly x: number;
  readonly y: number;
}

/** One task: a hood at a derivation seed, at a size; `cut` a recalibrated cut table (in memory) when given. */
export interface HoodTask {
  readonly hood: NgHood;
  readonly seed: number;
  readonly seedIndex: number;
  readonly size: RunSize;
  readonly cut?: Table;
}

/** A block S8 committed on the hood. */
export interface HoodBlock {
  readonly ring: readonly XYcm[];
  readonly content: string;
  readonly depthClass: string;
  readonly interior: string;
}

/** A task's record (plain numbers; see the module comment). */
export interface HoodRecord {
  readonly hood: number;
  readonly template: NgTemplate;
  readonly seedIndex: number;
  /** The derivation's seed. */
  readonly seed: number;
  /** Not run: the outline does not fit the frame, or the kernel refused its ring; null when built. */
  readonly setup: string | null;
  /** The runner or S8 refused the district (its code and detail); null when S8 ran. */
  readonly refused: string | null;
  /** The outline as the arena holds it after S8 (closed: its last point its first), moved to the frame. */
  readonly outline: readonly XYcm[];
  readonly lanes: readonly (readonly XYcm[])[];
  readonly blocks: readonly HoodBlock[];
  /** S8's warnings by code (its own ladders' steps; never refusals). */
  readonly warnings: Readonly<Record<string, number>>;
  /** The generation report's census fields (M0-c-06's names). */
  readonly census: { readonly s8: number; readonly kernelDowngrades: number; readonly kernelWorkLimitHits: number; readonly unplaced: number; readonly degraded: number; readonly bugs: number };
}

/** The share of the frame's half side an outline may not reach (the frame's border band). */
export const FRAME_MARGIN = 0.1;

/** The derivation seed of a hood run: H32("fusion-ng/<seed>/hood-<id>") per seed index, a u32 (M0-k-01's seedFamily). */
export function hoodSeed(seed: number, hood: number, seedIndex: number): number {
  return seedFamily(`fusion-ng/${String(seed)}/hood-${String(hood)}`, seedIndex) >>> 0;
}

/** The outline's ring, open, moved so its box is centred on the frame's centre; a message when it does not fit. */
export function placedOutline(hood: NgHood, halfSideCm: number): LatticePoint[] | string {
  const r = hood.outlineCm;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y] of r) {
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
  const dx = Math.round((x0 + x1) / 2);
  const dy = Math.round((y0 + y1) / 2);
  const half = Math.max(x1 - dx, dx - x0, y1 - dy, dy - y0);
  const room = Math.floor(halfSideCm * (1 - FRAME_MARGIN));
  if (!(half <= room)) return `hood ${String(hood.id)}: ${String(half)} cm from its centre, beyond the frame's ${String(room)} cm`;
  return r.slice(0, r.length - 1).map(([x, y]) => ({ x: (x - dx) as Cm, y: (y - dy) as Cm }));
}

function generated(): District['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

/** The live L1 face the outline bounds: the largest one that is not the frame's own (whose outer ring is the largest). */
function outlineFace(k: Kernel): number {
  const p = k.plat(GROUND);
  const faces: { f: number; a: number }[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) faces.push({ f, a: Math.abs(area2(faceRings(p, 1, f)[0])) });
  if (faces.length < 2) return -1;
  faces.sort((x, y) => y.a - x.a || compareFaces(p, 1, x.f, y.f));
  return faces[1].f;
}

/** A chain's committed line(s) through the façade (§3.4 `resolve`), every vertex on it in order. */
function chainLines(k: Kernel, role: string, entity: string): XYcm[][] {
  const p = k.plat(GROUND);
  const r = k.resolve({ role: role as never, entity }, GROUND);
  if (r.view !== 'edges') return [];
  return r.runs.map((runH) => {
    const pts: XYcm[] = runH.map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }));
    const tip = p.halfEdges.origin[runH[runH.length - 1] ^ 1];
    pts.push({ x: p.vertices.x[tip], y: p.vertices.y[tip] });
    return pts;
  });
}

/** The hood stage (see the module comment), under S8's declaration. */
export function hoodStage(outline: readonly LatticePoint[], hood: number, cut: Table | undefined): PipelineStage<object | null, Record<string, unknown>> {
  const item = s8Stage();
  const entity = `district_bound:hood-${String(hood)}`;
  return Object.freeze({
    id: item.id,
    version: item.version,
    inputs: ['s1'],
    outputs: ['lanes', 'blocks', 'infill', 'hoods.outline'],
    streamKeys: [...item.streamKeys],
    invariants: [...item.invariants],
    ladder: item.ladder,
    workLimits: [...item.workLimits],
    budgetMs: item.budgetMs,
    batch: item.batch,
    lineageUnit: item.lineageUnit,
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: { get(k: string): unknown }): object | null {
      return model.get('s1') === undefined ? null : {};
    },
    run(input: object | null, ctx: PipelineContext): KernelResult<Record<string, unknown>> {
      if (input === null) return { ok: true, value: {}, warnings: [] };
      const k = ctx.kernel;
      const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as never }, stage: STAGES.S8 as never, rederivesFrom: STAGES.S8 as never, workLimit: 1_000_000_000 };
      const ins = k.tx(spec, (o) => k.geom.insertChain(o, outline.slice(), [{ role: 'district_bound', entity }], 'mandatory', { closed: true }));
      if (!ins.ok) return { ok: false, code: ins.code, detail: `hood ${String(hood)}: the outline: ${ins.detail}` };
      const face = outlineFace(k);
      if (face < 0) return { ok: false, code: 'E_INVARIANT', detail: `hood ${String(hood)}: no face inside the outline` };
      const live: LiveEntry[] = [];
      const m = mint([{ kind: 'district', key: { arena: GROUND, unit: lineageHash(TOWN_ROOT_KEY), stage: STAGES.S6 as never, epoch: 0, index: 0, reroll: 0 } }], live, [], ctx.seedKey)[0];
      live.push({ id: m.identity.id, lineage: m.identity.lineage });
      const own = k.tx(spec, (o) => k.geom.setOwner(o, [face], m.identity.id));
      if (!own.ok) return { ok: false, code: own.code, detail: `hood ${String(hood)}: the district's owner: ${own.detail}` };
      const district: District = { id: m.identity.id, kind: 'craft', quarter: 'quarter:hoods', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() };
      const sd: S8District = { district, lineage: [m.identity.lineage[0], m.identity.lineage[1]] as never, reroll: ctx.streamOpts(CONCERNS['cut.stop'], TOWN_ROOT).reroll, prosperity: PROSPERITY, density: DENSITY };
      const s8in: S8Input = { kernel: k, key: GROUND, seedKey: ctx.seedKey, epoch: 0, rung: 'CITY', districts: [sd], ways: [], seams: [], widths: new Map(), live, ...(cut === undefined ? {} : { tables: { cut } }) };
      const r = runS8(s8in, ctx as never);
      if (!r.ok) return { ok: false, code: r.code, detail: r.detail };
      return { ok: true, value: { ...r.value, 'hoods.outline': chainLines(k, 'district_bound', entity) }, warnings: r.warnings };
    },
  }) as unknown as PipelineStage<object | null, Record<string, unknown>>;
}

function empty(t: HoodTask, seed: number, setup: string | null, refused: string | null): HoodRecord {
  return {
    hood: t.hood.id,
    template: t.hood.template,
    seedIndex: t.seedIndex,
    seed,
    setup,
    refused,
    outline: [],
    lanes: [],
    blocks: [],
    warnings: {},
    census: { s8: 0, kernelDowngrades: 0, kernelWorkLimitHits: 0, unplaced: 0, degraded: 0, bugs: 0 },
  };
}

/** Runs one task (see the module comment). A throw is recorded on the task, never stops the run. */
export function runHood(t: HoodTask): HoodRecord {
  const seed = hoodSeed(t.seed, t.hood.id, t.seedIndex);
  const bp = { ...fixtureBlueprint({ ...(t.size.frameHa === null ? {} : { frameHa: t.size.frameHa }), ...(t.size.walledHa === null ? {} : { walledHa: t.size.walledHa }) }), seed: seed as Seed };
  try {
    const frame = baseArena(bp).frame;
    const outline = placedOutline(t.hood, Math.min(frame.widthCm, frame.heightCm) / 2);
    if (typeof outline === 'string') return empty(t, seed, outline, null);
    const registry = createRegistry();
    registerBase(registry);
    const product = registry.products.get('base');
    if (product === undefined) throw new Error('fusion-ng: the registry holds no base product');
    const keep = product.stages.filter((s) => s.id === STAGES.S1);
    product.stages.length = 0;
    for (const s of keep) product.stages.push(s);
    register(registry, hoodStage(outline, t.hood.id, t.cut) as unknown as PipelineStage);
    const { model, report } = run(registry, bp, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
    const census = {
      s8: 0,
      kernelDowngrades: report.kernel.downgrades,
      kernelWorkLimitHits: report.kernel.workLimitHits,
      unplaced: report.unplaced.length,
      degraded: report.requested.filter((x) => x.delivered !== 'full').length,
      bugs: report.bugs.length,
    };
    const warnings: Record<string, number> = {};
    for (const st of report.stages) if (st.name === 'S8') for (const [code, n] of Object.entries(st.warnings)) warnings[code] = (warnings[code] ?? 0) + n;
    const infill = model.data.get('infill') as S8Output['infill'] | undefined;
    const outlineLines = model.data.get('hoods.outline') as XYcm[][] | undefined;
    if (infill === undefined || outlineLines === undefined) {
      const failed = report.stages.find((s) => s.name === 'S8');
      return { ...empty(t, seed, null, `S8 did not run: ${JSON.stringify(failed?.warnings ?? {})}${report.bugs.length > 0 ? `; bugs ${report.bugs.map((b) => `${b.stage}:${b.cls}`).join(', ')}` : ''}`), census, warnings };
    }
    const refusedDistrict = infill.report.refused[0];
    const blocks = (model.data.get('blocks') as readonly Block[] | undefined) ?? [];
    const byId = new Map(blocks.map((b) => [b.id as string, b]));
    const lanes = (model.data.get('lanes') as readonly { id: string }[] | undefined) ?? [];
    const laneLines: XYcm[][] = [];
    for (const l of wayLines(model.kernel, lanes.map((w) => w.id as never), GROUND)) for (const runL of l.runs) laneLines.push(runL.points.map((q) => ({ x: q.x, y: q.y })));
    return {
      ...empty(t, seed, null, refusedDistrict === undefined ? null : `${refusedDistrict.code} ${refusedDistrict.detail}`),
      outline: outlineLines[0] ?? [],
      lanes: laneLines,
      blocks: infill.blockFaces.map((bf) => {
        const b = byId.get(bf.block);
        return { ring: bf.kerb.map((q) => ({ x: q.x, y: q.y })), content: b?.content ?? 'ordinary', depthClass: b?.depthClass ?? 'standard', interior: b?.interior ?? 'none' };
      }),
      warnings,
      census: { ...census, s8: infill.report.refused.length },
    };
  } catch (e) {
    return empty(t, seed, null, `threw: ${e instanceof Error ? e.message : String(e)}`);
  }
}
