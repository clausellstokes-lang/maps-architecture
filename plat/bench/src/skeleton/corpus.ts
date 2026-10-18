// The stand-in corpus's synthetic irregular footprints (M0-a-12; §3.8 *Confirmation at M0*, C-0015, C-0067, C-0172 (8)):
// a seeded generator of the footprints that reach the straight skeleton — §3.8's `roof` inputs that do not take the exact
// path: rectilinear compositions (L, T, U, stepped, cross, comb), notched outlines, row-house quads cut to a bent frontage,
// irregular institution outlines, courtyard footprints with a hole, bars bent along a street, and compounds — the
// outline of a random cluster of grid cells (up to some thirty vertices, many of them reflex). Each is drawn in local
// metres-scale centimetres on a 10 cm module, rotated by a uniform angle (dmath, so every host draws the same doubles),
// placed in a CITY-sized frame and snapped to the lattice; a footprint that is not simple, or that passes the convex
// near-rectangle test (it would take the exact roof, never the skeleton), is drawn again. Everything here is our own
// construction; the committed file `bench/fixtures/skeleton-corpus/footprints.json` is `encodeCorpus(generateCorpus())`
// byte for byte (the reproducibility test), numbers-only JSON, one footprint per line.
import { convexNearRectangle, dmath, orient2d, snap, streamFromKey, type Cm, type LatticePoint, type Polygon, type Stream } from '@plat/kernel';

/** The committed corpus's seed and size. */
export const CORPUS_SEED = 20_261_004;
export const CORPUS_COUNT = 2_000;
/** The file's schema tag. */
export const CORPUS_SCHEMA = 'plat-skeleton-corpus/1';

/** The families, in the order their indices are written; the weights of the draw (out of 100). */
export const FAMILIES = ['rectilinear', 'notched', 'quad', 'irregular', 'courtyard', 'bent', 'compound'] as const;
export type Family = (typeof FAMILIES)[number];
const WEIGHTS: readonly number[] = [25, 12, 13, 15, 10, 12, 13];

/** Half the CITY frame the footprints are scattered over (±4 km), so the skeleton's bounding-box-relative frame is exercised. */
const FRAME_HALF_CM = 400_000;

const TWO_PI = 6.283185307179586;

/** One corpus entry: its family index and its rings (the outer ring first, then holes), world lattice points. */
export interface CorpusFace {
  family: number;
  rings: Polygon[];
}

export interface CorpusFile {
  schema: string;
  seed: number;
  count: number;
  families: readonly string[];
  faces: CorpusFace[];
}

type Local = [number, number][];

/** A length on the 10 cm module, uniform in [lo, hi] cm. */
function len(s: Stream, lo: number, hi: number): number {
  return 10 * s.int(Math.ceil(lo / 10), Math.floor(hi / 10));
}

function rectilinear(s: Stream): Local {
  switch (s.int(0, 5)) {
    case 0: {
      // L
      const W = len(s, 1000, 3000);
      const H = len(s, 1000, 3000);
      const a = len(s, 400, W - 300);
      const b = len(s, 400, H - 300);
      return [[0, 0], [W, 0], [W, b], [a, b], [a, H], [0, H]];
    }
    case 1: {
      // T: a bar on a stem
      const W = len(s, 1500, 3500);
      const d = len(s, 500, 1100);
      const w = len(s, 400, W - 600);
      const L = len(s, 600, 2500);
      const x0 = len(s, 200, W - w - 200);
      return [[x0, 0], [x0 + w, 0], [x0 + w, L], [W, L], [W, L + d], [0, L + d], [0, L], [x0, L]];
    }
    case 2: {
      // U
      const W = len(s, 1600, 3600);
      const H = len(s, 1200, 3000);
      const a = len(s, 400, (W - 400) / 2);
      const b = len(s, 400, W - 400 - a);
      const c = len(s, 400, H - 400);
      return [[0, 0], [W, 0], [W, H], [W - b, H], [W - b, c], [a, c], [a, H], [0, H]];
    }
    case 3: {
      // stepped: three steps down to the right
      const W = len(s, 1800, 3600);
      const H = len(s, 1500, 3200);
      const x3 = len(s, 400, W / 3);
      const x2 = len(s, x3 + 300, (2 * W) / 3);
      const y1 = len(s, 300, H / 3);
      const y2 = len(s, y1 + 300, (2 * H) / 3);
      return [[0, 0], [W, 0], [W, y1], [x2, y1], [x2, y2], [x3, y2], [x3, H], [0, H]];
    }
    case 4: {
      // cross
      const w = len(s, 500, 1200);
      const h = len(s, 500, 1200);
      const a = len(s, 300, 1500);
      const b = len(s, 300, 1500);
      const W = a + w + len(s, 300, 1500);
      const H = b + h + len(s, 300, 1500);
      return [[a, 0], [a + w, 0], [a + w, b], [W, b], [W, b + h], [a + w, b + h], [a + w, H], [a, H], [a, b + h], [0, b + h], [0, b], [a, b]];
    }
    default: {
      // comb: three wings on a spine
      const t = len(s, 400, 900);
      const g = len(s, 400, 1200);
      const d = len(s, 400, 900);
      const H = d + len(s, 500, 2000);
      const W = 3 * t + 2 * g;
      return [[0, 0], [W, 0], [W, H], [2 * t + 2 * g, H], [2 * t + 2 * g, d], [2 * t + g, d], [2 * t + g, H], [t + g, H], [t + g, d], [t, d], [t, H], [0, H]];
    }
  }
}

function notched(s: Stream): Local {
  const W = len(s, 1500, 4000);
  const H = len(s, 1000, 2500);
  const n0 = len(s, 200, W / 2);
  const nw = len(s, 200, Math.min(W / 3, W - n0 - 200));
  const nd = len(s, 100, H / 3);
  const out: Local = [[0, 0], [n0, 0], [n0, nd], [n0 + nw, nd], [n0 + nw, 0], [W, 0], [W, H]];
  if (s.bool(0.5)) {
    const m0 = len(s, 200, W / 2);
    const mw = len(s, 200, Math.min(W / 3, W - m0 - 200));
    const md = len(s, 100, H / 3);
    out.push([m0 + mw, H], [m0 + mw, H - md], [m0, H - md], [m0, H]);
  }
  out.push([0, H]);
  return out;
}

function quad(s: Stream): Local {
  // a row house cut to a bent frontage: the front (y = 0 side) has one bend, the party walls lean a little
  const w = len(s, 400, 1000);
  const D = len(s, 800, 2200);
  const bx = len(s, 0.3 * w, 0.7 * w);
  const by = s.int(-12, 12) * 10;
  const e = s.int(-8, 8) * 10;
  const k1 = s.int(-10, 10) * 10;
  const k2 = s.int(-10, 10) * 10;
  return [[0, 0], [bx, by], [w, e], [w + k1, D], [k2, D]];
}

function irregular(s: Stream): Local {
  const n = s.int(5, 16);
  const R = len(s, 600, 2000);
  const out: Local = [];
  for (let i = 0; i < n; i += 1) {
    const a = (TWO_PI * (i + 0.6 * (s.float01() - 0.5))) / n;
    const r = R * (0.65 + 0.35 * s.float01());
    out.push([r * dmath.cos(a), r * dmath.sin(a)]);
  }
  return out;
}

function courtyard(s: Stream): [Local, Local] {
  const W = len(s, 2000, 4500);
  const H = len(s, 2000, 4500);
  // margins of 5–12 m that leave the court at least 4 m across
  const m1 = len(s, 500, Math.min(1200, (W - 400) / 2));
  const m2 = len(s, 500, Math.min(1200, (H - 400) / 2));
  const m3 = len(s, 500, Math.min(1200, (W - 400) / 2));
  const m4 = len(s, 500, Math.min(1200, (H - 400) / 2));
  const outer: Local = [[0, 0], [W, 0], [W, H], [0, H]];
  // the hole clockwise
  const hole: Local = [[m1, m2], [m1, H - m4], [W - m3, H - m4], [W - m3, m2]];
  if (s.bool(0.4)) {
    // an L-shaped outer: one corner cut away outside the hole's margin
    const cx = len(s, W - m3 + 200, W - 300);
    const cy = len(s, H - m4 + 200, H - 300);
    return [[[0, 0], [W, 0], [W, cy], [cx, cy], [cx, H], [0, H]], hole];
  }
  return [outer, hole];
}

function bent(s: Stream): Local {
  const segments = s.int(2, 3);
  const w = len(s, 600, 1200) / 2;
  let x = 0;
  let y = 0;
  let a = 0;
  const pts: [number, number][] = [[0, 0]];
  const dirs: number[] = [];
  for (let i = 0; i < segments; i += 1) {
    if (i > 0) a += (s.bool(0.5) ? 1 : -1) * (0.17 + 0.7 * s.float01());
    const L = len(s, 1000, 2500);
    x += L * dmath.cos(a);
    y += L * dmath.sin(a);
    pts.push([x, y]);
    dirs.push(a);
  }
  // offset the centreline both sides with mitred joins
  const left: Local = [];
  const right: Local = [];
  for (let i = 0; i < pts.length; i += 1) {
    const before = dirs[Math.max(0, i - 1)];
    const after = dirs[Math.min(dirs.length - 1, i)];
    const mid = (before + after) / 2;
    const scale = w / dmath.cos((after - before) / 2);
    const nx = -dmath.sin(mid) * scale;
    const ny = dmath.cos(mid) * scale;
    left.push([pts[i][0] + nx, pts[i][1] + ny]);
    right.push([pts[i][0] - nx, pts[i][1] - ny]);
  }
  return [...right, ...left.reverse()];
}

/**
 * A compound: a random 4-connected cluster of k × m grid cells (cells 2.5–6 m) grown from one cell, its enclosed gaps
 * filled, traced counter-clockwise with collinear runs merged; null when two cells touch only at a corner (the outline
 * would pinch there), and the draw is repeated.
 */
function compound(s: Stream): Local | null {
  const k = s.int(3, 6);
  const m = s.int(3, 6);
  const c = len(s, 250, 600);
  const filled = new Uint8Array(k * m);
  const at = (i: number, j: number): boolean => i >= 0 && j >= 0 && i < k && j < m && filled[j * k + i] === 1;
  const target = s.int(4, Math.max(4, Math.floor(0.7 * k * m)));
  filled[s.int(0, m - 1) * k + s.int(0, k - 1)] = 1;
  let count = 1;
  for (let guard = 0; count < target && guard < 1000; guard += 1) {
    const i = s.int(0, k - 1);
    const j = s.int(0, m - 1);
    if (at(i, j) || !(at(i - 1, j) || at(i + 1, j) || at(i, j - 1) || at(i, j + 1))) continue;
    filled[j * k + i] = 1;
    count += 1;
  }
  // fill every empty cell the outside cannot reach (no holes)
  const outside = new Uint8Array((k + 2) * (m + 2));
  const stack: [number, number][] = [[-1, -1]];
  outside[0] = 1;
  while (stack.length > 0) {
    const [i, j] = stack.pop() as [number, number];
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const a = i + di;
      const b = j + dj;
      if (a < -1 || b < -1 || a > k || b > m || outside[(b + 1) * (k + 2) + a + 1] === 1 || at(a, b)) continue;
      outside[(b + 1) * (k + 2) + a + 1] = 1;
      stack.push([a, b]);
    }
  }
  for (let j = 0; j < m; j += 1) for (let i = 0; i < k; i += 1) if (outside[(j + 1) * (k + 2) + i + 1] === 0) filled[j * k + i] = 1;
  // a corner-only contact pinches the outline
  for (let j = -1; j < m; j += 1) {
    for (let i = -1; i < k; i += 1) {
      const a = at(i, j);
      const b = at(i + 1, j);
      const d = at(i, j + 1);
      const e = at(i + 1, j + 1);
      if ((a && e && !b && !d) || (b && d && !a && !e)) return null;
    }
  }
  // the boundary's unit edges, interior on the left, keyed by their start
  const next = new Map<number, number>();
  const key = (x: number, y: number): number => y * (k + 1) + x;
  let start = -1;
  for (let j = 0; j < m; j += 1) {
    for (let i = 0; i < k; i += 1) {
      if (!at(i, j)) continue;
      if (!at(i, j - 1)) next.set(key(i, j), key(i + 1, j));
      if (!at(i + 1, j)) next.set(key(i + 1, j), key(i + 1, j + 1));
      if (!at(i, j + 1)) next.set(key(i + 1, j + 1), key(i, j + 1));
      if (!at(i - 1, j)) next.set(key(i, j + 1), key(i, j));
      if (start < 0) start = key(i, j);
    }
  }
  const loop: [number, number][] = [];
  let v = start;
  do {
    loop.push([v % (k + 1), (v - (v % (k + 1))) / (k + 1)]);
    const w = next.get(v);
    if (w === undefined) return null;
    v = w;
  } while (v !== start && loop.length <= next.size);
  if (loop.length !== next.size) return null;
  const out: Local = [];
  for (let i = 0; i < loop.length; i += 1) {
    const p = loop[(i + loop.length - 1) % loop.length];
    const q = loop[i];
    const r = loop[(i + 1) % loop.length];
    if ((q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]) !== 0) out.push([q[0] * c, q[1] * c]);
  }
  return out;
}

/** Rotates, places and snaps a local ring. */
function placeRing(local: Local, angle: number, cx: number, cy: number): Polygon {
  const c = dmath.cos(angle);
  const sn = dmath.sin(angle);
  return local.map(([x, y]) => {
    const r = snap(cx + x * c - y * sn, cy + x * sn + y * c);
    if (!r.ok) throw new Error('corpus: a footprint left the lattice range');
    return r.value;
  });
}

/** Does the ring set have two edges that meet away from a shared end (a crossing, a touch, an overlap) — exact on lattice integers? */
export function selfMeets(rings: readonly Polygon[]): boolean {
  const segs: [LatticePoint, LatticePoint, number, number][] = [];
  rings.forEach((r, k) => {
    for (let i = 0; i < r.length; i += 1) segs.push([r[i], r[(i + 1) % r.length], k, i]);
  });
  const on = (p: LatticePoint, q: LatticePoint, x: LatticePoint): boolean =>
    Math.min(p.x, q.x) <= x.x && x.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= x.y && x.y <= Math.max(p.y, q.y);
  for (let i = 0; i < segs.length; i += 1) {
    const [a, b, ka, ia] = segs[i];
    if (a.x === b.x && a.y === b.y) return true;
    for (let j = i + 1; j < segs.length; j += 1) {
      const [c, d, kc, ic] = segs[j];
      const n = rings[ka].length;
      const adjacent = ka === kc && (ic === ia + 1 || (ia === 0 && ic === n - 1));
      const o1 = Math.sign(orient2d(a.x, a.y, b.x, b.y, c.x, c.y));
      const o2 = Math.sign(orient2d(a.x, a.y, b.x, b.y, d.x, d.y));
      const o3 = Math.sign(orient2d(c.x, c.y, d.x, d.y, a.x, a.y));
      const o4 = Math.sign(orient2d(c.x, c.y, d.x, d.y, b.x, b.y));
      if (adjacent) {
        // neighbours share one end; they meet elsewhere only by folding back along each other (collinear, same side)
        if (o1 === 0 && o2 === 0) {
          const shared = ic === ia + 1 ? b : a;
          const other1 = ic === ia + 1 ? a : b;
          const other2 = ic === ia + 1 ? d : c;
          const dot = (other1.x - shared.x) * (other2.x - shared.x) + (other1.y - shared.y) * (other2.y - shared.y);
          if (dot > 0) return true;
        }
        continue;
      }
      if (o1 * o2 < 0 && o3 * o4 < 0) return true;
      if ((o1 === 0 && on(a, b, c)) || (o2 === 0 && on(a, b, d)) || (o3 === 0 && on(c, d, a)) || (o4 === 0 && on(c, d, b))) return true;
    }
  }
  return false;
}

/** One footprint of the drawn family, or null when the draw must be repeated. */
function draw(s: Stream, family: number): Polygon[] | null {
  let locals: Local[];
  if (family === 6) {
    const one = compound(s);
    if (one === null) return null;
    locals = [one];
  } else {
    locals = family === 0 ? [rectilinear(s)] : family === 1 ? [notched(s)] : family === 2 ? [quad(s)] : family === 3 ? [irregular(s)] : family === 4 ? courtyard(s) : [bent(s)];
  }
  const angle = TWO_PI * s.float01();
  const cx = s.int(-FRAME_HALF_CM, FRAME_HALF_CM);
  const cy = s.int(-FRAME_HALF_CM, FRAME_HALF_CM);
  const rings = locals.map((l) => placeRing(l, angle, cx, cy));
  if (selfMeets(rings)) return null;
  if (rings.length === 1) {
    const near = convexNearRectangle(rings[0]);
    if (!near.ok || near.value.pass) return null; // it would take the exact roof (§3.8), never the skeleton
  }
  return rings;
}

/** The corpus: `count` footprints drawn from the seed's stream (a pure function of seed and count). */
export function generateCorpus(seed: number = CORPUS_SEED, count: number = CORPUS_COUNT): CorpusFile {
  const s = streamFromKey([seed >>> 0, 0x4d30_6131, 0x3253_6b65, 0x6c65_746e]);
  const faces: CorpusFace[] = [];
  while (faces.length < count) {
    const family = s.weighted(WEIGHTS);
    for (;;) {
      const rings = draw(s, family);
      if (rings !== null) {
        faces.push({ family, rings });
        break;
      }
    }
  }
  return { schema: CORPUS_SCHEMA, seed, count, families: FAMILIES, faces };
}

/** The file's text: a header line, then one footprint per line — its family, its rings' bounding-box corner and each ring's local offsets flat. */
export function encodeCorpus(file: CorpusFile): string {
  const lines = file.faces.map((f) => {
    let ox = Infinity;
    let oy = Infinity;
    for (const r of f.rings) {
      for (const p of r) {
        if (p.x < ox) ox = p.x;
        if (p.y < oy) oy = p.y;
      }
    }
    const rings = f.rings.map((r) => `[${r.map((p) => `${p.x - ox},${p.y - oy}`).join(',')}]`).join(',');
    return `{"f":${f.family},"o":[${ox},${oy}],"r":[${rings}]}`;
  });
  return `{"schema":"${file.schema}","seed":${file.seed},"count":${file.count},"families":${JSON.stringify(file.families)},"faces":[\n${lines.join(',\n')}\n]}\n`;
}

/** Parses the file's text back into footprints (lattice points); throws on any shape other than the schema's. */
export function decodeCorpus(text: string): CorpusFile {
  const raw: unknown = JSON.parse(text);
  const bad = (why: string): never => {
    throw new Error(`skeleton corpus: ${why}`);
  };
  if (typeof raw !== 'object' || raw === null) return bad('not an object');
  const o = raw as Record<string, unknown>;
  if (o['schema'] !== CORPUS_SCHEMA) bad(`schema ${JSON.stringify(o['schema'])}`);
  const families = o['families'];
  if (!Array.isArray(families) || !families.every((f) => typeof f === 'string')) bad('families');
  const list = o['faces'];
  if (!Array.isArray(list)) return bad('faces');
  const faces: CorpusFace[] = list.map((entry: unknown, i) => {
    const e = entry as Record<string, unknown>;
    const f = e['f'];
    const origin = e['o'];
    const rings = e['r'];
    if (!Number.isInteger(f) || !Array.isArray(origin) || origin.length !== 2 || !Array.isArray(rings) || rings.length === 0) bad(`face ${i}`);
    const [ox, oy] = origin as number[];
    return {
      family: f as number,
      rings: (rings as unknown[]).map((r) => {
        if (!Array.isArray(r) || r.length % 2 !== 0 || !r.every((v) => Number.isInteger(v))) bad(`face ${i}: a ring`);
        const flat = r as number[];
        const ring: LatticePoint[] = [];
        for (let k = 0; k < flat.length; k += 2) ring.push({ x: (ox + flat[k]) as Cm, y: (oy + flat[k + 1]) as Cm });
        return ring;
      }),
    };
  });
  const count = o['count'];
  const seed = o['seed'];
  if (count !== faces.length) bad(`count ${String(count)} for ${faces.length} faces`);
  if (!Number.isInteger(seed)) bad('seed');
  return { schema: CORPUS_SCHEMA, seed: seed as number, count: faces.length, families: families as string[], faces };
}
