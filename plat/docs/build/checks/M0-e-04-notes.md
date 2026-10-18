# M0-e-04: minor notes for the hardening milestone M4 (check/M0-e-04, 2026-10-06)

Under J180 and N-45 none of these notes fails the item; the blockers are B-1 and B-2 in `checks/M0-e-04.md`. Each note is a
KI row for the hardening pass. The probes and mutants live in `~/maps-scratch/waves/check-M0-e-04/` (mirrors only).

1. **KI — `quarterTree`'s shape differs from the brief's `quarterTree(districts): QuarterNode`.**
   * The code is `quarterTree(leaves, adjacency, opts): QuarterTree`, whose `root` is the `QuarterNode` and whose
     `nodes` and `cut` carry the rest. The adjacency and the options (N_q, the two penalties, the node ids) cannot be
     derived from district records alone, so the extra arguments are needed. No choices row names the shape, and no M0
     item consumes the function (S6 calls it and hands `quarters` on).
   * **Hardening:** a sentence in a choices row naming the signature (or a thin `quarterTree(districts)` wrapper).
2. **KI — the edge test's water clause and the water seeds have no test on a water fixture.**
   * §4.5's edge test refuses water, and `siteFeatures` seeds `riverbank` (the longest bank) and `bridgehead` (each
     built bridge of class ≥ primary). No item fixture carries a river, so no listed test reaches the `WATER` bit, the
     `shore` anchor or the bridge anchor.
   * Probe P6 (this seat): a `bank` chain laid over the middle line of a 4 × 1 grid stops a grower at the line (its
     district holds cells 0 – 1; the leftover rule seeds cells 2 – 3), and the `shore` anchor seeds a cell on the bank.
     The code honours the clause. **CONFIRMED.**
   * Mutants M09 (the `WATER` bit dropped from the edge test) and M10 (the `RESERVED` bit dropped) survive. Both are
     equivalent on every M0 input, which is why they are notes: a water body and a reservation are always faces S6
     does not claim (a water face is the body's, or lies over its L0 face; a reservation's barrier face keeps its
     owner, C-0245 (2)), so a `shore`, `bank` or `reserved` edge always has an unclaimable side and never separates two
     claimable faces. **PLAUSIBLE** (reasoned from `faces.ts` and `stage.ts`; P6 shows the bit acts when a bank does lie
     between two land faces).
   * **Hardening test:** the stage on a fixture with a river and a built bridge (M0-e-06's site spike has both):
     no district holds both sides of a shore or bank, one `riverbank` seed per river, two `bridgehead` seeds per
     qualifying bridge.
3. **KI — three tuning constants live in code.** `LLOYD_ROUNDS` (4, seeds.ts), `UNLOOP_WINDOW` (64, perimeter.ts) and
   `PREFER_PENALTY` (10¹⁶, seeds.ts) are algorithmic constants of C-0245's readings, not §4.5's rates or laws (every
   one of those is a `district.json` cell, CONFIRMED in law.test.ts and by reading `table.ts`). They could become
   cells with `unit`, `provenance` and `calibratable`.
4. **KI — `s6.json` sits outside the run's TableView.**
   * `s6Table()` parses `s6.json` with `parseTable` (so every cell carries unit, provenance and calibratable), but the
     table is not in `@plat/tables`' registry: `typingCells(s6Table())` and `minBarrierClass()` in `s6Batch` and in
     `siteFeatures` read the default table and ignore `input.tables`, and the cells do not enter the run's table hash.
   * **Effect:** a calibration or a test variant of the synthetic demand table cannot be handed in through the run's
     tables. The table is C-0035's stand-in, replaced by the roster at M1.
   * **Hardening:** register `s6` with the tables or thread `input.tables` through `typingCells` and
     `minBarrierClass`.
5. **KI — F-WORK's work-cut runs and the degenerate-face merge use a one-edge test.**
   * At `grower.turns`' limit every unowned claimable face joins the run it reaches across one passing edge; the
     grower's own rule (every edge shared with the patch passes) is not applied, so a run could hold a barrier edge
     between two of its members (an arterial dead-ending at a secondary junction, say). Probe P5 (seed 4 at limits
     0, 1, 60 and 200; seed 4 is the stage test's): 0 districts hold an arterial, the wall, a reservation boundary
     or the border. **CONFIRMED on the fixture.** It fails safely: containment holds (`unowned` 0).
   * **Hardening test:** a grid whose arterial dead-ends inside a compartment, under a turn limit of 0.
6. **KI — the merge rule does not re-run the patch test's hole check.**
   * A district merged into a neighbour sharing two disjoint boundary pieces with it would enclose a hole. Probe P13:
     0 final districts with more than one boundary loop and 0 below compactness 0.5 over seeds 1 – 12 and seed 4 at
     four F-WORK limits. **CONFIRMED on the fixture.** §4.5 names the patch test for growth, not for merges.
7. **KI — C-0245 (18)'s disclosure names only the −2 misses.** On seeds 101 – 200 (probe P2) the count law holds on 99
   of 100 seeds; the miss is seed 121 at **+2** (19 districts against N_d 17, with 5 districts left below the floor —
   slow gate wards kept by the seed-rate exception or districts with no neighbour across a passing edge). The gate
   bar holds on 97 of 100. The bar's own 100 seeds pass (bars.test.ts). M0-e-06 re-judges both bars on the
   integrated pipeline.
8. **KI — `settlementPerimeter`'s frame test uses the frame's bounding box.** `within` compares the ring with the
   frame's bounding box, so a non-rectangular frame would skip the clip. Every M0 frame is a rectangle (§3.2 (9)).
9. **KI — no fixture has an outside region cut off from the frame (mutant M38 survives).** `faceGraph` marks a face
   *outside* when it is reachable from the margin without crossing the perimeter. M38 also blocks that walk at
   arterials; it survives because every outside region of the fixtures touches the frame (the through roads run to
   the frame). A ring road or a wall loop outside the perimeter that encloses land would separate such a region.
   Under the item's rule it is still outside (correct); no test holds it. **Hardening test:** an arterial loop between
   the perimeter and the frame; its enclosed faces take the hinterland's id.

## Closing round 1 (check/M0-e-04-close-r1, 2026-10-06): KI notes 10–15 under N-45 (J202) and N-48 (J214)

B-1 and B-2 are fixed, and the item passes (`checks/M0-e-04.md`). Each row below fails safely or is a test gap on code
this seat's probes confirm correct. The probes and mutants are in `~/maps-scratch/waves/check-M0-e-04/close-r1/`, in
mirrors only.

10. **KI — the sum check falsely refuses correct overlay rings on boundaries with collinear vertices (route: M0-e-06 /
    the M0 close, before S6 meets real stage outlines; M4 at the latest).**
    * **The cause.** `isSumRing` passes a ring edge only when both its ends lie within d + tol of *one* boundary edge.
      The overlay's arrangement merges collinear ring vertices, so one ring edge can run 50 m beside several collinear
      boundary edges. Then no single edge is near both ends, and `settlementPerimeter` refuses `E_INVARIANT` ("the
      overlay's outer ring is not the boundary's offset"). For example, comb 9 has a 684.59 m ring edge beside its
      subdivided bottom (`pB2.txt`).
    * **The rings it refuses are right.** On every refused case, the overlay's own outer ring and
      `settlementPerimeterByBuffer` are right by the sum's definition: 0 boundary-land points outside, 0 near points
      outside and 0 far points inside, on about 59 000 samples each. **CONFIRMED.**
    * **Measured rates** (`pB1.txt`, `pB3.txt`):
      * ribbon-finger outlines with each edge split in two: **18 of 18** refused, against 0 of 18 unsplit;
      * combs with collinear-subdivided edges: 16 of 60, against 0 of 60 with the collinear vertices removed;
      * stars with each edge split in two: 4 of 40; split in three: 3 of 40;
      * flat-fixture outlines 1–30 at 50 m, 24 grown outlines, 90 jittered rings and towns 1–20: 0.
    * **It fails safely.** The refusal is typed, and nothing wrong is committed. The fast rings are unaffected, because
      the convolution keeps a vertex at every boundary vertex. It also contradicts C-0252's sentence that no overlay
      ring fails the check (B1g "equivalent").
    * **Suggested handling:** in `isSumRing`, merge collinear consecutive boundary edges before the near test, or test
      the upper bound against the nearest boundary edges along the ring edge (split at most d apart). Add finger-split2
      and comb rings to `perimeter.test.ts`, each asserting `ok` and the definition.
11. **KI — the refusals at a large offset (C-0252 (5), confirmed).** At an offset of 180 m, 6 of 30 flat outlines (3,
    8, 9, 10, 11, 16) refuse `E_INVARIANT` (`pB4.txt`). One dense slit blob (seed 22) at 50 m is refused by the
    union's clearance rule (N-43): "no route … keeps clearance (§3.10) within the fidelity bound". Both are typed.
    S6's 50 m cell is unaffected on every natural outline measured. **Hardening (M4):** a calibrated
    `district.perimeter.offsetM` far above 50 m needs the overlay path to succeed.
12. **KI — no test isolates three clauses of the sum check (mutants N02, N03, N04b survive).**
    * The three clauses are the enclosure clause (the boundary's first vertex inside the ring), the crossing test
      `meet`, and the lower bound's boundary-vertex-to-ring-edge terms.
    * Each is a defence. The fast and overlay constructions never trip it on any ring measured, so the survivors are
      equivalent at those inputs. That is PLAUSIBLE for N03 and N04b.
    * Probe P5 confirms the enclosure clause. A C-shape whose mouth is 90 m has a hole in its sum. That hole's ring,
      reversed, has every vertex 49.72–50.01 m from the boundary. The real code refuses it; under N02 P5 fails
      ("expected true to be false").
    * **Hardening test (M4):** P5's hole ring; a ring edge passing 30 m from a spike tip with its ends near one
      boundary edge; an X crossing of a long ring edge and a long boundary edge.
13. **KI — the run-unit keys have no pinning test (N21, N25, N26, N27 and N28 survive).**
    * The keys are C-0245 (17)'s: the hinterland is (the town, S6, 2³² − 1); the seams are under (the town, S6,
      2³² − 2), indexed by their run's lowest-then-leftmost vertex; the quarter nodes are under (the town, S6,
      2³² − 3).
    * `renumber.test.ts` holds them slot-free, but no test pins the key itself.
    * Probe P5 (`pB5.txt`) derives every id from the arena on seeds 4 and 121, and all match. There are 0 mismatches
      over 43 and 52 seams (ties matched as sets), and every one of the 33 and 37 quarter nodes is under its unit.
      **CONFIRMED.**
    * **Hardening (M1, when the hinterland unit lands; else M4):** P5's derivations as a stage test.
14. **KI — `largestOuter`'s choice of the largest ring is untested (N14 survives).**
    * The union of the boundary and the full convolution has one outer ring, so on the overlay the mutant is
      equivalent (PLAUSIBLE).
    * A frame clip can split the perimeter into pieces when it leaves the frame and re-enters it. The code then keeps
      the largest piece. No test reaches that case, and dropping the smaller pieces is itself unspecified.
    * **Hardening test (M4):** a boundary hugging the frame with a notch, so the clip splits the perimeter, together
      with the rule for the pieces it drops.
15. **KI — the overlay's outer ring is not checked for simplicity.**
    * `isSumRing`'s argument (a simple ring in the shell, enclosing the boundary, is the sum's outer ring) assumes a
      simple ring. The fast rings pass `simpleCcw`. The overlay's ring is trusted to `booleans`' contract.
    * No failure was seen. PLAUSIBLE.
    * **Hardening (M4):** apply `simpleCcw` to the overlay's ring as well.

## Session fix round S1 closing check (check/M0-e-04-close-s1, 2026-10-07): KI note 16 under N-45 (J202)

The N-51 fix passes (`checks/M0-e-04-s1.md`). The row below is a test gap on code that this seat's probe confirms
correct. The probe and the mutants are in `~/maps-scratch/waves/check-M0-e-04/close-s1/`, in mirrors only.

16. **KI — no committed test pins the wall strips' exclusion when S1's `land:<n>` owners are present.**
    * `land.test.ts`'s fixture (`support.ts` `town` with `landOwner`) has the plaza's reservation but no wall strips.
      Its reservation test therefore covers the C-0245 (2) exclusion for the plaza only. `run.test.ts` (M0-x-04's)
      asserts nothing about owners.
    * Probe (this seat): `base.ts`'s S6 adapter was instrumented in a mirror to sum the area of each owner at L0 and L1
      before and after S6's run, on the base run (900 ha, 30 ha walled), flat seeds 1–3 and river seeds 1 and 3. In
      every run, each L1 area of `wall_strip:1-inner`, `-1-outer`, `-2-inner`, `-2-outer`, `plaza:0` and (river 1)
      `water:river:0` was equal before and after S6. The L0 owner areas were identical. No owner other than the
      districts and the hinterland appeared. **CONFIRMED.** Mutant K06 (`s6Takes` accepting any owner) is killed only
      through the plaza.
    * **Hardening test (M4, or M0-e-06 on the integrated pipeline):** a `land.test.ts` case on `cityRun` or
      `growthRun` (both carry c-04's strips) with the land owner set, asserting that every strip face keeps its owner.

## Session fix round S2 closing check (check/M0-e-04-close-s2, 2026-10-11): KI note 17 under N-45 (J202)

The N-56 (2) Q21 fix passes (`checks/M0-e-04.md`, top section). The row below is the hardening step the ruling named,
recorded here as the ruling (N-56 (2)) and C-0305 (5) ask. The probes are in this seat's mirrors under the session
scratchpad (`waves/check-M0-e-04/`), in mirrors only.

17. **KI — a non-simple boundary the kernel's union cannot insert is refused, not absorbed (the optional union-outer
    pre-step).**
    * After the round, S6 still refuses the coincident ring (the outline given twice round) on SMALL_FLAT seed
      2708765650 with `E_INVARIANT settlementPerimeter: the union: insert: no route from (-20142, 2587) to (-20177,
      2577) keeps clearance (§3.10) within the fidelity bound (N-43)`, and nothing is committed (this seat's chain
      probe, with the fix and with the pre-round code: the same refusal). This is typed and fail-safe, a refusal of an
      unlawful input (N-56 (2): lawful). CONFIRMED.
    * The self-touching ring on 2191303060 is now absorbed. Its refusal was the collinear defect (C-0305 (4)): this
      seat planted the same self-touching ring on the outline with its two collinear vertices removed by the probe's
      own merge, and the pre-round code then commits it with the fix's exact S6 output. CONFIRMED.
    * **Hardening (M4):** an optional pre-step that reads a non-simple boundary as the outer ring of its own union
      before the convolution (the ruling's union-outer pre-step) would let S6 absorb more self-touching and coincident
      rings. Test: the coincident and self-touching kinds of M0-x-06 on the SMALL_FLAT seeds, each either absorbed with
      a sum-checked perimeter or refused typed, never committed wrong.

## The builder's notes, consolidation round C1 (lane `build/M0-e-04-consolidate-1`, 2026-10-13): R9 of `consolidation/layout-plan.md` §1.6, §2, §3

The round changes no behaviour. The districts read siting's geometry helpers and constants and the kernel's
`compareKeys` by path. S6 reads the typing table's cells once. The folder's tests share their equal helpers from
`test/districts/support.ts`, and the comments that narrated rounds now state the rules. No folder index or barrel
changed: `src/districts/index.ts` and `src/index.ts` are byte-identical to main's blobs. The file-level export names of
the six changed sources are identical before and after. One file-level form changed: `perimeter.ts` `meet` became
`export { segmentsMeet as meet } from '../siting/geom.js'`. The name is kept and its parameters widen from `LatticePoint`
to siting's `XY`, of which every `LatticePoint` is one. `districts/index.ts` does not list `meet`, and no file imports it.
The before-image is main's committed files, read from `.git/index` and the pack by a Python reader with no git command
run. It equals M0-e-04's s2 landed record, 20 of 20 owns hashes.

**Old → new map (J263 Q8).** No file was renamed, split, merged or moved, so the map is per helper.

| old (before this round) | new |
|---|---|
| `src/districts/perimeter.ts` private `segDist2(px, py, ax, ay, bx, by)` (`isSumRing`'s four distances) | `src/siting/geom.ts` `distToSegment2(p, a, b)`, called with the points themselves: the point first, then the segment, as before |
| `src/districts/seeds.ts` private `segDist2(p, a, b)` (`faceDist2`, `ringDist2`) | `src/siting/geom.ts` `distToSegment2` |
| `src/districts/perimeter.ts` `meet`'s body (exported file-level, not listed by the index) | `export { segmentsMeet as meet } from '../siting/geom.js'`. Perimeter's own three callers (`isSumRing`, `simpleCcw`, `unloop`) call `segmentsMeet`. |
| `src/districts/quarters.ts` private `HA_CM2`; `stage.ts`'s four `100_000_000` literals | `src/siting/geom.ts` `HA_CM2` |
| `src/districts/stage.ts` private `GROUND = { layer: 'ground', part: 0 }` | `@plat/site` `GROUND_KEY` (the same value, frozen) |
| `src/districts/stage.ts` `typingCells(s6Table())` read twice (the typing, then the families) | one `const demand = typingCells(s6Table())` read by both |
| `src/districts/faces.ts` `polsbyPopper`'s literal `3.141592653589793` | `src/siting/geom.ts` `PI` (the same literal) |
| `src/districts/typing.ts` and `quarters.ts` comparator `(a < b ? -1 : a > b ? 1 : 0)` | `@plat/kernel` `compareKeys` (`kernel/src/arena/keys.ts:13`, the same body) |
| `test/districts/collinear.test.ts` and `perimeter.test.ts` private `kernel()` | `test/districts/support.ts` `kernel()` |
| `test/districts/grow.test.ts` `graphOf`, `cell`, `claimableOf`; `seeds.test.ts` `graphOf`, `cell`, `land` | `support.ts` `graphOf`, `cell` (grow.test's form), `claimableOf` |
| `integration.test.ts` `RUNS` + `city`, `stage.test.ts` `RUNS` + `run`, `walls.test.ts` `RUNS` + `run` | `support.ts` `bySeed` (a per-file cache keyed by seed). The S6 call with its refusal throw went to `s6Run`, whose text `S6 refused: <code> <detail>` is unchanged. |
| `quarters.test.ts` and `typing.test.ts` `const HA = 100_000_000` | `support.ts` `HA` |
| `law.test.ts` `districtWith(row, cell, value, base)` | `support.ts` `tableWith('district', row, cell, value, base)`: the same body, with the table id as a parameter (`perimeter.test.ts` already read it) |

**Kept because the bodies differ** (§3's row moves only equal bodies):
* `stage.test.ts` keeps its `graphOf(t)`, which reads `t.out.hinterland` as the perimeter, where support's reads `'none'`.
* `SEEDS` differs between `bars.test.ts` (1 – 100) and `stage.test.ts` ([4, 11]).
* The two `run`s are now both `bySeed`, each with its own maker: `townS6`, and `growthRun` followed by S6.

The oracles `area2Of`, `insidePoly`, `ringDist` and `hullArea` stay in `support.ts`, independent of the code. So do `town`,
`cityRun`, `growthRun`, `gridArena` and `rectArena`.

**One nuance in the test move.** For a cell centre no graph face holds, `seeds.test.ts`'s old `cell` returned
`findIndex`'s −1. The shared form (grow.test's) throws 'no cell index' instead. It is stricter only: no case reaches the
branch (mutant S06, which drops the throw, survives), and every `seeds.test.ts` assertion is unchanged.

**Equivalence, finding by finding.**
* **1.6.1.** Both helpers compute `t = quot((p − a)·(b − a), |b − a|², 'area', …)` and clamp it to [0, 1]. They return
  `ex² + ey²`, where `e = a + t·(b − a) − p`.
  * The guards agree. `l2 > 0` and `len2 === 0 ? 0 :` are the same on lattice ends, whose squared length is an integer
    ≥ 1 or exactly 0.
  * The clamps agree except on −0. The if-chain keeps a −0 where `Math.max(0, −0)` gives +0. That adds ±0 to a
    coordinate, which the square equalises.
  * The `quot` text 'a segment projection' becomes siting's 'segment foot'. It is unreachable behind the guard (J302 Q10).
  * The earlier container's direct check found 0 mismatches over 1 000 000 random cases.
  * `isSumRing`'s two-object call measured 2 010 ms against the six-number form's 2 176 ms (informative, this machine),
    so no wrapper was kept.
* **1.6.2.** `segmentsMeet` is `meet`'s statements, with the final `||` chain written as four `if`s in the same order.
  The earlier container's direct check found 0 mismatches over 1 000 000 cases.
* **1.6.3.** The same integer, 10⁸.
* **1.6.4.** No call mutates the table's object, so one object is the same as two.
  * `typingCells` (`table.ts:47`) builds a fresh object per call.
  * `typeDistricts` (`typing.ts:41 – 89`) reads `demand.kinds` through `for … of` and `find`, and reads the three
    scalars. It writes only its own `remaining` map and `out` array.
  * `familyOf` maps `demand.kinds`. These are `stage.ts`'s only two reads of `demand`.
* **1.6.5.** `PI` is the same literal. `compareKeys(a, b)` is the inline body.
* **1.6.6, kept apart.**
  * `perimeter.ts` `crossing` (`den === 0 → null`) and `plane.ts` `crossParams` (`|den| < 1 → null`) are untouched.
    So is `seeds.ts` `d2`.
  * For `GROUND` → `GROUND_KEY` (J302 Q6), the kernel keys arenas by value. `kernel/src/facade/kernel.ts:105`
    `platOf` does `arenas.get(keyText(key))`, and it backs `plat`, `tx` and `index.rebuildAtStageEnd`.
    `kernel/src/arena/plat.ts:248` `sameKey` compares layer and part.
  * Otherwise S6 reads the key only as a value, into `lineageHash`, `townLineage` and `entityKey`. No reader keys by
    identity, and S6 never writes the key.
* **1.6.7.** The comment changes:
  * `mergeCollinear`'s header keeps its rule (N-56 (2), C-0305 (2)) and drops ": zero shift".
  * `isSumRing`'s header names the two helpers.
  * The test headers' round narration became the rules they pin: `collinear.test.ts` "session fix round S2 … before the
    round"; `land.test.ts` "session fix round S1"; `walls.test.ts` "integration fix round 1: the stage-group-13 check's
    B-1"; `perimeter.test.ts` "fix round 1 of the first check's B-1", now C-0252; `stage.test.ts` "fix round 1 of the
    first check's B-2".
  * Two "zero shift … before the round" goldens are now "the golden". Their values are unchanged.
  * `isS1LandOwner`/`s6Takes` (N-51, C-0265) are untouched.
  * `LLOYD_ROUNDS` and `UNLOOP_WINDOW` stay as they are (note 3).
* **1.6.8.** As the map shows. The folder has 12 files with 27 describe and 94 it, the same titles before and after,
  read by a title extractor over both images. Titles that name a round (`perimeter.test.ts` 'the first check's B-1',
  `walls.test.ts` 'the g13 integration check's B-1', `collinear.test.ts` 'Q21', 'unchanged by the round') stay verbatim
  (§3).

**NO-SHIFT.**
* This seat's probe ran in the lane's mirror on main's blobs and then on the round's owns. Both runs give 48 lines,
  byte-identical (sha256 6beddf2a6fd1fa10…). The probe covers:
  * towns 1 – 40: the perimeter, S6's output and the committed L1 owners, digested;
  * the flat CITY fixture 1 – 4 (`cityRun`) through S6;
  * `growthRun` 1 – 2 through S6;
  * `polsbyPopper` over 100 000 cases.
* The earlier container's probe (lane log, 08:05) gave 406 lines, byte-identical (sha256 e6e99725…). It covered the 1 M
  + 1 M direct cases, 330 perimeters with `isSumRing`'s truth tables, the unit functions, and S6 on towns 1 – 100,
  F-WORK limits, `land:0`, seed 121, CITY 1, 2 and 4, growth 1 – 4 and `runBase` flat/river × 3. Its cross runs gave
  new tests on old sources 99/99 and old tests on new sources 99/99.
* The goldens pinned in `collinear.test.ts` are green in the tree's NEAR: the 100 perimeters' digest 0617ad24… and seed
  1165799859's perimeter 6455a8e4….

**Refusals (J264 (5), N-58).** S6 refused 0 runs before and 0 after (this seat: towns 1 – 40, CITY 1, 2 and 4, growth
1 – 2; the earlier container: towns 1 – 100, CITY 1, 2 and 4, growth 1 – 4). One fixture run refuses upstream of S6,
identically before and after, and S6 never runs on it (N-c1b-5).

**Gates** (the tree, this round's final files, on this container):
* `install --frozen-lockfile` 0.
* `lint` 0: eslint 1 155 files, probe-red ok, 9 whole-tree checks.
* `build` 0.
* NEAR `packages/layout/test/districts/` + `packages/testkit/test/layout/districts/`: 14 files 99/99 at full strength.
* RELATED at `PLAT_FUZZ_RUNS=1000` over `faces.ts`, `perimeter.ts`, `quarters.ts`, `seeds.ts`, `stage.ts` and
  `typing.ts`: 218 files, 2 637/2 637, exit 0 (7 883 s, one worker).

**Mutants.** The earlier container's sweep (33 mutants, 10:02) was lost with its mirror and definitions. This seat
re-ran a targeted sweep in a rebuilt lane mirror (`vitest run --maxWorkers=1 --bail=1 packages/layout/test/districts/`,
each file restored and `cmp`-checked). The ids below are this seat's: the recorded ids keep their check-table meanings,
and the rest are defined here. A twin (`…b`) is the same fault on the pre-round image (main's blobs swapped into the
mirror's owns).

| id | finding | where | the fault | result |
|---|---|---|---|---|
| N04 | 1.6.1 | perimeter `isSumRing` | the lower bound removed | killed: perimeter 'where the fully mitred ring fails the check … (stars 2, 3, 7)' |
| N04b | 1.6.1 | perimeter `isSumRing` | the lower bound without its two boundary-vertex terms | survives, as recorded (note 12) |
| N13 | 1.6.1 | perimeter `isSumRing` | the grid search not widened by d + tol | killed: integration 'every land face held …' |
| M34 | 1.6.1 | perimeter `settlementPerimeter` | the offset × 90 | killed: perimeter 'every perimeter vertex lies 50 m from the boundary …' |
| K06s2 | 1.6.1 | perimeter `mergeCollinear` | near-collinear merged (\|orient2d\| ≤ 2·10⁶) | killed: perimeter 'equals §3.4's buffer …' |
| D01 / D01b | 1.6.1 | seeds `faceDist2` | the distance to the nearer endpoint for the segment's | killed on both images: seeds 'a point anchor's side (C-0257) …' |
| D02 / D02b | 1.6.1 | seeds `ringDist2` | the distance to the side's first vertex | killed on both images (same) |
| N03 | 1.6.2 | perimeter `isSumRing` | the crossing test removed | survives, as recorded (note 12) |
| B01 | 1.6.2 | perimeter `simpleCcw` | never meet | killed: perimeter 'the raw curve folds in a narrow concavity …' |
| B02 | 1.6.2 | perimeter `unloop` | never meet | killed (same) |
| M22 | 1.6.3 | law `countLaw` | floor for round | killed: law 'N_d = round(…)' |
| M23 | 1.6.3 | stage | one remainder seed too many | killed: bars 'containment 100 % …' |
| H01 | 1.6.3 | quarters | `familyCost` at 10⁶ cm² per ha | killed: quarters 'kinds of different families cost 1 000 ha more …' |
| H02 | 1.6.3 | stage | `landHa` at 10⁶ cm² per ha | killed: integration 'every land face held …' |
| M31 | 1.6.4 | typing | typed from the smallest | killed: walls 'extramural …' |
| M33 | 1.6.4 | stage | typing on `district.seed` | killed: walls 'extramural …' |
| N23 | 1.6.4 | typing | two uniforms per kind | killed: walls 'extramural …' |
| M14 | 1.6.5 | grow | the compactness test removed | killed: grow '… compactness … (an L-shaped corridor)' |
| M29 | 1.6.5 | quarters `lessId` | ties by the larger id | killed: quarters 'ties by id …' |
| Q01 / Q01b | 1.6.5 | quarters | `members` in reverse `compareKeys` order | killed on both images: quarters 'the smallest combined area merges first' |
| P01 / P01b | 1.6.5 | faces `polsbyPopper` | π → 3 | **survives on both images** (N-c1b-1) |
| T01 / T01b | 1.6.5 | typing | the tie order by id reversed | **survives on both images** (N-c1b-2) |
| G01 / G01b | 1.6.6 | stage `s6Batch`, `runS6` | the default key { ground, 1 } | **survives on both images** (N-c1b-3) |
| S01 | 1.6.8 | support `graphOf` | `minBarrierClass` 'secondary' | killed: grow 'a round gives every unfinished grower one turn …' |
| S02 | 1.6.8 | support `claimableOf` | the margin clause dropped | killed: grow 'a primary or through line stops growth …' |
| S03 | 1.6.8 | support `HA` | 10⁷ | survives: equivalent (N-c1b-4) |
| S04 | 1.6.8 | support `bySeed` | every seed answers the first run | killed: stage 'N_d seeds in all …' |
| S05 | 1.6.8 | support `kernel()` | a 1 km arena for 10 km | survives: equivalent (N-c1b-4) |
| S06 | 1.6.8 | support `cell` | the 'no cell index' throw dropped | survives: equivalent (the nuance above) |
| S07 | 1.6.8 | support `s6Run` | S6 at epoch 1 | killed: walls 'two runs of one seed on two enceintes are identical …' |

Tally: 30 after-image mutants, 22 killed and 8 surviving. Two survivors are as recorded (N04b, N03), three are
inherited (P01, T01, G01: their twins survive the pre-round tests too), and three are equivalent test-helper faults
(S03, S05, S06). Of the six twins, three are killed and three survive.

**Notes for M4 (hardening; no change here).**
* **N-c1b-1 — `polsbyPopper` has no reader and no pin.** P01 and P01b survive. The function is exported by
  `districts/index.ts`, and no source, test or bench file reads it. Its header says "reported beside the patch test's
  measure", but no report carries it. This round changed only its π, to the same literal, and left the header. Harden
  M4 in one of two ways: pin it (a square's π ÷ 4, a disc's 1 within the chord error), or drop the header's report
  claim and name its reader when one exists. CONFIRMED (survival; grep).
* **N-c1b-2 — typing's tie order by id is unpinned.** T01 and T01b survive. Two districts of equal area are typed in
  `compareKeys` order of their ids. No test builds an equal-area pair, and the registered fixtures' areas are distinct.
  Harden: a `typing.test.ts` case of two equal-area districts competing for one kind's demand. CONFIRMED (survival).
* **N-c1b-3 — S6's default arena key is unpinned.** G01 and G01b survive: every test and the composer pass
  `key: GROUND`. The earlier container's probe found S6 with no key equal to the keyed runs on towns 1 – 10. Harden:
  one `stage.test.ts` case with `key` omitted, equal to the keyed run. CONFIRMED (survival).
* **N-c1b-4 — two equivalent test-helper faults.** Both are equivalent on the folder's tests. PLAUSIBLE (the reasons);
  CONFIRMED (survival).
  * S03: `quarters.test` and `typing.test` read `HA` only through orders and shares that scale with it. The quarter
    penalties are 1 000 ha and 10 000 ha in the code's own `HA_CM2`, so smaller leaves keep every merge order.
  * S05: the perimeter's overlay reads the lattice, not the arena's frame size.
* **N-c1b-5 — for the session (J264, N-58).** `cityRun`'s fixture at seed 3 refuses before S6 runs, identically
  before and after this round. CONFIRMED (probe, both images).
  * **The refusal.** The fixture grows stage 1's outline by 180 m through `settlementPerimeter`, used as a fixture
    tool. That call refuses with `E_INVARIANT settlementPerimeter: the union: insert: no route from (77760, -15539)
    to (77930, -15099) keeps clearance (§3.10) within the fidelity bound (N-43)`. At 50 m, S6's own offset, the
    same outline gives a ring of 1 140 points, and seeds 1, 2 and 4 pass at both offsets.
  * **Its class.** The input is LAWFUL: the flat CITY fixture's S3 outline. The verdict is MAKE-IT-SUCCEED. This is
    note 11's class (C-0252 (5): the overlay path at an offset far above 50 m) and note 17's union clearance.
  * **Who reaches it.** No registered S6 run does, and no test runs `cityRun(3)`. Route it with the seed to note 11's
    M4 hardening.

## Closing check of consolidation round C1 (lane `check/M0-e-04-consolidate-close-1`, 2026-10-13): KI notes N-c1c-1 – N-c1c-5

None of these fails the round (J302 Q12, J273: a consolidation round's closing check notes a survivor it meets and adds
no pin). The evidence is in `checks/M0-e-04-c1.md`; the mirrors were `waves/check-M0-e-04/c1/{before-m,after,mut}` in
the session's cloud scratchpad.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1c-1 | **KI — S6's hand-over of the band top and of the quarter families is unpinned (this checker's A08 and A14 survive, before and after the round).** A08 (`stage.ts` `bandCm2`'s top × 10) changes S6's output on 152 of the probe's 160 towns (grow, report, districts, seams, quarters, arena), and A14 (`familyOf` mapping every kind to one family) changes the quarters on 198 of its runs (the District records on 185); both leave NEAR green at full strength on the consolidated image and, as twins A08b and A14b, on main's pre-round image. The unit tests pin the band top inside `grow` (grow.test 'the band top stops a grower', M13) and the family penalty inside `quarterTree` (M26), not S6's wiring of them. The round's edits on those two lines are equal by value (`HA_CM2` is 10⁸; `demand` is one object no reader writes) and the NO-SHIFT probe is byte-identical, so no shift is hidden. CONFIRMED (survival; probe). | Two `stage.test.ts` pins: a town whose band binds, read back from S6's districts (no district above `law.bandHa[1]` unless it is a merge's); and a quarter adjacency across two families whose cost carries `familyCostHa`, read from S6's typing. | M4 |
| N-c1c-2 | **KI — `isSumRing`'s nearness clause is not isolated at its "both ends" (A02 survives, before and after).** A02 reads `dq` at `p`, so a ring edge needs only one end near a boundary edge. NEAR stays green and the 522-line NO-SHIFT probe is unchanged under it (0 lines differ; N03 likewise 0). N04b changes only `isSumRing`'s own verdict at a 1 cm tolerance on direct calls (200 lines), never a perimeter. This joins note 12's class. CONFIRMED (survival; probe). | Note 12's hardening tests plus one more: a ring whose edge chords a notch, its two ends near two different boundary edges and its middle farther than d + tol (refused). | M4 |
| N-c1c-3 | **Independent confirmation of N-c1b-1 – N-c1b-3.** This checker's A13 (`polsbyPopper` 2π), A12 (typing's tie order reversed), A15 and A16 (the default key of `runS6` and `s6Batch`) survive, and so do their twins on the pre-round image. A12 is live, changing 52 of the probe's 60 typing cases with equal areas. The default key gives the explicit key's output and arena on towns 1 – 12, through `runS6` and through `s6Stage().run`, before and after. CONFIRMED. | As N-c1b-1 – N-c1b-3. | M4 |
| N-c1c-4 | **Test-side faults of the consolidated support.** S01 (`bySeed`'s cache never hit) is equivalent: every call rebuilds the same deterministic run. S04 (`s6Run` returning on a refusal) is equivalent on the folder's fixtures, where S6 refuses nothing. S05 (the tests' `HA` at 10⁷) survives. `quarters.test` and `typing.test` read `HA` only through relative areas and shares. S01b (`bySeed` answering every seed with the first run) is killed by stage.test 'N_d seeds in all …'. `seeds.test.ts`'s `cell` now throws where it returned −1, which is stricter; no case reaches it. PLAUSIBLE (S05's reason); CONFIRMED (the runs). | None needed. A pin on `HA` would test the tests. | — |
| N-c1c-5 | **For the session.** (a) J264 / N-58: the perimeter at a 180 m offset refuses `E_INVARIANT` ("the union: insert: no route … keeps clearance (§3.10) within the fidelity bound (N-43)") on the flat fixture's outlines 3, 8, 9, 10, 11 and 16 of 1 – 30. This is note 11's six, byte-identical before and after. At S6's 50 m all 30 commit, and S6 refuses 0 of the probe's runs. The input is LAWFUL and the verdict MAKE-IT-SUCCEED, through note 11's M4 hardening (`cityRun(3)` is N-c1b-5's instance). (b) The builder's L-0501 discloses one read-only `git log --oneline -3` against the no-git working rule. It changed no state and named no file outside `plat/`. Following the precedent of `checks/M0-c-03-notes.md` N-c1c-3 (b), it is not judged a breach of the item. CONFIRMED (a: probe); PLAUSIBLE (b: the classification). | (a) the session, with the seeds, to note 11's hardening; (b) the session decides. | session |
