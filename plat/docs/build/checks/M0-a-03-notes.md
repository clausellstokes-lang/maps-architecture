# M0-a-03 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-a-03 (lane `check/M0-a-03-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Neither finding below is a
blocker: one is a hardening fixture and the other is an executed confirmation of an equivalence the fix round already
recorded. Each row names its handling and where it belongs. The verdict and its evidence are in `checks/M0-a-03.md`
(the closing round is at the top).

The first check's notes N-1 – N-4 stay in `checks/M0-a-03.md`. N-2 was taken up by C-0164 (5). N-1 is still the
session's to route: no table holds `index.gridCellM`, and the first caller of `attachIndex` needs a sourced value or a
choices row. The ids below continue that numbering.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-5 | **Only fixed fixtures cover off-line finer vertices, and they stop at one level.** The fuzz's random arenas are rectilinear on a 10 cm grid, so `splitPair` never places a vertex off its segment. The fix round's `OFFLINE` and `OFFLINE_BASE` hold one L2 vertex off one L1 run. The closing probe `CHAIN` goes further. Its L1 run is A (0, 1000) → B (2000, 1006). It carries S1 (1100, 1003) at L2, S2 (500, 1002) at L3 and S3 (800, 1002) at L4, and each of these lies within 0.71 cm of every coarser route through it, on both sides. A line runs from each of them to an L0 side, so each level from L1 to L4 reads the run on a different route. On the original code the probe agrees with both brute-force oracles (`oracleQuery` and the `pointLocate` oracle) in four index states: all static, all in the grid, after a stage-end rebuild, and mixed. Each pass makes 20 745 judgements over points and 3 × 2 cm boxes along the run, and own-child answers occur at L3 (360) and L4 (1 038). CONFIRMED (executed on a scratch mirror; "Tests 1 passed (1)"). The probe's source is `scratchpad/waves/a03close/probe-close.test.ts`. | Add `CHAIN` to `query.test.ts` and `pointlocate.test.ts` as a fixture beside `OFFLINE`. Or let `randomSpec` draw a share of edges that are not axis-aligned, so that the fuzz's `splitPair` places vertices off their segments. | M4 (test hardening), or earlier if an insertion item's fuzz (M0-a-04 / M0-a-05) starts building non-rectilinear arenas on an attached index |
| N-6 | **The 0.71 cm padding is equivalent for answers, now shown by execution.** Mutant K15 sets `HOT_PIXEL_CM = 0`. Only `items.test.ts`'s box-value test turns red ("1 failed \| 66 passed (67)", with the probe in the set). Every query, `pointLocate` and fuzz test stays green, including `OFFLINE`, `OFFLINE_BASE` (the run's box written before S stood on it) and the `CHAIN` probe. This confirms C-0164 (4)'s one-line equivalence note: a lattice point outside a lattice segment's bounding box is at least 1 cm from the segment. CONFIRMED (executed). | None. The padding stays as §3.3 states it, held by `items.test.ts`'s box values. This row is recorded so that a later checker does not report it again. | — |

## Round C1 — consolidation round R5 (lane `build/M0-a-03-consolidate-1`, flow flow-7, 2026-10-12)

The round applies X-1 – X-4, the index comment rule and the `test/index` row of
`plat/docs/build/consolidation/kernel-plan.md` (§1.5, §2, §3.4; J260, J263 Q1, Q7, Q8; J264 (5); J270 (a), (b)) as fix
round C1 of the item's consolidation lines, after R1 (`num/exact.ts`) and R4 (`arena/resolve.ts`, `arena/plat.ts`,
`test/arena/support.ts` exports). It changes no behaviour. Its choices row is C-0342.

### What changed, and the equivalence shown

| finding | change | equivalence |
|---|---|---|
| X-1 (a) | `query.ts`'s private `BOX_RANGE` deleted; `import { BOX_RANGE } from '../num/exact.js'`. | The same literal 16 777 216 (2²⁴); `checkBox`'s message text `a query box is four whole centimetres within ±2²⁴` unchanged. New pin in `query.test.ts` "stamps its answer …": the box at exactly ±2²⁴ answers and −2²⁴ − 1 is refused (before this round only +2²⁴ + 1 was pinned), green on the pre-round sources. |
| X-1 (b) | `keyName` deleted; imported from `arena/resolve.ts`. `debugCheck` stays the module's with its `index: ` prefix (J270 (a)). **`stamp` kept local** (see N-c1-1). | `keyName`: identical body (`${layer}/${part}`). `stamp`: unchanged body, one doc sentence added saying why it is not the arena's. |
| X-1 (c) | `insideRing` keeps its name, signature, doc sentence and typed-array loop; each edge toggles on `crossingStep(X[a], Y[a], X[b], Y[b], qx, qy) !== 0` (`num/exact.ts`). `insideRouteRings` unchanged; `orient2d` stays imported (`segmentMeetsBox`). | The four-case table below, executed on 117 649 inputs. |
| X-1 (d) | `spatial.ts`'s `five` deleted; `import { five } from '../arena/plat.js'`. | Identical body. New pin in `grid.test.ts` "an empty grid answers nothing …": `attachIndex` takes its grid cells per level (CELLS) and one number for all five. |
| X-2 | Comment only (J263 Q7): `routePieces`' doc names `io/encode.ts`'s `runsAt` / `onward` as the persisted block's own walk of the same routes (a level-r route edge is by definition a piece of `routePieces(routeRun(…), r)`), kept apart (N-45 (b)). No T-io-new-1. | No code changed at that site. |
| X-3 | NOT DONE — JUDGMENT (vetoable): `insert/placement.ts`'s exported `HOT_PIXEL_SQ` stays the one home (the a-13 c1 round imports it by path; `tx/relevel.ts`'s `HOT_SQ` adopts it in R6); a second home beside `HOT_PIXEL_CM` would be a third spelling. | — |
| X-4 | `items.ts` exports from the file `faceArea2(p, level, f)`: `faces/common.ts:557`'s body (`area2` from `../num/index.js`, `lp` from `../num/exact.js`) with the doc sentence "twice the face's area (cm²) over its own-level route rings, outer counter-clockwise and holes clockwise: exact". Not on `index/index.ts` (J263 Q1: the barrel's `faceArea2` is the invariant suite's); no caller changed (J270 (b)). | New pin in `items.test.ts`, describe "faceArea2 (§3.10’s area measure, homed beside faceRouteRings; C-0342)": equal to `faces/common.ts`'s and `invariants`' `faceArea2` (the coexisting copies as the oracle) and > 0 on every live face of every level of QUARTERS, LAKE, OFFLINE, OFFLINE_BASE, 12 random arenas and the arenas of 6 fuzz cases × 40 batches (after each batch, three times), holed faces included. |
| §2 | `index/index.ts`'s comment loses "The scaffold created this index empty (M0-s-01, C-0013); it belongs to M0-a-03" and cites C-0160, C-0164. No other comment in the owns narrated a round (grep for round, N-xx, scaffold, fix, mutant, probe, seed: nothing else). | Exports byte-identical (below). |
| §3.4 / T-support-1 | `test/index/support.ts`'s mulberry32 copy (`generator`) and `intIn` deleted; it imports `rng` and `intIn` from `test/arena/support.ts` and re-exports them as `generator` and `intIn` (its tests unchanged); `randomArena` draws from `rng`. No file merged. | Same constant `0x6d2b79f5`, same `>>> 0` arithmetic: the first 16 draws of three seeds below, equal before and after. |

**The four cases of `insideRing` (X-1 (c), N-3's NUANCE).** Old body: `if ((ay > qy) !== (by > qy)) { o = orient2d(a, b, q); if (by > ay ? o > 0 : o < 0) toggle }`. New: toggle iff `crossingStep(a, b, q) !== 0`, where `crossingStep` is `ay ≤ qy ? (by > qy && orient2d > 0 ? 1 : 0) : (by ≤ qy && orient2d < 0 ? −1 : 0)`.

| case | old body | `crossingStep` | inputs (−3 … 3)⁶ | toggles (both) |
|---|---|---|---|---|
| ay ≤ qy, by ≤ qy | no straddle: no toggle | first branch, by > qy false: 0 | 48 020 | 0 |
| ay ≤ qy, by > qy | straddle; by > ay (by > qy ≥ ay): toggle iff o > 0 | +1 iff o > 0 | 19 208 | 8 800 |
| ay > qy, by ≤ qy | straddle; by > ay false (by ≤ qy < ay): toggle iff o < 0 | −1 iff o < 0 | 19 208 | 8 800 |
| ay > qy, by > qy | no straddle: no toggle | second branch, by ≤ qy false: 0 | 31 213 | 0 |

The old and new predicates agree on every one of the 117 649 inputs (a scratch test over every (ax, ay, bx, by, qx, qy) in
{−3 … 3}⁶, both bodies evaluated; CONFIRMED). `orient2d` is the same function (`num/index.ts` re-exports
`num/predicates.ts`'s, which `num/exact.ts` imports).

**The generator: first 16 draws, before (the folder's own mulberry32) and after (`test/arena/support.ts`'s `rng`).**
Identical (the probe's first lines, `cmp` equal; `intIn(rnd, −1000, 1000)` over the same seeds identical too):

* seed 1: 0.6270739405881613 0.002735721180215478 0.5274470399599522 0.9810509674716741 0.9683778982143849 0.281103502959013 0.6128388606011868 0.7207431411370635 0.425796952098608 0.9948229456786066 0.45527112716808915 0.48878831742331386 0.13893358339555562 0.40374476509168744 0.24752389639616013 0.15449313493445516
* seed 42: 0.6011037519201636 0.44829055899754167 0.8524657934904099 0.6697340414393693 0.17481389874592423 0.5265925421845168 0.2732279943302274 0.6247446539346129 0.8654746483080089 0.4723170551005751 0.24992373422719538 0.8820588334929198 0.7457375649828464 0.3070015134289861 0.19725383794866502 0.5007294877432287
* seed 2³¹ − 1: 0.4290980885270983 0.12713524978607893 0.3852774982806295 0.39639189024455845 0.11962746665813029 0.9531875969842076 0.6806830384302884 0.9957805015146732 0.3577910573221743 0.29028820362873375 0.5385690161492676 0.9202438748907298 0.7136044320650399 0.16397202876396477 0.35345059144310653 0.5329629355110228

**API frozen (J263 Q1).** The exported names and their types, listed by the TypeScript checker before (a copy of the
tree taken before the first edit) and after: the barrel `src/index.ts` 673 and `src/index/index.ts` 74, identical;
`grid.ts` 7, `fresh.ts` 4, `spatial.ts` 33, `query.ts` 8, `adapters/flatbush.ts` 4 identical; `items.ts` 26 → 27, the one
addition `faceArea2 :: (p: Plat, level: Level, f: number) => number` (file-level only).

**NO-SHIFT (J260 (3)).** A scratch probe (never in the tree) records every `query` and `pointLocate` answer, stamps
included, over QUARTERS, LAKE, OFFLINE and OFFLINE_BASE (a 37 cm lattice of points and boxes at every level, the index
all static and then all in the grid), 8 random arenas (211 cm lattice) and 40 fuzz cases × 40 batches (every judged
query and a `pointLocate` at its corner, both sides of every rebuild, every batch's problem and state counts), plus the
draws above: 114 635 lines, sha256 `0573042e3b752e6e1d0935d279bddf5daa9acf1aa5ed939f077667f1974ab2e1` on the pre-round
mirror and on the tree after the edits — byte-identical. The index persists nothing and feeds no digest; the level
digests, `io` round trips and registers are covered by the RELATED run below. Refusals (J264 (5), N-58): the index's
registered families — the B-FUZZ here bar (6 959 batches on 200 arenas at the PR size), its fixtures and the probe —
refuse nothing: 0 before, 0 after. Its checks are structural throws on programming errors (a malformed rotation, a bad
box or level, a missing index), never a refusal of lawful input; no refusal class was met to class.

### Old file → new file map (J263 Q8)

No file was renamed, merged or split; every describe and it title is kept (21 describe / 63 it before; 22 / 64 after:
the faceArea2 describe and its one it added).

| old file | new file | change |
|---|---|---|
| `src/index/query.ts` | same | X-1 (a) – (c); `stamp` kept with its reason |
| `src/index/spatial.ts` | same | X-1 (d) |
| `src/index/items.ts` | same | X-2 comment; X-4 `faceArea2` |
| `src/index/index.ts` | same | comment only |
| `src/index/{fresh,grid}.ts`, `src/adapters/flatbush.ts` | same | unchanged |
| `test/index/support.ts` | same | generator and `intIn` from `test/arena/support.ts` |
| `test/index/items.test.ts` | same | + the faceArea2 pin (new describe) |
| `test/index/query.test.ts` | same | + two lines in "stamps its answer …" (the ±2²⁴ bound) |
| `test/index/grid.test.ts` | same | + two lines in "an empty grid answers nothing …" (per-level cells) |
| the other eight test files | same | unchanged |

### Self-check (J183): the faults re-introduced in a scratch mirror

Each mutant was applied alone to a real copy of `plat/` outside the tree (isolation shown: no link into the tree; the
workspace packages resolve inside the copy), run as `vitest run --maxWorkers=1 --bail=1 packages/kernel/test/index/`
(plus `test/facade/stamps.test.ts` for the stamp), and restored from the tree with a `cmp` check.

| id | file | fault | result |
|---|---|---|---|
| K12 | query.ts | route pieces cut at the run's level, not level n | killed: query "on the hand-built arenas at every level …" |
| K13 | query.ts | the first hole skipped in `insideRouteRings` | killed: query "on the hand-built arenas …" |
| K14 | query.ts | the fallback reads the outer ring only | killed: pointlocate "agrees with the oracle on the quarters arena …" |
| A9 | query.ts | fallback `m >= 0` → `m >= 1` | killed: pointlocate "names an L0 record down to L0: the lake …" |
| A10 | query.ts | fallback reads the record at its own level | killed: pointlocate "reads a coarser record on the level-n route … (OFFLINE)" |
| K1 | fresh.ts | the row's tombstone clause → `if (false)` | killed: fuzz "fails when one changed item … left untombstoned" |
| A1 | fresh.ts | the successor clause → `void 0` | killed: checks "a changed item tombstoned whose successor never entered the grid …" |
| X1c-up | query.ts | `crossingStep(…) > 0` (upward edges only) | killed: pointlocate quarters |
| X1c-num | num/exact.ts | `crossingStep`'s first branch `ay < qy` (not half-open) | killed: pointlocate "… (OFFLINE)" |
| X1b-stamp | query.ts | the arena's `stamp` (with the generation) in place of the local one | killed: facade/stamps "a production build: … no shape gains a generation after a restore (ZERO SHIFT)" |
| X1a-box | query.ts | `Math.abs(v) < BOX_RANGE` | killed: query "stamps its answer …" (the new bound pin) |
| X1d-five | arena/plat.ts | `five` of an array → its first entry five times | survived the folder first (grid cells change no answer); killed by the new grid.test pin |
| X4-holes | items.ts | `faceArea2` over the outer ring only | killed: items faceArea2 pin |
| X4-level | items.ts | rings read at L4, not the face's level | killed: items faceArea2 pin |
| X4-swap | items.ts | `lp(y, x)` | killed: items faceArea2 pin |

15 of 15 red after the pin. The new pins pass on the pre-round sources (query, grid and pointlocate run there: 25/25).

### Gates

`install --frozen-lockfile` 0; `lint` 0 (eslint 1152 files, 0 errors, 0 warnings; `lint: probe-red ok`); `build` 0. NEAR at
full strength: `test/index/` (10 files) with the plan's oracles `facade/stamps`, `facade/facade`, `tx/profiles`,
`tx/expect`, `tx/clauses`, `invariants/fixtures`, `faces/merge`, `arena/resolve` — 21 files, 324 / 324; the here bar
`fuzz: 6959 batches on 200 arenas; … tombstoned 28373, re-levelled 1684, deleted 741, reused 450, rebuild moments 1761`
and the cost model flat (`generation, 1 … 240 commits: 0 + 9 rebuilds, 0 + 409 items`). RELATED at
`PLAT_FUZZ_RUNS=1000` over `src/index/{query,spatial,items,index}.ts` (W = 1, 12 232 s): 452 files, 5 777 / 5 780 — the
three reds are all `test/num/equivalence.test.ts` N-3 (N-c1-2), the item's by the RELATED rule. The first run ended
BLOCKED on N-c1-2 (2026-10-12 21:57).

**Resumption (J326, 2026-10-13).** The session landed N-c1-2's one-line hand-over under M0-a-01's record (lane
`session/M0-a-01-bindings-1`): `test/num/copies.ts` imports `crossingStep` from `src/num/exact.ts` (line 26) and its
`BINDINGS` carries it (line 148). Nothing in this item's owns changed on resuming except the choices-row number its
references cite: the row now stands as C-0342 by the id rule (C-0341 is M0-a-01's C3 row, landed first;
this lane's CLEAN-ROOM row is L-0484), so `items.ts`'s two comments, `items.test.ts`'s faceArea2 describe title and this
section now read C-0342. Re-run on the tree as it stands: `install --frozen-lockfile` 0; `lint` 0 (eslint 1154 files,
0 errors, 0 warnings; `lint: probe-red ok`); `build` 0; `test/num/equivalence.test.ts` at `PLAT_FUZZ_RUNS=1000` 25 / 25;
NEAR at full strength — `test/index/` (10 files), the plan's oracles `facade/stamps`, `facade/facade`, `tx/profiles`,
`tx/expect`, `tx/clauses`, `invariants/fixtures`, `faces/merge`, `arena/resolve` and `num/equivalence` — 19 files,
310 / 310, with the here bar `fuzz: 6909 batches on 200 arenas; … tombstoned 27015, re-levelled 1681, deleted 721,
reused 472, rebuild moments 1732` and the cost model flat (`generation, 1 … 240 commits: 0 + 9 rebuilds, 0 + 409
items`); RELATED at `PLAT_FUZZ_RUNS=1000` over `src/index/{query,spatial,items,index}.ts` (W = 1, 11 795 s): 453 files,
5 792 / 5 792, exit 0. Refusals 0 → 0. Status: ready for the closing check.

### Notes

| id | observation | handling | milestone |
|---|---|---|---|
| N-c1-1 | **The plan's A-2 premise for `stamp` no longer holds.** kernel-plan.md §1.4 A-2 and the brief's X-1 (b) call `index/query.ts`'s `stamp` and `arena/resolve.ts`'s identical. Since C-0313 (1) the arena's writes `generation` when the restore generation is not 0, and `test/facade/stamps.test.ts` pins that a production build's `QueryResult` and `Location` gain no `generation` after a restore across commits (the façade side table carries it, C-0313 (5)(a); `facade/kernel.ts`'s comment says so). Adopting the arena's helper turns that test red (mutant X1b-stamp). `keyName` is imported; `stamp` stays local with a sentence saying why (C-0342 (1)(b)). | None in this round. If the session later wants the index's inline stamps to carry the generation (C-0313 (5)(a)'s class, N-s2-2 of `checks/M0-a-02-notes.md`), that is a behaviour change for M0-a-16's and this item's round together, not a consolidation. | — |
| N-c1-2 (BLOCKER, cross-item, M0-a-01) | **M0-a-01's copy harness cannot evaluate a site that calls `crossingStep`.** `test/num/copies.ts` reads `index/query.ts`'s private `insideRing` from source and evaluates it with `BINDINGS = { orient2d, ratio, LATTICE, HOT_PIXEL_CM }`; its rule is that a consolidated site deletes its copy (then `importsShared` is checked). X-1 (c), as the brief binds it (J270 (a)), keeps `insideRing`'s name and loop and calls `crossingStep`, so the evaluated copy throws `ReferenceError: crossingStep is not defined`: RELATED's three reds, `equivalence.test.ts` N-3 "on 3 000 small random ring sets …", "on the fuzz arenas …" and the property (seed −1062050341). The remedy is one line of M0-a-01's harness: `BINDINGS` gains the real `crossingStep` (`import { crossingStep } from '../../src/num/exact.js'`). Applied in the scratch mirror only: `equivalence.test.ts` green, 22 / 22 at `PLAT_FUZZ_RUNS=1000` and at the PR size; and it then judges the new code — with the mutant `crossingStep(…) > 0` in `insideRing` it fails `N-3 index/query: true where exact.ts gives false at q (-1, 3) in (6, 3) (3, 6)`. Renaming or deleting the private `insideRing` would dodge the harness only by breaking the brief's binding X-1 (c) and would weaken the site's check to an import check; not done. | The session routes the one-line change to M0-a-01 (its `test/num/copies.ts`), then re-runs `test/num/equivalence.test.ts` and closes this round's check. Nothing in this item's owns changes. **Resolved (J326):** the session's edit (lane `session/M0-a-01-bindings-1`, CLEAN-ROOM L-0483) is in the tree; `equivalence.test.ts` 25 / 25 at `PLAT_FUZZ_RUNS=1000` and in NEAR, RELATED@1000 green. | M0 (this round's close) |

## Closing check C1 (lane `check/M0-a-03-consolidate-close-1`, flow flow-7, 2026-10-13)

The verdict, PASS, and its evidence are in `checks/M0-a-03-c1.md`. None of the rows below is a blocker under the blocker
rule. Two kinds of row are here:

* N-c1-3 – N-c1-5: a missing pin and two wording points in comments.
* N-c1-6 and N-c1-7: routed to the session.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-3 | **The foreign-key text of `query` / `pointLocate` is pinned only as `/handed the key/`.** Mutant N1 gives `query.ts` a local `keyName` spelt `layer:part` in place of the arena's import. It survives `test/index` + `facade/stamps` + `facade/facade` (132 / 132). The same re-spelling of the pre-round local `keyName` also survives (131 / 131, pre-round mirror), so this gap is older than the round, not made by it. This checker's probe shows the thrown texts are byte-identical before and after: `index: query on arena ground/0 was handed the key underground/3` and `… sky/0`. | Pin the key name in `query.test.ts` "stamps its answer …": `/handed the key underground\/0/`, and one `pointLocate` case. | M4 (hardening) |
| N-c1-4 | **The `stamp` doc's citation.** `query.ts:89–94` says "the façade carries the generation in its side table (C-0313 (1), (5))". That matches the code: `facade/stamp.ts` stamps the restore generation, and `stamps.test.ts` Q38 holds it. But C-0313 (5)(a) is the row that recorded the façade's side table as still keyed on the version alone. C-0317 is the row that gave the side table the generation, and `facade/stamp.ts`'s header cites C-0313 with C-0317. | Cite C-0317 beside C-0313 (1) at the next comment pass of `query.ts`. It is a comment-only change. | M4, or the next round touching `query.ts` |
| N-c1-5 | **"One seeded generator" in `test/index/support.ts:62`.** The comment reads "the kernel tests' one seeded generator (mulberry32 …), from the arena's support". Seven kernel test files still carry their own copy (`0x6d2b79f5`) until their own rounds take T-support-1's home: `test/num/support.ts`, `test/skeleton/support.ts`, `test/tx/order.test.ts`, `test/tx/fuzzgen.ts`, `test/insert/step1-2/support.ts`, `test/medial/support.ts` and `test/geom/support.ts`. "One" names the designated home, not a uniqueness that holds today. | No change if R14 closes the seven copies. Otherwise reword it as "the kernel tests' shared seeded generator (T-support-1's home)". | M0 (R14) |
| N-c1-6 (for the session) | **Id collision with main.** At main's head `851fa920`, C-0342 is `build/M0-x-06-fix2`'s row and L-0484 is `check/M0-x-06-close-r2`'s. In this tree the same two ids are this round's choices row and its builder's CLEAN-ROOM row; main also holds L-0485, L-0486 and C-0343, which this tree does not. Three places in the owns cite C-0342 by number: `src/index/items.ts:166`, `src/index/items.ts:235` and `test/index/items.test.ts:187`, the faceArea2 describe title. That title is new this round, so no check cites it yet. | The next writer renumbers at commit (C-0104; never the checker) and carries the number into those three places, the notes' round C1 section and the landed record's appends. This closing check's CLEAN-ROOM row takes L-0487, above every id on main and in the tree. | M0 (this wave's commit) |
| N-c1-7 (for the session; foreign red) | **RELATED's one red is vitest's 5 s default timeout.** The test is kernel `test/io/roundtrip.test.ts` "random batch arenas (default mix): save → load → save byte-identical …", owned by M0-a-15; the message is `Error: Test timed out in 5000ms.` and no assertion failed. It is deterministic (seeds 1 … 24 × 7919; no `PLAT_FUZZ_SEED` involved) and the round does not change its time. Measured times, all on this machine: 5 215 ms in RELATED; 5 974 ms alone on the idle machine in the tree; 6 039 ms on the pre-round index sources; green on both sides with `--testTimeout=120000` (7 / 7). The builder's RELATED passed it on the same tree (nothing under `packages/` changed since 2026-10-12 22:12), so it sits at the 5 s edge here. Unlike the index tests (`SLOW = 120_000`), the test sets no timeout of its own. This is a wall-clock limit, not a behaviour. | M0-a-15 gives its two random-batch round-trip tests their own timeout, as M0-a-05's loops did after the same failure. This machine is not §12.1's timing reference, so the limit is not a gate. | M0 (M0-a-15's next touch) |
