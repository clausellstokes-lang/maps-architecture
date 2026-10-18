// The rung fixtures' building blocks (M0-x-05): a test-side workLimits table with one low floor (M0-f-03a's loader,
// `parseWorkLimits`, over the shipped table's rows with one counter's law replaced), test-side TerrainStrategies over
// analytic height functions (the base's flat strategy with the raster written, C-0016's frame law), the small flat and
// river blueprints, and S8's districts on a hand-built ground arena (a one-face district bounded by a `district_bound`
// ring with its holes reserved, as M0-b-03's and M0-b-04's harnesses build them; or faces bounded by ways of declared
// widths, as M0-b-03's two-district fixture). No vitest import: the bench loads it.
import {
  area2,
  attachIndex,
  createKernel,
  createPlat,
  err,
  faceRings,
  isFaceLive,
  pointLocate,
  seedKey,
  STAGES,
  type Cm,
  type FaceId,
  type Frame,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type PolygonCm,
} from '@plat/kernel';
import { FLAT_BLUEPRINT, granularityBands, RIVER_BLUEPRINT, spineWidthsOf, type BaseBlueprint, type S8District, type S8Input } from '@plat/layout';
import { mint, type District, type Id, type LiveEntry, type Seam, type StageContext, type Terrain, type Way } from '@plat/model';
import { flatTerrain, GROUND_KEY, siteFrame, terrainParams, TERRAIN_ID, type TerrainStrategy } from '@plat/site';
import { loadWorkLimits, parseWorkLimits, rungProfile, type BaseRung, type TableView, type WorkLimitsTable } from '@plat/tables';

export const GROUND: PlatKey = GROUND_KEY;

/** A lattice point. */
export function P(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

// ---- the work-limit table -----------------------------------------------------------------------------------------------

/**
 * The shipped workLimits table with `counter`'s law replaced by a fixed floor (`perUnit` 0): the test-side table one
 * F-WORK fixture runs with (C-0085: "a test-side workLimits table with one low floor per run"), checked by M0-f-03a's
 * loader like the shipped one.
 */
export function lowFloor(counter: string, floor: number, base: WorkLimitsTable = loadWorkLimits()): WorkLimitsTable {
  const t = base.table;
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, row] of t.rows) {
    const cells: Record<string, unknown> = {};
    for (const [ck, c] of row) cells[ck] = { ...c };
    rows[rk] = cells;
  }
  const row = rows[counter];
  if (row === undefined) throw new RangeError(`lowFloor: the work-limit table has no counter '${counter}'`);
  row.floor = { ...(row.floor as object), value: floor };
  row.perUnit = { ...(row.perUnit as object), value: 0 };
  return parseWorkLimits({ table: t.id, version: t.version, section: t.section, rows });
}

// ---- terrains and blueprints ----------------------------------------------------------------------------------------------

/**
 * A TerrainStrategy over an analytic height (metres, arena centimetres): the frame by the base frame law (as the base's
 * flat strategy), each raster cell's centre set to `heightM(x, y)`, rounded to the centimetre.
 */
export function heightStrategy(heightM: (x: number, y: number) => number): TerrainStrategy {
  return Object.freeze({
    terrain(bp: { size: BaseBlueprint['size'] }, ctx: StageContext<never>, _k: unknown): KernelResult<Terrain> {
      const c = ctx as unknown as { rung: ReturnType<typeof rungProfile>; tables: TableView; epoch: number };
      const rung = c.rung.rung as BaseRung;
      const frame = siteFrame(bp.size, c.rung, c.tables);
      if (!frame.ok) return err(frame.code, frame.detail);
      const made = flatTerrain({ id: TERRAIN_ID, key: GROUND_KEY, frame: frame.value, params: terrainParams(c.tables, rung), epoch: c.epoch }, 0, 0);
      if (!made.ok) return made;
      const t = made.value;
      for (let j = 0; j < t.rows; j += 1) {
        const y = t.originY + (j + 0.5) * t.cellCm;
        for (let i = 0; i < t.cols; i += 1) {
          const x = t.originX + (i + 0.5) * t.cellCm;
          t.heightCm[j * t.cols + i] = Math.round(heightM(x, y) * 100);
        }
      }
      return made;
    },
  }) as unknown as TerrainStrategy;
}

/**
 * The small flat town: the flat fixture's site in a 400 ha frame with 30 ha walled (M0-c-02's and M0-c-03's small site),
 * or 60 ha (M0-c-05's, whose S5c grows streets on both sides of its arterials).
 */
export function smallFlat(terrain = 'flat', walledHa = 30): BaseBlueprint {
  return Object.freeze({ ...FLAT_BLUEPRINT, size: Object.freeze({ ...FLAT_BLUEPRINT.size, areaHa: 400 }), walledHa, terrain });
}

/** The small river town: the river fixture's site (a river from the west) in the same frame, on `terrain`. */
export function smallRiver(terrain = 'base', areaHa = 400, river: NonNullable<BaseBlueprint['site']['river']> = RIVER_BLUEPRINT.site.river as NonNullable<BaseBlueprint['site']['river']>): BaseBlueprint {
  return Object.freeze({ ...RIVER_BLUEPRINT, size: Object.freeze({ ...RIVER_BLUEPRINT.size, areaHa }), site: Object.freeze({ ...RIVER_BLUEPRINT.site, river }), walledHa: 30, terrain });
}

/** A valley running north to south: 2 % fall southward from 50 m, a trough 6 m deep and 600 m across along x = 0. */
export function valley(x: number, y: number): number {
  const t = x / 100 / 300;
  const trough = Math.abs(t) >= 1 ? 0 : -6 * (1 - t * t) * (1 - t * t);
  return 50 + 0.02 * (y / 100) + trough;
}

/** A bowl of `depthM` and `radiusM` at (cx, cy) metres. */
function bowl(xm: number, ym: number, cx: number, cy: number, radiusM: number, depthM: number): number {
  const dx = xm - cx;
  const dy = ym - cy;
  const t2 = (dx * dx + dy * dy) / (radiusM * radiusM);
  return t2 >= 1 ? 0 : -depthM * (1 - t2) * (1 - t2);
}

/** The valley with a sink on its axis 200 m north of the centre, 3 m deep, 50 m in radius (F-RIVER's carve). */
export function valleyWithSink(x: number, y: number): number {
  return valley(x, y) + bowl(x / 100, y / 100, 0, 200, 50, 3);
}

/** The valley with a 6 m ridge one raster row wide across the arena 300 m north (F-RIVER's re-trace). */
export function valleyWithRidge(x: number, y: number): number {
  return valley(x, y) + (Math.abs(y - 30_000) < 400 ? 6 : 0);
}

/** Ground falling 2 % eastward: a river from the north turns east and leaves far from the core (F-RIVER's inlet rung). */
export function eastward(x: number, y: number): number {
  return 50 - 0.02 * (x / 100) + 0.001 * (y / 100);
}

// ---- S8's districts on a hand-built arena ----------------------------------------------------------------------------------

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}

function generated(): Way['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

/** An indexed ground arena over a square frame, its outer ring at L0, and its kernel over a width map. */
function arena(sideCm: number): { plat: Plat; k: Kernel; widths: Map<Id, number> } {
  const frame: Frame = { widthCm: sideCm as Cm, heightCm: sideCm as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const r = k.tx(spec(0, STAGES.S1), (o) => k.geom.insertChain(o, [P(-sideCm, -sideCm), P(sideCm, -sideCm), P(sideCm, sideCm), P(-sideCm, sideCm)], [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  if (!r.ok) throw new Error(`ladders: the arena's outer ring was refused: ${r.code} ${r.detail}`);
  return { plat, k, widths };
}

function districtRecord(sk: ReturnType<typeof seedKey>, i: number, live: LiveEntry[]): { district: District; lineage: [number, number] } {
  const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: i, reroll: 0 } }], live, [], sk)[0];
  live.push({ id: m.identity.id, lineage: m.identity.lineage });
  return {
    district: { id: m.identity.id, kind: 'craft', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() },
    lineage: [m.identity.lineage[0], m.identity.lineage[1]],
  };
}

function s8District(d: { district: District; lineage: [number, number] }): S8District {
  return { district: d.district, lineage: d.lineage, prosperity: 0.3, density: 0.5, bands: granularityBands(0.3, rungProfile('CITY')) };
}

/** A built S8 case: the arena, the kernel and S8's input. */
export interface S8Case {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly input: S8Input;
}

/**
 * A polygon (its outer ring, then its holes) as a one-face district (M0-b-04's F-CUT harness, C-0242): the outer ring an
 * L1 `district_bound` chain (no spine: the kerb is the face), each hole a reservation's `reserved` ring; the district
 * face the largest inner L1 face, every other a reservation's; minted at index 0 under seedKey(seed); prosperity 0.3,
 * density 0.5, CITY.
 */
export function districtOf(polygon: PolygonCm | readonly (readonly LatticePoint[])[], seed: number): S8Case {
  const side = 600_000;
  const { plat, k, widths } = arena(side);
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    const a = k.geom.insertChain(o, polygon[0].map((q) => P(q.x, q.y)), [{ role: 'district_bound', entity: 'district_bound:f' }], 'mandatory', { closed: true });
    if (!a.ok) return err(a.code, a.detail);
    for (let i = 1; i < polygon.length; i += 1) {
      const h = k.geom.insertChain(o, polygon[i].map((q) => P(q.x, q.y)), [{ role: 'reserved', entity: `reservation:h${String(i)}` }], 'mandatory', { closed: true });
      if (!h.ok) return err(h.code, h.detail);
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(`ladders: the district's rings were refused: ${r1.code} ${r1.detail}`);
  let face: FaceId = -1;
  let best = -1;
  const inner: FaceId[] = [];
  for (let f = 0; f < plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(plat, 1, f)) continue;
    const a = Math.abs(area2(faceRings(plat, 1, f)[0]));
    if (a >= 2 * side * side) continue;
    inner.push(f);
    if (a > best) {
      best = a;
      face = f;
    }
  }
  if (face < 0) throw new Error('ladders: no district face');
  const holes = inner.filter((f) => f !== face);
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const d = districtRecord(sk, 0, live);
  const r2 = k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < holes.length; i += 1) {
      const r = k.geom.setOwner(o, [holes[i]], `reservation:h${String(i + 1)}`);
      if (!r.ok) return r;
    }
    return k.geom.setOwner(o, [face], d.district.id);
  });
  if (!r2.ok) throw new Error(`ladders: the district's owners were refused: ${r2.code} ${r2.detail}`);
  return { plat, k, input: { kernel: k, key: GROUND, seedKey: sk, rung: 'CITY', districts: [s8District(d)], ways: [], seams: [], widths, live } };
}

/** One way of a ways case: its id, class, width (cm), points and whether it is closed. */
export interface CaseWay {
  readonly id: Id;
  readonly cls: Way['class'];
  readonly widthCm: number;
  readonly points: readonly LatticePoint[];
  readonly closed?: boolean;
}

/**
 * Districts whose faces are bounded by ways of declared widths (M0-b-03's fixture form): the ways at L1 in one batch,
 * each district's faces found by a seed point and owned by it; no seams (each district bounded by its own ring).
 */
export function waysCase(sideCm: number, ways: readonly CaseWay[], seeds: readonly (readonly LatticePoint[])[], seed: number): S8Case {
  const { plat, k, widths } = arena(sideCm);
  for (const w of ways) widths.set(w.id, w.widthCm);
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    for (const w of ways) {
      const r = k.geom.insertChain(o, w.points, [{ role: 'way', entity: w.id }], 'mandatory', w.closed === true ? { closed: true } : {});
      if (!r.ok) return err(r.code, r.detail);
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(`ladders: the ways were refused: ${r1.code} ${r1.detail}`);
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const ds = seeds.map((_, i) => districtRecord(sk, i, live));
  const r2 = k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < seeds.length; i += 1) {
      const faces: FaceId[] = [];
      for (const s of seeds[i]) {
        const at = pointLocate(plat, GROUND, 1, s);
        if (at.on !== 'face' || at.level !== 1) return err('E_INVARIANT', `ladders: the seed (${String(s.x)}, ${String(s.y)}) is in no L1 face`);
        faces.push(at.face);
      }
      const r = k.geom.setOwner(o, faces, ds[i].district.id);
      if (!r.ok) return r;
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r2.ok) throw new Error(`ladders: the districts were refused: ${r2.code} ${r2.detail}`);
  const records: Way[] = ways.map((w) => ({
    id: w.id,
    class: w.cls,
    spine: { role: 'way', entity: w.id },
    width: w.widthCm as Cm,
    from: { kind: 'junction', id: 'junction:a' },
    to: { kind: 'junction', id: 'junction:b' },
    growthStage: 1,
    epoch: 0,
    provisional: false,
    lifecycle: generated(),
  }));
  const seams: Seam[] = [];
  return { plat, k, input: { kernel: k, key: GROUND, seedKey: sk, rung: 'CITY', districts: ds.map(s8District), ways: records, seams, widths, live } };
}
