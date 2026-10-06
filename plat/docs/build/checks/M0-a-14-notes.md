# M0-a-14 — the checker's minor notes (for the hardening milestone M4)

Lane `check/M0-a-14`, 2026-10-05. These notes do not fail the item (J180). The blockers are listed in
`checks/M0-a-14.md`. The mutant ids (K…) and control ids (C…) are the ones that file uses.

1. **The clearance row's second loop is not isolated by any test (K03 survives the item's tests and the checker's
   controls).** The loop checks every touched edge against the vertices the index finds near it. On an honest record it
   gives the same verdict as the first loop. The argument: a vertex within `minEdge` of a touched edge lies either on a
   ring of a recorded face adjacent to that edge, which makes it a touched vertex that the first loop checks, or behind
   a nearer edge. In the second case the nearer edge's endpoint, or the touched edge's endpoint, is itself within
   `minEdge` and is caught. The loop matters only for a record that names moved vertices without their faces. A fixture
   that uses such a record (a moved vertex with an untouched vertex near one of its incident edges) would isolate it.
2. **The simple-faces clauses "one vertex pair joined twice" (K08) and "overlap at a shared endpoint" (K09) have no
   isolating negative control.** The checker's controls C1 (an antenna laid back along a way edge) and C2 (a digon
   spliced into a ring) still fail the row with each mutant, through the rotation or winding clause. So the mutants give
   the same verdict on those inputs, and the problem text names a different clause. A fixture whose corruption only these
   clauses see would pin them.
3. **The nesting row's "an L0 face names no parent" clause (K13) is untested.** The design's nesting clause speaks only
   of faces of level n + 1, so this clause is off the stated promise.
4. **Equivalent survivors, which need no test.** K02 (`< r²` → `< r² − 1`) is equivalent because 624 is not a sum of two
   squares, so no lattice edge has length² 624. K16 (the placement route's start taken as the run's first vertex) is
   equivalent because a run's endpoints are its nearest vertices of the run's level.
5. **When `BatchContext.placed` is absent, the placement-bound row reads only the record's moved vertices, and it adds
   no note.** C-0200 (3) allows reading the record only, but every other row with a missing input writes a note. B-FUZZ
   never hands `placed` in. The checker's probe A did: 16 seeds and 195 commits gave 141 subjects and 0 false positives,
   so the row is sound when the input is given. Hand `placed` to the fuzz runs and add a note when it is missing.
6. **kept-content's clear-region clause** ("nor, in a clear-region batch, any finer face outside the region") is not
   built. Its subject cannot arise at M0, because the transaction refuses `clearRegion` with `notBuilt('M3a')` (§4b).
   But neither the row's `deferredTo` / note nor C-0200 names this clause's deferral. M3a should build it together with
   prepared contacts.
7. **The build flag and tree-shaking.** `@plat/kernel` declares `"sideEffects": false`. A bundle that imports the kernel
   by name under the `plat-source` condition with `define: { PLAT_DEBUG_BUILD: 'false' }` drops `invariants/debug.ts`
   when nothing imports from it. The arena's runtime switch then stays on: the checker's probe read
   `debugAssertions() === true`, and the bundle has no `setDebugAssertions(false)` call. The same bundle built against
   the package's built `dist/index.js` keeps the call, and there the switch is off. M1's app bundle should keep the
   switch whichever way it resolves the kernel, for example by reading the flag in `arena/debug.ts` itself. The item's
   debug test bundles `debug.ts` as its own entry, so it cannot see this.
8. **`suiteEnv` with a function context gives `kernelChecks` an empty context**, so `expect` entries never see that
   context (for example a hard optional-corner entry). The whole-suite hook does see it.
9. **The face-corner threshold is computed with `dmath.cos` / `dmath.sin` in doubles.** A corner exactly at
   `minFaceAngle` is not tested, so the boundary class (soft, or acute) is unpinned.
10. **Probe B's suite-only reports were all expected.** In 300 nudged-vertex trials, the oracle broke 17 and the suite
    missed 0. The suite also reported cases the oracles do not check: a moved vertex off its coarser route
    (placement-bound), and moved vertices found in a static partition after the probe re-attached the index
    (index-freshness, which correctly expects a batch's moved vertex in its level's grid). These are not findings.

## Closing check (lane `check/M0-a-14-close-r1`, 2026-10-05)

These notes do not fail the item (J162, J169: the item's second check closes it). The closing check ran 41 targeted
mutants (ids K… re-run from round 1, C… its own) in its scratch mirror, one at a time with `--maxWorkers=1`. It then
wrote controls X07 – X35 there, to judge whether each survivor was equivalent. Every control passes on the real code.
So each note below records a missing test, and the code gives the right result in every case. The control code is kept
for reference only (scratch, outside `plat/`, never an input) at
`~/maps-scratch/waves/check-M0-a-14/close-r1/zz-close-controls.test.ts.keep`. Each recipe below is complete without it.
Each one names the mutant it kills. Suggested handling for 11 – 21: add the control to `fixtures.test.ts` under its row.
The hardening milestone is M4, unless a row's subject arrives earlier (named in the note).

11. **references-resolve: a role row on a dead edge slot has no negative (C07 survives).** The fix round's B3 (b) test
    covers only a vertex row. Control X07: in `base()`, take the kerb's edge from (0, 1000) and set
    `halfEdges.origin[h & ~1] = -1`. `checkStageEnd` then fails with "a kerb row names a dead edge slot".
12. **references-resolve: the knots of a ring in ordinal order (C-0200 (12): "with at most one wrap on a ring") are
    untested (C08 survives).** Every order fixture uses an open way. A ring with three knots is always in cyclic order,
    so a test needs four. Control X08: a closed kerb ring (500..1500)² with knots of ordinals [0, 2, 1, 3] at its four
    points, with a profile of four values. It fails "not in ordinal order". The positive X08b uses [2, 3, 0, 1] (one
    wrap) and holds. This waits for M1, when a stage first stores a profile on a ring.
13. **references-resolve: "two knots of … share one vertex" fires only for an open run with exactly two knots (C09
    survives).** With three or more knots, two knots on one vertex give equal positions. That counts neither up nor down,
    so it passes. The code's own reading is therefore not consistent. C-0200 (12) does not state the clause. Decide
    whether knots must stand on distinct vertices, then make the check agree for every count (M1, with the first
    profile writer).
14. **references-resolve: "a stored VertexRef finds more than one vertex" (C10 survives).** For an indexed non-knot role
    this is equivalent: the one-vertex-per-ordinal clause reports the same reference. A `VertexRef` of a knot role, or
    of a non-indexed role, is untested. It is contrived at M0, where no entity stores one.
15. **Over-reporting guards that no positive fixture exercises (C15, C25 survive).**
    * In prepared-contacts, the filter to edges of the batch's own level is unexercised. Control X15:
      `checkBatch(wholeRecord(p), p, { prepared: [] })` after an L2 kerb, with finer edges in the touched set. It holds,
      and holds no longer without the filter (M3a, with clear-region batches).
    * In level-consistency, the vertex-role half of "no vertex coarser than everything at it" is unexercised. Control
      X25: an L2 lane's end set to L1, carrying an L1 `deck_end` row. It holds, and fails when vertex rows are ignored.
16. **arena-isolation: a record naming a dead face slot, or a dead demoted half-edge, has no negative (C18, C19
    survive).** The row's test covers the key and a dead vertex slot. Controls X18 (an L2 `created` slot `top + 4`) and
    X19 (`demoted.edges: [2 · pairTop + 6]`) each fail the row.
17. **clearance: the second loop's strict bound (C20 survives; see note 1).** The loop is isolated by an untouched vertex
    standing exactly `minEdge` from a touched edge. Control X20: in `blocks()`, an L2 lane whose end is moved by hand to
    (1000, 1975) and re-indexed (`indexChange` of the vertex and its edge). Then the L2 kerb (0, 3000)–(2000, 3000) is
    committed, which touches the way edge y = 2000. The row holds, and fails under `<= 0`. Without the re-index the
    loop's query finds the vertex at its old point, which is why the round-1 fixture "exactly minEdge away holds" does
    not reach this loop.
18. **simple-faces: rotation order at a vertex of degree 3 (C21 survives).** The rotation-swap negative uses the degree-4
    crossing. Control X21: at the T-junction (2000, 1000) of `base()`, re-link the three outgoing half-edges in reverse
    order, with no coordinate moved. The row fails, and holds when the rotation check skips degree 3.
19. **nesting: "no live parent" is not isolated (C23 survives).** The negative "a dead parent fails" uses slot
    `top + 3`. That slot's walk throws inside the row, so the row fails through "the row's walk failed" even when the
    liveness clause is removed. Control X23 frees the face's real L1 parent (`faces[1].kind[par] = FREE_KIND`). The walk
    then reads the stale ring and passes, so only the liveness clause fails the row.
20. **level-consistency: "its incident edges coarser than it are exactly two, of one level" (C26 survives).** The
    negative covers two coarser edges with different rows. Control X26: in `blocks()`, set each frame-and-way
    T-junction's level to 2, so it has three coarser edges. The real code reports "lies inside no single run" at all
    four junctions. The mutant, which compares only the first two edges, misses some of them.
21. **role-consistency: "no structural role is lost by an absorption" (C35 survives).** The negative passes `opKinds:
    ['mergeFaces']` only. Control X35 passes the same record with `['absorbSliver']`, and it fails the row.
22. **Equivalent or contrived survivors, which need no test.**
    * C33 (the `Number.isInteger` clause of lattice-range removed) is equivalent: coordinates are stored in
      `Int32Array`s.
    * C22 (placement's "lies on no route" branch disabled) gives the same verdict: with no end found, `compareDist2`
      reads `X[-1]` and throws inside the row's guard, so the row still fails.
    * C34 (a profile on an `edges` view with no runs) is contrived. It differs only for a profile of zero values on a
      missing chain. Every other profile reports its knots as off the chain.
23. **For the session, not this item: `M0-a-05`'s insertChain B-FUZZ fails on one random seed.** The kernel project
    gate's first run in this seat exited 1. Its one failure was
    `test/insert/step3-5/bfuzz.test.ts > … random chains into arenas holding up to three earlier random chains`:
    "an unknown refusal E_INVARIANT (insert: no route from (313, 244) to (341, 251) keeps clearance (§3.10))". This is
    `insertChain.ts:399`, the N-37 / N-40 router gap. The failure replays deterministically with
    `PLAT_FUZZ_SEED=-1863295922 corepack pnpm exec vitest run --project kernel --maxWorkers=2
    packages/kernel/test/insert/step3-5/bfuzz.test.ts -t "random chains into arenas"` ("Property failed after 8346
    tests"; the counterexample is a single L0 mandatory chain of about 300 points, many repeated). The test and its
    imports reach no file of `src/invariants/`: the only importer of `invariants/` is `kernel/src/index.ts`, and the
    test imports by relative path. A re-run with another seed passed 1338/1338. The seed should go to M0-a-05's owner,
    as an N-37 case that the S1 fix (86fa8438) does not close.

## Notes from the closing check of the session fix round S1 (lane `check/M0-a-14-close-s1`, 2026-10-06)

The blocker of that check (B-1, the unpinned `tombstone` half of N-49's admission) is in `checks/M0-a-14-s1.md`. The
mutant ids (X…) are the ones that file uses.

24. **No negative control pins the `w.kind === ITEM_FACE` guard of `indexFreshness`'s coarser-write filter (mutant X10
    survives near and is not equivalent).** Without the guard, a coarser ITEM_VERTEX write would be judged by the face
    predicate `lawfulCoarserFaceWrite` (its slot read as a face slot). A hand-logged coarser vertex `tombstone` / `delete`
    whose slot number is a free face slot would then be admitted. No M0 writer logs a coarser vertex write outside its
    promotions and demotions, so this is a deliberate-writer escape, not an honest-path defect. Suggested handling: a
    fixture that hand-logs a coarser ITEM_VERTEX `tombstone` of a live L1 vertex whose slot number is a free L1 face slot
    in an L3 batch and expects the row to refuse naming it. Milestone M4.
