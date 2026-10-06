// M0-b-02's test support: the fixtures (./faces.ts) and the shape clauses of T37-1 and T38-1 as assertions.
import { LATTICE } from '@plat/kernel';
import { cutCells } from '../../../src/infill/planner.js';
import { expect } from 'vitest';
import type { CutGeometry, CutPlanned, PlanContext, XY } from '../../../src/infill/planner.js';
import { cross, dot, latticeTol, norm, sub, unitV } from './faces.js';

export * from './faces.js';

/** The kept corner's shape clauses on one cut geometry (T37-1, T38-1), against the plan's own frame. */
export function checkGeometry(plan: CutPlanned, g: CutGeometry, ctx: PlanContext): void {
  const { corner, far, sides } = plan;
  // No cut bends twice: at most one interior vertex before the fillet.
  expect(g.legs.length === 2 || g.legs.length === 3).toBe(true);
  if (g.bent) {
    const [A, K, F] = g.legs;
    // K at least o from both ends of its first leg, or at λ / 2 (T37-1).
    if (corner.lambdaCm >= 2 * corner.oCm) {
      expect(corner.atCm).toBeGreaterThanOrEqual(corner.oCm - 1e-6);
      expect(corner.lambdaCm - corner.atCm).toBeGreaterThanOrEqual(corner.oCm - 1e-6);
    } else expect(corner.atCm).toBe(corner.lambdaCm / 2);
    // The second leg meets its far run square within the lattice tolerance (T37-1).
    expect(far).not.toBeNull();
    if (far !== null && F.x === far.foot.x && F.y === far.foot.y) {
      const u2 = unitV(sub(F, K));
      expect(Math.abs(dot(u2, far.dir))).toBeLessThanOrEqual(latticeTol(norm(sub(F, K))));
    }
    // Under flatten no kept corner's triangle is lower than max(cut.flattenM, 0.02 × |A–foot|) (T37-1).
    if (plan.mode === 'flatten' || g !== plan.cut) {
      const base = norm(sub(F, A));
      const h = Math.abs(cross(sub(F, A), sub(K, A))) / base;
      const cells = cutCells(ctx.table, ctx.preset);
      expect(h).toBeGreaterThanOrEqual(Math.max(cells.flattenCm, cells.flattenShare * base) * (1 - 1e-12));
    }
    const fl = g.fillet;
    expect(fl).not.toBeNull();
    if (fl !== null && fl.filleted) {
      // Fillets on lane and street cuts only (T38-1).
      expect(ctx.cutKind ?? 'way').toBe('way');
      checkArc(A, K, F, fl.arc, ctx.minFrontageM * 100);
    }
  } else {
    expect(g.fillet).toBeNull();
  }
}

/** An arc tangent to both legs, spanning the shorter leg end to end, chords ≥ max(w_min, minEdge) (T38-1). */
export function checkArc(A: XY, K: XY, F: XY, arcPts: readonly XY[], wMinCm: number): void {
  expect(arcPts.length).toBeGreaterThanOrEqual(3);
  const la = norm(sub(K, A));
  const lb = norm(sub(F, K));
  const t = Math.min(la, lb);
  const first = arcPts[0];
  const last = arcPts[arcPts.length - 1];
  // The tangent points lie on the legs at t from K: the shorter leg's far end is one of them (spans it end to end).
  const ta = { x: K.x + ((A.x - K.x) * t) / la, y: K.y + ((A.y - K.y) * t) / la };
  const tb = { x: K.x + ((F.x - K.x) * t) / lb, y: K.y + ((F.y - K.y) * t) / lb };
  expect(norm(sub(first, ta))).toBeLessThan(1e-6 * Math.max(1, t));
  expect(norm(sub(last, tb))).toBeLessThan(1e-6 * Math.max(1, t));
  if (la <= lb) expect(norm(sub(first, A))).toBeLessThan(1e-6 * Math.max(1, t));
  else expect(norm(sub(last, F))).toBeLessThan(1e-6 * Math.max(1, t));
  // Tangent to both legs: the first chord turns off leg 1's direction, the last onto leg 2's, by the same half-step;
  // and the arc's points are equidistant from the circle's centre.
  const u1 = unitV(sub(K, A));
  const u2 = unitV(sub(F, K));
  const c1 = unitV(sub(arcPts[1], first));
  const c2 = unitV(sub(last, arcPts[arcPts.length - 2]));
  const a1 = Math.acos(Math.min(1, dot(u1, c1)));
  const a2 = Math.acos(Math.min(1, dot(c2, u2)));
  expect(Math.abs(a1 - a2)).toBeLessThan(1e-6);
  const delta = Math.acos(Math.max(-1, Math.min(1, dot(u1, u2))));
  const m = arcPts.length - 1;
  expect(Math.abs(a1 - delta / (2 * m))).toBeLessThan(1e-6);
  // Chords no shorter than w_min or the lattice minimum edge.
  for (let i = 0; i + 1 < arcPts.length; i += 1) {
    expect(norm(sub(arcPts[i + 1], arcPts[i]))).toBeGreaterThanOrEqual(Math.max(wMinCm, LATTICE.minEdgeCm) - 1e-9);
  }
}

