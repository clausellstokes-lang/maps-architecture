# E12 — the depth-row re-fit and the deep-interior shares (W-12)

**Two halves.** Part I (sections 1–10) is the **fit half**, lane `m1/W-12-fit`, 2026-10-04 04:57 – 06:11 EDT, as it
landed: every value in it is a candidate and section 5 lists the choices it left open. Part II (sections 11–17) is the
**ruling half**, lane `m1/W-12`, 2026-10-04 06:16 – ⟨landing time in `docs/lane-events.log`⟩ EDT, which decides each of
those choices with its reason (vetoable, J122), signs the numbers table with provenance "M-1 2026-10-04" (section 12),
hands the cells to the design seat (section 13), gives W-17 the digest entry texts R-20 (2) and (6) (section 14) and
re-runs the fit's reproduction checks on the ruled values (section 15). **W-12 lands with Part II; J-A34.01's hold on
the block bands releases on that landing.** Part I's text is unchanged below except this head.

Both halves ran on the owner's Mac. W-12 is plan `M-1-plan.md` section 2's row W-12 (its seat tier a Fable ruling over
an Opus fit). This is a research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it) and carries
numbers, metric ids and our own words only. Nothing was written into `plat/`, no website was touched, no captured
program bundle was read, no benchmark ran, and no git command changed state.

---

# Part I — the fit (lane `m1/W-12-fit`; candidates only, ruled in Part II)

The numbers are in `docs/calibration/E12-depth-refit.json` (sha256 `43b9c4a53a17…`, deterministic), written by
`research/baselines/fit_depth_rows.py` (new, our own code, standard library only; sha256 `37d9c65efbc6…`).

## Outcome

**The row's three checks pass (CONFIRMED, executed; 12 / 12 tool checks, exit 0, twice byte-identical; 6 / 6 planted
faults turn their own check red).**

1. *The fitted `[e_lo, e_hi]` reproduce their inputs' p10 / p90 within rounding.* All 27 input sets were fitted under the
   closed-form threshold reading (EA), and 72 of 81 set-and-variant pairs under the recursion reading (EB). Each pair
   was taken at its published step (0.1 m; 0.01 in relative units) and run forward: EA in closed form, and EB in an
   independent seeded simulation of 400 000 blocks. Each reproduces its input's p10 and p90 within the quantile change
   that half a step at each end causes (EB adds three Monte Carlo standard errors). The worst deviation is 0.97 of the
   tolerance under EA and 0.98 under EB. EB cannot fit the 9 remaining pairs at all: they are the three NG `small`
   hoods' area, street and square sets (8–28 blocks each, descriptive size sets, not candidates). Their p90 / p10
   spread (1.43–1.61) is narrower than the narrowest spread the law's recursion produces (1.740–1.745, by variant).
2. *The shares of every band sum to 1.* This holds for R-19's four rows (to within 1e-12 unrounded, and exactly in their
   two- and three-decimal forms), for both alternative NG estimators' rows and for the `MFCG` preset's rows under both
   remainder alternatives.
3. *No block band is signed.* There is no `m1/W-15` or `m1/W-20` LANDED line, no W-15 or W-20 result file, no
   `rows.py`, `bands.py` or `cross_check.py`, and no M-1 seat row in `plat/CLEAN-ROOM.md`'s ledger.

**What the fit says, for the ruling (CONFIRMED as computations; their reading is section 5's):**

* **The two readings of the stop law disagree by a lot, and the plan does not say which one the checker means.** Suppose
  the reference's block extents are matched to the threshold τ itself (EA). Then NG's 20 `medium` hoods need a block
  range of [26.1, 134.5] m. Suppose instead they are matched to the blocks that §4.6's recursion leaves (EB), which is
  J-A34.01's own reason for the re-fit ("the same numbers would give smaller blocks"). Then they need [39.6, 159.2] m.
  For the `area` template alone the two readings give [28.5, 111.5] m and [47.6, 96.4] m. The design's `modest` row today
  gives [36, 60] m at CITY. Run forward under EB, that produces blocks of p10 / p90 21.9 / 38.8 (EA 36.7 / 45.9) m, against NG's 27.8 /
  57.0 m.
* **MFCG's intramural cluster blocks are deeper and far more spread than NG's.** Their p50 is 45–46 m and their p90 / p10
  is 2.4–2.7, against NG's 39 m and 2.05. Read as dense-core floors, they give [25–27, 193–233] m under EA and
  [33–38, 313–492] m under EB. Those upper ends would lift every band's block range in the dense core to that size.
  Whether MFCG's cluster blocks are the floor's comparator at all is a ruling (O-6).
* **Size barely moves block depth.** MFCG's p50 at TOWN / CITY / METROPOLIS is 1.00 / 1.00 / 0.98 of CITY's, against the
  design's rung depth factors of 1.10 / 1.00 / 0.95. NG's `small` hoods' blocks are 8 % deeper than `medium`'s and its
  `large` hoods' 1 % deeper.
* **`cut.flattenM`.** Of NG's 731 kept one-bend cuts, 3 have a bend lower than two model units (0.70 m declared), and the
  lowest is 1.68 units (0.59 m). The design's relative term, `0.02 × |A–foot|`, would flatten 23 of NG's kept bends and
  lower the one-bend share from 0.660 to 0.640. The absolute term at 0.7 m alone flattens 3, giving 0.658.
* **Deep-interior shares (R-19).** NG's pooled court share is 0.4566, so the `modest` court cell moves from 0.45 by a
  ratio of 1.0148: poor 0.3552, modest 0.4566, prosperous 0.6596, rich 0.7611. The other three shares are renormalised in
  their design proportions. The `MFCG` preset's court cell is 0.8135. The catalogue's "deep" (inscribed radius > 1.5 ×
  the median footprint short side, about 10.8 m on NG) is not the design's deep (local thickness > 2 d̄, which is a
  radius > 24 m at `modest`). Only 98 of NG's 597 catalogue-deep blocks are design-deep, and their court share is 0.418
  (O-12).

## 1 What was built and run

| step | command (project root) | result |
|---|---|---|
| fit | `python3 research/baselines/fit_depth_rows.py --md <scratch>` (nice 10) | 12 / 12 PASS, exit 0, ≈ 400 s; wrote `E12-depth-refit.json` |
| determinism | the same with `--json <scratch> --md <scratch>` (a second process) | JSON and tables byte-identical (sha256 above) |
| red | `fit_depth_rows.py --red` | 6 / 6 as expected, each planted fault turning exactly its own check red: a changed design string D0, a 2 % scale of one NG hood's blocks I1, 1 m added to one EA e_hi F1, 2 m added to one EB e_hi F2, a zeroed share C1; the control (no fault) stays green |
| content scan | `doc_checks.py --doc docs/calibration/E12-depth-refit.md --heads docs/ARCHITECTURE.md` | section 10 |

The tool reads only our own records: E11's plan-seed JSON (W-11b), E09's JSON and per-seed file (W-09), E10's plan JSON
(W-10b; for check I4), `docs/ARCHITECTURE.md` (the design cells, pinned by string), and, for the flatten heights,
the W-04 draw records of the 20 `medium` plan seeds. It reads those through `ng_faces_by_class.py`'s plan entries,
template rule and `analyse_with_state`, and through the bent-cut scripts they import, all unmodified, with bytecode off.
It writes the E12 JSON and, on request, the tables below.

**Tool checks (all PASS in the final run):**

| id | check |
|---|---|
| D0 | every design cell the fit reads is the design's own text: the four depth rows, the four regime floors, the three rung depth factors, the share rows, the stop law, the block-range formula, the position law, the flatten rule and both `cut.flattenM` values, and the deep rule |
| S1, S2 | g = \|(u₁+u₂+u₃+u₄)/2 − 1\| has mean 7/30 by its exact CDF, and its exact p10 / p50 / p90 (0.0376 / 0.2014 / 0.4767) agree with 200 000 seeded draws within 0.005 |
| I1 | NG: the block minor extents re-pooled from E11's per-map values reproduce `sizeSweepD3`'s n, p10, p50 and p90 for all 12 families in both units (E11 section 10.5) |
| I2 | NG: the type-7 median of the 20 `medium` hoods' `block.courtShare` equals E11's estimate (0.45664), and the pooled counts are 276 / 597 |
| I3 | MFCG: each usable plain seed's intramural block rows number `blockc.perHa`'s blocks and re-count its deep and court blocks; the per-family and pooled court counts and medians equal E09's `courtPooled` (30 seeds) |
| I4 | flatten inputs: 1 107 non-template cuts, 372 straight and 731 one-bend, equal to W-10b's counts (E10 section 9) |
| T1 | EB's tables: the smoothed p10 and p90 rise strictly with r over [1, 32] for all three variants |
| F1, F2 | the row's first check (section 4.2) |
| C1 | the row's second check (section 4.9) |
| J1 | the row's third check |

## 2 Method (declared; each choice that is ours is listed again in section 7)

**The stop law (§4.6 step 1).** A face stops when its OBB minor extent is below `τ = e_lo · (e_hi / e_lo)^g`, with
`g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1|`. The variable g is the folded Irwin–Hall sum of four uniforms, with mean exactly 7/30
and p10 / p50 / p90 of 0.0376 / 0.2014 / 0.4767. With `r = e_hi / e_lo`, τ's p-quantile is `e_lo · r^{g_p}`. The design
cells follow from `e_lo = max(2 d_lo, r_lo)` and `e_hi = max(2 d_hi, r_hi)`, where d is the depth row scaled by the
rung's depth factor and r is the stage regime's floor.

**The inputs.** Each input set is the pool of block minor extents (the minimum-area rectangle's short side) over its
hoods or seeds, summarised by V12 §3.5.1's type-7 quantiles.

* NG: W-11b's bounded built faces, in declared metres (R-01, 0.35 m per model unit) and relative to each map's median
  footprint short side. The `medium` sets are per template and pooled over 20 hoods; the `small` / `large` sets (D3)
  are kept for size.
* MFCG: W-09's intramural cluster blocks, in metres, per size over the 10 usable plain seeds and pooled over 30. A
  companion set drops single-footprint blocks.

**EA — the threshold reading.** The fitted pair makes τ's own p10 and p90 equal the input's:
`ln r = (ln p90 − ln p10) / (g90 − g10)` and `e_lo = p10 / r^{g10}`. This is closed form and assumes nothing about faces.
Because g90 is only 0.48, `e_hi` lies far above the input's p90: it is the rarely drawn top of the range.

**EB — the recursion reading.** The fitted pair makes the blocks that §4.6's recursion leaves have the input's p10 and
p90.

* *The simulation.* Rectangular start faces are cut recursively. Every face draws its own τ (step 1). A face that does
  not stop is cut straight across its major axis at `f = (1/2 + b) / 2` (step 2's position law, where the centroid term
  is 1/2 on a rectangle and b is the mean of three uniforms). The leaves' minor extents are collected.
* *Scale.* Outputs scale exactly with e_lo at fixed r, so each variant is one table of (p10, p90) over r ∈ [1, 32]. The
  table has 161 log-spaced points, each its own seeded simulation (400 000 blocks for V1, 200 000 for V2 and V3), smoothed
  by a degree-6 least-squares polynomial in ln r. The residual RMS is 0.0007 for p10 and 0.0023 for p90 in units of
  e_lo for V1, and at most 0.0010 and 0.0034 in V2 and V3.
* *Inversion.* The spread p90 / p10 is flat near r = 1: 1.752 at r = 1, a minimum of 1.740 near r = 1.19, and back
  above 1.762 only past r ≈ 1.55. The spread cannot identify r on that stretch, so the inversion runs on the spread's
  running maximum from its minimum and takes the smallest r that reaches the target. A target below 1.740 has no fit.
* *Variants.* The idealisation is tested by three start-face variants: V1 squares with side log-uniform over
  [8, 16] × e_hi (primary); V2 rectangles of aspect log-uniform over [1, 4]; V3 smaller squares, [2, 4] × e_hi. On every
  candidate set they move e_lo by at most 0.1 m and e_hi by at most 1.1 m.
* *Not modelled.* EB leaves out holes, reflex pre-cuts, the ladder, curved sides (most of NG's faces are curved, E10
  section 6 (2)) and the slope term. It is the design's own law on idealised faces, not a reproduction of NG's or MFCG's faces.

**Rounding and the reproduction check.** e and d are published at 0.1 m (0.01 relative). The tolerance on a reproduced
p10 or p90 is the change caused by moving each published end by half a step. Under EB it also includes three standard
errors of the verifying simulation (20 batch quantiles). The design's own cells are whole metres; whole-metre rounding
moves the reproduction by more than this tolerance (O-9).

**The bootstrap.** Hoods (NG) or seeds (MFCG) are resampled with replacement, B = 1 000 times, seeded; the input
quantiles are recomputed and refitted each time. The table gives the 5–95 % range of e_lo and e_hi, and under EB the
number of draws with no fit.

**`cut.flattenM` against the bent-cut signature.** This uses W-10b's construction on the 20 `medium` plan seeds: the
template rule, the duplicate-edge collapse, and the snapped junction ends. For every non-template one-bend cut, the
kept bend's height is the distance from the fillet-free virtual corner K (`bentcut_geometry`'s leg intersection) to the
chord between the cut's ends. A junction end is the snapped node on the crossed centreline; a free end is the drawn end
(323 of 1 462 ends). The design's rule drops K when that height is below `max(cut.flattenM, 0.02 × |A–foot|)`. Applying
the rule to NG's recorded cuts counts the bends it would flatten, and so the one-bend share it would leave. The
estimator for a value consistent with NG's signature is the largest value that flattens none of NG's kept bends.

**R-19's shares.** The `modest` court cell is NG's type-7 median `block.courtShare` over the 20 `medium` hoods. The other
bands' court cells move by measured ÷ 0.45, capped at 1. Each band's `back_lane`, `through_alley` and `rear_plots` are
scaled to fill 1 − court in their design proportions. The `MFCG` preset's court cell is the type-7 median of MFCG's per-seed
court shares over the 30 usable plain seeds. Rounded forms use largest-remainder rounding, so each published row sums
exactly to 1.

## 3 Inputs

| input | file (sha256, first 8) | what is read |
|---|---|---|
| NG blocks | `E11-ng-rows.plan.json` (`5a30648e…`) | `maps[].blockMinorExtent.values_m_declared` / `values_rel` (44 maps); `maps[].block.courtShare.blocks` (the design-deep proxy); `mediumPooled.scalars['block.courtShare']` |
| MFCG blocks | `E09-mfcg-derived-graph.seeds.json` (`9f23b5fb…`), `E09-mfcg-derived-graph.json` (`512e682c…`) | `perSeed[stem]['block.courtShare'].rows[].mrrShortM`, `.footprints`, `.deep`, `.court` over the usable plain seeds; `courtPooled`; `sample` |
| NG cuts | `E10-ng-bentcut-faces.plan.json` (`267cfece…`) for I4; W-04's `draw/gen-0.paths.json` of the 20 `medium` seeds through W-11b's plan-seed index | the counts; the street polylines, ends and virtual corners |
| design | `docs/ARCHITECTURE.md` (`70fcf77d…`) | the 20 pinned strings of check D0 |

## 4 DRAFT — the fit (candidates only)

### 4.1 Inputs and fits (p10 · p50 · p90 of the block minor extents; fitted [e_lo, e_hi] at the publication step)

| set | role | unit | hoods / seeds | blocks | p10 · p50 · p90 | EA [e_lo, e_hi] | EB-V1 [e_lo, e_hi] | EB-V2 | EB-V3 | bootstrap 90 % (EA e_lo; e_hi) | bootstrap 90 % (EB-V1 e_lo; e_hi) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| capture/NG/area/medium [m] | candidate | m | 5 | 194 | 30.0 · 39.7 · 54.6 | [28.5, 111.5] | [47.6, 96.4] | [47.6, 96.5] | [47.7, 96.1] | 27.2–29.7; 95.4–127.9 | 41.9–51.9; 77.6–153.3; 211 / 1000 draws no fit |
| capture/NG/area/medium [rel] | candidate | rel | 5 | 194 | 3.93 · 5.35 · 7.43 | [3.72, 15.89] | [5.98, 15.48] | [5.97, 15.51] | [5.98, 15.50] | 3.62–4.15; 13.78–17.74 | 5.59–7.05; 11.00–19.99; 59 / 1000 draws no fit |
| capture/NG/street/medium [m] | companion | m | 5 | 40 | 24.1 · 39.5 · 56.5 | [22.4, 156.1] | [31.5, 247.5] | [31.5, 247.2] | [31.5, 247.3] | 21.7–33.6; 95.5–191.2 | 29.7–53.9; 92.6–350.8; 46 / 1000 draws no fit |
| capture/NG/street/medium [rel] | companion | rel | 5 | 40 | 3.48 · 5.34 · 7.93 | [3.24, 21.18] | [4.64, 31.48] | [4.64, 31.44] | [4.64, 31.49] | 3.14–4.24; 12.48–25.10 | 4.34–6.71; 11.25–44.16; 39 / 1000 draws no fit |
| capture/NG/square/medium [m] | companion | m | 5 | 57 | 30.5 · 40.7 · 60.8 | [28.7, 138.2] | [44.5, 152.9] | [44.4, 153.1] | [44.4, 153.5] | 28.2–31.9; 95.9–189.4 | 40.0–51.5; 96.6–300.0; 204 / 1000 draws no fit |
| capture/NG/square/medium [rel] | companion | rel | 5 | 57 | 4.06 · 5.20 · 8.06 | [3.82, 18.25] | [5.93, 20.02] | [5.93, 20.05] | [5.93, 20.09] | 3.75–4.00; 11.75–25.71 | 5.37–6.92; 9.88–41.52; 191 / 1000 draws no fit |
| capture/NG/ring/medium [m] | companion | m | 5 | 317 | 26.5 · 38.4 · 58.1 | [24.8, 148.0] | [36.3, 201.7] | [36.3, 201.5] | [36.2, 202.1] | 23.6–32.2; 118.2–174.4 | 34.5–51.2; 109.9–241.6 |
| capture/NG/ring/medium [rel] | companion | rel | 5 | 317 | 3.88 · 5.29 · 7.71 | [3.66, 17.46] | [5.68, 19.15] | [5.67, 19.18] | [5.67, 19.22] | 3.50–4.21; 15.30–19.99 | 5.44–6.91; 14.15–23.81 |
| capture/NG/area/small [m] | size (D3) | m | 3 | 28 | 35.1 · 44.1 · 56.7 | [33.7, 100.5] | no fit | no fit | no fit | – | – |
| capture/NG/street/small [m] | size (D3) | m | 3 | 8 | 33.7 · 41.6 · 49.1 | [32.6, 77.1] | no fit | no fit | no fit | – | – |
| capture/NG/square/small [m] | size (D3) | m | 3 | 8 | 33.2 · 43.2 · 47.6 | [32.2, 73.1] | no fit | no fit | no fit | – | – |
| capture/NG/ring/small [m] | size (D3) | m | 3 | 66 | 31.8 · 40.0 · 64.1 | [29.9, 148.3] | [45.9, 168.9] | [45.9, 169.1] | [45.8, 169.6] | – | – |
| capture/NG/area/large [m] | size (D3) | m | 3 | 158 | 27.5 · 38.5 · 54.5 | [25.9, 123.2] | [40.2, 134.5] | [40.2, 134.7] | [40.2, 135.0] | – | – |
| capture/NG/street/large [m] | size (D3) | m | 3 | 98 | 28.4 · 39.0 · 60.8 | [26.6, 150.5] | [39.5, 194.7] | [39.5, 194.6] | [39.4, 195.3] | – | – |
| capture/NG/square/large [m] | size (D3) | m | 3 | 195 | 26.1 · 35.1 · 49.6 | [24.7, 106.6] | [39.6, 104.9] | [39.6, 105.1] | [39.6, 105.1] | – | – |
| capture/NG/ring/large [m] | size (D3) | m | 3 | 266 | 30.6 · 43.0 · 60.8 | [28.8, 137.9] | [44.7, 151.6] | [44.6, 151.8] | [44.6, 152.2] | – | – |
| NG/medium/pooled [m] | candidate | m | 20 | 608 | 27.8 · 39.0 · 57.0 | [26.1, 134.5] | [39.6, 159.2] | [39.6, 159.2] | [39.6, 159.8] | 24.6–29.6; 115.1–150.7 | 36.6–48.2; 104.6–201.8 |
| NG/medium/pooled [rel] | candidate | rel | 20 | 608 | 3.90 · 5.30 · 7.73 | [3.68, 17.45] | [5.72, 19.04] | [5.71, 19.06] | [5.71, 19.11] | 3.54–3.95; 15.53–18.84 | 5.45–6.37; 14.98–21.81 |
| NG/small/pooled [m] | size (D3) | m | 12 | 110 | 32.6 · 42.2 · 61.7 | [30.8, 132.3] | [49.5, 129.4] | [49.5, 129.7] | [49.5, 129.6] | – | – |
| NG/large/pooled [m] | size (D3) | m | 12 | 717 | 28.0 · 39.4 · 58.2 | [26.3, 139.2] | [39.6, 169.4] | [39.6, 169.4] | [39.6, 170.0] | – | – |
| capture/MFCG/40/plain [m] | candidate | m | 10 | 1448 | 27.2 · 46.3 · 72.5 | [25.0, 233.2] | [32.9, 492.1] | [32.9, 492.6] | [32.9, 491.5] | 24.2–26.0; 215.6–256.8 | 31.2–34.9; 415.2–604.0 |
| capture/MFCG/40/plain (blocks of >= 2 footprints) [m] | companion | m | 10 | 1333 | 31.8 · 48.3 · 74.6 | [29.6, 205.6] | [41.7, 324.3] | [41.7, 324.0] | [41.7, 324.2] | 28.4–30.9; 186.0–223.4 | 39.2–44.7; 260.6–389.1 |
| capture/MFCG/80/plain [m] | candidate | m | 10 | 5174 | 28.4 · 46.2 · 73.5 | [26.1, 228.3] | [34.9, 451.3] | [34.9, 451.7] | [34.9, 450.6] | 24.9–28.0; 207.3–239.7 | 33.1–38.0; 377.6–497.8 |
| capture/MFCG/80/plain (blocks of >= 2 footprints) [m] | companion | m | 10 | 4947 | 30.3 · 47.2 · 74.1 | [28.1, 215.4] | [38.6, 374.8] | [38.6, 374.8] | [38.6, 374.2] | 26.7–29.9; 194.5–228.1 | 36.5–41.7; 312.0–418.3 |
| capture/MFCG/130/plain [m] | candidate | m | 10 | 13737 | 29.1 · 45.3 · 69.0 | [27.1, 193.1] | [37.9, 312.7] | [37.9, 312.5] | [37.9, 312.5] | 26.3–27.9; 184.0–202.8 | 36.4–39.7; 279.0–350.1 |
| capture/MFCG/130/plain (blocks of >= 2 footprints) [m] | companion | m | 10 | 13350 | 30.4 · 45.8 · 69.5 | [28.4, 185.7] | [40.5, 277.0] | [40.5, 276.7] | [40.5, 277.1] | 27.5–29.2; 176.7–195.6 | 38.6–42.3; 247.2–313.1 |
| MFCG/plain/pooled [m] | candidate | m | 30 | 20359 | 28.9 · 45.5 · 70.3 | [26.7, 203.4] | [36.9, 350.6] | [36.9, 350.5] | [36.9, 350.1] | 26.0–27.5; 194.4–215.2 | 35.4–38.3; 315.9–397.0 |

### 4.2 Reproduction (the row's checker): the published pair's p10 / p90 against the input's

| set | estimator | input p10 / p90 | reproduced p10 / p90 | deviation | tolerance | pass |
|---|---|---|---|---|---|---|
| capture/NG/area/medium [m] | EA | 30.04 / 54.64 | 30.00 / 54.61 | -0.04 / -0.03 | ±0.05 / ±0.06 | PASS |
| capture/NG/area/medium [m] | EB-V1 | 30.04 / 54.64 | 30.03 / 54.61 | -0.01 / -0.02 | ±0.10 / ±0.15 | PASS |
| capture/NG/area/medium [m] | EB-V2 | 30.04 / 54.64 | 30.07 / 54.58 | +0.03 / -0.06 | ±0.09 / ±0.13 | PASS |
| capture/NG/area/medium [m] | EB-V3 | 30.04 / 54.64 | 30.11 / 54.60 | +0.07 / -0.04 | ±0.09 / ±0.13 | PASS |
| capture/NG/area/medium [rel] | EA | 3.927 / 7.431 | 3.929 / 7.432 | +0.001 / +0.001 | ±0.005 / ±0.006 | PASS |
| capture/NG/area/medium [rel] | EB-V1 | 3.927 / 7.431 | 3.928 / 7.440 | +0.001 / +0.008 | ±0.015 / ±0.021 | PASS |
| capture/NG/area/medium [rel] | EB-V2 | 3.927 / 7.431 | 3.924 / 7.427 | -0.004 / -0.004 | ±0.010 / ±0.024 | PASS |
| capture/NG/area/medium [rel] | EB-V3 | 3.927 / 7.431 | 3.929 / 7.432 | +0.001 / +0.001 | ±0.014 / ±0.022 | PASS |
| capture/NG/street/medium [m] | EA | 24.06 / 56.47 | 24.10 / 56.51 | +0.04 / +0.05 | ±0.05 / ±0.07 | PASS |
| capture/NG/street/medium [m] | EB-V1 | 24.06 / 56.47 | 24.15 / 56.45 | +0.09 / -0.02 | ±0.11 / ±0.26 | PASS |
| capture/NG/street/medium [m] | EB-V2 | 24.06 / 56.47 | 24.06 / 56.42 | +0.00 / -0.04 | ±0.11 / ±0.20 | PASS |
| capture/NG/street/medium [m] | EB-V3 | 24.06 / 56.47 | 24.08 / 56.38 | +0.02 / -0.08 | ±0.09 / ±0.26 | PASS |
| capture/NG/street/medium [rel] | EA | 3.481 / 7.933 | 3.477 / 7.929 | -0.004 / -0.004 | ±0.005 / ±0.007 | PASS |
| capture/NG/street/medium [rel] | EB-V1 | 3.481 / 7.933 | 3.485 / 7.938 | +0.004 / +0.004 | ±0.015 / ±0.028 | PASS |
| capture/NG/street/medium [rel] | EB-V2 | 3.481 / 7.933 | 3.480 / 7.935 | -0.001 / +0.001 | ±0.014 / ±0.033 | PASS |
| capture/NG/street/medium [rel] | EB-V3 | 3.481 / 7.933 | 3.486 / 7.935 | +0.005 / +0.001 | ±0.013 / ±0.033 | PASS |
| capture/NG/square/medium [m] | EA | 30.48 / 60.76 | 30.45 / 60.71 | -0.03 / -0.04 | ±0.05 / ±0.07 | PASS |
| capture/NG/square/medium [m] | EB-V1 | 30.48 / 60.76 | 30.51 / 60.79 | +0.03 / +0.03 | ±0.09 / ±0.22 | PASS |
| capture/NG/square/medium [m] | EB-V2 | 30.48 / 60.76 | 30.40 / 60.72 | -0.08 / -0.03 | ±0.09 / ±0.22 | PASS |
| capture/NG/square/medium [m] | EB-V3 | 30.48 / 60.76 | 30.48 / 60.82 | +0.00 / +0.06 | ±0.09 / ±0.18 | PASS |
| capture/NG/square/medium [rel] | EA | 4.056 / 8.056 | 4.051 / 8.051 | -0.004 / -0.005 | ±0.005 / ±0.007 | PASS |
| capture/NG/square/medium [rel] | EB-V1 | 4.056 / 8.056 | 4.054 / 8.045 | -0.002 / -0.011 | ±0.013 / ±0.021 | PASS |
| capture/NG/square/medium [rel] | EB-V2 | 4.056 / 8.056 | 4.050 / 8.063 | -0.006 / +0.008 | ±0.013 / ±0.026 | PASS |
| capture/NG/square/medium [rel] | EB-V3 | 4.056 / 8.056 | 4.063 / 8.077 | +0.007 / +0.022 | ±0.013 / ±0.022 | PASS |
| capture/NG/ring/medium [m] | EA | 26.53 / 58.11 | 26.52 / 58.11 | -0.01 / -0.00 | ±0.05 / ±0.07 | PASS |
| capture/NG/ring/medium [m] | EB-V1 | 26.53 / 58.11 | 26.59 / 58.15 | +0.06 / +0.04 | ±0.09 / ±0.25 | PASS |
| capture/NG/ring/medium [m] | EB-V2 | 26.53 / 58.11 | 26.56 / 58.19 | +0.04 / +0.08 | ±0.11 / ±0.22 | PASS |
| capture/NG/ring/medium [m] | EB-V3 | 26.53 / 58.11 | 26.49 / 58.11 | -0.04 / -0.01 | ±0.11 / ±0.25 | PASS |
| capture/NG/ring/medium [rel] | EA | 3.881 / 7.708 | 3.881 / 7.708 | +0.001 / -0.000 | ±0.005 / ±0.007 | PASS |
| capture/NG/ring/medium [rel] | EB-V1 | 3.881 / 7.708 | 3.880 / 7.714 | -0.001 / +0.006 | ±0.015 / ±0.021 | PASS |
| capture/NG/ring/medium [rel] | EB-V2 | 3.881 / 7.708 | 3.877 / 7.708 | -0.004 / +0.000 | ±0.014 / ±0.024 | PASS |
| capture/NG/ring/medium [rel] | EB-V3 | 3.881 / 7.708 | 3.881 / 7.710 | +0.000 / +0.002 | ±0.009 / ±0.024 | PASS |
| capture/NG/area/small [m] | EA | 35.14 / 56.75 | 35.11 / 56.73 | -0.03 / -0.01 | ±0.05 / ±0.06 | PASS |
| capture/NG/area/small [m] | EB-V1 | 35.14 / 56.75 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.615 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.19; r = 1 is one fixed threshold) |
| capture/NG/area/small [m] | EB-V2 | 35.14 / 56.75 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.615 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.17; r = 1 is one fixed threshold) |
| capture/NG/area/small [m] | EB-V3 | 35.14 / 56.75 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.615 is below the law's narrowest output spread 1.745 (its minimum, near r = 1.20; r = 1 is one fixed threshold) |
| capture/NG/street/small [m] | EA | 33.65 / 49.11 | 33.67 / 49.14 | +0.02 / +0.02 | ±0.05 / ±0.05 | PASS |
| capture/NG/street/small [m] | EB-V1 | 33.65 / 49.11 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.459 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.19; r = 1 is one fixed threshold) |
| capture/NG/street/small [m] | EB-V2 | 33.65 / 49.11 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.459 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.17; r = 1 is one fixed threshold) |
| capture/NG/street/small [m] | EB-V3 | 33.65 / 49.11 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.459 is below the law's narrowest output spread 1.745 (its minimum, near r = 1.20; r = 1 is one fixed threshold) |
| capture/NG/square/small [m] | EA | 33.25 / 47.62 | 33.21 / 47.60 | -0.04 / -0.02 | ±0.05 / ±0.05 | PASS |
| capture/NG/square/small [m] | EB-V1 | 33.25 / 47.62 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.432 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.19; r = 1 is one fixed threshold) |
| capture/NG/square/small [m] | EB-V2 | 33.25 / 47.62 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.432 is below the law's narrowest output spread 1.740 (its minimum, near r = 1.17; r = 1 is one fixed threshold) |
| capture/NG/square/small [m] | EB-V3 | 33.25 / 47.62 | no fit | – | – | infeasible: the input spread p90 / p10 = 1.432 is below the law's narrowest output spread 1.745 (its minimum, near r = 1.20; r = 1 is one fixed threshold) |
| capture/NG/ring/small [m] | EA | 31.76 / 64.15 | 31.76 / 64.15 | -0.01 / -0.00 | ±0.05 / ±0.07 | PASS |
| capture/NG/ring/small [m] | EB-V1 | 31.76 / 64.15 | 31.77 / 64.10 | +0.00 / -0.05 | ±0.10 / ±0.17 | PASS |
| capture/NG/ring/small [m] | EB-V2 | 31.76 / 64.15 | 31.76 / 64.23 | +0.00 / +0.08 | ±0.12 / ±0.19 | PASS |
| capture/NG/ring/small [m] | EB-V3 | 31.76 / 64.15 | 31.72 / 64.14 | -0.04 / -0.01 | ±0.09 / ±0.21 | PASS |
| capture/NG/area/large [m] | EA | 27.47 / 54.47 | 27.46 / 54.47 | -0.01 / -0.00 | ±0.05 / ±0.07 | PASS |
| capture/NG/area/large [m] | EB-V1 | 27.47 / 54.47 | 27.43 / 54.42 | -0.04 / -0.05 | ±0.10 / ±0.20 | PASS |
| capture/NG/area/large [m] | EB-V2 | 27.47 / 54.47 | 27.43 / 54.41 | -0.05 / -0.06 | ±0.09 / ±0.19 | PASS |
| capture/NG/area/large [m] | EB-V3 | 27.47 / 54.47 | 27.46 / 54.47 | -0.02 / +0.00 | ±0.09 / ±0.21 | PASS |
| capture/NG/street/large [m] | EA | 28.43 / 60.81 | 28.39 / 60.77 | -0.04 / -0.04 | ±0.05 / ±0.07 | PASS |
| capture/NG/street/large [m] | EB-V1 | 28.43 / 60.81 | 28.44 / 60.83 | +0.01 / +0.02 | ±0.11 / ±0.22 | PASS |
| capture/NG/street/large [m] | EB-V2 | 28.43 / 60.81 | 28.43 / 60.75 | +0.00 / -0.06 | ±0.11 / ±0.22 | PASS |
| capture/NG/street/large [m] | EB-V3 | 28.43 / 60.81 | 28.35 / 60.88 | -0.08 / +0.07 | ±0.08 / ±0.24 | PASS |
| capture/NG/square/large [m] | EA | 26.11 / 49.61 | 26.10 / 49.59 | -0.02 / -0.01 | ±0.05 / ±0.06 | PASS |
| capture/NG/square/large [m] | EB-V1 | 26.11 / 49.61 | 26.17 / 49.55 | +0.06 / -0.06 | ±0.08 / ±0.15 | PASS |
| capture/NG/square/large [m] | EB-V2 | 26.11 / 49.61 | 26.12 / 49.70 | +0.00 / +0.09 | ±0.08 / ±0.14 | PASS |
| capture/NG/square/large [m] | EB-V3 | 26.11 / 49.61 | 26.11 / 49.60 | +0.00 / -0.01 | ±0.09 / ±0.15 | PASS |
| capture/NG/ring/large [m] | EA | 30.56 / 60.76 | 30.55 / 60.76 | -0.01 / -0.00 | ±0.05 / ±0.07 | PASS |
| capture/NG/ring/large [m] | EB-V1 | 30.56 / 60.76 | 30.55 / 60.76 | -0.01 / -0.00 | ±0.11 / ±0.20 | PASS |
| capture/NG/ring/large [m] | EB-V2 | 30.56 / 60.76 | 30.51 / 60.70 | -0.04 / -0.06 | ±0.12 / ±0.19 | PASS |
| capture/NG/ring/large [m] | EB-V3 | 30.56 / 60.76 | 30.56 / 60.79 | +0.01 / +0.03 | ±0.11 / ±0.16 | PASS |
| NG/medium/pooled [m] | EA | 27.76 / 57.02 | 27.76 / 57.03 | +0.00 / +0.01 | ±0.05 / ±0.07 | PASS |
| NG/medium/pooled [m] | EB-V1 | 27.76 / 57.02 | 27.77 / 57.01 | +0.02 / -0.01 | ±0.08 / ±0.20 | PASS |
| NG/medium/pooled [m] | EB-V2 | 27.76 / 57.02 | 27.73 / 57.00 | -0.03 / -0.02 | ±0.10 / ±0.17 | PASS |
| NG/medium/pooled [m] | EB-V3 | 27.76 / 57.02 | 27.73 / 57.17 | -0.03 / +0.15 | ±0.08 / ±0.20 | PASS |
| NG/medium/pooled [rel] | EA | 3.900 / 7.727 | 3.902 / 7.728 | +0.002 / +0.001 | ±0.005 / ±0.007 | PASS |
| NG/medium/pooled [rel] | EB-V1 | 3.900 / 7.727 | 3.907 / 7.724 | +0.007 / -0.003 | ±0.012 / ±0.021 | PASS |
| NG/medium/pooled [rel] | EB-V2 | 3.900 / 7.727 | 3.898 / 7.722 | -0.002 / -0.005 | ±0.012 / ±0.018 | PASS |
| NG/medium/pooled [rel] | EB-V3 | 3.900 / 7.727 | 3.895 / 7.729 | -0.005 / +0.002 | ±0.011 / ±0.025 | PASS |
| NG/small/pooled [m] | EA | 32.58 / 61.75 | 32.54 / 61.70 | -0.05 / -0.05 | ±0.05 / ±0.06 | PASS |
| NG/small/pooled [m] | EB-V1 | 32.58 / 61.75 | 32.60 / 61.69 | +0.02 / -0.06 | ±0.09 / ±0.17 | PASS |
| NG/small/pooled [m] | EB-V2 | 32.58 / 61.75 | 32.57 / 61.75 | -0.01 / -0.00 | ±0.09 / ±0.17 | PASS |
| NG/small/pooled [m] | EB-V3 | 32.58 / 61.75 | 32.59 / 61.76 | +0.01 / +0.02 | ±0.11 / ±0.19 | PASS |
| NG/large/pooled [m] | EA | 27.97 / 58.17 | 28.00 / 58.20 | +0.03 / +0.03 | ±0.05 / ±0.07 | PASS |
| NG/large/pooled [m] | EB-V1 | 27.97 / 58.17 | 28.00 / 58.19 | +0.03 / +0.02 | ±0.10 / ±0.17 | PASS |
| NG/large/pooled [m] | EB-V2 | 27.97 / 58.17 | 28.00 / 58.21 | +0.03 / +0.04 | ±0.09 / ±0.20 | PASS |
| NG/large/pooled [m] | EB-V3 | 27.97 / 58.17 | 28.00 / 58.22 | +0.03 / +0.05 | ±0.09 / ±0.21 | PASS |
| capture/MFCG/40/plain [m] | EA | 27.21 / 72.50 | 27.19 / 72.48 | -0.02 / -0.02 | ±0.05 / ±0.08 | PASS |
| capture/MFCG/40/plain [m] | EB-V1 | 27.21 / 72.50 | 27.21 / 72.35 | +0.01 / -0.16 | ±0.10 / ±0.33 | PASS |
| capture/MFCG/40/plain [m] | EB-V2 | 27.21 / 72.50 | 27.26 / 72.56 | +0.06 / +0.06 | ±0.11 / ±0.37 | PASS |
| capture/MFCG/40/plain [m] | EB-V3 | 27.21 / 72.50 | 27.21 / 72.36 | +0.00 / -0.14 | ±0.12 / ±0.44 | PASS |
| capture/MFCG/40/plain (blocks of >= 2 footprints) [m] | EA | 31.84 / 74.56 | 31.84 / 74.56 | -0.00 / +0.01 | ±0.05 / ±0.07 | PASS |
| capture/MFCG/40/plain (blocks of >= 2 footprints) [m] | EB-V1 | 31.84 / 74.56 | 31.84 / 74.50 | -0.00 / -0.06 | ±0.13 / ±0.23 | PASS |
| capture/MFCG/40/plain (blocks of >= 2 footprints) [m] | EB-V2 | 31.84 / 74.56 | 31.82 / 74.51 | -0.02 / -0.05 | ±0.11 / ±0.36 | PASS |
| capture/MFCG/40/plain (blocks of >= 2 footprints) [m] | EB-V3 | 31.84 / 74.56 | 31.84 / 74.58 | -0.00 / +0.02 | ±0.12 / ±0.29 | PASS |
| capture/MFCG/80/plain [m] | EA | 28.37 / 73.46 | 28.32 / 73.39 | -0.05 / -0.08 | ±0.05 / ±0.08 | PASS |
| capture/MFCG/80/plain [m] | EB-V1 | 28.37 / 73.46 | 28.37 / 73.59 | +0.00 / +0.13 | ±0.12 / ±0.32 | PASS |
| capture/MFCG/80/plain [m] | EB-V2 | 28.37 / 73.46 | 28.37 / 73.42 | +0.00 / -0.04 | ±0.11 / ±0.37 | PASS |
| capture/MFCG/80/plain [m] | EB-V3 | 28.37 / 73.46 | 28.34 / 73.37 | -0.02 / -0.10 | ±0.11 / ±0.31 | PASS |
| capture/MFCG/80/plain (blocks of >= 2 footprints) [m] | EA | 30.29 / 74.13 | 30.34 / 74.19 | +0.05 / +0.06 | ±0.05 / ±0.08 | PASS |
| capture/MFCG/80/plain (blocks of >= 2 footprints) [m] | EB-V1 | 30.29 / 74.13 | 30.29 / 74.09 | +0.00 / -0.04 | ±0.11 / ±0.32 | PASS |
| capture/MFCG/80/plain (blocks of >= 2 footprints) [m] | EB-V2 | 30.29 / 74.13 | 30.34 / 74.21 | +0.05 / +0.08 | ±0.11 / ±0.33 | PASS |
| capture/MFCG/80/plain (blocks of >= 2 footprints) [m] | EB-V3 | 30.29 / 74.13 | 30.28 / 74.06 | -0.02 / -0.07 | ±0.12 / ±0.25 | PASS |
| capture/MFCG/130/plain [m] | EA | 29.14 / 69.05 | 29.18 / 69.10 | +0.04 / +0.06 | ±0.05 / ±0.08 | PASS |
| capture/MFCG/130/plain [m] | EB-V1 | 29.14 / 69.05 | 29.08 / 69.09 | -0.06 / +0.04 | ±0.13 / ±0.28 | PASS |
| capture/MFCG/130/plain [m] | EB-V2 | 29.14 / 69.05 | 29.14 / 69.10 | +0.00 / +0.06 | ±0.11 / ±0.33 | PASS |
| capture/MFCG/130/plain [m] | EB-V3 | 29.14 / 69.05 | 29.16 / 69.09 | +0.02 / +0.04 | ±0.14 / ±0.32 | PASS |
| capture/MFCG/130/plain (blocks of >= 2 footprints) [m] | EA | 30.43 / 69.45 | 30.48 / 69.51 | +0.05 / +0.06 | ±0.05 / ±0.07 | PASS |
| capture/MFCG/130/plain (blocks of >= 2 footprints) [m] | EB-V1 | 30.43 / 69.45 | 30.41 / 69.48 | -0.01 / +0.03 | ±0.14 / ±0.20 | PASS |
| capture/MFCG/130/plain (blocks of >= 2 footprints) [m] | EB-V2 | 30.43 / 69.45 | 30.44 / 69.48 | +0.01 / +0.03 | ±0.11 / ±0.30 | PASS |
| capture/MFCG/130/plain (blocks of >= 2 footprints) [m] | EB-V3 | 30.43 / 69.45 | 30.44 / 69.51 | +0.01 / +0.06 | ±0.12 / ±0.26 | PASS |
| MFCG/plain/pooled [m] | EA | 28.86 / 70.34 | 28.82 / 70.29 | -0.04 / -0.05 | ±0.05 / ±0.08 | PASS |
| MFCG/plain/pooled [m] | EB-V1 | 28.86 / 70.34 | 28.87 / 70.52 | +0.01 / +0.18 | ±0.13 / ±0.29 | PASS |
| MFCG/plain/pooled [m] | EB-V2 | 28.86 / 70.34 | 28.86 / 70.38 | -0.01 / +0.04 | ±0.11 / ±0.31 | PASS |
| MFCG/plain/pooled [m] | EB-V3 | 28.86 / 70.34 | 28.89 / 70.37 | +0.02 / +0.03 | ±0.12 / ±0.39 | PASS |

### 4.3 Candidate depth rows (modest from NG; e = 2 d at the CITY depth factor 1.00, the floor not binding)

| source | estimator | block range [e_lo, e_hi] m | modest [d_lo, d_hi] m | poor by ratio | prosperous by ratio | rich by ratio |
|---|---|---|---|---|---|---|
| NG/medium/pooled [m] | EA | [26.1, 134.5] | [13.0, 67.2] | [8.7, 44.8] | [18.1, 89.7] | [21.8, 134.5] |
| NG/medium/pooled [m] | EB.V1 | [39.6, 159.2] | [19.8, 79.6] | [13.2, 53.1] | [27.5, 106.1] | [33.0, 159.2] |
| NG/medium/pooled [m] | EB.V2 | [39.6, 159.2] | [19.8, 79.6] | [13.2, 53.1] | [27.5, 106.1] | [33.0, 159.2] |
| NG/medium/pooled [m] | EB.V3 | [39.6, 159.8] | [19.8, 79.9] | [13.2, 53.3] | [27.5, 106.5] | [33.0, 159.8] |
| capture/NG/area/medium [m] | EA | [28.5, 111.5] | [14.2, 55.8] | [9.5, 37.2] | [19.8, 74.3] | [23.8, 111.5] |
| capture/NG/area/medium [m] | EB.V1 | [47.6, 96.4] | [23.8, 48.2] | [15.9, 32.1] | [33.1, 64.3] | [39.7, 96.4] |
| capture/NG/area/medium [m] | EB.V2 | [47.6, 96.5] | [23.8, 48.2] | [15.9, 32.2] | [33.1, 64.3] | [39.7, 96.5] |
| capture/NG/area/medium [m] | EB.V3 | [47.7, 96.1] | [23.8, 48.0] | [15.9, 32.0] | [33.1, 64.1] | [39.8, 96.1] |

### 4.4 Candidate dense-core floors (from MFCG's intramural cluster blocks; e = r, the floor binding)

| estimator | TOWN (size 40) | CITY (size 80) | METROPOLIS (size 130) | pooled (30 seeds) |
|---|---|---|---|---|
| EA | [25.0, 233.2] | [26.1, 228.3] | [27.1, 193.1] | [26.7, 203.4] |
| EB.V1 | [32.9, 492.1] | [34.9, 451.3] | [37.9, 312.7] | [36.9, 350.6] |
| EB.V2 | [32.9, 492.6] | [34.9, 451.7] | [37.9, 312.5] | [36.9, 350.5] |
| EB.V3 | [32.9, 491.5] | [34.9, 450.6] | [37.9, 312.5] | [36.9, 350.1] |

### 4.5 The block range per band at CITY in the dense core (e_lo = max(2 d_lo, r_lo), e_hi = max(2 d_hi, r_hi))

| combination | poor | modest | prosperous | rich |
|---|---|---|---|---|
| design now | [30.0, 45.0] | [36.0, 60.0] | [50.0, 80.0] | [60.0, 120.0] |
| EA: NG pooled modest, other bands by ratio, MFCG CITY floor | [26.1, 228.3] | [26.1, 228.3] | [36.2, 228.3] | [43.6, 269.0] |
| EA: NG pooled modest, other bands unchanged, design floor | [30.0, 45.0] | [30.0, 134.4] | [50.0, 80.0] | [60.0, 120.0] |
| EB.V1: NG pooled modest, other bands by ratio, MFCG CITY floor | [34.9, 451.3] | [39.6, 451.3] | [55.0, 451.3] | [66.0, 451.3] |
| EB.V1: NG pooled modest, other bands unchanged, design floor | [30.0, 45.0] | [39.6, 159.2] | [50.0, 80.0] | [60.0, 120.0] |

### 4.6 What the design's present ranges produce (CITY; block minor-extent p10 / p90 in m under each reading)

| regime | band | block range [e_lo, e_hi] | EA p10 / p90 | EB-V1 p10 / p90 |
|---|---|---|---|---|
| denseCore | poor | [30.0, 45.0] | 30.5 / 36.4 | 17.9 / 31.4 |
| denseCore | modest | [36.0, 60.0] | 36.7 / 45.9 | 21.9 / 38.8 |
| denseCore | prosperous | [50.0, 80.0] | 50.9 / 62.6 | 30.2 / 53.3 |
| denseCore | rich | [60.0, 120.0] | 61.6 / 83.5 | 37.8 / 68.6 |
| walledRings | poor | [45.0, 70.0] | 45.8 / 55.5 | 27.0 / 47.6 |
| walledRings | modest | [45.0, 70.0] | 45.8 / 55.5 | 27.0 / 47.6 |
| walledRings | prosperous | [50.0, 80.0] | 50.9 / 62.6 | 30.2 / 53.3 |
| walledRings | rich | [60.0, 120.0] | 61.6 / 83.5 | 37.8 / 68.6 |

### 4.7 Size dependence (an observation)

| quantity | values |
|---|---|
| NG pooled p50 small / medium / large (m) | 42.245 / 39.022 / 39.352 |
| NG ratio to medium | 1.083 / 1.000 / 1.008 |
| MFCG p50 TOWN / CITY / METROPOLIS (m) | 46.346 / 46.160 / 45.329 |
| MFCG ratio to CITY | 1.004 / 1.000 / 0.982 |
| design depth factor TOWN / CITY / METROPOLIS | 1.100 / 1.000 / 0.950 |

### 4.8 cut.flattenM: the heights of NG's kept bends (20 medium seeds)

Cuts 1107, one-bend 731 (share 0.6603); heights in model units: min 1.676, p1 2.387, p5 3.175, p10 4.112, p50 12.624; declared metres: min 0.587, p1 0.835, p5 1.111, p10 1.439, p50 4.418. Below two model units: 3. Height / chord: min 0.0139; below 0.02: 23. Histogram of heights 0-6 mu by 0.25 mu: [0, 0, 0, 0, 0, 0, 1, 2, 3, 5, 9, 12, 11, 9, 13, 5, 11, 11, 9, 17, 8, 11, 10, 9].

| flattenM (m) | relative factor | NG kept bends the rule would flatten | one-bend share after |
|---|---|---|---|
| 0.50 | 0.020 | 23 | 0.6396 |
| 0.50 | 0.013 | 0 | 0.6603 |
| 0.50 | 0.000 | 0 | 0.6603 |
| 0.58 | 0.020 | 23 | 0.6396 |
| 0.58 | 0.013 | 0 | 0.6603 |
| 0.58 | 0.000 | 0 | 0.6603 |
| 0.70 | 0.020 | 23 | 0.6396 |
| 0.70 | 0.013 | 3 | 0.6576 |
| 0.70 | 0.000 | 3 | 0.6576 |
| 0.80 | 0.020 | 23 | 0.6396 |
| 0.80 | 0.013 | 6 | 0.6549 |
| 0.80 | 0.000 | 6 | 0.6549 |
| 1.00 | 0.020 | 35 | 0.6287 |
| 1.00 | 0.013 | 22 | 0.6405 |
| 1.00 | 0.000 | 22 | 0.6405 |
| 1.50 | 0.020 | 83 | 0.5854 |
| 1.50 | 0.013 | 82 | 0.5863 |
| 1.50 | 0.000 | 82 | 0.5863 |

| lowest kept bends | street | height mu | chord mu | both ends snapped | filleted | angle deg |
|---|---|---|---|---|---|---|
| capture/NG/ring/medium/1 | 45 | 1.6762 | 96.36 | True | True | 4.38 |
| capture/NG/ring/medium/2 | 34 | 1.8740 | 126.12 | True | True | 3.68 |
| capture/NG/area/medium/3 | 43 | 1.9993 | 140.73 | True | True | 3.13 |
| capture/NG/area/medium/2 | 27 | 2.0508 | 147.98 | True | True | 3.09 |
| capture/NG/area/medium/1 | 78 | 2.0764 | 132.30 | False | True | 3.60 |
| capture/NG/street/medium/0 | 10 | 2.2299 | 140.28 | True | True | 3.52 |

### 4.9 The deep-interior shares (court / back_lane / through_alley / rear_plots)

| band | design | R-19 fit (unrounded) | two decimals (largest remainder) | three decimals | alt: count ratio | alt: area template |
|---|---|---|---|---|---|---|
| poor | 0.35 / 0.25 / 0.30 / 0.10 | 0.3552 / 0.2480 / 0.2976 / 0.0992 | 0.35 / 0.25 / 0.30 / 0.10 | 0.355 / 0.248 / 0.298 / 0.099 | 0.3596 / 0.2463 / 0.2956 / 0.0985 | 0.3556 / 0.2479 / 0.2974 / 0.0991 |
| modest | 0.45 / 0.30 / 0.15 / 0.10 | 0.4566 / 0.2964 / 0.1482 / 0.0988 | 0.46 / 0.29 / 0.15 / 0.10 | 0.457 / 0.296 / 0.148 / 0.099 | 0.4623 / 0.2933 / 0.1466 / 0.0978 | 0.4571 / 0.2961 / 0.1481 / 0.0987 |
| prosperous | 0.65 / 0.15 / 0.05 / 0.15 | 0.6596 / 0.1459 / 0.0486 / 0.1459 | 0.66 / 0.15 / 0.05 / 0.14 | 0.659 / 0.146 / 0.049 / 0.146 | 0.6678 / 0.1424 / 0.0475 / 0.1424 | 0.6603 / 0.1456 / 0.0485 / 0.1456 |
| rich | 0.75 / 0.10 / 0.00 / 0.15 | 0.7611 / 0.0956 / 0.0000 / 0.1434 | 0.76 / 0.10 / 0.00 / 0.14 | 0.761 / 0.096 / 0.000 / 0.143 | 0.7705 / 0.0918 / 0.0000 / 0.1377 | 0.7619 / 0.0952 / 0.0000 / 0.1429 |

| MFCG preset row | court / back_lane / through_alley / rear_plots |
|---|---|
| Ra | 0.8135 / 0.1017 / 0.0509 / 0.0339 |
| Rb | 0.8135 / 0.0000 / 0.0000 / 0.1865 |

Court inputs: NG's R-19 estimate 0.45664 (type-7 median over 20 hoods); the pooled count ratio 0.4623 (276 / 597); the `area` template's median 0.4571; the design-deep proxy (inscribed radius > 24 m) 41 / 98 = 0.4184 pooled, hood median 0.3875 over 16 hoods. R-19's ratio measured ÷ 0.45 = 1.0148; no court cell reaches the cap. The `MFCG` preset's court cell: CS-M1 0.8135, CS-M2 0.8145, CS-M3 TOWN / CITY / METROPOLIS 0.8101 / 0.8098 / 0.8143. Ra and Rb (the two remainder alternatives, O-14) use CS-M1.


## 5 The choices the ruling must make (open; not ruled here)

Each item names its alternatives and the evidence for each. None is decided by this seat. Where the seat leans, the lean
is marked as information only.

* **O-1 Which quantity of the stop law the reference's blocks are matched to.**
  - *EA (threshold quantiles).* Closed form, with no face model. It reads the reference's block extents as if each block
    stopped at its own τ.
  - *EB (the recursion's leaves).* This is the reading J-A34.01 gives as its reason for the re-fit: under a per-face draw
    "the same numbers would give smaller blocks". It rests on rectangular start faces (section 2), whose variants move
    the candidate pairs by ≤ 0.1 m (e_lo) and ≤ 1.1 m (e_hi). The bootstrap shows EB is fragile where a reference's
    spread lies near the law's minimum: on the `area` template 211 of 1 000 hood resamples have no fit.
  - *Seat's lean (PLAUSIBLE, reasoning).* EB, for J-A34.01's stated reason, with M0's S8 harness as the place where the
    idealisation is replaced (V12 §3.7.1 (c) names item 34's depth rows as reference runs there).
* **O-2 The NG comparator set.**
  - The 20 `medium` hoods pooled: R-19's pooling for the court share.
  - The `area` template alone: §13.6 (2) pairs the `area` template with the base's own `bent-cut` fabric.
  - Per template, kept as companions. The street and square templates are thin: 40 and 57 blocks.
* **O-3 Unit.**
  - Declared metres (R-01): the design's cells are metres.
  - Relative to the median footprint short side: true to NG's own scale, which is not metric. It would tie the depth
    rows to the footprint scale, which the design does not do.
* **O-4 Which design cell absorbs the NG fit.**
  - The `modest` depth row with e = 2 d. The floor does not bind for `modest` in any regime today
    (2 × 18–30 = 36–60 against the floors 30–45 and 45–70). R-19 names NG's `medium` hood as the `modest` comparator,
    PLAUSIBLE by plan section 10.
  - A regime floor instead. NG has no walls and no regime, so this would be a reading of NG as the dense core.
  - A consequence for the plot model: the depth rows are also S10's plot depths (§4.7). Under the EB candidate the
    `modest` plot-depth band becomes [19.8, 79.6] m, against 18–30 today. A plot-depth row that also bounds the block
    range moves plot depths that FTG's and NG's footprint numbers anchor elsewhere. The alternative is to put the block
    range in the floors and keep the plot depths. Both are re-fits of existing cells; neither is new design.
* **O-5 The other bands' depth rows.**
  - Unchanged.
  - Moved by the `modest` fit's lo and hi ratios (section 4.3).
  - No band but `modest` has a reference at M-1.
* **O-6 The dense-core floor and MFCG.**
  - From MFCG per rung, from MFCG pooled, from the ≥ 2-footprint companion, or not from MFCG.
  - MFCG's cluster blocks are footprint unions closed at 3 m, not the generator's faces. Their spread needs r ≈ 9–15
    under EB, so e_hi reaches 313–492 m. Under EA it reaches 193–233 m.
  - As a floor (`e_hi = max(2 d_hi, r_hi)`), that upper end would become every band's block-range top in the dense
    core (section 4.5).
  - The lower ends are steadier: 25–27 m under EA and 33–38 m under EB, against the design's 30.
* **O-7 The other floors.**
  - *Walled rings (45–70 m).* No reference block set at M-1. Keep it, or move it by the dense core's ratio.
  - *Ribbon (30–50 m) and suburb (40–60 m).* No input in W-12's row. They stay as they are, recorded as not re-fitted.
    E06's FTG ring blocks are not among W-12's inputs.
* **O-8 The rung depth factors (1.10 / 1.00 / 0.95).**
  - These are not in W-12's list.
  - MFCG's block p50 moves 1.00 / 1.00 / 0.98 across sizes 40 / 80 / 130.
  - NG's `small` hoods' blocks are 8 % deeper than `medium`'s (NG sizes are hood sizes, not rungs).
  - Keep the factors and note the measurement, or route them to a design pass.
* **O-9 Publication precision.**
  - The fit publishes at 0.1 m, and the reproduction check reads that step.
  - The design writes whole metres. Whole-metre cells reproduce the inputs only within the quantile change of half a
    metre at each end. On the candidate metre sets that change is about 0.5 m at p10 and 0.6–0.8 m at p90 under EA, and
    0.3–0.4 m and 0.5–0.7 m under EB.
  - The ruling states the step it signs.
* **O-10 `cut.flattenM`.**
  - *FM-1.* Keep 0.7 m. It flattens 3 of NG's 731 kept bends (heights 1.68, 1.87 and 1.9993 model units, all filleted
    bends of 3–4.4°); the one-bend share goes 0.6603 → 0.6576.
  - *FM-2.* 0.58 m, the largest value that flattens none.
  - *FM-3.* No M-1 value: V12 §3.7.1 (c) and J-A37.01 place `cut.flattenM`'s calibration at M0 on the S8 harness, while
    plan row W-12 asks M-1 to fit it "against the bent-cut signature". The two texts point to different milestones.
  - *The evidence.* The kept heights do not show a sharp edge at two units: the count per 0.25 mu rises 1, 2, 3, 5, 9, 12
    from 1.5 mu. So the data bound the threshold from above (≤ 0.59 m if every kept bend is real) rather than locate it.
  - *Seat's lean (PLAUSIBLE).* FM-1 or FM-3. FM-1 is within one model unit of every kept bend, and the three lowest are
    filleted bends whose virtual corner is read from single leg segments.
* **O-11 The relative term `0.02 × |A–foot|`.**
  - On NG's recorded cuts, 23 of 731 kept bends lie below 0.02 × the snapped chord (the lowest is 0.0139), so the
    design's rule would lower the one-bend share by 0.021 (0.6603 → 0.6396). The largest factor that flattens none is
    0.013.
  - *RT-1.* Keep 0.02 and let M0's comparison judge (J-A37.01).
  - *RT-2.* 0.013.
  - Route it to the design seat as a correction of the flatten rule's provenance.
  - That NG's own relative test uses a different length than the snapped chord is PLAUSIBLE. It cannot be checked
    research-side without reading code.
* **O-12 The `modest` court cell's estimator and the deep definitions.**
  - *R-19's estimator.* The type-7 median over the 20 hoods, 0.4566.
  - *Alternatives.* The pooled count ratio 0.4623 and the `area` template's median 0.4571.
  - *The like-for-like question.* The catalogue's deep (radius > 1.5 × the median footprint short side, ≈ 10.8 m on NG)
    admits 597 NG blocks. The design's deep (`Block.depthClass`, local thickness > 2 d̄, radius > 24 m at `modest`, CITY)
    admits 98 of them, with a court share of 0.418 (41 / 98; hood median 0.3875 over 16 hoods).
  - §13.5's keep-test reads the share over design-deep blocks, while the reference row is over catalogue-deep ones.
  - Keep R-19's estimator, or re-state one side's deep. This is a definition question for the ruling or a design
    correction; this seat changes neither.
* **O-13 Share publication.**
  - Two decimals by largest remainder (each row sums to 1). Under that rounding, equal design values can round apart:
    `prosperous` back lane 0.15 and rear plots 0.14 both come from 0.1459.
  - Three decimals (0.146 / 0.146).
  - Or two decimals with the tie broken toward the design's own row.
* **O-14 The `MFCG` preset's court cell and its row.**
  - *The cell.* CS-M1, the type-7 median over 30 seeds, 0.8135 (R-19's analogue). CS-M2, the count ratio, 0.8145.
    CS-M3, per rung: 0.8101 / 0.8098 / 0.8143.
  - *The remainder (R-19 names the court cell only).* Ra renormalises `modest`'s other three shares in their proportions
    (0.1017 / 0.0509 / 0.0339). Rb puts all of it in rear plots (0.1865), with no lanes MFCG does not draw.
  - *A design-text note.* §7.6's list of rows carrying `presets` entries does not include the deep-interior shares. If
    the ruling keeps R-19's preset cell, the design seat adds the entry. R-19 is an existing ruling, so this is
    recorded, not new design.
* **O-15 MFCG's block population.**
  - All intramural cluster blocks (E09's blocks).
  - Blocks of ≥ 2 footprints. Single-footprint blocks pull p10 down by 1.3–4.6 m, EA's e_lo by 1.3–4.6 m and EB's
    e_lo by 2.6–8.8 m (TOWN the most).

## 6 The row's checker column (receipts; CONFIRMED, executed)

| check (plan row W-12) | result |
|---|---|
| the fitted `[e_lo, e_hi]` reproduce the inputs' p10 / p90 within rounding | F1 PASS: 27 / 27 EA pairs, worst deviation 0.974 of tolerance. F2 PASS: 72 / 72 fitted EB pairs in independent 400 000-block simulations, worst 0.983 of tolerance. 9 EB pairs (three NG `small` sets × three variants) have no fit because their spread is below the law's minimum. They are descriptive size sets and none is a candidate (section 4.2) |
| the shares of every band sum to 1 | C1 PASS: R-19's rows to within 1e-12 and exactly in both published forms; both alternative NG rows; both MFCG preset rows; every share in [0, 1]; court cells ≤ 1 |
| no block band is signed before this lands (J-A34.01) | J1 PASS at 05:58: no W-15 or W-20 landing, result, band-writing script or crossing ledger row. This fit half signs nothing; W-12 lands with its ruling |

## 7 Calls made under delegation (J122; each vetoable, none changes a design cell or a ruling)

1. **Both readings fitted (EA and EB) rather than one.** The plan's checker does not say which quantity "reproduces"
   the inputs. Choosing one silently would be the ruling's call.
2. **EB's idealisation: rectangles, three start variants, a degree-6 smooth in ln r, and inversion on the spread's
   running maximum.**
   - The raw tables are noisy point by point (MC standard error of the spread ≈ 0.003) and flat near r = 1.
   - The first run interpolated pooled-adjacent-violator tables. It failed F2 on 2 of 72 pairs by up to 1.15 × the
     tolerance, from table noise the check did not count. The smooth replaced it, and the failing run's numbers are
     superseded.
3. **The tolerance is "within rounding" made exact.** It is the quantile change caused by half a publication step at
   each end, plus three MC standard errors for EB, at a 0.1 m step (0.01 relative).
4. **The hood (or seed) as the bootstrap unit.** Blocks in one hood are not independent.
5. **Free ends at the drawn end in the bend heights.** 323 of 1 462 ends are free. A both-snapped subset (414 bends)
   has the same lowest height, 1.68 mu.
6. **All intramural cluster blocks as MFCG's primary set** (E09's definition), with the ≥ 2-footprint companion beside
   it.
7. **CITY's depth factor (1.00) as the basis of every depth-row candidate.** NG's hood has no rung; MFCG's floors are
   per rung and floors are not scaled by the factor.
8. **Largest-remainder rounding for the published shares**, so that each row sums exactly to 1.
9. **The design-deep proxy** at the current `modest` d̄ (24 m, CITY): inscribed radius > d̄. This is circular under a
   re-fit of the depth rows, and is reported as information for O-12 only.

## 8 Hand-off note

* **To the W-12 ruling seat (Fable).**
  - Section 5's O-1 … O-15 are the open choices. Every candidate value with its inputs is in sections 4.1–4.9 and the
    JSON's `candidates`, `designNowForwardCITY`, `flatten` and `shares`.
  - The ruling half writes the numbers table with provenance "M-1 ⟨date⟩", the hand-off note to the design seat, and
    R-20 (2) and (6)'s digest entry texts.
  - **Deliberately deferred to the ruling half (documented, not a bug to re-find):** the digest entry texts and the
    provenance-stamped numbers table. Their values do not exist until the ruling chooses.
* **To W-15.** No row is formed here, and none is needed: D21 and D32 have no `baselines.json` row (plan section 1). W-15's
  `block.area` band is the band J-A34.01 holds until W-12 lands.
* **To the design seat (through the session, after the ruling).**
  - The cells the ruling signs: the depth rows, the floors, `cut.flattenM`, the deep-interior shares and the `MFCG`
    preset entry.
  - O-11's relative term and O-12's deep definitions, if the ruling routes them as corrections.
  - O-14's §7.6 list entry.
* **To M0 (through the digest, R-20).** Nothing until the ruling.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed).**
* Every number in sections 4.1–4.9.
* The 12 tool checks.
* Determinism: two processes wrote byte-identical outputs.
* The six red runs.
* The inputs' reproduction of E11, E09 and E10 (I1–I4).
* The design strings (D0).
* g's mean and quantiles (S1, S2).
* J1's evidence at the time of the run.

**PLAUSIBLE (reasoning).**
* That EB's rectangles transfer the law's quantiles to NG's and MFCG's irregular faces closely enough. The variants
  test the start shape, not curvature, holes or the ladder; M0's S8 harness is the place where that is settled.
* That NG's `medium` hood is the `modest` comparator (R-19, plan section 10).
* That MFCG's cluster blocks stand for its generator's blocks inside the walls. They are footprint unions; E09 section 2.
* That the three kept bends below two model units reflect the virtual corner's reading on filleted bends rather than
  NG's threshold.
* That NG's relative flatten test uses a different length than the snapped chord.
* The seat's leans in O-1 and O-10.

## 10 Content scan and disk

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E12-depth-refit.md --heads docs/ARCHITECTURE.md`
on this record as landed: C1 0, C2 0, C4 0, S1 0, S2 0; C3 50 hits with 43 unreviewed. Every C3 hit was read. Each
is a run of digits from our own tables (share rows, histogram counts, metre ranges) or a short phrase of our own prose
("the design s own", "end is the drawn end", "not the generator s"); none is a reference word list, palette, grammar or
identifier. The exit status is 1 by that unreviewed count. This record is outside the design set, so no allow rows are
added (the precedent of W-10 and W-11b). A first scan flagged one S2 pointer: a section sign before E11's own section
number. The record's pointers to E-records now say "section", and design pointers keep the section sign. Disk: 11 GiB
free at the start and the end. The JSON is 0.15 MB, the tool 50 KB, and the scratch runs live in the session
scratchpad.

---

# Part II — the ruling (lane `m1/W-12`, Fable; each decision vetoable, J122)

## 11 Outcome and the rulings on section 5's choices

**Outcome.** W-12 lands. The `modest` plot-depth row moves from 18–30 m to **24–48 m**, the other three rows by the
same lo and hi ratios (poor 16–32, prosperous 33–64, rich 40–96 m); the dense-core floor's lo end moves from 30 m to
**37 m** (its hi end and the three other floors unchanged, not re-fitted); `cut.flattenM` stays **0.7 m** (confirmed
within NG's bound, not moved); the deep-interior shares become **poor 0.355 / 0.248 / 0.298 / 0.099, modest 0.457 /
0.296 / 0.148 / 0.099, prosperous 0.659 / 0.146 / 0.049 / 0.146, rich 0.761 / 0.096 / 0.000 / 0.143**, and the
`MFCG` preset's row **0.813 / 0.000 / 0.000 / 0.187**. The row's three checks pass on the ruled values (section 15:
5 / 5 ruled checks, exit 0; the fit's 12 / 12 stand). Three corrections the measurements require are routed to the
design seat (section 13, D-1 … D-3) with their numbers; this seat edits no design file.

**What the ruling rests on (CONFIRMED by computation unless marked).** The design's stop law draws each face's
threshold τ in `[e_lo, e_hi]` with `g` heaped near 0, so the blocks it leaves have a spread p90 / p10 no narrower than
1.74 and reach NG's spread (2.05 pooled, 1.82 on the `area` template) only when `e_hi` is two to four times `e_lo`.
`e_hi` is therefore a tail parameter of the law — τ's own p90 under the ruled `modest` range [48, 96] is 48 × 2^0.48 =
67 m — and not the deepest block the law produces (the ruled `modest` range leaves blocks of p10 / p50 / p90 30.2 /
42.3 / 54.9 m). Every cell that reads `e_hi` as "the deepest block" (`e_hi²`, §4.6's substitution bound) therefore
widens with the re-fit; section 13 lists the consequence for the design seat. The design as written today leaves
`modest` blocks of 21.9 / 30.5 / 38.8 m at CITY against NG's 27.8 / 39.0 / 57.0 m — J-A34.01's prediction ("the same
numbers would give smaller blocks") confirmed by the forward run.

| choice | ruling | reason |
|---|---|---|
| **O-1** reading | **EB** (the recursion's leaves), variant V1 primary; EA recorded, not adopted | J-A34.01's own reason is the leaves reading; §13.5's blocks row compares L2 built blocks (the leaves) with NG's blocks, not the threshold. The three start-face variants move the adopted pair by ≤ 0.1 m (section 4.1), so the idealisation does not decide the cell. M0's S8 harness replaces the idealisation with the product's own faces (V12 §3.7.1 (c)) |
| **O-2** NG comparator | **the `area` template at `medium`** (5 hoods, 194 blocks); the pooled 20 hoods recorded as the alternative, the other templates as companions | §13.6 (2) pairs the `area` template with the base's own `bent-cut` fabric. The pooled set's hi end (e_hi 159 m) is pulled by the `ring` and `street` templates' tails (their own EB fits reach 202 and 248 m), which are template road layouts, not the `modest` fabric. The ruled range run forward sits within 2.5 / 3.2 / −2.1 m of the pooled set's p10 / p50 / p90 and within 6.2 m of every template's at either end (section 15, R3). A veto flips one cell: `modest` 20–80 m with the pooled ratios (poor 13–53, prosperous 28–106, rich 33–159) |
| **O-3** unit | **declared metres** (R-01, 0.35 m per model unit); the relative fits stay descriptive companions | the design's cells are metres; tying the depth rows to the footprint scale would be new design (J156) |
| **O-4** the cell | **the `modest` plot-depth row** (§4.7 S10 (2)'s band table, "depth (m)"), with `e = 2 d` unchanged; the floor is not the vehicle for NG | J-A34.01 says the rows "change meaning" and are re-fitted under the per-face reading; §4.6 step 1 says so in the design's text. NG has no regime, and M0-b-05a applies *the depth rows* to the NG faces (M0.md, AFTER-M-1 (3)), so a floor would never reach M0's check. The plot-depth consequence (24–48 m `modest` plots; a burgage's depth) is realistic; the pooled alternative's 20–80 m is the reason O-2 chose the `area` template |
| **O-5** the other bands | **moved by the `modest` fit's lo and hi ratios 1.3222 / 1.6067** (47.6 / 36 and 96.4 / 60) | the law shrinks every band's blocks by the same mechanism, so the correction is common; R-19's ratio rule is the precedent; unchanged rows would leave the bands out of order (`modest` hi 48 above `prosperous` hi 40). The forward run keeps poor < modest < prosperous < rich at p10, p50 and p90 (section 15, R3) |
| **O-6** MFCG and the dense-core floor | **the floor's lo end re-fitted from MFCG's 30 pooled plain seeds under EB-V1: 36.9 → 37 m; the hi end (45 m) not re-fitted** | MFCG's intramural blocks are the walled core's comparator for a block-depth *minimum* (M0.md calls the floors "regime block-depth minimums"), and the EB lo end is steady: 36.9 pooled, 32.9 / 34.9 / 37.9 by rung, bootstrap 35.4–38.3. The fitted hi ends (313–492 m by rung, 351 pooled) are the law's requirement to reproduce MFCG's spread of 2.4–2.7, which comes from footprint unions closed at 3 m (E09 section 2), not from the generator's faces; as a floor on every band's `e_hi` they would set every dense-core band's upper block area to 12–24 ha. The pair [37, 351] reproduces MFCG's pooled p10 / p90 (section 15, R2), so 37 m is the whole-metre form of the fit, not a chosen number. The floor binds the `poor` band's lo at every rung (2 × 16 × 1.10 / 1.00 / 0.95 = 35.2 / 32.0 / 30.4 < 37) and nothing else |
| **O-7** the other floors | walled rings 45–70, ribbon 30–50, suburb 40–60 m **unchanged, recorded as not re-fitted** | no reference block set among W-12's inputs (E06's FTG ring blocks are not in the row). After the re-fit the walled-rings floor still shapes `poor` (its 2 d = [32, 64]) and nothing else |
| **O-8** the rung depth factors | **kept** (1.10 / 1.00 / 0.95); the measurement recorded for the design seat | not in W-12's row; a design cell with its own reasons (§1.1). The measurement: MFCG's block p50 is 1.00 / 1.00 / 0.98 of CITY's by rung and NG's `small` hoods are 8 % deeper than `medium` (hood sizes, not rungs) — size barely moves block depth |
| **O-9** precision | **whole metres on d** (so even metres on e), the design's own step; the reproduction check re-run at that step | the design writes whole metres; the check at the signed step passes with the worst deviation 0.29 of its tolerance (section 15, R1) |
| **O-10** `cut.flattenM` | **FM-1: 0.7 m stands**; the provenance note gains the M-1 receipt | the data bound the value from above (≤ 0.59 m if every kept bend is real) and show no edge at two model units (the count per 0.25 mu rises 1, 2, 3, 5, 9, 12 from 1.5 mu), so they cannot locate it; 0.7 m flattens 3 of 731 kept bends (one-bend share 0.660 → 0.658), all three filleted bends of 3–4.4° whose virtual corner is read from single leg segments (PLAUSIBLE); J-A37.01 and V12 §3.7.1 (c) make M0-b-05b, on NG's recorded faces, the calibration. The `MFCG` preset's 8 m: unchanged, not measured (no MFCG cut data in the row) |
| **O-11** the relative term 0.02 × \|A–foot\| | **RT-1: 0.02 stands**; the 23 bends carried to M0-b-05b through the digest | the term is a reading of the reference's own test (P5), not an M-1 cell, and M-1 reads no code (the clean room); whether NG's own length is the snapped chord cannot be settled research-side (PLAUSIBLE that it differs). The measurement — 23 of 731 kept bends below 0.02 × the chord, the one-bend share 0.660 → 0.640 if applied, the largest factor flattening none 0.013 — reaches the seat that runs the rule on NG's faces (J-A37.01) in section 14's entry (2) |
| **O-12** the court estimator and the deep definitions | **R-19's estimator stands (0.457)**; the design's deep test is routed as correction **D-1** | R-19 is a standing ruling and the alternatives differ by < 0.006 (0.462, 0.457). The like-for-like question is real and decisive (section 15, R5): the design's test (`thickness > 2 d̄`) admits 98 of NG's 597 catalogue-deep blocks today (court share 0.418) and **3 at the ruled d̄ of 36 m** (court 0), so §13.5's keep-test would read an empty population. The reference's deep population is thickness > 21.6 m at NG's scale — 0.9 d̄ today, 0.6 d̄ ruled; at 1 × d̄ ruled it admits 318 (0.472), at 0.75 × d̄ 535 (0.486) |
| **O-13** share publication | **three decimals, largest remainder** | each row sums to 1 exactly and equal design cells stay equal (`prosperous` back lane = rear plots 0.146); two decimals would split them 0.15 / 0.14 |
| **O-14** the `MFCG` preset's cell and row | **CS-M1 0.8135 → 0.813; remainder Rb (all rear plots: 0.813 / 0 / 0 / 0.187)**; §7.6's list entry routed as correction **D-3** | CS-M1 is R-19's estimator applied to MFCG (CS-M2 0.8145 and CS-M3 0.810–0.814 agree within 0.004). MFCG's mechanism either removes a deep block's inner plots (a court) or keeps them (the design's `rear_plots`); it inserts no lane or alley spine, so Ra's lanes would be shares MFCG never draws |
| **O-15** MFCG's block population | **all intramural cluster blocks** (E09's definition); the ≥ 2-footprint companion recorded (its lo 41.7 m) | E09's rows and R-22's twin use that population; a single-footprint block ringed by streets is a block |

## 12 The numbers table — provenance "M-1 2026-10-04" (E12; the fit `fit_depth_rows.py`, the ruling lane `m1/W-12`)

Depth rows at the CITY basis (depth factor 1.00; the rung factors unchanged). `e = 2 d` is the derived block range,
floored by the regime. "Forward" is the block minor extent the law leaves (EB-V1, 400 000 blocks, no floor).

| cell | old | **new (M-1 2026-10-04)** | derived block range e | forward p10 / p50 / p90 (m) | fitted from |
|---|---|---|---|---|---|
| `poor` depth (m) | 12–20 | **16–32** | [32, 64] | 20.1 / 28.2 / 36.5 (dense core, floored [37, 64]: 22.7 / 31.6 / 40.4) | ratio |
| `modest` depth (m) | 18–30 | **24–48** | [48, 96] | 30.2 / 42.3 / 54.9 | NG `area` / `medium`, 5 hoods, 194 blocks, p10 / p90 30.0 / 54.6 m; EB-V1 [47.6, 96.4] |
| `prosperous` depth (m) | 25–40 | **33–64** | [66, 128] | 41.3 / 57.7 / 74.6 | ratio |
| `rich` depth (m) | 30–60 | **40–96** | [80, 192] | 51.9 / 73.1 / 97.0 | ratio |
| dense-core floor (m) | 30–45 | **37–45** | — | — | lo: MFCG plain, 30 seeds, 20 359 intramural blocks, p10 / p90 28.9 / 70.3 m; EB-V1 [36.9, 350.6], lo adopted |
| walled-rings floor (m) | 45–70 | 45–70 (not re-fitted) | — | — | no reference set |
| ribbon floor (m) | 30–50 | 30–50 (not re-fitted) | — | — | no reference set |
| suburb floor (m) | 40–60 | 40–60 (not re-fitted) | — | — | no reference set |
| rung depth factor TOWN / CITY / METROPOLIS | 1.10 / 1.00 / 0.95 | unchanged | — | — | measured: MFCG block p50 1.00 / 1.00 / 0.98 of CITY by size |
| `cut.flattenM` (base) | 0.7 m | **0.7 m (confirmed)** | — | — | NG's 731 kept one-bend cuts: lowest height 0.59 m declared; 3 below 0.7 m; one-bend share 0.660 → 0.658 |
| `cut.flattenM` (`MFCG` preset) | 8 m | 8 m (not measured) | — | — | — |
| shares `poor` (court / back lane / through-alley / rear plots) | 0.35 / 0.25 / 0.30 / 0.10 | **0.355 / 0.248 / 0.298 / 0.099** | — | — | ratio 1.0148 on court; the rest renormalised |
| shares `modest` | 0.45 / 0.30 / 0.15 / 0.10 | **0.457 / 0.296 / 0.148 / 0.099** | — | — | NG `block.courtShare`, 20 `medium` hoods, type-7 median 0.4566 (276 of 597 deep blocks) |
| shares `prosperous` | 0.65 / 0.15 / 0.05 / 0.15 | **0.659 / 0.146 / 0.049 / 0.146** | — | — | ratio |
| shares `rich` | 0.75 / 0.10 / 0 / 0.15 | **0.761 / 0.096 / 0.000 / 0.143** | — | — | ratio |
| shares, `MFCG` preset | (no entry) | **0.813 / 0.000 / 0.000 / 0.187** | — | — | MFCG inner-plot removal, 30 plain seeds, type-7 median 0.8135 (8 157 of 10 015 deep blocks pooled) |

The alternatives a veto would reach, with their receipts in Part I: `modest` from the pooled 20 hoods (EB-V1 [39.6,
159.2] → 20–80 m; ratios 1.1 / 2.6533); the EA reading ([28.5, 111.5] on `area`, [26.1, 134.5] pooled); the dense-core
floor by rung (lo 33 / 35 / 38 m); the ≥ 2-footprint MFCG population (lo 42 m); the count-ratio court cell (0.462);
remainder Ra for the `MFCG` row (0.813 / 0.102 / 0.051 / 0.034).

## 13 Hand-off note to the design seat (through the session; by amendment, reported not asked — plan section 5 (8), J-A34.01)

**Cells (section, old value, new value; provenance "M-1 2026-10-04 (E12)").**

| id | section | old | new | measured by |
|---|---|---|---|---|
| C-1 | §4.7 S10 (2) band table, "depth (m)", `poor` | 12–20 | 16–32 | E12 section 12 (ratio of C-2) |
| C-2 | §4.7 S10 (2) band table, "depth (m)", `modest` | 18–30 | 24–48 | E12 section 12; E11 section 10.5 (NG `area` / `medium` block minor extents) |
| C-3 | §4.7 S10 (2) band table, "depth (m)", `prosperous` | 25–40 | 33–64 | E12 section 12 (ratio) |
| C-4 | §4.7 S10 (2) band table, "depth (m)", `rich` | 30–60 | 40–96 | E12 section 12 (ratio) |
| C-5 | §4.4 stage regimes, dense core (walled), "block-depth band floor" | 30–45 m (applied by S8) | 37–45 m (applied by S8; the lo re-fitted at M-1 on MFCG's intramural blocks, E12) | E12 section 12; E09 section 6 |
| C-6 | §4.6 step 5, `cut.flattenM`'s provenance note | "an inference, recalibrated at M-1 on the bent-cut signature of §13.5" | "an inference; M-1 (E12) bounds it from above — NG's lowest kept one-bend height is 0.59 m declared (1.68 model units), 3 of 731 kept bends lie below 0.7 m and the one-bend share under the rule is 0.658 against the recorded 0.660 — and M0-b-05b calibrates it on NG's recorded faces (J-A37.01)" | E12 section 4.8 |
| C-7 | §4.6 the deep-interior rule, "Default shares — …" | poor 0.35 / 0.25 / 0.30 / 0.10; modest 0.45 / 0.30 / 0.15 / 0.10; prosperous 0.65 / 0.15 / 0.05 / 0.15; rich 0.75 / 0.10 / 0 / 0.15 | poor 0.355 / 0.248 / 0.298 / 0.099; modest 0.457 / 0.296 / 0.148 / 0.099; prosperous 0.659 / 0.146 / 0.049 / 0.146; rich 0.761 / 0.096 / 0 / 0.143 — provenance M-1 2026-10-04 (E12): NG's court share 0.457 sets `modest`, the other court cells move by 1.0148 (R-19), the rest renormalised; the `MFCG` preset's row 0.813 / 0 / 0 / 0.187 (MFCG's inner-plot removal, the remainder as rear plots: MFCG inserts no lane) | E12 section 12; E11 section 10.3; E09 section 7 |
| C-8 | §4.6 step 1, "the depth rows and the regime floors are re-fitted at M-1 under this reading" | (as is) | add "(E12, 2026-10-04)" | — |
| C-9 | §13.5 blocks row, the clause "… are re-fitted at M-1 … before this band is signed (item 34; J-A34.01)" | (as is) | the condition is met by W-12's landing; W-15 may sign `block.area` | this record |

**Corrections the measurements require (DC form; the design seat applies them, the owner may veto).**

| id | section | old | new (recommended) | measured by |
|---|---|---|---|---|
| D-1 | §4.6 the deep-interior rule and §2.5 `Block.depthClass`: `deep` when "the block's local thickness exceeds twice its band's plot depth"; §13.5's deep-interior row reads the court share over those blocks | thickness > 2 d̄ | a like-for-like population (J-V12.5): `deep` when the block's inscribed radius exceeds 1.5 × the band's median footprint short side (the reference row's own definition, R-20 (4); on NG 21.6 m of thickness), or, if the rule must stay in d̄, a factor the reference's population supports (≤ 0.6 d̄ at the ruled rows). At 2 d̄ the test admits 98 of NG's 597 deep blocks today and 3 at the ruled d̄ = 36 m, so the keep-test would judge a court share over an empty set | E12 section 15 (R5): 597 / 578 / 98 blocks at thickness > 0.75 / 1 / 2 × d̄ (d̄ 24 m); 597 / 535 / 318 / 3 at > 0.5 / 0.75 / 1 / 2 × d̄ (d̄ 36 m) |
| D-2 | §7.6, the preset resolution rule for the `NG` parity preset ("a cell resolves under it to its own `presets.NG` entry, else as it resolves under `MFCG`") | the deep-interior shares would resolve under `NG` to the `MFCG` entry (0.813) | the `NG` preset reads the default row for the rows M-1 calibrated on NG (the deep-interior shares: 0.457 at `modest`), by whichever mechanism §7.6 prefers (an exception clause, or an `NG` entry equal to the default) | E12 section 12; E11 section 10.3 (NG's own share 0.457 against MFCG's 0.813) |
| D-3 | §7.6, "Rows carried with `presets` entries: …" | the deep-interior shares absent | add the deep-interior shares (§4.6; the `MFCG` entry 0.813 / 0 / 0 / 0.187; `FTG` reads the default) | R-19; E12 section 12 |

**Consequences the design seat should see (no cell change asked; the owner may want a word).**

1. **`e_hi` is a tail parameter under the per-face law.** The upper block area `e_hi²` (J-A34.42; §4.6's district
   claims, the substitution bound "faces ≤ 2 × the band's upper block area") rises at CITY from 0.36 to 0.92 ha at
   `modest`, 0.16 → 0.41 ha `poor` (0.20 → 0.41 floored), 0.64 → 1.64 ha `prosperous`, 1.44 → 3.69 ha `rich`, while the blocks the law
   actually leaves have p90 of 36–97 m (section 12). If those readers meant "the deepest block", the design seat may
   prefer τ's own p90, `e_lo · (e_hi / e_lo)^0.48`, there (`modest` 67 m, 0.45 ha); that is a design reading, not an
   M-1 number.
2. **The reflex pre-cut and §4.6 step 8's "deeper than the band's plot depth"** read d̄, which moves from 24 to 36 m at
   `modest` (poor 16 → 24, prosperous 32.5 → 48.5, rich 45 → 68).
3. **The `modest` hi end is weakly identified** (the law's spread is flat for r between 1 and 2): the hood bootstrap
   gives e_hi 78–153 m (d_hi 39–77) around the signed 96 (48), and 211 of 1 000 resamples have no fit at all. The lo
   end is firm (e_lo 42–52 m). M0's reference run on the S8 harness (V12 §3.7.1 (c)) is where the hi end is confirmed
   on real faces; the signed cell is the M-1 start value, as M0.md's AFTER-M-1 (3) asks.
4. **Size.** The rung depth factors stand; MFCG's blocks move 1.00 / 1.00 / 0.98 across sizes 40 / 80 / 130 (TOWN /
   CITY / METROPOLIS), so the 1.10 TOWN factor is not what MFCG does. Recorded, not a correction (not in the row).

**To W-15.** J-A34.01's hold releases with this landing: `block.area`'s band may be signed. No `baselines.json` row
comes from W-12 (D21 and D32 have none, plan section 1).

**To W-17.** Section 14's two texts.

## 14 The digest entry texts for W-17 (R-20 (2) and (6); our words, numbers only — W-17 restates them in the digest's form)

**Entry (2) — the re-fitted depth rows and regime floors (E12, M-1 2026-10-04).**

> The plot-depth rows of §4.7's band table and the dense-core floor of §4.4 were re-fitted at M-1 under §4.6 step 1's
> per-face stop law, read as the blocks the recursion leaves (not the threshold itself): each face draws τ in
> [e_lo, e_hi] with g = |(u₁+u₂+u₃+u₄)/2 − 1|, e = max(2 d, floor), and the fitted pair is the one whose leaves have the
> reference's block p10 and p90 (minor extent of the minimum-area rectangle). The law's leaves have a p90 / p10 spread
> of at least 1.74 and reach the references' spreads only with e_hi / e_lo between 2 and 4, so e_hi is the rarely
> drawn top of the range, not the deepest block.
>
> NG's comparator is the `area` template at `medium` (5 hoods, 194 bounded built blocks, declared metres at 0.35 m per
> model unit): p10 / p50 / p90 30.0 / 39.7 / 54.6 m. Fitted range [47.6, 96.4] m, signed at whole metres as the
> `modest` row 24–48 m (block range [48, 96]); the other rows by the same ratios (lo × 1.3222, hi × 1.6067): poor 16–32,
> prosperous 33–64, rich 40–96 m (old 12–20, 18–30, 25–40, 30–60). Run forward at CITY the law now leaves blocks of
> p10 / p50 / p90 poor 20.1 / 28.2 / 36.5, modest 30.2 / 42.3 / 54.9, prosperous 41.3 / 57.7 / 74.6, rich 51.9 / 73.1 /
> 97.0 m (the old rows gave modest 21.9 / 30.5 / 38.8 against NG's 27.8 / 39.0 / 57.0 pooled). The pooled 20 hoods
> (608 blocks, 27.8 / 39.0 / 57.0 m) would need [39.6, 159.2]; the ruled range sits within 2.5 / 3.2 / −2.1 m of their
> p10 / p50 / p90 and within 6.2 m of every template's at either end. The hi end is weakly identified (bootstrap 78–153
> m); M0-b-05a's reference run on the S8 harness confirms it on real faces.
>
> The dense-core floor's lo end moves from 30 to 37 m: MFCG's 20 359 intramural cluster blocks over 30 plain seeds
> (10 per size 40 / 80 / 130) have p10 / p50 / p90 28.9 / 45.5 / 70.3 m and fit [36.9, 350.6] under the same reading
> (by size the lo is 32.9 / 34.9 / 37.9); the fitted hi end is not adopted (it answers a spread of 2.4 that comes from
> footprint unions closed at 3 m) and the floor's hi end stays 45 m. The walled-rings, ribbon and suburb floors
> (45–70, 30–50, 40–60 m) and the rung depth factors (1.10 / 1.00 / 0.95) are unchanged, not re-fitted (no reference
> set; MFCG's block p50 moves 1.00 / 1.00 / 0.98 across the three sizes). Rounding: the signed pairs reproduce their
> inputs' p10 / p90 within the quantile change of half a metre at each end plus three Monte Carlo standard errors
> (modest: 30.2 / 54.8 against 30.0 / 54.6; floor pair: 28.9 / 70.6 against 28.9 / 70.3).
>
> `cut.flattenM` stays 0.7 m: on NG's 731 kept one-bend cuts over the 20 `medium` hoods the lowest kept bend height is
> 0.59 m declared (1.68 model units), 3 lie below 0.7 m, and the rule at 0.7 m leaves the one-bend share at 0.658
> against the recorded 0.660; the data bound the value from above and show no edge at two model units. The relative
> term 0.02 × |A–foot|, applied to the snapped chords, would flatten 23 of the 731 (share 0.640); the largest factor
> flattening none is 0.013. Both reach M0-b-05b's calibration on NG's recorded faces.
>
> The cells reach M0 as `granularity.json` (depth rows), `regimes.json` (the floor) and `cut.json` (`cut.flattenM`),
> provenance "M-1 2026-10-04"; the design amendment is the record of the same numbers.

**Entry (6) — the deep-interior shares (E12, M-1 2026-10-04; R-19).**

> The `modest` band's court cell is NG's `block.courtShare` over the 20 `medium` hoods: the type-7 median of the 20
> per-hood shares, 0.457 (the pooled count 276 of 597 deep blocks, 0.462). A deep block there is one whose largest
> inscribed circle has radius above 1.5 × the map's median footprint short side (about 10.8 m declared), and a court
> is an interior component of at least half the median footprint area that touches no block edge (E11's definition,
> entry (4)). The other bands' court cells move by the same ratio, 0.457 / 0.45 = 1.0148, capped at 1; each band's
> back lane, through-alley and rear plots are renormalised to 1 − court in their design proportions; rows are published
> at three decimals by largest remainder so each sums to 1 exactly: poor 0.355 / 0.248 / 0.298 / 0.099, modest 0.457 /
> 0.296 / 0.148 / 0.099, prosperous 0.659 / 0.146 / 0.049 / 0.146, rich 0.761 / 0.096 / 0.000 / 0.143 (old 0.35 / 0.25 /
> 0.30 / 0.10, 0.45 / 0.30 / 0.15 / 0.10, 0.65 / 0.15 / 0.05 / 0.15, 0.75 / 0.10 / 0 / 0.15).
>
> The `MFCG` preset's row is 0.813 / 0.000 / 0.000 / 0.187: MFCG's inner-plot removal leaves an unbuilt interior in
> 0.8135 of its deep cluster blocks (the type-7 median over the 30 usable plain seeds; 8 157 of 10 015 pooled; 0.810–
> 0.814 by size), and the remainder is rear plots because MFCG keeps a deep block's inner plots or removes them and
> inserts no lane or alley.
>
> Like for like: the design's own deep test (local thickness above twice the band's plot depth) admits 98 of NG's 597
> deep blocks at the old `modest` depth (court share 0.418) and 3 at the re-fitted one; the reference's population is
> thickness above 21.6 m, so the keep-test's population must be the reference's (E12 section 13, D-1) for the shares to
> be judged on the blocks they were measured on. The shares reach M0 as `interior.json` cells, provenance "M-1
> 2026-10-04".

## 15 The row's checks re-run on the ruled values (CONFIRMED, executed)

Script: `w12_ruled_check.py` (session scratchpad `m1w3/`, sha256 `9303a8bdce77eab0…`; its text is appendix 15.1 so
the record is self-contained). It imports `fit_depth_rows.py` unmodified (sha256 `37d9c65efbc653b3…`: the EB
simulation, the type-7 quantile, the verification and share helpers) and the smoothed EB tables of
`E12-depth-refit.json` (sha256 `43b9c4a53a17578a…`, `ebSettings.tables[*].poly10 / poly90`). Run at nice 10 with
bytecode off, one process, 11 GiB free, memory 72 % free: **5 / 5 PASS, exit 0**; the JSON `w12_ruled_check.json`
(sha256 `78902370e0ec9084…`) beside it.

| id | check | result |
|---|---|---|
| R1 | the ruled `modest` block range [48, 96] m (d [24, 48] at whole metres) reproduces the `area` template's p10 / p90 (30.04 / 54.64) under EB in a fresh seeded simulation of 400 000 blocks, within the whole-metre envelope + 3 MC s.e. | PASS: V1 30.23 / 54.85 (dev +0.19 / +0.21, tol ±0.65 / ±1.05, worst 0.29); V2 30.20 / 54.84 (0.24); V3 30.20 / 54.87 (0.25) |
| R2 | MFCG's pooled fit at whole metres [37, 351] reproduces MFCG's pooled p10 / p90 (28.86 / 70.34); the lo end is the floor's new lo | PASS: 28.93 / 70.58 (dev +0.06 / +0.24, tol ±0.43 / ±0.96, worst 0.25) |
| R3 | the ruled rows run forward at CITY (EB-V1, 400 000 blocks per band): p10, p50 and p90 each rise poor < modest < prosperous < rich, with and without the dense-core floor | PASS: section 12's forward column; the floor binds `poor`'s lo only. The `modest` forward against NG: area +0.2 / +2.5 / +0.2, street +6.2 / +2.8 / −1.6, square −0.2 / +1.6 / −5.9, ring +3.7 / +3.9 / −3.2, pooled +2.5 / +3.2 / −2.1 m |
| R4 | the shares of every band sum to 1 at the signed precision (three decimals, largest remainder), R-19's four rows and the `MFCG` row Rb; every share in [0, 1] | PASS (section 12's rows) |
| R5 | the deep-rule census on NG's 597 catalogue-deep blocks (276 courts) under the design's test at d̄ 24 m (today) and 36 m (ruled) | PASS (the counts reproduce E11's 597 / 276): at d̄ 24, thickness > 2 / 1 / 0.75 / 0.5 × d̄ admits 98 / 578 / 597 / 597 (court 0.418 / 0.478 / 0.462 / 0.462); at d̄ 36, 3 / 318 / 535 / 597 (0.000 / 0.472 / 0.486 / 0.462) |

The plan row's three checks, on the ruled values: (1) the fitted `[e_lo, e_hi]` reproduce the inputs' p10 / p90 within
rounding — R1 and R2 at the signed whole-metre step (Part I's F1 / F2 at 0.1 m stand for every candidate); (2) the
shares of every band sum to 1 — R4; (3) no block band is signed before this lands — Part I's J1 (05:58), re-checked at
the ruling's close: no `m1/W-15` or `m1/W-20` LANDED line, no W-15 / W-20 result file, no `rows.py` / `bands.py` /
`cross_check.py` in `research/baselines/`. This record signs no band; it releases J-A34.01's hold.

### 15.1 Appendix — `w12_ruled_check.py` (our own code; standard library plus `fit_depth_rows.py`)

```python
#!/usr/bin/env python3
"""W-12 ruling half (lane m1/W-12): re-run the fit's reproduction checks on the RULED values.

Imports research/baselines/fit_depth_rows.py unmodified (its EB simulation, type-7 quantiles, verification and share
helpers) and the smoothed EB tables it recorded in docs/calibration/E12-depth-refit.json (poly10 / poly90 per variant).
Everything here is our own code and numbers. Writes one JSON to the scratchpad and prints a short table.

Checks:
  R1  the ruled modest block range [48, 96] m (d = [24, 48], whole metres; e = 2 d) reproduces the area template's
      p10 / p90 under EB (V1, and V2 / V3 beside) within the whole-metre rounding envelope + 3 MC s.e.
  R2  the dense-core floor's lo (37 m) is the whole-metre form of MFCG's pooled EB-V1 fit: the pair [37, 351] reproduces
      MFCG pooled p10 / p90 within the same envelope (the hi end is recorded, not adopted)
  R3  the ruled rows run forward at CITY (EB-V1, 400 000 blocks per band): block p10 / p50 / p90 per band, with and
      without the dense-core floor [37, 45]; the modest forward against every NG medium set
  R4  the published shares (three decimals, largest remainder) sum to 1: R-19's four rows and the MFCG preset row Rb
  R5  the deep-rule census on NG's 597 catalogue-deep blocks: design-deep at d-bar 24 (today) and 36 (ruled)
"""
import json
import math
import os
import sys

ROOT = '/Users/cstokes/Desktop/Maps'
sys.dont_write_bytecode = True
sys.path.insert(0, os.path.join(ROOT, 'research', 'baselines'))
import fit_depth_rows as F  # noqa: E402

E12 = json.load(open(os.path.join(ROOT, 'docs', 'calibration', 'E12-depth-refit.json')))
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'w12_ruled_check.json')

# ---------------------------------------------------------------- the ruled values
RULED_D = {'poor': (16.0, 32.0), 'modest': (24.0, 48.0), 'prosperous': (33.0, 64.0), 'rich': (40.0, 96.0)}
RATIO = (47.6 / 36.0, 96.4 / 60.0)          # the area-template EB-V1 fit over the design's modest e = [36, 60]
FLOOR_DENSE = (37.0, 45.0)                   # lo re-fitted (MFCG pooled EB-V1 36.9 -> 37), hi unchanged
STEP_D = 1.0                                 # whole metres on d, so 2 m on e


def tables():
    T = {}
    for v, t in E12['ebSettings']['tables'].items():
        T[v] = {'P10': tuple(t['poly10']), 'P90': tuple(t['poly90']), 'minRatio': t['minRatio'], 'maxRatio': t['maxRatio'],
                'rAtMinRatio': t['rAtMinRatio']}
    return T


def repro(T, variant, e_lo, e_hi, half_e, p10, p90, label):
    """the fit's F2 check at an arbitrary publication half-step on e"""
    v10, v90, se10, se90, nb = F.verify_eb(variant, e_lo, e_hi, label)
    b10, b90 = F.eb_quantiles(T[variant], e_lo, e_hi)
    l10, l90 = F.eb_quantiles(T[variant], e_lo + half_e, e_hi)
    h10, h90 = F.eb_quantiles(T[variant], e_lo, e_hi + half_e)
    env10 = abs(l10 - b10) + abs(h10 - b10) + 3 * se10
    env90 = abs(l90 - b90) + abs(h90 - b90) + 3 * se90
    d10, d90 = v10 - p10, v90 - p90
    return {'variant': variant, 'e': [e_lo, e_hi], 'input': [p10, p90], 'reproduced': [v10, v90], 'dev': [d10, d90],
            'tol': [env10, env90], 'mcSe': [se10, se90], 'blocks': nb,
            'pass': abs(d10) <= env10 and abs(d90) <= env90,
            'worstOverTol': max(abs(d10) / env10, abs(d90) / env90)}


def forward(e_lo, e_hi, label, n=400000):
    o = sorted(x * e_lo for x in F.simulate(e_hi / e_lo, F.seed_of('W-12 ruled forward ' + label), n))
    return [F.q7(o, p, True) for p in (.1, .5, .9)]


def main():
    T = tables()
    sets = {s['id']: s['stats'] for s in E12['sets']}
    out = {'lane': 'm1/W-12', 'ruledDepthRowsM': RULED_D, 'ratioLoHi': RATIO, 'floorDenseCore': FLOOR_DENSE,
           'stepD': STEP_D, 'checks': []}

    def check(cid, what, ok, detail):
        out['checks'].append({'id': cid, 'check': what, 'passed': bool(ok), 'detail': detail})
        print(f"{'PASS' if ok else 'FAIL'} {cid} {what}")

    # R1: the ruled modest pair against the area template, all three variants
    a = sets['capture/NG/area/medium [m]']
    e_lo, e_hi = 2 * RULED_D['modest'][0], 2 * RULED_D['modest'][1]
    r1 = [repro(T, v, e_lo, e_hi, STEP_D, a['p10'], a['p90'], f'ruled modest {v}') for v in ('V1', 'V2', 'V3')]
    for x in r1:
        print(f"  R1 {x['variant']}: e {x['e']} input {x['input'][0]:.2f}/{x['input'][1]:.2f} reproduced "
              f"{x['reproduced'][0]:.2f}/{x['reproduced'][1]:.2f} dev {x['dev'][0]:+.2f}/{x['dev'][1]:+.2f} "
              f"tol ±{x['tol'][0]:.2f}/±{x['tol'][1]:.2f} worst {x['worstOverTol']:.2f}")
    check('R1', 'the ruled modest block range [48, 96] m (d [24, 48] at whole metres) reproduces the area template\'s '
                'p10 / p90 under EB-V1 (V2, V3 beside) within the whole-metre envelope + 3 MC s.e.',
          all(x['pass'] for x in r1), r1)

    # R2: the floor lo as the whole-metre form of MFCG's pooled fit
    m = sets['MFCG/plain/pooled [m]']
    r2 = repro(T, 'V1', 37.0, 351.0, 0.5, m['p10'], m['p90'], 'ruled floor MFCG pooled')
    print(f"  R2 V1: e {r2['e']} input {r2['input'][0]:.2f}/{r2['input'][1]:.2f} reproduced "
          f"{r2['reproduced'][0]:.2f}/{r2['reproduced'][1]:.2f} dev {r2['dev'][0]:+.2f}/{r2['dev'][1]:+.2f} "
          f"tol ±{r2['tol'][0]:.2f}/±{r2['tol'][1]:.2f}")
    check('R2', 'MFCG pooled EB-V1 fit at whole metres [37, 351] reproduces MFCG\'s pooled p10 / p90 (the lo end 37 m is '
                'adopted as the dense-core floor\'s lo; the hi end is recorded, not adopted)', r2['pass'], r2)

    # R3: forward runs of the ruled rows at CITY
    fwd = {}
    for band, (dlo, dhi) in RULED_D.items():
        e = (2 * dlo, 2 * dhi)
        ef = (max(e[0], FLOOR_DENSE[0]), max(e[1], FLOOR_DENSE[1]))
        fwd[band] = {'e': e, 'p10p50p90': forward(*e, f'{band} nofloor')}
        fwd[band]['eDenseCore'] = ef
        fwd[band]['p10p50p90DenseCore'] = fwd[band]['p10p50p90'] if ef == e else forward(*ef, f'{band} dense')
        q = fwd[band]['p10p50p90']
        qd = fwd[band]['p10p50p90DenseCore']
        print(f"  R3 {band:10s} e {e} -> {q[0]:.1f}/{q[1]:.1f}/{q[2]:.1f}   dense core e {ef} -> "
              f"{qd[0]:.1f}/{qd[1]:.1f}/{qd[2]:.1f}")
    # the design today, for the same table
    today = {}
    for band, (dlo, dhi) in F.DEPTH_ROWS.items():
        e = (2 * dlo, 2 * dhi)
        ef = (max(e[0], 30.0), max(e[1], 45.0))
        today[band] = {'e': e, 'p10p50p90': forward(*e, f'{band} today nofloor'), 'eDenseCore': ef,
                       'p10p50p90DenseCore': forward(*ef, f'{band} today dense')}
    # the modest forward against every NG medium set and the pooled set
    mod = fwd['modest']['p10p50p90']
    comp = {}
    for sid in ('capture/NG/area/medium [m]', 'capture/NG/street/medium [m]', 'capture/NG/square/medium [m]',
                'capture/NG/ring/medium [m]', 'NG/medium/pooled [m]'):
        s = sets[sid]
        comp[sid] = {'input': [s['p10'], s['p50'], s['p90']], 'dev': [mod[0] - s['p10'], mod[1] - s['p50'], mod[2] - s['p90']]}
        print(f"  R3 modest forward vs {sid}: input {s['p10']:.1f}/{s['p50']:.1f}/{s['p90']:.1f} dev "
              f"{comp[sid]['dev'][0]:+.1f}/{comp[sid]['dev'][1]:+.1f}/{comp[sid]['dev'][2]:+.1f}")
    ordered = all(fwd[a]['p10p50p90'][i] < fwd[b]['p10p50p90'][i] for a, b in
                  (('poor', 'modest'), ('modest', 'prosperous'), ('prosperous', 'rich')) for i in (0, 1, 2))
    check('R3', 'the ruled rows run forward at CITY (EB-V1): every quantile rises with the band (poor < modest < '
                'prosperous < rich) with and without the dense-core floor', ordered,
          {'ruled': fwd, 'designToday': today, 'modestAgainstNG': comp})

    # R4: the published shares sum to 1
    court = E12['shares']['ngCourtInput']['value']
    k, rows = F.share_rows(court)
    pub3 = {b: [x / 1000 for x in F.lr_round(v, 0.001)] for b, v in rows.items()}
    mf = E12['shares']['mfcgCourtCell']['CS-M1 type-7 median over the 30 usable plain seeds']
    rb = [mf, 0.0, 0.0, 1.0 - mf]
    rb3 = [x / 1000 for x in F.lr_round(rb, 0.001)]
    ok4 = all(round(sum(v), 9) == 1.0 for v in pub3.values()) and round(sum(rb3), 9) == 1.0 \
        and all(0 <= x <= 1 for v in pub3.values() for x in v) and all(0 <= x <= 1 for x in rb3)
    for b, v in pub3.items():
        print(f"  R4 {b:10s} " + ' / '.join(f'{x:.3f}' for x in v) + f"  sum {sum(v):.3f}")
    print(f"  R4 MFCG Rb    " + ' / '.join(f'{x:.3f}' for x in rb3) + f"  sum {sum(rb3):.3f}")
    check('R4', 'the published shares (three decimals, largest remainder) sum to 1 for R-19\'s four rows and the MFCG '
                'preset row Rb; every share in [0, 1]', ok4, {'ratio': k, 'court': court, 'rows3': pub3, 'mfcgRb3': rb3,
                                                            'mfcgCourt': mf})

    # R5: the deep-rule census on NG's catalogue-deep blocks
    _, ng = F.load_ng()
    blocks = []
    for fam in [f for f in ng if f.endswith('/medium')]:
        for h in ng[fam]:
            mpu = h['medShortMu'] * F.M_PER_MU
            for b in h['court']['blocks']:
                if b['deep']:
                    blocks.append((b['inscribedRadiusRel'] * mpu, b['court'], h['label']))
    cat_short = sorted(h['medShortMu'] * F.M_PER_MU for f in ng if f.endswith('/medium') for h in ng[f])
    census = {'catalogueDeep': len(blocks), 'court': sum(1 for r, c, _ in blocks if c),
              'medianShortSideM': [cat_short[0], cat_short[-1]],
              'minInscribedRadiusM': min(r for r, _, _ in blocks), 'byDbar': {}}
    for dbar in (24.0, 36.0):
        for mult in (2.0, 1.0, 0.75, 0.5):
            thr = mult * dbar / 2          # thickness > mult * d-bar  <=>  inscribed radius > mult * d-bar / 2
            dd = [(r, c) for r, c, _ in blocks if r > thr]
            cc = sum(1 for _, c in dd if c)
            census['byDbar'][f'dbar {dbar:.0f} m, thickness > {mult:g} x dbar (radius > {thr:.1f} m)'] = \
                {'deep': len(dd), 'court': cc, 'share': cc / len(dd) if dd else None}
            print(f"  R5 d-bar {dbar:.0f} thickness > {mult:g} x d-bar: deep {len(dd)} court {cc} share "
                  f"{(cc / len(dd)) if dd else float('nan'):.3f}")
    check('R5', 'the deep-rule census: NG\'s 597 catalogue-deep blocks re-counted under the design\'s deep test at '
                'd-bar 24 m (today) and 36 m (ruled), at 2 x, 1 x, 0.75 x and 0.5 x d-bar',
          census['catalogueDeep'] == 597 and census['court'] == 276, census)

    json.dump(out, open(OUT, 'w'), indent=1)
    n_fail = sum(not c['passed'] for c in out['checks'])
    print(f"{len(out['checks']) - n_fail} / {len(out['checks'])} ruled checks PASS; wrote {OUT}")
    sys.exit(1 if n_fail else 0)


if __name__ == '__main__':
    main()
```

## 16 Calls made under delegation (J122; each vetoable), CONFIRMED versus PLAUSIBLE, deferrals

**Calls.** The fifteen rulings of section 11; the DC routing of D-1 … D-3 rather than a design edit (this seat edits
no design file; J156 — no new design: every signed value re-fits an existing cell, and the three corrections make
existing checks and lists like-for-like); whole-metre publication; the appendix in place of a tool file (the brief names
no new tool).

**CONFIRMED (executed).** Every number in sections 12–15; the five ruled checks; the counts 597 / 276; the forward runs;
Part I's twelve checks and red runs as its record states.

**PLAUSIBLE (reasoning).** That the `area` template is the `modest` band's comparator (§13.6 (2); R-19); that EB's
rectangles carry the law's quantiles to NG's and MFCG's faces closely enough for a start value (M0's harness settles
it); that the three sub-0.7 m bends are reading noise on filleted corners; that M0's per-template block-area band passes
on the ruled rows (the forward deviations are 0.2–6.2 m at the ends; V12 §3.7.1 (c)'s reference run exists for a
miss); that NG's own relative flatten test uses a length other than the snapped chord.

**Deliberately not done (documented, not a bug to re-find).** No design file edited (the design seat's amendment); no
`baselines.json` row (none exists for D21 / D32); the walled-rings, ribbon and suburb floors, the rung depth factors
and the `MFCG` preset's 8 m not re-fitted (no input in the row); no memory file written by this seat (the session may
record: under the per-face stop law the leaves' p90 / p10 cannot fall below about 1.74, so `e_hi` is a tail parameter;
and the design's deep test at 2 d̄ admits 3 of NG's 597 deep blocks after the re-fit).

## 17 Content scan and disk (the ruling half)

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E12-depth-refit.md --heads docs/ARCHITECTURE.md`
on the whole record (both parts) as landed: C1 0, C2 0, C4 0, S1 0, S2 0; C3 97 hits, 80 unreviewed (Part I's scan had
50 / 43). Every unreviewed hit was read. Each is a run of digits from our own tables (share rows, the forward
deviations, the deep-census thresholds, metre ranges), a phrase of our own prose ("the design s own", "end is the
drawn end", "ng s and mfcg s", "move by the same ratio"), a design pointer ("4 6 step 1") or the appendix script's own
path and loop text; none is a reference word list, palette, grammar or identifier. The exit status is 1 by that
unreviewed count; the record is outside the design set, so no allow rows are added (the precedent of W-10, W-11b and
Part I). Disk: 11 GiB free at the start and the end; memory 72–73 % free; one process at a time at nice 10; the
scratch files (`w12_ruled_check.py`, its JSON and log, the scan log) live in the session scratchpad `m1w3/`.
