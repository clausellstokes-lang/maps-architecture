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
