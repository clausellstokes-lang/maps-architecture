# M-1 plan — calibration and the clean-room inputs (research side) — revision 3 (2026-10-03, after the round-1 closing check and J164)

Lane `catchup/m1-plan` wrote revision 1 on 2026-10-03 03:57 (git 65c115b); lane `m1/rulings-1` (the Fable ruling seat,
J161) wrote revision 2 at 16:59 the same day, after wave 1 landed and the independent plan check
(`results/plan-check.json`, 21 issues PC-01 … PC-21) and the wave verifier (`results/wave1-verify.json`) reported. Every
ruling it applied is in `docs/calibration/M-1-rulings-1.md` (R-01 … R-32, vetoable; the design corrections DC-01 … DC-30
for a design seat). Lane `m1/rulings-2` (the Fable ruling seat, J164) wrote **this revision** the same evening, after the
round-1 closing check (`results/plan-check-close-1.json`: verdict fix, blockers B-1 and B-2, notes N-01 … N-06 and the
item notes of `M-1-plan-notes.md`) and after the owner's rulings J163 (FTG recorded in the owner's signed-in account) and
J164 (one month of FTG premium for about 20–25 more towns); its rulings are `M-1-rulings-2.md` (R-33 … R-47; the design
corrections DC-31 … DC-35; R-48 in its section 8, added by lane `m1/plan-fix-3`); section 12 is the changelog. This file and `M-1-work.json` beside it are research-side records;
implementer seats do not read them (`plat/CLEAN-ROOM.md` rule 2). They carry metric ids and numbers of our own and no
reference word list, grammar, palette or identifier beyond FTG's five size names (the `FtgSize` values of §13.5 and the
size ladder's TOWN) and the four NG template names the design uses as our fabric keys.

**Where M-1 stands (CONFIRMED by the records).** Wave 1 landed: W-01 (the plan file and the registry twin, 85 slots, 182
ids), W-02 day 1 (BIG_TOWN `none`, `captures/ftg/2026-10-03T17-19-06`), W-03 (34 of 35 MFCG exports; `130/plain/8` froze;
J161 approved three more loads), W-04 (44 of 44 NG recordings, 322 MB), W-05 (the FTG twin on the two CITY payloads), W-07
(the MFCG twin on the fixtures, T-V12-6's clauses), W-10 (the bent cut per face class; σ 0.066 / 0.098 reproduced), W-11
(the NG twin; the layer-registration finding), W-16 (the deny-list built; four design hits routed to `design/cleanroom-fix-1`).
**Since revision 2:** lane `m1/W-03-complete` LANDED at 16:49 (E03 §9) using 2 of J161's 3 loads — seed 0's cold re-export
is byte-identical and the retry of `130/plain/8` froze again (`sample.failed` `no-export`, 2 loads), so W-03b is R-13's
extension only (R-39); the clean-room fix landed and was verified (`docs/validation/clean-room-fix-2026-10-03.md`, verdict
confirmed); FTG moved into the owner's signed-in account (J163) and slots 1, 2 and 3 landed the same evening
(`2026-10-03T22-04-25`, `2026-10-03T22-21-00`, `2026-10-03T22-43-28`), slot 4 at 19:09 (`2026-10-03T22-57-34`) and slot
5 at 19:20 (`2026-10-03T23-10-37`; programme 1 complete, slots 0–5 bound); the owner subscribed to FTG premium for one month (J164) and this revision
plans **programme 2** — 22 more slots, 6–27, in `plan.py` and `plan.json` (section 2.1b; R-33).
What changed in revision 2, in one sentence each: NG's metres are a **declared** scale (R-01); every NG row comes from
W-04's **formula seeds**, the 2026-09-25 captures being fixtures (R-03); the two FTG CITY payloads are a **recorded family**
with the 2026-09-25 one excluded as a non-default setting (R-02, R-04); **`ng-faces.json` crosses** with a schema (R-14,
§7b); the **cut-length row** and metric exist (R-15); **`denylist.json`** is delivered in M0's format with its byte-level
encoding fixed (R-17, §7c); the crossing writes **both** record forms (R-18); the deep-interior shares, the digest entries
and the time rows have rules (R-19 … R-21); the uncovered §13.5 cells have rows or stated no-rows (R-23); the loads are
restated (R-16); wave 2 and wave 3 are laid out with their checkers and the crossing's gate on M0-k-05 / M0-k-06 (R-32).
**What changed in this revision (3):** the FTG family has **28 slots** in two declared programmes, with `plan.py` refusing
any reordering of the first six (R-33, R-35, R-36); the FTG rows at BIG_TOWN and BIG_CITY become **`type7` rows at n = 10**,
METROPOLIS gains FTG rows at n = 4 and the CITY family reaches three usable (R-34); **W-03b is the extension only** (B-1,
R-39); **both variety dispersions are formed at W-15** from vectors W-09 and W-05b write (B-2, R-40); the size-dependent
class grows only by a first-of-size controlled comparison (R-41); the panel keeps three FTG pairs per rung (R-42); the
parity run's FTG settings are per rung and water at the nominal population (R-43, DC-34); every time cell M-1 cannot measure
is one descriptive row form (R-44); the countersigning checker seat is implementer-side (R-45); the closing check's
hand-offs N-01 … N-05 are carried in section 7 (R-46); the item notes are answered (R-47); `doc_checks.py` reads an M-1
folder's `stats.json` for its string values only (R-38). **Fix round `m1/plan-fix-3` (still revision 3; §12c),** before
programme 2 records anything: the post script's water-implied resource class is pinned; `plan.py` refuses any change to a
recorded slot; the checklist's section I carries programme 2's procedure with the retry rule corrected; `water.step` takes
§13.5's fixed bound (R-48); and the text the closing check of revision 3 found left behind is reworded.

## 0 What was read (CONFIRMED, whole sections)

Revision 1's list stands (`docs/ARCHITECTURE.md` §16, §13.5, §13.6 (2), §17.1, §12.1, §12.2, §12.9, §4.5 and §4.6's M-1
clauses, §8.5; V12 §2.3, §2.4, §3.2–§3.5, §3.9.1, §8, §11; CONFIDENCE §6; IMPROVEMENTS §7.2; the capture READMEs and the
bench scripts). Revision 2 added: the nine wave-1 records E01–E05, E07, E10, E11, E16 whole; `results/plan-check.json`,
`results/wave1-verify.json`; `plat/docs/build/M0.md` §1 (b), (c), (f) and the AFTER-M-1 wave rows; `M0-work.json`'s
`afterM1Needs` and `waveRule`; choices C-0043, C-0071, C-0072, C-0075, C-0086, C-0092, C-0094, C-0101, C-0116, C-0117,
C-0120, C-0121; V12 §2.1, §2.2, §7.1's T-V12-1 / -6 / -28 / -30 / -32; the J159 and J161 rows; `metrics.m-1.json`'s `open`
and `m1Uncovered`; `plan.json`'s FTG slots and `mfcgExport`; `plat/CLEAN-ROOM.md` §4 (read-only). Revision 3 added:
`results/plan-check-close-1.json` and `M-1-plan-notes.md` whole; E02 §1–§12 (the signed-in captures and the stopped slot-3
attempt); `results/W-02-slot1/2/3.json`, `results/W-03-complete.json`; `plan.py` and `plan.json` whole;
`ftg_capture_checklist.md` A–H12; `ftg_capture_post.py`; `docs/validation/clean-room-fix-2026-10-03.md` and its verifier's
file (P1–P6); `doc_checks.py` whole; §13.5 whole (the FTG rows, the band rule, the ⟨M-1⟩ rule, `FtgSize`), §13.6 (1)–(3),
§16's M-1 row, §1.1's rung table, §12.9's FTG paragraph, D-31 and J-S11; V12 §2.4, §3.2.1–§3.2.4, §3.3, §3.4.4's FTG row,
§3.5, §3.9.1's panel table, §6's B-REF budget line, Q-V12-1; the J122, J163 and J164 rows; FTG's size ladder
(`research/ftg-capture/presets.json`, the five sizes' nominal populations and widths).

## 1 The deliverable ledger — every M-1 deliverable of §16, M0's requests, their source class and their rows

Classes: **HELD** = measured on captures we hold (re-run by V12 §3.4.2's definition on the plan's seeds); **COMPUTE** =
measurable on captures we hold, not yet measured; **NEW** = needs a new capture; **LANDED** = done in wave 1 (its record
named). `referenceBuild`: MFCG `itch:12710731` (JSON version 0.11.5, unchanged at the sweep, E03), NG `itch:11441280` (NG
1.2.2, unchanged at the programme, E04), FTG `ftg:<server date>+<sha256 of the create-request body, 12 hex>` per capture.
Metric ids are V12 §3.4.2's plus those R-12 and R-15 register. **Samples (R-02, R-03):** every NG row is built on W-04's
plan seeds (`capture/NG/<template>/medium`, indices [0, 5); `small` and `large` [0, 3)); the 2026-09-25 NG captures are twin
fixtures; FTG rows read the plan's 28 slots in order (section 2.1, 2.1b; R-33): BIG_TOWN and BIG_CITY at n = 10 each
(`type7`), METROPOLIS at n = 4 (`minmax`), and the CITY family — the recorded pair `capture/FTG/CITY/coast+river/0` (usable)
and `/1` (`failed: setting`) continued by the planned slots 24 and 25 — at three usable (`minmax`); FTG TOWN's two slots feed
research-side numbers only (R-34). **Scale (R-01):** NG numbers in metres are declared at 0.35 m per model unit, the row's
note saying so.

| # | deliverable | class | source — capture and measurement | rows it fills (metric ids; role) | record | work |
|---|---|---|---|---|---|---|
| D1 | CONFIDENCE §6 #5 FTG face recovery | COMPUTE (+ NEW payloads) | the CITY payloads (fixtures; the 2026-09-25 one a non-default setting, R-04), day 1's payload, then each slot; a planar face walk inside each district ring | `ftg.ringBlock` (descriptive); plot depth, frontage and plot share withdrawn by item 49 (descriptive rows in C-0116's form, R-25); the land share inside faces bounds §4.5's `plotShare` from above (a number in E06, no row) | E06 | W-06 |
| D2 | CONFIDENCE §6 #10 NG adjacent-footprint pairing | COMPUTE | W-04's 20 `medium` recordings, footprints registered to the road frame (E11) | `bldg.pairing` (NG; target; reading B, R-05; A and the mutual share in the note) | E11 | W-11b |
| D3 | CONFIDENCE §6 #2 the NG size sweep | LANDED (capture, E04) → COMPUTE | the 44 recordings: `medium` 5 and `small` / `large` 3 per template | no §13.5 row of its own: it feeds D21's depth re-fit (block minor extent against size), D15 at `medium`, and the confidence cells NG B3 / C8 / B5 | E04, E11, E12 | W-04 (landed), W-11b, W-12 |
| D4 | IMPROVEMENTS §7.2's NG baselines | COMPUTE | the 20 `medium` recordings; the road graph rebuilt from drawn centrelines (junction ends extended to the crossed centreline); declared scale | `street.detour`, `junction.share4` (merged, R-06), `street.cyclesPerKm2` (hull outline, R-08), `plot.minWidth`, `fg.streetwallGap100` (R-07's definition) — NG; target | E11 | W-11b |
| D5 | NG's hollow-block frequency and MFCG's inner-lot removal | COMPUTE | NG: bounded faces as blocks, footprints inside them, `block.courtShare`'s definition (E11 §2); MFCG: cluster blocks (V12 §3.4.1, the raster twin, R-22) on the sweep | `block.courtShare` (NG and MFCG; target per class); the deep-interior shares fitted from them (D32) | E09, E11 | W-09, W-11b |
| D6 | the MFCG sweep at ten seeds per matched size plus the stress variant | LANDED (E03; 34 of 35; `m1/W-03-complete` 16:49: seed 0's cold re-export byte-identical, `130/plain/8` frozen on the retry, 2 of J161's 3 loads used) | `captures/mfcg/exports-sweep-m1-2026-10-03/` with `j161/`; one load per seed (R-16); `130/plain/8` `no-export` (2 loads), stress 1 and 4 `retry`; the family reaches 10 usable by R-13's extension to index 10 (W-03b, 1 load, after W-01b's `--extend`; R-39) | every MFCG row below | E03 | W-03 (landed), W-03b |
| D7 | lot-orientation coherence; wall alignment | LANDED (fixtures, E07) → rows | the sweep's usable seeds through `adapters/mfcg.py` and `measure_mfcg.py` | `bldg.r4.60`, `.120`, `.250`, `bldg.wallAlign.median`, `bldg.wallAlign.share15` (R-12 F4) — MFCG; target | E07 | W-07b |
| D8 | walled and ribbon shares | LANDED (fixtures) → rows | the same | `walled.share`, `ribbon.share` (target; the ribbon band per size, R-12 F2) | E07 | W-07b |
| D9 | district areas, gates, towers, castle and plaza | LANDED (fixtures) → rows | the same; the gate law re-tested on the usable seeds | `district.area`, `plaza.area`, `castle.area`, `castle.compact`, `wall.nodeSpacing`, `quarter.count`, `gate.count`, `wall.towerSpacing` (MFCG; target) | E07 | W-07b |
| D10 | streetwall continuity on dense frontages ⟨M-1⟩ | COMPUTE | cluster-block outlines against footprint edges on the sweep (dense frontages per R-07) | `fg.streetwall` (MFCG; target) | E08 | W-08 |
| D11 | lots per block; T / Y share; intramural dead ends; blocks per ha ⟨M-1⟩ | COMPUTE | cluster blocks and the derived street graph (the raster twin, version 1.0.0, R-22) on the sweep; S-V12-2 decides descriptive status | `blockc.lotsPer`, `sgd.tShare`, `sgd.deadEnds`, `blockc.perHa` (MFCG; target, or descriptive by the ⟨M-1⟩ rule) | E09, E14 | W-09, W-14 |
| D12 | street-edge recoverability on the plain renders ⟨M-1⟩ | NEW (renders) | each plain SVG rasterised by headless Chrome at the city band's metres per pixel; §8.5's 2-px sampling | `fg.recoverability` (MFCG; target); `fg.coverWalled` (descriptive) | E08 | W-08 |
| D13 | FTG captures: programme 1 (six slots, J159 / J163) and programme 2 (22 premium slots, J164) | LANDED slots 0–5 (programme 1 complete) → NEW slots 6–27 (one sitting) | `profiler/session.mjs --target ftg --headful` + `drive.mjs` by `ftg_capture_checklist.md` section H (J163's rules; H12's guarded clicks) and, for programme 2, its section I (section 2.1b's premium differences as steps); the payload Fetch-intercepted; `ftg_capture_post.py` 10 checks; `plan.py --bind-ftg K=` in slot order | the 28 slots' READMEs (id, `WaterSetting`, population with `populationSource`, the listed population beside it (R-37), server time, buildings, request hash); `time.model` (FTG, weakness, server interval, R-21) at BIG_TOWN, BIG_CITY, METROPOLIS and CITY; every FTG row gains the payloads (R-34) | E02 | W-02 (programme 1), W-02b (programme 2) |
| D14 | outline anisotropy and turning per 100 m on every FTG payload | LANDED (fixtures, E05) → rows per slot | `adapters/ftg.py`, `measure_ftg.py` the day each slot lands | `street.turn100` (target, declared exception band; the ten-slot `type7` band printed beside it, DC-35), `street.stepHist`, `street.entropy50` (weakness), `outline.r90cv`, `outline.roadRatio` (target; band recomputed by the band rule at n = 10, DC-11) | E05 | W-05b |
| D15 | NG block counts per template at `medium` | COMPUTE | bounded faces per hood on W-04's 20 `medium` recordings (R-08) | `block.countTemplate` (counts; target), `block.area` (declared metres, the catalogue's bins — the row M0-b-05b reads), `block.areaRel` (descriptive companion, edges 0.5–500 A, 24 log bins) — NG; target | E11 | W-11b |
| D16 | the variety dispersions of MFCG and FTG ⟨M-1⟩ | COMPUTE, in one step after both samples are complete (R-40) | R-10's eight-component vector: W-09 writes MFCG's vectors (the usable plain seeds per size), W-05b writes FTG's (every usable slot per size, programme 2 included); **W-15 forms both dispersions** at TOWN, CITY and METROPOLIS with the pooled deviations over the union per rung (MFCG 10 ∪ FTG 10 at TOWN and CITY; MFCG 10 ∪ FTG 4 at METROPOLIS); `absFloor` 0.1 z | `variety.dispersion` (MFCG and FTG; target as a floor; one value per rung, `seeds` = n); the per-water-setting FTG values reported beside as a note | E09, E05, E15 | W-09, W-05b (vectors), W-15 (dispersions) |
| D17 | `baselines.json` | COMPUTE | `rows.py` + `bands.py` + `cross_check.py` over every record | `plat/packages/testkit/baselines/baselines.json` (`plat.baselines/2`, pins, rows, in-file crossings) + its `crossings.json` record (R-18) | E15 | W-15, W-20 |
| D18 | the sanitised implementer digest | COMPUTE | the findings and E05–E12; the nine entries of R-20 | `plat/docs/digest/`; the checker's report (0 / 0 / 0) in `plat/CLEAN-ROOM.md` §3 | E17 | W-17, W-18 |
| D19 | the hashed content deny-list | LANDED (research list, E16) → the crossing file | `make_denylist.py` rebuilt at the exit; M0's format (R-17, §7c) | `plat/packages/testkit/baselines/denylist.json` (`normalisationVersion: 1`); the §4 G-row | E16 | W-16, W-16b |
| D20 | `CLEAN-ROOM.md`'s seat ledger | COMPUTE | each crossing seat's own row at its landing (C-0120); the exit check | ledger rows in `plat/CLEAN-ROOM.md` §2 | E18 | W-19 |
| D21 | the plot-depth rows and regime floors re-fitted (item 34; J-A34.01) | COMPUTE | block minor extents: NG bounded faces per template (W-11b; declared metres and relative), MFCG cluster blocks inside the walls per size; `cut.flattenM` against the bent-cut signature | no `baselines.json` row: a numbers table in E12, a digest entry (R-20 (2)) and a design amendment | E12 | W-12 |
| D22 | V12 W1's rig share | LANDED (E01) → W-15 | `plan.py`, `metrics.m-1.json`, the adapters, the measure scripts, `rows.py`, `bands.py`, `cross_check.py`; spikes | the plan file, the registry twin, the rows, the first `CrossingRecord`; T-V12-1 fixtures, T-V12-28, T-V12-30 at W-15 / W-20 (R-26) | E01, E13, E14, E15 | W-01 (landed), W-13, W-14, W-15 |
| D23 | NG's bent-cut signature per face class (M0 (b)) | LANDED (fixtures, E10) → rows | `ng_faces_by_class.py` on W-04's 20 `medium` seeds after `TEMPLATE_W` is generalised (R-09) | `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` (NG; trace, target): the pooled, ring, plain and per-template rows M0 reads; the five face-class rows descriptive (R-09) | E10 | W-10b |
| D24 | MFCG's secondary-plaza frequency and non-adjacency ⟨M-1⟩ | LANDED (fixtures) → rows | every export's one square feature; the recorded generations' one market geometry each (E07 §6) | `market.secondary`, `market.adjacent` (MFCG; **target, reference 0**, R-12) | E07 | W-07b |
| D25 | FTG's six-tier lifestyle distribution (descriptive ⟨M-1⟩) | LANDED (E05 §5) | the request's weights; the tier-pair output proxy as a note | `wealth.tier1` … `wealth.tier6` (descriptive) | E05 | W-05 |
| D26 | every other §13.5 number M-1 states for FTG | LANDED (fixtures) → rows per slot | `measure_ftg.py` | `junction.angles`, `junction.share4`, `street.runs`, `bldg.area`, `bldg.quadSide`, `bldg.worstCorner`, `bldg.partyShare`, `bldg.attached`, `wall.towerSpacing`, `wall.ungated`, `gate.count`, `water.step`, `water.riverWidth`, `tree.nnP1`, `tree.nnMedian`, `tree.pcf`, `pop.perBuilding`, `time.model` (server; R-21) — roles and estimators per R-34: `type7` at BIG_TOWN and BIG_CITY (n = 10; the water rows over the six `coast+river` slots, `minmax`), `minmax` at METROPOLIS (n = 4) and CITY (n = 3); **`water.step` against §13.5's fixed bound "outline step ≤ 25 m"** (the reference value sharpened, the band column kept) and `water.riverWidth` by the band rule per class (R-48) | E05 | W-05b |
| D27 | the NG numbers of §13.5 that are not ⟨M-1⟩ | LANDED (fixtures, E11) → rows | `measure_ng.py` on the 20 `medium` recordings | `junction.angles`, `bldg.partyShare`, `bldg.attached`, `plot.moran`, `plot.cvDistrict` (R-23); `time.model` descriptive unless W-21 (R-21) | E11 | W-11b |
| D28 | the MFCG draw-style and timing numbers | LANDED (E07 §7) | the draw records; the export logs | `draw.casingLaw`, `draw.roundJoins`, `draw.roundCaps`, `draw.widthPx`, `draw.wallsAfterBuildings` (target, `ink`); `time.model` (MFCG) descriptive, `values.n` 0 unless W-21 | E07 | W-07 |
| D29 | **`ng-faces.json`** (M0's request, C-0043 / C-0086; R-14) | COMPUTE | W-10b's per-face records and W-11b's hood outlines (hull, R-08) on W-04's 20 `medium` seeds, registered frame, declared cm | the file of §7b, crossed with its own `CrossingRecord` | E10, E11, E15 | W-10b, W-11b, W-20 |
| D30 | **the cut-lengths-per-face row** (C-0086; R-15) | COMPUTE | `cut.length` on the same cuts | "bent-cut: cut lengths per face (NG 1.2.2, vertex captures) ⟨M-1⟩": `values.bins / histogram`, `spreadKS.p90` over the per-template subsets | E10 | W-10b |
| D31 | **`denylist.json` in M0's format** (C-0101; R-17) | COMPUTE | `make_denylist.py build --format m0` at the exit | §7c's file; its `crossings.json` record; the §4 G-row | E16 | W-16b, W-20 |
| D32 | **the deep-interior default shares** (§4.6; PC-09; R-19) | COMPUTE | NG's `block.courtShare` (formula seeds) and MFCG's inner-plot removal (E09) | the `modest` band's `court` cell fitted, the other bands by ratio, the `MFCG` preset's court cell; a digest entry and a design amendment | E12 | W-12 |
| D33 | **the digest entries M0 waits on** (R-20) | COMPUTE | E07, E09, E10, E11, E12 | the nine entries of R-20 in `plat/docs/digest/` | E17 | W-17 |
| D34 | **NG's draw census** (§13.5 draw style, `hatched`; R-23) | COMPUTE | the `draw/gen-0.draw.json` records of W-04's recordings | `draw.capSquare`, `draw.hatchPerWing`, `draw.shadowQuadsPerWing` (NG; target), `draw.roofLumaRatio` (descriptive; a ratio, no colour value) | E20 | W-22 |
| D35 | **the §13.5 cells no item filled** (`m1Uncovered`; R-23) | COMPUTE | the sweep (W-07b), the recordings (W-11b) | MFCG `bldg.area`, `water.step`, `water.riverWidth`, `pop.perBuilding`, `wall.ungated`, `wall.barrierShare`, `gate.count` at the stress setting; NG `plot.cvDistrict`; the rest stated below | E07, E11 | W-07b, W-11b |

**Not M-1's, or no row by reason (recorded so they are not re-found):** the VG rows (V07, V-M4) and the Fantasy Manor
rows (V02, M6c); `ftg-captures.json`, `ng-counts.json` and the panels' identifier files, written by `plan.py` at each panel's
milestone (DC-30); the M1 panel's MFCG `coast+river` pairs at TOWN and METROPOLIS; FTG TOWN's two slots (26, 27: the size
ladder's point inside our TOWN rung; research-side numbers in E05 §9, no row, because `FtgSize` has no TOWN member — R-34).
**No row, stated (R-23):** MFCG `label.*` (a qualitative weakness; ours gates on §13.7's bar); FTG `alley.gradient` (a model
metric; FTG's alley length is 0 by its class set); FTG's two market squares (no catalogue id; a note in E06); NG `label.*`
(NG draws none); NG `plot.spearman` (no prosperity in NG). **Every time cell M-1 cannot measure is one descriptive row in
C-0116's form (R-44):** MFCG and NG `time.model`, and `time.firstMap` and `time.worst` for all three (MFCG `time.worst`'s
row carries the stress seeds' attempt counts as its note), `values.n` 0 and reason `contended` or `unmeasured`, unless
W-21 runs; FTG's `time.model` rows are admissible server intervals (R-21).

## 2 The work items

Order is the `depends` column; waves are section 4's. Each item's record is `docs/calibration/E<nn>-<slug>.md` with its
`.json` beside it. Tiers: scripts and measurements on Opus seats; the ⟨M-1⟩ rulings, band exceptions and the crossing's
countersign on a Fable seat (this round's rulings are `M-1-rulings-1.md`). A `b` suffix is the second pass of a landed item,
under the same tool, on the plan seeds or the new slots.

| id | item | tool or script | inputs | outputs | checker | depends | wave |
|---|---|---|---|---|---|---|---|
| W-01 | the capture plan and the seed twin — **LANDED** (E01) | `research/baselines/plan.py` → `plan.json`, `metrics.m-1.json` | V12 §2.4's formulas | 85 slots; 182 ids; the FTG slot lifecycle | the three vectors byte for byte (CONFIRMED); the catalogue 182 = 182 | — | 1 |
| W-01b | the plan's amendments | `plan.py`: the recorded family `capture/FTG/CITY` (R-02), `mfcgExport.perSeed` one load per seed (R-16), `--extend <family> <n>` (R-13), `block.areaRel` edges, `perKm2` / `per100m`, `cut.length`, `wealth.tier1–6`, `bldg.wallAlign.median` / `.share15`, the draw members (R-01, R-12, R-15, R-23) in `metrics.m-1.json` | this plan | the two files regenerated; `--check` SAME on the unchanged parts | every existing seed unchanged (a JSON diff); the new ids present; the registry's `open` list empty but `variety.dispersion`'s floor now stated | W-01 | 2 |
| W-02 | FTG programme 1, six slots — all six **LANDED** (E02 §2, §10–§15; programme 1 complete at 19:20, J163) | `session.mjs --target ftg --headful --port 9341` on an isolated runner, `drive.mjs`, `ftg_capture_checklist.md` section H (J163's rules, H12's guarded clicks), `ftg_capture_post.py --slot k --signed-in [--premium]` | the owner's signed-in account; section 2.1's slot table | `captures/ftg/<stamp>/` with the payload, `create-request.json`, `request-diff.txt`, `structure.md`, `capture-facts.json`, README; the slot bound in `plan.json` | the 10 checks of `ftg_capture_post.py` (calls, size key, water keys, the request diff against the base and against slot 0 within the 16 named size-dependent leaves, the same-size values, decode, border, no resident field, `pb_raw`; R-24); `plan.py --check` SAME; the privacy grep of H11 | W-01; J159, J163 | 1 (slot 0), 2 (slots 1–5) |
| W-02b | **FTG programme 2** — the 22 premium slots 6–27 (J164; R-33), one sitting, by slot number | the same tools; section 2.1b's premium differences (the METROPOLIS option, the border half widths 3 000 / 2 500 / 1 750 m, the first-of-size rule R-41, the retry rule, `--premium`), as steps in the checklist's **section I** (written by `m1/plan-fix-3`, §12c); the session launches `workflows/25-ftg-signed-in.js` with slots 6–27 and the premium wording; lanes `m1/W-02-slot<k><suffix>` | the owner's premium account (unlimited saves; no further purchase); `plan.json` slots 6–27 | one capture folder per slot; `plan.py --bind-ftg K=<stamp>` in slot order (`--fail-ftg K=<reason>` for a created settlement that fails a post check, or a slot whose three create attempts made no settlement; a site refusal stops the run with the slot left open — section 2.1b (6)); E02 one section per slot and the `.json` entries; the size-dependent-value table extended per new size (E02) | the 10 checks per slot (the water-implied resource class pinned, §12c; the same-size check vacuous on a size's first capture, binding on its later ones); the first-of-size evidence recorded before any widening of the class (R-41); `plan.py --check` SAME after each bind; the privacy grep; the per-size totals of `plan.json`'s `ftg.perSize` reached or the shortfall recorded failed (never faked) | W-02 (slots 4–5 first: bind order); J164 | 2 (one sitting; first) |
| W-03 | the MFCG sweep — **LANDED** 34 / 35 (E03) | `research/baselines/mfcg_sweep_m1.mjs`, `sweep_m1.sh`, `check_w03.py`; one load per seed (JSON by the URL key, SVG by the app's export window) | the 35 plan seeds; the live build id | `captures/mfcg/exports-sweep-m1-2026-10-03/` (34 × JSON / SVG / PNG, `export-log.jsonl`, `loads.jsonl`, `stats.md`, `export-check.json`, README) | C1–C6 of `check_w03.py` PASS (CONFIRMED); the row's "35 of 35" and "cold re-export" open → W-03b | W-01; J159 | 1 |
| W-03b | closing W-03's row under J161 — **the extension only** (B-1; R-39): the re-export (byte-identical) and the retry (frozen) were done by `m1/W-03-complete` at 16:49 with 2 of J161's 3 loads and must not be run again | `mfcg_j161_m1.mjs` (the J161 tool with its own ledger `j161/loads.jsonl`, cap raised from 2 to 3 for this one load) after `plan.py --extend capture/MFCG/130/plain 11` (W-01b) | **1 load**: R-13's extension, index 10 = seedOf(`capture/MFCG/130/plain`, [10]); downloads denied, the files from the in-page Blob (E03 §9's route) | the family at 10 usable (indices [0, 11), index 8 `failed: no-export`, loads 2); E03 §10, the sweep README and `export-check.json` updated; `W-03.json` left as history (E03 §6 already corrected to "2 of 10 size-40 seeds exceed 1 500") | the extension's seed = seedOf(family, [10]), printed by `plan.py --vectors capture/MFCG/130/plain/10` (H32 1179968782, parkMiller 1179968783; `--check` prints SAME or DIFFERS only); `check_w03.py` PASS on the folder (C6 counting the J161 ledger too); **both ledgers counted: `loads.jsonl` 35 (J159) and `j161/loads.jsonl` ≤ 3 (J161), the build-id fetch logged as the same contact class**; the family's `type7` estimator unchanged | W-03, **W-01b** (`--extend`); J161 (the third load) | 2 (after W-01b) |
| W-04 | the NG recording programme — **LANDED** 44 / 44 (E04) | `ng_programme_m1.mjs`, `check_w04.py`, `record.mjs` unchanged | the 44 plan seeds | 44 folders (322 MB); the programme README; `paths-stats.md` | C1–C7 of `check_w04.py` PASS (CONFIRMED) | W-01; J159 | 1 |
| W-05 | FTG payload metrics — the twin **LANDED** (E05) | `adapters/ftg.py`, `measure_ftg.py --check` | the two CITY payloads | the fixture values; the five shifts (DC-08 … DC-13); the signature vector (R-10) | every check PASS (CONFIRMED); the rows 7–9 criteria accepted (R-11) | W-01 | 1 |
| W-05b | FTG measured values per slot (vectors, no dispersion; no `rows.py` — R-40, R-47) | the same scripts, run the day each slot lands; the per-slot values tabled in E05 §9 and the `MeasureInput` files kept for W-15 | the 28 slots as they land; the recorded family `capture/FTG/CITY` (`coast+river/0` usable) | per-slot values for every FTG metric of D14, D25, D26; the per-size samples W-15 forms into rows — BIG_TOWN and BIG_CITY `type7` at n = 10 (the water rows over the six `coast+river` slots, `minmax`), METROPOLIS `minmax` at n = 4, CITY `minmax` at 3 usable (R-34), `sample.captures` the slots in order; `time.model` server values (R-21); the FTG signature vectors (R-10) **without a dispersion**; the outline band's inputs (DC-11); the client scene time per slot with its contention flag (R-47); the `type7` turning band printed beside the declared exception (DC-35); TOWN's two slots as research-side numbers only; E05 §9 appended | each slot's `MeasureInput` equals a fresh run; every value's `captures` equal the plan's slots; the 2026-09-25 payload in no sample (R-04); the same-size values of E02 reproduced from the requests | W-02, W-02b (each slot) | 2 (rolling; the last pass after slot 27 or the programme's stop) |
| W-06 | FTG face recovery (#5) | `measure_ftg_faces.py`: a planar face walk inside each district ring; the dividing road against the face OBB; towers against wall vertices; land share inside faces | the CITY fixtures (labelled), day 1's payload, then each slot of both programmes | `ftg.ringBlock`; the notes of D1; the `plotShare` bound; the two-market note (R-23) | faces close (Euler per ring subgraph); areas sum to the ring within 1 %; **the last pass postdates the FTG programme's close** (slot 27 or its stop), so W-15 never consumes a partial sample (R-47) | W-05; W-02b for the last pass | 2 (rolling) |
| W-07 | MFCG signature, shares, anchors, markets, draw — fixtures **LANDED** (E07) | `adapters/mfcg.py`, `measure_mfcg.py --check` | the 2026-09-25 exports and sweep | the fixture values; F1–F4 (R-12); D24's finding; D28's members | T-V12-6's runnable clauses PASS (CONFIRMED) | W-01 | 1 |
| W-07b | MFCG rows on the sweep | the same scripts on `exports-sweep-m1-2026-10-03/` (usable seeds; `failed` carried); R-23's additions (`bldg.area`, `water.step`, `water.riverWidth`, `pop.perBuilding`, `wall.ungated`, `wall.barrierShare`, `gate.count` at the stress setting; the stress seeds' attempt counts as a note) | the usable seeds (10 / 10 / 9 or 10 / 3) | per-size rows of D7, D8, D9, D24 (reference 0), D35; the gate law's hits on the usable seeds; E07 §9 appended, §2's "fewer than 1 500 footprints" wording corrected | **T-V12-6 in full** (the five fixture covers 0.657 / 0.582 / 0.621 / 0.583 / 0.569 to three decimals printed; R4 within 0.02 of every per-city value; alignment within one point on the dry cities; the sweep's `stats.md` equal), R-24; every usable seed in every row; the failed indices listed | W-03, W-03b | 2 |
| W-08 | MFCG recoverability and streetwall | `measure_mfcg_render.py` (SVG → PNG through headless Chrome **with the network disabled** — a stored SVG may reference an outside resource and no contact outside section 5 is allowed, R-47; at the city band's scale; §8.5's 2-px sampling; pixel classes as `mfcg_cover.py`); `fg.streetwall` on cluster blocks over R-07's dense frontages | the sweep's plain SVGs and JSONs | `fg.recoverability`, `fg.streetwall`, `fg.coverWalled` rows; the rasters (≈ 60 MB); E08 | two renders of one SVG differ < 0.005; cover reproduces `stats.py`'s column; the render log shows 0 network requests | W-03, W-09 | 2 |
| W-09 | MFCG cluster blocks, derived graph, court share, variety vectors | `derived_graph.py`: cluster blocks (1 m gap, 3 m close), the raster medial axis at 0.5 m with 8 m spur pruning and 2 m node merge (the declared twin of V12 §3.4.1, version 1.0.0, R-22); `blockc.*`, `sgd.*`, `block.courtShare`, the inner-plot removal, the MFCG signature vectors (R-10) **without a dispersion** (B-2; R-40) | the fixtures, then the sweep's usable seeds | the rows of D5, D11; D16's MFCG vectors per usable seed (the file W-15 reads); the per-seed file W-13 and W-14 read; the court share for D32; E09 | planarity and face count; the blocks' area sum ≤ the walled area; the seed-to-seed CV handed to W-14; one vector per usable seed per size | W-03, W-07b | 2 |
| W-10 | NG bent cut per face class — fixtures **LANDED** (E10) | `ng_faces_by_class.py --check` | the 2026-09-25 captures | 11 / 11 checks; the per-face research-side file (168 faces) | 380 / 519, 96 %, 200 / 378 and σ 0.066 / 0.098 / 0.088 reproduced (CONFIRMED) | W-01 | 1 |
| W-10b | the NG trace rows, `cut.length` and the face records on the plan seeds | `ng_faces_by_class.py` with `TEMPLATE_W` generalised (template streets recognised by draw order and width class, the 2026-09-25 numbers as the red test, R-09); `cut.length` (R-15); the face-record writer for §7b (declared cm, R-01, R-14) | W-04's 20 `medium` recordings (registered frame from W-11b's adapter) | the pooled, ring, plain and per-template rows of `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` and `cut.length` (target); the five face-class rows (descriptive; < 10 bent cuts → a known-defects entry, R-09); the `ng-faces.json` candidate's faces; E10 §9 appended | the fixture run still prints 11 / 11; each parent's area equals its leaves' sum on every map; the formula σ against §13.5's 0.066 / 0.098 compared and any departure beyond the floor listed for DC-26's successor | W-04, W-11b (registration) | 2 |
| W-11 | NG ⟨M-1⟩ rows — the twin **LANDED** (E11) | `adapters/ng.py` (layer registration), `measure_ng.py --check` | the 2026-09-25 captures | T1 40 / 40, T2 8 / 8, 41 internal checks; the declared shifts (DC-24, DC-25) | PASS (CONFIRMED) | W-01 | 1 |
| W-11b | the NG rows on the plan seeds | the same scripts over the 44 recordings with the rulings applied: declared scale (R-01), pairing B (R-05), merged 4-way (R-06), the gap definition (R-07), bounded faces and the hull outline (R-08), `plot.cvDistrict` (R-23), `block.areaRel`'s edges; the hood-outline writer for §7b | W-04's recordings (`gen-0.png` present in all 44) | the rows of D2, D4, D5 (NG), D15, D27 at `medium` (5 seeds per template); D3's block minor extents at `small` / `large` for W-12; the hood outlines; E11 §10 appended | the fixture run still reproduces T1 and T2; registration ≤ 2 crossings per map on all 44 (the ±1 px neighbours reported); every row's `sample.indices` [0, 5) | W-04 | 2 |
| W-12 | the depth-row re-fit and the deep-interior shares | `fit_depth_rows.py` over W-09's cluster blocks (metres, per size) and W-11b's faces (declared metres and relative); `cut.flattenM` against the bent-cut signature; the share fit of R-19 | E09, E10, E11 | the numbers table with provenance "M-1 ⟨date⟩" (depth rows, regime floors, `cut.flattenM`, the `modest` court cell and the ratio-moved bands, the `MFCG` preset's court cell); the hand-off note; the digest entry text (R-20 (2), (6)); E12 | the fitted `[e_lo, e_hi]` reproduce the inputs' p10 / p90 within rounding; the shares of every band sum to 1; no block band is signed before this lands (J-A34.01) | W-09, W-10b, W-11b | 3 (Fable ruling over an Opus fit) |
| W-13 | spike S-V12-1 (bootstrap the bands) | `spike_bootstrap.py`: 1 000 resamples of the usable seeds per size; bands recomputed; flips counted at candidates on each band's edges ± 5 % | E07, E09 rows | the flip table; the pre-decided outcome (> 10 % of target rows flipping in > 5 % of draws → 20 seeds per size, an owner step, section 5 (3)); E13 | the resample is seeded and reproducible | W-07b, W-09 | 2 |
| W-14 | spike S-V12-2 (derived-graph stability) | the CV of `sgd.*`, `blockc.*` over the usable seeds per size; the sensitivity to the raster step (0.5 against 0.25 m) and the spur threshold (8 ± 2 m) on the five fixtures (R-22) | E09 | a metric with CV > 0.3 → descriptive by the ⟨M-1⟩ rule (a descriptive row in C-0116's form); the bias proxy for M0-c-07a's note; E14 | reproducible from E09's per-seed file | W-09 | 2 |
| W-15 | rows, bands, the dispersions, the candidate file | **the sole writer of `rows.py`, `bands.py` and `cross_check.py`** (R-47): `rows.py` (provenance, `sample`, role, `estimator`, `spreadKS`, the declared-scale note; **no `absFloor` or sign field in any row** — the floor stays in `metrics.m-1.json`, N-05; numbers kept below six consecutive digits where the unit allows: ratios at four decimals, areas in m², N-03), `bands.py` (V12 §3.5.1–§3.5.4; `type7` at n ≥ 10, `minmax` at 2–9, `single` at 1; the fixed-band rows keep §13.5's band column with the reference value sharpened — `water.step` among them, "outline step ≤ 25 m", while `water.riverWidth` is banded by the band rule per class, R-48), the **dispersion step** (R-40: both references' `variety.dispersion` at TOWN, CITY and METROPOLIS from W-09's and W-05b's vectors, pooled deviations over the union per rung) → the `baselines.json` candidate and the `ng-faces.json` candidate; `cross_check.py` (C1–C10 twin; C6 against `metrics.m-1.json`; the two new file kinds; the colour check reading string values only, N-03) | every E record; W-02 and W-02b complete (28 slots bound or failed); W-04; W-01b's registry (the new ids) | the candidates and the check's output; the recomputed bands with provenance "M-1 ⟨date⟩"; the list of passing-to-failing recomputations for the shift record; E15 | C1–C10 pass; every row has `referenceBuild`, `capture`, `script`, `date`; **every ⟨M-1⟩ cell has a target row or a descriptive row in C-0116's form (never a known-defects entry alone)**; no row carries a floor or sign field; **T-V12-1's fixtures each refused naming their check; T-V12-28; T-V12-30** (R-26); each FTG row's `sample.captures` equal the plan's slots in order (C7) | W-01b, W-02, W-02b, W-04, W-05b … W-14, W-22 | 3 (Opus build, Fable rulings on flips) |
| W-16 | the hashed deny-list — research list **LANDED**, design-set scan partial (E16) | `make_denylist.py build / scan / selftest` | the clean-room corpus at its cut | `denylist/denylist.v1.json.gz` (7 classes), the salt, the name digests, the supplement, `design-allow.tsv`; 4 texts routed to `design/cleanroom-fix-1` (R-29) | checks 1–10 PASS (CONFIRMED); check 11 after the renames | the `catchup/cleanroom` landing | 1 |
| W-16b | the deny-list at the exit, in M0's format | `make_denylist.py build --as-of now --format m0` (R-17, §7c; the same salt; tokens as runs of letters and digits; 16-hex digests; the `spell` class); `selftest` after `design/cleanroom-fix-1` lands; the research list rebuilt beside it | the corpus after programme 2's close (W-02, W-02b: both FTG programmes' folders join it), W-03b, W-04; W-23's exclusion list | `denylist.json` (the crossing candidate) and `denylist.v1.json.gz`; the generation record for the §4 G-row; E16 §9 appended | the self-test's eleven checks PASS on both lists, check 11 at 0 unreviewed; a planted leak in each M0 class caught by the research twin of M0's rules; the two lists' shared classes digest the same tokens | W-02, W-02b, W-03b, W-04, W-23, `design/cleanroom-fix-1` | 3 |
| W-17 | the implementer digest | the digest seat writes `plat/docs/digest/` from the findings, E05–E12 and `code-impact.md` §(d)'s P-ids: behaviours, measured numbers with their `baselines.json` ids, the creators' stated ideas, and **the nine entries of R-20**; the depth rows and shares reach M0 through entry (2) and (6) | the logged reading list | the digest; E17 | W-18 | W-15, W-16b | 3 (Fable) |
| W-18 | the digest check | the research twin of the scanner with W-16b's list + `doc_checks.py --doc` on each digest file, by a seat that reads only the digest | the digest | the report: 0 code excerpts, 0 reference word lists / palettes / tables, 0 deny-list hits → `plat/CLEAN-ROOM.md` §3; E17 | the counts; a seeded planted-leak test on a scratch copy caught | W-17 | 3 (Opus verify, Fable read) |
| W-19 | the seat ledger — the exit check | the lane logs against `plat/CLEAN-ROOM.md` §2 | every M-1 seat's reading list | every seat that wrote into `plat/` has a dated row before its landing (each crossing seat appended its own, C-0120); E18 | 0 missing rows | W-20 | 3 |
| W-20 | the crossing | the baseline seat (research-side) places `baselines.json`, `ng-faces.json` and `denylist.json` under `plat/packages/testkit/baselines/` and the digest seat the digest under `plat/docs/digest/`; the **checker seat (implementer-side, C-0120 (3); R-45) reads only the candidates, `baselines:check`'s output and the product's `metrics.json`**, runs `corepack pnpm baselines:check -- <file>` on each numbers-only file, appends the in-file `crossings` entry **and** C-0092's record to `crossings.json` for each file (R-18), signs its §2 row; the deny-list seat enters the §4 G-row; **the planted-hit control** (N-04): one listed token in a scratch copy outside `plat/` is caught by M0's scanner before the deny-list crosses; E19 lists the known-defects entries for M1's file (R-25) | E15, E14, E16 §9 (the exit list), E17 | the placed files; the records; E19 | `cross_check.py --previous` on an empty previous file; T-V12-1 / -28 / -30 (R-26); the planted-hit control caught; **M0-k-05 LANDED before any numbers-only file, M0-k-06 before the digest, a build or AFTER-M-1 wave open (C-0120, R-32)**; section 7's hand-offs N-01 … N-04 carried to M0-k-05 / M0-k-06 before those waves; the git commit the session's on the owner's word | W-15, W-16b, W-18; M0-k-05; M0-k-06 | 3 (Fable countersign) |
| W-21 | timing rows (optional; owner-gated) | `record.mjs` / `export.mjs` timing-only loads in an idle window after M0-t-01's reference score: 3 MFCG (one plain seed per size), 12 NG (three per template at `medium`); the host record and §12.1's ratio | an approval; the window | `time.model` rows for MFCG (descriptive) and NG (target); E21 | the machine idle (no build seat; the detector's sample); the ratio applied; without the approval the rows cross descriptive in C-0116's form (R-21) | M0-t-01; an owner go | 3 |
| W-22 | NG's draw census | `ng_draw_census.py` over `draw/gen-0.draw.json` of the 44 recordings: cap style, hatch triangles and shadow quads per wing (the count includes the two filled tapers along each ridge, §8.3), roof luma ratios as numbers | W-04's draw records | `draw.capSquare`, `draw.hatchPerWing`, `draw.shadowQuadsPerWing` (target), `draw.roofLumaRatio` (descriptive); E20 | the 2026-09-25 draw records reproduce §13.5's ≈ 17.4 and 2.33 within the count's rounding; no colour value in the record | W-04 | 2 |
| W-23 | `doc_checks.py`'s corpus exclusion (R-30; J161) — **applied and verified** (`docs/validation/clean-room-fix-2026-10-03.md` §3–§4 and its verifier: the base's C3 2 050 / 14 and C4 28 / 5 → 1 889 / 0 and 24 / 0, exit 0; `OWN_TREES` = `research/sf/`, `research/baselines/`; `OWN_RECORD` for the M-1 capture lanes' README, capture-facts, plan, check and index files from `M1_FIRST_CAPTURE_DAY` 2026-10-03, recordings kept) and **amended by R-38** (an M-1 folder's `stats.json` read for its string values only; receipts in `M-1-rulings-2.md` §3) | the receipt is the clean-room record; nothing left to run | E01 §6, E02 §7, E16 §5 (1) | the before / after counts (the clean-room record §3; R-38's counts in `M-1-rulings-2.md`) | **LANDED** by the clean-room lane and this round; W-16b's rebuild adopts the same two rules (R-38) | the clean-room lane's landing | 2 (done) |

### 2.1 FTG programme 1 (W-02): the six slots

The size ladder is FTG's own (`presets.json`): BIG_TOWN 5 600 people / 4 000 m, BIG_CITY 24 500 / 5 500 — §13.6 (2)'s
nominal targets. Slot 0 was created on the free one-per-day allowance under the guest identity of `profiler/.profiles/ftg`
(J159); the owner then signed in to FTG with their own account in that profile and approved the five remaining slots in one
sitting (J163, 2026-10-03 ~18:30 EDT), which replaced the six-day cron (`workflows/lane-prompts/ftg-daily-cron.txt`, now
history). **J163's rules (the checklist's section H carries them):** the seats never upgrade, pay, sign out, change
settings, delete, rename or share; decline non-essential on any cookie notice, accept nothing else; stop and report on any
payment, terms or sign-in prompt; the account's name, email, ids, tokens and cookies appear in no file outside `captures/`.
The settlements are saved in the owner's account, who may delete them later. During slot 3's first attempt the owner used
the recording window to subscribe to premium (J164); the seat detected the other hand and stopped without creating
(E02 §12), and the checklist's H12 now requires guarded clicks and a window left alone while a seat runs.

| slot | size | water | slot label | status |
|---|---|---|---|---|
| 0 | BIG_TOWN | nearest `none` | `capture/FTG/BIG_TOWN/none/0` | **landed** `2026-10-03T17-19-06` (guest; 1 694 buildings, 25 towers, 0 water bodies; `ftg:2026-10-03+aa8ba6c213b6`) |
| 1 | BIG_CITY | nearest `none` | `capture/FTG/BIG_CITY/none/0` | **landed** `2026-10-03T22-04-25` (signed in; 7 164 buildings, 66 towers, 3 water bodies; `ftg:2026-10-03+e2524cd0cb32`); settles E02 finding 1: the size-dependent values follow the size, 16 named leaves |
| 2 | BIG_TOWN | nearest `coast+river` | `capture/FTG/BIG_TOWN/coast+river/0` | **landed** `2026-10-03T22-21-00` (1 821 buildings, 31 towers, 3 water bodies; `ftg:2026-10-03+d93631bc2aed`) |
| 3 | BIG_CITY | nearest `coast+river` | `capture/FTG/BIG_CITY/coast+river/0` | **landed** `2026-10-03T22-43-28` (premium account, the same flow; 10 / 10 checks; `m1/W-02-slot3b`) after the stopped attempt of `m1/W-02-slot3` |
| 4 | BIG_TOWN | `coast+river` (second) | `capture/FTG/BIG_TOWN/coast+river/1` | **landed** `2026-10-03T22-57-34` (premium account; 1 880 buildings, 22 towers, 4 water bodies; `ftg:2026-10-03+2473a617654e`; `m1/W-02-slot4b`, 19:09) |
| 5 | BIG_CITY | `coast+river` (second) | `capture/FTG/BIG_CITY/coast+river/1` | **landed** `2026-10-03T23-10-37` (premium account; 7 270 buildings, 49 towers, 3 water bodies; `ftg:2026-10-03+101a10861aae`; `m1/W-02-slot5b`, 19:20) — programme 1 complete, slots 0–5 bound |

Every other form value stays as day 1 set it (E02 §6 (1)): FTG's default era, lifestyle, climate, material, race and
religion presets, the layout preset untouched, the farm, forest, reserve-area and wall boxes on (the 2026-09-21 base), the
name blank. Per capture: `text` and `shot` before every click; the size through the simple form's select; the create click
only when exactly one hit-testable match lies inside the dialog; no CPU profile; the overview and one core zoom after. Server
time = PUT sent → layout GET sent (W05-D12). The payload holds no resident count (CONFIRMED on six payloads), so
`populationSource` is `nominal`, re-checked per capture; the account's settlement list carries a per-settlement population
(5 769 and 5 906 against the nominal 5 600; 24 367 and 24 755 against 24 500), recorded beside the nominal value as
`listedPopulation` and **not used** (R-37). `referenceBuild` = `ftg:<server date>+<sha256 of the request body, 12 hex>`.
**The recorded CITY family (R-02, labels fixed by R-33):** `capture/FTG/CITY` holds the 2026-09-21 capture as
`capture/FTG/CITY/coast+river/0` (usable) and the 2026-09-25 capture as `capture/FTG/CITY/coast+river/1`, `failed: setting`
(its second-stage road step was 100 m against the default 60 m, R-04); both were coastal with rivers on (E02 §11.3 (2),
`research/ftg-capture/roadlength100/README.md`). Programme 2's slots 24 and 25 continue the family (`CITY/none/0`,
`CITY/coast+river/2`), so its rows become `minmax` at three usable.

### 2.1b FTG programme 2 (W-02b): the premium month's 22 slots (J164; R-33 … R-37, R-41)

**What the owner bought and why.** J164 (2026-10-03 ~18:50 EDT): one month of FTG premium — unlimited saves and the
premium-only size option, the metropolis — on the session's advice, chiefly for a METROPOLIS reference beside MFCG size 130
(D-31 reversed for this month) and for FTG rows strong enough to carry bands by the band rule (ten payloads per matched
size give V12 §3.5.1's `type7` estimator instead of `minmax` at three). The subscription is done; no further purchase is
ever made by a seat, and nothing renews on a seat's action. **The slots are in `plan.py` (`FTG_PREMIUM_SCHEDULE`) and
`plan.json` (`ftg.slots` 6–27, `ftg.programmes[1]`, `ftg.perSize`)**, so a recording seat takes a slot by its number
(`python3 research/baselines/plan.py --bind-ftg K=<stamp>`), in slot order; slots 0–5 are bound (programme 1 complete at
19:20), so slot 6 is the next to take.

| slot | size | water | slot label | why this slot |
|---|---|---|---|---|
| 6 | METROPOLIS (premium-only) | nearest `none` | `capture/FTG/METROPOLIS/none/0` | the METROPOLIS reference, the owner's chief motive; the panel's `none` pair |
| 7 | METROPOLIS | nearest `coast+river` | `capture/FTG/METROPOLIS/coast+river/0` | the panel's first `coast+river` pair |
| 8 | METROPOLIS | `coast+river` (second) | `capture/FTG/METROPOLIS/coast+river/1` | the panel's second `coast+river` pair |
| 9 | METROPOLIS | `coast+river` (third) | `capture/FTG/METROPOLIS/coast+river/2` | the fourth METROPOLIS: `minmax` at n = 4 covers 0.6 of the population on average (V12 §3.5.1), against 0.5 at n = 3 |
| 10 | BIG_TOWN | `none` (second) | `capture/FTG/BIG_TOWN/none/1` | BIG_TOWN and BIG_CITY alternate from here so a stopped run leaves the two matched sizes balanced |
| 11 | BIG_CITY | `none` (second) | `capture/FTG/BIG_CITY/none/1` | |
| 12 | BIG_TOWN | `coast+river` (third) | `capture/FTG/BIG_TOWN/coast+river/2` | |
| 13 | BIG_CITY | `coast+river` (third) | `capture/FTG/BIG_CITY/coast+river/2` | |
| 14 | BIG_TOWN | `none` (third) | `capture/FTG/BIG_TOWN/none/2` | |
| 15 | BIG_CITY | `none` (third) | `capture/FTG/BIG_CITY/none/2` | |
| 16 | BIG_TOWN | `coast+river` (fourth) | `capture/FTG/BIG_TOWN/coast+river/3` | |
| 17 | BIG_CITY | `coast+river` (fourth) | `capture/FTG/BIG_CITY/coast+river/3` | |
| 18 | BIG_TOWN | `none` (fourth) | `capture/FTG/BIG_TOWN/none/3` | |
| 19 | BIG_CITY | `none` (fourth) | `capture/FTG/BIG_CITY/none/3` | |
| 20 | BIG_TOWN | `coast+river` (fifth) | `capture/FTG/BIG_TOWN/coast+river/4` | |
| 21 | BIG_CITY | `coast+river` (fifth) | `capture/FTG/BIG_CITY/coast+river/4` | |
| 22 | BIG_TOWN | `coast+river` (sixth) | `capture/FTG/BIG_TOWN/coast+river/5` | the tenth BIG_TOWN: `type7` |
| 23 | BIG_CITY | `coast+river` (sixth) | `capture/FTG/BIG_CITY/coast+river/5` | the tenth BIG_CITY: `type7` |
| 24 | CITY (9 500 people, the timed preset) | nearest `none` | `capture/FTG/CITY/none/0` | the recorded CITY family reaches three usable: the generation-time row at CITY (`time.model`, weakness) and its descriptive companions at `minmax` |
| 25 | CITY | `coast+river` (third) | `capture/FTG/CITY/coast+river/2` | the same; poolable with the 2026-09-21 base (default settings, coastal with rivers) |
| 26 | TOWN (3 625 people, FTG's form default) | nearest `none` | `capture/FTG/TOWN/none/0` | the size ladder: a third FTG size inside our TOWN rung [1 500, 10 000) beside CITY and BIG_TOWN, so the 16 size-dependent request values and the footprint and street numbers can be read as a function of population within one rung (research-side numbers, E05 §9; no row, R-34); the first slots dropped if the sitting runs short |
| 27 | TOWN | nearest `coast+river` | `capture/FTG/TOWN/coast+river/0` | the same |

**Totals after programme 2** (`plan.json` `ftg.perSize`): BIG_TOWN 10 (4 `none`, 6 `coast+river`), BIG_CITY 10 (4 / 6),
METROPOLIS 4 (1 / 3), CITY 2 planned + 2 recorded, TOWN 2 — 22 new slots, 28 in all. **The water mix (R-33):** the
non-water rows pool both settings per size, so ten slots of any mix reach `type7`; the water rows (`water.step`,
`water.riverWidth`, the harbour) read only `coast+river` slots, so six of ten per matched size give them `minmax` at n = 6
(0.71 coverage) while four `none` slots keep the pooled rows representative of both settings and give the variety
dispersion a within-setting companion (D16); each size's first three captures in capture order are one `none` and two
`coast+river`, the panel's mix of §13.6 (2) (R-42). **Nominal populations and rungs** (`presets.json`; §1.1's bands):
METROPOLIS 49 500 → METROPOLIS, BIG_CITY 24 500 → CITY, CITY 9 500 → TOWN (as §13.5's generation-time row reads it),
BIG_TOWN 5 600 → TOWN, TOWN 3 625 → TOWN; border half widths 3 000 / 2 750 / 2 500 / 2 000 / 1 750 m.

**The premium differences in the procedure (the checklist's section H stays the procedure, and its section I carries
these points as steps; E02 §9–§13; `m1/W-02-slot3b`'s readings).** (1) The settlements view no longer shows the
saved-settlements counter, and a premium-settings link sits beside the account controls: it is **never clicked**, like the
sign-out, settings and new-folder controls, a row's menu, the map's re-roll control and anything about support, an upgrade
or billing (the checklist names each control by its site label, R-27). The seat still records the settlement count
before and after (the list read). (2) The form is the same, at the same coordinates; the size option for the metropolis is now enabled and is chosen **only for slots 6–9**, by the option
whose request value is `METROPOLIS` (the seat reads the option texts by `eval`, as C3–C4 say, and never guesses the
label); every other size by its request key as before. (3) The border check reads the size's half width (3 000 m for
METROPOLIS, 2 500 CITY, 1 750 TOWN — in `ftg_capture_post.py`'s `HALF_WIDTH_M`, installed by this round). (4) **The
first-of-size rule (R-41):** the first capture of a new size (slots 6, 24, 26) is itself the controlled comparison —
its form steps differ from the same-water slot of a captured size in the size option only — so the leaves that differ
against slot 0 beyond the 16 named ones are listed by the post script's `requestDiff` / `vsSlot0` checks, examined, and
added by name to `SIZE_DEPENDENT` with that capture as evidence and a table in E02 (as slot 1 did); the script then passes,
and the size's later captures must repeat those values exactly (the same-size check). Any difference that is not a
layout-preset value set by the size is a deviation: the slot is recorded `failed: <reason>`, never widened in. (5) Post:
`ftg_capture_post.py <stamp> --slot K --signed-in --premium` (`--check-only` first); bind with `plan.py --bind-ftg K=` and
`--check` SAME; an E02 section per slot and a `.json` entry. (6) **The retry rule (corrected by `m1/plan-fix-3`, §12c):**
a create whose PUT did not return 200 **and** after which the settlements list shows no new row made no settlement — the
seat may retry, up to three attempts in the lane (V12 §3.12's rule), each with a reading before it; a PUT that returned 200
with no new row in the list is **ambiguous** (the list may lag) and stops the run, reported and **never retried**, because a
retry could make a second settlement in the owner's account (any other combination is reported the same way); three
attempts without a settlement are `plan.py --fail-ftg K=<reason>`; a settlement that was created but fails a post check is
`plan.py --fail-ftg K=<reason>` with its folder kept, and the next slot follows (nothing slides: the slots are fixed by
number). A slot the site refuses (a limit, a payment prompt, a sign-in prompt, an expired premium) stops the run as section
H says; the slots left stay open in `plan.json`, recorded as the programme's shortfall, never faked (§13.6 (12)). (7) The
METROPOLIS payload is larger (BIG_CITY's was 1.1–1.3 MB; expect 2–3 MB) and its server time longer (≈ 10 s; §12.9's
creator figure); the five-minute poll of D3 stands. (8) The owner leaves the recording window alone while a seat runs
(J164); at any sign of another hand the seat stops as H12 says. (9) Privacy as H11; the account wording is "the owner's
signed-in account, premium since J164". (10) The checklist's own section I for these differences was written by lane
`m1/plan-fix-3` from this section before programme 2 began (revision 3 had given it to the first programme-2 seat, as slot
1's seat wrote H; it moved so that every programme-2 seat reads the same procedure, §12c): the slot table, the corrected
retry rule, R-41 as a step list, the `--fail-ftg` path, the metropolis option for slots 6–9 by its request value, and the
post command with `--signed-in --premium`.

### 2.2 The MFCG sweep (W-03, W-03b)

One load per seed (R-16; 35 loads = J159): the JSON export by the URL key on load, the SVG by the app's own export window,
two reference crops guarding every click. Query per export: the 2026-09-25 sweep's plain query with the plan's Park–Miller
seed substituted — the shanty-town and parks flags off, river and coast off; the stress variant switches river and coast on
at size 80. The canonical href after each load must carry the seed and those flags (checked on 34 / 34). A retry (a second
attempt under the same href, a different internal seed) is `sample.failed` reason `retry`, the files kept and excluded from
`usable`; a seed that produces no export in 180 s is `no-export`, never reloaded inside the approved count. `stats.py`'s
columns are the anchors' raw values. **Closing the row (J161), as it went:** seed 0's cold re-export (byte-identical) and
the one retry of `130/plain/8` (frozen again) were run by `m1/W-03-complete` at 16:49 with 2 of J161's 3 loads and are
never run again (E03 §9); what is left is W-03b, R-13's formula extension to n = 11 (index 10, the third load, after
W-01b's `--extend`; R-39), which brings the family to 10 usable, `type7`. No hand-chosen seed, ever.

### 2.3 The NG programme (W-04) — landed

44 single-generation recordings at `itch:11441280` (build unchanged), `--passes draw --vertices`, `gen-0.png` kept in
every folder (the adapter registers the footprint layer to the road layer from it, E11). Each folder 2–14 MB; 322 MB in all.
J159 (3) is used up: any further NG load is a new approval (section 5).

## 3 What ran on what we held, and what the fixtures are for

W-01, W-05, W-07, W-10, W-11 and W-16 ran on the disk's captures in wave 1. **Fixtures check the tool; rows come from plan
seeds** (R-03): the 2026-09-25 MFCG exports (T-V12-6), the two FTG CITY payloads and the 2026-09-25 NG captures are the
twins' red tests and reproduce the recorded numbers; no row is built from them except the recorded CITY family's `single`
rows (R-02). M0 (b) reads W-10b's and W-11b's rows on W-04's seeds and `ng-faces.json`; M0 (c) reads W-07b's and W-09's
rows on the sweep.

## 4 The waves

**Wave 1 — landed 2026-10-03 (13:12–15:26; verified 15:56):** W-01, W-02 day 1, W-03 (34 / 35), W-04, W-05, W-07, W-10,
W-11, W-16 (research list; design-set scan routed). The plan check and the verifier's findings are answered by
`M-1-rulings-1.md` and this revision.

**Wave 2 — now → the FTG programme's close (slot 27 or its stop, one sitting) and the MFCG and NG rows; at most three
research seats beside M0's four (J161), the FTG recording seat counted:**
1. **W-02** complete (slots 0–5 bound at 19:20), then **W-02b slots 6–27** (one recording seat at a time, by slot number, by
   the checklist's section I; the session launches `workflows/25-ftg-signed-in.js` with the premium wording), and **W-05b**
   per slot as each lands (vectors, no dispersion).
2. **W-01b** (first: `--extend`, the recorded CITY family's block, the registry ids) → **W-03b** (J161's third load: the
   extension) → **W-07b** (MFCG rows; T-V12-6 in full) → **W-09** (vectors, no dispersion) → **W-08**, **W-13**, **W-14**.
3. **W-23** is done (the clean-room lane and R-38).
4. **W-11b** → **W-10b** (the NG rows, `cut.length`, the `ng-faces.json` candidate) → **W-22**.
5. **W-06** (after W-05, on the fixtures and the slots as they land; its last pass after the programme's close).
6. The design seat's corrections DC-01 … DC-35 (`design/m1-corrections-1`, with `doc_checks.py --sections`), so that the
   catalogue holds `cut.length`, the units, the declared scale, the wallAlign split, the FTG METROPOLIS cells and the
   programme's counts before W-15 signs a band.
No crossing seat runs in wave 2 (R-32). Checkers are the items' columns; an Opus closing check re-executes each landing from
its shadow root as `m1/wave1-verify` did.

**Wave 3 — after the FTG programme's close and M0-k-05 (wave 11 of M0); the digest after M0-k-06 (wave 13):**
1. **W-12** (Fable ruling over an Opus fit) → **W-15** (rows, bands, the candidates; the flip list for the shift record).
2. **W-16b** (after `design/cleanroom-fix-1` lands) → **W-17** (Fable) → **W-18** (Opus verify).
3. **W-20** (the crossing; the checker seat countersigns both forms) → **W-19** (the exit check).
4. **W-21** only on an owner go, in an idle window after M0-t-01.
5. The session's commit on the owner's word; M-1's exit record (every §13.5 row present or descriptive in C-0116's form,
   every band by the band rule with provenance "M-1 ⟨date⟩", every slot of both FTG programmes decoded or recorded failed,
   the digest report 0 / 0 / 0, the depth rows recorded).

The disk check `df -h /Users/cstokes` runs between every capture and before every render batch; under 1 GB free the
programme stops and reports (12 GiB free at 19:00).

## 5 Owner-gated steps (named plainly, for the session to ask)

1. **FTG programme 1, slots 1–5 in the owner's signed-in account** — approved (J163: "Yes, all five now"); slots 1–5
   landed (programme 1 complete at 19:20); anything the site asks beyond section H's list stops the seat. **FTG programme 2, the 22 premium
   slots** — approved in count (J164: "about 20–25 more", BIG_TOWN and BIG_CITY to about ten, three to five metropolises, a
   few other sizes); the exact list of section 2.1b (22 slots: METROPOLIS 4, BIG_TOWN 7, BIG_CITY 7, CITY 2, TOWN 2) is
   this seat's ruling under J122 (R-33), **vetoable** — the owner may strike or reorder slots before the run (the two TOWN
   slots are the first to drop), and during it any slot after the last recorded one (`plan.py` refuses a change to a
   recorded slot's label, size or water, §12c). The seats make no further purchase; nothing renews by a seat; the settlements stay in the
   owner's account for the owner to delete; the recording window is left alone during a run (J164).
2. **MFCG: three more loads** — approved (J161): two used by `m1/W-03-complete` (seed 0's cold re-export, byte-identical;
   the retry of `130/plain/8`, frozen); the third is R-13's extension (1 load, 0 downloads by the Blob route), run by W-03b
   after W-01b. The 35 loads and 68 downloads of W-03 are done. The build-id fetches of the MFCG and NG game pages were
   inside J159's "Yes, both" to this section's items 2 and 3 (CONFIRMED by its wording); W-03-complete's one fetch and
   W-03b's are logged in the J161 ledger as the same contact class (R-47).
3. **S-V12-1's fallback** — + 30 MFCG loads and + 60 downloads (one load per seed, the method of 2.2) if W-13 triggers it;
   **not approved**; the seat stops and reports.
4. **W-21 timing loads** — 3 MFCG and 12 NG loads in an idle window after M0-t-01's reference score; **not approved**;
   without them the MFCG and NG `time.*` rows cross descriptive (R-21).
5. **NG: any further load** — J159 (3)'s 44 are used up.
6. **The crossing's commit** — `baselines.json`, `ng-faces.json`, `denylist.json`, the digest, `crossings.json`'s records
   and the `CLEAN-ROOM.md` rows: the session commits on the owner's word, re-confirmed in the chat of the day.
7. **R-14's firewall restatement** — `ng-faces.json` carries NG's recorded face rings (integer cm, numbers only) into
   `plat/`; decided under delegation because M0's landed choices C-0043 / C-0086 and §13.8's PR clause need it; **flagged for
   veto** as a widening of what crosses the clean room. **R-17's 16-hex truncation** of the deny-list digests (a format
   decision the session carries to M0-k-06, made explicit by the `digestHexDigits: 16` header field of §7c) is flagged here
   too — `M-1-rulings-1.md`'s header said so and its §4 omitted it (R-47).
8. **Design cells** — the corrections of `M-1-rulings-1.md` §2 (DC-01 … DC-30) and `M-1-rulings-2.md` §2 (DC-31 … DC-35,
   among them D-31's reversal for the premium month, which is the owner's own J164) and W-12's re-fitted cells land by
   amendment; reported, not asked (J-A34.01), unless a flip changes a signed golden (none is signed).
9. **Disk** — no seat deletes or moves data; the owner decides what moves off the volume if space falls short (the stopped
   slot-3 attempt's folder went to the Trash on the owner's own yes, J164).
10. **Dependencies** — nothing new is installed; any package would be asked for first.
11. **R-37 (the listed population) and R-42 (three FTG pairs per rung in the owner's sittings)** — both vetoable: the owner
    may prefer the account list's per-settlement population as the "recorded" one, or more FTG pairs per rung at the cost of
    a longer sitting.

## 6 Disk (MB; 12 GiB free at 19:00 on 2026-10-03, 11 at 17:00, 19 at 03:42 — the captures took ≈ 0.6 GB, the rest is the build's)

| item | measured or estimated | MB |
|---|---|---|
| FTG programme 1 | measured: slot 0 65 MB (21 shots at 2×, 20 MB of bodies), slot 1 46, slot 2 38, slot 3 ≈ 45 | ≈ 280 for six |
| FTG programme 2 | estimated from the measured slots: 14 BIG_TOWN / BIG_CITY × ≈ 45; 4 METROPOLIS × ≈ 60 (a 2–3 MB payload, the same shots); 4 CITY / TOWN × ≈ 40 | ≈ 1 030 |
| MFCG sweep | measured (205 MB, no bodies) + W-03b ≤ 15 | ≈ 220 |
| NG programme | measured | 322 |
| rasters (W-08) | estimate | ≈ 60 |
| `MeasureInput` files | measured 8.0 (MFCG) + 0.9 (NG) + 0.4 (FTG) → the sweep, the 44 recordings and 28 FTG slots (≈ 1 MB each at METROPOLIS) | ≈ 75 |
| deny-lists (two) and digests | measured 8.7 → ≈ 20 | ≈ 20 |
| records and scripts | text | ≈ 6 |
| **total new since 03:42** | | **≈ 2 000** (≈ 1 100 of it the FTG programmes); + 190 if S-V12-1's fallback runs; 12 GiB free, the 1 GB stop rule far off |

## 7 The crossing into `plat/` — seats, files and the gate (the baseline, deny-list, digest and design seats are research-side; the checker and digest-checker seats are implementer-side, C-0120 (3), R-45)

| file | writer | checker | rule |
|---|---|---|---|
| `plat/packages/testkit/baselines/baselines.json` | the **baseline seat** (research-side: `rows.py`, `bands.py`, `cross_check.py` — C6 against `metrics.m-1.json` runs here, at W-15) | the **checker seat** (implementer-side) — reads only the candidate, `baselines:check`'s output and the product's `metrics.json`, never `research/` or `captures/`; runs `corepack pnpm baselines:check -- <file>`; appends the in-file `crossings` entry and C-0092's record to `crossings.json` (R-18); signs its §2 row | §17.1 (4); V12 §3.3 C1–C10; append-only; `research:` labels; numbers, units, ids and provenance only; no row carries a floor or sign field (N-05); **after M0-k-05 has LANDED, while a build or AFTER-M-1 wave is open** (C-0120) |
| `plat/packages/testkit/baselines/ng-faces.json` (§7b) | the baseline seat, from W-10b's and W-11b's candidates | the same checker seat (the loader's refusals of C-0101 (3) are the build side's; the research twin's checks here) | R-14; DC-20; the same window |
| `plat/packages/testkit/baselines/denylist.json` (§7c) | the **deny-list seat** (`make_denylist.py build --format m0`; the salt kept) | the checker seat (`baselines:check` with the file kind; C4 reads hex-delimited six-digit runs only) and the **digest-checker seat** (the self-test) | §17.1 (5); the §4 G-row (date, opaque source labels, counts); the same window |
| `plat/docs/digest/` | the **digest seat** (reads the findings and E05–E12; logs every file read) | the **digest-checker seat** (reads only the digest): the scanner and the 3-gram / list checks; the report with 0 / 0 / 0 to §3 | §17.1 (2); **after M0-k-06 has LANDED** (its content check) |
| `plat/packages/testkit/baselines/crossings.json` | the checker seat only (append) | the wave's close attributes each crossing file by its record (C-0120 (4)) | C-0092's record shape |
| `plat/CLEAN-ROOM.md` rows | each seat above appends its own §2 row before its landing; the digest-checker its §3 report; the deny-list seat its §4 G-row | W-19 at the exit | §17.1 (7); C-0120 (5) |
| the design's cells (§4.6 / §4.7 depth rows and regime floors; the deep-interior shares; the recomputed bands; DC-01 … DC-30) | a **design seat**, by amendment, from E12, E15 and `M-1-rulings-1.md` §2 | `doc_checks.py --sections`; the shift record names each moved cell | §17.1 (2), (6); the depth rows and shares reach M0-b-05a and M0-c-07a **through the digest entry** (R-20), the amendment being the design's record |

`plat/docs/known-defects.json` is M1's (M0-x-03): M-1's ⟨M-1⟩ cells it cannot measure cross as descriptive rows of
`baselines.json` in C-0116's form (`role: descriptive`, provenance present, `values.n` 0 allowed, `sample.failed` with each
attempt's reason) and E19 lists the entries for M1's file (R-25); the reasons live in the rows themselves, because
implementer-side seats cannot read E19. Hand-offs the product side owes M-1: `plat baselines check` (M1) re-validates the
M-1 files (T-V12-1); `plat measure` re-runs every row on the stored `MeasureInput` files (T-V12-3, T-V12-6; `check_t3.py`,
`check_t6.py`); the panel script writes `ftg-captures.json` from the READMEs of each rung's panel captures at M1 (R-42); a
`normalisationVersion: 2` adding the `id` and `phr` classes (R-17) is requested, not required.

**Hand-offs the session carries to M0 before its waves 11 and 13 (the closing check's N-01 … N-05; R-46; C-0071's channel):**

1. **N-01, before M0-k-05 (wave 11):** one table — id, unit, `metricVersion` and role — for every row an AFTER-M-1 item
   reads (`sgd.tShare`, `sgd.deadEnds`, `blockc.perHa`, `blockc.lotsPer`, `junction.angles`, `junction.share4`,
   `block.countTemplate`, `block.area`, `block.courtShare`, `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet`,
   `cut.length`, `bldg.r4.60` / `.120` / `.250`, `bldg.wallAlign.median` / `.share15`), so M0-k-05's `METRICS` registry
   picks M-1's ids (the parity CLI matches rows by id; a mismatch reads every M0-gated ⟨M-1⟩ cell as "row missing").
2. **N-02, before M0-k-05:** §7b's schema whole, with `referenceBuild` on every hood and face record (C-0086 and C-0101 (3)
   require it per face), and the string rule "every string matches V12 §3.3 C2's patterns" (`seedLabel`, `capture`).
3. **N-03, before M0-k-05:** a deny-list file kind for `baselines:check`, and a colour check (M0's C3) that reads a colour
   only inside a string value, never inside a JSON number or a 16-hex digest — `ng-faces.json`'s cm² integers run to eight
   digits and every digest holds six-hex runs. `cross_check.py` reads the same way (its C4 in V12's numbering).
4. **N-04, before M0-k-06 (wave 13):** §7c whole with the header field `digestHexDigits: 16`, which the scanner refuses when
   it does not know it; and W-20's planted-hit control (one listed token in a scratch copy outside `plat/` caught by M0's
   scanner) before the deny-list crosses — the truncation's failure mode would otherwise be a silent zero-hit pass.
5. **N-05, at W-15:** no row M0 gates on carries an `absFloor` or a sign-indefinite field (C-0092 reads those as
   `notApplicable`); the floor stays in `metrics.m-1.json`.

### 7b `ng-faces.json` — the schema (R-14; numbers only; every id an integer)

```
{ schema: 'plat.ng-faces/1', referenceBuild: 'itch:11441280', metricsVersion: '1.0.0',
  scaleDeclared: { mPerModelUnit: 0.35 },          // R-01; the frame is the registered road frame (E11)
  outlineKind: 1,                                   // 1 = convex hull of drawn road and footprint vertices (R-08)
  hoods: [{ id, referenceBuild: 'itch:11441280', template: 'area'|'street'|'square'|'ring',
            seedLabel: 'capture/NG/<template>/medium/<i>', capture: '<folder>', outlineCm: [[x, y], …] }],
  faces: [{ id, referenceBuild: 'itch:11441280', hood, template,   // referenceBuild on every record: C-0086, C-0101 (3); N-02
            classes: { holed: 0|1, cShaped: 0|1, triangular: 0|1, curved: 0|1, roundJoined: 0|1 },
            ringCm: [[x, y], …], holesCm: [[[x, y], …], …],
            blockAreasCm2: [int, …],                // the bounded leaf faces its cuts created
            cuts: [{ lengthCm: int, cornerT: int /* thousandths along the course; -1 for a straight cut */, arrivalCdeg: int,
                     fillet: 0|1, bends: int }] }],
  crossing: { … }                                   // V12 §2.3's in-file record; the crossings.json record beside it }
```

Produced by W-10b (faces, cuts, block areas) and W-11b (hoods, outlines) from W-04's 20 `medium` recordings; checked
research-side (every ring closed and simple, every number an integer, every face's area equal to its leaves' sum within one
cm², every string matching V12 §3.3 C2's patterns — `seedLabel` and `capture` are the only free strings, the rest the
schema's enumerations), then by `corepack pnpm baselines:check` and M0-k-05's `loadNgFaces`.

### 7c `denylist.json` — M0's format at `normalisationVersion: 1` (R-17; C-0101)

`{ schema: 'plat.denylist/1', normalisationVersion: 1, digestHexDigits: 16, date, corpusCut, salt: '<64 hex>', counts: {…},
tokens: [...], trigrams: [...], colours: [...], files: [...], lists: [{ id: int, words: [...] }], spell: [...] }` — every
array a sorted list of 16-hex digests; `digestHexDigits` names the truncation so a scanner built to the full digest refuses
the file instead of passing with zero hits (N-04). Normalisation: NFKD, combining marks stripped, lower-cased; a token is a maximal run of letters and
digits (an underscore splits); a 3-gram is three consecutive tokens; a colour is six lower-case hexadecimal digits; file
bytes raw. Item encodings: token = the token; 3-gram = the three tokens joined by one U+0020; colour = the six digits; file =
the bytes; list word = the word (members of four or more letters, per recorded list); spell = the word of the exclusion set
(web2 plus the 179-word supplement). Digest = the first 16 hex digits of SHA-256(salt ‖ item). The research-side list
`denylist.v1.json.gz` keeps `id` and `phr` for the design-set scan. The session carries this paragraph to M0-k-06 before
wave 13.

## 8 What M-1 cannot measure, and the ⟨M-1⟩ rule for it

Each becomes a descriptive row in C-0116's form (never no row) and an E19 entry for M1's `known-defects.json`:

1. **FTG plot depth, frontage and plot share** (D1): the client receives no plot (item 49, CONFIRMED) — descriptive rows;
   `ftg.ringBlock` stays descriptive; the land share inside faces is a bound in E06.
2. **FTG resident count**: the payload carries none (CONFIRMED on three payloads); `populationSource: 'nominal'`.
3. **MFCG derived-graph rows** (D11) whose seed-to-seed CV exceeds 0.3 (S-V12-2): descriptive by the pre-decided rule.
4. **FTG lifestyle shares** (D25): inputs, not outputs; six descriptive rows (E05 §5).
5. **MFCG and NG `time.model`, and `time.firstMap` / `time.worst` for all three** (R-21, R-44): contended or unmeasured —
   one descriptive row each in C-0116's form with `values.n` 0 and reason `contended` (the 2026-10-03 runs) or `unmeasured`
   (no run), unless W-21 runs; MFCG `time.worst`'s row carries the stress seeds' attempt counts in its note; FTG's first-map
   clause at BIG_TOWN and BIG_CITY has no reference value at M-1 (the client scene times are contended) — an E19 entry, with
   each slot's scene time and its contention flag tabled in E05 §9 so M1 knows what exists.
6. **W-10's thin face classes** with fewer than 10 bounded bent cuts on the formula sample (R-09): descriptive companions.
7. **The §4.5 hidden-share base weights** "fitted at M-1 on B-CITY": M1's (DC-22); **`plotShare` per regime**: M1's.
8. **Withdrawn from this list by measurement:** MFCG secondary markets (D24) — measurable, reference 0, a target row (R-12).

## 9 Risks and pre-decided outcomes

| risk | pre-decided outcome |
|---|---|
| itch serves a newer MFCG or NG build | did not happen for the sweep or the programme (E03, E04); for W-03b and any W-21 load the new build becomes a declared pin shift (V12 §3.8; J-V12.13), the owner told first |
| an FTG slot is refused or fails | the retry rule of section 2.1b (6): a create whose PUT did not return 200 and after which the list shows no new row may be retried, up to three attempts (then `--fail-ftg`); a PUT 200 with no new row is ambiguous and stops the run, reported, never retried; a settlement that fails a post check is `plan.py --fail-ftg K=<reason>`; a site refusal stops the run with the slot left open; fewer slots than planned at the exit leaves the rows at their smaller n (`minmax` below ten) and the pairs recorded, never faked (§13.6 (12)) |
| the premium month lapses before programme 2 closes, or the owner stops it | the slots left stay open in `plan.json`, the programme's shortfall recorded in E02; no seat renews or buys anything; the rows take the slots landed |
| a new size's first capture differs from slot 0 beyond the 16 named leaves | R-41: the leaves are examined; layout-preset values set by the size are named into the class with the capture as evidence (the controlled comparison); anything else is a deviation and the slot is recorded failed |
| the raster twin of the derived street graph differs from the product's skeleton beyond T-V12-3's 0.5 % | declared: version 1.0.0 stands at M-1; the digest's derivation entry lets M0-c-07a derive ours the same way (like with like); at M1 the product's value supersedes with a `baselineShift` (J-V12.1); W-14's sensitivity report is the bias proxy (R-22) |
| the ten MFCG seeds give unstable bands (S-V12-1) | 20 seeds per size: an owner step (section 5 (3)) |
| `130/plain/8` froze on the retry (history: it did, `m1/W-03-complete` at 16:49, E03 §9) | as pre-decided, R-13: the family extends by formula to index 10 (W-03b, J161's third load; R-39), n back to 10 usable; should index 10 fail as well, R-13's next index needs a new approval (section 5) |
| a formula NG value departs from §13.5's recorded number | the design number is corrected as a declared shift; the formula row stands (R-03) |
| M0-k-05 / M0-k-06 land late | the crossings wait (R-32); every candidate is complete and checked research-side meanwhile, so the wait costs no rework |
| disk under 1 GB | stop and report |
| a seat reads a bundle | forbidden for every M-1 seat; the readers' files are the only route |

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (read or executed): wave 1's receipts (E01–E16, re-executed by `m1/wave1-verify`); the load counts (J161: 2 of 3
used, `results/W-03-complete.json`); the free space; M0's requests (M0.md §1, `afterM1Needs`); the choices and rulings
cited; the texts behind every ruling; the four landed FTG slots' numbers (E02); `plan.py`'s regeneration with the 28 slots
keeping slots 0–5 and their bindings, `--check` SAME, `metrics.m-1.json` byte-unchanged, and the R-36 refusals
(`M-1-rulings-2.md` §3). PLAUSIBLE: the per-slot FTG folder size at 2× and the METROPOLIS payload's size; the five-minute
W-07b run on 34 seeds; that the 16-hex truncation suits M0-k-06's loader (carried by the session with `digestHexDigits`;
a refusal surfaces at wave 13's tests); that `modest` is NG's band and the hull an acceptable district shape (R-19, R-08 —
amendable); that the listed population is the generated resident count (R-37 keeps nominal); that a METROPOLIS request
differs from slot 0 only in size-set layout values (R-41 tests it on slot 6).

## 11 How the session checks this plan

Every §16 M-1 deliverable and every M0 request appears once in section 1 with a class, a source and a work item; every ⟨M-1⟩
cell of §13.5 and every `m1Uncovered` pair appears in section 1 or its "no row, stated" paragraph; every work item has a
tool, inputs, outputs, a checker and a wave; every third-party contact, download and `plat/` write is in section 5 or 7;
the crossing's gate on M0-k-05 / M0-k-06 is stated; no reference word, grammar, palette value or identifier beyond FTG's two
size names and the four template keys is in this file. `M-1-work.json` is the same content in machine-readable form and
parses (35 deliverables, 31 work items, 21 records, 11 owner-gated steps; CONFIRMED). **Revision 2's self-check** ran at
16:5x on 2026-10-03 (the "17:10" and "17:40" clock statements of revision 2 and `M-1-rulings-1.md` were wrong — both files
were written at 16:59 and LANDED at 17:01, as the closing check found; the counts reproduce): C1 0, C2 0, C4 0, S1 0, S2 0;
C3 26 / 25 then, 28 / 27 at the closing check's re-run (corpus drift), every hit read — dates and capture stamps, digit
runs of section numbers, and phrases of our own records, none a reference word list, palette, grammar or identifier; this
file is not in the design set, so no allow rows are added (wave 1's precedent). **Revision 3's self-check** is recorded in
`M-1-rulings-2.md` §3 with its counts and clock.

## 12 Changelog (revision 1 → revision 2; the full old text is git 65c115b)

| where | revision 1 said | revision 2 says | why |
|---|---|---|---|
| §1 ledger | 28 deliverables; NG rows from the 2026-09-25 captures; FTG rows pooled over the two CITY payloads; D24 "likely unmeasurable" | 35 (D29–D35 added: `ng-faces.json`, the cut-length row, `denylist.json` in M0's format, the deep-interior shares, the digest entries, NG's draw census, the uncovered cells); NG rows from W-04's seeds; the CITY payloads a recorded family, the 2026-09-25 one excluded; D24 a target with reference 0 | PC-01, PC-02, PC-04, PC-05, PC-07, PC-09, PC-10, PC-13; R-02 … R-04, R-12, R-14, R-15, R-17, R-19, R-20, R-23 |
| §1 D3 / `M-1-work.json` D3 | the JSON gave D3 rows and E04 only | aligned with the text (no row; E04, E11, E12) | PC-21 |
| §2 W-02 | the consent notice "the owner's" | J159's rules in the checklist; the water-key check; the request-diff class pinned on days 2–6 | PC-16; R-24 |
| §2 W-03, §2.2, §5 (2) | "one cold navigation per file"; 35 loads understated | one load per seed = 35; J161's three loads; the replacement-seed rule | PC-06; R-13, R-16 |
| §2 W-04, §4 | wave 2 | wave 1, landed | PC-21 |
| §2 W-07 checker | the row's five clauses | T-V12-6 in full | PC-14 |
| §2 W-09 depends | W-07 | W-03, W-07b | PC-18 |
| §2 W-10 / W-11 | face classes only; `scale: relative`; party walls by the old script | per-template subsets; the declared 0.35 m scale; the old script as the twin and V12's shifts declared; the rulings R-05 … R-09 applied | PC-02, PC-03, PC-15; R-01, R-05 … R-09 |
| §2 W-12 | the depth rows | + the deep-interior shares (R-19) | PC-09 |
| §2 W-15 / W-20 | C1–C10 | + T-V12-1's fixtures, T-V12-28, T-V12-30; both crossing forms; the M0-k-05 / M0-k-06 gate | PC-08, PC-19; R-18, R-26, R-32 |
| §2 W-16 / §7 | "the digest file for the scanner" unnamed; no crossing | `denylist.json`, `normalisationVersion: 1`, §7c's encodings; a crossing with its record and the §4 G-row | PC-07; R-17 |
| §2 W-17 | the digest | the nine entries of R-20 | PC-10 |
| §2 W-19 | before W-20 | the exit check after W-20 | PC-18 |
| §2 new items | — | W-01b, W-03b, W-05b, W-07b, W-10b, W-11b, W-16b, W-21, W-22, W-23 | the rulings |
| §2 time rows (W-05, W-07, W-11) | from capture logs | FTG server time admissible; MFCG and NG descriptive unless W-21 | PC-11; R-21 |
| §2.1, §2.2, D24 | reference option labels and keys quoted | our own terms | PC-20 |
| §3 | "W-07 and W-09's fixture pass give M0 (c) the MFCG rows" | fixtures check the tool; rows come from plan seeds | PC-04 |
| §4 | first wave only | wave 1 landed; wave 2 and wave 3 laid out with order, checkers, crossing seats | the brief |
| §5 | 8 items | 10; the S-V12-1 extension, the timing loads and R-14 named | PC-06; R-14, R-21 |
| §7 | one crossing form; `known-defects.json` written at W-20 | both forms; `known-defects.json` M1's, descriptive rows in C-0116's form | PC-08, PC-18 |
| §7b, §7c | — | the two file schemas | PC-01, PC-07 |
| §8 | D24 "one exported square" expected descriptive | withdrawn (a target, reference 0); the time rows and the thin classes added | R-12, R-21, R-09 |
| §9 | — | + the raster twin's consequence for M0-c-07a, the formula-vs-recorded rule, the M0 gate | PC-12; R-22, R-32 |

### 12b Changelog (revision 2 → revision 3; the full revision-2 text is git 8010bfa)

| where | revision 2 said | revision 3 says | why |
|---|---|---|---|
| title, header, "Where M-1 stands", §0 | revision 2, after wave 1 | revision 3, after the round-1 closing check and J163 / J164; what landed since (W-03-complete, the clean-room fix, FTG slots 1–3); revision 3's reading list | the brief |
| §1 header, D6, D13, D14, D16, D26, the no-row paragraph | FTG three per size, `minmax` n = 3; W-03b closes with three loads; D16 at W-09 and W-05b; MFCG `time.worst` no row | 28 FTG slots, `type7` at n = 10, METROPOLIS n = 4, CITY three usable, TOWN research-side; W-03b the extension only; D16's dispersions at W-15 from W-09's and W-05b's vectors; every unmeasured time cell one descriptive row | R-33, R-34, R-39 (B-1), R-40 (B-2), R-44 |
| §2 W-02, W-03b, W-05b, W-06, W-08, W-09, W-15, W-20, W-23; new W-02b | days 2–6 by the cron; W-03b three loads, no W-01b dependency, one ledger; W-05b and W-09 write dispersions; W-15 "a row or a known-defects entry"; W-20's checker reads `metrics.m-1.json`; W-23 to run | programme 1's slots and status; W-03b the extension after W-01b, both ledgers counted; vectors only; W-15 the sole writer of `rows.py`, forms the dispersions, no floor field, the digit rule, every ⟨M-1⟩ cell a row; W-20's checker implementer-side with the planted-hit control; W-23 done; W-02b the premium programme | B-1, B-2, N-03 … N-06, §3 and §4 of the notes; R-39 … R-47 |
| §2.1; new §2.1b | the six-day schedule, premium ruled out | programme 1's slot table with status; programme 2's 22 slots, totals, water mix, nominal populations and rungs, the premium procedure differences, the first-of-size and retry rules | J163, J164; R-33, R-37, R-41 |
| §4 | wave 2 to FTG day 6; wave 3 after day 6 | wave 2 to the programme's close; W-01b first; W-23 done; DC-01 … DC-35; wave 3 after the programme's close | R-33, R-39 |
| §5 | FTG days 2–6 approved; three MFCG loads to run; 10 items | J163 / J164's programmes, the premium limits, the slot list vetoable; 2 of 3 loads used; R-17's flag; R-37 and R-42 vetoable; 11 items | the closing check's B-1 and R-17 note; R-33, R-37, R-42 |
| §6 | six FTG days ≈ 390 MB; total ≈ 1 080 | both programmes ≈ 1 310 MB measured and estimated; total ≈ 2 000; 12 GiB free | R-33 |
| §7, §7b, §7c | "research-side seats only"; the checker reads `metrics.m-1.json`; `referenceBuild` at the file top; no digest-length field | the checker implementer-side (C-0120 (3)); `referenceBuild` per hood and face; C2's string rule; `digestHexDigits: 16`; the five hand-offs N-01 … N-05 the session carries | N-01 … N-06; R-45, R-46 |
| §8 (5) | descriptive, reason `contended` | one row form for every unmeasured time cell; the FTG first-map E19 entry and the scene-time table | R-44, R-47 |
| §9 | "an FTG day is refused … slides" | the slot retry rule; the premium lapse; the first-of-size deviation | R-41; §2.1b (6) |
| §10, §11 | — ; the 17:10 clock | the new CONFIRMED / PLAUSIBLE items; the clock statements corrected; revision 3's self-check in the rulings record | the closing check's note |
| header, §2 W-02, §2.1 (slot 5's row), §2.1b, §4 (1), §5 (1) — a status touch after the owner's account switch (still revision 3) | slot 5 being recorded; slots 4–5 running; slots 4 and 5 bind first | slot 5 landed at 19:20 (`2026-10-03T23-10-37`); programme 1 complete, slots 0–5 bound; slot 6 next | `m1/W-02-slot5b`'s LANDED line; the CONTINUE rule (`M-1-rulings-2.md` §7) |

### 12c Changelog (lane `m1/plan-fix-3`, after the two FTG verifiers and the closing check of revision 3; still revision 3)

The text before this round is the working-tree file this lane read first (sha256 `e0cd42564805…`, not yet committed);
the record is `M-1-plan-fix-3.md`, the result `results/plan-fix-3.json`.

| where | revision 3 said | it now says | why |
|---|---|---|---|
| header | — | the fix round in one sentence; R-48 named | this round |
| §1 D13 | LANDED slots 0–3 → NEW 4–27; section H with 2.1b's differences | LANDED slots 0–5 → NEW 6–27; section H and, for programme 2, section I | programme 1 complete; section I written |
| §1 D26; §2 W-15 | `water.step` among the band-rule rows (R-34) | `water.step` against §13.5's fixed bound "outline step ≤ 25 m", the reference value sharpened; `water.riverWidth` by the band rule per class | R-48 (notes §6 point 5) |
| §2 W-02b | section 2.1b's differences; `--fail-ftg` for a slot "the site or the server refuses" | the same as steps in the checklist's section I; `--fail-ftg` for a failed post check or three attempts without a settlement, a site refusal leaving the slot open (as 2.1b (6) and §9 already said); the checker names the pinned water class | section I moved here; the row agreed with 2.1b (6) |
| §2 W-03b checker | the seed "printed by `plan.py --check`" | printed by `plan.py --vectors capture/MFCG/130/plain/10` (1179968782 / 1179968783) | `--check` prints SAME or DIFFERS only (notes §6 point 6) |
| §2 W-16b | inputs "the corpus after W-02 day 6"; depends W-02 | the corpus after programme 2's close; depends W-02 and W-02b | notes §6 point 6 |
| §2.1b intro, (1) | the site's control labels quoted | our terms; the checklist keeps the labels | R-27 (notes §6 point 6) |
| §2.1b (6); §9 | retry when the PUT is not 200 **or** the list shows no new row | retry only when the PUT is not 200 **and** no new row; a PUT 200 with no new row stops the run, reported, never retried | notes §6 point 4: the "or" could create a duplicate settlement |
| §2.1b (10) | section I written by the first programme-2 seat | written by this round, before programme 2 | every programme-2 seat reads one procedure |
| §2.2 last sentence; §9 row | the re-export and the retry as steps to run; "freezes on the retry" as a risk | both as history (`m1/W-03-complete`); W-03b the extension only; a further index needs a new approval | notes §6 point 6 (B-1's leftovers) |
| §4 (1); §5 (1) | — | programme 2 by section I; the owner's veto covers rows after the last recorded slot, `plan.py` refusing a change to a recorded one | the `plan.py` guard (notes §6 point 2) |
| tools (no plan text) | `ftg_capture_post.py` classed every resource leaf as water-implied by prefix; `plan.py` guarded only the first six labels | the water class pinned (six leaves and the water setting's whole list); `compute()` refuses any change to a recorded slot's label, size or water, or its removal | the two FTG verifiers' red test; notes §6 point 2 |
