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
