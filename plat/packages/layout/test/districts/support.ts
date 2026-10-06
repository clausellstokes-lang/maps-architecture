// M0-e-04's test support: the district fixture — a synthetic town on an indexed ground arena, built through the kernel
// the way S1, S3, S4 and S5 lay their chains (C-0242 (18)): the arena's outer ring (`margin`, L0), the map border
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
  idOf,
  isFaceLive,
  seedKey,
  STAGES,
  type Cm,
  type Frame,
  type Kernel,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type StageId,
} from '@plat/kernel';
import type { Gate, Id, Reservation, Way } from '@plat/model';
import { runS6, siteFeatures, type S6Input, type S6Output } from '../../src/index.js';

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
  const r = k.tx(spec(level, stage), (o) => {
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
  const features = siteFeatures(plat, { reservations: [plaza], gates, ways });
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
