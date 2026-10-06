// The strip stand-in (C-0033; §4.8 *Wall strips*, §4.6 "the wall is a barrier"; M0-c-02): after the trace, two L1
// chains carrying the structural `setback` role on the enceinte — the inner setback line at the band's half plus the
// inner setback (8 m at the default era row) and the outer glacis line at the band's half plus the outer setback and
// glacis (15 m), both read from walls.json's era row, never inlined — each stopping at the corridor of the way through
// each gate, so each strip between two stops is one L1 face, owned by `wall_strip:<enceinte>-<side>` (C-0224 (9)).
//
// The lines are the kernel's `buffer` of the committed trace at each width (round joins; the inner line the buffer's
// hole, the outer its outer ring), cut by the stops (C-0224 (10)): a main gate's stop is its way's corridor, a band of
// the corridor's half-width about the line through the gate along the way (the band's two edges are the strip's two
// ends: a cap on each edge from the line back to the trace closes the strip); a water gate's stop is the water itself
// (the river is its corridor, C-0087: the line ends on the shore and the shore closes the strip); and, given the frame,
// the map border (the glacis line ends on it). An enceinte with no gate keeps both lines whole: each strip a ring face
// with the trace on one side.
import { buffer, err, type Kernel, type KernelResult, type LatticePoint, type PlatKey } from '@plat/kernel';
import type { Enceinte, Id } from '@plat/model';
import type { Row } from '@plat/tables';
import { area2, ccw, clipOutside, crossParams, d2, footOn, lat, openRing, unitOf, type Piece } from './plane.js';
import { l1Spec, stripOwner } from './trace.js';
import type { StripsLaid, StripStop, XY } from './types.js';
import { GROUND } from './water.js';
import { STAGES } from '@plat/kernel';

/** The options of `layStrips`. */
export interface LayStripsOptions {
  readonly key?: PlatKey;
  /**
   * The stops (default: read from the arena — each main gate's way taken along the trace's normal at the gate with
   * `wayHalfWidthCm`, each water gate's water face found between its banks).
   */
  readonly stops?: readonly StripStop[];
  /** The corridor half-width of a main gate's way when the stops are read from the arena. */
  readonly wayHalfWidthCm?: number;
  /** The frame rectangle: the glacis line stops at the map border (default: no stop there). */
  readonly frame?: readonly XY[];
  /** The batch's stage (default S5, the trace's; C-0224 (2)). */
  readonly batchStage?: number;
}

/** A cell of a walls.json era row, in cm. */
function eraCm(row: Row, cell: string): number {
  const c = row.get(cell);
  if (c === undefined || typeof c.value !== 'number') throw new RangeError(`layStrips: the era row has no number cell ${cell}`);
  return Math.round(c.value * 100);
}

/** The strip widths of an era row (C-0033): band half + inner setback, band half + outer setback and glacis (cm). */
export function stripWidths(eraRow: Row): { inner: number; outer: number } {
  const half = eraCm(eraRow, 'thicknessM') * 0.5;
  return { inner: half + eraCm(eraRow, 'innerSetbackM'), outer: half + eraCm(eraRow, 'outerSetbackGlacisM') };
}

/** The committed trace of an enceinte, read through the façade: its one closed run's vertices, counter-clockwise. */
export function traceLine(enceinte: Pick<Enceinte, 'trace'>, k: Kernel, key: PlatKey = GROUND): LatticePoint[] {
  const r = k.resolve(enceinte.trace, key);
  if (r.view !== 'edges' || r.runs.length !== 1) throw new RangeError(`layStrips: the trace ${enceinte.trace.entity} is not one run (${r.view === 'edges' ? String(r.runs.length) : r.view})`);
  const p = k.plat(key);
  const pts = r.runs[0].map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }) as LatticePoint);
  return ccw(openRing(pts));
}

/** A main gate's corridor as a region: the buffer of the way's centreline near the gate by its half-width (flat ends). */
function corridorRings(s: Extract<StripStop, { kind: 'way' }>): KernelResult<XY[][]> {
  const b = buffer([s.path.map((q) => lat(q))], s.halfWidthCm, 'round', 'flat');
  if (!b.ok) return err(b.code, b.detail);
  return { ok: true, value: b.value.map((r) => openRing(r)), warnings: [] };
}

/** Where the trace crosses a region's rings (doubles). */
function crossingsOf(trace: readonly XY[], rings: readonly (readonly XY[])[]): XY[] {
  const out: XY[] = [];
  for (let i = 0; i < trace.length; i += 1) {
    const a = trace[i];
    const b = trace[i + 1 === trace.length ? 0 : i + 1];
    for (const ring of rings) {
      for (let j = 0; j < ring.length; j += 1) {
        const x = crossParams(a, b, ring[j], ring[j + 1 === ring.length ? 0 : j + 1]);
        if (x !== null) out.push({ x: a.x + x.t * (b.x - a.x), y: a.y + x.t * (b.y - a.y) });
      }
    }
  }
  return out;
}

/** The point of `pts` nearest e, or null. */
function nearest(e: XY, pts: readonly XY[]): XY | null {
  let best: XY | null = null;
  let bestD = Infinity;
  for (const q of pts) {
    const dd = d2(q, e);
    if (dd < bestD) {
      bestD = dd;
      best = q;
    }
  }
  return best;
}

/** The stops read from the arena (see `LayStripsOptions.stops`). */
function stopsFromArena(enceinte: Enceinte, k: Kernel, key: PlatKey, trace: readonly LatticePoint[], halfWidthCm: number | undefined, reachCm: number): StripStop[] {
  const p = k.plat(key);
  const at = (v: number): XY => ({ x: p.vertices.x[v], y: p.vertices.y[v] });
  const one = (ref: { role: string; entity: Id; ordinal?: number }): number => {
    const r = k.resolve(ref, key);
    return r.view === 'vertices' && r.vertices.length === 1 ? r.vertices[0] : -1;
  };
  const out: StripStop[] = [];
  for (const g of enceinte.gates) {
    const v = one({ role: 'gate', entity: g });
    if (v >= 0) {
      if (halfWidthCm === undefined) throw new RangeError('layStrips: a main gate\'s corridor needs wayHalfWidthCm when the stops are read from the arena');
      const q = at(v);
      const i = trace.findIndex((t) => t.x === q.x && t.y === q.y);
      const a = trace[i <= 0 ? trace.length - 1 : i - 1];
      const b = trace[i + 1 >= trace.length ? 0 : i + 1];
      // The way taken along the trace's outward normal at the gate, as far as both strips reach on each side.
      const n = unitOf({ x: b.y - a.y, y: -(b.x - a.x) }) ?? { x: 0, y: 1 };
      out.push({ kind: 'way', gate: g, at: q, path: [{ x: q.x - n.x * reachCm, y: q.y - n.y * reachCm }, q, { x: q.x + n.x * reachCm, y: q.y + n.y * reachCm }], halfWidthCm });
      continue;
    }
    const b0 = one({ role: 'gate_end', entity: g, ordinal: 0 });
    const b1 = one({ role: 'gate_end', entity: g, ordinal: 1 });
    if (b0 < 0 || b1 < 0) continue;
    const m = lat({ x: (p.vertices.x[b0] + p.vertices.x[b1]) * 0.5, y: (p.vertices.y[b0] + p.vertices.y[b1]) * 0.5 });
    const loc = k.geom.pointLocate(key, 0, m);
    if (loc.on !== 'face') continue;
    out.push({ kind: 'water', gate: g, ring: k.view(key, 0).rings(loc.face)[0] });
  }
  return out;
}

/** The line's pieces with their caps (see the module comment), as lattice chains with their closed flag. */
function chainsOf(pieces: readonly Piece[], stops: readonly StripStop[], caps: readonly (readonly XY[])[], trace: readonly XY[]): { points: LatticePoint[]; closed: boolean; probe: XY }[] {
  const out: { points: LatticePoint[]; closed: boolean; probe: XY }[] = [];
  for (const piece of pieces) {
    const closed = piece.startOn < 0 && piece.endOn < 0;
    const pts: XY[] = closed ? piece.points.slice(0, -1) : [...piece.points];
    const capAt = (end: XY, on: number): XY | null => {
      const s = on >= 0 && on < stops.length ? stops[on] : null;
      if (s === null || s.kind !== 'way') return null;
      return nearest(end, caps[on]);
    };
    const c0 = closed ? null : capAt(pts[0], piece.startOn);
    const c1 = closed ? null : capAt(pts[pts.length - 1], piece.endOn);
    const chain: XY[] = [...(c0 === null ? [] : [c0]), ...pts, ...(c1 === null ? [] : [c1])];
    const lattice: LatticePoint[] = [];
    for (const q of chain) {
      const l = lat(q);
      const last = lattice[lattice.length - 1];
      if (last === undefined || last.x !== l.x || last.y !== l.y) lattice.push(l);
    }
    // The probe: halfway between the line's middle point and the trace there — inside the strip.
    const m = pts[Math.floor(pts.length / 2)];
    let foot: XY = m;
    let best = Infinity;
    for (let i = 0; i < trace.length; i += 1) {
      const f = footOn(m, trace[i], trace[i + 1 === trace.length ? 0 : i + 1]);
      if (f.d2 < best) {
        best = f.d2;
        foot = f.at;
      }
    }
    out.push({ points: closed ? openRing(lattice) : lattice, closed, probe: { x: (m.x + foot.x) * 0.5, y: (m.y + foot.y) * 0.5 } });
  }
  return out;
}

/**
 * §4.8's strips as C-0033's stand-in (see the module comment): the two setback lines of `enceinte`'s committed trace at
 * the era row's widths, cut at the stops, inserted on L1 in one batch, and each strip's face given its side's owner.
 */
export function layStrips(enceinte: Enceinte, eraRow: Row, k: Kernel, opts: LayStripsOptions = {}): KernelResult<StripsLaid> {
  const key = opts.key ?? GROUND;
  const widths = stripWidths(eraRow);
  const trace = traceLine(enceinte, k, key);
  const closedTrace = [...trace, trace[0]];
  const reach = 4 * (widths.inner + widths.outer);
  const stops = opts.stops ?? stopsFromArena(enceinte, k, key, trace, opts.wayHalfWidthCm, reach);
  const regions: XY[][][] = [];
  for (const s of stops) {
    if (s.kind === 'water') {
      regions.push([[...s.ring]]);
      continue;
    }
    const c = corridorRings(s);
    if (!c.ok) return err(c.code, c.detail);
    regions.push(c.value);
  }
  // Each way's caps: where the trace crosses its corridor's rings (a strip's end closes on the nearest one).
  const caps = regions.map((rings, i) => (stops[i].kind === 'way' ? crossingsOf(trace, rings) : []));
  const frameAt = regions.length;
  if (opts.frame !== undefined) {
    // Outside the frame: the frame within a ring far beyond it (even–odd).
    const f = opts.frame;
    let r = 0;
    for (const q of f) r = Math.max(r, Math.abs(q.x), Math.abs(q.y));
    const big = r * 2 + reach;
    regions.push([[{ x: -big, y: -big }, { x: big, y: -big }, { x: big, y: big }, { x: -big, y: big }], [...f]]);
  }
  const lines = (w: number): { inner: XY[][]; outer: XY[][] } | null => {
    const b = buffer([closedTrace], w, 'round', 'round');
    if (!b.ok) return null;
    const inner: XY[][] = [];
    const outer: XY[][] = [];
    for (const ring of b.value) (area2(ring) < 0 ? inner : outer).push(ccw(openRing(ring)));
    return { inner, outer };
  };
  const inW = lines(widths.inner);
  const outW = lines(widths.outer);
  if (inW === null || outW === null || inW.inner.length === 0 || outW.outer.length === 0) {
    return { ok: false, code: 'E_DEGENERATE', detail: 'collapsed' };
  }
  const regionsInner = regions.slice(0, frameAt);
  const innerChains = inW.inner.flatMap((ring) => chainsOf(clipOutside(ring, true, regionsInner), stops, caps, trace));
  const outerChains = outW.outer.flatMap((ring) => chainsOf(clipOutside(ring, true, regions), stops, caps, trace));
  const owners = { inner: stripOwner(enceinte.id, 'inner'), outer: stripOwner(enceinte.id, 'outer') };
  const row = { role: 'setback', entity: enceinte.id };
  const committed = k.tx(l1Spec(key, opts.batchStage ?? STAGES.S5), (o) => {
    for (const c of [...innerChains, ...outerChains]) {
      const r = k.geom.insertChain(o, c.points, [row], 'mandatory', { closed: c.closed });
      if (!r.ok) return err(r.code, r.detail);
    }
    const facesOf = (chains: readonly { probe: XY }[]): KernelResult<number[]> => {
      const fs: number[] = [];
      for (const c of chains) {
        const loc = k.geom.pointLocate(key, 1, lat(c.probe));
        if (loc.on !== 'face' || loc.level !== 1) return { ok: false, code: 'E_INVARIANT', detail: `layStrips: no L1 strip face at (${String(Math.round(c.probe.x))}, ${String(Math.round(c.probe.y))})` };
        fs.push(loc.face);
      }
      return { ok: true, value: fs, warnings: [] };
    };
    const fi = facesOf(innerChains);
    if (!fi.ok) return err(fi.code, fi.detail);
    const fo = facesOf(outerChains);
    if (!fo.ok) return err(fo.code, fo.detail);
    const si = k.geom.setOwner(o, fi.value, owners.inner);
    if (!si.ok) return err(si.code, si.detail);
    const so = k.geom.setOwner(o, fo.value, owners.outer);
    if (!so.ok) return err(so.code, so.detail);
    return { ok: true, value: { inner: new Set(fi.value).size, outer: new Set(fo.value).size }, warnings: [] };
  });
  if (!committed.ok) return err(committed.code, committed.detail);
  const faces = committed.value.value as { inner: number; outer: number };
  return {
    ok: true,
    value: {
      owners,
      faces,
      lines: { inner: innerChains.map((c) => c.points), outer: outerChains.map((c) => c.points) },
      widthsCm: widths,
    },
    warnings: committed.warnings,
  };
}
