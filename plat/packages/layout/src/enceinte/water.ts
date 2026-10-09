// The basic water gate (C-0087; §4.2 S3 (7) "where the river crosses the boundary, water gates are added (not counted
// in N)", §4.4 *Water and the waterfront*, §2.2 rule 7, §2.7 `Gate.banks`; M0-c-02).
//
// Where the boundary crosses a water face, the trace crosses the water there, along the boundary's crossing: the two
// points where the boundary leaves the land and reaches it again become the trace's bank vertices — L1 Steiner vertices
// on the L0 shores, or L0 shore vertices where the insertion attracts them (§3.6) — carrying ('gate_end', gate, 0 | 1),
// and between them the trace is one straight edge across the water (the wall's edge between the banks lies across the
// water, §2.2 rule 7) wherever that chord keeps inside the water; where it would not, or where a main gate stands in the
// water between them (C-0204 (2)'s bridgehead gate), the boundary's own course between the banks is kept (C-0226 (7)).
// The bank points are pinned through the pull, the smoothing and the simplify, so the pull keeps each crossing where
// the boundary crosses (C-0087). Each crossing writes a `Gate` of kind `water` with `way` null and `banks` set, not
// counted in N and carrying no route.
// The chord is laid as ONE edge between the two bank pins (N-54 (1), strict; M0-c-02 session round s2): the insertion
// routes a segment through every existing vertex it passes within `attractCm` (§3.6 step 3), so a shore vertex standing
// that close to a chord near its bank would split it into a short shore edge and a wet side ending on one pin only
// (relief-60 CITY seed 9, stage 2: `gate:w0`'s bank 27 cm from shore vertex (−13908, −90171), 11 cm off the chord).
// Each chord's banks are therefore SETTLED on the arena's vertices before anything is pinned: where the chord between
// the banks' landing vertices passes an existing vertex, the bank nearer it moves onto it when it is a shore vertex
// (an L0 shore vertex where the trace attracted, as C-0087 allows), until the chord passes none (`clear`); a chord
// still passing a vertex that is not on a shore, or leaving the water once settled, is not clear, and the strategy
// refuses it (C-0300).
import { LATTICE, orient2d, type Kernel, type LatticePoint, type PlatKey, type Polygon } from '@plat/kernel';
import type { Id, Lifecycle, WaterSet } from '@plat/model';
import { ccw, crossParams, d2, dist, inside, lat, openRing, TOUCH_CM } from './plane.js';
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
  /**
   * The crossing's course on the ring, entry to exit: the two banks for a chord, else the banks with the boundary's own
   * points kept between them. Only a chord's course (its one side) may lie over the water (N-54 (1), strict; C-0300).
   */
  readonly course: readonly LatticePoint[];
  /**
   * True when the chord passes no existing vertex but its banks' own (settled, see the module comment): the insertion
   * lays it as one edge between the two bank pins. False for a course (no chord) and for a chord no settling cleared.
   */
  readonly clear: boolean;
}

/** The arena's existing vertices in a box (cm, inclusive), the ones the insertion's attraction reads (§3.6). */
export type VerticesIn = (box: { minX: number; minY: number; maxX: number; maxY: number }) => readonly XY[];

/** The vertices of level ≤ 1 in a box of the arena `key`, through the façade's index (§3.3 *Queries*). */
export function arenaVertices(k: Kernel, key: PlatKey): VerticesIn {
  return (box) => {
    const q = k.index.query(key, 1, box, { vertices: true });
    const p = k.plat(key);
    return q.vertices.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }));
  };
}

/** The water rings' own vertices in a box (the source when no arena is given). */
function ringVertices(waters: readonly WaterRing[]): VerticesIn {
  return (box) => {
    const out: XY[] = [];
    for (const w of waters) for (const q of w.ring) if (q.x >= box.minX && q.x <= box.maxX && q.y >= box.minY && q.y <= box.maxY) out.push(q);
    return out;
  };
}

/** How many times a chord's banks may move before the chord is judged not clear. */
export const SETTLE_ROUNDS = 8;

const ATTRACT_SQ = LATTICE.attractCm * LATTICE.attractCm;
/** The box of segment ab grown by r, whole centimetres within the lattice's range. */
function boxAround(a: XY, b: XY, r: number): { minX: number; minY: number; maxX: number; maxY: number } {
  return { minX: Math.floor(Math.min(a.x, b.x)) - r, minY: Math.floor(Math.min(a.y, b.y)) - r, maxX: Math.ceil(Math.max(a.x, b.x)) + r, maxY: Math.ceil(Math.max(a.y, b.y)) + r };
}

/** Where the insertion lands a chain point (§3.6 step 2): the nearest existing vertex within `attractCm`, else itself. */
function landing(p: LatticePoint, near: VerticesIn): XY {
  let best: XY = p;
  let bd = Infinity;
  for (const q of near(boxAround(p, p, TOUCH_CM))) {
    const d = d2(p, q);
    if (d <= ATTRACT_SQ && (d < bd || (d === bd && (q.y < best.y || (q.y === best.y && q.x < best.x))))) {
      best = q;
      bd = d;
    }
  }
  return best;
}

/**
 * The existing vertex the segment ab passes within `attractCm` with its foot strictly inside (§3.6 step 3's contact),
 * nearest (along ab) to either end, with which end it is nearer; null when it passes none.
 */
function contactOn(a: XY, b: XY, near: VerticesIn): { v: XY; nearA: boolean } | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let best: { v: XY; nearA: boolean } | null = null;
  let bs = Infinity;
  for (const v of near(boxAround(a, b, TOUCH_CM))) {
    if ((v.x === a.x && v.y === a.y) || (v.x === b.x && v.y === b.y)) continue;
    const dot = (v.x - a.x) * dx + (v.y - a.y) * dy;
    if (dot <= 0 || dot >= l2) continue;
    const o = orient2d(a.x, a.y, b.x, b.y, v.x, v.y);
    if (o * o > ATTRACT_SQ * l2) continue;
    const s = Math.min(dot, l2 - dot);
    if (s < bs || (s === bs && best !== null && (v.y < best.v.y || (v.y === best.v.y && v.x < best.v.x)))) {
      bs = s;
      best = { v, nearA: dot <= l2 - dot };
    }
  }
  return best;
}

/** Does the chord ab keep inside the ring (sampled at its nine tenths, as the crossing's chord test)? */
function chordInside(ring: readonly XY[], a: XY, b: XY): boolean {
  for (let q = 1; q < 10; q += 1) {
    const t = q * 0.1;
    if (!inside(ring, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) })) return false;
  }
  return true;
}

/**
 * A chord's banks settled on the existing vertices (see the module comment): each round the chord between the banks'
 * landings is tested for a contact; a contact on a shore (`shore`, the water rings' vertex keys) takes the nearer bank,
 * any other contact, a chord leaving the water or SETTLE_ROUNDS rounds leave it not clear.
 */
function settleChord(entry: LatticePoint, exit: LatticePoint, ring: readonly XY[], shore: ReadonlySet<string>, near: VerticesIn): { entry: LatticePoint; exit: LatticePoint; clear: boolean } {
  let e = entry;
  let x = exit;
  for (let round = 0; round <= SETTLE_ROUNDS; round += 1) {
    const c = contactOn(landing(e, near), landing(x, near), near);
    if (c === null) return { entry: e, exit: x, clear: true };
    if (round === SETTLE_ROUNDS || !shore.has(`${String(c.v.x)},${String(c.v.y)}`)) break;
    const v = lat(c.v);
    if (c.nearA) e = v;
    else x = v;
    if ((e.x === x.x && e.y === x.y) || !chordInside(ring, e, x)) break;
  }
  return { entry: e, exit: x, clear: false };
}

/**
 * A stretch over water whose two ends lie on one water ring with the shorter way along the shore between them at most
 * this many times the chord is a graze, not a crossing (C-0226 (7)): a river crossed bank to bank has its ends a whole
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
 * the "x,y" keys of the points that must not move (a main gate in the water among them), `near` the arena's existing
 * vertices each chord's banks are settled on (the water rings' own vertices when absent). Returns the new ring, the
 * crossings in boundary order and the keys of every point the trace must keep (the bank points and any boundary point
 * kept in the water).
 */
export function crossWater(ring: readonly LatticePoint[], pins: ReadonlySet<string>, waters: readonly WaterRing[], near?: VerticesIn): { ring: LatticePoint[]; crossings: WaterCrossing[]; keep: Set<string> } {
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
  const ringOf: WaterRing[] = [];
  const push = (p: LatticePoint): void => {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== p.x || last.y !== p.y) out.push(p);
  };
  const first = lat(pointAt(cuts[0]));
  push(first);
  for (let i = 0; i < cuts.length; i += 1) {
    const a = cuts[i];
    const b = cuts[(i + 1) % cuts.length];
    // Only the last cut wraps round to the first: two cuts at one point (a side through a shore vertex meets both of its
    // shore sides there) are a stretch of no length, never the whole ring again (N-54 (1) Q6).
    const wrap = i + 1 === cuts.length;
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
    // C-0226 (7)). Otherwise a crossing from the bank point at `a` to the one at `b`.
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
    const from = out.length - 1;
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
    // The last crossing's exit is the ring's first point (pushed at the start, not again).
    const course = out.slice(from);
    if (course[course.length - 1].x !== end.x || course[course.length - 1].y !== end.y) course.push(end);
    crossings.push({ body: w.body, entry, exit: end, chord, course, clear: false });
    ringOf.push(w);
  }
  // Each chord's banks settled on the existing vertices, so the insertion lays it as one edge between them (N-54 (1)).
  const shore = new Set<string>();
  for (const w of waters) for (const q of w.ring) shore.add(`${String(q.x)},${String(q.y)}`);
  const src = near ?? ringVertices(waters);
  const moved = new Map<string, LatticePoint>();
  const k = (q: XY): string => `${String(q.x)},${String(q.y)}`;
  const settled = crossings.map((c, i): WaterCrossing => {
    if (!c.chord) return c;
    const s = settleChord(c.entry, c.exit, ringOf[i].ring, shore, src);
    if (s.entry !== c.entry) moved.set(k(c.entry), s.entry);
    if (s.exit !== c.exit) moved.set(k(c.exit), s.exit);
    return { body: c.body, entry: s.entry, exit: s.exit, chord: true, course: [s.entry, s.exit], clear: s.clear };
  });
  if (moved.size === 0) return { ring: openRing(out), crossings: settled, keep };
  const swap = (q: LatticePoint): LatticePoint => moved.get(k(q)) ?? q;
  const kept = new Set<string>();
  for (const q of keep) {
    const m = moved.get(q);
    kept.add(m === undefined ? q : k(m));
  }
  return { ring: openRing(out.map(swap)), crossings: settled, keep: kept };
}

/** The water gate record of crossing `i` (C-0087): kind `water`, way null, its banks the two `gate_end` vertices. */
export function waterGateOf(i: number, c: WaterCrossing, enceinte: Id, epoch: number): WaterGate {
  const id = `gate:w${String(i)}`;
  return {
    id,
    enceinte,
    // The gate's own address (C-0226 (8)): the junction S4 would name is no water gate's — no way passes it.
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
  const r = crossWater(ring, new Set(), waterRings(water, k, opts.key ?? GROUND), arenaVertices(k, opts.key ?? GROUND));
  return r.crossings.map((c, i) => waterGateOf(i, c, opts.enceinte ?? 'enceinte:1', opts.epoch ?? 0));
}
