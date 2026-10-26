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
