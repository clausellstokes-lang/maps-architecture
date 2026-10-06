// M0-b-03's testkit-side support (C-0122): arenas whose L1 faces are districts for S8 — a face of M0-k-01's M0 (b)
// face set as a one-face district (its outer ring an L1 boundary with no spine, its holes reservations), and two
// districts sharing an arterial — the S8 input over them, and a read-only kerb (a callback batch that writes nothing,
// §3.3: a batch with no op commits nothing). The package is reached only through `@plat/layout` (C-0122).
import {
  attachIndex,
  createKernel,
  createPlat,
  faceRings,
  idOf,
  isFaceLive,
  pointLocate,
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
import { granularityBands, spineWidthsOf, type S8District, type S8Input } from '@plat/layout';
import { mint, type District, type Id, type LiveEntry, type Seam, type Way } from '@plat/model';
import { rungProfile } from '@plat/tables';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

export function P(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

export function generated(): Way['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}

/** The address id owning an L1 face, or ''. */
export function ownerOf(plat: Plat, f: FaceId): Id {
  const h = plat.faces[1].owner[f];
  return h < 0 ? '' : idOf(plat, h);
}

/** An indexed ground arena over a square frame, its outer ring at L0, and its kernel over a width map. */
export function arena(sideCm: number): { plat: Plat; k: Kernel; widths: Map<Id, number> } {
  const frame: Frame = { widthCm: sideCm as Cm, heightCm: sideCm as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const ring = [P(-sideCm, -sideCm), P(sideCm, -sideCm), P(sideCm, sideCm), P(-sideCm, sideCm)];
  const r = k.tx(spec(0, STAGES.S1), (o) => k.geom.insertChain(o, ring, [{ role: 'margin', entity: 'terrain:t' }], 'mandatory', { closed: true }));
  if (!r.ok) throw new Error(`arena: ${r.code} ${r.detail}`);
  return { plat, k, widths };
}

/** One district record, minted at index i of S6's run. */
function districtOf(sk: ReturnType<typeof seedKey>, i: number, live: LiveEntry[]): { district: District; lineage: [number, number] } {
  const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: i, reroll: 0 } }], live, [], sk)[0];
  live.push({ id: m.identity.id, lineage: m.identity.lineage });
  return {
    district: { id: m.identity.id, kind: 'craft', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() },
    lineage: [m.identity.lineage[0], m.identity.lineage[1]],
  };
}

/** A built one-face district. */
export interface FaceCase {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly input: S8Input;
  readonly district: Id;
}

/**
 * A face of the M0 (b) set as a one-face district: its outer ring an L1 `district_bound` chain (no spine: its kerb is
 * the face), each hole a reservation's `reserved` ring and face. The district's pass-1 values: prosperity 0.3, density
 * 0.5 (C-0162 (1)'s pattern: the shipped bands' values).
 */
export function faceCase(polygon: PolygonCm, seed: number): FaceCase {
  const side = 600_000;
  const { plat, k, widths } = arena(side);
  const outer = polygon[0].map((q) => P(q.x, q.y));
  const holes = polygon.slice(1).map((r) => r.map((q) => P(q.x, q.y)));
  const r1 = k.tx(spec(1, STAGES.S5), (o) => {
    const a = k.geom.insertChain(o, outer, [{ role: 'district_bound', entity: 'district_bound:f' }], 'mandatory', { closed: true });
    if (!a.ok) return { ok: false as const, code: a.code, detail: a.detail };
    for (let i = 0; i < holes.length; i += 1) {
      const h = k.geom.insertChain(o, holes[i], [{ role: 'reserved', entity: `reservation:h${String(i)}` }], 'mandatory', { closed: true });
      if (!h.ok) return { ok: false as const, code: h.code, detail: h.detail };
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r1.ok) throw new Error(`faceCase: the rings: ${r1.code} ${r1.detail}`);
  // The faces: each hole's (the face its ring bounds on its inside) and the district's (the outer ring's inside).
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const d = districtOf(sk, 0, live);
  const sameRing = (a: readonly LatticePoint[], b: readonly LatticePoint[]): boolean => a.length === b.length && b.every((q) => a.some((p) => p.x === q.x && p.y === q.y));
  let face: FaceId = -1;
  const holeFaces: FaceId[] = [];
  for (let f = 0; f < plat.slots.face[1].top; f += 1) {
    if (!isFaceLive(plat, 1, f)) continue;
    const rings = faceRings(plat, 1, f);
    if (sameRing(rings[0], outer)) face = f;
    else if (holes.some((h) => sameRing(rings[0], h))) holeFaces.push(f);
  }
  if (face < 0) throw new Error('faceCase: the district face was not found');
  const r2 = k.tx(spec(1, STAGES.S6), (o) => {
    for (let i = 0; i < holeFaces.length; i += 1) {
      const r = k.geom.setOwner(o, [holeFaces[i]], `reservation:h${String(i)}`);
      if (!r.ok) return r;
    }
    return k.geom.setOwner(o, [face], d.district.id);
  });
  if (!r2.ok) throw new Error(`faceCase: owners: ${r2.code} ${r2.detail}`);
  const sd: S8District = { district: d.district, lineage: d.lineage, prosperity: 0.3, density: 0.5, bands: granularityBands(0.3, rungProfile('CITY')) };
  return { plat, k, district: d.district.id, input: { kernel: k, key: GROUND, seedKey: sk, rung: 'CITY', districts: [sd], ways: [], seams: [], widths, live } };
}

/** The kerb of an L1 face, read inside a callback batch that writes nothing (so nothing commits). */
export function kerbNow(k: Kernel, face: FaceId): LatticePoint[][] {
  let out: LatticePoint[][] = [];
  const r = k.tx(spec(1, STAGES.S8), (_o) => {
    const kr = k.geom.kerb(face);
    if (!kr.ok) return kr;
    out = kr.value.map((ring) => ring.slice());
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!r.ok) throw new Error(`kerbNow: ${r.code} ${r.detail}`);
  return out;
}

/** The L1 face holding a lattice point, or −1. */
export function faceAt(plat: Plat, q: LatticePoint): FaceId {
  const at = pointLocate(plat, GROUND, 1, q);
  return at.on === 'face' && at.level === 1 ? at.face : -1;
}

/** A built two-district case: the arena's builder (for a fresh arena per run), the records and the S8 input's parts. */
export interface TwoCase {
  readonly build: () => { plat: Plat; k: Kernel; widths: Map<Id, number> };
  readonly districts: S8District[];
  readonly ways: Way[];
  readonly seams: Seam[];
  readonly seed: number;
}

/**
 * Two districts in a 400 m × 300 m ring road (secondary, 6 m) split by an arterial (primary, 10 m) — their seam. `build`
 * makes a fresh arena with the ways and owners every time it is called, so each run starts from the same state.
 */
export function twoCase(seed = 7): TwoCase {
  const W = 40_000;
  const H = 30_000;
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const a = districtOf(sk, 0, live);
  const b = districtOf(sk, 1, live);
  const ways: Way[] = [
    { id: 'way:ring', class: 'secondary', spine: { role: 'way', entity: 'way:ring' }, width: 600 as Cm, from: { kind: 'junction', id: 'junction:a' }, to: { kind: 'junction', id: 'junction:b' }, growthStage: 1, epoch: 0, provisional: false, lifecycle: generated() },
    { id: 'way:art', class: 'primary', spine: { role: 'way', entity: 'way:art' }, width: 1000 as Cm, from: { kind: 'junction', id: 'junction:a' }, to: { kind: 'junction', id: 'junction:b' }, growthStage: 1, epoch: 0, provisional: false, lifecycle: generated() },
  ];
  const build = (): { plat: Plat; k: Kernel; widths: Map<Id, number> } => {
    const made = arena(60_000);
    for (const w of ways) made.widths.set(w.id, w.width as number);
    const r1 = made.k.tx(spec(1, STAGES.S5), (o) => {
      const r = made.k.geom.insertChain(o, [P(0, 0), P(W, 0), P(W, H), P(0, H)], [{ role: 'way', entity: 'way:ring' }], 'mandatory', { closed: true });
      if (!r.ok) return { ok: false as const, code: r.code, detail: r.detail };
      const s = made.k.geom.insertChain(o, [P(W / 2, 0), P(W / 2, H)], [{ role: 'way', entity: 'way:art' }], 'mandatory');
      if (!s.ok) return { ok: false as const, code: s.code, detail: s.detail };
      return { ok: true as const, value: undefined, warnings: [] };
    });
    if (!r1.ok) throw new Error(`twoCase: ${r1.code} ${r1.detail}`);
    const r2 = made.k.tx(spec(1, STAGES.S6), (o) => {
      const fa = faceAt(made.plat, P(W / 4, H / 2));
      const fb = faceAt(made.plat, P((3 * W) / 4, H / 2));
      const x = made.k.geom.setOwner(o, [fa], a.district.id);
      if (!x.ok) return x;
      return made.k.geom.setOwner(o, [fb], b.district.id);
    });
    if (!r2.ok) throw new Error(`twoCase: owners ${r2.code} ${r2.detail}`);
    return made;
  };
  const profile = rungProfile('CITY');
  const districts: S8District[] = [a, b].map((d) => ({ district: d.district, lineage: d.lineage, prosperity: 0.3, density: 0.5, bands: granularityBands(0.3, profile) }));
  const ids = [a.district.id, b.district.id].sort();
  const seams: Seam[] = [{ id: 'seam:art', sides: [ids[0], ids[1]], edges: [{ chain: { role: 'way', entity: 'way:art' }, type: 'way', wayClass: 'primary', widthCm: 1000 as Cm, hard: false }], portals: [] }];
  return { build, districts, ways, seams, seed };
}
