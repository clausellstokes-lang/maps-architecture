// The S8 ≡ S9 contract's geometry (M0-c-06; §13.2 "S8's working block equals S9's committed block (Hausdorff 0; §3.7)",
// §4.6: "S9's corridorUnion then commits exactly those kerbs"; readings C-0270 (5)).
//
// Two closed rings on the integer lattice bound the same point set exactly when their canonical forms are equal: the
// closing duplicate and repeated vertices dropped, every vertex whose two edges are collinear (an exact integer cross
// product of 0, going on) dropped, counter-clockwise, started at the lowest-then-leftmost vertex. The Hausdorff distance
// of two rings is 0 exactly when their boundaries are the same closed set, so `hausdorffCm` returns 0 on equal canonical
// forms and otherwise the larger of the two directed distances measured over every vertex and points every `stepCm`
// along every edge of each ring (a value > 0 whenever the forms differ: two different simple boundaries differ at a
// vertex of one of them).
export interface P {
  readonly x: number;
  readonly y: number;
}

function cross(o: P, a: P, b: P): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

/** Twice the ring's signed area (counter-clockwise positive), on an open ring. */
export function area2(ring: readonly P[]): number {
  let s = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) s += ring[j].x * ring[i].y - ring[i].x * ring[j].y;
  return s;
}

/** The canonical form of a ring (see the module comment); [] for a ring of fewer than three distinct turning vertices. */
export function canonicalRing(ring: readonly P[]): P[] {
  let pts: P[] = [];
  for (const q of ring) {
    const last = pts[pts.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) pts.push({ x: q.x, y: q.y });
  }
  while (pts.length > 1 && pts[0].x === pts[pts.length - 1].x && pts[0].y === pts[pts.length - 1].y) pts.pop();
  // Drop collinear vertices (straight-through and spikes) to a fixpoint.
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    const out: P[] = [];
    for (let i = 0; i < pts.length; i += 1) {
      const a = pts[(i - 1 + pts.length) % pts.length];
      const b = pts[i];
      const c = pts[(i + 1) % pts.length];
      if (cross(a, b, c) === 0) {
        changed = true;
        continue;
      }
      out.push(b);
    }
    // One removal pass may leave a new collinear triple (a spike's base): repeat.
    pts = out;
  }
  if (pts.length < 3) return [];
  if (area2(pts) < 0) pts.reverse();
  let s = 0;
  for (let i = 1; i < pts.length; i += 1) if (pts[i].y < pts[s].y || (pts[i].y === pts[s].y && pts[i].x < pts[s].x)) s = i;
  return [...pts.slice(s), ...pts.slice(0, s)];
}

/** Equal canonical forms: the two rings bound the same closed point set. */
export function sameRing(a: readonly P[], b: readonly P[]): boolean {
  const x = canonicalRing(a);
  const y = canonicalRing(b);
  if (x.length !== y.length || x.length === 0) return false;
  for (let i = 0; i < x.length; i += 1) if (x[i].x !== y[i].x || x[i].y !== y[i].y) return false;
  return true;
}

function segDist(p: P, a: P, b: P): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const L = dx * dx + dy * dy;
  let t = L === 0 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / L;
  t = Math.max(0, Math.min(1, t));
  const qx = a.x + t * dx - p.x;
  const qy = a.y + t * dy - p.y;
  return Math.sqrt(qx * qx + qy * qy);
}

/** The distance from a point to a closed ring's boundary. */
export function distToRing(p: P, ring: readonly P[]): number {
  let best = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) best = Math.min(best, segDist(p, ring[j], ring[i]));
  return best;
}

function directed(a: readonly P[], b: readonly P[], stepCm: number): number {
  let worst = 0;
  for (let i = 0, j = a.length - 1; i < a.length; j = i, i += 1) {
    const u = a[j];
    const v = a[i];
    const len = Math.sqrt((v.x - u.x) * (v.x - u.x) + (v.y - u.y) * (v.y - u.y));
    const n = Math.max(1, Math.ceil(len / stepCm));
    for (let s = 0; s < n; s += 1) {
      const t = s / n;
      worst = Math.max(worst, distToRing({ x: u.x + t * (v.x - u.x), y: u.y + t * (v.y - u.y) }, b));
    }
  }
  return worst;
}

/**
 * The Hausdorff distance (cm) between two closed rings' boundaries: 0 exactly when their canonical forms are equal;
 * otherwise the larger directed distance over every vertex and every `stepCm` along each edge (default 10 cm), at least
 * the smallest positive value a lattice vertex can stand off a line (never reported as 0).
 */
export function hausdorffCm(a: readonly P[], b: readonly P[], stepCm = 10): number {
  const x = canonicalRing(a);
  const y = canonicalRing(b);
  if (x.length === 0 || y.length === 0) return x.length === y.length ? 0 : Infinity;
  if (sameRing(x, y)) return 0;
  const d = Math.max(directed(x, y, stepCm), directed(y, x, stepCm));
  // Two different canonical boundaries differ by a positive distance; a sampling that met none still reports it.
  return d > 0 ? d : Number.MIN_VALUE;
}
