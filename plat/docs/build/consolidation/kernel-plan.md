# @plat/kernel — consolidation plan (lane `session/consolidation-kernel`, flow-7)

Written by the consolidation architect seat under docs/PROGRESS.md J259/J260 (the owner's directive of 2026-10-11: "we are
adding things again and again and doing it all patchwork style — clean up, consolidate, make elegant and coherent the code
and comments, and make sure it stays at the same quality or higher") and J112's rule (elegance without losing nuance; every
unification carries a full EQUIVALENCE LIST; NUANCE-LOST is a blocker). This seat planned only: no code or test was changed,
no test suite was run. Evidence is the code, the tests and the records (docs/build/checks/M0-a-*.md and their -s*/-notes
files, choices.md, M0-spec-notes.md N-44 – N-56), read whole under plat/CLEAN-ROOM.md §1.

Conventions. `src/…` and `test/…` are `plat/packages/kernel/src/…` and `plat/packages/kernel/test/…`. Line numbers are those
of the tree read on 2026-10-11. "Public API" means every name a folder's `index.ts` exports: `src/index.ts` does
`export *` from every folder index (21 lines), so **every folder-index export is a public export of `@plat/kernel`**
(`packages/kernel/API.md` Appendix B lists the 669 names). The invariant of this whole plan: **no exported name is
removed, renamed or changes its signature or behaviour; every item-listed interface (M0-work.json `interfaces`) is
untouched; persisted formats (the arena block, the level digests, the register JSONs) are byte-identical; refusal codes and
message texts the tests pin are unchanged.** Consolidation acts on non-exported helpers, on the bodies behind exported
names (a duplicate exported body becomes a one-line delegation to the kept implementation), on comments, and on tests.

---

## 0. Summary and round order

The kernel is sound but layered: nine fix rounds on `insert/`, five on `tx/` and two to three on each of `faces/`, `arr/`,
`index/`, `invariants/` and `io/` each added a helper beside the one already there rather than reusing it, and each left a
comment narrating the round ("S5's third pass", "before N-55", "`reservePair` retired", "the wrapper here is gone") in
place of the design as it now stands. Concretely:

* **One exact predicate written six to nine times.** "Is p closer than r to the closed lattice segment a–b" exists in
  `insert/placement.ts` (`segmentCloserThan`), `tx/tx.ts` (`closer`), `warp/validate.ts` (`closerThan`) and, with a
  BigInt variant, `invariants/common.ts` (`compareDist2`). "Do two closed lattice segments share a point" exists in
  `insert/decimate.ts`, `faces/common.ts` (`segmentsTouch`), `invariants/common.ts`, `medial/axis.ts` and
  `skeleton/prepare.ts` (a point-typed form). The crossing-number point-in-ring test exists nine times (`index/query.ts`,
  `insert/rewalk.ts`, `insert/snapRound.ts`, `faces/common.ts`, `tx/relevel.ts`, `warp/held.ts`, `warp/validate.ts`
  (winding), `invariants/whole.ts`, `arr/kerb.ts`, `geom/hex-lattice.ts`, `skeleton/prepare.ts`) in two coordinate
  conventions (lattice points vs doubled points). π is spelt as a literal in six files beside `geom/common.ts`'s exported
  `PI`; `BOX_RANGE = 16_777_216` in five; `check()`/`notBuilt()` in six/three with a per-module prefix.
* **Three run-ordering algorithms for one definition.** `arena/resolve.ts` `edgeRuns`, `tx/chains.ts` `runsOfPairs` and
  `io/encode.ts` `runsAt`/`onward` (plus `index/items.ts` `routeRun`/`onward` for one run) each walk a pair set into
  runs "from the lower (y, x) end, rings from the lowest-leftmost counter-clockwise". Their agreement is asserted by
  nothing today.
* **Wrappers around retired behaviour.** `insert/stretch.ts` `splitBreaksClearance` is a pure wrapper of
  `placement.ts` `splitEndsBreachClearance` (and is pinned equal by `placementEnds.test.ts`); `splitThrough.ts` carries
  private copies (`footOn`, `nearer`, `carries`) of `stretch.ts`'s exported `footOnSegment`/`nearerVertex` and of
  `insertChain.ts`'s `vertexCarries`; `insertChain.ts` `copyWarnings` re-implements `classes.ts` `foldWarnings`' clone.
* **Comments that narrate rounds**: 129 comment lines cite N-xx rulings (41 in `insertChain.ts`), and `stretch.ts:485`,
  `insertChain.ts:193`, `tx/index.ts:48–55`, `arena/plat.ts:169–175` tell the history of a change instead of the rule.
* **Tests**: the oracles are rightly independent of the code, but the *test support* repeats the same oracle helpers
  (mulberry32 in nine files, `segDist`/`distToSeg` in seven, `chunkRefs`/`digests`/`snapshot` in three, `vertexAtPoint`
  in two, `eulerCounts` in the step3-5 support beside `invariants/whole.ts`'s), and `insert/step3-5` holds seven
  routerGap*/fidelity/foldback/placementEnds files whose describe blocks are one subject (the router's passes) split by
  the round that wrote them.

Nothing found here is a behaviour bug; every finding is a duplication, a dead layer or a history-telling comment. The
per-finding EQUIVALENCE and NUANCE lists below are what each implementing seat must hold; the ORACLE names the tests,
goldens and mutants (from the checks' mutant tables) that must stay green/red.

**Round order** (one Opus seat per work item, inside its `owns`; a round depends only on the rounds listed):

| # | Round (work item, owns) | Depends on | What it does (findings) |
|---|---|---|---|
| R1 | **M0-a-01** — `src/num/`, `src/types/`, `test/num/`, `test/types/` | — | Adds the one shared exact-predicate module `src/num/exact.ts` (N-1 … N-4) that every later round imports by path; no change to `num/index.ts` exports (open question Q1 decides whether to also re-export). |
| R2 | **M0-a-04** — `src/insert/{classes,decimate,attractVertex,placement,splitThrough}.ts`, `test/insert/step1-2/` | R1 | I-1 … I-6, comment rewrite C-insert-1/2, test plan T-step1-2. |
| R3 | **M0-a-05** — `src/insert/{insertChain,stretch,snapRound,crossings,wedge,rewalk}.ts`, `src/insert/index.ts`, `test/insert/step3-5/` | R1, R2 | I-7 … I-16, comment rewrite C-insert-3 … 8, test plan T-step3-5 (the largest test consolidation). |
| R4 | **M0-a-02** — `src/arena/`, `test/arena/` | R1 | A-1 … A-4 (`edgeRuns` becomes the one run-ordering implementation; stamp helpers; `vertexAt`). |
| R5 | **M0-a-03** — `src/index/`, `test/index/` | R1, R4 | X-1 … X-4. |
| R6 | **M0-a-06** — `src/tx/`, `test/tx/` | R1, R3, R4 | T-1 … T-9, comment rewrite C-tx-1 … 4, test plan T-tx. |
| R7 | **M0-a-07** — `src/faces/`, `test/faces/` | R1, R3, R6 | F-1 … F-5. |
| R8 | **M0-a-08** — `src/arr/{winding,booleans,buffer,offsetFace,insetRing,tileRings}.ts`, `src/arr/index.ts`, `test/arr/booleans-buffers/` | R1 | B-1 … B-5. |
| R9 | **M0-a-09** — `src/arr/{kerb,bandUnion,corridorUnion}.ts`, `test/arr/bands/` | R1, R8 | K-1 … K-4. |
| R10 | **M0-a-13** — `src/warp/`, `test/warp/` | R1, R2 | W-1 … W-6. |
| R11 | **M0-a-14** — `src/invariants/`, `test/invariants/` | R1, R6 | V-1 … V-5. |
| R12 | **M0-a-15** — `src/io/`, `test/io/` | R1, R4 | O-1 … O-3. |
| R13 | **M0-a-10 / M0-a-11 / M0-a-12 / M0-a-16 / M0-d-04** (geom, skeleton, medial, facade, digest) | R1 | G-1 … G-4, S-1, M-1, E-1, D-1: small; may be one seat per item or folded into R1's seat where the owns allow (they do not — each is its own item, so each is its own tiny round). |
| R14 | Cross-cutting test support (`test/arena/support.ts`, `test/insert/step1-2/support.ts`, `test/insert/step3-5/support.ts`, `test/tx/support.ts`) | R2 – R6 | T-support-1 … 4: one seeded generator, one segment-distance oracle, one `snapshot()`; each file is in its item's owns, so the change lands with that item's round and the later rounds import it. |

R1 must land first because every other round's "replace the private copy by the shared one" imports from it. R4 before R6
because `tx/chains.ts` `runsOfPairs` becomes a delegation to the arena's `edgeRuns` (exported through arena's index under a
new name only if Q1 allows; otherwise `resolve.ts` exports `edgeRuns` to the tx folder by path). R3 before R6/R7 because
`faces/common.ts` and `tx/tx.ts` import predicates from `insert/stretch.ts` that R3 re-homes.

---

## 1. Findings per folder

Each finding: **where** (file:lines) · **consolidation** · **EQUIVALENCE** (what must stay bit-identical: outputs, digests,
refusal codes/texts, exported names, formats, Math allowlist) · **NUANCE** (behaviours, bounds, tie-breaks, orderings,
edge cases the merge must keep) · **ORACLE** (existing tests/goldens/seeds; the checks' mutants the merged code must
still fail; new pins) · **RISK** · **ruling needed?**.

### 1.0 Shared exact predicates (R1, owns of M0-a-01: `src/num/`)

**N-1 — `segmentCloserThan` ×4.** `src/insert/placement.ts:72–82` (exported `segmentCloserThan`), `src/tx/tx.ts:493–503`
(`closer`), `src/warp/validate.ts:19–28` (`closerThan`, exported from the file, not from `warp/index.ts`),
`src/invariants/common.ts:58–73` (`compareDist2`, BigInt three-way compare against num/den).
*Consolidation:* one `segmentCloserThan(px, py, ax, ay, bx, by, r): boolean` in a new internal module
`src/num/exact.ts` (not re-exported by `num/index.ts` unless Q1 says so). `placement.ts` keeps its exported name as
`export { segmentCloserThan } from '../num/exact.js'` (name and signature unchanged). `tx.ts` and `validate.ts` import
it and drop their copies. `compareDist2` stays: it is a different function (a three-way comparison against a rational
`num/den`, BigInt-exact beyond 2⁵³) — note that in the plan, do not merge.
*EQUIVALENCE:* the three double-arithmetic bodies are textually the same algorithm (dot ≤ 0 → end a; dot ≥ l2 → end b;
else `orient2d² < r²·l2`), strict `<` in all three; `r` is always an integer (`MIN_EDGE`); outputs identical for every
lattice input where `o²` and `r²·l2` stay below 2⁵³ (placement's comment states this bound; the three callers pass
lattice points within ±2²³ and r = 25). Math allowlist: `orient2d` only. No exported name changes
(`segmentCloserThan` stays exported from `insert/index.ts`; `closer`/`closerThan` were never barrel exports — `closerThan`
is exported from `warp/validate.ts` but `warp/index.ts` does not re-export it; `test/warp/validate.test.ts:14` imports it
from the file, so **keep `export { segmentCloserThan as closerThan }` in validate.ts**).
*NUANCE:* strictness `<` (a vertex exactly `minEdge` away is clear — `invariants/fixtures.test.ts:193` "exactly minEdge
away holds", `attract.test.ts` 25 cm cases); degenerate segment `l2 === 0` → distance to a; the warp copy is called with
view coordinates (doubles that are integers) — same.
*ORACLE:* `test/insert/step1-2/placement.test.ts` (all of "the rule, test by test", esp. (iii) cases), `bfuzz.test.ts`
B-FUZZ placePoint (ii)/(iii); `test/tx/removals.test.ts`, `clauses.test.ts` "§3.10 level consistency", C-0185 (4) corner
cases; `test/warp/validate.test.ts` "closerThan and inTriangle", `fixtures.test.ts` "a pinch…", "§3.6: a slide keeps
attractCm"; mutants: M0-a-04 K06/K08 (placement ties), M0-a-05-s7 M9 ((iii) at the split's ends), M0-a-13's clearance
pins. *RISK:* low. No ruling.

**N-2 — `segmentsMeet` ×5.** `src/insert/decimate.ts:72–93` (exported from the file; `warp/validate.ts:9` and
`warp/simplify.ts:13` import it by path), `src/faces/common.ts:155–177` (`segmentsTouch` + private `sign`/`onSegment`),
`src/invariants/common.ts:75–92` (`segmentsMeet` + `sign`/`onSegment`), `src/medial/axis.ts:118` (own copy),
`src/skeleton/prepare.ts:123` (point-typed `segmentsMeet(a, b, c, d: LatticePoint)`).
*Consolidation:* one `segmentsMeet(ax…dy)` in `src/num/exact.ts`; `decimate.ts` re-exports it under its name (warp keeps
importing from decimate or switches to num — either; prefer num); `faces/common.ts` `segmentsTouch` becomes
`export { segmentsMeet as segmentsTouch }`; invariants and medial import it; skeleton's point form becomes a two-line
adapter calling it (or stays — it is a different signature on a different type; adapter preferred).
*EQUIVALENCE:* all five decide proper crossing by `o1·o2 < 0 && o3·o4 < 0`, then the four collinear-on-segment cases
with closed boxes; identical truth table; `orient2d` only. decimate's has `sign` inlined as `Math.sign`? — **check**:
decimate.ts:72–93 uses its own helper; the implementer must diff the five bodies line by line before replacing (the
plan asserts they agree; the mutants below catch a slip).
*NUANCE:* closed segments (touching at an end counts); collinear overlap counts; a zero-length segment is a point test.
*ORACLE:* `decimate.test.ts` "simple runs" (figure eight, touch, fold-back vs straight continuation), B-FUZZ decimate
(`runIsSimple` oracle); `faces/split.test.ts` "contacts refused" (overlap, more than twice, grazing by 0/±1);
`invariants/fixtures.test.ts` simple-faces; `medial/axis.test.ts`; `skeleton/spur.test.ts`; mutants M0-a-04 K01/K01b,
M0-a-11-s1 M01 – M12 (spur handling reads `segmentsMeet` through `prepare.ts`), M0-a-12 X15 (both crossing guards).
*RISK:* low. No ruling.

**N-3 — point-in-ring (crossing number) ×9, two conventions.** Doubled-coordinate forms (test a half-lattice point such as
an edge midpoint): `src/faces/common.ts:128–145` `insideRing(p, ring: HalfEdgeId[], qx2, qy2)`, `src/insert/rewalk.ts:82`
`insideRing` (same signature, same body), `src/insert/snapRound.ts:251` `insideDoubled(p, ring: VertexId[], qx2, qy2)`,
`src/tx/relevel.ts:176` `insidePoints(pts: LatticePoint[], qx2, qy2)`. Undoubled lattice forms:
`src/index/query.ts:139` `insideRing(p, ring: VertexId[], qx, qy)` (meaningful off the ring only), `src/warp/held.ts:36`
`insideRegion(region: Point[], x, y)` (closed: on-boundary → true; exported through `warp/index.ts`),
`src/geom/hex-lattice.ts:36` `strictlyInside(edges flat array, q)` (on-boundary → false), `src/arr/kerb.ts:695`
`strictlyInside(rings, q: XY)` (non-zero winding over several rings, on-edge → false), `src/warp/validate.ts:190`
`winding(px, py, xs, ys)` (signed winding), `src/invariants/whole.ts:298` inline `inside` (closed), `src/skeleton/prepare.ts:163`.
*Consolidation:* `src/num/exact.ts` gets two primitives: `crossingParity(getX, getY, n, qx, qy)` is **not** the way (closures
cost and obscure); instead write the four *concrete* kernels once each and point every site at them:
(a) `insideLatticeRing(pts: readonly LatticePoint[], qx, qy): boolean` (strict even–odd, exact, undefined on the ring),
(b) `insideDoubledRing(pts: readonly LatticePoint[], qx2, qy2)` (the doubled form), (c) `windingNumber(pts, qx, qy)`
(signed), (d) `onLatticeSegment(a, b, q)`. The arena-indexed variants (`HalfEdgeId[]`/`VertexId[]` rings) become
three-line adapters that map to points then call (a)/(b) — or, to avoid the allocation, keep the typed-array loops but as
*one* function per convention in `arena/walk.ts` (`insideRingHalfEdges`, `insideRingVertices`, doubled flag as a
parameter). Recommended: keep performance — add to `src/arena/walk.ts` (R4) two functions `ringContainsDoubled(p, ring:
VertexId[], qx2, qy2)` and `ringContainsDoubledH(p, ring: HalfEdgeId[], qx2, qy2)`; `faces/common.ts` `insideRing`
delegates (name kept, exported), `rewalk.ts`/`snapRound.ts` import, `relevel.ts` `insidePoints` → num's (b).
`query.ts`'s undoubled one, `kerb.ts`'s multi-ring winding, `held.ts`'s closed `insideRegion` and `hex-lattice.ts`'s
strict form are **four different predicates** (strictness and winding rule differ) — keep each, but implement each on
num's (a)/(c)/(d) so the orientation test is written once. `warp/validate.ts` `winding` → num's (c);
`invariants/whole.ts` inline → `(d) || (c) !== 0`.
*EQUIVALENCE:* each site keeps its own boundary rule: faces/rewalk/snapRound/relevel are evaluated only at doubled points
that are never on the ring (edge midpoints of a simple arrangement) so parity alone decides — identical results;
`query.ts` documents "off the rings only"; `held.ts` on-boundary → inside (its comment and `regionVertices`'s test);
`hex-lattice.ts` on-boundary → outside (its module comment "a point on a ring is outside"); `kerb.ts` on-edge → false and
**non-zero** winding (not even–odd: `strictlyInside` sums `wind` over all rings and tests `!== 0`); `whole.ts` on-edge →
true then non-zero. Math allowlist: `orient2d`, `Math.min/max`.
*NUANCE:* the half-open rule `(ay > qy) !== (by > qy)` with the side chosen by the edge direction (`by > ay ? o > 0 : o < 0`) —
every site uses this exact form; keep it (it is what makes a vertex exactly at qy count once). `held.ts` and `whole.ts`
treat rings of < 3 points as outside/inside differently (`held.ts:38` returns false for n < 3) — keep per site.
*ORACLE:* `index/pointlocate.test.ts`, `query.test.ts` (OFFLINE cases, holes, K13/K14 mutants of M0-a-03); `faces/*`
(`regionOf`/`landEnd`), `faces/bfuzz.test.ts`; `insert/step3-5/rewalk.test.ts` (nesting), `snapRound.test.ts`
(`recordHolding`); `tx/restore.test.ts`, `removals.test.ts` (`onRun`, `facePass`); `warp/fixtures.test.ts` (regions, the
B-FUZZ "found case: a hole carried over an edge"), `held.ts` via "§3.6 held (5)"; `geom/hex-lattice.test.ts`;
`arr/bands/widthstep.test.ts` `entersRegion` holed case (mutant X17 of M0-a-09-s1: "strictlyInside reads the outer ring
only" — must stay red); `invariants/fixtures.test.ts` seed-tiling. *RISK:* medium (nine sites, two conventions, three
boundary rules) — the implementer must table the (strictness, winding rule, coordinate convention) of every site before
and after; a NUANCE-LOST here is a blocker. No ruling.

**N-4 — constants.** π literal `3.141592653589793` at `src/insert/stretch.ts:72`, `src/insert/wedge.ts:31`,
`src/tx/tx.ts:69`, `src/faces/fan.ts:50`, `src/invariants/batch.ts:49`, `src/warp/simplify.ts:20` beside the exported
`geom/common.ts:14 PI` (and `dmath/atan.ts:53`'s own `pi`, a port — untouched). `BOX_RANGE = 16_777_216` at
`insert/placement.ts:37`, `insert/stretch.ts:69`, `insert/crossings.ts:49`, `index/query.ts:49`, `warp/view.ts:12`
(`io/format.ts:40 SPAN` and `geom/regular-fit.ts:37 TWO_24` are other meanings — leave). `HOT_PIXEL_SQ` at
`insert/placement.ts:31` (exported), `warp/warp.ts:49`, `warp/validate.ts:266`, `tx/relevel.ts:245 HOT_SQ`;
`invariants/batch.ts:52–53` uses the exact fraction 5041/10000 (BigInt-safe) — a different representation, keep.
`MIN_EDGE = 25` literal at `warp/validate.ts:15` and `ATTRACT = 26` at `warp/warp.ts:47` where every other file reads
`LATTICE.minEdgeCm` / `LATTICE.attractCm`. `SCALE = 1_048_576` with a `div()` through `ratio()` at `arr/kerb.ts:400–409`
(exported `div`), `arr/buffer.ts:39–45`, `arr/insetRing.ts:44`, `insert/wedge.ts:45`; `geom/common.ts:70 DIR_SCALE`,
`geom/lir.ts:71 SPAN_SCALE`, `skeleton/coalesce.ts:20` (the same 2²⁰), `skeleton/engine.ts:32` (2⁴⁰, different).
*Consolidation:* `src/num/exact.ts` exports `PI` (move `geom/common.ts`'s definition there and re-export from geom —
`geom/common.ts` is not a barrel export; `PI` is not in `geom/index.ts`, so no public change), `BOX_RANGE`
(2²⁴, "the index's query-box bound") and `POW2_20 = 1_048_576` with `divScaled(num, den, kind)`; `HOT_PIXEL_SQ` stays
exported from `placement.ts` and the two warp files and `relevel.ts` import it from there (or from `index/items.ts` where
`HOT_PIXEL_CM` lives — prefer: add `HOT_PIXEL_SQ` beside `HOT_PIXEL_CM` in `index/items.ts` (R5) and have placement.ts
re-export it; equal value `0.71 * 0.71` computed identically). `warp/validate.ts` `MIN_EDGE` → `LATTICE.minEdgeCm`;
`warp/warp.ts` `ATTRACT` → `LATTICE.attractCm`.
*EQUIVALENCE:* the same double constants (`LATTICE.minEdgeCm` is the literal 25, `attractCm` 26, `num/lattice.ts:13–21`);
`0.71 * 0.71` is the same expression everywhere; the `div` bodies are identical (`ratio(num*SCALE, den*SCALE, 'length')`
→ value or null) except `wedge.ts:45` uses it with kind … **check the `ratio` kind at each site** ('length' in kerb and
buffer; wedge.ts's use must be read before merging — if its kind differs it is a different floor and stays). Math
allowlist unchanged (no `Math.PI`; the test `test/geom/dmath-only.test.ts` and `insert/step1-2/source.test.ts` scan
sources for Math members — adding an import changes no scanned `Math.` use).
*NUANCE:* `source.test.ts:163–168` pins that every division in the five step-1–2 files is by a literal, `CELL_CM`, 2 or 4,
or through `ratio()`; a shared `divScaled` must itself divide only through `ratio()` (it does).
*ORACLE:* every digest/golden in the package (a constant change would shift them): `test/digest/levelDigest.test.ts`,
`test/io/roundtrip.test.ts` (byte-identical), `test/arr/booleans-buffers/*` (exact areas, chord counts "27 or 28" in
`buffer.test.ts:67`), `insert/step3-5/crossings.test.ts` `wedgeBound` values 47 / 1.2 m, `warp/fixtures.test.ts`
"(517, 4) — 25.999 cm". *RISK:* low. No ruling.

### 1.1 `src/insert/` steps 1–2 (R2, M0-a-04)

**I-1 — `splitThrough.ts` private copies of exported helpers.** `src/insert/splitThrough.ts:154–162 footOn` ≡
`src/insert/stretch.ts:261–268 footOnSegment` (same body, same `check(t.ok, 'an edge spans at least minEdge')`);
`splitThrough.ts:164–175 nearer` ≡ `stretch.ts:271–280 nearerVertex` (same tie rule y then x, `<=` on x);
`splitThrough.ts:141 carries(p, v, row: PlannedRow)` ≈ `insertChain.ts:137 vertexCarries(p, v, role, entity, ordinal)`
(the first reads a planned row's interned handle/role id, the second resolves names — same question "does v carry this
key").
*Consolidation:* M0-a-04 cannot import from M0-a-05's `stretch.ts` (owns and dependency direction: stretch imports
splitThrough). So the kept home is M0-a-04's: move `footOnSegment` and `nearerVertex` **into `splitThrough.ts`** as the
exported originals (names `footOnSegment`, `nearerVertex`), delete `footOn`/`nearer`, and in R3 `stretch.ts` re-exports
them from splitThrough (`export { footOnSegment, nearerVertex } from './splitThrough.js'`) so `insert/index.ts`'s exports
are unchanged. `vertexCarries`: keep one `carriesRow(p, v, role: number, entityHandle: number, ordinal: number)` in
`splitThrough.ts` (the id-level form, exported for insertChain) and make `insertChain.ts:137` resolve the handle then call
it (R3).
*EQUIVALENCE:* identical bodies → identical outputs; mutant K04 of M0-a-04 (`nearer`'s tie reversed, red on `SLANT`
both half-edges) and K03 (attractVertex's tie) stay red because the one body keeps `Y[a] < Y[b]` then `X[a] <= X[b]`.
Exported names: `footOnSegment`, `nearerVertex` keep their names and signatures (through `stretch.ts` re-export);
`addressKind`, `firstAnchorOrdinal`, `allocateAnchor`, `planSplitThrough`, `applySplitPlan`, `splitThrough`, `planPoint`
untouched.
*NUANCE:* `footOn`'s `check` message text 'an edge spans at least minEdge' — pinned by nothing by text, but keep it.
*ORACLE:* `test/insert/step1-2/splitThrough.test.ts` whole (SLANT ties both ways, the anchor allocation, rows refusals
regexes `/edge role/ /carries its ordinal/ /not indexed/ /no role named/ /already carries/`), `attract.test.ts`,
`step3-5/stretch.test.ts` (the join lands on the vertex), `lifecycle.test.ts`; mutants M0-a-04 K03, K04, K05, K10, K28,
F1a–c, F1e, M0-a-05-s7 M9. *RISK:* low. No ruling.

**I-2 — `inSweptWedge` ×2.** `src/insert/placement.ts:115–123` and `src/insert/crossings.ts:259–267`: identical bodies
(the one uses `a`, the other `o` for the same orientation). *Consolidation:* export it from `placement.ts`
(`inSweptWedge`) and import in `crossings.ts` (R3). *EQUIVALENCE:* identical; the new export is additive to
`insert/index.ts` only if listed there — **do not add it to the index** (import by path, as crossings already imports
`placePoint` by path). *NUANCE:* "along the new direction counts as overlap" (`onTo === 0 && dot > 0`); `turn === 0` →
false. *ORACLE:* `placement.test.ts` "(iii) the rotation slot", `routerGapS4/S5` `placeOnRun` cases, mutant K06.
*RISK:* low.

**I-3 — `placeOnRun` re-implements `placePoint`'s band scan.** `src/insert/crossings.ts:309–…` (`placeOnRun`, R3's file)
rebuilds the hot-pixel band search of `src/insert/placement.ts:131–…` (`placePoint`) with two extra readings (a partner
sub-edge left out of (iii), `passOver` of a sub-edge whose ends cannot clear). *Consolidation (R2 then R3):*
`placePoint` grows an optional fourth parameter `opts?: { partner?: readonly [VertexId, VertexId] | null; reach?: number;
passOver?: boolean; searchRun?: boolean }` defaulting to today's behaviour, and `placeOnRun` becomes a thin caller that
maps `RunPlacement` onto it and wraps the result as a `Landing`. **The default path of `placePoint` must be the exact
code it is today** (the test `placement.test.ts` pins `tried` counts: `tried: 2`, `tried: 1`, `tried: 0`, `> 10`, `> 40`,
and `INSERT_PLACEMENT_CANDIDATES` counts equal to `tried`).
*EQUIVALENCE:* with no `opts`: identical candidate enumeration order (nearest of four, ties y then x; then the band
outward within `attractCm`, nearest first, ties y then x), identical charges (one `insert.attractQueries`, one
`insert.placementCandidates` per candidate), identical `W_PLACED` reporting (in the result only), identical fallback
(nearer endpoint of the exact position's sub-edge, ties y then x, `tried` as counted), identical E_WORK_LIMIT detail
`INSERT_PLACEMENT_CANDIDATES`. With `opts` as `placeOnRun` passes them: identical to `placeOnRun`'s answers (the
routerGapS4/S5 unit tests pin `placeOnRun(... partner: null ...) → null` and `partner: tp.value → split at (1400, 1000)`).
*NUANCE (high):* `placeOnRun` searches the *whole run* (several sub-edges) within `reach` (`attractCm` first, then the
bound) while `placePoint` searches within `attractCm` and passes over a non-splittable sub-edge only to the next one
within `attractCm` (C-0284 (2)); `placeOnRun`'s `passOver` option ends the search with null when unset ("as
`planLanding`"); the partner's sub-edge is excluded from (iii)'s new-vertex-to-edge test only, not from the other tests
(C-0217). These three must be parameters, not merged defaults. **If the implementer cannot keep `placePoint`'s default
path byte-for-byte in behaviour, do I-3 as "share the candidate enumerator only"** (a generator `bandCandidates(exact,
edge, reach)` both call) and leave the two drivers.
*ORACLE:* `placement.test.ts` whole (esp. `tried` and `nearest` fields), `bfuzz.test.ts` placePoint property (i)/(ii)/
(iii) with `splitEndsBreach` oracle, `routerGapS4.test.ts` KG (`placeAcross` within attractCm else none), `routerGapS5`
S5 strip tests (`placeOnRun` with/without partner), `s5-rescues.json`, `s5-register.json`, `s6-register.json`,
`s6-lifecycle.json` warnings pinned per case (`expect(res.warnings).toEqual(c.warnings)`) — any change of a W_PLACED count
or point fails these; mutants M0-a-04 K06, K08, F1a–c; M0-a-05-s7 M9; M0-a-05 S4's KA, KP, KC, KE, KF, KG, KN (constructed
pins in routerGapS4). *RISK:* **high** — the register JSONs pin exact warnings and routes. Recommend the implementer do
the enumerator-only variant unless a full-equivalence diff of the two band loops is written into the PR. **Ruling: not
needed if equivalence is shown; needed (session) if any register case shifts.**

**I-4 — `planAttraction`'s nearest-edge loop vs `insertChain.ts nearestPiece`.** `src/insert/attractVertex.ts:59–134`
chooses the nearest route piece (exact `o²·l2` comparison, ties by canonical key) and `src/insert/insertChain.ts:273–313`
`nearestPiece` does the same over `pieceOf` pieces. *Consolidation (R2+R3):* export from `attractVertex.ts` a
`nearestRoutePiece(tx, pt, level): KernelResult<{ edge, piece? } | null>` used by both. *EQUIVALENCE:* same query box,
same charge (`insert.attractQueries` once), same tie rule "two edges equally near: the one first by canonical key (its
lower endpoint, y then x)" (`attract.test.ts:211`), same `E_LEVEL` on a finer-vertex contact (candidate (b)).
*NUANCE:* `nearestPiece` works on `Piece` (a level-n piece of a run), `planAttraction` on the index's edge item then
`routeRun` — the implementer must confirm both read the same piece boundaries (level-n route pieces, §3.3); if not, keep
both and only share the distance comparison. *ORACLE:* `attract.test.ts` "edge candidates", mutant K05 (`d < bestD` →
`<=`, red on "ties to the smaller lattice position"), `insertChain.test.ts`, B-FUZZ attractVertex. *RISK:* medium.

**I-5 — `check`/`notBuilt` per module.** `src/insert/classes.ts:202–210` ('insert: ' prefix; `notBuilt('M3a')` text
pinned by `attract.test.ts:266` "notBuilt('M3a')" and `classes.test.ts:129` "notBuilt('M3a'): candidate (c)"),
`src/tx/state.ts:169–176` ('tx: '), `src/arena/debug.ts:44` ('arena: '), `src/index/items.ts:16` ('index: '),
`src/warp/held.ts:31` ('warp: '), `src/digest/levelDigest.ts:77` ('digest: '). The prefixes are load-bearing:
`insertChain.ts:98 INVARIANT_THROW = /^(insert|arena|index): /` turns exactly those three into E_INVARIANT (N-44 (1));
`tx/tx.ts:570 rethrown` prefixes `tx <stage>/L<level>/<form>/<op>: `; tests pin `/^insert: the transaction is closed
\(committed or rejected\)$/` and `"notBuilt('M3a')"`. *Consolidation:* one factory in `src/num/exact.ts` (or
`num/result.ts`): `export function assertion(prefix: string): (c: boolean, m: string) => asserts c` returning a function
that throws `new Error(`${prefix}: ${m}`)`; each module keeps `export const check = assertion('insert')` under its local
name. `notBuilt` (the throwing form, two copies) → one in `num` with the identical text
`` `notBuilt('${milestone}'): ${what}` `` (verify the exact text in classes.ts:207 and state.ts:174 before merging; the
facade's `notBuilt` (`facade/notBuilt.ts:18`) is a different thing — a stub object — untouched).
*EQUIVALENCE:* error messages byte-identical (prefix + ': ' + message); `asserts condition` typing kept (TS allows an
assertion signature on a const of function type only when declared with an explicit type — the implementer must confirm
`tsc --noEmit` accepts `export const check: (c: boolean, m: string) => asserts c = assertion('insert')`; otherwise keep
six two-line functions and consolidate only the message builder). `source.test.ts:180` pins the literal first line
`check(tx.closed !== true, 'the transaction is closed (committed or rejected)');` in five exported functions — the local
name `check` must stay. *ORACLE:* `splitThrough.test.ts` N-55 (5)/N-11/N-12 describes, `lifecycle.test.ts` N-55 (5),
`tx/forms.test.ts` N-53 (3) rethrow prefix tests, `facade/facade.test.ts` "a façade writer refuses an overlay…",
`routerGapS4.test.ts` "an invariant check's throw inside the op is refused E_INVARIANT with the check's message" (text
`insert: a chain class is mandatory or optional, not bogus`), mutants M0-a-05-s7 M1/M2. *RISK:* low–medium (typing).

**I-6 — `decimate.ts` `segmentsMeet` and its grid.** Covered by N-2; `decimate.ts:95–99` `CELL_CM`/`MAX_CELLS`/
`CELL_OFFSET`/`CELL_STRIDE` and the bucket grid for `simpleRuns` stay (one use; `source.test.ts:166` allows `CELL_CM` as
a divisor). No change beyond N-2.

### 1.2 `src/insert/` steps 3–5 (R3, M0-a-05)

**I-7 — `splitBreaksClearance` is a pure wrapper.** `src/insert/stretch.ts:478–480` returns
`splitEndsBreachClearance(p, s, t)`; readers: `crossings.ts` `placeOnRun`, `faces/common.ts:46` (import), `stretch.ts`
itself, `test/insert/step3-5/placementEnds.test.ts:361,411` (pins equality on every edge both ways). *Consolidation:*
keep the exported name as a re-export: `export { splitEndsBreachClearance as splitBreaksClearance } from
'./placement.js'`; delete the wrapper body and the 10-line history comment (`stretch.ts:466–477`) in favour of one line
naming what it is ("the placement rule's (iii) at a split's own ends, C-0284 (2)"). *EQUIVALENCE:* same function
object semantics (callers see one function; `===` identity between the two names changes from false to true — nothing
tests identity). *ORACLE:* `placementEnds.test.ts` (keeps passing trivially; its first `it` becomes a tautology — see
test plan T-step3-5-5), `faces/split.test.ts` "a cut leaving its end along the boundary edge", mutants M0-a-05-s7 M9.
*RISK:* none. No ruling (C-0284 (3)/C-0302 already decided the retirement).

**I-8 — `vertexDist2`, `lattice`, `MIN_EDGE` re-export in `stretch.ts:704–712`.** `vertexDist2(p, a, b)` wraps
`num/direction.ts dist2` on two vertices (read by insertChain/snapRound); `lattice(x, y)` ≡ `faces/common.ts:75 lp` ≡
`geom/common.ts:65 lp` (three identical casts); `export { MIN_EDGE }` re-exports a local constant (readers: snapRound?
— the implementer greps; if only `stretch.ts` reads it, drop the re-export… **but** `insert/index.ts` may list it: check;
if it is in the index it is public and stays). *Consolidation:* `lattice`/`lp`: one `lp` in `src/num/exact.ts`
(`types/` already brands `Cm`); `stretch.ts` keeps `export const lattice = lp` only if `insert/index.ts` exports it
(else delete); `faces/common.ts` and `geom/common.ts` re-export `lp` from num. `vertexDist2`: keep (it is a convenience
over slots; one line). *EQUIVALENCE:* pure casts, identical. *RISK:* none.

**I-9 — `copyWarnings` vs `foldWarnings`.** `src/insert/insertChain.ts:132–134` clones a warning list (used to restore
`tx.warnings` on a refusal); `src/insert/classes.ts:187–200 foldWarnings(own, from)` merges by code. Different jobs; but
`copyWarnings`'s clone is also what the test `bfuzz.test.ts:170 copy` and `caps`/fixtures write. *Consolidation:* move
`copyWarnings` to `classes.ts` as exported `cloneWarnings` beside `foldWarnings`/`addWarning` (R2 adds, R3 imports).
*EQUIVALENCE:* identical deep copy (code, count, at{x,y}); order kept. *ORACLE:* `insertChain.test.ts` "a refusal in
step 1 itself leaves the transaction's warnings…", `routerGapS5` residual register ("the transaction's warnings as they
were"), B-FUZZ `insertJudged` (`t.warnings` equal `warningsBefore`). *RISK:* none.

**I-10 — the "sub-edge holding a projection" walk ×4.** `src/insert/crossings.ts:116 cornerBeside`, `:183 subEdgeAt`
(+ `:201 subEdgeOf`), `src/insert/snapRound.ts:776 fallbackEnd`, `:879 otherEnd` all walk a piece's sub-edges to find the
one whose parameter interval holds the projection of (x, y) and return an end or the pair. *Consolidation:* one
`subEdgeHolding(ctx, piece, x, y): readonly [VertexId, VertexId] | null` in `stretch.ts` (beside `pieceOf`), and the four
callers choose the end (`nearerVertex`, or "the other end", or "the end not on path"). *EQUIVALENCE:* the projection
parameter is computed with integer dot products and compared `proj(s) <= t && t <= proj(t)` (both inclusive — a point
projecting exactly onto a run vertex belongs to both sub-edges; `bfuzz.test.ts:104–112 fallbackLandings` oracle keeps
*both* candidates in that case, so whichever sub-edge the kernel chooses the test accepts — but the register JSONs pin
the actual choice: the implementer must keep the first-in-run-order sub-edge as today in each caller). Ties for "nearer
end" remain `nearerVertex`'s (y then x). *NUANCE:* `cornerBeside` reads the crossing's piece at the corner side;
`fallbackEnd` excludes ends on the current path (`onPath`); `otherEnd` excludes `v`. These stay in the callers.
*ORACLE:* `bfuzz.test.ts` (step1-2) fallback oracle, `step3-5/bfuzz` three families with caps, `s5-rescues.json`
(mechanism per case), `s6-lifecycle.json` (warnings per kind), `routerGapS3.test.ts` (the shrunk walk), `farWedge.test.ts`;
mutants M0-a-04 F1a/F1c, M0-a-05-s3 R1–R6/K1. *RISK:* medium–high (routes are pinned by registers). Do only with a
per-caller equivalence argument in the PR; otherwise record as "not done" in §4.

**I-11 — run-following helpers ×3 inside insert.** `src/insert/snapRound.ts:454 pieceNeighbours`, `:228 exitTowards`,
`src/insert/stretch.ts:309 routeBetween` each follow a level-n route through finer vertices from a vertex. *Consolidation:*
`routeBetween` stays the primitive; `pieceNeighbours` and `exitTowards` express themselves through `pieceOf`/`routeRun`
(index/items.ts) — the implementer verifies each returns the same half-edge lists (routeRun is the one definition of a
run, §3.3). *EQUIVALENCE:* same `HalfEdgeId[]` paths; `ALONG_REACH = 4·attractCm`, `ALONG_MAX = 256` (snapRound.ts:450–451)
unchanged. *ORACLE:* `snapRound.test.ts` `routeAlongExisting` describe (dog-leg shared; optional refused E_BELOW_MIN_EDGE
40 cm; "no path within 4·attractCm → false"), `stretch.test.ts` vertex rule 13 offsets, mutants M0-a-05 RT1, ST3, SJ1.
*RISK:* medium.

**I-12 — `insertChain` pass structure.** `src/insert/insertChain.ts:1087–1100`: `attempt(false)`, then on E_INVARIANT
`attempt(true)`, then on a bound refusal `attempt(true, 0)` and `attempt(true, 1)`; `routeOne` (759–840) tries routes
r1…r7 in order with per-route gates on `ctx.strict/extended/strip/anchor/acrossSlivers/endpointCrossings`. This is the
design as it now stands (C-0215, C-0217, C-0221, N-44 – N-46) — **not a consolidation target**, only a comment target
(C-insert-3). The one structural simplification worth doing: `boundRefusal` (529–531) and `test/insert/step3-5/caps.ts
countedRefusal` encode the same predicate (`E_INVARIANT || E_BELOW_MIN_EDGE with detail naming N-43`); the test
deliberately writes its own ("written from the ruling, not read from the code") — keep both; `routerGapS6.test.ts:139`
pins their agreement on six cases. *No change.*

**I-13 — `ChainCtx` flags.** `src/insert/stretch.ts:115–189`: `strict`, `endpointCrossings`, `acrossSlivers`, `anchor`,
`extended`, `strip`, `maxPass`, `pairsFrom`, `txPairsFrom`, `undo`. Six readings accreted one per round; they are
orthogonal gates `routeOne` reads. *Consolidation:* replace the six booleans/optionals by one `reading: RouteReading`
discriminated union? — **No**: tests construct `ChainCtx` literals with these fields (`snapRound.test.ts:268`,
`routerGapS4.test.ts:41`, `routerGapS5.test.ts:358`, `routerGapS6.test.ts:39` — `extended`, `strip: { variant, a, b }`),
and `ChainCtx` is exported from `insert/index.ts` (public). Keep the shape; rewrite the field comments (C-insert-4) to
state each gate's rule, not its round. *No code change.*

**I-14 — `MAX_DEPTH 4096` / `MAX_DEPTH_THIRD 512` (`snapRound.ts:82, 88`).** Two recursion bounds for `route()`; keep
(the third pass is bounded tighter by C-0217). Comment only.

**I-15 — `insert/index.ts` exports internals** (e.g. `addWarning`, `charge`, `classOutcome`, `classRefusal`, `decimate`,
`simpleRuns`, `attractRun`, `planAttraction`, `applyAttraction`, `placePoint`, `allocateAnchor`, `applySplitPlan`,
`planSplitThrough`, `attractStretch`, `chainJournal`, `promote`, `exactCrossings`, `INSERT_CROSSINGS`, `resolveCrossings`,
`chainCorner`, `wedgeBound`, `MAX_PASSES`, `snapRound`, `rewalk`, `TX_FACES_WALKED`, `ChainCtx` …). Readers outside the
kernel: none (the export-usage census: `plat/packages/model` imports `insertChain`, `splitThrough`, `opInsertChain`,
`InsertTx`, `InsertChainOpts` only; `plat/bench` none). Inside the kernel they are read by path, and by tests.
*Decision:* **keep every export** (public API frozen; API.md Appendix B lists them; `insertChain.test.ts:25–30` and
`tx/forms.test.ts:15–22` pin that the item-listed names are functions on the barrel). Record in §4.

**I-16 — `faces/common.ts` and `tx/tx.ts` reach into `insert/stretch.ts` by path** (`nearerVertex`, `nearParallel`,
`onRouteOfLevel`, `passesWithin`, `segmentBox`, `splitBreaksClearance`, `withinSegment`; `arr/kerb.ts:41 nearParallel`).
These are the shared exact predicates N-1…N-4 and I-1 re-home; after R1–R3 the faces/arr/tx imports point at
`num/exact.ts` (predicates) or stay on `stretch.ts` (`nearParallel`, `onRouteOfLevel`, `passesWithin`, `withinSegment` —
insert-specific, keep). `segmentBox` ×2 (`stretch.ts:211`, `invariants/common.ts:95`) → one in `num/exact.ts`
(returns a `Box`; invariants' returns the same four fields). Equivalence: identical arithmetic (min/max ± pad). RISK low.

### 1.3 `src/tx/` (R6, M0-a-06)

**T-1 — `runsOfPairs` vs arena `edgeRuns`.** `src/tx/chains.ts:36–101` and `src/arena/resolve.ts:75–152`: two
implementations of "the runs a pair set forms, in `resolve`'s order (C-0146 (5))". `runsOfPairs` is exported from
`tx/index.ts:46` (public; read by nothing outside tx — census `src=0 test=0 outside=0`, but public). *Consolidation
(R4 then R6):* `arena/resolve.ts` exports `edgeRuns` (name `edgeRuns`; added to `arena/index.ts` only under Q1 — else
imported by path), and `tx/chains.ts` becomes `export const runsOfPairs = edgeRuns` (name kept). *EQUIVALENCE:* must be
shown by a **new property test** (T-tx-new-1): for 10³ random pair sets drawn from the fuzz arenas (`test/tx/fuzzgen.ts`),
`runsOfPairs(p, pairs)` deep-equals `edgeRuns(p, pairs)` as `HalfEdgeId[][]` — run order, direction and start vertex.
Both order open runs from the lower (y, x) end, rings from the lowest-leftmost vertex counter-clockwise ("a loop hanging
off a branch vertex starts there, its first step to the smaller neighbour" — `arena/resolve.test.ts:87`), runs sorted by
their first two vertices. `edgeRuns` sorts/dedupes pairs by slot (`[...pairsIn].sort((a,b)=>a-b)`) and walks ends sorted
by vertex *slot* — slot order is used only to pick which run to walk first, and the output is then canonically oriented
and sorted; `runsOfPairs` uses `new Set` order. Any difference the property finds is a NUANCE to decide (likely: a ring's
start when two vertices tie — impossible on distinct lattice points; or a branch loop's orientation). *NUANCE:* both
treat "the set continues in exactly one way" as degree 2 within the set; rings vs open runs; dedupe of repeated pairs.
*ORACLE:* `arena/resolve.test.ts` ("gives the same positions whatever order the slots were allocated in"),
`tx/profiles.test.ts` (sampleProfile by arc length reads `routeLines` → `resolve`), `tx/removals.test.ts` stretch
removals, `tx/clauses.test.ts` "§3.4 Stretches", `digest/levelDigest.test.ts` (chain items read `resolve`),
`io/roundtrip.test.ts`, the N-47/B-1 properties in `restore.test.ts`; the new property. *RISK:* medium (two
implementations may differ on an input the fuzz never drew). **Ruling:** none if the property passes at 10⁴; if it finds
a difference, the session decides which order is C-0146 (5)'s.

**T-2 — `linesOfRuns` duplicates `routeLines`' body.** `src/tx/chains.ts:106–132` and `src/tx/profile.ts:153–186`:
`routeLines(p, chain, key)` = `resolve` then per run the own-level vertices with arc positions; `linesOfRuns(p, runs,
level)` is the second half. *Consolidation:* `routeLines` calls `linesOfRuns(p, r.runs, chainLevel)` (the body moves
once). *EQUIVALENCE:* identical arithmetic (cumulative `Math.sqrt` of integer squared lengths — `+ − × ÷ √` only;
`profiles.test.ts` pins samples "within 1e-9 cm" and "bit for bit" after re-join). *ORACLE:* `tx/profiles.test.ts`
whole, `clauses.test.ts` "§2.2 rule 5: a join drops a knot within 10⁻⁹ cm", `arr/bands/kerb.test.ts` (half-width
sampled per segment end via `knotLines`/`cutKnot`). *RISK:* low.

**T-3 — `around` duplicates `outgoing`.** `src/tx/relevel.ts:129–141` walks `p.vertices.out[v]` → `next[h ^ 1]` like
`src/arena/walk.ts:49–62 outgoing`, **without** `outgoing`'s liveness/termination check (`walk.ts:49` refuses a rotation
that never returns — `arena/malformed.test.ts:199`). *Consolidation:* replace `around` by `outgoing` **only after
confirming** the relevel call sites never run on a half-written rotation (relevel runs after deletions with
`deletePair`; if `around` is read between unlink and relink, `outgoing`'s guard would throw where `around` returned a
partial list). *EQUIVALENCE:* identical lists on a closed rotation; `outgoing` throws `arena: …` on an open one.
*NUANCE:* that guard — the implementer must read `rewriteRows`' order of `deletePair`/`around`. *ORACLE:* `tx/removals.test.ts`,
`restore.test.ts` (N-47, B-1, zigzag, targeted properties), `tx/fuzz.test.ts`, mutants M0-a-06-s1 K01–K11, -s2 X01–X16,
-s3 Y01–Y04, -s4 S01–S05. *RISK:* medium (a throw where none was). If in doubt keep `around` with a comment saying why it
tolerates an open rotation.

**T-4 — comparators ×4.** `src/tx/relevel.ts:349 pointCmp` ≡ `src/faces/common.ts:444 comparePoints` ≡
`src/arr/kerb.ts:120 comparePoints` (the last returns `a.y - b.y || a.x - b.x`, a different numeric value but the same
sign — equivalent as a comparator; the other two return −1/0/1); `digest/levelDigest.ts:169 cmpYX` on `[y, x]` tuples.
*Consolidation:* one `comparePoints(a, b): number` (−1/0/1) in `src/num/exact.ts`; `faces/common.ts` re-exports it
(public name kept), relevel and kerb import it; `cmpYX` stays (tuple type, the digest's own canonical ring — do not touch
the digest path, D-1). *EQUIVALENCE:* sorting with a comparator uses the sign only — `[].sort` results identical; the
`sort-with-comparator` lint is satisfied. *ORACLE:* `tx/clauses.test.ts` "C-0185 (17): the record's order", `restore.test.ts`
B-2 (removed records in key order — mutant X12 of M0-a-06-s2 "frees in reverse key order" must stay killed),
`arr/bands/*` ring orders, `faces/*` child order. *RISK:* low.

**T-5 — `uniq` ×2, `area2Of`/`faceArea2` ×3, `neighbours` ×3, `enter`/`overLimit` ×2.** `tx/tx.ts:202 uniq` ≡
`invariants/batch.ts:62 uniq` (`[...new Set(xs)]`); `tx/tx.ts:337 area2Of` ≡ `invariants/batch.ts:529 faceArea2`
(exported from `invariants/index.ts`) ≡ `faces/common.ts:557 faceArea2` (exported from faces index?) — all sum `area2`
of the own-level route rings; `tx/tx.ts` has no `neighbours` but `invariants/batch.ts:164` ≡ `insert/snapRound.ts:202`
(`new Set(outgoing(p, v).map(h => O[h ^ 1]))`); `tx/writers.ts:52–63 enter/overLimit` ≡ `faces/common.ts:57–68`
(identical, with the same `TX_FACES_WALKED` detail and the same `'the batch exceeded its work limit'` text).
*Consolidation:* `faceArea2(p, level, f)` becomes one implementation in `arena/walk.ts`? — it needs `faceRouteRings`
(index/items.ts) and `area2` (num): home it in `index/items.ts` beside `faceRouteRings` (R5) as exported `faceArea2`;
`faces/common.ts` and `invariants/batch.ts` re-export it (their public names kept); `tx/tx.ts area2Of` → import.
`enter`/`overLimit` → `tx/state.ts` (R6) exported as `enterWriter`/`overLimit`; `faces/common.ts` re-exports under its
names (R7). `uniq` → `num/exact.ts` (or inline `[...new Set()]`; prefer inline — two uses). `neighbours` → `arena/walk.ts`
`neighbourSet(p, v)` (R4). *EQUIVALENCE:* identical; `faceArea2` sums in ring order with `area2`'s exact flush — same
doubles. *ORACLE:* `tx/expect.test.ts` class floors (E_BELOW_MIN_AREA uses `area2Of`; `clauses.test.ts:221` "the area
floor is in cm², the measure area2 doubled" pins 300 000 vs 150 000), `invariants/fixtures.test.ts` kept-content split
("its area changed"), `faces/merge.test.ts` absorbSliver "the area floor is exact: A + 1 cm² below, A not". *RISK:* low.

**T-6 — `roleProblems`/`levelProblems`/`clearanceProblems` (tx.ts:427–551) vs invariants' rows and snapRound's
`clearanceProblem`.** The transaction's own commit-time checks over its removal log and the suite's batch rows
(`invariants/batch.ts clearance/levelConsistency/roleConsistency`) and insert's `clearanceProblem` (snapRound.ts:389)
are three readings of §3.10 over three different subject sets (the removal log; the commit record's touched set; the
chain's writes). *Consolidation:* **none** — the subject sets differ by design (C-0185 (4): "the transaction's own
clearance and level rows read its removal log"; C-0200 (2)), and the message texts differ and are pinned
(`invariants/common.ts verdict` prefixes the row name; `tx` prefixes nothing; insert's begin `insert: `). Share only the
predicate (N-1) and the one-ring builder (T-5 `neighbourSet`). `cornerBelow` (tx.ts:344) vs `acuteCorners`
(batch.ts:673): the first answers "any corner below cdeg", the second lists them — `cornerBelow` could be
`acuteCorners(...).length > 0` but that allocates and walks every corner; keep both, one comment each.

**T-7 — `tx/index.ts:48–55` comment narrates N-55 (6)/N-56 (5)/C-0287/C-0299** on `takeSavepoint`/`restoreSavepoint`/
`restoreGeneration`. Comment rewrite C-tx-1.

**T-8 — `check`/`notBuilt` in `tx/state.ts:169–176`.** I-5.

**T-9 — `tx/savepoint.ts:150 RESTORES` WeakMap and `restoreGeneration`.** Design as it stands (N-56 (5)); comment only.

### 1.4 `src/arena/` (R4, M0-a-02)

**A-1 — `edgeRuns` becomes the one run ordering** (T-1): export it (by path or, under Q1, from the index).
**A-2 — `stamp`/`keyName`/`debugCheck` ×2.** `src/arena/resolve.ts:36–61` and `src/index/query.ts:86–96`: identical bodies
but different prefixes (`arena: ` vs `index: `) — load-bearing (INVARIANT_THROW). *Consolidation:* `stamp(p)` and
`keyName(k)` → exported from `arena/resolve.ts` (or `arena/plat.ts` beside `sameKey`), imported by `index/query.ts` and
`facade/stamp.ts:20 keyName`; `debugCheck` stays per module with its prefix (or uses I-5's factory with a
`debugAssertions()` gate). *EQUIVALENCE:* identical messages. *ORACLE:* `arena/resolve.test.ts` stamp tests,
`index/query.test.ts` "the query surface", `facade/stamps.test.ts`, `invariants/debug.test.ts`. *RISK:* low.
**A-3 — `five()` ×2** (`arena/plat.ts:202`, `index/spatial.ts:134`): export from plat.ts (by path). Trivial.
**A-4 — `vertexAt` O(n) scan (`resolve.ts:176`).** Read by `facade/kernel.ts:212` only where the arena has no index
(`signature` routing, C-0146 (6)) and by `test/insert/step3-5/support.ts vertexAtPoint`-like oracles (their own). Keep;
the comment should say it is the no-index path only (mutant N11 of M0-a-16 "the no-index scan always returns empty"
survived — a hardening pin is a NEW pin: `facade.test.ts` "signature … scans one without an index" exists at :281 but
the mutant survived, so add a pin that `signature` on an index-less arena finds a vertex by lattice point — T-facade-new-1).
**A-5 — `arena/plat.ts:169–175, 320` comments narrate N-53 (1)/(4), M0-x-06's crashes.** Comment rewrite C-arena-1: state
the re-read rule as the rule ("a growth replaces the table; a writer re-reads `p.vertices`/`p.halfEdges` after any
allocation; several slots are allocated before any is written") and cite C-0286; drop the crash history.

### 1.5 `src/index/` (R5, M0-a-03)

**X-1 — `BOX_RANGE`, `stamp/keyName/debugCheck`, `insideRing`** → N-4, A-2, N-3.
**X-2 — `onward`/`routeRun` (`items.ts:85–154`) vs `io/encode.ts:71–123 onward/runsAt`.** The encoder re-derives every
level-r run with its own `onward` (with `fail` messages) instead of `routeRun` per pair. *Consolidation (R12):*
`runsAt` enumerates pairs and calls `routeRun(p, 2e)` (which already returns the run from its lower end — items.ts:114
"from its lower end"), keeping only the encoder's structural checks (`a === b` loop refusal, "mixes edge levels", the
"two route edges join one pair" check). *EQUIVALENCE:* `routeRun`'s run is cut at vertices of level ≤ the pair's level
read as `m = T.level[e]`?? — **check**: `routeRun(p, h)` cuts at vertices of level ≤ the *run's* level (the edge's birth
level), while `runsAt(p, r)` cuts at level ≤ r for every edge of level ≤ r — these are different runs when r > the edge's
level (an L0 edge's level-2 route is cut at L1 and L2 vertices too). So `runsAt(p, r)` = `routePieces(routeRun(...), r)`
reassembled? No — `routePieces` cuts finer; `runsAt(p, r)` for an L0 edge at r = 2 is the L0 run cut at vertices of level
≤ 2, i.e. the level-2 route edges (§3.3). `items.ts:161 routePieces(p, run, n)` gives exactly "the run cut at vertices of
level ≤ n". So `runsAt(p, r)` = for each run of level ≤ r, `routePieces(run, r)` each as a Run — **equivalent by
definition**, to be shown by a new unit test comparing `runsAt`'s output (made testable) to the items.ts composition on
the fixtures and the fuzz arenas (T-io-new-1). *ORACLE:* `io/roundtrip.test.ts` byte-identical save→load→save on random
batch arenas, `io/format.test.ts` "no slot enters the bytes", `io/corrupt.test.ts`, `io/outer-ring.test.ts`,
`io/compact.test.ts`; mutants M0-a-15 K3–K12. *RISK:* medium (persisted bytes). Do only with the new test green at the
fuzz sizes; otherwise comment-only.
**X-3 — `HOT_PIXEL_SQ`** add beside `HOT_PIXEL_CM` (N-4). **X-4 — `faceArea2`** home (T-5).

### 1.6 `src/faces/` (R7, M0-a-07)

**F-1** `insideRing`/`insideRegion` → N-3 (names kept, bodies delegate). **F-2** `segmentsTouch` → N-2. **F-3**
`enter`/`overLimit`/`lp`/`comparePoints`/`faceArea2` → T-5/T-4/I-8 (names kept as re-exports). **F-4** `fan.ts:50 PI` →
N-4. **F-5 — `faces/merge.ts:114 neighbours(t, f)`** is face-neighbours (a different notion from vertex one-rings) —
rename nothing (private); comment says "faces sharing an edge". Also `faces/claim.ts:76 carries(p, h, role, entity,
ordinal, n)` (edge rows) vs `splitThrough.ts carries` (vertex rows) — different elements; keep both, name them
`edgeCarriesRow`/`vertexCarriesRow` for clarity (private renames only). *ORACLE for F-*:* `test/faces/*` whole,
mutants M0-a-07 (checks/M0-a-07.md — no mutant table rows matched the extraction pattern; the implementer re-reads
`checks/M0-a-07.md` and `-notes.md` for its kill list), `faces/bent.test.ts` C-0214 refusals, `isolated.test.ts` P6.
*RISK:* low.

### 1.7 `src/arr/` booleans, buffers, offsets, insets, tile rings (R8, M0-a-08)

**B-1 — `distinct` ×2** (`winding.ts:100`, `offsetFace.ts:35`) ≡ `geom/common.ts:88 distinctRing` (same body). → import
`distinctRing`. **B-2 — `simpleLoops`/`dropStraight` ×2** (`winding.ts:628–720`, `tileRings.ts:34–72`): identical;
export from `winding.ts` and import in `tileRings.ts`. *EQUIVALENCE:* identical; `keep` predicate semantics (C-0206 (1))
preserved. *ORACLE:* `booleans.test.ts` "a hole touching its outline…", `tileRings.test.ts` (joints share vertices,
rotated T), `arr/bands/bfuzz` tileRings property; mutants M0-a-08 K14–K16, K31, H04. **B-3 — `div`/`SCALE`** (buffer,
insetRing; kerb's exported `div` in R9) → N-4 `divScaled`. **B-4 — `shortestPath` own heap (`winding.ts:376`)** vs
`geom/heap.ts BinaryHeap`: the overlay's Dijkstra re-implements a heap. *Consolidation:* use `BinaryHeap` (ties by item
id — the same determinism rule `geom/path.ts` states). *EQUIVALENCE:* **only if** the current `shortestPath` breaks ties
the same way (smaller vertex slot first?) — slot-based ties would be a slot dependence; `winding.ts` must already avoid
slot order (C-0196 (1) "consistent by construction"). The implementer reads `shortestPath`'s tie rule; if it is by slot,
this is a latent nondeterminism to report, not silently change. *ORACLE:* `booleans.test.ts` canonical rings, N-41 (3)
retraced spur, random rectangles property; `arr/bands/register.test.ts` replay classification. *RISK:* medium. **B-5 —
`isConvexRing`** (`insetRing.ts:47`, exported) vs `geom/lir.ts:170 isConvexRing(ring, H)` (private, hull-based): different
definitions (every turn left-or-straight vs rotation of the strict hull). Keep both; comment the difference (K35/K35t
mutants of M0-a-08: `<` vs `<=` and tolerance — the inset one refuses a 1 cm dent, pinned by `offset-inset.test.ts:161,168`).

### 1.8 `src/arr/` bands (R9, M0-a-09)

**K-1** `comparePoints`/`byText` (`kerb.ts:106–123`): `byText` ≡ `arena/keys.ts:13 compareKeys` (code-unit order) — import
`compareKeys`; `comparePoints` → T-4. **K-2** `div`/`SCALE`/`nearestOn` (kerb.ts:398–423): `div` is exported from kerb.ts
(is it in `arr/index.ts`? the census shows `arr` exports … — check; if public keep as `export const div = …` delegating).
**K-3** `strictlyInside`/`onSegment`/`entersRegion` (kerb.ts:689–730) → N-3 (c)/(d) with kerb's non-zero rule kept
(mutant X17 must stay red; X10 "entersRegion proper crossings only" must stay red). **K-4** `bandUnion.ts:166 insideKerb`
and `:81 onBoundary` → N-3. *ORACLE:* `arr/bands/*` whole incl. `widthstep.test.ts` (the N-52 (2) reach pins X01–X18),
`corridor.test.ts` S8 ≡ S9 Hausdorff 0, `representation.test.ts`, `register.test.ts` + `refusals.json`. *RISK:* low–medium.

### 1.9 `src/warp/` (R10, M0-a-13)

**W-1** `closerThan` → N-1 (keep `export { segmentCloserThan as closerThan }` for `validate.test.ts`). **W-2**
`MIN_EDGE = 25`, `ATTRACT = 26`, `HOT_PIXEL_SQ`, `BOX_RANGE`, `padBox` → N-4 (`padBox` stays in view.ts; it clamps to
`BOX_RANGE`). **W-3 — `nearestLattice` (`warp.ts:64`, exported through `warp/index.ts`, public)** re-implements
`placement.ts`'s nearest-of-four (ties y then x). *Consolidation:* `placement.ts` (R2) exports `nearestLatticePoint(x, y)`
(the placement's inner choice made a function); `warp.ts` keeps `export const nearestLattice = nearestLatticePoint`
(public name kept; `warp/fixtures.test.ts` imports `nearestLattice`? — census says test=1). *EQUIVALENCE:* identical
(`Math.floor` then four candidates, `d < nd` strict with y-then-x ties — mutant K08 of M0-a-04 "the last on a tie" must
stay red through both doors). **W-4 — `placeOnRoute` (`warp.ts:93–147`)** re-implements the hot-pixel band scan with
`vertexProblem` as the qualifier. Same family as I-3: share the **candidate enumerator** (`bandCandidates`) once I-3
exists; the qualifier stays warp's. *EQUIVALENCE:* identical enumeration order (nearest, then band outward within
attractCm, ties y then x) and identical charge per candidate (`insert.placementCandidates`). *ORACLE:* `warp/fixtures.test.ts`
"§13.1: the kerb (0,0)–(1000,9) past (517,30) — re-seated at (517, 4) — 25.999 cm", "two re-seats whose rounded targets
collide: the lower (y, x) is placed first", `bfuzz.test.ts` (warp) found cases, `invariants/fuzz.test.ts` warp steps.
*RISK:* medium. **W-5** `warp/held.ts:31 check` → I-5. **W-6** `warp/validate.ts:9`, `simplify.ts:13` import `segmentsMeet`
from `insert/decimate.js` → from `num/exact.js` after N-2 (no behaviour).

### 1.10 `src/invariants/` (R11, M0-a-14)

**V-1** `PI`, `uniq`, `neighbours`, `faceArea2` → N-4/T-5 (public `faceArea2`, `acuteCorners` names kept). **V-2**
`common.ts segmentsMeet/segmentBox` → N-2/I-16 (names kept as re-exports if the file's exports are read by tests —
`invariants/index.ts` does not export them; check `test/invariants/*` imports). **V-3** `whole.ts:298` inline `inside`
→ N-3. **V-4** `eulerCounts` (`whole.ts:36`, exported) vs `test/insert/step3-5/support.ts:233 eulerCounts` — the test
oracle is deliberately independent; **keep both** (the oracle rule), note in §4. **V-5** comments narrating N-47/N-49
(`batch.ts:590, 602`) → C-inv-1.

### 1.11 `src/io/` (R12, M0-a-15)

**O-1** `runsAt`/`onward` → X-2 (only with T-io-new-1 green). **O-2** `format.ts:37–50 HALF/SPAN/inRange/pointKey`:
`inRange` ≡ `geom/common.ts:47 isLatticeCoord` (on a pair) ≡ `num/snap.ts` checks — share `isLatticeCoord` from num (R1
moves it to `num/exact.ts`, geom re-exports). **O-3** `decode.ts:83–84 VERTEX_FLAG_MASK = 7`, `FREE_KIND = 0xffff`
re-declared beside `arena/plat.ts:49 FREE_KIND` — import the arena's. *ORACLE:* `io/*` whole (byte-identical round trips).
*RISK:* low (O-2, O-3), medium (O-1).

### 1.12 geom, skeleton, medial, facade, digest, hash, rng, dmath, num, noise (R13)

**G-1** `geom/common.ts PI/lp/isLatticeCoord/distinctRing` become re-exports of `num/exact.ts` (no public change:
`geom/index.ts` exports none of them). **G-2** `geom/hex-lattice.ts:36 strictlyInside` → N-3 (strict form).
**G-3** `geom/heap.ts BinaryHeap` is the one heap (B-4 adopts it). **G-4** `lir.ts isConvexRing` stays (B-5).
**S-1** `skeleton/prepare.ts segmentsMeet/insideRing` → N-2/N-3 adapters; `roof.ts:61 half` ≡ `engine.ts:210 half` ≡
`warp/validate.ts:106 half` (direction half-plane) → one `halfPlaneOf(x, y)` in `num/exact.ts`. **M-1** `medial/axis.ts:118
segmentsMeet` → N-2. **E-1** `facade/stamp.ts:20 keyName` → A-2; `facade/kernel.ts:13, 74–76, 157–161` comments narrate
N-55 (5)/C-0290 → C-facade-1. **D-1** `digest/levelDigest.ts`: **untouched** except `check` (I-5) — its canonical
ring/bucket/hash path is the persisted digest (golden fixtures in `test/digest/`); `cmpYX`/`canonicalRing` stay its own.
**hash, rng, dmath, num, noise, types, adapters:** no patchwork found — single-owner modules with one implementation
each (dmath is a vetted fdlibm port; its own `pi`, `half` constants stay). `rng/rng.ts:82 sameKey(s: Stream, key)` vs
`arena/plat.ts:249 sameKey(a: PlatKey, b)` are different functions with one name in two private scopes — rename the rng
one `sameStreamKey` (private) for clarity.

---

## 2. Comment rewrite plan (per file)

Rule: a comment describes the design as it stands and cites the C-row and design section that fix it; it never says
"before N-55", "the S5 fix", "retired", "is gone", "used to". Round numbers (S1 – S7), probe ids (q10, q13), B-FUZZ
seeds and the names of mutants belong in `checks/*.md`, not in source. Where a comment today is the only place a rule is
stated, the rewrite keeps the rule and drops the narrative.

**`src/insert/insertChain.ts`** (41 N-citations). Module comment (lines ~1–45): rewrite as "The door for chains (§3.4,
§3.6 steps 1–5). A chain is inserted run by run and vertex by vertex: step 2 lands each vertex; each segment is routed by
`routeOne`'s readings in order — the design route, the strict route, the route along existing edges, the endpoint route,
the route across a sliver, the anchored route, the split route — each judged whole against §3.10's clearance and the
fidelity bound (2·√2·attractCm, `FIDELITY_SQ`); a segment no reading keeps is refused `E_INVARIANT` (a mandatory chain)
or `E_BELOW_MIN_EDGE` naming the bound (an optional one), counted by B-FUZZ against its cap; the op is atomic and never
throws on a geometric input; a closed overlay throws at the entry. Readings: C-0177, C-0202, C-0209, C-0215, C-0217,
C-0221, C-0302; rulings N-37 – N-46, N-53, N-55 (checks/M0-spec-notes.md)." Keep one "Rulings:" line listing the N-ids
once; delete every per-line "(N-xx)" where the C-row is cited. Specific lines: 97 (INVARIANT_THROW: "the kernel's three
assertion prefixes; a throw with one becomes E_INVARIANT, C-0215"), 193–195 (delete the "wrapper here is gone" sentence;
say "a split's sub-edge keeps clearance at its own ends by the placement rule's (iii), C-0284"), 228, 309 ("the free
spot: the lattice point nearest `pt` within the fidelity bound (ties y then x) keeping minEdge from every vertex and
edge and the kept-content rule, C-0217"), 373, 378, 515, 521–531 (`BOUND_DETAIL` is a pinned message text — keep the
string, rewrite the comment), 536, 560, 669, 749–757 (routeOne's reading list — the natural home of the ordered rule
list), 798–806, 833–837 (the E_INVARIANT text is pinned: `insert: no route from (x, y) to (x, y) keeps clearance (§3.10)
within the fidelity bound (N-43)` — **keep the string exactly**, `routerGapS6.test.ts:142` and `s5-register.json` pin it),
846, 877–881, 960, 997, 1021, 1049, 1089–1092 (the pass structure: "pass 1 the router; pass 2 the anchored and split
readings for a chain pass 1 refused for the bound; passes 3 and 4 the strip readings (free spot last / first) for a chain
both refused for the bound; a refusal's code is the second pass's").

**`src/insert/stretch.ts`**: 129, 142–176 (`ChainCtx` field comments → one sentence each: what the gate admits), 190–194
(`FIDELITY_SQ`: "(2·√2·attractCm)² = 8·attractCm² = 5 408, the fidelity bound every committed route keeps, C-0215"),
463, 476 (I-7's one line), 485–486 (**delete** the reservePair narrative; `applyLanding` needs no comment there), 507,
681. **`src/insert/snapRound.ts`**: module comment 20–27 (the reading list once, as insertChain's), 353, 611, 638–652
(per-route comments: "the endpoint route: every crossing on its endpoint fallback" / "the sliver route: …"), 724, 772,
823–829. **`src/insert/crossings.ts`**: 18–25, 177, 206, 234, 269–277, 291–297 (`RunPlacement` fields: rule, not
"(S5)"). **`src/insert/splitThrough.ts`**: 241, 264 ("the re-read rule, C-0286"), 329. **`src/insert/wedge.ts`**: 11,
26, 48 (`wedgeOutcome`: "within attractCm: routed; a mandatory chain up to the cap 2·√2·attractCm: routed with
W_WEDGE_ROUTED; beyond: its crossings placed in turn; an optional chain beyond attractCm: E_BELOW_MIN_EDGE; C-0202").
**`src/insert/attractVertex.ts`**: 134, 160. **`src/insert/classes.ts`**: 123. **`src/insert/rewalk.ts`**: 23 ("and the
fix round's row refining them" → name the row).

**`src/tx/index.ts`** 48–55: "The before-image every batch keeps (C-0185 (1)), exported for the pipeline runner's stage
image: `takeSavepoint` before a stage, `restoreSavepoint` after; a restore across committed batches bumps the arena's
`restoreGeneration`, which version-keyed state (the level digests) keys on too (C-0287, C-0299)." **`src/tx/relevel.ts`**
19, 446 ("identical rows before the batch are read with the batch's stripped rows left out, C-0287"), 567, 825, 850, 989,
1003 (N-47 → "an own-child ancestor keeps its record only while a child survives, C-0219"). **`src/tx/state.ts`** 64–70,
93 (`closed`: "set at commit, reject and rollback; every writer asserts it first — a stale overlay never writes";
`op`: "names the running op in a rethrown error's prefix"). **`src/tx/tx.ts`** 14, 559, 637. **`src/tx/savepoint.ts`** 150.

**`src/arena/plat.ts`** 169–175, 257, 320 (C-arena-1: the re-read rule as a rule; drop "M0-x-06's rotation crashes").
**`src/arena/debug.ts`** 20–33 (the tiny-tables mode: what it is and that it is a test switch; drop "met no test").
**`src/arena/tables.ts`** 39. **`src/facade/kernel.ts`** 13, 74–76, 157–161 (the message text at 161 is pinned by
`facade.test.ts` — keep the string; rewrite the comment: "a closed overlay is no open transaction; refused in every build").
**`src/invariants/batch.ts`** 590, 602. **`src/arr/kerb.ts`** 366, 390, 438, 468, 564, 616, 711 (N-52 (2) → "the reach
rule: a junction's split stays within 2·max(hwIn, hwOut) + attractCm of J and never crosses a block, C-0277, C-0281").
**`src/arr/bandUnion.ts`** 21. **`src/arr/winding.ts`** 239. **`src/skeleton/prepare.ts`** 2, 51; **`skeleton/types.ts`**
31 (N-52 (3) → C-0276). **`src/num/frame.ts`** 1 (the "COV-VG-VN-156" token is a review-record id — replace by the design
section it stands for or drop).

Module index comments (every `*/index.ts`): drop "The scaffold created this index empty (M0-s-01, C-0013); it belongs to
M0-a-NN" — provenance belongs to landed/*.json; keep the one-paragraph description and the item id. `src/index.ts`'s
comment "so the package exports nothing yet" is false today — rewrite: "re-exports every module folder's index; the
package's public API is the union (API.md Appendix B)".

Comments to **add**: (a) in `num/exact.ts`, one header stating the exactness contract of each predicate (lattice inputs
within ±2²³; which products stay below 2⁵³); (b) above `routeOne`, the ordered table of readings with the gate each
needs (replaces nine scattered comments); (c) above `edgeRuns`, the run-ordering rule (C-0146 (5)) as the one place it
is stated, with `runsOfPairs` pointing at it.

---

## 3. Test consolidation plan (per test folder)

Principles: oracles stay independent of the code under test (never replace a BigInt test oracle by the kernel's
function); nothing is weakened — every `it` that kills a mutant in a check's table keeps a case that kills it; register
JSONs are byte-untouched; properties keep their sizes and seeds; merged files keep their `describe` titles (the checks
cite them).

### 3.1 `test/insert/step1-2/` (R2)

Files: `attract`, `bfuzz`, `classes`, `decimate`, `placement`, `source`, `splitThrough`, `support`. Already one subject
per file. Changes: **(a)** `splitThrough.test.ts` is 850 lines holding four subjects (the split; the endpoint rule and
refusals; rows and anchors; N-53 doubling pins; C-0284 own-ends; N-55/N-11/N-12 closed-overlay). Split into
`splitThrough.test.ts` (lines 1–317: the split, endpoint rule, rows) and `closed.test.ts` (lines 654–850: every
closed-overlay pin of the folder, N-55 (5)/N-11/N-12), moving the N-53 doubling describe (319–491) to `growth.test.ts`
and the C-0284 describe (493–652) to `placement.test.ts` beside the (iii) cases it belongs with. No case is dropped; the
mutants K01–K28, F1a–F1e (M0-a-04), M9/MQ17 (s7), P1 pins (N-53 (1)) keep their killing cases by name. **(b)** `support.ts`
`closerThan`/`segmentsShare`/`segmentDistance`/`orientBig` are the folder's oracles — keep; `generator` (mulberry32) and
`intIn` → the one `test/arena/support.ts` `rng`/`intIn` (T-support-1) re-exported here (byte-identical generator: same
constants `0x6d2b79f5`, same `>>> 0` arithmetic — `tx/fuzzgen.ts rng` and `arena/support.ts permutation` already share
it). **(c)** `placement.test.ts:27 nearestLattice` (a test-side copy) stays as the oracle of W-3's function.

### 3.2 `test/insert/step3-5/` (R3) — the main consolidation

23 files + 10 registers. Group by subject, keeping every `describe` title:

| Merged file | From (describe blocks) | Mutants/pins it must keep killing |
|---|---|---|
| `insertChain.test.ts` | itself (interfaces, placed, knots, N-7 warnings, simple runs, rows, atomic, CONTENDED) | KN1 (knot carried), M0-a-05 F3 |
| `stretch.test.ts` | itself | ST3 (nearParallel ×2 → red at 4.9°/5.1° cases), SJ1 (`sharedPairs` journal) |
| `snapRound.test.ts` | itself + `chaikin.test.ts` (the §3.6 receipt fixture is snap rounding's statistics) | RT1, MAX_PASSES, W_SNAP_PASSES never |
| `crossings.test.ts` | itself + `farWedge.test.ts` (N-38/N-40 cap cases are step-4 wedge cases) | CC1 (`>= 4·MIN_EDGE_SQ` red at 25.6/30/34 cm), XC1 (one `insert.crossings` per corner), the 73/74 cm cap pins |
| `rewalk.test.ts` | itself | re-parenting journal (F-2 of M0-a-05 round 1) |
| `promote.test.ts` | itself (candidate (b), kept content, N-6 WEDGE_S) | PJ1 (`promoted` journal) |
| `router.test.ts` (new name; or keep `routerGap.test.ts`) | `routerGap.test.ts` (N-37 ring), `routerGapS3.test.ts` (N-42 shrunk walk), `routerGapS4.test.ts` (bound measure, second pass cases from `pass2.json`, safety nets, C-0209 bounds KA/KP/KC/KE/KF/KG/KN), `routerGapS5.test.ts` (third pass units, `s5-rescues.json`, `s5-register.json`, caps), `routerGapS6.test.ts` (free spot Q8/Q10, landing Q18/Q19, boundRefusal ≡ countedRefusal, `s6-lifecycle` optional kinds, `s6-register.json`) | M0-a-05-s3 R1–R6, K1 (third pass off → 19 red), s7 M3–M6; every register case (`expect(r.warnings).toEqual(c.warnings)`) |
| `lifecycle.test.ts` | itself (`s6-lifecycle.json` undo/remove per kind; N-55 (5) closed) + `foldback.test.ts` (Q10 fold-back flag) + `placementEnds.test.ts` (C-0284 (3) doors) | s7 M1–M6, M8, M9 |
| `fidelity.test.ts` | itself (the bound's own property) | the cap at 3 (PR size) |
| `register.test.ts` | itself (`fix1-case*`, `n43*`) | — |
| `bfuzz.test.ts` | itself | caps 12/8/8 |

Inside `router.test.ts`, order the describes by the reading they pin (bound measure → pass 1 nets → pass 2 → pass 3
units → pass 3 rescues → residual register → optional class → caps), each keeping its title. Dedupe: `routerGapS4.test.ts
:20–43` and `routerGapS5.test.ts:338–358`, `routerGapS6.test.ts:24–40` each define `SQUARE`, `STRIP`, `ctxOf`, `free`,
`codes`, `at` — one copy at the top of `router.test.ts`; `replayFuzz` (S5) and `replay` (S6) are one function — keep S5's
(it asserts fidelity on every committed chain and content-print restoration on every refusal; S6's does the same) with a
`role` parameter. `wideArena(cell)` appears in `routerGap`, `routerGapS5`, `register` — one in `support.ts`. `segDist`
(`routerGap:30`, `routerGapS3:45`, `farWedge:22`) and `fidelity.ts:148 distToSeg` → one `segDist` in `support.ts`
(T-support-2; the BigInt `closerThan` oracle stays separate). `chunkRefs`/`digests`/`snapshot` (`lifecycle:72–77`,
`foldback:44`, `tx/restore.test.ts:39–51`) → one `snapshot(p)` in `test/tx/support.ts` (T-support-3) re-exported here.
`vertexAtPoint` (`support.ts:331`) and `test/index/support.ts:766` → keep the step3-5 one, index imports it (T-support-4).
`caps.ts`, `gen.ts`, `fidelity.ts` stay as the oracles they are (written "from the ruling, not the code").

Mutant-kill mapping to confirm after the merge (the implementer runs the merged folder once per mutant from the s3/s7
tables or cites the unchanged `it` by title): R1 → `router.test.ts` "boundRefusal (the router's gate) and countedRefusal
agree" + `lifecycle` kinds; R2 → `lifecycle` `pass3-optional` + `router` F2; K1 → the 19 S5 rescue/residual cases; M3 →
`bfuzz`, `lifecycle` (foldback section) 12 cases; M4 → foldback's second control and four register kinds; M9 → placementEnds'
four cases (now in `lifecycle.test.ts`).

### 3.3 `test/tx/` (R6)

17 files. Keep the file set (each is one subject) except: `smoke.test.ts` (two round trips) folds into `forms.test.ts`;
`fixtures.test.ts` (22 lines) stays (it drives `fixtures/sequences.json`). `restore.test.ts` (828 lines): its three
properties and two case tables stay; its local `chunkRefs/digests/snapshot/facesPerLevel` → `support.ts snapshot`
(T-support-3), `segmentDistance` (661) → `segDist` of the shared support, `rng` already from `fuzzgen.ts`.
`order.test.ts:12–22 rng` → `fuzzgen.ts rng` (identical mulberry32). New: **T-tx-new-1** the `runsOfPairs ≡ edgeRuns`
property (T-1) in `resolve`-adjacent `test/tx/chains.test.ts` (10⁴ pair sets from `randomBatch` arenas + the hand-built
QUARTERS/LAKE dressed arenas + branch/loop fixtures of `arena/resolve.test.ts`). Mutant map: M0-a-06-s1 K01–K15 →
`restore.test.ts` N-47 describe (unchanged); -s2 X01–X16 → B-1 cases and properties; -s3 Y01–Y04 → targeted property;
-s4 S01–S05, E01 → N-55 (1) cases and `savepoint.test.ts`; -s5 M01–M13 → `savepoint.test.ts` N-56 (5) describe.

### 3.4 `test/faces/` (R7), `test/arr/` (R8, R9), `test/warp/` (R10), `test/invariants/` (R11), `test/io/` (R12),
`test/arena/` (R4), `test/index/` (R5)

Already one subject per file; no merges. Support dedupe only: `test/arr/booleans-buffers/support.ts` `insideRings`/
`distToSegment`/`simpleRing` and `test/arr/bands/support.ts simpleRing`/`area2` and `test/geom/support.ts`
`segmentsMeet/distToSeg/isSimple` are oracles — **keep** (independence), but the three `simpleRing` copies can be one in
`test/geom/support.ts` imported by both arr folders (identical BigInt-free exact logic — confirm the three are the same
rule: non-adjacent segments meeting, adjacent fold-back). `test/arena/support.ts` is the generator home (T-support-1).
New pins: **T-facade-new-1** (A-4): `signature(key, latticePoint)` on an arena without an index finds the live vertex (the
survived mutant N11 of M0-a-16). **T-io-new-1** (X-2): `runsAt` ≡ `routePieces∘routeRun` composition on the fixtures and
fuzz arenas. **T-warp-new-1** (W-3/W-4): `nearestLattice` ≡ the placement's nearest-of-four on the four tie classes
(500.5,0), (500,0.5), (500.5,0.5), (x.5, y.5 negative) — a cheap unit pin.

### 3.5 Vitest projects

The `kernel-tiny` project (`plat/vitest.config.ts:32–36`, PLAT_TINY_TABLES=1 over insert step1-2, step3-5 and tx) must
still include the merged files: its `include` globs are folder-level — the implementer confirms the merged names match.

---

## 4. Not touched, and why

* **Every exported name of every folder index** (hence of `@plat/kernel`; API.md Appendix B's 669 names): frozen by the
  task. Duplicated *exported* functions become delegations under both names (`splitBreaksClearance`, `segmentsTouch`,
  `comparePoints`, `faceArea2`, `runsOfPairs`, `nearestLattice`, `closerThan` (file-level), `lattice`). The question of
  *adding* exports (shared predicates on `num/index.ts`, `edgeRuns` on `arena/index.ts`) is Q1.
* **Item-listed interfaces** (M0-work.json `interfaces` of M0-a-01 … a-16, d-02 … d-04): untouched, signatures included.
* **Persisted formats**: the arena block (`io/encode.ts` byte layout, `FORMAT_VERSION 1`), the level digests
  (`digest/levelDigest.ts` lanes, tags, bucket count), the role registry JSON, the ten register JSONs under
  `test/insert/step3-5/register/`, `test/arr/bands/refusals.json`, `test/tx/fixtures/sequences.json`, the KAT vectors.
* **Message texts tests pin**: `insert: the transaction is closed (committed or rejected)`; `notBuilt('M3a'): …`;
  `insert: no route from (…) to (…) keeps clearance (§3.10) within the fidelity bound (N-43)`; `every route from (…) to
  (…) keeping clearance leaves the fidelity bound (N-43)` (`BOUND_DETAIL`); `insert: a chain class is mandatory or
  optional, not …`; `insert: the vertex (…) stands within minEdge of the edge (…)–(…)`; the suite's `<row>: <problem>`
  prefixes; tx's `tx <stage>/L<level>/<form>/<op>: `; the facade's "the overlay is no open transaction …"; the arena's
  stamp assertions; `E_BELOW_MIN_EDGE` details carrying "(… cm)" that `farWedge.test.ts reportedMove` parses. The
  N-43 token inside two detail strings is a *pinned text*, not a comment — it stays even though the comment rule would
  prefer a design name.
* **The router's structure** (`insertChain`'s four attempts, `routeOne`'s seven readings, `ChainCtx`'s gates): this is the
  design after C-0215/C-0217/C-0221 — simplifying it would be a behaviour change the registers would catch; only its
  comments change.
* **Three readings of §3.10 over three subject sets** (tx's removal-log checks, the suite's record rows, insert's
  write-time checks): by design distinct (C-0185 (4), C-0200 (2)).
* **Test oracles** written "from the design, never with the code under test" (`problems()`, `allProblems`, `faceProblems`,
  `eulerCounts` (test), `fidelityProblems`, `countedRefusal`, `referenceDecimate`, `fallbackLandings`, BigInt
  `closerThan`/`segmentsShare`, `insideRings`, `simpleRing`, `print`, `contentPrint`, `bits`): kept independent; only
  identical *infrastructure* helpers (generators, snapshots, segment distance for reporting) are shared.
* **`dmath/`** (fdlibm port with its own constants), **`hash/`**, **`rng/`**, **`noise/`**, **`adapters/`**: no patchwork.
* **`digest/levelDigest.ts`'s `cmpYX`/`canonicalRing`**: the digest's canonical form; sharing it with `arr/winding.ts
  canonicalRing` would couple a persisted hash to the arrangement's ring canon — left apart on purpose.
* **`tx/tx.ts cornerBelow` vs `invariants/batch.ts acuteCorners`**: different return shapes and costs; kept.
* **`insetRing.ts isConvexRing` vs `lir.ts isConvexRing`**: different definitions (B-5).
* **`eulerCounts` in `invariants/whole.ts` vs the step3-5 test oracle**: the oracle rule.
* **`arena/resolve.ts vertexAt`'s O(n) scan**: the no-index path by design (C-0146 (6)); only its comment and a new pin.

---

## 5. Open questions for the session

**Q1 (blocking for R1's shape).** May a round *add* exports to a folder index (`num/index.ts`: the shared predicates;
`arena/index.ts`: `edgeRuns`), given the task's "public API never changed in this pass"? Additions change API.md
Appendix B's count (669). If no: the shared module `src/num/exact.ts` is imported by path (27 such cross-folder path
imports exist today, e.g. `faces/common.ts` → `insert/stretch.ts`, `warp/validate.ts` → `insert/decimate.ts`), and
nothing is added to any index. The plan assumes **no** until ruled.

**Q2.** I-3 / W-4 (one placement-rule engine behind `placePoint`, `placeOnRun`, warp's `placeOnRoute`): proceed as the full
unification (parameters for the partner sub-edge, the pass-over, the reach, the qualifier), or only share the candidate
enumerator? The registers pin exact routes; the plan recommends the enumerator-only variant unless the implementer
writes the per-option equivalence into the PR and every register case replays green. A route shift of any register case
would be a committed-output shift (a one-time shift row like C-0215/C-0217) — the session's call, not a seat's.

**Q3.** T-1 (`runsOfPairs` → `edgeRuns`): if the new agreement property finds an input where the two orders differ (a
branch-loop orientation or a ring start), which one is C-0146 (5)'s? `resolve`'s is the older and is the one the digests
and `routeLines` read, so the plan proposes `edgeRuns` wins; confirm.

**Q4.** T-3 (`around` → `outgoing`): if `relevel.ts` reads a rotation mid-rewrite, `outgoing`'s "rotation never returns"
guard would throw where `around` returned a partial list. Is a throw there the desired fail-safe (N-53 (3)'s assertion
class) or must `around` stay? The plan keeps `around` unless the implementer shows every call site reads a closed rotation.

**Q5.** B-4 (`winding.ts shortestPath`'s own heap → `BinaryHeap`): if its tie rule turns out to read vertex slots, that is
a latent slot dependence in the arrangement (contrary to §3.3 "no output depends on slot numbers", though C-0196 (1)
argues the labels are consistent regardless). Report-and-rule rather than silently change.

**Q6.** Comment rule and pinned texts: the detail strings `… (N-43)` are part of two refusal messages tests and registers
pin. Keeping a ruling id inside a *message* while removing it from *comments* is the plan's reading of the rule; confirm,
or rule a message change (a golden shift of `s5-register.json`/`s6-register.json` details).

**Q7.** X-2 / O-1 (the encoder's own run walk → `routeRun`/`routePieces`): the block's bytes must stay identical; the plan
gates it on a new equivalence test at the fuzz sizes. Is a byte-identical save→load→save over the existing random-batch
corpus (`io/roundtrip.test.ts`) sufficient evidence, or does the session want the encoder left as is (comment-only)?

**Q8.** Test file renames (`routerGapS3…S6` → `router.test.ts`; `splitThrough.test.ts` split into three): the checks
(`checks/M0-a-05-s*.md`) cite the old file names and line numbers. The plan keeps every `describe`/`it` title so the cases
remain findable by title; does the session want a one-line map "old file → new file" appended to `checks/M0-a-05-notes.md`
and `checks/M0-a-04-notes.md` by the implementing seats (an append the seats are permitted)?
