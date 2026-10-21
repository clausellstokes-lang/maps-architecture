# M0-k-03 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-k-03 (lane `check/M0-k-03-close-r3`, 2026-10-04). Under the
session's ruling J162, the closing check fails the item only on a blocker. Every finding below is a hardening test or a
claim to tighten, so none of them fails the item. Each row names its handling and the milestone or item where it
belongs. The verdict and its evidence are in `checks/M0-k-03.md` (the closing round). The earlier checks' open notes —
N-1 (no `tileRings` adapter; M0-a-09 passes `'nonzero'`), N-5 (`CompareOptions.measure` is a test seam), N-7 (a harness
reports and bounds `unjudged` and `refusals`), N-8 (the two oracles' face counts differ on about 0.1–0.2 % of random
booleans) and N-9 (a plain throw beside a refused cross-check returns a refused verdict) — stay in `checks/M0-k-03.md`
and are not repeated here.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N1 | The unattracted comparison reads ours as a region: the face count is the region's connected pieces (C-0144 (3)) and `symDiffArea` reads both sides by the non-zero rule. So a ring-level fault of ours that leaves the region unchanged, such as a duplicated face, passes an unattracted verdict. CONFIRMED in a scratch copy: ours `[sq, sq, tri]` against either oracle's union of `sq` and `tri` gives `pass` true, `failures` `[]` and `faces {ours 2, oracle 2}`; the same case marked attracted fails with `invalid: crossing edges`. This follows §3.7's text, which asks for §3.10's hard invariants on attracted cases only, so it is not a fault of M0-k-03. A scratch mutant that reads `symDiffArea`'s polygon-clipping xor under even-odd (C02) survives all ten oracle test files: the two rules read sets of disjoint faces alike, so the fill rule matters only for faults like this one. | M0-a-08's and M0-a-09's harnesses check §3.10's hard invariants (or `ringProblems`) on every case they draw, unattracted cases included, or record in a choices row why not. | M0 (M0-a-08, M0-a-09) |
| N2 | C-0150's test column names `regression.test.ts` for F4's two cases only. Fix round 3 added a block for F5 (`symDiffArea`'s measuring xor and `faceCount`'s union on case 2's rings r0 and r2) and no choices row, because it made no deviation. The block is described in the file's header and in the round's LANDED line. | No action now. The next row that amends C-0150 cites the F5 block among its tests. | M4 (or the next row touching C-0150) |

## Hardening round S1 (lane `build/M0-k-03-fix-s1`, flow flow-7, 2026-10-20; J237 (2), J264, J290 / N-58; choices C-0414)

This is the M0 hardening phase's round for M0-k-03. Its rows are KI-6, from the inventory (`checks/hardening-inventory.md:96`,
FIX-NOW, owner M0-k-03; its duplicate is `M0-a-08-notes.md:143` row 21), and both halves of the queue row L18
(`docs/M0-FIX-QUEUE.md`; source note `checks/M0-a-02-notes.md` N-s2-4; the re-triage of 2026-10-19, batch B8, entry 41).
The refusal census and the rulings hold no line for this item. Every source note was read whole: KNOWN-ISSUES KI-6,
queue row L18, N-s2-4, a-08's row 21, and the inventory's rows.

### Row by row

| row (source note) | outcome | what was done | evidence |
|---|---|---|---|
| **KI-6**: polygon-clipping does not terminate on one offsetFace case (seed 6101; register `oracleHang`). Guard the call with a step or time budget, report the seed as an oracle refusal, and pin it with the register case under the guard. | **FIXED + PINNED** | **Diagnosis.** We sampled the hung vitest worker's stack through the inspector (SIGUSR1, then `Debugger.pause`). The library loops in `SweepLine.process`'s skip-consumed walk, `while (prevSeg === undefined) prevNode = this.tree.prev(prevNode)`. Rounding breaks the tree's order, so the walk cycles. The queue never grows, so the library's own limits (`POLYGON_CLIPPING_MAX_QUEUE_SIZE` and `…_SWEEPLINE_SEGMENTS`) never fire. **Fix** (`src/oracles/polygon-clipping.ts`): every library call (`apply`, the even-odd xor in `operandGeometry`, the union of buffer parts) now runs under a **step budget**. The steps are the calls `insert`, `add`, `remove`, `find`, `prev`, `next` and `pop` on the `splaytree` instance that polygon-clipping itself loads, resolved from the library's own folder. On first use, a self-check confirms that a small union moves the count; if it does not, the adapter throws `oracles: …`. A call that takes more than `2²¹ + 2¹³ × n` steps (n = input vertices) is stopped with a `StepBudgetOverrun`. `underTurns` sets that attempt aside like a throw and tries the next quarter turn. If no turn is accepted, the result is the typed `OracleRefusal`, now with `overran: true` and `seed` (see L18). The budget counts steps, not time, so the same input overruns on every machine and under any load. It sits far above every call measured: max 532 876 steps per call and max 459 steps per input vertex, over 4.8 × 10⁴ library calls of k-03's and a-08's families at seed 7. The time budget was rejected because its outcome depends on load (J202: no nondeterminism). **Behaviour on the cases**: the register case's buffer call loops under the identity turn and is answered under 90°. The new agreement-buffer case loops at 0°, throws at 90° and 180°, and is answered at 270°. So both cases now get an answer instead of a hang, and each answer agrees with Clipper2 within perimeter × 1 cm. | `test/oracles/budget.test.ts`: (1) the counter reaches the library, and the budget constants are pinned. (2) Under a budget of 5 + 1/vertex, a union refuses with every turn's overrun in a message pinned verbatim. (3) The register case's buffer call (fixture `fixtures/hang-6101-offsetface-buffer.json`, captured from `register.json` through a-08's own `arenaFace`/`faceEdges`) is answered after ≥ 1 overrun and agrees. (4) The register case end to end, read from `register.json` and run through the harness's `oracleOffset`, terminates and agrees. (5) The 1595 case (`fixtures/hang-1595-buffer.json`) is answered under 270° and agrees. (6) Under a 1 000-step budget, the register case is `{ok:false, refused:true, overran:true, seed:6101}` with its message pinned verbatim, and `compareSplit` reads it as a refused verdict as before. Mutants: K1/K1b (guard removed) and K2 (`prev`/`next` uncounted) make the pins hang, and the run is killed at 300 s (exit 124). A synchronous loop cannot be stopped by vitest's timeout, so without the guard the run never ends. K3 (refuse at the first overrun), K4/K17 (`overran` lost), K6 (the refused result drops `seed`/`overran`), K7 (no per-vertex term), K8 (vertex count wrong), K9 (`withStepBudget` not restored) and K16 (the raw sentinel escapes) are all killed by pin (2), and K5 (seed never carried) by pin (6). |
| **L18, oracle half**: the oracle's refusals replayed from the seed | **FIXED + PINNED** | `OracleRefusal` gains `seed` (fast-check's global seed, which PLAT_FUZZ_SEED fixes through the vitest setup, C-0057, or null for an unseeded run) and `overran`. The optional third constructor argument is `{ overran }`, so every existing two-argument call stands. A refused `OracleResult` carries both (`resultOfThrow`). Message texts are unchanged except for the new overrun outcome, which is pinned verbatim. Replay itself: **CONFIRMED deterministic**. In the mirror with the guard, a-08's agreement-buffer at `PLAT_FUZZ_SEED=1595 PLAT_FUZZ_RUNS=1000` ran twice and printed identical lines (drawn 993; oracle refusals `{}`; insertChain's 7 of cap 17; 127 s and 112 s). Before the guard the same command hung in polygon-clipping (more than 15 minutes; stack sampled). That is this round's second hang case. A probe confirmed that the global seed reaches testkit tests: two runs at seed 1595 drew identical values. The 994/995 draws reported in N-s2-4 do not reproduce on this tree. | Pin (6) and `adapters.test.ts` "turns a refusal into a refused result" (`seed: replaySeed()`, `overran`). Mutants K5, K6 and K17 are killed. |
| **L18, test half**: the test replays from PLAT_FUZZ_SEED and reports the seed on a refusal; the cap is stated per size with its rationale; a pin that a refusal line carries the seed | **FIXED + PINNED** in k-03's own agreement test; **REPORTED** for M0-a-08's file | `test/oracles/agreement.test.ts` with `support.ts`: each family runs the test's own 10⁴ cases (C-0144 (7)). Its seed is the fixed H32 seed of `oracles/agreement/<family>` (738464587 for booleans, 821281733 for buffers) through M0-k-01's `fuzzParams`, unless PLAT_FUZZ_SEED overrides it. The seed is passed to `fc.assert` and printed in the run's line and in every assertion message ("replay with PLAT_FUZZ_SEED=…"). The cap is `agreementRefusalCap(cases) = max(1, ⌈0.001 × cases⌉)`, which is 10 at 10⁴ and 1 at 10³. The rationale is in the header: C-0150's allowance, 0 measured, and the size never follows PLAT_FUZZ_RUNS. **The red of L18 is a-08's file** (`test/kernel/arr-booleans-buffers/agreement-buffer.test.ts`, its `verdict` and cap in `support.ts`), and this round does not edit it (rule (1)). See the report below. | Pins in `budget.test.ts`: the family seeds (and PLAT_FUZZ_SEED's override), the cap per size, and the refusal line pinned verbatim with `seed 1595 … replay with PLAT_FUZZ_SEED=1595`. Mutants K11/K11b (override ignored) and K12 (a fresh seed) are killed by the seed pin, K13 (cap constant) by the cap pin, and K14 (no seed in the line) by the line pin. |

### Reported (not built: another item's files)

* **To M0-a-08** (`test/kernel/arr-booleans-buffers/`). (a) `agreement-buffer.test.ts` and its siblings call
  `fc.assert(…, { numRuns: RUNS })` without a seed, so a run without PLAT_FUZZ_SEED draws a fresh seed that no line
  prints. Pass a fixed `fuzzParams('arr/agreement/<op>').seed` (or print the seed fast-check chose), and print it in
  `verdict`'s line and its assertion messages. (b) `verdict`'s oracle-refusal cap is `⌈0.001 × runs⌉`, which is 1 at the
  RELATED size of 10³. N-s2-4 measured 2 counted refusals (`clipper2/cross-check` 1, `polygon-clipping/measure` 1) at 10³.
  Whether to keep that cap or to use a Poisson point of the measured rate (the shape of `insertChainRefusalCap`) is
  a-08's decision. It should be stated per size in that test's header. (c) `register.test.ts`'s comment says `oracleHang` is
  "never run (it would hang)". The case now runs under the guard and is answered, as `budget.test.ts` pins (4) shows.
  a-08 may move it into `refused`/`pending`, or keep it as the guard's witness.
* **To the session (M0-s-01's `tools/vitest/fast-check.setup.mjs`)**: when PLAT_FUZZ_SEED is unset, every property
  draws a fresh seed that is printed only if `fc.assert` itself fails. An aggregate assertion after it (a cap, a count)
  then carries no seed. The setup could pick and print one seed per run. This is a suggestion, not a defect of this item.

### Behaviour, API and refusals

* **Behaviour.** Only the hanging calls change: before, they never returned. After, they are answered under a later turn,
  or refused with `overran` when every turn overruns. Every other call takes the same path and returns the same
  answer. The after-run of the agreement families printed the same face-count agreement and worst shares as the
  before-run on the same seeds: booleans 9984 equal, 0.1065 cm; buffers 10000 equal, 0.3860 cm. **NO SHIFT**: no
  digest, golden or record moves. The oracles are dev-only (§14), and nothing shipped reads them.
* **API (J263 Q1).** The folder index `src/oracles/index.ts` and the package barrel are untouched. New names are
  exported from the module files only: `polygon-clipping.ts` (`STEP_BUDGET_BASE`, `STEP_BUDGET_PER_VERTEX`,
  `StepBudget`, `StepBudgetOverrun`, `withStepBudget`, `stepCounts`) and `refusal.ts` (`replaySeed`,
  `OracleRefusalDetail`). The tests import these by path, as they already import `polygonClippingAttempt`. Additive
  fields, as KI-6 asks ("a typed oracle refusal carrying the seed"): `OracleRefusal.seed`, `OracleRefusal.overran`, and
  the refused `OracleResult`'s optional `seed` and `overran`. The harness's classification is unchanged: a refused
  result is still `{ ok: false, refused: true }` and N-39's step `own`.
* **Refusal census (J264 / N-58).** The item's registered families are the agreement test's two families at the
  test's 10⁴ on their fixed seeds. Before (pre-round code, `PLAT_FUZZ_SEED` = the family seeds): booleans 0 of 10⁴,
  buffers 0 of 10⁴. After: 0 of 10⁴ and 0 of 10⁴. The two hang cases had no outcome before (a hang). After, both are
  answered, with 0 refusals. The census does not rise. Class: LAWFUL input (strips and joins of lawful chains). The
  hang is the third-party oracle's own defect, and the verdict is MAKE-IT-SUCCEED, met by the existing quarter-turn
  retry once the hang is bounded. An all-turns overrun stays a typed REFUSE of a dev-only oracle. No user reaches it
  through §11.4's doors, and the harnesses count it under C-0150's allowance.

### Residual (KI rows for the hardening pass; fail-safe today)

| id | observation | why not now |
|---|---|---|
| KI-s1-1 | Clipper2 (WebAssembly) has no step budget. A call into the module cannot be counted from JavaScript. | None has been measured slow: 43 ms on the 6101 case, and no hang in 1.4 × 10⁵ cases (C-0150). A time-boxed worker would bring the nondeterminism this round avoided. |
| KI-s1-2 | A polygon-clipping loop that makes no splay-tree operation would not be counted. | Every loop of its sweep and queue goes through the trees. Ring assembly (`RingOut.factory`) has the library's own throw ("Unable to complete output ring"). |
| KI-s1-3 | The budget's constants rest on 4.8 × 10⁴ calls at seed 7: max 532 876 steps, max 459 per vertex. A lawful call above `2²¹ + 2¹³ n` would be set aside as an overrun. | The safety margin is about 4× on steps and about 18× per vertex. An overrun is not a wrong answer: the next turn is tried, and if every turn fails it is a counted refusal. |

### Self-check (J183) in the scratch mirror

The mirror was `/home/user/maps-scratch/waves/selfcheck-build-M0-k-03-fix-s1/plat` (a `cp -a` copy). Isolation was proved
first: no symbolic link points into the tree, and the `@plat/kernel` realpath stays inside the mirror. Each mutant was run as
`vitest run --maxWorkers=1 --bail=1 packages/testkit/test/oracles/` (the hang mutants with `-t` on their pins and
an outer `timeout 300`). After each one the file was restored from the tree and checked with `cmp -s`. 17 mutants,
17 killed: K1, K1b, K2 (exit 124, hang), K3, K4, K5, K6, K7, K8, K9, K11 (ReferenceError; re-made as K11b, killed by
the assertion), K12, K13, K14, K16, K17. No mutant was equivalent. Survivor note: removing the self-check in
`armSteps` is not testable here. It only fires when the counted instance is not the library's, which cannot happen on this
tree; it is a fail-loud guard.

## Closing check S1 notes (lane `check/M0-k-03-close-s1`, flow flow-7, 2026-10-21; verdict `checks/M0-k-03-s1.md`)

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N3 | `armSteps`'s self-check does not fail loud as C-0414 (1) and the code comment say ("else an `oracles: …` error", "a test-kit fault, never a refusal"). It sets `steps.armed = true` *before* the check union, and it runs inside `budgeted`, inside an `underTurns` attempt, so its error is set aside as turn 0's `threw (…)`. CONFIRMED by probe Kw in this checker's mirror, with the counter wired to a copy of `splaytree.umd.cjs` (another instance): the first call answers under turn 90° with `steps {"lastTaken":0,"overruns":0}`, the second answers the same, and every later call runs unbudgeted. A hang input would then hang again. Not reachable on this tree (the library's own `splaytree` is resolved, the check passes): a contrived escape, not a fail. | Set `armed` only after the check passes, and arm outside the attempt, at the start of `polygonClippingRaw` / `polygonClippingUnionPieces` or in `loadOracles`, or rethrow `oracles:` errors from `underTurns`. Pin it with a mutant that wires the counter to another instance: the first call should throw `oracles: the step budget does not reach polygon-clipping …` rather than answer. | M4 (or this item's next fix round, since it is the same file and a small change) |

## Fix round S2 (lane `build/M0-k-03-fix-s2`, flow flow-7, 2026-10-21; J162, J183; choices C-0415)

The closing check S1 (`checks/M0-k-03-s1.md`) failed the round on one line: mutant **Kc** — `operandGeometry`'s even-odd
xor of its fan pieces run without the step budget (`return polygonClipping.xor(first, ...rest);`) — survived all 11
oracle test files and RELATED@1000, while C-0414 (1) names that call as one of the three budgeted ones. This round pins
it, and also takes the checker's note **N3** (same file, small change), which the verdict allowed.

### Row by row

| row (source) | outcome | what was done | evidence |
|---|---|---|---|
| **KI-6, the fan xor's budget** (`checks/M0-k-03-s1.md`, the one failing line; C-0414 (1)) | **PINNED** (no code change: the budget was already on the call; it lacked a test) | New test in `test/oracles/budget.test.ts`: "budgets the even-odd operand's own xor of its fan pieces: a bow-tie overruns there first (the message pinned; S2, Kc)". A bow-tie `(0,0) (100,100) (100,0) (0,100)` (its ring crosses itself at (50, 50), so it is not simple) unioned under `evenodd` with the square `rect(200, 0, 300, 100)`, under `withStepBudget({ base: 5, perVertex: 0 })`. `operandGeometry` turns the bow-tie into the xor of its two fan triangles — a library call of 6 input vertices — before `apply` (12 input vertices). The refused result is pinned whole and verbatim: every turn's outcome is `overran its step budget (6 steps; budget 5 for 6 input vertices)`, so the call that overran is the fan xor; `refused: true`, `overran: true`, `seed: replaySeed()`. Under the default budget the same case answers. | Mutant **Kc** (the checker's, verbatim) in this round's mirror: **KILLED** by that test — `AssertionError: expected { ok: false, …(5) } to deeply equal { ok: false, …(5) }` (the received message names `apply`'s call instead), rc 1. On the tree the test is green. |
| **N3** (`checks/M0-k-03-notes.md` § Closing check S1 notes): `armSteps`'s self-check did not fail loud | **FIXED + PINNED** | `src/oracles/polygon-clipping.ts`: (a) `steps.armed` is set only after the self-check union has moved the count; a separate `steps.wrapped` keeps the methods wrapped once, so a failed check runs again — and throws again — on every later call, never letting one run unbudgeted; (b) `underTurns` calls `armSteps()` before its first attempt, so the `oracles: …` error escapes it instead of being set aside as turn 0's `threw (…)`; (c) every counted method is checked present before any is wrapped (no half-wrapped prototype). The adapter (`oracles.ts`, unchanged) then returns the kit's error as a failed result, `{ ok: false, engine: 'polygon-clipping', error: 'polygon-clipping: oracles: the step budget does not reach polygon-clipping (its splaytree is another instance)' }` — never a refusal, so `compareSplit` reports it as `oracle: …`, a failure, not a refused verdict. | New file `test/oracles/budget-arm.test.ts`: in its own module graph it replaces polygon-clipping (`vi.doMock`) with one whose operations never touch its splay tree, so the check cannot pass; it pins that `polygonClippingBoolean`, `polygonClippingUnionPieces` and `underTurns` each throw exactly `Error: oracles: the step budget does not reach polygon-clipping (its splaytree is another instance)` on the first and on two later calls, that no overrun is counted, and the adapter's failed (not refused) result whole. Mutants **N3a** (armed set before the check), **N3b** (`underTurns` does not arm first) and **N3c** (the check's throw removed) are all **KILLED** by it. Probe **Kw** (the checker's shape: the counter wired to a copy of `splaytree.umd.cjs`, another instance) on the fixed code: the first call returns the kit's error as a failed result (`budget.test.ts`'s overrun pin then receives `"error": "polygon-clipping: oracles: the step budget does not reach polygon-clipping (its splaytree is another instance)"`, no `refused`), and the agreement test fails on its first case — loud, where S1's code answered unbudgeted. |

### Behaviour, API and refusals

* **Behaviour.** NO SHIFT. On this tree the self-check passes on the first call, exactly as before; the only new work
  is one `armSteps()` call (a no-op once armed) at the head of `underTurns`. No answer, digest or golden moves.
* **API (J263 Q1, Q6).** No export added, removed or renamed; the folder index and the barrel untouched. No message
  text changed; the self-check's message was already in C-0414 (1) and is now pinned verbatim.
* **Refusal census (J264 / N-58).** The item's registered families (the agreement test's two families at 10⁴ on their
  fixed seeds), measured at 10⁴ with `--silent=false`: before (S1's `polygon-clipping.ts`, sha256 f887b1ac…, in the
  mirror) and after (this round's, in the tree) print identical lines —
  `oracles/booleans: seed 738464587 — 10000 of 10000 cases compared and agree; refusals {} (cap 10; replay with PLAT_FUZZ_SEED=738464587); face counts equal on 9984; worst |Δ| ÷ perimeter 0.1065 cm`
  and `oracles/buffers: seed 821281733 — 10000 of 10000 cases compared and agree; refusals {} (cap 10; replay with PLAT_FUZZ_SEED=821281733); face counts equal on 10000; worst |Δ| ÷ perimeter 0.3860 cm`.
  0 / 10⁴ and 0 / 10⁴ before and after: the census does not rise. No refusal met in the families, so none to class.
* **Gates (tree, W=1).** install --frozen-lockfile 0; lint 0 (eslint 1161 files, probe-red ok); build 0; NEAR
  `vitest run packages/testkit/test/oracles/` 12 files 122/122, exit 0; RELATED@1000 over `oracles.ts`,
  `polygon-clipping.ts`, `refusal.ts`, `types.ts`: 127 files 1982/1982, exit 0.

### Self-check (J183) in the scratch mirror

Mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-k-03-fix-s2/plat` (`cp -a`; no link into the tree; the
`@plat/kernel` realpath inside the mirror). Each mutant was run as `vitest run --maxWorkers=1 --bail=1
packages/testkit/test/oracles/` and the file restored from the tree and confirmed with `cmp -s` after it.

| mutant | site | outcome |
|---|---|---|
| Kc | `operandGeometry`'s fan xor unbudgeted (the checker's, verbatim) | KILLED by `budget.test.ts` "budgets the even-odd operand's own xor …" (rc 1) |
| N3a | `steps.armed = true` before the self-check union | KILLED by `budget-arm.test.ts` (received the all-turns refusal, not the kit's error) |
| N3b | `underTurns` does not call `armSteps()` first | KILLED by `budget-arm.test.ts` (received `OracleRefusal: … turn 0°: threw (oracles: …)` ×4) |
| N3c | the self-check's throw removed | KILLED by `budget-arm.test.ts` (received the all-turns wrong-region refusal) |
| Kw (probe) | counter on another `splaytree` instance | loud on the fixed code: a failed result naming the kit's error (rc 1) |
