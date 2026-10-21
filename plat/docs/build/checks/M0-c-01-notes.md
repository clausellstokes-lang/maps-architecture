# M0-c-01 — the checker's minor notes for the hardening milestone M4 (lane `check/M0-c-01`, 2026-10-05)

None of these notes fails the item; the blockers are in `checks/M0-c-01.md` (B-1, B-2). Each note is numbered for M4.

1. **N-1 `gatesOnBoundary`'s signature.** The item lists `gatesOnBoundary(routes, t1)`. The code is
   `gatesOnBoundary(routes, t1, set)`, with the level set required, because T and the selection are not in the routes.
   The extra parameter is the least the function needs, but no choices row names it. A line in the next choices row,
   or a signature that takes the `Field` and re-derives the selection, would close it.
2. **N-2 The outline's Chaikin passes are a code constant.** `OUTLINE_CHAIKIN_PASSES = 2` in `levelset.ts`, while
   `ways.json` already holds `graph.chaikinPasses` (2, `architecture 2026-09-25`), and C-0201 (5) says the outline
   reads "§4.3's two passes of a way's chain". Reading the cell would keep one source.
3. **N-3 Several rings: the largest wins without a report.** When the selection has more than one component, `levelSet`
   keeps the largest ring by area. The nodes of the other components then lie outside `contour`, and only `rings`
   counts them. No probe produced one (P1–P6 all gave `rings 1`), but nothing reports it either, for example as a
   `requestedVsBuilt` row or a typed warning. A relief or river fixture (M0-e-06) could reach it.
4. **N-4 Filled pockets count as land.** `levelSet.landCm2` counts the filled pocket nodes, while `threshold.landCm2`
   does not. With a pocket, the boundary's land exceeds the stage's share by `filled` cells, and no report row says so.
   (On the fixture `filled` is 0 on every seed probed.)
5. **N-5 A route with no gate stays in T's road set.** A route that never leaves the selection (`gatesOnBoundary` →
   null) stays in `routes` and in T's road set. `report.gatesDropped` counts it but names no ordinal; `unserved` and
   `gateRungs` do not list it.
6. **N-6 The `taken` exclusion in `gatePicks` (mutant K06) survives.** It is equivalent in practice: a taken node's gap
   term is 0, so it scores at most 0.05, and probe P9 found no duplicate in 30 streams even with two equal requested
   bearings. A test that forces the case, for example a contour of two candidates, would hold the guard.
7. **N-7 The duplicate-route subtest of the field's permutation test** does not catch a parity mutant (K09: a duplicate
   route resets one direction of each of its edges). The reset directions in the fixture are the inward ones, so T
   does not move (P8: the road set goes from 1 459 to 1 395 directed edges with T unchanged). The stated promise, order
   independence, is held: K09b is killed. Comparing `roadSet` itself for `[...r, r[0]]` would pin the set semantics.
8. **N-8 The side check after `simplify` (mutant K19) survives.** It is redundant with `simplify`'s guard obstacles on
   every tested input. A fixture where the kernel's simplify would carry a guard node across the ring would hold it,
   or a comment could record why it is belt and braces.
9. **N-9 `GATE_REDRAWS` is not what caps the re-draws in the tests (mutant K25).** The fwall fixtures run out of ranked
   candidates (four entries) before the cap. For every drawn pick the cap is also `PICK_RANKED = 4`, so the mutant is
   equivalent there. Probe P9 shows that an injected pick with six ranked entries is re-drawn four times under the
   mutant. A fixture with more than four coinciding entries would test the cap itself (named as optional in B-2).
10. **N-10 The plaza's area bands and compactness floor are held in `plaza.ts`** (declared in C-0201 (3)), as are the
    pick-score weights. M1's reservation rows and a rule table should take them over.
11. **N-11 (session) testkit red outside this item.** `testkit/test/kernel/arr-booleans-buffers/agreement.test.ts`
    fails 2 tests (the buffer agreement and the offsetFace agreement; the errors quoted include `insert: the router planned
    an edge (-65090, -64455)–(-65128, -64489) crossing …` and `expected [ Array(1) ] to deeply equal []`) in the tree at 06:55–07:38. The file does not import
    `@plat/layout`. The kernel's `insert/` and `arr/` files are changed by other seats of this flow.
12. **N-12 Relief: the smoothing guard may refuse every pass.** On two of four bumpy reliefs (probe P3, amplitudes 50
    and 80 m) the outline kept 0 and 1 Chaikin passes, because the guard refused a deeper pass. The outline is then
    the simplified marching ring. This is correct by C-0201 (5), but worth a look when M0-e-06 runs relief, since the
    trace (M0-c-02) smooths again.

## Closing check (lane `check/M0-c-01-close-r1`, 2026-10-05) — notes added; none fails the item

13. **N-13 A bridgehead gate can stand in the river, up to half a spacing from the bank.** C-0204 (2) records the
    open case. Where the stage-1 selection spans a river along a deck, a route's first exit is the edge between the
    deck's last water node and the far bank. The gate is then that edge's midpoint, which is the contour's own crossing
    (C-0017). In this check's sweep of 460 river layouts (probes R2 and R3: 6 seeds × 5 river positions × 2 directions ×
    5 deck layouts, plus diagonal and CITY-frame rivers), 6 gates were bridgehead gates. For 3 of them the gate point
    lies inside the water face. The depths measured were 10.11 m and 12.40 m into a 40 m band, with a 25 m spacing
    (probe R4). The fixer's river test pins the case exactly (`heads` is 1 for seed 25 and 0 for seed 21). That
    replaces the first check's requested assertion that no gate's inside node is water. This check accepts it as a
    declared choice (J156) and not as a wrong result, because the gate is where the route first reaches T = t₁.
    *Suggested handling:* M0-c-02, which commits the trace, or M0-e-06, which runs this slice on a river, decides
    whether such a gate snaps to the bank or becomes C-0087's water gate. A test should then bound the gate's distance
    from the bank, and the `heads` pin in `picks.test.ts` should be updated to match. *Milestone:* M0-e-06 (earlier
    than M4).
14. **N-14 The status of earlier notes after fix round 1.** N-9 is closed: the fixture `GATE_REDRAWS itself caps the
    re-draws` kills the K25 shape. This check's mutants X06 (`tried <= GATE_REDRAWS`) and X07 (no cap, only the
    list's length) are both killed. N-3 has new evidence and stays open: every one of the 460 river layouts gave
    `rings` 1, so no probe has yet produced a second component. *Suggested handling:* none for N-9; N-3 as before.
    *Milestone:* M4.
15. **N-15 The `deckOf` pin in M0-c-03's `backbone/route.test.ts` is still missing (lane `check/M0-c-01-close-s1`,
    2026-10-08).** N-54 (2) names two pins: one in `siting/lattice.test.ts` and one in `backbone/route.test.ts`
    (`deckOf` −1 for a deck beyond the frame, seed 2220711574). Round S1 added only the first. The second file belongs to
    M0-c-03, and C-0289 reports it for M0-c-03. M0-c-01's own pin already checks `routeGraph(L).deckOf` and `rg.decks`
    from the lattice side. This check's mutants Y03 – Y05 show that test is red when the stored costs and the weights
    disagree. *Suggested handling:* M0-c-03 adds the pin in its own file, and the session puts a row in
    docs/M0-FIX-QUEUE.md for it. *Milestone:* M0 (M0-c-03's next round), earlier than M4.
16. **N-16 Only `buildLattice` applies the frame rule; `edgeCost` does not.** `edgeCost` is exported, and it reads
    whatever `Costs` a caller gives it. `framedCosts` cuts the decks only inside `buildLattice`. Today `buildLattice` is
    the only caller in any package's `src/` (`siting/lattice.ts:165`), and `slice.ts:93` is the only caller of
    `buildLattice`, so nothing goes around the cut. A later caller that builds costs itself would. *Suggested
    handling:* a source-scan test that `edgeCost` is called only from `buildLattice`, or `edgeCost` taking the frame.
    *Milestone:* M4.
17. **N-17 The frame test and the fixture's test differ, but not yet in practice.** C-0289 tests the frame ring
    (`insideRing(…, true)`). M0-x-06's `cell/bridge×frame` tests the ring's bounding box (`ringBox`/`inBox`). They give
    the same answer while every frame is an axis-aligned rectangle, which is true of every M0 frame
    (`fixtures/flat.ts:70`). This check's own probe also uses the box. With a frame of another shape, a deck end could
    be inside the box but outside the ring. The lattice would then cut a deck that the fixture still calls in-frame,
    which is the safe direction. *Suggested handling:* the fixture reads the ring when frames of other shapes arrive.
    *Milestone:* M4.

## Consolidation round C1 (R1; lane `build/M0-c-01-consolidate-1`, 2026-10-12) — the builder's map and notes

The round applies `consolidation/layout-plan.md` §1.0 (1.0.1 – 1.0.7), §2's rows for `siting/routes.ts` and
`levelset.ts` and §3's `test/siting/` row inside the owns (`src/fixtures/`, `src/siting/`, `test/siting/`). No behaviour
changes; no folder index or the barrel changes (`siting/index.ts`, `fixtures/index.ts`, `src/index.ts` byte-identical;
runtime export names 375 / 35 / 2 identical before and after); the new names are file-level exports reached by path.

**What changed, file by file** (no test file merged, renamed, split or moved; every `describe`/`it` title kept, five
`it`s and two `describe`s added — 92 runtime tests before, 97 after):

| old | new |
|---|---|
| `src/siting/geom.ts:17` private `CDEG_PER_RAD` | the same constant, exported file-level (1.0.1) |
| `src/siting/slice.ts:40` private `HA_CM2`; `src/siting/plaza.ts:64` the literal `100_000_000` | `geom.ts` exports `HA_CM2 = 100_000_000` file-level; `slice.ts` and `plaza.ts` import it (the same double: `x * 100_000_000` ≡ `x * HA_CM2`) |
| `geom.ts` `distToSegment` (one body ending `Math.sqrt(fx * fx + fy * fy)`) | `distToSegment2(p, a, b)` = that body without the `Math.sqrt`; `distToSegment` = `Math.sqrt(distToSegment2(p, a, b))` — the same operations in the same order |
| `src/siting/lattice.ts:14` private `COS30`, `:48` private `boxOf` | exported file-level, bodies unchanged |
| `src/siting/routes.ts:32` private `WorkLimitReached`, `:62` private `rimAtBearing` | exported file-level, bodies unchanged |
| `routes.ts` `gateRoutes` `:96–97` and `rerouteOutside` `:181–182` (the rim list); `:116–123` and `:183–189` (the counting heuristic) | private `rimNodes(lattice)` and `outwardHeuristic(lattice, target, limit)` → `{ h, count }`, one header each (1.0.2); the graph (`lattice.graph`, `blockedGraph(lattice, blocked)` for C-0249's re-solve, `blockedGraph(lattice, selected)` for C-0201 (6)'s reroute) and the targets stay at each call site; the re-solve reuses the first search's object, so its count accumulates as the shared `let count` did |
| `geom.ts` header | names the file as the package's exact-plane-geometry home and its shared constants |
| `src/siting/levelset.ts:287` (the second `pinIndices` call, uncommented) | one comment line: the pins are located again on the simplified ring because the simplify drops vertices (1.0.3 — two inputs, kept) |
| `test/siting/lattice.test.ts` | + describe 'the segment distance (geom.ts distToSegment, distToSegment2)' (2 its: the folder's fixtures, a fast-check sample at the PR size); + describe "the shared constants and a ring's box (geom.ts, lattice.ts)" (2 its) |
| `test/siting/gates.test.ts` | + it "a requested bearing is measured from the pick: …"; the spur `it` ('a pick whose least-cost way … simple path') gains the route.nodes count pin (both searches' labelled nodes) |
| `test/siting/fwall.test.ts` | the reroute `it` ('a route that re-enters the stage … roads leaving = N (C-0201 (6))') gains the route.nodes identity (settled + the routes' charges) |

Kept as the plan says: `levelset.ts`'s two `pinIndices` calls (1.0.3); `growth/mainRoads.ts`'s copies of `rimAtBearing`
and `boxOf` (1.0.4, 1.0.5: R11's); the two radians-per-centidegree doubles (1.0.6, J302 Q8) — siting's inline
`PI / 18_000` is untouched; `HALF_SQRT3` (0.8660254037844386) beside `COS30` (…387) — two different doubles, not unified;
`fixtures/flat.ts` untouched (1.0.7); every rule citation (C-0289, C-0249, C-0201 (6), C-0204, C-0085) kept. No message
text changed.

**Mutant-kill map** (by title; nothing moved). Round 1's K01 – K44 and fix round 1's X06/X07 → the same files under the
same titles; S1's Y01 – Y12 → `lattice.test.ts` 'a deck with an end beyond the frame (N-54 (2), C-0289)', untouched.
Re-killed in this round's mirror with the consolidated tests (`--bail=1`, the siting folder): K27 (no reroute: fwall
'… roads leaving = N (C-0201 (6))'), K28 (reroute on the unblocked graph: same), K35 (tree not charged: gates 'charges
route.nodes …'), K34 (the route's bearing from the frame centre: gates 'seed 1: the inward part …'), K18 (gates not
pinned: levelset 'seed 1: the outline … pins the gates').

**This round's targeted mutants** (22 in the mirror, one at a time, restored by copy and `cmp`): L1 (the second
`pinIndices` call replaced by the first's result — the 1.0.3 "de-duplication") killed; H2 (no count), H3 (`>` for `>=`
at the limit), H6 (the route's count not charged), H7 (the rim inset dropped from the heuristic) killed; H1 (the target
branch of the heuristic ignored), H5 (the re-solve counted afresh), H8 (the reroute's count not added to the route's
charge) killed by the two count pins above (survivors before them); G1 (the foot's x reassociated), G2 (no clamp at 1),
G3 (no `Math.sqrt`), G4 (`HA_CM2` 99 · 10⁶) killed; G5 (`CDEG_PER_RAD` 5729.6) and X1 (`boxOf`'s maxX from y) killed by
the constants/`boxOf` pins (survivors before them: a 4 · 10⁻⁶ scale moves a rounded bearing by ≤ 0.14 cdeg, and every
folder box is square or taller than wide); K34a (`rimAtBearing` called from the frame centre) killed by the new bearing
`it` (before it: a requested-bearing pick lies near the centre's ray at its bearing); X2 (`COS30` 0.5) killed. H4 (the
rim targets reversed) survives as **equivalent**: under a heuristic the kernel's `astar` reads its targets into a
bitmask (`kernel/src/geom/path.ts` `search`), so their order is never read.

**NO-SHIFT evidence.** A probe (mirror only) over the pre-round sources and the consolidated ones — 446 lines: the flat
fixture's slice at the registered seeds 1, 7, 20251005 and seeds 2 – 6, 8 – 10; `smallSite` seeds 1 – 40; 20 sites
with four requested bearings; 20 at a small `routeNodesLimit`; 20 river sites with a deck (requested N 3); each slice's
picks, routes, plaza, outline, selection, `T` bytes, threshold, gates, gate sites, destinations, report, pick outline
and lattice (points, weights, rim, water), and `gateRoutes` again at limits 40 / 400 / 4 000; 20 000 seeded
`distToSegment` values — **byte-identical** (sha256 4223543f…). The new count pins and the bearing `it` are green on the
pre-round sources too.

**Refusals** (J264 (5), N-58): 0 before, 0 after — no `s3Slice` threw over the 111 probe slices or the folder's
registered seeds. The 28 `work_cut` routes, the same before and after, all come from the probe's deliberately small
`routeNodesLimit` (F-WORK's designed rung under a caller's limit, C-0085: not a refusal of lawful input at the law's
limit); at the law's limit every route is served.

* **N-c1-1 The plan's count.** §3 counts `test/siting/` as 17 describe / 73 it by source; the runner reports 92 tests
  before this round (the seed loops expand), 97 after.
* **N-c1-2 H4 is equivalent** (above); no pin is needed.

## Closing check of round C1 (lane `check/M0-c-01-consolidate-close-1`, 2026-10-12) — notes added; none fails the item

The mutants named below are this checker's (verdict `checks/M0-c-01-c1.md`). Each survivor also survives the pre-round
sources with the pre-round tests, so the round lost no kill. Each is also run on `test/siting`, `test/backbone` and
`test/enceinte` at `PLAT_FUZZ_RUNS=1000` and survives there. None is in code whose behaviour the round changed: this
checker's probe shows the consolidated functions byte-identical to the pre-round ones. They are test gaps for the
hardening pass (N-45, J273, the plan's Q12), not fails.

* **N-c1c-1 `boxOf`'s minimum y is not pinned for a ring wholly north of y = 0 (mutant X3).** X3 makes `boxOf` take
  `y0` only from negative ys, `if (p.y < y0 && p.y < 0) y0 = p.y`. A water face or a reservation lying wholly at
  y > 0 then gets a box whose `y0` is +∞. The quick reject would pass an edge that crosses that face. No test or
  probe input has such a face: every synthetic band in `test/siting/` spans y = 0, and the new `boxOf` pin's two rings
  both have a negative y. *Suggested handling:* add a `boxOf` case with a ring wholly in x > 0, y > 0. Add a water-rule
  case (C-0076) whose band lies wholly north of the nucleus. R11 imports `boxOf` (1.0.5), so its oracle should also
  include such a ring. *Milestone:* M4, or R11's round if that seat takes it.
* **N-c1c-2 No input reaches the reroute's work-limit exit (mutant H13).** H13 lets `WorkLimitReached` escape
  `rerouteOutside`, by catching `RangeError` in place of `WorkLimitReached`. No test or probe case reaches the reroute's
  limit, including the probe's tilted sites at limits 200, 900 and 9 000, so H13 survives. Under H13 such a reroute
  would throw from `s3Slice` instead of reporting `reroute` with `to: -1`. *Suggested handling:* add a `fwall.test.ts`
  case with a tilted site and a `routeNodesLimit` that the first routes clear and the reroute's search reaches. It
  asserts the `reroute` rung with `to: -1`, no throw, and the route kept. *Milestone:* M4.
* **N-c1c-3 The reroute's outward stretch is not pinned as least-cost (mutant H14).** H14 aims the reroute's
  heuristic at the old route's end, `outwardHeuristic(lattice, <old end>, limit)`. That heuristic is inadmissible for
  the other rim targets. It changes 7 of this checker's 264 probe cases, the tilted sites with a `reroute` rung: their
  outward stretches and charges differ. Every test stays green, because `fwall.test.ts` checks the reroute's structure
  (it leaves once, ends on the rim, and the charge identity holds) and not its cost. The same mutation of the
  pre-round inline heuristic survives the pre-round tests too. *Suggested handling:* add a pin that the rerouted
  outward cost equals a Dijkstra on the selection-blocked graph to the rim set, from the node after the gate (C-0201
  (6)). *Milestone:* M4.
* **N-c1c-4 The reroute's first rim target is not distinguished (mutant H15, near-equivalent).** H15 drops the first
  rim node from the reroute's targets. No probe case changes: the output is byte-identical. It would matter only when
  the least-cost exit is that one node. *Suggested handling:* none beyond N-c1c-3's pin, which would cover it if a
  fixture's exit were that node. *Milestone:* M4.
* **N-c1c-5 The rim targets' order is equivalent (mutant H1).** Reversing `rimNodes`' list changes nothing.
  `kernel/src/geom/path.ts` `search` reads the targets into a bitmask (`isTarget`). Its no-path fallback takes the
  minimum over the targets, which does not depend on their order. The probe is byte-identical under H1. This agrees with
  the builder's N-c1-2; no pin is needed. *Milestone:* none.
* **N-c1c-6 `geom.ts`'s header states the role the plan gives it.** The header calls the file "the package's one home
  of exact plane geometry". That is the role §1.0.1 assigns, but copies of the segment predicates and distances remain
  in `backbone/`, `enceinte/`, `districts/` and `growth/` until rounds R7 – R11 replace them with path imports. The
  claim is about the file's role and matches the plan, so it is not a stale comment. *Suggested handling:* R11's
  closing check (the last unifying round) re-reads the header. If a planned copy stays, the header says "the shared
  home". *Milestone:* M0 (R11).

## Hardening round S2 (lane `build/M0-c-01-fix-s2`, 2026-10-14 – 2026-10-18) — the builder's row-by-row outcome

The session's hardening round of M0-c-01 (J237 (2), J264, J290 / N-58): first the refusal census's slice line (R-28 /
R-31, `checks/refusal-census.md`), then the inventory's four FIX-NOW rows (`checks/hardening-inventory.md`
M0-c-01:162, :169, :175, :191). Begun 2026-10-14 in one Claude Code cloud container; that container's RELATED run never
reported and its scratch drafts were lost; finished 2026-10-18 in another under the CONTINUE RULE, which kept the
tree's edits as they stood and re-ran every probe, mutant and gate below on this machine (Linux x64, Intel Xeon 4 cpu,
16 GiB, Node 24.12.0, W = 1). The pre-round sources were rebuilt byte-exact from the committed tree (each SHA-256 equal
to `landed/M0-c-01.json`'s); the before side of every probe ran on them in the lane's scratch mirror. Choices row
C-0397.

Files: `src/siting/slice.ts`, `routes.ts`, `lattice.ts`, `geom.ts` (header only); `test/siting/decks.test.ts` (new),
`picks.test.ts`, `fwall.test.ts`, `lattice.test.ts`. No folder index and not the barrel changed (`siting/index.ts`
byte-identical, J263 Q1); the new names are file-level: `routes.ts` `resolveOffDecks`, `lattice.ts` `meetsWater` and
`inWater`. No message text changed.

### R-28 / R-31 — the slice's share: FIXED (R-28, and R-29 at the same seeds); R-31 and KI-10's seed REPORTED

**Where each seed leaves the trace** (probe `seeds.mts` / `refusals.mts`: `runBase` and the edge chain to S8 with the
registered S5, before on the pre-round sources, after on the tree; the refusal's detail as the stage returned it):

| seed (blueprint) | before | cause | after |
|---|---|---|---|
| 1409296145 (small river frame, CITY 30 ha; x-06 cell/bridge×frame, Q52 C) | S3 `E_INVARIANT trace: gate gate:0 is not on the committed trace at its point (§4.2 S3 (9))` | SLICE: gate 0's route first reaches T = t₁ on a deck edge (the far bridgehead), its point in the river; no trace pins a point in the water | S3 commits, 0 bugs to S8 |
| 27 (small river frame; c-03 c1 N-c1c-3) | S3 R-28 `gate:1` | SLICE, the same shape | 0 bugs to S8 |
| 12 (RIVER 900 ha, 30 ha walled; c-02 N-33) | S3 R-28 `gate:2` | SLICE, the same shape | 0 bugs to S8 |
| 396602230, 765046355, 914597522, 3484178840 (small river frame; x-06 Q52 D, census R-29) | S3 `E_INVARIANT water: the crossing … has no clear chord between its two bank pins (a main gate stands in the water between its banks)` | SLICE: the same deck-edge gate in the river, met by the trace's water row before its pin check | S3 commits on all four; 765046355 and 914597522 clean to S8; 396602230 and 3484178840 then refuse at S5 `E_SELF_INTERSECT F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's` (census Q52 E, M1's rungs; c-04's S5a) |
| 1933152649 (small river frame; x-06 bridge×frame, Q52 F, census R-31) | S3 `E_DEGENERATE empty` | TRACE side (strips; c-02's files): the 2026-10-14 instrumented run (CHECKPOINT 06:50) found the refusal in the insert of `layStrips`' inner sliver chain (~15 cm), which `insertChain` rejects as empty for a mandatory chain, not at a gate; on this machine the refusal is byte-for-byte the same before and after the rule (PLAUSIBLE for the layer, CONFIRMED for the unchanged outcome) | unchanged: S3 `E_DEGENERATE empty` — REPORTED for c-02's round (shape: drop or merge a strips chain below the insertion's floor before the mandatory insert) |
| 5 (RIVER 900 ha, river from the north; KI-10) | S5 `E_INVARIANT S5a's strips: a setback vertex of enceinte:2 (-31971, -10722) lies in water:river:0 (§4.8: the strips end at the banks)` | not S3: S3 commits with three dry gates before and after; the refusal is stage 2's strips (S5a, c-04 / c-02). The R-28 message x-04's note quotes for this seed (S5, `gate:5`) is a stage-2 trace's, from an earlier tree | unchanged — REPORTED (census KI-10 → c-04 / c-02; not R-28 on this tree) |

**The fix (inside the item's owns): §4.2 S3 (7)'s deck rule**, in its basic case. A route whose first point at T = t₁
falls on a deck edge with the gate's point in the water (`inWater`, the shore included) is re-solved whole as (5) solves
it — the plaza-rooted tree to its pick, heap A* beyond — with every deck edge whose ends straddle the stage-1 boundary
excluded (`resolveOffDecks`: an edge with one end selected and one not, passable, meeting a water face); its gate is the
re-solved route's first point at T = t₁, on ground. T and the boundary keep (5)'s routes and are not re-derived for it
(the design's own words); ≤ 3 re-solves per route, and a route the re-solve cannot serve takes F-ROUTE's `unserved`
(§5.2), reported; the re-solve is charged to route.nodes (its blocked tree's settled nodes plus its A*). A gate on a
deck edge whose point is DRY stands as before: the first draft re-solved every deck-edge gate and turned seed 299 of the
small river frame from committed into F-WALL (the trace had pinned that dry gate), so the rule was narrowed and pinned
(picks `a gate on a deck edge whose point is dry stands …`). The rule's fuller reach — a gate anywhere on a raised
stretch, or nearer one than the gatehouse's foot (§2.7's laws' gatehouse and band rows) — is M1's (C-0397 (3)).

**Pins** (each red on the pre-round sources, the control run: 11 of 109 red, every other test green):
`decks.test.ts` (new; the seven S3-refused seeds above commit at S3, every gate off a deck edge and out of the water);
`picks.test.ts` `§4.2 S3 (7)'s deck rule excludes a straddling deck edge in both directions` (two its) and the river
layouts' its (seed 25's bridgehead route re-solved, T as (5) solved it, the re-solve's route.nodes charge; seed 21
untouched).

**NO-SHIFT and the census.** The small river frame (CITY 30 ha, 6 ha walled, the river from the west) at seeds 1 – 1 000
through S3 (probe `noshift.mts`: the edge chain to S3; per seed the S3 refusal and a SHA-256 of the slice — picks,
routes, gates, threshold, report, outline and T's bytes): **995 seeds byte-identical; 5 differ, and they are exactly
the seeds S3 refused before** — 27 and 145 (R-28 `trace: gate gate:1 is not on the committed trace`), 128, 436 and 506
(R-29 `water: the crossing … has no clear chord … (a main gate stands in the water between its banks)`) — each
committed after. Seed 299 (the narrowing's witness) is byte-identical. **S3 refusals over the 1 000 seeds: 15 → 10**
(R-28 2 → 0, R-29 3 → 0; F-WALL `E_SELF_INTERSECT` 8 → 8 and `layStrips: a side's lines closed no strip face` 2 → 2,
the same seeds, neither the slice's). No probe run threw. Before/after files: SHA-256 f89317a7… / 2926880a… (the
10-14 run recorded the same counts, CHECKPOINT 09:40). **The census seeds:** R-28 3 → 0 and R-29 4 → 0 at S3 (two of
them then at S5, N-s2-4); R-31 1 → 1 and KI-10's seed 1 → 1, both REPORTED (not the slice). **The item's registered
families** (the folder's fixtures, seeds and edge states): 0 refusals before, 0 after — no `s3Slice` throws in
`test/siting/`. The census never rises; it falls by the lawful inputs this round makes succeed.

### N-c1c-1 (`boxOf`'s minimum y, mutant X3): PINNED

`lattice.test.ts`: `boxOf` on a ring wholly in x > 0, y > 0 and one wholly in x < 0, y < 0; and `a band wholly north of
the nucleus (every y > 0): the edges across it impassable but along its deck, its nodes water` (C-0076's water rule with
every y of the band positive). X3 (`if (p.y < y0 && p.y < 0) y0 = p.y`) is red on both. No code change: the code was
right, the row is a test gap. The note's last clause (R11's oracle importing `boxOf`) is another item's file — REPORTED,
not built.

### N-c1c-2 (the reroute's work-limit exit, mutant H13): PINNED

`fwall.test.ts` `a reroute whose search reaches route.nodes' limit is reported \`reroute\` to −1 and the route kept: no
throw`: the tilted site at seed 5 with each pick carrying its route's own bearing, so the first routes' A* label at most
3 230 nodes while ordinal 2's reroute labels 6 781; at a limit of 5 000 every first route is served, the reroute rung is
`{ rung: 'reroute', ordinal: 2, attempt: 1, from: 126, to: -1 }`, nothing is unserved, the routes are (5)'s and every
gate stands. H13 (`catch` `RangeError` in place of `WorkLimitReached`) is red on it.

### N-c1c-3 (the reroute's outward stretch least-cost, mutant H14): PINNED

`fwall.test.ts` `a rerouted outward stretch is least-cost outside the stage: its cost is the selection-blocked Dijkstra
to the rim`: on the tilted site at seeds 5 and 6, every rerouted route's cost from the node after its gate equals the
least over the rim of a Dijkstra on the graph with every selected node impassable (C-0201 (6)), within 1e-12 relative.
H14 (the heuristic aimed at the old route's end) is red on it (seed 6: 243 599 against 243 572). N-c1c-4 (H15) rides on
this pin, as the inventory says.

### N-c1c-6 (`geom.ts`'s header): FIXED (comment only)

The header now says "the package's shared home of exact plane geometry" and names the copies that stay after the
consolidation rounds: `enceinte/plane.ts`'s own segment helpers (`footOn`, `segD2`, `crossParams`) and
`infill/bentCutFabric.ts`'s private even–odd `insideRing` (both read in the tree on 2026-10-18), so a change in
`geom.ts` does not reach them. Comment only: no pin; the text is the deliverable.

### The round's mutant table (the lane's scratch mirror, one at a time, `vitest run --maxWorkers=1 --bail=1 packages/layout/test/siting`; each file restored from the tree and `cmp`-checked)

| id | file | the fault | verdict (first red test) |
|---|---|---|---|
| D1 | slice.ts | the deck rule never fires (the pre-round behaviour) | killed — decks `seed 1409296145` |
| D2 | slice.ts | the rule fires for every gate, dry ones too | killed — picks `holds on the flat fixture's own pick contour` |
| D3 | routes.ts | a straddling deck edge excluded in one direction only | killed — picks `a pick reached only across a deck that enters the selection from outside …` |
| D4 | routes.ts | every straddling edge excluded, deck or not | killed — picks `seed 25, … deck at y 0 m` |
| D5 | slice.ts | T re-derived from the re-solved route | killed — picks `seed 25` (T as (5) solved) |
| D6 | slice.ts | the ≤ 3 re-solve cap removed | survives — equivalent: a re-solved route's first exit is a passable straddling edge that meets no water (the rest are excluded), so its gate is never in the water and no route is re-solved twice; the cap is a guard |
| D7 | slice.ts | the re-solve not charged to route.nodes | killed — picks `seed 25` (the charge) |
| D8 | lattice.ts | `inWater` without the shore line | survives — a gate exactly on a shore line (measure zero on a jittered lattice); a hardening KI, below |
| D9 | routes.ts | the re-solve's tree settled nodes not charged | killed — picks `seed 25` (the charge) |
| X3 | lattice.ts | `boxOf` takes y0 only from negative ys | killed — lattice `a band wholly north of the nucleus` |
| H13 | routes.ts | `WorkLimitReached` escapes `rerouteOutside` | killed — fwall `a reroute whose search reaches route.nodes' limit …` |
| H14 | routes.ts | the reroute's heuristic aimed at the old route's end | killed — fwall `a rerouted outward stretch is least-cost …` |

X3, H13 and H14 survive the pre-round tests (the c1 closing check's own runs, its N-c1c rows); D1 is the pre-round code.

### Notes of this round

* **N-s2-1 (KI, hardening pass) D8: a gate exactly on a shore line.** `inWater` counts the shore (`insideRing(…, true)`),
  matching `meetsWater`'s closed test, so a gate on the shore line is re-solved. No input puts a gate exactly there
  (D8 survives every test and the 1 000-seed probe). A synthetic pin would need a hand-placed lattice. *Milestone:* M4.
* **N-s2-2 N-13 (not a row of this round).** N-13's bridgehead gate in the river is the case this rule re-solves: on
  the river layouts the slice now places no gate in the water (picks' river its, `decks.test.ts`), and the `heads` pin
  is updated as N-13 asked (it counts (5)'s bridgehead gates, 1 at seed 25, 0 at seed 21). The inventory's row
  M0-c-01:49 is the session's to close or route.
* **N-s2-3 R-31 and KI-10 for c-02 / c-04** (above): 1933152649's `E_DEGENERATE empty` is the strips' chain in the
  trace's insert; KI-10's seed 5 is S5a's strips with a setback vertex in the river. Neither reaches the slice.
* **N-s2-4 Q52 D's two seeds now at S5.** 396602230 and 3484178840 commit S3 and refuse at S5 with F-WALL's
  `E_SELF_INTERSECT` (the later rungs M1's, census Q52 E). A refusal moved from S3 (a lawful-input class, R-29) to a
  class the census already names; the run's bug count is the same (1 → 1).

### The round's gates (this machine, W = 1; after the last source edit)

install --frozen-lockfile 0; lint 0 (eslint 1141 files, 0 errors, 0 warnings; probe-red ok; 9 whole-tree checks);
build 0 (tsc -b ok); NEAR `packages/layout/test/siting` 9 files 109/109 at the PR size; RELATED@1000
(`vitest related --run --maxWorkers=1` over `src/siting/{slice,routes,lattice,geom}.ts`, started 2026-10-18 23:11,
5 614 s) 220 files 2 693/2 693, exit 0 — no red, the J176 bench files not selected. The item's registered families:
0 refusals before → 0 after; the census seeds as the R-28 / R-31 table above states.

## Closing check of hardening round S2 (lane `check/M0-c-01-close-s2`, 2026-10-19) — the blocker in the verdict, one note here

The verdict is `checks/M0-c-01-s2.md`: FAIL on one blocker, mutant M8. M8 keeps the deck rule's stored route across an
F-WALL re-draw, against C-0397 (1). It survives the folder's tests and is reachable. That line is the verdict's, not a
note. M15 (= H15) and M16 (= the fixer's D8) survive as N-c1c-4 and N-s2-1 already say. M18 (no box quick-reject in
`meetsWater`) is equivalent.

* **N-s2c-1 No input reaches the deck re-solve's unserved branch (mutants M9, M10).** The branch is in `s3Slice`'s deck
  rule, `again.routes.length !== 1`. There `resolveOffDecks` finds no route off the straddling decks, or the cap of 3 is
  spent. M9 drops the `unserved` report and M10 keeps the dropped route's pick. Both survive `test/siting`. The
  checker's reach probe never enters the branch: 5 700 synthetic river slices on the small site, with the deck rule
  firing 244 times, and 590 family cases (the small river frame at seeds 1001 – 1400, RIVER 900 W / N at seeds 1 – 20,
  flat at seeds 1 – 150). `picks.test.ts` pins `resolveOffDecks`' own unserved result, but only by a direct call. The
  slice's handling of that result (F-ROUTE's `unserved` reported, the pick dropped, T and the boundary rebuilt without
  the route) has no input. *Suggested handling:* build a slice whose pick lies on a bank reachable only across a deck
  that the stage-1 boundary straddles. Assert the `unserved` row, the dropped pick and that nothing throws; M9 and M10
  should then be red. *Milestone:* M4, or the fix round that closes M8 if it takes this too.

## Hardening round S2, fix round S3 (lane `build/M0-c-01-fix-s3`, 2026-10-19) — the closing check's M8 line: PINNED

The closing check of round S2 (`checks/M0-c-01-s2.md`) failed the round on one line: mutant **M8** removes
`solvedAs.delete(later);` from F-WALL's re-draw branch of `s3Slice` (`siting/slice.ts`). It survived `test/siting` and
was reachable on lawful input, against C-0397 (1) "A re-draw replaces the route T reads" and C-0201 (6). The tree's
behaviour was right, so this round changes no source file. It adds the missing pin.

* **The pin.** `test/siting/decks.test.ts`, describe `F-WALL's re-draw of a route the deck rule re-solved: the re-draw
  replaces the route T reads (C-0397 (1); C-0201 (6))`. The site is the checker's witness: `smallSite(3)`, a river band
  at x 200 – 220 m with its deck at y 100 m, `requestedN: 6`. The test states the premise step by step:
  * (5)'s first routes give six gates, no two at one point, and gate 5 stands in the river (`inWater`). So the deck
    rule fires first.
  * `resolveOffDecks` re-solves gate 5's route, and the re-solved route's gate meets gate 0 at one point. That is
    F-WALL's coincidence on a route the deck rule re-solved.

  It then asserts:
  * exactly one rung, `{ rung: 'redraw', ordinal: 5, with: 0, attempt: 1, from: 3562, to: 3722 }`, so no second re-draw
    follows;
  * the standing routes are (5)'s routes of the standing picks, with the re-drawn route as (5) solves it;
  * T is the field of those routes, byte for byte;
  * six gates, all on ground, nothing unserved.
* **Mutant (this lane's mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-c-01-fix-s3`, deleted after).** M8 was
  applied with `sed` (one line removed; `cmp` showed the file differed) and run as `vitest run --maxWorkers=1 --bail=1
  packages/layout/test/siting`. Result: `Tests 1 failed | 109 passed (110)`, and the red test is the new pin (a second
  `redraw` rung, `attempt: 2`). Restored from the tree and `cmp`-checked. **KILLED.** Re-killed after the container
  restart (CONTINUE RULE), in a fresh mirror at the same path after the gates: `Tests 1 failed | 7 passed (8)` under
  `--bail=1`, the red test the pin again (`attempt: 2`); restored, `cmp`-checked, mirror deleted.
* **N-s2c-1 (M9 / M10, the deck re-solve's unserved branch).** That pin was optional for this round and was not built.
  The note stands at M4.
* **Census and NO-SHIFT.** No source file changed, so output cannot move. The item's registered families: 0 refusals
  before, 0 after. The census seeds stand as round S2's table states them.
* **Gates (W = 1).** `install --frozen-lockfile` 0; `lint` 0 (eslint 1141 files, 0 errors, 0 warnings; probe-red ok;
  9 whole-tree checks); `build` 0; NEAR `test/siting` 9 files, 110/110; RELATED@1000 over
  `siting/{slice,routes,lattice,geom}.ts` (W = 1, started 11:27 after the container restart; the 08:37 run's log
  stopped mid-run): 220 files, 2694/2694, exit 0. Re-run after the restart: `install --frozen-lockfile` 0, `lint` 0
  (the same counts), `build` 0, NEAR `test/siting` 9 files 110/110 (W = 1, 180 s).
