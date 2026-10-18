// Junction rules (M0-c-03; §4.3: "Junction rules: minimum crossing angle 30° (else deflect); Y → T conversion where
// the acute arm can be bent within its class curvature limit (G-P5)"). They run on the simplified chains, before
// Chaikin, at every node where three or more chains meet. Readings C-0236 (8):
// * an arm is a chain leaving the junction, its direction that of its first segment;
// * Y → T, at a node of three arms: the two arms nearest opposite (≥ `THROUGH_MIN_CDEG` apart) are the through line,
//   the third the branch; a branch nearer than `ACUTE_MAX_CDEG` to a through arm is acute, and is bent to leave
//   perpendicular to the through line — its first point moved there at the same distance (or, where that point is an
//   end or held, a point inserted at half its distance, at most one lattice spacing) — when the bend at that point
//   keeps the branch class's minimum radius and its two new segments cross nothing; else it stays a Y, reported;
// * deflection: two angularly adjacent arms closer than `ways.json` `graph/minCrossingCdeg` — the arm of the lower
//   class (the later chain on a tie) is turned away to the minimum plus `DEFLECT_MARGIN_CDEG`, by the same move,
//   when that keeps it the minimum from its other neighbour and crosses nothing; else reported.
import { dmath, type LatticePoint } from '@plat/kernel';
import { CDEG_PER_RAD, PI, quot, segmentsMeet } from '../siting/geom.js';
import { classRank } from './classify.js';
import { belowRadiusAt, type Simplified } from './smooth.js';
import type { ArterialGraph, ChainClass, JunctionRule } from './types.js';

/** A branch nearer than this to a through arm is acute (cdeg). */
export const ACUTE_MAX_CDEG = 7_500;
/** Two arms at least this far apart form a through line (cdeg). */
export const THROUGH_MIN_CDEG = 15_000;
/** A deflected arm is turned to the minimum crossing angle plus this (cdeg): rounding to whole cm keeps it above. */
export const DEFLECT_MARGIN_CDEG = 100;

interface V {
  x: number;
  y: number;
}

/** The bearing of a direction as an angle in cdeg, counter-clockwise from +x, in [0, 36 000). */
export function directionCdeg(d: V): number {
  let a = dmath.atan2(d.y, d.x) * CDEG_PER_RAD;
  if (a < 0) a += 36_000;
  if (a >= 36_000) a -= 36_000;
  return a;
}

/** The unsigned angle between two directions (cdeg, [0, 18 000]). */
export function angleBetweenCdeg(u: V, v: V): number {
  const cross = u.x * v.y - u.y * v.x;
  const dot = u.x * v.x + u.y * v.y;
  return Math.abs(dmath.atan2(cross, dot)) * CDEG_PER_RAD;
}

/** One arm at a junction: the chain, whether it leaves from its first point, its points from the junction outward. */
export interface Arm {
  readonly chain: number;
  readonly fromStart: boolean;
  readonly pts: LatticePoint[];
  readonly dir: V;
}

/** The arms at graph node `v` over the chains' current polylines (a chain looping back to `v` is left out). */
export function armsAt(g: ArterialGraph, polys: readonly Simplified[], v: number): Arm[] {
  const arms: Arm[] = [];
  for (const c of g.chains) {
    const a = c.nodes[0];
    const b = c.nodes[c.nodes.length - 1];
    if (a === b) continue;
    if (a !== v && b !== v) continue;
    const fromStart = a === v;
    const pts = fromStart ? polys[c.index].points.slice() : polys[c.index].points.slice().reverse();
    if (pts.length < 2) continue;
    arms.push({ chain: c.index, fromStart, pts, dir: { x: pts[1].x - pts[0].x, y: pts[1].y - pts[0].y } });
  }
  return arms;
}

/** The junction nodes: three or more chains meet there. */
export function junctionNodes(g: ArterialGraph): number[] {
  const deg = new Map<number, number>();
  for (const c of g.chains) {
    const a = c.nodes[0];
    const b = c.nodes[c.nodes.length - 1];
    if (a === b) continue;
    deg.set(a, (deg.get(a) ?? 0) + 1);
    deg.set(b, (deg.get(b) ?? 0) + 1);
  }
  const out: number[] = [];
  for (const [v, d] of deg) if (d >= 3) out.push(v);
  return out.sort((x, y) => x - y);
}

/** The options of the junction rules. */
export interface JunctionRuleOptions {
  readonly minCrossingCdeg: number;
  readonly spacingCm: number;
  /** Per chain, its class's minimum radius (cm). */
  readonly radiusCm: (chain: number) => number;
  /** Segments no bent arm may meet (obstacle rings' sides), as [ax, ay, bx, by]. */
  readonly obstacles: readonly (readonly [number, number, number, number])[];
}

function len(d: V): number {
  return Math.sqrt(d.x * d.x + d.y * d.y);
}

/** Do the new segments J–P–next meet any other chain (but at J or next, where they may only not overlap) or an obstacle? */
function crosses(polys: readonly Simplified[], self: number, j: V, p: V, next: V, obstacles: JunctionRuleOptions['obstacles']): boolean {
  const same = (u: V, w: V): boolean => u.x === w.x && u.y === w.y;
  const segs: [V, V][] = [
    [j, p],
    [p, next],
  ];
  for (const [a, b] of segs) {
    for (const o of obstacles) if (segmentsMeet(a, b, { x: o[0], y: o[1] }, { x: o[2], y: o[3] })) return true;
    for (let c = 0; c < polys.length; c += 1) {
      if (c === self) continue;
      const q = polys[c].points;
      for (let i = 0; i + 1 < q.length; i += 1) {
        const s0 = q[i];
        const s1 = q[i + 1];
        // A segment sharing an end (J or next) with the new one meets it there only, unless the two overlap.
        let shared: V | null = null;
        for (const e of [j, next]) if ((same(s0, e) || same(s1, e)) && (same(a, e) || same(b, e))) shared = e;
        if (shared !== null) {
          const e = shared;
          const mine = same(a, e) ? b : a;
          const theirs = same(s0, e) ? s1 : s0;
          if (angleBetweenCdeg({ x: mine.x - e.x, y: mine.y - e.y }, { x: theirs.x - e.x, y: theirs.y - e.y }) <= 1) return true;
          continue;
        }
        if (segmentsMeet(a, b, s0, s1)) return true;
      }
    }
  }
  return false;
}

/**
 * Turns `arm` to leave J along the unit direction `u`: its first point moved (same distance) or, where that point is an
 * anchor or the arm's end, a point inserted at half its distance (≤ one spacing). Applied to `polys` when the bend at
 * the new point keeps `radius` (when `keepRadius`) and nothing is crossed; returns whether it was.
 */
function bend(polys: Simplified[], arm: Arm, u: V, opts: JunctionRuleOptions, keepRadius: boolean): boolean {
  const s = polys[arm.chain];
  const pts = arm.pts;
  const j = pts[0];
  const firstIdx = arm.fromStart ? 1 : s.points.length - 2;
  const insert = pts.length === 2 || s.anchor[firstIdx];
  const d = len({ x: pts[1].x - j.x, y: pts[1].y - j.y });
  const l = insert ? Math.min(d * 0.5, opts.spacingCm) : d;
  const p = { x: Math.round(j.x + u.x * l), y: Math.round(j.y + u.y * l) } as LatticePoint;
  const next = insert ? pts[1] : pts.length > 2 ? pts[2] : pts[1];
  if (keepRadius && belowRadiusAt(j, p, next, opts.radiusCm(arm.chain))) return false;
  if (crosses(polys, arm.chain, j, p, next, opts.obstacles)) return false;
  if (insert) {
    s.points.splice(arm.fromStart ? 1 : s.points.length - 1, 0, p);
    s.anchor.splice(arm.fromStart ? 1 : s.anchor.length - 1, 0, false);
  } else {
    s.points[firstIdx] = p;
  }
  return true;
}

function unit(d: V): V {
  const l = len(d);
  return { x: quot(d.x, l, 'length', 'arm direction'), y: quot(d.y, l, 'length', 'arm direction') };
}

function rotate(d: V, cdeg: number): V {
  const t = cdeg * (PI / 18_000);
  const c = dmath.cos(t);
  const s = dmath.sin(t);
  return { x: d.x * c - d.y * s, y: d.x * s + d.y * c };
}

/** Y → T at node v (see the header). */
function yToT(g: ArterialGraph, polys: Simplified[], v: number, opts: JunctionRuleOptions): JunctionRule | null {
  const arms = armsAt(g, polys, v);
  if (arms.length !== 3) return null;
  let best = -1;
  let bi = 0;
  let bj = 1;
  for (let i = 0; i < 3; i += 1) {
    for (let j = i + 1; j < 3; j += 1) {
      const a = angleBetweenCdeg(arms[i].dir, arms[j].dir);
      if (a > best) {
        best = a;
        bi = i;
        bj = j;
      }
    }
  }
  if (best < THROUGH_MIN_CDEG) return null;
  const branch = arms[3 - bi - bj];
  const alpha = Math.min(angleBetweenCdeg(branch.dir, arms[bi].dir), angleBetweenCdeg(branch.dir, arms[bj].dir));
  if (alpha >= ACUTE_MAX_CDEG) return null;
  const ui = unit(arms[bi].dir);
  const uj = unit(arms[bj].dir);
  const t = unit({ x: ui.x - uj.x, y: ui.y - uj.y });
  const side = t.x * branch.dir.y - t.y * branch.dir.x >= 0 ? 1 : -1;
  const n = { x: -t.y * side, y: t.x * side };
  const applied = bend(polys, branch, n, opts, true);
  const after = applied ? Math.min(angleBetweenCdeg(n, arms[bi].dir), angleBetweenCdeg(n, arms[bj].dir)) : alpha;
  return { rule: 'y_to_t', at: g.nodes[v].at, chain: branch.chain, beforeCdeg: alpha, afterCdeg: after, applied };
}

/** The 30° rule at node v (see the header): every pair of adjacent arms at least the minimum apart, else deflected. */
function deflect(g: ArterialGraph, polys: Simplified[], classes: readonly ChainClass[], v: number, opts: JunctionRuleOptions): JunctionRule[] {
  const out: JunctionRule[] = [];
  for (let round = 0; round < 4; round += 1) {
    const arms = armsAt(g, polys, v).sort((a, b) => directionCdeg(a.dir) - directionCdeg(b.dir) || a.chain - b.chain);
    if (arms.length < 2) return out;
    let fixed = false;
    let moved = false;
    for (let i = 0; i < arms.length && !moved; i += 1) {
      const a = arms[i];
      const b = arms[(i + 1) % arms.length];
      const gap = angleBetweenCdeg(a.dir, b.dir);
      if (gap >= opts.minCrossingCdeg) continue;
      fixed = true;
      // The arm of the lower class moves (the later chain on a tie), away from the other.
      const ra = classRank(classes[a.chain].class);
      const rb = classRank(classes[b.chain].class);
      const mover = ra > rb || (ra === rb && a.chain > b.chain) ? a : b;
      const stay = mover === a ? b : a;
      const need = opts.minCrossingCdeg + DEFLECT_MARGIN_CDEG;
      // Rotate the mover's direction so it lies `need` from the stayer's, on its own side.
      const sideSign = stay.dir.x * mover.dir.y - stay.dir.y * mover.dir.x >= 0 ? 1 : -1;
      const u = rotate(unit(stay.dir), sideSign * need);
      const neighbour = arms[(arms.indexOf(mover) + (mover === a ? arms.length - 1 : 1)) % arms.length];
      const ok = neighbour === stay || angleBetweenCdeg(u, neighbour.dir) >= opts.minCrossingCdeg;
      const applied = ok && bend(polys, mover, u, opts, false);
      out.push({ rule: 'deflect', at: g.nodes[v].at, chain: mover.chain, beforeCdeg: gap, afterCdeg: applied ? angleBetweenCdeg(u, stay.dir) : gap, applied });
      if (!applied) return out;
      moved = true;
    }
    if (!fixed) return out;
  }
  return out;
}

/** §4.3's junction rules over the simplified chains, at every junction of three or more arms, in node order. */
export function junctionRules(g: ArterialGraph, polys: Simplified[], classes: readonly ChainClass[], opts: JunctionRuleOptions): JunctionRule[] {
  const out: JunctionRule[] = [];
  for (const v of junctionNodes(g)) {
    const y = yToT(g, polys, v, opts);
    if (y !== null) out.push(y);
    out.push(...deflect(g, polys, classes, v, opts));
  }
  return out;
}

/** The smallest angle between two adjacent arms at each junction of three or more arms (cdeg), by node. */
export function junctionAngles(g: ArterialGraph, polys: readonly Simplified[]): { node: number; minCdeg: number }[] {
  return junctionNodes(g).map((v) => {
    const arms = armsAt(g, polys, v).sort((a, b) => directionCdeg(a.dir) - directionCdeg(b.dir));
    let min = 18_000;
    for (let i = 0; i < arms.length; i += 1) min = Math.min(min, angleBetweenCdeg(arms[i].dir, arms[(i + 1) % arms.length].dir));
    return { node: v, minCdeg: min };
  });
}
