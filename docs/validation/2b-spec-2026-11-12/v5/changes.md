# Round 2B-A — the binding draft v5 (M0-a-09 S22): every change against v4

Against: `docs/validation/2b-spec-2026-11-12/v4/spec-a09-s21.json`.
Output: `spec-a09-s22.json` beside this file (written by the spec seat at `/home/user/maps-scratch/2b-v5/` in the managing container and copied here by the session with the amendments of the last section).
Read on: the design head 5551a876 (it carries M0-a-09 S20 with its fix round S21, the eighty-third landing b79e6a6e + eb95c034).
How the output is made: the line texts are `src/a5.txt`, assembled by `src/assemble5.mjs`. Every edit is a named pair file in `src/` (`pairs-*.mjs`, `l8.txt`, `l9.txt`), applied with `src/edit.mjs`, which refuses a pair whose old text does not occur exactly once.
Runs: in a worktree of 5551a876 at `/home/user/maps-scratch/2b-v5/tree`, outside the repository. Logs are in `repro/` and `sweep/`; the summary script is `sum.sh`.

## FINDINGS AND QUESTIONS FIRST (each with my recommendation; the draft carries the recommended reading)

**F1 — Q191's third seed is a different bar.** At `PLAT_FUZZ_SEED=1794532576 PLAT_FUZZ_RUNS=1000` the 'straight lanes' test is red on the per-run floor `cuts ≥ 3 · kept` (derived.test.ts :951, 'expected 21 to be greater than or equal to 24'). The planted control (:944) holds there: 16 of 16. The judged floor (:952, 91 < 96) would fail behind it. Seed 7 (J809's smoke seed) is red on the same floor (26 < 27). Q191's row names only the control.
- **QUESTION:** do the floors belong to Q191's line?
- **RECOMMENDED, and carried in line 8 (3):** fold them. It is the same test and the same class ("asserts more than the draw gives"), and two of the four known reds are the floor's.

**F2 — the share of seeds that fail, on this head.** Seeds 1 – 12 at `PLAT_FUZZ_RUNS=1000`: one red (seed 7, the floor). Seeds 1 – 6 at full strength: none red. The known reds outside the sweep are 146129014 @1 000 (control), 279049297 @full (control) and 1794532576 @1 000 (floor).
- So "red at both seeds tried" (J809 (2)) is right for those two seeds, but the measured share is about one seed in twelve at 1 000 runs, not most seeds.
- Line 8 states the share as measured. All three seeds of the queue row stay fixed cases.

**F3 — U-13's "a declared batch (which carries `prepared`)" is false on this head.**
- tx/tx.ts `open` is the one mint, for declared and callback batches alike. Its object literal has no `prepared` key, and a spec carrying `prepared` is refused with `notBuilt('M3a', …)`. So no live transaction carries `prepared` at M0.
- **QUESTION:** keep the declared-batch pin?
- **RECOMMENDED, and carried in line 3:** keep both batch forms pinned. Class `prepared` as SHARED in the type-level half and absent from the runtime half on both forms, and say why.

**F4 — Q206 is diagnosed by a probe (the judge's branch, provisionally).**
- On the head, `tileRings` refuses the case exactly while ring 1's corner stands within attractCm outside ring 2's edge (17.5, 21.5, 25.5 cm), always with W_ATTRACTED at that corner. It commits once the corner stands 31.5 or 51.5 cm outside. It refuses (a hole) when the corner is on or inside the edge.
- That is §3.6's attraction closing the bay's mouth by design, so the judge's allowance (the oracle's result alone) is short.
- **RECOMMENDED:** the line keeps the coordinator's diagnose-first form. The seat's run decides, with a 26.5 cm case added, and the fix is written for the judge's branch.
- Probe: `probes/q206.mts`; output `repro/q206-probe.log`.

**F5 — the kind of draw (the coordinator's second message; J809 (3)).**
- Both properties have NO SEED OF THEIR OWN: derived.test.ts 'straight lanes' is `fc.assert(…, { numRuns: NETS })`, and agreement-tilerings.test.ts is `fc.assert(…, { numRuns: RUNS })`. So each is red in a PLAIN run whose run seed is unlucky (tools/vitest/fuzz-seed.mjs `withRunSeed`), not only under a fixed seed. The gate's NEAR met 279049297 that way.
- **Fixed cases.**
  - Q191: the property's own `{ seed, numRuns }`. fast-check.setup.mjs: "a test may still pass its own"; a set PLAT_FUZZ_SEED does not override it.
  - Q191 also takes the two absorbed plants' networks as literal fixtures.
  - Q206: the drawn input itself (four rings), judged in its own test.

**F6 — Q90's "B-FUZZ seeds".** The entry counts Q90's class on line 6's ladder run at seed 20261112 and on the switch-absent run beside it, and at every CITY seed. Q90's own historic rates were read at the S9-era census seeds (S9 notes rows 41, 43, 47).
- **QUESTION:** re-read those seeds too?
- **RECOMMENDED:** no. Zero closes and non-zero fixes on the counts the line takes. Name the seeds if the session wants them.

**F7 — the compose / spike declared reds are dropped.** v4 declared bench site compose.test.ts and spike.test.ts at relief-60 seed 2 (S20 row 213 (b)). The coordinator's list (f) does not name them, and the head derives that seed with no refusal (J786 (2)). Dropped, as (f) lists.

**F8 — no cite was lost.** Every file and symbol v4's seven lines cite is found on 5551a876.
- arr/kerb.ts and arr/kerbExact.ts are byte-identical to the S20 branch snapshot the earlier drafts read (`git diff 854faa89` empty).
- S21 changed test-side only: observer.test.ts's arena-form pin, rows 239 – 241, C-0509. That pin, and the shadow tests that install `setExactShadow`, are what line 1's deletion of the shadow touches: change 22.
- The other test-side files J785 moved (observer.ts, relation.ts, definition.ts; C-0508) carry the symbols v4 cites: `relate`, `arbitrate`, `endsOf` with `c.closed || onFrame(q)`, `truthOfFace`'s 'frame-side end', `onFrameRing`.

## THE CHANGES, NUMBERED

1. **The file's form** (the coordinator's (1)): v4 was a one-element list. v5 is the bare entry object, as every entry of specs.json's `rounds` is. Its keys are id, from, round, session, lines, in that order; each line's keys are line, evidence, required_change. These are checked equal to M0-a-09 S20's entry. `from` 21 → 22; `round` "S21" → "S22"; `id` unchanged.
2. **The opening** names the round S22 and why (S20's fix round took -s21). Source: (d), J795.
3. **Round B is "M0-a-09 S23"** wherever round A names it: session (twice), lines 6 and 9. Source: (d).
4. **The amendment's path** is made repository-relative (`docs/validation/2b-spec-2026-11-12/v4/amendment-draft.md`). Source: the cite moved.
5. **The read list** gains J795, J800, J801, J805, J807, J809, the rulings section 'Owed at the bindings' with its J801 addition, and docs/validation/j801-seed279-2026-11-13/. Source: the addendum; ledger rows.
6. **The notes sections** read run to 'Re-check 21 of hardening round S20'. The verdict checks/M0-a-09-s21.md and rows 239 – 241 (S21's restated arena-form pin) are added. Source: the cite moved (S21; C-0509).
7. **The queue rows read** gain Q90, Q191 and Q206, each by its own grep. Source: the addendum.
8. **The cites' provenance sentence** says they were re-read on 5551a876, and that kerb.ts and kerbExact.ts there are byte-identical to the S20 branch. Source: the re-read (F8).
9. **GATE:** "S20's landing with its fix round S21 (the eighty-third landing, J795; the four LANDED lane lines)", and "the router round's landing (M0-a-05 S14 – S16)" in place of "M0-a-05 S14's landing". Source: (e), J795.
10. **Lanes and notes keys:** lanes build/M0-a-09-fix-s22 and check/M0-a-09-close-s22; verdict checks/M0-a-09-s22.md; notes section 'Hardening round S22'; evidence folder M0-a-09-s22-evidence. Source: (d).
11. **Rule (1)'s write scope** adds line 8's derived.test.ts control and floors, line 9's testkit arr-bands support.ts and fixtures (on its judge branch only), and line 1's re-pointed installations. Source: the addendum (Q191, Q206); the cite moved (S21).
12. **Rule (3)'s named exceptions** add line 8's restated control and floors and line 9's restated allowance. Source: the addendum.
13. **Rule (7)'s notes section** is 'Hardening round S22'. Source: (d).
14. **The closing checker** also re-runs line 8's and line 9's fixed cases and mutants, and line 8's seed count at its own dozen seeds. Source: the addendum.
15. **"The SEVEN failing lines" → "The NINE failing lines"**, LINE 1 to LINE 9. Source: the addendum.
16. **BEFORE ITS FIRST EDIT:**
    - the LANDED lines are S20's and S21's and the router round's (S14 – S16);
    - Q152's six are "as the session's row states them after the router round (S14 – S16)".
    - Source: (e).
17. **THE LONG RUNS** add line 8's seed count. Source: the addendum.
18. **THE SEQUENCING:**
    - "M0-a-09 S20 with its fix round S21 (LANDED, J795) and the router round (M0-a-05 S14 – S16)";
    - the merged round is named (M0-a-02 S4 → M0-a-06 S10, child ED).
    - Source: (e), J807.
19. **THE ROUND NUMBER** is rewritten: this entry is S22 because S20's fix round took -s21, round 2B-B is S23, and a fix round of this one re-keys round 2B-B at its render. Source: (d).
20. **THE DECLARED REDS** are replaced by the head's list (f):
    - (1) Q152's six, named. Round A does nothing to any of them (v4's ruling (j)): they are round 2B-B's SLOT 1, red as the router round left them.
    - (2) Q191 and Q206: this round's own lines 8 and 9.
    - (3) J176's reference-machine tests (bench/test/calibrate, host, timing).
    - (4) bench/test/site/summary.test.ts's canary (J772 (7)).
    - (5) Q202's seven s5seeds cases, FULL strength only.
    - (6) Q153 [drop if child EE's leg 1 has landed].
    - (7) Q209's two load flakes [drop if child EF's legs 3 and 4 have landed].
    - compose / spike are dropped (F7).
    - Source: (f); queue rows Q152, Q153, Q202, Q209; J786; J800.
21. **THE RESTARTS paragraph is added**, copied from the newest entry (M0-e-04 S6, child EF's). Its own notes / verdict / lane tail is left out, and one clause is added: line 8's seed count and each seed of line 6 are one step each. Source: (g).
22. **Line 1:**
    - The evidence names every bands-folder file that imports arr/kerbExact.ts or installs its shadow on the head: observer.test.ts (with the 'line 6 (b)' arena-form pin as S21 restated it, F1_COUNTEREXAMPLE), observer.ts, shadow.test.ts, shadow-prod.test.ts, relation.ts, definition.ts, derived.test.ts; and the CITY runner (notes row 214).
    - The required change keeps every assertion of S21's restated pin: only the shadow's installation is re-pointed.
    - Pin (i) adds observer.test.ts's 'arena form' tests green at seed 1696442892 and at S21's seeds 101 – 135.
    - Source: the cite moved (S21, C-0509).
23. **Line 1 pin (i):** the DERIVED lines are compared at one recorded PLAT_FUZZ_SEED on both sides. A red of Q191's class at that seed is the same red on both and is not the fold's. Source: Q191 (its draw is the run seed's).
24. **Line 3:** U-13's runtime half is corrected (F3): both batch forms are minted by tx/tx.ts `open` without `prepared`, so `prepared` is classed shared and is absent at runtime. The pin text and its header say so. Source: the cite read (tx/tx.ts), F3.
25. **Line 3's evidence** adds tx/tx.ts `open` (the one mint) and marks `prepared` optional. Source: the cite read.
26. **Line 5:** "M0-a-05 S14's among them" → "the router round's, M0-a-05 S14 – S16, among them". Source: (e).
27. **Line 6: Q90 folded in** (no second measurement pass). Source: (a); the addendum; Q90; J800; RL11; J490 (1).
    - The header names the defect: the displaced run end has never been counted under either rung.
    - The evidence adds Q90, kerb.ts KEPT_DEEP / keptDeep / CENSUS_DEEP / UNLAID_DEEP / kerbCensus().refusedAt, J433's replay (replay.ts, cause.test.ts) and step 11's four both-rung refusals.
    - (A) gains "Q90 — the refusals on both rungs, by cause", classed for the ladder run and the switch-absent run. FAILING: every both-rung refusal classed. REPORTED: the KEPT_DEEP (displaced run end) count. Zero closes Q90; non-zero makes it a FIX line of round 2B-B (S23).
    - (B) gains the same classing at every CITY seed.
28. **Line 7 (5):** the bands and testkit arr-bands folders on the tree are red exactly in Q152's six, with lines 8's and 9's states; the base's reds include Q191's and Q206's at a seed that draws them. Lines 8 and 9 change tests, never a served output. Source: (b), (c).
29. **LINE 8 (NEW) — Q191, test-only, a line of fact.** Source: (b); Q191; J784, J795, J801, J809; my runs (F1, F2, F5).
    - What the control asserts, and what the plant gives: a 5 cm translate absorbed by `relate`'s tip rule on a sliver read.
    - The smallest true restatement: `failed === beyond`, `beyond > 0`, `beyond + absorbed === reads`.
    - The floors made facts: non-vacuity at a random seed; the power floors asserted on the fixed cases.
    - All three seeds as fixed cases, each with its seed set in the test.
    - The two absorbed networks as literal fixtures.
    - The seed count: 1 – 12 @1 000, 1 – 6 @full, plus the run's own.
    - Four mutants that must stay red.
30. **LINE 9 (NEW) — Q206, diagnose first.** Source: (c); Q206; J801; F4; F5.
    - The kind of draw, and the fixed case: the drawn rings, verbatim.
    - The diagnosis, by the run, as a series of fixtures (the corner 30 cm inside, on the edge, 17.5 / 21.5 / 25.5 / 26.5 / 31.5 / 51.5 cm outside), with the criterion for each branch.
    - The judge's branch (tests only): the allowance reads the ATTRACTED INPUT; pins; three mutants.
    - The kernel's branch: REPORTED, a declared red, round 2B-B's source line. No source changes in this round either way.
31. **Not changed:** every other sentence of v4's session and of lines 1 – 7. Their cites were re-read on the head (F8): kerb.ts, kerbExact.ts, bandUnion.ts, corridorUnion.ts, tx/state.ts, tx/frames.ts, tx/relevel.ts, faces/common.ts, insert/stretch.ts, insert/classes.ts, io/encode.ts, io/decode.ts, invariants/debug.ts, arr/buffer.ts, facade/kernel.ts, package.json, the allow rows (kerbExact.ts ident `kerb` 2, string `kerb` 1; kerb.ts 20 / 8 by the lint's scanText), M0-work.json's owns line, bfuzz.test.ts's census lines and network order, measure.ts, bentCutFabric.ts, the tx test support's classifier, savepoint.test.ts, testkit's primitives, notes rows 181, 205, 206, 213, 214, refute-s20.md.

**Count: 30 changes (28 edits and 2 new lines), plus item 31 (what did not change) and 8 findings.**
**The entry has 9 lines.**


## THE SESSION'S READING AND RULINGS AT THE FOLD (J811, 2026-11-13 07:20Z)

The managing seat read this file whole, lines 6, 8 and 9 of the entry whole, the re-read list, and checked the
load-bearing claims against the tree: tx/tx.ts :93 (a spec's `prepared` is `notBuilt('M3a')`) and tx/state.ts :51
(`prepared` optional) — F3 holds; derived.test.ts :110, :520 – 521, :944 – 952 and :2101 / :2125 (no seed of its own;
the control and the three floors as quoted; the floor of F1 is :951, corrected above); relation.ts `tipNear` and
`relate` (the tip bound as quoted); the seat's run table (`evidence/q191-seeds-table.txt`) and probe log.

| # | Ruling (each the session's, vetoable) |
|---|---|
| F1 | ACCEPTED — the floors are folded into line 8: the same test, the same class, and two of the four known reds. |
| F2 | ACCEPTED, and it corrects the session's own J809 (2): 'red at both seeds tried' was true of those two seeds and no measure of the share — about one seed in twelve at 1 000 runs. |
| F3 | ACCEPTED — both batch forms pinned; `prepared` classed shared by the type-level half and absent at runtime. |
| F4 | ACCEPTED with the ruling written into line 9 (3): the extended allowance is the designed reading ONLY under all the criteria of (2); it licenses no other attracted refusal. |
| F5 | ACCEPTED — a fixed case sets its seed in the test, or is the drawn input itself. |
| F6 | AMENDED — a zero is read where the class occurs. If the switch-absent run at seed 20261112 also counts zero of Q90's class, the runner counts it at the October census seeds 1012 and 20261011 (10⁴ networks each, both switches); written into line 6 (A). |
| F7 | ACCEPTED — compose / spike leave the declared reds (the gates of the eighty-second to eighty-fifth landings met neither). |
| F8 | NOTED. |

THE SESSION'S THREE ADDITIONS TO LINE 8, beyond the seat's draft: (i) every absorbed plant is absorbed by the tip rule,
none by h ≤ NEAR_CM — a fact of geometry (a bounded region and its 5 cm translate stand at Hausdorff distance ≥ 5 cm),
asserted; (ii) the third fixed case (the floors' red draw) pins its own counts and does not carry today's power
floors; (iii) the tip rule's own bound pinned by hand, with a mutant (the bound doubled) — once the control counts what
`relate` absorbs, the rule that absorbs must not be free to grow. The evidence the lines cite is in `evidence/`
(the two absorbed plants' networks, the per-seed table, the Q206 probe and its log), so that a seat in another
container can read it.

NOT BOUND. At the binding (the router round landed; the runner of S20 re-run on the merged tree, J769): work through
`reread-after-router.md`, resolve the two bracketed drops of the DECLARED REDS paragraph, fold any M0-a-09 red the
early seed sweep (J809) finds, append the entry to specs.json and write the launch file.

ADDED AT J814 (08:55Z 2026-11-13, from the seed sweep): LINE 8 gains the seed 284554526 — at 1 000 runs the straight
test is red there on the floor (21 < 27) and the BENT-LANES test, which shares bars(), is red on the CONTROL (17 of 18).
It is a fixed case of both tests; the bent test's absorbed plant is found and recorded as the straight test's were,
and the line stops at REPORTED if that plant is not absorbed by the tip rule.
