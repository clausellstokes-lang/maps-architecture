// S8's smallest state (M0-x-06; C-0100: "the stage's own Stage object on a prepared arena"; C-0272 (5)). An indexed
// ground arena of a few hectares: its outer ring at L0, a ring road (secondary, 6 m) and a north–south arterial
// (primary, 10 m) at L1 splitting the land inside into a west and an east district, each district's faces owned by it,
// the minimal seam the arterial is between them (C-0046) — M0-b-03's S8 reads exactly these records (C-0237 (9)). The
// size and the arterial's position are drawn from the fixture's seed (its own mulberry32 source, never the code under
// test's). A degenerate kind adds, inside the west district, the geometry that carries it to S8's faces (C-0272 (5)):
//   zero-length    the arterial given with every point twice (zero-length segments the kernel decimates at insertion);
//   zero-area      a dead-end way into the face — an antenna: the face's ring runs out along it and back (area 0);
//   self-touching  a closed loop way touching the ring road at one vertex: the face between them pinched there;
//   collinear      a way along the ring road's south side and on past its corner, folded back on itself;
//   coincident     the west half of the ring road laid again as a way of its own (one shared stretch, merged rows).
import { attachIndex, createKernel, createPlat, err, ok, pointLocate, seedKey, STAGES, type Cm, type FaceId, type Frame, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type Plat, type PlatKey } from '@plat/kernel';
import { lineageHash, mint, type District, type Id, type LiveEntry, type Seam, type Way } from '@plat/model';
import { granularityBands, spineWidthsOf, type S8District, type S8Input } from '@plat/layout';
import { rungProfile } from '@plat/tables';
import { lp, type DegenerateKind } from './kinds.js';

const GROUND: PlatKey = { layer: 'ground', part: 0 };

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 };
}

/** The fixture's own seeded source (mulberry32): the geometry's draws, never the code under test's. */
export function fixtureRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generated(): Way['lifecycle'] {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };
}

/** One way of the fixture. */
interface FixtureWay {
  readonly id: Id;
  readonly cls: Way['class'];
  readonly widthCm: number;
  readonly points: readonly LatticePoint[];
  readonly closed?: boolean;
}

/** S8's prepared state: the arena, the façade, the records and S8's input. */
export interface S8State {
  readonly plat: Plat;
  readonly kernel: Kernel;
  readonly input: S8Input;
  /** The land inside the ring road (cm, [x0, y0, x1, y1]) and the arterial's x. */
  readonly box: readonly [number, number, number, number];
  readonly arterialX: number;
  /** The extra ways the kind laid (their ids). */
  readonly extra: readonly Id[];
}

/**
 * The two-district state at `seed`, with the kind's geometry in the west district (none for `null`), its land `scale`
 * times the base size (1: 90 – 140 m by 70 – 110 m, a few cuts). Throws when the
 * fixture's own batches are refused — a fixture that cannot be built is the fixture's error, never S8's.
 */
export function s8State(seed: number, kind: DegenerateKind | null, opts: { readonly scale?: number } = {}): S8State {
  const rand = fixtureRandom(seed);
  const scale = opts.scale ?? 1;
  const W = Math.round((9_000 + Math.round(rand() * 5_000)) * scale);
  const H = Math.round((7_000 + Math.round(rand() * 4_000)) * scale);
  const ax = Math.round(W * (0.4 + 0.2 * rand()));
  const side = 2 * Math.max(W, H);
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const kernel = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const h = side;
  const outer = [lp(-h, -h), lp(h, -h), lp(h, h), lp(-h, h)];
  const r0 = kernel.tx(spec(0, STAGES.S1), (o) => kernel.geom.insertChain(o, outer, [{ role: 'margin', entity: 'terrain:edge' }], 'mandatory', { closed: true }));
  if (!r0.ok) throw new Error(`s8State: the outer ring: ${r0.code} ${r0.detail}`);
  const ways: FixtureWay[] = [
    { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [lp(0, 0), lp(W, 0), lp(W, H), lp(0, H)], closed: true },
    { id: 'way:art', cls: 'primary', widthCm: 1000, points: [lp(ax, 0), lp(ax, H)] },
  ];
  const extra: FixtureWay[] = [];
  const mx = Math.round(ax / 2);
  const my = Math.round(H / 2);
  switch (kind) {
    case null:
      break;
    case 'zero-length':
      // the arterial given with every point twice and a doubled midpoint: zero-length segments the kernel decimates
      ways[1] = { ...ways[1], points: [lp(ax, 0), lp(ax, 0), lp(ax, my), lp(ax, my), lp(ax, H), lp(ax, H)] };
      break;
    case 'zero-area':
      extra.push({ id: 'way:antenna', cls: 'lane', widthCm: 400, points: [lp(0, my), lp(Math.round(ax * 0.6), my)] });
      break;
    case 'self-touching': {
      const r = Math.round(Math.min(ax, H) / 4);
      extra.push({ id: 'way:loop', cls: 'lane', widthCm: 400, points: [lp(0, my), lp(r, my - r), lp(2 * r, my), lp(r, my + r)], closed: true });
      break;
    }
    case 'collinear':
      extra.push({ id: 'way:fold', cls: 'lane', widthCm: 400, points: [lp(mx, 0), lp(Math.round(ax * 0.9), 0), lp(Math.round(ax * 0.7), 0)] });
      break;
    case 'coincident':
      extra.push({ id: 'way:twin', cls: 'secondary', widthCm: 600, points: [lp(ax, H), lp(0, H), lp(0, 0), lp(ax, 0)] });
      break;
  }
  for (const w of [...ways, ...extra]) widths.set(w.id, w.widthCm);
  const r1 = kernel.tx(spec(1, STAGES.S5), (o) => {
    for (const w of [...ways, ...extra]) {
      const r = kernel.geom.insertChain(o, w.points, [{ role: 'way', entity: w.id }], 'mandatory', w.closed === true ? { closed: true } : {});
      if (!r.ok) return r;
    }
    return ok(undefined);
  });
  if (!r1.ok) throw new Error(`s8State: the ways: ${r1.code} ${r1.detail}`);
  // the districts: every L1 face west of the arterial (inside the ring) the west one's, east of it the east one's
  const sk = seedKey(seed);
  const live: LiveEntry[] = [];
  const minted = [0, 1].map((i) => {
    const m = mint([{ kind: 'district', key: { arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: i, reroll: 0 } }], live, [], sk)[0];
    live.push({ id: m.identity.id, lineage: m.identity.lineage });
    return m;
  });
  const sides = facesInside(plat, W, H, ax);
  const r2 = kernel.tx(spec(1, STAGES.S6), (o): KernelResult<unknown> => {
    for (let i = 0; i < 2; i += 1) {
      if (sides[i].length === 0) return err('E_INVARIANT', `s8State: district ${String(i)} holds no face`);
      const r = kernel.geom.setOwner(o, sides[i], minted[i].identity.id);
      if (!r.ok) return r;
    }
    return ok(undefined);
  });
  if (!r2.ok) throw new Error(`s8State: the districts: ${r2.code} ${r2.detail}`);
  const records: Way[] = [...ways, ...extra].map((w) => ({
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
  const prosperity = 0.2 + 0.6 * rand();
  const districts: S8District[] = minted.map((m) => {
    const d: District = { id: m.identity.id, kind: 'craft', quarter: 'quarter:q', faces: { owner: m.identity.id, level: 1 }, seams: [], growthStage: 1, fabric: 'bent-cut', fabricParams: {}, lifecycle: generated() } as District;
    return { district: d, lineage: m.identity.lineage, prosperity, density: 0.5, bands: granularityBands(prosperity, profile), walled: false };
  });
  const pair = [minted[0].identity.id, minted[1].identity.id].sort();
  const lh = lineageHash({ arena: GROUND, unit: null, stage: STAGES.S6, epoch: 0, index: 1000, reroll: 0 });
  const seams: Seam[] = [{ id: `seam:${String(lh[0])}`, sides: [pair[0], pair[1]], edges: [{ chain: { role: 'way', entity: 'way:art' }, type: 'way', wayClass: 'primary', widthCm: 1000 as Cm, hard: false }], portals: [] }];
  const input: S8Input = { kernel, key: GROUND, seedKey: sk, rung: 'CITY', districts, ways: records, seams, widths, live };
  return { plat, kernel, input, box: [0, 0, W, H], arterialX: ax, extra: extra.map((w) => w.id) };
}

/** The live L1 faces inside the ring road on each side of the arterial (by a point inside each, read from the arena). */
function facesInside(plat: Plat, W: number, H: number, ax: number): [FaceId[], FaceId[]] {
  const west = new Set<FaceId>();
  const east = new Set<FaceId>();
  const step = 500;
  for (let x = step / 2; x < W; x += step) {
    for (let y = step / 2; y < H; y += step) {
      const q = lp(x, y);
      const at = pointLocate(plat, GROUND, 1, q);
      if (at.on !== 'face' || at.level !== 1) continue;
      (x < ax ? west : east).add(at.face);
    }
  }
  for (const f of west) east.delete(f);
  return [[...west].sort((a, b) => a - b), [...east].sort((a, b) => a - b)];
}
