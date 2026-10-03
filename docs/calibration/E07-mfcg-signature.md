# E07 — MFCG street signature, shares, anchors, markets and draw style: the fixture pass (W-07)

Lane `m1/W-07`, 2026-10-03, on the owner's Mac. Research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do
not read it). It carries numbers, metric ids and our own words only: no place name, colour value, identifier, word list
or code. Numbers are in `E07-mfcg-signature.json` beside it (sha256 `55b8b186…`), written by the tool below.

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
footprints (the fixtures hold fewer, so every footprint is used, as before).

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

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every number in sections 2–7, by `measure_mfcg.py` on the adapter's files, the draw records and the
export logs; the three red-team scripts' live outputs equal their `.out` files; the red run fails; both outputs are
byte-reproducible; F1's two definitions and their numbers; F2's and F3's values. PLAUSIBLE (reasoning): that the
recommended F1 resolution is the right one; that a market created once per attempt explains the counts 2 and 7
(they equal the attempts the earlier profile recorded); that the rise of R4 with size survives ten seeds.
