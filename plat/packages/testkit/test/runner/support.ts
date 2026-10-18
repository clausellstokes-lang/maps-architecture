// Test support for M0-k-04's runner tests: a lattice point, and the draw count of the constructive runs here (the
// bar's own run is the bench's `fuzz-bar` at the tier's draws; these tests run each M0 case on its first draws).
import type { LatticePoint } from '@plat/kernel';

/** A lattice point. */
export function lp(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

/** Draws per M0 case in the constructive test (a swept case runs its first draws of the sweep). */
export const CASE_DRAWS = 4;

/** The slowest case's draws (the editing session of hundreds of batches, ≈ 30 s a draw CONTENDED). */
export const HEAVY_DRAWS = 2;
