# M0-x-02: minor notes for the hardening milestone M4 (check/M0-x-02, 2026-10-06)

Under J180 and N-45 none of these notes fails the item. Each one is a KI row for the hardening pass. The evidence is in
`checks/M0-x-02.md` §5 and §6. The probes live in `~/maps-scratch/waves/check-M0-x-02/m0` (mirror only).

1. **KI — a callback stage's batch accepts `ops: []` beside its callback (mutant U18 survives).**
   * The code refuses it: `runner.ts:263` checks `spec.ops !== undefined`. No test covers that case.
   * Under the mutant, an empty ops list beside a callback commits the callback's batch. No op is added, so the effect
     is equivalent.
   * **Hardening test:** assert that `batch({ …, ops: [] }, fn)` throws "callback form" in a callback stage.
2. **KI — `bind`'s refusal of a second key for one address has no test (mutant U22 survives; probe PB CONFIRMS that the
   code refuses).**
   * The refusal is stated in C-0224 (6). It guards a contrived input: an entity minted under another derivation's seed
     key.
   * **Hardening test:** PB's shape. Bind `m`, then bind `{ ...m, entityKey: <one word flipped> }`, and expect "bound
     to another entity key".
3. **KI — the `census` run option is not under test (mutant U23 survives; probe PC CONFIRMS that the option reaches
   every stage Rng).**
   * C-0224 (6) states the pass-through, and M0-d-09's distinctness harness reads it.
   * **Hardening test:** run the drawn set with a `KeyCensus` and assert that its size is at least the number of
     stream requests. M0-d-09's own census test will exercise it too.
4. **KI — only the first failing hard row of a batch is reported.**
   * When one batch fails two batch-scope hard rows, the report shows the first with `pass: false` and the second with
     **`pass: true`** (probe PG: `fx.a` false, `fx.b` true).
   * **Why:** the kernel's refusal names only its first problem (`tx.ts`'s `problems[0]`), and the runner reads that
     one detail prefix.
   * **Effect:** it fails safely. The batch is refused and the report is a derived cache outside every digest. But the
     report's line for the second row claims a pass that did not happen.
   * **Suggestion:** for a refused batch, record the rows other than the named one as "not evaluated" (no count). An
     alternative is for the kernel to return every failed expect entry.
5. **KI — a batch refused before its expectations ran counts them as passing evaluations (probe PH).**
   * An `E_WORK_LIMIT` or op refusal still adds one passing evaluation to each batch-scope hard row's `count`.
   * **Suggestion:** count an evaluation only when the batch committed, or when the refusal is an expect code.
6. **KI — `RunOptions.arenas` does not say that the arenas must carry their spatial index (probe PE).**
   * An arena made by `createPlat` without `attachIndex` makes the first batch throw the kernel's "tx: a transaction
     needs the arena's spatial index (attachIndex)".
   * This is a clear, loud precondition, not a silent fault.
   * **Suggestion:** state it in the option's doc comment, or have the runner refuse an unindexed arena up front by
     name.
7. **KI — the sink does not enforce two §5.4 rules.**
   * §5.4 records stream keys "only for ladder uses (any rung from tier 2 up …)". `ReportSink.ladderUse` accepts any
     tier, including 0 and 1.
   * `ReportSink.warning` accepts a kernel code (`W_*` of §3.1) into the stage's own `warnings`. §5.4 keeps those
     apart from `kernel.warnings`.
   * Both are writer discipline. The stages land later (M0-c-…, M0-e-…), and M0-x-05's coverage report could flag
     either case.
   * **Suggestion:** refuse `tier < 2` in `ladderUse` and a §3.1 code in `warning`.
8. **KI — listed test 6 compares S6 and S8 by their draws, not their digests.**
   * The listed test 6 says "the other stages' digests equal the run without it". The model digest is cumulative, so
     the roots after S5 cannot be equal. The test compares the roots of S1, S3 and S4 and the draws of S6 and S8, which
     is a fair reading.
   * **Stricter test:** also compare the faces S6 and S8 create (for example, their chains' vertex positions read
     through `observe`), so a fixture change cannot make them depend on S5 unnoticed.

## The closing check's note (lane `check/M0-x-02-close-r1`, 2026-10-06)

This row comes from the closing check of M0-x-02 (verdict PASS, at the top of `checks/M0-x-02.md`). Under J162, J169
and J202 it is not a blocker: the code is CONFIRMED correct and the row is a further hardening test. It is deliberately
deferred: documented here, not a bug for a later seat to find again.

9. **KI — B-1's test fixes n < r, so a `max(n, r)` rewrite passes it (mutant V04 survives; probes PD2 and PD3 CONFIRM
   the code).**
   * The test "under rerolls { S5: n } a bound entity keeps its own Identity.reroll r ≠ n …" uses n = 3, r = 4. Mutant
     V04 (`Math.max(rerolls.get(id) ?? 0, keyOf(entity).reroll)` for a bound entity) gives 4 there and survives the 58
     tests. It is a deliberate-writer escape, not a plausible slip.
   * The item's code gives `[2, 7]` for r = 2 under `{ S5: 7 }` (PD2) and `[0, 1]` for r = 0 under `{ S5: 1 }` (PD3),
     each with the bound stream equal to the fresh stream at reroll r. Both probes fail under V04.
   * **Hardening test:** add a case with n > r (for example r = 0 under `{ S5: 1 }`, the common case of an unrerolled
     entity in a rerolled stage) to the same test. **Milestone:** M4, or sooner if M0-d-09's re-derivation pairs touch
     the runner.
