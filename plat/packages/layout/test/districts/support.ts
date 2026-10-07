// M0-e-04's test support: the district fixture — a synthetic town on an indexed ground arena, built through the kernel
// the way S1, S3, S4 and S5 lay their chains (C-0245 (18)): the arena's outer ring (`margin`, L0), the map border
// (`border`, L1), the main plaza as a reservation's barrier face (`reserved`, owned by `plaza:0`), the wall as a
// jittered closed ring (`wall`) with its gate vertices (`gate`), an inward `primary` street from the plaza to each gate
// and an outward `through` road from each gate to the frame, and S5c's stand-in — a jittered street grid of
// `secondary` ways over the stages' land, clear of the plaza. Stage 1 is the wall's land (≈ 137.5 ha at CITY), the last
// stage's boundary a jittered ring around ≈ 220 ha (§12.2's matched walled area; C-0016's shares). Readers of the
// committed arena are written here from the arena's own tables, never through the code under test.
import {
  attachIndex,
  createKernel,
  createPlat,
  err,
  faceWalk,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  rowKey,
  rowsOn,
  seedKey,
  STAGES,
  type Cm,
  type Frame,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type StageId,
} from '@plat/kernel';
import type { Gate, Id, Reservation, Way } from '@plat/model';
import { parseTable, tableView, type TableView } from '@plat/tables';
import { commitS3Slice, flatFixture, runS4, runS5ab, runS6, s3Slice, settlementPerimeter, siteFeatures, spineWidthsOf, type GrowthState, type S3Commit, type S3Slice, type S6Input, type S6Output, type WallLine } from '../../src/index.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

export function P(x: number, y: number): LatticePoint {
  return { x: Math.round(x), y: Math.round(y) } as LatticePoint;
}

/** A seeded uniform source for the fixture's geometry (mulberry32): the fixture's own, not the code under test's. */
export function fixtureRandom(seed: number): () => number {
  let a = (seed * 2654435761 + 0x9e3779b9) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GENERATED = { existence: 'generated' as const, flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as StageId }, stage: stage as StageId, rederivesFrom: stage as StageId, workLimit: 100_000_000 };
}

/** A way record of `cls` on the chain ('way', id). */
export function wayRecord(id: Id, cls: Way['class'], widthCm = 600): Way {
  return { id, class: cls, spine: { role: 'way', entity: id }, width: widthCm as Cm, from: { kind: 'junction', id: 'j' }, to: { kind: 'junction', id: 'j' }, growthStage: 1, epoch: 0, provisional: false, lifecycle: GENERATED } as Way;
}

/** A jittered closed ring of `n` points around the origin of mean radius r (counter-clockwise). */
function jitterRing(rand: () => number, r: number, n: number, jitter: number): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = (2 * Math.PI * i) / n;
    const rr = r * (1 + jitter * (2 * rand() - 1));
    out.push(P(rr * Math.cos(a), rr * Math.sin(a)));
  }
  return out;
}

/** The district fixture's options. */
export interface TownOptions {
  /** Hectares within the wall (stage 1) and within the last stage's boundary. */
  readonly wallHa?: number;
  readonly lastHa?: number;
  /** The grid's spacing (m) and how many gates (default 5 – 7, drawn). */
  readonly gridM?: number;
  readonly gates?: number;
  /** The frame's side (m). */
  readonly frameM?: number;
  /** No street grid (the coarse faces are the arterials' wedges alone). */
  readonly noGrid?: boolean;
}

/** A built district fixture: the arena, its kernel and the records S6 reads. */
export interface Town {
  readonly seed: number;
  readonly plat: Plat;
  readonly k: Kernel;
  readonly frame: LatticePoint[];
  readonly wall: LatticePoint[];
  readonly boundary: LatticePoint[];
  readonly ways: Way[];
  readonly gates: Gate[];
  readonly plaza: Reservation;
  readonly input: S6Input;
}

/** Inserts one chain in its own L1 (or L0) batch; throws on a refusal. */
function lay(k: Kernel, level: 0 | 1, stage: number, pts: readonly LatticePoint[], rows: { role: string; entity: string }[], opts: { closed?: boolean; knots?: { index: number; role: string; ordinal: number; entity: string }[] } = {}, own?: { at: LatticePoint; owner: Id }): void {
  const r = k.tx(spec(level, stage), (o): KernelResult<unknown> => {
    const ins = k.geom.insertChain(o, pts, rows, 'mandatory', { ...(opts.closed === true ? { closed: true } : {}), ...(opts.knots === undefined ? {} : { knots: opts.knots, pinned: opts.knots.map((x) => x.index) }) });
    if (!ins.ok) return err(ins.code, ins.detail);
    if (own !== undefined) {
      const loc = k.geom.pointLocate(GROUND, 1, own.at);
      if (loc.on !== 'face') return err('E_INVARIANT', 'support: no face at the owner point');
      return k.geom.setOwner(o, [loc.face], own.owner);
    }
    return ins;
  });
  if (!r.ok) throw new Error(`support: a chain was refused: ${r.code} ${r.detail}`);
}

function segPointDist(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/** The district fixture at `seed` (see the module comment). */
export function town(seed: number, opts: TownOptions = {}): Town {
  const rand = fixtureRandom(seed);
  const side = (opts.frameM ?? 4000) * 100;
  const half = side / 2;
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const reach = Math.round(half * 1.6);
  lay(k, 0, STAGES.S1, [P(-reach, -reach), P(reach, -reach), P(reach, reach), P(-reach, reach)], [{ role: 'margin', entity: 'terrain:t' }], { closed: true });
  const frameRing = [P(-half, -half), P(half, -half), P(half, half), P(-half, half)];
  lay(k, 1, STAGES.S3, frameRing, [{ role: 'border', entity: 'terrain:t' }], { closed: true });
  // The plaza: a hexagon of ≈ 0.5 ha at the centre.
  const pr = 4400;
  const plazaRing: LatticePoint[] = [];
  const rot = rand() * Math.PI;
  for (let i = 0; i < 6; i += 1) plazaRing.push(P(pr * Math.cos(rot + (Math.PI * i) / 3), pr * Math.sin(rot + (Math.PI * i) / 3)));
  lay(k, 1, STAGES.S3, plazaRing, [{ role: 'reserved', entity: 'plaza:0' }], { closed: true, knots: plazaRing.map((_, i) => ({ index: i, role: 'attach', ordinal: i, entity: 'plaza:0' })) }, { at: P(0, 0), owner: 'plaza:0' });
  const plaza: Reservation = { id: 'plaza:0', kind: 'plaza', face: { owner: 'plaza:0', level: 1 }, areaBandM2: [4000, 6000], attach: [], stage: STAGES.S3, lifecycle: GENERATED } as unknown as Reservation;
  // The wall with its gates.
  const wallHa = opts.wallHa ?? 137.5;
  const lastHa = opts.lastHa ?? 220;
  const r1 = Math.sqrt((wallHa * 1e8) / Math.PI);
  const r2 = Math.sqrt((lastHa * 1e8) / Math.PI);
  const n = 36;
  const wall = jitterRing(rand, r1, n, 0.05);
  const ng = opts.gates ?? 5 + Math.floor(rand() * 3);
  const gateAt: number[] = [];
  const off = Math.floor(rand() * n);
  for (let i = 0; i < ng; i += 1) gateAt.push((off + Math.floor((i * n) / ng) + Math.floor(rand() * 2)) % n);
  gateAt.sort((a, b) => a - b);
  const gateIds = gateAt.map((_, i) => `gate:${String(i)}`);
  lay(k, 1, STAGES.S5, wall, [{ role: 'wall', entity: 'enceinte:0' }], { closed: true, knots: gateAt.map((idx, i) => ({ index: idx, role: 'gate', ordinal: 0, entity: gateIds[i] })) });
  const ways: Way[] = [];
  const gates: Gate[] = [];
  gateAt.forEach((idx, i) => {
    const g = wall[idx];
    // inward: from the plaza's nearest vertex to the gate, through a jittered midpoint
    let best = plazaRing[0];
    for (const q of plazaRing) if (Math.hypot(q.x - g.x, q.y - g.y) < Math.hypot(best.x - g.x, best.y - g.y)) best = q;
    const mid = P((best.x + g.x) / 2 + (rand() - 0.5) * 6000, (best.y + g.y) / 2 + (rand() - 0.5) * 6000);
    const inId = `way:in${String(i)}`;
    lay(k, 1, STAGES.S4, [best, mid, g], [{ role: 'way', entity: inId }]);
    ways.push(wayRecord(inId, 'primary'));
    // outward: from the gate radially to the frame
    const len = Math.hypot(g.x, g.y);
    const ux = g.x / len;
    const uy = g.y / len;
    const t = Math.min(Math.abs(ux) > 1e-9 ? half / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-9 ? half / Math.abs(uy) : Infinity);
    const end = P(ux * t, uy * t);
    const outId = `way:out${String(i)}`;
    lay(k, 1, STAGES.S4, [g, P(g.x + ux * 30000, g.y + uy * 30000), end], [{ role: 'way', entity: outId }]);
    ways.push(wayRecord(outId, 'through'));
    gates.push({ id: gateIds[i], enceinte: 'enceinte:0', junction: 'j', way: outId, kind: 'main', lifecycle: GENERATED } as Gate);
  });
  const boundary = jitterRing(rand, r2, 48, 0.04);
  // S5c's stand-in: the jittered grid, clear of the plaza and of the gates.
  if (opts.noGrid !== true) {
    const s = (opts.gridM ?? 150) * 100;
    const rmax = r2 + 4000;
    const m = Math.ceil(rmax / s) + 1;
    const node = (i: number, j: number): LatticePoint | null => {
      const r = fixtureRandom(seed * 7919 + (i + 100) * 1000 + (j + 100));
      const q = P(i * s + (r() - 0.5) * 0.3 * s, j * s + (r() - 0.5) * 0.3 * s);
      const d = Math.hypot(q.x, q.y);
      return d <= rmax && d > 9000 ? q : null;
    };
    const ok = (a: LatticePoint, b: LatticePoint): boolean => {
      if (segPointDist({ x: 0, y: 0 }, a, b) < 8000) return false;
      for (const idx of gateAt) if (segPointDist(wall[idx], a, b) < 2500) return false;
      return true;
    };
    let gi = 0;
    for (const dir of [0, 1]) {
      for (let a = -m; a <= m; a += 1) {
        let run: LatticePoint[] = [];
        const flush = (): void => {
          if (run.length >= 2) {
            const id = `way:g${String(gi)}`;
            gi += 1;
            lay(k, 1, STAGES.S5, run, [{ role: 'way', entity: id }]);
            ways.push(wayRecord(id, 'secondary', 500));
          }
          run = [];
        };
        for (let b = -m; b <= m; b += 1) {
          const q = dir === 0 ? node(b, a) : node(a, b);
          if (q === null) {
            flush();
            continue;
          }
          if (run.length > 0 && !ok(run[run.length - 1], q)) flush();
          run.push(q);
        }
        flush();
      }
    }
  }
  const features = siteFeatures(plat, { reservations: [plaza], gates, ways, wall });
  const input: S6Input = {
    kernel: k,
    key: GROUND,
    seedKey: seedKey(seed),
    rung: 'CITY',
    boundary,
    frame: frameRing,
    stageBoundaries: [wall, boundary],
    ways,
    features,
    reservations: [plaza],
    wall,
  };
  return { seed, plat, k, frame: frameRing, wall, boundary, ways, gates, plaza, input };
}

/** The town at `seed` with S6 run on it; throws on a refusal. */
export function townS6(seed: number, opts: TownOptions = {}, over: Partial<S6Input> = {}): Town & { out: S6Output } {
  const t = town(seed, opts);
  const r = runS6({ ...t.input, ...over });
  if (!r.ok) throw new Error(`support: S6 was refused: ${r.code} ${r.detail}`);
  return { ...t, out: r.value };
}

/** The owner id of every live L1 face, by slot. */
export function ownersL1(p: Plat): Map<number, Id | null> {
  const out = new Map<number, Id | null>();
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    const h = p.faces[1].owner[f];
    out.set(f, h >= 0 ? idOf(p, h) : null);
  }
  return out;
}

/** The median of a list (the mean of the middle two on an even count). */
export function median(xs: readonly number[]): number {
  const s = xs.slice().sort((a, b) => a - b);
  const n = s.length;
  if (n === 0) return NaN;
  return n % 2 === 1 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

// ---- the real pipeline's S3 slice and S4 (M0-c-01 … M0-c-03) with S5c's stand-in grid ------------------------------------

/** A run of the flat CITY fixture through S3's commits and S4, then the stand-in grid; S6's input over it. */
export interface CityRun {
  readonly seed: number;
  readonly widths: Map<Id, number>;
  readonly plat: Plat;
  readonly k: Kernel;
  readonly input: S6Input;
  readonly ways: Way[];
  readonly slice: S3Slice;
  readonly commit: S3Commit;
}

/**
 * The flat CITY fixture at `seed` through S3's commits and S4 (their public stages), the last stage's boundary stage 1's
 * outline grown by `ringM` (the land S5's later stages add — M0-c-04's and M0-c-05's), and S5c's stand-in: the jittered grid of
 * `secondary` ways (`gridM`) over the outline's land and its 50 m band, clear of the plaza, the wall strips and the
 * gates' corridors.
 */
export function cityRun(seed: number, gridM = 150, ringM = 180, widths: Map<Id, number> = new Map()): CityRun {
  const site = flatFixture(seed);
  const slice = s3Slice(site, {});
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const c = commitS3Slice(slice, k, {});
  if (!c.ok) throw new Error(`support: S3's commits were refused: ${c.code} ${c.detail}`);
  const r = runS4({ slice, commit: c.value, water: { bodies: [], bridges: [] }, kernel: k });
  if (!r.ok) throw new Error(`support: S4 was refused: ${r.code} ${r.detail}`);
  const ways: Way[] = r.value.network.ways.slice();
  const wall = c.value.traced.line.slice();
  // The last stage's boundary: stage 1's outline grown by the ring later stages add (≈ 180 m at CITY: 137.5 → 220 ha).
  const grown = settlementPerimeter(slice.levelSet.outline, k, { offsetCm: ringM * 100, frame: site.frameRing });
  if (!grown.ok) throw new Error(`support: the last stage's boundary: ${grown.code}`);
  const outline = grown.value;
  const clear = Math.max(c.value.strips.widthsCm.inner, c.value.strips.widthsCm.outer) + 1500;
  const plaza = slice.plaza.ring;
  const gatesAt = slice.gates.map((g) => g.at);
  const s = gridM * 100;
  let xmin = Infinity;
  let xmax = -Infinity;
  let ymin = Infinity;
  let ymax = -Infinity;
  for (const q of outline) {
    xmin = Math.min(xmin, q.x);
    xmax = Math.max(xmax, q.x);
    ymin = Math.min(ymin, q.y);
    ymax = Math.max(ymax, q.y);
  }
  const near = (ring: readonly LatticePoint[], a: LatticePoint, b: LatticePoint, d: number): boolean => {
    for (let i = 0; i < ring.length; i += 1) {
      const p = ring[i];
      const q = ring[(i + 1) % ring.length];
      // segment–segment distance by endpoint–segment distances (the segments do not cross when all are > 0 and no crossing)
      if (segPointDist(p, a, b) < d || segPointDist(q, a, b) < d || segPointDist(a, p, q) < d || segPointDist(b, p, q) < d) return true;
      const o = (u: LatticePoint, v: LatticePoint, w: LatticePoint): number => Math.sign((v.x - u.x) * (w.y - u.y) - (v.y - u.y) * (w.x - u.x));
      if (o(a, b, p) !== o(a, b, q) && o(p, q, a) !== o(p, q, b)) return true;
    }
    return false;
  };
  const inLand = (q: LatticePoint): boolean => {
    let inside = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i, i += 1) {
      const a = outline[i];
      const b = outline[j];
      if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  };
  const node = (i: number, j: number): LatticePoint | null => {
    const rr = fixtureRandom(seed * 7919 + (i + 1000) * 10000 + (j + 1000));
    const q = P(i * s + (rr() - 0.5) * 0.3 * s, j * s + (rr() - 0.5) * 0.3 * s);
    return inLand(q) ? q : null;
  };
  const okSeg = (a: LatticePoint, b: LatticePoint): boolean => {
    if (near(plaza, a, b, 1500)) return false;
    if (near(wall, a, b, clear)) return false;
    for (const g of gatesAt) if (segPointDist(g, a, b) < clear + 4000) return false;
    return true;
  };
  let gi = 0;
  const i0 = Math.floor(xmin / s) - 1;
  const i1 = Math.ceil(xmax / s) + 1;
  const j0 = Math.floor(ymin / s) - 1;
  const j1 = Math.ceil(ymax / s) + 1;
  for (const dir of [0, 1]) {
    const [a0, a1, b0, b1] = dir === 0 ? [j0, j1, i0, i1] : [i0, i1, j0, j1];
    for (let a = a0; a <= a1; a += 1) {
      let run: LatticePoint[] = [];
      const flush = (): void => {
        if (run.length >= 2) {
          const id = `way:g${String(gi)}`;
          gi += 1;
          lay(k, 1, STAGES.S5, run, [{ role: 'way', entity: id }]);
          ways.push(wayRecord(id, 'secondary', 500));
        }
        run = [];
      };
      for (let b = b0; b <= b1; b += 1) {
        const q = dir === 0 ? node(b, a) : node(a, b);
        if (q === null) {
          flush();
          continue;
        }
        if (run.length > 0 && !okSeg(run[run.length - 1], q)) flush();
        run.push(q);
      }
      flush();
    }
  }
  for (const w of ways) widths.set(w.id, typeof w.width === 'number' ? w.width : 600);
  const features = siteFeatures(plat, { reservations: [c.value.plaza], gates: c.value.gates, ways, wall });
  const input: S6Input = {
    kernel: k,
    key: GROUND,
    seedKey: seedKey(seed),
    rung: 'CITY',
    boundary: outline,
    frame: site.frameRing,
    stageBoundaries: [slice.levelSet.outline.slice(), outline],
    ways,
    features,
    reservations: [c.value.plaza],
    wall,
  };
  return { seed, widths, plat, k, input, ways, slice, commit: c.value };
}

// ---- the three-stage CITY run: S3, S4, S5a/S5b (M0-c-04) and the stand-in grid, two enceintes --------------------------

/** A run of the flat CITY fixture through S3, S4 and c-04's S5a/S5b (two walled stages and an open one), then S6's input. */
export interface GrowthRun {
  readonly seed: number;
  readonly plat: Plat;
  readonly k: Kernel;
  readonly growth: GrowthState;
  /** Every enceinte's wall line by id, innermost first (stage 1's: S3's trace; each later walled stage's: its trace). */
  readonly walls: WallLine[];
  /** Every stage's gates, in stage order. */
  readonly gates: Gate[];
  readonly ways: Way[];
  readonly input: S6Input;
}

/**
 * The flat CITY fixture at `seed` through S3's commits, S4 and M0-c-04's `runS5ab` (stage 1 walled, stage 2 walled, stage
 * 3 open on the flat fixture), S5c's stand-in grid (`gridM`, 0: none) over the last outline clear of every wall, the
 * plaza and every gate (cityRun's recipe over every enceinte), and S6's input as the composer reads c-04's state:
 * the last stage with land's outline, each stage's outline, the ways, the sited features over the plaza and every
 * stage's gates with every enceinte's wall line (`walls`, C-0257).
 */
export function growthRun(seed: number, gridM = 150): GrowthRun {
  const site = flatFixture(seed);
  const slice = s3Slice(site, {});
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const widths = new Map<Id, number>();
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: spineWidthsOf(widths) });
  const c = commitS3Slice(slice, k, {});
  if (!c.ok) throw new Error(`support: S3's commits were refused: ${c.code} ${c.detail}`);
  const s4 = runS4({ slice, commit: c.value, water: { bodies: [], bridges: [] }, kernel: k });
  if (!s4.ok) throw new Error(`support: S4 was refused: ${s4.code} ${s4.detail}`);
  const g5 = runS5ab({ slice, commit: c.value, s4: s4.value, kernel: k });
  if (!g5.ok) throw new Error(`support: S5a/S5b were refused: ${g5.code} ${g5.detail}`);
  const growth = g5.value;
  const outlines: LatticePoint[][] = [];
  for (const st of growth.stages) outlines.push(st.boundary !== null ? st.boundary.set.outline.slice() : outlines[outlines.length - 1].slice());
  const last = growth.stages[growth.lastWithLand - 1].boundary;
  if (last === null) throw new Error('support: no last boundary');
  const boundary = last.set.outline.slice();
  const walls: WallLine[] = growth.stages.filter((st) => st.wall !== null).map((st) => ({ enceinte: st.trace === null ? c.value.enceinte.id : st.trace.enceinte.id, line: (st.wall as LatticePoint[]).slice() }));
  const gates = growth.stages.flatMap((st) => st.gates);
  const ways = growth.ways.slice();
  if (gridM > 0) {
    const s = gridM * 100;
    const clear = Math.max(c.value.strips.widthsCm.inner, c.value.strips.widthsCm.outer) + 1500;
    let xmin = Infinity;
    let xmax = -Infinity;
    let ymin = Infinity;
    let ymax = -Infinity;
    for (const q of boundary) {
      xmin = Math.min(xmin, q.x);
      xmax = Math.max(xmax, q.x);
      ymin = Math.min(ymin, q.y);
      ymax = Math.max(ymax, q.y);
    }
    const gatePts: LatticePoint[] = [];
    for (const gt of gates) {
      const r = k.resolve({ role: 'gate', entity: gt.id }, GROUND);
      if (r.view === 'vertices') for (const v of r.vertices) gatePts.push(P(plat.vertices.x[v], plat.vertices.y[v]));
    }
    const near = (ring: readonly LatticePoint[], a: LatticePoint, b: LatticePoint, d: number): boolean => {
      for (let i = 0; i < ring.length; i += 1) {
        const p = ring[i];
        const q = ring[(i + 1) % ring.length];
        if (segPointDist(p, a, b) < d || segPointDist(q, a, b) < d || segPointDist(a, p, q) < d || segPointDist(b, p, q) < d) return true;
        const o = (u: LatticePoint, v: LatticePoint, w: LatticePoint): number => Math.sign((v.x - u.x) * (w.y - u.y) - (v.y - u.y) * (w.x - u.x));
        if (o(a, b, p) !== o(a, b, q) && o(p, q, a) !== o(p, q, b)) return true;
      }
      return false;
    };
    const node = (i: number, j: number): LatticePoint | null => {
      const rr = fixtureRandom(seed * 7919 + (i + 1000) * 10000 + (j + 1000));
      const q = P(i * s + (rr() - 0.5) * 0.3 * s, j * s + (rr() - 0.5) * 0.3 * s);
      return insidePoly(boundary, q) ? q : null;
    };
    const okSeg = (a: LatticePoint, b: LatticePoint): boolean => {
      if (near(slice.plaza.ring, a, b, 1500)) return false;
      for (const w of walls) if (near(w.line as LatticePoint[], a, b, clear)) return false;
      for (const q of gatePts) if (segPointDist(q, a, b) < clear + 4000) return false;
      return true;
    };
    let gi = 0;
    const i0 = Math.floor(xmin / s) - 1;
    const i1 = Math.ceil(xmax / s) + 1;
    const j0 = Math.floor(ymin / s) - 1;
    const j1 = Math.ceil(ymax / s) + 1;
    for (const dir of [0, 1]) {
      const [a0, a1, b0, b1] = dir === 0 ? [j0, j1, i0, i1] : [i0, i1, j0, j1];
      for (let a = a0; a <= a1; a += 1) {
        let run: LatticePoint[] = [];
        const flush = (): void => {
          if (run.length >= 2) {
            const id = `way:g${String(gi)}`;
            gi += 1;
            lay(k, 1, STAGES.S5, run, [{ role: 'way', entity: id }]);
            ways.push(wayRecord(id, 'secondary', 500));
          }
          run = [];
        };
        for (let b = b0; b <= b1; b += 1) {
          const q = dir === 0 ? node(b, a) : node(a, b);
          if (q === null) {
            flush();
            continue;
          }
          if (run.length > 0 && !okSeg(run[run.length - 1], q)) flush();
          run.push(q);
        }
        flush();
      }
    }
  }
  for (const w of ways) widths.set(w.id, typeof w.width === 'number' ? w.width : 600);
  const features = siteFeatures(plat, { reservations: [c.value.plaza], gates, ways, walls });
  const input: S6Input = {
    kernel: k,
    key: GROUND,
    seedKey: seedKey(seed),
    rung: 'CITY',
    boundary,
    frame: site.frameRing,
    stageBoundaries: outlines,
    ways,
    features,
    reservations: [c.value.plaza],
    walls,
  };
  return { seed, plat, k, growth, walls, gates, ways, input };
}

// ---- small grids for the grower's unit tests ------------------------------------------------------------------------------

/** A grid arena: rectangular cells, the outer ring the map border, the inner lines ways by `lineClass`. */
export interface GridArena {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly ways: Way[];
  /** The cell (i, j)'s centre. */
  readonly centre: (i: number, j: number) => LatticePoint;
}

/**
 * The grid of n × m square cells of side `cellM` (see rectArena): `lineClass(dir, index, segment)` classes each line's
 * segment between two crossing lines — dir 'x' for the vertical line at x = i · s, 'y' for the horizontal one.
 */
export function gridArena(n: number, m: number, cellM: number, lineClass: (dir: 'x' | 'y', index: number, segment: number) => Way['class'], owned: readonly { i: number; j: number; owner: Id }[] = []): GridArena {
  return rectArena(
    Array.from({ length: n + 1 }, (_, i) => i * cellM),
    Array.from({ length: m + 1 }, (_, j) => j * cellM),
    lineClass,
    owned,
  );
}

/**
 * A rectangular grid with lines at `xsM` and `ysM` (metres, ascending, the outer two the border): every inner line laid
 * segment by segment between its crossing lines, each segment one way of `lineClass(dir, index, segment)`, inside the
 * border ring and the arena's outer ring; the cells listed in `owned` given to their owner (a reservation's barrier face).
 */
export function rectArena(xsM: readonly number[], ysM: readonly number[], lineClass: (dir: 'x' | 'y', index: number, segment: number) => Way['class'], owned: readonly { i: number; j: number; owner: Id }[] = []): GridArena {
  const xs = xsM.map((v) => v * 100);
  const ys = ysM.map((v) => v * 100);
  const w = xs[xs.length - 1];
  const h = ys[ys.length - 1];
  const pad = Math.max(w, h);
  const side = Math.max(w, h) * 3;
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  lay(k, 0, STAGES.S1, [P(-pad, -pad), P(w + pad, -pad), P(w + pad, h + pad), P(-pad, h + pad)], [{ role: 'margin', entity: 'terrain:t' }], { closed: true });
  lay(k, 1, STAGES.S3, [P(0, 0), P(w, 0), P(w, h), P(0, h)], [{ role: 'border', entity: 'terrain:t' }], { closed: true });
  const ways: Way[] = [];
  for (let i = 1; i < xs.length - 1; i += 1) {
    for (let sg = 0; sg + 1 < ys.length; sg += 1) {
      const id = `way:x${String(i)}.${String(sg)}`;
      lay(k, 1, STAGES.S4, [P(xs[i], ys[sg]), P(xs[i], ys[sg + 1])], [{ role: 'way', entity: id }]);
      ways.push(wayRecord(id, lineClass('x', i, sg)));
    }
  }
  for (let j = 1; j < ys.length - 1; j += 1) {
    for (let sg = 0; sg + 1 < xs.length; sg += 1) {
      const id = `way:y${String(j)}.${String(sg)}`;
      lay(k, 1, STAGES.S4, [P(xs[sg], ys[j]), P(xs[sg + 1], ys[j])], [{ role: 'way', entity: id }]);
      ways.push(wayRecord(id, lineClass('y', j, sg)));
    }
  }
  const centre = (i: number, j: number): LatticePoint => P((xs[i] + xs[i + 1]) / 2, (ys[j] + ys[j + 1]) / 2);
  for (const o of owned) {
    const r = k.tx(spec(1, STAGES.S3), (ov) => {
      const loc = k.geom.pointLocate(GROUND, 1, centre(o.i, o.j));
      if (loc.on !== 'face') return err('E_INVARIANT', 'support: no cell face');
      return k.geom.setOwner(ov, [loc.face], o.owner);
    });
    if (!r.ok) throw new Error(`support: a cell's owner was refused: ${r.code}`);
  }
  return { plat, k, ways, centre };
}

// ---- readers of the committed arena (its own tables, never the code under test) ----------------------------------------

/** One live edge pair at L1 or coarser: its ends, its rows, and the L1 faces on its two sides (−1: none). */
export interface EdgeL1 {
  readonly h: number;
  readonly a: LatticePoint;
  readonly b: LatticePoint;
  readonly rows: readonly { role: string; entity: string }[];
  readonly left: number;
  readonly right: number;
}

/** Every live edge of level ≤ 1 with its rows and its two L1 faces (read through faceWalk, the arena's level view). */
export function edgesL1(p: Plat): EdgeL1[] {
  const faceOf = new Map<number, number>();
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    for (const ring of faceWalk(p, 1, f)) for (const h of ring) faceOf.set(h, f);
  }
  const out: EdgeL1[] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h) || p.halfEdges.level[h >> 1] > 1) continue;
    const o = p.halfEdges.origin;
    out.push({
      h,
      a: P(p.vertices.x[o[h]], p.vertices.y[o[h]]),
      b: P(p.vertices.x[o[h ^ 1]], p.vertices.y[o[h ^ 1]]),
      rows: rowsOn(p, 'edge', h).map((r) => rowKey(p, r)),
      left: faceOf.get(h) ?? -1,
      right: faceOf.get(h ^ 1) ?? -1,
    });
  }
  return out;
}

/** The owner id of an L1 face slot (or null; −1 → null). */
export function ownerOfL1(p: Plat, f: number): Id | null {
  if (f < 0) return null;
  const h = p.faces[1].owner[f];
  return h >= 0 ? idOf(p, h) : null;
}

/** The live L1 faces' count. */
export function liveL1(p: Plat): number {
  let n = 0;
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) n += 1;
  return n;
}

/** The owner at L1 of the face holding point q, or undefined when q lies on an edge or a vertex. */
export function ownerAt(t: { k: Kernel; plat: Plat }, q: LatticePoint): Id | null | undefined {
  const loc = t.k.geom.pointLocate(GROUND, 1, q);
  if (loc.on !== 'face') return undefined;
  if (loc.level !== 1) return null;
  return ownerOfL1(t.plat, loc.face);
}

/** The area of the convex hull of points (monotone chain), cm². */
export function hullArea(points: readonly { x: number; y: number }[]): number {
  const s = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cr = (o: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): number => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: { x: number; y: number }[] = [];
  for (const q of s) {
    while (lower.length >= 2 && cr(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: { x: number; y: number }[] = [];
  for (let i = s.length - 1; i >= 0; i -= 1) {
    const q = s[i];
    while (upper.length >= 2 && cr(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  const hull = [...lower.slice(0, -1), ...upper.slice(0, -1)];
  return Math.abs(area2Of(hull)) / 2;
}

/** A TableView whose table `id` has one cell's value replaced (the stages read their cells; nothing is inlined). */
export function tableWith(id: string, row: string, cell: string, value: unknown, base: TableView = tableView()): TableView {
  const t = base.table(id);
  const rows: Record<string, Record<string, unknown>> = {};
  for (const [rk, cells] of t.rows) {
    const r: Record<string, unknown> = {};
    for (const [ck, c] of cells) r[ck] = { ...c, ...(rk === row && ck === cell ? { value } : {}) };
    rows[rk] = r;
  }
  const changed = parseTable(id, { table: id, version: t.version, section: t.section, rows });
  return {
    hash: base.hash,
    version: (x) => base.version(x),
    get: (x, key) => (x === id ? changed.rows.get(key) : base.get(x, key)),
    rows: (x) => (x === id ? changed.rows : base.rows(x)),
    slice: (x, kind, key) => base.slice(x, kind, key),
    table: (x) => (x === id ? changed : base.table(x)),
  };
}

/** Twice the signed area of a ring (counter-clockwise positive). */
export function area2Of(ring: readonly { x: number; y: number }[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** Is q inside the ring (even-odd, q off the ring)? */
export function insidePoly(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > q.y !== b.y > q.y && q.x < ((b.x - a.x) * (q.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** The distance of q to a closed ring's edges. */
export function ringDist(ring: readonly { x: number; y: number }[], q: { x: number; y: number }): number {
  let best = Infinity;
  for (let i = 0; i < ring.length; i += 1) best = Math.min(best, segPointDist(q, ring[i], ring[(i + 1) % ring.length]));
  return best;
}
