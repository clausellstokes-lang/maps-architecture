// Test support for the constructive set (M0-k-02): the draw count of the listed test ("10³ draws per case"), the
// snap-acceptance check every generated coordinate is held to, and the geometry argument names a step may carry.
import { snap, type LatticePoint } from '@plat/kernel';
import { constructiveCoords, type ConstructiveInput } from '@plat/testkit';

/** The listed test's draws per case: 10³, whatever PLAT_FUZZ_RUNS says (a generator's claim names its own size). */
export const DRAWS = 1000;

/** Whether p is an integer pair `snap` accepts and returns unchanged. */
export function snapAccepts(p: LatticePoint): boolean {
  if (!Number.isInteger(p.x) || !Number.isInteger(p.y)) return false;
  const s = snap(p.x, p.y);
  return s.ok && s.value.x === p.x && s.value.y === p.y && !Object.is(p.x, -0) && !Object.is(p.y, -0);
}

/** The first coordinate of an input `snap` does not accept unchanged, or null. */
export function firstRefused(input: ConstructiveInput): LatticePoint | null {
  for (const p of constructiveCoords(input)) if (!snapAccepts(p)) return p;
  return null;
}

/** Step arguments that name one geometry of the input, and the records they may name. */
export const GEOMETRY_ARGS: Readonly<Record<string, readonly ('points' | 'pointSets' | 'chains' | 'rings')[]>> = Object.freeze({
  chain: ['chains'],
  ring: ['rings'],
  face: ['rings'],
  cut: ['chains'],
  region: ['rings'],
  box: ['rings'],
  sites: ['pointSets'],
  a: ['rings', 'points'],
  b: ['rings', 'points'],
  c: ['points'],
  on: ['pointSets'],
  off: ['pointSets'],
  from: ['points'],
  to: ['points'],
  rings: ['rings'],
  chains: ['chains'],
  faces: ['rings'],
  gateEnds: ['pointSets'],
  around: ['points'],
});

/** Every geometry name a step names that the input lacks. */
export function unknownNames(input: ConstructiveInput): string[] {
  const out: string[] = [];
  for (const s of input.steps) {
    for (const [k, v] of Object.entries(s.args)) {
      const where = GEOMETRY_ARGS[k];
      if (where === undefined || typeof v !== 'string') continue;
      for (const name of v.split(',').filter((n) => n.length > 0)) {
        if (!where.some((w) => Object.hasOwn(input[w], name))) out.push(`${s.op}.${k} = ${name}`);
      }
    }
  }
  return out;
}
