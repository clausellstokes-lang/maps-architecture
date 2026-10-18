# @plat/layout — consolidation plan (lane `session/consolidation-layout`, flow-7)

Written by the consolidation architect seat under docs/PROGRESS.md J259/J260 (the owner's directive of 2026-10-11: "we are
adding things again and again and doing it all patchwork style — clean up, consolidate, make elegant and coherent the code
and comments, and make sure it stays at the same quality or higher"), J112's rule (elegance without losing nuance; every
unification carries a full EQUIVALENCE LIST; a nuance lost is a blocker), J263 (no index addition; a shared helper is a
file-level export imported by path; pinned message texts stay verbatim; an old → new test-file map is appended to the
item's notes), J264 / N-58 (zero refusals: a lawful-input refusal noticed is routed, never silently changed), J268 (a
consolidation round is a proof of zero change) and J270 / J273 (per-module `check`/`notBuilt` stay; two exact copies may
coexist between rounds; KI pin gaps and verdict changes go to the hardening queue). This seat planned only: no code, test
or data file was changed, no test suite was run, no git command was run. Evidence is the code, the tests and the records
(`plat/docs/build/checks/M0-b-0*.md`, `M0-c-0*.md`, `M0-e-04*.md`, `M0-e-05*.md`, `M0-x-02*.md`, `M0-x-04*.md` with their
`-s*` and `-notes` files; `choices.md` rows C-0201 – C-0329 the package cites; `M0-spec-notes.md` N-44 – N-59;
docs/M0-FIX-QUEUE.md Q27, Q37, Q39, Q40, Q41; docs/KNOWN-ISSUES.md KI-10, KI-11, KI-13; `M0.md` §0, §2.1, §3, §4), read
whole under plat/CLEAN-ROOM.md §1 (our own code only).

Conventions. `src/…` and `test/…` are `plat/packages/layout/src/…` and `plat/packages/layout/test/…`. Line numbers are
those of the tree read on 2026-10-12. "Public API" means every name a folder's `index.ts` exports: `src/index.ts` does
`export *` from every folder index. **The barrels differ in kind, and the plan turns on it:** `growth/index.ts` does
`export *` from every growth file (`boundary`, `mainRoads`, `heading`, `legality`, `proposals`, `prune`, `capacity`), so
**any new file-level export in `src/growth/` is a new public export and is forbidden here**; `siting/index.ts` does
`export * from './types.js'` and lists every other name explicitly; `pipeline/index.ts` does `export * from './base.js'`
(M0-x-04's file) and lists the rest; `backbone`, `districts`, `enceinte`, `infill`, `fields` and `fixtures` list every
name explicitly. A file-level export in an explicitly-listed folder is private to the package and may be imported by path
(J263 Q1, J268). The invariant of this whole plan: **no exported name is added to, removed from or renamed in any folder
index; no exported name changes its signature or behaviour; every item-listed interface (M0-work.json `interfaces`) is
untouched; every persisted form, model digest, golden, registered seed's output, 1 000-seed sweep result, refusal code and
pinned message text is byte-identical; a nuance lost is a blocker.** Consolidation acts on non-exported helpers, on the
bodies behind exported names (a duplicate body becomes a one-line delegation to the kept implementation), on comments,
and on tests.

Tree state the plan is written against (2026-10-12). M0-b-03's session round S4 is on main (756b1a76; ruling N-57 (1),
(3), N-59); M0-e-04 s2, M0-x-02 s2, M0-c-02 s3, M0-c-04 s3 and M0-c-03 s2 are landed and checked. **M0-c-02's session
round S4 (`src/enceinte/`, `test/enceinte/`; queue row Q40, C-0324) is in flight:** its build is landed unchecked in the
tree this seat read, and its closing check (`check/M0-c-02-close-s4`, RELATED@1000) was still running on another machine
at this seat's last reading of the lane log (its CHECKPOINT lines run from 03:03 to 05:00). So (a) every `src/enceinte/`
line number below is **provisional**, (b) the enceinte round (R8) is ordered after that check's verdict lands, and (c)
nothing below cites c-02 s4's unchecked edits as settled design; where a comment of that round is quoted it is quoted as a
comment to rewrite, not as a rule.

---

## 0. Summary and round order

The package is sound and well-pinned (every item PASSed its closing check; the mutant tables below are the oracles), but
twelve items built by twelve seats over three fix rounds each left the same small library of helpers in each folder and
left comments that narrate the round that wrote them. Concretely:

* **One exact predicate written three to six times.** "Do the closed segments ab and cd meet" exists, body for body,
  as `siting/geom.ts` `segmentsMeet`, `enceinte/plane.ts` `segmentsCross` and `districts/perimeter.ts` `meet` (exact,
  `orient2d`), and a fourth time in `backbone/graph.ts` `meets` on plain doubles (exact on lattice points by range, see
  1.4.5). "The (squared) distance from p to the segment ab" exists as `siting/geom.ts` `distToSegment`, `backbone/graph.ts`
  `footDist`, `enceinte/wet.ts` `segD2`, `growth/boundary.ts` `segD2`, `districts/perimeter.ts` `segDist2` and
  `districts/seeds.ts` `segDist2`, differing only in the unreachable `quot` message text. The even–odd point-in-ring test
  exists as `siting/geom.ts` `insideRing` (exact), `infill/sides.ts` `insideFace` and `infill/bentCutFabric.ts`
  `insideRing` (the same ratio loop). `rimAtBearing`, `boxOf`, `heightsOf`, `idNumber`, `cornerScale`, `arrivalDot2`,
  `arrivesSquare`, the monotone-chain hull, `unitOf`, the generated-lifecycle stamp and `HA_CM2` each exist twice.
* **Constants spelt again per file.** π as a literal in six files beside `siting/geom.ts`'s exported `PI`; `CDEG_PER_RAD`
  twice; `COS30` twice; `GROUND = { layer: 'ground', part: 0 }` in four source files and seven test supports; the
  `(a < b ? -1 : a > b ? 1 : 0)` comparator in fourteen places beside the kernel's exported `compareKeys`.
* **Two mirrors that are not copies.** `infill/ladder.ts` mirrors five of `infill/planner.ts`'s private step-7 helpers
  (`portals.ts:6` says so); three are bit-equal and unify, two (`spineHit`, `slideEnd`) differ in a nuance the plan keeps
  (1.2.5). Two radians-per-centidegree constants differ in their last bit (`PI / 18000` = 0.000174532925199432**94** in
  siting/infill, the literal 0.000174532925199432**96** in `growth/heading.ts`); they are never swapped (1.0.6).
* **One block copied across items.** The trace-then-strips tail of `enceinte/commit.ts` `commitS3Slice` (:184–208) is
  statement for statement `growth/boundary.ts` `traceStage1` (:288–304); and `growth/boundary.ts` `stageStops` copies
  `enceinte/strips.ts` `stopsFromArena` (docs/M0-FIX-QUEUE.md Q27 already names the second as a hardening dedupe, so only
  the first is planned here).
* **Comments that narrate rounds**: `enceinte/wet.ts:2, :8`, `water.ts:13, :23`, `trace.ts:17, :22` and `strips.ts:19,
  :22, :52, :334` say "session round s1/s2/s4", "Q22", "Q40", "Q6"; `pipeline/runner.ts:17, :121, :185, :358` and
  `report.ts:15, :305, :313` cite "Q32" (a queue row, not a rule); `infill/deepInterior.ts:10–20` tells N-27's NG counts
  and a hand-over; `growth/prune.ts:164` says "no longer provisional"; `infill/portals.ts:6` names "ladder.ts's mirror".
  Across the package 73 comment lines cite an N-ruling (bentCutFabric 16, trace 9, portals 6, strips 6, pull 5,
  boundary 5, runner 4, water 4); the substance stays, the round narration goes.
* **Tests**: the oracles are rightly independent of the code (every `support.ts` carries its own `segDist`/`insideRing`/
  `ringDist` and must keep them), but seven test supports repeat `GROUND`/`P`/`kernelFor`, and inside single folders the
  same fixture constants are re-declared file by file (`infill/planner` `SEEDS` ×5, `infill/fabric` `CELLS` ×4 and `P`
  ×3, `fields` `CELLS` ×5, `districts` `graphOf` ×3 and `RUNS` ×3, `backbone` `FAR`/`T`/`route` ×3).

Nothing found here is a behaviour bug; every finding is a duplication, a dead layer or a history-telling comment. Two
lawful-input refusals already in the queue (Q37, Q40) and one report under-count (Q39) were noticed again and are listed
in §5, not planned. The per-finding EQUIVALENCE and NUANCE lists below are what each implementing seat must hold; the
ORACLE names the tests, digests, registered seeds, sweeps and mutants (from the checks' tables) that must stay green/red.

**Round order** (one Opus seat per work item, lane `build/<id>-consolidate-1`, inside its `owns` only; each round has
its own closing check; a round depends only on the rounds listed):

| # | Round (work item, owns) | Depends on | What it does (findings) |
|---|---|---|---|
| R1 | M0-c-01: `src/fixtures/`, `src/siting/`, `test/siting/` | — | Makes `siting/geom.ts` the package's one exact-geometry home: adds the file-level exports `CDEG_PER_RAD`, `HA_CM2`, `distToSegment2` (geom), `boxOf`, `COS30` (lattice), `rimAtBearing`, `WorkLimitReached` (routes); de-duplicates `routes.ts`'s rim enumeration and heuristic; comments (1.0) |
| R2 | M0-x-02: `src/pipeline/{registry,order,runner,report}.ts`, `test/pipeline/core/` | — | `report.ts` `byName` → kernel `compareKeys`, one `rowOf`; "Q32" comments → C-0316's substance (1.1.1–1.1.3) |
| R3 | M0-b-01: `src/infill/granularityBands.ts`, `test/infill/bands/` | — | Comment pass only; no helper to unify (1.2.1) |
| R4 | M0-e-05: `src/fields/`, `test/fields/` | R1 | `pass1.ts` `PI` → siting's; one comparator → `compareKeys`; comments (1.7) |
| R5 | M0-b-02: `src/infill/{planner,sides}.ts`, `test/infill/planner/` | R1 | `planner.ts` exports its step-7 primitives file-level (`arrivalDot2`, `arrivesSquare`, `cornerScale`, `TOUCH_CM`, `RAD_PER_CDEG`, `M_TO_CM`); `PI` from siting; test-folder `SEEDS` into `faces.ts` (1.2.2–1.2.4) |
| R6 | M0-b-03: `src/infill/{bentCutFabric,ladder,width,deepInterior,portals,stage,index}.ts`, `test/infill/fabric/` | R1, R5 | `ladder.ts` imports planner's three bit-equal helpers; one hull (`hullOf`); `bentCutFabric` `insideRing` → `sides.insideFace`, `cornerScale` → planner's; six comparators → `compareKeys`; `deepInterior.ts`/`portals.ts` comments (1.2.5–1.2.14) |
| R7 | M0-c-03: `src/backbone/`, `test/backbone/` | R1 | `junctions.ts` π/`CDEG_PER_RAD`, `route.ts` `COS30`/`WorkLimitReached`, `graph.ts` `footDist`/`meets` → siting's; `stage.ts` `unit` → `enceinte/plane.ts` `unitOf`; exports `heightsOf` file-level for R11 (1.4) |
| R8 | M0-c-02: `src/enceinte/`, `test/enceinte/` — **after `check/M0-c-02-close-s4`'s verdict lands** (and after any s5 it causes) | R1 | `plane.ts` `segmentsCross` → delegation to `segmentsMeet`; `wet.ts` `segD2` → `distToSegment2`; `commit.ts` exports the trace-then-strips tail as `traceWithStrips` for R11; the s1/s2/s4 round narration in `wet`/`water`/`trace`/`strips`/`plane` headers rewritten (1.3) |
| R9 | M0-e-04: `src/districts/`, `test/districts/` | R1 | `perimeter.ts`/`seeds.ts` `segDist2` → `distToSegment2`, `meet` → delegation; `HA_CM2` and the `100_000_000` literal → siting's; `polsbyPopper`'s π; `typingCells(s6Table())` once; two comparators; test-folder `graphOf`/`RUNS` into `support.ts` (1.6) |
| R10 | M0-c-05: `src/growth/{proposals,heading,legality,capacity,prune,index}.ts`, `test/growth/s5cd/` | — | `legality.ts`'s inline 0.00017453292519943296 → `heading.ts` `RAD_PER_CDEG` (the same double, same item); four comparators → `compareKeys`; `prune.ts:164`, `proposals.ts:11` comments (1.5.7–1.5.9). No new export (the barrel) |
| R11 | M0-c-04: `src/growth/{boundary,mainRoads}.ts`, `test/growth/s5ab/` | R1, R7, R8 | `mainRoads.ts` `idNumber` → `proposals.ts`'s (public), `heightsOf` → backbone's, `rimAtBearing`/`boxOf` → siting's; `boundary.ts` `traceStage1` tail → `traceWithStrips`, `segD2` → `distToSegment2`; `HA_CM2` re-exported from siting (the public name kept). No new export (the barrel) (1.5.1–1.5.6) |
| R12 | M0-x-04: `src/pipeline/base.ts`, `test/pipeline/base/`, the `base.ts` line of `src/pipeline/index.ts` | R2 | `base.ts:670` comparator → `compareKeys`; comments; the whole-base closing check last, so one RELATED run sees every round (1.1.4–1.1.5) |

R2, R3 and R10 need nothing and may run in parallel with R1; R4, R5, R7, R9 follow R1; R6 follows R5; R8 waits for the
c-02 s4 verdict; R11 is last of the growth pair; R12 closes. **Every round's closing check runs the item's NEAR set at
full strength and RELATED at `PLAT_FUZZ_RUNS=1000` and compares the base fixtures' model roots and reports before/after
(byte-identical is the pass; M0-x-02 s2's P1 and M0-c-04 s2's 16-seed `arenaPrint` are the two precedents).**

---

## 1. Findings per folder

Each finding carries: EQUIVALENCE (why the unified code gives the same bits on every input), NUANCE (what differs and why
it does not matter, or why it must be kept), ORACLE (what proves zero shift), RISK. "Ruling needed" marks a finding the
session must decide (§5).

### 1.0 `src/siting/` and `src/fixtures/` (R1, M0-c-01)

**1.0.1 `siting/geom.ts` becomes the package's geometry home: file-level exports added, nothing added to `siting/index.ts`.**
`geom.ts` already exports `PI`, `quot`, `latticeAt`, `bearingCdeg`, `angularGap`, `area2Of`, `perimeterOf`,
`compactnessOf`, `insideRing`, `segmentsMeet`, `segmentMeetsRing`, `ringIsSimple`, `distToSegment` file-level (only five of
them through the index). R1 adds, file-level only: `CDEG_PER_RAD` (today private at :17, `5729.5779513082325`),
`HA_CM2 = 100_000_000` (today private in `slice.ts:40`, `districts/quarters.ts:48`, a literal in `districts/stage.ts`, and
the public `growth/boundary.ts:60`), and `distToSegment2(p, a, b)`: the body of `distToSegment` without its `Math.sqrt`,
with `distToSegment` then defined as `Math.sqrt(distToSegment2(p, a, b))`. `siting/lattice.ts` exports `boxOf` (:48) and
`COS30` (:14) file-level; `siting/routes.ts` exports `rimAtBearing` (:62) and `WorkLimitReached` (:32) file-level.
EQUIVALENCE: `distToSegment` today computes `fx, fy` and returns `Math.sqrt(fx * fx + fy * fy)`; the split returns the same
double from the same operations in the same order. Every other addition is an export keyword on an existing definition.
NUANCE: `siting/index.ts` is untouched (J263 Q1); the names are reachable only by path. ORACLE: `test/siting/*` (8 files,
17 describe / 73 it), its registered `SEEDS = [1, 7, 20251005]`; `lattice.test.ts` and `backbone/route.test.ts` import
`distToSegment` and `segmentMeetsRing` by path and stay as they are. RISK: none.

**1.0.2 `routes.ts`: the rim-node enumeration and the A\* heuristic are built twice (`gateRoutes` and `rerouteOutside`).**
Both walk `lattice.rim` into the same node list and the same `h(n)`. R1 hoists one private `rimNodes(lattice)` and one
`outwardHeuristic(lattice, …)` used by both. EQUIVALENCE: the same loops in the same order over the same arrays; the
heap's tie order is unchanged because the heuristic values are the same doubles. NUANCE: `rerouteOutside` searches
`blockedGraph(lattice, selected)` (C-0249's spur rule: the selection is blocked) where `gateRoutes` searches the lattice
with the bearing's target (`:114`) — the graph and the target list stay at each call site; only the enumeration (`:96–97`
≡ `:181–182`) and `h` (`:117–122` ≡ `:184–188`) are shared. ORACLE: `gates.test.ts` ('a spur at the pick (C-0249)' ×2, 'F-WORK … route.nodes' limit', 'is deterministic:
the same seed gives the same slice, byte for byte'), `fwall.test.ts` (the re-entry re-solve, 'roads leaving = N'),
`picks.test.ts` river picks; check mutants K27 (no reroute), K28 (reroute not kept outside), K35 (tree not charged)
killed. RISK: low.

**1.0.3 `levelset.ts`: `pinIndices` is called twice in `levelSet` (:271 on the contour, :287 on the simplified
outline) — two inputs, not a duplicate; kept.** Noted so that no round "de-duplicates" it: the pins' indices move when
the simplify drops vertices. ORACLE if anyone touches it: `levelset.test.ts` (seeds × 4 properties, 'the outline keeps
every node on its side …' (C-0201 (5))), mutant K18 (gates not pinned) killed.

**1.0.4 `rimAtBearing` ×2 (`siting/routes.ts:62`, `growth/mainRoads.ts:422`).** EQUIVALENCE: siting's angle is
`(9_000 - bearing) * (PI / 18_000)`; mainRoads' is `(9_000 - bearing) * quot(PI, 18_000, 'count', 'cdeg')`; `quot` returns
`ratio(n, d, kind).value`, which is `n / d` once `|d| ≥ 1` (kernel `num/ratio.ts:9, :16`, floor 1 for every kind), so both
multiply by the same double `PI / 18_000`; the walk, the frame test and the nearest-rim search are the same statements.
The signatures differ (`x, y` vs `p: XY`); the kept form is siting's with mainRoads calling `rimAtBearing(lattice, p.x, p.y,
bearing)`. NUANCE: none. ORACLE: siting `gates.test.ts` 'a requested bearing routes the pick to the frame at that bearing',
mutant K34 (bearing from the centre) killed; growth `spawn.test.ts`, c-04 mutant M12 (the outer course to the nearest
frame, not the rim at the bearing) — a survivor the notes call unpinned (c-04 N-2): the implementer's before/after of the
16 flat CITY seeds' `arenaPrint` (M0-c-04 s1's equivalence probe) is the proof. RISK: low.

**1.0.5 `boxOf` ×2 (`siting/lattice.ts:48` if-compares, `growth/mainRoads.ts:514` `Math.min`/`Math.max`).** EQUIVALENCE:
on finite numbers both give the same four bounds; the only differences are `NaN` (impossible: lattice points) and `−0`
(`Math.min(0, -0)` is `−0`, the if-chain keeps whichever came first), and every consumer compares the bounds with `<`/`>`
where `−0 == 0`. NUANCE: a `LatticePoint` can hold `−0` only through `Math.round` of a small negative, and no consumer
reads the sign. ORACLE: growth `boundary.test.ts`, `span.test.ts`, c-04 mutants M10 (ring clearance off), M11
(junction-candidate clearance off) killed. RISK: none.

**1.0.6 Two radians-per-centidegree doubles.** `PI / 18000` evaluates to 0.00017453292519943294 (siting's inline
`PI / 18_000`, `infill/planner.ts:374`, `ladder.ts:55`, `bentCutFabric.ts:968`), while `growth/heading.ts:21` exports
`RAD_PER_CDEG = 0.00017453292519943296` and `growth/legality.ts` inlines the same literal. They differ in the last bit.
**They are never unified across folders**: infill's three copies unify on planner's `PI / 18000` (R5/R6, 1.2.2), growth's
two on `heading.ts` (R10, 1.5.7). NUANCE: that bit reaches `dmath.cos`/`sin` arguments and could move a comparison at a
boundary; the plan does not test whether it would. Ruling needed only if the session wants one constant (§5 Q8). ORACLE:
n/a (no change). RISK: none as planned.

**1.0.7 Comments.** `lattice.ts` `framedCosts` (C-0289) and `routes.ts` `rerouteOutside` (C-0249) cite rules — keep.
`slice.ts` `GATE_REDRAWS` and the fwall rungs cite C-0201 (6)/C-0204 — keep. No round narration found in siting or
fixtures. `fixtures/flat.ts`: nothing to do (private `pt`, `hectares`).

### 1.1 `src/pipeline/` (R2, M0-x-02; R12, M0-x-04)

**1.1.1 `report.ts:199` `byName` ≡ kernel `compareKeys`** (`packages/kernel/src/arena/keys.ts:13`, exported through the
kernel index: `a < b ? -1 : a > b ? 1 : 0`). R2 deletes `byName` and sorts with `compareKeys`. EQUIVALENCE: the same
expression on the same strings; `Array.prototype.sort` with the same comparator gives the same order. NUANCE: none.
ORACLE: `runner.test.ts` 'carries what the stages write through the sink, in order, and the kernel's warnings by code',
'the generation report's schema'; `rows.test.ts` 'two runs of one plan give equal reports'; x-02 mutant P06 (name order)
killed; probe PA's JSON-byte-equal report. RISK: none.

**1.1.2 `report.ts`: `rows.find((r) => r.name === name)` three times** (`evaluate`, `neverEvaluated`, `unevaluated`'s
sibling). R2 hoists one private `rowOf(name)`. EQUIVALENCE: the same predicate on the same array. ORACLE: `rows.test.ts`
(9 tests), x-02 s2 mutants K13–K17 killed, K16 equivalent. RISK: none.

**1.1.3 Comments citing "Q32".** `report.ts:15, :305, :313` and `runner.ts:17, :121, :185, :358` cite "Q32, C-0316" and
`runner.ts:17` "docs/M0-FIX-QUEUE.md Q32, C-0316: the class behind Q15 and Q31". A queue row is history. Rewrite each to
the rule: "a declared stage-end row the stage never reported is a refusal `E_INVARIANT` (`row <name> declared but never
evaluated`), the stage rolled back whole, its line `pass false, count 0` (C-0316 (1)–(4); §5.3, §5.4)". The refusal
detail text itself stays verbatim (pinned by `rows.test.ts`; J263 Q6). `runner.ts:10–15` (the rollback protocol, C-0295,
N-55 (6)) cites rules — keep. ORACLE: none needed (comments).

**1.1.4 `base.ts:670` `[...out].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))` → `compareKeys`.** EQUIVALENCE: as 1.1.1.
ORACLE: `table.test.ts` ('registers exactly S1, S3, S4, S5, S6, S8 … §4.1's drawn order', 'under all 720 registration
orders'), `run.test.ts` digests. RISK: none.

**1.1.5 `base.ts:309` `ownedOuterRings` vs `fields/sources.ts:15` `ownedRings`: not a duplicate.** The bodies agree to the
last line, where one returns `faceRings(...)[0]` and the other every ring; the owner types differ (`Id` vs `string`).
Kept both (§4). A later pass could define the first by the second (`ownedRings(...).map((r) => r[0])`) across items; not
worth a cross-item dependency for one line.

**1.1.6 `GROUND` ×4 in source.** `base.ts:272` `const GROUND = GROUND_KEY` (`@plat/site`'s), `infill/stage.ts:21`,
`districts/stage.ts:82` (`{ layer: 'ground', part: 0 }`), `enceinte/water.ts:318` (the same, frozen, exported file-level).
The three literals may become imports of `GROUND_KEY` **once the implementer shows every reader (`k.plat(key)`,
`k.resolve(ref, key)`, `k.view(key, …)`, `pointLocate(key, …)`) keys by `layer`/`part` value, never by object identity**
(the implementer cites the kernel line that keys the arena map; this seat did not read it).
`water.ts`'s export stays (as `export const GROUND = GROUND_KEY` or an alias) because `waterRings(…, key = GROUND)` is
public through `enceinte/index.ts`. NUANCE: a frozen vs unfrozen object is observable only by a writer; none writes.
Ruling needed: none, but listed in §5 Q6 as the one equivalence that rests on a kernel reading. ORACLE: every stage test.
RISK: low.

**1.1.7 Per-module refusal helpers stay.** `registry.ts:171` `refuse(stage, why)`, `runner.ts:126` `notBuilt(milestone,
what)`, `base.ts:299` `refused(r)`, `infill/granularityBands.ts:35` and `fields/table.ts:60`, `fields/grid.ts:12`
`refuse(reason)` each carry their module's prefix and pinned texts (J270 (a)). Not touched.

### 1.2 `src/infill/` (R3, M0-b-01; R5, M0-b-02; R6, M0-b-03)

**1.2.1 `granularityBands.ts` (R3): nothing to unify.** Its `rowsOf` (:51, returns `BandRows<readonly number[]>`) and
`deepInterior.ts:71` `rowsOf` (returns `Record<string, number>`) share a name and a loop shape but not a result; the
second is M0-b-03's. Its `refuse` stays (1.1.7); its table readers (`metreRange`, `scale`) carry refusal texts pinned by
`granularityBands.test.ts` 'refusals' ×5 and `blockDepthRange.test.ts` 'refusals' ×2. The round is a comment pass (§2)
under `shipped.test.ts`'s constraint "the module's source holds no numeric literal but the design arithmetic's 0, 1 and
2" (comments are not literals; the test reads the source — the implementer re-runs it). ORACLE: `test/infill/bands/`
(4 files, 35 it), mutants K01–K42 (40 killed, K10 equivalent, K42 survived → N-1). RISK: none.

**1.2.2 `planner.ts` exports its step-7 primitives file-level (R5)** — `TOUCH_CM` (:595, `0.5`), `RAD_PER_CDEG` (:374,
`PI / 18000`), `M_TO_CM` (:179), `cornerScale` (:615), `arrivalDot2` (:778), `arrivesSquare` (:816) — and imports `PI`
from `../siting/geom.js` in place of its own literal (:373). `infill/index.ts` lists planner's exports explicitly
(`cutCells`, `DrawRecord`, `planCut`, `stopThreshold`, `workingFrame` and types), so nothing becomes public. EQUIVALENCE:
`PI` is the same literal `3.141592653589793`; the others gain an `export` keyword. NUANCE: `ladder.ts:48` already exports
a `TOUCH_CM = 0.5` ("as the planner's"); after R6 it is `export { TOUCH_CM } from './planner.js'` (`ladder.ts`'s export is
not in `infill/index.ts`, but `test/infill/fabric` may import it — the implementer greps; the value is the same either
way). `enceinte/plane.ts:10` `TOUCH_CM = LATTICE.attractCm` (26 cm) is **another quantity with the same name**, public
through `enceinte/index.ts`; it stays and its comment says which touch it is (1.3.7). ORACLE: `test/infill/planner/`
(10 files + `faces.ts`, 25 describe / 83 it), `determinism.test.ts`'s 200 renumber cases, `faceset.test.ts` over `SEEDS`;
b-02 mutants m01–m46 and c01–c12 (B1–B3 fixed: m46, m37, m43 killed). RISK: none.

**1.2.3 `sides.ts`: nothing to unify inside it; `insideFace` (:253) is the kept point-in-face test for 1.2.8.** Its vector
helpers (`dot`, `cross`, `sub`, `along`, `len`, `unit` with `DIR_SCALE`) are the planner's convention (scaled ratios) and
are already imported by `ladder.ts` and `bentCutFabric.ts`.

**1.2.4 `test/infill/planner/`: `SEEDS` declared in five files** (`determinism`, `faceset`, `fillet`, `start`, `tau` —
the grep count; the implementer reads each). Where the arrays are equal they move to `faces.ts` (the folder's fixture
module) as one export; where a file's seeds differ it keeps its own. Titles unchanged. ORACLE: the same files.

**1.2.5 `ladder.ts` mirrors `planner.ts`'s step-7 helpers (R6): three unify, two stay.**
* `arrivalDot2` (`ladder.ts:88` via `cosCdeg`, `planner.ts:778`): EQUIVALENCE — `dmath.cos(lo * RAD_PER_CDEG)` with the same
  `RAD_PER_CDEG` double (both `PI / 18000`), `Math.max(a * a, b * b)`; bit-equal. Unify: ladder imports planner's.
* `arrivesSquare` (`ladder.ts:129`, `planner.ts:816`): the same four statements on `unit`/`dot` from `sides.ts`; bit-equal.
  Unify.
* `cornerScale` (`bentCutFabric.ts:1305`, `planner.ts:615`): the same loop; unify (1.2.9).
* **`spineHit` (`ladder.ts:101`, `planner.ts:786`) — KEPT APART.** Planner's divides with `ratio(cross(w, e), den,
  'length')` and refuses `|den| < 1`; ladder's divides with `div(n, d)` = `ratio(n * 2²⁰, d * 2²⁰, 'length')`, so a
  denominator in [2⁻²⁰, 1) passes in the ladder and is refused (no hit) in the planner. When both pass the quotients are
  bit-equal (scaling both operands by 2²⁰ is exact and IEEE division of the scaled pair rounds to the same double), so the
  two differ exactly on near-parallel rays with `|cross(dir, e)| < 1`. Planner's also returns `seg`. Each stays; the
  comments say why (§2). Ruling needed only to change one (§5 Q2: a behaviour change, hardening).
* `endOf` (`ladder.ts:120`, `planner.ts:807`): the same statements but each calls its own `spineHit` and the signatures
  differ (`EndInput` vs four arguments); stays with its `spineHit`.
* `slideEnd` (`ladder.ts:141`, `planner.ts:829`): the gap arithmetic is the same to the options loop; the kerb-point
  re-derivation differs (planner: `FaceSides`; ladder: the rings) — stays.
ORACLE: `test/infill/fabric/ladder.test.ts` ('a kerb end … 85–95°', 'a straight candidate extends an end to a spine
within 2 × its half-width + attractCm'), `portals.test.ts`, `sharedVertex.test.ts` (N-57 (1)(a) bend and antenna at seeds
7, 13, 20, 23, 39, 44), `planner/ends.test.ts` (12 tests), the two-district fixture; b-03 s4 mutants K01–K23 (16 killed,
7 survivors judged in N-23); b-02 mutants m37, c05–c08 killed. The integrated CITY seeds 1–7, 20, 23, 39, 44, fusion 1,
2, 11, 30 and the 1 100-task family hash `9c0f7288b693ecdf` (b-03 s4's census) are the before/after digests. RISK: low
for the three; none for the kept two.

**1.2.6 One monotone-chain hull: `ladder.ts:314` `hullOf` (orient2d) and `bentCutFabric.ts:339` `hullRing` (a plain
cross `cr`).** EQUIVALENCE: both sort by `(x, y)`, pop on `≤ 0`, and concatenate lower and upper less their last points.
The plain cross `(a.x − o.x)(b.y − o.y) − (a.y − o.y)(b.x − o.x)` on lattice points is exact: coordinates are within the
kernel's range (`BOX_RANGE = 16_777_216 = 2²⁴`), so each difference is below 2²⁵, each product below 2⁵⁰ and their
difference below 2⁵¹ < 2⁵³ — every intermediate is an integer a double holds exactly, and its sign equals `orient2d`'s.
So both hulls are the same point list. Unify: `ladder.ts` exports `hullOf` file-level; `bentCutFabric.ts` imports it
(the implementer diffs the two tails line by line first). NUANCE: none inside the range; the lattice admits nothing
outside it (`snap` refuses). ORACLE: `ladder.test.ts` 'the reflex pre-cut' ×2, `deep.test.ts`, `stage.test.ts`
('F-CUT: ≤ 6 kernel calls', 'two runs of one input give equal outputs and equal arenas'); mutants K37/K38 (antenna split /
reflex pre-cut off) are recorded survivors (N-4) — the before/after digests above are the proof. RISK: low.

**1.2.7 `bentCutFabric.ts:589` `insideRing(ring, p)` ≡ `sides.ts:253` `insideFace([ring], p)`.** EQUIVALENCE: the same
loop (`j` starts at `length − 1`, the same `ratio(p.y − a.y, b.y − a.y, 'length')` with the same `k.ok ? k.value : 0`
fallback, the same `p.x < x` test). Unify by import. NUANCE: neither is exact on the boundary (both say so); siting's
exact `insideRing` is **not** substituted (a different rule on the ring). ORACLE: `seeds.test.ts` (N-57 (3): 'every
recorded seed lies strictly inside one ring of kerb(its L1 face)', face 197 of fusion 30), `holes.test.ts`; s4 mutants
K18 killed, K19/K20 survivors (N-23). RISK: none.

**1.2.8 `bentCutFabric.ts:968` `RAD_PER_CDEG = 3.141592653589793 / 18000`, `ladder.ts:54–55` `PI`, `RAD_PER_CDEG`** →
planner's exports (the same double, 1.0.6). ORACLE: `portals.test.ts` 'each portal record names … the lane's bearing',
`continuationCdeg`'s tests in `ladder.test.ts` 'step 10' ×2. RISK: none.

**1.2.9 `bentCutFabric.ts:1305` `cornerScale` → planner's** (1.2.5). ORACLE: `strips.test.ts` 'no strip face is split or
cleared', `stage.test.ts` 'each lane's width reaches the kerb'. RISK: none.

**1.2.10 The comparator expression ×6 in infill** (`portals.ts:118`, `stage.ts` `runS8`'s sort, `bentCutFabric.ts:369,
:1408, :1417`, and the `waysAt` sort in `portals.ts`) → kernel `compareKeys`. EQUIVALENCE: 1.1.1. ORACLE: the report rows
(`seamPortalsRow.test.ts`), `registry.test.ts` 'S8 draws exactly …'. RISK: none.

**1.2.11 `bentCutFabric.ts:995` `generated(epoch)` ≡ `enceinte/water.ts:321`** (the same object literal; the result types
`Block['lifecycle']` and `Lifecycle` are both `@plat/model`'s). Not unified in this pass: an infill → enceinte import for
a one-line stamp is coupling for nothing, and the stamp belongs to the model (§5 Q5). Kept both (§4).

**1.2.12 `ladder.ts` `kerbLength` is a wrapper of `sides.ts` `lineLength`.** If it is private (it is not in
`infill/index.ts`'s ladder list), its callers call `lineLength`; if a test imports it by path, it stays as a one-line
delegation. ORACLE: `width.test.ts` 'each lane's L is its kerb-to-kerb length'. RISK: none.

**1.2.13 `width.ts:16` and `ladder.ts:51` `SCALE = 1_048_576` (2²⁰).** One definition, in whichever file the other already
imports (the implementer checks the import graph for a cycle; if both would need the other, `sides.ts`'s `DIR_SCALE`
(2²⁰) is the third spelling and the natural home). EQUIVALENCE: the same literal. RISK: none.

**1.2.14 Comments.** `deepInterior.ts:10–20` narrates N-27 ("twice the plot depth admitted 3 of NG's 597 deep blocks"),
the superseded factor 2 and "M0-c-07a's to re-fit (its hand-over)" — rewrite to the rule: the deep test is `DEEP_FACTOR`
× the band's plot depth (0.6; N-27; pinned by `deep.test.ts` 'pins the factor at 0.6, not the superseded 2'), the
`interior.json` cell is read for its shares and reach weights only. `portals.ts:6` "ladder.ts's mirror" — after R6, name
the one kept helper set and the two kept differences (1.2.5). `bentCutFabric.ts`'s 16 and `portals.ts`'s 6 N-citations
(N-43, N-44, N-45, N-51, N-52, N-57, C-0288, C-0298, C-0329): keep every citation whose sentence states the rule; strip
"before this round", "the S4 fix", "(1)(a)'s change" phrasing. `stage.ts`: `SEAM_PORTAL_ROW` (C-0298, C-0316) — keep.
Q39 (S8's batches bypass the runner's batch door) is **not** a comment matter: §5 Q4.

### 1.3 `src/enceinte/` (R8, M0-c-02; line numbers provisional — c-02 s4 in flight)

**1.3.1 `plane.ts:84` `segmentsCross` ≡ `siting/geom.ts:96` `segmentsMeet`.** EQUIVALENCE: the same four `Math.sign(
orient2d(…))`, the same `o1 !== o2 && o3 !== o4` test, the same `on` closure in the same four clauses. R8 makes
`segmentsCross` `export { segmentsMeet as segmentsCross } from '../siting/geom.js'` (the name is imported by
`test/enceinte`? — the grep shows the tests import `ccw`, `lat`, `openRing`, `clipOutside` from `plane.ts`, not
`segmentsCross`; the alias keeps it either way). NUANCE: none. ORACLE: `test/enceinte` (12 files, 38 describe / 103 it;
fixtures `ep20-496296019.json`, `relief60-s9-stage2.json`); c-02 mutants M34 (self-touch: the adjacent fold-back clause,
a recorded survivor), M06/M07 (smoothing guards), M09/M10 (simplify obstacles) killed; s1 mutants K01–K26. RISK: none.

**1.3.2 `wet.ts:128` `segD2(p, a, b)` → siting `distToSegment2`.** EQUIVALENCE: the same `t` (`quot(…, 'area', …)`
clamped to [0, 1]), the same `ex, ey`, the same `ex² + ey²`. The guards differ in spelling (`l2 < 1 ? 0` here, `l2 === 0
? 0` in siting, `l2 > 0` in districts): on lattice endpoints `l2` is 0 or ≥ 1, so the three agree; the `quot` message
texts ('wet foot', 'segment foot', 'a segment projection') differ only below the `area` floor 1, which the guards make
unreachable. NUANCE: `wet.ts`'s `p` is a pull vertex (a double), its `a, b` ring vertices (lattice) — the guard reads
`l2` of `a, b` only. ORACLE: `sides.test.ts`, `water.test.ts`, `chord.test.ts`; s1 mutants K15 (tolerance at 20 cm inside
`overRing`), K21, K22 killed; the relief-60 CITY seed 9 stage-2 replay (`fixtures/relief60-s9-stage2.json`, pull moved
151, line 224, departure 3 975.16 cm) byte-identical. RISK: none.

**1.3.3 `commit.ts` `commitS3Slice`'s tail (:184–208) is `growth/boundary.ts` `traceStage1`'s (:288–304), statement for
statement** — the `half` width from `ways.widthM.<rung>`, the per-gate `WAY_SPAN_NODES` route window, the on-to-the-frame
extension through `unitOf`/`toFrame`/`lat`, the water stops from `waterRings`, `layStrips` with `{ key, stops, frame }`,
the warnings concatenation. R8 hoists it as a file-level export of `commit.ts`, `traceWithStrips(slice, k, arena, water,
costField, plaza)` returning `KernelResult<{ enceinte, gates, waterGates, traced, strips }>` with `[...traced.warnings,
...strips.warnings]`, and `commitS3Slice` delegates to it after `commitOuterRing`/`commitS3Batch`; R11 then replaces
`traceStage1`'s copy by one call (1.5.4). EQUIVALENCE: the same statements in the same order on the same inputs; the
`baseEnceinte.trace(...)` call with the same policy `{ waterfront: 'open', placement: 'aroundAll' }`, `siteContext(site)`
and `{ key, costField? }` options; the early `err(...)` returns carry the same code and detail. NUANCE: `commitS3Slice`
returns `{ ok: true, value: { margin, border, plaza, …tail }, warnings }` and `traceStage1` `ok({ …tail }, warnings)` —
each caller keeps its own shape and the `warnings` of the batches before the tail. `enceinte/index.ts` is untouched.
ORACLE: `commit.test.ts`, `strips.test.ts`, `corridor.test.ts`; growth `stage1.test.ts` (`commitS3ThenStage1`),
`growth.test.ts`; c-02 probes PB (small seeds 1–30, worst departure 2 038 cm, inner strips = N), PB2 (CITY 1–6), PF
(river 4 × 3); c-04's 16 flat CITY seeds `arenaPrint`; the base fixtures' roots. RISK: low (a pure hoist); the round
waits for c-02 s4's verdict so the hoist is of the settled text.

**1.3.4 `strips.ts:175` `stopsFromArena` and `growth/boundary.ts:710` `stageStops` — NOT planned.** `stageStops` repeats
`stopsFromArena`'s main-gate and water-gate stops and adds a water stop per remaining ring (C-0292). Unifying them means
`layStrips` merges read and given stops — a change to `LayStripsOptions.stops`' contract that docs/M0-FIX-QUEUE.md Q27
already classes as a hardening dedupe. §5 Q3. Kept both (§4).

**1.3.5 `plane.ts` keeps its small vector library** (`d2`, `dist`, `unitOf`, `area2`, `ccw`, `footOn`, `segD2` of two
segments, `crossParams` with `|den| < 1 → null`). `footOn` returns the foot and `t` (siting's `distToSegment` does not);
`segD2` (segment–segment) has no twin (`growth/legality.ts` `segSegD2` is `crossParams`-based and differs — kept);
`crossParams`'s null rule differs from `districts/perimeter.ts` `crossing`'s `den === 0` — kept (1.6.6). `unitOf` is the
kept unit vector for `backbone/stage.ts` (1.4.6).

**1.3.6 `water.ts:318` `GROUND`** — see 1.1.6; the export stays.

**1.3.7 `plane.ts:10` `TOUCH_CM = LATTICE.attractCm`** — a public name (`enceinte/index.ts:14`); its comment says it is
the insertion's attraction (26 cm), not the planner's half-unit `TOUCH_CM` (1.2.2).

**1.3.8 Comments narrating rounds — the largest rewrite in the package.** `wet.ts:2` "(… M0-c-02 session round s1)",
`:8` "since session round s2 the strategy hands in …"; `water.ts:13` "(N-54 (1), strict; M0-c-02 session round s2)",
`:23` "(session round s4, docs/M0-FIX-QUEUE.md Q40, J264; C-0324)", `:383` "(N-54 (1) Q6)"; `trace.ts:17` "(N-54 (1)
residual, session round s2, C-0300)", `:22` "(`water.ts`, C-0324; Q40, J264)"; `strips.ts:19` "— N-56 (3) Q22, C-0311)",
`:22` "(N-54 (1) Q6: the wall × frame cell's law …)", `:52` "(C-0311; N-56 (3) Q22: the rejected vertices of the refused
seeds stood 6 – 20 cm inside)", `:334` "(N-54 (1) Q6)"; `plane.ts:357` "(N-54 (1) Q6: EP-20 seed 496296019 kept the whole
glacis ring and committed it 125 cm beyond the frame)". Each becomes the rule with its C-row and the ruling's substance:
"the trace crosses water only at a water gate; every wall side is proved dry before the pull and again on the committed
edges (N-54 (1); C-0282, C-0300)"; "a water crossing is one chord between its two bank pins, settled onto a shore contact
within `attractCm` (C-0300 (1))"; "the strategy hands in its band of the committed boundary (C-0324)"; "a strip face
holding a vertex deeper than `CORRIDOR_SLACK_CM` inside a corridor is refused `E_INVARIANT` (C-0311)"; "every setback
vertex lies inside the frame or on its border, before the batch and inside it (C-0282 (7))". The seed 496296019 is named
only as the registered fixture `test/enceinte/fixtures/ep20-496296019.json`. `pull.ts`'s 5 N-citations state rules —
keep. **The wording of c-02 s4's own comments (`water.ts:23`, `trace.ts:22`) is rewritten only after its check lands.**

**1.3.9 `test/enceinte/`:** `SEEDS` ×3, `WALL` ×3, `GATES` ×2, `depthOf` ×2, `ridge` ×2 re-declared across files — equal
bodies move to `support.ts`; the support's own `segDist`, `ringDist`, `maxDeparture`, `insideRing`, `area2`, `densify`
stay (independent oracles). Titles unchanged.

### 1.4 `src/backbone/` (R7, M0-c-03)

**1.4.1 `junctions.ts:27–28` `PI`, `CDEG_PER_RAD`** → `siting/geom.ts`'s (after R1 exports `CDEG_PER_RAD`). EQUIVALENCE:
the same two literals. ORACLE: `junctions.test.ts`, `backbone.test.ts` 'junctions — none closer than 8 m unmerged, every
crossing angle at least 30°'; mutants X07, X08, X36, N02/N14/N15 (`THROUGH_MIN_CDEG`) killed. RISK: none.

**1.4.2 `route.ts:24` `COS30`** → `siting/lattice.ts`'s export. The same literal `0.8660254037844387`. ORACLE:
`route.test.ts` (`approachUsable`, the deck cone), mutant X38 (60° deck cone) killed. RISK: none.

**1.4.3 `route.ts:105` `class WorkLimitReached` and `siting/routes.ts:32`** — if the two class bodies are identical (the
implementer diffs them: a message, a field), `route.ts` imports siting's. EQUIVALENCE: each module throws and catches its
own instance inside one function; after the import the `instanceof` test still matches. NUANCE: if a body differs
(another message or field), both stay. ORACLE: `route.test.ts` 'F-WORK', `backbone.test.ts`; mutant X22 (the work limit
off by one) killed; siting `gates.test.ts` 'F-WORK (C-0085) … reported work_cut with the count'. RISK: none.

**1.4.4 `graph.ts:256` `footDist` ≡ siting `distToSegment`.** EQUIVALENCE: the same `t` through `quot(…, 'area', …)`
clamped, the same `fx, fy`, the same `Math.sqrt`; the guard `l2 > 0` vs `len2 === 0` agree on lattice endpoints; the
`quot` text ('foot' vs 'segment foot') is unreachable (floor 1). ORACLE: `graph.test.ts` (the 8 m merge, splits at pins),
mutants X01, X02, X03, X35 killed. RISK: none.

**1.4.5 `graph.ts:273` `orient` (plain doubles) and `:277` `meets`** ≡ `Math.sign(orient2d(…))` and `segmentsMeet` on
lattice points. EQUIVALENCE: the exactness argument of 1.2.6 (every product below 2⁵⁰, every difference an exact
integer), so `orient`'s sign is `orient2d`'s sign and `meets`' five clauses are `segmentsMeet`'s on `(s[0], s[1])`,
`(s[2], s[3])`. R7 imports `segmentsMeet` with a two-line `Seg` adapter. NUANCE: `graph.ts`'s inputs are `LatticePoint`s
and `Seg` tuples of lattice coordinates (the implementer confirms no double reaches `meets`). ORACLE: `graph.test.ts`,
`backbone.test.ts` '§13.2 — no two spines run closer than their class separation' (seeds 1 and 3 catch the parallel fold:
mutant X23), X25 (no loop cut) killed; CITY seeds 1–12 and `smallSite` 1–6 records byte-identical (the c-03 probes'
digests). RISK: low.

**1.4.6 `stage.ts:289` `unit` ≡ `enceinte/plane.ts:32` `unitOf`.** EQUIVALENCE: `l < 1 → null`, then `quot(v.x, l,
'length', …)`; the `quot` text ('last edge' vs 'unit') is unreachable because `l ≥ 1` is the floor. R7 imports `unitOf`
by path (an existing file-level export; `plane.ts` untouched). ORACLE: `stage.test.ts`, `water.test.ts`
(`partMeetsWater`, `simpleCourse`). RISK: none.

**1.4.7 `stage.ts:68` `heightsOf(site, points)` is exported file-level for R11** (`growth/mainRoads.ts:298`'s is the
same statements on `slice.site`, `slice.lattice.points`). `backbone/index.ts` lists names explicitly — not public.
`route.ts:265` `dist` is `plane.ts` `dist` (`Math.sqrt` of the squared difference) — import by path if the bodies agree.
`commit.ts:465` comparator → `compareKeys`. ORACLE: `backbone.test.ts` 'width_knot rows …', 'the Way and Junction records
(§2.4)'; mutants N07 family (the class run's width) killed; `commit.test.ts`. RISK: none.

**1.4.8 Comments.** The backbone's comments cite C-0236, C-0250, C-0297 and §4.3 as rules; no round narration was found.
`route.ts` `routeLadder` (:291–366, C-0297's band rule) — keep; `stage.ts:204` (`report.offGate`, c-03 note 1) — keep.

### 1.5 `src/growth/` (R11, M0-c-04; R10, M0-c-05)

**1.5.0 The barrel rule.** `growth/index.ts` does `export *` from every growth file: a new file-level export here is a
new public name (and two files exporting one name would be TS2308). So no growth round adds an export; every unification
below imports an existing public growth export or a helper from outside growth. Ruling needed: §5 Q1 confirms.

**1.5.1 `mainRoads.ts:1031` `idNumber` (private) ≡ `proposals.ts:268` `idNumber` (public).** EQUIVALENCE: the same
three statements. R11 deletes the private copy and imports `./proposals.js`'s; `proposals.ts` is untouched. ORACLE:
`spawn.test.ts`, `growth.test.ts`; c-04 mutants M20 (`growthStage k − 1`), M19 killed. RISK: none.

**1.5.2 `mainRoads.ts:298` `heightsOf(slice)` → `backbone/stage.ts` `heightsOf(slice.site, slice.lattice.points)`**
(after R7). EQUIVALENCE: the same `terrainSampler(site.terrain, slopeQueryM × 100)` and the same loop. ORACLE:
`growth.test.ts`, `boundary.test.ts` (`unionField`, `landOf`), mutant M02 (spacing floor; probe seeds 1–10), M13 killed;
the 16-seed `arenaPrint`. RISK: none.

**1.5.3 `mainRoads.ts:422` `rimAtBearing` → siting's; `:514` `boxOf` → `siting/lattice.ts`'s** (1.0.4, 1.0.5).

**1.5.4 `boundary.ts:288–304` `traceStage1`'s tail → `enceinte/commit.ts` `traceWithStrips`** (1.3.3; after R8).
`commitS3ThenStage1` already composes `commitS3Batch` + `traceStage1`; it is `commitS3Slice` with `outerRing: 'present'`
and stays as the growth-side entry (public; `stage1.test.ts` imports it). ORACLE: `stage1.test.ts`, `growth.test.ts`,
`bar-1…5.test.ts` (the §13.2 here-bar over seeds 1–20 in five chunks), c-04 mutants B07, B08, B09, B11 (`squareGates`),
B12, B14 killed; probes CITY seeds 1–12 (`N 8 c 7` …). RISK: low.

**1.5.5 `boundary.ts:838` `segD2` → siting `distToSegment2`** (1.3.2's equivalence). ORACLE: `boundary.test.ts`
'insertOnOutline', `span.test.ts` (9 pins), s1 mutants X02–X07, X12 killed. RISK: none.

**1.5.6 `boundary.ts:60` `export const HA_CM2`** is public (the barrel; `spawn.test.ts`, `boundary.test.ts` import it)
and stays public; after R1 it reads `export { HA_CM2 } from '../siting/geom.js'` (the same name, the same value). ORACLE:
the same two tests, `spawn.test.ts` 'N_k on the added land' (M01). RISK: none.

**1.5.7 `legality.ts` `crossingMatrix` inlines `0.00017453292519943296`** — `heading.ts:21` exports the same literal as
`RAD_PER_CDEG` (public, same item). R10 imports it. EQUIVALENCE: the identical literal (not `PI / 18000`, 1.0.6). ORACLE:
`legality.test.ts` (the 30° rule, the deflection limit: mutants R08/R09, S11/S12, M15, U01–U04 killed), the four bar
chunks, P2's 30-run digest (plain / 900 ha / small × seeds 1–10). RISK: none.

**1.5.8 Comparators** `proposals.ts:585, :860, :919`, `mainRoads.ts:1024`, `prune.ts:63` `byId` (`Id` is a branded
string) → `compareKeys`. EQUIVALENCE: 1.1.1. ORACLE: `city.test.ts` 'the growth stage keys its ways in acceptance order',
`prune.test.ts`, mutants M25 (lineage index + 1), M31 killed. RISK: none.

**1.5.9 Comments.** `prune.ts:164` "no longer provisional" → "the street ends at the cut and its record is final".
`proposals.ts:11` (c-05 note N-8: the header says "± the branch jitter" where the code draws the branch angle once per
seed) — the implementer reads `growthStreams`'s draw and writes what the code does. `boundary.ts`'s 5 N-citations
(N-45, N-54 (3), N-55, C-0285, C-0292, C-0303) and `mainRoads.ts`'s cite rules — keep; strip "F-1", "round s2"
phrasing where it appears (`boundary.ts:704` "(F-1; C-0292)" names a check's finding id — the rule is C-0292's).

**1.5.10 Not duplicates, kept.** `legality.ts` `segSegD2` (`crossParams`-based) vs `plane.ts` `segD2`; `capacity.ts:279`
`clamp01` vs `fields/pass1.ts:123` (one expression, two items); `mainRoads.ts` `nodesNear`/`nodeGrid` bucket grids vs
`siting/lattice.ts` `near` (cell sizes and key forms differ; a probe would be needed to show the same neighbour sets —
not in this pass); `stageStops` (1.3.4).

### 1.6 `src/districts/` (R9, M0-e-04)

**1.6.1 `perimeter.ts:226` `segDist2(px, py, ax, ay, bx, by)` and `seeds.ts:39` `segDist2(p, a, b)` → siting
`distToSegment2`.** EQUIVALENCE: the same `t = quot(…, 'area', …)` clamped by `Math.max(0, Math.min(1, t))` (equal to the
if-chain: a `−0` from `Math.max(0, −0)` adds to `ax` as `+0` does), the same `ex² + ey²`; the `l2 > 0` guard agrees on
lattice endpoints (1.3.2). `perimeter.ts`'s six-number form becomes a call with two literal objects (the implementer
checks the hot loop in `isSumRing`'s grid search for a measurable cost; if it matters, keep the six-number form as a
one-line wrapper). ORACLE: `perimeter.test.ts` (the check's own cases; stars 2, 3, 7; the frame clip), `seeds.test.ts`;
mutants N04, N04b, N13 (the grid search widened by d + tol), M34 killed/survived as recorded; e-04 s2's K06 (near-
collinear merged) killed by 11 tests; 40 flat outlines and 60 jittered rings (probes P1c, P1e). RISK: low.

**1.6.2 `perimeter.ts:342` `meet` ≡ `segmentsMeet`** (1.3.1's body, `||`-chained). `meet` is a file-level export that
`districts/index.ts` does not list; it becomes `export { segmentsMeet as meet } from '../siting/geom.js'`. ORACLE:
`perimeter.test.ts`, mutant N03 (`isSumRing` without the crossing test `meet`) — a recorded survivor (note 12); probe
P5's enclosure case. RISK: none.

**1.6.3 `quarters.ts:48` `HA_CM2` and `stage.ts`'s `100_000_000` literal → siting `HA_CM2`.** EQUIVALENCE: the same
integer. ORACLE: `quarters.test.ts`, `law.test.ts` 'N_d = round(…)' (M22), `stage.test.ts` 'N_d seeds in all' (M23).
RISK: none.

**1.6.4 `stage.ts:358, :363` `typingCells(s6Table())` twice** → one `const typing = typingCells(s6Table())`.
EQUIVALENCE: `typingCells` (`table.ts:47`) builds a fresh `{ kinds, mixedUseFloor, demandWeight, randomWeight }` from
the parsed table on each call; `typeDistricts` reads it and `familyOf` maps its `kinds` — the implementer confirms neither
mutates the object (if `typeDistricts` sorted `kinds` in place, the second read would have seen the unsorted list and
both must stay). ORACLE: `typing.test.ts`, `stage.test.ts` 'the typing replay', mutants M30, M31, M32, M33 (B-2's typing
on `district.seed`), N23 killed. RISK: low.

**1.6.5 `faces.ts:365` `polsbyPopper`'s inline `3.141592653589793` → siting `PI`; `typing.ts:51`, `quarters.ts:133`
comparators → `compareKeys`.** ORACLE: `grow.test.ts` '… compactness … (L-shaped corridor)' (M14), `quarters.test.ts`
'ties by id' (M29). RISK: none.

**1.6.6 Kept apart.** `perimeter.ts` `crossing` (`den === 0 → null`) and `plane.ts` `crossParams` (`|den| < 1 → null`)
differ on a near-parallel pair; `seeds.ts:116` `d2` is one expression; `stage.ts:82` `GROUND` → 1.1.6.

**1.6.7 Comments.** `perimeter.ts` `mergeCollinear` cites N-56 (2) and C-0305 (2) as the rule ("merges the boundary it is
given … one pass against the original neighbours") — keep the rule, drop any "the round's own cause" phrasing (C-0305's
text, not the code's). `faces.ts` `isS1LandOwner`/`s6Takes` (N-51, C-0265) — keep. `seeds.ts` `LLOYD_ROUNDS`,
`perimeter.ts` `UNLOOP_WINDOW` in code: e-04's KI note 3 — not a comment matter.

**1.6.8 `test/districts/`:** `graphOf` ×3, `RUNS` ×3, `HA` ×2, `SEEDS` ×2, `cell` ×2, `kernel` ×2, `run` ×2 across files —
equal bodies move to `support.ts` (761 lines already; the implementer keeps it one module). Oracles (`area2Of`,
`insidePoly`, `ringDist`, `hullArea`) stay. Titles unchanged.

### 1.7 `src/fields/` (R4, M0-e-05)

**1.7.1 `pass1.ts:60` `PI` → siting `PI`; `:589` comparator → `compareKeys`.** EQUIVALENCE: the same literal; 1.1.1.
ORACLE: `pass1.test.ts`, `relief.test.ts`, `work.test.ts` (the `fieldsCoarsen` switch: mutants K23, C01–C07 killed, C05 →
N-11), `city.test.ts`; `fieldsDigest` on the wet site (P3, P4); the base `run.test.ts` 'the fields record equals
fieldsPass1 recomputed …'. RISK: none.

**1.7.2 Kept.** `table.ts:60`, `grid.ts:12` `refuse` (per-module, J270 (a)); `clamp01` (1.5.10); `heightsOf` (:277, a
grid sampler, not 1.4.7's); `sources.ts:15` `ownedRings` (1.1.5). `test/fields/` `CELLS` ×5, `all` ×2 → `support.ts`
where equal; `TABLES`, `terrainOf`, `insideRings` stay.

**1.7.3 Comments.** The fields' headers cite C-0255 and §4.5 as rules; no narration found. A comment pass confirms.

---

## 2. Comment rewrite plan (per file)

The rule for every file: a comment describes the design as it stands and cites the C-row or N-ruling whose *substance*
it states ("N-54 (1): every wall side is proved dry"); it never narrates a round ("session round s2", "the S4 fix",
"before this round", "retired", "no longer"), never cites a queue row ("Q32", "Q40", "Q22", "Q6") or a check's finding
id ("F-1", "B-2"), and never pastes a seed's diagnosis ("committed it 125 cm beyond the frame") — a seed is named only as
the registered fixture that pins it. Message texts the tests pin keep their ruling ids verbatim (J263 Q6). The rewrite
touches comments only; no round changes a describe/it title.

| File | Lines (today) | What is wrong | Rewrite to |
|---|---|---|---|
| `pipeline/runner.ts` | 17, 121, 185, 358 | "Q32", "docs/M0-FIX-QUEUE.md Q32 … the class behind Q15 and Q31" | the stage-end guard's rule, C-0316 (1)–(4), §5.3/§5.4 (1.1.3) |
| `pipeline/report.ts` | 15, 305, 313 | "Q32" | as above |
| `pipeline/base.ts` | header, `registerBase`, the S5/S6/S8 adapters | cites C-0264, C-0267 as rules — keep; any "(fix)" phrasing goes | — |
| `enceinte/wet.ts` | 2, 8 | "M0-c-02 session round s1", "since session round s2" | the dry-side rule (N-54 (1), C-0282, C-0300) (1.3.8) |
| `enceinte/water.ts` | 13, 23, 383 | "session round s2", "session round s4, Q40, J264", "Q6" | the one-chord rule (C-0300 (1)), the band hand-in (C-0324), the shore-stretch rule (C-0282 (7)); **:23 only after c-02 s4's check lands** |
| `enceinte/trace.ts` | 17, 22 | "residual, session round s2", "Q40, J264" | the strict committed-edge proof (C-0300), the band (C-0324) |
| `enceinte/strips.ts` | 19, 22, 52, 334 | "Q22", "Q6", "the rejected vertices of the refused seeds stood 6 – 20 cm inside" | the corridor-depth refusal (C-0311), the frame proof (C-0282 (7)) |
| `enceinte/plane.ts` | 357; 10 | "EP-20 seed 496296019 kept the whole glacis ring …"; `TOUCH_CM` unqualified | the clip rule, the fixture `test/enceinte/fixtures/ep20-496296019.json`; "the insertion's attraction, not the planner's half-unit" |
| `infill/deepInterior.ts` | 10–20 | N-27's NG counts, "superseded 2", "M0-c-07a's to re-fit (its hand-over)" | the deep rule: `DEEP_FACTOR` × plot depth, the cell read for shares and reaches (1.2.14) |
| `infill/portals.ts` | 6 | "ladder.ts's mirror" | the kept helpers and the two kept differences (1.2.5) |
| `infill/bentCutFabric.ts` | the 16 N-citations; `insideRing`, `hullRing`, `cornerScale` headers (removed with the helpers) | round phrasing around N-52 (4), N-57 | the rules (C-0288, C-0298, C-0329) |
| `infill/ladder.ts` | 48, 54–55, 101 | "as the planner's" (now imported); `spineHit`'s header | "the ladder's `spineHit` admits denominators the planner's refuses (2²⁰-scaled `div`); both stay by design" |
| `infill/planner.ts` | 373–374, 595, 778–845 | — | the exported primitives' headers say they are the one definition infill reads |
| `growth/prune.ts` | 164 | "no longer provisional" | "the street ends at the cut and its record is final" |
| `growth/proposals.ts` | 11 | "± the branch jitter" (c-05 N-8) | what `growthStreams` draws |
| `growth/boundary.ts` | 704, 288 | "(F-1; C-0292)", the duplicated block's comment | "(C-0292)"; the call to `traceWithStrips` |
| `growth/mainRoads.ts` | 422, 514, 298, 1031 | headers of the removed helpers | — |
| `backbone/junctions.ts`, `route.ts`, `graph.ts`, `stage.ts` | 27–28, 24, 105, 256–292, 68, 289 | headers of the removed helpers | — |
| `districts/perimeter.ts`, `seeds.ts`, `quarters.ts`, `stage.ts`, `faces.ts` | 226, 342, 39, 48, 358–363, 365 | as above; `mergeCollinear`'s "the round's own cause" if present | the rule (C-0305 (2)) |
| `siting/routes.ts`, `levelset.ts` | the hoisted helpers | — | one header each |
| `fields/pass1.ts` | 60, 589 | — | — |

Files with no comment change: `infill/granularityBands.ts` (R3 reads it whole and confirms), `infill/width.ts`,
`infill/stage.ts`, `backbone/classify.ts`, `backbone/smooth.ts`, `backbone/commit.ts`, `growth/heading.ts`,
`growth/legality.ts`, `growth/capacity.ts`, `districts/law.ts`, `districts/typing.ts`, `districts/grow.ts`,
`districts/seams.ts`, `fields/*` but `pass1.ts`, `siting/*` but the two above, `fixtures/flat.ts`, every `types.ts`,
every `index.ts`.

---

## 3. Test consolidation plan (per test folder)

The oracles are independent of the code and stay so: no test support imports a `src/` geometry helper it is checking
(`backbone/support.ts` `segDist`/`insideRing`/`segsMeet`, `enceinte/support.ts` `segDist`/`ringDist`/`insideRing`/`area2`,
`growth/s5ab/support.ts` `segDist`/`ringDist`/`insideRing`/`cross`, `growth/s5cd/support.ts` `segDist`/`properCross`/
`insideRing`, `districts/support.ts` `area2Of`/`insidePoly`/`ringDist`, `fields/support.ts` `insideRings` are the test
side's own and are **not** replaced by `siting/geom.ts`'s). Duplicated test support is unified only inside one item's
folder. **No describe or it title changes; no test file is renamed, split or merged in this plan**, so no old → new map
(J263 Q8) is needed; a seat that nevertheless renames appends the map to `checks/<id>-notes.md`. Titles that narrate a
round ("(before this round: …)" in `sharedVertex.test.ts:185, :311`) stay verbatim — a title is an oracle's name.
`test/scaffold/smoke.test.ts` is the scaffold's: read only.

| Folder (round) | Files · describe · it | What the round may do | What stays |
|---|---|---|---|
| `test/siting/` (R1) | 8 · 17 · 73 (+ `support.ts` 34 lines) | nothing: no duplicate found | `SEEDS`, `sliceOf`, `smallSite`, `P`, `vertexIndex` |
| `test/pipeline/core/` (R2) | 5 · 17 · 73 (+ `support.ts` 332) | nothing: one support module already | `bits`, `contentPrint`, `drawn`, `liveFaces` |
| `test/infill/bands/` (R3) | 4 · 12 · 35 (+ `support.ts` 76) | nothing | `DESIGN_ROWS`, `FIXTURE_*`, `near` |
| `test/fields/` (R4) | 8 · 16 · 50 (+ `support.ts` 182) | `CELLS` ×5, `all` ×2 — equal bodies into `support.ts` | `TABLES`, `fieldTown`, `fieldCity`, `insideRings` |
| `test/infill/planner/` (R5) | 10 · 25 · 83 (+ `support.ts` 90, `faces.ts` 227) | `SEEDS` ×5 — equal arrays into `faces.ts` | `FACES`, `checkGeometry`, `checkArc`, `farDirAt` |
| `test/infill/fabric/` (R6) | 12 · 34 · 94 (+ `support.ts` 280) | `CELLS` ×4, `P` ×3, `SEED` ×2, `arenaWays` ×2 — equal bodies into `support.ts` (`P` is already there) | `fixture`, `twoDistricts`, `runFixture`, `kerbNow` |
| `test/backbone/` (R7) | 11 · 22 · 61 (+ `support.ts` 338) | `FAR` ×3, `T` ×3, `route` ×3, `CACHE`/`SITE`/`key`/`nearest` ×2 — equal bodies into `support.ts` | `runSite`, `cityRun`, `handBuildRiver`, `wayLine` |
| `test/enceinte/` (R8) | 12 · 38 · 103 (+ `support.ts` 325, 2 fixtures) | `SEEDS` ×3, `WALL` ×3, `GATES` ×2, `depthOf` ×2, `ridge` ×2 — as above; **after c-02 s4 lands** | `commitSite`, `handBuildWater`, `RIVER`, `riverCommitted`, the two JSON fixtures byte-identical |
| `test/districts/` (R9) | 12 · 27 · 94 (+ `support.ts` 761) | `graphOf` ×3, `RUNS` ×3, `HA`/`SEEDS`/`cell`/`kernel`/`run` ×2 — as above | `town`, `cityRun`, `growthRun`, `gridArena`, `rectArena` |
| `test/growth/s5cd/` (R10) | 6 · 25 · 87 (+ `support.ts` 257) | `tables` ×2 | `handCase`, `bentArterial`, `fixtureGrown`, `SMALL` |
| `test/growth/s5ab/` (R11) | 11 · 11 · 41 (+ `support.ts` 175, `bar.ts` 34, `checks.ts` 219) | nothing: `bar-1…5.test.ts` chunk the here-bar's 20 seeds by design (the budget) and stay five files | `baseRun`, `grow`, `cityGrown`, `violations`, `recountC` |
| `test/pipeline/base/` (R12) | 3 · 21 · 33 | nothing | — |

Cross-folder: seven supports declare `GROUND`, seven `P`, three `kernelFor`; `backbone/support.ts` and
`enceinte/support.ts` share `edgesOf`/`edgesWith`/`verticesWith`/`riverRing`; `s5ab` and `s5cd` share `roleEdges`,
`segDist`, `insideRing`. No item owns a shared `test/support/`; §5 Q7.

Vitest projects and the item ids' NEAR/RELATED selections are unchanged by every round (no file moves).

---

## 4. Not touched, and why

* **Every folder `index.ts`** (J263 Q1): no name added, removed or renamed; `growth/index.ts`'s `export *` lines stay as
  they are (1.5.0).
* **`spineHit`, `endOf`, `slideEnd` in `ladder.ts` and `planner.ts`** (1.2.5): the ladder's 2²⁰-scaled division admits
  near-parallel rays the planner refuses; unifying either way is a behaviour change (§5 Q2).
* **`stageStops` / `stopsFromArena`** (1.3.4): Q27's hardening dedupe (a `layStrips` contract change).
* **`ownedOuterRings` / `ownedRings`** (1.1.5), **`clamp01` ×2**, **`d2`**, **`generated` ×2** (1.2.11), **`dist` ×2**
  unless bit-identical: one-expression helpers across items; the coupling costs more than the line.
* **`crossParams` / `crossing`** (1.6.6), **`segD2` (plane) / `segSegD2` (legality)**: different null rules.
* **`nodesNear` / `nodeGrid` / `near` bucket grids** (1.5.10): equal neighbour sets not shown.
* **The two `RAD_PER_CDEG` doubles** (1.0.6): last-bit different; never swapped.
* **The exact `insideRing` (siting) vs the ratio `insideFace` (infill)**: different boundary rules.
* **Per-module `refuse`/`notBuilt`/`refused`** (J270 (a)).
* **Every table reader** (`metreRange`, `band`, `num`/`pair`/`optionOff`, `rowsOf` ×2, `finiteShare`): their refusal
  texts are pinned (`granularityBands.test.ts` 'refusals', `blockDepthRange.test.ts` 'refusals', `registry.test.ts` 'a
  record lacking a field refused E_INVARIANT'); one reader would change a message (J263 Q6).
* **`BUDGET_MS` ×5** (per stage, different values), **`WAY_SPAN_NODES`, `CORRIDOR_SLACK_CM`, `STRIP_WET_DEPTH_CM`,
  `SETTLE_ROUNDS`, `GRAZE_RATIO`, `LLOYD_ROUNDS`, `UNLOOP_WINDOW`**: each a design constant of its stage (the KI notes
  that want them in tables are hardening).
* **Test titles and test files** (§3); **`test/scaffold/`**; **the testkit harness folders** (`infill-fabric`,
  `growth-s5cd`, `districts`) and the kernel/model/site exports the package imports: read for context only.
* **The refusals noticed** — Q37 (c-04's corridor at a trace spike: three EP-01 seeds refuse the stage-2 strips), Q40
  (the base river fixture at seed 2 refuses S5 — c-02 s4's subject), KI-10 (river seeds 1, 2, 5, 6 at 900 ha): routed,
  never planned (J264, N-58).
* **Q39** (S8's batches bypass the runner's batch door, so `block-floor` reads count 0): a report under-count, hardening.

---

## 5. Open questions for the session

**Q1 (blocking for R10/R11's shape).** `growth/index.ts` is `export *`: may a growth round add a file-level export at
all? The plan assumes **no** — every growth unification imports an existing public growth name (`idNumber`,
`RAD_PER_CDEG`, `HA_CM2`) or a helper from `siting`/`backbone`/`enceinte` by path — so the public surface is unchanged.
If the session prefers growth to list its exports explicitly (as every other folder does), that is a separate
one-time round on `growth/index.ts` (M0-c-05's file) with a before/after of the exported name set, not this pass.

**Q2.** `spineHit`'s two floors (1.2.5): the planner refuses a ray whose cross product with a spine edge is below 1
(`ratio … 'length'`), the ladder admits down to 2⁻²⁰. Which is C-0222 (9)'s reach rule? Any unification changes which
near-parallel ends reach a spine — a hardening change with a seed sweep, not a consolidation. The plan keeps both and
says so in both headers.

**Q3.** Q27 (`stageStops` ↔ `stopsFromArena`): confirm it stays in the hardening queue and out of R8/R11, since the
dedupe changes `LayStripsOptions.stops`' contract (given stops replace read stops today).

**Q4.** Q39 (S8's batches go straight to `kernel.tx` with `expect: [BLOCK_FLOOR_ROW]`, bypassing the runner's batch
door; the report under-counts the row): hardening, as the queue says; R6 does not touch `BENT_CUT`'s batch path.

**Q5.** `generated(epoch)` (1.2.11): the lifecycle stamp is `@plat/model`'s shape and is spelt in `enceinte/water.ts`
and `infill/bentCutFabric.ts` (and likely in `@plat/site`). Should the model export one `generatedLifecycle(epoch)` (a
model-side addition, outside this package's rounds)? Until then both copies stay.

**Q6.** `GROUND` ×3 → `GROUND_KEY` (1.1.6) rests on the kernel keying arenas by `layer`/`part` value. The implementers
of R6, R8, R9 cite the kernel line; if any reader keys by object identity the finding is dropped. No ruling needed unless
the session wants the three literals left as they are regardless.

**Q7.** Seven test supports repeat `GROUND`/`P`/`kernelFor` and two pairs repeat edge/vertex readers (§3). A shared
`packages/layout/test/support/` has no owner in M0-work.json. Does the session want one (owned by M0-x-04 as the
package's composer, or by the scaffold), or do the per-folder supports stay (the plan's assumption)?

**Q8.** The two radians-per-centidegree doubles (1.0.6): leave both (the plan), or move one side to the other's value?
Moving either is a last-bit change on the arguments of `dmath.cos`/`sin` in the planner's arrival band, the ladder's
continuation angle, the junction angles and the crossing matrix — a hardening change with a seed sweep.

**Q9.** R8's timing: the enceinte round waits for `check/M0-c-02-close-s4`'s verdict. If that check FAILs and an s5
round follows, R8 waits again; if it lands with new comments of its own, the §2 rows for `water.ts:23` and `trace.ts:22`
are re-read against the landed text before R8 starts.

**Q10.** The unreachable `quot` message texts ('wet foot', 'foot', 'segment foot', 'a segment projection', 'unit', 'last
edge'): after unification the kept text is siting's. These RangeErrors fire only below the ratio floor, which the guards
make unreachable on lattice endpoints; the plan reads J263 Q6 (pinned message texts) as not covering an unreachable
text. Confirm.

**Q11.** The kernel plan's R1 makes `@plat/kernel`'s `src/num/exact.ts` the kernel's shared-predicate home (its
`segmentsTouch`, point-in-ring). `siting/geom.ts` is this package's. Should a later pass make `geom.ts` delegate to the
kernel's exports where the conventions coincide (lattice points, `orient2d` even–odd), or stay the package's own? Not in
this pass either way: the kernel's conventions (lattice vs doubled points, `onRing` rules) need their own equivalence
lists.

**Q12.** The mutant tables' survivors that are KI test gaps (c-02 N-11 – N-14, N-15 – N-18, N-22 – N-24; c-03 notes 9, 10,
14 – 16; c-04 N-11, N-13 – N-16; c-05 N-24 – N-25; e-04 notes 12 – 14, 16; x-02 notes 1 – 3, 9, 12; b-03 N-23) are pins the
hardening pass adds. Each consolidation round's closing check re-runs the item's **killed** mutants (the oracle) and may
note a survivor it meets; it adds no pin (J273). Confirm that reading.
