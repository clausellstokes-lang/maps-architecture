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

## The closing check's notes (lane `check/M0-b-02-close-r1`, 2026-10-06)

These rows come from the closing check of M0-b-02. That check's verdict and evidence are at the top of
`checks/M0-b-02.md`. Under J162, J169 and J202 the closing check fails the item only on a blocker, and none of these
rows is one. Each fails safely or tests correct code. Each is deliberately deferred: it is documented here and is not a
bug for a later seat to find again. N1 stays open, since mutant m40 still survives the item's 118 tests.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N9 | **A gap's + edge can be dropped by rounding.** `slideEnd` builds the candidate `s = g.s + gap` and then rejects any candidate with `inGap(s)`, which tests `Math.abs(s - g.s) < g.gap`. For about 5 % of portal positions, `(g.s + gap) − g.s` rounds to 999.9999999999991 < 1000. A uniform sample of g.s in [10, 150] m gives 0.048 on the + edge and 0 on the − edge. The edge the end should slide to is then treated as inside its own gap. The planner takes the farther (−) slide when that one is in band, and otherwise returns `nextRung` / `portalGap`, although an in-band slide existed. The closing probe found 8 such nextRung cases. Each was on the trapezoid with a far-end portal 7 m back along the spine, at seeds 9, 17, 18, 23, 37, 48, 54 and 66; for example, seed 9 has g.s = 8183.343719701516, and its + edge, 300 cm from the end, lies within 85–95°. The outcome is deterministic. It is a refusal or a legal in-band slide, never a wrong committed cut, and it can depart from C-0222 (9)'s "nearer slide first". CONFIRMED (`close-r1/zz-close-diag.test.ts`). | Skip a candidate's own gap in the `inGap` test (test only the other portals), or compare with a half-lattice-unit tolerance. Add the seed-9 trapezoid case to `ends.test.ts`, asserting the 300 cm slide. | M4 (hardening); sooner if M0-b-03's ladder statistics show surplus portalGap rungs |
| N10 | **T37-1's curved squareness reference shares `sideDir` with the planner.** `farDirAt` (support.ts) calls `sides.ts`'s `sideDir`, as round 1's required change allowed. So mutant c03 survives all 118 tests: `sideDir` reading the tangent over ± 20 m (`windowCm * 4`) instead of ± 5 m. That mutant is not equivalent. Against the kernel's `runTangent(run, foot, 500)`, its second legs are off by a worst \|cos\| of 0.087 (curved), 0.063 (chaikin), 0.053 (a cubic kerb) and 0.057 (a sine kerb). The real code holds 3.1e-15 or better on all five curved faces, 300 seeds each. `sides.test.ts` pins `windowCm = 500` but not its use inside `sideDir`. CONFIRMED (`close-r1/probe_mut.log`). | Make `farDirAt` use the kernel's `runTangent(run, foot, 500)` on a curved run (the other reference round 1 named). Or add a `sides.test.ts` case that `sideDir` equals `runTangent(run, at, 500)` on a non-circular curved run. On a circular arc a symmetric window gives the same tangent, so a cubic or sine kerb is needed. | M4 (test hardening) |
| N11 | **The streams' reroll and epoch components are not pinned by value.** Mutants c11 and c12 drop `reroll` or `epoch` from the stream the planner draws from, while the `DrawRecord` key keeps them. Both survive all 118 tests: the only test with reroll ≠ 0 checks the key's text, not a value. The real code is correct. At reroll 3 and epoch 2 on five faces, cut.stop's first uniform, cut.t's position mean3 and 71 cut.arc draws all equal their twins (0 mismatches); c11 gives 490 mismatches. C-0222 (12) states the lineage and attempt components only, so this is a missing pin of §6.1's key, not a broken promise of the item. CONFIRMED (`close-r1/zz-close-probe.test.ts`). | Add a twin test at reroll ≠ 0 and epoch ≠ 0 for each of cut.stop, cut.t and cut.arc. | M0-b-03 (whose ladder and reroll supply those components), else M4 |

## Consolidation round C1 — the builder's notes (lane `build/M0-b-02-consolidate-1`, 2026-10-13)

Round R5 of `consolidation/layout-plan.md` (§1.2.2 – §1.2.4, §2's `infill/planner.ts` row, §3's `test/infill/planner/`
row; J260, J263 Q1, Q6, Q8, J264 (5), J270 (a), (b), J302 Q8, Q12). Choices row C-0357. No behaviour change.

**Old file → new file (J263 Q8).** No test file was renamed, split or merged; every describe and `it` title is
unchanged and in its order (25 describe, 83 `it`; the title lines' sha256 ed897da12550b62a… before and after; 118
tests at run time).

| old file | new file | what changed |
|---|---|---|
| `src/infill/planner.ts` | the same | 1.2.2: `M_TO_CM`, `RAD_PER_CDEG`, `TOUCH_CM`, `cornerScale`, `arrivalDot2`, `arrivesSquare` exported file-level (an `export` keyword each, the bodies unchanged); its private `PI` literal replaced by `import { PI } from '../siting/geom.js'` (the same `3.141592653589793`); the six headers say each is infill's one definition, exported for its files to import by path |
| `src/infill/sides.ts` | the same | untouched (1.2.3: nothing to unify; byte-identical) |
| `test/infill/planner/faces.ts` | the same | `export const SEEDS = 200` (1.2.4), with one doc line |
| `test/infill/planner/faceset.test.ts` | the same | its `const SEEDS = 200` removed; `SEEDS` imported from `./support.js` (which re-exports `faces.ts`) |
| `test/infill/planner/holed.test.ts` | the same | likewise |
| `test/infill/planner/frame.test.ts` | the same | inside *turns by k × 36° on attempt k (step 8 (a)); the plan reads the turned frame*: `RAD_PER_CDEG` is the double `3.141592653589793 / 18000` and not growth's `0.00017453292519943296`; the turned axis equals dmath's cos and sin of k × 3 600 cdeg to the bit |
| `test/infill/planner/sides.test.ts` | the same | inside *a ray finds the first boundary beyond its origin; inside reads the holes*: `TOUCH_CM` is `LATTICE.unitCm / 2` (the 0.5 the test passes) |
| `corner`, `determinism`, `ends`, `fillet`, `start`, `tau` `.test.ts`, `support.ts` | the same | unchanged |

**1.2.4 — which files shared `SEEDS`.** The plan's grep named five files; the folder reads `const SEEDS` in five, but
not the five it listed (`determinism.test.ts` and `tau.test.ts` declare none; their loops use inline bounds, and
`determinism`'s `numRuns: 200` is a fast-check size, N7). Shared and moved: `faceset.test.ts` and `holed.test.ts`, both
200 → `faces.ts` `SEEDS`. Kept their own (different counts, each a sweep sized to its file): `corner.test.ts` 120,
`fillet.test.ts` 150, `start.test.ts` 80. Inline per-test bounds (`seed <= 40`, `60`, …) were not touched.

**API (J263 Q1).** `src/index.ts` and `src/infill/index.ts` byte-identical; the TypeScript checker's exported names with
symbol flags and types: package barrel 692, infill index 120, identical before and after; `planner.ts` 32 → 38 (the
six, none reaching an index); runtime names 375 (barrel) and 72 (infill index), identical.

**NO-SHIFT (J260 (3)).** The before-image is the tree's owns at the round's start, equal to `landed/M0-b-02.json`'s
hashes (the checked state). A probe in the scratch mirror planned 11 112 plans — the eight M0 (b) faces × seeds 1 – 200
under the default context, the MFCG preset and plot cuts; attempts 1 – 2 with the face's stop record and a reroll-3 /
epoch-2 stream on seeds 1 – 60; a bounding portal at seven offsets from each spine end, and at both ends, on seeds
1 – 40 — and hashed each plan's whole JSON (draw records with their uniforms, values and key texts, frames, sides,
geometry, ends, chains): **byte-identical** before and after (sha256 0b0e29a949733b7f…). Positive control: `TOUCH_CM = 1`
changes 6 lines. The 1-ulp `RAD_PER_CDEG` swap (growth's literal) changes none of the 11 112, so the registered
families do not see that last bit; `frame.test.ts` now pins it by value.

**Refusals (J264 (5), J290).** Base families (faces × seeds 1 – 200 × three contexts, the item's registered sweep):
0 of 4 800 before, 0 after. Over the whole probe: 2 before, 2 after — `E_NOT_TWO_CROSSINGS` `far run` on `curved`
seeds 25 and 26 at attempt 1 (the 36°-turned frame): LAWFUL input; the planner's typed result that §4.6 step 5 hands to
step 8's ladder (the next frame or rung, M0-b-03), not a refusal of the face; unchanged by this round, routed as R5-1.
`nextRung` 2 423 = 2 423, all in the probe's portal families (ends placed inside gaps by construction; §4.6 step 7).

**Self-check (J183).** 19 targeted mutants in the mirror (`--maxWorkers=1 --bail=1`, the item's folder), each file
restored and `cmp`-checked: earlier rounds' m46, m43, c01, c06 (`arrivalDot2` × 9), c08, c10, m37 (`arrivesSquare`
always true) and the τ clamp, start tie, flatten share, plot fillet, holed cap and spine reach killed; this round's
`PI` wrong, `cornerScale` 0, `M_TO_CM` on the gap and `SEEDS = 2` killed; `RAD_PER_CDEG` = growth's literal and
`TOUCH_CM = 1` survived the pre-round tests and are killed by the two pins above.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| R5-1 | The curved face at seeds 25 and 26, attempt 1, finds no far run (`E_NOT_TWO_CROSSINGS` `far run`): a lawful face whose corner K, on the 36°-turned frame, has no facing run with a perpendicular foot inside it and a clear K–foot. The design routes it to step 8's ladder; the planner's outcome is typed and carries its partial. Before = after. | None in the planner; M0-b-03's ladder statistics name the rung taken. | — (session note) |
| R5-2 | The export of `M_TO_CM`, `cornerScale`, `arrivalDot2` and `arrivesSquare` is held by no test of this folder (their values and behaviour are: mutants R04 – R07 killed). R6's imports from `ladder.ts` and `bentCutFabric.ts` will hold them. | None now; R6 imports them by path. | M0-b-03 (R6) |

## Consolidation round C1 — the closing check's notes (lane `check/M0-b-02-consolidate-close-1`, 2026-10-14)

These rows come from the closing check of round R5 (verdict and evidence in `checks/M0-b-02-c1.md`). Under J162, J202
and J273 the closing check fails the round only on a blocker, and none of these rows is one; it adds no pin.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N12 | **`cornerScale`'s "widest" is held by no test.** Mutant x07 (`cornerScale` returns the narrowest spine half-width) survives the item's 118 tests and the fabric subset at `PLAT_FUZZ_RUNS=1000` (`test/infill/fabric/` + `testkit/test/layout/infill-fabric/`, 16 files); every face of the planner folder's fixtures has spines of one half-width. Not equivalent: on a 120 × 70 m rectangle with round corners (r 4 – 10 m, 3 – 4 samples) and spines of 600 and 100 cm, the default plan equals the plan at `cornerScaleCm` 600 on 100/100 seeds and differs from the plan at 100 on 100/100 (whole-plan JSON; `sideRuns` collapses arc pieces shorter than `arcMaxCm`). The body is main's, untouched by R5; C-0222 (3) states it. CONFIRMED (`zz-x07.test.ts` in the checker's mirror). | A `sides.test.ts` or `corner.test.ts` case with unequal spine half-widths asserting `cornerScale(face)` is the largest and that the default plan equals the plan at `cornerScaleCm` = that value. | M0-b-03 (R6, which imports `cornerScale` into `bentCutFabric.ts`), else M4 |
| N13 | **`M_TO_CM`'s header is narrower than its uses.** It reads "the cut table's metre cells read in cm"; `checkContext` also converts the district context's `depthRangeM` and `minFrontageM` (M0-b-01's bands) through it. True as written, incomplete. | "Centimetres per metre: the cut table's and the district context's metre values read in cm." | the next comment pass (R6 or M4) |
| N14 | **Lawful-input `E_NOT_TWO_CROSSINGS` at ladder attempts, routed (J264, J290).** Over the registered faces (`faces.ts` `FACES`, `CTX`, `streamsFor(seed)`) the planner returns `E_NOT_TWO_CROSSINGS` `far run` 21 times, the same before and after R5: `curved` seeds 25, 26 at attempt 1 under each of seven contexts (R5-1); `chaikin` at attempt 2 under depth [10, 20] m / w_min 2 m (seeds 18, 38), under a 12 % slope with contour (3, 1) (seeds 16, 77, 78, 98, 102, 103) and at reroll 3 / epoch 2 (seed 1). LAWFUL input; at the planner the typed step-5 result with its partial, which §4.6 step 8's ladder takes to the next frame or rung; a face refused at the end of its ladder would be a MAKE-IT-SUCCEED for the ladder's item. Attempt 0: 0 of 6 880. | None in the planner; M0-b-03's ladder statistics on these seeds name the rung taken. | — (session note) |
