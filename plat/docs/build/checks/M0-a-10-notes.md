# M0-a-10 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-10 (lane `check/M0-a-10-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Every finding below is a contrived
arena state, a hardening test or a cost to measure, so none of them fails the item. Each row names its handling and the
milestone or item where it belongs. The verdict and its evidence are in `checks/M0-a-10.md` (the closing round, at the
top). The first check's notes N-1 – N-6 stay in `checks/M0-a-10.md`; N-4 was taken up by C-0163 (4), and N-1 (M0-b-02
must pass `arcMaxCm`) is still the session's to route. The ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-7 | C-0163 (1)'s neighbour check "f live" (`neighbours.ts` 160, `isFaceLive` in `onFace`) has no test that can fail. Mutant MLV (the liveness test dropped) passes `boundary.test.ts` (13 of 13); it is the only test file that queries a kept map after a write. MLV is not equivalent. Probe P3 sets up a 3 × 3 grid at L0 with a corner slot freed and committed, so slot 8 is free. A query fills the kept map. Then a batch allocates the north region's new record (it takes slot 8) and then frees its old record, slot 7. Version and counts are unchanged (`1\|24/24/9/8/16/0`). The code answers `[1,3,5,8]`, as a fresh map does. Under MLV the query throws `arena: face 7 is not live at L0`. CONFIRMED (mirror, probe source `scratchpad/waves/check-M0-a-10-close/probe-close.test.ts`). | Add P3 (allocate before free under the kept key) to `boundary.test.ts`, so MLV turns it red. | M4 (test hardening), or the next lane that touches `neighbours.ts` |
| N-8 | A ring claimed by two live records makes the answer depend on history. Probe P2 uses the same grid. After the batch allocates the north region's new record (slot 8) and before it frees the old one (slot 7), with a far corner freed so the counts match, the kept map answers `[1,3,5,7]` and a fresh map answers `[1,3,5,8]`. The fresh map gives the higher slot, because the last build write wins. The kept claim "7" passes its re-check: 7 is live and owns the ring. So the answer depends on whether an earlier query filled the map. The state breaks one record per region (§2.2), so it is a transient inside a batch, not an honest committed input. C-0163 (1)'s "answers the arena as it is, committed or not" holds where the live records of the level own disjoint rings. CONFIRMED (probe P2). | One of three. (a) A choices row restates C-0163 (1)'s premise: the live records own disjoint rings. (b) A neighbour claim also requires `sameAnchors`, which costs O(faces of the level) for each query. (c) Both paths settle a shared ring the same way, for example to the lowest slot. M0-a-06's checker confirms whether a transaction can query between an allocation and its free. | M0-a-06 (its transaction design); otherwise M4 |
| N-9 | The B-FUZZ hexLattice property (`bfuzz.test.ts` 174) draws regions of one ring only, so its 10⁶ nightly inputs never hold a hole. Mutant MHO (`hexLattice` reads only the first ring) passes `bfuzz.test.ts` (11 of 11). Only the fixed-size `hex-lattice.test.ts` kills it ("keeps no point in a hole", 1 of 7 red). The property asserts its title, "strictly inside the region"; what is narrower is its input space. CONFIRMED (mirror). | Draw an optional hole ring inside the outer ring in the property, as the sideRuns and sampleBoundary properties draw several rings, or move the property onto M0-k-01's face generators. | M4 (B-FUZZ hardening) |
| N-10 | Cost of the complete re-check. A kept-map query with any "no face" claim reads every face record of its level (`sameAnchors`, by C-0163 (1)'s design). A walk over a level's faces, such as §3.10's reachability walk, pays O(faces) for each face that borders the arena's outside or a region with no record at the level, where a rebuild after each commit costs O(faces) once. In the worst case that is O(F²) for one walk. PLAUSIBLE (reasoned; no timing taken on this machine). | If a stage walks `faceNeighbours` at CITY counts, measure it on M0-k-04's workload in the timing phase. A face-record change counter kept by the arena, in the map's key, would make the check O(1); that is M0-a-02's tables. | Timing phase (M0-t-01), or the first stage that walks it; otherwise M4 |
| N-11 | (closing check of session round S1, lane `check/M0-a-10-close-s1`, 2026-10-11.) The restore generation does not move when a savepoint image is put back out of stack order at the version the arena has now. Probe P2 uses a 3 × 3 grid at L0 and takes image A. Branch 1 swaps the north and north-east records and commits twice, then takes image B. A is put back (generation 1), and branch 2 commits twice with no swap. That map is keyed (1, v + 2). Then B is put back. B's version equals the arena's, so `restoreSavepoint` leaves the generation at 1, and (generation, version) = (1, v + 2) now names two different contents. This breaks the promise in `restoreGeneration`'s own comment ("never reached twice with different content"). `faceNeighbours` still answers correctly: C-0163's re-check refuses the stale claim, the build count goes 1 → 2, and the answer is `[1,3,5,8]`, equal to a brute-force walk (before the restore it was `[1,3,5,7]`). So this item serves no wrong answer. A consumer keyed on (generation, version) without a re-check (M0-d-04's level digests, C-0308; Q33's stamps) would read the old state as current. The order is contrived. The callers in the tree are the batch and op rollbacks (`tx/tx.ts`, `faces/common.ts`) and the runner's `rollBack` (`layout/src/pipeline/runner.ts`, the current stage's image). Each puts back the newest image of its scope, which is stack order. Probe P1 (3000 random stack-order sequences, 6051 queries) found nothing. CONFIRMED (mirror). | In the savepoint module (M0-a-06), either refuse an image that is not the newest unrestored image of its arena (detect-and-refuse), or bump the generation on every restore whose image was taken before the last restore. Pin it with P2's sequence on a version-keyed consumer. Not this item's owns. | M4 (hardening), or M0-a-06's next round if a caller restores out of stack order |

## Consolidation round C1 — the builder's notes (lane `build/M0-a-10-consolidate-1`, 2026-10-13)

Round R13's geom share (`docs/build/consolidation/kernel-plan.md` §1.12 G-1 – G-4, §2, §3.4; J260, J263 Q1, Q6, Q8,
J264 (5), J270 (a), (b)), after M0-a-01 c2 landed `lp`, `isLatticeCoord` and `distinctRing` in `num/exact.ts`. No
behaviour changes; the choices row is C-0358 (or the next free id at its append).

**Old file → new file (J263 Q8).** No source or test file moved, merged or was renamed. One test file is new:
`test/geom/common.test.ts` (G-1's pins). `test/geom/hex-lattice.test.ts` gains one describe, "the strict reading:
even–odd over the rings, on lattice points, a point on a ring outside (kernel-plan.md §1.12 G-2)", with four cases.
Every earlier describe and it title of `test/geom/` is unchanged, so every case the checks cite is found by its title.
`test/geom/support.ts` (`segmentsMeet`, `distToSeg`, `isSimple`, the oracles) is unchanged (§3.4).

| finding | what changed | evidence |
|---|---|---|
| G-1 | `geom/common.ts` re-exports `PI`, `distinctRing`, `isLatticeCoord` and `lp` from `../num/exact.js` (and imports `isLatticeCoord` for `offLattice`); its own four declarations are gone. | The four bodies were diffed against exact.ts's first (`awk` on both files, identical; `PI` the same literal; `isLatticeCoord` reads `LATTICE` from `num/index.js` before, `./lattice.js` in exact.ts — one object). By-path importers (`arr/winding.ts`, `arr/offsetFace.ts`, `arr/buffer.ts`, `medial/axis.ts`, `skeleton/roof.ts`, `geom/{lir,side-runs,boundary,hull}.ts`, `test/num/equivalence.test.ts`) resolve to exact.ts's function through either door: the pin "PI, lp, isLatticeCoord and distinctRing are the very bindings of num/exact.ts" (`toBe`). `num/exact.ts` is untouched: its import list is still `../types/index.js` (type-only), `./lattice.js`, `./predicates.js`, `./ratio.js` (N-c3-2); the pin "… num/exact.ts imports nothing under geom/" holds it. |
| G-2 | `geom/hex-lattice.ts`'s private `strictlyInside(edges, q)` is gone; candidates are kept by `strictlyInsideRings(band, q.x, q.y, 'evenOdd')` from `num/exact.ts`. | The convention is the **lattice** one (undoubled): the query is the snapped candidate, a lattice point, and the rings are the region's lattice rings; the reading is N-3's strict one (a point on any edge of any ring is outside) with the even–odd fill rule over all rings together, as before. Equivalence: the old step `(ay > qy) !== (by > qy)` then `by > ay ? o > 0 : o < 0` toggles exactly when `crossingStep` returns ±1 (an upward straddle has `by > ay`, a downward one `by < ay`), and `(w & 1) === 1` is the parity of those toggles; the on-edge test is `onLatticeSegment`, the old `o === 0` and closed box. The row's band now selects whole rings by their vertical extent instead of edges: a ring wholly below `y0 − pad` or above `y0 + pad` has no edge the old filter kept, and a kept candidate lies within `R + ½ < pad` of `y0`, so the extra edges of a kept ring neither straddle the candidate's height nor hold it; an empty band is empty in both forms, and the draws come before the skip as before. Proof by execution: the oracle case (every nominal point at jitter 0, on eight fixtures with on-ring candidates, holes of both orientations, nested squares, a bow-tie, a pentagram, two far-apart rings), and 64 lattice digests (16 fixture runs, 48 seeded regions) recorded on the pre-round tree and equal on the new one. |
| G-3 | Nothing in geom. | R8 (M0-a-08 c1, C-0331 (4)) adopted `geom/heap.ts` `BinaryHeap` in `arr/winding.ts` `shortestPath` with no geom-side need. `heap.ts` is unchanged. |
| G-4 | `geom/lir.ts`'s private `isConvexRing` stays; its comment now states the hull-based rule and that `arr/insetRing.ts`'s exported `isConvexRing` is a different test (B-5). | Comment only: the emitted JS of `lir.ts` is identical before and after (`ts.transpileModule`, comments removed). |
| §2 | `geom/index.ts`'s header drops "The scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-a-10." and keeps the description and the item id. | Its export lines are byte-identical; its emitted JS is identical. No other comment in `src/geom/` narrated a round. |

**NO-SHIFT (J260 (3)).** Before-image: a copy of the tree taken before the first edit (the lane's mirror; the pre-round
geom sources kept beside it). (a) The output probe `noshift.mts` (400 seeded rings × hull, obb, lir on both paths,
regularFit, sideRuns, sampleBoundary, distinctRing, isLatticeCoord, lp, the curves; 500 hexLattice regions; seven
hexLattice fixtures; 100 graphs × dijkstra and dijkstraTree): the 24 per-service sha256 hashes are equal before and after.
(b) Exports by the TypeScript checker (`getExportsOfModule`): `geom/index.ts` 36 names, `geom/common.ts` 12 names and
`src/index.ts` 673 names, identical before and after. (c) Every kernel source outside `src/geom/{common,hex-lattice,
lir,index}.ts` is byte-identical (155-file sha256 list), so its emitted JS is unchanged. (d) No digest, golden, register,
refusal code or pinned message text is touched; `hexLattice`'s RangeError texts are unchanged.

**Refusals (J264 (5), J290).** Census `refusals.mts` over §13.1's constructive classes, 300 rings each, before and after
(identical): regular n-gons and snapped rotated squares (LAWFUL): 0 refusals of hull, obb, lir, regularFit, sideRuns,
hexLattice, before and after. Star rings {n/k} of radius 2²³ − 2 (self-crossing, UNLAWFUL as a face ring): regularFit
`E_DEGENERATE fit` 300 → 300 (the vanishing first component, §13.1 item 45's own clause) and lir `E_DEGENERATE empty`
63 → 63. Verdict REFUSE, typed and visible: a face ring of the arrangement is simple (§3.10), so no user reaches a
self-crossing ring through §11.4's doors. Nothing rose.

**Self-check (J183), one mirror, each file restored and `cmp`-clean.** G1a (a private `distinctRing` back beside the
re-export), G1b (the `PI` literal back), G1c (a private `isLatticeCoord` reading `<=`) and G1d (exact.ts re-exporting
from geom/) are each red on `common.test.ts`; on the pre-round tree two of its three cases are red (red first).
G2a (`'nonZero'`), G2b (the closed reading on a one-ring band), G2c (the band reads the first ring only), G2d (the band
keeps only rings wholly inside it), G2e (the empty-band skip before the draws), G2f (`edgeCount < 4`) and G2g (a ring's
extent from its first point) are each red on test/geom whole and on the new describe alone. Earlier mutants re-killed
by the unchanged tests: MA, MB, ME, MF, MJ (`checks/M0-a-10.md`) and K1 (`checks/M0-a-10-s1.md`).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | `lir` refuses `E_DEGENERATE empty` on 63 of 300 star rings {n/k} (radius 2²³ − 2), before and after this round. The rings are self-crossing, so they are unlawful as faces. Whether an inside rectangle exists for those even–odd interiors was not probed. | KI for the hardening pass: no lawful class is affected. | hardening (M1) |

## Closing check C1 — the checker's notes (lane `check/M0-a-10-consolidate-close-1`, 2026-10-13)

None of these rows fails the round. The verdict and its evidence are in `checks/M0-a-10-c1.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1c-1 | `hexLattice`'s empty-region exit (`edgeCount < 3`, `hex-lattice.ts` 72) maps the old `edges.length < 12` exactly, and the seat's NO-SHIFT probe confirms it (regions of 0, 1 and 2 points, the stream's next draw recorded). But no test pins it for a region of one or two edges. Mutant H7 (`edgeCount < 1`) survives `test/geom` and `test/num` whole: such a region then draws from the caller's stream, though it still returns no points. Only the probe kills it (hexLattice hash `126f8158…` against `f2f15ceb…`). The test "an empty region gives no points (and, with no ring, draws nothing)" covers the no-ring case only. Contrived: every caller passes a face's or a frame's rings. CONFIRMED (mirror). | Extend that test with a one-point and a two-point ring: no points, and the stream's next draw equal to a fresh stream's. | M4 (hardening) |
| N-c1c-2 | `lir.ts`'s `isConvexRing` comment (lines 166–172) says a ring whose turns wind round more than once is refused "(its corners then outnumber H's)". That reason holds for a convex ring traversed twice (corners 10, H 5). It does not hold for a star polygon on the hull's own vertices: for {5/2}, corners 5 = H 5, and the rotation check refuses it. The refusal claim is right, and the code is unchanged (emitted JS identical). CONFIRMED (probe `probe-wind.test.ts`, a verbatim copy of the function with the kernel's `hull`). | Reword to "(its corners then outnumber H's, or visit them out of order)" at the next touch of `lir.ts`. | the next round that owns `src/geom/` (else M4) |
| N-c1c-3 | Source comments in `geom/common.ts`, `geom/hex-lattice.ts` and `geom/lir.ts` cite the plan's finding ids ("kernel-plan.md §1.12 G-1", "§1.0 N-3, §1.12 G-2", "§1.7 B-5, §1.12 G-4"). Each comment also cites its C-row (C-0314, C-0333). Plan §2's rule keeps round and finding names in `checks/*.md`. These name a rule's source, not a round's history, so they are not narrative; but the plan is a transient work document. PLAUSIBLE (a reading of §2). | At the next touch, cite C-0358 / C-0314 and the design section only. Or the session rules that plan ids may stand in source. | session (a ruling), else M4 |
| N-c1c-4 | The builder's CLEAN-ROOM row L-0511 discloses one read-only `git status --short` run inside `plat/`, against the working rule (seats run no git). Nothing was changed and the output was not used. This is not a clean-room breach. | For the session's record; no change to the item. | session |

## Hardening round S2 — the builder's notes (lane `build/M0-a-10-fix-s2`, 2026-10-14)

The session's hardening round for M0-a-10 (J237 (2)) on the inventory's FIX-NOW rows (`checks/hardening-inventory.md`
§ M0-a-10): M0-a-10:12 N-7, :13 N-8, :14 N-9, :72 N-c1c-1, :73 N-c1c-2. Each source note above was read whole. The
choices row is C-0361. No source behaviour changed: `src/geom/lir.ts` changed in a comment only, and `neighbours.ts`
and `hex-lattice.ts` are untouched. No digest, golden, pinned lattice, register, refusal code or message text moved.
No export of `geom/index.ts` or the barrel changed (J263 Q1). Every earlier describe and it title of `test/geom/` is
kept; `boundary.test.ts` gains two cases.

| row | outcome | what changed | evidence |
|---|---|---|---|
| N-7 | fixed (pinned) | `test/geom/boundary.test.ts` gains P3: "refuses a kept neighbour whose record was freed after a new record took its region (allocate before free: the liveness re-check)". The 3 × 3 grid has the north-east record (slot 8) freed and committed. A query fills the kept map. The batch then allocates the north region's new record (it takes slot 8) and frees the old one (slot 7) under the same version and counts (asserted). The answer holds 8, not 7, its rings equal the four sides, and it costs one rebuild. | Mutant MLV turns it red, and only it, with `Error: arena: face 7 is not live at L0`. Unmutated, it is green. |
| N-8 | choices row (the text is the deliverable), plus a test that holds it; M0-a-06's confirmation REPORTED | C-0361 (2) takes the inventory's first alternative, which the design's text supports. C-0163 (1)'s premise is stated: the live face records of a level own disjoint rings (§2.2 rule 1, the `LevelFaces` table). In the one transient that breaks it (between a batch's allocation of a region's new record and its free of the old one), the answer is unspecified between the two records, but it is safe. The lowest-slot alternative is not taken: the kept path would need `sameAnchors` (O(faces)) on every query to see it. A new case in `boundary.test.ts` holds the safety: "where two live records claim one ring (inside a batch, between an allocation and its free; §2.2 rule 1 broken), answers without a throw, each neighbour a live record on that ring (C-0163 (1)'s premise, C-0361)". It checks the kept answer and a fresh one (after a commit): the rings equal a fresh walk's, exactly one of the two records is named, every named face is live and on the ring, and after the old record's free the answer names the new one. | The lane's probe of the checker's P2 state (north-east slot 8 freed and committed, north's twin allocated at 8, a far corner freed): kept `[1,3,5,7]`, fresh `[1,3,5,8]`. That is the checker's finding; both answers pass the safety checks. The case premise `twin > n` is asserted, so the case is the history-dependent one. Whether a transaction can query between an allocation and its free is M0-a-06's to confirm. It is REPORTED to the session, because it is not in this item's owns. |
| N-9 | fixed (pinned) | The B-FUZZ hexLattice property in `test/geom/bfuzz.test.ts` now draws an optional hole ring (`fc.option`, 1 – 6 points within ± 200 m) beside the outer ring. Its oracle reads even–odd over every ring, and a point on any ring is outside: a local exact `onRing`, plus M0-a-02's `strictlyInside` per ring. The title is kept. | Mutant MHO turns it red. The shrunk counterexample is `[0,[[0,-1],[1,0],[-1,1]],[[0,0]],25,0]`: a one-point ring on a kept point. Before the round MHO passed `bfuzz.test.ts` (11 of 11, the note). Unmutated, the property is green at the PR size, 10⁴. |
| N-c1c-1 | fixed (pinned) | `test/geom/hex-lattice.test.ts` "an empty region gives no points (and, with no ring, draws nothing)" keeps its title. It also runs a one-point ring, a two-point ring, two one-point rings, and an empty ring beside a two-point ring, at jitter 300. Each gives no points, and the stream's next draw equals a fresh stream's. | Mutant H7 (`edgeCount < 1`) turns it red, and only it: `[[{"x":0,"y":0}]]: expected 1675416775 to be 3761423075`. H7b (`edgeCount < 2`) turns it red, and only it, on the two-point ring. |
| N-c1c-2 | fixed (comment) | `src/geom/lir.ts`'s `isConvexRing` comment now reads "(its corners then outnumber H's, or visit them out of order)". The comment was reflowed to 120 columns. | Comment only, and the code is unchanged. {5/2} has 5 corners against H's 5, and the rotation check refuses it (N-c1c-2's probe). |

**Mutant table (J183; one mirror, `cp -a` of `plat/`, isolation proven: no link into the tree, `@plat/*` realpaths
inside the mirror; every mutated file restored from the tree and `cmp`-clean; each run `vitest run --maxWorkers=1`
over `packages/kernel/test/geom`, B-FUZZ at 10⁴).**

| mutant | where | result |
|---|---|---|
| MLV | `neighbours.ts` 168, `onFace` reads `faceWalk` without `isFaceLive` | red: boundary.test.ts P3 only (1 failed, `face 7 is not live at L0`) |
| MHO | `hex-lattice.ts`, `region = region.slice(0, 1)` at entry | red: bfuzz.test.ts hexLattice (alone: 1 failed of 11), and on test/geom whole also hex-lattice.test.ts's five existing hole and pinned cases (6 failed) |
| H7 | `hex-lattice.ts` 72, `edgeCount < 1` | red: hex-lattice.test.ts empty-region case only (1 failed of 88) |
| H7b | `hex-lattice.ts` 72, `edgeCount < 2` | red: the same case only (1 failed of 88), on the two-point ring |

**Refusal census (J264, J290, N-58; the lane's probe, seeded, 300 rings per class, before the edits and after, output
byte-identical).**

* LAWFUL regular n-gons, snapped rotated squares and simple star-shaped rings, each through hull, obb, lir and
  regularFit: 0 → 0.
* hexLattice: 0 → 0 throws over 900 regions (600 one-ring, 300 with a hole).
* faceNeighbours: 0 → 0 over 60 grids.
* UNLAWFUL star rings {n/k} with k ≥ 2: lir `E_DEGENERATE empty` 97 → 97, and regularFit `E_DEGENERATE fit` 300 → 300.
  The verdict is REFUSE, typed and visible: a face ring is simple (§3.10), so no user reaches such a ring through
  §11.4's doors. This is N-c1-1's class.
* Nothing rose.

**Gates.**

* install --frozen-lockfile: 0.
* lint: 0 (`lint: probe-red ok`, 9 whole-tree checks).
* build: 0.
* NEAR: `packages/kernel/test/geom` at full strength, 11 files and 88 tests green.
* RELATED (`PLAT_FUZZ_RUNS=1000 vitest related --run` on `src/geom/{lir,neighbours,hex-lattice}.ts`, 1 worker): exit
  0, 432 of 432 files and 5585 of 5585 tests green (8304 s). The lane's first RELATED run ended without a result when
  its seat stopped; a resumed seat of the same lane re-ran install, lint, build, NEAR and RELATED on the unchanged edits
  (the CONTINUE RULE) and kept the recorded self-check.
