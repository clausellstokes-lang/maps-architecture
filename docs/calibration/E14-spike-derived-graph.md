# E14 — spike S-V12-2: the derived street graph's stability (W-14)

Lane `m1/W-14`, 2026-10-04 03:36 – 03:51 EDT (LANDED at 03:51), on the owner's Mac. This is a research-side record (`plat/CLEAN-ROOM.md`
rule 2: implementer seats do not read it). It carries numbers, metric ids and our own words only: no place name, colour
value, identifier, word list or code. The numbers are in `E14-spike-derived-graph.json` beside it (sha256 `f7bae41d…`),
written by the tool below. **They are measured values and verdicts, not rows:** W-15 is the sole writer of `rows.py`
and forms the rows (R-47 (a)).

**Outcome.**

* **The ruling: every D11 metric stays target at every plain rung** (CONFIRMED, executed). The seed-to-seed CV of
  `sgd.tShare`, `sgd.deadEnds`, `blockc.perHa` and `blockc.lotsPer` over the ten usable seeds is at most 0.2547
  (`sgd.deadEnds` at TOWN) on the three plain families, so the pre-decided rule of V12 §8.3 (2) — CV > 0.3 → descriptive
  by the ⟨M-1⟩ rule — fires on none of the 12 rows. **No descriptive row in C-0116's form and no E19 entry are owed by
  S-V12-2.** The stress family (`capture/MFCG/80/river+coast`, n = 3) is descriptive by the plan whatever its CV; its
  `sgd.deadEnds` CV is 0.3522 and is reported, not ruled. The population form of the CV, the any-family reading and
  `block.courtShare` read under the same rule change no verdict (section 3).
* **The checker column passes.** The row's checker ("reproducible from E09's per-seed file") is C1: the 16 CVs
  recomputed from `E09-mfcg-derived-graph.seeds.json` equal E09's stored summaries exactly. The lane's checks C2–C7 pass
  too, the record re-forms byte for byte in a separate process, and the red run turns all seven red.
* **The bias proxy for M0-c-07a's note** (CONFIRMED on the fixtures; a PROXY, not the raster-against-skeleton bias,
  because no product skeleton exists research-side — T-V12-3 at M1 decides, R-22, R-47 (g)). On the five 2026-09-25
  fixtures, against the declared twin (step 0.5 m, spur 8 m, merge 2 m):
  * `sgd.deadEnds` is set by the spur threshold at first order: at spur 6 m it rises by 107–233 % (×2.1 to ×3.3), at
    spur 10 m it falls by 23–33 %, and at a raster step of 0.25 m it rises by 18–39 %.
  * `sgd.tShare` moves by 4–15 % at step 0.25 m (one fixture −1 %), by 7–17 % at spur 6 m and by less than 1 % at
    spur 10 m.
  * `blockc.perHa` and `blockc.lotsPer` are **exactly invariant** under every variant: the block count and the
    footprints per block come from the union-find and the centroid test, not from the raster (C4).
  * No `sgd.*` value lies within T-V12-3's tolerance (0.5 % or one printed unit) under step 0.25 m or spur 6 m, and
    only `sgd.tShare` at spur 10 m does (3 of 5 fixtures). The face count, planarity and the Euler identities hold on
    all 20 variant-fixture graphs (C5): the twin's topology is robust; its dead-end and T-junction counts are not.
* **F1 (major; for the rulings seat's eye and for W-17's digest entry; no ruling owed by the plan).** Under the raster
  twin, the dead-end row counts the thinning's branches longer than the spur threshold, and most of those branches lie
  between 6 and 10 m: on the first fixture the degree-1 nodes number 112 at 6 m, 39 at 8 m and 26 at 10 m. A product
  implementation that differs from the twin by as little as 2 m of spur threshold, or by its raster step, will not meet
  T-V12-3's 0.5 % on `sgd.deadEnds` (and probably not on `sgd.tShare`); plan §9's pre-decided outcome then applies — the
  product's value supersedes with a `baselineShift` at M1 (J-V12.1). The digest entry of R-20 (7) must therefore carry
  the five parameters the row depends on (section 7), so that M0-c-07a derives "like with like" as R-22 asks. This seat
  applies the rule as pre-decided; whether parameter sensitivity should enter it is a new rule, not this spike's.

## 1 What was built and run

| file | what |
|---|---|
| `research/baselines/spike_derived_graph.py` (new, our own code; sha256 `80ee0d36…`) | recomputes the CVs from E09's per-seed file and compares them with E09's summaries; applies the rule per row with the companion readings; measures the five fixtures at the base parameters and at step 0.25 m, spur 6 m and spur 10 m through `derived_graph.measure_seed` (the same code path as its `--fixtures --step / --spur` switches), one cache file per map so a killed run loses at most one map; forms the sensitivity table against T-V12-3's tolerance and the seed-to-seed SD; the checks C1–C7, `--verify`, `--red`. It imports `derived_graph.py` (sha256 `6eccbc9b…`) unchanged, and through it `measure_ftg.py`, `measure_ng.py` and `measure_mfcg.py` |

**Inputs** (read only; their sha256 prefixes are in the JSON): `E09-mfcg-derived-graph.json` (`512e682c…`),
`E09-mfcg-derived-graph.seeds.json` (`9f23b5fb…`) and the five fixtures' `MeasureInput` files under
`research/baselines/inputs/MFCG/itch-12710731/` (their sha256 in each record). No capture bundle was opened, no site
touched, nothing written under `plat/`, and `plan.json` and `metrics.m-1.json` were not written (`plan.py --check` SAME
after the writes: `plan.json` `0fd7aae1`, `metrics.m-1.json` `8a0efa7e`).

Runs, all on 2026-10-04, at nice 19 (the measurements) and nice 10 (the rest); no timing is taken or claimed:

| run | command (project root) | result |
|---|---|---|
| measurement | `python3 research/baselines/spike_derived_graph.py --measure step025 --cache <scratch>` and `… --measure base,spur6,spur10 --cache <scratch>` (two background processes) | 20 records (4 variants × 5 fixtures), exit 0 each |
| record | `… --cache <scratch>` (everything cached: no measurement) | writes `docs/calibration/E14-spike-derived-graph.json`; 7 of 7 checks PASS, exit 0 |
| separate-process reproduction | `… --verify docs/calibration/E14-spike-derived-graph.json` (re-forms the record from its stored measurements and the E09 files, measuring nothing) | byte-identical: sha256 `f7bae41d` both; 7 of 7 PASS, exit 0 |
| red | `… --red --cache <scratch>` (writes nothing) | 7 of 7 FAIL, exit 0 as the red mode defines it; the JSON's sha256 unchanged (section 4) |

Python 3.9.6, PIL 11.3.

## 2 The method — the W-14 row as built

The row asks for the CV of `sgd.*` and `blockc.*` over the usable seeds per size, and the sensitivity to the raster
step (0.5 against 0.25 m) and the spur threshold (8 ± 2 m) on the five fixtures (R-22). Where the row, V12 §8.3 (2) or
R-22 leave a step open, the tool decides it as below; each such decision is listed again in section 8 as a call under
J122, vetoable.

1. **The CV** is the sample SD (n − 1) divided by the mean, E09 D13's declared form, recomputed with `derived_graph.cv_of`
   from the per-seed file over the family's usable seeds (E09 §3's sample). The population form is beside it.
2. **The rule** (V12 §8.3 (2); plan §8 (3); the W-14 row): a metric whose seed-to-seed CV exceeds 0.3 becomes descriptive
   by the ⟨M-1⟩ rule, in C-0116's form, and enters `known-defects.json` through E19; otherwise the row stays target. It is
   applied per row — metric × plain family — because W-15's rows are per rung. Three companion readings are computed
   beside it and checked never to change a ruled verdict: the population CV, the any-family reading (descriptive at every
   rung when any plain family exceeds 0.3), and `block.courtShare` (D5 / D32; a target per class, not a D11 metric) under
   the same limit. The stress family is descriptive by the plan (purpose stress; R-23) and is reported, not ruled.
3. **The variants.** The five fixtures are measured four times: the base (step 0.5 m, spur 8 m, merge 2 m), step 0.25 m
   (spur 8 m), spur 6 m and spur 10 m (step 0.5 m), merge 2 m throughout. Each measurement is `derived_graph.measure_seed`
   in-process, without the R-10 vector (not needed here) and with the court test's per-block rows stripped. The base is
   measured again rather than read from E09, so that the four variants come from one process; its equality with E09's
   stored fixture records is check C3.
4. **The sensitivity** per fixture and metric is the variant's value less the base's, absolute and relative. It is
   summarised per variant and metric by the largest and the median absolute relative change over the five fixtures, by
   the count of fixtures within T-V12-3's tolerance (0.5 % relative or one unit of the last printed digit, whichever is
   larger — E09 §5's digits: 0.001 for the share, 0.01 for the per-km and per-ha counts, 0.1 for the footprints per
   block), and by the largest change in units of the seed-to-seed sample SD of the plain family at the fixture's size
   (TOWN for the size-40 fixtures, CITY for the size-80 one; context only).

## 3 The CV, recomputed from the per-seed file (sample SD ÷ mean; population form and mean beside)

| metric | TOWN (40; n = 10) | CITY (80; n = 10) | METROPOLIS (130; n = 10) | CITY (80, stress; n = 3) |
|---|---|---|---|---|
| `sgd.tShare` | 0.0797 (pop 0.0756; mean 0.4469) | 0.0562 (pop 0.0533; mean 0.4498) | 0.0225 (pop 0.0214; mean 0.4591) | 0.0356 (pop 0.0291; mean 0.4571) |
| `sgd.deadEnds` | 0.2547 (pop 0.2416; mean 2.3297) | 0.1761 (pop 0.1671; mean 1.4435) | 0.1497 (pop 0.1420; mean 0.9581) | 0.3522 (pop 0.2876; mean 1.3945) |
| `blockc.perHa` | 0.1060 (pop 0.1005; mean 2.5093) | 0.1821 (pop 0.1728; mean 2.4496) | 0.0691 (pop 0.0656; mean 2.5754) | 0.0389 (pop 0.0317; mean 2.2910) |
| `blockc.lotsPer` | 0.0776 (pop 0.0736; mean 8.7000) | 0.1250 (pop 0.1186; mean 8.6000) | 0.0624 (pop 0.0592; mean 9.1000) | 0.0619 (pop 0.0505; mean 9.3333) |
| `block.courtShare` (companion) | 0.0562 (pop 0.0533; mean 0.8011) | 0.0682 (pop 0.0647; mean 0.7964) | 0.0306 (pop 0.0290; mean 0.8200) | 0.1039 (pop 0.0849; mean 0.7803) |

All 16 ruled CVs and the 4 companions equal E09's stored summaries exactly (n, mean, sd, cv, sdPop, cvPop), with n = the
usable seeds (10 / 10 / 10 / 3). The largest plain CV is 0.2547; the limit is 0.3. The companion readings: the
population CV changes no verdict (it is always the smaller); the any-family reading fires on no metric (the per-metric
maxima are 0.0797, 0.2547, 0.1821, 0.1250); `block.courtShare` would fire at no plain rung (at most 0.0682).

### 3.1 The verdicts (the ruling; each row's reason is in the JSON's `verdicts`)

| metric | TOWN (40) | CITY (80) | METROPOLIS (130) | CITY (80, stress) |
|---|---|---|---|---|
| `sgd.tShare` | target (CV 0.0797) | target (0.0562) | target (0.0225) | descriptive by the plan (0.0356) |
| `sgd.deadEnds` | target (0.2547) | target (0.1761) | target (0.1497) | descriptive by the plan (0.3522; the rule would fire on it) |
| `blockc.perHa` | target (0.1060) | target (0.1821) | target (0.0691) | descriptive by the plan (0.0389) |
| `blockc.lotsPer` | target (0.0776) | target (0.1250) | target (0.0624) | descriptive by the plan (0.0619) |

12 ruled rows, 12 target, 0 descriptive. W-15 forms the four D11 rows per plain rung as targets by the band rule (V12
§3.5.1–§3.5.2) from E09's values; nothing from this spike enters E19 or `known-defects.json`.

## 4 The checker column (W-14 row) and the lane's checks

| check | result |
|---|---|
| **C1, the row's checker:** reproducible from E09's per-seed file — the seed-to-seed CV of `sgd.*` and `blockc.*` per family, recomputed from the per-seed file over the usable seeds, equals E09's stored summary exactly, n = the usable seeds | 16 of 16 equal: **PASS** |
| C2: every row's status follows from its sample CV by the rule; no companion reading changes a ruled verdict | 12 ruled rows (0 descriptive, 12 target); 4 stress rows descriptive by the plan: **PASS** |
| C3: the base variant equals E09's stored fixture records field for field on 21 keys (the same code at the same parameters: a determinism receipt across lanes) | 5 of 5 fixtures equal: **PASS** |
| C4: `blockc.perHa` and `blockc.lotsPer` identical under every variant | 40 of 40 values equal: **PASS** |
| C5: every variant's graph on every fixture is planar and keeps E09's face-count identity at every stage (Euler numbers equal; raw faces = street-space holes = pruned faces; merged faces = pruned less the collapsed; internal edges ≤ 4 m; 0 chain anomalies) | 20 of 20 variant-fixture graphs hold: **PASS** |
| C6: the sample read from E09 is the plan's (10 usable per plain family, 3 in the stress family, no failed seed among them, the failed indices listed) | 10 / 10 / 10 / 3; failed: `130/plain/8` no-export, `80/river+coast/1` and `/4` retry: **PASS** |
| C7: the table is complete (4 × 5 records at their declared step) and `--verify` re-forms the record byte for byte | 20 of 20 records; byte-identical in a separate process: **PASS** |
| red run | seven plants, one per check: a per-seed value moved by 1e-6 (C1); a ruled row's status flipped (C2); the base's `sgd.deadEnds` moved on one fixture (C3); `blockc.perHa` changed under one variant (C4); a crossing planted on one variant's fixture (C5); a failed seed added to a family's usable list (C6); one variant's fixture record dropped (C7). Result: 7 FAIL; the JSON on disk unchanged (sha256 `f7bae41d` before and after): **PASS** |

## 5 The sensitivity on the five fixtures (the proxy)

### 5.1 Summary per variant (largest and median absolute relative change over the five fixtures; signed change per fixture in the fixtures' order gates0, gates1, gates4, gates9, river-coast; fixtures within T-V12-3's tolerance; the largest change in SD units)

**Step 0.25 m (spur 8 m, merge 2 m)**

| metric | largest | median | signed per fixture | within tolerance | largest in SD units |
|---|---|---|---|---|---|
| `sgd.tShare` | 15.3 % | 5.4 % | −1.3, +15.3, +5.4, +4.0, +7.1 % | 0 of 5 | 1.65 |
| `sgd.deadEnds` | 39.4 % | 23.4 % | +39.4, +17.7, +23.4, +22.1, +33.9 % | 0 of 5 | 1.71 |
| `blockc.perHa` | 0 | 0 | invariant | 5 of 5 | 0 |
| `blockc.lotsPer` | 0 | 0 | invariant | 5 of 5 | 0 |

**Spur 6 m (step 0.5 m, merge 2 m)**

| metric | largest | median | signed per fixture | within tolerance | largest in SD units |
|---|---|---|---|---|---|
| `sgd.tShare` | 17.3 % | 11.7 % | +11.7, +8.0, +17.3, +13.4, +7.1 % | 0 of 5 | 2.04 |
| `sgd.deadEnds` | 232.9 % | 154.2 % | +179.1, +107.3, +144.3, +154.2, +232.9 % | 0 of 5 | 11.75 |
| `blockc.perHa` | 0 | 0 | invariant | 5 of 5 | 0 |
| `blockc.lotsPer` | 0 | 0 | invariant | 5 of 5 | 0 |

**Spur 10 m (step 0.5 m, merge 2 m)**

| metric | largest | median | signed per fixture | within tolerance | largest in SD units |
|---|---|---|---|---|---|
| `sgd.tShare` | 0.8 % | 0.4 % | −0.8, −0.2, +0.4, −0.0, +0.5 % | 3 of 5 | 0.09 |
| `sgd.deadEnds` | 32.9 % | 27.3 % | −32.9, −27.3, −27.9, −23.5, −26.3 % | 0 of 5 | 1.33 |
| `blockc.perHa` | 0 | 0 | invariant | 5 of 5 | 0 |
| `blockc.lotsPer` | 0 | 0 | invariant | 5 of 5 | 0 |

### 5.2 The values per fixture (base | step 0.25 m | spur 6 m | spur 10 m)

| fixture | `sgd.tShare` | `sgd.deadEnds` (per km) | `blockc.perHa` | `blockc.lotsPer` | degree-1 nodes | graph km | faces |
|---|---|---|---|---|---|---|---|
| s555001-size40-gates0 | 0.392 / 0.387 / 0.438 / 0.389 | 2.24 / 3.12 / 6.25 / 1.50 | 1.70 (all) | 8.0 (all) | 39 / 55 / 112 / 26 | 17.41 / 17.61 / 17.91 / 17.29 | 99 (all) |
| s555001-size40-gates1 | 0.384 / 0.442 / 0.414 / 0.383 | 2.46 / 2.90 / 5.10 / 1.79 | 2.68 (all) | 9.0 (all) | 54 / 64 / 114 / 39 | 21.96 / 22.10 / 22.36 / 21.82 | 156 (all) |
| s555001-size40-gates4 | 0.421 / 0.443 / 0.493 / 0.422 | 2.29 / 2.83 / 5.61 / 1.66 | 2.35 (all) | 9.0 (all) | 46 / 57 / 115 / 33 | 20.05 / 20.14 / 20.51 / 19.94 | 137 (all) |
| s555001-size40-gates9 | 0.453 / 0.471 / 0.513 / 0.452 | 3.09 / 3.78 / 7.86 / 2.37 | 1.68 (all) | 11.0 (all) | 54 / 66 / 142 / 41 | 17.47 / 17.48 / 18.07 / 17.33 | 97 (all) |
| s777001-size80-river-coast | 0.429 / 0.459 / 0.459 / 0.431 | 1.28 / 1.72 / 4.27 / 0.95 | 2.08 (all) | 9.0 (all) | 98 / 132 / 333 / 72 | 76.43 / 76.87 / 78.02 / 76.17 | 514 (all) |

The JSON's `sensitivity.table` and `variants` carry every record in full: the degree counts, the T-junction counts
(`tNodes` and `degree3`), the thinning passes (which double at 0.25 m: 72 → 143 on the first fixture, 169 → 338 on the
river-coast one), the raster sizes (about 3.2 M cells per size-40 fixture at 0.5 m and 12.9 M at 0.25 m; 18.1 M and
72.0 M for the river-coast one), the topology at every stage and `block.courtShare` (context: at 0.25 m it moves by at
most 0.017 on two fixtures — one deep block gained or lost at the cell level — and is unchanged on three; the spur
variants cannot touch it).

### 5.3 Reading

* **The face count is invariant** (99 / 156 / 137 / 97 / 514 under every variant), planarity holds everywhere and the
  Euler identities hold at every stage (C5): the twin's topology — its blocks and its faces — does not depend on the step
  or the spur threshold. The merge collapses the same one face of a few cells on three fixtures at 0.5 m; at 0.25 m
  the fourth fixture's raw count is 97 with none collapsed (its small hole is resolved differently), and the final count
  is 97 either way.
* **`sgd.deadEnds` is parameter-dominated.** The degree-1 nodes are the thinning's branches that survive the spur rule,
  and their lengths cluster between 6 and 10 m: lowering the threshold by 2 m multiplies the count by 2.1–3.4, raising
  it by 2 m removes a quarter to a third. In units of the seed-to-seed spread the spur −2 m shift is 6–12 SDs, the
  spur +2 m and step shifts 1.1–1.7 SDs. A dead-end row from this twin is therefore a function of its spur law and step
  as much as of the map.
* **`sgd.tShare` is moderately sensitive downward and to the step** (7–17 % at spur 6 m, 4–15 % at 0.25 m) and almost
  insensitive upward (≤ 0.8 % at spur 10 m): the branches between 8 and 10 m are few, and each removed branch turns a
  degree-3 node into a degree-2 one that dissolves, so the T share hardly moves; the many branches between 6 and 8 m
  add degree-3 nodes whose arms are mostly straight-through, which raises the share.
* **The finer step raises the dead-end count** (+18 to +39 %) although the skeleton is the same object at a finer scale.
  PLAUSIBLE (reasoning only): the spur length is measured on the Douglas-Peucker-simplified line at the raster step, so
  at 0.25 m a branch keeps more of its staircase and measures longer, and fewer branches fall under 8 m; the thinning
  also reaches a little further into each convex corner at a finer scale. The effective spur threshold therefore
  depends on the step, which is one more reason the digest entry must state both.
* **The proxy for T-V12-3.** No `sgd.*` value lies within the 0.5 % tolerance under a halved step or a 2 m lower spur,
  and only `sgd.tShare` at spur 10 m does on 3 of 5 fixtures; `blockc.*` lies within it under every variant. The
  likely consequence for M1 is in section 7.

## 6 The note for M0-c-07a (the proxy; R-22, plan §9)

The sentence written into the JSON's `proxyNote`, for W-17 to restate in the digest and for M0-c-07a's summary:

> PROXY, not the raster-against-skeleton bias (no product skeleton exists research-side; T-V12-3 at M1 decides,
> R-22): on the five 2026-09-25 fixtures, against the declared twin (step 0.5 m, spur 8 m, merge 2 m), step 0.25 m:
> `sgd.tShare` largest change 15.3 % (median 5.4 %), within T-V12-3 tolerance on 0 of 5 fixtures, `sgd.deadEnds`
> largest change 39.4 % (median 23.4 %), within tolerance on 0 of 5, `blockc.perHa` invariant, `blockc.lotsPer`
> invariant; spur 6 m: `sgd.tShare` largest change 17.3 % (median 11.7 %), within tolerance on 0 of 5, `sgd.deadEnds`
> largest change 232.9 % (median 154.2 %), within tolerance on 0 of 5, `blockc.*` invariant; spur 10 m: `sgd.tShare`
> largest change 0.8 % (median 0.4 %), within tolerance on 3 of 5, `sgd.deadEnds` largest change 32.9 % (median
> 27.3 %), within tolerance on 0 of 5, `blockc.*` invariant.

## 7 Consequences and hand-offs

| reader | reads | from |
|---|---|---|
| W-15 | the ruling: the four D11 rows at TOWN, CITY and METROPOLIS are **target** rows by the band rule; no descriptive row in C-0116's form is owed by S-V12-2; the stress family's rows descriptive by the plan | section 3.1; the JSON's `verdicts` |
| E19 / M0-x-03 | nothing from this item (no descriptive row) | — |
| W-17 / M0-c-07a | the proxy sentence (section 6); and, for R-20 (7)'s digest entry, the five parameters the `sgd.*` rows depend on at first order: the raster step (0.5 m), the spur threshold (8 m) **measured on the Douglas-Peucker-simplified polyline at the raster step, pruned to a fixed point and once more after the merge**, the node merge (2 m, single linkage, internal edges of at most 4 m removed), and the thinning itself (eight-direction sequential thinning, a homotopic medial axis, E09 §2 step 5). An implementation that states these and follows them is "like with like" (R-22, J-V12.5); one that does not will differ on `sgd.deadEnds` beyond T-V12-3's tolerance (PLAUSIBLE), and plan §9's pre-decided outcome applies: version 1.0.0 stands at M-1 and the product's value supersedes with a `baselineShift` at M1 (J-V12.1) | section 5; E09 §2 |
| the rulings seat | F1 (information; no ruling owed): the pre-decided rule reads seed-to-seed instability only; parameter sensitivity is outside it, and this seat did not widen it. If the seat judges that a dead-end row set by its pruning parameter should cross descriptive, that is an amendment to V12 §8.3 (2), the owner's under J122 | the outcome; section 5.3 |
| W-13 | nothing new: the per-seed values this spike reads are E09's, unchanged | — |

## 8 Decisions taken under the delegation (J122; each vetoable, none changes a design cell or a ruling)

* **D1.** The rule is applied on the sample CV (n − 1), E09 D13's declared form. The population CV is reported beside;
  it is always the smaller, so it could only make the rule fire less, and here it changes no verdict.
* **D2.** The rule is applied per row (metric × plain family), because W-15's rows are per rung; the any-family reading
  is reported beside and changes no verdict.
* **D3.** The stress family is not ruled: it is descriptive by the plan (purpose stress; R-23). Its CVs are reported,
  with the note that the rule would fire on its `sgd.deadEnds` (0.3522 at n = 3).
* **D4.** `block.courtShare` is outside S-V12-2 (the row names `sgd.*` and `blockc.*`; D5 / D32 is not D11). Its CV is
  a companion, and it would fire at no plain rung.
* **D5.** The variants are step 0.25 m (spur 8 m), spur 6 m and spur 10 m (step 0.5 m), merge 2 m throughout — the two
  parameters the row names, no `--merge` variant. Each is measured in-process by `derived_graph.measure_seed` without
  the R-10 vector and with the court rows stripped; the base is measured again and checked equal to E09 (C3).
* **D6.** The sensitivity is read against T-V12-3's tolerance with the printed units of E09 §5 (0.001 / 0.01 / 0.01 /
  0.1), and in units of the plain family's sample SD at the fixture's size; the river-coast fixture (a water setting at
  size 80) is read against CITY plain's SD, a context choice only.
* **D7.** The ruling stands on the rule as pre-decided. The parameter sensitivity is reported as the proxy R-22 asks
  for, with F1 for the rulings seat; this seat neither widens the rule nor marks a row descriptive on sensitivity alone.
* **D8.** The red run's exit code is 0 when all seven checks fail (the mode's own definition, as E13's), and the run
  writes nothing; the JSON's hash is checked unchanged after it.

## 9 CONFIRMED versus PLAUSIBLE

* **CONFIRMED (executed).** Every number in sections 3–6: the record run, the separate-process `--verify`, the red run
  and the two measurement runs produced them, and a scratch script printed the tables from the written JSON. Also
  confirmed: `plan.py --check` SAME after the writes (`plan.json` `0fd7aae1`, `metrics.m-1.json` `8a0efa7e`; this lane
  wrote neither), and the content scans of this record (section 10).
* **CONFIRMED (read).** V12 §8.3 (2)'s rule, R-22, R-47 (g), plan §8 (3) and §9's row, E09 §3's sample and §6.2's
  CVs, C-0116's form.
* **PLAUSIBLE (reasoning only).** That the product's skeleton will differ from the twin on `sgd.deadEnds` beyond
  T-V12-3's tolerance (the proxy measures the twin's own sensitivity, not that difference; M1 decides). The reading of
  why the finer step raises the dead-end count (the simplified-line length and the corner reach), and of why the T share
  hardly moves at spur 10 m.

## 10 Content checks

Run at 03:48–03:49 on this record as written at 03:47 (the only later edits are this section's counts and the header's
end time): `doc_checks.py --doc docs/calibration/E14-spike-derived-graph.md --heads docs/ARCHITECTURE.md` gives C1 0,
C2 0, C4 0, S1 0, S2 0, and C3 22 hits with 19 unreviewed (exit 1 is that count, as for E07, E09 and E13). All 19 were
read: digit runs of this record's own numbers (section numbers, the signed per-fixture rows) and our own phrases; none is
a reference word list, palette, grammar or identifier. `make_denylist.py scan` on this record and its JSON: TOK 0, ID 0,
COL 0, SET 0, PHR 0, FILE 0, TRI 78 hits with 75 unreviewed, all listed with `--show` and read: our own fixture stems
repeated once per record in the JSON, zero runs, digit runs and phrases of our own text.
