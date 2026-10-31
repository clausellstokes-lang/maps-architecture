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

## Hardening round S3 (lane `build/M0-x-02-fix-s3`, 2026-10-30; the M0 hardening phase, J237 (2); inventory rows M0-x-02:6 1 … :187 21; Q99 per RL8, J637)

The builder's row-by-row outcome. Every pin was shown red on its mutant in the lane's scratch mirror
(`/home/user/maps-scratch/waves/selfcheck-build-M0-x-02-fix-s3`, deleted at the end) with
`vitest run --maxWorkers=1 --bail=1 test/pipeline/core/`, each mutated file restored by copy from the tree and
compared (`cmp`) before the next: **21 targeted mutants, 21 KILLED** (G13a and G13b killed the pins of row 13's
first build, which RELATED then showed to break M0-x-05's harness: the row is REPORTED, note 25, and its code reverted);
the other 19 re-run on the final sources: **19 / 19 KILLED**, every file restored. A mutant marked *(pre-round)* is the round's
own pre-fix code, so its pin is red without the fix. The choices row is C-0454.

| row | outcome | what changed | pin (file › test) | mutant(s) |
|---|---|---|---|---|
| 1 (:6) U18 | PINNED | nothing in code (`runner.ts` already refused) | runner.test.ts › "a callback stage's batch that hands an empty ops list beside its callback is refused …" — the text verbatim, the callback never called | U18 `spec.ops !== undefined` → `ops.length > 0`: KILLED |
| 2 (:11) U22 | PINNED | nothing in code | runner.test.ts › "bind gives a minted entity a handle …" — PB's shape (word 3 flipped), the text `run: <id> is bound to another entity key (C-0147: one key per minted entity)` verbatim, the handle keeps its first key | U22 refusal dropped: KILLED |
| 3 (:17) U23 | PINNED | nothing in code | runner.test.ts › "every stream a stage requests is recorded in the census …" — the drawn set: size 6, reused 0, collisions 0; a second run reuses 6; another seed adds 6 | U23 `createRng({})`: KILLED |
| 4 (:22) | FIXED + PINNED | `runner.ts` `expectVerdicts`: on a failed expect entry (an expect code whose detail opens with a row's `<name>: `) the rows before the named one held (the kernel's `failures` run in entry order, `tx.ts` `failures`/`failed[0]`), the named one failed, the rows after it are **not evaluated** (no count) — the note's first suggestion; the kernel's "return every failed expect" alternative is M0-a-06's API, not taken | runner.test.ts › "a batch refused by a failed expect entry reports what it tells …" (a, b, c, d: b and c fail → `[a true 1] [b false 1] [c true 0] [d true 0]`) | V4a *(pre-round: every other row a pass)*: KILLED; V4b (rows before uncounted): KILLED |
| 5 (:31) | FIXED + PINNED | the same function: a batch counts its rows only when it committed a record (`record !== null`: the kernel ran the expectations) or was refused by a failed expect entry; a batch that wrote nothing, or was refused by the work limit, an op, the callback or a kernel row, counts none | runner.test.ts › "a batch refused before its expectations ran — by the work limit, by its callback — or that wrote nothing counts no evaluation; a commit counts one per row" | V5a *(pre-round: a record-less commit counts)*: KILLED; V5b *(pre-round: any refusal counts passes)*: KILLED |
| 6 (:34) | FIXED + PINNED | `RunOptions.arenas`' doc states the precondition, and `run` refuses an unindexed arena by name before the first stage: `run: the arena ground/1 carries no spatial index: every arena of a run is indexed (attachIndex) before it runs (§3.3)` (before, the kernel's anonymous assertion fired at the first batch or stage end; only a zero-stage run with such an arena succeeded, and now refuses) | runner.test.ts › "refuses an arena without its spatial index by name, before any stage runs …" (no stage called; a zero-stage registry too) | A6 *(pre-round)*: KILLED |
| 7 (:40) | ladderUse half FIXED + PINNED; warning half **REPORTED** (note 23) | `ReportSink.ladderUse` refuses a tier outside 2 … 6: `report: stage S4's ladder use (F-ROUTE, rung 1) is at tier 1: §5.4 records ladder uses from tier 2 up` (every M0 writer — the river report forwarded by `base.ts` `forwardRiverReport` — writes tiers 2, 3, 4) | runner.test.ts › "refuses a ladder use below tier 2 …" (tiers 0, 1 refused verbatim; 2 recorded) | T7a *(pre-round)*: KILLED; T7b (`>= 1`): KILLED |
| 8 (:48) | PINNED | nothing in code | runner.test.ts › "rerolls { S5: 1 } changes only the S5 stage streams' draws …" now also compares the edges S6's and S8's chains laid (`district:a`, `way:lane`: end points, levels, rows via `contentPrint`) with and without the reroll, and shows S5's own chain moving | F8 (fixture: S6's bound offset by S5's first draw, S6's own draws unchanged): KILLED |
| 9 (:61) V04 | PINNED | nothing in code | runner.test.ts › "under rerolls { S5: n } a bound entity whose own reroll r is below n keeps r too: r = 0 under { S5: 1 } …" (PD3's shape: `[entity, town]` = `[0, 1]`, the bound stream = the fresh stream at reroll 0) | V04 `Math.max(n, r)`: KILLED |
| 10 (:78) | FIXED + PINNED (refines C-0316 (3)) | `ReportBuilder.unevaluated(s, committed)`: once a batch of the stage committed a record through the batch door, a declared batch-scope soft row with no evaluation is required at the stage's end like a stage-end row (refused `E_INVARIANT`, `row <name> declared but never evaluated`) | rows.test.ts › "a batch-scope soft row is required once a batch committed through the door …" and the batched case of "batch, save, load and CI rows are not stage-end rows …" (now reporting `fx.softBatch` once, count 1) | G10a *(pre-round)*: KILLED; G10b (required with no door commit): KILLED |
| 12 (:100) K19 | PINNED | nothing in code | rows.test.ts › "a stage the guard refuses keeps none of its result's warnings …" (`W_ACUTE_CORNER` ×2 on the result: `kernel.warnings` `{}` refused, `{ W_ACUTE_CORNER: 2 }` honest) | K19: KILLED |
| 13 (:107) | **REPORTED** (note 25); the recorded rule pinned | built first (the guard judging every stage whose `inputsOf` gave an input), then reverted: RELATED@1000 showed it refusing M0-x-05's base chain, whose stages after the cut run `ok({})` on their inputs (`testkit/src/ladders/chain.ts:261`) — `rungs-growth.test.ts` ×3 and `coverage.test.ts` red with `bugs: 1` (S8's seam-portals row), a rise in x-05's families' refusals; the exemption is that item's contract (C-0316 (4)) | rows.test.ts › "a stage given an input that returns ok having produced nothing is not judged (C-0316 (4), as recorded) …" (and a producing stage on a missing input is judged); the missing-inputs tests give a null input (`missing: true`; runner.test.ts's "… on a stage that ran no batch (on missing inputs)") | G13a/G13b killed the first build's pins; none on the recorded rule (it is the pre-round code) |
| 15 (:142, with 20) | PINNED | nothing in code | runner.test.ts › "the undeclared-row refusals of the builder name the stage and the row, verbatim" (`evaluate`, `neverEvaluated`: `report: stage S1 declares no invariant 'fx.none'`; the sink: `… (§4.12's StageDecl.invariants)`), and the sink text verbatim in "expect is the stage's batch-scope hard rows …" | R5 (sink pointer dropped): KILLED; R09 (pointer on every site): KILLED |
| 18 (:163) R04 | PINNED | nothing in code | runner.test.ts › "carries what the stages write through the sink, in order, …": `Object.keys(report.kernel.warnings)` = `['W_ATTRACTED', 'W_DOWNGRADE']` (S3's result gives W_DOWNGRADE first) | R04 (`Object.fromEntries`, insertion order): KILLED |
| 19 (:172) | TEXT (the session's ruling: the header sentence rides row 21) + an order pin | `report.ts` header: the records enumerate in JavaScript's key order — integer-like names first, numerically, then `compareKeys` order; one order for every insertion order; no M0 code or counter is integer-like | runner.test.ts › "the report's records enumerate in JavaScript's key order …" (`W_B, 10, W_A, 9, 1` and its reverse → `1, 9, 10, W_A, W_B`) | none (the order is the language's; the pin documents it) |
| 21 (:187) | TEXT | `report.ts` header: "of a stage that reached its end (C-0316 (4): its run returned ok and it produced something …)"; `runner.ts` header and the guard's comment state the rows it now requires (row 10) and C-0316 (4)'s kept scope (row 13) | — | — |
| Q99 (RL8) | FIXED + PINNED (runner.ts only; a DECLARED shift in M0-x-04's composition pin, note 26) | `run`'s default view is the registered one, `tableView(TABLE_IDS, [s6Table()])` (`s6Table` from `../districts/table.js`, the same package), and `RunOptions.tables` says so; a view handed in is the one every stage reads | runner.test.ts › "the stages read one registered tables view: by default M0's tables and layout's own s6 (Q99), else the view the run is given" (`ctx.tables.table('s6')` is `s6Table()`, the hash is the registered view's and not the bare view's; a bare view handed in carries no s6 — the stage's read throws `TableError`) | Q99 *(pre-round: `tableView()`)*: KILLED |

**Census and shift (J264, N-58).** (The census below ran on the round's first build, row 13 included; the final
sources differ from it only by row 13's revert, which restores the pre-round guard scope, and the base runs refused
nothing under either.) Base flat and river fixtures, seeds 1 – 6, `areaHa` 900, `walledHa` 30, the
pre-round sources (the mirror as copied before the round's edits) against the round's: 12 runs **byte-equal** —
reports, final roots, stage roots, ranks and `model.refusals` (JSON of each run compared with `cmp`); refusals
**0 → 0**, `bugs []` on every run. No base stage declares a batch-scope soft row, routes a batch-scope hard row through
the door (S8's `block-floor` goes straight to `kernel.tx`, Q39), returns ok on an input without reporting its
stage-end rows, writes a ladder use below tier 2, or hands in an unindexed arena; so the round moves no base output and
no digest or golden is re-recorded. The fixture families of `test/pipeline/core/` refuse only where a test plants a
refusal (every drawn run asserts `bugs []`). The behaviour changes are declared in C-0454: the guard's batch-soft rows
(row 10), the batch-hard rows' counts (rows 4, 5), the up-front arena refusal (row 6), the tier refusal (row 7),
the default tables view (Q99, a different `TableView.hash`; no source under `packages/*/src` reads a view's hash).

**API.** `pipeline/index.ts` and the barrel are untouched; `expectVerdicts` is private to `runner.ts`; no export added,
removed or renamed. Every existing message text is unchanged; the new texts are pinned verbatim.

**Gates (W = 1 throughout; `tools/test_budget.py` printed 1 before every run).** `install --frozen-lockfile` 0;
`lint` 0 (eslint 1 266 files, 0 errors; `lint: probe-red ok`); `build` 0; NEAR `test/pipeline/core/` 5 files 86 / 86;
RELATED@1000 over `runner.ts` and `report.ts`, run twice: on the first build 253 files 3 213 / 3 221 (8 reds), on the
final sources 253 files **3 217 / 3 221, exit 1, 4 reds**, each attributed: (a) `layout/test/pipeline/base/run.test.ts`
'S3's site is the flat fixture's …' — Q99's declared shift (note 26; the mirror's probe shows the S3 site equal to
`flatFixture`'s once the `tables` view is set aside); (b) `testkit/test/edge/repins.test.ts` 'EP-01/S1/self-touching at
seed 2651453823' and 'EP-01/S5a/coincident at seed 1658509524' and (c) `testkit/test/edge/ep01-s1-s3-s4.test.ts`
'EP-01/S1/self-touching' (seed 2893352673 refused on a seed the pin does not name) — foreign (M0-x-06's pins: Q106, and
M0-e-03 S3's declared shift routed as Q113), red identically in the mirror on the round's functional before-image (the
round's code reversals of A6, Q99, V4a/V5, G10a and T7a) and on the final sources, `PLAT_FUZZ_SEED=-1693803832`, 1 000
runs. The first build's four other reds — `testkit/test/ladders/rungs-growth.test.ts` ×3 and `coverage.test.ts` — were
row 13's (note 25) and are green on the final sources (and on the before-image).

23. **REPORTED for a session ruling (row 7's second half) — `ReportSink.warning` takes §3.1 kernel codes, and a landed
    stage and a landed pin depend on it.** S8 forwards its run's warning list through the sink
    (`layout/src/infill/bentCutFabric.ts:1684`, M0-b-03), and that list carries `W_CUT_SLID` (`:1510`, `:1529`), a §3.1
    code (`kernel/src/num/result.ts` `WarningCode`). `testkit/test/ladders/rungs-s8.test.ts:146 – 148` (M0-x-05) pins it
    under `stages[S8].warnings` and under no other stage, citing §5.4 ("the warning reaches the generation report
    through the stage's sink, under S8"); `testkit/src/ladders/readers.ts` `reportWarnings` reads it there. §5.4 says
    "Every kernel warning (`W_CUT_SLID` among them, F-CUT's foot slide) is counted under `kernel.warnings` by its §3.1
    code". Refusing a §3.1 code in `warning` would throw on S8's lawful runs (a throw on valid input, N-45 (a)); routing
    it to `kernel.warnings` at the sink would move M0-x-05's pin — either is a contract between items, so the round
    leaves the sink as it is. **Needs:** the session's reading of §5.4 for `W_CUT_SLID`; then, if `kernel.warnings`, one
    round per owner (M0-b-03: S8 returns the code in its result's warnings instead of the sink; M0-x-05: the pin and
    reader; M0-x-02: the sink refuses a §3.1 code, its text pinned).
24. **REPORTED for the co-owners of Q99 (RL8's per-owner lines) — the base run's S6 does not read the run's view.**
    With the runner's default registered, the base S6 still builds its own: `base.ts` `baseS6Input` (`:629`) hands S6
    no `tables`, so `districts/stage.ts:253` takes `input.tables ?? tableView()` and `s6TableIn` falls back to
    `s6Table()` — the same cells, so no output moves, but not "the registered view through the context". The lines:
    M0-x-04 S2 — `baseS6Input` passes `tables: ctx.tables`, and `baseArena`'s default `tableView()` (`base.ts:958`,
    reached from `runBase` `:976` with `options.tables` undefined) takes the registered view or the run's; M0-e-04 S4 —
    `s6Batch`'s default (`districts/stage.ts:253`) and `districtCells`' (`districts/table.ts:112`); M0-c-01 S4 —
    `fixtures/flat.ts:43`. None of them is needed for the runner's line to hold (the runner's pin reads `ctx.tables`).
25. **REPORTED for a session ruling (row 13) — the guard cannot judge an idle stage with an input without refusing
    M0-x-05's harness.** The row's fix (judge every stage whose `inputsOf` returned non-null) was built and pinned
    (mutants G13a, G13b killed), and RELATED@1000 over `runner.ts` then went red in `testkit/test/ladders/rungs-growth.test.ts`
    ('plain/chain …', 'work/grower …', 'work/fields …': `bugs: 1`) and `coverage.test.ts` ('S6 fields F-WORK work_cut'
    bugs 1): `runChain` (`testkit/src/ladders/chain.ts:255 – 262`, M0-x-05) keeps the stages after its cut registered with
    `run: () => ok({})` and their own `inputsOf` and `invariants`, so S8 (its `seam-portals` stage-end row) returned ok on
    an input, reported nothing and was refused — a refusal of a lawful harness run, so the census of x-05's families
    would rise (J264). The exemption is C-0316 (4)'s, on which that harness rests, so the round reverted the code and
    pins the recorded rule. **Needs:** a ruling — keep C-0316 (4) (the escape is a contrived writer's, no M0 stage takes
    it: S1 and S8 report on every ok path that reaches their end), or judge idle stages with an input and have M0-x-05's
    chain cut stages without their rows or inputs (x-05's round).
26. **DECLARED shift for the co-owners of Q99 — M0-x-04's composition pin.** With the runner's default view registered,
    the base S3 site carries it (`base.ts` `baseSite` hands `ctx.tables` to `flatFixture`, which keeps it as
    `site.tables`), while `test/pipeline/base/run.test.ts:202 – 211` (M0-x-04) compares that site with
    `flatFixture(1, …)` built on `fixtures/flat.ts:43`'s bare default: `canonicalText(restA)` ≠ `canonicalText(restB)`,
    the difference the view (its hash and the `s6` table) alone — the site's terrain, frame, land and draws are equal,
    and the base reports, roots and refusals are byte-equal (the census). The pin goes green when M0-c-01 S4 gives
    `flatFixture` the registered default (RL8's c-01 line) or M0-x-04 S2 hands the test's fixture the run's view. The
    line is RL8's per-owner split arriving in two rounds; no file outside this item's owns was edited.

## Closing check of hardening round S3's notes (lane `check/M0-x-02-close-s3`, 2026-10-31)

None of these fails the round (J162, J202, N-45: each is a further hardening test, a contrived-writer escape or a session
note). The evidence is in `checks/M0-x-02-s3.md`; the mirrors were `waves/check-M0-x-02/{m0,m1}` (`m0` the seat's own
functional before-image, `m1` a copy of the tree after the builder's LANDED line).

27. **KI — two of the round's new rules hold on every honest input but are not pinned at their edge (the checker's
    mutants C04d and C10c survive NEAR, 86 / 86).**
    * C04d drops the `EXPECT_CODES.has(r.code)` gate of `expectVerdicts`, so any refusal whose detail opens with
      `<row>: ` names that row. Probe P1 (a callback refusal with a non-expect code and the detail `fx.a: …`): the code
      counts no row (`fx.a`, `fx.b` count 0); under C04d `fx.a` reads pass false. Only a writer that forges a row's
      name as its own detail's prefix meets it: the kernel's non-expect details open with their own text (`tx.ts`
      `workDetail`, the repairer's "the repair of a face …", the kernel rows).
    * C10c counts an ok batch that wrote nothing (`record === null`) as a door commit for row 10's batch-soft rule.
      Probe P2 (a stage whose only door batch wrote nothing, a batch-soft row, an output written): the code does not ask
      for the row; under C10c the stage is refused `E_INVARIANT`. No M0 stage declares a batch-scope soft row (note 10).
    * **Hardening tests:** P1's and P2's shapes in `runner.test.ts` / `rows.test.ts`. **Milestone:** M4.
    * Judged equivalent (no test needed): C04e (`findLastIndex` for `findIndex`: two names can both open one detail
      only if a name holds `': '`, and the registry refuses repeated names), C05c (`E_WORK_LIMIT` added to the expect
      codes: its detail never opens with a row name), C10d (batch-hard rows added to the guard: a door commit evaluates
      every batch-hard row, probe P2b `fx.a` count 1).
28. **KI — a `classFloor` expect row with no floor injected reads as held (probe P4: pass true, count 1).** C-0454 (1)
    counts one passing evaluation per `expect` row for a batch that committed a record ("the kernel evaluated them all
    at commit"), but the kernel skips a `classFloor` entry whose class has no floor in `env.floors`
    (`kernel/src/tx/tx.ts:389 – 390`, `floor === undefined → continue`). The count claims an evaluation that did not
    run. It fails safe (the report is outside every digest; the floor is S8's own check, note 11) and no base stage
    routes a `classFloor` row through the door (S8's batches go straight to `kernel.tx`, Q39). **Suggested handling:**
    count a `classFloor` row only when `options.env?.floors` gives its class a floor, with Q39's round (M0-b-03 / M0-x-04)
    or M4.
29. **Session note — the round leaves one red of its own in RELATED, the declared Q99 shift (note 26).**
    `layout/test/pipeline/base/run.test.ts:211` (M0-x-04's file; `runner.ts` lies on its import path) stays red until
    M0-c-01 S4 (`fixtures/flat.ts:43`) or M0-x-04 S2 (the test's fixture on the run's view) lands RL8's per-owner line;
    the seat's probe P3 shows the S3 site equal to `flatFixture`'s built on the registered view, and differing from the
    bare one in `tables` only. The other three RELATED reds (testkit `edge/repins.test.ts` EP-01/S1/self-touching
    2651453823 and EP-01/S5a/coincident 1658509524, `edge/ep01-s1-s3-s4.test.ts` EP-01/S1/self-touching 2893352673) are
    foreign: red identically on the seat's before-image and the tree copy (`PLAT_FUZZ_SEED=959355949`, 1 000 runs).
    The session's commit of this item should carry the run.test.ts red as declared, or wait for the c-01 / x-04 line.
