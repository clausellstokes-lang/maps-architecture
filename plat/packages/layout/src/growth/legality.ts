// S5c's legality (M0-c-05; §4.4 S5c *Legality* (GEO-37), *Destination bias*, the crossing matrix (O4 b); readings
// C-0254). One candidate step of a proposal — its start, its heading after the `ou` walk and its length — is judged
// against the features standing (the ways, the wall and its setback lines, shores, reservations and, in an unwalled
// stage, the stage boundary) and either accepted, with the point it reaches and how the proposal ends there, or
// rejected:
//   * destination bias (switchable per regime): a spine within ≈ 1.5 step lengths ahead, met at ≥ 30°, turns the step
//     toward its nearest point, and the proposal ends there in a T (ending cul-de-sacs deliberately). At M0 every S3
//     destination (the plaza, the gates) is served by S4, so the spines are the targets (C-0254 (6));
//   * a junction within `0.35 · step` of the step's end is snapped to, the proposal ending there; a way within that
//     reach of the end (a near miss) is joined at its foot in a T;
//   * along the step, the first feature met decides: a setback line or a wall stops the proposal there (a wall is never
//     crossed); a shore or a reservation met at ≥ 30° ends it there; a way is met by the preset's crossing matrix — stop
//     in a T, or cross with a materialised crossroads — and at < 30° is no junction at all; the stage boundary of an
//     unwalled stage is crossed by a provisional step, the proposal ending beyond it (the between-stage trim cuts it back);
//   * clearance: a step running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of
//     any spine, setback line, shore, reservation or the stage boundary and within 30° of parallel is illegal, so no
//     strip thinner than a plot depth is left;
//   * an illegal step is deflected once — turned the least way to 31° off the feature it met or ran beside, away from
//     it, its goal heading taking the turn — and judged again; still illegal, it is rejected. A deflection needing a
//     turn above the legal angle (30°) is a rejection (C-0258 (3)): a street's course takes no turn its walk would not;
//   * a proposal's first step leaves its junction as proposed — square to its arterial, or its branch's heading — with
//     neither the destination bias nor a deflection (C-0258 (2)): illegal, the proposal is rejected there.
// Geometry in cm (values, never arena slots); angles in radians.
import { dmath, type LatticePoint } from '@plat/kernel';
import type { Id, WayClass } from '@plat/model';
import { crossParams, footOn, lat } from '../enceinte/plane.js';
import { PI, quot } from '../siting/geom.js';
import { wrapAngle } from './heading.js';

/** A point in cm. */
export interface XY {
  readonly x: number;
  readonly y: number;
}

/** What a feature segment is (§4.4 S5c *Legality*'s list). */
export type FeatureKind = 'way' | 'band' | 'shore' | 'reservation' | 'boundary';

/** One segment of a feature standing when a step is judged. */
export interface Feature {
  readonly a: XY;
  readonly b: XY;
  readonly kind: FeatureKind;
  /** A way's id and class (kind `way`). */
  readonly way?: Id;
  readonly cls?: WayClass;
  /** The S5c street (its proposal id) that laid it, and its step number there; absent for standing features. */
  readonly street?: number;
  readonly step?: number;
}

/**
 * The features as a uniform grid of buckets (one `cellCm` square each): `near(box)` lists, ascending and without
 * repeats, every feature whose bounding box meets the box — a deterministic order, never an insertion accident.
 */
export class FeatureIndex {
  readonly features: Feature[] = [];
  private readonly cellCm: number;
  private readonly buckets = new Map<string, number[]>();

  constructor(cellCm = 5_000) {
    if (!(cellCm >= 100)) throw new RangeError(`FeatureIndex: the cell is ≥ 1 m, got ${String(cellCm)}`);
    this.cellCm = cellCm;
  }

  private cell(v: number): number {
    return Math.floor(quot(v, this.cellCm, 'length', 'feature cell'));
  }

  /** Adds a feature; its index. */
  add(f: Feature): number {
    const i = this.features.length;
    this.features.push(f);
    const x0 = this.cell(Math.min(f.a.x, f.b.x));
    const x1 = this.cell(Math.max(f.a.x, f.b.x));
    const y0 = this.cell(Math.min(f.a.y, f.b.y));
    const y1 = this.cell(Math.max(f.a.y, f.b.y));
    for (let cy = y0; cy <= y1; cy += 1) {
      for (let cx = x0; cx <= x1; cx += 1) {
        const k = `${String(cx)},${String(cy)}`;
        const l = this.buckets.get(k);
        if (l === undefined) this.buckets.set(k, [i]);
        else l.push(i);
      }
    }
    return i;
  }

  /** The features whose bounding boxes meet [x0, x1] × [y0, y1], ascending. */
  near(x0: number, y0: number, x1: number, y1: number): number[] {
    const seen = new Set<number>();
    for (let cy = this.cell(y0); cy <= this.cell(y1); cy += 1) {
      for (let cx = this.cell(x0); cx <= this.cell(x1); cx += 1) {
        for (const i of this.buckets.get(`${String(cx)},${String(cy)}`) ?? []) {
          const f = this.features[i];
          if (Math.max(f.a.x, f.b.x) < x0 || Math.min(f.a.x, f.b.x) > x1 || Math.max(f.a.y, f.b.y) < y0 || Math.min(f.a.y, f.b.y) > y1) continue;
          seen.add(i);
        }
      }
    }
    return [...seen].sort((p, q) => p - q);
  }
}

// ---- the crossing matrix ---------------------------------------------------------------------------------------------------

/** What a proposal does on meeting a way (§4.4: stop in a T, cross with a materialised crossroads, or deflect). */
export type CrossingAction = 'T' | 'cross' | 'deflect';

/** A preset's crossing matrix: proposal class × crossed class (and the step's straightness) → the action. */
export interface CrossingMatrix {
  readonly preset: 'organic';
  /** `turnRad`: the step's turn from the proposal's previous heading (its collinearity), radians, unsigned. */
  act(proposal: WayClass, crossed: WayClass, turnRad: number): CrossingAction;
}

/** The street classes in rank order, coarsest first (§2.4); a class outside the list ranks with `lane`. */
const RANK: Readonly<Record<string, number>> = Object.freeze({ through: 5, primary: 4, secondary: 3, lane: 2, cul_de_sac: 2, alley: 1, track: 1, path: 0 });

/** A class's rank (higher: coarser). */
export function classRankOf(c: WayClass): number {
  return RANK[c] ?? 2;
}

/**
 * The preset's crossing matrix (§4.4 S5c; the matrix read from regimes.json's `crossing.<preset>` row): `organic`
 * crosses only a lower-or-equal class collinear within the row's `collinearCdeg` (6°) — the rare crossroads (O4 b) —
 * and stops in a T at everything else (T-preference); the `ringed` and `american` matrices are M1's (§4b).
 */
export function crossingMatrix(preset: string, collinearCdeg = 600): CrossingMatrix {
  if (preset === 'ringed' || preset === 'american') throw new RangeError(`notBuilt('M1'): the ${preset} crossing matrix (§4.4; §4b — the presets ringed and american are M1's)`);
  if (preset !== 'organic') throw new RangeError(`crossingMatrix: no crossing matrix for the preset '${preset}'`);
  if (!(collinearCdeg >= 0 && collinearCdeg < 9_000)) throw new RangeError(`crossingMatrix: collinearity is an angle in [0°, 90°), got ${String(collinearCdeg)} cdeg`);
  const limit = collinearCdeg * 0.00017453292519943296;
  return Object.freeze({
    preset: 'organic' as const,
    act(proposal: WayClass, crossed: WayClass, turnRad: number): CrossingAction {
      return classRankOf(crossed) <= classRankOf(proposal) && Math.abs(turnRad) <= limit ? 'cross' : 'T';
    },
  });
}

// ---- the rules and the verdict ------------------------------------------------------------------------------------------

/** The legality rules of one stage's growth. */
export interface LegalityRules {
  /** The clearance of a proposal of class c: max(minimum block depth, separation ÷ 2) + half its corridor (cm). */
  readonly clearanceCm: (c: WayClass) => number;
  /** The snap reach as a share of the step (0.35). */
  readonly snapShare: number;
  /** Destination bias on, and its reach in step lengths (≈ 1.5). */
  readonly bias: boolean;
  readonly biasSteps: number;
  /** The least angle of a junction, an ending and a parallel run (30°), radians. */
  readonly legalAngle: number;
  readonly matrix: CrossingMatrix;
  /** The class's minimum radius (cm): the curvature limit within which a meeting is bent square (§4.3's Y → T). */
  readonly minRadiusCm: (c: WayClass) => number;
}

/** How an accepted step ends its proposal (null: the proposal goes on). */
export type EndKind = 'T' | 'snap' | 'band' | 'shore' | 'reservation' | 'boundary';

/** Why a step was rejected. */
export type RejectWhy = 'parallel' | 'angle' | 'short' | 'degenerate';

/** The proposal at the step being judged (`legal`'s first argument). */
export interface StepCandidate {
  /** The proposal's id (its street) and its class. */
  readonly street: number;
  readonly class: WayClass;
  /** The step's start, heading (radians) and length (cm). */
  readonly at: XY;
  readonly heading: number;
  readonly stepCm: number;
  /** The step's turn from the proposal's previous heading (radians): the crossing matrix's collinearity. */
  readonly turn: number;
  /** The steps the proposal has laid (its own last two segments are not features to it). */
  readonly steps: number;
}

/** A crossing a step makes on its way (an X junction). */
export interface StepCrossing {
  readonly way: Id;
  readonly at: LatticePoint;
}

/** An accepted step. */
export interface Accepted {
  readonly verdict: 'accept';
  /** The point reached (on the lattice). */
  readonly to: LatticePoint;
  /** The step's heading as taken (after bias or deflection). */
  readonly heading: number;
  readonly ends: EndKind | null;
  /** The way met where the step ends in a T (or the junction snapped to). */
  readonly meets: Id | null;
  readonly crossings: readonly StepCrossing[];
  readonly deflected: boolean;
  readonly biased: boolean;
  /** How a T or a snap was reached: the bias, a meeting along the step, a near miss joined at its foot, a snap. */
  readonly via: 'bias' | 'hit' | 'nearMiss' | 'snap' | null;
  /** The step leaves an unwalled stage's boundary (provisional: the trim cuts it back). */
  readonly provisional: boolean;
}

/** A rejected step. */
export interface Rejected {
  readonly verdict: 'reject';
  readonly why: RejectWhy;
  readonly deflected: boolean;
}

export type Verdict = Accepted | Rejected;

/** What `legal` reads: the features and the junctions standing, and the rules. */
export interface LegalityContext {
  readonly index: FeatureIndex;
  /** The junction vertices a step may snap to. */
  readonly junctions: readonly { readonly id: Id; readonly at: XY }[];
  readonly rules: LegalityRules;
}

// ---- geometry ------------------------------------------------------------------------------------------------------------

function sub(a: XY, b: XY): XY {
  return { x: a.x - b.x, y: a.y - b.y };
}

/** The unsigned angle between the lines of two vectors, in [0, π/2] (dmath.atan2 of |cross| over |dot|). */
export function lineAngle(u: XY, v: XY): number {
  const cross = Math.abs(u.x * v.y - u.y * v.x);
  const dot = Math.abs(u.x * v.x + u.y * v.y);
  if (cross === 0 && dot === 0) return 0;
  return dmath.atan2(cross, dot);
}

/** The squared distance between the segments ab and cd. */
function segSegD2(a: XY, b: XY, c: XY, d: XY): number {
  if (crossParams(a, b, c, d) !== null) return 0;
  return Math.min(footOn(a, c, d).d2, footOn(b, c, d).d2, footOn(c, a, b).d2, footOn(d, a, b).d2);
}

/** A feature that is no obstacle to this step: it holds the step's start, or it is one of the proposal's own last two segments. */
function ignored(f: Feature, c: StepCandidate): boolean {
  if (f.street === c.street && f.step !== undefined && f.step >= c.steps - 2) return true;
  return footOn(c.at, f.a, f.b).d2 < 1;
}

/** The heading turned the least way to `legal + 1°` off the feature's line, away from the side it lies on (null: on it). */
function deflectFrom(f: Feature, at: XY, heading: number, legalAngle: number): number | null {
  const dx = f.b.x - f.a.x;
  const dy = f.b.y - f.a.y;
  const side = dx * (at.y - f.a.y) - dy * (at.x - f.a.x);
  if (side === 0 || (dx === 0 && dy === 0)) return null;
  const s = side > 0 ? 1 : -1;
  const tf = dmath.atan2(dy, dx);
  const alpha = legalAngle + 0.017453292519943295;
  const cands = [wrapAngle(tf + s * alpha), wrapAngle(tf + PI - s * alpha)];
  const d0 = Math.abs(wrapAngle(cands[0] - heading));
  const d1 = Math.abs(wrapAngle(cands[1] - heading));
  return d1 < d0 ? cands[1] : cands[0];
}

/** Does the segment pq cross the line of f strictly (p and q on opposite sides)? */
function strictlyAcross(p: XY, q: XY, f: Feature): boolean {
  const s = (r: XY): number => Math.sign((f.b.x - f.a.x) * (r.y - f.a.y) - (f.b.y - f.a.y) * (r.x - f.a.x));
  return s(p) * s(q) < 0;
}

/**
 * The lattice point for a meeting at `pt` on feature f: its rounding, or — where the rounding falls across f's line from
 * the step's start — the nearest of its eight neighbours that does not (on the line or short of it), so the step never
 * passes what it ends at.
 */
function nearSide(at: XY, pt: XY, f: Feature): LatticePoint {
  const r = lat(pt);
  if (!strictlyAcross(at, r, f)) return r;
  let best: LatticePoint = r;
  let bestD = Infinity;
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      const q = lat({ x: r.x + dx, y: r.y + dy });
      if (strictlyAcross(at, q, f)) continue;
      const d = (q.x - pt.x) * (q.x - pt.x) + (q.y - pt.y) * (q.y - pt.y);
      if (d < bestD) {
        bestD = d;
        best = q;
      }
    }
  }
  return best;
}

/** Every way segment within twice the attraction distance of a meeting point is met at ≥ the legal angle (its arms there). */
function armsSquare(index: FeatureIndex, pt: XY, step: XY, legalAngle: number, skip: (f: Feature) => boolean): boolean {
  const r = 52;
  for (const i of index.near(pt.x - r, pt.y - r, pt.x + r, pt.y + r)) {
    const f = index.features[i];
    if (f.kind !== 'way' || skip(f)) continue;
    if (footOn(pt, f.a, f.b).d2 > r * r) continue;
    if (lineAngle(step, sub(f.b, f.a)) < legalAngle) return false;
  }
  return true;
}

/**
 * §4.3's Y → T conversion for a meeting with f: the perpendicular foot of the step's start on f — inside f, ahead, within
 * `reach`, the turn from the step's heading within the class's curvature limit (turn ≤ step ÷ minimum radius) and met
 * square by every arm there — or null.
 */
function squareFoot(f: Feature, at: XY, dir: XY, L: number, reach: number, maxTurn: number, legalAngle: number, index: FeatureIndex, skip: (g: Feature) => boolean): { at: XY; i: number } | null {
  // The met way's segments within reach (the meeting may lie at a corner of it, its square foot on a neighbour).
  let best: { at: XY; i: number } | null = null;
  let bestD2 = reach * reach;
  for (const i of index.near(at.x - reach, at.y - reach, at.x + reach, at.y + reach)) {
    const g = index.features[i];
    if (g.kind !== 'way' || g.way !== f.way || skip(g)) continue;
    const foot = footOn(at, g.a, g.b);
    if (foot.t <= 0 || foot.t >= 1 || foot.d2 < 1 || !(foot.d2 < bestD2)) continue;
    const v = sub(foot.at, at);
    if (v.x * dir.x + v.y * dir.y <= 0) continue;
    const turn = dmath.atan2(Math.abs(dir.x * v.y - dir.y * v.x), dir.x * v.x + dir.y * v.y);
    if (turn > maxTurn || !(L > 0)) continue;
    if (!armsSquare(index, foot.at, v, legalAngle, skip)) continue;
    best = { at: foot.at, i };
    bestD2 = foot.d2;
  }
  return best;
}

/** Does the segment ab cross a feature other than `except` (short of b)? */
function blocked(index: FeatureIndex, a: XY, b: XY, except: number, skip: (g: Feature) => boolean): boolean {
  const len = Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  for (const i of index.near(Math.min(a.x, b.x) - 1, Math.min(a.y, b.y) - 1, Math.max(a.x, b.x) + 1, Math.max(a.y, b.y) + 1)) {
    if (i === except || skip(index.features[i])) continue;
    const x = crossParams(a, b, index.features[i].a, index.features[i].b);
    if (x !== null && x.t < 1 - 1e-9 && x.t * len >= 1) return true;
  }
  return false;
}

interface Attempt {
  readonly v: Verdict;
  /** The feature an illegal step met or ran beside (its deflection's reference). */
  readonly against: Feature | null;
}

function reject(why: RejectWhy, deflected: boolean, against: Feature | null): Attempt {
  return { v: { verdict: 'reject', why, deflected }, against };
}

/** One judgement of the step at `heading` (see the module comment); `deflected` marks the second. */
function attempt(c: StepCandidate, heading: number, ctx: LegalityContext, deflected: boolean): Attempt {
  const r = ctx.rules;
  const L = c.stepCm;
  const dir = { x: dmath.cos(heading), y: dmath.sin(heading) };
  const maxTurn = quot(L, r.minRadiusCm(c.class), 'length', 'curvature limit');
  const skipOf = (g: Feature): boolean => ignored(g, c);
  const at = c.at;
  let q: XY = { x: at.x + dir.x * L, y: at.y + dir.y * L };
  let h = heading;
  const F = ctx.index.features;

  // Destination bias: the nearest spine point ahead within reach, met at ≥ the legal angle (never on a first step).
  let biased = false;
  let biasWay: Id | null = null;
  if (r.bias && c.steps > 0) {
    const reach = r.biasSteps * L;
    let best = -1;
    let bestD2 = reach * reach;
    let bestAt: XY = q;
    for (const i of ctx.index.near(at.x - reach, at.y - reach, at.x + reach, at.y + reach)) {
      const f = F[i];
      if (f.kind !== 'way' || f.street === c.street || ignored(f, c)) continue;
      const foot = footOn(at, f.a, f.b);
      // The spine's own perpendicular foot (T-preference, §4.3's Y → T): never a corner or a tip of it.
      if (!(foot.d2 < bestD2) || foot.d2 < 1 || foot.t <= 0 || foot.t >= 1) continue;
      const v = sub(foot.at, at);
      if (v.x * dir.x + v.y * dir.y <= 0) continue;
      if (lineAngle(v, sub(f.b, f.a)) < r.legalAngle || !armsSquare(ctx.index, foot.at, v, r.legalAngle, (g) => ignored(g, c))) continue;
      best = i;
      bestD2 = foot.d2;
      bestAt = foot.at;
    }
    if (best >= 0) {
      q = bestAt;
      h = dmath.atan2(q.y - at.y, q.x - at.x);
      biased = true;
      biasWay = F[best].way ?? null;
    }
  }

  // A junction within the snap reach of the step's end.
  let snapped: { id: Id; at: XY } | null = null;
  if (!biased) {
    const reach = r.snapShare * L;
    let bestD2 = reach * reach;
    for (const j of ctx.junctions) {
      const d2 = (j.at.x - q.x) * (j.at.x - q.x) + (j.at.y - q.y) * (j.at.y - q.y);
      const v = sub(j.at, at);
      // Ahead of the step (no hook back), and met at ≥ the legal angle by every arm standing there.
      if (!(d2 < bestD2) || v.x * v.x + v.y * v.y < 1 || v.x * dir.x + v.y * dir.y <= 0) continue;
      let square = true;
      for (const i of ctx.index.near(j.at.x - 1, j.at.y - 1, j.at.x + 1, j.at.y + 1)) if (F[i].street === c.street && footOn(j.at, F[i].a, F[i].b).d2 < 1) square = false;
      for (const i of ctx.index.near(j.at.x - 1, j.at.y - 1, j.at.x + 1, j.at.y + 1)) {
        const f = F[i];
        if (f.kind === 'way' && footOn(j.at, f.a, f.b).d2 < 1 && lineAngle(v, sub(f.b, f.a)) < r.legalAngle) square = false;
      }
      if (!square) continue;
      bestD2 = d2;
      snapped = j;
    }
    if (snapped !== null) {
      q = snapped.at;
      h = dmath.atan2(q.y - at.y, q.x - at.x);
    }
  }

  // Along the step: the features met, in order.
  const seg = sub(q, at);
  // The step leaves its start at ≥ the legal angle to every other way standing there (a street another one ended on).
  for (const i of ctx.index.near(at.x - 1, at.y - 1, at.x + 1, at.y + 1)) {
    const f = F[i];
    if (f.kind !== 'way' || f.street === c.street || footOn(at, f.a, f.b).d2 >= 1) continue;
    if (lineAngle(seg, sub(f.b, f.a)) < r.legalAngle) return reject('angle', deflected, f);
  }
  const hits: { t: number; i: number }[] = [];
  for (const i of ctx.index.near(Math.min(at.x, q.x) - 1, Math.min(at.y, q.y) - 1, Math.max(at.x, q.x) + 1, Math.max(at.y, q.y) + 1)) {
    const f = F[i];
    if (ignored(f, c)) continue;
    const x = crossParams(at, q, f.a, f.b);
    if (x === null || x.t * Math.sqrt(seg.x * seg.x + seg.y * seg.y) < 1) continue;
    hits.push({ t: x.t, i });
  }
  hits.sort((p, s) => p.t - s.t || p.i - s.i);
  const crossings: StepCrossing[] = [];
  let ends: EndKind | null = null;
  let meets: Id | null = null;
  let to: XY = q;
  let provisional = false;
  let metFeature = -1;
  let via: Accepted['via'] = null;
  for (const hit of hits) {
    const f = F[hit.i];
    const pt = { x: at.x + hit.t * seg.x, y: at.y + hit.t * seg.y };
    const angle = lineAngle(seg, sub(f.b, f.a));
    if (f.kind === 'band') {
      ends = 'band';
      to = pt;
      metFeature = hit.i;
      break;
    }
    if (f.kind === 'shore' || f.kind === 'reservation') {
      if (angle < r.legalAngle) return reject('angle', deflected, f);
      ends = f.kind;
      to = pt;
      metFeature = hit.i;
      break;
    }
    if (f.kind === 'boundary') {
      // An unwalled stage's boundary: the step runs on beyond it, provisional, and the proposal ends there.
      if (angle < r.legalAngle) return reject('angle', deflected, f);
      ends = 'boundary';
      provisional = true;
      to = q;
      metFeature = hit.i;
      break;
    }
    // Its own street: a street never meets itself (a linear role forms a simple chain, §3.10).
    if (f.street === c.street) return reject('angle', deflected, f);
    // A way: met at ≥ the legal angle by the segment hit and by every arm of a way standing at the meeting.
    if (angle < r.legalAngle || !armsSquare(ctx.index, pt, seg, r.legalAngle, (g) => ignored(g, c))) return reject('angle', deflected, f);
    const act = r.matrix.act(c.class, f.cls ?? 'secondary', c.turn + wrapAngle(h - heading));
    if (act === 'cross' && !biased && hit.t < 1 && !crossings.some((x) => x.way === f.way)) {
      crossings.push({ way: f.way ?? '', at: lat(pt) });
      continue;
    }
    if (act === 'deflect') return reject('angle', deflected, f);
    ends = 'T';
    via = biased ? 'bias' : 'hit';
    meets = f.way ?? null;
    to = pt;
    metFeature = hit.i;
    if (!biased) {
      // §4.3's Y → T: the meeting bent square within the class's curvature limit.
      const sq = squareFoot(f, at, dir, L, L, maxTurn, r.legalAngle, ctx.index, skipOf);
      if (sq !== null && !blocked(ctx.index, at, sq.at, sq.i, skipOf)) {
        to = sq.at;
        metFeature = sq.i;
        h = dmath.atan2(sq.at.y - at.y, sq.at.x - at.x);
      }
    }
    break;
  }
  if (ends === null && biased) {
    ends = 'T';
    via = 'bias';
    meets = biasWay;
  }
  if (ends === null && snapped !== null) {
    ends = 'snap';
    via = 'snap';
    meets = snapped.id;
  }
  // A near miss: a way within the snap reach of the end is joined at its foot (no crossing on the way there).
  if (ends === null) {
    const reach = r.snapShare * L;
    let best = -1;
    let bestD2 = reach * reach;
    let bestAt: XY = q;
    for (const i of ctx.index.near(q.x - reach, q.y - reach, q.x + reach, q.y + reach)) {
      const f = F[i];
      if (f.kind !== 'way' || f.street === c.street || ignored(f, c) || crossings.some((x) => x.way === f.way)) continue;
      const foot = footOn(q, f.a, f.b);
      if (!(foot.d2 < bestD2)) continue;
      // Ahead of the step's start (no hook back).
      if ((foot.at.x - at.x) * dir.x + (foot.at.y - at.y) * dir.y <= 0) continue;
      best = i;
      bestD2 = foot.d2;
      bestAt = foot.at;
    }
    if (best >= 0) {
      const f = F[best];
      const sq = squareFoot(f, at, dir, L, L + reach, maxTurn, r.legalAngle, ctx.index, skipOf);
      if (sq !== null) {
        bestAt = sq.at;
        best = sq.i;
      }
      const v = sub(bestAt, at);
      const vv = v.x * v.x + v.y * v.y;
      let clear = vv >= 1 && lineAngle(v, sub(f.b, f.a)) >= r.legalAngle && armsSquare(ctx.index, bestAt, v, r.legalAngle, (g) => ignored(g, c));
      if (clear) {
        for (const i of ctx.index.near(Math.min(at.x, bestAt.x) - 1, Math.min(at.y, bestAt.y) - 1, Math.max(at.x, bestAt.x) + 1, Math.max(at.y, bestAt.y) + 1)) {
          if (i === best || ignored(F[i], c)) continue;
          const x = crossParams(at, bestAt, F[i].a, F[i].b);
          if (x !== null && x.t < 1 - 1e-9 && x.t * Math.sqrt(vv) >= 1) {
            clear = false;
            break;
          }
        }
      }
      if (clear) {
        ends = 'T';
        via = 'nearMiss';
        meets = f.way ?? null;
        to = bestAt;
        h = dmath.atan2(v.y, v.x);
        metFeature = best;
      }
    }
  }
  const toL = metFeature >= 0 && ends !== 'boundary' ? nearSide(at, to, F[metFeature]) : lat(to);
  const step = sub(toL, at);
  if (step.x * step.x + step.y * step.y < 1) return reject('short', deflected, null);

  // Clearance: no run within the clearance of a feature and within the legal angle of parallel.
  const D = r.clearanceCm(c.class);
  const met = metFeature >= 0 ? F[metFeature] : null;
  for (const i of ctx.index.near(Math.min(at.x, toL.x) - D, Math.min(at.y, toL.y) - D, Math.max(at.x, toL.x) + D, Math.max(at.y, toL.y) + D)) {
    const f = F[i];
    // The proposal's own street is no spine it runs beside (its curl back is met as a crossing, above).
    if (ignored(f, c) || i === metFeature || f.street === c.street) continue;
    // The way the step ends on, the ways it crosses and the boundary it leaves are met, not run beside.
    if (met !== null && f.kind === met.kind && f.kind !== 'way' && f.kind !== 'band') continue;
    if (f.kind === 'way' && f.way !== undefined && (f.way === meets || crossings.some((x) => x.way === f.way))) continue;
    if (f.kind === 'band' && met !== null && met.kind === 'band' && footOn(toL, f.a, f.b).d2 < 1) continue;
    if (snapped !== null && footOn(snapped.at, f.a, f.b).d2 < 1) continue;
    if (lineAngle(step, sub(f.b, f.a)) >= r.legalAngle) continue;
    if (segSegD2(at, toL, f.a, f.b) < D * D) return reject('parallel', deflected, f);
  }
  return {
    v: { verdict: 'accept', to: toL, heading: h, ends, meets, crossings, deflected, biased, via, provisional },
    against: null,
  };
}

/**
 * `legal(proposal, context)` (§4.4 S5c *Legality*; see the module comment): the candidate step judged against the
 * features standing; an illegal step deflected once, the least way to 31° off what it met or ran beside, and judged
 * again; still illegal, rejected. A first step (`steps` 0) is never deflected, and a deflection turning more than the
 * legal angle is a rejection (C-0258 (2), (3)).
 */
export function legal(proposal: StepCandidate, context: LegalityContext): Verdict {
  if (!(proposal.stepCm > 0 && Number.isFinite(proposal.stepCm))) return { verdict: 'reject', why: 'degenerate', deflected: false };
  const first = attempt(proposal, proposal.heading, context, false);
  if (first.v.verdict === 'accept' || first.against === null || proposal.steps === 0) return first.v;
  const h2 = deflectFrom(first.against, proposal.at, proposal.heading, context.rules.legalAngle);
  if (h2 === null) return first.v;
  // A deflection turns the street at most the legal angle; one that needs more is a rejection (§4.4: "deflected or
  // rejected"; C-0258 (3)) — so a street's course never takes a turn its heading walk would not (the growth-drift row).
  if (Math.abs(wrapAngle(h2 - proposal.heading)) > context.rules.legalAngle) return first.v;
  return attempt({ ...proposal, turn: proposal.turn + wrapAngle(h2 - proposal.heading) }, h2, context, true).v;
}
