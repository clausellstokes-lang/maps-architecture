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

## Round C1 — consolidation round R11 (lane `build/M0-a-14-consolidate-1`, flow flow-7, 2026-10-13)

The round applies V-1 – V-5 of `plat/docs/build/consolidation/kernel-plan.md` §1.10, the comment row C-inv-1 (§2's
`invariants/batch.ts` 590, 602 and the index rule) and §3.4's `test/invariants` row (no merge), after R1 (`num/exact.ts`),
R5 (`index/items.ts` `faceArea2`) and R6 (J260, J263 Q1, Q6, Q8; J264 (5); J270 (a), (b); J311 (5)). It changes no
behaviour. Its choices row is C-0357.

### What changed, and the equivalence shown

| finding | change | equivalence |
|---|---|---|
| V-1 PI | `batch.ts`'s π literal goes; `acuteCorners` reads `num/exact.ts` `PI` (by path). | The same literal `3.141592653589793` (M0-a-01's copy table now reads the site as CONSOLIDATED, `importsShared`). |
| V-1 uniq | `uniq` goes; its three uses read `[...new Set(xs)]` (`recordVertices`, `placementBound`, `indexFreshness`). | The removed body was that expression; insertion order and the filter after it unchanged. |
| V-1 neighbours | KEPT (judgment, vetoable): its twin `insert/snapRound.ts` `neighbours` is one line and the arena has no shared home (R4 added none); the doc names the twin and the clearance clause it serves. | — |
| V-1 faceArea2 | The body goes; `batch.ts` imports `index/items.ts` `faceArea2` (by path) for the kept-content row and re-exports it (`export { faceArea2 }`), so `invariants/index.ts:18` and the barrel export the same name. | items.ts's body is this one with `lp(x[v], y[v])` for `pointOf(p, v)` (the same two numbers); the same rings (`faceRouteRings(p, level, f, level)`) summed in the same order by `area2` — the same doubles. `test/index/items.test.ts` already held the three equal (C-0345). |
| V-2 segmentsMeet | `common.ts`'s body and its private `sign` / `onSegment` go; `batch.ts`'s simple-faces row imports `num/exact.ts` `segmentsMeet`. **Plan premise corrected:** the builder's re-grep finds `test/num/copies.ts:22` (M0-a-01's copy table, outside this item's owns) importing `segmentsMeet` from `invariants/common.js`; deleting the name would fail `tsc -b` there, so `common.ts` keeps the file-level name as `export { segmentsMeet } from '../num/exact.js'` (N-1's `warp/validate.ts closerThan` precedent). The copy table's 'N-2 invariants' site now compares num's with itself. | The old body decided `sign(o1)·sign(o2) < 0 && sign(o3)·sign(o4) < 0`, then the four collinear closed-box cases; num's decides `(o1 > 0 && o2 < 0) \|\| (o1 < 0 && o2 > 0)` (likewise o3, o4), then the same four cases with `inClosedBox` — the same truth table on every finite orientation (±0 reads 0 in both); `test/num/equivalence.test.ts` N-2 held them equal before the round (4 × 4 grid exhaustive, the fuzz arenas, the property). |
| V-2 segmentBox | KEPT (J311 (5)); its doc names `insert/stretch.ts`'s as the clamped double form (floor / ceil, ±2²⁴) and says the two agree on lattice inputs only. | — |
| V-3 | `whole.ts` `seedTilingProblems`' inline `inside` closure → `insideOrOnRing(s, q.x, q.y, 'nonZero')`. | Boundary table below; M0-a-01's copy table reads the 'N-3 invariants/whole' site as CONSOLIDATED (`whole.ts` imports `num/exact.js`). |
| V-4 | `eulerCounts` KEPT beside `test/insert/step3-5/support.ts`'s oracle (the oracle rule, plan §4); its doc says so in one sentence. | — |
| V-5, C-inv-1 | `lawfulCoarserFaceWrite` and `indexFreshness` docs state the rule (§2.2 rule 2; C-0185 (12); C-0219 (1), (2); C-0235 under ruling N-49) in place of the N-47 / N-49 narration; `invariants/index.ts` drops the scaffold sentence; `common.ts`'s module comment names num's contact test; `compareDist2`'s doc says why it is not `segmentCloserThan`. Every `<row>: <problem>` text and verdict text verbatim (J263 Q6). | Comments only. |

**V-3's boundary rule, before and after** (the pre-round closure read from the saved pre-round `whole.ts` and evaluated
with the real `orient2d`, against `insideOrOnRing(…, 'nonZero')`): identical on 1 804 525 inputs — every ring of 0 – 4
points in a 3 × 3 grid against every query in a 5 × 5 window, plus 20 000 random rings of 5 – 8 points (every fifth
wound twice) against a 9 × 9 window.

| case | before | after |
|---|---|---|
| a seed vertex / a point on a seed edge | inside | inside |
| interior / exterior of a simple seed | inside / outside | inside / outside |
| interior of a doubly wound seed (winding 2) | inside (non-zero) | inside (non-zero) |
| a two-point seed: a point on its segment / off it | inside / outside | inside / outside |
| a one-point seed: that point | inside | inside |
| the empty seed | outside | outside |

The reading "fewer than three points: read as given" is this site's (closed, non-zero, lattice); `warp/held.ts`'s
"fewer than three: outside" stays that site's.

### Old file → new file (J263 Q8)

No file was merged, split or renamed (§3.4: one subject per file). `src/invariants/{batch,common,whole,index}.ts`
changed in place; `debug.ts`, `expect.ts`, `rows.ts`, `types.ts` unchanged. `test/invariants/fixtures.test.ts` →
itself (three `it` added: kept-content: a split "the measure is index/items.ts's faceArea2 under the suite's name
(C-0345) …"; seed-tiling "the containment reading is closed and non-zero …"; placement-bound "a vertex named more than
once … is one subject, reported once"); `debug.test.ts`, `expect.test.ts`, `fuzz.test.ts`, `support.ts` byte-unchanged.
Every describe / it title kept (119 before, 122 after); support.ts's oracles untouched.

### NO-SHIFT, API, refusals

* **NO-SHIFT probe** (mirror only): the suite's verdicts (`checkBatch` on every committed record, `checkCI`,
  `checkStageEnd`, `checkSave` after every step, the report's batch lines), `faceArea2` on every live face after every
  step, over the item's registered families — B-FUZZ seeds 1 – 20 × 18 steps (×7919), the cost-model runs 12 × 16
  (×104 729), the 100 warp cases (×15 485 863) — and `seedTilingProblems` on 20 000 random ring sets: 22 263 lines,
  byte-identical on the pre-round sources and the round's (sha256 `149b16df…`). The probe is sensitive: the placement
  dedupe dropped moves 35 lines, the even–odd reading 88.
* **API frozen** (TypeScript checker listing, names and types): the barrel's 673, `invariants/index.ts`'s 41 and the
  file-level exports of `common.ts` (7), `batch.ts` (8), `whole.ts` (9) identical before and after.
* **Refusals** (J264 (5), N-58): the suite's rows refuse nothing in the families — 0 before, 0 after (no refusal detail
  starts with a row name; the 100 warp cases commit). The families' other refusals are the writers', identical before
  and after: 130 `E_KEPT … (kept content)` (M0-a-05's `finerNear`; classed under M0-a-06's N-c1-2, routed to M0-a-05 /
  the census) and 3 `E_INVARIANT (way, way:n) lies in 2 parts …` (tx's role-parts rule, §3.10 role consistency; an
  unlawful request without a rekey, REFUSE with the rekey named in the text) of 552 steps; not this item's operations.

### Self-check (J183)

21 targeted mutants in the lane's mirror, each restored and `cmp`-checked: V-1 PI halved, neighbours read as origins, a
local `faceArea2` copy dropping holes; V-2 the crossing call dropped, the file-level name a proper-crossing-only copy
(killed by `test/num/equivalence.test.ts` N-2), the clearance box unpadded; V-3 even–odd, strict, fewer-than-three
outside; V-4 round 1's K38; V-5 s1's X01, X03, X12 and s1 / s2's X07; round 1's K02b, K10, K23, K31, K33 — all KILLED by
the folder. Two dedupe mutants survived at first: the placement one now dies on the new placement-bound pin; the
index-freshness one is note N-c1-1. The consolidated tests on the pre-round sources: 107 / 108 (only the faceArea2
identity pin red, by design: it pins one body); the pre-round tests on the round's sources: 105 / 105.

| id | note |
|---|---|
| N-c1-1 | **The index-freshness changed list's dedupe is unpinned (pre-existing).** `[...new Set([...r.moved, ...r.promoted, ...r.demoted.vertices])]` → the plain list survives the folder and the NO-SHIFT probe: a vertex both moved and promoted or demoted in one batch would be listed twice, doubling the row's subject count (and a stale item's problem line); no M0 writer moves and promotes one vertex in one batch. The same mutation of the pre-round `uniq` survives equally. Hardening: a hand record naming one vertex in `moved` and `promoted`, expecting `subjects` to count it once. Milestone M4. |
| N-c1-2 | **`recordVertices`' dedupe is equivalent.** Dropping it changes nothing: `touchedSet` collects the vertices in a `Set`. No test. |
| N-c1-3 | **The families hold no holed face.** A `faceArea2` reading only the outer ring leaves the NO-SHIFT probe unchanged (the fuzz arenas' faces have no holes); the identity pin (the suite's `faceArea2` is items.ts's) and items.test.ts's holed fixtures hold the measure. |

## Notes from the closing check of round C1 (lane `check/M0-a-14-consolidate-close-1`, 2026-10-13)

None of these fails the round. The verdict is in `checks/M0-a-14-c1.md`, and the mutant ids are the ones that file uses.
This check confirms N-c1-1 (the index-freshness dedupe, mutant `V1-uniq-fresh`: it survives the near set, and no vertex
sits in two record lists in any of the 477 fuzz records) and N-c1-2 (`V1-uniq-record` is equivalent: `touchedSet` adds
to `Set`s, and a repeated `add` changes neither content nor order).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-4 | **No test pins the face-corners threshold (mutants `V1-phi-2pct` and `V1-phi-10pct` survive the near set).** `acuteCorners` reads φ = cdeg·π / 18 000. Scaling φ by 1.02 or by 1.1 leaves the folder green, because its fixtures are a 3.6° corner against right angles and minFaceAngle is 5°. This predates the round: V-1 changed only where π comes from, and the same double is shown by the copy table and the NO-SHIFT dump. | Add two lattice corners, one just below 5° and one just above it (for example 4.9° and 5.1°), to the face-corners fixture: the soft row reports the first and holds on the second. Do the same for the hard row with `optional`. | M4 |
| N-c1-5 | **simple-faces' touch and overlap half of the contact test has no isolating control (mutant `V2-meet-no-touch` survives the near set).** In the mutant, `segmentsMeet` counts only proper crossings. The checker's controls ran in the mirror. C-touch moves a lane end onto the interior of a way edge. C-overlap lays a lane edge along a way edge with no shared vertex. On the real code, simple-faces fails both with `… cross`. Under the mutant simple-faces holds, but clearance still fails both, so the batch's verdict is the same. This is the same class as note 2 and predates the round, because V-2's truth table is shown equal on 465 536 inputs. | Add C-touch and C-overlap to the simple-faces fixture, asserting the `cross` problem. | M4 |
| N-c1-6 | **Comment wrap, cosmetic.** In `invariants/batch.ts`, one line of the rewritten `indexFreshness` doc (line 599) is 137 characters wide (the line that ends "(2) The changed items the record names — its created faces, its moved, promoted and"). The file otherwise wraps at 120. The text matches the code. | Rewrap the next time the file is edited. | M4 |
| N-c1-7 | **A stale sentence in a file outside the owns (for the session; owner M0-a-03).** The `faceArea2` doc in `index/items.ts` says "Exported from this file only: the package's `faceArea2` is the invariant suite's, an equal reading pinned equal to this one (C-0345)". After V-1 the package's `faceArea2` is this same function, re-exported through `invariants/batch.ts`. The new fixture "the measure is index/items.ts's faceArea2 under the suite's name" pins `toBe`. | When M0-a-03's file is next edited, reword it to "the package exports this body under the suite's name (invariants/batch.ts, C-0357)". | session / M0-a-03 |

## Round S3 — session fix round on Q56 and Q61 (lane `build/M0-a-14-fix-s3`, flow flow-7, 2026-10-13)

The hardening phase's first round for this item (J237 (2)), on the two lines the session wrote: `faceLeftOf`'s index
box (Q56; `checks/M0-a-05-notes.md` N-s8-1, N-s8c-1) and the level-consistency row's every-level reading (Q61;
`checks/M0-a-06-notes.md` N-s6-2). Choices row C-0359.

### What changed

* `src/invariants/common.ts` `faceLeftOf`: the segment box padded by `WALK_REACH_CM` (3 cm), imported by path from
  `../insert/rewalk.js` (its one definition; C-0349 (1)); no cycle (rewalk.ts's import closure holds no `invariants/`
  file), no barrel touched (J263 Q1). The exact ring-membership test and the one caller (`batch.ts`, nesting's island
  host) are unchanged.
* `src/invariants/batch.ts` `levelConsistency`: a vertex finer than its coarser edges — exactly two, of one level e —
  has their rows compared at every level r from e to its level − 1 (of level ≤ 1 at r = 1), one problem at the first
  level that differs: at r = e the old text verbatim, above it `the vertex (x, y) (Lv), finer than its Le edges, lies
  inside no single Lr run: their rows of level r differ ([…] and […])`.
* `src/invariants/rows.ts`: the level-consistency clause names the every-level reading (no new row).
* `test/invariants/fixtures.test.ts`: the sliver pin (`faceLeftOf`, the reach = 3), five level-consistency pins and the
  fourteen Q54 arenas, every new text pinned verbatim.

### Evidence

* **NO-SHIFT** (mirror probe over every batch of the item's registered families: B-FUZZ 20 × 18 at the PR size, the
  cost model's 12 × 16, the grid k = 4 – 16, 100 warp cases; outcome, suite batch results with meters, `allProblems`
  and `checkCI` after each): 804 lines byte-identical before and after, sha-256 `224636f0e70f852f…`.
* **Refusal census** before = after: committed 419, E_KEPT 130, E_INVARIANT 3 (stretch's role-parts refusal), warp
  100 / 100; suite refusals 0 → 0.
* **Cross matrix** (mirror): the pre-round tests on the round's sources 108 / 108; the round's tests on the pre-round
  sources 18 failed (exactly the new pins: the sliver, the clause, the in-between L2 and `≤ 1` texts, Q54 14 / 14) |
  112 passed.
* **Mutants** (J183, `--bail=1` on test/invariants, restored and `cmp`'d each): pad 0 KILLED (`expected -1 to be +0`);
  own-level-only loop, `≤ 1` → `= r`, `r ≤ lv`, own level skipped, no break, old text for the in-between level, the
  own-level filter at every level, the not-one-run text dropped, the level order reversed, the holes test dropped —
  KILLED; pad 1 survives (N-s3-1).

### Routed, not built (the round's brief)

* tx's rule 3 (c) `single` (`tx/relevel.ts:665`) reading every level once the row exists, and its fixture where
  `single` must refuse a mismatched pair (N-s6c-3) — **M0-a-06's hardening round**.
* `tx/relevel.ts:155` `recordLeftOf`'s ±1 cm box (N-s8-1's sibling site) — **M0-a-06's next round**.
* §3.10's level-consistency sentence gains the every-level reading in the session's hardening pass of the design text.

| id | note | what would close it | milestone |
|---|---|---|---|
| N-s3-1 | **The reach is pinned at one level of Steiner offset (mutant pad 1 survives).** The sliver pin's L2 vertices stand 0.3 – 0.4 cm off the L1 route, so a 1 cm pad already reaches the holder; the reach's derivation (C-0349 (1)) covers up to four levels of offset (≤ 2.84 cm). The reach's value is pinned (`WALK_REACH_CM` = ⌈4 · HOT_PIXEL_CM⌉ = 3) and `faceLeftOf` reads it, but no arena puts a sub-edge ≥ 1 cm off its route. | A sliver built over two or three levels whose roundings fall on one side (each level's route slanted off the lattice row), reaching ≥ 1 cm, killing pads 1 and 2. | M4 |
| N-s3-2 | **The step3-5 oracle `allProblems` (outside the owns) still passes Q54's arenas.** The suite's level-consistency row now fails all fourteen (fixtures), but the independent oracle M0-a-04 / M0-a-05 wrote reads no route constancy. | The oracle's owner adds an every-level run-constancy check, or the suites keep `readable` (tx's support) as that oracle. | session |
| N-s3-3 | **N-c1-6's comment rewrap in `batch.ts` stays open.** Not done in this round, to keep RELATED's inputs fixed while it ran. | Rewrap at the next edit of the file. | M4 |

## Notes from the closing check of round S3 (lane `check/M0-a-14-close-s3`, 2026-10-14)

None of these rows fails the round. The verdict, and its one blocker (mutant `B11-upto-e+1`, line 3), are in
`checks/M0-a-14-s3.md`, and the mutant ids below are the ones that file uses.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s3c-1 | **N-s3-1 holds, and the checker found no reachable input that separates pads 1 and 2 from the reach.** The checker's stacked-offset search ran 300 random slivers and 400 nested L2 ⊃ L3 ⊃ L4 arenas on one L1 route (1 600 L4 chains committed through `insertChain`). Together that is 177 562 `faceLeftOf` calls against an exhaustive ring-membership truth. Pad 0 missed 6 207 times; pads 1, 2 and 3 missed 0 times. The families gave 135 702 calls, with 0 misses at every pad. Q56's class is easy to reach by construction, so the round's fix matters. The reach's margin above 1 cm is unproven by any arena. | Keep N-s3-1's pin when a construction ≥ 1 cm off its route exists. Until then the 3 cm reach is the derived bound (C-0349 (1)). | M4 |
| N-s3c-2 | **Survivors judged equivalent (one line each).** `B7-prec` (the `≤ 1` class at r = e = 1) and `B14-ownlevel-le` (rows of level ≤ e at r = e) are equivalent: an edge carries no row below its birth level, which is the row's own first clause and §2.2 rule 3. `B13-nosort` (rows compared unsorted) leaves the dump identical: the two sub-edges of one split edge carry their rows in one order. `A6-pad300` changes only the nesting meter (11 dump lines, +1 face) and every verdict is identical. The cost bar (≤ 12 × touched) does not bound the pad. | None needed. If ever wanted: a fixture where the two sides carry the same rows in different stored order, for B13. | M4 |
| N-s3c-3 | **The checker's constructions met only kernel kept-content refusals.** Coarser chains inserted beside finer ones with no clear were refused 1 659 times, all E_KEPT: inside a finer face ×1 217, within attractCm of a finer vertex ×340, of a finer edge ×101, would share a finer edge ×1. The families give 178 E_KEPT, the same before and after. The input is a coarse insertion into kept finer content with no `rederivesFrom`. That is the class of `checks/M0-a-06-notes.md` N-c1-2 (M0-a-05's open reading), not this item's. | The session, with N-c1-2. | session |

## Round S4 — fix round on the closing check of S3 (lane `build/M0-a-14-fix-s4`, flow flow-7, 2026-10-14)

The closing check of S3 (`checks/M0-a-14-s3.md` line 3) failed the round on one new blocker: mutant `B11-upto-e+1`
(`if (a === b) continue;` → `if (a === b || r > e + 1) continue;`) survived, because every pin compared at most one
level above the coarser edges' level e. Test only, inside the owns; no source file changed (the eight
`src/invariants/` files hash equal to S3's landed record), so NO-SHIFT and the refusal census hold by construction
(S3's census stands: committed 419, E_KEPT 130, E_INVARIANT 3, warp 100 / 100; suite refusals 0 → 0). No choices row:
the round decides nothing; C-0359 names the row and its test.

### What changed

* `test/invariants/fixtures.test.ts`, describe 'level-consistency at every level between (N-s6-2, C-0359)': five tests
  on arenas committed through `insertChain`, each with rows added by `addRole`.
  * L3 kerb end on the L0 frame at (1000, 0) (lv − e = 3), an L2 row on one side only: rows agree at r = 0 and r = 1,
    differ at r = 2 — `level-consistency: the vertex (1000, 0) (L3), finer than its L0 edges, lies inside no single L2
    run: their rows of level 2 differ ([1/2/0] and [])`, pinned verbatim; its agreeing control (the L2 row on both
    sides) holds.
  * L4 kerb end on an L1 way at (2000, 1000) (lv − e = 3), the same L2 row on both sides, an L3 row on one side: rows
    agree at r = 1 and r = 2, differ at r = 3 — `… (L4), finer than its L1 edges, lies inside no single L3 run: their
    rows of level 3 differ ([1/4/0] and [])`, pinned verbatim; its agreeing control (L2 and L3 rows on both) holds.
  * L4 kerb end on the L0 frame at (1000, 0) (lv − e = 4, the deepest the five levels allow): rows agree at r = 0, 1, 2
    and differ at r = 3 — `… (L4), finer than its L0 edges, lies inside no single L3 run: their rows of level 3 differ
    ([1/3/0] and [])`, pinned verbatim; the L3 row added on the other side, it holds again.

### Evidence

* **Mutants** (J183, the lane's own mirror, isolation proven, restored and `cmp`'d): `B11-upto-e+1` KILLED (the three
  new negative pins red; `--bail=1` over test/invariants red at the first); `B12-upto-e+2` (`r > e + 2`, reads up to
  r = e + 2) KILLED by the lv − e = 4 pin — the loop is now pinned at every reachable depth. Agreeing controls green
  under both.
* **Gates**: install --frozen-lockfile 0, lint 0 (eslint 1139 files, probe-red ok), build 0, NEAR test/invariants
  4 files 135 / 135, RELATED@1000 over `src/invariants/{common,batch,rows}.ts` (the item's S3 sources, unchanged)
  331 files 4180 / 4180, exit 0 (W = 1, 6112 s); the gates and both mutants re-confirmed after a container restart
  (install 0, lint 0, build 0, NEAR 135 / 135, B11 and B12 KILLED in a fresh isolated mirror).

Routed items of S3 (tx (c) `single` every-level and N-s6c-3's fixture, `recordLeftOf`'s box → M0-a-06) stand as
written; nothing new routed.
