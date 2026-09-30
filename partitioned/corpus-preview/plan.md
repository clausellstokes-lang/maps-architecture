# Corpus preview — plan metrics and prior art

> PENDING FABLE REVIEW — Opus-produced (corpus-preview/plan), not yet checked by a Fable seat; PARTITIONED until the reconciliation stage.

Lane corpus-preview/plan, 2026-09-26. A read-only, preliminary survey of SettlementForge's map corpus
(`~/Desktop/settlement-engine/map-corpus`) for the owner's question "does it give you more confidence?". Nothing here is
an input to `docs/ARCHITECTURE.md`, `docs/DEFINITION.md`, any rule table or any current workflow. The 53-plate holdout
roster (atlas §2.9.4) is excluded from every figure computed here; `GENERATION-SPEC.md` and `MORPHOLOGY-PLAN.md` were not
opened.

**Outcome in four sentences.** The corpus does not move any of our ruled confidence numbers: its plates are AI-drawn
pictures with no usable metric scale, its instruments are scale-free and carry documented validity failures, and its
own governance says it may grade visual register only. Its three prior-art studies agree with our own findings on about
twenty mechanism facts, which is a replication of our reading of the 2017 MFCG ancestor and of FTG's documentation, not
new evidence about the live generators. Two measurements I ran against our own captures add real information: MFCG's
exported footprints are near-rectangles (median rectangularity 0.91–0.98) while the corpus draws irregular footprints
(instrument median ≈ 0.70–0.73), and FTG's street graph is not T-dominated (crossroads : T-junctions ≈ 0.39 on its
street edges) although the FTG prior-art study claims it is. The corpus therefore offers dimensionless, low-to-medium
trust calibration targets for fabric gestalt (junction mix, block shape, grain) and none for the metric heuristics we
must re-invent (bent-cut constants, plot widths, density per hectare, district growth rates).

## §0 What was read, and which plates were viewed

**Holdout handling.** The 53-id roster was copied from atlas §2.9.4 into a scratch file and every table below was
filtered against it. The MFS3a and MFI1 data files already exclude a larger conservative union (91 and 81 ids), so no
roster plate appears in any row I used (checked by script for every file). Two corpus figures I did **not** use because
they are partly derived from roster plates: the atlas grain ladder (46 → 57 → 69 → 98 cells across; its measurement
rows name roster plates) and atlas T-08's burgage ratio (measured on one non-roster and one roster plate).

**Read in full (every line):**
- corpus: `PRIOR-ART-WATABOU.md` (1 113 lines), `PRIOR-ART-FTG.md` (1 141), `PRIOR-ART-FMG.md` (1 181),
  `MORPHOLOGY-CONTEXT.md` (2 221); the scripts `MFS3a-run.py`, `MFS3a-plangraph.py`, `MFS3a-voids.py`, `MFS3a-frame.py`,
  `MFS3a-contact.py`, `MFI1-exclusions.py`; `MFS3a-windows.json`; the corpus `README.md`.
- ours: `docs/CONFIDENCE.md` (800 lines); `captures/mfcg/exports-2026-09-25/README.md`;
  `captures/mfcg/exports-sweep-2026-09-25/README.md`; `docs/ARCHITECTURE.md` §12 (lines 7206–7619) and §4.6–§4.7 (lines
  3383–3664); `research/findings/_critic-os.md`, `_critic-ftg.md`, `_critic-vg-ng.md`.

**Read in part:** `MFS3B-context-census.py` (feature vocabulary, parsing, role logic); `MFI1-footprints.py` (docstring,
extraction, control, window set and run loop, ≈ 60 % of the file); the docstrings of `MFI1-roofs.py`, `MFI1-towers.py`,
`MFI1-tone.py`, `MFI1-q1guard.py`, `MFI1-g39.py`; atlas `laneMFS1-urbanism-atlas.md` §2.1a, §2.2 T-01–T-09, §2.9.4–§2.9.6,
§2.10; `laneHF4-receipt.md` §6 (corpus table of contents and scrub list); `_critic.md` §0–§1.2 and §2–§6 (the §1.3
per-source citation-count table was not read); `ARCHITECTURE.md` §4.2 S3 items 1–4, §4.4 stage regimes and S5c, §4.5
grower and bands (grep-targeted excerpts of §4 bearing on plots, districts, walls and gates).

**Queried by script, never printed whole:** `MFS3a-planmetrics.json` (49 rows), `MFS3a-voidmetrics.json` (49),
`MFS3a-frame.json`, `MFS3B-context-census.csv` (232 rows), `MFI1-footprints.json` (56 window rows), `MFI1-control.json`
(24 control runs), `MFI1-roofs.json` (17), `MFI1-towers.json` (5 hand counts), `MFI1-tone.json` (7 pairs),
`MFI1-g39.json` (verdict only); and, from our own tree, the MFCG sweep JSON exports (sizes 15–130) and the FTG settlement
payload through our stdlib decoder. Scripts and outputs are in the lane scratchpad
(`…/scratchpad/corpus/`: `mfcg_shape.py`, `mfcg_grain.py`, `ftg_street_degree.py`, `*_summary.txt`, `*.out`).

**Plates viewed (5, all 1 100-px previews, none on the roster):** `hf72` (two-nucleus town), `hf364` (resettled town),
`hf35` (ward close-up), `hf40` (city with rich and poor halves), `hf34` (metropolis). No lettering from any plate is
reproduced here. Four of the five (`hf34`, `hf35`, `hf40`, `hf72`) carry title lettering with dates, a real person's
name or a real-language title, yet none is on the 34-plate scrub list (§4, limit 7).

**Not read:** `GENERATION-SPEC.md`, `MORPHOLOGY-PLAN.md` (owner's partition rule); the historical registry
(`HISTORICAL-URBANISM-EVIDENCE.md` and its protocol; outside this lane's brief); `laneHF-CALIBRATION.md`; any roster plate.

## §1 Findings

### 1.1 What the corpus measures, and in which units

Every plan instrument in the corpus is **scale-free**. None converts to metres, hectares or buildings per hectare.

| instrument (file) | what it measures | unit | validity status as the corpus itself records it |
|---|---|---|---|
| plan graph (`MFS3a-plangraph.py` → planmetrics) | street skeleton from a local-pale mask: T/X/dead-end shares, degree, γ, orientation order φ; blocks as hull minus street | fractions; block area as a **fraction of the hull** | hand-set windows; the street mask admits squares, voids and pale open ground, so `street_share_of_hull` reads 0.33–0.91 (not a street share) |
| width / grain / voids (`MFS3a-voids.py`) | dark runs per scanline ("cells across"); street width by distance transform; voids | **plot-widths** (the median dark-run pitch) | grain counts hedges and furrows below village tier (thorp 12 roofs read 99.6); two corpus width instruments disagree ≈ 5× (atlas T-04 p97/p50 16–30 vs MFS3a 2.4–7.3) |
| footprints (`MFI1-footprints.py`) | per-mass rectangularity, convexity, elongation | ratios; area in pitch² | synthetic control: recovery ≥ 0.94, true rectangles read 0.92, L-shapes 0.68–0.70; **at town and city scale it measures continuous perimeter ranges, not buildings** (the script's own finding) |
| roofs (`MFI1-roofs.py`) | building masses per window, thorp–village | count per window | upper bounds; recall 0.88, precision 0.56 on its one hand-checked plate; "may not set a band" |
| towers (`MFI1-towers.py`) | hand count on 5 walled plates; a plate extractor | count | extractor "prototype with an unvalidated recovery rate"; hand sample "not a band" |
| context census (`MFS3B-context-census.py`) | regex over the plate descriptions | incidence of **prose mentions** | a lower bound on presence; description-length confound 3.8×; "may falsify an always, never establish a rarely" |

### 1.2 Corpus plan metrics, holdout-free (whole-plate windows only)

n = 31 whole-plate windows from village to metropolis (thorp and hamlet rows are degenerate or withdrawn and excluded);
sub-windows are not pooled. Medians, with the range across windows. [CONFIRMED by my own query of the JSON.]

| metric | village (n 3) | town (n 17) | city (n 7) | metropolis (n 4) | pooled (n 31) |
|---|---|---|---|---|---|
| T/Y share of graph nodes | 0.68 | 0.65 | 0.60 | 0.65 | 0.65 (0.51–0.74) |
| X share | 0.011 | 0.020 | 0.007 | 0.016 | 0.015 (0.00–0.055) |
| dead-end share | 0.21 | 0.20 | 0.22 | 0.23 | 0.21 (0.11–0.39) |
| orientation order φ (0 organic … 1 grid) | 0.09 | 0.12 | 0.07 | 0.10 | 0.10 (0.04–0.28) |
| block elongation p50 | 1.97 | 2.08 | 2.45 | 2.21 | 2.14 (1.65–3.42) |
| block solidity p50 | 0.79 | 0.76 | 0.68 | 0.73 | 0.75 (0.50–0.86) |
| block area p90 / p10 | 12.6 | 15.0 | 11.8 | 21.2 | 13.6 (5.8–205) |
| cells across (grain) | 39.2 | 54.5 | 62.0 | 84.3 | — |

X : T is therefore ≈ 0.02 (about 43 T-junctions per crossroads), the figure the prior-art studies quote. Planned
sub-windows sit apart: φ 0.58–0.65 (castra camp, new quarter) against 0.04–0.28 for organic fabric.

**Footprints.** In the ten village and zoom windows where the corpus draws one building at a time, median footprint
rectangularity is 0.705 (mass mode, 9 windows, range 0.63–0.79) to 0.732 (region mode, 10 windows, 0.68–0.92); the share
reading as a rectangle (≥ 0.90) has a median of 0.02–0.05. Only a planned civic zoom reaches 0.39–0.55. Against the
control (rectangle 0.92, L-shape 0.68–0.70) the corpus's footprints read like re-entrant shapes, and the corpus's own
test (`MFI1-g39`) concluded that "imitating a generator's squareness would move us AWAY from it".

**Walls and gates** (all holdout-free). Prose census: a wall is named on 44 of 71 town-tier settlement plates, 14 of 22
city, 4 of 6 metropolis and 4 of 17 village plates (lower bounds). The MORPHOLOGY-CONTEXT lane's own viewing of 7 walled
plates: towers absent on at least one flank in 6 of 7, always the terrain-defended flank; a wall-side street on some runs
in 7 of 7 and on every run in 0 of 7; land gates 2–4 at town, about 4 at city, 6–7 at metropolis. The MFI1 hand count
(n = 5): two circuits with no towers at all (an earth rampart, a hedged bank) and 10, 17 and 25 towers on the masonry
circuits, placed along straight and curved runs, including a smooth oval. My own five views agree that the rule is
mixed: `hf34` and `hf72` put towers at polygon corners, `hf364` spaces them along curved runs, `hf40` draws none.

### 1.3 The corpus against MFCG's exported geometry (our sweep, seed 555001) and FTG's payload

Because the corpus has no scale, the only honest comparisons are dimensionless. I computed three from our own files.

| quantity | corpus (holdout-free) | MFCG exports (computed here) | FTG payload | reading |
|---|---|---|---|---|
| footprint rectangularity, median | 0.70–0.73 as read by the corpus instrument (true rectangles read 0.92) | exact geometry 0.912 / 0.946 / 0.964 / 0.977 at sizes 24 / 40 / 80 / 130; ≥ 0.90 share 0.56 / 0.70 / 0.78 / 0.85 | quads, worst-corner deviation median 0.68° (critic-2) | MFCG and FTG draw near-rectangles; the corpus draws irregular masses. Allowing the instrument's −0.08 bias, MFCG would read ≈ 0.83–0.90, still well above the corpus [PLAUSIBLE translation] |
| footprint elongation, median | 1.60–1.81 (window medians 1.1–3.7) | 1.46–1.49 at every size (p90 ≈ 2.2) | quad sides ≈ 10 × 10 m | same order; MFCG slightly squatter |
| footprint area | not measurable (pitch units only) | median 225–339 m² (p10 127–193, p90 429–557) | median 103 m² | corpus cannot be compared |
| grain: buildings crossed per scanline (analogue of "cells across") | village 39, town 54.5, city 62, metropolis 84 | size 15: 11 · 24: 16 · **40: 37.5** · 60: 49 · **80: 72** · **130: 108** | — | MFCG's TOWN size sits at the corpus's village level; CITY at the top of the corpus city range; METROPOLIS above the corpus metropolis range (82–101). MFCG's grain climbs ×1.9 then ×1.5 per rung, the corpus's ×1.14 then ×1.36 [instrument analogue, PLAUSIBLE] |
| junction mix | X : T ≈ 0.02 | not measurable (alleys are not exported) | street edges only (types 0/1/2/10): T/Y 0.45, X 0.17, dead ends 0.37 of junction nodes, **X : T 0.39**; with suburb edges 0.58 | FTG's default preset is crossroad-rich, one settlement [CONFIRMED on the payload, n = 1] |
| gates | town 2–4, city ≈ 4, metropolis 6–7 (n = 7 plates) | 4 / 5 / 8 / 12 at sizes 24 / 40 / 80 / 130 | none drawn | MFCG carries roughly 1.5–2× the corpus's gates at a nominal tier [tier mapping PLAUSIBLE] |
| towers | mixed: along runs, at corners, none on terrain flanks, zero on earthworks | every non-gate wall vertex on dry cities (exports CONFIRMED equal at size 40; not on the river-coast city) | a subset of district-ring vertices, median spacing 39 m | three different rules |
| districts | "legible districts" only as descriptive [E] notes | 6 / 9 / 12 / 18 at sizes 24 / 40 / 80 / 130 | 4 district rings | no corpus instrument |

Using the atlas's own disc-and-60 %-fill conversion on the holdout-free grain, a corpus town depicts about 1 400
building-cells, a city about 1 800 and a metropolis about 3 300. That matches our TOWN rung (1 200–1 500) and MFCG size 40
(1 475) but sits 2.5–4.5× below our CITY (4 500–6 000) and METROPOLIS (12 000–15 000) rungs. The corpus's large
settlements are drawn as representations, not counts [PLAUSIBLE arithmetic on the atlas's own assumption].

### 1.4 The corpus against our design's assumptions (ARCHITECTURE §4.6–§4.7, §12)

- **Plot bands.** Our granularity rows imply plot-area centres of ≈ 80 / 180 / 374 / 878 m² (poor / modest / prosperous /
  rich) and depth : frontage centres of 3.2 / 3.2 / 2.8 / 2.3 (ranges 1.2–5.0). MFCG's lots have median area 225–339 m²
  and elongation 1.47; FTG's lots are 441 m² holding 1.5 buildings. The corpus gives no plot size. By eye on `hf72` the
  strips flanking its main street read roughly 3–5 : 1 deep (n = 1, PLAUSIBLE); our poor and modest bands already reach
  that range at their deep end, and MFCG's lots are squatter than both.
- **The bent cut (§4.6).** Every constant in our recipe (σ 0.066 of the major axis, one bend at half the projection,
  fillet probability 0.53, tangent ratio N(0.73, 0.10)) comes from NG's vertex captures. The corpus measures nothing at
  the level of a cut; its block-shape medians (elongation ≈ 2.1, solidity ≈ 0.75, block-area p90/p10 ≈ 14, φ ≈ 0.10) can
  at most serve as an after-the-fact sanity band on rendered output.
- **Deep-interior shares.** Our court / back-lane / through-alley / rear-plot shares are to be calibrated on NG and MFCG.
  The corpus's court frequencies (atlas T-06: 14–65 % of blocks with interior open space, 3–15 % route-isolated) are hand
  estimates the atlas itself labels [E], and §2.10 says no hand count becomes a generator band.
- **Density and the walled share.** `plotShare` 0.62 and the walled share 0.88–0.90 are anchored on MFCG's measured
  cover (0.60–0.65) and walled share (0.87–0.92). §4.4 says "the corpus phase recalibrates the rows"; this preview finds
  no corpus instrument that measures either quantity, so the corpus cannot recalibrate them, only argue qualitatively
  (extramural growth concentrated at one or two gates, unequal ribbon lengths).
- **Gates and districts.** Our gate law reproduces MFCG's 5 / 8 / 12; the corpus draws fewer. Our district law gives
  MFCG-scale counts; the corpus has no district instrument.
- **Junctions.** Our organic crossroads band (0–15 % of junctions) contains the corpus's ≈ 2 %; FTG-style extramural
  growth, measured at X : T 0.39, would push the product toward the top of that band.
- **§12 budgets.** The corpus has nothing to say about time; its grain arithmetic supports the TOWN building count and
  does not support (or refute) the CITY and METROPOLIS counts, because its big plates are representational.

### 1.5 The prior-art studies against our own findings

The three corpus studies read the GPL 2017 source (`watabou/TownGeneratorOS`; the FTG author's fork is byte-identical,
zero commits), FTG's public documentation and MIT/Apache integration clients, and FMG's MIT source. None executed
anything. Our findings rest on the same 2017 source read for verification, plus live V8 censuses, draw records, the MFCG
geometry exports and the decoded FTG payload.

**Agreement (independent replication of what we already hold).** On the 2017 ancestor: the jittered spiral seed field,
Voronoi cells, the short-edge junction merge (threshold 8) as the source of rare crossroads, the citadel as the first
non-city cell by distance, gates chosen by random pick with neighbour deletion, towers at every non-gate wall vertex,
streets and roads as FIFO shortest paths over cell edges, street hierarchy as per-edge setbacks (main 2.0, regular 1.0,
alley 0.6), recursive longest-edge bisection with ratio and angle jitter and the angle forced to zero near building size,
a jittered stop threshold, a per-ward emptiness probability (patriciate ≈ 0.2, slum lowest, military highest), the
size-weighted alley-or-shared-wall choice, outskirts thinning by road proximity, orthogonal slicing for monuments, the
first-vertex distance defect, one global Lehmer stream and a retry wrapper. On FTG: world-first two-phase generation, the
ratio dependency graph with importer fallback, staged road growth from a priority queue, per-stage Dense / Gaps /
Individually-placed modes, invisible-edge suburb lots, water first, the minimum-district-area merge, metric GeoJSON and
regenerate-area that preserves the edge network. On MFCG's current towers, the author's own prose ("towers are wall
vertices") agrees with our exports.

**Contradictions, where our evidence is stronger.**
- **MFCG relaxation.** The watabou study ranks "regularity applied only to the central cells" its #3 idea. Our source
  check (`_critic-os` C9, CONFIRMED at the line) shows the first three relaxed entries are frame corners and the seeds
  actually moved are mid-ring (indices n−4…n−2); the centre is never relaxed.
- **MFCG cathedral.** The study says the temple takes the largest plaza-fronting cell; the scoring picks the smallest
  (`_critic-os` C3).
- **MFCG wall smoothing.** The study says larger towns are smoothed more; at every size the 2017 UI can reach, the factor
  saturates at 1 (`_critic-os` C12; CONFIDENCE §0.2 #7).
- **MFCG ward scoring.** The study's text says "only four of thirteen ward types score"; its own table lists seven, and the
  source has seven.
- **MFCG vintage.** The study describes the 2017 subdivision as the mechanism; our findings show lots moved to Voronoi
  (0.8.0), twisted bisection (0.9.0) and twisted bisection only (0.11.1), and buildings to largest-inscribed rectangles in
  Complex mode. Its "chaos at the large scale, squareness at the small" is a statement about a superseded build.
- **FTG junctions.** The FTG study's headline triangulation ("three unrelated mechanisms, one T-dominated signature") is
  contradicted by the payload: street-edge X : T 0.39 (§1.3). The study had flagged snapping and ring mode as possible
  exceptions; the measured default preset is crossroad-rich.
- **FTG walls.** The study infers a closed ring per stage from screenshots; the payload shows open chains that end at
  water (critic-2 F15; challenge-under probes), with towers on a subset of ring vertices.
- **FMG → MFCG size.** The FMG study reads the current code as `size = 2.13 × (population / urbanDensity)^0.385`,
  clamped 6–100. Our MFCG findings (and CONFIDENCE row G2's evidence) cite `size = population / 1000` from a 2018–2019
  devlog. Both may be right for different FMG versions; our G2 row should carry the newer reading as a factual
  correction [PLAUSIBLE; I did not read FMG's code].

**What the prior art knows that we do not.** Nothing that bears on a parity cell. FMG's village-link tag list matches the
VG tag vocabulary we already hold; FTG's integration clients describe an embed-and-sync product surface (outside the map
program); the FMG study's viewport and frame-budget patterns concern rendering engineering already covered by §12.

### 1.6 Does the corpus give measurable calibration targets for the heuristics we must re-invent?

| heuristic | measurable corpus target? | trust | why |
|---|---|---|---|
| bent-cut constants (bend position, cut placement, stop law, fillets) | **no** | — | nothing is measured at the level of a cut; NG vertex captures remain the only source |
| block shape produced by the cuts | yes, dimensionless: elongation ≈ 2.1, solidity ≈ 0.75, block-area p90/p10 ≈ 14, φ ≈ 0.10, X : T ≈ 0.02, dead ends ≈ 0.21 | **low–medium** | hand-set windows; street mask includes voids; block = hull minus street, not a parcel; comparable only by running the same raster instrument on our own rendered output |
| district growth (count, size, typing) | **no** | — | district counts are descriptive [E]; no instrument; the atlas bars hand counts from becoming bands |
| plot widths and depths | **no** in metres; plot-series presence and rough depth : width by eye | **low** | no scale; the atlas's burgage ratio partly rests on a roster plate; my own eye reading is n = 1 |
| building footprints | yes, dimensionless: rectangularity ≈ 0.70–0.73, elongation ≈ 1.6–1.8 (village and zoom windows) | **medium** | validated control; but at town and city scale the corpus draws ranges, not buildings |
| density per hectare, walled share, plot share | **no** | — | no scale; grain is a display statistic; its conversion to counts assumes a disc and 60 % fill |
| grain by tier (display busyness) | yes: 39 / 54.5 / 62 / 84 cells across (village → metropolis) | **medium** at village–city, **low** at metropolis (n = 4) | reproducible kernel on hand-set windows; the corpus's big plates are representations |
| walls: presence, towers, gates, wall-foot | partial: incidence and small viewed samples (n = 5–7) | **low** | prose census is a lower bound; hand samples are "not a band"; tower extractor unvalidated |

## §2 What raises confidence

1. **Replication of our 2017-ancestor reading.** An independent team read the same GPL source and reached the same
   mechanism facts on about fifteen points (§1.5). Where they differ, our source-line checks are right. This does not move
   a cell, because every one of those facts was already CONFIRMED at the source line by `_critic-os`, but it lowers the
   chance that our verification carried a shared misreading.
2. **Replication of our FTG documentation reading.** The FTG study's account of the documented pipeline, dependency graph,
   staged growth, placement modes and suburb lots matches ours point for point (§1.5). Again corroboration only.
3. **Our executed evidence is strictly stronger than the prior art's.** Every contradiction in §1.5 is settled in our
   favour by an executed check (source line, live export or decoded payload). That is a quiet confirmation that the
   evidence classes behind CONFIDENCE.md are the right ones.
4. **Scale sanity.** The corpus's town grain converts to about 1 400 building-cells, consistent with our TOWN rung and
   with MFCG size 40. Weak, but it is an independent cross-check of the rung that the owner's one-click default uses.

None of these justifies raising behaviour parity (0.77–0.83), look parity (0.78–0.83), method identity (0.53–0.55) or
seed-exactness (≈ 0).

## §3 What lowers confidence (or cautions it)

1. **The corpus cannot calibrate the unpublished heuristics.** The confidence rulings say those heuristics (bent-cut
   constants, growers, plot-cut edge rule, district typing) "would be our own inventions calibrated to their measured
   outputs". The corpus adds no measured output of MFCG or FTG and no metric target, so it leaves that calibration gap
   exactly where CONFIDENCE §5–§6 put it (MFCG exports, NG size sweeps, FTG captures).
2. **The corpus look diverges from the references' look.** At building scale MFCG (0.91–0.98) and FTG (quads) are
   rectangular and the corpus is not (≈ 0.70–0.73 read, ≈ 0.78–0.81 after the rectangle bias); MFCG draws more gates and
   evenly beaded towers the corpus treats as a "generated" tell. Matching the references and matching the corpus are two
   different targets. This does not lower parity confidence, but it means "exceed them" measured against the corpus
   would pull away from look parity at building scale.
3. **FTG is not T-dominated.** Our fused design grows extramural fabric FTG-style. FTG's measured default is
   crossroad-rich (X : T 0.39 on streets), so parity with FTG's look and the corpus's T-dominated gestalt also pull apart.
   n = 1 settlement.
4. **A factual correction for MFCG row G2** (integrations): the FMG size mapping we cite may be superseded (§1.5). Low
   weight; it does not move the MFCG aggregate.
5. **Simplicity (the manager's 65–70 %).** Both prior-art studies stress the references' economy (the 2017 MFCG is about
   4 400 lines including its geometry library and UI; FTG's author reports about 800 files and 70 000 lines). That
   restates an existing concern rather than adding evidence; it does not move the estimate.

## §4 Limits of this evidence

1. **The plates are AI-generated pictures, not surveys and not generator output.** The corpus's own annotation (§261,
   binding on both prior-art studies) says the plates were drawn by an image model from its own training, after the
   owner exemplified a style with screenshots. Synthetic agreement between plates is not corroboration (atlas §2.10.2).
2. **No usable scale.** Every instrument is scale-free, and the viewed plates' scale bars use archaic or implausible units
   (one ward close-up carries a miles-based bar). Nothing converts to metres or hectares.
3. **Instrument validity.** The grain kernel counts hedges below village tier; the street mask includes voids and pale
   ground; two width instruments disagree about fivefold; the footprint extractor sees ranges at town scale; roof counts
   are upper bounds (precision 0.56); the tower extractor is unvalidated. Windows are hand-set and must be re-set for any
   new image.
4. **Small samples.** 31 usable whole-plate plan windows (village 3, town 17, city 7, metropolis 4); 10 footprint-resolving
   windows; 5 hand tower counts; 7 viewed walled plates in the context lane; 5 plates viewed in this lane. None is a
   random sample, and I do not project any share to the whole corpus.
5. **The corpus's own governance limits use.** The context compendium's status note says corpus scenes "do not license"
   wall defaults or rural ratios and "may grade visual register only"; the atlas says T-03…T-26 are design hypotheses where
   they rest on plate readings, and that hand counts never become generator bands.
6. **The holdout is not blind** (atlas §2.9.4: every plate was viewed or measured at some point). Some published corpus
   figures (the grain ladder, T-08) include roster plates; I did not use them.
7. **Lettering hygiene.** Four of the five plates I viewed carry dates, a real person's name or a real-language title that
   the 34-plate scrub list does not name. The scrub list is therefore incomplete for the naming rule; the reconciliation
   stage should treat all plate lettering as unusable, not only the listed plates.
8. **My comparisons are analogues.** The MFCG grain figure counts exported polygons crossed per scanline, not dark runs on
   a rendered image; the rectangularity comparison crosses an extraction bias I estimated from the corpus control; the FTG
   junction mix is one settlement of one preset. All three are labelled PLAUSIBLE where they translate between
   instruments, CONFIRMED only for the numbers computed.

## §5 What the reconciliation stage will need from it

1. **Run the corpus's raster instruments on our own rendered output, not on its numbers.** Copies of `MFS3a-plangraph.py`,
   `MFS3a-voids.py` and `MFI1-footprints.py` (they need numpy, scipy and scikit-image, which this machine lacks), applied
   to our TOWN / CITY / METROPOLIS renders and to MFCG's PNGs with hand-set windows, are the only way to compare like with
   like. Budget one lane.
2. **Decide which target "exceed them" means.** Building-scale footprint shape, gate count and tower rhythm are where MFCG
   parity and the corpus look disagree (§1.3); the owner has to rule which wins where, before any calibration.
3. **Pair the corpus with the historical registry for any mechanism claim.** The atlas says structural mechanisms need a
   registered historical witness; the corpus alone supplies visual register and hypotheses.
4. **Candidate scale-free acceptance bands** (to be re-derived holdout-free and re-validated): X : T ≤ ≈ 0.05; dead-end
   share 0.11–0.39; block elongation 1.65–3.4; block solidity 0.50–0.86; block-area p90/p10 ≥ ≈ 6; φ ≤ 0.3 in organic
   districts and ≥ 0.55 in planned ones; footprint rectangularity per the corpus control, if the corpus look is chosen.
5. **A metric bridge.** If any corpus band is ever expressed in metres, it must come from one of our own settlements
   rendered in the corpus register, never from a plate's scale bar.
6. **Carry forward, as factual corrections to our own record:** FTG street X : T 0.39 (payload); the FMG size mapping for
   MFCG G2; the four prior-art errors on the 2017 MFCG code (so no reconciliation seat imports them).
7. **Keep the holdout clean:** the published grain ladder and T-08 must be re-derived without roster plates before use,
   and the scrub list should be extended to every plate with dates or real names in its lettering.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED (executed in this lane): every corpus table figure in §1.2 (queried from the JSON
and CSV, holdout-filtered), the MFCG footprint and grain numbers and the FTG junction counts in §1.3 (computed from our
own exports and payload), and the holdout and scrub checks. PLAUSIBLE (reasoning): every cross-instrument translation,
the tier mappings, the by-eye plate readings, the FMG version reading, and every statement about what raises or lowers
confidence.

## Fable review (2026-09-27) — B-corpus-preview/plan

**Verdict: CONFIRMED** (annotations only). Reviewer: Fable 5.1, lane fable-review/main/manager-corpus; full record
docs/fable-review/main/manager-corpus.md. Corpus-side medians (§1.2) and the prior-art studies' text are accepted as
quoted: the reviewer may not open the corpus. Everything from our own files was re-derived by execution.

- **MFCG footprints, re-derived from captures/mfcg/exports-sweep-2026-09-25/size-{24,40,80,130}.json** (pure Python:
  shoelace area, convex hull, minimum-area bounding rectangle over hull-edge directions): rectangularity medians
  0.912 / 0.946 / 0.964 / 0.977 — exact; ≥ 0.90 shares 0.55 / 0.70 / 0.78 / 0.85 (one rounding against 0.56); elongation
  medians 1.46–1.49 (p90 2.2–2.3); footprint medians 339.0 / 225.1 / 270.0 / 268.9 m² (p10 127–193, p90 428–557). Gates
  4 / 5 / 8 / 12 and districts 6 / 9 / 12 / 18 are the sweep's stats.md values.
- **Grain analogue:** the exact value depends on which scanlines are pooled (the rule is not stated here). Median over
  scanlines crossing ≥ 1 building: 12 / 16 / 27 / 46 / 35 / 98 at sizes 15 / 24 / 40 / 60 / 80 / 130; over the middle half
  of the extent: 13 / 19 / 38 / 54 / 64 / 125; this file: 11 / 16 / 37.5 / 49 / 72 / 108. The tier reading holds under both
  definitions — size 40 at or below the corpus village figure (39), size 130 above the corpus metropolis figure (84) — and
  settles the synthesis's look-versus-plan disagreement at metropolis in this lane's direction (the look lane's windowed
  raster count of 67 undercounts).
- **FTG junction mix, re-derived from the decoded payloads** (a stdlib walk of field 3, node degrees by edge incidence):
  Galeiaward, street edges of types 0 / 1 / 2 / 10 — junction nodes T/Y 0.45, X 0.17, dead ends 0.37, X : T 0.39 — exact;
  whole graph — degree 3: 969, degree 4: 561, degree 1: 83 — X : T 0.58 and a four-way share of 0.36 among junctions of
  degree ≥ 3. Second payload, Nevervalley (captures/ftg/2026-09-25T10-13-51, roadLength 100): streets X : T 0.43; whole
  graph 0.52; four-way share 0.34. Caveat for §1.3: restricting to street types turns every street node whose other arms
  are lot outlines or suburb edges into a "dead end" (0.37); the whole-graph figures (dead ends 0.05, four-way 0.36) are
  the honest description of FTG's network. The design already carries this: docs/ARCHITECTURE.md §13.5's junction row
  reads "FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — weakness for organic presets, target for
  ringed and american" with the organic band 0–15 % that §1.4 cites — so §5 item 6's "carry forward" is already
  satisfied; the correction is to the corpus's FTG study, not to our record. The row may now cite n = 2.
- **The four prior-art errors** check at our sources: _critic-os.md C9 (relaxation touches spiral indices n − 4 … n − 2),
  C3 (the cathedral takes the smallest plaza-fronting patch), C12 (smoothing saturates at 1 for every shipped size);
  os-model.md's rateLocation table lists seven scoring classes (Cathedral, Administration, Merchant, Slum, Market,
  Military, Patriciate).
- **The FMG size-mapping note** (§1.5; §3 item 4) for CONFIDENCE row G2 is corpus content and PLAUSIBLE (FMG's code was
  not read): ruled not an input now under the partition; re-examined at reconciliation, where the corpus opens.
- **Stale line numbers:** §0's "§12 (lines 7206–7619)" and "§4.6–§4.7 (lines 3383–3664)" and §1.4's "ARCHITECTURE ≈ line
  2882" are pre-consolidation; cite section numbers (on 2026-09-27: §4.11 from line 4954, the markets paragraph at 3511,
  the rung table at 222, the junction row at 10614).
