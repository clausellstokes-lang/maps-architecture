// The strip stand-in (C-0033; §4.8 *Wall strips*, §4.6 "the wall is a barrier"; M0-c-02): after the trace, two L1
// chains carrying the structural `setback` role on the enceinte — the inner setback line at the band's half plus the
// inner setback (8 m at the default era row) and the outer glacis line at the band's half plus the outer setback and
// glacis (15 m), both read from walls.json's era row, never inlined — each stopping at the corridor of the way through
// each gate, so each strip between two stops is one L1 face, owned by `wall_strip:<enceinte>-<side>` (C-0226 (9)).
//
// The lines are the kernel's `buffer` of the committed trace at each width (round joins; the inner line the buffer's
// hole, the outer its outer ring), cut by the stops (C-0226 (10)): a main gate's stop is its way's corridor, a band of
// the corridor's half-width about the way's centreline near the gate (the band's two edges are the strip's two ends: a
// cap from the line's end back to where the trace crosses the same edge, on the same side of the way, closes the
// strip); a water gate's stop is the water itself (the river is its corridor, C-0087: the line ends on the shore and
// the shore closes the strip); and, given the frame,
// the map border (the glacis line ends on it; where the border cut it short of a corridor, a cap runs from the trace out
// along the way to the border). An enceinte with no gate keeps both lines whole: each strip a ring face with the trace
// on one side. Each strip's face is found from its line and from its arc of the trace and taken only when it lies within
// the strip's width of the trace and outside every corridor (C-0226 (10)).
import { buffer, err, orient2d, STAGES, type Kernel, type KernelResult, type LatticePoint, type PlatKey } from '@plat/kernel';
import type { Enceinte, Id } from '@plat/model';
import type { Row } from '@plat/tables';
import { quot } from '../siting/geom.js';
import { area2, ccw, clipOutside, crossParams, d2, distToRing, footOn, inside, lat, openRing, unitOf, type Piece } from './plane.js';
import { l1Spec, stripOwner } from './trace.js';
import type { StripsLaid, StripStop, XY } from './types.js';
import { GROUND } from './water.js';

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
  /** The batch's stage (default S5, the trace's; C-0226 (2)). */
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

/** "x,y" of a lattice point. */
function keyOf(p: XY): string {
  return `${String(p.x)},${String(p.y)}`;
}

/** The way's outward direction at the path's side nearest p (the path runs inward to outward). */
function outwardOf(path: readonly XY[], p: XY): XY {
  let best = Infinity;
  let at = 0;
  for (let i = 0; i + 1 < path.length; i += 1) {
    const f = footOn(p, path[i], path[i + 1]);
    if (f.d2 < best) {
      best = f.d2;
      at = i;
    }
  }
  return unitOf({ x: path[at + 1].x - path[at].x, y: path[at + 1].y - path[at].y }) ?? { x: 0, y: 1 };
}

/** Where the ray from p along the unit d first leaves the frame rectangle (its ring's box), or null. */
export function toFrame(p: XY, d: XY, frame: readonly XY[]): XY | null {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const q of frame) {
    minX = Math.min(minX, q.x);
    minY = Math.min(minY, q.y);
    maxX = Math.max(maxX, q.x);
    maxY = Math.max(maxY, q.y);
  }
  let t = Infinity;
  // d is a unit vector: a component below 10⁻⁶ runs along that side and meets it nowhere ahead.
  if (d.x > 1e-6) t = Math.min(t, quot((maxX - p.x) * 1_000_000, d.x * 1_000_000, 'length', 'frame ray'));
  if (d.x < -1e-6) t = Math.min(t, quot((minX - p.x) * 1_000_000, d.x * 1_000_000, 'length', 'frame ray'));
  if (d.y > 1e-6) t = Math.min(t, quot((maxY - p.y) * 1_000_000, d.y * 1_000_000, 'length', 'frame ray'));
  if (d.y < -1e-6) t = Math.min(t, quot((minY - p.y) * 1_000_000, d.y * 1_000_000, 'length', 'frame ray'));
  if (!Number.isFinite(t) || t < 0) return null;
  return { x: p.x + d.x * t, y: p.y + d.y * t };
}

/** The side of the way's centreline a point lies on: the sign of its orientation against the nearest side of the path. */
function sideOf(p: XY, path: readonly XY[]): number {
  let best = Infinity;
  let at = 0;
  for (let i = 0; i + 1 < path.length; i += 1) {
    const f = footOn(p, path[i], path[i + 1]);
    if (f.d2 < best) {
      best = f.d2;
      at = i;
    }
  }
  return Math.sign(orient2d(path[at].x, path[at].y, path[at + 1].x, path[at + 1].y, p.x, p.y));
}

/** The point of `pts` on e's side of the way nearest e, or null. */
function nearest(e: XY, pts: readonly XY[], path: readonly XY[]): XY | null {
  const side = sideOf(e, path);
  let best: XY | null = null;
  let bestD = Infinity;
  for (const q of pts) {
    if (sideOf(q, path) !== side) continue;
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
      return nearest(end, caps[on], s.path);
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
  // Where the frame cut the glacis line short of a corridor (a capped boundary near the map border), the outer strip
  // still stops at the way: a cap from the trace's crossing of the corridor out along the way to the border.
  const used = new Set<string>();
  for (const c of outerChains) {
    if (c.closed || c.points.length === 0) continue;
    used.add(keyOf(c.points[0]));
    used.add(keyOf(c.points[c.points.length - 1]));
  }
  const borderCaps: { points: LatticePoint[]; closed: boolean }[] = [];
  if (opts.frame !== undefined) {
    stops.forEach((s, i) => {
      if (s.kind !== 'way') return;
      for (const t of caps[i]) {
        const T = lat(t);
        if (used.has(keyOf(T))) continue;
        const F = toFrame(T, outwardOf(s.path, T), opts.frame as readonly XY[]);
        if (F !== null && d2(T, F) <= reach * reach && d2(T, F) >= 1) borderCaps.push({ points: [T, lat(F)], closed: false });
      }
    });
  }
  // A probe per arc of the trace between its stops, a metre to each side: every strip's face is found even where its
  // line was cut away (by the border) — and none in the water or beyond the frame.
  const arcProbes = clipOutside(trace, true, regions).map((piece) => {
    const pts = piece.points;
    let total = 0;
    for (let i = 0; i + 1 < pts.length; i += 1) total += Math.sqrt(d2(pts[i], pts[i + 1]));
    let run = 0;
    for (let i = 0; i + 1 < pts.length; i += 1) {
      const l = Math.sqrt(d2(pts[i], pts[i + 1]));
      if (run + l >= total * 0.5 && l > 0) {
        const t = quot(total * 0.5 - run, l, 'length', 'arc middle');
        const m = { x: pts[i].x + t * (pts[i + 1].x - pts[i].x), y: pts[i].y + t * (pts[i + 1].y - pts[i].y) };
        const u = unitOf({ x: pts[i + 1].x - pts[i].x, y: pts[i + 1].y - pts[i].y }) ?? { x: 1, y: 0 };
        return { inner: { x: m.x - u.y * 100, y: m.y + u.x * 100 }, outer: { x: m.x + u.y * 100, y: m.y - u.x * 100 } };
      }
      run += l;
    }
    return null;
  });
  const wet = (q: XY): boolean => stops.some((s) => s.kind === 'water' && inside(s.ring, q));
  const framed = (q: XY): boolean => opts.frame === undefined || inside(opts.frame, q);
  const innerArcProbes = arcProbes.flatMap((a) => (a === null || wet(a.inner) ? [] : [a.inner]));
  const outerArcProbes = arcProbes.flatMap((a) => (a === null || wet(a.outer) || !framed(a.outer) ? [] : [a.outer]));
  const owners = { inner: stripOwner(enceinte.id, 'inner'), outer: stripOwner(enceinte.id, 'outer') };
  const row = { role: 'setback', entity: enceinte.id };
  const committed = k.tx(l1Spec(key, opts.batchStage ?? STAGES.S5), (o) => {
    for (const c of [...innerChains, ...outerChains, ...borderCaps]) {
      const r = k.geom.insertChain(o, c.points, [row], 'mandatory', { closed: c.closed });
      if (!r.ok) return err(r.code, r.detail);
    }
    // Each line's probe and each arc's probe (a metre off the trace) finds a strip's face only where that face lies
    // wholly within the strip's width of the trace and outside every way's corridor (beyond a 5 cm rounding at its
    // edge): the strip itself, also where the border cut its line away — never the open ground or a corridor beyond.
    const isStrip = (face: number, widthCm: number): boolean => {
      const ring = k.view(key, 1).rings(face)[0];
      const inCorridor = (v: XY): boolean =>
        stops.some((st, i) => st.kind === 'way' && ((v.x === st.at.x && v.y === st.at.y) || regions[i].some((r) => inside(r, v) && distToRing(v, r) > 5)));
      return ring.every((v) => distToRing(v, trace) <= widthCm + 100 && !inCorridor(v));
    };
    const facesOf = (probes: readonly XY[], widthCm: number): number[] => {
      const fs: number[] = [];
      for (const q of probes) {
        const loc = k.geom.pointLocate(key, 1, lat(q));
        if (loc.on !== 'face' || loc.level !== 1 || fs.includes(loc.face)) continue;
        if (isStrip(loc.face, widthCm)) fs.push(loc.face);
      }
      return fs;
    };
    const fi = facesOf([...innerChains.map((c) => c.probe), ...innerArcProbes], widths.inner);
    const fo = facesOf([...outerChains.map((c) => c.probe), ...outerArcProbes], widths.outer);
    // A side with a line and no strip face, or a face both sides found, is no strip: the lines did not close it
    // (refused, never a strip across the wall or none at all).
    if ((innerChains.length > 0 && fi.length === 0) || (outerChains.length > 0 && fo.length === 0)) return { ok: false, code: 'E_INVARIANT', detail: 'layStrips: a side\'s lines closed no strip face' };
    if (fi.some((f) => fo.includes(f))) return { ok: false, code: 'E_INVARIANT', detail: 'layStrips: one face on both sides of the wall' };
    const si = k.geom.setOwner(o, fi, owners.inner);
    if (!si.ok) return err(si.code, si.detail);
    const so = k.geom.setOwner(o, fo, owners.outer);
    if (!so.ok) return err(so.code, so.detail);
    return { ok: true, value: { inner: fi.length, outer: fo.length }, warnings: [] };
  });
  if (!committed.ok) return err(committed.code, committed.detail);
  const faces = committed.value.value as { inner: number; outer: number };
  return {
    ok: true,
    value: {
      owners,
      faces,
      lines: { inner: innerChains.map((c) => c.points), outer: [...outerChains.map((c) => c.points), ...borderCaps.map((c) => c.points)] },
      widthsCm: widths,
    },
    warnings: committed.warnings,
  };
}
