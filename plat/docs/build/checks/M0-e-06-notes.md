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

## Hardening round S2 (lane `build/M0-e-06-fix-s2`, 2026-10-27 – 28; J237 (2), J264 / N-58, J290, J263 Q1 / Q6, N-45; the hardening inventory's FIX-NOW rows M0-e-06:9 1, :12 4, :13 5, :14 6, :17 9, :21 13, :23 15, :24 16; queue: the Q36-class summary re-run; choices C-0447) — the builder's row-by-row outcome

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

### The declared shift (J237 (3); C-0447)

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
| 21 | **The builder's listing slip (L-0697, rule 8).** The builder ran `ls` once on `docs/` and once on the project root, which printed names only. No file was opened and nothing was used. The checker judges that no work needs redoing: no line of the round's code, tests or text draws on a listed name. The session decides whether the slip is recorded further. | `CLEAN-ROOM.md` L-0697, Disclosures | the session | CONFIRMED (by reading) |

## Hardening round S3 (lane `build/M0-e-06-fix-s3`, 2026-10-30; the session's round J637: a BENCH-ONLY round on the queue rows Q122 (the per-class seed lists), Q118 (the per-stage work blocks) and Q36 (the content anchor); J264 / N-58, J290, J263 Q1 / Q6, N-45; choices C-0453). The builder's row-by-row outcome

The round stayed inside the item's owns (`bench/src/site/`, `bench/test/site/`, `docs/build/summaries/M0-e-06.json`).
It read the stages the spike derives through and edited none of them. The tree the round opened on and reports is HEAD
`90a8d0fe3ef7` (J637 part 1; its parent `5e32b50e`, J636, is how the builder read the brief's gate "5e32b503 or
later"). No other seat's edit landed in the derivation's sources during the round. The long run's mirror equalled the
tree under `diff -rq` over `bench/src` and `packages` at the start, after the container restart of 19:16Z and at the
fold.

Sources changed:

* `receipts.ts`: the record's new fields `refusals` (the runner's code and detail per refused stage), `kernelBatches`
  (every façade batch with its per-counter counts, population and units) and `stageRows` (route.nodes at S3, S4 and S5;
  growth.* per S5c record).
* `compose.ts`: the watched façade reads each batch's per-counter tally and the population before it.
* `report.ts`: `refusalClasses`, `stageWorkOf` and `STAGE_WORK`.
* `index.ts`: the summary writes the refusal classes, the per-stage blocks and the anchor.
* `anchor.ts`: new. The index does not re-export it.

`fixtures.ts`, `pool.ts`, `timing.ts` and `worker.ts` are unchanged. No folder-index or barrel export was added, removed
or renamed (J263 Q1). No message text changed (J263 Q6). Tests:

* `summary.test.ts`: 4 → 12 tests.
* `fold.test.ts`: the classes, the blocks (the no-op batch case included), the units read back and the canary.
* `compose.test.ts`: as before, it holds the watched façade's stage roots equal to `runBase`'s.

Mirrors used: the long run's `/home/user/maps-scratch/waves/longrun-M0-e-06-s3` (driver, store and fold outside
`plat/`) and the self-check's `/home/user/maps-scratch/waves/selfcheck-build-M0-e-06-fix-s3` (isolation proven,
removed at the end).

### Row-by-row outcome

| row | outcome | what changed | the pin (test) | mutants (red on it) |
|---|---|---|---|---|
| Q122 (the census's seeds) | **FIXED** | Each group's `refusals`: one class per stage × code, in stage then code order. Each class gives its count, its sorted seeds, the runner's detail text for the class's lowest seed (`message`) and the number of distinct texts (`messages`). The record carries each refused stage's code and detail (`refusals`). The fixture × configuration is the group. | `summary.test.ts` "every refusal class of every group …": the classes are the stages' `refused` counts class by class, each count equals the length of its seed list, the seeds are sorted, distinct and within the run, and the message appears once. `fold.test.ts`: the classes on hand records, the lowest seed's text, a record with no detail. | R122a, R122b, R122c, R36d |
| Q118 (the per-stage work blocks) | **FIXED in the summary. The reader's read is REPORTED (M0-f-03b's file)** | Each group's `stageWork[stage][counter]` is in M0-f-03b's block form `{ stage, unit, units, unitsTotal, perUnit }` plus `charged`. Every stage that ran gets a block for every counter that `STAGE_CHARGES` gives it: the five kernel counters at S1, S3, S4, S5 and S6 (one sample per batch committed or refused), route.nodes at S3, S4 and S5, S1's hydro.cells, S5's growth.proposals and growth.candidates, and S6's grower.turns and field.cells. Each kernel batch's units are read back from its limit by the five kernel laws, summed. | `summary.test.ts` "STAGE_WORK is M0-f-03b's STAGE_CHARGES …", "every stage that ran … has a block of n > 0 … with the table's unit" (a kernel block's n is the stage's committed + refused batches) and "read in M0-f-03b's reader form, one stage per group, … no e-06 row unbounded" (`fitWorkLimits` on the committed summaries). `fold.test.ts`: the blocks on hand records, the no-op batch, the units read back. | R118a – R118f, R36d |
| Q36 (the content anchor) | **FIXED: the harness is strict and the canary is behavioural. The source digest's scope is REPORTED for the session's ruling** | `anchor`: `tree` (the commit), `harness` (sha256 over `bench/src/site`, compared byte for byte), `canary` (one CITY record of the run, re-derived on the tree and compared by sha256) and `sources` (sha256 over the packages the spike derives through, recorded and reported, never failed on). C-0453 states the scope and the re-run rule. | `summary.test.ts` "the harness … is byte for byte …", "the canary CITY record re-derived on this tree is the run's …" and "the derivation's sources: recorded and reported …". `fold.test.ts` "the canary is a record that ends every stage ok …". | R36a, R36b, R36c, R36d, R118d, R122c |

### The re-run (the 200-seed CITY summary on this tree) and its comparison with S2

The run covered CITY, seeds 1 – 200, relief-60 and relief-3000 × default and coarse: 800 derivations. It used S2's
resumable driver and store: four processes, each result stored as v8 bytes, a done-file, and a resume after the
container restart at 19:16Z, which found 394 of 800 stored and lost none. It ran 14:31Z – 22:45Z. The fold used
`foldReport`, `foldTimes` ('informative') and `summaryOf` with `anchorOf`, exactly as `run()` folds. The output is the
committed `summaries/M0-e-06.json` (sha256 `c751bf8e…`; S2's file was `6ba690c9…`). The canary is relief-60 coarse
seed 46 (`eb2046dd…`).

**Bar verdicts: unchanged.** `countLaw`, `gateWards` and `corpus` fail as in S2, which are the exit bars' standing
failures, and every other bar passes. **Stage counts and classes, S2 → S3** (each move is the stages' own, not the
round's; see the census below):

| group | refused derivations | moves |
|---|---|---|
| relief-60 default | 78 → 77 | S3 `E_INVARIANT` 1 → 0 (S3 ok 167 → 168); S5 `E_SELF_INTERSECT` 41 → 42, `E_INVARIANT` 2 → 1; S6 unchanged (2) |
| relief-60 coarse | 77 → 76 | S3 `E_INVARIANT` 1 → 0; S5 `E_SELF_INTERSECT` 40 → 41, `E_INVARIANT` 3 → 2; S6 unchanged (1) |
| relief-3000 default | 48 → 57 | S3 `E_INVARIANT` 13 → 0, `E_SELF_INTERSECT` 5 → 4, **`E_DEGENERATE` 0 → 25 (new; detail `empty`)**; S4 `E_INVARIANT` 4 → 1; S5 `E_SELF_INTERSECT` 18 → 20, `E_INVARIANT` 5 → 3, **`E_DEGENERATE` 0 → 2 (new; `empty`)**; S6 `E_INVARIANT` 2 → 1; S1 unchanged (seed 184) |
| relief-3000 coarse | 48 → 57 | S3 `E_INVARIANT` 13 → 0, `E_SELF_INTERSECT` 5 → 4, `E_DEGENERATE` 0 → 25; S4 4 → 1; S5 `E_SELF_INTERSECT` 19 → 21, `E_INVARIANT` 5 → 3, `E_DEGENERATE` 0 → 2; S6 2 → 1 |

Attribution, by the lane log: the only landing in the derivation's package sources since S2's run is
`build/M0-c-02-fix-s5` (`layout/src/enceinte/{commit,plane,pull,strips,trace,types,water}.ts`, 2026-10-28 07:30 /
07:47; its declared shift is the strip faces). The moved classes are the enceinte's: S3's commit and trace, and S5's
walls through F-WALL. S4's and S6's counts also move because their reach changes (notReached S4 19 → 30 and S6 46 → 56 on
relief-3000 default). S2's per-seed lists are gone with its container (`census.txt`), so the attribution is by stage and code, not
seed by seed, and it is not bisected. Work numbers in S2's `work` block: 382 of the 1 172 numbers common to both files
moved. Its samples are the derivations that reached each stage, and the reach moved (for example `grower.turns` p999
2.584 → 2.578 per face on relief-60 default). The `work` block keeps S2's form.

### The refusal classes with their seeds (Q122; the committed summary's `groups[].refusals`)

Every class is a typed refusal of another item's stage, on geometry our own earlier stages made from the fixtures'
lawful parameters. Input kind: OUR OWN INTERMEDIATE. Verdict: MAKE-IT-SUCCEED. Each class is routed to its owner's round
with the seeds below (rule (1): reported, not built). "texts" is the number of distinct detail texts in the class.

| fixture × configuration | stage | code | count | seeds (sorted) | texts | the message (the class's lowest seed) | owner's round |
|---|---|---|---|---|---|---|---|
| relief-60 default | S3 | `E_SELF_INTERSECT` | 32 | 16, 19, 20, 21, 31, 33, 35, 41, 43, 45, 48, 61, 67, 69, 73, 77, 82, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 163, 173, 194, 197 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6) |
| relief-60 default | S5 | `E_INVARIANT` | 1 | 118 | 1 | (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-04 (c-04 S5) |
| relief-60 default | S5 | `E_SELF_INTERSECT` | 42 | 1, 11, 12, 13, 14, 15, 18, 23, 25, 30, 34, 39, 42, 44, 47, 62, 64, 65, 70, 72, 74, 75, 81, 84, 91, 95, 108, 109, 113, 133, 142, 153, 154, 156, 162, 175, 178, 184, 190, 193, 196, 198 | 2 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-04 (c-04 S4, BX in flight) |
| relief-60 default | S6 | `E_INVARIANT` | 2 | 172, 183 | 2 | settlementPerimeter: the overlay's outer ring is not the boundary's offset (the sum check failed) | M0-e-04 (e-04 S4; Q133, J636) |
| relief-60 coarse | S3 | `E_SELF_INTERSECT` | 32 | 16, 19, 20, 21, 33, 35, 41, 44, 45, 48, 62, 67, 69, 73, 76, 82, 84, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 149, 153, 163, 194 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6) |
| relief-60 coarse | S5 | `E_INVARIANT` | 2 | 118, 151 | 2 | (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-04 (c-04 S5) |
| relief-60 coarse | S5 | `E_SELF_INTERSECT` | 41 | 1, 9, 12, 13, 14, 15, 18, 23, 30, 31, 34, 38, 39, 42, 47, 65, 70, 72, 74, 81, 88, 97, 108, 109, 113, 114, 133, 142, 154, 162, 169, 173, 175, 178, 184, 188, 193, 196, 197, 198, 199 | 2 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-04 (c-04 S4, BX in flight) |
| relief-60 coarse | S6 | `E_INVARIANT` | 1 | 183 | 1 | settlementPerimeter: the union: insert: no route from (84990, 17737) to (85614, 18940) keeps clearance (§3.10) within the fidelity bound (N-43); class W (notBuilt #2, M4): the design route's farthest vertex (85442, 18765), 82.7 cm off | M0-e-04 (e-04 S4; Q133, J636) |
| relief-3000 default | S1 | `E_INVARIANT` | 1 | 184 | 1 | S1 water: the river's ring was refused on the kernel's polygons (the fast ring: offset: a pocket inside a pocket); no further rung — the kernel's ring not clear (rings meet) | M0-e-03 (e-03 S4) |
| relief-3000 default | S3 | `E_DEGENERATE` | 25 | 6, 7, 10, 12, 13, 23, 25, 38, 50, 58, 60, 69, 78, 91, 100, 127, 138, 158, 165, 166, 179, 180, 189, 194, 199 | 1 | empty | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6; new since S2) |
| relief-3000 default | S3 | `E_SELF_INTERSECT` | 4 | 4, 49, 54, 168 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6) |
| relief-3000 default | S4 | `E_INVARIANT` | 1 | 109 | 1 | S4: the spines' batch was refused (E_INVARIANT: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency)); on the lattice courses too: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-03 (c-03 S5) |
| relief-3000 default | S5 | `E_DEGENERATE` | 2 | 21, 59 | 1 | empty | M0-c-04 (c-04 S5; new since S2) |
| relief-3000 default | S5 | `E_INVARIANT` | 3 | 32, 81, 188 | 1 | (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-04 (c-04 S5) |
| relief-3000 default | S5 | `E_SELF_INTERSECT` | 20 | 9, 17, 33, 70, 80, 85, 88, 96, 99, 104, 106, 121, 136, 144, 150, 157, 162, 171, 183, 196 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-04 (c-04 S4, BX in flight) |
| relief-3000 default | S6 | `E_INVARIANT` | 1 | 77 | 1 | settlementPerimeter: the union: insert: no route from (57479, 80625) to (57861, 82606) keeps clearance (§3.10) within the fidelity bound (N-43); class D (notBuilt #2, M4): the design route's farthest vertex (57520, 81408), 108.0 cm off | M0-e-04 (e-04 S4; Q133, J636) |
| relief-3000 coarse | S3 | `E_DEGENERATE` | 25 | 6, 7, 10, 12, 13, 23, 25, 38, 50, 58, 60, 69, 78, 91, 100, 127, 138, 158, 165, 166, 179, 180, 189, 194, 199 | 1 | empty | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6; new since S2) |
| relief-3000 coarse | S3 | `E_SELF_INTERSECT` | 4 | 4, 49, 54, 168 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-01 / M0-c-02 (c-01 S4, c-02 S6) |
| relief-3000 coarse | S4 | `E_INVARIANT` | 1 | 109 | 1 | S4: the spines' batch was refused (E_INVARIANT: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency)); on the lattice courses too: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-03 (c-03 S5) |
| relief-3000 coarse | S5 | `E_DEGENERATE` | 2 | 21, 59 | 1 | empty | M0-c-04 (c-04 S5; new since S2) |
| relief-3000 coarse | S5 | `E_INVARIANT` | 3 | 32, 81, 188 | 1 | (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency) | M0-c-04 (c-04 S5) |
| relief-3000 coarse | S5 | `E_SELF_INTERSECT` | 21 | 9, 17, 33, 70, 80, 85, 88, 96, 99, 104, 106, 121, 136, 144, 150, 157, 162, 171, 183, 184, 196 | 1 | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) | M0-c-04 (c-04 S4, BX in flight) |
| relief-3000 coarse | S6 | `E_INVARIANT` | 1 | 77 | 1 | settlementPerimeter: the union: insert: no route from (57479, 80625) to (57861, 82606) keeps clearance (§3.10) within the fidelity bound (N-43); class D (notBuilt #2, M4): the design route's farthest vertex (57520, 81408), 108.0 cm off | M0-e-04 (e-04 S4; Q133, J636) |

### The per-stage work blocks (Q118) and the worklimits dry run

**Before the round** (S2's summary, `corepack pnpm bench -- worklimits --date 2026-10-30`, exit 1): 29 rows unbounded,
20 of them e-06's. Every e-06 stage row lacked blocks, for example "M0-e-06 groups/0 (relief-60/default) S3: 535
batches, E_WORK_LIMIT before 0, after UNBOUNDED — no block for insert.points, insert.attractQueries,
insert.placementCandidates, insert.crossings, tx.facesWalked, route.nodes (never counted as 0)".

**After, read as the committed reader reads it** (the same command on the regenerated summaries, exit 1): still 29 rows
unbounded and the same 20 e-06 rows, for example "M0-e-06 groups/0 (relief-60/default) S3: 536 batches, E_WORK_LIMIT
before 0, after UNBOUNDED — no block for insert.points, …, route.nodes". The reason is that `e06Groups` in
`bench/src/worklimits/fit.ts` reads `groups[i].work[counter]` with one `stage` per counter. The five kernel counters are
charged at five stages, so one entry per counter cannot carry them, and that block's shape is S2's committed format.
The new blocks are in `groups[i].stageWork[stage][counter]`. **REPORTED (M0-f-03b's file):** the reader's one-loop
change is to read `stageWork[stage]` as the stage's blocks where a group has it, and `work` otherwise.

**After, read in the reader's form one stage per group** (`fitWorkLimits` on the committed summaries with each e-06
group's `stageWork[stage]` as a group of its own; `summary.test.ts` pins it, and the probe `longrun-M0-e-06-s3/probe/wl-perstage.mts`
printed it): **20 e-06 rows, 0 unbounded**. Every row is "after ≤ 0 = 0.000 per 1 000" except "groups/8 (relief-60/coarse
S5) S5: 1300 batches, after ≤ 2 = 1.538 per 1 000". That is above the 1 per 1 000 target at v2's coefficients, which is
f-03b's re-fit to judge. The 9 rows left unbounded are M0-c-06's (Q118's other owner).

A fault the fold met and fixed in this round: S5 issues **declared batches with no op** (137 on relief-60 default: the
kernel returns ok with no record, no work and no counts). The first fold counted them as kernel samples, giving n 1 435
against the stage's batches row of 1 298. A kernel block's samples are now the batches committed or refused, which is
the reader's population. The `fold.test.ts` case pins it, and mutant R118f puts the old count back.

**N-s2-2 restated with the new units** (the floor law's thin-sample warning stays). route.nodes per stage, n samples
(of which charged), on relief-60 default / coarse / relief-3000 default / coarse:

* S3: 168 (168) / 168 (168) / 170 (170) / 171 (171).
* S4: 168 (51) / 168 (48) / 169 (2) / 170 (1).
* S5: 125 (125) / 125 (125) / 144 (144) / 144 (144).

S3's and S5's blocks rest on every derivation that reached the stage. S4's rests on the same few charged derivations
as S2's (50 / 48 / 2 / 1 units then). Its p999 (1.017 / 1.168 / 1.736 / 0.408 per lattice node) is still the maximum
of a handful on relief-3000. growth.* at S5 is one sample per S5c record (375 / 375 / 432 / 432). Its relief-60 coarse
p999 is 98.9 per hectare against 2.7 – 3.6 elsewhere, an outlier for f-03b's fit to read.

### The anchor's scope and the re-run rule (Q36; C-0453)

* **Strict: `harness`.** Any edit under `bench/src/site` makes `summary.test.ts` red until the summary is re-derived
  and re-folded. The harness is the code that derives, reads and folds the records.
* **Behavioural: `canary`.** One CITY derivation (relief-60 coarse seed 46, chosen without a clock as the least-work
  record that ends every stage ok) is re-derived and compared by sha256 of its record. A landing in any package the
  spike derives through that moves this record (an outcome, a batch's work or limit, a receipt) is red. That is the Q36
  class caught by behaviour, at the cost of one derivation per NEAR or RELATED run that selects the file (about 2 – 5
  minutes at W=1).
* **Reported: `sources` and `tree`.** sha256 over `bench/src/skeleton`, `packages/{kernel,layout,model,site,tables}/src`
  and `packages/tables/data` (348 files). A move prints a warning naming the file counts and is never failed on.
* **The trade-off, REPORTED for the session's ruling.** A strict source digest would be red at every landing of every
  stage item, whether or not the summary moved, and that item could not clear it (the summary is this item's file). The
  canary misses a landing that moves only seeds other than 46: for example a fix of S3's `E_DEGENERATE` class on
  relief-3000 changes the census and leaves seed 46 equal. The builder proposes the harness strict plus the canary
  behavioural plus `sources` reported as the anchor's scope, with **Q36's standing re-run procedure kept as the rule
  for every other landing in `sources`** (the session re-runs the 200-seed summary after a stage landing that can move
  an outcome). One cheap widening is open to the session: a second canary chosen among the refused records (one more
  derivation). The builder did not build it, because which refusal class should be held is the session's routing.
* **A consequence the session should weigh.** `summary.test.ts` imports `bench/src/site`, which imports every package
  the spike derives through, so any stage item's RELATED run selects it (it did in S2 too). A landing that moves the
  canary is then red in that item's RELATED run on a file it cannot edit. The red is sound (the committed summary is
  stale), and its remedy is this item's re-run, which the landing item reports.

### The refusal census (J264 (4), N-58) and verdicts (J290)

The registered family is the spike's seed sweep (800 derivations). **Before → after the round on this tree: 267 → 267
refused derivations.** The round changed no code that derives. The watched façade only reads the overlay's tally and the
population, and `compose.test.ts` holds its stage roots equal to `runBase`'s. A probe without the harness, `runBase` at
CITY on relief-3000 default seeds 6, 127 and 199 (the new S3 `E_DEGENERATE` class) and 21 (S5 `E_DEGENERATE`), refuses
the same stages with the same codes (`longrun-M0-e-06-s3/probe/base.mts`). **Against S2's committed file the census
rose 251 → 267** (relief-60 78 / 77 → 77 / 76; relief-3000 48 / 48 → 57 / 57). The rise belongs to the tree, from the
landing named above, not to this round. Every class is OUR OWN INTERMEDIATE, MAKE-IT-SUCCEED, and is routed with its
seeds to its owner (the table above). This item's own code refuses nothing in the family: no bug and no throw, and the
harness ran all 800 to a record.

### The round's mutant table (J169, J183)

13 targeted mutants (R36d swaps the summary file), run in the lane mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-e-06-fix-s3`. Isolation was proven: no link out of the mirror, and
`@plat/*` resolves inside it. Each mutated file was restored from the tree and checked `cmp`-equal after each run. The
evidence (`sweep/mutants.json`, `results*.txt`, `<id>.log`, `p2-<id>.log`, `p3-<id>.log`) was removed with the mirror,
and its lines are quoted here.

* **Pass 1** (J183's form: `vitest run --maxWorkers=1 --bail=1 bench/test/site`, the whole folder): **13 of 13 red.**
* **Pass 2** (the harness mutants on `fold.test.ts`, `summary.test.ts` and `compose.test.ts`, with the harness digest's
  test excluded by `-t`, to name each row's content pin; the unmutated base ran 76 passed and 1 skipped): R122c
  survived. The record's runner detail had no content pin, because the canary record is all-ok and carries no refusal.
  The round added the pin "relief-60 default seed 2 (test size) refuses at S5 …" and the record-rows pin to
  `compose.test.ts`.
* **Pass 3** (`compose.test.ts` alone, after the new pins): R122c, R118d and R118e red. **No survivor.**

| id | aimed at | mutation | pass 1: first red (folder) | the content pin (pass 2 / 3) |
|---|---|---|---|---|
| R122a | Q122: the seeds sorted | a class's seeds left in record order | summary "the harness … is byte for byte …" | fold "a class per stage and code: its seeds sorted, …" |
| R122b | Q122: the message once | `message: null` | the harness digest | fold "a class per stage and code: …, the lowest seed's message" |
| R122c | Q122: the record carries the runner's detail | the record's `refusals` left empty | the harness digest | compose "relief-60 default seed 2 (test size) refuses at S5: the record names S5 with the runner's code and its detail text …" (pass 3; pass 2 survived) |
| R118a | Q118: a kernel counter's samples are the stage's batches | the kernel samples dropped | the harness digest | fold "a stage's blocks: a kernel counter one sample per batch …" |
| R118b | Q118: the block's unit is the table's | every block's unit `vertices` | the harness digest | fold "a stage's blocks …" |
| R118c | Q118: the units read back from the limit | units = the limit | the harness digest | fold "the five kernel laws summed over one count, inverted …"; the canary |
| R118d | Q118: route.nodes at S3 | S3's stage row dropped | the harness digest | compose "relief-60 default seed 1 (test size): every façade batch in kernelBatches …" (pass 3); the canary |
| R118e | Q118: the batch's counts read from its overlay | `counts: {}` | the harness digest | compose (pass 3, as R118d); the canary |
| R118f | Q118: no-op batches are no samples (n = committed + refused) | the `committed \|\| code` filter dropped | the harness digest | fold "a stage's blocks …" (the no-op case) |
| R36a | Q36: the canary ends every stage ok | the canary's key ignores the outcomes | the harness digest | fold "the canary is a record that ends every stage ok …" |
| R36b | Q36: a changed harness makes the summary stale | a comment edited in `compose.ts` | summary "the harness (bench/src/site) is byte for byte …" | (the pin itself) |
| R36c | Q36: a stage change that moves the canary makes the summary red | S6's batch limit +1 vertex (`layout/src/districts/stage.ts`) | summary "the canary CITY record re-derived on this tree is the run's …" (89.9 s) | (the pin itself) |
| R36d | Q122 / Q118 / Q36: S2's summary (counts only, no blocks, no anchor) | the S2 summary restored | summary "every refusal class of every group …" | (also: the blocks, the anchor) |

Equivalent survivors: none.

### Gates

Every gate exits 0 on the final tree at W=1 (Node 24.12.0, machine id `linux:Intel(R) Xeon(R) Processor @ 2.10GHz:4cpu:16gib`):

* `corepack pnpm install --frozen-lockfile`: 0.
* `lint`: 0 (`lint: probe-red ok`, `lint: bench-boundary ok`).
* `build`: 0.
* NEAR `vitest run --maxWorkers=1 bench/test/site`: 7 files, 98 tests, exit 0 (1387 s). The two `compose.test.ts`
  pins were added after it. `compose.test.ts` alone then ran 12 of 12, exit 0 (149 s).
* RELATED@1000 `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1
  bench/src/site/{anchor,compose,index,receipts,report}.ts`: 11 files (the 7 of `bench/test/site` and the 4 of
  `bench/test/timing-phase`, which reaches `compose.ts` through `gate-stages.ts` and `workloads.ts`), 158 tests, exit 0
  (1411 s). No file under `packages/*/src/` changed.
* The item's here-bar is the harness: the 200-seed run above, every bar verdict reported. `countLaw`, `gateWards` and
  `corpus` fail as before, which are the exit bars' standing failures and not this round's.
* The worklimits dry run is quoted in the Q118 section. It exits 1, as before the round, for the reader's reason
  REPORTED there.

### Notes for the session (no row of this round; each with its evidence)

* **N-s3-1 (new classes since S2):** relief-3000's S3 `E_DEGENERATE` with detail `empty` (25 seeds in both
  configurations) and S5 `E_DEGENERATE` `empty` (seeds 21 and 59) are new, and S3's `E_INVARIANT` class of 13 is gone.
  The bare detail `empty` names no rung. The likely source is the enceinte's rungs (`layout/src/enceinte/rungs.ts`
  refuses `E_DEGENERATE` `empty` when the re-offset leaves nothing), which the builder read and did not trace. This
  goes to c-01 S4 / c-02 S6 (S3) and c-04 S5 (S5) with the seeds above.
* **N-s3-2 (the reader):** the worklimits reader reads one stage per counter (`e06Groups`, and `c06Groups` alike).
  f-03b's re-fit reads e-06's blocks only after the one-loop change above. Until then the committed dry run stays exit
  1 on e-06's 20 rows, whatever this summary carries.
* **N-s3-3 (the hit rate at v2):** read per stage, relief-60 coarse S5 is 1.538 per 1 000 batches at the shipped
  coefficients, over the target of 1. This is for f-03b's re-fit.

## Closing check of hardening round S3 (lane `check/M0-e-06-close-s3`, 2026-10-31): notes 22 – 25

None of these fails the round (the blocker rule; N-45). Verdict: `checks/M0-e-06-s3.md`. Evidence lives in
`/home/user/maps-scratch/waves/check-M0-e-06/` (`mut/results.txt` and `mut/<id>.log`, `probe/`, `out/`).

| # | note | evidence | route | label |
|---|---|---|---|---|
| 22 | **`fold.test.ts` holds the refusal class's key (stage × code) only indirectly.** No hand record set has two codes at one stage, so the checker's mutant C3 (the class keyed by the stage alone, codes merged) passes `fold.test.ts` 55 / 55. It is still killed twice: by the harness digest (any edit under `bench/src/site` is red until the summary is re-run) and, with the summary re-folded under it, by `summary.test.ts`'s class check (relief-60 default S5 merged into one class of 43 against `refused` E_INVARIANT 1 + E_SELF_INTERSECT 42). A direct pin is one hand case: two records refused at one stage with different codes give two classes. | `mut/C3.log` (exit 0), `mut/C3b.log` (exit 1, the re-folded summary) | M4 (a hardening test) | CONFIRMED |
| 23 | **The S2 → S3 attribution names one landing; the lane log shows two after S2's run began.** The notes say "the only landing in the derivation's package sources since S2's run is `build/M0-c-02-fix-s5`". S2's 800-run started 2026-10-27 17:00 in its own mirror, and `build/M0-x-04-fix-s1` landed `layout/src/pipeline/base.ts` at 21:19 that day (its S6 soft check, S8 and registration order; f-03b's 00:00 landing left `workLimits.json` byte-identical). Whether S2's mirror carried x-04's edit is not recorded. The moved classes are the enceinte's (S3 and S5 F-WALL, the new `E_DEGENERATE` `empty`), so the c-02 S5 attribution is plausible, but it is not bisected. The owners' briefs should cite the seeds, not the attribution. | `docs/lane-events.log` lines of `build/M0-e-06-fix-s2` (17:00 start, 03:18 done), `build/M0-x-04-fix-s1` LANDED 21:19, `build/M0-c-02-fix-s5` LANDED 07:30 / 07:47 | the session | PLAUSIBLE |
| 24 | **The new `E_DEGENERATE` classes are the stages' own, confirmed by fresh derivations.** relief-3000 default seed 6 (S3, detail `empty`) and seed 21 (S5, `empty`) re-derived at CITY on the tree equal the store's records, and `runBase` without the harness on seed 6 gives the same stage roots S1 – S6 and the same bug (`S3 E_DEGENERATE`). Lawful-input refusals (OUR OWN INTERMEDIATE, MAKE-IT-SUCCEED): S3 ×25 per configuration to c-01 / c-02, S5 seeds 21 and 59 to c-04, with the seed lists of the round's table. The bare detail `empty` names no rung (the builder's N-s3-1). | `out/d0.log`, `out/d2.log` (`EQUAL to store`; `BASE … roots S1:eq … BUGS-EQ`) | the session (c-01 / c-02, c-04) | CONFIRMED |
| 25 | **A class's `message` is the lowest seed's text only; a class with two texts hides the second failure site.** relief-60 coarse S5 `E_INVARIANT` (seeds 118, 151; `messages` 2) carries seed 118's "(wall, enceinte:2) branches: a linear role forms simple chains or rings …"; seed 151, re-derived, refuses with "S5a: the gate vertices could not be put on their ways …", a different site under the same code. relief-60 default S5 `E_SELF_INTERSECT` and S6 `E_INVARIANT` also carry 2 texts. The brief asked for the message once per class, which is met; an owner routed by the message alone would miss the second site. A tightening: each distinct text with its seeds. | `out/d0.log` (relief-60 coarse 151); the committed summary's `messages` | M4, or the owners' rounds (c-04 S5, e-04 S4) reading the seeds | CONFIRMED |

## Hardening round S4 (lane `build/M0-e-06-fix-s4`, 2026-11-10 – 11; the session's round J751 on the rows the second re-triage found still open: e-06:25, Q137, e-06:rerun (Q122's batched re-run, with Q173 and Q174 read from it); J237 (2), J238, J264 / N-58, J290, J263 Q1 / Q6, N-45, J758; choices C-0480). The builder's row-by-row outcome

**For the session, first: no refusal class ROSE against S3's committed lists, in any group; no seed joined any class.**
The stages' refusals on the 800 CITY derivations fell from **267 refused derivations to 12** (S3 `ecbc8c92…` → S4
`fe78d514…`). One class held its count but **changed its failure site**: relief-3000 S5 `E_INVARIANT` (seeds 32, 81,
188, both configurations) carried one text at S3 ("(wall, enceinte:2) branches …"); on this tree seeds 32 and 188
refuse with "trace: gate gate:7 / gate:9 is not on the committed trace at its point (§4.2 S3 (9))" and only 81 keeps the
branches text. Q173's `branches` class is therefore relief-60 118 (both configurations) and relief-3000 81 (both) — 4
runs, not 8 — and a new site (the gate-on-trace check, §4.2 S3 (9)) appears on 4 runs. Every remaining class is listed
below with its seeds and texts.

The round stayed inside the item's owns (`bench/src/site/`, `bench/test/site/`, `docs/build/summaries/M0-e-06.json`)
and the permitted appends. It read the stages the spike derives through and edited none of them. The tree is HEAD
`3a5d75b0e235` (read from `.git` files; the round's first seat ran one `git log -1` by mistake at its start, a
working-rule slip disclosed here and in the ledger row L-0776, its output only the hash). Per the brief it carries
M0-c-02 S6 (`4d490aa7`), M0-c-04 S5 (`79cccb90`) and M0-e-04 S5 (`daccc648`); M0-e-03 S4 is not on it. The round ran in
three build seats and two waiter hand-offs (J758): the first seat built the two code lines and launched the re-run; the
container restarted at 492 / 800 and the third seat resumed the run (resumable store, nothing re-derived); this seat
folded nothing anew (the chain folded once), re-pinned four tests (below) and ran the gates.

Sources changed:

* `report.ts`: `RefusalClass.texts` (e-06:25) and the type `RefusalText`.
* `anchor.ts`: `LEDGER_ID_TOKEN`, `normaliseLedgerIds`; `scopeDigest` hashes the normalised bytes (Q137).

`compose.ts`, `fixtures.ts`, `index.ts`, `pool.ts`, `receipts.ts`, `timing.ts` and `worker.ts` are unchanged, so no
record changed: the derivation and its receipts are S3's code. No folder-index or barrel export was added, removed or
renamed (J263 Q1: `index.ts` byte-identical; the new names are exported by `report.ts` and `anchor.ts` only). No message
text changed (J263 Q6).

Tests:

* `fold.test.ts`: the S3 class case gains `texts` in its expectations; a new case "hardening round S4 (note 25)" —
  relief-60 coarse S5 `E_INVARIANT`'s two sites (seed 118's branches text, seed 151's S5a text), a record with no
  detail, the records' order reversed.
* `summary.test.ts`: the census test checks each class's `texts` against the committed summary (they partition the
  seeds, by lowest seed, the first is `message`, the non-null ones number `messages`); a new case "hardening round S4
  (Q137)" copies `bench/src/site` to a temporary root, renumbers citations in five files (choices ids in comments and in
  a message text, notes ids) and a ledger id, and asserts the digest equal to the tree's; then edits a constant's digit
  and the anchor's own placeholder and asserts it moved; and unit cases of `normaliseLedgerIds` (a fifth digit, an id
  inside a word, three digits, `M0-c-0453` stay as they are).
* **Re-pinned (a foreign shift, not a defect; this seat):** four tests whose premise was "relief-60 default seed 2 (test
  size) refuses at S5" went red on this tree because seed 2 now commits every stage (the stage landings since S3; a
  probe of relief-60 default seeds 1 – 20 at the test size: every one commits S1 – S6). NEAR and RELATED@1000 of the
  chain (2026-11-11 21:26 – 22:39Z) were red on exactly these four and nothing else. Diagnosed by a probe on seed 2: S5's
  `enceinte:2` crosses the river at water gates of its own (`gate:w2`, `gate:w3`), so the arena's wall has 4 wet edges
  for stage 1's 2 water gates; with S5's walls handed to the receipt (as `runRecord` hands them) the receipt reads 4
  gates, 4 wet edges, 4 gated, 8 ends on the shore, 0 strip vertices in the water — the receipts are right and
  unchanged. The re-pins keep each claim:
  * `compose.test.ts` (Q122's refused-record pin): the refused record is relief-3000 default seed 1 at the test size
    (S5 `E_INVARIANT` on this tree); the class's expectation gains `texts` (it had not been reached since S4's
    `texts`); the test's title names the new seed.
  * `spike.test.ts` "relief-60, seed 2: two water gates …": the water gates are stage 1's and S5's (the model's
    `gates`, deduplicated by id); every wet wall edge is one gate's, each gate one edge between its two shore ends; "N
    unchanged" still reads stage 1's list; the receipt is called with `s5Walls(d)`.
  * `spike.test.ts` "the strip receipt is not blind …": the strips are both enceintes' and the receipt is called with
    `s5Walls(d)` (without them it reads `enceinte:2` as an arena-only enceinte and counts its strips under
    `stripOwner`, which the test's count did not include: 466 against 138).
  * `spike.test.ts` containment "… S5 refused, S6 not reached …": the arena S4 left is relief-3000 seed 1's (test size;
    S5 refused, S6 not reached on this tree); the title names the new seed.
  The two new seeds are refusals of other items (the `branches` class, Q173): when their owner makes them commit, the
  two pins go red again and are re-pinned the same way (a note for the session, N-s4-3). `bench/test/` is outside the
  anchor's harness scope, so the recorded digest stands.

### Row-by-row outcome

| row | outcome | what changed | the pin (test) | mutants (red on it) |
|---|---|---|---|---|
| e-06:25 (note 25: a class keeps one message) | **FIXED** | Each class gains `texts`: every distinct detail text with its seeds, ordered by each text's lowest seed (so `texts[0].text` is `message`), a record with no detail apart under `null`; the entries' seeds partition the class's seeds and the non-null ones number `messages`. `message` and `messages` are kept as S3 wrote them. On the new summary relief-60 coarse S5 `E_INVARIANT` names both sites (118 branches; 151 S5a) and relief-3000 S5 `E_INVARIANT` three (32 and 188 the gate-on-trace texts, 81 branches). | `fold.test.ts` "hardening round S4 (note 25): a class with two failure sites names both …"; the S3 case "a class per stage and code …"; `summary.test.ts` "every refusal class of every group: … every distinct text with its seeds" on the committed summary | M25a (S3's fault: the lowest seed's text for every seed), M25b (no texts), M25c (texts by text, not by seed), M25d (a no-detail record folded into the lowest text) |
| Q137 (the harness digest moves on a citation renumber) | **FIXED** | `scopeDigest` hashes each file's bytes after `normaliseLedgerIds`: every whole token `C-dddd`, `L-dddd`, `N-d…` (the ids the ID RULE renumbers, C-0104) becomes `C-#`, `L-#`, `N-#`; every other byte is kept (read as latin1, one character per byte). The row's first alternative is taken (the tokens normalised, not the comments stripped): the ID RULE renumbers exactly these tokens, and a comment stripper over TypeScript (strings, templates, regular expressions) would itself be a source of a silently wrong digest. The recorded digest was computed once under the new rule, at the re-run's fold: `af842628ee94d2b1…` (S3's raw `0d3b722a…`). | `summary.test.ts` "hardening round S4 (Q137): a citation renumber in a copy of the harness keeps its digest; an edit of its code moves it"; "the harness (bench/src/site) is … the code the summary was derived and folded with" (the recorded digest) | M137a (S3's raw digest), M137b (every digit run normalised: a code digit edit invisible), M137c (only `C-` ids), M137d (no word boundaries) |
| e-06:rerun (Q122's batched 200-seed re-run) | **FIXED: the summary regenerated on this tree** | `docs/build/summaries/M0-e-06.json` re-derived (800 derivations) and folded once under the final harness; sha256 `fe78d51420ee96f3cc9806ba70497aa829a27cc0edea9f86482566597ea55af0`; the comparison with S3 below | `summary.test.ts` whole: the harness digest (new rule), the canary re-derived on the tree, the classes' texts, the counts and blocks | MS3 (S3's committed summary restored) |

### The re-run (the 200-seed CITY summary on this tree)

* 800 derivations (200 seeds × relief-60 / relief-3000 × default / coarse, CITY), S2's resumable driver and store, four
  processes, in the lane's mirror `/home/user/maps-scratch/waves/longrun-M0-e-06-s4/plat` (a copy of the tree, no link
  out). Started 2026-11-10 07:23Z; the container restarted with 492 stored (last write 11:21Z); resumed 2026-11-11
  18:47Z from the store (nothing re-derived); 800 / 800 at 21:25Z.
* The run's sources against the tree's at the end: `diff -rq` of `bench/src` and `packages/*` (without `node_modules`,
  `dist`) empty (rc 0), and equal again at the re-entry of 11-11 18:47Z, so all 800 stand on one tree.
* The fold: the tree's `foldReport` / `summaryOf` / `anchorOf` over the store, 800 folded, none refused. Anchor: `tree`
  `3a5d75b0e235d714e9ca23e3ac0ca0a0dba16da8`; `harness` (9 files) `af842628ee94d2b179fd1d88141889b499b4b6559404764861de1fbf3a505e15`;
  `sources` (350 files) `82533cfeac695df42b7d06abe94caffcaa780108bb68055238d4488ffe58a60c`; canary relief-60 coarse seed
  46 (as at S3), record `eb2046dd…` (equal to S3's: that derivation did not move).
* **Bar verdicts unchanged:** pass d8, bedMonotone, carve, noClamp, reliefAsNamed, waterGates, spans, containment,
  fieldBands, weightZero; fail countLaw, gateWards, corpus (as S3; `pass` false). relief-3000's waterGates (both) and
  coarse spans stay `unobserved` as at S3. The observed populations grew with the commits (e.g. relief-60 default
  containment 123 → 199 derivations, waterGates 37 → 43).

| group | refused derivations S3 → S4 | S3 ok | S4 ok | S5 ok | S6 ok |
|---|---|---|---|---|---|
| relief-60 default | 77 → 1 | 168 → 200 | 168 → 200 | 125 → 199 | 123 → 199 |
| relief-60 coarse | 76 → 2 | 168 → 200 | 168 → 200 | 125 → 198 | 124 → 198 |
| relief-3000 default | 57 → 5 | 170 → 199 | 169 → 198 | 144 → 195 | 143 → 195 |
| relief-3000 coarse | 57 → 4 | 171 → 200 | 170 → 199 | 144 → 196 | 143 → 196 |

(S1 ok 200 / 200 / 199 / 200, unchanged; the S4-ok column is the S4 stage's.)

### Every refusal class, S3 → S4, seed for seed (with each distinct text and its seeds)

"left" = in S3's list, not refused in this class now (every such seed now commits every stage: no S4 seed is refused
or not reached outside the classes below); "joined" = none in every class. Attribution: the landing whose notes name
the seed as committing after it; else "not attributed".

| fixture, configuration | stage, code | S3 → S4 | left (seeds) | texts now (seeds) | attribution of the moves |
|---|---|---|---|---|---|
| relief-60 default | S3 `E_SELF_INTERSECT` | 32 → 0 | 16, 19, 20, 21, 31, 33, 35, 41, 43, 45, 48, 61, 67, 69, 73, 77, 82, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 163, 173, 194, 197 | — | M0-c-02 S6 (`checks/M0-c-02-s6.md`: `s3seeds.test.ts` 122 / 122 commit at S3). Seed 31 then refused at S5 on c-02's base (its N-59, the anchor rung); it commits here: not attributed |
| relief-60 coarse | S3 `E_SELF_INTERSECT` | 32 → 0 | 16, 19, 20, 21, 33, 35, 41, 44, 45, 48, 62, 67, 69, 73, 76, 82, 84, 85, 86, 90, 112, 116, 117, 121, 128, 131, 143, 146, 149, 153, 163, 194 | — | M0-c-02 S6 (as above). Seeds 20, 44, 67 then refused at S5 on c-02's base (N-59); they commit here: not attributed |
| relief-3000 default | S3 `E_DEGENERATE` | 25 → 0 | 6, 7, 10, 12, 13, 23, 25, 38, 50, 58, 60, 69, 78, 91, 100, 127, 138, 158, 165, 166, 179, 180, 189, 194, 199 | — | M0-c-02 S6 (as above). Seed 166 then refused at S6 on c-02's base (N-59, N-61: e-04's `settlementPerimeter`); it commits here: not attributed |
| relief-3000 coarse | S3 `E_DEGENERATE` | 25 → 0 | the same 25 | — | M0-c-02 S6; 166 as above |
| relief-3000 default | S3 `E_SELF_INTERSECT` | 4 → 0 | 4, 49, 54, 168 | — | M0-c-02 S6 |
| relief-3000 coarse | S3 `E_SELF_INTERSECT` | 4 → 0 | 4, 49, 54, 168 | — | M0-c-02 S6 |
| relief-60 default | S5 `E_SELF_INTERSECT` | 42 → 0 | 1, 11, 12, 13, 14, 15, 18, 23, 25, 30, 34, 39, 42, 44, 47, 62, 64, 65, 70, 72, 74, 75, 81, 84, 91, 95, 108, 109, 113, 133, 142, 153, 154, 156, 162, 175, 178, 184, 190, 193, 196, 198 | — | M0-c-02 S6 (N-60: the 32 not in its anchor-rung list); M0-c-04 S5 (§1.1: 13, 84, 156, 162, held); **1, 42, 44, 62, 91, 95 not attributed** (N-60's anchor rung on c-02's base, not named by c-04 S5) |
| relief-60 coarse | S5 `E_SELF_INTERSECT` | 41 → 0 | 1, 9, 12, 13, 14, 15, 18, 23, 30, 31, 34, 38, 39, 42, 47, 65, 70, 72, 74, 81, 88, 97, 108, 109, 113, 114, 133, 142, 154, 162, 169, 173, 175, 178, 184, 188, 193, 196, 197, 198, 199 | — | M0-c-02 S6 (N-60: the 33 not in its anchor-rung list); M0-c-04 S5 (§1.1: 88, 178, 188, 196, 197); **13, 42, 162 not attributed** |
| relief-3000 default | S5 `E_SELF_INTERSECT` | 20 → 0 | 9, 17, 33, 70, 80, 85, 88, 96, 99, 104, 106, 121, 136, 144, 150, 157, 162, 171, 183, 196 | — | M0-c-02 S6 (N-60: 20 → 0); M0-c-04 S5 also names 162, 196 |
| relief-3000 coarse | S5 `E_SELF_INTERSECT` | 21 → 0 | 9, 17, 33, 70, 80, 85, 88, 96, 99, 104, 106, 121, 136, 144, 150, 157, 162, 171, 183, 184, 196 | — | M0-c-02 S6 (N-60: 21 → 0); M0-c-04 S5 also names 162, 196 |
| relief-3000 default | S5 `E_DEGENERATE` | 2 → 0 | 21, 59 | — | M0-c-02 S6 (N-60: 4 → 0 over both configurations) |
| relief-3000 coarse | S5 `E_DEGENERATE` | 2 → 0 | 21, 59 | — | M0-c-02 S6 (N-60) |
| relief-60 default | S5 `E_INVARIANT` | 1 → 1 (held) | — | 118: "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)" | — |
| relief-60 coarse | S5 `E_INVARIANT` | 2 → 2 (held) | — | 118: "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)"; 151: "S5a: the gate vertices could not be put on their ways: S5a: the stage boundary crosses bridge:24's span at (25597, 119863) with 0 of its deck ends on the stage's side; its gate is the bridgehead on that side (N-54 (3))" | — |
| relief-3000 default | S5 `E_INVARIANT` | 3 → 3 (held; **texts 1 → 3**) | — | 32: "trace: gate gate:7 is not on the committed trace at its point (§4.2 S3 (9))"; 81: "(wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)"; 188: "trace: gate gate:9 is not on the committed trace at its point (§4.2 S3 (9))" | the move of 32 and 188 to the gate-on-trace text: not attributed |
| relief-3000 coarse | S5 `E_INVARIANT` | 3 → 3 (held; **texts 1 → 3**) | — | the same three texts on the same seeds | not attributed |
| relief-60 default | S6 `E_INVARIANT` | 2 → 0 | 172, 183 | — | M0-e-04 S4 (`checks/M0-e-04-s4.md`: Q122's S6 class, 5 runs at 172 / 183 / 77, 5 → 0) |
| relief-60 coarse | S6 `E_INVARIANT` | 1 → 0 | 183 | — | M0-e-04 S4 |
| relief-3000 default | S6 `E_INVARIANT` | 1 → 0 | 77 | — | M0-e-04 S4 |
| relief-3000 coarse | S6 `E_INVARIANT` | 1 → 0 | 77 | — | M0-e-04 S4 |
| relief-3000 default | S1 `E_INVARIANT` | 1 → 1 (held) | — | 184: "S1 water: the river's ring was refused on the kernel's polygons (the fast ring: offset: a pocket inside a pocket); no further rung — the kernel's ring not clear (rings meet)" | — |
| relief-3000 default | S4 `E_INVARIANT` | 1 → 1 (held) | — | 109: "S4: the spines' batch was refused (E_INVARIANT: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency)); on the lattice courses too: (way, way:13) branches: a linear role forms simple chains or rings (§3.10 role consistency)" | — |
| relief-3000 coarse | S4 `E_INVARIANT` | 1 → 1 (held) | — | 109: the same text | — |

Refused stage-outcomes 267 → 12; refused derivations 267 → 12 (each refused derivation refuses one stage).

### Named for the session (the brief's (a) – (g)), each with its count and seeds on this tree

* **(a) The S3 classes:** 0 of the 122 S3 runs refuse at S3 (M0-c-02 S6's measure confirmed at CITY on the merged
  tree); none of the 122 refuses later either (c-02's N-59 named 6 that refused later on its base — relief-60 default
  31, coarse 20, 44, 67 at S5, relief-3000 166 × 2 at S6 — all six commit every stage here). No S3 refusal is left.
* **(b) The S5 classes after both landings:** c-04 S5 counted 125 on its own base (relief-60 default 39, coarse 39;
  relief-3000 default 23, coarse 24); on this tree **9** remain (relief-60 default 1, coarse 2; relief-3000 default 3,
  coarse 3), by text: "(wall, enceinte:2) branches …" 4 runs (relief-60 118 × 2, relief-3000 81 × 2); "trace: gate
  gate:7 is not on the committed trace at its point (§4.2 S3 (9))" 2 runs (relief-3000 32 × 2); "… gate:9 …" 2 runs
  (relief-3000 188 × 2); the S5a bridge-span text 1 run (relief-60 coarse 151). F-WALL's `E_SELF_INTERSECT` (112 runs
  on c-04 S5's base by its §1.3; 18 on c-02 S6's by its N-60, the later-rung class) is **0**: no run refuses with F-WALL's
  message on this tree.
* **(c) The `(wall, enceinte:2) branches` class (Q173):** relief-60 118 (default and coarse) and relief-3000 81 (default
  and coarse): 4 runs. relief-3000 32 and 188 (both configurations) no longer refuse with it; they refuse at S5 with the
  same code and the gate-on-trace texts above (a different site under the same code — what note 25's `texts` now shows).
* **(d) `E_DEGENERATE` `empty` on relief-3000 21 and 59 (Q174 (a)):** both commit every stage in both configurations
  (attributed to M0-c-02 S6 by its N-60). The strips' free-piece floor that N-50 names is not reached on these seeds here.
* **(e) relief-60 coarse seed 29 (Q174 (b)):** commits every stage (S1 – S6 ok); in no class. Not attributed.
* **(f) Seed 151's text** (relief-60 coarse, S5 `E_INVARIANT`), verbatim: "S5a: the gate vertices could not be put on
  their ways: S5a: the stage boundary crosses bridge:24's span at (25597, 119863) with 0 of its deck ends on the
  stage's side; its gate is the bridgehead on that side (N-54 (3))". The runner's detail carries no `notBuilt('M3a')`
  token: the REFUSE's milestone is C-0475 (3)'s and `M0.md` §4b's row, not the text (N-s4-2). relief-60 default 151
  commits.
* **(g)** S4: relief-3000 seed 109 (both configurations), 2 runs, text above (M0-c-03's). S6: **0** (closed; M0-e-04
  S4). S1: relief-3000 default seed 184, 1 run (M0-e-03 S4 is not on this tree); relief-3000 coarse 184 commits every
  stage (it refused at S5 at S3).

### The work blocks and the worklimits dry run (Q118 unchanged)

The summary carries `stageWork` in C-0453 (2)'s form on every stage that ran (`summary.test.ts` "every stage that ran
… has a block of n > 0 …", green in NEAR). The committed reader's dry run over the new summary (`corepack pnpm bench --
worklimits --date 2026-11-10`, `PLAT_BENCH_OUT` in the scratch) exits 1 exactly as at S3: "worklimits: 123366
batches; E_WORK_LIMIT before 0 (8 row(s) unrecorded), after ≤ 52 on the bounded rows; worst 1.013 per 1 000 (target
≤ 1); 29 row(s) unbounded" — 20 of the 29 are e-06's (every stage of every group, "no block for insert.points,
insert.attractQueries, insert.placementCandidates, insert.crossings, tx.facesWalked …"), because `e06Groups`
(`bench/src/worklimits/fit.ts`, M0-f-03b's) reads `groups[].work` one stage per counter, not `stageWork` — C-0453's
REPORTED (i), unchanged and not this item's file. Read in the reader's form per stage (`summary.test.ts` "read in
M0-f-03b's reader form, one stage per group, the blocks leave no e-06 row unbounded", green in NEAR on the new
summary), **no e-06 row is unbounded**. No `E_WORK_LIMIT` refusal in any group (before 0).

### The refusal census (J264 (4), N-58) and verdicts (J290)

* **The harness's own failures (bench/src/site):** 0 → 0 — 800 of 800 derivations to a record, the fold refused none.
* **The stages' refusals, REPORTED as measured:** 267 → 12 refused derivations; no class rose (above).
* **Verdicts of the 12** (each LAWFUL input — the registered site fixtures — and each OUR OWN INTERMEDIATE at the stage
  that refuses, so MAKE-IT-SUCCEED for its owner, except 151): S5 `branches` 4 runs and the gate-on-trace texts 4 runs
  (the enceinte's / growth stage's, Q173 → M0-c-04 S6 by the queue; the gate-on-trace site is §4.2 S3 (9)'s check in the
  trace); S5a 151 1 run (REFUSE `notBuilt('M3a')`, M0-c-04's C-0475 (3)); S4 109 2 runs (M0-c-03); S1 184 1 run
  (M0-e-03, its S4 in flight elsewhere). None is this item's code; none is fixed here (the round reads the stages).

### The round's mutant table (J169, J183)

Mutants in the lane mirror `/home/user/maps-scratch/waves/selfcheck-build-M0-e-06-fix-s4` (rebuilt by this seat under
the CONTINUE RULE: `cp -a` of the tree after the re-pins; isolation proven — `find … -lname '/home/user/maps-architecture*'`
empty, `bench/node_modules/@plat/kernel` resolves inside the mirror), each mutated file restored from the tree and
`cmp`-equal after its run; the definitions in `/home/user/maps-scratch/waves/longrun-M0-e-06-s4/mutants.json`, the logs
in `…/out/mut/` (pass 2) and `…/round2/mut/` (pass 1).

* **Pass 2** (the first seat, before the fold, the content pins only: `vitest run --maxWorkers=1 fold.test.ts
  summary.test.ts -t 'hardening round S4|a class per stage and code'`; the unmutated base exit 0): 8 of 8 red, each on
  the pin of its row (below).
* **Pass 1** (J183's form after the re-pins: `vitest run --maxWorkers=1 --bail=1 bench/test/site` in the mirror; its
  base is NEAR in the tree, exit 0): 9 of 9 red (2026-11-12 00:09 – 00:31Z; the mirror equal to the tree before the pass — `diff -rq` of bench/src, bench/test and the packages' src, the summary `cmp`-equal); each `bench/src/site` mutant's first red is the harness digest pin, MS3's the census pin. The chain's first pass 1 (2026-11-11 21:55 – 22:11Z) is void: its base
  was red on the four foreign-shift tests, so every mutant's "first red" was seed 2's water-gate test.

| id | aimed at | mutation | pass 2: the content pin red | pass 1 (folder, bail 1): first red |
|---|---|---|---|---|
| M25a | e-06:25 (the fault) | every seed under the lowest seed's text | fold "a class per stage and code …", fold "hardening round S4 (note 25) …" | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M25b | e-06:25 | no `texts` | the same two | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M25c | e-06:25 | texts ordered by text | fold "hardening round S4 (note 25) …" | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M25d | e-06:25 | a no-detail record under the lowest text | fold "hardening round S4 (note 25) …" | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M137a | Q137 (the fault) | the raw bytes hashed | summary "hardening round S4 (Q137) …" | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M137b | Q137 | every digit run normalised | the same | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M137c | Q137 | only `C-dddd` normalised | the same | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| M137d | Q137 | the tokens without word boundaries | the same | summary "the harness (bench/src/site) is byte for byte the code …" (exit 1, restored `cmp`-equal) |
| MS3 | e-06:rerun | S3's committed summary restored | — | summary "every refusal class of every group …" (`c.texts` undefined on S3's file; exit 1, restored `cmp`-equal) |

Equivalent survivors: none. Every `bench/src/site` mutant is also red on the harness digest pin (any edit there moves
it); pass 2 is the evidence that each row's own content pin kills it.

### Gates (this seat, the tree, W = 1 by `tools/test_budget.py` before each run)

* `corepack pnpm install --frozen-lockfile`: exit 0 ("Lockfile is up to date … Already up to date", 2026-11-12 00:32Z).
* `corepack pnpm lint`: exit 0 — "lint: eslint 1299 files, 0 errors, 0 warnings"; "lint: probe-red ok" (10 probe lines,
  each red under its rule); vendor-scan, repository-path, inline-directives, model-coverage, no-bare-pnpm, licences,
  kernel-boundary, bench-boundary ok; "lint: 9 whole-tree checks" (2026-11-11 22:55Z, after the last edit).
* `corepack pnpm build`: exit 0 — "build: tsc -b ok", esbuild of the six packages.
* NEAR (`vitest run --maxWorkers=1 bench/test/site`, PLAT_FUZZ_RUNS unset, in the tree): exit 0 — "Test Files 7 passed
  (7)", "Tests 102 passed (102)" (1679 s, informative only).
* RELATED@1000 (`PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1 bench/src/site/anchor.ts
  bench/src/site/report.ts`): exit 0 — "Test Files 14 passed (14)", "Tests 209 passed (209)" (1543 s; no J176 file on
  the graph, no foreign red).
* Refusal census (rule (4)): the harness's own failures 0 → 0; the stages' refused derivations 267 → 12 (REPORTED).
* `corepack pnpm landed:verify -- flow-7 --item M0-e-06`: exit 0 — "ok (1 record)" (`docs/build/landed/M0-e-06.json`; the notes recorded as `build-M0-e-06-notes`).

### Notes for the session (no row of this round; each with its evidence)

* **N-s4-1 (KI, M4: a renumber inside a string literal):** the normalisation is over the whole file, so a citation
  renumbered inside a message text (`compose.ts`' "(C-0264 (9))", `timing.ts`' "(C-0082)", "(C-0080)", "(C-0047)")
  also keeps the digest, while the record's detail text would carry the new id. The ID RULE renumbers only a landing's
  new row and the harness's literals cite old rows, so no landing reaches it today; it fails safely (the summary's text
  keeps the old id, no outcome moves). A tightening is to normalise only outside string literals.
* **N-s4-2 (session; c-04):** seed 151's runner detail (above) names no `notBuilt('M3a')`; J290 asks a REFUSE with no
  alternative to be a numbered notBuilt milestone, and the record a user or a summary reads shows only "(N-54 (3))".
  Not this item's text (`growth/boundary.ts:676`, M0-c-04's).
* **N-s4-3 (session; this item's next round):** two of the re-pinned tests (`compose.test.ts`' refused record and
  `spike.test.ts`' containment arena) now stand on relief-3000 seed 1 at the test size, which refuses at S5 with the
  `branches` text (Q173). When Q173's owner makes it commit, those two go red with no defect of the harness and are
  re-pinned again (another refusing seed, or a hand-built refusal), as this round did for relief-60 seed 2.
* **N-s4-4 (session; c-02 / c-04):** the gate-on-trace texts on relief-3000 32 and 188 ("trace: gate gate:N is not on
  the committed trace at its point (§4.2 S3 (9))") are a site no S3-era record carried on these seeds; the `branches`
  class was 8 runs on S3's tree and on c-02 S6's and c-04 S5's bases, and is 4 here. Not attributed by any landing's
  notes; derive relief-3000 default 32 at CITY to read it.

## Closing check of hardening round S4 (lane `check/M0-e-06-close-s4`, 2026-11-12): notes 26 – 27

None of these fails the round (the blocker rule; N-45). Verdict: `checks/M0-e-06-s4.md`. Evidence lives in
`/home/user/maps-scratch/waves/check-M0-e-06/` (`mut/<id>.log`, `mut/run.log`, `q137/probe.mts`, `refold.mts`, `sample.log`).

| # | note | evidence | route | label |
|---|---|---|---|---|
| 26 | **The summary's content past the canary is held by its own consistency only: a consistent edit of a class survives `summary.test.ts`.** The checker's mutant KRb folds relief-3000 default S5 `E_INVARIANT`'s three texts (32 and 188 the gate-on-trace texts, 81 the branches text) back to one text with `messages` 1 — exactly note 25's fault, written into the committed file with every count kept consistent — and `summary.test.ts` (every test but the canary's) stays green: the harness digest pins the code, the canary pins one ok record, the census test pins the file's internal laws, and nothing re-derives a refused record. Only a re-fold of the store (this check's `refold.mts`: byte-equal) or a re-derivation of a class's seed sees it. A deliberate-writer escape (the summary is written by `bench -- site --summary`, never by hand), C-0453's stated trade-off. A hardening: a second canary drawn from the refusal classes (the lowest seed of the largest class, its record digest recorded beside the ok canary's), at one more CITY derivation per run of the test. | `mut/KRb.log` (12 passed, 1 skipped, exit 0); `mut/summ.py` | M4 (C-0453's anchor scope; the session's ruling) | CONFIRMED |
| 27 | **`LEDGER_ID_TOKEN`'s `\bN-\d+\b` also matches code: an identifier `N` minus a literal (`a[N-1]`) is normalised, so an edit `N-1` → `N-2` would keep the harness digest.** No such expression is in `bench/src/site` today (grep of every non-comment line: the only ledger-shaped tokens outside comments are citations inside message strings, N-s4-1's case), so no edit of today's code escapes; a contrived future escape, and with N-s4-1 the same tightening covers both: normalise the tokens only inside comments (and, if the session wants, string literals), or require a citation context (`(`, `;`, a space or `§` before the token). | own grep of `bench/src/site/*.ts`; `q137/probe.mts` (every listed edit moves or keeps the digest as stated) | M4 (with N-s4-1) | CONFIRMED (the regex) / PLAUSIBLE (no escape today) |
