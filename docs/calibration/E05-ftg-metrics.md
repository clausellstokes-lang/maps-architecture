# E05 — FTG payload metrics (M-1 work item W-05: D14, D25, D26 and FTG's share of D16)

Lane `m1/W-05`, 2026-10-03, on the owner's Mac. A research-side record: implementer seats do not read it
(`plat/CLEAN-ROOM.md` rule 2). It holds numbers, metric ids, file paths and our own words; no district name, building
label, asset key or request identifier of the reference is written here. Nothing was written into `plat/`, nothing
touched a third-party site, no git command was run, and no captured program bundle was read (the inputs are the two
Fetch-intercepted layout payloads and the network indexes).

**Outcome.** The work item is done on the two existing CITY payloads, and every check of its row passes (CONFIRMED by
execution). The new adapter `research/baselines/adapters/ftg.py` turns each payload into a `MeasureInput` file, and the new
`research/baselines/measure_ftg.py` measures every FTG metric of D14, D25 and D26 on that file by V12 §3.4.2. Its twin
reproduces the existing numbers through the same decoder. `length_precision.out.txt` is reproduced line for line on both
payloads (31 / 31 and 26 / 26 lines), giving the runs **50.5 / 30.25 / 50.25 / 30.00 / 14.70 m**. The counts reproduce
(**2 798 and 2 813** buildings, **17 / 29** towers), and so do `_critic-ftg.md` §4 rows 7–9 on the payload they were
measured on (type-0 turn bins 12–18 = 28 / 19 / 16 / 0 / 0 / 1 / 0; junction arms p50 90.02°, n 5 213, 58.2 % in
80–100°; largest heading bin 7.8 %). The turning and entropy values agree with those rows under the criteria fixed before
the first run (section 3). The per-size rows (BIG_TOWN, BIG_CITY) and FTG's variety dispersion wait for the six W-02
captures, as the plan orders. The tool needs no change for them. Its provenance step, run read-only on the day-1
folder, gives W-02's own `referenceBuild` and server time; no geometry was measured there.

The re-measurement moves five numbers §13.5 states for FTG. Each one is CONFIRMED, and each needs a ruling or a
declared shift (section 8):
1. The tree nearest-neighbour median is **10.6 m, not 9.7 m**. The recorded figure dropped 320 of 4 125 trees (7.8 %),
   the isolated ones whose neighbour lay beyond its search block.
2. The "6 and 2 ungated crossings" include the wall's chain ends. Under V12's definition (arterials crossing the
   curtain) they are **3 and 1**; counting every way class, they are 4 and 1.
3. The 50 m water step holds on the 2026-09-21 payload. On the 2026-09-25 payload the coast is drawn at a finer step,
   and the pooled step is **15.7 m**.
4. Outline anisotropy by V12's definition is **0.365 / 0.333**, with a road ratio of **1.16 / 1.21**. The recorded
   0.20 / 0.33 and 1.26 / 1.65 came from 16 land-only sectors.
5. The 15° per-vertex cap is not absolute on the second payload. One type-0 vertex turns 16° (one of 178 by row 7's own
   method), and one trail vertex turns 15°.

## 1 What was built and run

| file | what it is |
|---|---|
| `research/baselines/adapters/ftg.py` | payload → `MeasureInput` (V12 §2.2), schema `research.measure-input/1` as the NG adapter writes it; standard library; decodes zig-zag centimetres; field and edge-type numbers from `research/findings/code-ftg-client.md` §2 |
| `research/baselines/inputs/FTG/ftg-2026-09-21_26c4ad3e075b/2026-09-21T05-23-58.metric.geojson.gz` | feature counts by kind: way 772; wall 1 (stretches); tower 17; building 2 798; water 4; pier 12; tree 4 125; field 203; district 4. 0 degenerate drops (182 KB) |
| `research/baselines/inputs/FTG/ftg-2026-09-25_ba02af9ca044/2026-09-25T10-13-51.metric.geojson.gz` | the same kinds: 617; 2; 29; 2 813; 4; 20; 3 844; 184; 3. 0 degenerate drops (179 KB) |
| `research/baselines/measure_ftg.py` | the twin and the metrics; standard library plus PIL (installed) for the cluster-block raster |
| `docs/calibration/E05-ftg-metrics.json` | every number below, per capture, with the checks and the pre-registered extension (sha256 `243bca8e…`) |

`referenceBuild` per capture is `ftg:<server date>+<sha256 of the exact PUT body, 12 hex>`, as W-02 forms it:
**`ftg:2026-09-21+26c4ad3e075b`** (274 293-byte body, sent in session `2026-09-21T05-08-07`; the payload is the 05:24
re-load of that settlement, same id, no PUT between) and **`ftg:2026-09-25+ba02af9ca044`** (274 294 bytes). Both payloads
are FTG's CITY preset (nominal 9 500 people, 5 km map) with coast and rivers on. The only differing request value is the
second stage's road length, 60 against 100 m. Both are fixtures. They are not plan slots (`plan.json`'s FTG slots are
the six BIG_TOWN / BIG_CITY captures), so no `baselines.json` row is built from them (C7).

Run (project root): `python3 research/baselines/adapters/ftg.py` then `python3 research/baselines/measure_ftg.py --check`
(≈ 50 s). For a new capture: `python3 research/baselines/adapters/ftg.py <stamp>` and
`python3 research/baselines/measure_ftg.py <stamp> --json <file>`. The checks of section 2 are tied to the two fixtures.

## 2 The twin — the existing numbers re-derived through the new decoder (CONFIRMED, executed)

| recorded number (source) | re-derived 2026-09-21 / 2026-09-25 | verdict |
|---|---|---|
| `roadlength100/length_precision.out.txt`, whole output except the name lines | 31 of 31 and 26 of 26 lines identical | reproduces |
| runs 50.5 / 30.25 / 50.25 / 30.00 / 14.70 m (row's checker; roadlength100 README) | stage-1 main runs 50.5 (×15) / 50.5 (×9); stage-2 street p50 30.25 / 50.25; suburb street p50 30.00 / 30.00; suburb short piece 14.70; lot outline 14.70 / 14.70 | reproduces |
| 2 798 and 2 813 buildings; 17 / 29 towers (row; roadlength100 README) | 2 798 / 2 813; 17 / 29 (also in each `MeasureInput`) | reproduces |
| edges / nodes / districts 5 326 / 4 303 / 4 and 4 811 / 4 045 / 3 | same | reproduces |
| `_critic-ftg.md` §4 row 2: degree 1: 83, 2: 2 678, 3: 969, 4: 561, 5: 10, 6: 2; 4-way 36.4 % (`ftg_arith.out` C) | same; 36.4 % (2026-09-25: 33.9 %) | reproduces |
| row 7: type-0 turn bins 12…18 = 28, 19, 16, 0, 0, 1, 0 | same (2026-09-25: 9, 23, 11, 0, **1**, 0, 0) | reproduces |
| row 8: junction arm p50 90.02°, n 5 213, 58.2 % in 80–100° | same (2026-09-25: 90.02°, 57.0 %) | reproduces |
| row 9: largest 10° heading bin 7.8 % | 7.8 % (2026-09-25: 8.4 %) | reproduces |
| rows 10–12: footprint median 102.7, p95 154 m²; quad side 10.34 m; worst corner median 0.68°, p95 22.9°, p99 42.2° | same (2026-09-25: 96.4, 189; 10.12; 0.56, 21.6, 42.3) | reproduces |
| row 18: water outline step 50.0 m on all four; rivers 2A/P ≈ 31 m (30.9, 31.0) | same; 2026-09-25: rivers 50.0 / 49.9 m step and 2A/P 47.7 / 47.6 m; **coast 15.0 m and basin 13.0 m step** | reproduces; second payload differs |
| row 20: tree NN median 9.66 m, minimum 0.14 m, mean 11.49 m | same (2026-09-25: 9.40, 0.10, 11.28) | reproduces the script; see section 8 (1) |
| wall probe: 17 / 17 towers on wall nodes, spacing along the wall n 16, 18.9 / 39.3 / 72.8 m; 29 / 29, n 27, 4.4 / 35.6 / 59.7 m | same | reproduces |
| plot census [N]: wall nodes with ≥ 2 street arms 6 and 2; 0 crossings without a shared node | same | reproduces; see section 8 (2) |
| plot census [M]: shared wall in rings, residential 2 % / 5 %, industrial 96 % / 98 % | same (n 888 / 51 and 1 213 / 61) | reproduces |
| `ftg_anisotropy.out`: land-sector r90 CV 0.20 / 0.33, road ratio 1.26 / 1.65, centres (4, 204) and (174, −405) m | same | reproduces |
| server time 2.9–3.2 s (PUT → layout OPTIONS; roadlength100 README, B17) | 3.234 / 2.897 s | reproduces |
| FTG persons per building 3.4 (§13.5) | 9 500 / 2 798 = 3.40 (2026-09-25: 3.38) | reproduces |

Further receipts: the stored `MeasureInput` files equal a fresh adapter run (both `True`). A second full run wrote a
byte-identical JSON (sha256 equal) and identical stdout. With one expectation changed (`--red`: run 50.5 → 50.0),
`--check` prints FAIL and exits 1 and writes nothing. The adapter's way chains cover every road edge exactly once: the
way features hold 1 499 and 1 157 segments, which equal the type 0 + 1 + 2 + 10 (+ 13) edge counts. The adapter's
`provenance()` was also run read-only on W-02's day-1 folder `2026-10-03T17-19-06`. It returned
`ftg:2026-10-03+aa8ba6c213b6` (274 285 bytes) and 2.553 s, the same values as that capture's README, so the hash rule
is W-02's.

## 3 The row's turning and entropy check — criteria fixed before the first V12 value (CONFIRMED)

The row asks that turning per 100 m and heading entropy "agree with rows 7–9 within the 10 m-resampling change
(declared)". Rows 7–9 are statements about one payload: `critic2/zigzag_rederive.py` reads only the 2026-09-21 payload.
The script fixed four criteria before the first run:
- (i) the raw way vertices of the V12 way set keep row 7's cliff, with the 15° and 16° bins empty;
- (ii) `junction.angles` by V12's definition has its median within the 1° angle floor of 90.02°;
- (iii) the length-weighted heading spectrum of the 10 m chords stays flat, with its largest 10° bin under twice the
  uniform 5.6 %;
- (iv) both new values exist.

| criterion | 2026-09-21 (rows 7–9's payload) | 2026-09-25 (pre-registered extension, not a row check) |
|---|---|---|
| (i) raw way-vertex bins 15° / 16° | 0 / 0 — pass | 1 / 1 — **fails by data**: the 16° vertex is a type-0 suburb vertex, which row 7's own method also finds on this payload (bins 15 / 16 = 0 / 1); the 15° vertex is on a trail (edge type 13, absent from the first payload) |
| (ii) junction median | 90.15° — pass | 90.52° — pass |
| (iii) largest heading bin | 10.5 % — pass | 9.7 % — pass |
| (iv) turn100, entropy50 | 8.021° per 100 m, 1.507 bits — pass | 8.494°, 1.180 bits — pass |

The row's check passes. The extension's failure is a fact about the reference rather than about the tool: the twin of row 7
and the V12 way set report the same 16° vertex. The declared change from resampling is that 10 m chords soften the
cliff. The resampled step histogram holds 1.03 % / 0.82 % of steps above 15°, at 15–18° and in the ≥ 45° overflow
(0.50 % / 0.23 %). Two vertices inside one chord add their turns, and one vertex turn spreads over two chords. Raw way
vertices show no mass at 15–16° on the first payload.

## 4 The V12 values per CITY payload (fixtures; CONFIRMED, executed on the `MeasureInput` files)

Way classes: arterial 96 / 51 ways (9.7 / 7.0 km), street 262 / 279 (11.8 / 13.1 km), lane 404 / 281 (18.2 / 13.4 km),
track 10 / 6 (5.3 / 4.7 km). Quantiles inside a seed are Hyndman and Fan type 7.

| metric | 2026-09-21 | 2026-09-25 | §13.5's recorded FTG number | change and its cause |
|---|---|---|---|---|
| `street.turn100` (° per 100 m, length-weighted median, ways ≥ 50 m) | **8.021** (228 ways); arterial 6.87, street 20.88, lane 11.30, track 8.02; without tracks 9.01 | **8.494** (245); 5.38, 11.72, 10.58, 8.63; without tracks 5.95 | — (⟨M-1⟩, new) | new; the street class halves where the second stage's road length is 100 m instead of 60 m (fewer capped vertices per 100 m) |
| `street.stepHist` (1° bins 0–45 + overflow) | n 4 163; 87.0 % in bin 0; 1.03 % above 15°; overflow 0.50 % | n 3 544; 87.5 %; 0.82 %; 0.23 % | "zero mass above 15° per step" (rows 7–9) | section 3 |
| `street.entropy50` (bits; 18 bins of 5°) | **1.507** (493 windows; 9 above 90°) | **1.180** (469; 1) | — (new) | new; maximum log₂ 18 = 4.17 |
| `junction.angles` (median, p5) | **90.15°, 69.65°** (n 1 303; 55.4 % in 80–100°) | **90.52°, 59.99°** (n 1 060; 56.2 %) | median 90.02°, 58 % in 80–100° | way graph only (lot outlines, fences, water outline and border no longer arms), nodes merged within 2 m (24 / 11 clusters), arms 10 m along |
| `junction.share4` | **0.279** (394 junctions) | **0.299** (318) | 36.4 % | the same way-graph change: 4-way share of junctions among ways only |
| `street.runs` (m, per-class median of junction-to-junction runs) | arterial **55.17** (96), street **41.98** (262), lane **40.24** (404), track 278.1 (10) | **57.60** (51), **49.61** (279), **44.69** (281), 317.0 (6) | main L + 0.5, district (L + 0.5) / 2, suburb 30.00, lot outlines 14.70 (edge and collinear-run modes) | different quantity: V12's runs end at every way junction and the median mixes run counts; the roadlength100 laws stay as recorded (section 2) |
| `bldg.area` (m², median, p95) | **102.67, 153.69** | **96.44, 188.97** | 103, 154 | type-7 quantiles; second payload new |
| `bldg.quadSide` (m) | **10.337** (2 514 quads) | **10.120** (2 532) | 10.3 | — |
| `bldg.worstCorner` (°, p95) | **22.93** | **21.54** | 22.9 | — |
| `bldg.partyShare` (median share of perimeter within 0.3 m of another footprint) | **0.000** (mean 0.037) | **0.000** (mean 0.067) | residences 0–5 %, industry 96–98 % (a different measure) | V12's per-footprint share; by category in rings: residential median 0, attached 2.4 % / 11.6 % (5.4 % without the 80 exact-duplicate records of the second payload); industrial median 0.51 / 0.40, attached 96.1 % / 98.4 % |
| `bldg.attached` | **0.072** | **0.110** | — | counts the second payload's 40 exact-duplicate pairs (kept: V12's degenerate rule does not drop duplicates; decision W05-D16) |
| `wall.towerSpacing` (m, p50 along the curtain) | **38.65** (n 16) | **35.59** (n 27) | 39 m | on the first payload's even count (16) type 7 averages the two middle spacings; the probe took the upper one (39.3); the second payload's odd count gives the probe's 35.6 |
| `wall.ungated` (arterial crossings of the curtain at no gate) | **3** (any way class 4) | **1** (any 1) | 6 and 2 | section 8 (2) |
| `gate.count` | **0** | **0** | — | the payload has no gate object |
| `water.step` (m, median spacing after dropping vertices turning < 1°, pooled) | **50.37** (n 172) | **15.69** (n 545) | 50 m | section 8 (3) |
| `water.riverWidth` (m, median of inward-normal bank widths) | **31.30** (1 148 samples; p25–p75 31.29–31.31) | **48.48** (1 123; 48.48–48.49) | ≈ 31 m | rivers are constant-width ribbons; the second payload's are wider |
| `tree.nnP1`, `tree.nnMedian` (m) | **0.901, 10.591** (4 125 trees; min 0.141) | **1.118, 10.570** (3 844; min 0.100) | median 9.7, min 0.14 | section 8 (1) |
| `tree.pcf` at 1, 2, 3, 4, 5 … 20 m | 36.3, 21.1, 16.1, 13.7, 12.2 … 6.40 (h 11.7 m) | 41.6, 24.2, 18.6, 15.8, 14.2 … 7.85 (h 12.1 m) | — (new) | the map square as window: trees fill a fraction of it, so g ≫ 1 throughout (clustering at the forest scale); declared parameters W05-D9 |
| `pop.perBuilding` | **3.395** (9 500 nominal / 2 798) | **3.377** | 3.4 | `populationSource: nominal` (no resident count in the payload) |
| `time.model` (ms, PUT sent → layout GET sent) | **4 267** (PUT → OPTIONS 3 234) | **3 717** (2 897) | server 2.9–3.2 s | W-02's definition (PUT → GET); §13.5's figure is PUT → OPTIONS, reproduced in section 2; no score ratio applies to a remote server; scene time not re-derivable here (the step log stamps a step's end after its profile settles, not the click) |
| `outline.r90cv` (36 sectors of 10°, all sectors ≥ 5 buildings) | **0.365** (36 sectors) | **0.333** (35) | 0.20–0.33 | section 8 (4) |
| `outline.roadRatio` | **1.160** (9 road sectors; 11 arterial exits) | **1.214** (11; 17) | 1.26–1.65 | section 8 (4) |

## 5 Wealth (D25) — member ids fixed here (W-05 fixes them, `metrics.m-1.json` `wealth.*`)

Member ids: **`wealth.tier1` … `wealth.tier6`**, the share of households requested in each lifestyle tier, lowest first
(request order; the residential pools step up in the same order, CONFIRMED by reading). Values, identical in both
requests: **0.0109, 0.0109, 0.2174, 0.4348, 0.2174, 0.1087** (weights 1, 1, 20, 40, 20, 10 of 92). They are inputs.
The payload has no per-household or per-building tier. Its residence buildings map to the request's residential pools,
and each building type sits in a pair of adjacent tiers. Only **tier pairs** (1–2, 3–4, 5–6) are recoverable, so the six
rows stay descriptive by design (plan section 8 (6)). The output proxy, as a descriptive note with no row: residence
buildings by tier pair **0.249 / 0.588 / 0.163** (2 039 residences, 0 unmapped) and **0.242 / 0.565 / 0.193** (2 031),
against requested pair shares 0.022 / 0.652 / 0.326. These are building counts, not households: the low pair has
11 times its requested share of buildings. `metrics.m-1.json` was not edited (W-01's landed file); W-15 registers the
six ids from this section.

## 6 Variety (D16, FTG) — the signature vector, defined here as a proposal (a ruling is owed, shared with W-09)

§7.7 names the components (radial share of arterials, orthogonality index, street-density profile, block-area CV,
enclosed share, outline anisotropy) but defines none; no volume does (grep, CONFIRMED). `measure_ftg.py`'s
`m_signature` implements this proposal on any `MeasureInput`. Let *R* be the 90th percentile of building-centroid
distance from the header centre; only 10 m way chords with their midpoint within *R* count.
1. **radialShare**: the length share of arterial chords whose direction lies within 30° of the radial direction.
2. **orthogonality**: |Σ ℓ e^{4iθ}| ÷ Σ ℓ over all way chords. This is `grid.r4`'s form.
3. **density profile**: way km per km² in the annuli 0–⅓R, ⅓–⅔R and ⅔–R (three components).
4. **blockAreaCV**: the coefficient of variation of the cluster-block areas (V12 §3.4.1: 1.0 m gap, 3 m closing,
   computed on a 0.5 m raster with a square kernel) of blocks whose seed footprint lies within *R*.
5. **enclosedShare**: the share of buildings inside the outermost enclosure. It is 0 where a source has none.
6. **outline**: `outline.r90cv`.

Vectors: 2026-09-21 **[0.507, 0.214, 36.78, 27.22, 9.40, 1.669, 0, 0.365]** (R 715 m); 2026-09-25 **[0.141, 0.201, 27.56,
24.83, 10.66, 1.857, 0, 0.333]** (R 686 m).

Two findings bear on the ruling, both CONFIRMED:
- FTG's constant ≈ 1.5 m gap between footprints exceeds V12's 1.0 m cluster gap. So 2 588 of 2 617 and 2 495 of 2 565
  cluster blocks are single footprints, and FTG's "block-area CV" is close to its footprint-area CV.
- FTG has no enclosure (its wall is an open chain from bank to coast), so component 5 is constant 0 for FTG.

**Why no dispersion now.** `variety.dispersion` is defined per matched rung (BIG_TOWN, BIG_CITY), standardised by the
rung's pooled deviations, and these are CITY fixtures. Two vectors standardised by their own deviations always lie √(2k)
apart. The FTG floor is therefore computed when the six captures land (three per size, `estimator: minmax`, n = 3), with
pooled deviations formed with W-09's MFCG vectors. The proposed `absFloor` for this z-distance metric, which V12 leaves
open, is 0.1, a tenth of a pooled deviation (W05-D18).

## 7 Decisions taken under the delegation (each vetoable; none changes a design cell)

| id | decision | why; effect |
|---|---|---|
| W05-D1 | edge types 2, 10, 13 (dirt road, small road, trail) → way class `track` | the plan maps three classes only; they are road-like and outside the town's stages. `turn100` without tracks: 9.01 / 5.95 (with: 8.02 / 8.49) |
| W05-D2 | a way = a maximal same-class chain of road edges through way-degree-2 nodes | FTG stores no way entity; this equals `street.runs`' runs. Long through-streets are split at junctions, and ways under 50 m (mostly single straight edges) leave `turn100` |
| W05-D3 | header centre = area-weighted footprint centroid | V12 §2.2's last fallback: no exported square, wall not a ring; (−0.4, 230.3) and (178.0, −409.7) m against the old script's trimmed centres (4, 204) and (174, −405) |
| W05-D4 | water class: reaches the map border with 2A/P ≥ 200 m → sea; reaches it below 200 m → river; else lake (the harbour basins) | 1 sea, 2 rivers, 1 basin in each |
| W05-D5 | `entropy50`: non-overlapping 50 m windows of five full 10 m chords; the window's net heading change, absolute; ≥ 90° counted in the last bin (counts reported) | V12 states bins, not windowing |
| W05-D6 | junction arms: direction from the merged node's centre to the point 10 m along the arm, stopping at the next junction | V12: "10 m along it" |
| W05-D7 | `riverWidth`: inward-normal rays from bank samples every 10 m; map-border cuts excluded | V12 states "the median river width" only |
| W05-D8 | `water.step`: one pass dropping vertices turning < 1°; spacing along the outline | — |
| W05-D9 | `tree.pcf`: Epanechnikov kernel, h = 0.15 / √λ, translation edge correction, the settlement border square as window, λ² = n(n − 1) / \|W\|² | Stoyan and Stoyan's estimator with its common constant; the window choice drives the level |
| W05-D10 | outline: population SD for the CV; arterial exits = sign changes of (distance − its sector's r90) along 10 m-resampled arterials, a sector under 5 buildings counting r90 0 | V12 states the sectors and the 5° rule only |
| W05-D11 | `wall.ungated`: a crossing is an interior curtain vertex with way arms on both sides, or a proper intersection (0 here); chain ends never cross | section 8 (2) |
| W05-D12 | `time.model` for FTG = PUT sent → layout GET sent, no score ratio | W-02's README definition, so all eight captures share one |
| W05-D13 | wealth member ids `wealth.tier1` … `.tier6` = request shares; tier-pair output shares a note | section 5 |
| W05-D14 | the signature vector's definitions | section 6; to be ruled together with W-09 |
| W05-D15 | `field` features from ground-cover texture ids 0, 1, 3, 11, 12, 13 | PLAUSIBLE identification (six groups match the six farm textures of the code reading by count and size); no metric of this item reads them |
| W05-D16 | exact-duplicate footprints kept | V12 §3.2.2's degenerate rule does not drop them; the split without them is reported |
| W05-D17 | quantiles inside a seed: type 7 | the same estimator V12 §3.5.1 uses across seeds |
| W05-D18 | proposed `absFloor` 0.1 for `variety.dispersion` | `metrics.m-1.json` marks it open for W-05 and W-09 |

## 8 Numbers §13.5 states for FTG that the re-measurement moves (each CONFIRMED; for the shift record and a Fable ruling)

1. **Tree nearest-neighbour median 9.7 m → 10.6 m.** The recorded script searched one 20 m cell around each tree and
   silently dropped trees with no neighbour in that block. That removed 320 of 4 125 trees (7.8 %), all with large
   neighbour distances. A brute-force check on 300 trees agrees with the new value to 0.0 m. The minimum (0.14 m) and the
   "not Poisson" reading stand. The weakness row's reference median becomes 10.59 / 10.57 m.
2. **"6 and 2 ungated crossings" → 3 and 1 arterial crossings (4 and 1 by any way class).** The census counted every
   wall node carrying two street arms. Two of the 2026-09-21 nodes and one of the 2026-09-25 nodes are the wall chain's
   ends, where a street passes round the wall's end and crosses nothing. The other four (2026-09-21) are side-tested
   crossings: three on main roads and one on a street. The weakness row's bar ("ungated crossings 0") is unaffected;
   its reference number changes.
3. **Water step 50 m holds on one payload only.** On the 2026-09-25 payload the rivers keep 50 m, but the coast polygon
   (478 vertices) is drawn at a 15 m step and the harbour basin at 13 m, so the pooled V12 step is 15.69 m. The target
   band "outline step ≤ 25 m" is ours; the reference number is per payload.
4. **Outline anisotropy 0.20–0.33 / 1.26–1.65 → 0.365 / 0.333 and 1.160 / 1.214.** The old script used 16 sectors,
   land sectors only (water < 0.2, ≥ 20 buildings), a vertex-mean trimmed centre and main-road edge midpoints in a
   400–1 500 m annulus. V12's definition uses 36 sectors and keeps water sectors, which raises the CV on a coastal
   town. Its road sectors are those where an arterial leaves the built outline, which lowers the ratio. The band is
   recomputed by the band rule once the six captures give per-size rows. §13.5's "monotone in the anisotropy row" is
   ours.
5. **The 15° cliff (rows 7–9, weakness).** It reproduces exactly on the 2026-09-21 payload. On the 2026-09-25 payload,
   one type-0 vertex turns 16° (row 7's own method, 1 of 178 type-0 turns under 45°), and after 10 m resampling ≈ 1 %
   of steps lie above 15° on both. The weakness clause "no cliff" is a property of ours and still reads; the wording
   "zero mass above 15° per step" for FTG should read "≤ 1 % above 15° per 10 m step; no raw vertex above 15° on the
   2026-09-21 payload, one at 16° on the 2026-09-25 payload".

Also new, not a §13.5 number: FTG's junction 4-way share among ways is 0.28 / 0.30, against 36.4 % over every edge
type. The weakness reference for organic presets should read the V12 value.

## 9 What waits for the six captures (sequencing by the plan, not a deferral of a finding)

The six W-02 payloads (day 1 landed `2026-10-03T17-19-06`; the task scoped this lane to the two CITY payloads) each get
`adapters/ftg.py <stamp>` and `measure_ftg.py <stamp>` the day they land. Three results follow from them:
- the per-size rows: BIG_TOWN and BIG_CITY, `estimator: minmax` at n = 3, `sample.captures` the plan's slots in order;
- FTG's `variety.dispersion` floor, with W-09's pooled deviations;
- the BIG_TOWN / BIG_CITY time rows (`time.model`, weakness), which are not contended only if W-02's machine note allows.

None of these needs new code. The fixture checks of section 2 stay tied to the two CITY payloads.

### 9.1 W-05b, pass 1 — slots 0–7 and the recorded CITY capture (lane `m1/W-05b`, 2026-10-03)

**Outcome (CONFIRMED by execution).** Every slot that was bound when this pass began is measured, and every check of
W-05b's row passes, 4 of 4. Eight slots were bound at that point, and none had failed:
- slots 0–5, programme 1: three BIG_TOWN and three BIG_CITY;
- slots 6 and 7, programme 2: the first two METROPOLIS, bound during this lane by `m1/W-02-slot6b` and
  `m1/W-02-slot7b`. Slot 6's first seat had stopped before any create (E02 section 16).

The recorded CITY family's usable capture was measured with them. Slots 8–27 are open, and a recording seat may be taking
slot 8 as this pass ends. Each measured capture now has:
- a `MeasureInput` file for W-15 and M1;
- every FTG metric of D14, D25 and D26;
- its R-10 signature vector.

No dispersion is formed here (R-40), and the values are measured values, not rows (R-47 (a)). W-15 forms the rows, the
bands and both dispersions. TOWN's two slots (26, 27) are open, so this pass has no research-side TOWN numbers. The item is
rolling. A pass reads the slots decided (bound or failed) when it begins. A slot decided later has a higher number, because
`plan.py` binds in slot order, so it belongs to the next pass, and the checks list it. The last pass runs after slot 27 or
the programme's stop.

| file | what it is |
|---|---|
| `research/baselines/measure_ftg_slots.py` | W-05b's tool. It drives `adapters/ftg.py` (unchanged, `782e636f…`) and `measure_ftg.py`'s `metrics()` over the slots `plan.json` has decided and the recorded family's usable captures. It forms the per-size samples, the vectors, the time table, a per-body water note and the four checks. `--check` re-runs the checks from the JSON, fresh adapter runs and the requests; `--red` plants one fault per check. |
| `research/baselines/measure_ftg.py` | split, without a change of behaviour. `metrics(mi)` is the metric half of `measure()`, moved into its own function; `measure()` calls it and adds the twin, as before. The reason: slot 6's raw payload holds a footprint with a repeated vertex, and the fixture twin's raw-quad routine (a re-typing of an older script, tied to the two CITY fixtures by R-03) divides by zero on it. The metric half reads the `MeasureInput`, where the adapter has merged that vertex. Receipt: W-05's `--check` gives 7 PASS, exit 0, and writes `E05-ftg-metrics.json` byte-identical (`243bca8e…`). |
| `research/baselines/inputs/FTG/ftg-2026-10-0<d>_<hash>/<stamp>.metric.geojson.gz` | eight new `MeasureInput` files, one per slot, 3.10 MB in all (the two METROPOLIS files 0.76 MB each). The recorded CITY file (`e8377e6e…`) was compared, not rewritten. An existing file is never overwritten. |
| `docs/calibration/E05-ftg-metrics.slots.json` | per slot: every metric value, the counts, the `MeasureInput` hashes, the 17 size-dependent request values, the server and client times and a per-body water-outline note. Per size: the samples. Also the signature vectors, the turning band beside the exception, the outline band inputs, the slot status, the pass's last slot and the four checks. W-05's `E05-ftg-metrics.json` is unchanged. |

Run (project root): `python3 research/baselines/measure_ftg_slots.py --write --md <tables>`, then
`python3 research/baselines/measure_ftg_slots.py --check`. The measuring run ran under `nice` while M0's seats and a
recording seat were running.

**Per-slot values** (the slot's `MeasureInput`; quantiles inside a slot are type 7; "CITY rec. 0" is
`capture/FTG/CITY/coast+river/0`, the 2026-09-21 capture, whose values equal section 4's first column):

| metric (unit) | slot 0 | slot 1 | slot 2 | slot 3 | slot 4 | slot 5 | slot 6 | slot 7 | CITY rec. 0 |
|---|---|---|---|---|---|---|---|---|---|
| size / water | BIG_TOWN / none | BIG_CITY / none | BIG_TOWN / coast+river | BIG_CITY / coast+river | BIG_TOWN / coast+river | BIG_CITY / coast+river | METROPOLIS / none | METROPOLIS / coast+river | CITY / coast+river |
| buildings / towers | 1 694 / 25 | 7 164 / 66 | 1 821 / 31 | 7 342 / 40 | 1 880 / 22 | 7 270 / 49 | 14 748 / 93 | 14 617 / 74 | 2 798 / 17 |
| street.turn100 (° / 100 m) | 7.516 | 8.522 | 8.456 | 13.728 | 6.463 | 11.911 | 10.853 | 15.961 | 8.021 |
| street.stepHist share > 15° | 0.0059 | 0.0044 | 0.0091 | 0.0094 | 0.0073 | 0.0089 | 0.0035 | 0.0108 | 0.0103 |
| street.entropy50 (bits) | 0.990 | 1.446 | 1.454 | 1.763 | 1.208 | 1.773 | 1.460 | 1.987 | 1.507 |
| junction.angles median (°) | 93.54 | 93.21 | 90.27 | 90.63 | 90.28 | 91.09 | 92.77 | 92.14 | 90.15 |
| junction.angles p5 (°) | 55.40 | 58.03 | 71.58 | 67.24 | 74.88 | 64.81 | 58.32 | 57.72 | 69.65 |
| junction.share4 | 0.172 | 0.151 | 0.296 | 0.277 | 0.319 | 0.275 | 0.182 | 0.222 | 0.279 |
| street.runs arterial (m) | 50.5 | 42.5 | 50.5 | 50.5 | 75.8 | 50.5 | 44.5 | 41.4 | 55.2 |
| street.runs street (m) | 33.9 | 35.2 | 39.0 | 35.2 | 47.5 | 35.2 | 35.2 | 35.3 | 42.0 |
| street.runs lane (m) | 44.7 | 44.7 | 43.7 | 30.0 | 44.7 | 31.2 | 44.7 | 32.4 | 40.2 |
| street.runs track (m) | 75.8 | 50.3 | 213.8 | 80.0 | 214.5 | 381.5 | 50.5 | 77.9 | 278.1 |
| bldg.area median (m²) | 86.3 | 92.9 | 103.3 | 100.5 | 99.4 | 99.9 | 90.8 | 90.5 | 102.7 |
| bldg.area p95 (m²) | 167.6 | 186.5 | 177.4 | 155.3 | 155.8 | 164.1 | 166.4 | 160.2 | 153.7 |
| bldg.quadSide (m) | 9.34 | 9.71 | 10.42 | 10.38 | 10.39 | 10.32 | 9.81 | 9.90 | 10.34 |
| bldg.worstCorner p95 (°) | 24.53 | 27.27 | 21.75 | 22.34 | 17.42 | 26.35 | 26.00 | 25.42 | 22.93 |
| bldg.partyShare | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| bldg.attached | 0.182 | 0.296 | 0.190 | 0.087 | 0.113 | 0.153 | 0.268 | 0.199 | 0.072 |
| wall.towerSpacing (m) | 32.40 | 33.36 | 34.90 | 31.74 | 34.96 | 34.11 | 32.89 | 31.81 | 38.65 |
| wall.ungated (arterial) | 1 | 6 | 2 | 1 | 4 | 1 | 7 | 5 | 3 |
| gate.count | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| water.step (m) | — | 8.88 | 70.17 | 50.33 | 50.66 | 16.25 | 12.26 | 16.15 | 50.37 |
| water.riverWidth (m) | — | — | 49.95 | 31.49 | 43.17 | 42.16 | — | 31.66 | 31.30 |
| tree.nnP1 (m) | 0.981 | 1.082 | 1.031 | 0.985 | 1.118 | 1.324 | 1.184 | 1.334 | 0.901 |
| tree.nnMedian (m) | 9.47 | 9.40 | 10.63 | 11.12 | 10.88 | 10.07 | 9.11 | 9.70 | 10.59 |
| pop.perBuilding | 3.306 | 3.420 | 3.075 | 3.337 | 2.979 | 3.370 | 3.356 | 3.386 | 3.395 |
| time.model (ms, server) | 2 553 | 5 656 | 1 869 | 6 298 | 2 232 | 5 976 | 11 147 | 15 223 | 4 267 |
| outline.r90cv | 0.473 | 0.144 | 0.487 | 0.177 | 0.278 | 0.474 | 0.183 | 0.279 | 0.365 |
| outline.roadRatio | 1.922 | 1.056 | 1.875 | 1.206 | 1.356 | 1.638 | 1.167 | 0.845 | 1.160 |
| wealth.tier1 … tier6 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 |

**The samples W-15 forms into rows (R-34).** Each sample holds its slots in plan order (`sample.captures`). The slots are
grouped by what each request says, not by the plan's label alone, and check 2 holds the two equal. The water rows
(`water.step`, `water.riverWidth`) read the `coast+river` slots only. The estimator column is V12 §3.5.1's for that n:
`type7` at n ≥ 10, `minmax` at 2–9, `single` at 1. The 2026-09-25 capture appears in the CITY family's `failed` list with
reason `setting` (R-02, R-04), and in no value.

| FTG size (rung) | n now / planned | estimator at n | slots in order | water-row slots (n) | open slots | failed |
|---|---|---|---|---|---|---|
| BIG_TOWN (TOWN) | 3 / 10 | minmax | 0, 2, 4 | coast+river/0, coast+river/1 (2) | 10, 12, 14, 16, 18, 20, 22 | — |
| BIG_CITY (CITY) | 3 / 10 | minmax | 1, 3, 5 | coast+river/0, coast+river/1 (2) | 11, 13, 15, 17, 19, 21, 23 | — |
| METROPOLIS (METROPOLIS) | 2 / 4 | minmax | 6, 7 | coast+river/0 (1) | 8, 9 | — |
| CITY (TOWN) | 1 / 4 | single | rec. 0 | coast+river/0 (1) | 24, 25 | CITY/coast+river/1 (setting) |
| TOWN (TOWN) | 0 / 2 | no row (R-34) | — | — (0) | 26, 27 | — |

**FTG signature vectors (R-10; vectors only, R-40).** These are the eight components of section 6, with R = the 90th
percentile of building-centroid distance from the header centre. FTG has no enclosure, so component 5 is 0 by definition.

| slot | size / water | radial | orthog. | dens. in / mid / out (km/km²) | block CV | encl. | r90 CV | R (m) |
|---|---|---|---|---|---|---|---|---|
| 0 | BIG_TOWN / none | 0.6533 | 0.2520 | 30.82 / 15.26 / 8.79 | 1.7881 | 0 | 0.4732 | 557.3 |
| 1 | BIG_CITY / none | 0.5484 | 0.3014 | 45.85 / 41.06 / 29.06 | 2.0337 | 0 | 0.1443 | 704.3 |
| 2 | BIG_TOWN / coast+river | 0.4014 | 0.4428 | 35.30 / 18.17 / 12.72 | 1.5023 | 0 | 0.4868 | 583.6 |
| 3 | BIG_CITY / coast+river | 0.7046 | 0.1387 | 47.42 / 45.33 / 30.95 | 1.5478 | 0 | 0.1774 | 794.0 |
| 4 | BIG_TOWN / coast+river | 0.2787 | 0.2503 | 26.62 / 21.14 / 11.49 | 1.3759 | 0 | 0.2781 | 607.1 |
| 5 | BIG_CITY / coast+river | 0.5012 | 0.1523 | 26.00 / 25.92 / 18.14 | 1.9440 | 0 | 0.4744 | 1005.0 |
| 6 | METROPOLIS / none | 0.5546 | 0.0624 | 45.80 / 42.67 / 26.68 | 1.9856 | 0 | 0.1834 | 1027.9 |
| 7 | METROPOLIS / coast+river | 0.2703 | 0.1707 | 42.91 / 36.91 / 24.76 | 2.3284 | 0 | 0.2793 | 1114.2 |
| CITY rec. 0 | CITY / coast+river | 0.5072 | 0.2141 | 36.78 / 27.21 / 9.40 | 1.6685 | 0 | 0.3650 | 715.1 |

**Street turning beside the declared exception (DC-35).** §13.5's target clause is "0.5–1.5 × FTG's" median turning per
100 m. The table prints that interval around each size's sample median, and the `type7` [p10, p90] band once a size holds
ten slots. No size has ten yet. The sample range is shown for reference and is not a band.

| FTG size | n | per-slot turn100 | median | declared exception 0.5–1.5 × | sample range | type7 [p10, p90] |
|---|---|---|---|---|---|---|
| BIG_TOWN | 3 | 7.516 / 8.456 / 6.463 | 7.516 | 3.758–11.274 | 6.463–8.456 | not formed (n < 10) |
| BIG_CITY | 3 | 8.522 / 13.728 / 11.911 | 11.911 | 5.955–17.866 | 8.522–13.728 | not formed (n < 10) |
| METROPOLIS | 2 | 10.853 / 15.961 | 13.407 | 6.704–20.111 | 10.853–15.961 | not formed (n < 10) |

**The outline band's inputs (DC-11)** are the `outline.r90cv` and `outline.roadRatio` rows of the per-slot table:

| size | `outline.r90cv` | `outline.roadRatio` |
|---|---|---|
| BIG_TOWN | 0.473 / 0.487 / 0.278 | 1.922 / 1.875 / 1.356 |
| BIG_CITY | 0.144 / 0.177 / 0.474 | 1.056 / 1.206 / 1.638 |
| METROPOLIS | 0.183 / 0.279 | 1.167 / 0.845 |

The same values are in the JSON's `outlineBandInputs`. W-15 forms the band by the band rule.

**Server and client times (R-21, R-47 (e)).** `time.model` is FTG's server interval: the PUT sent to the layout GET sent,
read from each session's network index. It is admissible with no host ratio (R-21):

| size | `time.model` (ms) |
|---|---|
| BIG_TOWN | 2 553 / 1 869 / 2 232 |
| BIG_CITY | 5 656 / 6 298 / 5 976 |
| METROPOLIS | 11 147 / 15 223 |
| CITY | 4 267 |

On the client side these captures hold two more times, both measured from the PUT sent. The create click precedes the PUT
by a client delay that the step log does not record: the click's step is logged about 1.03 s after the PUT, at the end of
the driver's idle wait.
- **Layout at the client** is when the interceptor wrote the layout's body file, which it did as the response reached the
  browser.
- **First map shot** is when the seat logged its after-create shot. Each capture README describes that shot as the first
  map frame. The seat's own pace sets this time, so it is only an upper bound.

The **scene-build moment** of §12.9 (6.4–7.0 s after the click) was read from CPU-profile script bursts. These captures
carry no CPU profile (E02 section 2), so it is **not recoverable**. Every slot is flagged contended, because M0's build seats
shared the machine (`capture-facts.json`, `serverTimeContended`). A capture cannot be re-taken in an idle window, so
§13.5's first-map clause at BIG_TOWN and BIG_CITY has no reference value at M-1. R-47 (e) names this as an E19 entry for
W-20 to list. This table is what M1 has.

| slot | server: PUT → layout GET sent (s) | layout at the client (s) | first map shot (s) | scene build | contended |
|---|---|---|---|---|---|
| 0 | 2.553 | 3.129 | 21.384 | not recoverable (no CPU profile) | yes |
| 1 | 5.656 | 9.849 | 26.465 | not recoverable (no CPU profile) | yes |
| 2 | 1.869 | 2.852 | 11.134 | not recoverable (no CPU profile) | yes |
| 3 | 6.298 | 9.955 | 19.944 | not recoverable (no CPU profile) | yes |
| 4 | 2.232 | 4.430 | 22.263 | not recoverable (no CPU profile) | yes |
| 5 | 5.976 | 9.429 | 26.142 | not recoverable (no CPU profile) | yes |
| 6 | 11.147 | 13.626 | 32.149 | not recoverable (no CPU profile) | yes |
| 7 | 15.223 | 17.429 | 31.432 | not recoverable (no CPU profile) | yes |
| CITY rec. 0 | 4.267 | — | — | recorded 6.4–7.0 s for the two CITY captures (CPU profile) | not recorded |

### 9.2 The checks of W-05b's row (executed 2026-10-03, CONFIRMED)

| check (the row's checker column) | how | result |
|---|---|---|
| each slot's `MeasureInput` equals a fresh run | the stored gzip's sha256 against a fresh adapter write into a temporary folder; the JSON compared; the record's hash against the file's. Run by `--check`, apart from the measuring run | 9 of 9 equal: slots 0–7 `9ea13272…`, `d639cbb1…`, `f7cdc815…`, `15a4010d…`, `952cae11…`, `e7121470…`, `d31a6a69…`, `4d638c8d…`; CITY rec. 0 `e8377e6e…` (W-05's file, the bytes the wave-1 verifier checked) |
| every value's captures equal the plan's slots | per size, the sample's slots, grouped by each request's own size and water, against `plan.json`'s slots decided at the pass's start, in slot order (the recorded family's usable capture first); the water-row samples against the `coast+river` slots; each request's size and water against the plan's label; each `referenceBuild` against the capture's `capture-facts.json` and E02's JSON (E05's for the recorded capture); every slot up to the pass's last must still read as the pass read it | BIG_TOWN 0, 2, 4; BIG_CITY 1, 3, 5; METROPOLIS 6, 7; CITY rec. 0; TOWN none. Water rows: BIG_TOWN 2, 4; BIG_CITY 3, 5; METROPOLIS 7. 0 problems at the measuring run (`plan.json` `703dd74b…`). The later `--check` against the live plan also passes, with slot 8 (bound since) listed for the next pass |
| the 2026-09-25 payload is in no sample (R-04) | its capture id and its request hash searched in every sample, water sample, vector and per-slot entry | 0 hits. It appears once, in CITY's `failed` list with reason `setting` |
| E02's same-size values reproduced from the requests | the size-dependent values read from each capture's own PUT body (the exact bytes in the network index; the 2026-09-21 base from its create session), checked two ways: against E02's latest size table, read from E02 itself (section 17.3, 17 rows, after R-41 added the second stage's spoke cap at slot 6); and every later capture of a size against that size's first capture (the post script's same-size rule) | 17 / 17 on all nine captures against E02's columns (METROPOLIS, BIG_CITY, BIG_TOWN, CITY); every later capture 17 / 17 against the first of its size (slot 7 against slot 6 included); 0 rows missing or unmapped |
| the checks discriminate (`--red`) | one planted fault per check: a stored hash altered, two BIG_TOWN slots swapped, the 2026-09-25 capture pooled into CITY, one E02 BIG_TOWN value moved | 0 of 4 pass, exit 1, nothing written. One extra planted fault removed the BIG_TOWN column from the table and moved slot 2's request by one; it failed the first-of-size path and named slot 2 |
| determinism | the measuring run repeated as the tool grew (runs 1–4 on slots 0–5 and the CITY capture), and the pass's snapshot re-run with `--through 7` after slot 8 had bound (run 7); JSON and tables compared | runs 1–4 agree on every value: run 2 equals run 1 byte for byte apart from a per-run "written" flag, now kept out of the record; runs 3 and 4 differ only in the checks block and the added water note. Run 5 (the record, `90349d49…`) equals run 4 on those seven captures after the metric split. Run 7 equals the record in every key but the live plan's hash and check 2's receipt (which lists the slots bound since), slots 6–7 included. The value tables are identical in runs 5 and 7 |
| the plan | `plan.py --check` at the start and the end | SAME, SAME (`metrics.m-1.json` `8a0efa7e…`). `plan.json` moved only with the slot seats' binds; this lane wrote neither file |

### 9.3 What slots 0–7 show (CONFIRMED by the values above; for W-15 and the next design pass, no ruling here)

1. **FTG draws its water outlines at 50 m or at about 15 m; the pooled `water.step` partly measures its own drop rule.**
   - On the five `coast+river` slots the pooled step is 70.17, 50.33, 50.66 and 16.25 m (BIG_TOWN and BIG_CITY) and
     16.15 m (METROPOLIS).
   - Per water body (the table below, and the JSON's `waterOutlines`, a note beside the metric), the raw vertex spacing
     is 50.0 m on every river.
   - It is also 50.0 m on the coasts of slots 2–4 and the CITY capture. The coasts of slots 5 and 7 (294 and 510
     vertices) are drawn at 16.2 and 14.9 m, as the 2026-09-25 payload's coast was (DC-10).
   - W05-D8's one pass drops every vertex turning less than 1°. A coast drawn as straight 50 m pieces keeps only its 4
     corner vertices, and a river keeps 24–86 % of its vertices. So the pooled median mixes the drawing step with the
     lengths of merged straight runs. For example, slot 2's 70.17 m is the median of 31 spacings: 23 on the river (which
     keeps 23 of its 96 vertices) and 8 long ones from the lake and the coast.

   §13.5's band column "outline step ≤ 25 m" is ours and stays a fixed bound (R-48); only FTG's reference value is in
   question. Whether `water.step` keeps W05-D8's drop or reads the raw vertex spacing is a definition call for a ruling
   seat, to be made before W-15 sharpens the reference value. The plan reserves definition calls for a ruling seat, as
   R-49 did. The call is routed there with these numbers and changes no landed value. River widths are 31.49–49.95 m.

   | slot | water.step pooled (m) | per body: class, vertices, raw step (m), vertices kept after the 1° drop, step after the drop (m) |
   |---|---|---|
   | 1 | 8.88 | lake 26, 9.3, 26, 9.3; lake 24, 11.2, 24, 11.2; lake 25, 5.9, 25, 5.9 |
   | 2 | 70.17 | lake 8, 50.0, 4, 157.9; river 96, 50.0, 23, 50.5; sea 93, 50.0, 4, 3 259 |
   | 3 | 50.33 | lake 6, 49.4, 4, 98.9; river 120, 50.0, 53, 50.3; river 128, 50.0, 48, 50.3; sea 131, 50.0, 4, 4 533 |
   | 4 | 50.66 | lake 7, 74.0, 6, 74.0; river 98, 50.0, 56, 50.6; river 88, 50.0, 64, 50.5; sea 108, 50.0, 4, 3 698 |
   | 5 | 16.25 | lake 19, 13.1, 18, 13.1; river 146, 50.0, 62, 50.4; sea 294, 16.2, 224, 15.4 |
   | 6 | 12.26 | lake 13, 12.3, 13, 12.3 |
   | 7 | 16.15 | lake 17, 13.2, 14, 13.5; lake 24, 10.1, 24, 10.1; lake 13, 10.2, 13, 10.2; lake 19, 8.8, 19, 8.8; lake 30, 9.4, 30, 9.4; river 139, 49.9, 120, 50.3; river 124, 50.0, 107, 50.4; sea 510, 14.9, 501, 15.1 |
   | CITY rec. 0 | 50.37 | lake 8, 50.0, 4, 142.2; river 101, 50.0, 69, 50.3; river 132, 50.0, 95, 50.4; sea 128, 50.0, 4, 4 438 |

2. **The turning sample lies inside the declared exception at every size** (n = 3, 3, 2): BIG_TOWN 6.46–8.46 inside
   3.76–11.27, BIG_CITY 8.52–13.73 inside 5.96–17.87, METROPOLIS 10.85–15.96 inside 6.70–20.11. R-34 lists "the
   ten-payload `type7` band inside the exception" as PLAUSIBLE, and it stays PLAUSIBLE until n = 10.
3. **The `none` and `coast+river` slots differ in the junction rows.**
   - The 4-way share among ways is 0.172 / 0.151 / 0.182 on the three `none` slots. It is 0.275–0.319 on the four
     BIG_TOWN and BIG_CITY `coast+river` slots, 0.222 on the METROPOLIS one and 0.279 on the CITY capture.
   - The junction median is 93.5 / 93.2 / 92.8° on the `none` slots, against 90.15–92.14° on the others.

   There is one `none` slot per size, so this is a note for D16's per-water-setting companion and no finding.
4. **A no-coast settlement still has small lakes:** three on slot 1, one on slot 6 (E02 sections 10.3 and 17.3). Their
   outlines give an 8.88 and a 12.26 m step and no river. These slots stay out of the water sample by R-33's rule.
5. **METROPOLIS has about twice BIG_CITY's buildings:**
   - 14 748 and 14 617 buildings, against 7 164–7 342;
   - 93 and 74 towers;
   - R of 1 028 and 1 114 m, against 704–1 005 m;
   - server intervals of 11.1 and 15.2 s, against 5.7–6.3 s.

   Its footprints are no larger than BIG_CITY's: median 90.8 / 90.5 m² against 92.9–100.5 m², and quad side
   9.81 / 9.90 m against 9.71–10.38 m.
6. **The weakness and descriptive rows keep their recorded shape.**
   - `bldg.partyShare` is 0 on every slot: FTG keeps footprints about 1.5 m apart.
   - `bldg.attached` is 0.087–0.296.
   - `gate.count` is 0 on every payload, which has no gate object.
   - Arterial crossings of the curtain at no gate are 1–7 per payload, against ours 0.
   - The tree nearest-neighbour median is 9.11–11.12 m.
   - Persons per building, at the nominal population, are 2.98–3.42.
7. **The size-dependent request values follow the size exactly** (check 4). The draws of each size share all 17 values,
   and their settlements still differ (E02 sections 14.3 and 15.3). W-05b therefore reads each size's slots as
   independent draws of the same settings, as R-33's water mix assumes.

### 9.4 Calls made under the delegation (each vetoable; none changes a design cell or a ruling)

| id | decision | why; effect |
|---|---|---|
| W05b-D1 | the client times are the interceptor's body-file write time and the after-create shot's logged time, both from the PUT sent; the scene-build moment is recorded as not recoverable | these are the only client-side clocks the captures hold. R-47 (e) asks for "what exists", and a proxy named as the scene time would mislead M1 |
| W05b-D2 | samples group the measured captures by each request's own size and water, in slot order, with the recorded family's usable capture first in its family order | check 2 then tests the plan against the payloads, instead of copying the plan's list |
| W05b-D3 | an existing `MeasureInput` file is never overwritten; it must equal the fresh run | W-05's recorded CITY file stays the bytes the wave-1 verifier checked |
| W05b-D4 | the per-slot values go to a new `E05-ftg-metrics.slots.json`, the way E10 and E11 keep their plan-seed values beside the fixture JSON; W-05's `E05-ftg-metrics.json` is not regenerated | the fixture file stays the verified twin (`243bca8e…`) |
| W05b-D5 | each sample carries one scalar per metric (for example the share above 15° for `street.stepHist`; the median, the p5 and the 80–100° share for `junction.angles`; the four class medians for `street.runs`) and `tree.pcf` as its 20-value vector; the full per-slot values stay in the JSON | W-15 needs one number per slot per row and can still reach every value |
| W05b-D6 | each sample is labelled with the estimator V12 §3.5.1 gives at its n and with R-34's bucket, as information only | W-15 forms the rows and may read the labels otherwise |
| W05b-D7 | check 4 reads E02's latest size table (header-detected, its size columns read from the header) and also applies the post script's same-size rule (each capture against its size's first) | each first-of-size capture adds a column and, as slot 6 did, possibly a row (R-41). The tool reads that table without a code change. A row it cannot map to a request leaf fails the check. A size with no column yet (TOWN, slots 26–27) binds from its second capture |
| W05b-D8 | a per-body water-outline note (raw vertex step, vertices kept after the 1° drop, the body's own step) sits beside `water.step` in the JSON and in 9.3 (1); the metric itself is unchanged | the ruling seat can see what the pooled step mixes, without a landed metric being redefined here |
| W05b-D9 | a pass covers the slots decided when it begins; a slot decided later goes to the next pass and is listed by check 2 (`--through K` re-runs a pass's snapshot) | the recording seats bind slots while a pass runs. Slots bind in slot order, so the snapshot is a prefix of the plan, and every slot inside it is re-checked against the live plan |
| W05b-D10 | `measure_ftg.py`'s metric half is split out as `metrics(mi)` and called alone on the slots; the twin is not run on slots | the twin re-types fixture-era scripts on the raw payload and stops on slot 6's degenerate footprint, while the metrics read the cleaned `MeasureInput`. The split moved no line of logic (W-05's JSON is byte-identical); the alternative, patching the twin, would change a twin's faithfulness to its source |

### 9.5 CONFIRMED versus PLAUSIBLE (this pass)

**CONFIRMED (executed or read):**
- every number in 9.1–9.3, the per-body water note included;
- the four row checks, the red test and the extra first-of-size red test;
- the determinism comparisons;
- the adapter's unchanged hash, and W-05's `--check` with its byte-identical JSON after the split;
- `plan.py --check` SAME;
- each after-create shot's description in its capture README.

**PLAUSIBLE (reasoning only):**
- that the interceptor's body-file write time marks the layout's arrival at the page to within a few milliseconds;
- that the create click precedes the PUT by milliseconds;
- that the roadlength100 README's 6.4 s and 7.0 s belong to the 2026-09-25 and 2026-09-21 captures in that order (its
  sentence pairs them with the server times "this time and on 2026-09-21");
- that the ten-slot `type7` turning band will lie inside the declared exception.

**Not touched by this pass:** `plat/`, the design, `plan.py`, `plan.json`, `metrics.m-1.json`, E02, the checklist, the
adapter and W-05's fixture JSON. No website was contacted, no capture bundle was read, and no git command changed state.

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read):
- every number in sections 2–6 and 8;
- the twin reproductions;
- the `referenceBuild` hashes;
- the duplicate count;
- that rows 7–9 come from one payload;
- the tree-search bias and the wall-end crossings;
- that the signature components are undefined in the design.

PLAUSIBLE (reasoning only):
- the farm-texture identification (W05-D15);
- why the second stage's road length lowers the street turning (fewer capped vertices per 100 m);
- that the wider rivers and finer coast of the second payload are generator variation rather than a request difference
  (the requests differ in one leaf);
- that the historical CITY server times were not contended.

## 11 Disk and housekeeping

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E05-ftg-metrics.md --heads docs/ARCHITECTURE.md`
over the full corpus (10 174 colour files, 9 691 JSON files, 941 027 corpus 3-grams, 814 lists) reported C1 0, C2 0,
C4 0, S1 0 and S2 0. C3 reported 38 hits, 36 of them unreviewed: digit runs, dates, capture stamps and phrases of our
own records, none of them a reference word list, palette, grammar or identifier. The exit status 1 is that unreviewed
count. A first run found C4 2: a feature-count list on two lines that matched a corpus list's member set, so those
lines were reworded. This record is outside the design set, so no allow rows were added.
`df -h /Users/cstokes`: 15 GiB free before and after. The outputs are 0.36 MB of `MeasureInput` and 32 KB of JSON. No
capture folder was made, nothing was deleted, and no git command ran. Long outputs are in the session scratchpad
(`m1/w05-*.out`).
