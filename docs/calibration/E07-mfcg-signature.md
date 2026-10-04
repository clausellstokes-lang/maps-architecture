# E07 — MFCG street signature, shares, anchors, markets and draw style: the fixture pass (W-07)

Lane `m1/W-07`, 2026-10-03, on the owner's Mac. Research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do
not read it). It carries numbers, metric ids and our own words only: no place name, colour value, identifier, word list
or code. Numbers are in `E07-mfcg-signature.json` beside it (sha256 `55b8b186…`), written by the tool below.
**Section 9.1–9.8 (lane `m1/W-07b`, wave 2)** appends the values on the M-1 sweep's 33 usable seeds, with T-V12-6 in full;
their numbers are in `E07-mfcg-signature.plan.json`. Section 2's sentence on the 1 500-footprint sample is corrected in
place, marked as such.

**Outcome.** The W-07 tool is built and run on the 2026-09-25 files (the T-V12-6 fixtures and the 2026-09-25 size
sweep), and **every check of the item row passes** (CONFIRMED, `measure_mfcg.py --check`, exit 0): R4 at 60 / 120 /
250 m on the gates-4 city is 0.840 / 0.579 / 0.318 against 0.84 / 0.58 / 0.32 (differences +0.0002, −0.0009, −0.0025);
wall alignment on the gates-0 city is 86.7 / 70.0 / 58.0 % against 87 / 70 / 58 %; walled shares round to 0.98 / 0.97 /
0.92 / 0.82 / 0.30; gates are 0 / 1 / 4 / 9 / 7 and towers 33 / 32 / 29 / 24 exactly; the gate law hits 5 of the 10
sizes it was fitted on (6 of 12 plain sizes). Three findings need a ruling by the design seat, none blocking this item:
**F1** the shore split moves the coastal city's wall alignment by 3–11 points, contradicting T-V12-32's sentence that
the shore split keeps T-V12-6's values; **F2** §13.5's ribbon band "71–85 % (sweep)" comes from the size-40 gate
fixtures, while the 2026-09-25 sweep falls from 0.85 at size 40 to 0.58 at 80 and 0.49 at 130; **F3** §13.5's "median
29 ha at size 80" district area is the river-and-coast city's (29.3 ha), while the plain size-80 city gives 19.0 ha.
D24 is measurable after all: every export holds one square and every recorded generation builds one market geometry, so
the secondary-market frequency is 0 and adjacency 0 (the ⟨M-1⟩ status is the Fable seat's ruling). The rows proper —
ten plan seeds per matched size — are wave 2, on `captures/mfcg/exports-sweep-m1-2026-10-03/`, by the same two scripts.

## 1 What was built and run

| file | what it does |
|---|---|
| `research/baselines/adapters/mfcg.py` | each JSON export → one `MeasureInput` (V12 §2.2) by V12 §3.2.2's mapping with the shore split, written gzip-compressed (mtime 0, byte-reproducible) to `research/baselines/inputs/MFCG/itch-12710731/<folder>.<stem>.metric.geojson.gz`; 18 files, 8.0 MB on disk |
| `research/baselines/measure_mfcg.py` | the V12 §3.4.2 metrics of D7, D8, D9, D24 and D28 on those files (the draw census on the draw records, the timings on the export logs); `--check` runs the row's checker and the T-V12-6 / T-V12-32 clauses this item can run; `--red` proves the checker fails when it should |

Run: `python3 research/baselines/adapters/mfcg.py` (≈ 9 s), then `python3 research/baselines/measure_mfcg.py --json
docs/calibration/E07-mfcg-signature.json --check` (≈ 20 s with the three red-team scripts re-run live). Standard library
only. Inputs: `captures/mfcg/exports-2026-09-25/` (five fixtures) and `captures/mfcg/exports-sweep-2026-09-25/` (13 files,
sizes 3–250 and the size-200 river-and-coast city); the draw and coverage records of the six recorded MFCG captures; the
export logs. No captured program bundle was opened.

**The adapter's census** (CONFIRMED, its printout): 18 inputs, 0 polygons or lines dropped, 0 self-touch splits, 18
merged duplicate vertices (1 at size 80, 7 in the river-and-coast 200, 10 at size 250). The coastal fixture splits into
24 shore vertices and 23 closure edges, 7 land gates, 1 water gate and 15 + 5 towers. At size 3 (a range probe below the
interface's minimum) the first wall ring is not the largest; the adapter takes the largest ring as the city, as
`stats.py` does, so that one file follows `stats.py` and not V12's wording "the first wall polygon".

## 2 The checker column (W-07 row) and the runnable T-V12-6 / T-V12-32 clauses

| check | expected | got | result |
|---|---|---|---|
| R4 gates-4, 60 / 120 / 250 m, within 0.02 (the centroid change) | 0.84 / 0.58 / 0.32 | 0.8402 / 0.5791 / 0.3175 | PASS |
| R4, every city of `mfcg_orient.out`, within 0.02 (T-V12-6) | 9 values | largest gap 0.013 (coastal city, 120 m: 0.893 vs 0.88) | PASS |
| wall alignment gates-0, share ≤ 15° by band | 87 / 70 / 58 % | 86.67 / 70.00 / 57.98 % | PASS (within one point, T-V12-6's tolerance) |
| wall alignment, every dry city and band of `mfcg_wallalign.out`, within one point | 9 values | largest gap 1.0 point (gates-9, 100–200 m: 50.0 vs 49) | PASS |
| walled share, two decimals | 0.98 / 0.97 / 0.92 / 0.82 / 0.30 | 0.9809 / 0.9676 / 0.9192 / 0.8231 / 0.3015 | PASS |
| gates, exact | 0 / 1 / 4 / 9 / 7 | 0 / 1 / 4 / 9 / 7 | PASS |
| towers on the dry cities, exact | 33 / 32 / 29 / 24 | 33 / 32 / 29 / 24 | PASS |
| coastal city through the shore split (T-V12-32) | 24 shore vertices, 20 towers | 24; 20 (15 city + 5 castle); 1 water gate | PASS |
| the gate law's hits on the sweep, reported | — | section 5 | PASS (reported) |
| the sweep's `stats.md` for this item's metrics (T-V12-6's sweep clause) | buildings, walled share and hectares, gates, dry towers, districts, plaza and castle hectares, gen ms, 13 sizes | all equal | PASS |
| `mfcg_orient.py`, `mfcg_wallalign.py`, `mfcg_ribbon.py` re-run live | their `.out` files | byte-identical | PASS |
| D24 cross-check | one square per file; one market geometry per generation | 18 / 18 files; 12 / 12 generations | PASS |
| red run (`--red`: R4 expectation +0.03, a tower +1) | exit 1 | 2 FAIL, exit 1 | PASS |
| determinism | — | the 18 inputs and `E07…json` sha256-identical on a second run | PASS |

The changes from the red-team scripts are V12's and are declared: area centroids for vertex means (V12 §3.4.2's rule),
the prism counted as a building (V12 §3.2.2), and R4's sample drawn from a seeded stream when a city holds more than 1 500
footprints. *(Corrected by lane `m1/W-07b`, 2026-10-04, after the wave verifier's note; the earlier text said the
fixtures hold fewer than 1 500 footprints.)* Three fixtures hold fewer — gates 0, 4 and 9 (838, 1 299 and 1 227), so
every footprint is used there, as before, and the checked gates-4 values are unaffected — while the gates-1 city holds
1 513 (its prism included) and the coastal city 15 393, so R4 is sampled on those two (1 485–1 500 samples with five or
more neighbours, `E07-mfcg-signature.json`).

## 3 D7 — the street signature on the fixtures

| city (options) | R4 60 / 120 / 250 m | wall alignment 0–40 / 40–100 / 100–200 m: median deviation and share ≤ 15° (n) |
|---|---|---|
| seed 555001, size 40, gates 0 | 0.885 / 0.671 / 0.385 | 3.6° 86.7 % (135); 8.5° 70.0 % (190); 12.2° 58.0 % (257) |
| gates 1 | 0.821 / 0.571 / 0.301 | 3.3° 91.3 % (231); 9.5° 62.3 % (345); 15.4° 48.9 % (458) |
| gates 4 | 0.840 / 0.579 / 0.318 | 4.4° 87.6 % (193); 12.2° 60.1 % (321); 19.1° 37.7 % (377) |
| gates 9 | 0.866 / 0.650 / 0.395 | 4.5° 84.3 % (172); 12.4° 55.2 % (250); 15.1° 50.0 % (322) |
| seed 777001, size 80, river and coast | 0.971 / 0.893 / 0.689 | through the shore split: 3.6° 89.2 % (305); 12.2° 56.7 % (483); 20.3° 41.0 % (774) |
| 2026-09-25 sweep, size 40 (TOWN) | 0.846 / 0.598 / 0.342 | 3.5° 87.5 % (216); 8.7° 66.5 % (328); 19.8° 42.4 % (453) |
| size 80 (CITY) | 0.917 / 0.718 / 0.468 | 4.3° 85.6 % (397); 10.7° 62.4 % (646); 16.3° 47.9 % (991) |
| size 130 (METROPOLIS) | 0.957 / 0.809 / 0.590 | 3.5° 93.4 % (592); 6.1° 78.1 % (1 005); 11.9° 58.2 % (1 576) |

R4 rises with size at every radius on the one-seed sweep (60 m: 0.85 → 0.92 → 0.96), so the size-40 fixtures' 0.84 sit at
the bottom of §13.5's 0.84–0.97; the ten-seed rows will show whether the rise holds.

## 4 D8 — walled and ribbon shares

Walled share (inside the enclosure, area centroid): fixtures 0.981 / 0.968 / 0.919 / 0.823 / 0.302; 2026-09-25 sweep at
sizes 40–250 0.872–0.925 (§13.5's 0.87–0.92 reproduced). **Ribbon share** (extramural footprints within 100 m of an
arterial): fixtures gates-1 71.4 %, gates-4 74.3 %, gates-9 84.3 %, coastal 28.1 % (the red-team's 71 / 74 / 85 / 28 %;
gates-9 moves 0.7 point with the centroid change); gates-0 6.3 % (1 of 16: no gate road). On the 2026-09-25 sweep:
size 40 0.847, 60 0.698, 80 0.575, 120 0.519, 130 0.494, 200 0.421, 250 0.419 (**F2**).

## 5 D9 — anchors, gates, towers, and the gate law

| file | districts (median, min–max ha) | plaza ha | castle ha (compactness) | node / tower spacing p50 m | gates (law) |
|---|---|---|---|---|---|
| fixtures gates 0 / 1 / 4 / 9 | 5 / 5 / 9 / 11 (10.7, 15.9, 6.8, 8.3; 2.36–17.56) | 0.537 / 0.537 / 0.383 / 0.500 | 2.606 (0.824) | 88.2–89.6 / 89.6–100.2 | requested 0 / 1 / 4 / 9: hit |
| coastal 777001 | 17 (29.3; 2.46–376) | 0.358 | 3.356 (0.776) | 175.9 / 261.4 | 7 land + 1 water |
| sweep size 40 | 9 (3.8; 2.36–21.45) | 0.383 | 2.606 (0.824) | 88.2 / 94.3 | 5 (law 5) |
| sweep size 80 | 12 (19.0; 2.98–54.2) | 0.324 | 1.258 (0.752) | 121.7 / 135.9 | 8 (8) |
| sweep size 130 | 18 (27.4; 5.19–119.4) | 0.583 | 8.693 (0.797) | 155.0 / 177.9 | 12 (12) |

Wall vertex spacing p50 at size 40 is 87.5 m (§13.5's 88 m reproduced); `wall.nodeSpacing` by its definition (towers,
gates and turns ≥ 10°) is 88.2 m there. Castle 0.54–3.20 ha at the plain sizes 3–80 and 8.7 ha at 130, plaza 0.32–0.58 ha at sizes 40–250, and 9 / 12 / 18
districts at 40 / 80 / 130 reproduce §13.5's anchors.

**The gate law** `floor(1 + 0.47·√walled ha + 0.5)` (§4.2 S3 (4)) on the 2026-09-25 sweep: hits at sizes 5, 10, 40, 80,
130 and 200; misses by one at 15 (3 vs 2), 24 (4 vs 3), 60 (7 vs 6), 120 (12 vs 11) and 250 (21 vs 22); size 3 0 vs 1.
On the ten sizes it was fitted on: **5 of 10 hits, every miss by one** — the B20 review's statement, now CONFIRMED by
re-measurement. The river-and-coast size-200 city has 14 land gates where the land law gives 23 and the waterfront
reduction 18 (barrier share 0.38): a miss by four, descriptive (the stress variant). The re-test on the M-1 sweep's 34
seeds is wave 2.

## 6 D24 — markets

Every one of the 18 exported files holds exactly one square. The SVG cannot show a second one: in the gates-4 SVG's
path inventory no path style belongs to a square (the two paper-filled paths are the compass's rays), so a square is
open ground there. The coverage records of the twelve recorded generations (sizes 24–80, with
and without river and coast) count the market's geometry built exactly once per delivered city; the market itself is
created once per generation attempt (1, 2 and 7 in the multi-attempt generations). So `market.secondary` = 0 and
`market.adjacent` = 0 on every file (CONFIRMED). Whether the row is a **target** with reference value 0 (our `MFCG`
preset then holds no secondary market and no adjacent pair) or **descriptive** with a `known-defects.json` note, as the
plan's section 8 pre-decided for "no second square seen", is a ⟨M-1⟩ ruling for the Fable seat: the pre-decided rule
assumed a market could exist without exported geometry, and the coverage counts show it does not.

## 7 D28 — the draw-style census and timings

Twelve draw records (sizes 24–80; four of them with logs truncated at 60 000 entries):

| member (proposed id) | measure | MFCG value |
|---|---|---|
| `draw.casingLaw` | ribbon core widths whose dark casing lies at core + 2t (within 0.002), t the record's hairline | holds on 11 of 11 records with a cased ribbon, 0 violations; the gates-0 city draws its one road uncased; 7 of 7 on the 2026-09-21 records (§13.5's figure) |
| `draw.roundJoins` | round joins ÷ joins | exactly one non-round join per record in all 12 (4 062 / 4 063 on the first, §13.5's figure); pooled 0.99998 |
| `draw.roundCaps` | round caps ÷ caps (descriptive) | pooled 0.99905 (26–84 butt caps per record; the earlier profile places them on the scale bar, the grid and a few structural lines) |
| `draw.widthPx` (vector) | model width × px per metre at the matched scale (the gates-4 export: outer scale 3.263 ÷ 4 m = 0.8157 px/m) | wall 6.20, tower 12.40, road core 6.53, pier 3.92 px (§8.3's 6.2 / 12.4 / 6.5 / 3.9); the model widths are 7.6 / 15.2 / 8 / 4.8 m in all 18 files |
| `draw.wallsAfterBuildings` | the first wall stroke after the last roof fill | holds on 8 of 8 records with a complete log; not measurable on the 4 truncated ones |
| hairline t (descriptive) | the most frequent stroke width | 0.119–0.164 at sizes 24–40, 0.486–0.905 at size 80 (an outline set in screen pixels) |

`draw.order` gets no numeric member: §8.3's order parity compares our draw order with our declared slot table, and the
reference's recorded order stays a research-side sequence (`research/findings/visual-spec.md` §1.3). **`time.model`
(descriptive):** the app's own stage timings re-summed from the export logs give 57 / 131 / 156 ms at sizes 40 / 80 /
130 (§13.5's figures; equal to `stats.md` at every size; size 200 is two attempts, 236 ms). These are logged values; no
timing was run on this machine.

## 8 Findings and declared choices

* **F1 (major, design: V12 T-V12-6 / T-V12-32).** `bldg.wallAlign` reads the nearest *curtain* segment, built stretches
  only (V12 §3.4.2). Through the shore split the coastal fixture gives 89.2 / 56.7 / 41.0 % (n 305 / 483 / 774); the
  whole ring, the red-team's rule, gives 91.8 / 65.2 / 51.8 % (n 526 / 787 / 1 143), within one point of
  `mfcg_wallalign.out`'s 92 / 65 / 52 %. So T-V12-32's "the five MFCG exports measured through the shore split keep
  T-V12-6's values" fails on this clause; walled share, gates and towers do keep them. Options: restrict T-V12-6's
  wall-alignment clause to the four dry cities and record the coastal values as new descriptive numbers (our
  recommendation: item 106 says a closure is never wall, and the coastal city is MFCG's stress variant, descriptive), or
  measure alignment against the whole enclosure. §13.5's quoted ranges still hold either way (84–92, 56–70, 38–58 %).
* **F2 (major, design: §13.5 ribbons).** The band "71–85 % (sweep)" is the size-40 gate fixtures' (`mfcg_ribbon.out`);
  on the 2026-09-25 sweep the share falls with size, 0.85 at 40, 0.58 at 80, 0.49 at 130. The ten-seed rows will set the
  band per size; at CITY and METROPOLIS the recomputed band will sit far below 0.71, a declared shift for the shift
  record.
* **F3 (minor, design: §13.5 anchors).** "Median 29 ha at size 80" is the river-and-coast 777001 city's 29.3 ha; the plain
  size-80 city gives 19.0 ha, and "2.4–17.6 ha at size 40" is the four gate fixtures' range (the plain size-40 city spans
  2.36–21.45 ha). The rows replace both; noted so nobody compares a plain row with the stress city's number.
* **F4 (minor, registry).** `bldg.wallAlign` mixes degrees and shares in one vector (`metrics.m-1.json`'s open note).
  Proposal: two vector metrics over the three bands, `bldg.wallAlign.median` (deg, floor 1°) and
  `bldg.wallAlign.share15` (share, floor 0.02); and the D28 members above. W-15 registers them; the ruling is the Fable
  seat's.
* **Declared twin choices** (each the M-1 twin's, superseded by the product's value at M1 by J-V12.1): R4's sample stream
  is `random.Random(int(sha256('<metric>|<capture>')[:16], 16))`; wall-alignment ties between segments break by
  (distance, first vertex, second vertex); a water gate is a city-ring vertex within 0.5 m of a river centreline that is
  not a land gate, castle-shared or inside a shore closure (so the river mouth on the shore is not one); the castle's
  road-touching vertex is kept research-side, so every `gate` feature is a gate of the outermost curtain; the exported
  square is classed `market`; the dark ink of a draw record is its darkest stroke style by luma, found at run time.

## 9 What comes next (wave 2)

The same adapter and measure script run on `captures/mfcg/exports-sweep-m1-2026-10-03/` (W-03: 34 of 35 plan seeds; the
size-130 seed 8 is `sample.failed` with reason `no-export`, and river-and-coast seeds 1 and 4 with reason `retry`, per E03) to give
the per-size rows of D7, D8, D9 and D24 by V12 §3.5.1's estimators, and W-09 reads the same `MeasureInput` files for
the cluster blocks and the derived street graph.

### 9.1 W-07b — the values on the M-1 sweep (lane `m1/W-07b`, 2026-10-03 23:31 – 2026-10-04)

**Outcome.** The W-07 tool now runs on all 33 usable seeds of the M-1 sweep (10 / 10 / 10 plain at sizes 40 / 80 / 130,
index 10 of size 130 included after W-03b, and 3 of 5 river-and-coast stress seeds), and **every check of the W-07b row
passes** (CONFIRMED, `measure_mfcg.py --plan`, 13 of 13 PASS, exit 0): T-V12-6 in full — the five fixture covers print
0.657 / 0.582 / 0.621 / 0.583 / 0.569 to three decimals, R4 within 0.02 of all nine held per-city values, wall alignment
within one point of all nine held dry-city values, walled shares, gates and towers exact, and the 2026-09-25 sweep's
`stats.md` equal on 129 cells, cover and median footprint now included; the M-1 sweep's own `stats.md` is equal on 379
cells of 35 files, with one declared difference (F6); each usable seed sits in each of the 100 summaries and no
failed seed is in any; the failed indices are listed. The per-size values serve D7, D8, D9, D24 (reference 0) and D35.
They are **measured values, not rows**: W-15 is the sole writer of `rows.py` and forms the rows and bands (R-47 (a)).
Numbers are in `E07-mfcg-signature.plan.json` beside this record, written by the tool.

### 9.2 What was built and run

| file | change |
|---|---|
| `research/baselines/adapters/mfcg.py` | a J161 capture (downloads denied, files from the in-page Blob) has its record in the folder's `j161/` log, so the canonical href's options are read from there when the folder's own log has none (index 10 of size 130). The sidecar notes the source only for such a file, so the 18 earlier `MeasureInput` files keep their bytes (CONFIRMED: a scratch re-run, 18 of 18 byte-identical) |
| `research/baselines/measure_mfcg.py` | a `--plan` mode: `measure_extra()` adds `fg.coverWalled`, `bldg.area` (median and p95), `water.step`, `water.riverWidth`, `wall.ungated` and `pop.perBuilding` (definitions in the script's header); the families and the sample come from `plan.json` and the sweep's `export-check.json`; the per-family summaries use V12 §3.5.1's estimators; the W-07b checker column; `--red`. The W-07 fixture run reads only its own two folders' `MeasureInput` files, and its output is unchanged (CONFIRMED: `E07-mfcg-signature.json` re-made in scratch, sha256 `55b8b186…`, 15 of 15 PASS) |

Run: `python3 research/baselines/adapters/mfcg.py captures/mfcg/exports-sweep-m1-2026-10-03` (≈ 14 s; 35 files,
10 MB, beside the 18 earlier ones), then `python3 research/baselines/measure_mfcg.py --plan --json
docs/calibration/E07-mfcg-signature.plan.json` (about a minute with the three red-team scripts re-run live). The
adapter's census: 0 self-touch splits; 39 merged duplicate vertices over the 35 files; **one polygon dropped** — a
two-vertex, zero-area footprint in `size130-plain-5`, under V12 §3.2.2's degenerate rule (F6). No captured program bundle
was opened, and no site was touched.

### 9.3 The sample

| family (rung) | indices | usable | failed (carried) |
|---|---|---|---|
| `capture/MFCG/40/plain` (TOWN) | [0, 10) | 10 | none |
| `capture/MFCG/80/plain` (CITY) | [0, 10) | 10 | none |
| `capture/MFCG/130/plain` (METROPOLIS) | [0, 11), R-13's extension | 10 | index 8, `no-export` (2 loads, no files) |
| `capture/MFCG/80/river+coast` (CITY, stress, descriptive) | [0, 5) | 3 (0, 2, 3) | indices 1 and 4, `retry` (2 and 3 attempts): measured and kept in the per-seed file, excluded from every summary |

### 9.4 The checker column (W-07b row; T-V12-6 in full; R-24)

| check | result |
|---|---|
| the five fixture covers to three decimals | 0.65704 / 0.58158 / 0.62067 / 0.58266 / 0.56901 → **0.657 / 0.582 / 0.621 / 0.583 / 0.569**: PASS |
| walled shares, two decimals | 0.9809 / 0.9676 / 0.9192 / 0.8231 / 0.3015: PASS |
| city gates exact; towers on the dry cities | 0 / 1 / 4 / 9 / 7; 33 / 32 / 29 / 24: PASS |
| R4 within 0.02 of every per-city value of `mfcg_orient.out` | 9 values, largest gap 0.013: PASS |
| wall alignment within one point of `mfcg_wallalign.out` on every dry city it holds | 9 values (gates 0, 4, 9), largest gap 1.0 point: PASS; the gates-1 city has no held value and is printed only (91.3 / 62.3 / 48.9 %; F5) |
| the 2026-09-25 sweep's `stats.md`: buildings, walled share, cover, median footprint, gates, districts, plaza and castle areas (with walled hectares and dry towers) | 13 sizes, 129 cells, all equal: PASS |
| the M-1 sweep's `stats.md`: the same columns and the attempts, every captured file | 35 files, 379 cells, all equal, one declared difference (F6): PASS |
| every usable seed in every summary; no failed seed in any | 100 summaries over 10 / 10 / 10 / 3 seeds; the water rows not applicable on the 30 plain seeds by design: PASS |
| the failed indices listed | 130/plain/8 `no-export`; 80/river+coast/1 and /4 `retry`; usable plus failed = every plan index: PASS |
| the gate law's hits on the usable seeds, reported | section 9.7: PASS (reported) |
| D24 on the usable seeds | 33 seeds, one square each, secondary 0, adjacent 0: PASS |
| the three red-team scripts re-run live | byte-equal to their `.out` files: PASS |
| red run (`--plan --red`: a fixture cover +0.001, one M-1 building count +1, the TOWN usable count +1) | 3 FAIL, exit 1: PASS |
| determinism | two `--plan` runs: `E07-mfcg-signature.plan.json` sha256-identical; the 35 `MeasureInput` files byte-identical on a second adapter run |

### 9.5 D7, D8, D9, D24 and D35 per size (median [a, b] by V12 §3.5.1: `type7` p10 / p90 at n = 10, `minmax` at n = 3)

Hectares for areas, metres for spacings, steps and widths, m² for footprints, degrees for the alignment medians. The
plain columns serve the rows (V12 §3.4.4, water `none`); the stress column is descriptive, and its water rows, ungated
crossings, barrier share and gate count are D35's stress cells (R-23).

| metric | TOWN (40) | CITY (80) | METROPOLIS (130) | stress (80, river and coast) |
|---|---|---|---|---|
| `bldg.r4.60` | 0.854 [0.820, 0.874] | 0.927 [0.922, 0.938] | 0.955 [0.949, 0.957] | 0.950 [0.882, 0.956] |
| `bldg.r4.120` | 0.637 [0.578, 0.674] | 0.759 [0.734, 0.772] | 0.829 [0.803, 0.853] | 0.815 [0.682, 0.848] |
| `bldg.r4.250` | 0.414 [0.335, 0.503] | 0.510 [0.430, 0.550] | 0.586 [0.558, 0.625] | 0.612 [0.464, 0.621] |
| `bldg.wallAlign.median` 0–40 / 40–100 / 100–200 m | 4.37 / 10.34 / 17.44 | 3.48 / 7.31 / 12.80 | 3.00 / 6.05 / 12.09 | 3.21 / 8.22 / 13.53 |
| `bldg.wallAlign.share15` 0–40 m | 0.878 [0.846, 0.922] | 0.890 [0.851, 0.928] | 0.931 [0.899, 0.949] | 0.929 [0.899, 0.937] |
| `bldg.wallAlign.share15` 40–100 m | 0.624 [0.544, 0.717] | 0.683 [0.587, 0.771] | 0.762 [0.680, 0.784] | 0.760 [0.720, 0.772] |
| `bldg.wallAlign.share15` 100–200 m | 0.444 [0.370, 0.564] | 0.536 [0.451, 0.606] | 0.568 [0.516, 0.688] | 0.583 [0.514, 0.627] |
| `walled.share` | 0.905 [0.830, 0.924] | 0.905 [0.873, 0.916] | 0.924 [0.889, 0.938] | 0.914 [0.889, 0.942] |
| `ribbon.share` | 0.773 [0.558, 0.827] | 0.623 [0.551, 0.706] | 0.532 [0.439, 0.560] | 0.547 [0.521, 0.568] |
| `district.area` (per seed the median) | 8.86 [6.32, 11.40] | 17.47 [10.31, 25.31] | 30.39 [21.55, 36.22] | 11.40 [5.82, 13.06] |
| `plaza.area` | 0.377 [0.170, 0.572] | 0.328 [0.220, 0.454] | 0.359 [0.184, 0.630] | 0.311 [0.274, 0.641] |
| `castle.area` | 2.38 [0.95, 2.86] | 3.51 [2.08, 6.06] | 3.83 [0.71, 6.49] | 1.21 [1.02, 2.72] |
| `castle.compact` | 0.766 [0.752, 0.800] | 0.760 [0.753, 0.813] | 0.752 [0.751, 0.784] | 0.751 [0.751, 0.768] |
| `wall.nodeSpacing` (p50) | 90.4 [82.9, 101.4] | 130.9 [122.1, 139.0] | 157.4 [143.1, 172.1] | 149.4 [124.6, 165.4] |
| `wall.towerSpacing` (p50) | 97.0 [88.0, 105.7] | 145.9 [128.1, 149.2] | 175.8 [161.5, 216.4] | 188.9 [132.5, 194.7] |
| `quarter.count` | 8.5 [7.0, 10.1] | 12.5 [10.9, 15.0] | 16.0 [12.8, 19.1] | 13 [13, 15] |
| `gate.count` (land) | 5 [4.9, 5] | 8 [8, 8] | 12 [11.9, 12] | 7 [7, 7] |
| `market.secondary`, `market.adjacent` | 0 [0, 0], 0 [0, 0] | the same | the same | the same |
| `bldg.area` median (p95) | 251.3 [225.5, 279.5] (497.8 [448.2, 564.0]) | 262.6 [236.9, 311.7] (529.0 [451.3, 582.5]) | 242.1 [225.2, 248.3] (473.4 [453.0, 499.0]) | 249.6 [245.3, 255.7] (506.2 [490.1, 621.9]) |
| `pop.perBuilding` (the coded law) | 6.027 [6.012, 6.039] | 6.154 [6.017, 6.199] | 6.044 [6.013, 6.110] | 6.108 [6.055, 6.195] |
| `fg.coverWalled` (W-08's row; T-V12-6's clause) | 0.605 [0.582, 0.624] | 0.624 [0.612, 0.643] | 0.623 [0.613, 0.637] | 0.590 [0.590, 0.628] |
| `wall.ungated` | 0 on every seed | 0 | 0 | **0 [0, 0]** |
| `wall.barrierShare` | 0 (no closure) | 0 | 0 | **0.374 [0.046, 0.376]** |
| `water.step` | not applicable (no water) | — | — | **264.5 [242.2, 284.1]** |
| `water.riverWidth` | not applicable | — | — | **83.9 [68.8, 114.3]** |

### 9.6 D35 — the notes each cell carries

* **`bldg.area`** (descriptive): every building, footprints and prisms; MFCG's footprints are lots drawn as buildings
  (§13.5), never a house-size anchor.
* **`pop.perBuilding`** (weakness): the export carries no population figure (CONFIRMED: the values feature holds five
  or six keys in all 35 files, a river width present only with a river, none a population; and the SVG's only numeric
  texts belong to the scale bar), so each value is the coded law of
  §13.5's population row — six persons per lot, the total rounded upward at its second significant digit — over the exported
  building count, `populationSource: 'law'`. That the exported footprints and prisms equal the app's lot count is
  PLAUSIBLE (the reading says its building count is its lot count); a prism-free count moves the value by a few
  thousandths.
* **`water.step`** (descriptive, the stress family): the one sea polygon per seed, vertices turning under 1° dropped, the
  median arc step over 63–100 kept spacings per seed — measure_ftg.py's definition, so FTG and MFCG are measured alike.
  MFCG's exported coast is coarse: 242–284 m, against §13.5's fixed bound for ours (≤ 25 m). The river is an exported
  centreline, not an outline, and stays out of the step (its kept-vertex step, 180–234 m on the usable seeds, is kept in the
  file as a research number).
* **`water.riverWidth`** (descriptive): one width per course (the export's single river width): 114.3, 83.9 and 68.8 m
  on seeds 0, 2 and 3.
* **`wall.ungated`** (descriptive, the stress family): 0 on all 33 usable seeds, plain and stress — no proper crossing of
  a curtain stretch and no crossing at a curtain vertex other than a gate. The detector is live: it finds the gated
  crossings (4–12 per seed; one fewer than the gates on three seeds, where one way ends at the gate, so its road leaves on one side
  only — CONFIRMED on all three).
* **`wall.barrierShare`** (descriptive): the shore split's closure length over the enclosure's perimeter: 0.046, 0.376
  and 0.374 on seeds 0, 2 and 3 (seed 0's coast touches its wall at three vertices only).
* **`gate.count` at the stress setting** (the waterfront law, descriptive): 7 land gates on all three seeds (plus one
  water gate on seeds 2 and 3); section 9.7.
* **`time.worst`'s note** (R-44: a descriptive row, `values.n` 0, no timing): the stress seeds' generation attempts are
  1, 2, 1, 1 and 3 for indices 0–4 — 8 attempts for 5 cities, indices 1 and 4 being the retries; every usable plain seed
  took one attempt; `130/plain/8` froze on both of its loads (E03).

### 9.7 The gate law on the usable seeds

`floor(1 + 0.47·√walled ha + 0.5)`, with the waterfront reduction where the barrier share is at least 0.1:

| family | hits | the misses (measured against the law) |
|---|---|---|
| 40 plain | 6 / 10 | seeds 0, 4 and 7: 5 against 4; seed 9: 4 against 5 |
| 80 plain | 10 / 10 | — |
| 130 plain | 9 / 10 | seed 0: 11 against 12 |
| 80 river and coast | 1 / 3 | seed 0: 7 against 8 (barrier share 0.046, no waterfront); seed 2: 7 against 8 (waterfront); seed 3 hits 7 (waterfront) |

Every miss is by one. MFCG's own gate count is almost constant per size — 5 on 9 of 10 seeds at size 40, 8 on all ten at
80, 12 on 9 of 10 at 130 — while the law follows the walled area, so §13.5's "5 / 8 / 12, `gates = N` exact" holds on
28 of the 30 plain seeds.

### 9.8 Findings and declared choices

* **F2 confirmed on ten seeds (major, routed to W-15's shift record).** The ribbon share falls with size: 0.773
  [0.558, 0.827] at 40, 0.623 [0.551, 0.706] at 80, 0.532 [0.439, 0.560] at 130 (one seed gave 0.85 / 0.58 / 0.49). The
  rows replace §13.5's "71–85 %" cell, as R-12 F2 and DC-15 already rule.
* **F5 (minor, design wording: T-V12-6, R-12 F1, DC-14).** T-V12-6 and R-12 say the wall-alignment clause runs on "the
  four dry cities", but `mfcg_wallalign.out` holds three of them (gates 0, 4, 9); the gates-1 city has no held value. The
  clause is checked on all nine held values; gates-1's 91.3 / 62.3 / 48.9 % are printed only. Recommended wording for the
  design seat: "the three dry cities `mfcg_wallalign.out` holds". Running the red-team script on gates-1 would make a new
  number, not reproduce a held one; that run was therefore skipped. W-07's checker read the same nine values.
* **F6 (minor, declared).** `size130-plain-5` holds one footprint with two vertices and zero area. V12 §3.2.2's degenerate
  rule drops it, so its building count is 13 814 against `stats.md`'s 13 815 (which counts raw polygons). The check
  compares our count plus the dropped polygon, and every other cell of that file is equal, the median footprint included.
* **F7 (minor, routed to W-15 and the design seat's shift record; the rows replace the text, no ruling needed).** Several
  of §13.5's quoted MFCG anchors are one seed's or the size-40 fixtures', and the ten-seed values differ:
  * the castle's "8.7 at size 130" is one seed's; ten seeds give 3.83 [0.71, 6.49] ha;
  * district medians are 8.86 / 17.47 / 30.39 ha against the one-seed 3.8 / 19.0 / 27.4;
  * the walled share's "0.87–0.92" widens to [0.830, 0.924] at 40 and [0.889, 0.938] at 130;
  * the alignment ranges "84–92 / 56–70 / 38–58 %" are size 40's; the 40–100 m band reaches 0.762 [0.680, 0.784] at 130
    and 0.683 at 80;
  * the median deviation within 40 m falls from 4.37° at 40 to 3.00° at 130, against "3.5–4.5°".
  R4's rise with size holds on ten seeds at every radius (60 m: 0.854 → 0.927 → 0.955), inside §13.5's 0.84–0.97 /
  0.58–0.88 / 0.32–0.68.
* **Declared choices (J122; each vetoable).**
  * The values went into a new file, `E07-mfcg-signature.plan.json`, instead of rewriting `E07-mfcg-signature.json`,
    because W-07's landed hash (`55b8b186…`) is cited by `W-07.json` and the wave verifier; the fixture run still
    reproduces it.
  * `fg.coverWalled` is computed for T-V12-6's clause; its row stays W-08's.
  * The lot count of `pop.perBuilding` is V12's building count (footprints and prisms; §13.5: "its buildings are its
    lots").
  * `water.step` reads the sea polygons only and follows measure_ftg.py's definition, the map frame's edges included
    as on FTG's side.
  * `wall.ungated` on MFCG counts proper crossings plus crossings at a non-gate curtain vertex (measure_ftg.py's side
    rule); an open stretch's end vertices have no two sides and are skipped; a closure is no curtain.
  * The two retries are measured and kept in the per-seed file but excluded from every summary (`sample.failed`,
    reason `retry`).
  * The summaries carry no `absFloor` or sign field (N-05); the estimators are V12 §3.5.1's.
* **CONFIRMED** (executed or read): every number of sections 9.1–9.7, from the commands above; the checks and the red
  run; the fixture MeasureInputs and `E07-mfcg-signature.json` unchanged; the two runs' identical output; the export's
  value keys and the SVG's numeric texts. **PLAUSIBLE**: that the exported building count equals the app's lot count, so
  that the law's value is the app's displayed population; that seed 0's three shore vertices mean its coast barely
  touches the wall (read from the counts, not from a picture).

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every number in sections 2–7, by `measure_mfcg.py` on the adapter's files, the draw records and the
export logs; the three red-team scripts' live outputs equal their `.out` files; the red run fails; both outputs are
byte-reproducible; F1's two definitions and their numbers; F2's and F3's values. PLAUSIBLE (reasoning): that the
recommended F1 resolution is the right one; that a market created once per attempt explains the counts 2 and 7
(they equal the attempts the earlier profile recorded); that the rise of R4 with size survives ten seeds.
