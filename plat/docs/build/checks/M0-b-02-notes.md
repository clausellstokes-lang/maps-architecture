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
row; J260, J263 Q1, Q6, Q8, J264 (5), J270 (a), (b), J302 Q8, Q12). Choices row C-0363. No behaviour change.

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

## Hardening round S1 — the builder's notes (lane `build/M0-b-02-fix-s1`, 2026-10-19)

The session's hardening round S1 of M0-b-02 (J237 (2), J263 Q1, Q6, J264, J290 / N-58, N-45): the queue's L28 (planner
half, RULED J424), the rows N1, N3 – N7 of this file, the inventory's FIX-NOW rows N9 – N11 and the rider N12 (J423
R10). Choices row C-0406. Inside the item's owns only (`src/infill/planner.ts`, `test/infill/planner/`); `sides.ts`,
both index files and every export untouched (API frozen, J263 Q1). The seat was relaunched once under the CONTINUE RULE
(its first part's tree edits, census and RELATED run kept; the mirror rebuilt and every mutant re-run).

| row | outcome | the change | evidence (pin and mutant) |
|---|---|---|---|
| L28 (planner half) | **fixed (comment) + pinned + swept** | `spineHit`'s header names `ratio()`'s floor as C-0222 (9)'s reach rule (J424): a spine segment e with \|cross(dir, e)\| < 1 is no hit, the end stays a kerb end square on its line, for the planner and the ladder alike; no code change | `ends.test.ts` *a spine segment the arrival runs along (\|cross(dir, e)\| < 1) is no hit*: a spine through A leaning 0.5 cm over 200 m, 10 seeds, the end reaches the south spine; K12 (the ladder's floor, `ratio(n · 2²⁰, d · 2²⁰)`, in the planner) KILLED. Sweep below |
| N1 | **pinned** | — | `ends.test.ts` *re-checks a straight cut's two ends after both slides*: a box whose north side leans 4°, MFCG, portals 1 m beside both junctions, 15 seeds, > 10 `nextRung` and every kept end in 85–95°; K01 (m40, the re-check off) KILLED |
| N3 | **pinned** (the row's "or test that case"; no refusal added, J264) | — | `fillet.test.ts` *holds the lattice minimum edge as the floor when w_min is under it*: w_min 10 cm, a right angle whose arc is just over four 25 cm pieces; every straight chord ≥ minEdge; K02 (m29, the floor without minEdge) KILLED — so m29 is no longer equivalent on the tested input |
| N4 | **fixed + pinned** (the row's detect-and-refuse: §3.6's E_NOT_TWO_CROSSINGS) | `flattenPlan` returns `crosses` when K is dropped and A → foot is not `segmentClear`; `planCut` returns E_NOT_TWO_CROSSINGS `flatten` with its partial (start, corner); under straightFirst the flatten alternate is withheld (`alternate: null`) and the straight cut stands | `holed.test.ts` *a flattened cut never crosses a hole*: a hole's tip poked into the thin triangle A–K–foot (clear of A–K and K–foot by the test's own orientation test), 40 seeds, > 5 refusals with the partial's A, K and draws, MFCG keeps the straight cut; K03 (check off = the before code), K04 (alternate refuses), K05 (A → K tested instead) KILLED. Star probe (3 000 faces, 30 % holed): before 4 straight cuts crossing a ring, after 0 and 4 E_NOT_TWO_CROSSINGS `flatten` |
| N5 | **decided (choices C-0406 (4)); no code** | the flatten test keeps reading the unslid legs (C-0222 (10), the design's step order): a slide does not re-run step 5 | the text; T37-1 holds on the foot |
| N6 | **relabelled** | T36-1's sub-test now says what it holds (no draw between the position and the corner) and replays A from the face's own `workingFrame(face, 0)` and `faceSides(...)`, not the plan's frame and sides; the cross-stream test carries "keeps its start run" | the text (`start.test.ts`) |
| N7 | **fixed + pinned** | the renumbering property's cases a face = ⌈fast-check's global numRuns ÷ 50⌉ (200 at the PR size 10⁴, 20 at `PLAT_FUZZ_RUNS=1000`), so the nightly size scales it | `determinism.test.ts` *sizes the renumbering property by the global fast-check size*; K13 (a fixed 200) KILLED |
| N9 | **fixed + pinned** (the row's first alternative, which is C-0222 (9)'s text: "inside **another** portal's gap is not a candidate") | `slideEnd`'s `inGap(s, own)` skips the candidate's own gap | `ends.test.ts` *slides to a gap's edge that rounding puts a hair inside its own gap: the trapezoid at seed 9*: g.s = 8183.343719701516, (g.s + 1 000) − g.s < 1 000, the 300 cm slide asserted; K06 (revert = the before code), K14 (own gap skipped on the − edge only) KILLED; K07 (no gap test at all) KILLED by the existing second-portal test |
| N10 | **fixed (test reference) + pinned** | `support.ts`'s `farDirAt` reads the kernel's `runTangent(run, foot, 500)` on a curved run (spread > 0), never the planner's `sideDir` | T37-1 (`corner.test.ts`) now kills c03 (K08, `sideDir`'s window × 4) |
| N11 | **pinned** | — | `tau.test.ts` *draws on the stream key's reroll and epoch components*: (reroll, epoch) ∈ {(3, 0), (0, 2), (3, 2)}, 20 seeds, attempts 0 – 2: cut.stop's four uniforms, cut.t's two mean3 values and every cut.arc value equal their twins from `streamKey`; K09 (c11, reroll 0) and K10 (c12, epoch 0) KILLED |
| N12 (rider) | **pinned** | — | `sides.test.ts` *the default corner scale is the face's widest spine half-width*: spines 600 / 100 cm on a round-cornered 120 × 70 m block; `cornerScale` = 600 either order, 0 without spines; the default plan = the plan at 600 and ≠ the plan at 100 on 10/10 seeds; K11 (x07, the narrowest) KILLED |

**Self-check (J183).** One scratch mirror outside the project, isolation proven (no link into the project; the
workspace dependency's realpath inside the mirror); baseline 10 files 126/126; 14 targeted mutants K01 – K14, each run
`--maxWorkers=1 --bail=1` over `test/infill/planner/`, the file restored from the tree and `cmp`-checked: **14 KILLED,
0 survivors**. The pins of N1, N4, N9, N10, N11, N12 and L28 are red on the before code (K01, K03, K06, K08 – K12 are the
before code of their rows or the checks' own survivors).

**Behaviour (rule (3)) — two declared shifts, no golden or digest re-recorded.** (a) N9: on the planner's registered
families (below) 50 of 14 776 plans move from `nextRung` (`portalGap`) to a cut with the in-band nearer slide, all in
the portal family; no other plan's JSON changes (per-plan sha256 lines, before 5c77d452fab7e4c1…, after
f2b19105e637f8be…). (b) N4: a flattened cut whose A → foot crosses a ring is now the planner's typed step-5 result
instead of a cut step 8's judgement refuses ("cross no boundary"); the fabric then records rung (a) as `none` (`failed`)
instead of `refused`, and its rung (b) reads no far run from the failed plan (`startFar`), so that face's mean normal
falls back to the start's inward normal (M0-b-03's code, read only; reasoned, PLAUSIBLE — 0 such faces in the
registered families, 4 of 3 000 star-probe faces). RELATED@1000 (220 files) green: no golden, digest or CITY test moved.

**Refusal census (J264, N-58).** The planner's registered families — the eight faces × seeds 1 – 200 × three contexts
(default, MFCG, plot) = 4 800; attempts 1, 2 (2 880) and a reroll-3 / epoch-2 attempt (1 440) on seeds 1 – 60; a
bounding portal at seven offsets from each spine end and at both ends on seeds 1 – 40 (5 656): 14 776 plans. Refusals
(E_*) **6 before, 6 after** — E_NOT_TWO_CROSSINGS `far run`, `curved` seeds 25 and 26 at attempt 1 under each context
(R5-1, N14: LAWFUL; the typed step-5 hand-off to step 8's ladder, which cuts the face on a later rung; unchanged).
`nextRung` (an ok result) 2 455 → 2 405 (N9). The star probe (not a registered family): E_NOT_TWO_CROSSINGS `far run`
51 = 51, `flatten` 0 → 4 (LAWFUL holed faces; the same 4 faces reached the ladder before as a crossing cut it refused,
so the face-level count does not rise; MAKE-IT-SUCCEED for such a face is the ladder's rung (a) attempts 1 – 2, (b), (c)).

**L28 sweep (J424; the planner's floor instrumented in the mirror, no output changed).** Every ray–spine pair with
\|cross(dir, e)\| < 1 was logged with whether it would be a hit without the floor (t ∈ [0, reach], u ∈ [0, 1]): CITY
`runBase(FLAT_BLUEPRINT, seed, 'all')` seeds 1 – 7, 20, 23, 39, 44 (bugs [] each): 11 908 floor-refused pairs, **0 hits
refused by the floor**; the 1 100-task bent-cut family (`residueTasks(600)`, `signatureTasks(40)`, `fcutTasks(300)`,
with replays; 0 refused or failed at setup): 8 767 pairs, **0 hits**. So no end the planner meets is refused under the
floor (not even the expected near-parallel class: every near-parallel pair misses the segment or the reach anyway).
**Fusion 1, 2, 11, 30 were not run:** the fusion spike (`bench/src/fusion/`, M0-c-06's) is an empty index in this tree,
so the seeds cannot be derived here — REPORTED for the session (the ladder half's round, M0-b-03, or M0-c-06's seat).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| S1-1 | The fusion seeds 1, 2, 11, 30 of L28's sweep are not runnable in this tree (`bench/src/fusion/` is M0-c-06's and empty); the planner's floor is unchanged by this round (comment only), so no output can shift. | Run them in M0-b-03's L28 round (the ladder half, which does change a floor) or once M0-c-06 lands. | M0-b-03 (L28 ladder half) |
| S1-2 | A FailedPlan carries no far run, so after N4's `flatten` refusal the fabric's rung (b) averages no far normal (`startFar`). Adding `far` to `FailedPlan` would change an exported type (J263 Q1) — not this round's. | If rung (b) should keep the far normal there, the session rules a `far` field on `FailedPlan` (an API change). | — (session note) |

## Hardening round S1 — the closing check's notes (lane `check/M0-b-02-close-s1`, 2026-10-19)

These rows come from the closing check of round S1 (verdict and evidence in `checks/M0-b-02-s1.md`, which fails the
round on one blocker, B-S1-1: the `!keep` of N4's guard is held by no test, mutant M18). None of the rows below is a
blocker. Each fails safely or is a session note. Each is deliberately recorded here so a later seat does not find it
again.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| S1-c1 | **The star probe's `flatten` refusals, routed (J264, J290).** The checker's star probe uses its own generator: 3 000 star faces, 5 – 12 vertices, R 30 – 90 m, 30 % with a square hole; mulberry32 seed 20261019, streams `streamsFor(i + 1)`, default context and MFCG. It finds 65 E_NOT_TWO_CROSSINGS `flatten` results after the round, against 0 before. Each of the 65 was a straight cut crossing a ring before the round, so the planner's output got safer, and the registered families do not see the class. Examples by star index: 82 default; 879 and 1323 under both contexts; 2514 default; 99, 311, 345, 360 and 379 under MFCG. In all, 61 of the 65 are under MFCG. The input is LAWFUL (a holed face); at the planner the result is the typed step-5 hand-off. CONFIRMED. | The ladder's rung (a) attempts 1 – 2, (b) and (c) cut such a face. A face left refused at the end of its ladder would be a MAKE-IT-SUCCEED for M0-b-03; its ladder statistics on such holed faces name the rung taken. | — (session note; M0-b-03) |
| S1-c2 | **`alternate: null` now has two meanings under straightFirst.** It means either "the flatten alternate is caught in a portal's gap" (as before) or "the flatten alternate would cross a ring" (N4). Nothing reads the reason today, and `CutPlanned`'s type is unchanged (API frozen, J263 Q1). | If a reader ever needs the reason, the session rules a field for it (an API change). | M4 (or never) |
| S1-c3 | **L28's fusion seeds: S1-1 confirmed.** `bench/src/fusion/index.ts` is the scaffold's empty `export {}` (M0-c-06's), so fusion 1, 2, 11 and 30 cannot be derived in this tree. The planner's floor is unchanged (comment only). The checker's own sweep, with the floor instrumented in its mirror: the census families, 95 986 floor-refused pairs; CITY seed 1, 1 102; the 1 100-task family, 8 767. Each has 0 pairs that would hit. CONFIRMED. | As S1-1: run them in M0-b-03's L28 round or once M0-c-06 lands. | M0-b-03 |

## Hardening round S2 — the builder's notes (lane `build/M0-b-02-fix-s2`, 2026-10-19)

Further round 2 of the session's hardening round on M0-b-02, opened on the one failing line of the closing check
`checks/M0-b-02-s1.md`: **B-S1-1** (BLOCKER) — the `!keep &&` of N4's guard in `flattenPlan`
(`if (!keep && !segmentClear(sides.rings, A, far.foot, TOUCH_CM)) return 'crosses';`) was held by no test; mutant M18
(the guard without `!keep &&`) refused every kept-corner bent cut whose chord A → foot crosses a ring, and survived.
The required change is tests only, inside the owns; no source file is touched (`planner.ts` is byte-identical to the
S1 record, sha256 `023ed5d2c116d6b1…`).

| line | outcome | evidence |
|---|---|---|
| B-S1-1 | **pinned** (tests only) | `holed.test.ts`, describe *flatten on a holed face*, two new tests. (1) *a kept corner is never refused for its chord*: a constructed trapezoid (0, 0), (14 000, 0), (14 000, 12 000), (0, 5 000) whose slanted north side makes every plan keep a tall corner; seeds 1 – 40 under `CTX`, each planned first with a decoy hole in the south-east corner (as the N4 pin does, so the holed position law and frame are the same), then with a 600 cm diamond hole centred on the chord A → foot's midpoint. The test asserts with its own orientation test that the hole crosses A → foot and neither leg A–K nor K–foot, and that the plan is a `cut`, `bent` true, with legs exactly [A, K, foot] and the same start, corner and foot as the decoy plan; all 40 seeds pin. (2) *the checker's star 55*: the closing check's example face (outer ring and hole as `checks/M0-b-02-s1.md` B-S1-1 gives them), `CTX`, `streamsFor(56)`: a `cut`, `bent` true, legs [A, K, foot] whose chord crosses the hole and whose legs do not. **M18 KILLED** in the lane's mirror (`vitest run --maxWorkers=1 --bail=1 test/infill/planner/`: 1 failed, the new test (1)); without `--bail`, `holed.test.ts` alone under M18: 2 failed (both new tests), 6 passed. Restored and `cmp`-checked. Pre-round: M18 survives the S1 tests (the closing check's own run, NEAR 126 / 126). |

**The mutant table of this round.**

| id | target | NEAR (planner folder, 10 files) | pre-round tests |
|---|---|---|---|
| M18 | N4's guard without `!keep &&` (B-S1-1) | **KILLED** (both new pins red) | SURVIVED (`checks/M0-b-02-s1.md`) |

**Refusal census (J264, N-58).** The round changes tests only, so no plan moves: the registered families' E_* stay
**11 before = 11 after** as the closing check measured them (and the builder's S1 count, 6 = 6, on its smaller
families), `nextRung` unchanged, the star probe unchanged (`far run` 63, `flatten` 65). By construction: `planner.ts`
and every other source file of the item are byte-identical to the S1 record. The new pins add 41 lawful holed inputs
that the planner plans as bent cuts (none refused), and they hold the kept-corner side of N4 so that a regression that
adds refusals of lawful input, the thing B-S1-1 warned of, turns the planner folder red.

**Gates (in the tree, W = 1).** install --frozen-lockfile 0; lint 0 (eslint 1154 files, probe-red ok, 9 whole-tree
checks); build 0; NEAR `test/infill/planner/` 10 files 128 / 128; RELATED@1000 over `planner.ts` (the item's changed
source file), re-run by the resumed seat on 2026-10-20 (W = 1, the first run's log lost with the killed child): 220 files 2701 / 2701, exit 0 (9993 s; the S1 check's 2699 plus the two new pins). Gates re-run in the resumed seat: install 0, build 0, lint 0 (probe-red ok, 9 whole-tree checks), NEAR 10 files 128 / 128.
