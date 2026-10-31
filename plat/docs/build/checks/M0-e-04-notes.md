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

## Hardening round S3 (lane `build/M0-e-04-fix-s3`, 2026-10-14 – 2026-10-19): the FIX-NOW rows of `hardening-inventory.md` §M0-e-04

The session's hardening round (J237 (2), J186, J192) on the inventory's sixteen FIX-NOW rows of this item. Each row's
source note was read whole; the inventory's fix shape was followed except where a line below says otherwise. The
round's choices row is C-0388. The work spanned three containers: the evidence below was re-run on the second (2026-10-18)
and, for W01 and W02, on the third (2026-10-19), because the first container's mirror and logs did not survive.

**Edited (all inside the owns).** Sources: `src/districts/grow.ts` (rows 5, 6), `perimeter.ts` (rows 14, 15),
`table.ts` and `stage.ts` (row 4), `faces.ts` (N-c1b-1's header). Tests: `test/districts/grow.test.ts`,
`integration.test.ts`, `land.test.ts`, `perimeter.test.ts`, `stage.test.ts`, `typing.test.ts`, `support.ts` (new
helpers `layChain`, `withS6`, `s6With`; `cityRun` gains an optional `landOwner`). No folder index or barrel export
changed (J263 Q1): `districts/index.ts` is byte-identical; `table.ts` gains one file-level export, `s6TableIn`, which
no index lists.

| row | outcome | the change | the pin (red without the fix or on its mutant) | mutant(s), killed |
|---|---|---|---|---|
| 1 (note 1) | fixed (text) | C-0388 (1) names the shape `quarterTree(leaves, adjacency, opts): QuarterTree` (`root` the brief's `QuarterNode`, or null for no leaves) and why the brief's one-argument form cannot carry it; no wrapper (a wrapper would add an export, J263 Q1) | — (a choices row) | — |
| 2 (note 2) | pinned | none in source: the code already honoured the clause (note 2's P6) | `grow.test.ts` 'a bank line between two land cells stops a grower; the shore anchor seeds the first face along the bank' (P6 as a test); `integration.test.ts` 'river at seed 2 (900 ha, 30 ha walled): …' — no district holds both sides of a shore or bank (> 100 water edges, > 100 beside a district), one `riverbank` seed per river, both deck ends of each built arterial bridge seeded or dropped-and-reported | M09 (the `WATER` bit out of `EDGE_TEST_BARRIERS`), W01 (`siteFeatures` seeds no `riverbank`), W02 (one deck end per bridge, `[0, 1]` → `[0]`): killed. M10 (the `RESERVED` bit) stays equivalent on every M0 input for note 2's reason (a reservation's barrier face keeps its owner, C-0245 (2)): one-line note, no test |
| 3 (note 3) | fixed (text) | C-0388 (2): `LLOYD_ROUNDS` (4) and `UNLOOP_WINDOW` (64) stay code constants, stated algorithmic (an iteration count of Lloyd's relaxation and a search window of the un-looping pass, neither a §4.5 rate or law); `PREFER_PENALTY` no longer exists in `src/districts/` (grep: no such name; the gate's side is a filter, `seeds.ts` `outside`) | — (a choices row) | — |
| 4 (note 4) | fixed (threading); the hash half REPORTED | `table.ts` `s6TableIn(tables)`: the run's `s6` when its TableView carries one, else this folder's; `s6Batch` reads it once for `typingCells`, the face graph's `minBarrierClass` and `rosterBuildings`; `siteFeatures` takes an optional `tables` for its bridge class. Registering `s6` with `@plat/tables` (so its cells enter the table hash) is the tables' owner's step — reported, not built (the round's rule (1)) | `stage.test.ts` 'the run's tables carry S6's own table: an `s6` whose edge test starts at secondary stops growth at every grid street' and 'each district's family reaches the quarter tree …' (handed in through `withS6`); `integration.test.ts`'s `siteFeatures` clause (at `through` the primary bridge seeds no bridgehead) | T4a (the face graph back on `minBarrierClass()`), T4b (`typingCells(s6Table())`): killed; the river test's tables clause red on the pre-round sources |
| 5 (note 5) | fixed | `grow.ts`: a face joins an F-WORK run, and a degenerate face joins a district, only when every edge it shares with that district passes the edge test (`passesAll`, the grower's own rule); a face a barrier keeps out starts its own run | `grow.test.ts` 'an arterial dead-ending inside a compartment, under a turn limit of 0: no run holds both its sides; containment holds' and 'a degenerate face joins only a district whose every edge with it passes; with none it stays unowned' | F5a (`passesAll` out of the run walk), F5b (out of the degenerate merge): killed |
| 6 (note 6) | fixed | `grow.ts` merge rule: the longest-shared-edge neighbour first (ties by seed order), passed over where the union would have more boundary loops than the two less one (`enclosesHole`) — the patch test's hole check applied to the merge | `grow.test.ts` 'a district meeting its only neighbour along two disjoint pieces stays below the floor, reported; one piece merges' | H6 (the `enclosesHole` skip removed): killed |
| 9 (note 9) | pinned | none in source | `stage.test.ts` 'a primary ring road between the perimeter and the frame: every face it encloses outside the perimeter takes the hinterland's id' | M38 (the outside walk also blocked at arterials): killed |
| 12 (note 12; N-c1c-2) | pinned | none in source | `perimeter.test.ts` 'the sum check's clauses, each alone': the C's hole ring reversed (enclosure), a chord 30 m from a spike's tip (the boundary-vertex terms), a zigzag crossing a boundary edge (the crossing test), a chord over a notch with its ends near two different edges (nearness at both ends) — each refused | N02, N04b, N03, A02: killed |
| 13 (note 13; C-0245 (17)) | pinned | none in source | `stage.test.ts` 'the hinterland (the town, S6, 2³² − 1); each seam under (the town, S6, 2³² − 2) by its run's lowest-then-leftmost vertex; each quarter node under (the town, S6, 2³² − 3) in creation order' | N21, N25, N26, N27, N28: killed |
| 14 (note 14) | pinned; the rule stated | `settlementPerimeter`'s header: the clip keeps the piece of largest area (the first of equal ones) and drops the others, whose land lies outside the perimeter and so is the hinterland's (C-0245 (2)); a boundary inside the (convex) frame gives one piece | `perimeter.test.ts` 'a boundary leaving the frame and re-entering it: the clip splits the perimeter in two and keeps the larger, either side' | N14 (on `largestOuter`'s choice of the largest ring): killed |
| 15 (note 15) | fixed | `perimeter.ts`: the overlay's outer ring is held to `simpleCcw` before `isSumRing`; a non-simple ring refuses `E_INVARIANT` with the text "settlementPerimeter: the overlay's outer ring is not a simple counter-clockwise ring (the sum check reads a simple one)" (pinned verbatim, J263 Q6) | `perimeter.test.ts` 'an overlay handing back a ring that retraces an edge is refused E_INVARIANT, never returned' | S15 (the `simpleCcw` check removed): killed |
| 16 (note 16) | pinned | none in source (`support.ts` `cityRun` takes an optional `landOwner`) | `land.test.ts` 'the CITY run with land:0: every strip face keeps its owner through S6, beside the land S6 re-owns' | K06 (`s6Takes` accepting any owner): killed (first by `integration.test.ts`'s strips assertion under `--bail`; red on the land pin alone) |
| N-c1b-1 | pinned; header fixed | `faces.ts` `polsbyPopper`'s header drops the report claim: an exported measure no S6 report carries at M0 | `grow.test.ts` 'a square gives π ÷ 4, a regular n-gon π ÷ (n · tan(π ÷ n)) — 1 in the limit of a disc; a zero perimeter gives 0' | P01 (on `polsbyPopper`'s formula): killed |
| N-c1b-2 | pinned | none in source | `typing.test.ts` 'greedy ties by id: of two districts of equal area the smaller id scores first, whatever the input order' | T01 (on typing's tie order by id): killed |
| N-c1b-3 | pinned | none in source | `stage.test.ts` 'the arena key defaults to the ground arena: S6 with `key` omitted equals the keyed run, by runS6 and by the Stage' | G01 (on S6's default arena key): killed |
| N-c1c-1 | pinned | none in source | `stage.test.ts` 'the band's top reaches the grower: no district it held without a merge into it ends above law.bandHa[1]' and 'each district's family reaches the quarter tree: one family for every kind gives the tree of no family penalty, not the shipped one' | A08 (`bandCm2`'s top × 10), A14 (`familyOf` one family for every kind): killed |

**Mutant table (J183, the lane mirror `waves/selfcheck-build-M0-e-04-fix-s3`, isolation proven: no link into the tree,
`@plat/kernel`'s realpath in the mirror).** 26 targeted mutants, each run alone as `vitest run --maxWorkers=1 --bail=1
packages/layout/test/districts/`, each file restored by copy and `cmp -s` before the next: M09 W01 W02 T4a T4b F5a F5b
H6 M38 N02 N03 N04b A02 N21 N25 N26 N27 N28 N14 S15 K06 P01 T01 G01 A08 A14 — **26 killed**, each by its row's pin
(2026-10-18; W01 and W02 re-run 2026-10-19 under the definitions above: both red on `integration.test.ts`'s river pin, 1 failed of 4 in that file, the other files green). The **cross run** (the round's test
files on the pre-round sources, in the mirror): exactly the seven fix pins red — row 4 × 2 and the river test's
`siteFeatures` tables clause, row 5 × 2, row 6, row 15 — and 107 green; the pins of the pin-only rows are green on the
pre-round sources, as a test of correct code must be.

**Behaviour (rule (3); a DECLARED shift).** Rows 4, 14, N-c1b-1 move nothing (`s6TableIn` answers this folder's table
under the registry's view, which does not list `s6`). Rows 5 and 15 move nothing on the census below (no run reaches a
barrier-split F-WORK run, a barrier-blocked degenerate face or a non-simple overlay ring). Row 6 moves the ORDER of
`grow.merges` and of `grow.grown`'s face appends on towns 12 21 26 38 55 66 81 84 86 89 92 98 of 1 – 100 (a merge that
would enclose a hole at its turn waits until another merge has filled it); the merges are the same as sets, and the
districts, seams, quarters, typing, report, perimeter and L1 owners are byte-identical on all 105 runs. No golden or
digest of the folder records `grow`'s order, so none is re-recorded; NEAR's goldens pass unchanged.

**Refusal census (J264, N-58; before → after, the same probe on both images).** S6 over towns 1 – 100 (`town`, the
stage tests' fixture), the CITY runs 1, 2, 4 and the growth runs 1, 2: refused **0 → 0** (105/105 committed on both).
The perimeter probe (towns 1 – 100 at 50 m and 180 m in their frames, 60 split stars at 50 m; 260 lines): byte-identical,
0 refused. The flat fixture's outlines at a 180 m offset (note 11): refused on outlines 3, 8, 9, 10, 11, 16 of 1 – 30,
**6 → 6**, the same six — input LAWFUL, verdict MAKE-IT-SUCCEED, owned by `insertChain`'s router (refusal census R-06,
Q64); `cityRun(3)`'s fixture refusal before S6 (N-c1b-5) is the same class, unchanged. Q64 is not merged here: the
census names the router, not the perimeter, as the owner. No lawful class is left at REFUSE by this item's code.

**Gates (this sitting, 2026-10-19, in the tree).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1141 files, 0
errors; `probe-red` reports the probe's planted lines, so the probe is red); `build` 0; NEAR
`vitest run --maxWorkers=1 packages/layout/test/districts/ packages/testkit/test/layout/districts/` 14 files 119/119 at
full strength (314 s); RELATED@1000 over `districts/{grow,perimeter,stage,table,faces}.ts` (W=1, after the last source
edit): 209 files 2583/2583 exit 0 (5416 s, 2026-10-18; the known foreign reds absent).

**For the session.** (a) Row 4's second half: `s6` registered with `@plat/tables`, so its cells enter the run's table
hash — the tables' owner's step (REPORTED). (b) Note 11 / Q64's six flat outlines and `cityRun(3)` stay with the
router's hardening. (c) The round ran no git; the before-image was read from `main`'s objects by a read-only Python
reader of `.git/objects` (no git command), equal to the landed record's 29 hashes.

## Closing check of hardening round S3 (lane `check/M0-e-04-close-s3`, 2026-10-19): KI notes N-s3c-1 – N-s3c-3

None of these fails the round. Each is a test gap on code this seat's probes confirm correct, or a note for the
session (the blocker rule, J162; N-45). The evidence is in `checks/M0-e-04-s3.md`. The mirrors were
`waves/check-M0-e-04/s3/{after,bef,mut}` in the session's cloud scratchpad.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **KI — the roster's B through the run's `s6` is unpinned (this seat's T4e survives).** Row 4's fix reads `s6` from the run's tables for three things: `typingCells`, the face graph's `minBarrierClass`, and `rosterBuildings` (C-0388 (3); `stage.ts`). Note 4 and the inventory row name only the first two, and both are pinned (T4a – T4d killed). T4e puts `rosterBuildings(input.rung)` back on this folder's table. It survives `stage.test`, `integration.test` and `land.test` (37/37). This seat's probe shows the code is right and T4e is live. On town 4, an `s6` with `roster` `buildings.CITY` = 100, handed in through `withS6`, moves N_q from 13 to 5 and changes the quarters. Under T4e, N_q stays 13. CONFIRMED (survival; probe). | One `stage.test.ts` case: the run's `s6` with a smaller `buildings.<rung>`, and S6's quarters (or the report's N_q) differ from the shipped run's. | M4 |
| N-s3c-2 | **KI — the merge rule's fall-through to the next neighbour is unpinned (this seat's H6d survives).** Row 6's rule (C-0388 (5); `grow.ts`'s module comment) is: take the neighbour with the longest shared edge whose union with the district encloses no hole. H6d stops at the first neighbour that would enclose a hole (`break` for `continue`). It survives `grow.test` and `stage.test` (48/48), because the row's pin district has only one neighbour. This seat's probe: a 3 × 4 grid with the centre (1, 2) reserved and a primary line under columns 0 and 2 between rows 0 and 1. S at (1, 1) is cut at turn limit 0. Its longest neighbour, the seven-cell run (200 m shared), would ring the reservation. Its next neighbour, the bottom row (100 m), would not. The round's code merges S into the bottom row, and every district keeps one boundary loop. Under H6d, S stays below the floor. Over this seat's census probe (towns 1 – 100, `land:0` towns 1 – 6, CITY 1, 2 and 4, growth 1 and 2), H6d's output is byte-identical to the round's (192 lines), so no registered family reaches the difference. CONFIRMED (survival; probe; census). | The probe as a `grow.test.ts` case. | M4 |
| N-s3c-3 | **For the session — a variant `s6` now changes S6's output without changing the view's hash.** Since row 4, S6 reads a TableView's `s6` when the view carries one. The view's `hash` does not cover `s6` (the registry does not list it; the support's `withS6` keeps `base.hash`). Two runs that differ only in their `s6` therefore have one table hash. No honest run reaches this: no registry view carries `s6`, and `pipeline/base.ts` (another item's) calls `siteFeatures` and S6 with the default tables. A future composer that hands a run `s6` must also pass it to `siteFeatures` (its optional `tables`), or the bridge class and the edge test would read two tables. CONFIRMED (reading; `view.ts` `table()` throws `TableError` only for "not in this view"). | Row 4's REPORTED half (register `s6` with `@plat/tables`, so its cells enter the hash). Then the composer's owner threads one view through `siteFeatures` and S6. | session (the tables' owner); M1 at the roster |

## Hardening round S4 (lane `build/M0-e-04-fix-s4`, 2026-10-31): Q133, Q122's S6 class, Q86, Q99's e-04 half

The session's round S4 (J670; J186, J192) on four queue rows. The round's choices row is C-0454. The work spanned two
sittings on one container (the first stopped on a usage limit at 03:32); the second re-ran every gate, the census,
the perimeter probe and all ten mutants. Probes and mutants ran only in the lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-e-04-fix-s4/` (isolation checked: no link out, `@plat/kernel`'s
realpath inside) and in the seat's scratchpad. Every timing below is from this container, contended, and informative
only.

**Edited (all inside the owns).** Sources: `src/districts/perimeter.ts` (Q133 A / B1 / B2, Q122), `stage.ts` (the
report line), `types.ts` (Q86). Tests: `test/districts/perimeter.test.ts`, `stage.test.ts`, `support.ts` (Q99's
`withS6`), and the new `q133.test.ts` with its fixture `fixtures/q133-inputs.json`. Also
`packages/testkit/test/layout/districts/collinear-chain.test.ts` (in the owns): its coincident 2708765650 clause now
expects S6 to commit. No folder index or barrel export
changed (J263 Q1): `districts/index.ts` and `src/index.ts` are byte-identical. Three file-level exports are new and no
index lists them: `settlementPerimeterRung` and `PerimeterRung` (perimeter.ts), and `W_PERIMETER_BUFFER` (stage.ts).
`runS6`'s signature and `settlementPerimeter`'s signature are unchanged.

**The perimeter's constructions after the round (C-0454).** `settlementPerimeterRung` tries these in order. The first
that stands gives the ring:

1. `fast`: the mitred curve, its folds cut (`unloop`). It is held to `simpleCcw` and to `isSumRing` at 5 cm.
2. `onSegments`: the curve mitred only where the miter lies on both offset segments. It is held to the same checks.
3. `overlay`: the boundary united with its full convolution through one `booleans` union. It is held to `simpleCcw` and
   to `isSumRing` at 104 cm.
4. `buffer` (NEW; the declared fallback rung): §3.4's buffer of the closed ring (round joins and ends) united with the
   boundary. It is held to the overlay's two checks. It is taken only when the overlay refused or its ring failed a
   check, and only for a boundary with a region reading (`regionLoops`). S6 writes `W_PERIMETER_BUFFER` to its report
   once for each run that takes this rung, so the rung is never silent. A ring that no rung stands is refused with the
   overlay's code and text, followed by `; the buffer rung: <its text>`. That text is pinned verbatim.

Per-construction timings on the captured inputs (ms, contended; the `timing.mts` probe):

| input | vertices | fast | onSegments | overlay | buffer | whole (rung) |
|---|---|---|---|---|---|---|
| integrated 73 | 676 | 83 ✗ | 50 ✗ | 2 484 refused | 13 885 ✓ | 15 052 (buffer) |
| integrated 195 | 676 | 54 ✗ | 48 ✗ | 6 140 ✓ | 11 670 ✓ | 5 812 (overlay) |
| integrated 243 | 687 | 68 ✗ | 65 ✗ | 3 446 refused | 11 494 ✓ | 14 838 (buffer) |
| integrated 253 | 676 | 44 ✗ | 46 ✗ | 5 650 ✗ (sum) | 11 616 ✓ | 17 128 (buffer) |
| integrated 310 | 670 | 54 ✗ | 45 ✗ | 1 994 refused | 11 157 ✓ | 14 400 (buffer) |
| integrated 476 | 655 | 42 ✗ | 42 ✗ | 4 620 ✗ (sum) | 10 236 ✓ | 14 263 (buffer) |
| integrated 751 | 683 | 61 ✗ | 58 ✗ | 5 439 refused | 11 597 ✓ | 17 666 (buffer) |
| integrated 999 | 704 | 43 ✗ | 47 ✗ | 2 404 refused | 11 912 ✓ | 13 961 (buffer) |
| relief-60 172 | 703 | 43 ✗ | 45 ✗ | 4 716 ✓ | 11 416 ✓ | 5 276 (overlay) |
| relief-60 183 default | 355 | 77 ✗ | 79 ✗ | 1 061 refused | 8 853 ✓ | 10 434 (buffer) |
| relief-60 183 coarse | 355 | 80 ✗ | 84 ✗ | 905 refused | 9 567 ✓ | 11 387 (buffer) |
| relief-3000 77 | 613 | 39 ✗ | 37 ✗ | 1 425 refused | 11 527 ✓ | 13 009 (buffer) |
| x-06 plant 3009257304 | 111 | 9 ✗ | 12 ✗ | 418 ✗ (sum) | 1 198 ✓ | 1 820 (buffer) |

The buffer rung costs about 2 to 5 overlays here. It runs only on the rung. On every input that stood before the round
it never runs, so no committed run pays for it.

| row | outcome | the change | the pin (red without the fix or on its mutant) | mutant(s), killed |
|---|---|---|---|---|
| Q133 (A: 73 243 310 751 999; B2: 253 476) | fixed | The buffer rung, the alternative the brief offers as a declared fallback rung. The design supports it: §4.5 says the perimeter is the boundary "offset outward … and rounded", and §3.4's round buffer is that form; C-0245's `settlementPerimeterByBuffer` reference builds the same region. Two alternatives were not taken. Cutting the folds before the union (closing `unloop`'s windowed cut) would be new fold geometry, and the overlay's interior-fold refusal belongs to the router (R-06). Unioning in pieces would also be new design. | `perimeter.test.ts` › 'the buffer rung …' (the overlay refused: the rung stands, equals the reference's region (xor 0), and `settlementPerimeter` returns the same ring; a buffer 2 m short is refused with the pinned text; the fast rings and the overlay come first; note 15's retrace test extended). `q133.test.ts` › the captured inputs of 253 and 751 and of the site's A seeds stand on the buffer rung. The eight seeds derive through S6 and commit, with 7 buffered. | R1-norung, R4-bufnocheck, R5-buffirst (the note-15 pin); W-noreport (q133's derivation: no `W_PERIMETER_BUFFER` lines) |
| Q133 B1 (195) | fixed | `isSumRing`'s upper bound now reads the boundary as a whole. A ring edge whose ends are not both near one boundary edge is halved, up to `NEAR_HALVINGS` = 32 times. A piece passes when one edge is near both its ends, or when its midpoint's distance plus its half-length is within d + tol. It fails when its midpoint lies beyond the bound. The lower bound and the crossing test are unchanged. | `perimeter.test.ts` › 'the sum check's upper bound reads the boundary as a whole' (a near-collinear block: a correct ring passes; a ring with two notches 3 m out and one 2 m too far or bowed are refused). `q133.test.ts` › B1: 195's and 172's captured inputs stand on the overlay. | B1-edgeonly, B1-nohalve (the near-collinear pin); B1-midonly (the notch pin) |
| Q133 x-06 S1's 3009257304 | fixed (REPAIR) | This is not class A. The input is x-06's planted self-touching boundary (UNLAWFUL): S5's ring visits (3680, −17496) twice, with two counter-clockwise lobes. The overlay's ring fails the sum check at 104 cm and passes it at 200 cm, a B2-like sliver. The rung's gate `regionLoops` reads such a pinched ring as the union of its lobes. The repair is deterministic and documented, and it is reported through `W_PERIMETER_BUFFER`. An antenna (a two-point lobe), a clockwise lobe, or a touch at a point that is not a vertex has no region reading and keeps the typed refusal. | `perimeter.test.ts` › 'a boundary pinched …' (the pinched C takes the rung; the antenna and the clockwise lobe keep the overlay's text). `q133.test.ts` › the plant stands on the buffer rung. The edge fixture probe: EP-01/S6/self-touching 3009257304 is now absorbed. | R3-oldgate (pinched pin), R2-nogate (the touch pin) |
| Q133 pin | pinned | `q133.test.ts` (C-0454 (4)) has two parts. (a) `deriveThroughS6`: the eight seeds through the base pipeline with S8 dropped. Each run has no bug, more than 20 districts, 0 unowned, more than 200 ha of land and a simple perimeter, and the buffered list is exactly [73 243 253 310 476 751 999]. This part costs about 250 s at W=1. (b) The fixture `fixtures/q133-inputs.json` holds S5's last boundary and the frame as S6 received them, for all 13 runs and the plant (captured by an instrumented copy of perimeter.ts in the mirror). This part costs about 90 s. The file takes about 340 s, the slowest in the folder. | itself | W-noreport (a), R1 to R5 (b) |
| Q122's S6 class | fixed (all in Q133's family) | The S6 messages of `summaries/M0-e-06.json` are 5 runs at 3 seeds. relief-60 default 172 is B1 (the sum check refused the overlay's correct ring) and now stands on the overlay. relief-60 183 (default and coarse) and relief-3000 77 (default and coarse) are A (the router finds no route for the full convolution's interior fold) and now stand on the buffer rung. The seeds join line 1's pin as the fixture's `site-*` inputs. Census per class: A 4 → 0 runs, B1 1 → 0. | `q133.test.ts` › the B1 and site-A cases | B1-edgeonly (172), R1-norung (183, 77) |
| Q86 | fixed | `types.ts` imports `QuarterNode` from `@plat/model` and re-exports it (`export type { QuarterNode }`). The folder's structural copy is gone, and `districts/index.ts`'s re-export line stays. There is no behaviour change. | the build (`tsc -b` 0). The folder has no types test, so the row adds none, as the row says. | — (type-only; no runtime test can tell two structurally equal types apart) |
| Q99 (e-04's half) | fixed | `withS6(variant?)` is now `tableView(TABLE_IDS, [variant])`, or `tableView()` with no variant. The view carries the registered `s6`, and its hash covers it. The helper loses its unused `base` parameter (no caller passed one). x-02's `runner.ts`, x-04's `base.ts` and c-01's `fixtures/flat.ts` were not touched, and the helper needs none of them. | `stage.test.ts` › 'the test helper's view registers S6's own table': the hash differs from the registry view's with a variant and between variants, equals it with none, and the shipped tables read as the registry's | Q99-basehash |

**Refusal census (J264; N-58), before → after.** "Before" is the lane mirror before any edit. "After" is the tree.

* e-04's census (`census.mts`, 365 lines): S6 over the stage tests' towns 1 to 100, `cityRun` 1 2 4 and `growthRun` 1 2;
  the perimeter alone on the towns' boundaries at 50 m and 180 m; the flat fixture's S3 outlines 1 to 30 at 50 m and
  180 m. Refused 6 → 0: Q64's six flat outlines at 180 m (3 8 9 10 11 16), class A, now stand on the buffer rung.
  Every other line is byte-identical: S6's perimeter, districts, seams, quarters, typing and report, and every ring.
* Q133's eight integrated seeds: 8 → 0 (the derivation pin). Q122's site runs: 5 → 0. The fixture pins them, and the site
  spike's derivations on the tree (`deriveSpike`, the `capture.mts` probe) end with no bug and S6 ok: relief-60 172 and
  183 default (48 districts each), 183 coarse (48), relief-3000 77 default and coarse (100 each).
* The perimeter probe (`perim.mts`) on 65 captured inputs: the integrated seeds 1 to 40, the 13 runs and x-06's 12
  S6-plant calls. 46 are byte-identical: every input whose perimeter stood before, including all 40 integrated seeds.
  16 that were refused now stand. 3 are still refused, and these are the zero-area plant's antenna (3899199413), the
  same calls before and after.
* M0-x-06's EP-01/S6 plants (the edge fixture probe, unlawful input): self-touching 4101706098, 2461000155 and
  3009257304, and coincident 2708765650 and 14238338, go from refused-safe to absorbed. Three of them stand on the
  overlay because B1's bound now passes their correct rings; 3009257304 and 2708765650 stand on the buffer rung through
  `regionLoops`. zero-area 3899199413 stays refused-safe (REFUSE: an antenna has no region reading, and a repair would
  have to guess whether the spike is land; the plant is a test injection, and no user reaches it through §11.4's doors).

**Declared shift (J676, the session's ruling of 2026-10-31 08:09Z).** No committed golden moves: every ring that stood
before is byte-identical (the census and the probe above), and output moves only where S6 refused before: the 13 runs,
Q64's six at 180 m, and the five x-06 plants above. One pinned verdict moves, and it is DECLARED. x-06's EP-01/S6 replays
in `testkit/test/edge/repins.test.ts`, **'EP-01/S6/self-touching at seed 4101706098'** and **'EP-01/S6/coincident at
seed 2708765650'**, go from the old verdict `refused-safe` to the new verdict `absorbed`. J676 (1) rules this a declared
shift and not a block. S6's input is S5's boundary, OUR OWN INTERMEDIATE under N-58, so the verdict for a pinched or
self-touching boundary reaching the perimeter is (b) REPAIR, and the buffer rung and B1's whole-boundary bound do that
repair: the plant commits, repaired and reported (`W_PERIMETER_BUFFER`). x-06's N-56 (2) reading still holds for the
kernel's EP-01/S1 plants and no longer holds for the S6 rows. The two pins are stale pins of this shift. Their owner
x-06 re-pins them (Q106's pattern): the session applies the two-row seam (expected `absorbed`) and re-lands x-06's
record at this round's landing (queue row Q140, which `ep01.ts`'s stale S6 pins join). This round edits neither
`repins.test.ts` nor `ep01.ts`.

**Reported, not built (another item's files).**

* To Q64 / R-06 (M0-a-05's router, insertChain), as evidence rows: the overlay's union still refuses the full
  convolution's interior fold on integrated 73 243 310 751 999, relief-60 183 (both configurations), relief-3000 77
  (both), x-06's coincident 2708765650 and the flat outlines 3 8 9 10 11 16 at 180 m. e-04 now commits every one of
  them on the buffer rung, and the router's refusal is a-05's to fix. B2's sliver (253, 476 and the plant 3009257304:
  the overlay's ring lies 106 to 108 cm inside, past the 104 cm tolerance) is the overlay's (booleans / winding, read
  only).
* To M0-x-06 and the session, a RELATED red this round cannot clear inside its owns. `testkit/src/edge/ep01.ts`'s S6
  pins for self-touching [4101706098, 2461000155] and coincident [2708765650, 14238338] (and x-06 S1's 3009257304 on
  its branch) now absorb. The cells' judge allows `absorbed`, so `ep01-s6-s8.test.ts` stays green, but the pins'
  `share` and `seeds` are stale. `testkit/test/edge/repins.test.ts` (x-06's, which "fails the day the stage changes")
  replays two of these seeds and expects refused-safe: **'EP-01/S6/self-touching at seed 4101706098'** and
  **'EP-01/S6/coincident at seed 2708765650'** are red after the round and green on the before image. That was checked
  by a fresh lane mirror with the three round sources put back: there, repins and `ep01-s1-s3-s4.test.ts` show exactly
  the three foreign reds below. The first red comes from B1's whole-boundary bound, which this row requires: the
  overlay's ring is correct and now passes. The second comes from the rung's region reading, which line 1's 3009257304
  requires. Both turn N-56 (2)'s "self-touching/coincident pins stay (lawful)" from refused-safe to absorbed for S6.
  The re-pin is x-06's file. The first sitting reported this for the session's ruling and stopped at a CHECKPOINT
  BLOCKED. **J676 resolved it: a declared shift (above), re-pinned by x-06 through the session's seam, queue row
  Q140.** The round is no longer blocked on it.

**Gates (this container, W=1).** install --frozen-lockfile 0; lint 0 (eslint 1268 files, probe-red ok, 9 whole-tree
checks); build 0. RELATED@1000 over `districts/{perimeter,stage,types}.ts`: 254 files, 3 232 passed and 6 failed in 3
files (9 808 s). Three of the reds are foreign and are red on the before image too: repins 'EP-01/S1/self-touching at
seed 2651453823', repins 'EP-01/S5a/coincident at seed 1658509524' (Q106), and `ep01-s1-s3-s4` 'EP-01/S1/self-touching'.
These are S1 and S5a cells, judged before any S6 code runs; M0-c-04 S4 found the same on 2026-10-30. The other three
reds are this round's. Two are the repins above (REPORTED). The third was the owned `collinear-chain.test.ts`'s
coincident clause, now updated. Under J676 the closing checker reads RELATED's two declared reds (the S6 repins) and
three foreign reds as stated. NEAR (`packages/layout/test/districts/` and `packages/testkit/test/layout/districts/` at
full strength): 15 files, 135 of 135 passed, exit 0 (638 s, W=1). `landed:verify flow-7 --item M0-e-04`: ok.

**Reported rows, summarised (J676 (3)).** (a) To Q64 / R-06, for a-05's router round: the interior-fold seeds above
(integrated 73 243 310 751 999; relief-60 183 default and coarse; relief-3000 77 default and coarse; x-06's coincident
2708765650; flat outlines 3 8 9 10 11 16 at 180 m), with B2's sliver (253, 476, 3009257304) for the overlay. (b) To
x-06 and the session: the stale S6 pins, `repins.test.ts`'s two replays and `ep01.ts`'s S6 `share` and `seeds`,
declared above and carried by Q140. (c) N-s4-1: the buffer rung's cost, 10 to 14 s on most rung inputs here (up to
18 s), in the table below. (d) N-s4-2: the upper bound's halving has no bound on its recursion width, in the table
below.

**Self-check (J183).** Ten targeted mutants ran in the lane mirror, one at a time (`--maxWorkers=1 --bail=1`, over
`packages/layout/test/districts/` and `packages/testkit/test/layout/districts/`). All ten were killed, each by its
row's pin: R1-norung (the rung removed), R2-nogate (the region gate removed), R3-oldgate (the gate back to
simple-only), R4-bufnocheck (the buffer's ring unchecked), R5-buffirst (the buffer before the overlay), B1-edgeonly
(the whole-boundary bound removed), B1-midonly (the midpoint without its half-length), B1-nohalve (no halving),
W-noreport (no report line) and Q99-basehash (the view keeps base's hash). Each mutated file was restored from the tree
and was cmp-equal afterwards.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s4-1 | **KI — the buffer rung is slow.** On the rung, a perimeter of 650 to 700 vertices takes 10 to 18 s here, against 2 to 6 s for the overlay. The rung runs only where the overlay fails: 8 of 1 000 integrated seeds, 3 of 200 site seeds, Q64's six at 180 m. It fails safely and commits right. | When the router absorbs the interior fold (Q64 / R-06), the A class leaves the rung. Measure again then. | M4 |
| N-s4-2 | **KI — the upper bound's halving has no bound on its width.** `nearAlong` recurses on both halves up to 32 levels. On every input here it stays near linear: only pieces that straddle a distance ridge keep splitting. A contrived ring that lies exactly on d + tol along a long ridge could split widely. | Make the recursion iterative with a piece budget, and refuse when the budget is spent. | M4 |
