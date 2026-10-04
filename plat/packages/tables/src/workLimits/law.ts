// count(unit, scope) and workLimitOf (§5.1 (5); §3.3 "Work limits instead of clocks"; §4.12's StageDecl.workLimits;
// M0-f-03a). A stage's batch limit is its law over the batch scope's committed counts — the scope's land area, frame
// cells, lattice nodes, faces or vertices, as the model holds them before the batch runs — and nothing else: no
// measurement, no clock, so the same inputs give the same limit, and the same rungs, on every machine. The arithmetic
// is @plat/model's `lawLimit` (M0-m-01): floor + perUnit × count, or floor + perUnit × ⌈log2(count)⌉; a fixed law's
// limit is its floor (C-0174 (2)). A kernel count reaches the limit when it is ≥ it (`E_WORK_LIMIT`, F-WORK).
import { lawLimit, type BatchScope, type WorkUnit } from '@plat/model';
import { CONTINUOUS_WORK_UNITS } from './counters.js';
import type { TableWorkLimitLaw } from './table.js';

/**
 * One batch scope's committed counts by unit (§5.1 (5)): values the model committed before the batch runs — S2's demand
 * and stage quotas, the `Allocation` records, the scope's land area, frame cells or lattice size — never a measurement.
 */
export type ScopeCounts = Readonly<Partial<Record<WorkUnit, number>>>;

/** A batch scope as text, for a refusal: `stage S8`, `district d12`, `block b3`, `edit e1`, `entity x`. */
export function scopeLabel(scope: BatchScope): string {
  switch (scope.kind) {
    case 'stage':
      return `stage ${scope.stage}`;
    case 'edit':
      return `edit ${String(scope.edit)}`;
    default:
      return `${scope.kind} ${String(scope.id)}`;
  }
}

/**
 * count(unit, scope) (§5.1 (5)): the scope's committed count of `unit`, read from `counts` alone. Refuses (RangeError) a
 * unit the scope has no committed count for, a count that is negative or not finite, and a fraction of a discrete unit
 * (only land hectares and module cells take fractions).
 */
export function countOf(unit: WorkUnit, scope: BatchScope, counts: ScopeCounts): number {
  const n = counts[unit];
  const at = `count(${unit}, ${scopeLabel(scope)})`;
  if (n === undefined) throw new RangeError(`${at}: the scope has no committed count of ${unit}`);
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`${at}: ${n} is not a count`);
  if (!CONTINUOUS_WORK_UNITS.has(unit) && !Number.isInteger(n)) throw new RangeError(`${at}: ${n} is not a whole number of ${unit}`);
  return n;
}

/**
 * The law's limit over the scope's committed counts (§5.1 (5)): `lawLimit(law, count(law.unit, scope))`; a fixed law
 * reads no count and gives its floor. The value a stage passes as `KernelTx.workLimit` (§3.3).
 */
export function workLimitOf(law: TableWorkLimitLaw, scope: BatchScope, counts: ScopeCounts): number {
  if (law.unit === 'fixed') {
    if (law.perUnit !== 0 || !Number.isFinite(law.floor) || law.floor < 0) {
      throw new RangeError(`workLimitOf: fixed law '${law.counter}' has floor ${law.floor}, perUnit ${law.perUnit}`);
    }
    return law.floor;
  }
  return lawLimit(law, countOf(law.unit, scope, counts));
}
