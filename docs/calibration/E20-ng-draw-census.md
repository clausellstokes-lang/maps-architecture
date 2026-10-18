# E20 — NG's draw census: caps, hatch, shadows and the roof tone ratio (W-22)

Lane `m1/W-22`, 2026-10-03, on the owner's Mac. Research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do
not read it). It carries numbers, metric ids and our own words only: no colour value, style key, canvas key, label text,
identifier, word list or code. The numbers are in `E20-ng-draw-census.json` beside it, written by the tool below; its
`--check` scans both files for every style key, label text and canvas key of the 56 input records.

**Outcome: partial — every value is measured, one half of the row's first check fails as written.** The tool is built
and run on the 44 W-04 recordings, the eight 2026-09-25 records and the four 2026-09-21 records the design's figures come
from. The four members have per-map values on all 44 maps (CONFIRMED, `--check`). Over the 44: **hatch triangles per
gable/hip wing 18.0679** (map means 15.7606–21.0979), **shadow quads per wing 2.2869** (1.9737–2.5369), **square caps on
the street strokes 0.9938** (1 on the 33 maps without a filled street; on each of the 11 `square` maps exactly three
round-capped strokes), **roof tone ratio 0.7985** (map medians 0.7981–0.7986). The row's second check passes: no colour
value in this record or its JSON, and a planted style key is caught. The row's first check passes for the shadow figure
(the eight 2026-09-25 records give 2.3295, which rounds to 2.33) and **fails for the hatch figure (17.5072, which rounds to
17.5, not 17.4)**. The cause is the checker, not the count (F1): §13.5's ≈ 17.4 and 2.33 are one 2026-09-21 map's ratios,
and on those records the census counts exactly the triangles and quads the profile counted. No single wing rule passes
both halves on the 2026-09-25 records. A restatement is proposed in F1 for the plan's owner.

## 1 What was built and run

| file | what it does |
|---|---|
| `research/baselines/ng_draw_census.py` | reads each `draw/gen-N.draw.json` (and `gen-N.paths.json` beside it where one exists), finds the roles at run time, segments the buildings canvas into roof units, and measures the four members plus the receipts; `--check` runs the row's checker and this lane's receipts; `--red` proves two of them go red. Standard library only |
| `docs/calibration/E20-ng-draw-census.json` | per-map values for the 44 (label, template, size, index, capture folder), the 12 template-by-size pools, the three sizes, all 44; the 2026-09-25 and 2026-09-21 records; the declared definitions; the checks |

Run: `python3 research/baselines/ng_draw_census.py --json docs/calibration/E20-ng-draw-census.json --check` (about 45 s on a
shared machine). Inputs: `captures/neighbourhood/ng-programme-m1-2026-10-03/index.json` for the 44 W-04 folders, in plan
order; `captures/neighbourhood/2026-09-25T10-55-{19,36,47,59}/draw/` (gen-0 and gen-1 each); and
`captures/neighbourhood/2026-09-21T05-04-54/draw/` (gen-0 to gen-3, which have no vertex layer). No captured program
bundle was opened, no site was touched, nothing was written into `plat/`, and no git command was run.

**Roles, found at run time per record** (no colour is stored in the tool). The ink is the darkest stroke style by
Rec. 601 luma, the rule `measure_mfcg.py` uses. The buildings canvas holds the most 3-segment ink fills. The shadow style
is the non-ink style with the most 5-segment fills, and its canvas holds the most of them. The street style is the stroke
style, other than ink and shadow, with the most distinct widths.

**The one truncated log.** `ring/large/2` paints 62 405 paths, and the recorder's log stops at 60 000 entries (2 406
dropped). The vertex layer holds every paint in order, with the same style key and canvas size. The 2 405 paints past
the cap were appended from it. The 2 406th dropped entry is the title text, which is not a paint. Segment count equals
vertex count on every logged polygon path the census reads (900 442 of 900 475 overall; the other 33 are one-segment
`rect` squares on pin canvases, outside the 3- and 5-segment classes).

## 2 Definitions (declared; the M-1 twin of §8.3's census, superseded by the product's at M1 by J-V12.1)

* **Roof unit (a wing).** On the buildings canvas, a maximal run of consecutive non-ink fills, with the ink strokes and
  ink triangles that follow it before the next run. Each wing draws one roof unit, whatever its kind. Over the 44 maps
  there are 28 883 units: 27 934 of two fills (gable and hip roofs: the footprint in the roof tone, then the shaded half),
  916 of one fill and 33 of four fills.
* **`draw.hatchPerWing`.** For each two-fill wing, the 3-segment ink fills in its unit, counted per wing. This is §8.3's
  count, with both hatch tapers and the two heavier ridge tapers. The map's value is the mean. The median, p10, p90 (type
  7), the share of wings in 15–20 and n are also kept. Pooled values are sums over sums.
* **`draw.shadowQuadsPerWing`.** The 5-segment fills in the shadow style on the shadow canvas, divided by the wings (all
  roof units: every wing casts one prism shadow). The shadow canvas holds nothing else except tree and pin blobs (17
  segments or more: 1 948 over the 44 maps; other shadow fills 0).
* **`draw.capSquare`.** The square-capped strokes divided by the street-style strokes. The recorder counts the cap of
  every stroke.
* **`draw.roofLumaRatio` (descriptive).** For each two-fill wing, the luma of the second fill divided by the luma of the
  first. The map's value is the median. The mean, p10, p90 and the share below 1 are also kept.
* **Sensitivity columns (not the metric).** The profile's own wing rule (non-ink fills on the buildings canvas ÷ 2) for
  both ratios, and quads per two-fill wing.
* **Digits.** Ratios at four decimals (R-47 (k)); counts are integers.

## 3 The checker column (W-22 row) and this lane's receipts — `ng_draw_census.py --check`

| check | receipt | result |
|---|---|---|
| **row (1a):** the 2026-09-25 draw records reproduce §13.5's ≈ 17.4 within the count's rounding | pooled over the eight records: 17.5072, rounds to 17.5 (map means 17.1732–17.6476; gen-0 only 17.4361; the profile's wing rule 17.4145) | **FAIL** (F1) |
| **row (1b):** the same records reproduce 2.33 | pooled: 2.3295, rounds to 2.33 (maps 2.2489–2.5186; gen-0 only 2.3140; the profile's rule 2.3589; per two-fill wing 2.3941) | PASS |
| provenance: the figures' own records (`2026-09-21T05-04-54`, the profile's §5.4) | the census counts 5 150 / 11 330 / 5 959 / 8 446 triangles and 690 / 1 533 / 765 / 1 136 quads, equal to that table on all four generations. Over the table's 296 wings, gen-0 gives 17.3986 and 2.3311, which round to §13.5's 17.4 and 2.33. The census's own wings there are 302 / 662 / 327 / 510 (two-fill 293 / 657 / 312 / 488), giving 17.3515 / 17.2055 / 18.8718 / 16.9754 and 2.2848 / 2.3157 / 2.3394 / 2.2275 | PASS |
| all 44 recordings measured, in plan order; the truncated log completed | 44 maps, labels equal to the programme index; the paints in the sequence equal the vertex layer's on every map; `ring/large/2` completed with 2 405 paints | PASS |
| the count includes the two ridge tapers | in each two-fill wing, the triangles whose shortest side is at least 1.3 × the map's modal hatch-taper base: exactly two in 33 383 of 33 636 wings (0.9925) over the 52 records with a vertex layer; worst map 0.9601 | PASS |
| attribution: a wing's triangles lie on that wing | the triangle's centroid lies inside the wing's footprint fill for 603 730 of 604 534 triangles (0.9987); worst map 0.9929 | PASS |
| caps as a law | square caps never exceed the street strokes. Round-capped street strokes occur only on the 11 maps with a filled street, and there are exactly three on each | PASS |
| **row (2):** no colour value in the record | this file and the JSON scanned against the 580 style keys, 56 label texts and 917 canvas keys of the inputs, and for colour literals: 0 hits. A copy of this file with one style key appended is caught | PASS |
| red run (`--red`) | the provenance expectation shifted by one triangle, and a style key planted in the scanned text: both FAIL, exit 1 | red as required |

## 4 The values (W-04's 44 maps; per-map values in the JSON)

| pool | maps | wings | two-fill | hatch / wing (mean) | median, p10–p90 | in 15–20 | map means | quads / wing | map range | caps | tone ratio |
|---|---|---|---|---|---|---|---|---|---|---|---|
| area / small | 3 | 770 | 734 | 19.1417 | 18, 14–24 | 0.5300 | 18.9664–19.2727 | 2.2805 | 2.1718–2.3750 | 1 | 0.7985 |
| street / small | 3 | 403 | 386 | 18.1813 | 18, 14–24 | 0.5803 | 17.5429–18.4868 | 2.3821 | 2.2179–2.5276 | 1 | 0.7985 |
| square / small | 3 | 315 | 308 | 17.9286 | 18, 14–22 | 0.5812 | 17.3333–18.5161 | 2.2698 | 2.1647–2.3306 | 0.8902 | 0.7985 |
| ring / small | 3 | 1 405 | 1 323 | 17.7989 | 18, 12–24 | 0.5540 | 17.4158–18.4950 | 2.4733 | 2.4140–2.5028 | 1 | 0.7984 |
| area / medium | 5 | 3 961 | 3 898 | 17.8769 | 18, 12–24 | 0.5454 | 17.2967–19.2611 | 2.2451 | 2.1594–2.3491 | 1 | 0.7985 |
| street / medium | 5 | 1 511 | 1 464 | 17.8839 | 18, 12–24 | 0.5219 | 16.2459–20.7684 | 2.3243 | 2.1959–2.5369 | 1 | 0.7985 |
| square / medium | 5 | 1 609 | 1 558 | 18.8331 | 18, 14–24 | 0.5180 | 17.7000–20.8824 | 2.3306 | 2.2605–2.4690 | 0.9537 | 0.7985 |
| ring / medium | 5 | 5 391 | 5 164 | 18.0143 | 18, 12–24 | 0.5120 | 16.4156–21.0979 | 2.3231 | 2.2341–2.4065 | 1 | 0.7985 |
| area / large | 3 | 3 176 | 3 065 | 17.1204 | 18, 12–22 | 0.5299 | 15.7606–18.0695 | 2.2094 | 2.1051–2.2927 | 1 | 0.7985 |
| street / large | 3 | 2 350 | 2 261 | 17.5595 | 18, 12–22 | 0.5440 | 16.9558–18.5421 | 2.2047 | 2.1473–2.2457 | 1 | 0.7985 |
| square / large | 3 | 3 231 | 3 110 | 17.3961 | 18, 12–22 | 0.5244 | 16.5354–19.8407 | 2.1684 | 1.9737–2.2908 | 0.9864 | 0.7985 |
| ring / large | 3 | 4 761 | 4 663 | 19.3133 | 18, 14–26 | 0.5179 | 17.8534–21.0080 | 2.3657 | 2.3185–2.4176 | 1 | 0.7985 |
| **small** | 12 | 2 893 | 2 751 | 18.2254 | 18, 14–24 | 0.5543 | 17.3333–19.2727 | 2.3871 | 2.1647–2.5276 | 0.9840 | 0.7985 |
| **medium** | 20 | 12 472 | 12 084 | 18.0597 | 18, 12–24 | 0.5247 | 16.2459–21.0979 | 2.2995 | 2.1594–2.5369 | 0.9934 | 0.7985 |
| **large** | 12 | 13 518 | 13 099 | 18.0423 | 18, 12–24 | 0.5268 | 15.7606–21.0080 | 2.2538 | 1.9737–2.4176 | 0.9963 | 0.7985 |
| **all 44** | 44 | 28 883 | 27 934 | 18.0679 | 18, 12–24 | 0.5286 | 15.7606–21.0979 | 2.2869 | 1.9737–2.5369 | 0.9938 | 0.7985 |
| 2026-09-25 (8 records) | 8 | 5 860 | 5 702 | 17.5072 | 18, 12–22 | 0.5663 | 17.1732–17.6476 | 2.3295 | 2.2489–2.5186 | 0.9943 | 0.7985 |
| 2026-09-21 source (4) | 4 | 1 801 | 1 750 | 17.4629 | 18, 12–22 | 0.5394 | 16.9754–18.8718 | 2.2898 | 2.2275–2.3394 | 1 | 0.7985 |

The caps column pools strokes. Per map, the cap share is 1 on the 33 maps without a filled street and 0.8636–0.9864 on
the 11 `square` maps. On each `square` map exactly three street strokes are round-capped: the street drawn round its
filled place. The tone ratio pools wings: over the 44 maps the median is 0.7985, with p10 0.7955, p90 0.8011 and mean
0.8006. Up to 3 % of two-fill units per map (0 to 2.86 %) are not lit-then-shaded, which is why the median is the map value.
Ninety ink fills on the buildings canvas over the 44 maps have other than 3 segments (16 maps), and they are not counted.
They sit on the few one- and four-fill roofs. Every other ink fill there is a triangle.

**Sensitivity (all 44).** The profile's wing rule gives 17.9318 triangles and 2.3210 quads per wing. Quads per two-fill
wing are 2.3646. These are in the JSON per map and per pool.

**Descriptive receipt (not a row): the roof tone ratio per colour channel.** The pooled channel means over the 44 maps
are 0.7891 / 0.8031 / 0.8347, and the medians are 0.7869 / 0.8000 / 0.8333. On the profile's own record (2026-09-21 gen-1,
657 wings) the means are 0.7867 / 0.8009 / 0.8332, against §13.5's 0.787 / 0.802 / 0.834 (the profile's 0.7873 / 0.8015 /
0.8336 "over 658 cleanly-paired wings"; its pairing filter is not stated). Every difference is 0.0006 or less. These are
ratios of the reference's tones, as §13.5 says; they are descriptive, and the law is tested on our palette (§8.3).

## 5 Findings

* **F1 (plan: W-22's checker; the plan's owner to rule).** The row's check "the 2026-09-25 draw records reproduce §13.5's
  ≈ 17.4 and 2.33 within the count's rounding" names the wrong records and a tolerance the sample cannot meet:
  1. Both figures are the 2026-09-21T05-04-54 gen-0 record's ratios (`research/findings/profile-neighbourhood.md` §5.4):
     5 150 triangles and 690 quads over 296 wings. The census reproduces both counts exactly, and the other three
     generations' counts too (§3).
  2. The profile's 296 wings come from a rule it states as "non-dark fills ÷ 2", but that rule gives 299 on the same
     record. The census's units give 302 (293 of two fills). The figure's denominator therefore cannot be reproduced to
     its last digit by any stated rule.
  3. The 2026-09-25 records are other maps. Their per-map hatch means span 17.17–17.65 and their quads 2.25–2.52, wider
     than the figures' rounding.
  4. No single wing rule passes both halves on those records. The census's rule gives 17.5072 and 2.3295 (hatch fails).
     The profile's rule gives 17.4145 and 2.3589 (quads fail). The two-fill denominator for both gives 17.5072 and 2.3941
     (both fail). Gen-0 alone gives 17.4361 and 2.3140 (quads fail).

  Proposed restatement: "the census counts the triangles and quads of the profile's §5.4 table exactly on the
  2026-09-21T05-04-54 records (5 150 / 11 330 / 5 959 / 8 446; 690 / 1 533 / 765 / 1 136), and gen-0 over that table's 296
  wings gives 17.4 and 2.33; on the 2026-09-25 records the pooled values lie within ± 1 % of 17.4 and 2.33". Both clauses
  pass today: the provenance check above, and +0.62 % and −0.02 %. Until that ruling this item stays partial.
* **F2 (design: §8.3's `hatched` census row, T-V1-26 (a), §13.5's band column).** NG's own drawing does not keep 15–20
  triangles on every wing. Over the 44 maps its gable/hip wings have a median of 18, p10 12 and p90 24, and only 52.86 %
  fall in 15–20. Map means span 15.76–21.10, with 4 of 44 maps outside 15–20 and 20 of 44 outside T-V1-26's "mean 17–19".
  So "15–20 hatch triangles per wing" can stand only as a bound on the mean per map, and "mean 17–19" is narrower than the
  reference's own spread at M-1's sample. The pooled mean moves with template and size by up to about 2 (ring / large
  19.31 against area / large 17.12). The band is W-15's to form by the band rule from these per-map values. The wording of §8.3's
  row and T-V1-26 is the design seat's.
* **F3 (row form: W-15).** §13.5's "NG square caps" holds as a law on open streets. Every street stroke is square-capped
  except exactly three on each map with a filled street (11 of 11 `square` maps), so the plain share is 1 on 33 maps and
  0.8636–0.9864 on the other 11. A target row should state the open-street law (1 by construction) with the filled
  street's three strokes as its declared exception, or carry the template split. A pooled 0.9938 would read as a defect
  rate, which it is not.
* **F4 (history, research findings).** The profile's §5.4 prints gen-3's hatch ratio as 17.1 where its own counts give
  17.17 (8 446 / 492, which rounds to 17.2). The findings file is history and is not edited; this is recorded so nobody
  re-finds it.

## 6 Calls made under delegated authority (vetoable)

1. **Wing = roof unit; the hatch per two-fill wing; the quads over all wings.** §8.3 and T-V1-26 count gable and hip
   wings, and hatch flat, pyramid, cone and dome wings by their own rule. A shadow is cast per wing, whatever its roof.
   *Alternative:* the profile's "non-ink fills ÷ 2" for both. It halves one-fill roofs and doubles four-fill ones, and
   gives 17.9318 / 2.3210 over the 44. *Effect:* −0.75 % hatch and +1.5 % quads against the chosen rule.
2. **Map values: the mean for hatch** (the figure is a mean per wing), **the median for the tone ratio** (robust to the
   up to 3 % of units per map that are not lit-then-shaded).
3. **The checker read literally.** "The 2026-09-25 draw records" is read as all eight (gen-0 and gen-1 of the four
   captures), pooled. "Within the count's rounding" is read as the figures' own decimals (one for 17.4, two for 2.33). The
   item is reported partial on that reading rather than passed on a looser one.
4. **The vertex layer is read as part of the draw records.** It is used for the truncated log's tail and for the two
   geometric receipts (ridge tapers, attribution), never for a metric value that the log itself holds.
5. **The 2026-09-21 records are measured as provenance only.** They are not in any pool of the 44, and their values do
   not become rows.

## 7 Hand-offs

* **W-15:** per-map values for the four members on the 44 maps are in `plan.maps` of the JSON, with label, template, size
  and index. Roles: `draw.capSquare`, `draw.hatchPerWing` and `draw.shadowQuadsPerWing` are targets (`hatched`), and
  `draw.roofLumaRatio` is descriptive. Ratios are at four decimals. The rows, estimators and bands are W-15's (R-47 (a)).
  F2 and F3 bear on the band and the cap row.
* **W-01b:** `metrics.m-1.json` holds the `draw.*` family but not yet the four NG member ids, and `plan.py`'s item table
  maps `draw.*` to MFCG (D28, W-07) only. The NG mapping (D34, W-22: three targets, the tone ratio descriptive) belongs
  in W-01b's registration of "the draw members (R-23)". This lane did not touch either file.
* **The plan's owner:** F1's restatement of the row's first check.

## 8 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every number in sections 3 and 4, from `ng_draw_census.py` on the draw records; the exact count
reproduction on the 2026-09-21 records; the completion of the truncated log; the ridge-taper and attribution receipts; the
cap counts; the colour scan with its planted control; the red run; the doc_checks run on this record (§9). PLAUSIBLE
(reasoning only): that the one-fill units are the stone wings and single-face roofs and the four-fill units the pyramid
roofs (a reading of our own findings text, not of the code); that the three round-capped strokes on each `square` map are
the strokes round the filled place; that F1's restatement is what the plan's writer intended.

## 9 Self-check

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E20-ng-draw-census.md --heads docs/ARCHITECTURE.md`
(21:36–21:40, before this section was written): C1 0, C2 0 (0 colours), C4 0, S1 0, S2 0; C3 36 hits, 35 unreviewed. All 35
were read: capture folder names and dates, digit runs, two short phrases quoted from our own findings file, and plain
phrases of this record. None is a reference word list, palette, grammar or identifier. That is exit 1 by the C3 count. The
record is outside the design set, so no allow rows are added (W-10's and W-11's practice). The re-run after this section
is in the result file. `plan.py --check` refuses with the catalogue mismatch that the 21:03 note in the lane log records
(W-01b's to clear). `plan.json` and `metrics.m-1.json` still hash `524830f5…` and `7a21bb29…`, the closing check's values;
this lane wrote neither.
