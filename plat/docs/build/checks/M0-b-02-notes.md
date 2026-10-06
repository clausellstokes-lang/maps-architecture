# M0-b-02 — checker's minor notes for the hardening milestone M4 (check/M0-b-02, 2026-10-06)

These notes are minor findings from the check of M0-b-02 (`checks/M0-b-02.md`). None of them fails the item (J180,
J202). Each one fails safely, is off the stated promises, or is equivalent on honest inputs. They were deliberately
deferred to M4's hardening pass: they are documented here and are not bugs for a later seat to find again.

1. **N1 — the straight cut's two-end re-check has no test (mutant m40 survives).** `finish`'s loop re-checks both
   ends' arrival after both have slid (planner.ts:967–977, C-0222 (9)). Removing it leaves all 115 tests green. It
   matters only when both ends of a straight cut lie in portal gaps and the far end's slide pushes the start's arrival
   out of 85–95°. That case is rare and fails safe, since the arrival is still within a few degrees. PLAUSIBLE
   (reasoned; no probe was built). Hardening: add a two-gap straight-cut test.
2. **N2 — m16 is equivalent.** Replacing `λ ≥ 2o` with `λ > 2o` makes no difference: at λ = 2o both branches give o
   exactly. The test exists (`corner.test.ts` 'λ = 2o exactly'). No change needed.
3. **N3 — m29 is equivalent on honest inputs.** Taking `minEdge` out of the planner's chord floor changes nothing
   while w_min ≥ 25 cm, and frontages are metres. The kernel's `fillet` also floors its sampling chord at minEdge. The
   planner accepts any `minFrontageM > 0`, though. With a w_min under 0.25 m, the straight chords could fall a
   fraction of a millimetre under minEdge. Hardening: refuse `minFrontageM` below `minEdgeCm / 100`, or test that
   case.
4. **N4 — a flattened cut A → foot can cross a hole.** The checker's probe (3 000 random star faces, 30 % holed)
   found 5 of 2 580 cuts whose dropped-K straight leg A → foot crosses a hole ring. All 5 were on holed faces, under
   flatten or under straightFirst's flatten fallback. K–foot and A–K are each checked clear, but A → foot is not.
   `splitFace`'s contact rule (§3.6 GEO-6 (2), more than two crossings → E_NOT_TWO_CROSSINGS) refuses such a cut
   downstream, and the ladder takes the face. PLAUSIBLE for the downstream refusal, since M0-b-03's transaction is not
   yet landed; CONFIRMED for the planner's output. Hardening, by detect-and-refuse: when K is dropped, test
   `segmentClear(A, foot)`, and keep K or return E_NOT_TWO_CROSSINGS `flatten` when it fails.
5. **N5 — a slide can lower a kept corner's triangle below the flatten threshold.** The same probe found 5 of 2 580
   bent cuts whose final legs, after a far-end slide, give a triangle A–K–end lower than max(cut.flattenM,
   0.02 × |A–end|): for example 169.7 cm against 309.4 cm after a 438 cm slide. This follows C-0222 (10)'s declared
   reading, which follows the design's step order: flatten at step 5 reads the unslid foot, and the slide is step 7.
   T37-1 holds on the foot. Hardening: decide whether the slid geometry should re-run the flatten test, and record it
   as a choices row either way.
6. **N6 — T36-1's "draws nothing" sub-test is self-referential.** It re-derives A with the planner's own `startOf`
   on the plan's own frame and f. The promise is actually carried by the cross-stream test ("keeps its start run" over
   80 other cut.t streams) and by the most-parallel tests, so nothing is lost. Hardening: drop or relabel it.
7. **N7 — the renumbering property runs a fixed 200 cases per face** (`determinism.test.ts`, `{ numRuns: 200 }`)
   rather than `PLAT_FUZZ_RUNS`. That is adequate for the listed test. Hardening: let the nightly size scale it.
8. **N8 — the hand-off to M0-b-03.** `planner.ts` and `sides.ts` are not re-exported by `@plat/layout`, because
   `infill/index.ts` is M0-b-03's (the same pattern as C-0166 (5)). M0-b-03 must export `planCut`, `CutPlan`,
   `workingFrame` and the types it reads. It must also run step 8's checks on `CutPlanned.cut` and, under
   straightFirst, fall back to `alternate`.
