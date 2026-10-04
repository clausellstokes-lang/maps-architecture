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

### 9.6 W-05b, final pass — slots 0–26 and the recorded CITY capture (lane `m1/W-05b-final`, 2026-10-04)

**Outcome (CONFIRMED by execution).** Every slot that `plan.json` has bound is measured, and every check of W-05b's row
passes, 4 of 4. That is 27 slots, 0 to 26, and none has failed:
- programme 1's six slots (0–5);
- programme 2's first 21 slots (6–26).

The recorded CITY family's usable capture was measured with them, so the pass covers 28 captures. Slot 27 (TOWN,
`coast+river`) is **open**. Its seat stopped before the create because the dialog moved without a command (E02
section 38), so no settlement exists for it, and `plan.json` does not mark it failed. If a later seat binds slot 27, one
more pass measures it (`--write`, then `--check`), and every value below stays as it is.

Each measured capture now has:
- a `MeasureInput` file for W-15 and M1;
- every FTG metric of D14, D25 and D26;
- its R-10 signature vector.

No dispersion is formed (R-40), and the values are measured values, not rows (R-47 (a)). The samples W-15 forms into
rows are complete as far as the programme went:
- BIG_TOWN and BIG_CITY hold ten slots each (`type7` at n = 10), with six `coast+river` slots each for the water rows;
- METROPOLIS holds four (`minmax`), three of them `coast+river`;
- CITY holds three usable captures (`minmax`): the 2026-09-21 capture and slots 24 and 25;
- TOWN holds one, slot 26, as research-side numbers with no row (R-34).

This pass builds on pass 1 (sections 9.1–9.5), whose text stands as written. Pass 1's eight `MeasureInput` files and the
recorded CITY file were checked again against fresh adapter runs and are byte-equal. Its values for slots 0–7 and the
CITY capture are reproduced: every per-slot key is equal, the 17 size values pass 1 read included.

**What this pass changed in the tool** (the calls are in 9.9):
1. **The 28-value size class.** R-41 widened the size-dependent class from 17 to 28 values at slot 26, because the
   town's request has one layout stage where the larger sizes have two (E02 section 37.3). E02 37.3 finding 9 found that
   pass 1's reader stops on the town's request. The tool now reads all 28 values by name:
   - an absent leaf reads null;
   - a text leaf reads as the first 12 hex digits of the sha256 of its value, so no request string enters the record;
   - a boolean reads as itself.

   Check 4 reads E02's latest size table, which is now section 37.3 (28 rows, five sizes). E02 37.4 call 3 left that
   reading to this lane. Number cells and "absent" cells are compared exactly. The word cells are compared by their
   pattern: the same word in two size columns must stand for the same request value, and different words for different
   values. Check 4 also holds the tool's 28 rows equal, by name, to the post script's `SIZE_DEPENDENT`, so a further
   widening fails the check until the tool follows it.
2. **The wall rows read walled payloads only.** Slot 12's request is walled, but its payload draws no wall (E02 section
   23.3, which routed this to W-05b's wall rows). The wall rows (`wall.towerSpacing`, `wall.ungated`, `gate.count`) now
   read only the slots whose payload draws a wall. Slot 12 is listed in its sample's `wallRows.noWall` and keeps its
   values in the per-slot table. Check 2 holds this list against E02's own wall counts.
3. **Smaller changes.** `--lane` names the pass in the JSON, and the per-slot table is printed in three parts.

| file | what it is |
|---|---|
| `research/baselines/measure_ftg_slots.py` | W-05b's tool (`f218a9d3…`), changed as above. It still drives `adapters/ftg.py` (`782e636f…`) and `measure_ftg.py`'s `metrics()` (`c6d20992…`), both unchanged by this pass. It reads `ftg_capture_post.py`'s `SIZE_DEPENDENT` and nothing else from that script. |
| `research/baselines/inputs/FTG/ftg-2026-10-04_<hash>/<stamp>.metric.geojson.gz` | 19 new `MeasureInput` files, slots 8–26. The folder now holds 29 files and 8.8 MB, W-05's two fixtures included. The nine earlier files were compared, not rewritten. |
| `docs/calibration/E05-ftg-metrics.slots.json` | rewritten by this pass (`8898b640…`, 28 captures). Each per-slot entry now has 28 size values, and each sample has `wallRows`. Pass 1's version (`90349d49…`) is in the repository at commit `bef102c`. |

Run (project root): `python3 research/baselines/measure_ftg_slots.py --write --lane m1/W-05b-final --md <tables>`, then
`python3 research/baselines/measure_ftg_slots.py --check`. The pass ran under `nice` while M0's build seats were running.
A measuring run takes about ten minutes for the 28 captures.

**Per-slot values.** These are read from each slot's `MeasureInput`. Quantiles inside a slot are type 7. "CITY rec. 0" is
the 2026-09-21 capture. A dash means that the metric has no value on that payload: there is no water on a `none` slot
without ponds, no river on a pond-only slot, and no wall on slot 12.

| metric (unit) | slot 0 | slot 2 | slot 4 | slot 10 | slot 12 | slot 14 | slot 16 | slot 18 | slot 20 | slot 22 |
|---|---|---|---|---|---|---|---|---|---|---|
| size / water | BIG_TOWN / none | BIG_TOWN / coast+river | BIG_TOWN / coast+river | BIG_TOWN / none | BIG_TOWN / coast+river | BIG_TOWN / none | BIG_TOWN / coast+river | BIG_TOWN / none | BIG_TOWN / coast+river | BIG_TOWN / coast+river |
| buildings / towers | 1 694 / 25 | 1 821 / 31 | 1 880 / 22 | 1 675 / 17 | 1 610 / 0 | 1 826 / 23 | 1 675 / 16 | 1 712 / 22 | 1 672 / 14 | 1 789 / 18 |
| street.turn100 (° / 100 m) | 7.516 | 8.456 | 6.463 | 7.666 | 8.256 | 8.698 | 8.615 | 8.392 | 8.456 | 9.687 |
| street.stepHist share > 15° | 0.0059 | 0.0091 | 0.0073 | 0.0027 | 0.0051 | 0.0062 | 0.0129 | 0.0066 | 0.0099 | 0.0175 |
| street.entropy50 (bits) | 0.990 | 1.454 | 1.208 | 0.701 | 1.099 | 1.308 | 1.515 | 1.183 | 1.405 | 1.762 |
| junction.angles median (°) | 93.54 | 90.27 | 90.28 | 91.82 | 92.10 | 91.58 | 91.26 | 93.22 | 91.43 | 91.02 |
| junction.angles p5 (°) | 55.40 | 71.58 | 74.88 | 56.13 | 62.41 | 67.63 | 71.33 | 63.71 | 60.96 | 66.64 |
| junction.share4 | 0.172 | 0.296 | 0.319 | 0.232 | 0.214 | 0.265 | 0.272 | 0.220 | 0.235 | 0.293 |
| street.runs arterial (m) | 50.5 | 50.5 | 75.8 | 50.5 | 50.5 | 50.5 | 50.5 | 50.5 | 50.5 | 52.7 |
| street.runs street (m) | 33.9 | 39.0 | 47.5 | 33.5 | 44.8 | 37.7 | 35.8 | 37.1 | 31.6 | 37.1 |
| street.runs lane (m) | 44.7 | 43.7 | 44.7 | 44.7 | 44.7 | 44.7 | 44.7 | 44.7 | 44.7 | 44.7 |
| street.runs track (m) | 75.8 | 213.8 | 214.5 | 251.2 | 256.9 | 74.2 | 75.6 | 322.3 | 152.6 | 51.3 |
| bldg.area median (m²) | 86.3 | 103.3 | 99.4 | 94.9 | 92.2 | 97.5 | 95.0 | 93.5 | 97.3 | 96.6 |
| bldg.area p95 (m²) | 167.6 | 177.4 | 155.8 | 154.2 | 175.7 | 171.7 | 158.7 | 167.0 | 147.9 | 153.8 |
| bldg.quadSide (m) | 9.34 | 10.42 | 10.39 | 10.14 | 9.97 | 10.26 | 10.25 | 10.11 | 10.24 | 10.27 |
| bldg.worstCorner p95 (°) | 24.53 | 21.75 | 17.42 | 22.48 | 29.52 | 23.04 | 19.73 | 26.70 | 24.54 | 20.92 |
| bldg.partyShare | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| bldg.attached | 0.182 | 0.190 | 0.113 | 0.098 | 0.137 | 0.135 | 0.078 | 0.139 | 0.063 | 0.139 |
| wall.towerSpacing (m) | 32.40 | 34.90 | 34.96 | 36.63 | — | 34.33 | 34.89 | 34.73 | 37.36 | 40.67 |
| wall.ungated (arterial) | 1 | 2 | 4 | 3 | 0 | 3 | 3 | 3 | 0 | 2 |
| gate.count | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| water.step (m) | — | 70.17 | 50.66 | — | 17.47 | 14.29 | 15.17 | 10.19 | 16.87 | 14.49 |
| water.riverWidth (m) | — | 49.95 | 43.17 | — | 44.83 | — | 55.99 | — | 42.62 | 42.95 |
| tree.nnP1 (m) | 0.981 | 1.031 | 1.118 | 0.893 | 0.998 | 1.217 | 0.806 | 0.985 | 0.943 | 0.985 |
| tree.nnMedian (m) | 9.47 | 10.63 | 10.88 | 11.03 | 9.77 | 11.62 | 10.02 | 10.32 | 10.50 | 10.02 |
| pop.perBuilding | 3.306 | 3.075 | 2.979 | 3.343 | 3.478 | 3.067 | 3.343 | 3.271 | 3.349 | 3.130 |
| time.model (ms, server) | 2 553 | 1 869 | 2 232 | 1 934 | 4 445 | 2 064 | 2 627 | 1 951 | 2 127 | 2 135 |
| outline.r90cv | 0.473 | 0.487 | 0.278 | 0.382 | 0.304 | 0.290 | 0.337 | 0.202 | 0.412 | 0.269 |
| outline.roadRatio | 1.922 | 1.875 | 1.356 | 1.704 | 1.185 | 1.581 | 1.337 | 1.083 | 0.908 | 1.290 |
| wealth.tier1 … tier6 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 |

| metric (unit) | slot 1 | slot 3 | slot 5 | slot 11 | slot 13 | slot 15 | slot 17 | slot 19 | slot 21 | slot 23 |
|---|---|---|---|---|---|---|---|---|---|---|
| size / water | BIG_CITY / none | BIG_CITY / coast+river | BIG_CITY / coast+river | BIG_CITY / none | BIG_CITY / coast+river | BIG_CITY / none | BIG_CITY / coast+river | BIG_CITY / none | BIG_CITY / coast+river | BIG_CITY / coast+river |
| buildings / towers | 7 164 / 66 | 7 342 / 40 | 7 270 / 49 | 7 376 / 62 | 7 328 / 37 | 7 696 / 49 | 7 311 / 25 | 7 174 / 51 | 7 603 / 23 | 7 108 / 47 |
| street.turn100 (° / 100 m) | 8.522 | 13.728 | 11.911 | 8.227 | 9.474 | 8.553 | 13.134 | 8.340 | 9.228 | 13.717 |
| street.stepHist share > 15° | 0.0044 | 0.0094 | 0.0089 | 0.0026 | 0.0109 | 0.0055 | 0.0142 | 0.0041 | 0.0127 | 0.0069 |
| street.entropy50 (bits) | 1.446 | 1.763 | 1.773 | 1.291 | 1.638 | 1.408 | 1.900 | 1.252 | 1.653 | 1.737 |
| junction.angles median (°) | 93.21 | 90.63 | 91.09 | 92.47 | 90.14 | 90.45 | 91.02 | 91.42 | 90.56 | 91.35 |
| junction.angles p5 (°) | 58.03 | 67.24 | 64.81 | 55.27 | 69.26 | 67.33 | 67.00 | 58.23 | 66.47 | 61.05 |
| junction.share4 | 0.151 | 0.277 | 0.275 | 0.221 | 0.312 | 0.327 | 0.263 | 0.269 | 0.305 | 0.255 |
| street.runs arterial (m) | 42.5 | 50.5 | 50.5 | 46.9 | 50.5 | 50.5 | 50.5 | 50.5 | 50.5 | 42.9 |
| street.runs street (m) | 35.2 | 35.2 | 35.2 | 35.2 | 36.5 | 35.2 | 35.5 | 35.7 | 36.3 | 35.4 |
| street.runs lane (m) | 44.7 | 30.0 | 31.2 | 44.7 | 30.0 | 31.6 | 35.6 | 44.7 | 30.9 | 39.2 |
| street.runs track (m) | 50.3 | 80.0 | 381.5 | 75.8 | 278.4 | 50.5 | 42.3 | 332.4 | 217.3 | 57.3 |
| bldg.area median (m²) | 92.9 | 100.5 | 99.9 | 96.7 | 104.7 | 99.5 | 98.5 | 95.5 | 100.0 | 92.9 |
| bldg.area p95 (m²) | 186.5 | 155.3 | 164.1 | 177.1 | 191.4 | 167.7 | 149.7 | 157.6 | 152.7 | 156.4 |
| bldg.quadSide (m) | 9.71 | 10.38 | 10.32 | 10.13 | 10.46 | 10.35 | 10.33 | 10.29 | 10.39 | 10.19 |
| bldg.worstCorner p95 (°) | 27.27 | 22.34 | 26.35 | 28.43 | 24.74 | 28.12 | 18.91 | 26.37 | 23.36 | 24.63 |
| bldg.partyShare | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| bldg.attached | 0.296 | 0.087 | 0.153 | 0.231 | 0.099 | 0.129 | 0.129 | 0.143 | 0.114 | 0.152 |
| wall.towerSpacing (m) | 33.36 | 31.74 | 34.11 | 32.09 | 36.55 | 33.35 | 30.91 | 33.07 | 35.43 | 34.52 |
| wall.ungated (arterial) | 6 | 1 | 1 | 7 | 3 | 5 | 1 | 7 | 2 | 3 |
| gate.count | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| water.step (m) | 8.88 | 50.33 | 16.25 | — | 15.56 | — | 16.66 | — | 17.11 | 50.87 |
| water.riverWidth (m) | — | 31.49 | 42.16 | — | 34.66 | — | 53.69 | — | 54.61 | 50.08 |
| tree.nnP1 (m) | 1.082 | 0.985 | 1.324 | 1.044 | 1.204 | 0.943 | 1.000 | 1.030 | 1.265 | 1.209 |
| tree.nnMedian (m) | 9.40 | 11.12 | 10.07 | 10.20 | 10.72 | 10.43 | 10.48 | 10.18 | 10.83 | 9.98 |
| pop.perBuilding | 3.420 | 3.337 | 3.370 | 3.322 | 3.343 | 3.183 | 3.351 | 3.415 | 3.222 | 3.447 |
| time.model (ms, server) | 5 656 | 6 298 | 5 976 | 6 161 | 6 025 | 6 039 | 7 122 | 6 528 | 6 704 | 7 098 |
| outline.r90cv | 0.144 | 0.177 | 0.474 | 0.091 | 0.385 | 0.086 | 0.217 | 0.239 | 0.308 | 0.188 |
| outline.roadRatio | 1.056 | 1.206 | 1.638 | 1.161 | 1.462 | 1.176 | 1.141 | 1.252 | 1.308 | 1.081 |
| wealth.tier1 … tier6 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 |

| metric (unit) | slot 6 | slot 7 | slot 8 | slot 9 | CITY rec. 0 | slot 24 | slot 25 | slot 26 |
|---|---|---|---|---|---|---|---|---|
| size / water | METROPOLIS / none | METROPOLIS / coast+river | METROPOLIS / coast+river | METROPOLIS / coast+river | CITY / coast+river | CITY / none | CITY / coast+river | TOWN / none |
| buildings / towers | 14 748 / 93 | 14 617 / 74 | 15 606 / 92 | 14 313 / 57 | 2 798 / 17 | 2 881 / 36 | 2 770 / 13 | 1 102 / 27 |
| street.turn100 (° / 100 m) | 10.853 | 15.961 | 14.104 | 14.025 | 8.021 | 7.484 | 8.622 | 7.543 |
| street.stepHist share > 15° | 0.0035 | 0.0108 | 0.0041 | 0.0083 | 0.0103 | 0.0049 | 0.0098 | 0.0037 |
| street.entropy50 (bits) | 1.460 | 1.987 | 1.692 | 1.758 | 1.507 | 1.139 | 1.576 | 0.864 |
| junction.angles median (°) | 92.77 | 92.14 | 92.29 | 90.98 | 90.15 | 92.19 | 90.53 | 90.03 |
| junction.angles p5 (°) | 58.32 | 57.72 | 56.78 | 64.05 | 69.65 | 67.32 | 71.07 | 73.69 |
| junction.share4 | 0.182 | 0.222 | 0.207 | 0.276 | 0.279 | 0.205 | 0.324 | 0.370 |
| street.runs arterial (m) | 44.5 | 41.4 | 43.0 | 40.7 | 55.2 | 54.2 | 60.5 | 50.5 |
| street.runs street (m) | 35.2 | 35.3 | 35.2 | 35.2 | 42.0 | 38.5 | 41.0 | 34.5 |
| street.runs lane (m) | 44.7 | 32.4 | 42.6 | 30.0 | 40.2 | 44.7 | 43.0 | 44.7 |
| street.runs track (m) | 50.5 | 77.9 | 58.8 | 213.2 | 278.1 | 84.4 | 192.5 | 398.8 |
| bldg.area median (m²) | 90.8 | 90.5 | 90.5 | 102.6 | 102.7 | 90.7 | 100.8 | 101.4 |
| bldg.area p95 (m²) | 166.4 | 160.2 | 161.2 | 169.1 | 153.7 | 172.4 | 154.1 | 149.0 |
| bldg.quadSide (m) | 9.81 | 9.90 | 9.99 | 10.51 | 10.34 | 9.46 | 10.23 | 10.33 |
| bldg.worstCorner p95 (°) | 26.00 | 25.42 | 27.37 | 26.60 | 22.93 | 21.57 | 16.02 | 20.09 |
| bldg.partyShare | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| bldg.attached | 0.268 | 0.199 | 0.292 | 0.140 | 0.072 | 0.286 | 0.068 | 0.000 |
| wall.towerSpacing (m) | 32.89 | 31.81 | 32.52 | 34.64 | 38.65 | 35.49 | 44.56 | 35.94 |
| wall.ungated (arterial) | 7 | 5 | 3 | 3 | 3 | 5 | 1 | 3 |
| gate.count | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| water.step (m) | 12.26 | 16.15 | 50.22 | 50.00 | 50.37 | — | 15.25 | — |
| water.riverWidth (m) | — | 31.66 | 22.37 | 29.79 | 31.30 | — | 42.87 | — |
| tree.nnP1 (m) | 1.184 | 1.334 | 1.208 | 1.044 | 0.901 | 1.044 | 0.721 | 1.077 |
| tree.nnMedian (m) | 9.11 | 9.70 | 8.74 | 9.39 | 10.59 | 10.34 | 10.14 | 11.52 |
| pop.perBuilding | 3.356 | 3.386 | 3.172 | 3.458 | 3.395 | 3.297 | 3.430 | 3.289 |
| time.model (ms, server) | 11 147 | 15 223 | 10 296 | 14 845 | 4 267 | 2 767 | 5 245 | 1 477 |
| outline.r90cv | 0.183 | 0.279 | 0.383 | 0.387 | 0.365 | 0.189 | 0.258 | 0.255 |
| outline.roadRatio | 1.167 | 0.845 | 1.403 | 1.491 | 1.160 | 1.198 | 1.259 | 1.303 |
| wealth.tier1 … tier6 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 | 0.011/0.011/0.217/0.435/0.217/0.109 |

**The samples W-15 forms into rows (R-34).** Each sample holds its slots in plan order (`sample.captures`), grouped by what
each request says. The water rows (`water.step`, `water.riverWidth`) read the `coast+river` slots, and the wall rows
read the walled payloads. The estimator column is V12 §3.5.1's for that n. The 2026-09-25 capture is in CITY's `failed`
list with reason `setting` (R-02, R-04) and in no value.

| FTG size (rung) | n now / planned | estimator at n | slots in order | water-row slots (n) | wall rows: n (no wall) | open slots | failed |
|---|---|---|---|---|---|---|---|
| BIG_TOWN (TOWN) | 10 / 10 | type7 | 0, 2, 4, 10, 12, 14, 16, 18, 20, 22 | coast+river/0, coast+river/1, coast+river/2, coast+river/3, coast+river/4, coast+river/5 (6) | 9 (slot 12) | — | — |
| BIG_CITY (CITY) | 10 / 10 | type7 | 1, 3, 5, 11, 13, 15, 17, 19, 21, 23 | coast+river/0, coast+river/1, coast+river/2, coast+river/3, coast+river/4, coast+river/5 (6) | 10 (none) | — | — |
| METROPOLIS (METROPOLIS) | 4 / 4 | minmax | 6, 7, 8, 9 | coast+river/0, coast+river/1, coast+river/2 (3) | 4 (none) | — | — |
| CITY (TOWN) | 3 / 4 | minmax | rec. 0, 24, 25 | coast+river/0, coast+river/2 (2) | 3 (none) | — | CITY/coast+river/1 (setting) |
| TOWN (TOWN) | 1 / 2 | no row (R-34) | 26 | — (0) | 1 (none) | 27 | — |

**FTG signature vectors (R-10; vectors only, R-40).** These are section 6's eight components, with R = the 90th
percentile of building-centroid distance from the header centre. Component 5 is 0 by definition.

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
| 8 | METROPOLIS / coast+river | 0.3721 | 0.0573 | 42.39 / 31.89 / 13.41 | 2.1930 | 0 | 0.3828 | 1372.5 |
| 9 | METROPOLIS / coast+river | 0.5107 | 0.0772 | 41.62 / 31.43 / 14.67 | 2.0811 | 0 | 0.3865 | 1397.5 |
| 10 | BIG_TOWN / none | 0.3261 | 0.3814 | 44.41 / 28.70 / 4.25 | 1.3627 | 0 | 0.3824 | 511.5 |
| 11 | BIG_CITY / none | 0.7332 | 0.1173 | 45.15 / 41.52 / 35.53 | 1.8373 | 0 | 0.0907 | 699.8 |
| 12 | BIG_TOWN / coast+river | 0.3860 | 0.1366 | 48.53 / 36.50 / 21.09 | 1.2430 | 0 | 0.3040 | 397.6 |
| 13 | BIG_CITY / coast+river | 0.4454 | 0.2771 | 39.01 / 29.00 / 15.72 | 1.6328 | 0 | 0.3851 | 1028.1 |
| 14 | BIG_TOWN / none | 0.7382 | 0.1404 | 41.58 / 32.65 / 15.86 | 1.4505 | 0 | 0.2896 | 426.5 |
| 15 | BIG_CITY / none | 0.6160 | 0.0988 | 41.30 / 39.06 / 38.80 | 1.5422 | 0 | 0.0857 | 736.1 |
| 16 | BIG_TOWN / coast+river | 0.7454 | 0.4203 | 37.08 / 28.32 / 6.37 | 1.5049 | 0 | 0.3370 | 529.7 |
| 17 | BIG_CITY / coast+river | 0.2253 | 0.1710 | 38.61 / 35.69 / 30.32 | 1.9248 | 0 | 0.2175 | 844.2 |
| 18 | BIG_TOWN / none | 0.3891 | 0.5016 | 39.20 / 42.88 / 23.61 | 1.6425 | 0 | 0.2016 | 376.5 |
| 19 | BIG_CITY / none | 0.6870 | 0.1164 | 43.64 / 39.49 / 26.20 | 1.6349 | 0 | 0.2387 | 779.0 |
| 20 | BIG_TOWN / coast+river | 0.2230 | 0.2985 | 33.93 / 30.56 / 14.28 | 1.7077 | 0 | 0.4120 | 476.7 |
| 21 | BIG_CITY / coast+river | 0.3754 | 0.2571 | 39.87 / 31.86 / 18.59 | 1.9060 | 0 | 0.3077 | 997.0 |
| 22 | BIG_TOWN / coast+river | 0.4764 | 0.2866 | 41.29 / 39.13 / 18.17 | 1.8376 | 0 | 0.2693 | 424.3 |
| 23 | BIG_CITY / coast+river | 0.4751 | 0.2269 | 44.51 / 41.34 / 24.28 | 2.1953 | 0 | 0.1881 | 799.1 |
| 24 | CITY / none | 0.6357 | 0.3984 | 44.59 / 35.61 / 25.23 | 1.9606 | 0 | 0.1890 | 458.1 |
| 25 | CITY / coast+river | 0.2067 | 0.3162 | 35.96 / 29.14 / 21.14 | 1.4268 | 0 | 0.2576 | 577.5 |
| 26 | TOWN / none | 0.6836 | 0.2549 | 48.94 / 30.11 / 18.02 | 0.6242 | 0 | 0.2551 | 352.3 |
| CITY rec. 0 | CITY / coast+river | 0.5072 | 0.2141 | 36.78 / 27.21 / 9.40 | 1.6685 | 0 | 0.3650 | 715.1 |

**Street turning beside the declared exception (DC-35).** BIG_TOWN and BIG_CITY now hold ten slots, so the `type7`
[p10, p90] band is printed beside the declared exception, 0.5–1.5 × the sample median.

| FTG size | n | per-slot turn100 | median | declared exception 0.5–1.5 × | sample range | type7 [p10, p90] |
|---|---|---|---|---|---|---|
| BIG_TOWN | 10 | 7.516 / 8.456 / 6.463 / 7.666 / 8.256 / 8.698 / 8.615 / 8.392 / 8.456 / 9.687 | 8.424 | 4.212–12.636 | 6.463–9.687 | 7.411–8.797 |
| BIG_CITY | 10 | 8.522 / 13.728 / 11.911 / 8.227 / 9.474 / 8.553 / 13.134 / 8.340 / 9.228 / 13.717 | 9.351 | 4.675–14.026 | 8.227–13.728 | 8.329–13.718 |
| METROPOLIS | 4 | 10.853 / 15.961 / 14.104 / 14.025 | 14.064 | 7.032–21.097 | 10.853–15.961 | not formed (n < 10) |

**The outline band's inputs (DC-11)** are the `outline.r90cv` and `outline.roadRatio` rows of the per-slot tables, ten
values each at BIG_TOWN and BIG_CITY and four at METROPOLIS. They are also in the JSON's `outlineBandInputs`. W-15 forms
the band by the band rule at n = 10.

**Server and client times (R-21, R-47 (e)).** The server interval runs from the PUT being sent to the layout GET being
sent. It is admissible with no host ratio. The client times are measured from the PUT being sent, as defined in 9.1.
The scene-build moment is not recoverable, because no capture holds a CPU profile. Every slot is flagged contended,
since M0's build seats shared the machine. So §13.5's first-map clause has no reference value at M-1 (R-47 (e): an E19
entry for W-20).

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
| 8 | 10.296 | 15.513 | 37.835 | not recoverable (no CPU profile) | yes |
| 9 | 14.845 | 17.392 | 32.663 | not recoverable (no CPU profile) | yes |
| 10 | 1.934 | 3.436 | 24.515 | not recoverable (no CPU profile) | yes |
| 11 | 6.161 | 9.504 | 25.546 | not recoverable (no CPU profile) | yes |
| 12 | 4.445 | 5.343 | 14.354 | not recoverable (no CPU profile) | yes |
| 13 | 6.025 | 7.623 | 18.905 | not recoverable (no CPU profile) | yes |
| 14 | 2.064 | 3.796 | 18.154 | not recoverable (no CPU profile) | yes |
| 15 | 6.039 | 9.346 | 24.844 | not recoverable (no CPU profile) | yes |
| 16 | 2.627 | 4.958 | 18.131 | not recoverable (no CPU profile) | yes |
| 17 | 7.122 | 11.844 | 24.643 | not recoverable (no CPU profile) | yes |
| 18 | 1.951 | 4.525 | 18.011 | not recoverable (no CPU profile) | yes |
| 19 | 6.528 | 12.030 | 30.704 | not recoverable (no CPU profile) | yes |
| 20 | 2.127 | 3.898 | 20.430 | not recoverable (no CPU profile) | yes |
| 21 | 6.704 | 10.724 | 19.317 | not recoverable (no CPU profile) | yes |
| 22 | 2.135 | 3.330 | 14.452 | not recoverable (no CPU profile) | yes |
| 23 | 7.098 | 8.687 | 25.572 | not recoverable (no CPU profile) | yes |
| 24 | 2.767 | 4.198 | 20.075 | not recoverable (no CPU profile) | yes |
| 25 | 5.245 | 7.309 | 17.239 | not recoverable (no CPU profile) | yes |
| 26 | 1.477 | 2.710 | 19.208 | not recoverable (no CPU profile) | yes |
| CITY rec. 0 | 4.267 | — | — | recorded 6.4–7.0 s for the two CITY captures (CPU profile) | not recorded |

### 9.7 The checks of W-05b's row (final pass; executed 2026-10-04, CONFIRMED)

| check (the row's checker column) | how | result |
|---|---|---|
| each slot's `MeasureInput` equals a fresh run | as in 9.2: the stored gzip's sha256 against a fresh adapter write, the JSON compared, and the record's hash against the file's; run by `--check`, apart from the measuring run | 28 of 28 equal (each hash is in the JSON's `perSlot[].measureInput`). The nine files of pass 1 are among them, unchanged |
| every value's captures equal the plan's slots | as in 9.2, against the plan's 27 bound slots; also the wall rows against E02's own wall counts for each capture (W-05's tower count for the recorded capture) | BIG_TOWN 0, 2, 4, 10, 12, 14, 16, 18, 20, 22; BIG_CITY 1, 3, 5, 11, 13, 15, 17, 19, 21, 23; METROPOLIS 6–9; CITY rec. 0, 24, 25; TOWN 26. Water rows: BIG_TOWN 2, 4, 12, 16, 20, 22; BIG_CITY 3, 5, 13, 17, 21, 23; METROPOLIS 7, 8, 9; CITY rec. 0, 25. Wall rows: every capture but slot 12. 0 problems (`plan.json` `11a9b357…`); the pass reads slots 0–26, and none was decided since |
| the 2026-09-25 payload is in no sample (R-04) | its capture id and request hash searched in every sample, water and wall sample, vector and per-slot entry | 0 hits. It stands once, in CITY's `failed` list with reason `setting` |
| E02's same-size values reproduced from the requests | the 28 values read from each capture's own PUT body, against E02's latest size table (section 37.3: 28 rows, five sizes): 20 rows of numbers or "absent" exactly, 8 rows of words by their pattern; every later capture of a size against its first; the tool's rows against the post script's `SIZE_DEPENDENT` by name | 28 / 28 on all 28 captures against E02's columns; every later capture 28 / 28 against the first of its size; 0 rows missing or unmapped; 28 tool rows = 28 class names |
| the checks discriminate (`--red`) | pass 1's four planted faults, on the final record | 0 of 4 pass, exit 1, nothing written |
| the new parts discriminate | six more planted faults, in memory, on the final record (`red_extra.py` in the scratchpad): R1 a tool row removed; R2 E02's TOWN word made CITY's; R3 a TOWN "absent" cell given a number; R4 a name added to the post script's class; R5 slot 10's text leaf altered in its request; R6 slot 12 put into BIG_TOWN's wall rows | R1–R5 each fail check 4 only, naming the row or the slot (R4: the unsynced name); R6 fails check 2 only. The baseline passes 4 / 4 before and after |
| pass 1 reproduced | this pass's first run against pass 1's JSON, for the nine captures pass 1 measured | every per-slot key equal apart from `sizeValues`, whose 17 earlier values are equal and which gains the 11 new ones |
| determinism | run 1 against run 2 (the tool before W05b-D11), and run 3 (the record) against run 4 | run 2 = run 1 byte for byte. Run 3 = run 1 in every per-slot entry; it differs only in each sample's wall rows and in check 2's receipt. Run 4 = run 3 byte for byte, tables included. The record is run 3 (`8898b640…`) |
| the plan | `plan.py --check` at the start and the end | SAME, SAME (`plan.json` `11a9b357…`, `metrics.m-1.json` `8a0efa7e…`); this lane wrote neither file |

### 9.8 What the full sample shows (CONFIRMED by the values above; for W-15 and the next design pass, no ruling here)

1. **The ten-slot `type7` turning band lies inside the declared exception at both matched sizes.**
   - BIG_TOWN: the band is 7.411–8.797 °/100 m, inside 4.212–12.636 (median 8.424). All ten values lie in 6.463–9.687.
   - BIG_CITY: the band is 8.329–13.718, inside 4.675–14.026 (median 9.351). All ten values lie in 8.227–13.728.

   R-34 listed this as PLAUSIBLE, and for these ten draws it is now CONFIRMED. BIG_TOWN's band spans 0.88–1.04 × its
   median and BIG_CITY's 0.89–1.47 ×. BIG_CITY's sample has two groups: six slots at 8.2–9.5 and three `coast+river`
   slots (3, 17, 23) at 13.1–13.7, with slot 5 at 11.9 between them. Whether the exception's stated reason still holds is
   the design pass's question (DC-35); a ruled design cell is re-decided by amendment, not here.
2. **FTG draws a coast at one of two steps, and each slot's pooled `water.step` follows its coast's step.** The raw
   vertex spacing per water body (the JSON's `waterOutlines`; the table below) shows:
   - all 23 rivers at 49.9–50.1 m;
   - 10 of the 17 coasts at 14.9–16.2 m (slots 5, 7, 12, 13, 16, 17, 20, 21, 22, 25);
   - the other 7 at 50.0 m (slots 2, 3, 4, 8, 9, 23 and the CITY capture). Six of those are straight and keep only
     their 4 corner vertices after W05-D8's 1° drop; slot 9's keeps 109 of 138.

   The pooled step on the `coast+river` slots falls into two groups with nothing between them: 14.49–17.47 m on the ten
   slots with a fine coast, and 50.00–70.17 m on the seven with a 50 m coast. Per size, the range is 14.49–70.17 m at
   BIG_TOWN (six slots), 15.56–50.87 m at BIG_CITY (six), 16.15–50.22 m at METROPOLIS (three) and 15.25 / 50.37 m at
   CITY. For DC-10 ("the 50 m step holds on one payload only"), the count is now 7 coasts of 17 and every river.
   This sharpens the question pass 1 routed in 9.3 (1). That question was whether `water.step` keeps W05-D8's drop
   or reads the raw spacing. It now also asks whether FTG's reference value is one number or a value per coast step. It
   is a definition call for a ruling seat, to be made before W-15 sharpens the value, and no ruling record answers it as
   of this pass. §13.5's fixed bound "outline step ≤ 25 m" is ours and stays as it is (R-48). River widths are
   42.62–55.99 m at BIG_TOWN, 31.49–54.61 m at BIG_CITY, 22.37–31.67 m at METROPOLIS, and 31.30 / 42.87 m at CITY.

   | slot | water.step pooled (m) | per body: class, vertices, raw step (m), vertices kept after the 1° drop, step after the drop (m) |
   |---|---|---|
   | 1 | 8.88 | lake 26, 9.3, 26, 9.3; lake 24, 11.2, 24, 11.2; lake 25, 5.9, 25, 5.9 |
   | 2 | 70.17 | lake 8, 50.0, 4, 157.9; river 96, 50.0, 23, 50.5; sea 93, 50.0, 4, 3 259 |
   | 3 | 50.33 | lake 6, 49.4, 4, 98.9; river 120, 50.0, 53, 50.3; river 128, 50.0, 48, 50.3; sea 131, 50.0, 4, 4 533 |
   | 4 | 50.66 | lake 7, 74.0, 6, 74.0; river 98, 50.0, 56, 50.6; river 88, 50.0, 64, 50.5; sea 108, 50.0, 4, 3 698 |
   | 5 | 16.25 | lake 19, 13.1, 18, 13.1; river 146, 50.0, 62, 50.4; sea 294, 16.2, 224, 15.4 |
   | 6 | 12.26 | lake 13, 12.3, 13, 12.3 |
   | 7 | 16.15 | lake 17, 13.2, 14, 13.5; lake 24, 10.1, 24, 10.1; lake 13, 10.2, 13, 10.2; lake 19, 8.8, 19, 8.8; lake 30, 9.4, 30, 9.4; river 139, 49.9, 120, 50.3; river 124, 50.0, 107, 50.4; sea 510, 14.9, 501, 15.1 |
   | 8 | 50.22 | lake 7, 50.0, 4, 99.1; river 144, 50.0, 56, 50.2; sea 127, 50.0, 4, 4 627 |
   | 9 | 50.00 | lake 13, 50.0, 8, 74.5; river 135, 50.0, 127, 50.3; sea 138, 50.0, 109, 50.0 |
   | 12 | 17.47 | lake 12, 12.7, 12, 12.7; lake 80, 50.0, 28, 50.5; river 96, 50.0, 56, 50.5; sea 209, 16.0, 162, 15.3 |
   | 13 | 15.56 | lake 14, 12.8, 14, 12.8; lake 28, 7.4, 27, 7.3; river 140, 50.0, 82, 50.5; sea 493, 15.1, 484, 15.2 |
   | 14 | 14.29 | lake 11, 12.9, 11, 12.9; lake 18, 14.9, 18, 14.9 |
   | 16 | 15.17 | lake 10, 19.3, 10, 19.3; lake 26, 5.0, 26, 5.0; lake 24, 7.6, 24, 7.6; river 89, 50.0, 53, 50.9; sea 336, 14.9, 329, 15.2 |
   | 17 | 16.66 | lake 11, 13.7, 10, 31.8; river 107, 50.0, 77, 50.8; lake 50, 50.0, 30, 50.7; river 135, 50.0, 81, 50.6; sea 557, 15.0, 541, 15.2 |
   | 18 | 10.19 | lake 13, 11.6, 13, 11.6; lake 24, 8.7, 23, 8.5; lake 13, 10.2, 13, 10.2; lake 28, 10.3, 28, 10.3 |
   | 20 | 16.87 | lake 14, 12.7, 13, 13.1; river 112, 50.0, 72, 50.5; sea 387, 15.7, 378, 15.9 |
   | 21 | 17.11 | lake 10, 30.5, 10, 30.5; river 121, 50.0, 99, 50.9; river 169, 50.0, 138, 50.9; sea 468, 14.9, 459, 15.0 |
   | 22 | 14.49 | lake 7, 12.8, 5, 35.7; lake 18, 13.3, 18, 13.3; lake 11, 9.9, 11, 9.9; lake 19, 9.1, 19, 9.1; lake 28, 10.7, 28, 10.7; river 95, 50.0, 15, 49.5; sea 208, 16.0, 164, 15.3 |
   | 23 | 50.87 | lake 6, 52.4, 4, 76.0; river 127, 50.0, 107, 50.7; sea 122, 50.0, 4, 4 368 |
   | 25 | 15.25 | lake 22, 12.8, 18, 13.4; lake 30, 5.9, 30, 5.9; lake 27, 8.5, 27, 8.5; lake 30, 5.5, 30, 5.5; river 146, 50.0, 98, 50.6; sea 424, 15.1, 411, 15.2 |
   | CITY rec. 0 | 50.37 | lake 8, 50.0, 4, 142.2; river 101, 50.0, 69, 50.3; river 132, 50.0, 95, 50.4; sea 128, 50.0, 4, 4 438 |

3. **One walled request in 27 drew no wall: slot 12.** Every request asked for a wall, and 26 payloads draw one. The
   wall rows read the walled payloads:
   - BIG_TOWN, nine slots: tower spacing 32.40–40.67 m and 0–4 arterial crossings at no gate per payload;
   - BIG_CITY, ten slots: 30.91–36.55 m and 1–7;
   - METROPOLIS: 31.81–34.64 m and 3–7;
   - CITY: 35.49–44.56 m and 1–5;
   - TOWN: 35.94 m and 3.

   `gate.count` is 0 on every payload, which has no gate object; ours is 0 crossings. Without slot 12, BIG_TOWN's wall
   rows have n = 9, and the estimator at that n is `minmax`. W-15 forms the row. W05b-D11 is vetoable: a veto pools
   slot 12's 0 crossings and its missing spacing back in.
4. **Pass 1's split between `none` and `coast+river` junctions does not hold at ten slots.** Pass 1's note 9.3 (3) was
   read on one `none` slot per size, and its numbers stand for those slots.
   - The 4-way share at BIG_TOWN is 0.172–0.265 on `none` slots and 0.214–0.319 on `coast+river` slots. At BIG_CITY it
     is 0.151–0.327 and 0.255–0.312.
   - The junction median at BIG_TOWN is 91.58–93.54° on `none` slots and 90.27–92.10° on `coast+river` slots. At
     BIG_CITY it is 90.45–93.21° and 90.14–91.35°.

   The `none` slots still lean towards higher medians, but the ranges overlap. This is a note for D16's per-water
   companion, not a finding.
5. **Server times (all contended).** BIG_TOWN 1.87–4.45 s (slot 12's 4.45 s is the only one above 2.7 s), BIG_CITY
   5.66–7.12 s, METROPOLIS 10.30–15.22 s, CITY 2.77–5.25 s, TOWN 1.48 s. On the client side, the layout arrived
   2.71–17.43 s after the PUT. The first map shot was logged 11.13–37.84 s after the PUT, an upper bound that the seat's
   pace sets.
6. **The town (slot 26, one draw, research-side).** It has 1 102 buildings. Its attached share is 0.000, the only payload
   with no attached footprint (the others 0.063–0.296). Its block-size CV is 0.62, against 1.24–2.33 on every other
   payload, and its 4-way share is 0.370, against 0.151–0.327. Its turning is 7.543 °/100 m. E02 37.3 reads the town's one
   stage as the gaps stage, and these values PLAUSIBLY follow from that stage. It is one draw, so this is a note only.
7. **The size values follow the size exactly at all five sizes** (check 4). Every later capture of a size repeats its
   first in all 28 values, and the requests reproduce E02 37.3's table. Each size's slots are therefore independent draws
   of the same settings, as 9.3 (7) read them.
8. **The weakness and descriptive rows keep their shape over 28 captures.** `bldg.partyShare` is 0 on every payload.
   The tree nearest-neighbour median is 8.74–11.62 m. Persons per building at the nominal population are 2.98–3.48. The
   wealth tiers are the request's weights, equal on every slot (0.011 / 0.011 / 0.217 / 0.435 / 0.217 / 0.109).

### 9.9 Calls made under the delegation in this pass (each vetoable; none changes a design cell or a ruling)

| id | decision | why; effect |
|---|---|---|
| W05b-D11 | the wall rows (`wall.towerSpacing`, `wall.ungated`, `gate.count`) read only the payloads that draw a wall. A wall-less payload is listed in its sample's `wallRows.noWall` and keeps its values per slot. Check 2 holds the list against E02's wall counts | spacing is undefined without a wall, and a crossing or gate count of 0 there measures no curtain. Pooled, slot 12's 0 would pull FTG's `wall.ungated` weakness reference towards ours (0). The water rows' `coast+river` rule is the precedent. A veto pools slot 12 back in (n = 10 at BIG_TOWN) |
| W05b-D12 | the 28 size values are read by name: an absent leaf as null, a text leaf as a 12-hex digest of its JSON, and a boolean as itself | the record carries numbers, ids and our own words only, so a request string never enters it, and a digest still tells equal values from unequal ones |
| W05b-D13 | check 4 compares E02's word cells by pattern (equal words with equal request values, different words with different ones), and it holds the tool's rows equal, by name, to the post script's class | E02 writes text leaves in our words, which no request value equals, so the pattern is what those cells assert. The name check makes the next R-41 widening fail check 4 until the tool reads it. That closes the gap E02 37.3 finding 9 found |
| W05b-D14 | each pass rewrites `E05-ftg-metrics.slots.json` (the one file W-15 reads), and the record keeps each pass's section | W-15 needs the current pass only. Pass 1's file is in the repository (`bef102c`), and its section stands as written |
| W05b-D15 | slot 27 is listed as open, neither measured nor failed, and this pass is final for slots 0–26 | `plan.json` holds slot 27 open after a stop with no create (E02 section 38, call 2: no `--fail-ftg`). Its status is W-02b's to decide, not this lane's. Under the rolling rule, a further pass takes it in if it binds |

### 9.10 CONFIRMED versus PLAUSIBLE (final pass)

**CONFIRMED (executed or read):**
- every number in 9.6–9.8, the per-body water table included;
- the four row checks, `--red`, and the six extra planted faults;
- the reproduction of pass 1 and the determinism comparisons;
- the unchanged hashes of the adapter, `measure_ftg.py` and W-05's fixture JSON;
- `plan.py --check` SAME;
- that no ruling record answers the `water.step` question (`M-1-rulings-1.md` and `-2.md` read for it).

**PLAUSIBLE (reasoning only):**
- that slot 12's missing wall is generator variation, since its request equals those of slots 2 and 4 apart from the
  partner ids (E02 23.3);
- that the town's attached share, block CV and 4-way share follow from its single gaps stage;
- the timing readings of 9.5: the interceptor's write time and the click's lead over the PUT.

**Not touched by this pass:** `plat/`, the design, `plan.py`, `plan.json`, `metrics.m-1.json`, E02, the checklist, the
adapter, `measure_ftg.py`, the post script, W-05's fixture JSON and pass 1's text in sections 9.1–9.5. No website was
contacted, no capture bundle was read, and no git command changed state.

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
