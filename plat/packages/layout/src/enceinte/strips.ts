// The strip stand-in (C-0033; §4.8 *Wall strips*, §4.6 "the wall is a barrier"; M0-c-02): after the trace, two L1
// chains carrying the structural `setback` role on the enceinte — the inner setback line at the band's half plus the
// inner setback (8 m at the default era row) and the outer glacis line at the band's half plus the outer setback and
// glacis (15 m), both read from walls.json's era row, never inlined — each stopping at the corridor of every way it
// meets, so each strip between two stops is one L1 face, owned by `wall_strip:<enceinte>-<side>` (C-0226 (9)).
//
// The lines are the kernel's `buffer` of the committed trace at each width (round joins; the inner line the buffer's
// hole, the outer its outer ring), cut by the stops (C-0226 (10)): a main gate's stop is its way's corridor, a band of
// the corridor's half-width about the way's centreline (flat ends); a water gate's stop is the water itself (the river is
// its corridor, C-0087: the line ends on the shore and the shore closes the strip); and, given the frame, the map border
// (the glacis line ends on it; where the border cut it short of a corridor, a cap runs from the trace out along the way
// to the border). An enceinte with no gate keeps both lines whole: each strip a ring face with the trace on one side.
// A line's end on a corridor is capped back to the trace along the corridor's edge (RQ5; §4.8 as amended by item 130
// (b)): the cap follows the corridor's ring inside the strip's band from the line's end to where that ring meets the
// trace, the line again, the water or another corridor — the straight cap to the nearest crossing of the trace on the
// same side of the way (C-0226 (10)) where the edge departs from that chord by no more than `CORRIDOR_SLACK_CM` and ends
// at that crossing; and every other piece of a corridor's ring inside a strip's band (a corridor running inside the
// strip's width, along its whole length there) is laid as a setback chain of its own, so the strip's boundary follows
// the corridor's edge and no strip face overlaps a corridor. The stops are every way the strips meet (RQ5; Q27): the
// stops given, merged with the stops read from the arena — each main gate's way (the way chain through the gate's vertex,
// whole, else the stand-in along the trace's normal at the gate), each water gate's water face, every other way chain in
// the arena — a read stop dropped where a given stop names its gate or its water ring; and the corridors given
// (`LayStripsOptions.corridors`, a gate's way along its whole length) and the arena's other ways are stops only where
// their corridor runs inside a strip's band beyond the stops' corridors by more than `CORRIDOR_SLACK_CM`
// (`intrudes`), so the strips of an enceinte no corridor meets beyond its gates' passages are laid as the stand-in lays
// them.
// A face is a strip's by area (§4.8 as amended; item 130 (b)): every face of the batch's lines and of the trace is a
// candidate — the faces the probes meet (a probe halfway from each line's middle to the trace, a probe a metre off the
// trace at each arc between stops) and every L1 face holding a vertex of the trace or of the setback chains laid, but
// not one in the water, beyond the frame or already owned — its side read from its vertices against the trace; it is
// the strip's when it lies within the strip's width of the trace (every vertex within the width and a metre, and on the
// trace's side of the setback line: from a side of it on that line a step into it never leads away from the trace), holds no
// gate's vertex, no vertex deeper than `CORRIDOR_SLACK_CM` inside a corridor, and its interior meets no corridor: no
// point of its ring lies deeper than `CORRIDOR_SLACK_CM` inside a corridor and no vertex of a corridor's centreline lies
// inside it (N-43 B's fidelity bound at the corridor's edge, C-0311). A side with a line left with no strip face is
// refused E_INVARIANT with the first barring vertex and its cause named. The water splits a strip where the trace runs
// along a bank (a graze): each piece is a face of the side's owner (C-0226 (10)'s reading, N-6).
// The frame proof (C-0282 (7); §4.13's wall × frame law, never a line past the map border): given the frame, every
// setback vertex lies inside the frame or on its border, before the batch and inside it; one beyond it refuses the
// strips E_INVARIANT, nothing written.
import { buffer, err, isHalfEdgeLive, LATTICE, orient2d, rowKey, rowsOn, STAGES, type HalfEdgeId, type Kernel, type KernelResult, type LatticePoint, type PlatKey } from '@plat/kernel';
import type { Enceinte, Id } from '@plat/model';
import type { Row } from '@plat/tables';
import { insideRing, quot } from '../siting/geom.js';
import { area2, ccw, clipOutside, crossParams, d2, dist, distToRing, footOn, inside, lat, openRing, unitOf, type Piece } from './plane.js';
import { l1Spec, stripOwner } from './trace.js';
import type { StripsLaid, StripStop, XY } from './types.js';
import { GROUND } from './water.js';
import { WET_TOL_CM, wetSides } from './wet.js';

/** The options of `layStrips`. */
export interface LayStripsOptions {
  readonly key?: PlatKey;
  /**
   * The stops, merged with the stops read from the arena (Q27): each main gate's way (the way chain through its vertex,
   * whole, else along the trace's normal at the gate with `wayHalfWidthCm`), each water gate's water face; a read stop
   * is dropped where a given stop names its gate (or, for water, its ring). Default: the arena's alone.
   */
  readonly stops?: readonly StripStop[];
  /**
   * The corridor half-width of a way read from the arena (default: the widest given way stop's; a main gate read from the
   * arena with neither is a RangeError).
   */
  readonly wayHalfWidthCm?: number;
  /** The frame rectangle: the glacis line stops at the map border (default: no stop there). */
  readonly frame?: readonly XY[];
  /** The batch's stage (default S5, the trace's; C-0226 (2)). */
  readonly batchStage?: number;
  /**
   * Corridors the strips must keep out of beside the stops (RQ5): a gate's way along its whole length (each a `way` stop
   * whose `path` is the way's centreline). Each is a stop where its corridor runs inside a strip's band beyond the stops'
   * corridors (`intrudes`); default none.
   */
  readonly corridors?: readonly Extract<StripStop, { kind: 'way' }>[];
}

/**
 * How far a strip face's vertex may stand inside a way's corridor and the face still be the strip's (cm): N-43 B's
 * fidelity bound, 2 · √2 · `attractCm` ≈ 73.5 cm — the farthest the insertion may set a vertex from the input it was
 * given on the corridor's edge (C-0311; N-56 (3)). A corridor is 7 m or more from its centreline at CITY (C-0226 (10)),
 * so a face crossing it holds its gate vertex or a vertex deeper than this: such a face is no strip face, and a side
 * left with none is refused E_INVARIANT, the vertex and its depth named (C-0311).
 */
export const CORRIDOR_SLACK_CM = Math.sqrt(8 * LATTICE.attractCm * LATTICE.attractCm);

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

/** A way's corridor as a region: the buffer of the way's centreline by its half-width (flat ends). */
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

/** The ordered vertices of each run of a chain, read through the façade (a run's closing vertex repeated when it closes). */
function runPoints(k: Kernel, key: PlatKey, ref: { role: string; entity: Id }): XY[][] {
  const r = k.resolve(ref, key);
  if (r.view !== 'edges') return [];
  const p = k.plat(key);
  return r.runs.map((run) => {
    const pts: XY[] = run.map((h) => ({ x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] }));
    const last = run[run.length - 1];
    pts.push({ x: p.vertices.x[p.halfEdges.origin[last ^ 1]], y: p.vertices.y[p.halfEdges.origin[last ^ 1]] });
    return pts;
  });
}

/** The arena's way chains (role `way`), by entity, in the order of their first live edge (the arena's own rows). */
function arenaWays(k: Kernel, key: PlatKey): Id[] {
  const p = k.plat(key);
  const out: Id[] = [];
  const seen = new Set<string>();
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) {
    if (!isHalfEdgeLive(p, h as HalfEdgeId)) continue;
    for (const hh of [h, h ^ 1]) {
      for (const r of rowsOn(p, 'edge', hh as HalfEdgeId)) {
        const row = rowKey(p, r);
        if (row.role !== 'way' || seen.has(row.entity)) continue;
        seen.add(row.entity);
        out.push(row.entity);
      }
    }
  }
  return out;
}

/**
 * The stops read from the arena (see `LayStripsOptions.stops`), less those a given stop names: `skip` holds the given
 * stops' gates and the given water stops' ring keys.
 */
function stopsFromArena(enceinte: Enceinte, k: Kernel, key: PlatKey, trace: readonly LatticePoint[], halfWidthCm: number | undefined, reachCm: number, skip: { gates: ReadonlySet<Id>; rings: ReadonlySet<string> }): StripStop[] {
  const p = k.plat(key);
  const at = (v: number): XY => ({ x: p.vertices.x[v], y: p.vertices.y[v] });
  const one = (ref: { role: string; entity: Id; ordinal?: number }): number => {
    const r = k.resolve(ref, key);
    return r.view === 'vertices' && r.vertices.length === 1 ? r.vertices[0] : -1;
  };
  const out: StripStop[] = [];
  for (const g of enceinte.gates) {
    if (skip.gates.has(g)) continue;
    const v = one({ role: 'gate', entity: g });
    if (v >= 0) {
      if (halfWidthCm === undefined) throw new RangeError('layStrips: a main gate\'s corridor needs wayHalfWidthCm when the stops are read from the arena');
      const q = at(v);
      // The way through the gate, whole (RQ5): the way chain whose run passes the gate's vertex.
      const through = wayThrough(k, key, q);
      if (through !== null) {
        out.push({ kind: 'way', gate: g, at: q, path: through, halfWidthCm });
        continue;
      }
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
    const ring = k.view(key, 0).rings(loc.face)[0];
    if (skip.rings.has(ringKey(ring))) continue;
    out.push({ kind: 'water', gate: g, ring });
  }
  return out;
}

/** A ring's identity: its vertices in order. */
function ringKey(ring: readonly XY[]): string {
  return ring.map((q) => keyOf(q)).join(';');
}

/** The run of the arena's way chain through the vertex at q (the first way, in arena order, one of whose runs passes it). */
function wayThrough(k: Kernel, key: PlatKey, q: XY): XY[] | null {
  for (const w of arenaWays(k, key)) {
    for (const run of runPoints(k, key, { role: 'way', entity: w })) {
      if (run.some((r) => r.x === q.x && r.y === q.y)) return run;
    }
  }
  return null;
}

/** The signed depth of q in a region read even–odd: its distance from the nearest ring line, positive inside. */
function depthIn(rings: readonly (readonly XY[])[], q: XY): number {
  let odd = false;
  let best = Infinity;
  for (const r of rings) {
    if (r.length < 2) continue;
    if (inside(r, q)) odd = !odd;
    const d = distToRing(q, r);
    if (d < best) best = d;
  }
  return odd ? best : -best;
}

/**
 * Does some point of segment ab lie inside the region deeper than `tol` (cm)? The signed depth is 1-Lipschitz, so a stretch
 * of half-length h about a point of depth d holds nothing deeper than d + h: stretches are halved until a middle is deeper
 * than `tol` (true) or the bound clears them (false); a stretch under a centimetre is cleared at `tol` plus half of it.
 */
function deeperThan(a: XY, b: XY, rings: readonly (readonly XY[])[], tol: number): boolean {
  const len = dist(a, b);
  const stack: number[] = [0, 1];
  while (stack.length > 0) {
    const t1 = stack.pop() as number;
    const t0 = stack.pop() as number;
    const tm = (t0 + t1) * 0.5;
    const m = { x: a.x + tm * (b.x - a.x), y: a.y + tm * (b.y - a.y) };
    const half = len * (t1 - t0) * 0.5;
    const d = depthIn(rings, m);
    if (d > tol) return true;
    if (d + half <= tol || half * 2 < 1) continue;
    stack.push(t0, tm, tm, t1);
  }
  return false;
}

/** A way corridor the strips stop at: its stop, its rings, and its index in the regions. */
interface Corridor {
  readonly stop: Extract<StripStop, { kind: 'way' }>;
  readonly rings: XY[][];
}

/**
 * Does the corridor run inside a strip's band beyond the regions `cut` by more than `CORRIDOR_SLACK_CM` (RQ5)? Its interior
 * points deeper than the slack — about its centreline every 25 cm, at the centreline and at half and all of the depth left
 * on each side — tested against each side's band (inside the trace within the inner width, outside it within the outer)
 * and found outside every region of `cut` (the stops' corridors and the water) and inside the frame.
 */
function intrudes(c: Extract<StripStop, { kind: 'way' }>, trace: readonly XY[], widths: { inner: number; outer: number }, cut: readonly (readonly (readonly XY[])[])[], frame: readonly XY[] | undefined): boolean {
  const h = c.halfWidthCm;
  const deep = h - CORRIDOR_SLACK_CM - 1;
  if (deep <= 0) return false;
  const reach = h + Math.max(widths.inner, widths.outer) + 100;
  const path = c.path;
  for (let i = 0; i + 1 < path.length; i += 1) {
    const a = path[i];
    const b = path[i + 1];
    // A side of the path farther than the reach from every side of the trace meets no band.
    let near = false;
    for (let j = 0; j < trace.length && !near; j += 1) {
      const c0 = trace[j];
      const c1 = trace[j + 1 === trace.length ? 0 : j + 1];
      if (Math.min(footOn(a, c0, c1).d2, footOn(b, c0, c1).d2, footOn(c0, a, b).d2, footOn(c1, a, b).d2) < reach * reach) near = true;
    }
    if (!near) continue;
    const len = dist(a, b);
    const u = unitOf({ x: b.x - a.x, y: b.y - a.y });
    if (u === null) continue;
    const n = Math.max(1, Math.ceil(quot(len, 25, 'length', 'corridor sample')));
    // The path's two free ends: a flat end holds no point deeper than the slack within the slack of it.
    const skip0 = i === 0 ? CORRIDOR_SLACK_CM + 1 : -1;
    const skip1 = i + 2 === path.length ? CORRIDOR_SLACK_CM + 1 : -1;
    for (let s = 0; s <= n; s += 1) {
      const along = quot(s * len, n, 'count', 'corridor sample');
      if (along < skip0 || len - along < skip1) continue;
      for (const o of [-deep, -deep * 0.5, 0, deep * 0.5, deep]) {
        const q = { x: a.x + u.x * along - u.y * o, y: a.y + u.y * along + u.x * o };
        const dt = distToRing(q, trace);
        const inner = inside(trace, q);
        if (dt >= (inner ? widths.inner : widths.outer)) continue;
        if (frame !== undefined && !insideRing(frame, q, true)) continue;
        if (cut.some((rings) => depthIn(rings, q) > 0)) continue;
        return true;
      }
    }
  }
  return false;
}

/** A piece of a corridor's ring inside one side's band, with what each end lies on. */
interface RingPiece {
  readonly points: XY[];
  readonly corridor: number;
  readonly start: EndOn;
  readonly end: EndOn;
  readonly closed: boolean;
  used: boolean;
}

/** What a corridor ring piece's end lies on. */
type EndOn = 'trace' | 'line' | 'corridor' | 'water' | 'frame' | 'none';

/**
 * §4.8's strips as C-0033's stand-in (see the module comment): the two setback lines of `enceinte`'s committed trace at
 * the era row's widths, cut at the stops, capped along the corridors' edges, inserted on L1 in one batch, and each strip's
 * face given its side's owner.
 */
export function layStrips(enceinte: Enceinte, eraRow: Row, k: Kernel, opts: LayStripsOptions = {}): KernelResult<StripsLaid> {
  const key = opts.key ?? GROUND;
  const widths = stripWidths(eraRow);
  const trace = traceLine(enceinte, k, key);
  const closedTrace = [...trace, trace[0]];
  const reach = 4 * (widths.inner + widths.outer);
  // The stops: the given ones, merged with the arena's (Q27): a read stop a given one names is dropped.
  const given = opts.stops ?? [];
  let widest: number | undefined = opts.wayHalfWidthCm;
  if (widest === undefined) for (const s of given) if (s.kind === 'way' && (widest === undefined || s.halfWidthCm > widest)) widest = s.halfWidthCm;
  const skip = { gates: new Set<Id>(given.map((s) => s.gate)), rings: new Set<string>(given.flatMap((s) => (s.kind === 'water' ? [ringKey(s.ring)] : []))) };
  const stops: StripStop[] = [...given, ...stopsFromArena(enceinte, k, key, trace, widest, reach, skip)];
  const regions: XY[][][] = [];
  const corridors = new Map<number, Corridor>();
  for (const s of stops) {
    if (s.kind === 'water') {
      regions.push([[...s.ring]]);
      continue;
    }
    const c = corridorRings(s);
    if (!c.ok) return err(c.code, c.detail);
    corridors.set(regions.length, { stop: s, rings: c.value });
    regions.push(c.value);
  }
  // The corridors beside the stops (RQ5): each given corridor and each of the arena's other ways (no gate of this
  // enceinte on it) is a stop where it runs inside a strip's band beyond the stops' corridors.
  const extras: Extract<StripStop, { kind: 'way' }>[] = [...(opts.corridors ?? [])];
  if (widest !== undefined) {
    const gateAt = new Set<string>();
    for (const s of stops) if (s.kind === 'way') gateAt.add(keyOf(s.at));
    for (const w of arenaWays(k, key)) {
      for (const run of runPoints(k, key, { role: 'way', entity: w })) {
        if (run.some((q) => gateAt.has(keyOf(q)))) continue;
        extras.push({ kind: 'way', gate: w, at: run[0], path: run, halfWidthCm: widest });
      }
    }
  }
  for (const x of extras) {
    if (!intrudes(x, trace, widths, regions, opts.frame)) continue;
    const c = corridorRings(x);
    if (!c.ok) return err(c.code, c.detail);
    corridors.set(regions.length, { stop: x, rings: c.value });
    regions.push(c.value);
  }
  const corridorStop = (i: number): Extract<StripStop, { kind: 'way' }> | null => corridors.get(i)?.stop ?? null;
  // Each way's caps: where the trace crosses its corridor's rings (a strip's end closes on the nearest one).
  const caps = regions.map((rings, i) => (corridors.has(i) ? crossingsOf(trace, rings) : []));
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
  // The corridors' rings inside each side's band (RQ5): the ring pieces outside the band's complement (beyond the trace,
  // beyond the line), outside every other corridor, the water and (outside) the frame.
  let span = 0;
  for (const rings of regions) for (const ring of rings) for (const q of ring) span = Math.max(span, Math.abs(q.x), Math.abs(q.y));
  for (const q of trace) span = Math.max(span, Math.abs(q.x), Math.abs(q.y));
  const far = span * 2 + reach + 1000;
  const bigRing: XY[] = [{ x: -far, y: -far }, { x: far, y: -far }, { x: far, y: far }, { x: -far, y: far }];
  const piecesOf = (side: 'inner' | 'outer'): RingPiece[] => {
    const comp: XY[][][] = side === 'inner' ? [[bigRing, [...trace]], inW.inner] : [[[...trace]], [bigRing, ...outW.outer]];
    const out: RingPiece[] = [];
    for (const [j, c] of corridors) {
      const others: { rings: XY[][]; on: EndOn }[] = [];
      regions.forEach((rs, i) => {
        if (i === j || (side === 'inner' && i === frameAt)) return;
        others.push({ rings: rs, on: i === frameAt ? 'frame' : corridors.has(i) ? 'corridor' : 'water' });
      });
      const all = [...comp, ...others.map((o) => o.rings)];
      const onOf = (r: number): EndOn => (r < 0 ? 'none' : r === 0 ? 'trace' : r === 1 ? 'line' : others[r - 2].on);
      for (const ring of c.rings) {
        for (const piece of clipOutside(ring, true, all)) {
          // A piece running along the trace or the line (a flat end laid on it) bounds nothing new.
          if (alongBoundary(piece.points, trace, side === 'inner' ? inW.inner : outW.outer)) continue;
          const closed = piece.startOn < 0 && piece.endOn < 0;
          out.push({ points: piece.points, corridor: j, start: onOf(piece.startOn), end: onOf(piece.endOn), closed, used: false });
        }
      }
    }
    return out;
  };
  const sidePieces = { inner: piecesOf('inner'), outer: piecesOf('outer') };
  const near2 = 0.25;
  // A line's end on a corridor (see the module comment): the cap points after the end, in order from it, or null.
  const capFor = (side: 'inner' | 'outer', end: XY, on: number): XY[] | null => {
    const s = corridorStop(on);
    if (s === null) return null;
    const T = nearest(end, caps[on], s.path);
    let w: XY[] | null = null;
    let farOn: EndOn = 'none';
    for (const rp of sidePieces[side]) {
      if (rp.corridor !== on || rp.closed) continue;
      const first = rp.points[0];
      const last = rp.points[rp.points.length - 1];
      if (d2(first, end) <= near2) {
        if (rp.used) return null;
        rp.used = true;
        w = rp.points.slice(1);
        farOn = rp.end;
        break;
      }
      if (d2(last, end) <= near2) {
        if (rp.used) return null;
        rp.used = true;
        w = rp.points.slice(0, -1).reverse();
        farOn = rp.start;
        break;
      }
    }
    if (w === null || w.length === 0 || farOn === 'frame') return T === null ? null : [T];
    const tail = w[w.length - 1];
    if (farOn === 'trace') {
      // The crossing the edge reaches, as the trace's crossings hold it (the same double the chord would end on).
      let at: XY = tail;
      let best = near2;
      for (const q of caps[on]) {
        const dd = d2(q, tail);
        if (dd <= best) {
          best = dd;
          at = q;
        }
      }
      if (T !== null && at === T && w.slice(0, -1).every((q) => footOn(q, end, T).d2 <= CORRIDOR_SLACK_CM * CORRIDOR_SLACK_CM)) return [T];
      return [...w.slice(0, -1), at];
    }
    return w;
  };
  const chainsOf = (side: 'inner' | 'outer', pieces: readonly Piece[]): { points: LatticePoint[]; closed: boolean; probe: XY }[] => {
    const out: { points: LatticePoint[]; closed: boolean; probe: XY }[] = [];
    for (const piece of pieces) {
      const closed = piece.startOn < 0 && piece.endOn < 0;
      const pts: XY[] = closed ? piece.points.slice(0, -1) : [...piece.points];
      const c0 = closed ? null : capFor(side, pts[0], piece.startOn);
      const c1 = closed ? null : capFor(side, pts[pts.length - 1], piece.endOn);
      const chain: XY[] = [...(c0 === null ? [] : [...c0].reverse()), ...pts, ...(c1 === null ? [] : c1)];
      out.push({ points: latChain(chain, closed), closed, probe: probeOf(pts, trace) });
    }
    return out;
  };
  const innerChains = inW.inner.flatMap((ring) => chainsOf('inner', clipOutside(ring, true, regionsInner)));
  const outerChains = outW.outer.flatMap((ring) => chainsOf('outer', clipOutside(ring, true, regions)));
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
    for (const [i, c] of corridors) {
      for (const t of caps[i]) {
        const T = lat(t);
        if (used.has(keyOf(T))) continue;
        const F = toFrame(T, outwardOf(c.stop.path, T), opts.frame);
        if (F !== null && d2(T, F) <= reach * reach && d2(T, F) >= 1) borderCaps.push({ points: [T, lat(F)], closed: false });
      }
    }
  }
  // Every other piece of a corridor's ring inside a strip's band (RQ5): its own setback chain (the border's pieces are
  // the border caps').
  const freePieces: { points: LatticePoint[]; closed: boolean }[] = [];
  for (const side of ['inner', 'outer'] as const) {
    for (const rp of sidePieces[side]) {
      if (rp.used || rp.start === 'frame' || rp.end === 'frame') continue;
      let len = 0;
      for (let i = 0; i + 1 < rp.points.length; i += 1) len += dist(rp.points[i], rp.points[i + 1]);
      if (len < 1) continue;
      const pts = rp.closed ? rp.points.slice(0, -1) : rp.points;
      const l = latChain(pts, rp.closed);
      if (l.length >= 2) freePieces.push({ points: l, closed: rp.closed });
    }
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
  const waterRings = stops.flatMap((s) => (s.kind === 'water' ? [s.ring] : []));
  const wet = (q: XY): boolean => waterRings.some((r) => inside(r, q));
  const framed = (q: XY): boolean => opts.frame === undefined || inside(opts.frame, q);
  const innerArcProbes = arcProbes.flatMap((a) => (a === null || wet(a.inner) ? [] : [a.inner]));
  const outerArcProbes = arcProbes.flatMap((a) => (a === null || wet(a.outer) || !framed(a.outer) ? [] : [a.outer]));
  // Given the frame, every setback vertex lies inside the frame or on its border, before the batch and again where the
  // insertion placed it (C-0282 (7)).
  const beyond = (q: XY): boolean => opts.frame !== undefined && !insideRing(opts.frame, q, true);
  const frameRefusal = (q: XY): { ok: false; code: 'E_INVARIANT'; detail: string } => ({ ok: false, code: 'E_INVARIANT', detail: `layStrips: a setback vertex (${String(q.x)}, ${String(q.y)}) lies beyond the frame (§4.13 wall × frame; N-54 (1))` });
  // A chain shorter than the insertion's attraction distance is below its floor: the insertion lands it whole on the
  // existing vertices (§3.6 step 2) and refuses it E_DEGENERATE `empty`; it bounds nothing the slack does not (census
  // R-31), so it is not laid.
  const chainLength = (c: { points: readonly XY[]; closed: boolean }): number => {
    let len = 0;
    for (let i = 0; i + 1 < c.points.length; i += 1) len += dist(c.points[i], c.points[i + 1]);
    return c.closed && c.points.length > 1 ? len + dist(c.points[c.points.length - 1], c.points[0]) : len;
  };
  const laid = [...innerChains, ...outerChains, ...borderCaps, ...freePieces].filter((c) => chainLength(c) >= LATTICE.attractCm);
  for (const c of laid) {
    const off = c.points.find(beyond);
    if (off !== undefined) return frameRefusal(off);
  }
  const owners = { inner: stripOwner(enceinte.id, 'inner'), outer: stripOwner(enceinte.id, 'outer') };
  const row = { role: 'setback', entity: enceinte.id };
  const wayCorridors = [...corridors.values()];
  const wetTest = wetSides(waterRings, waterRings.length);
  const outsideFrame: XY[][] | null = opts.frame === undefined ? null : regions[frameAt];
  const committed = k.tx(l1Spec(key, opts.batchStage ?? STAGES.S5), (o) => {
    const touched = new Set<string>(trace.map((q) => keyOf(q)));
    for (const c of laid) {
      const r = k.geom.insertChain(o, c.points, [row], 'mandatory', { closed: c.closed });
      if (!r.ok) return err(r.code, r.detail);
      const pl = k.plat(key);
      for (const v of r.value.placed) {
        const q = { x: pl.vertices.x[v], y: pl.vertices.y[v] };
        if (beyond(q)) return frameRefusal(q);
        touched.add(keyOf(q));
      }
    }
    // The candidates (see the module comment): the faces the probes meet, in probe order, then every L1 face holding a
    // vertex of the trace or of the chains laid that lies on land inside the frame and has no owner yet.
    const view = k.view(key, 1);
    const cm = (d: number): string => String(Math.round(d));
    // A face's rings — its outer ring and its holes (an annulus where a line runs uncut round the trace) — read whole.
    const ringsOf = (face: number): LatticePoint[][] => view.rings(face);
    const inFace = (rings: readonly (readonly XY[])[], q: XY): boolean => {
      let odd = false;
      for (const r of rings) if (insideRing(r, q, false)) odd = !odd;
      return odd;
    };
    const whyNot = (face: number, widthCm: number): string | null => {
      const rings = ringsOf(face);
      for (const v of rings.flat()) {
        const at = `(${String(v.x)}, ${String(v.y)})`;
        const dt = distToRing(v, trace);
        if (dt > widthCm + 100) return `vertex ${at} lies ${cm(dt)} cm from the trace, beyond the strip's ${cm(widthCm)} cm`;
        for (const c of wayCorridors) {
          const st = c.stop;
          if (v.x === st.at.x && v.y === st.at.y) return `vertex ${at} is ${st.gate}'s gate vertex (the face crosses its corridor)`;
          for (const r of c.rings) {
            if (!inside(r, v)) continue;
            const depth = distToRing(v, r);
            if (depth > CORRIDOR_SLACK_CM) return `vertex ${at} lies ${cm(depth)} cm inside ${st.gate}'s corridor, beyond the fidelity bound (${cm(CORRIDOR_SLACK_CM)} cm)`;
          }
        }
      }
      // By area (RQ5): the face keeps to its side's strip zone — from a side of it on the setback line (both ends the
      // strip's width from the trace), a step into the face never leads away from the trace. A face beyond the setback
      // line (the town's, or the open country's) is no strip however near the trace its vertices stand.
      for (let ri = 0; ri < rings.length; ri += 1) {
        const ring = rings[ri];
        const turn = (area2(ring) > 0 ? 1 : -1) * (ri === 0 ? 1 : -1);
        for (let i = 0; i < ring.length; i += 1) {
          const a = ring[i];
          const b = ring[i + 1 === ring.length ? 0 : i + 1];
          const l = dist(a, b);
          if (l < 40 || Math.abs(distToRing(a, trace) - widthCm) > 5 || Math.abs(distToRing(b, trace) - widthCm) > 5) continue;
          const m = { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
          const step = quot(20, l, 'length', 'setback side step');
          const q = { x: m.x - turn * (b.y - a.y) * step, y: m.y + turn * (b.x - a.x) * step };
          if (distToRing(q, trace) > distToRing(m, trace) + 10) return `its side (${String(a.x)}, ${String(a.y)}) → (${String(b.x)}, ${String(b.y)}) on the setback line faces away from the trace (the face lies beyond the strip's ${cm(widthCm)} cm)`;
        }
      }
      // By area (RQ5): no point of the face's rings deeper than the slack inside a corridor, no centreline vertex inside it.
      for (const c of wayCorridors) {
        for (const ring of rings) {
          for (let i = 0; i < ring.length; i += 1) {
            const a = ring[i];
            const b = ring[i + 1 === ring.length ? 0 : i + 1];
            if (deeperThan(a, b, c.rings, CORRIDOR_SLACK_CM)) return `its side (${String(a.x)}, ${String(a.y)}) → (${String(b.x)}, ${String(b.y)}) runs ${cm(CORRIDOR_SLACK_CM)} cm or more inside ${c.stop.gate}'s corridor (its interior meets the corridor)`;
          }
        }
        const q = c.stop.path.find((p) => inFace(rings, p) && depthIn(c.rings, p) > CORRIDOR_SLACK_CM);
        if (q !== undefined) return `${c.stop.gate}'s centreline (${cm(q.x)}, ${cm(q.y)}) lies inside it (its interior meets the corridor)`;
      }
      return null;
    };
    const sideOfFace = (face: number): 'inner' | 'outer' | null => {
      for (const v of ringsOf(face).flat()) {
        if (distToRing(v, trace) <= 1) continue;
        return inside(trace, v) ? 'inner' : 'outer';
      }
      return null;
    };
    const foreign = (face: number): boolean => {
      for (const ring of ringsOf(face)) {
        for (let i = 0; i < ring.length; i += 1) {
          const a = ring[i];
          const b = ring[i + 1 === ring.length ? 0 : i + 1];
          if (wetTest.over(a, b)) return true;
          if (outsideFrame !== null && deeperThan(a, b, outsideFrame, WET_TOL_CM)) return true;
        }
      }
      return false;
    };
    const found = { inner: [] as number[], outer: [] as number[] };
    const why: { inner: string | null; outer: string | null } = { inner: null, outer: null };
    const seen = new Set<number>();
    const take = (face: number, side: 'inner' | 'outer'): void => {
      if (seen.has(face)) return;
      seen.add(face);
      const w = whyNot(face, side === 'inner' ? widths.inner : widths.outer);
      if (w === null) found[side].push(face);
      else why[side] ??= w;
    };
    for (const [probes, hint] of [[[...innerChains.map((c) => c.probe), ...innerArcProbes], 'inner'], [[...outerChains.map((c) => c.probe), ...outerArcProbes], 'outer']] as const) {
      for (const q of probes) {
        const loc = k.geom.pointLocate(key, 1, lat(q));
        if (loc.on !== 'face' || loc.level !== 1) continue;
        take(loc.face, sideOfFace(loc.face) ?? hint);
      }
    }
    for (const f of view.faces()) {
      if (seen.has(f) || view.owner(f) !== null) continue;
      if (!ringsOf(f).some((r) => r.some((v) => touched.has(keyOf(v))))) continue;
      const side = sideOfFace(f);
      if (side === null || foreign(f)) continue;
      if (whyNot(f, side === 'inner' ? widths.inner : widths.outer) !== null) continue;
      seen.add(f);
      found[side].push(f);
    }
    const fi = found.inner;
    const fo = found.outer;
    // A side with a line and no strip face is no strip: the lines did not close it (refused, never a strip across the
    // wall or none at all), the barring vertex and its cause named.
    if (innerChains.length > 0 && fi.length === 0) return { ok: false, code: 'E_INVARIANT', detail: `layStrips: a side's lines closed no strip face — the inner side: ${why.inner ?? 'no probe met an L1 face'}` };
    if (outerChains.length > 0 && fo.length === 0) return { ok: false, code: 'E_INVARIANT', detail: `layStrips: a side's lines closed no strip face — the outer side: ${why.outer ?? 'no probe met an L1 face'}` };
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
      lines: { inner: innerChains.map((c) => c.points), outer: [...outerChains.map((c) => c.points), ...borderCaps.map((c) => c.points), ...freePieces.map((c) => c.points)] },
      widthsCm: widths,
    },
    warnings: committed.warnings,
  };
}

/** Does every side of the open piece lie within a centimetre of the trace or of one of the lines (its middle and its ends)? */
function alongBoundary(pts: readonly XY[], trace: readonly XY[], lines: readonly (readonly XY[])[]): boolean {
  const on = (q: XY): boolean => distToRing(q, trace) <= 1 || lines.some((l) => distToRing(q, l) <= 1);
  for (let i = 0; i + 1 < pts.length; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    if (!on(a) || !on(b) || !on({ x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 })) return false;
  }
  return true;
}

/** A chain of doubles as lattice points, consecutive repeats dropped (a closed chain without its closing repeat). */
function latChain(chain: readonly XY[], closed: boolean): LatticePoint[] {
  const lattice: LatticePoint[] = [];
  for (const q of chain) {
    const l = lat(q);
    const last = lattice[lattice.length - 1];
    if (last === undefined || last.x !== l.x || last.y !== l.y) lattice.push(l);
  }
  return closed ? openRing(lattice) : lattice;
}

/** A line's probe: halfway between its middle point and the trace there — inside the strip. */
function probeOf(pts: readonly XY[], trace: readonly XY[]): XY {
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
  return { x: (m.x + foot.x) * 0.5, y: (m.y + foot.y) * 0.5 };
}
