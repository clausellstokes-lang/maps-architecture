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
