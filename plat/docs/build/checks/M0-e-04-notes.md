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
