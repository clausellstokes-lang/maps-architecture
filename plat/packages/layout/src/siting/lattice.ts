// §4.3's candidate lattice and its edge costs, built once at S3 (3) (M0-c-01): the kernel's `hexLattice` (§3.4) over
// the frame at the lattice table's spacing (≈ 25 m, `lattice.route.spacingM`) and jitter (`route.jitterM`) from the
// `route` stream; edge cost = length × (1 + k_slope · slope²) × waterCrossingPenalty × reservationPenalty (§4.3):
// water impassable except along a crossing site's deck segment (C-0076), a reservation impassable inside and reached
// only at its attach points. The wall, existing-fabric and land-value factors are 1 at S3 at epoch 0 (no wall, no
// fabric yet; the land value's rows are M1's), and the water pull multiplies the field T only, never a route (§4.3).
// Choices: C-0201.
import { CONCERNS, hexLattice, type LatticePoint, type SearchGraph, type Stream } from '@plat/kernel';
import { terrainSampler } from '@plat/site';
import { distToSegment, insideRing, quot, segmentMeetsRing, type XY } from './geom.js';
import type { Costs, Lattice, PlannedReservation, Site } from './types.js';

/** cos 30°: a deck edge runs within 30° of its deck's direction (C-0201 (4)). */
const COS30 = 0.8660254037844387;

/** √3 ÷ 2: a triangular lattice node's cell is s² · √3 ÷ 2. */
const HALF_SQRT3 = 0.8660254037844386;

/** The §4.3 cost inputs of a site: k_slope from ways.json, the site's planned water, the given reservations. */
export function siteCosts(site: Site, reservations: PlannedReservation[] = []): Costs {
  return { kSlope: site.tables.table('ways').num('graph', 'kSlope'), water: site.water, reservations, deckPenalty: 1 };
}

/** The lattice's spacing and jitter (cm) from `lattice.json`'s `route` row (C-0158). */
export function latticeSpacing(site: Site): { spacingCm: number; jitterCm: number } {
  const t = site.tables.table('lattice');
  return { spacingCm: t.num('route', 'spacingM') * 100, jitterCm: t.num('route', 'jitterM') * 100 };
}

/**
 * Is the edge ab, which meets water, an edge along a deck segment (C-0076)? Both ends within one spacing of the deck
 * and the edge within 30° of its direction (C-0201 (4)).
 */
function alongDeck(costs: Costs, a: XY, b: XY, spacingCm: number): boolean {
  for (const d of costs.water.decks) {
    if (distToSegment(a, d.a, d.b) > spacingCm || distToSegment(b, d.a, d.b) > spacingCm) continue;
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const dx = d.b.x - d.a.x;
    const dy = d.b.y - d.a.y;
    const dot = Math.abs(ex * dx + ey * dy);
    if (dot >= COS30 * Math.sqrt(ex * ex + ey * ey) * Math.sqrt(dx * dx + dy * dy)) return true;
  }
  return false;
}

/** The axis-aligned box of a ring, for a quick reject. */
function boxOf(ring: readonly XY[]): [number, number, number, number] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of ring) {
    if (p.x < x0) x0 = p.x;
    if (p.y < y0) y0 = p.y;
    if (p.x > x1) x1 = p.x;
    if (p.y > y1) y1 = p.y;
  }
  return [x0, y0, x1, y1];
}

function boxMeets(box: readonly number[], a: XY, b: XY): boolean {
  return !(Math.max(a.x, b.x) < box[0] || Math.min(a.x, b.x) > box[2] || Math.max(a.y, b.y) < box[1] || Math.min(a.y, b.y) > box[3]);
}

/**
 * §4.3's edge cost of ab (cm-weighted): length × (1 + k_slope · slope²) × the water factor × the reservation factor,
 * +∞ where impassable. `slope` is the rise over the run between the two ends' heights.
 */
export function edgeCost(costs: Costs, a: XY, b: XY, ha: number, hb: number, spacingCm: number, boxes?: { water: number[][]; reserved: number[][] }): number {
  const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  const slope = quot(Math.abs(hb - ha), len, 'length', 'edge slope');
  let cost = len * (1 + costs.kSlope * slope * slope);
  for (let r = 0; r < costs.reservations.length; r += 1) {
    if (boxes !== undefined && !boxMeets(boxes.reserved[r], a, b)) continue;
    if (segmentMeetsRing(costs.reservations[r].ring, a, b)) return Infinity;
  }
  let wet = false;
  for (let w = 0; w < costs.water.faces.length && !wet; w += 1) {
    if (boxes !== undefined && !boxMeets(boxes.water[w], a, b)) continue;
    if (segmentMeetsRing(costs.water.faces[w], a, b)) wet = true;
  }
  if (wet) {
    if (!alongDeck(costs, a, b, spacingCm)) return Infinity;
    cost *= costs.deckPenalty;
  }
  return cost;
}

/**
 * The attach node of each reservation vertex (§4.2 S3 (2)): the lattice node nearest the attach point whose edges are
 * not all impassable and which lies outside the reservation (ties by index).
 */
function attachNodesOf(points: readonly LatticePoint[], passable: Uint8Array, res: PlannedReservation, near: (p: XY) => number[]): number[] {
  const out: number[] = [];
  for (const q of res.attach) {
    let best = -1;
    let bestD = Infinity;
    for (const i of near(q)) {
      if (passable[i] !== 1 || insideRing(res.ring, points[i], true)) continue;
      const p = points[i];
      const d = (p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y);
      if (d < bestD || (d === bestD && i < best)) {
        best = i;
        bestD = d;
      }
    }
    if (best === -1) throw new RangeError(`buildLattice: no passable lattice node near the attach point (${String(q.x)}, ${String(q.y)}) of ${res.id}`);
    out.push(best);
  }
  return out;
}

/**
 * The costs with `water.decks` cut to the decks whose two ends lie inside the frame ring, its line included (C-0289,
 * refining C-0201 (4); N-54 (2)): a crossing site with a deck end beyond the frame is never one S4 can span (§4.2 S3 (6),
 * §4.13 bridge × frame: "a bridge's deck lies inside the frame (its site's two ends do)"). The same object when no deck
 * is cut, so a site with every deck inside builds byte-identically.
 */
export function framedCosts(frameRing: readonly XY[], costs: Costs): Costs {
  const decks = costs.water.decks.filter((d) => insideRing(frameRing, d.a, true) && insideRing(frameRing, d.b, true));
  if (decks.length === costs.water.decks.length) return costs;
  return { ...costs, water: { faces: costs.water.faces, decks } };
}

/**
 * §4.3's lattice over the site's frame with its edge costs (§4.2 S3 (3)), the jitter drawn from `stream` (the `route`
 * concern, `site.stream(CONCERNS.route)` when omitted). The lattice stores `costs` cut to the decks inside the frame
 * (`framedCosts`, C-0289): the one chokepoint `edgeCost`, `alongDeck` and S4's `routeGraph` read.
 */
export function buildLattice(site: Site, given: Costs, stream?: Stream): Lattice {
  const costs = framedCosts(site.frameRing, given);
  const { spacingCm, jitterCm } = latticeSpacing(site);
  const rng = stream ?? site.stream(CONCERNS.route);
  const hex = hexLattice([site.frameRing], spacingCm, jitterCm, rng);
  const { points, adjacency } = hex;
  const n = points.length;
  const sampler = terrainSampler(site.terrain, site.tables.table('terrain').num('settings', 'slopeQueryM') * 100);
  const heights = new Float64Array(n);
  const slope = new Float64Array(n);
  for (let i = 0; i < n; i += 1) {
    heights[i] = sampler.heightAt(points[i]);
    slope[i] = sampler.slopeAt(points[i]);
  }
  const boxes = { water: costs.water.faces.map(boxOf), reserved: costs.reservations.map((r) => boxOf(r.ring)) };

  const interior = new Uint8Array(n);
  const rim = new Uint8Array(n);
  const offsets = new Int32Array(n + 1);
  const targets: number[] = [];
  const weights: number[] = [];
  const lengths: number[] = [];
  const slot = new Int32Array(6 * n).fill(-1);
  const passable = new Uint8Array(n);
  let minCostPerCm = Infinity;
  for (let i = 0; i < n; i += 1) {
    let degree = 0;
    offsets[i] = targets.length;
    for (let d = 0; d < 6; d += 1) {
      const j = adjacency[6 * i + d];
      if (j === -1) continue;
      degree += 1;
      const a = points[i];
      const b = points[j];
      const w = edgeCost(costs, a, b, heights[i], heights[j], spacingCm, boxes);
      const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
      slot[6 * i + d] = targets.length;
      targets.push(j);
      weights.push(w);
      lengths.push(len);
      if (w < Infinity) {
        passable[i] = 1;
        const per = quot(w, len, 'length', 'cost per cm');
        if (per < minCostPerCm) minCostPerCm = per;
      }
    }
    if (degree === 6) interior[i] = 1;
    else rim[i] = 1;
  }
  offsets[n] = targets.length;
  const xy = new Float64Array(2 * n);
  for (let i = 0; i < n; i += 1) {
    xy[2 * i] = points[i].x;
    xy[2 * i + 1] = points[i].y;
  }
  const graph: SearchGraph = { n, offsets, targets: Int32Array.from(targets), weights: Float64Array.from(weights), xy };

  const [fx0, fy0, fx1, fy1] = boxOf(site.frameRing);
  let rimInsetCm = 0;
  for (let i = 0; i < n; i += 1) {
    if (rim[i] !== 1) continue;
    const p = points[i];
    const inset = Math.min(p.x - fx0, fx1 - p.x, p.y - fy0, fy1 - p.y);
    if (inset > rimInsetCm) rimInsetCm = inset;
  }

  // A bucket grid for the attach-node search: nodes by cell of one spacing.
  const cell = spacingCm;
  const cols = Math.max(1, Math.ceil(quot(fx1 - fx0, cell, 'length', 'grid')) + 1);
  const buckets = new Map<number, number[]>();
  const keyOf = (x: number, y: number): number => Math.floor(quot(y - fy0, cell, 'length', 'grid')) * cols + Math.floor(quot(x - fx0, cell, 'length', 'grid'));
  for (let i = 0; i < n; i += 1) {
    const k = keyOf(points[i].x, points[i].y);
    const b = buckets.get(k);
    if (b === undefined) buckets.set(k, [i]);
    else b.push(i);
  }
  const near = (p: XY): number[] => {
    const out: number[] = [];
    const cx = Math.floor(quot(p.x - fx0, cell, 'length', 'grid'));
    const cy = Math.floor(quot(p.y - fy0, cell, 'length', 'grid'));
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const b = buckets.get((cy + dy) * cols + (cx + dx));
        if (b !== undefined) for (const i of b) out.push(i);
      }
    }
    return out;
  };

  const water = new Uint8Array(n);
  for (let w = 0; w < costs.water.faces.length; w += 1) {
    const box = boxes.water[w];
    for (let i = 0; i < n; i += 1) {
      const p = points[i];
      if (p.x < box[0] || p.x > box[2] || p.y < box[1] || p.y > box[3]) continue;
      if (insideRing(costs.water.faces[w], p, true)) water[i] = 1;
    }
  }
  const reservedNodes: number[] = [];
  for (let i = 0; i < n; i += 1) {
    for (const r of costs.reservations) {
      if (insideRing(r.ring, points[i])) {
        reservedNodes.push(i);
        break;
      }
    }
  }
  const attachNodes = costs.reservations.map((r) => attachNodesOf(points, passable, r, near));
  return {
    spacingCm,
    jitterCm,
    points,
    adjacency,
    interior,
    rim,
    water,
    slope,
    cellAreaCm2: spacingCm * spacingCm * HALF_SQRT3,
    graph,
    slot,
    length: Float64Array.from(lengths),
    minCostPerCm: minCostPerCm < Infinity ? minCostPerCm : 0,
    rimInsetCm,
    frame: { minX: fx0, minY: fy0, maxX: fx1, maxY: fy1 },
    reservedNodes,
    attachNodes,
    costs,
  };
}

/** The graph edge from i to j, or −1 when they are not lattice neighbours. */
export function edgeBetween(lattice: Lattice, i: number, j: number): number {
  for (let d = 0; d < 6; d += 1) if (lattice.adjacency[6 * i + d] === j) return lattice.slot[6 * i + d];
  return -1;
}
