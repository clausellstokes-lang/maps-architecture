// M0-b-03's test support: indexed ground arenas whose L1 faces are bounded by ways of declared widths and owned by
// districts, the model records S8 reads (District, Way, the minimal Seam of C-0046), and readers of the committed arena
// written from the arena's own tables (never through the code under test). No vitest import, so a probe can load it.
import {
  attachIndex,
  createKernel,
  createPlat,
  dest,
  faceRings,
  faceWalk,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  obb,
  pointLocate,
  rowKey,
  rowsOn,
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
} from '@plat/kernel';
import { lineageHash, mint, type District, type Id, type LiveEntry, type Seam, type Way } from '@plat/model';
import { rungProfile } from '@plat/tables';
import { granularityBands, runS8, spineWidthsOf, type S8District, type S8Input } from '../../../src/index.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** A lattice point. */
export function P(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

/** The generated lifecycle. */
export function generated(): Way['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}

/** One way of a fixture: its id, class, width (cm), points and whether it is closed. */
export interface FixtureWay {
  readonly id: Id;
  readonly cls: Way['class'];
  readonly widthCm: number;
  readonly points: readonly LatticePoint[];
  readonly closed?: boolean;
}

/** One district of a fixture: a point inside each of its faces, its pass-1 values. */
export interface FixtureDistrict {
  readonly seeds: readonly LatticePoint[];
  readonly prosperity: number;
  readonly density: number;
  readonly walled?: boolean;
}

/** A built fixture: the arena, the kernel, the width map, the records and S8's input. */
export interface Fixture {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly widths: Map<Id, number>;
  readonly ways: Way[];
  readonly districts: S8District[];
  readonly seams: Seam[];
  readonly input: S8Input;
}

/** The fixtures' seed. */
export const SEED = 7;

/**
 * An indexed ground arena over a frame of `sideCm`, its outer ring at L0, the ways at L1 (one callback batch), each
 * district's faces owned by it (found by its seed points), the records, and the seams: one per way that has a face of
 * two different districts on its two sides (its sides those districts, in address order).
 */
export function fixture(sideCm: number, fixtureWays: readonly FixtureWay[], fixtureDistricts: readonly FixtureDistrict[], opts: { seed?: number; extraL1?: (k: Kernel, plat: Plat) => void } = {}): Fixture {
  const frame: Frame = { widthCm: sideCm as Cm, heightCm: sideCm as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const h = sideCm;
  const ring = [P(-h, -h), P(h, -h), P(h, h), P(-h, h)];
  const r0 = k.tx(spec(0, STAGES.S1), (o) => k.geom.insertChain(o, ring, [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  if (!r0.ok) throw new Error(`fixture: the outer ring: ${r0.code} ${r0.detail}`);
  for (const w of fixtureWays) widths.set(w.id, w.widthCm);
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    for (const w of fixtureWays) {
      const r = k.geom.insertChain(o, w.points, [{ role: 'way', entity: w.id }], 'mandatory', w.closed === true ? { closed: true } : {});
      if (!r.ok) return r;
    }
    return { ok: true, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(`fixture: the ways: ${r1.code} ${r1.detail}`);
  opts.extraL1?.(k, plat);
  const sk = seedKey(opts.seed ?? SEED);
  const live: LiveEntry[] = [];
  const minted = fixtureDistricts.map((_, i) => {
    const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: i, reroll: 0 } }], live, [], sk)[0];
    live.push({ id: m.identity.id, lineage: m.identity.lineage });
    return m;
  });
  const r2 = k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < fixtureDistricts.length; i += 1) {
      const faces: FaceId[] = [];
      for (const s of fixtureDistricts[i].seeds) {
        const at = pointLocate(plat, GROUND, 1, s);
        if (at.on !== 'face' || at.level !== 1) return { ok: false as const, code: 'E_INVARIANT' as const, detail: `seed (${s.x}, ${s.y}) is in no L1 face` };
        faces.push(at.face);
      }
      const r = k.geom.setOwner(o, faces, minted[i].identity.id);
      if (!r.ok) return r;
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r2.ok) throw new Error(`fixture: the districts: ${r2.code} ${r2.detail}`);
  const ways: Way[] = fixtureWays.map((w) => ({
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
  const profile = rungProfile('CITY');
  const districts: S8District[] = fixtureDistricts.map((d, i) => {
    const district: District = {
      id: minted[i].identity.id,
      kind: 'craft',
      quarter: 'quarter:q',
      faces: { owner: minted[i].identity.id, level: 1 },
      seams: [],
      growthStage: 1,
      fabric: 'bent-cut',
      fabricParams: {},
      lifecycle: generated(),
    };
    return { district, lineage: minted[i].identity.lineage, prosperity: d.prosperity, density: d.density, bands: granularityBands(d.prosperity, profile), walled: d.walled ?? false };
  });
  // The seams: a way with two districts' faces on its two sides.
  const seams: Seam[] = [];
  for (const w of ways) {
    for (const list of waySideOwners(plat, w.id)) {
      if (!list.every((x) => districts.some((d) => d.district.id === x))) continue;
      const lh = lineageHash({ arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: 1000 + seams.length, reroll: 0 });
      seams.push({ id: `seam:${String(lh[0])}`, sides: [list[0], list[1]], edges: [{ chain: { role: 'way', entity: w.id }, type: 'way', wayClass: w.class, widthCm: w.width as Cm, hard: false }], portals: [] });
    }
  }
  const input: S8Input = { kernel: k, key: GROUND, seedKey: sk, rung: 'CITY', districts, ways, seams, widths, live };
  return { plat, k, widths, ways, districts, seams, input };
}

/** The half-edge → L1 face map of an arena (its own walk). */
export function halfEdgeFaces(plat: Plat): Map<number, FaceId> {
  const m = new Map<number, FaceId>();
  for (let f = 0; f < plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(plat, 1, f)) continue;
    for (const ring of faceWalk(plat, 1, f)) for (const h of ring) m.set(h, f);
  }
  return m;
}

/** The district pairs a way separates: an edge of the way with two different owners on its two sides. */
export function waySideOwners(plat: Plat, wayId: Id): Id[][] {
  const hf = halfEdgeFaces(plat);
  const pairs = new Map<string, Id[]>();
  for (const [h, f] of hf) {
    if (!rowsOn(plat, 'edge', h).some((r) => rowKey(plat, r).role === 'way' && rowKey(plat, r).entity === wayId)) continue;
    const g = hf.get(h ^ 1);
    if (g === undefined) continue;
    const a = ownerOf(plat, f);
    const b = ownerOf(plat, g);
    if (a === '' || b === '' || a === b) continue;
    const pair = [a, b].sort();
    pairs.set(pair.join('|'), pair);
  }
  return [...pairs.values()];
}

/** The address id owning an L1 face, or ''. */
export function ownerOf(plat: Plat, f: FaceId): Id {
  const h = plat.faces[1].owner[f];
  return h < 0 ? '' : idOf(plat, h);
}

/** Every live L1 face owned by `owner`, with its outer ring (the arena's own walk). */
export function facesOf(plat: Plat, owner: Id): { face: FaceId; outer: LatticePoint[] }[] {
  const out: { face: FaceId; outer: LatticePoint[] }[] = [];
  for (let f = 0; f < plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(plat, 1, f) || ownerOf(plat, f) !== owner) continue;
    out.push({ face: f, outer: faceRings(plat, 1, f)[0] });
  }
  return out;
}

/** The OBB minor extent of a ring (cm). */
export function minorOf(ring: readonly LatticePoint[]): number {
  const b = obb(ring);
  return b.ok ? b.value.minorCm : 0;
}

/** The points of every live edge carrying ('way', id), as segments. */
export function waySegments(plat: Plat, id: Id): [LatticePoint, LatticePoint][] {
  const out: [LatticePoint, LatticePoint][] = [];
  for (let e = 0; e < 2 * plat.slots.pair.top; e += 2) {
    if (!isHalfEdgeLive(plat, e)) continue;
    if (!rowsOn(plat, 'edge', e).some((r) => rowKey(plat, r).role === 'way' && rowKey(plat, r).entity === id)) continue;
    const a = plat.halfEdges.origin[e];
    const b = dest(plat, e);
    out.push([P(plat.vertices.x[a], plat.vertices.y[a]), P(plat.vertices.x[b], plat.vertices.y[b])]);
  }
  return out;
}

/** A context for the stage: no report sink. */
export const NO_CTX = { report: undefined } as const;

/**
 * The two-district fixture: a 400 m × 300 m land inside a ring road (secondary, 6 m), split by a north–south arterial
 * (primary, 10 m) into a west district and an east district — the arterial their seam.
 */
export function twoDistricts(opts: { seed?: number; prosperity?: number } = {}): Fixture {
  const W = 40_000;
  const H = 30_000;
  return fixture(
    60_000,
    [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(W / 2, 0), P(W / 2, H)] },
    ],
    [
      { seeds: [P(W / 4, H / 2)], prosperity: opts.prosperity ?? 0.3, density: 0.5 },
      { seeds: [P((3 * W) / 4, H / 2)], prosperity: opts.prosperity ?? 0.3, density: 0.5 },
    ],
    opts.seed === undefined ? {} : { seed: opts.seed },
  );
}

/** Runs S8 on a fixture's input; throws on a refusal of the stage itself. */
export function runFixture(f: Fixture, patch: Partial<S8Input> = {}): import('../../../src/index.js').S8Output {
  const r = runS8({ ...f.input, ...patch }, NO_CTX as never);
  if (!r.ok) throw new Error(`S8 refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** The interior angle (degrees, in [0, 90]) between a segment's direction and a line's. */
export function crossingDeg(a: LatticePoint, b: LatticePoint, c: LatticePoint, d: LatticePoint): number {
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const vx = d.x - c.x;
  const vy = d.y - c.y;
  const cos = Math.abs(ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
  return (Math.acos(Math.min(1, cos)) * 180) / Math.PI;
}
