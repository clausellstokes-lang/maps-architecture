// The kernel's shared types (M0-a-01, C-0112): the invariant row a stage declares and `KernelTx.expect` reads (§5.3,
// §3.3), and the stream options the kernel's `Rng` reads (§14, §6.1). Types only; re-exported by @plat/model.

/** A row of §5.3's invariant suite as a stage declares it (`StageDecl.invariants`, `KernelTx.expect`). */
export interface Invariant {
  /** The row's name, as `GenerationReport.stages[].invariants` reports it (§5.4). */
  name: string;
  /** §5.3's five scopes: batch-local, stage-end, save, load, CI-only. */
  scope: 'batch' | 'stage' | 'save' | 'load' | 'ci';
  /** hard: aborts the batch; soft (a statistics band): goes to the report. */
  class: 'hard' | 'soft';
  /** classFloor: a face class's floor (E_BELOW_MIN_WIDTH / _AREA / _ANGLE); check: any other row (E_INVARIANT). */
  kind: 'classFloor' | 'check';
  /** kind classFloor: the face class whose floor it is. */
  faceClass?: string;
  /** kind check: the named predicate of the suite's row. */
  check?: string;
}

/** The packed components of a stream key beside its entity, stage and concern (§6.1, §14). */
export interface StreamOpts {
  /** The derivation unit's reroll (§6.1). */
  reroll: number;
  /** Ladder retry, ≤ the concern's registered cap (§6.1). */
  attempt: number;
  epoch: number;
  /** The concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns. */
  salt: number;
}
