// The runner's arena support (M0-k-04): the arenas a fuzz input or a constructive draw runs on, the façade over them
// with M0-a-14's suite wired into every transaction, and the exact geometry helpers the property checks share. Every
// operation goes through the façade (M0-a-16's `createKernel`), every batch through its `tx` with `suiteEnv` — so a
// batch whose result breaks a hard §3.10 row is refused E_INVARIANT by the transaction itself — and after every
// operation the runner sweeps the whole arena with `checkCI` (§13.1: "Properties (checked after every operation)").
import {
  attachIndex,
  checkCI,
  createKernel,
  createPlat,
  hardProblems,
  LATTICE,
  suiteEnv,
  type BatchContext,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Level,
  type Plat,
  type SpineWidths,
  type TxEnv,
  type WholeContext,
} from '@plat/kernel';
import { FIXTURE_CELLS, FIXTURE_FRAME, FIXTURE_KEY, fixtureSpec } from '../determinism/index.js';

/** The ground arena's key every runner arena carries. */
export const RUNNER_KEY = FIXTURE_KEY;

/** The largest |coordinate| the lattice holds (§3.2 (1)). */
export const RANGE = LATTICE.rangeCm - 1;

/** The padding of a framed arena around its geometry (cm). */
export const FRAME_PAD_CM = 5_000;

/** A point with integer coordinates (a lattice point or a local one). */
export interface Pt {
  readonly x: number;
  readonly y: number;
}

/** A lattice point. */
export function lpt(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** The bounding box [x0, y0, x1, y1] of points (null for none). */
export function boxOf(points: readonly Pt[]): [number, number, number, number] | null {
  if (points.length === 0) return null;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of points) {
    if (q.x < x0) x0 = q.x;
    if (q.y < y0) y0 = q.y;
    if (q.x > x1) x1 = q.x;
    if (q.y > y1) y1 = q.y;
  }
  return [x0, y0, x1, y1];
}

/** The entity prefix of the runner's frame rings (never a case's or an input's). */
export const FRAME_ENTITY = 'frame:';

/**
 * Lays the runner's frame on an arena (C-0225 (3)): the ring at L0 (`margin`, S1's outer ring), at L1 (`border`, S3's map
 * border, §4.1) and at L2 (`kerb`, the level S9's blocks give every district before S10 writes L3), each its own
 * transaction — so every level a case or an input writes has a record above it, as in the pipeline, and no batch
 * materialises a coarser record it would later have to remove.
 */
export function layFrame(p: Plat, ring: readonly LatticePoint[]): void {
  const k = kernelOn([p]);
  const rows: [Level, string][] = [[0, 'margin'], [1, 'border'], [2, 'kerb']];
  for (const [level, role] of rows) {
    const r = k.tx(spec(level), (o) => k.geom.insertChain(o, ring, [{ role, entity: `${FRAME_ENTITY}${role}` }], 'mandatory', { closed: true }));
    if (!r.ok) throw new Error(`runner: the frame's L${String(level)} ring was refused ${r.code} ${r.detail}`);
  }
}

/**
 * An indexed ground arena framed at L0 – L2 by the box around `points` padded by `pad` (`layFrame`), or null where the
 * padded box leaves the lattice (the caller translates its draw first).
 */
export function framedAround(points: readonly Pt[], pad = FRAME_PAD_CM): Plat | null {
  const b = boxOf(points) ?? [0, 0, 0, 0];
  const [x0, y0, x1, y1] = [b[0] - pad, b[1] - pad, b[2] + pad, b[3] + pad];
  if (x0 < -RANGE || y0 < -RANGE || x1 > RANGE || y1 > RANGE) return null;
  const p = createPlat(RUNNER_KEY, FIXTURE_FRAME);
  attachIndex(p, { gridCellCm: FIXTURE_CELLS });
  layFrame(p, [lpt(x0, y0), lpt(x1, y0), lpt(x1, y1), lpt(x0, y1)]);
  return p;
}

/** What `kernelOn` wires besides the suite. */
export interface RunnerKernelOptions {
  /** The spines' width declarations `kerb` and `corridorUnion` read (C-0212 (1)). */
  readonly spineWidths?: SpineWidths;
  /** Services beside the suite (class floors, checks, the repairer, part counts). */
  readonly base?: TxEnv;
  /** What the batch-local rows read beyond the record (held sets, placed vertices). */
  readonly context?: BatchContext | ((p: Plat) => BatchContext);
}

/** The façade over arenas (keyed by their own keys), every transaction carrying M0-a-14's suite. */
export function kernelOn(plats: readonly Plat[], opts: RunnerKernelOptions = {}): Kernel {
  const map = new Map(plats.map((p) => [p.key, p] as const));
  const env = suiteEnv({ ...(opts.context === undefined ? {} : { context: opts.context }), ...(opts.base === undefined ? {} : { base: opts.base }) });
  return createKernel(map, { env, ...(opts.spineWidths === undefined ? {} : { spineWidths: opts.spineWidths }) });
}

/** A transaction spec at `level` with the runner's defaults (M0-d-08's `fixtureSpec`: stage 8, reject, 10⁶ work). */
export function spec(level: Level, over: Partial<KernelTx> = {}): KernelTx {
  return fixtureSpec(level, over);
}

/** The hard problems of `checkCI` on the whole arena (§13.1's sweep after every operation), [] when every row holds. */
export function ciProblems(p: Plat, ctx: WholeContext = {}): string[] {
  return hardProblems(checkCI(p, ctx));
}

/** The named rows' problems of `checkCI` (e.g. `euler`, `min-edge`), [] when they hold. */
export function rowProblems(p: Plat, names: readonly string[], ctx: WholeContext = {}): string[] {
  const out: string[] = [];
  for (const r of checkCI(p, ctx)) if (names.includes(r.name) && !r.holds) out.push(...r.problems);
  return out;
}

/** The code and detail of a refusal, or 'ok'. */
export function resultText(r: KernelResult<unknown>): string {
  return r.ok ? 'ok' : `${r.code} ${r.detail}`;
}

// ---- exact geometry ------------------------------------------------------------------------------------------------

const B = (v: number): bigint => BigInt(v);

/** (b − a) × (c − a), exact. */
export function cross(a: Pt, b: Pt, c: Pt): bigint {
  return (B(b.x) - B(a.x)) * (B(c.y) - B(a.y)) - (B(b.y) - B(a.y)) * (B(c.x) - B(a.x));
}

/** Twice the signed area, exact. */
export function area2Exact(ring: readonly Pt[]): bigint {
  let s = 0n;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += B(a.x) * B(b.y) - B(b.x) * B(a.y);
  }
  return s;
}

/** Whether p lies on the closed segment a–b, exact. */
export function onSegment(a: Pt, b: Pt, p: Pt): boolean {
  if (cross(a, b, p) !== 0n) return false;
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y);
}

/** Where a lattice point lies against a ring: 1 inside, 0 on its boundary, −1 outside (exact crossing count). */
export function inRing(ring: readonly Pt[], p: Pt): -1 | 0 | 1 {
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (onSegment(a, b, p)) return 0;
    if (a.y > p.y !== b.y > p.y) {
      const c = cross(a, b, p);
      if (b.y > a.y ? c > 0n : c < 0n) inside = !inside;
    }
  }
  return inside ? 1 : -1;
}

/** Where a double point lies against a ring, within `eps` cm of its boundary counted as on it: 1, 0 or −1. */
export function inRingApprox(ring: readonly Pt[], p: { readonly x: number; readonly y: number }, eps: number): -1 | 0 | 1 {
  let inside = false;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    if (segDist(p, a, b) <= eps) return 0;
    if (a.y > p.y !== b.y > p.y) {
      const x = a.x + ((p.y - a.y) * (b.x - a.x)) / (b.y - a.y);
      if (x > p.x) inside = !inside;
    }
  }
  return inside ? 1 : -1;
}

/** The distance from p to the segment a–b (doubles). */
export function segDist(p: { readonly x: number; readonly y: number }, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

/** Whether a double point lies in the region the rings bound (outer first, holes after), within `eps` of a boundary. */
export function inRegionApprox(rings: readonly (readonly Pt[])[], p: { readonly x: number; readonly y: number }, eps: number): boolean {
  if (rings.length === 0) return false;
  if (inRingApprox(rings[0], p, eps) < 0) return false;
  for (let k = 1; k < rings.length; k++) if (inRingApprox(rings[k], p, eps) > 0) return false;
  return true;
}

/**
 * A lattice point strictly inside a simple ring (either orientation), or null: for each edge, the lattice points a
 * few centimetres off its midpoint on both sides, the first one the exact test puts inside.
 */
export function interiorPoint(ring: readonly Pt[]): LatticePoint | null {
  const n = ring.length;
  for (const off of [1, 2, 5, 13, 40, 120]) {
    for (let i = 0; i < n; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % n];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      if (len === 0) continue;
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      for (const s of [1, -1]) {
        const q = lpt(Math.round(mx + (s * off * -(b.y - a.y)) / len), Math.round(my + (s * off * (b.x - a.x)) / len));
        if (inRing(ring, q) === 1) return q;
      }
    }
  }
  return null;
}

/** The value at rank ⌈q · n⌉ (nearest rank) of a sorted list; 0 for none. */
export function nearestRank(sorted: readonly number[], q: number): number {
  if (sorted.length === 0) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.ceil(q * sorted.length) - 1));
  return sorted[i];
}

/** A record of counts, its keys sorted (a report's deterministic form). */
export function sortedCounts(m: ReadonlyMap<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of [...m.keys()].sort()) out[k] = m.get(k) as number;
  return out;
}

/** Adds `n` to `m[k]`. */
export function bump(m: Map<string, number>, k: string, n = 1): void {
  m.set(k, (m.get(k) ?? 0) + n);
}
