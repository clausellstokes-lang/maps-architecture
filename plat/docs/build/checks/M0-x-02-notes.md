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

## The closing check's notes for session fix round S2 (lane `check/M0-x-02-close-s2`, 2026-10-11)

None of these fails the round. Each is a KI row for the hardening pass, or a finding routed to the session. The evidence
is in `checks/M0-x-02-s2.md`. Mutants and probes ran only in the seat's scratch mirror
`waves/check-M0-x-02/m1` (cloud scratchpad).

10. **KI — the guard does not judge batch-scope soft rows (C-0316 (3) declares this).**
    * A stage may declare a batch-scope soft row and never report it. Its line then reads `pass: true, count: 0`, the
      Q32 shape. `rows.test.ts` pins that it is accepted (`fx.softBatch`, count 0). Mutant K18, which adds batch-soft
      rows to the guard, is killed by that pin.
    * No M0 stage declares such a row. The base walker's classification test (`rows-base.test.ts`) bars one from the
      base table: walker mutant W4, which adds a batch-soft row to the base S5, is KILLED.
    * **Hardening:** at a stage's end, require at least one evaluation of each batch-scope soft row when the stage
      committed at least one batch through the door. **Milestone:** M4.
11. **Session finding (M0-b-03 / M0-x-04, Q15's note) — S8's `block-floor` (batch, hard) reads `count: 0` on every base
    run, and the walker does not witness its evaluator.**
    * The probe ran 12 base runs (flat and river, seeds 1 – 6, 900 ha, 30 ha walled). Each shows
      `S8[block-floor=true/0, …]`. S8's batches go straight to `kernel.tx` (`infill/bentCutFabric.ts:1285`,
      `expect: [BLOCK_FLOOR_ROW]`), so the runner's batch door never counts them.
    * `runBase` injects no `env.floors`. The kernel's `classFloor` expect entry is therefore skipped
      (`kernel/src/tx/tx.ts:399 – 400`, `floor === undefined → continue`). The floor is enforced by S8's own check
      (`bentCutFabric.ts:671 – 680`, the OBB minor width against `run.floor.minWidthCm`), so the run fails safe, but the
      report line is a count-0 pass.
    * The walker accepts any batch-scope hard row as "evaluated by `expect`". It asserts `count ≥ 1` for stage-end
      rows only.
    * **Suggested handling:** route S8's batches through `ctx.batch`, or inject the class floors (M0-x-04 / M0-b-03).
      Then extend the walker to require `count ≥ 1` for each batch-scope hard row of every base stage whose arena
      version moved. **Milestone:** before M0 closes, or M4.
12. **KI — mutant K19 survives: no test pins that a guard-refused stage's own result warnings are dropped.**
    * Under K19, `builder.kernelWarnings(r.warnings)` also runs on the guard's refusal branch. The fixture's stage
      returns no warnings, so nothing can see the difference.
    * The code drops them, as for a refusing run, which has no result warnings. C-0316 (2) lists the refusal's effects
      but does not name warnings.
    * **Hardening test:** a fixture stage returns `ok({ land: 1 }, [warning])` without reporting its row; assert that
      `report.kernel.warnings` does not hold the warning. **Milestone:** M4.
13. **KI — a stage that returns ok having produced nothing is not judged (C-0316 (4)'s declared exemption).**
    * The exemption is meant for missing inputs. It also covers a stage whose `inputsOf` returned an input, which ran
      and returned `ok({})` without committing. Such a stage's declared stage-end rows read `pass: true, count: 0`.
      This is a contrived-writer escape: no M0 stage does it, since S1 and S8 report on every ok path that reaches
      their end (`site/src/water/stage.ts:173`, `infill/stage.ts:144`).
    * **Hardening:** judge every stage whose `inputsOf` returned non-null, keeping the skip for a null input only.
      Then check that no lawful base run is refused. **Milestone:** M4.
14. **Session finding (a lawful-input refusal, J264) — the base river fixture at seed 2 refuses S5 `E_INVARIANT`.**
    * The run is `RIVER_BLUEPRINT`, `areaHa` 900, `walledHa` 30, seed 2. The refusal reads "water: the crossing from
      41082,-4616 to 49156,-1003 has no clear chord between its two bank pins (its chord would leave the water); a water
      gate's wet side is t…".
    * The refusal is the same with the guard off and on, and the reports and roots are identical. It is not this
      item's. C-0316 (7b) reports it too. The seat's grep of `docs/M0-FIX-QUEUE.md` for "no clear chord" found no
      queue row.
    * **Suggested handling:** a queue row for the S5 water-crossing owner (M0-c-02's water gates), with this seed.

## Consolidation round C1's notes (lane `build/M0-x-02-consolidate-1`, 2026-10-12; layout-plan.md R2, J260, J263 Q8)

**Old → new test-file map (J263 Q8): the identity.** No file of `test/pipeline/core/` was renamed, merged or split, and
no describe or it title changed (layout-plan.md §3: "one support module already — nothing to merge"):

| old file | new file | what changed |
|---|---|---|
| `test/pipeline/core/order.test.ts` | the same | nothing |
| `test/pipeline/core/registry.test.ts` | the same | nothing |
| `test/pipeline/core/runner.test.ts` | the same | nothing |
| `test/pipeline/core/rows.test.ts` | the same | the header comment only (the guard's rule, C-0316 (1)–(5); no round or queue narration) |
| `test/pipeline/core/rows-base.test.ts` | the same | the header comment only (C-0316 (6)) |
| `test/pipeline/core/support.ts` | the same | nothing (`bits`, `contentPrint`, `drawn`, `liveFaces` kept) |

Every earlier mutant the round re-ran is killed by the same files: P06 (name order, both "no sort" and "reversed
`compareKeys`") by runner.test.ts 'carries what the stages write through the sink, in order, and the kernel's warnings by
code' and 'every declared row and counter appears, unevaluated, on a stage that ran no batch'; P02, U01 by runner.test.ts;
K01, K06, K08, K10, K13, K14, K15, K17 by rows.test.ts; K16 survives, equivalent, as recorded in `checks/M0-x-02-s2.md`.

15. **KI — the sink's undeclared-row refusal is pinned by a pattern only (round C1's mutant R5 survives).**
    * `runner.test.ts:238` asserts `toThrow(/declares no invariant/)`. Dropping the sink's pointer
      ` (§4.12's StageDecl.invariants)` from the text (now `rowOf`'s `why` argument) passes all 73 tests.
    * The text is unchanged by round C1: the mirror probe of the four refusal texts (the sink's undeclared and
      batch-hard rows, `evaluate` and `neverEvaluated` on an undeclared row) is byte-equal before and after.
    * **Hardening test:** pin the exact text `report: stage S1 declares no invariant 'fx.none' (§4.12's
      StageDecl.invariants)`. **Milestone:** M4.
16. **Two describe titles keep "Q32" (a title is an oracle's name, layout-plan.md §3).**
    * `rows.test.ts:64` '… was evaluated (Q32)' and `rows-base.test.ts:29` '… without an evaluator (Q32 walker)'. A
      grep for `Q32` over the owns prints these two titles and nothing else; every comment of the owns now cites the
      rule (C-0316 (1)–(6); §5.3, §5.4).
17. **Observation for the session (J264) — note 14's refusal is no longer met in this tree.** The base river fixture at
    `areaHa` 900, `walledHa` 30, seeds 1 – 3, and the flat fixture at the same seeds, ran with `bugs []` and
    `model.refusals` empty, before and after round C1 (the mirror probe, 2026-10-12).

## Closing check of consolidation round C1's notes (lane `check/M0-x-02-consolidate-close-1`, 2026-10-12)

None of these fails the round (J302 Q12, J273: a consolidation round's closing check notes a survivor it meets and
adds no pin). The evidence is in `checks/M0-x-02-c1.md`; the mirrors were `waves/check-M0-x-02/{m0,m1,mx}` in the
session's cloud scratchpad.

18. **KI — the kernel block's name order is unpinned (the checker's mutant R04 survives).**
    * Under R04, `finish()` writes `kernel.warnings` as `Object.fromEntries(this.kernelCodes)` (insertion order) and
      NEAR stays 73/73: `runner.test.ts:529` compares `report.kernel` with `toEqual`, which ignores key order. Only the
      stage entry's `warnings` order is pinned (`Object.keys` at `runner.test.ts:521`); P06's two forms (no sort,
      reversed) are killed there because `sortedRecord` is shared.
    * The code holds the order: the checker's probe PW (21 codes in 6 insertion orders, through the sink and a stage
      result's warnings) gives `kernel.warnings` keys in `compareKeys` order, byte-equal before and after round C1.
    * **Hardening test:** in that test, assert `Object.keys(report.kernel.warnings)` is `['W_ATTRACTED', 'W_DOWNGRADE']`
      (the stage reports them in the other order). **Milestone:** M4.
19. **KI — an integer-like name escapes the name order of a report record.** `sortedRecord` inserts keys in
    `compareKeys` order into a plain object, but JavaScript enumerates integer-like keys first, in numeric order: probe
    PW's codes `'1'`, `'9'`, `'10'` read `1, 9, 10` in `Object.keys` and in the JSON, where `compareKeys` gives
    `1, 10, 9`. The order is still one order for every insertion order (deterministic; the probe's six insertion orders
    agree) and it is the same before and after round C1. No M0 code or counter is integer-like (`W_…`, `fixture.ops`,
    the stages' dotted counters); a contrived-writer case. **Suggested handling:** refuse an integer-like warning code or
    counter name at the sink and at registration, or say in `report.ts`'s header that the records follow JavaScript's
    key order. **Milestone:** M4.
20. **KI — the undeclared-row refusal texts of `ReportBuilder.evaluate` and `neverEvaluated` are unpinned (the checker's
    mutant R09 survives: the sink's pointer ` (§4.12's StageDecl.invariants)` on all three `rowOf` sites passes 73/73).**
    Both are reachable only by a direct `ReportBuilder` call: the runner passes them declared names only, and the
    registry refuses a stage whose rows repeat a name (`registry.ts:206`), so `rowOf`'s `find` and a `findLast` are
    equivalent on every registered stage (the checker's R06, equivalent). With no git, the checker's before-image of
    these texts is a reconstruction from the plan (PLAUSIBLE, not CONFIRMED). **Hardening test:** with note 15, pin the
    three texts exactly. **Milestone:** M4.
21. **Comment tightening (not a mismatch) — `report.ts:14–16`.** "A declared stage-end row the stage never reported is
    such a refusal … the row's line reads pass false with count 0 — the one line a never-evaluated row can show" is the
    plan's binding wording (layout-plan.md §1.1.3) and C-0316 (2)'s phrase. It leaves out C-0316 (4)'s scope, which
    `runner.ts:14–18` states: only a stage that reached its end (ok, and it produced) is judged; a stage on missing
    inputs and a stage refused by its own run keep their unreported stage-end rows at pass true, count 0 (`rows.test.ts`
    its 6 and 8, and the same header's first bullet). **Suggested handling:** add "of a stage that reached its end
    (C-0316 (4))" at the file's next comment pass. **Milestone:** M4 (or the item's next round).
22. **Session note — a choices id collision ahead (C-0104).** `bench/test/fusion/drift.test.ts` (M0-c-06's folder;
    uncommitted work in the tree) cites "C-0331 (3)" and "C-0331 (3), (4)" for its S8 ≡ S9 boundary tests, while
    C-0331 in `choices.md` is M0-x-02's consolidation row (2026-10-12). The row that test means is not in `choices.md`
    yet; its writer renumbers on append (the id rule; the checker renumbers nothing).
