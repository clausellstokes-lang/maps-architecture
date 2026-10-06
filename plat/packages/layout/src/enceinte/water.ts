// The basic water gate (C-0087; §4.2 S3 (7) "where the river crosses the boundary, water gates are added (not counted
// in N)", §4.4 *Water and the waterfront*, §2.2 rule 7, §2.7 `Gate.banks`; M0-c-02).
//
// Where the boundary crosses a water face, the trace crosses the water there, along the boundary's crossing: the two
// points where the boundary leaves the land and reaches it again become the trace's bank vertices — L1 Steiner vertices
// on the L0 shores, or L0 shore vertices where the insertion attracts them (§3.6) — carrying ('gate_end', gate, 0 | 1),
// and between them the trace is one straight edge across the water (the wall's edge between the banks lies across the
// water, §2.2 rule 7) wherever that chord keeps inside the water; where it would not, or where a main gate stands in the
// water between them (C-0204 (2)'s bridgehead gate), the boundary's own course between the banks is kept (C-0224 (7)).
// The bank points are pinned through the pull, the smoothing and the simplify, so the pull keeps each crossing where
// the boundary crosses (C-0087). Each crossing writes a `Gate` of kind `water` with `way` null and `banks` set, not
// counted in N and carrying no route.
import type { Kernel, LatticePoint, PlatKey, Polygon } from '@plat/kernel';
import type { Id, Lifecycle, WaterSet } from '@plat/model';
import { ccw, crossParams, d2, dist, inside, lat, openRing } from './plane.js';
import type { WaterGate, XY } from './types.js';

/** A water face's outer ring with its body. */
export interface WaterRing {
  readonly body: Id;
  readonly ring: readonly LatticePoint[];
}

/** One crossing of the boundary over water, in boundary order. */
export interface WaterCrossing {
  readonly body: Id;
  /** Where the boundary leaves the land (bank 0) and reaches it again (bank 1). */
  readonly entry: LatticePoint;
  readonly exit: LatticePoint;
  /** True when the trace crosses as one straight edge between the banks. */
  readonly chord: boolean;
}

/**
 * A stretch over water whose two ends lie on one water ring with the shorter way along the shore between them at most
 * this many times the chord is a graze, not a crossing (C-0224 (7)): a river crossed bank to bank has its ends a whole
 * shore round apart.
 */
export const GRAZE_RATIO = 2;

/**
 * The shorter way along a ring between two points on its sides (side ja at parameter ua, side jb at ub): its length and
 * the ring's vertices strictly between, in walking order.
 */
export function shoreArc(ring: readonly LatticePoint[], ja: number, ua: number, jb: number, ub: number): { lengthCm: number; vertices: LatticePoint[] } {
  const n = ring.length;
  const at = (j: number, u: number): XY => {
    const a = ring[j];
    const b = ring[j + 1 === n ? 0 : j + 1];
    return { x: a.x + u * (b.x - a.x), y: a.y + u * (b.y - a.y) };
  };
  const pa = at(ja, ua);
  const pb = at(jb, ub);
  // Forward (in ring order) from a to b.
  const fwd: LatticePoint[] = [];
  let lf = 0;
  if (ja === jb && ub >= ua) lf = dist(pa, pb);
  else {
    let prev: XY = pa;
    let j = ja;
    do {
      j = j + 1 === n ? 0 : j + 1;
      fwd.push(ring[j]);
      lf += dist(prev, ring[j]);
      prev = ring[j];
    } while (j !== jb);
    lf += dist(prev, pb);
  }
  // Backward from a to b.
  const bwd: LatticePoint[] = [];
  let lb = 0;
  if (ja === jb && ub <= ua) lb = dist(pa, pb);
  else {
    let prev: XY = pa;
    let j = ja;
    for (;;) {
      bwd.push(ring[j]);
      lb += dist(prev, ring[j]);
      prev = ring[j];
      if (j === (jb + 1 === n ? 0 : jb + 1)) break;
      j = j === 0 ? n - 1 : j - 1;
    }
    lb += dist(prev, pb);
  }
  return lf <= lb ? { lengthCm: lf, vertices: fwd } : { lengthCm: lb, vertices: bwd };
}

/** The ground arena's key. */
export const GROUND: PlatKey = Object.freeze({ layer: 'ground', part: 0 }) as PlatKey;

/** The generated lifecycle (§2.8) at `epoch`. */
export function generated(epoch: number): Lifecycle {
  return { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch, seq: 0 } };
}

/** Each water body's L0 faces' outer rings, read through the façade (§3.4 `resolve`, the level view). */
export function waterRings(water: WaterSet, k: Kernel, key: PlatKey = GROUND): WaterRing[] {
  const out: WaterRing[] = [];
  for (const body of water.bodies) {
    const r = k.resolve(body.face, key);
    if (r.view !== 'faces') continue;
    const view = k.view(key, body.face.level);
    for (const f of r.faces) out.push({ body: body.id, ring: view.rings(f)[0] });
  }
  return out;
}

/**
 * The boundary with its water crossings made (see the module comment): `ring` counter-clockwise lattice points, `pins`
 * the "x,y" keys of the points that must not move (a main gate in the water among them). Returns the new ring, the
 * crossings in boundary order and the keys of every point the trace must keep (the bank points and any boundary point
 * kept in the water).
 */
export function crossWater(ring: readonly LatticePoint[], pins: ReadonlySet<string>, waters: readonly WaterRing[]): { ring: LatticePoint[]; crossings: WaterCrossing[]; keep: Set<string> } {
  const n = ring.length;
  const keep = new Set<string>();
  const cuts: { s: number; t: number; w: number; j: number; u: number }[] = [];
  for (let s = 0; s < n; s += 1) {
    const a = ring[s];
    const b = ring[s + 1 === n ? 0 : s + 1];
    waters.forEach((w, wi) => {
      for (let j = 0; j < w.ring.length; j += 1) {
        const x = crossParams(a, b, w.ring[j], w.ring[j + 1 === w.ring.length ? 0 : j + 1]);
        if (x !== null) cuts.push({ s, t: x.t, w: wi, j, u: x.u });
      }
    });
  }
  if (cuts.length === 0) return { ring: [...ring], crossings: [], keep };
  cuts.sort((p, q) => p.s - q.s || p.t - q.t || p.w - q.w || p.j - q.j);
  const pointAt = (c: { s: number; t: number }): XY => {
    const a = ring[c.s];
    const b = ring[c.s + 1 === n ? 0 : c.s + 1];
    return { x: a.x + c.t * (b.x - a.x), y: a.y + c.t * (b.y - a.y) };
  };
  const waterAt = (p: XY): WaterRing | null => {
    for (const w of waters) if (inside(w.ring, p)) return w;
    return null;
  };
  const out: LatticePoint[] = [];
  const crossings: WaterCrossing[] = [];
  const push = (p: LatticePoint): void => {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== p.x || last.y !== p.y) out.push(p);
  };
  const first = lat(pointAt(cuts[0]));
  push(first);
  for (let i = 0; i < cuts.length; i += 1) {
    const a = cuts[i];
    const b = cuts[(i + 1) % cuts.length];
    const wrap = i + 1 === cuts.length || (a.s === b.s && b.t <= a.t);
    // The boundary's vertices strictly between the two cuts.
    const between: LatticePoint[] = [];
    if (a.s !== b.s || wrap) {
      let s = a.s;
      do {
        s = s + 1 === n ? 0 : s + 1;
        between.push(ring[s]);
      } while (s !== b.s);
    }
    const pa = pointAt(a);
    const pb = pointAt(b);
    const end = i + 1 === cuts.length ? first : lat(pb);
    // The stretch's middle: the middle of its longest side.
    const pts: XY[] = [pa, ...between, pb];
    let at = 0;
    let best = -1;
    for (let q = 0; q + 1 < pts.length; q += 1) {
      const l = d2(pts[q], pts[q + 1]);
      if (l > best) {
        best = l;
        at = q;
      }
    }
    const mid = { x: (pts[at].x + pts[at + 1].x) * 0.5, y: (pts[at].y + pts[at + 1].y) * 0.5 };
    const w = best < 1 ? null : waterAt(mid);
    if (w === null) {
      for (const v of between) push(v);
      push(end);
      continue;
    }
    // A stretch over water. A graze — both ends on one water ring, the shorter way along its shore between them at
    // most GRAZE_RATIO times the chord — is the boundary running along a bank: the trace follows the shore there,
    // every point of that stretch kept (§4.4 *Trace* (3): "on a shore or bank the trace is attracted onto the outline";
    // C-0224 (7)). Otherwise a crossing from the bank point at `a` to the one at `b`.
    const entry = out[out.length - 1];
    if (a.w === b.w) {
      const arc = shoreArc(waters[a.w].ring, a.j, a.u, b.j, b.u);
      if (arc.lengthCm <= GRAZE_RATIO * dist(pa, pb)) {
        keep.add(`${String(entry.x)},${String(entry.y)}`);
        for (const v of arc.vertices) {
          push(v);
          keep.add(`${String(v.x)},${String(v.y)}`);
        }
        push(end);
        keep.add(`${String(end.x)},${String(end.y)}`);
        continue;
      }
    }
    const pinnedInside = between.some((v) => pins.has(`${String(v.x)},${String(v.y)}`));
    let chord = !pinnedInside;
    if (chord) {
      for (let q = 1; q < 10 && chord; q += 1) {
        const t = q * 0.1;
        if (!inside(w.ring, { x: entry.x + t * (end.x - entry.x), y: entry.y + t * (end.y - entry.y) })) chord = false;
      }
    }
    if (!chord) {
      for (const v of between) {
        push(v);
        keep.add(`${String(v.x)},${String(v.y)}`);
      }
    }
    push(end);
    if (entry.x === end.x && entry.y === end.y) continue;
    keep.add(`${String(entry.x)},${String(entry.y)}`);
    keep.add(`${String(end.x)},${String(end.y)}`);
    crossings.push({ body: w.body, entry, exit: end, chord });
  }
  return { ring: openRing(out), crossings, keep };
}

/** The water gate record of crossing `i` (C-0087): kind `water`, way null, its banks the two `gate_end` vertices. */
export function waterGateOf(i: number, c: WaterCrossing, enceinte: Id, epoch: number): WaterGate {
  const id = `gate:w${String(i)}`;
  return {
    id,
    enceinte,
    // The gate's own address (C-0224 (8)): the junction S4 would name is no water gate's — no way passes it.
    junction: id,
    way: null,
    kind: 'water',
    banks: [
      { role: 'gate_end', entity: id, ordinal: 0 },
      { role: 'gate_end', entity: id, ordinal: 1 },
    ],
    lifecycle: generated(epoch),
    bankAt: [c.entry, c.exit],
    body: c.body,
  };
}

/**
 * §4.12's `waterGates(trace, water, k)` (C-0087): the water gates of a closed trace over the water set's faces (read
 * through the façade) — one per stretch of the trace over water, in trace order, each with its two bank points.
 */
export function waterGates(trace: Polygon, water: WaterSet, k: Kernel, opts: { key?: PlatKey; enceinte?: Id; epoch?: number } = {}): WaterGate[] {
  const ring = ccw(openRing(trace.map((p) => lat(p))));
  const r = crossWater(ring, new Set(), waterRings(water, k, opts.key ?? GROUND));
  return r.crossings.map((c, i) => waterGateOf(i, c, opts.enceinte ?? 'enceinte:1', opts.epoch ?? 0));
}
