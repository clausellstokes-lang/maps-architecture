// Terrain.outfalls (M0-e-03; §4.2 S1 (9): "per water body, each 50 m bank stretch (`outfallStretchM`) into which D8
// flow from land enters, and each 50 m of frame edge the flow leaves by, as one `Outfall` at its cell of largest
// accumulation"; §2.3's `Outfall`: `into` from the receiving water's kind, `water` the body (null at the frame), `at` the
// bank point on the receiving body's shore or the frame-edge point, `cell` the `hydro` cell containing `at`).
//
// Readings (C-0225 (9)), on the hydrology grid S1 (3) left in the terrain record: a body's cells are those whose
// centre lies inside its polygon, and its course's cells (the river is often narrower than a cell); a cell of no body is
// land. A land cell whose D8 step lands in a body's cell drains into that body; the bank point is the nearest point to
// the cell's centre on the body's bank — its polygon's segments off the arena's outer ring — rounded to the centimetre;
// the stretch is the bank side (left or right of the course looking downstream) and ⌊arc ÷ stretch⌋ of the bank point's
// nearest course point. A land cell on the grid's border whose D8 step leaves the grid drains off the frame edge it
// crosses (E, N, W, S — a corner's diagonal step by that order); the stretch is ⌊(position along that side from its
// start) ÷ stretch⌋ and `at` the cell centre's foot on the arena's edge. Each stretch keeps the cell of largest
// accumulation (ties: the lower cell index). Outfalls are listed by body in order (left bank, then right, stretch by
// stretch), then the frame edges E, N, W, S, stretch by stretch: a pure function of the terrain and the water, so a
// recomputation gives the same list.
import type { Cm, Outfall, OutfallInto, PointCm, Terrain, WaterBody } from '@plat/model';
import { cellAt, rasterise, type XY } from '../hydro/course.js';
import { D8_DX, D8_DY } from '../hydro/field.js';
import { footOn, insideRings, lineOf, nearestOnLine, quot, type Reach } from './geometry.js';
import type { WaterReach } from './types.js';

/** What `outfalls` reads besides the terrain and the water: the arena and the stretch length (cm). */
export interface OutfallOptions {
  reach: Reach;
  stretchCm: number;
}

/** §2.3: the receiving water's kind → `into`. */
export function intoOf(kind: WaterBody['kind']): OutfallInto {
  switch (kind) {
    case 'river':
    case 'tributary':
    case 'distributary':
    case 'estuary':
    case 'islet_channel':
      return 'river';
    case 'sea':
      return 'sea';
    case 'lake':
    case 'pond':
    case 'oxbow':
      return 'lake';
    case 'canal':
      return 'canal';
    case 'ditch':
      return 'ditch';
    case 'moat':
      return 'moat';
    case 'harbour_basin':
      return 'sea';
  }
}

interface Pick {
  cell: number;
  acc: number;
  at: XY;
}

function better(a: Pick | undefined, cell: number, acc: number): boolean {
  return a === undefined || acc > a.acc || (acc === a.acc && cell < a.cell);
}

function pointCm(q: XY): PointCm {
  return { x: Math.round(q.x) as Cm, y: Math.round(q.y) as Cm } as PointCm;
}

/** The bank segments of a reach: its polygon's segments, less those lying on the arena's outer ring. */
function bankSegments(r: WaterReach, reach: Reach): [XY, XY][] {
  const out: [XY, XY][] = [];
  for (const part of r.parts) {
    for (const ring of part.rings) {
      const n = ring.length;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[i + 1 === n ? 0 : i + 1];
        const onSide = (a.x === b.x && Math.abs(a.x) === reach.x) || (a.y === b.y && Math.abs(a.y) === reach.y);
        if (!onSide) out.push([a, b]);
      }
    }
  }
  return out;
}

/** S1 (9)'s `outfalls(terrain, bodies)` (see the header): the terrain's outfalls for the reaches. */
export function outfalls(terrain: Terrain, bodies: readonly WaterReach[], opts: OutfallOptions): Outfall[] {
  const g = terrain.hydro;
  const n = g.cols * g.rows;
  if (terrain.flowDir.length !== n || terrain.flowAccum.length !== n) throw new RangeError('outfalls: the terrain carries no hydrology for its grid');
  if (!(opts.stretchCm >= 1)) throw new RangeError(`outfalls: a stretch of ${String(opts.stretchCm)} cm`);
  // the body of each cell (−1: land): by centre inside a polygon, then by the course's cells, in body order
  const bodyOf = new Int32Array(n).fill(-1);
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const rings = bodies[ri].parts.flatMap((p) => p.rings);
    for (let j = 0; j < g.rows; j += 1) {
      const y = g.originY + (j + 0.5) * g.cellCm;
      for (let i = 0; i < g.cols; i += 1) {
        const c = j * g.cols + i;
        if (bodyOf[c] >= 0) continue;
        if (insideRings(rings, { x: g.originX + (i + 0.5) * g.cellCm, y })) bodyOf[c] = ri;
      }
    }
  }
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const course = bodies[ri].body.course ?? [];
    if (course.length === 0) continue;
    for (const c of rasterise(g, course, false).cells) if (bodyOf[c] < 0) bodyOf[c] = ri;
  }
  const banks = bodies.map((r) => bankSegments(r, opts.reach));
  const lines = bodies.map((r) => lineOf(r.body.course ?? []));
  const bankPicks = bodies.map(() => new Map<string, Pick>());
  const framePicks = [new Map<number, Pick>(), new Map<number, Pick>(), new Map<number, Pick>(), new Map<number, Pick>()];
  for (let c = 0, i = 0, j = 0; c < n; c += 1, i = i + 1 === g.cols ? 0 : i + 1, j = i === 0 ? j + 1 : j) {
    if (bodyOf[c] >= 0) continue;
    const k = terrain.flowDir[c];
    if (k > 7) continue;
    const ti = i + D8_DX[k];
    const tj = j + D8_DY[k];
    const centre = { x: g.originX + (i + 0.5) * g.cellCm, y: g.originY + (j + 0.5) * g.cellCm };
    const acc = terrain.flowAccum[c];
    if (ti < 0 || tj < 0 || ti >= g.cols || tj >= g.rows) {
      // off the frame edge: E, N, W, S
      const side = ti >= g.cols ? 0 : tj >= g.rows ? 1 : ti < 0 ? 2 : 3;
      const along = side === 0 || side === 2 ? centre.y : centre.x;
      const half = side === 0 || side === 2 ? opts.reach.y : opts.reach.x;
      const pos = Math.min(2 * half, Math.max(0, along + half));
      const stretch = Math.min(Math.floor(quot(pos, opts.stretchCm)), Math.floor(quot(2 * half - 1, opts.stretchCm)));
      const m = framePicks[side];
      if (!better(m.get(stretch), c, acc)) continue;
      const clamp = (v: number, h: number): number => Math.min(h, Math.max(-h, v));
      const at = side === 0 ? { x: opts.reach.x, y: clamp(centre.y, opts.reach.y) } : side === 1 ? { x: clamp(centre.x, opts.reach.x), y: opts.reach.y } : side === 2 ? { x: -opts.reach.x, y: clamp(centre.y, opts.reach.y) } : { x: clamp(centre.x, opts.reach.x), y: -opts.reach.y };
      m.set(stretch, { cell: c, acc, at });
      continue;
    }
    const ri = bodyOf[tj * g.cols + ti];
    if (ri < 0) continue;
    // the bank point: the nearest point of the body's bank to the cell's centre
    let best: XY | null = null;
    let bestD = Infinity;
    for (const [a, b] of banks[ri]) {
      const f = footOn(centre, a, b);
      const dx = f.x - centre.x;
      const dy = f.y - centre.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = f;
      }
    }
    if (best === null) continue;
    const at = pointCm(best);
    const near = nearestOnLine(lines[ri], at);
    const side = near.side >= 0 ? 0 : 1;
    const key = `${String(side)}:${String(Math.floor(quot(near.arc, opts.stretchCm)))}`;
    const m = bankPicks[ri];
    if (!better(m.get(key), c, acc)) continue;
    m.set(key, { cell: c, acc, at });
  }
  const out: Outfall[] = [];
  const cellOf = (q: XY): number => {
    const { i, j } = cellAt(g, q.x, q.y);
    return j * g.cols + i;
  };
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const body = bodies[ri].body;
    const keys = [...bankPicks[ri].keys()].sort((a, b) => {
      const [sa, ka] = a.split(':').map(Number);
      const [sb, kb] = b.split(':').map(Number);
      return sa - sb || ka - kb;
    });
    for (const key of keys) {
      const pk = bankPicks[ri].get(key) as Pick;
      const at = pointCm(pk.at);
      out.push({ into: intoOf(body.kind), water: body.id, at, cell: cellOf(at) });
    }
  }
  for (const m of framePicks) {
    const keys = [...m.keys()].sort((a, b) => a - b);
    for (const key of keys) {
      const pk = m.get(key) as Pick;
      const at = pointCm(pk.at);
      out.push({ into: 'frame', water: null, at, cell: cellOf(at) });
    }
  }
  return out;
}
