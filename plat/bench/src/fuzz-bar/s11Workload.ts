// The synthetic per-plot S11 workload (M0-k-04; C-0107; §3.7 "S11's geometry share is every kernel call S11 makes for
// one plot — the base outline builder's frontage-band intersection or OBB / LIR fit, per-edge setbacks by `offsetFace`,
// the yard partition's splits and the footprint's insertion into the block's L4 batch"; §16 M0 (a)'s timing bar ≤ 3 µs per
// plot median, measured by M0-t-01 in the timing phase). Seeded synthetic plots at plot scale from M0-k-01's face sets
// (4–30 m, the five plot-shaped kinds), each an L3 face on a framed arena; per plot, through the façade, exactly: one
// `offsetFace` (the per-edge setbacks: a front setback on the plot's lowest edge, side and rear setbacks on the others),
// one `obb` and one `lir` fit of the setback region, the yard partition's `splitFace` (one cut across the plot behind
// the footprint, ≥ 1 per plot), and one L4 `insertChain` (the footprint: the LIR's rectangle, snapped). The frontage-band
// intersection waits for S10's frontage (M1; M0.md §4b), where the bar is re-measured on B-CITY-lite's S11.
//
// The call list is recorded by a façade spy the workload wraps around its own kernel, so the list is what the façade
// was asked, call by call; the workload's own setup (the frame, the plot's ring) goes through another façade and is
// never listed or timed. The timing goes through M0-f-01's `timeBatch`, the figure the median per-plot time of the S11
// calls alone (a TimedValue), stamped AUTHORITATIVE or CONTENDED by the harness (C-0025, C-0047) — outside the timing
// phase always CONTENDED, never gated (M0-t-01 measures it).
import fc from 'fast-check';
import { faceEdges, type Kernel, type LatticePoint, type Level } from '@plat/kernel';
import { arb, runnerFramedAround, runnerInterior, runnerKernelOn, runnerSpec, seedFamily, type FuzzFaceKind } from '@plat/testkit';
import { timeBatch, type TimeBatchOptions, type TimedValue, type TimingResult } from '../timing/index.js';

/** The plot-shaped kinds of M0-k-01's face set (a plot has no hole). */
export const S11_PLOT_KINDS: readonly FuzzFaceKind[] = Object.freeze(['curved', 'round-joined', 'triangular', 'C-shaped', 'concave']);

/** One façade call of a plot's S11 run: the operation, the level its batch writes (writers) and what it returned. */
export interface S11Call {
  readonly op: 'offsetFace' | 'obb' | 'lir' | 'splitFace' | 'insertChain';
  readonly level: Level | null;
  readonly result: string;
}

/** One plot's S11 call list. */
export interface S11Plot {
  readonly index: number;
  readonly kind: FuzzFaceKind;
  readonly calls: S11Call[];
  /** The S11 calls' wall time (µs, informative: CONTENDED outside the timing phase). */
  readonly us: number;
}

/** `s11Workload`'s result: the call list per plot and the stamped timing (null when not timed). */
export interface S11Workload {
  readonly seed: number;
  readonly calls: S11Plot[];
  readonly timings: TimingResult | null;
}

/** The plots of a run: n draws of the five kinds in turn, from `seedFamily('s11/<kind>', seed)`. */
export function s11Plots(seed: number, n: number): { kind: FuzzFaceKind; ring: LatticePoint[] }[] {
  if (!(Number.isInteger(n) && n >= 1)) throw new RangeError(`s11Workload: n is a whole number of plots ≥ 1, got ${String(n)}`);
  const per = S11_PLOT_KINDS.map((kind) => {
    const k = Math.ceil(n / S11_PLOT_KINDS.length);
    return fc.sample(arb.faceSet(kind, { scale: 'plot', halfSideCm: 250_000 }), { seed: seedFamily(`s11/${kind}`, seed) | 0, numRuns: k }).map((f) => ({ kind, ring: f.polygon[0].slice() }));
  });
  const out: { kind: FuzzFaceKind; ring: LatticePoint[] }[] = [];
  for (let i = 0; out.length < n; i++) out.push(per[i % per.length][Math.floor(i / per.length)]);
  return out;
}

/** A façade that records every geometry call it is asked into `calls` (the spy the call list is read from). */
export function spyKernel(k: Kernel, calls: S11Call[]): Kernel {
  const levelOf = (o: unknown): Level | null => (typeof o === 'object' && o !== null && 'level' in o ? ((o as { level: Level }).level) : null);
  // The façade's geom is frozen: the spy is a copy whose five S11 members record each call, every other member as is.
  const geom: Record<string, unknown> = {};
  for (const [name, v] of Object.entries(k.geom)) {
    if (typeof v !== 'function' || !['offsetFace', 'obb', 'lir', 'splitFace', 'insertChain'].includes(name)) {
      geom[name] = v;
      continue;
    }
    geom[name] = (...args: unknown[]) => {
      const r = (v as (...a: unknown[]) => unknown)(...args);
      const ok = typeof r === 'object' && r !== null && 'ok' in r ? ((r as { ok: boolean; code?: string }).ok ? 'ok' : String((r as { code?: string }).code)) : 'value';
      const op = name as S11Call['op'];
      calls.push({ op, level: op === 'insertChain' || op === 'splitFace' ? levelOf(args[0]) : null, result: ok });
      return r;
    };
  }
  return { ...k, geom } as unknown as Kernel;
}

/** The setbacks of a plot's edges (cm): the front (its lowest edge, the street side) 150–400, sides 0–120, rear 200–600. */
function setbacks(ring: readonly LatticePoint[], n: number, seed: number): number[] {
  let front = 0;
  for (let i = 1; i < ring.length; i++) if (ring[i].y + ring[(i + 1) % ring.length].y < ring[front].y + ring[(front + 1) % ring.length].y) front = i;
  const h = (i: number) => ((seed * 2_654_435_761 + i * 40_503) >>> 0) % 1000;
  return Array.from({ length: n }, (_, i) => (i === front ? 150 + (h(i) % 251) : i === (front + Math.floor(ring.length / 2)) % ring.length ? 200 + (h(i) % 401) : h(i) % 121));
}

/** The intersections of the line through c along d with the ring's edges, by parameter (doubles). */
function lineHits(ring: readonly LatticePoint[], cx: number, cy: number, dx: number, dy: number): number[] {
  const ts: number[] = [];
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const den = dx * ey - dy * ex;
    if (den === 0) continue;
    const t = ((a.x - cx) * ey - (a.y - cy) * ex) / den;
    const u = ((a.x - cx) * dy - (a.y - cy) * dx) / den;
    if (u >= 0 && u <= 1) ts.push(t);
  }
  return ts.sort((x, y) => x - y);
}

/** One plot's S11 calls on its prepared arena, through the spied façade. */
function plotCalls(k: Kernel, face: number, ring: readonly LatticePoint[], seed: number): void {
  // offsetFace reads the face at its transaction's level: the plot is an L3 face, read in an L3 batch that writes nothing;
  // its distances one per edge in offsetFace's own order (`faceEdges`: the L3 walk from its lowest-leftmost vertex).
  let region: LatticePoint[][] = [];
  k.tx(runnerSpec(3), (o) => {
    const edges = faceEdges(o, face);
    const r = k.geom.offsetFace(face, setbacks(edges.map((e) => e.a), edges.length, seed));
    if (r.ok) region = r.value;
    return { ok: true, value: null, warnings: [] };
  });
  const base = region.length > 0 ? region.reduce((m, r) => (r.length > m.length ? r : m), region[0]) : ring.slice();
  const fit = k.geom.obb(base);
  const rect = k.geom.lir(base);
  // The footprint: the LIR rectangle snapped (the OBB's, a quarter of its size about its centre, where the LIR refused).
  let corners: LatticePoint[] = [];
  let cx = 0;
  let cy = 0;
  let ax = 1;
  let ay = 0;
  if (rect.ok) {
    corners = rect.value.corners.map((q) => ({ x: Math.round(q.x), y: Math.round(q.y) }) as LatticePoint);
    cx = rect.value.centre.x;
    cy = rect.value.centre.y;
    ax = -rect.value.axis.y;
    ay = rect.value.axis.x;
  } else if (fit.ok) {
    const b = fit.value;
    cx = b.centre.x;
    cy = b.centre.y;
    ax = b.minor.x;
    ay = b.minor.y;
    const hu = b.majorCm / 8;
    const hv = b.minorCm / 8;
    corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([s, t]) => ({ x: Math.round(cx + s * hu * b.major.x + t * hv * b.minor.x), y: Math.round(cy + s * hu * b.major.y + t * hv * b.minor.y) }) as LatticePoint);
  } else {
    cx = ring[0].x;
    cy = ring[0].y;
  }
  // The yard partition: one cut across the plot, along the footprint's axis, behind it (its far side plus 1 m).
  const reach = rect.ok ? rect.value.depthCm / 2 + 100 : 100;
  const ox = cx + ax * reach;
  const oy = cy + ay * reach;
  const ts = lineHits(ring, ox, oy, -ay, ax);
  const cut = ts.length >= 2 ? [ts[0], ts[ts.length - 1]].map((t) => ({ x: Math.round(ox - ay * t), y: Math.round(oy + ax * t) }) as LatticePoint) : [{ x: Math.round(ox), y: Math.round(oy) } as LatticePoint];
  // S11's block batch at L4: the yard split, then the footprint (a refused split leaves the yard whole — F-SITEPLAN's).
  k.tx(runnerSpec(4), (o) => {
    k.geom.splitFace(o, face, cut, { rows: [{ role: 'yard_part', entity: `yard:${String(seed)}` }], faceLevel: 3 });
    return k.geom.insertChain(o, corners.length >= 3 ? corners : ring.slice(0, 3), [{ role: 'party_wall', entity: `footprint:${String(seed)}` }], 'mandatory', { closed: true });
  });
}

/** A plot's arena: framed at L0 – L2 (the runner's frame) with the plot ring at L3 (S10's plot line); its L3 face. */
function prepare(ring: readonly LatticePoint[]): { k0: Kernel; face: number } | null {
  const p = runnerFramedAround(ring);
  if (p === null) return null;
  const k0 = runnerKernelOn([p]);
  const r = k0.tx(runnerSpec(3), (o) => k0.geom.insertChain(o, ring, [{ role: 'plot_line', entity: 'plot_line:plot' }], 'mandatory', { closed: true }));
  if (!r.ok) return null;
  const q = runnerInterior(ring);
  if (q === null) return null;
  const at = k0.index.pointLocate(p.key, 3, q);
  if (at.on !== 'face' || at.level !== 3) return null;
  return { k0, face: at.face };
}

/** The per-plot S11 run (untimed): the call list each plot made through the façade. */
export function s11Calls(seed: number, n: number): S11Plot[] {
  return s11Plots(seed, n).map((plot, index) => {
    const calls: S11Call[] = [];
    const prep = prepare(plot.ring);
    let us = 0;
    if (prep !== null) {
      const k = spyKernel(prep.k0, calls);
      const t0 = performance.now();
      plotCalls(k, prep.face, plot.ring, seed * 1_000_003 + index);
      us = (performance.now() - t0) * 1000;
    }
    return { index, kind: plot.kind, calls, us };
  });
}

/** The median of a list (0 for none). */
function median(xs: readonly number[]): number {
  if (xs.length === 0) return 0;
  const s = xs.slice().sort((a, b) => a - b);
  return s.length % 2 === 1 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
}

/**
 * `s11Workload(seed, n)` (C-0107): the per-plot call list and the stamped timing — M0-f-01's `timeBatch` over the n plots,
 * its figure the median per-plot time of the S11 calls (µs; setup excluded). `timing: false` returns the call list
 * untimed; other `timing` options pass to `timeBatch` (the tests hand it built readings).
 */
export async function s11Workload(seed: number, n: number, opts: { readonly timing?: TimeBatchOptions | false } = {}): Promise<S11Workload> {
  if (opts.timing === false) return { seed, calls: s11Calls(seed, n), timings: null };
  let calls: S11Plot[] = [];
  const timings = await timeBatch(
    (): TimedValue => {
      calls = s11Calls(seed, n);
      return { value: median(calls.map((c) => c.us)), unit: 'µs' };
    },
    { label: `S11 synthetic per-plot workload (seed ${String(seed)}, ${String(n)} plots): median µs per plot, setup excluded`, unit: 'µs', ops: n, ...(opts.timing ?? {}) },
  );
  return { seed, calls, timings };
}
