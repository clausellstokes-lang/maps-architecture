# E15 — the rows, the bands, both dispersions and the candidate `baselines.json` (M-1 work item W-15)

Lane `m1/W-15`, 2026-10-04, on the owner's Mac, beside M0's build seats. This is a research-side record
(`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It holds numbers, metric ids, file paths and our own words:
no reference word list, grammar, palette, identifier or content table. The numbers are in `E15-baselines.json` beside it,
written by `rows.py`. Nothing was written into `plat/`, no capture or capture bundle was opened, no site was touched, no
benchmark ran and no git command changed state. Round 3 (lane `m1/round3-apply`, the same day, after
`M-1-rulings-3.md`) continued this item with the same three tools; section 13 records it, and the lines below that it
changed say so.

**Outcome (landed at round 3; partial at W-15's own landing; every number CONFIRMED by execution unless marked).**

* **The candidate exists and passes the row's checks.** `research/baselines/candidates/baselines.json` (`plat.baselines/2`,
  sha256 `784e2373…` since round 3) holds **491 rows**: FTG 227, MFCG 119, NG 145; 257 target, 92 weakness, 142
  descriptive (478 rows, sha256 `e6d65954…`, at W-15's landing; round 3 appended the 13 held rows after them, section
  13). The research twin of the crossing check, `cross_check.py`, passes it on **C1–C10**. Every row carries `referenceBuild`,
  `capture`, `script` and `date`. No row carries a floor or a sign field (N-05). Every ⟨M-1⟩ cell of §13.5 and V12's
  catalogue has a target row or a descriptive row in C-0116's form, 26 of 26. Every FTG row's `sample.captures` equals the
  plan's slots in order (C7). T-V12-1's fixtures are each refused naming their check, and T-V12-30's behave: 46 of 46
  fixtures in all (41 at the landing; round 3 added five). The `ng-faces.json` candidate (W-10b's, 374 faces, 20 hoods)
  passes its kind's checks. 324 receipts against the measuring items' own records are all equal (307 at the landing),
  and 11 rows recomputed by a second implementation are equal (round 3 added its own independent recomputes, section 13.5).
* **Both variety dispersions are formed (R-40).** MFCG 1.81 / 1.56 / 1.74 z and FTG 3.29 / 3.48 / 3.36 z at TOWN / CITY /
  METROPOLIS, over the pooled deviations of MFCG 10 ∪ FTG 10 (TOWN, CITY) and MFCG 10 ∪ FTG 4 (METROPOLIS).
* **W-13's bootstrap now covers W-08's two rows.** `fg.streetwall` is stable at every rung; `fg.recoverability` is
  unstable at METROPOLIS (108 of 1 000 draws). S-V12-1's outcome stays fired: 50 of 78 rows (64.1 %). The remedy is
  R-50's (round 3; the owner withdrew the pre-decided loads, J171): every flagged target row keeps its role, values and
  band and carries a stability marker in its note, 50 MFCG rows and, by R-50 (4), 10 FTG rows (section 13.3).
* **Why W-15 was partial at its landing, and how round 3 settled each item:**
  1. **N-26 (ruled by R-52; the session carries row N-26 before M0 waves 11 and 13).** Scanned as whole text, the
     candidate holds **70 distinct three-gram runs made of numbers only, each hit once on each of the two lists (140
     hits in all; the landing's "140 runs" counted hits — the wave-3 verifier's correction)**: histogram counts such as
     runs of zeros, which match number 3-grams of the deny-list's corpus. Its string values and keys hold no hit on
     either list. R-52 rules that M0's scanner reads the crossing files by their string values and keys, each a text of
     its own, as `cross_check.py`'s C10 does (round 3 made the twin read each string on its own, section 13.4); the
     deny-list stays whole. Until M0-k-06 applies that reading, `baselines.json` passes T-V12-28 under D13's reading
     (vetoable, R-54) and fails it whole-text.
  2. **F2: the five channel-width rows (resolved).** The metric id's earlier second token is listed by both deny-lists,
     because it repeats a key of MFCG's export. The design renamed the id `water.channelWidth` (design/m1-corrections-2,
     J-5); round 3 installed it in the registry and appended the five rows (section 13.1).
  3. **F1: D28's eight MFCG draw-style rows (resolved by R-51).** Their twelve draw records are profiler recordings, not
     plan seeds. R-51 registers them as the recorded family `capture/MFCG/draw/recorded` (R-02's form) for four
     metrics, and builds `draw.widthPx` by the formula route on the size-40 plain family; round 3 installed the
     `plan.py` block and appended the eight rows (section 13.2).

## 1 What was built and run

| file | what | sha256 |
|---|---|---|
| `research/baselines/bands.py` | V12 §3.5.1–§3.5.4: the estimators, the scalar band rule (the floor read from the registry, never from a row), the distribution spread and ceiling, §13.5's fixed, declared-exception and weakness forms (round 3: the `ink` preset's draw-style bands), the dispersion step, the passing-to-failing intervals; `--selftest` | `f5d3bbc7…` (`f62dbfe0…` at the landing) |
| `research/baselines/rows.py` | reads every measuring record's JSON, forms the rows, the bands, the dispersions, W-13's addendum, the flip list and the design hand-off; round 3: the appended rows, R-50's markers and the FTG test of R-50 (4); writes the candidate and `E15-baselines.json`; `--check` (byte-equal recompute), `--red` | `e7509b38…` (`e399f74a…`) |
| `research/baselines/cross_check.py` | the research twin of `plat baselines check`: C1–C10 for `baselines.json`, the `ng-faces` and `denylist` kinds, the T-V12-1 / T-V12-30 / N-05 / N-21 / N-22 / N-24 fixtures and round 3's five, T-V12-28's research side; imports `make_denylist.py`'s scanner | `03c6d5c1…` (`1f7989e5…`) |
| `research/baselines/candidates/baselines.json` | the candidate (491 rows; three pins; `crossings` empty, W-20's) | `784e2373…` (`e6d65954…`, 478 rows) |
| `docs/calibration/E15-baselines.json` | every row's band, the dispersions, W-13's addendum, the flips, the hand-off, the held rows (none since round 3) and no-rows, the receipts, the inputs' sha256, `round3` | `2ca99a4a…` (`e0daeda1…`) |

All three scripts are our own code, standard library only. `rows.py` imports `bands.py` and, for W-13's draws only,
`spike_bootstrap.py`. `bands.py` imports `measure_mfcg.py` and `measure_ng.py` in its self-test, to show that its estimator
equals theirs. Inputs (read only; sha256 in the JSON's `inputs`): `plan.json`, `metrics.m-1.json`, E05's slots file, E06,
E07's plan file and fixture file (and, since round 3, its widths file), E08, E09 with its seeds and vectors files, E10's
plan file, E11's plan file, E13, E14, E20, and the NG plan-seed input index (for the drop counts).

Run from the project root:

```
python3 research/baselines/measure_mfcg.py --plan-widths --json docs/calibration/E07-mfcg-signature.widths.json   # round 3
python3 research/baselines/bands.py --selftest
python3 research/baselines/rows.py --write          # then --check (SAME, SAME) and --red
python3 research/baselines/cross_check.py research/baselines/candidates/baselines.json
python3 research/baselines/cross_check.py research/baselines/candidates/ng-faces.json --kind ng-faces
python3 research/baselines/cross_check.py research/baselines/denylist/denylist.json --kind denylist
python3 research/baselines/cross_check.py --fixtures
python3 research/baselines/cross_check.py --tv12-28 research/baselines/candidates/baselines.json research/baselines/candidates/ng-faces.json
```

## 2 The rows

| reference | target | weakness | descriptive | all |
|---|---|---|---|---|
| FTG | 57 | 79 | 91 | 227 |
| MFCG | 94 | 3 | 22 | 119 |
| NG | 106 | 10 | 29 | 145 |
| all | 257 | 92 | 142 | 491 |

By kind of band: band rule 148, fixed 100, declared exception 3, floor 6 (the dispersions), weakness 92, descriptive 142.
(At W-15's landing: FTG 54 / 79 / 90, MFCG 87 / 3 / 20, 478 rows; band rule 145, fixed 93, descriptive 139. Round 3 added
the channel-width rows — three FTG targets, the FTG CITY and MFCG stress rows descriptive — and R-51's eight: three
recorded-family targets, `draw.roundCaps` descriptive, the four `draw.widthPx` targets.)

**Form of a row.**
* **Id** (N-25): `<reference>/<setting>/<metric>/<subset>[/<field>]`, for example `mfcg/80/plain/bldg.r4.120/all`,
  `ftg/BIG_CITY/junction.angles/all/median`, `ng/medium/cut.sigma/ring`, `ng/medium/block.countTemplate/template-ring`,
  `ng/medium/cut.fillet/class-cShaped`, and since round 3 `mfcg/draw/recorded/draw.roundJoins/all` (the recorded draw
  family's setting). The subset is `all`, `plain`, `ring`, `template-<name>` or `class-<flag>`; a vector metric has one row
  per field.
* **Sample.** MFCG and per-template NG rows name their registered family and its indices, with `failed` from the plan
  (`capture/MFCG/130/plain` index 8 `no-export`; the stress family's 1 and 4 `retry`). An FTG row lists **every plan slot
  of its size in order**; a slot that gives no value is in `failed` with its reason: `water-none` (a `none` slot in a
  water row, R-33), `no-wall` (slot 12, W05b-D11), `setting` (the 2026-09-25 CITY capture, R-04). A pooled NG row names
  the union `capture/NG` and lists its member labels in plan order (D2 below). The MFCG draw rows on the recorded family
  name `capture/MFCG/draw/recorded` with `indices` [0, 12) and its twelve labels in recording order, the members a
  metric cannot read in `failed` (`uncased`, `truncated-log`; R-51). A row with `values.n` 0 lists every member in
  `failed` with its reason (C-0116; T-V12-30), and its `values.seeds` is the member count (19 such rows: FTG 8, MFCG 7,
  NG 4). So C7 tests "no silent gap" on every row: where `values.n` is above 0 the members outside `failed` equal
  `values.seeds`, and where it is 0 every member is in `failed` (R-53; row N-31 carries this to M0-k-05).
* **Values.** Scalar rows hold p10, p50 and p90 by V12 §3.5.1's estimator (`type7` at n ≥ 10, `minmax` at 2–9, `single`
  at 1) over the per-seed statistics. Distribution rows hold the registry's edges (rounded to four decimals) and the
  pooled histogram, with `spreadKS` {p90, pairs}. A **fixed-band row whose reference value is one pooled statistic**
  (σ, the corner, arrival and fillet shares, the hatch count) holds that value as p10 = p50 = p90 with `estimator`
  `single`; its per-seed spread is in the JSON's `bands` (D11).
* **Provenance.** `referenceBuild`: MFCG `itch:12710731`, NG `itch:11441280`, FTG one programme build
  `ftg:m1+07526ccf921b` (D3). `capture`: a `research:` label of the capture folder's root. `script`: the measuring
  script's label. `date` 2026-10-04. The pins are the three builds, `since` M-1.
* **Notes** (C3: at most 200 characters of letters, digits, spaces and `.,;:()-/%±≤≥×`) carry the definition points
  the earlier records route to the row: the declared scale on NG metre rows (R-01), W06-D2 / D3 on `ftg.ringBlock`, the
  raster twin on `sgd.*` (R-22), the scale on `fg.recoverability` (E08 F1), the nominal population on FTG (R-37), and
  `dropped: n` where V12 §3.2.2's cleaning dropped geometry from a row's input: `capture/MFCG/130/plain` 1 (a zero-area
  footprint in seed 5). FTG's cleaning merged vertices only; NG's two zero-length way segments lie on a `small` and a
  `large` map, which only the draw rows read, and those read the draw records, not the cleaned input.

**Roles** follow §13.5 and the rulings: FTG by R-34 and R-48 (band rule: `street.runs`, `outline.*`,
`wall.towerSpacing`, `water.channelWidth`; fixed: `junction.*`, `bldg.area`, `bldg.quadSide`, `bldg.worstCorner`,
`gate.count`, `water.step`; declared exception: `street.turn100`; weakness: `street.stepHist`, `street.entropy50`,
`wall.ungated`, `tree.*`, `time.model`; descriptive: `bldg.partyShare`, `bldg.attached`, `pop.perBuilding`, `wealth.*`,
`ftg.ringBlock`); at the recorded CITY family `time.model` is a weakness row and every other row descriptive (R-02); TOWN
has no row (R-34). MFCG's D11 rows are targets at every rung (E14: every CV ≤ 0.3). NG's face-class rows are descriptive
(R-09). Every unmeasured time cell is one descriptive row with `values.n` 0 (R-44): MFCG `time.model` and
`time.firstMap` per plain family and `time.worst` on the stress family with its attempt counts; NG's three over the 20
`medium` seeds; FTG `time.firstMap` (contended) and `time.worst` (unmeasured) per size. MFCG's draw rows (R-51, round
3): `draw.casingLaw`, `draw.roundJoins` and `draw.wallsAfterBuildings` targets with §13.5's fixed `ink` bands,
`draw.roundCaps` descriptive, `draw.widthPx` a target with the ± 15 % band on each field.

## 3 The checks (the row's checker column)

| check | how | result |
|---|---|---|
| C1–C10 on the candidate | `cross_check.py` on the file (C2 by N-24's pattern, case-sensitive; C4 strings only, N-22; C6 against `metrics.m-1.json`, R-45; C9 one live row per (reference, build, metric, rung, size, setting, subset and field); C10 the scanner over each string value and each key on its own, both lists, R-52) | **C1–C10 PASS** at round 3: 491 rows, 10 526 strings (10 568 texts, 967 distinct), 0 numbers with six consecutive digits; scan 0 hits. Whole text: 140 hits = 70 distinct number runs, each hit once on each of the two lists (N-26). At the landing: 478 rows, 10 224 strings, the same 70 runs |
| every row has `referenceBuild`, `capture`, `script`, `date` | C1 | PASS (491 / 491; 478 / 478 at the landing) |
| every ⟨M-1⟩ cell has a target row or a descriptive row in C-0116's form | the cells of §13.5 and V12 §3.4.2's ⟨M-1⟩ rows against the candidate; every `m1` entry of the registry against the candidate and the held list | PASS: 26 of 26 cells; 0 registry entries without a row or a held row |
| no row carries a floor or a sign field | C1's forbidden members (`absFloor`, `sign`, `floor`, `band`, `signIndefinite`) and two fixtures | PASS |
| T-V12-1's fixtures each refused naming their check | 16 fixtures built from the candidate: place name in `capture` (C2), 201-character note (C3), a six-hex run (C4), no `referenceBuild` (C1), indices from 3 (C7), a removed row (C9), two live rows (C9), an unsalted corpus id (C8), a corpus target at frame n 12 (C8), a corpus string (C8), a frame crossed later (C8), a panel note as text (C3), an empty candidate (C1), a committed file without `--previous` (C9); an upper-case family and a one-row file pass | 16 / 16 behave |
| T-V12-28 (research side) | the scanner over both candidates; no `MeasureInput` and no capture path inside them. The `plat/` path scan is the checker seat's at W-20 (it reads `plat/`) | **passes under D13 (vetoable; R-54), the strings-and-keys reading R-52 rules for M0's scanner: 0 hits on both files; fails whole-text until N-26 is applied at M0-k-06** (`cross_check.py --tv12-28` exit 1: `ng-faces.json` 0, `baselines.json` 70 distinct number runs on each list, 140 hits). No `MeasureInput`, no capture path |
| T-V12-30 | a listed failed index passes C7; an unlisted gap is refused; an empty capture listed `empty` passes; the FTG nominal population is marked; `adapters/mfcg.py`'s cleaner merges a coincident pair, splits a self-touch, drops a zero-area ring and a zero-length line, counting each; a capture left with no building yields no ring | 6 / 6 behave |
| each FTG row's captures equal the plan's slots in order | C7 against `plan.json`'s slots per family | PASS |
| N-05, N-21, N-22, N-24 | 2 + 10 + 5 + 2 fixtures (the `ng-faces` kind refuses a face or hood without `referenceBuild`, a decimal coordinate, an unknown member, a bad `seedLabel`, a crossing ring, areas off their face, a cut field out of range, a six-hex string; the deny-list kind refuses an unsorted array and a 15-digit digest; `block.counttemplate` pairs with no registry entry) | 19 / 19 behave |
| round 3 (R-50, R-51 (5) (ii), F2) | a recorded-draw row with its twelve captures passes C7; two captures swapped, and indices [0, 11), are refused by C7; a `water.channelWidth` row passes C6; the longest marked note (198 characters) passes C3 with the scanner | 5 / 5 behave (46 / 46 fixtures in all) |
| the `ng-faces.json` candidate | the kind's C1, C2, C4, C5 and C10: §7b's members exactly, `referenceBuild` on every hood and face, integers, closed simple rings with the stated orientation, leaves within 1e-3 of their face | ACCEPTED: 20 hoods, 374 faces, largest leaf-area deviation 1.7e-4 (W-10b's own figure) |
| the `denylist.json` kind | on W-16b's exit list: attachment C's patterns (`make_denylist.validate_m0`), C4, C10 over the header | ACCEPTED (24.2 MB, 1 274 853 strings) |
| bands with provenance "M-1 2026-10-04" | every row's band in the JSON's `bands`, its kind and edge terms | 491 bands (478 at the landing); `bands.py --selftest` 12 / 12 (11 / 11; round 3 added the relative-× fixed band's known answer), its band equal to W-13's on all 78 of E13's rows |
| the values are the measuring items' | receipts: E05 per size (128), E06 histograms (4), E07 / E08 / E09 summaries (96), E11 estimates and pooled histograms (79); round 3: E07's draw census per recording and its pooled shares (13), the widths file (4) | 324 / 324 equal (307 / 307 at the landing); an independent recompute (the standard library's inclusive quantiles) of 11 rows across the three references: 11 / 11 equal; round 3's own in section 13.5 |
| determinism and discrimination | `rows.py --check` in a second process; `rows.py --red` | SAME, SAME; five planted input faults (E05, E07, E11; round 3: E07's draw census, the widths file) each caught by its receipt |

## 4 The bands (a selection; every row's band is in the JSON)

| row id | role / kind | reference value p50 [p10, p90], n | band |
|---|---|---|---|
| `ftg/BIG_TOWN/street.turn100/all` | target / declared exception | 8.424 [7.4107, 8.7969], type7 n 10 | 4.212 – 12.636 (0.5–1.5 ×); band rule beside 6.6696 – 9.6876 |
| `ftg/BIG_CITY/street.turn100/all` | target / declared exception | 9.351 [8.3287, 13.7181], type7 n 10 | 4.6755 – 14.0265 (0.5–1.5 ×); band rule beside 7.4958 – 15.0899 |
| `ftg/METROPOLIS/street.turn100/all` | target / declared exception | 14.0645 [10.853, 15.961], minmax n 4 | 7.0323 – 21.0968 (0.5–1.5 ×); band rule beside 9.7677 – 17.5571 |
| `ftg/BIG_TOWN/outline.r90cv/all` | target / band rule | 0.3205 [0.2625, 0.4746], type7 n 10 | 0.2363 – 0.5221 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_CITY/outline.r90cv/all` | target / band rule | 0.2028 [0.0902, 0.394], type7 n 10 | 0.0812 – 0.4334 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/METROPOLIS/outline.r90cv/all` | target / band rule | 0.331 [0.1834, 0.3865], minmax n 4 | 0.1651 – 0.4252 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_TOWN/outline.roadRatio/all` | target / band rule | 1.3466 [1.0655, 1.88], type7 n 10 | 0.9589 – 2.068 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_CITY/outline.roadRatio/all` | target / band rule | 1.1908 [1.0785, 1.48], type7 n 10 | 0.9707 – 1.628 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/METROPOLIS/outline.roadRatio/all` | target / band rule | 1.2848 [0.8452, 1.4909], minmax n 4 | 0.7607 – 1.64 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_TOWN/wall.towerSpacing/all` | target / band rule | 34.897 [32.396, 40.675], minmax n 9 | 29.1564 – 44.7425 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_CITY/wall.towerSpacing/all` | target / band rule | 33.3575 [31.6575, 35.5424], type7 n 10 | 28.3539 – 39.0966 (edges c x 0.85, p90 x 1.1) |
| `ftg/METROPOLIS/wall.towerSpacing/all` | target / band rule | 32.704 [31.81, 34.64], minmax n 4 | 27.7984 – 38.104 (edges c x 0.85, p90 x 1.1) |
| `ftg/BIG_TOWN/street.runs/all/street` | target / band rule | 37.12 [33.271, 45.102], type7 n 10 | 29.9439 – 49.6122 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_CITY/street.runs/all/lane` | target / band rule | 33.595 [30, 44.695], type7 n 10 | 27 – 49.1645 (edges p10 x 0.9, p90 x 1.1) |
| `ftg/BIG_TOWN/water.step/all` | target / fixed | 17.1675 [14.489, 70.17], minmax n 6 | — – 25 |
| `ftg/BIG_CITY/water.step/all` | target / fixed | 16.888 [15.561, 50.867], minmax n 6 | — – 25 |
| `ftg/METROPOLIS/water.step/all` | target / fixed | 50.001 [16.154, 50.22], minmax n 3 | — – 25 |
| `ftg/BIG_TOWN/bldg.area/all/median` | target / fixed | 95.765 [91.574, 99.79], type7 n 10 | 60 – 160 |
| `ftg/BIG_CITY/bldg.area/all/median` | target / fixed | 98.985 [92.915, 100.922], type7 n 10 | 60 – 160 |
| `ftg/BIG_TOWN/junction.angles/all/median` | target / fixed | 91.505 [90.279, 93.252], type7 n 10 | 85 – 95 |
| `ftg/BIG_TOWN/junction.share4/all` | target / fixed | 0.25 [0.2101, 0.2987], type7 n 10 | 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row) |
| `mfcg/40/plain/sgd.tShare/all` | target / band rule | 0.4415 [0.4046, 0.4935], type7 n 10 | 0.3641 – 0.5429 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/80/plain/sgd.tShare/all` | target / band rule | 0.4542 [0.4216, 0.4829], type7 n 10 | 0.3794 – 0.5312 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/130/plain/sgd.tShare/all` | target / band rule | 0.4573 [0.4492, 0.4713], type7 n 10 | 0.3887 – 0.5259 (edges c x 0.85, c x 1.15) |
| `mfcg/40/plain/sgd.deadEnds/all` | target / band rule | 2.3163 [1.6581, 2.7324], type7 n 10 | 1.4923 – 3.0056 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/80/plain/sgd.deadEnds/all` | target / band rule | 1.4254 [1.1113, 1.7767], type7 n 10 | 1.0002 – 1.9544 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/130/plain/sgd.deadEnds/all` | target / band rule | 0.957 [0.7963, 1.1068], type7 n 10 | 0.7167 – 1.2175 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/40/plain/blockc.perHa/all` | target / band rule | 2.5599 [2.1988, 2.7453], type7 n 10 | 1.9789 – 3.0198 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/80/plain/blockc.perHa/all` | target / band rule | 2.3064 [2.0283, 3.1639], type7 n 10 | 1.8255 – 3.4803 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/130/plain/blockc.perHa/all` | target / band rule | 2.5313 [2.4083, 2.8113], type7 n 10 | 2.1516 – 3.0924 (edges c x 0.85, p90 x 1.1) |
| `mfcg/40/plain/blockc.lotsPer/all` | target / band rule | 9 [8, 9.1], type7 n 10 | 7.2 – 10.35 (edges p10 x 0.9, c x 1.15) |
| `mfcg/40/plain/block.courtShare/all` | target / band rule | 0.8101 [0.7452, 0.8558], type7 n 10 | 0.6707 – 0.9414 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/80/plain/block.courtShare/all` | target / band rule | 0.8098 [0.7159, 0.8448], type7 n 10 | 0.6443 – 0.9313 (edges p10 x 0.9, c x 1.15) |
| `mfcg/130/plain/block.courtShare/all` | target / band rule | 0.8143 [0.7884, 0.8508], type7 n 10 | 0.6922 – 0.9364 (edges c x 0.85, c x 1.15) |
| `mfcg/40/plain/fg.recoverability/all` | target / fixed | 0.8702 [0.847, 0.8776], type7 n 10 | 0.8402 – — |
| `mfcg/80/plain/fg.recoverability/all` | target / fixed | 0.7495 [0.7069, 0.7613], type7 n 10 | 0.7195 – — |
| `mfcg/130/plain/fg.recoverability/all` | target / fixed | 0.5236 [0.499, 0.5739], type7 n 10 | 0.4936 – — |
| `mfcg/40/plain/fg.streetwall/all` | target / fixed | 0.9233 [0.9191, 0.9297], type7 n 10 | 0.9233 – — |
| `mfcg/40/plain/ribbon.share/all` | target / band rule | 0.7726 [0.5579, 0.8271], type7 n 10 | 0.5021 – 0.9098 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/80/plain/ribbon.share/all` | target / band rule | 0.6231 [0.551, 0.7061], type7 n 10 | 0.4959 – 0.7767 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/130/plain/ribbon.share/all` | target / band rule | 0.5315 [0.4392, 0.5595], type7 n 10 | 0.3953 – 0.6155 (edges p10 x 0.9, p90 x 1.1) |
| `mfcg/40/plain/gate.count/all` | target / fixed | 5 [4.9, 5], type7 n 10 | main gates = N exact by our law (section 13.5 towers and gates) |
| `ng/medium/junction.share4/all` | target / fixed | 0.0522 [0.0258, 0.0771], type7 n 20 | 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row) |
| `ng/medium/junction.angles/all/median` | target / fixed | 91.0993 [90.6026, 91.9891], type7 n 20 | 85 – 95 |
| `ng/medium/junction.angles/all/p5` | target / fixed | 87.1342 [84.5447, 88.1021], type7 n 20 | 30 – — |
| `ng/medium/block.courtShare/all` | target / band rule | 0.4566 [0.295, 0.5421], type7 n 20 | 0.2655 – 0.5963 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/block.countTemplate/template-area` | target / band rule | 39 [16, 57], minmax n 5 | 14.4 – 62.7 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/block.countTemplate/template-street` | target / band rule | 6 [2, 17], minmax n 5 | 1.8 – 18.7 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/block.countTemplate/template-square` | target / band rule | 10 [5, 23], minmax n 5 | 4.5 – 25.3 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/block.countTemplate/template-ring` | target / band rule | 59 [33, 116], minmax n 5 | 29.7 – 127.6 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/block.area/all` | target / band rule | n 608 over 20 seeds; spreadKS p90 0.819 (40 pairs) | KS ceiling 1.0237 |
| `ng/medium/cut.length/all` | target / band rule | n 379 over 18 seeds; spreadKS p90 1 (32 pairs) | KS ceiling 1.25 |
| `ng/medium/cut.sigma/all` | target / fixed | 0.09 [0.09, 0.09], single n 20 | 0.07 – 0.11 |
| `ng/medium/cut.sigma/plain` | target / fixed | 0.084 [0.084, 0.084], single n 15 | 0.064 – 0.104 |
| `ng/medium/cut.sigma/ring` | target / fixed | 0.094 [0.094, 0.094], single n 5 | 0.074 – 0.114 |
| `ng/medium/cut.cornerMid/all` | target / fixed | 0.8828 [0.8828, 0.8828], single n 20 | 0.8 – — |
| `ng/medium/cut.arrival85/all` | target / fixed | 0.9737 [0.9737, 0.9737], single n 20 | 0.95 – — |
| `ng/medium/cut.fillet/all` | target / fixed | 0.5376 [0.5376, 0.5376], single n 20 | 0.4876 – 0.5876 |
| `ng/medium/bldg.partyShare/all` | target / band rule | 0.4405 [0.4094, 0.4632], type7 n 20 | 0.3685 – 0.5095 (edges p10 x 0.9, p90 x 1.1) |
| `ng/medium/bldg.attached/all` | target / fixed | 0.9873 [0.9827, 0.9917], type7 n 20 | 0.9 – — |
| `ng/plan/draw.hatchPerWing/all` | target / fixed | 18.0679 [18.0679, 18.0679], single n 44 | 15 – 20 |
| `ng/plan/draw.shadowQuadsPerWing/all` | target / band rule | 2.2869 [2.1648, 2.4536], type7 n 44 | 1.9439 – 2.699 (edges c x 0.85, p90 x 1.1) |

**Information for the design seat and M0-b-05b (CONFIRMED; no row changes).** At NG's sample the distribution clause
cannot fail on several rows: a ceiling of 1.25 × `spreadKS.p90` is at least 1 wherever the p90 is 0.8 or more, and a KS
distance never exceeds 1. That holds for `block.area` `all` (0.819 over the 40 within-template pairs; 0.80 over all 190
pairs), `ring` (0.819) and `street` (1.0), and for `cut.length` `all` (1.0 within templates; 0.936 over all 153 pairs),
`street` and `square` (1.0). The gating subsets are `block.area` `area` (ceiling 0.41) and `square` (0.88), and
`cut.length` `area` (0.30) and `ring` (0.62). E10 9.7 (1) and E11 10.7 (1) foresaw the thin templates. The rows follow V12
§3.5.3 as written; whether the clause should compare pooled distributions instead is the design's question (J156).

## 5 The dispersions (R-10, R-40)

| rung | MFCG | FTG | R-10 form (MFCG / FTG) | population SD (MFCG / FTG) | FTG `none` / `coast+river` | the floor (the larger) |
|---|---|---|---|---|---|---|
| TOWN | 1.8061 (n 10) | 3.2901 (n 10) | 1.3049 / 2.7405 | 1.8531 / 3.3755 | 3.8857 (n 4) / 3.2302 (n 6) | 3.2901 |
| CITY | 1.5611 (n 10) | 3.4795 (n 10) | 1.3842 / 2.5337 | 1.6016 / 3.5699 | 2.549 (n 4) / 3.5173 (n 6) | 3.4795 |
| METROPOLIS | 1.7378 (n 10) | 3.3631 (n 4) | 1.4991 / 2.1561 | 1.8034 / 3.49 | None (n 1) / 2.5342 (n 3) | 3.3631 |

Each of the eight components is standardised by its standard deviation over the union of both references' vectors at the
rung (sample SD; the population SD is beside it). The value is the mean pairwise Euclidean distance within each
reference, one per rung with `seeds` = n, in z. The METROPOLIS FTG sample holds one `none` slot, so that setting has no
dispersion of its own. MFCG's components 2–5 read the derived lanes (D6); in the R-10 form they read the exported
arterials only, which lowers both values because a between-reference offset inflates the pooled deviation (E09 F2).

## 6 W-13's bootstrap over `fg.recoverability` and `fg.streetwall` (the wave-2 verifier's note)

The same seeded draws as W-13 (`spike_bootstrap.stream`; the first three draws per family equal E13's), 1 000
resamples, candidates at the edge ± 5 %, a row unstable when it flips in more than 5 % of draws. §13.5's bands for these
rows are one-sided and rest on the median: recoverability ≥ MFCG − 0.03, streetwall ≥ MFCG. The band rule's form is run
beside as a companion.

| metric | rung | form | band | row flips | verdict |
|---|---|---|---|---|---|
| fg.recoverability | TOWN | section 13.5 one-sided | 0.8402 – — | 0 / 1 000 | stable |
| fg.recoverability | TOWN | band rule (companion) | 0.7397 – 1.0007 | 0 / 1 000 | stable |
| fg.streetwall | TOWN | section 13.5 one-sided | 0.9233 – — | 0 / 1 000 | stable |
| fg.streetwall | TOWN | band rule (companion) | 0.7848 – 1.0618 | 0 / 1 000 | stable |
| fg.recoverability | CITY | section 13.5 one-sided | 0.7195 – — | 46 / 1 000 | stable |
| fg.recoverability | CITY | band rule (companion) | 0.6362 – 0.8619 | 46 / 1 000 | stable |
| fg.streetwall | CITY | section 13.5 one-sided | 0.9284 – — | 0 / 1 000 | stable |
| fg.streetwall | CITY | band rule (companion) | 0.7891 – 1.0676 | 0 / 1 000 | stable |
| fg.recoverability | METROPOLIS | section 13.5 one-sided | 0.4936 – — | 108 / 1 000 | unstable |
| fg.recoverability | METROPOLIS | band rule (companion) | 0.445 – 0.6313 | 49 / 1 000 | stable |
| fg.streetwall | METROPOLIS | section 13.5 one-sided | 0.9243 – — | 0 / 1 000 | stable |
| fg.streetwall | METROPOLIS | band rule (companion) | 0.7857 – 1.063 | 0 / 1 000 | stable |

With the three rungs' stated-form rows added, W-13's count becomes 50 unstable of 78 (64.1 %): the rule still fires.
The owner withdrew the pre-decided loads (J171: no extra MFCG loads), and the remedy is R-50's (M-1-rulings-3.md): each
flagged target row keeps its role, values and band and carries a stability marker in its note — the row's flip share
and the 2.5–97.5 % interval of each edge over the draws — with the same block in this record's JSON (section 13.3). The
rows stand at the ten seeds the plan has.

## 7 Passing to failing (for the shift record; §13.5's band-rule paragraph)

No product exists at M-1, so "ours" is unknown. The list gives, for every recomputed band whose design cell quotes an
old range or value, the old band (formed by the same rule from the quoted figures; a range's centre taken at its
midpoint, a one-seed figure by the single-value rule, a fixed band around the old reference value), the new band, and
the values that passed the old band and fail the new one. The shift record declares a flip when ours falls there.

| row | old band | new band | passing to failing |
|---|---|---|---|
| `mfcg/40/plain/bldg.r4.60/all` | 0.756 – 1.067 | 0.7262 – 0.9824 | 0.9824 to 1.067 |
| `mfcg/80/plain/bldg.r4.60/all` | 0.756 – 1.067 | 0.7883 – 1.0665 | 0.756 to 0.7883; 1.0665 to 1.067 |
| `mfcg/130/plain/bldg.r4.60/all` | 0.756 – 1.067 | 0.8116 – 1.098 | 0.756 to 0.8116 |
| `mfcg/40/plain/bldg.r4.120/all` | 0.522 – 0.968 | 0.5203 – 0.7411 | 0.7411 to 0.968 |
| `mfcg/80/plain/bldg.r4.120/all` | 0.522 – 0.968 | 0.6453 – 0.8731 | 0.522 to 0.6453; 0.8731 to 0.968 |
| `mfcg/130/plain/bldg.r4.120/all` | 0.522 – 0.968 | 0.705 – 0.9538 | 0.522 to 0.705; 0.9538 to 0.968 |
| `mfcg/40/plain/bldg.r4.250/all` | 0.288 – 0.748 | 0.3011 – 0.5534 | 0.288 to 0.3011; 0.5534 to 0.748 |
| `mfcg/80/plain/bldg.r4.250/all` | 0.288 – 0.748 | 0.3868 – 0.6054 | 0.288 to 0.3868; 0.6054 to 0.748 |
| `mfcg/130/plain/bldg.r4.250/all` | 0.288 – 0.748 | 0.4979 – 0.6877 | 0.288 to 0.4979; 0.6877 to 0.748 |
| `mfcg/40/plain/bldg.wallAlign.median/all/b0_40` | 3 – 5 | 3.3686 – 5.3686 | 3 to 3.3686 |
| `mfcg/80/plain/bldg.wallAlign.median/all/b0_40` | 3 – 5 | 2.4758 – 4.4758 | 4.4758 to 5 |
| `mfcg/130/plain/bldg.wallAlign.median/all/b0_40` | 3 – 5 | 1.975 – 3.9996 | 3.9996 to 5 |
| `mfcg/40/plain/bldg.wallAlign.share15/all/b0_40` | 0.748 – 1.012 | 0.7459 – 1.014 | none |
| `mfcg/80/plain/bldg.wallAlign.share15/all/b0_40` | 0.748 – 1.012 | 0.7567 – 1.0237 | 0.748 to 0.7567 |
| `mfcg/130/plain/bldg.wallAlign.share15/all/b0_40` | 0.748 – 1.012 | 0.7913 – 1.0705 | 0.748 to 0.7913 |
| `mfcg/40/plain/bldg.wallAlign.share15/all/b40_100` | 0.504 – 0.77 | 0.4893 – 0.7884 | none |
| `mfcg/80/plain/bldg.wallAlign.share15/all/b40_100` | 0.504 – 0.77 | 0.528 – 0.8484 | 0.504 to 0.528 |
| `mfcg/130/plain/bldg.wallAlign.share15/all/b40_100` | 0.504 – 0.77 | 0.6121 – 0.8768 | 0.504 to 0.6121 |
| `mfcg/40/plain/bldg.wallAlign.share15/all/b100_200` | 0.342 – 0.638 | 0.3334 – 0.62 | 0.62 to 0.638 |
| `mfcg/80/plain/bldg.wallAlign.share15/all/b100_200` | 0.342 – 0.638 | 0.406 – 0.6666 | 0.342 to 0.406 |
| `mfcg/130/plain/bldg.wallAlign.share15/all/b100_200` | 0.342 – 0.638 | 0.4648 – 0.7567 | 0.342 to 0.4648 |
| `ng/medium/cut.sigma/plain` | 0.046 – 0.086 | 0.064 – 0.104 | 0.046 to 0.064 |
| `ng/medium/cut.sigma/ring` | 0.078 – 0.118 | 0.074 – 0.114 | 0.114 to 0.118 |
| `ng/medium/cut.fillet/all` | 0.4791 – 0.5791 | 0.4876 – 0.5876 | 0.4791 to 0.4876 |
| `ng/medium/bldg.partyShare/all` | 0.374 – 0.506 | 0.3685 – 0.5095 | none |
| `mfcg/40/plain/walled.share/all` | 0.7608 – 1.0292 | 0.7466 – 1.0404 | none |
| `mfcg/80/plain/walled.share/all` | 0.7608 – 1.0292 | 0.7688 – 1.0402 | 0.7608 to 0.7688 |
| `mfcg/130/plain/walled.share/all` | 0.7608 – 1.0292 | 0.785 – 1.062 | 0.7608 to 0.785 |
| `mfcg/40/plain/ribbon.share/all` | 0.7225 – 0.9775 | 0.5021 – 0.9098 | 0.9098 to 0.9775 |
| `mfcg/80/plain/ribbon.share/all` | 0.493 – 0.667 | 0.4959 – 0.7767 | 0.493 to 0.4959 |
| `mfcg/130/plain/ribbon.share/all` | 0.4165 – 0.5635 | 0.3953 – 0.6155 | none |
| `mfcg/40/plain/wall.nodeSpacing/all` | 74.8 – 101.2 | 74.6133 – 111.551 | none |
| `mfcg/40/plain/castle.area/all` | 0.45 – 3.52 | 0.8534 – 3.1412 | 0.45 to 0.8534; 3.1412 to 3.52 |
| `mfcg/80/plain/castle.area/all` | 0.45 – 3.52 | 1.8689 – 6.6661 | 0.45 to 1.8689 |
| `mfcg/130/plain/castle.area/all` | 7.395 – 10.005 | 0.643 – 7.1435 | 7.395 to 10.005 |
| `mfcg/40/plain/plaza.area/all` | 0.288 – 0.638 | 0.1529 – 0.6291 | 0.6291 to 0.638 |
| `mfcg/80/plain/plaza.area/all` | 0.288 – 0.638 | 0.1979 – 0.4992 | 0.4992 to 0.638 |
| `mfcg/130/plain/plaza.area/all` | 0.288 – 0.638 | 0.1651 – 0.6935 | none |
| `mfcg/40/plain/quarter.count/all` | 7.65 – 10.35 | 6.3 – 11.11 | none |
| `mfcg/80/plain/quarter.count/all` | 10.2 – 13.8 | 9.81 – 16.5 | none |
| `mfcg/130/plain/quarter.count/all` | 15.3 – 20.7 | 11.52 – 21.01 | none |
| `ftg/BIG_TOWN/outline.r90cv/all` | 0.2966 – 0.4015 | 0.2363 – 0.5221 | none |
| `ftg/BIG_CITY/outline.r90cv/all` | 0.2966 – 0.4015 | 0.0812 – 0.4334 | none |
| `ftg/METROPOLIS/outline.r90cv/all` | 0.2966 – 0.4015 | 0.1651 – 0.4252 | none |
| `ftg/BIG_TOWN/outline.roadRatio/all` | 1.0089 – 1.365 | 0.9589 – 2.068 | none |
| `ftg/BIG_CITY/outline.roadRatio/all` | 1.0089 – 1.365 | 0.9707 – 1.628 | none |
| `ftg/METROPOLIS/outline.roadRatio/all` | 1.0089 – 1.365 | 0.7607 – 1.64 | none |
| `ftg/BIG_TOWN/wall.towerSpacing/all` | 31.552 – 42.688 | 29.1564 – 44.7425 | none |
| `ftg/BIG_CITY/wall.towerSpacing/all` | 31.552 – 42.688 | 28.3539 – 39.0966 | 39.0966 to 42.688 |
| `ftg/METROPOLIS/wall.towerSpacing/all` | 31.552 – 42.688 | 27.7984 – 38.104 | 38.104 to 42.688 |
| `mfcg/40/plain/draw.widthPx/all/wall` | 5.27 – 7.13 | 5.3893 – 7.2913 | 5.27 to 5.3893 |
| `mfcg/40/plain/draw.widthPx/all/tower` | 10.54 – 14.26 | 10.7785 – 14.5827 | 10.54 to 10.7785 |
| `mfcg/40/plain/draw.widthPx/all/roadCore` | 5.525 – 7.475 | 5.6729 – 7.6751 | 5.525 to 5.6729 |
| `mfcg/40/plain/draw.widthPx/all/pier` | 3.315 – 4.485 | 3.4037 – 4.6051 | 3.315 to 3.4037 |

The four `draw.widthPx` rows (round 3) take the old band as ± 15 % around §13.5's (and §8.3's) fixture figures 6.2 /
12.4 / 6.5 / 3.9 px. **Round 3 adds to the shift record's input the stability markers of R-50 (section 13.3): 60 rows
whose band edges move by more than the 5 % candidates in over 5 % of the draws, each with the 2.5–97.5 % interval of
each edge**, so a verdict near an edge is read with the reference's own uncertainty beside it.

The other recomputed bands (`street.runs`, the D11 rows, `block.courtShare`, `fg.*`, the NG `medium` rows, `cut.length`,
the dispersions) had no numeric band in the design before M-1 (⟨M-1⟩ cells or formula figures), so nothing passed
before that fails now; their bands are new.

## 8 The design seat's hand-off: every recomputed band or reference value a design cell quotes

`section · the cell · the old figure · the new row values` (p50 [p10, p90], the estimator, n; then the band). The JSON's
`designHandoff` holds the same list: 56 entries at the landing, 63 since round 3 (the channel-width cells and the
MFCG draw-style cells, which DC-40 reads). The changes are measurements, routed for the next design pass to apply by
amendment (J-A34.01; J156: no new design). DC-36 (the hatch figures) is already in §13.5 and agrees.

| section | cell | old | new |
|---|---|---|---|
| ARCHITECTURE 13.5 street turning (FTG weakness) | share of 10 m steps above 15 deg | about 1 % (1.03 % / 0.82 %, the two CITY captures) | `ftg/BIG_TOWN/street.stepHist/all`: n 31185 over 10 seeds; spreadKS p90 0.079 (45 pairs); no cliff: no empty bin above 15 deg while the bin below it holds > 1 % (section 13.5 street turning)<br>`ftg/BIG_CITY/street.stepHist/all`: n 91910 over 10 seeds; spreadKS p90 0.0439 (45 pairs); no cliff: no empty bin above 15 deg while the bin below it holds > 1 % (section 13.5 street turning)<br>`ftg/METROPOLIS/street.stepHist/all`: n 60887 over 4 seeds; spreadKS p90 0.0426 (6 pairs); no cliff: no empty bin above 15 deg while the bin below it holds > 1 % (section 13.5 street turning) |
| ARCHITECTURE 13.5 street turning (FTG target clause) | median turning per 100 m, organic presets | ⟨M-1⟩; the declared exception 0.5-1.5 x FTG | `ftg/BIG_TOWN/street.turn100/all`: 8.424 [7.4107, 8.7969] type7 n 10; band 4.212 to 12.636<br>`ftg/BIG_CITY/street.turn100/all`: 9.351 [8.3287, 13.7181] type7 n 10; band 4.6755 to 14.0265<br>`ftg/METROPOLIS/street.turn100/all`: 14.0645 [10.853, 15.961] minmax n 4; band 7.0323 to 21.0968 |
| ARCHITECTURE 13.5 junction arm angles (FTG) | junction median; 4-way share among ways | median 90.02 deg; 4-way share 0.28 / 0.30 | `ftg/BIG_TOWN/junction.angles/all/median`: 91.505 [90.279, 93.252] type7 n 10; band 85 to 95<br>`ftg/BIG_CITY/junction.angles/all/median`: 91.055 [90.419, 92.544] type7 n 10; band 85 to 95<br>`ftg/METROPOLIS/junction.angles/all/median`: 92.215 [90.98, 92.77] minmax n 4; band 85 to 95<br>`ftg/BIG_TOWN/junction.share4/all`: 0.25 [0.2101, 0.2987] type7 n 10; 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row)<br>`ftg/BIG_CITY/junction.share4/all`: 0.2722 [0.2136, 0.3134] type7 n 10; 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row)<br>`ftg/METROPOLIS/junction.share4/all`: 0.2143 [0.1817, 0.2757] minmax n 4; 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row) |
| ARCHITECTURE 13.5 junction arm angles (NG) | 4-way share under the 2 m merge | 0-5 % | `ng/medium/junction.share4/all`: 0.0522 [0.0258, 0.0771] type7 n 20; 4-way share organic 0-15 %, ringed 20-45 %, american 40-80 % (section 13.5 junction row) |
| ARCHITECTURE 13.5 street runs by class (FTG) | class medians | main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m (formula figures) | `ftg/BIG_TOWN/street.runs/all/arterial`: 50.5 [50.499, 55] type7 n 10; band 42.925 to 60.5<br>`ftg/BIG_CITY/street.runs/all/arterial`: 50.495 [42.888, 50.5] type7 n 10; band 38.5992 to 58.0692<br>`ftg/METROPOLIS/street.runs/all/arterial`: 42.22 [40.69, 44.49] minmax n 4; band 35.887 to 48.939<br>`ftg/BIG_TOWN/street.runs/all/street`: 37.12 [33.271, 45.102] type7 n 10; band 29.9439 to 49.6122<br>`ftg/BIG_CITY/street.runs/all/street`: 35.315 [35.25, 36.286] type7 n 10; band 30.0177 to 40.6122<br>`ftg/METROPOLIS/street.runs/all/street`: 35.25 [35.25, 35.26] minmax n 4; band 29.9625 to 40.5375<br>`ftg/BIG_TOWN/street.runs/all/lane`: 44.7 [44.589, 44.701] type7 n 10; band 37.995 to 51.405<br>`ftg/BIG_CITY/street.runs/all/lane`: 33.595 [30, 44.695] type7 n 10; band 27 to 49.1645<br>`ftg/METROPOLIS/street.runs/all/lane`: 37.5 [30, 44.7] minmax n 4; band 27 to 49.17<br>`ftg/BIG_TOWN/street.runs/all/track`: 183.215 [71.948, 263.433] type7 n 10; band 64.7532 to 289.776<br>`ftg/BIG_CITY/street.runs/all/track`: 77.9 [49.482, 337.357] type7 n 10; band 44.5338 to 371.093<br>`ftg/METROPOLIS/street.runs/all/track`: 68.345 [50.5, 213.19] minmax n 4; band 45.45 to 234.509 |
| ARCHITECTURE 13.5 MFCG street signature | R4 within 60 m | 0.84-0.97 (all sizes) | `mfcg/40/plain/bldg.r4.60/all`: 0.8543 [0.8201, 0.874] type7 n 10; band 0.7262 to 0.9824<br>`mfcg/80/plain/bldg.r4.60/all`: 0.9274 [0.9216, 0.9376] type7 n 10; band 0.7883 to 1.0665<br>`mfcg/130/plain/bldg.r4.60/all`: 0.9548 [0.9488, 0.9571] type7 n 10; band 0.8116 to 1.098 |
| ARCHITECTURE 13.5 MFCG street signature | R4 within 120 m | 0.58-0.88 (all sizes) | `mfcg/40/plain/bldg.r4.120/all`: 0.6374 [0.5781, 0.6737] type7 n 10; band 0.5203 to 0.7411<br>`mfcg/80/plain/bldg.r4.120/all`: 0.7592 [0.7343, 0.7724] type7 n 10; band 0.6453 to 0.8731<br>`mfcg/130/plain/bldg.r4.120/all`: 0.8294 [0.803, 0.8528] type7 n 10; band 0.705 to 0.9538 |
| ARCHITECTURE 13.5 MFCG street signature | R4 within 250 m | 0.32-0.68 (all sizes) | `mfcg/40/plain/bldg.r4.250/all`: 0.4141 [0.3346, 0.5031] type7 n 10; band 0.3011 to 0.5534<br>`mfcg/80/plain/bldg.r4.250/all`: 0.5101 [0.4298, 0.5504] type7 n 10; band 0.3868 to 0.6054<br>`mfcg/130/plain/bldg.r4.250/all`: 0.5858 [0.5576, 0.6252] type7 n 10; band 0.4979 to 0.6877 |
| ARCHITECTURE 13.5 MFCG street signature | wall alignment within 40 m: median deviation | 3.5-4.5 deg | `mfcg/40/plain/bldg.wallAlign.median/all/b0_40`: 4.3686 [3.7859, 4.8313] type7 n 10; band 3.3686 to 5.3686<br>`mfcg/80/plain/bldg.wallAlign.median/all/b0_40`: 3.4758 [3.0675, 3.9317] type7 n 10; band 2.4758 to 4.4758<br>`mfcg/130/plain/bldg.wallAlign.median/all/b0_40`: 2.9996 [2.1944, 3.3906] type7 n 10; band 1.975 to 3.9996 |
| ARCHITECTURE 13.5 MFCG street signature | wall alignment within 40 m: share within 15 deg | 84-92 % | `mfcg/40/plain/bldg.wallAlign.share15/all/b0_40`: 0.8775 [0.8457, 0.9218] type7 n 10; band 0.7459 to 1.014<br>`mfcg/80/plain/bldg.wallAlign.share15/all/b0_40`: 0.8902 [0.8513, 0.9284] type7 n 10; band 0.7567 to 1.0237<br>`mfcg/130/plain/bldg.wallAlign.share15/all/b0_40`: 0.9309 [0.8988, 0.9485] type7 n 10; band 0.7913 to 1.0705 |
| ARCHITECTURE 13.5 MFCG street signature | wall alignment 40-100 m: share within 15 deg | 56-70 % | `mfcg/40/plain/bldg.wallAlign.share15/all/b40_100`: 0.6237 [0.5437, 0.7167] type7 n 10; band 0.4893 to 0.7884<br>`mfcg/80/plain/bldg.wallAlign.share15/all/b40_100`: 0.6827 [0.5867, 0.7713] type7 n 10; band 0.528 to 0.8484<br>`mfcg/130/plain/bldg.wallAlign.share15/all/b40_100`: 0.7624 [0.6801, 0.7841] type7 n 10; band 0.6121 to 0.8768 |
| ARCHITECTURE 13.5 MFCG street signature | wall alignment 100-200 m: share within 15 deg | 38-58 % | `mfcg/40/plain/bldg.wallAlign.share15/all/b100_200`: 0.4439 [0.3704, 0.5636] type7 n 10; band 0.3334 to 0.62<br>`mfcg/80/plain/bldg.wallAlign.share15/all/b100_200`: 0.536 [0.4511, 0.606] type7 n 10; band 0.406 to 0.6666<br>`mfcg/130/plain/bldg.wallAlign.share15/all/b100_200`: 0.5677 [0.5165, 0.6879] type7 n 10; band 0.4648 to 0.7567 |
| ARCHITECTURE 13.5 MFCG street signature | T / Y share; intramural dead ends; blocks per ha; lots per block | ⟨M-1⟩ | `mfcg/40/plain/sgd.tShare/all`: 0.4415 [0.4046, 0.4935] type7 n 10; band 0.3641 to 0.5429<br>`mfcg/80/plain/sgd.tShare/all`: 0.4542 [0.4216, 0.4829] type7 n 10; band 0.3794 to 0.5312<br>`mfcg/130/plain/sgd.tShare/all`: 0.4573 [0.4492, 0.4713] type7 n 10; band 0.3887 to 0.5259<br>`mfcg/40/plain/sgd.deadEnds/all`: 2.3163 [1.6581, 2.7324] type7 n 10; band 1.4923 to 3.0056<br>`mfcg/80/plain/sgd.deadEnds/all`: 1.4254 [1.1113, 1.7767] type7 n 10; band 1.0002 to 1.9544<br>`mfcg/130/plain/sgd.deadEnds/all`: 0.957 [0.7963, 1.1068] type7 n 10; band 0.7167 to 1.2175<br>`mfcg/40/plain/blockc.perHa/all`: 2.5599 [2.1988, 2.7453] type7 n 10; band 1.9789 to 3.0198<br>`mfcg/80/plain/blockc.perHa/all`: 2.3064 [2.0283, 3.1639] type7 n 10; band 1.8255 to 3.4803<br>`mfcg/130/plain/blockc.perHa/all`: 2.5313 [2.4083, 2.8113] type7 n 10; band 2.1516 to 3.0924<br>`mfcg/40/plain/blockc.lotsPer/all`: 9 [8, 9.1] type7 n 10; band 7.2 to 10.35<br>`mfcg/80/plain/blockc.lotsPer/all`: 9 [7, 10] type7 n 10; band 6.3 to 11<br>`mfcg/130/plain/blockc.lotsPer/all`: 9 [8.9, 10] type7 n 10; band 7.65 to 11 |
| ARCHITECTURE 13.5 blocks (NG) | block counts per template at medium; block areas | ⟨M-1⟩ | `ng/medium/block.countTemplate/template-area`: 39 [16, 57] minmax n 5; band 14.4 to 62.7<br>`ng/medium/block.countTemplate/template-street`: 6 [2, 17] minmax n 5; band 1.8 to 18.7<br>`ng/medium/block.countTemplate/template-square`: 10 [5, 23] minmax n 5; band 4.5 to 25.3<br>`ng/medium/block.countTemplate/template-ring`: 59 [33, 116] minmax n 5; band 29.7 to 127.6<br>`ng/medium/block.area/all`: n 608 over 20 seeds; spreadKS p90 0.819 (40 pairs); KS ceiling 1.0237 |
| ARCHITECTURE 13.5 deep block interiors | court share of deep blocks | ⟨M-1⟩ (NG and MFCG) | `ng/medium/block.courtShare/all`: 0.4566 [0.295, 0.5421] type7 n 20; band 0.2655 to 0.5963<br>`mfcg/40/plain/block.courtShare/all`: 0.8101 [0.7452, 0.8558] type7 n 10; band 0.6707 to 0.9414<br>`mfcg/80/plain/block.courtShare/all`: 0.8098 [0.7159, 0.8448] type7 n 10; band 0.6443 to 0.9313<br>`mfcg/130/plain/block.courtShare/all`: 0.8143 [0.7884, 0.8508] type7 n 10; band 0.6922 to 0.9364 |
| ARCHITECTURE 13.5 bent-cut signature | sigma, plain faces | 0.066 | `ng/medium/cut.sigma/plain`: 0.084 [0.084, 0.084] single n 15; band 0.064 to 0.104 |
| ARCHITECTURE 13.5 bent-cut signature | sigma, ring faces | 0.098 (0.100 with the annulus and C-shaped cuts) | `ng/medium/cut.sigma/ring`: 0.094 [0.094, 0.094] single n 5; band 0.074 to 0.114 |
| ARCHITECTURE 13.5 bent-cut signature | one bend at mid-course; corner within 0.10 of mid-course | 380 / 519 one-bend streets; about 82 % near the middle (DC-38) | `ng/medium/cut.cornerMid/all`: 0.8828 [0.8828, 0.8828] single n 20; band 0.8 to - |
| ARCHITECTURE 13.5 bent-cut signature | arrivals at 85 deg or more | 96 % | `ng/medium/cut.arrival85/all`: 0.9737 [0.9737, 0.9737] single n 20; band 0.95 to - |
| ARCHITECTURE 13.5 bent-cut signature | filleted one-bend cuts | 53 % (200 / 378) | `ng/medium/cut.fillet/all`: 0.5376 [0.5376, 0.5376] single n 20; band 0.4876 to 0.5876 |
| ARCHITECTURE 13.5 bent-cut signature | cut lengths per face | ⟨M-1⟩ | `ng/medium/cut.length/all`: n 379 over 18 seeds; spreadKS p90 1 (32 pairs); KS ceiling 1.25<br>`ng/medium/cut.length/template-area`: n 106 over 5 seeds; spreadKS p90 0.2427 (10 pairs); KS ceiling 0.3034<br>`ng/medium/cut.length/template-street`: n 11 over 4 seeds; spreadKS p90 1 (6 pairs); KS ceiling 1.25<br>`ng/medium/cut.length/template-square`: n 17 over 4 seeds; spreadKS p90 1 (6 pairs); KS ceiling 1.25<br>`ng/medium/cut.length/template-ring`: n 245 over 5 seeds; spreadKS p90 0.496 (10 pairs); KS ceiling 0.62 |
| ARCHITECTURE 13.5 figure-ground and streetwall | recoverability | ⟨M-1⟩ | `mfcg/40/plain/fg.recoverability/all`: 0.8702 [0.847, 0.8776] type7 n 10; band 0.8402 to -<br>`mfcg/80/plain/fg.recoverability/all`: 0.7495 [0.7069, 0.7613] type7 n 10; band 0.7195 to -<br>`mfcg/130/plain/fg.recoverability/all`: 0.5236 [0.499, 0.5739] type7 n 10; band 0.4936 to - |
| ARCHITECTURE 13.5 figure-ground and streetwall | gross cover inside the walls (descriptive) | 0.60-0.64 at sizes 40-130 | `mfcg/40/plain/fg.coverWalled/all`: 0.6052 [0.5817, 0.6238] type7 n 10<br>`mfcg/80/plain/fg.coverWalled/all`: 0.6243 [0.6123, 0.6435] type7 n 10<br>`mfcg/130/plain/fg.coverWalled/all`: 0.6228 [0.6127, 0.6373] type7 n 10 |
| ARCHITECTURE 13.5 figure-ground and streetwall | streetwall continuity on dense frontages | ⟨M-1⟩ | `mfcg/40/plain/fg.streetwall/all`: 0.9233 [0.9191, 0.9297] type7 n 10; band 0.9233 to -<br>`mfcg/80/plain/fg.streetwall/all`: 0.9284 [0.9238, 0.9311] type7 n 10; band 0.9284 to -<br>`mfcg/130/plain/fg.streetwall/all`: 0.9243 [0.9214, 0.9274] type7 n 10; band 0.9243 to - |
| ARCHITECTURE 13.5 plots and footprints (FTG) | footprint median; p95; quad side; worst-corner p95 | median 103 m2, p95 154 m2, quad side 10.3 m, worst corner 22.9 deg | `ftg/BIG_TOWN/bldg.area/all/median`: 95.765 [91.574, 99.79] type7 n 10; band 60 to 160<br>`ftg/BIG_CITY/bldg.area/all/median`: 98.985 [92.915, 100.922] type7 n 10; band 60 to 160<br>`ftg/METROPOLIS/bldg.area/all/median`: 90.64 [90.48, 102.61] minmax n 4; band 60 to 160<br>`ftg/BIG_TOWN/bldg.area/all/p95`: 162.835 [153.216, 175.873] type7 n 10; band - to 400<br>`ftg/BIG_CITY/bldg.area/all/p95`: 160.805 [152.42, 186.957] type7 n 10; band - to 400<br>`ftg/METROPOLIS/bldg.area/all/p95`: 163.795 [160.18, 169.12] minmax n 4; band - to 400<br>`ftg/BIG_TOWN/bldg.quadSide/all`: 10.244 [9.9037, 10.3943] type7 n 10; no numeric band: the row states ordinary-house medians and a sheared minority kept (R-34)<br>`ftg/BIG_CITY/bldg.quadSide/all`: 10.325 [10.088, 10.4005] type7 n 10; no numeric band: the row states ordinary-house medians and a sheared minority kept (R-34)<br>`ftg/METROPOLIS/bldg.quadSide/all`: 9.945 [9.807, 10.505] minmax n 4; no numeric band: the row states ordinary-house medians and a sheared minority kept (R-34)<br>`ftg/BIG_TOWN/bldg.worstCorner/all`: 22.761 [19.5033, 26.9836] type7 n 10; no numeric band: a sheared minority kept (section 13.5 plots and footprints; R-34)<br>`ftg/BIG_CITY/bldg.worstCorner/all`: 25.543 [21.9989, 28.1494] type7 n 10; no numeric band: a sheared minority kept (section 13.5 plots and footprints; R-34)<br>`ftg/METROPOLIS/bldg.worstCorner/all`: 26.298 [25.416, 27.369] minmax n 4; no numeric band: a sheared minority kept (section 13.5 plots and footprints; R-34) |
| ARCHITECTURE 13.5 plots and footprints (MFCG, descriptive) | footprint median | 225-289 m2 at sizes 40-250 | `mfcg/40/plain/bldg.area/all/median`: 251.308 [225.456, 279.525] type7 n 10<br>`mfcg/80/plain/bldg.area/all/median`: 262.56 [236.912, 311.732] type7 n 10<br>`mfcg/130/plain/bldg.area/all/median`: 242.086 [225.169, 248.271] type7 n 10 |
| ARCHITECTURE 13.5 party walls and attachment (NG) | per-footprint party-wall share | 0.42-0.46 | `ng/medium/bldg.partyShare/all`: 0.4405 [0.4094, 0.4632] type7 n 20; band 0.3685 to 0.5095 |
| ARCHITECTURE 13.5 party walls and attachment (NG) | attached share | 0.98-1.00 | `ng/medium/bldg.attached/all`: 0.9873 [0.9827, 0.9917] type7 n 20; band 0.9 to - |
| ARCHITECTURE 13.5 party walls and attachment (FTG, descriptive) | party walls; attached | residences 0-5 %, industry 96-98 % (per footprint category) | `ftg/BIG_TOWN/bldg.partyShare/all`: 0 [0, 0] type7 n 10<br>`ftg/BIG_CITY/bldg.partyShare/all`: 0 [0, 0] type7 n 10<br>`ftg/METROPOLIS/bldg.partyShare/all`: 0 [0, 0] minmax n 4<br>`ftg/BIG_TOWN/bldg.attached/all`: 0.1356 [0.0767, 0.1831] type7 n 10<br>`ftg/BIG_CITY/bldg.attached/all`: 0.1361 [0.0979, 0.2377] type7 n 10<br>`ftg/METROPOLIS/bldg.attached/all`: 0.2333 [0.1403, 0.292] minmax n 4 |
| ARCHITECTURE 13.5 plot-area gradient (NG weakness) | Moran I on shared-edge adjacency | -0.18 to +0.05 | `ng/medium/plot.moran/all`: -0.1005 [-0.2347, 0.0644] type7 n 20; Moran I >= 0.8 and > 0 follows from our rules (section 13.5 plot-area gradient) |
| ARCHITECTURE 13.5 walled share and ribbons | walled share | 0.87-0.92 at sizes 40-250 | `mfcg/40/plain/walled.share/all`: 0.9047 [0.8296, 0.9241] type7 n 10; band 0.7466 to 1.0404<br>`mfcg/80/plain/walled.share/all`: 0.9045 [0.8732, 0.9163] type7 n 10; band 0.7688 to 1.0402<br>`mfcg/130/plain/walled.share/all`: 0.9235 [0.8891, 0.9382] type7 n 10; band 0.785 to 1.062 |
| ARCHITECTURE 13.5 walled share and ribbons | ribbon share, size 40 | 0.85 (one seed) | `mfcg/40/plain/ribbon.share/all`: 0.7726 [0.5579, 0.8271] type7 n 10; band 0.5021 to 0.9098 |
| ARCHITECTURE 13.5 walled share and ribbons | ribbon share, size 80 | 0.58 (one seed) | `mfcg/80/plain/ribbon.share/all`: 0.6231 [0.551, 0.7061] type7 n 10; band 0.4959 to 0.7767 |
| ARCHITECTURE 13.5 walled share and ribbons | ribbon share, size 130 | 0.49 (one seed) | `mfcg/130/plain/ribbon.share/all`: 0.5315 [0.4392, 0.5595] type7 n 10; band 0.3953 to 0.6155 |
| ARCHITECTURE 13.5 MFCG anchors | district areas (the row: per seed the median) | 2.4-17.6 ha on the size-40 gate fixtures (per district); median 19.0 ha at plain size 80 (one seed) | `mfcg/40/plain/district.area/all`: 8.8558 [6.3212, 11.3993] type7 n 10; band 5.6891 to 12.5392<br>`mfcg/80/plain/district.area/all`: 17.4734 [10.3064, 25.3081] type7 n 10; band 9.2758 to 27.8389<br>`mfcg/130/plain/district.area/all`: 30.3871 [21.5502, 36.218] type7 n 10; band 19.3952 to 39.8398 |
| ARCHITECTURE 13.5 MFCG anchors | wall vertex spacing p50, size 40 | 88 m (one seed) | `mfcg/40/plain/wall.nodeSpacing/all`: 90.3613 [82.9037, 101.41] type7 n 10; band 74.6133 to 111.551 |
| ARCHITECTURE 13.5 MFCG anchors | castle area | 0.5-3.2 ha (8.7 at size 130, one seed) | `mfcg/40/plain/castle.area/all`: 2.3811 [0.9482, 2.8556] type7 n 10; band 0.8534 to 3.1412<br>`mfcg/80/plain/castle.area/all`: 3.508 [2.0766, 6.0601] type7 n 10; band 1.8689 to 6.6661 |
| ARCHITECTURE 13.5 MFCG anchors | castle area, size 130 | 8.7 ha (one seed) | `mfcg/130/plain/castle.area/all`: 3.832 [0.7144, 6.4941] type7 n 10; band 0.643 to 7.1435 |
| ARCHITECTURE 13.5 MFCG anchors | plaza area | 0.32-0.58 ha | `mfcg/40/plain/plaza.area/all`: 0.3769 [0.1699, 0.5719] type7 n 10; band 0.1529 to 0.6291<br>`mfcg/80/plain/plaza.area/all`: 0.3282 [0.2199, 0.4538] type7 n 10; band 0.1979 to 0.4992<br>`mfcg/130/plain/plaza.area/all`: 0.3589 [0.1835, 0.6305] type7 n 10; band 0.1651 to 0.6935 |
| ARCHITECTURE 13.5 MFCG anchors | districts, size 40 | 9 (one seed) | `mfcg/40/plain/quarter.count/all`: 8.5 [7, 10.1] type7 n 10; band 6.3 to 11.11 |
| ARCHITECTURE 13.5 MFCG anchors | districts, size 80 | 12 (one seed) | `mfcg/80/plain/quarter.count/all`: 12.5 [10.9, 15] type7 n 10; band 9.81 to 16.5 |
| ARCHITECTURE 13.5 MFCG anchors | districts, size 130 | 18 (one seed) | `mfcg/130/plain/quarter.count/all`: 16 [12.8, 19.1] type7 n 10; band 11.52 to 21.01 |
| ARCHITECTURE 13.5 outline anisotropy (FTG) | land-sector r90 CV | 0.365 / 0.333 (the two CITY captures) | `ftg/BIG_TOWN/outline.r90cv/all`: 0.3205 [0.2625, 0.4746] type7 n 10; band 0.2363 to 0.5221<br>`ftg/BIG_CITY/outline.r90cv/all`: 0.2028 [0.0902, 0.394] type7 n 10; band 0.0812 to 0.4334<br>`ftg/METROPOLIS/outline.r90cv/all`: 0.331 [0.1834, 0.3865] minmax n 4; band 0.1651 to 0.4252 |
| ARCHITECTURE 13.5 outline anisotropy (FTG) | road / non-road r90 ratio | 1.160 / 1.214 (the two CITY captures) | `ftg/BIG_TOWN/outline.roadRatio/all`: 1.3466 [1.0655, 1.88] type7 n 10; band 0.9589 to 2.068<br>`ftg/BIG_CITY/outline.roadRatio/all`: 1.1908 [1.0785, 1.48] type7 n 10; band 0.9707 to 1.628<br>`ftg/METROPOLIS/outline.roadRatio/all`: 1.2848 [0.8452, 1.4909] minmax n 4; band 0.7607 to 1.64 |
| ARCHITECTURE 13.5 towers and gates (FTG) | tower spacing median | 39 m (38.65 / 35.59 m by type 7) | `ftg/BIG_TOWN/wall.towerSpacing/all`: 34.897 [32.396, 40.675] minmax n 9; band 29.1564 to 44.7425<br>`ftg/BIG_CITY/wall.towerSpacing/all`: 33.3575 [31.6575, 35.5424] type7 n 10; band 28.3539 to 39.0966<br>`ftg/METROPOLIS/wall.towerSpacing/all`: 32.704 [31.81, 34.64] minmax n 4; band 27.7984 to 38.104 |
| ARCHITECTURE 13.5 towers and gates (FTG weakness) | arterial crossings at no gate | 3 and 1 | `ftg/BIG_TOWN/wall.ungated/all`: 3 [0, 4] minmax n 9; ungated crossings 0 on ground part 0 (section 13.5 towers and gates)<br>`ftg/BIG_CITY/wall.ungated/all`: 3 [1, 7] type7 n 10; ungated crossings 0 on ground part 0 (section 13.5 towers and gates)<br>`ftg/METROPOLIS/wall.ungated/all`: 4 [3, 7] minmax n 4; ungated crossings 0 on ground part 0 (section 13.5 towers and gates) |
| ARCHITECTURE 13.5 towers and gates (MFCG) | main gates | 5 / 8 / 12 at sizes 40 / 80 / 130 | `mfcg/40/plain/gate.count/all`: 5 [4.9, 5] type7 n 10; main gates = N exact by our law (section 13.5 towers and gates)<br>`mfcg/80/plain/gate.count/all`: 8 [8, 8] type7 n 10; main gates = N exact by our law (section 13.5 towers and gates)<br>`mfcg/130/plain/gate.count/all`: 12 [11.9, 12] type7 n 10; main gates = N exact by our law (section 13.5 towers and gates) |
| ARCHITECTURE 13.5 water (FTG) | outline step | 50 m resampling on one payload; the second capture pooled 15.7 m | `ftg/BIG_TOWN/water.step/all`: 17.1675 [14.489, 70.17] minmax n 6; band - to 25<br>`ftg/BIG_CITY/water.step/all`: 16.888 [15.561, 50.867] minmax n 6; band - to 25<br>`ftg/METROPOLIS/water.step/all`: 50.001 [16.154, 50.22] minmax n 3; band - to 25 |
| ARCHITECTURE 13.5 tree scatter (FTG weakness) | nearest-neighbour median; p1 | median 10.6 m (10.59 / 10.57 m); minimum 0.14 m | `ftg/BIG_TOWN/tree.nnMedian/all`: 10.409 [9.7385, 11.0927] type7 n 10; reported beside the p1 clause (section 13.5 tree scatter)<br>`ftg/BIG_CITY/tree.nnMedian/all`: 10.3145 [9.924, 10.8555] type7 n 10; reported beside the p1 clause (section 13.5 tree scatter)<br>`ftg/METROPOLIS/tree.nnMedian/all`: 9.249 [8.741, 9.7] minmax n 4; reported beside the p1 clause (section 13.5 tree scatter)<br>`ftg/BIG_TOWN/tree.nnP1/all`: 0.985 [0.8843, 1.1279] type7 n 10; NN p1 >= section 13.7's canopy threshold (section 13.5 tree scatter)<br>`ftg/BIG_CITY/tree.nnP1/all`: 1.063 [0.9808, 1.2709] type7 n 10; NN p1 >= section 13.7's canopy threshold (section 13.5 tree scatter)<br>`ftg/METROPOLIS/tree.nnP1/all`: 1.196 [1.044, 1.334] minmax n 4; NN p1 >= section 13.7's canopy threshold (section 13.5 tree scatter) |
| ARCHITECTURE 13.5 population and buildings | persons per building | FTG 3.4 (descriptive); MFCG six per lot (weakness) | `ftg/BIG_TOWN/pop.perBuilding/all`: 3.2884 [3.058, 3.3622] type7 n 10<br>`ftg/BIG_CITY/pop.perBuilding/all`: 3.3472 [3.2185, 3.4226] type7 n 10<br>`ftg/METROPOLIS/pop.perBuilding/all`: 3.3714 [3.1719, 3.4584] minmax n 4<br>`mfcg/40/plain/pop.perBuilding/all`: 6.0269 [6.0116, 6.039] type7 n 10; requested population within +-5 % on >= 95 % of seeds; the ratio reported (section 13.5 population)<br>`mfcg/80/plain/pop.perBuilding/all`: 6.1544 [6.0175, 6.1993] type7 n 10; requested population within +-5 % on >= 95 % of seeds; the ratio reported (section 13.5 population)<br>`mfcg/130/plain/pop.perBuilding/all`: 6.0439 [6.0133, 6.1101] type7 n 10; requested population within +-5 % on >= 95 % of seeds; the ratio reported (section 13.5 population) |
| ARCHITECTURE 13.5 generation time (FTG weakness) | server time at the timed CITY preset | 2.9-3.2 s PUT to OPTIONS; 3.7-4.3 s PUT to layout GET (the row) | `ftg/CITY/time.model/all`: 4267 [2767, 5245] minmax n 3; section 12.3 / 12.5 budgets; the ratios of section 12.9 (section 13.5 generation time)<br>`ftg/BIG_TOWN/time.model/all`: 2131 [1927.5, 2808.8] type7 n 10; section 12.3 / 12.5 budgets; the ratios of section 12.9 (section 13.5 generation time)<br>`ftg/BIG_CITY/time.model/all`: 6229.5 [5944, 7100.4] type7 n 10; section 12.3 / 12.5 budgets; the ratios of section 12.9 (section 13.5 generation time)<br>`ftg/METROPOLIS/time.model/all`: 12996 [10296, 15223] minmax n 4; section 12.3 / 12.5 budgets; the ratios of section 12.9 (section 13.5 generation time) |
| ARCHITECTURE 13.5 draw style (NG hatched) | hatch triangles and shadow quads per wing | 18.07 (map means 15.76-21.10) and 2.29 (1.97-2.54) over the 44 plan seeds (DC-36 applied) | `ng/plan/draw.hatchPerWing/all`: 18.0679 [18.0679, 18.0679] single n 44; band 15 to 20<br>`ng/plan/draw.shadowQuadsPerWing/all`: 2.2869 [2.1648, 2.4536] type7 n 44; band 1.9439 to 2.699 |
| ARCHITECTURE 13.5 between-seed variety | dispersion per rung, MFCG and FTG | ⟨M-1⟩ | `mfcg/TOWN/variety.dispersion/all`: 1.8061 [1.8061, 1.8061] single n 10<br>`ftg/TOWN/variety.dispersion/all`: 3.2901 [3.2901, 3.2901] single n 10<br>`mfcg/CITY/variety.dispersion/all`: 1.5611 [1.5611, 1.5611] single n 10<br>`ftg/CITY/variety.dispersion/all`: 3.4795 [3.4795, 3.4795] single n 10<br>`mfcg/METROPOLIS/variety.dispersion/all`: 1.7378 [1.7378, 1.7378] single n 10<br>`ftg/METROPOLIS/variety.dispersion/all`: 3.3631 [3.3631, 3.3631] single n 4 |
| ARCHITECTURE 13.5 markets (MFCG) | secondary markets; adjacent pairs | 0 and 0 in every export (E07) | `mfcg/40/plain/market.secondary/all`: 0 [0, 0] type7 n 10; band -0.5 to 0.5<br>`mfcg/80/plain/market.secondary/all`: 0 [0, 0] type7 n 10; band -0.5 to 0.5<br>`mfcg/130/plain/market.secondary/all`: 0 [0, 0] type7 n 10; band -0.5 to 0.5<br>`mfcg/40/plain/market.adjacent/all`: 0 [0, 0] type7 n 10; band - to 0<br>`mfcg/80/plain/market.adjacent/all`: 0 [0, 0] type7 n 10; band - to 0<br>`mfcg/130/plain/market.adjacent/all`: 0 [0, 0] type7 n 10; band - to 0 |
| ARCHITECTURE 13.5 wealth bands (FTG, descriptive) | six-tier lifestyle distribution | ⟨M-1⟩ | `ftg/BIG_TOWN/wealth.tier1/all`: 0.0109 [0.0109, 0.0109] type7 n 10<br>`ftg/BIG_TOWN/wealth.tier2/all`: 0.0109 [0.0109, 0.0109] type7 n 10<br>`ftg/BIG_TOWN/wealth.tier3/all`: 0.2174 [0.2174, 0.2174] type7 n 10<br>`ftg/BIG_TOWN/wealth.tier4/all`: 0.4348 [0.4348, 0.4348] type7 n 10<br>`ftg/BIG_TOWN/wealth.tier5/all`: 0.2174 [0.2174, 0.2174] type7 n 10<br>`ftg/BIG_TOWN/wealth.tier6/all`: 0.1087 [0.1087, 0.1087] type7 n 10 |
| ARCHITECTURE 13.5 water (FTG) | river widths (the channel-width rows, round 3) | 44.0 / 46.1 / 29.8 m, M-1's rows held until the registry carried the renamed id (31 m / 48 m on the two CITY captures) | `ftg/BIG_TOWN/water.channelWidth/all`: 43.9985 [42.62, 55.989] minmax n 6; band 37.3987 to 61.5879<br>`ftg/BIG_CITY/water.channelWidth/all`: 46.1225 [31.489, 54.606] minmax n 6; band 28.3401 to 60.0666<br>`ftg/METROPOLIS/water.channelWidth/all`: 29.791 [22.373, 31.665] minmax n 3; band 20.1357 to 34.8315<br>`ftg/CITY/water.channelWidth/all`: 37.0845 [31.303, 42.866] minmax n 2 |
| ARCHITECTURE 13.5 water (MFCG, descriptive) | exported river width, the stress family (round 3) | 84 m at size 80 over three stress seeds (M-1) | `mfcg/80/river+coast/water.channelWidth/all`: 83.8575 [68.7762, 114.263] minmax n 3 |
| ARCHITECTURE 13.5 draw style (MFCG ink; R-51, DC-40) | casing law, round joins, walls after buildings; round caps (descriptive) | casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order | `mfcg/draw/recorded/draw.casingLaw/all`: 1 [1, 1] type7 n 11; band 1 to -<br>`mfcg/draw/recorded/draw.roundJoins/all`: 0.9999 [0.9998, 1] type7 n 12; band 0.999 to -<br>`mfcg/draw/recorded/draw.wallsAfterBuildings/all`: 1 [1, 1] minmax n 8; order parity as section 8.3 defines it, ours against our declared slot table; the reference's value reported (section 13.5 draw style, ink; R-51)<br>`mfcg/draw/recorded/draw.roundCaps/all`: 0.9971 [0.991, 0.9992] type7 n 12 |
| ARCHITECTURE 13.5 draw style (MFCG ink; R-51, DC-40) | wall width at size 40 | 6.2 px at size 40's scale (the four-gate fixture, 0.8157 px per m) | `mfcg/40/plain/draw.widthPx/all/wall`: 6.3403 [6.0086, 7.0661] type7 n 10; band 5.3893 to 7.2913 |
| ARCHITECTURE 13.5 draw style (MFCG ink; R-51, DC-40) | tower width at size 40 | 12.4 px at size 40's scale (the four-gate fixture) | `mfcg/40/plain/draw.widthPx/all/tower`: 12.6806 [12.0171, 14.1322] type7 n 10; band 10.7785 to 14.5827 |
| ARCHITECTURE 13.5 draw style (MFCG ink; R-51, DC-40) | road-core width at size 40 | 6.5 px at size 40's scale (the four-gate fixture) | `mfcg/40/plain/draw.widthPx/all/roadCore`: 6.674 [6.3248, 7.438] type7 n 10; band 5.6729 to 7.6751 |
| ARCHITECTURE 13.5 draw style (MFCG ink; R-51, DC-40) | pier width at size 40 (section 8.3 quotes 3.9) | 3.9 px at size 40's scale (the four-gate fixture) | `mfcg/40/plain/draw.widthPx/all/pier`: 4.0044 [3.7949, 4.4628] type7 n 10; band 3.4037 to 4.6051 |
| ARCHITECTURE 4.7 granularity table, prosperous band anchor | MFCG plots per block | about 18.6 plots per block (a profiler count of partition leaves, E09 F1) | `mfcg/40/plain/blockc.lotsPer/all`: 9 [8, 9.1] type7 n 10; band 7.2 to 10.35<br>`mfcg/80/plain/blockc.lotsPer/all`: 9 [7, 10] type7 n 10; band 6.3 to 11<br>`mfcg/130/plain/blockc.lotsPer/all`: 9 [8.9, 10] type7 n 10; band 7.65 to 11 |

## 9 Held rows and stated no-rows

| what | rows | why | to |
|---|---|---|---|
| the channel-width rows (FTG BIG_TOWN, BIG_CITY, METROPOLIS, CITY; MFCG stress) | 5 — **appended at round 3** | the earlier id's second token was listed by both deny-lists (it repeated an MFCG export key) | resolved: the id `water.channelWidth` (design/m1-corrections-2, J-5; the registry at round 3); the rows equal the held ones apart from the id (section 13.1) |
| D28: `draw.casingLaw`, `draw.roundJoins`, `draw.roundCaps`, `draw.widthPx` (four fields), `draw.wallsAfterBuildings` (MFCG) | 8 — **appended at round 3** | no registered sample family for the twelve draw records (R-03) | resolved by R-51: the recorded family `capture/MFCG/draw/recorded` (plan.py's block) for four, the formula route on `capture/MFCG/40/plain` for `draw.widthPx` (section 13.2) |
| `street.runs` field `alley` (FTG) | no row | FTG's way classes hold no alley (E05); no payload has the value | — |
| FTG TOWN (slots 26, 27) | no row | R-34: `FtgSize` has no TOWN member; research-side numbers in E05 §9 | — |
| the stress family's other values (MFCG) | no row | R-23 names the stress cells that take rows | — |
| `plot.spearman` (NG), `alley.gradient` (FTG), `label.*` (MFCG, NG) | no row | the registry's `m1NoRow` (R-23) | — |

## 10 Calls made under the delegation (J122; each vetoable)

| id | decision | why; the alternative |
|---|---|---|
| D1 | an FTG row lists every plan slot of its size; slots that give no value are in `failed` with a reason | C7's "captures equal the plan's slots in order" and T-V12-30's "no unlisted gap" become one testable rule. Alternative: list only the contributing slots, which C7 cannot tell from a dropped slot |
| D2 | a pooled row over several registered families names their parent `capture/NG` and lists the member labels; C7 requires every member family whole, in plan order | the design gives a pooled row one `family` string. Alternative: a new registered union family (a `plan.py` change, not this lane's) |
| D3 | FTG's `referenceBuild` is one programme build, `ftg:m1+` and the first 12 hex digits of sha256 over the per-capture builds of the 27 captures the rows read, in plan order; it is the FTG pin | every capture's request hash differs (client-random ids), so per-capture builds cannot be pinned; one string keeps V12 §3.5.5's pin selection working and stays reproducible. Alternative: one row per capture build, which pools nothing |
| D4 | `capture` is a `research:` label of the capture root; `script` the measuring script | a pooled row reads many folders; the label is opaque (C2). Alternative: the first capture's stamp, which misnames the sample |
| D5 | ids `<reference>/<setting>/<metric>/<subset>[/<field>]` | N-25 fixes only the tail |
| D6 | MFCG's dispersion reads components 2–5 over the derived lanes (W-09's companion) | V12 §3.4.1: a metric that reads lanes on MFCG reads the derived graph; the R-10 form is printed beside. E09 F2 left the choice to this lane |
| D7 | a whole-sample distribution row's `spreadKS` is over the within-template seed pairs | attachment A: "over the per-template subsets"; the all-pairs value is in the JSON |
| D8 | the registry's bin edges are written to four decimals | R-46's digit rule; the KS spread is counted on the exact edges |
| D9 | D28's rows are held, not crossed | R-03 and C7 (F1) |
| D10 | `water.step` keeps the registry's definition (vertices turning under 1° dropped), one row per size, the coast-step split in the note | the band is §13.5's fixed bound (R-48), so the split cannot move a verdict. E05 9.8 (2) asked a ruling seat whether the value is one number or one per coast step: one number, with the split recorded |
| D11 | a fixed-band row whose reference value is a pooled statistic (σ, corner, arrival, fillet, hatch) holds it as p10 = p50 = p90, `single` | the pooled value is the measure §13.5 quotes and need not lie inside the per-seed spread (σ plain: 0.084 against 0.062–0.082); the per-seed spread is in the JSON. Alternative: per-seed p10 / p90 around a pooled p50, which C5 refuses as unordered |
| D12 | σ's reference value is the simple-parent fit (0.090 / 0.084 / 0.094 pooled, plain, ring); the arrival and fillet values are over every cut | like for like with §13.5's figures (E10 9.4, 9.7 (2)); the rebuilt-parent and bounded values are in the notes and JSON |
| D13 | C10's research twin reads a JSON file's string values and keys | a number holds no word, list, grammar or name (N-22's reasoning); the whole-text count is reported beside it. Flagged for veto: it is a firewall-rule reading, as R-14 was |
| D14 | the CITY family's rows: `time.model` a weakness, the rest descriptive | R-02 / R-34: the timed preset serves the generation-time row and descriptive companions |
| D15 | the cut-length rows list seeds with no bounded cut in `failed` as `no-cut` | T-V12-30: no unlisted gap |
| D16 (round 3) | the 13 formerly held rows are appended after the landing's 478, in a fixed order (FTG channel width by size, MFCG's stress row, the four recorded draw rows, the four `draw.widthPx` fields) | the rulings say "append"; the 478 keep their places and bytes except the 60 marked notes, so the change reads as appends plus notes. Alternative: each row in its natural place among its reference's rows (the order is free before the first crossing) |
| D17 (round 3) | the measuring records keep the key their tools wrote before the rename; `rows.py` reads E05's and E07's values under that key and writes the registry id `water.channelWidth` | E05 and E07 are W-05b's and W-07b's records, reproduced byte for byte by their `--check`; renaming inside them would break those receipts for a key no crossing file carries. Alternative: re-key both records (their tools and JSON), which moves two landed records for no measured reason |
| D18 (round 3) | `draw.widthPx`'s per-seed values go to a new record, `E07-mfcg-signature.widths.json`, written by a new `--plan-widths` mode of `measure_mfcg.py` with its own checker and `--red` | adding a block to E07's plan JSON would move the input hash E13 records (`spike_bootstrap.py --verify` would then differ) and W-07b's byte reproduction; the new file leaves both intact (W-07 and W-07b re-run byte-identical, section 13.5). Alternative: the block inside E07's plan JSON |
| D19 (round 3) | C10's twin reads each string value and each distinct key as a text of its own | R-52 rules this reading for M0's scanner and states the twin applies it; the twin joined the strings one per line, and the scanner's 3-grams ran across lines, so one run spanned a marker and the next row's id (finding F7). One reading on both sides. Alternative: reword the marker to dodge the joined run, which leaves the twin and M0 reading differently |
| D20 (round 3) | the recorded draw rows' notes name the family, not the recording dates | the two dates as one phrase are a 3-gram run on both lists (C3, C10); the labels and `plan.json`'s block name the recordings |
| D21 (round 3) | R-50 (4)'s FTG test draws one set of 1 000 index vectors per size, shared by that size's type 7 band-rule rows (the code refuses rows that read different slots) | E13's form per family; all 13 rows read the same ten slots per size |
| D22 (round 3) | `draw.wallsAfterBuildings` per recording 1.0 or 0.0, a share; `draw.casingLaw` per recording the paired cores over the cased ones (cores less the uncased) | the registry's units (share); the casing share is the law's own reading in E07 section 7 |
| D23 (round 3) | `plan.py` keeps every recorded draw member against the prior `plan.json` and lets the family only append | R-36's guard for FTG's slots carried to the new recorded block (R-51 (2): "the family extends only by a new recording appended in order"); a swap was refused and an append accepted on a scratch mirror |
| D24 (round 3) | W-15's result file turns to `landed` | every check of the row passes once the 13 rows are in; T-V12-28's receipt states the D13 pass and the whole-text fail together, as the wave-3 verifier asked |

## 11 Findings and hand-offs

* **N-26 (ruled by R-52; carried by the session to M0-k-05 and M0-k-06 before waves 11 and 13).** The scanner over a
  numbers-only crossing file finds 3-gram runs made of numbers: **70 distinct runs on `baselines.json`, each hit once on
  each of the two lists (140 hits)**, all runs of histogram counts or values (0 on `ng-faces.json`, whose integers are
  large); the landing wrote "140 runs" for the hits. Strings and keys: 0 hits. R-52 took the first route (M0's scanner
  reads a crossing file by its string values and keys, each a text of its own; the list stays whole); it stands or falls
  with D13 (R-54). CONFIRMED (counted; the same 70 per list on the 491-row candidate).
* **F1 (resolved by R-51, round 3):** D28's draw rows on the recorded family `capture/MFCG/draw/recorded` and
  `draw.widthPx` on the size-40 plain family (sections 9, 13.2).
* **F2 (resolved, round 3):** the id `water.channelWidth` (design/m1-corrections-2, J-5), in the registry since round 3
  (sections 9, 13.1).
* **F3 (design seat; information):** the vacuous distribution ceilings of section 4.
* **F4 (owner and rulings seat; carried, not new):** S-V12-1 has fired (E13 F1, F2); with W-08's rows it stays fired, and
  `fg.recoverability` at METROPOLIS is itself unstable.
* **F5 (M0-k-05, through the session):** three conventions the parity CLI meets in this file: a pooled NG row's
  `sample.family` is the union `capture/NG` with its labels listed (D2); MFCG's stress rows share metric, reference and
  rung with plain rows and differ by `sample.family`'s options segment (`river+coast`); a row with `values.n` 0 lists every
  member in `failed`.
* **F6 (design seat; information):** DC-38's figures are confirmed on the formula seeds: corner near the middle 0.883
  (211 of 239), filleted 0.538 (393 of 731), arrival 0.974; σ plain moves 0.066 → 0.084 (the band moves with it, section
  7); granularity's "about 18.6 plots per block" against `blockc.lotsPer` 9 per size (E09 F1).
* **F7 (round 3; fixed here):** C10's twin joined the string values and keys one per line and handed the whole to the
  scanner, whose 3-grams run across lines, so a 3-gram could span two strings — the reading R-52 rules out and says the
  twin already follows. Round 3's markers made it visible: one run spanning the end of `mfcg/80/plain/sgd.deadEnds/all`'s
  note and the next row's id hit both lists, while every string alone holds 0. The twin now scans each text on its own
  (D19). The landing's verdict is unaffected: the 478-row candidate held 0 hits under either form. CONFIRMED.
* **F8 (round 3; a hazard for reproductions):** R-51's block moved `plan.json`'s bytes (sha256 `9ed325bd…` →
  `748707c3…`; the families, the FTG slots and the bindings are byte-equal). Records that embed the plan's hash —
  E05's slots file and E06 (`9ed325bd…`), E08 and E09 (older hashes already) — now differ from a fresh run in that one
  field; a byte reproduction compares all but the plan hash (as `measure_ftg_faces.py --check` does) or runs against
  git HEAD 339ef9f's `plan.json`. CONFIRMED (the hashes read).

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** every count and value above: the candidate and its C1–C10 run, the two other kinds, the 41
fixtures, T-V12-28's research side, the 307 receipts, the 11 independent recomputes, `--check` and `--red`, the band
self-test and its equality with W-13's bands on 78 rows, the dispersions, W-13's addendum with W-13's own draws, the flip
list, the hand-off, the held rows' reasons (each scanner hit counted). **PLAUSIBLE (reasoning):** that M0's scanner,
built at wave 13, would read a JSON crossing file as whole text (N-26 exists because nothing fixes the reading yet); that
the number runs carry no reference content (they are histogram counts of our own measurement, but a run of numbers
cannot be told apart from a copied numeric table by the scanner alone); that the midpoint is a fair centre for an old
range in section 7 (the cells give none).

Round 3's own CONFIRMED / PLAUSIBLE line is in section 13.6.

**Content check of this record** (`doc_checks.py --doc docs/calibration/E15-baselines.md --heads docs/ARCHITECTURE.md`,
with this paragraph): C1 0, C2 0, C4 0, S1 0, S2 0; C3 17 hits, 11 unreviewed, all read: digit runs of values and
section numbers, and phrases of our own records and of §13.5 (the json holds the spread; the tower spacing cell; the M-1
name; this paragraph's own wording about the design set). None is a reference word list, palette, grammar or identifier; this file is not in the design set, so no allow
row is added (wave 1's precedent).

`df -h`: 11 GiB free at the start. Not touched: `plat/`, the design, `plan.py`, `plan.json`, `metrics.m-1.json`, every
earlier record and script, the deny-lists. No git command changed state.

## 13 Round 3 — the rulings applied (lane `m1/round3-apply`, 2026-10-04)

The research apply seat of rulings round 3 (`M-1-rulings-3.md`, R-50 … R-54; J171), continuing W-15 with its own
tools (R-47 (a)); beside it a design seat applied DC-39 … DC-41's design side. Nothing was written into `plat/` or the
design, no website was touched, no benchmark ran, no git command changed state; every heavy run was one at a time under
`nice 10` beside M0's build seats. The result file is `results/round3-apply.json`.

### 13.1 The registry rename (F2) and the five channel-width rows

`plan.py`'s catalogue twin carried the earlier id, so `plan.py --check` refused every write (exit 2, "catalogue
mismatch", the wave-3 verifier's receipt). On a scratch mirror (the plan, the registry and today's V12) the registry
entry, its two M-1 mappings and their notes took `water.channelWidth`, the entry's basis records the rename, and the
twin's `amendedBy` names this lane; the mirror then read `--check` SAME and SAME and `--catalogue-check` exit 0 (0
missing, 0 extra, the draw family's nine members alike). `plan.py` was installed by an atomic rename and regenerated:
`plan.json` byte-equal (`9ed325bd…`), `metrics.m-1.json` `8a0efa7e…` → `ee191172…` (three lines differ: the id, its
basis, `amendedBy`), `--check` SAME SAME, `--catalogue-check` exit 0. `rows.py` then formed the five rows under the
registry id; each equals its held row in `heldRows` apart from `id` and `metric` (CONFIRMED by comparison).

### 13.2 R-51: the recorded draw family and the eight draw rows

**The block.** Appendix B's `MFCG_RECORDED_DRAW` and its rule were installed in `plan.py` the same way (a second
mirror, then an atomic rename): `plan.json` gains the top-level `mfcgRecordedDraw` (twelve members in recording order,
labels `capture/MFCG/draw/recorded/0` … `/11`, each with its folder, generation, size, water, log-complete and
cased-ribbon flags), `counts.mfcgRecordedDraw` 12 and an `amendments` entry; `families` and `ftg` are byte-equal;
`--check` SAME SAME (`748707c3…`, `ee191172…`). `compute()` keeps every member against the prior `plan.json` (D23): on
a mirror, swapping members 10 and 11 was refused (exit 2) and appending a thirteenth recording was accepted.
`cross_check.py`'s `load_plan` registers the family, kind `recorded`, and C7 checks a row on it as any registered
family with captures (three fixtures, section 3).

**`draw.widthPx`, the formula route.** `measure_mfcg.py --plan-widths` (D18) reads each plan seed's own export by
E07's `matchedWidthsPx` rule — the model width × px per metre, px per metre the SVG's outer scale / 4 — for the three
plain families (no load; W-03's files): its checks pass 4 / 4 (all 30 exports present; the model widths wall 7.6, tower 15.2,
road core 8 and pier 4.8 m in every one; 120 widths recomputed by the rule; E07's four fixtures reproduced exactly by the generalised
function), `--red` turns the two planted checks red, and a second run is byte-identical. A plain export draws no plank,
so the pier width is the rule's 4.8 m default, said in the row's note. Px per metre at size 40 is 0.8343 [0.7906,
0.9297]; at 80 and 130 (tabled in E07, no row) 0.4784 and 0.3093.

**The rows (appended after the 478):**

| row | role / band kind | p50 [p10, p90], estimator, n | sample failed | band |
|---|---|---|---|---|
| `ftg/BIG_TOWN/water.channelWidth/all` | target / band rule | 43.9985 [42.62, 55.989], minmax, n 6 | 0 water-none, 3 water-none, 5 water-none, 7 water-none | 37.3987 – 61.5879 |
| `ftg/BIG_CITY/water.channelWidth/all` | target / band rule | 46.1225 [31.489, 54.606], minmax, n 6 | 0 water-none, 3 water-none, 5 water-none, 7 water-none | 28.3401 – 60.0666 |
| `ftg/METROPOLIS/water.channelWidth/all` | target / band rule | 29.791 [22.373, 31.665], minmax, n 3 | 0 water-none | 20.1357 – 34.8315 |
| `ftg/CITY/water.channelWidth/all` | descriptive / descriptive | 37.0845 [31.303, 42.866], minmax, n 2 | 1 setting, 2 water-none | — |
| `mfcg/80/river+coast/water.channelWidth/all` | descriptive / descriptive | 83.8575 [68.7762, 114.263], minmax, n 3 | 1 retry, 4 retry | — |
| `mfcg/draw/recorded/draw.casingLaw/all` | target / fixed | 1 [1, 1], type7, n 11 | 9 uncased | 1.0 – - |
| `mfcg/draw/recorded/draw.roundJoins/all` | target / fixed | 0.9999 [0.9998, 1], type7, n 12 | none | 0.999 – - |
| `mfcg/draw/recorded/draw.roundCaps/all` | descriptive / descriptive | 0.9971 [0.991, 0.9992], type7, n 12 | none | — |
| `mfcg/draw/recorded/draw.wallsAfterBuildings/all` | target / fixed | 1 [1, 1], minmax, n 8 | 4 truncated-log, 5 truncated-log, 6 truncated-log, 8 truncated-log | order parity (section 8.3), no numeric edge |
| `mfcg/40/plain/draw.widthPx/all/wall` | target / fixed | 6.3403 [6.0086, 7.0661], type7, n 10 | none | 5.3893 – 7.2913 |
| `mfcg/40/plain/draw.widthPx/all/tower` | target / fixed | 12.6806 [12.0171, 14.1322], type7, n 10 | none | 10.7785 – 14.5827 |
| `mfcg/40/plain/draw.widthPx/all/roadCore` | target / fixed | 6.674 [6.3248, 7.438], type7, n 10 | none | 5.6729 – 7.6751 |
| `mfcg/40/plain/draw.widthPx/all/pier` | target / fixed | 4.0044 [3.7949, 4.4628], type7, n 10 | none | 3.4037 – 4.6051 |

The casing, joins and caps shares are per recording from E07's draw census (`coresPaired` over the cased cores;
round joins over joins; round caps over caps), pooled joins 0.99998 and caps 0.99905 in the notes; a recording whose
log was cut at 60 000 entries cannot place its first wall stroke (`truncated-log`), and the one recording that draws its
road uncased has no cased ribbon (`uncased`). The draw style is size-invariant (E07 section 7), so the recorded rows
carry no `matched` (DC-40 adds V12 §3.5.5's sentence for such a row). Receipts: each recording's flags in `plan.json`
against E07's census (12), the pooled shares against E07 section 7's figures (1), the four width rows against the
widths file's summaries (4) — 17 / 17.

### 13.3 R-50: the stability markers

**MFCG (R-50 (2)).** The 49 band-rule rows E13 lists unstable and `mfcg/130/plain/fg.recoverability/all` under
§13.5's one-sided form carry the marker `S-V12-1 edge noise ⟨flip share⟩: lo ⟨2.5 %⟩-⟨97.5 %⟩, hi ⟨2.5 %⟩-⟨97.5 %⟩`
(three significant figures; `(one-sided)` on the recoverability row), joined to the note by "; ". `rows.py` forms each
from E13's `rowRate`, `loDraws` and `hiDraws`, and the recoverability row from W-13's addendum, whose re-run now keeps
the per-draw edges' 2.5 / 50 / 97.5 percentiles (0.4751 – 0.5302 around 0.4936). **All 50 markers equal appendix A of
`M-1-rulings-3.md` character for character, on exactly the 50 rows it lists** (CONFIRMED by comparison); the longest
note is 198 characters. Every marked row's band entry in the JSON gains `stability` (flip share, both intervals, the
edge terms, the draws' sha256, the source, the rule). No role, value, band, estimator or sample changed: among the
first 478 rows only the 60 marked notes differ (CONFIRMED by comparison with the landing's candidate).

**FTG (R-50 (4)).** S-V12-1's test, unchanged, on FTG's 13 band-rule target rows with estimator `type7` (stream
`S-V12-1|capture/FTG/<size>`, 1 000 draws of the ten slots, candidates at each edge ± 5 %, flagged above 50 flips;
draws sha256 `f3bb0964…` at BIG_TOWN and `1ccd24c6…` at BIG_CITY). **10 of the 13 are flagged and carry the marker;
3 are stable** (rows whose edges both rest on the centre terms, or nearly). Rows with `minmax` or `single` estimators
take no marker (R-50 (4)). The outcome share is not recomputed over FTG.

| row | flips | band | edge terms | verdict | marker |
|---|---|---|---|---|---|
| `ftg/BIG_TOWN/street.runs/all/arterial` | 262 / 1 000 | 42.925 – 60.5 | c x 0.85; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.26: lo 42.9-43.9, hi 58.1-83.4` |
| `ftg/BIG_TOWN/street.runs/all/street` | 752 / 1 000 | 29.9439 – 49.6122 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.75: lo 28.4-32.2, hi 41.6-52.3` |
| `ftg/BIG_TOWN/street.runs/all/lane` | 0 / 1 000 | 37.995 – 51.405 | c x 0.85; c x 1.15 | stable | none |
| `ftg/BIG_TOWN/street.runs/all/track` | 620 / 1 000 | 64.7532 – 289.7763 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.62: lo 46.2-130, hi 239-355` |
| `ftg/BIG_TOWN/outline.r90cv/all` | 724 / 1 000 | 0.2363 – 0.522 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.72: lo 0.181-0.271, hi 0.379-0.535` |
| `ftg/BIG_TOWN/outline.roadRatio/all` | 763 / 1 000 | 0.959 – 2.068 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.76: lo 0.817-1.16, hi 1.55-2.11` |
| `ftg/BIG_CITY/street.runs/all/arterial` | 353 / 1 000 | 38.5992 – 58.0693 | p10 x 0.9; c x 1.15 | flagged | `S-V12-1 edge noise 0.35: lo 38.3-42.9, hi 55.6-58.1` |
| `ftg/BIG_CITY/street.runs/all/street` | 0 / 1 000 | 30.0177 – 40.6122 | c x 0.85; c x 1.15 | stable | none |
| `ftg/BIG_CITY/street.runs/all/lane` | 205 / 1 000 | 27.0 – 49.1645 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.20: lo 26-28.4, hi 40.1-51.4` |
| `ftg/BIG_CITY/street.runs/all/track` | 792 / 1 000 | 44.5338 – 371.0927 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.79: lo 38.1-65.9, hi 110-420` |
| `ftg/BIG_CITY/wall.towerSpacing/all` | 12 / 1 000 | 28.3539 – 39.0966 | c x 0.85; p90 x 1.1 | stable | none |
| `ftg/BIG_CITY/outline.r90cv/all` | 774 / 1 000 | 0.0812 – 0.4334 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.77: lo 0.0771-0.165, hi 0.258-0.522` |
| `ftg/BIG_CITY/outline.roadRatio/all` | 701 / 1 000 | 0.9707 – 1.628 | p10 x 0.9; p90 x 1.1 | flagged | `S-V12-1 edge noise 0.70: lo 0.951-1.05, hi 1.35-1.8` |

### 13.4 The checks re-run on the 491-row candidate

`cross_check.py` C1–C10 PASS, ACCEPTED (491 rows, 10 526 strings, 0 numbers with six consecutive digits, scan 0 hits;
whole text 140 hits, the 70 number runs per list of section 11, none other). The twin's C10 now reads each string value
and each distinct key on its own (D19, F7): before that change the first round-3 run was refused on C3 and C10 — the
draw notes' recording dates formed a 3-gram run on both lists (D20) and one run spanned two strings (F7); both are
gone. `--fixtures` 46 / 46 (the 41 of the landing and round 3's five); `--kind ng-faces` ACCEPTED (20 hoods, 374 faces);
`--kind denylist` ACCEPTED (24 227 888 bytes, 1 274 853 strings, 0 hits); `--tv12-28`: `ng-faces.json` 0,
`baselines.json` 70 number runs per list whole-text (exit 1; the D13 pass and the whole-text fail of section 3).
`rows.py --check` SAME, SAME (candidate `784e2373…`, this record's JSON `2ca99a4a…`); `rows.py --red` 5 / 5 caught;
`bands.py --selftest` 12 / 12; `plan.py --check` SAME, SAME and `--catalogue-check` exit 0.

### 13.5 Independent recomputation and the measuring tools' receipts (CONFIRMED, executed)

* A second implementation (own code; it imports none of `rows.py`, `bands.py`, `spike_bootstrap.py` or
  `measure_mfcg.py`) recomputed from E05's per-slot values, the registry's floors and the declared stream: the FTG
  test's flip counts on all 13 rows equal (262, 752, 0, 620, 724, 763; 353, 0, 205, 792, 12, 774, 701), the same 10
  flagged, the lo intervals equal the markers; the four recorded draw rows from E07's census and the four
  `draw.widthPx` rows from each SVG's outer scale (its own pattern) equal the candidate's p10 / p50 / p90.
* `measure_mfcg.py --check` (W-07's fixture run) and `--plan` (W-07b) after the `--plan-widths` extension: both JSON
  outputs byte-identical to `E07-mfcg-signature.json` and `E07-mfcg-signature.plan.json` (16 s and 39 s), so the
  extension moved neither; `--check --red` and `--plan --red` turn their planted checks red (2 and 3), exit 1.

### 13.6 CONFIRMED versus PLAUSIBLE (round 3)

**CONFIRMED (executed):** every count, hash and value in this section; the rename and the block installed with
`--check` SAME and the catalogue check passing; the 13 appended rows and their receipts; the 60 markers (50 equal to
appendix A, 10 by R-50 (4)'s draws, each recomputed independently); C1–C10, the kinds, the fixtures and T-V12-28's two
readings; the reproductions of W-07 and W-07b. **PLAUSIBLE (reasoning):** that the draw style is size-invariant enough
for one recorded family to serve every setting (E07 section 7's twelve recordings over sizes 24–80, water on and off,
with one non-round join each; DC-40's sentence makes the reading explicit); that the 4.8 m pier default is the plank
width a plain export would draw (no plain export draws one); that no reader needs the stability marker before M1's
parity report (R-50's own PLAUSIBLE line).

The round-3 content checks (`doc_checks.py --doc … --heads docs/ARCHITECTURE.md` on this record, E07 and E17, and on
the four digest entries; the scanner's twin with no allow file on the entries) are receipts in
`results/round3-apply.json`. `df -h /`: 11 GiB free at the start and the end; `memory_pressure` 73 % free at the start.
