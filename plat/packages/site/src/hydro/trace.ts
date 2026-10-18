// Rivers by descent (M0-e-02; §4.2 S1 (3): "the course is traced by steepest descent with a lateral meander term — a
// Chaikin-smoothed control polyline whose knots sit mostly on alternating sides, our own construction — and the terrain
// is carved to the course"; *Bounds* (GEO-36): "knot offsets are clamped to half the control spacing … a
// self-touching course is re-traced with the offsets halved; carving is capped at carveMaxCm and a course that would
// need more is re-routed by F-RIVER"; §5.2 F-RIVER's first two rungs: "carve the sink deeper up to carveMaxCm →
// re-trace from the last good knot").
//
// One inlet's trace (C-0173 (3) – (5), refined by C-0175):
//   1. The descent line: steepest descent on the river's own surface (./surface.ts) — the carve-bounded flood seeded
//      at the open border (every border cell but the inlet's own edge, and a tributary's river), its walls the
//      inlet's edge and the cells a re-trace closed — from the start cell (the inlet, or a re-trace's root),
//      each step to the steepest strictly lower admitted 8-neighbour, else (a flat) to the cell that admitted it. The
//      first step from the inlet, which the flood never admits (its edge is a wall), goes to its admitted neighbour
//      steepest below it, else the lowest. Where the line crosses a filled depression of that surface the descent
//      has stalled in a sink: F-RIVER's first rung carves it deeper — the line keeps to the surface's level across it
//      to its spill — recorded with the depression's depth along the line (the carve plan measures the cut). The line
//      ends at an outlet (the frame edge, outfall `frame`) or, for a tributary, beside the river it joins.
//   2. The knots: along the line, a knot wherever the line has gone `controlSpacing` from the previous knot's point
//      (folds of the drainage smaller than the spacing are spanned), offset across that chord by a drawn share of half
//      the spacing, mostly on the side opposite the previous knot's, clamped to half the spacing (GEO-36); the inlet
//      and the outlet are knots with no offset.
//   3. The course: Chaikin's corner cutting (three rounds) of the control polyline, rounded to whole centimetres.
//   4. The checks: the course must not touch itself (./course.ts firstSelfTouch at the class's clearance) and its
//      monotone bed must cut no raster cell deeper than carveMaxCm (./carve.ts planCarve). On a failure the trace is
//      re-traced (F-RIVER's second rung, at most RETRACE_MAX times): a self-touching course whole, from the inlet,
//      every offset halved (GEO-36); a carve past the cap or a stuck line from the last good knot — the knot before
//      the last knot ahead of the failure — the later offsets halved. When the course through the knots' bases (no
//      offsets) fails the same check, the fault is the line's own and halving cannot cure it: the re-trace also
//      closes the line's failing cells (the cell of the first cut past the cap; the later touching stretch; the stuck
//      cell), so the re-run descent takes another way. The draws of a knot ordinal are made once and reused at every
//      re-trace, so a re-trace reads no new stream (a tier-2 repair, §5.1). The third rung — moving the inlet
//      (attempt) — is the strategy's (./strategy.ts).
import { ratio, type Stream } from '@plat/kernel';
import type { HydroGrid, Terrain } from '@plat/model';
import { cellCentre } from '../terrain/grid.js';
import { planCarve, rasterGeom, type CarvePlan } from './carve.js';
import { cellIndexAt, chaikin, firstSelfTouch, pointSegDist2, rasterise, rounded, type GridGeom, type XY } from './course.js';
import { slopeKey } from './d8.js';
import { cellCount, D8_DX, D8_DY, invCols, invOfCols, onBorder, outwardCode, rowOf, type HydroField } from './field.js';
import { CHAIKIN_ROUNDS, KNOT_DEVIATION_CELLS, MEANDER_MIN_SHARE, MEANDER_SAME_SIDE, RETRACE_MAX } from './params.js';
import { NO_PARENT, riverSurface, surfaceCapCm, type RiverSurface } from './surface.js';

/** A river's entry: the border cell it enters by and the point on the arena's edge where it arrives. */
export interface Inlet {
  cell: number;
  at: XY;
}

/** What a trace reads besides the field, the inlet and the stream. */
export interface TraceOptions {
  /** The terrain whose raster the carve plan is measured on. */
  terrain: Terrain;
  carveMaxCm: number;
  /** river.controlSpacingM, cm. */
  spacingCm: number;
  /** The self-touch clearance: the class band's narrowest channel (C-0173 (5)). */
  clearanceCm: number;
  /** The arena's half-extent about the frame's centre (frame + margin). */
  reach: { x: number; y: number };
  /** Cells beside which a tributary's descent ends (the river it joins: its corridor). */
  stop?: Uint8Array;
}

/** A control knot (§2.3 `WaterBody.controls`): its ordinal in course order, its position, its descent-line point and offset. */
export interface Knot {
  ordinal: number;
  at: XY;
  base: XY;
  offsetCm: number;
}

/** One rung used inside a trace (reported by the strategy). */
export interface TraceEvent {
  rung: 'carve' | 'retrace';
  /** carve: the filled depression's depth at the stall (0 on level ground); retrace: the knot re-traced from. */
  value: number;
  /** retrace: why (`touch`, `carve` or `stuck`). */
  cause?: 'touch' | 'carve' | 'stuck';
  /** retrace: the fault was the line's own (the course through the knots' bases failed too) and these cells were closed. */
  closed?: number[];
}

/** A trace's outcome. */
export interface RiverTrace {
  /** The course fits: no self-touch, no cut past the cap, an outlet reached. */
  ok: boolean;
  /** Why the last try failed (null when ok). */
  failure: null | 'touch' | 'carve' | 'stuck';
  /**
   * Where the failure begins (−1 when ok): the first vertex of the earlier of two touching segments, the first vertex
   * past a cut deeper than the cap, or the stuck end — the re-trace roots before it.
   */
  failAt: number;
  /** Where a degraded course is cut (−1 when ok): the later touching segment's first vertex, else `failAt`. */
  cutAt: number;
  /** The course (whole centimetres), inlet first. */
  course: XY[];
  knots: Knot[];
  /** The carve plan of the course on the raster. */
  plan: CarvePlan;
  /** How the descent ended: at the frame edge, beside a joined river (its cell), or stuck. */
  end: { kind: 'frame' | 'join' | 'stuck'; cell: number };
  /** The offsets' scale of the last try (1, ½, ¼, …). */
  scale: number;
  events: TraceEvent[];
}

/** The meander draws of one trace: knot ordinal k ≥ 1 takes two uniforms, in ordinal order, once. */
export class MeanderDraws {
  private readonly sides: number[] = [0];
  private readonly shares: number[] = [0];
  constructor(private readonly stream: Stream) {}
  /** Knot k's side (+1 left of the line, −1 right) and its share of half the spacing, in [MEANDER_MIN_SHARE, 1]. */
  get(k: number): { side: number; share: number } {
    while (this.sides.length <= k) {
      const u1 = this.stream.float01();
      const u2 = this.stream.float01();
      const prev = this.sides[this.sides.length - 1];
      const side = prev === 0 ? (u1 < 0.5 ? 1 : -1) : u1 < MEANDER_SAME_SIDE ? prev : -prev;
      this.sides.push(side);
      this.shares.push(MEANDER_MIN_SHARE + (1 - MEANDER_MIN_SHARE) * u2);
    }
    return { side: this.sides[k], share: this.shares[k] };
  }
}

/** The point of a border cell's centre projected onto the arena's edge on its outward side(s). */
export function edgePoint(g: GridGeom, cell: number, reach: { x: number; y: number }, code: number): XY {
  let { x, y } = cellCentre(g, cell, invOfCols(g.cols));
  const dx = code < 0 ? 0 : D8_DX[code];
  const dy = code < 0 ? 0 : D8_DY[code];
  if (dx > 0) x = reach.x;
  if (dx < 0) x = -reach.x;
  if (dy > 0) y = reach.y;
  if (dy < 0) y = -reach.y;
  if (x > reach.x) x = reach.x;
  if (x < -reach.x) x = -reach.x;
  if (y > reach.y) y = reach.y;
  if (y < -reach.y) y = -reach.y;
  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * The descent line from `start` on the river's surface (the header's step 1): from each cell the steepest strictly
 * lower admitted 8-neighbour (the fixed tie order), else the cell that admitted it (a flat drains to its spill), until
 * an outlet of the surface (the frame edge) or, for a tributary, a cell beside the river it joins. A start the flood did
 * not admit (the inlet, on its walled edge) steps to its admitted neighbour steepest below its height, else the lowest
 * on the surface. Where the line runs through a filled depression of the surface the descent has stalled in a sink:
 * F-RIVER's first rung carves it deeper — the line keeps to the surface's level across it to its spill — and the rung
 * is recorded with the depression's depth along the line (the carve plan measures the cut). A start with no admitted
 * neighbour is stuck.
 */
export function descentLine(
  field: HydroField,
  surface: RiverSurface,
  start: number,
  stop: Uint8Array | undefined,
  events: TraceEvent[],
): { cells: number[]; end: { kind: 'frame' | 'join' | 'stuck'; cell: number } } {
  const g = field.grid;
  const cols = g.cols;
  const rows = g.rows;
  const n = cellCount(g);
  const inv = invCols(g);
  const h = field.heightCm;
  const lv = surface.levelCm;
  const adm = surface.admitted;
  const visited = new Uint8Array(n);
  const cells: number[] = [start];
  visited[start] = 1;
  const joinBeside = (ci: number, cj: number): number => {
    if (stop === undefined) return -1;
    for (let k = 0; k < 8; k += 1) {
      const x = ci + D8_DX[k];
      const y = cj + D8_DY[k];
      if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
      const m = y * cols + x;
      if (stop[m] === 1) return m;
    }
    return -1;
  };
  /** The next cell of the line from c at (ci, cj), or −1 (the rule of the doc comment). */
  const step = (c: number, ci: number, cj: number): number => {
    const own = adm[c] === 1 ? lv[c] : h[c];
    let best = -1;
    let bestKey = 0;
    let lowest = -1;
    for (let k = 0; k < 8; k += 1) {
      const x = ci + D8_DX[k];
      const y = cj + D8_DY[k];
      if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
      const m = y * cols + x;
      if (adm[m] === 0 || visited[m] === 1) continue;
      if (lowest < 0 || lv[m] < lv[lowest]) lowest = m;
      const drop = own - lv[m];
      if (drop <= 0) continue;
      const key = slopeKey(drop, k);
      if (key > bestKey) {
        bestKey = key;
        best = m;
      }
    }
    if (best >= 0) return best;
    if (adm[c] === 1) {
      const p = surface.parent[c];
      return p !== NO_PARENT && visited[p] === 0 ? p : -1;
    }
    return lowest;
  };
  // A depression the line is crossing: its level and the lowest sampled height met inside it.
  let sinkLevel = -1;
  let sinkLow = 0;
  const closeSink = (): void => {
    if (sinkLevel >= 0) events.push({ rung: 'carve', value: sinkLevel - sinkLow });
    sinkLevel = -1;
  };
  let c = start;
  for (let guard = 0; guard < n; guard += 1) {
    const ci = c % cols;
    const cj = rowOf(c, ci, inv);
    if (adm[c] === 1 && lv[c] > h[c]) {
      if (sinkLevel !== lv[c]) {
        closeSink();
        sinkLevel = lv[c];
        sinkLow = h[c];
      } else if (h[c] < sinkLow) sinkLow = h[c];
    } else closeSink();
    if (cells.length > 1) {
      const join = joinBeside(ci, cj);
      if (join >= 0) {
        closeSink();
        return { cells, end: { kind: 'join', cell: join } };
      }
      if (surface.outlet[c] === 1) {
        closeSink();
        return { cells, end: { kind: 'frame', cell: c } };
      }
    }
    const m = step(c, ci, cj);
    if (m < 0) {
      closeSink();
      return { cells, end: { kind: 'stuck', cell: c } };
    }
    visited[m] = 1;
    cells.push(m);
    c = m;
  }
  closeSink();
  return { cells, end: { kind: 'stuck', cell: c } };
}

/**
 * The masks of a river entering by border cell `inlet`: its upstream edge (every border cell on the inlet's side — a
 * river runs into the arena and never leaves by that edge) and the outlets of its surface (every other border cell, and
 * the cells of the river a tributary joins).
 */
export function inletMasks(g: HydroGrid, inlet: number, stop: Uint8Array | undefined): { edge: Uint8Array; outlet: Uint8Array } {
  const n = g.cols * g.rows;
  const ii = inlet % g.cols;
  const ij = rowOf(inlet, ii, invOfCols(g.cols));
  const edge = new Uint8Array(n);
  const outlet = new Uint8Array(n);
  for (let j = 0; j < g.rows; j += 1) {
    for (let i = 0; i < g.cols; i += 1) {
      if (!onBorder(g, i, j)) continue;
      const sameEdge = (ii === 0 && i === 0) || (ii === g.cols - 1 && i === g.cols - 1) || (ij === 0 && j === 0) || (ij === g.rows - 1 && j === g.rows - 1);
      if (sameEdge) edge[j * g.cols + i] = 1;
      else outlet[j * g.cols + i] = 1;
    }
  }
  if (stop !== undefined) for (let c = 0; c < n; c += 1) if (stop[c] === 1) outlet[c] = 1;
  return { edge, outlet };
}

/** The centre of a hydrology cell (../terrain/grid.ts `cellCentre`). */
function centreOf(g: GridGeom, c: number): XY {
  return cellCentre(g, c, invOfCols(g.cols));
}

/**
 * The knots along a descent line (step 2): walking the line from `startAt` through its cells' centres, the next knot's
 * base is the first centre at least `spacing` from the previous knot's base — so the control polyline spans the line
 * at the control spacing and folds of the drainage smaller than it are spanned, not followed — while the end lies
 * more than half a spacing on; each knot offset across the chord from the previous base; ordinals from `firstOrdinal`.
 */
function knotsAlong(
  g: GridGeom,
  startAt: XY,
  cells: readonly number[],
  endAt: XY,
  firstOrdinal: number,
  draws: MeanderDraws,
  scale: number,
  opts: TraceOptions,
): Knot[] {
  // The spacing of this try: the control spacing at scale 1, halved with the offsets at every re-trace (C-0175 (4)).
  const sp = opts.spacingCm * scale;
  const half = sp * 0.5;
  const sp2 = sp * sp;
  const half2 = half * half;
  const tol = KNOT_DEVIATION_CELLS * g.cellCm;
  const tol2 = tol * tol;
  // The bound (GEO-36): an offset never exceeds half the spacing, rounding included.
  const bound = half - 1;
  const out: Knot[] = [];
  let ordinal = firstOrdinal;
  let prev: XY = startAt;
  let from = 0;
  /** Whether the chord from `prev` to the centre of line cell q leaves a line cell between them by more than tol. */
  const bends = (q: number): boolean => {
    const b = centreOf(g, cells[q]);
    for (let r = from + 1; r < q; r += 1) if (pointSegDist2(centreOf(g, cells[r]), prev, b) > tol2) return true;
    return false;
  };
  for (let q = 1; q < cells.length; q += 1) {
    let pick = q;
    if (q - 1 > from && bends(q)) pick = q - 1;
    else {
      const b = centreOf(g, cells[q]);
      const ddx = b.x - prev.x;
      const ddy = b.y - prev.y;
      if (ddx * ddx + ddy * ddy < sp2) continue;
    }
    q = pick;
    from = pick;
    const base = centreOf(g, cells[pick]);
    const dx = base.x - prev.x;
    const dy = base.y - prev.y;
    const d2 = dx * dx + dy * dy;
    const ex = endAt.x - base.x;
    const ey = endAt.y - base.y;
    if (ex * ex + ey * ey <= half2) break;
    const len = Math.sqrt(d2);
    const { side, share } = draws.get(ordinal);
    // Half the chord where the chord is shorter than the spacing (a knot at a bend), half the spacing otherwise.
    let mag = share * (len < sp ? len * 0.5 : half);
    if (mag > bound) mag = bound;
    let at: XY = { x: base.x, y: base.y };
    const ux = ratio(dx, len, 'length');
    const uy = ratio(dy, len, 'length');
    if (ux.ok && uy.ok) at = { x: base.x - uy.value * side * mag, y: base.y + ux.value * side * mag };
    // Inside the arena, a centimetre clear of its edge.
    const rx = opts.reach.x - 1;
    const ry = opts.reach.y - 1;
    at = { x: Math.round(Math.min(rx, Math.max(-rx, at.x))), y: Math.round(Math.min(ry, Math.max(-ry, at.y))) };
    const ox = at.x - base.x;
    const oy = at.y - base.y;
    out.push({ ordinal, at, base, offsetCm: Math.sqrt(ox * ox + oy * oy) });
    ordinal += 1;
    prev = base;
  }
  return out;
}

/** The index of the course vertex nearest each knot, searched forward along the course. */
export function knotVertices(course: readonly XY[], knots: readonly Knot[]): number[] {
  const out: number[] = [];
  let from = 0;
  for (const k of knots) {
    let best = from;
    let bestD = Infinity;
    for (let v = from; v < course.length; v += 1) {
      const dx = course[v].x - k.at.x;
      const dy = course[v].y - k.at.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = v;
      }
    }
    out.push(best);
    from = best;
  }
  return out;
}

/**
 * One inlet's trace (the header's steps 1 – 4), with F-RIVER's first two rungs: the sink carve inside the descent and
 * up to RETRACE_MAX re-traces from the last good knot with the offsets halved. `stream` is the attempt's `water.river`
 * stream; its draws are the knots' (two uniforms per knot ordinal, in order).
 */
export function traceRiver(grid: HydroField, inlet: Inlet, stream: Stream | MeanderDraws, opts: TraceOptions): RiverTrace {
  const g = grid.grid;
  const draws = stream instanceof MeanderDraws ? stream : new MeanderDraws(stream);
  const events: TraceEvent[] = [];
  const n = cellCount(g);
  let kept: Knot[] = [{ ordinal: 0, at: { x: inlet.at.x, y: inlet.at.y }, base: { x: inlet.at.x, y: inlet.at.y }, offsetCm: 0 }];
  let startCell = inlet.cell;
  // The surface's walls: the inlet's own edge (the inlet itself included — the descent starts there, the flood never
  // admits it) and the cells re-traces closed. Its outlets: the open border and the joined river (it ends beside it, a
  // confluence, never inside).
  const masks = inletMasks(g, inlet.cell, opts.stop);
  const closed = new Uint8Array(n);
  let scale = 1;
  let last: RiverTrace | null = null;
  for (let retrace = 0; retrace <= RETRACE_MAX; retrace += 1) {
    const walls = Uint8Array.from(masks.edge);
    for (let c = 0; c < n; c += 1) if (closed[c] === 1) walls[c] = 1;
    if (startCell !== inlet.cell) walls[startCell] = 0;
    const surface = riverSurface(grid, masks.outlet, walls, surfaceCapCm(opts.carveMaxCm));
    const line = descentLine(grid, surface, startCell, opts.stop, events);
    const lastCell = line.cells[line.cells.length - 1];
    let endAt: XY;
    if (line.end.kind === 'frame') {
      const lc = lastCell % g.cols;
      endAt = edgePoint(g, lastCell, opts.reach, outwardCode(g, lc, rowOf(lastCell, lc, invOfCols(g.cols))));
    } else if (line.end.kind === 'join') {
      const p = centreOf(g, line.end.cell);
      endAt = { x: Math.round(p.x), y: Math.round(p.y) };
    } else {
      const p = centreOf(g, lastCell);
      endAt = { x: Math.round(p.x), y: Math.round(p.y) };
    }
    const startAt = kept[kept.length - 1].at;
    const fresh = knotsAlong(g, startAt, line.cells, endAt, kept.length, draws, scale, opts);
    const knots = [...kept, ...fresh];
    knots.push({ ordinal: knots.length, at: endAt, base: endAt, offsetCm: 0 });
    const course = rounded(chaikin(knots.map((k) => k.at), CHAIKIN_ROUNDS));
    const touch = course.length >= 4 ? firstSelfTouch(course, opts.clearanceCm) : null;
    const plan = planCarve(opts.terrain, course, opts.carveMaxCm);
    let failAt = -1;
    let cutAt = -1;
    let failure: RiverTrace['failure'] = null;
    if (touch !== null) {
      failAt = touch.i;
      cutAt = touch.j;
      failure = 'touch';
    }
    if (plan.firstExceed >= 0 && (cutAt < 0 || plan.firstExceed < cutAt)) {
      failAt = plan.firstExceed;
      cutAt = plan.firstExceed;
      failure = 'carve';
    }
    if (failure === null && line.end.kind === 'stuck') {
      failAt = course.length - 1;
      cutAt = course.length;
      failure = 'stuck';
    }
    last = { ok: failure === null, failure, failAt, cutAt, course, knots, plan, end: line.end, scale, events };
    if (failure === null || retrace === RETRACE_MAX) break;
    // F-RIVER's second rung: re-trace from the last good knot, the later offsets halved — for a self-touching course
    // the whole course, from the inlet, every offset halved (GEO-36: both stretches that touch are the course's own).
    const at = knotVertices(course, knots);
    let lastBefore = 0;
    for (let k = 0; k < knots.length; k += 1) if (at[k] < failAt) lastBefore = k;
    const good = failure === 'touch' ? 0 : Math.max(0, lastBefore - 1);
    // The line's own fault: the course through the knots' bases fails the same check — its failing cells are closed.
    const shut = lineFault(grid, opts, kept, line.cells, endAt, line.end, failure);
    for (const c of shut) closed[c] = 1;
    kept = knots.slice(0, good + 1);
    scale *= 0.5;
    events.push({ rung: 'retrace', value: good, cause: failure, ...(shut.length > 0 ? { closed: shut } : {}) });
    // The descent restarts at the cell of the good knot's base — on the line, which its surface admitted; it runs on
    // downhill of the kept course, which the new course's own checks (touch, carve) judge with it.
    const gk = kept[kept.length - 1].base;
    const kc = cellIndexAt(g, gk.x, gk.y);
    startCell = kept.length === 1 ? inlet.cell : kc;
  }
  if (last === null) throw new Error('traceRiver: no try ran');
  return last;
}

/**
 * The cells a re-trace closes when the fault is the line's own (the header's step 4). Halving the offsets and the
 * spacing brings the course onto the descent line, so the fault is the line's own when the course through the line
 * itself — the kept course, then the line's cell centres to its end — fails the same check: then the hydrology cell of
 * its first cut past the cap (carve), the cells under its later touching segment (touch), or the stuck cell (stuck) are
 * closed, none of them the start. Empty when the knots alone were at fault.
 */
function lineFault(grid: HydroField, opts: TraceOptions, kept: readonly Knot[], cells: readonly number[], endAt: XY, end: RiverTrace['end'], failure: 'touch' | 'carve' | 'stuck'): number[] {
  const g = grid.grid;
  const start = cells[0];
  const keep = (cs: readonly number[]): number[] => [...new Set(cs)].filter((c) => c !== start);
  if (failure === 'stuck') return keep([end.cell]);
  const pts: XY[] = kept.map((k) => k.at);
  for (let q = 1; q < cells.length; q += 1) pts.push(centreOf(g, cells[q]));
  pts.push(endAt);
  const line = rounded(chaikin(pts, CHAIKIN_ROUNDS));
  if (failure === 'touch') {
    const t = line.length >= 4 ? firstSelfTouch(line, opts.clearanceCm) : null;
    return t === null ? [] : keep(rasterise(g, [line[t.j], line[t.j + 1]], false).cells);
  }
  const plan = planCarve(opts.terrain, line, opts.carveMaxCm);
  if (plan.firstExceed < 0) return [];
  const r = rasterGeom(opts.terrain);
  let k = 0;
  while (k < plan.cells.length && opts.terrain.heightCm[plan.cells[k]] - plan.bedCm[k] <= opts.carveMaxCm) k += 1;
  if (k >= plan.cells.length) return [];
  const rc = cellCentre(r, plan.cells[k], invOfCols(r.cols));
  return keep([cellIndexAt(g, rc.x, rc.y)]);
}
