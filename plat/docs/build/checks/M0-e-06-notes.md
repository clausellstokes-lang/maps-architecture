# M0-e-06: the checker's minor notes (lane `check/M0-e-06`, 2026-10-07)

These are MINOR findings from the first check of M0-e-06 (`checks/M0-e-06.md`). None of them fails the item (J180,
N-45). Each is a known-issue row for the hardening pass M4, or a note routed to the item, an item it names, or the
session. The evidence is in the check file and in `~/maps-scratch/waves/check-M0-e-06/`.

| # | note | evidence | route | label |
|---|---|---|---|---|
| 1 | **The committed summary is an 8-seed run, and M0-f-03b reads it.** C-0271 (9) declares the 200-seed run PENDING-LONG-RUN. M0-f-03b takes p999 × 1.5 from the summary's work quantiles, and with n = 8 the p999 is the maximum of eight. Its hit-rate test (≤ 1 per 1 000 batches) needs far more batches than 8 seeds give. | `summaries/M0-e-06.json` `seeds {first 1, count 8}`; one CITY derivation costs 80 s to 7 min and 0.9 GB here; 800 derivations ≈ 8 h on 4 workers | **the session**: schedule `corepack pnpm bench -- site --workers W --summary` under the item's lane before M0-f-03b, after the cross-item fixes of the check's section 5 | CONFIRMED |
| 2 | **The stage stamps leave out the runner's stage-end work.** The harness times `stage.run` only. The runner then rebuilds the stage-end index partitions and closes the stage root outside that window (`runner.ts:304-308`). At the test size this is S3 2.6 ms, S4 2.2 ms, S5 3.9 ms (stage root ≤ 0.1 ms). Against S4's 10 ms row that is about a fifth. M0-c-06's harness uses the same window. | mirror-only instrumentation of `runner.ts`, relief-60 seed 1, test size | M0-t-01 / M0-x-01 (decide whether §12.4's stage rows include the stage-end rebuild; C-0082's window), M4 | CONFIRMED |
| 3 | **The timing-phase batch cannot stay within 60 s.** `timeSpike` times one fixture and configuration over all its seeds as one `timeBatch`. Each derivation also runs S3 and S5 (here 30-55 s each, contended), so even a one-seed batch exceeds §12.1's 60 s and is flagged `long-batch` (its figure kept). The informative gate p50s are 6.2-47 s against 50 ms, a miss of more than 100× that R12-5's one-step coarsening cannot close. | `runA.log`, `runB.log`, summary `stageP50`; `timing/harness.ts:165` | M0-t-00 / M0-t-01 (partition by `--first`/`--seeds`; expect a §3.7-style > 2× miss on S1 and the S3 slice), the session | CONFIRMED (times informative only) |
| 4 | **The report keeps corpus counts but not their causes.** `RunRecord.corpus` drops `CorpusReport.causes`, so the report cannot tell a `sharpCorner` sliver from a validator failure. The checker had to re-run the corpus to learn the causes. | `receipts.ts:659-661`; probes `q-relief-60-2-default-city.json` (`sharpCorner` 15 of 63), `p-relief-60-1-default-city.json` (water face: validator `faces`) | M4 | CONFIRMED |
| 5 | **The byte-for-byte test runs one fixture and one configuration at the test size.** `entry.test.ts` covers relief-60, default, two seeds. The coarse configuration, the 3 000 m fixture and CITY are not compared across worker counts. (Run A's summary receipts did equal the committed ones across sessions.) | `entry.test.ts:17-18` | M4 | CONFIRMED |
| 6 | **Holed district faces are not pinned whole into the corpus.** Mutant K30 (outer ring only) survives NEAR. No test fixture has a holed district face. At CITY, relief-3000 seed 2 has 1 of 122, with the same downgrade count either way. | `sweep/K30.near.log`; probe `q-relief-3000-2-default-city.json` (`districtHoles 1`) | M4 | CONFIRMED |
| 7 | **The span reading is strict.** A built bridge's span must be one L1 edge between the deck ends. On relief-60 seed 15, `bridge:41`'s way is split inside the water at (86506, 37365), and the receipt fails it. Whether a degree-2 vertex on a deck is admissible is M0-c-03's question (check, section 5, finding 4). If it is, the receipt should walk the way's path between the deck ends. | `q-relief-60-15-default-city.json` `wetDetail`, `bridges` | M0-c-03 first, then the receipt (M4) | CONFIRMED (geometry); PLAUSIBLE (cause) |
| 8 | **The 3 000 m fixture never exercises the water clauses.** In 32 runs its trace never meets the river and S4 builds no bridge, so `waterGates` and `spans` are unobserved there. The harness reports this honestly. | runs A and B | M1's gate re-run (the item defers further configurations there) | CONFIRMED |
| 9 | **A river can fit with a bed of 2-3 cells.** On relief-3000, `minBedCells` is 2 (default) and 3 (coarse). The monotone check is trivially true on so short a bed, and such a river does not `fit` (fits 6 of 8). The bar could count only fitting rivers, or report the short ones apart. | runs A and B, relief-3000 `bedMonotone.numbers` | M4 (M0-e-02 for the short rivers) | CONFIRMED |
| 10 | **`hydroReceipt` treats every cell centre outside the frame as land.** The water bodies lie inside the frame today. A future coast or margin water (M1) would make the land count wrong without a test failing. | `receipts.ts:374-375` | M1 (coast) / M4 | PLAUSIBLE |
| 11 | **Containment samples every 50 m.** A district gap thinner than 50 m between samples is not seen by the sample, only by S6's own `unowned` count. | `receipts.ts:525`, `:545-559` | M4 | PLAUSIBLE |
| 12 | **The routed notes are reported, not answered.** M0-c-01 notes (water-side gate picks), M0-c-02 notes (N-8 in-batch band re-proof), M0-e-04 note 10 (sum check on collinear rings) and M0-x-04 notes 1 and 3 name M0-e-06 as where their cases first meet real relief. The harness surfaces them as refusals and bar failures (check, section 5) but runs no case aimed at each. | `checks/*-notes.md` lines naming M0-e-06 | the session (fold into the cross-item fix list) | CONFIRMED (by reading) |
| 13 | **The tolerance test pins `WET_DEPTH_CM` to a window, not to 2 cm** (closing check `check/M0-e-06-close-r1`). The fix round's tolerance test reads probe points 1 cm, 10 cm and 50 cm inside the river and 10 cm outside. Any tolerance from about 1 cm up to the 10 cm point's lattice distance passes: `WET_DEPTH_CM = 1` (C02) and `= 5` (C01) survive the whole NEAR folder, while `= 0`, `= 20` and `= 200` are killed. B-2's required change is met. A further probe point at 3 cm next to the 1 cm one would narrow the window to about 1 to 3 cm. | `~/maps-scratch/waves/check-M0-e-06/close-r1/sweep/C01.near.log`, `C02.near.log` (66/66 each) | M4 | CONFIRMED |
| 14 | **Seed 9's one ungated wet edge is a cross-item line for M0-c-02, not a KI and not M0-e-06's** (closing check `check/M0-e-06-close-s1`, N-54 (4)). After M0-c-02 s1 (1836e6f0), relief-60 CITY seed 9 (default) commits enceinte:2 with 4 water gates and 4 wall edges over water; 3 are their gate's chord. `gate:w0`'s wet side runs 1977 (−13908, −90171) → 6080 (−9391, −88784), 47.25 m, mid-depth 993 cm, rows `wall:enceinte:2`, `wall_gate:gate:w0`; its start 1977 is a shore vertex 27 cm along the shore from the gate's `gate_end` 0 (6079, −13928, −90189), and the 27 cm edge 6079 → 1977 carries `wall_gate:gate:w0` with the shore and bank rows. So the wet side is no chord between the gate's two bank pins, and the waterGates bar fails on seed 9 as the strict reading requires. The ruling seat's pre-fix replay (`ruling-geom/q5-relief-60-9.json`, `wetWall[0]`, `aRows: []`) shows the same edge, so M0-c-02 s1 did not change it. The receipt is right; the producer is wrong. | probe `~/maps-scratch/waves/check-M0-e-06/s1/probe-out-9-default.txt` (independent per-edge reading); `s1/out-9/site-spike.json` | the session: a fix-queue row for M0-c-02 (its final proof admits a wet side that has only one bank pin as its end) | CONFIRMED |
| 15 | **The chord (span) half of the strict reading is pinned only by seed 9's live cross-item defect.** Mutant M2 (`gated` keeps `ge.length === 2` and drops `joins(e, ge[0], ge[1])`) is killed by both N-54 tests, and each kill goes through note 14's graze edge, the only wet wall edge on seed 9 that has one own `wall_gate` row and two resolved ends but does not join them. Test (c) ("a chord not between its gate's two bank pins") reverses `banks`, so neither end resolves. That exercises end resolution, not a resolvable non-chord. When M0-c-02 removes the graze, M2 will survive the NEAR set. | `s1m/M2.log`; `s1/probe-out-9-default.txt` (one non-chord wet edge) | M0-e-06, in or before the M0-c-02 round that removes the residual: a hand-built pin (a wet wall edge with one `wall_gate` row whose two `gate_end` refs resolve, one end off the edge); otherwise M4. KI | CONFIRMED (the kill path); PLAUSIBLE (the future survival) |
| 16 | **A wall edge that carries two `wall` rows is counted in both enceintes' rows.** `mineOver` attributes a wet edge to every enceinte its `wall` rows name. If a stage-k wall side shared with stage k−1 lay over water and was gated by one enceinte's gate, the other enceinte's row would read it ungated and fail the bar. This fails closed (a false fail, never a false pass). No such edge appears on seeds 1, 9 or 15. | `receipts.ts:559` | M4 (KI), if C-0244 lets nested walls share a wet side | PLAUSIBLE |

## Hardening round S2 (lane `build/M0-e-06-fix-s2`, 2026-10-27 – 28; J237 (2), J264 / N-58, J290, J263 Q1 / Q6, N-45; the hardening inventory's FIX-NOW rows M0-e-06:9 1, :12 4, :13 5, :14 6, :17 9, :21 13, :23 15, :24 16; queue: the Q36-class summary re-run; choices C-0435) — the builder's row-by-row outcome

Inside the item's owns only (`bench/src/site/`, `bench/test/site/`, `docs/build/summaries/M0-e-06.json`). Sources changed:
`receipts.ts` and `report.ts` (behaviour of the receipts and the fold only); `compose.ts`, `pool.ts`, `fixtures.ts`,
`timing.ts`, `worker.ts` and `index.ts` byte-identical to the S1 record (`landed/M0-e-06.json` of `build/M0-e-06-fix-s1`),
so no derivation, no stage outcome and no export changes (API frozen, J263 Q1: `index.ts`'s export list untouched; the
new fields are on exported types `RunRecord`, `CorpusCounts`, `WaterGateReceipt`, as the rows ask; no message text
changed, J263 Q6). Tests: a new `hand.test.ts` (4 tests on hand-built arenas) and `summary.test.ts` (4 tests); new or
tightened cases in `entry.test.ts`, `fold.test.ts` and `spike.test.ts` (the tolerance test's title names its new
points); the folder runs 86 tests in 7 files (74 in 5 at S1's landing). Mirrors:
`/home/user/maps-scratch/waves/selfcheck-build-M0-e-06-fix-s2` (isolation proven: no link into the tree, `@plat/kernel`
resolving inside the mirror; removed at the end, its logs kept in `e06s2-evidence/`) and the long run's `/home/user/maps-scratch/waves/longrun-M0-e-06-s2` (sources equal to
the tree by 532 SHA-256 at its start and again at its end).

### Row-by-row outcome

| row | outcome | what changed | the pin (test) | mutant (red on it) |
|---|---|---|---|---|
| :9 note 1 (the committed summary is an 8-seed run) | **FIXED** | `docs/build/summaries/M0-e-06.json` regenerated at full strength on the round's final tree (after M0-e-03 S3, c2798de7): CITY, seeds 1 – 200, both relief fixtures × both configurations, 800 derivations (J238 (2)); the Q36-class re-run of the queue is the same file. How it was run (two container restarts, 19:43Z and 21:20Z, killed two plain `bench -- site --workers 3 --summary` runs, the second at 160 of 800): a resumable driver outside `plat/` (`longrun-M0-e-06-s2/driver/{chunk,fold}.mts`) runs the item's own `runSpikeTask` per task in up to four processes, stores each `SpikeResult` (v8 structured-clone bytes, the pool's own postMessage algorithm) under `store/res/<task>.bin`, and folds them exactly as `index.ts` `run()` does without `--timing` (task order; `foldReport`; `foldTimes(…, 'informative')`; `summaryOf`). Its fold equals the harness's: at the test size (seeds 1 – 2 × both × both) the report file is byte-identical to `bench -- site`'s; at CITY, `bench -- site --seeds 1 --first 7 --workers 4`'s four records equal the store's, JSON for JSON. Every bar verdict equals the 8-seed file's | `summary.test.ts` (new): "CITY, seeds 1 … DEFAULT_SEEDS, both fixtures × both configurations: every group holds every seed"; "each stage accounts for every derivation …"; "it is this code's fold (the Q36-class re-run …)"; "its verdicts are its groups' folded …" | R1 (the 8-seed summary restored): red (folder: the first test; alone: the first and the third) |
| :12 note 4 (corpus causes dropped) | **FIXED** | `receipts.ts`: `CorpusCounts.causes` (a copy of `CorpusReport.causes`: contract refusals, validator checks, `workLimit`); `report.ts`: summed per set over the group and reported in the corpus bar's numbers as `<set>.contract.<refusal>`, `<set>.validator.<check>`, `<set>.workLimit`, every cause in the runner's order, zero or not. The 200-seed run tells them apart: e.g. relief-60 default `districtRoof` 325 downgrades = `notSimple` 33 + `sharpCorner` 289 + validator `faces` 3; `waterRoof` 29 = `sharpCorner` 4 + `planarity` 3 + `faces` 22 | `fold.test.ts` "corpus: the report keeps each downgrade's cause per set …"; `hand.test.ts` note 6's test (`causes` equal to the runner's own) | R4a (the record's causes emptied): red (hand.test); R4b (the fold drops the contract causes): red (fold.test) |
| :13 note 5 (byte-for-byte on one case only) | **PINNED** | none in `src` | `entry.test.ts` "one thread and two worker threads give the same report file: both fixtures × both configurations, test size, seed 1" and "…: CITY, relief-60 coarse, seeds 1 – 2" (in-process on one thread against the dispatcher across two worker threads; the records' order asserted) | R5a (a worker derives the default configuration), R5b (relief-60), R5c (the test size): each red; R5c only on the CITY case; the first test passes all three |
| :14 note 6 (holed district faces) | **PINNED** | none (`spikeFaces` passes every ring) | `hand.test.ts` "a district face with a hole …": a district face with a 3.8° triangular hole; `spikeFaces` passes both rings (read independently through the façade's view), the corpus counts are the whole face's (downgrades 1) and not the outer ring's (0) | R6 (= K30, outer ring only): red |
| :17 note 9 (a fitting bed of 2 – 3 cells) | **FIXED** | `report.ts`: the bed bar is observed on fitting rivers (`of: 'fitting rivers'`); a degraded course (F-RIVER's, `fits` false) is reported apart (`degraded`, `degradedMonotone`, `minDegradedBedCells`, beside `fits`, `fittingMonotone`, `minFittingBedCells`); every river's bed is still judged — a degraded river whose bed rises fails the bar. The note's two alternatives are both taken: the observation counts only fitting rivers, and the short ones are reported apart (the bar's subject, §16 M0 (e) "the river's bed monotone", is the carved course; a degraded course is F-RIVER's fallback, §5.2's row). On the 200-seed run the short beds are all degraded: relief-3000 default fitting 144 of 199 (`minFittingBedCells` 257; degraded 55, min 2 cells), coarse 137 of 200 (268; 63, min 3); relief-60 199 of 200 each (one degraded river each) | `fold.test.ts` "bedMonotone: only a fitting river observes the clause …" | R9a (observed over every river): red; R9b (judged on fitting rivers only): red |
| :21 note 13 (`WET_DEPTH_CM` pinned to a window) | **PINNED** | none (2 cm stands) | `spike.test.ts` the tolerance test gains a lattice point 1.2 – 1.9 cm inside the river (not over the water) and one 2.1 – 2.9 cm inside (over it); the window narrows from about 1 – 10 cm to 1.9 – 2.1 cm | R13a (`= 1`, C02), R13b (`= 3`), R13c (`= 5`, C01): each red |
| :23 note 15 (the chord half pinned only by seed 9's former defect) | **PINNED** | none | `hand.test.ts` "one chord A → B: gated; the line split in the water at M …": a hand-built crossing whose gate line is split mid-river, each wet edge carrying the gate's one `wall_gate` row, both `gate_end` refs resolving (to A and B), one end of each edge off the pins: ungated, the bar fails; the same crossing as one chord: gated, the bar passes | R15 (= M2, `joins` dropped): red |
| :24 note 16 (a shared wet side counted in both enceintes) | **FIXED** (the first alternative: attribute by the gate's enceinte) | `receipts.ts`: a wet wall edge naming two or more enceintes in its `wall` rows (C-0244's union, stage k's wall on stage k − 1's) that carries a `wall_gate` row of a water gate of one of them belongs to that gate's enceinte only; with no such gate it stays in every enceinte it names (fail-closed, as before); `WaterGateReceipt.sharedWallOverWater` counts such edges and the waterGates bar's numbers carry it, so a run shows whether the case occurs. The 200-seed run (DEFER-CANDIDATE kept, "the run decides whether it shows"): `sharedWallOverWater` 0 in all 800 derivations — the case does not occur today; the fix and its pins stand | `hand.test.ts` "gated by stage 1's water gate: stage 1's row holds the side, gated; stage 2's row holds no wet side; the bar passes" and "with no water gate recorded for it: the shared side stays in both enceintes' rows, ungated, and the bar fails (fail-closed)" | R16a (attribution off): red; R16b (the count off): red |

### The declared shift (J237 (3); C-0435)

No derivation moves: the round changed no stage-running code. What moves is the report's and the summary's shape and
the bed bar's observation:

* **The report and summary gain fields** (additive): the corpus bar's numbers `<set>.contract.*`, `<set>.validator.*`,
  `<set>.workLimit` (row 4); the bed bar's `fits`, `fittingMonotone`, `minFittingBedCells`, `degraded`,
  `degradedMonotone`, `minDegradedBedCells` (row 9); the waterGates bar's `sharedWallOverWater` (row 16); each run
  record's `corpus.*.causes` and `waterGates.sharedWallOverWater`. No reader of the summary but the item's own tests
  exists in `plat/` (`grep` for `summaries/M0-e-06`: `index.ts`, `entry.test.ts`).
* **The bed bar's `of` is `fitting rivers`** (was `rivers`) and its `observed` the fitting rivers' count (relief-3000
  default 144 of 199, coarse 137 of 200, relief-60 199 of 200 each). Verdicts unchanged (pass in every group).
* **The committed summary is re-recorded** (named here): `docs/build/summaries/M0-e-06.json`, sha256 `2fe14f76…` (8 seeds)
  → `6ba690c9…` (200 seeds, 51 060 bytes). Every bar verdict is unchanged (`d8`, `bedMonotone`, `carve`, `noClamp`,
  `reliefAsNamed`, `waterGates`, `spans`, `containment`, `fieldBands`, `weightZero` pass; `countLaw`, `gateWards`,
  `corpus` fail). The work quantiles M0-f-03b reads now span up to 200 derivations per counter (`hydro.cells` n = 200 /
  199; `grower.turns` and `field.cells` n = 122 – 152; `route.nodes` n = 50, 48, 2, 1 — S4's route work is charged only
  where a route is laid, so its p999 rests on few units on relief-3000; a note for M0-f-03b, below). No golden or digest
  records this item's report.

### The refusal census (J264 (4), N-58) and verdicts (J290)

The registered family is the spike's seed sweep: CITY, seeds 1 – 200, relief-60 and relief-3000 × default and coarse
(800 derivations). Before → after the round: **251 → 251 refused derivations** (by construction — the stages' outcomes
are `stageOutcomes(d)` over `d.report.bugs`, and the round changed neither it nor any code that derives; the after-count
is measured, `longrun-M0-e-06-s2/census.txt`): relief-60 default 78 (S3 `E_SELF_INTERSECT` 32, `E_INVARIANT` 1; S5
`E_SELF_INTERSECT` 41, `E_INVARIANT` 2; S6 `E_INVARIANT` 2), relief-60 coarse 77 (S3 32 + 1; S5 40 + 3; S6 1), relief-3000
default 48 (S1 `E_INVARIANT` 1 (seed 184); S3 `E_INVARIANT` 13, `E_SELF_INTERSECT` 5; S4 `E_INVARIANT` 4; S5
`E_SELF_INTERSECT` 18, `E_INVARIANT` 5; S6 `E_INVARIANT` 2), relief-3000 coarse 48 (S3 13 + 5; S4 4; S5 19 + 5; S6 2); the
seeds of every class are in `census.txt`. Every one is a typed refusal of another item's stage (S1 M0-e-03; S3
M0-c-01 / M0-c-02; S4 M0-c-03; S5 M0-c-04; S6 M0-e-04) on geometry our own earlier stages made from the fixtures'
lawful parameters: input kind OUR OWN INTERMEDIATE, verdict MAKE-IT-SUCCEED, owned by those items — routed to the
session with the seeds (this item's harness only reads them; rule (1): reported, not built). This item's own code
refuses nothing in the family (no bug, no throw: the harness ran all 800 to a record).

### The round's mutant table (J169, J183)

15 targeted mutants in the mirror, each `vitest run --maxWorkers=1 --bail=1 bench/test/site` (the whole folder), the
mutated file restored from the tree and `cmp`-equal after each (kept in `/home/user/maps-scratch/waves/e06s2-evidence/`: `mutants.json`, `sweep/<id>.log`; R1 swaps the summary file): **15 red**,
no survivor. The unmutated mirror ran the folder green first (BASE, 82/82 before `summary.test.ts` joined it).

| id | aimed at | mutation | first red |
|---|---|---|---|
| R1 | note 1 | the committed 8-seed summary restored | summary "CITY, seeds 1 … DEFAULT_SEEDS …" (alone: also "it is this code's fold …") |
| R4a | note 4 | `counts()` empties `causes` | hand "a district face with a hole …" |
| R4b | note 4 | the fold drops `<set>.contract.*` | fold "corpus: the report keeps each downgrade's cause …" |
| R5a / R5b / R5c | note 5 | the worker derives config `default` / fixture `relief-60` / size `test` | entry "… both fixtures × both configurations, test size, seed 1" (R5a, R5b); "… CITY, relief-60 coarse, seeds 1 – 2" (R5c) |
| R6 | note 6 (K30) | `spikeFaces` passes a district face's outer ring only | hand "a district face with a hole …" |
| R9a / R9b | note 9 | observed over every river / judged on fitting rivers only | fold "bedMonotone: only a fitting river observes the clause …" |
| R13a / R13b / R13c | note 13 (C02, —, C01) | `WET_DEPTH_CM` 1 / 3 / 5 | spike "the tolerance: … 1.2 – 1.9 cm inside is not, 2.1 – 2.9 cm is …" |
| R15 | note 15 (M2) | `gated` drops `joins(e, ge[0], ge[1])` | hand "one chord A → B: gated; the line split in the water at M …" |
| R16a / R16b | note 16 | every wet edge in every enceinte it names / `sharedWallOverWater` not counted | hand "gated by stage 1's water gate …" |

### Gates

`corepack pnpm install --frozen-lockfile` 0; `lint` 0 (eslint 1192 files, 0 errors; `lint: probe-red ok`;
`lint: bench-boundary ok`); `build` 0; NEAR `vitest run --maxWorkers=1 bench/test/site` on the final tree
7 files, 86 tests, exit 0 (1216 s); RELATED: none — the round changed no file under `packages/*/src/` (its sources are `bench/src/site/`, whose
import graph reaches only `bench/test/site/`; `bench/src/tier-jobs` names the folder as text, not by import). The
item's here-bar is the harness: the 200-seed run above, every bar verdict reported (`countLaw`, `gateWards`, `corpus`
fail as before — the exit bars' standing failures, not this round's).

### Notes for the session (no row of this round; each with its evidence)

* **N-s2-1 (the refusal census at CITY):** 251 of 800 derivations end refused in another item's stage (above; seeds in
  `longrun-M0-e-06-s2/census.txt`): S3 `E_SELF_INTERSECT` on 32 of 200 relief-60 seeds in both configurations, S5
  `E_SELF_INTERSECT` on 40 – 41, S3 `E_INVARIANT` on 13 relief-3000 seeds, S4 `E_INVARIANT` on 4, S1 `E_INVARIANT` on
  relief-3000 default seed 184. ZERO REFUSALS (J264) routes each class to its stage's item.
* **N-s2-2 (M0-f-03b's units):** `route.nodes`' quantiles rest on 50 / 48 units on relief-60 and 2 / 1 on relief-3000
  (S4 charges route work only where a route is laid); a p999 × 1.5 there is the maximum of a handful.
* **N-s2-3 (the long run's method):** the committed summary was folded from stored per-derivation results (row 1); a
  checker can reproduce any record with `corepack pnpm bench -- site --seeds 1 --first <s>` and compare it to the
  report `longrun-M0-e-06-s2/fold/site-spike.json`.

## Closing check S2 (lane `check/M0-e-06-close-s2`, 2026-10-28) — new notes

None of these fails the round (the blocker rule; N-45). Evidence lives in `/home/user/maps-scratch/waves/check-M0-e-06/s2/`
(`sweep/results.txt` and `sweep/<id>.log`, `probes/`, `spot/`).

| # | note | evidence | route | label |
|---|---|---|---|---|
| 17 | **The tolerance pin's window is 1.60 – 2.57 cm, not the 1.9 – 2.1 cm that § Hardening round S2 states.** The test's title also says "2 cm, not a window". The new points are the first lattice points the search finds: q15 at depth 1.602 cm and q25 at 2.567 cm. Any `WET_DEPTH_CM` from about 1.61 to 2.56 cm passes. The checker's mutant X11 (`= 2.5`) survives `spike.test.ts`. X10 (`= 1.5`) and X12 (`= 3`) are killed. Row 13 asked for a probe point at 3 cm, which narrows the window to about 1 – 3 cm and kills C01 and C02. That is met. Only the text's claim is too tight. Two fixes would close it: take points just below and just above 2 cm (for example in 1.8 – 1.99 and 2.01 – 2.2), or correct the claim to 1.6 – 2.57 cm. | `sweep/X11.log` (exit 0), `X10.log`, `X12.log`; `probes/tolerance-depths.json` (a mirror-only copy of the test that writes the depths) | M4 | CONFIRMED |
| 18 | **`summary.test.ts` pins the summary's shape, not its content.** It checks 200 seeds, the groups, the stage accounting, the round's new fields and the folded verdicts. A 200-seed summary folded on an older tree would pass it unchanged. That is the Q36 class: another item's commit moves a stage outcome and nobody re-runs the summary. This round's content was confirmed another way. The checker re-folded the long run's 800 stored results with the tree's `foldReport`, `foldTimes` and `summaryOf`, and the output equals the committed file byte for byte. Eight fresh CITY derivations (seeds 184 and 200, both fixtures × both configurations) equal the store's records. Two fixes would close it: give the summary a content anchor (a digest of its records, or of the derivation sources) that a test can check against the tree, or keep the Q36 re-run as the session's procedure after any stage change. | `probes/refold.mts` (equal: true); `probes/spotcmp.mjs` (8 of 8 equal); mutants X18 – X20 (what the pin does catch) | M4 / the session | CONFIRMED |
| 19 | **Note 5's CITY case covers relief-60 coarse only.** No test compares CITY relief-3000 or CITY default across thread counts. The law holds in the evidence: the long run (four chunked processes) and the checker's single-thread `bench -- site` runs (seeds 184, 200 × both fixtures × both configurations) give JSON-equal records. That is evidence, not a test. | `spot/run184.log`, `run200.log`; `probes/spotcmp.mjs` | M4 (a hardening test) | CONFIRMED |
| 20 | **The 3 000 m fixture's river degrades on 27 – 32 % of seeds at CITY.** On relief-3000 the river fits on 144 of 199 default seeds and 137 of 200 coarse seeds. The rest are F-RIVER's degraded course, with beds of 2 – 3 cells. On relief-60 it fits on 199 of 200 in each configuration. This is a degrade, not a refusal: the bed bar now reports these courses apart, as row 9 asked. The rate is a property of S1 (M0-e-02 / M0-e-03), and note 9 already routes the short rivers there. | committed summary `bedMonotone.numbers` (`fits`, `degraded`) | the session (M0-e-02 / M0-e-03) | CONFIRMED |
| 21 | **The builder's listing slip (L-0675, rule 8).** The builder ran `ls` once on `docs/` and once on the project root, which printed names only. No file was opened and nothing was used. The checker judges that no work needs redoing: no line of the round's code, tests or text draws on a listed name. The session decides whether the slip is recorded further. | `CLEAN-ROOM.md` L-0675, Disclosures | the session | CONFIRMED (by reading) |
