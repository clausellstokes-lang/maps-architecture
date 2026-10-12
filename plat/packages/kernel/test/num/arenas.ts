// The fuzz arenas M0-a-01's exact-predicate tests read (equivalence.test.ts, exact.test.ts): arenas grown by tx's
// B-FUZZ random batches, with their live edges, live vertices and every level's face rings — real kernel geometry, so
// the shared predicates and the copies they replace are compared on the inputs the kernel itself makes.
import { isHalfEdgeLive, isVertexLive, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { tx } from '../../src/tx/index.js';
import type { Level, LatticePoint } from '../../src/types/index.js';
import { levelCycles } from '../arena/support.js';
import { randomBatch, rng, type Live, type Mix } from '../tx/fuzzgen.js';
import { framed, spec } from '../tx/support.js';
import type { RingCase } from './copies.js';
import { pt } from './support.js';

export interface FuzzArena {
  readonly p: Plat;
  /** Live edges as [ax, ay, bx, by]. */
  readonly edges: readonly (readonly [number, number, number, number])[];
  /** Live vertices' points. */
  readonly points: readonly LatticePoint[];
  /** Each level's cycles, as ring cases on the arena itself. */
  readonly rings: readonly (readonly RingCase[])[];
}

/** The arena after `steps` of tx's B-FUZZ random batches from `seed` (fuzz.test.ts's recipe: seed × 7919). */
export function fuzzArena(seed: number, steps: number, mix: Mix): FuzzArena {
  const r = rng(seed * 7919);
  const p = framed();
  const lv: Live = { ways: [], kerbs: [], next: 0 };
  for (let step = 0; step < steps; step++) {
    const keep = { ways: lv.ways.slice(), kerbs: lv.kerbs.slice() };
    const b = randomBatch(p, lv, r, mix);
    if (!tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok) {
      lv.ways = keep.ways;
      lv.kerbs = keep.kerbs;
    }
  }
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const edges: [number, number, number, number][] = [];
  for (let h = 0; h < 2 * p.slots.pair.top; h += 2) if (isHalfEdgeLive(p, h)) edges.push([X[O[h]], Y[O[h]], X[O[h + 1]], Y[O[h + 1]]]);
  const points: LatticePoint[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) points.push(pt(X[v], Y[v]));
  const rings = [0, 1, 2, 3, 4].map((l) =>
    levelCycles(p, l as Level).map((c: HalfEdgeId[]): RingCase => ({ pts: c.map((h) => pt(X[O[h]], Y[O[h]])), p, halfEdges: c, vertexIds: c.map((h) => O[h]) })),
  );
  return { p, edges, points, rings };
}

/** fuzz.test.ts's generator with insertion-heavy mixes, so the arenas grow: ways and lanes, and finer chains along ways. */
const GROW: Mix = { way: 0.45, lane: 0.95 };
const GROW_ALONG: Mix = { way: 0.35, lane: 0.7, along: 0.25 };
export const ARENAS: readonly FuzzArena[] = [fuzzArena(1, 40, GROW), fuzzArena(286, 40, GROW), fuzzArena(93, 40, GROW_ALONG)];

