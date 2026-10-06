// The grower's seeds (M0-e-04; §4.5 *Grower*: "Seeds = the sited features … plus a density-guided remainder, N_d seeds
// in all"; readings C-0242 (4), (5), (11)):
//   * each sited feature, in its given order, takes the claimable face its anchor names (the longest boundary with the
//     faces an entity owns; the face nearest a point; the longest shore or bank of a water body), ties by canonical
//     face order, a face an earlier seed took passed over; a feature with no such face left is dropped and reported;
//   * the remainder — N_d less the features — goes compartment by compartment (the claimable faces' connected runs
//     across edges that pass the edge test, which no grower crosses): each next seed to the compartment whose land
//     share of N_d (A_c ÷ (A ÷ N_d)) most exceeds the growth its seeds already carry (each seed counted at its rate,
//     so a slow gate ward leaves its compartment's land to the others), ties by the compartment's first face; inside a
//     compartment the first seed takes the face nearest the compartment's centroid, each later one the face farthest
//     from the compartment's seeds (centroid distance), ties by face order. The density the design guides the
//     remainder by is pass 1's (M0-e-05's, after S6 at M0): uniform here (C-0242 (11));
//   * a feature seed's lineage is its address's hash, a remainder seed's its first face's key (§4.5).
import { type Id } from '@plat/model';
import { quot } from '../siting/geom.js';
import { EDGE_TEST_BARRIERS, faceLineage, textLineage, type FaceGraph } from './faces.js';
import type { GrowSeed, SeedFeature, SeedKind, XY } from './types.js';

/** What `placeSeeds` returns: the seeds in seed-id order and the features dropped. */
export interface PlacedSeeds {
  readonly seeds: GrowSeed[];
  readonly dropped: Id[];
}

/** The squared distance of a point to a segment. */
function segDist2(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  let t = 0;
  if (l2 > 0) {
    // the projection's parameter, clamped to the segment (l2 ≥ 1 cm² on two distinct lattice points)
    t = quot((p.x - a.x) * dx + (p.y - a.y) * dy, l2, 'area', 'a segment projection');
    t = Math.max(0, Math.min(1, t));
  }
  const ex = a.x + t * dx - p.x;
  const ey = a.y + t * dy - p.y;
  return ex * ex + ey * ey;
}

/** The squared distance of a point to a face's boundary. */
function faceDist2(g: FaceGraph, i: number, p: XY): number {
  const P = g.plat;
  const O = P.halfEdges.origin;
  let best = Infinity;
  for (const r of g.rings[i]) {
    for (const h of r) {
      const a = { x: P.vertices.x[O[h]], y: P.vertices.y[O[h]] };
      const b = { x: P.vertices.x[O[h ^ 1]], y: P.vertices.y[O[h ^ 1]] };
      const d = segDist2(p, a, b);
      if (d < best) best = d;
    }
  }
  return best;
}

function d2(a: XY, b: XY): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/** The claimable faces' compartments (connected across edges that pass the edge test), each in face order. */
export function compartments(g: FaceGraph, claimable: readonly boolean[]): number[][] {
  const seen = new Uint8Array(g.faces.length);
  const out: number[][] = [];
  for (let i = 0; i < g.faces.length; i += 1) {
    if (!claimable[i] || seen[i] === 1) continue;
    const comp: number[] = [];
    const queue = [i];
    seen[i] = 1;
    while (queue.length > 0) {
      const m = queue.pop() as number;
      comp.push(m);
      for (const [j, l] of g.links[m]) {
        if (!claimable[j] || seen[j] === 1 || (l.barriers & EDGE_TEST_BARRIERS) !== 0) continue;
        seen[j] = 1;
        queue.push(j);
      }
    }
    comp.sort((a, b) => a - b);
    out.push(comp);
  }
  return out;
}

/**
 * The seeds (see the module comment): `features` in order, then the remainder up to `nd` seeds in all; `rate` the
 * kinds' `district.growthRate`.
 */
export function placeSeeds(g: FaceGraph, claimable: readonly boolean[], features: readonly SeedFeature[], nd: number, rate: (kind: SeedKind) => number): PlacedSeeds {
  const taken = new Set<number>();
  const seeds: GrowSeed[] = [];
  const dropped: Id[] = [];
  const free = (i: number): boolean => claimable[i] && !taken.has(i) && g.faces[i].areaCm2 > 0;
  for (const f of features) {
    let best = -1;
    let bestScore = 0;
    const a = f.anchor;
    for (let i = 0; i < g.faces.length; i += 1) {
      if (!free(i)) continue;
      let score: number;
      if (a.kind === 'owner') {
        // the longest boundary with the entity's faces (a score of length: larger is better)
        score = 0;
        for (const [j, l] of g.links[i]) if (g.faces[j].owner === a.owner) score += l.lengthCm;
        if (score <= 0) continue;
      } else if (a.kind === 'shore') {
        score = g.shores[i].get(a.body) ?? 0;
        if (score <= 0) continue;
      } else {
        // the nearest: the negated squared distance, so larger is better
        score = -faceDist2(g, i, a.at);
      }
      if (best < 0 || score > bestScore) {
        best = i;
        bestScore = score;
      }
    }
    if (best < 0) {
      dropped.push(f.id);
      continue;
    }
    taken.add(best);
    seeds.push({ order: seeds.length, kind: f.kind, face: best, lineage: textLineage(f.id), rate: rate(f.kind), feature: f.id });
  }
  // The remainder.
  const comps = compartments(g, claimable);
  let land = 0;
  for (const c of comps) for (const i of c) land += g.faces[i].areaCm2;
  const remainder = nd - seeds.length;
  if (remainder <= 0 || land <= 0) return { seeds, dropped };
  const compOf = new Int32Array(g.faces.length).fill(-1);
  comps.forEach((c, ci) => {
    for (const i of c) compOf[i] = ci;
  });
  const area = comps.map((c) => c.reduce((s, i) => s + g.faces[i].areaCm2, 0));
  const carried = comps.map(() => 0);
  const members: number[][] = comps.map(() => []);
  for (const s of seeds) {
    const ci = compOf[s.face];
    if (ci < 0) continue;
    carried[ci] += s.rate;
    members[ci].push(s.face);
  }
  const remRate = rate('remainder');
  for (let r = 0; r < remainder; r += 1) {
    let pick = -1;
    let pickDeficit = 0;
    // First every compartment without a seed, the largest first: each yields a district whatever it is given.
    comps.forEach((c, ci) => {
      if (members[ci].length > 0 || !c.some(free)) return;
      if (pick < 0 || area[ci] > area[pick]) pick = ci;
    });
    if (pick < 0)
    comps.forEach((c, ci) => {
      if (!c.some(free)) return;
      // the deficit: the compartment's share of N_d (A_c · N_d ÷ A, scaled by A to stay exact) less its carried growth
      const deficit = area[ci] * nd - carried[ci] * land;
      if (pick < 0 || deficit > pickDeficit) {
        pick = ci;
        pickDeficit = deficit;
      }
    });
    if (pick < 0) break;
    const c = comps[pick];
    let face = -1;
    if (members[pick].length === 0) {
      // the face nearest the compartment's area-weighted centroid
      let sx = 0;
      let sy = 0;
      for (const i of c) {
        sx += g.faces[i].centroid.x * g.faces[i].areaCm2;
        sy += g.faces[i].centroid.y * g.faces[i].areaCm2;
      }
      const cen = { x: quot(sx, area[pick], 'area', 'a compartment centroid'), y: quot(sy, area[pick], 'area', 'a compartment centroid') };
      let best = Infinity;
      for (const i of c) {
        if (!free(i)) continue;
        const d = d2(g.faces[i].centroid, cen);
        if (d < best) {
          best = d;
          face = i;
        }
      }
    } else {
      let best = -1;
      for (const i of c) {
        if (!free(i)) continue;
        let near = Infinity;
        for (const m of members[pick]) near = Math.min(near, d2(g.faces[i].centroid, g.faces[m].centroid));
        if (near > best) {
          best = near;
          face = i;
        }
      }
    }
    if (face < 0) break;
    taken.add(face);
    members[pick].push(face);
    carried[pick] += remRate;
    seeds.push({ order: seeds.length, kind: 'remainder', face, lineage: faceLineage(g.faces[face].key), rate: remRate });
  }
  return { seeds, dropped };
}
