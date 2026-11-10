# Refuter seat on lens q152-seq (a-09 S18 / S19 spec draft), 2026-11-10

I read every cite on this tree (head ccf1ed46, a shallow clone). I ran no test and made no edit outside this file. The
only git commands were reads (rev-parse, cat-file, show --stat). Findings SEQ-5, SEQ-12 and SEQ-13 were not handed to
this seat.

## Q152-SEQ-1: CONFIRMED
- `git rev-parse --is-shallow-repository` returns true, and `git cat-file -t dcf05e0c` fails. 9f631a41 (a-09
  S14–S17's landing, which the finding proposes as the "landed" tree) is **also** missing from this clone. 7a1fbaa6 is
  present.
- `git show --stat 7a1fbaa6 -- .../insert` confirms the five insert/ files were re-routed through arena/write.ts's
  setters. The old files store directly (e.g. stretch.ts's `p.vertices.level[v] = old`).
- a-06 S9's entry (specs.json rounds[132]) says "the undo log replaces the before-image for every op savepoint and dry
  run". On the RESUME head, therefore, direct stores from pre-door insert/ files are not in the log, and opSave /
  rollback cannot undo them.
- On top of that, mixing pre-dcf05e0c insert/ files into today's tree also mixes in a-05 S12 / S13 and every later
  API. A coherent build is unlikely.
- No S12F switch survives in kernel/src (grep), so the a-05 lane's "S11 model" is not available either.
- J728 (2) does bind: "for the three of N-s12-4 the cause found".
- **Caveat on the change.** That the pinned/landed pair reproduces green/red is unverified, because nobody ran the pins
  on 9f631a41. The child should run the three tests in both old trees before naming them.

## Q152-SEQ-2: PARTLY
- **True.**
  - LINE 9 judges by "line 5's definition oracle" (5 (i): vertices ≤ 1 cm + SAGITTA_CM, a 20 cm grid, 0 misses).
  - LINE 11's lawful test is exact: "no point of it deeper than 1 cm from every band edge lies outside all three bands".
  - Both are applied to CONSTRUCTION reads. network() and wideNetwork() use insertChain only (support.ts:376-388,
    :821-838), and no bands test calls splitFace (grep).
  - The design's relation for attracted cases is ARCHITECTURE.md:5405-5410: "face counts are not compared, because
    merging features closer than attractCm is the designed difference". Ruling (d) (N-43 / KI-13) is the bound.
  - Geometry, from the rings at hardening-s15.test.ts:52-54: a point such as (720, 2155) lies outside all three bands,
    so the island has interior beyond 1 cm. LINE 11 therefore brands today's two-ring outcome a defect. LINE 11's own
    parenthesis even names "the construction's class (b)" but then judges exactly.
- **Overstated.**
  - "fails on every engine" is false. The pinned engine kept the island, so line 11's "lawfully absent" test never
    arises there.
  - LINE 12 already judges "the depth oracle within the bound", and LINE 8 names deepestInWays, whose own comment uses
    "an insertion's move" as the bound.
- **Supporting fact.** The pinned island and hole themselves hold ring A's route corners (700,2119) and (400,2119), at
  depth = hw = 30. Even a restored three-ring outcome fails a 1 cm vertex oracle.
- Corrected claim and change: see the verdict.

## Q152-SEQ-3: PARTLY
- **Refuted for lines 10 and 11.** The "definition oracle" they invoke is line 5 (i), which is not vertex-only. It
  includes "every sample of a 20 cm grid over the child farther than 2 cm from all boundaries inside the derived kerb
  exactly when it lies in no spine's buffer". LINE 10 says "every point of face 1 in a spine's buffer"; LINE 11 says "is
  the island's interior in no band?".
- **True.**
  - The oracles LINE 8 names (spineDepth :703, deepestInWays :671, and clearOf / deepIn kerb.ts:688) read vertices only.
  - kerbs.get(1) = [] was already pinned (dryrun.test.ts:310); what changed is wholeBand (:312).
  - The title at :296, "commits it whole to the band", becomes false. LINE 10 does not restate it, whereas LINE 8 does.
- **Already covered.** LINE 10 already judges the wedge commit: "judge face 1 committed as band through a wedge lawful
  (... S8 ≡ S9, tilesExactly) ... face 1 asserted in cu.band and cu.wedges".
- **Remaining change.** Restate the title. The grid oracle's tolerance follows SEQ-2.

## Q152-SEQ-4: PARTLY
- **Refuted.** "Group A has no branch at all" is wrong. S18 rule (3) gives every line 8–13 a branch: "a red whose
  outcome is a defect is fixed only where the roots, the census and every other pin stay identical — else it is
  REPORTED with its cause and carried to 2B".
- **True.**
  - Rule (3) routes a defect to 2B (a-09). For group A, a defect would be a-05 S12's declared shift (C-0456 (1)), which
    a-09 cannot fix. Only lines 9 and 11 have the "a-05's engine: REPORTED for the session" branch.
  - LINE 7 (4) still demands "every test of kernel/test/arr/bands/ ... green".
  - S19 LINE 4 still says "Q152 closes ... with the six green", and it asserts network 561 "identical to S18". 2B has no
    line to fix a carried defect.
- So a REPORTED line leaves a red that the round's own gate and 2B's closing clause both contradict.

## Q152-SEQ-6: PARTLY
- **True.**
  - Once S8 and S9 read one state, the harness's S8 ≡ S9 cannot see a wrong state. The memo itself says so (§2: "Once
    S8 and S9 read one state, S8 ≡ S9 cannot detect a wrong state").
  - measure.ts:535-550 compares kerb() read after the derivation with corridorUnion's blocks.
  - S19 line 5 has no definition-depth bar over committed blocks.
- **Not shown.**
  - "Integrated 11 / 36 are blocks whose ROOT (construction) read holds the needle" is not what drift.test.ts:262-276
    says. "Unsplit" there means blockDrift with lanes [] (no lane cut through the stop region after S8 stopped). The
    face may still be a splitFace child, which would be DERIVED under the switch, and the derivation subtracts a lane's
    buffer exactly.
  - Q117 says only "a needle ... into a lane's band".
- **Covered for the named seeds.** S19 LINE 7 outcome (b) already makes a tip "deeper in a band than DRY_MOVE_CM by the
  definition oracle (a wrong kerb)" a-09's FIX with a pin, on the seeds of integrated 11 / 36.
- **Correct change.** Add the definition-depth bar over S9's committed blocks to line 5 (base beside tree). Line 7
  should not presume the outcome. It should state that a needle on a face without lineage moves into the committed
  model under the switch, and is then outcome (b).

## Q152-SEQ-7: PARTLY
- **True.**
  - Row 144 (a) (M0-a-09-notes.md:1670-1674) says "hw 64's three non-seam corners 64 → 32 cm" and "within the read's
    declared bounds or §3.7's attracted area bound".
  - Both faces in the pin are first (construction) reads, even after the switch. So the pin "every corner round, depth
    ≤ the lattice's 1 cm ... hw 20–400" fails at hw 64 with or without a seam fix.
  - S19 rule (3) says "DECLARES ONE SHIFT: S8 planned on the derived kerb ... any output move with another cause is a
    defect". Line 8 (a) nevertheless calls a construction-read change "a value of the declared shift".
- **Not supported.** The network 561 sub-claim. Ring A's first vertex is (400,1819) (support.ts:826), which lies on
  ring B's centreline (x 400, y 1055–1879, hw 264). The seam corner sits about 264 cm inside B's band, so a seam fix
  cannot change face 1's kerb there.
- **Correct change.** Rule (3)'s concern should name the B-FUZZ census and other construction pins, not network 561.

## Q152-SEQ-8: PARTLY (minor, not major)
- **True.** No bands test calls splitFace (grep), so the B-FUZZ census holds no derived face.
- **Already in the draft.** Q90's named counts (bandUnion's L3, kerb's root reads) stay constructions. The draft says
  so itself: "root reads and bandUnion's L3 read unchanged (both stay constructions)". Its own rule is "The class
  SURVIVES wherever a count above is non-zero".
- **Overstated.** "The counts cannot change" is too strong. corridorUnion's re-reads become served entries, so its
  KEPT_DEEP can change.
- **Cost.** The line costs only the census, which runs anyway. The real point is to ask for the memo's Q7 ruling now.

## Q152-SEQ-9: PARTLY
- **Verified.**
  - a05-s14 spec: "WHEN: after M0-a-06 S9 LANDS", plus "a-09's bands gate (read-only) as C-0456 (4)'s S13 column or
    declared per cell".
  - plan.json R02: waitsOn only "M0-a-09 S18 landed"; R09 / R10 carry the re-profile.
  - The S18 entry holds a-05 S14 until 2B, without a re-profile. The S19 entry holds it until 2B and the re-profile. The
    two entries disagree.
  - Wave 5 (a-08 S6, c-03 S5) waits on a-05 S14.
- **Weaker than stated.**
  - The plan's "S18" was written before the split, when it meant all of round 2. So holding through 2B is a defensible
    translation, not "longer than any spec asks".
  - The hold does not create the per-cell mechanism; a-05 S14's own bar does. The draft already excludes concurrency.
- **Valid core.** The re-profile hold is unjustified. Whichever order is chosen, a-05 S14's "declared per cell" must
  not leave a-09 reds with no a-09 round after it.

## Q152-SEQ-10: CONFIRMED
- M0-work.json gives these owners:
  - layout/test/infill/bands/ → b-01
  - layout/test/districts/ → e-04
  - layout/test/enceinte/ → c-02
  - bench/test/bentcut/ → b-04
  - model/test/digest/ → d-04
  - kernel/test/facade/ → a-16
  - layout/test/infill/fabric/ and testkit/test/layout/infill-fabric/ → b-03
- S19's SEQUENCING holds only "M0-a-09's owns or arr/kerbState.ts".
- tools/flow_stage.mjs:46-51: busyOwners holds a path out while its owner is busy.
- The memo's table lists "b-03, b-04, d-04?, a-16 …".

## Q152-SEQ-11: PARTLY
- **Wrong.** "S19 never names Q126": S19 LINE 1's title carries "(Q126)".
- **True.**
  - No entry and no choices row states Q126's fate at 2B's landing.
  - Two of its bars cannot be met there: "S8 ≤ 16 ms a cut" is informative under J558 (2), and "S8 ≡ S9 on every seed"
    is the session's Q6 (queue :140).
  - plan.json RL14 still says "close Q111 at a-09 S18's landing", while the draft's ruling (a) says 2B.

## Q152-SEQ-14: PARTLY
- **Confirmed.**
  - kernel/src/index.ts:21-22 re-exports faces/ and arr/.
  - 34-session-fix.js adds HANDOFF and settle to check seats only (`args.check += HANDOFF`; build and further-round
    build seats get no settle).
  - S18 line 7 (5) requires an idle box (load < 0.3).
- **The "~2 h" figure is an upper bound, not a measurement.** RELATED over kerb.ts alone already reaches every
  barrel importer: 5 121 s, 363 files (row 145). split.ts adds only its by-path importers that are not already reached.
  The whole suite is 7 335 s (J738). The selection's size lies between those two; I did not run `related`.

## Missed
The old pins of network 561 put island and hole vertices on ring A's route corners: (700,2119) and (400,2119), at
depth = hw = 30 cm. So any definition-style VERTEX oracle at 1 cm + SAGITTA_CM, applied to a construction read, fails
even the pre-a-05 outcome. That strengthens SEQ-2: the exact oracle cannot be the bar for any of the six construction
reads.

S19 LINE 4 asserts network 561 "identical to S18". It also offers no route for a test that S18 carried to 2B as a
defect, while S18 rule (3) routes such defects to 2B. The two entries leave a carried Q152 defect with no owning line.
