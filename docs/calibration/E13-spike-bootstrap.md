# E13 — spike S-V12-1: bootstrapping the MFCG target bands (W-13)

Lane `m1/W-13`, 2026-10-04 03:08 – 03:35 EDT, on the owner's Mac. This is a research-side record (`plat/CLEAN-ROOM.md`
rule 2: implementer seats do not read it). It carries numbers, metric ids and our own words only: no place name, colour
value, identifier, word list or code. The numbers are in `E13-spike-bootstrap.json` beside it (sha256 `546521ef…`),
written by the tool below. **They are a test of the bands, not rows:** W-15 is the sole writer of `rows.py` and
`bands.py` and forms the rows and bands (R-47 (a)).

**Outcome.**

* **The pre-decided rule fires** (CONFIRMED, executed). 49 of the 72 band-rule MFCG target rows (68.1 %) flip in more
  than 5 % of the 1 000 draws. The rule fires above 10 %. Per rung the count is 18 of 24 at TOWN, 16 of 24 at CITY and 15
  of 24 at METROPOLIS. By V12 §8.3 (1) and the W-13 row, MFCG goes to 20 seeds per size. That is an owner step: plan §5 (3),
  + 30 MFCG loads and + 60 downloads, **not approved**. This seat loaded nothing, stops here and reports.
* **The checker column passes.** C1, the row's own check ("the resample is seeded and reproducible"), passes twice: two
  computations in one process are identical, and a separate process re-computes the JSON byte for byte. The lane's checks
  C2–C6 pass too, and the red run turns all six red.
* **The verdict does not depend on this seat's readings.** With the two fixed-band rows per rung counted in, 50 of 78
  rows are unstable (64.1 %). With candidates at ± 5 % of the band's width, 67 of 72 are (93.1 %). The 5 % draw threshold
  sits in an empty gap: the most-flipping stable row flips in 2.7 % of draws, the least-flipping unstable row in 13.8 %.
* **F2 (major; for the rulings seat, and for the owner before the §5 (3) step).** A model (PLAUSIBLE, section 7) projects
  that 20 seeds per size would not bring the share under 10 %. It gives 73.6 % at 20 seeds, 69.4 % at 40 and 52.8 % at
  100, against 77.8 % for its own control at 10 seeds (the measured value is 68.1 %). The cause is structural (CONFIRMED by
  the table and by arithmetic). For a widely spread metric, the band's edge is p10 × 0.9 or p90 × 1.1. At ten seeds that
  edge rests on the two outermost seeds, so it moves by more than 5 % whenever a draw repeats an outer seed. The fallback
  as pre-decided cannot meet the test as pre-decided. Re-deciding either is not this seat's call.

## 1 What was built and run

| file | what |
|---|---|
| `research/baselines/spike_bootstrap.py` (new, our own code, standard library only; sha256 `654a47d7…`) | reads E07's and E09's per-seed values and the registry twin; forms each target row's band by V12 §3.5.1–§3.5.2; draws, recomputes, counts the flips; applies the row's outcome rule; the projection of section 7; the checks C1–C6, `--verify`, `--red`. It imports `measure_mfcg.py` (V12 §3.5.1's `estimate`, E07's key paths; sha256 `f907f200…`) and `derived_graph.py` (E09's key paths; `6eccbc9b…`) unchanged |

**Inputs** (read only; their sha256 are written into the JSON): `E07-mfcg-signature.plan.json` (`0592b85f…`, W-07b),
`E09-mfcg-derived-graph.json` (`512e682c…`) and `E09-mfcg-derived-graph.seeds.json` (`9f23b5fb…`, W-09), and
`research/baselines/metrics.m-1.json` (`8a0efa7e…`: each metric's role, sign, floor and kind). No capture was opened, no
site touched, nothing written under `plat/`, and `plan.json` and `metrics.m-1.json` were not written.

| run | command (project root) | result |
|---|---|---|
| final | `python3 research/baselines/spike_bootstrap.py` (nice 10) | writes `docs/calibration/E13-spike-bootstrap.json`; 6 of 6 checks PASS, exit 0 |
| separate-process reproduction | `… --verify docs/calibration/E13-spike-bootstrap.json` | byte-identical: sha256 `546521ef…` both, 6 of 6 PASS, exit 0 |
| red | `… --red` (writes nothing) | 6 of 6 FAIL, exit 1 (section 4) |

Python 3.9.6. No timing was taken or claimed.

## 2 The method — V12 §8.3 (1) as built

V12 §8.3 (1) says: bootstrap the ten MFCG seeds per size (draw ten with replacement 1 000 times), recompute each target
band, and count how often a fixed candidate value's verdict flips. The W-13 row places the candidates on each band's edges
± 5 %. Where neither text fixes a step, the tool decides it as below. Each such decision is listed again in section 8 as a
call under J122, vetoable.

1. **Rows.** A row is every MFCG metric to which the registry gives role `target` with work item W-07b or W-09, on each of
   the three plain families: TOWN (size 40), CITY (80) and METROPOLIS (130). A vector metric gives one row per field, in
   N-25's form (`bldg.wallAlign.median/<rung>/<field>`). That makes 26 rows per rung and 78 in all. The stress family is
   descriptive by the plan and stays out.
2. **Band column.** Two of the 26 have a fixed band in ARCHITECTURE §13.5, not the band rule: `gate.count` ("main gates
   = N exact", N by §4.2 S3 (4)'s law) and `market.adjacent` ("adjacent markets 0"). No reference sample sets their band.
   They are bootstrapped like the others and printed, but kept out of the outcome's denominator, so **72 band-rule
   target rows** are counted. A companion outcome counts all 78.
3. **The band** (V12 §3.5.1–§3.5.2). The ten per-seed values give the estimate by `measure_mfcg.estimate`: at n = 10,
   a = p10 and b = p90 by type 7, and c = the median. Every row here has sign `positive`, so lo = min(0.9 a, 0.85 c,
   c − floor) and hi = max(1.1 b, 1.15 c, c + floor). The floor is the registry's `absFloor`: a fixed value, or
   `relToReferenceMedian` × |c| for the densities and areas, recomputed with c in every draw. The tool also implements
   the `any` branch, w = max(b − a, floor), but no row here uses it.
4. **Candidates.** There are four fixed values per row, taken from the full sample's band: lo − 5 % |lo|, lo + 5 % |lo|,
   hi − 5 % |hi| and hi + 5 % |hi|. On the full sample their verdicts are fail, pass, pass, fail (check C5). An edge at
   exactly 0 would take 5 % of the band's width instead; no edge is 0. The companion reading puts the candidates at ± 5 %
   of the band's width at both edges.
5. **Draws.** Each family gets 1 000 draws of n = 10 seed indices, taken with replacement from its ten usable seeds. One
   index vector per draw serves every row of the family, so a draw resamples whole seeds and keeps the metrics' joint
   variation. The stream is declared as `random.Random(int(sha256('S-V12-1|<family>')[:16], 16))`: ten `randrange(10)`
   calls per draw, draws in order. Each family's draw matrix is digested in the JSON. In each draw, every band is
   recomputed by step 3's rule, estimator included.
6. **Flips and the outcome.** A candidate flips in a draw when its verdict under the draw's band differs from its
   full-sample verdict. A row flips in a draw when any of its four candidates flips. **A row is unstable when it flips in
   more than 5 % of the draws (more than 50 of 1 000). The outcome fires when more than 10 % of the target rows are
   unstable** (the row's words: "> 10 % of target rows flipping in > 5 % of draws → 20 seeds per size, an owner step,
   section 5 (3)").
7. **The projection** (section 7) is a model, not a measurement, kept apart from the outcome.

## 3 The sample

| family (rung) | usable seeds | failed (carried, never drawn) |
|---|---|---|
| `capture/MFCG/40/plain` (TOWN) | 10: indices [0, 10) | none |
| `capture/MFCG/80/plain` (CITY) | 10: indices [0, 10) | none |
| `capture/MFCG/130/plain` (METROPOLIS) | 10: indices [0, 11) less index 8 (R-13's extension) | index 8, `no-export` |

E07's and E09's usable lists are identical per family (check C2). The values are the records' own per-seed values:
`E07-mfcg-signature.plan.json` `perSeed` and `E09-mfcg-derived-graph.seeds.json` `perSeed`, read at the key path each
record's summary uses.

## 4 The checker column (W-13 row) and the lane's checks

| check | result |
|---|---|
| **C1 — the resample is seeded and reproducible (the row's checker)** | **PASS.** Two computations from fresh streams in one process are identical: core sha256 `0b643404…` both times. The draw digests are `d557a176…` (TOWN), `2fe0766f…` (CITY) and `8541437c…` (METROPOLIS). A separate process (`--verify`) re-computes the whole JSON byte for byte (sha256 `546521ef…` both). The projection's streams are seeded too, so they are inside both comparisons |
| C2 — E07's and E09's usable seeds agree per family; n = 10; no failed seed among them | PASS: 10 / 10 / 10; `size130-plain-8` carried as failed |
| C3 — each row's full-sample estimator equals its record's stored summary exactly (estimator, n, a, b, c, seeds) | PASS: 78 of 78 (E07's summaries and E09's), so the bands are formed on exactly the values the records summarise |
| C4 — every MFCG target entry at W-07b / W-09 is a row; the others are listed with a reason | PASS: 26 of 26 metric rows (fields counted) × 3 families = 78; 7 entries listed (section 8.1, D4) |
| C5 — on the full-sample band the candidates read fail / pass / pass / fail (both readings) | PASS: 78 rows; the zero-edge fallback was used on none |
| C6 — every row's sample is complete | PASS: 78 rows, a value for each usable seed |
| red run (`--red`): one fault planted per check | 6 of 6 FAIL, exit 1. The plants: C1, TOWN drawn from an unseeded stream in the second computation (core `a72dc6ac…` against `18a23d47…`); C2, a usable seed renamed in E09's list; C3, METROPOLIS `ribbon.share`'s first value moved by 1e-6; C4, the first target row dropped (25 of 26); C5, TOWN `walled.share`'s lo + 5 % verdict flipped; C6, CITY `sgd.tShare`'s last value removed |

## 5 The flip table

Each cell is the share of the 1 000 draws in which that candidate's verdict flipped, in per cent. "Row flips" is the
share of draws in which any of the four flipped. "Unstable" means more than 5 %. The band column names the term that set
each edge (V12 §3.5.2: `p10 x 0.9`, `c x 0.85`, `c - floor`; `p90 x 1.1`, `c x 1.15`, `c + floor`). The fixed-band rows
are printed in brackets and are not counted. The two `market.*` rows are 0 on every seed (E07 §6), so their band is the
floor's ± 0.5 and nothing flips.

#### TOWN (`capture/MFCG/40/plain`, n = 10, type7; draws sha256 `d557a176ace7…`)

| row | c | band [lo, hi] (the terms that set them) | lo − 5 % | lo + 5 % | hi − 5 % | hi + 5 % | row flips | unstable |
|---|---|---|---|---|---|---|---|---|
| `bldg.r4.60` | 0.8543 | [0.7261, 0.9824] (c x 0.85; c x 1.15) | 0.2 | 0.0 | 0.0 | 0.0 | 0.2 % | no |
| `bldg.r4.120` | 0.6374 | [0.5203, 0.7411] (p10 x 0.9; p90 x 1.1) | 25.6 | 6.1 | 1.1 | 0.0 | 32.3 % | **yes** |
| `bldg.r4.250` | 0.4141 | [0.3012, 0.5534] (p10 x 0.9; p90 x 1.1) | 26.5 | 14.5 | 35.1 | 0.0 | 62.0 % | **yes** |
| `bldg.wallAlign.median/b0_40` | 4.369 | [3.369, 5.369] (c - floor; c + floor) | 3.3 | 9.9 | 1.4 | 9.7 | 16.8 % | **yes** |
| `bldg.wallAlign.median/b40_100` | 10.34 | [8.043, 14.21] (p10 x 0.9; p90 x 1.1) | 27.9 | 21.9 | 38.1 | 0.0 | 71.7 % | **yes** |
| `bldg.wallAlign.median/b100_200` | 17.44 | [11.33, 23.18] (p10 x 0.9; p90 x 1.1) | 0.6 | 13.8 | 15.6 | 24.0 | 47.9 % | **yes** |
| `bldg.wallAlign.share15/b0_40` | 0.8775 | [0.7459, 1.014] (c x 0.85; p90 x 1.1) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `bldg.wallAlign.share15/b40_100` | 0.6237 | [0.4893, 0.7884] (p10 x 0.9; p90 x 1.1) | 0.8 | 15.9 | 26.5 | 27.9 | 63.3 % | **yes** |
| `bldg.wallAlign.share15/b100_200` | 0.4439 | [0.3334, 0.6200] (p10 x 0.9; p90 x 1.1) | 24.0 | 39.9 | 17.8 | 27.9 | 78.0 % | **yes** |
| `sgd.tShare` | 0.4415 | [0.3642, 0.5429] (p10 x 0.9; p90 x 1.1) | 0.8 | 17.0 | 8.9 | 0.0 | 26.4 % | **yes** |
| `sgd.deadEnds` | 2.316 | [1.492, 3.006] (p10 x 0.9; p90 x 1.1) | 27.9 | 36.5 | 15.3 | 27.3 | 79.8 % | **yes** |
| `blockc.perHa` | 2.560 | [1.979, 3.020] (p10 x 0.9; p90 x 1.1) | 4.8 | 13.5 | 1.4 | 24.0 | 37.5 % | **yes** |
| `blockc.lotsPer` | 9.000 | [7.200, 10.35] (p10 x 0.9; c x 1.15) | 17.5 | 5.1 | 0.3 | 27.5 | 45.8 % | **yes** |
| `block.courtShare` | 0.8101 | [0.6707, 0.9413] (p10 x 0.9; p90 x 1.1) | 0.5 | 1.3 | 0.8 | 0.0 | 2.4 % | no |
| `walled.share` | 0.9047 | [0.7466, 1.040] (p10 x 0.9; c x 1.15) | 1.0 | 0.1 | 0.2 | 0.0 | 1.2 % | no |
| `ribbon.share` | 0.7726 | [0.5021, 0.9098] (p10 x 0.9; p90 x 1.1) | 2.5 | 14.8 | 3.8 | 0.0 | 20.2 % | **yes** |
| `district.area` | 8.856 | [5.689, 12.54] (p10 x 0.9; p90 x 1.1) | 0.6 | 15.1 | 14.2 | 26.5 | 49.5 % | **yes** |
| `plaza.area` | 0.3769 | [0.1529, 0.6291] (p10 x 0.9; p90 x 1.1) | 27.8 | 37.5 | 36.7 | 26.7 | 88.1 % | **yes** |
| `castle.area` | 2.381 | [0.8534, 3.141] (p10 x 0.9; p90 x 1.1) | 27.8 | 37.4 | 37.6 | 27.0 | 87.9 % | **yes** |
| `castle.compact` | 0.7661 | [0.6512, 0.8811] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `wall.nodeSpacing` | 90.36 | [74.61, 111.6] (p10 x 0.9; p90 x 1.1) | 0.6 | 8.7 | 14.1 | 0.0 | 23.0 % | **yes** |
| `quarter.count` | 8.500 | [6.300, 11.11] (p10 x 0.9; p90 x 1.1) | 0.7 | 34.6 | 37.1 | 27.9 | 77.8 % | **yes** |
| `wall.towerSpacing` | 97.02 | [79.17, 116.2] (p10 x 0.9; p90 x 1.1) | 0.7 | 5.3 | 6.3 | 26.7 | 36.3 % | **yes** |
| `gate.count` | 5.000 | [4.250, 5.750] (c x 0.85; c x 1.15) | 27.9 | 0.0 | 0.0 | 0.0 | 27.9 % | (yes) fixed band |
| `market.secondary` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `market.adjacent` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | (no) fixed band |

#### CITY (`capture/MFCG/80/plain`, n = 10, type7; draws sha256 `2fe0766ffd42…`)

| row | c | band [lo, hi] (the terms that set them) | lo − 5 % | lo + 5 % | hi − 5 % | hi + 5 % | row flips | unstable |
|---|---|---|---|---|---|---|---|---|
| `bldg.r4.60` | 0.9274 | [0.7883, 1.067] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `bldg.r4.120` | 0.7592 | [0.6454, 0.8731] (c x 0.85; c x 1.15) | 0.1 | 0.0 | 0.0 | 0.0 | 0.1 % | no |
| `bldg.r4.250` | 0.5101 | [0.3868, 0.6055] (p10 x 0.9; p90 x 1.1) | 0.6 | 37.6 | 4.6 | 0.1 | 42.1 % | **yes** |
| `bldg.wallAlign.median/b0_40` | 3.476 | [2.476, 4.476] (c - floor; c + floor) | 28.7 | 27.8 | 9.5 | 28.9 | 64.9 % | **yes** |
| `bldg.wallAlign.median/b40_100` | 7.309 | [5.404, 12.16] (p10 x 0.9; p90 x 1.1) | 0.7 | 32.4 | 28.0 | 27.7 | 71.6 % | **yes** |
| `bldg.wallAlign.median/b100_200` | 12.80 | [10.19, 19.90] (p10 x 0.9; p90 x 1.1) | 25.5 | 35.7 | 37.2 | 0.0 | 75.9 % | **yes** |
| `bldg.wallAlign.share15/b0_40` | 0.8902 | [0.7566, 1.024] (c x 0.85; c x 1.15) | 0.1 | 0.0 | 0.0 | 0.0 | 0.1 % | no |
| `bldg.wallAlign.share15/b40_100` | 0.6827 | [0.5281, 0.8485] (p10 x 0.9; p90 x 1.1) | 0.5 | 37.5 | 4.5 | 0.1 | 41.7 % | **yes** |
| `bldg.wallAlign.share15/b100_200` | 0.5360 | [0.4060, 0.6666] (p10 x 0.9; p90 x 1.1) | 26.6 | 14.9 | 22.0 | 25.5 | 69.0 % | **yes** |
| `sgd.tShare` | 0.4542 | [0.3794, 0.5312] (p10 x 0.9; p90 x 1.1) | 0.6 | 0.5 | 1.6 | 0.0 | 2.7 % | no |
| `sgd.deadEnds` | 1.425 | [1.000, 1.954] (p10 x 0.9; p90 x 1.1) | 0.4 | 38.0 | 37.7 | 27.5 | 80.0 % | **yes** |
| `blockc.perHa` | 2.306 | [1.825, 3.480] (p10 x 0.9; p90 x 1.1) | 0.4 | 4.9 | 37.6 | 0.0 | 41.8 % | **yes** |
| `blockc.lotsPer` | 9.000 | [6.300, 11.00] (p10 x 0.9; p90 x 1.1) | 0.6 | 37.6 | 34.9 | 0.0 | 62.9 % | **yes** |
| `block.courtShare` | 0.8098 | [0.6443, 0.9313] (p10 x 0.9; c x 1.15) | 0.6 | 18.4 | 0.1 | 0.0 | 19.1 % | **yes** |
| `walled.share` | 0.9045 | [0.7689, 1.040] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `ribbon.share` | 0.6231 | [0.4959, 0.7768] (p10 x 0.9; p90 x 1.1) | 0.9 | 14.9 | 35.2 | 0.1 | 48.4 % | **yes** |
| `district.area` | 17.47 | [9.276, 27.84] (p10 x 0.9; p90 x 1.1) | 27.5 | 37.7 | 37.6 | 25.2 | 87.8 % | **yes** |
| `plaza.area` | 0.3282 | [0.1979, 0.4992] (p10 x 0.9; p90 x 1.1) | 22.9 | 39.5 | 19.2 | 26.6 | 80.6 % | **yes** |
| `castle.area` | 3.508 | [1.869, 6.666] (p10 x 0.9; p90 x 1.1) | 27.0 | 48.5 | 40.3 | 26.6 | 91.3 % | **yes** |
| `castle.compact` | 0.7604 | [0.6463, 0.8948] (c x 0.85; p90 x 1.1) | 0.0 | 0.9 | 0.0 | 0.0 | 0.9 % | no |
| `wall.nodeSpacing` | 130.9 | [109.9, 152.9] (p10 x 0.9; p90 x 1.1) | 1.0 | 0.2 | 1.8 | 0.0 | 2.7 % | no |
| `quarter.count` | 12.50 | [9.810, 16.50] (p10 x 0.9; p90 x 1.1) | 25.2 | 31.5 | 36.9 | 0.0 | 76.1 % | **yes** |
| `wall.towerSpacing` | 145.9 | [115.2, 167.8] (p10 x 0.9; c x 1.15) | 0.6 | 38.1 | 0.1 | 0.0 | 38.8 % | **yes** |
| `gate.count` | 8.000 | [6.800, 9.200] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | (no) fixed band |
| `market.secondary` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `market.adjacent` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | (no) fixed band |

#### METROPOLIS (`capture/MFCG/130/plain`, n = 10, type7; draws sha256 `8541437c5548…`)

| row | c | band [lo, hi] (the terms that set them) | lo − 5 % | lo + 5 % | hi − 5 % | hi + 5 % | row flips | unstable |
|---|---|---|---|---|---|---|---|---|
| `bldg.r4.60` | 0.9548 | [0.8116, 1.098] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `bldg.r4.120` | 0.8294 | [0.7050, 0.9538] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `bldg.r4.250` | 0.5858 | [0.4979, 0.6877] (c x 0.85; p90 x 1.1) | 0.0 | 0.7 | 0.4 | 0.1 | 1.1 % | no |
| `bldg.wallAlign.median/b0_40` | 3.000 | [1.975, 4.000] (p10 x 0.9; c + floor) | 25.7 | 7.9 | 3.0 | 27.0 | 49.5 % | **yes** |
| `bldg.wallAlign.median/b40_100` | 6.053 | [4.853, 7.868] (p10 x 0.9; p90 x 1.1) | 25.7 | 7.2 | 25.0 | 26.8 | 67.3 % | **yes** |
| `bldg.wallAlign.median/b100_200` | 12.09 | [7.105, 14.66] (p10 x 0.9; p90 x 1.1) | 25.3 | 36.9 | 10.6 | 26.8 | 74.7 % | **yes** |
| `bldg.wallAlign.share15/b0_40` | 0.9309 | [0.7913, 1.071] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `bldg.wallAlign.share15/b40_100` | 0.7624 | [0.6121, 0.8768] (p10 x 0.9; c x 1.15) | 0.6 | 32.0 | 0.1 | 25.3 | 48.7 % | **yes** |
| `bldg.wallAlign.share15/b100_200` | 0.5677 | [0.4648, 0.7567] (p10 x 0.9; p90 x 1.1) | 26.8 | 14.3 | 36.9 | 25.3 | 76.9 % | **yes** |
| `sgd.tShare` | 0.4573 | [0.3887, 0.5259] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `sgd.deadEnds` | 0.9570 | [0.7167, 1.218] (p10 x 0.9; p90 x 1.1) | 0.6 | 12.9 | 15.3 | 24.6 | 46.6 % | **yes** |
| `blockc.perHa` | 2.531 | [2.152, 3.092] (c x 0.85; p90 x 1.1) | 0.2 | 1.0 | 12.6 | 0.0 | 13.8 % | **yes** |
| `blockc.lotsPer` | 9.000 | [7.650, 11.00] (c x 0.85; p90 x 1.1) | 27.0 | 1.9 | 39.3 | 0.0 | 56.0 % | **yes** |
| `block.courtShare` | 0.8143 | [0.6921, 0.9364] (c x 0.85; c x 1.15) | 0.0 | 0.1 | 0.0 | 0.1 | 0.1 % | no |
| `walled.share` | 0.9235 | [0.7850, 1.062] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `ribbon.share` | 0.5315 | [0.3953, 0.6155] (p10 x 0.9; p90 x 1.1) | 0.4 | 37.8 | 0.6 | 28.0 | 53.6 % | **yes** |
| `district.area` | 30.39 | [19.40, 39.84] (p10 x 0.9; p90 x 1.1) | 25.3 | 37.1 | 38.1 | 27.5 | 86.0 % | **yes** |
| `plaza.area` | 0.3589 | [0.1652, 0.6935] (p10 x 0.9; p90 x 1.1) | 25.2 | 37.7 | 37.3 | 28.9 | 89.3 % | **yes** |
| `castle.area` | 3.832 | [0.6430, 7.144] (p10 x 0.9; p90 x 1.1) | 28.9 | 37.3 | 38.1 | 27.0 | 89.0 % | **yes** |
| `castle.compact` | 0.7523 | [0.6395, 0.8652] (c x 0.85; c x 1.15) | 0.0 | 0.1 | 0.0 | 0.1 | 0.1 % | no |
| `wall.nodeSpacing` | 157.4 | [128.8, 189.3] (p10 x 0.9; p90 x 1.1) | 0.7 | 10.3 | 11.7 | 27.0 | 43.1 % | **yes** |
| `quarter.count` | 16.00 | [11.52, 21.01] (p10 x 0.9; p90 x 1.1) | 27.5 | 38.1 | 23.4 | 0.0 | 73.8 % | **yes** |
| `wall.towerSpacing` | 175.8 | [145.3, 238.1] (p10 x 0.9; p90 x 1.1) | 25.2 | 5.0 | 36.6 | 0.1 | 54.7 % | **yes** |
| `gate.count` | 12.00 | [10.20, 13.80] (c x 0.85; c x 1.15) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | (no) fixed band |
| `market.secondary` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | no |
| `market.adjacent` | 0 | [-0.5000, 0.5000] (c - floor; c + floor) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 % | (no) fixed band |

## 6 The outcome, by the row's rule

| reading | target rows | unstable (flip in > 5 % of draws) | share | TOWN / CITY / METROPOLIS | > 10 %? |
|---|---|---|---|---|---|
| **the rule as stated (band-rule rows; candidates at the edges ± 5 %)** | **72** | **49** | **68.1 %** | 18 / 16 / 15 of 24 each | **fires** |
| companion: the fixed-band rows counted in | 78 | 50 | 64.1 % | 19 / 16 / 15 of 26 each | fires |
| companion: candidates at ± 5 % of the band width | 72 | 67 | 93.1 % | 23 / 22 / 22 of 24 each | fires |

**The pre-decided outcome:** above 10 % of target rows flipping in over 5 % of draws, MFCG goes to 20 seeds per size,
which is an owner step (plan §5 (3): + 30 MFCG loads and + 60 downloads, one load per seed, the method of plan §2.2). It is
**not approved**, so the seat stops and reports. FTG's rows stay as §13.5 classes them (V12 §8.3 (1)). The seven
excluded entries (section 8.1, D4) cannot undo the outcome. Even if all of them were added as stable rows — 6 rows for
W-08's two metrics and at most 24 more — 49 unstable rows out of at most 102 is still above 10 %.

**The stable band-rule rows (23).** Four rows are stable at every rung: `bldg.r4.60`,
`bldg.wallAlign.share15/b0_40`, `walled.share` and `castle.compact`. The others are `bldg.r4.120` at CITY and
METROPOLIS, `bldg.r4.250` at METROPOLIS, `sgd.tShare` at CITY and METROPOLIS, `block.courtShare` at TOWN and METROPOLIS,
`wall.nodeSpacing` at CITY, and `market.secondary` at every rung. Every other band-rule row is unstable (the JSON's
`outcome.unstable` lists all 49).

## 7 Why the rows flip, and what 20 seeds would buy

**The pattern** (CONFIRMED from the table):

* 47 of the 49 unstable rows have at least one edge set by a spread term (p10 × 0.9 or p90 × 1.1).
* 16 of the 23 stable rows have both edges set by the centre or floor terms (c × 0.85, c × 1.15, c ± floor). The median of
  ten seeds moves little under resampling. The p10 and p90 of ten seeds do not.
* The outer candidates (lo − 5 %, hi + 5 %) flip either rarely or in about a quarter of the draws. Of the 144 outer
  candidates, 90 flip in under 10 % of draws and 52 in 24–30 %.
* The arithmetic explains it. Type 7's p10 at n = 10 is 0.1 s₍₁₎ + 0.9 s₍₂₎, which rests on the two lowest seeds. A draw
  of ten that repeats the lowest seed (probability 1 − 0.9¹⁰ − 0.9⁹ = 0.264) puts that seed's value in s₍₂₎ and moves the
  edge down by most of the gap to the next seed. The same holds for p90 at the top. Wherever the two outermost seeds lie
  more than about 5 % apart, the outer candidate flips in about 26 % of draws.
* The inner candidates flip when a draw leaves out an outer seed (probability 0.9¹⁰ = 0.349 for any one seed). For the most dispersed metrics that happens in 35–40 %
  of draws: castle area (p10–p90 0.71–6.49 ha at METROPOLIS), plaza area, district area, the dead-end density and the quarter
  count.

**The projection (a model, PLAUSIBLE).** It asks what flip rates a reference sample of m seeds would show under the same
test. The population is modelled as the ten measured values smoothed by a Gaussian kernel (Silverman's bandwidth, 1.06 sd
n^−1/5). Per row, it takes 40 reference samples of m seeds and bootstraps each 250 times, with the same band, candidates
and flip rule. Its streams are seeded (`S-V12-1|<family>|projection|<row id>|<m>`), and it is inside C1's comparisons.

| m seeds per size | unstable band-rule rows (of 72) | share | TOWN / CITY / METROPOLIS (of 24) |
|---|---|---|---|
| 10 (the control; measured: 49, 68.1 %) | 56 | 77.8 % | 21 / 19 / 16 |
| **20 (the pre-decided fallback)** | **53** | **73.6 %** | 19 / 18 / 16 |
| 40 | 50 | 69.4 % | 18 / 17 / 15 |
| 100 | 38 | 52.8 % | 13 / 14 / 11 |

The control classifies 65 of the 72 rows as the measurement does, and it errs toward more instability (the smoothing
removes the ties that keep a few discrete rows still). Under the model, more seeds steady the moderately spread rows. For
example `bldg.r4.120` at TOWN flips 25 % at 20 seeds and 3 % at 100, and `blockc.perHa` at METROPOLIS 20 % and 0.3 %. The
widely spread rows do not steady: `castle.area` at CITY flips 89 % at 20 seeds and 85 % at 100, `plaza.area` at TOWN 87 %
and 84 %. For such a metric, the sampling spread of p10 or p90 stays wider than 5 % of the edge until the sample runs to
hundreds of seeds. So 20 seeds per size would cost the owner's 30 loads and leave the rule firing. This is PLAUSIBLE: the
population is a model built from ten values.

## 8 Decisions and findings

### 8.1 Decisions taken under the delegation (J122; each vetoable; none changes a design cell, a ruling or a row)

* **D1.** A vector metric gives one row per field (N-25's form). So `bldg.wallAlign.median` and `.share15` count three rows
  each per rung.
* **D2.** `gate.count` and `market.adjacent` keep §13.5's fixed band columns. They are printed but stay out of the
  denominator. Counting them in, under the band rule, gives 64.1 %: the outcome is the same.
* **D3.** Only the plain families are used. The stress family is descriptive by the plan.
* **D4.** Seven MFCG target entries have no row here, each for a stated reason:
  * `draw.casingLaw`, `draw.roundJoins`, `draw.widthPx` and `draw.wallsAfterBuildings` (W-07, D28) are measured on the
    draw records of recorded generations, not per seed on the plan's usable seeds per size.
  * `fg.recoverability` and `fg.streetwall` (W-08) are E08's rows, outside this row's inputs, and not landed when this
    ran.
  * `variety.dispersion` (W-15) is one value per rung formed from the vectors over MFCG and FTG (R-40), a target as a
    floor and not a band from per-seed statistics.
  Adding any of them cannot undo the outcome (section 6).
* **D5.** "Edges ± 5 %" is read as ± 5 % of the edge's own magnitude. The other reading, ± 5 % of the band's width, is
  computed beside it and fires more strongly.
* **D6.** A row flips in a draw when any of its four candidates flips. The per-candidate rates are in section 5, so a
  stricter per-candidate reading can be read off the table.
* **D7.** Each draw resamples whole seeds (one index vector per family), not each metric on its own. The stream is the
  sha256 form E07 declared for R4's sample, keyed `S-V12-1|<family>`.
* **D8.** "Over 5 %" and "above 10 %" are strict: more than 50 of 1 000 draws, and more than 7.2 of 72 rows.
* **D9.** The registry's relative floors are recomputed in each draw from that draw's median, since the floor is part of
  the band.
* **D10.** The projection is reported as a model, labelled PLAUSIBLE, and kept out of the outcome.

### 8.2 Findings

* **F1 (the outcome; an owner step).** The rule fires: 49 of 72 (68.1 %) against 10 %. The pre-decided step is 20 MFCG
  seeds per size (plan §5 (3), + 30 loads and + 60 downloads), and it is not approved. Nothing was loaded.
* **F2 (major; for the rulings seat, ahead of the owner's §5 (3) decision).** The fallback cannot satisfy the test it
  answers. Under the model it leaves 53 of 72 rows unstable at 20 seeds, and 38 of 72 even at 100 (section 7). The cause
  is the test's geometry: candidates 5 % from an edge that rests on the outermost two of ten seeds. It is not a defect of
  the sweep. V12 §8.3 (1)'s threshold and remedy are a decided design, so this seat neither re-decides them nor proposes
  a new criterion. It records that, as written, the spike's remedy and its test disagree. The decision on what to do
  (spend the loads anyway, or restate the test or the remedy) belongs to the rulings seat and the owner. The measured
  numbers in section 5 are the evidence for either path.
* **F3 (information for W-15).** Section 5 gives each row's full-sample band and the term that set each edge.
  Band-rule share rows can reach above 1 (for example `walled.share`'s hi of 1.040 to 1.062), because the band rule's
  × 1.15 has no cap for a share. No verdict changes, since ours can never exceed 1. It is noted only so that nobody reads
  it as a measurement error.

## 9 Hand-offs

| reader | reads | from |
|---|---|---|
| the session → the owner | F1: the §5 (3) step (+ 30 MFCG loads, + 60 downloads), with F2 beside it | this record's outcome; `results/W-13.json` |
| the rulings seat (Fable) | F2; the per-row flips, edge terms and projections | sections 5–7; the JSON's `rows[]` (`flips`, `band`, `projection`) |
| W-15 | each row's full-sample band and its flip rate, for the band ruling and the shift record | the JSON's `rows[]` |
| W-08 | nothing to do: its two target rows are outside this test and cannot undo the outcome | section 8.1, D4 |

## 10 CONFIRMED versus PLAUSIBLE

* **CONFIRMED (executed).** Every number in sections 3–6 and the pattern of section 7, from the commands of section 1:
  the final run, the separate-process reproduction and the red run. Also confirmed: the input hashes, the equality of
  every full-sample estimate with its record's summary (C3), and the probability 0.264 (arithmetic). Also confirmed:
  `plan.py --check` gives SAME for `plan.json` and `metrics.m-1.json` after this lane's writes (this lane writes neither).
  The content checks were run on this record, as earlier records did. `doc_checks.py --doc
  docs/calibration/E13-spike-bootstrap.md --heads docs/ARCHITECTURE.md` gives C1, C2, C4, S1 and S2 at 0. Its C3 hits
  were all read: they are the digit runs of section 5's tables, section numbers, and common phrases of our own text. None
  is a reference word list, palette, grammar or identifier. `make_denylist.py scan` on this record and its JSON gives
  TOK, ID, COL, SET, PHR and FILE at 0. Its TRI hits are of the same kinds. The final counts are in `results/W-13.json`.
* **CONFIRMED (read).** V12 §8.3 (1), §3.5.1 and §3.5.2; the W-13 row and plan §5 (3); §13.5's band columns for the
  gates and markets rows; the registry's roles, signs and floors.
* **PLAUSIBLE (reasoning or model).** The projection's numbers at 20, 40 and 100 seeds, and with them F2's claim that
  the fallback leaves the rule firing. The model assumes the population is the ten values smoothed. Its control at ten
  seeds overstates the measured share by about ten points.
