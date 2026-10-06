// A generated face as a one-face district for S8 (M0-b-04; §4.6, §16 M0 (b)). The arena is a ground arena over a
// 12 km square frame (its outer ring at L0); the face's outer ring is inserted at L1 as a `district_bound` chain — a
// boundary with no spine, so the face's kerb is the face itself (§3.7) and every spine S8 meets is a lane of its own —
// and each hole as a `reserved` ring whose inside is a reservation's face (§4.6: "a reservation inside a face is a
// hole"). The district is minted as S6's first district and given the CITY band at prosperity 0.3, density 0.5 — the
// shipped bands' values M0-b-03's tests use (C-0162 (1)). The district face is found by area, not by ring equality:
// the insertion may move a vertex onto the lattice's attraction (checks/M0-b-03-notes.md N-14), so the face is the
// largest L1 face other than the frame's (C-XB04 (3)).
import {
  area2,
  attachIndex,
  createKernel,
  createPlat,
  faceRings,
  isFaceLive,
  seedKey,
  STAGES,
  type Cm,
  type FaceId,
  type Frame,
  type Kernel,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type PolygonCm,
} from '@plat/kernel';
import { districtCells, districtCounts, granularityBands, blockDepthRange, spineWidthsOf, type GranularityBands, type S8District, type S8Input } from '@plat/layout';
import { mint, type District, type Id, type LiveEntry } from '@plat/model';
import { rungProfile, type WorkLimitsTable } from '@plat/tables';

/** The ground arena (§2.2). */
export const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 });

/** Half the frame's side (cm): 6 km, so every CITY-scale face (inside ±2.5 km, M0-k-01) lies well inside it. */
export const FRAME_HALF_CM = 600_000;

/** The district's pass-1 values (C-0162 (1)'s pattern). */
export const PROSPERITY = 0.3;
export const DENSITY = 0.5;

function P(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}

/** The generated lifecycle (§2.8). */
function generated(): District['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

/** A built one-face district: its arena, kernel, width map, S8 input, the district's id and its scope counts. */
export interface FaceDistrict {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly widths: Map<Id, number>;
  readonly input: S8Input;
  readonly district: Id;
  readonly bands: GranularityBands;
  /** The district's L1 faces before S8 (1: the face itself). */
  readonly facesBefore: number;
  /** The scope counts the district's work laws read (§5.1 (5); BentCutFabric's `districtCounts`): the `faces` unit. */
  readonly units: { readonly faces: number; readonly vertices: number };
}

/** Options for a district: test-side tables and the deep factor (BentCutFabric's own knobs, S8Input). */
export interface FaceDistrictOptions {
  readonly workLimits?: WorkLimitsTable;
  readonly deepFactor?: number;
  readonly bands?: GranularityBands;
}

/** Live L1 faces owned by the district (BentCutFabric's `districtCells`). */
export function districtFaces(plat: Plat, district: Id): number {
  return districtCells(plat, district).length;
}

/**
 * Builds the one-face district of a generated polygon (outer ring counter-clockwise, holes clockwise, integer cm) and
 * its S8 input at `seed` (the derivation's seed key). Throws when the kernel refuses a ring (the face is not an S8
 * input; the harness counts it as a setup refusal).
 */
export function faceDistrict(polygon: PolygonCm, seed: number, opts: FaceDistrictOptions = {}): FaceDistrict {
  const side = FRAME_HALF_CM;
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const r0 = k.tx(spec(0, STAGES.S1), (o) => k.geom.insertChain(o, [P(-side, -side), P(side, -side), P(side, side), P(-side, side)], [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  if (!r0.ok) throw new Error(`faceDistrict: the frame: ${r0.code} ${r0.detail}`);
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    const a = k.geom.insertChain(o, polygon[0].map((q) => P(q.x, q.y)), [{ role: 'district_bound', entity: 'district_bound:f' }], 'mandatory', { closed: true });
    if (!a.ok) return { ok: false as const, code: a.code, detail: a.detail };
    for (let i = 1; i < polygon.length; i += 1) {
      const h = k.geom.insertChain(o, polygon[i].map((q) => P(q.x, q.y)), [{ role: 'reserved', entity: `reservation:h${String(i)}` }], 'mandatory', { closed: true });
      if (!h.ok) return { ok: false as const, code: h.code, detail: h.detail };
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(`faceDistrict: the rings: ${r1.code} ${r1.detail}`);
  // The district face: the largest L1 face but the frame's (whose outer ring is the frame); every other one a hole's.
  const frameArea2 = 2 * side * side;
  let face: FaceId = -1;
  let best = -1;
  const inner: FaceId[] = [];
  for (let f = 0; f < plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(plat, 1, f)) continue;
    const a = Math.abs(area2(faceRings(plat, 1, f)[0]));
    if (a >= frameArea2) continue;
    inner.push(f);
    if (a > best) {
      best = a;
      face = f;
    }
  }
  if (face < 0) throw new Error('faceDistrict: no district face');
  const holes = inner.filter((f) => f !== face);
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: 0, reroll: 0 } }], live, [], sk)[0];
  live.push({ id: m.identity.id, lineage: m.identity.lineage });
  const district: District = { id: m.identity.id, kind: 'craft', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() };
  const r2 = k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < holes.length; i += 1) {
      const r = k.geom.setOwner(o, [holes[i]], `reservation:h${String(i + 1)}`);
      if (!r.ok) return r;
    }
    return k.geom.setOwner(o, [face], district.id);
  });
  if (!r2.ok) throw new Error(`faceDistrict: owners: ${r2.code} ${r2.detail}`);
  const bands = opts.bands ?? granularityBands(PROSPERITY, rungProfile('CITY'));
  const sd: S8District = { district, lineage: [m.identity.lineage[0], m.identity.lineage[1]], prosperity: PROSPERITY, density: DENSITY, bands };
  const tables = opts.workLimits === undefined ? {} : { tables: { workLimits: opts.workLimits } };
  const input: S8Input = {
    kernel: k,
    key: GROUND,
    seedKey: sk,
    rung: 'CITY',
    districts: [sd],
    ways: [],
    seams: [],
    widths,
    live,
    ...tables,
    ...(opts.deepFactor === undefined ? {} : { deepFactor: opts.deepFactor }),
  };
  const [eLoM] = blockDepthRange(bands, undefined);
  const cells = districtCells(plat, district.id);
  const units = districtCounts(plat, cells, eLoM * 100);
  return { plat, k, widths, input, district: district.id, bands, facesBefore: cells.length, units };
}
