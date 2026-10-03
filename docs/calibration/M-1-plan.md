# M-1 plan — calibration and the clean-room inputs (research side)

Lane `catchup/m1-plan`, 2026-10-03, on the owner's Mac (§12.1's reference machine). **A plan only: nothing was captured
and nothing was written into `plat/`.** This file and `M-1-work.json` beside it are research-side records; implementer
seats do not read them (`plat/CLEAN-ROOM.md` rule 2). They carry metric ids and numbers of our own, no reference word
list, grammar, palette or identifier.

**Outcome.** Of §16 M-1's deliverables, about half are pure computation on captures already on disk (the NG vertex
captures of 2026-09-25, the two FTG CITY payloads, the MFCG exports and size sweep of 2026-09-25); the rest need three
new capture programmes — the MFCG sweep by V12 §3.2.1's seed formula (35 exports, ≈ 5 minutes of wall time, ≈ 325 MB),
FTG's six free captures (one per day, six days, ≈ 170 MB) and an NG recording programme at three sizes (44 generations,
≈ 450–600 MB). Every new capture touches a third-party site and is therefore **owner-gated** (section 5). The first wave
(section 4) is the capture plan file, FTG's day-1 capture, the MFCG sweep, and the four computations M0 (b) and (c) wait
on. The crossing into `plat/` (section 7) is done by research-side seats only — a baseline seat, a checker seat, a digest
seat, a digest-checker seat and a deny-list seat — through numbers-only files and the seat ledger of `plat/CLEAN-ROOM.md`.
Disk (section 6): ≈ 1.1–1.3 GB of new data, within the brief's under-3-GB rule only with ordering and a check between
folders; the volume read 19 GB free at 03:42 today (CONFIRMED by `df`), up from 2.7 GB at 03:28.

## 0 What was read (CONFIRMED, whole sections)

`docs/ARCHITECTURE.md` §16 (M-1's row and exits; M0 (b), (c); M1's use of M-1's rows), §13.5 (every ⟨M-1⟩ cell, the band
rule, the ⟨M-1⟩ rule), §13.6 (2) (the FTG pairs and `FtgCapture`), §17.1 (1)–(8), §12.1, §12.2, §12.9, §4.5 and §4.6's
M-1 clauses (lines 6064, 7263–7271, 7307, 7390, 7425), §8.5's recoverability metric; `docs/volumes/V12-calibration.md`
§2.3, §2.4, §3.2 (the capture plan, adapters, one implementation, rows), §3.3 (the crossing C1–C10), §3.4 (the metric
catalogue and the matrix), §3.5, §3.9.1, §8 (W1 and the spikes S-V12-1, S-V12-2), §11 (Q-V12-1); `docs/CONFIDENCE.md`
§6 (#2, #5, #6, #10); `docs/IMPROVEMENTS.md` §7.2; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md` (J122 Q-V12-1: no FTG
premium tier); `profiler/README.md`; every capture README (`captures/mfcg/exports-2026-09-25`, `exports-sweep-2026-09-25`,
`2026-09-25T10-38-58`, `captures/neighbourhood/README-vertices.md`, `captures/manor/README*.md`,
`research/ftg-capture/roadlength100/README.md`); the FTG capture folders' `steps.jsonl`, `session.json` and intercepted
payload inventory; sections 3.1 and 5.8 of `research/findings/ftg-payload-visual.md`; `research/ftg-capture/presets.json` (the size
ladder) and `create-request.json` (its size, seed and water keys only); `docs/validation/bench/README.md` and the heads
and outputs of `mfcg_orient.py`, `mfcg_ribbon.py`, `mfcg_wallalign.py`, `mfcg_cover.py`, `ftg_anisotropy.py`,
`ftg_arith.py`, `v12_h32_vectors.py`, `v12_sweeprule.py`, `doc_checks.py`; the heads of
`captures/neighbourhood/bentcut_*.py`, `plot_granularity_baseline.py`, `seed_orbit.py`,
`research/ftg-capture/analyse_layout.py`; `plat/CLEAN-ROOM.md` (read-only; rule 1–7 and the C-0002 location note);
`workflows/21-mac-catchup.js` (the sibling lanes `catchup/cleanroom` and `catchup/sf-*`); the memory notes on profiler
hazards and FTG capture mechanics.

## 1 The deliverable ledger — every M-1 deliverable of §16, its source class and its rows

Classes: **HELD** = already measured on captures we hold (the number exists; M-1 re-runs the measurement on the plan's
seeds or by V12 §3.4.2's exact definition and writes the row); **COMPUTE** = measurable on captures we hold but not yet
measured; **NEW** = needs a new capture. `referenceBuild` values: MFCG `itch:12710731` (JSON version 0.11.5; re-resolved at
capture time, see section 9), NG `itch:11441280` (NG 1.2.2), FTG `ftg:<server date>+<create-request hash prefix>` per
capture. Metric ids are V12 §3.4.2's. Every row's `capture` names the folder, `script` the `research:` label of the M-1
script, `date` the run date, `sample.family` the plan family.

| # | §16 M-1 deliverable | class | source — capture folder and measurement | rows it fills (metric ids; role) | record | work |
|---|---|---|---|---|---|---|
| D1 | CONFIDENCE §6 #5 FTG face recovery: block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land | COMPUTE (+ NEW payloads as they arrive) | the two CITY payloads `captures/ftg/2026-09-21T05-23-58` (`intercept-0018…bin`) and `2026-09-25T10-13-51` (`intercept-0054…bin`), decoded by `tools/pb_raw.py` as `research/ftg-capture/analyse_layout.py` does (zig-zag sint32, 1 cm units); a planar face walk over the road graph inside each district ring; then the six new payloads | `ftg.ringBlock` (descriptive); the dividing-road and tower-selection readings as notes; plot depth, frontage and plot share **withdrawn by item 49** (the client receives no plot) — each a `known-defects.json` note; the land share inside faces bounds §4.5's `plotShare` from above (a `docs/calibration` number, no row) | E06 | W-06 |
| D2 | CONFIDENCE §6 #10 NG adjacent-footprint pairing | COMPUTE | `captures/neighbourhood/2026-09-25T10-55-{19,36,47,59}` (`draw/gen-N.paths.json`), footprints via `profiler/paths_stats.py` | `bldg.pairing` (NG; target) | E11 | W-11 |
| D3 | CONFIDENCE §6 #2 the NG size sweep | NEW | NG at `small` / `medium` / `large` × four templates, seeds by formula (W-04); `record.mjs --passes draw --vertices` | no §13.5 row of its own: it feeds D5's depth re-fit (block minor extent vs size), `block.area` and `block.countTemplate` at `medium` (5 seeds by the plan), and the confidence cells NG B3 / C8 / B5 | E04, E11, E12 | W-04 |
| D4 | the NG baselines of IMPROVEMENTS §7.2: detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m | COMPUTE | the four 2026-09-25 vertex captures; the road graph rebuilt from drawn centrelines as `bentcut_parent_face.py` does (junction ends extended to the crossed centreline) | `street.detour`, `junction.share4`, `street.cyclesPerKm2`, `plot.minWidth`, `fg.streetwallGap100` (NG; target) | E11 | W-11 |
| D5 | NG's hollow-block frequency and MFCG's inner-lot removal | COMPUTE (NG) / COMPUTE then NEW (MFCG) | NG: faces of the rebuilt road graph as blocks, footprints inside them, `block.courtShare`'s definition at relative scale; MFCG: cluster blocks (V12 §3.4.1) from the exported footprints, first on the 2026-09-25 exports, then on the sweep | `block.courtShare` (NG and MFCG; target per class) | E09, E11 | W-09, W-11 |
| D6 | the MFCG sweep at ten seeds per matched size by V12 §3.2.1's formula (40 / 80 / 130, plain options) plus the river-and-coast variant | NEW | `profiler/export.mjs` as `captures/mfcg/exports-sweep-2026-09-25/sweep.sh` ran it — one cold navigation per export, JSON with `--shot`, then SVG; seeds `capture/MFCG/<size>/plain/<i>`, i = 0…9, and `capture/MFCG/80/river+coast/<i>`, i = 0…4 (V12 §3.2.1 fixes the stress variant at size 80, five seeds, descriptive) | every MFCG row below | E03 | W-03 |
| D7 | lot-orientation coherence; wall alignment | HELD → re-run on the sweep | `mfcg_orient.py`, `mfcg_wallalign.py` on `captures/mfcg/exports-2026-09-25` gave R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68 and 84–92 % within 15° at 0–40 m; re-run with V12's area-centroid rule on the 30 plain exports | `bldg.r4.60`, `.120`, `.250`, `bldg.wallAlign` (MFCG; target) | E07 | W-07 |
| D8 | walled and ribbon shares | HELD → re-run | `stats.py` (walled share 0.87–0.92), `mfcg_ribbon.py` (71–85 % within 100 m); on the sweep | `walled.share`, `ribbon.share` (target) | E07 | W-07 |
| D9 | district areas, gates, towers, castle and plaza | HELD → re-run | `stats.py` and `exports-2026-09-25/analysis/gates_towers.py` on the sweep; wall node spacing from the ring vertices (new, by `wall.nodeSpacing`'s definition) | `district.area`, `plaza.area`, `castle.area`, `castle.compact`, `wall.nodeSpacing`, `quarter.count`, `gate.count`, `wall.towerSpacing` (MFCG; target; the gate law of §4.2 S3 (4) re-tested on the whole sweep as the B20 review asked) | E07 | W-07 |
| D10 | streetwall continuity on dense frontages ⟨M-1⟩ | COMPUTE then NEW | cluster-block outlines against footprint edges on the exports, then the sweep | `fg.streetwall` (MFCG; target) | E08 | W-08 |
| D11 | lots per block; T / Y share; intramural dead ends; blocks per ha ⟨M-1⟩ | COMPUTE then NEW | cluster blocks and the derived street graph (V12 §3.4.1) on the exports, then the sweep; spike S-V12-2 decides whether the graph is stable (section 9) | `blockc.lotsPer`, `sgd.tShare`, `sgd.deadEnds`, `blockc.perHa` (MFCG; target, or descriptive by the ⟨M-1⟩ rule) | E09, E14 | W-09, W-14 |
| D12 | street-edge recoverability on the plain renders ⟨M-1⟩ (§8.5's metric, research-side; cross-checked against the product on M1's golden renders within 0.01) | NEW (renders of the sweep) | each plain SVG rasterised by headless Chrome at the city band's metres per pixel; intramural centrelines from the derived street graph projected through the SVG's outer transform; §8.5's 2-px sampling and transition test | `fg.recoverability` (MFCG; target); `fg.coverWalled` (descriptive, from `stats.py`'s cover column) | E08 | W-08 |
| D13 | FTG captures at BIG_TOWN and BIG_CITY, three of each — one nearest `none`, two nearest `coast+river`; id, `WaterSetting` and recorded population in each README (§13.6 (2)) | NEW | `profiler/session.mjs --target ftg` + `drive.mjs` step by step on the free allowance, one per day over six days (W-02); the payload intercepted at the Fetch stage; decoded with the existing tools | `ftg-captures.json`'s six `FtgCapture` entries are written at M1 by the panel script from these READMEs; the generation-time row gains BIG_TOWN and BIG_CITY (`time.model` for FTG, weakness); all FTG rows below gain the six payloads | E02 | W-02 |
| D14 | outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload | HELD (2 payloads, older definition) → re-run by V12's definition on all 8 | `ftg_anisotropy.py` used 16 sectors of 22.5°; V12's `outline.r90cv` uses 36 sectors of 10° and a 5° arterial-bearing rule, so the numbers are re-measured (the §13.5 band 0.20–0.33 / 1.26–1.65 is recomputed with provenance "M-1 ⟨date⟩" and any gate flip declared) | `street.turn100` (target for organic presets, declared exception band), `street.stepHist`, `street.entropy50` (weakness), `outline.r90cv`, `outline.roadRatio` (target) | E05 | W-05 |
| D15 | NG block counts per template at `medium` from the vertex captures | COMPUTE | faces of the rebuilt road graph per hood, 2026-09-25 captures (2 seeds per template) plus W-04's medium seeds (5 per template by the plan) | `block.countTemplate`, `block.area` (NG; target) | E11 | W-11 |
| D16 | the variety dispersions of MFCG and FTG ⟨M-1⟩ | COMPUTE then NEW | §7.7's signature vector per town (radial arterial share, orthogonality index, street-density profile, block-area CV on cluster blocks, enclosed share, outline anisotropy), standardised by the rung's pooled deviations; MFCG per matched size over the plan's ten seeds; FTG over the payloads at the matched size (three — thin; `estimator: minmax`) | `variety.dispersion` (MFCG and FTG; target as a floor) | E09, E05 | W-09, W-05 |
| D17 | `baselines.json` generated research-side with `referenceBuild` on every row and committed into `plat/` | COMPUTE | `research/baselines/rows.py` + `cross_check.py` (the C1–C10 twin) over every record above | the file `plat/packages/testkit/baselines/baselines.json` (schema `plat.baselines/2`, pins, rows, crossings) | E15 | W-15, W-20 |
| D18 | the sanitised implementer digest, written by one seat and checked by another | COMPUTE | the findings and the records above → `plat/docs/digest/`; checked with the hashed scan and the doc-checks list and 3-gram rules | the digest files; the checker's report (0 code excerpts, 0 word lists / palettes / tables, 0 deny-list hits) in `plat/CLEAN-ROOM.md` | E17 | W-17, W-18 |
| D19 | the hashed content deny-list | COMPUTE | `research/baselines/make_denylist.py` over the findings, the captures' JSON, draw records and bundles, the FTG request and presets, the Foundry module's names, the reference maps' transcribed names | the salted-digest file for `@plat/testkit`'s scanner; the generation record (date, sources, counts, never tokens) in `plat/CLEAN-ROOM.md` | E16 | W-16 |
| D20 | `CLEAN-ROOM.md`'s seat ledger (§17.1 (7)) | COMPUTE | the lane logs of every M-1 seat | ledger rows in `plat/CLEAN-ROOM.md` (C-0002's location) | E18 | W-19 |
| D21 | the plot-depth rows and the regimes' block-depth minimums behind §4.6 step 1 re-fitted on NG's vertex captures and the MFCG sweep (item 34; J-A34.01), provenance "M-1 ⟨date⟩" | COMPUTE then NEW | block minor extents: NG faces per template (relative; the shape of the stop law), MFCG cluster blocks inside the walls per size (metres; the absolute `[e_lo, e_hi]` per band proxy); `cut.flattenM` recalibrated on the bent-cut signature (§4.6 step 4's note) | no `baselines.json` row: a numbers table in E12 handed to a design seat for §4.6 / §4.7's cells (an amendment with `doc_checks.py`), before any block band is signed | E12 | W-12 |
| D22 | volume 12's rig share, W1: the seed families' twin, the capture plan, the adapters with the degenerate-geometry rule, the M-1 metric scripts, `cross_check.py`, the pins and the first `CrossingRecord`, spikes S-V12-1 and S-V12-2 | COMPUTE | `docs/validation/bench/v12_h32_vectors.py` is the twin's check; `research/baselines/plan.py`, `adapters/{mfcg,ftg,ng}.py`, `rows.py`, `cross_check.py`, `metrics.m-1.json` | the plan file, the inputs, the rows and the crossing | E01, E13, E14, E15 | W-01, W-13, W-14, W-15 |
| D23 | NG's bent-cut signature re-measured on curved, round-joined, triangular, C-shaped and holed faces (M0 (b)'s input; σ 0.066 / 0.098, corner-at-mid, ≥ 85° arrival, 53 % filleted) | COMPUTE | `bentcut_parent_face.py`, `bentcut_predict.py`, `bentcut_forward.py` records classified by parent-face shape (curvature, round joins, triangle, C-shape, hole); 2026-09-25 captures, then W-04's medium seeds | `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` (NG; trace rows, target) per face class, with the per-class block-area and cut-length distributions M0 (b)'s KS reads | E10 | W-10 |
| D24 | MFCG's secondary-plaza frequency and non-adjacency on the plain sweep ⟨M-1⟩ | COMPUTE then NEW — likely unmeasurable | the JSON's `squares` feature holds exactly one polygon in every export on disk (the exports README, CONFIRMED), so a secondary market has no exported geometry; the measurement reads the SVG and district features for a second square; expected outcome: the ⟨M-1⟩ rule (section 8) | `market.secondary`, `market.adjacent` (MFCG; target, or descriptive with a `known-defects.json` entry) | E07, E19 | W-07 |
| D25 | FTG's six-tier lifestyle distribution (descriptive, ⟨M-1⟩) | HELD | the create request's lifestyle weights (input numbers; the 2026-09-21 and -25 requests are identical here) and, where a new payload carries a per-building tier, the output shares | `wealth.*` descriptive row (numbers only) | E05 | W-05 |
| D26 | every other §13.5 number M-1 states for FTG: junction angles and degrees, street runs by class, footprints, party walls, towers and gates, water, trees, population and time | HELD → re-run by definition on all payloads | the roadlength100 scripts (runs by class), `analyse_layout.py` (footprints, towers, water, trees), the network indexes (server and scene times) | `junction.angles`, `junction.share4`, `street.runs`, `bldg.area`, `bldg.quadSide`, `bldg.worstCorner`, `bldg.partyShare`, `bldg.attached`, `wall.towerSpacing`, `wall.ungated`, `gate.count`, `water.step`, `water.riverWidth`, `tree.nnP1`, `tree.nnMedian`, `tree.pcf`, `pop.perBuilding`, `time.model` | E05 | W-05 |
| D27 | the NG numbers of §13.5 that are not ⟨M-1⟩: junction angles 361 / 361 T, party walls 39–43 % and 95–99 %, Moran's I −0.04…+0.03, hood time | HELD → re-run by definition | `plot_granularity_baseline.py` (party walls; Moran with k = 8 → V12's shared-edge adjacency), the rebuilt road graph (angles), `report.json` timings | `junction.angles`, `bldg.partyShare`, `bldg.attached`, `plot.moran`, `time.model` (NG) | E11 | W-11 |
| D28 | the MFCG draw-style and timing numbers of §13.5 (casing law, joins, order, widths; 57 / 131 / 156 ms) | HELD | the draw records of `captures/mfcg/*/draw` and the sweep's console timings (`stats.md`'s `gen ms`) | `draw.*` rows (target, `ink`); `time.model` (MFCG; descriptive) | E07 | W-07 |

Not M-1's (recorded so they are not re-found): the VG rows (`referenceBuild` 19365073) are V07's and cross at V-M4 (V12
§3.4.4); the Fantasy Manor count rows are V02's and cross at M6c; `ftg-captures.json`, `ng-counts.json` and the panels'
files are written at M1 and M5 by the panel script from M-1's READMEs (§13.6 (2)); the M1 panel's MFCG `coast+river`
pairs at TOWN and METROPOLIS take their own exports at M1 (V12 §3.2.1) and feed no row.

## 2 The work items

Order is the `depends` column; waves are section 4's. Each item's record is `docs/calibration/E<nn>-<slug>.md` with its
`.json` numbers beside it, written as the item runs (save as you go). Tiers follow the owner's directive: scripts and
measurements on Opus seats; the ⟨M-1⟩ rulings, the band exceptions and the crossing's countersign on a Fable seat.

| id | item | tool or script (existing → new) | inputs | outputs | checker | depends | wave |
|---|---|---|---|---|---|---|---|
| W-01 | the capture plan and the seed twin | `v12_h32_vectors.py` → `research/baselines/plan.py` writing `plan.json` (family `capture/…`, `parkMiller` reduce for MFCG and NG, FTG slots in capture order, Fantasy Manor's 41 as recorded); `metrics.m-1.json` (V12 §3.4.2's ids and versions) | V12 §2.4's formulas | `plan.json`; E01 | the vectors `capture/MFCG/40/plain/0` → 2003595629 and `capture/MFCG/80/river+coast/9` → 1452355484 (PM) and `capture/NG/area/medium/0` → 259196530 reproduce `v12_h32_vectors.out` byte for byte | — | 1 |
| W-02 | FTG's six captures | `profiler/session.mjs --target ftg --headful`, `drive.mjs` (`text`, `shot`, `select`, `click`, `clicktext`), the persistent profile `profiler/.profiles/ftg` → a per-capture checklist script `research/baselines/ftg_capture_checklist.md` (no blind automation of the create click) | the day's allowance; the schedule of section 2.1 | `captures/ftg/<stamp>/` with the layout `.bin`, the request body (from `index.jsonl`), screenshots (form-final, map overview, core), `README.md` with id, `WaterSetting`, population and its source, server time, building count, request hash; E02 | the payload decodes (`pb_raw.py`: field 3 edges and nodes, field 8 buildings present); the request's size key equals the slot's; the README's three §13.6 (2) fields present | W-01; the owner's go (section 5) | 1 (day 1), then one per day |
| W-03 | the MFCG sweep | `profiler/export.mjs` + a `sweep_m1.sh` modelled on `exports-sweep-2026-09-25/sweep.sh` (seeds from `plan.json`); `stats.py` | the plan's 35 seeds; the live build id (`resolveTargetUrl`) | `captures/mfcg/exports-sweep-m1-<date>/` (JSON + SVG + PNG per seed, `export-log.jsonl`, `stats.md`), README with the build id and the canonical hrefs; E03 | 35 of 35 exports with Blob = download (`sameAsDownload`), canonical href carrying the plan's seed and the plain options; a re-export of seed 0 at size 40 byte-identical | W-01; the owner's go; the build-id check (section 9) | 1 |
| W-04 | the NG recording programme | `profiler/record.mjs --target neighbourhood --runs 0 --passes draw --vertices --seed <S> --query "tags=<template>,<size>"`, one invocation per plan seed; `paths_stats.py` | 44 seeds: `medium` i = 0…4 and `small`, `large` i = 0…2 per template | 44 capture folders; a programme README; E04 | each `meta.json` keeps the requested tags and seed; `paths.json` caps untouched (0 skipped, 0 dropped); `paths_stats.py --md` runs on every folder | W-01; the owner's go; the build-id check | 2 (after W-02 day 1 and W-03) |
| W-05 | FTG payload metrics | `analyse_layout.py`, `roadlength100/*.py`, `ftg_anisotropy.py` → `research/baselines/adapters/ftg.py` (payload → `MeasureInput`, cm → m, classes main / district / suburb → arterial / street / lane) and `measure_ftg.py` implementing D14, D25, D26 by V12 §3.4.2 | the two CITY payloads now; each new payload the day it arrives | per-payload values and per-size rows; E05 | the twin reproduces the roadlength100 outputs (runs 50.5 / 30.25 / 50.25 / 30.00 / 14.70 m), the 2 798 and 2 813 building counts and 17 / 29 towers; turning per 100 m and heading entropy agree with `_critic-ftg.md` §4 rows 7–9 within the 10 m-resampling change (declared) | W-01 | 1 (existing payloads) |
| W-06 | FTG face recovery (#5) | `analyse_layout.py` → `measure_ftg_faces.py`: planar face walk inside each district ring, face areas, the dividing road's position against the face OBB, towers against wall-vertex geometry, land share inside faces | the same payloads | `ftg.ringBlock` distribution; the notes of D1; E06 | faces close (Euler check on each ring's subgraph); the area sum equals the ring area within 1 % | W-05 | 2 |
| W-07 | MFCG street signature, shares, anchors, markets, timings | `mfcg_orient.py`, `mfcg_wallalign.py`, `mfcg_ribbon.py`, `stats.py`, `gates_towers.py`, `fixall_pipeline_mfcg_fits.py` → `adapters/mfcg.py` (V12 §3.2.2's mapping with the shore split) and `measure_mfcg.py` for D7, D8, D9, D24, D28 | the 2026-09-25 exports first (the T-V12-6 fixture), then the sweep | per-seed values, per-size rows; E07 | on the 2026-09-25 files the twin reproduces R4 0.84 / 0.58 / 0.32 (gates4) within 0.02 (the centroid change), wall alignment 87 / 70 / 58 % (gates0), walled 0.98 / 0.97 / 0.92 / 0.82 / 0.30, gates 0 / 1 / 4 / 9 / 7 and towers 33 / 32 / 29 / 24; the gate law's hits on the sweep reported | W-01 (then W-03 for the rows) | 1 (fixtures), 2 (rows) |
| W-08 | MFCG recoverability and streetwall | new `measure_mfcg_render.py` (SVG → PNG at the matched scale through headless Chrome, `puppeteer-core` present; pixel classes as `mfcg_cover.py` classifies them; §8.5's 2-px centreline sampling) and `fg.streetwall` on cluster blocks | the sweep's 30 plain SVGs and JSONs | `fg.recoverability`, `fg.streetwall`, `fg.coverWalled` rows; the rasters (≈ 60 MB); E08 | the metric on two renders of one SVG at two Chrome runs differs < 0.005; cover reproduces `stats.py`'s column | W-03, W-09 | 2 |
| W-09 | MFCG cluster blocks, derived street graph, court share, variety | new `derived_graph.py`: cluster blocks (1 m gap; 3 m close) and the derived street graph as a raster medial axis at 0.5 m (distance transform, ridge, 8 m spur pruning, 2 m node merge — the M-1 twin of V12 §3.4.1's straight-skeleton definition, declared; M1's product value supersedes by J-V12.1), `blockc.*`, `sgd.*`, `block.courtShare`, `variety.dispersion` | exports then the sweep | rows of D5, D11, D16; E09 | planarity and face count of the derived graph; the blocks' area sum ≤ the walled area; the graph's seed-to-seed CV feeds W-14 | W-07 | 2 |
| W-10 | NG bent cut per face class (M0 (b)) | `bentcut_parent_face.py`, `bentcut_predict.py`, `bentcut_forward.py`, `bentcut_geometry.py` → `ng_faces_by_class.py` (classifies parents: curved, round-joined, triangular, C-shaped, holed; per class σ, corner-at-mid, arrival, fillet, block-area and cut-length distributions) | the 2026-09-25 captures now; W-04's medium seeds later | the per-class trace rows and distributions M0 (b) compares against; E10 | the pooled numbers reproduce 380 / 519 one-bend streets, 96 % arrivals ≥ 85°, the 200 of 378 filleted corners | W-01 | 1 |
| W-11 | NG ⟨M-1⟩ rows, blocks, pairing, party walls, Moran, time | `plot_granularity_baseline.py`, `paths_stats.py`, the rebuilt road graph → `adapters/ng.py` (`scale: relative`) and `measure_ng.py` for D2, D4, D5 (NG), D15, D27 | the same captures, then W-04 | rows; E11 | the twin reproduces `plot_granularity_baseline.py`'s party-wall shares and `README-vertices.md`'s 36 table rows; detour and cycles stable across the two seeds (reported) | W-01 | 1 |
| W-12 | the depth-row re-fit (item 34) | new `fit_depth_rows.py` over W-09's cluster blocks (metres, per size) and W-10's faces (relative, the stop law's shape); `cut.flattenM` against the bent-cut signature | E09, E10, E11 outputs | the numbers table with provenance "M-1 ⟨date⟩" and the hand-off note to a design seat; E12 | the fitted `[e_lo, e_hi]` per band proxy reproduces the input distributions' p10 / p90 within the estimator's rounding; no block band is signed before this lands (J-A34.01) | W-09, W-10, W-11 | 3 |
| W-13 | spike S-V12-1 (bootstrap the bands) | new `spike_bootstrap.py`: 1 000 resamples of the ten seeds per size, bands recomputed, verdict flips counted at candidates on each band's edges ± 5 % | E07, E09 rows | the flip table; the pre-decided outcome (> 10 % of target rows flipping in > 5 % of draws → 20 seeds per size, W-03 extended) ; E13 | the resample is seeded and reproducible | W-07, W-09 | 2 |
| W-14 | spike S-V12-2 (derived-graph stability) | the CV of `sgd.*`, `blockc.*` over the ten seeds per size | E09 | a metric with CV > 0.3 → descriptive by the ⟨M-1⟩ rule and a `known-defects.json` entry (W-20); E14 | reproducible from E09's per-seed file | W-09 | 2 |
| W-15 | rows, bands, the candidate file | `rows.py` (provenance, `sample`, role, `estimator`, `spreadKS`) and `bands.py` (V12 §3.5.1–§3.5.4) → `baselines.json` candidate; `cross_check.py` (C1–C10 twin; C6 against `metrics.m-1.json`) | every E record | the candidate file and the check's output; E15 | C1–C10 all pass; every row has `referenceBuild`, `capture`, `script`, `date`; every ⟨M-1⟩ cell has a row or a `known-defects.json` entry; every band by the band rule with provenance "M-1 ⟨date⟩"; a passing-to-failing recomputation listed for the shift record | W-05 … W-14 | 3 |
| W-16 | the hashed deny-list | `doc_checks.py` (its C1–C4 sources) → `research/baselines/make_denylist.py`: salted SHA-256 of normalised tokens not in §9.6's spell list, list-order 3-grams, six-digit colour values, file bytes, and per-list member-word sets; sources of §17.1 (5) (findings, captures' JSON and draw records, the FTG request and presets, the client bundle's textures, the Foundry module's names, the two reference maps' names transcribed research-side) | the authoritative corpus of lane `catchup/cleanroom` | the digest file for `@plat/testkit`'s scanner (placed by the baseline seat beside the baselines) and the generation record (date, sources, counts); E16 | self-test: every `doc_checks.py` C1 identifier, every corpus colour and every check-(vi) list hits; the design set scanned → 0 unreviewed hits with `doc-checks-allow.tsv`'s reviewed rows carried | the `catchup/cleanroom` landing | 1 (may start now) |
| W-17 | the implementer digest | the findings, the records E05–E12, the P-id table `research/findings/code-impact.md` §(d) → `plat/docs/digest/` (behaviours, measured numbers with their `baselines.json` ids or finding references, the creators' stated ideas; no code excerpts, word lists, grammars, palettes, tables or identifiers) | the digest seat's reading list, logged | the digest; E17 | W-18 | W-15, W-16 | 3 |
| W-18 | the digest check | the scanner with W-16's list + `doc_checks.py` run with `--doc` on each digest file (3-grams and lists against the corpus) by a seat that reads only the digest | the digest | the report: 0 code excerpts, 0 reference word lists / palettes / tables, 0 deny-list hits, filed in `plat/CLEAN-ROOM.md`; E17 | the report's counts; a seeded planted-leak test (one reference 3-gram inserted in a scratch copy is caught) | W-17 | 3 |
| W-19 | the seat ledger | the lane logs (`docs/lane-events.log`, the lanes' reading lists) → ledger rows in `plat/CLEAN-ROOM.md` | every M-1 seat's log | the rows (seat, date, research files read, what it wrote); E18 | every seat that touched a `plat/` file has a row dated before its landing | W-02 … W-18 | 3 |
| W-20 | the crossing and the known-defects entries | the baseline seat commits `baselines.json` and the deny-list; a checker seat (reads only the candidate, the check output and `metrics.m-1.json`) countersigns the `CrossingRecord`; the ⟨M-1⟩ entries into `plat/docs/known-defects.json` | E15, E14, E19 | the committed files; the first `CrossingRecord`; E19 | `cross_check.py --previous` on an empty previous file; the git commit is the session's, on the owner's word (section 5) | W-15, W-16 | 3 |

### 2.1 FTG's six-day schedule (W-02)

The size ladder is FTG's own (`presets.json` `sizes`, CONFIRMED): BIG_TOWN 5 600 people / 4 000 m, BIG_CITY 24 500 /
5 500 — §13.6 (2)'s nominal targets. The allowance is one temporary settlement per IP per day under the guest identity of
`profiler/.profiles/ftg` (the new settlement replaces the previous one under that identity; the payload is intercepted in
the same session, so nothing is lost). Premium is ruled out (J122 Q-V12-1). The order alternates sizes so that a programme
cut short still holds a `none` and a `coast+river` capture of each size by day 4:

| day | size | water options | capture id | what the README records |
|---|---|---|---|---|
| 1 | BIG_TOWN | nearest `none`: no coast, rivers off | `captures/ftg/<stamp>` | id, `WaterSetting: none`, population (nominal 5 600 unless the payload holds residents), server time, buildings, request hash |
| 2 | BIG_CITY | nearest `none` | — | `WaterSetting: none`, nominal 24 500 |
| 3 | BIG_TOWN | nearest `coast+river`: coastal, rivers on (the 2026-09-21 and -25 captures' options) | — | `coast+river` |
| 4 | BIG_CITY | nearest `coast+river` | — | `coast+river` |
| 5 | BIG_TOWN | `coast+river` (second) | — | — |
| 6 | BIG_CITY | `coast+river` (second) | — | — |

Every other form value stays at the preset's default (the 2026-09-21 base: Medieval-europe stages, Comfortable, Temperate,
Walled on), the layout preset untouched — one change per capture, the size, and the water options. Per capture: `session.mjs
--target ftg --headful`, `drive.mjs text` and `shot` at each step, the size through the simple form's select (index 0 is
Size in that form; in the layout view the indexes shift, roadlength100's hazard), the water options through the form's
coast select and rivers checkbox, `clicktext` on the dialog's create button only when it is the one hit-testable match,
`--profile` off (the CPU profile is not an M-1 input and costs ≈ 5 MB), then `shot` the overview (500 m bar) and one core
zoom. Server time = PUT → layout GET from `index.jsonl`. The payload's top level holds no resident count (its fields are
the id, name, road graph, extent, water, towers, buildings, lots, districts, decorations and the request's mirrors —
CONFIRMED on the 2026-09-21 payload, `ftg-payload-visual.md` section 3.1), so `populationSource` is expected to be `nominal` and
is re-checked on each new payload. Each capture's `referenceBuild` is `ftg:<server date>+<sha256 of the request body,
12 hex>`; the request body is kept pretty-printed as `create-request.json` in the capture folder.

### 2.2 The MFCG sweep (W-03)

Query per export: the 2026-09-25 sweep's plain query string (its README, *How the files were made*, and `sweep.sh`) with
the plan's Park–Miller seed substituted, once with the JSON export key and once with the SVG key; the stress variant
switches the river and coast flags on at size 80, as that README's river-and-coast file did.
35 exports × ≈ 7 s wall ≈ 5 minutes. The canonical href after each export must carry the seed and the plain options
(`shantytown=0`, `greens=0`); a retry attempt (the size-200 case of the 2026-09-25 sweep: a different internal seed under
the same href) is detected from the console trace and recorded in `sample.failed` with reason `retry`, never dropped
silently (C7). `stats.py` runs on the folder; its columns are the anchors' raw values.

### 2.3 The NG programme (W-04)

44 single-generation recordings (one cold load each, no `--regen`, so every seed is the plan's): per template `area`,
`street`, `square`, `ring` — `medium` i = 0…4 (the five seeds V12 §3.2.1 asks for) and `small`, `large` i = 0…2
(CONFIDENCE #2's three per size; its 36-run shape is kept at `medium` through the five). `--passes draw --vertices`
only; the coverage pass of #2 is left out (block counts come from the rebuilt road graph, building counts from the draw
record). Each folder ≈ 9–14 MB (`paths.json` 1.5–8 MB at `medium`, larger at `large`). The itch build is checked first
(section 9).

## 3 Work that needs no capture and can start now

W-01, W-05 (on the two CITY payloads), W-07 (on the five 2026-09-25 exports — the T-V12-6 fixtures), W-10, W-11 and W-16
run on what is on disk. W-10 and W-11 are M0 (b)'s inputs (the per-face-class signature and the NG distributions); W-07
and W-09's fixture pass give M0 (c) the MFCG street-signature rows it compares against. None of these touches a
third-party site or `plat/`.

## 4 The first wave

1. **W-01** the capture plan and `metrics.m-1.json` (an hour; pure computation).
2. **W-02 day 1** FTG BIG_TOWN `none` — the six-day clock starts the day the owner says go; every day lost is a day
   added to M-1's exit, which §16 M-1's "FTG's six captures decoded" requires.
3. **W-03** the MFCG sweep (≈ 5 minutes of exports once the owner says go and the build id is checked).
4. **W-10, W-11** NG per-face-class signature and the NG ⟨M-1⟩ rows (M0 (b)'s inputs; computation).
5. **W-05, W-07** the FTG and MFCG twins on the existing payloads and exports (the fixtures the new rows are checked
   against).
6. **W-16** the deny-list (needed from M-1 on by every design edit, §17.1 (2); starts when `catchup/cleanroom` lands).

Wave 2 (W-04, W-06, W-08, W-09, W-13, W-14) follows the first captures; wave 3 (W-12, W-15, W-17 … W-20) closes M-1.
The disk check `df -h /Users/cstokes` runs between every capture folder; under 1 GB free the programme stops and reports.

## 5 Owner-gated steps (named plainly, for the session to ask)

1. **FTG, six days.** Using fantasytowngenerator.com's free allowance — one temporary settlement per IP per day — from
   the owner's connection, six days running, under the guest identity the browser profile already holds; the site's
   cookie-consent notice on first visit (accepting it is the owner's); each capture sends FTG's own ≈ 430 KB
   configuration body to its server (no personal data; the body is the generator's form). No account, no login, no
   purchase: the premium tier is ruled out (J122 Q-V12-1).
2. **MFCG on itch.io.** 35 automated page loads of the public build and 70 browser downloads it triggers (35 JSON + 35
   SVG, ≈ 260 MB, from `html-classic.itch.zone`); and the build-id check, which fetches the public game page.
3. **NG on itch.io.** 44 automated page loads of the public build (screenshots and draw records; no download).
4. **Build drift.** If itch serves a build other than MFCG 12710731 or NG 11441280, the new captures carry the new
   build, the pin moves as a declared baseline shift (V12 §3.8; J-V12.13), and the owner is told before the sweep runs.
5. **Disk.** No seat deletes or moves data. If space falls short, the owner decides what moves off the volume
   (candidates: `captures/dwellings`, 1.5 GB; the three browser profiles, 270 MB — the FTG one holds the guest identity
   and stays).
6. **Dependencies.** The plan uses what is installed (Node 24.12, `puppeteer-core`, Python 3.9 with PIL, Google Chrome).
   Any new package is a download and is asked for first; none is planned.
7. **The crossing's commit.** `baselines.json`, the deny-list, the digest, `known-defects.json` entries and the
   `CLEAN-ROOM.md` rows are written into `plat/` by the named research-side seats; the git commit is the session's on
   the owner's word (this workflow's lanes run no state-changing git).
8. **Design cells.** W-12's re-fitted depth rows and any recomputed band that flips a gate change design numbers; they
   land by an amendment a design seat applies with `doc_checks.py`, recorded in the shift record — reported to the owner,
   not asked (J-A34.01 decided it), unless a flip changes a signed golden.

## 6 Disk estimate (MB; against the brief's under-3-GB rule; 19 GB free read at 03:42)

| item | basis (measured on disk) | MB |
|---|---|---|
| FTG six captures | 2026-09-25 capture: payload 0.64, request 0.43, screenshots ≈ 3 (three kept), client bundle bodies ≈ 20 per session; no CPU profiles | 6 × 28 ≈ 170 (≈ 50 if the bundle bodies are kept once) |
| MFCG sweep, 35 exports | size 40: 0.63 + 0.68 + 0.36; size 80: 2.3 + 2.4 + 0.6; size 130: 5.4 + 5.8 + 0.9; size 80 river+coast: 5.75 + 6.3 + 0.8 (the 777001 export) | 10 × 1.7 + 10 × 5.3 + 10 × 12.1 + 5 × 12.9 ≈ 256 files + ≈ 65 session bodies ≈ 325 |
| S-V12-1's fallback (20 seeds per size) | the plain files doubled | + 190 (contingent) |
| NG programme, 44 generations | 2026-09-25 `medium` folders 19–28 MB for two generations ≈ 9–14 per generation; `large` larger | 450–600 |
| rasters for recoverability | 30 plain SVGs at the city band's scale | ≈ 60 |
| `MeasureInput` files | the adapters' GeoJSON, stored gzipped and regenerable | ≈ 70 |
| records, scripts, the plan | text | ≈ 5 |
| **total** | | **≈ 1 080–1 230; ≈ 1 420 with the contingency** |

Order of value per MB: FTG (date-bound, small) → MFCG (the most rows) → NG `medium` (M0 (b)) → NG `small` / `large`.

## 7 The crossing into `plat/` — seats and files (research-side seats only; no implementer writes any of it)

| file | writer (research-side seat) | checker | rule |
|---|---|---|---|
| `plat/packages/testkit/baselines/baselines.json` | the **baseline seat** (`rows.py`, `bands.py`, `cross_check.py`) | the **checker seat**, which reads only the candidate, the check's output and `metrics.m-1.json`, never a capture; countersigns the `CrossingRecord` | §17.1 (4); V12 §3.3 C1–C10; append-only; `research:` labels for script and capture; numbers, units, ids and provenance only |
| the hashed deny-list beside it, for `@plat/testkit`'s scanner | the **deny-list seat** (`make_denylist.py`; the salt generated once, kept with the list) | the **digest-checker seat** runs the self-test (every known identifier, colour and list hits; 0 unreviewed hits on the design set) | §17.1 (5); the generation record (date, sources, counts, never tokens) into `plat/CLEAN-ROOM.md` |
| `plat/docs/digest/` | the **digest seat** (reads the findings and E05–E12; logs every file read) | the **digest-checker seat** (reads only the digest): the scanner and the 3-gram / list checks; files the report with 0 / 0 / 0 counts | §17.1 (2); every later change repeats the check |
| `plat/docs/known-defects.json` ⟨M-1⟩ entries | the baseline seat, on the Fable seat's rulings | the checker seat (notes ≤ 200 characters, scanner-clean) | §13.5's ⟨M-1⟩ rule |
| `plat/CLEAN-ROOM.md` (the file is at `plat/` root by build choice C-0002; the design text says `plat/docs/`) | every seat above appends its ledger row before its landing; the digest-checker files its report; the deny-list seat its generation record | the session, at M-1's exit: every seat that wrote into `plat/` has a dated row | §17.1 (7) |
| the design's re-fitted cells (§4.6 / §4.7 depth rows; recomputed bands) | a **design seat**, by amendment, from E12 and E15's tables | `doc_checks.py --sections` on the touched sections; the shift record names each moved cell | §17.1 (2), (6): provenance "M-1 ⟨date⟩" |

Hand-offs the product side owes M-1 (not M-1's work): `plat baselines check` (M1) re-validates the M-1 file (T-V12-1);
`plat measure` re-runs every row on the stored `MeasureInput` files (T-V12-3, T-V12-6; `check_t3.py`, `check_t6.py`
research-side); the panel script writes `ftg-captures.json` from the six READMEs at M1.

## 8 What M-1 cannot measure, and the ⟨M-1⟩ rule for it

Each becomes a *descriptive* cell that gates nothing and a `plat/docs/known-defects.json` entry with its reason; the
parity CLI reports an ⟨M-1⟩ cell without a row as *fail*, never *pass* (§13.5), so each entry is written at M-1's exit,
not left implied. Expected entries (PLAUSIBLE until the measurements run; the first two CONFIRMED from the files on disk):

1. **FTG plot depth, frontage and plot share** (D1): the client receives no plot (item 49, CONFIRMED on the payload's
   field list) — withdrawn; `ftg.ringBlock` stays as the descriptive face-area row and the land share inside faces as a
   `docs/calibration` bound.
2. **FTG resident count**: the payload carries none (CONFIRMED on the 2026-09-21 payload); §13.6 (2)'s fallback applies
   — `populationSource: 'nominal'` with 5 600 / 24 500 — recorded in each README and reported with the panel.
3. **MFCG secondary markets** (D24): one exported square per city; if the SVG and districts show no second square, the
   row is descriptive with the entry "the export carries one square".
4. **MFCG derived-graph rows** (D11) whose seed-to-seed CV exceeds 0.3 (S-V12-2): descriptive by the pre-decided rule.
5. **FTG variety** (D16) over three payloads per size: the row stands as a floor with `estimator: minmax` and `n = 3`;
   if the pooled deviations cannot be formed, descriptive.
6. **FTG lifestyle shares** (D25): the request's weights are inputs, not outputs; unless a payload carries per-building
   tiers, the row is descriptive by design and a note says so.
7. **The hidden-share base weights "fitted at M-1 on B-CITY"** (§4.5, line 7425): B-CITY needs the product, so this
   fit cannot run at M-1; it is M1's, and the plan records the inconsistency for the design seat (the sentence should
   read "at M1").
8. **`plotShare` per regime** (§4.5, line 6064): M-1 bounds FTG's from above (D1); the per-regime values are M1's on
   B-CITY, as the text already says.

## 9 Risks and pre-decided outcomes

| risk | pre-decided outcome |
|---|---|
| itch serves a newer MFCG or NG build (the game pages are re-resolved by `resolveTargetUrl`) | the new captures carry the new build; the 2026-09-25 exports and vertex captures stay rows of their builds; the pin moves at the milestone boundary as a declared shift (V12 §3.8; J-V12.13); the owner is told first (section 5) |
| the FTG allowance is refused on a day (rate limit, consent change, a site change) | the day is skipped and the schedule slides; `sample.failed` lists the slot with its reason (C7); fewer than six captures at the exit leaves the missing pairs recorded, never faked (§13.6 (12)) |
| the derived street graph's M-1 twin (raster medial axis) differs from the product's straight skeleton beyond T-V12-3's 0.5 % | expected and declared: M1's product value supersedes the M-1 row with a `baselineShift` (J-V12.1); S-V12-2 decides descriptive status before that |
| thin FTG samples (three per size) | §13.5 already classes FTG's rows weakness or descriptive except the declared turning exception; S-V12-1 bootstraps MFCG only |
| the ten MFCG seeds give unstable bands (S-V12-1) | 20 seeds per size, + 190 MB, minutes of exports |
| disk under 1 GB | stop and report; the order of section 6 was chosen so the date-bound and highest-value captures land first |
| a seat reads a bundle | forbidden for every M-1 seat; the readers' files (`research/findings/code-*.md`) are the only route, and the ledger records each reading |

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (read or executed): every §16 deliverable in the ledger and its §13.5 cell; the capture inventory and the
file sizes of section 6; the FTG size ladder's 5 600 / 24 500; the payload's top-level fields (no resident count); the
one square per MFCG export; the owner's no to FTG premium; the existing scripts' outputs quoted in the checker column;
the seed vectors; the free space readings. PLAUSIBLE (reasoning): the per-generation NG folder size at `large`; the
expected ⟨M-1⟩ entries 3–6 of section 8; the five-minute MFCG sweep (7 s per export × 35, from the 2026-09-25 timings);
that the FTG form's water options can be set to "no coast, rivers off" through the simple form (the 2026-09-25 session
set Coastal and rivers there; the reverse was not exercised).

## 11 How the session checks this plan

Every §16 M-1 deliverable appears once in section 1 with a class, a source and a work item; every ⟨M-1⟩ cell of §13.5
appears in section 1 or section 8; every work item has a tool, inputs, outputs, a checker and an order; every
third-party contact, download and `plat/` write is in section 5; the disk total is below the free space with the stop
rule; no reference word, grammar, palette value or identifier beyond FTG's two size names (already in §13.5) is in this
file. `M-1-work.json` is the same content in machine-readable form; `python3 -c "import json;json.load(open(...))"`
parses it.

**Self-check executed (CONFIRMED, 2026-10-03 03:50–03:58).** `python3 docs/validation/bench/doc_checks.py --doc
docs/calibration/M-1-plan.md --heads docs/ARCHITECTURE.md` over the full corpus (10 103 colour files, 9 628 JSON files,
925 949 corpus 3-grams, 502 lists): C2 colours 0, C4 lists 0, S1 tables 0, S2 pointers 0; C1 4 hits, all the reviewed
generic file name `README.md`; C3 65 hits, 63 unreviewed — every one a capture path, a date, a digit run of the disk table
or a sentence of our own READMEs and findings (for example the phrase about one settlement per address per day), none a
reference word list, palette, grammar or identifier; the exit status 1 is that unreviewed count, and this record is not a
file of the design set, so no allow rows are added. `M-1-work.json` parses (28 deliverables, 20 work items, 19 records,
8 owner-gated steps). The table-shape check found 0 problems.
