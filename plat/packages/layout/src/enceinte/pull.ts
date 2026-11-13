// Pull and pin, smooth (§4.4 S5a *Trace* (2), (3); M0-c-02; readings C-0226 (3), (4)).
//
// The pull: the boundary is pulled to defensible ground within the search band (walls.json `trace/searchBandM`, 40 m)
// by a cost-surface path around the town — each vertex may move along its outward normal by whole steps, an eighth of
// the band less the attraction distance, in either direction; the pinned vertices (the gates; C-0087's bank points)
// never move. The path through the candidates of least summed cost wins — its offset changing between neighbours by at
// most their distance apart, so it leaves the boundary at 45° at the most and approaches a pin by a ramp, never a
// spike — ties broken by the least summed change of offset and then the least summed offset, so on a cost surface that
// does not vary along the normals (a flat site) the pull is the identity but for the pins (C-0226 (3)). A candidate
// inside the water or a reservation is barred, and so is a step of the path whose SIDE lies over one (`wet.ts`; N-54
// (1): a vertex pulled across a river onto the far bank's land left its two sides over the water) — a side of a water
// gate's course excepted over the water; the identity path is never barred, so the pull has a path whenever its ring
// is lawful. The base's cost surface is the terrain's — lower ground costs more, §4.4's "penalty for leaving high
// ground".
//
// The smoothing: `smoothPasses` (walls.json `trace/smoothPasses`, 3) passes of the kernel's pinned-vertex Laplacian
// (λ ½), the pins never moving; a vertex a pass would carry out of the band, into the water or into a reservation keeps
// its place for that pass (§4.4 (3): "no vertex moved where its line … would take a shape" the laws do not admit;
// C-0226 (4)); the band less the attraction distance, as the pull's. A side the pass changed that is not proved to keep
// the band (`sideHolds`: a run of guarded vertices can still bow a side out of it), or that lies over a barred ring
// (N-54 (1)), has its moved ends put back for that pass (C-0232 (1)). The band is measured from the boundary as given.
// The result is rounded to the lattice and its rounded sides proved again (N-9, N-11): a side the rounding carried out of
// the band or over a barred ring has its moved ends put back where the passes found them.
// The angle at a pinned gate (Q173, Q187 (a); C-0505): the pulled trace crosses each arterial as the picked boundary did
// (§4.4 S5a *Trace* (2)), so neither the pull nor the smoothing may close the line into a spike at a gate. Each gate
// holds a FLOOR — the simplify's own (walls.json `trace/simplifyMinAngleCdeg`, 100°: "no interior angle < 100°", §4.4 (3),
// read as the kernel's simplify reads it, the unsigned angle between the two sides, 180° straight), or the handed
// boundary's own angle there where that is sharper (a gate the boundary already crosses at a spike keeps that crossing):
// the pull searches only the paths whose angle at every gate keeps its floor (`pinFloors`; the DP's state at a gate
// carries the offset of the vertex before it, so the floor binds the pair of sides at the pin, and the start's pair is
// solved with the vertex after it fixed where the free solve breaks the floor), and a smoothing pass (and the rounding)
// that would take a gate's angle under its floor puts the gate's moved neighbours back, as it does a side out of the band.
// Where no gate's angle goes under its floor the pull and the smoothing are as before, path for path.
// The pull's own crossings (C-0474; Q122, Q88): the candidates move each vertex along its own normal, so at a sharp bend
// (a gate's spike, a tight concave run) two sides of the pulled line can cross or touch where the boundary does not — our
// intermediate, never the boundary's. Where F-WALL's M0 rungs do not repair the smoothed line, the trace runs again on
// `untangle`'s line (the offsets at touching sides halved until none touch) smoothed by `smoothKeptSimple` (the passes'
// guard extended to a side that would touch the line), then on the boundary unpulled.
import { dmath, laplacianPinned, type LatticePoint } from '@plat/kernel';
import type { Terrain } from '@plat/model';
import { CDEG_PER_RAD, quot } from '../siting/geom.js';
import { bandLimit, dist, distToRing, inside, lat, sideHolds, sideTouchesLine, TOUCH_CM, touchPairs, unitOf } from './plane.js';
import type { CostField, XY } from './types.js';
import { WET_TOL_CM, wetSides, type WetSides } from './wet.js';

/** The pull's candidate offsets on each side: the band in this many steps (an eighth of 40 m: 5 m). */
export const PULL_STEPS = 8;

/** The base's cost surface: the terrain's height read at the nearest raster cell, in metres, negated (C-0226 (3)). */
export function terrainCost(terrain: Pick<Terrain, 'cellCm' | 'cols' | 'rows' | 'originX' | 'originY' | 'heightCm'>): CostField {
  return (p: XY): number => {
    let col = Math.floor(quot(p.x - terrain.originX, terrain.cellCm, 'length', 'terrain column'));
    let row = Math.floor(quot(p.y - terrain.originY, terrain.cellCm, 'length', 'terrain row'));
    if (col < 0) col = 0;
    if (row < 0) row = 0;
    if (col >= terrain.cols) col = terrain.cols - 1;
    if (row >= terrain.rows) row = terrain.rows - 1;
    return -terrain.heightCm[row * terrain.cols + col] * 0.01;
  };
}

/**
 * The cosine of the unsigned angle at b between a and c (1 on a spike of 0°, −1 on a straight line; 1 when a side is
 * shorter than a centimetre: no crossing at all) — the angle the kernel's simplify bounds (§3.4).
 */
export function cosAt(a: XY, b: XY, c: XY): number {
  const ux = a.x - b.x;
  const uy = a.y - b.y;
  const vx = c.x - b.x;
  const vy = c.y - b.y;
  const l = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
  if (l < 1) return 1;
  return quot(ux * vx + uy * vy, l, 'area', 'pin angle');
}

/** Tolerance of a floor's cosine: an angle equal to its floor (the handed boundary's own, unmoved) keeps it. */
const FLOOR_TOL = 1e-12;

/** Does the angle at b between a and c keep the floor whose cosine is `cosFloor`? */
export function keepsFloor(a: XY, b: XY, c: XY, cosFloor: number): boolean {
  return cosAt(a, b, c) <= cosFloor + FLOOR_TOL;
}

/**
 * Each gate's floor on a ring (C-0505; see the module comment), as a cosine: the larger of the simplify's floor
 * (`minAngleCdeg`) and the ring's own angle at the gate — NaN at a vertex that is no gate. `gates[i]` 1 marks a gate.
 */
export function pinFloors(ring: readonly XY[], gates: Uint8Array, minAngleCdeg: number): Float64Array {
  const n = ring.length;
  const cosMin = dmath.cos(quot(minAngleCdeg, CDEG_PER_RAD, 'angle', 'pin floor'));
  const out = new Float64Array(n).fill(Number.NaN);
  for (let i = 0; i < n; i += 1) {
    if (gates[i] !== 1 || n < 3) continue;
    const own = cosAt(ring[i === 0 ? n - 1 : i - 1], ring[i], ring[i + 1 === n ? 0 : i + 1]);
    out[i] = own > cosMin ? own : cosMin;
  }
  return out;
}

/** Each vertex's outward unit normal on a counter-clockwise ring (the right of the chord through its two neighbours). */
export function outwardNormals(ring: readonly XY[]): XY[] {
  const n = ring.length;
  const out: XY[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = ring[i === 0 ? n - 1 : i - 1];
    const b = ring[i + 1 === n ? 0 : i + 1];
    const t = unitOf({ x: b.x - a.x, y: b.y - a.y });
    out.push(t === null ? { x: 0, y: 0 } : { x: t.y, y: -t.x });
  }
  return out;
}

/** The pull's result. */
export interface Pulled {
  /** The pulled ring, one point per input vertex (doubles; the pins exact). */
  readonly line: XY[];
  /** Per vertex, the offset taken (cm, outward positive). */
  readonly offsetsCm: number[];
  readonly moved: number;
  readonly maxOffsetCm: number;
}

/** A DP label: the summed cost, then the summed change of offset (steps), then the summed |offset| (steps). */
interface Label {
  c: number;
  s: number;
  o: number;
}

function better(a: Label, b: Label): boolean {
  if (a.c !== b.c) return a.c < b.c;
  if (a.s !== b.s) return a.s < b.s;
  return a.o < b.o;
}

/**
 * Pull and pin (see the module comment) on a counter-clockwise ring: `pinned[i]` 1 keeps vertex i; `barred` rings bar a
 * candidate inside them and a step whose side lies over them — through `wet` when given (its water gates' courses
 * exempt over the water), else every barred ring a reservation; `floors` (`pinFloors`, C-0505) bars a path whose angle at
 * a gate goes under the gate's floor. Returns the pulled ring.
 */
export function pullAndPin(ring: readonly XY[], pinned: Uint8Array, cost: CostField, bandCm: number, barred: readonly (readonly XY[])[], wet: WetSides = wetSides(barred, 0), floors?: Float64Array): Pulled {
  const n = ring.length;
  const K = 2 * PULL_STEPS + 1;
  // The candidates reach the band less the attraction distance, so the line stays within the band after the lattice's
  // rounding and the insertion's attraction (§3.6) move a vertex (C-0226 (3)).
  const step = quot(Math.max(0, bandCm - TOUCH_CM), PULL_STEPS, 'count', 'pull step');
  const normals = outwardNormals(ring);
  // Node costs: the cost of standing at the candidate less the cost at the boundary vertex itself (+∞ barred).
  const node = new Float64Array(n * K);
  for (let i = 0; i < n; i += 1) {
    const p = ring[i];
    const base = cost(p);
    for (let j = 0; j < K; j += 1) {
      const s = (j - PULL_STEPS) * step;
      if (pinned[i] === 1 || (normals[i].x === 0 && normals[i].y === 0)) {
        node[i * K + j] = j === PULL_STEPS ? 0 : Infinity;
        continue;
      }
      if (s === 0) {
        node[i * K + j] = 0;
        continue;
      }
      const q = { x: p.x + s * normals[i].x, y: p.y + s * normals[i].y };
      const c = cost(q);
      node[i * K + j] = !Number.isFinite(c) || !Number.isFinite(base) || barred.some((r) => inside(r, q)) ? Infinity : c - base;
    }
  }
  // The path's slope: between a vertex and the one before it the offset changes by at most the side's length (the pulled
  // path leaves the boundary at 45° at the most, so a pinned vertex is approached by a ramp, never a spike).
  const reach = new Float64Array(n);
  for (let i = 0; i < n; i += 1) reach[i] = dist(ring[i === 0 ? n - 1 : i - 1], ring[i]) + 1e-6;
  // The steps' sides (N-54 (1)): the side from vertex i − 1 at candidate h to vertex i at candidate j, tested once
  // (0 untested, 1 clear, 2 over a barred ring); a vertex pair whose candidates' box meets no barred ring's side is
  // clear throughout (its candidates are outside every ring, so a side between them is).
  const cand = (i: number, j: number): XY => {
    const s = (j - PULL_STEPS) * step;
    return s === 0 ? ring[i] : { x: ring[i].x + s * normals[i].x, y: ring[i].y + s * normals[i].y };
  };
  const nearPair = new Uint8Array(n);
  for (let i = 0; i < n; i += 1) {
    const ip = i === 0 ? n - 1 : i - 1;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const v of [ip, i]) {
      for (const j of [0, K - 1, PULL_STEPS]) {
        const q = cand(v, j);
        if (q.x < x0) x0 = q.x;
        if (q.y < y0) y0 = q.y;
        if (q.x > x1) x1 = q.x;
        if (q.y > y1) y1 = q.y;
      }
    }
    nearPair[i] = wet.near(x0 - WET_TOL_CM, y0 - WET_TOL_CM, x1 + WET_TOL_CM, y1 + WET_TOL_CM) ? 1 : 0;
  }
  const sideMemo = new Uint8Array(n * K * K);
  const sideClear = (i: number, h: number, j: number): boolean => {
    if (nearPair[i] === 0) return true;
    const at = (i * K + h) * K + j;
    if (sideMemo[at] === 0) sideMemo[at] = wet.over(cand(i === 0 ? n - 1 : i - 1, h), cand(i, j)) ? 2 : 1;
    return sideMemo[at] === 1;
  };
  // The cycle is opened at a pinned vertex when there is one (its offset is 0); otherwise every start offset is tried.
  let start = -1;
  for (let i = 0; i < n && start < 0; i += 1) if (pinned[i] === 1) start = i;
  const starts = start >= 0 ? [PULL_STEPS] : Array.from({ length: K }, (_, j) => j);
  const at = start >= 0 ? start : 0;
  const vAt = (r: number): number => (at + r) % n;
  // The gates' floors (C-0505): at a gate after the start (`slot`) the DP's K states carry the candidate of the vertex
  // before it (the gate's own offset is 0), so the step after it is taken only where the pair of sides keeps the floor;
  // the start's own pair is solved, where the free solve breaks its floor, with the vertex after it fixed (`j1`).
  const fl = floors ?? null;
  const floored = (i: number): boolean => fl !== null && pinned[i] === 1 && !Number.isNaN(fl[i]);
  const slot = new Uint8Array(n);
  for (let r = 1; r < n; r += 1) if (floored(vAt(r))) slot[r] = 1;
  const own = (r: number, j: number): number => (slot[r] === 1 ? PULL_STEPS : j);
  const keeps = (r: number, before: XY, after: XY): boolean => fl === null || keepsFloor(before, ring[vAt(r)], after, fl[vAt(r)]);
  const lab = new Array<Label>(n * K);
  const prev = new Int32Array(n * K);
  const solve = (j0: number, j1: number): { label: Label; path: number[] } | null => {
    for (let j = 0; j < K; j += 1) lab[j] = j === j0 ? { c: node[at * K + j], s: 0, o: Math.abs(j - PULL_STEPS) } : { c: Infinity, s: 0, o: 0 };
    for (let r = 1; r < n; r += 1) {
      const i = vAt(r);
      const gateBefore = r >= 2 && slot[r - 1] === 1;
      for (let j = 0; j < K; j += 1) {
        let best: Label = { c: Infinity, s: 0, o: 0 };
        let arg = -1;
        const oj = own(r, j);
        const nc = node[i * K + oj];
        if (Number.isFinite(nc) && !(r === 1 && j1 >= 0 && oj !== j1)) {
          if (gateBefore) {
            // The vertex before is a floored gate (offset 0): the step's increments do not depend on its state, so its
            // best state whose pair of sides keeps the gate's floor is taken (the free solve's own, where it keeps it).
            if ((slot[r] === 0 || j === PULL_STEPS) && Math.abs(oj - PULL_STEPS) * step <= reach[i] && sideClear(i, PULL_STEPS, oj)) {
              let bs = -1;
              let bl: Label = { c: Infinity, s: 0, o: 0 };
              for (let h = 0; h < K; h += 1) {
                const pl = lab[(r - 1) * K + h];
                if (!Number.isFinite(pl.c) || !keeps(r - 1, cand(vAt(r - 2), h), cand(i, oj))) continue;
                if (bs < 0 || better(pl, bl)) {
                  bl = pl;
                  bs = h;
                }
              }
              if (bs >= 0) {
                best = { c: bl.c + nc, s: bl.s + Math.abs(oj - PULL_STEPS), o: bl.o + Math.abs(oj - PULL_STEPS) };
                arg = bs;
              }
            }
          } else {
            for (let h = 0; h < K; h += 1) {
              const pl = lab[(r - 1) * K + h];
              // At a floored gate, state j carries the candidate of the vertex before it: only that candidate leads there.
              if (!Number.isFinite(pl.c) || (slot[r] === 1 && h !== j) || Math.abs(oj - h) * step > reach[i] || !sideClear(i, h, oj)) continue;
              const c: Label = { c: pl.c + nc, s: pl.s + Math.abs(oj - h), o: pl.o + Math.abs(oj - PULL_STEPS) };
              if (arg < 0 || better(c, best)) {
                best = c;
                arg = h;
              }
            }
          }
        }
        lab[r * K + j] = best;
        prev[r * K + j] = arg;
      }
    }
    // Close the cycle back to the start's offset.
    let endJ = -1;
    let endLabel: Label = { c: Infinity, s: 0, o: 0 };
    for (let j = 0; j < K; j += 1) {
      const l = lab[(n - 1) * K + j];
      const oj = own(n - 1, j);
      if (!Number.isFinite(l.c) || Math.abs(oj - j0) * step > reach[at] || !sideClear(at, oj, j0)) continue;
      if (n >= 3 && slot[n - 1] === 1 && !keeps(n - 1, cand(vAt(n - 2), j), cand(at, j0))) continue;
      if (j1 >= 0 && !keeps(0, cand(vAt(n - 1), oj), cand(vAt(1), j1))) continue;
      const c: Label = { c: l.c, s: l.s + Math.abs(oj - j0), o: l.o };
      if (endJ < 0 || better(c, endLabel)) {
        endLabel = c;
        endJ = j;
      }
    }
    if (endJ < 0) return null;
    const path = new Array<number>(n);
    let j = endJ;
    for (let r = n - 1; r >= 1; r -= 1) {
      path[r] = own(r, j);
      j = prev[r * K + j];
    }
    path[0] = j0;
    return { label: endLabel, path };
  };
  let bestLabel: Label | null = null;
  let bestPath: number[] = [];
  for (const j0 of starts) {
    if (!Number.isFinite(node[at * K + j0])) continue;
    let got = solve(j0, -1);
    // The start is a floored gate and the free solve breaks its floor: solved again with the vertex after it fixed, each
    // candidate in turn (the identity keeps every floor, so one of them holds).
    if (got !== null && n >= 3 && floored(at) && !keeps(0, cand(vAt(n - 1), got.path[n - 1]), cand(vAt(1), got.path[1]))) {
      got = null;
      for (let j1 = 0; j1 < K; j1 += 1) {
        const g = solve(j0, j1);
        if (g !== null && (got === null || better(g.label, got.label))) got = g;
      }
    }
    if (got === null) continue;
    if (bestLabel === null || better(got.label, bestLabel)) {
      bestLabel = got.label;
      bestPath = got.path;
    }
  }
  const line: XY[] = ring.map((p) => ({ x: p.x, y: p.y }));
  const offsets = new Array<number>(n).fill(0);
  if (bestLabel === null) return { line, offsetsCm: offsets, moved: 0, maxOffsetCm: 0 };
  let moved = 0;
  let maxOff = 0;
  for (let r = 0; r < n; r += 1) {
    const i = (at + r) % n;
    const s = (bestPath[r] - PULL_STEPS) * step;
    offsets[i] = s;
    if (s !== 0) {
      moved += 1;
      line[i] = { x: ring[i].x + s * normals[i].x, y: ring[i].y + s * normals[i].y };
      if (Math.abs(s) > maxOff) maxOff = Math.abs(s);
    }
  }
  return { line, offsetsCm: offsets, moved, maxOffsetCm: maxOff };
}

/**
 * The pinned smoothing (see the module comment): `passes` passes over the ring; a vertex a pass would carry beyond
 * `bandCm` of the boundary `ring0`, or into a barred ring, keeps its place, and so do the moved ends of a side the pass
 * would carry out of the band (C-0232 (1)) or over a barred ring (through `wet` when given, else every barred ring a
 * reservation; N-54 (1)). Returns lattice points.
 */
export function smoothPinned(line: readonly XY[], pinned: Uint8Array, passes: number, ring0: readonly XY[], bandCm: number, barred: readonly (readonly XY[])[], wet: WetSides = wetSides(barred, 0), floors?: Float64Array): LatticePoint[] {
  return smoothing(line, pinned, passes, ring0, bandCm, barred, wet, false, floors);
}

/**
 * The pinned smoothing kept simple (Q122 / Q46; C-0474): `smoothPinned`, but a side a pass (or the lattice's rounding)
 * changed that touches another side of the line (`sidesTouch`, F-WALL's detection for one pair) has its moved ends put
 * back as a side out of the band is — so a simple line stays simple. The trace's fallback where the smoothing as built
 * leaves a self-touch no M0 rung repairs.
 */
export function smoothKeptSimple(line: readonly XY[], pinned: Uint8Array, passes: number, ring0: readonly XY[], bandCm: number, barred: readonly (readonly XY[])[], wet: WetSides = wetSides(barred, 0), floors?: Float64Array): LatticePoint[] {
  return smoothing(line, pinned, passes, ring0, bandCm, barred, wet, true, floors);
}

function smoothing(line: readonly XY[], pinned: Uint8Array, passes: number, ring0: readonly XY[], bandCm: number, barred: readonly (readonly XY[])[], wet: WetSides, simple: boolean, floors?: Float64Array): LatticePoint[] {
  const pins: number[] = [];
  for (let i = 0; i < pinned.length; i += 1) if (pinned[i] === 1) pins.push(i);
  const n = line.length;
  // The floored gates (C-0505): a pass, or the rounding, that would take a gate's angle under its floor puts the gate's
  // moved neighbours back, as it does a side's moved ends out of the band.
  const gates = floors === undefined || n < 3 ? [] : pins.filter((i) => !Number.isNaN(floors[i]));
  const floorBroken = (pts: readonly XY[], movedAt: (v: number) => boolean, back: (v: number) => void): boolean => {
    let reverted = false;
    for (const g of gates) {
      const a = g === 0 ? n - 1 : g - 1;
      const c = g + 1 === n ? 0 : g + 1;
      if (!movedAt(a) && !movedAt(c)) continue;
      if (keepsFloor(pts[a], pts[g], pts[c], (floors as Float64Array)[g])) continue;
      for (const v of [a, c]) {
        if (movedAt(v)) {
          back(v);
          reverted = true;
        }
      }
    }
    return reverted;
  };
  const limit = bandLimit(bandCm);
  let cur: XY[] = line.map((p) => ({ x: p.x, y: p.y }));
  for (let r = 0; r < passes; r += 1) {
    const next = laplacianPinned(cur, { closed: true, pinned: pins, iterations: 1, lambda: 0.5 });
    const moved = new Uint8Array(n);
    for (let i = 0; i < next.length; i += 1) {
      if (pinned[i] === 1) continue;
      const q = next[i];
      if (dist(q, cur[i]) === 0) continue;
      if (distToRing(q, ring0) > bandCm - TOUCH_CM || barred.some((b) => inside(b, q))) next[i] = cur[i];
      else moved[i] = 1;
    }
    // The sides too (C-0232 (1)): a side between two vertices that each keep the band can still leave it (a smoothed
    // concave run bowing outward), and a side between two dry vertices can still lie over the water (N-54 (1)); its
    // moved ends go back to where the pass found them, until every side the pass changed keeps the band and lies over
    // no barred ring. A side neither of whose ends moved is the pass's input's, and is left to it.
    for (let guard = 0; guard <= n; guard += 1) {
      let reverted = false;
      for (let i = 0; i < n; i += 1) {
        const j = i + 1 === n ? 0 : i + 1;
        if (moved[i] === 0 && moved[j] === 0) continue;
        if (sideHolds(next[i], next[j], ring0, limit) && !wet.over(next[i], next[j]) && !(simple && sideTouchesLine(next, i))) continue;
        for (const v of [i, j]) {
          if (moved[v] === 1) {
            next[v] = cur[v];
            moved[v] = 0;
            reverted = true;
          }
        }
      }
      if (floorBroken(next, (v) => moved[v] === 1, (v) => {
        next[v] = cur[v];
        moved[v] = 0;
      })) reverted = true;
      if (!reverted) break;
    }
    cur = next;
  }
  // The rounded points proved (N-9, N-11): the passes prove their sides on doubles, and the lattice's rounding can carry a
  // side up to √½ cm further (past the band's limit, or deeper than the water's tolerance). A side of the rounded result
  // that is not proved has its moved ends put back where the passes found them (rounded), until every side whose ends
  // moved is proved; a side neither of whose ends moved is the input's, and is left to it.
  const out = cur.map((p, i) => (pinned[i] === 1 ? { x: line[i].x, y: line[i].y } as LatticePoint : lat(p)));
  const home = line.map((p, i) => (pinned[i] === 1 ? { x: p.x, y: p.y } as LatticePoint : lat(p)));
  const away = (v: number): boolean => out[v].x !== home[v].x || out[v].y !== home[v].y;
  for (let guard = 0; guard <= n; guard += 1) {
    let reverted = false;
    for (let i = 0; i < n; i += 1) {
      const j = i + 1 === n ? 0 : i + 1;
      if (!away(i) && !away(j)) continue;
      if (sideHolds(out[i], out[j], ring0, limit) && !wet.over(out[i], out[j]) && !(simple && sideTouchesLine(out, i))) continue;
      for (const v of [i, j]) {
        if (away(v)) {
          out[v] = home[v];
          reverted = true;
        }
      }
    }
    if (floorBroken(out, away, (v) => {
      out[v] = home[v];
    })) reverted = true;
    if (!reverted) break;
  }
  return out;
}

/** Below this an untangled offset is taken as none (cm): the side it moves is within a hair of the boundary's. */
const UNTANGLE_FLOOR_CM = 50;

/**
 * The pull's own crossings undone (Q122 / Q46; C-0474): where two sides of the pulled line touch (`sidesTouch`) the
 * moved vertices at their ends have their offsets halved — under `UNTANGLE_FLOOR_CM` set to none — and a side so changed
 * that lies over a barred ring has its moved ends put back on the boundary, until no pair touches but the ring's own
 * (every end unmoved). The identity is the ring, so on a simple ring the result is simple. Returns the line and the
 * offsets kept (the pins and the unmoved vertices exact).
 */
export function untangle(ring: readonly XY[], pulled: Pick<Pulled, 'line' | 'offsetsCm'>, wet: WetSides): Pulled {
  const n = ring.length;
  const normals = outwardNormals(ring);
  const s = [...pulled.offsetsCm];
  const cur: XY[] = pulled.line.map((p) => ({ x: p.x, y: p.y }));
  const place = (i: number): void => {
    cur[i] = s[i] === 0 ? { x: ring[i].x, y: ring[i].y } : { x: ring[i].x + s[i] * normals[i].x, y: ring[i].y + s[i] * normals[i].y };
  };
  for (let round = 0; round < 64; round += 1) {
    const marked = new Set<number>();
    for (const [i, j] of touchPairs(cur)) {
      for (const v of [i, i + 1 === n ? 0 : i + 1, j, j + 1 === n ? 0 : j + 1]) if (s[v] !== 0) marked.add(v);
    }
    if (marked.size === 0) break;
    for (const v of marked) {
      const h = s[v] * 0.5;
      s[v] = Math.abs(h) < UNTANGLE_FLOOR_CM ? 0 : h;
      place(v);
    }
    // A side the halving changed that lies over a barred ring: its moved ends back on the boundary.
    for (const v of marked) {
      for (const i of [v === 0 ? n - 1 : v - 1, v]) {
        const j = i + 1 === n ? 0 : i + 1;
        if (!wet.over(cur[i], cur[j])) continue;
        for (const w of [i, j]) {
          if (s[w] !== 0) {
            s[w] = 0;
            place(w);
          }
        }
      }
    }
  }
  let moved = 0;
  let maxOff = 0;
  for (let i = 0; i < n; i += 1) {
    if (s[i] === 0) continue;
    moved += 1;
    if (Math.abs(s[i]) > maxOff) maxOff = Math.abs(s[i]);
  }
  return { line: cur, offsetsCm: s, moved, maxOffsetCm: maxOff };
}
